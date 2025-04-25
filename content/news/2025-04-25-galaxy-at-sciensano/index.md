---
title: "Galaxy @ Sciensano: a comprehensive bioinformatics portal for genomics-based microbial typing, characterization, and outbreak detection"
date: "2025-04-25"
authors: Bert Bogaerts, Kevin Vanneste
tease: "Know How Sciensano harnesses Galaxy for Advanced Microbial Genomics, Precision Typing, and Rapid Outbreak Detection"
subsites: [global,eu,all]
main_subsite: eu
---

## Introduction
At Sciensano, the Belgian National Health institute, we have set up a user-friendly portal for bioinformatics analysis, built on the Galaxy platform. Galaxy is already well known for simplifying complex data analysis workflows, and we have tailored it to meet the specific needs of public health microbiology. A publication on this Galaxy instance was recently published in *BMC Genomics*.

The Galaxy @Sciensano instance is freely available for noncommercial use (https://galaxy.sciensano.be/) and supports both internal and external researchers. It provides a wide selection of tools from the ToolShed developed by the global Galaxy community, alongside more than 50 custom-built tools and pipelines developed in-house.

## Highlighted custom tools 
Our Galaxy instance emphasizes ease of use, robust traceability, and clear interpretation of analysis results. This is illustrated, for example, by the custom sequence typing tools that perform multi-locus sequence typing (MLST) and core-genome MLST (cgMLST). The output is provided as an easy to interpret HTML output report with key findings, as well as tabular output for automated processing. Biologically relevant information is presented in a clear, accessible format that uses color coding to highlight key details while minimizing irrelevant technical information. The reports are interactive and include hyperlinks to other resources such as PubMLST or NCBI. A large number of MLST and cgMLST databases are provided, which are automatically updated every week. Allele calling can be performed using BLAST-, SRST2- or KMA-based detection.

The same general principle is followed in the other in-house developed tools such as gene detection, and the custom wrappers for NCBI AMRFinder+, CheckM, CheckV, etc. A complete overview of the custom tools and wrappers is provided in our publication.

## Pathogen characterization pipelines 
One of our main goals has been to reduce the technical barrier to high-quality analysis. To do this, we have developed a set of “push-button” pipelines, which are available as stand-alone tools in Galaxy. These pipelines start from raw data and perform full isolate characterization based on whole genome sequencing (WGS) data, including thorough quality control, de novo genome assembly, sequence typing, antimicrobial resistance detection, and other species-specific analyses. The pipeline requirements were set up in collaboration with experts from National Reference Laboratories and National Reference Centers to meet their needs. Analogous to the custom tools, the output is provided as interactive HTML report with key results. Several of these pipelines have been described in the peer review publications (see below).

A key feature of these pipelines is traceability which is facilitated by including key information such as pipeline versions, database versions, and tool versions and options in the various output files. This functionality was critical in obtaining accreditation for several of these workflows, along with extensive validation, some of which has been described in the peer-reviewed publications listed below. The following “push-button” pipelines are available:

- Enterococcus pipeline
- Klebsiella pipeline
- Listeria pipeline
- [Mycobacterium pipeline](https://pmc.ncbi.nlm.nih.gov/articles/PMC8316078/)
- [Neisseria pipeline](https://pmc.ncbi.nlm.nih.gov/articles/PMC6414443/)
- Salmonella pipeline
- Shigella pipeline
- Staphylococcus pipeline
- [Shiga-toxin producing Escherichia coli (STEC) pipeline](https://pmc.ncbi.nlm.nih.gov/articles/PMC8190621/)
- Yersinia pipeline
- Viral consensus pipeline (including characterization for Influenza A / B and SARS-CoV-2)

## Outbreak investigation
Determining relationships between bacterial isolates is often critical for public health microbiology laboratories. Our Galaxy instance provides custom tools to perform relatedness investigation based on cgMLST and single nucleotide polymorphism (SNP) analysis. The cgMLST analysis can be performed directly on the pipeline output or on the output of the stand-alone sequence typing tools. For SNP analysis, the in-house developed tool [PACU](https://github.com/BioinformaticsPlatformWIV-ISP/PACU) is available, which performs a fully automated phylogenomic analysis starting from aligned Illumina and/or ONT reads. In addition, several stand-alone tools are available for variant calling, automated model selection and tree construction. 

## Support for Oxford Nanopore Technologies (ONT) data
In a recent update we have added support for analysing ONT data was added to the custom tools, including the ten pathogen characterization pipelines and other tools such as sequence typing, gene detection, and variant calling. 

## Conclusion
Galaxy has enabled us to make advanced bioinformatics analyses accessible to users without specialized expertise, and has played a key role in expanding analytical capabilities across our institute. All of the custom-developed tools and workflows are also available to external users, to support their WGS analyses and to promote wider adoption of standardized, reproducible methods

## More information? 
- Try it out: https://galaxy.sciensano.be/
- Read our publication on Galaxy @Sciensano in [BMC Genomics](https://pubmed.ncbi.nlm.nih.gov/39780046/)
- Training videos on [YouTube](https://www.youtube.com/watch?v=z0oxaaNzZks&list=PL9O-3w2bLZ4X5DJGYlbqL60PQDzn42Wjh)