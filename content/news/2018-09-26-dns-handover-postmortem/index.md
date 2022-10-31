---
title: Cloud Migration Postmortem
date: '2018-09-26'
tags: [devops, downtime]
location:
  name: Freiburg, Germany
subsites: [eu, freiburg]
main_subsite: freiburg
---

The bwCloud which we relied on for cloud hosting has reach end of life, and is
being replaced with bwCloud SCOPE. This documents our migration between the two
clouds.

## Timeline

Date         | State
------------ | ------
September 17 | bwCloud SCOPE becomes stable enough to rely upon
September 
September 21 | An unplanned downtime of UseGalaxy.eu gave us opportunity to move our cloud-based Condor Cluster
September 26 | We swap HAProxies, switching all of our traffic to going through the new cloud
September 27 | Last VMs are backed up or moved (GitLab)
September 28 | The old cloud shuts down
{: .table.table-striped }

## What Went Right

**Using Terraform**: In the months prior to the cloud shutdown we
brought all of our OpenStack resources under Terraform's control. This allowed
us to get started in the new cloud by replacing a few variables (cloud URL,
network name, image names), and having our infrastructure instantly replicated
in the new cloud.

**Enforcing Automation**: We internally developed a strict policy that if a
task wasn't automated, then it didn't really happen. Naturally, we had Ansible
playbooks for all of the setup steps required for each service that we run, and
we could easily re-run these on our new infrastructure.

As part of the migration we developed a [small script](https://github.com/usegalaxy-eu/infrastructure/blob/master/bin/find-unmanaged.sh)
which will identify any resources created in either OpenStack or Route53 which
are not managed by terraform. We can then consider automatically deleting such
unmanaged resources to help ensure that all infrastructure changes are done in
a reproducible way.





## What Went Wrong


