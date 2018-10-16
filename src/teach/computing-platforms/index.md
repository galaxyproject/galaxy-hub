---
title: Computing Platforms for Teaching with Galaxy
---
There are many [platform choices](/src/choices/index.md) for training with Galaxy. This page discusses the different options including the benefits and drawbacks of each. First, some introductory concepts:

# Teaching 'Using' versus 'Administering' Galaxy

The best choice of platform for teaching Galaxy is largely determined by whether the focus is on teaching *using* Galaxy or *installing and managing* Galaxy. Installing and managing Galaxy on cloud-based infrastructures is a viable option for biologists who want to use Galaxy. The Galaxy Project strongly encourages teaching users both how to use and how to administer Galaxy instances.

## Teaching 'Using'

Teaching *using* means instructing users how to perform bioinformatic analyses with Galaxy. This type of teaching works best on [shared servers](/src/teach/computing-platforms/index.md#shared) with multiple participants on each server. Typically, participants are not given admin access to the servers. The following options are available for teaching *using*:

* [Shared Servers on the Cloud](/src/teach/computing-platforms/index.md#shared-servers-on-the-cloud)
* [Personal Servers with CloudMan](/src/teach/computing-platforms/index.md#personal-servers-with-cloudman)
* [Virtual Machine Images](/src/teach/computing-platforms/index.md#virtual-machine-images)
* [Local Galaxy Servers](/src/teach/computing-platforms/index.md#local-galaxy-servers)
* [Public Galaxy Servers](/src/teach/computing-platforms/index.md#public-galaxy-servers)

## Teaching 'Administering'

Teaching *administering* means instructing users how to install and manage a Galaxy instance. This type of teaching works best if each participant sets up a [personal server](/src/teach/computing-platforms/index.md#personal) for which they are the only user and have admin access. The following options are available for teaching *administering*:

* [Personal Servers with CloudMan](/src/teach/computing-platforms/index.md#personal-servers-with-cloudman)
* [From the Command Line, using an AMI](/src/teach/computing-platforms/index.md#from-the-command-line-using-an-ami)
* [Virtual Machine Images](/src/teach/computing-platforms/index.md#virtual-machine-images)
* [Using the Laptop's OS](/src/teach/computing-platforms/index.md#using-the-laptops-os)

# Shared versus Personal Servers

## Shared

The term *shared server* describes Galaxy servers that are used by more than one participant simultaneously. Shared servers include [Main](/src/teach/computing-platforms/index.md#the-galaxy-project-free-public-server), [Shared Servers on the Cloud](/src/teach/computing-platforms/index.md#shared-servers-on-the-cloud), [Public Galaxy Servers](/src/teach/computing-platforms/index.md#public-galaxy-servers), and [Local Galaxy Servers](/src/teach/computing-platforms/index.md#local-galaxy-servers). Shared serves are typically used to teach using Galaxy.

## Personal

The term *personal server* describes Galaxy servers that are used by only one participant at a time. These users may also have admin access to the server. Personal servers are typically used to teach admininstering Galaxy.

# Platform Options: Which Platform to Use?

Choosing a platform to teach Galaxy depends on the purpose of the teaching and what the teacher has access to. Platform options are described in detail below and are color coded according to their suitability to:

 * **Light Use**: simple analyses that do not require much compute power (*e.g.*, text operations, interval operations)
 * **Heavy Use**: computationally intensive analyses (*e.g.*, analyses of NGS datasets)
 * **Admin**: access to Galaxy internals and ability to control the installation (*e.g.*, having administrative privileges)

The colors have the following meaning:

<table class="table table-bordered text-center">
  <tr>
    <td class="danger">Not appropriate</td>
    <td class="warning">Suitable</td>
    <td class="success">Recommended</td>
  </tr>
</table>

## Pre-existing Galaxy Servers

Many Galaxy servers already exist, and some of them may be useful for your teaching needs.

### The Galaxy Project Main Public Server

<table class="table table-bordered text-center">
  <tr>
    <td class="danger">Light Use</td>
    <td class="danger">Heavy Use</td>
    <td class="danger">Admin</td>
  </tr>
</table>

**Teaching with the free Galaxy Project Main public server ([usegalaxy.org](http://usegalaxy.org) is not recommended).**

[Main](http://usegalaxy.org) is a seemingly obvious choice for teaching: it's free, robust, rich in tools and data, has generous quotas, and anyone can create a login. However, Main is also a very popular resource, and it is impossible to predict when it will be lightly or heavily loaded. Teaching with Main on days when it is heavily loaded is a frustrating experience for both teachers and students. People don't learn anything if most of their time is spent waiting on jobs in the queue.

### Local Galaxy Servers

<table class="table table-bordered text-center">
  <tr>
    <td class="warning">Light Use</td>
    <td class="warning">Heavy Use</td>
    <td class="danger">Admin</td>
  </tr>
</table>

If your institution has its own local Galaxy server, this can be an ideal platform for teaching. Local instances often have specific tools and datasets that your researchers care about, and since it is not a shared global resource, server load is much more predictable.

However, a class full of users all running the same analyses will stress any server, and you are strongly advised to run any plans by your Galaxy admins well in advance.

### Public Galaxy Servers

<table class="table table-bordered text-center">
  <tr>
    <td class="warning">Light Use</td>
    <td class="warning">Heavy Use</td>
    <td class="danger">Admin</td>
  </tr>
</table>

There are many [publicly accessible Galaxy servers](/src/use/index.md) that may be appropriate for training purposes. Many of these servers have specialized and domain-specific tools, and many of them will not be as heavily and unpredictably used as as [Main](/src/main/index.md).

You are encouraged to [explore the list of pubic Galaxy servers](/src/use/index.md) to see if one or more matches your needs. However, these are also shared public resources. If you want to use a public server for training, be sure to contact the server's support people well in advance.

## Cloud-Based Galaxy Servers

<div class='right'><a href='/src/cloudman/index.md'><img src="/src/images/logos/CloudManWideBlackLogo.png" alt="CloudMan" width="150" /></a></div>

This option describes cloud-based Galaxy servers that are created for teaching purposes. Some [public](/src/teach/computing-platforms/index.md#public-galaxy-servers) and [local](/src/teach/computing-platforms/index.md#local-galaxy-servers) Galaxy servers are actually cloud-based; however, instructors don't set these up. This section specifically describes cloud-based Galaxy servers that are set up by the instructor for teaching purposes.

[CloudMan](/src/cloudman/index.md) software abstracts much of the details of different [Cloud](/src/cloud/index.md) infrastructures and provides a uniform graphical interface for managing cloud-based servers. 

### A Word on AWS

<div class='right'><a href='http://aws.amazon.com/grants/'><img src="/src/images/logos/AWSLogo.png" alt="Amazon Web Services in Education Grants Program" /></a></div>

The Galaxy Project uses [Amazon Web Services (AWS)](http://aws.amazon.com)-based servers in its workshops. CloudMan makes it easy to set these up. The Galaxy Project has an [AWS in Education grant](http://aws.amazon.com/grants/) that supports this work.

If you are considering using a cloud-based platform, you are encouraged to apply for the [AWS in Education Grants Program](http://aws.amazon.com/grants/). The application process is succinct and quick, and the grant text is limited to 4000 characters. It always helps to have an estimate for the funding included with the proposal (this [calculator](http://aws.amazon.com/tco-calculator/) can be useful). It is also helpful to have a detailed proposal describing the uniqueness of the work, how AWS will be used, and how the resulting work with be shared publicly via papers, events, or public relations.

### Shared Servers on the Cloud

<table class="table table-bordered text-center">
  <tr>
    <td class="success">Light Use</td>
    <td class="success">Heavy Use</td>
    <td class="danger">Admin</td>
  </tr>
</table>

Starting in early 2012, **every [*using* Galaxy workshop](/src/teach/computing-platforms/index.md#teaching-use) presented by the Galaxy Project uses cloud-based and [CloudMan](/src/cloudman/index.md)-managed shared Galaxy servers.** These servers are set up before a workshop, participants create accounts and use the servers during the workshop, and then the servers are shut down after the workshop.

If you are teaching *[using](/src/teach/computing-platforms/index.md#teaching-use)* Galaxy, then [large, shared](/src/teach/computing-platforms/index.md#shared) cloud-based servers work well. You (the instructor) set them up, and the participants don't even need to know they are using cloud-based servers.

If you use AWS-based and CloudMan-managed servers for your training, the Galaxy Project also provides a [Galaxy Workshop AMI](/src/teach/workshop-ami/index.md) that comes preloaded with several examples that are used in project-run workshops.

### Personal Servers with CloudMan

<table class="table table-bordered text-center">
  <tr>
    <td class="success">Light Use</td>
    <td class="success">Heavy Use</td>
    <td class="success">Admin</td>
  </tr>
</table>

Participants can set up their own CloudMan-based Galaxy server. This can be done either as a way to learn how to [use](/src/teach/computing-platforms/index.md#teaching-use) Galaxy, or as one way to learn how to [administer](/src/teach/computing-platforms/index.md#teaching-admin) Galaxy.

### From the Command Line, using an AMI

<table class="table table-bordered text-center">
  <tr>
    <td class="danger">Light Use</td>
    <td class="danger">Heavy Use</td>
    <td class="success">Admin</td>
  </tr>
</table>

*Amazon Machine Images (AMIs)* are a type of virtual machine image (see below) that runs on the AWS infrastructure. Using an AMI to [teach Galaxy administering](/src/teach/computing-platforms/index.md#teaching-admin) is a great option, and you can determine how much has already been done on the image, from a bare-bones Linux install to an image with the Galaxy source already cloned from GitHub.

## Locally Installed Galaxy Servers

Users can be instructred to install and run their own Galaxy servers on their personal laptops. Galaxy is relatively easy to install and can be run on moderately powered laptops. Importantly, some CPU- or memory-intensive analyses will not run well on a laptop. Therefore, if you are considering this option, you will need to determine minimum compute requirements for your students.

### Using the Laptop's OS

<table class="table table-bordered text-center">
  <tr>
    <td class="danger">Light Use</td>
    <td class="danger">Heavy Use</td>
    <td class="warning">Admin</td>
  </tr>
</table>

Users running MacOS or Linux can install Galaxy directly on their laptops. This approach is not always consistent as users' laptops will have a slightly different configuration and slightly different libraries and packages already installed. 

### Virtual Machine Images

<table class="table table-bordered text-center">
  <tr>
    <td class="success">Light Use</td>
    <td class="danger">Heavy Use</td>
    <td class="success">Admin</td>
  </tr>
</table>

A *virtual machine image* can be created that workshop participants can download and run on their laptops using a virtual machine image player such as [VirtualBox](http://virtualbox.org). In this case, you can pre-install any needed tools and datasets. The students will still be running analysis on their laptops, and therefore nothing too CPU- or memory-intensive can be run.
