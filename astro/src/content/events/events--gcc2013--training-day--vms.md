---
title: GCC2013 Training Day Virtual Machines
slug: events/gcc2013/training-day/vms
---
## Table of contents

* [VirtualBox and VMware Player](#virtualbox-and-vmware-player)
* [What do I ABSOLUTELY need to do before I arrive?](#what-do-i-absolutely-need-to-do-before-i-arrive)
  * [1. Install VirtualBox on your laptop](#1-install-virtualbox-on-your-laptop)
  * [2. Download needed VM(s) on your laptop](#2-download-needed-vms-on-your-laptop)
  * [3. Import the VM into VirtualBox](#3-import-the-vm-into-virtualbox)

# VirtualBox and VMware Player

To run the provided virtual machines, you will need to get a *player*.  The Training Day VMs can be run with either the open source [VirtualBox](https://www.virtualbox.org/wiki/Downloads) software, or with VMware's VMware Player.  (VMware Player is not open source, but it is fee for Windows and Linux.)

The instructions below describe how to install and use [VirtualBox](https://www.virtualbox.org/wiki/Downloads).  (The instructions for VMware Player are not provided here, but the concepts are identical.)

# What do I ABSOLUTELY need to do before I arrive?

You will need to do two things before Training Day starts. These steps take some time, and require downloading large files, so please do not postpone this until you arrive. Downloading files of this size at the conference would be painfully slow, and would adversely affect your fellow participants.  You also don't want to do this from a hotel.

So, **please do these steps before you arrive.**

<div class='right'><a href='https://www.virtualbox.org/wiki/Downloads'><img src="/images/logos/VirtualBox180.png" alt="Virtual Machine Images" width="120" /></a></div>

## 1. Install VirtualBox on your laptop

**[George Magklaras](http://folk.uio.no/georgios) has created two videos on how to install VirtualBox on Linux and Windows.**  These videos also describe how to start a VM as well (using the [Installing and Maintaining a Local Galaxy Server](/events/gcc2013/training-day/vms/) image, but the principle is the same for the other image as well).

* [Install VirtualBox on Linux](http://youtu.be/jnarp-j12lw)
* [Install VirtualBox on Windows](http://youtu.be/7jOnscRjaFs)

You can also directly download and install the appropriate package from [VirtualBox.org](https://www.virtualbox.org/wiki/Downloads).  There are packages available for Linux, Windows, and Macintosh.

## 2. Download needed VM(s) on your laptop

There are two VMs to pick from.

| Topic |  Download  |  Description  |
| ----- | --------- | ------------ |
| [Installing and Maintaining a Local Galaxy Server](/events/gcc2013/training-day/vms/) |  [Norway](ftp://ftp.no.embnet.org/galaxy/images/BasicWorkshop.ova), [US](http://depot.galaxyproject.org/BasicWorkshop.ova) ([Checksum](ftp://ftp.no.embnet.org/galaxy/images/BasicWorkshop-sha256sum.txt))  |  Has the Galaxy source code distribution, and Galaxy prerequisites, but Galaxy is not installed or running.  |
| [Introduction to Tool and Data Source Configuration](/events/gcc2013/training-day/vms/#introduction-to-tool-and-data-source-configuration) |  [Norway](ftp://ftp.no.embnet.org/galaxy/images/GCC2013-AdvWorkshops.ova), [US](http://depot.galaxyproject.org/GCC2013-AdvWorkshops.ova) ([Checksum](ftp://ftp.no.embnet.org/galaxy/images/GCC2013-AdvWorkshops-sha256sum.txt))  |  Has Galaxy source code distribution and Galaxy prerequisites, and running Galaxy and Galaxy Tool Shed instances.  |
| [Advanced Tool and Data Source Configuration](/events/gcc2013/training-day/vms/#advanced-tool-and-data-source-configuration) |
| [Galaxy Tool Shed](/events/gcc2013/training-day/vms/#galaxy-toolshed) |
| [The Galaxy API](/events/gcc2013/training-day/vms/#the-galaxy-api) |

## 3. Import the VM into VirtualBox

1. First, make a backup copy of the downloaded `.ova` file(s). If something goes wrong you can always make a new copy.
2. Import the VM image into VirtualBox by either starting the downloaded `.ova` file directly, or by launching VirtualBox and navigating to **File → Import Appliance** and opening the file.
3. This will display the **Appliance Import Settings** window. *Click* the **Import** button.
4. 4. It may then take several minutes for VirtualBox to import the VM. Once it is done, a new VM will appear in the left pane in the 'powered off' state.

The VM is now installed.

<slot name="/events/gcc2013/footer" />
