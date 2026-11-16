---
title: 'New Publication "Microbiology Galaxy Lab: a community-driven gateway for reproducible and FAIR analysis of microbiological data"'
date: '2026-11-16'
tease: 'The microGalaxy community is proud to announce the publication of the Microbiology Galaxy Lab in Communications Biology, presenting a free, globally accessible platform for reproducible and FAIR microbiological data analysis.'
hide_tease: false
subsites: [all]
tags: 
- microbiology
- paper
- community
contributions:
  authorship:
    - bebatut
    - paulzierep
  funding:
    - deNBI
    - bmbf               # de.NBI-RBC 031A538A
    - mwk                # LIBIS/de.NBI Freiburg
    - eurosciencegateway # 101057388
    - bge                # 101059492
    - ifb                # ANR-11-INBS-0013
    - abromics
    - cnrs               # ABRomics
    - NIH                # U41HG006620, U24AI183870, 75N92023P00302
---

We're thrilled to share our new publication in *Communications Biology*: **"Microbiology Galaxy Lab: a community-driven gateway for reproducible and FAIR analysis of microbiological data."** 
📘 [Read the full article here](https://www.nature.com/articles/s42003-026-10750-7)

## How it started

For many years, the [**microGalaxy community**](/community/sig/microbial/) has developed and expanded **microbiology-related resources** within Galaxy. More than three years ago, we set out to bring these resources together and show the microbiology research community what they make possible: access to a **wide range of tools, workflows, and computing resources**.

To guide this effort, we conducted a **user survey** and an **in-depth analysis** of the available resources. We then organized the content and overhauled the **Microbiology Galaxy Lab (MGL)**.

Turning this work into a publication proved more challenging than we expected. We believe this was partly due to misconceptions about Galaxy and, in particular, to the difficulty of conveying the **additional value** the MGL offers the community.

The value lies not only in the number of resources, but in bringing them together in one place: the MGL offers **315 tools** and more than **115 ready-to-use workflows** for **microbiology researchers**. While individual workflows are often published in journals, a curated collection makes these resources easier to find and reuse.

Our **literature analysis** helps put this contribution in context. We identified **10,991 publications** that rely on Galaxy, including **3,067 focused on microbiology**. These figures highlight Galaxy's relevance to microbial research and the opportunity to make its resources more **accessible and reusable**.

After a long process and several rounds of revisions, we are pleased to have published this work in **Communications Biology**.

## Democratizing Microbial Omics Analysis

The explosion of microbial omics data has outpaced the ability of many researchers to analyse it, with complex tools and limited computational resources creating barriers to discovery. In this article, we present the **Microbiology Galaxy Lab (MGL)**: a free, globally accessible, community-supported platform that combines state-of-the-art analytical power with user-friendly accessibility; no programming expertise required.

The platform integrates **over 315 tool suites** and **115 curated workflows**, enabling comprehensive metabarcoding, (meta)genomic, (meta)transcriptomic, and (meta)proteomic data analysis within a **FAIR-aligned environment**. It is deployed across multiple public Galaxy servers ( [microbiology.usegalaxy.org](https://microbiology.usegalaxy.org/), [.eu](https://microbiology.usegalaxy.eu/), [.org.au](https://microbiology.usegalaxy.org.au/), and [.fr](https://microbiology.usegalaxy.fr/)) ensuring broad, equitable access for the global research community.

![Infographic for the Microbiology Galaxy Lab showing DNA, RNA, proteins, and metabolites from ecosystem and health research flowing into tool suites, workflows, and tutorials, organized around a central One Health cycle linking environment, animals, and humans.](graphical_abstract.png)

## What the Microbiology Galaxy Lab Offers

Built on the Galaxy framework and powered by the [Galaxy Labs Engine](https://doi.org/10.1093/gigascience/giag041) and the [Galaxy Communities Dock (CoDex)](https://github.com/galaxyproject/galaxy_codex), MGL provides:

* **Community-curated tools** organized by analysis type, covering everything from taxonomic classification and genome assembly to variant calling and metaproteomics, including integrated frameworks like QIIME 2, MetaPhlAn, and Kraken.
* **Ready-to-use, peer-reviewed workflows** from the [Intergalactic Workflow Commission (IWC)](https://iwc.galaxyproject.org/), adhering to Galaxy best practices with clear annotations, test data, and formal documentation, and citable via WorkflowHub and Dockstore.
* **Training and learning pathways**: over **35 tutorials**, **15+ instructional videos** (16 hours), and **3 structured learning pathways** on the [Galaxy Training Network](https://training.galaxyproject.org/), empowering researchers from beginner to advanced levels.
* **Reproducibility and FAIR compliance** through persistent histories, RO-Crate exports, semantic annotation with the EDAM ontology, and dynamic computational resource allocation via the [Total Perspective Vortex](https://github.com/galaxyproject/total-perspective-vortex).

## Real-World Impact: Use Cases That Matter

The platform's utility is exemplified through diverse use cases spanning health, infectious disease, and environmental microbiology:

* **Antimicrobial resistance (AMR) tracking** via platforms like [ABRomics](https://www.abromics.fr/) and BenchAMRking, supporting pathogen genomic surveillance and clinical reporting.
* **Biomarker prediction** applying machine learning and AI to microbiome research, e.g., discovering microbial biomarkers with tools like MetaSBT and identifying disease-associated signatures in conditions such as ovarian cancer or cystic fibrosis.
* **Microbiome classification** using metabarcoding, metagenomics, and whole-genome sequencing to explore root microbiomes, soil communities (BioDIGS), aeromicrobiome, and global mycorrhizal fungi [SPUN](https://www.spun.earth/).
* **Functional annotation of key microbes** from metagenome-assembled genomes (MAGs) to multi-omics integration combining metagenomics, metatranscriptomics, and metaproteomics.

## A Community-Driven Ecosystem

The MGL was shaped by the community it serves. A survey of over **130 Galaxy users** working in microbial research revealed primary use in bacterial genomics and metagenomics, with growing interest in functional analysis, genome assembly, metaproteomics, and AMR profiling, alongside challenges such as limited user experience and technical hurdles. These insights directly informed the platform's design.

No formal membership is required to contribute or benefit: the microGalaxy community is open to all, coordinated by [Bérénice Batut](https://galaxyproject.org/hall-of-fame/bebatut/) and [Paul Zierep](https://galaxyproject.org/hall-of-fame/paulzierep/), who organize regular meetings, working groups, hackathons, and events, including collaborations with the IWC, ELIXIR, and the Galaxy Community.

## Looking Ahead

The article also outlines a roadmap for the future of microbiological data analysis in Galaxy, including:

* Broadening scope to viruses, archaea, eukaryotes, and multi-omics integration with **One Health** principles.
* Curating **reference data packs** for common use cases (AMR genes, 16S rRNA, viral genomes).
* Developing flagship workflows for MAG generation, AMR detection, and pathogen spillover tracking.
* Maintaining FAIR compliance and reproducibility as the field evolves, decommissioning outdated tools while preserving them for reproducibility, and promoting RO-Crate exports.

## Explore and Get Involved

You can start using the Microbiology Galaxy Lab today:

* [Microbiology Galaxy Lab on UseGalaxy.org](https://microbiology.usegalaxy.org/)
* [Microbiology Galaxy Lab on UseGalaxy.eu](https://microbiology.usegalaxy.eu/)
* [Microbiology Galaxy Lab on UseGalaxy.org.au](https://microbiology.usegalaxy.org.au/)
* [Microbiology Galaxy Lab on UseGalaxy.fr](https://microbiology.usegalaxy.fr/)
* [microGalaxy community page](/community/sig/microbial/)
* [Galaxy Training Network – Microbiology tutorials](https://training.galaxyproject.org/training-material/topics/microbiome/)

Interested in contributing? Join our community meetings, share your workflows and tools, and take part in upcoming trainings and hackathons.

---

🧫 *This work represents a collective achievement of the microGalaxy community, highlighting open science, reproducibility, and collaboration across the global microbiology research field.*
