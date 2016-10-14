---
autotoc: true
title: Virtual Appliances
---
<span style="font-size: larger;"> Hey!  This page is under construction! </span>



<div class='right'></div>

One of the [many ways that Galaxy is available](/BigPicture/Choices) is in *virtual appliances* that already have Galaxy installed and configured on them - these may take the form of *cloud images*, more traditional *virtual machine images*, or *docker containers*.  Running a pre-configured Galaxy virtual appliance saves on installation and configuration work, and enables you to get up and running with Galaxy very quickly.

These virtual appliances are frequently used for training, or as tool demonstration and data publishing platforms.  However, they not limited to teaching, tool demonstration, and data publishing.  Production scale/quality Galaxy servers are also deployed using them.

# Galaxy Virtual Appliance Platforms

## Cloud Images

*Cloud images* are virtual appliances that run on [cloud infrastructures](/Cloud).  

<div class='right'><a href='http://aws.amazon.com/'><img src='/Images/Logos/AWSLogo400.png' alt='Amazon Web Services' width="200" /></a></div>

[Amazon Web Services](http://aws.amozon.com)-based [Galaxy CloudMan instances](/CloudMan) use an *Amazon Machine Image (AMI)* (a type of VM specific to AWS) when creating Galaxy servers. Some appliances are available via AMIs.  Using Galaxy via AMIs will leverage Amazon's hardware resources and can potentially scale quite well. 

<div class='left'><a href='https://www.virtualbox.org/wiki/Downloads'><img src='/Images/Logos/VirtualBox180.png' alt='Virtual Machine Images' width="100" /></a></div>

## Virtual Machine Images 

Some virtual appliances are packaged for [VirtualBox](http://virtualbox.org) - a free virtualization platform available for many operating systems including Windows and Mac OS X. Some may also be used within the [VMware](http://vmware.com/) ecosystem - which has a variety of free and commercial virtualizaiton products.

<div class='right'><br /><br /><a href='http://wiki.galaxyproject.org/Admin/Tools/Docker'><img src='/Images/Logos/DockerInGalaxyAnnotated.png' alt='Docker' width=180 /></a></div>

## Docker Containers 

[Docker](https://www.docker.com/whatisdocker/) is a potentially more light-weight alternative to virtualization. Docker-based appliances are available as runnable containers registered in [Docker Hub](https://hub.docker.com/), but also as open source [Dockerfiles](https://docs.docker.com/reference/builder/) which serve as a reference for exactly how to build the container and allow one to rebuild the container from scratch and potentially with customizations. Docker is available on newer Linux distributions and on Windows and Mac OS X using [Boot2Docker](http://boot2docker.io/)

# Galaxy Virtual Appliance Directory

This lists all known available Galaxy virtual appliances.  The goal is to make it easy for the Galaxy community to find and deploy them, thus benefiting from the (generous!) work of others.

PLACEHOLDER_DICT_COLUMNS(pagename=VA, names="Appliance, Technology, Domains, Description, Owners, Date Created/Updated", sort="Date Created/Updated", title="Hide", hide="Hide")


# Add a Virtual Appliance

Have you created or know of a virtual appliance that could be useful to the Galaxy community?  Then please share it!  This will help others and also help get the word out about the resource.

There are two ways to add a virtual appliance to this directory.

## Submit an Online Form

If the wiki option seems a little daunting, **you can also describe this resource in [this form](http://bit.ly/gxyvaform)**.  Once the form has been submitted, the information will be reviewed and a virtual appliance page will be created within a week.  You will be notified via email when the page is created.

<table>
  <tr>
    <th> &nbsp;&nbsp; <a href='http://bit.ly/gxyvaform'>Submit a virtual appliance using the form</a> &nbsp;&nbsp; </th>
  </tr>
</table>


## Use the Wiki

To add a virtual appliance to this directory, create a wiki page describing the appliance:

1. [Login|&action=login](/VirtualAppliances) to the wiki. If you don't have an account, you'll need to [create one|&action=newaccount](/Community/Deployments).
1. Pick a good descriptive, !CamelCase name for the appliance.  This will become part of the URL for the page describing the appliance.  *Avoid embedded spaces as they make lousy URLs.*
1. Type the !CamelCase name in box below and hit the "Create" button.
    . PLACEHOLDER_NEW_PAGE(VirtualAppliances/VATemplate, "Create a virtual appliance description page", VA)
1. A template for the new page will appear.  Replace the template text with details about the appliance.
1. Save, review, and edit the page until you are happy with it.
1. Return to this page, and review how the resource appears in this listing.
