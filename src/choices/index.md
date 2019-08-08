---
title: "Galaxy Choices"
---

Galaxy is available in *many* different ways and some of those ways are better suited for some tasks than others.  Here are some guidelines to help you decide how to use Galaxy.

## Which Option to Choose?

Your choices depends upon your needs. If you want to use Galaxy with a minimum of setup work, then start with the [**Galaxy Platforms Directory**](/src/use/index.md).  This directory lists well over 100 resources in several different classes of Galaxy resources, all of which can be use with little or no setup on your part. The resource types are explained below.

|                                  | UseGalaxy Servers | Public Servers | TIaaS | Academic Cloud Services | Commercial Cloud Services | Containers | VMs | Local |
| :-------------: | :--------: | :--------: | :--------: | :--------: | :--------: | :--------: | :--------: | :--------: |
| Free to use               | Yes | Yes | Yes | Yes<sup>1</sup> | No | Yes | Yes | Yes |
| Uses your local compute infrastructure | No | No | No | No | No | Yes<sup>2</sup> | Yes<sup>2</sup> | Yes |
| Your have large datasets with many intermediate datasets ( > 250GB) | No |  ?  | Yes | Yes | Yes | ?<sup>3</sup> | ?<sup>3</sup> | Yes |
| Your computational requirements are similarly large |  No  | ?  | Yes | Yes | Yes | ?<sup>3</sup> | ?<sup>3</sup> | Yes |
| You want to share your Galaxy objects with others outside your organization |  Yes  |  Yes  | Yes | Yes | Yes | Yes<sup>4</sup> | Yes<sup>4</sup> | ?<sup>5</sup> |
| You have control over the tools and reference genomes that are installed | No  | No | No |  Yes<sup>5</sup>  | Yes  | Yes | Yes | Yes |
| You have absolute data security requirements |  No  |  No | No |  ?  |  ?  | ? | ? | Yes |

<sup>1</sup> If you qualify for the service.<br />
<sup>2</sup> Although these technologies can also be deployed on clouds.<br />
<sup>3</sup> Depends on the size of the system you are running it on.<br />
<sup>4</sup> With these technologies you can save the server and share the entire platform with them.<br />
<sup>5</sup> Depends on configuration.<br />


## UseGalaxy Servers

UseGalaxy servers implement a common core set of tools and reference genomes, and are open to anyone to use.  They also contain tools and genomes that are local to each server. Each is backed by significant computational resources and they are excellent places to get started with Galaxy, and to share and publish your results.

## Public Servers

Public Galaxy servers are acccessible to (at least) any academic researcher in the world.  Some require you to create/request an account, aand they may have restrictive quotas, but often, to use these, just go the website and start running analyses. These are free to use.

## [TIaaS](https://galaxyproject.eu/tiaas)

TIaaS (Training Infrastructure as a Service) is a special service for the Galaxy training community. You provide the training, we provide the infrastructure at no cost. It is like a UseGalaxy server (indeed it is currently the usegalaxy.eu Server) but you can register for special resources for your training, to avoid queing time or other limitations. Just contact the TIaaS provider.

## Academic Cloud Services

These are academic cloud providers where ready to run Galaxy instances are available. Many of these are restricted to users within a particular geographic domain, for example, a country, province, or consortium of countries. These are often free to eligible researchers.

## Commercial Cloud Services

These commercial cloud providers have ready to run Galaxy instances are available.  You need to pay for these, but you only need to pay for as long as you need the instance to be up.

## Containers

These Galaxy instances are prepackaged using container technology, usually Docker.  You run these locally by first installing the container technology (Docker is easy), and then launching the containerized Galaxy within that technology.  These use your local resources.


## Virtual Machines (VMs)

VMs are similar to containers but use a different technology.  Containers take significant advantage of your computer's underlying operating system.  Virtual Machines include an entire supporting operating system, and are significantly larger than containers.  You run these locally by first installing a VM player like VirtualBox, and then downloading and launching the VM within that player.  These use local resources.

## Main - usegalaxy.org

Galaxy has a free public server at [usegalaxy.org](http://usegalaxy.org/) (also known as *Main*) that can be used by anyone.  See [Main](/src/main/index.md) for more on this option.

## Local Galaxy Install from Scratch

Finally, you can install your own local instance of Galaxy from scratch. See [Get Galaxy](/src/admin/get-galaxy/index.md) for details on how to do this.  This has become much easier to do in recent years.
