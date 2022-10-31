---
title: UseGalaxy.eu Downtime on 18th March
date: '2019-03-18'
tags: [devops, downtime]
location:
  name: UseGalaxy.eu
authors: hexylena
authors_structured:
- github: hexylena
subsites: [eu, freiburg]
main_subsite: freiburg
---

A normal upgrade went awry and we had to restore some data from backup. We had a total downtime of around 20 hours.

## Incident Timeline

Date     | Time  | State
-----    | ----  | ---
March 18 | 16:00 | We began the upgrade procedure, expecting it to proceed smoothly
March 18 | 18:45 | A database migration fails in a bad way. Attempts to recover the situation were not successful. We decide to restore from backup.
March 18 | 19:45 | Backup restore finishes. It was made minutes too late. We decide to re-restore from the most recent backup, and manually extract the needed table from the previous backup.
March 18 | 20:30 | We updated our website to reflect the current situation.
March 18 | 21:00 | We manage to get the database in a partially functional state and debug a problem with zerglings where they refuse to serve 19.01.
March 18 | 22:00 | Due to stress of the incident, Helena identifies that it is likely her error rate will increase if she continues working, maybe with disastrous consequences and stops for the evening.
March 19 | 08:00 | Helena recovers the broken table and manually applies the database migration.
March 19 | 10:00 | We discover additional issues with the new options, namely some upstream bugs we accidentally triggered. The server is kept closed until these issues are resolved.
March 19 | 11:40 | UseGalaxy.eu is back online
{: .table.table-striped }

The `workflow_step_connection` table was partially corrupted as part of the
failed migration. It is likely that had we not tried to re-run upgrades, and
had not tried to manually apply the table changes, we could have prevented the
small loss of any new workflow connections created on Monday. We cannot say
this for certain, but it is probably. In the future we can do a lot to
safeguard against similar errors.

## Resolution

We have planned since some time that we will have a test Galaxy where we can
test out these upgrades ahead of time, but unfortunately it has not been
possible to allocate time to this project, given the current priority/urgency
matrix. This task will be re-prioritised following this incident.

We will adjust our backup procedures before upgrades. Currently given the
extremely positive experiences and relative safety of database migrations in
the past years of running UseGalaxy.eu, we do not make backups before an
upgrade, and rely only on the normal daily backups. We will investigate the
possibility to trigger a backup immediately before any database changes, to
prevent similar issues in the future.

## Conclusion

This was a significant interruption to our services for what should have been a
simple upgrade. We apologise for the inconvenience this has caused.

