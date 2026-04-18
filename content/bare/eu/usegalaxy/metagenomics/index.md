---
title: Galaxy Metagenomics
components: true
---

<slot name="/bare/eu/usegalaxy/notices" />

![Plant Analysis on Galaxy](https://metagenomics.usegalaxy.eu/assets/media/asaim_logo.png)

# Welcome to Galaxy for Microbiome

<br />
**Galaxy for Microbiome** ([ASaiM](https://asaim.readthedocs.io/en/latest/)) is a webserver to process, analyse and visualize microbiome data in general. It is based on the [Galaxy framework](https://galaxyproject.org), which guarantees simple access, easy extension, flexible adaption to personal and security needs, and sophisticated analyses independent of command-line knowledge.

<br />
# Content




# Get started

Are you new to Galaxy, or returning after a long time, and looking for help to get started? Take a [__guided tour__](https://metagenomics.usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.


# Training

We are working in close collaboration with the [__Galaxy Training Network (GTN)__](https://training.galaxyproject.org) to develop training materials of data analyses based on Galaxy. If you want to know more about the GTN or how to become part of the Galaxy community, check the videos below!

<iframe width="560" height="315"
src="https://www.youtube.com/embed/lDqWxzWNk1k"
title="YouTube video player"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen>
</iframe>

<iframe width="560" height="315"
src="https://www.youtube.com/embed/-1MPdxmRs8U"
title="YouTube video player"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>

<br /><br />

**Training material**

All relevant materials for [microbiome data analysis](https://training.galaxyproject.org/topics/metagenomics) can also be found within the GTN.

Lesson | Slides | Hands-on | Input dataset | Workflows | Galaxy History
--- | --- | --- | --- | --- | ---
Welcome and introduction to Galaxy | [<Icon name="slideshare" />](https://training.galaxyproject.org/topics/introduction/tutorials/galaxy-intro-short/slides.html) / [<Icon name="video-camera" />](https://training.galaxyproject.org/videos/watch.html?v=introduction/tutorials/galaxy-intro-short/slides) | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/introduction/tutorials/galaxy-intro-short/tutorial.html) | [<Icon name="files-o" />](https://doi.org/10.5281/zenodo.582600) | [<Icon name="share-2" />](https://training.galaxyproject.org/training-material/topics/introduction/tutorials/galaxy-intro-short/workflows/) |
An Introduction to Metagenomics | [<Icon name="slideshare" />](https://training.galaxyproject.org/topics/metagenomics/slides/introduction.html#1) | | | |
Quality Control | [<Icon name="slideshare" />](https://training.galaxyproject.org/topics/sequence-analysis/tutorials/quality-control/slides.html) / [<Icon name="video-camera" />](https://youtu.be/BWonTPS4zB8) | [<Icon name="laptop" />](https://training.galaxyproject.org/topics/sequence-analysis/tutorials/quality-control/tutorial.html) / [<Icon name="video-camera" />](https://youtu.be/QJRlX2hWDKM) | [<Icon name="files-o" />](https://doi.org/10.5281/zenodo.61771) | [<Icon name="share-2" />](https://training.galaxyproject.org/topics/sequence-analysis/tutorials/quality-control/workflows/) | [<Icon name="list-ul" />](https://metagenomics.usegalaxy.eu/u/gallardoalba/h/quality-control)
16S Microbial Analysis with mothur | [<Icon name="video-camera" />](https://www.youtube.com/watch?v=9OY1mklWuK0) | [<Icon name="laptop" />Short](https://training.galaxyproject.org/topics/metagenomics/tutorials/mothur-miseq-sop-short/tutorial.html) / [<Icon name="laptop" />Extended](https://training.galaxyproject.org/topics/metagenomics/tutorials/mothur-miseq-sop/tutorial.html) / [<Icon name="video-camera" />](https://youtu.be//mto4Nl-q7Kk) | [<Icon name="files-o" />](https://doi.org/10.5281/zenodo.800651) | [<Icon name="share-2" />](https://training.galaxyproject.org/topics/metagenomics/tutorials/mothur-miseq-sop-short/workflows/) |
16S Microbial analysis with Nanopore data | | [<Icon name="laptop" />](https://training.galaxyproject.org/topics/metagenomics/tutorials/nanopore-16S-metagenomics/tutorial.html) | [<Icon name="files-o" />](https://zenodo.org/record/4274812) | [<Icon name="share-2" />](https://training.galaxyproject.org/topics/metagenomics/tutorials/nanopore-16S-metagenomics/workflows/) |
Analyses of metagenomics data - The global picture  | | [<Icon name="laptop" />](https://training.galaxyproject.org/topics/metagenomics/tutorials/general-tutorial/tutorial.html) | [<Icon name="files-o" />](https://doi.org/10.5281/zenodo.815875) | [<Icon name="share-2" />](https://training.galaxyproject.org/topics/metagenomics/tutorials/general-tutorial/workflows/) |
Metatranscriptomics analysis using microbiome RNA-seq data | [<Icon name="slideshare" />](https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/metatranscriptomics/slides.html) | [<Icon name="laptop" />Short](https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/metatranscriptomics-short/tutorial.html) / [<Icon name="laptop" />Extended](https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/metatranscriptomics/tutorial.html) | [<Icon name="files-o" />](https://zenodo.org/record/4776250) | [<Icon name="share-2" />](https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/metatranscriptomics-short/workflows/) |
Metaproteomics introduction | | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/proteomics/tutorials/metaproteomics/tutorial.html) / [<Icon name="video-camera" />](https://youtu.be//3_yaPp-RCFw) | [<Icon name="files-o" />](https://doi.org/10.5281/zenodo.839701) | [<Icon name="share-2" />](https://training.galaxyproject.org/training-material/topics/proteomics/tutorials/metaproteomics/workflows/) |


# Tools

More than **200 tools** are avalaible for microbiome data analysis in this custom Galaxy instance:

- **General tools**
    - **Data retrieval**: EBISearch, ENASearch, SRA Tools
    - **BAM/SAM file manipulation**: SAM tools
    - **BIOM file manipulation**: BIOM-Format tools
- **Genomics tools**
    - **Quality control**: FastQC, PRINSEQ, Cutadapt, fastp, Trimmomatic, MultiQC
    - **Clustering**: CD-Hit
    - **Sorting and prediction**: SortMeRNA, FragGeneScan
    - **Mapping**: BWA, Bowtie
    - **Similarity search**: NCBI Blast+, Diamond
    - **Alignment**: HMMER3
- **Microbiota dedicated tools**
    - **Microbial**: Scoary, Prokka, Roary
    - **Metagenomics data manipulation**: VSearch, Nonpareil, DADA2
    - **Assembly**: MEGAHIT, metaSPAdes, metaQUAST, VALET, Bandage, MaxBin2
    - **Metataxonomic sequence analysis**: Mothur, QIIME, Vegan
    - **Taxonomy assignation**: MetaPhlAn, Kraken, CAT/BAT
    - **Metabolism assignation**: HUMAnN, PICRUST, InterProScan
    - **Visualization**: Export2graphlan, GraPhlAn, KRONA
    - **Metaproteomics**: MaxQuant, SearchGUI, PeptideShaker, Unipept

# Workflows

To orchestrate tools and help users with their analyses, several [workflows](https://asaim.readthedocs.io/en/latest/workflows.html) are available. They formally orchestrate tools in a defined order and with defined parameters, but they are customizable (tools, order, parameters).

The workflows are available in the [Shared Workflows](https://metagenomics.usegalaxy.eu/workflows/list_published), with the label "***asaim***".

## Taxonomic and functional community profiling of raw metagenomic shotgun data

The workflow quickly produces, from raw metagenomic shotgun data, accurate and precise taxonomic assignations, wide extended functional results and taxonomically related metabolism information

![ASaiM main workflow](https://metagenomics.usegalaxy.eu/assets/media/2018-01-17-asaim_main_workflow.png)

This workflow consists of

1. Processing with quality control/trimming (**FastQC** and **Trim Galore!**) and dereplication (**VSearch**)
2. Taxonomic analyses with assignation (**MetaPhlAn2**) and visualization (**KRONA**, **GraPhlAn**)
3. Functional analyses with metabolic assignation and pathway reconstruction (**HUMAnN2**)
4. Functional and taxonomic combination with developed tools combining HUMAnN2 and MetaPhlAn2 outputs

It is available with 4 versions, given the input

1. Simple files: [Single-end](https://metagenomics.usegalaxy.eu/u/berenice/w/asaim-shotgun-workflow) or [paired-end](https://metagenomics.usegalaxy.eu/u/berenice/w/asaim---shotgun-workflow-for-paired-end-data)
2. Collection input files: [Single-end](https://metagenomics.usegalaxy.eu/u/berenice/w/asaim-shotgun-workflow-se-collection) or [paired-end](https://metagenomics.usegalaxy.eu/u/berenice/w/asaim---shotgun-workflow-for-paired-end-data-collection)

## Assembly of metagenomic data

To reconstruct genomes or to get longer sequences for further analysis, microbiota data needs to be assembled, using the recently developed metagenomics assemblers.

To help in this task, two workflows have been developed using two different well-performing assemblers:

- [MEGAHIT](https://metagenomics.usegalaxy.eu/u/berenice/w/asaim-metagenomic-assembly-with-megahit)

    It is currently the most efficent computationally assembler: it has the lowest memory and time consumption {% cite van2017assembling awad2017evaluating sczyrba2017critical %}. It produced some of the best assemblies (irrespective of sequencing coverage) with the fewest structural errors {% cite olson2017metagenomic %} and outperforms in recovering the genomes of closely related strains {% cite awad2017evaluating %}, but has a bias towards relatively low coverage genomes leading to a suboptimal assembly of high abundant community member genomes in very large datasets {% cite vollmers2017comparing %}

- [MetaSPAdes](https://metagenomics.usegalaxy.eu/u/berenice/w/asaim-metagenomic-assembly-with-metaspades)

    It is particularly optimal for high-coverage metagenomes {% cite van2017assembling %} with the best contig metrics {% cite greenwald2017utilization %} and produces few under-collapsed/over-collapsed repeats {% cite olson2017metagenomic %}

Both workflows consists of

1. Processing with quality control/trimming (**FastQC** and **Trim Galore!**)
2. Assembly with either **MEGAHIT** or **MetaSPAdes**
3. Estimation of the assembly quality statistics with **MetaQUAST**
4. Identification of potential assembly error signature with **VALET**
5. Determination of percentage of unmapped reads with **Bowtie2** combined with **MultiQC** to aggregate the results.

![ASaiM assembly workflows](https://metagenomics.usegalaxy.eu/assets/media/microbiome_assembly_wf.png)

## Analysis of metataxonomic data

To analyze amplicon data, the **Mothur** and **QIIME** tool suites are available there. We implemented the workflows described in tutorials of Mothur and QIIME websites, as example of amplicon data analyses as well as support for the training material. These workflows, as any workflows available there, can be adapted for a specific analysis or used as subworkflows by the users.

## ASaiM-MT: Optimized workflow for metatranscriptomics data analysis

While the shotgun workflow is suitable for both metagenomics and metatranscriptomics datasets, we also offer an enhanced workflow aimed specifically at metatranscriptomics data.

![ASaiM-MT workflow](https://metagenomics.usegalaxy.eu/assets/media/asaim/asaim-mt_workflow.png)

The workflow is divided into 4 parts:

1. **Preprocessing** - Process raw metatranscriptomics data to perform further analysis.
2. **Taxonomy Quantitation** - Assignment of taxonomy along with abundance values and visualization.
3. **Functional Quantitation** - metabolic assignment of identified functions and gene and pathway abundance annotation.
4. **Taxonomy-Function Quantitation** - combine taxonomy and functional quantitation values into relative abundance values at different levels such as e.g. the abundance of a pathway between phyla.

## Integrative meta-omics analysis - Metagenomics, Metatranscriptomics, Metaproteomics

The combination of metagenomics, -transcriptomics and -proteomics can provide a detailed understanding of which organisms occupy specific metabolic niches, how they interact, and how they utilize environmental nutrients. Commonly used omics tools spanning metagenomics, -transcriptomics and -proteomics has been adapted into an integrated meta-omics analysis pipeline:

- **Metagenomics**

    ![Magnus metagenomics workflow](https://metagenomics.usegalaxy.eu/assets/media/magnus/metagenomics.png)

- **Metatranscriptomics**

    ![Magnus metatranscriptomics workflow](https://metagenomics.usegalaxy.eu/assets/media/magnus/metatranscriptomics.png)

- **Metaproteomics**

    ![Magnus metaproteomics workflow](https://metagenomics.usegalaxy.eu/assets/media/magnus/metaproteomics.png)

- Integration of omics data using R

This pipeline has been applied to [deconvolute a highly efficient cellulose-degrading minimal consortium isolated and enriched from a biogas reactor in Fredrikstad, Norway]({% link _posts/2020-04-14-integrative-meta-omics.md %})

# References

{% bibliography --cited --prefix index-metagenomics --group_by none %}
