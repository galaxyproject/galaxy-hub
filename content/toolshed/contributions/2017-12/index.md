---
title: December 2017 Tool Shed contributions
---

[<img class="float-right" src="/src/images/galaxy-logos/galaxy-toolshed-300.png" alt="Galaxy ToolShed" width="180">](http://toolshed.g2.bx.psu.edu/)

Tools contributed to the Galaxy Project [ToolShed](http://toolshed.g2.bx.psu.edu/) in [December 2017](/src/galaxy-updates/2018-01/index.md).

* [All monthly summaries](/src/toolshed/contributions/index.md)

## New Tools

* *From [proteore](https://toolshed.g2.bx.psu.edu/view/proteore):*
   * [proteore_topgo](https://toolshed.g2.bx.psu.edu/view/proteore/proteore_topgo):  proteore_topgo. performs enrichment analysis using R package topGO.
* *From [nml](https://toolshed.g2.bx.psu.edu/view/nml):*
   * [quasitools](https://toolshed.g2.bx.psu.edu/view/nml/quasitools):  A collection of tools for analysing Viral Quasispecies. Includes aacoverage, callaavar, callcodonvar, callntvar, consensus, dnds, drmutations, and the hydra pipeline.
* *From [dfornika](https://toolshed.g2.bx.psu.edu/view/dfornika):*
   * [mentalist](https://toolshed.g2.bx.psu.edu/view/dfornika/mentalist):  MLST caller designed to handle large typing schemes. 
* *From [brasset_jensen](https://toolshed.g2.bx.psu.edu/view/brasset_jensen):*
   * [srnapipe](https://toolshed.g2.bx.psu.edu/view/brasset_jensen/srnapipe):  A pipeline for bioinformatic in-depth exploration of small RNAseq data. 
* *From [rnateam](https://toolshed.g2.bx.psu.edu/view/rnateam):*
   * [viennarna_rnaplfold](https://toolshed.g2.bx.psu.edu/view/rnateam/viennarna_rnaplfold):  Wrapper for ViennaRNA application RNAplfold. RNA secondary structure prediction through energy minimization is the most used function in the package. There are three kinds of dynamic programming algorithms for structure prediction provided: the minimum free energy algorithm of (Zuker & Stiegler 1981) which yields a single optimal structure, the partition function algorithm of (McCaskill 1990) which calculates base pair probabilities in the thermodynamic ensemble, and the suboptimal folding algorithm of (Wuchty et.al 1999) which generates all suboptimal structures within a given energy range of the optimal energy. For secondary structure comparison, the package contains several measures of distance (dissimilarities) using either string alignment or tree-editing (Shapiro & Zhang 1990). Finally, we provide an algorithm to design sequences with a predefined structure (inverse folding).
* *From [nitrozyna](https://toolshed.g2.bx.psu.edu/view/nitrozyna):*
   * [dm1_genotypying](https://toolshed.g2.bx.psu.edu/view/nitrozyna/dm1_genotypying):  Genotyping microsatellite repeats in Myotonic Dystrophy type 1 data. Genotyping microsatellite repeats in Myotonic Dystrophy type 1 data.
* *From [wolma](https://toolshed.g2.bx.psu.edu/view/wolma):*
   * [mimodd_main](https://toolshed.g2.bx.psu.edu/view/wolma/mimodd_main):  The main tools of the MiModD suite of tools. These tools provide the main mapping-by-sequencing functionality of MiModD. Note that sequence reads have to be aligned to the corresponding reference genome before they can be analyzed. This can be done with any modern aligner of your choice or through the MiModD Read Alignment tool available from the separate repository mimodd_aln. Functional annotation of identified variants can be performed using SnpEff. MiModD-specific wrappers for SnpEff are available from the separate repository mimodd_snpeff though more general wrappers should be compatible, too.
* *From [estrain](https://toolshed.g2.bx.psu.edu/view/estrain):*
   * [srst2](https://toolshed.g2.bx.psu.edu/view/estrain/srst2):  Short Read Sequencing Typing - srst2. This program is designed to take Illumina sequence data, a MLST database and/or a database of gene sequences (e.g. resistance genes, virulence genes, etc) and report the presence of STs and/or reference genes.
   * [btyper](https://toolshed.g2.bx.psu.edu/view/estrain/btyper):  Virulence-based classification of Bacillus cereus group. BTyper is a tool that employs a combination of (i) virulence gene-based typing, (ii) multi-locus sequence typing (MLST), (iii) panC clade typing, and (iv) rpoB allelic typing to rapidly classify B. cereus group isolates using nucleotide sequencing data.    Additionally, antimicrobial resistance (AMR) gene detection was added in BTyper version 2.0.0 (released 2017-06-29), a function that can be used with sequencing data from any bacterial species.
   * [seqsero_v1](https://toolshed.g2.bx.psu.edu/view/estrain/seqsero_v1):  Salmonella serotypings using NGS. SeqSero is a pipeline for Salmonella serotype determination from raw sequencing reads or genome assemblies.
* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
   * [bcftools_plugin_frameshifts](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_frameshifts):  Wrapper for bcftools application bcftools frameshifts. BCFtools are meant as a faster replacement for most of the perl VCFtools commands.
   * [bcftools_plugin_color_chrs](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_color_chrs):  Wrapper for bcftools application bcftools color-chrs. BCFtools are meant as a faster replacement for most of the perl VCFtools commands.
   * [structureharvester](https://toolshed.g2.bx.psu.edu/view/iuc/structureharvester):  for parsing STRUCTURE outputs and for performing the Evanno method. http://taylor0.biology.ucla.edu/structureHarvester/.
   * [genehunter_modscore](https://toolshed.g2.bx.psu.edu/view/iuc/genehunter_modscore):  Maximised LOD score pedigree analysis utility. 
   * [swiftlink](https://toolshed.g2.bx.psu.edu/view/iuc/swiftlink):  Parallel MCMC Linkage Analysis. 
   * [allegro](https://toolshed.g2.bx.psu.edu/view/iuc/allegro):  Linkage and haplotype analysis from deCODE. 
   * [ococo](https://toolshed.g2.bx.psu.edu/view/iuc/ococo):  Variant detection of SNVs. Variant detection from high-throughput sequencing data is an essential step in identification of alleles involved in complex diseases and cancer. To deal with these massive data, elaborated sequence analysis pipelines are employed. A core component of such pipelines is a read mapping module whose accuracy strongly affects the quality of resulting variant calls.  We propose a dynamic read mapping approach that significantly improves read alignment accuracy. The general idea of dynamic mapping is to continuously update the reference sequence on the basis of previously computed read alignments. Even though this concept already appeared in the literature, we believe that our work provides the first comprehensive analysis of this approach.
   * [poretools_events](https://toolshed.g2.bx.psu.edu/view/iuc/poretools_events):  Wrapper for poretools operation Extract nanopore events. A flexible toolkit for exploring datasets generated by nanopore sequencing devices from MinION for the purposes of quality control and downstream analysis.
   * [poretools_extract](https://toolshed.g2.bx.psu.edu/view/iuc/poretools_extract):  Wrapper for poretools operation Extract reads. 
   * [poretools_qualpos](https://toolshed.g2.bx.psu.edu/view/iuc/poretools_qualpos):  Wrapper for poretools operation Generate box-whisker. 
   * [poretools_qualdist](https://toolshed.g2.bx.psu.edu/view/iuc/poretools_qualdist):  Wrapper for poretools operation Show quality. 
   * [poretools_stats](https://toolshed.g2.bx.psu.edu/view/iuc/poretools_stats):  Wrapper for poretools operation Read length statistics. 
   * [poretools_tabular](https://toolshed.g2.bx.psu.edu/view/iuc/poretools_tabular):  Wrapper for poretools operation Extract FASTQ. 
   * [poretools_times](https://toolshed.g2.bx.psu.edu/view/iuc/poretools_times):  Wrapper for poretools operation Extract time. 
   * [poretools_occupancy](https://toolshed.g2.bx.psu.edu/view/iuc/poretools_occupancy):  Wrapper for poretools operation Plot performance. 
   * [poretools_hist](https://toolshed.g2.bx.psu.edu/view/iuc/poretools_hist):  Wrapper for poretools operation Generate histogram. 
   * [poretools_squiggle](https://toolshed.g2.bx.psu.edu/view/iuc/poretools_squiggle):  Wrapper for poretools operation Plot signals. 
   * [poretools_yield_plot](https://toolshed.g2.bx.psu.edu/view/iuc/poretools_yield_plot):  Wrapper for poretools operation Collector’s curve. 
   * [poretools_nucdist](https://toolshed.g2.bx.psu.edu/view/iuc/poretools_nucdist):  Wrapper for poretools operation Show nucleotide. 
   * [poretools_winner](https://toolshed.g2.bx.psu.edu/view/iuc/poretools_winner):  Wrapper for poretools operation Get longest read. 
* *From [galaxyp](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
   * [pep_pointer](https://toolshed.g2.bx.psu.edu/view/galaxyp/pep_pointer):  PepPointer categorizes peptides by their genomic coordinates. 
* *From [stemcellcommons](https://toolshed.g2.bx.psu.edu/view/stemcellcommons):*
   * [merging_workflows](https://toolshed.g2.bx.psu.edu/view/stemcellcommons/merging_workflows): Initial upload. BAM and FASTQ merging workflows. 
* *From [petr-novak](https://toolshed.g2.bx.psu.edu/view/petr-novak):*
   * [long_reads_sampling](https://toolshed.g2.bx.psu.edu/view/petr-novak/long_reads_sampling):  long_reads_sampling. Create sample of long reads.
* *From [mingchen0919](https://toolshed.g2.bx.psu.edu/view/mingchen0919):*
   * [rmarkdown_feature_counts](https://toolshed.g2.bx.psu.edu/view/mingchen0919/rmarkdown_feature_counts):  This function assigns mapped sequencing reads to genomic features. 
   * [rmarkdown_deseq2_count_matrix](https://toolshed.g2.bx.psu.edu/view/mingchen0919/rmarkdown_deseq2_count_matrix):  perform DESeq2 analysis given a count matrix input. 
   * [rmarkdown_samtools_flagstat](https://toolshed.g2.bx.psu.edu/view/mingchen0919/rmarkdown_samtools_flagstat): fix wrong input type error. simple stats on BAM file. provide simple stats on BAM with samtools flagstat.
* *From [erasmus-medical-center](https://toolshed.g2.bx.psu.edu/view/erasmus-medical-center):*
   * [extract_element_from_collection](https://toolshed.g2.bx.psu.edu/view/erasmus-medical-center/extract_element_from_collection):  extract an element from a collection by name. 
   * [mycrobiota](https://toolshed.g2.bx.psu.edu/view/erasmus-medical-center/mycrobiota):  tools for 16S microbial analysis. supporting tools for the EMC's mothur-based MYcrobiota workflow.
* *From [sarahinraauzeville](https://toolshed.g2.bx.psu.edu/view/sarahinraauzeville):*
   * [function_table_4t_ax4fun_matrix](https://toolshed.g2.bx.psu.edu/view/sarahinraauzeville/function_table_4t_ax4fun_matrix):  generate function table for OTU and Tax table. Use of Tax4Fun with themetagenomics R package, otu_table and tax_table of phyloseq object to generate function table.
   * [star](https://toolshed.g2.bx.psu.edu/view/sarahinraauzeville/star):  Map with STAR 2.4.0i with GTF and reference. This program STAR allows you to aligns RNA-seq reads to a reference genome using uncompressed suffix arrays.
   * [tax4fun](https://toolshed.g2.bx.psu.edu/view/sarahinraauzeville/tax4fun): Updated xml. Prediction of functional profiles from amplicon-data. Tax4Fun predicts the functional or metabolic capabilities of microbial communities based on 16S data samples.
   * [samtools_sort](https://toolshed.g2.bx.psu.edu/view/sarahinraauzeville/samtools_sort):  Samtools sort by  read names or by chromosomal coordinates. Samtools sort by  read names or by chromosomal coordinates.
   * [dos2unix](https://toolshed.g2.bx.psu.edu/view/sarahinraauzeville/dos2unix): xml. Clean Windows files in order to be used on cluster (unix). This command (dos2unix) cleans files from Windows in order to be used with unix.
* *From [bgruening](https://toolshed.g2.bx.psu.edu/view/bgruening):*
   * [hicexplorer_hicplotviewpoint](https://toolshed.g2.bx.psu.edu/view/bgruening/hicexplorer_hicplotviewpoint):  Wrapper for HiCExplorer: hicPlotViewpoint. Sequencing techniques that probe the 3D organization of the genome generate large amounts of  data whose processing, analysis and visualization is challenging. Here, we present Hi-C Explorer,  a set of tools for the analysis and visualization of chromosome conformation data. Hi-C explorer  facilitates the creation of contact matrices, correction of contacts, TAD detection, merging,  reordering or chromosomes, conversion from different formats and detection of long-range contacts.  Moreover, it allows the visualization of multiple contact matrices along with other types of data  like genes, compartments, ChIP-seq coverage tracks (and in general any type of genomic scores) and long range contacts.    doi: 10.5281/zenodo.159780    Repository-Maintainer: Björn Grüning    https://github.com/maxplanck-ie/HiCExplorer.
   * [hicexplorer_hictransform](https://toolshed.g2.bx.psu.edu/view/bgruening/hicexplorer_hictransform):  Wrapper for HiCExplorer: hicTransform. 
   * [hicexplorer_hicpca](https://toolshed.g2.bx.psu.edu/view/bgruening/hicexplorer_hicpca):  Wrapper for HiCExplorer: hicPCA. 
* *From [fabio](https://toolshed.g2.bx.psu.edu/view/fabio):*
   * [srase](https://toolshed.g2.bx.psu.edu/view/fabio/srase): 20171204. Sequence Read Archive Search Engine. A fast querying tool to search on the Sequence Read Archive repository using Bloom Filters.
* *From [cstrittmatter](https://toolshed.g2.bx.psu.edu/view/cstrittmatter):*
   * [seqsero_v2](https://toolshed.g2.bx.psu.edu/view/cstrittmatter/seqsero_v2):  seqsero_v2. SeqSero2 is a pipeline for Salmonella serotype determination from raw sequencing reads or genome assemblies. This is a alpha test version. For now, it can only accept separated paired-end reads. A web app will be available soon.

