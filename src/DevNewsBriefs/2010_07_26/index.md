# July 26, 2010 New Development News Brief

----

Here are the highlights of what you will get if you perform the following upgrade:

hg pull -u -r f94f1f2fa4be

### Existing Feature Improvements

#### Tools ( and tool related )

* Modify tools contributed by Chungoo Park (cxp440@psu.edu) for Linear Discriminant Analysis.
* Remove redundant 'Principal Component Analysis' tool.
* Patch from Brad Chapman: Handle URLs for uploading in the case where Galaxy is served under a prefix and nginx is used to handle the uploads.
* Updated indel analysis tools: fixed counting bugs in indel_analysis and improved help section; standardized CIGAR regex across tools; updated test files for several tools.
* Reduce costly queries in the job runner, especially when tracking jobs in the database.
* Fixes for generating viewports - these fixes eliminate some memory problems.
  * Add checks to get_estimated_display_viewport() methods for tabular data types to ensure datasets are valid before generating display links.
  * Now a maximum of 1MB is read from a line to determine the viewport; if a line greater than 10MB is encountered, then no viewport will be generated.
  * Additional fixes for certain cases when viewport was not determined properly for for WIG tracks and GFF.

#### PBS Cluster Support

* Upgrade pbs_python to 4.1.0 and use PBS exit_status (if keep_completed is set) so we can detect PBS failures.  This is a reapplication of 3786:48432330228e, which was backed out in a subsequent revision due to crashes experienced in pbs_python 2.9.8.

#### Trackster

* Remove mousewheel zoom (since scrolling window is more important), fix overview drag bug.
* First selenium test for trackster.

#### Galaxy Sample Tracking

* UI improvements - removed borders from the request page and added +/- icons for expand/collapse.

#### Galaxy Reports

* Enhancements to the Job Information page
  * Add job.stdout to Job Info page in reports webapp ( patch from Assaf Gordon ), and change the previously displayed job.update_time to now be "Time To Finish", which is the total execution time of the job displayed in hh:mm:ss.
  * Patch to from Assaf Gordon to include job runner and job runner id on the job info page of the reports.

### New Tools

* New tool to 'Generate A Matrix for using PC and LDA'.

### New Genome Indexes

* Rhesus macaque (rheMac2)
* Rattus rattus (rn4)
* Sus scrofa (Sscrofa9.2/susScr2, Sscrofa9.58)

### Bug Fixes

* Fix bug so that fasta identifier produced by 'extract genomic dna' tool for GFF files is consistent with GFF coordinates.
* Fix bug so that users not logged in can view accessible/published visualizations.

