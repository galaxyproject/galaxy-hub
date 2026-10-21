---
title: Galaxy Assembly
components: true
---

<slot name="/bare/eu/usegalaxy/notices" />

<img src="/assets/media/usegalaxy/assembly/logo_assembly.png" alt="Anna's hummingbird photo courtesy of VJAnderson" style="float: left; width: 7rem; height: auto; margin: 0 2rem 1rem 0;" />

# Welcome to Galaxy for Genome Assembly

The **Genome Assembly Workbench** is a comprehensive set of analysis tools and consolidated workflows to assist in Genome Assembly.
The workbench is based on the [Galaxy framework](https://galaxyproject.org),
which guarantees simple access, easy extension, flexible adaption to personal and security needs, and sophisticated analyses independent of command-line knowledge.

## Vertebrate Genomes Project

The workbench is optimized to include all data, tools, and workflows associated with the **[Vertebrate Genomes Project (VGP)](https://vertebrategenomesproject.org/)**. All raw data published by the VGP is available from the remote data repository **Genome Ark** in the data uploader. The VGP assembly workflows are available from the **Workflows** tab within **Shared Data**. As new assemblies are generated, they will appear in **Histories** in the **Shared Data** tab. Currently, we have assembled **<b>{/* GENOME_COUNT */}23{/* /GENOME_COUNT */}</b>** genomes.

## Human Pangenome Reference Project

The workbench has partnered with the **[Human Pangenome Reference Consortium (HPRC)](https://humanpangenome.org/)** to provide the latest genome assembly resources for the generation of high-quality diploid reference genomes. High-quality human datasets are available through the consortium, including multiple datatypes for the [HG002](https://github.com/human-pangenomics/HG002_Data_Freeze_v1.0) benchmark and dozens of individuals from the [1000 Genomes Project](https://github.com/human-pangenomics/HPP_Year1_Assemblies). All data can directly be imported in Galaxy as input to the workflows.

# Content

- [Vertebrate Genomes Project](#vertebrate-genomes-project)
- [Human Pangenome Reference Project](#human-pangenome-reference-project)
- [Get started](#get-started)
- [VGP assembly training](#vgp-assembly-training)
  - [Additional training material](#additional-training-material)
- [Partners](#partners)

# Get started

Are you new to Galaxy, or returning after a long time, and looking for help to get started? Take a
[**guided tour**](https://assembly.usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.

# VGP assembly training

As a result of a collaboration with the VGP team, the Galaxy Training Network has made available two trainings which goal is to describe the VGP pipeline through two complementary approaches: a step-by-step version, and a workflow-focused short version. In the extended version, each of the steps required to run the VGP pipeline is descussed in detail, with particular attention to the algorithms and parameters. On the other hand, the short version provides a quick walkthrough on how the workflows can be used to rapidly assemble a genome using the VGP pipeline with the Galaxy Workflow System.

<center class="d-flex gap-2 flex-wrap justify-center">
  <a href="https://training.galaxyproject.org/training-material/topics/assembly/tutorials/vgp_genome_assembly/tutorial.html" target="_blank">
    <button type="button" class="btn btn-primary btn-lg">VGP Step-by-Step Training</button>
  </a>
  <a href="https://training.galaxyproject.org/training-material/topics/assembly/tutorials/vgp_workflow_training/tutorial.html" target="_blank">
    <button type="button" class="btn btn-primary btn-lg">VGP Workflow-Focused Training</button>
  </a>
  <a href="https://assembly.usegalaxy.eu/u/gallardoalba/h/vgp-example-history">
    <button type="button" class="btn btn-primary btn-lg">Open example history</button>
  </a>
</center>

<br />

## Additional training material

All relevant materials for [assembly-related data analysis](https://training.galaxyproject.org/training-material/search?query=assembly) can also be found within the GTN.

| Lesson                                                    | Slides                                                                                                                                                                                                                                                                                                 | Hands-on                                                                                                                                                                                                | Input dataset                                                   | Workflows                                                                                                                                     | Galaxy History                                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Welcome and introduction to Galaxy                        | [<Icon name="presentation" />](https://training.galaxyproject.org/training-material/topics/introduction/tutorials/galaxy-intro-short/slides.html) / [<Icon name="video" />](https://training.galaxyproject.org/training-material/videos/watch.html?v=introduction/tutorials/galaxy-intro-short/slides) |                                                                                                                                                                                                         |                                                                 |                                                                                                                                               |
| An Introduction to Genome Assembly                        | [<Icon name="presentation" />](https://training.galaxyproject.org/training-material/topics/assembly/tutorials/general-introduction/tutorial.html)                                                                                                                                                      |                                                                                                                                                                                                         |                                                                 |                                                                                                                                               |
| A deeper look into Genome Assembly algorithms             | [<Icon name="presentation" />](https://training.galaxyproject.org/training-material/topics/assembly/tutorials/algorithms-introduction/slides.html)                                                                                                                                                     |                                                                                                                                                                                                         |                                                                 |                                                                                                                                               |
| Quality Control                                           | [<Icon name="presentation" />](https://training.galaxyproject.org/training-material/topics/sequence-analysis/tutorials/quality-control/slides.html) / [<Icon name="video" />](https://youtu.be/BWonTPS4zB8)                                                                                            | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/sequence-analysis/tutorials/quality-control/tutorial.html) / [<Icon name="video" />](https://youtu.be/QJRlX2hWDKM) | [<Icon name="files" />](https://doi.org/10.5281/zenodo.61771)   | [<Icon name="share-2" />](https://training.galaxyproject.org/training-material/topics/sequence-analysis/tutorials/quality-control/workflows/) | [<Icon name="list" />](https://assembly.usegalaxy.eu/u/gallardoalba/h/quality-control) |
| Mapping                                                   | [<Icon name="presentation" />](https://training.galaxyproject.org/training-material/topics/sequence-analysis/tutorials/mapping/slides.html) / [<Icon name="video" />](https://youtu.be/7FhHb8EV3EU)                                                                                                    | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/sequence-analysis/tutorials/mapping/tutorial.html) / [<Icon name="video" />](https://youtu.be/1wm-62E2NkY)         | [<Icon name="files" />](https://doi.org/10.5281/zenodo.1324070) | [<Icon name="share-2" />](https://training.galaxyproject.org/training-material/topics/sequence-analysis/tutorials/mapping/workflows/)         | [<Icon name="list" />](https://assembly.usegalaxy.eu/u/gallardoalba/h/mapping)         |
| K-mer coverage                                            |                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                         |                                                                 | [<Icon name="share-2" />](https://assembly.usegalaxy.eu/u/delphine-l/w/kcov)                                                                  | [<Icon name="list" />](https://assembly.usegalaxy.eu/u/delphine-l/h/kcov-1)            |
| Salsa Scaffolding                                         |                                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                         |                                                                 | [<Icon name="share-2" />](https://assembly.usegalaxy.eu/u/delphine-l/w/salsa-scaffolding)                                                     | [<Icon name="list" />](https://assembly.usegalaxy.eu/u/delphine-l/h/salsa-scaffolding) |
| Chloroplast genome assembly                               | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/assembly/tutorials/chloroplast-assembly/tutorial.html)                                                                                                                                                            |                                                                                                                                                                                                         |                                                                 |                                                                                                                                               |
| De Bruijn Graph Assembly                                  | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/assembly/tutorials/debruijn-graph-assembly/tutorial.html)                                                                                                                                                         |                                                                                                                                                                                                         |                                                                 |                                                                                                                                               |
| Genome Assembly of MRSA using Illumina MiSeq Data         | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/assembly/tutorials/mrsa-illumina/tutorial.html)                                                                                                                                                                   |                                                                                                                                                                                                         |                                                                 |                                                                                                                                               |
| Genome Assembly of MRSA using Oxford Nanopore MinION Data | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/assembly/tutorials/mrsa-nanopore/tutorial.html)                                                                                                                                                                   |                                                                                                                                                                                                         |                                                                 |                                                                                                                                               |
| Making sense of a newly assembled genome                  | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/assembly/tutorials/ecoli_comparison/tutorial.html)                                                                                                                                                                |                                                                                                                                                                                                         |                                                                 |                                                                                                                                               |
| Unicycler Assembly                                        | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/assembly/tutorials/unicycler-assembly/tutorial.html)                                                                                                                                                              |                                                                                                                                                                                                         |                                                                 |                                                                                                                                               |
| SARS-CoV-2 assembly with removing human reads             | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/assembly/tutorials/assembly-with-preprocessing/tutorial.html)                                                                                                                                                     |                                                                                                                                                                                                         |                                                                 |                                                                                                                                               |

<br />

If you want to know more about the GTN or how to become part of the Galaxy community, check the videos below!

<center class="d-flex gap-2 flex-wrap justify-center">
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
    allowfullscreen>
  </iframe>
</center>

<br />

# Partners

This service is a joint project between different groups from the [Vertebrate Genomes Project (VGP)](https://vertebrategenomesproject.org), the [European Reference Genome Atlas project](https://vertebrategenomesproject.org/erga), the [Human Pangenome Reference Consortium (HPRC)](https://humanpangenome.org/), and the [Galaxy project](https://galaxyproject.org).
The service is part of the European Galaxy server and is maintained by the [RNA Bioinformatics Center (RBC)](https://www.denbi.de/network/rna-bioinformatics-center-rbc) as part of [de.NBI](https://www.denbi.de) and [ELIXIR](http://elixir-europe.org).

<div aria-label="Imaging partners" style="display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem 1.5rem; margin: 1.5rem 0;">
  <img alt="VGP" src="/assets/media/usegalaxy/assembly/vgp_logo.png" style="max-height: 3rem; width: auto; max-width: 11rem; object-fit: contain;" />
  <img alt="ERGA" src="/assets/media/usegalaxy/assembly/erga_logo.png" style="max-height: 3rem; width: auto; max-width: 11rem; object-fit: contain;" />
  <img alt="HPRC" src="/assets/media/usegalaxy/assembly/hprc_logo.png" style="max-height: 3rem; width: auto; max-width: 11rem; object-fit: contain;" />
</div>

<slot name="/eu/common/data-policy" />

<slot name="/bare/eu/usegalaxy/jobs" />
