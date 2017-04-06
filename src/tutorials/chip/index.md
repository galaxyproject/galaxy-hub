---
autotoc: true
title: Analysis of ChIP-seq data
---

# Data

## Reb1 ChIP-exo

For this analysis we will be using [ChIP-exo](http://www.sciencedirect.com/science/article/pii/S0092867411013511) datasets. For this experiment immunoprecipitation was performed with antobodies against Reb1. Reb1 recodnizes a specific sequence (`TTACCCG`) and is involved in many aspects of transcriptional regulation by all three yeast RNA polymerases and promotes formation of nucleosome-free regions (NFRs) ([Hartley & Madhani:2009](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2677553/);  [Raisner:2005](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2039754/)).

<div class="alert alert-info" role="alert">
Although this is ChIP-exo data, in this tutorial we will analyze it as if it were standard ChIP-seq. We will explain peculiarities of ChIP-exo analysis in a dedicated tutorial.
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
|<small>**Running bamCoverage** on a collection of filtered BAM datasets (as before you can select collection by pressing folder (<i class="fa fa-folder-o" aria-hidden="true"></i>) button). Here we set **Bin size** to `25`.  Next we set **Effective genome size** to `user specified` and enter `12000000` (approximate size of *Saccharomyces cerevisiae* genome). Because this tool has a particularly long interface we cut out important sections to make this image (see the panes below). </small>|
|![](/src/tutorials/chip/bam_cov_3.png)|
|<small>Finally we set **Extend reads to the given average fragment size** to `150`. This is because in this particular experiment DNA was size selected to be between 120 and 170 bp for library preparation.</small>|

<div class="alert alert-warning" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Running `bamCoverage` on a collection of BAM datasets will generate a collection of bigWig datasets. Name this collection `coverage`.</div>

## Displaying coverage tracks in a browser

Now we can display bigWig datasets generated in the previous section in a genome browser. There is a variety of available browsers. In this tutorial we will use IGV Browser. 

|      |
|------|
|![](/src/tutorials/chip/cvrg_collection.png)|
|<small>**Collection of bigWigs** produced by `bamCoverage` above. Note that in the one expanded dataset (`Reb`_R2`) there is a `display at IGV` link.</small>|

Clicking this link in all four datasets (you will need to expand each dataset by clicking on it. This will expose UCSC link.) and focusing browser on *MPH1* (*YIR002C*) gene will produce the following image:

|      |
|------|
|![](/src/tutorials/chip/igv1.png)|
|<small>**Coverage** distributing within IGV. Here ChIP replicates are colored in orange and controls are blue. All four tracks were set to maximum value of `70`.</small>

# Calling peaks

While the peaks shown in the browser screenshot above are pretty clear and consistent across the two replicates, looking at the entire genome in the browser is hardly a sustained way to identify all peaks. There are several ways for identifying binding events genomewide. They are summarized in the figure below:

|                |
|----------------|
|![](/src/tutorials/chip/t15_peak_calling.jpg)|
|<small>**Outline of three ChIP-seq binding event detection methods**. Peak-finding methods typically either shift the ChIP-seq tag locations in a 3′ direction by half the expected fragment length, or extend the length of the tag in a 3′ direction to be equal to the expected fragment length. Tags from opposite strands are merged to construct an unstranded tag density landscapes, and binding event locations are predicted from the locations with maximum tag coverage within each region that contains a significant enrichment of ChIP-seq tags (i.e. the peak summit). Peak-pairing methods [e.g. GeneTrack build similar tag density landscapes, but retain strandedness information and typically do not shift or extend the tag locations. Peak locations are determined on each strand separately, and nearby peaks in the correct stranded orientation within a given distance are paired together. Binding event locations are predicted from the peak-pair midpoint locations. Probabilistic binding detection methods aim to estimate the locations of binding events that could have given rise to the observed ChIP-seq tag locations. These methods begin training with initial guesses of binding event locations and a model of how tags are expected to be distributed around real ChIP-seq binding events. During each training step, every ChIP-seq tag is probabilistically associated with nearby binding events, depending on the distance between the tag and the event location. Given these probabilistic tag assignments, binding event locations are updated to achieve a better fit with their associated tags, and the model of how tags are distributed around binding events is updated to reflect the accumulation of tags around all current binding events. During the training process, binding events with few assigned tags are weeded out of the model, and the process eventually converges to a set of final binding locations. (Figure and legend from [Mahony and Pugh:2015](http://www.tandfonline.com/doi/full/10.3109/10409238.2015.1051505)).</small>

In this tutorials we will use [MACS2](https://github.com/taoliu/MACS) peak caller.

## How does MACS work?

[MACS](https://www.ncbi.nlm.nih.gov/pubmed?cmd=search&term=18798982) (or its current version MACS2) performs several steps for calling peaks from paired treatment/control datasets:

|                |
|----------------|
|![](/src/tutorials/chip/t15_macs_workflow.jpg)|
|<small>Steps of the MACS workflow (From [Feng:2012](http://www.nature.com/nprot/journal/v7/n9/full/nprot.2012.101.html)).</small>|

Here is a concise description of these steps:

- **Removing redundancy** - MACS retains uniquely mapped reads and removes reads that are repeatedly mapped to the same location. This reduces effects of PCR amplification biases during library preparation.
- **Build model and estimate fragment size** - one of the MACS inputs is the fragment size or *bandwidth*, which is approximate size of DNA fragments generated during fragmentation step of library preparation. MACS first slides a window sized at twice the bandwidth across the genome and finds instances where read counts enriched by between 10 and 30 fold relative to the genome background. It then randomly samples 1,000 of such regions and build the model. To build the model it separates reads mapping to each of the strands and build two distributions (two modes). The midpoint between the two modes is the middle of the binding size and the distance between the modes is the fragment size `d` (see Figure below).

|                |
|----------------|
|![](/src/tutorials/chip/t15_macs_model.png)|
|<small>Peaks mapped to two strands are treated separately to build two coverage density profiles - two two modes. The distance between the modes is the fragment size `d`. This profile is build from 1,000 randomply selected enriched regions (From [Zhang:2008](https://www.ncbi.nlm.nih.gov/pubmed?cmd=search&term=18798982)).</small>|


- **Generate peaks** - now that *d* has been defined MACS slides a window of size *2d* across the genome to identify regions significantly enriched in the ChIP sample. MACS assumes that background reads obey [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution). Thus given the number of reads in a given interval within the control sample we can calculate the probability of having observed number of reads in the ChIP sample (e.g., see flood example [here](https://en.wikipedia.org/wiki/Poisson_distribution#Examples_of_probability_for_Poisson_distributions)). This procedure is performed for several intervals around the examined location (*2d*, 1kb, 5kb, 10kb, and the whole genome) and the maximum value is chosen. One problem with this approach is that it only works if both samples (ChIP and control) are sequenced to the depth, which is not usually happening in practice. To correct with this MACS scales down the larger sample. 

- **Compute False Discovery Rate (FDR)** - [Feng:2012](http://www.nature.com/nprot/journal/v7/n9/full/nprot.2012.101.html) explains computing FDR in MACS as follows: <em>"When a control sample is available </em>(and you should really always use it - AN)<em>, MACS can also estimate an empirical FDR for every peak by exchanging the ChIP-seq and control samples and identifying peaks in the control sample using the same set of parameters used for the ChIP-seq sample. Because the control sample should not exhibit read enrichment, any such peaks found by MACS can be regarded as false positives. For a particular P value threshold, the empirical FDR is then calculated as the number of control peaks passing the threshold divided by the number of ChIP-seq peaks passing the same threshold." </em>

## Running MACS2

In our case we have two replicates each containing ChIP and input DNA samples. We will first run MACS on pulled data (combining two ChIP samples and two inputs, respectively). We will then run MACS on each replicate individually. Finally, we will pick a robust set of peaks present in all three callsets.

### Splitting data into individual samples

One complication with the way we processed all data is that we have combined everything in a single dataset collection. MACS however will need for us to separate ChIP samples and controls. Fortunately for us [we have set readgroups](/tutorials/chip/#mapping) when we were mapping reads to the yeast genome. This will come handy for us right now because we will:

- merge the entire collection of mapped and filtered BAMs into a singe BAM dataset
- split this dataset into four separate BAM files using readgroups
- run MACS on resulting files.

<div class="alert alert-danger" role="alert">This slight complication is a result of current implementation of collection in Galaxy. As we are advancing collection implementation, this tutorial will be modified to make this more elegant in the future.</div>

First, to merge a collection of mapped, filtered BAM files into a single dataset we will use **NGS: Picard -> MergeSamFiles**:

|                |
|----------------|
|![](/src/tutorials/chip/merge_bam.png)|
|<small>**Merging a collection** with `MergeSamFiles`. Here we use default parameters.</small>|

Next, we will use **NGS: SAMtools -> Split** to separate merged file into individual BAM files. Each resulting BAM file will contained aligned reads corresponding to original four datasets:

|                |
|----------------|
|![](/src/tutorials/chip/bam_split.png)|
|<small>**Splitting BAM dataset** on readgroups. This will produce four BAM datasets.</small>|
|![](/src/tutorials/chip/split_data.png)|
|<small>**Resulting datasets**. Each contains aligned reads from the four original conditions.</small>|

### Running MACS

Now it is time to run MACS2. First we will run it on combined data:

|                |
|----------------|
|![](/src/tutorials/chip/macs1.png)|
|<small>**Calling peaks with `MACS2` on pulled data**. Here we choose multiple inputs by pressing <i class="fa fa-files-o" aria-hidden="true"></i> button and selecting both ChIP datasets in **ChIP-Seq Treatment File** and both Input DNA datasets in **ChIP-Seq Control File**. We then provide `12000000` (approximate size of *Saccharomyces cerevisiae* genome) as `Effective genome size` and set **Band width for picking regions to compute fragment size** TO `150`.</small>|

`MACS2` will produce a number of outputs:

|         |
|---------|
|![](/src/tutorials/chip/macs_out.png)|
|<small>**`MACS2` output**.</small>|

Let's click on the pencil icon(<i class="fa fa-pencil" aria-hidden="true"></i>) adjacent to `summits` and `narrow peak` datasets and rename then as shown below:

|         |
|---------|
|![](/src/tutorials/chip/macs_out_renamed.png)|
|<small>**`MACS2` output** with `summits` and `narrow peak` datasets renamed.</small>|.

Now, let's rerun `MACS2` on replicate 1 only:

|                |
|----------------|
|![](/src/tutorials/chip/macs2.png)|
|<small>**Calling peaks with `MACS2` on Replicate 1**. All parameters as above with only exception of selecting single datasets for ChIP and control.</small>|

<div class="alert alert-warning" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Now do this by yourself:
<hr>
	<ul>
		<li>just like we did above, rename `summits` and `narrow peak` datasets generated with this run as `R1 summits` and `R1 narrow peaks`</li>
		<li>run `MACS2` run on replicate 2</li>
		<li>rename resulting `summits` and `narrow peak` datasets as `R2 summits` and `R2 narrow peaks`.</li>
	</ul>
</div>

# Inspecting peaks

Looking at MACS2 data we have gotten the following numers of peaks:

| Pooled | Replicate 1 | Replicate 2 |
|-------:|------------:|------------:|
| 1,905  |  791        |  820        |




