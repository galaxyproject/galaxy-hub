#!/usr/bin/env python

import sys
from datetime import datetime
now = datetime.now()

from github import Github


pr_number = 14549
github_token = '49d3d3fb5efd0550f1d864955a8e56ac0b33e98b'


g = Github(github_token)

hub_repo = g.get_repo("bgruening/galaxy-hub")


source_branch = hub_repo.default_branch
target_branch = f'news_pr_{pr_number}'

sb = hub_repo.get_branch(source_branch)
hub_repo.create_git_ref(ref='refs/heads/' + target_branch, sha=sb.commit.sha)


galaxy_repo = g.get_repo("galaxyproject/galaxy")
pr = galaxy_repo.get_pull(pr_number)

norm_tite = pr.title.lower().replace(' ', '-')
creator = pr.user
date = pr.merged_at.strftime("%Y-%m-%d") if pr.merged_at else None

if not date:
    sys.exit('PR is not merged yet.')

labels = [label.name for label in pr.labels]

reviewers = set()
for review in pr.get_reviews():
    review.user
    if not review.user == creator:
        reviewers.add(review.user)

reviewer_names = [f'[{rev.name}]({rev.html_url})' for rev in reviewers]
reviewer_text = "{} and {}".format(", ".join(reviewer_names[:-1]), reviewer_names[-1]) if len(reviewer_names) > 1 else reviewer_names[0]

body = f"""---
title: {pr.title} from {creator.name}
date: "{date}"
tease: "New pull request from {creator.name} merged: {pr.title}"
hide_tease: true
autotoc: false
tags: {labels}
subsites: [global]
---

"""
for line in pr.body.splitlines():
    if line.startswith('## How to test'):
        break
    if line.startswith('## License'):
        break
    body += line + '\n'

body += f"\n\n Thanks to the reviewers {reviewer_text}. Check out the code at [#{pr_number}](https://github.com/galaxyproject/galaxy/pull/{pr_number})"

hub_repo.create_file(f'content/news/{date}_{norm_tite}/index.md', f'News entry for PR ({pr_number}): "{pr.title}"', body, branch=target_branch)
