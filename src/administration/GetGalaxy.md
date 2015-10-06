# Galaxy Download and Installation

<div class='right'>TABLE_OF_CONTENTS</div>

In addition to using the [public Galaxy server](http://usegalaxy.org/) (a.k.a. [/Main](/Main)), you can install your own instance of Galaxy (what this page is about), or create a [cloud-based instance of Galaxy](/Cloud).  Another option is to use one of the ever-increasing number of [public Galaxies](/PublicGalaxyServers) hosted by other organizations.

See [Big Picture: Choices](/BigPicture/Choices) for help on deciding which of these options may be best for your situation.

## Reasons to Install Your Own Galaxy

You only need to download Galaxy if you plan to:

* Run a local [production Galaxy](/Admin/Config/Performance/ProductionServer) because you want to
  * [install](/Admin/Tools/AddToolTutorial) and use tools unavailable on [public Galaxies](/PublicGalaxyServers)
  * use sensitive data (e.g. clinical)
  * process large datasets that are too big for public Galaxies
  * [plug-in](/Admin/Internals/DataSources) new datasources
* Develop [Galaxy tools](/Admin/Tools/AddToolTutorial)
* [Develop Galaxy](/Develop) itself

## Requirements

* UNIX/Linux or Mac OS X (although you can [try with Windows](/Admin/Config/Windows))
* Python 2.6 or 2.7 ([details here](/Admin/Python))
* Git (optional - see below)
* GNU Make, gcc to compile and install tool dependencies

## Get the Code

Download the latest source code:

```
#!highlight sh
% git clone https://github.com/galaxyproject/galaxy/
```


If you are getting Galaxy for development it is fine to begin using Galaxy from this point - the default branch after cloning is `dev`, and this is the branch that most pull requests should be made against, if you are contributing code back (unless you are fixing a bug in a Galaxy release). However, if running a production Galaxy service, you should switch to the `master` branch, which only receives stable code updates (more details [here](/Develop/SourceCode)):

```
#!highlight sh
% cd galaxy
% git checkout -b master origin/master
```


If you don't have [Git](http://git-scm.com/) (and thus can't run the `git` command), you can download Galaxy in an archive instead: [zipped](https://github.com/galaxyproject/galaxy/archive/master.zip) or [tar/gzipped](https://github.com/galaxyproject/galaxy/archive/master.tar.gz).  However, this makes it more difficult to stay up to date in the future since there's no simple way to update your copy.

**Note:** If you're doing development or making changes to Galaxy, it's typically a good idea to fork Galaxy in Github and update to/from your fork. This changes the process slightly, see the [Github fork documentation](https://help.github.com/articles/fork-a-repo/) for details.

## Start It Up

Galaxy requires a few things to run - configuration files, and dependent Python modules called [eggs](/Admin/Config/Eggs).  However, starting the server for the first time will create/acquire these things as necessary.  Simply run the following command:

```
#!highlight sh
% sh run.sh
```


This will start up the server on localhost and port 8080, so Galaxy can be accessed from your web browser at http://localhost:8080 . Galaxy's server will start printing its output to your terminal. To stop the Galaxy server, just hit `Ctrl-c` in the terminal from which Galaxy is running.

To access Galaxy over the network, simply modify the `config/galaxy.ini` file and change the `host` setting to 

```
#!highlight python
host = 0.0.0.0
```

Upon restarting, Galaxy will bind to any available network interfaces instead of just the loopback.

**That's it - you have your very own Galaxy running. Congratulations!**

----
# What to do next
### Become an Admin
In order to control your new Galaxy through the UI (installing tools, managing users, creating groups etc.) you have to become an [administrator](/Admin/Interface). First register as a new user and then give the user admin privileges like this: 
You add the Galaxy login ( email ) to the Galaxy configuration file (`config/galaxy.ini`). If the file does not exist you can copy it from the provided sample (`config/galaxy.ini.sample`). Note that you have to restart Galaxy after modifying the configuration for changes to take effect.

```
# this should be a comma-separated list of valid Galaxy users
admin_users = user1@example.com,user2@example.com
```


### Install More Tools

Your Galaxy came with the basic tools pre-installed, however you probably want more. Installing tools to Galaxy is generally a very easy and pleasant experience. Please read [Installing tools into Galaxy from ToolShed](/Admin/Tools/AddToolFromToolShedTutorial) to get started.

### Join the Mailing List

The best way to keep up on new features and bug fixes, as well as discuss future features is to join the [Galaxy Developers mailing list](https://lists.galaxyproject.org/listinfo/galaxy-dev/).  See [Mailing Lists](/MailingLists) for other options.

### Keep your instance backed up

Like any other application, your Galaxy directory and your Galaxy database tables should be backed up and your disaster recovery plan should be regularly tested to make sure everything is working as expected.

### Configure for production

The above instructions are intended for those wishing to develop Galaxy tools and the Galaxy itself.  To deploy a production-ready installation of Galaxy, some changes from the default configuration are highly recommended.  If nothing else, switching to PostgreSQL or MySQL (from the default SQLite) is heavily endorsed to prevent database locking issues that can arise with multiple users.

Please see the [Running Galaxy in a production environment](/Admin/Config/Performance/ProductionServer) page for more details.

### Keep your code up to date

Galaxy development occurs [in Github](https://github.com/galaxyproject/galaxy/).  Changes are stabilized in the `release_YY.MM` branches and then merged to `master` for each `YY.MM.point` release.

To be made aware of new Galaxy releases, please join the [Galaxy Developers mailing list](https://lists.galaxyproject.org/listinfo/galaxy-dev/).  Each release is accompanied by a [news brief](/DevNewsBriefs).

At any time, you can check to see if a new stable release is available by using the `git log` command:

```
#!highlight sh
% git log ..origin/master
commit 3f314974c9c3742b118518881a6d392123ccc05d
Merge: d8eeaae c78b7b6
Author: Nate Coraor <nate@bx.psu.edu>
Date:   Mon Mar 9 22:26:54 2015 -0400

    Merge branch 'release_15.03' to master for v15.03

 ...
```


If you see no output, you are up to date. If you see a list of commits, a new version is available.  We suggest checking the accompanying [news brief](/DevNewsBriefs) first (if the release is to a newer major version of Galaxy), but you can also immediately pull the commits to your local Galaxy clone with:

```
% git pull
 ...
```


**Note**: After pulling changes, you will need to stop your Galaxy server and restart with the updated code.  This will interrupt any running jobs, unless you are using a cluster configuration.  For more information on how to make Galaxy restartable without interrupting users, see the [production server documentation](/Admin/Config/Performance/ProductionServer).

**Note**: Occasionally, updated code includes structural changes to the Galaxy database tables.  The news brief will alert you if a release contains a database change.  After updating Galaxy, if you attempt to restart, Galaxy will refuse to load, and will output an error message indicating that your database is the wrong version.  The error message indicates that you should run backup your database and then run `sh manage_db.sh upgrade` - follow those instructions carefully - especially the part about backing up your database safely!  Database updates are carefully tested before release, but it is always wise to be able to back out if something goes wrong during an update.

In the unlikely event that something goes wrong with updated code, you can return to an older release by guessing the release tag name from the [news brief](/DevNewsBriefs) page and using the `git checkout` command.  For example, to return to the latest version of the January 2015 release, use:

```
#!highlight sh
% git checkout release_15.01
```


You can also use tags to check out specific releases:

```
#!highlight sh
% git tag
v13.01
v13.01.1
v13.02
 ...
v14.10.1
v15.01
v15.01.1
v15.01.2
v15.03
```


Restore the fresh backup if a database update was required, and then restart Galaxy to get back to where you started.

### Troubleshooting

* Offline start: The initial Galaxy run requires internet access to download the pre-built Python eggs on which Galaxy runs.  If the system on which you are installing Galaxy does not have Internet access, please follow the instructions for offline systems on [/Admin/Config/Eggs](/Admin/Config/Eggs) before starting the server.

* The basic Galaxy install is a single-user instance and is only accessible by the local user. As with many web-based applications, enable cookies in the web-browser used for full functionality.

* A common practice when using any web browser is to stay current with software updates to maximize performance and security. If moving forward to [production server](/Admin/Config/Performance/ProductionServer) with login enabled, please make sure you and your end-users are current.

* Some tools shipped with Galaxy have dependencies that need to be satisfied manually. Please see details [here](/Admin/Tools/ToolDependencies).

### Other Help

<div class='right'><a href='http://galaxyproject.org/search/getgalaxy'><img src='/Images/Logos/GetGalaxySearch.png' alt='Galaxy administration, tool, and deployment search' width="170" /></a></div>

* [Search all Galaxy administration resources](http://galaxyproject.org/search/getgalaxy)
