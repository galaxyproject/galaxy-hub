---
title: The Global Hub
pretitle: "[Home](/) > [Hub](/hub/) > [Global Hub](/hub/global/)"
---

The "Global Hub" is what we call the system for dividing the Hub into "subsites" where each Galaxy community can have their own section of the website. When you click the "Regions" dropdown menu in the navbar, those are all subsites.

Each subsite gets its own, customizable homepage, navbar, site-wide footer, and news and events feeds. It's a way to allow each community to have its own web presence without the hassle of maintaining its own web site. Each subsite gets its own url namespace, so everything under your subsite's prefix belongs to you. For example, all urls under `galaxyproject.org/eu/` are Galaxy Europe pages (e.g. `galaxyproject.org/eu/people/`).

See the [poster](./gcc2022-poster.png) from [GCC 2022](/events/gcc2022/) for more information.


Getting started
---------------

First, make sure you're familiar with [contributing](/hub/contributing/) to the Hub and are able to run the site locally.

To create a new subsite, you'll just need to edit a few files.

### `config.json`

First, add your subsite to the [config file](https://github.com/galaxyproject/galaxy-hub/blob/master/config.json). See [this example](https://github.com/galaxyproject/galaxy-hub/pull/1659/files) (but the `matrix` field is optional). This is where you decide your subsite's id. This id will be your url prefix and the id you use to tag news and events posts. This should be all lowercase. Try to choose something simple (see the examples already there for guidance).

### Content files

Then, create a directory for your subsite in the [`content`](https://github.com/galaxyproject/galaxy-hub/tree/master/content) directory. Use your subsite's id as the directory name (e.g. `content/eu/`). Then you'll need at least two files in this directory: `navbar.yml` and `main.md`. You can just copy the default navbar file from `content/navbar.yml`, then customize it how you want. The fields should be mostly self-explanatory. The `main.md` will just need a title at the minimum to get the homepage to display. Then you can customize the homepage as much as you want. You can check the content directories for the other subsites for good examples.

### Homepage cards

One special note is that the cards showing news, events, tweets, etc, are configured using a `cards.md` file. See the global homepage's version at `content/cards.md` for an elaborate example. The cards with type `static` load content from a separate Markdown file. For example, if the card's `name` is `platforms`, the content for that card is defined in `platforms-card.md`. If you want a standard list like in that example, you can just set the items in the metadata. Otherwise you can display arbitrary content by writing Markdown after the metadata, like in `content/twitter-card.md`.

### News and events pages

You'll automatically get pages like `galaxyproject.org/subsite-id/news/` and `galaxyproject.org/subsite-id/events/` which list all news and events posts which include your subsite's id in the `subsites` metadata field.

You can add custom content to the top of those pages using Markdown files. For events, the content goes in `content/subsite-id/events/main.md` (replace `subsite-id` with your subsite's id) and for news it's `content/subsite-id/news/main.md`.

### Ghost sites

If you want to be part of the Global Hub community but already have a website, you can add yourself as a "ghost site". This means you will have an entry in the navbar 'Regions' dropdown, but no internal page will be created for you. Instead, you provide an `external: <url>` value in your `config.json` entry. See the `au` subsite for an example. To take advantage of cross-site posting as a ghost site, your application can consume the events JSON feed at `/events/feed.json` (filtered to those occurring < 30 days ago *at build time*).


More to come
------------

More documentation will be forthcoming but for now the existing subsites provide decent examples of how to do things we haven't covered here.
