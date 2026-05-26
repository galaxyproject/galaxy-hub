---
title: Spatial Omics Galaxy
---

<slot name="/bare/eu/usegalaxy/notices" />

# Welcome to the Spatial Omics Galaxy

![](/assets/media/usegalaxy/spatialomics/spatial_omics_banner.jpg)

The Spatial Omics Galaxy is a hub for all tools related to the analysis of highly multiplexed image-based and sequenced-based spatial analysis. This is a combined effort by the Spatial2Galaxy project and the Goecks Laboratory members. We welcome any suggestions or requests for making tools related to Spatial Omics analysis available on this Galaxy instance. We also welcome contributions to the development of new tools, workflows, or trainings!

This server currently features the individual components of the [MCMICRO](https://mcmicro.org/) pipeline, including [BaSiC](https://github.com/ohsu-comp-bio/basic-illumination) for illumination correction, [ASHLAR](https://github.com/ohsu-comp-bio/ashlar) for stitching and registration, [Coreograph](https://github.com/ohsu-comp-bio/UNetCoreograph) to dearray tissue microarrays (TMAs), [UnMICST](https://github.com/ohsu-comp-bio/UnMicst) to create cell or nucleai probability maps, [S3segmenter](https://github.com/ohsu-comp-bio/S3segmenter) for nucleai and cell segmentation and [MCQuant](https://github.com/ohsu-comp-bio/quantification) for feature quantification. More tools for image analysis outside the MCMICRO ecosystem will be added in the future.

Several spatial transcriptomics data formats and analysis tools have been integrated into Galaxy as part of the [Spatial2Galaxy ELIXIR Commissioned Service](https://elixir-europe.org/how-we-work/scientific-programme/science/cmr/spatial2).

# Get started

Are you new to Galaxy, or returning after a long time, and looking for help to get started?
Take [a guided tour](https://spatialomics.usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.

# Tools available
Here, we outline all the Galaxy tools that are relevant in the context of spatial omics data analysis.

## Spatial Datatypes and Utilities

The `SpatialData` datatype and utilities for reading, writing, manipulating and plotting SpatialData objects.

Tool | Description
--- | ---
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/spatialdata_io/spatialdata_io/0.7.2+galaxy1" target="_top" title="spatialdata_io">spatialdata_io</a> | Load common spatial omics formats into SpatialData
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/spatialdata_operation/spatialdata_operation/0.7.2+galaxy1" target="_top" title="spatialdata_operation">spatialdata_operation</a> | Perform operations on SpatialData objects
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/seurat_create/seurat_create/5.4.0+galaxy3" target="_top" title="seurat_create">seurat_create</a> | Create Seurat objects from Xenium spatial data

## Segmentation and Preprocessing

Tools for segmenting and pre-processing the spatial transcriptomics data into SpatialData objects.

Tool | Description
--- | ---
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/spapros_selection/spapros_selection/0.1.5+galaxy0" target="_top" title="spapros_selection">spapros_selection</a> | Selection of marker genes with spapros
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/spapros_evaluation/spapros_evaluation/0.1.5+galaxy0" target="_top" title="spapros_evaluation">spapros_evaluation</a> | Evaluation of marker genes with spapros
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/bgruening/vpt_segment/vpt_segment/1.3.0+galaxy4" target="_top" title="vpt_segment">vpt_segment</a> | Vizgen VPT - Segment cells and refine MERSCOPE experiments
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/bgruening/vpt_extract/vpt_extract/1.3.0+galaxy4" target="_top" title="vpt_extract">vpt_extract</a> | Vizgen VPT - Extract image patches from the mosaic image at the specified coordinates and size

## Spatial Downstream Analysis

Tools for spatial transcriptomics downstream analysis:

Tool | Description
--- | ---
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/goeckslab/squidpy_spatial/squidpy_spatial/1.5.0+galaxy2" target="_top" title="squidpy_spatial">squidpy_spatial</a> | Analyze and visualize spatial multi-omics data with Squidpy
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/spacexr_rctd/spacexr_rctd/2.2.1+galaxy0" target="_top" title="spacexr_rctd">spacexr_rctd</a> | Robust Cell Type Decomposition, or RCTD, is a statistical method for learning cell types from spatial transcriptomics data
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/spacexr_cside/spacexr_cside/2.2.1+galaxy0" target="_top" title="spacexr_cside">spacexr_cside</a> | Cell type-Specific Inference of Differential Expression, or CSIDE, is part of the spacexr R package for learning cell type-specific differential expression from spatial transcriptomics data
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/liana_methods/liana_methods/1.7.1+galaxy0" target="_top" title="liana_methods">liana_methods</a> | Liana ligand_receptor inference and local bivariate spatial metrics for single-cell or spatial data
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/liana_misty/liana_misty/1.7.1+galaxy0" target="_top" title="liana_misty">liana_misty</a> | Liana MISTy learn spatial relationships with multi-view modelling
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/liana_multi/liana_multi/1.7.1+galaxy0" target="_top" title="liana_multi">liana_multi</a> | Liana multi-sample and multi-condition analysis
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/liana_resource/liana_resource/1.7.1+galaxy0" target="_top" title="liana_resource">liana_resource</a> | Liana Resource prior knowledge and ligand-receptor resources
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/liana_utils/liana_utils/1.7.1+galaxy0" target="_top" title="liana_utils">liana_utils</a> | LIANA utility functions for data transformation and preprocessing

## Cell Annotation & Feature Selection

Tools for marker gene identification and cell-type annotation:

Tool | Description
--- | ---
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/cosg/cosg/1.0.1+galaxy0" target="_top" title="cosg">cosg</a> | COSG is a cosine similarity-based method for more accurate and scalable marker gene identification
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/celltypist/celltypist/1.7.1+galaxy0" target="_top" title="celltypist">celltypist</a> | CellTypist is an automated cell type annotation tool 

## Plotting and Visualization

Tool | Description
--- | ---
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/spatialdata_plot/spatialdata_plot/0.7.2+galaxy1" target="_top" title="spatialdata_plot">spatialdata_plot</a> | Rich static plotting from SpatialData objects
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/seurat_plot/seurat_plot/5.4.0+galaxy2" target="_top" title="seurat_plot">seurat_plot</a> | Visualize spatial clusters and features from Seurat objects
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/bellavista_prepare/bellavista_prepare/0.0.2+galaxy1" target="_top" title="bellavista_prepare">bellavista_prepare</a> | Prepare large images for bellavista spatial visualizer
<a href="https://spatialomics.usegalaxy.eu/?tool_id=interactive_tool_bellavista" target="_top" title="interactive_tool_bellavista">interactive_tool_bellavista</a> | Interactive visualization for imaging-based spatial transcriptomics
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/goeckslab/squidpy_scatter/squidpy_scatter/1.5.0+galaxy2" target="_top" title="squidpy_scatter">squidpy_scatter</a> | Create spatial scatterplot with Squidpy
<a href="https://spatialomics.usegalaxy.eu/?tool_id=interactive_tool_cellxgene_vip" target="_top" title="interactive_tool_cellxgene_vip">interactive_tool_cellxgene_vip</a> | Interactive CELLxGENE VIP visualization for scRNA-seq, spatial transcriptomics, and multiome data
<a href="https://spatialomics.usegalaxy.eu/?tool_id=interactive_tool_napari" target="_top" title="interactive_tool_napari">interactive_tool_napari</a> | Interactive exploration and annotation of spatial omics data with napari
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/goeckslab/vitessce_spatial/vitessce_spatial/3.5.1+galaxy3" target="_top" title="vitessce_spatial">vitessce_spatial</a> | Vitessce Visual Integration Tool for the Exploration of Spatial Single-Cell Experiments
<a href="https://spatialomics.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/liana_plot/liana_plot/1.7.1+galaxy0" target="_top" title="liana_plot">liana_plot</a>  | Liana Plot visualize ligand-receptor interactions

## MCMICRO core tools

All of the Galaxy tools for MCMICRO have been developed by the [Goecks lab](https://www.ohsu.edu/people/jeremy-goecks-phd) at the [Oregon Health and Science University Computational Biology](https://github.com/ohsu-comp-bio).

Tool | Description | Reference
--- | --- | ---
<a href="https://spatialomics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fperssond%2Fbasic_illumination%2Fbasic_illumination%2F" target="_top" title="basic_illumination">basic_illumination</a> | BaSiC shading correction for use with Ashlar| [Peng et al. 2017](https://www.nature.com/articles/ncomms14836)
<a href="https://spatialomics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fperssond%2Fashlar%2Fashlar%2F" target="_top" title="ashlar">ashlar</a> | ASHLAR: Alignment by Simultaneous Harmonization of Layer/Adjacency Registration| [Muhlich et al. 2021](https://www.biorxiv.org/content/10.1101/2021.04.20.440625v1.full)
<a href="https://spatialomics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fperssond%2Fcoreograph%2Funet_coreograph%2F" target="_top" title="coreograph">coreograph</a> | Dearray of Tissue Microarrays | [Coreograph Github](https://github.com/ohsu-comp-bio/UNetCoreograph)
<a href="https://spatialomics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fperssond%2Funmicst%2Funmicst%2F" target="_top" title="unmicst">unmicst</a> | UnMICST - Universal Models for Identifying Cells and Segmenting Tissue| [UnMICST info](https://labsyspharm.github.io/UnMICST-info/)
<a href="https://spatialomics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fperssond%2Fs3segmenter%2Fs3segmenter%2F" target="_top" title="s3segmenter">s3segmenter</a> | S3segmenter: A Matlab-based set of functions that generates single cell (nuclei and cytoplasm) label masks | [S3Segmenter github](https://github.com/HMS-IDAC/S3segmenter)
<a href="https://spatialomics.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fperssond%2Fquantification%2Fquantification%2F" target="_top" title="quantification">quantification</a> | MCQuant: Single cell quantification| [MCQUant github](https://github.com/labsyspharm/quantification#single-cell-quantification)


# Workflows available

The end-to-end spatial transcriptomics workflow that supports both image-based and sequence-based protocols:
[Spatial Transcriptomics Analysis in Galaxy](https://workflowhub.eu/workflows/2174)

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
- [Amirhossein Naghsh Nilchi](https://github.com/nilchia)
- [Khaled Jumah](https://github.com/khaled196)
- [Nicola Soranzo](https://github.com/nsoranzo)
- [Pavankumar Videm](https://github.com/pavanvidem)

# Spatial2Galaxy Partners

| Partners | Description | People involved |
|----------|-------------|-----------------|
| [Erasmus Medical Center](https://www.erasmusmc.nl/en/research/groups/pathology-stubbs) | Implementation and validation of ST toolset | Andrew Stubbs, Myrthe van Baardwijk |
| [Berlin Institute of Health at Charité](https://www.hidih.org/research/computational-oncology) | Catalogue ST toolset and use cases | Naveed Ishaque | 
| [University of Bradford](https://www.bradford.ac.uk) | Develop Spatial2Galaxy tutorial suite and deliver training |  Krzysztof Poterlowicz, Khaled Jum'ah |
| [University of Freiburg](https://galaxyproject.org/freiburg/people/) | Development of Spatial2Galaxy portal, tools and workflows | Björn Grüning, Amirhossein Naghsh Nilchi, Pavankumar Videm |
| [Earlham Institute](https://www.earlham.ac.uk/scientific-group/papatheodorou-group) | Develop Galaxy Demonstrator user case | Irene Papatheodorou, Nicola Soranzo |
