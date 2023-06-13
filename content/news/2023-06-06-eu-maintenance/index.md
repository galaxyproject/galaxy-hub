---
title: "EU Maintenance Announcement 12th June"
date: "2023-06-06"
tease: "EU database maintenance, 8hrs downtime estimated"
hide_tease: false
authors: 'Sanjay Srikakulam, José Manuel Domínguez, Mira Kuntz'
authors_structured:
- github: sanjaysrikakulam
- github: kysrpex
- github: mira-miracoli
tags: [EU]
subsites: [all-eu]
main_subsite: eu
---

<div class="alert" style="background: #00d084;">

**Galaxy is back online!** If you are being automatically redirected to this blog post from [usegalaxy.eu](https://usegalaxy.eu/), please [clear your browser's cache](https://www.wikihow.com/Clear-Your-Browser%27s-Cache) and visit [usegalaxy.eu](https://usegalaxy.eu/) again. We are sorry for this extra inconvenience.

</div>

# Update

Due to unforseen technical issues, the maintenance will last until 13 June 2pm CEST (12pm GMT).  
We apologise for this inconvenience.  

# Database maintenance on 12 June

Maintenance will take place on 12 June from 9:30am CEST (7:30am GMT) and should not exceed 5:30pm CEST (3:30pm GMT). usegalaxy.eu will not be reachable during this period.

## Updating our database and installing new hardware

Our database server is currently running stable and reliable, but it is running on CentOS 8. Since the CentOS project no longer exists and the repositories are no longer maintained, we need to change the operating system on our database server.  Therefore, we will update the server to Rocky Linux 9.
To use this downtime as efficiently as possible, we thought of upgrading the server hardware with two 4TB SSD disks and making it ready for an ever-growing Galaxy community.  
Currently, Galaxy Europe has 70,000 registered users and counting!  
This will not only increase performance and speed up DB queries, but also allow for a more robust, secure and up-to-date PostgreSQL database server.  

## Affected services

As Galaxy Web Handlers (Gunicorn), Job Handlers and Workflow Schedulers are connected to our PostgreSQL server, our website will be unavailable during the downtime and handlers will not schedule new jobs from the queue.
However, jobs that have already been submitted to the cluster (yellow status) will continue to run and will be picked up by the handlers once the downtime is over. However, please do not submit additional jobs in advance as this will result in a slow queue for everyone as handlers try to catch up.  
You do not need to take any action.
