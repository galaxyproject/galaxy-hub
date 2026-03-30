#!/usr/bin/env python3
"""Validate generated Astro RSS/Atom feeds with the W3C feedvalidator."""

import argparse
import sys
from pathlib import Path

try:
    import feedvalidator  # type: ignore
    from feedvalidator import logging as fv_logging  # type: ignore
    from feedvalidator.formatter.text_plain import Formatter  # type: ignore
except Exception as exc:  # pragma: no cover - import failure path
    print(
        "Unable to import W3C feedvalidator. Ensure PYTHONPATH points to "
        "the validator's src directory and its dependencies are installed.",
        file=sys.stderr,
    )
    raise SystemExit(2) from exc


FEED_PATTERNS = ("**/feed.xml", "**/feed.atom")


def find_feed_files(dist_dir):
    matches = set()
    for pattern in FEED_PATTERNS:
        for path in dist_dir.glob(pattern):
            if path.is_file():
                matches.add(path)
    return sorted(matches)


def route_for(feed_path, dist_dir):
    return "/" + feed_path.relative_to(dist_dir).as_posix()


def event_messages(events):
    formatter = Formatter(list(events))
    return formatter.getErrors(), formatter.getWarnings()


def validate_feed(feed_path, dist_dir, base_url):
    route = route_for(feed_path, dist_dir)
    content = feed_path.read_bytes()
    result = feedvalidator.validateString(
        content,
        firstOccurrenceOnly=0,
        fallback="utf-8",
        base=f"{base_url.rstrip('/')}{route}",
    )
    events = result.get("loggedEvents", [])
    errors, warnings = event_messages(events)
    info_count = sum(1 for event in events if isinstance(event, fv_logging.Info))
    return route, errors, warnings, info_count


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--dist-dir",
        default="astro/dist",
        help="Path to Astro build output directory (default: astro/dist)",
    )
    parser.add_argument(
        "--base-url",
        default="https://galaxyproject.org",
        help="Base site URL used for feed validation context",
    )
    parser.add_argument(
        "--fail-on-warnings",
        action="store_true",
        help="Treat warnings as failures",
    )
    parser.add_argument(
        "--max-messages-per-feed",
        type=int,
        default=5,
        help="Maximum error/warning messages to print per feed",
    )
    args = parser.parse_args()

    dist_dir = Path(args.dist_dir).resolve()
    if not dist_dir.exists():
        print(f"Build output directory not found: {dist_dir}", file=sys.stderr)
        return 2

    feeds = find_feed_files(dist_dir)
    if not feeds:
        print(f"No feed files found in {dist_dir}", file=sys.stderr)
        return 2

    total_errors = 0
    total_warnings = 0
    total_info = 0

    print(f"Validating {len(feeds)} feed(s) in {dist_dir}")

    for feed_path in feeds:
        route, errors, warnings, info_count = validate_feed(feed_path, dist_dir, args.base_url)
        total_errors += len(errors)
        total_warnings += len(warnings)
        total_info += info_count
        print(f"- {route}: {len(errors)} error(s), {len(warnings)} warning(s), {info_count} info")

        for message in errors[: args.max_messages_per_feed]:
            print(f"  ERROR: {message}")

        should_print_warnings = args.fail_on_warnings or (len(errors) == 0 and len(warnings) > 0)
        if should_print_warnings:
            for message in warnings[: args.max_messages_per_feed]:
                print(f"  WARN:  {message}")

    if total_errors > 0:
        print(f"Validation failed with {total_errors} error(s) across {len(feeds)} feed(s).", file=sys.stderr)
        return 1

    if args.fail_on_warnings and total_warnings > 0:
        print(
            f"Validation failed with {total_warnings} warning(s) across {len(feeds)} feed(s).",
            file=sys.stderr,
        )
        return 1

    print(
        "Validation passed: "
        f"{len(feeds)} feed(s), {total_errors} error(s), {total_warnings} warning(s), {total_info} info."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
