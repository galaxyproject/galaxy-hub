---
autotoc: true
title: June and July 2015 Tool Shed Contributions
---


<div class='right'></div>

<div class='right'><a href='http://toolshed.g2.bx.psu.edu/'><img src="/src/Images/Logos/ToolShed.jpg" alt="Galaxy ToolShed" width=200 /></a></div>
Tools contributed to the Galaxy Project Tool Shed in June and July 2015.

In no particular order:

### New Tools

#### Suites

* *From [dereeper](https://toolshed.g2.bx.psu.edu/view/dereeper):*
  * [sniplay_complete_workflow](https://toolshed.g2.bx.psu.edu/view/dereeper/sniplay_complete_workflow): SNiPlay3 complete workflow: exploration and large scale analyses of genomic variations SNiPlay3 complete workflow: exploration and large scale analyses of genomic variations

* *From [cmonjeau](https://toolshed.g2.bx.psu.edu/view/cmonjeau):*
  * [archive_toolbox](https://toolshed.g2.bx.psu.edu/view/cmonjeau/archive_toolbox): Imported from capsule None Tools to manage archive Contains archive datatypes, compress zip tool and decompress tool
  * [colibread_tool_suite](https://toolshed.g2.bx.psu.edu/view/cmonjeau/colibread_tool_suite): Imported from capsule None Colib'read tool suite This package includes :
    * Lordec
    * DiscoSNP
    * !KissSplice
    * TakeABreak
    * Commet
    * Mapsembler2

#### Tools

* *From [pjbriggs](https://toolshed.g2.bx.psu.edu/view/pjbriggs):*
  * [ceas](https://toolshed.g2.bx.psu.edu/view/pjbriggs/ceas): initial version 1.0.2-2 CEAS Cis-regulatory Element Annotation System CEAS can be characterize genome-wide protein-DNA interaction patterns from ChIP-chip and ChIP-Seq of both sharp and broad binding factors.

       This tool uses the version of CEAS included in the Cistrome package which can handle bigWig input, and includes a data manager to download or create the gene annotation table files.
* [rnachipintegrator](https://toolshed.g2.bx.psu.edu/view/pjbriggs/rnachipintegrator): initial version 0.4.4. Utility for integrating sets of genomic features (e.g. canonical genes, CpG islands) with expression data  !RnaChipIntegrator is a utility that performs integrated analyses of gene expression and ChIP data, identifying the nearest ChIP peaks to each transcript, and vice versa. Output of !RnaChipIntegrator differs according to the criteria that are used to calculate the distances between ChIP peaks and transcripts.
* [macs21](https://toolshed.g2.bx.psu.edu/view/pjbriggs/macs21): initial version 2.1.0-4. MACS 2.1.0 (Model-based Analysis of ChIP-Seq) peak calling Galaxy tool used at UoM Tool wrapper for running the peak calling function of MACS 2.1.0 (Model-based Analysis of ChIP-Seq), as used at the Bioinformatics Core Facility at the University of Manchester.

     Optionally can output a bigWig file for input directly into the UoM 'ceas' tool.

* *From [devteam](https://toolshed.g2.bx.psu.edu/view/devteam):*
  * [kraken_translate](https://toolshed.g2.bx.psu.edu/view/devteam/kraken_translate): planemo upload for repository https://github.com/galaxyproject/tools-devteam/blob/master/tool_collections/kraken/kraken_translate/ commit [00a7926c285bc4a339bd7deebf40b28f39c7d947](https://github.com/galaxyproject/tools-devteam/commit/00a7926c285bc4a339bd7deebf40b28f39c7d947)-dirty Contains a galaxy tool wrapper for the kraken-translate command. Kraken is a system for assigning taxonomic labels to short DNA sequences, usually obtained through metagenomic studies. Previous attempts by other bioinformatics software to accomplish this task have often used sequence alignment or machine learning techniques that were quite slow, leading to the development of less sensitive but much faster abundance estimation programs. Kraken aims to achieve high sensitivity and high speed by utilizing exact alignments of k-mers and a novel classification algorithm.
  * [data_manager_hisat_index_builder](https://toolshed.g2.bx.psu.edu/view/devteam/data_manager_hisat_index_builder): planemo upload for repository https://github.com/galaxyproject/tools-devteam/tree/master/data_managers/data_manager_hisat_index_builder commit [5a7365750648c26206f05ac7956936c243c2b980](https://github.com/galaxyproject/tools-devteam/commit/5a7365750648c26206f05ac7956936c243c2b980) HISAT is a fast and sensitive spliced alignment program. As part of HISAT, we have developed a new indexing scheme based on the Burrows-Wheeler transform (BWT) and the FM index, called hierarchical indexing, that employs two types of indexes: (1) one global FM index representing the whole genome, and (2) many separate local FM indexes for small regions collectively covering the genome. Our hierarchical index for the human genome (about 3 billion bp) includes ~48,000 local FM indexes, each representing a genomic region of ~64,000bp. As the basis for non-gapped alignment, the FM index is extremely fast with a low memory footprint, as demonstrated by Bowtie. In addition, HISAT provides several alignment strategies specifically designed for mapping different types of RNA-seq reads. All these together, HISAT enables extremely fast and sensitive alignment of reads, in particular those spanning two exons or more. As a result, HISAT is much faster >50 times than !TopHat2 with better alignment quality. Although it uses a large number of indexes, the memory requirement of HISAT is still modest, approximately 4.3 GB for human. HISAT uses the Bowtie2 implementation to handle most of the operations on the FM index. In addition to spliced alignment, HISAT handles reads involving indels and supports a paired-end alignment mode. Multiple processor can be used simultaneously to achieve greater alignment speed. HISAT outputs alignments in SAM format, enabling interoperation with a large number of other tools (e.g. SAMtools, GATK) that use SAM. HISAT is distributed under the GPLv3 license, and it runs on the command line under Linux, Mac OS X and Windows.

     http://ccb.jhu.edu/software/hisat/index.shtml

* [data_manager_build_kraken_database](https://toolshed.g2.bx.psu.edu/view/devteam/data_manager_build_kraken_database): planemo upload for repository https://github.com/galaxyproject/tools-devteam/blob/master/data_managers/data_manager_build_kraken_database/ commit [00a7926c285bc4a339bd7deebf40b28f39c7d947](https://github.com/galaxyproject/tools-devteam/commit/00a7926c285bc4a339bd7deebf40b28f39c7d947)-dirty Contains a data manager that defines and populates the kraken_databases tool data table. Kraken is a system for assigning taxonomic labels to short DNA sequences, usually obtained through metagenomic studies. Previous attempts by other bioinformatics software to accomplish this task have often used sequence alignment or machine learning techniques that were quite slow, leading to the development of less sensitive but much faster abundance estimation programs. Kraken aims to achieve high sensitivity and high speed by utilizing exact alignments of k-mers and a novel classification algorithm.
* [kraken](https://toolshed.g2.bx.psu.edu/view/devteam/kraken): planemo upload for repository https://github.com/galaxyproject/tools-devteam/blob/master/tool_collections/kraken/kraken/ commit [00a7926c285bc4a339bd7deebf40b28f39c7d947](https://github.com/galaxyproject/tools-devteam/commit/00a7926c285bc4a339bd7deebf40b28f39c7d947)-dirty Installs the kraken tool wrapper for taxonomic designation. Kraken is a system for assigning taxonomic labels to short DNA sequences, usually obtained through metagenomic studies. Previous attempts by other bioinformatics software to accomplish this task have often used sequence alignment or machine learning techniques that were quite slow, leading to the development of less sensitive but much faster abundance estimation programs. Kraken aims to achieve high sensitivity and high speed by utilizing exact alignments of k-mers and a novel classification algorithm.
* [kraken_filter](https://toolshed.g2.bx.psu.edu/view/devteam/kraken_filter): planemo upload for repository https://github.com/galaxyproject/tools-devteam/blob/master/tool_collections/kraken/kraken_filter/ commit 00a7926c285bc4a339bd7deebf40b28f39c7d947-dirty Contains a tool wrapper for kraken's confidence filter. Kraken is a system for assigning taxonomic labels to short DNA sequences, usually obtained through metagenomic studies. Previous attempts by other bioinformatics software to accomplish this task have often used sequence alignment or machine learning techniques that were quite slow, leading to the development of less sensitive but much faster abundance estimation programs. Kraken aims to achieve high sensitivity and high speed by utilizing exact alignments of k-mers and a novel classification algorithm.
* [hisat](https://toolshed.g2.bx.psu.edu/view/devteam/hisat): planemo upload for repository https://github.com/galaxyproject/tools-devteam/tree/master/tools/hisat commit 5a7365750648c26206f05ac7956936c243c2b980 HISAT is a fast and sensitive spliced alignment program. As part of HISAT, we have developed a new indexing scheme based on the Burrows-Wheeler transform (BWT) and the FM index, called hierarchical indexing, that employs two types of indexes: (1) one global FM index representing the whole genome, and (2) many separate local FM indexes for small regions collectively covering the genome. Our hierarchical index for the human genome (about 3 billion bp) includes ~48,000 local FM indexes, each representing a genomic region of ~64,000bp. As the basis for non-gapped alignment, the FM index is extremely fast with a low memory footprint, as demonstrated by Bowtie. In addition, HISAT provides several alignment strategies specifically designed for mapping different types of RNA-seq reads. All these together, HISAT enables extremely fast and sensitive alignment of reads, in particular those spanning two exons or more. As a result, HISAT is much faster >50 times than !TopHat2 with better alignment quality. Although it uses a large number of indexes, the memory requirement of HISAT is still modest, approximately 4.3 GB for human. HISAT uses the Bowtie2 implementation to handle most of the operations on the FM index. In addition to spliced alignment, HISAT handles reads involving indels and supports a paired-end alignment mode. Multiple processor can be used simultaneously to achieve greater alignment speed. HISAT outputs alignments in SAM format, enabling interoperation with a large number of other tools (e.g. SAMtools, GATK) that use SAM. HISAT is distributed under the GPLv3 license, and it runs on the command line under Linux, Mac OS X and Windows.

     http://ccb.jhu.edu/software/hisat/index.shtml

* [kraken_report](https://toolshed.g2.bx.psu.edu/view/devteam/kraken_report): planemo upload for repository https://github.com/galaxyproject/tools-devteam/blob/master/tool_collections/kraken/kraken_report/ commit 00a7926c285bc4a339bd7deebf40b28f39c7d947-dirty Contains galaxy tool wrapper for kraken-report. Kraken is a system for assigning taxonomic labels to short DNA sequences, usually obtained through metagenomic studies. Previous attempts by other bioinformatics software to accomplish this task have often used sequence alignment or machine learning techniques that were quite slow, leading to the development of less sensitive but much faster abundance estimation programs. Kraken aims to achieve high sensitivity and high speed by utilizing exact alignments of k-mers and a novel classification algorithm.
* [data_manager_twobit_builder](https://toolshed.g2.bx.psu.edu/view/devteam/data_manager_twobit_builder): planemo upload for repository https://github.com/galaxyproject/tools-devteam/tree/master/data_managers/data_manager_twobit_builder commit 130cb0c08ad3c5b858ba46b1024dcdccc3cb68c6-dirty Twobit data manager. 

* *From [rnateam](https://toolshed.g2.bx.psu.edu/view/rnateam):*
  * [splitfasta](https://toolshed.g2.bx.psu.edu/view/rnateam/splitfasta): planemo upload for repository https://github.com/bgruening/galaxytools/tree/master/tools/hacked/splitFasta commit fcd6ef7e59971abd6b6a3a5401f92bcdef6ef76c Split a multi-sequence fasta file into files containing single sequences 
  * [compalignp](https://toolshed.g2.bx.psu.edu/view/rnateam/compalignp): Compute fractional identity between trusted alignment and test alignment 
  * [piranha](https://toolshed.g2.bx.psu.edu/view/rnateam/piranha): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/piranha commit ba69207568a546d7c3b71a144f78095811e3e99a-dirty Piranha is a peak-caller for CLIP- and RIP-Seq data Piranha is a peak-caller for CLIP- and RIP-Seq data. It takes input in BED or BAM format and identifies regions of statistically significant read enrichment.

     Additional covariates may optionally be provided to further inform the peak-calling process. 

     http://smithlabresearch.org/software/piranha/

* [rnacode](https://toolshed.g2.bx.psu.edu/view/rnateam/rnacode): planemo upload for repository https://github.com/bgruening/galaxytools/tree/master/tools/rna_tools/rnacode commit 3f891a4e86b4b127815dc72a4292c232cda79293 Analyze the protein coding potential in MSA 
* [gotohscan](https://toolshed.g2.bx.psu.edu/view/rnateam/gotohscan): planemo upload for repository https://github.com/bgruening/galaxytools/tree/master/tools/gotohscan commit d18a08287799b0aa6ca50242ebcc218820923fb2-dirty Find subsequences in db 
* [mafft](https://toolshed.g2.bx.psu.edu/view/rnateam/mafft): planemo upload for repository https://github.com/bgruening/galaxytools/tree/master/tools/mafft commit 1fc2105007248c6b9460c0f3a98e6589477d0b13 Multiple alignment program for amino acid or nucleotide sequences 

* *From [anmoljh](https://toolshed.g2.bx.psu.edu/view/anmoljh):*
  * [trinitystats](https://toolshed.g2.bx.psu.edu/view/anmoljh/trinitystats): !TrinityStat.pl utility from trinitynraseq package 

* *From [avowinkel](https://toolshed.g2.bx.psu.edu/view/avowinkel):*
  * [picard](https://toolshed.g2.bx.psu.edu/view/avowinkel/picard): version 1.135  Picard SAM/BAM manipulation tools SAM (Sequence Alignment/Map) is a generic format for storing large nucleotide sequence alignments. Picard comprises Java-based utilities that manipulate SAM files, and a Java API (SAM-JDK) for creating new programs that read and write SAM files. Both SAM text format and SAM binary (BAM) format are supported.
  * [stacks](https://toolshed.g2.bx.psu.edu/view/avowinkel/stacks): Contains the version 1.32 of Stacks (only process_radtags) Stacks is a software pipeline for building loci from short-read sequences, such as those generated on the Illumina platform. Stacks was developed to work with restriction enzyme-based data, such as RAD-seq, for the purpose of building genetic maps and conducting population genomics and phylogeography.

     Repository-Maintainer: Alexander Vowinkel

     Repository-Development: https://github.com/kaktus42/galaxytools

* *From [sauria](https://toolshed.g2.bx.psu.edu/view/sauria):*
  * [hifive](https://toolshed.g2.bx.psu.edu/view/sauria/hifive): planemo upload for repository https://github.com/bxlab/galaxy_tools/suites/suite_hifive commit abaefa638db82abe90f335d783c9503dce28944f-dirty Contains tools for reading, normalizing, and plotting HiC and 5C chromatin interaction data !HiFive is a set of tools for handling HiC and 5C data. This includes managing data from mapped reads, either in bam, mat, or raw formats. All stages use hdf5 dictionaries for fast access and minimal memory and storage usage.

* *From [cmonjeau](https://toolshed.g2.bx.psu.edu/view/cmonjeau):*
  * [archive_datatypes](https://toolshed.g2.bx.psu.edu/view/cmonjeau/archive_datatypes): Imported from capsule None Some archive datatypes Contains zip, tar.gz, tar.bz2, fastq.gz, fastq.bz2
  * [kissplice](https://toolshed.g2.bx.psu.edu/view/cmonjeau/kissplice): Imported from capsule None Colibread / !KisSplice !KisSplice : a local transcriptome assembler for SNPs, indels and AS events
  * [takeabreak](https://toolshed.g2.bx.psu.edu/view/cmonjeau/takeabreak): Imported from capsule None Colibread / TakeABreak tool TakeABreak is a tool that can detect inversion breakpoints directly from raw NGS reads, without the need of any reference genome and without de novo assembling the genomes. Its implementation has a very limited memory impact allowing its usage on common desktop computers and acceptable runtime.
  * [commet](https://toolshed.g2.bx.psu.edu/view/cmonjeau/commet): Imported from capsule None Colibread / Commet : COmpare Multiple METagenomes Directly from non-assembled reads, all against all comparisons are performed through an efficient indexing strategy. Then, results are stored as bit vectors, a compressed representation of read files, that can be used to further combine read subsets by common logical operations. Finally, COMMET computes a clusterization of metagenomic datasets, which is visualized by dendrogram and heatmaps.
  * [discosnp_plus_plus](https://toolshed.g2.bx.psu.edu/view/cmonjeau/discosnp_plus_plus): Imported from capsule None Colibread / discosnp++ Software discoSnp is designed for discovering Single Nucleotide Polymorphism (SNP) from raw set(s) of reads obtained with Next Generation Sequencers (NGS).

     Note that number of input read sets is not constrained, it can be one, two, or more. Note also that no other data as reference genome or annotations are needed.

     The software is composed by two modules. First module, kissnp2, detects SNPs from read sets. A second module, kissreads, enhance the kissnp2 results by computing per read set  and for each found SNP i/ its mean read coverage and ii/ the (phred) quality of reads generating the polymorphism.
* [lordec](https://toolshed.g2.bx.psu.edu/view/cmonjeau/lordec): Imported from capsule None Colibread / Lordec  LoRDEC is a program to correct sequencing errors in long reads from 3rd generation sequencing with high error rate, and is especially intended for !PacBio reads
* [ziptool](https://toolshed.g2.bx.psu.edu/view/cmonjeau/ziptool): Imported from capsule None Create a zip archive 
* [decompress_an_archive_and_merge](https://toolshed.g2.bx.psu.edu/view/cmonjeau/decompress_an_archive_and_merge): Imported from capsule None Decompresses an archive file and merge This tool decompresses an archive file in a zip, gz or bz2 format and can merge all files in one file
* [mapsembler2](https://toolshed.g2.bx.psu.edu/view/cmonjeau/mapsembler2): Imported from capsule None Colibread / Mapsembler2 is a targeted assembly software It takes as input a set of NGS raw reads (fasta or fastq, gzipped or not) and a set of input sequences (starters). It first determines if each starter is read-coherent, e.g. whether reads confirm the presence of each starter in the original sequence. Then for each read-coherent starter, Mapsembler2 outputs its sequence neighborhood as a linear sequence or as a graph, depending on the user choice.

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [abyss](https://toolshed.g2.bx.psu.edu/view/iuc/abyss): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/abyss commit 0887009a23d176b21536c9fd8a18c4fecc417d4f Assembly By Short Sequences - a de novo, parallel, paired-end sequence assembler ABySS is a de novo sequence assembler intended for short paired-end reads and large genomes.

     http://www.bcgsc.ca/platform/bioinfo/software/abyss

* [art](https://toolshed.g2.bx.psu.edu/view/iuc/art): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/art commit 2b8fe4bffea74c80e20d2d4d0c426cc1631fc05f Simulator for Illumina, 454, and SOLiD sequencing data Sequencing data simulation tools

     http://www.niehs.nih.gov/research/resources/software/biostatistics/art/


* *From [gandres](https://toolshed.g2.bx.psu.edu/view/gandres):*
  * [vcftools_filter_stats_diversity](https://toolshed.g2.bx.psu.edu/view/gandres/vcftools_filter_stats_diversity): Subset of VCFtools fonctionalities : Filtering, Statistics, Diversity (slidingWindow) 
  * [fastme](https://toolshed.g2.bx.psu.edu/view/gandres/fastme): A distance based phylogeny reconstruction algorithm 
  * [readseq](https://toolshed.g2.bx.psu.edu/view/gandres/readseq): Convert various alignment formats 

* *From [takadonet](https://toolshed.g2.bx.psu.edu/view/takadonet):*
  * [bcf_bgzip_datatype](https://toolshed.g2.bx.psu.edu/view/takadonet/bcf_bgzip_datatype): BCF compress datatype 

* *From [drosofff](https://toolshed.g2.bx.psu.edu/view/drosofff):*
  * [msp_fasta_tabular_converter](https://toolshed.g2.bx.psu.edu/view/drosofff/msp_fasta_tabular_converter): planemo upload for repository https://bitbucket.org/drosofff/gedtools/ various fasta to tabular conversions tool to convert fasta to tabular format or fasta to weighted fasta format and vice versa

* [fetch_fasta_from_ncbi](https://toolshed.g2.bx.psu.edu/view/drosofff/fetch_fasta_from_ncbi): planemo upload for repository https://bitbucket.org/drosofff/gedtools/ Fetch fasta sequences from NCBI using eutils wrappers Fetch fasta sequences from NCBI using eutils wrappers

* [msp_cap3](https://toolshed.g2.bx.psu.edu/view/drosofff/msp_cap3): planemo upload for repository https://bitbucket.org/drosofff/gedtools/ cap3 wrapper cap3 wrapper.

     CAP3: A DNA sequence assembly program. Huang, X. and Madan, A. (1999) CAP3: A DNA sequence assembly program. Genome Res., 9, 868-877.

     http://seq.cs.iastate.edu/

* [cherry_pick_fasta](https://toolshed.g2.bx.psu.edu/view/drosofff/cherry_pick_fasta): planemo upload for repository https://bitbucket.org/drosofff/gedtools/ Pick fasta sequence with specific header content This tool takes a collection of fasta sequences as an input and select those that satisfy a query match in their header/name

     A subset of fasta sequence satisfying the query is returned

* [blastn_to_scaffold](https://toolshed.g2.bx.psu.edu/view/drosofff/blastn_to_scaffold): planemo upload for repository https://bitbucket.org/drosofff/gedtools/ Generate DNA scaffold from blastn alignment of Contigs This tool start from DNA contigs that aligned to a subject DNA sequence through blastn.
    The contigs must be provided in fasta format. The blastn output must be tabular, the 12 standard column plus column 13 with the length of the blastn subject.

     The sequence used to blastn the contigs must be provided to serve as a guide to the final assembly

     The final assembly is a DNA sequence.
     
     Nucleotides of the guide sequence which were not covered by contigs are in small letters in the output assembly.

* [msp_blastparser_and_hits](https://toolshed.g2.bx.psu.edu/view/drosofff/msp_blastparser_and_hits): planemo upload for repository https://bitbucket.org/drosofff/gedtools/ Parse blast outputs and compile hits This tool is part of the visitor2 toolsuite.

     The tool parses blastn or blastx outputs and organizes hits to subjects, with various coverage informations

     It also outputs query hits sorted by their alignment to blast subjects, so that they can be picked for subsequent CAP3 assembly

* [msp_oases](https://toolshed.g2.bx.psu.edu/view/drosofff/msp_oases): planemo upload for repository https://bitbucket.org/drosofff/gedtools/ Short read assembler Oases use velvet to assemble sequence reads. Here the tool is used for short read assembly

* [blastx_to_scaffold](https://toolshed.g2.bx.psu.edu/view/drosofff/blastx_to_scaffold): planemo upload for repository https://bitbucket.org/drosofff/gedtools/ Generate DNA scaffold from blastx alignment of Contigs This tool start from DNA contigs that aligned to a subject protein sequence through blastx.

     The contigs must be provided in fasta format. The blastx output must be tabular, the 12 standard column plus column 13 with the length of the blastx subject.

     The final scaffold is a DNA sequence.

     Sequences of the subject protein which were not aligned to the contigs are replaced by Ns in this scaffold.


* *From [ktnyt](https://toolshed.g2.bx.psu.edu/view/ktnyt):*
  * [gembassy](https://toolshed.g2.bx.psu.edu/view/ktnyt/gembassy): Initial upload GEMBASSY wrapper tools This is a wrapper for the EMBOSS associated software (EMBASSY) package "GEMBASSY", containing tools for accessing the G-language Web Services.

* *From [cheanney](https://toolshed.g2.bx.psu.edu/view/cheanney):*
  * [dbannot](https://toolshed.g2.bx.psu.edu/view/cheanney/dbannot): dbAnnot allows for easy annotations of biological identifiers.  dbAnnot provides different types of annotations for various biological identifiers
  * [db2db](https://toolshed.g2.bx.psu.edu/view/cheanney/db2db): Id conversion db2db allows for conversions of identifiers from one database to other database identifiers or annotations.

* *From [lecorguille](https://toolshed.g2.bx.psu.edu/view/lecorguille):*
  * [pca](https://toolshed.g2.bx.psu.edu/view/lecorguille/pca): Principal Component Analysis - PCA using FactoMineR R package
  * [hca](https://toolshed.g2.bx.psu.edu/view/lecorguille/hca): hierarchical cluster analysis - HCA for Java !TreeView using ctc R package to generate input files for Java !TreeView : jtreeview.sourceforge.net
  * [anova](https://toolshed.g2.bx.psu.edu/view/lecorguille/anova): Analysis of variance - anova 1-way and N-way anova using R

* *From [yhoogstrate](https://toolshed.g2.bx.psu.edu/view/yhoogstrate):*
  * [unafold](https://toolshed.g2.bx.psu.edu/view/yhoogstrate/unafold): planemo upload for repository https://github.com/ErasmusMC-Bioinformatics/unafold_galaxy_wrapper commit 84b70c01144fa018db45215941fb395798376100-dirty UNAFold: software for nucleic acid folding and hybridization. The UNAFold software package is an integrated collection of programs that simulate folding, hybridization, and melting pathways for one or two single-stranded nucleic acid sequences. The name is derived from "Unified Nucleic Acid Folding." Folding (secondary structure) prediction for single-stranded RNA or DNA combines free energy minimization, partition function calculations and stochastic sampling. For melting simulations, the package computes entire melting profiles, not just melting temperatures. UV absorbance at 260 nm, heat capacity change (C(p)), and mole fractions of different molecular species are computed as a function of temperature. The package installs and runs on all Unix and Linux platforms that we have looked at, including Mac OS X. Images of secondary structures, hybridizations, and dot plots may be computed using common formats. Similarly, a variety of melting profile plots is created when appropriate. These latter plots include experimental results if they are provided. The package is "command line" driven. Underlying compiled programs may be used individually, or in special combinations through the use of a variety of Perl scripts. Users are encouraged to create their own scripts to supplement what comes with the package. This evolving software is available for download at http://www.bioinfo.rpi.edu/applications/hybrid/download.php .

* *From [crusoe](https://toolshed.g2.bx.psu.edu/view/crusoe):*
  * [oxli_datatypes](https://toolshed.g2.bx.psu.edu/view/crusoe/oxli_datatypes): planemo upload commit d8e0950d53e504e02ee5db43c0804142b14d7fd2-dirty Datatypes for the oxli/khmer project 
  * [khmer](https://toolshed.g2.bx.psu.edu/view/crusoe/khmer): planemo upload for repository https://github.com/galaxyproject/tools-iuc/blob/master/tools/khmer/ commit d8e0950d53e504e02ee5db43c0804142b14d7fd2-dirty In-memory nucleotide sequence k-mer counting, filtering, graph traversal and more khmer is a library and suite of command line tools for working with DNA sequence. It is primarily aimed at short-read sequencing data such as that produced by the Illumina platform. khmer takes a k-mer-centric approach to sequence analysis, hence the name.

     The official repository is at https://github.com/ged-lab/khmer and you can read the docs online here: http://khmer.readthedocs.org/

     There are two mailing lists dedicated to khmer, an announcements-only list and a discussion list. To search their archives and sign-up for them, please visit the following URLs:

* Discussion http://lists.idyll.org/listinfo/khmer
* Announcements http://lists.idyll.org/listinfo/khmer-announce

* *From [bobbledavidson](https://toolshed.g2.bx.psu.edu/view/bobbledavidson):*
  * [beagle4_0](https://toolshed.g2.bx.psu.edu/view/bobbledavidson/beagle4_0): link to Beagle4.0 jar added Beagle version 4.0 performs genotype calling, genotype phasing, imputation of ungenotyped markers, and identity-by-descent segment detection. Beagle version 4.0 performs genotype calling, genotype phasing, imputation of ungenotyped markers, and identity-by-descent segment detection.

     Version 4 has multiple improvements:
* a standard format (Variant Call Format) for input and output files
* a powerful identity by descent detection algorithm: Refined IBD
* support for multi-threaded computation
* support for multi-allelic markers
* improved methods for phasing and genotype imputation
* elimination of temporary files
* use of a sliding window permit control memory use

     The next major release (version 4.1) will provide substantial improved haplotype phasing and genotype imputation. Look for version 4.1 to be released in April or May 2015.
     
     If you use Beagle in a published analysis, please report the program version and cite the following article:

       S R Browning and B L Browning (2007) Rapid and accurate haplotype phasing and missing data inference for whole genome association studies by use of localized haplotype clustering. Am J Hum Genet 81:1084-97. doi:10.1086/521987

* *From [dereeper](https://toolshed.g2.bx.psu.edu/view/dereeper):*
  * [mlmm](https://toolshed.g2.bx.psu.edu/view/dereeper/mlmm): Multi-Locus Mixed-Model (MLMM) 

#### Dependencies

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [package_mono_4_0](https://toolshed.g2.bx.psu.edu/view/iuc/package_mono_4_0): Imported from capsule None Contains a tool dependency definition that downloads and compiles version 4.0.x of mono. Mono is a software platform designed to allow developers to easily create cross platform applications 

     http://www.mono-project.com/

* [package_bwtool_1_0_gamma](https://toolshed.g2.bx.psu.edu/view/iuc/package_bwtool_1_0_gamma): Imported from capsule None Contains a tool dependency definition that downloads and compiles version 1.0-gamma of bwtools. bwtool is a command-line utility for bigWig files. bigWigs are an indexed and compressed form of wig file, a somewhat standard format for storing genome-wide real-valued signal data. Much of the ENCODE processed data is in this form, and it is appearing more often in GEO as well. The purpose of bwtool is to make these files more useful by providing some convenient functions.

     https://github.com/CRG-Barcelona/bwtool/wiki


* *From [avowinkel](https://toolshed.g2.bx.psu.edu/view/avowinkel):*
  * [package_picard_1_135](https://toolshed.g2.bx.psu.edu/view/avowinkel/package_picard_1_135): Contains a tool dependency definition that downloads and compiles version 1.135 of the Picard package. 
  * [package_picard_1_134](https://toolshed.g2.bx.psu.edu/view/avowinkel/package_picard_1_134): Contains a tool dependency definition that downloads and compiles version 1.134.0 of the Picard package. This repository is intended to be defined as a complex repository dependency within a separate repository.

     Program: picard Version: 1.134
* [package_stacks_1_32](https://toolshed.g2.bx.psu.edu/view/avowinkel/package_stacks_1_32): Contains a tool dependency definition that downloads and compiles version 1.32 of Stacks Stacks is a software pipeline for building loci from short-read sequences, such as those generated on the Illumina platform. Stacks was developed to work with restriction enzyme-based data, such as RAD-seq, for the purpose of building genetic maps and conducting population genomics and phylogeography.

* Repository-Maintainer: Alexander Vowinkel
* Repository-Development: https://github.com/kaktus42/galaxytools
* [package_bwa_0_7_12](https://toolshed.g2.bx.psu.edu/view/avowinkel/package_bwa_0_7_12): Contains a tool dependency definition that downloads and compiles version 0.7.12 of the BWA package BWA is a software package for mapping low-divergent sequences against a large reference genome, such as the human genome. It consists of three algorithms: BWA-backtrack, BWA-SW and BWA-MEM. The first algorithm is designed for Illumina sequence reads up to 100bp, while the rest two for longer sequences ranged from 70bp to 1Mbp. BWA-MEM and BWA-SW share similar features such as long-read support and split alignment, but BWA-MEM, which is the latest, is generally recommended for high-quality queries as it is faster and more accurate. BWA-MEM also has better performance than BWA-backtrack for 70-100bp Illumina reads. Li H. and Durbin R. (2009) Fast and accurate short read alignment with Burrows-Wheeler Transform. Bioinformatics, 25:1754-60. Li H. and Durbin R. (2010) Fast and accurate long-read alignment with Burrows-Wheeler Transform. Bioinformatics, Epub. Repository-Maintainer: Alexander Vowinkel Repository-Development: https://github.com/kaktus42/galaxytools

* *From [cmonjeau](https://toolshed.g2.bx.psu.edu/view/cmonjeau):*
  * [package_mapsembler2_2_2_3](https://toolshed.g2.bx.psu.edu/view/cmonjeau/package_mapsembler2_2_2_3): Imported from capsule None Contains a tool dependency definition that downloads and compiles version 2.2.3 of Mapsembler2 Mapsembler2 is a targeted assembly software. It takes as input any number of NGS raw read set(s) (fasta or fastq, gzipped or not) and a set of input sequences (starters). For each starter, Mapsembler2 outputs its sequence neighborhood as a linear sequence or as a graph, depending on the user choice. Mapsembler2 may be used for (not limited to): \u00b7 Validate an assembled sequence (input as starter), e.g. from a de Bruijn graph assembly where read-coherence was not enforced. Checks if a known enzyme is present in a metagenomic NGS read set. \u00b7 Enrich unmappable reads by extending them, possibly making them mappable \u00b7 Checks what happens at the extremities of a contig \u00b7 Check the presence / absence and quantify RNA seq splicing events. Check the presence/absence of SNPs or structural variants, \u2026
  * [package_commet_24_07_14](https://toolshed.g2.bx.psu.edu/view/cmonjeau/package_commet_24_07_14): Imported from capsule None Contains a tool dependency definition that downloads and compiles version 24_07_14 of Commet COMMET (\u201cCOmpare Multiple METagenomes\u201d) provides a global similarity overview between all datasets of a large metagenomic project.

     Directly from non-assembled reads, all against all comparisons are performed through an efficient indexing strategy. Then, results are stored as bit vectors, a compressed representation of read files, that can be used to further combine read subsets by common logical operations. Finally, COMMET computes a clusterization of metagenomic datasets, which is visualized by dendrogram and heatmaps.
* [package_discosnp_plus_plus_2_1_7](https://toolshed.g2.bx.psu.edu/view/cmonjeau/package_discosnp_plus_plus_2_1_7): Imported from capsule None Contains a tool dependency definition that downloads and compiles version 2.1.7 of DiscoSNP++ Discovering Single Nucleotide Polymorphism (SNP) from raw set(s) of reads
* [package_takeabreak_1_1_0](https://toolshed.g2.bx.psu.edu/view/cmonjeau/package_takeabreak_1_1_0): Imported from capsule None Contains a tool dependency definition that downloads and compiles version 1.1.0 of TakeABreak TakeABreak is a tool that can detect inversion breakpoints directly from raw NGS reads, without the need of any reference genome and without de novo assembling the genomes. Its implementation has a very limited memory impact allowing its usage on common desktop computers and acceptable runtime (Illumina reads simulated at 2x40x coverage from human chromosome 22 can be treated in less than two hours, with less than 1GB of memory).
* [package_bwa_0_6_2](https://toolshed.g2.bx.psu.edu/view/cmonjeau/package_bwa_0_6_2): Imported from capsule None  Contains a tool dependency definition that downloads and compiles version 0.6.2 of the BWA package  This repository is intended to be defined as a complex repository dependency within a separate repository.

     http://wiki.galaxyproject.org/DefiningRepositoryDependencies#Complex_repository_dependencies:_tool_dependency_definitions_that_contain_repository_dependency_definitions 

* Program: bwa (alignment via Burrows-Wheeler transformation)
* Version: 0.6.2-r126
* Contact: Heng Li <lh3@sanger.ac.uk>
* [package_kissplice_2_2_1](https://toolshed.g2.bx.psu.edu/view/cmonjeau/package_kissplice_2_2_1): Imported from capsule None Contains a tool dependency definition that downloads and compiles version 2.2.21 of !Kissplice !KisSplice is a software that enables to analyse RNA-seq data with or without a reference genome. It is an exact local transcriptome assembler that allows to identify SNPs, indels and alternative splicing events. It can deal with an arbitrary number of biological conditions, and will quantify each variant in each condition. It has been tested on Illumina datasets of up to 1G reads. Its memory consumption is around 5Gb for 100M reads.
* [package_lordec_0_5_3](https://toolshed.g2.bx.psu.edu/view/cmonjeau/package_lordec_0_5_3): Imported from capsule None Contains a tool dependency definition that downloads and compiles version 0.5.3 of Lordec LoRDEC is a program to correct sequencing errors in long reads from 3rd generation sequencing with high error rate, and is especially intended for !PacBio reads. It uses a hybrid strategy, meaning that it uses two sets of reads: the reference read set, whose error rate is assumed to be small, and the !PacBio read set, which is then corrected using the reference set. Typically, the reference set contains Illumina reads. 

* *From [gandres](https://toolshed.g2.bx.psu.edu/view/gandres):*
  * [package_fastme_2_1_4](https://toolshed.g2.bx.psu.edu/view/gandres/package_fastme_2_1_4): FastME version 2.1.4 dependency package 
  * [package_readseq_jar_10_03_13](https://toolshed.g2.bx.psu.edu/view/gandres/package_readseq_jar_10_03_13): readseq.jar 13 Mar 10 version 

### Select Updates

* *From [simon-gladman](https://toolshed.g2.bx.psu.edu/view/simon-gladman):*
  * [barrnap](https://toolshed.g2.bx.psu.edu/view/simon-gladman/barrnap): Barrnap version 0.7

* *From [crs4](https://toolshed.g2.bx.psu.edu/view/crs4):*
  * [muscle](https://toolshed.g2.bx.psu.edu/view/crs4/muscle): Update Orione citation. Add &lt;citations&gt; tag. Use package_muscle_3_8_31 from iuc.

* *From [george-weingart](https://toolshed.g2.bx.psu.edu/view/george-weingart):*
  * [lefse](https://toolshed.g2.bx.psu.edu/view/george-weingart/lefse): Fixed bug due to numerical approximation after normalization affecting root-level clades (e.g. &#34;Bacteria&#34; or &#34;Archaea&#34;)

