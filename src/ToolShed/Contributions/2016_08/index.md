---
autotoc: true
---
<div class='right'></div>

<div class='right'><a href='http://toolshed.g2.bx.psu.edu/'><img src="/src/Images/Logos/ToolShed.jpg" alt="Galaxy ToolShed" width=200 /></a></div>

Tools contributed to the Galaxy Project Tool Shed in [August 2016](/src/GalaxyUpdates/2016_09/index.md).

### New Tools

#### unrestricted

* *From [melpetera](https://toolshed.g2.bx.psu.edu/view/melpetera):*
  * [batchcorrection](https://toolshed.g2.bx.psu.edu/view/melpetera/batchcorrection): [W4M][Metabolomics][LC-MS] Correction of data intensities for signal drift and batch-effects. Instrumental drift and offset differences between batches have been described in LC-MS experiments when the number of samples is large and/or multiple batches of acquisition are needed. Recently a normalization strategy relying on the measurements of a "pooled" (or QC) sample injected periodically has been described: for each variable, a regression model is fitted to the values of the "pool" and subsequently used to adjust the intensities of the samples of interest (van der Kloet et al, 2009; Dunn et al, 2011). The current repository contains two modules: "Determine batch correction" and "Batch correction". The "Batch correction" module provides two strategies for normalization: variables can be either first checked to assess which of them should be corrected (in that case the "Determine Batch Correction" module provides the information about the correction which will be applied), or all variables can be corrected ("all loess" options). In the latter case, it is possible to fit the model on the samples instead of the pools. Output figures and files are provided to assess the quality of the normalization.

* *From [marpiech](https://toolshed.g2.bx.psu.edu/view/marpiech):*
  * [norwich_tools_dock](https://toolshed.g2.bx.psu.edu/view/marpiech/norwich_tools_dock): Docking tools 

* *From [bornea](https://toolshed.g2.bx.psu.edu/view/bornea):*
  * [filter_fasta](https://toolshed.g2.bx.psu.edu/view/bornea/filter_fasta): Filters a FASTA file based on a Scaffold output file. 

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [trinity_run_de_analysis](https://toolshed.g2.bx.psu.edu/view/iuc/trinity_run_de_analysis): Differential expression analysis (from the Trinity tool suite) Trinity represents a method for the efficient and robust de novo reconstruction of transcriptomes from RNA-seq data. https://github.com/trinityrnaseq/trinityrnaseq

* [pilon](https://toolshed.g2.bx.psu.edu/view/iuc/pilon):  pilon is a tool for assembly improvement and variant analysis in bacteria Pilon is a software tool which can be used to:
  * Automatically improve draft assemblies
  * Find variation among strains, including large event detection. https://github.com/broadinstitute/pilon/wiki

* [icqsol_solve_laplace](https://toolshed.g2.bx.psu.edu/view/iuc/icqsol_solve_laplace): Computes the jump of normal electric field given a potential field on the surface of a shape Contains a tool that computes the jump in flux-like (Neumann) boundary conditions given prescribed Dirichlet boundary conditions by using the boundary element method.  Depending on the problem, the jump can be the surface flux or the normal electric field in electrostatic problems. The Dirichlet field is often called the potential (e.g. electrostatic potential).  When the domain extends from the object to infinity and the interior of the object is perfectly conducting, the jump corresponds to the normal electric field just outside the object.
* [trinity_abundance_estimates_to_matrix](https://toolshed.g2.bx.psu.edu/view/iuc/trinity_abundance_estimates_to_matrix): Build expression matrix (from the Trinity tool suite) Trinity represents a method for the efficient and robust de novo reconstruction of transcriptomes from RNA-seq data. https://github.com/trinityrnaseq/trinityrnaseq

* [icqsol_coarsen_shape](https://toolshed.g2.bx.psu.edu/view/iuc/icqsol_coarsen_shape): Coarsens a shape to a specified level resulting in a less detailed shape Contains a tool that coarsens a shape to a specified level resulting in a less detailed shape.  Cells which have area smaller than a given tolerance are merged with their neighbors.
* [icqsol_color_surface_field](https://toolshed.g2.bx.psu.edu/view/iuc/icqsol_color_surface_field): Colors a shape's selected surface field using a selected color map Colors a shape's selected surface field using a selected color map.  This tool will restrict selected input shapes to only those that have at least one surface field.
* [icqsol_scale_shape](https://toolshed.g2.bx.psu.edu/view/iuc/icqsol_scale_shape): Scales a shape Contains a tool that magnifies the dimensions of a shape along some axes.
* [icqsol_rotate_shape](https://toolshed.g2.bx.psu.edu/view/iuc/icqsol_rotate_shape): Rotates a shape Contains a tool that applies a rotation by a given angle about an arbitrary axis.
* [icqsol_create_shape](https://toolshed.g2.bx.psu.edu/view/iuc/icqsol_create_shape): Creates a new selected primitive shape or a clone of a selected shape Contains a tool that creates a selected primitive shape where shapes are Box, Cone, Cylinder and Sphere with defined origin, edge lengths, radius, etc.  This tool also creates a new copy of a shape selected from your history by cloning it.
* [icqsol_add_texture](https://toolshed.g2.bx.psu.edu/view/iuc/icqsol_add_texture): Adds texture to a shape Contains a tool that adds texture by projecting a picture onto the shape.
* [trinity_gene_to_trans_map](https://toolshed.g2.bx.psu.edu/view/iuc/trinity_gene_to_trans_map): Generate gene to transcript map (from the Trinity tool suite) Trinity represents a method for the efficient and robust de novo reconstruction of transcriptomes from RNA-seq data. https://github.com/trinityrnaseq/trinityrnaseq

* [trinity_align_and_estimate_abundance](https://toolshed.g2.bx.psu.edu/view/iuc/trinity_align_and_estimate_abundance):  Align reads and estimate abundance (from the Trinity tool suite) Trinity represents a method for the efficient and robust de novo reconstruction of transcriptomes from RNA-seq data. https://github.com/trinityrnaseq/trinityrnaseq

* [icqsol_translate_shape](https://toolshed.g2.bx.psu.edu/view/iuc/icqsol_translate_shape): Translates a shape to a new position Contains a tool that applies translation operations to a shape by adding a displacement to each coordinate.
* [icqsol_compose_shapes](https://toolshed.g2.bx.psu.edu/view/iuc/icqsol_compose_shapes): Creates a shape composed of any number of selected shapes Creates a shape composed of any number of selected shapes where the composition is based on a mathematical expression consisting of +, - and * operations.  The + operator results in a union of shapes, the - operator removes a shape and the * operator results in an intersection of shapes.
* [ucsc_twobittofa](https://toolshed.g2.bx.psu.edu/view/iuc/ucsc_twobittofa): twoBitToFa is a tool to convert all or part of .2bit file to fasta 
* [progressivemauve](https://toolshed.g2.bx.psu.edu/view/iuc/progressivemauve):  Mauve/ProgressiveMauve Multiple Sequence Aligner Mauve is a system for constructing multiple genome alignments in the presence of large-scale evolutionary events such as rearrangement and inversion. Multiple genome alignments provide a basis for research into comparative genomics and the study of genome-wide evolutionary dynamics. http://darlinglab.org/mauve/

* [icqsol_add_surface_field_from_expression](https://toolshed.g2.bx.psu.edu/view/iuc/icqsol_add_surface_field_from_expression): Adds a surface field to a selected shape based on a given mathematical expression Contains a tool that adds a surface field to a selected shape based on a given mathematical expression consisting of variables x, y, z (shape point coordinates) and t (time).  This tool will generate VTK POLYDATA files, so input PLY files or VTK files with a different dataset type will automatically be converted to VTK POLYDATA during tool execution.
* [icqsol_refine_shape](https://toolshed.g2.bx.psu.edu/view/iuc/icqsol_refine_shape): Refines a shape to a specified level resulting in a more detailed shape Contains a tool that refines a shape to a specified level resulting in a more detailed shape.  A middle point is added to each edge and to the center of each of the shape's polygons for each level of refinement.
* [trinity_filter_low_expr_transcripts](https://toolshed.g2.bx.psu.edu/view/iuc/trinity_filter_low_expr_transcripts): Filter low expression transcripts (from the Trinity tool suite) Trinity represents a method for the efficient and robust de novo reconstruction of transcriptomes from RNA-seq data. https://github.com/trinityrnaseq/trinityrnaseq

* [trinity_samples_qccheck](https://toolshed.g2.bx.psu.edu/view/iuc/trinity_samples_qccheck):  RNASeq samples quality check (from the Trinity tool suite) Trinity represents a method for the efficient and robust de novo reconstruction of transcriptomes from RNA-seq data.  https://github.com/trinityrnaseq/trinityrnaseq

* *From [kaymccoy](https://toolshed.g2.bx.psu.edu/view/kaymccoy):*
  * [calculate_fitnesses](https://toolshed.g2.bx.psu.edu/view/kaymccoy/calculate_fitnesses): of transposon insertion locations 
  * [consolidate_fitnesses](https://toolshed.g2.bx.psu.edu/view/kaymccoy/consolidate_fitnesses): of transposon insertion locations 
  * [fastq_collapser](https://toolshed.g2.bx.psu.edu/view/kaymccoy/fastq_collapser): collapses fastq files collapses fastq files
  * [aggregate_fitnesses](https://toolshed.g2.bx.psu.edu/view/kaymccoy/aggregate_fitnesses): of transposon insertion locations 
  * [enhanced_bowtie_mapper](https://toolshed.g2.bx.psu.edu/view/kaymccoy/enhanced_bowtie_mapper): a slightly enhanced version of the bowtie mapper a slightly enhanced version of the bowtie mapper, which allows for fasta files as input and map files as output

* *From [ahosny](https://toolshed.g2.bx.psu.edu/view/ahosny):*
  * [cnvsim](https://toolshed.g2.bx.psu.edu/view/ahosny/cnvsim): initial CNV Sim for Galaxy (version 0.9.0) Generates a set of artificial DNA reads with Copy Number Variations (CNVs) In genomics, Copy Number Variations (CNVs) is a type of structural variation in a genome where sections of the genome are repeated. The number if repetitions (duplications) varies between individuals in the human population. The Copy Number Variation Simulator (CNV Sim) is a tool used to generate a set of artificial DNA fragments for Next Generation Sequencing (NGS) read simulation. When aligned back to the reference genome, the artificial generated reads show variations in the CNV regions. Variations can be either amplifications of deletions. CNV-Sim offers two types of simulation:
    1. CNV simulation in whole genome. CNV-Sim wraps the functionality of ART to introduce variations in the genome.
    2. CNV simulation in whole exome. CNV-Sim wraps the functionality of Wessim to introduce variations in the targets.

* *From [m-zytnicki](https://toolshed.g2.bx.psu.edu/view/m-zytnicki):*
  * [mmquant](https://toolshed.g2.bx.psu.edu/view/m-zytnicki/mmquant): Multi-mapping quantification tool mmquant counts the number reads per gene, and properly assign reads that map several genes.

* *From [ethevenot](https://toolshed.g2.bx.psu.edu/view/ethevenot):*
  * [qualitymetrics](https://toolshed.g2.bx.psu.edu/view/ethevenot/qualitymetrics): [W4M][Metabolomics][LC-MS] Metrics and graphics to check the quality of the data. The "Quality Metrics" module provides quality metrics of the samples and variables, and visualization of the data matrix. The optional "Coefficient of Variation" arguments allows to flag the variables with a pool CV (or a pool CV over sample CV ratio) above a specific threshold. The advanced "!PoolAsPool1" argument is used when correlations with pool dilutions are computed: When set to TRUE (default), samples indicated as "pool" will be considered as "pool1" for the correlation together with the other pool dilutions (e.g. "pool2", "pool4", etc.); otherwise, "pool" samples will not be considered to compute the correlation (this enables the experimenter to have distinct "pool" samples for the computation of CV and "pool1" samples for the computation of dilution). The "sampleMetadata" is returned as output with 3 additional columns containing the p-values for the Hotellings T2 and Z-scores of intensity deciles and proportion of missing values. The "variableMetadata" is returned as output; in case a "sampleType" column is included in the input sampleMetadata file, additional columns will be added to indicate the variable quality metrics (eg mean, sd, CV on "pool", "sample" or "blank", or correlation with pool dilutions, depending on the known type present in the "sampleType" column). A "figure" is generated (pdf file) which illustrates the main computed sample and variable metric values.
  * [checkformat](https://toolshed.g2.bx.psu.edu/view/ethevenot/checkformat):  [W4M][Metabolomics][LC-MS][GC-MS][NMR] Checks the formats of the dataMatrix, sampleMetadata, and variableMetadata files. For all post-processing steps of the peak table, W4M uses a 3 table format for the data and metadata. This module therefore checks that the formats of the 3 files "dataMatrix.tsv", "sampleMetadata.tsv", and "variableMetadata.tsv" are correct. It can be used before any post-processing step (such as normalization or statistical analysis). Potential warnings or errors in the formats are returned in the "information.txt" output file.
  * [heatmap](https://toolshed.g2.bx.psu.edu/view/ethevenot/heatmap):  [W4M][Metabolomics][LC-MS][GC-MS][NMR] Heatmap of the data matrix. The heatmap is produced by using the "hclust" hierarchical clustering function from R. By default, the dissimilarity used is "1-correlation" (with the Pearson correlation coefficient), and the Ward agglomeration method. Other distances (e.g., "euclidean") or agglomeration methods (e.g., "average") can be used. For visulization, a scaling argument is suggested by default to enhance contrast (does not modify the clustering computation). Note that computation times for big matrices (e.g. with thousands of features) can be long.
  * [transformation](https://toolshed.g2.bx.psu.edu/view/ethevenot/transformation): [W4M][Metabolomics][LC-MS][GC-MS][NMR] Transforms the dataMatrix intensity values. The module currently currently performs log2(1+X) and log10(1+X), where X is the data matrix (missing values remain at "NA").

* *From [earlhaminst](https://toolshed.g2.bx.psu.edu/view/earlhaminst):*
  * [ensembl_get_sequences](https://toolshed.g2.bx.psu.edu/view/earlhaminst/ensembl_get_sequences): Get sequences by Ensembl ID (from the Ensebl-REST tool suite) A suite of Galaxy tools designed to work with Ensembl REST API.
  * [export_to_cluster](https://toolshed.g2.bx.psu.edu/view/earlhaminst/export_to_cluster):  Export datasets to cluster Simple tool to copy datasets to a directory on the cluster.
  * [ensembl_get_genetree](https://toolshed.g2.bx.psu.edu/view/earlhaminst/ensembl_get_genetree): Get gene tree by Ensembl ID (from the Ensebl-REST tool suite) A suite of Galaxy tools designed to work with Ensembl REST API.
  * [ensembl_get_feature_info](https://toolshed.g2.bx.psu.edu/view/earlhaminst/ensembl_get_feature_info): Get Ensembl features by ID (from the Ensebl-REST tool suite) A suite of Galaxy tools designed to work with Ensembl REST API.

* *From [nml](https://toolshed.g2.bx.psu.edu/view/nml):*
  * [rnaspades](https://toolshed.g2.bx.psu.edu/view/nml/rnaspades): Pipeline for de novo transcriptome assembly from RNA-Seq data 
  * [metaspades](https://toolshed.g2.bx.psu.edu/view/nml/metaspades): Genome assembler for metagenomic datasets 

* *From [davidvanzessen](https://toolshed.g2.bx.psu.edu/view/davidvanzessen):*
  * [sff_extract_demultiplex](https://toolshed.g2.bx.psu.edu/view/davidvanzessen/sff_extract_demultiplex): Extracts and demultiplexes sff files Extracts and demultiplexes sff files based on user defined barcodes, or when provided with a fastq/fasta file, just demultiplexes it.
  * [imgt_concatenate](https://toolshed.g2.bx.psu.edu/view/davidvanzessen/imgt_concatenate): Concatenating IMGT zip files Concatenates 1 or more IMGT zip files into a new IMGT zip file
  * [argalaxy_tools](https://toolshed.g2.bx.psu.edu/view/davidvanzessen/argalaxy_tools): A set of tools used in the Antigen Receptor Galaxy VM It contains the following tools: igblastparser, tabularize a igblast output report. imgt_loader, take an IMGT high zip or zxt output file and combine several columns from different files into a single tabular file. experimental_design, combines one or more of the tabular files generated by igblastparser or imgt_loader and concatenates them. report_clonality, takes the experimental_design output and generates an html report. (requires the following R libraries: gridExtra, ggplot2, plyr, data.table, reshape2 and lymphclon) complete_immunerepertoire, a convenience tool that calls all the previous tools in order.
  * [prisca](https://toolshed.g2.bx.psu.edu/view/davidvanzessen/prisca): PRISCA: PRecISe Clonal Analysis Comparison of clonal sequences in paired samples. R dependencies:
    * ggplot2, reshape2, data.table, grid, parallel
  * [mutation_analysis](https://toolshed.g2.bx.psu.edu/view/davidvanzessen/mutation_analysis): Mutation Analysis Takes an IMGT/High V-Quest zip file as input and generates a mutation analysis report on its findings.

* *From [dereeper](https://toolshed.g2.bx.psu.edu/view/dereeper):*
  * [plink](https://toolshed.g2.bx.psu.edu/view/dereeper/plink): Filter large VCF genotyping file 

* *From [hepcat72](https://toolshed.g2.bx.psu.edu/view/hepcat72):*
  * [barcode_splitter_multi](https://toolshed.g2.bx.psu.edu/view/hepcat72/barcode_splitter_multi): Barcode Splitter that allows multiple columns of barcodes to be in separate index reads and loads the results into the Galaxy history Based on the Fastx Toolkit barcode splitter, with modifications to allow multiple columns of barcodes to be in multiple index reads files and to load the resulting fastq files into a galaxy collection.  Input & output files may be gzipped. The wrapper is based on the Fastx Barcode Splitter wrapper written by the Galaxy team.

* *From [zeamxie](https://toolshed.g2.bx.psu.edu/view/zeamxie):*
  * [viewbs](https://toolshed.g2.bx.psu.edu/view/zeamxie/viewbs): Some description Some description

* *From [rmarenco](https://toolshed.g2.bx.psu.edu/view/rmarenco):*
  * [multi_fasta_glimmer_hmm](https://toolshed.g2.bx.psu.edu/view/rmarenco/multi_fasta_glimmer_hmm):  GlimmerHMM is a gene finder based on a Generalized Hidden Markov Model (GHMM) 

#### repository_suite_definition

* *From [earlhaminst](https://toolshed.g2.bx.psu.edu/view/earlhaminst):*
  * [ensembl_rest](https://toolshed.g2.bx.psu.edu/view/earlhaminst/ensembl_rest):  A suite of Ensembl-REST tools A suite of Galaxy tools designed to work with Ensembl REST API.

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [suite_trinity](https://toolshed.g2.bx.psu.edu/view/iuc/suite_trinity): Trinity tools to assemble transcript sequences from Illumina RNA-Seq data. Trinity represents a method for the efficient and robust de novo reconstruction of transcriptomes from RNA-seq data. https://github.com/trinityrnaseq/trinityrnaseq

#### tool_dependency_definition

* *From [abretaud](https://toolshed.g2.bx.psu.edu/view/abretaud):*
  * [package_lordec_0_6](https://toolshed.g2.bx.psu.edu/view/abretaud/package_lordec_0_6): Lordec 0.6 package 

