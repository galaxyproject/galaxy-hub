---
autotoc: true
title: August 2015 Tool Shed Contributions
---


<div class='right'></div>

<div class='right'><a href='http://toolshed.g2.bx.psu.edu/'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy ToolShed' width=200 /></a></div>
Tools contributed to the Galaxy Project Tool Shed in August 2015.

In no particular order:

### New Tools

#### unrestricted

* *From [rnateam](https://toolshed.g2.bx.psu.edu/view/rnateam):*
  * [sortmerna](https://toolshed.g2.bx.psu.edu/view/rnateam/sortmerna): (Planemo upload) for repository https://github.com/bgruening/galaxytools/tree/master/tools/rna_tools/sortmerna commit 04cfb5475292e4fd1f7c0ca86d8d0d5e5f886c3d-dirty. SortMeRNA is a software designed to rapidly filter ribosomal RNA fragments from metatransriptomic data produced by next-generation sequencers. SortMeRNA_ is a software designed to rapidly filter ribosomal RNA fragments from metatransriptomic data produced by next-generation sequencers. It is capable of handling large RNA databases and sorting out all fragments matching to the database with high accuracy and specificity. http://bioinfo.lifl.fr/RNA/sortmerna/
  * [mea](https://toolshed.g2.bx.psu.edu/view/rnateam/mea): (Planemo upload) commit 6f0b360c2f718f0d3bd436db0f89af3805d7c332-dirty. Maximum expected accuracy prediction 

* *From [saskia-hiltemann](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann):*
  * [virtual_normal_analysis](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann/virtual_normal_analysis): Compare variants to a large set of normal genomes Compare variants to a large set of normal genomes from healthy, unrelated individuals
  * [igv_screenshot](https://toolshed.g2.bx.psu.edu/view/saskia-hiltemann/igv_screenshot) Create an IGV screenshot. Given the build, tracks, region, and viewing preferences, creates an IGV screenshot and outputs it as a png image. 


* *From [anmoljh](https://toolshed.g2.bx.psu.edu/view/anmoljh):*
  * [align_and_estimate_abundance](https://toolshed.g2.bx.psu.edu/view/anmoljh/align_and_estimate_abundance) align_and_estimate_abundance.pl utility from trinitynraseq package  
  * [insilico_read_normalization](https://toolshed.g2.bx.psu.edu/view/anmoljh/insilico_read_normalization) insilico read normalization step before transcriptome assembly 
  * [trinityrnaseq](https://toolshed.g2.bx.psu.edu/view/anmoljh/trinityrnaseq) De novo assembly of RNA-Seq data Using Trinity version (r20140717) 

* *From [reditama](https://toolshed.g2.bx.psu.edu/view/reditama):*
  * [smart_rda](https://toolshed.g2.bx.psu.edu/view/reditama/smart_rda) Workflow for  RNA-Seq differential expression analysis 

* *From [lecorguille](https://toolshed.g2.bx.psu.edu/view/lecorguille):*
  * [xcms_group](https://toolshed.g2.bx.psu.edu/view/lecorguille/xcms_group) [W4M][GC-MS] XCMS R Package - Preprocessing - Group peaks from different samples together Part of the W4M project: http://workflow4metabolomics.org <br />
      XCMS: http://www.bioconductor.org/packages/release/bioc/html/xcms.html <br />
      Group peaks together across samples using overlapping m/z bins and calculation of smoothed peak distributions in chromatographic time.<br />
      BEWARE: this tool don't come with its script. You will need to install the dedicated package_xcms_w4m_script too
  * [rdata_datatype](https://toolshed.g2.bx.psu.edu/view/lecorguille/rdata_datatype): (Planemo upload) R RData datatype 
  * [xcms_fillpeaks](https://toolshed.g2.bx.psu.edu/view/lecorguille/xcms_fillpeaks): (Planemo upload) [W4M][GC-MS] XCMS R Package - Preprocessing - Integrate areas of missing peaks Part of the W4M project: http://workflow4metabolomics.org <br />
      XCMS: http://www.bioconductor.org/packages/release/bioc/html/xcms.html <br />
      For each sample, identify peak groups where that sample is not represented. For each of those peak groups, integrate the signal in the region of that peak group and create a new peak.<br />
      BEWARE: this tool don't come with its script. You will need to install the dedicated package_xcms_w4m_script too
  * [rdata_camera_datatypes](https://toolshed.g2.bx.psu.edu/view/lecorguille/rdata_camera_datatypes): (Planemo upload) [W4M][GC-MS] CAMERA R Package - Preprocessing - RData datatype Part of the W4M project: http://workflow4metabolomics.org <br />
      Datatypes to ease the usability of W4M CAMEARA tools
  * [camera_annotate](https://toolshed.g2.bx.psu.edu/view/lecorguille/camera_annotate): (Planemo upload) [W4M][GC-MS] CAMERA R Package - Annotation - Returns annotation results (isotope peaks, adducts and fragments) Part of the W4M project: http://workflow4metabolomics.org <br />
      CAMERA: http://bioconductor.org/packages/release/bioc/html/CAMERA.html <br />
      Wrapper skript for automatic annotation of isotope peaks, adducts and fragments for a (grouped) xcmsSet xs. The function returns an xsAnnotate object.<br />
      BEWARE: this tool don't come with its script. You will need to install the dedicated package_camara_w4m_script too
  * [rdata_xcms_datatypes](https://toolshed.g2.bx.psu.edu/view/lecorguille/rdata_xcms_datatypes): (Planemo upload) [W4M][GC-MS] XCMS R Package - Preprocessing - RData datatype Part of the W4M project: http://workflow4metabolomics.org <br />
      Datatypes to ease the usability of W4M xcms tools
  * [xcms_retcor](https://toolshed.g2.bx.psu.edu/view/lecorguille/xcms_retcor): (Planemo upload) [W4M][GC-MS] XCMS R Package - Preprocessing - Correct retention time from different samples Part of the W4M project: http://workflow4metabolomics.org <br />
      XCMS: http://www.bioconductor.org/packages/release/bioc/html/xcms.html <br />
      Retention Time Correction using retcor function from xcms R package<br />
      BEWARE: this tool don't come with its script. You will need to install the dedicated package_xcms_w4m_script too
  * [xcms_xcmsset](https://toolshed.g2.bx.psu.edu/view/lecorguille/xcms_xcmsset): (Planemo upload) [W4M][GC-MS] XCMS R Package - Preprocessing - peaks calling in NetCDF/mzXML files Part of the W4M project: http://workflow4metabolomics.org <br />
      XCMS: http://www.bioconductor.org/packages/release/bioc/html/xcms.html <br />
      Filtration and Peak Identification using xcmsSet function from xcms R package to preprocess LC/MS data for relative quantification and statistical analysis<br />
      BEWARE: this tool don't come with its script. You will need to install the dedicated package_xcms_w4m_script too

* *From [mmonsoor](https://toolshed.g2.bx.psu.edu/view/mmonsoor):*
  * [camera_combinexsannos](https://toolshed.g2.bx.psu.edu/view/mmonsoor/camera_combinexsannos): (Planemo upload) [W4M][GC-MS] CAMERA R Package - Annotation - combinexsAnnos Check CAMERA ion species annotation due to matching with opposite ion mode Part of the W4M project: http://workflow4metabolomics.org <br />
      CAMERA: http://bioconductor.org/packages/release/bioc/html/CAMERA.html <br />
      This function check annotations of ion species with the help of a sample from opposite ion mode. As first step it searches for pseudospectra from the positive and the negative sample within a retention time window. For every result the m/z differences between both samples are matched against specific rules, which are combinations from pos. and neg. ion species. As example M+H and M-H with a m/z difference of 2.014552. If two ions matches such a difference, the ion annotations are changed (previous annotation is wrong), confirmed or added. Returns the peaklist from one ion mode with recalculated annotations.<br />
      BEWARE: this tool don't come with its script. You will need to install the dedicated package_camara_w4m_script too

* *From [yhoogstrate](https://toolshed.g2.bx.psu.edu/view/yhoogstrate):*
  * [crossmap](https://toolshed.g2.bx.psu.edu/view/yhoogstrate/crossmap): (Planemo upload) for repository https://github.com/ErasmusMC-Bioinformatics/crossmap_galaxy_wrapper commit d4e9fe61901a612c78d9f26f172537b27fd2ddbb !CrossMap: Convert genome coordinates or annotation files between genome assemblies
      !CrossMap is versatile tool to convert genome coordinates or annotation files between genome assemblies. It supports mostly commonly used file types, including BAM, BED, !BigWig, GFF, GTF, SAM, Wiggle, and VCF formats. For large plain text file types, such as BED, GFF, GTF and VCF, reading from remote servers and file compression are supported.<br />
      http://crossmap.sourceforge.net/

* [segmentation_fold](https://toolshed.g2.bx.psu.edu/view/yhoogstrate/segmentation_fold): (Planemo upload) for repository https://github.com/ErasmusMC-Bioinformatics/segmentation_fold_galaxy_wrapper commit b37cb65736e2a6e76b94a9fa12a5887046437e36 RNA-Folding including predefined segments including K-turns Segmentation-fold is a bioinformatics application that predicts RNA 2D-structure with an extended version of the Zuker algorithm. This modification contains a new "structure element" named a segment and is capable of folding a pre-defined substructure with multiple canonical or non-canonical pairings.<br />
    This allows folding of more complex structures like the K-turns, which are also part of the implemented free energy tables. These thermodynamic parameters (free Gibbs energy levels) have been estimated using a computational approach and therefore lack accuracy.


* *From [devteam](https://toolshed.g2.bx.psu.edu/view/devteam):*
  * [kraken2tax](https://toolshed.g2.bx.psu.edu/view/devteam/kraken2tax): (Planemo upload) for repository https://github.com/galaxyproject/tools-devteam/blob/master/tool_collections/taxonomy/kraken2tax/ commit f176c58ce66d9db715151061ea43912f0659afc0 Convert Kraken output to Galaxy taxonomy data. Kraken is a system for assigning taxonomic labels to short DNA sequences, usually obtained through metagenomic studies. This tool will convert the output of Kraken to the format used by other Galaxy taxonomic tools

* *From [damion](https://toolshed.g2.bx.psu.edu/view/damion):*
  * [versioned_data](https://toolshed.g2.bx.psu.edu/view/damion/versioned_data) first version This tool enables retrieval of FASTA format databases (by date or version id) that can be set up in a number of archive formats.  As well one can trigger workflows like makeblastdb to generate BLAST databases.  Results can be cached for reuse by other users who make the same requests.  This tool can be used on a server both via the command line and via the Galaxy bioinformatics workflow platform using the "Versioned Data" tool. Different kinds of content are suited to different archiving technologies, so the system provides a few storage system choices.  Results are cached so that subsequent requests for the same versioned database or derived data (like a BLAST database) are immediately satisfied.

* *From [tgac](https://toolshed.g2.bx.psu.edu/view/tgac):*
  * [hcluster_sg](https://toolshed.g2.bx.psu.edu/view/tgac/hcluster_sg): (Planemo upload) for repository https://github.com/TGAC/tgac-galaxytools/tree/master/tools/hcluster_sg commit 6ecf622ddfb33c9553673978787f0ecad8cf8c49 Hierarchically clustering on a sparse graph hcluster_sg is a tool for hierarchically clustering on a sparse graph.<br />
      https://github.com/douglasgscofield/hcluster


* *From [jcl](https://toolshed.g2.bx.psu.edu/view/jcl):*
  * [jclgrr](https://toolshed.g2.bx.psu.edu/view/jcl/jclgrr) An effort to run grr An effort to run GRR

* *From [deleury](https://toolshed.g2.bx.psu.edu/view/deleury):*
  * [wcr](https://toolshed.g2.bx.psu.edu/view/deleury/wcr) WCR experiment WCR experiment

#### tool_dependency_definition

* *From [anmoljh](https://toolshed.g2.bx.psu.edu/view/anmoljh):*
  * [package_trinityrnaseq_r20140717](https://toolshed.g2.bx.psu.edu/view/anmoljh/package_trinityrnaseq_r20140717) Contains a tool dependency definition that downloads and compiles version r20140717 of trinity 

* *From [cmonjeau](https://toolshed.g2.bx.psu.edu/view/cmonjeau):*
  * [package_stacks_1_18](https://toolshed.g2.bx.psu.edu/view/cmonjeau/package_stacks_1_18): Imported from capsule None Contains a tool dependency definition that downloads and compiles version 1.18 of Stacks Stacks is a software pipeline for building loci from short-read sequences, such as those generated on the Illumina platform. Stacks was developed to work with restriction enzyme-based data, such as RAD-seq, for the purpose of building genetic maps and conducting population genomics and phylogeography. 

* *From [lecorguille](https://toolshed.g2.bx.psu.edu/view/lecorguille):*
  * [package_netcdf_4_3_3_1](https://toolshed.g2.bx.psu.edu/view/lecorguille/package_netcdf_4_3_3_1) Contains a tool dependency definition that downloads and compiles version 4.3.3.1 of netcdf.  NetCDF (network Common Data Form) is a set of software libraries and machine-independent data formats that support the creation, access, and sharing of array-oriented scientific data. http://www.unidata.ucar.edu/downloads/netcdf/index.jsp <br />
      Repository-Maintainer: Bj\u00f6rn Gr\u00fcning Repository-Development: https://github.com/bgruening/galaxytools <br />
      Update of iuc package_netcdf_4_3 to 4.3.3.1 and addition of bin/ in the PATH


### Select Updates

#### Unknown

* *From [iracooke](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
  * [peptideshaker](https://toolshed.g2.bx.psu.edu/view/galaxyp/peptideshaker): (Planemo upload) for repository https://github.com/galaxyproteomics/tools-galaxyp/tree/master/tools/peptideshaker commit 5ca27ef280bee8b65fd3d0d2cd5ff280a2cebb3d
  * [peptideshaker](https://toolshed.g2.bx.psu.edu/view/galaxyp/peptideshaker): (Planemo upload) for repository https://github.com/galaxyproteomics/tools-galaxyp/tree/master/tools/peptideshaker commit 464dc333f2e8d359265e1574b01386c4e7e9d840

#### unrestricted

* *From [bgruening](https://toolshed.g2.bx.psu.edu/view/bgruening):*
  * [split_file_on_column](https://toolshed.g2.bx.psu.edu/view/bgruening/split_file_on_column): (Planemo upload) for repository https://github.com/bgruening/galaxytools/tree/master/tools/text_processing/split_file_on_column commit 36d05738e78c68091b45779624734e6a47829856-dirty

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [stringtie](https://toolshed.g2.bx.psu.edu/view/iuc/stringtie): (Planemo upload) for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stringtie commit ba7b53894c61fea9a93550f865e9ed2753a904cf
  * [stringtie](https://toolshed.g2.bx.psu.edu/view/iuc/stringtie): (Planemo upload) for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stringtie commit ba7b53894c61fea9a93550f865e9ed2753a904cf
  * [stringtie](https://toolshed.g2.bx.psu.edu/view/iuc/stringtie): (Planemo upload) for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stringtie commit ba7b53894c61fea9a93550f865e9ed2753a904cf

* *From [peterjc](https://toolshed.g2.bx.psu.edu/view/peterjc):*
  * [mira_assembler](https://toolshed.g2.bx.psu.edu/view/peterjc/mira_assembler): v0.0.11 move dependency to package_mira_3_4_1_1 etc
  * [get_orfs_or_cdss](https://toolshed.g2.bx.psu.edu/view/peterjc/get_orfs_or_cdss): v0.1.1 fix typo; v0.1.0 BED output (Eric Rasche), NCBI genetic code 24; v0.0.7 embeds citation
  * [effectivet3](https://toolshed.g2.bx.psu.edu/view/peterjc/effectivet3): v0.0.15 internal changes; v0.0.14 fixed error handling
  * [sample_seqs](https://toolshed.g2.bx.psu.edu/view/peterjc/sample_seqs): v0.2.2 use format_source and other internal changes
  * [nlstradamus](https://toolshed.g2.bx.psu.edu/view/peterjc/nlstradamus): v0.0.10 internal changes; v0.0.9 citation
  * [align_back_trans](https://toolshed.g2.bx.psu.edu/view/peterjc/align_back_trans): v0.0.6 use format_source; v0.0.5 more explicit error msg, citation info
  * [clinod](https://toolshed.g2.bx.psu.edu/view/peterjc/clinod): v0.0.8 internal changes
  * [predictnls](https://toolshed.g2.bx.psu.edu/view/peterjc/predictnls): v0.0.8 internal changes
  * [fastq_paired_unpaired](https://toolshed.g2.bx.psu.edu/view/peterjc/fastq_paired_unpaired): v0.0.6 use format_source; v0.0.5 error handling & citation
  * [fastq_paired_unpaired](https://toolshed.g2.bx.psu.edu/view/peterjc/fastq_paired_unpaired): v0.1.2 belatedly declare Biopython dependency

* *From [devteam](https://toolshed.g2.bx.psu.edu/view/devteam):*
  * [data_manager_bwa_index_builder](https://toolshed.g2.bx.psu.edu/view/devteam/data_manager_bwa_index_builder): (Planemo upload) commit 2b9ef766ea9ee24964464363a9d41faeefa3d360-dirty
  * [samtool_filter2](https://toolshed.g2.bx.psu.edu/view/devteam/samtool_filter2): (Planemo upload) commit 4381f4022eca6f3c58ae1d01096795cd28c15062
  * [weblogo3](https://toolshed.g2.bx.psu.edu/view/devteam/weblogo3): (Planemo upload) commit 4381f4022eca6f3c58ae1d01096795cd28c15062
  * [data_manager_fetch_genome_all_fasta](https://toolshed.g2.bx.psu.edu/view/devteam/data_manager_fetch_genome_all_fasta): (Planemo upload) commit 5ad726dc73203a704666033cd3bf70b82575978f
  * [data_manager_sam_fasta_index_builder](https://toolshed.g2.bx.psu.edu/view/devteam/data_manager_sam_fasta_index_builder): (Planemo upload) commit 5ad726dc73203a704666033cd3bf70b82575978f
  * [bowtie2](https://toolshed.g2.bx.psu.edu/view/devteam/bowtie2): (Planemo upload) commit 5ad726dc73203a704666033cd3bf70b82575978f

* *From [lparsons](https://toolshed.g2.bx.psu.edu/view/lparsons):*
  * [htseq_count](https://toolshed.g2.bx.psu.edu/view/lparsons/htseq_count): (Planemo upload) for repository https://github.com/lparsons/galaxy_tools/tree/master/tools/htseq_count commit 23de2bdafad4d386cfe88724c0e6f93a70fdb84e

#### tool_dependency_definition

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [package_ruby_2_1](https://toolshed.g2.bx.psu.edu/view/iuc/package_ruby_2_1): (Planemo upload) for repository https://github.com/galaxyproject/tools-iuc/tree/master/packages/package_ruby_2_1 commit beb40fb1d5861b529d96fa228b2129e3d4a524b7
  * [package_ruby_2_0](https://toolshed.g2.bx.psu.edu/view/iuc/package_ruby_2_0): (Planemo upload) for repository https://github.com/galaxyproject/tools-iuc/tree/master/packages/package_ruby_2_0 commit beb40fb1d5861b529d96fa228b2129e3d4a524b7
  * [package_bzlib_1_0](https://toolshed.g2.bx.psu.edu/view/iuc/package_bzlib_1_0): (Planemo upload) for repository https://github.com/galaxyproject/tools-iuc/tree/master/packages/package_bzlib_1_0 commit ba7b53894c61fea9a93550f865e9ed2753a904cf
  * [package_libcurl_7_35](https://toolshed.g2.bx.psu.edu/view/iuc/package_libcurl_7_35): (Planemo upload) for repository https://github.com/galaxyproject/tools-iuc/tree/master/packages/package_libcurl_7_35 commit beb40fb1d5861b529d96fa228b2129e3d4a524b7
