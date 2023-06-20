---
title: "Moving workflows from single files to collections - a case study"
date: "2023-06-20"
tease: "Allowing a complex workflow to be used on multiple datasets using collections."
hide_tease: false
authors: 'Paul Zierep, Engy Nasr'
authors_structured:
- github: paulzierep
- github: EngyNasr
tags: [EU]
subsites: [all-eu]
main_subsite: eu
---

Collections are a great way to bundle multiple dataset into single entities (as shown in the histroy) that can be 
processed collectively. In fact, when the amount of datasets rises up to 1000+ it becomes essential to use collections.
Galaxy can also use collections in tools that are not specifically designed to process 
collections using the mapping-over strategy (run the tool for each of the elements in a collection). 
Therefore, it should be a peace of cake to port complete workflows that 
were based on processing single files to use collections as well.
However, when applying this idea on our latest metagenomics workflow  [Foodborn Pathogen detection](https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/pathogen-detection-from-nanopore-foodborne-data/tutorial.html) we encountered some problems 
that arise when switching from single files to collection. 
In the following we would like to present some of those issues and how we solved them, in the hopes that these strategies can help
others to port their workflows to collections.


