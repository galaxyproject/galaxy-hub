---
autotoc: true
title: October 5, 2012 Galaxy Development News Brief
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
    <td style=" border: none;"> <code> $ hg pull -u -r b5bda7a5c345 </code> </td>
  </tr>
</table>



<br />
<br />
# BWA Migration to Tool Shed

The tools **NGS: Mapping** &rarr; *Map with BWA for Illumina* and *Map with BWA for
SOLiD* have moved from the Galaxy distribution to the Galaxy Main Tool Shed.

<div class='right'><a href='http://toolshed.g2.bx.psu.edu'><img src="/src/images/Logos/ToolShed.jpg" alt="tool shed" width="150px" /></a></div>

Migration scripts will run upon Galaxy's first launch (after updating to this release) that will automatically handle installing these BWA tool wrappers from the Tool Shed. **[BWA](http://bio-bwa.sourceforge.net/)** itself and target reference genomes should still be installed as described in the Galaxy wiki - start in the [Tool Dependencies](/src/Admin/Tools/Tool Dependencies/index.md) section.

**[BWA](http://bio-bwa.sourceforge.net/)** is a fast light-weighted tool that aligns relatively short sequences (queries) to a sequence database (large), such as the human reference genome. It is developed by Heng Li at the Sanger Insitute. Li H. and Durbin R. (2009) Fast and accurate short read alignment with Burrows-Wheeler transform. Bioinformatics, 25, 1754-60. 


<br />
# Galaxy Tool Factory Paper E Published

As reported in the [September 20th News Brief](/src/DevNewsBriefs/2012_09_20/index.md#galaxy_tool_factory), the **Tool Factory** is already available in the tool shed. At that time, the manuscript was accepted, but pending publication. The E publication is now available.

[Creating re-usable tools from scripts: The Galaxy Tool Factory.](http://www.ncbi.nlm.nih.gov/pubmed/23024011)
Lazarus R, Kaspi A, Ziemann M; The Galaxy Team.
Bioinformatics. 2012 Sep 28. (Epub ahead of print)
PMID: 23024011 ([PubMed](http://www.ncbi.nlm.nih.gov/pubmed) - as supplied by publisher)

**Short re-cap &rarr; [Read more…](/src/DevNewsBriefs/2012_09_20/index.md#galaxy_tool_factory)**

1. The **Tool Factory** is a pure Galaxy scripting environment that makes running simple quick and dirty tasks really easy, and can also generate new Galaxy tools with functional tests! 

2. The **Tool Factory** ia available for private clone installations from the main **[Galaxy Tool Shed](http://toolshed.g2.bx.psu.edu/)** as the **toolfactory** - see your local **Galaxy** admin menu.

3. *Before you install - THIS IS IMPORTANT!!* The **Tool Factory** allows unrestricted scripting - NO SANDBOX!! so is far too dangerous for production sites. It can only be run by *local **Galaxy** site administrators*. Please, do **NOT** install on public Galaxy instances. ***Generated tools are safe if the script they wrap is safe***. 

<br />
# Dataset Cleanup

**[PostgreSQL](http://www.postgresql.org)** users with extremely large databases can now use a more efficient database-driven cleanup script.  The lifecycle is similar to the old script, but the syntax is different.  The new script can be found at:

```
    galaxy-dist/scripts/cleanup_dataset/pgcleanup.py
```


If called with the `--help` option, it will output usage information.  The dataset cleanup documentation will be updated to refer to this script.

<br />
# Tool Shed

The **[Tool Shed](/src/Tool Shed/index.md)** wiki has been re-written with a new, cleaner presentation. *[Check it out!](/src/Tool Shed/index.md)*

### New tool shed features

The following sections of the tool shed wiki provide information about features introduced in this Galaxy release.

1. **[Handling repository installation errors](/src/ToolShed/InstallingRepositoriesToGalaxy/index.md#handling_repository_installation_errors)**

  In some cases installing a repository into a Galaxy instance may result in errors.  When this happens the repository's status attribute will be set to an error state, and the repository will be displayed similar to the example shown in the following page. [Read more…](/src/ToolShed/InstallingRepositoriesToGalaxy/index.md#handling_repository_installation_errors)

2. **[Including installation information or 3rd-party tool dependency licensing information in your repository](/src/ToolShedReadmeFiles/index.md)**

  This document provides the details for a simple feature of the tool shed that enables displaying the license information (or possibly other kinds of information) for tools included in a repository.  [Read more…](/src/ToolShedReadmeFiles/index.md)

3. **[Updating a previously installed repository to a revision that includes changes to installed tool dependencies](/src/ToolShedToolFeatures/index.md#updating_a_previously_installed_repository_to_a_revision_that_includes_changes_to_installed_tool_dependencies)**

  In most cases changing the version of a tool dependency requires a change to the dependent tool's version as well.  This ensures reproducible behavior for Galaxy instances in which the tool is installed.  However, in some cases the owner of a repository may change the version or type attribute of a tool dependency in it's definition in the repository without changing the version of the dependent tool.  Again, this should not often occur! [Read more…](/src/ToolShedToolFeatures/index.md#updating_a_previously_installed_repository_to_a_revision_that_includes_changes_to_installed_tool_dependencies)

### Improved tool shed feature documentation

The following sections of the tool shed wiki have been updated to more thoroughly describe features.

1. **[Cloning a repository using hg from the command line](/src/ToolShedRepositoryFeatures/index.md#cloning_a_repository_using_hg_from_the_command_line)**

  If you want to clone a repository from the tool shed using mercurial from a terminal session, you have to install the Mercurial Distributed SCM (the tool shed requires [Mercurial version 2.2.3](http://mercurial.selenic.com/) or newer). [Read more…](/src/ToolShedRepositoryFeatures/index.md#cloning_a_repository_using_hg_from_the_command_line)

2. **[Pushing changes to a repository using hg from the command line](/src/ToolShedRepositoryFeatures/index.md#pushing_changes_to_a_repository_using_hg_from_the_command_line)**

  If you want to push a changeset to a repository in the tool shed using mercurial from a terminal session, you have to install the Mercurial Distributed SCM (the tool shed requires [Mercurial version 2.2.3](http://mercurial.selenic.com/) or newer). [Read more…](/src/ToolShedRepositoryFeatures/index.md#pushing_changes_to_a_repository_using_hg_from_the_command_line)

3. **[Adding additional change sets to the initial change set in a repository](/src/RepositoryRevisions/index.md)**

  With each change set committed and pushed to a repository, whether using hg from the command line or by uploading or deleting files using the tool shed UI features, metadata about the contents of the change set is generated.  This document provides the details about this process. [Read more…](/src/RepositoryRevisions/index.md)

### Other tool shed fixes and features included in this Galaxy release

1. Display warning or error message if attempting to install tool dependencies defined in a tool shed repository when the `tool_dependency_dir` config setting is not set in the Galaxy config.

2. Apply styles when displaying the long description when viewing a tool shed repository.

3. Merged in jmchilton/galaxy-central-tool-shed-hg-urls, see *[pull request 69](http://bitbucket.org/galaxy/galaxy-central/pull-request/69)* contributed by [John Chilton](/src/JohnChilton/index.md).

### New Galaxy fixes and features included in this Galaxy release

1. Handle the case where the main Galaxy tool shed is unavailable when checking for migrated tools or updates to installed tool shed repositories when starting the Galaxy server.

2. Allow the Galaxy admin to reset metadata on installed tool shed repositories.

3. A Galaxy tool migration stage is defined as the stage level (e.g., 0002, 0003, 0004, etc.) at which a specific set of tools was migrated out of the Galaxy code distribution and added to the main Galaxy tool shed.

 Executing the process for a specific tool migration stage can be done at any time, not just at the time you are starting your Galaxy server as discussed in the previous sections of this document. [Read more…](/src/ToolShed/MigratingToolsFromGalaxyDistribution/index.md#delaying_execution_of_a_tool_migration_until_later)

<br />
# Tools

[Tool Dependencies](/src/Admin/Tools/Tool Dependencies/index.md)

### Enhancements

Tool changes that enable clearer experimental tracking and ease reproducibility

1. **Tool versions and exit codes**

* Display tool version in workflow tool form editor.
* Display tool version when running a workflow.
* Always allow selecting different (e.g. 'older') versions of a tool when selected from the tools menu.
* Exit codes are now included in the database and displayed on a tool's output dataset history box in the user interface (UI).

2. **Other updates**

* Always load the tool version with the highest lineage (newest version) into the tool panel/menu so that the newest version is always used for a new tool run (e.g. but not for a rerun/previously existing workflow unless modified by user).
* Refactor tool version selection during rerun; previously, the currently selected version displayed in the dropdown box might not have been the version of the tool actually being displayed/run. 
* Better handling of determining tool/version in workflow tool module.
* Fix for writing the `integrated_tool_panel.xml` when a section has been removed from `tool_conf.xml`
* Better handling of trying to access a tool when it is no longer loaded, but the item is still listed in the tol panel (due to not refreshing the page after remove the tool).

### Updates to RNA-seq tools

1. **Cufflinks**, **Cuffcompare**, **Cuffmerge**, and **Cuffdiff**: Add support for **v2.0+**.

2. Fix **Cuffdiff** parameter group naming.

3. Resources:

* [More about](http://bowtie-bio.sourceforge.net) **[Bowtie](http://bowtie-bio.sourceforge.net)**
* [More about](http://bowtie-bio.sourceforge.net/bowtie2) **[Bowtie2](http://bowtie-bio.sourceforge.net/bowtie2)**
* [More about](http://tophat.cbcb.umd.edu) **[Tophat/Tophat2](http://tophat.cbcb.umd.edu)**
* [More about](http://cufflinks.cbcb.umd.edu) **[Cufflinks, Cuffcompare, Cuffmerge, & Cuffdiff](http://cufflinks.cbcb.umd.edu)**

<br />
# Visualization framework

### Enhancements

1. Add **requireJS** support for data, visualization, tools and update dependencies.

2. Created `DataProviderRegistry` object to simplify provider creation.

3. **Circster** performance improvement: render quantitative data as a single path rather than many small paths.

### Updates

1. Fix embedded visualizations and bookmarking which were broken during refactoring.

<br />
# API

1. Fix issues with **Genomes API**: handle periods in keys, fix typo, and list genomes when querying.

<br />
# Workflows

1. Fix to correctly display error message when attempting to run a workflow missing tools.

2. Viewing and Downloading of workflows with missing tools now handled gracefully.

<br />
# Security Fixes

1. Prevent potential login XSS, sanitize all reflected parameters.

2. Remove pre-filled password/confirm/current fields from edit user info.

3. Revise the `Compute` tool to only allow for execution of a limited set of expressions.

<br />
# Bug Fixes

1. Jobs
  * Set the correct job name when submitting jobs as system users.

<br />
# Announcements

[News](/src/news/index.md), *[October 2012 Galaxy Update](/src/GalaxyUpdates/2012_10/index.md)*

**[Highlights](/src/news/2012_10GalaxyUpdate/index.md):**

* [Upcoming Events and Deadlines](/src/GalaxyUpdates/2012_10/index.md#upcoming-events-and-deadlines)
* [35 new papers](/src/GalaxyUpdates/2012_10/index.md#new-papers)
* [CBIIT's new public Galaxy Server](/src/GalaxyUpdates/2012_10/index.md#new-public-server-cbiit)
* [Open Positions](/src/GalaxyUpdates/2012_10/index.md#whos-hiring) at three different institutions
* [Tool Shed Contributions](/src/GalaxyUpdates/2012_10/index.md#tool-shed-contributions)
* [Other News](/src/GalaxyUpdates/2012_10/index.md#other-news)

<br />
----
<br />
# About Galaxy

**[GalaxyProject.org](http://galaxyproject.org)**

The **[Galaxy Team](/src/GalaxyTeam/index.md)** is a part of **[BX](http://www.bx.psu.edu/)** at [Penn State](http://www.psu.edu/), and the **[Biology](http://www.biology.emory.edu/)** and **[Mathematics and Computer Science](http://www.mathcs.emory.edu/)** departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at **Twitter [@galaxyproject](http://twitter.com/#galaxyproject)** or just read our tweets **[Galaxy on Twitter](/src/Galaxy on Twitter/index.md)**
