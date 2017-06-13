---
title: Development News Brief
date: 2011-05-20
---

----
[Get Galaxy!](http://bitbucket.org/galaxy/galaxy-central/wiki/GetGalaxy)

new: `% hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist`

upgrade: `% hg pull -u -r 8c11dd28a3cf`

----
## GCC 2011

**May 24-26, 2011 Galaxy Community Conference**, Lunteren, The Netherlands.
 [http://galaxy.psu.edu/gcc2011/](http://galaxy.psu.edu/gcc2011/)

----

## What's New

### NBIC Galaxy Hackathon Results

Two new features (so far) were created and added to Galaxy from the May conference.

#### Hackaton: tool_conf.xml Autogeneration

Work from the NBIC Galaxy Hackathon by Rob Hooft, Henk van den Toorn,
and Wil Koetsier which adds new optional tags to tool configuration
files, and a script which uses these tags to automatically generate
tool_conf.xml.

The scripts can be found at:

* scripts/build_toolbox.py
* scripts/extract_toolbox_sections.py

Documentation on the new XML tags and how to use the scripts has not yet
been prepared.

#### Hackathon: Tool Tags

Work from the NBIC Galaxy Hackathon by Freek de Bruijn, Alex Bossers,
and Nate Coraor which enables associating tags with tools.  This feature
requires 'enable_tool_tags = True' since there are some inefficient
database operations performed during tool loading to support this
feature.

Tool authors can specify tags directly in tool configuration files with
the new optional <tags> tagset:

```
  <tags>
    <tag>ngs</tag>
    <tag>mapping</tag>
  </tags>
```


If used with the tool_conf.xml autogeneration scripts, this will create
<tool> tags containing a new "tags" attribute:

  <tool file="example/example.xml" tags="ngs,mapping"/>

Upon startup, Galaxy associates these tags with the tools and presents
them in a cloud at the top of the tool menu when unhidden via the tool
panel's "Options" menu.

### Picard

[http://picard.sourceforge.net](http://picard.sourceforge.net)

New Galaxy tools wrapping the most commonly used ***Picard*** functions related to metrics and repair of mapped short read sequencing.

#### Metrics include

* *BAM* index statistics (count of mapped reads by reference chromosome)
* Alignment summary
* Hybrid selection (for targeted data)
* Insert size (for paired reads)
* Library complexity

#### Repair tools include

* Fix mate pair, mark optical/pcr duplicates
* Add or replace read groups
* *SAM/BAM*: replace headers and/or reorder based on a different reference

### FastQC

[http://www.bioinformatics.bbsrc.ac.uk/projects/fastqc/](http://www.bioinformatics.bbsrc.ac.uk/projects/fastqc/)

New tool wrapper generates a comprehensive and useful QC report.

#### Inputs and Outputs

* This wrapper will accept any *FASTQ*, *SAM*, or *BAM* file as primary input. It will also take an optional file containing a list of contaminants information, in the form of a tab-delimited file with 2 columns, name and sequence.
* The tool produces a single HTML output file that contains all of the results, including the following basic statistics:
  * Per base sequence quality
  * Per sequence quality scores
  * Per base sequence content
  * Per base GC content
  * Per sequence GC content
  * Per base N content
  * Sequence Length Distribution
  * Sequence Duplication Levels
  * Overrepresented sequences

![](/src/archive/dev-news-briefs/2011-05-20/2011_05_20_fastqc.png)

### Workflows & Multiple datasets

Workflows can now be run on multiple datasets at the same time.  The run workflow page will now show a new stacked dataset icon.  

![](/src/archive/dev-news-briefs/2011-05-20/2011_05_20_workflow1.png)

Upon clicking that, the selection box changes to a multi-select, and an independent workflow execution will occur for each of these input dataset steps.  The rest of the parameters of the workflow will be identical.  Combining this functionality with the existing "Send results to a new history" option will send the results of *each* workflow execution to a separate history, numbered sequentially "<name> 1", "<name> 2", etc., where <name> is whatever text you put in the new history name box.

![](/src/archive/dev-news-briefs/2011-05-20/2011_05_20_workflow2.png)

Please note that this new type of "multiple-input dataset" step can currently be used only once in any individual workflow.

----

## Updated & Improved

### Current Tools

* *BAM to SAM* tool can now optionally output headers.
* *GFF*,*GFF3*,*GTF* related
  * Gracefully handle parsing errors in GFFReader and accurately compute raw size of *GFF* features.
  * Enable *GFF* and *GFF3* attributes to be written in *GTF* format.
  * Make *Operate on Genomic Intervals (GOPS)* intersect and subtract tools compatible with *GFF* features rather than *GFF* lines.
  * Enable *GFF* filter attributes tool to accept arbitrary conditions.
* Datasource tools: Remove hard-coded special-case handling of *UCSC Table Browser* and *GBrowse* datasource tools; functionality remains, but is now a part of the individual tool's XML configuration files. Auto-detect is now available by providing data_type=auto parameters.
* Make *Cufflinks*, *Cuffcompare*, and *Cuffdiff* wrappers compatible with v1.0.1 (new option implementation pending).
* *BWA* wrapper enhancement 
  * The Galaxy *BWA* wrappers (for *Illumina* and for *SOLiD*) were updated for version 0.5.9 of *BWA*. Three new options have been added to them: Maximum number of alignments to output in the XA tag for reads paired properly (samse/sampe -n); Maximum number of alignments to output in the XA tag for disconcordant read pairs (excluding singletons) (sampe -N); and Specify the read group (samse/sampe -r).
  * If read groups are to be specified, the following aspects MUST be set:
    * Read group identifier (ID)
    * Library name
    * Platform/technology used to produce the reads sample
  * And the following can be set:
    * Sequencing center that produced the read
    * Description
    * Date that run was produced
    * Flow order
    * Array of nucleotide bases that correspond to the key sequence of each read
    * Programs used for processing the read group
    * Predicted median insert size
    * Platform unit
  * Formerly, when sampse/sampe -n was specified, it would cause *BWA* to output a format other than SAM. This is no longer the case. The *BWA* manual can be found at [http://bio-bwa.sourceforge.net/bwa.shtml](http://bio-bwa.sourceforge.net/bwa.shtml)
* *SAM* header
  * For several wrappers where *SAM* header suppression was optional (*BWA, BFAST, Bowtie, SRMA*), the default was changed to NOT suppress, however it is still optional.
  * Bam-to-sam now keeps the header in the *BAM* file. 
* Setting of output *dbkey*
  * Outputs for the following now are correctly set to the relevant dbkey (for reference dbkey whether using built-in or one from history): *Freebayes, SRMA, Mosaik, BFAST, Bowtie, BWA, sam-to-bam, and bam-to-sam*. 

### New Tools

* *GATK* 
  * *note* These tool integrations should be considered alpha. Changes are not necessarily backwards-compatible with workflows or re-run functionality.
  * *Realigner Target Creator* 
  * *Indel Realigner*
  * *Count Covariates*
  * *Table Recalibration* 
  * *Analyze Covariates*
  * *Unified Genotyper* 
* Add tool *Filter GTF by attribute values list*. Tool filters a *GTF* based on a list of attribute values. The tool is especially useful as a downstream analysis tool for filtering *GTF* files based on *Cuffdiff* outputs.

### Trackster

* Greatly improve LineTrack performance to fetch optimal amount of data for display.
* Add support for *Operate on Genomic Intervals (GOPS)* intersect and subtract tool.
* Enable users not logged in to use tools in shared visualizations.
* Add support for static tool select parameters.
* Enable datasets that cannot be indexed to be used as tool inputs.
* Ensure that reads are drawn in squish and pack modes even when view area is large by setting a minimum width of 1px.
* Add histogram mode to feature tracks so that user can generate coverage histogram at any level of data.
* Use user preferences when drawing summary tree.
* Enable a tool to be run on complete dataset or a visible region.

### User Interface (UI)

* Show rerun and info buttons in dataset previews for additional states (e.g. running, queued).
* Show details button functional for all tools run within a history, even if currently retired.
* Show inheritance chain for datasets expanded to note if source was another history or a library.

### CloudMan

* Cloud instance sharing: now share your entire cloud instance deployment (including data, analyses, and/or customizations) with the world or specific users with a click of a button.

![](/src/archive/dev-news-briefs/2011-05-20/2011_05_20_cloudman1.png)

### Source

* Reserved/predefined tool template values
  * Tool command line templates may make use of certain variables

pre-defined by the Galaxy framework.  Some of these already existed but
were undocumented.  All have been changed to use a common (pythonic)
naming scheme, but the old names are retained for backwards
compatibility:
* new name = old name (if any) = value description
* __new_file_path__ = universe_wsgi.ini new_file_path value
* __tool_data_path__ = GALAXY_DATA_INDEX_DIR = universe_wsgi.ini tool_data_path value
* __root_dir__ = GALAXY_ROOT_DIR = Top-level Galaxy source directory made absolute via os.path.abspath()
* __datatypes_config__ = GALAXY_DATATYPES_CONF_FILE = universe_wsgi.ini datatypes_config value
* __user_id__ = userId = Email's numeric ID (id column of galaxy_user table in the database)
* __user_email__ = userEmail = User's email address
* __app__ = The galaxy.app.UniverseApplication instance, gives access to
* __app__.config and much more.  Should be used as a last resort, may go away in future releases.

### Tool Framework

* When label text for a static option in a *SelectToolParameter* is not provided, default to using the 'value'.
* Fix for dynamic options when referencing a *DataToolParameter* that has already been wrapped.
* Only allow a user to rerun if they have access permissions on the dataset.

### Test Framework

* Add a "contains" compare type to functional tests. Enables simple checking for substrings in a test output file, on a line-by-line basis.
* Fix for expand grouping to allow toolbox tests to use the default parameter value.

### Bug Fixes

* Have *MACS* peak caller wrapper use return code to set error state. Fixes issues seen when MACS was be green, despite encountering fatal errors.
* Fix hyperlinks in *Cuffcompare* and *Cuffdiff* documentation.
* Add support for comment handling to gff_to_interval_index tool.
* Workflow Parameter bugfix for the improperly handled case when a parameter isn't used in any workflow step, but should still be available for PJAs.
* Bugfix for workflow run not reloading history.
* *SGE/DRMAA* runners did not respect the value set in cluster_files_directory.
* Galaxy did not set a public username when 'use_remote_user = True' and did not provide an interface to set it.  Upon account creation, Galaxy will now automatically create a public username matching the username portion of the user's email address, with any non-alphanumeric characters replaced with a '-'.  If the username is not unique, a '1' is appended, and then incremented until the username is unique.  Users may modify their public username via the User menu in the masthead.

----

### About Galaxy

The **Galaxy team** is a part of [BX](http://www.bx.psu.edu/) at [Penn State](http://www.psu.edu/), and the [Biology](http://www.biology.emory.edu/) and [Mathematics and Computer Science](http://www.mathcs.emory.edu/) departments at [Emory University](http://www.emory.edu/home/index.html). 

**Galaxy** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).


[GalaxyTeam](http://bitbucket.org/galaxy/galaxy-central/wiki/GalaxyTeam)

[Use Galaxy!](http://usegalaxy.org)

[GalaxyProject.org](http://galaxyproject.org)


Join us at **Twitter**

```#usegalaxy```


[http://twitter.com/#!/search/galaxyproject](http://twitter.com/#!/search/galaxyproject) 


----
