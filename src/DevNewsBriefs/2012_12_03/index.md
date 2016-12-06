---
autotoc: true
title: December 03, 2012 Galaxy Development News Brief
---
<div class='right'></div>



<br />
# Get Galaxy

<table>
  <tr>
    <td rowspan=3 style=" border: none;"> <a href='http://getgalaxy.org/'><img src="http://galaxy.psu.edu/static/getgalaxy.png" alt="getgalaxy" width=70 /></a> &nbsp;&nbsp; </td>
    <td colspan=2 style=" border: none;"> <strong><a href='http://getgalaxy.org'>getgalaxy.org</a></strong> </td>
  </tr>
  <tr>
    <td style=" border: none;"> <strong>new</strong>: </td>
    <td style=" border: none;"> <code> $ hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist </code> </td>
  </tr>
  <tr>
    <td style=" border: none;"> <strong>upgrade</strong>: </td>
    <td style=" border: none;"> <code> $ hg pull -u -r f364d992270c </code> </td>
  </tr>
</table>


<br />
<br />

# Bowtie and Lastz Migration to Tool Shed

The alignment tools **'Bowtie**' and **'Lastz**' from the tool group **NGS: Mapping** have moved from the **[Galaxy distribution](https://bitbucket.org/galaxy/galaxy-dist)** to the **[Galaxy Main Tool Shed](http://toolshed.g2.bx.psu.edu/)**.

<div class='right'><a href='http://toolshed.g2.bx.psu.edu'><img src="/src/images/Logos/ToolShed.jpg" alt="tool shed" width="150px" /></a></div>

Migration scripts for both **[Bowtie](http://bowtie-bio.sourceforge.net/index.shtml)** and **[Lastz](http://www.bx.psu.edu/~rsharris/lastz/)** will run upon Galaxy's first launch (after updating to this release) that will automatically handle installing replacement tool wrappers from the Tool Shed. Primary executables for **[Bowtie](http://bowtie-bio.sourceforge.net/index.shtml)** and **[Lastz](http://www.bx.psu.edu/~rsharris/lastz)** plus target reference genomes should still be installed as described in the Galaxy wiki - start in the **[Tool Dependencies](/src/Admin/Tools/Tool Dependencies/index.md)** section.

**Bowtie** is an ultrafast, memory-efficient short read aligner. It aligns short DNA sequences (reads) to the human genome at a rate of over 25 million 35-bp reads per hour. Bowtie indexes the genome with a Burrows-Wheeler index to keep its memory footprint small: typically about 2.2 GB for the human genome (2.9 GB for paired-end).

Langmead B, Trapnell C, Pop M, Salzberg SL. *[Ultrafast and memory-efficient alignment of short DNA sequences to the human genome](http://genomebiology.com/2009/10/3/R25)*. Genome Biol 10:R25. 

**LASTZ** is a program for aligning DNA sequences, a pairwise aligner. Originally designed to handle sequences the size of human chromosomes and from different species, it is also useful for sequences produced by NGS sequencing technologies such as Roche 454.

Harris, R.S. (2007) *[Improved pairwise alignment of genomic DNA](http://www.bx.psu.edu/~rsharris/rsharris_phd_thesis_2007.pdf )*. Ph.D. Thesis, The Pennsylvania State University. 

<br />
## New Galaxy CloudMan Release

**[CloudMan](http://usegalaxy.org/cloud)**

[CloudMan](/src/CloudMan/index.md) offers an easy way to get a personal and completely functional instance of Galaxy in the cloud in just a few minutes, without any manual configuration.

This update brings a large number of updates and new features, the most prominent ones being:
* Support for Eucalyptus cloud middleware; thanks to Alex Richter. Also, CloudMan can now run on the HPcloud in basic mode (note that there is no public image available on the HPcloud at the moment and one would thus need to be built by you).
* Added a new file system management interface on the CloudMan Admin page, allowing control and providing insight into each available file system
* Added quite a few new user data options. See the [UserData page](/src/CloudMan/UserData/index.md) for details; thanks to [John Chilton](http://bitbucket.org/jmchilton).
* Galaxy can now be run in multi-process mode; thanks to [John Chilton](http://bitbucket.org/jmchilton).
* Added Galaxy Reports app as a CloudMan service; thanks to [John Chilton](http://bitbucket.org/jmchilton).
* Introduced a new format for cluster configuration persistence, allowing more flexibility in how services are maintained
* Added a new file system service for instance's transient storage, allowing it to be used across the cluster over NFS. The file system is available at `/mnt/transient_nfs` just know that any data stored there will not be preserved after a cluster is terminated.
* Support for [Ubuntu 12.10](http://releases.ubuntu.com/quantal/)
* Worker instances are now also SGE submit hosts

This update comes as a result of 175 code changesets; for a complete list of changes, see the [commit messages](https://bitbucket.org/galaxy/cloudman/changesets/tip/3a63b9a40331%3A35baec1). 

**Any new cluster will automatically start using this version of CloudMan. Existing clusters will be given an option to do an automatic update once the main interface page is refreshed.**

<br />
# Tool Shed

**[Tool Shed](/src/Tool Shed/index.md)**

### Improvements in the display of repository dependencies and contents in the tool shed

<div class='indent'> 

The various types of contents of a tool shed repository ( valid tools, invalid tools, datatypes, workflows ) as well as the dependencies that are defined for the repository are now displayed in clickable containers that can be opened or closed.  For example here is the view of the emboss_5 repository that I'm hosting on my local Galaxy tool shed.  

Notice the "Repository dependencies" container?  This is currently in development, and will be available in the tool shed shortly.  This container displays the list of all repositories int he tool shed upon which this repository depends.

![](/src/images/NewsGraphics/2012_12_03_emboss-sample.png)

Opening each of the above containers (by clicking on the links) displays the contents of each.

![](/src/images/NewsGraphics/2012_12_03_emboss-sample-open.png)

</div>

### Functional test framework for the tool shed

<div class='indent'> In addition to its rich set of features, the Galaxy tool shed provides a suite of functional test scripts that ensure the features behave as expected.  This test framework is very similar to the functional test framework provided for Galaxy itself, and consists of files mostly contained within the `~/test/tool_shed` directory hierarchy in the Galaxy root directory. [Read more…](http://wiki.galaxyproject.org/HostingALocalToolShed#Functional_test_framework_for_the_tool_shed).
</div>

### Miscellaneous tool shed enhancements and fixes

1. You can now configure the directory location for the tool shed's `hgweb.config` file using the following setting in your `community_wsgi.ini` file. Configuring this location is highly recommended, but if you choose not to, a new `hgweb.config` file will automatically be created in the default location (the Galaxy root directory).

<div class='indent'>
```
# Where the hgweb.config file is stored.  The default is the Galaxy installation directory.
#hgweb_config_dir = <some directory path>
```


Backups will be made of the `hgweb.config file` (in the same directory in which it is located) any time a new repository is added to your tool shed, so configuring it to be located in it's own directory has benefits. You can also choose to change the configured location over time, and simply move the `hgweb.config` file to that new location before starting your tool shed server, and everything should work as expected.
</div>

2. #2 Implement a new `HgWebConfigManager` to manage the tool shed's hgweb.config file.  This will greatly diminish file i/o for the tool shed.

3. #3 When defining dependencies for tools contained in a repository, allow for environment variables that contain neither `REPOSITORY_INSTALL_DIR` nor `INSTALL_DIR`; thanks to [James Johnson](http://bitbucket.org/jjohnson). Allowing these values to be set in a single location rather than hard-coded into each config file is the best approach.  Here's an example:

<div class='indent'>
```
<environment_variable name="GATK2_SITE_OPTIONS" action="set_to">
        "--num_threads 4 --num_cpu_threads_per_data_thread 3 --phone_home STANDARD"
</environment_variable>
```

</div>
4. #4 Move the important details to the beginning of the "New tool shed repository alert email template" and include the repository name in the email subject line; thanks to [Peter Cock](https://bitbucket.org/peterjc).

5. #5 Don't allow reviewing empty repositories in the tool shed.

6. #6 Provide a warning message when uploading files to a toolshed repository and a `tool_dependencies.xml` has been provided, but `tool_dependencies` metadata has not been generated.

<br />

# User Interface (UI)

1. Introduction of the dataset "Paused" state and basic "Resume-Paused" functionality for a history.
2. Adjustments and fixes to history panel layout.
3. Added back in "display" and "edit" attribute buttons to datasets in the error state.
4. Scatterplot visualization tool: updated layout of features.
5. Updated History Pull-down menu. Options affect all datasets in the current history:
  * Resume Paused Jobs - a single-click resume of all paused datasets
  * Collapse Expanded Datasets - a single-click to collapse all expanded datasets
  * Show/Hide Deleted Datasets - a single-click toggle to show or hide all deleted datasets
  * Show/Hide Hidden Datasets - a single-click toggle to show or hide all hidden datasets
  * Unhide Hidden Datasets - a single-click to change state of hidden datasets to that of regular datasets

![](/src/images/NewsGraphics/2012_12_03_new-history-menu.png)

<br />
# Job Runner

1. The query for determining which jobs are ready to run has been significantly optimized. Heavily loaded multiprocess Galaxy installations should see increased performance in job dispatch and finish times.
2. Jobs and their outputs are no longer set to an error state when their inputs fail to complete successfully.  Instead, they are moved to a "paused" state.  In the distribution release following this, it will be possible to rerun the failed jobs and continue paused jobs from the point of failure.
3. The `SGE` runner has been deprecated for a long time, and has finally been completely removed. The `DRMAA` runner should be used to connect to `SGE` clusters.
4. The `check_galaxy` *[Nagios](http://www.nagios.org/)* script has been updated to be compatible with the new client-side histories.

<br />
# Source

### Miscellaneous Galaxy fixes and enhancements

1. Add the ability to view the current data tables registry.  This new feature is available from the Galaxy Administration menu within the "Server" section, and is labeled "View data tables registry".
2. Since tool migration scripts can be executed any number of times, make sure that no repositories are installed if no tools associated with the migration are defined in the `tool_conf.xml` (or equivalent) file.  This fix is associated only with the recently introduced Galaxy administration UI feature displaying the list of migrations stages currently available in the local Galaxy instance.  This is the way that the migration process at Galaxy server startup always worked, so no changes were needed in that scenario.
3. Maintain entries for Galaxy's `ToolDataTableManager` that are acquired from installed tool shed repositories in a new config file named `shed_tool_data_table_conf.xml`.  This will ensure that manual edits to the original `tool_data_table_conf.xml` file (which has existed for some time) will not be altered or lost when Galaxy's tool shed repository installation process automatically adds entries into the file.
4. Fix for `ToolDataTable` new entries that should have been persisted to the `shed_tool_data_table_conf.xml` file were not being handled correctly.
5. Attempt to make sure `.sample` files included in an installed tool shed repository are copied to the `~/tool-data` directory only if they are sample data index files.
6. Add error messages for a `DataToolParameter` when the provided value is no longer valid due to be deleted or being in an error state.
7. Rework "Re-run" ![](/src/images/Icons/arrow-circle.png) functionality to validate and display errors between the original job and currently set states (e.g. the previously used dataset has been deleted).
8. To help with reproducibility, when extracting a workflow from a history, provide a warning message if the tool version for a job does not match the tool version of the currently loaded tool.

<br />
# Security Fixes

All Galaxy instance maintainers are *strongly encouraged* to run the latest release.

1. Grid filters are now sanitized correctly.

<br />
# Bug Fixes

1. Ensure that slugs cannot be duplicated for active, importable items.
2. Fix paging in embedded grids.
3. When getting job parameters for extracting a workflow from a history, set `ignore_errors to True`. Prevents traceback when e.g. a tool was updated and had a text value changed to an integer.
4. Fix for rendering workflow tooltips when tool help is nonexistent in the wrapper.

<br />
# Announcements

[News](/src/news/index.md), ***[December 2012 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2012_12)***

<div class='right'><a href='/src/events/GCC2013/TrainingDay/index.md'><img src="/src/images/Logos/GCC2013Logo200.png" alt="2013 Galaxy Community Conference (GCC2013)" width="175px" /></a></div>

* [Training Day Topic Nominations](/src/events/GCC2013/TrainingDay/index.md) for [GCC2013](/src/events/GCC2013/index.md) will open in December.  Start thinking of ideas now!
* Slides and Screencast from [November GalaxyAdmins Meetup](/src/Community/GalaxyAdmins/Meetups/2012_11_14/index.md) are online.  The next [GalaxyAdmins Meetup](/src/Community/GalaxyAdmins/Meetups/index.md) will be on [January 16](/src/Community/GalaxyAdmins/Meetups/2013_01_16/index.md) and feature [John Chilton](/src/JohnChilton/index.md) discussing "Deploying Galaxy on OpenStack with CloudBioLinux & CloudMan"
* [A short "Getting started with JGalaxy" document (with screenshots)](http://bit.ly/SkW2yU), by [John Chilton](/src/JohnChilton/index.md)
* [Batch Workflow starting using the Galaxy API : Practical Example by Geert Vandeweyer](http://bit.ly/TjTj6X)

<br />
----
<br />
# About Galaxy

**[GalaxyProject.org](http://galaxyproject.org)**

The **[Galaxy Team](http://wiki.galaxyproject.org/GalaxyTeam)** is a part of **[BX](http://www.bx.psu.edu/)** at [Penn State](http://www.psu.edu/), and the **[Biology](http://www.biology.emory.edu/)** and **[Mathematics and Computer Science](http://www.mathcs.emory.edu/)** departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at **Twitter [@galaxyproject](http://twitter.com/#galaxyproject)** or just read our tweets **[Galaxy on Twitter](http://wiki.galaxyproject.org/Galaxy on Twitter)**
å
