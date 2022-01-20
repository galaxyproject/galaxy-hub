---
title: "Data"
description: "Data produced by Galaxy COVID19 effort"
components: true
autotoc: false
---

All data produced by our effort can be found at a public FTP server at <kbd>ftp://xfer13.crg.eu/</kbd>. This site was generously provided by [the Viral Beacon project](https://covid19beacon.crg.eu/).

The root directory of the FTP site contains aggregate files (`gx-all_variants.tsv.gz`, `gx-poisson_stats.tsv.gz`, `all_consensus.fasta.gz`, `all_pangolin.tsv.gz`, and `gx-surveillance.json`) as well as directories corresponding to all data processed so far (directories beginning with `SRR`, `ERR`, or `Estonia`). Aggregate files contain variant information from all processed samples. 

## Global variant list `gx-all_variants.tsv.gz`

This file contains all variants produced by our effort. It contains the following fields:

<div class="compact">

| # |  Column               | Example value     | Meaning |
|--|:----------------------|:------------------|---------|
|0| Sample                 | `ERR4859727`        | SRA run ID |
|1| POS                   | `22388`             | Position in [NC_045512.2](https://www.ncbi.nlm.nih.gov/nuccore/1798174254) (1-based: genome coordinates start with 1 [*not* with 0]) |
|2| REF                   | `C`                 |  Reference base |
|3| ALT                   | `T`                 | Alternative base |
|4| DP                    | `13756`             | Sequencing depth |
|5| AF                    | `0.924106`          | Alternative allele frequency |
|6| SB                    | `2147483647`        | Strand bias P-value from Fisher's exact test calculated by [`lofreq`](https://csb5.github.io/lofreq/) |
|7| DP4                   | `1,0,13700,0`       | Depth for Forward Ref Counts, Reverse Ref Counts, Forward Alt Counts, Reverse Alt Counts |
|8| EFFECT                | `SYNONYMOUS_CODING` | Effect of change (from SnpEff 4.5covid19 version) |
|9| GENE                  | `S`                 | Gene name |
|10| CODON                 | `Cta/Tta`           | Codon |
|11| AA                    | `L276`              | Amino acid (change) in final gene product |
|12| TRID                  | `S`                 | Gene product name; different from GENE in ORF1ab |
|13| Batch                 | `0ce66d803a055fef` | Batch ID cross-referenced in `gx-surveillance.json` file   |

</div>


## Poisson statistics file `gs-poisson_stats.tsv.gz`

 For each analysis batch we compute allelic variant (AV) exclusion threshold and per-base error rate. The AV exclusion threshold is the number of samples in a given batch a variant must be observed in. This logic comes from the assumption that a fraction of allelic variants with low frequencies are random errors, modeled by a simple Poisson distribution with per-site error rate λ. We tabulate, for each position in the genome, the number of samples that contained an AV with 0.05 ≤ AF ≤ 0.5, inferred λ using a closed form ML estimator (the mean of per-base counts), and plotted the observed number of genome positions with *N* = 0,1,2… and so on AVs.  We then compute the point where the predicted Poisson distribution diverges from the observed distribution, which gives us the AV exclusion threshold. We also provide an estimate of per-base error rate. For details see [this script](https://github.com/usegalaxy-eu/ena-cog-uk-wfs/blob/aggregate-observable-data/aggregator.py). The file has the following fields:

<div class="compact">

| # | Column | Example value | Meaning |
|-----|:-----|:-----|------|
| 0 | Batch ID | `2cc93c20b35de7f2` | Batch ID cross-referenced in `gx-surveillance.json` file   |
| 1 | N | `362` | Number of samples in the batch |
| 2 | Error rate |  `6.038988994556521e-07` | Per base error rate in this sample |
| 3 | AV exclusion threshold | `3` | The number of samples in this batch a variant must be observed in to be kept |

</div>

## Global consensus file (`all_consensus.fasta.gz`)

Consensus sequences for each sample constructed from the called variants, in which a consensus allele is defined by an intra-sample allele frequency of >= 0.7 and in which low-coverage and ambiguous sites with a variant allele reaching an allele frequency between 0.25 and 0.7 are hard-masked.

## Global pango lineage file (`all_pangolin.tsv.gz`)

A mapping between every analyzed sample and its PANGO lineage designation.  

## Information about every analysis run

JSON file, `gx-surveillance.json`, with an up-to-date list of all datasets analyzed so far including URLs to the corresponding Galaxy histories and the TSV datasets. The batch key (`0ce66d803a055fef` in the example below) is cross referenced in `gx-all_variants.tsv.gz` and `gs-poisson_stats.tsv.gz` files. Each batch entry contains information on samples analyzed (`"samples"`) and their collection dates (`"collection_dates"`) and provides URLs to Galaxy histories, consensus sequences (also found in `all_consensus.fasta.gz`) and graphical representations of variation found in this batch (`"batch_plot"`).

```json
{
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
  }
}
```


