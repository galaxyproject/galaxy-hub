---
title: September 2017 Tool Shed contributions
---

[<img class="float-right" src="/src/images/galaxy-logos/galaxy-toolshed-300.png" alt="Galaxy ToolShed" width="180">](http://toolshed.g2.bx.psu.edu/)

Tools contributed to the Galaxy Project [ToolShed](http://toolshed.g2.bx.psu.edu/) in [September 2017](/src/galaxy-updates/2017-10/index.md).

* [All monthly summaries](/src/toolshed/contributions/index.md)

## New Tools

* *From [cristian](https://toolshed.g2.bx.psu.edu/view/cristian):*
   * [notos](https://toolshed.g2.bx.psu.edu/view/cristian/notos):  Notos suite. Notos is a suite that calculates CpN o/e ratios (e.g., the commonly used CpG o/e ratios) for a set of nucleotide sequences and uses Kernel Density Estimation (KDE) to model the obtained distribution.    It consists of two programs, CpGoe.pl is used to calculate the CpN o/e ratios and KDEanalysis.r estimates the model.
* *From [ylebrascnrs](https://toolshed.g2.bx.psu.edu/view/ylebrascnrs):*
   * [structure](https://toolshed.g2.bx.psu.edu/view/ylebrascnrs/structure):  structure. model-based clustering method for inferring population structure using genotype data.
* *From [lnguyen](https://toolshed.g2.bx.psu.edu/view/lnguyen):*
   * [topgo](https://toolshed.g2.bx.psu.edu/view/lnguyen/topgo):  A tool for enrichment analysis based on topGO R package. 
   * [venn_diagram_plotter](https://toolshed.g2.bx.psu.edu/view/lnguyen/venn_diagram_plotter):  A tool for comparing up to 6 ID lists with Venn Diagrams (based on Jvenn). 
   * [filter_keywords_values](https://toolshed.g2.bx.psu.edu/view/lnguyen/filter_keywords_values):  ProteoRE - A tool filters a file by keywords or values. 
   * [id_converter](https://toolshed.g2.bx.psu.edu/view/lnguyen/id_converter):  A tool converts identifiers which are of a different type/source to another type of identifiers and create the identifier lists. 
   * [link2reactome](https://toolshed.g2.bx.psu.edu/view/lnguyen/link2reactome):  A tool maps your IDs list (UniProt, Gene name) via analysis tools from Reactome database and visualize directly pathways in which your proteins are involved. 
   * [sort_by_tissue](https://toolshed.g2.bx.psu.edu/view/lnguyen/sort_by_tissue):  A tool for selecting/discarding proteins according to their expression profiles (absence/presence) in a list of tissues/organs using Human Protein Atlas. 
   * [proteore_goprofiles](https://toolshed.g2.bx.psu.edu/view/lnguyen/proteore_goprofiles):  A tool for identifying enriched biological themems, GO terms from your protein list. 
* *From [rhpvorderman](https://toolshed.g2.bx.psu.edu/view/rhpvorderman):*
   * [data_manager_select_index_by_path](https://toolshed.g2.bx.psu.edu/view/rhpvorderman/data_manager_select_index_by_path):  A data manager to register already build indexes in Galaxy's data tables. Provide a link to a already build index and register it in galaxy.  This tool aims to provide the same functionality for all indexes that have a data table that follows the value,dbkey,name,path layout.    This is a fork of the [data_manager_all_fasta_by_path](https://github.com/Christian-B/galaxy_shedtools/tree/master/all_fasta_by_path) data manager by [Cristian-B](https://github.com/Christian-B) . The all_fasta_by_path data manager was forked on 2017-09-07 from Christian-B's [galaxy_shedtools repository](https://github.com/Christian-B/galaxy_shedtools) at commit d9f5343.
* *From [saskia-hiltemann](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann):*
   * [ireport](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann/ireport):  create HTML reports for Galaxy workflows. create interactive HTML reports from galaxy outputs.
* *From [bioitcore](https://toolshed.g2.bx.psu.edu/view/bioitcore):*
   * [splicetrap](https://toolshed.g2.bx.psu.edu/view/bioitcore/splicetrap):  SpliceTrap A statistic tool for quantifying exon inclusion ratios in paired-end RNA-seq data, with broad applications for the study of alternative splicing. 
   * [chimerascan](https://toolshed.g2.bx.psu.edu/view/bioitcore/chimerascan):  A tool for identifying chimeric transcription in sequencing data. 
* *From [caleb-easterly](https://toolshed.g2.bx.psu.edu/view/caleb-easterly):*
   * [prepare_revigo](https://toolshed.g2.bx.psu.edu/view/caleb-easterly/prepare_revigo):  cut columns from tabular data and define as the revigo datatype. 
* *From [mingchen0919](https://toolshed.g2.bx.psu.edu/view/mingchen0919):*
   * [rmarkdown_collection_builder](https://toolshed.g2.bx.psu.edu/view/mingchen0919/rmarkdown_collection_builder):  R Markdown based dataset collection builder. Create different types of dataset collection from files in Galaxy history.
   * [rmarkdown_fastq_dump](https://toolshed.g2.bx.psu.edu/view/mingchen0919/rmarkdown_fastq_dump):  R Markdown based fastq-dump wrapper. Download and extract reads in fastq/fasta format from NCBI SRA and output a list or list:paired dataset collection.
* *From [nml](https://toolshed.g2.bx.psu.edu/view/nml):*
   * [smalt](https://toolshed.g2.bx.psu.edu/view/nml/smalt):  SMALT aligns DNA sequencing reads with a reference genome. SMALT employs a hash index of short words up to 20 nucleotides long and sampled at equidistant steps along the reference genome. For each sequencing read, potentially matching segments in the reference genome are identified from seed matches in the index and subsequently aligned with the read using dynamic programming.
   * [smalt_index](https://toolshed.g2.bx.psu.edu/view/nml/smalt_index):  SMALT aligns DNA sequencing reads with a reference genome.
   * [smalt_map](https://toolshed.g2.bx.psu.edu/view/nml/smalt_map): SMALT aligns DNA sequencing reads with a reference genome.
   * [seqtk_nml](https://toolshed.g2.bx.psu.edu/view/nml/seqtk_nml):  Tool to downsample fastq reads. Tool to downsample fastq reads to a certain times coverage based on a given reference fasta file. Tool uses Seqtk sample for actually downsampling.
   * [bio_hansel](https://toolshed.g2.bx.psu.edu/view/nml/bio_hansel):  Heidelberg and Enteritidis SNP Elucidation. bio_hansel - Heidelberg And eNteritidis Snp ELucidation - Subtype Salmonella enterica subsp. enterica serovar Heidelberg and Enteritidis genomes using in-silico 33 bp k-mer SNP subtyping schemes developed by Genevieve Labbe et al.
* *From [galaxyp](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
   * [validate_fasta_database](https://toolshed.g2.bx.psu.edu/view/galaxyp/validate_fasta_database):  runs Compomics database identification tool on any FASTA database, and separates valid and invalid entries based on a series of checks. 
* *From [artbio](https://toolshed.g2.bx.psu.edu/view/artbio):*
   * [probecoverage](https://toolshed.g2.bx.psu.edu/view/artbio/probecoverage):  computes and plots read coverage of genomic regions by sequencing datasets. Computes read coverage of genomic regions by sequencing datasets using bedtools multicov.  Plot data as cumulative distribution of regions with coverage > x  This tool is adapted to quality control of sequencing of libraries enriched with capture probes.
   * [sr_bowtie](https://toolshed.g2.bx.psu.edu/view/artbio/sr_bowtie):  bowtie wrapper tool to align small RNA sequencing reads. Bowtie wrapper tool to align small RNA sequencing reads. This tool belongs to the mississippi tool suite.
   * [sequence_format_converter](https://toolshed.g2.bx.psu.edu/view/artbio/sequence_format_converter):  various fasta to tabular conversions. sequence_format_converter performs all pairwise conversions  between sequence formats fasta, fastaw and tabular.  sequence_format_converter is also able to convert fastq format  in any of the formats fasta, fastaw and tabular.
   * [sr_bowtie_dataset_annotation](https://toolshed.g2.bx.psu.edu/view/artbio/sr_bowtie_dataset_annotation):  Maps iteratively small RNA sequencing datasets to reference sequences. Maps iteratively small RNA sequencing datasets to reference sequences, in order to generate annotation  (i.e. number of aligned reads for each reference) of these datasets.
   * [cap3](https://toolshed.g2.bx.psu.edu/view/artbio/cap3):  cap3 wrapper. cap3 wrapper.  CAP3: A DNA sequence assembly program.  Huang, X. and Madan, A. (1999) CAP3: A DNA sequence assembly program. Genome Res., 9, 868-877.  http://seq.cs.iastate.edu/.
   * [justdiff](https://toolshed.g2.bx.psu.edu/view/artbio/justdiff):  Unix diff. Returns the output of the unix diff command between two files.
* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
   * [ucsc_fasplit](https://toolshed.g2.bx.psu.edu/view/iuc/ucsc_fasplit):  faSplit is a tool to split a single FASTA file into several files. 
   * [flash](https://toolshed.g2.bx.psu.edu/view/iuc/flash):  Fast Length Adjustment of SHort reads. FLASH is an accurate and fast tool to merge paired-end reads that were  generated from DNA fragments whose lengths are shorter than twice the  length of reads.
   * [crossmap_gff](https://toolshed.g2.bx.psu.edu/view/iuc/crossmap_gff):  Wrapper for the CrossMap tool suite: CrossMap GFF. CrossMap is versatile tool to convert genome coordinates or annotation files between genome  assemblies. It supports mostly commonly used file types, including BAM, BED,BigWig, GFF,  GTF, SAM, Wiggle, and VCF formats. For large plain text file types, such as BED, GFF, GTF  and VCF, reading from remote servers and file compression are supported.
   * [fraggenescan](https://toolshed.g2.bx.psu.edu/view/iuc/fraggenescan):  Tool for finding (fragmented) genes in short read. FragGeneScan is an application for finding (fragmented) genes in short reads.   It can also be applied to predict prokaryotic genes in incomplete assemblies or complete genomes.
   * [pizzly](https://toolshed.g2.bx.psu.edu/view/iuc/pizzly):  Pizzly is a program for detecting gene fusions from RNA-Seq data of cancer samples. Pizzly is a program for detecting gene fusions from RNA-Seq data of cancer samples.  It uses pseudoalignment and requires running Kallisto with the --fusion parameter (available in version 0.43.1 or later) on paired-end reads.  Pizzly also requires the reference transcriptome in FASTA format as well as a GTF file describing the transcriptome.   The Ensembl transcriptomes are recommended.
   * [megahit](https://toolshed.g2.bx.psu.edu/view/iuc/megahit):  Galaxy wrapper for Megahit version 1.1.2. MEGAHIT is a single node assembler for large and complex metagenomics NGS reads, such as soil. It makes use of succinct de Bruijn graph (SdBG) to achieve low memory assembly. MEGAHIT can optionally utilize a CUDA-enabled GPU to accelerate its SdBG contstruction. The GPU-accelerated version of MEGAHIT has been tested on NVIDIA GTX680 (4G memory) and Tesla K40c (12G memory) with CUDA 5.5, 6.0 and 6.5. MEGAHIT v1.0 or greater also supports IBM Power PC and has been tested on IBM POWER8.
* *From [rlegendre](https://toolshed.g2.bx.psu.edu/view/rlegendre):*
   * [ribo_tools](https://toolshed.g2.bx.psu.edu/view/rlegendre/ribo_tools):  A Galaxy toolbox for the analysis of ribosome profiling (Ribo-seq) data. Ribosome profiling provides genome-wide information about translational regulation. However, there is currently no standard tool for the qualitative analysis of Ribo-seq data. We present here RiboTools, a Galaxy toolbox for the analysis of ribosome profiling (Ribo-seq) data. It can be used to detect translational ambiguities, stop codon readthrough events and codon occupancy. It provides a large number of plots for the visualisation of these events.
* *From [gga](https://toolshed.g2.bx.psu.edu/view/gga):*
   * [tripal_db_index](https://toolshed.g2.bx.psu.edu/view/gga/tripal_db_index):  Index Tripal data (from the Tripal tool suite). Galaxy tools allowing to load data into a remote Tripal server.    Tripal is a toolkit for construction of online biological (genetics, genomics, breeding, etc), community database,  and is a member of the GMOD family of tools. Tripal provides by default integration with the GMOD Chado database schema and Drupal, a popular Content Management Systems (CMS).    https://github.com/galaxy-genome-annotation/python-tripal.
   * [apollo_fetch_jbrowse](https://toolshed.g2.bx.psu.edu/view/gga/apollo_fetch_jbrowse):  Retrieve JBrowse (from the Apollo tool suite). Talk to a (local) apollo server from Galaxy.
   * [tripal_analysis_sync](https://toolshed.g2.bx.psu.edu/view/gga/tripal_analysis_sync):  Synchronize an analysis (from the Tripal tool suite). 
   * [tripal_analysis_load_interpro](https://toolshed.g2.bx.psu.edu/view/gga/tripal_analysis_load_interpro):  Load InterProScan results (from the Tripal tool suite). 
   * [askomics_integrate](https://toolshed.g2.bx.psu.edu/view/gga/askomics_integrate):  AskOmics (from the AskOmics tool suite). Galaxy tools allowing to interact with a remote AskOmics server.    AskOmics is a visual SPARQL query builder for RDF database.    https://github.com/askomics/.
   * [tripal_analysis_get_analyses](https://toolshed.g2.bx.psu.edu/view/gga/tripal_analysis_get_analyses):  Get analyses (from the Tripal tool suite). 
   * [tripal_feature_sync](https://toolshed.g2.bx.psu.edu/view/gga/tripal_feature_sync):  Synchronize features (from the Tripal tool suite). 
   * [tripal_analysis_load_fasta](https://toolshed.g2.bx.psu.edu/view/gga/tripal_analysis_load_fasta):  Load a Fasta file (from the Tripal tool suite). 
   * [tripal_organism_sync](https://toolshed.g2.bx.psu.edu/view/gga/tripal_organism_sync):  Synchronize an organism (from the Tripal tool suite). 
   * [apollo_delete_organism](https://toolshed.g2.bx.psu.edu/view/gga/apollo_delete_organism):  Delete an Apollo record (from the Apollo tool suite). Talk to a (local) apollo server from Galaxy.
   * [tripal_analysis_load_gff3](https://toolshed.g2.bx.psu.edu/view/gga/tripal_analysis_load_gff3):  Load a GFF3 annotation file (from the Tripal tool suite). 
   * [tripal_analysis_load_go](https://toolshed.g2.bx.psu.edu/view/gga/tripal_analysis_load_go):  Load Blast2GO results (from the Tripal tool suite). 
   * [tripal_organism_add_organism](https://toolshed.g2.bx.psu.edu/view/gga/tripal_organism_add_organism):  Create an organism (from the Tripal tool suite). 
   * [tripal_analysis_load_blast](https://toolshed.g2.bx.psu.edu/view/gga/tripal_analysis_load_blast):  Load Blast results (from the Tripal tool suite). 
   * [tripal_organism_get_organisms](https://toolshed.g2.bx.psu.edu/view/gga/tripal_organism_get_organisms):  Get organisms (from the Tripal tool suite). 
   * [apollo_feat_from_gff3](https://toolshed.g2.bx.psu.edu/view/gga/apollo_feat_from_gff3):  GFF3 to Apollo Annotations (from the Apollo tool suite). Talk to a (local) apollo server from Galaxy.
   * [apollo_export](https://toolshed.g2.bx.psu.edu/view/gga/apollo_export):  Retrieve Data (from the Apollo tool suite). Talk to a (local) apollo server from Galaxy.
   * [apollo_iframe](https://toolshed.g2.bx.psu.edu/view/gga/apollo_iframe):  Annotate (from the Apollo tool suite). Talk to a (local) apollo server from Galaxy.
   * [apollo_create_or_update](https://toolshed.g2.bx.psu.edu/view/gga/apollo_create_or_update):  Create or Update Organism (from the Apollo tool suite). Talk to a (local) apollo server from Galaxy.
   * [tripal_analysis_add_analysis](https://toolshed.g2.bx.psu.edu/view/gga/tripal_analysis_add_analysis):  Create an analysis (from the Tripal tool suite). 
   * [apollo_delete_features](https://toolshed.g2.bx.psu.edu/view/gga/apollo_delete_features):  Delete all annotations from an Apollo record (from the Apollo tool suite). Talk to a (local) apollo server from Galaxy.
   * [jbrowse_to_container](https://toolshed.g2.bx.psu.edu/view/gga/jbrowse_to_container):  A tool allowing to export a JBrowse dataset into a JBrowse docker container. JBrowse is a fast, extensible JS+HTML5 genome browser.    This tool is only useful if you are running both a Galaxy and a JBrowse container,  as described on https://github.com/galaxy-genome-annotation/dockerized-gmod-deployment    https://jbrowse.org.
   * [apollo_create_account](https://toolshed.g2.bx.psu.edu/view/gga/apollo_create_account):  Register Account (from the Apollo tool suite). Talk to a (local) apollo server from Galaxy.
   * [tripal_db_populate_mviews](https://toolshed.g2.bx.psu.edu/view/gga/tripal_db_populate_mviews):  Populate materialized views (from the Tripal tool suite). 
   * [apollo_list_organism](https://toolshed.g2.bx.psu.edu/view/gga/apollo_list_organism):  List Organisms (from the Apollo tool suite). Talk to a (local) apollo server from Galaxy.

## tool_dependency_definition
* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
   * [package_blast_plus_2_6_0](https://toolshed.g2.bx.psu.edu/view/iuc/package_blast_plus_2_6_0): via website. NCBI BLAST+ 2.6.0 (binaries only). This Tool Shed package is intended to be used as a dependency of the Galaxy wrappers for NCBI BLAST+ and any other tools which call the BLAST+ binaries internally.    Note that for compatibility with BioConda, internally this is now called "blast" rather than "blast+" as in the older Galaxy BLAST+ packages.
