INCLUDE(/Events/GCC2014/Header)
<br /><br />

<div class="title">Training Day Virtual Machine Images</div>

INCLUDE(/Events/GCC2014/LinkBox)

<div class='left'><a href='/Events/GCC2014/TrainingDay/'><img src='/Images/Logos/GCC2014TDLogoSmall.png' alt='GCC2014 Training Day'  /></a></div>

(*Already know about virtual machines?  Then skip the intro and go straight to [What do I ABSOLUTELY need to do before I arrive?](#what-do-i-absolutely-need-to-do-before-i-arrive)*)

Many of the [ Galaxy Deployment and Development Workshops](..//#galaxy-deployment-and-development-workshops) use *virtual machine images* created specifically for Training Day.

A virtual machine, or VM, enables you to run a another operating system on your computer, from within your existing operating system. For these workshops we will use VM images that are fully configured Linux instance on participants' laptops. This will allow you to switch between your native/host operating system (Windows, Mac OS, Linux) and the guest Linux operating system (where Galaxy is running), without having to shut either down.

Using a virtual machine ensures that you will be running with the same configuration as the instructor. It also relieves you from having to setup your instance and installing prerequisites. With the Galaxy provided VMs you will receive support from the instructors and your fellow participants.

# VirtualBox

To run the provided virtual machines, you will need to get a *player*.  The Training Day VMs can be run (and have been tested with) the open source [VirtualBox](https://www.virtualbox.org/wiki/Downloads) software.

The instructions below describe how to install and use [VirtualBox](https://www.virtualbox.org/wiki/Downloads).

# What do I ABSOLUTELY need to do before I arrive?

You will need to do two things before Training Day starts. **These steps take some time, and require downloading large files, so please do not postpone this until you arrive.** Downloading files of this size at the conference would be painfully slow, and would adversely affect your fellow participants.  You also don't want to do this from a hotel.

So, **please do these steps before you arrive.**

<div class='right'><a href='https://www.virtualbox.org/wiki/Downloads'><img src='/Images/Logos/VirtualBox180.png' alt='Virtual Machine Images' width="120" /></a></div>

## 1. Install VirtualBox on your laptop

Download and install the appropriate package from [VirtualBox.org](https://www.virtualbox.org/wiki/Downloads).  There are packages available for Linux, Windows, and Macintosh.

## 2. Download needed VM(s) on your laptop

The VM(s) to download depend on the workshops you are attending:

| Topic |  Links  |  Description  | 
| ----- | ------ | ------------ | 
| [Galaxy on a Cluster - User and Project Management](..//#galaxy-on-a-cluster---user-and-project-management) |  [Instructions](http://www.usit.uio.no/om/organisasjon/uav/itf/intern-doc/galaxy/virtualbox-installation.html) <br /> [Download VM (from Oslo)](http://folk.uio.no/nikolaiv/GCC2014-Users-Projects.ova)  |  Customized Galaxy instance for this workshop.<div class='indent'>User: baltimore2014<br />Password: !UsersProjects2014</div>  | 
| [Galaxy Installation and Administration](..//#galaxy-installation-and-administration) |  [Download VM (from PA)](http://depot.galaxyproject.org/GCC2014.ova)  |  Has Galaxy source code distribution and Galaxy prerequisites, and running Galaxy and Galaxy Tool Shed instances.<div class='indent'>User: galaxy<br />Password: galaxy  | 
| [Galaxy Automation: Using the API](..//#galaxy-automation-using-the-api) | 
| [Tool Development from bright idea to ToolShed - designing a Galaxy Tool](..//#tool-development-from-bright-idea-to-toolshed---designing-a-galaxy-tool) | 
| [Tool Development from bright idea to ToolShed - Data Managers](..//#tool-development-from-bright-idea-to-toolshed---data-managers) | 

## 3. Import the VM into VirtualBox

1. First, make a backup copy of the downloaded `.ova` file(s). If something goes wrong you can always make a new copy.
1. Import the VM image into !VirtualBox by either starting the downloaded `.ova` file directly, or by launching !VirtualBox and navigating to **File &rarr; Import Appliance** and opening the file.
1. This will display the **Appliance Import Settings** window. *Click* the **Import** button.
1. 4. It may then take several minutes for !VirtualBox to import the VM. Once it is done, a new VM will appear in the left pane in the 'powered off' state.

The VM is now installed.


INCLUDE(/Events/GCC2014/Footer)
