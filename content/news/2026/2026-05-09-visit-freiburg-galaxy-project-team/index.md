---
title: "My visit to Freiburg Galaxy Project team"
date: "2026-05-09"
tease: "This is a small tale about my 3 months stay in Freiburg joining Galaxy Project team."
tags: [elixir, staffexchange, fairymags, metagenomics]
subsites: [all]
contributions:
  authorship:
    - gdefazio
---

# Something about me
My name is [Giuseppe Defazio](https://www.researchgate.net/profile/Giuseppe-Defazio?ev=hdr_xprf), I'm working as post-doc researcher and assistant professor for the chair of molecular biology and bioinformatics led by [Prof. Graziano Pesole](https://www.researchgate.net/profile/Graziano-Pesole) of [Biosciences, Biotechnology and Environment department at the University of Bari Aldo Moro (Italy)](https://www.uniba.it/it/ricerca/dipartimenti/dbba). 
During my PhD I had not the possibility to make my abroad period because of COVID-19 pandemic, then I decided to mind the gap asking Paul Zierep to join his group in Freiburg and learn some more about Galaxy Project such as advanced use of Galaxy instance, tools and workflows deployiment in Galaxy. I was a pure CLI user, then was a good opportunity to enlarge my view about bioinformatics. Then I joined Freiburg Galaxy Project team from Genuary 19th to April 17th. I joined the group with 3 main objectives:
- learn as much as possible about Galaxy
- wraps [kMetaShot](https://doi.org/10.1093/bib/bbae680), an alignment free taxonomy classifier for Metagenome Assembled Genomes developed during my PhD and insert it in the [FAIRyMAGs](https://elixir-europe.org/how-we-work/scientific-programme/science/bfsp/fairymags) workflow
- design a workflow that replicates one of [my works](https://doi.org/10.1186/s13040-026-00532-6) automatically managing from BioProject data/metadata fetching to Machine Learning models training

# My work at the Freiburg Galaxy Project Headquarter
This professional exchange experience gave me the opportunity to learn about the Galaxy Project and to understand how it can be useful for bioinformatics analysis projects that adhere to the FAIR principles. Tools and workflows are fundamental elements in bioinformatics analysis, and I learnt how to implement them within the Galaxy Project. In particular, I worked on implementing a Galaxy wrapper for [kMetaShot](https://doi.org/10.1093/bib/bbae680). In particular, I worked on the tool wrapping and data manager deployimet for its database ([PR](https://github.com/bgruening/galaxytools/pull/1771))
Furthermore, I have prepared a Galaxy IWC workflow for retrieving data and metadata based on BioProject-IDs, currently still under review on GitHub ([PR](https://github.com/galaxyproject/iwc/pull/1177)). The main idea is to use it as a sub-workflow for larger workflows based on the reuse of public sequencing data. In this regard, I am still working on the development of an IWC Galaxy workflow capable of analysing publicly available DNA metabarcoding data from multiple BioProjects and using compositional profiles to train machine learning models to classify healthy/unhealthy microbiomes.
Nevertheless, I have worked on the Galaxy Training Network material for bioinformatic analysis of the microbiome, and in particular on the shotgun metagenomic assembly workflow, for which a [video](https://training.galaxyproject.org/training-material/topics/microbiome/tutorials/metagenomics-assembly/recordings/index.html#tutorial-recording-26-march-2026) has been provided showing the complete tutorial ([PR](https://github.com/galaxyproject/training-material/pull/6748)).

# My point of view on Galaxy Project after my visit
The Galaxy Project is a vast, global community of researchers spanning numerous different fields, including microbiome analysis, single-cell research, genetic variant identification, proteomics and so on. For bioinformatics tool developers at the Italian node and the University of Bari, the chance to join this community—thanks to my experience, new knowledge and network of contacts—could represent an opportunity to improve the availability and FAIR compliance of independently developed research tools and products. 
As regards workflows, command-line users spend much of their time reading manuals and adapting tool commands for each analysis. In the Galaxy Project scenario, a large number of bioinformatics workflows, suitable for a wide variety of analyses, are provided free of charge via a graphical user interface (i.e. the Galaxy instance). However, the contribution system also facilitates the implementation of self-developed tools into new or already published workflows.
Furthermore, training on the tools and workflows produced by the Italian ELIXIR node and the University of Bari can benefit from the Galaxy training network as a showcase of all the possibilities available to the user for managing analyses.
Last but not least, the Freiburg Galaxy Project group I joined is an international research team. Researchers from Germany, Spain, Portugal, Iran, India, Ecuador, Russia and so on are part of this group. This aspect of the exchange has also been very beneficial in terms of learning best practices for internationalisation within scientific contexts.

# Something about free time in Freiburg

