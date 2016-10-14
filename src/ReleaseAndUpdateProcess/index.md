---
autotoc: true
title: Galaxy Release and Update Process
---




# Release Process

## Repositories, Branches and Tags

There are two Galaxy repositories:

* [galaxy-central](https://bitbucket.org/galaxy/galaxy-central/) - The active development repository, all commits go here, all pull requests should be created against it.
* [galaxy-dist](https://bitbucket.org/galaxy/galaxy-dist/) - The deployment repository, this is where people deploying Galaxy servers should pull from. Its `stable` branch is rapidly updated from galaxy-central's `stable` branch. galaxy-dist provides a buffer in the event that a bad commit is pushed to galaxy-central and needs to be stripped.

The Galaxy repositories always contain at least two branches:

* `default` - Contains active development (in galaxy-central) and is analogous to an *unstable* version of Galaxy. galaxy-dist's `default` branch is not updated and should not be used.
* `stable` - Production servers should always run on `stable`.

In addition, just prior to a stable release, galaxy-central will contain a `next-stable` branch, explained below.

Each release on the `stable` branch gets two tags:

* `release_<YYYY>.<MM>.<DD>` - A fixed tag pointing to the changeset identified as the release.
* `latest_<YYYY>.<MM>.<DD>` - A moving tag that is updated to point to the latest change on the stable branch for the given release.

## Releases

Stable releases of Galaxy occur on a roughly two month cycle. This is the point at which new features are added from the `default` branch. Two weeks prior to the stable release, we follow this process:

1. The `next-stable` branch in [galaxy-central](https://bitbucket.org/galaxy/galaxy-central/) is opened by merging all of the changes from `default`. New features are frozen from this branch during the duration of its existence.
1. [usegalaxy.org](https://usegalaxy.org/) is updated to the `next-stable` branch.
1. For the following two weeks, bugs in `next-stable` are identified and fixed.
1. On the release date
    a. `next-stable` is merged to `stable`
    a. The `release` and `latest` tags for this release are created
    a. galaxy-central is pushed to galaxy-dist

The `release` tag is used to create a fixed point - this tag will always point to the changeset that was identified as the release for that date. However, its use is discouraged. The `latest` tag initially starts at the same changeset as the `release` tag but as bug fixes are committed to the `stable` branch, the `latest` tag is updated to point at the most recent `stable` version. Thus, it should always be safe to update Galaxy using the `latest` tag corresponding to the stable release you are currently running.

# Updating Galaxy

## Intra-release updates

Because new features, changes to configuration files, database migrations, tool migrations, and other major functionality differences only occur with new releases, Galaxy administrators are encouraged to stay up-to-date with the most recent changes for their release with this process:

1. `hg pull -u latest_<YYYY>.<MM>.<DD>`
1. Restart all Galaxy server processes

## Upgrading to a new release

Larger sites are encouraged to run a testing/QA Galaxy server to identify any problems that might occur with the upgrade *before* upgrading production servers.

To upgrade to a new release, the following process can be followed:

1. Read the [Galaxy News Brief](https://wiki.galaxyproject.org/DevNewsBriefs/) for the release you are upgrading to, as well as any other releases newer than your current Galaxy version.
1. Check for differences between the old versions of Galaxy configuration files and new ones. There's no trivial process for this right now, but Bitbucket does make it fairly easy on a per-file basis, through the following steps:
    a. Locate the desired config file in the source, e.g. [universe_wsgi.ini.sample](https://bitbucket.org/galaxy/galaxy-dist/src/tip/universe_wsgi.ini.sample?at=stable)
    a. Click the **Diff** button.
    a. In the **Diff from** box, choose a suitably old revision (at least as old as your current Galaxy version). The **to** box should already be populated with the most recent revision.
    a. Make note of any changes and incorporate them in to your config file, if necessary.
1. Back up your database
1. Pull the new release: `hg pull -u latest_<YYYY>.<MM>.<DD>`
1. Upgrade your database with `sh manage_db.sh upgrade`
1. Restart the Galaxy server. If you are running a multiprocess Galaxy server, restart **one** Galaxy server process. If any tools were migrated from the distribution to the Tool Shed since your previous release, Galaxy will stop and inform you of this (be sure to scroll up and take note if there was more than one migration version since your Galaxy release).
    a. To install the migrated tools from the Tool Shed, follow the instructions given by Galaxy, e.g. `sh ./scripts/migrate_tools/0003_tools.sh install_dependencies`. A backup of `tool_conf.xml` will be made and the tools will be installed from the Tool Shed, added to `migrated_tools_conf.xml` and removed from `tool_conf.xml`.
    a. To continue without installing the migrated tools, remove the migrated tools from your `tool_conf.xml` (if you have no local tools in `tool_conf.xml` you can simply `cp tool_conf.xml.sample tool_conf.xml` and start the server again.
1. If you are running a multiprocess Galaxy server, retart the remaining server processes.

The config files that typically should be checked and merged from the upstream source are `universe_wsgi.ini.sample`, and `datatypes_conf.xml.sample`. A full list of sample files that are installed can be found in [scripts/common_startup.sh](https://bitbucket.org/galaxy/galaxy-dist/src/tip/scripts/common_startup.sh?at=stable). Most of these rarely change and many are for features that are not commonly used, so most deployers will not need to track changes in all of them.

# Additional Information

* [/Admin/GetGalaxy](/Admin/GetGalaxy) - Basic instructions for getting and running the Galaxy code
* [/Admin/Config/Performance/ProductionServer](/Admin/Config/Performance/ProductionServer) - Details for running a "production" Galaxy server
* [usegalaxy-playbook](https://github.com/galaxyproject/usegalaxy-playbook) - The [Ansible](http://www.ansible.com) playbook used by the Galaxy Team to update [usegalaxy.org](https://usegalaxy.org/)
