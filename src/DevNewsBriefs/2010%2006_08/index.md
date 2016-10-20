# June 8, 2010 New Development News Brief

----

Here are the highlights of what you will get if you perform the following upgrade:

hg pull -u -r 837aabec314e

### New Features

* From the Admin perspective, the library dataset information page ( the page displayed when you click on a dataset link in a library folder ) now includes all of the metadata associated with the dataset, as well as all active links to the dataset ( the undeleted history or library items that point to this dataset's disk file ).  Here is an example of a page that displays this new information.  Notice that you can click on the History or Library links to see the history or library that contains the item that points to same disk file.

![](/src/News Briefs/2010 06_08/2010_06_08_ldda_info.png)

* The new and vastly improved version of the Galaxy reports webapp.  The Galaxy reports are not supported with the sqlite db as they are intended for Galaxy production environments, but postgres will certainly work, and mysql should work as well.  The old version of the reports webapp had it's own template path defined in the reports_webapp.ini file, but the new version uses the normal galaxy template location.  Due to this change, you should copy reports_webapp.ini.sample to reports_webapp.ini, and change the following setting to be what you want:

```
port = 9001
host = 127.0.0.1
...
# database_connection = postgres:///galaxy_test?user=postgres&password=postgres
```


To start up the reports:

%sh run_reports.sh

and point your browse at the URL defined by the host and port setting in your config file.  The reports are greatly improved, and use the Galaxy grid framework for displaying jobs.  You can use the Advanced Search feature to search for a specific job id, and filter by job state, and the various links on the grids allow for other additional filtering and sorting.  The new and improved Disk space maintenance report includes a link on each displayed dataset that (when clicked) will display all of the active history items and library datasets that use that specific dataset's disk file.

* Galaxy now allows for importing and exporting histories.  Options for exporting the current history to a file or importing a history from a file are now listed in the history options menu.

* Add a jar directory / bin which is accessible to tool configurations by specifying e.g. '${GALAXY_DATA_INDEX_DIR}/shared/jars/FOO.jar', where FOO.jar is the desired jar which has been placed in / linked to 'GALAXY_ROOT/tool-data/shared/jars' (by default; $GALAXY_DATA_INDEX_DIR can be configured to point elsewhere [value of 'tool_data_path' configuration variable in universe_wsgi.ini]).  The setup.sh script has been modified to create this directory when not present.

### Existing Feature Improvements

* Improvements in Search+Select boxes.

* Add support for the GFF format to the Galaxy Operation subtract tool

* Trackster
  * Implemented drag-zooming by letting you drag a region in the top label track (where chrom position is shown). Refactored to not use zoom levels anymore.
  * Can manually set display modes for tracks.
  * Add text search to trackster dataset selection grid and fix dbkey filtering.
  * Respect block color for bam

* When use_remote_user = True, still display the logged in user in the User menu

* Enhancement to the data libraries grid: display the file size of each library dataset in the grid.

* Enable form builder to build select inputs and (2) enable users to create visualizations via a button on the saved visualizations page.

### New Tools

* SAM indel filter

* CBI Rice Mart data source

* Tools contributed by Chungoo Park for Principal Component Analysis, Linear Discriminant Analysis, and drawing Receiver Operating Characteristic plots.

### Bug Fixes

* Fix autocomplete select not closing after dragging text inside, and holding arrow keys not triggering multiple times in firefox.

