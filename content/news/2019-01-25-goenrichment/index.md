---
title: The GOEnrichment tool and tutorial are now available on Galaxy, by Daniel Sobral
date: '2019-01-25'
tags: [release]
location:
  name: Galaxy Europe
subsites: [eu, freiburg]
main_subsite: freiburg
contributions:
  authorship:
    - bgruening
  funding:
    - elixir-europe
---

<a href="https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/goenrichment/goenrichment/" target="_blank">GOEnrichment</a> is a tool for performing GO enrichment analysis of gene sets, such as those obtained from RNA-seq or Microarray experiments, to help characterize them at the functional level.
<a href="https://galaxyproject.github.io/training-material/topics/transcriptomics/tutorials/goenrichment/tutorial.html" target="_blank">A tutorial</a> for the tool is also available
at the <a href="https://galaxyproject.github.io/training-material/" target="_blank">Galaxy Project training website</a>.

`![](/assets/media/goenrichment_example.png)`

<a href="https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/goenrichment/goenrichment/" target="_blank">GOEnrichment</a> is flexible in that it allows the user to use any version of the <a href="http://www.geneontology.org/" target="_blank">Gene Ontology</a> and any <a href="http://www.geneontology.org/page/download-go-annotations" target="_blank">GO annotation</a> file they desire. To enable the use of <a href="http://www.geneontology.org/page/go-subset-guide" target="_blank">GO slims</a>,
it is accompanied by a sister tool <a href="https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/goslimmer/goslimmer/" target="_blank">GOSlimmer</a>, which can convert annotation files from full GO to any specified GO slim.
The tool features an optional graph clustering algorithm to reduce the redundancy in the set of enriched GO terms and simplify its output.

It was developed by the <a href="https://biodata.pt/" target="_blank">BioData.pt/ELIXIR-PT</a> team at the <a href="http://www.igc.gulbenkian.pt/" target="_blank">Instituto Gulbenkian de Ciência</a>.


This was also used as a case study to test the full pipeline of integrating a tool in Galaxy:
 * Integrating the GOEnrichment and GOSlimmer tools in <a href="https://bioconda.github.io/contribute-a-recipe.html" target="_blank">Bioconda</a>
 * Wrapping the tools for Galaxy, and integrate them in the <a href="https://github.com/galaxyproject/tools-iuc/" target="_blank">IUC tool collection</a>
 * Writing the tutorial and integrate it in the official <a href="https://github.com/galaxyproject/training-material" target="_blank">Galaxy tutorial repository</a>

