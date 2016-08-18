---
autotoc: true
---

<div class="title">February 8, 2013 Galaxy News Brief</div>

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
    <td style=" border: none"> <code>$ hg pull </code> <br /> <code>$ hg update release_2013.02.08 </code> </td>
  </tr>
</table>

<br />
<br />
# Improvements to Distribution Release Process
## THIS IS IMPORTANT, PLEASE READ BEFORE UPGRADING
We have made some improvements to our release process, and because of this, you **must** include the new distribution release tag in your `hg update` command to upgrade to this distribution release:

```console
% hg pull
% hg update release_2013.02.08
```


If you do not include the `release_2013.02.08` tag, your repository will update to the `default` branch, which includes unstable code.  After updating, you can verify that you are on the `stable` branch with:

```console
% hg branch
stable
```


Once you're on the `stable` branch, `hg pull -u` without a specific revision or branch will cause you to remain on the `stable` branch.

The new release process works as such:

1. The Galaxy source repository now contains two branches:
  1. `stable` is committed to regularly and contains important bugfixes.
  1. `default` is committed to regularly and contains new features as well as fixes merged from `stable`.
1. Every two months, `stable` will be updated with new features from default and a specific distribution release version will be tagged.
1. The two weeks prior to the release will be focused on fixing bugs found in the targeted upcoming release. New features will not be considered for inclusion in the upcoming release during this time.

