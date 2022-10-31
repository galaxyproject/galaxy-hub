---
title: UseGalaxy.eu update to 18.09
date: '2018-12-11'
tags: [release]
subsites: [eu, pasteur, freiburg, erasmusmc, elixir-it, belgium, genouest]
main_subsite: eu
---

We've updated our Galaxy server to version 18.09. Everything went extremely smoothly.

# Galaxy Upgrade

Our [previous Galaxy upgrade](../2018-05-25-galaxy-1805-and-gdpr/) we scheduled
an entire day for potential downtime, and completed it with a 2 hour outage of
Galaxy. For this downtime we scheduled 4 hours of downtime and completed it
**without** a Galaxy outage.

For a full list of the awesome new features
please see the [release notes](https://docs.galaxyproject.org/en/release_18.09/releases/18.09_announce.html)

A few highlights (in no particual order)!

- Workflows saw many enhancements:
  - You can now run a workflow directly from the "Published Workflows" list
  - The workflow editor supports zooming
  - You can download a workflow directly from the editor (Thanks [Anup!](/freiburg/people))
- Subworkflows now allow for setting runtime parameters
- When pasting data or URLs into the Galaxy upload screen, you can now supply a
  name for this dataset rather than always having to change it afterwards.
- The rule-based data uploader now supports adding tags to your datasets and collections.
- Tool search should be working better

If you notice any issues, please do not hesitate to [let us know](mailto:galaxy@informatik.uni-freiburg.de)

