---
title: Development News Brief
date: 2012-09-07
---

# Get Galaxy

<div class='left'><a href='http://getgalaxy.org/'><img src="http://galaxy.psu.edu/static/getgalaxy.png" alt="getgalaxy" width=50 /></a></div>

 **[getgalaxy.org](http://getgalaxy.org)** 

**new**: ` $ hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist `

**upgrade**: ` $ hg pull -u -r e6444e7a1685 `

<br />
<br />
<br />
<br />
# BLAST+ Migration

The tool set **[NCBI BLAST+](http://blast.ncbi.nlm.nih.gov/)** has moved from the Galaxy distribution to the Galaxy Main **[Tool Shed](/src/toolshed/index.md)**.

Migration scripts will run upon Galaxy's first launch (after updating to this release) that will automatically handle installing **BLAST** (and **blastxml**) from the **[Tool Shed](/src/toolshed/index.md)**.

<br />
# Reference Genome rsync Server

If you would like to obtain the same *reference genome builds and indexes* as available on the public **Galaxy [Main](/src/main/index.md)** instance, these can retrieved from the rsync server at:
```
datacache.g2.bx.psu.edu
```


For example, to download the complete directory for the **['phiX'](http://en.wikipedia.org/wiki/Phi_X_174)** genome:
```
$ rsync -avzP rsync://datacache.g2.bx.psu.edu/indexes/phiX .
```


Genomes are organized in directories by the `dbkey`. If you are not sure of the `dbkey`, check your datasets. The `dbkey` is what is populated into the "database" attribute for a dataset. Read more [about how this fits into data integration](/src/admin/data-integration/index.md) or [setting up native genome indexes](/src/admin/NGS Local Setup/index.md).

<br />
# More Updates to Output and Error Handling

As reported in the *[July 20th, 2012 News Brief](/src/archive/dev-news-briefs/2012-07-20/index.md)*, several changes have been made to the underlying code that determines run result state from tool exit codes and output. There are now additional enhancements to applying regular expressions and exit code checks. [Read more...](/src/admin/tools/tool-config-syntax/index.md#a3cstdio3e2c_3cregex3e2c_and_3cexit_code3e_tag_sets)

<br />
# Tools

[Admin/Config/Tool Dependencies](/src/admin/config/tool-dependencies/index.md)
* *Enhancements*
  * **[Tophat2](http://tophat.cbcb.umd.edu/tutorial.html)** wrapper enhancements: 
    * Include fusions output. Read more about what this is in the [Tophat2 Manual's](http://tophat.cbcb.umd.edu/manual.html) section *Fusion mapping options:*
  * **[Bowtie2](http://bowtie-bio.sourceforge.net/bowtie2/manual.shtml)** wrapper enhancements: 
    * Output sorted **[BAM](/src/learn/datatypes/index.md#bam)** from **Bowtie2** by default
    * One benefit is that **BAM** results can be used as input to **[Cufflinks](http://cufflinks.cbcb.umd.edu/)** without an [intermediate sorting step](http://main.g2.bx.psu.edu/u/jeremy/p/transcriptome-analysis-faq#faq2).
    * *NOTE:* If you are using an older version of *Bowtie* or uploading your own results, sorting is still required before running *Cufflinks*, whether in [SAM](/src/learn/datatypes/index.md#sam) or [BAM](/src/learn/datatypes/index.md#bam) format.
* *New*
  * **[Galaxy RNA-seq Analysis Exercise](http://main.g2.bx.psu.edu/u/jeremy/p/galaxy-rna-seq-analysis-exercise)** on [Main](/src/main/index.md)
    * Walks through sample protocol step-by-step using paired-end data, initial read QC through **[CuffDiff](http://cufflinks.cbcb.umd.edu/)** analysis
    * Includes **[iGenomes](http://tophat.cbcb.umd.edu/igenomes.html)** sourced **[reference annotation GTF](http://tophat.cbcb.umd.edu/igenomes.html)**, an answer key, and bonus resources 

<br />
# User Interface (UI)

* *Enhancements*
  * Does not use `enable_tracks` or `enable_pages` options anymore; visualizations and pages are enabled for *all instances*.
* *New*
  * Addition of **interactive phylogenetic tree visualization**.

</div><a href='/src/learn/index.md'><img src="/src/images/news-graphics/2012_09_07_interactive-phylo-tree.png" alt="interactive-phylo-tree" width=800 /></a></div>

<br />
# Galaxy Track Browser (GTB)

[Trackster](/src/learn/visualization/index.md)
* *New*
  * Rewrite sampling code for **[bigWig](http://genome.ucsc.edu/goldenPath/help/bigWig.html)** / **[bigBed](http://genome.ucsc.edu/goldenPath/help/bigBed.html)**
* *Enhancements*
  * Enable visualization of **[bedGraph](http://genome.ucsc.edu/goldenPath/help/bedgraph.html)** datasets
  * Server-side code for coverage histograms
  * Add feature search to **[Trackster](/src/learn/visualization/index.md)** ; typing in location box will search tracks in visualization for features that start with entered text. Works with **[GFF](/src/learn/datatypes/index.md#gff)**, **[GTF](/src/learn/datatypes/index.md#gtf)**, and **[BED](/src/learn/datatypes/index.md#bed)** datasets. Fixes [https://bitbucket.org/galaxy/galaxy-central/issue/611](https://bitbucket.org/galaxy/galaxy-central/issue/611)

<a href='/src/learn/visualization/index.md'><img src="/src/images/news-graphics/2012_09_07_trackster-feature-search.png" alt="trackster-feature-search.png" width=800 /></a>

<br />
# Source

* *New*
  * A native job runner for the *Condor DRM*, submitted by Jaime Frey
  * `scripts/db_shell.py` is an interactive shell for working with the Galaxy model, contributed by John Chilton
* *Enhancements*
  * New enhancement that adds a security mechanism to the **lwr** job runner, contributed by John Chilton
  * If using `run.sh`, `'$GALAXY_UNIVERSE_CONFIG_DIR'` can be set to a directory containing partial config files, which will be merged in to a single *[universe_wsgi.ini](http://bitbucket.org/galaxy/galaxy-dist/src)*
  * Binary datatype sniffing has been moved to the datatype classes and removed from the upload tool thanks to a contribution by John Chilton.  Local modifications to the upload tool may conflict and should no longer be necessary.  See *[pull request 59](http://bitbucket.org/galaxy/galaxy-central/pull-request/59)* for examples.
* *Removed*
  * `contrib/multiprocess.sh` has been removed. If you're using multiple Galaxy processes, set `'GALAXY_RUN_ALL=1'` in your environment and start/stop as usual with: 

```
$ sh run.sh --daemon/sh run.sh --stop-daemon
```


<br />
# Workflows

* *New* 
  * New parent tag copying for multiple workflow run output histories, contributed by Brad Langhorst. See *[pull request 54](http://bitbucket.org/galaxy/galaxy-central/pull-request/54)*
* *Enhancements* 
  * Workflow API changes to support parameter execution and workflow creation, in collaboration with Richard Park. See *[pull request 55](http://bitbucket.org/galaxy/galaxy-central/pull-request/55)*
  * Additional API changes, contributed by John Chilton. See *[pull request 62](http://bitbucket.org/galaxy/galaxy-central/pull-request/62)*

<br />
# Tool Shed

[Tool Shed](/src/toolshed/index.md)
* *Fixes*
  * Several miscellaneous fixes for using a **[SQLite](http://www.sqlite.org/)** database with a local tool shed.
  * It is no longer possible to change the name of a repository in the tool shed at during the time when the repository is first being cloned.
  * Setting metadata on tool shed repository changeset revisions has been re-engineered, resulting in the resolution of several critical issues.  Repository metadata is now generated for appropriate changeset revisions, and repository contents are now displayed correctly for each changeset revision for which metadata can be generated.  
  * Error messages have been improved for tool shed repositories that include invalid tools.  Clicking on an invalid tool in your repository should provide you the information needed to correct the tool.
  * Tool section labels are now handled correctly in the tool panel (attempting to remove them or change their location in the tool panel used to be problematic).
  * Entries defined in the `tool_shed_conf.xml` file no longer require a trailing '/' in the defined urls.  For example, the following entry used to be necessary:

<div class='indent'><div class='indent'>
```
<tool_shed name="My local tool shed" url="http://localhost:9009/"/>
```


Now the above entry still works, but the following entry is also ok (notice the '/' character after the port number in the url is no longer necessary):

```
<tool_shed name="My local tool shed" url="http://localhost:9009"/>
```

</div></div>

* *Enhancements*
  * The Tool Shed is now running **[Mercurial version 2.2.3](http://mercurial.selenic.com/)**.
  * The **[Freebayes](http://bioinformatics.bc.edu/marthlab/FreeBayes)** repository was updated in the **[Main Galaxy Tool Shed](http://toolshed.g2.bx.psu.edu/)** to *Revision: 7:d3bf1e86b243*, so make sure to get the updates if you have installed it into your **[local Galaxy instance](http://getgalaxy.org)**. For details about getting updates to your installed repositories, see this section of the Galaxy tool shed wiki [Getting updates for tool shed repositories installed in a local Galaxy instance](/src/toolshed/index.md#getting_updates_for_tool_shed_repositories_installed_in_a_local_galaxy_instance)
  * The implementation for importing proprietary datatype class modules included in a tool shed repository now supports class module files whose name conflicts with a **[Python](http://www.python.org/)** standard library module name.  For example, if a proprietary datatype class module is named `xml.py`, it will now be correctly imported even though the name conflicts with the Python standard library's xml module.
  * The repository tip is now displayed in a column that is separate from the repository's installable changeset revisions in the tool shed.

<a href='/src/toolshed/index.md'><img src="/src/images/news-graphics/2012_09_07_repository-grid.png" alt="repository-grid.png" /></a>

* Additional information has been added to the "Tool metadata" page, which is displayed when you choose the "View tool metadata" option from a tool's pop-up menu.  This menu is available in 2 locations: when viewing the repository in a tool shed, and when viewing a repository (which includes tools) that has been installed into a local Galaxy instance.  The additional information added to the Tool metadata page includes:
  * information about tool dependencies if they have been defined in the repository
  * requirements defined in the tool config `<requirements>` tag set
  * The tool's version lineage information, an example of which is shown here for a sample tool named **Filter**

<a href='/src/toolshed/index.md'><img src="/src/images/news-graphics/2012_09_07_view-tool-metadata-page.png" alt="view-tool-metadata-page.png" /></a>

* In addition to browsing repositories that you own, you can now also browse repositories for which you have been granted "write" permission.  Here is a snapshot of the new Galaxy tool shed menu.

<a href='/src/toolshed/index.md'><img src="/src/images/news-graphics/2012_09_07_toolshed-menu.png" alt="toolshed-menu.png" /></a>

<br />
# Bug Fixes

<div class='right'><a href='/src/support/index.md'><img src="/src/images/icons/bug.png" alt="bugs" width=20 /></a></div> 
* *General*
  * Fix permissions problems on `stdout/stderr/errorcode` files when running jobs as the [real system user](/src/archive/dev-news-briefs/2012-01-27/index.md#run_cluster_jobs_as_the_real_user).
  * Galaxy will no longer try to modify permissions of [linked library uploads](/src/admin/Data Libraries/Uploading Library Files/index.md).
  * Galaxy will honor `umask` when creating temporary library archives for download (solves permissions problems when sending via a proxy server).
  * Fix tabular display to serve raw when `preview == False`, which should resolve external display issues.
  * Fix `convert_newlines` and `sep2tabs` to return '0' lines in the event of an empty file, instead of throwing an exception.
  * Fix chunk-serving logic for tabular files - the correct chunks will always be served consecutively now.
* *API*
  * Encode dataset id for dataset returned when rerunning tools.
* *Trackster*
  * Reintroduce directionality indication to single-block features as it is again compatible with current code.
  * For feature tracks, only draw name if available.
  * Only draw connector when both mates of a read are drawn; this prevents spurious connectors from being drawn but prevents connectors from being drawn across tile boundaries.
  * Update track icons when decomposing a composite track into individual tracks.
* *UI*
  * Do not use route memory for dataset save URLs because it introduces harmful parameters.
  * Correct size abbreviation to use uppercase B for bytes.
  * Show images in tool help when rerunning tools and in workflow editor. Fixes [https://bitbucket.org/galaxy/galaxy-central/issue/141](https://bitbucket.org/galaxy/galaxy-central/issue/141)
  * Make *add dataset to trackster* dialog compatible with new modal behavior.
* *Tools*
  * Move implementation of `from_work_dir` attribute from job finish to job command line to make compatible when setting metadata externally.
  * Require **[pileup](http://samtools.sourceforge.net/pileup.shtml)** format as input to `/tools/samtools/pileup_parser.*` tool.
  * Set attribute metadata for **[GFF](/src/learn/datatypes/index.md#gff)** and **[GFF3](/src/learn/datatypes/index.md#gff3)** in addition to **[GTF](/src/learn/datatypes/index.md#gtf)**.

<br />
# Announcements

[News](/src/news/index.md), *[August](/src/galaxy-updates/2012-09/index.md)* and *[September](/src/galaxy-updates/2012-09/index.md)* *2012 Galaxy Updates*

<div class='right'><a href='/src/galaxy-updates/2012-09/index.md'><img src="/src/images/logos/GalaxyUpdate200.png" alt="September 2012 Galaxy Update" width=150 /></a></div>

## Highlights

* ***Aug***
  * [GCC2012 & GCC2013](/src/galaxy-updates/2012-08/index.md#gcc2012--gcc2013): slides and video
  * [29 new papers](/src/galaxy-updates/2012-08/index.md#new-papers)
  * [Tool Shed Contributions](/src/galaxy-updates/2012-08/index.md#toolshed-contributions)
* ***Sept***
  * [41 new papers](/src/galaxy-updates/2012-09/index.md#new-papers)
  * [3 new public Galaxy Servers](/src/galaxy-updates/2012-09/index.md#new-public-servers) 
  * [Upcoming Events and Deadlines](/src/galaxy-updates/2012-09/index.md#upcoming-events-and-deadlines)
  * [New Galaxy-France mailing list](/src/galaxy-updates/2012-09/index.md#new-galaxy-france-mailing-list)
  * [Tool Shed Contributions](/src/galaxy-updates/2012-09/index.md#toolshed-contributions)

## Swiss Galaxy Day

<div class='right'><a href='/src/events/switzerland2012/index.md'><img src="/src/images/logos/2012SwissGalaxyWorkshop-400.png" alt="Swiss Galaxy Day" height="100" /></a></div>

The 1<sup>st</sup> [Swiss Galaxy Workshop](/src/events/switzerland2012/index.md) will be held October 3-4 in Bern, and is aimed at Galaxy administrators and users alike. We also welcome participants who are using other workflow management systems, and tool developers who are looking for such systems to offer their tools to a wider audience. 
 
We would like to discuss the status of the Galaxy project, new developments, interface to other systems, extensions and best practice in reproducible research. 
 
The workshop is part of the SyBIT Tech Day series. 

<br />
## Who's Hiring

<div class='right'><img src="/src/images/icons/PointingFinger.png" alt="Please Help!  Yes you!" width=100 /></div>
The Galaxy is expanding!  Please help it grow.
* The [Galaxy Project is hiring](/src/galaxy-is-hiring/index.md) post-docs @ Penn State and Emory
* [Bioinformatics & Integrative Genomics Specialist - Manager Bioinformatics Consulting Core](http://www.nature.com/naturejobs/science/jobs/275747-Bioinformatics-Integrative-Genomics-Specialist-Manager-Bioinformatics-Consulting-Core) @ Leuven, Belgium
* [Internship @ EMBL Heidelberg building an emBASE-Galaxy Bridge](http://www.sfbi.fr/content/development-embase-galaxy-bridge)

Got a Galaxy-related opening?  Send it to outreach@galaxyproject.org and we'll put it in the [Galaxy News feed](/src/news/index.md) and include it the next [Galaxy Update](/src/galaxy-updates/index.md) and [News Brief](/src/docs/index.md).
<br />
<br />
----
<br />
<br />
# About Galaxy

**[GalaxyProject.org](http://galaxyproject.org)**

The **[Galaxy Team](/src/galaxy-team/index.md)** is a part of **[BX](http://www.bx.psu.edu/)** at [Penn State](http://www.psu.edu/), and the **[Biology](http://www.biology.emory.edu/)** and **[Mathematics and Computer Science](http://www.mathcs.emory.edu/)** departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at **Twitter [@galaxyproject](http://twitter.com/#galaxyproject)** or just read our tweets **[Galaxy on Twitter](/src/galaxy-on-twitter/index.md)**
