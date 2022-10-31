---
title: gProfiler is published and running on usegalaxy.eu
date: '2019-11-20'
tease: A toolset for functional enrichment analysis and conversions of gene lists.
tags: [tools]
subsites: [eu, freiburg, global, us]
main_subsite: freiburg
---

[gProfiler](https://biit.cs.ut.ee/gprofiler) is a toolset for functional enrichment analysis and conversions of gene lists.

Biological data analysis often deals with lists of genes arising from various studies. The gProfiler toolset is widely used for finding biological categories enriched in gene lists, conversions between gene identifiers and mappings to their orthologs. The mission of gProfiler is to provide a reliable service based on up-to-date high quality data in a convenient manner across many evidence types, identifier spaces and organisms.

gProfiler relies on data retrieved from Ensembl database and fungi, plants or metazoa specific versions of Ensembl Genomes, and parasite specific data from WormBase ParaSite. In addition to Gene Ontology, supported data sources include KEGG, Reactome, WikiPathways, TRANSFAC, miRTarBase, Human Protein Atlas, CORUM and HP.

gProfiler supports close to [500 organisms](https://biit.cs.ut.ee/gprofiler/page/organism-list) and accepts [hundreds of identifier types](https://biit.cs.ut.ee/gprofiler/page/namespaces-list).

gProfiler has been supporting developers by offering a standardized access through public APIs. The usage of APIs was simplified by wrapping them into Python and R packages. The latter, [gprofiler2](https://CRAN.R-project.org/package=gprofiler2) (which was published as a Conda Forge package named [r-gprofiler2](https://anaconda.org/conda-forge/r-gprofiler2)), was wrapped to be used as a set of Galaxy tools:

- [gProfiler GOSt](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/gprofiler_gost/gprofiler_gost/) performs functional enrichment analysis, also known as over-representation analysis (ORA) or gene set enrichment analysis, on input gene list; in addition to the detailed tabular results, it can also create a Plotly graph with the Manhattan plot very similar to the one shown by the [web tool](https://biit.cs.ut.ee/gprofiler/).
- [gProfiler Convert](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/gprofiler_convert/gprofiler_convert/) enables to convert between various gene, protein, microarray probe and numerous other types of namespaces
- [gProfiler Orth](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/gprofiler_orth/gprofiler_orth/) translates gene identifiers between organisms
- [gProfiler SNPense](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/gprofiler_snpense/gprofiler_snpense/) maps SNP rs-codes to gene names, chromosomal coordinates and variant effects
- [gProfiler Random](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/gprofiler_random/gprofiler_random/) fetches a (not actually random) list of gene identifiers; useful for testing purposes.

gProfiler Galaxy toolset was admitted to the [Galaxy Tools IUC](https://galaxyproject.org/iuc). It is distributed via the ToolShed and can be installed as a bundle with the [gProfiler tool suite](https://toolshed.g2.bx.psu.edu/view/iuc/suite_gprofiler/) repository.

<div class="multiple-img">
    <img src="/assets/media/2019-11-20-gProfiler.png" width="800px" alt="gProfile graphical abstract" />
</div>

gProfiler is part of the ELIXIR infrastructure. It belongs to the portfolio of [ELIXIR Recommended Interoperability Resources](https://elixir-europe.org/platforms/interoperability/rirs).

gProfiler is developed and maintained in Estonia, at the [University of Tartu](https://www.ut.ee/en), [Institute of Computer Science](https://www.cs.ut.ee/en), [BIIT research group](https://biit.cs.ut.ee). It is an [ELIXIR Estonia](https://elixir.ut.ee) service.


## Credit

<embed src="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6602461/pdf/gkz369.pdf" width="100%" height="700" type='application/pdf'>
