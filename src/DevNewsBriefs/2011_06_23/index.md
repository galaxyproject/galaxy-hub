# June 23, 2011 Galaxy Development News Brief

----
[getgalaxy.org](http://bitbucket.org/galaxy/galaxy-central/wiki/GetGalaxy)

new: `% hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist`

upgrade: `% hg pull -u -r 720455407d1c`

----

## GCC 2011

We had ~ 140  attendees at the **2011 Galaxy Community Conference**, held May 25-26, in the Netherlands!
* Please see [GCC2011](/src/GCC2011/index.md) for links to slides and to videos of the talks.
* Feedback has been very positive with 100% of respondents saying they would recommend future Galaxy meetings to others.  
* Many thanks to the **[Netherlands Bioinformatics Centre (NBIC)](http://www.nbic.nl/)** for co-sponsoring and hosting this event.

----
**Note**: "#NNN" notation refers to fixed/resolved bitbucket issues at http://galaxyproject.org/issues
----

## What's New

### Python Support

Python 2.7 is now supported in beta. Functional tests with 2.7 are a pass. This also includes an upgrade to Numpy 1.6.0.

### Cloudman Admin Functions

Galaxy's **Cloudman** now has an admin interface that allows you to gain insight and control many of the services underlying your cloud instance. Namely, you can:
* Add Galaxy admin users through the web interface.
* Update Galaxy source (even from a custom repository).
* View logs and configurations for individual services.
  * e.g., Galaxy, Postgres, SGE, as well as control some of the system-level services

To get to the admin interface, just click the 'Admin' link at the top right corner on the main **Cloudman** UI.

![cloudman](/src/DevNewsBriefs/2011_06_23/2011_06_23_cloudman.png)

### New Galaxy Tool Shed

Rather than rigidly structured tool archives, the foundational component of Galaxy's **Tool Shed** is now an hg (Mercurial) repository.  
* The Test/Sandbox **Tool Shed** available at [http://testtoolshed.g2.bx.psu.edu](http://testtoolshed.g2.bx.psu.edu)
* The Production **Tool Shed** is available at [http://toolshed.g2.bx.psu.edu](http://toolshed.g2.bx.psu.edu)

A new select list was added to the upload form in Galaxy's **Tool Shed** with the following label:

 * Remove files in the repository (relative to the upload point) that are not in the uploaded archive?*

 The selection pertains only to uploaded tar archives, not to single file uploads. If 'Yes' is selected, files that exist in the repository (relative to the selected upload point) but that are not in the uploaded archive will be removed from the repository. Otherwise, all existing repository files will remain and the uploaded archive will be added to the repository. Resolves #585

----

## Updated & Improved

### Tools

* RNA-seq tools:
  * Rename and reorder Cuffdiff outputs for clarity.
  * Make Cuffcompare wrapper compatible with v1.0.3.
* 2bit/twobit datatypes now supported. (thanks Peter van Heusden!)
* New tools for FASTA de(interlacing) added. Resolves #447

### Histories

* Add the download/save icon to datasets in an error state, but that contain data. Fixes #207 and #583
* Disk space usage accounting: 
  * Users can see how much disk a history is consuming. 
  * Disk used is also a column on the history grid. 
  * Users can also forcibly purge a dataset from their history. 
* Admin notes: 
  * New script (scripts/set_dataset_sizes.py) which will set the value of the new total_size column on the dataset table (includes the contents of the extra_files_path and metadata files).
  * The ability for users to purge their own data is conditional on a config variable. Due to limitations in the grid framework, the button can't be removed from the history grid, but clicking it just does the same thing as delete but adds a message explaining that the purge operation wasn't performed.
  * For users who were pulling from galaxy-central and that already upgraded to database version 78 prior to this distribution, the following SQL query should be run to set the default value of the '!HistoryDatasetAssociation' purged column:

 UPDATE history_dataset_association SET purged=false WHERE purged IS NULL

### Trackster

* Can run filters on entire dataset.
* When adding tracks to Trackster, add them in the order that they appear in the dataset listing.
* Use error padding only when needed by placing error messages in div above tiles rather than in tiles.
* Add bookmarking to Trackster. Also group Trackster options into a single menu button.
* Add trackster_conf tag to tool definition; this tag indicates that tool is compatible with trackster.
* Enable importing of visualizations via a shallow copy.

### Workflows

* Include tool annotation and tags when cloning workflows.
* The workflow editor is now aware of the format_source tag, and updates the output datatype of tools using it accordingly.  Patch from Jim Johnson enhancing format="input" handling in workflows. Resolves #582

### Data Libraries

* Library datasets can now be job inputs. This is needed to be able to use the deferred job runner and transfer manager with set_metadata_externally = True.
* Fix for importing library datasets into a new named history. Library datasets will no longer be imported into both the current history and the new named history ( only the latter ) in this scenario.
* Determining if an accessible dataset exists somewhere in the data library hierarchy now works all the time. It used to work most of the time, but under corner conditions, it would break.
* When importing a dataset from a history into a data library, the dataset permissions are now correctly applied to the library dataset. The DATASET_MANAGE_PERMISSIONS permission is a spoecial case in that if it exists on the dataset, the LIBRARY_MANAGE permission must be applied to the library dataset.
* Fix for message display and db flushing when importing a library dataset into a history.
* No longer render the folder pop-up menu option for selecting a library dataset to import into histories if the folder does not contain any accessible library datasets.

### Source

* Move duplicate data type checker methods from sniff and upload into a new ~/datatypes/checkers.py.
* No longer allow Datasets to have !DatasetPermissions set such that no roles are associated with the DATASET_MANAGE_PERMISSION. Include the automatic creation of a new !DatasetPermission for an hda where the DATASET_MANAGE_PERMISSION permission is associated with the hda.history.user's private role if the hda has no roles associated with the DATASET_MANAGE_PERMISSION permission. The creation of the !DatasetPermission occurs when the user clicks the pencil icon for the hda.
* SMTP Authentication support for all places where Galaxy sends mail. Use STARTTLS where available, too. Fixes #277

### Bug Fixes

* Fix solid2fastq tool to correctly handle cases when csfasta and QUAL filed are out of sync. Fixes #406
* Applied patch from Peter Cock for 'Cut' tool to ignore commented lines. Resolves #534
* Fix to sam2interval. The bug was causing sam2interval to successfully parse unmapped sam entries, which have no valid coordinate.
* Enable Cufflinks to work when setting metadata externally.
* Remove obsolete test values for Cufflinks and Cuffdiff tests.
* In Trackster, have child track inherit mode from parent track.
* Trackster bug fixes when (a) running tools in a shared visualization and (b) when drawing a track created by a tool.
* Enable tags and annotations to work for new datasets in history. Fixes #550
* Fix bugs in reading and visualizing GFF3 datasets.
* Remove unspecified build validators from Cufflinks/compare/diff tools as these cause trouble when running tools on custom genomes.
* Disable update check in cuffdiff wrapper.
* Unicode fixes and refactoring.
* Disable grid controls and content when new content is being fetched. Fixes #272
* Include post-job actions when importing and exporting workflows. Fixes #518
* Improve filtering tool's stdout reporting of lines filtered. Fixes #536
* Show tool search by default. Fixes #575
* Fixes for editing role name, description, and renaming groups. Resolves #539
* Add baseline support for translating special chars to html escape codes for correct html display in the Galaxy Tool Shed. Fixes #564
* Commit versions of tools from the last_gen Tool Shed in order of oldest -> newest in the next-gen tool shed. Fixes #578
* Fix sample tracking to correctly import samples from a csv file.  Add the ability to include field values (in addition to field names) when defining sample form rows by importing from a csv file. Fixes #398
  * The csv file must be in the following format: the [:!FieldValue] is optional, the named form field will contain the value after the ':' if included.
      `SampleName,DataLibraryName,FolderName,HistoryName,WorkflowName,Field1Name:Field1Value,Field2Name:Field2Value...`
* Change the Galaxy tool shed search feature on the Categories grid to search Repository names and descriptions rather than Category names and descriptions. The ability to search Category names and descriptions has been eliminated. Fixes #480
* Add support for uncompressing a gz or bz2 compressed file upon upload to a galaxy tool shed repository. Fixes #586
* Add the ability to select files for deletion from a tool shed repository using the built-in file browser. Any number of selected files will be deleted. Selecting a folder will delete all of it's contents. Fixes #584
* Required fields for extra sample form data now enforced. Some minor cleanup included. Fixes #301
* Workflow Parameter bug fix for the case when a parameter isn't used in any workflow step, but should still be available for PJAs.
* Proper inheritance in model for APIItem. Fixes #527= May 20, 2011 Galaxy Development News Brief =
* Fix broken user create/login links in the FTP upload form.
* Set a catchall content-type (application/octet-stream) on metadata file downloads so Safari doesn't consider them to be HTML.
* Fix for library upload when there is no current history.
* 'fields' is apparently reserved in MySQL 4, fix migration scripts that use it unaliased. (thanks John Eppley!)
* Fix the race condition of the upload tool's outputs not being created before the output size check occurs. (thanks Tao Liu!)
* Remove hardcoding of universe_wsgi.ini (except for the sample cleanup scripts which, as samples, are expected to be modified by the site anyway). Fixes #358
* Don't provide the output filename to the upload tool if it's outside Galaxy's files_path, since this means we're only linking data and the output paths are not used (and may contain non-shell-safe characters). Fixes #533
* Uploading a compressed library dataset using either the server directory or path paste methods was previously overwriting the input file, which should never happen. Grouped with this change, it is now possible to upload compressed files that remain compressed (by choosing to "link files only"). However, Galaxy does not yet open the compressed file to properly set metadata on its contents.
* Cope with white space at start of command after processing template. Fixes #159
* Support optional integer/float arguments. Resolves #403
* Copying datasets now keeps item order.
* Hidden parameters no longer take up space in tool form. Fixes #397
* Sniffers are now properly loaded again from datatypes.conf.xml.

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
-- JenniferJackson 2011-08-30
