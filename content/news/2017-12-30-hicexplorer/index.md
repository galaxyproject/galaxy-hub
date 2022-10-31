---
title: HiCExplorer - a suite of tools for reproducible Hi-C data analysis, quality
  control and visualization
date: '2017-12-30'
tags: [tools]
subsites: [eu, freiburg]
main_subsite: freiburg
---

<a href="https://galaxy.uni-freiburg.de/u/joachim-wolff/w/workflow-hicexplorer-hicplotmatrix" target="_blank"><img alt="HiCPlotMatrix badge" src="https://img.shields.io/badge/HiCExplorer-HiCPlotMatrix_workflow-green.svg"/></a>&nbsp;&nbsp;<a href="https://galaxy.uni-freiburg.de/u/joachim-wolff/w/workflow-hicexplorer-hicsummatrix" target="_blank"><img alt="HiCSumMatrix badge" src="https://img.shields.io/badge/HiCExplorer-HiCSumMatrix_workflow-green.svg"/></a>

Hi-C has become a standard technique for the genome-wide analysis of
chromosome conformation. Analysis of Hi-C data provides insights into folding principles of the
chromatin, functional compartments within the nucleus, as well as long range enhancer-promoter
interactions. Integration of Hi-C and other epigenomic datasets has
helped researchers in understanding of mechanisms of gene regulation and genetic diseases. 

Today we released HiCExplorer 2.0 to provide an easy and user-friendly access to
the analysis of Hi-C data. Starting with the mapping of the raw sequence data,
creation of the contact matrices, the correction of contact matrices, to the computation of
topological associated domains (TADs) and A/B compartments. A detailed quality report generated
during the process, which, using the support of MultiQC, allows users to compare multiple Hi-C
datasets. Finally, the users can create publication ready plots of the contact matrix,
A/B compartments, and TADs on a selected genomic locus, along with additional information
like gene tracks or ChIP-Seq signals. 

A template workflow is shared with everyone and an example history is also available.

For more detailed information check out the [HiCExplorer GitHub repository](https://github.com/deeptools/HiCExplorer),
our [Galaxy Docker flavor](https://github.com/deeptools/docker-galaxy-hicexplorer) or two publication were it
was used already:

[Fidel Ramirez, Vivek Bhardwaj, Jose Villaveces, Laura Arrigoni, Bjoern A Gruening, Kin Chung Lam,
Bianca Habermann, Asifa Akhtar, Thomas Manke,
High-resolution TADs reveal DNA sequences underlying genome organization in flies
](https://www.biorxiv.org/content/early/2017/03/08/115063)

[Ralf Gilsbach, Martin Schwaderer, Sebastian Preissl, Bjoern A Gruening, David Kranzhoefer, et al.,
Distinct epigenetic programs regulate cardiac myocyte development and disease in the human heart in vivo](https://www.biorxiv.org/content/early/2017/10/16/203075).

Of course all tools are available
from the [Galaxy ToolShed](https://toolshed.g2.bx.psu.edu/view/bgruening/suite_hicexplorer) and installable into any
Galaxy instance.



## Credits

* [Joachim Wolff](https://github.com/joachimwolff)
* [Fidel Ramirez](https://github.com/fidelram)
* [Vivek Bhardwaj](https://github.com/vivekbhr)
* [Stephan Nothjunge](https://github.com/DonStephano)
* [Ralf Gilsbach](https://github.com/rgilsbach)
* [Thomas Manke](https://github.com/thomasmanke)
* [Rolf Backofen](https://github.com/rolfbackofen)
* [Björn Grüning](https://github.com/bgruening)

