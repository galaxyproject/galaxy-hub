#!/usr/bin/env python3
"""Sync EU and subsite citation bibliographies from Zotero."""

import argparse
import os
import re
from pathlib import Path
from urllib.parse import urlencode
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ZOTERO_API_BASE = "https://api.zotero.org/groups/{group_id}/items"
ZOTERO_GROUP_ID = "1732893"
USEGALAXY_EU_TAG = ">UseGalaxy.eu"
TIMEOUT_SECONDS = 60
PAGE_SIZE = 100

SUBSITE_ZOTERO_TAGS = {
    "belgium": ">UseGalaxy.be",
    "cz": ">MetaCentrum",
    "genouest": ">GenOuest",
    "pasteur": ">Pasteur",
    "us": ">UseGalaxy.org",
}

ZOTERO_BIBLIOGRAPHIES = [
    {
        "group_id": ZOTERO_GROUP_ID,
        "tag": USEGALAXY_EU_TAG,
        "destination": Path("content/eu/citations/citations-eu.bib"),
    },
    *(
        {
            "group_id": ZOTERO_GROUP_ID,
            "tag": tag,
            "destination": Path(f"content/{subsite}/citations/citations-{subsite}.bib"),
        }
        for subsite, tag in SUBSITE_ZOTERO_TAGS.items()
    ),
]

LOCAL_BIBLIOGRAPHIES = [
    Path("content/eu/citations/citations-eu-manual.bib"),
    Path("content/belgium/citations/belgium.bib"),
    Path("content/elixir-it/citations/elixir-it.bib"),
    Path("content/freiburg/citations/freiburg.bib"),
    Path("content/genouest/citations/genouest.bib"),
    Path("content/ifb/citations/ifb.bib"),
]

ENTRY_WITH_SPACED_BRACE = re.compile(rb"@([A-Za-z]+)\s+\{")
ENTRY_HEADER = re.compile(rb"@([A-Za-z]+)\{([^,\n]+),")


def fetch_url(url: str) -> tuple[bytes, int | None]:
    request = Request(url, headers={"User-Agent": "galaxy-hub-citation-sync/1.0"})
    try:
        with urlopen(request, timeout=TIMEOUT_SECONDS) as response:
            total_results = response.headers.get("Total-Results")
            total = int(total_results) if total_results else None
            return response.read(), total
    except (HTTPError, URLError, TimeoutError) as error:
        raise RuntimeError(f"Failed to fetch {url}: {error}") from error


def fetch_zotero_bibliography(group_id: str, tag: str) -> bytes:
    chunks: list[bytes] = []
    start = 0
    total = None

    while total is None or start < total:
        query = urlencode(
            {
                "format": "bibtex",
                "limit": PAGE_SIZE,
                "start": start,
                "tag": tag,
            }
        )
        url = f"{ZOTERO_API_BASE.format(group_id=group_id)}?{query}"
        data, total = fetch_url(url)
        if data.strip():
            chunks.append(data.strip())

        if total is None:
            break
        start += PAGE_SIZE

    return b"\n\n".join(chunks) + b"\n"


def normalize_bibliography(data: bytes) -> bytes:
    data = ENTRY_WITH_SPACED_BRACE.sub(rb"@\1{", data)

    def normalize_key(match: re.Match[bytes]) -> bytes:
        entry_type = match.group(1)
        key = re.sub(rb"\s+", b"_", match.group(2).strip())
        return b"@" + entry_type + b"{" + key + b","

    data = ENTRY_HEADER.sub(normalize_key, data)
    return b"\n".join(line.rstrip() for line in data.splitlines()) + b"\n"


def write_bibliography(destination: Path, data: bytes, check: bool) -> bool:
    if destination.exists() and destination.read_bytes() == data:
        return False

    if check:
        print(f"Would update {destination}")
        return True

    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(data)
    print(f"Synced {destination}")
    return True


def sync_zotero_bibliographies(check: bool) -> tuple[bool, list[str]]:
    changed = False
    errors: list[str] = []
    for source in ZOTERO_BIBLIOGRAPHIES:
        try:
            data = normalize_bibliography(fetch_zotero_bibliography(source["group_id"], source["tag"]))
            if not ENTRY_HEADER.search(data):
                raise RuntimeError(f"Zotero returned no BibTeX entries for {source['destination']}")
        except Exception as error:
            errors.append(f"{source['tag']}: {error}")
            continue

        changed = write_bibliography(source["destination"], data, check) or changed
    return changed, errors


def normalize_local_bibliographies(check: bool) -> bool:
    changed = False
    for bibliography in LOCAL_BIBLIOGRAPHIES:
        if not bibliography.exists():
            continue

        data = normalize_bibliography(bibliography.read_bytes())
        if not ENTRY_HEADER.search(data):
            print(f"Skipped {bibliography}: no BibTeX entries")
            continue

        changed = write_bibliography(bibliography, data, check) or changed
    return changed


def write_github_output(name: str, value: str) -> None:
    output = os.environ.get("GITHUB_OUTPUT")
    if not output:
        return

    with open(output, "a", encoding="utf-8") as handle:
        handle.write(f"{name}={value}\n")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Report updates without writing files")
    args = parser.parse_args()

    changed, errors = sync_zotero_bibliographies(args.check)
    write_github_output("synced", "true" if len(errors) < len(ZOTERO_BIBLIOGRAPHIES) else "false")
    changed = normalize_local_bibliographies(args.check) or changed

    if errors:
        raise SystemExit("\n".join(errors))
    if args.check and changed:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
