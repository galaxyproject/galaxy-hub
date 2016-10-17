---
date: 2012-06-13T18:25:22Z
---
<div class='newsItemHeader'>[New CloudMan Release](/src/News/NewCloudManRelease/index.md)</div>

We just released an update to CloudMan. CloudMan offers an easy way to get a personal and completely functional instance of Galaxy in the cloud in just a few minutes, without any manual configuration.

This update brings a large number of updates and new features, the most prominent ones being:
* Support for [OpenStack](/CloudMan/OpenStack) and [OpenNebula](/CloudMan/OpenNebula) cloud middleware, allowing easy deployment on private, !OpenStack or !OpenNebula based clouds (see [CloudBioLinux](https://github.com/chapmanb/cloudbiolinux) and [mi-deployment](https://bitbucket.org/afgane/mi-deployment/) projects for an easy way to deploy CloudMan on any machine image)
* Start your instance via biocloudcentral.org on any supported cloud by simply filling out a 4-field web form. See [this screencast](http://www.youtube.com/watch?v=AKu_CbbgEj0) for an example of using it with the [Australian National Research Cloud, NeCTAR](http://nectar.org.au/research-cloud)
* Support for [Amazon Spot instances](http://aws.amazon.com/ec2/spot-instances/), giving you an opportunity to reduce cost of running your cluster on AWS
* Ability to mount any S3 bucket as a local file system via the Admin page, giving you instant and easy file-based access to any of your buckets or public buckets, such as the [1000genomes](http://aws.amazon.com/datasets/4383) one

Other notable enhancements and features:
* Added the ability to disable running of jobs on the master instance (via the Admin page), allowing you to (1) run a smaller instance type longer for the same cost and (2) not see the responsiveness of the master instance degrade with jobs being submitted
* Significantly enhanced the details pane for individual worker nodes on the main interface, adding support for terminating and restarting individual nodes
* Added MPI and SMP parallel environments to SGE; do `qconf -spl` to see the list and `qsub -pe <pe_name> <slots>` to use it for your cluster jobs
* Removal of data volumes now happens in parallel, shortening the cluster shutdown time 
* Added worker_post_start_script_url and share_string user data options. See the [User Data wiki page](/src/CloudMan/UserData/index.md) for the complete list.
* Added a messaging framework to allow system information to easily and prominently be shown on the main interface. For example, if an instance was restarted in the wrong zone for its data volume - an explicit message will be shown indicating there was an error and what should be done.
* Support for Ubuntu 12.04
* Enhancements to logging by progressively reducing the frequency of log output as no user interaction takes place and also introduced log rotation

This update comes as a result of 113 code changesets; for a complete list of changes, see the [commit messages](https://bitbucket.org/galaxy/cloudman/changesets/tip/151%3A263). 

Any new cluster will automatically start using this version of CloudMan. Existing clusters will be given an option to do an automatic update once the main interface page is refreshed.


CategoryNews
