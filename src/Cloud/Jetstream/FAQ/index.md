---
autotoc: true
title: Frequently Asked Questions for Galaxy on Jetstream
---

See [Learn/FAQ](/src/Learn/FAQ/index.md) for questions about using any Galaxy instance.  

PLACEHOLDER_INCLUDE(/src/Cloud/Jetstream/LinkBox/index.md)

<div class='left'></div>

----

## How do I restart my Jetstream Galaxy server?

Galaxy server can be restarted from the Jetstream's web interface, Atmosphere. Do so by selecting the server you wish to restart, click the *Reboot* button and choose *Hard Reboot* option on the popup that shows up. The server will typically take a couple of minutes to reboot with Galaxy automatically starting up.

<img src="http://i.imgur.com/LU0fHQM.png" alt="" width=300 /> 

<img src="http://i.imgur.com/2hUQCiD.png" alt="" width=300 />

----

## Where are Galaxy's log files?

Log files are available for problem diagnosis. Each launched server will have their respective logs in the same locations, which are as follows:


| Log path |  Description  | 
| -------- | ------------ | 
| */opt/galaxy/logs/galaxy_web0.log* |  This is the main Galaxy process server log.  | 
| */opt/galaxy/logs/slurmctld.log* |  This is the log file for the SLURM job manager's control process.  | 
| */opt/galaxy/logs/slurmd.log* |  This is the log file for the SLURM job manager's job runner process.  | 
| */var/log/nginx/* |  This directory contains log files for the NGINX web server.  | 
| */var/log/supervisor/* |  This directory contains log files for Supervisor process, which is used to manage Galaxy and several other Galaxy-related processes running on this server.  | 
| */var/log/postgresql/* |  This directory contains log files for the PostgreSQL database process used by Galaxy.  | 
| */var/log/proftpd/* |  This directory contains log files for the ProFTPd process used to upload data to Galaxy via FPT.  | 
