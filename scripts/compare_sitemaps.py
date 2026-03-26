#!/usr/bin/env python3
"""
Compare legacy Gridsome and new Astro sitemaps.

By default sitemaps are in:
  - dist/sitemap.xml (Gridsome)
  - astro/dist/sitemap-index.xml (Astro, will auto-load sitemap-*.xml)

It reports any URLs present in the Gridsome sitemap but missing from Astro
"""

import argparse
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse


NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def path_only(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path or "/"
    return (path.rstrip("/") or "/") + "/"


def read_urlset(path: Path) -> set[str]:
    root = ET.parse(path).getroot()
    return {elem.text.strip() for elem in root.findall(".//sm:loc", NS) if elem.text}


def load_sitemap(path: Path) -> set[str]:
    """
    Load a sitemap file. If it is a sitemapindex, attempt to load sibling
    sitemap-*.xml files in the same directory.
    """
    if not path.exists():
        raise FileNotFoundError(f"Sitemap not found: {path}")

    root = ET.parse(path).getroot()
    tag = root.tag.lower()

    if tag.endswith("sitemapindex"):
        # Prefer explicit children
        child_urls = [elem.text.strip() for elem in root.findall(".//sm:loc", NS) if elem.text]
        urls: set[str] = set()
        for child in child_urls:
            child_path = Path(urlparse(child).path.lstrip("/"))
            candidate = child_path if child_path.is_file() else path.parent / Path(child).name
            if candidate.is_file():
                urls.update(load_sitemap(candidate))
        # Fallback: all sitemap-*.xml siblings
        if not urls:
            for candidate in sorted(path.parent.glob("sitemap-*.xml")):
                urls.update(read_urlset(candidate))
        return urls

    return read_urlset(path)


def compare_sitemaps(grid_path: Path, astro_path: Path, limit: int) -> int:
    grid_urls = {path_only(u) for u in load_sitemap(grid_path)}
    astro_urls = {path_only(u) for u in load_sitemap(astro_path)}

    missing_in_astro = sorted(grid_urls - astro_urls)

    lower_grid = {p.lower(): p for p in grid_urls}
    lower_astro = {p.lower(): p for p in astro_urls}
    case_diffs = [
        (grid_path_val, lower_astro[lower])
        for lower, grid_path_val in lower_grid.items()
        if lower in lower_astro and lower_astro[lower] != grid_path_val
    ]

    print(f"Gridsome URLs: {len(grid_urls)}")
    print(f"Astro URLs:    {len(astro_urls)}")
    print(f"Missing in Astro: {len(missing_in_astro)}")
    for path in missing_in_astro[:limit]:
        print(f" - {path}")
    if len(missing_in_astro) > limit:
        print(f" ... (+{len(missing_in_astro) - limit} more)")

    print(f"\nCase-only differences: {len(case_diffs)}")
    for grid_val, astro_val in case_diffs[:limit]:
        print(f" * Grid: {grid_val}  |  Astro: {astro_val}")
    if len(case_diffs) > limit:
        print(f" ... (+{len(case_diffs) - limit} more)")

    return 0


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Compare Gridsome vs Astro sitemaps.")
    parser.add_argument(
        "--grid",
        type=Path,
        default=Path("dist/sitemap.xml"),
        help="Path to Gridsome sitemap.xml (urlset or sitemapindex).",
    )
    parser.add_argument(
        "--astro",
        type=Path,
        default=Path("astro/dist/sitemap-index.xml"),
        help="Path to Astro sitemap (index or urlset).",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=50,
        help="Max entries to print for each list.",
    )
    args = parser.parse_args(argv)

    return compare_sitemaps(args.grid, args.astro, args.limit)


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
