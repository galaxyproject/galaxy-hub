# August 20, 2010 New Development News Brief

----

Here are the highlights of what you will get if you perform the following upgrade:

hg pull -u -r d8cf43c9a0b9

### New Features

* Add a ratings framework so that users can rate shared items. All sharable items--histories, workflows, datasets, visualizations, and pages--can be rated. Main framework components are:
  * Database tables for storing ratings
  * UsesItemRatings mixin that supports rating items and obtaining an item's average rating
  * Controller methods to handle rating asynchronously
  * jQuery star rating plugin and supporting code that enables interactive item rating.

* Support for VCFv4.0 and misc VCF fixes [Brad Chapman]
  * Support for VCFv4.0, which should be identical to 3.3 support
  * Correctly handle chromosome references when they start with 'chr' (instead of just numbers)
  * Handle extra empty tabs on the header line which are present in GATK produced VCF and confuse the determination of how many sample states should be parsed. 

### New Tools

* srma_wrapper - Re-align with SRMA - version 0.1.5
* bfast_wrapper - Map with BFAST - version 0.1.2
* compute_p-values_correlation_coefficients_feature_occurrences_between_two_datasets_using_discrete_wavelet_transfom - Compute P-values and Correlation Coefficients for Feature Occurrences - version 1.0.0
* compute_p-values_correlation_coefficients_featureA_featureB_occurrences_between_two_datasets_using_discrete_wavelet_transfom - Compute P-values and Correlation Coefficients for Occurrences of Two Set of Features - version 1.0.0
* compute_p-values_second_moments_feature_occurrences_between_two_datasets_using_discrete_wavelet_transfom - Compute P-values and Second Moments for Feature Occurrences - version 1.0.0
* compute_p-values_max_variances_feature_occurrences_in_one_dataset_using_discrete_wavelet_transfom - Compute P-values and Max Variances for Feature Occurrences - version 1.0.0
* mutation_visualize - Mutation Visualization - version 1.0.0

### New Supported Data Formats

* Apply patch from Brad Chapman providing support for detecting, uploading and displaying UCSC bigWig and bigBed.  Add new functional tests for uploading and detecting bigbed and bigwig formats. 

### Existing Feature Improvements

#### Tools ( and tool related )

* Don't pipe errors for compute_q_values to a file.
* Enhance 'Fetch Closest Features' tool to use GFF files and added tests for new functionality.
* Remove UCSC tablebrowser specific parameters from modmine.xml datasource tool.
* Fixed bug in column join that mishandled trailing empty columns.
* Fixed bug in column join that mishandled carriage returns.
* Add ToolOutputActions to set dbkey for BWA wrapper and remove no longer needed code file.
* Enhance GFF-to-BED converter to output block data.
* Enhance Cut tool to keep column assignments for Interval datatypes. All interval datatypes will become base interval type if User specified columns contain chromosome, start and end columns; in addition to the 3 required columns, name and strand will be set when possible.
* Add ToolOutputActions to set dbkeys for LiftOver tool and both Bowtie wrappers; remove no longer needed code files.
* Add ToolOutput dataset actions: change datatype, metadata, etc.  These function similar to dynamic options for select list tool parameters. Should eliminate the need for exec_before_job code files that set output dataset attributes. More 'filter's should be defined as needed.
* Fix GFF bug in interval to summary tree converter.
* Improvements to the GFF filtering tool.
* Update gops_intersect and gops_subtract documentation to reflect that tools can accept both BED and GFF files.
* Make "loc files" more flexible by adding "tool data tables". These are configured at the application level. Specific tabular data files are specified in an application config file and bound to names, the tools then refer to these names. Thus users can configure where location files are located without modifying tool configs.
  * Simpler column name configuration.
  * Columns can be referred to by name in addition to index in all dynamic option filters.
  * A data table can merge multiple files.
  * Design can support other types of data files.
* Add a 'ref_attribute' attribute to param_value dynamic option filter to allow accessing attributes of the parameter value.
* Bug fix for multiple_splitter dynamic option filter.
* Added AttributeValueSplitterFilter to tool select parameter filters so that GFF attributes can be read and used as tool inputs.  Updated gff_filtering tool to use this filter.
* Modified Group tool by adding Mode function to the list of aggregate operations.
* Allow interval to bedstrict converter to work on bed files that may have e.g. a 'track' line.
* Make viz datatype converters hidden tools; don't show hidden tools in Recently Used tools.
* Add new-style display applications for GBrowse for gff, interval, and wig; only interval is enabled by default, the other two use existing methods. Still working on SAM and BAM for GBrowse.

#### Trackster

* Show counts for summary view by default, but only when text can fit in.
* Fix summary view off-by-pixel bug.
* Display Mode is now only initialized once and stays the same while switching chroms.
* Fix grid sorting in "Visualize in Trackster" modal box.
* Fix Reference track incorrect display offset.
* When no tracks exist in editor, show suggestion to add tracks.
* Clicking "Visualize in Trackster" in history now shows a grid of current browsers, but actual adding is still work in progress.
* Fix vertical scrolling with mouse quirkiness.
* Intro screen asking to select a chrom when no chrom is selected.
* Fix Reference tracks not hiding when there is no longer sequence to display.
* Make embedded vis not overflow.
* Fix drag-selecting region not working in embedded viz.

#### Sample Tracking

