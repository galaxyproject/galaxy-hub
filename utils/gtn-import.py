#!/usr/bin/env python
import yaml
import sys
import os
from datetime import datetime
import feedparser

feed = feedparser.parse("https://training.galaxyproject.org/training-material/feed.xml")

posts = {}
count = 0
for entry in feed.entries:
    date_ymd = datetime.fromisoformat(entry["published"]).strftime('%Y-%m-%d')
    meta = {
        'subsites': ['all'],
        'main_subsite': 'global',
        'date': date_ymd,
        'tags': ['training', 'gtn-news'] + [x['term'] for x in entry['tags']],
        'title': entry['title'],
        'authors': ', '.join([x['name'] for x in entry['authors']]),
        'external_url': entry['link'],
        'tease': entry['summary'],
    }
    folder = date_ymd + '-' + entry['link'].split('/')[-1].replace('.html', '')

    if not os.path.exists(f"content/news/{folder}"):
        sys.stderr.write(f"New post: {folder}\n")
        count += 1
        os.makedirs(f"content/news/{folder}", exist_ok=True)
        with open(f"content/news/{folder}/index.md", "w") as f:
            f.write("---\n")
            yaml.dump(meta, f)
            f.write("\n---\n")
            f.write(entry['summary'])

print(f"count={count}")
