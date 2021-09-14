---
title: 'Galaxy Cloud embraces the GVL'
tease: 'From Galaxy 17.09, Galaxy cloud instances use the GVL framework'
date: '2018-01-22'
---

In 2009, we orchestrated deployment of the entire Galaxy platform on the cloud
enabling researchers to deploy a private, production-quality, and scalable
Galaxy server within minutes using just a web browser. Over the following years,
led by [Melbourne Bioinformatics](https://www.melbournebioinformatics.org.au/),
the Genomics Virtual Laboratory (GVL) was developed as a cloud-based platform
for bioinformatics. In addition to Galaxy, the GVL made a suite of tools
available on the same system creating a bioinformtics data analysis workbench.

Starting with the Galaxy 17.09 release, we have merged the two solutions for
gaining easy access to Galaxy-on-the-Cloud. Going forward, when wanting to use
Galaxy on a cloud provider, please launch the
[Genomics Virtual Lab appliance](https://launch.usegalaxy.org/catalog/appliance/genomics-virtual-lab)
from [CloudLaunch](https://launch.usegalaxy.org/catalog).

The GVL comes with all the same functionality as the standalone Galaxy CloudMan
did including easy setup, cluster scaling, Galaxy admin user management, etc.
In addition, each launched GVL comes with the following application services:
* A dedicated Jupyter Notebook server
* A dedicated RStudio server
* Remote desktop access (via browser)
* An upload folder for easier data sharing
* A dashboard for managing all running services

We are excited about this development because it helps make data analysis
more accessible, more comprehensive, and brings more people together.

[Give it a try](https://launch.usegalaxy.org/catalog/appliance/genomics-virtual-lab)
and [let us know](https://github.com/galaxyproject/cloudlaunch/issues/new) if
you have any comments or suggestions.
