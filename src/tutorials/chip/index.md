---
autotoc: true
title: Analysis of ChIP-seq data
---

# Data

# QC and Mapping

# Assessment of ChIP quality

## Correlation among samples

In out experiment there are two replicates, each containing treatment and input (control) datasets. The first thing we can check if the samples are correlated. To do this we first generate read count matrix using **NGS: DeepTools -> multiBamSummary**. This tool breaks genome into bins of fixed size (10,000 bp in our example) and computes the number of reads falling within each bin. Here is a fragment of its output:

```
#'chr' 'start' 'end'  'Reb1_R1 mapped'  'Input_R1 mapped' 'Input_R2 mapped' 'Reb1_R2 mapped'
chrVI      0    1000   19.0               41.0              3.0                  6.0
chrVI   1000    2000   29.0               30.0             13.0                  5.0
chrVI   2000    3000    0.0                0.0              0.0                  0.0
chrVI   3000    4000    0.0                2.0              0.0                  0.0
chrVI   4000    5000 7447.0              139.0              7.0               2645.0
```

we can then feed this matrix into **NGS: DeepTools -> plotCorrelation** to generate heat map like this:

|      |
|------|
|![](/src/tutorials/chip/corr.png)|
|<small>**Heatmap** of four samples: two treatments (Rab1) and two controls (Input).</small>|

Here we can see that treatments (Reb1) and controls (input) correlate well with each other. while correlation between treatments and controls is weak. This is a good sign implying that these is some signal on our data.

## Assessing signal strength

How do we tell is we do have signal coming from ChIP enrichment. One way of doing this is Signal Extraction Scaling (SES) proposed by [Diaz:2012](https://www.degruyter.com/downloadpdf/j/sagmb.2012.11.issue-3/1544-6115.1750/1544-6115.1750.pdf). SES works as follows. Suppose we have two datasets: ChIP and Input DNA. We divide genome into *N* non-overlapping windows and for each window compute the number of reads. This way we end up with two lists: one listing read counts for ChIP (ChIP list) and the other for Input (Input list):

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

1 = Window, 2 = read count in ChIP, 3 = read count in Input
4 = % or read to this point in ChIP 5 = % of read to this point in Input
```

if you would draw data in these two columns you will see the following graph:

|      |
|------|
|![](/src/tutorials/chip/ses_example.png)|
|<small>Plot from our toy example.</small>

In real like it will look more like this:

|      |
|------|
|![](/src/tutorials/chip/ses.png)|
|<small>From [Diaz:2012](https://www.degruyter.com/downloadpdf/j/sagmb.2012.11.issue-3/1544-6115.1750/1544-6115.1750.pdf).</small>


|      |
|------|
|![](/src/tutorials/chip/ses_real.png)|