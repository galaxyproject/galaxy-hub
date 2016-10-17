---
autotoc: true
title: January 11, ,,  2013 Galaxy Development News Brief
---
<div class='right'></div>



<br />
# Get Galaxy

<table>
  <tr>
    <td rowspan=3 style=" border: none;"> <a href='http://getgalaxy.org/'><img src='http://galaxy.psu.edu/static/getgalaxy.png' alt='getgalaxy' width=70 /></a> &nbsp;&nbsp; </td>
    <td colspan=2 style=" border: none;"> <strong><a href='http://getgalaxy.org'>getgalaxy.org</a></strong> </td>
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
    <td style=" border: none;"> <strong>new</strong>: </td>
    <td style=" border: none;"> <code>$ hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist </code> </td>
  </tr>
  <tr>
    <td style=" border: none;"> <strong>upgrade</strong>: </td>
    <td style=" border: none;"> <code>$ hg pull -u -r a4113cc1cb5e </code> </td>
  </tr>
</table>


<br />
<br />

# Tool shed repository dependencies

Repositories in the tool shed can contain a file named **repository_dependencies.xml** that defines dependency relationships between repositories.  Repository dependency definitions are currently supported only within the same tool shed.  In other words, a repository in a local tool shed cannot require a repository in the main Galaxy tool shed.  Support for repository dependencies across tool sheds will be available some time in the future.

