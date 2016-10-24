---
autotoc: true
title: Getting Started with Galaxy on the Cloud
---
PLACEHOLDER_INCLUDE(/src/CloudMan/Header/index.md)



<div class='right'></div>

This getting started is for non-technical users who are interested in creating their own *Galaxy on the Cloud*. By following this getting started, you’ll learn fundamental process of starting your own cloud cluster with Galaxy. It takes about 10 minutes to complete.

## Step 0: Get your cloud credentials

Before you can start using cloud resources, you need to get your API access credentials for the given cloud. This step needs to be done only once.

1. For the case of Amazon, you need to [register here](http://aws.amazon.com/) for an Amazon Web Services (AWS) account.

1. Once your account has been approved by Amazon (note that this may take up to one business day), log into [AWS Management Console](https://console.aws.amazon.com/console).

1. Next, it's necessary to create the API access credentials. Do this by creating an IAM user: click on *Services* → *IAM* → *Users* → *Create New Users*. Give the user a name (e.g., *galaxy_cloudman*) and click *Create*. Once created, make a note of and download the API access credentials. Keep these credentials safe because they are all that is required to use your cloud account.

<div class='center'> 
<a href='http://i.imgur.com/PKLI8Gh.png'><img src="http://i.imgur.com/PKLI8Gh.png" alt="" width=200 /></a>
<a href='http://i.imgur.com/IxMqWkl.png'><img src="http://i.imgur.com/IxMqWkl.png" alt="" width=200 /></a>
<a href='http://i.imgur.com/yFL6QRA.png'><img src="http://i.imgur.com/yFL6QRA.png" alt="" width=200 /></a>
<a href='http://i.imgur.com/G81G4Cq.png'><img src="http://i.imgur.com/G81G4Cq.png" alt="" width=200 /></a>
</div>

1. #4 Attach permissions to the created IAM user by selecting the newly created user, clicking on *Permissions* in the user properties pane followed by a click on *Attach User Policy* button. Select the *AdministratorAccess* policy and *Attach* it.

<div class='center'>
<a href='http://i.imgur.com/xSMM43X.png'><img src="http://i.imgur.com/xSMM43X.png" alt="" width=250 /></a>
<a href='http://i.imgur.com/2G2UXf6.png'><img src="http://i.imgur.com/2G2UXf6.png" alt="" width=250 /></a>
</div>

## Step 1: Start your cluster

In this step, we will create a new cluster by launching a virtual server in the cloud.

1. Head to the Cloud Launch application at [launch.usegalaxy.org/launch](https://launch.usegalaxy.org/launch) and fill the form with the required information. Here, use the access credentials created in the previous step (i.e., for the *access* and *secret key* fields). Give the cluster a name and protect access to it via a self-chosen password. You can also choose the type of cluster to configure here - see [this page](/src/CloudMan/ClusterTypes/index.md) for a description of the available options.

<div class='center'>
<a href='http://i.imgur.com/zf9mzXf.png'><img src="http://i.imgur.com/zf9mzXf.png" alt="" width=250 /></a>
</div>

1. #2 Wait for the cluster to start - it will take a couple of minutes. Once it has started, a link to the CloudMan console will be shown. Log into the CloudMan console with username *ubuntu* and the password you chose on the previous page.

<div class='center'>
<a href='http://i.imgur.com/nl9oL3Y.png'><img src="http://i.imgur.com/nl9oL3Y.png" alt="" width=250 /></a>
<a href='http://i.imgur.com/AR767DR.png'><img src="http://i.imgur.com/AR767DR.png" alt="" width=250 /></a>
<a href='http://i.imgur.com/rYCIOyo.png'><img src="http://i.imgur.com/rYCIOyo.png" alt="" width=250 /></a>
</div>

1. #3 [Optional] Download the ssh key from the Cloud Launch monitor page. This key allows you to *ssh* into the instance via the command prompt without a password, so keep it safe. **Note** that this key is available for download only the very first time you use a given cloud account. If you have missed to download the key, delete the key from within the cloud's management console (by default, called *cloudman_key_pair*) and it will be automatically recreated the next time you start a cluster.

<div class='center'>
<a href='http://i.imgur.com/GOFLRuj.png'><img src="http://i.imgur.com/GOFLRuj.png" alt="" width=250 /></a>
</div>
 
## Step 2: Access Galaxy (and other services)

After the cluster has started, it will take a few more minutes for all the applications to start. A popup message window will be shown when the cluster is ready for use. At that point, click *Access Galaxy* and start using Galaxy. You will probably want to [register a new account](https://vimeo.com/75925027) first - after all, this is your own cluster. Keep in mind that the account you create on your cloud cluster is separate from an account you might have created on another Galaxy server.

<div class='center'>
<a href='http://i.imgur.com/x1neAq1.png'><img src="http://i.imgur.com/x1neAq1.png" alt="" width=250 /></a>
</div>
----

Depending on your interest, the documentation contains a wealth of information. Here are some places that might interest you:
* [Capacity planning](/src/CloudMan/CapacityPlanning/index.md)
* [Cluster applications and services](/src/CloudMan/Services/index.md)
* [Sharing and publishing a cluster](/src/CloudMan/Sharing/index.md)
* [Customizing your cluster](/src/CloudMan/CustomizeGalaxyCloud/index.md)
* [Troubleshooting](/src/CloudMan/Troubleshooting/index.md)

Getting started guide for the old *cloudlaunch interface* can be found [here](/src/CloudMan/GettingStarted/Pre201509/index.md).
