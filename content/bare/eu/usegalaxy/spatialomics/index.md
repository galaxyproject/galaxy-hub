---
title: Galaxy Spatial Omics
components: true
---

<slot name="/bare/eu/usegalaxy/notices" />

# Welcome to the Spatial OMICS Galaxy subdomain server


![](https://spatialomics.usegalaxy.eu/assets/media/spatial_omics_banner.jpg)

The SpatialOMICS Galaxy subdomain serves as a hub for all tools related to the analysis of highly-multiplexed image analysis. This server currently features the individual components of the [MCMICRO](https://mcmicro.org/) pipeline, including [BaSiC](https://github.com/ohsu-comp-bio/basic-illumination) for illumination correction, [ASHLAR](https://github.com/ohsu-comp-bio/ashlar) for stitching and registration, [Coreograph](https://github.com/ohsu-comp-bio/UNetCoreograph) to dearray tissue microarrays (TMAs), [UnMICST](https://github.com/ohsu-comp-bio/UnMicst) to create cell or nucleai probability maps, [S3segmenter](https://github.com/ohsu-comp-bio/S3segmenter) for nucleai and cell segmentation and [MCQuant](https://github.com/ohsu-comp-bio/quantification) for feature quantification. More tools for image analysis outside the MCMICRO ecosystem will be added in the future.

This subdomain is a collaborative effort and we welcome any suggestions or requests for making tools related to spatia OMICS analysis available on this server. We also welcome contributions to the development of new tools, workflows or trainings!

# Content




# Get started

Are you new to Galaxy, or returning after a long time, and looking for help to get started?
Take [a guided tour](https://spatialomics.usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.

# Tools available

## MCMICRO core tools

All of the Galaxy tools for MCMICRO have been developed by the [Goecks lab](https://www.ohsu.edu/people/jeremy-goecks-phd) at the [Oregon Health and Science University Computational Biology](https://github.com/ohsu-comp-bio).

Tool | Description | Reference
--- | --- | ---
{% include tool.html id="basic_illumination" %} | BaSiC shading correction for use with Ashlar| [Peng et al. 2017](https://www.nature.com/articles/ncomms14836)
{% include tool.html id="ashlar" %} | ASHLAR: Alignment by Simultaneous Harmonization of Layer/Adjacency Registration| [Muhlich et al. 2021](https://www.biorxiv.org/content/10.1101/2021.04.20.440625v1.full)
{% include tool.html id="coreograph" %} | Dearray of Tissue Microarrays | [Coreograph Github](https://github.com/ohsu-comp-bio/UNetCoreograph)
{% include tool.html id="unmicst" %} | UnMICST - Universal Models for Identifying Cells and Segmenting Tissue| [UnMICST info](https://labsyspharm.github.io/UnMICST-info/)
{% include tool.html id="s3segmenter" %} | S3segmenter: A Matlab-based set of functions that generates single cell (nuclei and cytoplasm) label masks | [S3Segmenter github](https://github.com/HMS-IDAC/S3segmenter)
{% include tool.html id="quantification" %} | MCQuant: Single cell quantification| [MCQUant github](https://github.com/labsyspharm/quantification#single-cell-quantification)


# Workflows available

Two workflows are currently available to process your samples using the MCMICRO Galaxy pipeline:

[MCMICRO Tissue Microarray Workflow](https://github.com/ohsu-comp-bio/cycIF-galaxy/blob/master/workflows/Galaxy-Workflow-MCMICRO_TMA_v1.0.0.ga)

[MCMICRO Whole Slide Tissue Workflow](https://github.com/ohsu-comp-bio/cycIF-galaxy/blob/master/workflows/Galaxy-Workflow-MCMICRO_Tissue_v1.0.0.ga)


# Contributors
- [Florian Wünnemann](https://github.com/FloWuenne)
- [Denis Schapiro](https://github.com/DenisSch)
- [Bjoern Gruening](https://github.com/bgruening)
- [Jeremy Goecks](https://github.com/jgoecks)
- [Cameron Watson](https://github.com/CameronFRWatson)
- [Allison Creason](https://github.com/alliecreason)
