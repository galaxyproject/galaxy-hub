---
title: Galaxy Nanopore
---

<slot name="/bare/eu/usegalaxy/notices" />

<style>
  .nanogalaxy-toolkit {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(16rem, 0.8fr);
    gap: 1rem;
    align-items: stretch;
    margin: 1.5rem 0 2rem;
  }

  .nanogalaxy-tool-list {
    display: grid;
    gap: 1rem;
  }

  .nanogalaxy-tool-list section,
  .nanogalaxy-workflows article {
    background: #fff;
    border: 1px solid rgba(37, 83, 123, 0.14);
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px rgba(44, 49, 67, 0.08);
    padding: 1rem;
  }

  .nanogalaxy-tool-list h3 {
    font-size: 1rem;
    margin: 0 0 0.5rem;
  }

  .nanogalaxy-tool-list p,
  .nanogalaxy-workflows p {
    margin: 0.5rem 0 0;
  }

  .nanogalaxy-toolkit > img {
    align-self: center;
    width: min(100%, 26rem);
    margin: 0 auto;
  }

  .nanogalaxy-workflows {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
    gap: 1rem;
    margin: 1.5rem 0 2rem;
  }

  .nanogalaxy-workflows img {
    width: 100%;
    max-height: 16rem;
    object-fit: contain;
    margin: 0 auto 1rem;
  }

  @media (max-width: 767px) {
    .nanogalaxy-toolkit {
      grid-template-columns: 1fr;
    }
  }
</style>

![NanoGalaxy logo](/assets/media/usegalaxy/nanopore/nanogalaxy_logo.png)

Welcome to **NanoGalaxy** -- a webserver to process, analyse and visualize Oxford Nanopore Technologies (ONT) data and similar long-reads technologies.

# Get started

Are you new to Galaxy, or returning after a long time, and looking for help to get started?
Take [a guided tour](https://nanopore.usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.

Check also the standard but customizable [workflows](#workflows) available there.

# Tools

A collection of best practice and popular tools are integrated (and are expanding) in this custom Galaxy instance. The ONT-oriented and -specific subset includes:

<div class="nanogalaxy-toolkit">
<div class="nanogalaxy-tool-list">
<section>
<h3>Polishing, QC and preprocessing</h3>
<p><a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fporechop%2Fporechop" target="_top" title="Porechop">Porechop</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Ffiltlong%2Ffiltlong" target="_top" title="Filtlong">Filtlong</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fnanopolish_variants%2Fnanopolish_variants" target="_top" title="Nanopolish">Nanopolish</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fporetools_qualdist%2Fporetools_qualdist" target="_top" title="Poretools">Poretools</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/medaka_consensus/medaka_consensus/" target="_top" title="Medaka">Medaka</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fmultiqc%2Fmultiqc%2F" target="_top" title="MultiQC">MultiQC</a></p>
</section>
<section>
<h3>Genome assembly</h3>
<p><a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fminimap2%2Fminimap2" target="_top" title="Minimap2">Minimap2</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fminiasm" target="_top" title="Miniasm">Miniasm</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fracon%2Fracon" target="_top" title="Racon">Racon</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fflye%2Fflye" target="_top" title="Flye">Flye</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Funicycler%2Funicycler" target="_top" title="Unicycler">Unicycler</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fwtdbg%2Fwtdbg%2F" target="_top" title="Wtdbg2">Wtdbg2</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fcanu%2Fcanu" target="_top" title="Canu">Canu</a></p>
</section>
<section>
<h3>Visualisation</h3>
<p><a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fnanoplot%2Fnanoplot" target="_top" title="Nanoplot">Nanoplot</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fbandage%2Fbandage_image" target="_top" title="Bandage">Bandage</a></p>
</section>
<section>
<h3>Taxonomy and metagenomics</h3>
<p><a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fplasflow%2FPlasFlow" target="_top" title="PlasFlow">PlasFlow</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fnml%2Fstaramr%2Fstaramr_search" target="_top" title="Staramr">Staramr</a>, <a href="https://nanopore.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fkraken2%2Fkraken2" target="_top" title="Kraken2">Kraken2</a></p>
</section>
</div>
<img src="/assets/media/usegalaxy/nanopore/nanogalaxy_toolkit.png" alt="NanoGalaxy toolkit" />
</div>

# Tutorials

We are passionate about training. So we are working in close collaboration with the [Galaxy Training Network (GTN)](https://galaxyproject.org/teach/gtn/) to develop training materials of data analyses based on Galaxy (Batut et al. 2017). These materials hosted on the GTN GitHub repository are available online at [https://training.galaxyproject.org](https://training.galaxyproject.org).

# Workflows

To orchestrate tools and help users with their analyses, some best practice workflows are prepared and available for all users.
The workflows can be extended using similar and alternative combinations using the Galaxy workflow editor.

The workflows are available in the [Shared Workflows View](https://nanopore.usegalaxy.eu/workflows/list_published) and are labeled with "**_ONT_**".

<div class="nanogalaxy-workflows">
<article>
<a href="https://nanopore.usegalaxy.eu/u/milad/w/nanopolish-variants-tutorial"><img src="/assets/media/usegalaxy/nanopore/nanogalaxy-nanopolish.png" alt="Nanopolish workflow" /></a>
<p>Basic workflows inspired by the Nanopolish tutorials</p>
<p><a href="https://usegalaxy.eu/u/milad/h/nanopolish-tutorial">History</a> <a href="https://nanopore.usegalaxy.eu/u/milad/w/nanopolish-variants-tutorial">Workflow</a></p>
</article>
<article>
<a href="https://nanopore.usegalaxy.eu/u/milad/w/ont-assembly-flye-ahrens"><img src="/assets/media/usegalaxy/nanopore/nanogalaxy-ahrens.png" alt="Ahrens et. al workflow" /></a>
<p>Genome assembly: Flye-based WF for highly repetitive genomes [Schmid et al. NAR 2018]</p>
<p><a href="https://usegalaxy.eu/u/milad/h/ahrens-nanopore-gmmap">History</a> <a href="https://nanopore.usegalaxy.eu/u/milad/w/ont-assembly-flye-ahrens">Workflow</a></p>
</article>
<article>
<a href="https://usegalaxy.eu/u/milad/w/workflow-wick-etal-ont"><img src="/assets/media/usegalaxy/nanopore/nanogalaxy-wick.png" alt="Wick et. al workflow" /></a>
<p>Genome assembly: Unicycler-based WF for Klebsiella pneumoniae [Wick et al. Microbial genomics 2017]</p>
<p><a href="https://usegalaxy.eu/u/milad/h/wick-etal-nanopore">History</a> <a href="https://usegalaxy.eu/u/milad/h/wick-etal-nanopore">Workflow</a></p>
</article>
<article>
<a href="https://nanopore.usegalaxy.eu/u/milad/w/metagenomics-krakan2"><img src="/assets/media/usegalaxy/nanopore/nanogalaxy-kraken.png" alt="Metagenomics workflow" /></a>
<p>Metagenomics: taxa classification</p>
<p><a href="https://usegalaxy.eu/u/milad/h/nanoporebeerdecodechimaytriple">History</a> <a href="https://nanopore.usegalaxy.eu/u/milad/w/metagenomics-krakan2">Workflow</a></p>
</article>
</div>

---
