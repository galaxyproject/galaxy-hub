---
title: "Intrahost analysis (Jan 4, 2022)"
description: "Analysis of variants"
autotoc: false
---

-----

## Thresholding of raw data

### Raw data overview

The initial dataset contains 12,514,300 variants. Stratification by substitution effect is shown below (10 top rows shown). The minimum and maximum alternative allele frequencies (AFs) are 0.05 and 1 for all categories:

<div class="compact">

<style type="text/css">#T_75f1e_  {  font-size: 8pt;}#T_75f1e_r0_c1, #T_75f1e_r0_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 100.0%, transparent 100.0%);}#T_75f1e_r0_c3, #T_75f1e_r5_c3 {  background-color: #be0126;  color: #f1f1f1;}#T_75f1e_r0_c4 {  background-color: #aa0026;  color: #f1f1f1;}#T_75f1e_r0_c5 {  background-color: #ffea9b;  color: #000000;}#T_75f1e_r1_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 36.3%, transparent 36.3%);}#T_75f1e_r1_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 1.9%, transparent 1.9%);}#T_75f1e_r1_c3 {  background-color: #fff7b7;  color: #000000;}#T_75f1e_r1_c4 {  background-color: #fffec9;  color: #000000;}#T_75f1e_r1_c5 {  background-color: #fd8c3c;  color: #f1f1f1;}#T_75f1e_r2_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 35.7%, transparent 35.7%);}#T_75f1e_r2_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 29.2%, transparent 29.2%);}#T_75f1e_r2_c3 {  background-color: #cd0b22;  color: #f1f1f1;}#T_75f1e_r2_c4 {  background-color: #b40026;  color: #f1f1f1;}#T_75f1e_r2_c5 {  background-color: #fec35e;  color: #000000;}#T_75f1e_r3_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 4.8%, transparent 4.8%);}#T_75f1e_r3_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 2.1%, transparent 2.1%);}#T_75f1e_r3_c3 {  background-color: #d7121f;  color: #f1f1f1;}#T_75f1e_r3_c4, #T_75f1e_r5_c4 {  background-color: #b90026;  color: #f1f1f1;}#T_75f1e_r3_c5 {  background-color: #fd7a37;  color: #f1f1f1;}#T_75f1e_r4_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 4.1%, transparent 4.1%);}#T_75f1e_r4_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 5.2%, transparent 5.2%);}#T_75f1e_r4_c3, #T_75f1e_r4_c4, #T_75f1e_r6_c3, #T_75f1e_r6_c4, #T_75f1e_r9_c5 {  background-color: #800026;  color: #f1f1f1;}#T_75f1e_r4_c5, #T_75f1e_r7_c3, #T_75f1e_r7_c4 {  background-color: #ffffcc;  color: #000000;}#T_75f1e_r5_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 3.6%, transparent 3.6%);}#T_75f1e_r5_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 12.2%, transparent 12.2%);}#T_75f1e_r5_c5, #T_75f1e_r6_c5 {  background-color: #fffac0;  color: #000000;}#T_75f1e_r6_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 2.5%, transparent 2.5%);}#T_75f1e_r6_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 3.7%, transparent 3.7%);}#T_75f1e_r7_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 0.6%, transparent 0.6%);}#T_75f1e_r7_c2, #T_75f1e_r8_c2, #T_75f1e_r9_c2 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 0.0%, transparent 0.0%);}#T_75f1e_r7_c5 {  background-color: #ffe58f;  color: #000000;}#T_75f1e_r8_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 0.3%, transparent 0.3%);}#T_75f1e_r8_c3 {  background-color: #e51e1d;  color: #f1f1f1;}#T_75f1e_r8_c4 {  background-color: #950026;  color: #f1f1f1;}#T_75f1e_r8_c5 {  background-color: #ea2920;  color: #f1f1f1;}#T_75f1e_r9_c1 {  width: 10em;  height: 80%;  background: linear-gradient(90deg,orange 0.2%, transparent 0.2%);}#T_75f1e_r9_c3 {  background-color: #fed673;  color: #000000;}#T_75f1e_r9_c4 {  background-color: #fff9bd;  color: #000000;}</style><table id="T_75f1e_">  <thead>    <tr>      <th class="blank level0" >&nbsp;</th>      <th class="col_heading level0 c0" >EFFECT</th>      <th class="col_heading level0 c1" >Sites</th>      <th class="col_heading level0 c2" >Mutations</th>      <th class="col_heading level0 c3" >AF_mean</th>      <th class="col_heading level0 c4" >AF_median</th>      <th class="col_heading level0 c5" >AF_std</th>    </tr>  </thead>  <tbody>    <tr>      <th id="T_75f1e_level0_r0" class="row_heading level0 r0" >0</th>      <td id="T_75f1e_r0_c0" class="data r0 c0" >NON_SYNONYMOUS_CODING</td>      <td id="T_75f1e_r0_c1" class="data r0 c1" >43,484</td>      <td id="T_75f1e_r0_c2" class="data r0 c2" >8,097,988</td>      <td id="T_75f1e_r0_c3" class="data r0 c3" >0.87</td>      <td id="T_75f1e_r0_c4" class="data r0 c4" >0.92</td>      <td id="T_75f1e_r0_c5" class="data r0 c5" >0.16</td>    </tr>    <tr>      <th id="T_75f1e_level0_r1" class="row_heading level0 r1" >1</th>      <td id="T_75f1e_r1_c0" class="data r1 c0" >FRAME_SHIFT</td>      <td id="T_75f1e_r1_c1" class="data r1 c1" >15,766</td>      <td id="T_75f1e_r1_c2" class="data r1 c2" >151,046</td>      <td id="T_75f1e_r1_c3" class="data r1 c3" >0.18</td>      <td id="T_75f1e_r1_c4" class="data r1 c4" >0.08</td>      <td id="T_75f1e_r1_c5" class="data r1 c5" >0.26</td>    </tr>    <tr>      <th id="T_75f1e_level0_r2" class="row_heading level0 r2" >2</th>      <td id="T_75f1e_r2_c0" class="data r2 c0" >SYNONYMOUS_CODING</td>      <td id="T_75f1e_r2_c1" class="data r2 c1" >15,538</td>      <td id="T_75f1e_r2_c2" class="data r2 c2" >2,365,396</td>      <td id="T_75f1e_r2_c3" class="data r2 c3" >0.83</td>      <td id="T_75f1e_r2_c4" class="data r2 c4" >0.90</td>      <td id="T_75f1e_r2_c5" class="data r2 c5" >0.21</td>    </tr>    <tr>      <th id="T_75f1e_level0_r3" class="row_heading level0 r3" >3</th>      <td id="T_75f1e_r3_c0" class="data r3 c0" >STOP_GAINED</td>      <td id="T_75f1e_r3_c1" class="data r3 c1" >2,106</td>      <td id="T_75f1e_r3_c2" class="data r3 c2" >171,137</td>      <td id="T_75f1e_r3_c3" class="data r3 c3" >0.80</td>      <td id="T_75f1e_r3_c4" class="data r3 c4" >0.89</td>      <td id="T_75f1e_r3_c5" class="data r3 c5" >0.27</td>    </tr>    <tr>      <th id="T_75f1e_level0_r4" class="row_heading level0 r4" >4</th>      <td id="T_75f1e_r4_c0" class="data r4 c0" >CODON_CHANGE_PLUS_CODON_DELETION</td>      <td id="T_75f1e_r4_c1" class="data r4 c1" >1,803</td>      <td id="T_75f1e_r4_c2" class="data r4 c2" >424,957</td>      <td id="T_75f1e_r4_c3" class="data r4 c3" >0.98</td>      <td id="T_75f1e_r4_c4" class="data r4 c4" >1.00</td>      <td id="T_75f1e_r4_c5" class="data r4 c5" >0.12</td>    </tr>    <tr>      <th id="T_75f1e_level0_r5" class="row_heading level0 r5" >5</th>      <td id="T_75f1e_r5_c0" class="data r5 c0" >.</td>      <td id="T_75f1e_r5_c1" class="data r5 c1" >1,559</td>      <td id="T_75f1e_r5_c2" class="data r5 c2" >986,259</td>      <td id="T_75f1e_r5_c3" class="data r5 c3" >0.87</td>      <td id="T_75f1e_r5_c4" class="data r5 c4" >0.89</td>      <td id="T_75f1e_r5_c5" class="data r5 c5" >0.13</td>    </tr>    <tr>      <th id="T_75f1e_level0_r6" class="row_heading level0 r6" >6</th>      <td id="T_75f1e_r6_c0" class="data r6 c0" >CODON_DELETION</td>      <td id="T_75f1e_r6_c1" class="data r6 c1" >1,101</td>      <td id="T_75f1e_r6_c2" class="data r6 c2" >303,235</td>      <td id="T_75f1e_r6_c3" class="data r6 c3" >0.98</td>      <td id="T_75f1e_r6_c4" class="data r6 c4" >1.00</td>      <td id="T_75f1e_r6_c5" class="data r6 c5" >0.13</td>    </tr>    <tr>      <th id="T_75f1e_level0_r7" class="row_heading level0 r7" >7</th>      <td id="T_75f1e_r7_c0" class="data r7 c0" >FRAME_SHIFT+STOP_GAINED</td>      <td id="T_75f1e_r7_c1" class="data r7 c1" >279</td>      <td id="T_75f1e_r7_c2" class="data r7 c2" >3,694</td>      <td id="T_75f1e_r7_c3" class="data r7 c3" >0.13</td>      <td id="T_75f1e_r7_c4" class="data r7 c4" >0.07</td>      <td id="T_75f1e_r7_c5" class="data r7 c5" >0.17</td>    </tr>    <tr>      <th id="T_75f1e_level0_r8" class="row_heading level0 r8" >8</th>      <td id="T_75f1e_r8_c0" class="data r8 c0" >CODON_CHANGE_PLUS_CODON_INSERTION</td>      <td id="T_75f1e_r8_c1" class="data r8 c1" >119</td>      <td id="T_75f1e_r8_c2" class="data r8 c2" >1,334</td>      <td id="T_75f1e_r8_c3" class="data r8 c3" >0.76</td>      <td id="T_75f1e_r8_c4" class="data r8 c4" >0.96</td>      <td id="T_75f1e_r8_c5" class="data r8 c5" >0.32</td>    </tr>    <tr>      <th id="T_75f1e_level0_r9" class="row_heading level0 r9" >9</th>      <td id="T_75f1e_r9_c0" class="data r9 c0" >STOP_GAINED+CODON_CHANGE_PLUS_CODON_DELETION</td>      <td id="T_75f1e_r9_c1" class="data r9 c1" >89</td>      <td id="T_75f1e_r9_c2" class="data r9 c2" >328</td>      <td id="T_75f1e_r9_c3" class="data r9 c3" >0.35</td>      <td id="T_75f1e_r9_c4" class="data r9 c4" >0.11</td>      <td id="T_75f1e_r9_c5" class="data r9 c5" >0.40</td>    </tr>  </tbody></table>

