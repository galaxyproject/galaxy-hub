---
title: "Galaxy’s contributions to Genome Assembly and Annotation: Advancing Genomic Science"
date: "2025-03-18"
authors: Saim Momin
tease: "Know how Galaxy is contributing towards Genome Assembly and Annotation with cutting-edge tools, global biodiversity projects, and training initiatives"
subsites: [global,eu,us,freiburg]
---

The field of genomics has been transformed by high-throughput sequencing and computational platforms, with Galaxy emerging as a pivotal resource for genome assembly and annotation. Developed as an open-source, web-based platform, Galaxy facilitates reproducible, scalable, and accessible genomic analyses. Its contributions span tailored tools, involvement in landmark biodiversity projects, innovative quality control developments, and extensive training initiatives.

<br>

**<h2>Tailored tools and workflows for Genome Assembly and Annotation</h2>**

Galaxy provides an extensive suite of specialized tools and workflows designed to address the complexities of genome assembly and annotation. For assembly, it integrates state-of-the-art tools such as HiFiasm and Flye for long-read assembly, Canu for error-prone read correction,purge_dups for haplotype purging and YaHS for Hi-C scaffolding exemplified in workflows developed for Vertebrate Genomes Project (VGP) and ERGA-BGE.  These tools support diverse sequencing technologies, including PacBio HiFi and Hi-C, enabling the generation of contiguous, high-quality assemblies with minimal user intervention.

Annotation workflows are equally sophisticated, incorporating BRAKER and AUGUSTUS for structural gene prediction, MAKER for evidence-based gene model integration, and InterProScan and eggNOG-mapper for functional annotation. These workflows adhere to community best practices, ensuring comprehensive and reliable genome characterization.

A key strength of Galaxy is its deployment on public servers, eliminating computational barriers and providing computational infrastructure to researchers worldwide. This accessibility empowers institutions with constrained resources to conduct advanced analyses, promoting equity in genomic research. By offering standardized workflows and ensuring reproducibility, Galaxy bolsters the consistency and trustworthiness of genome assemblies and annotations across diverse studies. Furthermore, Galaxy’s proactive allocation of substantial storage capacity supports researchers working on genome assembly and annotation, accommodating datasets that frequently surpass terabytes. This dedication not only enhances reproducibility but also broadens participation, enabling diverse institutions to advance genomic science effectively.

<br>

**<h2>Contributions to major genomic initiatives: VGP and ERGA-BGE</h2>**

Galaxy has played a role in contributing significantly to large-scale biodiversity genomics projects, notably the [Vertebrate Genomes Project (VGP)](https://vertebrategenomesproject.org/) and the [European Reference Genome Atlas (ERGA)](https://www.erga-biodiversity.eu/) within the [Biodiversity Genomics Europe (BGE)](https://biodiversitygenomics.eu/) framework. The VGP leverages Galaxy to produce reference-quality genomes for a large number of vertebrate species. Its standardized workflows ensure consistency and transparency, with all data and methods openly accessible via public repositories.

Similarly, ERGA, under the BGE initiative, utilizes Galaxy to support the ambitious goal of sequencing approximately 200,000 European eukaryotic species. Aligned with the Earth BioGenome Project (EBP) standards, Galaxy’s infrastructure enables the generation of high-quality reference genomes, facilitating biodiversity monitoring and conservation efforts. Additionally, ERGA-BGE researchers have developed specialized workflows using Galaxy, such as the ONT+Illumina & HiC pipeline (NextDenovo-HyPo + Purge_Dups + YaHS), which are deposited in [WorkflowHub](https://workflowhub.eu/workflows?filter%5Btag%5D=ERGA&filter%5Bworkflow_type%5D=galaxy). These workflows combine Oxford Nanopore long reads, Illumina short reads, and Hi-C data to produce robust assemblies, enhancing the toolkit available to the global research community. These workflows are deposited in WorkflowHub and are planned to be submitted to [IWC Galaxy](https://iwc.galaxyproject.org/) (Intergalactic Workflow Commission Galaxy) for long-term maintenance, updates, and support, ensuring their availability and adaptability for future research. 

<br>

**<h2>Development of ERGA EAR and ERGA Bot for the BGE Project</h2>**

Within the ERGA-BGE collaboration, Galaxy along with its project partners from IZW, have facilitated the development of ERGA EAR and ERGA Bot. The [ERGA Assembly Report (EAR)](https://galaxyproject.org/news/2024-09-19-erga-ear/) is a standardized, community-developed document implemented in Galaxy to evaluate genome assemblies. It incorporates metrics such as contiguity (e.g., N50), gene content completeness via BUSCO analysis, and contamination screening, providing a comprehensive assessment aligned with EBP quality thresholds. This tool enhances transparency and ensures that assemblies meet rigorous scientific standards.

Complementing EAR, the [ERGA Bot](https://galaxyproject.org/news/2026-03-07-erga-bot/) is an automated validation system built using GitHub actions for the BGE project. Designed to streamline quality assurance, it processes assembly reports, identifies anomalies, and enforces consistency across the diverse datasets generated by ERGA’s distributed network. Together, EAR and ERGA Bot represent significant advancements in automating and standardizing genome assembly evaluation, critical for large-scale genomic initiatives.

<br>

**<h2>Training and Workshops: Building capacity in Genomics**</h2>

Galaxy’s educational initiatives are a cornerstone of its mission to empower researchers to utilize its tools and workflows effectively. Hands-on workshops, such as those offered for the VGP and ERGA assembly pipelines, provide hands-on training in assembling genomes from long-read data and performing post-assembly quality control. 
A highlight is the [Galaxy Training Academy](https://training.galaxyproject.org/training-material/events/2025-05-12-galaxy-academy-2025.html), a yearly online event spanning five days, where researchers can immerse themselves in Galaxy’s capabilities with support from trainers and helpers. Hosted by the [Galaxy Training Network](http://training.galaxyproject.org), this event enhances an extensive collection of online tutorials, fostering a proficient, worldwide community well-prepared to utilize Galaxy for advancing genomic research.

<br>

**<h2>Broader Implications: FAIR Principles and Future Directions**</h2>

Galaxy’s adherence to FAIR principles ensures that its workflows, data, and tools are widely available and reusable. The submission of ERGA-BGE and VGP workflows to WorkflowHub and their preservation on IWC Galaxy exemplifies this commitment, enabling researchers to adopt and adapt these pipelines for diverse applications. Its open-source framework encourages continuous improvement, integrating emerging technologies such as Oxford Nanopore sequencing and refining pipelines as methodologies evolve. 

Galaxy stands as a cornerstone in the domain of genome assembly and annotation, offering robust tools, contributing towards biodiversity projects, and fostering innovation through developments like EAR and ERGA Bot. Its training efforts further amplify its impact, building capacity across the scientific community. As genomic research scales to meet global biodiversity and conservation goals, Galaxy’s infrastructure and commitment ensure it remains at the forefront, delivering high-quality, reproducible science. Its ongoing evolution promises to shape the field for years to come.


We gratefully acknowledge the Galaxy Project’s global community—developers, researchers, trainers, and users—who advance genome assembly and annotation through innovative tools, workflows, and training. Moreover we extend our gratitude to Vertebrate Genomes Project (VGP), the European Reference Genome Atlas (ERGA) within Biodiversity Genomics Europe (BGE), the Galaxy Training Network, and countless contributors whose collective efforts drive this significant advancement in genomic science.