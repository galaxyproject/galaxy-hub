---
title: Galaxy Cancer
components: true
---

<slot name="/bare/eu/usegalaxy/notices" />

![Graphic showing the to hallmarks of cancer as a circular ring with different colored segments with different icons](https://cancer.usegalaxy.eu/assets/media/logo_cancer.png)

# Welcome to the Cancer Galaxy Workbench!


The Cancer Galaxy workbench is a comprehensive set of analysis tools and consolidated workflows that to enable reproducible analysis of cancer multiomics data. The current implementation comprises more than ## bioinformatics tools including those form existing Galaxy workbenches (e.g. singlecell.workbench, HCA galaxy) that are utilized in cancer research for biomarker discovery and patient stratification.  We have implemented and included a  comprehensive suite of tools for somatic variant detection (e.g. SNV, CNV and SV) and dedicated workflows to reproduce state-of-the art cancer analysis  


This service is a joint project between different groups from the [Erasmus Medical Center](http://erasmusmc.nl), the [Open University](https://www.open.ac.uk/), [OHSU](https://www.ohsu.edu/), and the [University of Freiburg](https://galaxyproject.eu/freiburg/).
The server is part if the European Galaxy server and is maintained by the [RNA Bioinformatics Center (RBC)](https://www.denbi.de/network/rna-bioinformatics-center-rbc) as part of [de.NBI](https://www.denbi.de) and [ELIXIR](http://elixir-europe.org).

# Content



# Get started

Are you new to Galaxy, or returning after a long time, and looking for help to get started? Take [a guided tour](https://cancer.usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.

# Training and Workshops

Want to learn more about cancer analysis in Galaxy? Look for a [training event](https://galaxyproject.org/events/) near you, or check out some of the [GTN](https://training.galaxyproject.org) tutorials that cover the topic. For example:

| GTN Topic | Tutorial |
|----------|-----------|
| Epigenetics | [Identification of the binding sites of the Estrogen receptor](https://training.galaxyproject.org/training-material/topics/epigenetics/tutorials/estrogen-receptor-binding-site-identification/tutorial.html) |
| Genome Annotation | [CRISPR screen analysis](https://training.galaxyproject.org/training-material/topics/genome-annotation/tutorials/crispr-screen/tutorial.html) |
| Imaging | [Analyse HeLa fluorescence siRNA screen](https://training.galaxyproject.org/training-material/topics/imaging/tutorials/hela-screen-analysis/tutorial.html) |
| Proteomics | [Machine Learning Modeling of Anticancer Peptides](https://training.galaxyproject.org/training-material/topics/proteomics/tutorials/ml-modeling-of-anti-cancer-peptides/tutorial.html) |
| Proteomics | [MaxQuant and MSstats for the analysis of TMT data](https://training.galaxyproject.org/training-material/topics/proteomics/tutorials/maxquant-msstats-tmt/tutorial.html) |
| Proteomics | [MaxQuant and MSstats for the analysis of label-free data](https://training.galaxyproject.org/training-material/topics/proteomics/tutorials/maxquant-msstats-dda-lfq/tutorial.html) |
| Statistics & Machine Learning | [PAPAA PI3K_OG: PanCancer Aberrant Pathway Activity Analysis](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/aberrant_pi3k_pathway_analysis/tutorial.html) |
| Statistics & Machine Learning | [Machine learning: classification and regression](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/classification_regression/tutorial.html) |
| Transcriptomics | [CLIP-Seq data analysis from pre-processing to motif detection](https://training.galaxyproject.org/training-material/topics/transcriptomics/tutorials/clipseq/tutorial.html) |
| Variant Analysis | [Identification of somatic and germline variants from tumor and normal sample pairs](https://training.galaxyproject.org/training-material/topics/variant-analysis/tutorials/somatic-variants/tutorial.html) |
| Variant Analysis | [Somatic Variant Discovery from WES Data Using Control-FREEC](https://training.galaxyproject.org/training-material/topics/variant-analysis/tutorials/somatic-variant-discovery/tutorial.html) |
| Variant Analysis | [Trio Analysis using Synthetic Datasets from RD-Connect GPAP](https://training.galaxyproject.org/training-material/topics/variant-analysis/tutorials/trio-analysis/tutorial.html) |
| Visualisation | [Visualisation with Circos](https://training.galaxyproject.org/training-material/topics/visualisation/tutorials/circos/tutorial.html) |

**Tip:** Access the GTN tutorials via the **<Icon name="graduation-cap" /> graduation cap** icon in the top menu of Galaxy.


# Available Tools

In this section we highlight some tools that have been integrated in the the cancer analysis workbench. The list is likely to grow as soon as further tools and workflows are contributed.

<!-- TODO: split into useful categories? smallvarians / SV / Copynumber / data sources / .. -->

| Tool | Description | References |
|------|-------------|----------- |
| Arriba | detect gene fusions from STAR aligned RNA-Seq data | [Uhrig et al. 2021](https://doi.org/10.1101/gr.257246.119) |
| Delly | Structural variant discovery by integrated paired-end and split-read analysis | [Rausch et al. 2012](https://doi.org/10.1093%2Fbioinformatics%2Fbts378) |
| FuMa | Match detected fusion genes based on gene names (in particular for RNA-Seq) | [Hoogstrate et al. 2015](https://doi.org/10.1093/bioinformatics/btv721) |
| GEMINI | A flexible framework for exploring genome variation | [Paila et al. 2013](https://doi.org/10.1371/journal.pcbi.1003153) |
| LUMPY | A probabilistic framework for structural variant discovery| [Layer et al. 2014](https://doi.org/10.1186/gb-2014-15-6-r84) |
| Mutect2 (GATK) | Call somatic SNVs and indels via local assembly of haplotypes | [McKenna et al. 2010](https://doi.org/10.1101/gr.107524.110s://doi.org/10.1101/gr.107524.110) |
| Pathifier | Quantify deregulation of pathways in cancer  | [Drier et al. 2013](https://doi.org/10.1073/pnas.1219651110) |
| Personal Cancer Genome Reporter (beta) | Functional annotation and translation of individual tumor genomes for precision cancer medicine. | [Nakken et al. 2017](https://doi.org/10.1093/bioinformatics/btx817) |
| Pizzly | fast fusion detection using kallisto | [Melsted et al. 2017](https://doi.org/10.1101/166322) |
| STAR-fusion | detect fusion genes in RNA-Seq data | [Haas et al.](https://doi.org/10.1101/120295://doi.org/10.1101/120295 ) |
| Strelka | Small variant caller for germline or somatic variation | [Kim et al. 2018](https://www.nature.com/articles/s41592-018-0051-x) |
| VarScan copynumber | Determine relative tumor copy number from tumor-normal pileups | [Koboldt et al. 2012](https://doi.org/10.1101/gr.129684.111) |
| VarScan somatic | Call germline/somatic and LOH variants from tumor-normal sample pairs | [Koboldt et al. 2012](https://doi.org/10.1101/gr.129684.111) |


..and many more!


# Workflows

Coming Soon!

