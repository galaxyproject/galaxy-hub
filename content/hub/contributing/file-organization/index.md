---
title: File organization
pretitle: "[Home](/) > [Hub](/hub/) > [Contributing](/hub/contributing/) > [File Organization](/hub/contributing/file-organization/)"
---

## The url is the directory

A central concept of the Hub is that the organization of the files is the same as the organization of the pages on the website. That means that the path for the Markdown file for each page is the same as its url. Examples will illustrate this best:

<div class="compact">

| Path to Markdown file                        | URL                                            |
|:---------------------------------------------|:-----------------------------------------------|
| `content/events/2021-02-gtn/index.md`        | `galaxyproject.org/events/2021-02-gtn/`        |
| `content/galaxy-project/statistics/index.md` | `galaxyproject.org/galaxy-project/statistics/` |

</div>

Basically, the directories in the `content` directory are the urls of the site. The content of each page is in an `index.md` file inside the final directory in the path.

### Dynamic pages

Dynamic pages are kept in a different place but also follow this principle for the most part. Dynamic pages are ones which automatically aggregate other pages, like [/events/](https://galaxyproject.org/events/).

The source code that generates the structure of dynamic pages is kept in Vue files in the `src/` directory. Most dynamic pages are in `src/pages/` and their location within that directory is the same as their url:

<div class="compact">

| Path to Vue file               | URL                                 |
|:-------------------------------|:------------------------------------|
| `src/pages/Careers.vue`        | `galaxyproject.org/careers/`        |
| `src/pages/bare/eu/Events.vue` | `galaxyproject.org/bare/eu/events/` |

</div>

However, some Vue files generate multiple dynamic pages at different urls. Since one file produces pages at multiple urls, the file location can't mirror the url. These Vue files are kept in `src/components/pages/`.

For example, these two Vue files generate many different pages:

<div class="compact">

| Vue file | `src/components/pages/Events.vue`    | `src/components/pages/TaggedEvents.vue`       |
|:---------|:-------------------------------------|:----------------------------------------------|
| URL      | `galaxyproject.org/events/`          | `galaxyproject.org/events/cofests/`           |
| URL      | `galaxyproject.org/eu/events/`       | `galaxyproject.org/events/webinars/`          |
| URL      | `galaxyproject.org/pasteur/events/`  | `galaxyproject.org/events/cofests/papercuts/` |
| URL      | `galaxyproject.org/freiburg/events/` | `galaxyproject.org/community/devroundtable/`  |
|          |  etc...                              |                                               |

</div>
