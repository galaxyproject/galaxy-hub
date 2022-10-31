---
title: 'FIXED: upload jobs not scheduled'
date: '2017-09-28'
tags: [devops]
subsites: [eu, freiburg]
main_subsite: freiburg
---

A subset of upload jobs were hanging. Investigation pointed to a handful of VMs that were recently launched in our cloud which were firewalled off from access. Condor, our job scheduler, needs to be able to reach the VMs in order to send jobs to it. When jobs were scheduled for those VMs, they just hung indefinitely. We have now [corrected the issue](https://github.com/usegalaxy-eu/vgcn-infrastructure/commit/bee93bfddc6df37147defeeeacbe8e6c1ba77ca1) in code, so we won't launch any more VMs with this issue.

<iframe src="https://stats.usegalaxy.eu/dashboard-solo/snapshot/8wMDuICfchwO67RE5M9IWDK4ZGA87hhB?refresh=1m&orgId=1&panelId=5&theme=light" width="100%" height="400" frameborder="0"></iframe>

