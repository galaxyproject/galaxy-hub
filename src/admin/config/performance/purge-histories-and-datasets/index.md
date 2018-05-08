---
title: Cleaning up Dataset Objects
---
## Background on Dataset Objects

Histories that are displayed in the history panel are stored as records in the
History table in the Galaxy database. Among other columns, the History table
includes the following:

    | id | update_time | user_id | deleted | purged |

When a user visits the Galaxy home page for the very first time, a new Galaxy
session is created and the session information is stored in a browser cookie. A
new history record is automatically created and associated with the session
cookie. At this point, neither the session nor the history is associated with a
user ID since the user has not logged in. Logging in is not required for using
Galaxy, but if the user logs in, their user ID is associated with both the
Galaxy session and the previously created history. In this case, the next time
the user visits the Galaxy home page and logs in, the history panel displays
the history that meets all of the following criteria:

*   is associated with their user ID  
*   contains the latest update time of any of their previously stored histories  
*   is not deleted ( the history.deleted column contains the value False )

When the user performs an analysis, items are added to the history which are
each associated with a dataset. These items are known as
`HistoryDatasetAssociation` objects. Information about datasets is stored in the
`Dataset` table in the Galaxy database, with the data itself stored on disk. The
Galaxy configuration file includes a **file_path** attribute which points to
the location on disk where the datasets are stored. Among other columns, the
Dataset table includes the following:


    | id | update_time | deleted | purged | file_size |

Among other columns, the `HistoryDatasetAssociation` table includes the
following:

    | id | update_time | history_id | deleted | dataset_id |

Every `HistoryDatasetAssociation` record associates a `Dataset` with a history
record via the values in the `HistoryDatasetAssociation.history_id` and
`HistoryDatasetAssociation.dataset_id` columns. Any number of
`HistoryDatasetAssociation` records can point to a base `Dataset` -- this is how
copying histories, history items, and libraries work without needing to copy
actual file contents.

Among other columns, the `LibraryDatasetDatasetAssociation` table includes the
following:

    | id | update_time | library_dataset_id | deleted | dataset_id |

Every `LibraryDatasetDatasetAssociation` record associates a Dataset with a
versionable library dataset record via the values in the
`LibraryDatasetDatasetAssociation.library_dataset_id` and
`LibraryDatasetDatasetAssociation.dataset_id columns`. Any number of
`LibraryDatasetDatasetAssociation` records can point to a base `Dataset`.

## Purging Unwanted Histories, Libraries and Datasets

A `Dataset` can only be deleted (or purged) when all `HistoryDatasetAssociations`
and `LibraryDatasetDatasetAssociations` have been marked as deleted.

There are 6 scripts included in the Galaxy distribution that can be used to
clean up unwanted histories, libraries and datasets. There are located in the
`GALAXY_ROOT/scripts/cleanup_datasets` directory and are named:

*   delete_userless_histories.sh
*   purge_histories.sh
*   purge_datasets.sh
*   purge_folders.sh
*   purge_libraries.sh
*   delete_datasets.sh

Note that you should activate the Galaxy virtual environment before running the scripts, as it follows. 

    source /path/to/galaxy/root/.venv/bin/activate
    sh delete_userless_histories.sh
    sh purge_histories.sh

These scripts all execute the Python script in the same directory named
`cleanup_datasets.py`, sending different parameter values on the command line. If
desired, these scripts can be ignored and the `cleanup_datasets.py` scripts can
be executed manually (using the `GALAXY_ROOT` as the working directory), passing
in desired parameter values. However, these scripts can be easily configured in
cron to execute automatically. The order in which the scripts are executed will
affect the outcome; for best results, the recommended running order is:

1.  delete_userless_histories.sh
2.  purge_histories.sh
3.  purge_libraries.sh
4.  purge_folders.sh
5.  purge_datasets.sh

If it is desired that datasets be removed before their outer container
(history, library/library folder) has been deleted, the `delete_datasets.sh`
script can be used before the `purge_datasets.sh` script. This script may take
some time to complete.

### Available Flags:


