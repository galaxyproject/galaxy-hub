---
autotoc: true
title: Getting Started with Galaxy !CloudMan
---
PLACEHOLDER_INCLUDE(/src/CloudMan/Header/index.md)

## This is an old and currently outdated guide only kept for historical reasons. Do not use the instructions on this page. Use the new getting started guide available here: https://wiki.galaxyproject.org/CloudMan/GettingStarted



PLACEHOLDER_INCLUDE(/src/CloudMan/AWS/LinkBox/index.md)

This page provides a step-by-step instructions on how to start your own instance of Galaxy on [Amazon Web Services (AWS)](http://aws.amazon.com/) [Elastic Compute Cloud (EC2)](http://aws.amazon.com/ec2/). More general information and instructions about Galaxy CloudMan can be found [here](/src/CloudMan/index.md). 



## Screencast

[Here's a screencast](http://screencast.g2.bx.psu.edu/cloud/) that walks through the process of setting up your own Galaxy cloud cluster. Note, the screencast skips one step, detailed setting up of the Inbound TCP rules. See "Inbound Rules" below.

## Step 1: One Time Amazon Setup

<div class='right'><div class='solid'>
<table>
  <tr>
    <td style=" text-align: center; border: none;"> <strong>Step 1 Screenshots</strong> </td>
  </tr>
</table>


<table>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='PLACEHOLDER_ATTACHMENT_URLAWSSetRegion.png'>{{attachment:AWSSetRegion.png|Set region; click to enlarge|width="200"}}|&do=get,target="_blank"</a><br />1.2. Set region </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='PLACEHOLDER_ATTACHMENT_URLAWSConsoleKeyPairs.png'>{{attachment:AWSConsoleKeyPairs.png|Click on key pairs; click to enlarge|width="200"}}|&do=get,target="_blank"</a><br />1.3. Click on key pairs </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='PLACEHOLDER_ATTACHMENT_URLAWSDefaultSecurityGroups.png'>{{attachment:AWSDefaultSecurityGroups.png|Create security group; click to enlarge|width="200"}}|&do=get,target="_blank"</a><br />1.5. Create security group </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='PLACEHOLDER_ATTACHMENT_URLAWSApplyRuleChanges.png'>{{attachment:AWSApplyRuleChanges.png|Create security group; click to enlarge|width="200"}}|&do=get,target="_blank"</a><br />1.7. Add inbound rules </td>
  </tr>
</table>

</div></div>

1. Because AWS services implement pay-as-you-go access model for compute resources, it is necessary for every user of the service to *[register with Amazon](http://aws.amazon.com/)*. <div class='red'>You will need a credit card to register.</span>  (You can apply for a [AWS Education Grant](http://aws.amazon.com/education) after you register). 

2. Once your account has been approved by Amazon (note that this may take up to one business day), *log into the [EC2 AWS Management Console](http://console.aws.amazon.com/ec2)* and set your AWS Region to *US East (Virginia)*. This is the only region Galaxy CloudMan is fully supported in at this time (see [screenshot 1.2|&do=get,target="_blank"](ATTACHMENT_URLAWSSetRegion.png)).

3. Click **Network & Security &rarr; Key Pairs** or **My Resources &rarr; *n* Key Pairs** (see [screenshot 1.3|&do=get,target="_blank"](ATTACHMENT_URLAWSConsoleKeyPairs.png) - if it does not look like this, then try using the Chrome browser) and then click **Create Key Pair**.  Enter a memorable name for the key pair, e.g., `GalaxyCloud` and click **Create**.

4. *Save your private key!* The previous step creates the key pair and downloads a copy to your machine with the name *`MemorableName`*`.pem`.  Save this file and protect it like you would your password. The key pair can be used to access started instances from the command line.

5. *Create a Security Group* by clicking **Network & Security &rarr; Security Groups &rarr; Create Security Group** (see [screenshot 1.5|&do=get,target="_blank"](ATTACHMENT_URLAWSDefaultSecurityGroups.png)). Specify a name (e.g., `GalaxyGroup`) and provide a brief description.  **VPC** should be **No VPC**.  Click the **Yes, Create** button.  The new group now appears in the list and details about the group are listed at the bottom of the page.

6. *Add Inbound Rules* to the new group by clicking the **Inbound** tab.  For each new rule you will need to select the protocol (the rule type) from the **Create a new rule:** pulldown, fill in the fields for that rule, and then click **Add Rule**. Define these rules:
  1. Protocol: HTTP<br />Source: `0.0.0.0/0` <div class='indent'>Unless you want to restrict access based on [the source IP](http://en.wikipedia.org/wiki/CIDR_notation)</div>
  2. Protocol: SSH<br />Source: `0.0.0.0/0`
  3. Protocol: Custom TCP rule<br />Port range: `42284`<br />Source: `0.0.0.0/0`<div class='indent'>This rule opens a port on the remote instance allowing access to the cloud controller web interface.</div>
  4. Protocol: Custom TCP rule<br />Port range: `20-21`<br />Source: `0.0.0.0/0`<div class='indent'>This rule opens ports required for FTP file transfer.</div>
  5. Protocol: Custom TCP rule<br />Port range: `30000-30100`<br />Source: `0.0.0.0/0`<div class='indent'>This rule opens ports required for passive FTP file transfer.</div>
  6. Protocol: All TCP<br />Source: *name of group, e.g. `GalaxyGroup`*<div class='indent'>The Source will automatically change to the security group ID. This action will enable multiple instances in the same security group to communicate with each other on Amazon EC2's internal network.</div>
  7. Click **Apply Rule Changes**.  The window should look like the [screenshot 1.7|&do=get,target="_blank"](ATTACHMENT_URLAWSApplyRuleChanges.png).

All of these inbound rules are necessary for proper functioning of CloudMan and Galaxy.

## Step 2: Starting a Master Instance 

<div class='right'><div class='solid'>
<table>
  <tr>
    <td style=" text-align: center; border: none;"> <strong>Step 2 Screenshots</strong> </td>
  </tr>
</table>


<table>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='PLACEHOLDER_ATTACHMENT_URLAWSAMISearch.png'>{{attachment:AWSAMISearch.png|Find & Select AMI; click to enlarge|width="200"}}|&do=get,target="_blank"</a><br />2.3. Find & Select AMI </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='PLACEHOLDER_ATTACHMENT_URLAWSRequestInstanceDetails.png'>{{attachment:AWSRequestInstanceDetails.png|Set instance details; click to enlarge|width="200"}}|&do=get,target="_blank"</a><br />2.4. Instance details </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='PLACEHOLDER_ATTACHMENT_URLAWSUserData.png'>{{attachment:AWSUserData.png|set user data; click to enlarge|width="200"}}|&do=get,target="_blank"</a><br />2.5. Set User Data. </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='PLACEHOLDER_ATTACHMENT_URLAWSCredentialsLink.png'>{{attachment:AWSCredentialsLink.png|Get to credentials; click to enlarge|width="200"}}|&do=get,target="_blank"</a><br />2.5.3. Get to credentials. </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='PLACEHOLDER_ATTACHMENT_URLAWSCredentials.png'>{{attachment:AWSCredentials.png|Credentials; click to enlarge|width="200"}}|&do=get,target="_blank"</a><br />2.5.4. Credentials. </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='PLACEHOLDER_ATTACHMENT_URLAWSPreLaunchReview.png'>{{attachment:AWSPreLaunchReview.png|Review & launch; click to enlarge|width="200"}}|&do=get,target="_blank"</a><br />2.9. Review & Launch! </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='PLACEHOLDER_ATTACHMENT_URLAWSInstanceList.png'>{{attachment:AWSInstanceList.png|AWS EC2 instances list; click to enlarge|width="200"}}|&do=get,target="_blank"</a><br />2.10. AWS instance is up </td>
  </tr>
  <tr>
    <td style=" text-align: center; border: none;"> <a href='PLACEHOLDER_ATTACHMENT_URLGalaxyNotRunning.png'>{{attachment:GalaxyNotRunning.png|Galaxy not running yet; click to enlarge|width="200"}}|&do=get,target="_blank"</a><br />2.11. Galaxy CloudMan is<br />ready to configure </td>
  </tr>
</table>

</div></div>

** This step is required every time a new cloud instance of Galaxy is desired.**

CloudMan works in a master-worker fashion: the master is used to control all of the needed services as well as worker instances. Worker instances are needed to run analysis jobs submitted through Galaxy that runs on the master instance (for a more detailed description of running Galaxy in cluster environments, see the [cluster performance page](/src/Admin/Config/Performance/Cluster/index.md)). So, in order to start a Galaxy CloudMan cluster, we need to start a master instance. 

1. Go to the [AWS Management Console for EC2](https://console.aws.amazon.com/ec2/home) and click **Launch Instance**

2. Select the **Classic Wizard** in the popup window.

