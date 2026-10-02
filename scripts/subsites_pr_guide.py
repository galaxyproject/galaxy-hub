#!/usr/bin/env python

"""
Generate a pull-request comment explaining `subsites` and `main_subsite` for
the news/events items changed in a PR.

Contributors often copy these frontmatter fields from older items without
knowing their effects. The comment points contributors to the centralized
explanation of `subsites` and `main_subsite` in CONTRIBUTING.md.

Social-media posting is driven by the galaxy-social-assistant
(https://github.com/usegalaxy-eu/galaxy-social-assistant), which reads
/news/feed.json and /events/feed.json. This guide does not reproduce its
channel mapping — CONTRIBUTING.md covers these fields and links to the
assistant's config.yml, which is the source of truth for those implications.

Usage:
    python scripts/subsites_pr_guide.py --base HEAD^1 --out subsites-guide.md
    python scripts/subsites_pr_guide.py --files-from /tmp/changed.txt

The output starts with a stable HTML marker so the posting workflow updates
its existing comment instead of adding a new one on every push.
"""

import argparse
import os
import subprocess
import sys

COMMENT_MARKER = "<!-- galaxy-hub:subsites-guide -->"

DOCS_URL = (
    "https://github.com/galaxyproject/galaxy-hub/blob/main/CONTRIBUTING.md"
    "#subsites-and-main_subsite-in-news-and-events"
)


def render_comment(targets):
    lines = [COMMENT_MARKER, ""]
    if not targets:
        lines.append(
            "No news or events items were changed in the latest revision of this PR — "
            "nothing to explain in that regard."
        )
        return "\n".join(lines).rstrip() + "\n"

    lines += [
        "## 🧭 `subsites` & `main_subsite` — for the news/events items in this PR",
        "",
        f"Usage instructions for these fields are available at [CONTRIBUTING.md → Subsites and main_subsite]({DOCS_URL}).",
        "Please use them with care!"
    ]
    return "\n".join(lines).rstrip() + "\n"


def git_changed_files(base):
    result = subprocess.run(
        ["git", "diff", "--name-only", base, "HEAD"],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        # e.g. a single-commit checkout without the base parent (workflow_dispatch)
        print(f"Could not diff against {base!r}: {result.stderr.strip()}", file=sys.stderr)
        return []
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def read_files_from(path):
    with open(path, "r", encoding="utf-8") as handle:
        return [line.strip() for line in handle if line.strip()]


def main():
    parser = argparse.ArgumentParser(
        description="Explain subsites/main_subsite for changed news/events items"
    )
    parser.add_argument("--base", default="HEAD^1", help="Git ref to diff against (default: HEAD^1)")
    parser.add_argument("--files", nargs="*", help="Explicit file list instead of a git diff")
    parser.add_argument("--files-from", help="Read one changed file path per line from this file")
    parser.add_argument("--out", help="Write the markdown to this path instead of stdout")
    args = parser.parse_args()

    if args.files:
        changed = args.files
    elif args.files_from:
        changed = read_files_from(args.files_from)
    else:
        changed = git_changed_files(args.base)

    targets = []
    for path in changed:
        norm = path.replace(os.sep, "/").lstrip("./")
        if not norm.startswith(("content/news/", "content/events/")):
            continue
        if os.path.basename(norm) != "index.md":
            continue
        targets.append(norm)

    markdown = render_comment(targets)

    if args.out:
        with open(args.out, "w", encoding="utf-8") as handle:
            handle.write(markdown)
    else:
        sys.stdout.write(markdown)


if __name__ == "__main__":
    main()
