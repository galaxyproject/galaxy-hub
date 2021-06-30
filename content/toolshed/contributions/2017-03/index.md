---
title: March 2017 Tool Shed contributions
---
Tools contributed to the Galaxy Project Tool Shed in [March 2017](/src/galaxy-updates/2017-04/index.md).

* [All monthly summaries](/src/toolshed/contributions/index.md)

## New Tools

### unrestricted

* *From [bgruening](https://toolshed.g2.bx.psu.edu/view/bgruening):*
   * [hicexplorer_hiccorrectmatrix](https://toolshed.g2.bx.psu.edu/view/bgruening/hicexplorer_hiccorrectmatrix):  Wrapper for the deepTools: hicCorrectMatrix. Sequencing techniques that probe the 3D organization of the genome generate large amounts of  data whose processing, analysis and visualization is challenging. Here, we present Hi-C Explorer,  a set of tools for the analysis and visualization of chromosome conformation data. Hi-C explorer  facilitates the creation of contact matrices, correction of contacts, TAD detection, merging,  reordering or chromosomes, conversion from different formats and detection of long-range contacts.  Moreover, it allows the visualization of multiple contact matrices along with other types of data  like genes, compartments, ChIP-seq coverage tracks (and in general any type of genomic scores) and long range contacts.    doi: 10.5281/zenodo.159780    Repository-Maintainer: Björn Grüning    https://github.com/maxplanck-ie/HiCExplorer.
   * [hicup_hicup](https://toolshed.g2.bx.psu.edu/view/bgruening/hicup_hicup):  Wrapper for the HiCUP suite tool: Hicup Pipeline. A galaxy wrapper implementation of the HiCUP-Pipeline from the Bioinformatics Babraham Institute. See http://www.bioinformatics.babraham.ac.uk/projects/hicup/.
   * [hicup_filter](https://toolshed.g2.bx.psu.edu/view/bgruening/hicup_filter):  Wrapper for the HiCUP suite tool: Hicup Filter. A galaxy wrapper implementation of the HiCUP-Pipeline from the Bioinformatics Babraham Institute. See http://www.bioinformatics.babraham.ac.uk/projects/hicup/.
   * [hicexplorer_hicsummatrices](https://toolshed.g2.bx.psu.edu/view/bgruening/hicexplorer_hicsummatrices):  Wrapper for the deepTools: hicSumMatrices. 
   * [hicexplorer_hicplottads](https://toolshed.g2.bx.psu.edu/view/bgruening/hicexplorer_hicplottads):  Wrapper for the deepTools: hicPlotTADs. 
   * [hicexplorer_hiccorrelate](https://toolshed.g2.bx.psu.edu/view/bgruening/hicexplorer_hiccorrelate):  Wrapper for the deepTools: hicCorrelate. 
   * [hicup_digester](https://toolshed.g2.bx.psu.edu/view/bgruening/hicup_digester):  Wrapper for the HiCUP suite tool: Hicup Digester. A galaxy wrapper implementation of the HiCUP-Pipeline from the Bioinformatics Babraham Institute. See http://www.bioinformatics.babraham.ac.uk/projects/hicup/.
   * [hicexplorer_hicplotdistvscounts](https://toolshed.g2.bx.psu.edu/view/bgruening/hicexplorer_hicplotdistvscounts):  Wrapper for the deepTools: hicPlotDistVsCounts. 
   * [hicup_deduplicator](https://toolshed.g2.bx.psu.edu/view/bgruening/hicup_deduplicator):  Wrapper for the HiCUP suite tool: Hicup Deduplicator. A galaxy wrapper implementation of the HiCUP-Pipeline from the Bioinformatics Babraham Institute. See http://www.bioinformatics.babraham.ac.uk/projects/hicup/.
   * [hicup_mapper](https://toolshed.g2.bx.psu.edu/view/bgruening/hicup_mapper):  Wrapper for the HiCUP suite tool: Hicup Mapper. A galaxy wrapper implementation of the HiCUP-Pipeline from the Bioinformatics Babraham Institute. See http://www.bioinformatics.babraham.ac.uk/projects/hicup/.
   * [hicexplorer_hicbuildmatrix](https://toolshed.g2.bx.psu.edu/view/bgruening/hicexplorer_hicbuildmatrix):  Wrapper for the deepTools: hicBuildMatrix. 
   * [hicexplorer_hicplotmatrix](https://toolshed.g2.bx.psu.edu/view/bgruening/hicexplorer_hicplotmatrix):  Wrapper for the deepTools: hicPlotMatrix. 
   * [hicexplorer_hicfindtads](https://toolshed.g2.bx.psu.edu/view/bgruening/hicexplorer_hicfindtads):  Wrapper for the deepTools: hicFindTADs. 
   * [hicup_truncater](https://toolshed.g2.bx.psu.edu/view/bgruening/hicup_truncater):  Wrapper for the HiCUP suite tool: Hicup Truncater. A galaxy wrapper implementation of the HiCUP-Pipeline from the Bioinformatics Babraham Institute. See http://www.bioinformatics.babraham.ac.uk/projects/hicup/.
* *From [mvdbeek](https://toolshed.g2.bx.psu.edu/view/mvdbeek):*
   * [damidseq_core](https://toolshed.g2.bx.psu.edu/view/mvdbeek/damidseq_core):  An automated pipeline for processing DamID sequencing datasets. Processing DamID-seq data involves extending single-end reads, aligning the  reads to the genome and determining the coverage, similar to processing  regular ChIP-seq datasets. However, as DamID data is represented as a log2  ratio of (Dam-fusion/Dam), normalisation of the sample and Dam-only control  is necessary and adding pseudocounts to mitigate the effect of background  counts is highly recommended.    damidseq_pipeline is a single script that automatically handles sequence  alignment, read extension, binned counts, normalisation, pseudocount  addition and final ratio file generation. The script uses FASTQ or BAM  files as input, and outputs the final log2 ratio files in bedGraph (or  optionally GFF) format.    The output ratio files can easily be converted to TDF for viewing in IGV  using igvtools. The files can be processed for peak calling using  find_peaks or, if using RNA pol II DamID, transcribed genes can be  determined using polii.gene.call.
* *From [rnateam](https://toolshed.g2.bx.psu.edu/view/rnateam):*
   * [rnalien](https://toolshed.g2.bx.psu.edu/view/rnateam/rnalien):  RNAlien unsupervized RNA family model construction. Determining  the  function  of  a  non-coding RNA  requires  costly  and  time-consuming  wet-lab  experiments.  For  this  reason,  computational  methods  which  ascertain  the  homology  of  a  sequence  and  thereby deduce functionality and family membership  are often exploited. In this fashion, newly sequenced  genomes can be annotated in a completely computational way. Covariance models are commonly used to  assign novel RNA sequences to a known RNA family.  However, to construct such models several examples  of  the  family  have  to  be  already  known.  Moreover,  model  building  is  the  work  of  experts  who  manually edit the necessary  RNA alignment and consensus structure. Our method,  RNAlien, starting from a single input sequence collects potential family  member sequences by multiple iterations of homology  search.  RNA family  models  are  fully  automatically constructed  for the found sequences. We have tested our method on a subset of the  Rfam RNA family  database. RNAlien models  are  a  starting  point  to  construct  models  of  comparable  sensitivity  and  specificity to manually curated ones from the Rfam database.  RNAlien Tool and web server are available at.
   * [selectsequencesfrommsa](https://toolshed.g2.bx.psu.edu/view/rnateam/selectsequencesfrommsa):  SelectSequences - selects representative entries from a multiple sequence alignment in clustal format. Tool to select representative sequences from a multiple sequence alignment in clustal format.  Useful before running RNAz, RNAcode, RNAalifold on alignments with many entries.
* *From [earlhaminst](https://toolshed.g2.bx.psu.edu/view/earlhaminst):*
   * [ensembl_longest_cds_per_gene](https://toolshed.g2.bx.psu.edu/view/earlhaminst/ensembl_longest_cds_per_gene):  Select longest CDS per gene from Ensembl CDS FASTA. 
   * [gstf_preparation](https://toolshed.g2.bx.psu.edu/view/earlhaminst/gstf_preparation):  GeneSeqToFamily preparation converts data for the workflow. Converts a set of GFF3 and/or JSON gene feature information datasets into SQLite format and modify the header lines of a corresponding CDS FASTA to be used with the GeneSeqToFamily workflow.
* *From [ethevenot](https://toolshed.g2.bx.psu.edu/view/ethevenot):*
   * [profia](https://toolshed.g2.bx.psu.edu/view/ethevenot/profia):  [W4M][Metabolomics][FIA-HRMS] Preprocessing of Flow Injection Analysis coupled to High-Resolution Mass Spectrometry (FIA-HRMS) data. "Flow Injection Analysis coupled to High-Resolution Mass Spectrometry (FIA-HRMS)" is a promising approach for "high-throughput metabolomics". FIA- HRMS data, however, cannot be preprocessed with current software tools which rely on liquid chromatography separation, or handle low resolution data only.  The "proFIA module" is a workflow allowing to preprocess FIA-HRMS raw data in "centroid" mode and open format (netCDF, mzData, mzXML, and mzML), and generates the table of peak intensities ("peak table"). The workflow consists in "peak detection and quantification" within individual sample files, followed by "alignment" between files in the mz dimension, and "imputation" of the missing values in the final peak table (Delabriere et al., submitted). For each ion, the graph representing the intensity as a function of time is called a "flowgram". A flowgram can be modeled as I = kP + ME(P) + B + e, where k is the response factor (corresponding to the ionization properties of the analyte), P is the "sample peak" (normalized profile which is common for all analytes from a sample and depends on the flow injection conditions only), ME is the "matrix effect", B is the "solvent baseline", and e is the heteroscedastic noise. The generated peak table is available in the "3 table" W4M tabular format ("dataMatrix", "sampleMetadata", and "variableMetadata") for downstream statistical analysis and annotation with W4M modules. A figure provides "diagnostics" and visualization of the preprocessed data set.
* *From [xuebing](https://toolshed.g2.bx.psu.edu/view/xuebing):*
   * [kplogo](https://toolshed.g2.bx.psu.edu/view/xuebing/kplogo):  kpLogo. kpLogo: k-mer probability logo for positional k-mer analysis.
* *From [nml](https://toolshed.g2.bx.psu.edu/view/nml):*
   * [sistr_cmd](https://toolshed.g2.bx.psu.edu/view/nml/sistr_cmd):  SISTR in silico serotyping tool. 
* *From [iuc](https://toolshed.g2.bx.psu.edu/view/iuc):*
   * [metaphlan_hclust_heatmap](https://toolshed.g2.bx.psu.edu/view/iuc/metaphlan_hclust_heatmap):  Wrapper for the metaphlan2 tool suite: Generate heatmap. MetaPhlAn is a computational tool for profiling the composition of microbial  communities (Bacteria, Archaea, Eukaryotes and Viruses) from metagenomic shotgun  sequencing data with species level resolution.
   * [humann2_reduce_table](https://toolshed.g2.bx.psu.edu/view/iuc/humann2_reduce_table):  Wrapper for the humann2 tool suite: Reduce. HUMAnN is a pipeline for efficiently and accurately profiling the presence/absence and abundance of microbial pathways   in a community from metagenomic or metatranscriptomic sequencing data (typically millions of short DNA/RNA reads).   This process, referred to as functional profiling, aims to describe the metabolic potential of a microbial community   and its members. More generally, functional profiling answers the question "What are the microbes in my community-of-interest   doing (or capable of doing)?".
   * [humann2](https://toolshed.g2.bx.psu.edu/view/iuc/humann2):  Wrapper for the humann2 tool suite: HUMAnN2. 
   * [export2graphlan](https://toolshed.g2.bx.psu.edu/view/iuc/export2graphlan):  export2graphlan is a conversion software tool for producing both annotation and tree file for GraPhlAn. 
   * [metaphlan2krona](https://toolshed.g2.bx.psu.edu/view/iuc/metaphlan2krona):  Wrapper for the metaphlan2 tool suite: Format MetaPhlAn2. MetaPhlAn is a computational tool for profiling the composition of microbial  communities (Bacteria, Archaea, Eukaryotes and Viruses) from metagenomic shotgun  sequencing data with species level resolution.
   * [graphlan_annotate](https://toolshed.g2.bx.psu.edu/view/iuc/graphlan_annotate):  Wrapper for the GraPhlAn tool suite: Generation, personalization and annotation of tree. 
   * [bayescan](https://toolshed.g2.bx.psu.edu/view/iuc/bayescan):  Detecting natural selection from population-based genetic data. 
   * [data_manager_metaphlan2_database_downloader](https://toolshed.g2.bx.psu.edu/view/iuc/data_manager_metaphlan2_database_downloader):  MetaPhlAn for Metagenomic Phylogenetic Analysis. MetaPhlAn is a computational tool for profiling the composition of microbial  communities (Bacteria, Archaea, Eukaryotes and Viruses) from metagenomic shotgun  sequencing data with species level resolution.
   * [data_manager_humann2_database_downloader](https://toolshed.g2.bx.psu.edu/view/iuc/data_manager_humann2_database_downloader):  HUMAnN2 for functionally profiling metagenomes and metatranscriptomes at species-level resolution. 
   * [humann2_split_table](https://toolshed.g2.bx.psu.edu/view/iuc/humann2_split_table):  Wrapper for the humann2 tool suite: Split. 
   * [humann2_regroup_table](https://toolshed.g2.bx.psu.edu/view/iuc/humann2_regroup_table):  Wrapper for the humann2 tool suite: Regroup. 
   * [multigps](https://toolshed.g2.bx.psu.edu/view/iuc/multigps):  MultiGPS is a framework for analyzing collections of multi-condition ChIP-seq datasets and characterizing differential binding events between conditions. MultiGPS is a framework for analyzing collections of multi-condition ChIP-seq datasets and characterizing differential binding events between conditions. In analyzing multiple-condition ChIP-seq datasets, MultiGPS encourages consistency in the reported binding event locations across conditions and provides accurate estimation of ChIP enrichment levels at each event.
   * [humann2_rename_table](https://toolshed.g2.bx.psu.edu/view/iuc/humann2_rename_table):  Wrapper for the humann2 tool suite: Rename. 
   * [humann2_renorm_table](https://toolshed.g2.bx.psu.edu/view/iuc/humann2_renorm_table):  Wrapper for the humann2 tool suite: Renormalize. 
   * [graphlan](https://toolshed.g2.bx.psu.edu/view/iuc/graphlan):  Wrapper for the GraPhlAn tool suite: GraPhlAn. 
   * [humann2_join_tables](https://toolshed.g2.bx.psu.edu/view/iuc/humann2_join_tables):  Wrapper for the humann2 tool suite: Join. 
   * [trinity_contig_exn50_statistic](https://toolshed.g2.bx.psu.edu/view/iuc/trinity_contig_exn50_statistic):  Compute contig Ex90N50 statistic and Ex90 transcript count (from the Trinity tool suite). Trinity represents a method for the efficient and robust de novo reconstruction of transcriptomes from RNA-seq data    https://github.com/trinityrnaseq/trinityrnaseq.
   * [metaphlan2](https://toolshed.g2.bx.psu.edu/view/iuc/metaphlan2):  Wrapper for the metaphlan2 tool suite: MetaPhlAn2. MetaPhlAn is a computational tool for profiling the composition of microbial  communities (Bacteria, Archaea, Eukaryotes and Viruses) from metagenomic shotgun  sequencing data with species level resolution.
   * [merge_metaphlan_tables](https://toolshed.g2.bx.psu.edu/view/iuc/merge_metaphlan_tables):  Wrapper for the metaphlan2 tool suite: Merge. MetaPhlAn is a computational tool for profiling the composition of microbial  communities (Bacteria, Archaea, Eukaryotes and Viruses) from metagenomic shotgun  sequencing data with species level resolution.
* *From [antmarge](https://toolshed.g2.bx.psu.edu/view/antmarge):*
   * [regionfitness](https://toolshed.g2.bx.psu.edu/view/antmarge/regionfitness):  Calculates fitness over a region for Tn-Seq data. 
   * [dataoverview](https://toolshed.g2.bx.psu.edu/view/antmarge/dataoverview):  Tn-Seq analysis tool for getting data overview. 
   * [singlefitness](https://toolshed.g2.bx.psu.edu/view/antmarge/singlefitness):  single fitness aggregate for Tn-Seq data. Calculates fitness for single mutation aggregated across several libraries. Developed for Tn-Seq data.
   * [compgenes](https://toolshed.g2.bx.psu.edu/view/antmarge/compgenes):  Tn-Seq tool to compare gene fitness from two aggregate fitness files. 
   * [compstrains](https://toolshed.g2.bx.psu.edu/view/antmarge/compstrains):  Tn-Seq tool for comparing strains from aggregate fitness. 
   * [compregions](https://toolshed.g2.bx.psu.edu/view/antmarge/compregions):  Tn-Seq analysis for comparing regions created by regionfitness. 
* *From [jamille](https://toolshed.g2.bx.psu.edu/view/jamille):*
   * [jamille](https://toolshed.g2.bx.psu.edu/view/jamille/jamille):  gfftogtf. Bla.
* *From [mingchen0919](https://toolshed.g2.bx.psu.edu/view/mingchen0919):*
   * [mingchen0919_r_library_2](https://toolshed.g2.bx.psu.edu/view/mingchen0919/mingchen0919_r_library_2):  mingchen0919 r library 2. mingchen0919 r library 2.
   * [mingchen0919_r_library_1](https://toolshed.g2.bx.psu.edu/view/mingchen0919/mingchen0919_r_library_1):  mingchen0919 r library. mingchen0919 r library.
* *From [marie-tremblay-metatoul](https://toolshed.g2.bx.psu.edu/view/marie-tremblay-metatoul):*
   * [normalization](https://toolshed.g2.bx.psu.edu/view/marie-tremblay-metatoul/normalization):  Normalization (operation applied on each individual spectrum) of preprocessed data. Part of the W4M project: http://workflow4metabolomics.org.
* *From [drosofff](https://toolshed.g2.bx.psu.edu/view/drosofff):*
   * [fishertest](https://toolshed.g2.bx.psu.edu/view/drosofff/fishertest):  Fisher's exact test on two-column hit lists. Fisher's exact test on two-column hit lists.
* *From [chaimae_eljaouhari](https://toolshed.g2.bx.psu.edu/view/chaimae_eljaouhari):*
   * [basicplot](https://toolshed.g2.bx.psu.edu/view/chaimae_eljaouhari/basicplot):  Graphics. Take on tabular file of numerical data as input and produces pairwise plots of numerical data, in log-log scale.
* *From [jjohnson](https://toolshed.g2.bx.psu.edu/view/jjohnson):*
   * [split_tabular_columns](https://toolshed.g2.bx.psu.edu/view/jjohnson/split_tabular_columns):  Split list colomns to normalize tabular files. Normalize tabular files which have columns with lists.  Rows with lists in a column will be duplicated for each   item in the list.    The target use case is for proteomics Peptide Spectrum Match   search outputs with a list of protein accessions in a column.
* *From [galaxyp](https://toolshed.g2.bx.psu.edu/view/galaxyp):*
   * [openms_falsediscoveryrate](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_falsediscoveryrate):  Wrapper for the OpenMS suite tool: FalseDiscoveryRate. OpenMS is an open-source software C++ library for LC/MS data management and analyses. It offers an infrastructure for the rapid development of mass spectrometry related software.  https://www.openms.de/.
   * [openms_cvinspector](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_cvinspector):  Wrapper for the OpenMS suite tool: CVInspector. 
   * [openms_lowmempeakpickerhires](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_lowmempeakpickerhires):  Wrapper for the OpenMS suite tool: LowMemPeakPickerHiRes. 
   * [openms_spectrafilterthresholdmower](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_spectrafilterthresholdmower):  Wrapper for the OpenMS suite tool: SpectraFilterThresholdMower. 
   * [openms_featurefinderisotopewavelet](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_featurefinderisotopewavelet):  Wrapper for the OpenMS suite tool: FeatureFinderIsotopeWavelet. 
   * [openms_precursorionselector](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_precursorionselector):  Wrapper for the OpenMS suite tool: PrecursorIonSelector. 
   * [openms_qcembedder](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_qcembedder):  Wrapper for the OpenMS suite tool: QCEmbedder. 
   * [openms_fileconverter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_fileconverter):  Wrapper for the OpenMS suite tool: FileConverter. 
   * [openms_spectrafilterparentpeakmower](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_spectrafilterparentpeakmower):  Wrapper for the OpenMS suite tool: SpectraFilterParentPeakMower. 
   * [openms_idmapper](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_idmapper):  Wrapper for the OpenMS suite tool: IDMapper. 
   * [openms_simplesearchengine](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_simplesearchengine):  Wrapper for the OpenMS suite tool: SimpleSearchEngine. 
   * [openms_openswathworkflow](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_openswathworkflow):  Wrapper for the OpenMS suite tool: OpenSwathWorkflow. 
   * [openms_mztabexporter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_mztabexporter):  Wrapper for the OpenMS suite tool: MzTabExporter. 
   * [openms_metaprosip](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_metaprosip):  Wrapper for the OpenMS suite tool: MetaProSIP. 
   * [openms_baselinefilter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_baselinefilter):  Wrapper for the OpenMS suite tool: BaselineFilter. 
   * [openms_inspectadapter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_inspectadapter):  Wrapper for the OpenMS suite tool: InspectAdapter. 
   * [openms_peakpickerwavelet](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_peakpickerwavelet):  Wrapper for the OpenMS suite tool: PeakPickerWavelet. 
   * [openms_mrmtransitiongrouppicker](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_mrmtransitiongrouppicker):  Wrapper for the OpenMS suite tool: MRMTransitionGroupPicker. 
   * [openms_decoydatabase](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_decoydatabase):  Wrapper for the OpenMS suite tool: DecoyDatabase. 
   * [openms_idextractor](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_idextractor):  Wrapper for the OpenMS suite tool: IDExtractor. 
   * [openms_openswathrewritetofeaturexml](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_openswathrewritetofeaturexml):  Wrapper for the OpenMS suite tool: OpenSwathRewriteToFeatureXML. 
   * [openms_spectrafilterscaler](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_spectrafilterscaler):  Wrapper for the OpenMS suite tool: SpectraFilterScaler. 
   * [openms_openswathfilesplitter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_openswathfilesplitter):  Wrapper for the OpenMS suite tool: OpenSwathFileSplitter. 
   * [openms_fidoadapter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_fidoadapter):  Wrapper for the OpenMS suite tool: FidoAdapter. 
   * [openms_ptpredict](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_ptpredict):  Wrapper for the OpenMS suite tool: PTPredict. 
   * [openms_tmtanalyzer](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_tmtanalyzer):  Wrapper for the OpenMS suite tool: TMTAnalyzer. 
   * [openms_idscoreswitcher](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_idscoreswitcher):  Wrapper for the OpenMS suite tool: IDScoreSwitcher. 
   * [openms_mzmlsplitter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_mzmlsplitter):  Wrapper for the OpenMS suite tool: MzMLSplitter. 
   * [openms_speclibcreator](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_speclibcreator):  Wrapper for the OpenMS suite tool: SpecLibCreator. 
   * [openms_qcimporter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_qcimporter):  Wrapper for the OpenMS suite tool: QCImporter. 
   * [openms_rtpredict](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_rtpredict):  Wrapper for the OpenMS suite tool: RTPredict. 
   * [openms_masstraceextractor](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_masstraceextractor):  Wrapper for the OpenMS suite tool: MassTraceExtractor. 
   * [openms_xmlvalidator](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_xmlvalidator):  Wrapper for the OpenMS suite tool: XMLValidator. 
   * [openms_rnpxlxicfilter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_rnpxlxicfilter):  Wrapper for the OpenMS suite tool: RNPxlXICFilter. 
   * [openms_ffeval](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_ffeval):  Wrapper for the OpenMS suite tool: FFEval. 
   * [openms_proteininference](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_proteininference):  Wrapper for the OpenMS suite tool: ProteinInference. 
   * [openms_mascotadapteronline](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_mascotadapteronline):  Wrapper for the OpenMS suite tool: MascotAdapterOnline. 
   * [openms_featurefindermetabo](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_featurefindermetabo):  Wrapper for the OpenMS suite tool: FeatureFinderMetabo. 
   * [openms_xtandemadapter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_xtandemadapter):  Wrapper for the OpenMS suite tool: XTandemAdapter. 
   * [openms_featurelinkerlabeled](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_featurelinkerlabeled):  Wrapper for the OpenMS suite tool: FeatureLinkerLabeled. 
   * [openms_openswathassaygenerator](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_openswathassaygenerator):  Wrapper for the OpenMS suite tool: OpenSwathAssayGenerator. 
   * [openms_proteinquantifier](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_proteinquantifier):  Wrapper for the OpenMS suite tool: ProteinQuantifier. 
   * [openms_masscalculator](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_masscalculator):  Wrapper for the OpenMS suite tool: MassCalculator. 
   * [openms_spectrafilterbernnorm](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_spectrafilterbernnorm):  Wrapper for the OpenMS suite tool: SpectraFilterBernNorm. 
   * [openms_converttramltotsv](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_converttramltotsv):  Wrapper for the OpenMS suite tool: ConvertTraMLToTSV. 
   * [openms_noisefiltergaussian](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_noisefiltergaussian):  Wrapper for the OpenMS suite tool: NoiseFilterGaussian. 
   * [openms_idconflictresolver](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_idconflictresolver):  Wrapper for the OpenMS suite tool: IDConflictResolver. 
   * [openms_idsplitter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_idsplitter):  Wrapper for the OpenMS suite tool: IDSplitter. 
   * [openms_qcextractor](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_qcextractor):  Wrapper for the OpenMS suite tool: QCExtractor. 
   * [openms_rtmodel](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_rtmodel):  Wrapper for the OpenMS suite tool: RTModel. 
   * [openms_isobaricanalyzer](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_isobaricanalyzer):  Wrapper for the OpenMS suite tool: IsobaricAnalyzer. 
   * [openms_noisefiltersgolay](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_noisefiltersgolay):  Wrapper for the OpenMS suite tool: NoiseFilterSGolay. 
   * [meta_proteome_analyzer](https://toolshed.g2.bx.psu.edu/view/galaxyp/meta_proteome_analyzer):  MetaProteomeAnalyzer. MPA Portable is a light-weight and stand-alone software for the identification of proteins   and in-depth analysis of metaproteomics (and also proteomics) data.   The MPA software currently supports the database search engines Comet, MS-GF+ and X!Tandem   taking MGF spectrum files as input data. User-provided FASTA databases   (preferably downloaded from UniProtKB) are formatted automatically.     https://github.com/compomics/meta-proteome-analyzer/.
   * [openms_externalcalibration](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_externalcalibration):  Wrapper for the OpenMS suite tool: ExternalCalibration. 
   * [openms_featurelinkerunlabeledqt](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_featurelinkerunlabeledqt):  Wrapper for the OpenMS suite tool: FeatureLinkerUnlabeledQT. 
   * [openms_openswathmzmlfilecacher](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_openswathmzmlfilecacher):  Wrapper for the OpenMS suite tool: OpenSwathMzMLFileCacher. 
   * [openms_mrmpairfinder](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_mrmpairfinder):  Wrapper for the OpenMS suite tool: MRMPairFinder. 
   * [openms_openswathanalyzer](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_openswathanalyzer):  Wrapper for the OpenMS suite tool: OpenSwathAnalyzer. 
   * [openms_openswathdiaprescoring](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_openswathdiaprescoring):  Wrapper for the OpenMS suite tool: OpenSwathDIAPreScoring. 
   * [openms_openswathrtnormalizer](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_openswathrtnormalizer):  Wrapper for the OpenMS suite tool: OpenSwathRTNormalizer. 
   * [openms_featurefindermultiplex](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_featurefindermultiplex):  Wrapper for the OpenMS suite tool: FeatureFinderMultiplex. 
   * [openms_spectrafilternormalizer](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_spectrafilternormalizer):  Wrapper for the OpenMS suite tool: SpectraFilterNormalizer. 
   * [openms_spectrafilterwindowmower](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_spectrafilterwindowmower):  Wrapper for the OpenMS suite tool: SpectraFilterWindowMower. 
   * [openms_topperc](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_topperc):  Wrapper for the OpenMS suite tool: TopPerc. 
   * [openms_filefilter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_filefilter):  Wrapper for the OpenMS suite tool: FileFilter. 
   * [openms_additiveseries](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_additiveseries):  Wrapper for the OpenMS suite tool: AdditiveSeries. 
   * [openms_idmassaccuracy](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_idmassaccuracy):  Wrapper for the OpenMS suite tool: IDMassAccuracy. 
   * [openms_idfilter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_idfilter):  Wrapper for the OpenMS suite tool: IDFilter. 
   * [openms_phosphoscoring](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_phosphoscoring):  Wrapper for the OpenMS suite tool: PhosphoScoring. 
   * [openms_multiplexresolver](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_multiplexresolver):  Wrapper for the OpenMS suite tool: MultiplexResolver. 
   * [openms_spectrafiltersqrtmower](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_spectrafiltersqrtmower):  Wrapper for the OpenMS suite tool: SpectraFilterSqrtMower. 
   * [openms_qccalculator](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_qccalculator):  Wrapper for the OpenMS suite tool: QCCalculator. 
   * [openms_openswathconfidencescoring](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_openswathconfidencescoring):  Wrapper for the OpenMS suite tool: OpenSwathConfidenceScoring. 
   * [openms_featurefindermrm](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_featurefindermrm):  Wrapper for the OpenMS suite tool: FeatureFinderMRM. 
   * [openms_fileinfo](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_fileinfo):  Wrapper for the OpenMS suite tool: FileInfo. 
   * [openms_peptideindexer](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_peptideindexer):  Wrapper for the OpenMS suite tool: PeptideIndexer. 
   * [openms_spectramerger](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_spectramerger):  Wrapper for the OpenMS suite tool: SpectraMerger. 
   * [openms_featurefinderidentification](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_featurefinderidentification):  Wrapper for the OpenMS suite tool: FeatureFinderIdentification. 
   * [openms_spectrafiltermarkermower](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_spectrafiltermarkermower):  Wrapper for the OpenMS suite tool: SpectraFilterMarkerMower. 
   * [openms_transformationevaluation](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_transformationevaluation):  Wrapper for the OpenMS suite tool: TransformationEvaluation. 
   * [openms_ticcalculator](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_ticcalculator):  Wrapper for the OpenMS suite tool: TICCalculator. 
   * [openms_demeanderize](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_demeanderize):  Wrapper for the OpenMS suite tool: DeMeanderize. 
   * [openms_peakpickeriterative](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_peakpickeriterative):  Wrapper for the OpenMS suite tool: PeakPickerIterative. 
   * [openms_qcmerger](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_qcmerger):  Wrapper for the OpenMS suite tool: QCMerger. 
   * [openms_converttsvtotraml](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_converttsvtotraml):  Wrapper for the OpenMS suite tool: ConvertTSVToTraML. 
   * [openms_filemerger](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_filemerger):  Wrapper for the OpenMS suite tool: FileMerger. 
   * [openms_precursormasscorrector](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_precursormasscorrector):  Wrapper for the OpenMS suite tool: PrecursorMassCorrector. 
   * [openms_mrmmapper](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_mrmmapper):  Wrapper for the OpenMS suite tool: MRMMapper. 
   * [openms_digestor](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_digestor):  Wrapper for the OpenMS suite tool: Digestor. 
   * [openms_digestormotif](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_digestormotif):  Wrapper for the OpenMS suite tool: DigestorMotif. 
   * [openms_tofcalibration](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_tofcalibration):  Wrapper for the OpenMS suite tool: TOFCalibration. 
   * [openms_itraqanalyzer](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_itraqanalyzer):  Wrapper for the OpenMS suite tool: ITRAQAnalyzer. 
   * [openms_compnovo](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_compnovo):  Wrapper for the OpenMS suite tool: CompNovo. 
   * [openms_accuratemasssearch](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_accuratemasssearch):  Wrapper for the OpenMS suite tool: AccurateMassSearch. 
   * [openms_mapnormalizer](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_mapnormalizer):  Wrapper for the OpenMS suite tool: MapNormalizer. 
   * [openms_msgfplusadapter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_msgfplusadapter):  Wrapper for the OpenMS suite tool: MSGFPlusAdapter. 
   * [openms_semanticvalidator](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_semanticvalidator):  Wrapper for the OpenMS suite tool: SemanticValidator. 
   * [openms_labeledeval](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_labeledeval):  Wrapper for the OpenMS suite tool: LabeledEval. 
   * [openms_dtaextractor](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_dtaextractor):  Wrapper for the OpenMS suite tool: DTAExtractor. 
   * [openms_rnpxl](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_rnpxl):  Wrapper for the OpenMS suite tool: RNPxl. 
   * [openms_featurefindersuperhirn](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_featurefindersuperhirn):  Wrapper for the OpenMS suite tool: FeatureFinderSuperHirn. 
   * [openms_metabolitespectralmatcher](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_metabolitespectralmatcher):  Wrapper for the OpenMS suite tool: MetaboliteSpectralMatcher. 
   * [openms_idfileconverter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_idfileconverter):  Wrapper for the OpenMS suite tool: IDFileConverter. 
   * [openms_qcexporter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_qcexporter):  Wrapper for the OpenMS suite tool: QCExporter. 
   * [openms_iddecoyprobability](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_iddecoyprobability):  Wrapper for the OpenMS suite tool: IDDecoyProbability. 
   * [openms_ptmodel](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_ptmodel):  Wrapper for the OpenMS suite tool: PTModel. 
   * [openms_highresprecursormasscorrector](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_highresprecursormasscorrector):  Wrapper for the OpenMS suite tool: HighResPrecursorMassCorrector. 
   * [openms_decharger](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_decharger):  Wrapper for the OpenMS suite tool: Decharger. 
   * [openms_peakpickerhires](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_peakpickerhires):  Wrapper for the OpenMS suite tool: PeakPickerHiRes. 
   * [openms_rtevaluation](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_rtevaluation):  Wrapper for the OpenMS suite tool: RTEvaluation. 
   * [openms_maprttransformer](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_maprttransformer):  Wrapper for the OpenMS suite tool: MapRTTransformer. 
   * [openms_erpairfinder](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_erpairfinder):  Wrapper for the OpenMS suite tool: ERPairFinder. 
   * [openms_mssimulator](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_mssimulator):  Wrapper for the OpenMS suite tool: MSSimulator. 
   * [openms_openswathchromatogramextractor](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_openswathchromatogramextractor):  Wrapper for the OpenMS suite tool: OpenSwathChromatogramExtractor. 
   * [openms_lowmempeakpickerhires_randomaccess](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_lowmempeakpickerhires_randomaccess):  Wrapper for the OpenMS suite tool: LowMemPeakPickerHiRes_RandomAccess. 
   * [openms_textexporter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_textexporter):  Wrapper for the OpenMS suite tool: TextExporter. 
   * [openms_idrtcalibration](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_idrtcalibration):  Wrapper for the OpenMS suite tool: IDRTCalibration. 
   * [openms_openswathfeaturexmltotsv](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_openswathfeaturexmltotsv):  Wrapper for the OpenMS suite tool: OpenSwathFeatureXMLToTSV. 
   * [openms_idposteriorerrorprobability](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_idposteriorerrorprobability):  Wrapper for the OpenMS suite tool: IDPosteriorErrorProbability. 
   * [openms_featurelinkerunlabeled](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_featurelinkerunlabeled):  Wrapper for the OpenMS suite tool: FeatureLinkerUnlabeled. 
   * [openms_fuzzydiff](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_fuzzydiff):  Wrapper for the OpenMS suite tool: FuzzyDiff. 
   * [openms_internalcalibration](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_internalcalibration):  Wrapper for the OpenMS suite tool: InternalCalibration. 
   * [openms_spectrafilternlargest](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_spectrafilternlargest):  Wrapper for the OpenMS suite tool: SpectraFilterNLargest. 
   * [openms_consensusid](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_consensusid):  Wrapper for the OpenMS suite tool: ConsensusID. 
   * [openms_mapalignmentevaluation](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_mapalignmentevaluation):  Wrapper for the OpenMS suite tool: MapAlignmentEvaluation. 
   * [abrf2017_workshop](https://toolshed.g2.bx.psu.edu/view/galaxyp/abrf2017_workshop):  ABRF2017 Metaproteomic Workshop Workflows. Workflows for metaproteome taxonomic and functional analysis.
   * [openms_mapstatistics](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_mapstatistics):  Wrapper for the OpenMS suite tool: MapStatistics. 
   * [openms_featurefindercentroided](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_featurefindercentroided):  Wrapper for the OpenMS suite tool: FeatureFinderCentroided. 
   * [openms_inclusionexclusionlistcreator](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_inclusionexclusionlistcreator):  Wrapper for the OpenMS suite tool: InclusionExclusionListCreator. 
   * [custom_pro_db](https://toolshed.g2.bx.psu.edu/view/galaxyp/custom_pro_db):  CustomProDB. CustomProDB creates custom protein databases based on transcriptome/exosome expression (BAM files), including variants from SNPs, INDELs, and novel junctions (VCF files).
   * [openms_openswathdecoygenerator](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_openswathdecoygenerator):  Wrapper for the OpenMS suite tool: OpenSwathDecoyGenerator. 
   * [openms_idripper](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_idripper):  Wrapper for the OpenMS suite tool: IDRipper. 
   * [openms_qcshrinker](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_qcshrinker):  Wrapper for the OpenMS suite tool: QCShrinker. 
   * [openms_mascotadapter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_mascotadapter):  Wrapper for the OpenMS suite tool: MascotAdapter. 
   * [openms_proteinresolver](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_proteinresolver):  Wrapper for the OpenMS suite tool: ProteinResolver. 
   * [openms_luciphoradapter](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_luciphoradapter):  Wrapper for the OpenMS suite tool: LuciphorAdapter. 
   * [custom_pro_db_annotation_data_manager](https://toolshed.g2.bx.psu.edu/view/galaxyp/custom_pro_db_annotation_data_manager):  CustomProDB Annotation. Retrieves annotation for a given UCSC dbKey and creates annotation suitable for input to customProDB and proBAMr.
   * [openms_compnovocid](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_compnovocid):  Wrapper for the OpenMS suite tool: CompNovoCID. 
   * [openms_sequencecoveragecalculator](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_sequencecoveragecalculator):  Wrapper for the OpenMS suite tool: SequenceCoverageCalculator. 
   * [openms_eicextractor](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_eicextractor):  Wrapper for the OpenMS suite tool: EICExtractor. 
   * [openms_idmerger](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_idmerger):  Wrapper for the OpenMS suite tool: IDMerger. 
   * [openms_svmtheoreticalspectrumgeneratortrainer](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_svmtheoreticalspectrumgeneratortrainer):  Wrapper for the OpenMS suite tool: SvmTheoreticalSpectrumGeneratorTrainer. 
   * [openms_consensusmapnormalizer](https://toolshed.g2.bx.psu.edu/view/galaxyp/openms_consensusmapnormalizer):  Wrapper for the OpenMS suite tool: ConsensusMapNormalizer. 

### tool_dependency_definition

* *From [antmarge](https://toolshed.g2.bx.psu.edu/view/antmarge):*
   * [package_perl_file_path](https://toolshed.g2.bx.psu.edu/view/antmarge/package_perl_file_path):  File::Path - Perl module to create or remove directory trees. http://perldoc.perl.org/File/Path.html.
   * [package_perl_getoptlong](https://toolshed.g2.bx.psu.edu/view/antmarge/package_perl_getoptlong):  Perl package that allows option parsing. http://search.cpan.org/~jv/Getopt-Long-2.49.1/lib/Getopt/Long.pm.
   * [package_perl_statistics_distributions](https://toolshed.g2.bx.psu.edu/view/antmarge/package_perl_statistics_distributions):  Perl functionality for creating statistical distributions. http://search.cpan.org/~mikek/Statistics-Distributions-1.02/Distributions.pm.
   * [package_perl_exporter](https://toolshed.g2.bx.psu.edu/view/antmarge/package_perl_exporter):  Exporter, dependency for other perl packages (including list binary search). Exporter, dependency for other perl packages (including list binary search).  http://search.cpan.org/~toddr/Exporter-5.72/lib/Exporter.pm.
   * [package_perl_datarandom](https://toolshed.g2.bx.psu.edu/view/antmarge/package_perl_datarandom):  Perl tool for random data generation. 
   * [package_perl_list_binarysearch](https://toolshed.g2.bx.psu.edu/view/antmarge/package_perl_list_binarysearch):  Perl package for fast list manipulations. http://search.cpan.org/CPAN/authors/id/D/DA/DAVIDO/List-BinarySearch-0.25.tar.gz.
   * [package_perl_file_basename](https://toolshed.g2.bx.psu.edu/view/antmarge/package_perl_file_basename):  Perl module to extract just the filename from a path. http://search.cpan.org/dist/perl-5.8.6/lib/File/Basename.pm.

