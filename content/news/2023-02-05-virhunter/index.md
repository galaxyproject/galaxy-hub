---
title: "VirHunter: detection of novel RNA Viruses in Plant Sequencing Data"
tease: "A Deep Learning-Based Method for the detection of novel RNA Viruses in Plant Sequencing Data"
date: '2023-02-04'
doi: 10.3389/fbinf.2022.867111
authors: Benjamin Dartigues
authors_structured:
- github: bdartigues
tags: [tools, esg, esg-wp5]
subsites: [global, esg]
main_subsite: eu
supporters:
  - eurosciencegateway
---

Please welcome [VirHunter](<https://usegalaxy.eu/tool_runner?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fvirhunter%2Fvirhunter%2F1.0.0%2Bgalaxy3>)
and [Decontaminator](<https://usegalaxy.eu/tool_runner?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fdecontaminator%2Fdecontaminator%2F1.0.0%2Bgalaxy0>) as new members 
on the Galaxy bookshelf.
These two tools were developed to streamline the detection of viruses in high-throuput sequencing data (HTS).
In particular, they "catch" viruses in assembled virome RNAseq data provided as input.

![The Virhunter logo](logo.png)

VirHunter’s role is to classify any contig into one of the three classes: virus, bacteria or plant. It has 7 plant host-specific models and a generalistic model that you can apply
to any plant dataset. Decontaminator helps VirHunter as a preprocessing step by eliminating fungi or phage contamination, so they work even better together.

Last but not the least, if you are missing a model in VirHunter and Decontaminator please get in contact with us and we will help you creating new models and add them to Galaxy.

To know more about the tools please visit [VirHunter](https://github.com/cbib/virhunter) or [Decontaminator](https://github.com/cbib/decontaminator) GitHub repositories.
Both tools leverage deep learning for the classification task. We came up with many unique solutions to challenging genomic problems, 
so if you develop a DL tool for genomics feel free to visit our repositories for inspiration. You can thus use any of the repositories to quickstart your DL project.

Read more about our work in our paper "[A Deep Learning-Based Method for Detection of Novel RNA Viruses in Plant Sequencing Data](https://doi.org/10.3389/fbinf.2022.867111)".
