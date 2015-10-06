<div class='right'>TABLE_OF_CONTENTS</div>

<div class='right'><a href='http://toolshed.g2.bx.psu.edu/'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy ToolShed' width=200 /></a></div>

Tools contributed to the Galaxy Project Tool Shed in March 2016.

### New Tools

#### repository_suite_definition

* *From [bornea](https://toolshed.g2.bx.psu.edu/view/bornea):*
  * [apostl_tools](https://toolshed.g2.bx.psu.edu/view/bornea/apostl_tools): APOSTL is an interactive affinity proteomics analysis software developed to reformat affinity proteomics data (both spectral counting and MS1) for input into the SAINTexpress statistical package and to visualize the output(s). 

#### unrestricted

* *From [youngkim](https://toolshed.g2.bx.psu.edu/view/youngkim):*
  * [ezbamqc](https://toolshed.g2.bx.psu.edu/view/youngkim/ezbamqc): Quality control tool for NGS mapping files. ezBAMQC is a tool to check the quality of either one or many mapped next-generation-sequencing datasets. It conducts comprehensive evaluations of aligned sequencing data from multiple aspects including: clipping profile, mapping quality distribution, mapped read length distribution, genomic/transcriptomic mapping distribution, inner distance distribution (for paired-end reads), ribosomal RNA contamination, transcript 5\u2019 and 3\u2019 end bias, transcription dropout rate, sample correlations, sample reproducibility, sample variations. It outputs a set of tables and plots and one HTML page that contains a summary of the results. Many metrics are designed for RNA-seq data specifically, but ezBAMQC can be applied to any mapped sequencing dataset such as RNA-seq, CLIP-seq, GRO-seq, ChIP-seq, DNA-seq and so on.

* *From [alenail](https://toolshed.g2.bx.psu.edu/view/alenail):*
  * [chipsequtil](https://toolshed.g2.bx.psu.edu/view/alenail/chipsequtil): A set of utilities for ChIP-Seq analysis 

* *From [dcorreia](https://toolshed.g2.bx.psu.edu/view/dcorreia):*
  * [newick_display](https://toolshed.g2.bx.psu.edu/view/dcorreia/newick_display):  Newick display from Newick utilities 
  * [noisy](https://toolshed.g2.bx.psu.edu/view/dcorreia/noisy): Noisy Identification of problematic columns in multiple sequence alignments

* *From [bornea](https://toolshed.g2.bx.psu.edu/view/bornea):*
  * [saintexpress](https://toolshed.g2.bx.psu.edu/view/bornea/saintexpress): This runs SAINTexpress found at http://saint-apms.sourceforge.net/Main.html in galaxy.  
  * [saint_protein_interactions](https://toolshed.g2.bx.psu.edu/view/bornea/saint_protein_interactions): Uploaded This program will read in a SAINT 'list.txt' file and the interactions from the consensus path db database and return all the interactions that we saw in our experiment in a format suitable for cytoscape. This allows us to filter before getting PPIs so that it doesn't affect our SAINT score or include interactions that don't score well 
  * [apostl_static_bubblegraph_generator](https://toolshed.g2.bx.psu.edu/view/bornea/apostl_static_bubblegraph_generator): Runs the R script that generates a bubble plot. Python script simply handles arguments and interacts with Galaxy. 
  * [prohits_dotplot_generator](https://toolshed.g2.bx.psu.edu/view/bornea/prohits_dotplot_generator): Runs the dotplot program found at http://prohitstools.mshri.on.ca/. 
  * [saint_preprocessing](https://toolshed.g2.bx.psu.edu/view/bornea/saint_preprocessing): Reads in a raw Scaffold "Samples Report" output and a user generated bait file and autoformats it into prey and interaction files for SAINTexpress analysis 

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [fasta_nucleotide_color_plot](https://toolshed.g2.bx.psu.edu/view/iuc/fasta_nucleotide_color_plot): Produces a graphical representation of FASTA data with each nucleotide represented by a selected color. 


* *From [drosofff](https://toolshed.g2.bx.psu.edu/view/drosofff):*
  * [sam_to_fastq](https://toolshed.g2.bx.psu.edu/view/drosofff/sam_to_fastq):  extracts reads and their sequence quality from a SAM alignment file and returns a fastq file


* *From [bgruening](https://toolshed.g2.bx.psu.edu/view/bgruening):*
  * [protease_prediction](https://toolshed.g2.bx.psu.edu/view/bgruening/protease_prediction):  This tool can learn the cleavage specificity of a given class of proteases. This tool can learn the cleavage specificity of a given class of protease. In a second step this can be used to predict proteases given a cleavage site. The method assumes that the candidate cleavage point is between the two amino acids adjacent to the central position.


* *From [adefelicibus](https://toolshed.g2.bx.psu.edu/view/adefelicibus):*
  * [mirplant](https://toolshed.g2.bx.psu.edu/view/adefelicibus/mirplant): suite tools to mirplant2 Based on https://toolshed.g2.bx.psu.edu/view/big-tiandm/mirplant2/f5a2e8308836

* *From [chrisb](https://toolshed.g2.bx.psu.edu/view/chrisb):*
  * [gap_all_glycan_tools](https://toolshed.g2.bx.psu.edu/view/chrisb/gap_all_glycan_tools): GAP glycan tools 
  * [gap_datatypes](https://toolshed.g2.bx.psu.edu/view/chrisb/gap_datatypes): GAP datatypes Glycan Datatypes

* *From [nanettec](https://toolshed.g2.bx.psu.edu/view/nanettec):*
  * [hotspots](https://toolshed.g2.bx.psu.edu/view/nanettec/hotspots): Identify eQTL hotspots using permutation threshold and chi-squared test ### This is the sixth tool in the eQTL backend pipeline: 
    * lookup, classification, frequency, sliding window frequency, hotspots, GO enrichment
    * Link to the workflow (for import into Galaxy): http://chewbacca.bi.up.ac.za:8080/u/nanette/w/back-end-workflow-2
    * Identify the max number of eQTL expected by chance per cM using a permutation approach.
    * Eliminate differential gene density as an explanatory factor for eQTL hotspots, by performing a chi-squared test per bin.
    * Calculate the proportion of genes to eQTLs, use this as the population estimates and test the null hypothesis that the number of genes and eQTLs in each interval is consistent.
    * Mark bins where the expected number (genes + eQTLs) of every interval is not 5 or more (assumption for chi-squared test). For these bins the chi-squared test cannot be performed.
    * Extract lists of eQTLs linked to each unbiased eQTL hotspot.
    * Genome wide eQTL freqeuncy plots.
  * [go_enrichment](https://toolshed.g2.bx.psu.edu/view/nanettec/go_enrichment): GO enrichment of eQTL hotspot gene lists ### This is the last tool in the eQTL backend pipeline:
    * lookup, classification, frequency, sliding window frequency, hotspots, GO enrichment
    * Link to the workflow (for import into Galaxy): http://chewbacca.bi.up.ac.za:8080/u/nanette/w/back-end-workflow-2
    * This tool uses the topGO R package to determine the enriched GO terms, for one or more gene lists simultaneously.
  * [integrate_15](https://toolshed.g2.bx.psu.edu/view/nanettec/integrate_15): Integrates eQTL results after 15 parallel runs ### This is the last tool in the eQTL mapper workflow:
    * split_15, qtlmap_15, save_z_15, integrate_15
    * Link to the workflow (for import into Galaxy): http://chewbacca.bi.up.ac.za:8080/u/nanette/w/15-parallel
    * Concatenates eQTL result files after 15 parallel runs.
  * [split_15](https://toolshed.g2.bx.psu.edu/view/nanettec/split_15): Split e-traits into 15 inp files ### This is the first tool in the eQTL mapper workflow:
    * split_15, qtlmap_15, save_z_15, integrate_15
    * Link to the workflow (for import into Galaxy): http://chewbacca.bi.up.ac.za:8080/u/nanette/w/15-parallel
    * The input e-trait data are split into 15 .inp files (each containing the same number of e-traits).
    * This makes 15 parallel runs possible, to reduce the running time of large eQTL datasets.
  * [qtlmap_15](https://toolshed.g2.bx.psu.edu/view/nanettec/qtlmap_15): Run QTL Cartographer and parse the results ### This is the second tool in the eQTL mapper pipeline:
    * split_15, qtlmap_15, save_z_15, integrate_15
    * Link to the workflow (for import into Galaxy): http://chewbacca.bi.up.ac.za:8080/u/nanette/w/15-parallel
    * QTL Cartographer is employed for eQTL mapping. The results are parsed.
    * This tool must be executed 15 times in parallel; every time with a different .inp input file (every time the .map and parameters.txt input files are used). Each execution will produce one .txt output file.

* [save_z_15](https://toolshed.g2.bx.psu.edu/view/nanettec/save_z_15): Run QTL Cartographer and save partial z file ### This is the third tool in the eQTL mapper workflow:
* split_15, qtlmap_15, save_z_15, integrate_15
* Link to the workflow (for import into Galaxy): http://chewbacca.bi.up.ac.za:8080/u/nanette/w/15-parallel
* QTL Cartographer is employed for eQTL mapping.
* A partial z file is saved; this is an input file for the eQTL backend pipeline.  

* [frequency](https://toolshed.g2.bx.psu.edu/view/nanettec/frequency): Frequency of eQTLs and genes ### This is the third tool in the eQTL backend pipeline: 
  * lookup, classification, frequency, sliding window frequency, hotspots, GO enrichment
  * Link to the workflow (for import into Galaxy): http://chewbacca.bi.up.ac.za:8080/u/nanette/w/back-end-workflow-2
  * Calculate the number of eQTLs per bin.
  * Calculate the number of genes per bin.
     
* [lookup](https://toolshed.g2.bx.psu.edu/view/nanettec/lookup): Lookup table for cM intervals ### This is the first tool in the eQTL backend pipeline: 
  * lookup, classification, frequency, sliding window frequency, hotspots, GO enrichment
  * Link to the workflow (for import into Galaxy): http://chewbacca.bi.up.ac.za:8080/u/nanette/w/back-end-workflow-2
  * The information from the Markers file and the QTL Cartographer Z file, are combined to proportionally estimate a base pair position at each \u201cQTL Cartographer bin\u201d (e.g. 2 cM intervals).
  * The Lookup file can then serve as a lookup table to convert between base pair and centimorgan positions.

* [frequency_sliding](https://toolshed.g2.bx.psu.edu/view/nanettec/frequency_sliding): Sliding Window frequency of eQTLs and genes ### This is the fourth tool in the eQTL backend pipeline: 
  * lookup, classification, frequency, sliding window frequency, hotspots, GO enrichment
  * Link to the workflow (for import into Galaxy): http://chewbacca.bi.up.ac.za:8080/u/nanette/w/back-end-workflow-2
  * Combine x cM intervals (size of lookup bins; for example 2 cM), to be used in a sliding window approach.
  * For 2 cM lookup bins:
    * For two intervals per sliding window, intervals smaller than 2 cM are combined with its two flanking 2 cM intervals.
    * Calculate the number of eQTLs per sliding window (4 - 5.9 cM intervals).
    * Calculate the number of genes per sliding window (4 - 5.9 cM intervals).
  * For three intervals per sliding window, intervals smaller than 2 cM are combined with 3 flanking 2 cM intervals.
    * Calculate the number of eQTLs per sliding window (6 - 7.9 cM intervals).
    * Calculate the number of genes per sliding window (6 - 7.9 cM intervals).

* [classifier](https://toolshed.g2.bx.psu.edu/view/nanettec/classifier): Classify eQTLs as cis or trans ### This is the second tool in the eQTL backend pipeline: 
  * lookup, classification, frequency, sliding window frequency, hotspots, GO enrichment
  * Link to the workflow (for import into Galaxy): http://chewbacca.bi.up.ac.za:8080/u/nanette/w/back-end-workflow-2
  * Calculates the average genetic interval size across all eQTLs.
  * Classifies an eQTL as 'cis' if it maps within half the above mentioned interval size of the gene exhibiting the eQTL.
  * Classifies an eQTL as 'trans' if it maps to a different region on the genome than the location of the gene exhibiting the eQTL (further away than half the above mentioned interval size from the gene).
  * Classifies an eQTL as 'no_result' if the location of the target gene is not known. 

* *From [chrisd](https://toolshed.g2.bx.psu.edu/view/chrisd):*
  * [amrplusplus_workflow](https://toolshed.g2.bx.psu.edu/view/chrisd/amrplusplus_workflow): workflow for analyzing metagenomic sequence data. 
  * [snipfinder](https://toolshed.g2.bx.psu.edu/view/chrisd/snipfinder):  Snip caller for single and paired-end alignments. This is a snip caller for single and paired-end alignments. For each alignment (or pair of alignments), snips are recorded and represented as a single haplotype.
  * [coverage_sampler](https://toolshed.g2.bx.psu.edu/view/chrisd/coverage_sampler):  Calculates the amount of a gene that is covered from a sample of reads 

* *From [aafc-mbb](https://toolshed.g2.bx.psu.edu/view/aafc-mbb):*
  * [itsx](https://toolshed.g2.bx.psu.edu/view/aafc-mbb/itsx): ITSx -- Identifies ITS sequences and extracts the ITS region ITSx is an open source software utility to extract the highly variable ITS1 and ITS2 subregions from ITS sequences, which is commonly used as a molecular barcode for e.g. fungi. As the inclusion of parts of the neighbouring, very conserved, ribosomal genes (SSU, 5S and LSU rRNA sequences) in the sequence identification process can lead to severely misleading results, ITSx identifies and extracts only the ITS regions themselves. For more information regarding the settings of the tool, please visit the ITSx Users Guide on http://microbiology.se/publ/itsx_users_guide.
  * [quast](https://toolshed.g2.bx.psu.edu/view/aafc-mbb/quast): QUAST (Quality Assessment Tool) evaluates genome assemblies. Quast stands for Quality Assessment Tool. It evalutes genome assemblies by computing various metrics.

* *From [abretaud](https://toolshed.g2.bx.psu.edu/view/abretaud):*
  * [package_discosnp_plus_plus_2_2_4](https://toolshed.g2.bx.psu.edu/view/abretaud/package_discosnp_plus_plus_2_2_4): Package for version 2.2.4 of discosnp++

* *From [yhoogstrate](https://toolshed.g2.bx.psu.edu/view/yhoogstrate):*
  * [ega_download_streamer](https://toolshed.g2.bx.psu.edu/view/yhoogstrate/ega_download_streamer): European Genome-phenome Archive (EGA) download client Individual files or whole datasets may be downloaded from European Genome-phenome Archive (EGA) in a secure manner by first placing a download request and then downloading the file/s associated with the request. All files are automatically encrypted prior to streaming and must be decrypted using the streamer after download is complete. https://www.ebi.ac.uk/ega/about/your_EGA_account/download_streaming_client#about


* *From [galaxyp](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
  * [uniprotxml_downloader](https://toolshed.g2.bx.psu.edu/view/galaxyp/uniprotxml_downloader): Download !UniProt proteome in XML format.  The Morpheus proteomics search engine uses the uniprotxml format.


#### tool_dependency_definition

* *From [aafc-mbb](https://toolshed.g2.bx.psu.edu/view/aafc-mbb):*
  * [package_quast_3_2](https://toolshed.g2.bx.psu.edu/view/aafc-mbb/package_quast_3_2): Downloads and Installs Quast 3.2 
  * [package_hmmer_3_1b2](https://toolshed.g2.bx.psu.edu/view/aafc-mbb/package_hmmer_3_1b2): Downloads and Installs HMMER 3.1b2 

* *From [dcorreia](https://toolshed.g2.bx.psu.edu/view/dcorreia):*
  * [package_newick_utilities_1_6](https://toolshed.g2.bx.psu.edu/view/dcorreia/package_newick_utilities_1_6): Imported from capsule None Newick utilities version 1.6 (without extra) dependency package 
  * [package_noisy_1_5_12](https://toolshed.g2.bx.psu.edu/view/dcorreia/package_noisy_1_5_12): Imported from capsule None Noisy version 1.5.12 dependency package 
