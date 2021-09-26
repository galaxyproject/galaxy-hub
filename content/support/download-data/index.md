---
 title: Downloading Data
---
[Back to Support Hub](/support/)

Related topics

 * [Loading Data](/src/support/loading-data/index.md)
 * [Moving data between Galaxy servers](/src/blog/2016-07-moving-data-between-galaxy-instances/)
 
Tutorials

  * [Galaxy Training Network (GTN)](https://training.galaxyproject.org/): [Data Manipulation](https://training.galaxyproject.org/training-material/topics/galaxy-data-manipulation/)

# Overview

**Download datasets** by clicking on the disk icon inside the [dataset](/src/learn/managing-datasets/index.md). Good for smaller sizes in all browsers.

**Download entire histories** by selecting _"Export to File"_ from the History menu, and clicking on the link generated.

**Transfer/Upload entire histories** after using _"Export to File"_ from the History menu and generating the link or downloading the archive, do one of the following: 1) copy the link in the "from" Galaxy instance, **then** in the "to" Galaxy instance select "Import from File" from the _"User > Saved Histories"_ page and paste in the link into the form OR 2) select a downloaded history archive file to upload it.
 * _"Tip"_: If your history is large, consider using _"Copy Datasets"_ from the History menu to move just your most important datasets into a new history, then create the archive from that smaller history. Copied datasets do not consume additional account quota space. Archive creation, download, and transfer will go much quicker with a smaller history not cluttered up with intermediate/error data, or any starting data that you already have and uploaded to Galaxy.
* The video **[Datasets 1](http://vimeo.com/galaxyproject/datasets1)** includes help about different datatypes and what to expect in the download icon (one file or two!).

# Large Datasets

## Browser option 

Download datasets from Galaxy to your computer by clicking on the "disk icon" within an expanded dataset. 

* Most datasets will only have one file per dataset. 
* Datasets with a `bam` datatype will have two files per dataset 1) the `bam` dataset itself plus 2) the associated `bai` index. Download each individually. See [Common datatypes explained: bam](/src/learn/datatypes/#bam).
* Datasets with a `fasta` datatype will have one file per dataset. If you need a fasta `fai` index, one can be created and downloaded. See [Common datatypes explained: fasta](/src/learn/datatypes/#fasta).

Dataset downloading incompletely?

* Try using the _Google Chrome_ web browser. Sometimes Chrome itself better supports continuous data transfers.
* Use the **command-line option** instead. The data may really be too large to download OR your connection is slower. This can also be a faster way to download multiple datasets plus ensure a complete transfer (small or large data).

## Command-line option

From a terminal window on your computer, you can use **[wget](https://www.gnu.org/software/wget/manual/html_node/Download-Options.html#Download-Options)** or **[curl](http://en.wikipedia.org/wiki/CURL)**.

The direct download link to a dataset can be obtained by right clicking the
floppy disk icon and choosing "Copy Link Location" (for most datasets) or
"Download Dataset/Download bam_index" (for BAM datasets there are two
downloads). Once you have the link, type this (where "$" indicates the terminal
prompt), so that the link is inside of single quotes. Like many commands, there
are many options. These are examples commonly used with Galaxy.

Here's what it looks like using 'wget':

```
$ wget -O '<link>'
$ wget -O --no-check-certificate '<link>' # ignore SSL certificate warnings
$ wget -c '<link>'                        # continue an interrupted download
```

Or, using curl:

```
$ curl -o outfile '<link>' 
$ curl -o outfile --insecure '<link>'     # ignore SSL certificate warnings
$ curl -C - -o outfile '<link>'           # continue an interrupted download
```

# Dataset Collections

For dataset collections and datasets within collections you have to supply your [API key](https://galaxyproject.org/develop/api/#enabling) with the request. You can add it to the end of the collection download url, the command would look something like this:

```
$ wget https://usegalaxy.org/api/dataset_collections/d20ad3e1ccd4595de/download?key=MYSECRETAPIKEY
```
or 
```
$ curl -o myfile.txt https://usegalaxy.org/api/dataset_collections/d20ad3e1ccd4595de/download?key=MYSECRETAPIKEY
```

# Dataset(s) not downloading at all?

1. Check to see if pop-ups are blocked by your web browser. Where to check can vary by browser and extensions.
1. Double check your API key, if used. _User > Preferences > Manage API key_
1. Check the sharing/permission status of the Datasets.
* Review a dataset's permission status under _Dataset > pencil icon > Edit attributes > Permissions_. If you do not see a "Permissions" tab, then you are not the owner of the data.
* If the data was [shared with you by someone else](/src/support/account-quotas/index.md#find-histories-that-have-been-shared-with-you-and-unshare-those-not-needed) from a Shared History, or was copied from a Published History, or you are Sharing or Publishing data, be aware that there are multiple levels of data sharing permissions.
* **All data are set to "not shared" by default**. 
* **Global sharing, new/existing history, and new/existing data sharing preferences or status can be modified by you at any time under _User > Preferences_ for data that you own.**. 
* **_User > Preferences > Make all data private_ is a "one click" option to unshare ALL data (Datasets, Histories).** Review the pop-up details and confirm or deny the action. Note that once confirmed and all data is unshared, the action cannot be "undone" in batch, even by an administer. You will need to re-share data again and/or reset your global sharing preferences as wanted.
* Only the data owner has control over sharing/permissions. 
* Any data you upload or create yourself is automatically owned by you with full access.
* You may not have been granted full access if the data were shared or imported or copied, and someone else is the data owner (your copy could be "view only"). 
* After you have a fully shared copy of any shared/published data from someone else, then you become the owner of that data copy. Changes the other person makes, or changes you make, apply to each persons copy/version of the data, individually and only. 
* Histories can be shared with included Datasets also shared (can be downloaded/manipulated by others) or not (viewable only by others). 
* The person who shared the History, or Published it, has full and sole control over sharing permissions. However, once you fully share data with someone else, they can create their own copy and modify/manipulate it, independently.
* Share access to Datasets is distinct but related to access to Histories.
* How to adjust or check current share status for your own data with a History? On the _Share or Publish_ form, toggle sharing off/on. If you want Datasets to be fully shared with others, make sure the the box for the option "Also make all objects within the History accessible" is checked. 
* Don't see the "Also make all objects within the History accessible" box on the _Share or Publish_ form? This means that you modified your own default sharing permissions under _User > Preferences > Set dataset permissions for new histories_. You can change this.

