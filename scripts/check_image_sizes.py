#!/usr/bin/env python3
"""Flag oversized images that a pull request adds or changes.

Usage: check_image_sizes.py [--base REF] [--head REF]

BASE defaults to the IMAGE_CHECK_BASE environment variable and HEAD to "HEAD". Images (png, jpg,
jpeg, gif, webp) that BASE...HEAD adds, modifies or renames with changed content are read from git,
so the checkout needs both commits. Symlinks and pure renames are skipped.

An image over WARN_BYTES or with a long edge over WARN_EDGE_PX gets a warning annotation; an image
over ERROR_BYTES gets an error annotation and the exit code is 1. Annotations go to stdout (GitHub
reads workflow commands there); a Markdown table of the flagged images goes to stdout and, when set,
to the file named by GITHUB_STEP_SUMMARY. Nothing is rewritten: this is a check, not an optimizer.
"""

import argparse
import io
import os
import subprocess
import sys
from pathlib import Path, PurePosixPath

from PIL import Image

MIB = 1024 * 1024
WARN_BYTES = 1 * MIB
ERROR_BYTES = 5 * MIB
WARN_EDGE_PX = 2500
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".webp"}
SYMLINK_MODE = "120000"
HINT = "Photo saved as PNG? Save it as JPEG (quality ~82), at most 2000 px on the long edge."


def git(*args: str) -> bytes:
    return subprocess.run(["git", *args], check=True, stdout=subprocess.PIPE).stdout


def changed_images(base: str, head: str) -> list[tuple[str, str]]:
    """Return (path, blob sha at head) for each added, modified or content-changed renamed image."""
    raw = git("diff", "--raw", "-z", "--no-abbrev", "-M", "--diff-filter=AMR", f"{base}...{head}")
    tokens = raw.decode("utf-8", "surrogateescape").split("\0")
    images = []
    index = 0
    while index < len(tokens) and tokens[index].startswith(":"):
        _old_mode, new_mode, _old_sha, new_sha, status = tokens[index][1:].split()
        paths = 2 if status[0] in "RC" else 1
        path = tokens[index + paths]
        index += 1 + paths
        if status == "R100" or new_mode == SYMLINK_MODE:
            continue
        if PurePosixPath(path).suffix.lower() in IMAGE_EXTENSIONS:
            images.append((path, new_sha))
    return images


def check_image(data: bytes) -> tuple[str, list[str], tuple[int, int] | None]:
    """Return (level, reasons, size in px) for one image; level is "ok", "warning" or "error"."""
    reasons = []
    level = "ok"
    size = None
    try:
        with Image.open(io.BytesIO(data)) as image:
            size = image.size
    except Exception:
        reasons.append("dimensions unreadable")
    if len(data) > ERROR_BYTES:
        level = "error"
        reasons.append(f"over {ERROR_BYTES / MIB:g} MiB")
    elif len(data) > WARN_BYTES:
        level = "warning"
        reasons.append(f"over {WARN_BYTES / MIB:g} MiB")
    if size and max(size) > WARN_EDGE_PX:
        level = "error" if level == "error" else "warning"
        reasons.append(f"long edge over {WARN_EDGE_PX} px")
    if reasons == ["dimensions unreadable"]:
        level = "warning"
    return level, reasons, size


def escape(value: str, *, prop: bool = False) -> str:
    value = value.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    return value.replace(":", "%3A").replace(",", "%2C") if prop else value


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--base", default=os.environ.get("IMAGE_CHECK_BASE"))
    parser.add_argument("--head", default="HEAD")
    args = parser.parse_args(argv)
    if not args.base:
        print("check_image_sizes: set --base or IMAGE_CHECK_BASE", file=sys.stderr)
        return 2

    rows = []
    errors = 0
    images = changed_images(args.base, args.head)
    for path, sha in images:
        data = git("cat-file", "blob", sha)
        level, reasons, size = check_image(data)
        if level == "ok":
            continue
        errors += level == "error"
        pixels = f"{size[0]}x{size[1]}" if size else "unknown"
        detail = f"{len(data) / MIB:.1f} MiB, {pixels} px: {', '.join(reasons)}. {HINT}"
        print(f"::{level} file={escape(path, prop=True)}::{escape(detail)}")
        label = "Fail" if level == "error" else "Warn"
        name = path.replace("|", "\\|")
        rows.append(f"| {label} | `{name}` | {len(data) / MIB:.1f} | {pixels} | {', '.join(reasons)} |")

    print(f"Checked {len(images)} added or changed image(s); {len(rows)} flagged, {errors} over the fail limit.")
    if rows:
        table = "\n".join(
            [
                "| Result | Image | Size (MiB) | Pixels | Why |",
                "| --- | --- | ---: | ---: | --- |",
                *rows,
                "",
                HINT,
            ]
        )
        print(table)
        summary = os.environ.get("GITHUB_STEP_SUMMARY")
        if summary:
            with Path(summary).open("a", encoding="utf-8") as handle:
                handle.write(table + "\n")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
