---
title: 2017 Hacktoberfest
date: '2017-10'
days: 31
tease: Online...
continent: GL
location: Online
external_url: /events/2017-10-hacktoberfest/
contact: Enis and Martin
---

What do fall foliage, pumpkin beer, and Halloween have in common? October! Or,
we should say [Hacktoberfest](https://hacktoberfest.digitalocean.com/). From Oct
1st through Oct 31st, Hacktoberfest is a celebration of open source coding
organized by Digital Ocean and GitHub. This is a great opportunity to get
involved with a project and get some help along the way. Plus, if you issue 4
pull request during the month, you get a limited edition t-shirt! Any project on
GitHub can participate simply by creating and tagging issues with Hacktoberfest
tag. If you'd like to participate on a Galaxy-related project, check out the
suggested topics below. The suggested topics are grouped by their Github
repository.

## Galaxy

Please see the list of [good first issues](https://github.com/galaxyproject/galaxy/issues?q=is%3Aissue+is%3Aopen+label%3Ahacktoberfest).

## CloudBridge
[CloudBridge](https://github.com/gvlproject/cloudbridge) is a Python library for
interfacing with multiple cloud providers through a single API. Implementations
for AWS and OpenStack exist while GCE and Azure are coming. The following will
help make the library more robust and usable.

- Introduce a collections/filtering mechanism for CloudBridge: https://github.com/gvlproject/cloudbridge/issues/91
- Wrap provider-specific exceptions into CloudBridge-specific ones: https://github.com/gvlproject/cloudbridge/issues/84
- Add auto-inherit docstrings to provider implementations: https://github.com/gvlproject/cloudbridge/issues/81
- Add logging calls to all the methods: https://github.com/gvlproject/cloudbridge/issues/85
- Add method to import a key pair and expose the public one: https://github.com/gvlproject/cloudbridge/issues/49
- Implement `refresh` method for all resources and make security group resource updateable: https://github.com/gvlproject/cloudbridge/issues/70
- Replace the current OpenStack implementation that uses multiple libraries with the OpenStackSDK: https://github.com/gvlproject/cloudbridge/issues/79

## CloudLaunch
[CloudLaunch](https://github.com/galaxyproject/cloudlaunch/) is an application
for discovering and launching applications across multiple cloud providers.
Any application can be added with a custom interface and custom launch/check logic.
Check the following issues to help. Thanks!

- Allow users to add private clouds: https://github.com/galaxyproject/cloudlaunch/issues/91
- Add multi-cloud browser frontend: https://github.com/galaxyproject/cloudlaunch/issues/92
- Create a CloudLaunch Docker image: https://github.com/galaxyproject/cloudlaunch/issues/94
- Add support for OpenAPI and client bindings for other languages: https://github.com/galaxyproject/cloudlaunch/issues/95
