---
 title: Downloading Data
---
[Back to Support Hub](/src/support/index.md)

Related topics
 * [Loading Data](/src/support/loading-data/index.md)
 * [Moving data between Galaxy servers](/src/blog/2016-07-moving-data-between-galaxy-instances/)

* **Download datasets** by clicking on the disk icon inside the [dataset](/src/learn/managing-datasets/index.md). Good for smaller sizes in all browsers.
* **Download entire histories** by selecting _"Export to File"_ from the History menu, and clicking on the link generated.
* **Transfer/Upload entire histories** after using _"Export to File"_ from the History menu and generating the link or downloading the archive, do one of the following: 1) copy the link in the "from" Galaxy instance, **then** in the "to" Galaxy instance select "Import from File" from the _"User > Saved Histories"_ page and paste in the link into the form OR 2) select a downloaded history archive file to upload it.
 * _"Tip"_: If your history is large, consider using _"Copy Datasets"_ from the History menu to move just your most important datasets into a new history, then create the archive from that smaller history. Copied datasets do not consume additional account quota space. Archive creation, download, and transfer will go much quicker with a smaller history not cluttered up with intermediate/error data, or any starting data that you already have and uploaded to Galaxy.
* The video **[Datasets 1](http://vimeo.com/galaxyproject/datasets1)** includes help about different datatypes and what to expect in the download icon (one file or two!).

# Large Files

**Browser option:** try with Google Chrome (sometimes this browser supports better continuous downloads).

**Command-line option:** from a terminal window on your computer, you can use **[wget](https://www.gnu.org/software/wget/manual/html_node/Download-Options.html#Download-Options)** or **[curl](http://en.wikipedia.org/wiki/CURL)**.

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

# GenomeSpace Importer/Exporter

Please see: https://galaxyproject.org/support/loading-data/#genomespace-importerexporter
