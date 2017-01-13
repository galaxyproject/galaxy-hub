<div class='newsItemHeader'>[August 2014 CloudMan Release](/src/news/CloudManRelease201408/index.md)</div>

<div class='right'><a href='/src/CloudMan/index.md'><img src="/src/images/Logos/CloudManWideBlackLogo.png" alt="CloudMan" width="300" /></a></div>

**We just released an update to Galaxy CloudMan**. CloudMan offers an easy way to get a personal and completely functional instance of Galaxy in the cloud in just a few minutes, without any manual configuration.

This is mostly an incremental bug fix release with the following summary of changes:

* On AWS, updated galaxyFS snapshot (snap-e6e1c04a), which includes the June 2, 2014 Galaxy release with the July 30th security fix. All the tools installed via the Tool Shed have been updated and a number of new tools added, most notably: Tophat2, Bowtie2, FastQC, several FASTQ manipulation tools, several QC tools.
* For AWS, added support for VPC
* For [OpenStack](http://www.openstack.org/) clouds, added the ability to automatically recover worker instances on cluster reboot
* Added support for creating a file system based on a downloadable archive
* Do not run Galaxy with multiple processes by default. This is because Tool Shed installs do not work properly in the multi-process mode. This feature can be enabled by setting user data option `configure_multiple_galaxy_processes` to `True` when launching an instance.
* Set SGE slots in each queue to be equal to the number of cores on the instance
* Set instance IP in the Galaxy's FTP data upload tool message
* Added support for Nginx v1.4 and allow it (with the PAM module) to used as the authentication mechanism when accessing Galaxy Reports app
* Fixed cluster deletion when performed via the API
* No longer automatically start Hadoop and HTCondor services
* On manually-invoked instance reboots, do not increment the instance reboot count that otherwise eventually leads to instance termination
* Limit the size of the log message buffer used in the UI to 1000 lines. Long-running instances had issues with this log growing large and that led to poor UI performance. The complete log is still available from the Admin page (or the command line).
* Automatically delete the bucket/container for Test type (*i.e*, 'SGE only') clusters on cluster termination

For complete details on implemented changes, please see the [source code commits](https://bitbucket.org/galaxy/cloudman/commits/all?search=835%3A903).

Enjoy and please let us know what you think,

[Enis](/src/EnisAfgan/index.md) & [Dannon](/src/DannonBaker/index.md) & [The Galaxy Team](/src/GalaxyTeam/index.md)

<div class='newsItemFooter'>Posted to the [Galaxy News](/src/news/index.md) on 2014-08-08</div>

[CategoryNews](/src/CategoryNews/index.md)
