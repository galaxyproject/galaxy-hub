---
autotoc: true
---
<div class='right'></div>

<div class='right'><a href='http://toolshed.g2.bx.psu.edu/'><img src="/src/Images/Logos/ToolShed.jpg" alt="Galaxy ToolShed" width=200 /></a></div>

Tools contributed to the Galaxy Project Tool Shed in January 2016.

### New Tools

#### Tool Repos

* *From [tambeta](https://toolshed.g2.bx.psu.edu/view/tambeta):*
  * [gprofiler](https://toolshed.g2.bx.psu.edu/view/tambeta/gprofiler): g:Profiler performs statistical enrichment analysis to provide interpretation to user-provided gene lists, ordered gene lists and chromosomal regions. We study multiple sources of functional evidence, including Gene Ontology terms, biological pathways, regulatory motifs of transcription factors and microRNAs, human disease annotations and protein-protein interactions.

* *From [koen](https://toolshed.g2.bx.psu.edu/view/koen):*
  * [gbsx](https://toolshed.g2.bx.psu.edu/view/koen/gbsx): GBSX is a package to design inline barcodes for, and to demultiplex GBS and RAD experiments Genotyping by Sequencing is an emerging technology for cost effective variant discovery and genotyping. However, current analysis tools do not fulfill all experimental design and analysis needs.  GBSX is a package of tools to first aid in experimental design, including choice of enzymes and barcode design. Secondly, it provides a first analysis step to demultiplex samples using in-line barcodes, providing fastq files that can easily be plugged into existing variant analysis pipelines.

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [resize_coordinate_window](https://toolshed.g2.bx.psu.edu/view/iuc/resize_coordinate_window): Modifies the start and stop coordinates of GFF data, expanding the coordinate window by a specified size.  Contains a tool that modifies the start and stop coordinates of GFF data such that the new start and stop position is based on a specified window size that is computed either from the existing start and stop coordinates or centered on the midpoint.

* [data_manager_bowtie_index_builder](https://toolshed.g2.bx.psu.edu/view/iuc/data_manager_bowtie_index_builder): Data Manager for building bowtie indexes Bowtie is an ultrafast, memory-efficient short read aligner. It aligns short DNA sequences (reads) to the human genome at a rate of over 25 million 35-bp reads per hour. Bowtie indexes the genome with a Burrows-Wheeler index to keep its memory footprint small: typically about 2.2 GB for the human genome (2.9 GB for paired-end).

* [extract_genomic_dna](https://toolshed.g2.bx.psu.edu/view/iuc/extract_genomic_dna): Contains a tool that extracts genomic DNA using coordinates from ASSEMBLED genomes and UNassembled genomes.

* *From [bgruening](https://toolshed.g2.bx.psu.edu/view/bgruening):*
  * [deeptools_plot_correlation](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_plot_correlation): Wrapper for the deepTools: plotCorrelation. deepTools address the challenge of visualizing the large amounts of data that are now routinely generated from sequencing centers in a meaningful way. To do so, deepTools contain useful routines to process the mapped reads data through removal of duplicates and different filtering options to create coverage files in standard bedGraph and bigWig file formats. deepTools allow the creation of normalized coverage files or the comparison between two files (for example, treatment and control).  Finally, using such normalized and standardized files, multiple visualizations can be created to identify enrichments with functional annotations of the genome. For a gallery of images that can be produced and a description of the tools see http://f1000.com/posters/browse/summary/1094053 <br /><br />https://github.com/fidelram/deepTools<br /> doi: 10.1093/nar/gku365<br />Wikipage: https://github.com/fidelram/deepTools/wiki<br />Repository-Maintainer: Bjoern Gruening<br />https://github.com/fidelram/deepTools

* [deeptools_correct_gc_bias](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_correct_gc_bias): Wrapper for the deepTools: correctGCBias.
* [deeptools_compute_matrix](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_compute_matrix): Wrapper for the deepTools: computeMatrix 
* [deeptools_bigwig_compare](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_bigwig_compare): Wrapper for the deepTools: bigwigCompare
* [deeptools_plot_fingerprint](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_plot_fingerprint): Wrapper for the deepTools: plotFingerprint 
* [deeptools_plot_pca](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_plot_pca): Wrapper for the deepTools: plotPCA 
* [deeptools_bam_coverage](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_bam_coverage): Wrapper for the deepTools: bamCoverage 
* [deeptools_plot_profile](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_plot_profile): Wrapper for the deepTools: plotProfile 
* [deeptools_plot_coverage](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_plot_coverage): Wrapper for the deepTools: plotCoverage 
* [deeptools_compute_gc_bias](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_compute_gc_bias): Wrapper for the deepTools: computeGCBias 
* [deeptools_plot_heatmap](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_plot_heatmap): Wrapper for the deepTools: plotHeatmap 
* [deeptools_multi_bigwig_summary](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_multi_bigwig_summary): Wrapper for the deepTools: multiBigwigSummary 
* [deeptools_bam_compare](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_bam_compare): Wrapper for the deepTools: bamCompare 
* [deeptools_bam_pe_fragmentsize](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_bam_pe_fragmentsize): Wrapper for the deepTools: bamPEFragmentSize
* [deeptools_multi_bam_summary](https://toolshed.g2.bx.psu.edu/view/bgruening/deeptools_multi_bam_summary):  Wrapper for the deepTools: multiBamSummary

* [suite_deeptools](https://toolshed.g2.bx.psu.edu/view/bgruening/suite_deeptools): deepTools: User-friendly tools for the normalization, quality control and visualization of deep-sequencing data deepTools address the challenge of visualizing the large amounts of data that are now routinely generated from sequencing centers in a meaningful way. To do so, deepTools contain useful routines to process the mapped reads data through removal of duplicates and different filtering options to create coverage files in standard bedGraph and bigWig file formats. deepTools allow the creation of normalized coverage files or the comparison between two files (for example, treatment and control).<br />Finally, using such normalized and standardized files, multiple visualizations can be created to identify enrichments with functional annotations of the genome. For a gallery of images that can be produced and a description of the tools see http://f1000.com/posters/browse/summary/1094053 <br /><br />https://github.com/fidelram/deepTools <br /> doi: 10.1093/nar/gku365<br />Wikipage: https://github.com/fidelram/deepTools/wiki<br />Repository-Maintainer: Bjoern Gruening<br /> https://github.com/fidelram/deepTools

* [numeric_clustering](https://toolshed.g2.bx.psu.edu/view/bgruening/numeric_clustering): Clustering tool for numberic values. This clustering tool offers different clustering algorithms which are provided by scikit-learn to find similarities among samples and cluster the samples based on these similarities.

* *From [mkh](https://toolshed.g2.bx.psu.edu/view/mkh):*
  * [ips5](https://toolshed.g2.bx.psu.edu/view/mkh/ips5): !InterProScan 5

* *From [fgiacomoni](https://toolshed.g2.bx.psu.edu/view/fgiacomoni):*
  * [hmdb_ms_search](https://toolshed.g2.bx.psu.edu/view/fgiacomoni/hmdb_ms_search): Init and uploaded [W4M][LC-MS] HMDB database MS Search Package - Annotation - Returns annotation results (adducts and metabolites) from The Human Metabolome Database. Part of the W4M project: http://workflow4metabolomics.org / HMDB: http://www.hmdb.ca/. The wrapper script use the HMDB 'MS search' resource to annotate a list of m/z. The process returns outputs files (CSV and HTML formats) with links through metabocards.

* *From [drosofff](https://toolshed.g2.bx.psu.edu/view/drosofff):*
  * [blast_to_scaffold](https://toolshed.g2.bx.psu.edu/view/drosofff/blast_to_scaffold): Generate DNA scaffold from blastn or tblastx alignments of Contigs This tool start from DNA contigs that aligned to a subject DNA sequence through blastn or tblastx. The contigs must be provided in fasta format. The blastn or tblastx output must be tabular, the 12 standard column plus column 13 with the length of the blastn or tblastx subject. The sequence used to BLAST (blastn or tblastx) the contigs must be provided to serve as a guide to the final assembly The final assembly is a DNA sequence. Nucleotides of the guide sequence which were not covered by contigs are in small letters in the output assembly.

* *From [abretaud](https://toolshed.g2.bx.psu.edu/view/abretaud):*
  * [busco](https://toolshed.g2.bx.psu.edu/view/abretaud/busco): Uploaded BUSCO assess genome and annotation completeness. Assessing genome assembly and annotation completeness with Benchmarking Universal Single-Copy Orthologs

* *From [nml](https://toolshed.g2.bx.psu.edu/view/nml):*
  * [spades](https://toolshed.g2.bx.psu.edu/view/nml/spades): Genome assembler for regular and single-cell projects 

* *From [jjohnson](https://toolshed.g2.bx.psu.edu/view/jjohnson):*
  * [sqlite_to_tabular](https://toolshed.g2.bx.psu.edu/view/jjohnson/sqlite_to_tabular): Outputs tabular results of a query on a SQLite Database. In addition to the standard SQLite functions, it includes regular expression functions re.match, re.search, and re.sub<br /> http://www.sqlite.org/index.html<br /> https://docs.python.org/release/2.7/library/re.html

* [query_tabular](https://toolshed.g2.bx.psu.edu/view/jjohnson/query_tabular): Loads tabular files into a SQLite DB to perform a SQL query producing a tabular output Loads tabular files into a SQLite DB to perform a SQL query producing a tabular output.  It includes regular expression functions re.match, re.search, and re.sub. The SQLite DB may optionally be saved as an additional output.<br /> http://www.sqlite.org/index.html<br /> https://docs.python.org/release/2.7/library/re.html

* *From [galaxyp](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
  * [translate_bed_sequences](https://toolshed.g2.bx.psu.edu/view/galaxyp/translate_bed_sequences): Perform 3 frame translation of BED file augmented with a sequence column This tool takes an extended (12 column) BED input file that has been processed by the Galaxy tool "Extract Genomic DNA" to add a 13th column with the transcript sequence. It generates a peptide fasta file with the 3-frame translations of the spliced sequence defined by each entry in the input BED file. It can also generate a bed file that defines the mapping of the translations to the reference genome. The tool "Map peptides to a bed file" can use this output to map peptides iidentified from a Proteomics search back to the reference genome.

* [map_peptides_to_bed](https://toolshed.g2.bx.psu.edu/view/galaxyp/map_peptides_to_bed): Map peptides to a reference genome using a bed file the locates the proein sequence in the reference genome.  This is intended for use with the bed output of the translate_bed_sequences tool.   

#### tool_dependency_definition

* *From [abretaud](https://toolshed.g2.bx.psu.edu/view/abretaud):*
  * [package_busco_1_1b1](https://toolshed.g2.bx.psu.edu/view/abretaud/package_busco_1_1b1): Tool dependency definition that downloads and version 1.1b1 of BUSCO Assessing genome assembly and annotation completeness with Benchmarking Universal Single-Copy Orthologs

* *From [jjohnson](https://toolshed.g2.bx.psu.edu/view/jjohnson):*
  * [package_r_ada_2_0_3](https://toolshed.g2.bx.psu.edu/view/jjohnson/package_r_ada_2_0_3): Tool dependency definition that downloads and installs version 2.0.3 of the ada R package along with depenedency rpart ada performs discrete, real, and gentle boost under both exponential and logistic loss on a given data set. The package ada provides a straightforward, well-documented, and broad boosting routine for classification, ideally suited for small to moderate-sized data sets.  https://cran.r-project.org/web/packages/ada/index.html

