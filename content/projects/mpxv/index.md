---
description: "Open source tools and public cyberinfrastructure for analysis of MonkeyPox data"
autotoc: false
title: "GalaxyProject MPXV analysis effort"
---

## Overview

-----

Here is the info to get you started quickly:

- We have two [<kbd>workflows</kbd>](#workflows-for-discovery-of-sequence-variants) for analysis of Illumina data (Oxford nanopore workflows can also be added. Request [here](https://help.galaxyproject.org)).
- Wokflows can be used to analyze any number of samples.
- Workflows can be used via graphical user interface right now on any of our global instances in EU (https://usegalaxy.eu), US (https://usegalaxy.org), or Australia (https://usegalaxy.org.au). 
- We provide powerful computational infrastructure for data analysis supported by national supercomputing resources in the US, EU, and Australia. 


## Workflows for discovery of sequence variants

-----

We developed two workflows for the analysis of MPXV sequencing data. The workflows are available from [WorkflowHub](https://workflowhub.eu/). 


| Link | Workflow |  Inputs | Outputs | Aligner | Caller | 
|---|--------|-------|--------|--------------|-----------------|
| [WorkFlowHub](https://workflowhub.eu/workflows/353)      |**Illumina metatranscriptomic PE**:<br> Variant analysis from metatranscriptomic data.<br><span class="badge badge-success">ILL-PE</span>                               | 1. Paired reads [`fastqsanger`]<br>2. MPXV reference   [[`genbank`](https://www.ncbi.nlm.nih.gov/nuccore/MT903340)] | Variants [`vcf`] | `BWA MEM` | `lofreq` |
| [WorkFlowHub](https://workflowhub.eu/workflows/354)           |**Report generation**:<br> Generation of final variant analysis reports/plots.<br><span class="badge badge-info">REPORTING</span>                                                 | Variants [`vcf`] | Reports [`tsv`] | - | - | 
 
 `vcf` = variant call format, `tsv` = TAB-separated values, `fastqsanger` = fastq format with Sanger encoding of base quality values

Workflows are designed to be used one after another:

1. Run the <span class="badge badge-success">ILL-PE</span> to generate lists of variants
2. Run the <span class="badge badge-info">REPORTING</span> workflows on varinats generated above to produce variant tables. 

The following <a href="https://training.galaxyproject.org/training-material/topics/variant-analysis/tutorials/sars-cov-2-variant-discovery/tutorial.html#from-fastq-to-annotated-allelic-variants">tutorial</a> explains how to import workflows into your Galaxy instance.


