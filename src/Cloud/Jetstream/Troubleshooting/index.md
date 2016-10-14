---
autotoc: true
title: Troubleshooting Galaxy on Jetstream
---


PLACEHOLDER_INCLUDE(/Cloud/Jetstream/LinkBox)

<div class='left'></div>

---

## Galaxy does not run jobs
There could be many reasons so if the following method does not help, please [|contact us](https://biostar.usegalaxy.org/).

There's a bug in Jetstream's configuration for instance's hostname, and our automated workaround does not always apply. If you queue jobs on your instance, but Galaxy won't actually execute any, try the following:
 
1. [Connect to your VM via ssh](/Cloud/Jetstream/ssh)
2. Run the following set of commands. These will fix the hostname and restart the necessary processes.
```bash
eafgan@js-172-144:~$ sudo fix_hostname.sh
stop: Unknown instance:
hostname stop/waiting
eafgan@js-172-144:~$ sudo supervisorctl
galaxy:web0                      RUNNING    pid 1518, uptime 2 days, 17:02:05
munge                            RUNNING    pid 1508, uptime 2 days, 17:02:05
nginx                            RUNNING    pid 1511, uptime 2 days, 17:02:05
postgresql                       RUNNING    pid 1506, uptime 2 days, 17:02:05
pre_postgresql                   EXITED     Apr 15 04:23 PM
proftpd                          RUNNING    pid 1786, uptime 2 days, 17:01:58
slurmctld                        FATAL      Exited too quickly (process log may have details)
slurmd                           RUNNING    pid 1512, uptime 2 days, 17:02:05
supervisor> start slurmctld
slurmctld: ERROR (abnormal termination)
supervisor> restart galaxy:web0
galaxy:web0: stopped
galaxy:web0: started
supervisor> exit
```

