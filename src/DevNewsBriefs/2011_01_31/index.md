# January 31, 2011 Galaxy Development News Brief

----
[Get Galaxy!](http://bitbucket.org/galaxy/galaxy-central/wiki/GetGalaxy)
* new: ` % hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist `
* upgrade: ` % hg pull -u -r 95d65755ac69 `

----

## What's New

### Workflow Additions

1) Usability improvements for workflow annotations
* Workflow annotation is now shown at the top of the page.
* Step annotations are shown in the step header rather than at the bottom.
    *example:* Annotation

    ![](/src/News Briefs/2011_01_31/2011_01_31_workflow-annotations.png)

2) Easier to move workflows directly from one Galaxy instance to another
* Workflow download/export page now provides URL that can be used to directly import a workflow from one instance to another.
    *example:* URL import

    ![](/src/News Briefs/2011_01_31/2011_01_31_workflow-import.001.png)

3) New Parameter settings for global application or specific actions
* Workflow parameters are a new feature we've added to simplify reuse of workflows, and to allow for easier variation of parameters when re-running a workflow.  
* Instead of filling in explicit values when building a workflow, you can now use flexible parameters.  To specify a workflow parameter, simply use a tag like ${my_variable_name} in any tool input field or in a rename dataset action field.  
* The workflow shown below has two parameters, as shown in the Workflow Parameters display in the top right of the editor window.  You can see the ${filter_condition} parameter in the right panel in both the tool input and the rename action.  
  * Note that while this ${filter_condition} is only used in a single step in this simple demo workflow, variables can be used across steps.
      *example:* Parameters 

     ![](/src/News Briefs/2011_01_31/2011_01_31_workflow_params_1.png)
     
* As the inputs are filled in the Workflow Parameters box, seen in the runtime example below, the new values will be reflected in all workflow steps and will be used when the workflow is executed.

   *example:* Runtime display
   
    ![](/src/News Briefs/2011_01_31/2011_01_31_workflow_params_2.png)

4) General workflow tuning
* !HideDataset Action will no longer show in the workflow editor.  The ability to manually create one of these actions has been deprecated in favor of the workflow outputs approach.
* Workflow run results can now be sent to a new history instead of the current one.
* Ordering of workflow steps is now sorted based on the layout in the workflow editor, arranged based on distance from top left corner of the editor.  This won't affect existing workflows until re-saved.
* Workflows that contain steps expecting tools that are unavailable (as might be the case for a workflow imported from another Galaxy instance) will now have problem nodes marked with an error state. The workflow cannot be saved until the steps are removed or the tools are added to the current Galaxy instance.

### Deferred Jobs & Managed Transfers

These components are under rapid development and interfaces *should be considered experimental*.  They can be enabled by setting 'enable_beta_job_managers = True' in universe_wsgi.ini.

1) Deferred Jobs
* A generic method for creating a dependency on an event before executing arbitrary code has now been defined in:
    *galaxy-dist/lib/galaxy/job/deferred/</u>init__.py*
* The deferred job runner loads plugins found in the same directory which implement the necessary methods check_job() and run_job(). check_job() returns a state which informs the deferred job runner whether it is okay to execute the run_job() method.
* The deferred job runner is independent from the regular tool-related job runner and is not coupled with tools, nor does it have any integrated cluster support.
* No documentation is provided for the format of a plugin at this time, but a sample plugin will be included at a later date.

2) Transfer Manager
* Galaxy can now spawn persistent transfers of (unauthenticated) http and https URLs via the code in:
    *galaxy-dist/lib/galaxy/job/transfer_manager.py*
* The transfer manager is accessible in-application at app.transfer_manager.
* Transfers are daemonized and thus not influenced by Galaxy restarts, although a loss of database connection (restarting the database server) will cause transfers to fail.
* A transfer can be polled for progress via JSON-RPC requests to its socket.  An interface for this request is available in the transfer_manager class.
* Future enhancements will allow for authenticated http/https and scp.

----

## Updated & Improved

