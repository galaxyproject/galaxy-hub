---
title: 'CloudBridge 2.0 release'
tease: Support for Google Cloud Platform, customizability without library code changes
date: '2019-03-14'
---
We are pleased to announce the release of CloudBridge 2.0 release. 

[CloudBridge](http://cloudbridge.cloudve.org/en/latest/) is a Python library that offers a uniform interface to major Infrastructure-as-a-Service (IaaS) cloud providers. CloudBridge ensures operational consistency across the supported providers allowing the same code to run consistently across multiple cloud providers. With this release, CloudBridge supports Amazon Web Service (AWS), Microsoft Azure, OpenStack, and now Goodle cloud. This release is further characterized by improved code consistency.

Key features of this release are as follows:

### Support for Google Cloud Platform (GCP)
With an extensive help Google, the Google Cloud Platform now has complete implementation of all the CloudBridge capabilities. If you have any CloudBridge code available, this mean it is now possible to readily leverage GCP without code changes! For the Galaxy and CloudLaunch projects, this means it will soon be possible to launch containerized instances of Galaxy on GCP.

### Introduction of library middleware
A new middleware layer has been added to CloudBridge that can listen and intercept events. This makes it possible to extend CloudBridge without touching the library source code. 
Take a look at the documentation for details on how to use this feature: http://cloudbridge.cloudve.org/en/latest/topics/event_system.html

### Interface changes
In the process of adding the 4th cloud provider, it was necessary to create some new abstractions to keep the library functionality as consistent as possible. With that, some backwards incomaptible interface changes took place. Namelt, providers now operate in a specific zone and hence zone parameter is no longer accepted by methods. Also, the package layout has been simplied by moving all the modules one level higher in the hierarchy.

Overall, much of the code has been made significantly more streamlined with simpler interfaces. For other features and changes contained in this release, please take a look at the [CHANGELOG](https://github.com/CloudVE/cloudbridge/blob/master/CHANGELOG.rst).

## Availability
Latest version of CloudBridge is available from PyPi (https://pypi.org/project/cloudbridge/) for installation via pip (`pip install cloudbridge`) or [download from GitHub](https://github.com/CloudVE/cloudbridge/releases). CloudBridge is compatible with Python 2.7, 3.5, and 3.6. CloudBridge is licensed under the open-source MIT license.
