---
title: 'Post Mortem: 2h Tool Execution Outage'
date: '2017-12-11'
tags: [devops, downtime]
subsites: [eu, freiburg]
main_subsite: freiburg
---

Today (2017-12-11) we had a temporary outage of job executions. We've been making progress on a new job configuration system for our Galaxy which should let us reconfigure job scheduling in a more dynamic way. After weeks of work and testing we're finally rolling this out to 6% of our users. Unfortunately as part of the deployment we failed to install two dependencies that were required as part of the new changes.

We received emails from many of you and we're very sorry for the inconvenience that this caused.

## Timeline

Time                      | Status
------------------------- | ------
2017-12-11 16:10:16+01:00 | We noticed that jobs were unable to be submitted due to a misconfiguration on our end. We are currently investigating the issue.
2017-12-11 18:27:52+01:00 | We believe the issue is now patched. Hopefully jobs should return to normal very shortly. We're actively monitoring the situation
2017-12-11 18:33:10+01:00 | We have verified the patch. While updating the job configuration to a newer and even safer implementation with fewer ways to fail, @hexylena failed to install a required dependency. Galaxy refused to load the python module where our configuration was defined, and thus all jobs began to fail.
{: .table.table-striped }

