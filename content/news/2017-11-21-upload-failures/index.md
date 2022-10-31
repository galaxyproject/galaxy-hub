---
title: 'Post Mortem: Upload and various tool failures'
date: '2017-11-21'
tags: [devops]
subsites: [eu, freiburg]
main_subsite: freiburg
---

Yesterday (2017-11-20) all upload jobs and some other tools were failing to be launched on our cluster. One of our clusters became unresponsive and the code which handled job distribution to clusters had to be updated. This process required three iterations to get correct. Each update cycle took ~15-20 minutes due to our update process and how long it takes Galaxy to switch over to the new configuration.

We're very sorry for any inconvenience that this outage caused. We've made a number of improvements since this which will improve our response times should similar events occur again in the future.

We have looked into the logs of the machine that went down but we have no concrete evidence for why it went down. We will monitor the situation going forward but since we have no clear path on how to prevent that condition from occuring, we have focused our remediation efforts on preventing issues further upstream.

## Automatic Cluster Failover

We enhanced our job scheduling system to check that condor is actually alive before scheduling jobs on them. Now if the condor cluster is down we will automatically redirect jobs to SGE.

## Decreased Cycle Time

We have moved the job scheduling algorithm into a separate process. We can quickly re-deploy and update this process without restarting the main Galaxy processes. This should allows us to decrease the cycle times for updates from hours to minutes.

## Future Outlook

The changes we've made as a result of this should prevent further issues of this type, and if issues like this do occur, we can react much more quickly to them.

