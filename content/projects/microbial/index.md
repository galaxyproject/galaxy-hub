---
description: "Whether you are analysing microbiome samples or bacterial isolates, long reads or short, shotgun or 16S, genomics, transcriptomics or proteomics, this is the place to be!"
autotoc: true
title: "Microbial data analysis in Galaxy"
---

Whether you are analysing microbiome samples or bacterial isolates, long reads or short, shotgun or 16S, genomics,  transcriptomics or proteomics, **this is the place to be**!

**[microGalaxy](#microgalaxy-community)** is a community of practice in the Galaxy community for anything regarding microbial data analysis in Galaxy!


# What is available?


## Tools

**Many tools for microbial data analysis are freely available** in the ToolShed which can be installed on any Galaxy server. To keep an overview, the *[microGalaxy](#microgalaxy-community)* community of practice maintains a [**curated list**](https://docs.google.com/spreadsheets/d/1Nq_g-CPc8t_eC4M1NAS9XFJDflA7yE3b9hfSg3zu9L4/edit#gid=101894501) of the **150+ tools** available.

If tools are missing or information is not up-to-date in the list, please help us! Contact Saskia, [Paul](mailto:zierep@informatik.uni-freiburg.de) or [Bérénice](mailto:berenice.batut@gmail.com) about it.


## Workflows and tutorials

Several curated Galaxy workflows are publicly available for different kinds of microbial data analysis. Many of these are accompanied by comprehensive [GTN Tutorials](https://training.galaxyproject.org) that will guide you through the analysis step by step.

*The lists below are far from being exhaustive and up-to-date. Something missing? Feel free to update the page or reach to us*

### Microbiome

| Target | Technique | Sequencing | Analysis | GTN Tutorial | Workflow | Notes |
|--------|-----------|------------|----------|--------------|----------|-------|
| Bacteria | 16S | Short reads | Taxonomic Profiling | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/mothur-miseq-sop/tutorial.html" class="fas fa-graduation-cap" aria-hidden="true"></a> | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/mothur-miseq-sop/workflows/" class="fas fa-share-alt" aria-hidden="true"></a> | mothur SOP
| Bacteria | 16S | Long reads | Taxonomic Profiling  | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/nanopore-16S-metagenomics/tutorial.html" class="fas fa-graduation-cap" aria-hidden="true"></a> | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/nanopore-16S-metagenomics/workflows/" class="fas fa-share-alt" aria-hidden="true"></a>
| All | Shotgun metagenomics | Short reads | Taxonomic Profiling, Functional Analysis | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/general-tutorial/tutorial.html" class="fas fa-graduation-cap" aria-hidden="true"></a> | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/general-tutorial/workflows/" class="fas fa-share-alt" aria-hidden="true"></a> | <a href="https://asaim.readthedocs.io/en/latest/workflows.html">ASaiM Docs</a>
| Plasmid | Shotgun | Long reads | AMR detection | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/plasmid-metagenomics-nanopore/tutorial.html" class="fas fa-graduation-cap" aria-hidden="true"></a> | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/plasmid-metagenomics-nanopore/workflows/" class="fas fa-share-alt" aria-hidden="true"></a> |  
| Beer microbiome | Shotgun metagenomics  | Long reads | Taxonomic profiling | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/beer-data-analysis/tutorial.html" class="fas fa-graduation-cap" aria-hidden="true"></a> | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/beer-data-analysis/workflows/" class="fas fa-share-alt" aria-hidden="true"></a> |  
| All | Shotgun metatranscriptomics | Short reads | Functional Analysis | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/metatranscriptomics/tutorial.html" class="fas fa-graduation-cap" aria-hidden="true"></a> | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/metatranscriptomics/workflows/" class="fas fa-share-alt" aria-hidden="true"></a> |  ASaiM-MT 
| Pathogens | Shotgun metagenomics | Long reads | Taxonomic Profiling, Gene Identification, SNP identification, Pathogen Tracking | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/pathogen-detection-from-nanopore-foodborne-data/tutorial.html" class="fas fa-graduation-cap" aria-hidden="true"></a> | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/pathogen-detection-from-nanopore-foodborne-data/workflows/" class="fas fa-share-alt" aria-hidden="true"></a>
| All | Shotgun metagenomics | Short reads | Assembly |  <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/metagenomics-assembly/tutorial.html" class="fas fa-graduation-cap" aria-hidden="true"></a> | <a href="https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/metagenomics-assembly/workflows/" class="fas fa-share-alt" aria-hidden="true"></a>


### Bacterial Isolates

| Target | Sequencing | Analysis | GTN Tutorial | Workflow | Notes |
|--------|------------|----------|--------------|----------|-------|
| M. tuberculosis | Short reads | Variant Detection | <a href="https://training.galaxyproject.org/training-material/topics/variant-analysis/tutorials/tb-variant-analysis/tutorial.html"  class="fas fa-graduation-cap" aria-hidden="true"></a> | <a href="https://training.galaxyproject.org/training-material/topics/variant-analysis/tutorials/tb-variant-analysis/workflows/" class="fas fa-share-alt" aria-hidden="true"></a>
| M. tuberculosis | Short reads | Transmission of Mtb | <a href="https://training.galaxyproject.org/topics/evolution/tutorials/mtb_transmission/tutorial.html"  class="fas fa-graduation-cap" aria-hidden="true"></a>
| M. tuberculosis | Short reads | Phylogenetics applied to Mtb evolution & epidemiology | <a href="https://training.galaxyproject.org/topics/evolution/tutorials/mtb_phylogeny/tutorial.html" class="fas fa-graduation-cap" aria-hidden="true"></a>
| Plasmids | Long reads | AMR detection | | <a href="https://erasmusmc-bioinformatics.github.io/AMR-Galaxy-workflows/" class="fas fa-share-alt" aria-hidden="true"></a>

Want to include your workflow here? Let us know!

## A dedicated interface

A dedicated interface with tools, workflows for microbial data analyses can be accessed via [microgalaxy.usegalaxy.eu](https://microgalaxy.usegalaxy.eu/)

## Training material and events

The Galaxy community organizes regularly training events. You can check the [event pages here](/events/) to get the last ones.

We would like to highlight few events related to microbial data analysis:
- [GTN Smörgåsbord 2023](https://gallantries.github.io/video-library/events/smorgasbord3/): a free, online, self-paced, choose-your-own-adventure style, 1-week event in May 2023

  There are several tracks that might be interesting for you:
  - [Meta-omics](https://gallantries.github.io/video-library/modules/meta-omics)
  - [Microbial Analysis](https://gallantries.github.io/video-library/modules/microbial)


# How is Galaxy used for microbial data analysis?

## Projects / Showcases

Below is a list of projects involving members of this community:

| Project | Description | Techniques | Sequencing | Analyses | People involved | Funding | Status |
|---------|-------------|------------|------------|----------|-----------------|---------|--------|
| [IRIDA](https://irida.ca/) | The Integrated Rapid Infectious Disease Analysis | | | | Aaron Petkau
Foodborne pathogen detection | | Metagenomics | Long reads | | Bérénice Batut, Engy Nasr | EOSC-Life for 2022 | Ongoing
| [BeerDEcoded](https://streetscience.community/projects/beerdecoded/) | General public education project | Metagenomics | Long reads |   | Bérénice Batut, [Street Science Community](https://streetscience.community/) | Mozilla, de.NBI | Ongoing
| [DNAnalyzer](http://streetscience.community/DNAnalyzer/) | Online & interactive game on DNA data analysis | Metagenomics | Long reads | | Bérénice Batut, [Street Science Community](https://streetscience.community/) | University of Freiburg | Ongoing
| Cloud data | | Metagenomics, metatranscriptomics | Short reads | Taxonomy profiling, Functional profiling, Assembly, MAGs builiding | Bérénice Batut, Engy Nasr | | Ongoing
| ASaiM | | Metagenomics, metatranscriptomics | Short reads | Taxonomy profiling, Functional profiling | Bérénice Batut, Saskia Hilteman, Pratik Jagtap, Subina Mehta, etc | | Finished?
| [Mycobacterium tuberculosis NGS made easy: data](https://gallantries.github.io/video-library/modules/mtb-analysis) | Series of modules containing recorded videos by experts and tutorials | | Illumina (wanting to expand to nanopore) | Mapping & Variant calling, Molecular epidemiology of TB using NGS, Phylogenetics for studying TB evolution and epidemiology | Daniela Brites, Peter van Heusden, Galo A. Goig, Christoph Stritt | Initially funded trough TB projects of capacity building; currently no funding | Ready to be used  but also working on improvements


## Partners

| Partners | Description | People involved |
|----------|-------------|-----------------|
| [Seq4AMR](https://www.jpiamr.eu/projects/seq4amr/) | [JPIAMR]() Network for Integrating Microbial Sequencing and Platforms for Antimicrobial Resistance | Saskia Hilteman
| [ELIXIR Emerging Microbiome Community](https://elixir-europe.org/communities/marine-metagenomics) | | Bérénice Batut
| µbioinfo Slack | |

# microGalaxy Community

<img class="img-fluid float-right" src="/projects/microbial/microgalaxy-logo.png" style="width:200px;" alt="Logo for microgalaxy"/>

microGalaxy is a [community of practice](/community/practice) to
* **Develop** and **Sustain** microbial data analysis in Galaxy
* Implement **standardised "best practices"**
* Expand **documentation** and **training**
* **Coordinate efforts** to avoid redundancy in tools, workflows and training
* **Share** the amazing things we are all doing together and outside Galaxy
* Support each other


## Meetings

The microGalaxy community usually meets **4 times per year** (including 1 BoF at GCC and other community events) for a **2-hour meeting**. The meeting **time alternates** between 5-7pm Central European time and 9-11am Central European time in order to support members leaving in different timezones. The main aims of the meetings are to

* Get news and updates from the community
* Have 1 or more "short" talks about a project or a topic of interest
* Discuss and coordinate our efforts.

Details about the next events and minutes of previous meetings can be found [here](https://docs.google.com/document/d/13VjcUjStuIp7bK29e74k8Nqb7N4lmVcg1ioArEWr254/edit#).

## Working groups

2 working groups were started within the community to work together towards the goals of the commmunity:

- A [**Tool working groups**](https://docs.google.com/document/d/14LJLyVgT29m63iovCww7nMDmfRAqOicedzxHu3aqXnE/edit?usp=sharing) with the aims to
  - Create and maintain a **curated up-to-date list of the available tools in Galaxy ecosystem for microbial data analysis**
  - Create a wishlist of tools to integrate in Galaxy
  - **Assess the needs from users** for tools in Galaxy
  - Organise **hackathons** to add tools in connection with the global community
- A [**Paper(s) working groups**](https://docs.google.com/document/d/1uVQ8E_8HpIuHDYHwR82jU8pCvj0tnebFKyS0juAoyGc/edit?usp=sharing) with the aims to
  - **Advertise about microbial data analysis** in Galaxy
  - Investigate on the uses of Galaxy for microbial data analysis
  - **Aggregate information about available resources and infrastructure** within Galaxy community
  - Reflect on a **roadmap** for the community

## Join us

Anybody interested in microbial data analysis in the Galaxy is welcome to join microGalaxy! **Everybody is Welcome!**

* Join our [**quarterly meetings**](https://docs.google.com/document/d/13VjcUjStuIp7bK29e74k8Nqb7N4lmVcg1ioArEWr254/edit#)!
* Join our **working groups** (see above)
* Join the [Gitter **Chat**](https://gitter.im/galaxyproject/microGalaxy) (also available via[ Matrix](https://matrix.to/#/#galaxyproject_microGalaxy:gitter.im))
* Join the [**mailing list**](https://lists.galaxyproject.org/lists/microgalaxy.lists.galaxyproject.org/) microgalaxy@lists.galaxyproject.org
