{{> Events/GCC2019/Header }}

# Training at GCC2019

Training on a wide range of topics will be offered before *and during* the GCC2019 meeting.

**Training topics are determined by the community via a [nomination](https://docs.google.com/forms/d/1fBPjEmw7Td52rhBnC0SvflnQCD7Ue5IMJ9RkM0SjnYg/) and voting process. The topic nomination deadline has been extended to 15 January.**


# Training Topic Nominations

Nominated topics can cover a wide range. For example:
- Introduction to Using Galaxy
- Scientific topic oriented trainings
- Community specific trainings
- Development and administration around Galaxy
- Train the trainers

This list only shows some examples. If you think the communities would be interested in a topic, then please nominate it!  And if you are looking for ideas, see the topic nominated in: [2016](bit.ly/gcc2016noms), [2015](bit.ly/gcc2015vote), [2014](bit.ly/1s6NtMN), [2013]( bit.ly/1i2j1gN) and the [Galaxy Events page](galaxyproject.org/events/).

[Training topic nomination](https://docs.google.com/forms/d/1fBPjEmw7Td52rhBnC0SvflnQCD7Ue5IMJ9RkM0SjnYg/) is open from **December, 1st** to **December, 31**. Topics will be compiled by the GCC2017 Organizing Committee, and voted on by the Galaxy Community from **January, 15th** to **January, 31st**.

Topics will then be selected and scheduled based on topic interest, and the organisers' ability to confirm instructors for each session. Some very popular sessions may be scheduled more than once. The final schedule will be posted before registration opens.

**[Nominate a topic now](https://docs.google.com/forms/d/1fBPjEmw7Td52rhBnC0SvflnQCD7Ue5IMJ9RkM0SjnYg/).**

Here are the topics that have been nominated as of 4 January:

## CLIP-Seq data analysis from pre-processing to motif detection

- Introduction to CLIP-Seq (What is CLIP-Seq? Why is it important? What are the standard protocols?).
- Data Analysis:
  1. Remove Adapters, Barcodes and Unique Molecular Identifiers (UMIs) from the reads,
  1. Align trimmed reads with STAR,
  1. De-duplicate the read library,
  1. Inspect the read mapping and de-duplication quality, Perform peak calling,
  1. Analyse the peaks and find potential binding motifs and targets,
  1. Check the quality of the peak calling.
- Final evaluation and summary of the data analysis.

**Prerequisites**

- Slight biological background (you should know what proteins, RNA and DNA is).

## Population Genomics

- Use of Radseq, Genotyping by sequencing and similar data for analysis of populations, effects of selection, phylogeography studies

**Prerequisites**

- Basic Galaxy and genomics data analysis


## Genomic assembly and data analysis in Galaxy with Nanopore ONT long read sequencing

- The session would cover an introduction long read sequencing with technologies like Oxford Nanopore. Followed by presenting tools in Galaxy to
  - quality control of reads,
  - description of best practices to perform genome assembly from long reads or hybrid long-short reads,
  - determine and plot the structure of genome
  - application use-cases such as determining antimicrobial resistance genes from the data

**Prerequisites**

- Basic understanding of Genomics

## Analysis of bacterial genomes

- Assembly and annotation of bacterial genomes: Antibiotics resistance predictions, Virulence genes, Insertion sequences, Phages/prophages and Plasmid profiling

**Prerequisites**

- Introduction to Galaxy

## Alternative splicing

- Qualitative and quantitative analysis of alternative splice variants. Special emphasis on reliability of predictions and quantifications. Comparison of different approaches: e.g. Stringtie, Cufflinks, kallisto-sleuth, MISO, SpliceSeq, ... Some tools might be outside of Galaxy.

**Prerequisites**

- Introduction to Galaxy.

## Scripting Galaxy through BioBlend

-

**Prerequisites**

- Participants should have some experience programming in Python, and maybe a running Docker Galaxy instance on their laptops


## RNA Workbench

- *The RNA Workbench:* best practices for RNA and high-throughput sequencing bioinformatics in Galaxy

**Prerequisites**

- Introduction to Galaxy.

## RNA Folding and Design

- *in silico* (using Galaxy) folding of RNA secondary structure and structure guided design of RNAs

**Prerequisites**

- Introduction to Galaxy.

## Using Galaxy for bridging WGS and Clinical Genetic Diagnostics

As WGS price dropped below 1k USD the usage of WGS became a reality for clinical genetic diagnostics. On the other hand several laboratories of clinical genetic diagnostics have set up their data analysis environments based on the Exome-Seq specifications. Galaxy can be used to provide a smooth transition from Exome Seq data analysis to WGS by performing the first steps of data analysis on remote servers and transfering to the diagnostic lab the vcf file. Moreover these standard analysis pipelines could be accessed directly by the clinical diagnostic staff and could be connected to the local EGA repositories for immediate achieving of the generated datasets. Galaxy container technology would allow the maximal reproducibility and safety of these processes. In our session we will focus on presenting the typical diagnostic environment, , diagnostic requirements, and the ethical and legal aspects to be taken into consideration when dealing with clinical diagnostic genomic data analysis.

**Prerequisites**

- Introduction to Galaxy.

## Running Galaxy on Kubernetes

Do technologies like Docker, Kubernetes, and Helm sound interesting? How about standardized, production-grade deployment of Galaxy with a single command, or no-downtime configuration changes? In this training we will take a look at the basics of Helm and Kubernetes, a Helm Chart for Galaxy, delve into how to set and change Galaxy deployment configurations, how to interface Galaxy jobs with Kubernetes, etc.

**Prerequisites**

- An understanding of Galaxy deployment requirements, comfortable on the command line, ideally, an understanding of container principles.

## Ecology

The Ecology session will introduce using Galaxy to import (from external sources as GBIF, iNaturalist, Atlas of Living Australia or Zenodo repositories), handle (filter, rename fields, search/replace text patterns), visualize (stacked histograms) and analyze (calculate species abundance, phenology and trends) biodiversity data.

**Prerequisites**

- Galaxy introduction training

## EWAS data analysis for population epigenetics integrated into Galaxy

Epigenetic aberrations which involve DNA modifications give researchers an interest to identify novel non-genetic factors responsible for complex human phenotypes such as height, weight, and disease. The goal of this session is to analyse differentially methylated regions in treatment resistant melanomas using Galaxy.

**Prerequisites**

- Introduction to Galaxy

## Metatranscriptomics & multi-omics microbiome analysis

* Introduction to Microbiome analysis and multiomics analysis.
* Metatranscriptomics analysis using ASaiM workflow.
* Generating metaproteins database for metaproteomics using Graph2Pro workflow.
* Using metagenomics inputs for ASaiM and Graph2Pro workflow.
* Metaproteomics workflow and quantitative functional microbiome analysis using metaQuantome

**Prerequisites**

* Basic knowledge and interest in microbiome analysis.
* Basic knowledge of use of Galaxy usage (Galaxy 101).

## Train the Galaxy Trainer

This workshop will introduce:

* using Galaxy as a training tool
* Determining aim and audience
    * e.g. single topic; string of related topics; 
    * e.g. response to specific request for training; or general upskilling people in Galaxy bioinformatics
* setting up appropriate infrastructure
    * usegalaxy.* resources
    * TIaaS
    * Your own
* The available materials
    * GTN tutorials
    * and/or write your own; including how to contribute it to GTN
    * Customising materials for your needs (Slides, language etc.)
* Distributed workshops
    * In practice
    * Local facilitators vs lead trainers
    * Using Zoom / Skype / other video conferencing software
* Practise setting up your own workshop?
    * eg. choose a topic from GTN
    * check that it runs on Galaxy server of choice
    * time it  // modify if need be (e.g. cut down data set more?)
    * create schedule, eg google doc -> publish -> tinyurl
* Getting good feedback!

**Prerequisites**

* An interest in using Galaxy to teach/train people

## Visualisation Development in Galaxy

In this age of high-throughput analysis and big data, visualisations have become an invaluable resource for the presentation and exploration of these often high-dimensional, complex, and large datasets.

While many tools in Galaxy produce static visual outputs (graphs, trees, etc), often some more interactivity is desired to aid in the exploration of these datasets. To support this need, Galaxy offers a range of visualisation options, such as Trackster for browsing genomic data and Charts for the interactive visualisation of tabular data and other datatypes.

In this workshop participants will learn how to develop such visualisations in Galaxy, more specifically: - Develop a module within the Charts visualisation plugin using Javascript - Develop a simple visualisation plugin from scratch

**Prerequisites**

* Basic understanding of Galaxy from a developer point of view.
* Some familiarity with Javascript.
* A wi-fi enabled laptop with a modern web browser. Google Chrome, Firefox and Safari will work best.
