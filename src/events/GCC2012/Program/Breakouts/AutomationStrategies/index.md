---
title: Automation strategies for Data, Tools, & Config
---
{{> events/GCC2012/PageHeader }}

{{> events/GCC2012/LinkBox }}



A proposed [Breakout Session](/src/events/GCC2012/Program/Breakouts/AutomationStrategies//index.md) for [GCC2012](/src/events/GCC2012/index.md), organized by Brad Chapman, [John Chilton](/src/JohnChilton/index.md), [Enis Afgan](/src/EnisAfgan/index.md), [Dave Bouvier](/src/DaveBouvier/index.md) and [Jen Jackson](/src/JenniferJackson/index.md)

This involves turning the base Galaxy into a production machine: 
* download of associated genomes and data files, 
* Galaxy tool and executable installation, 
* setup of configuration files.

There are, at least, three different overlapping attempts at this:

* https://bitbucket.org/jmchilton/galaxy-vm-launcher
* https://bitbucket.org/afgane/mi-deployment
* https://github.com/chapmanb/cloudbiolinux/blob/master/data_fabfile.py

This also dovetails nicely with work within the Galaxy Team to address some of these issues as well.

We would like to consolidate these into a single community maintained package. This breakout will lay out a foundation for this.

# Notes

From Brad Chapman.

During the Galaxy breakout sessions, I joined folks who've been working on strategies to automate post-Galaxy tool and data installation. The goal was to consolidate implementations that install reference data, update Galaxy location files, and eventually install tools and software. The overall goal is to make moving to a production Galaxy instance as easy as getting up and running using `sh run.sh`.

The work plan moving forward is:

* Community members will look at building tools that include dependencies and sort out any issues that might arise with independent dependency installation scripts through Fabric.

* Galaxy team is working on exposing tool installation and data installation scripts through the API to allow access through automated scripts. The [current data installation code](https://bitbucket.org/hbc/galaxy-central-hbc/src/3127de4501ee/lib/galaxy/web/controllers/data_admin.py).

* Community is going to work on consolidating preparation of pre-Galaxy base machines using the CloudBioLinux framework. The short term goal is to use CloudBioLinux flavors to generalize existing scripts. Longer term, we will explore moving to a framework like Chef that handles high level configuration details.

It was great to bring all these projects together and I'm looking forward to building well supported approaches to automating the full Galaxy installation process.
