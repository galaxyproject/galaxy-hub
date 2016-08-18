---
autotoc: true
---
<div class="title">Frequently Asked Questions for Galaxy on Jetstream</div>
See [/Learn/FAQ](/Learn/FAQ) for questions about using any Galaxy instance.  

INCLUDE(/Cloud/Jetstream/LinkBox)


----

## How do I restart my Jetstream Galaxy server?
Galaxy server can be restarted from the Jetstream's web interface, Atmosphere. Do so by selecting the server you wish to restart, click the *Reboot* button and choose *Hard Reboot* option on the popup that shows up. The server will typically take a couple of minutes to reboot with Galaxy automatically starting up.

![](http://i.imgur.com/LU0fHQM.png) 

![](http://i.imgur.com/2hUQCiD.png)

----

## Where are Galaxy's log files?
Log files are available for problem diagnosis. Each launched server will have their respective logs in the same locations, which are as follows:
<div class='center'>
| Log path |  Description  | 
| -------- | ------------ | 
| */opt/galaxy/logs/galaxy_web0.log* |  This is the main Galaxy process server log.  | 
| */opt/galaxy/logs/slurmctld.log* |  This is the log file for the SLURM job manager's control process.  | 
| */opt/galaxy/logs/slurmd.log* |  This is the log file for the SLURM job manager's job runner process.  | 
| */var/log/nginx/* |  This directory contains log files for the NGINX web server.  | 
| */var/log/supervisor/* |  This directory contains log files for Supervisor process, which is used to manage Galaxy and several other Galaxy-related processes running on this server.  | 
| */var/log/postgresql/* |  This directory contains log files for the PostgreSQL database process used by Galaxy.  | 
| */var/log/proftpd/* |  This directory contains log files for the ProFTPd process used to upload data to Galaxy via FPT.  | 
</div>
