---
title: Galaxy Erasmus MC
---

<slot name="/bare/eu/usegalaxy/notices" />

Welcome to the **Erasmus MC** Galaxy webserver.

# Get started

Are you new to Galaxy, or returning after a long time, and looking for help to get started? Take [a guided tour](https://nanopore.usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.

Check also the standard but customizable [workflows](#workflows) available there.

# Tools
<img src="/assets/media/usegalaxy/nanopore/nanogalaxy_toolkit.png" class="bare-page-image" alt="NanoGalaxy toolkit" />

A collection of best practice and popular tools are integrated (and are expanding) in this custom Galaxy instance. The ONT-oriented and -specific subset includes:

- **Polishing, QC and preprocessing**
    - Porechop, Filtlong, Nanopolish, Poretools
- **Genome assembly**
    - Minimap2, Miniasm, Racon, Flye, Unicycler, Wtdbg2, Canu
- **Mapping**
    - Minimap2, GraphMap
- **Visualisation**
    - Nanoplot, Bandage
- **Taxonomy and metagenomics**
    - PlasFlow, Staramr, Kraken2



# Tutorials

We are passionate about training. We are working in close collaboration with the [Galaxy Training Network (GTN)](https://training.galaxyproject.org) to develop training materials for data analyses based on Galaxy. The NanoGalaxy training materials are under development and will be soon hosted on the GTN GitHub repository [https://training.galaxyproject.org](https://training.galaxyproject.org).


# Workflows

To orchestrate tools and help users with their analyses, some best practice workflows are prepared and become available. The workflows can be extended using similar and alternative combinations using the workflow editor.

The workflows are available in the [Shared Workflows](https://nanopore.usegalaxy.eu/workflows/list_published), with the label "***ONT***".

Some validated workflows:
- Basic workflows inspired by the Nanopolish tutorials
  [workflow](https://nanopore.usegalaxy.eu/u/milad/w/nanopolish-variants-tutorial)
  <img src="/assets/media/usegalaxy/nanopore/nanogalaxy-nanopolish.png" class="bare-page-image" alt="NanoGalaxy Nanopolish" />
- Genome assembly:
    - Flye-based WF for highly repetitive genomes [Schmid et al. NAR 2018]
    Shared history: https://nanopore.usegalaxy.eu/u/milad/h/ahrens-nanopore-graphmap-minimap
    [workflow](https://nanopore.usegalaxy.eu/u/milad/w/ont-assembly-flye-ahrens)
    <img src="/assets/media/usegalaxy/nanopore/nanogalaxy-ahrens.png" class="bare-page-image" alt="NanoGalaxy Ahrens workflow" />

    - Unicycler-based WF for Klebsiella pneumoniae (Illumina and ONT) [Wick et al.  Microbial genomics 2017]
    Shared history: https://nanopore.usegalaxy.eu/u/milad/h/wick-etal
- Metagenomics: taxa classification
    [workflow](https://nanopore.usegalaxy.eu/u/milad/w/metagenomics-krakan2)
    <img src="/assets/media/usegalaxy/nanopore/nanogalaxy-kraken.png" class="bare-page-image" alt="NanoGalaxy Kraken workflow" />

<style>
  .bare-page-image {
    display: block;
    max-width: min(100%, 28rem);
    height: auto;
    margin: 1rem auto;
  }
</style>
