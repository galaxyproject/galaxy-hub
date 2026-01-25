#!/usr/bin/env python

"""
Validate all events frontmatter against schema-events.yaml.

- Expands enum placeholders (CONTRIBUTORS, ORGANISATIONS, GRANTS) from the corresponding files.
- Strips helper keys (_examples, description) and leading/trailing slashes in regex patterns.
- Aggregates all content/events/**/index.md frontmatter into a single in-memory map.
- Runs pykwalify in-process (no subprocess).
"""

import argparse
import os
import sys
from validate_common import (
    ROOT,
    aggregate_frontmatter,
    clean_schema,
    gather_ids,
    load_yaml,
    validate_data,
)


def main():
    parser = argparse.ArgumentParser(description="Validate events frontmatter")
    parser.add_argument("--schema", default=os.path.join(ROOT, "content", "schema-events.yaml"))
    parser.add_argument("--quiet", action="store_true")
    args = parser.parse_args()

    ids = gather_ids()
    raw_schema = load_yaml(args.schema)
    cleaned_schema = clean_schema(raw_schema, ids)
    aggregated_events = aggregate_frontmatter(os.path.join(ROOT, "content", "events"))
    code, out = validate_data(aggregated_events, cleaned_schema)

    if not args.quiet:
        sys.stdout.write(out)
    if code == 0:
        print("OK: events frontmatter valid")
    else:
        print("FAILED: events frontmatter has issues")
        sys.exit(code)


if __name__ == "__main__":
    main()
