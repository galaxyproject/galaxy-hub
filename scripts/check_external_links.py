#!/usr/bin/env python3
"""
Check outbound links in Hub content for rot.

`npm run links:internal` checks links inside the Hub. Nothing checked the
external ones, so they rot silently: a card can point at a retired document
pointing at an abandoned one, and nobody notices because nobody lands on a card.

  python3 scripts/check_external_links.py content/community
  python3 scripts/check_external_links.py content            # whole Hub, slow

The classification matters more than the raw status code:

  DEAD         404/410 - genuinely gone, fix these
  SERVERERR    5xx - broken now, possibly transient
  BLOCKED      401/403 - auth wall or bot-blocking, needs a human look
  LOGIN        redirects to a sign-in page (Google Docs/Drive/Calendar)
  UNREACHABLE  DNS/TLS/timeout after a retry - often the checker's own network
  OK           2xx/3xx reaching a real page

Two deliberate guards against false positives, which waste more reviewer time
than the dead links they hide:

  * A failed HEAD is never trusted. Some servers answer HEAD with 404 or 403 on
    URLs that serve fine over GET (toolshed.g2.bx.psu.edu does), so every HEAD
    failure falls through to a GET before anything is reported.
  * Network-level failures are retried once after a pause, because a host that
    is briefly unreachable otherwise shows up as a page full of dead links.

Exit status is 0 unless --fail-on-dead is passed.
"""

from __future__ import annotations

import argparse
import collections
import os
import re
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor

# Generic client name: no personal or project contact details go to third parties.
USER_AGENT = "galaxy-hub-link-check/1.0 (+automated link check)"
TIMEOUT = 25
SKIP_HOSTS = {"localhost", "127.0.0.1", "example.com", "example.org", "example.net"}
SKIP_DIRS = {"images", "assets", "node_modules", ".git"}
TEXT_SUFFIXES = (".md", ".mdx", ".yml", ".yaml", ".html")
URL_RE = re.compile(r"https?://[^\s<>()\[\]\"'`|\\]+")
TRAILING = ".,;:!?*_"
SIGNIN_RE = re.compile(r"accounts\.google\.com|/login|/signin|ServiceLogin", re.I)

STATES = ["DEAD", "SERVERERR", "BLOCKED", "LOGIN", "UNREACHABLE", "OK"]


def host_of(url: str) -> str:
    return re.sub(r"^https?://(www\.)?", "", url).split("/")[0].lower()


def collect_urls(root: str) -> dict[str, set[str]]:
    """Map each distinct external URL to the content files that reference it."""
    found: dict[str, set[str]] = collections.defaultdict(set)
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in filenames:
            if not name.endswith(TEXT_SUFFIXES):
                continue
            path = os.path.join(dirpath, name)
            try:
                with open(path, encoding="utf-8", errors="ignore") as handle:
                    text = handle.read()
            except OSError:
                continue
            for raw in URL_RE.findall(text):
                url = raw.rstrip(TRAILING)
                if host_of(url) not in SKIP_HOSTS:
                    found[url].add(path)
    return found


def _open(url: str, method: str):
    request = urllib.request.Request(
        url, method=method, headers={"User-Agent": USER_AGENT, "Accept": "*/*"}
    )
    return urllib.request.urlopen(request, timeout=TIMEOUT)


def classify(url: str, opener=_open) -> tuple[str, str]:
    """Return (state, detail). `opener` is injected so tests need no network."""
    for method in ("HEAD", "GET"):
        try:
            response = opener(url, method)
            final_url = response.geturl()
            code = response.getcode()
            if SIGNIN_RE.search(final_url or ""):
                return "LOGIN", f"{code} -> sign-in"
            return "OK", str(code)
        except urllib.error.HTTPError as err:
            # Never trust a failed HEAD; fall through to GET.
            if method == "HEAD":
                continue
            if err.code in (404, 410):
                return "DEAD", str(err.code)
            if err.code in (401, 403):
                return "BLOCKED", str(err.code)
            if 500 <= err.code < 600:
                return "SERVERERR", str(err.code)
            return "OK", str(err.code)
        except Exception as err:  # noqa: BLE001 - DNS, TLS, timeout, redirect loops
            if method == "HEAD":
                continue
            return "UNREACHABLE", type(err).__name__
    return "UNREACHABLE", "no-method-succeeded"


def check_all(urls, workers: int, retry_pause: float = 10.0, opener=_open):
    results: dict[str, tuple[str, str]] = {}

    def run(url: str) -> None:
        results[url] = classify(url, opener)

    with ThreadPoolExecutor(max_workers=workers) as pool:
        list(pool.map(run, urls))

    flaky = [u for u, (state, _) in results.items() if state in ("UNREACHABLE", "SERVERERR")]
    if flaky:
        print(f"retrying {len(flaky)} network failures after a pause ...", file=sys.stderr)
        time.sleep(retry_pause)
        with ThreadPoolExecutor(max_workers=max(1, workers // 2)) as pool:
            list(pool.map(run, flaky))
    return results


def report(results, urls, show_ok: bool = False) -> None:
    counts = collections.Counter(state for state, _ in results.values())
    print("\n" + "  ".join(f"{s}={counts.get(s, 0)}" for s in STATES) + "\n")
    for state in STATES:
        if state == "OK" and not show_ok:
            continue
        rows = sorted((u, d) for u, (s, d) in results.items() if s == state)
        if not rows:
            continue
        print(f"\n## {state} ({len(rows)})")
        for url, detail in rows:
            print(f"  [{detail}] {url}")
            for path in sorted(urls[url])[:3]:
                print(f"        {path}")


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    parser.add_argument("root", nargs="?", default="content", help="content directory to scan")
    parser.add_argument("--workers", type=int, default=8)
    parser.add_argument("--show-ok", action="store_true", help="also list links that are fine")
    parser.add_argument(
        "--fail-on-dead", action="store_true", help="exit non-zero if any link is DEAD"
    )
    args = parser.parse_args(argv)

    urls = collect_urls(args.root)
    print(f"{len(urls)} distinct external URLs under {args.root}", file=sys.stderr)
    results = check_all(urls, args.workers)
    report(results, urls, args.show_ok)

    dead = sum(1 for state, _ in results.values() if state == "DEAD")
    return 1 if (args.fail_on_dead and dead) else 0


if __name__ == "__main__":
    raise SystemExit(main())
