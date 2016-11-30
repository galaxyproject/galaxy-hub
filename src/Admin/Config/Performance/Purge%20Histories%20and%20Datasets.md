1. format text/creole <<Include(Admin/Config/Performance/LinkBox)>> 

## Background on Dataset Objects

Histories that are displayed in the history panel are stored as records in the History table in the Galaxy database. Among other columns, the History table includes the following:

| id | update\_time | user\_id | deleted | purged |
| --- | --- | --- | --- | --- |

When a user visits the Galaxy home page for the very first time, a new Galaxy session is created and the session information is stored in a browser cookie. A new history record is automatically created and associated with the session cookie. At this point, neither the session nor the history is associated with a user ID since the user has not logged in. Logging in is not required for using Galaxy, but if the user logs in, their user ID is associated with both the Galaxy session and the previously created history. In this case, the next time the user visits the Galaxy home page and logs in, the history panel displays the history that meets all of the following criteria:

- is associated with their user ID  
 
 
- contains the latest update time of any of their previously stored histories  
 
 
- is not deleted ( the history.deleted column contains the value False ) 

When the user performs an analysis, items are added to the history which are each associated with a dataset. These items are known as <<nwwl(HistoryDatasetAssociation)>> objects. Information about datasets is stored in the Dataset table in the Galaxy database, with the data itself stored on disk. The Galaxy configuration file includes a **file\_path** attribute which points to the location on disk where the datasets are stored. Among other columns, the Dataset table includes the following:

| id | update\_time | deleted | purged | file\_size |
| --- | --- | --- | --- | --- |

Among other columns, the <<nwwl(HistoryDatasetAssociation)>> table includes the following:

| id | update\_time | history\_id | deleted | dataset\_id |
| --- | --- | --- | --- | --- |

Every <<nwwl(HistoryDatasetAssociation)>> record associates a Dataset with a history record via the values in the <<nwwl(HistoryDatasetAssociation)>>.history\_id and <<nwwl(HistoryDatasetAssociation)>>.dataset\_id columns. Any number of <<nwwl(HistoryDatasetAssociation)>> records can point to a base Dataset -- this is how copying histories, history items, and libraries work without needing to copy actual file contents.

Among other columns, the <<nwwl(LibraryDatasetDatasetAssociation)>> table includes the following:

| id | update\_time | library\_dataset\_id | deleted | dataset\_id |
| --- | --- | --- | --- | --- |

Every <<nwwl(LibraryDatasetDatasetAssociation)>> record associates a Dataset with a versionable library dataset record via the values in the <<nwwl(LibraryDatasetDatasetAssociation)>>.library\_dataset\_id and <<nwwl(LibraryDatasetDatasetAssociation)>>.dataset\_id columns. Any number of <<nwwl(LibraryDatasetDatasetAssociation)>> records can point to a base Dataset.

## Purging Unwanted Histories, Libraries and Datasets

A Dataset can only be deleted (or purged) when all <<nwwl(HistoryDatasetAssociations)>> and <<nwwl(LibraryDatasetDatasetAssociations)>> have been marked as deleted.

There are 6 scripts included in the Galaxy distribution that can be used to clean up unwanted histories, libraries and datasets. There are located in the <<<nwwl(GALAXY\_ROOT)>>>/scripts/cleanup\_datasets directory and are named:

- delete\_userless\_histories.sh 
- purge\_histories.sh 
- purge\_datasets.sh 
- purge\_folders.sh 
- purge\_libraries.sh 
- delete\_datasets.sh 

These scripts all execute the Python script in the same directory named cleanup\_datasets.py, sending different parameter values on the command line. If desired, these scripts can be ignored and the cleanup\_datasets.py scripts can be executed manually (using the <<nwwl(GALAXY\_ROOT)>> as the working directory), passing in desired parameter values. However, these scripts can be easily configured in cron to execute automatically. The order in which the scripts are executed will affect the outcome; for best results, the recommended running order is:

1. delete\_userless\_histories.sh 
2. purge\_histories.sh 
3. purge\_libraries.sh 
4. purge\_folders.sh 
5. purge\_datasets.sh 

If it is desired that datasets be removed before their outer container (history, library/library folder) has been deleted, the delete\_datasets.sh script can be used before the purge\_datasets.sh script. This script may take some time to complete.

Available Flags:

