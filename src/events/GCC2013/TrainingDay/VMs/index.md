---
title: GCC2013 Training Day Virtual Machines
---
PLACEHOLDER_INCLUDE(/Events/GCC2013/Header)



PLACEHOLDER_INCLUDE(/Events/GCC2013/LinkBox)

<div class='left'><a href='../'><img src='/Images/Logos/GCC2013TrainingDayLogo300.png' alt='Training Day' width="200" /></a></div>

(*Already know about virtual machines?  Then skip the intro and go straight to [What do I ABSOLUTELY need to do before I arrive?](#what-do-i-absolutely-need-to-do-before-i-arrive)*)

Many of the [ Galaxy Deployment and Development Workshops](/src/events/GCC2013/TrainingDay/index.md#galaxy-deployment-and-development-workshops) use *virtual machine images* created specifically for Training Day.

A virtual machine, or VM, enables you to run a another operating system on your computer, from within your existing operating system. For these workshops we will use VM images that are fully configured Linux instance on participants' laptops. This will allow you to switch between your native/host operating system (Windows, Mac OS, Linux) and the guest Galaxy Linux operating system, without having to shut either down.

Using a virtual machine ensures that you will be running with the same configuration as the instructor. It also relieves you from having to setup your instance and installing prerequisites. With the Galaxy provided VMs you will also receive support from the instructors and your fellow attendees. It is possible to use your own system during the workshops, but if you do, you won't be able to get support from the instructors or fellow attendees when you hit a bump.

# VirtualBox and VMware Player

To run the provided virtual machines, you will need to get a *player*.  The Training Day VMs can be run with either the open source [VirtualBox](https://www.virtualbox.org/wiki/Downloads) software, or with VMware's VMware Player.  (VMware Player is not open source, but it is fee for Windows and Linux.)

The instructions below describe how to install and use [VirtualBox](https://www.virtualbox.org/wiki/Downloads).  (The instructions for VMware Player are not provided here, but the concepts are identical.)

# What do I ABSOLUTELY need to do before I arrive?

You will need to do two things before Training Day starts. These steps take some time, and require downloading large files, so please do not postpone this until you arrive. Downloading files of this size at the conference would be painfully slow, and would adversely affect your fellow participants.  You also don't want to do this from a hotel.

So, **please do these steps before you arrive.**

<div class='right'><a href='https://www.virtualbox.org/wiki/Downloads'><img src='/Images/Logos/VirtualBox180.png' alt='Virtual Machine Images' width="120" /></a></div>

## 1. Install VirtualBox on your laptop

**[George Magklaras](http://folk.uio.no/georgios) has created two videos on how to install !VirtualBox on Linux and Windows.**  These videos also describe how to start a VM as well (using the [Installing and Maintaining a Local Galaxy Server|Installing and Maintaining a Local Galaxy Server](/src/events/GCC2013/TrainingDay/index.md) image, but the principle is the same for the other image as well).

* [Install VirtualBox on Linux](http://youtu.be/jnarp-j12lw)
* [Install VirtualBox on Windows](http://youtu.be/7jOnscRjaFs)

You can also directly download and install the appropriate package from [VirtualBox.org](https://www.virtualbox.org/wiki/Downloads).  There are packages available for Linux, Windows, and Macintosh.

## 2. Download needed VM(s) on your laptop

There are two VMs to pick from.  

| Topic |  Download  |  Description  | 
| ----- | --------- | ------------ | 
| [Installing and Maintaining a Local Galaxy Server|Installing and Maintaining a Local Galaxy Server](/src/events/GCC2013/TrainingDay/index.md) |  [Norway](ftp://ftp.no.embnet.org/galaxy/images/BasicWorkshop.ova), [US](http://depot.galaxyproject.org/BasicWorkshop.ova) ([Checksum](ftp://ftp.no.embnet.org/galaxy/images/BasicWorkshop-sha256sum.txt))  |  Has the Galaxy source code distribution, and Galaxy prerequisites, but Galaxy is not installed or running.  | 
| [Introduction to Tool and Data Source Configuration](/src/events/GCC2013/TrainingDay/index.md#introduction-to-tool-and-data-source-configuration) |  [Norway](ftp://ftp.no.embnet.org/galaxy/images/GCC2013-AdvWorkshops.ova), [US](http://depot.galaxyproject.org/GCC2013-AdvWorkshops.ova) ([Checksum](ftp://ftp.no.embnet.org/galaxy/images/GCC2013-AdvWorkshops-sha256sum.txt))  |  Has Galaxy source code distribution and Galaxy prerequisites, and running Galaxy and Galaxy Tool Shed instances.  | 
| [Advanced Tool and Data Source Configuration](/src/events/GCC2013/TrainingDay/index.md#advanced-tool-and-data-source-configuration) | 
| [Galaxy Tool Shed](/src/events/GCC2013/TrainingDay/index.md#galaxy-tool-shed) | 
| [The Galaxy API](/src/events/GCC2013/TrainingDay/index.md#the-galaxy-api) | 

## 3. Import the VM into VirtualBox

1. First, make a backup copy of the downloaded `.ova` file(s). If something goes wrong you can always make a new copy.
1. Import the VM image into !VirtualBox by either starting the downloaded `.ova` file directly, or by launching !VirtualBox and navigating to **File &rarr; Import Appliance** and opening the file.
1. This will display the **Appliance Import Settings** window. *Click* the **Import** button.
1. 4. It may then take several minutes for !VirtualBox to import the VM. Once it is done, a new VM will appear in the left pane in the 'powered off' state.

The VM is now installed.


PLACEHOLDER_INCLUDE(/Events/GCC2013/Footer)
