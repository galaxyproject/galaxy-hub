#!/usr/bin/env python

"""
Shared helpers for validating frontmatter files with pykwalify.
"""

import os
import yaml
from pykwalify.core import Core
from pykwalify.errors import SchemaError

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


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
        return 0, "INFO - validation.valid\n"
    except SchemaError as exc:
        return 1, str(exc) + "\n"
