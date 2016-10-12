# October 5, 2010 Galaxy Development News Brief
---

Here are the highlights of what you will get if you perform the following upgrade:

hg pull -u -r d681ef7538ed

## What's New

### Enhanced Data Library Features
1. Add the ability to make any library item public (and it's contents if it has any)
* There are now options on library item pop-up menus to make a library dataset public, make all contents of a folder public, or make an entire data library public. These new menu items are displayed only if the current item (dataset) is not public or if the current item (data library, folder) contains items that are not public. 
* The following image shows a data library that contains a restricted dataset and a folder that contains a restricted dataset. Since the data library contains items that are not public (restricted), it's Library Actions menu includes a "Make public" option. Selecting this option will make all of the contents of the entire data library public.

![2010_10_05_library_popup](/News Briefs/2010_10_05/2010_10_05_library_popup.png)

* Similarly, the folder popup menu includes a "Make public" option since it contains a restricted dataset. Selecting this option at the folder level will only make the contents of the particular folder public.

![2010_10_05_folder_popup](/News Briefs/2010_10_05/2010_10_05_folder_popup.png)

* The popup menu associated with any restricted library dataset will also include a "Make public" option. Selecting this option will make only that particular dataset public.

![2010_10_05_dataset_popup](/News Briefs/2010_10_05/2010_10_05_dataset_popup.png)

2. Upload Option changes
* Move the upload options (ie., file, directory, filesystem paths, import from history), which used to be in the data library upload form's title bar popup menu, into a select list on the upload form. 
* Selecting a different upload option now performs a refresh on the upload form so that any form contents entered before selecting the option are now retained.

![2010_10_05_upload_options](/News Briefs/2010_10_05/2010_10_05_upload_options.png)


### Extended Workflow and related History/Dataset Features
1. You can now flag a workflow step as an output within the editor.  
* To do this, hover over any output, click the asterisk to flag/unflag an output.  If a workflow has outputs flagged, only those particular results will show in the history and all other outputs will be hidden.  If no outputs are flagged, everything is shown (same as previous behavior).  Note that workflow output flagging overrides !HideDatasetActions; if a !HideDatasetAction exists on a dataset flagged as a workflow output, it is removed.
* This feature makes it much easier to take an existing workflow, and hide all of the outputs except for a small number of desired results.
* It is worth noting that non-output results are only hidden, not deleted, and that they can be viewed in the history at any time by going to "View Hidden Datasets" in the history panel.

2. More options for Exporting, Searching, and Annotating
* Both workflows and histories can now be exported to files. Importing workflows and histories is coming soon.
* Annotations preserved when importing histories and workflows.
* Tool search is now available in workflow editor so that you can search for tools when creating workflows.
* Improvements for annotating histories and workflows to make it easier to add annotations.

3. Workflow Tool Form changes
* Output extensions are now properly separated by ', ' (including space) instead of just slammed together.
* Width is calculated better, taking into account the length of input and output rows, with an upper bound of 250px, and lower bound of 150px.

4. Post Job Actions
* Separated into immediate and delayed actions.  Immediate actions run when the job is created, as opposed to when it is finished.  
* Set Datatype is now an immediate action.  This has no impact on the execution of the job, but it allows following jobs to queue with the correct subsequent datatypes.
* !RenameDatasetAction also happens immediately, rather than waiting for a job to complete.  This makes the history less confusing to watch, as things don't randomly change names.

5. Updated UI - screenshots
* Hovering for the tooltip on the asterisk.

![2010_10_05_workflow_tooltip](/News Briefs/2010_10_05/2010_10_05_workflow_tooltip.png)

* A larger segment of a workflow, showing two Group steps flagged as outputs, one intermediary join not flagged as an output, and then a final cut that is flagged.

![2010_10_05_workflow_flagged](/News Briefs/2010_10_05/2010_10_05_workflow_flagged.png)

* And, for larger workflows, note that the overview in the editor panel colors outputs, so you can find them at a glance.

![2010_10_05_workflow_overview](/News Briefs/2010_10_05/2010_10_05_workflow_overview.png)



## Updated & Improved

### Application Programming Interface (API)
* API now returns data template information associated with a library dataset.
* Added library dataset file_path to API captured information.

### Data Upload
* Allow for bz2 compressed uploads.  Datasets can now be gzipped, bzipped, or zipped (only one file per zip, however).

### Data Libraries
* Clicking on a folder name now expands the folder instead of displaying information/description.
* Moved folder icon to be next to the folder name and text (removing extra whitespace).
* Rephrase naming for available compression schemes.
* When viewing library dataset information under the Admin interface, a field is now present that displays the real path to the file on disk.

### Mutation Visualization Tool
* Requirement to enter the default columns indicating reference base, position, and start of sample.
* New interactive zoom option: image can be zoomed in or out using the mouse wheel. 

### Trackster Visualization Tool
* Better drawing of features at the bottom of viewing window.
* Added track name dropdown for setting overview preferences.
* Improved packing when zoomed (done on a w_scale basis instead of rounding to levels).

### Documentation & Screencasts
* Added more screencasts and topics in sample tracking documentation [http://main.g2.bx.psu.edu/u/rkchak/p/sts](http://main.g2.bx.psu.edu/u/rkchak/p/sts)

### Community
* Community ratings for all published items plus ratings are visible in published items lists.

### Reproducibility
* Tool parameters captured fresh when rerunning a process within an imported or copied history.

### Functional Test Framework
* Significant improvements to the functional test framework, especially those tests related to Galaxy forms and data libraries.
* Allow the defining of a cluster job runner when running functional tests.

### General
* Changes to grids to make sorting order clear and reduce clutter from tags and annotations.
* Adjusted BWA, Bowtie, and PerM wrappers so they now use verified use-case parameters. 
* Modified the 'file_path' field type in 'sample_dataset' table to 'TEXT' to support large file paths exceeding 255 characters.
* Make the grouping, join, sort, and any tool which uses r_wrapper.sh compatible with non-bash shells like bourne and dash (the default under modern Debian systems). 

### Bug Fixes!
* Corrected bug that was causing Page item selection grids to be initialized twice and hence causing grid paging to fail.
* Corrected bug in full parameter setting specification for Lastz.
* Corrected typos in Tool Executed template and in Compute Motifs Frequency tool information.
* Corrected import errors that would cause indel_analysis to fail under Python 2.6.

---

Galaxy Project Team

[http://usegalaxy.org](http://usegalaxy.org)

[http://bitbucket.org/galaxy/galaxy-central](http://bitbucket.org/galaxy/galaxy-central)

This project is supported in part by NSF, NHGRI, and the Huck Institutes of the Life Sciences, and The Institute for !CyberScience at Penn State.
