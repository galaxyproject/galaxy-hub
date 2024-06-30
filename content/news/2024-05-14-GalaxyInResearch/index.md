---
title: "Galaxy in Research: Exploring the Hidden World of Antarctic Toxins with Galaxy"
tease: "Discover how Galaxy is helping to unravel the hidden world of peptide toxins in an Antarctic marine invertebrate."
hide-tease: false
authors: "Natalie Whitaker-Allen"
date: "2024-05-14"
tags: ["highlight"]
subsites: [global,all]
---

# Galaxy in Research: Exploring the Hidden World of Antarctic Toxins with Galaxy

Galaxy is thrilled to be part of new, fascinating research that explores the molecular secrets of Antarctica's marine invertebrates. In a recent study titled "[Peptide Toxins from Antarctica: The Nemertean Predator and Scavenger _Parborlasia corrugatus_ (McIntosh, 1876)](https://www.mdpi.com/2072-6651/16/5/209#B35-toxins-16-00209)" researchers have uncovered a fascinating world of peptide toxins within the nemertean worm, _Parborlasia corrugatus_. This research sheds light on the genetic blueprint behind _P. corrugatus_'s venomous arsenal, with potential implications for biomedicine and ecological studies.

Thank you to Erik Jacobsson, Adam A. Strömstedt, Håkan S. Andersson, Conxita Avila, and Ulf Göransson for using Galaxy!

## Introduction

This study explored the peptide and protein toxins from marine organisms, focusing on a nemertean worm, _Parborlasia corrugatus_, from the Antarctic region. Despite being a common and large predator in the Southern Ocean, _P. corrugatus_ is unpalatable to known predators, likely due to molecules in its mucus. The mucus contains parborlysins, cytolysins that lyse erythrocytes, along with other neurotoxic peptides and cystine-knot-containing peptide toxins. Small-molecule toxins, such as tetrodotoxin and anabaseine, have also been reported in nemertean worms. The study employs transcriptomic, liquid chromatography, and mass spectrometry to investigate the toxin content in _P. corrugatus_, along with bioactivity assays to explore their initial effects.

## Methods

_Sample Collection and RNA Extraction_

Specimens of _P. corrugatus_ were collected from Antarctic waters and immediately preserved in RNAlater. Total RNA was extracted from the samples using a commercial RNA extraction kit following the manufacturer's protocol.

_Transcriptome Sequencing and Assembly_

RNA sequencing was performed on an Illumina platform to generate paired-end reads. The raw reads were processed to remove adapters and low-quality bases using Trimmomatic. The high-quality reads were then de novo assembled into transcripts using Trinity.

_Functional Annotation and Analysis_

The assembled transcripts were functionally annotated using BLASTX against the UniProtKB/Swiss-Prot database to identify homologous proteins. Gene ontology (GO) and Kyoto Encyclopedia of Genes and Genomes (KEGG) pathway analyses were performed to elucidate the biological functions and pathways associated with the identified transcripts.

_Identification of Peptide Toxin Genes_

To identify genes encoding peptide toxins, the assembled transcripts were screened using a custom pipeline. This pipeline utilized known toxin sequences from other organisms as queries in a BLAST search to identify putative toxin-encoding transcripts in the _P. corrugatus_ transcriptome.

_Phylogenetic Analysis_

Phylogenetic analysis was conducted to elucidate the evolutionary relationships between _P. corrugatus_ toxin genes and those of other venomous organisms. Multiple sequence alignments were generated using MUSCLE, and phylogenetic trees were constructed using maximum likelihood methods implemented in RAxML.


## Galaxy's Role

For the transcriptome assembly of _P. corrugatus_, the researchers used the Trinity assembler, a popular tool for de novo transcriptome assembly. This analysis was conducted using the usegalaxy.org server, which provides a user-friendly interface and access to a wide range of bioinformatics tools, including Trinity. Default settings were applied during the assembly process.

Following the assembly, the transcriptome was investigated for peptide/protein toxins. This step involved the use of Galaxy's versatile tools and workflows, which enabled the researchers to efficiently process and analyze the assembled transcriptome data. The Galaxy platform's accessibility and flexibility were instrumental in conducting a thorough analysis of the _P. corrugatus_ transcriptome, ultimately leading to the discovery of novel peptide toxins.


## Results

The analysis of the _P. corrugatus_ transcriptome revealed a diverse array of genes potentially involved in peptide toxin production. The transcriptome assembly yielded a comprehensive dataset, enabling the identification and characterization of genes encoding various peptide toxins.

Notably, the study identified several novel peptide toxin sequences, expanding the known repertoire of _P. corrugatus_ venom. These novel toxins exhibit unique structural features and bioactive properties, suggesting their potential for biomedical applications. Furthermore, the analysis revealed insights into the evolutionary origins of these peptide toxins. Phylogenetic analysis of toxin-encoding genes highlighted the evolutionary relationships between _P. corrugatus_ toxins and those of other venomous organisms, providing valuable evolutionary context to their function and diversity.

Overall, the study's findings shed light on the genetic basis of peptide toxin production in _P. corrugatus_ and underscore the potential of its venom as a source of novel bioactive compounds.


## Acknowledgment

The Galaxy Project extends its appreciation to the researchers for using Galaxy in their study, demonstrating the platform's versatility and effectiveness in advancing scientific research.

---<br><be>

Jacobsson E, Strömstedt AA, Andersson HS, Avila C, Göransson U. Peptide Toxins from Antarctica: The Nemertean Predator and Scavenger Parborlasia corrugatus (McIntosh, 1876). Toxins. 2024; 16(5):209. https://doi.org/10.3390/toxins16050209