| flag | short | description |
| --- | --- | --- |
| --days | -d | number of days (60) to use as a cut off; do not act on objects updated more recently than this |
| --info\_only | -i | only provide info about the requested action; no changes saved to database |
| --remove\_from\_disk | -r | remove files from disk during operations |
| --force\_retry | -f | performs the requested actions, but ignores whether it might have been done before. Useful when -r wasn't used, but should have been |
| | | |
| --delete\_userless\_histories | -1 | delete userless histories and datasets |
| --purge\_histories | -2 | purge deleted histories |
| --purge\_datasets | -3 | purge deleted datasets |
| --purge\_libraries | -4 | purge deleted libraries |
| --purge\_folders | -5 | purge deleted library folders |
| --delete\_datasets | -6 | mark deletable datasets as deleted and purge associated dataset instances |

Here are more details about each of the functions that the cleanup\_datasets.py script can perform.

### Deleting Userless Histories

As mentioned above, logging in is not required for using Galaxy, and in many cases users perform an analysis without logging in to review results in a "1-off" fashion, not caring about keeping the analysis for later review. In this case, history record(s) are created with no associated user ID. The cleanup\_dataset.py script can be used to delete these types of histories that have not been altered for a specified period of time. The command for deleting userless histories is something like:

python cleanup\_datasets.py config/galaxy.ini -d 60 -1

Notice that the first parameter passed into the script is the Galaxy configuration file. This is necessary for the script to acquire information about the database connection and the location of data files on disk. The value following the -d flag is the span of time in days that has passed since a history was last updated ( i.e., the value in the History.update\_time column is older than 60 days in this example ). Based on this criteria, all History records that do not include a value in the user\_id column and whose update\_time column value is older than 60 days will be retrieved. The -1 flag tells the cleanup\_datasets.py script to execute the method named delete\_userless\_histories(), which is included in the script. This method deletes userless histories whose update\_time value is older than the specified number of days by setting the value of the History.delete column to True. Executing the same command, but providing the -i flag will not write any changes; info about the histories to be deleted will be provided.

### Purging Deleted Histories

In the lifecycle of a History record, the stage following the "deleted" stage is the "purged" stage, the last stage in the History record's lifecycle. When a History record is purged, all <<nwwl(HistoryDatasetAssociation)>> records associated with the History record are purged. When a <<nwwl(HistoryDatasetAssociation)>> is purged, it is marked as deleted. Addionally the Dataset associated with the HDA is marked as deleted only if all associations to that Dataset are also purged (HDA & <<nwwl(LDDA)>> are all marked as deleted); when this happens, <<nwwl(HDAs)>> and <<nwwl(LDDAs)>> are no longer undeletable by the user - if '-r' is used the associated files and metadata files are removed from disk (the primary Dataset File still remains on disk and can be retrieved by an admin) . The command for purging histories and associated <<nwwl(HDAs)>> is something like:

python cleanup\_datasets.py config/galaxy.ini -d 60 -2 -r

In this example, the -2 flag tells the cleanup\_dataset.py script to execute the purge\_histories() method included in the script. This method retrieves all History records whose History.deleted column value is True, History.purged column value is False and whose History.update\_time column value is older than the specified number of days ( 60 in this example ). All <<nwwl(HistoryDatasetAssociation)>> records associated with the History record are also purged by setting the <<nwwl(HistoryDatasetAssociation)>>.deleted column value to True; any additional <<nwwl(DatasetAssociations)>> (HDA/<<nwwl(LDDA)>>) are polled and if they all have <<nwwl(HistoryDatasetAssociation)>>.deleted==True, the Dataset.deleted column is set to True. The -r flag in this example tells the cleanup\_dataset.py script to remove the files (metadata etc) associated with the <<nwwl(HistoryDatasetAssociation)>> record from disk (only if Dataset.deleted is to be set to True). Executing the same command but replacing the -r flag with -i will print out all of the History and associated <<nwwl(HistoryDatasetAssociation)>> records that will be purged if the -r flag is used.

### Purging Deleted Datasets

Dataset records are moved to the "deleted" stage when all History and Library records associated with the dataset are deleted as described above.

The next stage in the lifecycle of a deleted Dataset record is the "purged" stage, the last stage in the Dataset record's lifecycle. The command for purging datasets is something like:

python cleanup\_datasets.py config/galaxy.ini -d 60 -3 -r

In this example, the -3 flag tells the cleanup\_dataset.py script to execute the purge\_datasets() method included in the script. This method retrieves all Dataset records whose Dataset.deleted column value is True, Dataset.purged is False and whose Dataset.update\_time column value is older than the specified number of days ( 60 in this example ). The Dataset records are purged by setting the Dataset.purged column to True. As described above, the -r flag in this example tells the cleanup\_dataset.py script to remove the data file associated with the Dataset record from disk. Executing the same command but replacing the -r flag with -i will print out all of the Dataset records that will be purged if the -r flag is used.

