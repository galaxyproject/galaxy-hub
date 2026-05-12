---
title: Galaxy Nanopore
---

<slot name="/bare/eu/usegalaxy/notices" />

<br/>
<img src="/assets/media/usegalaxy/nanopore/nanogalaxy_logo.png" height="100px" alt="NanoGalaxy logo"/>

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
        <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fporechop%2Fporechop" target="_top" title="Porechop">Porechop</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Ffiltlong%2Ffiltlong" target="_top" title="Filtlong">Filtlong</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fnanopolish_variants%2Fnanopolish_variants" target="_top" title="Nanopolish">Nanopolish</a>,  <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fporetools_qualdist%2Fporetools_qualdist" target="_top" title="Poretools">Poretools</a>,
        <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/medaka_consensus/medaka_consensus/" target="_top" title="Medaka">Medaka</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fmultiqc%2Fmultiqc%2F" target="_top" title="MultiQC">MultiQC</a>
    </div>
    </th>
    <th class="tg-0lax" rowspan="4" align="center">
    
        <img src="/assets/media/usegalaxy/nanopore/nanogalaxy_toolkit.png" height="400px" alt="NanoGalaxy toolkit"/>
    
    </th>
  </tr>
  <tr>
    <td class="tg-0lax">
        <div align="center"><b>Genome assembly</b><br/>
        <br/>
        <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fminimap2%2Fminimap2" target="_top" title="Minimap2">Minimap2</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fminiasm" target="_top" title="Miniasm">Miniasm</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fracon%2Fracon" target="_top" title="Racon">Racon</a>
        <br/>
        <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fracon%2Fracon" target="_top" title="Racon">Racon</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fflye%2Fflye" target="_top" title="Flye">Flye</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Funicycler%2Funicycler" target="_top" title="Unicycler">Unicycler</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fwtdbg%2Fwtdbg%2F" target="_top" title="Wtdbg2">Wtdbg2</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fcanu%2Fcanu" target="_top" title="Canu">Canu</a>
        </div>
    </td>
  </tr>

  <tr>
    <td class="tg-0lax">
        <div align="center"><b>Visualisation</b><br/>
        <br/>

        <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fnanoplot%2Fnanoplot" target="_top" title="Nanoplot">Nanoplot</a>,  <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fbandage%2Fbandage_image" target="_top" title="Bandage">Bandage</a>
        </div>
    </td>
  </tr>
  <tr>
    <td class="tg-0lax">
        <div align="center"><b>Taxonomy and metagenomics</b><br/>
        <br/>
        <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fplasflow%2FPlasFlow" target="_top" title="PlasFlow">PlasFlow</a>,  <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fnml%2Fstaramr%2Fstaramr_search" target="_top" title="Staramr">Staramr</a>,  <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fkraken2%2Fkraken2" target="_top" title="Kraken2">Kraken2</a>

        </div>
    </td>
  </tr>


</table>
</div>


# Tutorials

We are passionate about training. So we are working in close collaboration with the [Galaxy Training Network (GTN)](https://galaxyproject.org/teach/gtn/) to develop training materials of data analyses based on Galaxy (Batut et al. 2017). These materials hosted on the GTN GitHub repository are available online at [https://training.galaxyproject.org](https://training.galaxyproject.org).

# Workflows

To orchestrate tools and help users with their analyses, some best practice workflows are prepared and available for all users.
The workflows can be extended using similar and alternative combinations using the Galaxy workflow editor.

The workflows are available in the [Shared Workflows View](https://nanopore.usegalaxy.eu/workflows/list_published) and are labeled with "***ONT***".


|:-----------------:|:----------------------------:|:-------------------:|:------------------:|
|                   |                              |                     |                    |
|  [![Nanopolish workflow](/assets/media/usegalaxy/nanopore/nanogalaxy-nanopolish.png)](https://nanopore.usegalaxy.eu/u/milad/w/nanopolish-variants-tutorial)                  | [![Ahrens et. al workflow](/assets/media/usegalaxy/nanopore/nanogalaxy-ahrens.png)](https://nanopore.usegalaxy.eu/u/milad/w/ont-assembly-flye-ahrens)                                 |  [![Wick et. al workflow ](/assets/media/usegalaxy/nanopore/nanogalaxy-wick.png)](https://usegalaxy.eu/u/milad/w/workflow-wick-etal-ont) | [![Metagenomics workflow](/assets/media/usegalaxy/nanopore/nanogalaxy-kraken.png)](https://nanopore.usegalaxy.eu/u/milad/w/metagenomics-krakan2) |
|  Basic workflows inspired by the Nanopolish tutorials | Genome assembly: Flye-based WF for highly repetitive genomes [Schmid et al. NAR 2018] | Genome assembly: Unicycler-based WF for Klebsiella pneumoniae [Wick et al.  Microbial genomics 2017]  | Metagenomics: taxa classification|
| [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/milad/h/nanopolish-tutorial) [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://nanopore.usegalaxy.eu/u/milad/w/nanopolish-variants-tutorial)  |  [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/milad/h/ahrens-nanopore-gmmap) [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://nanopore.usegalaxy.eu/u/milad/w/ont-assembly-flye-ahrens)                            |   [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/milad/h/wick-etal-nanopore) [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://usegalaxy.eu/u/milad/h/wick-etal-nanopore)  | [![Galaxy history](https://img.shields.io/static/v1?label=history&message=view&color=blue)](https://usegalaxy.eu/u/milad/h/nanoporebeerdecodechimaytriple) [![Galaxy workflow](https://img.shields.io/static/v1?label=workflow&message=run&color=blue)](https://nanopore.usegalaxy.eu/u/milad/w/metagenomics-krakan2)           |





------

