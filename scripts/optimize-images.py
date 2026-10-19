#!/usr/bin/env python3
"""Losslessly optimize PNG and JPEG images.

Each image is optimized as a temporary copy (optipng for PNG, jpegoptim for JPEG,
both in lossless mode). The copy replaces the original only when every decoded
pixel, the ICC profile and the EXIF data are identical, and the saving is at
least MIN_PERCENT and MIN_BYTES. A copy that fails this check is discarded and
the script exits non-zero.
"""

import argparse
import os
import shutil
import stat
import subprocess
import sys
import tempfile
import time
import unicodedata
from collections.abc import Callable
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass
from pathlib import Path

from PIL import Image

MIN_PERCENT = 5
MIN_BYTES = 1024

FORMATS_BY_EXTENSION = {".png": "PNG", ".jpg": "JPEG", ".jpeg": "JPEG"}

# Lossless only: no quality, palette or strip options.
OPTIMIZER_COMMANDS = {
    "PNG": ["optipng", "-quiet", "-o2", "-preserve", "--"],
    "JPEG": ["jpegoptim", "--quiet", "--preserve", "--strip-none", "--"],
}

# Modes whose RGBA conversion is exact; optipng may switch between them (e.g. RGBA -> P).
EXACT_RGBA_MODES = {"1", "L", "LA", "P", "PA", "RGB", "RGBA"}

# Metadata that changes how pixels render or are oriented.
RENDERING_METADATA = ("icc_profile", "exif", "gamma", "srgb", "chromaticity")

DECODE_ERRORS = (OSError, SyntaxError, ValueError, Image.DecompressionBombError)

# Escaped in logs and the report: control, format (bidi, zero-width) and line/paragraph separators.
UNSAFE_CATEGORIES = {"Cc", "Cf", "Zl", "Zp"}

PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"
PNG_BIT_DEPTH_OFFSET = 24


@dataclass
class Result:
    path: Path
    before: int
    after: int
    status: str  # optimized | unchanged | skipped | failed
    reason: str = ""


Optimizer = Callable[[str, Path], None]


def git_paths(*args: str) -> list[Path]:
    completed = subprocess.run(["git", *args], check=True, capture_output=True, text=True)
    return [Path(name) for name in completed.stdout.split("\0") if name]


def tracked_files() -> list[Path]:
    return git_paths("ls-files", "-z")


def changed_since(ref: str) -> list[Path]:
    return git_paths("diff", "--name-only", "--no-renames", "--diff-filter=AM", "-z", f"{ref}...HEAD", "--")


def repository_root() -> Path:
    return Path.cwd().resolve()


def is_regular_file(path: Path) -> bool:
    try:
        return stat.S_ISREG(path.lstat().st_mode)
    except OSError:
        return False


def filter_candidates(paths, root: Path) -> list[Path]:
    """Keep PNG/JPEG regular files (not symlinks) that resolve inside root."""
    root = root.resolve()
    return [
        Path(path)
        for path in paths
        if Path(path).suffix.lower() in FORMATS_BY_EXTENSION
        and is_regular_file(Path(path))
        and Path(path).resolve().is_relative_to(root)
    ]


def run_optimizer(file_format: str, path: Path) -> None:
    subprocess.run([*OPTIMIZER_COMMANDS[file_format], str(path)], check=True, capture_output=True)


def should_replace(before: int, after: int) -> bool:
    saved = before - after
    return saved >= MIN_BYTES and saved * 100 >= MIN_PERCENT * before


def skip_reason(path: Path) -> str | None:
    expected = FORMATS_BY_EXTENSION[path.suffix.lower()]
    try:
        with Image.open(path) as image:
            actual = image.format
            animated = getattr(image, "is_animated", False)
    except DECODE_ERRORS as error:
        return f"cannot decode: {error}"

    if actual != expected:
        return f"content is {actual}, not {expected}"
    if animated:
        return "animated image"
    if expected == "PNG":
        with path.open("rb") as handle:
            header = handle.read(PNG_BIT_DEPTH_OFFSET + 1)
        if header.startswith(PNG_SIGNATURE) and header[PNG_BIT_DEPTH_OFFSET] == 16:
            return "16-bit PNG (Pillow decodes it to 8 bits, so the pixel check cannot verify it)"
    return None


def snapshot(path: Path) -> dict:
    with Image.open(path) as image:
        image.load()
        if image.mode in EXACT_RGBA_MODES:
            pixels = ("RGBA", image.convert("RGBA").tobytes())
        else:
            pixels = (image.mode, image.tobytes())
        return {
            "format": image.format,
            "size": image.size,
            "pixels": pixels,
            **{key: image.info.get(key) for key in RENDERING_METADATA},
        }


def differences(before: dict, after: dict) -> str | None:
    changed = [key for key in before if before[key] != after.get(key)]
    if changed:
        return f"{', '.join(changed)} differ after optimization"
    return None


