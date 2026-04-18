---
title: Galaxy Human Cell Atlas
components: true
---

<slot name="/bare/eu/usegalaxy/notices" />

# Welcome to the Galaxy Human Cell Atlas project


![Human Cell Atlas](https://humancellatlas.usegalaxy.eu/assets/media/hca.png)

The [Human Cell Atlas](https://www.humancellatlas.org) Galaxy setup comprises of analysis tools and workflows for the analysis of Single Cell RNA-Seq data. It includes a module that connects to the Matrix Service API of the HCA's Data Coordination Platform that enables retrieval of gene expression matrices from any data sets in the Human Cell Atlas. The instance is based on the Galaxy framework, which guarantees simple access, easy extension, flexible adaption to personal and security needs, and sophisticated analyses independent of command-line knowledge.

This setup aims to give users access to as much granularity as possible in terms
of the downstream analysis steps provided by the major software for
single cell data analysis: Scanpy, SC3, Scater and Seurat. For each of these tools,
this Galaxy instance has decomposed modules for each the main functionalities:
ingestion from 10x/loom, filtering (by cells or genes), scaling, normalisation,
clustering, marker genes, and dimensionality reduction, among others. In the short
term we expect to have interoperability between these tools through the Loom exchange format.
Additionally, we provide specialised viewers for single cell clustering data:
UCSC CellBrowser and cellxgene interactive tool (contributed by the great Galaxy community).

Tools available under HCA-Single Cell section were mainly brought to Galaxy by
the [Gene Expression Team](https://www.ebi.ac.uk/about/people/irene-papatheodorou)
at [EMBL-EBI](https://www.ebi.ac.uk) and the [Teichmann Team](https://www.sanger.ac.uk/science/groups/teichmann-group) at the [Wellcome Sanger Institute](https://www.sanger.ac.uk/).


# Content



# Get started

Are you new to Galaxy, or returning after a long time, and looking for help to get started? Take [a guided tour](https://humancellatlas.usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.

# Available Workflows

Workflow | Description
--- | ---
[Human Cell Atlas - Scanpy - CellBrowser](https://humancellatlas.usegalaxy.eu/u/pmoreno/w/humancellatlas-scanpy-cellbrowser) | Retrieve data from the Human Cell Atlas matrix service, analysis with Scanpy and visualisation with UCSC CellBrowser
[EBI Single Cell Expression Atlas - Scanpy - CellBrowser](https://humancellatlas.usegalaxy.eu/u/pmoreno/w/atlas-scanpy-cellbrowser-imported-from-uploaded-file) | Retrieve expression matrices from Single Cell Expression Atlas, analysis with Scanpy and visualisation with UCSC CellBrowser
[EBI Single Cell Expression Atlas Scanpy Prod 1.3](https://humancellatlas.usegalaxy.eu/u/pmoreno/w/scanpy-prod-13-smart-imported-from-uploaded-file) | Workflow used for clustering data in the [release 6 to 9](https://www.ebi.ac.uk/gxa/sc/release-notes.html) of [Single Cell Expression Atlas](https://www.ebi.ac.uk/gxa/sc/home)
[EBI Single Cell Expression Atlas Tertiary Analysis Rel 10](https://humancellatlas.usegalaxy.eu/u/pmoreno/w/ebi-sc-expression-atlas-release-10-analysis-pipeline-scanpy-143) | Workflow used for clustering data in the [release 10](https://www.ebi.ac.uk/gxa/sc/release-notes.html) of [Single Cell Expression Atlas](https://www.ebi.ac.uk/gxa/sc/home)
[EBI Single Cell Expression Atlas Tertiary Analysis Rel 11](https://humancellatlas.usegalaxy.eu/u/pmoreno/w/ebi-sc-expression-atlas-release-11-analysis-pipeline) | Workflow used for clustering data in the [releases 11 and 12](https://www.ebi.ac.uk/gxa/sc/release-notes.html) of [Single Cell Expression Atlas](https://www.ebi.ac.uk/gxa/sc/home)
[EBI Single Cell Expression Atlas Tertiary Analysis Rel 13](https://humancellatlas.usegalaxy.eu/u/pmoreno/w/ebi-sc-expression-atlas-release-13-analysis-pipeline-scanpy-160---harmony-batch-correction) | Workflow used for downstream analysis in the [releases 13 to 15](https://www.ebi.ac.uk/gxa/sc/release-notes.html) of [Single Cell Expression Atlas](https://www.ebi.ac.uk/gxa/sc/home).



# Available tools

In this section we list all tools that have been integrated in the RNA workbench. The list is likely to grow as soon as further tools and workflows are contributed. To ease readability, we divided them into categories.

## Single Cell Galaxy Tools developed for the Human Cell Atlas

### Data retrieval from Single Cell data Repositories

Tool | Description | Reference
--- | --- | ---
{% include tool.html id="hca_matrix_downloader" %} | Human Cell Atlas Matrix Downloader retrieves expression matrices and metadata from the Human Cell Atlas. | [Regev et al. 2018](https://arxiv.org/abs/1810.05192)
{% include tool.html id="retrieve_scxa" %} | EBI SCXA Data Retrieval downloads expression matrices and metadata from the EBI Single Cell Expression Atlas (SCXA) | [Papatheodorou et al. 2018](https://doi.org/10.1093/nar/gkx1158)


10x files produced by these tools can be consumed by 10x reader modules in the tools below.

### Visualisation

Tool | Description | Reference
--- | --- | ---
{% include tool.html id="ucsc_cell_browser" %} | UCSC Cell Browser displays single-cell clusterized data in an interactive web application. | [cells.ucsc.edu](https://cells.ucsc.edu/)





### Scanpy

Granular tools for accessing the main Scanpy functionalities.

Tool | Description | Reference
--- | --- | ---
{% include tool.html id="scanpy_read_10x" %} | Scanpy Read10x into hdf5 object handled by scanpy | [Wolf et al. 2018](https://doi.org/10.1186/s13059-017-1382-0)
{% include tool.html id="scanpy_filter_genes" %} | Scanpy FilterGenes based on counts and numbers of cells expressed | [Wolf et al. 2018](https://doi.org/10.1186/s13059-017-1382-0)
{% include tool.html id="scanpy_filter_cells" %} | Scanpy FilterCells based on counts and numbers of genes expressed | [Wolf et al. 2018](https://doi.org/10.1186/s13059-017-1382-0)
{% include tool.html id="scanpy_normalise_data" %} | Scanpy NormaliseData to make all cells having the same total expression | [Wolf et al. 2018](https://doi.org/10.1186/s13059-017-1382-0)
{% include tool.html id="scanpy_find_variable_genes" %} | Scanpy FindVariableGenes based on normalised dispersion of expression | [Wolf et al. 2018](https://doi.org/10.1186/s13059-017-1382-0)
{% include tool.html id="scanpy_scale_data" %} | Scanpy ScaleData to make expression variance the same for all genes | [Wolf et al. 2018](https://doi.org/10.1186/s13059-017-1382-0)
{% include tool.html id="scanpy_run_pca" %} | Scanpy RunPCA for dimensionality reduction | [Wolf et al. 2018](https://doi.org/10.1186/s13059-017-1382-0)
{% include tool.html id="scanpy_compute_graph" %} | Scanpy ComputeGraph to derive kNN graph | [Wolf et al. 2018](https://doi.org/10.1186/s13059-017-1382-0)
{% include tool.html id="scanpy_find_cluster" %} | Scanpy FindCluster based on community detection on KNN graph | [Wolf et al. 2018](https://doi.org/10.1186/s13059-017-1382-0)
{% include tool.html id="scanpy_find_markers" %} | Scanpy FindMarkers to find differentially expressed genes between groups | [Wolf et al. 2018](https://doi.org/10.1186/s13059-017-1382-0)
{% include tool.html id="scanpy_run_tsne" %} | Scanpy RunTSNE visualise cell clusters using tSNE | [Wolf et al. 2018](https://doi.org/10.1186/s13059-017-1382-0)
{% include tool.html id="scanpy_run_umap" %} | Scanpy RunUMAP visualise cell clusters using UMAP | [Wolf et al. 2018](https://doi.org/10.1186/s13059-017-1382-0)


### Seurat

Granular tools for accessing the main Seurat functionalities. These tools received contributions from Maria Doyle [@mblue9](https://github.com/mblue9).

Tool | Description | Reference
--- | --- | ---
{% include tool.html id="seurat_read10x" %} | Seurat Read10x Loads 10x data into a serialized seurat R object | [Satija et al. 2015](https://doi.org/10.1038/nbt.3192)
{% include tool.html id="seurat_create_seurat_object" %} | Seurat CreateSeuratObject create a Seurat object | [Satija et al. 2015](https://doi.org/10.1038/nbt.3192)
{% include tool.html id="seurat_filter_cells" %} | Seurat FilterCells filter cells in a Seurat object | [Satija et al. 2015](https://doi.org/10.1038/nbt.3192)
{% include tool.html id="seurat_normalise_data" %} | Seurat NormaliseData normalise data | [Satija et al. 2015](https://doi.org/10.1038/nbt.3192)
{% include tool.html id="seurat_find_variable_genes" %} | Seurat FindVariableGenes identify variable genes | [Satija et al. 2015](https://doi.org/10.1038/nbt.3192)
{% include tool.html id="seurat_scale_data" %} | Seurat ScaleData scale and center genes | [Satija et al. 2015](https://doi.org/10.1038/nbt.3192)
{% include tool.html id="seurat_run_pca" %} | Seurat RunPCA run a PCA dimensionality reduction | [Satija et al. 2015](https://doi.org/10.1038/nbt.3192)
{% include tool.html id="seurat_find_clusters" %} | Seurat FindClusters find clusters of cells | [Satija et al. 2015](https://doi.org/10.1038/nbt.3192)
{% include tool.html id="seurat_find_markers" %} | Seurat FindMarkers find markers (differentially expressed genes) | [Satija et al. 2015](https://doi.org/10.1038/nbt.3192)
{% include tool.html id="seurat_dim_plot" %} | Seurat Plot dimension reduction graphs the output of a dimensional reduction technique (PCA by default). Cells are colored by their identity class. | [Satija et al. 2015](https://doi.org/10.1038/nbt.3192)
{% include tool.html id="seurat_run_tsne" %} | Seurat RunTSNE run t-SNE dimensionality reduction | [Satija et al. 2015](https://doi.org/10.1038/nbt.3192)
{% include tool.html id="seurat_export_cellbrowser" %} | Seurat Export2CellBrowser produces files for UCSC CellBrowser import. | [Satija et al. 2015](https://doi.org/10.1038/nbt.3192)


### Scater

Granular tools for accessing the main Scater functionalities. Normally used in combination with SC3.

Tool | Description | Reference
--- | --- | ---
{% include tool.html id="scater_read_10x_results" %} | Scater read 10x data Loads 10x data into a serialized scater R object | [McCarthy et al. 2017](https://doi.org/10.1093/bioinformatics/btw777)
{% include tool.html id="scater_calculate_qc_metrics" %} | Scater CalculateQcMetrics based on expression values and experiment information | [McCarthy et al. 2017](https://doi.org/10.1093/bioinformatics/btw777)
{% include tool.html id="scater_filter" %} | Scater Filter cells and genes based on pre-calculated stats and QC metrics | [McCarthy et al. 2017](https://doi.org/10.1093/bioinformatics/btw777)
{% include tool.html id="scater_is_outlier" %} | Scater DetectOutlier cells based on expression metrics | [McCarthy et al. 2017](https://doi.org/10.1093/bioinformatics/btw777)
{% include tool.html id="scater_calculate_cpm" %} | Scater CalculateCPM from raw counts | [McCarthy et al. 2017](https://doi.org/10.1093/bioinformatics/btw777)
{% include tool.html id="scater_normalize" %} | Scater Normalise expression values by library size in log2 scale | [McCarthy et al. 2017](https://doi.org/10.1093/bioinformatics/btw777)


### SC3

Granular tools for accessing the main SC3 functionalities. Normally used in combination with Scater.

Tool | Description | Reference
--- | --- | ---
{% include tool.html id="sc3_prepare" %} | SC3 Prepare a sc3 SingleCellExperiment object | [Kisilev et al. 2017](https://doi.org/10.1038/nmeth.4236)
{% include tool.html id="sc3_calc_consens" %} | SC3 Calculate Consensus from multiple runs of k-means clustering | [Kisilev et al. 2017](https://doi.org/10.1038/nmeth.4236)
{% include tool.html id="sc3_calc_transfs" %} | SC3 Calculate Transformations of distances using PCA and graph Laplacian | [Kisilev et al. 2017](https://doi.org/10.1038/nmeth.4236)
{% include tool.html id="sc3_calc_biology" %} | SC3 DiffExp calculates DE genes, marker genes and cell outliers | [Kisilev et al. 2017](https://doi.org/10.1038/nmeth.4236)
{% include tool.html id="sc3_estimate_k" %} | SC3 Estimate the number of clusters for k-means clustering | [Kisilev et al. 2017](https://doi.org/10.1038/nmeth.4236)
{% include tool.html id="sc3_calc_dists" %} | SC3 Calculate Distances between cells | [Kisilev et al. 2017](https://doi.org/10.1038/nmeth.4236)
{% include tool.html id="sc3_kmeans" %} | SC3 K-Means perform k-means clustering | [Kisilev et al. 2017](https://doi.org/10.1038/nmeth.4236)





...plus all the great tools normally available at the [usegalaxy.eu](https://usegalaxy.eu/).


# Contributors

- [Pablo Moreno](https://github.com/pcm32)
- [Ni Huang](https://github.com/nh3)
- [Jonathan Manning](https://github.com/pinin4fjords)
- [Andrey Solovyev](https://github.com/a-solovyev12)
- [Carlos Talavera-Lopez](https://github.com/cartal)
- [Suhaib Mohammed](https://github.com/suhaibMo)
- [Irene Papatheodorou](https://twitter.com/irenepapatheodo)
- [Björn Gruening](https://github.com/bgruening/)
- [Krzysztof Polanski](https://github.com/ktpolanski)
- [Maria Doyle](https://github.com/mblue9/)
