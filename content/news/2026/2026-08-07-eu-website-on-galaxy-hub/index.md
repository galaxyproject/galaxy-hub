---
title: "The European Galaxy Project Website Is Now Fully Served by the Galaxy Hub"
date: "2026-08-07"
tease: "After ten years on a Jekyll-on-GitHub setup, galaxyproject.eu is now completely powered by the Galaxy Hub — a fast, metadata-driven home that any Galaxy community can reuse."
subsites: [global, eu, freiburg]
main_subsite: eu
tags: [eu, freiburg, community, infrastructure]
contributions:
  authorship:
    - bgruening
  funding:
    - eu
    - deNBI
---

# The European Galaxy Project Website Is Now Fully Served by the Galaxy Hub

The European Galaxy project has run its team website at [galaxyproject.eu](https://galaxyproject.eu/) for a decade. It started life ten years ago as a Jekyll-powered site hosted on GitHub — a pragmatic choice at the time, and one that served the community well for years. A few years back we began migrating parts of it (posts and news) over to the Galaxy Hub, but a handful of features, most notably the [galaxyproject.eu/people](https://galaxyproject.eu/people) page, the [galaxyproject.eu/citations](https://galaxyproject.eu/citations) page and several other pages for Galaxy subdomains, had stubbornly remained on the old infrastructure.

**As of today, the last bits have moved over.** The European Galaxy project website is now completely served by the [Galaxy Hub](https://galaxyproject.org).

This is more than a hosting change. With the new Hub we have a powerful, fast, metadata-driven website that can act as the shared home for many Galaxy servers, and the European community is the first to make full use of it.
In this post we want to show off a few of the features that let you present your own Galaxy community, share it with the rest of the ecosystem, and participate in the global view of who builds and uses Galaxy.

## One Hub, many homes: subsites for every Galaxy server/community

Every Galaxy server can have its own space inside the Hub. The European Galaxy server (hosted in Freiburg) maintains [galaxyproject.org/freiburg](https://galaxyproject.org/freiburg) and [galaxyproject.org/eu](https://galaxyproject.org/eu), which is also reachable via [galaxyproject.eu](https://galaxyproject.eu/). As the European Galaxy community we look after several national Galaxy servers, and each of them can have its own subsite in the same way.

Each subsite is its own space in the larger Galaxy: it has its own front page, its own people page (e.g. [galaxyproject.org/freiburg/people/](https://galaxyproject.org/freiburg/people/)), its own news and events, and so on. Yet because all of this lives inside a single Hub, the content is aggregated into holistic, cross-server views. For example, everyone involved in building the European Galaxy servers is collected at [galaxyproject.org/eu/people](https://galaxyproject.org/eu/people), and that view is built entirely from metadata, not from anyone hand-editing a list.

## Metadata is the engine: tags, funding, grants, organisations, contributors

The key idea behind the Hub is that **every event or news post can be annotated with rich metadata** — tags, contributors, funders, organisations, grants, subsites, and more. That metadata is then used to render global views over the Galaxy community.

For every tag, every contributor, and every funder there is a dedicated page that gives you an aggregated view of everything related to that metadata element. Browse a tag and you see all the news, events, and posts carrying it. Browse a contributor and you see everything they've authored across the Hub. Browse a funder and you see all the work that funding has supported.

All of this is collected on the **Hall of Fame**: [galaxyproject.org/hall-of-fame/](https://galaxyproject.org/hall-of-fame/).

## Linked across the ecosystem: the GTN connection

That metadata is shared with the [Galaxy Training Network (GTN)](https://training.galaxyproject.org/). The Hub links out to the GTN Hall of Fame, so your personal page on the Hub, for example [galaxyproject.org/hall-of-fame/bgruening/](https://galaxyproject.org/hall-of-fame/bgruening/), is connected to your GTN personal page, listing your contributions across the whole Galaxy ecosystem in one place. Contribute once, and the community sees the full picture of your contributions.

## Fast, static, and reusable: bare pages and iframes

The Hub is a static website served from a CDN, so it is fast, and that makes it cheap to reuse components of it elsewhere. A particularly handy pattern is the set of **bare pages**, stripped-down versions of Hub pages designed to be embedded as iframes inside other web applications or directly into your own Galaxy server.

You can see all available bare pages at [galaxyproject.org/bare/](https://galaxyproject.org/bare/). Want to surface the European events feed, a people list, or a tools overview inside your own UI? Grab the bare version and drop it into an iframe.

The same static-first approach powers the Hub's [built-in search](https://galaxyproject.org/search/). There's no server behind it, the whole Hub is indexed into a single static file at build time, and search happens entirely in your browser. Search across news, events, people, tags, organisations, and grants from anywhere on the site.

## Stay up to date: RSS feeds

Every news feed and events feed on the Hub has an RSS feed you can subscribe to, so you can follow what's happening across the community without checking the website. See the full list at [galaxyproject.org/feeds/](https://galaxyproject.org/feeds/).

## Useful for funders: tools and citations, updated weekly

For the European Galaxy server, the Hub maintains two views that are particularly handy for reporting to funders, and both are **updated automatically every week**:

- **[galaxyproject.org/eu/tools/](https://galaxyproject.org/eu/tools/)** — a list of all tools installed on the European Galaxy server.
- **[galaxyproject.org/eu/citations/](https://galaxyproject.org/eu/citations/)** — a view of all papers citing the European Galaxy server.

No more scrambling to assemble a tool inventory or a citation list at reporting time: it's already there, and it's always current. Every subsite can have those views.

## Come and join us

With this switch, the European Galaxy project is now fully living inside the shared Hub, and the same infrastructure is available to your Galaxy server too. Bring your subsite, annotate your posts with metadata, and your people, tags, and funders automatically become part of the global Galaxy community view. The more of us who join, the richer that shared picture becomes.

If you'd like to set up a subsite for your Galaxy server, get in touch on [Matrix](https://matrix.to/#/#galaxyproject:matrix.org) or the [Help Forum](https://help.galaxyproject.org/), and we'll help you get started.
