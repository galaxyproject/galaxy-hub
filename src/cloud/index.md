---
title: Galaxy on the Cloud
---
Researchers' compute requirements vary widely over time and formerly required either buying and maintaining compute resources (with most of it idle, most of the time), or reserving time and a fixed amount of compute resources on institutional clusters.

The *cloud* provides another option for this situation that can be cost-effective and efficient.  Cloud infrastructures are elastic and dynamic.  You only allocate resource when you need them, and you are able to dynamically scale up and down your allocated resources as your needs change over time.  Furthermore, compute clouds are maintained by outside providers - you don't need to install your own hardware, or need to have access to a research compute cluster at your institution.

Cloud infrastructures are just [one of the many ways that Galaxy is available](/src/choices/index.md).

# CloudMan

<div class='left'><a href='/src/cloudman/index.md'><img src="/src/images/logos/CloudManWideBlackLogo.png" alt="CloudMan" width="250" /></a></div>

[CloudMan](/src/cloudman/index.md) is a software package that abstracts the interface to cloud infrastructure, allowing users to take advantage of the power of cloud infrastructure without having to learn much of the underlying details of any particular infrastructure.  CloudMan supports elastic, dynamic resource scaling and works with Galaxy out of the box. Cloudman can launch a customized Galaxy instance using the simple [launch page](https://launch.usegalaxy.org/launch). It is also integrated with [CloudBioLinux](http://cloudbiolinux.org/).  CloudMan works with multiple cloud infrastructures including [Amazon Web Services](http://aws.amazon.com), [OpenStack](http://www.openstack.org/), and [OpenNebula](http://opennebula.org).

See the CloudMan page for more.


# Cloud Storage

Galaxy can store user data on a cloud-based storage, and can also download data from a cloud-based storage to a user history; providing users with _theoretically_ unlimited storage and facilitate joint data analysis. For details see [the documentaiton page](/src/cloud/storage/index.md).


# Globus Genomics

<div class='right'><a href='http://www.globus.org/genomics'><img src="/src/images/logos/GlobusGenomics.png" alt="Globus Genomics" width="200" /></a></div>

[Globus Genomics](http://www.globus.org/genomics) is an integrated solution for Next Gen Sequencing analysis utilizing technologies in big data management and big data analysis. Specifically, Globus Genomics combines big data management capabilities of [Globus Online](http://www.globusonline.org) with flexible, intuitive workflow/pipeline creation capabilities of the Galaxy framework and high throughput computing capabilities on Amazon Web Services through the use of HTCondor technology. Using Globus Genomics, researchers can easily transfer large amounts of sequence data from various sequencing centers and analyze the data either interactively or using one of the pre-defined best practice analytical pipelines with the familiar Galaxy interface. Globus Genomics is a non-profit service offering delivered and maintained by the Globus team at the Computation Institute, University of Chicago. If you are interested in using Globus Genomics or learning more about service offering, please visit us at [Globus Genomics](http://www.globus.org/genomics).

<div class='right'><br /><a href='http://aws.amazon.com/'><img src="/src/images/logos/AWSLogo400.png" alt="Amazon Web Services" width="200" /></a><br /><a href='http://opennebula.org'><img src="/src/images/logos/OpenNebulaLogo.png" alt="OpenNebula" width="200" /></a></div>

# Commercial Cloud Solutions

[<img class="float-left" src="/src/images/logos/OpenStackLogo.png" alt="OpenStack" width="130" />](http://openstack.org)

Both CloudMan and [Globus Genomics](/src/cloud/index.md#globus-genomics) use [Amazon Web Services](http://aws.amazon.com).  CloudMan can also run on any cloud provider that supports the [OpenStack](http://openstack.org) or [OpenNebula](http://opennebula.org) cloud management protocols.  This covers the vast majority of commercial cloud providers.

You can also set up your own Galaxy server using any cloud provider, but not CloudMan.  In this situation you handle the Galaxy installation and the cloud aspects of the install.

## Galaxy Specific Commercial Cloud Solutions

Finally, these vendors also provide support for running Galaxy on cloud infrastructures:

### Intero Life Sciences

[<img class="float-right" src="/images/logos/galaxy-enterprise-logo-200.png" alt="Galaxy Enterprise from Intero Life Sciences" />](https://www.galaxyinformatics.com/)

[Intero Life Sciences](https://www.interolifesciences.com/) offers *[Galaxy Enterprise Cloud](https://www.galaxyinformatics.com/)*:

* Fully managed and hosted on cloud Galaxy Enterprise with various levels of SLAs.
* Dedicated servers with dedicated secure access (VPN) including data storage and management.

