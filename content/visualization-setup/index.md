---
title: How to Set Up Visualizations in a Galaxy Instance
---
This page describes the administration steps needed to get Galaxy visualizations working.



## Make sure your datatypes.conf is up to date

The file **`datatypes_conf.xml`** describes the data types (e.g. bed, wiggle) that Galaxy knows about and how to convert from one data type to another. `datatypes_conf.xml` must be up-to-date for visualizations to work.

If you haven't made changes to your `datatypes_conf.xml` file, you can simply copy the sample datatypes file to the active file:

```
cd <GALAXY_HOME_DIR>
cp datatypes_conf.xml.sample datatypes_conf.xml
```


If you've made changes to your `datatypes_conf.xml` file, the easiest approach is make a copy of `datatypes_conf.xml.sample`, add in your changes, and then copy your modified datatypes file to the active file:

```
cd <GALAXY_HOME_DIR>
cp datatypes_conf.xml.sample my_custom_datatypes_conf.xml
<customize my_custom_datatypes_conf.xml>
cp my_custom_datatypes_conf.xml datatypes_conf.xml
```


## Install wigToBigWig, bedGraphToBigWig, and faToTwoBit from UCSC utilities

Galaxy visualizations require the UCSC utilities `wigToBigWig`, `bedGraphToBigWig`, and `faToTwoBit` to generate indices that are used for quickly searching data. [Download these utilities from UCSC](http://hgdownload.cse.ucsc.edu/admin/exe/) and add them to your (or your Galaxy user's) path.

## Install BED tools

[BEDtools](https://github.com/arq5x/bedtools2/) are required for generating coverage data for aligned reads, intervals, and mutations. Download, compile, and add the bedtools executable (<bedtools_dir>/bin) to your path.

## Get genome chromosome length files

To visualize data for a genome build (e.g. hg19, mm10), visualization require the length of each chromosome in the build. Length files are named `<build_name>.len` and look like this:

```
chr1 27473282
chr2 38882233
...
chrX 28883322
```


Length files are stored in `GALAXY_HOME_DIR/tool-data/shared/ucsc/chrom/` by default, but this location can be configured in the `galaxy.ini` file:

```
# Directory where chrom len files are kept, currently mainly used by trackster
#len_file_path = tool-data/shared/ucsc/chrom
```


For example, to visualize data on the hg18 build for humans, a file called hg18.len must exist in the `len_file_path` folder.

To download length files for all UCSC builds, run the following commands from your `GALAXY_HOME` directory:

```
cd <GALAXY_HOME_DIR>
mkdir ./tool-data/shared/ucsc/chrom/
python ./cron/build_chrom_db.py ./tool-data/shared/ucsc/chrom/
```


## Optional but highly recommended: get genome data

To display a build's genome data (i.e. bases/nucleotides) and differences between your data and the build, you will need to include the genome's data via the `<GALAXY_HOME>/tool-data/twobit.loc` configuration file. This file tells Galaxy where a build's twobit genome file is located and has the format (note the space between the columns is a <TAB> character!):

```
<Build> <FullPathToFile>
```


An entry for the hg19 build might look like this:

```
hg19	/home/joe/galaxy/data/hg19/hg19.2bit
```


[You can download twobit files for common genomes at UCSC](http://hgdownload.cse.ucsc.edu/downloads.html) by clicking on a build's 'Full data set' and downloading the build's twobit file. If you have a genome's fasta file, you can create a twobit file by using the [UCSC utilties](http://hgdownload.cse.ucsc.edu/admin/exe/) `faToTwoBit` tool.

*NOTE: we're developing a graphical user interface for downloading and configuring builds in Galaxy. Stay tuned.*

## Restart your Instance

To ensure that all changes you made take effect, restart your Galaxy instance.
