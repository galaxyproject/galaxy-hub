---
title: "Galaxy Newsletter December 2025"
authors: "Natalie Whitaker-Allen"
tags: 
layout: news
date: "2025-12-12"
tease: "From celebrating 20 years of Galaxy to highlighting this year’s releases, training milestones, and research breakthroughs, this final newsletter of 2025 reflects on how far the community has come and looks ahead to what’s next."
subsites: [all, global]
---
December 2025  


Hello Galaxy Community,

As we close out 2025, we want to take a moment to thank you for another remarkable year of growth, collaboration, and shared discovery. This year has been especially meaningful, since 2025 marks the 20th anniversary of Galaxy. What began as a small project aimed at improving access to data analysis has become a global ecosystem supported by hundreds of contributors, thousands of users, and an active training and development community that spans across the world. Your contributions, your training efforts, your tools, your workshops, your research, and your enthusiasm continue to shape Galaxy and help move science forward. This year was also monumental in other ways, such as Galaxy Australia celebrating their 11th, 12th, and 13th millionth job all happening in 2025!

In this final newsletter of the year, we celebrate the 20-year milestone, share highlights from this year’s Galaxy releases, reflect on the continued expansion of the Galaxy Training Network, and showcase new research that Galaxy has made possible. We also look ahead to 2026, which brings the Galaxy Training Academy, Galaxy Community Conference and CoFest, and a full slate of conferences where the community will come together again. Thank you for being part of the Galaxy story and for helping build a platform that is open, reproducible, and truly community-driven. Cheers to the new year\!

---

# **Celebrating 20 Years of Galaxy**

2025 marked 20 years since Galaxy first launched with a bold vision: to make high-throughput data analysis accessible to every scientist, regardless of coding experience or computational resources. In the early 2000s, genomic alignments were already considered “big data,” yet approachable and reproducible analysis platforms were rare. Galaxy changed that trajectory and helped shape the way modern life science computing works today.  


Galaxy’s early design decisions created a strong foundation for everything that followed:

• Flat-file storage supported rapid growth as NGS data became standard.  
• A configuration-driven interface allowed anyone to wrap command-line tools for the web.  
• A self-contained software stack could be deployed almost anywhere.  
• Open source from the start encouraged global, community-driven development.

From those beginnings, Galaxy evolved from a research prototype into a global ecosystem. The introduction of workflows in 2007 and 2008 transformed how analyses were shared and reproduced. Public servers expanded access far beyond individual labs. Regional communities formed in Europe, the United States, Australia, Africa, and Asia, each building local expertise and infrastructure. The Galaxy Training Network (GTN) formalized community-led training, and the Intergalactic Utilities Commission (IUC) supported consistent, high-quality tool development during a period of rapid growth.

Today, Galaxy is maintained and expanded by hundreds of contributors: developers, trainers, tool authors, infrastructure teams, and researchers. Their combined efforts have made Galaxy one of the most widely used platforms for FAIR and reproducible science. Galaxy now supports work in genomics, proteomics, metabolomics, imaging, ecology, machine learning, and many additional fields. Throughout this expansion, Galaxy’s founding principles remain central: accessibility, reproducibility, scalability, collaboration, and adaptability.  



Reaching this 20-year milestone is a community achievement. Galaxy thrives because of the people who build tools, teach workshops, host servers, write documentation, answer questions, and use the platform to drive scientific discovery. Thank you for being part of this journey.  



Here's to the next 20 years of open, reproducible, and community-driven science\!  

---

# **Top New Tools and Features from this Year’s Galaxy Releases**

Galaxy’s 2025 releases introduced several improvements that strengthen usability, performance, and analysis flexibility. Here are some of the most notable highlights.

## **1\. A New Unified Visualizations Framework**

Galaxy now provides a more consistent and streamlined visualizations experience. This update improves loading speed, introduces clearer navigation, and expands support for a variety of data types. The new framework also provides a foundation for future visualization tools that will make large and complex datasets more straightforward to interpret.

   <iframe width="100%" height="360" style="margin-bottom: 1em;"
   src="https://www.youtube.com/embed/vQ8pSgiVTpQ"
   title="YouTube video player"
   frameborder="0"
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
   referrerpolicy="strict-origin-when-cross-origin"
   allowfullscreen>
   </iframe>


## **2\. Performance Improvements for Histories, Collections, and Workflows**

Both releases include major backend optimizations that reduce loading times for large histories and dataset collections. Workflow execution now starts more quickly and handles metadata updates more efficiently. These improvements are especially helpful for users working with large NGS datasets or highly branched analyses.

## **3\. Enhanced Interactive Tools, Including JupyterLab 4 and RStudio Updates**

