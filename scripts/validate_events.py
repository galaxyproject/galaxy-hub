#!/usr/bin/env python

"""
Validate all events frontmatter against schema-events.yaml.

- Expands enum placeholders (CONTRIBUTORS, ORGANISATIONS, GRANTS) from the corresponding files.
- Strips helper keys (_examples, description) and leading/trailing slashes in regex patterns.
- Aggregates all content/events/**/index.md frontmatter
"""

import argparse
import logging
import os
import sys
from validate_common import (
    ROOT,
    aggregate_frontmatter,
    check_recent_folder_names,
    clean_schema,
    gather_ids,
    load_yaml,
    validate_data,
    log_validation_errors,
)


def main():
    logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")
    logger = logging.getLogger("validate_events")
    parser = argparse.ArgumentParser(description="Validate events frontmatter")
    parser.add_argument("--schema", default=os.path.join(ROOT, "content", "schema-events.yaml"))
    parser.add_argument("--be-strict-from", dest="cutoff", default="2026-02-01")
    parser.add_argument("--quiet", action="store_true")
    args = parser.parse_args()

    ids = gather_ids()
    raw_schema = load_yaml(args.schema)
    cleaned_schema = clean_schema(raw_schema, ids)
    aggregated_events = aggregate_frontmatter(os.path.join(ROOT, "content", "events"))
    code, errors = validate_data(aggregated_events, cleaned_schema)
    folder_errors = check_recent_folder_names(aggregated_events, cutoff=args.cutoff)

    if errors and not args.quiet:
        log_validation_errors(errors, logger)
    if folder_errors and not args.quiet:
        for err in folder_errors:
            logger.error(f"FOLDER - {err}")

    if code == 0 and not folder_errors:
        logger.info("OK: events frontmatter valid")
    else:
        logger.error("FAILED: events frontmatter has issues")
        sys.exit(1)


if __name__ == "__main__":
    main()
