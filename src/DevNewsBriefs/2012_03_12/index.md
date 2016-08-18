---
autotoc: true
---
<br />
<div class="title">March 12, 2012 Galaxy Development News Brief</div>
<br />

# Get Galaxy

<div class='left'><a href='http://getgalaxy.org/'><img src='http://galaxy.psu.edu/static/getgalaxy.png' alt='getgalaxy' width="50px" /></a></div>

 **[getgalaxy.org](http://getgalaxy.org)** 

**new**: `% hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist`

**upgrade**: `% hg pull -u -r 40f1816d6857`

<br />
<br />

# Important Changes to Tool Organization

## The Emboss tools and Emboss datatypes will be eliminated from the Galaxy distribution in the NEXT release (not this one).  Other tools currently in the Galaxy distribution will be eliminated in following releases.  Those hosting local Galaxy instances should read this revised "Migrating tools" section of the Galaxy tool shed wiki to understand how this process will work:
<div class='right'><a href='http://toolshed.g2.bx.psu.edu'><img src='/Images/Logos/ToolShed.jpg' alt='tool shed' width="150px" /></a></div>
## Migrating tools from the Galaxy distribution to the Galaxy Main tool shed
In 2012, the Galaxy development team will begin the process of **migrating the tools that are currently available in the Galaxy distribution to the [Galaxy Main tool shed](http://toolshed.g2.bx.psu.edu/)**.  This will enable those that host local Galaxy instances much more flexibility in choosing to provide only those specific tools in which their users are interested. [Read more...](/Tool Shed/#migrating_tools_from_the_galaxy_distribution_to_the_galaxy_main_tool_shed)

## XML configuration files used to populate your Galaxy tool panel
In the past, the file named by your "tool_config_file" configuration setting in your "universe_wsgi.ini" file was the only file used to populate your Galaxy tool panel.  The default name for this file is **tool_conf.xml**.  Since this was the only file involved in populating your Galaxy tool panel, it defined the items (tools, workflows, sections and labels) that would be displayed and the way in which they would be arranged. [Read more...](/Tool Shed/#xml_configuration_files_used_to_populate_your_galaxy_tool_panel)

## Managing the layout of your Galaxy tool panel
The 3 or more files described in the previous section ("tool_conf.xml", one or more "shed_tool_conf.xml files", and "migrated_tools_conf.xml") are all used to load tool panel items (tools, sections, labels and workflows).  A new file named **integrated_tool_panel.xml** has been introduced to define the arrangement for displaying these loaded items in your Galaxy tool panel. [Read more...](/Tool Shed/#managing_the_layout_of_your_galaxy_tool_panel)

## Galaxy Tool Versions
When included in the Galaxy distribution, tools are defined by "id" and "version", among other attributes.  For example, the filter tool has id="Filter1" and version="1.1.0".  When installed from a tool shed, the tool's id becomes its "guid" attribute from the tool shed.  If it is migrated from the Galaxy distribution to the tool shed, the filter tool will have the guid: "toolshed.g2.bx.psu.edu/repos/devteam/filter/Filter1/1.1.0".  To provide backward compatibility for Galaxy workflows and the rerun button in a Galaxy history item, a mapping between the tool's old id and version and its new id (guid) is provided by building a chain of relationships between tool versions.  This happens automatically for every tool that is loaded into your Galaxy instance. [Read more...](/Tool Shed/#galaxy_tool_versions)

## New tool shed related features in Galaxy

1) When an installed tool shed repository that contains tools is being reinstalled, allow the admin to select a different section in the tool panel (than was originally selected when the repository was last installed) to contain the included tools.

2) Load proprietary datatypes from installed tool shed repositories before the datatypes in the Galaxy distribution are loaded. We do this because the distribution includes some extremely generic sniffers (e.g., text,xml) which will catch pretty much anything, making it impossible for proprietary sniffers to be used. Proprietary datatypes contained in installed repositories are loaded in order of oldest installation first, followed by next oldest installation, etc. In handling conflicts (2 different datatypes that use the same extension), the rule is that a datatype currently being loaded will always override a conflicting datatypes that was previously loaded. Since datatypes defined in Galaxy's datatypes_conf.xml file are loaded last, they will override conflicts that may occur if tool shed repositories that contained datatypes were installed. If a new tool shed repository is being installed into a running Galaxy instance, conflicting datatypes will not override those currently in the datatypes registry.

## Tool shed related fixes in Galaxy
1) Fix for rendering the page that allows you to select a tool section in which to include tools contained in a repository installed from a tool shed where the tool panel includes tool section labels.
2) Load empty tool sections into the in-memory tool_panel dictionary, just don't display them in the tool panel.

<br />
<br />
# New & Updated Tools
*Many tools have been recently upgraded. Please review* [/Admin/Config/Tool Dependencies](/Admin/Config/Tool Dependencies) *for these and other recently updated Tool Dependencies. Please see * [Galaxy's Main Tool Shed](http://toolshed.g2.bx.psu.edu/) * for additional new tools.*
* **RNA-Seq Tools**
  * Added **[CuffMerge](http://cufflinks.cbcb.umd.edu/)** version 1.0.0
    * Requires helper script: **gtf_to_sam** version 1.3.0
  * Updates for **[Cufflinks/compare/merge/diff tools](http://cufflinks.cbcb.umd.edu/)**
    * Modified default parameter values on tool form
    * Improved error message when bias correction/sequence data cannot be used
* Updates for **[TopHat](http://tophat.cbcb.umd.edu/)**
  * Remove maximum value for [TopHat](http://tophat.cbcb.umd.edu/) parameter `initial_read_mismatches`
* Added **[RViewer](http://rviewer.lbl.gov/rviewer/)** external display application
* Updated **[IGV](http://www.broadinstitute.org/igv/)** external display application, so that displays using vcf_bgzip will now maintain vcf headers

# Galaxy Track Browser (GTB)
**[Trackster](/Learn/Visualization)**
* *New:*
  * Enable visualization of [ENCODE](http://genome.ucsc.edu/ENCODE/) peak tracks (see graphic below)
  * Dynamic filtering of read tracks using quality scores
  * Enable toggling between groups of individual tracks and composite tracks
  * Enable Composite Tracks to be saved and restored
  * Make track min and max values editable inline
  * Save and restore track/group filters and tool state
* *Bug fixes:*
  * Clear reference track when changing chromosomes
  * To only show differences if reference data is available
  * Use sum rather than mean for data aggregation in BBIDataProvider
  * Indicate changes when config values are changed or items are reordered or grouped
  * Move 'more rows' icon from tile level to track level 

Trackster visualization of [ENCODE](http://genome.ucsc.edu/ENCODE/) and Composite Track data using dynamic filters
</div><a href='/Learn/Visualization/'><img src='/Images/NewsGraphics/2012_03_12_trackster-encode.png' alt='trackster-encode' width="800px" /></a></div>

<br />
# Workflows
* Properly select only Input Dataset steps for multi-input configuration
* Update and clarify label selector
* Multiple run workflows now copy input datasets to newly created histories when used.
* Add a more useful error message when input keys don't map upon executing a workflow instead of tossing to Server Error:
  * *example,* This happens in situations where outputs are conditionally filtered yet still used in the workflows. (See SICER's significant_islands_summary_output_file)
* Add the ability to remove workflows that have been shared with you
* When workflow output is placed into separate new histories, naming is now based on the varied input dataset instead of the execution number:
  * *example,* "<workflowname> on <varied_input>".
* Add the ability to view your own workflows in plain display mode as if you had shared it
* Additional rename options available to Rename Datasets action (thanks to Dave Walton)
```
        Syntax:
            #{inputs_file_variable | option 1 | option n}
            where:
                 input_file_variable = is the name of a module input variable
                 |  = the delimiter for added options. Optional if no options.
                 options = basename, upper, lower
                 basename = keep all of the file name except the extension
                            (everything before the final ".")
                 upper = force the file name to upper case
                 lower = force the file name to lower case
        Example:
            #{input1 | basename | upper}
```


# User Interface (UI)
* Improved language in *Import workflow* dialog box
* Change default sort order for *Shared Data -> Pages* list to be by update time
* Style updates for embedded items to reduce visual footprint

# Data and Libraries
* In library uploads:
  * Allow inheriting the existing datasets metadata when replacing
  * Allow setting library metadata when adding datasets from a history

# CloudMan
**[/CloudMan](/CloudMan)**
* A larger tools volume (10GB vs old 2GB) is now the default for any new [/CloudMan](/CloudMan) cluster making it easier to customize your Galaxy Cloud instances
* A [preliminary support for OpenNebula cloud type](http://bitbucket.org/galaxy/cloudman/src/tip/cm/clouds/opennebula.py) exists within [/CloudMan](/CloudMan) (thanks to Mattias de Hollander)
* Please continue to use AMI **ami-da58aab3** for Galaxy Cloud clusters, as listed on [usegalaxy.org/cloud](/CloudMan). There is another AMI dated from Feb 26, 2012 that was not created by the Galaxy Team and is not supported by us. 

# Source
**[galaxy-cental](http://bitbucket.org/galaxy/galaxy-central/src/)**,
**[galaxy-dist](http://bitbucket.org/galaxy/galaxy-dist/src/)**
* Parameterize per-tool job runners so that parameter name/value pairs can be used to define multiple runners per tool
  * Documentation is in [universe_wsgi.ini.sample](http://bitbucket.org/galaxy/galaxy-central/src/3c32b4a448c6/universe_wsgi.ini.sample)
  * Add 'params' column to jobs table to store job parameters
  * Add source parameter for all jobs initiated in Trackster
* Enable *Pages* and *Trackster* by default in [universe_wsgi.ini.sample](http://bitbucket.org/galaxy/galaxy-central/src/3c32b4a448c6/universe_wsgi.ini.sample)
* History export now possible for a guest user
* Egg Update: [boto](https://github.com/boto/boto) 2.2.2
* Preliminary autopacking for javascript:
  * Disabled by default (`pack_scripts` in [universe_wsgi.ini.sample](http://bitbucket.org/galaxy/galaxy-central/src/3c32b4a448c6/universe_wsgi.ini.sample)) and the packed scripts are still in the distribution, to be removed at some point.
* Job Splitting:
  * Merged in `peterjc/galaxy-central/split_blast` (pull request #37).  Provides support for running parallelized blast, merging xml, and some refactoring.
* New [universe_wsgi.ini.sample](http://bitbucket.org/galaxy/galaxy-central/src/3c32b4a448c6/universe_wsgi.ini.sample) configuration option (`sanitize_all_html`):
  * Enabled by default; to prevent html dataset display sanitization, set to false
* DRMAA Job Runner changes:
  * Set a descriptive job name in the DRM
  * Use the value of `cluster_files_directory` instead of the hardcoded `database/pbs/` directory

# Bug Fixes
<div class='right'><a href='/Support/'><img src='/Images/Icons/bug.png' alt='bugs' width="20" /></a></div> 
* Fix for 'Error 349 (net::ERR_RESPONSE_HEADERS_MULTIPLE_CONTENT_DISPOSITION): Multiple Content-Disposition headers received.' error occuring when downloading certain datasets using Chrome browser
* Correction to *History Size* calculation to accurately filter out 'purged' datasets in the summary size
* Various bug fixes for Object Store, with a particular focus on the Distributed Object Store

# Announcements
**[/News](/News)**

**March 2012** ***[Galaxy Update](/GalaxyUpdates/2012_03)***

## GCC2012 Update
<div class='right'><a href='/Events/GCC2012/'><img src='/Events/GCC2012/GCC2012Logo200.png' alt='2012 Galaxy Community Conference' height="100" /></a><br /><br /><a href='/Events/GCC2012/TrainingDay/'><img src='/Events/GCC2012/GCC2012TrainingDayLogo.png' alt='Training Day' width="130" /></a></div>
* The [2012 Galaxy Community Conference (GCC2012)](/Events/GCC2012) will be held July 25-27, in Chicago. 
* The conference will feature two full days of presentations and discussions. 
* [Abstract submission](/Events/GCC2012/Abstracts) will [close April 16](/Events/GCC2012/Key Dates). 
* A [whole day of training](/Events/GCC2012/TrainingDay) has been added, and topics set:
  * [Introduction to Galaxy](/Events/GCC2012/TrainingDay/#ws2)
  * [Installing Your Own Galaxy](/Events/GCC2012/TrainingDay/#ws5)
  * [Galaxy CloudMan](/Events/GCC2012/TrainingDay/#ws3)
  * [Integrating Tools & Data Sources](/Events/GCC2012/TrainingDay/#ws1)
  * [Galaxy API](/Events/GCC2012/TrainingDay/#ws6)
  * [Galaxy Tool Shed](/Events/GCC2012/TrainingDay/#ws7)
  * [Ion Torrent - Open Source Sequencing](/Events/GCC2012/TrainingDay/#ws10)
* Early [registration](/Events/GCC2012/Register) will open **any day now** and close June 11. 

## Galaxy is Hiring!
<div class='left'>![Galaxy wants YOU](/Images/Icons/PointingFinger.png)<div class='center'></div></div>
**The [Galaxy Team](/GalaxyTeam) Wants You!**
<br />
Want to work on one of the fastest growing open source bioinformatics projects around?  The [Galaxy Project](http://galaxyproject.org/), a highly successful high throughput data analysis platform for Life Sciences with over 15,000 users worldwide, is hiring. [Read more...](/GalaxyIsHiring)

----

# About Galaxy
**[GalaxyProject.org](http://galaxyproject.org)**

The **[GalaxyTeam](http://bitbucket.org/galaxy/galaxy-central/wiki/GalaxyTeam/)** is a part of **[BX](http://www.bx.psu.edu/)** at [Penn State](http://www.psu.edu/), and the **[Biology](http://www.biology.emory.edu/)** and **[Mathematics and Computer Science](http://www.mathcs.emory.edu/)** departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at **Twitter [@galaxyproject](http://twitter.com/#galaxyproject)** or just read our tweets **[/Galaxy on Twitter](/Galaxy on Twitter)**
----
</div> Jennifer Jackson, [Galaxy Team](/GalaxyTeam). Posted to [/DevNewsBriefs](/DevNewsBriefs) on <<Date(2012-03-12T20:52:29Z)>></div>
