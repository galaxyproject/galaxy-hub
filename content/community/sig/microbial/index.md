---
description: "Explore microbiological data analysis in Galaxy. Whether you're working with microbiome samples, bacterial isolates, or multi-omics datasets, the microGalaxy community is for you!"
autotoc: true
title: "Microbiological Data Analysis in Galaxy"
---

<slot name="/community/sig/common_linkbox" />

<img class="img-fluid float-left" src="/community/sig/microbial/microgalaxy-logo.png" style="width:140px; margin-right: 30px;" alt="microGalaxy logo"/>

**Welcome to the microGalaxy Community**

Your hub for **microbiological data analysis** in Galaxy, whether you're analyzing microbiome samples, bacterial isolates, long or short reads, shotgun or 16S data, genomics, transcriptomics, proteomics, metabolomics, or multi-omics integrative analyses.

## Community Goals

Since **2021**, the microGalaxy community has focused on:
- **Coordinating efforts** across the Galaxy ecosystem to minimize redundancy in tools, workflows, and training.
- **Sharing advancements** within and beyond the Galaxy community.
- **Supporting collaboration** among users, developers, and trainers.

We also aim to:
- **Develop and maintain** microbiological data analysis tools and workflows in Galaxy.
- **Standardize best practices** for FAIR (Findable, Accessible, Interoperable, Reusable) microbiological data analysis.
- **Expand documentation and training** to make learning accessible for all skill levels.

