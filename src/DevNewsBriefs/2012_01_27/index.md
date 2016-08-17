<div class="title">January 27, 2012 Galaxy Development News Brief</div>
<div class='right'>TABLE_OF_CONTENTS</div>

## Get Galaxy

<div class='left'><a href='http://getgalaxy.org/'><img src='http://galaxy.psu.edu/static/getgalaxy.png' alt='getgalaxy' width="50px" /></a></div>

 **[getgalaxy.org](http://getgalaxy.org)** 

* **new**: `% hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist`

* **upgrade**: `% hg pull -u -r 26920e20157f`

----


## Run Cluster Jobs as the Real User
* On systems where Galaxy users are guaranteed to match users on the system, it may be preferable to run jobs on the cluster as the system user matching the Galaxy user, rather than the system user under which Galaxy started.  
* This method of job ownership is now possible.  To learn how to set it up and use it, please see the documentation at: [/Admin/Config/Performance/Cluster](/Admin/Config/Performance/Cluster)
* Thank-you Ilya Chorny for contributing the code for this very popular enhancement request!

## New "Create Schema" Function
* The Galaxy database schema can now be created without starting the Galaxy server.
* To do so, simply execute `create_db.sh` in the top-level galaxy-dist/ directory.
* Thank-you John Duddy for contributing the code for this feature that helps makes Galaxy customization even easier!

## Job Management
* **[DRMAA](http://www.drmaa.org/)** runner: <<nwwl(DrmCommunicationException)>> will no longer cause a job to fail.  Instead, the job will return to the monitored job queue and be checked again.
* Use temporary files instead of pipes for local job execution - prevents tools from hanging when they write large amounts of data to STDOUT/STDERR.

## Tools
*Many tools have been recently upgraded. Please review* [/Admin/Config/Tool Dependencies](/Admin/Config/Tool Dependencies) *and* [/Admin/Config/Tool Dependencies](/Admin/Config/Tool Dependencies) *for these and other recently updated Tool Dependencies.*
* **[SAMtools:](http://samtools.sourceforge.net/)**
  * All wrappers in group accept versions 0.1.12-0.1.18 with 0.1.16-0.1.18 *strongly* preferred.
  * Exceptions:
    * **flagstat** (existing) requires versions 0.1.16-0.1.18.
    * **[Mpileup](http://samtools.sourceforge.net/mpileup.shtml)** (new) requires versions 0.1.16-0.1.18.
    * **[Pileup](http://samtools.sourceforge.net/pileup.shtml)** (existing) requires versions 0.1.12-0.1.16, with 0.1.16 *strongly* preferred and tool dependency directory configuration (if upgrading other SAMtools to 0.1.18).
  * Galaxy **[/Main](/Main)** is running SAMtools version 0.1.18 for all with the exception of Pileup version 0.1.16.
* Updated **[TopHat](http://tophat.cbcb.umd.edu/)** tests for version 1.4.0.
* Updated **[Cufflinks, CuffCompare, CuffDiff](http://cufflinks.cbcb.umd.edu/)** tests for version 1.3.0.
* Better error reporting in **[Cufflinks](http://cufflinks.cbcb.umd.edu/)**.
* Enhance **[Picard SamToFastq](http://picard.sourceforge.net/javadoc/net/sf/picard/sam/SamToFastq.html)** to allow read group aware processing.
* Properly set the temporary directory when using the **[SAM merge](http://samtools.sourceforge.net/samtools.shtml)** tool. Thank you Lance Parsons!
* Properly set the temporary directory when using the **[Picard](http://picard.sourceforge.net/)** tools. Thank you John Chilton!

## Galaxy Track Browser (GTB)
* **[Trackster](/Learn/Visualization)** Bug fixes: filter drawing bug, summary tree display, embedded visualizations.
* Do not find valid chroms because this is computationally expensive and not currently used.
* Provide icon to randomly set color in drawable configuration.
![](/Images/NewsGraphics/2012_01_27_random-color-chooser.png)
* Multi-track dynamic filtering.
![](/Images/NewsGraphics/2012_01_27_multi-track-filtering.png)

## Workflows
* Improve language in 'Import workflow' dialog.
* Input Dataset steps will now again properly filter appropriate input datasets based on subsequent tool input types.  This fixes the regression introduced in 6329:ab90893a7cf5.

## Data and Libraries
* When uploading compressed files to a data library, remove the compressed file extension only if copying files into Galaxy's file store.
* Add **[Eland](http://www.illumina.com/help/SequencingAnalysisWorkflow/Content/Vault/Informatics/Sequencing_Analysis/CASAVA/swSEQ_mCA_AppElandCASAVA1.htm)** datatype support and generic **XML** datatype to the sample configuration file. Another thank-you to John Duddy!

## Tool Shed
* **[/Tool Shed](/Tool Shed)** fixes:
  * Fix for handling a tool data table entry when uploading to a tool shed repository.
  * Reset all metadata on all changeset revisions of a tool shed repsoitory whenever a new change set is introduced. This will result in a more standardized set of valid changeset revisions that can be installed.
  * Fix for generating workflow metadata and viewing workflows in tool shed repositories.
  * Fix for searching for workflows in the tool shed.
* [Deactivating and uninstalling tool shed repositories installed into a local Galaxy instance](/Tool Shed/#deactivating_and_uninstalling_tool_shed_repositories_installed_into_a_local_galaxy_instance)

## Bug Fixes
<div class='right'><a href='/Support/'><img src='/Images/Icons/bug.png' alt='bugs' width="20" /></a></div> 
* Python 2.5 support was broken in the last stable release, this has been fixed 
* A broken unit test under 2.5 will not be fixed until the next release, however - this can safely be ignored.
* A fix to not use math.isnan because it is not compatible with python 2.5 has been made.
* Fix for setting up column assignments for dynamic options with respect to tool data tables when the index file is missing causing tools to fail to load.
* Have **[GOPs Concatenate](/Learn/Interval Operations)** tool always respect the provided strand column. Fixes issue seen when providing intervals with a chrom/start/stop in column 5 and strand was not set.
* On edit attributes page, make the info field a text area. Fixes lost new line characters in field when changing name.
* The Object Store unit test that was failing in the last stable release has been fixed.

----

## About Galaxy
**[GalaxyProject.org](http://galaxyproject.org)**

The **[GalaxyTeam](http://bitbucket.org/galaxy/galaxy-central/wiki/GalaxyTeam/)** is a part of **[BX](http://www.bx.psu.edu/)** at [Penn State](http://www.psu.edu/), and the **[Biology](http://www.biology.emory.edu/)** and **[Mathematics and Computer Science](http://www.mathcs.emory.edu/)** departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at **Twitter [@galaxyproject](http://twitter.com/#galaxyproject)**
----
</div> Jennifer Jackson, [Galaxy Team](/GalaxyTeam). Posted to [/DevNewsBriefs](/DevNewsBriefs) on <<Date(2012-01-27T01:02:28Z)>></div>
