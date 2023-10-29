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
| Red | 2018.09.10 | [Red](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/red/red/2018.09.10+galaxy1) |  |  |
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

- IWC repeat masking
- functional annotation https://github.com/galaxyproject/iwc/pull/228
- GTN workflows: funannotate, maker, prokka

## New visualisations!

- the existing ones: jbrowse/circos
- GNB
  - install gxit on .eu (if not done?)

## New training material!

- Gallantries hall of fame / learning path etc

From an "Introduction to Genome Annotation" to "Refining Genome Annotations with Apollo", an leaning path for everyone that wants to learn Genome Annotation: https://training.galaxyproject.org/training-material/learning-pathways/genome-annotation-eukaryote.html


## Manual curation made easy

- Apollo infra, available on usegalaxy.eu/apollo

## EBP

Building on the [VGP assembly workflows](https://galaxyproject.org/projects/vgp/), doing the same for annotation

## What's next?

Any tool or workflow missing in our catalog? Please tell us and we will do our best to make it available.

- jbrowse2
- GALBA, OMark, BUSCO/InterProScan updates

BEAURIS link?
