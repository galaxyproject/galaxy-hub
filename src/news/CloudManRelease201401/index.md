<div class='newsItemHeader'>[January 2014 CloudMan Release](/News/CloudManRelease201401)</div>

<div class='right'><a href='/CloudMan/'><img src='/Images/Logos/CloudManWideBlackLogo.png' alt='CloudMan' width="300" /></a></div>

**We just released an update to Galaxy CloudMan.** CloudMan offers an easy way to get a personal and completely functional instance of Galaxy in the cloud in just a few minutes, without any manual configuration.

**This update brings a large number of updates and new features, the most prominent ones being:**

* On AWS, updated `galaxy` (snap-69893175) and `galaxyIndices` (snap-4b20f451) file system snapshots, which include the Nov 4, 2013 Galaxy release as well as a significant number of Galaxy tools updates and additions. Tool installations from the Tool Shed work as expected.
* Updated the AWS AMI: *Galaxy CloudMan 2.3* (ami-a7dbf6ce)
* Made multi-process Galaxy the default option for running Galaxy with CloudMan.
* Automatically toggle master as job execution host or not when workers are present.
* Added support for attaching external Gluster based filesystems + the ability to init clusters off gluster/nfs volumes when so configured in `snaps.yaml`.
* Added support for creating a volume based on an `archive_url` allowing a file system to be downloaded at cluster launch; also made it possible to use transient disk for this.
* Added tagging support for [OpenStack](http://openstack.org/) instances (requires !OpenStack Havana release).
* Galaxy Reports app now starts by default on Galaxy type clusters; it is accessible on `<instance IP>/reports/` URL.

**Minor updates**

* Added AWS new High I/O instance types.
* Created `proFTPd` service for managing the application; fixes occasional issues with FTP connectivity
* Updated `admin_users` (in Admin) form data-prefill and explanatory text to indicate correctly that this form now sets all admin users, instead of appending to the existing list.
* Included cluster name into the page title.
* Explicitly indicate that upon cluster deletion shared clusters get removed too.
* Added `TMPDIR` env var to point to a dir on (Galaxy's) data file system.
* Generalize support for finding ``libc`` on newer Ubuntu platforms. Allows CloudMan to run on Ubuntu 13.04 and tries to be future compatible with new minor releases of `libc` (thanks Brad Chapman).
* Numerous fixes, see commit log for details.

For more details on the new features, see the the [CHANGELOG](https://bitbucket.org/galaxy/cloudman/src/tip/CHANGELOG/?at=default) and for even more details see, *all [103 commit messages](https://bitbucket.org/galaxy/cloudman/commits/all?search=a6bf542%3Acc55ca9) from 4 contributors*.

Enjoy and please let us know what you think,

[Enis Afgan](/EnisAfgan) and [Dannon Baker](/DannonBaker)

<div class='newsItemFooter'>Posted to the [Galaxy News](/News) on <<Date(2014-01-07T17:50:19Z)>></div>

CategoryNews