This process will not only allow us to deploy important bug fixes on to the `stable` branch rapidly and in between releases, it will improve the quality of our tagged releases. The documentation at our wiki reflects these changes: [getgalaxy.org](http://wiki.galaxyproject.org/Admin/Get%20Galaxy).

<br />
# Tool Shed
**[/Tool Shed](/Tool Shed)**

### New Tool Shed Features

#### Complex repository dependencies: tool dependency definitions that contain repository dependency definitions

Complex repository dependencies allow for many tool shed repository installations into a single Galaxy instance where any number of the contained tools across installed repositories can all reference a single installation of a specific 3rd party tool dependency (e.g. `bwa version 0.5.9`).

Describing how this works is tricky, so let's see if we can state it in a way that can be understood: tool dependency definitions that contain repository dependency definitions define a relationship to a tool dependency that will be installed using the instructions in the required repository's tool_dependency.xml file, where the required repository is defined by the contained repository dependency definition.  Hmmm...okay, let's try to clarify this a bit... [Read more...](http://wiki.galaxyproject.org/DefiningRepositoryDependencies#Complex_repository_dependencies:_tool_dependency_definitions_that_contain_repository_dependency_definitions)

#### The Tool Shed now Provides Sharable URLs for Repositories by Name or Owner

The following new routes have been added to the Tool Shed:
```
<tool shed url>/view/<repository owner>
<tool shed url>/view/<repository owner>/<repository name>
```


These allow for URLs that can be cited or shared, and viewing a repository will display it's sharable link.  Here's an example.

![](/Images/NewsGraphics/2013_02_5-sharable.png)

Thanks to [Peter Cock](https://bitbucket.org/peterjc) for the contribution!

### Enhanced Galaxy Features for the Tool Shed

1. The ability to select multiple tool shed repositories for simultaneous installation has been reintroduced.  This feature was eliminated several months ago to allow for the implementation of repository dependencies.  Now choosing either of the options "Search for valid tools" or "Search for workflows" from a tool shed's pop-up menu as shown here...

![](/Images/NewsGraphics/2013_02_1-toolshed-search.png)

...and entering a search string as shown here...

![](/Images/NewsGraphics/2013_02_2-search-string.png)

...will allow you to selectively install any of the repositories matching the search criteria.

![](/Images/NewsGraphics/2013_02_3-select-to-install.png)

All repositories dependencies and tool dependencies that are defined for each repository selected for installation will be discovered and displayed in preparation for installation into your local Galaxy instance.  You can optionally elect to install these dependencies..

![](/Images/NewsGraphics/2013_02_4-confirm-dependency-installation.png)

### Tool Shed Related Fixes

1. Properly handle long URLs when installing and reinstalling tool shed repositories within a Galaxy instance.  This issue was reposted by [James Johnson](http://bitbucket.org/jjohnson), and occurred only when running Galaxy behind an apache proxy, which tends to limit the length of a URL to 8190 characters.
2. Add a missing import to the Galaxy `UpdateManger`.  This issue was reported by [Anthonius deBoer](https://bitbucket.org/thondeboer/), and was corrected in `change set 8649:34404f848979`.  The Galaxy `UpdateManger` is responsible for determining if any updates are available from the tool shed for any repositories installed into the Galaxy instance.  The missing import resulted in the `UpdateManger` not discovering if updates for installed repositories are available from the tool shed, but the behavior does not result in any instability in the Galaxy instance.  The only result of this is that the installed repositories that have updates available are not displayed in yellow highlighted boxes on the "Manage installed tool shed repositories" page within the Galaxy Administration interface.
3. Invalid `repository dependency definitions` are now properly handled, with error messages displayed within appropriate Galaxy and tool shed features.

### Tool Shed Enhancements

1. Additional significant enhancements have been made to the **tool shed functional tests**, so many more tool shed related features are now covered both within the tool shed and with Galaxy.

### Miscellaneous Tool Shed Fixes and Enhancements

1. Allow repository owners to reset all repository metadata on a specific repository in the tool shed.
2. Allow a Galaxy administrator to select a shed-related tool panel configuration file whose tool_path setting will be used to installed repositories into Galaxy for those repositories with which a tool panel selection is not necessary.
3. Uncomment the default sqlite database connection string in community_wsgi.ini.sample.
4. Automatically create missing required tool shed files from samples when starting the tool shed server.
5. Many additional test scripts have been added to the tool shed's functional test suite.

<br />
# Tools

1. Enable [BedGraph](http://wiki.galaxyproject.org/Learn/Datatypes#BedGraph) format datasets to be used as input to `wig-to-bigwig` tool. 
  * Renamed tool as: `Wig/Bedgraph-to-bigwig`.
2. #2 Add parameter to `Filter` tool to optionally skip header lines. Add test for new parameter usage as well.

<br />
# Data

1. **Megablast** indexes for the divisions `nt`, `htgs`, and `wgs` have been updated on the public [/Main](/Main) Galaxy server dated `28jan2013`.
2. **NGS Data Set-up** wiki updated and simplified. [View here...](http://wiki.galaxyproject.org/Admin/NGS Local Setup)
3. **Rsync** server hosts download of the same `.loc` files used by the Galaxy team (to be used as additional examples, or starter files if you use our rsync reference genome data. [Read more...](http://wiki.galaxyproject.org/Admin/Data%20Integration#Get_the_data)

<br />
# CloudLaunch
### Update
1. Change get_account_info to POST vs GET.
### Bug Fixes:
2. #2 Adjust event triggers to prevent redundant (though harmless) get_account_info invocations.
3. #3 Adjust Cluster List creation to *always* insert the "New Cluster" option.

<br />
# Workflows
1. Exporting workflows:
  * Remove spurious header.
  * Add option to create workflow image.

<br />
# Histories
1. Enable display icon button for queued, running jobs in the history panel.
2. Show API errors for specific datasets as error-ed datasets in the history panel (api/histories/:id/contents?ids=...)

<br />
# Admin
1. Have `run_functional_tests.sh` serve static files (images, javascript, etc.) to assist in testing client-side code.

<br />
# Framework
1. Unified system genome builds, custom builds, build len files, and build two bit files into a single python structure. 
2. Add function to get genome builds with or without build length information.
3. Fix bugs so that the full build set (system + custom) is available via the API and when adding datasets to libraries.

<br />
# Source
### Pull Requests Merged
1. Fixing database v108 downgrade failure, pull request **[#109](https://bitbucket.org/galaxy/galaxy-central/pull-request/109)**. Thanks to [Kyle Ellrott](https://bitbucket.org/kellrott).
2. Paired-end code mishandles description of FASTQ headers, pull request **[#8](https://bitbucket.org/galaxy/galaxy-central/pull-request/8)**. Thanks to [fangly](https://bitbucket.org/fangly).
3. Fix Add/Remove buttons for Repeat groups, pull request **[#24](https://bitbucket.org/galaxy/galaxy-central/pull-request/24)**. Thanks to [epaniagu](https://bitbucket.org/epaniagu).
4. The start of the API based annotation system, pull request **[#101](https://bitbucket.org/galaxy/galaxy-central/pull-request/101)**. Thanks to [Kyle Ellrott](https://bitbucket.org/kellrott).
5. Add option to bowtie2 tool for writing not aligned reads, pull request **[#110](https://bitbucket.org/galaxy/galaxy-central/pull-request/110)**. Thanks to [Nicola Soranzo](https://bitbucket.org/nsoranzo).
6. Adjusted trimming tool for easily trimming from the end, pull request **[#113](https://bitbucket.org/galaxy/galaxy-central/pull-request/113)**. Thanks to [Joachim Jacob](https://bitbucket.org/joachimjacob).
7. Adding handler for httpexceptions.HTTPFound, so that the redirect tool will work (rather then causing an error), pull request **[#92](https://bitbucket.org/galaxy/galaxy-central/pull-request/92)**. Thanks to [Kyle Ellrott](https://bitbucket.org/kellrott).
8. Adding UUIDType to data model and uuid column to dataset table.  (This is unused, so far), pull request **[#105](https://bitbucket.org/galaxy/galaxy-central/pull-request/105)**. Thanks to [Kyle Ellrott](https://bitbucket.org/kellrott).
9. Refactoring Task Splitting Toward Per-Job Definitions (in Addition to Current Per-Tool Definitions), pull request **[#87](https://bitbucket.org/galaxy/galaxy-central/pull-request/87)**. Thanks to [John Chilton](http://jmchilton.net/).
10. Fixed error when retrieving workflows via the API, pull request **[#114](https://bitbucket.org/galaxy/galaxy-central/pull-request/114)**. Thanks to [Richard Park](https://bitbucket.org/rpark37).

<br />
# Security Fixes

Although there are no specific known security fixes in this distribution, all Galaxy instance maintainers are *strongly encouraged* to run the latest release to take advantage of other improvements and fixes.

<br />
# Bug Fixes and related Enhancements
### General/UI
1. Fix for external display applications with non-public permissions.
2. Add missing import in `galaxy.util`. Fixes bug in `.mkstemp_ln()`. Only encountered rarely in the upload tool.
### Tools
3. #3 Improve error message for tool test parameters that could not be added.
4. #4 Add tool id for when clause warnings that are output when tool XML is parsed.
5. #5 Use correct index tables for setting dbkey of Tophat2 outputs.
6. #6 Fixes for showing job parameters when tools have been updated.
### Visualization
7. #7 UI fixes for navigating histories/libraries and choosing datasets in Trackster.
8. #8 Change 'clone history/workflow/visualization' to 'copy history/workflow/visualization' for readability
### Admin
9. #9 A bug has been fixed in the `DRMAA` runner that was causing job handler processes to segfault when users deleted history datasets that were associated with jobs that had not yet been dispatched to a cluster.
10. #10 Adjust the id_tag to use the format "`<jobid>_<taskid>`", instead of "`<jobid>:<taskid>`".  This resolves issues with particular cluster runners (UGE) being unable to submit.

<br />
# Announcements

[/News](/News), ***[February 2013 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2013_02)***

## GCC2013

<div class='right'><a href='/Events/GCC2013/'><img src='/Images/Logos/GCC2013Logo200.png' alt='2013 Galaxy Community Conference (GCC2013)' width="150" /></a> <br />
<a href='/Events/GCC2013/TrainingDay/'><img src='/Images/Logos/GCC2013TrainingDayLogo200.png' alt='2013 Galaxy Community Conference (GCC2013) Training Day' width="150" /></a></div>

### Training Day Topic Voting Closes 11 February

If you might attend the [GCC2013 Training Day](/Events/GCC2013/TrainingDay) then please [review the possible topics](/Events/GCC2013/TrainingDay/#topics) and then [vote for your top 3 choices](http://bit.ly/gcc2013tdpoll).  Your votes will determine not only the topics that are offered, but also which topics should be offered more than once, assigned to which rooms, and which ones should not be scheduled at the same time.  Your vote matters.

### Registration, Talk & Poster Submission Opens 22 February

[Early Registration](/Events/GCC2013/Register), and [talk and poster abstract submission](/Events/GCC2013/Abstracts) all [open 22 February](/Events/GCC2013/KeyDates).  Watch the mailing lists and this wiki for details.

----
<br />
# About Galaxy
**[GalaxyProject.org](http://galaxyproject.org)**

The **[Galaxy Team](http://wiki.galaxyproject.org/GalaxyTeam)** is a part of **[BX](http://www.bx.psu.edu/)** at [Penn State](http://www.psu.edu/), and the **[Biology](http://www.biology.emory.edu/)** and **[Mathematics and Computer Science](http://www.mathcs.emory.edu/)** departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at **Twitter [@galaxyproject](http://twitter.com/#galaxyproject)** or just read our tweets **[Galaxy on Twitter](http://wiki.galaxyproject.org/Galaxy on Twitter)**

Have a suggestion? Please see **[Using the Galaxy Issue Board](http://wiki.galaxyproject.org/Issues)**.
