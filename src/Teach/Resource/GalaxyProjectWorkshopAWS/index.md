---
title: Galaxy Project Workshop CloudMan on AWS Share
---
<span style="font-size: larger;"> Hey! This Is Under Construction! </span>

<div class='center'>
<br /><a href='/src/CloudMan/index.md'><img src="/src/Images/Logos/CloudManWideBlackLogo.png" alt="CloudMan" height="75" /></a> &nbsp;&nbsp;&nbsp;&nbsp; <a href='http://aws.amazon.com/'><img src="/src/Images/Logos/AWSLogo.png" alt="Amazon Web Services" height="75" /></a><br /><br /></div>





<div class='deploymentbox'>
 Resource:: **[Galaxy Project Workshop CloudMan on AWS Share](/src/Teach/Resource/GalaxyProjectWorkshopAWS/index.md)**
 Types:: CloudMan on AWS share
 Domains:: **RNA-Seq, ChIP-Seq, Introduction** 
 Owners:: [Galaxy Project](http://galaxyproject.org)
 Formats:: a CloudMan on AWS share string  
 Date:: 2014/12
</div>

The [Galaxy Team](/src/GalaxyTeam/index.md) runs most of it's [hands-on workshops](/src/Events/index.md) using CloudMan based instances running on [Amazon Web Services (AWS)](https://aws.amazon.com).  We could create each workshop server anew each time we do a workshop, but it is much easier to create an instance once, take a snapshot of it, and then reuse that snapshot whenever we have a workshop.

This page describes the current Galaxy Project workshop snapshot.  It's publicly available and can be used by anyone.

# Starting

<table>
  <tr>
    <th> Share String </th>
  </tr>
  <tr>
    <td> cm-54fcf9143a18f57c471da6d74fe514aa/shared/2014-12-11--03-56/ </td>
  </tr>
</table>


To use the instance, you'll need to:

1. Get an AWS account.  See xxxx for details on that.
1. Launch a Galaxy instance on AWS, using either the [AWS console interface](/src/AWS console interface/index.md), or [CloudLaunch](/src/CloudLaunch/index.md)
1. **However**, instead of allocating so many gigabytes of storage, launch your instance using the Galaxy Project Workshop share string (see above) as per [these instructions](/src/these instructions/index.md)

This will launch a fully populated Galaxy server using the latest Galaxy AMI, but with data you'll need to run several standard examples we use in our training.

# Included Examples

## Galaxy 101: Exons and Repeats

Directions on how to find these, including slides

Should point to a Galaxy 101 training resource page.

## UC Davis RNA-Seq

Should point to a separate page?

### Fixing Tophat2

Theres a problem with Tophat2 in the latest Galaxy AMI.  To use Tophat2, you'll need to do this first:

1. ssh to head node
1. Enter `nano /etc/exports`
1. Uncomment the commented `#galaxyIndices` line
1. Save the file and exit the editor
1. Enter `sudo /etc/init.d/nfs-kernel-server restart`
1. Log off the head node.

You won't need to restart Galaxy.  We apologize for this,  We will fix it in the next AMI.

## HSPH HBC ChIP-Seq

Should point to a separate page


## Links

Links to any useful datasets or information.


CategoryTrainingResource