* Fixed a bug in email notification.
* Show last update date/time in the transfer datasets grid.
* An admin can no longer delete a transfer dataset when the transfer has started.
* Added user warning when a dataset is deleted.
* Fixed edit samples view bug.
* Cleaned up the sample datasets view for a non-admin user.
* Added a check so that only dict entries in the dataset_files column of the 'sample' table are moved to the new 'sample_dataset' table.
* Sample dataset size now appear correctly in the grid. The path of the datasets no longer appears with it.
* Added a new table 'sample_dataset' to store sample datasets and their info when they are transfered from the sequencer.
* The datasets transfer page now uses a grid to facilitate bulk renaming.
* Bulk renaming possible to fix the problem with the way SOLiD generates datasets.
* The remote file browser is now independent of a specific sample, the user may select any sample when transferring datasets from the sequencer.

#### Workflows

* Workflow output tagging.
* Workflow messages and renaming now support unicode.
* Enable workflows to contain unicode characters.
* Workflow sharing highlights correct tab.
* Enable workflow display pages to handle implicit inputs.
* Use svgfig egg instead of including it, minor fix for workflow image gen.
* Add gen_image method to workflows, using svgfig library to create SVG representation of workflow.
* Framework support for importing and exporting Galaxy workflows to and from myExperiment.
  * Part of a larger effort to integrate myExperiment support into Galaxy, and it is the first piece of this effort.
  * Includes controller methods to import/export Galaxy workflows to/from myExperiment as well as associated templates for generating the request XML.
  * Refactoring was done so that there are now generic method to save a workflow to a json dict and recover a workflow from a json dict. These methods are used both for importing/exporting Galaxy workflows among Galaxy instances and for importing/exporting Galaxy workflows to/from myExperiment.
  * Importing and exporting goes to the myExperiment sandbox right now rather than the official myExperiment website.
  * There is no user interface for importing/exporting workflows to myExperiment
  * There is no connection between Galaxy workflows and myExperiment workflows and hence no version tracking.
* More graceful failure if shared workflow is not found.
* Track tool version in workflows.
* Add select+autocomplete to run workflow template. This makes it easier to select workflow inputs, but inputs should also be filtered by type as well.
* More graceful failure if shared workflow is not found. 

#### Data Libraries

* Single files down-loaded from the library are now just named as their title.

#### Jobs ( and job related )

* * Fix a bug in the sge runner's stop_job and job finishing logic.
* The DRMAA job runner, which should be compatible with all DRMs which support DRMAA (most notably, LSF and PBS Pro).  Minor testing with LSF has been done, and this code is based on the SGE runner code which has been in service for a long time, but it should not be considered production.

#### Character Encoding Improvements

* Changed to_unicode_utf8() method to to_unicode() to avoid having to manage encodings.
* Added method to web helper that converts strings to unicode-utf8 format.

### Miscellaneous Fixes and Improvements

* Fix template bug introduced in 4143:4bd0731967ef and do not use item sharing display code for histories right now because histories have complex sharing rules.
* Fix test_DNAse_flanked_genes functional test.
* Bug fix for trying to access a non-existant attribute in dynamic options ParamValueFilter.
* Stop ignoring the sniff order set in the datatypes config file.
* Fix Alchemy session issues when tracking jobs in memory.
* Don't use JSON to compare values of the JSON custom database type - just use the Python structures.
* Upgrade simplejson to 2.1.1 w/ C extension speedup.
* Fix failing Gtf sniffer unit test with missing test file.
* Minor fixes for scrambling and dist-scrambling.
* Enhancements and fixes for sharing framework
  * Sharing/publishing webpages can now be displayed in frames.
  * Sharing webpages can display messages.
  * Workflow sharing highlights correct tab.
  * History sharing for individual users now uses sharing framework.
  * Item sharing with individual users now uses common template.
* Refactor query code in datasets grid and do not show hidden datasets in grid.
* Force right panel reload if a dataset was visible, tracked for updates, and hidden behind the scenes.
* Re-added the JOB_ERROR state to galaxy.jobs since it's used by a few tools.
* Hidden datasets will no longer show in "Show Structure".
* Fix dbkey migrate script for downgrade and rare case when config is empty.
* Refactor out sort_order in grids, fixing a bug with sort arrow not showing.
* Rewrite documentation for 'users_shared_with' association proxies to make it clearer how to use them.
* Use env for the API example scripts instead of directly referring to /usr/bin/python.
* Bug fix for calculating viewport when displaying interval files at Ensembl browser.
* Have check_galaxy.py script get twill from galaxy.eggs instead of directly from the (defunct) eggs/py-(version) directory.
* Display rerun button for history items when dataset is empty.
* The script make_style.py can now be run without parameters, which will default to the blue theme.
* Enable admin users to view and import any history.
* Update new-style display applications to use use enhanced datatype.get_estimated_display_viewport(). Additionally, new-style display links will no longer be visible when the dataset is empty.

### Configuration settings and logging changes

* Action and event logging are now turned off by default.
* Remove explicit filename logging for connection proxy, need to use log configuration in universe_wsgi.ini to divert.
* Configuration options for database query profiling.
* Connection proxy for logging duration of SQL statements with call stack.
* Setup null logging handlers in a few libraries to suppress warnings about missing handlers to stderr when imported by tools which don't handle logging.
* Allow command-line paste serve var 'heartbeat_log' to override heartbeat log filename, done like this so we can use a single config file for multiple instances but prevent them from clobbering file names.
* Modified translogger middleware that properly propagates exceptions, should eliminate 'Attempt to set headers a second time w/o an exc_info'.
* Allow access to /api without HTTP_REMOTE_USER set if use_remote_user = True, since the API controllers handle authentication internally.
* Allow access to API Key creation when use_remote_user is true.

