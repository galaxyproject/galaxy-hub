---
date: 2011-11-29T18:42:33Z
---
<div class='newsItemHeader'>[An Update to Galaxy Cloudman](/News/An Update to Galaxy CloudMan)</div>


A new version of [/CloudMan](/CloudMan) for running Galaxy on Amazon cloud has been released yesterday. Any new cluster will automatically use this version. Existing clusters will have a link displayed at the top of the CloudMan console offering to perform an automated update. 

The new version brings the following updates/features:
* Added ability to specify a path where Galaxy is installed as part of user data (using `galaxy_home` key). This allows custom Galaxy application to be installed and picked up by CloudMan instead of the default one. This works across cluster invocations as well as for shared clusters. For a complete list of user data options see [/Admin/Cloud/UserData](/Admin/Cloud/UserData)
* Use `/etc/profile` instead of `/etc/bash.bashrc` for system wide shell logins
* Support for 3.0 Kernel on Ubuntu 11.10 for SGE. Contributed by Brad Chapman.
* Fix for SGE install after cloud-init has run and changed `/etc/hosts`
* `post_start_service` now runs if the script exists in the cluster bucket even if no URL was provided as part of current user data
* Fix recognition of existing and attached file system volumes on instance reboot

[/EnisAfgan](/EnisAfgan)


CategoryNews
