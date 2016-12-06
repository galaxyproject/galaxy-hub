---
autotoc: true
title: Computing Platforms for Teaching with Galaxy
---
PLACEHOLDER_INCLUDE(/src/Teach/Header/index.md)



<div class='right'></div>

PLACEHOLDER_INCLUDE(/src/Teach/LinkBox/index.md)

Just as [there are many platform choices for using Galaxy](/src/BigPicture/Choices/index.md), there are many platform choices for training with Galaxy.  This page discusses the different options and plusses and minuses of each.  Options [are summarized below](/src/Teach/ComputingPlatforms/index.md#the-bottom-line-which-platform-to-use).

# Terminology

First, 4 basic terms.

## Teaching 'Using' versus 'Administering' Galaxy

Your platform options are largely determined by whether you are primarily teaching the *use* of Galaxy, or if you are teaching how to *install and manage* a Galaxy instance.  This distinction is not as clear as you would hope.  Installing and managing Galaxy on cloud infrastructures is now a viable option for biologists who just want to use Galaxy.

### Teaching Use

If you are using Galaxy to teach bioinformatic analysis then you are teaching *use*.  This usually means you will be using *[shared servers](/src/Teach/ComputingPlatforms/index.md#shared)*, with multiple participants on each server and that participants will not have admin access to the servers.  The following options can be used to teach *use*:

* [Shared Servers on the Cloud](/src/Teach/ComputingPlatforms/index.md#shared-servers-on-the-cloud)
* [Personal Servers with CloudMan](/src/Teach/ComputingPlatforms/index.md#personal-servers-with-cloudman)
* [Virtual Machine Images](/src/Teach/ComputingPlatforms/index.md#virtual-machine-images) (maybe)
* [Local Galaxy Servers](/src/Teach/ComputingPlatforms/index.md#local-galaxy-servers) (maybe)
* [Public Galaxy Servers](/src/Teach/ComputingPlatforms/index.md#public-galaxy-servers) (maybe)

### Teaching Admin

If you are teaching how to install and manage a Galaxy instance then you are teaching *admin*.  This usually means that each participant will be setting up a *[personal server](/src/Teach/ComputingPlatforms/index.md#personal)* which that participant has admin access to, and which they are the only user.  These options can be used to teach *admin:*

* [Personal Servers with CloudMan](/src/Teach/ComputingPlatforms/index.md#personal-servers-with-cloudman)
* [From the Command Line, using an AMI](/src/Teach/ComputingPlatforms/index.md#from-the-command-line-using-an-ami)
* [Virtual Machine Images](/src/Teach/ComputingPlatforms/index.md#virtual-machine-images)
* [Using the Laptop's OS](/src/Teach/ComputingPlatforms/index.md#using-the-laptops-os) (maybe)

## Shared versus Personal Servers

### Shared

The term *shared server* is used here to describe Galaxy servers that are used by more than one participant simultaneously.  Shared servers include the [Main](/src/Teach/ComputingPlatforms/index.md#the-galaxy-project-free-public-server), [Shared Servers on the Cloud](/src/Teach/ComputingPlatforms/index.md#shared-servers-on-the-cloud), [Public Galaxy Servers](/src/Teach/ComputingPlatforms/index.md#public-galaxy-servers), and [Local Galaxy Servers](/src/Teach/ComputingPlatforms/index.md#local-galaxy-servers) options described below.

### Personal

The term *personal server* is used for Galaxy servers which only that participant has access to.  They may also have admin access to the server.  Personal servers are typically used to teach how to *[admin Galaxy](/src/Teach/ComputingPlatforms/index.md#teaching-admin)*.

<br />

# Platform Options

## The Bottom Line: Which Platform to Use?

It depends on what you are teaching, and what you have access to.

<table>
  <tr>
    <th rowspan=5 style=" text-align: center;"> Teaching </th>
    <td rowspan=5 style=" border: none;"> </td>
    <th colspan=11 style=" text-align: center;"> Platform </th>
  </tr>
  <tr>
    <td colspan=11 style=" border: none; text-align: center;"> </td>
  </tr>
  <tr class="th" >
    <th colspan=3 style=" text-align: center;"> <a href='/src/Teach/ComputingPlatforms/index.md#pre-existing-servers'>Pre-existing</a> </th>
    <th rowspan=3 style=" border: none; background-color: #FFFFFF;"> </th>
    <th colspan=3 style=" text-align: center;"> <a href='/src/Teach/ComputingPlatforms/index.md#cloud-based-galaxy-servers'>Cloud-Based</a> </th>
    <th rowspan=3 style=" border: none; background-color: #FFFFFF;"> </th>
    <th colspan=2 rowspan=2 style=" text-align: center;"> <a href='/src/Teach/ComputingPlatforms/index.md#laptop-based-galaxy-servers'>Laptop-Based</a> </th>
  </tr>
  <tr class="th" >
    <th rowspan=2 style=" text-align: center;"> <a href='/src/Teach/ComputingPlatforms/index.md#the-galaxy-project-free-public-server'>Main</a> </th>
    <th rowspan=2 style=" text-align: center;"> <a href='/src/Teach/ComputingPlatforms/index.md#local-galaxy-servers'>Local</a> </th>
    <th rowspan=2 style=" text-align: center;"> <a href='/src/Teach/ComputingPlatforms/index.md#public-galaxy-servers'>Public</a> </th>
    <th rowspan=2 style=" text-align: center;"> <a href='/src/Teach/ComputingPlatforms/index.md#cloud-based-galaxy-servers'>Shared Server</a> </th>
    <th colspan=2 style=" text-align: center;"> Personal Sever </th>
  </tr>
  <tr class="th" >
    <th style=" text-align: center;"> <a href='/src/Teach/ComputingPlatforms/index.md#personal-servers-with-cloudman'>with CloudMan</a> </th>
    <th style=" text-align: center;"> <a href='/src/Teach/ComputingPlatforms/index.md#from-the-command-line-using-an-ami'>from Command Line</a> </th>
    <th style=" text-align: center;"> <a href='/src/Teach/ComputingPlatforms/index.md#using-the-laptops-os'>In Laptop OS</a> </th>
    <th style=" text-align: center;"> <a href='/src/Teach/ComputingPlatforms/index.md#virtual-machine-images'>Using VM Image</a> </th>
  </tr>
  <tr>
    <td colspan=13 style=" border: none;"> </td>
  </tr>
  <tr>
    <th> Using Galaxy for Light analysis </th>
    <td style=" border: none;"> </td>
    <td style=" background-color: #cccccc; color: #888888; text-align: center;"> No </td>
    <td style=" text-align: center; background-color: #ffff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#local-galaxy-servers'>Maybe</a> </td>
    <td style=" text-align: center; background-color: #ffff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#public-galaxy-servers'>Maybe</a> </td>
    <td rowspan=3> </td>
    <td style=" text-align: center; background-color: #88ff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#shared-servers-on-the-cloud'>Yes</a> </td>
    <td style=" text-align: center; background-color: #88ff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#personal-servers-with-cloudman'>Yes</a> </td>
    <td style=" background-color: #cccccc; color: #888888; text-align: center;"> No </td>
    <td rowspan=3> </td>
    <td style=" background-color: #cccccc; color: #888888; text-align: center;"> No </td>
    <td style=" text-align: center; background-color: #88ff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#virtual-machine-images'>Yes</a> </td>
  </tr>
  <tr>
    <th> Using Galaxy for Heavy analysis </th>
    <td style=" border: none;"> </td>
    <td style=" background-color: #cccccc; color: #888888; text-align: center;"> No </td>
    <td style=" text-align: center; background-color: #ffff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#local-galaxy-servers'>Maybe</a> </td>
    <td style=" text-align: center; background-color: #ffff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#public-galaxy-servers'>Maybe</a> </td>
    <td style=" text-align: center; background-color: #88ff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#shared-servers-on-the-cloud'>Yes</a> </td>
    <td style=" text-align: center; background-color: #88ff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#personal-servers-with-cloudman'>Yes</a> </td>
    <td style=" background-color: #cccccc; color: #888888; text-align: center;"> No </td>
    <td style=" background-color: #cccccc; color: #888888; text-align: center;"> No </td>
    <td style=" background-color: #cccccc; color: #888888; text-align: center;"> No </td>
  </tr>
  <tr>
    <th> Installing & Administering Galaxy </th>
    <td style=" border: none;"> </td>
    <td style=" background-color: #cccccc; color: #888888; text-align: center;"> No </td>
    <td style=" background-color: #cccccc; color: #888888; text-align: center;"> No </td>
    <td style=" background-color: #cccccc; color: #888888; text-align: center;"> No </td>
    <td style=" background-color: #cccccc; color: #888888; text-align: center;"> No </td>
    <td style=" background-color: #88ff88 ; text-align: center;"> <a href='/src/Teach/ComputingPlatforms/index.md#personal-servers-with-cloudman'>Yes</a> </td>
    <td style=" background-color: #88ff88 ; text-align: center;"> <a href='/src/Teach/ComputingPlatforms/index.md#from-the-command-line-using-an-ami'>Yes</a> </td>
    <td style=" text-align: center; background-color: #ffff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#using-the-laptops-os'>Maybe</a> </td>
    <td style=" background-color: #88ff88 ; text-align: center;"> <a href='/src/Teach/ComputingPlatforms/index.md#virtual-machine-images'>Yes</a> </td>
  </tr>
</table>


## Pre-existing Servers

There are many Galaxy servers that already exist.  Some of them may be useful for your teaching needs.

### The Galaxy Project Free Public Server

<div class='right'>
<table>
  <tr>
    <th colspan=3> Appropriate for teaching </th>
  </tr>
  <tr>
    <td style=" background-color: #cccccc; color: #888888;"> Light Use </td>
    <td style=" background-color: #cccccc; color: #888888;"> Heavy Use </td>
    <td style=" background-color: #cccccc; color: #888888;"> Admin </td>
  </tr>
</table>

</div>

**Teaching with the free Galaxy Project public server ([Usegalaxy.org](http://usegalaxy.org), a.k.a. [Main](/src/Main/index.md)) is not recommended.**

[Main](/src/Main/index.md) is a seemingly obvious choice: it's free, robust, rich in tools and data, has generous quotas, and anyone can create a login.  However, it is also a very popular resource and it is impossible to predict when it will be lightly or heavily loaded.  Teaching with Main on days when it is heavily loaded is a frustrating experience for both teachers and students.  People don't learn anything if most of their time is spent sitting in a queue.

### Local Galaxy Servers

<div class='right'>
<table>
  <tr>
    <th colspan=3> Appropriate for teaching </th>
  </tr>
  <tr>
    <td style=" background-color: #ffff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#teaching-use'>Light Use</a> </td>
    <td style=" background-color: #ffff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#teaching-use'>Heavy Use</a> </td>
    <td style=" background-color: #cccccc; color: #888888;"> Admin </td>
  </tr>
</table>

</div>

If your institution has its own local Galaxy server, than this can be an ideal platform for teaching.  Local instances often have specific tools and datasets that your researchers care about, and since it is not a shared global resource, server load is much more predictable.

However, a class full of people all doing, say, assembly will stress any server and you are strongly advised to run any plans by your Galaxy admins well before hand.

### Public Galaxy Servers

<div class='right'>
<table>
  <tr>
    <th colspan=3> Appropriate for teaching </th>
  </tr>
  <tr>
    <td style=" background-color: #ffff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#teaching-use'>Light Use</a> </td>
    <td style=" background-color: #ffff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#teaching-use'>Heavy Use</a> </td>
    <td style=" background-color: #cccccc; color: #888888;"> Admin </td>
  </tr>
</table>

</div>

There are also [publicly accessible Galaxy servers](/src/PublicGalaxyServers/index.md) that may be appropriate for training purposes.  Many of these have specialized and domain-specific tools that you need, and many of them will not be as heavily and unpredictably used as as [Main](/src/Main/index.md).

You are encourage to [take a look at the list of servers](/src/PublicGalaxyServers/index.md) to see if one or more matches your needs.  However, these are also shared public resources.  If you want to use one for training, be sure to contact the server's support people well before you plan on using it.


## Cloud Based Galaxy Servers

This option describes Galaxy servers that are created for teaching purposes.

<div class='indent'>
*Why even bother to say that?  Some [public](/src/Teach/ComputingPlatforms/index.md#public-galaxy-servers) and [local](/src/Teach/ComputingPlatforms/index.md#local-galaxy-servers) Galaxy servers are in fact cloud-based. However, instructors don't set those up.  Thus, this separate section talks about cloud-based Galaxy servers that you set up.*

</div>

<div class='right'><a href='/src/CloudMan/index.md'><img src="/src/images/Logos/CloudManWideBlackLogo.png" alt="CloudMan" width="150" /></a></div>

[CloudMan](/src/CloudMan/index.md) software abstracts much of the details of different [Cloud](/src/Cloud/index.md) infrastructures and provides a uniform graphical interface for managing cloud-based servers.  

### A Word on AWS

<div class='right'><a href='http://aws.amazon.com/grants/'><img src="/src/images/Logos/AWSLogo.png" alt="Amazon Web Services in Education Grants Program" /></a></div>

The Galaxy project uses [Amazon Web Services (AWS)](http://aws.amazon.com) based servers in its workshops. CloudMan makes it easy to set these up.  The Galaxy Project has an [AWS in Education grant](http://aws.amazon.com/grants/) that supports this work.

If you are considering using a cloud-based platform, then you are encouraged to seriously consider applying for the [AWS in Education Grants Program](http://aws.amazon.com/grants/).  The application process is succinct and quick.  The grant text is limited to 4000 characters. It always helps to have an estimate for the funding included with the proposal (this [calculator can be useful](http://aws.amazon.com/tco-calculator/)).  It is also helpful to have a very detailed proposal: the uniqueness of the work, how Amazon Web Services will be used, and the ability to disseminate the work publicly via papers, events, or public relations.

### Shared Servers on the Cloud

<div class='right'>
<table>
  <tr>
    <th colspan=3> Appropriate for teaching </th>
  </tr>
  <tr>
    <td style=" background-color: #88ff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#teaching-use'>Light Use</a> </td>
    <td style=" background-color: #88ff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#teaching-use'>Heavy Use</a> </td>
    <td style=" background-color: #cccccc; color: #888888;"> Admin </td>
  </tr>
</table>

</div>

Starting in early 2012, **any *[using Galaxy workshops](/src/Teach/ComputingPlatforms/index.md#teaching-use)* presented by the Galaxy Project, now use cloud-based and [CloudMan](/src/CloudMan/index.md)-managed shared Galaxy servers.**  These servers are set up before a workshop; participants create accounts and use the servers during the workshop, and then the servers are shut down after the workshops.

If you are *[teaching use](/src/Teach/ComputingPlatforms/index.md#teaching-use)*, then [large, shared](/src/Teach/ComputingPlatforms/index.md#shared) cloud-based servers work well. You (the instructor) set them up, and the participants don't even need to know they are using cloud-based servers.

If you do use AWS-based and CloudMan-managed servers for your training, the Galaxy Project also provides a [Galaxy Workshop AMI](/src/Teach/WorkshopAMI/index.md) that comes preloaded with several examples that are used in project-run workshops.

### Personal Servers with CloudMan

<div class='right'>
<table>
  <tr>
    <th colspan=3> Appropriate for teaching </th>
  </tr>
  <tr>
    <td style=" background-color: #88ff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#teaching-use'>Light Use</a> </td>
    <td style=" background-color: #88ff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#teaching-use'>Heavy Use</a> </td>
    <td style=" background-color: #88ff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#teaching-admin'>Admin</a> </td>
  </tr>
</table>

</div>

Participants can set up their own CloudMan-based Galaxy server.  This can be done either as a way to learn [how to use Galaxy](/src/Teach/ComputingPlatforms/index.md#teaching-use), or as one way to [learn how to install and administer Galaxy](/src/Teach/ComputingPlatforms/index.md#teaching-admin).

### From the Command Line, using an AMI

<div class='right'>
<table>
  <tr>
    <th colspan=3> Appropriate for teaching </th>
  </tr>
  <tr>
    <td style=" background-color: #cccccc; color: #888888;"> Light Use </td>
    <td style=" background-color: #cccccc; color: #888888;"> Heavy Use </td>
    <td style=" background-color: #88ff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#teaching-admin'>Admin</a> </td>
  </tr>
</table>

</div>

*Amazon Machine Images (AMIs)* are a type of virtual machine image (see below) that runs on the Amazon Web Services infrastructure.  Using an AMI to [teach Galaxy installation and management](/src/Teach/ComputingPlatforms/index.md#teaching-admin) is a great option, and you can determine how much has already been done on the image, from a bare-bones Linux install to an image with the Galaxy source already cloned from GitHub.

## Laptop-Based Galaxy Servers

Another option is to have students install and run their own Galaxy servers on their laptops.  Galaxy is relatively easy to install and it, and many basic tools, can be run on moderately powered laptops.  However, certain high-end CPU or memory intensive analyses will just not run on a laptop.  Therefore, if you are considering this option, you'll need to determine minimum compute requirements for your students.

### Using the Laptop's OS

<div class='right'>
<table>
  <tr>
    <th colspan=3> Appropriate for teaching </th>
  </tr>
  <tr>
    <td style=" background-color: #cccccc; color: #888888;"> Light Use </td>
    <td style=" background-color: #cccccc; color: #888888;"> Heavy Use </td>
    <td style=" background-color: #ffff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#teaching-admin'>Admin</a> </td>
  </tr>
</table>

</div>

If the laptop uses MacOS or Linux as it's operating system then it is possible to install Galaxy directly on the laptop.  This approach is somewhat fraught with peril, however, as everyone's laptop will have a slightly different configuration and slightly different libraries and packages already installed. 

### Virtual Machine Images

<div class='right'>
<table>
  <tr>
    <th colspan=3> Appropriate for teaching </th>
  </tr>
  <tr>
    <td style=" background-color: #88ff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#teaching-use'>Light Use</a> </td>
    <td style=" background-color: #cccccc; color: #888888;"> Heavy Use </td>
    <td style=" background-color: #88ff88;"> <a href='/src/Teach/ComputingPlatforms/index.md#teaching-admin'>Admin</a> </td>
  </tr>
</table>

</div>

You can also create *virtual machine images* that participants can download and run on their laptops, using a virtual machine image player such as [VirtualBox](http://virtualbox.org).  In this case you can pre-install any needed tools and datasets.  The students will still be running analysis on their laptops, and therefore nothing too CPU or memory intensive can be run.  This approach was used at the [GCC2012](/src/events/GCC2012/TrainingDay/index.md) and [GCC2013](/src/events/GCC2013/TrainingDay/index.md) Training Day sessions where participants learned how to manage their own servers.
