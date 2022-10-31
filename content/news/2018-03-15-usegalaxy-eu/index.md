---
title: Freiburg Galaxy becomes useGalaxy.eu
date: '2018-03-15'
tags: [devops]
location:
  name: Freiburg, Germany
supporters:
- denbi
- elixir
- ViCE
subsites: [eu, pasteur, freiburg, erasmusmc, elixir-it, belgium, genouest]
main_subsite: eu
---

As part of our ongoing growth and development, Freiburg Galaxy is becoming useGalaxy.eu

## What Changes

- You will be able to access the galaxy instance via [`https://usegalaxy.eu`](https://usegalaxy.eu) in addition to the old, `https://galaxy.uni-freiburg.de`.
- Our website will read "useGalaxy.eu" in many places where it used to say Freiburg Galaxy. However, this Galaxy is still primarily run and maintained by the Freiburg Galaxy Team.
- You can reach us any time for questions at [galaxy@informatik.uni-freiburg.de](mailto:galaxy@informatik.uni-freiburg.de)

## What Doesn't Change

- Your data, the tools
- The Freiburg Galaxy Team is still maintaing the instance and providing all of the training associated with our Galaxy.

## The Future

We are not trying to be the only Galaxy in all of Europe, but we believe we are
in a good position to make our Galaxy and our services available to all of
Europe, especially locations which may not have the expertise or resources to
host their own Galaxy instance. Many times regional Galaxies will provide
features that are desirable over using a main european one, such as
localisation, support in your native language, and usage of local resources.

We welcome other groups to join us in maintaining and improving the European
Galaxy Instance, as part of that we have [open sourced](https://github.com/usegalaxy-eu)
most of the tools used in
maintenance of the repository and all of the supporting infrastructure. Our
goal is to have a completely open setup which anyone can reproduce on their own
infrastructure.

Here are some of our repositories and how they can be useful to you:

Repository                                                                         | About
---                                                                                | ---
[website](https://github.com/usegalaxy-eu/website)                                 | Our website, https://usegalaxy-eu.github.io
[vgcn](https://github.com/usegalaxy-eu/vgcn)                                       | The compute images we use for our cloud condor cluster
[vgcn-infrastructure](https://github.com/usegalaxy-eu/vgcn-infrastructure)         | The yaml description of our cloud cluster. Make a PR here if you think the queue is too slow and that we should add more compute resources.
[usegalaxy-eu-tools](https://github.com/usegalaxy-eu/usegalaxy-eu-tools)           | The tools installed in our Galaxy instance. Any changes made here are automatically reflected in useGalaxy.eu every saturday morning.
[infrastructure-playbook](https://github.com/usegalaxy-eu/infrastructure-playbook) | All of our cloud infrastructure, the VMs we run and their configuration.
[branding](https://github.com/usegalaxy-eu/branding)                               | Branding resources used by useGalaxy.EU
[operations](https://github.com/usegalaxy-eu/operations)                           | Our useGalaxy.eu operations manual for sysadmins
{: .table.table-striped }