Our **roadmap** (detailed [below](#community-roadmap-20262030)) outlines how we plan to achieve these goals through concrete milestones and community-driven initiatives.

## Who Are We?

We are a diverse group of **users, developers, trainers, and bioinformaticians** passionate about advancing microbiological data analysis in Galaxy. **Everyone is welcome!**

- **Developers:** Developing microbiological tools or workflows in Galaxy? Looking for collaborators or testers? Join us!
- **Users:** Analyzing microbiome samples, bacterial isolates, or multi-omics data? Share your feedback, test new resources, or request tools.
- **Trainers:** Using Galaxy for training? Help us improve resources and support users.
- **Bioinformaticians:** Contribute your expertise to ensure our tools reflect the latest best practices.

**Community Coordinators:**
- **Bérénice Batut** (Institut Français de Bioinformatique & AuBi, France)
- **Paul Zierep** (University of Freiburg, Germany)

---

## Getting Started

### The Microbiology Galaxy Lab (MGL)

The **MGL** is a specialized Galaxy extension designed for microbiology research. It features:
- A **curated tool panel** with community-approved tools organized by analysis type.
- A **central resource hub** with direct links to tools, workflows, and training materials for **microbial isolates** and **microbiome** data.
- **Community-developed** and **FAIR-compliant** **workflows**.
- **Quick access** to support and the microGalaxy community.

**Ready to explore?**
Log in with your Galaxy account on the server closest to you:
- **United States:** [microbiology.usegalaxy.org](https://microbiology.usegalaxy.org)
- **Europe:** [microbiology.usegalaxy.eu](https://microbiology.usegalaxy.eu)
- **Australia:** [microbiology.usegalaxy.org.au](https://microbiology.usegalaxy.org.au)
- **France:** [microbiology.usegalaxy.fr](https://microbiology.usegalaxy.fr)

### Training

The **[Galaxy Training Network (GTN)](https://training.galaxyproject.org)** offers **40+ tutorials**, **15 videos (16 hours)**, and **3 structured learning pathways** for microbiology analyses—from basic sequence analysis to advanced metaproteomics and metagenomics.

<iframe
  src="https://training.galaxyproject.org/training-material/tags/microgalaxy/embed.html"
  height="400px"
  width="100%"
  class="gtn-embed"
  frameborder="0">
</iframe>

---

## Community Maintained, Curated and Ready-to-Use Resources

### Tools and Workflows

MGL provides **315+ tool suites** and **115+ curated workflows** for comprehensive microbial data analysis:

![This diagram illustrates comprehensive workflows for analyzing microbial isolate and microbiome samples through genomics, transcriptomics, and proteomics approaches. For microbial isolates (Panel A), the process begins with raw genomic, transcriptomic, or proteomic data, which is cleaned and processed into assemblies, mapped reads, or peptide data. These are further analyzed to identify strains, genes, and functional elements such as antimicrobial peptides, virulence factors, and biosynthetic genes. The workflow also includes comparative analyses, annotation, and visualization of results. For microbiome samples (Panel B), raw data from metabarcoding, metagenomics, metatranscriptomics, and metaproteomics are processed to generate taxonomic and functional profiles. This involves cleaning and assembling reads, identifying operational taxonomic units (OTUs) or amplicon sequence variants (ASVs), and constructing annotated gene catalogs. The workflows culminate in diversity metrics, functional tables, community profile visualizations, and differential feature analyses. The diagram highlights the interconnectedness of data types and analytical steps, emphasizing the integration of multi-omics approaches for comprehensive microbial and microbiome research.](https://github.com/usegalaxy-eu/microbiology_galaxy_lab_paper_2025/blob/main/docs/figures/figure_4.png?raw=true)
*Comprehensive workflows for microbial isolate and microbiome analysis.*

#### Tools

Explore the **300+ tool suites** (880+ individual tools) for microbiological data analysis available in the [ToolShed](https://toolshed.g2.bx.psu.edu/) and curated by the community:

<iframe
  title="Microbial Tools"
  width="100%"
  height="600"
  frameBorder="0"
  src="https://galaxyproject.github.io/galaxy_codex/communities/microgalaxy/resources/tools.html">
</iframe>

*This list is powered by the [Galaxy Codex Project](https://github.com/galaxyproject/galaxy_codex/) and regularly updated and curated by the microGalaxy community to provide state-of-the-art tools. You can explore the [raw metadata](https://github.com/galaxyproject/galaxy_codex/blob/main/communities/microgalaxy/resources/curated_tools.tsv).*

**Highlights:**
- Integration of complete frameworks (e.g.**QIIME 2**, **MetaPhlAn**, and soon Anvi'o) for intuitive access to extensive resources.
- **170+ reference genomes** and **11TB of reference data** for taxonomic classification and functional annotation.
- Interactive tools like **Pavian**, **Phinch**, **Shiny Phyloseq**, **Apollo**, **Jupyter Notebooks**, and **RStudio**.

*Are we missing a tool, or should some tools be removed? [Reach out to us](https://matrix.to/#/#galaxyproject_microGalaxy:gitter.im) or  contribute by modifying the `To keep` and/or `Deprecated` column in the [curation file](https://github.com/galaxyproject/galaxy_codex/blob/main/communities/microgalaxy/metadata/tool_status.tsv) to help us keep this list comprehensive.*

#### Workflows

Access to **115+ ready-to-use workflows**, e.g. the integration of the MGnify amplicon pipeline:

<iframe
  title="Microbial Workflows"
  width="100%"
  height="500"
  frameBorder="0"
  src="https://galaxyproject.github.io/galaxy_codex/communities/microgalaxy/resources/workflows.html">
</iframe>

*This list is powered by the [Galaxy Codex Project](https://github.com/galaxyproject/galaxy_codex/) and regularly updated and curated by the microGalaxy community to provide state-of-the-art workflows. You can explore the [raw metadata](https://github.com/galaxyproject/galaxy_codex/blob/main/communities/microgalaxy/resources/curated_workflows.tsv).*

*Are we missing a public workflow, or should some be removed? [Reach out to us](https://matrix.to/#/#galaxyproject_microGalaxy:gitter.im) or  contribute by modifying the `To keep` and/or `Deprecated` column in the [curation file](https://github.com/galaxyproject/galaxy_codex/blob/main/communities/microgalaxy/metadata/workflows_status.tsv) to help us keep this list comprehensive.*

### Training Events

The microGalaxy community has organized **30+ training events** over the past five years, including the **Galaxy Training Academy** (formerly Galaxy Smörgåsbord):

| Edition | Supported Tracks |
|---------|------------------|
| [Smörgåsbord 2021](https://shiltemann.github.io/global-galaxy-course/) | Video tutorials |
| [Smörgåsbord 2022](https://gallantries.github.io/video-library/events/smorgasbord2/) | [Meta-omics](https://gallantries.github.io/video-library/modules/meta-omics) & [Microbial Analysis](https://gallantries.github.io/video-library/modules/microbial) |
| [Smörgåsbord 2023](https://gallantries.github.io/video-library/events/smorgasbord3/) | [Meta-omics](https://gallantries.github.io/video-library/modules/meta-omics) & [Microbial Analysis](https://gallantries.github.io/video-library/modules/microbial) |
| [GTA 2024](https://training.galaxyproject.org/training-material/events/galaxy-academy-2024.html) | [Bacterial Genomics and AMR Detection](https://training.galaxyproject.org/training-material/events/tracks/gta2024-bacterial-genomics.html), [Microbiome Analysis](https://training.galaxyproject.org/training-material/events/tracks/gta2024-microbiome.html) |
| [GTA 2025](https://training.galaxyproject.org/training-material/events/2025-05-12-galaxy-academy-2025.html) | [Microbiome](https://training.galaxyproject.org/training-material/events/tracks/gta2025-microbiome.html) |

Specialized trainings, such as **[Mycobacterium tuberculosis genomic analysis](https://training.galaxyproject.org/training-material/events/2024-06-10-mtb-ngs.html)**, have reached global participants, especially in the Global South.

---

## Galaxy Adoption for Microbial Research

<img class="img-fluid float-left" src="/community/sig/microbial/citations.png" style="max-width:275px; margin-right: 50px; margin-bottom: 20px;" alt="Galaxy citations"/>

Galaxy is a trusted platform for microbial data analysis, with **10,459+ publications** using Galaxy (until Decembre 2025), including **2,908 microbiology-focused studies**:
- **836 studies** (28.75%) on health and disease.
- **593 studies** (20.39%) on ecosystems and biodiversity.
- **1,116 studies** (38.38%) bridging both domains.

**(Meta)genomics** is the most common application, followed by **metabarcoding** and **metatranscriptomics**. Key analyses include **taxonomic classification**, **functional annotation**, and **AMR gene profiling**.

## Applications in Health, Disease, and Ecosystem Research

The **microGalaxy community** and the **Microbiology Galaxy Lab (MGL)** resources have been used for diverse research applications in **health, disease, and ecosystem studies**

### Health and Disease

- **Pathogen Analysis:**, e.g. microbial pathogenesis, host-microbe interactions, and antibiotic resistance mechanisms.
- **AMR Research:** via platforms like **[ABRomics](https://www.abromics.fr/)** and **[BenchAMRking](https://erasmusmc-bioinformatics.github.io/benchAMRking/)**, which provide workflows for AMR gene identification and clinical reporting.
- **Pathogen Detection:**, e.g. **[PathoGFAIR](https://doi.org/10.1093/gigascience/giaf017)** supports outbreak tracking and food safety.
- **Clinical Metaproteomics:** to analyze microbial proteins in diseases like **COVID-19**, cystic fibrosis, and ovarian cancer.
- **AI and Machine Learning:** to discover microbial biomarkers and novel viruses with tools like **[MetaSBT](https://doi.org/10.1101/2025.08.25.672238)**.

### Ecosystem Dynamics and Biodiversity

- **Community Dynamic** using **metabarcoding**, **metagenomics**, and whole-genome sequencing for accurate classification, and explore root microbiomes, beer microorganisms ([BeerDEcoded](https://streetsciencecommunity.github.io/projects/beerdecoded/)), soil community ([BioDIGS](https://biodigs.org/#home)), and global mycorrhizal fungi ([SPUN](https://www.spun.earth/)).
- **Functional Annotation** with gene prediction and functional profiling.
- **Multi-Omics Integration** to link genetic potential with real-time activity, e.g. in studies to study microbe communities in atmospher ([Péguilhan *et al.*, 2025](https://doi.org/10.5194/bg-22-1257-2025)) and biogas reactor ([Schiml *et al.*, 2023](https://doi.org/10.1186/s40793-023-00514-9)).

---

## Get Involved

The microGalaxy community is open to all! **No formal membership required.**

### Communication Channels

- **[Matrix Channel](https://matrix.to/#/#galaxyproject_microGalaxy:gitter.im)**
- **[Mailing List](https://lists.galaxyproject.org/lists/microgalaxy.lists.galaxyproject.org/)**

### Meetings and Events

- **Online Meetings:** 4 times/year (alternating times for global participation).
- **In-Person Events:** Annual Galaxy Community Conference and European Galaxy Days.
- **Hackathons and Workshops:** Collaborative events to develop workflows, tools and other functionalities, as a community, with other Galaxy communities and working (e.g. with the [Intergalactic Workflow Commission (IWC)](https://github.com/galaxyproject/iwc) in 2025), or during external events like the [ELIXIR BioHackathon](https://biohackathon-europe.org/) or 

### Community Calendar

<iframe src="https://calendar.google.com/calendar/embed?src=npu7puk75n6p0u4aapv5t21uj8%40group.calendar.google.com&ctz=Europe%2FBrussels" width="800" height="600" frameborder="0" scrolling="no"></iframe>

### Join Us
1. Subscribe to the [mailing list](https://lists.galaxyproject.org/lists/microgalaxy.lists.galaxyproject.org/).
2. Say hello in the [Matrix channel](https://matrix.to/#/#galaxyproject_microGalaxy:gitter.im).
3. Attend a [meeting](https://docs.google.com/document/d/13VjcUjStuIp7bK29e74k8Nqb7N4lmVcg1ioArEWr254/edit#).

---

## Community Roadmap (2026–2030)

**Core Principles:**
* **Consolidate and curate** state-of-the-art tools, workflows, and tutorials.
* **Adapt quickly** to scientific and technological advancements.
* **Prioritize reference data management** as a foundational pillar.
* **Foster community-driven innovation** and open collaboration.


### 1. Consolidate and Curate State-of-the-Art Resources

**Goal:** Ensure MGL remains a **leading platform** for microbial bioinformatics by continuously updating, deprecating, and curating tools, workflows, and tutorials.

**Actions:**
* Regularly review and update tools and workflows to reflect the latest scientific advancements.
* Decommission outdated tools while preserving them for reproducibility.
* Expand and refine tutorials to cover emerging topics (e.g., AI/ML in microbiome analysis, metaproteomics, holo-omics).
* Curate learning pathways to guide users from beginner to advanced analyses.

### 2. Expand and Diversify Microbial Data Analysis Capabilities

**Goal:** Broaden MGL's scope to include **viruses, archaea, eukaryotes**, and **multi-omics integration**, while ensuring workflows meet the needs of specialized platforms and emerging research areas and integrating **One Health principles** to support cross-domain analyses (human/animal/environmental microbiomes).

**Actions:**
* Develop flagship workflows that showcase state-of-the-art capabilities in key domains, such as MAG generation, AMR detection and tracking pathogen spillover, advancing scientific capacity in these areas and supporting cross-domain analyses
* Develop workflows for emerging research areas (e.g., host-microbe interactions, environmental microbiome monitoring).
* Support multi-omics integration (e.g., metagenomics + metatranscriptomics + metaproteomics + metabolomics).
* Develop tailored workflows to support Galaxy-based platforms like BRC-analytics and ABRomics
* Integrate pipelines from [MGnify](https://www.ebi.ac.uk/metagenomics), [KBase](https://www.kbase.us/), and [BV-BRC](https://www.bv-brc.org/) to expand capabilities for viral, fungal, and eukaryotic analysis.


### 3. Reference Data Management

**Goal:** Establish **shared, standardized, and accessible reference data** to support all MGL activities.

**Actions:**
* Collaborate with the Galaxy community to automate the addition of reference data to Galaxy CernVM-FS via [Galaxy IDC](https://github.com/galaxyproject/idc).
* Develop Ansible roles for managing reference data installation via Git repositories.
* Integrate reference datasets from [AllTheBacteria](https://allthebacteria.org/), [Logan](https://registry.opendata.aws/pasteur-logan/), [MGnify](https://www.ebi.ac.uk/metagenomics), and other MAGs databases.
* Work with pipelines from [MGnify](https://www.ebi.ac.uk/metagenomics), [KBase](https://www.kbase.us/), [BV-BRC](https://www.bv-brc.org/), and others to ensure their reference data is accessible and up-to-date in MGL.
* Curate "reference data packs" for common use cases (e.g., AMR genes, 16S rRNA, viral genomes).


### 4. Strengthen FAIR Data and Reproducibility

**Goal:** Maintain **FAIR compliance** and **reproducibility** as the field evolves.

**Actions:**
* Automate metadata annotation for new tools and workflows using EDAM ontology and bio.tools.
* Promote RO-Crate exports to ensure complete, reproducible analysis environments.
* Integrate with global repositories (e.g., EMBL-EBI, MGnify) for seamless data sharing.

### 5. Improve Scalability and Computational Efficiency

**Goal:** Optimize MGL for **large-scale analyses** and **distributed computing**.

**Actions:**
* Develop and refine AI-driven resource allocation to predict computational needs.
* Facilitate federated analysis across Galaxy instances through standardized availability of tools and reference data on public, private, and local Galaxy deployments.

### 6. Enhance Training and Community Engagement

**Goal:** Empower users through **comprehensive training** and **global collaboration**.

**Actions:**
* Continue to offer tracks at the annual [Galaxy Training Academy](https://training.galaxyproject.org/training-material/events/2026-05-18-galaxy-academy.html).
* Host annual hackathons to co-create tools, workflows, and reference data standards.
* Partner with organizations like [ELIXIR](https://elixir-europe.org/) and [Australian BioCommons](https://www.biocommons.org.au/) for localized training.
* Encourage community contributions to training materials and workflows.

---

## Acknowledgments

We thank the **microGalaxy community** and the global **Galaxy community** of users, developers, educators, and administrators.

## Partner Projects
| Partners | Description | People Involved |
|----------|-------------|-----------------|
| [Seq4AMR](https://www.jpiamr.eu/projects/seq4amr/) | Network for Integrating Microbial Sequencing and AMR Platforms | Saskia Hilteman |
| [ELIXIR Microbiome Community](https://elixir-europe.org/communities/microbiome) |  | Bérénice Batut, Paul Zierep |
| [Galaxy-P](https://galaxyp.org/) |  | Pratik Jagtap |
| [IRIDA](https://irida.ca/) | Integrated Rapid Infectious Disease Analysis | Aaron Petkau |
| [ABRomics](https://www.abromics.fr/) | French National Multi-Omics Platform for AMR Research | Bérénice Batut, Cléa Siguret |
| [FAIRyMAGs](https://elixir-europe.org/how-we-work/scientific-programme/science/bfsp/fairymags) | FAIRyMAGs: Optimising Metagenomics Assembled Genomes building | Paul Zierep, Mina Hojat Ansari, Patrick Bühler, Santino Faack, Giuseppe Defazio, Bruno Fosso, Martin Beracochea, Santiago Sanchez, Alexandra Hottmann, Bérénice Batut |
