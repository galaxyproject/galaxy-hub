---
title: 'VGCN: Rolling Replacement of Cloud Compute Resources'
date: '2017-09-29'
tags: [devops]
subsites: [eu, freiburg]
main_subsite: freiburg
---

We have been experimentally running some Galaxy jobs in the bwCloud at the
University of Freiburg. Unlike more traditional compute resources we can scale
the cloud resources up and down on-demand.

![Virtual Galaxy Compute Nodes](/assets/media/vgcn.png)

But what happens when we need to replace the VMs? We built a new version of
our compute node images but we didn't want to disrupt jobs that were running.

So we spent some time developing a small tool to gracefully terminate the VMs
running the old image and replace them with VMs running the new image.

The software is [freely available](https://github.com/usegalaxy-eu/vgcn-infrastructure/) under the
[GPL license](https://github.com/usegalaxy-eu/vgcn-infrastructure/blob/master/LICENSE)