| flag | short | description |
|------|-------|-------------|
| --days | -d | number of days (60) to use as a cut off; do not act on objects updated more recently than this |
| --info_only | -i | only provide info about the requested action; no changes saved to database |
| --remove_from_disk | -r | remove files from disk during operations  |
| --force_retry | -f | performs the requested actions, but ignores whether it might have been done before. Useful when -r wasn't used, but should have been |
| --delete_userless_histories | -1 | delete userless histories and datasets |
| --purge_histories | -2 | purge deleted histories |
| --purge_datasets | -3 | purge deleted datasets  |
| --purge_libraries | -4 | purge deleted libraries  |
| --purge_folders | -5 | purge deleted library folders |
| --delete_datasets | -6 | mark deletable datasets as deleted and purge associated dataset instances |

Here are more details about each of the functions that the `cleanup_datasets.py`
script can perform. Note that, in order to run the python script separately 
you need to 1) activate Galaxy's virtual environment and 2) change into Galaxy's root 
directory. Alternatively to 2) one can specify the galaxy configuration (galaxy.[yml|ini]) 
extra parameter. 

### Deleting Userless Histories

As mentioned above, logging in is not required for using Galaxy, and in many
cases users perform an analysis without logging in to review results in a
"1-off" fashion, not caring about keeping the analysis for later review. In
this case, history record(s) are created with no associated user ID. The
cleanup_dataset.py script can be used to delete these types of histories that
have not been altered for a specified period of time. The command for deleting
userless histories is something like:

    python cleanup_datasets.py -d 60 -1

Notice that the first parameter passed into the script is the Galaxy
configuration file. This is necessary for the script to acquire information
about the database connection and the location of data files on disk. The value
following the -d flag is the span of time in days that has passed since a
history was last updated ( i.e., the value in the `History.update_time` column is
older than 60 days in this example ). Based on this criteria, all `History`
records that do not include a value in the `user_id` column and whose `update_time`
column value is older than 60 days will be retrieved. The -1 flag tells the
`cleanup_datasets.py` script to execute the method named
`delete_userless_histories()`, which is included in the script. This method
deletes userless histories whose `update_time` value is older than the specified
number of days by setting the value of the `History.delete` column to `True`.
Executing the same command, but providing the -i flag will not write any
changes; info about the histories to be deleted will be provided.

### Purging Deleted Histories

In the lifecycle of a `History` record, the stage following the "deleted" stage
is the "purged" stage, the last stage in the `History` record's lifecycle. When a
`History` record is purged, all `HistoryDatasetAssociation` records associated with
the History record are purged. When a `HistoryDatasetAssociation` is purged, it
is marked as deleted. Addionally the Dataset associated with the HDA is marked
as deleted only if all associations to that `Dataset` are also purged (HDA & LDDA
are all marked as deleted); when this happens, HDAs and LDDAs are no longer
undeletable by the user - if '-r' is used the associated files and metadata
files are removed from disk (the primary Dataset File still remains on disk and
can be retrieved by an admin) . The command for purging histories and
associated HDAs is something like:

    python cleanup_datasets.py -d 60 -2 -r

In this example, the -2 flag tells the `cleanup_dataset.py` script to execute the
`purge_histories()` method included in the script. This method retrieves all
`History` records whose `History.deleted` column value is True, `History.purged`
column value is `False` and whose `History.update_time` column value is older than
the specified number of days ( 60 in this example ). All
`HistoryDatasetAssociation` records associated with the History record are also
purged by setting the `HistoryDatasetAssociation.deleted` column value to `True`;
any additional `DatasetAssociations` (HDA/LDDA) are polled and if they all have
`HistoryDatasetAssociation.deleted==True`, the `Dataset.deleted` column is set to
`True`. The -r flag in this example tells the `cleanup_dataset.py` script to remove
the files (metadata etc) associated with the `HistoryDatasetAssociation` record
from disk (only if `Dataset.deleted` is to be set to True). Executing the same
command but replacing the -r flag with -i will print out all of the `History` and
associated `HistoryDatasetAssociation` records that will be purged if the -r flag
is used.

### Purging Deleted Datasets

Dataset records are moved to the "deleted" stage when all `History` and `Library`
records associated with the dataset are deleted as described above.

The next stage in the lifecycle of a deleted Dataset record is the "purged"
stage, the last stage in the `Dataset` record's lifecycle. The command for
purging datasets is something like:

    python cleanup_datasets.py -d 60 -3 -r

