---
title: "Data"
description: "Data produced by Galaxy COVID19 effort"
components: true
autotoc: false
---

All data produced by our effort can be found at a public FTP server at <kbd>ftp://xfer13.crg.eu/</kbd>. This site was generously provided by [the Viral Beacon project](https://covid19beacon.crg.eu/).

The root directory of the FTP site contains aggregate files (`all_variants.tsv.gz`, `all_consensus.fasta.gz`, `all_pangolin.tsv.gz`, `gx-observable_data_*` and `gx-suveillance.json`) as well as directories corresponding to all data processed so far (directories beginning with `SRR`, `ERR`, or `Estonia`). Aggregate files contain variant information from all processed samples. 

## Global variant list `all_variants.tsv.gz`

<div class="alert alert-danger" role="alert">
We are in the process of updating specifications of this file. The complete description will appear shortly.
</div>

## Global consensus file (`all_consensus.fasta.gz`)

Consensus sequences for each sample constructed from the called variants, in which a consensus allele is defined by an intra-sample allele frequency of >= 0.7 and in which low-coverage and ambiguous sites with a variant allele reaching an allele frequency between 0.25 and 0.7 are hard-masked.

## Global pango lineage file (`all_pangolin.tsv.gz`)

A mapping between every analyze sample and PANGO lineage designation.  
  
## Variant lists for every bioproject

Each bioproject analyzed by us is represented by two json files: 

 1. `gx-observable_{PROJECT_ID}.json.gz` - information about variants in json format. 
 2. `gx-observable_{PROJECT_ID}_meta.tsv.gz` - metadata for every sample (such as the collection date)

## Information about every analysis run

JSON file, `gx-surveillance.json`, with an up-to-date list of all datasets analyzed so far including URLs to the corresponding Galaxy histories and the TSV datasets. Specifically, the tabular variant reports are part of the history listed under `report` in the JSON file and a direct link to a per-sample variant report for each batch can be found under `report` -> `datamonkey_link`.


```json
"0ce66d803a055fef": {
    "batch_id": "NT1666262G",
    "variation": "https://usegalaxy.eu/histories/view?id=0ce66d803a055fef",
    "samples": [
      "ERR5549561",
      "ERR5549562",
      "ERR5549563",
      "ERR5549564",
      "ERR5549565",
      "ERR5549566",
      "ERR5549567",
      "ERR5549568",
      "ERR5549569",
      "ERR5643745"
    ],
    "time": "2021-04-20T13:22:46.441010",
    "report": {
      "history_link": "https://usegalaxy.eu/histories/view?id=60c62b0154347389",
      "datamonkey_link": "https://usegalaxy.eu/api/histories/60c62b0154347389/contents/11ac94870d0bb33aca8fa937e3eb6b8a/display"
    },
    "consensus": "https://usegalaxy.eu/histories/view?id=25c0f632ceb8ed53",
    "study_accession": "PRJEB37886",
    "collection_dates": [
      "2021-03-13",
      "2021-03-11",
      "2021-03-11",
      "2021-03-10",
      "2021-03-12",
      "2021-03-13",
      "2021-03-12",
      "2021-03-12",
      "2021-03-13",
      "2021-03-13"
    ],
    "batch_plot": "https://usegalaxy.eu/api/histories/60c62b0154347389/contents/11ac94870d0bb33a6afe29423c00ff36/display"
  },
```


