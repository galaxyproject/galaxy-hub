---
title: File organization
pretitle: "[Home](/) > [Hub](/hub/) > [Contributing](/hub/contributing/) > [File Organization](/hub/contributing/file-organization/)"
---

A central concept of the Hub system is that the organization of the files is the same as the organization of the pages on the website. That means that the path for the Markdown file for each page is the same as its url. Examples will illustrate this best:

<div class="compact">

| Path to Markdown file                        | URL                                            |
|:---------------------------------------------|:-----------------------------------------------|
| `content/events/2021-02-gtn/index.md`        | `galaxyproject.org/events/2021-02-gtn/`        |
| `content/galaxy-project/statistics/index.md` | `galaxyproject.org/galaxy-project/statistics/` |

</div>

Basically, the directories in the `content` directory are the urls of the site. The content of each page is in an `index.md` file inside the final directory in the path.
