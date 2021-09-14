---
title: "June 2019 Tool Shed contributions"
---

[<img class="float-right" src="/src/images/galaxy-logos/galaxy-toolshed-300.png" alt="Galaxy ToolShed" width="180">](http://toolshed.g2.bx.psu.edu/)

Tools contributed to the Galaxy Project [ToolShed](http://toolshed.g2.bx.psu.edu/) in [June 2019](/src/news/2019-07-galaxy-update/index.md).

* [All monthly summaries](/src/toolshed/contributions/index.md)

## New Tools

* *From [lz_hust](https://toolshed.g2.bx.psu.edu/view/lz_hust):*
   * [gatktools](https://toolshed.g2.bx.psu.edu/view/lz_hust/gatktools):  The Genome Analysis Toolkit updated in 2019. Developed in the Data Sciences Platform at the Broad Institute, the toolkit offers a wide variety of tools with a primary focus on variant discovery and genotyping. Its powerful processing engine and high-performance computing features make it capable of taking on projects of any size.
* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
   * [dropletutils](https://toolshed.g2.bx.psu.edu/view/iuc/dropletutils):  DropletUtils - Utilities for handling droplet-based single-cell RNA-seq data. Provides a number of utility functions for handling single-cell (RNA-seq) data from droplet technologies such as 10X Genomics. This includes data loading from count matrices or molecule information files, identification of cells from empty droplets, removal of barcode-swapped pseudo-cells, and downsampling of the count matrix.
   * [compose_text_param](https://toolshed.g2.bx.psu.edu/view/iuc/compose_text_param):  Compose a text parameter value using text, integer and float values. This tool can be used in workflows to create a text parameter from multiple individual  parameters.
   * [gfa_to_fa](https://toolshed.g2.bx.psu.edu/view/iuc/gfa_to_fa):  gfa_to_fa - Converting GFA format to Fasta format. Convert GFA files to Fasta.
   * [miniasm](https://toolshed.g2.bx.psu.edu/view/iuc/miniasm):  Miniasm - Ultrafast de novo assembly for long noisy reads (though having no consensus step). Miniasm is a very fast OLC-based de novo assembler for noisy long reads. It takes all-vs-all read self-mappings (typically by minimap) as input and outputs an assembly graph in the GFA format. Different from mainstream assemblers, miniasm does not have a consensus step. It simply concatenates pieces of read sequences to generate the final unitig sequences. Thus the per-base error rate is similar to the raw input reads.
* *From [fgiacomoni](https://toolshed.g2.bx.psu.edu/view/fgiacomoni):*
   * [hr2](https://toolshed.g2.bx.psu.edu/view/fgiacomoni/hr2): Init repository for [hr2]. [W4M][LC-MS] HR2 - in silico Annotation - Finding a chemical formula from a accurate mass. Part of the F.L.A.M.E. project. The process returns outputs files (CSV and HTML formats).
* *From [chemteam](https://toolshed.g2.bx.psu.edu/view/chemteam):*
   * [ambertools_parmchk2](https://toolshed.g2.bx.psu.edu/view/chemteam/ambertools_parmchk2):  Wrapper for the AmberTools package: ParmChk2. [AmberTools](http://ambermd.org/AmberTools.php) is a set of packages than can be to create forcefields (antechamber), prepare molecules(tleap) and much more.
   * [ambertools_antechamber](https://toolshed.g2.bx.psu.edu/view/chemteam/ambertools_antechamber):  Wrapper for the AmberTools package: AnteChamber. 
   * [ambertools_acpype](https://toolshed.g2.bx.psu.edu/view/chemteam/ambertools_acpype):  Wrapper for the AmberTools package: Generate MD topologies for small molecules. 
* *From [bgruening](https://toolshed.g2.bx.psu.edu/view/bgruening):*
   * [nanopolish_polya](https://toolshed.g2.bx.psu.edu/view/bgruening/nanopolish_polya):  Nanopolish tool: Nanopolish polyA. Nanopolish can calculate an improved consensus sequence for a draft genome assembly, detect base   modifications, call SNPs and indels with respect to a reference genome and more.
* *From [ecology](https://toolshed.g2.bx.psu.edu/view/ecology):*
   * [regionalgam_gls](https://toolshed.g2.bx.psu.edu/view/ecology/regionalgam_gls):  Wrapper for regionalGAM application Model temporal trend. 
   * [regionalgam_flight_curve](https://toolshed.g2.bx.psu.edu/view/ecology/regionalgam_flight_curve):  Wrapper for regionalGAM application Flight curve. 
   * [regionalgam_autocor_acf](https://toolshed.g2.bx.psu.edu/view/ecology/regionalgam_autocor_acf):  Wrapper for regionalGAM application Autocorrelation test. 
   * [regionalgam_glmmpql](https://toolshed.g2.bx.psu.edu/view/ecology/regionalgam_glmmpql):  Wrapper for regionalGAM application Expected temporal trend. 
   * [regionalgam_gls_adjusted](https://toolshed.g2.bx.psu.edu/view/ecology/regionalgam_gls_adjusted):  Wrapper for regionalGAM application Linear regression ajusted. 
   * [regionalgam_plot_trend](https://toolshed.g2.bx.psu.edu/view/ecology/regionalgam_plot_trend):  Wrapper for regionalGAM application Plot abundance. 
   * [regionalgam_ab_index](https://toolshed.g2.bx.psu.edu/view/ecology/regionalgam_ab_index):  Wrapper for regionalGAM application Abundance index. 
* *From [artbio](https://toolshed.g2.bx.psu.edu/view/artbio):*
   * [gsc_cpm_tpm_rpk](https://toolshed.g2.bx.psu.edu/view/artbio/gsc_cpm_tpm_rpk):  Generate CPM,TPM or RPK from raw counts. Normalizes raw counts expression matrix on different parameters.  - CPM : library-size normalization  - TPM : gene length and library-size normalization  - RPK : gene length normalization  This tools derives from the non-longer supported artbio tool cpm_tpm_rpk.
   * [gsc_filter_cells](https://toolshed.g2.bx.psu.edu/view/artbio/gsc_filter_cells):  Filter single cell RNAseq data on libray depth and number of detected genes. Filter single cell RNAseq datasets on   - Absolute numbers of aligned reads or of detected genes  and / or  - relatively to percentile threshold in the datasets, for numbers of aligned reads or of detected genes.
   * [gsc_filter_genes](https://toolshed.g2.bx.psu.edu/view/artbio/gsc_filter_genes):  Filter genes that are detected in less than a fraction of libraries in single cell RNAseq data. 
   * [gsc_gene_expression_correlations](https://toolshed.g2.bx.psu.edu/view/artbio/gsc_gene_expression_correlations):  Compute single-cell paire-wise gene expressions correlations. Compute single-cell paire-wise gene expressions correlations between genes or  between genes and a signature of selected genes.
   * [gsc_mannwhitney_de](https://toolshed.g2.bx.psu.edu/view/artbio/gsc_mannwhitney_de):  Perform a mann-whitney differential testing between two sets of gene expression data. 
   * [gsc_signature_score](https://toolshed.g2.bx.psu.edu/view/artbio/gsc_signature_score):  Compute signature scores from single cell RNAseq data. Compute signature scores from single cell RNAseq data.
* *From [petr-novak](https://toolshed.g2.bx.psu.edu/view/petr-novak):*
   * [profrep](https://toolshed.g2.bx.psu.edu/view/petr-novak/profrep):  profrep. profrep.
   * [package_profrep_1_0](https://toolshed.g2.bx.psu.edu/view/petr-novak/package_profrep_1_0):  Contains a tool dependency definition that downloads and prepare databases for profrep.
   * [package_profrep_databases_1_0](https://toolshed.g2.bx.psu.edu/view/petr-novak/package_profrep_databases_1_0):  Contains a tool dependency definition that downloads and prepare databases for profrep. 

