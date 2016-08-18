---
autotoc: true
---

[All News Briefs](/DevNewsBriefs)
<br />
[Distribution Summary 2014_06_02](/News/2014_06_02_Galaxy_Distribution)

<br />
<div class="title">June 2, 2014 Galaxy Distribution News Brief</div>

# Get Galaxy
<table>
  <tr>
    <td rowspan=3 style=" border: none"> <a href='http://getgalaxy.org/'><img src='http://galaxy.psu.edu/static/getgalaxy.png' alt='getgalaxy' width=70 /></a> &nbsp;&nbsp; </td>
    <td colspan=2 style=" border: none"> <strong><a href='http://wiki.galaxyproject.org/Admin/Get%20Galaxy'>getgalaxy.org</a></strong> </td>
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
    <td style=" border: none"> <code>$ hg pull </code> <br /> <code>$ hg update latest_2014.06.02 </code> </td>
  </tr>
</table>


<br />
# Upgrades
* **Review instructions for core build: [Getting the Stable Distribution](http://getgalaxy.org)**
* **Review reset for Tool Shed repos: [Resetting Metadata For Installed Repositories](http://wiki.galaxyproject.org/ResettingMetadataForInstalledRepositories)**

<br />
# Upgrade Notice: latest_ tags
With this release comes the inclusion of new Mercurial tags designed to make the life of a Galaxy server administrator easier. The recommended tag to use for this release is now `latest_2014.06.02`. This tag will always point to the latest stable version of the 2014.06.02 release (we publish occasional bug fixes to stable releases). If you would like to ensure you always run a static release version with no additional changes since the release, you may use the traditional `release_2014.06.02` tag (e.g. `hg update release_2014.06.02`). Both `release_` and `latest_` tags will be available for all releases going forward, and a `latest_2014.04.14` tag was created for the latest stable version of the previous release.

<br />
# Upgrade Notice: "ucsc_build_sites.txt"
If you have made local modifications to the `tool-data/shared/ucsc/ucsc_build_sites.txt` file, you will need to exercise some caution when upgrading to this release (the easiest solution is to make a backup copy of the file prior to upgrading). See [Pull Request #340](https://bitbucket.org/galaxy/galaxy-central/pull-request/340/) for more detailed instructions. There is also a [related trello card](https://trello.com/c/FTbvqDMd).

<br />
# Dataset Collections
Dataset Collections (Technology Preview): Galaxy's data model, API, tool and workflow subsystems have been updated to incorporate the concept of dataset collections. Outlined in these [1](https://trello.com/c/325AXIEr)[2](https://trello.com/c/CnPKZ9ZN) trello cards, dataset collections allow performing complex analyses over lists of dataset, paired datasets, lists of paired datasets, etc.... 

We are calling these a technology preview in this release because there is currently no rich user interface for [creating](https://trello.com/c/pPwdRwPh) or [viewing](https://trello.com/c/PVdbbpQS) dataset collections and there are a number of [known issues](https://trello.com/c/nQmxOG60). Check out this [presentation](https://docs.google.com/presentation/d/1D4pbULfe3IbSRVF3xsWvp9GyAct4SNfHhufIp-ysxYA/edit?usp=sharing), scheduled to given at this year's [Galaxy Community Conference](/Events/GCC2014), for the most up to date information on dataset collections and example usages.

</div><a href='http://imgur.com/FxVDt3Z'><img src='/Images/NewsGraphics/2014_06_02_dataset-collections_2.png' alt='dataset collections' width="900" /></a> <br /> The workflow image above (created by Philip Mabon) demonstrates the usage of dataset collections in the context of the [Core Phylogenomics SNP](https://github.com/apetkau/core-phylogenomics) pipeline created by Aaron Petkau, Gary Van Domselaar, Philip Mabon,
and Lee Katz. </div>

<br />
# Pull Requests Merged
You will now find merged pull requested incorporated directly into the News Brief along side other changes. Thanks to our Galaxy community contributors!

<br />
# Galaxy Biostar
If you haven't claimed your account yet at *[Galaxy Biostar](/Support/Biostar)*, now is a good time. This is the last reminder that the galaxy-user@bx.psu.edu mailing list will be retired Friday, June 6th. https://trello.com/c/0nQ5tHG7

<br />
# Data
1. *Data Manger*: 
  * Genome Builds / dbkeys: Make adding builds accessible by Data Manager. tools https://trello.com/c/5d077rYP
1. Reference Data:
  * Replaced: hg19 100waymultiz conservation alignments sourced from [UCSC](http://genome.ucsc.edu) utilized by "Fetch Alignments (MAF)" tools and available via rsync. https://trello.com/c/hlNAx4wq https://trello.com/c/5d077rYP
  * Updated: NCBI taxonomy data utilized by metagenomics analysis tools and available via rsync. https://trello.com/c/5d077rYP
  * Updated: NCBI database indexes utilized by Megablast and available via rsync. https://trello.com/c/jH2UBpaJ
  * Correction: Error in alignseq.loc entry for "Arabidopsis_thaliana_TAIR10". https://trello.com/c/oEgtg6yc
  * Documentation: Wikis for data prep reorganized and updated. [Start here...](/Admin/DataIntegration)

<br />
# Tools
1. Execution: Multi-dataset execution (a la workflows). https://trello.com/c/14OxiyMv
1. Default value for `data_column` not working in tool XML. Peter Cock [PR#389](https://bitbucket.org/galaxy/galaxy-central/pull-request/389). https://trello.com/c/6ugfcLgI
1. Provide mechanism to cleanly inject arbitrary environment variables from destinations (static and dynamic) into job script. [PR#378](https://bitbucket.org/galaxy/galaxy-central/pull-request/378/). https://trello.com/c/t1FH1Q5P
1. Enhancements for configuring tools that produce a variable number of outputs. [PR#356](https://bitbucket.org/galaxy/galaxy-central/pull-request/356/). https://trello.com/c/3SNHcQlU
1. Pull in a complete tool input parameters spec in JSON (e.g. recursion into Group parameters: Conditional and Repeat). https://trello.com/c/ydPxchL4
1. Toolshed Tools: Display link to toolshed repository on form. https://trello.com/c/QRAP0eFj
1. Changed `selected_file` to `repo_file`. Resolve `NameError`: global name 'selected_file' is not defined. Trevor Wennblom, [PR#382](https://bitbucket.org/galaxy/galaxy-central/pull-request/382/). https://trello.com/c/FhofbMxp


<br />
# Visualizations
1. *Trackster*: 
  * Implement location router in shared visualizations. https://trello.com/c/C7YpvTAi
  * Put converted datasets into history as hidden dataset. https://trello.com/c/G5ZzUb3X
1. External Display Applications: 
  * Updates to IGB display of XML files. https://trello.com/c/e23KKCKb https://trello.com/c/qJyALlN7
  * Added IGB display support for bed graph files. hillrunner2008, [PR#361](https://bitbucket.org/galaxy/galaxy-central/pull-request/361/). https://trello.com/c/pJeuhEP3
  * `GenomeSpace` (OpenID) Token Expiration. https://trello.com/c/riMxlQ6k


<br />
# Workflows
1. Workflow's with tool steps utilizing multiple input data params no longer break when edited (reported by Peter Cock). https://trello.com/c/9knsbvmx
1. Corrected problematic backtrace when attempting to run workflow after upgrade. https://trello.com/c/zXkliR75
1. Make workflow URLs pretty and establish conventions. https://trello.com/c/nvR6hktq
1. Workflow editor now preserves conditionals (avoids a specific invalid state that previously broke connections). https://trello.com/c/4yWqzlRi

<br />
# UI
1. Dataset provenance functionality improved for all user types. https://trello.com/c/ms6rtKmQ
1. Improve public `username` handling at registration (including via API). https://trello.com/c/UAfb8SVX
1. Improve `History options -> Purge deleted datasets` to update user disk usage. https://trello.com/c/bvOL9IBb
1. Simplify localization of output and ensure acceptance of UTF-8 in history, dataset API, and client code. https://trello.com/c/SxVszv0r
1. Create a proper JS object to contain components (user, configuration, logger). https://trello.com/c/JXPol7vs
1. Extending the UI library: new elements. https://trello.com/c/xYiHvOfl

<br />
# API
1. API's authenticate/baseauth creation of API key. https://trello.com/c/zpK846FE
1. Allow fetching input/output dataset association information through jobs API. https://trello.com/c/1ly1QN3a
1. Include job id in dataset provenance API. https://trello.com/c/SH8mWi8J
1. Expose use_remote_user via configuration API. https://trello.com/c/AGKePuHZ
1. Update code checks and documentation after commit 17a2dc7. Nicola Soranzo, [PR#383](https://bitbucket.org/galaxy/galaxy-central/pull-request/383/). https://trello.com/c/Ms6E0enr
1. Fix for "'!HistoryTagsController' object has no attribute 'security_check'". Nicola Soranzo, [PR#394](https://bitbucket.org/galaxy/galaxy-central/pull-request/394). https://trello.com/c/7iIv01zm

<br />
# Core
1. Admin: 
  * Messaging and Task Queue update. https://trello.com/c/B0pV80d0
  * Client side logging for metrics and API entry point for fluentd. https://trello.com/c/7yfdzZj2
  * Improve `View data tables registry` for developers. https://trello.com/c/gmClxfV8
  * Update `phantomjs 1.9` and `casperjs 1.1` plus tests and modules in `test/casperjs`. https://trello.com/c/VjDIpgt3
  * Page controls now loaded with `history/list_published.mako`. https://trello.com/c/nR2X7VJW
  * Added rolling restart script to kill servers sequentially. Eric Rasche, [PR#393](https://bitbucket.org/galaxy/galaxy-central/pull-request/393/). https://trello.com/c/jdldxhlk
1. Config: 
  * Admin action to reload ".loc" files without restarting Galaxy. https://trello.com/c/c7nUco3u
  * Allow for an arbitrary number of `tool_data_table_config_path` files. https://trello.com/c/rm2p8PpZ
  * Better reflect `allow_user_dataset_purge` configuration in history panel. https://trello.com/c/RCPZ9zMF
  * Create `run_tests.sh` to replace `run_functional_tests.sh`. https://trello.com/c/46KduuJs
  * Remove misc files that slipped past `hgignore`. Trevor Wennblom, [PR#364](https://bitbucket.org/galaxy/galaxy-central/pull-request/364/). https://trello.com/c/NlbwJMjA
1. Jobs: 
  * Documentation Updates: https://trello.com/c/jDLtI38Z https://trello.com/c/CRjWSodv
    * https://wiki.galaxyproject.org/Admin/Config/JobMetrics
    * https://wiki.galaxyproject.org/Admin/Config/Jobs#Job_Destinations
    * job_conf.xml.sample_advanced
  * Plugin framework and plugins for job metrics. https://trello.com/c/MexBahA3
  * Capture and report time taken to run each job. https://trello.com/c/tRxCl9xv
  * Local Job Runner Enhancements. [PR#384](https://bitbucket.org/galaxy/galaxy-central/pull-request/384/). https://trello.com/c/PDwEzOj1
  * Improve `run_functional_tests.sh` script. https://trello.com/c/14Mt7Nap
  * Fix GALAXY_SLOTS calculation for LSF. Ilya Sytchev. https://trello.com/c/WZ7ydlnW
  * Add option test system environment option GALAXY_TEST_VERBOSE_ERRORS to report on dataset errors. https://trello.com/c/neyVEnxZ
  * Update the job exit codes. Jian-Long Huang, [PR#365](https://bitbucket.org/galaxy/galaxy-central/pull-request/365/). https://trello.com/c/BXldAhSn
  * CLI Job Runner Enhancements. [PR#385](https://bitbucket.org/galaxy/galaxy-central/pull-request/385/). https://trello.com/c/KclOsZJi
  * Change: `job_directory -> jobs_directory`. Trevor Wennblom, [PR#360](https://bitbucket.org/galaxy/galaxy-central/pull-request/360/). https://trello.com/c/DXBL1XTt
  * LWR Message Queue Fixes and Improvements. https://trello.com/c/wMvq2qNZ


<br />
# Security
1. Change to avoid potential privacy exploit during login. https://trello.com/c/XlXwM866
1. Remove use of unencoded ids from history_common.mako, related controllers. https://trello.com/c/psDNnyRL


# Fixes
1. Fixed issue with 'bug report' submission using the *Google Chrome* web browser. https://trello.com/c/SX1WSchz
1. Fixed library permissions API controller. https://trello.com/c/80EmYp19
1. Fixed 'multiple input data parameters' in workflows. https://trello.com/c/0neRZzj9
1. Fixed library permissions API controller. https://trello.com/c/80EmYp19
1. Replaced loading indicator for Tabular View. https://trello.com/c/rP8xrqvH
1. Fixed problem when uploading to a Library does not correctly generate external set_metadata command (auto-detect metadata also broken). https://trello.com/c/25XLSk0r https://trello.com/c/95t7B3EV
1. Fixed the column alignment in the tabular format data. Jian-Long Huang, [PR#366](https://bitbucket.org/galaxy/galaxy-central/pull-request/366/). https://trello.com/c/LXnPuIRR
1. Fixed tag editing in Pages. https://trello.com/c/Yg7YGm6p
1. Fixed 'multiple input parameters' causing repeated datasets in UI names. https://trello.com/c/LCEKxImR
1. Fixed `ToolShed` installation using virtualenv that failed to automatically configure paths. https://trello.com/c/VFHrmuOS
1. Fixed `<conversion>` tags within a `DataToolParameter` that no longer worked. https://trello.com/c/9diH0RFl
1. Fixed grid templates that were inserting whole documents inside other documents. https://trello.com/c/iYloJMUF
1. Fixed problem with primary dataset collection on cloned histories. https://trello.com/c/17McdFlx
1. Fixed issue with Biostar "forgotten password" reset. https://trello.com/c/AX6zraeC
1. Misc improvements: Remove unused methods, cleanup imports, fix old wiki links. Nicola Soranzo, [PR#362](https://bitbucket.org/galaxy/galaxy-central/pull-request/362/). https://trello.com/c/5dE7l7YC

<br />
# Tool Shed
**[/Tool Shed](/Tool Shed)**

## Repositories
1. Add `assert file exists` and `directory exists` actions to `tool_dependencies.xml`. https://trello.com/c/xBUhFvj0
1. Making it easier to package tools using a local toolshed. https://trello.com/c/xtA7DsTz
1. Display mercurial ctx revision number instead of hash string. https://trello.com/c/ldVAUyYL
1. Reserved words `$REPOSITORY_INSTALL_DIR` and `$INSTALL_DIR` can now be used in certain tool actions such as 'move_file' and 'move_directory'. https://trello.com/c/XK5SqE1i

## API
1. Improve API error message when sent an incorrect user name. https://trello.com/c/bxZiluH3
1. API installation of "Repository suite definition" no longer fails when there are multiple, different, owners. https://trello.com/c/Bxe2E5Pp
1. Enhance the API to provide the current set of categories. https://trello.com/c/xaUy82rl

## Test Framework
1. Better handling of tool test results for tools missing tool test components on test tool shed. https://trello.com/c/rArkn49z
1. Install and test framework Stage 2 now runs. https://trello.com/c/YElEsCWl

## Tool Shed Fixes
1. Fixed missing searchbar in Test Tool Shed via `FireFox` browser. https://trello.com/c/JgdgdgOH

<br />
<div class='right'>
<br /><a href='http://usegalaxy.org'><img src='/Images/Logos/galaxyLogoTrimmed.png' alt='Galaxy' height="50" /></a><br />**usegalaxy.org**</div>

# Project Updates
1. [/News](/News)
1. [/Events](/Events)
1. *[May 2014 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2014_05)*
1. *[June 2014 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2014_06)*
----
<br />
# About
**[GalaxyProject.org](http://galaxyproject.org)**

The **[Galaxy Team](http://wiki.galaxyproject.org/GalaxyTeam)** is a part of the **[Center for Comparative Genomics and Bioinformatics](http://www.bx.psu.edu/)** at **[Penn State](http://www.psu.edu/)**, and the **[Department of Biology](http://www.bio.jhu.edu/)** at **[Johns Hopkinis University](http://www.jhu.edu/)**. 

**[Galaxy](http://usegalaxy.org )** is supported in part by **[NSF](http://www.nsf.gov/)**, **[NHGRI](http://www.genome.gov/)**, the **[Huck Institutes of the Life Sciences](http://www.huck.psu.edu/)**, and **[The Institute for CyberScience at Penn State](http://www.ics.psu.edu/)**, and **[Johns Hopkins University](http://www.jhu.edu/)**.

The *[public Main instance](/Main)* of **Galaxy** at **[http://usegalaxy.org](http://usegalaxy.org)** utilizes infrastructure generously provided by the **[iPlant Collaborative](http://www.iplantcollaborative.org/)** at the **[Texas Advanced Computing Center](https://www.tacc.utexas.edu/)**, with support from the **[National Science Foundation](http://www.nsf.gov/)**.

Follow us on **Twitter [@galaxyproject](http://twitter.com/galaxyproject)** or read our tweets at **[Galaxy on Twitter](/GalaxyOnTwitter)**

Have a suggestion? Please see **[Using the Galaxy Issue Board](http://wiki.galaxyproject.org/Issues)**, and be sure to up vote the issues important to YOU.
