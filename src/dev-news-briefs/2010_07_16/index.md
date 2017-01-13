---
autotoc: true
---
# July 16, 2010 New Development News Brief

----
<div class='right'></div>
Here are the highlights of what you will get if you perform the following upgrade:

hg pull -u -r 11fb3bb5b250

## New Features

### Recently used tools list

Add 'recently used tools' section to tools menu (highlighted in the June 21, 2010 brief).  Recently used tools is a list of the five most recent tools that a user has run.  A user must be logged in to use this feature, which is available in the Options pop-up menu in the tool panel.  The option is "Show Recently Used".

![](/src/DevNewsBriefs/2010_07_16/2010_07_16_show_recently_used.png)

When selected, a new "Recently Used" tool section is displayed at the top of the tool panel.

![](/src/DevNewsBriefs/2010_07_16/2010_07_16_recently_used.png)

### Initial implementation of the Galaxy Web API

This feature is disabled unless "enable_api = True" in universe_wsgi.ini config file.  You should not enable the API on production sites as this code is brand new and may contain serious bugs and security flaws.

#### Highlights of what's currently available

* Create data library (Note that no roles can be associated with libraries via the API at this time)
* Display data libraries
* Display data library info
* Display data library contents
* Display data library content info
* Create data library folders
* Upload datasets to a data library from a server directory or with a path paste.
* Basic example scripts in ~/scripts/api/

#### Framework changes that were made to support this

* API Key interface in User Preferences.
* New api_keys database table for storing users' API Keys.
* New API-specific route mapper in webapp.
* API controllers in galaxy.web.api
* Return handling in reused library_common methods.
* expose_api decorator for API controller methods validates key and ensures valid JSON format.
* UniverseWebTransaction renamed to GalaxyWebTransaction and sub-classed for GalaxyWebUITransaction and GalaxyWebAPITransaction.

#### Things that need to be done next

* Documentation! *(Edit: See [Learn/API](/src/Learn/API/index.md) and [Admin/API](/src/Admin/API/index.md))*
* Refactor reused code from library_common and other controllers into an even-more-generic location and format.  The main changes are that the Web UI returns redirects and rendered templates, whereas the API returns various HTTP status codes and JSON.
* Implement more functionality.
* The request and response format should be considered alpha and are subject to change.  They will be standardized as the API matures.

#### Hints to get started can be found in ~/scripts/api/README

* Allow for uploading single files in a zip archive.  Adapted from a patch from Pablo Cingolani.  Also removed obsolete binseq.zip and txtseq.zip formats, and removed txtseq and binseq from datatypes.

* Add GTF as a default datatype for Galaxy.

#### Administrative Job Lock

* Admins can now lock (and unlock) all job dispatching.  New jobs will remain in the job queue in the 'waiting' state until the lock is removed.  Existing dispatched jobs are unaffected, and jobs can still be submitted, but they will not dispatch.

## Existing Feature Improvements

* Restructure and document the universe_wsgi.ini.sample config file.

* Add ability to view hidden datasets in the same fashion as you would deleted ones in the history panel.  Un-hiding also works in the same fashion.

* Enable bedgraph files to be displayed in UCSC genome browser.

### History export / import

* Include annotations and tags when exporting and importing histories to/from files.
* Include job information when exporting and importing histories to/from files. This enables jobs associated with an imported history to be rerun and hence affords a history's analyses to be reproduced exactly. Jobs also have a new flag, imported, that is set to false by default but is true when a job is created via import. Also re-factored export/import code to use custom JSON encoders.  This code is in a very alpha/beta state: it may not work well, at all, or as expected. Complex datasets and/or jobs are likely not yet handled. Use with caution.  Also, due to security issues, history/import and history/export methods are not currently web-accessible. Admins must manually make these methods accessible if they want to use them.
* Security checks when opening and/or copying files from imported archive
* Implemented options to gzip, include/exclude hidden datasets, and include/exclude deleted datasets when exporting to archive.

* New Job actions - Send Email action, Delete action.  Note that delete action is dangerous and will break a workflow if you delete datasets that are required in later steps.

### Improvements to GOPS subtract tool

* Preserve metadata for interval inputs
* Allow arbitrary mix of interval and GFF inputs
* Functional tests updated to test new functionality.

