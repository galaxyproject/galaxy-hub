---
title: Galaxy Nanopore
components: true
---

<slot name="/bare/eu/usegalaxy/notices" />

<br/>
<img src="https://nanopore.usegalaxy.eu/assets/media/nanogalaxy_logo.png" height="100px" alt="NanoGalaxy logo"/>

Welcome to **NanoGalaxy**  -- a webserver to process, analyse and visualize Oxford Nanopore Technologies (ONT) data and similar long-reads technologies.




# Get started

Are you new to Galaxy, or returning after a long time, and looking for help to get started?
Take [a guided tour](https://nanopore.usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.

Check also the standard but customizable [workflows](#workflows) available there.

# Tools

A collection of best practice and popular tools are integrated (and are expanding) in this custom Galaxy instance. The ONT-oriented and -specific subset includes:

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#dfe2e5;width:60%;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#dfe2e5;}
.tg .tg-0lax{text-align:center;vertical-align:top}
</style>
<div align="center">
<table class="tg" width="50%">
  <tr>
    <th class="tg-0lax">

    <div align="center">
        <b>Polishing, QC and preprocessing</b><br/>
        <br/>
        {% include tool.html id="Porechop" %}, {% include tool.html id="Filtlong" %}, {% include tool.html id="Nanopolish" %},  {% include tool.html id="Poretools" %},
        {% include tool.html id="Medaka" %}, {% include tool.html id="MultiQC" %}
    </div>
    </th>
    <th class="tg-0lax" rowspan="4" align="center">
    
        <img src="https://nanopore.usegalaxy.eu/assets/media/nanogalaxy_toolkit.png" height="400px" alt="NanoGalaxy toolkit"/>
    
    </th>
  </tr>
  <tr>
    <td class="tg-0lax">
        <div align="center"><b>Genome assembly</b><br/>
        <br/>
        {% include tool.html id="Minimap2" %}, {% include tool.html id="Miniasm" %}, {% include tool.html id="Racon" %}
        <br/>
        {% include tool.html id="Racon" %}, {% include tool.html id="Flye" %}, {% include tool.html id="Unicycler" %}, {% include tool.html id="Wtdbg2" %}, {% include tool.html id="Canu" %}
        </div>
    </td>
  </tr>

  <tr>
    <td class="tg-0lax">
        <div align="center"><b>Visualisation</b><br/>
        <br/>

        {% include tool.html id="Nanoplot" %},  {% include tool.html id="Bandage" %}
        </div>
    </td>
  </tr>
  <tr>
    <td class="tg-0lax">
        <div align="center"><b>Taxonomy and metagenomics</b><br/>
        <br/>
        {% include tool.html id="PlasFlow" %},  {% include tool.html id="Staramr" %},  {% include tool.html id="Kraken2" %}

        </div>
    </td>
  </tr>


</table>
</div>


# Tutorials

We are passionate about training. So we are working in close collaboration with the [Galaxy Training Network (GTN)](https://galaxyproject.org/teach/gtn/) to develop training materials of data analyses based on Galaxy {% cite batut2017community %}. These materials hosted on the GTN GitHub repository are available online at [https://training.galaxyproject.org](https://training.galaxyproject.org).

# Workflows

To orchestrate tools and help users with their analyses, some best practice workflows are prepared and available for all users.
The workflows can be extended using similar and alternative combinations using the Galaxy workflow editor.

The workflows are available in the [Shared Workflows View](https://nanopore.usegalaxy.eu/workflows/list_published) and are labeled with "***ONT***".


|:-----------------:|:----------------------------:|:-------------------:|:------------------:|
|                   |                              |                     |                    |
|  [![Nanopolish workflow](https://nanopore.usegalaxy.eu/assets/media/nanogalaxy-nanopolish.png)](https://nanopore.usegalaxy.eu/u/milad/w/nanopolish-variants-tutorial)                  | [![Ahrens et. al workflow](https://nanopore.usegalaxy.eu/assets/media/nanogalaxy-ahrens.png)](https://nanopore.usegalaxy.eu/u/milad/w/ont-assembly-flye-ahrens)                                 |  [![Wick et. al workflow ](https://nanopore.usegalaxy.eu/assets/media/nanogalaxy-wick.png)](https://usegalaxy.eu/u/milad/w/workflow-wick-etal-ont) | [![Metagenomics workflow](https://nanopore.usegalaxy.eu/assets/media/nanogalaxy-kraken.png)](https://nanopore.usegalaxy.eu/u/milad/w/metagenomics-krakan2) |
|  Basic workflows inspired by the Nanopolish tutorials | Genome assembly: Flye-based WF for highly repetitive genomes [Schmid et al. NAR 2018] | Genome assembly: Unicycler-based WF for Klebsiella pneumoniae [Wick et al.  Microbial genomics 2017]  | Metagenomics: taxa classification|
| [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/milad/h/nanopolish-tutorial) [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://nanopore.usegalaxy.eu/u/milad/w/nanopolish-variants-tutorial)  |  [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/milad/h/ahrens-nanopore-gmmap) [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://nanopore.usegalaxy.eu/u/milad/w/ont-assembly-flye-ahrens)                            |   [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/milad/h/wick-etal-nanopore) [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.eu/u/milad/h/wick-etal-nanopore)  | [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/milad/h/nanoporebeerdecodechimaytriple) [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://nanopore.usegalaxy.eu/u/milad/w/metagenomics-krakan2)           |





------

