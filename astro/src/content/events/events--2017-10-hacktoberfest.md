---
title: 2017 Hacktoberfest
date: '2017-10-01T00:00:00.000Z'
days: 31
tease: Online...
continent: GL
location:
  name: Online
contact: Enis and Martin
subsites:
  - global
  - us
slug: events/2017-10-hacktoberfest
---
## Table of contents

* [Galaxy](#galaxy)
* [CloudBridge](#cloudbridge)
* [CloudLaunch](#cloudlaunch)

## Galaxy

Please see the list of [good first issues](https://github.com/galaxyproject/galaxy/issues?q=is%3Aissue+is%3Aopen+label%3Ahacktoberfest).

## CloudBridge

[CloudBridge](https://github.com/gvlproject/cloudbridge) is a Python library for
interfacing with multiple cloud providers through a single API. Implementations
for AWS and OpenStack exist while GCE and Azure are coming. The following will
help make the library more robust and usable.

* Introduce a collections/filtering mechanism for CloudBridge: https://github.com/gvlproject/cloudbridge/issues/91
* Wrap provider-specific exceptions into CloudBridge-specific ones: https://github.com/gvlproject/cloudbridge/issues/84
* Add auto-inherit docstrings to provider implementations: https://github.com/gvlproject/cloudbridge/issues/81
* Add logging calls to all the methods: https://github.com/gvlproject/cloudbridge/issues/85
* Add method to import a key pair and expose the public one: https://github.com/gvlproject/cloudbridge/issues/49
* Implement `refresh` method for all resources and make security group resource updateable: https://github.com/gvlproject/cloudbridge/issues/70
* Replace the current OpenStack implementation that uses multiple libraries with the OpenStackSDK: https://github.com/gvlproject/cloudbridge/issues/79

## CloudLaunch

[CloudLaunch](https://github.com/galaxyproject/cloudlaunch/) is an application
for discovering and launching applications across multiple cloud providers.
Any application can be added with a custom interface and custom launch/check logic.
Check the following issues to help. Thanks!

* Allow users to add private clouds: https://github.com/galaxyproject/cloudlaunch/issues/91
* Add multi-cloud browser frontend: https://github.com/galaxyproject/cloudlaunch/issues/92
* Create a CloudLaunch Docker image: https://github.com/galaxyproject/cloudlaunch/issues/94
* Add support for OpenAPI and client bindings for other languages: https://github.com/galaxyproject/cloudlaunch/issues/95
