---
title: Galaxy CLIP-Seq
components: true
---

<slot name="/bare/eu/usegalaxy/notices" />

# Galaxy CLIP-Explorer

Welcome to the Galaxy CLIP-Explorer -- a webserver to process, analyse and visualise CLIP-Seq data.

![](https://clipseq.usegalaxy.eu/assets/media/cover_design_clipseq.png)

## 1. Getting Started with Galaxy CLIP-Explorer

**Are you new to Galaxy?** Are your returning after a long time, and looking for help to get started? Then take <a target="_parent" href="https://hicexplorer.usegalaxy.eu/tours/core.galaxy_ui">a guided tour</a> through the user interface of Galaxy.

You have CLIP-Seq data, but you need some **guidance for the CLIP-Seq data anlysis**? Take a look at the CLIP-Seq data analysis tutorial on the <a target="_parent" href="https://galaxyproject.github.io/training-material/topics/transcriptomics/tutorials/clipseq/tutorial.html">Galaxy Training Network</a>  where you can analyse CLIP-Seq data of RBFOX2 from human liver cancer cells (Hep G2). The tutorial will help you to understand the analysis steps and the most important parameters and tools that are used in CLIP-Explorer.

The underlying workflow of the tutorial can be found <a target="_parent" href="https://github.com/galaxyproject/training-material/tree/master/topics/transcriptomics/tutorials/clipseq/workflows/">here</a>.

We recommend to follow the tutorial on <a target="_parent" href="https://galaxyproject.github.io/training-material/topics/sequence-analysis/tutorials/quality-control/tutorial.html">FastQC</a> for quality checks and the tutorial for <a target="_parent" href="https://galaxyproject.github.io/training-material/topics/introduction/tutorials/igv-introduction/tutorial.html">IGV</a> for data inspection.

The Galaxy Training Network tutorial uses eCLIP data from human liver cancer cells (Hep G2) and is hosted on zenodo: <a target="_parent" href="https://zenodo.org/record/2579279#.XJEAyVNKhPM"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.2579279.svg" alt="DOI"></a>

Galaxy CLIP-Explorer can process large CLIP-Seq data of eCLIP, iCLIP, and with simple changes to the iCLIP workflows also FLASH, and uvCLAP. We processed eCLIP data with around 20 million reads from [Nostrand et al. (2016)](https://doi.org/10.1038/nmeth.3810). CLIP-Explorer can handle multiplexed and de-multiplexed CLIP-Seq data in FASTQ and FASTA format.

## 2. Galaxy CLIP-Explorer -- Many Possibilities

![](https://clipseq.usegalaxy.eu/assets/media/content_design_clipseq.jpg)
  <b> Galaxy CLIP-Explorer workflow and tools; </b> CLIP-Explorer has three major steps. Firstly, CLIP-Explorer demultiplexes, and if necessary, removes adapter sequences as well as in-line barcodes and UMIs in the preprocessing. CLIP-Explorer checks the quality of the preprocessing and assess the raw data quality. Secondly, CLIP-Explorer aligns the reads to the reference genome or transcriptome, filters for uniquely mapped, correctly paired, and matching quality reads, and deduplicates the read library to remove PCR duplicates. Another quality controls follows that checks the batch, mapping and experimental setup. Thirdly, CLIP-Explorer predicts differentially enriched regions with a peakcaller such as `Piranha`. The binding regions are then analyzed with `RCAS` and `MEME-Chip`. `MEME-Chip` (DREME and MEME) predicts binding sequence motifs, whereas `RCAS` ascertains the binding coverage profile of the proteins, performs a GO-term analysis, and outputs a plot of the target distribution, which states what kind of RNAs the protein of interest prevalently bind.

## 3. Workflows

Use the following workflows for an automatized data analysis for iCLIP and eCLIP data. For FLASH and uvCLAP use the iCLIP workflows. The data needs to be in **FASTA or FASTQ format** and can be either **multiplexed or de-multiplexed**. All workflows, except the robust peak analysis, require the **data as a list of dataset pairs**. A tutorial to create a list of dataset pairs can be found in the CLIP-Seq data analysis <a target="_parent" href="https://galaxyproject.github.io/training-material/topics/transcriptomics/tutorials/clipseq/tutorial.html">tutorial</a> or [here](https://galaxyproject.github.io/training-material/topics/galaxy-data-manipulation/tutorials/collections/tutorial.html). Please have in mind that all workflows need additional input files from the user.

### 3.1 Quick Example Run
If you want to make a quick run with example data, then download this example eCLIP data of RBFOX2 <a target="_parent" href="https://zenodo.org/record/2579279#.XJEAyVNKhPM"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.2579279.svg" alt="DOI"></a> and run the <a target="_parent" href="https://github.com/galaxyproject/training-material/tree/master/topics/transcriptomics/tutorials/clipseq/workflows/">workflow</a> of the CLIP-Seq training material mentioned on the <a target="_parent" href="https://galaxyproject.github.io/training-material/topics/transcriptomics/tutorials/clipseq/tutorial.html">Galaxy Training Network</a>. Or, use the <a href="https://clipseq.usegalaxy.eu/u/heylf/w/1clipseq-explorerdemultiplexedpeakachuecliphg19n5-1">workflow for the eCLIP data of Nostrand et al. (2016)</a>. Keep in mind, you have to provide the input data as a **list of dataset pairs**. A tutorial to create a list of dataset pairs can be found in the CLIP-Seq data analysis <a target="_parent" href="https://galaxyproject.github.io/training-material/topics/transcriptomics/tutorials/clipseq/tutorial.html">tutorial</a> or [here](https://galaxyproject.github.io/training-material/topics/galaxy-data-manipulation/tutorials/collections/tutorial.html).

### 3.2 From scratch to demultiplexed FASTQ files

If your data is not demultiplexed yet, then use the workflows of this section. The user has to provide the in-line **barcodes** in a tab-delimited tabular format, for example:

- rep1  TTAG
- rep2	TGGC
- rep3	TTAA

The raw data needs to be in FASTA or FASTQ format as a list of dataset pairs.

- <a href="https://clipseq.usegalaxy.eu/u/heylf/w/1demultiplexeclip">Workflow to de-multiplex eCLIP read library</a>
- <a href="https://clipseq.usegalaxy.eu/u/heylf/w/2demultiplexiclip">Workflow to de-multiplex iCLIP read library</a>


### 3.3 From scratch with demultiplexed FASTQ files

You can choose between three different types of peak calling for the data analysis of eCLIP and iCLIP data. The data specification of each of the peak calling algorithms is listed below:

**Table 1**: Data specification of the different peak calling algorithms.

| Tool | Replicates (Yes/No) | Control Data (Yes/No) |
| ---            | :-:      | :-:     |
| <a href="https://github.com/tbischler/PEAKachu">PEAKachu</a>            | Yes | Yes   |
| <a href="https://doi.org/10.1186/s13059-017-1364-2">PureCLIP</a>            | No | Yes   |
| <a href="https://doi.org/10.1093/bioinformatics/bts569">Piranha</a>           | No | Yes   |


#### Note if you have used the de-mutliplexing workflows:
If you used the preceding workflows for de-multiplexing, then remove the steps of `Cutadapt` and `UMI-tools extract` from the following workflows to analyse your data. Simply, import the workflow into you account, remove the tools and connect the lose end directly to the alignment step.

#### Note if you use eCLIP data of Nostrand et al. (2016):
The workflow for the eCLIP data of [Nostrand et al. (2016)](https://doi.org/10.1038/nmeth.3810) was used to analyse the data of RBFOX2. Beware when using other data of the study of [Nostrand et al. (2016)](https://doi.org/10.1038/nmeth.3810), because the size of the unique molecular identifier (UMI) can be different. The workflow is set to a UMI of five nucleotides. You can change this by importing the workflow into your account and amend the parameter `Cut bases from reads before adapter trimming` of the second `Cutadapt` step for the CLIP and control data.

#### eCLIP
- <a href="https://clipseq.usegalaxy.eu/u/heylf/w/1clipseq-explorerdemultiplexedpeakachuecliphg19n5-1">Workflow for the eCLIP data of Nostrand et al. (2016)</a>
- <a href="https://clipseq.usegalaxy.eu/u/heylf/w/2clipseq-explorerdemultipeakachuecliphg19">Peak calling with PEAKachu</a>
- <a href="https://clipseq.usegalaxy.eu/u/heylf/w/3clipseq-explorerdemultipureclipecliphg19">Peak calling with PureCLIP</a>
- <a href="https://clipseq.usegalaxy.eu/u/heylf/w/4clipseq-explorerdemultipiranhaecliphg19">Peak calling with Piranha</a>

#### iCLIP
- <a href="https://clipseq.usegalaxy.eu/u/heylf/w/1clipseq-explorerdemultipeakachuicliphg19">Peak calling with PEAKachu</a>
- <a href="https://clipseq.usegalaxy.eu/u/heylf/w/2clipseq-explorerdemultipureclipicliphg19">Peak calling with PureCLIP</a>
- <a href="https://clipseq.usegalaxy.eu/u/heylf/w/3clipseq-explorerdemultipiranhaicliphg19">Peak calling with Piranha</a>

#### FLASH and uvCLAP
For FLASH and uvCLAP use the workflows of iCLIP and change the pattern of the unique molecular identifiers (see 4.3) and change the adapter sequences (see 4.2).

### 3.4 Further optional peak analysis

The following workflow can be used if you have picked a peak calling algorithm that do not support biological replicated data. The workflow finds and analysis robust binding regions shared between different peak files.

- <a href="https://clipseq.usegalaxy.eu/u/heylf/w/robustpeakanalysis">Robust peak analysis</a>

## 4. Remarks

Please follow the CLIP-Seq data analysis <a target="_parent" href="https://galaxyproject.github.io/training-material/topics/transcriptomics/tutorials/clipseq/tutorial.html">tutorial</a> for a deeper understand of the tools of CLIP-Explorer.

### 4.1 Changing Workflows
You can change the workflows at anytime and without any problems. Simply import the workflow into your account and change the necessary tools or tool parameters.

### 4.2 Adapter sequences
The workflows uses `Cutadapt` to remove standard eCLIP and iCLIP adapter sequences. You need to change `Cutadapt` parameters if your read library covers other adapter sequences. Cutadapt cannot detect automatically standard Illumina or other standard adapters. You have to provide the sequence.

### 4.3 Unique Molecular Identifiers (UMIs) and in-line barcodes
The workflows uses `Cutadapt` to trim of the length of the UMI (+ barcode) from one site of the read pair. This depends on the iCLIP, eCLIP and your own protocol. Please check or change the parameter in `Cutadapt` based on your UMI and in-line barcode. For more information follow the CLIP-Seq data analysis <a target="_parent" href="https://galaxyproject.github.io/training-material/topics/transcriptomics/tutorials/clipseq/tutorial.html">tutorial</a>.

CLIP-explorer uses `UMI-tools extract` to find the UMIs inside your reads. Change the pattern of `UMI-tools extract` based on your read library preparation.

### 4.4 Read alignment
We use `STAR` to do the read alignment. `STAR` combines genome and transcriptome data. CLIP-Explorer focusses only on uniquely mapped read. Furthermore, `STAR` is executed with soft-clipping turned off. For more information follow the CLIP-Seq data analysis <a target="_parent" href="https://galaxyproject.github.io/training-material/topics/transcriptomics/tutorials/clipseq/tutorial.html">tutorial</a>.

You can replace `STAR` with any other read mapper by importing the corresponding workflow into your account. **Check the mapping quality**: Look at the multiqc report in order to assess the mapping quality.

`STAR` has many parameters. It is recommended to leave them in default. However, it can happen that `STAR` denotes a lot of read as unmapped, because they are too short. You might then want to adjust (lower) the two parameters **Minimum alignment score, normalized to read length** (--outFilterScoreMinOverLread), and **Minimum number of matched bases, normalized to read length** (--outFilterMatchNminOverLread).

### 4.5 Peak calling with PEAKachu, PureCLIP, and Piranha

#### PEAKachu
You need to specific the insert size of your paired-end reads for `PEAKachu`. For that reason, check the output image of `CollectInsertSizeMetric` to get an estimate for that parameter.

The three parameters **Mad Multiplier** (default 2.0), **Fold Change Threshold** (default 2.0), and **Adjusted p-value Threshold** (default 0.05) are the primary filters to select significant peaks. Keep them in default. Then adjust them based on your question.

#### PureCLIP
PureCLIP works best with only one site of the paired end reads, where the cross linking event occurs. Thus, CLIP-Explorer filters out the other mate before the peak calling. Remove the `Bam filter` tool to disable this behavior or change `Bam filter` to pick the correct site.

Important parameters for PureCLIP are  the **Bandwidth for kernel density estimation used to access enrichment** (-bw) and the **Bandwidth for kernel density estimation used to estimate n for binomial distributions** (-bwn). Choose these two parameters wisely. They control the fitting of the model. Decreasing these two parameters result in overfitting.

If PureCLIP does not finish because of a memory error, or if PureCLIP takes too long, then try to apply the model just for a few chromosomes of the reference. Take a look at **Genomic chromosomes to learn HMM parameters** (-iv).  

#### Piranha
Piranha works best with a zero truncated negative binomial (default), or with a negative binomial for CLIP-Seq data. The selected distribution plays an important part. You can change it under **Select distribution type** (-d).

Further important parameters are **Indicates that input is raw reads and should be binned into bins of this size** (-b) which controls for the fitting of the data. Decreasing this parameter results in overfitting. A good baseline of this parameter is a value around 50. The parameter **Merge significant bins within certain distance?** (-u) also controls for overfitting. Set it to **No** for more information. Set it to **Yes** and give it a value bigger than 0 to merge peaks that are very close together. Set also the **Significance threshold for sites** to 0.05 (-p).

### 4.6 Extension of the binding regions
CLIP-Explorer uses `SlopBED` to extend the peaks a few basepairs to the left and right in order to correct for an underestimation of the binding regions of the peak calling algorithms. For more information follow the CLIP-Seq data analysis <a target="_parent" href="https://galaxyproject.github.io/training-material/topics/transcriptomics/tutorials/clipseq/tutorial.html">tutorial</a>. Remove the tool or change the parameter of `SlopBED` to change this behavior.
