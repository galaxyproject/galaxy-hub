---
title: "SMAGEXP"
url: "https://github.com/sblanck/smagexp"
scope: "tool-publishing"
platforms:
  - platform_group: "container"
    platform_url: "https://github.com/sblanck/smagexp"
    platform_text: "Docker"
summary: "SMAGEXP (Statistical Meta-Analysis for Gene EXPression) provides a unified way to carry out meta-analysis of gene expression data, while taking care of their specificities."
image: "/src/use/smagexp/smagexp-flowchart.png"
comments:
  - "Handles microarray data from Gene Expression Omnibus (GEO) database or custom data from affymetrix microarrays. These data are then combined to carry out meta-analysis using metaMA package. SMAGEXP also offers to combine Next Generation Sequencing (NGS) RNA-seq analysis from DESeq2 results thanks to metaRNASeq package. In both cases, key values, independent from the technology type, are reported to judge the quality of the meta-analysis."
  - "SMAGEXP is [available in the Galaxy Toolshed](https://toolshed.g2.bx.psu.edu/view/sblanck/smagexp/58052f8bc987) as well."
user_support:
  - "[Installation and user guide, including two step-by-step examples](https://github.com/sblanck/smagexp#table-of-contents-)."
quotas:
  - "None"
citations:
  - "[The RNA workbench: best practices for RNA and high-throughput sequencing bioinformatics in Galaxy](https://doi.org/10.1093/nar/gkx409), Björn A. Grüning,  Jörg Fallmann, Dilmurat Yusuf, Sebastian Will, Anika Erxleben, Florian Eggenhofer, Torsten Houwaart, Bérénice Batut, Pavankumar Videm, Andrea Bagnacani, Markus Wolfien, Steffen C. Lott, Youri Hoogstrate, Wolfgang R. Hess, Olaf Wolkenhauer, Steve Hoffmann, Altuna Akalin, Uwe Ohler, Peter F. Stadler, Rolf Backofen. *Nucleic Acids Research*, Volume 45, Issue W1, 3 July 2017, Pages W560–W566, doi: 10.1093/nar/gkx409"
pub_libraries:
  - "SMAGEXP"
sponsors:
  - "Univ. Lille Droit et Santé, Lille, France and Inria Lille-Nord Europe, MODAL, Lille, France."
---
