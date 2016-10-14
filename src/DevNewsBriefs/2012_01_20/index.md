---
autotoc: true
title: January 20, ,,  2012 Galaxy Development News Brief
---

<div class='right'></div>

## Get Galaxy

<div class='left'><a href='http://getgalaxy.org/'><img src='http://galaxy.psu.edu/static/getgalaxy.png' alt='getgalaxy' width="50px" /></a></div>

 **[getgalaxy.org](http://getgalaxy.org)** 

* **new**: `% hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist`

* **upgrade**: `% hg pull -u -r 63bc46cc73b7`


## News & Events
* Make your plans!! **[GCC2012](/Events/GCC2012)**
* New [Galaxy Group @ CiteULike](/News/New Galaxy Group @ CiteULike)
* Find it *now* with [Custom Galaxy Web Searches](/News/Custom Galaxy Search)
* New low-volume mailing list: [Galaxy-Announce](/News/New Galaxy-Announce Mailing List)

## Object Store

Galaxy now has a layer between the front end and disk files, and this layer is the **Object Store**.  It allows Galaxy installations to make use of data living in more than simply a single filesystem of locally mounted disk - there are backends for a distributed store (many locally accessible filesystems) or [Amazon S3](http://aws.amazon.com/s3/) (in development).  Configuration is trivial via the Galaxy config file.  See the new **`object_store`** option and those following it!

## Tools
* **[TopHat:](http://tophat.cbcb.umd.edu/)**
  * Wrapper accepts versions 1.3.1-1.4.0, with at least 1.3.3 recommended. 1.4.0 is preferred.
  * Galaxy [/Main](/Main) is now running version 1.4.0.
* **[Cufflinks, CuffCompare, CuffDiff:](http://cufflinks.cbcb.umd.edu/)** 
  * Wrapper accepts versions 1.1.0-1.3.0. 1.3.0 is preferred.
  * Galaxy [/Main](/Main) is now running version 1.3.0 for all Cuff* tools.
* **[SAMTools mpileup:](http://samtools.sourceforge.net/mpileup.shtml)**
  * Wrapper for use in local instances.
  * Not available on Galaxy [/Main](/Main) at this time.
* **[GenomeSpace](http://www.genomespace.org/)** import from file browser tool updated to use their newer API.
* **[EBI ENA SRA](http://www.ebi.ac.uk/ena/)** tool contributed by Iain Cleland.
* **[Picard](http://sourceforge.net/projects/picard/) Interval List to [BED6](http://genome.ucsc.edu/FAQ/FAQformat.html#format1)** converter added.
* **[UCSC VCF](http://genome.ucsc.edu/goldenPath/help/vcf.html)** external display application added.

## Galaxy Track Browser (Trackster)
* Recent publication:
    Jeremy Goecks, Kanwei Li, Dave Clements, Team, The Galaxy, James Taylor, *[The Galaxy Track Browser: Transforming the genome browser from visualization tool to analysis tool](http://ieeexplore.ieee.org/xpl/freeabs_all.jsp?arnumber=6094046)*. [Biological Data Visualization (BioVis), 2011 IEEE Symposium on](http://www.biovis.net/) (October 2011), pp. 39-46. 
* Simplified user interface that uses icons exclusively for actions.
* Numerous performance improvements.
* SAM datasets (including very deep) can be visualized.
* All rows for feature tracks--BED, GTF, SAM, BAM--can now be displayed.
* Custom composite tracks now available: any amount of wiggle data can be combined into a single track. See Fig.1.

![](/Images/NewsGraphics/2012_01_20_composite-tracks.png)<br />
**Fig. 1** shows a Visualization of a "rainbow" composite track generated via a "drag-and-drop" method within the Trackster UI itself. The top three individual conservation tracks are combined into a fourth single composite track underneath.

## Workflows
* SAM merge functionality for job splitting.
* Default static wrapping now works with favicon.ico and robots.txt (and other static files that may need to be mapped to in the future).
* Provide default for robots.txt being pulled from config.
* The email workflow action now happens even on job failure.

## Source
* User interface (UI): A history item's details page (linked from the "View Details" ![](/Images/Icons/HistoryInfo.png) icon) now contains links to the `STDOUT` and `STDERR` captured when running a tool's job command line.
* Job Management: A new setting in the Galaxy config file, `cleanup_job` can take one of three values, `always` (the default), `never`, or `onsuccess`. This controls when temporary data, such as a job's working directory, external metadata files, and DRM output/error files are cleaned up.
* **[JQuery](http://jquery.com/)** updated to 1.7.1
* Updated all tools which were manually filtering on tool_data_tables to determine paths to use built-in param.fields.path.
* Allow select_param.fields.name method of accessing additional attributes from dynamic options work for multiple selects.
* Merged in hanfeisun/galaxy-central-i18n (pull request #26).
* Enhance the datatypes registry to: 
  * (a) enable use of config files that do not include a "sniffers" tag set section 
  * (b) not load a datatype if the registry already includes a datatype with that extension
* Enhance the datatypes registry so that it can be persisted as an xml file, which is then used for all tools instead of the datatypes config file.
* Eliminate all references and support for datatype indexers since they have never been used - datatype converters do the same thing.
* Security: sanitize output anytime a raw text/html dataset is served via dataset/display.
* Security: sanitizer also now removes javascript content from sanitized anchors, and correctly prevents a whitespace loophole.
* !ObjectStore: Variable multiple outputs (collect_primary_datasets) and components that use collect_child_datasets tuned for new process.

## Tool Shed
* New features:
  * Add the ability to reset all metadata (for every change set) in a tool shed repository (currently restricted to an admin).
  * Enhance User preferences within a Galaxy tool shed to enable users to elect to receive email when content is first uploaded to a new repository. Also add a new grid interface to enable users to easily manage registering with any tool shed respositories to receive email when changes are made to the selected repositories.
* Existing tool shed fixes:
  * Make the use of the 'require_login' config setting functionally correct for the tool shed, and debug it's use in the Galaxy framework as well.
  * Enhance the process for displaying a workflow in a tool shed repository so that workflows in change sets other than the repository tip can be viewed.
  * Do not allow public user names to be changed within the tool shed if the user has created a tool shed repository.
  * Don't allow repository names to be changed if the repository has been cloned at least 1 time.
* More new tool shed features documented in the following new Galaxy wiki sections:
  * [Including proprietary data types that subclass from Galaxy data types in the distribution](/Tool Shed#including_proprietary_data_types_that_subclass_from_galaxy_data_types_in_the_distribution)
  * [Including proprietary data types that use class modules contained in your repository](/Tool Shed#including_proprietary_data_types_that_use_class_modules_contained_in_your_repository)
  * [Including datatype converters and display applications](/Tool Shed#including_datatype_converters_and_display_applications)
  * [Automatic installation of Galaxy tool shed repository data types into a local Galaxy instance](/Tool Shed#automatic_installation_of_galaxy_tool_shed_repository_data_types_into_a_local_galaxy_instance)
  * [Getting updates for tool shed repositories installed in a local Galaxy instance](/Tool Shed#getting_updates_for_tool_shed_repositories_installed_in_a_local_galaxy_instance)
  * [Migrating tools from the Galaxy distribution to the Galaxy main tool shed](/Tool Shed#migrating_tools_from_the_galaxy_distribution_to_the_galaxy_main_tool_shed)
  * [Configuring your Galaxy server to automatically install tools eliminated from the Galaxy distribution](/Tool Shed#configuring_your_galaxy_server_to_automatically_install_tools_eliminated_from_the_galaxy_distribution)
  * [Use case: automatically install the Emboss tools and datatypes into a local Galaxy instance](/Tool Shed#use_case_automatically_install_the_emboss_tools_and_datatypes_into_a_local_galaxy_instance)

## Tool Shed Contributions
* New in the [Tool Shed](http://toolshed.g2.bx.psu.edu/):
  * `garli, tandem_repeats_finder`, by `malex`
  * `data_nfs` - Import/export to FTP/NFS directories, by Ed Kirton
  * `tapdance` - by Jesse Erdmann
  * `bedtools` - by Aaron Quinlan
  * `ncbo_services` - by Mikel Egaña Aranguren
  * `repeat_masker, trna_prediction, glimmer3, glimmer_hmm` - by Björn Grüning
* Updated:
  * `ssr_marker_design` - by John !McCallum
  * `fastq_paired_unpaired, mira-assembler` - by Peter Cock

## Bug Fixes
<div class='right'><a href='/Support'><img src='/Images/Icons/bug.png' alt='bugs' width="20" /></a></div> 
* Support display of extra files/composite types in published items. Fixes [https://bitbucket.org/galaxy/galaxy-central/issue/628](https://bitbucket.org/galaxy/galaxy-central/issue/628)
* Standardize code and error messages on 'public name' rather than 'username'
* When exporting a history archive, use user dataset names rather than Galaxy dataset names. Fixes [https://bitbucket.org/galaxy/galaxy-central/issue/680](https://bitbucket.org/galaxy/galaxy-central/issue/680)
* Update EMBOSS tools to use quotes to escape user specified parameters during commandline substitution. Fixes [https://bitbucket.org/galaxy/galaxy-central/issue/610](https://bitbucket.org/galaxy/galaxy-central/issue/610)
* Escape backslashes and quotes in name attributes for UCSC external display applications which use bigDataUrls. Remove no longer required strip_https attribute. Fixes [https://bitbucket.org/galaxy/galaxy-central/issue/627](https://bitbucket.org/galaxy/galaxy-central/issue/627)
* UCSC BAM display will now pass the pairEndsByName attribute. Fixes [https://bitbucket.org/galaxy/galaxy-central/issue/455](https://bitbucket.org/galaxy/galaxy-central/issue/455)
* Allow tools with zero inputs. Fixes [https://bitbucket.org/galaxy/galaxy-central/issue/463](https://bitbucket.org/galaxy/galaxy-central/issue/463)
* Allow not specifying a value attribute for an optional tool parameter. Partially fixes [https://bitbucket.org/galaxy/galaxy-central/issue/661](https://bitbucket.org/galaxy/galaxy-central/issue/661)
* Add __non_zero__ method to !ToolParameterValueWrappers. Allows boolean checks directly on wrapped parameter values. Fixes [https://bitbucket.org/galaxy/galaxy-central/issue/661](https://bitbucket.org/galaxy/galaxy-central/issue/661)
* Display application configuration not supported in Automatic Installation. Fixes [https://bitbucket.org/galaxy/galaxy-central/issue/695](https://bitbucket.org/galaxy/galaxy-central/issue/695)
* Data types configuration not supported in Automatic Installation. Fixes [https://bitbucket.org/galaxy/galaxy-central/issue/696](https://bitbucket.org/galaxy/galaxy-central/issue/696)
* Fix for browsing libraries in IE.  Previously json2 wasn't being loaded, which is needed in IE for jstorage to work.

---

## About Galaxy
**[GalaxyProject.org](http://galaxyproject.org)**

The **[GalaxyTeam](http://bitbucket.org/galaxy/galaxy-central/wiki/GalaxyTeam/)** is a part of **[BX](http://www.bx.psu.edu/)** at [Penn State](http://www.psu.edu/), and the **[Biology](http://www.biology.emory.edu/)** and **[Mathematics and Computer Science](http://www.mathcs.emory.edu/)** departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at **Twitter [@galaxyproject](http://twitter.com/#galaxyproject)**
---
