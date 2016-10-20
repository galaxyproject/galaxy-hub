# June 21, 2010 New Development News Brief

----

Here are the highlights of what you will get if you perform the following upgrade:

hg pull -u -r 4cdf4cca0f31

### Existing Feature Improvements

#### Data Libraries

* Security fixes for data libraries.  Some parameters were not validated, which could allow access to administrative functions without having required privileges.
* Do not allow the dataset file to be removed from disk via the cleanup_dataset.py script for datasets uploaded to a library where the file is not copied into Galaxy's default file location.
* Changes to browse library UI: 1) use standard popup button styles, 2) Move library wide actions out of table header and into manage-table actions.

#### Datatypes

* Add !MafCustomTrack datatype and a UCSC external display application which can be used to view this datatype at UCSC.
* Enhance change datatype action in edit attributes form to set metadata externally when so configured.

#### Metadata

* Fix a bug with external metadata that caused every dataset association for a particular base dataset to enter the setting_metadata state when metadata was set for one dataset association.
* Fix for datasets getting stuck in setting_metadata state when using external metadata and there was a job failure (e.g. cluster error).

#### Tools

* Added colon as a delimiter for 'Convert delimiters to TAB' tool.
* Update tool_conf.xml.* to only use the generic python FASTQ to FASTA converter by default.
* Add GFF support to GOPS intersect tool.
* Fixed handling of alignments with CIGAR strings with multiple indels for SAM indel filter.
* Change language and parameter names in GOPS subtract to imply that any interval files can be used as input, not just BED files.
* Patch to upload.py for composite file uploads where the user supplies URLs for components.  At present, the path for each component is passed as a URL and there's no upload type for composite file components, so this temporary fix searches for :// in the path to figure out if this is a URL upload.
* Add a VCF to MAF Custom Track converter tool. This tool converts a Variant Call Format (VCF) file into a Multiple Alignment Format (MAF) custom track file suitable for display at genome browsers.  This file should be used for display purposes only (e.g as a UCSC Custom Track). Performing an analysis using the output created by this tool as input is not recommended; the source VCF file should be used when performing an analysis.  Unknown nucleotides are represented as '*' as required to allow the display to draw properly; these include e.g. reference bases which appear before a deletion and are not available without querying the original reference sequence.
* Fixed a bug in 'Fetch closest features' tool that prevented fetching of immediately adjacent features.
* Fix options bug in cufflinks wrapper.
* Fix for rerun action when a tool is not loaded.
* Add tool searching functionality using Whoosh and lots of jQuery. Search is currently hidden by default but will soon be a user preference.
* Add 'recently used tools' section to tools menu.  Recently used tools is a list of the five most recent tools that a user has run.  A user must be logged in to use this option.  Manage hiding/showing of recently used items when search is active.  Added simple Javascript framework for logging actions and setting user preferences asynchronously.  Enabled user preferences and logging for tool search and recently used tools menu.

#### Functional test harness

* Fix for kcca, linear regression and get indels tools - use 're_match' to accommodate sign and decimal precision changes in kcca output.

#### Sample Tracking

* UI enhancements to the remote file browser, double click to open folder.
* Data transfer folder name now includes the date.
* Fix: the data transfer module now works for file/folder names with spaces in them

#### Trackster

* Update trackster dataset filter so that only datasets that are not deleted, not from deleted histories, and are in 'OK' state are available for visualization.
* Fix creating new trackster viz, fix autocomplete grouping by first character.
* Supports display of reference sequence in twobit format. Mapping of dbkey to twobit file is done in tool-data/twobit.loc.  Reference track will automatically be shown when zoomed in if the twobit file exists for that dbkey. Also fixes a drawing issue with Reference/Read tracks.

#### Grid framework

* Fixed a sorting bug in the grid framework. Sorting preferences were not getting preserved.
* Fix grid initialization bug that was preventing visualization grids from working properly.
* Add the "all" option to the grid's !StateColumn.

#### Jobs

* Remove the user round robin scheduling policy (it didn't work as intended).  The former job_scheduler_policy config option now has no effect.
* Post job action database setup.
* Fix bug in root.history_item_update caused when a tool has been removed.

#### Workflows

* Added annotations to run workflow display.  New feature: actions in workflow steps.  Change name, hide dataset, change datatype enabled.
* Len datasets for custom dbkeys now don't need a history and this fixes an issue with extract workflows.
* Fix for double !UnvalidatedValue wrapping when extracting a workflow from a history that was created using !UnvalidatedValues (e.g. when dynamic options is used in a tool before metadata is ready).
* Fix for extracting a workflow from a history when a tool is not loaded.
* Fix bug that prevented 'All workflows' link from being shown when tool search is active.
* Enhance workflow editor to work with a list of output formats instead of only one.  This fixes the bug where outputs utilizing a change_format tag could not be connected to an input that was of the changed-to type.
* Fix for extracting workflows from a history that has a dataset in the error state.

#### Database schema

* Add a user_id column to the job table to decouple jobs from sessions.

#### Reports

* When filtering on the state of jobs in the advanced search box in the jobs reports, you now have an "all" option.
* Jobs displayed in the jobs reports are now all color coded by job state.
* Rewrite the jobs report queries to no longer join the job table to the galaxy_session and galaxy_user tables, just join galaxy_user since we now have a direct relation to that table.

