## Usegalaxy.org Data Rsync

Related topics
* [Data Integration](/src/admin/data-integration/index.md)
* [Data Preparation](/src/admin/data-preparation/index.md)

## Overview

All methods to access the data and indexes hosted at the public [Main](/src/main/index.md) **Galaxy** instance at [http://usegalaxy.org](http://usegalaxy.org) are described at http://datacache.galaxyproject.org/.

## Legacy: Obtaining Reference Genome Data by Rsync

See **http://datacache.galaxyproject.org/** for the most current help, include help for using the **[rsync Data Manager](https://github.com/galaxyproject/tools-iuc/tree/master/data_managers/data_manager_rsync_g2)**.

This page will describe how to manually rsync the same exact data that is used on the public [Main](/src/main/index.md) **Galaxy** instance at [http://usegalaxy.org](http://usegalaxy.org) for use with a **[local](/src/admin/get-galaxy/index.md)** or **[cloud](/src/cloud/index.md)** **Galaxy** or an *external application*. The contents consist of reference genome sequence data, indexes used by tools, and the Galaxy-specific configuration files that make the data known to tools.


Examples file formats:
* .2bit
* .fa
* bowtie/bowtie2 and bwa indexes
* blastdb indexes
* maf files
* sam indexes
* *.loc files

You can either use as-is (with minor path editing to fit your environment), or use these as models, or simply move the data into your own custom hierarchy.

## Converting Formats

To convert `.2bit` to `.fa` format use the tool: `twoBitToFa`. There are many common bioinformatics tools to that can be used for file manipulations, but this and other related tools are in the *[UCSC Downloads](http://genome.ucsc.edu)* source code section: [http://hgdownload.cse.ucsc.edu/downloads.html](http://hgdownload.cse.ucsc.edu/downloads.html)

## Rysnc Server Name

```
datacache.g2.bx.psu.edu
```


## Example Data Retrieval

To download the complete directory for the **[phiX](http://en.wikipedia.org/wiki/Phi_X_174)** genome:

```
$ rsync -avzP rsync://datacache.g2.bx.psu.edu/indexes/phiX .
```

Most of the baterical genomes are nested one directory down (under microbes). This changes the command to this, where "63" is the assigned **dbkey** for the NCBI genome accession NC_007622, sourced from UCSC, and listed under GUI Genome Builds as **Staphyloccus aureus RF122 (63)**. For any genome, the dbkey is the value (inside_here).

```
$ rsync -avzP rsync://datacache.g2.bx.psu.edu/indexes/microbes/63 .
```

## Organization and DBKEY

Genomes are organized in directories by reference genome **dbkey**. If you are not sure of the **dbkey**, it can be found in the [Main](/src/main/index.md) user interface. This value is what is populated into the *"database"* attribute for a dataset. Or, it is the last value in parenthesis *(dbkey)* at the end of the full reference genome build name in two specific places: 

#### Example: dbkey 'Tcas_3.0'

* *On **Get Data -> Upload File** tool:* <br />![](/src/admin/use-galaxy-rsync/dbkey_UploadFile.png)

* *Under **Edit Attributes** (found by clicking on any dataset's upper right corner pencil icon):* <br />![](/src/admin/use-galaxy-rsync/dbkey_EditAttributes.png)

## Location (*.loc) Files

To retrieve an exact copy of the ***.loc** files used by the tools on **[https://usegalaxy.org](https://usegalaxy.org)**, execute this rsync command:

```
$ rsync -avzP rsync://datacache.g2.bx.psu.edu/location .
```


## Other Data

The list of available directories containing the other data referenced by location files is:
* genomes by **dbkey**
* microbes (genomes from http://archaea.ucsc.edu, named by genome identifier or index number (either could be a dbkey), nested in the directory **microbes**. See help **Example Data Retrieval** above for how to format the rsync path.)
* annotation_profiler
* binned_scores
* blastdb (megablast indexes)
* encode-data
* faseq
* gatk
* genome_diversity
* location (***.loc** files)
* phastOdds_precomputed
* regions
* rg
* snpeff
* taxonomy

----
