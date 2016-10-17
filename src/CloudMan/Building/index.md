---
autotoc: true
title: Building Galaxy , !, CloudMan components
---
PLACEHOLDER_INCLUDE(/CloudMan/Header)



<div class='right'></div>

Launching a default version of [CloudMan](http://usecloudman.org/) and [Galaxy on the Cloud](/src/CloudMan/index.md) is a pretty straightforward process. [The underlying system](http://onlinelibrary.wiley.com/doi/10.1002/cpe.1836/full), however, is more complex and consists of a number of components. This page describes the steps required to build your own version of the components and deploy the system. You may want to do this if you are deploying the system on your own Cloud. If you would just like to have a custom version of the existing system on AWS, perhaps [cluster sharing & cloning](/src/CloudMan/Sharing/index.md) can help?

## Overview
The process of building your own instance of the system is time consuming (although we are continuing to simplify and streamline this) and will require some technical skills and understanding of the process. Before starting this endeavor, it is highly recommended that you read the following papers: 
1. "[Galaxy CloudMan: delivering cloud compute clusters](http://www.biomedcentral.com/1471-2105/11/S12/S4)" - which gives you an overview of the ideology behind what's being done here; and
2. "[Building and Provisioning Bioinformatics Environments on Public and Private Clouds](http://figshare.com/articles/Building_and_Provisioning_Bioinformatics_Environments_on_Public_and_Private_Clouds/1424740)" - which gives many of the technical details of the overall build process
3. (optional) "[A reference model for deploying applications in virtualized environments](http://onlinelibrary.wiley.com/doi/10.1002/cpe.1836/full)" - which gives you the technical background why things are being done they way they are being done.

The process of building the system consists of a number of steps. Each step creates a component that, when joined together, compose the complete system. To have a functional *Galaxy on the Cloud* system, it is required to have all the components in place; using !CloudMan alone requires only the machine image and an S3 bucket (or a Swift container). The overall process of building the components has been automated via an [Ansible](http://www.ansible.com/) playbook: [galaxy-cloudman-playbook](https://github.com/galaxyproject/galaxy-cloudman-playbook). 

---

## Prerequisites

### Install Cloud Launch app
Throughout this process we will require access to an installation of the Cloud Launch application. This application simplifies the process of launching instances during the build phase and is later used by your users to launch instances of the complete system. A public instance of Cloud Launch is available at https://launch.usegalaxy.org/ but it is limited for use with the official Galaxy project cloud releases. It is hence necessary for you to install your own version of the application and populate it with the information for your cloud.

The installation process is detailed in the [Cloud Launch README](https://github.com/galaxyproject/cloudlaunch) so we won't be repeating it here. Once the application is installed, login to the Admin side of it (*<ip>/admin*) and add a new entry to the *Cloud* table with the details about your cloud and instances types available on that cloud. [Here is a screenshot](http://i.imgur.com/FAn3ERV.png) of what that looks like for one !OpenStack cloud. One particular field to note in that form is the *Bucket default* field - see the next section for more details about it.

### Get your own bucket
Each time someone starts an instance of the system we're building, they automatically retrieve a copy of the !CloudMan application that is then run. The application is automatically retrieved at launch time from an S3 bucket. The default S3 bucket is called *cloudman* and it contains the latest official !CloudMan release. There are two more public buckets: *cloudman-test* and *cloudman-dev* that contain a pre-release version of the application and the development version of the application, respectively. You can use any of those buckets as the source for the application but keep in mind that the buckets can get updated at any point, potentially changing functionality you depend on. Also note that the *-dev* bucket will often contain non-working code.

Alternatively, you can supply your own bucket and place the necessary files there. This gives your control of when the !CloudMan gets updated and gives you an option to customize the application if you need to. For this option, simply create an S3 bucket and upload !CloudMan source code into it. The details on how to do this are available [here](https://wiki.galaxyproject.org/CloudMan/CustomizeGalaxyCloud#Using_custom_CloudMan_application).

After you’ve decided on the suitable option, specify the bucket name in the Cloud Launch application under *Cloud -> Bucket default* field. Note that you can change this value at any point.


## Build a Machine Image
The machine image, often called the AMI (for Amazon Machine Image, although other cloud middleware solutions use the same term), represents the base operating system required to run the system; it contains the required system level applications and libraries as well as hooks for starting !CloudMan and the rest of the system. Once built, we'll use the machine image to launch instances for building the rest of the components as well to launch instance of the complete system once it's all done. 

To build your machine image, we need to download the [playbook](https://github.com/galaxyproject/galaxy-cloudman-playbook) and follow the instructions there on how to build the machine image. As things currently stand, the image can be built using a single command: *packer build [--only amazon-ebs|openstack] image.json*. Before running that command though, just make sure you followed the initial setup/configuration instructions to provide your cloud access credentials.

## Build the galaxyFS
The Galaxy File System (*galaxyFS*) contains the Galaxy application, the PostgreSQL database, installed Galaxy tools, and the accompanying configurations. The aim here is to create a snapshot of the *galaxyFS* that can be replicated when instances of the system are launched while permitting the changes to the file system (e.g., user-uploaded data, analysis results). This replication is realized by !CloudMan  at runtime. To build the *galaxyFS*, we need to do the following:
1. Launch a new instance of the machine image created in Step 1 using Cloud Launch (this will require you have installed your own instance of [Cloud Launch](https://github.com/galaxyproject/cloudlaunch) and added access info for your cloud via the Admin interface). When !CloudMan comes up, choose the *Cluster only* with *transient storage* option (under *Additional startup options*);
2. Follow the instructions from the [playbook](https://github.com/galaxyproject/galaxy-cloudman-playbook) to build the *galaxyFS*; note that this playbook has an option to automatically install Galaxy tools and create an archive of the file system;

When building the *galaxyFS*, there are a few things to keep in mind. The technical details are documented in the playbook so we'll only highlight a few high-level concepts here. The *galaxyFS*-building process can be thought of as a 3-stage process: first, the core components get installed and configured (e.g., Galaxy, the database, etc). Second, Galaxy tools need to be installed. For this, the Galaxy application needs to be started, which can be done from the !CloudMan Admin page (note that Postgres needs to be started first, then ProFTPd and only then Galaxy; see the playbook README for more details). Once started, you can install the tools from the Tool Shed by hand or using a role within the playbook to do this automatically. Once it's all been done, the third stage of the *galaxyFS*-build process is to create a file system archive. Again, the playbook README has more details but the core idea is that we create a tar ball of the entire file system and upload it to an object store so it can be retrieved by launched instances of the overall system.

## Build the galaxyIndicesFS
The *galaxyIndicesFS* contains reference data used by various tools. This step of the build process has not been automated and it needs to be done by hand. Take a look at the [Galaxy Data Managers](/src/Admin/Tools/DataManagers/index.md) and the [Data Integration](/Admin/DataIntegration) instructions on how to proceed with this step.

After the desired data has been loaded on the *galaxyIndicesFS*, it is likely that changes were made to the *galaxyFS* as well (e.g., Galaxy's **.loc* files, files edited by the Data Managers, etc.). If that's the case, it is necessary to update the galaxyFS archive. To do this, stop all services on the cluster (i.e., Galaxy, NodeJS, ProFTPd, Postgres) and run the *galaxyFS* build playbook as above with only the *cm.filesystem* role enabled. This will create a new archive of the galaxyFS and upload it to the object store with the up-to-date settings.

## Tie it all together
After all the components have been built, we need to add the details into the Cloud Launch application. Login to the Admin side of the application and add an entry to the *Images* table. The *Image id* needs to be a *boto*-compatible ID (e.g., *ami-03835e68*) while the description is up to you. Next, define a Flavor by specifying a name and a description for it followed by user data. The user data contains pointers to the components we built and should looks like this (of course, with the actual values for *archive_url* and *snap_id* updated to match the components you built):
```bash
cluster_templates:
  - name: Galaxy
    filesystem_templates:
    - name: galaxy
      roles: galaxyTools,galaxyData
      archive_url: http://s3.amazonaws.com/cloudman/fs-archives/galaxyFS-latest.tar.gz
      type: archive
      size: 10
    - name: galaxyIndices   
      roles: galaxyIndices
      snap_id: snap-c332f2b0
  - name: Data
    filesystem_templates:
    - name: galaxy
```


At this point, we are ready to launch an instance of the complete system!

---

## Additional resources
Over time, the community has developed a few more documents and resources that can help with setting up the system and these are aggregated here:
* [Genomics Virtual Lab](https://github.com/gvlproject/gvl.ansible.playbook) ⟶ Build a complete genomics workbench with more applications than Galaxy
* John Chilton's [CloudMan bootstrap](https://github.com/jmchilton/cloudman_openstack_bootstrap) (outdated)
* [CloudMan flavor](https://github.com/chapmanb/cloudbiolinux/blob/master/deploy/cloudman.md) in [CloudBioLinux](http://cloudbiolinux.org/) (outdated)
 
