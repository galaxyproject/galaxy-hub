---
title: The landscape of SARS-CoV-2 RNA modifications
date: '2020-07-19'
tease: Studying the RNA modifications of SARS-CoV-2 to improve understanding of SARS
  viruses
tags: [paper, COVID-19, data]
doi: 10.1101/2020.07.18.204362
supporters:
- denbi
- unifreiburg
- crc992
- galaxy-europe
- biodaten
subsites: [eu, freiburg, global, us]
main_subsite: freiburg
---


[Nanopores](https://nanoporetech.com){:target="_blank"} are an awesome technology! We already gained experiences with it in our [StreetScience](https://streetscience.community) project,
where we show citizens and school kids what DNA sequencing is, how they can sequence with a USB-like device (Minion) and how they
can analyze the data with [Galaxy](https://usegalaxy.eu){:target="_blank"}. But Nanopores can also sequence RNAs directly. Direct RNA Sequencing (DRS)
can detect RNA modification in high-throughput! 

Wouldn't it be interesting to study the RNA modifications of SARS-CoV-2 and see if this helps in understanding SARS viruses?

|  |    |    |
|:---:|:-----------:|:---:|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |[![DRS RAW signal](/assets/media/drs_fig-5.png)](https://www.biorxiv.org/content/10.1101/2020.07.18.204362v1){:target="_blank"}| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
|  |Direct RNA sequencing raw electrical signals of downsampled reads obtained from unmodified RNA (IVT, black), from samples generated for this study and from an isolate from a published Korean data set (Fr1-3 and Kr, red).|  |

<br>

We assembled a team of experts from the __University Medical Center Freiburg__, with access to the SARS-CoV-2 samples, from the 
__Medical Faculty of the Goethe University Frankfurt__ and Bioinformaticians from the __Galaxy community__ to do exactly this! Study the
landscape of SARS-CoV-2 RNA modifications.

We provide the __first DRS data__ of SARS-CoV-2 in infected human lung epithelial cells, the first (to our knowledge) public available DRS from Europe,
and for the first time, replicates :)

Of course, we also offer the data and workflows for you to crunch the data on your own.

Take it, analyze it, kill the virus!

* [https://covid19.galaxyproject.org/direct-rnaseq](https://covid19.galaxyproject.org/direct-rnaseq){:target="_blank"}
* [https://bit.ly/usegalaxy-eu-covid19-data](https://bit.ly/usegalaxy-eu-covid19-data){:target="_blank"}

|  |    |    |
|:---:|:-----------:|:---:|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | [![Modified RNA regions](/assets/media/drs_fig-2.png)](https://www.biorxiv.org/content/10.1101/2020.07.18.204362v1){:target="_blank"} | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
|  |Detection of modified RNA bases in SARS-CoV-2 sgRNAs. __a__: Heatmaps of Nanocompore p-value scores for modified sites for the 3 sample replicates (Fr1-3) as compared to unmodified RNA data from Kim et al.. The genomic regions containing top-1% modification scores are marked in red. __b__: Heatmaps of the predicted fraction of modified bases using Tombo. The red marks show top-1% modified sites per sample that are common in at least two of the three samples.|  |

<br>

Apart from the paper itself, check out our collection of [training material](https://training.galaxyproject.org){:target="_blank"},
and the [documentation for our most recent COVID-19 projects](https://covid19.galaxyproject.org){:target="_blank"}.


## Abstract
<div align="justify">
In 2019 the severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) caused the first documented
cases of severe lung disease COVID-19. Since then, SARS-CoV-2 has been spreading around the
globe resulting in a severe pandemic with over 500.000 fatalities and large economical and social
disruptions in human societies. Gaining knowledge on how SARS-Cov-2 interacts with its host cells
and causes COVID-19 is crucial for the intervention of novel therapeutic strategies. SARS-CoV-2,
like other coronaviruses, is a positive-strand RNA virus. The viral RNA is modified by RNA-modifying enzymes provided
by the host cell. Direct RNA sequencing (DRS) using nanopores enables unbiased sensing of canonical
and modified RNA bases of the viral transcripts. In this work, we used DRS to precisely annotate
the open reading frames and the landscape of SARS-CoV-2 RNA modifications.
We provide the first DRS data of SARS-CoV-2 in infected human lung epithelial cells.
From sequencing three isolates, we derive a robust identification of SARS-CoV-2 modification sites within a
physiologically relevant host cell type. A comparison of our data with the DRS data from a previous SARS-CoV-2 isolate,
both raised in monkey renal cells, reveals consistent RNA modifications across the viral genome.
Conservation of the RNA modification pattern during progression of the current pandemic suggests that this pattern
is likely essential for the life cycle of SARS-CoV-2 and represents a possible target for drug interventions.
</div>
