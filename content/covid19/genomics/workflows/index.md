---
title: "Workflows"
description: "Workflows used by Galaxy effort"
components: true
autotoc: false
---

## Workflows for discovery of sequence variants

<div class="compact">

| Link | Workflow |  Input | Output | Read aligner | Variant caller | 
|---|--------|-------|--------|--------------|-----------------|
| [WorkFlowHub](https://workflowhub.eu/workflows/110)<br>[DockStore](https://dockstore.org/api/ga4gh/trs/v2/tools/%23workflow%2Fgithub.com%2Fiwc-workflows%2Fsars-cov-2-pe-illumina-artic-variant-calling%2FCOVID-19-PE-ARTIC-ILLUMINA/versions/main/plain-GXFORMAT2/descriptor//pe-artic-variation.ga)| **Illumina ARTIC**:<br> Variant analysis from ampliconic data produced with ARTIC protocol v1, v2, v3, or v4.        | 1. Paired reads [`fastqsanger`]<br>2. SARS-CoV-2  [`fasta`]<br>3. ARTIC primer coordinates [`bed`]<br>4. ARTIC pairs table [`tsv`]  | VCF files | `BWA MEM` | `lofreq` |
| [WorkFlowHub](https://workflowhub.eu/workflows/111)<br>[DockStore](https://dockstore.org/api/ga4gh/trs/v2/tools/%23workflow%2Fgithub.com%2Fiwc-workflows%2Fsars-cov-2-ont-artic-variant-calling%2FCOVID-19-ARTIC-ONT/versions/main/plain-GXFORMAT2/descriptor//ont-artic-variation.ga)|**Oxford Nanopore ARTIC**:<br> Variant analysis from ampliconic data produced with ARTIC protocol v1, v2, v3, or v4. | 1. Reads [`fastqsanger`]<br>2. SARS-CoV-2  [`fasta`]<br>3. ARTIC primer coordinates [`bed`]<br>4. ARTIC pairs table [`tsv`]  | VCF files | `minimap2` | `medaka` |
| [WorkFlowHub](https://workflowhub.eu/workflows/113)<br>[DockStore](https://dockstore.org/api/ga4gh/trs/v2/tools/%23workflow%2Fgithub.com%2Fiwc-workflows%2Fsars-cov-2-pe-illumina-wgs-variant-calling%2FCOVID-19-PE-WGS-ILLUMINA/versions/main/plain-GXFORMAT2/descriptor//pe-wgs-variation.ga)|**Illumina metatranscriptomic PE**:<br> Variant analysis from metatranscriptomic data.                              | 1. Paired reads [`fastqsanger`]<br>2. SARS-CoV-2  [`fasta`] | VCF files | `minimap2` | `medaka` |
| [WorkFlowHub](https://workflowhub.eu/workflows/112)<br>[DockStore](https://dockstore.org/api/ga4gh/trs/v2/tools/%23workflow%2Fgithub.com%2Fiwc-workflows%2Fsars-cov-2-se-illumina-wgs-variant-calling%2FCOVID-19-SE-WGS-ILLUMINA/versions/main/plain-GXFORMAT2/descriptor//se-wgs-variation.ga)|**Illumina metatranscriptomic SE**:<br> Variant analysis from metatranscriptomic data.                               | 1. Reads [`fastqsanger`]<br>2. SARS-CoV-2  [`fasta`] | VCF files | `minimap2` | `medaka` |
| [WorkFlowHub](https://workflowhub.eu/workflows/109)<br>[DockStore](https://dockstore.org/api/ga4gh/trs/v2/tools/%23workflow%2Fgithub.com%2Fiwc-workflows%2Fsars-cov-2-variation-reporting%2FCOVID-19-VARIATION-REPORTING/versions/main/plain-GXFORMAT2/descriptor//variation-reporting.ga)|**Report generation**:<br> Generation of final variant analysis report.                                              | 1. Variants [`VCF`]<br>2. Gene name [translation table](https://zenodo.org/record/4555735) [`tsv`]  | Reports by variant and by sample [`tsv`] and graphical representation [`svg`] | - | - | 
 
 </div>

The following <a href="https://training.galaxyproject.org/training-material/topics/variant-analysis/tutorials/sars-cov-2-variant-discovery/tutorial.html#from-fastq-to-annotated-allelic-variants">tutorial</a> explains how to import workflows into your Galaxy instance.
</div>


## How do I use it?


There are three ways to use our workflows:

1. Through any of the three main Galaxy instances &larr; this option uses Galaxy's Graphical User Interface (GUI) and suitable for any biomedical researcher.
2. Using our ["Request an analysis"](https://github.com/usegalaxy-eu/sars-cov-2-processing-requests) service &larr; to use this option you simply submit a list of datasets to us and we will trigger automated analyses.
3. By configuring your own Galaxy instance to [automatically](https://github.com/usegalaxy-eu/ena-cog-uk-wfs) trigger the analyses &larr; use this option if you run your own Galaxy installation.

<div class="custom-block tip">
	Instructions for the first option are detailed below. To learn about options 2 and 3, click the links above.
</div>

The workflows accept raw [fastq](https://en.wikipedia.org/wiki/FASTQ_format) reads as input. They can be run on either of the three global Galaxy instances:

 - Galaxy North America ([https://usegalaxy.org](https://usegalaxy.org))
 - Galaxy Europe ([https://usegalaxy.eu](https://usegalaxy.eu))
 - Galaxy Australia ([https://usegalaxy.org.au](https://usegalaxy.org.au))

Pick one closest to you and create an account. Now you are ready to start the analysis.

<div class="custom-block warning">
	If you don't have fastq datasets but have accession numbers or links to the data see <a href="#upload-your-data">these videos</a>.
</div>


### Import History with an auxiliary datasets

Import Galaxy history with auxiliary datasets. This will be your workspace. Depending on which Galaxy instance you have chosen (US, EU, or AU) and what kind of analysis you need to do (RNAseq or Ampliconic) click on a corresponding link in the table below:

| &#8595; Type of data / Galaxy instance &#8594; | North America | Europe | Australia |
|------------------------------------------------|----|----|----|
| ARTIC v3    | [![](https://img.shields.io/badge/ARTIC-Import-green)](https://usegalaxy.org/u/aun1/h/artic-v3) | [![](https://img.shields.io/badge/ARTIC-Import-green)](https://usegalaxy.eu/u/nekrut/h/artic-v3) | [![](https://img.shields.io/badge/ARTIC-Import-green)](https://usegalaxy.org.au/u/nekrut/h/artic-v3) |
| RNAseq      | [![](https://img.shields.io/badge/WGS-Import-green)](https://usegalaxy.org/u/aun1/h/rnaseq)   | [![](https://img.shields.io/badge/WGS-Import-green)](https://usegalaxy.eu/u/nekrut/h/rnaseq)   | [![](https://img.shields.io/badge/WGS-Import-green)](https://usegalaxy.org.au/u/nekrut/h/rnaseq)   |

You will see the history outline. Click on the <kbd>+</kbd> button to import the history into your account and start an analysis.

<div class="custom-block tip">

How to import history:

<!-- ![](./history_import_gif.gif) -->

</div>

These auxiliary histories contain SARS-CoV-2 reference and gene name aliases (to give gene regions easily recognizable names). In addition, ARTIC histories contain two datasets describing the ARTIC primer scheme.

### Upload your data

Before you can begin any Galaxy analysis, you need to upload the data. Here are your choices for doing this. Depending of how many datasets and what their origin is, you can do the following:

| Few datasets<br><small>(1-10)</small>  | Many datasets<br><small>(10-&#8734;)</small> | Import from [SRA](https://www.ncbi.nlm.nih.gov/sra) |
|-----|------|------|
| <iframe width="140" height="79" src="https://www.youtube.com/embed/FFCDx1rMGAQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> | <iframe width="140" height="79" src="https://www.youtube.com/embed/hC8KSuT_OP8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> | <iframe width="140" height="79" src="https://www.youtube.com/embed/Q4t-beYZ-do" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> | 

### Organize your data into a collection

Collections are a way to represent arbitrarily large sets of samples as a single entity, thus making downstream analysis very convenient.

<div class="custom-block tip">If you uploaded data from SRA, it will already be organized as a collection! Go to the next step.</div>

The following video shows how to create a single or paired collection depending on the type of data you have:

| Type of collection | A very short demo |
|-------------------|------|
| Paired (Illumina data) | <iframe width="140" height="79" src="https://www.youtube.com/embed/6toVj35q1r0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> |
| Single (Illumina or ONT data) | <iframe width="140" height="79" src="https://www.youtube.com/embed/6ZU9hFjnRDo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> | 

