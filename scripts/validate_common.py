#!/usr/bin/env python

"""
Shared helpers for validating frontmatter files with pykwalify.
"""

import logging
import os
import re
from datetime import datetime
import yaml
from pykwalify.core import Core
from pykwalify.errors import SchemaError

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
LOG = logging.getLogger(__name__)


def load_yaml(path):
    with open(path, "r", encoding="utf-8") as handle:
        return yaml.safe_load(handle) or {}


def gather_ids():
    contrib = load_yaml(os.path.join(ROOT, "content", "CONTRIBUTORS.yaml"))
    orgs = load_yaml(os.path.join(ROOT, "content", "ORGANISATIONS.yaml"))
    grants = load_yaml(os.path.join(ROOT, "content", "GRANTS.yaml"))
    tags = load_yaml(os.path.join(ROOT, "content", "TAGS.yaml"))
    subsites = load_yaml(os.path.join(ROOT, "content", "SUBSITES.yaml"))

    def to_set(values):
        if isinstance(values, dict):
            return set(values.keys())
        if isinstance(values, list):
            return {v for v in values if isinstance(v, str)}
        return set()

    return {
        "contrib": set(contrib.keys()),
        "orgs": set(orgs.keys()),
        "grants": set(grants.keys()),
        "tags": to_set(tags),
        "subsites": to_set(subsites),
    }


def strip_pattern(val):
    if isinstance(val, str) and len(val) >= 2 and val.startswith("/") and val.endswith("/"):
        return val[1:-1]
    return val


def expand_enum(enum_list, ids):
    if not isinstance(enum_list, list):
        return enum_list
    expanded = []
    for item in enum_list:
        if item == "CONTRIBUTORS":
            expanded.extend(sorted(ids["contrib"]))
        elif item == "ORGANISATIONS":
            expanded.extend(sorted(ids["orgs"]))
        elif item == "GRANTS":
            expanded.extend(sorted(ids["grants"]))
        elif item == "TAGS":
            expanded.extend(sorted(ids["tags"]))
        elif item == "SUBSITES":
            expanded.extend(sorted(ids["subsites"]))
        else:
            expanded.append(item)
    return expanded


def clean_schema(schema, ids):
    if isinstance(schema, dict):
        cleaned = {}
        for key, value in schema.items():
            if key.startswith("_") or key in {"description"}:
                continue
            if key == "pattern":
                cleaned[key] = strip_pattern(value)
                continue
            if key == "enum":
                cleaned[key] = expand_enum(value, ids)
                continue
            cleaned[key] = clean_schema(value, ids)
        return cleaned
    if isinstance(schema, list):
        return [clean_schema(item, ids) for item in schema]
    if isinstance(schema, str):
        return strip_pattern(schema)
    return schema


def parse_frontmatter(path):
    text = open(path, "r", encoding="utf-8").read()
    if not text.startswith("---"):
        return {}
    parts = text.split("\n")
    if len(parts) < 3:
        return {}
    front = []
    for line in parts[1:]:
        if line.strip() == "---":
            break
        front.append(line)
    try:
        return yaml.safe_load("\n".join(front)) or {}
    except Exception:
        return {}


def aggregate_frontmatter(root_path):
    aggregated = {}
    for dirpath, _, filenames in os.walk(root_path):
        if "index.md" in filenames:
            rel = os.path.relpath(dirpath, root_path)
            aggregated[rel] = parse_frontmatter(os.path.join(dirpath, "index.md"))
    return aggregated


def validate_data(source_data, schema_data):
    c = Core(source_data=source_data, schema_data=schema_data)
    try:
        c.validate()
        return 0, []
    except SchemaError as exc:
        messages = []
        for source in (getattr(exc, "msg", "") or "", str(exc)):
            if not source:
                continue
            for line in source.splitlines():
                line = line.strip()
                if not line:
                    continue
                if line.startswith(("Schema validation failed", "<SchemaError", "--- All found errors", "validation.invalid")):
                    continue
                if line.startswith("- "):
                    line = line[2:]
                messages.append(line)
            if messages:
                break
        if not messages:
            messages.append(str(exc))
        return 1, messages


def check_recent_folder_names(aggregated, cutoff="2026-02-01"):
    """
    For entries with a frontmatter date newer than cutoff, ensure the folder
    name matches YYYY-MM-DD-suffix and that the date prefix matches the
    frontmatter date.
    """
    errors = []
    cutoff_date = datetime.strptime(cutoff, "%Y-%m-%d").date()
    pattern = re.compile(r"^(\d{4}-\d{2}-\d{2})-[a-z0-9_-]+$")

    for folder, data in aggregated.items():
        if not isinstance(data, dict):
            continue
        fm_date = data.get("date")
        if not isinstance(fm_date, str):
            continue
        try:
            parsed_date = datetime.strptime(fm_date, "%Y-%m-%d").date()
        except ValueError:
            continue
        if parsed_date <= cutoff_date:
            continue
        match = pattern.match(folder)
        if not match:
            errors.append(f"{folder}: folder name must follow YYYY-MM-DD-suffix for entries after {cutoff}")
            continue
        folder_date = match.group(1)
        if folder_date != fm_date:
            errors.append(f"{folder}: folder date {folder_date} does not match frontmatter date {fm_date}")
    return errors


def log_validation_errors(errors, logger):
    for err in errors:
        logger.error(err)
        lower = err.lower()
        hint = None
        if "tag" in lower and "enum" in lower or "/tags" in lower:
            hint = "If this is a new tag, add it to content/TAGS.yaml."
        elif "subsite" in lower:
            hint = "If this is a new subsite, add it to content/SUBSITES.yaml."
        elif any(key in lower for key in ["funding", "grant", "contributor", "organisation", "organization"]):
            hint = "If this is a new contributor/organisation/grant ID, update the GTN vocababulary files (CONTRIBUTORS.yaml / ORGANISATIONS.yaml / GRANTS.yaml) under https://github.com/galaxyproject/training-material"
        if hint:
            logger.error(hint)
