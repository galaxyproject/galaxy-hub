---
title: Example Markdown page with Vue components
tease: A tease
hide_tease: false
pretitle: Some content to show above the title.
# Normally you wouldn't set the category manually. Instead, it's set based on where this file is
# placed in the content directory. Since this isn't in the right place, we set it here manually.
category: news
date: 2021-04-25
days: 2
continent: EU
contact: people
contacts:
- name: Person
  email: name@example.com
  url: https://example.com
authors: Jose and me
location:
  name: Strong Badia
location_url: 'https://www.youtube.com/watch?v=hfUqRp4E0L8&t=37s'
external_url: https://zombo.com
source_blog_url: "https://blogs.nature.com/naturejobs/"
source_blog: "Naturejobs Blog"
tags: [ papercuts, cofest ]
draft: false
autotoc: true
gtn: true
skip_title_render: false
image: /images/icons/GL.png
links:
- text: "Video"
  url: "https://youtu.be/bQFv4EVunWw"
redirect: /somewhere/else/
subsites: [global]
components: true
---

This also serves to provide a page with all the metadata fields present. If you have a dynamic page with a GraphQL query for a metadata field, there must be at least one page with that field present. Otherwise Gridsome throws an error.

Normally `category` isn't present in the metadata. It's autopopulated by the framework based on where the Markdown file is placed. But this isn't placed in a category, so it's in the metadata here as a workaround.

## Inserts

Here's how Inserts are inserted:

<slot name="/0examples/footer" />

## Vue components

Using Vue components:

import Continent from '~/components/Continent.vue'

They can even be used <continent continent="EU" /> inline!

## Graymatter

Using metadata fields in the content:

Authors: {{ $frontmatter.authors }}

