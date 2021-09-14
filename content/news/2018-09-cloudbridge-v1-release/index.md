---
title: 'CloudBridge v1 release'
tease: Support for Microsoft Azure, better consistency
date: '2018-09-07'
---
We are pleased to announce the release of CloudBridge v1. 

[CloudBridge](http://cloudbridge.cloudve.org/en/latest/) is a Python library that offers a uniform interface to major Infrastructure-as-a-Service (IaaS) cloud providers. CloudBridge ensures operational consistency across the supported providers allowing the same code to run consistently across multiple cloud providers. With this release, CloudBridge supports Amazon Web Service (AWS), Microsoft Azure, and OpenStack clouds. This release is further characterized by improved code consistency.

Key features of this release are as follows:

### Support for Microsoft Azure
With an extensive help of the [AnswerALS project](https://www.answerals.org/) and Microsoft, Azure now has complete implementation of all the CloudBridge capabilities. If you have any CloudBridge code available, this mean it is now possible to readily leverage Azure as well! For the Galaxy and CloudLaunch projects, this means it will soon be possible to launch containerized instances of Galaxy on Azure.

### More logical interface layout
Each CloudBridge provider object now has four top-level properties logically grouping underlying resources: 
- _compute_: all services related to computational resources
- _networking_: services related to virtual network setup
- _security_: services related to ssh key pairs and firewalls
- _storage_: access to buckets, block volumes, and snapshots

Take a look at the diagram in the documentation for a graphical overview and links to specific services and resources: http://cloudbridge.cloudve.org/en/latest/#quick-reference 

### Consistent use of id, name, and label properties
After much deliberation (about which you can read in the [design decisions](http://cloudbridge.cloudve.org/en/latest/topics/design_decisions.html#resource-identification-naming-and-labeling) part of the documentation), each CloudBridge resource now has three properties when it comes to naming and identifying objects:
- `id` is a unique identifier for an object, always auto-generated;
- `name` is a read-only, user-friendly value which is suitable for display to the end-user;
- `label` is a user-assignable value that can be changed.

This consistency and clarity will help in more readily dealing with resource properties not only across providers but also among different resources. 


For other features and changes contained in this release, please take a look at the [CHANGELOG](https://github.com/CloudVE/cloudbridge/blob/master/CHANGELOG.rst).

## Availability
Latest version of CloudBridge is available from PyPi (https://pypi.org/project/cloudbridge/) for installation via pip (`pip install cloudbridge`) or [download from GitHub](https://github.com/CloudVE/cloudbridge/releases). CloudBridge is compatible with Python 2.7, 3.5, and 3.6. CloudBridge is licensed under the open-source MIT license.
