#!/usr/bin/env python3
"""Fetch tool list from a Galaxy instance and render a Hub tools page."""

import argparse
import requests
import html
import urllib.parse


def render_tool_link(elem: dict, server_url: str) -> str:
    try:
        elem_id = elem["id"]
        # Escape HTML characters for MDX/HTML compatibility
        elem_name = html.escape(elem.get("name") or "")
        elem_desc = html.escape(elem.get("description") or "")

        if "toolshed" in elem_id:
            tool_id = elem_id.split("/")[-2]
        else:
            tool_id = elem_id

        tool_id = urllib.parse.quote(tool_id)
        # Escape quotes in description to not break Markdown link title
        elem_desc = elem_desc.replace('"', "&quot;")
        tool_link = f"{server_url}/root?tool_id={tool_id}"
    except Exception:
        print("Skipping elem:", elem)
        return ""
    return f'[{elem_name}]({tool_link} "{elem_desc}")'


def main():
    parser = argparse.ArgumentParser(
        description="Fetch tool list from a Galaxy instance and render a Hub tools page."
    )
    parser.add_argument(
        "--server",
        required=True,
        help="Galaxy server URL (e.g. https://usegalaxy.eu)",
    )
    parser.add_argument(
        "--name",
        required=True,
        help="Instance name for the title (e.g. European Galaxy)",
    )
    parser.add_argument(
        "--output",
        required=True,
        help="Output file path (e.g. content/eu/tools/index.md)",
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

            # Sort tools within the section deterministically
            elems = sorted(
                section.get("elems", []),
                key=lambda x: str(x.get("name", x.get("text", ""))),
            )

            for elem in elems:
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
# To update, run: python3 scripts/update-tools.py --server {args.server} --name "{args.name}" --output {args.output}
title: {args.name} Tools
description: "{tool_count} tools and counting"
---

"""

    with open(args.output, "w") as f:
        f.write(header)
        f.write(out)

    print(f"Written {tool_count} tools to {args.output}")


if __name__ == "__main__":
    main()