</div>

### Thresholding by sample-frequency

It is expected that some fraction of these mutations is spurious. One way to remove spurious sites is to see how many times a given mutation appears in the data. Specifically, for each unique mutation compute the number of samples (individual accession numbers) this mutation appears in. Then graph these data by plotting the number of mutations appearing in 1, 2, 3, and so on samples as shown below:

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/per_sample.json"/>
</div>

Using the above image we arbitrarily selected <kbd>20</kbd> as the lower threshold (this is the point in the graph where red circles begin to disperse). 

### Thresholding by co-occurrence

Another approach to identifying real variants is to look for sites that co-occur with other sites in the same set of samples.
Since having two or more sites co-occurring in two or more samples is highly unlikely by chance, we can use this approach to keep variants
that would otherwise be removed by sample-frequency filtering described in the previous section. The figure below shows all sets of two or more 
variants co-occuring in two of more samples

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/co_occ.json"/>
</div>

----

## The filtered set

After applying thresholding we have the following final set of sites:

<div class="no-header compact">

|    |     |
| --------- | ------------ |
| Total number of samples (accessions) | <h3><span class="badge badge-warning badge-pill">284,224</span></h3> | 
| Fixed allelic variants | <h3><span class="badge badge-warning badge-pill">35.97</span></h3> | 
| Unique allelic variants | <h3><span class="badge badge-warning badge-pill">12,622</span></h3> | 
| Low frequency allelic variants per sample | <h3><span class="badge badge-warning badge-pill">2.7</span></h3> | 
| Allelic variants per sample | <h3><span class="badge badge-warning badge-pill">42.9</span></h3> | 
| Synonymous allelic variants per sample | <h3><span class="badge badge-warning badge-pill">8.1</span></h3> | 
| Non-synonymous allelic variants per sample | <h3><span class="badge badge-warning badge-pill">28.0</span></h3> | 

