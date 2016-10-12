---
autotoc: true
---
<div class='right'></div>

<div class='right'><a href='http://toolshed.g2.bx.psu.edu/'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy ToolShed' width=200 /></a></div>

Tools contributed to the Galaxy Project Tool Shed in [June and July 2016](/GalaxyUpdates/2016_08).

### New Tools

#### unrestricted

* *From [nathandunn](https://toolshed.g2.bx.psu.edu/view/nathandunn):*
  * [monarchinitiative](https://toolshed.g2.bx.psu.edu/view/nathandunn/monarchinitiative): Enriches Related biological data using ontology driven data. Tool Suite that Pulls related Variants, Phenotypes, Diseases, Genes, and Homologues as TSV or phenopackets from the monarch initiative GOLR server  'https://monarchinitiative.org'

* *From [yguitton](https://toolshed.g2.bx.psu.edu/view/yguitton):*
  * [metams_rungc](https://toolshed.g2.bx.psu.edu/view/yguitton/metams_rungc): [W4M][GC-MS] metaMS R Package - GC-MS data preprocessing using metaMS package. Part of the W4M project: http://workflow4metabolomics.org metaMS: https://www.bioconductor.org/packages/release/bioc/html/metaMS.html MS-based metabolomics data processing and compound annotation pipeline.

* *From [mmonsoor](https://toolshed.g2.bx.psu.edu/view/mmonsoor):*
  * [probmetab](https://toolshed.g2.bx.psu.edu/view/mmonsoor/probmetab): [W4M][LC-MS] !ProbMetab - automatic probabilistic LC-MS based metabolome annotation. Part of the W4M project: http://workflow4metabolomics.org. !ProbMetab, an R package that promotes substantial improvement in automatic probabilistic liquid chromatography-mass spectrometry-based metabolome annotation. !ProbMetab is developped and maintained by Silva et al. - http://labpib.fmrp.usp.br/methods/probmetab/

* *From [stemcellcommons](https://toolshed.g2.bx.psu.edu/view/stemcellcommons):*
  * [rnaseq_workflows](https://toolshed.g2.bx.psu.edu/view/stemcellcommons/rnaseq_workflows): RNA-seq workflows annotated for use with Refinery Platform 

* *From [rmarenco](https://toolshed.g2.bx.psu.edu/view/rmarenco):*
  * [regtools_junctions_extract](https://toolshed.g2.bx.psu.edu/view/rmarenco/regtools_junctions_extract): Wrapper for the regtools junctions extract program Report splice junctions in RNA-Seq BAM file
  * [hubarchivecreator](https://toolshed.g2.bx.psu.edu/view/rmarenco/hubarchivecreator): A tool to create a UCSC track hub 
  * [psltobed](https://toolshed.g2.bx.psu.edu/view/rmarenco/psltobed): tranform a psl format file to a bed format file 
  * [bedclip](https://toolshed.g2.bx.psu.edu/view/rmarenco/bedclip): upload for repository https://github.com/remimarenco/bedclip Remove lines from bed file that refer to off-chromosome places 
  * [blastxmltopsl](https://toolshed.g2.bx.psu.edu/view/rmarenco/blastxmltopsl): upload for repository https://github.com/remimarenco/blastXmlToPsl. Convert blast XML output to PSLs 
  * [trfbig](https://toolshed.g2.bx.psu.edu/view/rmarenco/trfbig): upload for repository https://github.com/remimarenco/trfBig Mask tandem repeats on a big sequence file 
  * [bamtobigwig](https://toolshed.g2.bx.psu.edu/view/rmarenco/bamtobigwig): Convert Bam file to !BigWig 

* *From [rnateam](https://toolshed.g2.bx.psu.edu/view/rnateam):*
  * [rnacommender](https://toolshed.g2.bx.psu.edu/view/rnateam/rnacommender): upload for repository https://github.com/bgruening/galaxytools/tree/rna_commander/tools/rna_tools/rna_commender RNAcommender is a tool for genome-wide recommendation of RNA-protein interactions. RNAcommender is a tool for genome-wide recommendation of RNA-protein interactions. It is a recommender system capable of suggesting RNA targets to unexplored RNA binding proteins, by propagating the available interaction information, taking into account the protein domain composition and the RNA predicted secondary structure.
  * [ribotaper](https://toolshed.g2.bx.psu.edu/view/rnateam/ribotaper): upload for repository https://github.com/bgruening/galaxytools/tree/master/tools/rna_tools/ribotaper/ A method for defining traslated ORFs using Ribosome Profiling data. !RiboTaper is a new analysis pipeline for Ribosome Profiling (Ribo-seq) experiments, which exploits the triplet periodicity of ribosomal footprints to call translated regions.


* *From [pmac](https://toolshed.g2.bx.psu.edu/view/pmac):*
  * [robustzscorenormalization](https://toolshed.g2.bx.psu.edu/view/pmac/robustzscorenormalization): This program takes a linear plate table and a plate config file as input and then performs Robust Z Score Normalization on the data Takes Cellomics High Content - Imaging data and performs Robust Z Score Normalization.
  * [iterativepca](https://toolshed.g2.bx.psu.edu/view/pmac/iterativepca): Iterative PCA on genotype data Perform PCA on input variant data, to filter out outliers. Repeat this process, but with the outliers removed from the input data, until no more outliers are removed.
  * [reformatplatestabulartolinear](https://toolshed.g2.bx.psu.edu/view/pmac/reformatplatestabulartolinear): This program converts a plates table from a tabular format to a linear format Converts a tabular plates table used in Functional Genomics and converts it back to a linear format.
  * [calculatezprimefactor](https://toolshed.g2.bx.psu.edu/view/pmac/calculatezprimefactor): This program takes a linear plate table and a plate config file and then calculates the Z Prime Factors for your data Designed for use in functional genomics. Takes output from a Cellomics High Content - Imaging Screen and calculates the Z Prime Factors. Requires R to be installed
  * [normalizemediannegcntrl](https://toolshed.g2.bx.psu.edu/view/pmac/normalizemediannegcntrl): This program takes a linear plate table and a plate config file as input and then normalizes each plate in the table to the negative controls in the config This tool takes Cellomics High Content - Imaging data and normalizes each plate using a config file.
  * [reformatplateslineartotabular](https://toolshed.g2.bx.psu.edu/view/pmac/reformatplateslineartotabular): This program converts a linear plates file to a tabular format Converts a linear plates file used in Functional Genomics to a tabular format.
  * [map_chromosomes](https://toolshed.g2.bx.psu.edu/view/pmac/map_chromosomes): Convert between UCSC and ensembl chromosome names Converts a column in a table from UCSC to ensembl chromosome representation and vice versa.

* *From [bebatut](https://toolshed.g2.bx.psu.edu/view/bebatut):*
  * [metaphlan2](https://toolshed.g2.bx.psu.edu/view/bebatut/metaphlan2): upload for repository https://github.com/ASaiM/galaxytools/tree/master/tools/metaphlan2/ !MetaPhlAn is a computational tool for profiling the composition of microbial communities (Bacteria, Archaea, Eukaryotes and Viruses) from metagenomic shotgun sequencing data with species level resolution 

* *From [bgruening](https://toolshed.g2.bx.psu.edu/view/bgruening):*
  * [autodock_vina](https://toolshed.g2.bx.psu.edu/view/bgruening/autodock_vina): upload for repository https://github.com/leobiscassi/galaxytools/tree/autodock_vina_tools/chemicaltoolbox/autodock_vina Software for docking protein-compound. !AutoDock Vina is an open-source program for doing molecular docking.

* [autodock_vina_prepare_receptor](https://toolshed.g2.bx.psu.edu/view/bgruening/autodock_vina_prepare_receptor): upload for repository https://github.com/bgruening/galaxytools/tree/master/chemicaltoolbox/autodock_vina Software for protein-compound docking - the prepare receptor step !AutoDock Vina is an open-source program for doing molecular docking.

* [autodock_vina_prepare_ligand](https://toolshed.g2.bx.psu.edu/view/bgruening/autodock_vina_prepare_ligand): upload for repository https://github.com/bgruening/galaxytools/tree/master/chemicaltoolbox/autodock_vina Software for protein-compound docking - the prepare ligand step !AutoDock Vina is an open-source program for doing molecular docking.

* [lighter](https://toolshed.g2.bx.psu.edu/view/bgruening/lighter):  upload for repository https://github.com/mourisl/Lighter  Lighter is a kmer-based error correction method for whole genome sequencing data Lighter is a kmer-based error correction method for whole genome sequencing data

* [circexplorer](https://toolshed.g2.bx.psu.edu/view/bgruening/circexplorer): upload for repository https://github.com/bgruening/galaxytools/tree/master/tools/circexplorer A combined strategy to identify circular RNAs (circRNAs and ciRNAs) A combined strategy to identify circular RNAs (circRNAs and ciRNAs) (Zhang et al., Complementary Sequence-Mediated Exon Circularization, Cell (2014), 159:134-147)
* [glimmer_hmm](https://toolshed.g2.bx.psu.edu/view/bgruening/glimmer_hmm): planemo upload for repository https://github.com/bgruening/galaxytools/tree/master/tools/glimmer_hmm GlimmerHMM is a new gene finder based on a Generalized Hidden Markov Model (GHMM) GlimmerHMM is a new gene finder based on a Generalized Hidden Markov Model (GHMM). Although the gene finder conforms to the overall mathematical framework of a GHMM, additionally it incorporates splice site models adapted from the !GeneSplicer program and a decision tree adapted from GlimmerM. It also utilizes Interpolated Markov Models for the coding and noncoding models . Currently, GlimmerHMM's GHMM structure includes introns of each phase, intergenic regions, and four types of exons (initial, internal, final, and single).


* *From [mvdbeek](https://toolshed.g2.bx.psu.edu/view/mvdbeek):*
  * [docker_scriptrunner](https://toolshed.g2.bx.psu.edu/view/mvdbeek/docker_scriptrunner): planemo upload for repository https://github.com/mvdbeek/docker_scriptrunner/ docker scriptrunner allows script execution in galaxy docker scriptrunner allows the execution of arbitrary scripts in a container, shielding the system from malicious scripts. First read the README before installing this tools, since it may run in a insecure manner.


* *From [chrisd](https://toolshed.g2.bx.psu.edu/view/chrisd):*
  * [metasnp](https://toolshed.g2.bx.psu.edu/view/chrisd/metasnp): planemo upload for repository https://github.com/cdeanj/galaxytools/tree/master/tools/metasnp A simple naive metagenomics variant caller 

* *From [prog](https://toolshed.g2.bx.psu.edu/view/prog):*
  * [lcmsmatching](https://toolshed.g2.bx.psu.edu/view/prog/lcmsmatching): planemo upload for repository https://github.com/workflow4metabolomics/lcmsmatching.git [Metabolomics][W4M][LC-MS] Annotate LCMS spectrum using an in-house spectra database. Part of the W4M project (http://workflow4metabolomics.org). Annotate LCMS spectrum using an in-house spectra database, provided as a TSV file. Two algorithms are proposed, a simple matching on MZ and RT values, and a more complex one that makes sure for each candidate that its precursor peak is matched.

* *From [galaxyp](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
  * [mz_to_sqlite](https://toolshed.g2.bx.psu.edu/view/galaxyp/mz_to_sqlite): planemo upload for repository https://github.com/galaxyproteomics/tools-galaxyp/tree/master/tools/mz_to_sqlite Creates a SQLite database for proteomics data Extract proteomics files: mzIdentML, mzML, MGF, fasta, uniprot_xml into a SQLite DB

* [gcc2016_tutorial](https://toolshed.g2.bx.psu.edu/view/galaxyp/gcc2016_tutorial): planemo upload for repository https://github.com/galaxyproteomics/tools-galaxyp/tree/master/workflows/gcc2016_tutorial  GCC2016 Tutorial Workflows Workflows for !PeptideShaker and NOVEL peptides analysis


* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [stacks_sstacks](https://toolshed.g2.bx.psu.edu/view/iuc/stacks_sstacks): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stacks  Stacks: sstacks (from the Stacks tool suite) Stacks is a software pipeline for building loci from short-read sequences, such as those generated on the Illumina platform. Stacks was developed to work with restriction enzyme-based data, such as RAD-seq, for the purpose of building genetic maps and conducting population genomics and phylogeography. http://catchenlab.life.illinois.edu/stacks/

* [stacks_assembleperead](https://toolshed.g2.bx.psu.edu/view/iuc/stacks_assembleperead): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stacks  Stacks: assemble read pairs by locus (from the Stacks tool suite) 

* [stacks_rxstacks](https://toolshed.g2.bx.psu.edu/view/iuc/stacks_rxstacks): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stacks  Stacks: rxstacks (from the Stacks tool suite) 

* [stacks_pstacks](https://toolshed.g2.bx.psu.edu/view/iuc/stacks_pstacks): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stacks  Stacks: pstacks (from the Stacks tool suite) 

* [stacks_refmap](https://toolshed.g2.bx.psu.edu/view/iuc/stacks_refmap): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stacks  Stacks: reference map (from the Stacks tool suite)

* [stacks_refmap](https://toolshed.g2.bx.psu.edu/view/iuc/stacks_refmap): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stacks  Stacks: reference map (from the Stacks tool suite)

* [stacks_refmap](https://toolshed.g2.bx.psu.edu/view/iuc/stacks_refmap): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stacks  Stacks: reference map (from the Stacks tool suite) 

* [stacks_populations](https://toolshed.g2.bx.psu.edu/view/iuc/stacks_populations): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stacks  Stacks: populations (from the Stacks tool suite)

* [suite_stacks](https://toolshed.g2.bx.psu.edu/view/iuc/suite_stacks): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stacks  Stacks tools for building loci from short-read sequences, such as RAD-seq 

* [stacks_ustacks](https://toolshed.g2.bx.psu.edu/view/iuc/stacks_ustacks): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stacks  Stacks: ustacks (from the Stacks tool suite) 

* [stacks_procrad](https://toolshed.g2.bx.psu.edu/view/iuc/stacks_procrad): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stacks  Stacks: process radtags (from the Stacks tool suite) 

* [stacks_genotypes](https://toolshed.g2.bx.psu.edu/view/iuc/stacks_genotypes): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/stacks  Stacks: genotypes (from the Stacks tool suite) 


* [bcftools_concat](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_concat): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools Wrapper for bcftools application bcftools concat. https://samtools.github.io/bcftools/

* [bcftools_view](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_view): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools Wrapper for bcftools application bcftools view. https://samtools.github.io/bcftools/

* [bcftools_roh](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_roh): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools roh. https://samtools.github.io/bcftools/

* [bcftools_plugin_mendelian](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_mendelian): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools mendelian. https://samtools.github.io/bcftools/

* [bcftools_annotate](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_annotate): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools Wrapper for bcftools application bcftools annotate. https://samtools.github.io/bcftools/

* [bcftools_plugin_fill_tags](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_fill_tags): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools fill-tags. https://samtools.github.io/bcftools/


* [bcftools_plugin_fill_an_ac](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_fill_an_ac): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools fill-AN-AC. https://samtools.github.io/bcftools/

* [biom_add_metadata](https://toolshed.g2.bx.psu.edu/view/iuc/biom_add_metadata): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/biom_format  Wrapper for the biom-format CLI tool suite: BIOM metadata The biom-format package provides a command line interface and Python API for working with BIOM files. 

* [ncbi_eutils_efetch](https://toolshed.g2.bx.psu.edu/view/iuc/ncbi_eutils_efetch): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/ncbi_entrez_eutils  Wrapper for NCBI application NCBI EFetch Entrez E-Utils provide an interface to the NCBI databases to allow querying and downloading datasets from NCBI. This repo requires that administrators should very aware of some restrictions NCBI places on the use of the Entrez service.  
* [bcftools_plugin_impute_info](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_impute_info): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools impute-info. https://samtools.github.io/bcftools/

* [ncbi_eutils_esearch](https://toolshed.g2.bx.psu.edu/view/iuc/ncbi_eutils_esearch): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/ncbi_entrez_eutils  Wrapper for NCBI application NCBI ESearch Entrez E-Utils provide an interface to the NCBI databases to allow querying and downloading datasets from NCBI.

* [biom_convert](https://toolshed.g2.bx.psu.edu/view/iuc/biom_convert): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/biom_format Wrapper for the biom-format CLI tool suite: Convert BIOM The biom-format package provides a command line interface and Python API for working with BIOM files. 

* [hmmer_hmmemit](https://toolshed.g2.bx.psu.edu/view/iuc/hmmer_hmmemit): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/hmmer3  Wrapper for hmmer3 application hmmemit HMMER is used for searching sequence databases for homologs of protein sequences, and for making protein sequence alignments. It implements methods using probabilistic models called profile hidden Markov models (profile HMMs).  http://hmmer.janelia.org/

* [hmmer_hmmconvert](https://toolshed.g2.bx.psu.edu/view/iuc/hmmer_hmmconvert): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/hmmer3  Wrapper for hmmer3 application hmmconvert 

* [hmmer_nhmmscan](https://toolshed.g2.bx.psu.edu/view/iuc/hmmer_nhmmscan): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/hmmer3  Wrapper for hmmer3 application nhmmscan 

* [hmmer_hmmalign](https://toolshed.g2.bx.psu.edu/view/iuc/hmmer_hmmalign): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/hmmer3 Wrapper for hmmer3 application hmmalign 

* [hmmer_hmmfetch](https://toolshed.g2.bx.psu.edu/view/iuc/hmmer_hmmfetch): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/hmmer3  Wrapper for hmmer3 application hmmfetch 

* [hmmer_hmmbuild](https://toolshed.g2.bx.psu.edu/view/iuc/hmmer_hmmbuild): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/hmmer3  Wrapper for hmmer3 application hmmbuild 

* [hmmer_nhmmer](https://toolshed.g2.bx.psu.edu/view/iuc/hmmer_nhmmer): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/hmmer3  Wrapper for hmmer3 application nhmmer

* [hmmer_phmmer](https://toolshed.g2.bx.psu.edu/view/iuc/hmmer_phmmer): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/hmmer3  Wrapper for hmmer3 application phmmer

* [hmmer_alimask](https://toolshed.g2.bx.psu.edu/view/iuc/hmmer_alimask): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/hmmer3  Wrapper for hmmer3 application alimask

* [hmmer_hmmsearch](https://toolshed.g2.bx.psu.edu/view/iuc/hmmer_hmmsearch): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/hmmer3  Wrapper for hmmer3 application hmmsearch 

* [hmmer_jackhmmer](https://toolshed.g2.bx.psu.edu/view/iuc/hmmer_jackhmmer): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/hmmer3  Wrapper for hmmer3 application jackhmmer 

* [hmmer_hmmscan](https://toolshed.g2.bx.psu.edu/view/iuc/hmmer_hmmscan): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/hmmer3  Wrapper for hmmer3 application hmmscan 



* [bcftools_plugin_missing2ref](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_missing2ref): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools missing2ref. https://samtools.github.io/bcftools/

* [bcftools_plugin_tag2tag](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_tag2tag): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools tag2tag. https://samtools.github.io/bcftools/

* [bcftools_plugin_setgt](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_setgt): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools setGT. https://samtools.github.io/bcftools/


* [ncbi_eutils_ecitmatch](https://toolshed.g2.bx.psu.edu/view/iuc/ncbi_eutils_ecitmatch): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/ncbi_entrez_eutils  Wrapper for NCBI application NCBI ECitMatch Entrez E-Utils provide an interface to the NCBI databases to allow querying and downloading datasets from NCBI

* [bcftools_stats](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_stats): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools stats. https://samtools.github.io/bcftools/

* [bcftools_query](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_query): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools query. https://samtools.github.io/bcftools/




* [bcftools_reheader](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_reheader): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools reheader. https://samtools.github.io/bcftools/

* [bcftools_merge](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_merge): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools Wrapper for bcftools application bcftools merge. https://samtools.github.io/bcftools/

* [bcftools_plugin_color_chrs](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_color_chrs): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools color-chrs. https://samtools.github.io/bcftools/

* [bcftools_consensus](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_consensus): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools consensus. https://samtools.github.io/bcftools/

* [bcftools_plugin_frameshifts](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_frameshifts): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools Wrapper for bcftools application bcftools frameshifts. https://samtools.github.io/bcftools/


* [bcftools_plugin_counts](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_counts): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools counts. https://samtools.github.io/bcftools/

* [bcftools_gtcheck](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_gtcheck): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools gtcheck. https://samtools.github.io/bcftools/

* [data_manager_snpsift_dbnsfp](https://toolshed.g2.bx.psu.edu/view/iuc/data_manager_snpsift_dbnsfp): planemo upload for repository https://github.com/galaxyproject/tools-devteam/tree/master/data_managers/data_manager_snpsift_dbnsfp  Install !SnpSift dbNSFP local data Installs dbNSFP data for use by !SnpSift dbNSFP. dbNSFP is an integrated database of human functional predictions from multiple algorithms (SIFT, Polyphen2, LRT and !MutationTaster, PhyloP and GERP++, etc.).  !SnpEff and !SnpSift are developed by Pablo Cingolani. http://snpeff.sourceforge.net/SnpSift.html#dbNSFP

* [xpath](https://toolshed.g2.bx.psu.edu/view/iuc/xpath): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/xpath  XPath XML querying tool Execute XPath queries on XML files for use in downstream analysis. Useful for extracting lists of IDs or blast hits from large XML files.

* [bcftools_plugin_fixploidy](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_fixploidy): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools fixploidy. https://samtools.github.io/bcftools/

* [bcftools_convert_to_vcf](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_convert_to_vcf): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools convert to vcf. https://samtools.github.io/bcftools/



* [bcftools_filter](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_filter): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools filter. https://samtools.github.io/bcftools/

* [bcftools_plugin_dosage](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_dosage): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools dosage. https://samtools.github.io/bcftools/


* [ncbi_eutils_elink](https://toolshed.g2.bx.psu.edu/view/iuc/ncbi_eutils_elink): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/ncbi_entrez_eutils  Wrapper for NCBI application NCBI ELink Entrez E-Utils provide an interface to the NCBI databases to allow querying and downloading datasets from NCBI

* [bcftools_cnv](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_cnv): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools cnv. https://samtools.github.io/bcftools/

* [pe_histogram](https://toolshed.g2.bx.psu.edu/view/iuc/pe_histogram): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/pe_histogram  Contains a tool that produces an insert size histogram for a paired-end BAM file. Contains a tool that produces an insert size histogram and basic statistics for a paired-end BAM file.  The tool generates 2 outputs: a png image consisting of the histogram of the insert size frequency and a tabular file containing the alignment statistics.

* [bcftools_query_list_samples](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_query_list_samples): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools List Samples. https://samtools.github.io/bcftools/




* [suite_ncbi_entrez](https://toolshed.g2.bx.psu.edu/view/iuc/suite_ncbi_entrez): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/ncbi_entrez_eutils  NCBI Entrez E-Utilties allow fetching data from NCBI Databases Entrez E-Utils provide an interface to the NCBI databases to allow querying and downloading datasets from NCBI

* [prinseq](https://toolshed.g2.bx.psu.edu/view/iuc/prinseq): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/prinseq/  PRINSEQ is a tool for easy and rapid quality control and data processing of metagenomic and metatranscriptomic datasets 




* [suite_biom_format](https://toolshed.g2.bx.psu.edu/view/iuc/suite_biom_format): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/biom_format  BIOM-format tools The biom-format package provides a command line interface and Python API for working with BIOM files.

* [suite_bcftools_1_3](https://toolshed.g2.bx.psu.edu/view/iuc/suite_bcftools_1_3): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  A suite of Galaxy tools designed to work with version 1.3 of the bcftools package. https://samtools.github.io/bcftools/

* [simpleweather](https://toolshed.g2.bx.psu.edu/view/iuc/simpleweather): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/weather_app  provides simple weather in text format Weather tool using https://wttr.in. The tool should be treated carefully because it uses an external webpage.



* [kraken_taxonomy_report](https://toolshed.g2.bx.psu.edu/view/iuc/kraken_taxonomy_report): planemo upload for repository https://github.com/galaxyproject/tools-iuc/blob/master/tools/kraken_taxonomy_report/  Kraken taxonomy report Turns Kraken classified reads into a tabular taxonomy abundance table. Optionally outputs a newick tree.

* [bcftools_convert_from_vcf](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_convert_from_vcf): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools convert from vcf. https://samtools.github.io/bcftools/





* [bcftools_plugin_vcf2sex](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_plugin_vcf2sex): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools vcf2sex. https://samtools.github.io/bcftools/

* [ncbi_eutils_einfo](https://toolshed.g2.bx.psu.edu/view/iuc/ncbi_eutils_einfo): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/ncbi_entrez_eutils  Wrapper for NCBI application NCBI EInfo Entrez E-Utils provide an interface to the NCBI databases to allow querying and downloading datasets from NCBI

* [ncbi_eutils_epost](https://toolshed.g2.bx.psu.edu/view/iuc/ncbi_eutils_epost): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/ncbi_entrez_eutils  Wrapper for NCBI application NCBI EPost Entrez E-Utils provide an interface to the NCBI databases to allow querying and downloading datasets from NCBI

* [bcftools_isec](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_isec): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools isec. https://samtools.github.io/bcftools/


* [bcftools_norm](https://toolshed.g2.bx.psu.edu/view/iuc/bcftools_norm): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/bcftools  Wrapper for bcftools application bcftools norm. https://samtools.github.io/bcftools/

* [ncbi_eutils_egquery](https://toolshed.g2.bx.psu.edu/view/iuc/ncbi_eutils_egquery): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/ncbi_entrez_eutils  Wrapper for NCBI application NCBI EGQuery Entrez E-Utils provide an interface to the NCBI databases to allow querying and downloading datasets from NCBI


* [ncbi_eutils_esummary](https://toolshed.g2.bx.psu.edu/view/iuc/ncbi_eutils_esummary): planemo upload for repository https://github.com/galaxyproject/tools-iuc/tree/master/tools/ncbi_entrez_eutils  Wrapper for NCBI application NCBI ESummary Entrez E-Utils provide an interface to the NCBI databases to allow querying and downloading datasets from NCBI


* *From [ulfschaefer](https://toolshed.g2.bx.psu.edu/view/ulfschaefer):*
  * [phemost](https://toolshed.g2.bx.psu.edu/view/ulfschaefer/phemost): PHE MLST tool 
  * [data_manager_phemost](https://toolshed.g2.bx.psu.edu/view/ulfschaefer/data_manager_phemost): data manager for PHE MOST tool downloads MLST data from pubmlst.org and makes it available for the phemsot tool via the mlst_data.loc data table

* *From [simon-gladman](https://toolshed.g2.bx.psu.edu/view/simon-gladman):*
  * [snippy](https://toolshed.g2.bx.psu.edu/view/simon-gladman/snippy): Initial upload Contains the snippy tool for characterising microbial snps Snippy finds variants between a haploid reference genome and your NGS sequence reads. It will find both substitutions and insertions/deletions (indels).

* [velvetoptimiser](https://toolshed.g2.bx.psu.edu/view/simon-gladman/velvetoptimiser): Initial upload An updated wrapper for the Velvet Optimiser The Velvet Optimiser automatically finds the optimum assembly parameters for velvet over many runs. The automation is configurable. Written by Simon Gladman. This wrapper has been updated allowing for data collections and version 1.2.10 of velvet


* *From [luis](https://toolshed.g2.bx.psu.edu/view/luis):*
  * [ball](https://toolshed.g2.bx.psu.edu/view/luis/ball): BALL - The Biochemical Algorithms Library BALL is computer software consisting of the versatile C++ class framework BALL (Biochemical Algorithms Library), a library of algorithms and data structures for molecular modelling and computational structural bioinformatics, a Python interface to this library and an open source graphical interface to BALL, the molecule viewer BALLView. BALL has evolved from a commercial product into free-of-charge open-source software licensed under the GNU Lesser General Public License (LGPL). BALLView is licensed under the GNU General Public License (GPL) license. BALL and BALLView have been ported to the operating systems Linux, OS X, Solaris, and Windows. The molecule viewer BALLView, also developed by the BALL project team, is a C++ application of BALL using Qt, and OpenGL with the real-time ray tracer RTFact as render back ends. For both, BALLView offers three-dimensional and stereoscopic visualizing in several different modes, and applying directly the algorithms of the BALL library via its graphical user interface. The BALL project is developed and maintained by groups at Saarland University, Mainz University, and University of Tubingen. Both the library and the viewer are heavily used for education and research. BALL packages have been made available in the Debian project in April 2010.

* *From [nml](https://toolshed.g2.bx.psu.edu/view/nml):*
  * [plasmidspades](https://toolshed.g2.bx.psu.edu/view/nml/plasmidspades): planemo upload  Genome assembler for assemblying plasmid 
  * [hivtrace](https://toolshed.g2.bx.psu.edu/view/nml/hivtrace): planemo upload for repository https://github.com/phac-nml/galaxy_tools/tree/tools/hivtrace  An application that identifies potential transmission clusters within a supplied FASTA file with an option to find potential links against the Los Alamos HIV Sequence Database. 

* *From [brenninc](https://toolshed.g2.bx.psu.edu/view/brenninc):*
  * [directory_reader_limited_by_data_table](https://toolshed.g2.bx.psu.edu/view/brenninc/directory_reader_limited_by_data_table): Reads files into a data collection from a preconfigure directory on the server. Reads files from a preconfigure directory on the server. Loads all specified files from a server directory into a Data Collection and also provides a text fie with the original names. Depends on the directory_data  Data Table.  See https://toolshed.g2.bx.psu.edu/view/brenninc/data_manager_for_directory_data. Only preconfigured combination of path and extension work. Files will have their extension changed to one expected by galaxy and can be decompressed as set in the Data Table. Users have the ability to limit the files by prefix (start of name) and postfix (last bit of the name before the extension).
   
* *From [portiahollyoak](https://toolshed.g2.bx.psu.edu/view/portiahollyoak):*
  * [fastuniq](https://toolshed.g2.bx.psu.edu/view/portiahollyoak/fastuniq): planemo upload for repository https://github.com/portiahollyoak/Tools  duplicate read remover !FastUniq is an ultrafast de novo tool for removal of duplicates in paired short DNA sequence reads in FASTQ format. It identifies duplicates by comparing sequences between read pairs and does not require complete genome sequences as prerequisites. It is also capable of simultaneously handling reads with different lengths and results in highly efficient running time.


* *From [maille](https://toolshed.g2.bx.psu.edu/view/maille):*
  * [affiliation_otu](https://toolshed.g2.bx.psu.edu/view/maille/affiliation_otu): Find Rapidly OTUs with Galaxy Solution FROGS is a galaxy/CLI workflow designed to produce an OTU count matrix from high depth sequencing amplicon data. This workflow is focused on:
    * User-friendliness with the integration in galaxy and lots of rich graphic outputs
    * Accuracy with a clustering without global similarity threshold, the  management of multi-affiliations and management of separated PCRs in the chimera removal step
    * Speed with fast algorithms and an easy to use parallelisation
    * Scalability with algorithms designed to support the data growth

* *From [lgueguen](https://toolshed.g2.bx.psu.edu/view/lgueguen):*
  * [sartools](https://toolshed.g2.bx.psu.edu/view/lgueguen/sartools): Planemo upload SARTools is a R package dedicated to the differential analysis of RNA-seq data. SARTools provides R tools and an environment for the statistical analysis of RNA-Seq projects: load and clean data, produce figures, perform statistical analysis/testing with DESeq2 or edgeR, export results and create final report.


* *From [ethevenot](https://toolshed.g2.bx.psu.edu/view/ethevenot):*
  * [biosigner](https://toolshed.g2.bx.psu.edu/view/ethevenot/biosigner): planemo upload for repository https://github.com/workflow4metabolomics/biosigner.git  [W4M][LC-MS][GC-MS][NMR] The "biosigner" module implements a new feature selection algorithm to assess the relevance of the variables for the prediction performances of the classifier (Rinaudo et al, submitted). 
  * [univariate](https://toolshed.g2.bx.psu.edu/view/ethevenot/univariate): planemo upload for repository https://github.com/workflow4metabolomics/univariate.git  [W4M][LC-MS][GC-MS][NMR] Univariate statistics. The module performs two sample tests (t-test and Wilcoxon rank test), analysis of variance and Kruskal-Wallis rank test, and correlation tests (by using either the pearson or the spearman correlation).
  * [multivariate](https://toolshed.g2.bx.psu.edu/view/ethevenot/multivariate): planemo upload for repository https://github.com/workflow4metabolomics/multivariate.git  [W4M][LC-MS][GC-MS][NMR] Multivariate analysis by PCA, PLS(-DA), and OPLS(-DA). Part of the W4M project (http://workflow4metabolomics.org). "Latent variable modeling" with Principal Component Analysis ("PCA") and Partial Least Squares ("PLS") are powerful methods for "visualization", "regression", "classification", and feature selection of "omics data" where the number of variables exceeds the number of samples and with multicollinearity among variables (Wold et al, 2001; Thenenhaus, 1998; Wehrens, 2011; Eriksson et al, 2006; Trygg et al, 2007). Orthogonal Partial Least Squares ("OPLS") enables to separately model the variation correlated (predictive) to the factor of interest and the uncorrelated (orthogonal) variation (Trygg and Wold, 2002). While performing similarly to PLS, OPLS facilitates interpretation. Successful applications of these chemometrics techniques include spectroscopic data such as Raman spectroscopy, nuclear magnetic resonance (NMR), mass spectrometry (MS) in metabolomics and proteomics, but also transcriptomics data. In addition to "scores", "loadings" and "weights" plots, the module provides metrics and graphics to determine the optimal number of components (e.g. with the "R2" and "Q2" coefficients; Wold et al, 2001; Thenenhaus, 1998; Eriksson et al, 2006), check the "validity of the model" by permutation testing (Szymanska et al, 2012), detect "outliers" (Wold et al, 2001; Thenenhaus, 1998; Hubert et al, 2005), and provide several metrics to assess the importance of the variables in the model (e.g. "Variable Importance in Projection" or regression coefficients; Wold et al, 2001; Mehmood et al, 2012; Galindo-Prieto et al, 2014). The module is an implementation of the "ropls" R package available from Bioconductor (Thevenot et al, 2015).



#### tool_dependency_definition

* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
  * [package_meme_4_11_1](https://toolshed.g2.bx.psu.edu/view/iuc/package_meme_4_11_1): Contains a tool dependency definition that downloads and installs version 4.11.1 of the MEME suite The MEME Suite provides a unified set of tools for discovery and analysis of sequence motifs representing features such as DNA binding sites and protein interaction domains.


* *From [ulfschaefer](https://toolshed.g2.bx.psu.edu/view/ulfschaefer):*
  * [package_python_2_7_lxml_3_2_3](https://toolshed.g2.bx.psu.edu/view/ulfschaefer/package_python_2_7_lxml_3_2_3): lxml 3.2.3 for Python 2.7 This Galaxy Tool shed package installs version 3.2.3 of lxml (http://lxml.de) for use with python 2.7.10.
  * [package_phemost_1_0](https://toolshed.g2.bx.psu.edu/view/ulfschaefer/package_phemost_1_0): PHE MLST tool dependency definition 
