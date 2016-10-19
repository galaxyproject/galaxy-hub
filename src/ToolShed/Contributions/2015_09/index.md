---
autotoc: true
title: September 2015 Tool Shed Contributions
---


<div class='right'></div>

<div class='right'><a href='http://toolshed.g2.bx.psu.edu/'><img src="/src/Images/Logos/ToolShed.jpg" alt="Galaxy ToolShed" width=200 /></a></div>

Tools contributed to the Galaxy Project Tool Shed in September 2015.

In no particular order:

### New Tools

#### unrestricted

* *From [mandorodriguez](https://toolshed.g2.bx.psu.edu/view/mandorodriguez):*
  * [concat_fasta_files](https://toolshed.g2.bx.psu.edu/view/mandorodriguez/concat_fasta_files): Concatenates fasta files you select from your history
  * [concat_text_files](https://toolshed.g2.bx.psu.edu/view/mandorodriguez/concat_text_files): Concatenates any text based files you select from your history 
  * [fastqdump_paired](https://toolshed.g2.bx.psu.edu/view/mandorodriguez/fastqdump_paired): Downloads a set of paired reads by their accession number using fastq-dump tool from sra-toolkit. Fetches a set of forward and reverse reads via fastq-dump with the split 3 option.

* *From [megan-shortridge](https://toolshed.g2.bx.psu.edu/view/megan-shortridge):*
  * [degenerateprimerremoval_fastq](https://toolshed.g2.bx.psu.edu/view/megan-shortridge/degenerateprimerremoval_fastq): planemo upload for repository https://github.com/mshortr/degenerateprimerremoval_fastq degenerate primer removal tool 
  * [degenerateprimerremoval](https://toolshed.g2.bx.psu.edu/view/megan-shortridge/degenerateprimerremoval): planemo upload for repository https://github.com/mshortr/degenerateprimerremoval degenerate primer removal tool for Fastq 

* *From [bgruening](https://toolshed.g2.bx.psu.edu/view/bgruening):*
  * [dotknot](https://toolshed.g2.bx.psu.edu/view/bgruening/dotknot): planemo upload for repository https://github.com/bgruening/galaxytools/tree/master/tools/rna/dotknot !DotKnot is a heuristic method for pseudoknot prediction in a given RNA sequence !DotKnot extracts stem regions from the secondary structure probability dot plot calculated by RNAfold. Recursive H-type pseudoknots and intramolecular kissing hairpins are constructed and their presence in the sequence is verified. The detected pseudoknots can then be further analysed using bioinformatics or laboratory techniques.

* [pileometh](https://toolshed.g2.bx.psu.edu/view/bgruening/pileometh): planemo upload for repository https://github.com/bgruening/galaxytools/tree/master/tools/pileometh  A tool for processing bisulfite sequencing alignments PileOMeth (a temporary name derived due to it using a PILEup to extract METHylation metrics). will process a coordinate-sorted and indexed BAM or CRAM file containing some form of BS-seq alignments and extract per-base methylation metrics from them.

* [bigwig_to_bedgraph](https://toolshed.g2.bx.psu.edu/view/bgruening/bigwig_to_bedgraph): planemo upload for repository https://github.com/bgruening/galaxytools/tree/master/tools/bigwig_to_bedgraph  Convert from bigWig to bedGraph format Convert from bigWig to bedGraph format. http://hgdownload.cse.ucsc.edu/admin/exe/linux.x86_64/

* [bamhash](https://toolshed.g2.bx.psu.edu/view/bgruening/bamhash): planemo upload for repository https://github.com/bgruening/galaxytools/tree/master/tools/bamhash c Hash BAM and FASTQ files to verify data integrity For each pair of reads in a BAM or FASTQ file we compute a hash value composed of the readname, whether it is first or last in pair, sequence and quality value. All the hash values are summed up so the result is independent of the ordering within the files. The result can be compared to verify that the pair of FASTQ files contain the same read information as the aligned BAM file.

* *From [gandres](https://toolshed.g2.bx.psu.edu/view/gandres):*
  * [sniplay_workflow](https://toolshed.g2.bx.psu.edu/view/gandres/sniplay_workflow): SNiPlay3 workflow 

* *From [mytest](https://toolshed.g2.bx.psu.edu/view/mytest):*
  * [ngsap2](https://toolshed.g2.bx.psu.edu/view/mytest/ngsap2): ngsap2

* *From [mvdbeek](https://toolshed.g2.bx.psu.edu/view/mvdbeek):*
  * [concatenate_multiple_datasets](https://toolshed.g2.bx.psu.edu/view/mvdbeek/concatenate_multiple_datasets): planemo upload for repository https://github.com/ARTbio/tools-artbio/tree/master/tools/concatenate_multiple_datasets  Concatenate multiple datasets tail-to-head. Modification of the concatenate wrapper that comes with galaxy to replace the repeat section with multiple="True". Concatenate multiple datasets tail-to-head. Modification of the concatenate wrapper that comes with galaxy to replace the repeat section with multiple="True". Can reduce dataset collections to a single output file.

* *From [gkumar09](https://toolshed.g2.bx.psu.edu/view/gkumar09):*
  * [trinity_rnaseq_protocol](https://toolshed.g2.bx.psu.edu/view/gkumar09/trinity_rnaseq_protocol): De novo transcript sequence reconstruction from RNA-seq using the Trinity platform for reference generation and analysis De novo transcript sequence reconstruction from RNA-seq using the Trinity platform for reference generation and analysis

* *From [stheil](https://toolshed.g2.bx.psu.edu/view/stheil):*
  * [idba_ud_wrapper](https://toolshed.g2.bx.psu.edu/view/stheil/idba_ud_wrapper): Wrapper for the idba_ud binary. Wrapper for the idba_ud assembler only.
  * [metavelvet_wrapper](https://toolshed.g2.bx.psu.edu/view/stheil/metavelvet_wrapper): The metavelvet wrapper. 

* *From [slegras](https://toolshed.g2.bx.psu.edu/view/slegras):*
  * [sickle_1_33](https://toolshed.g2.bx.psu.edu/view/slegras/sickle_1_33): A windowed adaptive trimming tool for FASTQ files using quality 

* *From [avowinkel](https://toolshed.g2.bx.psu.edu/view/avowinkel):*
  * [gatk](https://toolshed.g2.bx.psu.edu/view/avowinkel/gatk): planemo upload for repository https://github.com/kaktus42/galaxytools/tree/master/tools/gatk  The Genome Analysis Toolkit in Version 3 The Genome Analysis Toolkit or GATK is a software package developed at the Broad Institute to analyze high-throughput sequencing data. The toolkit offers a wide variety of tools, with a primary focus on variant discovery and genotyping as well as strong emphasis on data quality assurance. Its robust architecture, powerful processing engine and high-performance computing features make it capable of taking on projects of any size. https://www.broadinstitute.org/gatk/about/
      Repository-Maintainer: Alexander Vowinkel<br />
      Repository-Development: https://github.com/kaktus42/galaxytools

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [deseq2](https://toolshed.g2.bx.psu.edu/view/iuc/deseq2): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/deseq2  Differential gene expression analysis based on the negative binomial distribution Estimate variance-mean dependence in count data from high-throughput sequencing assays and test for differential expression based on a model using the negative binomial distribution
      http://www.bioconductor.org/packages/release/bioc/html/DESeq2.html

* *From [nate](https://toolshed.g2.bx.psu.edu/view/nate):*
  * [trinity_psc](https://toolshed.g2.bx.psu.edu/view/nate/trinity_psc): Trinity for large shared memory systems at the Pittsburgh Supercomputing Center This repository provides a modified version of the Trinity wrapper from Brian Haas, as used on the Galaxy public server at usegalaxy.org. It relies on versions of Trinity and other dependencies available through the modules system on the large shared memory systems (Blacklight, Greenfield, Bridges) at the Pittsburgh Supercomputing Center. This is not designed to be a generally consumable version of the Trinity tool but may be useful as a reference.

#### tool_dependency_definition

* *From [stheil](https://toolshed.g2.bx.psu.edu/view/stheil):*
  * [package_metavelvet](https://toolshed.g2.bx.psu.edu/view/stheil/package_metavelvet): meta-velvetg assembly binary This recipe download and compile the meta-velvetg binary.

* [package_idba](https://toolshed.g2.bx.psu.edu/view/stheil/package_idba): Recipe for downloading and compiling idba. IDBA is a open source de novo assembler for next-generation short read sequences. It is fast, parallel and capable of assembling large scale genomic assembly such as human genome.

* *From [anmoljh](https://toolshed.g2.bx.psu.edu/view/anmoljh):*
  * [package_samtools_1_2](https://toolshed.g2.bx.psu.edu/view/anmoljh/package_samtools_1_2): Contains a tool dependency definition that downloads and installs version 1.2 of the SAMTools package. 
  * [package_ncurses_5_9](https://toolshed.g2.bx.psu.edu/view/anmoljh/package_ncurses_5_9): Contains a tool dependency definition that downloads and compiles libncurses 5.9.  ncurses (new curses) is a programming library that provides an API which allows the programmer to write text-based user interfaces in a terminal-independent manner http://www.gnu.org/software/ncurses/
      Modified slightly from  Repository-Maintainer: Bj\u00f6rn Gr\u00fcning Repository-Development: https://github.com/bgruening/galaxytools

* *From [slegras](https://toolshed.g2.bx.psu.edu/view/slegras):*
  * [package_sickle_1_33](https://toolshed.g2.bx.psu.edu/view/slegras/package_sickle_1_33): Contains a tool dependency definition that downloads and installs version 1.33 of Sickle. 

* *From [tiagoantao](https://toolshed.g2.bx.psu.edu/view/tiagoantao):*
  * [package_raxml_8_2_3](https://toolshed.g2.bx.psu.edu/view/tiagoantao/package_raxml_8_2_3): RAxML 8.2.3 RAxML version 8.2.3 - Phylogenetic inference
  * [package_python_3_5](https://toolshed.g2.bx.psu.edu/view/tiagoantao/package_python_3_5): Contains a tool dependency definition that downloads and compiles Python 3.5 Provides Python 3.5 inside Galaxy. This is based on the existing 3.4 definition upgraded to 3.5

* *From [takadonet](https://toolshed.g2.bx.psu.edu/view/takadonet):*
  * [package_tbl2asn_24_3](https://toolshed.g2.bx.psu.edu/view/takadonet/package_tbl2asn_24_3): Contains a tool dependency definition that downloads the binary version 23.7 of tbl2asn. tbl2asn is an automated bulk submission program 
      tbl2asn is a program that automates the submission of sequence records to !GenBank.  It uses many of the same functions as Sequin, but is driven entirely by data files, and records need no additional manual editing before submission.  Entire genomes, consisting of many chromosomes with feature annotation, can be processed in seconds using this method.<br />
      Repository-Maintainer: Philip Mabon

### Select Updates

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [package_blast_plus_2_2_26](https://toolshed.g2.bx.psu.edu/view/iuc/package_blast_plus_2_2_26): Define BLAST_ROOT_DIR env var on older BLAST+ packages
  * [package_blast_plus_2_2_27](https://toolshed.g2.bx.psu.edu/view/iuc/package_blast_plus_2_2_27): Define BLAST_ROOT_DIR env var on older BLAST+ packages
  * [ncbi_blast_plus](https://toolshed.g2.bx.psu.edu/view/devteam/ncbi_blast_plus): v0.1.05 - Update citation information now !GigaScience paper is out
  * [ncbi_blast_plus](https://toolshed.g2.bx.psu.edu/view/devteam/ncbi_blast_plus): v0.1.06, now using BLAST+ 2.2.31
  * [package_blast_plus_2_2_28](https://toolshed.g2.bx.psu.edu/view/iuc/package_blast_plus_2_2_28): Define BLAST_ROOT_DIR env var on older BLAST+ packages
  * [blast_datatypes](https://toolshed.g2.bx.psu.edu/view/devteam/blast_datatypes): v0.0.21 - Updated citation information with !GigaScience paper

* *From [peterjc](https://toolshed.g2.bx.psu.edu/view/peterjc):*
  * [effectivet3](https://toolshed.g2.bx.psu.edu/view/peterjc/effectivet3): v0.0.16, adding new model TTSS-STD-2.0.2.jar
  * [clinod](https://toolshed.g2.bx.psu.edu/view/peterjc/clinod): v0.0.9 record clinod version
  * [blast_rbh](https://toolshed.g2.bx.psu.edu/view/peterjc/blast_rbh): v0.1.7 - Updated citation & misc internal changes
  * [blast_rbh](https://toolshed.g2.bx.psu.edu/view/peterjc/blast_rbh): v0.1.8 - Using BLAST+ 2.2.31
  * [tmhmm_and_signalp](https://toolshed.g2.bx.psu.edu/view/peterjc/tmhmm_and_signalp): Suite v0.2.8, record Promoter 2 version + misc internal updates
  * [tmhmm_and_signalp](https://toolshed.g2.bx.psu.edu/view/peterjc/tmhmm_and_signalp): Suite v0.2.8, record Promoter 2 version + misc internal updates
  * [tmhmm_and_signalp](https://toolshed.g2.bx.psu.edu/view/peterjc/tmhmm_and_signalp): Suite v0.2.8, record Promoter 2 version + misc internal updates

