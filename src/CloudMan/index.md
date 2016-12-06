---
autotoc: true
---
<div class='center'><img src="/src/images/GalaxyLogos/cloudman-logo.jpg" alt="CloudMan" width="60%" /></div>

<br />

<div class='left'></div> PLACEHOLDER_INCLUDE(/src/CloudMan/LinkBox/index.md)

There are several choices for using Galaxy.  This page describes using Galaxy on a *[cloud infrastructure](https://www.tcnp3.com/home/cloud-technology/what-is-cloud-computing-infographic/)* using CloudMan (see below). For other options, see [Choices](/src/BigPicture/Choices/index.md) and [Cloud](/src/Cloud/index.md).

### About Galaxy on the Cloud

With sporadic availability of data, individuals and labs may have a need to, over a period of time, process greatly variable amounts of data. Such variability in data volume imposes variable requirements on availability of compute resources used to process given data. Rather than having to purchase and maintain desired compute resources or having to wait a long time for data processing jobs to complete, the Galaxy Team has enabled Galaxy to be instantiated on cloud computing]] infrastructures, primarily [Amazon Elastic Compute Cloud (EC2)](http://aws.amazon.com/ec2/). An instance of Galaxy on the Cloud behaves just like a local instance of Galaxy except that it offers the benefits of cloud computing resource availability, scalability and [pay-as-you-go](http://en.wikipedia.org/wiki/Cloud_computing#Economics) resource ownership model. 

Having simple ability to launch pre-configured Galaxy on the Cloud enables as many instances of Galaxy to be acquired and started as is needed to process given data without setting up Galaxy. Each instance can be dynamically scaled as a virtual cluster in the cloud and it only takes minutes to do so. Once the need for the compute resources subsides, those instances can be shut down. With such a paradigm, one pays only for the resources they need and use. 

### When to use Galaxy on the Cloud

The following is a non-exhaustive list of scenarios when it is beneficial to use Galaxy on the Cloud:
* Do not want to spend time setting up a Galaxy instance
* Need to customize a Galaxy instance with new tools or genome reference data
* Have variable or high requirements for compute or storage resources

### Getting started with Galaxy on the Cloud

To start your own *Galaxy in the Cloud* cluster, see the [Getting Started](/src/CloudMan/GettingStarted/index.md) page. This page describes concepts and points to key features of using Galaxy on the Cloud.

### Determining the size of your cloud cluster

Cloud computing allows your cloud cluster to be variable in size and capacity. See [this page](/src/CloudMan/CapacityPlanning/index.md) for some guidelines on how to decide what is right for you.

### Customizing your cloud cluster

If you are interested in running your own version of Galaxy and/or tools on the cloud while utilizing all the automation and functionality provided by CloudMan, [this page](/src/CloudMan/CustomizeGalaxyCloud/index.md) explains how to do it.

### A note about costs

Amazon EC2 service is a pay-as-you-go service where all that is needed to use it is a valid credit card. Rates for Amazon EC2 can be found [here](http://aws.amazon.com/ec2/pricing/).

To see how much using Amazon cloud might cost, you can use the [AWS cost calculator](http://calculator.s3.amazonaws.com/calc5.html). When calculating the total cost, in addition to the EC2 instance, you will have EBS data volumes associated with your cluster. There are a total of two EBS volumes associated with each Galaxy cluster: your data volume (size is decided by you when setting up the cluster, say 100GB to begin with) and genomics indices volume (600GB). (Note, the indices volume can be greatly reduced if you don't need all the genome data - contact us about how to do this.)

### Galaxy AMIs

PLACEHOLDER_INCLUDE(/src/CloudMan/AWS/AMIs/index.md)

### Citing and Publications

If *Galaxy on the Cloud* has been significant to a project that has led to an academic publication, please acknowledge the contribution by citing the [following paper](http://www.nature.com/nbt/journal/v29/n11/full/nbt.2028.html):

* Afgan E., Baker D., Coraor N., Goto H., Paul I.M., Makova K.D., Nekrutenko A., Taylor J., "Harnessing cloud computing with Galaxy Cloud," Nature Biotechnology, Vol 29, Issue 11, 2011.

Thank you!

For a complete list of publications and presentations linked to CloudMan and Galaxy on the Cloud, see [this page](http://cloudman.irb.hr/publications).
