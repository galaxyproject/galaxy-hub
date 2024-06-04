#!/usr/bin/env python
import yaml
import sys
# import json
import os
from datetime import datetime, timedelta, timezone

import feedparser

# feedparser.sanitizer._HTMLSanitizer.acceptable_elements.remove("a")
# feedparser.sanitizer._HTMLSanitizer.acceptable_elements.remove("img")

feed = feedparser.parse("https://training.galaxyproject.org/training-material/feed.xml")

posts = {}
count = 0
for entry in feed.entries:
    # print(entry)
    meta = {
        'subsites': ['all'],
        'main_subsite': 'global',
        'date': entry["published"],
        'tags': ['training', 'gtn-news'] + [x['term'] for x in entry['tags']],
        'title': entry['title'],
        'authors': [x['name'] for x in entry['authors']],
        'external_url': entry['link'],
        'tease': entry['summary'],
    }
    date_ymd = datetime.fromisoformat(entry["published"]).strftime('%Y-%m-%d')
    folder = date_ymd + '-' + entry['link'].split('/')[-1].replace('.html', '')

    if not os.path.exists(f"content/news/{folder}"):
        sys.stderr.write(f"New post: {folder}\n")
        count += 1
        os.makedirs(f"content/news/{folder}")
        with open(f"content/news/{folder}/index.md", "w") as f:
            f.write("---\n")
            yaml.dump(meta, f)
            f.write("\n---\n")
            f.write(entry['summary'])
    # print(meta)

print(f"count={count}")
