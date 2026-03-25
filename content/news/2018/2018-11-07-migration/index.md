---
title: Upcoming Server Migration
date: '2018-11-07'
tags: [devops]
location:
  name: Freiburg, Germany
subsites: [eu, freiburg]
main_subsite: freiburg
---

We will be migrating Galaxy to new hardware. The hardware acting as the 'head
node' is reaching End-of-Life and needs to be decomissioned.

We plan to execute this migration on [Monday, 2018-11-12 at around 13 CET](http://arewemeetingyet.com/Berlin/2018-11-12/13:00/UseGalaxy.eu%20Server%20Migration).
This migration *should* be completely transparent to all end users.

## Migration Plan

We have deployed the new head node and have been testing it over the past
months, correcting issues as we have come across them. We had an internal hack
day where team members tested the new server heavily and identified issues.

**Timeline**

Date        | Notes
----------- | -----
November 7  | We freeze configuration changes and any tool installation in both Galaxies. [Automated tool installation](https://build.galaxyproject.eu/job/usegalaxy-eu/job/install-tools/) has been disabled.
November 8  | We swap the beta backend server from our testing database to our production database, and run some testing against it.
November 12 | We update our proxy to direct traffic to `usegalaxy.eu` to the new backend server
November 19 | We stop the Galaxy processes on the old head node, retaining it for another few weeks to ensure we have not missed anything
{: .table.table-striped}

## Backout Plan

An extremely important part of any big migration with far reaching impacts is the backout plan. What will we do if something goes wrong? For this migration, the backout plan is extremely simple: we reconfigure the proxy to use the old server as the backend for usegalaxy.eu

This gives us a safe fallback position in the face of any complications. Traffic will temporarily be split between the instances, but since Galaxy maintains session state in the database, this should not present any issues.

