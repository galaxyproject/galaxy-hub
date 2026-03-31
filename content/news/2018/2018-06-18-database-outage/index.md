---
title: Database outage affecting UseGalaxy.eu
date: '2018-06-18'
tags: [devops, downtime]
location:
  name: Freiburg, Germany
subsites: [eu, freiburg]
main_subsite: freiburg
---

Our database server crashed unexpectedly on friday night and we were down over most of the weekend.

## Incident Timeline

Date       | Time  | State
---------- | ----- | ---
2018-06-15 | 16:20 | Database server becomes unresponsive. This additionally takes down a couple of file systems that Galaxy uses
2018-06-15 | 16:36 | Processes become unresponsive, monitoring data stops coming in
2018-06-15 | 17:44 | Galaxy stops responding
2018-06-15 | 22:56 | We notify our database administrator about the issue
2018-06-17 | 20:45 | Email received that our database admin has finished repairing the server
2018-06-17 | 21:04 | We manually restart the Galaxy server processes
2018-06-17 | 21:15 | The first jobs run successfully again
{: .table.table-striped }

## Resolution

We are discussing our long term options to preventing, or at least ameliorating
similar issues in the future. We are investigating the possibly of keeping
Galaxy online but read-only, and how this might impact our users.

