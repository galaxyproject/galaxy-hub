#!/usr/bin/env python

"""
Validate all "Did you know" item YAML files against schema-did-you-know.yaml.

Each file in content/did-you-know/ is a single YAML document (not markdown
frontmatter), so we read the whole file and key the aggregated map by its
filename slug — mirroring how news aggregation keys by folder name.
"""

import argparse
import logging
import os
import sys

import yaml

from validate_common import (
    ROOT,
    clean_schema,
    gather_ids,
    load_yaml,
    log_validation_errors,
    validate_data,
)


def aggregate_did_you_know(root_path):
    """Read every *.yml/*.yaml file under root_path as a single YAML document."""
    aggregated = {}
    parse_errors = []
    if not os.path.isdir(root_path):
        return aggregated, parse_errors
    for dirpath, _dirnames, filenames in os.walk(root_path):
        for name in sorted(filenames):
            if not name.endswith((".yml", ".yaml")):
                continue
            full = os.path.join(dirpath, name)
            rel = os.path.relpath(full, root_path)
            try:
                with open(full, "r", encoding="utf-8") as handle:
                    data = yaml.safe_load(handle)
            except Exception as exc:
                parse_errors.append(f"{rel}: invalid YAML ({exc})")
                continue
            if not isinstance(data, dict):
                parse_errors.append(f"{rel}: top-level YAML must be a mapping, got {type(data).__name__}")
                continue
            slug = os.path.splitext(name)[0]
            aggregated[slug] = data
    return aggregated, parse_errors


def main():
    logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")
    logger = logging.getLogger("validate_did_you_know")
    parser = argparse.ArgumentParser(description="Validate did-you-know item YAML")
    parser.add_argument(
        "--schema", default=os.path.join(ROOT, "content", "schema-did-you-know.yaml")
    )
    parser.add_argument("--quiet", action="store_true")
    args = parser.parse_args()

    ids = gather_ids()
    raw_schema = load_yaml(args.schema)
    cleaned_schema = clean_schema(raw_schema, ids)
    aggregated, parse_errors = aggregate_did_you_know(
        os.path.join(ROOT, "content", "did-you-know")
    )
    code, errors = validate_data(aggregated, cleaned_schema)
    parse_error_count = len(parse_errors)

    if errors and not args.quiet:
        log_validation_errors(errors, logger)
    if parse_errors and not args.quiet:
        for err in parse_errors:
            logger.error(f"PARSING - {err}")

    if code == 0 and parse_error_count == 0:
        logger.info("OK: did-you-know YAML valid")
    else:
        logger.error("FAILED: did-you-know YAML has issues")
        sys.exit(1)


if __name__ == "__main__":
    main()
