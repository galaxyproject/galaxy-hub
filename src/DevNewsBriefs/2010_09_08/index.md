# September 8, 2010 Galaxy Development News Brief

----

Here are the highlights of what you will get if you perform the following upgrade:

hg pull -u -r f09915c8da94

## What's New

### New Multiple Sample Tracking Features

* UI enhancements: checkboxes to select samples & select field to specify operations.
* State change mechanism added for multiple samples and removed for individual samples in the sample_events page.
* Enhanced sample searching implemented. Uses sample name, barcode and dataset name with menu items in masthead and admin menu. 
  * *Example of usage*: new wild-card searches.

### New Custom Sorting in Grid Framework

* Enhance grid framework to enable custom column sorting (default sorting unchanged).
* Sort criteria are now mapped to a column, and the column defines the sorting to be done on the grid query. 
  * *Examples of usage*: (a) case-insensitive sorting of text fields and (b) case-insensitive sorting for user names in published-item grids.

### New Data Format Conversion Tools

* NGS: SAM Tools => __BAM-to-SAM__ converts BAM format to SAM format 
* Convert Formats => __Wig to bigWig__ converter 

### New GFF Format Filtering Tools

* Filter and Sort => GFF => __Extract features__ from GFF file, __Filter GFF file by attribute__ using simple expressions, __Filter GFF file by feature count__ using simple expressions.
* New __Filter GFF file by feature count__ filters a GFF file using conditions based on transcripts' features counts.
  * *Example of usage*: filter for transcripts that have a minimum number of exons or transcripts that have 3' UTRs. 

## Updated & Improved

### Data Libraries

* Added support for the !AddressField, !CheckboxField, !SelectField and !WorkflowField form field types (in addition to the previously supported !TextArea and !TextField) to data library templates.  
* Inherited template fields now also inherit any field contents from the immediate "parent" of the current item (folder or dataset).  
* The information in our data library templates wiki at [http://bitbucket.org/galaxy/galaxy-central/wiki/DataLibraries/LibraryTemplates](http://bitbucket.org/galaxy/galaxy-central/wiki/DataLibraries/LibraryTemplates) has been updated to reflect the new features and behavior.

### Sample Tracking: Email notifications

* Notification of specific sample state changes.
* Changes made to barcode scan AMQP handler to update sample state to also send email when required.
* Notification to multiple recipients.
* Request events history records notifications.
* UI enhancements:
  * "edit request" page to allow users to change notification configurations.
  * "request" page to show the request type state, user & notification details.

### Jobs & related

* Improved handling of metadata to optimize job processing. Includes a new user prompt to set metadata manually or retry auto-detection externally when using 'set_metadata_externally = True' .
* Enhance wig datatype to only use first 100 data lines to determine column type metadata if dataset filesize exceeds max_optional_metadata_filesize as configured in datatypes_conf.xml.
* Add '!NullToolOutputActionOption' to tool output dataset actions. This action option is used implicitly when no !ToolOutputActionOption(s) have been defined. 
  * *Example of usage*: a metadata value can be set to a static value on a per Tool Output basis.

### Installation and Management

* Added support for installing Galaxy on systems without direct access to the Internet. Updated Galaxy Installation wiki (see section "How to get eggs: If your Galaxy server does not have Internet access" [http://bitbucket.org/galaxy/galaxy-central/wiki/Config/Eggs](http://bitbucket.org/galaxy/galaxy-central/wiki/Config/Eggs).
* When viewing library dataset information as an administrator, add a field that displays the path to the actual disk file that underlies the dataset.

### Trackster

* Each track now has an Overview checkbox that will set the initial chromosome-wide view.
* Visualizations that users own or are shared with can now be cloned.
* New go-to feature allows users to redirect quickly to a specified chromosome or position. 
  * *Example of usage*: "chr1:1-100,000,000".
* Drag-zoom activated when a chromosomal position is clicked on.
* Line tracks display mode can also now be activated inline.
* Changing display mode from "Auto" now fetches additional detail data and displays features. Displays error messages in canvas elements if present. This also limits the number of features displayed per tile.

### General Improvements

* Slight makeover to Galaxy tabs: (a) added published item links to 'Shared Data' tab; (b) standardized personal item lists as 'Saved XXXs'; and (c) added defaults action for Visualization tab.
* Minor grid refactoring.
* Don't re-sort BAM files on upload if already sorted (adapted from Brad Chapman patch).
* Use image_path for Workflows and now display modal instead of relative paths.

----

Galaxy Project Team

[http://usegalaxy.org](http://usegalaxy.org)

[http://bitbucket.org/galaxy/galaxy-central](http://bitbucket.org/galaxy/galaxy-central)

This project is supported in part by NSF, NHGRI, and the Huck Institutes of the Life Sciences, and The Institute for CyberScience at Penn State.
