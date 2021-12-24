---
title: "Samples"
description: "Samples used by Galaxy effort"
components: true
autotoc: false
---

## Current sample information

-----

We continuously analyze a subset of public read-level data. This subset contains high quality metadata that allows accurate variant calling by ensuring correct processing of variants contained within primer-annealing sites for datasets produced using ARTIC protocols. The current set of samples is produced by [COG-UK](https://www.ebi.ac.uk/ena/browser/view/PRJEB37886), [Estonian](https://www.ebi.ac.uk/ena/browser/view/PRJEB42961), [Greek](https://www.ebi.ac.uk/ena/browser/view/PRJEB44141), [Irish](https://www.ebi.ac.uk/ena/browser/view/PRJEB40277), and [South African](https://www.ebi.ac.uk/ena/browser/view/PRJNA636748) surveillance efforts. Figure below shows the temporal distribution of analyzed samples.

<vega-embed align="center" spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/time_line.json"/>

## Why not all data?

----


The current numbers for NCBI and EBI sequence read archives are in the millions (see graph below). 

<vega-embed align="center" spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/sra_heatmap_2d.json"/> 

Why not to analyze all data? Well ... essentially not a single dataset among these specifies metadata correctly. For example, look at the `library_construction_protocol` metadata field for all ampliconic (`library_strategy=="AMPLICON"`) data produced on Illumina platform (`instrument_platform=="ILLUMINA"`):

<vega-embed align="right" spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/sra_heatmap_1d.json"/> 

The **absolute majority** of the data does not specify anything at all (`None` on the X-axis), while the others (top 25 shown; see X-axis labels) are not that much more useful! Thus we do not exactly know how the data was generated and so we cannot reliably call variants!



