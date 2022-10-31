---
title: UseGalaxy.eu Downtime
date: '2018-09-21'
tags: [devops, downtime]
location:
  name: Freiburg, Germany
subsites: [eu, freiburg]
main_subsite: freiburg
---

We had a confluence of unexpected and bad events which resulted in UseGalaxy.eu
offline for a significant portion of yesterday (2018-09-20) afternoon. No data
was lost.

## Incident Timeline

Time  | State
----- | ---
12:00 | Galaxy's influence became unresponsive. The uWSGI processes were attempting to compile something, and could not be permanently killed as they automatically respawn.
12:30 | We rebooted the Galaxy server. It went into the 30 minute reboot process.
13:12 | Helena arrives at the Freiburg compute center in order to attach to server directly and monitor boot process. The server is up at this point.
13:15 | After logging in, the server immediately halts itself and begins rebooting again.
13:31 | Node is back up, immediately halts itself again. Despite issuing a `shutdown -c`, we could not cancel the shutdown.
14:18 | We get the node back up and prevent future shutdowns, but then one of the filesystems fails to mount.
14:27 | Stefan identifies a ZFS issue and ends up rebooting that server.
14:38 | Workshop is cancelled.
15:00 | Björn arrives at the compute center and we attempt to debug the issues and logs we have seen.
15:15 | Stefan recovers the ZFS
16:15 | Stefan arrives at the compute center. Together all three of us head to the DC. We make a decision that from the log messages we've seen we should consider replacing the hardware, migrating the hard drives to a spare enclosure.
16:27 | Approximately 1/3rd of the drives providing storage for the old bwCloud die/become inaccessible. This permanently takes down numerous services, including `stats.usegalaxy.eu`.
17:00 | Helena takes the opportunity to migrate the HTCondor cluster we run in the cloud from the old cloud to the new cloud. At least one thing goes successfully.
17:35 | We finally have the replacement head node booting, however it decides to use unexpected names for the ethernet interfaces and networking breaks.
17:57 | We finally regain access to our head node. We start galaxy
18:21 | Galaxy is back online.
{: .table.table-striped }

## Resolution

This was really a worst case scenario, multiple services, multiple machines all failed within the space of 6 hours. The only good point is that no user data was lost.


### Offline Galaxy

We have had plans for some time now that we will run a second Galaxy head node
which we can fail over to in emergencies like this. We additionally have a
replacement head node which is not currently utilised. We have not been able to
migrate to either of these options due to time pressures to migrate to the new
cloud, which will go down in 7 days, and all data in the old cloud will be
lost.

### ZFS

Galaxy can use a "distributed" storage setup where datasets are stored across
multiple directories. We use this in order to spread data across our three NFS
servers. Galaxy currently has a hard requirement that all storage directories
are online when Galaxy boots. Helena
[proposed](https://github.com/galaxyproject/galaxy/issues/4974) a solution to
this but due to lack of feedback and lack of time, we have not yet implemented
support for marking these backends as "offline" and allowing Galaxy to start
despite it.

### Cloud Storage

We planned for scenarios like this and required that any VM running in the
cloud be able to be rebuilt within 15 minutes, allowing us to restore service.
Given the multitude of other issues currently happening, and the service level
objective (SLO) of the service, we decided not to repair this VM.

## Conclusion

This was a significant interruption to our services, and to the workflows of
you, our end users. We apologise for the inconvenience this has caused.

It was a bad day; we were unlucky and unprepared. More time needs to be
allocated to service resilliency projects.

