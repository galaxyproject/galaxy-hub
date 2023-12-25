---
title: "EuroScienceGateway project: Easy deployment of Pulsar endpoints with Infrastructure Manager"
date: "2023-10-31"
tease: "Deploy Pulsar endpoints in the EGI Federated Cloud easily with Infrastructure Manager"
hide_tease: false
tags: [esg-wp4, esg]
subsites: [all-eu, esg, global]
main_subsite: eu
---

The [EuroScienceGateway Project](../../projects/esg/) is streamlining the way that users Bring their Own Compute (BYOC) to Galaxy.
This post covers a specific case in which a user has access to computing resources in the [EGI Federated Cloud](https://www.egi.eu/service/cloud-compute/).

The video below shows how to use [Infrastructure Manager Dashboard](https://docs.egi.eu/users/compute/orchestration/im/dashboard/) to deploy and configure cluster of virtual machines with [HTCondor](https://htcondor.org/) and [Pulsar](https://pulsar.readthedocs.io/) that can be connected to Galaxy to execute workloads.

<iframe width="560" height="315" src="https://www.youtube.com/embed/5EMXzD_JDjw?si=oDGCKDuJmil2EjgR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

The video above assumes the following:

1. You have an [EGI Check-in Account](https://docs.egi.eu/users/aai/check-in/signup/) with access to a [Virtual Organisation](https://docs.egi.eu/users/aai/check-in/joining-virtual-organisation/) (VO) with enough resources to deploy a virtual cluster of virtual machines with HTCondor. In this example the VO we are using is [vo.usegalaxy.eu](https://appdb.egi.eu/store/vo/vo.usegalaxy.eu).

1. You have previously uploaded the [Virtual Galaxy Compute Node](https://github.com/usegalaxy-eu/vgcn) image to the cloud. In the video above we are using [vggp-v60-j340](https://usegalaxy.eu/static/vgcn/vggp-v60-j340-e3937ea797ed-dev.raw).The goal here is to build on top of the great work done by the UseGalaxy.eu team to build the VGCN virtual machine images with everything that is needed.

This is all work in progress and we would welcome your feedback to improve it!
