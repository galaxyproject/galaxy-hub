#!/usr/bin/env python3
"""Undo image optimizations that changed how an image decodes.

Usage: check_pixels_identical.py ORIGINALS_DIR

ORIGINALS_DIR holds untouched copies of the images, at the same relative paths as in the
current directory. Each changed image must match its copy in size, frame count, ICC profile,
EXIF data and RGBA pixels; otherwise the copy is restored. Pixels are compared as stored
(ICC profiles are compared byte for byte, not applied). Animated images and 16-bit PNGs are
always restored.
Prints a Markdown table of the kept images to stdout.
"""

import io
import shutil
import sys
from pathlib import Path

from PIL import Image


def decode(data: bytes) -> tuple:
    # RGBA holds 8 bits per channel, so 16-bit PNGs (IHDR bit depth byte) cannot be compared.
    deep = data.startswith(b"\x89PNG\r\n\x1a\n") and data[24] == 16
    with Image.open(io.BytesIO(data)) as image:
        frames = getattr(image, "n_frames", 1)
        info = image.info.get("icc_profile"), image.info.get("exif")
        return (frames, deep), image.size, info, image.convert("RGBA").tobytes()


def same_image(original: bytes, optimized: bytes) -> bool:
    try:
        before, after = decode(original), decode(optimized)
    except Exception:
        return False
    return before == after and before[0] == (1, False)


def main(argv: list[str]) -> None:
    originals = Path(argv[0])
    rows = []
    for copy in sorted(path for path in originals.rglob("*") if path.is_file()):
        target = copy.relative_to(originals)
        before, after = copy.read_bytes(), target.read_bytes()
        if before == after:
            continue
        if same_image(before, after):
            saved = len(before) - len(after)
            rows.append(f"| `{target.as_posix()}` | {len(before):,} | {len(after):,} | {saved / len(before):.1%} |")
        else:
            shutil.copyfile(copy, target)
            print(f"::warning file={target.as_posix()}::Optimized image decodes differently; kept the original.", file=sys.stderr)
    if rows:
        print("| Image | Before (bytes) | After (bytes) | Saved |\n| --- | ---: | ---: | ---: |")
        print("\n".join(rows))


if __name__ == "__main__":
    main(sys.argv[1:])
