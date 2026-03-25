---
title: Temporary Quota Issue
date: '2018-06-04'
tags: [devops, downtime]
location:
  name: Freiburg, Germany
subsites: [eu, freiburg]
main_subsite: freiburg
---

We had a temporary quota issue today when one of our developers working on automating [UseGalaxy.eu Quota Increase
Application](https://docs.google.com/forms/d/e/1FAIpQLSf9w2MOS6KOlu9XdhRSDqWnCDkzoVBqHJ3zH_My4p8D8ZgkIQ/viewform)
made a mistake in the code which resulted in the `legacy-users` quota membership being removed.

## Incident Timeline

Time  | State
---   | ---
12:50 | Developer noticed mistake as it happened during development, but too late.
12:51 | First user complaint received
13:08 | Issue resolved
{: .table.table-striped }

## Root Cause

The script was intended to only synchronize quotas named `auto_###`, but due to
a bug it attempted to synchronize all quota groups. It defaulted to
synchronizing an empty set of users and completely removed the user
associations for the `legacy-users` quota.

## Resolution

We extracted the relevant table from a database dump and proceeded to import
those rows back into the table. The backup was missing one row but we have
identified the missing data in admin discussions.

Going forward we will be deploying a `test.usegalaxy.eu` and developing against
that server to avoid similar problems.

