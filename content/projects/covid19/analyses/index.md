---
title: "Result interpretation (Jan 24, 2022)"
description: "Analysis of variants"
autotoc: false
---

We provide two resources interpreting our results. The first is this page. Its content is updated weekly and we are continuously adding new analysis snippets. The second resource is our constantly updated [Observable Dashboard](http://covid19.galaxyproject.org/dashboard).


-----

## The data

### High level descriptive statistics

After filtering (see [Methods](#thresholding-of-raw-data)) the dataset contains 11,384,133 variants distributed across 27,638 sites in 299,778 samples from 1,482 batches with the following substitution effect breakdown (10 top effects shown):

<div class="compact">

<style type="text/css">#T_1d0dd_  {  font-size: 9pt;}#T_1d0dd_r0_c1, #T_1d0dd_r0_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 100.0%, transparent 100.0%);}#T_1d0dd_r0_c3, #T_1d0dd_r5_c3 {  background-color: #860026;  color: #f1f1f1;}#T_1d0dd_r0_c4, #T_1d0dd_r1_c4, #T_1d0dd_r3_c4, #T_1d0dd_r4_c3, #T_1d0dd_r4_c4, #T_1d0dd_r5_c4, #T_1d0dd_r9_c5 {  background-color: #800026;  color: #f1f1f1;}#T_1d0dd_r0_c5 {  background-color: #fff3ae;  color: #000000;}#T_1d0dd_r1_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 42.2%, transparent 42.2%);}#T_1d0dd_r1_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 28.3%, transparent 28.3%);}#T_1d0dd_r1_c3 {  background-color: #8b0026;  color: #f1f1f1;}#T_1d0dd_r1_c5 {  background-color: #fee085;  color: #000000;}#T_1d0dd_r2_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 24.6%, transparent 24.6%);}#T_1d0dd_r2_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 1.1%, transparent 1.1%);}#T_1d0dd_r2_c3 {  background-color: #fff0a7;  color: #000000;}#T_1d0dd_r2_c4 {  background-color: #fffcc5;  color: #000000;}#T_1d0dd_r2_c5 {  background-color: #e61f1d;  color: #f1f1f1;}#T_1d0dd_r3_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 3.9%, transparent 3.9%);}#T_1d0dd_r3_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 1.9%, transparent 1.9%);}#T_1d0dd_r3_c3 {  background-color: #ae0026;  color: #f1f1f1;}#T_1d0dd_r3_c5 {  background-color: #fd7e38;  color: #f1f1f1;}#T_1d0dd_r4_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 2.8%, transparent 2.8%);}#T_1d0dd_r4_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 5.1%, transparent 5.1%);}#T_1d0dd_r4_c5, #T_1d0dd_r6_c3, #T_1d0dd_r6_c4 {  background-color: #ffffcc;  color: #000000;}#T_1d0dd_r5_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 1.6%, transparent 1.6%);}#T_1d0dd_r5_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 3.7%, transparent 3.7%);}#T_1d0dd_r5_c5 {  background-color: #fff7b7;  color: #000000;}#T_1d0dd_r6_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 0.4%, transparent 0.4%);}#T_1d0dd_r6_c2, #T_1d0dd_r7_c2, #T_1d0dd_r8_c2, #T_1d0dd_r9_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 0.0%, transparent 0.0%);}#T_1d0dd_r6_c5, #T_1d0dd_r7_c5 {  background-color: #fea747;  color: #000000;}#T_1d0dd_r7_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 0.2%, transparent 0.2%);}#T_1d0dd_r7_c3 {  background-color: #b90026;  color: #f1f1f1;}#T_1d0dd_r7_c4, #T_1d0dd_r8_c4 {  background-color: #840026;  color: #f1f1f1;}#T_1d0dd_r8_c1, #T_1d0dd_r9_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 0.1%, transparent 0.1%);}#T_1d0dd_r8_c3 {  background-color: #9d0026;  color: #f1f1f1;}#T_1d0dd_r8_c5 {  background-color: #fecb67;  color: #000000;}#T_1d0dd_r9_c3 {  background-color: #fc6430;  color: #f1f1f1;}#T_1d0dd_r9_c4 {  background-color: #990026;  color: #f1f1f1;}</style><table id="T_1d0dd_">  <thead>    <tr>      <th class="blank level0" >&nbsp;</th>      <th class="col_heading level0 c0" >EFFECT</th>      <th class="col_heading level0 c1" >Sites</th>      <th class="col_heading level0 c2" >Mutations</th>      <th class="col_heading level0 c3" >AF_mean</th>      <th class="col_heading level0 c4" >AF_median</th>      <th class="col_heading level0 c5" >AF_std</th>    </tr>  </thead>  <tbody>    <tr>      <th id="T_1d0dd_level0_r0" class="row_heading level0 r0" >0</th>      <td id="T_1d0dd_r0_c0" class="data r0 c0" >NON_SYNONYMOUS_CODING</td>      <td id="T_1d0dd_r0_c1" class="data r0 c1" >33,477</td>      <td id="T_1d0dd_r0_c2" class="data r0 c2" >8,114,371</td>      <td id="T_1d0dd_r0_c3" class="data r0 c3" >0.98</td>      <td id="T_1d0dd_r0_c4" class="data r0 c4" >1.00</td>      <td id="T_1d0dd_r0_c5" class="data r0 c5" >0.11</td>    </tr>    <tr>      <th id="T_1d0dd_level0_r1" class="row_heading level0 r1" >1</th>      <td id="T_1d0dd_r1_c0" class="data r1 c0" >SYNONYMOUS_CODING</td>      <td id="T_1d0dd_r1_c1" class="data r1 c1" >14,112</td>      <td id="T_1d0dd_r1_c2" class="data r1 c2" >2,297,931</td>      <td id="T_1d0dd_r1_c3" class="data r1 c3" >0.97</td>      <td id="T_1d0dd_r1_c4" class="data r1 c4" >1.00</td>      <td id="T_1d0dd_r1_c5" class="data r1 c5" >0.15</td>    </tr>    <tr>      <th id="T_1d0dd_level0_r2" class="row_heading level0 r2" >2</th>      <td id="T_1d0dd_r2_c0" class="data r2 c0" >FRAME_SHIFT</td>      <td id="T_1d0dd_r2_c1" class="data r2 c1" >8,223</td>      <td id="T_1d0dd_r2_c2" class="data r2 c2" >89,552</td>      <td id="T_1d0dd_r2_c3" class="data r2 c3" >0.25</td>      <td id="T_1d0dd_r2_c4" class="data r2 c4" >0.09</td>      <td id="T_1d0dd_r2_c5" class="data r2 c5" >0.33</td>    </tr>    <tr>      <th id="T_1d0dd_level0_r3" class="row_heading level0 r3" >3</th>      <td id="T_1d0dd_r3_c0" class="data r3 c0" >STOP_GAINED</td>      <td id="T_1d0dd_r3_c1" class="data r3 c1" >1,322</td>      <td id="T_1d0dd_r3_c2" class="data r3 c2" >153,309</td>      <td id="T_1d0dd_r3_c3" class="data r3 c3" >0.91</td>      <td id="T_1d0dd_r3_c4" class="data r3 c4" >1.00</td>      <td id="T_1d0dd_r3_c5" class="data r3 c5" >0.26</td>    </tr>    <tr>      <th id="T_1d0dd_level0_r4" class="row_heading level0 r4" >4</th>      <td id="T_1d0dd_r4_c0" class="data r4 c0" >CODON_CHANGE_PLUS_CODON_DELETION</td>      <td id="T_1d0dd_r4_c1" class="data r4 c1" >929</td>      <td id="T_1d0dd_r4_c2" class="data r4 c2" >415,428</td>      <td id="T_1d0dd_r4_c3" class="data r4 c3" >0.99</td>      <td id="T_1d0dd_r4_c4" class="data r4 c4" >1.00</td>      <td id="T_1d0dd_r4_c5" class="data r4 c5" >0.08</td>    </tr>    <tr>      <th id="T_1d0dd_level0_r5" class="row_heading level0 r5" >5</th>      <td id="T_1d0dd_r5_c0" class="data r5 c0" >CODON_DELETION</td>      <td id="T_1d0dd_r5_c1" class="data r5 c1" >547</td>      <td id="T_1d0dd_r5_c2" class="data r5 c2" >302,105</td>      <td id="T_1d0dd_r5_c3" class="data r5 c3" >0.98</td>      <td id="T_1d0dd_r5_c4" class="data r5 c4" >1.00</td>      <td id="T_1d0dd_r5_c5" class="data r5 c5" >0.10</td>    </tr>    <tr>      <th id="T_1d0dd_level0_r6" class="row_heading level0 r6" >6</th>      <td id="T_1d0dd_r6_c0" class="data r6 c0" >FRAME_SHIFT+STOP_GAINED</td>      <td id="T_1d0dd_r6_c1" class="data r6 c1" >150</td>      <td id="T_1d0dd_r6_c2" class="data r6 c2" >2,033</td>      <td id="T_1d0dd_r6_c3" class="data r6 c3" >0.16</td>      <td id="T_1d0dd_r6_c4" class="data r6 c4" >0.07</td>      <td id="T_1d0dd_r6_c5" class="data r6 c5" >0.22</td>    </tr>    <tr>      <th id="T_1d0dd_level0_r7" class="row_heading level0 r7" >7</th>      <td id="T_1d0dd_r7_c0" class="data r7 c0" >CODON_CHANGE_PLUS_CODON_INSERTION</td>      <td id="T_1d0dd_r7_c1" class="data r7 c1" >80</td>      <td id="T_1d0dd_r7_c2" class="data r7 c2" >2,016</td>      <td id="T_1d0dd_r7_c3" class="data r7 c3" >0.89</td>      <td id="T_1d0dd_r7_c4" class="data r7 c4" >0.99</td>      <td id="T_1d0dd_r7_c5" class="data r7 c5" >0.22</td>    </tr>    <tr>      <th id="T_1d0dd_level0_r8" class="row_heading level0 r8" >8</th>      <td id="T_1d0dd_r8_c0" class="data r8 c0" >CODON_INSERTION</td>      <td id="T_1d0dd_r8_c1" class="data r8 c1" >44</td>      <td id="T_1d0dd_r8_c2" class="data r8 c2" >3,614</td>      <td id="T_1d0dd_r8_c3" class="data r8 c3" >0.94</td>      <td id="T_1d0dd_r8_c4" class="data r8 c4" >0.99</td>      <td id="T_1d0dd_r8_c5" class="data r8 c5" >0.18</td>    </tr>    <tr>      <th id="T_1d0dd_level0_r9" class="row_heading level0 r9" >9</th>      <td id="T_1d0dd_r9_c0" class="data r9 c0" >STOP_GAINED+CODON_CHANGE_PLUS_CODON_DELETION</td>      <td id="T_1d0dd_r9_c1" class="data r9 c1" >39</td>      <td id="T_1d0dd_r9_c2" class="data r9 c2" >158</td>      <td id="T_1d0dd_r9_c3" class="data r9 c3" >0.64</td>      <td id="T_1d0dd_r9_c4" class="data r9 c4" >0.95</td>      <td id="T_1d0dd_r9_c5" class="data r9 c5" >0.42</td>    </tr>  </tbody></table>

</div>

Some key features of this dataset are:

<div class="no-header compact">

|    |     |
| --------- | ------------ |
| Total number of samples (accessions) | <h3><span class="badge badge-warning badge-pill">299,778</span></h3> | 
| Fixed (AF > 80%) allelic variants per sample | <h3><span class="badge badge-warning badge-pill">36.7</span></h3> | 
| Intermediate frequency (20% < AF < 80%) allelic variants per sample | <h3><span class="badge badge-warning badge-pill">1.82</span></h3> | 
| Low frequency (AF < 20%) allelic variants per sample | <h3><span class="badge badge-warning badge-pill">2.69</span></h3> | 
| Unique allelic variants | <h3><span class="badge badge-warning badge-pill">58,467</span></h3> | 
| Allelic variants per sample | <h3><span class="badge badge-warning badge-pill">37.98</span></h3> | 
| Synonymous allelic variants per sample | <h3><span class="badge badge-warning badge-pill">7.7</span></h3> | 
| Non-synonymous allelic variants per sample | <h3><span class="badge badge-warning badge-pill">27.17</span></h3> | 

</div>

### Distribution of allele frequencies

The allele frequencies have the following distribution when stratified by EFFECT types:

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/af_effect.json"/>
</div>

### Distribution of variants across genes

The density of synonymous and non-synonymous changes across genes:

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/per_gene_density.json"/>
</div>

### Allele frequency distribution for individual sites

To view allele frequency distribution for individual sites click on a circle in the graph below:

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/genome_map_density.json"/>
</div>

------

## Co-occurring sites

The figure below shows all sets of two or more variants co-occuring in two of more samples:

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/co_occ.json"/>
</div>

------

## Temporal substitution dynamics at VOC sites

One interesting application of our data is examining the extent of intra-host variation at sites identified as [Variants of Concern](https://cov-lineages.org/index.html#global_reports). Many VOC sites have been present in SARS-CoV-2 genomes at below-consensus frequencies well before becoming fixed. As we demonstrate on our recent [virological post](https://virological.org/t/selection-analysis-identifies-significant-mutational-changes-in-omicron-that-are-likely-to-influence-both-antibody-neutralization-and-spike-function-part-1-of-2/771) the mutations occurring at the 14 Omicron *S*-gene codons which display either evidence of negative selection or no evidence of selection (neutral evolution), have rarely been seen within previously sampled sequences (see [here](https://observablehq.com/@spond/omicron-mutations-tables)) indicating the action of strong purifying selection due to functional constraints. Despite the rarity of these mutations in assembled genomes, it is not uncommon to find them in within-patient sequence datasets (Figure below), often at sub-consensus allelic frequencies. This indicates that, with the possible exceptions of S/N764K, S/N856K and S/Q954H, the mutations at these sites are not rare simply because they are unlikely to occur, but rather because whenever they do occur they are unlikely to either increase sufficiently in frequency to be transmitted, or increase sufficiently in frequency among transmitting viruses to be detected by genomic surveillance. The following figure shows this dynamics using pre-omicron data across the SARS-CoV-2 genome:

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/voc_time_progression_full_genome.json"/>
</div>

------

## Substitution dynamics during chronic infection

In addition to continuously analyzing [data](/projects/covid19/samples/) from several national surveillance projects we applied our [workflows](/projects/covid19/workflows/) to a unique datadset generated by Weigang et al. [2021](https://www.nature.com/articles/s41467-021-26602-3). In this dataset ampliconic and metatranscriptomic data was collected at nine time points. At several time points (days 14 and 105) in addition to ampliconic sequencing from swab specimens a cell-culture propagated isolates were also created and sequenced. The following figure shows the temporal dynamics for variants identified in these samples:

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/freiburg_chronic.json"/>
</div>


# Methods

## Poisson estimation of allelic variant exclusion threshold and error rate


The initial dataset contains 11,706,474 variants distributed across 29,074 sites in 299,778 samples from 1,482 batches. Because we expect that some fraction of these variants are erroneous for each batch we compute allelic variant (AV) exclusion threshold (*T*) and error rate. *T* is the number of samples in a given batch a variant must be observed in. This logic comes from the assumption that a fraction of allelic variants with low frequencies are random errors, modeled by a simple Poisson distribution with per-site error rate λ. We tabulate, for each position in the genome, the number of samples that contained an AV with 0.05 ≤ AF ≤ 0.5, inferred λ using a closed form ML estimator (the mean of per-base counts), and plotted the observed number of genome positions with *N* = 0,1,2… and so on AVs.  We that compute the point where the predicted Poisson distribution diverges from the observed distribution, which gives us the *T* (for details see [this script](https://github.com/usegalaxy-eu/ena-cog-uk-wfs/blob/aggregate-observable-data/aggregator.py)). The distribution of error rates across analysis batches is shown below:

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/poisson.json"/>
</div> 

### The filtered set

Using *T* value for each sample we then filtered allelic variants in every batch by removing all variants that have allele frequency below 50% and appear in less than *T* samples within this batch. 




