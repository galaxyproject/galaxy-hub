#!/usr/bin/env python3
"""
update-eu-genome-count.py
=========================
Reads the VGP/ERGA Google Sheet and updates the genome count marker in the
Galaxy Assembly bare page (content/bare/eu/usegalaxy/assembly/index.md).

Marker format in the content file:
    {/* GENOME_COUNT */}23{/* /GENOME_COUNT */}

Usage:
    python scripts/update-eu-genome-count.py
    python scripts/update-eu-genome-count.py --check   # non-zero exit if count changed
    python scripts/update-eu-genome-count.py --file content/bare/eu/usegalaxy/assembly/index.md
"""

import argparse
import re
import sys

import pandas as pd

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
SHEET_ID = "1Kya38LUDom4u7osTTY3uYyNor7AMpyLYxz5MaulciZc"
SHEET_NAME = "Sheet1"
MARKER_RE = re.compile(r"(\{/\* GENOME_COUNT \*/\})(\d+)(\{/\* /GENOME_COUNT \*/\})")
DEFAULT_FILE = "content/bare/eu/usegalaxy/assembly/index.md"


def fetch_genome_count() -> int:
    """Fetch current genome count from the VGP/ERGA Google Sheet."""
    url = (
        f"https://docs.google.com/spreadsheets/d/{SHEET_ID}"
        f"/gviz/tq?tqx=out:csv&sheet={SHEET_NAME}"
    )
    df = pd.read_csv(url)
    return len(df["ID"])


def update_file(path: str, new_count: int, check_only: bool) -> bool:
    """
    Replace the GENOME_COUNT marker in *path* with *new_count*.

    Returns True if the file was changed (or would have been changed in
    --check mode).  In --check mode the file is never written.
    """
    with open(path, "r", encoding="utf-8") as fh:
        content = fh.read()

    matches = list(MARKER_RE.finditer(content))
    if len(matches) != 1:
        print(
            f"ERROR: expected exactly one GENOME_COUNT marker in {path}, "
            f"found {len(matches)}",
            file=sys.stderr,
        )
        sys.exit(2)
    match = matches[0]

    old_count = int(match.group(2))
    if old_count == new_count:
        print(f"No change: genome count is already {new_count}.")
        return False

    if check_only:
        print(
            f"CHECK FAILED: genome count changed {old_count} → {new_count} "
            f"but --check was specified (file not updated)."
        )
        return True

    updated = MARKER_RE.sub(
        lambda m: f"{m.group(1)}{new_count}{m.group(3)}",
        content,
        count=1,
    )
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(updated)

    print(f"Updated genome count: {old_count} → {new_count} in {path}")
    return True


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Update VGP/ERGA genome count in the assembly bare page."
    )
    parser.add_argument(
        "--file",
        default=DEFAULT_FILE,
        help=f"Path to the assembly index.md (default: {DEFAULT_FILE})",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help=(
            "Verify mode: exit with code 1 if the count would change but do "
            "not write the file.  Useful for CI gating."
        ),
    )
    args = parser.parse_args()

    print("Fetching genome count from VGP/ERGA Google Sheet …")
    count = fetch_genome_count()
    print(f"Current sheet row count: {count}")

    changed = update_file(args.file, count, check_only=args.check)
    if args.check and changed:
        sys.exit(1)


if __name__ == "__main__":
    main()
