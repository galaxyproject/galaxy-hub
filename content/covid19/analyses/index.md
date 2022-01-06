---
title: "Intrahost analysis (Jan 4, 2022)"
description: "Analysis of variants"
autotoc: false
---

-----

## Thresholding of raw data

<div class="compact">

These are raw counts for 9390063 variants in this set. Organizing them by substitution effect looks like this (only 10 top rows are shown):

<div class="compact">

<style type="text/css">
#T_a348d_row0_col1 {
  width: 10em;
  height: 80%;
  background: linear-gradient(90deg,orange 100.0%, transparent 100.0%);
}
#T_a348d_row1_col1 {
  width: 10em;
  height: 80%;
  background: linear-gradient(90deg,orange 29.4%, transparent 29.4%);
}
#T_a348d_row2_col1 {
  width: 10em;
  height: 80%;
  background: linear-gradient(90deg,orange 12.2%, transparent 12.2%);
}
#T_a348d_row3_col1 {
  width: 10em;
  height: 80%;
  background: linear-gradient(90deg,orange 5.7%, transparent 5.7%);
}
#T_a348d_row4_col1 {
  width: 10em;
  height: 80%;
  background: linear-gradient(90deg,orange 3.9%, transparent 3.9%);
}
#T_a348d_row5_col1 {
  width: 10em;
  height: 80%;
  background: linear-gradient(90deg,orange 2.4%, transparent 2.4%);
}
#T_a348d_row6_col1 {
  width: 10em;
  height: 80%;
  background: linear-gradient(90deg,orange 1.3%, transparent 1.3%);
}
#T_a348d_row7_col1 {
  width: 10em;
  height: 80%;
  background: linear-gradient(90deg,orange 0.1%, transparent 0.1%);
}
#T_a348d_row8_col1, #T_a348d_row9_col1 {
  width: 10em;
  height: 80%;
  background: linear-gradient(90deg,orange 0.0%, transparent 0.0%);
}
</style>
<table id="T_a348d_">
  <thead>
    <tr>
      <th class="blank level0" >&nbsp;</th>
      <th class="col_heading level0 col0" >EFFECT</th>
      <th class="col_heading level0 col1" >COUNT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="T_a348d_level0_row0" class="row_heading level0 row0" >0</th>
      <td id="T_a348d_row0_col0" class="data row0 col0" >NON_SYNONYMOUS_CODING</td>
      <td id="T_a348d_row0_col1" class="data row0 col1" >6053936</td>
    </tr>
    <tr>
      <th id="T_a348d_level0_row1" class="row_heading level0 row1" >1</th>
      <td id="T_a348d_row1_col0" class="data row1 col0" >SYNONYMOUS_CODING</td>
      <td id="T_a348d_row1_col1" class="data row1 col1" >1778954</td>
    </tr>
    <tr>
      <th id="T_a348d_level0_row2" class="row_heading level0 row2" >2</th>
      <td id="T_a348d_row2_col0" class="data row2 col0" >.</td>
      <td id="T_a348d_row2_col1" class="data row2 col1" >740330</td>
    </tr>
    <tr>
      <th id="T_a348d_level0_row3" class="row_heading level0 row3" >3</th>
      <td id="T_a348d_row3_col0" class="data row3 col0" >CODON_CHANGE_PLUS_CODON_DELETION</td>
      <td id="T_a348d_row3_col1" class="data row3 col1" >347489</td>
    </tr>
    <tr>
      <th id="T_a348d_level0_row4" class="row_heading level0 row4" >4</th>
      <td id="T_a348d_row4_col0" class="data row4 col0" >CODON_DELETION</td>
      <td id="T_a348d_row4_col1" class="data row4 col1" >238785</td>
    </tr>
    <tr>
      <th id="T_a348d_level0_row5" class="row_heading level0 row5" >5</th>
      <td id="T_a348d_row5_col0" class="data row5 col0" >STOP_GAINED</td>
      <td id="T_a348d_row5_col1" class="data row5 col1" >145616</td>
    </tr>
    <tr>
      <th id="T_a348d_level0_row6" class="row_heading level0 row6" >6</th>
      <td id="T_a348d_row6_col0" class="data row6 col0" >FRAME_SHIFT</td>
      <td id="T_a348d_row6_col1" class="data row6 col1" >75987</td>
    </tr>
    <tr>
      <th id="T_a348d_level0_row7" class="row_heading level0 row7" >7</th>
      <td id="T_a348d_row7_col0" class="data row7 col0" >CODON_INSERTION</td>
      <td id="T_a348d_row7_col1" class="data row7 col1" >3482</td>
    </tr>
    <tr>
      <th id="T_a348d_level0_row8" class="row_heading level0 row8" >8</th>
      <td id="T_a348d_row8_col0" class="data row8 col0" >FRAME_SHIFT+STOP_GAINED</td>
      <td id="T_a348d_row8_col1" class="data row8 col1" >2255</td>
    </tr>
    <tr>
      <th id="T_a348d_level0_row9" class="row_heading level0 row9" >9</th>
      <td id="T_a348d_row9_col0" class="data row9 col0" >SPLICE_SITE_REGION+SYNONYMOUS_CODING</td>
      <td id="T_a348d_row9_col1" class="data row9 col1" >757</td>
    </tr>
  </tbody>
</table>



</div>

</div>

It is expected that some fraction of these mutations is spurious. One way to remove spurious sites is to see how many times a given mutation appears in the data. Specifically, for each unique mutation compute the number of samples (individual accession numbers) this mutation appears in. Then graph these data by plotting the number of mutations appearing in 1, 2, 3, and so on samples as shown below:

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/per_sample.json"/>
</div>

Using the above image we arbitrarily selected 20 as the lower threshold (this is the point in the graph where red circles begin to disperse). We then applied the following filtering strategy to all sites:

 1. If a site appears with another site(s) in two or more samples it will be kept;
 2. All sites (excluding those satisfying #1 above) are removed if they appear in less than 20 samples.

-----

## Covariable sites

Before applying filtering to our data we identified all co-occuring sites. A co-occuring site is a variant that is linked to other variant(s) in the same set of samples. The following co-occuring sites were identified (note that some of them overlap with Variant of Concern [VOC] defining sites):

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/co_occ.json"/>
</div>

-----

## The filtered set

After applying thresholding we have the following final set of sites:

<ul>
<li class="list-group-item d-flex justify-content-between align-items-center">
Total number of samples (accessions)
<h3><span class="badge badge-warning badge-pill">230500</span></h3>
</li>
<li class="list-group-item d-flex justify-content-between align-items-center">
Fixed allelic variants
<h3><span class="badge badge-warning badge-pill">34.39</span></h3>
</li>
<li class="list-group-item d-flex justify-content-between align-items-center">
Unique allelic variants
<h3><span class="badge badge-warning badge-pill">9903</span></h3>
</li>
<li class="list-group-item d-flex justify-content-between align-items-center">
Low frequency allelic variants
<h3><span class="badge badge-warning badge-pill">2.51</span></h3>
</li>
<li class="list-group-item d-flex justify-content-between align-items-center">
Allelic variants per sample
<h3><span class="badge badge-warning badge-pill">40.74</span></h3>
</li>
<li class="list-group-item d-flex justify-content-between align-items-center">
Synonymous allelic variants per sample
<h3><span class="badge badge-warning badge-pill">7.76</span></h3>
</li>
<li class="list-group-item d-flex justify-content-between align-items-center">
Non-synonymous allelic variants per sample
<h3><span class="badge badge-warning badge-pill">26.4</span></h3>
</li>
</ul>

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



