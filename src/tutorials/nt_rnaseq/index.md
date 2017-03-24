---
autotoc: true
title: Finding and quantifying new transcripts
---

# Introduction

Here we will use RNA-seq data from a study published by *Wu et al.* in 2014 [DOI:10.1101/gr.164830.113](http://genome.cshlp.org/content/early/2014/10/12/gr.164830.113.abstract). The goal of this study was to investigate "*the dynamics of occupancy and the role in gene regulation of the transcription factor Tal1, a critical regulator of hematopoiesis, at multiple stages of hematopoietic differentiation.*" To this end, RNA-seq libraries were constructed from multiple mouse cell types including G1E - a GATA-null immortalized cell line derived from targeted disruption of GATA-1 in mouse embryonic stem cells - and megakaryocytes. This RNA-seq data was used to determine differential gene expression between G1E and megakaryocytes and later correlated with Tal1 occupancy. This dataset (GEO Accession: [GSE51338](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE51338)) consists of biological replicate, paired-end, poly(A) selected RNA-seq libraries. Because of the long processing time for the large original files, we have downsampled the original raw data files to include only reads that align to chromosome 19 and a subset of interesting genomic loci identified by Wu *et al*.

## Key fact about this study:

 * TAL1 is a transcription factor essential for hematopoesis. It is essential for establishing hematopoetic stem cells during embryonic development and to differentiate between [erythroid](https://en.wikipedia.org/wiki/Red_blood_cell) and [myeloid](https://en.wikipedia.org/wiki/Myeloid) cell lineages, including those leading to megakaryocytes, mast cells, and eosinophils.
 * Some of the TAL1 molecules are components of multiprotein complexes that also include other transcriptional factors such as GATA-1.
 * By contrasting RNA from GATA-null G1E cells with that of megakaryocytes we can identify transcripts regulated by GATA-1 dependent TAL1

|      |
|------|
|![](https://upload.wikimedia.org/wikipedia/commons/f/f0/Hematopoiesis_simple.svg)|
|<small>**Schematic representation of hematopoesis** (from [Wikipedia](https://en.wikipedia.org/wiki/Haematopoiesis))</small>|

## Analysis strategy

The goal of this exercise is to:

 1. Identify what transcripts are present in the G1E and megakaryocyte cellular states
 2. Which transcripts are differentially expressed between the two states. 

 We will use a *de novo* transcript reconstruction strategy (not to be confused with the *de novo* RNAseq when reference genome is not known) to infer transcript structures from the mapped reads in the absence of the actual annotated transcript structures. This will allow us to identify novel transcripts and novel isoforms of known transcripts, as well as identify differentially expressed transcripts. 

## Tutorial Agenda
 
In this tutorial, we will address:

 1. Data upload
 2. Read trimming
 3. Read mapping
 4. *De novo* transcript reconstruction
 5. Transcriptome assembly
 6. Read counting and differential expression analysis
 7. Visualization

# Exploring the Data

Due to the large size of this dataset, we have downsampled it to only include reads mapping to chromosome 19 and certain loci with relevance to hematopoeisis. This data is available from two sources:

 * [Zenodo](https://zenodo.org/record/254485) (use these data on **any** Galaxy instance)
 * [Galaxy data library](https://usegalaxy.org/library/list#folders/F3481856ea042c39d) (use these data on **main** Galaxy server at http://usegalaxy.org).

The data is structured in the following way:

 - There are two samples: G1E cells and megakaryocytes (`G1E` and `Mk`)
 - There are two replicates per sample: `R1` and `R2`
 - Each replicate has forward and reverse reads (`f` and `r`)
 - Thus, there are eight (8) fastq files


|      |
|:------:|
|![](/src/tutorials/nt_rnaseq/lib.png)|
|<small>**Galaxy data library containing the reads**</small>|

## Uploading data

<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  	<div class="panel panel-default">
    	<div class="panel-heading" role="tab" id="headingOne">
      		<h4 class="panel-title">
        		<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          			Data upload from Galaxy Library
        		</a>
      		</h4>
    	</div>
    	<div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
    		<div class="panel-body">
        		1. Right click on [this link](https://usegalaxy.org/library/list#folders/F3481856ea042c39d) and use "Open link in a new tab" option<br>
 				2. Select `reads` folder by clicking on it<br>
 				3. Click checkboxes for all datasets<br>
 				4. Click **to History button**<br>
 				5. Select an existing history or create a new one by naming it.<br><br>
 				![](/src/tutorials/nt_rnaseq/toHist.png)<br>
    		</div>
  		</div>
  	</div>	
  	<div class="panel panel-default">
   		<div class="panel-heading" role="tab" id="headingTwo">
      		<h4 class="panel-title">
        		<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          			Data upload from Zenodo (optional if using main public server)
        		</a>
      		</h4>
    	</div>
    	<div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      		<div class="panel-body">
        		1. Create a new history for this RNA-seq exercise<br>
 				2. Open the data upload manager (Get Data -> Upload file)<br>
 				3. Copy and paste the links for the reads and annotation file <br>
 				4. Select **Paste/Fetch Data**<br>
 				5. Paste the link(s) into the text field<br>
 				6. Change the datatype of the read files to **fastqsanger**<br>
 				7. Change the datatype of the annotation file to **gtf** and assign the Genome as **mm10**<br>
 				8. Press **Start**<br>
 				9. Rename the files in your history to retain just the necessary information (*e.g.* "G1E R1 forward reads")
      		</div>
    	</div>
 	</div>
</div>

Once you upload data into a new history you Galaxy interface should look like this:


|      |
|------|
|![](/src/tutorials/nt_rnaseq/afterUpload.png)|
|<small>**Datasets are uploaded into a new history**</small>|

## Quality control

### Assess data quality

For quality control, we use similar tools as described in [NGS-QC tutorial](/tutorials/ngs/): [FastQC](http://www.bioinformatics.babraham.ac.uk/projects/fastqc/) and [Trimmomatic](http://www.usadellab.org/cms/?page=trimmomatic).

Let's start by processing the smaller set of reads from Megakaryocyte set: `Mk_R1_f_ds_SRR549357` and its reverse set of mates `Mk_R1_r_ds_SRR549357`:


|      |
|------|
|![](/src/tutorials/nt_rnaseq/mk_qc.png)|
|<small>**QC'ing reads with FastQC**</small>|

This will generate the following quality value distributions:

|                                        |                                        |
|:--------------------------------------:|:--------------------------------------:|
| ![](/src/tutorials/nt_rnaseq/f_qc.png) | ![](/src/tutorials/nt_rnaseq/r_qc.png) |
| `Mk_R1_f_ds_SRR549357`                 | `Mk_R1_r_ds_SRR549357`                 |


<div class="panel panel-info">
	<div class="panel-heading">
  		<a data-toggle="collapse" href="#qc" aria-expanded="false" aria-controls="collapseExample">
     		<i class="fa fa-question-circle" aria-hidden="true"></i> What can you tell about these data?
    	</a>
  	</div>
  	<div class="panel-body collapse" id="qc">
        - The read length is 99 bp<br>
        - The quality of base calls declines throughout a sequencing run.
  	</div>
</div>

### Dynamically trim low quality bases from reads` ends

The quality score distributions we seen above for one sample are characteristic of all reads in our dataset (you can run FastQC on remaining reads to see if this is true). To increase mapping efficiency we can trim off the low quality bases from the ends of the reads using 'Trimmomatic`:


|      |
|------|
|![](/src/tutorials/nt_rnaseq/trimmomatic.png)|
|<small>**Running `trimmomatic` on all data**. Note we selected all forward reads in the `Input FASTQ file (R1/first of pair)` box and all reverse reads in the `Input FASTQ file (R2/second of pair)` box.</small>|

Now that we've ran `trimmomatic` let's see if it had any effect on our data. We can do this by rerunning `FastQC` on `Mk_R1_f_ds_SRR549357` and `Mk_R1_r_ds_SRR549357` datasets after they have been trimmed:


|      |
|------|
|![](/src/tutorials/nt_rnaseq/fq_after_trimmomatic.png)|
|<small>**Rerunning `FastQC` on trimmed data**</small>|

This will generate the following quality value distributions:

|                                                |                                                |
|:----------------------------------------------:|:----------------------------------------------:|
| ![](/src/tutorials/nt_rnaseq/f_qc_trimmed.png) | ![](/src/tutorials/nt_rnaseq/r_qc_trimmed.png) |
| `Mk_R1_f_ds_SRR549357`                         | `Mk_R1_r_ds_SRR549357`                         |

<div class="panel panel-info">
	<div class="panel-heading">
  		<a data-toggle="collapse" href="#qc_after_trim" aria-expanded="false" aria-controls="collapseExample">
     		<i class="fa fa-question-circle" aria-hidden="true"></i> What is the effect of trimming on the data?
    	</a>
  	</div>
  	<div class="panel-body collapse" id="qc_after_trim">
        The average quality of base calls does not drop off as sharply at the 3' ends of reads.
  	</div>
</div>


Now that we have trimmed our reads and are fortunate that there is a reference genome assembly for mouse, we will align our trimmed reads to the genome.

# Preparing dataset collections

Instead of running a single tool multiple times on all your data, would you rather run a single tool on multiple datasets at once? To do this we will use [dataset collections](/tutorials/collections/) feature of Galaxy!

## Copy datasets to a new history

We want to create a new clean history by moving the original sequence data. To do this we click on the cog (<i class="fa fa-cog" aria-hidden="true"></i>) above the history pane and choose **copy datasets** and follow the instructions in the figure below:


|                                                           |                       |
|-----------------------------------------------------------|-----------------------|
| **A.** Click on the cog (<i class="fa fa-cog" aria-hidden="true"></i>)<br>Choose "**Copy Datasets**" option: <br>![](/src/tutorials/nt_rnaseq/copy_datasets.png) | **B.** Choose which datasets you need to copy:<br>![](/src/tutorials/nt_rnaseq/copy_datasets2.png)<br>**C.** Click on the name of the newly created history:<br>![](/src/tutorials/nt_rnaseq/datasets_copied.png) |
|<small>**Copying datasets into a new history**</small> |  <small>**A**: Use history options dropdown. **B**: Select datasets to copy. **C**: Go to the new history.</small>  |

Once all datasets are copied it will look something like this:

|      |
|------|
|![](/src/tutorials/nt_rnaseq/galaxy_after_copy.png)|
|<small>**New history with copied datasets**</small>|

## Create two dataset collections

|      |
|------|
|![](/src/tutorials/nt_rnaseq/create_col_1.png)|
|<small>Make history items selectable by clicking checkbox (<i class="fa fa-check-square-o" aria-hidden="true"></i>) icon. This will allow individual datasets to be selected.</small>|
|![](/src/tutorials/nt_rnaseq/create_col_2.png)|
|<small>Show only G1E data by typing `G1E` in the search box.</small>|
|![](/src/tutorials/nt_rnaseq/create_col_3.png)|
|<small>Select all shown datasets by clicking `All`.</small>|
|![](/src/tutorials/nt_rnaseq/create_col_4.png)|
|<small>Use `For all selected` dropdown to start collection builder</small>
|![](/src/tutorials/nt_rnaseq/create_col_5.png)|
|<small>In the collection builder enter `_f_` and `_r_` in the two search boxes. Because datasets in out history are named as, for example, `G1E_R1_f_ds_SRR549355`, the `_f_` and `_r_` diffrentiate forward and reverse reads. Click `Pair these datasets` button.</small>|
|![](/src/tutorials/nt_rnaseq/create_col_6.png)|
|<small>Datasets will become paired</small>|
|![](/src/tutorials/nt_rnaseq/create_col_7.png)|
|<small>Scroll down, name the collection `G1E` and click `Create list`.</small>
|![](/src/tutorials/nt_rnaseq/create_col_8.png)|
|<small>You will get a new item in the history representing that collection</small>|
|![](/src/tutorials/nt_rnaseq/create_col_9.png)|
|<small>Do the same thing for Megakarycytes datasets and you should get a history that looks like the one above.</small>


# Pre-processing, mapping, and post-processing

## Pre-processing: Trimming all datasets

Now that we have collections let's use `Trimmomatic` to trim all datasets in our analysis. We can do this directly on collections:

|       |
|-------|
|![](/src/tutorials/nt_rnaseq/trim_col.png)|
|<small>**Trimming an entire collection**. Note that `Single-end or paired-end reads?` is set to `Paired-end (as collection)`. This allows select collections (such `G1E`) as inputs.</small>|

This will be repeated for `Mk` collection as well. Note that Trimmomatic produces two output collection: one contained paired reads (labeled as `paired`; the one we want) and the one containing singletons (labeled as `unpaired`; we one we do not want in this case). We can simply delete collections that have `unpaired` in their names.
It will be easier down the line if we rename collections to make easier to identify as analysis is progressing (collection tagging, which is currently in development, will alleviate this need in the near future). To rename a collection:

|               |                  |
|---------------|------------------|
|![](/src/tutorials/nt_rnaseq/col_rename1.png)|![](/src/tutorials/nt_rnaseq/col_rename2.png)|
|Click on collection to see this interface|Simply edit its name (from `Trimmomatic on collection...` to `G1E Trimmed` and hit Enter|


To make sense of the reads, their positions within mouse genome must be determined. This process is known as aligning or 'mapping' the reads to the reference genome. In the case of a eukaryotic transcriptome, most reads originate from processed mRNAs lacking introns. Therefore, they cannot be simply mapped back to the genome as we normally do for reads derived from DNA sequences. Instead, the reads must be separated into two categories:

- Reads contained within mature exons - these align perfectly to the reference genome
- Reads that span splice junctions in the mature mRNA - these align with gaps to the reference genome

Spliced mappers have been developed to efficiently map transcript-derived reads against genomes. [`HISAT`](https://ccb.jhu.edu/software/hisat2/index.shtml) is an accurate and fast tool for mapping spliced reads to a genome. Another popular spliced aligner is [`TopHat`](https://ccb.jhu.edu/software/tophat/index.shtml), but we will be using `HISAT` in this tutorial. For more details on these tools see our introductory [RNAseq tutorial](/tutorials/rb_rnaseq/). 
    
## Spliced mapping with HiSat

We will run HiSat with the following settings:

 - **Single end or paired reads?**: `Collection of paired reads`
 - **Source for the reference genome to align against**: `Use a built-in genome` > `Mouse (Mus Musculus): mm10`
 - **Spliced alignment parameters**: `Specify spliced alignment parameters`
 - **Specify strand-specific information**: `First Strand (R/RF)`
 - **Transcriptome assembly reporting**: `Report alignments tailored for transcript assemblers including StringTie.`

|       |
|-------|
|![](/src/tutorials/nt_rnaseq/hisat1.png)|
|<small>**HiSat settings**. Upper part of HiSat interface showing that it is being run on a collection `G1E` against `mm10` genome build. Do not forget to scroll down and set **Spliced alignment parameters** as explained above.</small>|

Run `HISAT` on the **Mk** collection as well.

## Post-processing: cleaning the BAM 

After reads have been mapped it would make sense to restrict mapped reads to those than map in correct pairs and do not map to multiple locations. This can be done with **SAMools -> Filter SAM or BAM** tool:

|       |
|-------|
|![](/src/tutorials/nt_rnaseq/filter_bam.png)|
|<small>**BAMTools Filter**. Here we are filtering results of HiSat run (a dataset collection called `HISAT on G1E`) by retaining only reads with high [mapping quality](http://genome.sph.umich.edu/wiki/Mapping_Quality_Scores) that are paired and mapped in a proper pair.</small>

We will again rename collections to `HISAT on G1E filtered` and `HISAT on Mk filtered`:

|       |
|-------|
|![](/src/tutorials/nt_rnaseq/filtered_collection.png)|
|<small>**HISAT results after filtering**</small>|


# *De novo* transcript reconstruction

## Assembling transcripts in individual sampled with Stringtie

Now that we have mapped our reads to the mouse genome with `HISAT`, we want to determine transcript structures that are represented by the aligned reads. This is called *de novo* transcriptome reconstruction. This unbiased approach permits the comprehensive identification of all transcripts present in a sample, including annotated genes, novel isoforms of annotated genes, and novel genes. While common gene/transcript databases are quite large, they are not comprehensive, and the *de novo* transcriptome reconstruction approach ensures complete transcriptome(s) identification from the experimental samples. The leading tool for transcript reconstruction is `Stringtie`. Here, we will use `Stringtie` to predict transcript structures based on the reads aligned by `HISAT` and filtered as described above:

|       |
|-------|
|![](/src/tutorials/nt_rnaseq/stringtie_col.png)|
|<small>Running `Stringtie` on filtered mapped reads. Here it is run on collection `G1E` and we set `Name prefix for output transcripts` to `G1E`. When running `Stringtie` on collection `Mk` set this accordingly. </small>

`Stringtie` generates assembled transcripts in [GFF format](https://ccb.jhu.edu/software/stringtie/index.shtml?t=manual#output). Below is an example of its output:

```
chr1 StringTie transcript 160938184 160940158 1000 + . gene_id "G1E.1"; transcript_id "G1E.1.1"; cov "12.347418"; FPKM "18.040417"; TPM "25.133554";
chr1 StringTie exon       160938184 160938232 1000 + . gene_id "G1E.1"; transcript_id "G1E.1.1"; exon_number "1"; cov "7.510204";
```

for description of fields in this dataset see [Stringtie manual](https://ccb.jhu.edu/software/stringtie/index.shtml?t=manual#output).

## Creating unified transcriptome assembly

We just generated four transcriptomes with `Stringtie` representing each of the four RNA-seq libraries we are analyzing. Since these were generated in the absence of a reference transcriptome, and we ultimately would like to know what transcript structure corresponds to which annotated transcript (if any), we have to make a **transcriptome database**. We will use the tool `Stringtie merge` to combine redundant transcript structures across the four samples, provide non-redundant identifiers, and with the help of a reference annotation file annotate the nature/origin of each transcript (reference, novel isoform, intergenic transcript, antisense, etc.).

However, since we have ran `Stringtie` on each collection (`G1E` and `Mk`) independently it, in turn, has produced two collections each containing transcript assemblies for each replicate. Before we run `Strigtie merge` we need to merge the collections. This is done using **Collection Operations -> Merge Collections** tool:

|       |
|-------|
|![](/src/tutorials/nt_rnaseq/merge_col.png)|
|<small>Merging collection into a single collection</small>|

Now that the two collections are merged we will rename resulting collection `Transcriptome`. We are almost ready to run `Stringtie merge` on it. But in order to distinguish between novel and existing transcripts we will need provide `Stringtie merge` with a list of known annotated transcripts. For mouse genome version used in this tutorial (`mm10`) such a list can be downloaded from a [Galaxy Library](https://usegalaxy.org/library/list#folders/F59bc5dbe6dfc6d4c) as was described above. Now we can finally run `Stringtie merge`:

|       |
|-------|
|![](/src/tutorials/nt_rnaseq/stringtie_merge.png)|
|<small>Merging transcripts from `G1E` and `Mk` replicates into a single unified GFF dataset</small>|

We will rename output of `Stringtie merge` as `Merged transcriptome`.

# Analysis of the differential gene expression

We just generated a transcriptome database (a GFF output of `Stringtie merge`) that represents the transcripts present in the G1E and megakaryocytes samples. This database provides the location of our transcripts with non-redundant identifiers, as well as information regarding the origin of the transcript. 

We now want to identify which transcripts are differentially expressed between the G1E and megakaryocyte cellular states. To do this we will implement a counting approach using `FeatureCounts` to count reads per transcript. Then we will provide this information to `DESeq2` to generate normalized transcript counts (abundance estimates) and significance testing for differential expression.

## Count the number of reads per transcript

To compare the abundance of transcripts between different cellular states, the first essential step is to quantify the number of reads per transcript. [`FeatureCounts`](http://bioinf.wehi.edu.au/featureCounts/) is one of the most popular tools for counting reads in genomic features. In our case, we'll be using `FeatureCounts` to count reads aligning in exons of our `Stringtie merge` generated transcriptome database.

|       |
|-------|
|![](/src/tutorials/nt_rnaseq/fCount1.png)|
|<small>Set input collection. In this case this is filtered `HiSat` output for `G1E` replicates (You will have to repeat `featureCount` calculation on `Mk` collection as well.)</small>|
|![](/src/tutorials/nt_rnaseq/fCount2.png)|
|<small>Expand **Options for paired-end reads**, enable **Count fragments instead of reads** and set **Orientation of the two read from the same pair** to `Reverse, Forward (rf)`.</small>|
|![](/src/tutorials/nt_rnaseq/fCount3.png)|
|<small>Finally expand **Advanced options**, set **GFF gene identifier** to `transcript_id`, Strand specificity of the protocol to `Stranded (reverse)` and hit Enter.</small>|
|![](/src/tutorials/nt_rnaseq/fCount5.png)|
|<small>Rename collection generated by `featureCount` as `featureCounts on G1E` and `featureCounts on Mk`.</small>|


## Perform differential gene expression testing

Transcript expression is estimated from read counts, and attempts are made to correct for variability in measurements using replicates. This is absolutely essential to obtaining accurate results. We recommend having at least two biological replicates (although you should *really* have three or even more). 

[`DESeq2`](https://bioconductor.org/packages/release/bioc/html/DESeq2.html) is a proven and widely used tool for differential gene expression analysis. It takes read counts produced by `FeatureCounts` and applies size factor normalization:

- Computation for each gene of the geometric mean of read counts across all samples
- Division of every gene count by the geometric mean
- Use of the median of these ratios as sample's size factor for normalization

|       |
|-------|
|![](/src/tutorials/nt_rnaseq/deseq.png)|
|<small>Running `DeSeq2` on `G1E` and `Mk` counts. Note how Factor Levels are set. **Output normalized counts table** parameter is set to `Yes`.</small>

The first output of `DESeq2` is a tabular file. That looks like this (only three decimal points are shown):

```
1            2       3        4     5      6         7
--------------------------------------------------------------
MSTRG.977.1  697.447 -10.030  1.062 -9.444 3.583e-21 1.974e-18
MSTRG.78.1   645.022  10.656  1.195  8.915 4.873e-19 1.342e-16
MSTRG.129.1  368.102  -8.846  1.055 -8.379 5.328e-17 9.787e-15
MSTRG.1498.1 252.670   6.152  0.815  7.544 4.556e-14 6.277e-12
MSTRG.1434.1 372.478   4.855  0.666  7.288 3.125e-13 3.444e-11
NM_133804    257.129 -10.262  1.509 -6.798 1.060e-11 9.737e-10
```
where:

1.	Gene identifiers
2.	Mean normalized counts, averaged over all samples from both conditions
3.	Logarithm (base 2) of the fold change (the values correspond to up- or downregulation relative to the condition listed as Factor level 1)
4.	Standard error estimate for the log2 fold change estimate
5.	[Wald](https://en.wikipedia.org/wiki/Wald_test) statistic
6.	*p*-value for the statistical significance of this change
7.	*p*-value adjusted for multiple testing with the Benjamini-Hochberg procedure which controls false discovery rate ([FDR](https://en.wikipedia.org/wiki/False_discovery_rate))

## Making sense of the results

The output of `DeSeq2` contain over 35,000 rows. Let's select transcripts with the most significant expression differences. For this we will filter `DeSeq2` output on adjusted *p*-value using **Filter and Sort -> Filter** tool:

|       |
|-------|
|![](/src/tutorials/nt_rnaseq/deseq_filter.png)|
|<small>Filtering to retain only genes with adjusted *p*-value above `0.05`.</small>|

This retains 128 transcripts. You can see that in some cases log<sub>2</sub> fold change is positive and in some cases it is negative. To give you an idea on what this means let's look at normalized counts for genes with negative and positive change. One way to do this is to join the dataset we have just generated with **Filter** tool with normalized counts generated by `DeSeq2`. For this we will use **Join, Subtract and Group -> Join two Datasets** tool:

|       |
|-------|
|![](/src/tutorials/nt_rnaseq/norm_count_join.png)|
|<small>Joining filtered `DeSeq2` output with normalized counts.</small>|

Let's look at two first entries:

```
Last four columns are normalized counts for:                    Mk_1     Mk_2     G1E_1    G1E_2
---------------------------------------------------------------------------------------------------
MSTRG.977.1  697.447 -10.030  1.062 -9.444 3.583e-21 1.974e-18  2081.714 706.074    1.665     0.333
MSTRG.78.1   645.022  10.656  1.195  8.915 4.873e-19 1.342e-160    0.000    0.000 1311.325 1268.763
```

The last four columns are normalized reads counts for two megakarycyte and two G1E replicates, respectively. You can see that for `MSTRG.977.1`  log<sub>2</sub> fold change is `-10.030` and there are practically no G1E reads. Conversely, in the case of `MSTRG.78.1` log<sub>2</sub> fold change is `10.656` and there are no megakaryocyte reads. This is this cases (because we set `G1E` as the Factor level 1 while running `DeSeq2`) positive change implies *downregulation* in megakaryocytes compared to G1E cells and vice versa. So to find all genes upregulated in Mk, for example, one would need to filter `DeSeq2` output for fold change below 0. 

<div class="panel panel-info">
	<div class="panel-heading">
  		<a data-toggle="collapse" href="#upreg" aria-expanded="false" aria-controls="collapseExample">
     		<i class="fa fa-question-circle" aria-hidden="true"></i> How many transcripts are upregulated in megakaryocytes at 1% significance level?
    	</a>
  	</div>
  	<div class="panel-body collapse" id="upreg">
        - Filter `DeSeq2` output using `c3 < 0 and c7 < 0.01` expression.<br>
        - There will be around 40 genes.
  	</div>
</div>


In addition to the list of genes, `DESeq2` outputs a graphical summary of the results, useful to evaluate the quality of the experiment:

|                                 |
|---------------------------------|
|![](/src/tutorials/nt_rnaseq/deseq_hist.png)|
|<small>Histogram of *p*-values for all tests.</small>|
|![](/src/tutorials/nt_rnaseq/deseq_ma.png)|
|<small>[MA plot](https://en.wikipedia.org/wiki/MA_plot): global view of the relationship between the expression change of conditions (log ratios, M), the average expression strength of the genes (average mean, A), and the ability of the algorithm to detect differential gene expression. The genes that passed the significance threshold (adjusted p-value < 0.1) are colored in red.</small>|
|![](/src/tutorials/nt_rnaseq/deseq_pca.png)|
|<small>Principal Component Analysis ([PCA](https://en.wikipedia.org/wiki/Principal_component_analysis)) and the first two axes. Each replicate is plotted as an individual data point. This type of plot is useful for visualizing the overall effect of experimental covariates and batch effects.</small>|
|![](/src/tutorials/nt_rnaseq/deseq_samp_to_samp.png)|
|<small>Heatmap of sample-to-sample distance matrix: overview over similarities and dissimilarities between samples.</small>|
|![](/src/tutorials/nt_rnaseq/deseq_disp.png)|
|<small>Dispersion estimates: gene-wise estimates (black), the fitted values (red), and the final maximum a posteriori estimates used in testing (blue). This dispersion plot is typical, with the final estimates shrunk from the gene-wise estimates towards the fitted estimates. Some gene-wise estimates are flagged as outliers and not shrunk towards the fitted value. The amount of shrinkage can be more or less than seen here, depending on the sample size, the number of coefficients, the row mean and the variability of the gene-wise estimates.</small>|

For more information about `DESeq2` and its outputs, you can have a look at [`DESeq2` documentation](https://www.bioconductor.org/packages/release/bioc/manuals/DESeq2/man/DESeq2.pdf).

# Visualization
Now that we have a list of transcript expression levels and their differential expression levels, it is time to visually inspect our transcript structures and the reads they were predicted from. It is a good practice to visually inspect (and present) loci with transcripts of interest. Fortuantely, there is a built-in genome browser in Galaxy, **Trackster**, that make this task simple (and even fun!). 

In this last section, we will convert our aligned read data from BAM format to bigWig format to simplify observing where our stranded RNA-seq data aligned to. We'll then initiate a session on Trackster, load it with our data, and visually inspect our interesting loci. 

> ### :pencil2: Hands-on: Converting aligned read files to bigWig format
>
> 1. **bamCoverage** :wrench:: Run `bamCoverage` on all four aligned read files (`HISAT` output) with the following parameters:
>    - **Bin size in bases**: 1
>    - **Effective genome size**: mm9 (2150570000)
>    - Expand the **Advanced options**
>    - **Only include reads originating from fragments from the forward or reverse strand**: forward
> 2. **Rename** :wrench:: Rename the outputs to reflect the origin of the reads and that they represent the reads mapping to the PLUS strand
>![](/src/tutorials/nt_rnaseq/bamCoverage_forward.png)
>
> 3. **bamCoverage** :wrench:: Repeat Step 1 except changing the following parameter:
>    - **Only include reads originating from fragments from the forward or reverse strand**: reverse
> 4. **Rename** :wrench:: Rename the outputs to reflect the origin of the reads and that they represent the reads mapping to the MINUS strand
> ![](/src/tutorials/nt_rnaseq/bamCoverage_reverse.png)

> ### :pencil2: Hands-on: Trackster based visualization
>
> 1. **Viz** :wrench:: On the center console at the top of the Galaxy interface, choose " Visualization" -> "New track browser"
>    - Name your visualization someting descriptive under "Browser name:"
>    - Choose "Mouse Dec. 2011 (GRCm38/mm10) (mm10)" as the "Reference genome build (dbkey)
>    - Click "Create" to initiate your Trackster session
> ![](/src/tutorials/nt_rnaseq/Trackster_opening_window.png)
>
> 2. **Viz** :wrench:: Click "Add datasets to visualization"
>    - Select the "RefSeq GTF mm10" file
>    - Select the output files from `Stringtie`
>    - Select the output file from `Cuffmerge`
>    - Select the output files from `bamCoverage`
>
> 3. :wrench:: Using the grey labels on the left side of each track, drag and arrange the track order to your preference
>
> 4. :wrench:: Hover over the grey label on the left side of the "RefSeq GTF mm10" track and click the "Edit settings" icon.
>    - Adjust the block color to blue (#0000ff) and antisense strand color to red (#ff0000) 
>
> 5. :wrench:: Repeat the previous step on the output files from `StringTie` and `Cuffmerge`
>
> 6. :wrench:: Hover over the grey label on the left side of the "G1E R1 plus" track and click the "Edit settings" icon.
>    - Adjust the color to blue (#0000ff) 
>
> 7. :wrench:: Repeat the previous step on the other three bigWig files representing the plus strand
>
> 8. :wrench:: Hover over the grey label on the left side of the "G1E R1 minus" track and click the "Edit settings" icon.
>    - Adjust the color to red (#ff0000) 
>
> 9. :wrench:: Repeat the previous step on the other three bigWig files representing the minus strand
>
> 10. :wrench:: Adjust the track height of the bigWig files to be consistant for each set of plus strand and minus strand tracks 
> ![](/src/tutorials/nt_rnaseq/Trackster_viz_hoxb13_locus.png)
> 11. :wrench:: Direct Trackster to the coordinates: chr11:96193539-96206376, what do you see?
>    >    <details>
>    >    <summary>Click to view answers</summary>
>    >    <ol type="1">
>    >    <li>There are two clusters of transcripts that are exclusively expressed in the G1E background</li>
>    >    <li>The left-most transcript is the Hoxb13 transcript</li>
>    >    <li>The center cluster of transcripts are not present in the RefSeq annotation and are determined by `Cuffmerge` to be "u" and "x"</li>
>    >    </ol>
>    >    </details>
>    {: .question}
>

# Conclusion

In this tutorial, we have analyzed real RNA sequencing data to extract useful information, such as which genes are up- or down-regulated by depletion of the Pasilla gene and which genes are regulated by the Pasilla gene. To answer these questions, we analyzed RNA sequence datasets using a reference-based RNA-seq data analysis approach. This approach can be sum up with the following scheme:


![](/src/tutorials/nt_rnaseq/schematic_for_RNAseq_de_novo_tutorial.png)
