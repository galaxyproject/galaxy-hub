---
title: Get Galaxy
---
Here you will find information on obtaining and setting up a Galaxy instance with default configuration.

# Requirements

* UNIX/Linux or Mac OSX
* [Python 2.7](/src/admin/python/index.md)

# Get Started

## For Production or Single User

If setting up or running a production Galaxy service or creating your own personal Galaxy instance, use the [latest release](https://docs.galaxyproject.org/en/master/releases/) branch, which only receives stable code updates.

### Cloning new

If you do not have a Galaxy repository yet or you do not want to update the existing instance, run:

```
$ git clone -b release_19.05 https://github.com/galaxyproject/galaxy.git
```
### Updating existing

If you have an existing Galaxy repository and want to update it, run:

```
$ git fetch origin && git checkout release_19.05 && git pull --ff-only origin release_19.05
```


## For Development

To obtain Galaxy for development, use the default branch after cloning: `dev`. This is the branch that pull requests should be made against to contribute code (unless you are fixing a bug in a Galaxy release).

```
$ git clone https://github.com/galaxyproject/galaxy.git
```

# Start It Up

Galaxy requires a few things to run: a virtualenv, configuration files, and dependent Python modules. However, starting the server for the first time will create/acquire these things as necessary. To start Galaxy, simply run the following command in a terminal window:

```sh
$ sh run.sh
```

This will start up the Galaxy server on localhost and port 8080. Galaxy can then be accessed from a web browser at http://localhost:8080. After starting, Galaxy's server will print output to the terminal window. To stop the Galaxy server, use `Ctrl-C` in the terminal window from which Galaxy is running. If galaxy does not start, you may be using the conda python. See the [admin docs](https://docs.galaxyproject.org/en/master/admin/framework_dependencies.html#conda) for more details.

# Next Steps

## Configure

Since the release 18.01 Galaxy will run fine without an explicit configuration file, but if you want to modify its settings you need to create one. A good start is to copy the sample and rename it to `galaxy.yml`. You can do so with this command:

```
cp config/galaxy.yml.sample config/galaxy.yml
```

## Galaxy over network

To access Galaxy over the network, modify the `config/galaxy.yml` file by changing the `http` setting. Galaxy will bind to any available network interfaces instead of the localhost if you change it like this:

```
http: 0.0.0.0
```

## Become an Admin

To control Galaxy through the UI (installing tools, managing users, creating groups, etc.), user must become an [administrator](/src/admin/index.md). Only registered users can become admins. To give a user admin privileges add the user's Galaxy login email to the configuration file `config/galaxy.yml`. If you don't have the file set it up using the instructions [above](#configure). The entry looks like this:

```
# this should be a comma-separated list of valid Galaxy users
admin_users: user1@example.com,user2@example.com
```

<div class="alert alert-info" role="alert">
You need to restart Galaxy after configuration file changes.
</div>

## Install Tools

Galaxy comes with a small set of basic tools pre-installed. To install additional tools, follow the instructions on [Installing tools into Galaxy from the Tool Shed](/src/admin/tools/add-tool-from-toolshed-tutorial/index.md).

## Join the Discussion

To stay up-to-date on new Galaxy features and bug fixes, as well as to discuss future features, consider joining

* the [Galaxy Developers mailing list](https://lists.galaxyproject.org/lists/galaxy-dev.lists.galaxyproject.org/). (See [Mailing Lists](/src/mailing-lists/index.md) for other options.)
* the [Galaxy Gitter Channel](https://gitter.im/galaxyproject/Lobby) for a chat-based interface.

## Keep your instance backed up

Like any other application, Galaxy directories and Galaxy database tables should be backed up, and any disaster recovery plans should be regularly tested to make sure everything is working as expected.

## Configure for production

The above instructions are intended for users wishing to develop Galaxy tools and Galaxy itself. To deploy a production-ready installation of Galaxy, some changes from the default configuration are highly recommended. If nothing else, switching to PostgreSQL database (from the default SQLite) is heavily endorsed to prevent database locking issues that can arise with multiple users.

Please see the [Running Galaxy in a production environment](/src/admin/config/performance/production-server/index.md) page for more details.

## Keep your code up to date

Galaxy development occurs in [GitHub](https://github.com/galaxyproject/galaxy/). Changes are stabilized in the `release_YY.MM` branches and then merged to `master` for each `YY.MM.point` release.

To be made aware of new Galaxy releases, please join the [Galaxy Developers mailing list](https://lists.galaxyproject.org/lists/galaxy-dev.lists.galaxyproject.org/). Each release is accompanied by [release notes](https://docs.galaxyproject.org/en/master/releases/index.html).

At any time, you can check to see if a new stable release is available by using the `git log` command:

```
$ git log ..origin/master
commit 3a2ff46c28172ef78510f4bea2f4be75ce660667
Merge: 8b538f17f 90de3f258
Author: Martin Cech <cech.marten@gmail.com>
Date:   Wed Feb 22 10:56:57 2017 -0500

    Merge branch 'release_17.01'

```

If `git log` produces no output, Galaxy is up-to-date. If `git log` produces a list of commits, a new version is available. We suggest checking the accompanying [release notes](https://docs.galaxyproject.org/en/master/releases/index.html) first (if the release is to a newer major version of Galaxy), but you can also immediately pull the commits to your local Galaxy clone with:

```
$ git pull
```
<div class="alert alert-info" role="alert">
**Note**: After pulling changes, the Galaxy server needs to be stopped and restarted with the updated code. Restarting will interrupt any running jobs unless you are using a cluster configuration. For more information on how to make Galaxy restartable without interrupting users, see the [production server documentation](/src/admin/config/performance/production-server/index.md).
</div>

<div class="alert alert-warning" role="alert">
**Note**: Occasionally, updated Galaxy code includes structural changes to the database tables. The release notes will alert you if a release contains a database change. After updating and restarting Galaxy, Galaxy will refuse to load and will output an error message indicating that your database has the wrong version. The error message indicates that you should backup your database and run `sh manage_db.sh upgrade`. Follow those instructions carefully, especially the part about backing up your database safely. Database updates are carefully tested before release, but it is good practice to be able to back out if something goes wrong during an update.
</div>

In the unlikely event that something goes wrong with updated code, you can return to an older release by using the release tag name from the [release list](https://docs.galaxyproject.org/en/master/releases/) page and the `git checkout` command. For example, to return to the latest version of the January 2015 release, use:

```sh
$ git checkout release_15.01
```

You can also use tags to check out specific releases:

```sh
$ git tag
v13.01
v13.01.1
v13.02
 ...
v16.01
v16.04
v16.07
v16.10
v17.01
```

Restore the fresh backup if a database update was required, and then restart Galaxy to get back to where you started.

## Troubleshooting

* Offline start: The initial Galaxy run requires Internet access to download the pre-built Python wheels of Galaxy's dependencies.

* The basic Galaxy install is a single-user instance and is only accessible by the local user. As with many web-based applications, enable cookies in the web-browser for full functionality.

* A common practice when using any web browser is to stay current with software updates to maximize performance and security. If moving forward to [production server](/src/admin/config/performance/production-server/index.md) with login enabled, please make sure you and your end-users are current.

* Some tools shipped with Galaxy have dependencies that need to be satisfied manually. Please see details [here](/src/admin/config/tool-dependencies/index.md).

# Additional Info

## Get Galaxy without Git

If you don't have [Git](http://git-scm.com/) (and thus cannot run the `git` command), you can download Galaxy in an archive instead: [zipped](https://github.com/galaxyproject/galaxy/archive/master.zip) or [tar/gzipped](https://github.com/galaxyproject/galaxy/archive/master.tar.gz).

Be aware that using archives makes it more difficult to stay up-to-date with Galaxy code because there is no simple way to update the copy.

## Get Galaxy for Development

If you're doing development or making changes to Galaxy, it is best practice to fork Galaxy in GitHub and update to/from your fork. See the [GitHub fork documentation](https://help.github.com/articles/fork-a-repo/) for details.

## Shutting down Galaxy

Below are simplified instructions for shutting down local Galaxy server. If your configuration is more complicated, getting help from an administrator is recommended.

### The Galaxy process is running in the background
  * If Galaxy was the last process running within a terminal window, bring it into the foreground with the command `fg` and shut down with `Ctrl-c`.
  * If Galaxy is one of many processes running in the background within a terminal window, find it with the command `jobs`. The list of jobs will be numbered. Bring the Galaxy job to the foreground with the command `fg <number_of_the_job>` and shut down with `Ctrl-c`.

### I have lost the terminal window running Galaxy
  * From another terminal window, find all active processes with the command `ps`. The list of processes will each have a process ID (called PID). The target process will be named similiar to `/path/to/galaxy/.venv/bin/python2.7 .venv/bin/uwsgi [additional arguments]`. Stop it with the command `kill PID`, where "PID" is the actual process ID number.
  * If you kill only the process named `sh run.sh`, this will result in conflicts and Galaxy will not restart. If you did this or are simply getting errors when trying to restart Galaxy, the solution is to kill the process above before restarting Galaxy again.

## Installation automation

If you're looking to automate your installation, try the [Galaxy Ansible Training](https://training.galaxyproject.org/training-material/topics/admin/tutorials/ansible-galaxy/tutorial.html) that's available from the Galaxy Training Network. Alternatively you can look into Galaxy [KickStart Ansible playbook](https://github.com/ARTbio/GalaxyKickStart).