### Data Content

* New "Get Data" source: modENCODE modMine server.
* New Genomes:

*format:* Genome [dbkey]
* *Pseudomonas aeruginos* (str. PA7) [16720]
* *Pseudomonas aeruginos* (str. PAO1) [pseuAeru]
* *Pseudomonas aeruginos* (str. UCBPP-PA14) [386]
* Silkworm (*Bombyx mori* str. p50T) [Bombyx_mori_p50T_2.0]
* Rice pathogen: *Xanthomonas oryzae* (str. KACC10331) [12931]
* Rice pathogen: *Xanthomonas oryzae* (str. MAFF 311018) [16297]
* Rice pathogen: *Xanthomonas oryzae* (str. PXO99A) [Xanthomonas_oryzae_PXO99A]
* Little Brown Bat (*Myotis lucifugus*)  [myoluc2] 

### Current Tools

* Optional 'min' and 'max' attributes for tool integer and float parameters.
* Add --max and --un options to Bowtie.
* Validators enforce min/max values and generated error messages for invalid values.
* Add Standard deviation operation to grouping tool.
* Enhance histogram tool to allow plotting as frequency/counts.
* Allow fastx_toolkit clipper wrapper to work on fastqsanger formatted files.
* SAM metadata detection and setting sped up dramatically upon import.
* Wig-to-bigWig converter tool default parameters now same as UCSC's.
* Cufflinks tool suite updates:
  * Update Cufflinks tool suite wrappers to support v0.9.3.
  * Add support for bias correction to Cufflinks and Cuffdiff; bias correction improves transcript quantitation results (FPKM values).
  * Enable Cuffcompare to use sequence data so that it can generate data for use by Cuffdiff. Cuffcompare uses sam_fa_indices.loc to find locally cached genome sequence data and indices that are needed for this option.
  * Add normalization support to Cufflinks and Cuffdiff and replicate support for cuffdiff.

### New Tools

* BED-to-bigBed converter tool now under "Convert Formats". 
  * Converts sorted BED files into UCSC's bigBed format. 
  * Requires bedToBigBed in PATH.
* BLAST+ tools are now commented in tool_conf.xml.sample.  
  * Not in Galaxy main, for local instance use.
  * If you run the BLAST+ tools at your site, please be sure to uncomment them if updating to the latest tool_conf.xml.sample (will be default at next update).
* Add SAMtools flagstat tool.
* Add CCAT ChIP-seq peak/region caller.
* Add BWA wrapper for SOLiD. 

### Histories

* Estimated size is now displayed for very large text-based (non-binary) datasets.
* Always show Galaxy masthead and enable Saved Histories to work with and without panels. 
* New "Copy Datasets" link added under History Options dropdown.
  * Dataset and history IDs are now encoded.
  * JS dropdown used to change source history, so you no longer have to switch desired source history to be "active".
  * Remove link in "edit attributes" of datasets.
  * Simplified destination interface by using a single select box by default, but also providing a link to show checkboxes for multiple destination histories.
  * Use newly imported Inflector library to get correct plural/singular nouns on actions.
  * Added arrow between source and destination.
  * Removed checkbox for copying to a new history. Instead, create new history if new history field is not blank.

### Data Libraries

* Creating job information (stdout/stderr) is now available on the library item info page, which is helpful when library uploads fail.

### Trackster

* Add bigWig display to trackster. Automatically converts wig to bigwig if needed (NOTE: datatypes_conf.xml.sample has been edited to add the new converter, you must update datatypes_conf.xml to use it). The converter requires that wigToBigWig be in the PATH, but no other tools are needed to view bigwig files as they are provided by bx_python.
* Tuning
  * Fix track preferences not being applied
  * Fix chroms not being selectable when a new track browser is created
  * Fix !ReferenceTrack not working with filters
  * Fix visual analytics error when tool configuration has changed
  * Fix visualization saving on Chrome by using $.each instead of for loop
  * Fix shared visualizations
  * Fix tracks fetching from data provider when indexer returned None, and when
  * Fix BAM reads without cigar string.

