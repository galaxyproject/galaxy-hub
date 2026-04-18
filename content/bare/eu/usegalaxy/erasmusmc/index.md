---
title: Galaxy Erasmus MC
---

<slot name="/bare/eu/usegalaxy/notices" />

<br/>

Welcome to the **Erasmus MC** Galaxy webserver.




# Get started

Are you new to Galaxy, or returning after a long time, and looking for help to get started? Take [a guided tour](https://nanopore.usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.

Check also the standard but customizable [workflows](#workflows) available there.

# Tools
<img src="https://erasmusmc.usegalaxy.eu/assets/media/nanogalaxy_toolkit.png" height="400px" alt="NanoGalaxy toolkit"/>

A collection of best practice and popular tools are integrated (and are expanding) in this custom Galaxy instance. The ONT-oriented and -specific subset includes:

- **Polishing, QC and preprocessing**
    - {% include tool.html id="Porechop" %}, {% include tool.html id="Filtlong" %}, {% include tool.html id="Nanopolish" %},  {% include tool.html id="Poretools" %}
- **Genome assembly**
    - {% include tool.html id="Minimap2" %}, {% include tool.html id="Miniasm" %}, {% include tool.html id="Racon" %}, {% include tool.html id="Racon" %}, {% include tool.html id="Flye" %}, {% include tool.html id="Unicycler" %}, {% include tool.html id="Wtdbg2" %}, {% include tool.html id="Canu" %}
- **Mapping**
    - {% include tool.html id="Minimap2" %},  {% include tool.html id="GraphMap" %}
- **Visualisation**
    - {% include tool.html id="Nanoplot" %},  {% include tool.html id="Bandage" %}
- **Taxonomy and metagenomics**
    - {% include tool.html id="PlasFlow" %},  {% include tool.html id="Staramr" %},  {% include tool.html id="Kraken2" %}



# Tutorials

We are passionate about training. So we are working in close collaboration with the [Galaxy Training Network (GTN)](https://galaxyproject.org/teach/gtn/) to develop training materials of data analyses based on Galaxy {% cite batut2017community %}. The NanoGalaxy training materials are under development and will be soon hosted on the GTN GitHub repository [https://training.galaxyproject.org](https://training.galaxyproject.org).


# Workflows

To orchestrate tools and help users with their analyses, some best practice workflows are prepared and become available. The workflows can be extended using similar and alternative combinations using the workflow editor.

The workflows are available in the [Shared Workflows](https://nanopore.usegalaxy.eu/workflows/list_published), with the label "***ONT***".

Some validated workflows:
- Basic workflows inspired by the Nanopolish tutorials
  <br/> [workflow](https://nanopore.usegalaxy.eu/u/milad/w/nanopolish-variants-tutorial)
<img src="https://erasmusmc.usegalaxy.eu/assets/media/nanogalaxy-nanopolish.png" width="400px" alt="NanoGalaxy Nanopolish"/>
- Genome assembly:
    - Flye-based WF for highly repetitive genomes [Schmid et al. NAR 2018]
    Shared history: https://nanopore.usegalaxy.eu/u/milad/h/ahrens-nanopore-graphmap-minimap
    <br/> [workflow](https://nanopore.usegalaxy.eu/u/milad/w/ont-assembly-flye-ahrens)
    <img src="https://erasmusmc.usegalaxy.eu/assets/media/nanogalaxy-ahrens.png" width="400px" alt="NanoGalaxy wf2"/>

    - Unicycler-based WF for Klebsiella pneumoniae (Illumina and ONT) [Wick et al.  Microbial genomics 2017]
    Shared history: https://nanopore.usegalaxy.eu/u/milad/h/wick-etal
- Metagenomics: taxa classification
    <br/> [workflow](https://nanopore.usegalaxy.eu/u/milad/w/metagenomics-krakan2)
    <img src="https://erasmusmc.usegalaxy.eu/assets/media/nanogalaxy-kraken.png" width="400px" alt="NanoGalaxy wf2"/>

