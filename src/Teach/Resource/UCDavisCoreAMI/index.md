---
title: [UC Davis Bioinformatics Core Galaxy AMI](http://bioinformatics.ucdavis.edu/software/)
---
<div class='center'>
<a href='http://bioinformatics.ucdavis.edu/'><img src="/src/Images/Logos/UCDavisGenomeCenter.png" alt="UC Davis Bioinformatics Core" height="100" /></a>
</div>



<div class='deploymentbox'>
 Resource:: **[UC Davis Bioinformatics Core Galaxy AMI](/src/Teach/Resource/UCDavisCoreAMI/index.md)**
 Types:: AMI
 Domains:: **Genomics**
 Owners:: [UC Davis Bioinformatics Core](http://bioinformatics.ucdavis.edu/)
 Formats:: Amazon Machine Image 
 Date:: 2014/06
</div>

From the [UC Davis web site](http://bioinformatics.ucdavis.edu/software/):

<div class='indent'>

The [UC Davis Bioinformatics Core](http://bioinformatics.ucdavis.edu/) uses Galaxy and the command-line for our training workshops and courses, running in the **[Amazon Cloud](http://aws.amazon.com/ec2/)**. We make the Amazon Machine Image (AMI) publicly available so that the community can use it for their projects. In addition to the standard software, our AMI contains customized software and interfaces that you will not find elsewhere; these tools are available through the Galaxy interface, or via the command-line under /share/apps. The AMI also contains all of the training materials from our week-long workshop. The current Bioinformatics Core AMI can be found by searching for **UC Davis Bioinformatics**. It is located in the N. California Region. There is no charge for using this AMI to launch your own instances in the Amazon Cloud, but you will need an AWS account, and Amazon will charge you for running instances and storing/transferring data.

Notes on starting our AMI: If you are using Galaxy, you need to use the following rules in your security group:

* SSH
* HTTP
* HTTPS
* Custom TCP Rule, port range 8080
* Custom TCP Rule, port range 2200
* Custom TCP Rule, port range 20-21

You can increase the size of your data partition by simply increasing the size of the EBS volume from 60Gb to whatever you want (up to 1024Gb) in the “Add Storage” step. We have added code in our AMI to automatically detect if the volume has increased capacity and to create a volume with that capacity. The steps to increase to maximum capacity can take a while depending upon the size increase, which means you may need to wait a while before the AMI is up and running. The default admin login for Galaxy is **`galaxyadmin@galaxyadmin.edu`** and the password is **`galaxy`**.

If you wish to use FTP to transfer files to your Galaxy instance, we have [instructions on how to use FileZilla](http://bioinformatics.ucdavis.edu/using-filezilla-to-transfer-files-to-galaxy-via-ftp/) to do so. FTP transfer is recommended for large files, however, you can use whatever FTP client you want.
</div>

The current AMI (**ami-ab010aee**) was created for the [RNA-Seq and ChIP-Seq Analysis with Galaxy Workshop](/src/Teach/Resource/UCDavisRNAChIPWorkshop/index.md) course offered at the UC Davis Bioinformatics core, December 16-19, 2014

## You will need

1. An [Amazon Web Services (AWS)](http://aws.amazon.com) account.  You will need to have a credit card associated with that account to pay for any resources used.

*And that's it.*

The AMI comes fully populated with the most common Galaxy tools, plus any additional tools that were created for the [RNA-Seq and ChIP-Seq Analysis with Galaxy Workshop](http://training.bioinformatics.ucdavis.edu/docs/2014/12/december-2014-workshop/).

## Datasets

The AMI includes all the example datasets used in the [Using Galaxy for Analysis of High Throughput Sequence Data](http://training.bioinformatics.ucdavis.edu/docs/2014/12/december-2014-workshop/) workshop.

## Links

* [Workshop Documentation](http://training.bioinformatics.ucdavis.edu/docs/2014/12/december-2014-workshop/)
* [Workshop's resource page](/src/Teach/Resource/UCDavisCoreGalaxyCourse/index.md) on this wiki.
* [UC Davis Bioinformatics Core Software page](http://bioinformatics.ucdavis.edu/software/)
* [Amazon Web Services](http://aws.amazon.com/)

CategoryTrainingResource
