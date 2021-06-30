---
title: ‘GVL 4.4.0 release'
tease: Galaxy 18.05 and overridable configs
date: '2018-09-28'
---
In collaboration with the University of Melbourne and [Melbourne Bioinformatics](https://www.melbournebioinformatics.org.au/), we are pleased to announce the release of the Genomics Virtual Lab (GVL) 4.4.0 on Amazon Web Services (AWS) and NeCTAR clouds. 

The [GVL](https://www.gvl.org.au/) is a comprehensive data analysis workbench that comes as a complete package with a variety of pre-installed and configured software (Galaxy, RStudio, Jupyter) coupled with cloud compute infrastructure. Each instance of the GVL can be dynamically scaled via CloudMan and customized with additional tools or reference data. There are also no storage or job quotas. 

Key features of this release are as follows:

### Upgrade Galaxy to 18.05
GVL 4.4.0 has been updated to include [Galaxy 18.05](https://docs.galaxyproject.org/en/release_18.05/releases/18.05_announce.html#highlights) with all the features this version of Galaxy brings, including Unlimited Browser Upload Size and the New Powerful Rule-Based Data Uploader. This update also includes the new Galaxy functionality where rich output files from tools need to be whitelisted to have them show formatted content (e.g, HTML). Do this via the Galaxy Admin console.

### Overridable Galaxy configs
Traditionally, CloudMan controlled Galaxy configuration files such as `galaxy.ini` to ensure a suitable set of configuration options so that Galaxy runs well. With that, CloudMan would override any customizations to Galaxy configuration files. With this release, it is possible to retain custom `galaxy.ini` and `tool_conf.xml` settings. To override `galaxy.ini`, simply specify your desired settings in a file in `/mnt/galaxy/galaxy-app/config/cloudman_overrides/` directory whose name starts with a higher number number than a file that defines a setting already and your value will take precedence. New values can also be set. To override `tool_conf.xml`, use CloudMan’s template overriding mechanism. To use it, copy the original template from `/mnt/cm/cm/conftemplates` to `/opt/cloudman/config/conftemplates/` and modify as desired.

### Tools were updated to latest version
The GVL Galaxy instance comes with [over 200 tools](https://github.com/gvlproject/gvl.ansible.filesystem/blob/master/files/scripts/shed_tool_list.yaml.gvl) installed. Many of these were updated to include the latest revision, in addition to preserving the versions from previous GVL releases.

## Availability
GVL 4.4.0 can be launched from CloudLaunch: https://launch.usegalaxy.org/catalog/appliance/genomics-virtual-lab on either AWS or NeCTAR clouds.
