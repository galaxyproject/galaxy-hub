---
title: "April & May 2019 Tool Shed contributions"
---

[<img class="float-right" src="/src/images/galaxy-logos/galaxy-toolshed-300.png" alt="Galaxy ToolShed" width="180">](http://toolshed.g2.bx.psu.edu/)

Tools contributed to the Galaxy Project [ToolShed](http://toolshed.g2.bx.psu.edu/) in [April and May 2019](/src/news/2019-06-galaxy-update/index.md).

* [All monthly summaries](/src/toolshed/contributions/index.md)

## New Tools

* *From [petr-novak](https://toolshed.g2.bx.psu.edu/view/petr-novak):*
   * [re_utils](https://toolshed.g2.bx.psu.edu/view/petr-novak/re_utils):  Repeat Explorer utilities. 
* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
   * [tbprofiler](https://toolshed.g2.bx.psu.edu/view/iuc/tbprofiler):  Processes raw sequence data to infer strain type and identify known drug resistance markers. This repository contains a complete rewrite of the web version of TBProfiler, described here.  It allows the use of profiling through a command line interface and contains some additional  functionality such as the ability to process minION data.    The pipeline aligns reads to the H37Rv reference using bowtie2, BWA or minimap2  and then calls variants using SAMtools. These variants are then compared to a  drug-resistance database. We also predict the number of reads supporting drug  resistance variants as an insight into hetero-resistance (not applicable for minION data)    Full documentation at https://github.com/jodyphelan/TBProfiler.
   * [anndata_import](https://toolshed.g2.bx.psu.edu/view/iuc/anndata_import):  Wrapper for the anndata tool suite: Import AnnData. AnnData provides a scalable way of keeping track of data together with learned annotations. It is used within Scanpy, for which it was initially developed.
   * [anndata_export](https://toolshed.g2.bx.psu.edu/view/iuc/anndata_export):  Wrapper for the anndata tool suite: Export AnnData.
   * [anndata_manipulate](https://toolshed.g2.bx.psu.edu/view/iuc/anndata_manipulate):  Wrapper for the anndata tool suite: Manipulate AnnData.
   * [anndata_inspect](https://toolshed.g2.bx.psu.edu/view/iuc/anndata_inspect):  Wrapper for the anndata tool suite: Inspect AnnData.
   * [transit_gumbel](https://toolshed.g2.bx.psu.edu/view/iuc/transit_gumbel):  Wrapper for the transit operation Gumbel. "TRANSIT is a tool for processing and statistical analysis of Tn-Seq data. It  provides three different analysis methods that allow the user to determine  essentiality in a single condition as well as between conditions.".
   * [gff_to_prot](https://toolshed.g2.bx.psu.edu/view/iuc/gff_to_prot):  Wrapper for the transit operation Convert GFF3. 
   * [transit_resampling](https://toolshed.g2.bx.psu.edu/view/iuc/transit_resampling):  Wrapper for the transit operation Resampling. 
   * [transit_hmm](https://toolshed.g2.bx.psu.edu/view/iuc/transit_hmm):  Wrapper for the transit operation HMM. 
   * [rdavidwebservice](https://toolshed.g2.bx.psu.edu/view/iuc/rdavidwebservice):  Run functional annotation using DAVID. Tools for retrieving data from the Database for Annotation, Visualization and Integrated Discovery (DAVID) using Web Services into R objects. This package offers the main functionalities of DAVID website including:   i) user-friendly connectivity to upload gene/background list/s, change gene/background position   ii) Reports of the submitted Gene List, Gene/Term Clusters, Functional Annotation Chart, Functional Annotation Table.
   * [phyml](https://toolshed.g2.bx.psu.edu/view/iuc/phyml):  PhyML is a phylogeny software based on the maximum-likelihood principle. PhyML is  a  software  package which  primary  task that  is  to estimate  maximum  likelihood phylogenies  from alignments of nucleotide or  amino-acid sequences.  It  provides a wide  range  of  options that  were  designed  to facilitate  standard  phylogenetic  analyses.
   * [barcode_splitter](https://toolshed.g2.bx.psu.edu/view/iuc/barcode_splitter):  A utility to split sequence files using multiple sets of barcodes. Split multiple FASTQ files by matching barcodes in one or more of the  sequence files. Barcodes in the tab-delimited barcodes.txt file are matched  against the beginning (or end) of the specified index read(s). By default,  barcodes must match exactly, but --mistmatches can be set higher if desired.
   * [data_manager_build_kraken2_database](https://toolshed.g2.bx.psu.edu/view/iuc/data_manager_build_kraken2_database):  Contains data managers that define and populate the kraken2_databases tool data table. Kraken2 is a system for assigning taxonomic labels to short DNA  sequences, usually obtained through metagenomic studies. Previous attempts by other  bioinformatics software to accomplish this task have often used sequence alignment  or machine learning techniques that were quite slow, leading to the development  of less sensitive but much faster abundance estimation programs. Kraken aims to  achieve high sensitivity and high speed by utilizing exact alignments of k-mers  and a novel classification algorithm.
   * [basil](https://toolshed.g2.bx.psu.edu/view/iuc/basil):  Breakpoint detection, including large insertions. BASIL is a method to detect breakpoints for structural variants (including  insertion breakpoints) from aligned paired HTS reads in BAM format.  Use  BASIL to analyze BAM files for tentative insertion sites.
* *From [galaxyp](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
   * [peptide_genomic_coordinate](https://toolshed.g2.bx.psu.edu/view/galaxyp/peptide_genomic_coordinate):  Gets genomic coordinate of peptides based on the information in mzsqlite and genomic mapping sqlite files. This program loads two sqlite databases (mzsqlite and genomic mapping sqlite files) and calculates the genomic coordinates of the peptides provided as input. This outputs bed file with genomic coordinate of peptides.    Input: Peptide list file, mzsqlite sqlite DB file, and genomic mapping sqlite DB file  Output: Tabular BED file with all the columns.
   * [rawtools](https://toolshed.g2.bx.psu.edu/view/galaxyp/rawtools):  Raw Tools. package designed to perform scan data parsing and quantification, and quality control analysis of Thermo Orbitrap raw mass spectrometer files.
   * [metaquantome_expand](https://toolshed.g2.bx.psu.edu/view/galaxyp/metaquantome_expand):  wrapper for metaQuantome: expand module. metaQuantome provides tools for analysis of metaprotemic (community proteomic) data, leveraging quantitative information (like precursor intensity values), functional annotation, and taxonomic annotation.
   * [metaquantome_db](https://toolshed.g2.bx.psu.edu/view/galaxyp/metaquantome_db):  wrapper for metaQuantome: database module. 
   * [metaquantome_viz](https://toolshed.g2.bx.psu.edu/view/galaxyp/metaquantome_viz):  wrapper for metaQuantome: visualize module. 
   * [metaquantome_sample](https://toolshed.g2.bx.psu.edu/view/galaxyp/metaquantome_sample):  wrapper for metaQuantome: create samples file module. 
   * [metaquantome_stat](https://toolshed.g2.bx.psu.edu/view/galaxyp/metaquantome_stat):  wrapper for metaQuantome: stat module. 
   * [metaquantome_filter](https://toolshed.g2.bx.psu.edu/view/galaxyp/metaquantome_filter):  wrapper for metaQuantome: filter module. 
* *From [ebi-gxa](https://toolshed.g2.bx.psu.edu/view/ebi-gxa):*
   * [scanpy_parameter_iterator](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scanpy_parameter_iterator):  Wrapper for the scanpy-scripts tool suite: Scanpy ParameterIterator. Scanpy is a scalable toolkit for analyzing single-cell gene expression data.  It includes  preprocessing, visualization, clustering, pseudotime and trajectory inference and differential  expression testing. Scanpy-scripts provides a set of command-line wrapper scripts that are  composed from Scanpy API for easy execution of common analysis.
   * [scanpy_normalise_data](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scanpy_normalise_data):  Wrapper for the scanpy-scripts tool suite: Scanpy NormaliseData. 
   * [scanpy_run_pca](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scanpy_run_pca):  Wrapper for the scanpy-scripts tool suite: Scanpy RunPCA. 
   * [scanpy_find_markers](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scanpy_find_markers):  Wrapper for the scanpy-scripts tool suite: Scanpy FindMarkers. 
   * [scanpy_find_cluster](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scanpy_find_cluster):  Wrapper for the scanpy-scripts tool suite: Scanpy FindCluster. 
   * [scanpy_scale_data](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scanpy_scale_data):  Wrapper for the scanpy-scripts tool suite: Scanpy ScaleData. 
   * [scanpy_filter_genes](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scanpy_filter_genes):  Wrapper for the scanpy-scripts tool suite: Scanpy FilterGenes. 
   * [scanpy_run_umap](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scanpy_run_umap):  Wrapper for the scanpy-scripts tool suite: Scanpy RunUMAP. 
   * [scanpy_run_tsne](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scanpy_run_tsne):  Wrapper for the scanpy-scripts tool suite: Scanpy RunTSNE. 
   * [scanpy_compute_graph](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scanpy_compute_graph):  Wrapper for the scanpy-scripts tool suite: Scanpy ComputeGraph. 
   * [scanpy_read_10x](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scanpy_read_10x):  Wrapper for the scanpy-scripts tool suite: Scanpy Read10x. 
   * [scanpy_find_variable_genes](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scanpy_find_variable_genes):  Wrapper for the scanpy-scripts tool suite: Scanpy FindVariableGenes. 
   * [scanpy_filter_cells](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scanpy_filter_cells):  Wrapper for the scanpy-scripts tool suite: Scanpy FilterCells.
   * [seurat_run_pca](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/seurat_run_pca):  Wrapper for the seurat tool suite: Seurat RunPCA. Seurat is an R package designed for QC, analysis, and exploration of single cell RNA-seq data. Seurat aims to enable users to identify and interpret sources of heterogeneity from single cell transcriptomic measurements, and to integrate diverse types of single cell data.
   * [seurat_filter_cells](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/seurat_filter_cells):  Wrapper for the seurat tool suite: Seurat FilterCells. 
   * [seurat_export_cellbrowser](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/seurat_export_cellbrowser):  Wrapper for the seurat tool suite: Seurat Export2CellBrowser. 
   * [seurat_find_clusters](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/seurat_find_clusters):  Wrapper for the seurat tool suite: Seurat FindClusters. 
   * [seurat_find_markers](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/seurat_find_markers):  Wrapper for the seurat tool suite: Seurat FindMarkers. 
   * [seurat_find_variable_genes](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/seurat_find_variable_genes):  Wrapper for the seurat tool suite: Seurat FindVariableGenes. 
   * [seurat_read10x](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/seurat_read10x):  Wrapper for the seurat tool suite: Seurat Read10x. 
   * [seurat_scale_data](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/seurat_scale_data):  Wrapper for the seurat tool suite: Seurat ScaleData. 
   * [seurat_run_tsne](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/seurat_run_tsne):  Wrapper for the seurat tool suite: Seurat RunTSNE. 
   * [seurat_create_seurat_object](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/seurat_create_seurat_object):  Wrapper for the seurat tool suite: Seurat CreateSeuratObject. 
   * [seurat_dim_plot](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/seurat_dim_plot):  Wrapper for the seurat tool suite: Seurat Plot dimension reduction. 
   * [seurat_normalise_data](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/seurat_normalise_data):  Wrapper for the seurat tool suite: Seurat NormaliseData. 
   * [sc3_estimate_k](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/sc3_estimate_k):  Wrapper for the SC3 tool suite: SC3 Estimate. SC3 is a tool for unsupervised clustering and analysis of single cell RNA-Seq data.
   * [sc3_kmeans](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/sc3_kmeans):  Wrapper for the SC3 tool suite: SC3 K-Means.
   * [sc3_calc_consens](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/sc3_calc_consens):  Wrapper for the SC3 tool suite: SC3 Calculate Consensus.
   * [sc3_prepare](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/sc3_prepare):  Wrapper for the SC3 tool suite: SC3 Prepare.
   * [sc3_calc_biology](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/sc3_calc_biology):  Wrapper for the SC3 tool suite: SC3 DiffExp.
   * [sc3_calc_transfs](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/sc3_calc_transfs):  Wrapper for the SC3 tool suite: SC3 Calculate Transformations.
   * [sc3_calc_dists](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/sc3_calc_dists):  Wrapper for the SC3 tool suite: SC3 Calculate Distances.
   * [scater_normalize](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scater_normalize):  Wrapper for the Scater tool suite: Scater Normalise. Scater: Single-Cell Analysis Toolkit for Gene Expression Data in R.
   * [scater_read_10x_results](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scater_read_10x_results):  Wrapper for the Scater tool suite: Scater read 10x data.
   * [scater_is_outlier](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scater_is_outlier):  Wrapper for the Scater tool suite: Scater DetectOutlier.
   * [scater_calculate_cpm](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scater_calculate_cpm):  Wrapper for the Scater tool suite: Scater CalculateCPM.
   * [scater_calculate_qc_metrics](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scater_calculate_qc_metrics):  Wrapper for the Scater tool suite: Scater CalculateQcMetrics.
   * [scater_filter](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/scater_filter):  Wrapper for the Scater tool suite: Scater Filter.
   * [ucsc_cell_browser](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/ucsc_cell_browser):  Python pipeline and Javascript scatter plot library for single-cell datasets. The UCSC Cell Browser is a viewer for single cell data. You can click on and hover over cells to get meta information, search for genes to color on and click clusters to show cluster-specific marker genes.
   * [dropletutils_read_10x](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/dropletutils_read_10x):  Wrapper for the DropletUtils tool suite: DropletUtils Read10x. DropletUtils provides a number of utility functions for handling single-cell (RNA-seq) data from droplet technologies such as 10X Genomics. This includes data loading, identification of cells from empty droplets, removal of barcode-swapped pseudo-cells, and downsampling of the count matrix.
   * [retrieve_scxa](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/retrieve_scxa):  Wrapper for the SC3 tool suite: EBI SCXA Data Retrieval. The EMBL-EBI Expression Atlas is an open science resource that gives users a powerful way to find information about gene and protein expression across species and biological conditions such as different tissues, cell types, developmental stages and diseases among others. Expression Atlas aims to help answering questions such as ‘where is a certain gene expressed?’ or ‘how does its expression change in a disease?’.
   * [gtf2gene_list](https://toolshed.g2.bx.psu.edu/view/ebi-gxa/gtf2gene_list):  Utility to extract gene identifier lists from Ensembl GTF files. Given a GTF file from Ensembl, this utility will generate a simple text file with one column with all gene identifiers, through the rtracklayer R package.
* *From [chemteam](https://toolshed.g2.bx.psu.edu/view/chemteam):*
   * [mdanalysis_ramachandran_plot](https://toolshed.g2.bx.psu.edu/view/chemteam/mdanalysis_ramachandran_plot):  Wrapper for the MDAnalysis package: Ramachandran Plots. MDAnalysis (https://www.mdanalysis.org) is a Python toolkit to analyze molecular dynamics trajectories generated by a wide range of popular simulation packages including DL_Poly, CHARMM, Amber, NAMD, LAMMPS, and Gromacs.
   * [mdanalysis_hbonds](https://toolshed.g2.bx.psu.edu/view/chemteam/mdanalysis_hbonds):  Wrapper for the MDAnalysis package: Hydrogen Bond Analysis.
   * [mdanalysis_cosine_analysis](https://toolshed.g2.bx.psu.edu/view/chemteam/mdanalysis_cosine_analysis):  Wrapper for the MDAnalysis package: Cosine Content.
* *From [niels](https://toolshed.g2.bx.psu.edu/view/niels):*
   * [annovar_yaml_wrapper](https://toolshed.g2.bx.psu.edu/view/niels/annovar_yaml_wrapper):  Annovar YAML wrapper. Annovar YAML wrapper.
* *From [spanish_national_institue_of_bioinformatics](https://toolshed.g2.bx.psu.edu/view/spanish_national_institue_of_bioinformatics):*
   * [biobb](https://toolshed.g2.bx.psu.edu/view/spanish_national_institue_of_bioinformatics/biobb):  biobb (BioExcel building blocks) are python building blocks over popular bioinformatics tools for editing molecular structures, running and analysing molecular dynamics, etc. Biobb (BioExcel building blocks) packages are Python building blocks that create new layer of compatibility and interoperability over popular bioinformatics tools. The latest documentation of our biobb collections can be found in our readthedocs sites:    biobb_io: Biobb collection to fetch data to be consumed by the rest of the Biobbs.  biobb_model: Biobb collection to check and model 3d protein structures.  biobb_md : Biobb collection to perform molecular dynamics simulations.
   * [nucleosome_dynamics](https://toolshed.g2.bx.psu.edu/view/spanish_national_institue_of_bioinformatics/nucleosome_dynamics): Test. Suite to run nucleosome-related analyses based on MNase-seq data. This tool analyse MNase-seq BAM reads for extracting nucleosome positioning, nucleosome architecture comparision, nucleosome free regions, nucleosome stiffness, and many other analyses.
* *From [thanhlv](https://toolshed.g2.bx.psu.edu/view/thanhlv):*
   * [plasmidtron](https://toolshed.g2.bx.psu.edu/view/thanhlv/plasmidtron):  Assembling the cause of phenotypes and genotypes from NGS data. You have a set of samples where you have a known phenotype, and a set of controls.  PlasmidTron lets you assemble the differences between the two so that you can gain a better understanding of the phenotype and the other sequences around it (the rest of the plasmid).  For example, often researchers will just look for an anti-microbial resistance gene, and look no further, because its still a difficult problem.  PlasmidTron can let you see the sequence around your gene, giving you greater biological insights into the mechanisms of the resistance.  Whilst its primary purpose is to pull out plasmids, phage can also be recovered.
* *From [cstrittmatter](https://toolshed.g2.bx.psu.edu/view/cstrittmatter):*
   * [mitokmer](https://toolshed.g2.bx.psu.edu/view/cstrittmatter/mitokmer):  mitokmer. Eukaryotic abundance prediction by mitochondrial content.
* *From [bgruening](https://toolshed.g2.bx.psu.edu/view/bgruening):*
   * [autodock_vina_prepare_box](https://toolshed.g2.bx.psu.edu/view/bgruening/autodock_vina_prepare_box):  Calculate the box parameters for an AutoDock Vina job. Calculate the box parameters for an AutoDock Vina job from an input mol file (confounding box)  Home page: http://vina.scripps.edu/  License: Apache 2.0.
   * [pg_dump](https://toolshed.g2.bx.psu.edu/view/bgruening/pg_dump):  Postgresql toolbox: Dump. The postgresql tools, are using a postgresql database in user-space.  Databases are packed into a tarball and stored in the user-history.    These tools are based on https://github.com/solidsnack/pglite to interact with postgresql in user-space.
   * [pg_import](https://toolshed.g2.bx.psu.edu/view/bgruening/pg_import):  Postgresql toolbox: Postgresql. 
   * [pg_query](https://toolshed.g2.bx.psu.edu/view/bgruening/pg_query):  Postgresql toolbox: Query. 
   * [ctb_rdkit_descriptors](https://toolshed.g2.bx.psu.edu/view/bgruening/ctb_rdkit_descriptors):  Descriptors tool from RDKit. RDKit is a collection of cheminformatics and machine-learning software.    Home page: https://github.com/rdkit/rdkit  License: BSD.
   * [prepare_ligands_for_docking](https://toolshed.g2.bx.psu.edu/view/bgruening/prepare_ligands_for_docking):  Prepare ligands for docking tool from Open Babel chemical toolbox. Open Babel is a chemical toolbox designed to speak the many languages of chemical data. It's an open, collaborative project allowing anyone to search, convert, analyze, or store data from molecular modeling, chemistry, solid-state materials, biochemistry, or related areas.    Home page: https://github.com/openbabel/openbabel  License: GPL Version 2.
   * [sklearn_estimator_attributes](https://toolshed.g2.bx.psu.edu/view/bgruening/sklearn_estimator_attributes):  Wrapper for scikit learn tool: Estimator attributes. Scikit-learn is an open source machine learning library written in python.  It provides different flavors of machine learning algorithms for classification,  regression, and clustering. It has designed to interoperate with python numerical  and scientific libraries Numpy and Scipy.    The official repository of Scikit-learn is at https://github.com/scikit-learn/scikit-learn.
   * [sklearn_stacking_ensemble_models](https://toolshed.g2.bx.psu.edu/view/bgruening/sklearn_stacking_ensemble_models):  Wrapper for scikit learn tool: Stacking Ensemble Models. 
   * [pandas_rolling_window](https://toolshed.g2.bx.psu.edu/view/bgruening/pandas_rolling_window):  Rolling window calculations. Rolling window calculations using the python pandas library.
   * [get_online_data](https://toolshed.g2.bx.psu.edu/view/bgruening/get_online_data):  Access data from online sources. Contains tools to access data online    * get_online_data downloads and extracts data from compressed files    * get_pdb downloads protein structures from the PDB database.
   * [get_pubchem](https://toolshed.g2.bx.psu.edu/view/bgruening/get_pubchem):  Access data from the PubChem database. Access data from the PubChem database    * get_pubchem_as_smiles downloads all compounds and converts them to the SMILES format    * get_pubchem_assays downloads PubChem assays and concatenates them.
   * [mordred](https://toolshed.g2.bx.psu.edu/view/bgruening/mordred):  Mordred is a molecular descriptor calculator. Mordred is a descriptor-calculation software application that can calculate more than 1800 two- and three-dimensional descriptors.    Home page: https://github.com/mordred-descriptor/mordred  License: BSD.
   * [get_pdb](https://toolshed.g2.bx.psu.edu/view/bgruening/get_pdb):  Download PDB files. Download a protein structure in PDB format from the Protein Data Bank using its four-letter accession code.
* *From [martasampaio](https://toolshed.g2.bx.psu.edu/view/martasampaio):*
   * [phagepromoter](https://toolshed.g2.bx.psu.edu/view/martasampaio/phagepromoter):  Get promoters of phage genomes. Get promoters of phage genomes.
* *From [climate](https://toolshed.g2.bx.psu.edu/view/climate):*
   * [mean_per_zone](https://toolshed.g2.bx.psu.edu/view/climate/mean_per_zone):  Creates a png image showing statistic over areas as defined in the vector file. The wrapper aims at providing a utility to extract information  from geospatial raster data based on vector geometries (shapefile).  The raster input file must be in netCDF format with geographical coordinates  (latitudes, longitudes) with the same coordinate reference system as the  shapefile.
   * [psy_maps](https://toolshed.g2.bx.psu.edu/view/climate/psy_maps):  Visualization of regular geographical data on a map with psyplot. This tool is a wrapper for the psyplot plugin for visualizations on a map. This package uses the cartopy package to project the plots that are made with the psy-simple plugin to an earth-referenced grid. It's main plot methods are the mapplot and mapvector plot methods which can plot rectangular and triangular plots.
   * [shift_longitudes](https://toolshed.g2.bx.psu.edu/view/climate/shift_longitudes):  Shift longitudes ranging from 0. and 360 degrees to -180. and 180. degrees. The wrapper aims at providing a simple utility to shift longitudes ranging from  0. and 360 degrees to -180. and 180. degrees.  The input file must be in netCDF format with geographical coordinates   (latitudes, longitudes) given in degrees.
   * [cds_essential_variability](https://toolshed.g2.bx.psu.edu/view/climate/cds_essential_variability):  Get Copernicus Essential Climate Variables for assessing climate variability. This tool is a wrapper to retrieve Copernicus Essential Climate Variables. The   Essential Climate Variables for assessment of climate variability from 1979 to   present dataset contains a selection of climatologies and monthly anomalies of   Essential Climate Variables (ECVs) suitable for monitoring and assessment of   climate variability and change. Selection criteria are based on accuracy  and temporal consistency on monthly to decadal time scales. The ECV data   products in this set have been estimated from multiple sources and, depending   on the source, may have been adjusted to account for biases and other known   deficiencies. Data sources and adjustment methods used are described in the   Product User Guide, as are various particulars such as the baseline periods   used to calculate monthly climatologies and the corresponding anomalies.
* *From [jfb](https://toolshed.g2.bx.psu.edu/view/jfb):*
   * [kinatest_scoring_function](https://toolshed.g2.bx.psu.edu/view/jfb/kinatest_scoring_function):  Scores peptides for their ability to be phosphorylated by a kinase of interest. This is intended to be used as part of the Kinatest Fisher Test work flow.
* *From [kpbioteam](https://toolshed.g2.bx.psu.edu/view/kpbioteam):*
   * [clusterprofiler_bitr](https://toolshed.g2.bx.psu.edu/view/kpbioteam/clusterprofiler_bitr):  Biological Id TRanslator. 
   * [clusterprofiler_go](https://toolshed.g2.bx.psu.edu/view/kpbioteam/clusterprofiler_go):  This tool provide GO Enrichment Analysis of a gene set. Given a set of genes, this will return the enrichment GO categories after FDR control. 
   * [chipeakanno_annopeaks](https://toolshed.g2.bx.psu.edu/view/kpbioteam/chipeakanno_annopeaks):  This tool annotate peaks from bed file. bindingType
     * Specifying the criteria to associate peaks with annotation. Here is how to use it together with the parameter bindingRegion
     * To obtain peaks within 5kb upstream and up to 3kb downstream of TSS within the gene body, set bindingType = "startSite" and bindingRegion = c(-5000, 3000)
     * To obtain peaks up to 5kb upstream within the gene body and 3kb downstream of gene/Exon End, set bindingType = "endSite" and bindingRegion = c(-5000, 3000)
     * To obtain peaks from 5kb upstream to 3kb downstream of genes/Exons , set bindingType = "fullRange" and bindingRegion = c(-5000, 3000)
     * To obtain peaks with nearest bi-directional promoters within 5kb upstream and 3kb downstream of TSS, set bindingType = "nearestBiDirectionalPromoters" and bindingRegion = c(-5000, 3000)
     * startSite  start position of the feature (strand is considered)
     * endSite  end position of the feature (strand is considered)
     * fullRange  whole range of the feature  nearestBiDirectionalPromoters  nearest promoters from both direction of the peaks (strand is considered).
     * It will report bidirectional promoters if there are promoters in both directions in the given region (defined by bindingRegion). Otherwise, it will report the closest promoter in one direction.  bindingRegion  Annotation range used together with bindingType, which is a vector with two integer values, default to c (-5000, 5000). The first one must be no bigger than 0. And the sec ond one must be no less than 1. For details, see bindingType.  ignore.peak.strand  ignore the peaks strand or not.
   * [ewastools](https://toolshed.g2.bx.psu.edu/view/kpbioteam/ewastools):  Tools Suite for Population Epigenetics. EWAS Tools Suite includes raw intensity data loading .idat preprocessing, optional normalisation of the data, quality control with additional sample check. It gives the user the opportunity to perform any of these preparation and data cleaning steps, including the next highly recommended genetic variation annotation step resulting in single nucleotide polymorphism identification and removal by simply running the tools. Finally, the dataset generated through all of these steps can be used to hunt find differentially-methylated positions DMP and regions DMR with respect to a phenotype co-variate.
* *From [pablocarb](https://toolshed.g2.bx.psu.edu/view/pablocarb):*
   * [synbiodesign](https://toolshed.g2.bx.psu.edu/view/pablocarb/synbiodesign):  BioCAD for Industrial Biotechnology. Metabolic engineering and synthetic biology design, buid, test learn tools for industrial biotechnology.
* *From [nml](https://toolshed.g2.bx.psu.edu/view/nml):*
   * [tree_relabeler](https://toolshed.g2.bx.psu.edu/view/nml/tree_relabeler):  Relabels the tips of a newick formatted tree. What it does  This tool provides a means for relabeling the tips of a newick formatted tree.    It takes a newick format tree file to modify tip labels and a tab-delimited file containing current tip labels and additional information to add to the tips in 2 or more columns.    Usage  Header row of the tab delimited file must start with a '#'. An example is below:    label outbreak year location  orgs1 outbreak1 year1 location1  orgs2 outbreak2 year2 location2  and so on.    The information in the tab file is inserted into the tree file so the new information will appear on the tip labels.    Input  Newick format tree    Tab delimted file    Desired delimiter for updated tip labels.
* *From [davidecangelosi](https://toolshed.g2.bx.psu.edu/view/davidecangelosi):*
   * [pipe_t](https://toolshed.g2.bx.psu.edu/view/davidecangelosi/pipe_t):  PIPE-T is a tool for analyzing RT-qPCR expression data. PIPE-T is a tool for parsing, filtering, normalizing, imputing and analyzing RT-qPCR expression data.
* *From [iss](https://toolshed.g2.bx.psu.edu/view/iss):*
   * [chewbbaca](https://toolshed.g2.bx.psu.edu/view/iss/chewbbaca):  Galaxy wrapper for the chewBBACA BSR-Based Allele Calling Algorithm. Galaxy wrapper for the chewBBACA BSR-Based Allele Calling Algorithm from https://github.com/B-UMMI/chewBBACA.
* *From [tvu](https://toolshed.g2.bx.psu.edu/view/tvu):*
   * [omicsdi](https://toolshed.g2.bx.psu.edu/view/tvu/omicsdi):  Automatic sync dataset's files from OmicsDI to Galaxy. OmicsDI is an integrated and open source platform facilitating the access and dissemination of omics datasets.     OmicsDI provides a unique infrastructure to integrate datasets coming from multiple omics studies,     including at present proteomics, genomics and metabolomics and Multi-Omics.
* *From [ntino](https://toolshed.g2.bx.psu.edu/view/ntino):*
   * [galaxy_to_biocompute_object](https://toolshed.g2.bx.psu.edu/view/ntino/galaxy_to_biocompute_object):  Galaxy workflow to Biological Compute Object. Galaxy workflow to Biological Compute Object.
* *From [mpaya](https://toolshed.g2.bx.psu.edu/view/mpaya):*
   * [epic2](https://toolshed.g2.bx.psu.edu/view/mpaya/epic2): Upload epic2. Peak calling of broad ChIP-Seq marks. 
* *From [leomrtns](https://toolshed.g2.bx.psu.edu/view/leomrtns):*
   * [nanostat](https://toolshed.g2.bx.psu.edu/view/leomrtns/nanostat): initial upload. Calculate various statistics from a long read sequencing dataset in fastq, bam or albacore sequencing summary format. Create statistic summary of an Oxford Nanopore read dataset.
   * [nanofilt](https://toolshed.g2.bx.psu.edu/view/leomrtns/nanofilt):  Filtering and trimming of long read sequencing data. Filtering on quality and/or read length, and optional trimming after passing filters.
* *From [johnlees](https://toolshed.g2.bx.psu.edu/view/johnlees):*
   * [poppunk](https://toolshed.g2.bx.psu.edu/view/johnlees/poppunk):  Clustering of bacterial genomes. Fast and flexible bacterial genomic epidemiology with PopPUNK  https://dx.doi.org/10.1101/gr.241455.118.
* *From [greg](https://toolshed.g2.bx.psu.edu/view/greg):*
   * [affy2vcf2](https://toolshed.g2.bx.psu.edu/view/greg/affy2vcf2):  Contains a tool converts Affymetrix genotype calls and intensity files to VCF format. Contains a tool converts Affymetrix genotype calls and intensity files to VCF format.
* *From [ppericard](https://toolshed.g2.bx.psu.edu/view/ppericard):*
   * [mixomics_blocksplsda](https://toolshed.g2.bx.psu.edu/view/ppericard/mixomics_blocksplsda):  [Statistics] mixOmics R Package - block.splsda. Performs N-integration and feature selection with Projection to Latent Structures models (PLS) with sparse Discriminant Analysis.
* *From [jagadeesh](https://toolshed.g2.bx.psu.edu/view/jagadeesh):*
   * [jagadeesh](https://toolshed.g2.bx.psu.edu/view/jagadeesh/jagadeesh):  Gemini Query. Gemini Query.
* *From [gianmarco_piccinno](https://toolshed.g2.bx.psu.edu/view/gianmarco_piccinno):*
   * [cs_tool_project_rm](https://toolshed.g2.bx.psu.edu/view/gianmarco_piccinno/cs_tool_project_rm):  This tool permits generalization and selection. This tool permits generalization and selection.
* *From [jamueller](https://toolshed.g2.bx.psu.edu/view/jamueller):*
  * [codon_analysis](https://toolshed.g2.bx.psu.edu/view/jamueller/codon_analysis):  GeCoS calculates the codon composition in a DNA sequence.
    * What it does
      * GeCos is a tool that calculates the codon composition of any given DNA sequence. 
    * Input
      * If more than one sequence is analyzed at a time, a cutoff value can be used to filter the output. Only the sequences with a higher total score than the cutoff value will be displayed in the output.
      * The DNA sequence(s), that are supposed to be analyzed with GeCoS need to be formatted as fasta.
      * Output
        * GeCoS produces a matrix containing the identifier used in the input, the combined score of the sequence and the number of each of the chosen codons.
        * Total Score = sum of codon occurences / sequence length * number of analyzed codons
        * The output is sorted from low to high (Total Score: 0 to 1).
    * Example:
      ``` 
       [['Gene_ID' 'Total Score' 'AGG' 'AGC' 'CCC' 'TGC' 'GCG']
       ['CCE57562' 0.0190476 1 3 1 2 1]
       ['CCQ29559' 0.0190476 0 1 2 2 1]
       ...
       ['CCQ31238' 0.0328358 0 3 0 6 2]
       ['CCE57539' 0.05 2 0 4 3 3]]
       ```
* *From [ecology](https://toolshed.g2.bx.psu.edu/view/ecology):*
   * [spocc_occ](https://toolshed.g2.bx.psu.edu/view/ecology/spocc_occ):  Get species occurences data. A programmatic interface to many species occurrence data sources, including Global Biodiversity Information Facility (GBIF), USGSs Biodiversity Information Serving Our Nation (BISON), iNaturalist, Berkeley Ecoinformatics Engine, AntWeb, Integrated Digitized Biocollections (iDigBio), VertNet, Ocean Biogeographic Information System (OBIS), and Atlas of Living Australia (ALA).   Includes functionality for retrieving species occurrence data, and combining those data.
* *From [gmat](https://toolshed.g2.bx.psu.edu/view/gmat):*
   * [isocor](https://toolshed.g2.bx.psu.edu/view/gmat/isocor):  Isotope Correction for mass spectrometry labeling experiments. IsoCor is a scientific software dedicated to the correction of mass spectrometry (MS) data for naturally occuring isotopes. IsoCor corrects raw MS data (mass fractions) for naturally-occurring isotopes of all elements and purity of the isotopic tracer. The output of IsoCor is the isotopologue distribution of the molecule (i.e. the relative fractions of molecular entities differing only in the number of isotopic substitutions of the tracer). IsoCor also calculates the mean enrichment (i.e. the mean isotopic content in the molecule) in metabolites.  It is one of the routine tools that we use at the MetaSys team and MetaToul platform in isotopic studies of metabolic systems.  The code is open-source, and available under a GPLv3 license. Additional information can be found in IsoCor publication.  Detailed documentation can be found online at Read the Docs (https://isocor.readthedocs.io/). Check out the Tutorials to use the best correction option!.
