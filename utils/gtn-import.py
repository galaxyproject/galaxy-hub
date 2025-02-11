import html
import logging
import os
import re
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
existing_files = [
    (pr.html_url, file.filename)
    for pr in repo.get_pulls(state="open", base=default_branch)
    for file in pr.get_files()
]

import_type = os.getenv("IMPORT_TYPE")
if import_type not in {"news", "events"}:
    sys.exit("IMPORT_TYPE should be either news or events")

branch_name = f"import-gtn-{import_type}-{datetime.now().strftime('%Y%m%d%H%M%S')}"
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

    slug = os.path.splitext(os.path.basename(link))[0]
    folder = f"{date_ymd}-{slug}" if import_type == "news" else f"{slug}"

    pr_exists = False
    for pr_url, file_path in existing_files:
        if folder in file_path:
            logging.info(f"PR already exists for {folder}: {pr_url}")
            pr_exists = True
            break
    if pr_exists:
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
        event_str = title.replace("\u2009", " ").replace("–", "-").strip()
        pattern = r"\[(\w+)\s+(\d{1,2})\s*-\s*(\d{1,2}),\s*(\d{4})\]\s*(.+)"
        match = re.match(pattern, event_str)
        if match:
            month, start_day, end_day, year, title = match.groups()
            start_date = datetime.strptime(f"{start_day} {month} {year}", "%d %B %Y")
            end_date = datetime.strptime(f"{end_day} {month} {year}", "%d %B %Y")
            duration = (end_date - start_date).days + 1
            date = start_date.strftime("%Y-%m-%d")
        else:
            date = date_ymd
            duration = 1

        gtn = "external" not in entry.get("category")

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
            "tags": list(tags),
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
