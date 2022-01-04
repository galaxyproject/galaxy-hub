---
title: "Intrahost analysis (Jan 4, 2022)"
description: "Analysis of variants"
components: true
autotoc: false
---

-----

## Thresholding of raw data

<div class="compact">

These are raw counts for 9390063 variants in this set:

| EFFECT                                       |   Sites |   Mutations |   AF_min |   AF_mean |   AF_median |   AF_std |   AF_max |
|:---------------------------------------------|--------:|------------:|---------:|----------:|------------:|---------:|---------:|
| NON_SYNONYMOUS_CODING                        |    5359 |     6053936 |     0.05 |      0.88 |        0.92 |     0.14 |     1    |
| SYNONYMOUS_CODING                            |    3415 |     1778954 |     0.05 |      0.84 |        0.9  |     0.2  |     1    |
| .                                            |     310 |      740330 |     0.05 |      0.88 |        0.89 |     0.12 |     1    |
| CODON_CHANGE_PLUS_CODON_DELETION             |     190 |      347489 |     0.05 |      0.98 |        1    |     0.09 |     1    |
| CODON_DELETION                               |     132 |      238785 |     0.05 |      0.98 |        1    |     0.1  |     1    |
| STOP_GAINED                                  |      71 |      145616 |     0.05 |      0.85 |        0.9  |     0.2  |     1    |
| FRAME_SHIFT                                  |     671 |       75987 |     0.05 |      0.23 |        0.09 |     0.31 |     5.27 |
| CODON_INSERTION                              |       1 |        3482 |     0.05 |      0.96 |        0.99 |     0.15 |     1    |
| FRAME_SHIFT+STOP_GAINED                      |      14 |        2255 |     0.05 |      0.13 |        0.07 |     0.17 |     0.9  |
| SPLICE_SITE_REGION+SYNONYMOUS_CODING         |       4 |         757 |     0.05 |      0.89 |        0.95 |     0.2  |     1    |
| GENE_FUSION                                  |      17 |         602 |     0.05 |      0.86 |        0.99 |     0.31 |     1    |
| CODON_CHANGE_PLUS_CODON_INSERTION            |      10 |         597 |     0.05 |      0.76 |        0.96 |     0.3  |     1    |
| START_LOST                                   |       8 |         326 |     0.05 |      0.75 |        0.94 |     0.35 |     0.99 |
| SPLICE_SITE_REGION+SYNONYMOUS_STOP           |       1 |         266 |     0.07 |      0.88 |        0.89 |     0.09 |     1    |
| NON_SYNONYMOUS_CODING+SPLICE_SITE_REGION     |       3 |         244 |     0.05 |      0.77 |        0.87 |     0.25 |     1    |
| STOP_GAINED+CODON_CHANGE_PLUS_CODON_DELETION |      17 |         134 |     0.05 |      0.37 |        0.11 |     0.4  |     1    |
| FRAME_SHIFT+START_LOST                       |       2 |          98 |     0.13 |      0.91 |        0.99 |     0.16 |     1    |
| STOP_LOST+SPLICE_SITE_REGION                 |       1 |          91 |     0.05 |      0.81 |        0.91 |     0.26 |     0.98 |
| FRAME_SHIFT+STOP_LOST+SPLICE_SITE_REGION     |       7 |          77 |     0.05 |      0.79 |        0.99 |     0.35 |     1    |
| CODON_INSERTION+SPLICE_SITE_REGION           |       1 |          33 |     0.05 |      0.79 |        0.95 |     0.3  |     0.98 |
| FRAME_SHIFT+SPLICE_SITE_REGION               |       1 |           1 |     0.07 |      0.07 |        0.07 |   nan    |     0.07 |
| CODON_DELETION+SPLICE_SITE_REGION            |       1 |           1 |     0.06 |      0.06 |        0.06 |   nan    |     0.06 |
| FRAME_SHIFT+NON_SYNONYMOUS_CODING            |       1 |           1 |     1    |      1    |        1    |   nan    |     1    |
| START_LOST+CODON_CHANGE_PLUS_CODON_DELETION  |       1 |           1 |     0.18 |      0.18 |        0.18 |   nan    |     0.18 |

</div>

It is expected that some fraction of these mutations is spurious. One way to remove spurious sites is to see how many times a given mutation appears in the data. Specifically, for each unique mutation compute the number of samples (individual accession numbers) this mutation appears in. Then graph these data by plotting the number of mutations appearing in 1, 2, 3, and so on samples as shown below:

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <p><h4>Per sample counts for individual variants<br>(use upper panel to select data)</h4></p>
<vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/per_sample.json"/>
</div>