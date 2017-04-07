---
 autotoc: true
 title: Downloading Data
---
[Back to Support Hub](/src/support/index.md)

Related topics
 * [Loading Data](/src/support/loading-data/index.md)
 * [Moving data between Galaxy servers](/src/community/log/2016/moving-data-between-galaxies/index.md)


## Downloading data

* **Download datasets** by clicking on the disk icon inside the [dataset](/src/learn/managing-datasets/index.md). Good for smaller sizes in all browsers.
* **Download entire histories** by selecting _"Export to File"_ from the History menu, and clicking on the link generated.
* **Transfer entire histories** by selecting _"Export to File"_ from the History menu, generating the link, coping the link in the "from" Galaxy instance, **then** in the "to" Galaxy instance select "Import from File" from the History menu, and paste in the link into the new form.
* The video **[Datasets 1](http://vimeo.com/galaxyproject/datasets1)** includes help about different datatypes and what to expect in the download icon (one file or two!).


### Download tip: Big data


**Browser option:** use Google Chrome and click on the disc icon (we've found that this browser supports better continuous downloads).

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


