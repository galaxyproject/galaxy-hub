---
title: "Galaxy at Genome Informatics 2025"
date: "2025-11-10"
authors: Natalie Whitaker-Allen
tease: "Galaxy was in full force at Genome Informatics 2025, presenting cutting-edge work on scalable analysis, interactive workflows, and high-quality genome curation."
hide_tease: false
subsites: [global, all]
---

# Galaxy at Genome Informatics 2025

The [Genome Informatics Conference at Cold Spring Harbor Laboratory](https://meetings.cshl.edu/meetings.aspx?meet=INFO) brings together leaders in bioinformatics, genomics, and computational biology to explore the latest developments in genome analysis, data infrastructure, and visualization. This year’s meeting, held November 5–8, 2025, features several members of the Galaxy community presenting new advances in data accessibility, reproducibility, and curation.

# Galaxy Community Highlights

## Galaxy Filament—Bringing analyses to the data on a global scale.

Danielle Callan, **Anton Nekrutenko**.   
Presenter affiliation: Penn State, University Park, Pennsylvania.

It is 2025, yet most biomedical researchers still analyze data in the same traditional way: (1) locating datasets in repositories such as NCBI Datasets, GEO, or SRA, (2) downloading them locally, and (3) re-uploading them to HPC or cloud frameworks for analysis. This persists despite the availability of comprehensive APIs and years of standardization efforts by GA4GH to enable programmatic access to data, tools, and workflows. 

For more than two decades, the Galaxy Project has advanced accessible and reproducible computational analysis. Although Galaxy has long supported direct data import from most public repositories, it historically lacked an organism-centric model for search and discovery. Galaxy Filament addresses this gap: it unifies access to reference genomic data, allowing users to explore assemblies and annotations while seamlessly combining public datasets with their own data to launch hundreds of analysis workflows. 

Galaxy Filament can be configured to serve any combination of organisms and associated data. In this presentation we will demonstrate two distinct applications of the framework. First, we will present BRC-analytics (https://brc-analytics.org)--a instance of Filament Framework configured to serve genomic data for pathogens, hosts, and vectors. It provides access to key eukaryotic, bacterial, and viral pathogens and can readily be used for large surveillance efforts. In particular we will showcase application to surveillance of measles, malaria, and fungal infections. Second, we will present Genome Ark 2, an instance of the Filament providing analysis access to genomes made public by the phase I of the Vertebrate Genome Project (VGP).  

Galaxy Filament is a collaboration of Galaxy Project, UCSC Genome Browser, NCBI Datasets, and Texas Advanced Computing Center. Our goal is to provide any biological researcher with the ability to discover and analyze any public data using free scientific computing infrastructure in a transparent and reproducible manner.

## English is the new programming language—Reproducible, transparent, and accessible agentic analysis with GalaxyMCP.

Dannon Baker, Junhao Qiu, Ahmed Awan, Marius van den Beek, Scott Cain, Tyler Collins, Allison Creason, Anup Kumar, Paulo Lyra, Saim Moim, Michelle Savage, Enis Afgan, Dan Blakenberg, Björn Grüning, Anton Nekrutenko, Jeremy Goecks, **Michael Schatz**.   
Presenter affiliation: Johns Hopkins University, Baltimore, Maryland.

Galaxy (galaxyproject.org) has long championed accessible and reproducible biomedical data analysis, including early-adoption of machine learning tools through the Galaxy-ML workbench. With the rise of large language models and agentic systems, natural language itself is emerging as a powerful interface for computation. We present GalaxyMCP, a Model Context Protocol (MCP) server that connects Galaxy’s ecosystem of tools, workflows, and APIs directly to AI agents. Through GalaxyMCP, agents can summarize datasets, search tools, run workflows, and retrieve results by converting human-readable instructions into fully reproducible Galaxy histories and workflows. 

GalaxyMCP enables a new mode of analysis: conversational, transparent, and auditable. Instead of writing scripts or navigating menus, researchers can issue natural language requests, such as “I have RNA-seq data from mouse liver samples. Help me analyze differential expression”, “What does this HISAT2 error mean? Should I change my parameters?” or “Find me ChIP-seq workflows that work with paired-end data”, and the agent plans and responds to the prompts, including executing the corresponding analysis in Galaxy as needed. Each analysis remains shareable and reproducible through Galaxy’s provenance system while tapping into Galaxy’s rich catalog of thousands of tools and workflows available. 

We demonstrate GalaxyMCP through two case studies: (1) evaluating reference genomes for variant discovery, benchmarking multiple aligners and variant callers across GRCh38, the telomere-to-telomere CHM13 reference, and the HPRC pangenome using healthy and diseased samples, and (2) spatial genomics analysis of breast cancer, using Galaxy to perform an end-to-end tissue microarray (TMA) analysis of the tumors. These examples highlight how GalaxyMCP transforms English and other natural languages into the new genomics programming language making complex analyses more intuitive while preserving rigor and reproducibility.

## Dual curation improves the quality of genome assemblies.

**Delphine Lariviere**, Erick Duarte, Kirsty McCaffrey, Richard Burhans, Ying Chen, Bonhwang Koo, Saim Momin, Patrik Smeds, Marco Sollitto, Marius van den Beek, Erich D. Jarvis, Adam M. Phillippy, Michael Schatz, Anton Nekrutenko, Giulio Formenti.   
Presenter affiliation: Pennsylvania State University, State College, Pennsylvania.

The collaboration between the Vertebrate Genome Lab (VGL) and the Galaxy team led to the development of assembly workflows that are routinely used to generate high-quality assemblies (Larivière et al. 2024). While we continuously update and improve these workflows, and the performance of assembly algorithms is constantly increasing, there are still assembly errors that require manual curation to reach near error-free reference genomes. Manual curation, the process of introducing targeted adjustments in the form of breaks, joins, and reorientations of the scaffold produced by automated assembly processes, has been shown to improve the quality of the output genome assemblies significantly. The higher the quality of the genome, the closer it brings us to an accurate representation of the species' biology. In this talk, we will discuss the “Dual curation” process, which involves curating both haplotypes simultaneously using a single Hi-C map, rather than separately, and how it streamlines the curation process in the VGL. We will also present the efforts made to improve the process further using Galaxy workflows, thereby reducing the time spent on assembly by curators and accelerating the production of genome assemblies. 

Larivière, Delphine, et al. "Scalable, accessible and reproducible reference genome assembly and evaluation in Galaxy." Nature biotechnology 42.3 (2024): 367-370. 91

# Celebrating the Next Generation of Genome Informatics Researchers

The [JXTX Foundation](https://jxtxfoundation.org/), established to honor Galaxy co-founder James Taylor (JT), continues to support early-career scientists in genomics and computational biology. These scholarships cover registration and travel expenses for emerging computational biologists to attend the conference and share their work—continuing JT’s legacy of community, collaboration, and open science. This year, three outstanding graduate students have been awarded the 2025 JXTX / CSHL Genome Informatics Scholarships.

## Zoe Rudnick

*Johns Hopkins University School of Medicine*

Zoe Rudnick is a second-year Ph.D. student in Biomedical Engineering at the Johns Hopkins University School of Medicine. Her research focuses on developing algorithms to analyze RNA-seq data, including long-read and single-cell datasets, to improve isoform-level quantification and transcript reconstruction. Zoe's work addresses critical challenges in understanding gene expression at the transcript level, which has important implications for precision medicine and our understanding of complex biological systems.

Outside of the lab, Zoe enjoys rock climbing, reading, and spending time with her cat. Her passion for computational biology and dedication to advancing RNA sequencing analysis methods make her an excellent representative of the next generation of genome informatics researchers.

## Megan Le

*Massachusetts Institute of Technology*

Megan Le is a Ph.D. student in Computer Science at the Massachusetts Institute of Technology, where she is advised by Dr. Heng Li and Dr. Bonnie Berger. Her research focuses on developing new algorithms and tools for genome analysis, tackling fundamental problems in genome assembly, variant calling, and read alignment. These core areas of computational genomics are essential for extracting meaningful insights from sequencing data.

Previously, Megan worked on methods for analyzing ancient DNA data, demonstrating the breadth of her computational expertise. Beyond her research contributions, she maintains an active engagement with the arts and games, enjoying reading, playing bridge, and performing on the piano and oboe. Her combination of algorithmic innovation and methodological rigor positions her as a rising leader in the field.

## Ryan Moreno

*University of Wisconsin-Madison*

Ryan Moreno is a Ph.D. student in Biomedical Data Science at the University of Wisconsin-Madison, working under the guidance of Dr. Sushmita Roy. His research leverages evolutionary information to enhance computational analyses of gene regulation and expression. Ryan is currently focused on an innovative project that integrates RNA sequencing data across species, with the ambitious goal of identifying both conserved and differential gene programs.

This comparative approach promises to reveal fundamental principles of gene regulation that transcend species boundaries while also illuminating the evolutionary innovations that distinguish different organisms. When he's not analyzing sequencing data, Ryan enjoys playing soccer, hockey, and piano, bringing the same dedication to his recreational pursuits as he does to his research.

\_\_\_

As genomics grows increasingly data-driven and interdisciplinary, the conversations and innovations shared at Genome Informatics remind us of the power of open collaboration. The Galaxy community remains committed to building the tools, infrastructure, and training that empower scientists everywhere to turn data into discovery.  
