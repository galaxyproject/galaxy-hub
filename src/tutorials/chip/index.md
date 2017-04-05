---
autotoc: true
title: Analysis of ChIP-seq data
---

# Data

## Reb1 ChIP-exo

For this analysis we will be using [ChIP-exo](http://www.sciencedirect.com/science/article/pii/S0092867411013511) datasets. For this experiment immunoprecipitation was performed with antobodies against Reb1. Reb1 recodnizes a specific sequence (`TTACCCG`) and is involved in many aspects of transcriptional regulation by all three yeast RNA polymerases and promotes formation of nucleosome-free regions (NFRs) ([Hartley & Madhani:2009](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2677553/);  [Raisner:2005](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2039754/)).

<div class="alert alert-info" role="alert">
Although this is ChIP-exo data, in this tutorial we will analyze it as if it was standard ChIP-seq. We will explain peculiarities of ChIP-exo analysis in a dedicated tutorial.
</div>

## Data description

There are four datasets:

| Dataset            | Description                |
|--------------------|----------------------------|
| Reb1_R1            | ChIP experiment, Replicate 1 |
| Input_R1           | Input DNA, Replicate 1 |
| Reb1_R2            | ChIP experiment, Replicate 2 |
| Input_R2           | Input DNA, Replicate 2 |

## Data location

These datasets are deposited in a [Galaxy library](https://usegalaxy.org/library/list#folders/F050cbba300e2dbed):

|      |
|------|
|![](/src/tutorials/chip/lib.png)|
|<small>**Galaxy data library containing the reads**. Here you can see two replicates (`R1` and `R2`). This is single-end data.</small>|

## Uploading 

After uploading datasets into Galaxy history (see this [tutorial]) combine them into a single dataset list as explained in [this tutorials].

# Mapping and Post-processing

## Mapping

In this particular case the data is of very high quality and do not need to be trimmed or postprocessed in any way before mapping. We will proceed by mapping all the data against the latest version of the yeast genome `sacCer3`:

|      |
|------|
|![](/src/tutorials/chip/mapping.png)|
|<small>**Mapping all data at once**. Note that **Select input type** is set to `Single fastq` and by selecting folder (<i class="fa fa-folder-o" aria-hidden="true"></i>) button you can select as entire collection of fastq datasets. **Important**: here we also set readgroups automatically by toggling **Set readgroups information** dropdown to `Set readgroups (SAM/BAM specification)` and setting all **Auto-assign** button to `Yes`. </small>

<div class="alert alert-warning" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Running `BWA` on a collection will generate another collection of BAM files. Name this collection `mapped data`.</div>

## Post-processing

For post-processing we will remove all non-uniquely mapped reads. This can be done by simply filtering out all reads with [mapping quality](http://genome.sph.umich.edu/wiki/Mapping_Quality_Scores) less than `20` using **NGS: SAMtools -> Filter SAM or BAM**:

|      |
|------|
|![](/src/tutorials/chip/bam_filter.png)|
|<small>**Filtering multi-mapped reads** by restricting the data to reads with mapping quality above 20. Note that by selecting folder (<i class="fa fa-folder-o" aria-hidden="true"></i>) button you can select as entire collection of BAM datasets to filter at once.</small>

<div class="alert alert-warning" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Running `Filter SAM or BAM` on a collection will generate another collection of BAM files. Name this collection `filtered data`.</div>

# Assessment of ChIP quality

After we mapped and filtered the reads it is time to make some inferences about how good the underlying data is. 

## Correlation among samples

In out experiment there are two replicates, each containing treatment and input (control) datasets. The first thing we can check if the samples are correlated. To do this we first generate read count matrix using **NGS: DeepTools -> multiBamSummary**. 

|      |
|------|
|![](/src/tutorials/chip/multibamsummary.png)|
|<small>**Running multiBAMsummary** on a collection of BAM datasets (as before you can select collection by pressing folder (<i class="fa fa-folder-o" aria-hidden="true"></i>) button).</small>

This tool breaks genome into bins of fixed size (10,000 bp in our example) and computes the number of reads falling within each bin. Here is a fragment of its output:

```
#'chr' 'start' 'end'  'Reb1_R1'  'Input_R1'  'Input_R1'  'Reb1_R2'
chrVI      0    1000   19.0         41.0         3.0        6.0
chrVI   1000    2000   29.0         30.0        13.0        5.0
chrVI   2000    3000    0.0          0.0         0.0        0.0
chrVI   3000    4000    0.0          2.0         0.0        0.0
chrVI   4000    5000 7447.0        139.0         7.0     2645.0
```

we can then feed this matrix into **NGS: DeepTools -> plotCorrelation** to generate heat map like this:

|      |
|------|
|![](/src/tutorials/chip/plotcorr.png)|
|<small>**A.** Running `plotCorrelation` on output of `multiBamSummary`.</small>|
|![](/src/tutorials/chip/corr.png)|
|<small>**B.** Heatmap of four samples: Treatments (Rab1) and controls (Input) are well correlated among themselves.</small>|

Here we can see that treatments (Reb1) and controls (input) correlate well with each other. while correlation between treatments and controls is weak. This is a good sign implying that these is some signal on our data.

## Assessing signal strength

How do we tell is we do have signal coming from ChIP enrichment. One way of doing this is Signal Extraction Scaling (SES) proposed by [Diaz:2012](https://www.degruyter.com/downloadpdf/j/sagmb.2012.11.issue-3/1544-6115.1750/1544-6115.1750.pdf). SES works as follows. Suppose we have two datasets: ChIP and Input DNA. We divide genome into *N* non-overlapping windows (*N* = 10 in the example below) and for each window compute the number of reads. This way we end up with two lists: one listing read counts for ChIP (ChIP list) and the other for Input (Input list):

```
Window   ChIP-count Input-count
-------------------------------
 1         3          3
 2         4          3
 3         2          1
 4         1          3
 5         3          3
 6        27          2
 7        18          3
 8         2          2
 9        45          3
10         8          3
```

 We then sort the ChIP list in ascending order and move elements from Input-list to match this order:

```
 Window   ChIP-count Input-count
-------------------------------
4           1         3
3           2         1
8           2         2
1           3         3
5           3         3
2           4         3
10          8         3
7          18         3
6          27         2
9          45         3
```

Now let's add another two columns to this dataset. These columns will show percentage of reads summing up to each row for ChIP and Input data. For example, 0.044 on row 3 is (1 + 2 + 2)/113 = 0.044. 

```
 1   2   3  4      5
-------------------------------
 4   1   3  0.008  0.115
 3   2   1  0.026  0.153
 8   2   2  0.044  0.230
 1   3   3  0.070  0.346
 5   3   3  0.097  0.230
 2   4   3  0.132  0.576
10   8   3  0.203  0.692
 7  18   3  0.362  0.807
 6  27   2  0.601  0.884
 9  45   3  1.000  1.000
------------------------
   113  26    

Where:

1 = Window, 2 = read count in ChIP, 3 = read count in Input
4 = % or read to this point in ChIP 5 = % of read to this point 
```

In the matrix above a large portion of ChIP reads (column 4) is concentrated in the few bins close to the bottom. This is not the case for the input reads (column 5). If we plot two last columns of this matrix we will get a curve like this:

|      |
|------|
|![](/src/tutorials/chip/ses.png)|
|<small>**SES** plot for our toy example. Most "reads" in the ChIP experiment are concentrated in the last three bins.</small>|

[DeepTools](https://deeptools.github.io/) provide a nice explanation of how the success of a ChIP experiment can be judged based on SES (also called *fingerprint*) plot:

|      |
|------|
|![](/src/tutorials/chip/fingerprint_dt.png)|
|<small>**DeepTools** explanation of SES plots.</small>|

So let's apply this to our own data using **NGS: DeepTools -> plotFingerprint**:

|      |
|------|
|![](/src/tutorials/chip/plotfingerprint.png)|
|<small>**A.** Running `plotFingerprint` on output of `multiBamSummary`.</small>|
|![](/src/tutorials/chip/plotfingerprint_out.png)|
|<small>**B.** SES fingerprint of four samples: Treatments (Rab1) show characteristic shape indicating of ChIP-signal. Approximately 30% of reads are contained in several % of genome.</small>|

# Generating bigWig datasets for display

In this section we will convert BAM files generated with `bwa` into [bigWig](https://genome.ucsc.edu/goldenpath/help/bigWig.html) format that will allow us to view read coverage distribution across the genome. We will also "pre-warm" a genome browser for displaying peaks we will be calling in the next section.

## Generating bigWig datasets

We will use **NGS: DeepTools -> bamCoverage**:

|      |
|------|
|![](/src/tutorials/chip/bam_cov_1.png)|
|<small>**Running bamCoverage** on a collection of filtered BAM datasets (as before you can select collection by pressing folder (<i class="fa fa-folder-o" aria-hidden="true"></i>) button). Here we set **Bin size** to `25`.  Next we set **Effective genome size** to `user specified` and enter `12000000` (approximate size of *Saccharomyces cerevisiae* genome). Because this tool has a particularly long interface we cut out importnat sections to make this image (see next two panes below). </small>|
|![](/src/tutorials/chip/bam_cov_2.png)|
|<small>Here we set **Smooth values using the following length (in bases)** to `20` to generate smooth peak representations (see next pane).</small>|
|![](/src/tutorials/chip/bam_cov_3.png)|
|<small>Finally we set **Extend reads to the given average fragment size** to `150`. This is because in this particular experiment DNA was size selected to be between 120 and 170 bp for library preparation.</small>|
