---
title: "February 2019 Tool Shed contributions"
---

[<img class="float-right" src="/src/images/galaxy-logos/galaxy-toolshed-300.png" alt="Galaxy ToolShed" width="180">](http://toolshed.g2.bx.psu.edu/)

Tools contributed to the Galaxy Project [ToolShed](http://toolshed.g2.bx.psu.edu/) in [February 2019](/src/news/2019-03-galaxy-update/index.md).

* [All monthly summaries](/src/toolshed/contributions/index.md)

## New Tools

* *From [gga](https://toolshed.g2.bx.psu.edu/view/gga):*
   * [tripal_feature_delete_orphans](https://toolshed.g2.bx.psu.edu/view/gga/tripal_feature_delete_orphans):  Delete orphan features (from the Tripal tool suite). Galaxy tools allowing to load data into a remote Tripal server.    Tripal is a toolkit for construction of online biological (genetics, genomics, breeding, etc), community database,  and is a member of the GMOD family of tools. Tripal provides by default integration with the GMOD Chado database schema and Drupal, a popular Content Management Systems (CMS).    https://github.com/galaxy-genome-annotation/python-tripal.
   * [tripal_expression_delete_biomaterials](https://toolshed.g2.bx.psu.edu/view/gga/tripal_expression_delete_biomaterials):  Delete biomaterials (from the Tripal tool suite). Galaxy tools allowing to load data into a remote Tripal server.    
   * [tripal_expression_add_expression](https://toolshed.g2.bx.psu.edu/view/gga/tripal_expression_add_expression):  Load expression data (from the Tripal tool suite). Galaxy tools allowing to load data into a remote Tripal server.    
   * [tripal_expression_sync_biomaterials](https://toolshed.g2.bx.psu.edu/view/gga/tripal_expression_sync_biomaterials):  Synchronize biomaterials (from the Tripal tool suite). Galaxy tools allowing to load data into a remote Tripal server.    
   * [tripal_entity_publish](https://toolshed.g2.bx.psu.edu/view/gga/tripal_entity_publish):  Publish entities (from the Tripal tool suite). Galaxy tools allowing to load data into a remote Tripal server.    
   * [tripal_expression_get_biomaterials](https://toolshed.g2.bx.psu.edu/view/gga/tripal_expression_get_biomaterials):  Get biomaterials (from the Tripal tool suite). Galaxy tools allowing to load data into a remote Tripal server.    
   * [tripal_expression_add_biomaterial](https://toolshed.g2.bx.psu.edu/view/gga/tripal_expression_add_biomaterial):  Create a biomaterial (from the Tripal tool suite). Galaxy tools allowing to load data into a remote Tripal server.    
* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
   * [bcftools_plugin_frameshifts](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_frameshifts):  Wrapper for bcftools application bcftools frameshifts. BCFtools are meant as a faster replacement for most of the perl VCFtools commands.
   * [bcftools_plugin_color_chrs](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_color_chrs):  Wrapper for bcftools application bcftools color-chrs. 
* *From [dfornika](https://toolshed.g2.bx.psu.edu/view/dfornika):*
   * [data_manager_build_kraken2_database](https://toolshed.g2.bx.psu.edu/view/dfornika/data_manager_build_kraken2_database):  Contains a data manager that defines and populates the kraken2_databases tool data table. Kraken2 is a system for assigning taxonomic labels to short DNA  sequences, usually obtained through metagenomic studies. Previous attempts by other  bioinformatics software to accomplish this task have often used sequence alignment  or machine learning techniques that were quite slow, leading to the development  of less sensitive but much faster abundance estimation programs. Kraken aims to  achieve high sensitivity and high speed by utilizing exact alignments of k-mers  and a novel classification algorithm.
* *From [card](https://toolshed.g2.bx.psu.edu/view/card):*
   * [rgi](https://toolshed.g2.bx.psu.edu/view/card/rgi):  Resistance Gene Identifier (RGI) predicts resistome(s) from protein or nucleotide data based on homology and SNP models. This tool provides a preliminary annotation of your DNA sequence(s) based upon the data available in CARD. Hits to genes tagged with Antibiotic Resistance ontology terms will be highlighted. As CARD expands to include more pathogens, genomes, plasmids, and ontology terms this tool will grow increasingly powerful in providing first-pass detection of antibiotic resistance associated genes.
* *From [kpbioteam](https://toolshed.g2.bx.psu.edu/view/kpbioteam):*
   * [ewastools](https://toolshed.g2.bx.psu.edu/view/kpbioteam/ewastools): EWAS Tools. Tools Suite for Population Epigenetics. EWAS Tools Suite includes raw intensity data loading .idat preprocessing, optional normalisation of the data, quality control with additional sample check. It gives the user the opportunity to perform any of these preparation and data cleaning steps, including the next highly recommended genetic variation annotation step resulting in single nucleotide polymorphism identification and removal by simply running the tools. Finally, the dataset generated through all of these steps can be used to hunt find differentially-methylated positions DMP and regions DMR with respect to a phenotype co-variate.
* *From [abims-sbr](https://toolshed.g2.bx.psu.edu/view/abims-sbr):*
   * [mutcount](https://toolshed.g2.bx.psu.edu/view/abims-sbr/mutcount):  countings codons and amino acids - permutation tests. this tool works either with the outputs of the tools concatphyl or cds_search. It proceeds to count codons and amino acids within a set of fasta sequences. It takes into account amino acid properties and do some permutations tests.
   * [filter_assemblies](https://toolshed.g2.bx.psu.edu/view/abims-sbr/filter_assemblies):  Formats Velvet Oase and Trinity assemblies for the orthologous_search galaxy suite. This tool formats Velvet Oase and Trinity assemblies for the orthologous_search galaxy suite and selects only one variant per gene according to its length and quality check.
   * [orthogroups_tool](https://toolshed.g2.bx.psu.edu/view/abims-sbr/orthogroups_tool):  writing orthogroups of orthofinder in separated files. this tool parse the Orthogroups.txt file of OrthoFinder and write each orthogroup in an individual file, with headers and sequences. The sequences are retrieved with the output files of filter_assembles.
   * [cds_search](https://toolshed.g2.bx.psu.edu/view/abims-sbr/cds_search):  CDS search and indels deletion. This tool works with the outputs of the tool blastalign and proceeds to look for coding sequences on each sequence of the alignment and to remove all the indels. Outputs can be either nucleic or proteic sequences.
   * [concatphyl](https://toolshed.g2.bx.psu.edu/view/abims-sbr/concatphyl):  Phylogenetic tree under maximum likelyhood. This tool builds a phylogenetic tree under maximum likelyhood using data from the tools filter_assemblies and cds_search. Several substitution models and algorithms can be used, and several trees can be built (best-tree, bi-parition, with-bootstraps).
   * [pogs](https://toolshed.g2.bx.psu.edu/view/abims-sbr/pogs):  Searches for orthogroups in a list of RBH. Searches for orthogroups in a list of RBH obtained by reciprocal tblastx during the tool pairwise. Proteic format. Proceeds to remove orthogroups with paralogous.
   * [pairwise](https://toolshed.g2.bx.psu.edu/view/abims-sbr/pairwise):  Homologous genes search from pairwise comparisons. This tool takes a zip archive containing nucleic fasta sequence files obtained with the tool filter_assemblies and searches different homologous genes from pairwise comparisons.
   * [blastalign](https://toolshed.g2.bx.psu.edu/view/abims-sbr/blastalign):  Multiple alignment of loci within an orthogroup. This tool uses the tool blastalign (Belshaw & Katzourakis 2005) to produce a multiple alignment of all the orthologous genes within an orthogroup. It takes as input the output of the tool pogs.
* *From [ecology](https://toolshed.g2.bx.psu.edu/view/ecology):*
   * [gdal_gdaladdo](https://toolshed.g2.bx.psu.edu/view/ecology/gdal_gdaladdo):  The gdaladdo utility can be used to build or rebuild overview images for most supported file formats with one of several downsampling algorithms. Gdal is a translator library for raster and vector geospatial data formats that is released under an X/MIT style Open Source license by the Open Source Geospatial Foundation. As a library, it presents a single raster abstract data model and single vector abstract data model to the calling application for all supported formats. It also comes with a variety of useful command line utilities for data translation and processing.
   * [gdal_ogrinfo](https://toolshed.g2.bx.psu.edu/view/ecology/gdal_ogrinfo):  The ogrinfo program lists various information about an OGR supported data source. 
   * [gdal_gdalbuildvrt](https://toolshed.g2.bx.psu.edu/view/ecology/gdal_gdalbuildvrt):  This program builds a VRT (Virtual Dataset) that is a mosaic of the list of input GDAL datasets. 
   * [gdal_ogr2ogr](https://toolshed.g2.bx.psu.edu/view/ecology/gdal_ogr2ogr):  The ogr2ogr program converts simple features data between file formats. 
   * [gdal_gdalinfo](https://toolshed.g2.bx.psu.edu/view/ecology/gdal_gdalinfo):  The gdalinfo program lists various information about a GDAL supported raster dataset. 
   * [gdal_gdalwarp](https://toolshed.g2.bx.psu.edu/view/ecology/gdal_gdalwarp):  The gdalwarp utility is an image mosaicing, reprojection and warping utility. The program can reproject to any supported projection, and can also apply GCPs stored with the image if the image is "raw" with control information. 
   * [gdal_gdal_translate](https://toolshed.g2.bx.psu.edu/view/ecology/gdal_gdal_translate):  The gdal_translate utility can be used to convert raster data between different formats, potentially performing some operations like subsettings, resampling, and rescaling pixels in the process. 
   * [gdal_gdal_merge](https://toolshed.g2.bx.psu.edu/view/ecology/gdal_gdal_merge):  This utility will automatically mosaic a set of images. All the images must be in the same coordinate system and have a matching number of bands, but they may be overlapping, and at different resolutions. In areas of overlap, the last image will be copied over earlier ones. 
* *From [thanhlv](https://toolshed.g2.bx.psu.edu/view/thanhlv):*
   * [socru](https://toolshed.g2.bx.psu.edu/view/thanhlv/socru):  Order and orientation of complete bacterial genomes. Socru allows you to easily identify and communicate the order and orientation of complete genomes around ribosomal operons.  These large scale structural variants have real impacts on the phenotype of the organism, and with the advent of long read sequencing, we can now start to delve into the mechanisms at work.
* *From [chemteam](https://toolshed.g2.bx.psu.edu/view/chemteam):*
   * [bio3d_pca_visualize](https://toolshed.g2.bx.psu.edu/view/chemteam/bio3d_pca_visualize):  Wrapper for the Bio3D package: PCA visualization. Bio3D is an R package containing utilities for the analysis of protein structure, sequence and trajectory data.
* *From [imgteam](https://toolshed.g2.bx.psu.edu/view/imgteam):*
   * [anisotropic_diffusion](https://toolshed.g2.bx.psu.edu/view/imgteam/anisotropic_diffusion):  Anisotropic image diffusion. Edge-preserving, Anisotropic image diffusion.
   * [binary2labelimage](https://toolshed.g2.bx.psu.edu/view/imgteam/binary2labelimage):  Binary 2 label image. This tools converts a binary image to a label image (every object has an own grey value).
   * [mergeneighboursinlabelimage](https://toolshed.g2.bx.psu.edu/view/imgteam/mergeneighboursinlabelimage):  Merge Neighbours in Label Image. This tools merges nearby objects in a label image using the minimum pixel distance.
   * [labelimage2points](https://toolshed.g2.bx.psu.edu/view/imgteam/labelimage2points):  Label Image to Points. This tool converts a label image to points.
   * [overlay_moving_and_fixed_image](https://toolshed.g2.bx.psu.edu/view/imgteam/overlay_moving_and_fixed_image):  Overlay moving and fixed image. This tool generates an overlay of two images of which one was transformed to match the other.
   * [mahotas_features](https://toolshed.g2.bx.psu.edu/view/imgteam/mahotas_features):  Compute image features using mahotas. Mahotas is a computer vision and image processing library for Python. This tool computes image features using mahotas.
   * [split_labelmap](https://toolshed.g2.bx.psu.edu/view/imgteam/split_labelmap):  Split Labelmaps. Separates different labels in the same image by creating a new image.
   * [visceral_evaluatesegmentation](https://toolshed.g2.bx.psu.edu/view/imgteam/visceral_evaluatesegmentation):  Visceral Project - Evaluate Segmentation Tool. This tools calculates several measures to evaluate image segmentations.
   * [count_objects](https://toolshed.g2.bx.psu.edu/view/imgteam/count_objects):  Count Objects. Count objects in an image.
   * [detection_viz](https://toolshed.g2.bx.psu.edu/view/imgteam/detection_viz):  Detection Visualization. This tool visualizes detection.
   * [points2labelimage](https://toolshed.g2.bx.psu.edu/view/imgteam/points2labelimage):  Points to label image. Converts points to label image.
   * [colocalization_viz](https://toolshed.g2.bx.psu.edu/view/imgteam/colocalization_viz):  Colocalization Visualization. Visualizes colocalization.
   * [points2binaryimage](https://toolshed.g2.bx.psu.edu/view/imgteam/points2binaryimage):  Points to Binary Image. Converts points to binary image.
   * [overlay_segmentation_mask](https://toolshed.g2.bx.psu.edu/view/imgteam/overlay_segmentation_mask):  Overlay segmentation mask. Overlay segmentation mask.
   * [wsi_extract_top_view](https://toolshed.g2.bx.psu.edu/view/imgteam/wsi_extract_top_view):  WSI Extract Top View. Extracts the top view of a whole-slide image (=virtual slide).
   * [curl_post](https://toolshed.g2.bx.psu.edu/view/imgteam/curl_post):  Send file via cURL POST. This tool uses cURL to send a file via POST.
   * [binaryimage2points](https://toolshed.g2.bx.psu.edu/view/imgteam/binaryimage2points):  Binary Image to Points. This tool calculates the center of mass of a binary image.
   * [slice_image](https://toolshed.g2.bx.psu.edu/view/imgteam/slice_image):  Slice image. Slices original image into several smaller patches.
   * [permutate_axis](https://toolshed.g2.bx.psu.edu/view/imgteam/permutate_axis):  Permutates axes. Edge-preserving, Anisotropic image diffusion.
   * [concat_channels](https://toolshed.g2.bx.psu.edu/view/imgteam/concat_channels):  Concatenate images. This tool concatenates images.
   * [2d_feature_extraction](https://toolshed.g2.bx.psu.edu/view/imgteam/2d_feature_extraction):  2D feature extraction. Extraction of various features in 2D.
   * [scale_image](https://toolshed.g2.bx.psu.edu/view/imgteam/scale_image):  Scale image. Scales image by a certain factor using nearest, bilinear or bicubic interpolation.
   * [2d_auto_threshold](https://toolshed.g2.bx.psu.edu/view/imgteam/2d_auto_threshold):  2d automatic threshold. Automatic thresholding in 2D.
   * [color_deconvolution](https://toolshed.g2.bx.psu.edu/view/imgteam/color_deconvolution):  Color-deconvolution methods. This tools does color space transformation using preset transformation matrices or color space decomposition.
   * [landmark_registration](https://toolshed.g2.bx.psu.edu/view/imgteam/landmark_registration):  Landmark Registration. This tool estimates the transformation matrix between two sets of 2d points.
   * [projective_transformation](https://toolshed.g2.bx.psu.edu/view/imgteam/projective_transformation):  Projective transformation. This tool performs a projective transformation of the input (moving) image so that it fits the fixed image. Returns the projected image.
   * [projective_transformation_points](https://toolshed.g2.bx.psu.edu/view/imgteam/projective_transformation_points):  Projective transformation - Points. This tool performs a projective transformation of input coordinates with a warp matrix.
   * [coordinates_of_roi](https://toolshed.g2.bx.psu.edu/view/imgteam/coordinates_of_roi):  Coordinates of ROI. Obtains the coordinates regions of interest on an image.
   * [2d_simple_filter](https://toolshed.g2.bx.psu.edu/view/imgteam/2d_simple_filter):  2d simple filter. 
* *From [proteore](https://toolshed.g2.bx.psu.edu/view/proteore):*
   * [proteore_prot_features_mouse](https://toolshed.g2.bx.psu.edu/view/proteore/proteore_prot_features_mouse):  ProteoRE Add protein features (Mouse). A tool to add Mus musculus protein features from UniProt.

