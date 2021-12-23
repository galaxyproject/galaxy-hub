---
title: "usegalaxy.* SARS-CoV-2 monitoring effort"
description: "Using open source tools and public cyberinfrastructure for transparent, reproducible analyses of viral datasets."
components: true
autotoc: false
---

<div class="no-header">

| Column 1 | Column 2 | Column 3 | Column 4 |
| -------- | -------- | -------- | --------|
| [![Baker2020](/images/covid19/baker_2020.png)](https://pubmed.ncbi.nlm.nih.gov/32790776/) | [![martin_2021.png](/images/covid19/martin_2021.png)](https://pubmed.ncbi.nlm.nih.gov/34537136/) | [![maier_2021.png](/images/covid19/maier_2021.png)](https://pubmed.ncbi.nlm.nih.gov/34588690/) | [![mei_2021.png](/images/covid19/mei_2021.png)](https://pubmed.ncbi.nlm.nih.gov/34505896/) |

</div>

-----

### A continuous analysis of intra-host variation in SARS-CoV-2

The current knowledge about the evolutionary dynamics of SARS-CoV-2 comes primarily from genome assemblies and **not** from read-level data. While complete genomes allow complex inferences about [the evolutionary trajectory of the virus](https://pubmed.ncbi.nlm.nih.gov/34537136/) they hide any information about intrahost dynamics because they do not show variants that exist at sub-consensus allele frequencies. This situation is further aggravated by the fact that the number of publicly available read-level datasets lags dramatically behind the number of complete genomes assemblies making it impossible to confirm or further investigate data found in the GISAID database. In addition, only a fraction of available read-level datasets are useful because of the lacking metadata.

Despite these challenges there is a number of high quality read-level datasets produced by several national surveillance efforts including COG-UK, Estonia, Greece, Ireland, and South Africa. Galaxy Europe (https://usegalaxy.eu) and Galaxy US (https://usegalaxy.org) are performing continuous analysis of intra-host variation in these datasets. This resource shows continuously updated results as well as technical information on how to access all our data and how to use our analysis workflows and free public computational infrastructure. One of the most striking conclusions of this analysis is the observation that many variants of concern (VOCs) has existed as low frequencies long before they become dominant in the population. 

<div class="row row-cols-1 row-cols-md-2">
  <div class="col mb-4">
    <div class="card bg-light">
      <div class="card-body">
        <h3><b>Samples</b></h3>
        Information about how we select, pre-process, and analyze public read-level datasets.<br><br>
        <a href="/covid19/genomics/samples" class="btn btn-primary">Read more ...</a>
      </div>
    </div>
  </div>
  <div class="col mb-4">
    <div class="card">
      <div class="card-body bg-light">
        <h3><b>Variants</b></h3>
        Access to all datasets and continuously updated interpretation of intra-host variant data.<br><br>
        <a href="#" class="btn btn-warning">Read more ...</a>
      </div>
    </div>
  </div>
  <div class="col mb-4">
    <div class="card bg-light">
      <div class="card-body">
        <h3><b>Workflows</b></h3>
        Curated and validated Workflows for immediate use on public Galaxy instances across the globe.<br><br>
        <a href="#" class="btn btn-danger">Read more ...</a>
      </div>
    </div>
  </div>
  <div class="col mb-4">
    <div class="card bg-light">
      <div class="card-body">
        <h3><b>Infrastructure</b></h3>
        Free for all computational resources for interactive or programmatic analysis of thousands of samples.<br><br>
        <a href="#" class="btn btn-success">Read more ...</a>
      </div>
    </div>
  </div>
</div>
</div>


-----

## Why intra-host variation?

Many lineage defining site have been present in SARS-CoV-2 genomes at below-consensus frequencies well before becoming fixed. As we demonstrate on our recent [virological post](https://virological.org/t/selection-analysis-identifies-significant-mutational-changes-in-omicron-that-are-likely-to-influence-both-antibody-neutralization-and-spike-function-part-1-of-2/771) the mutations occurring at the 14 Omicron *S*-gene codons which display either evidence of negative selection or no evidence of selection (neutral evolution), have rarely been seen within previously sampled sequences (see [here](https://observablehq.com/@spond/omicron-mutations-tables)) indicating the action of strong purifying selection due to functional constraints. Despite the rarity of these mutations in assembled genomes, it is not uncommon to find them in within-patient sequence datasets (Figure below), often at sub-consensus allelic frequencies. This indicates that, with the possible exceptions of S/N764K, S/N856K and S/Q954H, the mutations at these sites are not rare simply because they are unlikely to occur, but rather because whenever they do occur they are unlikely to either increase sufficiently in frequency to be transmitted, or increase sufficiently in frequency among transmitting viruses to be detected by genomic surveillance.

<vega-embed spec="https://raw.githubusercontent.com/galaxyproject/SARS-CoV-2/master/data/ipynb/graphs/voc_time_progression.json"/>


