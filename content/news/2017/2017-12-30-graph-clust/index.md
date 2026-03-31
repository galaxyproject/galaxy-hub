---
title: GraphClust - Scalable clustering and annotation of structured and functional
  RNAs in an accessible and interactive fashion
date: '2017-12-30'
tags: [tools]
subsites: [eu, freiburg]
main_subsite: freiburg
---

[![Workflow](https://img.shields.io/badge/GraphClust-workflow-green.svg)](https://galaxy.uni-freiburg.de/u/milad/w/graphclust-published)
[![Workflow](https://img.shields.io/badge/GraphClust-history-green.svg)](https://galaxy.uni-freiburg.de/u/milad/h/graphclust-sample-history)

There are many non-coding RNAs (ncRNAs) and regulatory elements whose function is still unknown.
RNA sequences with putative but unknown functionality can appear for example in genome-wide screens or
experiments such as RNA-seq. Clustering of RNA sequences is currently one of the
prevalent approaches for detecting and annotating the function of putative ncRNAs and regulatory elements.

GraphClust is a suite of tools and workflows for accurate large-scale structural
clustering of RNAs based on sequence and structural similarity that is provided via the Galaxy framework.
GraphClust drastically simplifies the task of clustering large amounts of RNAs by making it possible to:

  - Efficiently cluster and annotate putatively functional ncRNAs and strutured regulatory elements within transcripts
  - Comprehensive and accurate detection of structured RNAs by incorporating tools known to be successful algorithms  of the filed such as LocARNA, CMfinder, Infernal an R-scape
  - Evaluate and inspect the significance and the consensus structure of each predicted cluster
  - support computations on different back-ends ranging from personal computers to large scale computer clusters
  - integrate the clustering workflow with high-throughput sequencing (HTS) transcriptome-wide analysis with data obtained from:
    * RNA binding proteins target sites from CLIP experiments.
    * Structure probing experiments SHAPE-/DMS-seq.

GraphClust is also available as a Docker Galaxy flavour.
Read more at [GraphClust’s homepage](https://github.com/BackofenLab/docker-galaxy-graphclust)

## Credits

M. Miladi, E. Sokhoyan, T. Houwaart, F. Costa, R. Backofen and B. Gruening, Galaxy-GraphClust: scalable and accessible clustering of ncRNAs based on secondary structures.

