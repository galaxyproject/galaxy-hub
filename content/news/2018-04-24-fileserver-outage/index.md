---
title: Fileserver Outage affecting Jobs
date: '2018-04-24'
tags: [devops, downtime]
location:
  name: Freiburg, Germany
subsites: [eu, freiburg]
main_subsite: freiburg
---

The university's home directory server went offline affecting numerous Galaxy jobs.

## Incident Timeline

Time  | State
---   | ---
11:02 | We received a mail from the HPC team that the central Uni Freiburg fileserver was experiencing issues resulting in an outage.
16:30 | Some jobs were still hung and could not recover due to this outage. The UseGalaxy.eu Admin team began discussing possible options.
17:18 | We took the decision to reboot affected hosts as processes could not be killed. This affected a number of jobs unfortunately that were not rescheduled automatically.
{: .table.table-striped }

## Resolution

Killing the affected hosts was not an optimal solution however it was the most
efficient. Jobs should have been rescheduled and re-run automatically but it
seems they were often not, so we will be investigating and correcting issues
with our Galaxy job configuration.