def optimize_file(path: Path, dry_run: bool = False, optimizer: Optimizer = run_optimizer) -> Result:
    if not is_regular_file(path):
        return Result(path, 0, 0, "skipped", "not a regular file")
    before = path.stat().st_size
    reason = skip_reason(path)
    if reason:
        return Result(path, before, before, "skipped", reason)

    file_format = FORMATS_BY_EXTENSION[path.suffix.lower()]
    with tempfile.TemporaryDirectory() as directory:
        candidate = Path(directory) / f"image{path.suffix.lower()}"
        shutil.copyfile(path, candidate)
        try:
            optimizer(file_format, candidate)
        except subprocess.CalledProcessError as error:
            message = (error.stderr or b"").decode(errors="replace").strip()
            detail = f": {message}" if message else ""
            return Result(path, before, before, "skipped", f"optimizer exited with {error.returncode}{detail}")

        after = candidate.stat().st_size
        if not should_replace(before, after):
            return Result(path, before, before, "unchanged")

        try:
            original = snapshot(path)
        except DECODE_ERRORS as error:
            return Result(path, before, before, "skipped", f"cannot decode: {error}")
        try:
            mismatch = differences(original, snapshot(candidate))
        except DECODE_ERRORS as error:
            mismatch = f"optimized copy cannot be decoded: {error}"
        if mismatch:
            return Result(path, before, before, "failed", mismatch)

        if not dry_run:
            shutil.copyfile(candidate, path)
        return Result(path, before, after, "optimized")


def human_size(size: int) -> str:
    for unit in ("B", "KiB", "MiB"):
        if size < 1024 or unit == "MiB":
            return f"{size} B" if unit == "B" else f"{size:.2f} {unit}"
        size /= 1024
    raise AssertionError("unreachable")


def improvement(before: int, after: int) -> str:
    return f"-{(before - after) * 100 / before:.1f}%"


def printable(text: str) -> str:
    return "".join(f"\\u{ord(char):04x}" if unicodedata.category(char) in UNSAFE_CATEGORIES else char for char in text)


def markdown_cell(path: Path) -> str:
    return "`" + printable(path.as_posix()).replace("`", "'").replace("|", "\\|") + "`"


def markdown_report(results: list[Result]) -> str:
    optimized = [result for result in results if result.status == "optimized"]
    if not optimized:
        return ""

    before = sum(result.before for result in optimized)
    after = sum(result.after for result in optimized)
    lines = [
        "Images optimized losslessly: pixels, ICC profiles and EXIF data are unchanged.",
        "",
        "| Filename | Before | After | Improvement |",
        "| --- | --- | --- | --- |",
        *(
            f"| {markdown_cell(result.path)} | {human_size(result.before)} | "
            f"{human_size(result.after)} | {improvement(result.before, result.after)} |"
            for result in optimized
        ),
        "",
        f"**Total:** {human_size(before)} -> {human_size(after)} ({improvement(before, after)})",
        "",
    ]
    return "\n".join(lines)


def write_github_output(name: str, value: str) -> None:
    output = os.environ.get("GITHUB_OUTPUT")
    if not output:
        return

    with open(output, "a", encoding="utf-8") as handle:
        handle.write(f"{name}={value}\n")


def log(message: str) -> None:
    print(message, file=sys.stderr)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    selection = parser.add_mutually_exclusive_group(required=True)
    selection.add_argument("paths", nargs="*", default=[], type=Path, help="Images to optimize")
    selection.add_argument("--all", action="store_true", help="Optimize every tracked PNG and JPEG")
    selection.add_argument("--changed-since", metavar="REF", help="Optimize images added or modified since REF")
    parser.add_argument("--markdown", type=Path, help="Write the Markdown report here instead of stdout")
    parser.add_argument("--dry-run", action="store_true", help="Report savings without replacing files")
    parser.add_argument("--jobs", type=int, default=os.cpu_count() or 1, help="Images to optimize in parallel")
    args = parser.parse_args()

    if args.all:
        paths = tracked_files()
    elif args.changed_since:
        paths = changed_since(args.changed_since)
    else:
        paths = args.paths
    candidates = filter_candidates(paths, repository_root())

    started = time.monotonic()
    with ThreadPoolExecutor(max_workers=max(1, args.jobs)) as pool:
        results = list(pool.map(lambda path: optimize_file(path, dry_run=args.dry_run), candidates))
    elapsed = time.monotonic() - started

    for result in results:
        if result.status in ("skipped", "failed"):
            log(f"{result.status.upper()} {printable(result.path.as_posix())}: {printable(result.reason)}")

    optimized = [result for result in results if result.status == "optimized"]
    failed = [result for result in results if result.status == "failed"]
    skipped = [result for result in results if result.status == "skipped"]
    saved = sum(result.before - result.after for result in optimized)
    verb = "would optimize" if args.dry_run else "optimized"
    log(
        f"{len(candidates)} images checked in {elapsed:.1f}s: {verb} {len(optimized)} "
        f"(saved {human_size(saved)}), skipped {len(skipped)}, failed {len(failed)}"
    )

    report = markdown_report(results)
    if args.markdown:
        args.markdown.write_text(report, encoding="utf-8")
    elif report:
        print(report, end="")
    write_github_output("changed", "true" if optimized and not args.dry_run else "false")

    if failed:
        raise SystemExit(f"{len(failed)} images failed the lossless check; their originals were kept")


if __name__ == "__main__":
    main()
