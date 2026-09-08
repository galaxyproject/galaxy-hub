---
title: "Bringing the NEMO HPC cluster to usegalaxy.eu with Pulsar relay mode"
date: "2026-06-30"
tease: "usegalaxy.eu can now dispatch jobs to the bwForCluster NEMO over Pulsar's relay transport, no inbound ports and no message broker on the cluster."
subsites: [global, eu]
main_subsite: eu
tags: [pulsar, infrastructure, devops, eu]
contributions:
  authorship:
    - dSizovs
---

usegalaxy.eu now runs jobs on the bwForCluster NEMO (University of
Freiburg). Getting there meant connecting a locked-down HPC cluster to a busy
public Galaxy server without opening a single inbound port.

## The problem with brokers on HPC

Most of usegalaxy.eu's remote Pulsar endpoints talk back to Galaxy through a
shared RabbitMQ broker. That assumes a site can hold an outbound AMQP
connection to the broker and keep it alive. HPC centres frequently can't:
login nodes are tightly controlled, long-lived broker connections are
discouraged, and inbound ports are off the table.

NEMO uses Pulsar's newer relay transport instead. A small HTTP service
(the relay) sits between Galaxy and Pulsar, and both sides reach it by
long-polling. Neither Galaxy nor the cluster needs to accept inbound
connections. This fits an HPC security model far better than AMQP.

## What I set up

- A public **relay** running as a systemd service on a bw-cloud VM, backed by
  a Redis-compatible store (Redis on the production VM, Valkey on
  RHEL-family hosts) so in-flight messages and credentials survive a restart.
- **Pulsar on a NEMO login node**, submitting to **Slurm** via the
  `queued_cli` manager and running every tool inside **Singularity/Apptainer**
  containers pulled from **CVMFS**. Because the login node has no user-level
  systemd, Pulsar is supervised by **supervisord**, which keeps it running and
  gives clean start/stop/restart control.
- Integration into **usegalaxy.eu**: a `pulsar_eu_nemo` job runner and a TPV
  destination, so jobs can be routed to NEMO either by a user opting in to the
  resource or via a routing rule.
- Two **Ansible roles** ([one for the relay](https://github.com/usegalaxy-eu/pulsar-relay-role),
  [one for the NEMO login node](https://github.com/usegalaxy-eu/pulsar-nemo-login-role)) to
  deploy the whole thing reproducibly. The relay role works on both Debian/Ubuntu and Rocky/RHEL 10. Both roles
  started as my own repositories and have now been adopted into the usegalaxy-eu
  organisation on GitHub, where they live alongside the rest of the infrastructure
  the team runs in production.

## Bumps along the way

A few things were worth writing down, most of them found by stress testing the
setup rather than waiting for them to happen in production.

**DevOps hardening and failure testing.** Before trusting the pipeline, I ran
every failure combination I could (killing the relay mid-job, killing Galaxy,
and killing Pulsar) across 100 jobs each, and documented how the system
recovered. The stress testing surfaced the issues below.

**Messages were lost on a relay restart.** The relay defaulted to in-memory
storage, so a crash or restart dropped pending messages. Switching the backend
to a Redis-compatible store fixed it. Credentials and in-flight messages now
survive a restart.

**Jobs must go through Slurm, not the login node.** With the `queued_python`
manager, Pulsar ran the tool directly on the login node. On a shared HPC system
that is not acceptable. Switching to `queued_cli` with `job_plugin: Slurm` made
Pulsar submit proper Slurm jobs that land on compute nodes.

**A status-reporting bug.** After the switch, jobs ran and completed on Slurm,
but Galaxy stayed stuck in *running* forever. The cause was a mismatch in
Pulsar's Slurm CLI status plugin: when Galaxy happens to be importable in the
same environment as Pulsar, the plugin's "job no longer in the queue" result
resolved to Galaxy's job state `"ok"` instead of Pulsar's internal
`"complete"`, so the stateful manager never deactivated the finished job. More
on how this was resolved below.

## Working with the Pulsar maintainers

The status-reporting bug turned into the most rewarding part of the project. I 
traced it down to the Slurm CLI plugin and [opened a pull request](https://github.com/galaxyproject/pulsar/pull/460) 
with a small fix. Marius van den Beek quickly saw
that the real problem ran deeper than my patch: the plugin was *inferring*
which side it was running on (Galaxy vs. Pulsar) from whatever happened to be
importable in the environment, which is fragile by design. He implemented a
robust fix upstream that determines this explicitly instead of by inference,
and was generous enough to credit the investigation. Seeing a bug I'd reported
turn into a proper design fix in the upstream project (rather than just a
local workaround) was a genuinely great experience of open-source
collaboration.

That collaboration continued into upgrading the relay itself. The relay project
moved quickly during the work, releasing a new major version (v0.2.x) with a
hardened, security-focused configuration and a coordinated client package. I
upgraded the production deployment to it, which meant migrating both sides
together (the relay server and the NEMO Pulsar's transport) and rebuilding
the Pulsar environment on a newer Python. One subtle issue surfaced along the
way: the new relay's storage layer relies on Redis stream features
(exclusive-range queries) that only exist in Redis 6.2 and newer, and the
distribution's default Redis was older than that, which made every status poll
fail until the backend was moved to a current Redis/Valkey. It's the kind of
version-floor problem that's invisible until you hit it, and a good reminder to
pin the things you depend on.

## Result

Jobs submitted on usegalaxy.eu route to NEMO, run in containers on Slurm
compute nodes, report status back through the relay, and complete in the Galaxy
UI with job metrics showing the compute host and the CVMFS container that ran
the tool. The deployment is captured in two Ansible roles, with operational
notes in the [usegalaxy.eu operations manual](https://github.com/usegalaxy-eu/operations)
so the team can maintain it.

## Thanks

A huge thank you to Björn Grüning for welcoming me into the Galaxy open source
project. It's been a privilege to contribute and to learn from his mentorship
along the way. Thanks also to Marius van den Beek for
the quick reviews, the thoughtful upstream fix, and for making a first-time
contributor feel welcome.
