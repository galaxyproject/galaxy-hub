---
title: '23.0 Update'
date: '2023-03-08'
tease: Galaxy EU updates to 23.0 and enables new exciting features
hide_tease: true
authors: "Mira Kuntz"
authors_structured:
- github: mira-miracoli
tags: [esg,eu,esg-wp1,esg-wp4]
subsites: [eu]
main_subsite: eu
supporters:
  - eurosciencegateway
---

# usegalaxy.eu Updates to 23.0
As one of the largest Galaxy server, we see it as our role to make the latest developments available to the community and to show the world where the Galaxy community is going next.  
By updating our servers early, however, after thorough testing, we can present the new features to other Galaxy communities and our admin team can accompany admins from other
Galaxy instances in the update process and share their experiences.  

## New Features

Even before the official Release, usegalaxy.eu updates their services to 23.0, making their user base one of the first to benefit from all the new features, including:
- Customizable themes
- New Font
- History Multi-View
- New improved Tool Search
- Conditional Workflow steps
- Change Datatype of a Collection
- RO-Crate / Biocompute Workflow Invocation Export
- History Export Tracking
- Workflow Report - Collapsible Boxes  

Many user groups benefit from the new updates. I like to mention especially the improved accessibility through an easier-to-read font, better contrasts, and improvements for screen readers.
This [blog post](https://galaxyproject.org/news/2023-01-20-accessibility-report/) presents all the new accessibility features.  
Check out the official [Release Notes](https://docs.galaxyproject.org/en/master/releases/23.0_announce.html) for more detailed information on all the new features.

## Behind the Scenes / Technical Details
Behind the scenes, there were some technical changes that we had to take into account in our update process.  
The asynchronous task queue Galaxy is using, Celery, now uses Redis as backend. [Redis](https://redis.io/) is a popular, very fast and lightweight key-value store that works entirely in memory. We deployed it as a Docker container,
right next to our RabbitMQ service.  
The new theming system with customizable themes per user led to some new configuration files that we need to deploy and find ways to integrate custom subdomain themes.
