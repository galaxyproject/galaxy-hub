---
title: "My visit to Freiburg Galaxy Project team"
date: "2026-05-09"
tease: "This is a small tale about my 3 months stay in Freiburg joining Galaxy Project team."
funding: 
  - elixir-europe
tags: [elixir, fairymags, metagenomics]
subsites: [all]
contributions:
  authorship:
    - gdefazio
---

# Something about me
My name is [Giuseppe Defazio](https://www.researchgate.net/profile/Giuseppe-Defazio?ev=hdr_xprf), I'm working as a post-doctoral researcher and assistant professor for the chair of molecular biology and bioinformatics led by [Prof. Graziano Pesole](https://www.researchgate.net/profile/Graziano-Pesole) of the [Biosciences, Biotechnology and Environment department at the University of Bari Aldo Moro (Italy)](https://www.uniba.it/it/ricerca/dipartimenti/dbba).<br>
During my PhD I did not have the opportunity to have my abroad period due to the COVID-19 pandemic, so I decided to fill the gap by asking Paul Zierep to join his group in Freiburg and learn more about the Galaxy Project, including advanced use of Galaxy instances and the deployment of tools and workflows in Galaxy. I was a pure CLI user, so it was a good opportunity to broaden my view of bioinformatics. I joined the Freiburg Galaxy Project team from January 19th to April 17th with 3 main objectives:
- learn as much as possible about Galaxy
- wrap [kMetaShot](https://doi.org/10.1093/bib/bbae680), an alignment-free taxonomy classifier for Metagenome Assembled Genomes developed during my PhD, and integrate it into the [FAIRyMAGs](https://elixir-europe.org/how-we-work/scientific-programme/science/bfsp/fairymags) workflow
- design a workflow that replicates one of [my works](https://doi.org/10.1186/s13040-026-00532-6), automatically managing everything from BioProject data/metadata fetching to machine learning model training

# My work at the Freiburg Galaxy Project Headquarter
This professional exchange experience gave me the opportunity to learn about the Galaxy Project and to understand how it can be useful for bioinformatics analysis projects that adhere to the FAIR principles. Tools and workflows are fundamental elements in bioinformatics analysis, and I learned how to implement them within the Galaxy Project.<br>
In particular, I worked on implementing a Galaxy wrapper for [kMetaShot](https://doi.org/10.1093/bib/bbae680) and finalized the tool wrapper and data manager deployment for its database ([PR](https://github.com/bgruening/galaxytools/pull/1771)). Then I tried to integrate kMetaShot in the FAIRyMAGs workflow for taxonomic classification of metagenome assembled genomes ([PR](https://github.com/galaxyproject/iwc/pull/1168)).<br>
Furthermore, I prepared a Galaxy IWC workflow for retrieving data and metadata based on BioProject IDs, currently still under review on GitHub ([PR](https://github.com/galaxyproject/iwc/pull/1177)), after implementing 'pysradb metadata' in the 'pysradb_search' tool ([PR](https://github.com/galaxyproject/tools-iuc/pull/7765)). The main idea is to use this as a sub-workflow for larger workflows based on the reuse of public sequencing data. In this regard, I am still working on the development of an IWC Galaxy workflow capable of analysing publicly available DNA metabarcoding data from multiple BioProjects and using compositional profiles to train machine learning models to classify healthy/unhealthy microbiomes.<br>
I also worked on the Galaxy Training Network material for bioinformatic analysis of the microbiome, and in particular on the shotgun metagenomic assembly workflow, for which a [video](https://training.galaxyproject.org/training-material/topics/microbiome/tutorials/metagenomics-assembly/recordings/index.html#tutorial-recording-26-march-2026) has been provided showing the complete tutorial ([PR](https://github.com/galaxyproject/training-material/pull/6748)).<br>
In addition, I joined as a helper the de.NBI-ELIXIR-Germany online workshop for metagenomic analysis with the de.NBI cloud and usegalaxy.eu, as well as the workshop for metagenomic analysis with usegalaxy.eu for the Bioinformatics course at Freiburg University.

# My point of view on the Galaxy Project after my visit
The Galaxy Project is a vast, global community of researchers spanning numerous different fields, including microbiome analysis, single-cell research, genetic variant identification, proteomics, and more. For bioinformatics tool developers at the ELIXIR Italian node and the University of Bari, the chance to join this community — drawing also on my visit, newly acquired knowledge, and network of contacts — could represent an opportunity to improve the availability and FAIR compliance of independently developed research tools and products.<br>
As regards workflows, command-line users spend much of their time reading manuals and adapting tool commands for each analysis. In the Galaxy Project, a large number of bioinformatics workflows suitable for a wide variety of analyses are provided free of charge via a graphical user interface (i.e. the Galaxy instance). The contribution system also facilitates the integration of self-developed tools into new or already published workflows.<br>
Furthermore, training on the tools and workflows produced by the Italian ELIXIR node and the University of Bari can benefit from the Galaxy Training Network as a showcase of all the possibilities available to users for managing their analyses.<br>
Last but not least, the Freiburg Galaxy Project group I joined is an international research team. Researchers from Germany, Spain, Portugal, Iran, India, Ecuador, Russia, and other countries are part of this group. This aspect of the exchange was also very beneficial in terms of learning best practices for internationalisation within scientific contexts.

# Something about free time in Freiburg
The Freiburg Galaxy Project people are so kind and very inclusive — they truly make you feel welcome. I tried to return the favour by cooking some good pasta: I prepared a proper carbonara (i.e. without cream) at Paul's place and lasagna at Björn's place. I also joined an Italian cinema association with Meli, who had studied Italian for fun in high school; I tried *Spätzle mit Käse* at Paul's place, prepared by Natalie; I enjoyed good Freiburg beers with Rand, Gabriel and Paul; I tried *Flammkuchen* with Rand and his girlfriend; and I savoured the pleasure of a barbecue with colleagues outside the office, or riding a bike to have lunch at the Seepark with the explosion of spring colours all around.<br>
On my last day in Freiburg, they prepared a wonderful goodbye brunch and, honestly, a few tears fell from my eyes. For me, food is also a way to communicate (hey, I'm Italian — it's normal), and somehow we were — but I like to think we still are — connected.<br>
I walked a great deal; Freiburg and its surrounding area are so pleasant with so much to see. People are very friendly and greet you even if they don't know you (from their balconies too).

# Acknowledgements
I would like to thank Prof. Graziano Pesole and my supervisor Prof. Bruno Fosso for giving me the opportunity to have this wonderful experience. I would also like to thank the ELIXIR staff exchange programme. Last but by no means least, I would like to thank Dr. Björn Grüning and Dr. Paul Zierep for opening the doors of their group without hesitation, and all the amazing people working at the Freiburg Galaxy Project for everything they did for me.


![Fotos highlight](https://github.com/gdefazio/galaxy-hub/blob/create_visit_freiburg_galaxy_team_post/content/news/2026/2026-05-09-visit-freiburg-galaxy-project-team/foto/20260416_114002-COLLAGE.jpg)




