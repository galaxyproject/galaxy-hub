---
title: "January 2019 Tool Shed contributions"
---

[<img class="float-right" src="/src/images/galaxy-logos/galaxy-toolshed-300.png" alt="Galaxy ToolShed" width="180">](http://toolshed.g2.bx.psu.edu/)

Tools contributed to the Galaxy Project [ToolShed](http://toolshed.g2.bx.psu.edu/) in [January 2019](/src/news/2019-02-galaxy-update/index.md).

* [All monthly summaries](/src/toolshed/contributions/index.md)

## New Tools

* *From [nml](https://toolshed.g2.bx.psu.edu/view/nml):*
   * [ectyper](https://toolshed.g2.bx.psu.edu/view/nml/ectyper):  EC-Typer - in silico serotyping of Escherichia coli species. EC-Typer is a standalone serotyping module for Escherichia coli typing. It supports fasta and fastq file formats. Designed by Chad Liang et al.
* *From [jfb](https://toolshed.g2.bx.psu.edu/view/jfb):*
   * [kinamine_y_for_peptide_shaker](https://toolshed.g2.bx.psu.edu/view/jfb/kinamine_y_for_peptide_shaker):  Extracts phosphorylated motifs from Peptide Shaker PSM file. Kinamine takes a PSM Phosphorylation Report and extracts from it all peptides containing a phospho(Y), along with the 7 amino acids N- and C- terminal to the pY in that peptide.  This file is the *Substrates* file.
   * [kinatest_fisher_test](https://toolshed.g2.bx.psu.edu/view/jfb/kinatest_fisher_test):  A version of KINATEST-ID using Fisher's Exact Test. This version of KINATEST-ID uses Fisher's Exact Test to determine if an amino acid is over or under represented (if the kinase "likes" or "dislikes" it), and using this tool a kinase's preferred substrate motif can be discovered.  This tool is intended to work in conjunction with Negative Motif Finder and KinaMine.
   * [difference_finder](https://toolshed.g2.bx.psu.edu/view/jfb/difference_finder):  Finds symmetrical differences between substrate sets. This tool takes two Kinamine outputs (substrates and substrate background frequency files) and finds the symmetrical differences between those sets. The associated Substrate Background Frequency files for each consists of all the proteins associated with that substrate file.
* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
   * [hyphy_absrel](https://toolshed.g2.bx.psu.edu/view/iuc/hyphy_absrel):  Wrapper for the HyPhy batch operation: HyPhy-aBSREL. "HyPhy is an open-source software package for the analysis of genetic  sequences (in particular the inference of natural selection) using techniques  in phylogenetics, molecular evolution, and machine learning".
   * [hyphy_fel](https://toolshed.g2.bx.psu.edu/view/iuc/hyphy_fel):  Wrapper for the HyPhy batch operation: HyPhy-FEL. 
   * [hyphy_slac](https://toolshed.g2.bx.psu.edu/view/iuc/hyphy_slac):  Wrapper for the HyPhy batch operation: HyPhy-SLAC. 
   * [hyphy_fubar](https://toolshed.g2.bx.psu.edu/view/iuc/hyphy_fubar):  Wrapper for the HyPhy batch operation: HyPhy-FUBAR. 
   * [hyphy_busted](https://toolshed.g2.bx.psu.edu/view/iuc/hyphy_busted):  Wrapper for the HyPhy batch operation: HyPhy-BUSTED. 
   * [taxonomy_filter_refseq](https://toolshed.g2.bx.psu.edu/view/iuc/taxonomy_filter_refseq):  Filter RefSeq by taxonomy. Filters RefSeq FASTA files, only retaining sequences that are descendants of a given taxonomic node.
   * [gemini_inheritance](https://toolshed.g2.bx.psu.edu/view/iuc/gemini_inheritance):  Wrapper for the gemini tool suite: GEMINI inheritance pattern. The intent of GEMINI (GEnome MINIing) is to provide a simple, flexible, and powerful framework for exploring genetic variation for  personal and medical genetics. GEMINI is unique in that it integrates genetic variation (from VCF files) with a wealth of genome  annotations into a unified database framework. Using this integrated database as the analysis framework, we aim to leverage the  expressive power of SQL for data analysis, while attempting to overcome the fundamental challenges associated with using databases for  very large (e.g. 1,000,000 variants times 1,000 samples yields one billion genotypes) datasets. In addition, by defining sample  relationships with a PED file, GEMINI allows one to explore and test for variants that meet specific inheritance models (e.g.,  recessive, dominant, etc.).
   * [shorah_amplicon](https://toolshed.g2.bx.psu.edu/view/iuc/shorah_amplicon):  Reconstruct haplotypes using ShoRAH in amplicon mode. ShoRAH is an open source project for the analysis of next generation sequencing data. It is designed to analyse genetically heterogeneous samples. Its tools are written in different programming languages and provide error correction, haplotype reconstruction and estimation of the frequency of the different genetic variants present in a mixed sample.
   * [goslimmer](https://toolshed.g2.bx.psu.edu/view/iuc/goslimmer):  GOSlimmer tool from the goenrichment package. GOEnrichment is a tool for performing GO Enrichment Analysis of a set of gene products.   It incorporates a graph summarization method to simplify the output.  It also contains another tool (GOSlimmer) to transform GO Annotations to slimmed versions of GO.
   * [goenrichment](https://toolshed.g2.bx.psu.edu/view/iuc/goenrichment):  GOEnrichment tool from the goenrichment package. GOEnrichment is a tool for performing GO Enrichment Analysis of a set of gene products.   It incorporates a graph summarization method to simplify the output.  It also contains another tool (GOSlimmer) to transform GO Annotations to slimmed versions of GO.
   * [spaln](https://toolshed.g2.bx.psu.edu/view/iuc/spaln):  Spaln (space-efficient spliced alignment) maps and aligns a set of cDNA or protein sequences onto a whole genomic sequence. Spaln (space-efficient spliced alignment) is a stand-alone program that maps and aligns a set of cDNA or  protein sequences onto a whole genomic sequence in a single job.
   * [crosscontamination_barcode_filter](https://toolshed.g2.bx.psu.edu/view/iuc/crosscontamination_barcode_filter):  Barcode contamination discovery tool. This tool produces plots enabling the discovery of cross-contamination of samples across the full selection of barcodes used in a sequencing plate. It also filters false barcodes from each batch and retains only the 'real' barcodes.
* *From [thomaswollmann](https://toolshed.g2.bx.psu.edu/view/thomaswollmann):*
   * [overlay_segmentation_mask](https://toolshed.g2.bx.psu.edu/view/thomaswollmann/overlay_segmentation_mask):  Overlay segmentation mask. Overlay segmentation mask.
   * [wsi_extract_top_view](https://toolshed.g2.bx.psu.edu/view/thomaswollmann/wsi_extract_top_view):  WSI Extract Top View. Extracts the top view of a whole-slide image (=virtual slide).
   * [projective_transformation_points](https://toolshed.g2.bx.psu.edu/view/thomaswollmann/projective_transformation_points):  Projective transformation - Points. This tool performs a projective transformation of input coordinates with a warp matrix.
   * [overlay_moving_and_fixed_image](https://toolshed.g2.bx.psu.edu/view/thomaswollmann/overlay_moving_and_fixed_image):  Overlay moving and fixed image. This tool generates an overlay of two images of which one was transformed to match the other.
   * [mergeneighboursinlabelimage](https://toolshed.g2.bx.psu.edu/view/thomaswollmann/mergeneighboursinlabelimage):  Merge Neighbours in Label Image. This tools merges nearby objects in a label image using the minimum pixel distance.
   * [2d_feature_extraction](https://toolshed.g2.bx.psu.edu/view/thomaswollmann/2d_feature_extraction):  2D feature extraction. Extraction of various features in 2D.
   * [projective_transformation](https://toolshed.g2.bx.psu.edu/view/thomaswollmann/projective_transformation):  Projective transformation. This tool performs a projective transformation of the input (moving) image so that it fits the fixed image. Returns the projected image.
   * [curl_post](https://toolshed.g2.bx.psu.edu/view/thomaswollmann/curl_post):  Send file via cURL POST. This tool uses cURL to send a file via POST.
   * [colocalization_viz](https://toolshed.g2.bx.psu.edu/view/thomaswollmann/colocalization_viz):  Colocalization Visualization. Visualizes colocalization.
   * [count_objects](https://toolshed.g2.bx.psu.edu/view/thomaswollmann/count_objects):  Count Objects. Count objects in an image.
   * [coordinates_of_roi](https://toolshed.g2.bx.psu.edu/view/thomaswollmann/coordinates_of_roi):  Coordinates of ROI. Obtains the coordinates regions of interest on an image.
   * [scale_image](https://toolshed.g2.bx.psu.edu/view/thomaswollmann/scale_image):  Scale image. Scales image by a certain factor using nearest, bilinear or bicubic interpolation.
* *From [stemcellcommons](https://toolshed.g2.bx.psu.edu/view/stemcellcommons):*
   * [atac_seq_workflows](https://toolshed.g2.bx.psu.edu/view/stemcellcommons/atac_seq_workflows): Initial version. Identify accessible chromatin regions. 
* *From [mvdbeek](https://toolshed.g2.bx.psu.edu/view/mvdbeek):*
   * [damid_deseq2_to_peaks](https://toolshed.g2.bx.psu.edu/view/mvdbeek/damid_deseq2_to_peaks):  Convert damid deseq2 result file to peaks in bed format. Convert damid deseq2 result file to peaks in bed format.
