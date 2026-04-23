#!/usr/bin/env python3
"""Fetch citations from Zotero, update citations-eu.bib, and render index.md."""

import os
import sys
from collections import defaultdict

import bibtexparser
from bibtexparser.bparser import BibTexParser
from pyzotero import zotero

BIB_DIR = "content/eu/citations"
BIB_FILE = os.path.join(BIB_DIR, "citations-eu.bib")
BIB_MANUAL = os.path.join(BIB_DIR, "citations-eu-manual.bib")
OUTPUT = os.path.join(BIB_DIR, "index.md")

ZOTERO_GROUP = "1732893"
ZOTERO_TAGS = (
    ">UseGalaxy.eu || >RNA Workbench || RNA workbench || >ASaiM || >Live EU || "
    ">Proteomics EU || >Metagenomics EU || >ML Workbench || >ChemicalToolbox"
)


def fetch_zotero() -> None:
    zot = zotero.Zotero(ZOTERO_GROUP, "group")
    zot.add_parameters(
        style="mla",
        format="bibtex",
        linkwrap="1",
        tag=ZOTERO_TAGS,
    )
    items = zot.everything(zot.top())
    with open(BIB_FILE, "w") as f:
        bibtexparser.dump(items, f)
    print(f"Wrote {BIB_FILE}")


def load_bib(path: str) -> list[dict]:
    if not os.path.exists(path):
        return []
    parser = BibTexParser(common_strings=True)
    parser.ignore_nonstandard_types = False
    with open(path, encoding="utf-8") as f:
        db = bibtexparser.load(f, parser)
    return db.entries


def format_entry(entry: dict) -> str:
    authors = entry.get("author", "Unknown authors")
    title = entry.get("title", "Untitled").strip("{}")
    journal = entry.get("journal", entry.get("booktitle", ""))
    year = entry.get("year", "")
    url = entry.get("url", "")
    doi = entry.get("doi", "")

    link = url or (f"https://doi.org/{doi}" if doi else "")
    title_md = f"[{title}]({link})" if link else title

    parts = [f"- {authors}. {title_md}."]
    if journal:
        parts[0] += f" *{journal}*."
    if year:
        parts[0] += f" {year}."
    return parts[0]


def render_index(entries: list[dict]) -> None:
    by_year: dict[str, list[dict]] = defaultdict(list)
    patents: list[dict] = []

    for e in entries:
        if e.get("ENTRYTYPE", "").lower() == "patent":
            patents.append(e)
        else:
            year = e.get("year", "0000")
            by_year[year].append(e)

    lines = [
        "---",
        "title: Citations",
        "---",
        "",
        "# Scientific research using & citing the European Galaxy server",
        "",
        "This is the list of scientific publications that cited the European Galaxy "
        "instance sorted by year. Please help us to support this project with your "
        "[acknowledgement](/eu/about/).",
        "",
    ]

    for year in sorted(by_year.keys(), reverse=True):
        lines.append(f"## {year}")
        lines.append("")
        for e in by_year[year]:
            lines.append(format_entry(e))
        lines.append("")

    if patents:
        lines.append("## Patents")
        lines.append("")
        for e in patents:
            lines.append(format_entry(e))
        lines.append("")

    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"Rendered {sum(len(v) for v in by_year.values())} articles + {len(patents)} patents to {OUTPUT}")


def main() -> None:
    skip_fetch = "--no-fetch" in sys.argv
    if not skip_fetch:
        fetch_zotero()

    entries = load_bib(BIB_FILE) + load_bib(BIB_MANUAL)

    seen: set[str] = set()
    deduped: list[dict] = []
    for e in entries:
        key = e.get("ID", "")
        if key not in seen:
            seen.add(key)
            deduped.append(e)

    render_index(deduped)


if __name__ == "__main__":
    main()
