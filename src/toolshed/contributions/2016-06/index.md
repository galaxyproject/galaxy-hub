---
---
* [Wiki Root](/src/toolshed/index.md)
* [All monthly summaries](/src/toolshed/contributions/index.md)

# Tools

* *From [insilico-bob](https://toolshed.g2.bx.psu.edu/view/insilico-bob):*
  * [mean_center_matrix](https://toolshed.g2.bx.psu.edu/view/insilico-bob/mean_center_matrix): mean-center a matrix with header row and 1st column containing labels Mean-center a matrix with header row and 1st column with  labels.
    * Assumes Labels are in row 1 and in column 1
    * Mean-center all values in a row (cell value = cell value - row mean value)
    * Repeat for all rows 2 - N+1.
  * [ngchm](https://toolshed.g2.bx.psu.edu/view/insilico-bob/ngchm): Generate clustered Heatmaps with optional co-variate bars. Generate a clustered Heatmap from NGCHM data, or other data matrices, with many methods to choose from for clustering. Also, multiple category/co-variate bars may be added to either the columns or rows. The output is a zip file that can be displayed in Galaxy via the visualize icon at the bottom of the output file in the History ( near the save, information "I", rerun, then the visualize icon. Click the icon and the heatmap displays in the Galaxy middle region.
    * The input matrix is assume to have both the first column and the first row containing labels
    * Any input co-variate bar files must have the same number of labels as in the input matrix's row or column labels (whichever the co-variate bar is to map to).
    * The input matrix is assume to have both the first column and the first row containing labels.
    * Any co-variate bar files must have the same number of labels as in the input matrix's row or column labels (whichever the co-variate bar is to map to).

* *From [engineson](https://toolshed.g2.bx.psu.edu/view/engineson):*
  * [multiqc](https://toolshed.g2.bx.psu.edu/view/engineson/multiqc): MultiQC searches a given directory for analysis logs and compiles a HTML report. It's a general use tool, perfect for summarising the output from numerous bioinformatics tools.

* *From [alenail](https://toolshed.g2.bx.psu.edu/view/alenail):*
  * [map_to_known_genes](https://toolshed.g2.bx.psu.edu/view/alenail/map_to_known_genes): Map MACS Peaks to Known Genes
  * [pieplot_macs](https://toolshed.g2.bx.psu.edu/view/alenail/pieplot_macs): Make a pie chart for mapped MACS peaks

* *From [stemcellcommons](https://toolshed.g2.bx.psu.edu/view/stemcellcommons):*
  * [chipseq_workflows](https://toolshed.g2.bx.psu.edu/view/stemcellcommons/chipseq_workflows): hg19 workflow. ChIP-seq workflows annotated for use with Refinery Platform
  * [fastqc_workflow](https://toolshed.g2.bx.psu.edu/view/stemcellcommons/fastqc_workflow): FastQC workflow designed for use with Refinery Platform

* *From [crique](https://toolshed.g2.bx.psu.edu/view/crique):*
  * [phylogenetic_analysis](https://toolshed.g2.bx.psu.edu/view/crique/phylogenetic_analysis): Phylogenetic analysis using PhyML. PhyML is a software package which primary task that is to estimate maximum likelihood phylogenies from alignments of nucleotide or amino acid sequences. It provides a wide range of options that were designed to facilitate standard phylogenetic analyses. (Guindon, S., & Gascuel, O. (2003). A simple, fast, and accurate algorithm to estimate large phylogenies by maximum likelihood. Systematic biology, 52(5), 696-704)

* *From [rnateam](https://toolshed.g2.bx.psu.edu/view/rnateam):*
  * [rnacommender](https://toolshed.g2.bx.psu.edu/view/rnateam/rnacommender): RNAcommender is a tool for genome-wide recommendation of RNA-protein interactions. RNAcommender is a tool for genome-wide recommendation of RNA-protein interactions. It is a recommender system capable of suggesting RNA targets to unexplored RNA binding proteins, by propagating the available interaction information, taking into account the protein domain composition and the RNA predicted secondary structure.

* *From [ambarishk](https://toolshed.g2.bx.psu.edu/view/ambarishk):*
  * [mytoolshed](https://toolshed.g2.bx.psu.edu/view/ambarishk/mytoolshed): Toolshed to make required tools shreable and installable.

* *From [bebatut](https://toolshed.g2.bx.psu.edu/view/bebatut):*
  * [fasta_add_barcode](https://toolshed.g2.bx.psu.edu/view/bebatut/fasta_add_barcode): Add barcodes at begining of FASTA sequences Add barcodes at begining of FASTA sequences
  * [format_cd_hit_output](https://toolshed.g2.bx.psu.edu/view/bebatut/format_cd_hit_output): Format CD-hit output to rename representative sequences with cluster name and/or extract distribution inside clusters given a mapping file
  * [format_metaphlan2_output](https://toolshed.g2.bx.psu.edu/view/bebatut/format_metaphlan2_output): Format !MetaPhlAn2 output to extract abundance at different taxonomic levels
  * [compute_wilcoxon_test](https://toolshed.g2.bx.psu.edu/view/bebatut/compute_wilcoxon_test): Compute Wilcoxon test with R
  * [extract_min_max_lines](https://toolshed.g2.bx.psu.edu/view/bebatut/extract_min_max_lines): Extract lines corresponding with minimum and maximum values of a column
  * [plot_grouped_barplot](https://toolshed.g2.bx.psu.edu/view/bebatut/plot_grouped_barplot): Plot a grouped barplot graphic using R
  * [convert_extract_sequence_file](https://toolshed.g2.bx.psu.edu/view/bebatut/convert_extract_sequence_file):  Convert/ Extract information from a sequence file, with possible constraints
  * [combine_metaphlan2_humann2](https://toolshed.g2.bx.psu.edu/view/bebatut/combine_metaphlan2_humann2): Combine !MetaPhlAn2 and HUMAnN2 outputs to relate genus/species abundances and gene families/pathways abundances
  * [plot_generic_x_y_plot](https://toolshed.g2.bx.psu.edu/view/bebatut/plot_generic_x_y_plot): Plot a generic X-Y plot graphic using R
  * [export2graphlan](https://toolshed.g2.bx.psu.edu/view/bebatut/export2graphlan): export2graphlan is a conversion software tool for producing both annotation and tree file for !GraPhlAn
  * [graphlan](https://toolshed.g2.bx.psu.edu/view/bebatut/graphlan): !GraPhlAn is a software tool for producing high-quality circular representations of taxonomic and phylogenetic trees
  * [humann2](https://toolshed.g2.bx.psu.edu/view/bebatut/humann2): HUMAnN2 is a pipeline for efficiently and accuretly profiling the presence/absence and abundance of microbial pathways in a community from metagenomic or metatranscriptomic sequencing data.
  * [group_humann2_uniref_abundances_to_go](https://toolshed.g2.bx.psu.edu/view/bebatut/group_humann2_uniref_abundances_to_go): Group abundances of !UniRef50 gene families obtained with HUMAnN2 to Gene Ontology (GO) slim terms with relative abundances
  * [normalize_dataset](https://toolshed.g2.bx.psu.edu/view/bebatut/normalize_dataset): Normalize a dataset by row or column sum
  * [plot_barplot](https://toolshed.g2.bx.psu.edu/view/bebatut/plot_barplot): Plot a barplot graphic using R
  * [compare_humann2_output](https://toolshed.g2.bx.psu.edu/view/bebatut/compare_humann2_output): Compare outputs of HUMAnN2 for several samples and extract similar and specific information
  * [cdhit](https://toolshed.g2.bx.psu.edu/view/bebatut/cdhit): Cd-Hit is a very widely used program for clustering and comparing protein or nucleotide sequences

* *From [bornea](https://toolshed.g2.bx.psu.edu/view/bornea):*
  * [query_crapome](https://toolshed.g2.bx.psu.edu/view/bornea/query_crapome): This program will read in a SAINT formatted *Prey* file or a single column list (no column name) of Uniprot accessions (e.g. "P00533" or "EGFR_HUMAN"), query the  CRAPome database (v1.1) http://crapome.org, and return a file specifying the prevalence of each protein in the CRAPome.
  * [nsaf_scoring](https://toolshed.g2.bx.psu.edu/view/bornea/nsaf_scoring): This program performs the file merging as well as a calculating CRAPomePCT, NSAF and NSAF score.

* *From [bgruening](https://toolshed.g2.bx.psu.edu/view/bgruening):*
  * [openmg](https://toolshed.g2.bx.psu.edu/view/bgruening/openmg): Open Molecule Generator Open Molecule Generator - an exhaustive generation of chemical structures

* *From [takakoron](https://toolshed.g2.bx.psu.edu/view/takakoron):*
  * [distribution_of_dna_polymorphism](https://toolshed.g2.bx.psu.edu/view/takakoron/distribution_of_dna_polymorphism): distribution_of_dna_polymorphism

* *From [galaxyp](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
  * [hardklor](https://toolshed.g2.bx.psu.edu/view/galaxyp/hardklor): Hardkl\u00f6r Identifies peptide or protein-like features in mass spectra, deconvolves overlapping ion signals, and can be used on a variety of input formats. https://proteome.gs.washington.edu/software/hardklor/
  * [msconvert_nix](https://toolshed.g2.bx.psu.edu/view/galaxyp/msconvert_nix): Convert and/or filter mass spectrometry files on linux or MacOSX Proteowizard msconvert. Convert and/or filter mass spectrometry files. This does not contain vendor proprietary libraries, so it can only be used on publicly available file formats. http://proteowizard.sourceforge.net
  * [asms_tutorial_2016](https://toolshed.g2.bx.psu.edu/view/galaxyp/asms_tutorial_2016): ASMS 2016  Tutorial Workflows Workflow for !PeptideShaker PSM REPORT to NOVEL peptides
  * [morpheus](https://toolshed.g2.bx.psu.edu/view/galaxyp/morpheus): Morpheus MS Search Application Morpheus database search algorithm for high-resolution tandem mass spectra.  Features automatic inclusion of known PTMs (Post Translational Modifications) when a !UniProt Proteome is used as the search database. https://github.com/cwenger/Morpheus/
  * [proteogenomics_splice_junc_search_db](https://toolshed.g2.bx.psu.edu/view/galaxyp/proteogenomics_splice_junc_search_db): Generate Novel Splice Junction Search DBs from RNAseq Workflows generate a protein fasta and a bed file for novel splice junctions identified from RNAseq data
  * [idconvert](https://toolshed.g2.bx.psu.edu/view/galaxyp/idconvert): Convert mass spectrometry identification files on linux or MacOSX Proteowizard idconvert.   Convert mass spectrometry identification files: mzIdentML, protXML, pepXML. http://proteowizard.sourceforge.net
  * [msconvert_win](https://toolshed.g2.bx.psu.edu/view/galaxyp/msconvert_win): msconvert. Convert and/or filter mass spectrometry files (including vendor formats) on Windows OS Proteowizard msconvert.  Convert and/or filter mass spectrometry files on a Windows OS. This can contain vendor proprietary libraries for vendor file formats. A Windows admin needs to install proteowizard and vendor DLL. http://proteowizard.sourceforge.net


* *From [mandorodriguez](https://toolshed.g2.bx.psu.edu/view/mandorodriguez):*
  * [endsid_gene_name_append](https://toolshed.g2.bx.psu.edu/view/mandorodriguez/endsid_gene_name_append): Adds the real Gene Name to a row with !EnsId identifiers using a file with a mapping. Takes in a file with gene expression data and a file that has a mapping of !EnsGene IDs to gene names and adds the real gene name to the row with the matching EnsID.

* *From [tiagoantao](https://toolshed.g2.bx.psu.edu/view/tiagoantao):*
  * [barcode_stacks](https://toolshed.g2.bx.psu.edu/view/tiagoantao/barcode_stacks): Barcode sorter for Stacks

* *From [aafc-mbb](https://toolshed.g2.bx.psu.edu/view/aafc-mbb):*
  * [kurator](https://toolshed.g2.bx.psu.edu/view/aafc-mbb/kurator): The wrapper tool to invoke Kurator package

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [bcftools_call](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_call): Wrapper for bcftools application bcftools call. https://samtools.github.io/bcftools/
  * [suite_bcftools_1_2](https://toolshed.g2.bx.psu.edu/view/iuc/suite_bcftools_1_2): A suite of Galaxy tools designed to work with version 1.2 of the bcftools package. https://samtools.github.io/bcftools/
  * [collection_column_join](https://toolshed.g2.bx.psu.edu/view/iuc/collection_column_join): Column Join on Collections Column Join on Collections lists
  * [prinseq](https://toolshed.g2.bx.psu.edu/view/iuc/prinseq): PRINSEQ is a tool for easy and rapid quality control and data processing of metagenomic and metatranscriptomic datasets
  * [tag_pileup_frequency](https://toolshed.g2.bx.psu.edu/view/iuc/tag_pileup_frequency): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/tag_pileup_frequency commit 4defaa3ff1c21e2ec39033bfe63ee69471104ede Contains a tool that generates a frequency pileup of the 5' ends of aligned reads in a BAM file relative to reference points in a BED file. Contains a tool that generates a frequency pileup of the 5' ends of aligned reads in a BAM file relative to reference points in a BED file.


* *From [ulfschaefer](https://toolshed.g2.bx.psu.edu/view/ulfschaefer):*
  * [phephenix](https://toolshed.g2.bx.psu.edu/view/ulfschaefer/phephenix): Public Health England SNP calling Pipeline

* *From [iarc](https://toolshed.g2.bx.psu.edu/view/iarc):*
  * [mutspec](https://toolshed.g2.bx.psu.edu/view/iarc/mutspec): mutation spectra anlysis tool suite mutation spectra anlysis tool suite

* *From [drosofff](https://toolshed.g2.bx.psu.edu/view/drosofff):*
  * [metavisitor_workflows](https://toolshed.g2.bx.psu.edu/view/drosofff/metavisitor_workflows): A collection of workflows using the Metavisitor tools This Tool Shed Repository contains a collection of workflows using the Metavisitor tools.


* *From [urgi-team](https://toolshed.g2.bx.psu.edu/view/urgi-team):*
  * [workflow_teiso](https://toolshed.g2.bx.psu.edu/view/urgi-team/workflow_teiso): TEiso RNA_seq
  * [teiso](https://toolshed.g2.bx.psu.edu/view/urgi-team/teiso): TEiso TEiso is a python script that allows to find distance between the element transposable and TSS of isoforms.

* *From [brenninc](https://toolshed.g2.bx.psu.edu/view/brenninc):*
  * [data_manager_gene_transfer_by_path](https://toolshed.g2.bx.psu.edu/view/brenninc/data_manager_gene_transfer_by_path): Copies a path to a gene_transfer Data Table Copies a path to a gene_transfer Data Table.Check the file exists but not that it is the correct format,
  * [data_manager_tagdust_architecture](https://toolshed.g2.bx.psu.edu/view/brenninc/data_manager_tagdust_architecture): Sets up architecture files to be used by tagdust Sets up architecture files to be used by tagdust. Creates the architecture file and adds it to the tagdust_architecture Data Table
  * [sync_paired_end_reads](https://toolshed.g2.bx.psu.edu/view/brenninc/sync_paired_end_reads): synchronise paired-end reads based on https://github.com/mmendez12/sync_paired_end_reads sync_paired_end_reads is a python tool to synchronise paired-end reads when reads1 or reads2 were modified. When working with paired-end sequencing data, it is common to filter out reads that do not pass basic quality controls. This leads to pairs that are not synced anymore. This tool streams reads1 and search for the associated read2 in reads2. Additionally it synchronises the sequence identifiers of the reads so if a software modified the sequence identifier of the reads1 then same identifiers will be used for reads2. Finally it replaces all space characters by an arbitrary '<u>_' pattern. This tool was mainly developed to process the output of tagdust2 when ran in single-end mode which appends the UMIs found in the raw sequences to the sequence identifier. Source: https://github.com/mmendez12/sync_paired_end_reads
  * [samtools_flag_filter_1_2](https://toolshed.g2.bx.psu.edu/view/brenninc/samtools_flag_filter_1_2): first version Usel Samtools view to filter by flag and sort resulting bam file Runs samtools view with the -f and _F options to allow filtering on the presence or absence of a bit in the Flag column. The sorts the resulting bam file in the order required by Galaxy
  * [umicount](https://toolshed.g2.bx.psu.edu/view/brenninc/umicount): first version Remove and count PCR duplicates using https://github.com/mmendez12/umicount Remove and count PCR duplicates from paired-end libraries prepared with unique molecular identifiers (UMIs). "umicount is a collection of Python scripts which allows to remove and count PCR duplicates from paired-end libraries prepared with unique molecular identifiers (UMIs). The main difference between existing approaches (rmdup or !MarkDuplicates) is that it uses UMI and Transcription Start Site information to remove duplicates rather than the reads size. It was mainly developed for single-cell CAGE and single-cell nanoCAGE protocols where a tagmentation step is performed between two PCRs. Source: https://github.com/mmendez12/umicount
  * [subread_featurecounts1_5_0_p1](https://toolshed.g2.bx.psu.edu/view/brenninc/subread_featurecounts1_5_0_p1): Runs http://subread.sourceforge.net/ featurecount tool Runs http://subread.sourceforge.net featureCounts: an efficient general purpose program for assigning sequence reads to genomic features
  * [tagdust_2_31](https://toolshed.g2.bx.psu.edu/view/brenninc/tagdust_2_31): first version of tagdust Runs tools based on http://sourceforge.net/projects/tagdust "!TagDust allows users to specify the expected architecture of a read and converts it into a hidden Markov model. The latter can assign sequences to a particular barcode (or index) even in the presence of sequencing errors. Sequences not matching the architecture (primer dimers, contaminants etc.) are automatically discarded" Source: http://sourceforge.net/projects/tagdust  Both single and paired ends available. Depends on: https://testtoolshed.g2.bx.psu.edu/view/brenninc/data_manager_tagdust_architecture
  * [data_manager_for_directory_data](https://toolshed.g2.bx.psu.edu/view/brenninc/data_manager_for_directory_data): Loads a Directory and Extension Pair into the directory_data Data Table Loads a Directory and Extension Pair into the directory_data Data Table
  * [pairedbamtobed12](https://toolshed.g2.bx.psu.edu/view/brenninc/pairedbamtobed12): first version Converts Ban files to bed 12 using https://github.com/Population-Transcriptomics/pairedBamToBed12 pairedBamToBed12 converts properly paired BAM alignments to BED12 format. Typical proper pairs will be represented by a 2 blocks BED12 entry. Additional blocks are produced when an alignment contains long deletion (CIGAR N-op). Thickness indicates the first read of the pair. The BAM input file must be grouped/sorted by query name (not alignment position). Source:https://github.com/Population-Transcriptomics/pairedBamToBed12
  * [preconfigured_directory_reader](https://toolshed.g2.bx.psu.edu/view/brenninc/preconfigured_directory_reader): first version Reads files from a preconfigure directory on the server into a Data Collection Reads file from a preconfigure directory on the server. Loads all files from a server directory into a Data Collection and also provides a text fie with the original names. Depends on the directory_data  Data Table. See https://testtoolshed.g2.bx.psu.edu/view/brenninc/data_manager_for_directory_data. Only preconfigured combination of path and extension work. Files will have their extension changed to one expected by galaxy and can be decompressed as set in the Data Table.
  * [directory_reader_limited_by_data_table](https://toolshed.g2.bx.psu.edu/view/brenninc/directory_reader_limited_by_data_table): first version Reads files into a data collection from a preconfigure directory on the server. Reads files from a preconfigure directory on the server. Loads all specified files from a server directory into a Data Collection and also provides a text fie with the original names. Depends on the directory_data  Data Table. See https://toolshed.g2.bx.psu.edu/view/brenninc/data_manager_for_directory_data. Only preconfigured combination of path and extension work. Files will have their extension changed to one expected by galaxy and can be decompressed as set in the Data Table. Users have the ability to limit the files by prefix (start of name) and postfix (last bit of the name before the extension)
  * [data_manager_all_fasta_path](https://toolshed.g2.bx.psu.edu/view/brenninc/data_manager_all_fasta_path): original version Creates a link in the all_fasta data table to a fasta file on the server  Creates a link in the all_fasta data table to a fasta file on the server. Checks the file exists but not that it is a readable fasta file.
  * [package_tagdust_2_31](https://toolshed.g2.bx.psu.edu/view/brenninc/package_tagdust_2_31): Installs code from http://sourceforge.net/projects/tagdust Version 2_31 Installs code from http://sourceforge.net/projects/tagdust Version 2_31. Or to be completely correct a http://sourceforge.net/projects/tagdust with a very minor correction. "Dust allows users to specify the expected architecture of a read and converts it into a hidden Markov model. The latter can assign sequences to a particular barcode (or index) even in the presence of sequencing errors. Sequences not matching the architecture (primer dimers, contaminants etc.) are automatically discarded:" Source: http://tagdust.sourceforge.net/
  * [bedtools_bedtobam](https://toolshed.g2.bx.psu.edu/view/brenninc/bedtools_bedtobam): Bed to Bam from bedtools with samtools sort at the end Runs !BedToBam and the sort as galaxy no longer accepts unsorted bam files. Based on https://toolshed.g2.bx.psu.edu/view/iuc/bedtools/f8b7dc21b4ee

* *From [epigenome](https://toolshed.g2.bx.psu.edu/view/epigenome):*
  * [history_summary](https://toolshed.g2.bx.psu.edu/view/epigenome/history_summary): summarize current history contents and rename output files !HistorySummary generates a html for summarizing the current history contents along with renaming the output files

* *From [nturaga](https://toolshed.g2.bx.psu.edu/view/nturaga):*
  * [minfi_tools](https://toolshed.g2.bx.psu.edu/view/nturaga/minfi_tools): A suite of Galaxy tools for minfi: Analyze Illumina's 450k methylation arrays Minfi package version 1.16.0, Analyze illumina human methyaltion 450K arrays
  * [minfi_analyze_tcga](https://toolshed.g2.bx.psu.edu/view/nturaga/minfi_analyze_tcga):  Wrapper for minfi tool: Minfi Analysis Pipeline Minfi package version 1.16.0, Analyze illumina human methyaltion 450K arrays
  * [minfi_pipeline](https://toolshed.g2.bx.psu.edu/view/nturaga/minfi_pipeline): Wrapper for minfi tool: Minfi pipeline Minfi package version 1.16.0, Analyze illumina human methyaltion 450K arrays

* *From [portiahollyoak](https://toolshed.g2.bx.psu.edu/view/portiahollyoak):*
  * [pindel2vcf](https://toolshed.g2.bx.psu.edu/view/portiahollyoak/pindel2vcf): !Pindel2Vcf converts Pindel output files to VCF format !Pindel2Vcf converts Pindel output files to VCF format
  * [temp](https://toolshed.g2.bx.psu.edu/view/portiahollyoak/temp): TEMP is a software package for detecting transposable elements (TEs) insertions and absences from pooled high-throughput sequencing data TEMP is a software package for detecting transposable elements (TEs) insertions and absences from pooled high-throughput sequencing data
  * [change_fasta_header_using_tabular_file](https://toolshed.g2.bx.psu.edu/view/portiahollyoak/change_fasta_header_using_tabular_file): Change fasta header using a tabular file This tool takes 2 input files, a tabular file with text to replace in the first column, and a replacement text in the 2nd column, as well as a fasta file. Every occurence of values in the first column of the tabular file will be replaced with the value in the 2nd column
  * [genbank_to_fasta](https://toolshed.g2.bx.psu.edu/view/portiahollyoak/genbank_to_fasta): This tool converts a multigenbank file into a multifasta file This tool converts a multigenbank file into a multifasta file
  * [pindel](https://toolshed.g2.bx.psu.edu/view/portiahollyoak/pindel): Pindel detects genome-wide structural variation. Pindel can detect breakpoints of large deletions, medium sized insertions, inversions, tandem duplications and other structural variants at single-based resolution from next-gen sequence data. It uses a pattern growth approach to identify the breakpoints of these variants from paired-end short reads.
  * [breakdancer_max](https://toolshed.g2.bx.psu.edu/view/portiahollyoak/breakdancer_max): !Breakdancer provides genome-wide detection of structural variation. !BreakDancer (previously !BreakDancerMax) provides genome-wide detection of five types of structural variants: insertions, deletions, inversions, inter- and intra-chromosomal translocations from next-generation short paired-end sequencing reads using read pairs that are mapped with unexpected separation distances or orientation.
  * [gff_feature_colours](https://toolshed.g2.bx.psu.edu/view/portiahollyoak/gff_feature_colours): Adds assigned feature colours Takes unique features in 3rd column of GFF file, allows user to assign a colour to each and then adds colour to 9th column for visualisation in a genome browser.


* *From [dereeper](https://toolshed.g2.bx.psu.edu/view/dereeper):*
  * [snmf](https://toolshed.g2.bx.psu.edu/view/dereeper/snmf): Fast and efficient program for estimating individual admixture coefficients Fast and efficient program for estimating individual admixture coefficients based on sparse non-negative matrix factorization and population genetics.

* *From [scottx611x](https://toolshed.g2.bx.psu.edu/view/scottx611x):*
  * [tophat2_with_gene_annotations](https://toolshed.g2.bx.psu.edu/view/scottx611x/tophat2_with_gene_annotations): Tophat2 with edited tool-wrapper and macros Tophat2 with edited tool-wrapper and macros that utilize gene_annotations
  * [data_manager_fetch_gene_annotation](https://toolshed.g2.bx.psu.edu/view/scottx611x/data_manager_fetch_gene_annotation): Fetch gene annotation data Fetch gene annotation data from a given url

* *From [marie-tremblay-metatoul](https://toolshed.g2.bx.psu.edu/view/marie-tremblay-metatoul):*
  * [nmr_normalization](https://toolshed.g2.bx.psu.edu/view/marie-tremblay-metatoul/nmr_normalization): [W4M][NMR] NMR Normalization - Normalization (operation applied on each individual spectrum) of bucketed and integrated NMR data Part of the W4M project: http://workflow4metabolomics.org
  * [nmr_bucketing](https://toolshed.g2.bx.psu.edu/view/marie-tremblay-metatoul/nmr_bucketing): [W4M][NMR] NMR Bucketing - Bucketing / Binning (spectra segmentation in fixed-size windows) and integration (sum of absolute intensities inside each bucket) to preprocess NMR data Part of the W4M project: http://workflow4metabolomics.org

* *From [george-weingart](https://toolshed.g2.bx.psu.edu/view/george-weingart):*
  * [metaphlan2_hutlab](https://toolshed.g2.bx.psu.edu/view/george-weingart/metaphlan2_hutlab): metaphlan2 Huttenhower Lab: Initial upload !MetaPhlAn2 Huttenhower Lab: Computational tool for profiling the composition of microbial communities !MetaPhlAn is a computational tool for profiling the composition of microbial communities (Bacteria, Archaea, Eukaryotes and Viruses) from metagenomic shotgun sequencing data with species level resolution. From version 2.0, !MetaPhlAn is also able to identify specific strains (in the not-so-frequent cases in which the sample contains a previously sequenced strains) and to track strains across samples for all species.

# Dependency Definitions

* *From [brenninc](https://toolshed.g2.bx.psu.edu/view/brenninc):*
  * [package_subread_1_5_0_p1](https://toolshed.g2.bx.psu.edu/view/brenninc/package_subread_1_5_0_p1): Installls the Subread software package https://sourceforge.net/projects/subread/files/subread-1.5.0-p1. "The Subread software package is a tool kit for processing next-gen sequencing data. It includes Subread aligner, Subjunc exon-exon junction detector and featureCounts read summarization program. Subread aligner can be used to align both gDNA-seq and RNA-seq reads. Subjunc aligner was specified designed for the detection of exon-exon junction. For the mapping of RNA-seq reads, Subread performs local alignments and Subjunc performs global alignments. Subread and Subjunc were published in the following paper: Yang Liao, Gordon K Smyth and Wei Shi. "The Subread aligner: fast, accurate and scalable read mapping by seed-and-vote", Nucleic Acids Research, 2013, 41(10):e108" Source: https://sourceforge.net/projects/subread/
  * [package_pairedbamtobed12](https://toolshed.g2.bx.psu.edu/view/brenninc/package_pairedbamtobed12): first version pairedBamToBed12 converts properly paired BAM alignments to BED12 format. pairedBamToBed12 converts properly paired BAM alignments to BED12 format. Typical proper pairs will be represented by a 2 blocks BED12 entry. Additional blocks are produced when an alignment contains long deletion (CIGAR N-op). Thickness indicates the first read of the pair. The BAM input file must be grouped/sorted by query name (not alignment position). Source: https://github.com/Population-Transcriptomics/pairedBamToBed12

* *From [aafc-mbb](https://toolshed.g2.bx.psu.edu/view/aafc-mbb):*
  * [package_kurator_0_0_1](https://toolshed.g2.bx.psu.edu/view/aafc-mbb/package_kurator_0_0_1): Kurator base repository with recent Kurator releases

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [package_python_2_7_fisher_0_1_4](https://toolshed.g2.bx.psu.edu/view/iuc/package_python_2_7_fisher_0_1_4): Contains a tool dependency definition that downloads and compiles version 0.1.4 of python fisher package Contains a tool dependency definition that downloads and compiles version 0.1.4 of python fisher package
  * [package_python_2_7_xlsxwriter_0_8_5](https://toolshed.g2.bx.psu.edu/view/iuc/package_python_2_7_xlsxwriter_0_8_5): Contains a tool dependency definition that downloads and compiles version 0.8.5 of python !XlsxWriter package Contains a tool dependency definition that downloads and compiles version 0.8.5 of python !XlsxWriter package
  * [package_python_2_7_six_1_10_0](https://toolshed.g2.bx.psu.edu/view/iuc/package_python_2_7_six_1_10_0): Contains a tool dependency definition that downloads and compiles version 1.10.0 of python six package Contains a tool dependency definition that downloads and compiles version 1.10.0 of python six package
  * [package_python_2_7_wget_3_2](https://toolshed.g2.bx.psu.edu/view/iuc/package_python_2_7_wget_3_2): Contains a tool dependency definition that downloads and compiles version 3.2 of python wget package Contains a tool dependency definition that downloads and compiles version 3.2 of python wget package

* *From [ulfschaefer](https://toolshed.g2.bx.psu.edu/view/ulfschaefer):*
  * [package_python_2_7_10_cython_0_23_1](https://toolshed.g2.bx.psu.edu/view/ulfschaefer/package_python_2_7_10_cython_0_23_1): Cython 0.23.1 for Python 2.7.10
  * [package_phephenix_1_0](https://toolshed.g2.bx.psu.edu/view/ulfschaefer/package_phephenix_1_0): PHE SNP pipeline tool dependency definition

* *From [iarc](https://toolshed.g2.bx.psu.edu/view/iarc):*
  * [package_r_mutspec_0_1](https://toolshed.g2.bx.psu.edu/view/iarc/package_r_mutspec_0_1): Contains a tool dependency definition for mutspec Contains a tool dependency definition for mutspec

* *From [wolma](https://toolshed.g2.bx.psu.edu/view/wolma):*
  * [package_python_3_4_x_lean](https://toolshed.g2.bx.psu.edu/view/wolma/package_python_3_4_x_lean): A lean build of Python 3.4.x. This package receives bug fixes within the 3.4 release series!  Currently, it contains the zlib and sqlite3 modules as the only stdlib  modules with external dependencies (handled in here by depending on  package_zlib_1_2_8 and package_sqlite_3_8_3). In particular, this build does not compile Python's ssl module (which  would cause dependency on openssl and, in turn, on Perl). This means that **the pip installation tool will not be available with this build** !! For a full build (including the ssl module) look at https://toolshed.g2.bx.psu.edu/view/iuc/package_python_3_4/  issued by the IUC.

* *From [vlefort](https://toolshed.g2.bx.psu.edu/view/vlefort):*
  * [package_phyml_3_1](https://toolshed.g2.bx.psu.edu/view/vlefort/package_phyml_3_1): Imported from capsule None PhyML 3.0: new algorithms, methods and utilities to estimate maximum-likelihood phylogenies

* *From [dereeper](https://toolshed.g2.bx.psu.edu/view/dereeper):*
  * [package_plink_1_90](https://toolshed.g2.bx.psu.edu/view/dereeper/package_plink_1_90): package_plink_1_90 package_plink_1_90
  * [package_snmf_1_2](https://toolshed.g2.bx.psu.edu/view/dereeper/package_snmf_1_2): package_snmf_1_2 package_snmf_1_2
