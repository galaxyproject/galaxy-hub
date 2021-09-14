---
title: Development News Brief
date: 2013-06-03
---

[All News Briefs](/src/docs/index.md)

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
    <td style=" border: none;"> <code>$ hg pull </code> <br /> <code>$ hg update release_2013.06.03 </code> </td>
  </tr>
</table>

<br />
<br />

<br />
# Release Process

If you need a refresher about how to update or this is your first update in a while, please review the instructions at **[Get Galaxy](http://getgalaxy.org)**. Even more details are in the **[prior News Brief](http://wiki.galaxyproject.org/DevNewsBriefs/2013-04-01)**.

<br />
# Python 2.5 Support Has Ended

As of this release, Galaxy no longer supports Python 2.5. More in the ticket: http://trello.com/c/OQT8Iun8

<br />
## Required metadata reset for installed tool shed repositories

### It is critical that you reset the metadata on your installed tool shed repositories when you upgrade your Galaxy instance to this revision!

When a tool shed repository is installed into your local Galaxy instance, metadata is generated for the repository as a part of the installation process and stored in the tool_shed_repository.metadatatable column in the Galaxy database. This automatic process inspects the contents of the specific revision of the installed repository and generates and stores important information about it. This metadata information is used by certain Galaxy features. As new features are added to Galaxy or the tool shed, the process that generates this installed tool shed repository metadata within the Galaxy instance may be enhanced to accommodate information about the new features. [Read more…](http://wiki.galaxyproject.org/ResettingMetadataForInstalledRepositories)

<br />
# Tool Shed

**[Tool Shed](/src/toolshed/index.md)**

### New Tool Shed Features

#### Resetting metadata on your repositories

There may be occasions when the entire changelog should be inspected and all of the metadata reset on it.  You can reset all metadata on a repository that you are authorized to change by selecting the **Reset all repository metadata** option from the **Repository Actions** menu.  Sometimes it may be necessary to reset metadata on multiple repositories.  For example, if metadata is changed for a repository that is a dependency of another repository, it may be necessary to reset all metadata on each of the repositories in the dependency chain.  [Read more…](http://wiki.galaxyproject.org/RepositoryRevisions#Resetting_metadata_on_your_repositories)


### Tool Shed feature enhancements

1. #1 Supported tags sets for the tool_dependencies.xml file
  Several new tags and attributes are supported for tool dependency definitions.  These tags and attributes are supported when installing repositories with tool dependencies in either a browser or using the enhanced Galaxy API.  [Read more…](http://wiki.galaxyproject.org/ToolShedToolFeatures#Supported_tags_sets_for_the_tool_dependencies.xml_file)

1. #2 The bells and whistles of tool dependency definitions
  In some cases, a dependency definition author may want to write a definition whose dependency package (e.g., osra) can require a previously compiled binary (e.g., graphicsmagick) during compilation as well as tool execution time when the tool is using the compiled [osra] binary.  This is possible using a combination of three tool dependency definition tag sets, which must be defined in the tool_dependencies.xml file in the order discussed here.  [Read more…](http://wiki.galaxyproject.org/ToolShedToolFeatures#The_bells_and_whistles_of_tool_dependency_definitions)

1. #3 Framework enhancements that process repository_dependencies.xml files
  Several enhancements have been made to the Tool Shed framework that processes repository dependency definitions contained in a repository_dependencies.xml file in a repository.  Both of the previously required "toolshed" and "changeset_revision" attributes are now optional, and a new tag attribute is supported for ordering the installation of repository dependencies.  This new attribute named "prior_installation_required", and if set to True in the repository dependency definition for a certain repository XYZ, then Galaxy's repository installation process will ensure that the required repository (XYZ's defined repository dependency) is installed prior to the installation of XYZ.  These enhancements are supported when installing repositories with repository dependencies in either a browser or using the enhanced Galaxy API. 
  [Read more…](http://wiki.galaxyproject.org/DefiningRepositoryDependencies#Simple_repository_dependencies)

1. #4 The automated tool test framework
  The Tool Shed includes an extensive installation and test framework that works with repositories that contain valid tools.  It is designed to be executed by cron regularly and sends email notification to a mail list when each run is completed.  The framework is very flexible.  It can be executed automatically or manually on a single repository revision or all revisions of all repositories in the tool shed.  [Read more…](http://wiki.galaxyproject.org/AutomatedToolTests)

1. #5 The Tool Shed API
  The `RESTful` Tool Shed API has been significantly enhanced.  [Read more…](http://wiki.galaxyproject.org/ToolShedApi)

1. #6 Tool Shed Functional Test Framework
  Many additional tests have been added to the tool shed functional test framework.  [Read more…](http://wiki.galaxyproject.org/HostingALocalToolShed#Functional_test_framework_for_the_tool_shed)

### Miscellaneous Tool Shed fixes and enhancements

1. Enhance the Repositories that contain tools with invalid functional tests grid to allow for sorting by repository owner.  Enhance several of the repository review grids to enable sorting by repository owner.
1. Clean up the main repositories by category grid and add a tools verified column.
1. Raise exceptions when tool dependency definition `<install>` and `<set_environment>` tags define an unsupported version attribute.
1. Add more granular lists of writable repositories for the current user: repositories with missing tool test components, repositories with failing tool tests and repositories with no failing tool tests.
1. Move the *My invalid tools* menu item in the tool shed to a grid that filters to the latest metadata revision.
1. The "Repository Actions" menu has been standardized so that the menu is virtually the same on all pages.
1. Attempt to standardize the main page title for repository pages in the tool shed by displaying the repository name.
1. Enable dynamic configuration of message box content and visibility in the wsgi .ini file. Display the configured brand, if any, in the <title> element.
1. For tool dependencies whose installation ended in an error, still display them when attempting to uninstall them.
1. Enhancements for the tool shed repository View changeset page: display the commit message, display both the ctx rev and the changeset hash in the title bar, and add Previous changeset and Next changeset buttons to allow for easier scrolling through the repository changelog.
1. Fix for reinstalling an uninstalled repository when leaving the no changes checkbox checked and entering text into the new tool panel section field.
1. Keep all contents (including comments) of dependency definition files when re-writing them to include missing toolshed and `changeset_revision` attributes.
1. Eliminate the use of Galaxy's `elementree` egg within the tool shed.

### Accepted Tool Shed pull requests

Support for Toolsheds with external auth enabled, pull request **[#155](https://bitbucket.org/galaxy/galaxy-central/pull-request/155)**. Thanks to [Roy Storey](https://bitbucket.org/kiwiroy).

### Tool Shed Tickets

<table>
  <tr>
    <td> <a href='https://trello.com/c/49vjZrJy '>https://trello.com/c/49vjZrJy </a></td>
    <td> <a href='https://trello.com/c/zd0v8jHq '>https://trello.com/c/zd0v8jHq </a></td>
    <td> <a href='https://trello.com/c/20EykJrK '>https://trello.com/c/20EykJrK </a></td>
    <td> <a href='https://trello.com/c/G3MAzlEC '>https://trello.com/c/G3MAzlEC </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/9yERGRt8 '>https://trello.com/c/9yERGRt8 </a></td>
    <td> <a href='https://trello.com/c/wNdXNOGU '>https://trello.com/c/wNdXNOGU </a></td>
    <td> <a href='https://trello.com/c/ezExflJd '>https://trello.com/c/ezExflJd </a></td>
    <td> <a href='https://trello.com/c/iICpByzT '>https://trello.com/c/iICpByzT </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/IXJjuXTm '>https://trello.com/c/IXJjuXTm </a></td>
    <td> <a href='https://trello.com/c/Djda4lD0 '>https://trello.com/c/Djda4lD0 </a></td>
    <td> <a href='https://trello.com/c/hdV3C24u '>https://trello.com/c/hdV3C24u </a></td>
    <td> <a href='https://trello.com/c/Qi7QRgdT '>https://trello.com/c/Qi7QRgdT </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/45TRG5DY '>https://trello.com/c/45TRG5DY </a></td>
    <td> <a href='https://trello.com/c/0Cljlxt3 '>https://trello.com/c/0Cljlxt3 </a></td>
    <td> <a href='https://trello.com/c/KQd4j3lz '>https://trello.com/c/KQd4j3lz </a></td>
    <td> <a href='https://trello.com/c/mqigrjfr '>https://trello.com/c/mqigrjfr </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/QTeSmNSs '>https://trello.com/c/QTeSmNSs </a></td>
    <td> <a href='https://trello.com/c/O9YmzUT4 '>https://trello.com/c/O9YmzUT4 </a></td>
    <td> <a href='https://trello.com/c/71Bx8TcB '>https://trello.com/c/71Bx8TcB </a></td>
    <td> <a href='https://trello.com/c/2tkPpVkL '>https://trello.com/c/2tkPpVkL </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/0zvUBdJJ '>https://trello.com/c/0zvUBdJJ </a></td>
    <td> <a href='https://trello.com/c/HTJWRo3Z '>https://trello.com/c/HTJWRo3Z </a></td>
    <td> <a href='https://trello.com/c/AhNBPA8K '>https://trello.com/c/AhNBPA8K </a></td>
    <td> <a href='https://trello.com/c/hlYDzFQW '>https://trello.com/c/hlYDzFQW </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/hXNIbIMh '>https://trello.com/c/hXNIbIMh </a></td>
    <td> <a href='https://trello.com/c/ZDRQ6m3Y '>https://trello.com/c/ZDRQ6m3Y </a></td>
    <td> <a href='https://trello.com/c/17HndRkh '>https://trello.com/c/17HndRkh </a></td>
    <td> <a href='https://trello.com/c/QY0Z7L7p '>https://trello.com/c/QY0Z7L7p </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/ghUbjr8c '>https://trello.com/c/ghUbjr8c </a></td>
    <td> <a href='https://trello.com/c/iKiZytSf '>https://trello.com/c/iKiZytSf </a></td>
    <td> <a href='https://trello.com/c/awKBxrGy '>https://trello.com/c/awKBxrGy </a></td>
    <td> <a href='https://trello.com/c/noxRnGEv '>https://trello.com/c/noxRnGEv </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/ondndIfd '>https://trello.com/c/ondndIfd </a></td>
    <td> <a href='https://trello.com/c/3TGyWggI '>https://trello.com/c/3TGyWggI </a></td>
    <td> <a href='https://trello.com/c/zfQaURtr '>https://trello.com/c/zfQaURtr </a></td>
    <td> <a href='https://trello.com/c/MxgHVnT9 '>https://trello.com/c/MxgHVnT9 </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/ZoslAcBD '>https://trello.com/c/ZoslAcBD </a></td>
    <td> <a href='https://trello.com/c/dL8dGPYf '>https://trello.com/c/dL8dGPYf </a></td>
    <td> <a href='https://trello.com/c/YRsP3wpS '>https://trello.com/c/YRsP3wpS </a></td>
    <td> <a href='https://trello.com/c/wJN65GdV '>https://trello.com/c/wJN65GdV </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/wJN65GdV '>https://trello.com/c/wJN65GdV </a></td>
    <td> <a href='https://trello.com/c/dcT7qOfc '>https://trello.com/c/dcT7qOfc </a></td>
    <td> <a href='https://trello.com/c/SMdJQ5zn '>https://trello.com/c/SMdJQ5zn </a></td>
  </tr>
</table>


<br />
# Tools

1. `GenomeSpace`: Update `serverurl.properties` file location to work around issue with jumbo frames. https://trello.com/c/7tZli0PH
1. *MAF to BED* corrected to fix problem with false error states. https://trello.com/c/y55KbTRt
1. `STDERR` and `STDOUT` will now show beginning and end of contents, instead of just the beginning, when truncated. https://trello.com/c/v31ECJPr
1. Fix displaying `STDERR` and `STDOUT` links in dataset info. https://trello.com/c/2ZTg6Tiq
1. Auto Focus on first item on forms. https://trello.com/c/etlSFyEr
1. Clarify tool tip FASTQ Summary Statistics. https://trello.com/c/LX0ma0uQ
1. Resolve `BSD/GNU` grep version behavior differences. https://trello.com/c/dPUZ9zEA
1. Filter and Sort: "Select" tool, improved handling of special characters. https://trello.com/c/cwrBpNP9
1. Change file-merging to use copy.copyfileobj() rather than cat and mv. https://trello.com/c[/Gaqoc6H8](/src/archive/dev-news-briefs/2013-06-03/Gaqoc6H8/index.md)
1. Data Manager: Fix for detecting job error in data manager tools; needed as a result of recent job flow changes. https://trello.com/c[/EtXd4zqq](/src/archive/dev-news-briefs/2013-06-03/EtXd4zqq/index.md)

<br />
# Scatterplot

1. Enhancements to handlers, display, and data input parsing. https://trello.com/c/5jk3k7Td

<a href='/src/archive/dev-news-briefs/2013-06-03/index.md'><img src="/src/images/news-graphics/2013_06_03_scatterplot-1.png" alt="scatterplot" width=500 /></a>

<br />
# Trackster

1. Composite track improvements. https://trello.com/c/hPcrKfJl
1. Insert a button for Trackster Visualization into data display viewer. https://trello.com/c/KGNfWZEH
1. Add Bigwig support for BAM coverage. https://trello.com/c/GV7nTlg9
1. VCF visualization in trackster. https://trello.com/c/1dj3lTtU

<br />
# Histories & Datasets

1. Delete Hidden Datasets menu option. https://trello.com/c/0SoREcMn
1. When copying datasets to the current history always refresh history. https://trello.com/c/jY5HSdu1

<br />
# Libraries

1. Library API problem in galaxy-central default but not stable. https://trello.com/c/TbWP1tad

<br />
# UI

1. Unicode fixes for previewing large datasets. https://trello.com/c/BHRKkcaw
1. Unicode fixes for uploading by file in upload tool. https://trello.com/c[/O0M8W8X8](/src/archive/dev-news-briefs/2013-06-03/O0M8W8X8/index.md)
1. Unicode fixes for displaying saved workflows in **Tool Menu**. https://trello.com/c/dAuDcE99
1. Unicode fixes for form builder and toolparameters. https://trello.com/c/nVldKDiL
1. Fix for `TabularToolDataTable.get_column_name_list()` when value column is overloaded by e.g. name. https://trello.com/c/6fPCLwn5
1. Tool Parameter Validator: `MetadataInDataTableColumnValidator` fix issue where validator's list of valid options would become stale when e.g. a Data Manager was run. https://trello.com/c/dSEOinly

<br />
# Admin

1. Stop jobs on history deletion. https://trello.com/c/LBZxfcjx
1. Track down decorator import failure that shows on some machines (see ticket). https://trello.com/c[/It6q5Ul8](/src/archive/dev-news-briefs/2013-06-03/It6q5Ul8/index.md)
1. Do not allow deleted datasets to be viewed / downloaded. https://trello.com/c/elIs7IHc
1. Reports app: Fix util clash due to bad imports. https://trello.com/c/5d7EeeTq

<br />
# Core

1. Unify Web/API Transactions. https://trello.com/c/c5wZPVGd
1. Eliminate `PasteScript` startup. https://trello.com/c/Q4bJNZuo
1. Upgraded `SQLAlchemy`. https://trello.com/c[/Q6kBeBy](/src/archive/dev-news-briefs/2013-06-03/Q6kBeBy/index.md)D
1. Error Logging with `Sentry`. https://trello.com/c/Yc1LXXTR

<a href='/src/archive/dev-news-briefs/2013-06-03/index.md'><img src="/src/images/news-graphics/2013_06_03_sentry-1.png" alt="sentry-1" width=600 /></a>

<a href='/src/archive/dev-news-briefs/2013-06-03/index.md'><img src="/src/images/news-graphics/2013_06_03_sentry-2.png" alt="sentry-2" width=500 /></a>

<br />
# Pull Requests Merged

1. Significantly enhance job resource definitions. https://trello.com/c/uNpYoYov
1. More even distribution of job scheduling. https://trello.com/c/wBDXGcx2
1. Workflows batch mode enhancements. **[#75](https://bitbucket.org/galaxy/galaxy-central/pull-request/75)**. Thanks to [John Chilton](http://jmchilton.net/). https://trello.com/c[/UoBadE0f](/src/archive/dev-news-briefs/2013-06-03/UoBadE0f/index.md)
1. Parallelism does work with from_work_dir attribute. **[#156](https://bitbucket.org/galaxy/galaxy-central/pull-request/156)**. Thanks to [John Chilton](http://jmchilton.net/). https://trello.com/c/5fFZSCWn
1. Galaxy Search Engine. **[#137](https://bitbucket.org/galaxy/galaxy-central/pull-request/137)**. Thanks to [Kyle Ellrott](https://bitbucket.org/kellrott). https://trello.com/c/moZezGDP
1. Validation on optional multi-select lists. **[#154](https://bitbucket.org/galaxy/galaxy-central/pull-request/154)**. Thanks to [John Chilton](http://jmchilton.net/). https://trello.com/c/5PxgbL0b

<br />
# Security Fixes

Although there are no specific known security fixes in this distribution, all Galaxy instance maintainers are *strongly encouraged* to run the latest release to take advantage of other improvements and fixes.

<br />
# Bug Fixes

1. Dataset display now honors preview flag. https://trello.com/c/p7zeJHlX
1. Bug fix to report's web application. https://trello.com/c/o0S3klAF
1. Correct display and masthead bugs upon logout/login cycle. https://trello.com/c/Dw0bUCv3, https://trello.com/c/cvzBIb63
1. Fix problem where jobs were unable to run when job limits were set. https://trello.com/c/6vxkqdjT
1. Fix Bug causing both upload_async_message and tool_executed.mako to refresh the history panel on upload. https://trello.com/c/8urL3hGW
1. Fix Tophat2 Wrapper to properly quote read group attribute values. https://trello.com/c/nDBz5eoR
1. Fix bug admin jobs `'AttributeError: 'NoopQueue'` object has no attribute 'job_lock'. https://trello.com/c/uBlCbOFs
1. `ToolDataTables`: Fix loading .loc files from locations other than galaxy's `tool_data`. https://trello.com/c/Xedp7bo5
1. Fix API External Authentication. https://trello.com/c[/UjBbWw4](/src/archive/dev-news-briefs/2013-06-03/UjBbWw4/index.md)A
1. Fix non-persistent workflow step hiding. https://trello.com/c/sVKvrw67
1. Fix problem with search in workflow editor. https://trello.com/c/sAsC6lAK
1. Fix to add confirm on delete permanently (footer button), saved histories. https://trello.com/c/8nUlUMew
1. "Stop job" function in jobs admin interface corrected (as of April 2013 release). https://trello.com/c/3vkBCaWf

<br />
# Project Updates

**[News](/src/news/index.md)**, ***[June 2013 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2013-06)***

<br />
<br />
# GCC2013

<div class='left'><a href='/src/events/gcc2013/index.md'><img src="/src/images/logos/GCC2013Logo200.png" alt="2013 Galaxy Community Conference (GCC2013)" width="150" /></a></div> 

<br />
<br />
<br />
<br />
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
