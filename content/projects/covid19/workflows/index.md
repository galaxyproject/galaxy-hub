---
title: "Workflows"
description: "Workflows used by Galaxy effort"
components: true
autotoc: false
---

## Overview

-----

Here is the info to get you started quickly:

- We are maintaining six [<kbd>workflows</kbd>](#workflows-for-discovery-of-sequence-variants) for different sequencing platforms (Illumina or Oxford Nanopore) and library preparation strategies (Ampliconic or Metatranscriptomic).
- All workflows can be used to analyze any number of samples.
- All workflows can be used right now on any of our global instances in EU (https://usegalaxy.eu), US (https://usegalaxy.org), or Australia (https://usegalaxy.org.au) via Galaxy's graphical user interface as shown in this [<kbd>tutorial</kbd>](https://training.galaxyproject.org/training-material/topics/variant-analysis/tutorials/sars-cov-2-variant-discovery/tutorial.html).
- All workflows can also be accessed programmatically by either submitting a list of accession numbers to our [<kbd>Request an analysis</kbd>](https://github.com/usegalaxy-eu/sars-cov-2-processing-requests) service or via Galaxy's API for [<kbd>automatically</kbd>](https://github.com/usegalaxy-eu/ena-cog-uk-wfs) triggered analyses.
- We provide [powerful](#graph) computational infrastructure for data analysis supported by national supercomputing resources in the US, EU, and Australia. 


## Workflows for discovery of sequence variants

-----

We developed a number of workflows for the analysis of SARS-CoV-2 sequencing data. The workflows are available from [WorkflowHub](https://workflowhub.eu/projects/33/workflows?filter%5Btag%5D=covid-19&filter%5Bworkflow_type%5D=galaxy) in the EU and [DockStore](https://dockstore.org/organizations/iwc/collections/Covid) in the US. Workflows listed in the table below were specifically designed for identifying sequence variants from SARS-CoV-2 raw read datasets and for reporting them in tabular formats and/or as a viral consensus sequence:


| Link | Workflow |  Inputs | Outputs | Aligner | Caller | 
|---|--------|-------|--------|--------------|-----------------|
| [WorkFlowHub](https://workflowhub.eu/workflows/110)<br>[DockStore](https://dockstore.org/api/ga4gh/trs/v2/tools/%23workflow%2Fgithub.com%2Fiwc-workflows%2Fsars-cov-2-pe-illumina-artic-variant-calling%2FCOVID-19-PE-ARTIC-ILLUMINA/versions/main/plain-GXFORMAT2/descriptor//pe-artic-variation.ga)| **Illumina ARTIC**:<br> Variant analysis from ampliconic data produced with ARTIC protocol v1, v2, v3, or v4, or any alternative primer scheme.<br><span class="badge badge-danger">ILL-AMP</span>          | 1. Paired reads [`fastqsanger`]<br>2. SARS-CoV-2 reference [`fasta`]<br>3. Primer coordinates [`bed`]<br>4. Primer pairs table [`tsv`]  | Variants [`vcf`] | `BWA MEM` | `lofreq` |
| [WorkFlowHub](https://workflowhub.eu/workflows/111)<br>[DockStore](https://dockstore.org/api/ga4gh/trs/v2/tools/%23workflow%2Fgithub.com%2Fiwc-workflows%2Fsars-cov-2-ont-artic-variant-calling%2FCOVID-19-ARTIC-ONT/versions/main/plain-GXFORMAT2/descriptor//ont-artic-variation.ga)               |**Oxford Nanopore ARTIC**:<br> Variant analysis from ampliconic data produced with ARTIC protocol v1, v2, v3, or v4, or any alternative primer scheme.<br><span class="badge badge-secondary">ONT-AMP</span> | 1. Reads [`fastqsanger`]<br>2. SARS-CoV-2 reference   [`fasta`]<br>3. Primer coordinates [`bed`] | Variants [`vcf`] | `minimap2` | `medaka` |
| [WorkFlowHub](https://workflowhub.eu/workflows/113)<br>[DockStore](https://dockstore.org/api/ga4gh/trs/v2/tools/%23workflow%2Fgithub.com%2Fiwc-workflows%2Fsars-cov-2-pe-illumina-wgs-variant-calling%2FCOVID-19-PE-WGS-ILLUMINA/versions/main/plain-GXFORMAT2/descriptor//pe-wgs-variation.ga)      |**Illumina metatranscriptomic PE**:<br> Variant analysis from metatranscriptomic data.<br><span class="badge badge-success">ILL-MT-PE</span>                               | 1. Paired reads [`fastqsanger`]<br>2. SARS-CoV-2 reference   [`fasta`] | Variants [`vcf`] | `BWA MEM` | `lofreq` |
| [WorkFlowHub](https://workflowhub.eu/workflows/112)<br>[DockStore](https://dockstore.org/api/ga4gh/trs/v2/tools/%23workflow%2Fgithub.com%2Fiwc-workflows%2Fsars-cov-2-se-illumina-wgs-variant-calling%2FCOVID-19-SE-WGS-ILLUMINA/versions/main/plain-GXFORMAT2/descriptor//se-wgs-variation.ga)      |**Illumina metatranscriptomic SE**:<br> Variant analysis from metatranscriptomic data.<br><span class="badge badge-warning">ILL-MT-SE</span>                               | 1. Reads [`fastqsanger`]<br>2. SARS-CoV-2 reference   [`fasta`] | Variants [`vcf`]| `BWA MEM` | `lofreq` |
| [WorkFlowHub](https://workflowhub.eu/workflows/109)<br>[DockStore](https://dockstore.org/api/ga4gh/trs/v2/tools/%23workflow%2Fgithub.com%2Fiwc-workflows%2Fsars-cov-2-variation-reporting%2FCOVID-19-VARIATION-REPORTING/versions/main/plain-GXFORMAT2/descriptor//variation-reporting.ga)           |**Report generation**:<br> Generation of final variant analysis reports/plots.<br><span class="badge badge-info">REPORTING</span>                                                 | 1. Variants [`vcf`]<br>2. Gene name [translation table](https://doi.org/10.5281/zenodo.4555734) [`tsv`]  | Reports [`tsv`], overview [`svg`] | - | - | 
| [WorkFlowHub](https://workflowhub.eu/workflows/138)<br>[DockStore](https://dockstore.org/api/ga4gh/trs/v2/tools/%23workflow%2Fgithub.com%2Fiwc-workflows%2Fsars-cov-2-consensus-from-variation%2FCOVID-19-CONSENSUS-CONSTRUCTION/versions/main/plain-GXFORMAT2/descriptor//consensus-from-variation.ga)           |**Consensus construction**:<br> Generation of sample consensus sequences.<br><span class="badge badge-info">CONSENSUS</span>                                                 | 1. Variants [`vcf`]<br>2. SARS-CoV-2 reference [`fasta`]<br>3. Mapped reads [`bam`] | Consensus [`fasta`]] | - | - |
 
 `vcf` = variant call format; `tsv` = TAB-separated values; `svg` = scalable vector graphics; `fastqsanger` = fastq format with Sanger encoding of base quality values; `bed` = browser extensible format; `bam` = sequence alignment/map format, BGZF-compressed

The following <a href="https://training.galaxyproject.org/training-material/topics/variant-analysis/tutorials/sars-cov-2-variant-discovery/tutorial.html#from-fastq-to-annotated-allelic-variants">tutorial</a> explains how to import workflows into your Galaxy instance.


## Which workflow do I use?

------

<!-- Workflow badges
<span class="badge badge-danger">ILL-AMP</span>
<span class="badge badge-secondary">ONT-AMP</span>
<span class="badge badge-success">ILL-MT-PE</span>
<span class="badge badge-warning">ILL-MT-SE</span>  
-->

Each of the four variant calling workflows from the table above is designed to be usable together with the reporting and consensus workflows. The table below shows which workflows to use for a full analysis depending on the combination of library prep and sequencing platform:

| &#8595;  Library Prep / Platform<sup>1</sup> &#8594; | Illumina | ONT |
|------------------------------------------|----------|-----|
| Ampliconic                               | <span class="badge badge-danger">ILL-AMP</span> + <span class="badge badge-info">REPORTING</span> + <span class="badge badge-info">CONSENSUS/span>  | <span class="badge badge-secondary">ONT-AMP</span> + <span class="badge badge-info">REPORTING</span> + <span class="badge badge-info">CONSENSUS/span> |
| Metatranscriptomic |(<span class="badge badge-success">ILL-MT-PE</span> or <span class="badge badge-warning">ILL-MT-SE</span>) + <span class="badge badge-info">REPORTING</span> + <span class="badge badge-info">CONSENSUS/span> | -<sup>2</sup>|
<sup>1</sup> - there is an increasing number of PacBio data. Our workflows can be easily adapted for these data as well. Use **OPEN CHAT** below to let us know. <sup>2</sup> - this conceptually is identical to <span class="badge badge-warning">ILL-MT-SE</span> except for replacing the mapper with `minimap2` and the variant caller with `medaka` 


## How do I use it and where do I run my analyses?

------

This depends on who you are. If you are:

| You are a ... | Where do you start ... |
|----------|-----------------------|
| **Biomedical researcher** | Use any of the three global Galaxy instances in EU (https://usegalaxy.eu), US (https://usegalaxy.org), or Australia (https://usegalaxy.org.au). Take a look at the following tutorial to begin: [Mutation calling, viral genome reconstruction and lineage/clade assignment from SARS-CoV-2 sequencing data](https://training.galaxyproject.org/training-material/topics/variant-analysis/tutorials/sars-cov-2-variant-discovery/tutorial.html) - a [Galaxy Training Network](https://training.galaxyproject.org/training-material/) Tutorial. |
| **Bioinformatician or data scientist** | You have two options: <ol> <li>**Option 1**: Use our ["Request an analysis"](https://github.com/usegalaxy-eu/sars-cov-2-processing-requests) service to submit a list of datasets to us and trigger automated analyses.</li> <li>**Option 2**: Configuring your own Galaxy instance to [automatically](https://github.com/usegalaxy-eu/ena-cog-uk-wfs) trigger the analyses. Use this option if you run your own Galaxy installation</li> </ol> | 

These analysis capabilities are supported by public computational infrastructure provided by the [XSEDE](https://www.xsede.org) consortium in the US, the [deNBI](https://www.denbi.de) and [ELIXIR](https://elixir-europe.org) consortia in the EU, and [Nectar Cloud](https://ardc.edu.au/services/nectar-research-cloud/) in Australia. The figure below illustrates current processing times (in EU) for analysis of SARS-CoV-2 data. You can see that most analyses complete within a 1-2 hour interval.


<div class="shadow-sm p-3 mb-5 bg-light rounded" id="graph" align="center">
    <vega-embed align="center" spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/run_times.json"/>
</div>
