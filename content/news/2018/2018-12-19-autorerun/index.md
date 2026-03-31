---
title: Automatic resubmission of failed Galaxy jobs
date: '2018-12-19'
tags: [devops]
location:
  name: Galaxy Europe
subsites: [eu, freiburg]
main_subsite: freiburg
---

UseGalaxy.eu has now started automatically resubmitting any jobs which fail.

## Automatic Job Resubmission

We noticed that a significant number of the bug reports we receive are for jobs
which do not have enough memory allocated. We have been working to find a way
to handle these edge cases. Galaxy has an initiative to allow annotating
specific tools for error codes and messages which indicate memory issues, but
we needed something more extensive which would work for all tools, even old
ones.

We updated our [dynamic job destination](https://github.com/usegalaxy-eu/infrastructure-playbook/commit/6eade5b0c1c3133393df540ff7fff1ad0093a72a)
to submit things by default to a "normal" destination, and upon failure for any
reason, it will resubmit the job and request 1.5x the memory.

There is still an [open issue](https://github.com/galaxyproject/galaxy/issues/7118)
with this system as we cannot automatically resubmit to another destination
which will request 2x the memory of the original job.

In general however, this seems to be working well, we have noticed a decrease
in failed jobs.