In this example, the -3 flag tells the `cleanup_dataset.py` script to execute the
`purge_datasets()` method included in the script. This method retrieves all
`Dataset` records whose `Dataset.deleted` column value is True, `Dataset.purged` is
`False` and whose `Dataset.update_time` column value is older than the specified
number of days ( 60 in this example ). The Dataset records are purged by
setting the `Dataset.purged` column to True. As described above, the -r flag in
this example tells the `cleanup_dataset.py` script to remove the data file
associated with the Dataset record from disk. Executing the same command but
replacing the -r flag with -i will print out all of the Dataset records that
will be purged if the -r flag is used.

### Purging Library Folders

Besides existing in user's history, dataset association objects exist with in
`Library` Folders; they are known as `LibraryDatasetDatasetAssociations` (LDDAs).
Purging a library folder is similar to purging a History. An example command
is:

    python cleanup_datasets.py -d 60 -5 -r

In this example, the -5 flag tells the `cleanup_dataset.py` script to execute the
`purge_folders()` method included in the script. This method retrieves all
`LibraryFolder` records whose `LibraryFolder.deleted` column value is `True`,
`LibraryFolder.purged` column value is `False` and whose `LibraryFolder.update_time`
column value is older than the specified number of days ( 60 in this example ).
It works recursively on all subfolders and their contents. All
`LibraryDatasetDatasetAssociations` records associated with the `LibraryFolder`
record are also purged by setting the `LibraryDatasetDatasetAssociation.deleted`
column value to `True`; any additional `DatasetAssociations` (HDA/LDDA) are polled
and if they all have
`HistoryDatasetAssociation(LibraryDatasetDatasetAssociation).deleted==True`, the
`Dataset.deleted` column is set to `True`. The -r flag in this example tells the
`cleanup_dataset.py` script to remove the files (metadata etc) associated with
the `LibraryDatasetDatasetAssociation` record (but not the actual Dataset file)
from disk (only if `Dataset.deleted` is to be set to `True`). Executing the same
command but replacing the -r flag with -i will print out all of the
`LibraryFolders` and associated `LibraryDatasetDatasetAssociation` records that
will be purged if the -r flag is used.

As is the case with `Histories`, the `purge_datasets` script will need to be used
to remove actual Datasets from disk.

### Purging Libraries

Purging a library is similar to purging a `LibraryFolder`. All libraries which
are not purged, but are deleted and exceed the modified date are retrieved. The
library is marked as purged and `purge_folder` is called on the library's root
folder, deleting all contents. An example command is:

    python cleanup_datasets.py -d 60 -4 -r

In this example, the -4 flag tells the `cleanup_dataset.py` script to execute the
`purge_libraries()` method included in the script. This method retrieves all
`Library` records whose `Library.deleted` column value is True, `Library.purged`
column value is False and whose `LibraryFolder.update_time` column value is older
than the specified number of days ( 60 in this example ). The Library's Root
Folder is then obtained and all `LibraryDatasetDatasetAssociations` records
associated with the `LibraryFolder` record are also purged by setting the
`LibraryDatasetDatasetAssociation.deleted` column value to `True`; any additional
`DatasetAssociations` (HDA/LDDA) are polled and if they all have
`HistoryDatasetAssociation(LibraryDatasetDatasetAssociation).deleted==True`, the
`Dataset.deleted` column is set to `True`. The -r flag in this example tells the
`cleanup_dataset.py` script to remove the files (metadata etc) associated with
the `LibraryDatasetDatasetAssociation` record (but not the actual Dataset file)
from disk (only if Dataset.deleted is to be set to True). Executing the same
command but replacing the -r flag with -i will print out all of the `Libraries`,
`LibraryFolders` and associated `LibraryDatasetDatasetAssociation` records that
will be purged if the -r flag is used.

### Deleting Datasets / Purging Dataset Instances

There are times when it is not desirable to wait for the containing `history` or
`library/library` folder to be deleted before purging a dataset instance and
marking the base dataset as deleted. The -6 flag is used for this purpose. This
script will find all Dataset records which are not deleted but are associated
with a `DatasetAssociation` that is marked as deleted and updated according to
the specified cut-off. If all associations are marked as deleted, the `Dataset`
is marked as deleted and each `DatasetAssociation` is purged. The
`purge_datasets.sh` script will need to be run afterwards to remove the base
datasets from disk.

An example command is: `python cleanup_datasets.py -d 60 -6 -r`
