---
title: Training Day Virtual Machine Images
slug: events/gcc2014/training-day/vms
---
## Table of contents

* [VirtualBox](#virtualbox)
* [What do I ABSOLUTELY need to do before I arrive?](#what-do-i-absolutely-need-to-do-before-i-arrive)
  * [1. Install VirtualBox on your laptop](#1-install-virtualbox-on-your-laptop)
  * [2. Download needed VM(s) on your laptop](#2-download-needed-vms-on-your-laptop)
  * [3. Import the VM into VirtualBox](#3-import-the-vm-into-virtualbox)

# VirtualBox

To run the provided virtual machines, you will need to get a *player*.  The Training Day VMs can be run (and have been tested with) the open source [VirtualBox](https://www.virtualbox.org/wiki/Downloads) software.

The instructions below describe how to install and use [VirtualBox](https://www.virtualbox.org/wiki/Downloads).

# What do I ABSOLUTELY need to do before I arrive?

You will need to do two things before Training Day starts. **These steps take some time, and require downloading large files, so please do not postpone this until you arrive.** Downloading files of this size at the conference would be painfully slow, and would adversely affect your fellow participants.  You also don't want to do this from a hotel.

So, **please do these steps before you arrive.**

<div class='right'><a href='https://www.virtualbox.org/wiki/Downloads'><img src="/images/logos/VirtualBox180.png" alt="Virtual Machine Images" width="120" /></a></div>

## 1. Install VirtualBox on your laptop

Download and install the appropriate package from [VirtualBox.org](https://www.virtualbox.org/wiki/Downloads).  There are packages available for Linux, Windows, and Macintosh.

## 2. Download needed VM(s) on your laptop

The VM(s) to download depend on the workshops you are attending:

| Topic |  Links  |  Description  |
| ----- | ------ | ------------ |
| [Galaxy on a Cluster - User and Project Management](/events/gcc2014/training-day/#galaxy-on-a-cluster-user-and-project-management) |  [Instructions](http://www.usit.uio.no/om/organisasjon/uav/itf/intern-doc/galaxy/virtualbox-installation.html) <br /> [Download VM (from Oslo)](http://folk.uio.no/nikolaiv/GCC2014-Users-Projects.ova)  |  Customized Galaxy instance for this workshop.<div class='indent'>User: baltimore2014<br />Password: UsersProjects2014</div>  |
| [Galaxy Installation and Administration](/events/gcc2014/training-day/#galaxy-installation-and-administration) |  [Download VM (from PA)](http://depot.galaxyproject.org/GCC2014.ova)  |  Has Galaxy source code distribution and Galaxy prerequisites, and running Galaxy and Galaxy Tool Shed instances.<div class='indent'>User: galaxy<br />Password: galaxy</div>  |
| [Galaxy Automation: Using the API](/events/gcc2014/training-day/#galaxy-automation-using-the-api) |
| [Tool Development from bright idea to ToolShed - designing a Galaxy Tool](/events/gcc2014/training-day/#tool-development-from-bright-idea-to-toolshed-designing-a-galaxy-tool) |
| [Tool Development from bright idea to ToolShed - Data Managers](/events/gcc2014/training-day/data-managers/) |

## 3. Import the VM into VirtualBox

1. First, make a backup copy of the downloaded `.ova` file(s). If something goes wrong you can always make a new copy.
2. Import the VM image into VirtualBox by either starting the downloaded `.ova` file directly, or by launching VirtualBox and navigating to **File → Import Appliance** and opening the file.
3. This will display the **Appliance Import Settings** window. *Click* the **Import** button.
4. 4. It may then take several minutes for VirtualBox to import the VM. Once it is done, a new VM will appear in the left pane in the 'powered off' state.

The VM is now installed.

<slot name="/events/gcc2014/footer" />