### Purging Library Folders

Besides existing in user's history, dataset association objects exist with in Library Folders; they are known as <<nwwl(LibraryDatasetDatasetAssociations)>> (<<nwwl(LDDAs)>>). Purging a library folder is similar to purging a History. An example command is:

python cleanup\_datasets.py config/galaxy.ini -d 60 -5 -r

In this example, the -5 flag tells the cleanup\_dataset.py script to execute the purge\_folders() method included in the script. This method retrieves all <<nwwl(LibraryFolder)>> records whose <<nwwl(LibraryFolder)>>.deleted column value is True, <<nwwl(LibraryFolder)>>.purged column value is False and whose <<nwwl(LibraryFolder)>>.update\_time column value is older than the specified number of days ( 60 in this example ). It works recursively on all subfolders and their contents. All <<nwwl(LibraryDatasetDatasetAssociations)>> records associated with the <<nwwl(LibraryFolder)>> record are also purged by setting the <<nwwl(LibraryDatasetDatasetAssociation)>>.deleted column value to True; any additional <<nwwl(DatasetAssociations)>> (HDA/<<nwwl(LDDA)>>) are polled and if they all have <<nwwl(HistoryDatasetAssociation)>>(<<nwwl(LibraryDatasetDatasetAssociation)>>).deleted==True, the Dataset.deleted column is set to True. The -r flag in this example tells the cleanup\_dataset.py script to remove the files (metadata etc) associated with the <<nwwl(LibraryDatasetDatasetAssociation)>> record (but not the actual Dataset file) from disk (only if Dataset.deleted is to be set to True). Executing the same command but replacing the -r flag with -i will print out all of the <<nwwl(LibraryFolders)>> and associated <<nwwl(LibraryDatasetDatasetAssociation)>> records that will be purged if the -r flag is used.

As is the case with Histories, the purge\_datasets script will need to be used to remove actual Datasets from disk.

### Purging Libraries

Purging a library is similar to purging a <<nwwl(LibraryFolder)>>. All libraries which are not purged, but are deleted and exceed the modified date are retrieved. The library is marked as purged and purge\_folder is called on the library's root folder, deleting all contents. An example command is:

python cleanup\_datasets.py config/galaxy.ini -d 60 -4 -r

In this example, the -4 flag tells the cleanup\_dataset.py script to execute the purge\_libraries() method included in the script. This method retrieves all Library records whose Library.deleted column value is True, Library.purged column value is False and whose <<nwwl(LibraryFolder)>>.update\_time column value is older than the specified number of days ( 60 in this example ). The Library's Root Folder is then obtained and all <<nwwl(LibraryDatasetDatasetAssociations)>> records associated with the <<nwwl(LibraryFolder)>> record are also purged by setting the <<nwwl(LibraryDatasetDatasetAssociation)>>.deleted column value to True; any additional <<nwwl(DatasetAssociations)>> (HDA/<<nwwl(LDDA)>>) are polled and if they all have <<nwwl(HistoryDatasetAssociation)>>(<<nwwl(LibraryDatasetDatasetAssociation)>>).deleted==True, the Dataset.deleted column is set to True. The -r flag in this example tells the cleanup\_dataset.py script to remove the files (metadata etc) associated with the <<nwwl(LibraryDatasetDatasetAssociation)>> record (but not the actual Dataset file) from disk (only if Dataset.deleted is to be set to True). Executing the same command but replacing the -r flag with -i will print out all of the Libraries, <<nwwl(LibraryFolders)>> and associated <<nwwl(LibraryDatasetDatasetAssociation)>> records that will be purged if the -r flag is used.

### Deleting Datasets / Purging Dataset Instances

There are times when it is not desirable to wait for the containing history or library/library folder to be deleted before purging a dataset instance and marking the base dataset as deleted. The -6 flag is used for this purpose. This script will find all Dataset records which are not deleted but are associated with a <<nwwl(DatasetAssociation)>> that is marked as deleted and updated according to the specified cut-off. If all associations are marked as deleted, the Dataset is marked as deleted and each <<nwwl(DatasetAssociation)>> is purged. The purge\_datasets.sh script will need to be run afterwards to remove the base datasets from disk.

An example command is: python cleanup\_datasets.py config/galaxy.ini -d 60 -6 -r

