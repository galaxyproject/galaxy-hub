---
title: January 2018 Tool Shed contributions
---

[<img class="float-right" src="/src/images/galaxy-logos/galaxy-toolshed-300.png" alt="Galaxy ToolShed" width="180">](http://toolshed.g2.bx.psu.edu/)

Tools contributed to the Galaxy Project [ToolShed](http://toolshed.g2.bx.psu.edu/) in [January 2018](/src/galaxy-updates/2018-02/index.md).

* [All monthly summaries](/src/toolshed/contributions/index.md)

## New Tools

* *From [jpetteng](https://toolshed.g2.bx.psu.edu/view/jpetteng):*
   * [ectyper1_0](https://toolshed.g2.bx.psu.edu/view/jpetteng/ectyper1_0):  E. coli typer based on WGS data. 
* *From [galaxyp](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
   * [retrieve_ensembl_bed](https://toolshed.g2.bx.psu.edu/view/galaxyp/retrieve_ensembl_bed):  Retrieve cDNA features from Ensembl REST API in BED format. Retrieve cDNA features from Ensembl REST API in BED format.  Features can be filtered by genomic region or Ensembl biotype.
   * [proteomics_moff](https://toolshed.g2.bx.psu.edu/view/galaxyp/proteomics_moff):  moFF (a modest Feature Finder) extracts MS1 intensities from RAW and mzML spectrum files. moFF is an open-source Python program for label-free quantification. It associates the apex intensity of the MS1 scans with peptides identified via SearchGUI/PeptideShaker or other search engine tools.  https://github.com/compomics/moFF.
   * [flashlfq](https://toolshed.g2.bx.psu.edu/view/galaxyp/flashlfq):  FlashLFQ mass-spectrometry proteomics label-free quantification. FlashLFQ is an ultrafast label-free quantification algorithm for mass-spectrometry proteomics.
   * [gffcompare_to_bed](https://toolshed.g2.bx.psu.edu/view/galaxyp/gffcompare_to_bed):  Filter and convert a gffCompare GTF to BED. Converts the annotated GTF output from gffCompare to BED format.  The GTF can be filtered using the class_code annotations from gffCompare.
   * [openms_mapalignerposeclustering](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_mapalignerposeclustering):  Wrapper for the OpenMS suite tool: MapAlignerPoseClustering. OpenMS is an open-source software C++ library for LC/MS data management and analyses. It offers an infrastructure for the rapid development of mass spectrometry related software.  https://www.openms.de/.
   * [translate_bed](https://toolshed.g2.bx.psu.edu/view/galaxyp/translate_bed):  Translate BED transcript CDS or cDNA in 3 frames. Translate transcripts from the input BED file into protein sequences.    The genomic sequence may be supplied  in an extra column in the BED input file,  retrieved from a twobit genomic reference file,    or retrieved from the Ensembl REST API for Ensembl transcripts.
   * [bed_to_protein_map](https://toolshed.g2.bx.psu.edu/view/galaxyp/bed_to_protein_map):  Converts a BED file to a tabular list of exon locations. Converts a BED file (12 column) to a 6 column tabular list of exon locations  with columns: name,chrom,start,end,strand,cds_start,cds_end.    It relies on the ThickStart and ThckEnd columns of the BED file to define   the coding start and end of a protein sequence.    The tabular format can be converted to a sqlite table for the quick lookup of  the genomic location of any animo acid in the protein sequence.
* *From [nml](https://toolshed.g2.bx.psu.edu/view/nml):*
   * [kat_filter](https://toolshed.g2.bx.psu.edu/view/nml/kat_filter):  Filtering kmers or reads from a database of kmers hashes. 
* *From [vmarcon](https://toolshed.g2.bx.psu.edu/view/vmarcon):*
   * [pcafactominer](https://toolshed.g2.bx.psu.edu/view/vmarcon/pcafactominer):  Realize a PCA analysis using FactoMineR package. 
   * [h_clust](https://toolshed.g2.bx.psu.edu/view/vmarcon/h_clust):  Generate hierarchical cluster analysis on a numeric data table. 
   * [normalization](https://toolshed.g2.bx.psu.edu/view/vmarcon/normalization):  Normalize your data with some well known methods. 
   * [summary_statistics](https://toolshed.g2.bx.psu.edu/view/vmarcon/summary_statistics):  Produce simple descriptive statistics from a numeric table. 
* *From [dfornika](https://toolshed.g2.bx.psu.edu/view/dfornika):*
   * [newick_display](https://toolshed.g2.bx.psu.edu/view/dfornika/newick_display):  Newick display from Newick utilities. 
* *From [artbio](https://toolshed.g2.bx.psu.edu/view/artbio):*
   * [deseq2_normalization](https://toolshed.g2.bx.psu.edu/view/artbio/deseq2_normalization):  Normalizes gene hitlists. Normalizes gene count lists using DESeq2 estimateSizeFactors() function.
* *From [fabio](https://toolshed.g2.bx.psu.edu/view/fabio):*
   * [sbtas_se](https://toolshed.g2.bx.psu.edu/view/fabio/sbtas_se): 20180122. AllSome Sequence Bloom Tree Search Engine. Rapid querying of massive sequence datasets.
* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
   * [annotatemyids](https://toolshed.g2.bx.psu.edu/view/iuc/annotatemyids):  annotateMyIDs: get annotation for a set of IDs using the Bioconductor annotation packages. Given a table containing a column of IDs, this tool can get annotation using the Bioconductor orgDb packages.  Supported organisms are human, mouse, fruit fly and zebrafish and supported IDs include Ensembl,  Entrez ID, RefSeq, Gene Symbol, GO and KEGG.
   * [data_manager_manual](https://toolshed.g2.bx.psu.edu/view/iuc/data_manager_manual):  manual data manager. This tool manually builds local data and populates tool data tables.
   * [picrust_compare_biom](https://toolshed.g2.bx.psu.edu/view/iuc/picrust_compare_biom):  Wrapper for picrust application: Compare BIOM tables. PICRUSt (pronounced “pie crust”) is a bioinformatics software package designed to predict metagenome functional content from marker gene (e.g., 16S rRNA) surveys and full genomes.
   * [egsea](https://toolshed.g2.bx.psu.edu/view/iuc/egsea):  This tool implements the Ensemble of Gene Set Enrichment Analyses (EGSEA) method for gene set testing. The EGSEA algorithm takes RNA-seq count data as input and utilizes twelve prominent Gene Set Enrichment   algorithms to calculate collective significance scores for gene sets from MSigDB, GeneSetDB and KEGG.   Supported organisms are human, mouse and rat.
   * [picrust_format_tree_and_trait_table](https://toolshed.g2.bx.psu.edu/view/iuc/picrust_format_tree_and_trait_table):  Wrapper for picrust application: Format. PICRUSt (pronounced “pie crust”) is a bioinformatics software package designed to predict metagenome functional content from marker gene (e.g., 16S rRNA) surveys and full genomes.
   * [umi_tools_dedup](https://toolshed.g2.bx.psu.edu/view/iuc/umi_tools_dedup):  Wrapper for the UMI-tools suite tool: UMI-tools deduplicate. Extract UMI barcode from a read and add it to the read name, leaving  any sample barcode in place. Can deal with paired end reads and UMIs  split across the paired ends.
   * [mykrobe_predict](https://toolshed.g2.bx.psu.edu/view/iuc/mykrobe_predict):  Wrapper Mykrobe tool suite: mkyrobe predict. Rapid antibiotic-resistance predictions from genome sequence data for Staphylococcus aureus and Mycobacterium tuberculosis.
   * [mykrobe_genotype](https://toolshed.g2.bx.psu.edu/view/iuc/mykrobe_genotype):  Wrapper Mykrobe tool suite: mkyrobe genotype. Rapid antibiotic-resistance predictions from genome sequence data for Staphylococcus aureus and Mycobacterium tuberculosis.
* *From [haydensun](https://toolshed.g2.bx.psu.edu/view/haydensun):*
   * [manorm](https://toolshed.g2.bx.psu.edu/view/haydensun/manorm):  MAnorm: A robust model for quantitative comparison of ChIP-Seq data sets. ChIP-Seq is widely used to characterize genome-wide binding patterns of transcription factors and other chromatin-associated proteins. Although comparison of ChIP-Seq data sets is critical for understanding cell type-dependent and cell state-specific binding, and thus the study of cell-specific gene regulation, few quantitative approaches have been developed.  Here, we present a simple and effective method, MAnorm, for quantitative comparison of ChIP-Seq data sets describing transcription factor binding sites and epigenetic modifications. The quantitative binding differences inferred by MAnorm showed strong correlation with both the changes in expression of target genes and the binding of cell type-specific regulators.
