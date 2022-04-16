---
 title: Downloading Data
---
[Back to Support Hub](/support/)

Related topics

* [Loading Data](/support/loading-data/)
* [Moving data between Galaxy servers](/blog/2016-07-moving-data-between-galaxy-instances/)

Tutorials

* [Galaxy Training Network (GTN)](https://training.galaxyproject.org/): [Data Manipulation](https://training.galaxyproject.org/training-material/topics/galaxy-data-manipulation/)

# Overview

**Download datasets** by clicking on the disk icon inside the [dataset](/learn/managing-datasets/). Good for smaller sizes in all browsers.

**Download entire histories** by selecting _"Export to File"_ from the History menu, and clicking on the link generated.

**Transfer/Upload entire histories** after using _"Export to File"_ from the History menu and generating the link or downloading the archive, do one of the following: 1) copy the link in the "from" Galaxy instance, **then** in the "to" Galaxy instance select "Import from File" from the _"User > Saved Histories"_ page and paste in the link into the form OR 2) select a downloaded history archive file to upload it.

* _"Tip"_: If your history is large, consider using _"Copy Datasets"_ from the History menu to move just your most important datasets into a new history, then create the archive from that smaller history. Copied datasets do not consume additional account quota space. Archive creation, download, and transfer will go much quicker with a smaller history not cluttered up with intermediate/error data, or any starting data that you already have and uploaded to Galaxy.
* The video **[Datasets 1](http://vimeo.com/galaxyproject/datasets1)** includes help about different datatypes and what to expect in the download icon (one file or two!).

# Large Datasets

## Browser option

Download datasets from Galaxy to your computer by clicking on the "disk icon" within an expanded dataset.

* Most datasets will only have one file per dataset.
* Datasets with a `bam` datatype will have two files per dataset 1) the `bam` dataset itself plus 2) the associated `bai` index. Download each individually. See [Common datatypes explained: bam](/learn/datatypes/#bam).
* Datasets with a `fasta` datatype will have one file per dataset. If you need a fasta `fai` index, one can be created and downloaded. See [Common datatypes explained: fasta](/learn/datatypes/#fasta).

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

[Dataset(s) not downloading at all?](https://training.galaxyproject.org/training-material/faqs/galaxy/datasets_not_downloading_at_all.html)
