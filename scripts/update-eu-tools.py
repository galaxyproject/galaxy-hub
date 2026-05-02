#!/usr/bin/env python3
"""Fetch tool list from a Galaxy instance and render a Hub tools page."""

import argparse
import requests


def render_tool_link(elem: dict, server_url: str) -> str:
    try:
        elem_id = elem["id"]
        # Escape quotes in name and description for Markdown compatibility
        elem_name = (elem.get("name") or "").replace('"', '\\"')
        elem_desc = (elem.get("description") or "").replace('"', '\\"')

        if "toolshed" in elem_id:
            tool_id = elem_id.split("/")[-2]
        else:
            tool_id = elem_id
        tool_link = f"{server_url}/root?tool_id={tool_id}"
    except Exception:
        print("Skipping elem:", elem)
        return ""
    # Use Markdown format for links with titles
    return f'[{elem_name}]({tool_link} "{elem_desc}")'


def main():
    parser = argparse.ArgumentParser(
        description="Fetch tool list from a Galaxy instance and render a Hub tools page."
    )
    parser.add_argument(
        "--server",
        default="https://usegalaxy.eu",
        help="Galaxy server URL (default: https://usegalaxy.eu)",
    )
    parser.add_argument(
        "--name",
        default="European Galaxy",
        help="Instance name for the title (default: European Galaxy)",
    )
    parser.add_argument(
        "--output",
        default="content/eu/tools/index.md",
        help="Output file path (default: content/eu/tools/index.md)",
    )
    args = parser.parse_args()

    server_url = args.server.rstrip("/")
    api_url = f"{server_url}/api/tools"

    print(f"Fetching tools from {api_url}...")
    r = requests.get(api_url)
    r.raise_for_status()

    tool_count = 0
    out = ""
    for section in r.json():
        model = section.get("model_class", "")
        if model == "ToolSection":
            # Add extra newline before headers to ensure they are parsed as block elements
            out += f'\n### {section["name"]}\n\n'
            out += '<div class="tool-list">\n\n'
            for elem in section.get("elems", []):
                if elem["model_class"] == "ToolSectionLabel":
                    continue
                tool_count += 1
                # Each link on its own line helps Markdown parsing
                out += render_tool_link(elem, server_url) + "\n"
            out += "\n</div>\n"
        elif model == "ToolSectionLabel":
            out += "\n---\n\n"
            out += f'## {section["text"]}\n\n'
        elif model == "Tool":
            tool_count += 1
            out += '<div class="tool-list">\n\n'
            out += render_tool_link(section, server_url) + "\n"
            out += "\n</div>\n"

    header = f"""---
# THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.
# To update, run: python3 scripts/update-eu-tools.py
title: {args.name} Tools
---

# {args.name} tools ({tool_count} and counting)
<hr/>
"""


    with open(args.output, "w") as f:
        f.write(header)
        f.write(out)

    print(f"Written {tool_count} tools to {args.output}")


if __name__ == "__main__":
    main()