Galaxy continues to expand its interactive tool ecosystem. JupyterLab 4 is now supported with a modern interface, improved extensions, and a smoother experience when working with large files. RStudio has also been updated to operate more reliably within Galaxy’s interactive environment. These improvements offer researchers more flexibility when switching between scripted and GUI-based analysis.


   <iframe width="100%" height="360" style="margin-bottom: 1em;"
   src="https://www.youtube.com/embed/9F1zHbqbFPk"
   title="YouTube video player"
   frameborder="0"
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
   referrerpolicy="strict-origin-when-cross-origin"
   allowfullscreen>
   </iframe>


## **4\. Stronger Proteomics and Imaging Support Through New Tool Integrations**

Galaxy added several new tools for mass spectrometry, imaging, and multi-omics workflows. These include enhancements to MaxQuant, additional imaging utilities, and new workflows that streamline proteomics quality control. These tools broaden the types of datasets that can be processed and allow researchers to perform more advanced cross-domain analyses from a single platform.  

---

# **Advancements from the Galaxy Training Network**

The Galaxy Training Network (GTN) remains one of the strongest examples of community-driven science in action. This year, the GTN passed several significant milestones that reflect both its growth and its global impact on training and education.

The GTN now offers more than 490 peer-reviewed tutorials created and maintained by over 500 contributors. These materials span 35 scientific topics, including genomics, proteomics, machine learning, climate science, imaging, single-cell analysis, and many additional fields. Every tutorial is built to be accessible, reproducible, and ready for use in classrooms, workshops, and self-guided learning.



This year also brought significant improvements to the GTN infrastructure. Tutorials continue to receive updates on new tools and workflows, and many have been translated or adapted to better support international communities. GTN contributors also helped power several major training events throughout 2025, including regional workshops, community-led hackathons, and the Galaxy Training Academy.

The GTN remains a central part of the Galaxy ecosystem. It provides a learning pathway for new users, a reference for experienced researchers, and a collaborative space where trainers and scientists can share knowledge that directly advances open and reproducible science.  

---

# **Galaxy in Research**

Galaxy continues to support high-impact research across genomics, cell biology, evolutionary biology, and biotechnology. Below are a few recent publications that used Galaxy for data processing, assembly assessment, or workflow management. Check them out\!

## [**Microplastic pollution alters prokaryotic communities and disrupts archaeal networks in Sub-Saharan soils**](https://academic.oup.com/femsec/article/101/10/fiaf085/8245868)  
*Rohrbach et al., FEMS Microbiology Ecology, 2025*

This study examined how microplastic contamination shapes soil microbial communities in a densely populated region of Sub-Saharan Africa. Researchers compared 16S rRNA gene profiles from plastic-associated biofilms, known as the plastisphere, with adjacent bulk soil across five locations in Kenya. Galaxy supported community assembly analyses through the iCAMP pipeline, which helped quantify the roles of stochastic and deterministic processes.

The plastisphere showed significantly reduced alpha diversity and a clear shift in prokaryotic composition relative to soil. Plastisphere communities were enriched in several bacterial families, including predatory Bdellovibrionota, while many archaeal groups were strongly depleted. A marked reduction of ammonia-oxidizing 

Nitrososphaeraceae was observed on plastic, suggesting potential consequences for nitrogen cycling. Network analysis revealed that plastisphere microbial networks were far less connected and less complex than those from soil, indicating reduced stability. Although some putative bacterial pathogens were detected, enrichment was minimal and not statistically significant. Functional predictions suggested decreased ammonia oxidation and limited evidence for enhanced plastic degradation.  



