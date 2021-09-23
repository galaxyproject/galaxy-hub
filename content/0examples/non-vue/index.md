---
title: Example Markdown page (without Vue components)
tease: A tease
category: events
date: 2021-04-25
days: 1
continent: EU
contact: Strong Mad
contact_url: https://example.com
authors: Marzipan
location: Strong Badia
location_url: https://www.youtube.com/watch?v=hfUqRp4E0L8&t=37s
external_url: https://zombo.com
source_blog_url: "https://blogs.nature.com/naturejobs/"
source_blog: "Naturejobs Blog"
tags: [ cofest ]
draft: false
autotoc: true
gtn: false
skip_title_render: false
image: World40.png
links:
- text: "Video"
  url: "https://youtu.be/bQFv4EVunWw"
redirect: "/"
---

This also serves to provide a page with all the metadata fields present. If you have a dynamic page with a GraphQL query for a metadata field, there must be at least one page with that field present. Otherwise Gridsome throws an error.

Normally `category` isn't present in the metadata. It's autopopulated by the framework based on where the Markdown file is placed. But this isn't placed in a category, so it's in the metadata here as a workaround.
