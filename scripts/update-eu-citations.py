#!/usr/bin/env python3
"""Sync EU and subsite citation bibliographies from usegalaxy-eu/website."""

import re
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import urlopen

SOURCE_BASE = "https://raw.githubusercontent.com/usegalaxy-eu/website/master/_bibliography"
TIMEOUT_SECONDS = 60

BIBLIOGRAPHIES = {
    "citations-eu.bib": Path("content/eu/citations/citations-eu.bib"),
    "citations-eu-manual.bib": Path("content/eu/citations/citations-eu-manual.bib"),
    "belgium.bib": Path("content/belgium/citations/belgium.bib"),
    "elixir-it.bib": Path("content/elixir-it/citations/elixir-it.bib"),
    "erasmusmc.bib": Path("content/erasmusmc/citations/erasmusmc.bib"),
    "freiburg.bib": Path("content/freiburg/citations/freiburg.bib"),
    "genouest.bib": Path("content/genouest/citations/genouest.bib"),
    "ifb.bib": Path("content/ifb/citations/ifb.bib"),
}

ENTRY_WITH_SPACED_BRACE = re.compile(rb"@([A-Za-z]+)\s+\{")
ENTRY_HEADER = re.compile(rb"@([A-Za-z]+)\{([^,\n]+),")


def fetch_bibliography(name: str) -> bytes:
    url = f"{SOURCE_BASE}/{name}"
    try:
        with urlopen(url, timeout=TIMEOUT_SECONDS) as response:
            return response.read()
    except (HTTPError, URLError, TimeoutError) as error:
        raise RuntimeError(f"Failed to fetch {url}: {error}") from error


def normalize_bibliography(data: bytes) -> bytes:
    data = ENTRY_WITH_SPACED_BRACE.sub(rb"@\1{", data)

    def normalize_key(match: re.Match[bytes]) -> bytes:
        entry_type = match.group(1)
        key = re.sub(rb"\s+", b"_", match.group(2).strip())
        return b"@" + entry_type + b"{" + key + b","

    return ENTRY_HEADER.sub(normalize_key, data)


def main() -> None:
    for source_name, destination in BIBLIOGRAPHIES.items():
        data = normalize_bibliography(fetch_bibliography(source_name))
        if not ENTRY_HEADER.search(data):
            destination.unlink(missing_ok=True)
            print(f"Skipped {source_name}: no BibTeX entries")
            continue

        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(data)
        print(f"Synced {source_name} -> {destination}")


if __name__ == "__main__":
    main()
