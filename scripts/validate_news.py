#!/usr/bin/env python

"""
Validate all news frontmatter against schema-news.yaml.

- Expands enum placeholders (CONTRIBUTORS, ORGANISATIONS, GRANTS) from the corresponding files.
- Strips helper keys (_examples, description) and leading/trailing slashes in regex patterns.
- Aggregates all content/news/**/index.md frontmatter into a single in-memory map.
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
    parser = argparse.ArgumentParser(description="Validate news frontmatter")
    parser.add_argument("--schema", default=os.path.join(ROOT, "content", "schema-news.yaml"))
    parser.add_argument("--quiet", action="store_true")
    args = parser.parse_args()

    ids = gather_ids()
    raw_schema = load_yaml(args.schema)
    cleaned_schema = clean_schema(raw_schema, ids)
    aggregated_news = aggregate_frontmatter(os.path.join(ROOT, "content", "news"))
    code, out = validate_data(aggregated_news, cleaned_schema)

    if not args.quiet:
        sys.stdout.write(out)
    if code == 0:
        print("OK: news frontmatter valid")
    else:
        print("FAILED: news frontmatter has issues")
        sys.exit(code)


if __name__ == "__main__":
    main()
