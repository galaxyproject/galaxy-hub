#!/usr/bin/env python3
"""Fetch tool list from usegalaxy.eu and render content/eu/tools/index.md."""

import requests

OUTPUT = "content/eu/tools/index.md"


def render_tool_button(elem: dict, link: str = "") -> str:
    try:
        elem_id = elem["id"]
        elem_name = elem["name"]
        elem_desc = (elem.get("description") or "").replace('"', "'")
        if "toolshed" in elem_id:
            tool_id = elem_id.split("/")[-2]
        else:
            tool_id = elem_id
        tool_link = f"https://usegalaxy.eu/root?tool_id={tool_id}"
    except Exception:
        print("Skipping elem:", elem)
        return ""
    return (
        f'<a href="{tool_link}" title="{elem_desc}">'
        f'<button type="button" class="btn btn-outline-primary btn-rounded waves-effect btn-xs"'
        f' style="margin: 2px">{elem_name}</button></a>\n'
    )


r = requests.get("https://usegalaxy.eu/api/tools")
r.raise_for_status()

tool_count = 0
out = ""
for section in r.json():
    model = section.get("model_class", "")
    if model == "ToolSection":
        anchor = section["name"].replace(" ", "").lower()
        out += f'<h3 id="{anchor}">{section["name"]}</h3>\n'
        for elem in section.get("elems", []):
            if elem["model_class"] == "ToolSectionLabel":
                continue
            tool_count += 1
            out += render_tool_button(elem)
    elif model == "ToolSectionLabel":
        anchor = section["text"].replace(" ", "").lower()
        out += "<hr/>"
        out += f'<h2 id="{anchor}">{section["text"]}</h2>\n'
    elif model == "Tool":
        tool_count += 1
        out += render_tool_button(section)

header = f"""---
title: European Galaxy Tools
---

# European Galaxy tools ({tool_count} and counting)
<hr/>
"""

with open(OUTPUT, "w") as f:
    f.write(header)
    f.write(out)

print(f"Written {tool_count} tools to {OUTPUT}")
