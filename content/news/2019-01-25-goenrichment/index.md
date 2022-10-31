---
title: The GOEnrichment tool and tutorial are now available on Galaxy, by Daniel Sobral
date: '2019-01-25'
tags: [release]
location:
  name: Galaxy Europe
supporters:
- ELIXIR
authors: bgruening
authors_structured:
- github: bgruening
subsites: [eu, freiburg]
main_subsite: freiburg
---

[GOEnrichment](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/goenrichment/goenrichment/){:target="_blank"} is a tool for performing GO enrichment analysis of gene sets, such as those obtained from RNA-seq or Microarray experiments, to help characterize them at the functional level.
[A tutorial](https://galaxyproject.github.io/training-material/topics/transcriptomics/tutorials/goenrichment/tutorial.html){:target="_blank"} for the tool is also available
at the [Galaxy Project training website](https://galaxyproject.github.io/training-material/){:target="_blank"}.

`![](/assets/media/goenrichment_example.png)`

[GOEnrichment](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/goenrichment/goenrichment/){:target="_blank"} is flexible in that it allows the user to use any version of the [Gene Ontology](http://www.geneontology.org/){:target="_blank"} and any [GO annotation](http://www.geneontology.org/page/download-go-annotations){:target="_blank"} file they desire. To enable the use of [GO slims](http://www.geneontology.org/page/go-subset-guide){:target="_blank"},
it is accompanied by a sister tool [GOSlimmer](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/goslimmer/goslimmer/){:target="_blank"}, which can convert annotation files from full GO to any specified GO slim.
The tool features an optional graph clustering algorithm to reduce the redundancy in the set of enriched GO terms and simplify its output.

It was developed by the [BioData.pt/ELIXIR-PT](https://biodata.pt/){:target="_blank"} team at the [Instituto Gulbenkian de Ciência](http://www.igc.gulbenkian.pt/){:target="_blank"}.


This was also used as a case study to test the full pipeline of integrating a tool in Galaxy:
 * Integrating the GOEnrichment and GOSlimmer tools in [Bioconda](https://bioconda.github.io/contribute-a-recipe.html){:target="_blank"}
 * Wrapping the tools for Galaxy, and integrate them in the [IUC tool collection](https://github.com/galaxyproject/tools-iuc/){:target="_blank"}
 * Writing the tutorial and integrate it in the official [Galaxy tutorial repository](https://github.com/galaxyproject/training-material){:target="_blank"}