There are three categories of repository dependencies which will be discussed in the following sections of this page: simple repository dependencies, repository dependencies that define tool dependencies and repository dependencies that define data dependencies. [Read more…](http://wiki.galaxyproject.org/DefiningRepositoryDependencies) 

<br />
# Other Tool Shed
**[/Tool Shed](/Tool Shed)**

### Galaxy fixes and enhancements related to tool shed features

1. Fix for displaying an installed repository that includes one or more `README` files. For details about the `README` files feature, see the wiki page at: [ToolShedReadmeFiles](http://wiki.galaxyproject.org/ToolShedReadmeFiles).
2. Various enhancements to tool shed containers to enable features when tool shed repositories are installed in Galaxy.
3. Add the ability to view an [SVG image](http://www.w3.org/Graphics/SVG/) of a workflow contained in a tool shed repository installed into a Galaxy instance. This feature is the same as the feature that has been available in the tool shed for some time.
4. Fix for displaying an installed tool shed repository in an error state.

### Galaxy tool shed fixes and enhancements

1. The Galaxy tool shed functional test framework has undergone significant enhancements.  For details about running the tool shed functional test framework against your local tool shed, see the wiki page at: [Functional test framework for the tool shed](http://wiki.galaxyproject.org/HostingALocalToolShed#Functional_test_framework_for_the_tool_shed).
2. Make functional tests explicitly specify which shed tool config to use.  This fixed a bug that resulted in the `migrated_tools_conf.xml` file being altered in some cases when the tool shed functional test framework was run against a local tool shed.


<br />
# Data

1. Many new reference genome datasets, indexes, and liftOver files have been added to the **public [/Main](/src/Main/index.md) Galaxy instance** and **rsync** download area ([get the data](http://wiki.galaxyproject.org/Admin/Data%20Integration#Get_the_data)). Among these, the following full reference genomes sourced from **[UCSC](http://genome.ucsc.edu/)** were added:
  * `Budgerigar Sep. 2011 (WUSTL v6.3/melUnd1)`
  * `Chicken Nov. 2011 (ICGSC Gallus_gallus-4.0/galGal4)`
  * `Cow Oct. 2011 (Baylor Btau_4.6.1/bosTau7) (bosTau7)`
  * `Dog Sep. 2011 (Broad CanFam3.1/canFam3) (canFam3)`
  * `Medium ground finch Apr. 2012 (GeoFor_1.0/geoFor1)`
  * `Naked mole-rat Jul. 2011 (BGI HetGla_1.0/hetGla1)`
  * `Pig Aug. 2011 (SGSC Sscrofa10.2/susScr3) (susScr3)`
  * `Rat Mar. 2012 (RGSC 5.0/rn5)`
  * `S. cerevisiae Apr. 2011 (SacCer_Apr2011/sacCer3) (sacCer3)`
  * `Tasmanian devil Feb. 2011 (WTSI Devil_ref v7.0/sarHar1)`
  * `Tenrec July 2005 (Broad/echTel1) (echTel1)`
  * `Turkey Dec. 2009 (TGC Turkey_2.01/melGal1)`
  * `X. tropicalis Nov. 2009 (JGI 4.2/xenTro3) (xenTro3)`
2. #2 Additional genomes, indexes, and related datasets will continue to be published over the next several weeks and highlights will appear in subsequent News Briefs.
3. #3 The genome "`Yeast (Saccharomyces cerevisiae): Saccharomyces_cerevisiae_S288C_SGD2010`" has been discovered to be mislabeled, representing the Apr. 2011 release from SGD (not Feb. 2010), which makes it identical to the "`sacCer3`" genome from UCSC. This genome will be redacted on the [/Main](/src/Main/index.md) server and users should migrate to using the "`sacCer3`" genome build as the alternative. Any chromosome naming issues associated with the `Saccharomyces_cerevisiae_S288C_SGD2010 build` (due to names of format "chr3" instead of the author published "chrIII") will also be resolved by migrating to this new, correct, reference genome build.

<br />
# Visualization

1. Enable BBI data provider to work when chromosome naming conventions are mixed.
  * e.g. "chr1" and "1" now both resolve to the same chromosome
  * `lib/galaxy/visualization/data_providers/genome.py`
2. #2 Fix bugs that prevented the creation of a Circster visualization from a dataset's visualization icon.

<br />
# User Interface (UI)

### General
1. Make Galaxy Q&A URL optional and disable by default.
### Admin
2. #2 Make left panel scroll properly on smaller screens.
3. #3 Select all checkbox added for job management. 

<br />
# Security Fixes

Although there are no specific known security fixes in this distribution, all Galaxy instance maintainers are *strongly encouraged* to run the latest release to take advantage of other improvements and fixes.

<br />
# Bug Fixes and related Enhancements

### General
1. Fixes to IE-related caching and debugging.
2. Purge and deletion of datasets in the history panel no longer refresh entire panel and preserve user's 'Include deleted datasets' choice properly.
3. Fix to `tool.xml force_history_refresh` flag handling in the history panel. The panel will now refresh entirely when a dataset from a tool with this setting finishes.
4. Fix for tabular dataset download when the dataset had greater than 50 columns.
### Workflows
5. #5 Enhance `Tool.check_and_update_param_values_helper()` to check that the type of value provided is valid for the input parameter currently declared. Fixes issue where a server error would occur within workflows when a parameter's type has changed to a non-compatible one: e.g. conditional group changed to dataset input.
6. #6 Fix for workflow editor when a missing tool is connected to a valid tool. Javascript error would previously cause the 'Loading worflow editor...' modal window to spin indefinitely.
### Tools
7. #7 When listing GenomeSpace directories in GenomeSpace export tool, if an API-discovered URL is invalid, skip gracefully.

<br />
# Announcements

[/News](/src/News/index.md), ***[January 2013 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2012_13)***

<div class='right'>
<a href='http://wiki.galaxyproject.org/Events/GCC2013/TrainingDay'><img src='/Images/Logos/GCC2013TrainingDayLogo300.png' alt='Training Day' width="160" /></a>
<br />
<a href='http://wiki.galaxyproject.org/Community/GalaxyAdmins/Meetups/2013_01_16'><img src='/Images/Logos/GalaxyAdmins.png' alt='January 2013 GalaxyAdmins Meetup' width="160" /></a>
</div>

* [GCC2013](http://wiki.galaxyproject.org/Events/GCC2013):
  * [GCC2013 Training Day Topic Nomination closes TODAY](http://wiki.galaxyproject.org/Events/GCC2013/TrainingDay)
  * Training Day Topic Voting will open later this month
* The [next meeting](http://wiki.galaxyproject.org/Community/GalaxyAdmins/Meetups/2013_01_16) of the [GalaxyAdmins Group](http://wiki.galaxyproject.org/Community/GalaxyAdmins) will be held on [January 16, 2013, at 10 AM Central US time](http://wiki.galaxyproject.org/Community/GalaxyAdmins/Meetups/2013_01_16). 
  * [John Chilton](https://www.msi.umn.edu/users/chilton) of the [Minnesota Supercomputing Institute](https://www.msi.umn.edu/) will cover "Deploying Production Galaxy Environments on [OpenStack](http://www.openstack.org/) with [CloudBioLinux](http://cloudbiolinux.org/) and [CloudMan](http://usegalaxy.org/cloud)"


---
<br />
# About Galaxy
**[GalaxyProject.org](http://galaxyproject.org)**

The **[Galaxy Team](http://wiki.galaxyproject.org/GalaxyTeam)** is a part of **[BX](http://www.bx.psu.edu/)** at [Penn State](http://www.psu.edu/), and the **[Biology](http://www.biology.emory.edu/)** and **[Mathematics and Computer Science](http://www.mathcs.emory.edu/)** departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at **Twitter [@galaxyproject](http://twitter.com/#galaxyproject)** or just read our tweets **[Galaxy on Twitter](http://wiki.galaxyproject.org/Galaxy on Twitter)**

Have a suggestion? Please see **[Using the Galaxy Issue Board](http://wiki.galaxyproject.org/Issues)**.