### Sample Tracking

* Additions and tuning to improve tracking (complete documentation will be available soon).

### User Interface (UI)

* Version info is now printed in history item for Bowtie, BWA, Lastz, !TopHat, Samtools, Cuffdif, Cufflinks, Cuffcompare, BFAST, and PerM. 
* Turn off web browser auto-complete for tool search (includes workflows).
* Grid changes resulting in better readability:
  * Better page number display.
  * Use "~" instead of "about", so "about 2 hours ago" -> "~ 2 hours ago".
  * Cell padding decreased.
  * Added new "nowrap" parameter to prevent text from being wrapped. Currently only used for tags to prevent "X tags" from wrapping in the middle.

### Application Programming Interface (API)

* Still 'alpha', but: Initial pass completed for forms, request_type, users and roles. See README and examples in source.

### Source

* Galaxy now runs with system python on 64-bit mac kernel.
* Enhance select parameter wrapper objects to provide access to additional fields by name for dynamically generated select lists (i.e. dynamic_options). \\ *example:* use ${param.fields.path} to access a path field
* Updated the XML in filter specification for output files. The closing filter tag can now be on separate line to use as an # actual filter.
* Implemented 'from_work_dir' attribute for tool outputs. Using this attribute matches a file in the working directory to a tool output/HDA; when a tool finishes, the file in the working directory is automatically copied to the HDA. Hence, it's no longer necessary for tool wrapper scripts to manually copy tool output files to HDA files.
* More programmatic control of page numbers on grid (custom UI).
* Many formerly undocumented options have been added to the universe_wsgi.ini.sample file.  Please compare your working copy with the new .sample and determine whether any of the options are relevant to your environment.
* The "welcome page" found at static/welcome.html, has been renamed to static/welcome.html.sample.
* The UCSC Genome Browser now supports loading data via https. If you implemented this former Galaxy URLs from https->http method in Apache as per the wiki documentation you will also need to remove it there, and allow the browser through your authentication scheme over https.
* Explicitly convert autocomplete dropdown values on refresh_on_change.
* Adjust image links in tools to work with a proxy prefix (thanks Brad Chapman).

### Bug Fixes

* Ensembl GTF files are recognized correctly.
* Make Tophat wrapper compatible with python 2.4 by removing try-catch-finally.
* Fix unicode error for dataset peeks.
* Sanitize tool links in tool menu so that they can be searched. Use only lowercase letters, numbers, and underscores in links to ensure cross-browser functionality.
* Fix for building form element for boolean tool parameter when default state is configured as checked in tool configuration, but user provided value is non-checked. Fixes an issue seen in workflows that prevents saving the unchecked state under described conditions.
* Fix typo in BFAST. 
* Trackster: fix BAM display bugs, Dense display bug, better dataset selection.
* Add validator to Tophat's segment mismatches parameter.
* Turn off web browser autocomplete for tool search in workflows.
* Fix Trackster's BAM display bugs, Dense display bug, better dataset selection.
* Add validator to Tophat's segment mismatches parameter.
* Added the ctypes egg so the DRMAA egg will now work under Python 2.4.
* Bug fixes to the Mac OS X launcher in the galaxy-dist/contrib/ folder (from Florent Angly).
* Python reports the wrong platform when running a 32-bit Python on 64-bit Linux, so Galaxy now forces the correct platform in this environment (thanks David Hoover).
* Fix Chrome not auto-saving changes to workflow checkboxes.

----

### About Galaxy

**Galaxy** is supported in part by **NSF**, **NHGRI**, the **Huck Institutes of the Life Sciences**,  and **The Institute for !CyberScience at Penn State**.

[Core Team](http://bitbucket.org/galaxy/galaxy-central/wiki/GalaxyTeam)

[Use Galaxy!](http://usegalaxy.org)

[GalaxyProject.org](http://galaxyproject.org)

[Development Home](http://bitbucket.org/galaxy/galaxy-central)

----
