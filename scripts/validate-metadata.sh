#!/usr/bin/env bash

# Validator for GTN-style metadata files against their schemas using pykwalify.
# Requires: uv (for uvx) and Python with PyYAML (installed on the fly via uvx).

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Format: data_path|schema_path|mode
# mode:
#   file  - validate the YAML file directly
#   news  - aggregate all content/news/**/index.md frontmatter into one YAML map
VALIDATIONS=(
    "content/CONTRIBUTORS.yaml|content/schema-contributors.yaml|file"
    "content/GRANTS.yaml|content/schema-grants.yaml|file"
    "content/ORGANISATIONS.yaml|content/schema-organisations.yaml|file"
    "content/news|content/schema-news.yaml|news"
)

sanitize_schema() {
    local schema_path="$1"
    local tmp_out="$2"
    local root="$3"

    uvx --from pyyaml python - "$schema_path" "$tmp_out" "$root" <<'PY'
import sys
from pathlib import Path
import yaml

schema_path = Path(sys.argv[1])
out_path = Path(sys.argv[2])
root = Path(sys.argv[3])

# Collect IDs for enum expansion.
org_ids = set()
grant_ids = set()
contrib_ids = set()
for src, dest in [
    (root / "content" / "ORGANISATIONS.yaml", org_ids),
    (root / "content" / "GRANTS.yaml", grant_ids),
    (root / "content" / "CONTRIBUTORS.yaml", contrib_ids),
]:
    if src.exists():
        data = yaml.safe_load(src.read_text()) or {}
        if isinstance(data, dict):
            dest.update(str(k) for k in data.keys())


def strip_pattern(val):
    if isinstance(val, str) and len(val) >= 2 and val.startswith("/") and val.endswith("/"):
        return val[1:-1]
    return val


def expand_enum(enum_list):
    if not isinstance(enum_list, list):
        return enum_list
    expanded = []
    for item in enum_list:
        if item == "ORGANISATIONS":
            expanded.extend(sorted(org_ids))
        elif item == "GRANTS":
            expanded.extend(sorted(grant_ids))
        elif item == "CONTRIBUTORS":
            expanded.extend(sorted(contrib_ids))
        else:
            expanded.append(item)
    return expanded


def clean(obj):
    if isinstance(obj, dict):
        new = {}
        for k, v in obj.items():
            if k.startswith("_") or k in {"description", "_examples"}:
                continue
            if k == "pattern":
                new[k] = strip_pattern(v)
                continue
            if k == "enum":
                new[k] = expand_enum(v)
                continue
            new[k] = clean(v)
        return new
    if isinstance(obj, list):
        return [clean(i) for i in obj]
    if isinstance(obj, str):
        return strip_pattern(obj)
    return obj


schema = yaml.safe_load(schema_path.read_text())
schema = clean(schema)
out_path.write_text(yaml.safe_dump(schema, sort_keys=False))
PY
}

aggregate_news() {
    local out_path="$1"
    uvx --from python-frontmatter python - "$out_path" <<'PY'
import sys, pathlib, frontmatter, yaml
root = pathlib.Path('content/news')
out = {}
for path in sorted(root.rglob('index.md')):
    out[path.parent.relative_to(root).as_posix()] = frontmatter.load(path).metadata
pathlib.Path(sys.argv[1]).write_text(yaml.safe_dump(out, sort_keys=False, allow_unicode=True))
PY
}

run_validation() {
    local data_path="$1"
    local schema_path="$2"
    local mode="$3"
    local tmp_schema
    tmp_schema="$(mktemp /tmp/schema-clean-XXXX.yaml)"

    sanitize_schema "$schema_path" "$tmp_schema" "$ROOT"

    local data_to_use="$data_path"
    local tmp_data=""
    if [[ "$mode" == "news" ]]; then
        tmp_data="$(mktemp /tmp/news-data-XXXX.yaml)"
        aggregate_news "$tmp_data"
        data_to_use="$tmp_data"
    fi

    echo "=== Validating $data_path with $schema_path ==="
    if uvx pykwalify -d "$data_to_use" -s "$tmp_schema"; then
        echo "OK: $data_path"
    else
        echo "FAILED: $data_path"
    fi
    echo
    rm -f "$tmp_schema"
    if [[ -n "$tmp_data" ]]; then
        rm -f "$tmp_data"
    fi
}

for entry in "${VALIDATIONS[@]}"; do
    IFS="|" read -r data schema mode <<< "$entry"
    run_validation "$ROOT/$data" "$ROOT/$schema" "$mode"
done
