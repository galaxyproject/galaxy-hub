<div class='right'>TABLE_OF_CONTENTS(1)</div>

```wiki red/solid/light
Due to a security vulnerability, administrators are strongly encouraged to upgrade to the [April 8, 2013 Security Release](/News/2013_04_08_Galaxy_Security_Release), which is was not included in the original April 1, 2013 distribution.```

<br />

<div class="title">April 1, 2013 Galaxy Distribution News Brief</div>

<br />
# Get Galaxy
*Please note new* **upgrade** *syntax*
<table>
  <tr>
    <td rowspan=3 style=" border: none"> <a href='http://getgalaxy.org/'><img src='http://galaxy.psu.edu/static/getgalaxy.png' alt='getgalaxy' width=70 /></a> &nbsp;&nbsp; </td>
    <td colspan=2 style=" border: none"> <strong><a href='http://getgalaxy.org'>getgalaxy.org</a></strong> </td>
  </tr>
  <tr>
    <td style=" border: none"> <strong><a href='http://galaxy-dist.readthedocs.org'>galaxy-dist.readthedocs.org</a></strong> </td>
    <td style=" border: none"> </td>
  </tr>
  <tr>
    <td style=" border: none"> <strong><a href='http://bitbucket.org/galaxy/galaxy-dist'>bitbucket.org/galaxy/galaxy-dist</a></strong> </td>
    <td style=" border: none"> </td>
  </tr>
  <tr>
    <td style=" border: none"> </td>
  </tr>
  <tr>
    <td style=" border: none"> <strong>new</strong>: </td>
    <td style=" border: none"> <code>$ hg clone https://bitbucket.org/galaxy/galaxy-dist#stable </code> </td>
  </tr>
  <tr>
    <td style=" border: none"> <strong>upgrade</strong>: </td>
    <td style=" border: none"> <code>$ hg pull </code> <br /> <code>$ hg update release_2013.04.01 </code> </td>
  </tr>
</table>

<br />
<br />
# Key Upgrades This Release
This distribution has **four key upgrades that must be considered** by local administrators. 

These are listed first. Each is important. ***Please review carefully.***

