---
subsites: [global, us]
gtn: false
date: '2026-10-11'
end: '2026-10-14'
tags: [conference, talk]
title: "Galaxy @ ASM BIG 2026"
location:
  name: Hyatt Regency Washington on Capitol Hill
  street: 400 New Jersey Ave NW
  city: Washington, DC
  postal: "20001"
  country: United States
  url: https://asm.org/events/asm-big/home
continent: NA
tease: "Galaxy heads to ASM BIG 2026 with an invited talk from Mike Schatz and a table open for the whole meeting — stop by to talk BRC-Analytics, Orbit, User Defined Tools, workflows, HPC, and more."
contact: scottcain
contributions:
  organisers:
    - scottcain
---

Galaxy is heading to [ASM BIG 2026](https://asm.org/events/asm-big/home) — the ASM Bioinformatics, Genomics and Big Data Conference (formerly ASM NGS) — held **October 11–14, 2026** at the Hyatt Regency Washington on Capitol Hill in Washington, DC.

# Invited Talk

[Mike Schatz](https://engineering.jhu.edu/faculty/michael-schatz/) (Johns Hopkins University) from the Galaxy community will give an invited talk.

# Find Galaxy All Week

Members of the Galaxy team will be at the meeting for its full duration with a table where anyone can stop by to chat, ask questions, grab some candy, or just say hi. Topics we're happy to talk about include:

- **[BRC-Analytics](/projects/brc/)** — analysis tools and genomic annotations for pathogen, host, and vector data
- **[Orbit](/agents/orbit/)** — Galaxy's AI research harness that lets you converse about your data, draft and run analysis plans, and route steps to Galaxy
- **[User Defined Tools](https://docs.galaxyproject.org/en/master/admin/user_defined_tools.html)** (currently in beta) — write and run your own simple tools directly from the Galaxy interface, no server access or admin installation required. [Contact us for access](mailto:outreach@galaxyproject.org)
- **[Workflows (IWC)](https://iwc.galaxyproject.org/)** — the Intergalactic Workflow Commission's library of open, peer-reviewed workflows for reproducible science
- **High Performance Computing** — compute provided to [usegalaxy.org](https://usegalaxy.org) via [Jetstream2](/cloud/jetstream/) and [TACC](https://tacc.utexas.edu/)
- **Petabase-scale sequence search** — the Logan database and the tools that search it (kmindex, Logan Protein, LexicMap), all runnable in Galaxy (see below)
- **Reproducible computational biology**
- **Free access** — Galaxy is free to use for everyone

Come find us to learn more about how Galaxy can support your microbial genomics and bioinformatics work.

# Searching All of Public Sequencing Data

Ask us about searching the world's public sequencing data. At the base is one database:

**[Logan](https://registry.opendata.aws/pasteur-logan/)** — a planetary-scale assembly of the entire NCBI Sequence Read Archive: 38 million accessions (87 petabases of raw reads, December 2025 freeze) assembled into freely downloadable contigs and unitigs, hosted on AWS Open Data ([Chikhi *et al.*, bioRxiv](https://doi.org/10.1101/2024.07.30.605881); [v1.2 release notes](https://github.com/IndexThePlanet/Logan/blob/main/Stats-v1.2.md)). Hear the story in our [GCC2026 keynote recap](/news/2026-07-06-gcc2026-recap/).

Three tools sit on top of Logan to search it — all runnable in Galaxy on [usegalaxy.org](https://usegalaxy.org):

- **[kmindex](https://github.com/tlemane/kmindex)** — k-mer search that answers "which samples contain my sequence?" in fractions of a second; it is the engine behind the [Logan Search](https://logan-search.org) web server ([Lemane *et al.*, Nature Computational Science 2024](https://www.nature.com/articles/s43588-024-00596-6)). In Galaxy: [kmindex build](https://usegalaxy.org/root?tool_id=kmindex_build) and [kmindex query](https://usegalaxy.org/root?tool_id=kmindex_query).
- **[Logan Protein](https://usegalaxy.org/root?tool_id=logan_protein_search_database)** — protein-level search of Logan using pre-computed embeddings, newly available in Galaxy as the Logan protein search tool.
- **[LexicMap](https://bioinf.shenwei.me/LexicMap/)** — "gold-standard" alignment of a gene, plasmid, or long read against millions of genomes at once ([Shen, Lees & Iqbal, Nature Biotechnology 2025](https://www.nature.com/articles/s41587-025-02812-8)). In Galaxy: [LexicMap index](https://usegalaxy.org/root?tool_id=lexicmap_index) and [LexicMap search](https://usegalaxy.org/root?tool_id=lexicmap_search) — with BRC-Analytics integration [in the works](https://github.com/galaxyproject/brc-analytics/issues/1151).

# Flyer Resources

Picked up one of our flyers at the meeting (or scanned its QR code)? Here's where to go deeper on everything we featured.

## Get started with Galaxy

- [usegalaxy.org](https://usegalaxy.org) — free public Galaxy server, with free compute and storage (sibling servers: [usegalaxy.eu](https://usegalaxy.eu), [usegalaxy.org.au](https://usegalaxy.org.au))
- [Galaxy Training Network](https://training.galaxyproject.org) — hundreds of free, hands-on tutorials, including a full [microbiome topic](https://training.galaxyproject.org/training-material/topics/microbiome/)
- [Galaxy Help](https://help.galaxyproject.org) — community question & answer forum

## Microbiology on Galaxy

- [Microbiology Galaxy Lab](https://microbiology.usegalaxy.org) — a dedicated microbiology view of Galaxy with 315+ tool suites, 115+ workflows, and 40+ tutorials, curated by the microGalaxy [community](https://galaxyproject.org/community/)
- [Microbiology Galaxy Lab paper](https://www.biorxiv.org/content/10.1101/2024.12.23.629682) (Nasr, Pechlivanis, *et al.*, F1000Research 2025)
- [PathoGFAIR](https://doi.org/10.1093/gigascience/giaf017) (Nasr *et al.*, GigaScience 2025) — FAIR, adaptable Galaxy workflows for (foodborne) pathogen detection and tracking from Nanopore sequencing

## BRC-Analytics

- [brc-analytics.org](https://brc-analytics.org) — analytics for pathogen, host, and vector data: ~2,000 organisms with reference genomes and annotations from NCBI Datasets, curated workflows, and free compute. Choose an organism, pick a workflow, and Galaxy runs it.
- [Getting started guide](https://brc-analytics.org/learn/getting-started/introduction) and [roadmap](https://brc-analytics.org/roadmap)
- [BRC-Analytics is open for business!](/news/2025-10-14-brc-me-v/) — a measles virus case study showing data-to-publication analysis entirely in the browser
- Part of NIAID's [Bioinformatics Resource Centers program](https://www.niaid.nih.gov/research/bioinformatics-resource-centers)

## Orbit

- [Orbit](/agents/orbit/) — download the desktop app for macOS, Linux, and Windows (open source, in beta)
- [Orbit support forum](https://help.galaxyproject.org/t/about-the-orbit-support-category/17984) — early-access help, bug reports, and feedback
- [Case study](https://pmc.ncbi.nlm.nih.gov/articles/PMC12776552/) — standardizing fungal pathogen RNA-seq with BRC-Analytics and agentic AI: eight frontier LLMs reanalyze a *Candidozyma auris* study on Galaxy through Orbit

## Workflows and tools

- [IWC workflow library](https://iwc.galaxyproject.org/) — curated, peer-reviewed, continuously tested workflows
- [BioContainers](https://biocontainers.pro) — the container packaging behind the 100,000+ tools available in Galaxy
- [User Defined Tools](https://docs.galaxyproject.org/en/master/admin/user_defined_tools.html) — bring your own scripts into Galaxy (beta)

## Upcoming events

- **Galaxy Training Academy — Spring 2027** — a week of free, global, online Galaxy training; potential topics include metagenomics and bacterial genomics. Watch [training.galaxyproject.org](https://training.galaxyproject.org) for announcements.
- **[Galaxy Community Conference 2027](https://galaxyproject.org/gcc/)** — June 28 – July 1, 2027, at Université de Sherbrooke. Watch [galaxyproject.org](https://galaxyproject.org) for announcements.
