{{> Events/GCCBOSC2018/Header }}

# Nominate a training topic!

**[Nominate a training topic Now](http://bit.ly/gccbosc2018-tr-nom)**

The joint [2018 Galaxy Community and Bioinformatics Open Source Conferences](https://gccbosc2018.sched.com/) start with training and *the training topics that will be offered **are determined by you***. Please take a few minutes to consider which training topics you would like to see offered at GCCBOSC2018. Any topics of interest to these communities can be nominated. 

[GCCBOSC2018](https://gccbosc2018.sched.com/) will be held 25-30 June in Portland, Oregon, United States. It will feature two days of training: the second of which is multi-track and will feature content for both the BOSC and Galaxy communities.  

Nominated topics can cover a wide range. For example:

- How to use open source software using just a web browser (e.g., Intro to Using Galaxy) 
- How to use software packages (The Newbie's Guide to BioRuby)
- Advanced applications of software (Genome Assembly with Galaxy, or Proteomics with BioPython)
- Software installation and configuration (Tool Wrapping for Galaxy, or Using CloudLaunch)
- Open source community (Building a Curation Community using Apollo, or Training using the Galaxy Training Network)

These are only examples.  If you think the communities would be interested in a topic, then please  [nominate it](http://bit.ly/gccbosc2018-tr-nom)!

Nominated topics will be published on this page as they come in.

**Topic Nominations close January 7.** Topics will be compiled into a uniform list by the GCCBOSC2018 organizers, and then voted on by the community starting one week later.

# Nominated Topics

Topics are posted here as they are nominated.  If you see a topic with a brief description that you would like to expand on then please send an email to outreach@galaxyproject.org.

As of January 6, 2018 these topics have been nominated:

## 8. Hi-C analysis in Galaxy

This session will introduce the basics of chromosome conformation capture assays and their applications, followed by best practices in mapping, QC'ing, visualazing and assigning 'topological associated domains' with Hi-C data.

**Prerequisites**

* Understanding of chromosome conformation capture (3C) and variants (HiC, 5C, 4C). Understanding of Illumina based "NGS".
* Understanding of Galaxy user interface.

## 7. Handling integrated biological data using Python (or R) and InterMine

This tutorial will guide you through loading and analyzing integrated biological data (generally genomic or proteomic) in [InterMine](http://intermine.org/) via an API in Python or R. Topics covered will include automatically generating code to perform queries, customising the code to meet your needs, and automated analysis of sets, e.g gene sets, including enrichment statistics. Skills gained can be re-used in any of the dozens of InterMines available, covering a broad range of organisms and dedicated purposes, from model organisms to plants, drug targets, and mitochondrial DNA.

**Prerequisites**

* Basic Python or R skills are advantageous but not required. 
* A laptop with wifi and Python or R Studio.

## 6. Deploying (Galaxy and your) applications into clouds

This tutorial will have two parts. Part 1 will demonstrate how to use the all-new CloudLaunch service to launch and manage instances of Galaxy on the Cloud on multiple cloud providers. In part 2, we will cover the technical process of adding custom applications into CloudLaunch and making them available for launching on any supported cloud (AWS, Azure, GCE, OpenStack). This part will also cover use of the CloudLaunch API, enabling external applications to leverage CloudLaunch capabilities.

**Prerequisites**

* Part 1: a laptop with WiFi and a modern browser
* Part 2: Basic programming skills (Python, Angular 2/4/5 useful but not essential?)


## 5. ChIPseq analysis using deepTools and MACS2

Did my IP work? Where is my signal? How well do my replicates correlate? What might my peaks even look like? Where are my peaks (or signal) in relationship to transcription start sites (or other features)? These are common questions that biologists first pose when dealing with ChIPseq data. We will use deepTools and MACS within Galaxy to demonstrate effective methods of

1. performing ChIPseq-specific quality control,
2. calling peaks and
3. visualising signal and peak enrichment around genes or other features."	"

**Prerequisites**

- Galaxy 101 or equivalent experience.
- Ideally participants will already be familiar with generic NGS quality control and read mapping, since those won't be covered
- A wi-fi enabled laptop with a modern web browser. Google Chrome, Firefox and Safari will work best. "

## 4. How to analyze microbiota data with Galaxy

The study of complex microorganism communities has been eased by the development of sequencing platforms and dedicated powerful bioinformatics tools. Several tools have recently been integrated into Galaxy for microbiota data analysis: Mothur, QIIME, MetaPhlAN, HUMAnN, FROGS, MEGAHIT, MetaSPAdes,...

In this training, we will show in this training how to analyze metagenomic and amplicon data inside Galaxy:

- Extraction of the OTUs using [QIIME](http://qiime.org/)/[Mothur](https://www.mothur.org/)
- Reconstruction of the taxonomic composition of a sample without OTUs using [MetaPhlAn](http://huttenhower.sph.harvard.edu/metaphlan2)
- Find the metabolic functions realized in an environment using [HUMAnN](https://huttenhower.sph.harvard.edu/humann)

**Prerequisites**

* Galaxy 101 or equivalent experience
* Ideally participants will already be familiar with the concepts behind metagenomics (e.g., OTU)
* A wi-fi enabled laptop with a modern web browser. Google Chrome, Firefox and Safari will work best

## 3. Bioinformatics Training and Education with the Galaxy Training Network

Galaxy with its flexibility, reproducibility, and scalability is an ideal environment for teaching and training diverse scientific topics. 

The Galaxy Training Network is a community initiative dedicated to high-quality Galaxy-based training around the world. One of its objectives is to support trainers with complete training material and recommendations about bioinformatics training. Templates and best training practices were defined to help trainers create new material, unify the different material, and make training materials more accessible and easy for users to learn and for teachers to teach (https://training.galaxyproject.org).

This workshop will introduce participants to the infrastructure of the GTN training materials and describe how to generate training materials following best practices. Participants will be introduced to the generation Galaxy Interactive Tours and the creation of Docker Flavors dedicated to teaching and training sessions. The workshop will also cover best practices for running Galaxy-based workshops (how to plan a training session based on number of attendees, time constraints, resource availability, etc).

**Prerequisites**

* Basic familiarity with using Galaxy (how to import datasets and run tools)
* Basic familiarity with git and Docker will also be helpful for parts of the workshop.
* A wi-fi enabled laptop with a modern web browser. Google Chrome or Firefox will work best.


## 2. Practical use of the Galaxy API command line tools

How to use the Galaxy [API](https://galaxyproject.org/develop/api/) to automate workflows.

Galaxy has an always-growing API that allows for external programs to upload and download data, manage histories and datasets, run tools and workflows, and even perform admin tasks. This session will cover various approaches to access the API, in particular using the [BioBlend Python library](https://bioblend.readthedocs.io/en/latest/).

**Prerequisites**

* Unix command line
* Basic understanding of Galaxy from a developer point of view.
* Python programming.
* A wi-fi enabled laptop with a modern web browser. Google Chrome, Firefox and Safari will work best.

## 1. The Galaxy Database Schema

Running a production Galaxy server, you some times end up in a situation, where you manually need to interact with the database, e.g. you want to extract usage information, which can not be gathered from the built in reports tool. Or, a more  risky adventure: you need to change the state of a job to 'error'. For both cases, you require a good understanding of the Galaxy database schema. In this training session, you will learn some of the design concepts of the database, and how to extract (or if necessary change) information useful for a Galaxy admin.	Experience maintaining a production Galaxy server and a basic knowledge of relational databases and SQL statements.

**Prerequisites**

* Experience maintaining a production Galaxy server and a basic knowledge of relational databases and SQL statements

# Nominations in Progress


## Genome-wide sgRNA screen analysis using GALAXY

Identify sgRNAs enriched in a screen with specific treatment.  Raw data processing, mapping, MAGeCK-VISPR.

## GATK4

Training and presentations on the new version of GATK.


## Open workflow languages

Hands on with CWL/WDL and jobrunners.


## Command line workflow management systems: Snakemake, Cluster Flow, Bpipe

How to use workflow management systems that are designed for the command line, such as [Snakemake](http://snakemake.readthedocs.io/en/stable/), [Cluster Flow](http://clusterflow.io/), and [Bpipe](https://github.com/ssadedin/bpipe#welcome-to-bpipe--).

**Prerequisites**

* Linux command line experience

## Analysis of scRNA sequencing data

How to analyze single cell RNA sequencing data, e.g. in [cellranger](https://support.10xgenomics.com/single-cell-gene-expression/software/pipelines/latest/what-is-cell-ranger) or with dedicated R packages

