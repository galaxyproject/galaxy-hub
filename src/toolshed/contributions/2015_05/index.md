---
title: May 2015 Tool Shed Contributions
---


Tools contributed to the Galaxy Project Tool Shed in May 2015.

In no particular order:

#### Tools

* *From [biotechcoder](https://toolshed.g2.bx.psu.edu/view/biotechcoder):*
  * [riboseqr_wrapper](https://toolshed.g2.bx.psu.edu/view/biotechcoder/riboseqr_wrapper):  Wrapper for riboSeqR (R package) riboSeqR is an R/Bioconductor package for the analysis of sequencing data from ribosome profiling experiments. This tool is a Galaxy wrapper for riboSeqR.

* *From [lxue](https://toolshed.g2.bx.psu.edu/view/lxue):*
  * [ageseq](https://toolshed.g2.bx.psu.edu/view/lxue/ageseq): Perl code Analysis of Genome Editing by Sequencing AGEseq compares amplicon sequences with expected target sequences and finds the insertion/deletion sites in the amplicon sequences. Please refer to this document for more details.<br />http://aspendb.uga.edu/AGEseq/AGEseq_Readme.docx

* *From [mvdbeek](https://toolshed.g2.bx.psu.edu/view/mvdbeek):*
  * [mismatch_frequencies](https://toolshed.g2.bx.psu.edu/view/mvdbeek/mismatch_frequencies): planemo upload for repository https://bitbucket.org/drosofff/gedtools/ calculate mismatch frequencies for individual nucleotide mismatches Given a set of aligned reads in BAM/SAM format, calculates and plots the frequency of all possible nucleotide mismatches with respect to the reference sequence.

* *From [rnateam](https://toolshed.g2.bx.psu.edu/view/rnateam):*
  * [dorina](https://toolshed.g2.bx.psu.edu/view/rnateam/dorina):  data source for RNA interactions in post-transcriptional regulation The expression of almost all genes in animals is subject to post-transcriptional regulation by RNA binding proteins (RBPs) and microRNAs (miRNAs). The interactions between both RBPs and miRNAs with mRNA can be mapped on a whole-transcriptome level using experimental and computational techniques.<br />doRiNA is a RESTful webservice that collects data from such experiments.

* [antarna](https://toolshed.g2.bx.psu.edu/view/rnateam/antarna): planemo upload for repository https://github.com/bgruening/galaxytools/tree/master/tools/rna_tools/antarna/ commit 71414cf7f040d610afc3f02be31446efc3a82a40-dirty antaRNA uses ant colony optimization to solve the inverse folding problem in RNA research . 

* *From [proteomisc](https://toolshed.g2.bx.psu.edu/view/proteomisc):*
  * [gcms_lcms_analysis](https://toolshed.g2.bx.psu.edu/view/proteomisc/gcms_lcms_analysis):  GCMS and LCMS workflows Tools for Proteomics analysis , preprocessing , exploratory analysis and visualization for GCMS and LCMS protocols

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [vsearch](https://toolshed.g2.bx.psu.edu/view/iuc/vsearch):  VSEARCH including searching, clustering, chimera detection, dereplication, sorting, masking and shuffling of sequences. Open and free 64-bit multithreaded tool for processing metagenomic sequences, including searching, clustering, chimera detection, dereplication, sorting, masking and shuffling.<br /><br />https://github.com/torognes/vsearch

* [jbrowse](https://toolshed.g2.bx.psu.edu/view/iuc/jbrowse): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/jbrowse commit 685773d3da40afdc4d14846d4935b3b0a100f56e JBrowse static site generator JBrowse is a fast, extensible JS+HTML5 genome browser. This tools allows you to visualise GFF, BED, and other data directly in Galaxy with JBrowse
* [hmmer3](https://toolshed.g2.bx.psu.edu/view/iuc/hmmer3): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/hmmer3 commit 4164b44c651bcbdac6637eccce61b2a802c9b569 HMM based sequence alignment and database search tool HMMER is used for searching sequence databases for homologs of protein sequences, and for making protein sequence alignments. It implements methods using probabilistic models called profile hidden Markov models (profile HMMs).<br /><br />http://hmmer.janelia.org/

* [package_stringtie_1_0_3](https://toolshed.g2.bx.psu.edu/view/iuc/package_stringtie_1_0_3): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/packages/package_stringtie_1_0_3 commit 92a9d47a3807a276aa98a38d38e6f0f8caa12389 Contains a tool dependency definition that downloads and installs version 1.0.3 of the stringtie RNA-seq assembler. StringTie is a fast and highly efficient assembler of RNA-Seq alignments into potential transcripts. It uses a novel network flow algorithm as well as an optional de novo assembly step to assemble and quantitate full-length transcripts representing multiple splice variants for each gene locus. Its input can include not only the alignments of raw reads used by other transcript assemblers, but also alignments longer sequences that have been assembled from those reads.To identify differentially expressed genes between experiments, StringTie's output can be processed either by the Cuffdiff or Ballgown programs. 
* [rgrnastar](https://toolshed.g2.bx.psu.edu/view/iuc/rgrnastar): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/rgrnastar commit 13522d2ad2efbb8dab405723f491bd1a6591e3ef RNA STAR 2.4 WARNING! This will eat all your cluster node RAM and then some.<br /><br />hg19 uses about 30GB but it's really fast. See http://gettinggeneticsdone.blogspot.com.au/2012/11/star-ultrafast-universal-rna-seq-aligner.html<br /><br />You also need a new set of genome indexes. Sigh. So you have to build those yourself until I figure out how to make an index manager.<br /><br />Most of this wrapper was originally written by Jeremy Goecks, with kibbitzing and automated dependency installation by Ross Lazarus.

* *From [jeremyjliu](https://toolshed.g2.bx.psu.edu/view/jeremyjliu):*
  * [region_motif_data_manager](https://toolshed.g2.bx.psu.edu/view/jeremyjliu/region_motif_data_manager):  Installs motif databases and reference files for use with region_motif_enrichment. Companion data manager to region_motif_enrichment. Installs motif databases in tabix format and reference motifs in meme format that are provided as standard databases for region_motif_enrichment.

* *From [geert-vandeweyer](https://toolshed.g2.bx.psu.edu/view/geert-vandeweyer):*
  * [multiplicom_primer_trimming](https://toolshed.g2.bx.psu.edu/view/geert-vandeweyer/multiplicom_primer_trimming):  trim Multiplicom primer sequences from paired FastQ files Tool uses MASTR assay design files to remove primer sequences from the raw fastq files. 

* *From [insilicosolutions](https://toolshed.g2.bx.psu.edu/view/insilicosolutions):*
  * [cravat](https://toolshed.g2.bx.psu.edu/view/insilicosolutions/cravat):  Annotates mutations with CRAVAT Mutations in hg19 genomic coordinates can be annotated with CRAVAT (Cancer-Related Analysis of VAriants Toolkit). Annotations include VEST mutation pathogenicity score, COSMIC, dbSNP, allele frequencies (1000 Genomes, ESP6500, and ExAC), mappability warnings, TARGET (tumor alterations relevant for genomics-driven therapy), PubMed, and mapping to 3D-structures.

* *From [yhoogstrate](https://toolshed.g2.bx.psu.edu/view/yhoogstrate):*
  * [featurecounts](https://toolshed.g2.bx.psu.edu/view/yhoogstrate/featurecounts): planemo upload for repository https://bitbucket.org/EMCbioinf/galaxy-tool-shed-tools/raw/master/featurecounts commit cc900436bad9c6cca1f73d438c1f158d3bfc4318-dirty featureCounts counts the number of reads aligned to defined masked regions in a reference genome Count reads aligned to annotated genes in a reference genome from SAM or BAM files.
  * [flaimapper](https://toolshed.g2.bx.psu.edu/view/yhoogstrate/flaimapper): planemo upload for repository https://bitbucket.org/EMCbioinf/galaxy-tool-shed-tools/raw/master/flaimapper commit 0f4aa594becc89b07073f7fcccd889e38974e10c-dirty FlaiMapper: computational annotation of small ncRNA derived fragments using RNA-seq high throughput data<br /><br /> FlaiMapper: computational annotation of small ncRNA derived fragments using RNA-seq high throughput data

* [fuma](https://toolshed.g2.bx.psu.edu/view/yhoogstrate/fuma): planemo upload for repository https://bitbucket.org/EMCbioinf/galaxy-tool-shed-tools/raw/master/fuma commit f56125b28ec44aa28943ed040b7b202fed9c875b-dirty FuMa: match RNA-Seq detected fusion genes from several detection tools<br /> FuMa: match RNA-Seq detected fusion genes from several detection tools

* *From [devteam](https://toolshed.g2.bx.psu.edu/view/devteam):*
  * [gffread](https://toolshed.g2.bx.psu.edu/view/devteam/gffread): planemo upload commit a52cc16ed8d0d60e99742b55fccbdedcbb64b82c cufflinks gffread filters and/or converts GFF3/GTF2 records cufflinks gffread filters and/or converts GFF3/GTF2 records and can produce cdna, CDS, peptide fasta sequences
  * [data_manager_picard_index_builder](https://toolshed.g2.bx.psu.edu/view/devteam/data_manager_picard_index_builder): planemo upload commit e4c87b7392ace0d6ac5ba2d926e1dd176f987985 data_manager_picard_index_builder data_manager_picard_index_builder

* *From [drosofff](https://toolshed.g2.bx.psu.edu/view/drosofff):*
  * [msp_sr_bowtie](https://toolshed.g2.bx.psu.edu/view/drosofff/msp_sr_bowtie):  bowtie wrapper tool to align small RNA sequencing reads Bowtie wrapper tool to align small RNA sequencing reads. This tool belongs to the mississippi tool suite.
  * [msp_sr_bowtie_parser](https://toolshed.g2.bx.psu.edu/view/drosofff/msp_sr_bowtie_parser): planemo upload for repository https://bitbucket.org/drosofff/gedtools/ Generates hit count lists from bowtie sequence read alignments. Generates hit count lists from bowtie sequence read alignments.

* [msp_sr_bowtie_cascade](https://toolshed.g2.bx.psu.edu/view/drosofff/msp_sr_bowtie_cascade): planemo upload for repository https://bitbucket.org/drosofff/gedtools/ Maps iteratively small RNA sequencing datasets to reference sequences. Maps iteratively small RNA sequencing datasets to reference sequences, in order to generate annotation of these datasets.

* [yac_clipper](https://toolshed.g2.bx.psu.edu/view/drosofff/yac_clipper): planemo upload for repository https://bitbucket.org/drosofff/gedtools/ Clips 3' adapters for small RNA sequencing reads. Clips 3' adapters for small RNA sequencing reads. Supports

fasta and fastq output


* *From [rekado](https://toolshed.g2.bx.psu.edu/view/rekado):*
  * [dorina](https://toolshed.g2.bx.psu.edu/view/rekado/dorina):  initial tool definition. Definition for DoRiNA data source This tool makes it possible to send tabular results obtained from a DoRiNA search to a Galaxy instance.

#### Dependency Definitions

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [package_bowtie_2_2_5](https://toolshed.g2.bx.psu.edu/view/iuc/package_bowtie_2_2_5):  Contains a tool dependency definition that downloads and compiles version 2.2.5 of the Bowtie package Contains a tool dependency definition that downloads and compiles version 2.2.5 of the Bowtie package
  * [package_tophat_2_0_14](https://toolshed.g2.bx.psu.edu/view/iuc/package_tophat_2_0_14):  Contains a tool dependency definition that downloads and compiles version 2.0.14 of TopHat2. TopHat is a fast splice junction mapper for RNA-Seq reads. It aligns RNA-Seq reads to mammalian-sized genomes using the ultra high-throughput short read aligner Bowtie, and then analyzes the mapping results to identify splice junctions between exons.
  * [package_augustus_3_1](https://toolshed.g2.bx.psu.edu/view/iuc/package_augustus_3_1):  Contains a tool dependency definition that downloads and compiles version 3.1 of Augustus AUGUSTUS is a gene prediction program for eukaryotes written by Mario Stanke and Oliver Keller.  It can be used as an ab initio program, which means it bases its prediction purely on the sequence. AUGUSTUS may also incorporate hints on the gene structure coming from extrinsic sources such as EST, MS/MS, protein alignments and synthenic genomic alignments.<br /><br />http://bioinf.uni-greifswald.de/augustus/

* *From [geert-vandeweyer](https://toolshed.g2.bx.psu.edu/view/geert-vandeweyer):*
  * [package_twobittofa](https://toolshed.g2.bx.psu.edu/view/geert-vandeweyer/package_twobittofa):  twoBitToFa dependency 

### Select Updates

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/bgruening):*
  * [augustus](https://toolshed.g2.bx.psu.edu/view/bgruening/augustus): planemo upload for repository https://github.com/bgruening/galaxytools/tree/master/tools/augustus commit cf04d83d615ff09c4458982282d422fbef7d83ac

* *From [lparsons](https://toolshed.g2.bx.psu.edu/view/lparsons):*
  * [cutadapt](https://toolshed.g2.bx.psu.edu/view/lparsons/cutadapt): planemo upload for repository https://bitbucket.org/lance_parsons/cutadapt_galaxy_wrapper

* *From [iracooke](https://toolshed.g2.bx.psu.edu/view/iracooke):*
  * [proteomics_datatypes](https://toolshed.g2.bx.psu.edu/view/iracooke/proteomics_datatypes): planemo upload commit 4f23896d1a519a87f189c6238a95b8f5b5933e9a-dirty; Fix splib sniffer; Make splib a composite datatype

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [stringtie](https://toolshed.g2.bx.psu.edu/view/iuc/stringtie): planemo uploads for:
    * repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stringtie commit b03fd81ed11744f119608d4884c24fa182eb605a
    * https://github.com/galaxyproject/tools-iuc/tree/master/tools/stringtie commit 92a9d47a3807a276aa98a38d38e6f0f8caa12389

* *From [peterjc](https://toolshed.g2.bx.psu.edu/view/peterjc):*
  * [samtools_idxstats](https://toolshed.g2.bx.psu.edu/view/peterjc/samtools_idxstats): v0.0.4; internal changes for packaging
  * [seq_select_by_id](https://toolshed.g2.bx.psu.edu/view/peterjc/seq_select_by_id): v0.0.11; more tests and assorting minor changes
  * [seq_filter_by_id](https://toolshed.g2.bx.psu.edu/view/peterjc/seq_filter_by_id): v0.2.2; New options for IDs via text parameter, ignore paired read suffix; misc changes

* *From [devteam](https://toolshed.g2.bx.psu.edu/view/devteam):*
  * [tophat2](https://toolshed.g2.bx.psu.edu/view/devteam/tophat2): planemo upload commit a52cc16ed8d0d60e99742b55fccbdedcbb64b82c
  * [cuffdiff](https://toolshed.g2.bx.psu.edu/view/devteam/cuffdiff): planemo upload commit a52cc16ed8d0d60e99742b55fccbdedcbb64b82c
  * [data_manager_gatk_picard_index_builder](https://toolshed.g2.bx.psu.edu/view/devteam/data_manager_gatk_picard_index_builder): planemo upload commit 7d9b478cd03f31705266596fe4c168e719c672b6
  * [samtools_mpileup](https://toolshed.g2.bx.psu.edu/view/devteam/samtools_mpileup): planemo upload commit 7d9b478cd03f31705266596fe4c168e719c672b6

* *From [crs4](https://toolshed.g2.bx.psu.edu/view/crs4):*
  * [kggseq_variant_selection](https://toolshed.g2.bx.psu.edu/view/crs4/kggseq_variant_selection): Update to KggSeq release 0.8 (23/Apr./2015)

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [package_ruby_2_0](https://toolshed.g2.bx.psu.edu/view/iuc/package_ruby_2_0): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/packages/package_ruby_2_0 commit 543b8d28d5f84f5b8ac31b3aa05f68a7b4094d66-dirty
  * [package_libcurl_7_35](https://toolshed.g2.bx.psu.edu/view/iuc/package_libcurl_7_35): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/packages/package_libcurl_7_35 commit 95f2ea5e8103ac2bec5e8a67409a8139db1bbd98

