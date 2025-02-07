import html
import logging
import os
import sys
from datetime import datetime

import feedparser
import yaml
from dateutil.parser import isoparse
from github import Github, GithubException

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

feed = feedparser.parse(os.getenv("GTN_NEWS_FEED_URL"))

g = Github(os.getenv("GITHUB_TOKEN") or sys.exit("GITHUB_TOKEN not set"))
repo = g.get_repo(os.getenv("REPO_NAME") or sys.exit("REPO_NAME not set"))
default_branch = repo.default_branch
existing_files = [
    (pr.html_url, file.filename)
    for pr in repo.get_pulls(state="all", base=default_branch)
    for file in pr.get_files()
]

branch_name = f"import-gtn-posts-{datetime.now().strftime('%Y%m%d%H%M%S')}"
repo.create_git_ref(
    ref=f"refs/heads/{branch_name}", sha=repo.get_branch(default_branch).commit.sha
)

created_files = []
for entry in feed.entries:
    title = html.unescape(entry.get("title", "Untitled"))
    date_ymd = isoparse(
        entry.get("published") or entry.get("pubDate") or entry.get("updated")
    ).strftime("%Y-%m-%d")

    tags = {"training", "gtn-news"} | {
        tag["term"] for tag in entry.get("tags", []) if "term" in tag
    }
    if "already-on-hub" in tags:
        continue

    authors = ", ".join(tag.get("name", "") for tag in entry.get("authors", []))
    link = entry.get("link", "")
    summary = html.unescape(entry.get("summary", ""))

    slug = os.path.splitext(os.path.basename(link))[0]
    folder = f"{date_ymd}-{slug}"

    pr_exists = False
    for pr_url, file_path in existing_files:
        if folder in file_path:
            logging.info(f"PR already exists for {folder}: {pr_url}")
            pr_exists = True
            break
    if pr_exists:
        continue

    folder_path = os.path.join("content", "news", folder)
    if os.path.exists(folder_path):
        logging.info(f"Folder Already exists: {folder}")
        continue

    logging.info(f"New post: {folder}")
    created_files.append(f"[{title}]({link})")
    meta = {
        "subsites": ["all"],
        "main_subsite": "global",
        "date": date_ymd,
        "tags": list(tags),
        "title": str(title),
        "authors": authors,
        "external_url": link,
        "tease": str(summary.split(". ")[0]),
    }
    md_config = yaml.dump(
        meta, default_flow_style=False, sort_keys=False, allow_unicode=True
    )
    repo.create_file(
        path=os.path.join(folder_path, "index.md"),
        message=f"Add {title}",
        content=f"---\n{md_config}---\n{summary}",
        branch=branch_name,
    )

try:
    pr = repo.create_pull(
        title="Import GTN Posts",
        body=f"This PR imports new GTN posts.\nNew posts:\n{"\n".join(created_files)}",
        head=branch_name,
        base=default_branch,
    )
    logging.info(
        f"Pull request created: {pr.html_url}\nTotal new posts: {len(created_files)}"
    )
except GithubException as e:
    repo.get_git_ref(f"heads/{branch_name}").delete()
    error_message = e.data.get("errors")[0].get("message")
    print(f"Error in creating PR: {error_message}\nRemoving branch {branch_name}")
