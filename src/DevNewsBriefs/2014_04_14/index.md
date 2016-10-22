---
autotoc: true
title: April 14, 2014 Galaxy Distribution News Brief
---
<div class='right'></div>

[All News Briefs](/src/DevNewsBriefs/index.md)
<br />
[Distribution Summary 2014_04_14](/src/News/2014_04_14_Galaxy_Distribution/index.md)

<br />


# Get Galaxy

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
    <td style=" border: none;"> <code>$ hg pull </code> <br /> <code>$ hg update release_2014.04.14 </code> </td>
  </tr>
</table>


<br />
# Upgrades

* **Review instructions for core build: [Getting the Stable Distribution](http://getgalaxy.org)**
* **Review reset for Tool Shed repos: [Resetting Metadata For Installed Repositories](http://wiki.galaxyproject.org/ResettingMetadataForInstalledRepositories)**

<br />
# Data

1. New and updated reference genomes added to [Rsync](https://wiki.galaxyproject.org/Admin/UseGalaxyRsync) server that mirrors contents of the public Main [http://usegalaxy.org](http://usegalaxy.org) instance
  * New/updated genomes: 115
    * includes hg38
    * note: all available in tool "Extract Genomic DNA"
  * New bowtie indexes: 60
  * New bowtie2 indexes: 115
  * New BWA indexes: 54
  * New lastz indexes: 54
  * New sam indexes: 64
  * New picard (srma) indexes: 59
  * New liftOver mappings: 163
1. MAF hg19 100waymultiz conservation alignment sourced from [UCSC](http://genome.ucsc.edu)
1. Replaced: The sam index for hg_g1k_b37 was updated to use "samtools faidx" with version 0.1.18 (original from GATK 1.4 bundle used 0.1.13). The older index lead to some issues with BAM<->SAM conversion using the newer SAMTools version. 

<br />
# Visualizations

1. Framework turning https://trello.com/c/kdhJ1Dit
1. *Trackster*: 
  * View complete read/feature across tile boundaries, in all tiles https://trello.com/c[/Q03dC1](/src/DevNewsBriefs/2014_04_14/Q03dC1/index.md)QC
  * Better handling of deep coverage regions in read tracks https://trello.com/c/TxxzqWNx

<table>
  <tr>
    <td> <img src="/src/Images/NewsGraphics/2014_04_14_trackster-sparse.png" alt="Galaxy" width="300" /></td>
    <td> <img src="/src/Images/NewsGraphics/2014_04_14_trackster-deep.png" alt="Galaxy" width="300" /></td>
  </tr>
  <tr>
    <td> &nbsp;&nbsp;&nbsp;&nbsp;<strong>Trackster</strong>: Prior coverage display </td>
    <td> &nbsp;&nbsp;&nbsp;&nbsp;New <strong>deep coverage</strong> view </td>
  </tr>
</table>


<br />
# Workflows

1. Prep for dataset collections: Refactor out common logic for running workflows across controllers https://trello.com/c/pdGNjllH

<br />
# UI

1. New/Updated Dataset Action Controls:
  * Located at the top of the history pane
  * Ability to select: all, none, or check individual datasets
  * Actions: Hide, Unhide, Delete, Undelete, Permanently delete (Purge)
  * https://wiki.galaxyproject.org/Learn/ManagingDatasets#Searching_Datasets
  * Additional actions pending review/implementation
  * https://trello.com/c/8gLGPzxV, https://trello.com/c/mq1m6X5M, 
1. When multiple tool versions installed, default to the latest version https://trello.com/c/zRBZ9nvD
1. Better handling when one of many versions of a tool repo is uninstalled https://trello.com/c[/BmdG2201](/src/DevNewsBriefs/2014_04_14/BmdG2201/index.md)
1. Unify the places where histories are shown and used: UI view and in core code https://trello.com/c/7cN0nmKH
1. Configure workflow menu, improve buttons and styling https://trello.com/c/xFzp3lt6
1. Handle disabled `sessionStorage/localStorage` more gracefully in the history pane https://trello.com/c/V2VCxzmx
1. Remove `BaseView` from base-mvc https://trello.com/c/xUV4qvIc
1. Do not serve non-HTML content that may contain `JavaScript` in such a way that web browsers execute it https://trello.com/c/G67ELiMI
1. There are now 2 interfaces to data libraries (the original and new Beta) and feedback is welcomed https://trello.com/c/d3muKvqr
1. Wiki page on how to compile the css. https://wiki.galaxyproject.org/Develop/CSS https://trello.com/c/gLI6hUjN

<br />
# API

1. New functions: 
  * Make histories importable and/or published via the API is now implemented (sharing with individual users a pending feature update) https://trello.com/c/Bcsadi1q
  * History export/import https://trello.com/c/qhu1KdWU
  * Ability to extract workflow from a history to workflows https://trello.com/c/ZTehdMZH
1. Improved history payload and returned error consistency https://trello.com/c/fWC7WgQf
1. Check `ftype` attribute (if defined) on test output datasets https://trello.com/c/hFFlM4gY
1. Published histories contents now fully accessible (no permissions issue) https://trello.com/c/KME3ZRRY
1. Correct exception formats used in history & HDA https://trello.com/c/bS9wY4Ri

<br />
# Core

1. Admin: 
  * History view, allow importing purged datasets https://trello.com/c/tbhpQdMF
  * User list, show 'activated' and 'create_time' columns https://trello.com/c[/C6Mh](/src/DevNewsBriefs/2014_04_14/C6Mh/index.md)EHWo
  * Setting user quota at zero is now permitted (no `ZeroDivisionError`) https://trello.com/c/38NoBtlL
  * Admin user now has permissions to copy datasets from any history to a library https://trello.com/c/Ed91qIUC
  * Improvements to 'Impersonate User' implementation https://trello.com/c/lny2me4u
1. Config: 
  * Rename `tool-data/shared/ucsc/ucsc_build_sites.txt` to `ucsc_build_sites.txt.sample` https://trello.com/c/FTbvqDMd
1. Jobs: 
  * Prevent 'unicode' strings being sent to pbs library as hostname https://trello.com/c/NlFXYDta
  * Fix Torque CLI runner to recognize complete ('C') state as 'ok' https://trello.com/c/vSO52k17
  * Are now cancelled if a running history item is deleted (via API). https://trello.com/c/PDmUdtbw
1. LWR: 
  * Several updates including communication via message queue, more planned https://trello.com/c/6DcXqXNt
  * Introduce and extend along with `ComputeEnvironment`, to eliminate string based path rewriting https://trello.com/c/dL0poowc
1. Eggs: 
  * Guppy 0.1.9+ https://trello.com/c/zeSnHEav
  * Boto 2.25 to facilitate launching into VPC https://trello.com/c/QXfJQhlS
  * PyYAML 3.10 to be used initially with `Cloudlaunch` for parsing `persistent_data yaml` https://trello.com/c/JMZkqBtH

<br />
# Pull Requests Merged

Thanks to our Galaxy community contributors!
1. 309 - Job module for API (list and inspect jobs). Kyle Ellrott. https://trello.com/c/s2Gk6QlH
1. 312 - Remove unused imports and unused variables. Fix spacing. Nicola Soranzo. https://trello.com/c/iWaf1ak4
1. 316 - Fixing non-string parameter selection for job searches. Kyle Ellrott. https://trello.com/c/ZXZ9lEkN
1. 317 - Web API: safer and cleaner workflow parameter passing. Simone Leo. https://trello.com/c[/JaC2](/src/DevNewsBriefs/2014_04_14/JaC2/index.md)EBM8
1. 318 - Adding deleted field to 'to_dict' and search selection of Workflows. Kyle Ellrott. https://trello.com/c/lv9q67nF
1. 315 - Allow jobs to be filtered by tool_id and history_id as well as by state. The tool_id is compared with the like operator. James Johnson https://trello.com/c/dvLvPUmK
1. 322 - Added "ignore lines starting with specific characters" to group tool. Clayton Turner. https://trello.com/c/j6TP6M7m
1. 323 - API methods to access Workflow Usage. Kyle Ellrott. https://trello.com/c[/UetzHj64](/src/DevNewsBriefs/2014_04_14/UetzHj64/index.md)
1. 325 - Use `placeholder` instead of `value` in html5 - editor.mako. Trevor Wennblom. https://trello.com/c/PIZAXsOS
1. 326 - Specify third-party cookies must not be blocked - repository.py. Trevor Wennblom. https://trello.com/c/XsAUr6wl
1. 331 - Code housekeeping: standardize whitespace in various locations. Trevor Wennblom. https://trello.com/c[/WtWdxP2n](/src/DevNewsBriefs/2014_04_14/WtWdxP2n/index.md)
1. 341 - Workflows API enhancements (pull request #337 corrected). Nicola Soranzo and Simone Leo. https://trello.com/c/zizGdqy1
1. 338 - Patch to expose the actual dataset id in the LDDA and HDA to_dict calls (in addition to the instance id). Kyle Ellrott https://trello.com/c[/BrOscq](/src/DevNewsBriefs/2014_04_14/BrOscq/index.md)TJ
1. 339 - Strip trailing slashes in tool IDs. Björn Grüning. https://trello.com/c/bpKNn66u
1. 334 - Optional Input Datasets Not Compatible with Parallelism Tag. Michael Li https://trello.com/c/WMgr8Xx0 https://trello.com/c/Muw6fd8h
1. 346 - Tool panel label bug correction. Nicola Soranzo. https://trello.com/c/8NpgYM3U
1. 353 - Add BCF datatype sniffing, so BCF files are not uncompressed during upload. Nicola Soranzo. https://trello.com/c/FVKZhlsU
1. 355 - Workflow API: show also workflow owner, so a user can check it before importing. Nicola Soranzo. https://trello.com/c/cMiaYcCI

# Fixes

1. Fix issue with tool panel display when the tool_conf.xml has only a single entry https://trello.com/c/6nJIhOdJ
1. Fix issue when multiple versions of the same tool installed results in separate entries in the tool panel https://trello.com/c/SlNI79mR
1. Fix Published Page's JS error https://trello.com/c/yGw1DwwM
1. Fix error in Babel egg utf-8, OSX 10.7 https://trello.com/c/PUdh6SWw
1. Fix failures when using unicode in History name editable_text fields https://trello.com/c/MTdotrHR
1. Fix tool form image display for toolshed installed tools https://trello.com/c/5G6jlB4B
1. Fix to improve link format in user activation emails https://trello.com/c/JALX9DL3
1. Fix problem with rerun of tools having `DataToolParameter` set as optional https://trello.com/c/pzHcSGzK
1. Fix bug in Tool Panel when installing repositories https://trello.com/c[/AiUefff](/src/DevNewsBriefs/2014_04_14/AiUefff/index.md)C

<br />
# Tool Shed

**[Tool Shed](/src/Tool Shed/index.md)**
## Documentation

1. Reorganization of the Tool Shed wiki is underway! See current changes https://wiki.galaxyproject.org[/ToolShed](/src/DevNewsBriefs/2014_04_14/ToolShed/index.md) and what is next up https://trello.com/c/Gg0jnll7
1. Data Manager documentation specific to toolshed http://wiki.galaxyproject.org/Tool%20Shed#The_contents_of_your_tool_shed_repository https://trello.com/c/OPOakK4w

## Repositories

1. New Tool Shed categories https://trello.com/c/niCdaARH
  * Genome-Wide Association Study
  * Imaging
  * RNA
1. Add support for the new repository type: Repository suite definition https://trello.com/c/sxXMmfLs
1. Enhancements for updating a repository https://trello.com/c/c4Y9t7db
  * Will now trigger the install of new dependencies
  * Handles newly defined repository dependencies included in updates to installed repositories
1. Defined a base set of utilities that can be expected to be on systems into which tool dependencies are being installed https://trello.com/c/gYlRdqwr, related to project-in-planning https://trello.com/c/7VTlX9rD
1. Dependency `ez_setup.py` added to keep `package_pysam_0_7_7` from failing on tool shed https://trello.com/c/AkACDWix
1. Update Main Tool Shed `Picard` repo that contained invalid tools https://trello.com/c/mxxHWxLY
1. Update `FreeBayes` repo so that it specifies precompiled binaries in dependency definition https://trello.com/c/zYoVHKoV
1. Update `EMBOSS` repo so that it downloads a precompiled platform-specific binary https://trello.com/c/iW3Amhl5

## Install and Test Framework

1. Tool shed install and test framework now works with API driven tool tests https://trello.com/c/vfr7b0VK
1. Eliminate the use of fabric as the installation process for repositories https://trello.com/c/zJoRROvv
1. Test script to provide coverage for recently discovered scenario that produced a white ghost upon Galaxy install https://trello.com/c/JICmJueB
1. Test script to provide coverage for recently introduced repository administration feature https://trello.com/c/vjTrhIST
1. Test script to check toolshed dependency files for broken/invalid download URLs https://trello.com/c/i4GVgZwS

## Tool Shed Fixes

1. Fix setup_r_environment broken in central repo https://trello.com/c/zyCzlgzo
1. Fix scenario where by uninstalling and reinstalling a repository that has been updated creates database entries for repositories that are persistently in the New state https://trello.com/c/iUDUM4Ut
1. Fixes in automated test framework https://trello.com/c/QWgsgll8
1. Fix bug in install and test framework related to samtools migration https://trello.com/c/sN2iLCCn

<br />
<div class='right'>
<br /><a href='http://usegalaxy.org'><img src="/src/Images/Logos/galaxyLogoTrimmed.png" alt="Galaxy" height="50" /></a><br />**usegalaxy.org**</div>

# Project Updates

1. [News](/src/News/index.md)
1. [Events](/src/Events/index.md)
1. [Videos on Vimeo](https://vimeo.com/galaxyproject)
1. *[April 2014 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2014_04)*
1. *[March 2014 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2014_03)*

----
<br />
# About

**[GalaxyProject.org](http://galaxyproject.org)**

The **[Galaxy Team](http://wiki.galaxyproject.org/GalaxyTeam)** is a part of the **[Center for Comparative Genomics and Bioinformatics](http://www.bx.psu.edu/)** at **[Penn State](http://www.psu.edu/)**, and the **[Department of Biology](http://www.bio.jhu.edu/)** at **[Johns Hopkinis University](http://www.jhu.edu/)**. 

**[Galaxy](http://usegalaxy.org )** is supported in part by **[NSF](http://www.nsf.gov/)**, **[NHGRI](http://www.genome.gov/)**, the **[Huck Institutes of the Life Sciences](http://www.huck.psu.edu/)**, and **[The Institute for CyberScience at Penn State](http://www.ics.psu.edu/)**, and **[Johns Hopkins University](http://www.jhu.edu/)**.

The *[public Main instance](/src/Main/index.md)* of **Galaxy** at **[http://usegalaxy.org](http://usegalaxy.org)** utilizes infrastructure generously provided by the **[iPlant Collaborative](http://www.iplantcollaborative.org/)** at the **[Texas Advanced Computing Center](https://www.tacc.utexas.edu/)**, with support from the **[National Science Foundation](http://www.nsf.gov/)**.

Follow us on **Twitter [@galaxyproject](http://twitter.com/galaxyproject)** or read our tweets at **[Galaxy on Twitter](/src/GalaxyOnTwitter/index.md)**

Have a suggestion? Please see **[Using the Galaxy Issue Board](http://wiki.galaxyproject.org/Issues)**, and be sure to up vote the issues important to YOU.
