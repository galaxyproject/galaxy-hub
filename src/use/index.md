---
title: "Galaxy Servers, Services, and Deployable Resources"
autotoc: true
layout: use_index.pug
---

<img src="/src/public-galaxy-servers/90-plus-slide.png" alt="and counting"
class="img-responsive center-block" />

The Galaxy Project's public server ([usegalaxy.org](http://usegalaxy.org/)) can
meet many needs, but it is not suitable for everything (see
[Choices](/src/choices/index.md) for why). Fortunately the Galaxy
[Community](/src/community/index.md) has created Galaxy instances in many different forms and with many different applications. There are classified in this directory by their *platform* and their *scope*

# Platforms / Technologies

Galaxy is available through all sorts of different technologies, from web sites you can just use, to virtual machines you can download and deploy.

**Public Servers**

These are publicly accessible Galaxy servers.  To use them, just go to the website.  You may be required to create/request a login.  They are free to use.

**Commercial Cloud Services**

These are commercial cloud providers (think AWS or Google Cloud) where ready to run Galaxy instances are available.  You need to pay for these, but you only need to pay for as long as you need the instance to be up.

**Academic Cloud Services**

These are academic cloud providers where ready to run Galaxy instances are available. Many of these are restricted to users within a particular geographic domain, for example, a country, province, or consortium of countries. These are often free to eligible researchers. 

**Containers**

These Galaxy instances are prepackaged using container technology, usually Docker.  You run these locally by first installing the container technology (Docker is easy), and then launching the *containerized* Galaxy within that technology.  These use local resources.

**Virtual Machines (VMs)**

*VMs* are similar to *containers* but use a different technology.  Containers take significant advantage of your computer's underlying operating system.  *Virtual Machines* include an entire supporting operating system, and are significantly larger than containers.  You run these locally by first installing a VM player like VirtualBox, and then downloading and launching the VM within that player.  These use local resources.

**Install Locally**

Like *container* and *VM* based instances, these are instances that can be locally deployed or your organization's compute infrastructure.  However, these instances run directly on your infrastructure and do not rely on container or VM technology.  These installs are maximally customizable, but also more work.

# Scope

Different resources also have different *scopes*.

**General / Genomics**

These resources implement a broad range of tools and aren't specific to any part of the tree of life, or to any specific type of analysis. These are servers you can use when you want to do general genomic analysis.

There is a subset of general resources that deserve special mention:

* **[UseGalaxy servers](/src/usegalaxy/index.md)** implement a common core set of tools and reference genomes, and are open to anyone to use. They also contain tools and genomes that are local to each server. Each is backed by significant computational resources and they are excellent places to get started with Galaxy, and to share and publish your results. 

**Domain**

*Domain* resources in either a particular branch of the tree of life, or in particular types of analysis. Within their specializations, domain servers offer a wide variety of tools.

**Tool Publishing**

*Tool publishing* resources make specific tools easily available so that researchers can use the tools without having to install and use the command line versions of the tools. Galaxy, it turns out, is an excellent way to make your tools easy to try out and use.

The distinction between *domain* servers and *tool publishing* resources is fuzzy. In general, tool publishing resources expose tools from a particular organization, while domain resources include tools / datasets from other organizations and have a larger goal in mind.

----

If you maintain a public instance of Galaxy we recommend signing up for
the public servers [mailing
list](https://lists.galaxyproject.org/listinfo/galaxy-public-servers) to
receive security fixes a few days before they are generally announced.

<div class="alert alert-success" role="alert"> **To add** your public Galaxy
server to this list [describe the server
here](https://docs.google.com/forms/d/1KBkyhAPpgJLanRWBoIHmwtEJELDUifZLUixfoqZXXU4/viewform?usp=send_form)
and we'll post it this directory.</div>

[**Galaxy Services**](/src/galaxy-services/index.md)

There are also a number of [Galaxy services](/src/galaxy-services/index.md)
that make Galaxy available to research communities, sometimes restricted on a
geographical or domain basis.  See the [Galaxy services
list](/src/galaxy-services/index.md).

[**Public ToolSheds**](/src/toolshed/public-toolsheds/index.md)

In addition to the the [main Galaxy](http://toolshed.g2.bx.psu.edu/) and
[Test](http://testtoolshed.g2.bx.psu.edu/) ToolSheds, several groups have made
their [tools available through publicly accessibly
ToolSheds](/src/toolsheds/public-toolsheds/index.md).

[**Public Server Dashboard**](https://grafana.denbi.uni-freiburg.de/dashboard/db/public-galaxy-servers)

The folks are Freiburg have put together a [public Galaxy server dashboard](https://stats.usegalaxy.eu/d/000000020/public-galaxy-servers?orgId=1) to track the status and some of the supported features of the servers listed here.  See the [blog post](/src/blog/2017-10-public-galaxy-dashboard/index.md) for more info.

