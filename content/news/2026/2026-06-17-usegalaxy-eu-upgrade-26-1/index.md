---
title: 'Galaxy Europe upgrades to Galaxy 26.1'
tease: usegalaxy.eu – the newest Galaxy release is now up and running.
hide_tease: false
date: '2026-06-17'
main_subsite: eu
subsites: [eu]
tags: [eu, release, infrastructure]
contributions:
  authorship:
    - mira-miracoli
  funding:
    - eu
    - deNBI
    - mwk
    - uni-freiburg
---

Dear Galaxy Europe users,

We are pleased to announce that Galaxy Europe has just been upgraded to
Galaxy 26.1! But how come? Galaxy 26.1 has not yet been officially released...
That is right, we upgraded to the release candidate version. Until the official
release is out, upstream changes will be regularly flowing to
[our repository](https://github.com/usegalaxy-eu/galaxy).

Why did we upgrade early then? First, to minimize disruption. Galaxy Europe is least
used during the European night, and we schedule our upgrades accordingly. 
Second, to give attendees of [GCC 2026](https://galaxyproject.org/events/gcc2026/) the opportunity to get their hands on the latest features,
discuss and build new stuff with it in Clermont-Ferrand next week.

As always, the upgrade was prepared and reviewed openly in our
[infrastructure playbook](https://github.com/usegalaxy-eu/infrastructure-playbook/pull/2110),
so other Galaxy admins can follow along and reuse what we learned.

You may already have noticed some of the new features, such as the
[dockable GalaxyAI assistant](https://galaxyproject.org/news/2026-08-02-galaxy-release-26-1/),
but that is not all! The official release announcement is out now as well, and
the link above takes you to the complete list of what 26.1 has to offer.

## New Features

With Galaxy 26.1, our users are among the first to benefit from:

- **Galaxy Notebooks** - turn a history into a living scientific record, with narrative, datasets, and GalaxyAI integrated in one collaborative workspace
- **Context-aware GalaxyAI agents** - a dockable assistant that routes questions to specialized agents for error analysis, tool recommendations, and training materials
- **Model Context Protocol (MCP) support** - connect external AI clients to Galaxy services in a standardized way
- **A modern workflow extraction interface** - turn a successful history into a reusable workflow with a new card-based design
- **Favorite and recent tools panel** - keep your favorite and recently used tools close at hand
- **Bulk dataset storage migration** - move multiple datasets and collections between storage locations, with preview and progress monitoring
- **Clearer workflow execution monitoring** - inspect the full configuration of a workflow step directly from the invocation graph

Check out the official [Release Notes](https://docs.galaxyproject.org/en/release_26.1/releases/26.1_announce_user.html) for details on all the new features.

## Behind the scenes

A few technical changes were not directly visible, but we had to take them into
account during the upgrade.

The biggest one is the new **Server-Sent Events (SSE)**-based real-time update system, which replaces the previous polling of the web interface for
things like history and dataset state. Enabling it required changes across our whole proxy stack: Nginx was configured according to the
[SSE admin documentation](https://docs.galaxyproject.org/en/latest/admin/sse_updates.html), and we added a dedicated Traefik route with adjusted
connection timeouts and a high number of allowed idle connections per backend host. Since we plan to have two Galaxy headnodes in the future, we also
enabled sticky sessions for the SSE route, so a user's event stream stays pinned to a single headnode. As with every
new default, we keep a close eye on it and are ready to revert should users complain about stale histories or missed updates.

Galaxy 26.1 also ships an experimental **MCP server** inside Galaxy, which we enabled for our instance. It requires API key authentication and
uses the existing Galaxy REST API internally, so the usual authorization and validation rules apply. Related to our AI setup, we deployed a new
`agent_model_capabilities.yml` configuration file that describes which capabilities (like tool calling and structured output) our AI models
support. This includes our `gpt-oss-120b-llmlb` model.

To protect our Celery infrastructure from task floods, we now set per-user limits for Celery tasks: a rate limit of one task every two seconds
and a maximum of five concurrently running tasks per user. Together with the new bulk dataset storage migration feature, we also reviewed the
related object store settings, such as the minimum number of days a dataset must have left before it can be moved into a store with
automatic expiration - the default of seven days fits well with our [storage quotas and policies](https://galaxyproject.org/eu/storage/).

Finally, we deployed the new **Sentry Session Replay** user preference, which allows users to opt in to sending session recordings
when errors occur. These recordings help administrators diagnose issues that are otherwise very hard to reproduce - and it is entirely up to
our users whether they want to share them.

As always, if you run into any issues after the upgrade, please reach out to us on [Matrix](https://matrix.to/#/#usegalaxy-eu_Lobby:gitter.im)
or via [contact@galaxyproject.eu](mailto:contact@galaxyproject.eu).
