---
title: New Paper "Robust and efficient single-cell Hi-C clustering with approximate
  k-nearest neighbor graphs"
date: '2021-05-25'
doi: 10.1093/bioinformatics/btab394
tags: [paper]
subsites: [eu, freiburg]
main_subsite: freiburg
---

Joachim Wolff and colleagues have published a paper providing a novel single-cell Hi-C clustering approach. Congratulations Joachim!


_Abstract_ 

__Motivation__

Hi-C technology provides insights into the 3D organization of the chromatin, and the single-cell  Hi-C  method  enables  researchers  to  gain  knowledge  about  the  chromatin  state  in  individual  cell levels. Single-cell Hi-C interaction matrices are high dimensional and very sparse. To cluster thousands of single-cell Hi-C interaction matrices, they are flattened and compiled into one matrix. Depending on the resolution, this matrix can have a few million or even billions of features; therefore, computations can be memory intensive. We present a single-cell Hi-C clustering approach using an approximate nearest neighbors method based on locality-sensitive hashing to reduce the dimensions and the computational resources.

__Results__

The presented method can process a 10 kb single-cell Hi-C data set with 2600 cells and needs 40 GB of memory, while competitive approaches are not computable even with 1 TB of memory. It can be shown that the differentiation of the cells by their chromatin folding properties and, therefore, the quality of the clustering of single-cell Hi-C data is advantageous compared to competitive algorithms.

__Availability__

The  presented  clustering  algorithm  is  part  of  the  scHiCExplorer,  is  available  on  Githubhttps://github.com/joachimwolff/scHiCExplorer, and as a conda package via the bioconda channel. Theapproximate  nearest  neighbors  implementation  is  available  via  https://github.com/joachimwolff/sparse-neighbors-search and as a conda package via the bioconda channel.


