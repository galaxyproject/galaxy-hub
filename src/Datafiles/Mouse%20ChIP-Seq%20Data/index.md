# Datafiles used in various teaching exercises using Mouse mm9 chr19

* Used in ***Using Galaxy to Perform Large-Scale Interactive Data Analysis: A live supplement*** June 2012 Update published in *Current Protocols in Bioinformatics* (pending release)
  * *Using Galaxy to Perform Large-Scale Interactive Data Analysis* - Publication, June 2012 *CPB*
  * Complete Live Supplemental - Page, Galaxy [Main](/src/Main/index.md)
  * Loading Data and Understanding Datatypes - Screencast, Protocol 2
  * Calling Peaks for ChIP-seq Data - Screencast, Protocol 3
* Other

# Mammalian Promoter Database Files

<div class='right'><a href='http://mpromdb.wistar.upenn.edu/'><img src="/src/images/Logos/MPromDBLogo.png" alt="MPromDB" width="250" /></a></div>
These data come from the [Mammalian Promoter Database (MPromDB)](http://mpromdb.wistar.upenn.edu/) at the [Wistar Instute](http://www.wistar.org). MPromDB "is a curated database that strives to annotate gene promoters identified from ChIP-Seq experiment results. The long term goal of this database is to provide an integrated resource for mammalian gene transcriptional regulation and epigenetics."  It is produced and supported by the [Davuluri Lab](http://bioinformatics.wistar.upenn.edu/davuluri), and Galaxy wishes to thank them for allowing us to use this data.

## Restrictions

[MPromDB](http://mpromdb.wistar.upenn.edu/) is a public resource.  However, it does have a few restrictions:

1. You must be a registered user to download data files.
1. Downloaded data files may be used only for non-commercial purposes.

The files here are a small subset of the files available for download from MPromDB.  We ask you to honor MPromDB's use restrictions.  The [Galaxy Team](/src/GalaxyTeam/index.md) also wishes to thank the [Davuluri Lab](http://bioinformatics.wistar.upenn.edu/davuluri) for allowing us to use this data in the Galaxy project.

## Data


| File |  Description  | 
| ---- | ------------ | 
| [|&do=get](PLACEHOLDER_ATTACHMENT_URL/src/MM9.chr19.AnnotatedPromotersWithTissueRNAP2Density.txt) |  Annotated promoter list.  This is a tab-delimited, custom format file.  It is a reduced version of the full file from MPromDB that contains only promoters on chromosome 19.  **See [Restrictions](/src/Datafiles/Mouse%20ChIP-Seq%20Data/index.md#restrictions) for how this data can be used.**  | 

# Mouse ENCODE Files

These files are from the [Transcription Factor Binding Sites by ChIP-seq from ENCODE/Stanford/Yale](http://genome.ucsc.edu/cgi-bin/hgFileUi?db=mm9&g=wgEncodeSydhTfbs) mouse ChIP-SEQ experiment in the ENCODE project.  These data were generated and analyzed by the labs of
[Michael Snyder](http://snyderlab.stanford.edu/) at Stanford University and
[Sherman Weissman](http://info.med.yale.edu/bcmm/SMW/SMWhome2.html) at Yale University. The exact data can be found at:
* ftp://hgdownload.cse.ucsc.edu/goldenPath/mm9/encodeDCC/wgEncodeSydhTfbs/
  * wgEncodeSydhTfbsMelCtcfDmso20IggyaleRawDataRep2.fastq.gz - tags dataset
  * wgEncodeSydhTfbsMelInputDmso20IggyaleRawData.fastq.gz - control dataset (**note**: this is a correction from the control data source listed in the publication)

The original files from ENCODE were too large to use in teaching examples, so they have been reduced to contain only data that corresponds to chromosome 19 (the shortest).  

These files were created by, well, cheating.  We first processed the entire dataset, mapping it to the mm9 genome (source: UCSC). When went back and extracted from the original datasets only those records that eventually mapped to chromosome 19.

These data are also available as Galaxy dataset objects in Protocol 2 of the ***Using Galaxy to Perform Large-Scale Interactive Data Analysis: A live supplement*** June 2012 Update published in *Current Protocols in Bioinformatics* (pending release)


| File |  Description  | 
| ---- | ------------ | 
| [|&do=get](PLACEHOLDER_ATTACHMENT_URL/src/MouseChipSeqControlChr19.fastq) |  The control file.  It is an ungroomed Illumina FASTQ file.  The original control file on which this is based on is available [from the ENCODE downloads site](http://hgdownload.cse.ucsc.edu/goldenPath/mm9/encodeDCC/wgEncodeSydhTfbs/wgEncodeSydhTfbsMelInputDmso20IggyaleRawData.fastq).  | 
| [|&do=get](PLACEHOLDER_ATTACHMENT_URL/src/MouseChipSeqRep1Chr19.fastq) |  The experimental results.  It is also an ungroomed Illumina FASTQ file.  The original control file on which this is based on is available [from the ENCODE downloads site](http://hgdownload.cse.ucsc.edu/goldenPath/mm9/encodeDCC/wgEncodeSydhTfbs/wgEncodeSydhTfbsMelCtcfDmso20IggyaleRawDataRep1.fastq).  | 
