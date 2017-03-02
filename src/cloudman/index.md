---
autotoc: true
---
<div class='center'><img src="/src/images/galaxy-logos/cloudman-logo.jpg" alt="CloudMan" width="60%" /></div>

<br />

<div class='left'></div> {{> CloudMan/LinkBox }}

There are several choices for using Galaxy.  This page describes using Galaxy on a *[cloud infrastructure](https://www.tcnp3.com/home/cloud-technology/what-is-cloud-computing-infographic/)* using CloudMan (see below). For other options, see [Choices](/src/choices/index.md) and [Cloud](/src/cloud/index.md).

### About Galaxy CloudMan

Galaxy CloudMan enables Galaxy to be quickly setup on cloud computing
resources. CloudMan is a *Cloud Man*ager that orchestrates all of the steps
required to provision, configure, manage, and share Galaxy on a cloud computing
infrastructure using just a web browser. An instance of Galaxy CloudMan behaves like
a private instance of Galaxy and offers the benefits of cloud computing
resource availability, elasticity and [pay-as-you-go](http://en.wikipedia.org/wiki/Cloud_computing#Economics)
resource ownership model.

Galaxy available via CloudMan comes pre-configured with the production settings
and is ready for processing data as soon as it is launched. The process  of
using Galaxy CloudMan requires a virtual server to be launched on a cloud
provider, which only takes a few minutes. Once launched, CloudMan sets up a
virtual cluster on the created server that can be dynamically scaled to meet
the current computational demand. Once the need for the compute resources
subsides, the acquired server(s) can be shut down. With such a paradigm, one
pays only for the resources they need and use.

### When to use Galaxy CloudMan

The following is a non-exhaustive list of scenarios when it is beneficial to use Galaxy on the Cloud:
* Do not want to spend time setting up a Galaxy instance
* Need to customize a Galaxy instance with new tools or genome reference data
* Have run up against the quotas on a public server
* Have variable or high requirements for compute or storage resources

### Getting started

To start your own *Galaxy CloudMan*, see the [Getting Started](/src/cloudman/getting-started/index.md) page.

### Determining the size of your cloud cluster

Cloud computing allows your cloud cluster to be variable in size and capacity. See [this page](/src/cloudman/capacity-planning/index.md) for some guidelines on how to decide what is right for you.

### Customizing your cloud cluster

If you are interested in running your own version of Galaxy and/or tools on the cloud while utilizing all the automation and functionality provided by CloudMan, [this page](/src/cloudman/CustomizeGalaxyCloud/index.md) explains how to do it.

### A note about costs

Amazon Web Services (AWS) is a pay-as-you-go service that requires a valid credit
card before resources can be acquired. Rates for Amazon EC2 can be found
[here](http://aws.amazon.com/ec2/pricing/). To see how much using Amazon cloud
might cost, you can use the [AWS cost calculator](http://calculator.s3.amazonaws.com/calc5.html).
When calculating the total cost, in addition to the EC2 instance(s), you will
have data volumes associated with your cluster where all of your Galaxy data
will be stored.

Community cloud providers, such as the <a href="http://jetstream-cloud.org/"
target="_blank">Jetstream cloud</a> in the US or the <a
href="https://nectar.org.au/research-cloud/" target="_blank">NeCTAR cloud</a>
in Australia offer free access to cloud resources but require an active project
allocation for which ones needs to apply.

### Galaxy AMIs

{{> CloudMan/AWS/AMIs }}

### Citing and Publications

If *Galaxy on the Cloud* has been significant to a project that has led to an academic publication, please acknowledge the contribution by citing the [following paper](http://www.nature.com/nbt/journal/v29/n11/full/nbt.2028.html):

* Afgan E., Baker D., Coraor N., Goto H., Paul I.M., Makova K.D., Nekrutenko A., Taylor J., "Harnessing cloud computing with Galaxy Cloud," Nature Biotechnology, Vol 29, Issue 11, 2011.

Thank you!

For a complete list of publications and presentations linked to CloudMan and Galaxy on the Cloud, see [this page](http://cloudman.irb.hr/publications).
