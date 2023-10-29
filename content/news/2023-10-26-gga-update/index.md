---
title: "An update on Galaxy Genome Annotation"
tease: "Galaxy as a platform for the annotation of genomes"
authors: "Anthony Bretaudeau, Romane Libouban"
date: "2023-10-26"
hide_tease: false
tags: [esg-wp5, esg]
subsites: [all, all-eu, esg]
---

## Galaxy Genome Annotation

As presented at GCC2023 and EGD2023, a lot of new exciting developments have been made in Galaxy for the annotation of genomes!

This has been done in the frame of the GGA community of practice that you are really welcome to join if you have interest in genome annotation within Galaxy (as a user, developer, trainer, ...).

## New tools!

We've worked hard to integrate into Galaxy many state-of-the-art tools:

| Tool | Version | UseGalaxy.eu | UseGalaxy.org | UseGalaxy.org.au |
|---|---|---|---|---|
| RepeatModeler | 2.0.4 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/csbl/repeatmodeler/repeatmodeler/2.0.4+galaxy1)  |  |  |
| RepeatMasker | 4.1.5 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/bgruening/repeat_masker/repeatmasker_wrapper/4.1.5+galaxy0) |  |  |
| Red | 2018.09.10 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/red/red/2018.09.10+galaxy1) |  |  |
| Prokka | 1.14.6 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/crs4/prokka/prokka/1.14.6+galaxy1)  |  |  |
| Bakta | 1.8.2 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/bakta/bakta/1.8.2+galaxy0) |  |  |
| Helixer | 0.3.2 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/genouest/helixer/helixer/0.3.2) |  |  |
| BRAKER2 | 2.1.6 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/genouest/braker/braker/2.1.6+galaxy0) |  |  |
| BRAKER3 | 3.0.3 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/genouest/braker3/braker3/3.0.3+galaxy1) |  |  |
| TSEBRA |  |  |  |  |
| Funannotate | 1.8.15 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/funannotate_predict/funannotate_predict/1.8.15+galaxy1) |  |  |
| MAKER | 2.31.11 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/maker/maker/2.31.11+galaxy2) |  |  |
| Antismash | 6.1.1 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/bgruening/antismash/antismash/6.1.1+galaxy1) |  |  |
| InterProScan | 5.59-91 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/bgruening/interproscan/interproscan/5.59-91.0+galaxy3) |  |  |
| EggNOG-Mapper | 2.1.8 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/galaxyp/eggnog_mapper/eggnog_mapper/2.1.8+galaxy4) |  |  |
| Genome annotation statistics | 0.8.4 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/jcvi_gff_stats/jcvi_gff_stats/0.8.4) |  |  |
| BUSCO | 5.4.6 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/busco/busco/5.4.6+galaxy0) |  |  |
| AEGeAN | 0.16.0 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/aegean_parseval/aegean_parseval/0.16.0) |  |  |
| BLAST | 2.14.1 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/devteam/ncbi_blast_plus/ncbi_blastn_wrapper/2.14.1+galaxy0) |  |  |
| Exonerate | 2.4.0 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/exonerate/exonerate/2.4.0+galaxy2) |  |  |
| Diamond | 2.0.15 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/bgruening/diamond/bg_diamond/2.0.15+galaxy0) |  |  |
| Miniprot | 0.12 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/miniprot/miniprot/0.12+galaxy0) |  |  |
| FEELnc | 0.2.1  | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/feelnc/feelnc/0.2.1+galaxy0) |  |  |
| JBrowse | 1.16.11 | [link](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/jbrowse/jbrowse/1.16.11+galaxy1) |  |  |

## New workflows!

Over the last years we have collected a lot of different workflows for different use-cases. All the GTN tutorials below for example are also
available as a workflow. However, they might be hard to find and as a consequence people starting to redo them. To fix that we
have started to push our workflows to the Intergalactic Workflow Commission, adding workflow tests and push them to workflowhub.eu and Dockstore for
broader dissemination.

