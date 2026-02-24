import html
import logging
import os
import sys
from datetime import datetime

import feedparser
import yaml
from country_converter import CountryConverter
from dateutil.parser import isoparse
from geopy.geocoders import Nominatim
from github import Github, GithubException

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

feed = feedparser.parse(os.getenv("FEED_URL"))

g = Github(os.getenv("GITHUB_TOKEN") or sys.exit("GITHUB_TOKEN not set"))
repo = g.get_repo(os.getenv("REPO_NAME") or sys.exit("REPO_NAME not set"))
default_branch = repo.default_branch

import_type = os.getenv("IMPORT_TYPE")
if import_type not in {"news", "events"}:
    sys.exit("IMPORT_TYPE should be either news or events")

branch_prefix = f"import-gtn-{import_type}-"

query = f"repo:{repo.full_name} is:pr is:unmerged base:{default_branch} head:{branch_prefix}"
existing_folders = set()
for issue in g.search_issues(query):
    for file in issue.as_pull_request().get_files():
        parts = file.filename.split("/")
        if len(parts) >= 3:
            existing_folders.add(parts[2])

branch_name = f"{branch_prefix}{datetime.now().strftime('%Y%m%d%H%M%S')}"
repo.create_git_ref(
    ref=f"refs/heads/{branch_name}", sha=repo.get_branch(default_branch).commit.sha
)


created_files = []
for entry in feed.get("entries", []):
    title = html.unescape(entry.get("title", "Untitled"))
    date_ymd = isoparse(
        entry.get("published") or entry.get("pubDate") or entry.get("updated")
    ).strftime("%Y-%m-%d")

    start_date = os.getenv("START_DATE")
    if start_date and date_ymd < start_date:
        logging.info(f"Skipping post {title} published on {date_ymd}")
        continue

    tags = {"training", "gtn-news"} if import_type == "news" else set()
    for tag in entry.get("tags", []):
        if "term" in tag:
            tags.add(tag["term"])
    if "already-on-hub" in tags:
        continue

    authors = ", ".join(tag.get("name", "") for tag in entry.get("authors", []))
    link = entry.get("link", "")
    summary = html.unescape(entry.get("summary", ""))

    id = entry.get("id", "")
    slug = os.path.splitext(os.path.basename(id.rstrip("/")))[0]
    folder = f"{date_ymd}-{slug}" if import_type == "news" else f"{slug}"

    if folder in existing_folders:
        logging.info(f"Skipping {folder}: already proposed in an existing PR")
        continue

    folder_path = os.path.join("content", import_type, folder)
    if os.path.exists(folder_path):
        logging.info(f"Folder Already exists: {folder}")
        continue

    created_files.append(f"[{title}]({link})")

    logging.info(f"New {import_type}: {folder}")

    if import_type == "news":
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
    elif import_type == "events":
        title = title.split("] ", 1)[-1]
        date, duration, gtn = date_ymd, 1, True
        for tag in tags:
            if tag.startswith("starts:"):
                date = isoparse(tag.split(":", 1)[1]).strftime("%Y-%m-%d")
            elif tag.startswith("days:"):
                duration = int(tag.split(":", 1)[1])
            elif tag.startswith("new event-external"):
                gtn = False
        if not gtn and link.startswith("https://galaxyproject.org/events/"):
            continue
        if geo := entry.get("georss"):
            location_raw = (
                Nominatim(user_agent="GTN")
                .reverse(map(float, geo.split()), language="en")
                .raw
            )
            city = location_raw.get("address", {}).get("city")
            country = location_raw.get("address", {}).get("country")
            location = f"{city}, {country}"
            continent_name = CountryConverter().convert(names=country, to="continent")
            continent_map = {
                "Africa": "AF",
                "Asia": "AS",
                "Australia": "AU",
                "Europe": "EU",
                "North America": "NA",
                "South America": "SA",
                "Oceania": "AU",
            }
            continent = continent_map.get(continent_name, "GL")
        else:
            location = "Online"
            continent = "GL"
        meta = {
            "subsites": ["all"],
            "gtn": gtn,
            "date": date,
            "days": duration,
            "title": str(title),
            "contact": authors,
            "location": {"name": location},
            "continent": continent,
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
        title=f"Import GTN {import_type.capitalize()}",
        body=f"This PR imports new GTN {import_type.capitalize()}.\n\n{"\n".join(created_files)}",
        head=branch_name,
        base=default_branch,
    )
    logging.info(
        f"Pull request created: {pr.html_url}\nTotal new {import_type}: {len(created_files)}"
    )
except GithubException as e:
    repo.get_git_ref(f"heads/{branch_name}").delete()
    error_message = e.data.get("errors")[0].get("message")
    print(f"Error in creating PR: {error_message}\nRemoving branch {branch_name}")
