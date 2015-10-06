<div class="title">October-November 2015 Tool Shed Contributions</div>

<div class='right'>TABLE_OF_CONTENTS</div>

<div class='right'><a href='http://toolshed.g2.bx.psu.edu/'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy ToolShed' width=200 /></a></div>

Tools contributed to the Galaxy Project Tool Shed in October and November 2015.

### New Tools

#### unrestricted

* *From [tiagoantao](https://toolshed.g2.bx.psu.edu/view/tiagoantao):*
  * [raxml](https://toolshed.g2.bx.psu.edu/view/tiagoantao/raxml): RAxML - A Maximum Likelihood based phylogenetic inference 

* *From [brigidar](https://toolshed.g2.bx.psu.edu/view/brigidar):*
  * [snp_to_bed](https://toolshed.g2.bx.psu.edu/view/brigidar/snp_to_bed): snp_to_bed From a SNP table with locus_tag and position to a BED formatted file. BED requires an interval rather than a single location. 
  * [select_product](https://toolshed.g2.bx.psu.edu/view/brigidar/select_product): select_product Finds all CDS that match the key words provided in the comma separated argument -k in the product description adds a given number of bases on each side of the transcript for the exclusion set. key example: transposases
  * [drop_column](https://toolshed.g2.bx.psu.edu/view/brigidar/drop_column): drop a column  Provide the number of the column to the left (number1) and right (number2) of the column to remove.
  * [vcf_to_snp](https://toolshed.g2.bx.psu.edu/view/brigidar/vcf_to_snp): extract snp from vcf Transforms a vcf into a snp tab file. Can be used to blast against clade database
  * [sed_fasta](https://toolshed.g2.bx.psu.edu/view/brigidar/sed_fasta): removes leading characters in fasta downloaded from ncbi to match genbank locus tag Removes gi to gb characters and final pipe to match genbank locus tag. 

* *From [saskia-hiltemann](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann):*
  * [testrepo](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann/testrepo): for testing tools only until cross-toolshed dependencies work properly
  * [xy_plot_multiformat](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann/xy_plot_multiformat): devteam's xy_plot tool with support for multiple output formats In addition to PDF output, can also generate PNG, JPEG, BMP, TIFF output
  * [file_manipulation](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann/file_manipulation): Collection of File Manipulation Tools 
  * [krona_text](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann/krona_text): Krona visualisation (generic) 

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [ngsutils_bam_filter](https://toolshed.g2.bx.psu.edu/view/iuc/ngsutils_bam_filter):  Wrapper for ngsutils tool: BAM filter 
  * [khmer_normalize_by_median](https://toolshed.g2.bx.psu.edu/view/iuc/khmer_normalize_by_median): Wrapper for khmer tool: Normalize By Median khmer is a library and suite of command line tools for working with DNA sequence. It is primarily aimed at short-read sequencing data such as that produced by the Illumina platform. khmer takes a k-mer-centric approach to sequence analysis, hence the name.<br /><br /> The official repository is at https://github.com/ged-lab/khmer and you can read the docs online here: http://khmer.readthedocs.org/

* [sickle](https://toolshed.g2.bx.psu.edu/view/iuc/sickle): Sickle is a tool that uses sliding windows along with quality and length thresholds to determine when quality is sufficiently low to trim the 3'-end of reads and also determines when the quality is sufficiently high enough to trim the 5'-end of reads. <br /> https://github.com/najoshi/sickle

* [datamash_transpose](https://toolshed.g2.bx.psu.edu/view/iuc/datamash_transpose): Transpose tool from the datamash package GNU Datamash is a command-line program which performs basic numeric,textual and statistical operations on input textual data files.

* [transtermhp](https://toolshed.g2.bx.psu.edu/view/iuc/transtermhp): Finds rho-independent transcription terminators in bacterial genomes TransTermHP finds rho-independent transcription terminators in bacterial genomes. Each terminator found by the program is assigned a confidence value that estimates its probability of being a true terminator. http://transterm.cbcb.umd.edu/

* [suite_ngsutils](https://toolshed.g2.bx.psu.edu/view/iuc/suite_ngsutils): A suite of Galaxy tools for the python ngsutils NGSUtils is a suite of software tools for working with next-generation sequencing datasets.

* [bp_genbank2gff3](https://toolshed.g2.bx.psu.edu/view/iuc/bp_genbank2gff3): Converts !GenBank format files to GFF3 Converts !GenBank to GFF3

* [khmer_abundance_distribution](https://toolshed.g2.bx.psu.edu/view/iuc/khmer_abundance_distribution): Wrapper for khmer tool: Abundance Distribution khmer is a library and suite of command line tools for working with DNA sequence. It is primarily aimed at short-read sequencing data such as that produced by the Illumina platform. khmer takes a k-mer-centric approach to sequence analysis, hence the name.

* [khmer_filter_below_abundance_cutoff](https://toolshed.g2.bx.psu.edu/view/iuc/khmer_filter_below_abundance_cutoff): Wrapper for khmer tool: Filter k-mers khmer is a library and suite of command line tools for working with DNA sequence.

* [dexseq](https://toolshed.g2.bx.psu.edu/view/iuc/dexseq): Inference of differential exon usage in RNA-Seq Estimate variance-mean dependence in count data from high-throughput sequencing assays and test for differential expression based on a model using the negative binomial distribution. http://www.bioconductor.org/packages/release/bioc/html/DEXSeq.html

* [khmer_extract_partitions](https://toolshed.g2.bx.psu.edu/view/iuc/khmer_extract_partitions): Wrapper for khmer tool: Extract partitions khmer is a library and suite of command line tools for working with DNA sequence.
   
* [trinity](https://toolshed.g2.bx.psu.edu/view/iuc/trinity): Trinity assembles transcript sequences from Illumina RNA-Seq data. Trinity represents a method for the efficient and robust de novo reconstruction of transcriptomes from RNA-seq data. https://github.com/trinityrnaseq/trinityrnaseq

* [data_manager_hisat2_index_builder](https://toolshed.g2.bx.psu.edu/view/iuc/data_manager_hisat2_index_builder): HISAT is a fast and sensitive spliced alignment program. As part of HISAT, we have developed a new indexing scheme based on the Burrows-Wheeler transform (BWT) and the FM index, called hierarchical indexing, that employs two types of indexes: (1) one global FM index representing the whole genome, and (2) many separate local FM indexes for small regions collectively covering the genome. http://ccb.jhu.edu/software/hisat/index.shtml

* [transdecoder](https://toolshed.g2.bx.psu.edu/view/iuc/transdecoder):  !TransDecoder finds coding regions within transcripts. !TransDecoder identifies candidate coding regions within transcript sequences, such as those generated by de novo RNA-Seq transcript assembly using Trinity, or constructed based on RNA-Seq alignments to the genome using Tophat and Cufflinks. https://transdecoder.github.io/

* [khmer_filter_abundance](https://toolshed.g2.bx.psu.edu/view/iuc/khmer_filter_abundance): Wrapper for khmer tool: Filter k-mer khmer is a library and suite of command line tools for working with DNA sequence.
   
* [khmer_count_median](https://toolshed.g2.bx.psu.edu/view/iuc/khmer_count_median): Count Median khmer is a library and suite of command line tools for working with DNA sequence.

* [suite_datamash](https://toolshed.g2.bx.psu.edu/view/iuc/suite_datamash):  datamash performs basic numeric, textual and statistical operations on input textual data files GNU Datamash is a command-line program which performs basic numeric,textual and statistical operations on input textual data files. Home page: http://www.gnu.org/software/datamash. These tool wrappers were originally writen by Assaf Gordon.

* [khmer_partition](https://toolshed.g2.bx.psu.edu/view/iuc/khmer_partition): Wrapper for khmer tool: Sequence partition all-in-one khmer is a library and suite of command line tools for working with DNA sequence.
   
* [hisat2](https://toolshed.g2.bx.psu.edu/view/iuc/hisat2): HISAT2 is a fast and sensitive alignment program for mapping next-generation sequencing reads (both DNA and RNA) against the general human population (as well as against a single reference genome).
   
* [datamash_reverse](https://toolshed.g2.bx.psu.edu/view/iuc/datamash_reverse):  Reverse tool from the datamash package. GNU Datamash is a command-line program which performs basic numeric,textual and statistical operations on input textual data files.

* [datamash_ops](https://toolshed.g2.bx.psu.edu/view/iuc/datamash_ops): Datamash tool from the datamash package. GNU Datamash is a command-line program which performs basic numeric,textual and statistical operations on input textual data files.

* [khmer_abundance_distribution_single](https://toolshed.g2.bx.psu.edu/view/iuc/khmer_abundance_distribution_single): Wrapper for khmer tool: Abundance Distribution (all-in-one) khmer is a library and suite of command line tools for working with DNA sequence.

* *From [bgruening](https://toolshed.g2.bx.psu.edu/view/bgruening):*
  * [sailfish](https://toolshed.g2.bx.psu.edu/view/bgruening/sailfish): Sailfish is a tool for transcript quantification from RNA-seq data. https://github.com/kingsfordgroup/sailfish

* [uniprot_rest_interface](https://toolshed.g2.bx.psu.edu/view/bgruening/uniprot_rest_interface): !UniProt ID mapping and sequence retrieval.
   
* [column_arrange_by_header](https://toolshed.g2.bx.psu.edu/view/bgruening/column_arrange_by_header): With this tool you can specify (by naming the header) which columns need to be leftmost. The columns which are not specified will be ordered as before, right of the columns which were specified.


* *From [nick](https://toolshed.g2.bx.psu.edu/view/nick):*
  * [duplex](https://toolshed.g2.bx.psu.edu/view/nick/duplex): A pipeline for processing duplex sequencing data. 

* *From [bornea](https://toolshed.g2.bx.psu.edu/view/bornea):*
  * [saint_bubblebeam](https://toolshed.g2.bx.psu.edu/view/bornea/saint_bubblebeam): Post-process bubble graph generator 
  * [saint_interactions](https://toolshed.g2.bx.psu.edu/view/bornea/saint_interactions): Produces Cytoscape interaction file from Saint output. 
  * [saint_preproc](https://toolshed.g2.bx.psu.edu/view/bornea/saint_preproc): Preprocess script for !MaxQuant and Scaffold output. 
  * [saint_tool](https://toolshed.g2.bx.psu.edu/view/bornea/saint_tool): Wrapper and installer for running Saint express.
   

* *From [mvdbeek](https://toolshed.g2.bx.psu.edu/view/mvdbeek):*
  * [sra_tools](https://toolshed.g2.bx.psu.edu/view/mvdbeek/sra_tools): NCBI Sequence Read Archive toolkit utilities. The Galaxy tool wrappers contained in this tool shed repository rely on software developed by the NCBI Sequence Read Archive: http://www.ncbi.nlm.nih.gov/Traces/sra/sra.cgi?view=software. 

* *From [yhoogstrate](https://toolshed.g2.bx.psu.edu/view/yhoogstrate):*
  * [show_metadata](https://toolshed.g2.bx.psu.edu/view/yhoogstrate/show_metadata): Debug utility, shows all metadata of a history item 

* [samtools_parallel_mpileup](https://toolshed.g2.bx.psu.edu/view/yhoogstrate/samtools_parallel_mpileup):  samtools - optimized for parallel mpileup generation 

* [varscan_mpileup2indel_from_bam](https://toolshed.g2.bx.psu.edu/view/yhoogstrate/varscan_mpileup2indel_from_bam): !VarScan2 mpileup2indel - optimized for direct BAM/SAM input and parallel mpileup generation. !VarScan is a variant caller for high-throughput sequencing data.

* [varscan_mpileup2snp_from_bam](https://toolshed.g2.bx.psu.edu/view/yhoogstrate/varscan_mpileup2snp_from_bam):  !VarScan2 mpileup2snp - optimized for direct BAM/SAM input and parallel mpileup generation. !VarScan is a variant caller for high-throughput sequencing data.


* *From [devteam](https://toolshed.g2.bx.psu.edu/view/devteam):*
  * [data_manager_fetch_ncbi_taxonomy](https://toolshed.g2.bx.psu.edu/view/devteam/data_manager_fetch_ncbi_taxonomy): Contains a data manager that defines and populates the ncbi_taxonomy tool data table. Download the NCBI taxonomy files and add their paths to a data table

* [data_manager_rsync_g2](https://toolshed.g2.bx.psu.edu/view/devteam/data_manager_rsync_g2): rsync data manager This tool connects to the Galaxy Project's rsync reference data repository to download data and populate tool data tables.

* [velvet](https://toolshed.g2.bx.psu.edu/view/devteam/velvet): de novo genomic assembler specially designed for short read sequencing technologies 

* *From [drosofff](https://toolshed.g2.bx.psu.edu/view/drosofff):*
  * [msp_sr_readmap_and_size_histograms](https://toolshed.g2.bx.psu.edu/view/drosofff/msp_sr_readmap_and_size_histograms): generates readmaps and size histograms from small RNA bowtie alignments generates readmaps and size histograms from small RNA bowtie alignments. This tool belongs to the mississippi tool suite.

* [msp_sr_signature](https://toolshed.g2.bx.psu.edu/view/drosofff/msp_sr_signature): Computes the tendency of small RNAs to overlap with each other. Compute the tendency of small RNAs to overlap with each others for detailed information, see C. Antoniewski, \u201cComputing siRNA and piRNA Overlap Signatures.,\u201d Methods Mol. Biol., vol. 1173, no. 12, pp. 135\u2013146, 2014.

* [msp_sr_size_histograms](https://toolshed.g2.bx.psu.edu/view/drosofff/msp_sr_size_histograms): Generates size histograms from small RNA bowtie alignments. Generates size histograms from small RNA bowtie alignments.


* *From [urgi-team](https://toolshed.g2.bx.psu.edu/view/urgi-team):*
  * [vcfgandalftools](https://toolshed.g2.bx.psu.edu/view/urgi-team/vcfgandalftools): VCF Gandalf tools. Tools developped for the Gandalf project. 
  * [freebayes4workflow](https://toolshed.g2.bx.psu.edu/view/urgi-team/freebayes4workflow):  This tool is a fork of Freebayes revision 22 (99684adf84de) allows to rename the output file in workflows
  * [mdust](https://toolshed.g2.bx.psu.edu/view/urgi-team/mdust): fast and symmetric DUST implementation to mask low-complexity DNA sequences
  * [gandalfworkflow](https://toolshed.g2.bx.psu.edu/view/urgi-team/gandalfworkflow): workflows developped for the Gandalf project
  * [mapqfilter](https://toolshed.g2.bx.psu.edu/view/urgi-team/mapqfilter): mapQfilter filters reads on quality and remove both members of the pair. uses samtools and picard tools

* *From [stheil](https://toolshed.g2.bx.psu.edu/view/stheil):*
  * [readpercontig_blat](https://toolshed.g2.bx.psu.edu/view/stheil/readpercontig_blat): Get read number, coverage or rpkm from blat alignment of reads on contigs. Two simple tools :
    * readPerContig allows to compute either the number of reads, the coverage, or the rpkm by mapping reads on contig/scaffold using blat.
    * getSingleton extracts reads that do not match on any contig/scaffold.
  * [taxonomy_sqlite](https://toolshed.g2.bx.psu.edu/view/stheil/taxonomy_sqlite): Download NCBI taxonomy from FTP and loads it into a sqlite database. Download 4 files : gi_taxid_prot.dmp, gi_taxid_nucl.dmp, nodes.dmp and names.dmp from NCBI Taxonomy ftp site. A perl script called loadTaxonomy.pl creates the DB structure and loads the downloaded data into it. This DB aims to be used by the taxonomy_from_blast tools repository.

* *From [nml](https://toolshed.g2.bx.psu.edu/view/nml):*
  * [bundle_collections](https://toolshed.g2.bx.psu.edu/view/nml/bundle_collections): Tool to bundle up list collection into a single zip to be download 

* *From [gbcs-embl-heidelberg](https://toolshed.g2.bx.psu.edu/view/gbcs-embl-heidelberg):*
  * [je_markdupes](https://toolshed.g2.bx.psu.edu/view/gbcs-embl-heidelberg/je_markdupes): Initial upload Wrapper for Je tool: Je-!MarkDuplicates 
  * [je_demultiplex_illu](https://toolshed.g2.bx.psu.edu/view/gbcs-embl-heidelberg/je_demultiplex_illu): Initial upload Wrapper for Je tool: Je-Demultiplex-Illu 
  * [je_clip](https://toolshed.g2.bx.psu.edu/view/gbcs-embl-heidelberg/je_clip): Initial upload Wrapper for Je tool: Je-Clip 
  * [je_demultiplex](https://toolshed.g2.bx.psu.edu/view/gbcs-embl-heidelberg/je_demultiplex): Initial upload Wrapper for Je tool: Je-Demultiplex 

#### tool_dependency_definition

* *From [anmoljh](https://toolshed.g2.bx.psu.edu/view/anmoljh):*
  * [package_samtools_1_2](https://toolshed.g2.bx.psu.edu/view/anmoljh/package_samtools_1_2): Contains a tool dependency definition that downloads and installs version 1.2 of the SAMTools package. 

* *From [takadonet](https://toolshed.g2.bx.psu.edu/view/takadonet):*
  * [package_tbl2asn_24_3](https://toolshed.g2.bx.psu.edu/view/takadonet/package_tbl2asn_24_3): Contains a tool dependency definition that downloads the binary version 23.7 of tbl2asn. tbl2asn is an automated bulk submission program. Repository-Maintainer:Philip Mabon


* *From [galaxyp](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
  * [package_peptideshaker_1_1](https://toolshed.g2.bx.psu.edu/view/galaxyp/package_peptideshaker_1_1): Installs tool dependencies for !PeptideShaker version 1.1
  * [package_proteowizard_3_0_9016](https://toolshed.g2.bx.psu.edu/view/galaxyp/package_proteowizard_3_0_9016): package_proteowizard_3_0_9016
  * [package_searchgui_2_1](https://toolshed.g2.bx.psu.edu/view/galaxyp/package_searchgui_2_1):  Install tool dependencies for SearchGUI version 2.1


### Select Updates

* *From [peterjc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [package_blast_plus_2_2_26](https://toolshed.g2.bx.psu.edu/view/iuc/package_blast_plus_2_2_26): Typo and metadata URL correction; Define BLAST_ROOT_DIR env var on older BLAST+ packages
  * [package_blast_plus_2_2_27](https://toolshed.g2.bx.psu.edu/view/iuc/package_blast_plus_2_2_27): Typo and metadata URL correction; Define BLAST_ROOT_DIR env var on older BLAST+ packages
  * [ncbi_blast_plus](https://toolshed.g2.bx.psu.edu/view/devteam/ncbi_blast_plus): v0.1.07 - fix macro problem in blastxml_to_tabular.xml, reenable .loc tests
  * [package_blast_plus_2_2_28](https://toolshed.g2.bx.psu.edu/view/iuc/package_blast_plus_2_2_28): Typo and metadata URL correction; Define BLAST_ROOT_DIR env var on older BLAST+ packages
  * [package_blast_plus_2_2_29](https://toolshed.g2.bx.psu.edu/view/iuc/package_blast_plus_2_2_29): Typo and metadata URL correction
  * [venn_list](https://toolshed.g2.bx.psu.edu/view/peterjc/venn_list): v0.0.9 - Tool Shed dependency for rpy and limma


* *From [saskia-hiltemann](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann):*
  * [annovar](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann/annovar): Added databases 1000g2015aug, SPIDEX, avsnp138, avsnp142, exac03
  * [annovar](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann/annovar): added GoNL download link
  * [annovar](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann/annovar): Uploaded
  * [ireport](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann/ireport): Fixed auto resizing plus various other minor bugs
  * [ireport](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann/ireport): Fixed auto resizing plus various other minor bugs


* *From [iracooke](https://toolshed.g2.bx.psu.edu/view/iracooke):*
  * [tpp_prophets](https://toolshed.g2.bx.psu.edu/view/iracooke/tpp_prophets): Fix tabular outputs. Export XML_ONLY variable
  * [xtandem](https://toolshed.g2.bx.psu.edu/view/iracooke/xtandem): Check exit code


* *From [crs4](https://toolshed.g2.bx.psu.edu/view/crs4):*
  * [prokka](https://toolshed.g2.bx.psu.edu/view/crs4/prokka): Support Prokka 1.11. Upgrade dependencies to package_barrnap_0_7, package_blast_plus_2_2_31, package_hmmer_3_1b2, package_tbl2asn_24_3.
