---
autotoc: true
---
# November 18, 2011 Galaxy Development News Brief
<div class='right'></div>

## Get Galaxy

<div class='left'><a href='http://getgalaxy.org/'><img src='http://galaxy.psu.edu/static/getgalaxy.png' alt='getgalaxy' width="50px" /></a></div>

 **[getgalaxy.org](http://getgalaxy.org)**

* **new**: `% hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist`

* **upgrade**: `% hg pull -u -r b258de1e6cea`

## News & Events

<div class='left'><a href='/GalaxyIsHiring'><img src='/Images/Icons/PointingFinger.png' alt='pointing-finger' width="30px" /></a></div>
* Keep current on all things Galaxy at our [/News](/src/News/index.md) and [/Events](/src/Events/index.md) wikis.
* Galaxy is still [hiring](/src/GalaxyIsHiring/index.md)!

### GCC 2012 is Scheduled!

<div class='right'><a href='/Events/GCC2012'><img src='/Events/GCC2012/GCC2012Logo200.png' alt='GCC 2012' width="180" /></a></div>

**We are pleased to announce that the [2012 Galaxy Community Conference (GCC2012)](/src/Events/GCC2012/index.md) has been scheduled for July 25-27 in Chicago, Illinois, United States.**  

GCC2012 will be held at the [University of Illinois Chicago (UIC)](http://uic.edu/) campus in downtown Chicago.  See the [GCC2012 conference web page](/src/Events/GCC2012/index.md) for more, including [opportunities to sponsor](/src/Events/GCC2012/Sponsorships/index.md) this year's conference.

Some things will be the same as in previous years, but we are also using feedback from last year to guide the 2012 meeting.  We will again be seeking talks (full and lightning) from the community.  More information will be posted as it becomes available.

Please reserve July 25-27 on your calendars!

[Dave Clements](/src/DaveClements/index.md) and Neil Bahroos

### Upcoming Workshops and Presentations

* A one day [Galaxy Developer Workshop](http://evomics.org/workshops/galaxy-developer-workshop/) is being held in [Galaxy Developer Workshop](http://evomics.org/workshops/galaxy-developer-workshop/) in [Český Krumlov, Czech Republic](http://www.ckrumlov.info/php/)
  * Registration deadline is December 15, but you are encouraged to register early, so we can gauge demand.
  * This workshop is immediately following the [Workshop on Genomics](http://evomics.org/workshops/workshop-on-genomics/2012-genomics-cesky-krumlov/2012), which also features Galaxy content, and is still accepting applications.
* Galaxy will have presentations at [PAG 2012 (January, San Diego)](/src/Events/PAG2012/index.md) on using Galaxy, both on [/Main](/Main) and in the [Cloud](/src/CloudMan/index.md)
* There are also [events](/src/Events/index.md) at the [University of Manchester](http://www.nowgen.org.uk/facilities/events/event.php?id=30) and [DDBJ](http://www.ddbj.nig.ac.jp/ddbjing/ddbjing.html#DDBJ) in January.

---
## What's New

### Tool Shed: Enabling Workflow Sharing

Galaxy tool sheds play a beneficial role in enabling sharing of exported Galaxy workflows between different Galaxy instances. 

* **[Finding workflows in tool shed repositories](/Tool Shed#enabling_workflow_sharing_finding_workflows_in_tool_shed_repositories)**
    The Search section of the left tool shed menu panel now includes an option labeled "Search for workflows"
* **[Importing a workflow from an installed tool shed repository](/Tool Shed#enabling_workflow_sharing_importing_a_workflow_from_an_installed_tool_shed_repository)** 
    A pop-up menu associated with a browsed Tool Shed workflow name will now provide the ability to import the workflow into your local Galaxy instance
* **[Importing a workflow via a URL](/Tool Shed#enabling_workflow_sharing_importing_a_workflow_via_a_url)** 
    If your Galaxy instance is missing any of the tools an imported workflow requires, a message is now displayed that includes links to all accessible tool sheds enabling you to search the tool sheds for the missing tools

### Using Tool Sheds

There are two Tool Sheds supported by the core Galaxy team:

* **[Galaxy Test Tool Shed](http://testtoolshed.g2.bx.psu.edu/)**
    Available as a sandbox environment allowing you to familiarize yourself with tool shed features  
    Feel free to mess around here as much as you want.

* **[Galaxy Main Tool Shed](http://toolshed.g2.bx.psu.edu/)** 
    Hosts production-ready Galaxy tools and tool components
    Should not be used for testing or becoming familiar with tool shed features

### Python Support

* This is the ** *last release* in which Python 2.4 will be supported**
* After this release, Python 2.4 may continue to work, but attempts will not be made to maintain compatibility
* Python 2.5, 2.6, and 2.7 are all supported
* To upgrade, please see **[http://python.org/](http://python.org/)**

## Updated & Improved

### Tools
**note: If using this distribution or later changesets from [galaxy-central](https://bitbucket.org/galaxy/galaxy-central/src), tool upgrades may be required, as specified below.**
* **[FastQC:](http://www.bioinformatics.bbsrc.ac.uk/projects/fastqc/)**
  * Wrapper updated to handle changes in HTML output from the most recent FastQC release 0.10.0 from [Babraham Bioinformatics](http://www.bioinformatics.bbsrc.ac.uk/)
  * If you see a broken FastQC html report in the UI, then an older version is being used. **[Upgrading FastQC to version 0.10.0](http://www.bioinformatics.bbsrc.ac.uk/projects/fastqc/) is required**
  * Galaxy [/Main](/src/Main/index.md) is running version 0.10.0
* **[Picard:](http://picard.sourceforge.net/)**
  * Wrapper updated to handle changes to command line parameters for `CollectInsertSizeMetrics.jar` in version 1.56
    * If you see an error message about an unrecognized parameter `"DEVIATIONS"` (related to Insertion size metrics), then an older version is being used. **[Upgrading Picard to version 1.56](http://sourceforge.net/projects/picard/files/) is required**
  * Update Picard tools to use `tool-data/shared/jars/picard/*` instead of `tool-data/shared/jars/*`
  * Galaxy [/Main](/src/Main/index.md) is running version 1.56
* **[TopHat:](http://tophat.cbcb.umd.edu/)** 
  * Wrapper updated to support versions 1.3.*
  * If you see an error message about "tophat: option --max-insertion-length not recognized", then an older version is being used. **[Upgrading TopHat to at least version 1.3.1 (with 1.3.3 preferred)](http://tophat.cbcb.umd.edu/) is required** 
  * Galaxy [/Main](/src/Main/index.md) is running version 1.3.3
* **[Cufflinks:](http://cufflinks.cbcb.umd.edu/)** 
  * Improved documentation for gene annotation dataset parameters
  * Galaxy [/Main](/src/Main/index.md) is running version 1.0.3
* Upgraded tool **Convert Formats -> SFF converter** to use *[sff_extract](http://bioinf.comav.upv.es/sff_extract/download.html)* version 0.2.10
* **[SAMTools:](http://samtools.sourceforge.net/)**
  * Handle SAMTools stderr messages causing an error state when using [FreeBayes](http://github.com/ekg/freebayes)

### Galaxy Track Browser (Trackster)
* New features include:
  * Show feature details on hover
  * Replace menus with icons + tooltips
  * Set new track color randomly
  * Color reads based on mapped strand
  * Improved support for VCF datasets
* Tuning: 
  * Adding dataset to a new visualization
  * Index computation for GFF/GTF datasets
  * Displaying reference data setting shared visualization's viewport

### Workflows
* Tasked job framework has been overhauled, splitting and merging framework in place
* New configuration option: 'Workflow unique defaults'

### User Interface (UI)
* When copying a history's datasets, the UI now provide links to the target history(ies)
* It is now possible to permanently delete all deleted datasets in a history in one step 
    `History -> Options -> Purge Deleted Datasets`
* It's also possible to permanently delete a history in one step 
    `History -> Options -> Delete Permanently`
* Permanently deleted histories are now visible in the list of saved histories, even though they cannot be undeleted
 
### External Display Applications
* Add VCF viewer for the [Integrative Genomics Viewer (IGV)](http://www.broadinstitute.org/igv/)
* VCF and BAM viewers now dynamically load links
* dbkeys (reference genome identifiers) are mapped to [IGV](http://www.broadinstitute.org/igv/) build names from an external configuration file

### Source
* Add locale files for Chinese, provided by hanfeisun (thanks!)
* Fix grid operations for use in `UserListGrid` to allow for Delete, Undelete, Purge of users if the `allow_user_deletion` config setting is true.
* Add a link to allow the user to switch to the new history directly after cloning
* HTML escape job stderr/stdout/info on dataset error page. No more missing details when between <>
* Add get info/parameter button to empty datasets in history item view
* Add dataset_metadata_in_data_table validator. Mimics behavior of dataset_metadata_in_file, but uses data tables
* Allow specifying a help attribute for repeat parameter grouping
* Allow toolbox tests to test 0 instances of a repeat
* Show dataset size of non-purged error state history items
* Fix for refresh on change in workflow run interface triggering actual running of workflow
* Add 'type_extension' attribute to datatypes_conf.xml that allows creating a datatype from an earlier declared datatype by referencing extension
* Performance: the time to load large histories and lists of large histories has been greatly improved due to switching to a more efficient method for calculating a history's disk usage
* Security: changing your password now invalidates all other Galaxy sessions (other than the one in which the password was changed

### Bug Fixes
<div class='right'><a href='/Support'><img src='/Images/Icons/bug.png' alt='bugs' width="20" /></a></div> 

* Grid fixes: (a) make operation buttons work after refresh and (b) show message each time
* Force absolute path when creating temporary directory used when importing histories. Fixes [https://bitbucket.org/galaxy/galaxy-central/issue/667](https://bitbucket.org/galaxy/galaxy-central/issue/667)
* Fix importing library datasets into multiple histories: library datasets will now only be imported into those checked.
* Fix workflow display bug introduced in 0ba260ea43c4
* Fix workflow input dataset step bug introduced in 5cfec3f4f17c
* Fix for a potential flushing bug when saving a workflow corrected in 6ec2d7f4a64d
* The "How to Cite Galaxy" link could not be changed despite having a configuration option to do so
* Tool error reports (generated with the "green bug") are also emailed to to the reporter
* John Duddy fixed numerous bugs in the History and Library APIs (thanks John!)
* No longer try to overwrite the input datasets when "uploading" a library dataset from a server directory or filesystem paths and using the "Link to files" option with outputs_to_working_directory = True


---

## About Galaxy
[GalaxyProject.org](http://galaxyproject.org)

The [GalaxyTeam](http://bitbucket.org/galaxy/galaxy-central/wiki/GalaxyTeam/) is a part of [BX](http://www.bx.psu.edu/) at [Penn State](http://www.psu.edu/), and the [Biology](http://www.biology.emory.edu/) and [Mathematics and Computer Science](http://www.mathcs.emory.edu/) departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at Twitter [#galaxyproject](http://twitter.com/#galaxyproject)!
---
