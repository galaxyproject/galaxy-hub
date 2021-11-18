---
title: Galaxy on Jetstream
---
<slot name="/cloud/jetstream/linkbox" />

Want your own Galaxy server, for free? You can easily create Galaxy servers on the [NSF Jetstream cloud](http://jetstream-cloud.org/).

Please note that, due to some Jetstream restrictions, this is a standalone Galaxy server in the cloud - it is not a scalable virtual cluster managed by CloudMan.

## How do I get access?

You must be a US-based academic to access Jetstream cloud. Access is free but it is necessary to have an [XSEDE account](https://www.xsede.org/user-portal) (go to https://www.xsede.org/ to sign up) and have an active resource allocation. Getting the resource allocation is matter of writing a summary of your research and waiting for the application to get approved (typically one business day, but can take longer). Go to http://jetstream-cloud.org/allocations.php → *Submit and manage allocation requests* to get started; then choose *Startup* type allocation. See [this page](/cloud/jetstream/allocation/) for more details about the request allocation process.

## How do I launch my own Galaxy server?

After you have your XSEDE account and an active allocation:
* Visit https://use.jetstream-cloud.org/, and log in using your university, national lab, facility, project, Google, or Globus ID.

* Once logged in *select* **Launch an instance**
    <a href='/cloud/jetstream/jetstream_GettingStarted.png'><img src="/cloud/jetstream/jetstream_GettingStarted.png" alt="" width="75%" /></a><br /><br />

* Browse the available images and choose a Galaxy image (see [Released versions](/cloud/jetstream/#released-versions) below for the available options)
    <a href='http://i.imgur.com/OCA45pA.png'><img src="http://i.imgur.com/OCA45pA.png" alt="" width="75%" /></a>   <br /><br />

* Launch a Galaxy instance:
    <a href='http://i.imgur.com/AQIeZyl.png?1'><img src="http://i.imgur.com/AQIeZyl.png?1" alt="" width="75%" /></a>
    <br /><br />

* Set basic parameters of the instance:
    <a href='http://i.imgur.com/TSOUMJd.png?1'><img src="http://i.imgur.com/TSOUMJd.png?1" alt="" width="75%" /></a><br /><br />
  * Select the provider: TACC or Indiana University.
  * Select the instance size:  This must be **medium** or larger.
  * And then click **Launch**

* If you don't have any existing projects in Jetstream, the next form will prompt you to create a new project.
    <a href='/cloud/jetstream/jetstream_LaunchProject.png'><img src="/cloud/jetstream/jetstream_LaunchProject.png" alt="" width="75%" /></a><br /><br />

* The instance will be built and then launched.  After a few minutes the instance will be **Active** and ready to use:
    <a href='http://i.imgur.com/Z9GDeru.png'><img src="http://i.imgur.com/Z9GDeru.png" alt="" width="75%" /></a><br /><br />

* In about 5 minutes, you should have your own Galaxy server - just copy the new server IP address plus :8080 to a new browser window (eg, http://your.ip.addr:8080)
    <a href='/cloud/jetstream/galaxy_landing.png'><img src="/cloud/jetstream/galaxy_landing.png" alt="" width="75%" /></a><br /><br />

## What is Jetstream cloud?

<div class='right'><img src="https://www.nsf.gov/news/mmg/media/images/jetstream_logo_f_fe60185c-962f-4c1f-99bf-e6ec82d54c21.jpg" alt="" width="300" /></div>

Jetstream is a US national cyberinfrastructure managed science and engineering cloud that offers researchers access to flexible computational resources. Researchers are able to create virtual machines (VM) and virtual disks on the remote resource that look and feel like their lab workstation or home machine, but come preconfigured with dozens of software tools and/or can dynamically scale to accommodate variable computational demand. Access to Jetstream is awarded as a merit-based allocation via XSEDE free of charge.

Jetstream is supported by National Science Foundation award [ACI-1445604](http://www.nsf.gov/awardsearch/showAward?AWD_ID=1445604): 'Jetstream - A Self-Provisioned, Scalable Science and Engineering Cloud Environment’. More information about the project is available at http://jetstream-cloud.org/.

## About the resource consumption

When you choose your instance size, keep in mind that you will burn as many Service Units (SUs) (also known as Allocation Units, or AUs) per hour as the number of cores your instance has. For example, if you have a 4 core instance, you will burn 4 SUs **per hour**. While your instances are stopped or deleted, you are not consuming any SUs. More information about the instance types and usage modes is available on the Jetstream site (http://jetstream-cloud.org/general-vms.php).

## About the resource lifecycle

Cloud Virtual Machines (VMs) are typically transient in nature. This means that once you delete (i.e., terminate) an instance, it is permanently gone, including any  data. So, before you delete an instance, it is necessary to download any data you wish to keep. To delete an instance, click the *Delete* button.

<img src="http://i.imgur.com/m9s9h6T.png" alt="" width=300 />

On Jetstream, you can stop a VM without deleting it. This will preserve any data you have to your server while it was running. When you want to use the server again, just *Start* it and wait for it to come back up. While a VM is stopped, no SUs are being used. To stop a VM, click the *Stop* button. If Galaxy jobs fail after you have Started the server, [reboot the server](/cloud/jetstream/faq/#how-do-i-restart-my-jetstream-galaxy-server).

<img src="http://i.imgur.com/VCRTUS2.png" alt="" width=300 /> <img src="http://i.imgur.com/KL6LqsZ.png" alt="" width=300 />
