---
title: 'CloudBridge Release 2.1.0'
tease: New services and improved robustness
date: '2020-12-01'
---

We are happy to announce the release of [CloudBridge library version 2.1.0](https://pypi.org/project/cloudbridge/).

[CloudBridge](http://cloudbridge.cloudve.org/en/latest/) is a Python library that provides a consistent layer of abstraction 
over different Infrastructure-as-a-Service cloud providers, 
reducing or eliminating the need to write conditional code for each cloud.

The release 2.1.0 includes:
- A new DNS service, which is a top level service for managing DNS zones and records.
- Support for using the newly added AWS instance type offerings API. This removes the dependency on a static machine type list, and returns up-to-date information on instance type availability.
- The default package no longer bundles Azure, as the Azure python libraries are very large and affects docker container size when using cloudbridge. To install with Azure, use pip install cloudbridge[full] or pip install cloudbridge[azure].
- A convenience method for cloning providers in different zones has been added, which helps with multi-zone operations.
- Support for specifying s3 signature version for the AWS provider.
- Miscellaneous bug fixes and error handling improvements.
- Support for python<3 dropped.
- No major backward incompatible changes (apart from Azure not being bundled by default)
