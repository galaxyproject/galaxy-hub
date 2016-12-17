---
autotoc: true
title: Learn Galaxy
---
<div class='center'>
<a href='http://usegalaxy.org/galaxy101'><img src="/src/Learn/Galaxy101Page.png" alt="Galaxy 101" height="160" /></a>&nbsp;&nbsp; <a href='/src/Learn/Screencasts/index.md'><img src="/src/Learn/ScreencastsThumb.png" alt="Screencasts" height="160" /></a>&nbsp;&nbsp; <a href='/src/Learn/index.md#shared-pages-histories--workflows'><img src="/src/Learn/SharedHistoriesThumb.png" alt="Shared Pages, Histories, & Workflows" height="160" /></a>
</div>



{{> Learn/LinkBox }}
<div class='left'></div>

There are many approaches to learning how to *use* Galaxy.  The most popular is probably to just dive in and use it.  Galaxy is simple enough to use that you can do many analyses just by exploring the interface.  However, you may miss much of the power this way. 

Watch the short **[Learn](http://vimeo.com/75940376)** video for a learning resource overview.

## Galaxy 101

New! Start here to learn more: **[Galaxy NGS 101](/src/Learn/GalaxyNGS101/index.md)**

The *[Galaxy 101](https://usegalaxy.org/galaxy101)* exercise and [screencast](/src/Learn/Screencasts/index.md) will show you the ins and outs of using Galaxy. This includes loading data (from UCSC in this example), using genome builds, the tool interface, filtering, sorting, and combining datasets, generating statistics, and Galaxy's History,  Workflow and [sharing](/src/Learn/Share/index.md) support.

The *[Galaxy Variant 101](https://usegalaxy.org/u/galaxyproject/p/galaxy-variant-101)* exercise steps demonstrate data manipulations (fastq, SAM/BAM), sequence mapping, plus simple variant calling. 

## Screencasts

There are a plethora of [Screencast](/src/Learn/Screencasts/index.md) videos available that demonstrate many aspects of Galaxy from basic features to full-blown complex analysis to cloud and administrative guides.
<br />
<br />
Watch the most current videos at *Vimeo*: **[http://vimeo.com/galaxyproject](http://vimeo.com/galaxyproject)**


## Pages, Histories, Datasets, Workflows, Libraries

Learn more about each of these Galaxy object types below.  

Galaxy supports the [sharing and publishing](/src/Share/index.md) of data analysis. See how it works in the **[Share or Publish](http://vimeo.com/galaxyproject/sharepublish)** video.

* **Pages** are a method of documenting within Galaxy a set of analysis steps and/or the scientific context of a particular History, Workflow, Visualization, or set of Datasets.  These are often used to supplement publications or to present tutorials. The [Main](/src/Main/index.md) Galaxy instance at [usegalaxy.org](http://usegalaxy.org) has a [list of published Pages](https://usegalaxy.org/page/list_published) to view as examples. Create one yourself using the menu option "User -> Saved Pages".
* **[Histories](/src/Histories/index.md)** are analyses records in Galaxy that show all input, intermediate, and final datasets, as well as every step in the process and the settings used with each job executed.  History can be imported into your session and rerun as is or modified. See the **["Managing Histories" video](http://vimeo.com/galaxyproject/managehistories)** for an example. The [Main](/src/Main/index.md) Galaxy instance has a [list of published Histories](https://usegalaxy.org/history/list_published) to review as examples.
* **[Datasets](/src/Learn/ManagingDatasets/index.md)** represent individual files or jobs included within a History. For an overview of common Dataset types, watch the **["Datasets" video](http://vimeo.com/galaxyproject/datasets1)**.
* **[Workflows](/src/Learn/AdvancedWorkflow/index.md)** define the steps in an analysis process but not the datasets.  Workflows are analyses that are intended to be executed (one ore more times) with different user-provided input Datasets.  The [Main](/src/Main/index.md) Galaxy instance has a [list of published Workflows](https://usegalaxy.org/workflow/list_published) to review as examples.
* **[Data Libraries](/src/Admin/DataLibraries/Libraries/index.md)** are collections of Datasets that are accessible from within a Galaxy instance. Libraries are designed for sharing datasets in between users or groups. The [Main](/src/Main/index.md) Galaxy instance has a [list of public Data Libraries](https://usegalaxy.org/library) to review as examples.

## Other Tutorials

In addition to [Screencasts](/src/Learn/Screencasts/index.md) and Shared Pages, Histories & Workflows above there are now several Galaxy-centric tutorials and "how to" papers that have been created by the community:


| Topic |  Authors  |  Posted / Presented  | 
| ----- | -------- | ------------------- | 
| **[Web-based Analysis of Next Generation Sequence Data](http://manuals.bioinformatics.ucr.edu/workshops/dec-12-16-2013)**<div class='indent'>[Part of Next Generation Data Analysis Marathon](http://manuals.bioinformatics.ucr.edu/workshops/dec-12-16-2013)<br />Includes [slides](http://biocluster.ucr.edu/~nkatiyar/Galaxy_workshop/Slides/Galaxy_workshop_2013.pdf), [exercises](http://biocluster.ucr.edu/~nkatiyar/Galaxy_workshop/Exercises/Galaxy_workshop_exercises_2013.pdf), [manual](http://manuals.bioinformatics.ucr.edu/home/gui-ngs-analysis)</div> |  Neerja Katiyar,  [Tyler Backman](http://facility.bioinformatics.ucr.edu/people/tyler-backman), [Rebecca Sun](http://facility.bioinformatics.ucr.edu/people/rebecca-sun), and [Thomas Girke](http://girke.bioinformatics.ucr.edu/), [UC Riverside](http://labs.bioinformatics.ucr.edu/)  |  2013/12  | 
| **[Intro to Using Galaxy for Bioinformatics](https://scholarworks.iu.edu/dspace/bitstream/handle/2022/17204/GalaxyWorkshop091713_t.pdf?sequence=1)** <div class='indent'>Includes a transcriptome assembly example.</div> |  Ganote, Carrie L.; Doak, Thomas  |  2013//09  | 
| **[UC Davis 2013 Bioinformatics Short Course](http://training.bioinformatics.ucdavis.edu/docs/2013/09/short-course-2013/)**<div class='indent'> Includes slides and exercises on *almost everything*. |  [Joe Fass](mailto:jnfass AT ucdavis DOT edu), [Nikhil Joshi](mailto:najoshi AT ucdavis DOT edu), [Jessie Li](mailto:jjsli AT ucdavis DOT edu), [Monica Britton](mailto:mtbritton AT ucdavis DOT edu), [Blythe Durbin-Johnson](mailto:bpdurbin AT phs DOT ucdavis DOT edu)  |  2013/09  | 
| **[Informatics on High Throughput Sequencing Data](http://bioinformatics.ca/workshops/2013/informatics-high-throughput-sequencing-data)**<div class='indent'>Module 5 - Bringing it all together: Galaxy</div> |  [Francis Oullette](http://bioinformatics.ca/person/cbw-experts/francis-ouellette)  |  2013/06  | 
| **[NGS in Galaxy](http://scriptogr.am/ohofmann)**<div class='indent'>Includes [ChIP-Seq](http://scriptogr.am/ohofmann/chip-seq), [RNA-Seq](http://scriptogr.am/ohofmann/rna-seq) and [Exome-Seq](http://scriptogr.am/ohofmann/exome-seq) examples. |  Shannan Ho Sui, Oliver Hofmann, Winston Hide, [Center for Health Bioinformatics](http://compbio.sph.harvard.edu/chb/) at the [Harvard School of Public Health](http://www.hsph.harvard.edu/)  |  2013/05  | 
| **[Introduction to Galaxy 2013 Bootcamp](http://training.bioinformatics.ucdavis.edu/docs/2013/02/bootcamp/galaxy/index.html)** |  Nikhil Joshi, Bioinformatics Core, UC Davis Genome Center  |  2013/02  | 
| **[RNA-seq Analysis in Galaxy](http://www.rna-seqblog.com/events/short-training-classes-rna-seq-analysis-in-galaxy/)** |  [BaRC, Whitehead Institute](http://jura.wi.mit.edu/bio/education/hot_topics/)  |  2013/01  | 
| **[Performing de novo assemblies using the NBIC Galaxy instance](http://www.nbic.nl/uploads/media/de_novo_assemblies_on_NBIC_Galaxy_-_9_jan_2013.pdf)** <div class='indent'> Part of [de novo Assembly from NGS Data Course at NBIC](http://www.nbic.nl/education/nbic-phd-school/course-schedule/ngsdenovo/)</div> |  Jan van Haarst (WUR)  |  2013/01  | 
| **[IIHG Bioinformatics Short Course](https://wiki.uiowa.edu/display/galaxyusers/IIHG+Bioinformatics+Short+Course+II)** <div class='indent'>Downloadable PDFs cover *Galaxy Intro and File formats*, *NGS Intro*, *Galaxy Basics*, and *Reproducibility and Collaboration within Galaxy*</div> |  Ann Black-Ziegelbein, Tom Bair, Srinivas Maddhi  |  2013/01  | 
| **[NGS Analysis with Galaxy and IGV](http://manuals.bioinformatics.ucr.edu/home/gui-ngs-analysis)** |  [Tyler Backman](http://facility.bioinformatics.ucr.edu/people/tyler-backman), [Rebecca Sun](http://facility.bioinformatics.ucr.edu/people/rebecca-sun) and [Thomas Girke](http://girke.bioinformatics.ucr.edu/), [UC Riverside](http://labs.bioinformatics.ucr.edu/)  |  2012/12/10  | 
| **[Galaxy Tutorials](https://genome.edu.au/wiki/Learn)**<div class='indent'>Including *RNA-Seq, Variant Detection,* and *Genome Assembly*</div> |  The [Genomics Virtual Lab](https://genome.edu.au/)  |  2012/09-12  | 
| **[Analysis of ChIP-seq data in Galaxy](http://jura.wi.mit.edu/bio/education/hot_topics/galaxy/GalaxyNov2012_ChIP-seq_toPost.pdf)** |  [BaRC, Whitehead Institute](http://jura.wi.mit.edu/bio/education/hot_topics/)  |  2012/11  | 
| **[Next Generation Sequencing Data Analysis](http://nihlibrary.ors.nih.gov/bioinfo/)** (Course no 11) <div class='indent'>"Massively parallel sequencing, also known as next generation sequencing, is a technology enabling high-throughput sequencing of genomes or loci of interest.  This course focuses on a single locus.  It examines the quality of the sequence reads; mapping of reads; and the quality of the mapping.  It also examines sequence variation." ([slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/2012NIHLibYoungNGSDataAnalysis.pdf)) |  [Lynn Young](http://nihlibrary.nih.gov/Services/Bioinformatics/Pages/biostaff.aspx)  |  2012/09  | 
| **[Automated and reproducible analysis of NGS data (ARANGS12)](https://github.com/rvosa/ngs-workflows/tree/master/doc/slides/day4)**<div class='indent'>Day 4</div> |  [Rutger Vos](http://rutgervos.blogspot.com/), Darin London  |  2012/09  | 
| **[Galaxy, a web based platform for bioinformatics analysis](http://jura.wi.mit.edu/bio/education/hot_topics/galaxy/Galaxy_June2012.pdf)** |  [Bioinformatics & Research Computing @ MIT](http://jura.wi.mit.edu/bio/), as part of their [Hot Topics series](http://jura.wi.mit.edu/bio/education/hot_topics/)  |  2012/06  | 
| **[Using Galaxy for NGS Analysis](http://chagall.med.cornell.edu/galaxy/)** |  [Luce Skrabanek](mailto:las2017 AT med DOT cornell DOT edu)  |  2012/06  | 
| **[RNA-Seq Course v1.0 documentation](http://training.bioinformatics.ucdavis.edu/docs/2012/05/RNA/index.html)** |  [UC Davis Bioinformatics Professional Training Program](http://training.bioinformatics.ucdavis.edu/)  |  2012/05  | 
| **[RNA-Seq Data Analysis Workshop](http://bit.ly/11Qvnwh)** |  [Lance Parsons](http://www.lanceparsons.net/), [Lewis-Sigler Institute for Integrative Genomics](http://www.princeton.edu/genomics/)  |  2012/04  | 
| **[SNP & Indel Detection Tutorial](http://bit.ly/10mulcT)** |  [Lance Parsons](http://www.lanceparsons.net/), [Lewis-Sigler Institute for Integrative Genomics](http://www.princeton.edu/genomics/)  |  2012/04  | 
| **[ChIP-Seq Tutorial](http://bit.ly/13fLyT1)** |  [Lance Parsons](http://www.lanceparsons.net/), [Lewis-Sigler Institute for Integrative Genomics](http://www.princeton.edu/genomics/)  |  2012/04  | 
| **[Genomic Resequencing Variant Detection and Interpretation in a Diagnostic Context Hands on workshop: Next generation sequence data analysis](https://humgenprojects.lumc.nl/trac/GAPSS3/wiki/resequencing)** |  [Hailiang (Leon) Mei](http://www.nbic.nl/about-nbic/nbic-faculty/details/hailiang-leon-mei/), [Jeroen Laros](http://www.liacs.nl/~jlaros/)  |  2012/04  | 
| **[Analyzing epigenome data in context of genome evolution and human diseases](http://www.springerlink.com/content/l2184206p7583v75/)** |  Feuerbach, *et al.*  |  2012/02  | 
| **[Using the UCSC Genome Browser and Galaxy to study regulatory sequence evolution in Drosophila](http://bergmanlab.smith.man.ac.uk/?p=1248)** |  [Bergman Lab](http://bergmanlab.smith.man.ac.uk/)  |  2012/02/07  | 
| **[UAB Galaxy RNA Seq Step by Step Tutorial](https://docs.uabgrid.uab.edu/wiki/UAB_Galaxy_RNA_Seq_Step_by_Step_Tutorial)** |  [Curtis Hendrickson](http://www.ccts.uab.edu/pages/bmi/bmi_main.htm)  |  2011/09/16  | 
| **[Visualization with Galaxy and IGV Tutorial](http://bit.ly/10TFBcy)** |  [Lance Parsons](http://www.lanceparsons.net/), [Lewis-Sigler Institute for Integrative Genomics](http://www.princeton.edu/genomics/)  |  2011/08  | 
| **[Analyzing Complete Genomics masterVar File through Galaxy](http://media.completegenomics.com/documents/Galaxy_demo_PDF.pdf)** |  [Complete Genomics](http://www.completegenomics.com/recordings/)  |  2011/03  | 

## Datasets

Galaxy for many users is all about Datasets, the inputs and outputs of analysis jobs. Learn how to load, label, format/reformat, QC, manipulate, visualize, detect problems in, save, share, hide, delete, perform simple-to-complex manipulations, generate standard and custom statistics, and track the methods that create datasets. A short overview of features is in the **[Datasets 1](http://vimeo.com/79356949)** video.

Learning the basics of how to manage datasets helps to focus analysis on the scientific aspects of a project, while minimizing problems and troubleshooting. Simply put, save time and verify format first! It's quick to do right in the existing history, so there's no programming required.

* [Using Custom Genomes](/src/Learn/CustomGenomes/index.md) - Format, loading, troubleshooting, and tools.
* [Managing Datasets](/src/Learn/ManagingDatasets/index.md) - Attributes, Copy, Clone, Delete and more.
* [Datatypes](/src/Learn/Datatypes/index.md) - Specifications for the datatypes used and produced by Galaxy's tools.
* [Main](/src/Main/index.md) and [Test](/src/Test/index.md) Quotas - User account allocations for data and jobs. 
* [Data management: accounting and disk quotas](/src/Admin/Disk Quotas/index.md) - Implementation details.
* [Admin/Datatypes](/src/Admin/Datatypes/index.md) & [Admin/Data Integration](/src/Admin/Data Integration/index.md) - Instructions about adding new datasets (genomes) and datatypes to a local Galaxy instance

## Tools

<div class='right'>![](/src/Learn/ToolsPanel.png)</div>
Extensive help on how to use a particular tool in Galaxy is often included on the tool page itself, inside Galaxy.  To see this help, click on a tool in the left tool panel, and then scroll to the bottom of the center panel. Help includes parameter explanations, links to tool developers' help pages, and examples.
<br /><br />
The long term plan is also to have a [wiki page for each widely installed tool](/src/Tools/index.md) in Galaxy. These pages will hold supplementary information about both using the tools and setting them up. However, we haven't set that up yet.

In the meantime, for some tools there is also additional information available on this wiki:
* [Interval Operations](/src/Learn/Interval Operations/index.md) - Help on tools that operate on *genomic intervals*.
* [UCSC Galaxy Integration](/src/Learn/UCSC Galaxy Integration/index.md)
* [Share](/src/Learn/Share/index.md) - How to share your Galaxy objects with others.
* [FTP Upload](/src/FTPUpload/index.md) - Having problems loading larger (>2MB) files into [Main](/src/Main/index.md)? Watch the video **[Get Data: Upload File](http://vimeo.com/galaxyproject/upload)** to see exactly how.
* [Uploading and Analyzing Genotype Data in Plink Format](/src/Learn/Uploading and Analyzing Genotype Data in Plink Format/index.md)

## Visualization

<div class='right'> <a href='/src/Learn/Visualization/index.md'><img src="/src/viz/histogram.png" alt="Visualization" width="300" /></a></div>
Galaxy incorporates a [track browser](/src/Learn/Visualization/index.md). This can be used to visualize genomic data within Galaxy in a tightly integrated way. The browser also currently supports (and aims to support maximally) *visual analytics*, where visualization is used iteratively to provide feedback on analysis.  See [Visualization](/src/Learn/Visualization/index.md) for more. Additionally, Galaxy enables you to create bar diagrams, pie charts, scatter plots and other visualizations using the Charts plugin. See [Galaxy Charts](/src/Learn/Visualization/Charts/index.md) for more. Finally, custom visualizations developed by the user community are available [here](/src/Learn/Visualization/Custom/index.md).

{{> Support/LinkBox }}
## User Accounts

<div class='right'>![](/src/Learn/UserDropDown.png)</div>
Galaxy user accounts are simple to create (email, password, user name and go!). An account is not required to access the Galaxy public [Main](/src/Main/index.md) or [Test](/src/Test/index.md) instances, but if used, the data quota is increased and full functionality across sessions opens up, such as naming, saving, sharing, and publishing Galaxy objects (Histories, Workflows, Datasets, Pages).

* **[Accounts on Main](http://vimeo.com/galaxyproject/accounts)** - registration how-to video
* [User Accounts](/src/Learn/User Accounts/index.md)
* [OpenID Login](/src/Learn/OpenID Login/index.md)
* [Security Features](/src/Learn/Security Features/index.md)

## Other

* [Choices](/src/BigPicture/Choices/index.md) - The Galaxy [Main](/src/Main/index.md) server is not your only choice for using Galaxy.
* [Interactive Poster](/src/Learn/Interactive Poster/index.md)
* [Admin](/src/Admin/index.md) - How to *administer* your own Galaxy instance

<div class='center'>
<a href='http://galaxyproject.org/search/usegalaxy'><img src="/src/images/Logos/UseGalaxySearch.png" alt="Search all "using" Galaxy resources" width="120" /></a>

[Search all "using Galaxy" resources](http://galaxyproject.org/search/usegalaxy)
</div>
