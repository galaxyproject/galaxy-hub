---
autotoc: true
title: August 12, 2013 Galaxy Distribution News Brief
---
<div class='right'></div>

[All News Briefs](/src/DevNewsBriefs/index.md)
<br />
[Distribution Summary 2013_08_12](/src/News/2013_08_12_Galaxy_Distribution/index.md)

<br />



<br />
# Get Galaxy

*Please note new* **upgrade** *syntax*
<table>
  <tr>
    <td rowspan=3 style=" border: none;"> <a href='http://getgalaxy.org/'><img src="http://galaxy.psu.edu/static/getgalaxy.png" alt="getgalaxy" width=70 /></a> &nbsp;&nbsp; </td>
    <td colspan=2 style=" border: none;"> <strong><a href='http://wiki.galaxyproject.org/Admin/Get%20Galaxy'>getgalaxy.org</a></strong> </td>
  </tr>
  <tr>
    <td style=" border: none;"> <strong><a href='http://galaxy-dist.readthedocs.org'>galaxy-dist.readthedocs.org</a></strong> </td>
    <td style=" border: none;"> </td>
  </tr>
  <tr>
    <td style=" border: none;"> <strong><a href='http://bitbucket.org/galaxy/galaxy-dist'>bitbucket.org/galaxy/galaxy-dist</a></strong> </td>
    <td style=" border: none;"> </td>
  </tr>
  <tr>
    <td style=" border: none;"> </td>
  </tr>
  <tr>
    <td style=" border: none;"> <strong>new</strong>: </td>
    <td style=" border: none;"> <code>$ hg clone https://bitbucket.org/galaxy/galaxy-dist#stable </code> </td>
  </tr>
  <tr>
    <td style=" border: none;"> <strong>upgrade</strong>: </td>
    <td style=" border: none;"> <code>$ hg pull </code> <br /> <code>$ hg update release_2013.08.12 </code> </td>
  </tr>
</table>

<br />
<br />
# Core Distribution Process

