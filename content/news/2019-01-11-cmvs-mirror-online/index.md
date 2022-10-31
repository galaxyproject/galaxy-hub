---
title: Another European CVMFS mirror is online
date: '2019-01-11'
tags: [devops, data]
location:
  name: Galaxy Europe
supporters:
- denbi
- bmbf
authors: bgruening
authors_structured:
- github: bgruening
subsites: [eu, freiburg]
main_subsite: freiburg
---

The [CernVM File System (CVMFS)](https://cernvm.cern.ch/portal/filesystem){:target="_blank"} provides a scalable, reliable and softare and data distribution service.
It was originally developed to assist High Energy Physics (HEP) collaborations to deploy software on the worldwide-distributed computing infrastructure used to run data processing applications.
The Galaxy project is using the same technology now to distribute 6TB of reference data and Singularity images to the scientific community.
This will make analysis more reproducible across Galaxy instances as the reference data is also shared. However, the provided data can be used without Galaxy and for example
will be available inside the de.NBI cloud.

Have a look at our [CVMFS example repository](https://github.com/usegalaxy-eu/cvmfs-example){:target="_blank"} and learn how to use the data and images.

Today we are proud to announce a new CVMFS mirror under `http://cvmfs1-ufr0.galaxyproject.eu/cvmfs/@fqrn@`.
This will make this service more sustainable and failure-tolerant to our entire community.

![CVMFS model](/assets/media/cvmfs.png)


