---
autotoc: true
---
<div class='right'><a href='/src/Events/GCC2012/TrainingDay/VMs//index.md'><img src="/src/Events/GCC2012/GCC2012TrainingDayLogo.png" alt="Training Day" /></a></div>

If you are planning on attending any of these [GCC2012](/src/Events/GCC2012/index.md) [Training Day](/src/Events/GCC2012/TrainingDay/index.md) workshops, then you will need shell admin access to a system with Galaxy and/or a Galaxy Tool Shed already installed and running.

* [WS1: Integrating Tools & Data Sources](/src/Events/GCC2012/TrainingDay/VMs//index.md#ws1)
* [WS6: Galaxy API](/src/Events/GCC2012/TrainingDay/VMs//index.md#ws6)
* [WS7: Galaxy Tool Shed](/src/Events/GCC2012/TrainingDay/VMs//index.md#ws7)

<div class='right'></div>

If you are attending this workshop

* [WS5: Installing Your Own Galaxy](/src/Events/GCC2012/TrainingDay/VMs//index.md#ws5)

you will need shell admin access to a system that has Galaxy's prerequisites installed, but not Galaxy itself.

# Training Day Virtual Machines

**We strongly recommend using a Galaxy provided *virtual machine* for the hands-on parts of the workshops.**  

A virtual machine, or VM, enables you to run a different operating system on your computer, *from within your existing operating system.*  For these workshops we will use VM images to run a fully configured Linux instance on participants' laptops.  This will allow you to switch between your native/host operating system (Windows, Mac OS, Linux) and the guest Galaxy Linux operating system, without having to shut either down.

Using a virtual machine ensures that you will be running with the same configuration as the instructor.  It also relieves you from having to setup your instance and installing prerequisites.  With the Galaxy provided VMs you will also receive support from the instructors and you fellow attendees.  It is possible to use your own system during the workshops, but if you do, you won't be able to get support from the instructors or fellow attendees when you hit a bump.


# What Do I Need to Do?

You will need to do two things before [Training Day](/src/Events/GCC2012/TrainingDay/VMs//index.md) starts.  These steps take some time, and require downloading large files, so please do not postpone this until you arrive.  Downloading files of this size at the [UIC Forum](/src/Events/GCC2012/Logistics/index.md) would be painfully slow, and would adversely affect your fellow students.

So, **please do these steps before you arrive**.

<div class='right'><a href='https://www.virtualbox.org/wiki/Downloads'><img src="/src/Images/Logos/VirtualBox180.png" alt="Virtual Machine Images" width="120" /></a></div>

## 1. Install VirtualBox on your laptop

Download and install the appropriate package from this link:
https://www.virtualbox.org/wiki/Downloads

## 2. Install needed VM(s) on your laptop

These VMs will be available for download in the days just before the conference.  You will want to download them *before* arriving at the meeting, because they are very large files and will take too much time to download over the conference network.



### VM Without a Running Galaxy

This VM is for:

* [WS5: Installing Your Own Galaxy](/src/Events/GCC2012/TrainingDay/VMs//index.md#ws5)

This image will have all prerequisites for Galaxy, but not a running Galaxy instance.

* [Download OVA file](http://galaxy.psu.edu/gcc2012vm/gcc2012-ws5.ova) (1.5GB)

### VM With a Running Galaxy

This VM image is for these workshops

* [WS1: Integrating Tools & Data Sources](/src/Events/GCC2012/TrainingDay/VMs//index.md#ws1)
* [WS6: Galaxy API](/src/Events/GCC2012/TrainingDay/VMs//index.md#ws6)
* [WS7: Galaxy Tool Shed](/src/Events/GCC2012/TrainingDay/VMs//index.md#ws7)

This image will have a configured and running Galaxy instance.

* [Download OVA file](http://galaxy.psu.edu/gcc2012vm/gcc2012-ws167.ova) (3.1 GB)

# How do I use the VM(s)?

<div class='right'><div class='solid'>
<table>
  <tr>
    <td style=" text-align: center; border: none;"> </strong>Screenshots<strong> </td>
  </tr>
</table>


<table>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='/src/Events/GCC2012/TrainingDay/VMs/ApplianceImport.png'><img src="/src/Events/GCC2012/TrainingDay/VMs/ApplianceImport.png" alt="Appliance Import Settings Window; click to enlarge" width="200" /></a><br />1.3. Appliance Import </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='/src/Events/GCC2012/TrainingDay/VMs/ImportedVM.png'><img src="/src/Events/GCC2012/TrainingDay/VMs/ImportedVM.png" alt="VM successfully imported; click to enlarge" width="200" /></a><br />1.4. VM Imported </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='/src/Events/GCC2012/TrainingDay/VMs/VMSettings.png'><img src="/src/Events/GCC2012/TrainingDay/VMs/VMSettings.png" alt="VM settings; click to enlarge" width="200" /></a><br />1.5.1 VM settings </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='/src/Events/GCC2012/TrainingDay/VMs/PortForwarding.png'><img src="/src/Events/GCC2012/TrainingDay/VMs/PortForwarding.png" alt="Port forwarding rules; click to enlarge" width="200" /></a><br />1.5.3 Port forwarding rules </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='/src/Events/GCC2012/TrainingDay/VMs/MouseInfo.png'><img src="/src/Events/GCC2012/TrainingDay/VMs/MouseInfo.png" alt="Mouse Pointer info window; click to enlarge" width="200" /></a><br />2.1. An info screens </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='/src/Events/GCC2012/TrainingDay/VMs/UserList.png'><img src="/src/Events/GCC2012/TrainingDay/VMs/UserList.png" alt="List of defined users; click to enlarge" width="200" /></a><br />2.2. Defined users </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='/src/Events/GCC2012/TrainingDay/VMs/XFCEDesktop.png'><img src="/src/Events/GCC2012/TrainingDay/VMs/XFCEDesktop.png" alt="The XFCE Desktop; click to enlarge" width="200" /></a><br />2.3. The XFCE Desktop </td>
  </tr>
</table>

</div></div>

This section will include directions on how to start up, access, and use these virtual machines on your laptop.

## 1. Import the VM into VirtualBox

1. First, make a backup copy of the downloaded `.ova` file(s).  If something goes wrong you can always make a new copy.
2. Import the VM image into !VirtualBox by either starting the downloaded `.ova` file directly, or by launching !VirtualBox and navigating to **File &rarr; Import Appliance** and opening the file.
3. This will display the **Appliance Import Settings** window.  *Click* the **Import** button.
4. It may then take several minutes for !VirtualBox to import the VM.  Once it is done, a new VM will appear in the left pane in the 'powered off' state.

The VM is now installed.

### 1.5. Enable Laptop Browser to Access VM

**Note: If you got your VM from a thumb drive at the workshop, then this step has already been done.  You only need to do this if you downloaded the VM from the internet.**

We need to enable port forwarding so that the the host (your laptop's native operating system) can access Galaxy and  Toolshed servers running on the VM as follows.

1. *Select* it so it's highlighted then select **Settings**.
2. *Select* **Network &rarr; Adapter 1 &rarr; Advanced &rarr Port Forwarding**.  
3. Add these 4 rules:<div class='indent'>


| Name |  Protocol  |  Host IP  |  Host Port  |  Guest IP  |  Guest Port  | 
| ---- | --------- | -------- | ---------- | --------- | ----------- | 
| Rule 1 |  TCP  |  127.0.0.1  |  8080  |   |  8080  | 
| Rule 2 |  UDP  |  127.0.0.1  |  8080  |   |  8080  | 
| Rule 3 |  TCP  |  127.0.0.1  |  9090  |   |  9090  | 
| Rule 4 |  UDP  |  127.0.0.1  |  9090  |   |  9090  | 
</div>
  This is less tedious if you type in the first rule and then copy and modify it for the next 3


## 2. Start VM and Get Its IP Address

The IP address can used to access the VM from tools on the host (your laptop)

1. *Double-click* on the new VM in the left panel of !VirtualBox.  This starts the VM and displays two informational messages about regaining control of your keyboard and mouse from the VM.  *Click* **OK** for both.
2. A screen showing the defined users on this machine is shown.  *Click* on the **trainingday** user and then *enter* the password listed below.
3. This will log you in and show the XFCE desktop.
4. Click on the terminal icon at the bottom center of the GUI.
5. *sudo ifconfig* and note the ip address assigned to eth0 - that's where you will be able to connect a browser running on the local machine (host) to servers running on the VM (guest).

## 3. To start a Galaxy and a local Toolshed (Workshop 1)

1. Open a terminal.
2. *cd galaxy-central*.
3. *sh startAll.sh*.

From the host machine, point your browser at ([VM-ip] = the eth0 ip address you found above)
 *http://[VM-ip]:8080*

and a local toolshed at
 *http://[VM-ip]:9090*

Use *sh stopAll.sh* then *sh startAll.sh* to restart these servers if you make changes that require a Galaxy restart.
 
## 4. Using XFCE

XFCE is a desktop manager for Linux.  Unlike the more common Gnome and KDE managers, XFCE is relatively lightweight and has the advantages of keeping the VM image size small, and having a somewhat familiar look and feel.

... more to come.

## Usernames and Passwords

<table>
  <tr class="th" >
    <th rowspan=2> </th>
    <th rowspan=2> Username </th>
    <th rowspan=2> Password </th>
    <th colspan=2> Defined On VM </th>
    <th rowspan=2> Comments </th>
  </tr>
  <tr class="th" >
    <th> WS5 </th>
    <th> WS1/6/7 </th>
  </tr>
  <tr>
    <th> shell </th>
    <td> trainingday </td>
    <td> 12345 </td>
    <td> Y </td>
    <td> Y </td>
    <td> Has full <code>sudo</code> capability </td>
  </tr>
  <tr>
    <th> Galaxy UI Admin </th>
    <td> test@bx.psu.edu </td>
    <td> testuser </td>
    <td> N </td>
    <td> Y </td>
    <td> Logging in to your Galaxy server with this username will give you admin privileges in the Galaxy User Interface. </td>
  </tr>
  <tr>
    <th> Postgres Galaxy Login </th>
    <td> </td>
    <td> </td>
    <td> N </td>
    <td> Y </td>
    <td> These are the credentials Galaxy uses to connect to Postgres.  They are stored in the <span class="codespan">universe.wsgi}} file. </td>
  </tr>
  <tr>
    <th> Tool Shed UI Admin </th>
    <td> test@bx.psu.edu </td>
    <td> testuser </td>
    <td> Y </td>
    <td> Y </td>
    <td> Both instances come with a preinstalled Tool Shed </td>
  </tr>
</table>


# Technical Details

Which distribution was used; how much virtual disk and memory does it have; what software was installed on top of the distribution, and so on.

<table>
  <tr>
    <th> Distribution </th>
    <td> Ubuntu 12.04, 32 bit, ... </td>
  </tr>
  <tr>
    <th> GUI </th>
    <td> <a href='http://www.xfce.org/'>Xfce</a> </td>
  </tr>
  <tr>
    <th> Memory </th>
    <td> 2GB </td>
  </tr>
  <tr>
    <th> Disk </th>
    <td> 10GB </td>
  </tr>
</table>


## Additional Software Installed

### Both VMs

Any custom configuration is [described below](/src/Events/GCC2012/TrainingDay/VMs/index.md#additional-configuration-details).


| Tool/Package |  Comments  | 
| ------------ | --------- | 
| PostgreSQL |  Used by Galaxy, Tool Shed  | 
| Mercurial |  Source code control system used in Galaxy  | 
| Emacs, vim, pico/nano |  Text editors.  | 
| Galaxy Source Code |   | 
| Galaxy Tool Shed |   | 
| ncurses development library |  Needed for Tool Shed  | 
| zlib development library | 
| g++ and standard C and C++ development libraries | 
| cmake | 
| git  | 
| Python 2.6 | 
| Eclipse |  Needed for Tools and Data Sources Workshop  | 
| hg and Python Eclipse plugins | 
| nginx or Apache |  proxy that accepts byte-range requests would be good  | 
| [PostgreSQL GUI](http://wiki.postgresql.org/wiki/Community_Guide_to_PostgreSQL_GUI_Tools#Open_Source_.2F_Free_Software) |   | 

### WS5 VM Only


| Tool/Package |  Comments  | 
| ------------ | --------- | 


### WS1, WS6, WS7 VM Only


| Tool/Package |  Comments  | 
| ------------ | --------- | 
| Galaxy Instance |   | 

## Additional Configuration Details

### Galaxy Tool Shed

Local Tool Shed running on port 9009.  The local toolshed has been added to the local `tool_sheds_conf.xml`.