### Improvements to GOPS intersect tool

* Preserve metadata for interval inputs
* Allow arbitrary mix of interval and GFF inputs
* Functional tests updated to test new functionality.

### Extract genomic DNA tool

* Enhance to accept and produce GFF files and added functional tests for this feature.
* Fix bug so that fasta identifier produced by this tool for GFF files is consistent with GFF coordinates.

* Changed the way sam_indel_filter tool expects quality score cutoffs.

### Trackster

* Now skips incorrect twobit.loc locations
* Track browsers can now be embedded in Galaxy Pages as multiple browsers can now exist at the same time after re-factoring. Display code is now separated from editor code. Some scrolling bugs have been fixed as well.
* Move trackster.css to common stylesheet folder, fix small error in color

### Galaxy on the cloud

* Removed extra cloud clause left from earlier code cleanup. Resolves issue #350.

### Galaxy Sample Tracking

* A new controller, requests_common.py, now handles all common tasks (create/edit/delete) for requests and samples. The requests controller now includes only the grid definition and the requests_admin controller now includes only the request_type code and the sequencer data transfer code.
* Added an option to rename sequencer datasets by prepending the experiment name.
* Removed the db engine echo option in the data transfer

* Update UCSC table browser data source tools to treat data marked as 'gff' as 'gtf'.

* Make the PSU BX browser a UCSC browser instead of being a different display type.

### Functional tests

* Removed binseq.zip test and replaced it with a zip test.

* Switch methods using sendmail to SMTP instead.

* Set a default (database/universe.sqlite) in manage_db.py in case the deprecated database_file is unset

* Detect pdf files on upload (patch from Brad Chapman). Resolves #357

### Improvements to tool search

* Search tool title, description, and help
* Set minimum score for searching to remove very poor results

* Enhance Tool Repeat Grouping parameter to allow specifying min, max, and default repeat unit counts.

* Update vcf_to_mafcustomtrack tool to enforce a minimum of one dataset to be selected.

* Fixes for rgManQQ - manhattan and qqplot generator for interval pvalues.  New qqplot image.  Fixes to fix test output generators to only provide one set of pval columns.

* Added Sscrofa9.58 to manual_builds.txt and removed phiX from builds.txt.sample (it's in manual_builds.txt)

* Add checks to get_estimated_display_viewport() methods for tabular data types to ensure datasets are valid before generating display links ( this fix should eliminate some memory problems ) and standardize the returned values from the methods.  Also fix several calls to dataset.has_data where the call assumed a property rather than a method.

## New Tools

### Indel Analysis tool section including these new tools

* indel_analysis
* indel_table
* indel_sam2interval tools

## Bug Fixes

* Fix bug that prevented correct toggling of recently used tool menu.

* Enable recently used tools menu to show only tools that are currently in the toolbox.

* Fix bug in metadata setting for intersect tool.

* Fix IE crashing on pages with grids

* Bug fix for importing a history when not logged in.

* Fix to allow administrators to create users when use_remote_user is enabled.

* Fixed a form importer bug in forms.py

* Fixed issue #345 - Incorporated Brad Chapman's patch which handles skipping of order checking for join_wrapper tool version >=7, which would otherwise end in an error. Also modified sort command to better handle cases with duplicate keys. A new test-case to test these scenarios has been added as well.

### GOPS column_join tool

* Fixed bug so it checks qualities for correct bases in all cases
* Fixed a bug where it failed when only two files were being joined
* Fixed a bug that resulted in some items incorrectly being listed on more than one line.

* If a LibraryDataset does not have an associated LDDA (this should not be possible but apparently has happened), suppress an exception in the library browser that prevents viewing the library at all.

### Galaxy API

* Apply patch from Brad Chapman to prevent deleted items from appearing in library contents listing.

* Pick out a language-code from Accept-Language header - patch from Hideyuki Morita

* Pass the forgotten is_multi_byte argument - patch from Hideyuki Morita

* Bug Fix for when, under certain conditions, error messages were associated with the incorrect repeat unit.

* Various Bug fixes for libraries including deleting of or adding new versions to LibraryDatasets and for importing into a new LibraryDataset from a history.

* Bug fix for history/view when history has no user.

* Fix bug so that users not logged in can view accessible/published visualizations.

