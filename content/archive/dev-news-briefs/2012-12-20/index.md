---
title: Development News Brief
date: 2012-12-20
---

# Get Galaxy

<table>
  <tr>
    <td rowspan=3 style=" border: none;"> <a href='http://getgalaxy.org/'><img src="http://galaxy.psu.edu/static/getgalaxy.png" alt="getgalaxy" width=70 /></a> &nbsp;&nbsp; </td>
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
    <td style=" border: none;"> <code>$ hg pull -u -r 36ad8aa7b922 </code> </td>
  </tr>
</table>


<br />
<br />

# Required Metadata Reset

<div class='indent'> **It is critical that you reset the metadata on your installed tool shed repositories when you upgrade your Galaxy instance to this revision!**
</div>
<br />
When a tool shed repository is installed into your local Galaxy instance, metadata is generated for the repository as a part of the installation process and stored in the `tool_shed_repository.metadatatable` column in the Galaxy database. This automatic process inspects the contents of the specific revision of the installed repository and generates and stores important information about it. This metadata information is used by certain Galaxy features. As new features are added to Galaxy or the tool shed, the process that generates this installed tool shed repository metadata within the Galaxy instance may be enhanced to accommodate information about the new features. [Read more…](http://wiki.galaxyproject.org/ResettingMetadataForInstalledRepositories)

<br />
# Tool Shed

**[Tool Shed](/src/toolshed/index.md)**

### Galaxy Enhancement related to installed tool shed repositories

Tools installed from the Galaxy Tool Shed can now have handlers and runners assigned in `universe_wsgi.ini` based on their "short id" as opposed to their full "tool shed id".  

For example, the following lines could be placed in ` [galaxy:tool_runners] `:

```
toolshed.g2.bx.psu.edu/repos/devteam/bwa_wrappers/bwa_wrapper/1.2.3 = foo://
toolshed.g2.bx.psu.edu/repos/devteam/bwa_wrappers/bwa_wrapper = bar://
bwa_wrapper = baz://
```


And will be interpreted as:

* version `1.2.3` of the `bwa_wrapper` installed from the toolshed would use runner ` foo:// `
* all other versions installed from the toolshed would use runner ` bar:// `
* any tool with ` <tool id="bwa_wrapper"> `, regardless of how it's installed (from the toolshed or directly added to tool_conf.xml) would use runner ` baz:// `

It is important to note that *only the most **specific match** will be used if there are **multiple matches*** (as in the given example).

### Tool Shed Enhancement

1. The functional test framework for the tool shed has been significantly enhanced.  For details about how to run functional tests for your local tool shed, [read more here…](http://wiki.galaxyproject.org/HostingALocalToolShed#Functional_test_framework_for_the_tool_shed)

### Tool Shed Fixes

1. The tool shed now displays informative error messages when invalid `XML .sample` files are included in a repository.
2. Fixes for the functional test framework for testing tools contained in tool shed repositories installed into Galaxy instances, thanks to [Lance Parsons](http://www.lanceparsons.net/).  
3. The tool shed's `HgWebConfigManager` is now thread-safe.
4. Tools contained in tool shed repositories installed into a local Galaxy instance will now be automatically reloaded into the Galaxy tool panel if the tool config was changed in the update, but *the tool versions did not change* (e.g., if the help text or something else not requiring a new tool version changed).
5. All information related to installed tool dependencies has been filtered to ensure it is renderable on a browser page ( escape characters, illegal characters, etc are filtered out ).
6. This release includes a fix for reinstalling tool dependencies defined for an uninstalled tool shed repository if the `tool_dependency_dir` config setting is not defined in the Galaxy configuration file ( `universe_wsgi.ini` ).

<br />
# Tools

1. Enable and document [GFF](http://wiki.galaxyproject.org/Learn/Datatypes#GFF)/[GFF3](http://wiki.galaxyproject.org/Learn/Datatypes#GFF3) annotation support for **[Cuffcompare/merge/diff](http://cufflinks.cbcb.umd.edu/manual.html)**.
2. Fix output definition for [GTF](http://wiki.galaxyproject.org/Learn/Datatypes#GTF) filter by attribute values list.
3. Allow spaces in **[Cuffdiff](http://cufflinks.cbcb.umd.edu/manual.html#cuffdiff)** group names.
4. **[TopHat2](http://tophat.cbcb.umd.edu/manual.html)**:
  * Add simple read group options.
  * Remove deprecated parameters.
5. #5 **[Bowtie2](http://bowtie-bio.sourceforge.net/bowtie2/manual.shtml)**:
  * Add simple read group options.

**Bowtie2**
<br />
<img src="/src/images/news-graphics/2012_12_20_ngs-mapping-bowtie2.png" alt="Bowtie2" width=600 />

**RNA-Seq Tool Suite** with updated tools highlighted
<br />
<img src="/src/images/news-graphics/2012_12_20_ngs-rna-analysis-toolsuite.png" alt="RNA-Seq" width=300 />

<br />
# Visualization

### Galaxy Track Browser (Trackster)

1. Add `BAM to BigWig converter` for read coverage data.
2. When creating a new track browser for a dataset:
  * default to dataset's `dbkey`
  * default the view to the first chromosome

<br />
# UI, Libraries, Histories

1. *User Interface (UI)*: Tabular Display: For extremely wide datasets (50 columns or more), revert to the old (non-table) display behavior.  Rational: the incremental renderer sometimes has issues with these types of files.
2. *Libraries*: Include custom genomes in `dbkey` field when uploading library datasets.
3. *Histories*: Create **.bai** indexes when importing **[BAM](http://wiki.galaxyproject.org/Learn/Datatypes#BAM) (.bam)** datasets while importing/exporting histories. 
  * note: a specific .bai index is associated with every .bam dataset, and is required, but the index file is not displayed in a history as a distinct dataset. Index files can be downloaded/accessed using the 'save' function in the **[BAM](http://wiki.galaxyproject.org/Learn/Datatypes#BAM)** dataset's history item. When loading **[BAM](http://wiki.galaxyproject.org/Learn/Datatypes#BAM)** datasets into Galaxy, or when they are created by tools, the .bai index is created automatically by those processes.

<br />
# Source

### Pull Requests Accepted

1. Allow a datatype's merge method to optionally take in the `output_dataset` object. **[#83](https://bitbucket.org/galaxy/galaxy-central/pull-request/83/allow-a-datatypes-merge-method-to)**; contributed by [John Chilton](http://bitbucket.org/jmchilton).
2. Another round of bug fixes and enhancements for multiple input data parameters. **[#85](https://bitbucket.org/galaxy/galaxy-central/pull-request/85/another-round-of-bug-fixes-and)**; contributed by [John Chilton](http://bitbucket.org/jmchilton).
3. Patch to make extended_metadata loader work better, and fix library loader to handle non-ascii characters. **[#90](https://bitbucket.org/galaxy/galaxy-central/pull-request/90/patch-to-make-extended_metadata-loader)**; contributed by [Kyle Ellrott](https://bitbucket.org/kellrott).
4. Fix an overlooked import in `JobWrapper`. **[#91](https://bitbucket.org/galaxy/galaxy-central/pull-request/91/fixing-missing-jobwrapper-import)**; contributed by [Kyle Ellrott](https://bitbucket.org/kellrott).

<br />
# Trello Issue Tracking

<div class='left'><a href='http://bit.ly/gxytrello'><img src="/src/images/logos/TrelloLogo300.png" alt="Galaxy Issue Board @ Trello" width="100" /></a></div>

The Galaxy Project uses *[Trello](http://trello.com/)* for [issue creation](http://galaxyproject.org/trello) plus [commenting](http://wiki.galaxyproject.org/Issues#Add a Comment) and [voting](http://wiki.galaxyproject.org/Issues#Vote) on existing issues. 

Want to review what we're working on, vote, or submit a new idea to the Galaxy team? Our new wiki has all the details! 
**[Using the Galaxy Issue Board](http://wiki.galaxyproject.org/Issues)**

<br />
# Security Fixes

Although there are no specific known security fixes in this distribution, all Galaxy instance maintainers are *strongly encouraged* to run the latest release to take advantage of other improvements and fixes.

<br />
# Bug Fixes

1. Fix for text area tool parameters (form builder) when a size isn't provided.
2. Fix for error reporting link throwing server errors.
3. Fix for `SelectToolParameter` in rerun ![](/src/images/icons/arrow-circle.png) and workflows when multiple="true"
4. Fix IE console errors.
5. Fix unhandled 'new' state for datasets in the history panel.
6. Handle adding datasets to history panel without refresh.
7. Fix *Trackster* links when `dbkey` is empty.
8. Fix text selection of dataset names in the history panel.
9. Fixes to history-related functional tests.
10. Fix rendering of 'save' pop-up menu downloadable composite files 
  * *example:* [BAM](http://wiki.galaxyproject.org/Learn/Datatypes#BAM) datasets have two download components, .bam (primary dataset) and .bam.bai (the index)

<br />
# Announcements

[News](/src/news/index.md), ***[December 2012 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2012-12)***

<div class='left'><a href='/src/events/gcc2013/training-day/index.md'><img src="/src/images/logos/GCC2013Logo200.png" alt="2013 Galaxy Community Conference (GCC2013)" width="175px" /></a></div>
<br />
**[GCC2013 Training Day Topic Nominations](http://wiki.galaxyproject.org/Events/GCC2013/TrainingDay) are now open** through ***[January 11th](http://wiki.galaxyproject.org/Events/GCC2013/KeyDates)***.  
<br />
Get a word in now.
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