<br />
# Improvements to Distribution Release Process
As announced in the [February 8, 2013](http://wiki.galaxyproject.org/DevNewsBriefs/2013_02_08) distribution, we have made some improvements to our release process. Because of these changes, ***you must include the new distribution release tag in your `hg update` command to upgrade to this distribution release*** and all future releases.

As a reminder, or if this is your first upgrade using the new process, this is how to upgrade:

```console
% hg pull
% hg update release_2013.04.01
```


If you do not include the `release_2013.04.01` tag, your repository will update to the `default` branch, which includes unstable code.  After updating, you can verify that you are on the `stable` branch with:

```console
% hg branch
stable
```


Once you're on the `stable` branch, `hg pull -u` without a specific revision or branch will cause you to remain on the `stable` branch.

The new release process works as such:

1. The Galaxy source repository now contains two branches:
  * `stable` is committed to regularly and contains important bugfixes.
  * `default` is committed to regularly and contains new features as well as fixes merged from `stable`.
1. Every two months, `stable` will be updated with new features from default and a specific distribution release version will be tagged.
1. The two weeks prior to the release will be focused on fixing bugs found in the targeted upcoming release. New features will not be considered for inclusion in the upcoming release during this time.

This process will not only allow us to deploy important bug fixes on to the `stable` branch rapidly and in between releases, it will improve the quality of our tagged releases. The documentation at our wiki reflects these changes: [getgalaxy.org](http://wiki.galaxyproject.org/Admin/Get%20Galaxy).

<br />
# Job Running Configuration Changes
***This Galaxy release contains considerable changes to the way that the job running configuration is defined and implemented***.  It also includes a *refactoring of all job runner plugins* that are provided with the Galaxy source.  We have made every attempt to make upgrading to this release possible while jobs are running and without any configuration changes.  

That said, job running is a complex component that relies on many outside components and an infinite array of site-specific environments, so we cannot guarantee that Galaxy will correctly convert jobs to the new job definition language in all scenarios.  

***It is strongly advised that you do upgrade testing against a non-production instance with running jobs before upgrading any production instances if you do not want to risk having to restart any jobs running at the time that Galaxy is upgraded to this release.***  

If you only use the default/local job running configuration, you can ignore the following process, as local jobs running at the time of restart can never be recovered (as has been the case in all prior releases).

The process for upgrading to this release should be:

1. Pull and update to the release as documented (above), but do not restart any Galaxy server processes.
1. Stop and permanently disable the `manager` process, as there is no longer a dedicated process for assigning job handlers (it is done at the time of job creation).
1. Create a ` `job_conf.xml` ` ( most easily done by starting with the provided ` `job_conf.xml.sample_advanced` `).
  * When defining ` `<plugin>` ` tags, the ` `id` ` attribute must match the URL scheme for any jobs currently running which you want to recover.  For example, jobs running via ` `pbs:///` ` will be recovered by the plugin with id ` `pbs` `.  Likewise for ` `drmaa:///` ` and the ` `drmaa` ` plugin.
1. Restart handler(s) (preferably one at a time) and watch the logs.  Warnings about using the deprecated ` set_runner() ` function can be ignored as this is part of the process of converting jobs from URLs to destinations upon first startup.

As explained above, it is not strictly required that you switch to the new-style configuration.  All old-style URL options should continue to work, however, it is strongly encouraged that you update to the new-style configuration for the advanced features (and future flexibility) it provides.

Full documentation on the new job running configuration is available at:
* [http://wiki.galaxyproject.org/Admin/Config/Jobs](http://wiki.galaxyproject.org/Admin/Config/Jobs)
* [http://wiki.galaxyproject.org/Admin/Config/Performance/Cluster](http://wiki.galaxyproject.org/Admin/Config/Performance/Cluster)

<br />
# Required Metadata Reset

*** It is critical that you reset the metadata on your installed tool shed repositories when you upgrade your Galaxy instance to this revision! ***

When a tool shed repository is installed into your local Galaxy instance, metadata is generated for the repository as a part of the installation process and stored in the tool_shed_repository.metadatatable column in the Galaxy database. This automatic process inspects the contents of the specific revision of the installed repository and generates and stores important information about it. This metadata information is used by certain Galaxy features. As new features are added to Galaxy or the tool shed, the process that generates this installed tool shed repository metadata within the Galaxy instance may be enhanced to accommodate information about the new features. [Read more…](http://wiki.galaxyproject.org/ResettingMetadataForInstalledRepositories)

<br />
# Local Tool Shed File Changes
***Changes required to your environment if you are hosting a local Tool Shed***

The tool shed used to be named the * "Galaxy Community Space" *, so there are several files that used to be named something "community" related (e.g., `community_wsgi.ini, run_community.sh`, etc).  In addition, many code files were named with the "community" string.  These various references to "community" have now been changed to "tool_shed".  So, if you are [hosting your own local tool shed](http://wiki.galaxyproject.org/HostingALocalToolShed), be aware that the following file names have changed:

1. community_wsgi.ini => tool_shed_wsgi.ini
1. run_community.sh => run_tool_shed.sh
1. community_webapp.log => tool_shed_webapp.log

The original ` community_wsgi.ini ` file had this entry:
```
[app:main]
# Specifies the factory for the universe WSGI application
paste.app_factory = galaxy.webapps.community.buildapp:app_factory
```


The above entry should be changed to the following in your local renamed ` tool_shed_wsgi.ini ` file (notice that "community" has been changed to be "tool_shed"):
```
[app:main]
# Specifies the factory for the universe WSGI application
paste.app_factory = galaxy.webapps.tool_shed.buildapp:app_factory
```


<br />
# Python 2.5 Support Ending Soon

This is last Galaxy distribution that will support Python 2.5. Follow the ticket: http://trello.com/c/OQT8Iun8

<br />
# Data
1. The Galaxy Main **Rsync** server hosts download of the same `.loc` files and genome data used by the Galaxy team. This service now also hosts all pre-cashed datasets, such as MAF, blastdb, etc. Our updated wiki lists the available directories: [Get the data](http://wiki.galaxyproject.org/Admin/Data%20Integration#Get_the_data)

1. **Basic Data Manager Functionality** is now present for locally defined and Tool Shed installed data managers ([/Admin/Tools/DataManagers](/Admin/Tools/DataManagers)).

An abstracted interface has been created for the data manager to download, generate, or otherwise procure locally cached data for use in analyses. For details about implementation, please see the following Trello tickets.
* In Galaxy:
  * https://trello.com/c/Rport5vq
  * https://trello.com/c/5NlsdGsr
  * https://trello.com/c/Xaddebyn
  * https://trello.com/c/fbIPwLJz
  * https://trello.com/c/yAZRrZHj
* Integration with the Tool Shed:
  * https://trello.com/c/nDZB3l78
  * https://trello.com/c/lHwb1m0O

<br />
# Tool Shed
**[/Tool Shed](/Tool Shed)**

### New Tool Shed Features

1. The following scripts are available for inspecting and maintaining the repositories contained within a local tool shed that you are hosting.  You can configure ` cron ` to execute these scripts on a regular schedule or execute them manually against your local tool shed whenever you choose.  Each of these scripts is configured to execute regularly against both of the public tool sheds supported by the core Galaxy development team.  [Read more...](http://wiki.galaxyproject.org/Tool%20Shed#Scripts_for_inspecting_and_maintaining_the_repositories_contained_within_a_tool_shed)

1. A ` RESTful API` framework has been added to the tool shed.  [Read more...](http://wiki.galaxyproject.org/ToolShedApi)

1. Add the ability to view lists of tool shed repositories that are ready for review or have tools with invalid functional tests.  These lists are available only to members of the Intergalactic Utilities Commission.

1. New lists of Valid Galaxy Utilities are now available in the tool shed allowing you to inspect more granular contents of repositories.  Lists of tools, custom datatypes, repository dependency definitions and tool dependency definitions are currently available.  The framework supporting this feature will be used to enhance searching the tool shed in a future Galaxy release where you will be able to search the tool shed for any of these galaxy utilities (currently you can only search for tools and workflows).

![](/Images/NewsGraphics/2013_04_01_granular-galaxy-utilities.png)


### Enhancements to existing Tool Shed features

1. In addition to repository owners, users with write permission on a repository can now browse reviews of that repository. [See the details...](http://wiki.galaxyproject.org/ReviewingToolShedRepositories#Repository_owners_and_users_with_write_permission_can_read_reviews_and_undertake_recommended_actions)

1. The sharable link for repositories has been enhanced to include a specific ` changeset revision ` if the link is not for the repository tip.

1. Sharable links have been added to email alerts messages for new or updated repositories in the tool shed.

1. Many additional tests have been added to the tool shed functional test framework. The Tool Shed's [functional test framework defined](http://wiki.galaxyproject.org/HostingALocalToolShed#Functional_test_framework_for_the_tool_shed).

1. Handle all Galaxy utility types (custom datatypes, data manager tools, tools, tool dependency definitions, repository dependency definitions, workflows) when reinstalling an uninstalled tool shed repository. The shed-related tool panel configuration file can now be selected when reinstalling repositories with any contents so that a different "tool_path" location can be selected for the location of the reinstalled repository.

1. Enhance the hours_between_check config setting to handle float values in addition to int values. This allows for functional tests to test the Galaxy update manager.

1. Enhance tool shed repository metadata generation process for custom datatypes to include information for datatypes converters and display applications. Correctly handle setting the "add_too_tool_panel" attribute for datatype converter tools so that they will not be displayed in the Galaxy tool panel when they are contained in installed tool shed repositories.

1. Handle tool shed repositories that contain only tools that should not be displayed in the Galaxy tool panel from those that contain tools that should be displayed in the Galaxy tool panel appropriately. Selecting a tool panel section is no longer allowed for repositories that do not contain any tools that should be displayed there. This behavior now exists when installing or reinstalling repositories into Galaxy.

1. Enhancements and fixes for sharable URLs for repositories in the tool shed - the following URLs are now all available:
```
/view/{owner}
/view/{owner}/{name}
/view/{owner}/{name}/{changeset_revision}
```


### Tool Shed Fixes

1. Fix for handling custom datatype definitions in repositories being installed from the tool shed when only datatypes that subclass from those in the Galaxy framework are defined (i.e., there are no custom datatype class files for the datatypes). In addition, this changeset now properly handles installing a tool shed repository that included custom datatype definitions (they were failing due to a bug in this same method).

1. Fix for installing a repository from the tool shed that includes a repository dependency definition where the required repository is owned by a user other than the dependent repository.

1. Fix for installing a repository that only contains a workflow, then importing that workflow to Galaxy.

1. Fix for deleting and undeleting repositories in the tool shed: if deleting, all installable revisions are marked as not installable, and if undeleting, all revisions are inspected and those determined to be installable are marked accordingly.

1. Handle exceptions when attempting to parse a datatypes_conf.xml file in a tool shed repository.  Also handle exceptions when attempting to parse certain other xml definition files contained in tool shed repositories.

1. Require and pass-through authentication for the 'pushkey' mercurial command when pushing changes to a tool shed repository.

1. Display an error message when cookies are blocked between the tool shed and Galaxy.

1. Tool configs included in repositories in the tool shed that display images in the tool's help section will need to use the new reserved word ` $PATH_TO_IMAGES ` when defining the location of the image files as follows:

``` .. image:: $PATH_TO_IMAGES/count_modes.png ```


This reserved word will route correctly in the tool shed when the tool is displayed inside of it's containing repository, and it will also route correctly when the tool is loaded from it's repository after it has been installed into Galaxy.  [All the details...](http://wiki.galaxyproject.org/ToolShedToolFeatures#Properly_defining_the_location_of_images_in_tool_configuration_files)

<br />
# Trackster
1. Performance enhancements https://trello.com/c/JYGO5hqM
2. Collapsed composite tracks now retain the composite group name https://trello.com/c/roHlElAW

<br />
# CloudMan
http://usegalaxy.org/cloud
1. Condor introduced: [HTCondor](http://wiki.galaxyproject.org/CloudMan/HTCondor) https://trello.com/c/te1UVkam
  * Condor will allow federation of clusters, at first with manual configuration.
  
<br />
# Workflows
1. Expose function that creates SVG images from workflows to UI https://trello.com/c/PGz7JNzO

<br />
# UI
1. Genetrack retired (view link in datasets removed) https://trello.com/c/LQr88MTz
2. UI Refactoring of links to display at UCSC https://trello.com/c/ugHUBEk2
3. Use "Chunked Tabular Dataset View" to display public datasets https://trello.com/c/p6lyDBNK

<br />
# Admin
1. "Select all" jobs in admin menu https://trello.com/c/Sc975x1l
1. Allow old-style external display applications to be disabled https://trello.com/c/9dgk1VSl
  * related improvements pending: https://trello.com/c/uIctksud

<br />
# Source
### Pull Requests Merged
1. Refactoring Task Splitting Toward Per-Job Definitions, pull request **[#87](https://bitbucket.org/galaxy/galaxy-central/pull-request/87)**. Thanks to [John Chilton](http://jmchilton.net/). https://trello.com/c/04FGD1Fv
2. Adding variable 'host_url' to provide qualified URL of host to tool help section, pull request **[#119](https://bitbucket.org/galaxy/galaxy-central/pull-request/119)**. Thanks to [Kyle Ellrott](https://bitbucket.org/kellrott). https://trello.com/c/RuO0tJ7r
3. Display the toolshed tools in the workflow search, pull request **[#120](https://bitbucket.org/galaxy/galaxy-central/pull-request/120)**. Thanks to [Björn Grüning](https://bitbucket.org/BjoernGruening). https://trello.com/c/ebePONBa

<br />
# Security Fixes

Although there are no specific known security fixes in this distribution, all Galaxy instance maintainers are *strongly encouraged* to run the latest release to take advantage of other improvements and fixes.

<br />
# Bug Fixes and related Enhancements
1. Assign proper job state to uploaded, deleted, files https://trello.com/c/IdS6EYwE
1. UI Refactoring: more graceful handling of individual hda errors https://trello.com/c/qIPH1bJP
1. Screencast display window size corrected (was too small) https://trello.com/c/QTZLmi70
1. Restored header/"no peek" window content for datasets without UI display https://trello.com/c/zlEnYNjY
1. Markupsafe reimport for both local and cloud instances https://trello.com/c/IIInOBNr
1. File name issues with Torque and DRMAA fixed https://trello.com/c/4F2VXZBw
1. Left panel in admin view not scrollable https://trello.com/c/lK4YHKV3
1. Bowtie2 wrapper usage with samtools fixed https://trello.com/c/v9G7v5DV
1. Fix "File Upload -> File Format" list to reflect settings in datatypes_conf.xml https://trello.com/c/5ageaGBd
1. Fix drillDown fields and parameters display https://trello.com/c/JN8495Up
1. Scatter plot tool treats empty/absent values as NULL values instead of errors https://trello.com/c/BmoMaPXc


<br />
# Announcements

[/News](/News), ***[April 2013 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2013_04)***

## GCC2013

<div class='left'><a href='/Events/GCC2013.md'><img src='/Images/Logos/GCC2013Logo200.png' alt='2013 Galaxy Community Conference (GCC2013)' width="150" /></a></div> 

<div class='right'><a href='/Events/GCC2013/TrainingDay.md'><img src='/Images/Logos/GCC2013TrainingDayLogo200.png' alt='2013 Galaxy Community Conference (GCC2013) Training Day' width="150" /></a></div> 
<br />
<br />
<br />
<br />
<br />
<br />
----
<br />
# About Galaxy
**[GalaxyProject.org](http://galaxyproject.org)**

The **[Galaxy Team](http://wiki.galaxyproject.org/GalaxyTeam)** is a part of **[BX](http://www.bx.psu.edu/)** at [Penn State](http://www.psu.edu/), and the **[Biology](http://www.biology.emory.edu/)** and **[Mathematics and Computer Science](http://www.mathcs.emory.edu/)** departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at **Twitter [@galaxyproject](http://twitter.com/#galaxyproject)** or just read our tweets **[Galaxy on Twitter](http://wiki.galaxyproject.org/Galaxy on Twitter)**

Have a suggestion? Please see **[Using the Galaxy Issue Board](http://wiki.galaxyproject.org/Issues)**.
