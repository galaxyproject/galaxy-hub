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

[Download datasets](https://training.galaxyproject.org/training-material/faqs/galaxy/datasets_download_datasets.html)

[Download entire histories](https://training.galaxyproject.org/training-material/faqs/galaxy/histories_download_histories.html)

[Transfer entire histories from one Galaxy server to another](https://training.galaxyproject.org/training-material/faqs/galaxy/histories_transfer_entire_histories_from_one_galaxy_server_to_another.html)

# Large Datasets

## Browser option

Download datasets from Galaxy to your computer by clicking on the "disk icon" within an expanded dataset.

* Most datasets will only have one file per dataset.
* Datasets with a `bam` datatype will have two files per dataset 1) the `bam` dataset itself plus 2) the associated `bai` index. Download each individually. See [Common datatypes explained: bam](/learn/datatypes/#bam).
* Datasets with a `fasta` datatype will have one file per dataset. If you need a fasta `fai` index, one can be created and downloaded. See [Common datatypes explained: fasta](/learn/datatypes/#fasta).

[Dataset downloading incompletely?](https://training.galaxyproject.org/training-material/faqs/galaxy/dataset_incomplete_download.html)


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

# [Dataset(s) not downloading at all?](https://training.galaxyproject.org/training-material/faqs/galaxy/datasets_not_downloading_at_all.html)
