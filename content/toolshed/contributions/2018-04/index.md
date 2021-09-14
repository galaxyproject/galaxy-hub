---
title: April 2018 Tool Shed contributions
---

[<img class="float-right" src="/src/images/galaxy-logos/galaxy-toolshed-300.png" alt="Galaxy ToolShed" width="180">](http://toolshed.g2.bx.psu.edu/)

Tools contributed to the Galaxy Project [ToolShed](http://toolshed.g2.bx.psu.edu/) in [April 2018](/src/galaxy-updates/2018-05/index.md).

* [All monthly summaries](/src/toolshed/contributions/index.md)

## New Tools

* *From [pravs](https://toolshed.g2.bx.psu.edu/view/pravs):*
   * [peptidegenomiccoordinate](https://toolshed.g2.bx.psu.edu/view/pravs/peptidegenomiccoordinate):  Get genomic location/coordinate of peptides using mzsqlite DB and genomic mapping sqlite DB. This program loads two sqlite databases (mzsqlite and genomic mapping sqlite files) and calculates the genomic coordinates of the peptides provided as input. This outputs bed file for peptides.            Input: Peptide list file, mzsqlite sqlite DB file, and genomic mapping sqlite DB file       Output: Tabular BED file with all the columns            mzsqlite: https://toolshed.g2.bx.psu.edu/repos/galaxyp/mz_to_sqlite/mz_to_sqlite/2.0.0      genome mapping sqlite: https://toolshed.g2.bx.psu.edu/view/galaxyp/translate_bed/038ecf54cbec          P.S. : Requires sqlite.
* *From [genouest](https://toolshed.g2.bx.psu.edu/view/genouest):*
   * [askor_de](https://toolshed.g2.bx.psu.edu/view/genouest/askor_de):  AskoR links EdgeR and AskOmics. AskoR perform DE analyses from raw counts and generates AskOmics compliant files.
   * [feelnc2asko](https://toolshed.g2.bx.psu.edu/view/genouest/feelnc2asko):  Convert FeelNC GTF to GFF3. Convert FeelNC GTF to GFF3.
   * [miranda2asko](https://toolshed.g2.bx.psu.edu/view/genouest/miranda2asko):  Converts miRanda output into AskOmics format. 
* *From [mheinzl](https://toolshed.g2.bx.psu.edu/view/mheinzl):*
   * [fsd](https://toolshed.g2.bx.psu.edu/view/mheinzl/fsd):  fsd. Tool that plots a histogram of sizes of read families.
* *From [kyost](https://toolshed.g2.bx.psu.edu/view/kyost):*
   * [atac_primer_tool](https://toolshed.g2.bx.psu.edu/view/kyost/atac_primer_tool):  Tool dependencies for ATAC Primer Tool workflow. 
* *From [kyu](https://toolshed.g2.bx.psu.edu/view/kyu):*
   * [helloworld](https://toolshed.g2.bx.psu.edu/view/kyu/helloworld):  testrepository. long description.
* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
   * [meme_dreme](https://toolshed.g2.bx.psu.edu/view/iuc/meme_dreme):  DREME tool from the meme package. The MEME Suite supports motif-based analysis of DNA, RNA and protein sequences.  It provides motif  discovery algorithms using both probabilistic (MEME) and discrete models (MEME), which have complementary  strengths.  It also allows discovery of motifs with arbitrary insertions and deletions (GLAM2).  In  addition to motif discovery, the MEME Suite provides tools for scanning sequences for matches to motifs  (FIMO, MAST and GLAM2Scan), scanning for clusters of motifs (MCAST), comparing motifs to known motifs  (Tomtom), finding preferred spacings between motifs (SpaMo), predicting the biological roles of motifs  (GOMo), measuring the positional enrichment of sequences for known motifs (CentriMo), and analyzing  ChIP-seq and other large datasets (MEME-ChIP).  The MEME Suite is comprised of a collection of tools  that work together.
   * [meme_chip](https://toolshed.g2.bx.psu.edu/view/iuc/meme_chip):  Performs motif discovery, motif enrichment analysis and clustering on large nucleotide datasets. MEME-ChIP performs motif discovery, motif enrichment analysis and clustering on large nucleotide datasets.  The MEME Suite supports motif-based analysis of DNA, RNA and protein sequences.  It provides motif  discovery algorithms using both probabilistic (MEME) and discrete models (MEME), which have complementary  strengths.  It also allows discovery of motifs with arbitrary insertions and deletions (GLAM2).  In  addition to motif discovery, the MEME Suite provides tools for scanning sequences for matches to motifs  (FIMO, MAST and GLAM2Scan), scanning for clusters of motifs (MCAST), comparing motifs to known motifs  (Tomtom), finding preferred spacings between motifs (SpaMo), predicting the biological roles of motifs  (GOMo), measuring the positional enrichment of sequences for known motifs (CentriMo), and analyzing  ChIP-seq and other large datasets (MEME-ChIP).  The MEME Suite is comprised of a collection of tools  that work together.
* *From [jfb](https://toolshed.g2.bx.psu.edu/view/jfb):*
   * [promap](https://toolshed.g2.bx.psu.edu/view/jfb/promap):  for use with Open Contact. This tool is used to determine which atom-atom interactions are shared between multiple snapshots or multiple pictures of NMR or Crystalography.
* *From [yqiancolumbia](https://toolshed.g2.bx.psu.edu/view/yqiancolumbia):*
   * [ctk](https://toolshed.g2.bx.psu.edu/view/yqiancolumbia/ctk):  CLIP data analysis. 
* *From [padr](https://toolshed.g2.bx.psu.edu/view/padr):*
   * [remove_non_ascii_chars](https://toolshed.g2.bx.psu.edu/view/padr/remove_non_ascii_chars):  Remove Non-Ascii chars from text file. Remove Non-Ascii chars from text file.
* *From [nml](https://toolshed.g2.bx.psu.edu/view/nml):*
   * [pseudogenome](https://toolshed.g2.bx.psu.edu/view/nml/pseudogenome):  Create a pseudogenome from a multiple fasta file either with a JCVI linker or custom length and characters. 
* *From [dereeper](https://toolshed.g2.bx.psu.edu/view/dereeper):*
   * [sniplay3_complete_workflow](https://toolshed.g2.bx.psu.edu/view/dereeper/sniplay3_complete_workflow):  SNiPlay3 complete workflow: a package for exploration and large scale analyses of SNP polymorphisms (filtering, density, vcftools, diversity, linkagedisequilibrium, GWAS) (all SNiPlay3 components). 
   * [fastme](https://toolshed.g2.bx.psu.edu/view/dereeper/fastme):  A distance based phylogeny reconstruction algorithm. 
   * [vcftools_filter_stats_diversity](https://toolshed.g2.bx.psu.edu/view/dereeper/vcftools_filter_stats_diversity):  Subset of VCFtools fonctionalities : Filtering, Statistics, Diversity (slidingWindow). 
   * [readseq](https://toolshed.g2.bx.psu.edu/view/dereeper/readseq):  Convert various alignment formats. 
* *From [abims-sbr](https://toolshed.g2.bx.psu.edu/view/abims-sbr):*
   * [oligator](https://toolshed.g2.bx.psu.edu/view/abims-sbr/oligator):  Oligator: design PCR primers. Oligator was written by Frederic Lechauve frederic_lechauve@yahoo.fr and integrated in Galaxy by ABiMS - Station Biologique de Roscoff - Sorbonne Université / CNRS.
* *From [earlhaminst](https://toolshed.g2.bx.psu.edu/view/earlhaminst):*
   * [gblocks](https://toolshed.g2.bx.psu.edu/view/earlhaminst/gblocks):  Gblocks. Selection of conserved blocks from multiple alignments for their use in phylogenetic analysis.
* *From [galaxyp](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
   * [msi_combine](https://toolshed.g2.bx.psu.edu/view/galaxyp/msi_combine):  combines several mass-spectrometry imaging datasets. This tool can combine multiple mass-spectrometry imaging files into one large file (based on Cardinal MSI).
* *From [fabio](https://toolshed.g2.bx.psu.edu/view/fabio):*
   * [btman](https://toolshed.g2.bx.psu.edu/view/fabio/btman): 20180404. BloomTree Manager. A fast querying tool to identify all publicly available sequenced samples which express a transcript of interest.
* *From [daumsoft](https://toolshed.g2.bx.psu.edu/view/daumsoft):*
   * [htseq_count_normalized2](https://toolshed.g2.bx.psu.edu/view/daumsoft/htseq_count_normalized2):  htseq_count_normalized2. 
   * [star_icgc_alignment](https://toolshed.g2.bx.psu.edu/view/daumsoft/star_icgc_alignment):  star_icgc_alignment of daumsoft. star_icgc_alignment.
   * [tar](https://toolshed.g2.bx.psu.edu/view/daumsoft/tar):  tar for star_icgc_alignment. https://github.com/hpcdaumsoft.
   * [htseq_count_normalized](https://toolshed.g2.bx.psu.edu/view/daumsoft/htseq_count_normalized):  htseq_count_normalized. 
* *From [mvdbeek](https://toolshed.g2.bx.psu.edu/view/mvdbeek):*
   * [damidseq_polii_gene_call](https://toolshed.g2.bx.psu.edu/view/mvdbeek/damidseq_polii_gene_call):  Rscript for calculating average PolII occupancy and FDR for RNA Pol II DamID datasets. Processing DamID-seq data involves extending single-end reads, aligning the  reads to the genome and determining the coverage, similar to processing  regular ChIP-seq datasets. However, as DamID data is represented as a log2  ratio of (Dam-fusion/Dam), normalisation of the sample and Dam-only control  is necessary and adding pseudocounts to mitigate the effect of background  counts is highly recommended.
   * [damidseq_average_scores](https://toolshed.g2.bx.psu.edu/view/mvdbeek/damidseq_average_scores):  Averages the score column of bed or gff files. Averages the score column of bed or gff files.
   * [damidseq_findpeaks](https://toolshed.g2.bx.psu.edu/view/mvdbeek/damidseq_findpeaks):  A simple FDR peak caller for DamID data. A simple FDR peak caller. The script is designed for processing DamID-seq  datasets such as those generated by the damidseq_pipeline software, but will  work on any DNA binding track in bedgraph or GFF format (for example,  background-subtracted ChIP-seq data).  The output is a GFF file of all peaks with an FDR less than an assigned  value (by default, FDR < 0.01). The mean binding intensity of the peak is  represented by the score column of the GFF (column 6) and the FDR is present in  the attributes column (column 9). The peak file can be loaded into genome  browser software such as IGV for viewing, and associated genes can be called  with the included peaks2genes script.
   * [plot_correlation_matrix](https://toolshed.g2.bx.psu.edu/view/mvdbeek/plot_correlation_matrix):  Calculates and plots correlations for many datasets. Calculates and plots correlations for many datasets.
* *From [bgruening](https://toolshed.g2.bx.psu.edu/view/bgruening):*
   * [sklearn_model_validation](https://toolshed.g2.bx.psu.edu/view/bgruening/sklearn_model_validation):  Wrapper for scikit learn tool: Model Validation. Scikit-learn is an open source machine learning library written in python.  It provides different flavors of machine learning algorithms for classification,  regression, and clustering. It has designed to interoperate with python numerical  and scientific libraries Numpy and Scipy.    The official repository of Scikit-learn is at https://github.com/scikit-learn/scikit-learn.
   * [sklearn_regression_metrics](https://toolshed.g2.bx.psu.edu/view/bgruening/sklearn_regression_metrics):  Wrapper for scikit learn tool: Calculate metrics.
   * [sklearn_feature_selection](https://toolshed.g2.bx.psu.edu/view/bgruening/sklearn_feature_selection):  Wrapper for scikit learn tool: Feature Selection. 
