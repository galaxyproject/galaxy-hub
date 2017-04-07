---
title: April 2015 Tool Shed Contributions
---
* [Wiki Root](/src/toolshed/index.md)
* [All monthly summaries](/src/toolshed/contributions/index.md)

### Featured Updates

* *From [lparsons](https://toolshed.g2.bx.psu.edu/view/nilesh):*
  * [rseqc](https://toolshed.g2.bx.psu.edu/view/nilesh/rseqc): Fixed bam2wig

* *From [vipints](https://toolshed.g2.bx.psu.edu/view/vipints):*
  * [fml_gff3togtf](https://toolshed.g2.bx.psu.edu/view/vipints/fml_gff3togtf): version 2.1.0

* *From [crs4](https://toolshed.g2.bx.psu.edu/view/crs4):*
  * [kggseq_variant_selection](https://toolshed.g2.bx.psu.edu/view/crs4/kggseq_variant_selection): Update to KggSeq v0.7_20150118

### Tools

* *From [arkarachai-fungtammasan](https://toolshed.g2.bx.psu.edu/view/arkarachai-fungtammasan):*
  * [str_fm](https://toolshed.g2.bx.psu.edu/view/arkarachai-fungtammasan/str_fm): Pipeline to profile and genotype microsatellites from short read data This repository contains three sets of tools: 1 create microsatellite length profile, 2 correct for sequencing errors and report genotype, 3 estimate minimum sequencing read depth.

* *From [peterjc](https://toolshed.g2.bx.psu.edu/view/peterjc):*
  * [blast_top_hit_species](https://toolshed.g2.bx.psu.edu/view/peterjc/blast_top_hit_species): v0.0.1 Workflow to count species of top nr BLASTX hits of a transcriptome This is a non-trivial example workflow using the NCBI BLAST+ wrappers, intended only for crude crude contamination assessment of a transcriptome assembly. This would ideally include a visualisation of the finally tally table as a Pie Chart, currently not possible with the Galaxy Visualization Framework.

* *From [devteam](https://toolshed.g2.bx.psu.edu/view/devteam):*
  * [samtools_stats](https://toolshed.g2.bx.psu.edu/view/devteam/samtools_stats): Generate statistics for a BAM or SAM file This tool runs the samtools stats command in the SAMtools toolkit, collecting statistics from BAM files. The output can be visualized using plot-bamstats.
  * [samtools_reheader](https://toolshed.g2.bx.psu.edu/view/devteam/samtools_reheader): Replace SAM header. Add or replace the header in a SAM or BAM file with a new header.
  * [samtools_calmd](https://toolshed.g2.bx.psu.edu/view/devteam/samtools_calmd): recalculate MD/NM tags Generates the MD tag using ``samtools calmd`` command.
  * [data_manager_bowtie2_index_builder](https://toolshed.g2.bx.psu.edu/view/devteam/data_manager_bowtie2_index_builder): Data Manager for building bowtie2 indexes Data Manager for building bowtie2 indexes
  * [samtools_sort](https://toolshed.g2.bx.psu.edu/view/devteam/samtools_sort): Sort alignments by leftmost coordinates or read name. This tool uses the SAMtools toolkit to sort alignments by leftmost coordinates or read names.
    * Repository-Maintainer: [Bj&ouml;rn Gr&uuml;ning](/src/people/bjoern-gruening/index.md)
    * Repository-Development: https://github.com/bgruening/galaxytools
  * [samtools_idxstats](https://toolshed.g2.bx.psu.edu/view/devteam/samtools_idxstats): BAM mapping statistics (using samtools idxstats) Runs "samtools idxstats" to get mapping statistics from a sorted index BAM file as a tabular output file.
  * [samtools_split](https://toolshed.g2.bx.psu.edu/view/devteam/samtools_split):  Split a BAM file by read group This tool runs the samtools split command in the SAMtools toolkit to split BAM files by read group.
  * [cd_hit_dup](https://toolshed.g2.bx.psu.edu/view/devteam/cd_hit_dup): simple tool for removing duplicates from sequencing reads  cd-hit-dup is a simple tool for removing duplicates from sequencing reads, with optional step to detect and remove chimeric reads. A number of options are provided to tune how the duplicates are removed.

* *From [yutaka-saito](https://toolshed.g2.bx.psu.edu/view/yutaka-saito):*
  * [bisulfighter](https://toolshed.g2.bx.psu.edu/view/yutaka-saito/bisulfighter): A pipeline for accurate detection of methylated cytosines and differentially methylated regions A pipeline for accurate detection of methylated cytosines and differentially methylated regions

* *From [mir-bioinf](https://toolshed.g2.bx.psu.edu/view/mir-bioinf):*
  * [multi_join_left](https://toolshed.g2.bx.psu.edu/view/mir-bioinf/multi_join_left): Joins multiple files serially Use this tool to join multiple tab-delimited files serially on one column; performs a left-join starting with the first file specified (first specified file is printed in full, then only matching lines are printed from each subsequent file).
  * [heatmap_colormanipulation](https://toolshed.g2.bx.psu.edu/view/mir-bioinf/heatmap_colormanipulation): Initial upload Generates heatmap with nonlinear color mapping options Uses R's heatmap.2 function and gplots package. Good for visualization of disparate data.
  * [fix_excel_date_symbols](https://toolshed.g2.bx.psu.edu/view/mir-bioinf/fix_excel_date_symbols): Initial upload Can recover human or mouse gene symbols from dates (usually caused by Excel) When Excel sees a gene symbol like SEPT9, it thinks to itself 'must be a date' and automatically converts it to the date 9-Sep (permanent conversion). As an 'after-the-fact' remedy, this tool converts dates like 9-Sept, 3-March, etc, in the chosen column(s) back to the gene symbols SEPT9 and MARCH3, etc. (respectively).
  * [column_range_string_generator](https://toolshed.g2.bx.psu.edu/view/mir-bioinf/column_range_string_generator): Initial upload Generates column string for input to Cut Columns tool Use this tool to generate a string that can be copied to the buffer then pasted into the Cut Column tool to save time (rather than needing to individually type out C1,C2,C3..... etc.).

* *From [galaxyp](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
  * [unipept](https://toolshed.g2.bx.psu.edu/view/galaxyp/unipept): Unipept retrieves taxonomy for tryptic peptides Unipept metaproteomics analysis. Unipept retrieves taxonomy for tryptic peptides using the unipept API.

### Suites

* *From [arkarachai-fungtammasan](https://toolshed.g2.bx.psu.edu/view/arkarachai-fungtammasan):*
  * [suite_microsatellite_ngs_1_0](https://toolshed.g2.bx.psu.edu/view/arkarachai-fungtammasan/suite_microsatellite_ngs_1_0): all dependency for microsattelite\_ngs package and microsattelite_ngs itself
  * [suite_str_fm_1_0](https://toolshed.g2.bx.psu.edu/view/arkarachai-fungtammasan/suite_str_fm_1_0): all dependency for str\_fm package and str\_fm itself

* *From [devteam](https://toolshed.g2.bx.psu.edu/view/devteam):*
  * [suite_samtools_1_2](https://toolshed.g2.bx.psu.edu/view/devteam/suite_samtools_1_2): A suite of Galaxy utilities associated with version 1.2 of the SAMtools package. SAM (Sequence Alignment/Map) format is a generic format for storing large nucleotide sequence alignments. This repository suite associates selected repositories containing Galaxy utilities that require version 1.2 of the SAMTools package. These associated Galaxy utilities consist of a Galaxy Data Manager contained in the repository named data\_manager\_sam\_fasta\_index\_builder and Galaxy tools contained in several separate repositories.

### Dependency Definitions

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [package_cutadapt_1_8](https://toolshed.g2.bx.psu.edu/view/iuc/package_cutadapt_1_8): Contains a tool dependency definition that downloads and compiles version 1.8 of cutadapt Cutadapt finds and removes adapter sequences, primers, poly-A tails and other types of unwanted sequence from your high-throughput sequencing reads.
  * [package_cd_hit_auxtools_0_5_2012_03_07_fix_dan](https://toolshed.g2.bx.psu.edu/view/iuc/package_cd_hit_auxtools_0_5_2012-03-07_fix_dan): Builds and installs cd-hit-auxtools including cd-hit-dup, cd-hit-lap, and read-linker.
  * [package_nwalign_0_3_1](https://toolshed.g2.bx.psu.edu/view/iuc/package_nwalign_0_3_1): Contains a tool dependency definition for version 0.3.1 of the python nwalign package nwalign is an implementation of Needleman-Wunsch global sequence alignment. nwalign is a resource efficient alternative to scikit alignment.global\_pairwise\_align\_nucleotide and BioPython pairwise2