</div>

The allele frequencies have the following distribution when stratified by EFFECT types:

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/af_effect.json"/>
</div>

-----

## Temporal substitution dynamics at VOC sites

One interesting application of our data is examining the extent of intra-host variation at sites identified as [Variants of Concern](https://cov-lineages.org/index.html#global_reports). Many VOC sites have been present in SARS-CoV-2 genomes at below-consensus frequencies well before becoming fixed. As we demonstrate on our recent [virological post](https://virological.org/t/selection-analysis-identifies-significant-mutational-changes-in-omicron-that-are-likely-to-influence-both-antibody-neutralization-and-spike-function-part-1-of-2/771) the mutations occurring at the 14 Omicron *S*-gene codons which display either evidence of negative selection or no evidence of selection (neutral evolution), have rarely been seen within previously sampled sequences (see [here](https://observablehq.com/@spond/omicron-mutations-tables)) indicating the action of strong purifying selection due to functional constraints. Despite the rarity of these mutations in assembled genomes, it is not uncommon to find them in within-patient sequence datasets (Figure below), often at sub-consensus allelic frequencies. This indicates that, with the possible exceptions of S/N764K, S/N856K and S/Q954H, the mutations at these sites are not rare simply because they are unlikely to occur, but rather because whenever they do occur they are unlikely to either increase sufficiently in frequency to be transmitted, or increase sufficiently in frequency among transmitting viruses to be detected by genomic surveillance. The following figure shows this dynamics using pre-omicron data across the SARS-CoV-2 genome:

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/voc_time_progression_full_genome.json"/>
</div>

------

## Substitution dynamics during chronic infection

In addition to continuously analyzing [data](/covid19/samples/) from several national surveillance projects we applied our [workflows](/covid19/workflows/) to a unique datadset generated by Weigang et al. [2021](https://www.nature.com/articles/s41467-021-26602-3). In this dataset ampliconic and metatranscriptomic data was collected at nine time points. At several time points (days 14 and 105) in addition to ampliconic sequencing from swab specimens a cell-culture propagated isolates were also created and sequenced. The following figure shows the temporal dynamics for variants identified in these samples:

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/freiburg_chronic.json"/>
</div>



