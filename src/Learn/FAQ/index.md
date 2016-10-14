---
autotoc: true
title: [Frequently Asked Questions](/FAQs),  for Using Galaxy
---
PLACEHOLDER_INCLUDE(/Learn/LinkBox)
PLACEHOLDER_INCLUDE(/FAQs/LinkBox)


Questions that apply to using most Galaxy instances.  See [/Main/FAQ](/Main/FAQ) for questions that are specifically about using [/Main](/Main), Galaxy's free public server.  See [/Admin/FAQ](/Admin/FAQ) for questions about [administering](/Admin) Galaxy.



## Datasets, Histories, and Disk Usage
What are the disk usage quotas when using Galaxy?

Total disk space reserved per user is noted on the [/Main](/Main) and [/Test](/Test) home pages under the section "Quotas". 

When using a local, cloud, or public Galaxy servers hosted by other teams, quotas may or may not be set and are configured by that instance's administrator. Please see: [/Big Picture/Choices](/Big Picture/Choices).

For help understanding and organizing datasets and histories, please see: [Managing Datasets](/Learn/Managing Datasets).

## Storage on Galaxy servers
How long will my histories and associated dataset be stored on the central Galaxy server?

When you use Galaxy, any analyses that you perform will result in a "Galaxy history", which consists of history items ( datasets ).  This history is displayed in the right panel of your browser.  If you are logged into the Galaxy main server, your history / datasets will never be removed, except under these scenarios:

1. If you delete a specific history using the **Options** link at the top of the history panel, that history and all of its associated datasets will be removed from disk 60 days after you deleted the history.
   
2. Those specific history items ( datasets ) that you delete from one of your histories by clicking the "X" icon in the history item will be removed from disk after 60 days, but unless you manually delete your history, you will still be able to view the history itself ( only the dataset that you deleted from your history will be removed from disk ).

If you are not logged into our Galaxy main server, the history which results from your analyses will not be associated with a Galaxy login ID ( the history will not be associated with a user ).  Any history that is not associated with a user and which has not been altered for over 60 days will be deleted, and all history items ( datasets ) associated with that history will be removed from disk at the same time.


## Multiple histories
I suspect there must be a way of creating multiple history query sets (e.g., for different projects).  Is this possible?

Galaxy allows you to create as many histories as you want, but doing this requires you to have a Galaxy account and be logged in.  When logged in, click **Options** in the upper right corner of the history panel.  This will display a list of options in the center work panel.  Save a history by providing the history with a name.  If a history has more than one item and is saved, there will be an additional option "create a new empty history" which will let you create and save another history.


## Browser cache
If I encounter some problem when using Galaxy, should I clear my browser cache to attempt to correct the problem?  In other words, is Galaxy behavior affected by my browser cache?

Yes, your browser cache definitely affects the behavior of Galaxy.  The Galaxy development team often updates the central Galaxy server with new code enhancements.  Because of this, your browser cache may be using old versions of files and clearing them out is important.


## Central Galaxy server or Galaxy source distribution
Should I use the central Galaxy server environment hosted at Penn State or should I download the Galaxy source code and host it locally within my environment?

It depends upon your specifics needs.  In general, we advise our customers to use the central Galaxy server, hosted by The Institute for Genomics, Proteomics and Bioinformatics at Penn State University.  This environment is freely available to anyone with Internet access. Unlimited disk space is available for storing personal Galaxy histories and data.  If you want to manage a local Galaxy environment, the Galaxy source distribution aims to be a "zero configuration", entirely self-contained system that provides a lightweight webserver, an embedded database and a multi-threaded job manager. All tools (and their parameters) can be specified via simple XML based configuration files. 


## Alignment Tools
Does Galaxy provide tools to concatenate only blocks that are adjacent to each other ( i.e. without any gap in the "projected" species )?

The following alignment tools available in Galaxy enable this:

* **Join MAF blocks by species** - this tool will take a MAF from your history and fuse MAF blocks which are genomically adjacent on all the specified species producing another MAF file
* **Stitch MAF blocks given a set of genomic intervals** - this tool uses a set of guide intervals that you provide and creates one fasta alignment block per interval for each desired species.
* **Stitch Gene blocks given a set of coding exon intervals** - this tool does the same as above, except uses coding region information (encoded in the BED format) to create one fasta alignment block per CCDs.


## Interval and BED format
*Extract Genomic DNA* tool under *Fetch sequences* section returns one less nucleotide for the start value in each of my intervals. Is this a bug?

Genomic intervals (Interval and BED formats) in Galaxy are 0-based, start-inclusive/end-exclusive, reported with respect to a forward-strand chromosome beginning with a base labeled as "0". This nomenclature is in accordance with the definition of [BED format](http://genome.ucsc.edu/FAQ/FAQformat#format1) and [0-based Coordinates](http://genomewiki.cse.ucsc.edu/index.php/Coordinate_Transforms) by UCSC. 

### Examples
1. For computational purposes, a chromosome begins with the initial base labeled as "0". So for a chromosome 1 beginning with a base labeled as "0", BED/Interval coordinates defined as "chr1 100 200" will be translated and representing the 0-start computational bases 100 to 199. 
1. For certain other data formats and in particular positional visualization, a chromosomes begins with the initial base labeled as "1". So for a chromosome 1 beginning with a base labeled as "1", the BED/Interval coordinates defined as "chr1 100 200" will be translated/visualized as representing the 1-start positional bases 101 to 200.

For a detailed explanation, please read [this article](ATTACHMENT_URLzero_based_coordinates.pdf). 
To learn/understand whether a particular datatype is associated with a 0-based or 1-based coordinate system, see data format descriptions in Galaxy's help section for the tool "Get Data -> Upload".


## The Galaxy Test Server

The [Galaxy Test Server](/Test), http://test.g2.bx.psu.edu/, is an experimental/beta server where we test things out.  It is not recommended for anything other than testing.  See [/Test](/Test) for more.


## Using Galaxy for Transcriptome Analysis

See 
* [this Galaxy Page](http://main.g2.bx.psu.edu/u/jeremy/p/transcriptome-analysis-faq) by Jeremy Goecks.
* [Blogspot post](http://kevin-gattaca.blogspot.com/2011/09/faq-howto-do-rna-seq-bioinformatics.html).

## Questions Not Answered Here ...

<div class='right'><a href='http://galaxyproject.org/search/usegalaxy'><img src='/Images/Logos/UseGalaxySearch.png' alt='Google Custom Search' width="150" /></a></div>

If you have questions about using Galaxy that aren't answered here, try the [UseGalaxy Google Custom Search](http://galaxyproject.org/search/usegalaxy).  It will search *all* online Galaxy resources about *using* Galaxy and return a categorized list of search results. 