**If you need a refresher about how to upgrade or this is your first upgrade in a while, please see the latest instructions at [Get Galaxy](http://getgalaxy.org)**. Even more details are outlined in the **[April 2013 News Brief](http://wiki.galaxyproject.org/DevNewsBriefs/2013_04_01)**.

<br />
# Tool Shed Repository Process

## Required metadata reset for installed tool shed repositories

**It is critical that you reset the metadata on your installed tool shed repositories when you upgrade your Galaxy instance to this revision!**
<br />  
When a tool shed repository is installed into your local Galaxy instance, metadata is generated for the repository as a part of the installation process and stored in the `tool_shed_repository.metadatatable column` in the Galaxy database. This automatic process inspects the contents of the specific revision of the installed repository and generates and stores important information about it. This metadata information is used by certain Galaxy features. As new features are added to Galaxy or the tool shed, the process that generates this installed tool shed repository metadata within the Galaxy instance may be enhanced to accommodate information about the new features. [Read more…](http://wiki.galaxyproject.org/ResettingMetadataForInstalledRepositories)


<br />
# Tools

1. **Data Manager**
  * Individual location files are now namespaced when installed from the toolshed, and
  * Will write only to the location files that were installed along with them, when installed from a toolshed. https://trello.com/c/UL2Ripd0
  * Allow a named Tool Data Table to be defined more than once. If column definitions match, allow merging multiple tables. https://trello.com/c/p7I9adrj
  * Permit multiple value translations to be specified per column and also allow multiple types of value translations. https://trello.com/c/n97jX4UN

<br />
# Visualizations

## Framework

1. A visualization is now defined as a page template that is sent certain data. https://trello.com/c/q4Kmfgf8
1. Created flexible (and _backwards compatible_) way to serve data from datasets in useful formats. https://trello.com/c/JzRLiJjA
1. Moved to a 1 file per config in [VisualizationRegistry](http://wiki.galaxyproject.org/VisualizationsRegistry) structure to improve performance. https://trello.com/c/wzbdeFOe
1. New wiki page explaining the first, lowest level of the visualizations framework. [Read it here...](http://wiki.galaxyproject.org/VisualizationsRegistry)

## Fixes

1. **Phyloviz**: Correct d3 translate and node error, and…
1. **Scatterplot**: Correct failure for data provider to get column data from certain datatypes (BED). https://trello.com/c[/ClfwTdwp](/src/DevNewsBriefs/2013_08_12/ClfwTdwp/index.md)
1. **Trackster**: Correct bug where emptying 'Histogram maximum' field causes track to disappear. https://trello.com/c/tnpkT47t

<br />
# Workflows

1. No longer require re-import when a Workflow requires new tools to be installed, and
1. Guarantee reproducibility in all cases by considering tool versions not just tool ids, and
1. Improve linkage/discovery using tool versions to associate lineage. https://trello.com/c/lpS8FKxY
1. Improved import functionality for published workflows. https://trello.com/c/eu8XiJLK

<br />
# UI

1. Upgrade [jQuery to v1.9.1](http://jquery.com/upgrade-guide/1.9/#overview). https://trello.com/c/hIYOsx8T
1. Include ` #<hda_id> ` scroll to usage behavior in history panel. https://trello.com/c[/OcCloWa](/src/DevNewsBriefs/2013_08_12/OcCloWa/index.md)H
1. Tools no longer pop up in the Workflow editor. https://trello.com/c/D7wbwdfc
1. Resume/restart a failed workflow from the point of failure by pausing (not failing) downstream jobs, permitting modifications, then continuing.  https://trello.com/c[/GuDsm5](/src/DevNewsBriefs/2013_08_12/GuDsm5/index.md)MD, https://trello.com/c/kpARiWl5
1. Remove unnecessary display button from uploading hdas (no usable action). https://trello.com/c/DWYuTxtA

## API

1. Allow copy of HDA to Library based on permissions. https://trello.com/c/0d2Ve8WC
1. `raw_data`: allow un-formatted return data. https://trello.com/c/MgXZFFiq
1. Adjust ability to delete histories with correct result: History deleted, HTTP 200 response or History doesn't exist, HTTP 400 response. https://trello.com/c/MQMOHnWE, https://trello.com/c/rSdegG7Z, https://trello.com/c/kjQ1tnzR

<br />
# Admin

1. Better use of Sphinx auto docs: ensure proper settings (in docs makefile) to capture as much in-code documentation as possible. https://trello.com/c/DBQHTP35
1. Add scrollbar to Administration panel. https://trello.com/c/fGc5UniU

<br />
# Core

1. In the client, handle all errors more gracefully and in the worst case, use modal in place of alert. https://trello.com/c[/F535Sdb7](/src/DevNewsBriefs/2013_08_12/F535Sdb7/index.md)
1. Improvements to 'bad gateway' handling by history updater. https://trello.com/c/mIgcF4xQ
1. Move rendering of user quota from the history panel to the masthead template to improve timing of update. https://trello.com/c/eh3yo22z
1. Update pbs_python to 4.3.5. https://trello.com/c/S9l5RRml/967-update-pbs-python

<br />
# Pull Requests Merged

1. Fix problems with set_user_disk_usage.py with Postgres 8.x. **[#97](https://bitbucket.org/galaxy/galaxy-central/pull-request/97)**. Thanks to [Lance Parsons](http://lanceparsons.net/). https://trello.com/c[/Z0Eyn](/src/DevNewsBriefs/2013_08_12/Z0Eyn/index.md)AV2
1. Dynamic Toolbox Filtering. **[#160](https://bitbucket.org/galaxy/galaxy-central/pull-request/160)**. Thanks to [John Chilton](http://jmchilton.net/). https://trello.com/c/k50h7lFt
1. Datatype Tracking Refactoring. **[#86](https://bitbucket.org/galaxy/galaxy-central/pull-request/86)**. Thanks to [John Chilton](http://jmchilton.net/). https://trello.com/c/GH0Bc5ow
1. Fix detection of 2bit files when uploading. **[#170](https://bitbucket.org/galaxy/galaxy-central/pull-request/170)**. Thanks to [Gert Hulselmans](https://bitbucket.org/ghuls). https://trello.com/c/JNpeJgPV (also includes patch)
1. New loc file for SAMtools indexes to support genome variants (backward compatible). **[#188](https://bitbucket.org/galaxy/galaxy-central/pull-request/188)**. Thanks to [Nicola Soranzo](https://bitbucket.org/nsoranzo). https://trello.com/c/P4dFDBLi

<br />
# Tool Shed

**[Tool Shed](/src/Tool Shed/index.md)**

## New Tool Shed Features

1. #1 Repository Types

  The repository types feature in the Tool Shed provides a mechanism for categorizing repositories based on their contents, specifically the set of Galaxy utilities that they contain.  Galaxy utilities are tools, custom datatypes, tool and repository dependency definitions and exported Galaxy workflows.  The list of Galaxy utilities will expand in the future to include other items.  Associating a repository with a type results in certain behaviors related to generating metadata for the repository revisions.  As new repository types are introduced over time, these special behaviors may expand beyond repository metadata.  [Read more…](http://wiki.galaxyproject.org/ToolShedRepositoryFeatures#Repository_Types)

1. #2 Repairing installed tool shed repositories

  One of the features available for repositories installed into Galaxy is the ability to repair the repository and it's dependency hierarchy.  Repairing a repository hierarchy will attempt to ensure all repositories in the hierarchy are correctly installed and all tool dependencies defined for each repository in the hierarchy are correctly installed.  [Read more…](http://wiki.galaxyproject.org/RepairingInstalledRepositories)

## Tool Shed feature enhancements

1. #1 Repositories in the tool shed that contain tools that are not tested for any reason now display a "Not tested" container within the "Automated tool test results" section of the Manage repository page.  This new container displays the reason the tool was not tested.
1. #2 Enhanced tool dependency definition
  * Add support for optionally extracting a file downloaded with the download_file tool dependency action.
  * Add a change_directory action.
  * Contributions from [Björn Grüning](https://bitbucket.org/BjoernGruening) (thanks!) adding support for a `template_command` action type in tool dependency definitions for the tool shed. An example of the new action tag is:
    ```

<action type="template_command" language="cheetah">...</action>
```

1. #3 Allow public usernames in the tool shed to be a minimum of 3 characters instead of the Galaxy minimum of 4 characters.
1. #4 Raise an exception with a useful message if a dependency definition file being uploaded to a repository in the tool shed is missing a required name or owner attribute for a repository dependency.
1. #5 Contribution from [Björn Grüning](https://bitbucket.org/BjoernGruening) (thanks, again!) to extend the valid list of `README` files in tool shed repositories to include .rst files along with his contribution that renders `README` files as restructured text.
1. #6 Pushing changesets to repositories in the tool shed from the command line:
  * Only allow changes to a single file named tool_dependencies.xml to be pushed to a repository whose type is "Tool dependency definition", and
  * For any changes that are made to dependency definition files, validate the attributes of any <repository> tags, making sure that all required attributes (`toolshed, name, owner, changeset_revision`) are defined since automatically populating these attributes is supported only when using the tool shed's upload utility.
1. #7 Tool shed functional test framework
  * Add new Tool shed functional tests for the repository type feature.
  * Add Tool shed functional tests for the ` $ENV[] ` environment variable inheritance feature.
  * Tool shed functional tests for repairing an installed repository.
1. #8 Add the ability to display tool form components that are inside conditionals for tools contained in repositories in the tool shed. 
1. #9 Fix tool shed functional tests recently broken due to experimental rendering of `README` files in tool shed repositories.

## Accepted Tool Shed pull requests

1. A slight variation on [Nicola Soranzo](https://bitbucket.org/nsoranzo)'s pull request (thanks!) **[#176](https://bitbucket.org/galaxy/galaxy-central/pull-request/176)** for fixing large file downloads using `download_by_url`.

## Miscellaneous Tool Shed fixes and enhancements

1. Fix for handling multiple repository installations simultaneously when handle repository dependencies is checked and at least 1 selected repository for installation has no repository dependencies while at least one selected repository for installation does. This scenario occurs only when searching the tool shed for tools rather than browsing it for repositories.
1. Fix for rendering the number of tool dependencies and repository dependencies that failed to install in the tool shed automated test framework rss feed.
1. Make sure custom datatypes contained in newly installed tool shed repositories are loaded into the upload form's File Format select list. Also, when an installed repository is uninstalled, remove the appropriate datatype extensions from the upload form's select list.
1. Fix for setting Galaxy's time interval for checking for updates available for install tool shed repositories.
1. Fixes for rendering Repository Actions menus when browsing the tool shed from Galaxy, and fixes for rendering workflow images for exported workflows contained in tool shed repositories.
1. Fix for handing comments as the last element in a set_environment tag set in tool dependency definitions. Contributed by Adam Novak (thanks!!).
1. Standardize the *Repository Actions* menu for repositories installed into Galaxy.
1. Fix for tool dependency installation when tarballs raise non-fatal errors (e.g., the tarball contains a symlink to a file that does not exist on the local system).
1. Use a template for managing tool dependencies for a specified installed tool shed repository instead of a grid.
1. Fix for allowing the Galaxy admin to select a tool panel section when installing a repository that contains no tools but has repository dependencies that contain tools.
1. Fix for generating information about a repository being installed that has no defined repository dependencies.
1. Enhance tool shed repository installation process to automatically reset the attributes of a previously installed repository (that is no longer in the installed state) so that it can be installed. This streamlines the installation process when installing multiple repositories so that one or more of them do not need to be uninstalled.
1. Add the `threadpool_kill_thread_limit` setting to the tool shed's sample configuration file as well as Galaxy sample configuration file.
1. Enhance the Galaxy API for installing tool shed repositories to make sure the `tool_dependency_dir` setting is defined in the Galaxy configuration file if installing tool dependencies along with repositories.
1. Miscellaneous fixes for managing an installed tool shed repository's tool dependencies.
1. Fix for installing tool dependencies when new_file_path is not set in the Galaxy configuration file.
1. Fix the Galaxy API for installing tool shed repositories when attempting to install a repository that was previously installed but is not longer in the installed state.
1. Fix for checking the Galaxy environment for missing migrated tools at server startup.
1. Contribution from [Björn Grüning](https://bitbucket.org/BjoernGruening) (thanks!!) allowing installation of a repository to progress even if a repository dependency is not available. This will handle the case where a repository dependency's `env.sh` file is not available due to an error in it's installation, but if possible, the dependent repository will proceed with it's installation.
1. Fix to correctly handle comments in repository dependency definitions.
1. Apply [Peter Cock's](https://bitbucket.org/peterjc) (thanks, again!) patch for appending an `.rst` extension to `README` file names in tool shed repositories.
1. Fix for installing a repository with a complex tool dependency where the dependent repository's tool dependency definition does not define any `set_environment` actions.
1. Do not truncate tool test input dataset names, as Galaxy no longer displays them truncated.
1. Clear tool test results when the skip tool tests option is enabled.

### Tool Shed Tickets

<table>
  <tr>
    <td> <a href='https://trello.com/c/h7TpiQVZ '>https://trello.com/c/h7TpiQVZ </a></td>
    <td> <a href='https://trello.com/c/oNcRDQ9E '>https://trello.com/c/oNcRDQ9E </a></td>
    <td> <a href='https://trello.com/c/m65ziCz8 '>https://trello.com/c/m65ziCz8 </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/QIyaZpH5 '>https://trello.com/c/QIyaZpH5 </a></td>
    <td> <a href='https://trello.com/c/wHXz9j0v '>https://trello.com/c/wHXz9j0v </a></td>
    <td> <a href='https://trello.com/c/ZDilg7cx '>https://trello.com/c/ZDilg7cx </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/QUde3Cs8 '>https://trello.com/c/QUde3Cs8 </a></td>
    <td> <a href='https://trello.com/c/cJOjEXAZ '>https://trello.com/c/cJOjEXAZ </a></td>
    <td> <a href='https://trello.com/c/fe3c1gr2 '>https://trello.com/c/fe3c1gr2 </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/v1Gysw0f '>https://trello.com/c/v1Gysw0f </a></td>
    <td> <a href='https://trello.com/c/xVYitush '>https://trello.com/c/xVYitush </a></td>
    <td> <a href='https://trello.com/c/wEENxFhn '>https://trello.com/c/wEENxFhn </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/TXnTThs6 '>https://trello.com/c/TXnTThs6 </a></td>
    <td> <a href='https://trello.com/c/iXG9dsdF '>https://trello.com/c/iXG9dsdF </a></td>
    <td> <a href='https://trello.com/c/lVJGIF0K '>https://trello.com/c/lVJGIF0K </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/ldNz7pCq '>https://trello.com/c/ldNz7pCq </a></td>
    <td> <a href='https://trello.com/c/V1MV8LRZ '>https://trello.com/c/V1MV8LRZ </a></td>
    <td> <a href='https://trello.com/c/tPhefI45 '>https://trello.com/c/tPhefI45 </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/3sAsMYFc '>https://trello.com/c/3sAsMYFc </a></td>
  </tr>
</table>



<br />
# Security Fixes

A security vulnerability was discovered this last release cycle by [Björn Grüning](https://bitbucket.org/BjoernGruening) with Galaxy's "user impersonation" feature that can expose an administrator's active history to users whom they impersonate.  It is corrected by upgrading to this distribution.
<br />
<br />
Details: Only Galaxy instances with `allow_user_impersonation = True` set in their configurations are affected, and only if an administrator makes use of the impersonation feature.  By default, user impersonation is disabled. [Read the original alert email, sent on June 12th, 2013, that includes a work-around should you choose not to upgrade immediately…](http://announce.list.galaxyproject.org/galaxy-announce-Galaxy-Security-Notification-tt4639243.html)

<br />
# Bug Fixes

1. Fix bug where stopping job via admin interface causes exception. https://trello.com/c/qL2IA6dE
1. Fix bug in hpanel (Chrome) related to broken persistent expanded hda views. https://trello.com/c/DOm9g4Bg
1. Fix bug where deleted user Workflows were not removed from tool menu (if added). https://trello.com/c/QgvQF9fr
1. Fix bug in reports webapp imports (thanks to [Lance Parsons](http://lanceparsons.net/)). https://trello.com/c/KJKAgerl
1. Fix bug where Workflow and tool annotations are lost when importing workflows from tool shed repositories. https://trello.com/c/IDxa8RwC
1. Fix bug where setting dataset security was interfering with the the Galaxy UI. https://trello.com/c/URZGsljz
1. Fix bug in proper display of a permanently deleted history. https://trello.com/c/zhj4dbUl
1. Fix bugs with default genome and selection display when adding library data files. https://trello.com/c[/Hr1JdeGq](/src/DevNewsBriefs/2013_08_12/Hr1JdeGq/index.md)

<br />

<div class='right'>
<br /><a href='http://wiki.galaxyproject.org/Events/GCC2013/Photos'><img src="/src/Images/NewsGraphics/2013_08_12_gcc-main-room.jpg" alt="GCC 2013" width=300 /></a><br />**GCC 2013**</div>

# Project Updates

**[News](/src/News/index.md)**, ***[August 2013 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2013_08)***

## GCC 2013 Wrap-up

**[GCC2013 Report](/src/GalaxyUpdates/2013_08/index.md#gcc2013-report):** Meeting summaries, and links to videos, talks, posters, and Training Day materials.
<br />
## New Way to "Use Galaxy"

**[Galaxy Edition of SlipStream:](/src/GalaxyUpdates/2013_08/index.md#slipstream-appliance-galaxy-edition-announced) ***Galaxy*** is now available as an appliance.
<br />
<br />
----
<br />
# About

**[GalaxyProject.org](http://galaxyproject.org)**

The **[Galaxy Team](http://wiki.galaxyproject.org/GalaxyTeam)** is a part of **[BX](http://www.bx.psu.edu/)** at [Penn State](http://www.psu.edu/), and the **[Biology](http://www.biology.emory.edu/)** and **[Mathematics and Computer Science](http://www.mathcs.emory.edu/)** departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at **Twitter [@galaxyproject](http://twitter.com/#galaxyproject)** or just read our tweets **[Galaxy on Twitter](http://wiki.galaxyproject.org/Galaxy on Twitter)**

Have a suggestion? Please see **[Using the Galaxy Issue Board](http://wiki.galaxyproject.org/Issues)**.
