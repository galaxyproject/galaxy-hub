---
title: "Bringing the NEMO HPC cluster to usegalaxy.eu with Pulsar relay mode"
date: "2026-06-11"
tease: "usegalaxy.eu can now dispatch jobs to the bwForCluster NEMO over Pulsar's relay transport, no inbound ports and no message broker on the cluster."
subsites: [global, eu]
main_subsite: eu
tags: [pulsar, hpc, usegalaxy.eu, infrastructure]
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

## What I built

- A public **relay** running as a systemd service on a bw-cloud VM, backed by
  **Valkey** (Redis-compatible) so in-flight messages and credentials survive a
  restart.
- **Pulsar on a NEMO login node**, submitting to **Slurm** via the
  `queued_cli` manager and running every tool inside **Singularity/Apptainer**
  containers pulled from **CVMFS**.
- Integration into **usegalaxy.eu**: a `pulsar_eu_nemo` job runner and a TPV
  destination, so jobs can be routed to NEMO either by a user opting in to the
  resource or via a routing rule.
- An **Ansible role** to deploy the relay reproducibly, plus failure-testing
  and hardening notes.

## Bumps along the way

A few things were worth writing down, most of them found by stress testing the setup
rather than waiting for them to happen in production.

**DevOps hardening and failure testing.** Before trusting the pipeline, 
I ran every failure combination I could (killing the relay mid-job, killing Galaxy, 
and killing Pulsar) across 100 jobs each, and documented how the system recovered. 
The stress testing surfaced the issues below.

**Messages were lost on a relay restart.** The relay defaulted to in-memory 
storage, so a crash or restart dropped pending messages. Switching the backend to 
Valkey (Redis-compatible) fixed it. Credentials and in-flight messages now survive a restart.

**Jobs must go through Slurm, not the login node.** With the `queued_python` manager, 
Pulsar ran the tool directly on the login node. On a shared HPC system that is not acceptable. 
Switching to `queued_cli` with `job_plugin: Slurm` made Pulsar submit proper Slurm jobs that land on compute nodes.

**A status-reporting bug.** After the switch, jobs ran and completed on Slurm, but Galaxy stayed stuck in *running* forever. The
cause turned out to be a mismatch in Pulsar's Slurm CLI status plugin: when
Galaxy happens to be importable in the same environment as Pulsar, the plugin's
"job no longer in the queue" result resolved to Galaxy's job state `"ok"`
instead of Pulsar's internal `"complete"`, so the stateful manager never
deactivated the finished job. A one-line fix to return the expected
`"complete"` value resolved it, and the fix was contributed upstream.

## Result

Jobs submitted on usegalaxy.eu route to NEMO, run in containers on Slurm
compute nodes, report status back through the relay, and complete in the Galaxy
UI with job metrics showing the compute host and the CVMFS container that ran
the tool. The deployment is captured in an Ansible role, with operational notes
in the [usegalaxy.eu operations manual](https://github.com/usegalaxy-eu/operations)
so the team can maintain it.

## Thanks

A huge thank you to Björn Grüning for welcoming me into the Galaxy open source project!
It’s been an absolute privilege to contribute and learn from his mentorship along the way.
Thanks also to the Pulsar maintainers for the quick reviews.
