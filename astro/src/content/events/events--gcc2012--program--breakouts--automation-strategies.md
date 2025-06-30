---
title: 'Automation strategies for Data, Tools, & Config'
slug: events/gcc2012/program/breakouts/automation-strategies
---
## Table of contents

* [Notes](#notes)

# Notes

From Brad Chapman.

During the Galaxy breakout sessions, I joined folks who've been working on strategies to automate post-Galaxy tool and data installation. The goal was to consolidate implementations that install reference data, update Galaxy location files, and eventually install tools and software. The overall goal is to make moving to a production Galaxy instance as easy as getting up and running using `sh run.sh`.

The work plan moving forward is:

* Community members will look at building tools that include dependencies and sort out any issues that might arise with independent dependency installation scripts through Fabric.

* Galaxy team is working on exposing tool installation and data installation scripts through the API to allow access through automated scripts. The [current data installation code](https://bitbucket.org/hbc/galaxy-central-hbc/src/3127de4501ee/lib/galaxy/web/controllers/data_admin.py).

* Community is going to work on consolidating preparation of pre-Galaxy base machines using the CloudBioLinux framework. The short term goal is to use CloudBioLinux flavors to generalize existing scripts. Longer term, we will explore moving to a framework like Chef that handles high level configuration details.

It was great to bring all these projects together and I'm looking forward to building well supported approaches to automating the full Galaxy installation process.
