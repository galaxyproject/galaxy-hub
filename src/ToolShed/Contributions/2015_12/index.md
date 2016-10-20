---
autotoc: true
---
<div(title)>>December 2015 Tool Shed Contributions</div>

<div class='right'></div>

<div class='right'><a href='http://toolshed.g2.bx.psu.edu/'><img src="/src/Images/Logos/ToolShed.jpg" alt="Galaxy ToolShed" width=200 /></a></div>

Tools contributed to the Galaxy Project Tool Shed in December 2015.

### New Tools

#### Tool Repos

* *From [rnateam](https://toolshed.g2.bx.psu.edu/view/rnateam):*
  * [metilene](https://toolshed.g2.bx.psu.edu/view/rnateam/metilene): planemo upload for repository https://github.com/bgruening/galaxytools/tree/master/tools/metilene Differential DNA methylation calling 

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [vegan_fisher_alpha](https://toolshed.g2.bx.psu.edu/view/iuc/vegan_fisher_alpha): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/vegan/vegan_fisher_alpha  Fisher.alpha via Vegan R package Gives Fisher Alpha

     http://cran.r-project.org/web/packages/vegan/index.html

* [genetrack](https://toolshed.g2.bx.psu.edu/view/iuc/genetrack): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/genetrack  Contains a tool that separately identifies peaks on the forward "+" (W) and reverse "-" (C) strand. Contains a tool that separately identifies peaks on the forward "+" (W) and reverse "-" (C) strand.  The centroid of read (tag) clusters represent a consensus nuclease stop point.  To calculate the centroid or peak, clusters of tags are smoothed via a Gaussian distribution and the nearest coordinate at the peak is recorded.  No other peak on the same strand is allowed to be called within a ± bp distance of the peak as defined by the exclusion zone. The start and end of the exclusion zone is reported in the output dataset.

* [bam_to_scidx](https://toolshed.g2.bx.psu.edu/view/iuc/bam_to_scidx): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bam_to_scidx  Contains a tool that converts a BAM file to an !ScIdx file. Converts BAM data to !ScIdx, the Strand-specific coordinate count format, which is used by tools within the Chip-exo Galaxy flavor.  !ScIdx files are 1-based.  The format consists of 5 columns: the chromosome, the position of the genomic coordinate, the number of tags on the forward strand, the number of tags on the reverse strand and the number of total tags on the position.  With pair-end reads, only the 5' end of READ1 will be used to create the !ScIdx data file.  Tools that use this format include !GeneTrack and MultiGPS.

* [vegan_diversity](https://toolshed.g2.bx.psu.edu/view/iuc/vegan_diversity): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/vegan/vegan_diversity Diversity Index via Vegan R package Gives the Diversity Index.

     http://cran.r-project.org/web/packages/vegan/index.html

* [sra_tools](https://toolshed.g2.bx.psu.edu/view/iuc/sra_tools): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/sra-tools NCBI Sequence Read Archive toolkit utilities The Galaxy tool wrappers contained in this tool shed repository rely on software developed by the NCBI Sequence Read Archive: http://www.ncbi.nlm.nih.gov/Traces/sra/sra.cgi?view=software. Use of SRA Toolkit software herin should comply with the GPL v2 or greater. Copyright (C) 2013 Matthew Shirley This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 2 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>. INSTALLATION This software release was designed to run under Linux, MacOSX operating systems on Intel x86-compatible 64 bit architectures. Build Requirements: ar bash make gcc, g++ libxml2 libcurl4 zlib On a debian based Linux OS use: apt-get install build-essential libxml2-dev libcurl4-openssl-dev zlib-dev CONTROLLED-ACCESS DATA Encrypted, controlled-access data is not supported in this version of the SRA Toolkit Galaxy tool shed.

* [vegan_rarefaction](https://toolshed.g2.bx.psu.edu/view/iuc/vegan_rarefaction): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/vegan/vegan_rarefaction  Rarefaction via Vegan R package Gives the expected species richness in random subsamples of size sample from the community. Draws rarefaction curves.

     http://cran.r-project.org/web/packages/vegan/index.html

* [meme_fimo](https://toolshed.g2.bx.psu.edu/view/iuc/meme_fimo): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/meme  FIMO tool from the meme package The MEME Suite supports motif-based analysis of DNA, RNA and protein sequences.  It provides motif discovery algorithms using both probabilistic (MEME) and discrete models (MEME), which have complementary strengths.  It also allows discovery of motifs with arbitrary insertions and deletions (GLAM2).  In addition to motif discovery, the MEME Suite provides tools for scanning sequences for matches to motifs (FIMO, MAST and GLAM2Scan), scanning for clusters of motifs (MCAST), comparing motifs to known motifs (Tomtom), finding preferred spacings between motifs (!SpaMo), predicting the biological roles of motifs (GOMo), measuring the positional enrichment of sequences for known motifs (!CentriMo), and analyzing ChIP-seq and other large datasets (MEME-ChIP).  The MEME Suite is comprised of a collection of tools that work together.

* [repmatch_gff3](https://toolshed.g2.bx.psu.edu/view/iuc/repmatch_gff3): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/repmatch_gff3  Contains a tool that matches corresponding peak-pair midpoints from separate datasets based on user-defined criteria. Contains a tool that requires 2 or more input datasets and discovers peak-pair midpoints the first dataset.It then looks up all peak-pair midpoints in a second dataset that are within a user-specified distance from the peak-pair midpoint coordinate in the first dataset.  When encountering multiple candidates to match, it looks for a user-specified resolution method so that there is at most only a one-to-one match across the two datasets.

* [meme_meme](https://toolshed.g2.bx.psu.edu/view/iuc/meme_meme): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/meme  MEME tool from the meme package The MEME Suite supports motif-based analysis of DNA, RNA and protein sequences.  It provides motif discovery algorithms using both probabilistic (MEME) and discrete models (MEME), which have complementary strengths.  It also allows discovery of motifs with arbitrary insertions and deletions (GLAM2).  In addition to motif discovery, the MEME Suite provides tools for scanning sequences for matches to motifs (FIMO, MAST and GLAM2Scan), scanning for clusters of motifs (MCAST), comparing motifs to known motifs (Tomtom), finding preferred spacings between motifs (!SpaMo), predicting the biological roles of motifs (GOMo), measuring the positional enrichment of sequences for known motifs (!CentriMo), and analyzing ChIP-seq and other large datasets (MEME-ChIP).  The MEME Suite is comprised of a collection of tools that work together.

* [cwpair2](https://toolshed.g2.bx.psu.edu/view/iuc/cwpair2): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/cwpair2 Contains a tool that takes a list of called peaks on both strands and produces a list of matched pairs and a list of unmatched orphans.  Contains a tool that takes a list of called peaks on both strands and produces a list of matched pairs and a list of unmatched orphans.  Nuclease stops (peaks) are expected to be on both strands at a fixed distance in the 5' direction from the site of crosslinking.  By pairing peaks within an empirically imposed distance, False positive peaks can be removed. It can also specify the point of crosslinking.

* *From [ulfschaefer](https://toolshed.g2.bx.psu.edu/view/ulfschscidxaefer):*
  * [phe_samtools_mpileup](https://toolshed.g2.bx.psu.edu/view/ulfschaefer/phe_samtools_mpileup): samtools mpileup and bcftools call Uses samtools v1.1 mpileup and bcftools call to make a vcf file.
  * [vcfs2fasta](https://toolshed.g2.bx.psu.edu/view/ulfschaefer/vcfs2fasta): VCF to fasta file converter Combine multiple VCFs into a single FASTA file.
  * [filter_vcf](https://toolshed.g2.bx.psu.edu/view/ulfschaefer/filter_vcf): VCF filtering tool applies a number of filters to a vcf file

* *From [gandres](https://toolshed.g2.bx.psu.edu/view/gandres):*
  * [sniplay3_complete_workflow](https://toolshed.g2.bx.psu.edu/view/gandres/sniplay3_complete_workflow): planemo upload SNiPlay3 complete workflow: a package for exploration and large scale analyses of SNP polymorphisms (filtering, density, vcftools, diversity, linkagedisequilibrium, GWAS) (all SNiPlay3 components) SNiPlay3 complete workflow: a package for exploration and large scale analyses of SNP polymorphisms (filtering, density, vcftools, diversity, linkagedisequilibrium, GWAS) (all SNiPlay3 components)

* *From [nick](https://toolshed.g2.bx.psu.edu/view/nick):*
  * [sequence_content_trimmer](https://toolshed.g2.bx.psu.edu/view/nick/sequence_content_trimmer): planemo upload commit Trim FASTA and FASTQ reads based on sequence content. 

* *From [gkumar09](https://toolshed.g2.bx.psu.edu/view/gkumar09):*
  * [trinityctatfusion](https://toolshed.g2.bx.psu.edu/view/gkumar09/trinityctatfusion): The Trinity Cancer Transcriptome Analysis Toolkit (CTAT) aims to provide tools for leveraging RNA-Seq to gain insights into the biology of cancer transcriptomes The Trinity Cancer Transcriptome Analysis Toolkit (CTAT) aims to provide tools for leveraging RNA-Seq to gain insights into the biology of cancer transcriptomes

* *From [cs76](https://toolshed.g2.bx.psu.edu/view/cs76):*
  * [isotopologue_parameter_optimization](https://toolshed.g2.bx.psu.edu/view/cs76/isotopologue_parameter_optimization): - version 0.1 Peak picking parameters optimization by using natural, stable 13C isotopic peaks to calculate a peak picking score. IPO optimizes XCMS peak picking parameters by using natural, stable 13C isotopic peaks to calculate a peak picking score. Retention time correction is optimized by minimizing relative retention time differences within peak groups. Grouping parameters are optimized by maximizing the number of peak groups that show one peak from each injection of a pooled sample. The different parameter settings are achieved by design of experiments, and the resulting scores are evaluated using response surface models. IPO was tested on three different data sets, each consisting of a training set and test set. IPO resulted in an increase of reliable groups (146% - 361%), a decrease of non-reliable groups (3% - 8%) and a decrease of the retention time deviation to one third. 

* *From [nml](https://toolshed.g2.bx.psu.edu/view/nml):*
  * [mrbayes](https://toolshed.g2.bx.psu.edu/view/nml/mrbayes):  A program for the Bayesian estimation of phylogeny. 
  * [collapse_collections](https://toolshed.g2.bx.psu.edu/view/nml/collapse_collections): planemo upload commit f3c3ccefd8615c32713e0b0e8d231ce5151b2714-dirty Collection tool that collapses a list of files into a single datasset in order of appears in collection 
  * [spolpred](https://toolshed.g2.bx.psu.edu/view/nml/spolpred):  A program for predicting the spoligotype from raw sequence reads 

* *From [r-lannes](https://toolshed.g2.bx.psu.edu/view/r-lannes):*
  * [cut_include_exclude](https://toolshed.g2.bx.psu.edu/view/r-lannes/cut_include_exclude): Simplify use of cut. Simply remove or keep selected column. based on python3. This scripts automatically generate and launch the cut command corresponding to user choice. 

#### tool_dependency_definition

* *From [ulfschaefer](https://toolshed.g2.bx.psu.edu/view/ulfschaefer):*
  * [package_python_2_7_pyvcf_0_6_8dev](https://toolshed.g2.bx.psu.edu/view/ulfschaefer/package_python_2_7_pyvcf_0_6_8dev): PyVCF 0.6.8dev for Python2.7.10 Downloads and installs commit 0eb779559e74faa14fae609c8864874ab8321c7e of PyVCF. No release of version 0.6.8 is available (yet).
  * [package_python_2_7_bintrees_2_0_2](https://toolshed.g2.bx.psu.edu/view/ulfschaefer/package_python_2_7_bintrees_2_0_2): bintrees for Python2.7.10 This Galaxy Tool shed package installs bintrees version 2.0.2 (https://pypi.python.org/pypi/PyVCF)  package for use with python 2.7.10.
  * [package_python_2_7_pyvcf_0_6_7](https://toolshed.g2.bx.psu.edu/view/ulfschaefer/package_python_2_7_pyvcf_0_6_7): pyvcf 0.6.7 for python 2.7 package package_pyvcf_0_6_7 with added python2.7 dependency
  * [package_python_2_7_biopython_1_66](https://toolshed.g2.bx.psu.edu/view/ulfschaefer/package_python_2_7_biopython_1_66): Biopython 1.66 for Python2.7.10 

