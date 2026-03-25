---
title: Successful Server Hardware Improvements
date: '2017-11-15'
tags: [devops]
subsites: [eu, freiburg]
main_subsite: freiburg
---

Last wednesday we had a short, 1-hour maintenance period during which we
upgraded the memory of the Galaxy head node. It was originally sitting at 32Gb
of RAM but we ran into numerous issues handling the volume of jobs that are
launched every day. We have since upgraded to 64Gb and performance has been
smoother.

![Image of one of our admins adding more RAM to the Galaxy Server](/assets/media/memory_upgrade.png)

Our server information is available in Grafana if you're curious how Galaxy is adjusting to all of the new RAM:

[![The increased available RAM shown in a Grafana graph](/assets/media/memory_upgrade_grafana.png)](https://stats.usegalaxy.eu/dashboard/db/galaxy-node-detail?orgId=1&from=now-3h&to=now)

