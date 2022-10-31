---
title: ASaiM - an environment to analyze intestinal microbiota data
date: '2018-01-17'
tags: [tools]
subsites: [eu, freiburg]
main_subsite: freiburg
---

New generation of sequencing platforms coupled to numerous bioinformatics tools has led to rapid technological progress in metagenomics and metatranscriptomics to investigate complex microorganism communities. Nevertheless, a combination of different bioinformatic tools remains necessary to draw conclusions out of microbiota studies. Modular and user-friendly tools would greatly improve such studies.

We therefore developed ASaiM, an Open-Source framework dedicated to microbiota data analyses. ASaiM integrates a comprehensive set of microbiota related [tools](https://asaim.readthedocs.io/en/latest/tools/index.html#framework-tools), [predefined and tested workflows](https://asaim.readthedocs.io/en/latest/workflows.html#framework-workflow) dedicated to microbiota analyses. ASaiM offers then sophisticated analyses to scientists without command-line knowledge and a powerful framework to easily and quickly explore microbiota data in a reproducible and transparent environment.

ASaiM is also available as a Docker Galaxy flavour, but tools and workflows can be tested here.

Read more on [ASaiM's homepage](https://asaim.readthedocs.io/en/latest/) or via its [preprint](https://www.biorxiv.org/content/early/2017/09/04/183970)

## Workflows

Several [workflows](https://asaim.readthedocs.io/en/latest/workflows.html) has been developed for ASaiM and are available on

- [Analysis of raw metagenomic or metatranscriptomic shotgun data](https://galaxy.uni-freiburg.de/u/berenice/w/asaim-shotgun-workflow): The workflow quickly produces, from raw metagenomic or metatranscriptomic shotgun data, accurate and precise taxonomic assignations, wide extended functional results and taxonomically related metabolism information

    <div class="multiple-img">
        <img src="/assets/media/2018-01-17-asaim_main_workflow.png" width="800px" alt="ASaiM workflow" />
    </div>

- Assembly of metagenomic data with two workflows, each one using one of each of the well-performing assemblers: [MEGAHIT](https://galaxy.uni-freiburg.de/u/berenice/w/asaim-metagenomic-assembly-with-megahit) and [MetaSPAdes](https://galaxy.uni-freiburg.de/u/berenice/w/asaim-metagenomic-assembly-with-metaspades)
- Analysis of metataxonomic data with [QIIME - Illumina Overview tutorial](https://galaxy.uni-freiburg.de/u/berenice/w/asaim-qiime-illumina-overview-tutorial)
- [Running as in EBI metagenomics (3.0)](https://galaxy.uni-freiburg.de/u/berenice/w/asaim-ebi-metagenomics-workflow-30) to reproduce locally analyses made in EBI Metagenomics website, without having to wait for availability of EBI Metagenomics or to upload any data on EBI Metagenomics

## Credit

<embed src="https://www.biorxiv.org/content/early/2017/09/04/183970.full.pdf" width="100%" height="700" type='application/pdf'>


