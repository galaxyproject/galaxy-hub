<div class='newsItemHeader'>[New CloudMan Release](/src/news/CloudManRelease/index.md)</div>

<div class='right'><a href='/src/CloudMan/index.md'><img src="/src/images/Logos/CloudManWideBlackLogo.png" alt="CloudMan" width="300" /></a></div>

**We just released an update to Galaxy CloudMan.** CloudMan offers an easy way to get a personal and completely functional instance of Galaxy in the cloud in just a few minutes, without any manual configuration.

**IMPORTANT - please read**

Any new cluster will automatically start using this version of CloudMan. Existing clusters will be given an option to do an automatic update once the main interface page is refreshed. Note that this upgrade is a major version upgrade and thus the migration is rather complicated. The migration process has been automated but will take a little while to complete. If you have made customizations to your cluster in terms of adding file systems, upgrading the database, or similar, we do not recommend you perform the upgrade. Note that this upgrade comes with (and requires) a new AMI (ami-118bfc78), which will automatically be used when starting an instance via [CloudLaunch](http://usegalaxy.org/cloudlaunch).

**This update brings a large number of updates and new features, the most prominent ones being:**
* Unification of `galaxyTools` and `galaxyData` file systems into a single `galaxy` filesystem. This change makes it possible to utilize the [Galaxy Tool Shed](/src/ToolShed/index.md) when installing tools into Galaxy.
* Added initial support for Hadoop-type workloads
* Added initial support for cluster federation via HTCondor
* Added a new file system service for an instance's transient storage, allowing it to be used across the cluster over NFS
* Added a service for the Galaxy Reports webapp
* Added optional [Loggly](http://loggly.com/) based off-site logging support
* Added tags to all resources utilized by CloudMan

For more details on the new features, see the the [CHANGELOG](https://bitbucket.org/galaxy/cloudman/src/tip/CHANGELOG.md?at=default) and for even more details see, *all [291 commit messages](https://bitbucket.org/galaxy/cloudman/commits/all?search=35baec1%3A8bbae3f) from 7 contributors*.

Enjoy and please let us know what you think,

[Enis Afgan](/src/EnisAfgan/index.md)

<div class='newsItemFooter'>Posted to the [Galaxy News](/src/news/index.md) on 2013-07-08</div>

[CategoryNews](/src/CategoryNews/index.md)