You can see the first IWC workflow from the GGA community at [workflowhub](https://workflowhub.eu/workflows/575) or on [GitHub as part of the IWC organisation](https://github.com/iwc-workflows/repeatmasking).

Next up is the [functional annotation](https://github.com/galaxyproject/iwc/pull/228) workflow and our GTN workflows - see below.

## New visualisations!

Galaxy is much more than just a workflow system and one area that we are trying to improve is Visualisation!

Check out our tutorials about.

<a href="https://training.galaxyproject.org/training-material/topics/visualisation/tutorials/jbrowse/tutorial.html"><button type="button" class="btn btn-success">Genomic Data Visualisation with JBrowse</button></a>

<a href="https://training.galaxyproject.org/training-material/topics/visualisation/tutorials/circos/tutorial.html"><button type="button" class="btn btn-success">Visualisation with Circos</button></a>


- GNB
  - install gxit on .eu (if not done?)

## New and updated training material!

We have updated and added new training material for everyone that wants to learn Genome Annotation. If you don't know where to start check out our
recommended learning path and learn from "Introduction to Genome Annotation" to "Refining Genome Annotations with Apollo" everything that you need to know about Genome Annotation: https://training.galaxyproject.org/training-material/learning-pathways/genome-annotation-eukaryote.html

Alternatively, you can jump right into you favorite topic:

<a href="https://training.galaxyproject.org/training-material/topics/genome-annotation/tutorials/annotation-with-prokka/tutorial.html"><button type="button" class="btn btn-success">Genome annotation with Prokka!</button></a>

<a href="https://training.galaxyproject.org/training-material/topics/genome-annotation/tutorials/repeatmasker/tutorial.html"><button type="button" class="btn btn-success">Masking repeats with RepeatMasker</button></a>

<a href="https://training.galaxyproject.org/training-material/topics/genome-annotation/tutorials/funannotate/tutorial.html"><button type="button" class="btn btn-success">Genome annotation with Maker (short) </button></a>

<a href="https://training.galaxyproject.org/training-material/topics/genome-annotation/tutorials/annotation-with-maker/tutorial.html"><button type="button" class="btn btn-success">Genome annotation with Maker</button></a>

<a href="https://training.galaxyproject.org/training-material/topics/genome-annotation/tutorials/functional/tutorial.html"><button type="button" class="btn btn-success">Functional annotation of protein sequences</button></a>

<a href="https://training.galaxyproject.org/training-material/topics/genome-annotation/tutorials/hpc-for-lsgc/tutorial.html"><button type="button" class="btn btn-success">From small to large-scale genome comparison</button></a>

<a href="https://training.galaxyproject.org/training-material/topics/genome-annotation/tutorials/gene-centric/tutorial.html"><button type="button" class="btn btn-success">Comparative gene analysis in unannotated genomes</button></a>



## Manual curation and collaborative annotation made easy

[Apollo](https://genomearchitect.readthedocs.io/en/latest/) is a web service for Collaborative Annotation - a “Google Docs of Genome Annotation”
if you like to think in Google Terms. It allows for real-time, collaborative genome annotation, editing, and review of your favorite genome.
Genome Annotation requires manual curation and review many hands are needed -
Biology is a team sport! And Apollo is a wonderful tool to support your team.

![Galaxy Apollo integration](/assets/media/collaborative_editing.png)

To make your life easy we worked closely with the Apollo team and bridged Galaxy with Apollo.
You can do automatic annotation with Galaxy, using its powerful workflow system, and afterwards send
the data to Apollo for manual curation and collaborative editing! A typical Galaxy-Apollo use-case might look like that:

  1. Fetch Data
  2. Analyse in Galaxy
  3. Send to Apollo
  4. Collaboratively Annotate
  → repeat

![Galaxy Apollo integration](/assets/media/galaxy_apollo.png)


## The Earth BioGenome Project

Building on the [Assembly workflows](https://galaxyproject.org/projects/vgp/) that have been developed as part of the VGP/BGE/ERGA (→ in short EBP) we are planning to deliver high-quality workflows and interactive tools for your genome annotation efforts. Ideally, running assembly and annnotation workflows after each other 😊 

## What's next?

Any tool or workflow missing in our catalog? Please tell us and we will do our best to make it available.

- jbrowse2
- GALBA, OMark, BUSCO/InterProScan updates

BEAURIS link?
