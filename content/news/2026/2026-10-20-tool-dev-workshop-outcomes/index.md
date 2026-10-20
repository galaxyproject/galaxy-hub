---
title: "Three Days, Many Tools: Recapping the 2nd Galaxy Tool Development Workshop"
date: '2026-10-20'
tease: "Three days, five trainers, and a room full of people building their first Galaxy tools — here is how the 2nd Galaxy Tool Development Workshop in Freiburg went."
hide_tease: false
tags: [workshop, tools, training, uni-freiburg, esg]
subsites: [global, eu, freiburg]
main_subsite: eu
contributions:
  authorship:
    - paulzierep
  funding:
    - deNBI
    - nfdi4bioimage
    - mwk
---

From October 7 to 9, we held the [2nd Galaxy Tool Development Workshop](/events/2026-10-07-tool-dev-workshop/) in Freiburg — three days of hands-on tool wrapping, immediately following the ESG4Stars kick-off. Organised by the [Intergalactic Utilities Commission (IUC)](https://galaxyproject.org/iuc/) and the [Galaxy Tool Developer's SIG](https://galaxyproject.org/community/sig/tool-developers/), the workshop welcomed researchers, bioinformaticians, and developers who wanted to learn how to build, test, and publish tools for Galaxy.

And “hands-on” really meant hands-on: by the end of the first morning, everyone had a working tool on their laptops.

![Participants at the start of the workshop on day 1](20261007_093112.jpg "Day 1: getting everyone's development environment up and running")

## Day 1 — from zero to a working tool

We started with the big picture: how a tool XML becomes a job, and how Conda and containers fit in. After setting up Planemo, mamba, Docker, and VS Code with the Galaxy Language Server, we live-coded a first wrapper for `seqtk_seq` — from `tool_init` to `lint` and `serve`. The afternoon was all about testing and publishing: writing focused test cases, keeping test data small, and understanding what CI does with a pull request. We closed the day with a walk through the IUC best practices and a live review of a real PR.

## Day 2 — advanced XML, reference data, and interactive tools

Day 2 went deeper: conditionals, repeats, and sections; output collections with `discover_datasets`; and data tables for reference data, including how to test them. The last session opened up the world of Galaxy Interactive Tools — how the proxy works, what an interactive tool wrapper looks like, and what to watch out for when deploying one.

![Working through the advanced tool XML exercises on day 2](20261008_134304.jpg "Day 2: conditionals, collections, and data tables")

![A focused afternoon of hands-on exercises](20261008_134317.jpg "Day 2: hands-on time with the trainers on hand")

## Day 3 — wrapping your own tool

The final half-day belonged to the participants: everyone was invited to wrap a tool of their own, or to join the IUC hackathon and work on one of the open tool requests. The round of two-minute updates at the end was one of the highlights of the week — it was great to see how much people had built in just three days, and where they want to take it next.

## What participants told us

We asked everyone to rate the workshop and share what they liked, what they would improve, and whether their expectations were met. The feedback was very encouraging: the practical, hands-on format and the direct access to experienced developers came up again and again.

<!-- TODO: add 1-2 concrete quotes and the headline numbers from the feedback form
     (e.g. overall satisfaction, would-recommend share) once exported from
     https://docs.google.com/forms/d/1A4ktA6A5zvLxPqd1bKSBLCmjh4vFF9z2QQF73tgEdT4/edit#responses -->

<!-- TODO: add outcomes from the "wrap your own tool" document
     https://docs.google.com/document/d/1mn5nrFrTq996qM0WqmRAorYZKEpg7ASVTtcttmWpY-o/edit
     e.g. how many tools were started/finished, which ones, and links to PRs -->

## Thank you!

A huge thank you to our trainers — Matthias Bernt, Pavan Videm, Rand Zoabi, and Amirhossein Nilchi — and to Saim Momin and Matthias for organising the workshop. Thanks also to [de.NBI (ELIXIR Germany)](https://www.denbi.de/) for their generous support, and of course to all participants for their curiosity and energy.

If you could not make it this time: the [Galaxy Tool Developer's SIG](https://galaxyproject.org/community/sig/tool-developers/) meets regularly, the community hangs out in the [Galaxy Matrix channels](https://matrix.to/#/#galaxyproject:matrix.org), and the [IUC repository](https://github.com/galaxyproject/tools-iuc) always has open tool requests waiting for a first contribution. We would love to see you at the next edition!

**Contact**: Saim Momin ([momins@informatik.uni-freiburg.de](mailto:momins@informatik.uni-freiburg.de)) and Matthias Bernt ([m.bernt@ufz.de](mailto:m.bernt@ufz.de))

The workshop abided by the [Galaxy Project Code of Conduct](/community/coc/).
