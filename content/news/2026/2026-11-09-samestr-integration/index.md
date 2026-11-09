---
title: "Tracking shared microbial strains in Galaxy: SameStr tools and workflow now available!"
date: "2026-11-09"
tease: "A bachelor thesis from Freiburg brings SameStr strain-level metagenomics to Galaxy as a peer-reviewed IWC workflow, eight new tools and a GTN tutorial"
tags: [eu, metagenomics, microbial, freiburg, teaching, workflow, gtn, tools]
subsites: [all, eu, freiburg]
main_subsite: freiburg
contributions:
  authorship:
    - SaimMomin12
---

Two microbiome samples can contain the same bacterial *species* and still carry different *strains*, and those strains can affect their host in very different ways. Strain-level resolution makes it possible to answer questions that species-level profiling cannot: after a fecal microbiota transplantation (FMT), which donor strains established themselves in the patient, and which of the patient's own strains persisted?

[SameStr](https://github.com/danielpodlesny/samestr) (Podlesny et al., 2022) was designed for exactly this. It builds single-nucleotide variant profiles from species-specific MetaPhlAn marker genes and compares them across samples, detecting shared strains even when they are not the dominant strain in a sample. Until now, using it meant either installing software, building reference databases and working on the command line or using Nextflow Workflow Manager. With this release, the full analysis is available in Galaxy, and no command-line experience is needed.


## From bachelor thesis to community resource

**Xènia Morera Martínez**, a bachelor's student, carried out this work as her bachelor thesis in the Bioinformatics Group at the University of Freiburg, under the supervision of Saim Momin. Within a single project, she wrapped a complete tool suite and its Data Manager, built and published a peer-reviewed workflow, validated it against the reference implementation, and wrote a GTN tutorial. That covers the full cycle of contributing to Galaxy, and we are proud of her acheivement.


## The workflow

The new IWC workflow [**SameStr-based shared strain detection from paired-end metagenomic data**](https://iwc.galaxyproject.org/workflow/samestr-shared-strain-detection-main/) takes a collection of paired-end shotgun metagenomic reads and runs the complete analysis:

1. **Pre-processing**: quality trimming and host-read removal with KneadData (Trimmomatic and Bowtie2)
2. **Taxonomic profiling and marker alignment** with MetaPhlAn4
3. **Strain detection** with the SameStr suite: Convert, Merge, Filter, Stats, Compare and Summarize
4. **Results**: a strain co-occurrence table, a per-clade strain events table (`shared_strain`, `other_strain`, `same_clade`) and per-sample taxon counts

Reference databases and the key overlap and similarity thresholds are exposed as workflow inputs, so every analysis is transparent and easy to adapt. The workflow is tested, versioned and citable ([doi:10.5281/zenodo.23841287](https://doi.org/10.5281/zenodo.23841287)).

## Eight new tools for the community

To build the workflow, all eight SameStr tools were wrapped and contributed to the [Intergalactic Utilities Commission](https://github.com/galaxyproject/tools-iuc/tree/main/tools/samestr). They include SameStr Extract for reference genomes and a Data Manager that builds SameStr reference databases from MetaPhlAn or mOTUs markers. Galaxy administrators can therefore provide ready-to-use databases, and users simply select one from a dropdown. Each tool can also be used on its own, outside the workflow.

## Validated against the reference implementation

The Galaxy workflow was benchmarked against the official SameStr Nextflow pipeline on five FMT-treated recurrent *Clostridioides difficile* infection cases (16 samples of public ENA data from the original SameStr study):

- **High agreement**: across 12 donor and patient comparisons, both implementations identified largely the same shared strains. Six comparisons matched exactly, and only 17 strain calls differed in total.

- **Borderline differences**: nearly all discrepancies had similarity scores within about 0.001 of the 99.9 % threshold. They trace back to the different pre-processing tools (KneadData in Galaxy, BBDuk and Kraken2 in Nextflow), not to the strain detection itself.

- **Biology reproduced**: applying the original publication's analysis to the Galaxy results recovered its key finding, that the genera which most often persist in healthy guts are also those which most often engraft after FMT.


## Learn it with the Galaxy Training Network

A new GTN tutorial, [**Shared strain detection with SameStr**](https://training.galaxyproject.org/training-material/topics/microbiome/tutorials/samestr-strain-detection/tutorial.html), walks you through the analysis using real FMT data. It explains why strain-level analysis matters, shows you how to run the complete workflow, and goes through each SameStr tool step by step, including what every key parameter does and when to be careful about changing it.


## Acknowledgements

We warmly thank Daniel Podlesny and the EMBL team behind SameStr and its Nextflow implementation, for developing these tools and for supporting their integration into Galaxy. We thank **[de.NBI](https://www.denbi.de/)** (German Network for Bioinformatics Infrastructure) for providing the virtual machine used to benchmark both pipelines and to develop the blueprint of the Galaxy implementation. We are also grateful to Wolfgang Maier, Matthias Bernt and Marius van den Beek for their careful review of the wrappers and the IWC workflow.

## Get started

- **Run the workflow**: import it from the [IWC workflow page](https://iwc.galaxyproject.org/workflow/samestr-shared-strain-detection-main/) into [usegalaxy.eu](https://usegalaxy.eu), where all tools and a current MetaPhlAn-based SameStr database are already installed.
- **Follow the tutorial** on the [Galaxy Training Network](https://training.galaxyproject.org/training-material/topics/microbiome/tutorials samestr-strain-detection/tutorial.html).
- **Coming next**: support for mOTUs as an alternative profiler.

Questions or feedback? Join us on the [Galaxy Help Forum](https://help.galaxyproject.org/) or the [Galaxy Matrix channels](https://matrix.to/#/#galaxyproject_Lobby:gitter.im).