*Overview of iCAMP ([Ning et al. 2020](https://www.nature.com/articles/s41467-020-18560-z))*

## [**Flexynesis: a deep learning toolkit for multi-omics integration in precision oncology**](https://www.nature.com/articles/s41467-025-63688-5)  
*Uyar et al., Nature Communications, 2025*

This study introduces Flexynesis, a comprehensive deep learning framework designed to integrate bulk multi-omics data for precision oncology and other complex diseases. Existing multi-omics methods often lack reusable code, flexibility, and reproducibility, which limits their adoption in clinical or translational research. Flexynesis addresses these issues by providing a modular toolset that standardizes data cleaning, feature selection, hyperparameter optimization, model benchmarking, and marker discovery.

The authors demonstrate Flexynesis across a broad set of prediction tasks, including drug response modeling, cancer subtype classification, survival analysis, unsupervised clustering, and cross-modality learning. Flexynesis can integrate multiple data types, including gene expression, methylation, copy number variation, protein language model embeddings, and protein functional features. It supports both deep learning and classical machine learning methods, allowing users to compare performance across architectures. The benchmarking pipeline shows that no single model type excels in all tasks and highlights the importance of flexible, task-specific modeling.

Flexynesis is fully accessible through PyPI, Guix, Bioconda, and the Galaxy platform. The integration into Galaxy provides a graphical interface that removes the need for command-line experience and allows users to run complex, multi-step machine learning workflows reproducibly and at scale.


*Summary of Flexynesis (Uyar et al. 2025\)*

## [**CRISPR-Cas mediated chromosome fusions create stable eight-chromosome Arabidopsis lines**](https://www.science.org/doi/10.1126/science.adz8505)  
*Rönspies et al., Science, 2025*

This study demonstrates precise and heritable chromosome fusions in *Arabidopsis thaliana* using a CRISPR-Cas-based chromosome engineering approach. The authors induced double-strand breaks at subcentromeric and subtelomeric regions to fuse entire chromosome arms and successfully produced two independent lines with eight chromosomes instead of the usual ten. One line carried both arms of chromosome 3 fused to chromosome 1, and the second line distributed the two arms onto chromosomes 1 and 5\. Both chromosome-reduced lines displayed normal development, normal gene expression patterns, and full fertility when homozygous.

Crosses between the engineered plants and wild-type individuals revealed strong reductions in fertility due to meiotic pairing defects and altered recombination landscapes. In hybrids, the fused chromosomes formed trivalents rather than standard bivalents, which caused changes in crossover positions. Recombination near the fusion sites was strongly reduced, while crossover activity shifted toward the chromosome ends. These results provide a clear demonstration that targeted chromosome fusions can reshape the recombination landscape and influence inheritance patterns without compromising viability.

Galaxy supported read processing, junction validation, and sequence assessment, including analyses needed to confirm that the engineered karyotypes did not carry unintended large-scale rearrangements. The study relied on high-quality long-read data and systematic analysis pipelines, and Galaxy provided a reproducible environment for these steps.



*(Rönspies et al. 2025\)*  

---

# **Looking Ahead into 2026**

The new year is already shaping up to be an exciting one for the Galaxy Community. Here are a few of the major events and initiatives coming your way in 2026\.

## **Galaxy Training Academy 2026**

Planning is underway for the next Galaxy Training Academy, which will bring together trainers, researchers, and new users for a week of hands-on learning. Expect updated tutorials, new scientific tracks, and expanded opportunities for trainers to collaborate and build reusable teaching materials. GTA remains one of the strongest examples of community-driven education in open science.

## **Galaxy Community Conference 2026**



GCC2026 will take place in Clermont-Ferrand, France, and will gather our global community for talks, training, posters, and collaborative sessions. As always, the meeting will feature updates from tool developers, infrastructure teams, and researchers who are using Galaxy in creative ways. GCC is a unique meeting that grows stronger each year, and 2026 will be no exception.

## **CoFest 2026**

CoFest will follow GCC and will provide a space for contributors of all experience levels to work together on tools, documentation, training materials, and infrastructure projects. It is a welcoming environment where ideas turn into community contributions. Whether you are a seasoned developer or a first-time participant, CoFest offers a supportive place to learn and create.

## **Galaxy at Conferences in 2026**

Galaxy will also be present at several major conferences throughout the year, including the International Plant and Animal Genome Conference (PAG), Intelligent Systems for Molecular Biology (ISMB), ASM Bioinformatics, ASM Genomics and Big Data (ASM BIG), Biology of Genomes, Biological Data Science, and more. Be sure to find us\!

***We look forward to seeing you, collaborating with you, and building another year of accessible and reproducible science together.***

---

# **Upcoming Events**

| Date | Event | Venue / Location |
| ----- | ----- | ----- |
| 9 January 2026 | [PAG 33 Plant and Animal Genome Conference](https://galaxyproject.org/events/2026-01-09-pag33/) | San Diego, CA, USA |
| 9 January 2026 | [Tools for Tomorrow: NIAID BRCs Webinar Series](https://www.bv-brc.org/docs/news/2025/2025-09-22-BRC-Webinar-Series.html) | Online |
| 05–09 May 2026 | [Biology of Genomes](https://meetings.cshl.edu/meetings.aspx?meet=GENOME&year=26) | Cold Spring Harbor, NY, USA |
| 18–22 May 2026 | [Galaxy Training Academy](https://training.galaxyproject.org/training-material/news/2025/09/12/gta-orga-2026.html) | Online |
| 22–24 June 2026 | [2026 Galaxy Community Conference](https://galaxyproject.org/events/gcc2026/) | Clermont-Ferrand, France |
| 25–26 June 2026 | [CoFest 2026](https://galaxyproject.org/events/gcc2026/) | Clermont-Ferrand, France |
| 12–16 July 2026 | [Intelligent Systems for Molecular Biology](https://www.iscb.org/ismb2026/home) | Washington, DC, USA |
| 11 October 2026 | [ASM Conference on Rapid Applied Microbial NGS and Bioinformatic Pipelines](https://galaxyproject.org/events/2026-10-11-asm-ngs-conference/) | Washington, DC, USA |
| 4–7 November 2026 | [Biological Data Science](https://meetings.cshl.edu/meetings.aspx?meet=DATA) | Cold Spring Harbor, NY, USA |

---

*Thank you for being a part of the Galaxy Community\!* 

**Stay updated with the latest news by following us on [Mastodon](https://mastodon.social/@galaxyproject@mstdn.science), [Bluesky](https://bsky.app/profile/galaxyproject.bsky.social), and [LinkedIn](https://www.linkedin.com/company/galaxy-project)\!**
