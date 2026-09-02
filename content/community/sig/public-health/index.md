---
description: "Public Health Genomics in Galaxy - Using genomic information to benefit public health through surveillance, outbreak tracking, and epidemiological research."
title: "Public Health Genomics in Galaxy"
---

<slot name="/community/sig/common_linkbox" />

**Welcome to the Galaxy Public Health Community**

Public Health Genomics involves the use of **genomic information to benefit public health**. Whether you're a researcher, clinician, epidemiologist, or public health professional, the Galaxy Public Health Community invites your participation in building and sharing resources that enhance Galaxy's utility for public health applications.

## Mission

Our mission is to advance public health through genomic data analysis, including:

- **Pathogen surveillance** and outbreak tracking
- **Variant monitoring** and characterization
- **Antimicrobial resistance (AMR)** detection and tracking
- **Epidemiological investigations**
- **Genomic epidemiology** and transmission dynamics
- **Public health reporting** and actionable insights

## Community Goals

The Galaxy Public Health Community focuses on:

- **Developing and maintaining** tools and workflows for public health genomic analysis
- **Standardizing best practices** for pathogen surveillance and outbreak response
- **Fostering collaboration** among public health laboratories, researchers, and clinicians
- **Supporting interoperability** with public health databases and reporting systems
- **Expanding training** to make genomic surveillance accessible globally
- **Promoting FAIR principles** in public health data analysis

---

## Public Health Galaxy Servers

Several Galaxy servers worldwide support public health genomic analyses:

### Dedicated Public Health Servers

| Server | Institution | Location | URL |
|--------|-------------|----------|-----|
| **GalaxyTrakr** | U.S. Food and Drug Administration (FDA) | United States | [galaxytrakr.org](https://galaxytrakr.org) |
| **ARIES** | Istituto Superiore di Sanità (ISS) | Italy | Contact ISS for access |
| **Sciensano Galaxy** | Sciensano | Belgium | Contact Sciensano for access |
| **ARTBio** | Institut de Biologie Paris Seine (IBPS) | France | [mississippi.fr](https://mississippi.fr) |
| **HyPhy** | Temple University | United States | [hyphy.org](https://www.hyphy.org) |

### Organizations Using Galaxy Internally

Many public health institutions use Galaxy for internal genomic surveillance:

- **National Institute for Communicable Diseases (NICD)** - South Africa
- **South African National Bioinformatics Institute (SANBI)** - South Africa  
- **Quadram Institute** - United Kingdom
- And many more worldwide...

**Want to add your server or organization?** [Contact us](#get-involved) or fill out our [interest form](#join-us).

---

## Getting Started

### Training

The **[Galaxy Training Network (GTN)](https://training.galaxyproject.org)** offers comprehensive tutorials for public health genomic analyses:

#### Featured Training Topics

- **[SARS-CoV-2 Data Analysis](https://training.galaxyproject.org/training-material/topics/variant-analysis/tutorials/sars-cov-2-variant-discovery/tutorial.html)** - Variant calling, consensus building, and lineage assignment
- **[One Health](https://training.galaxyproject.org/training-material/search?query=one+health)** - 9 tutorials bridging human, animal, and environmental health
- **[Variant Analysis](https://training.galaxyproject.org/training-material/topics/variant-analysis/)** - 18 tutorials covering SNP/variant calling and interpretation
- **[Antimicrobial Resistance Detection](https://training.galaxyproject.org/training-material/search?query=antimicrobial+resistance)**
- **[Phylogenetics and Evolution](https://training.galaxyproject.org/training-material/search?query=phylogenetics)**

<iframe
  src="https://training.galaxyproject.org/training-material/tags/one-health/embed.html"
  height="400px"
  width="100%"
  class="gtn-embed"
  frameborder="0">
</iframe>

---

## Community-Maintained Resources

### Workflows

The **[Intergalactic Workflow Commission (IWC)](https://iwc.galaxyproject.org)** provides peer-reviewed, ready-to-use workflows for public health applications:

#### Viral Surveillance Workflows

| Workflow | Description | Category |
|----------|-------------|----------|
| [SARS-CoV-2 Illumina Amplicon (iVar)](https://iwc.galaxyproject.org/workflow/sars-cov-2-pe-illumina-artic-ivar-analysis-sars-cov-2-illumina-amplicon-ivar-pangolin-nextclade/) | Variant calling with Pangolin and Nextclade classification | SARS-CoV-2 |
| [SARS-CoV-2 WGS Variant Calling (PE)](https://iwc.galaxyproject.org/workflow/sars-cov-2-pe-illumina-wgs-variant-calling-covid-19-pe-wgs-illumina/) | Whole genome sequencing variant analysis | SARS-CoV-2 |
| [SARS-CoV-2 WGS Variant Calling (SE)](https://iwc.galaxyproject.org/workflow/sars-cov-2-se-illumina-wgs-variant-calling-covid-19-se-wgs-illumina/) | Single-end WGS variant calling | SARS-CoV-2 |
| [SARS-CoV-2 ONT ARTIC](https://iwc.galaxyproject.org/workflow/sars-cov-2-ont-artic-variant-calling-covid-19-artic-ont/) | Oxford Nanopore ARTIC pipeline | SARS-CoV-2 |
| [SARS-CoV-2 Consensus Construction](https://iwc.galaxyproject.org/workflow/sars-cov-2-consensus-from-variation-covid-19-consensus-construction/) | Build consensus sequences from variants | SARS-CoV-2 |
| [SARS-CoV-2 Variation Reporting](https://iwc.galaxyproject.org/workflow/sars-cov-2-variation-reporting-covid-19-variation-reporting/) | Generate variant reports and visualizations | SARS-CoV-2 |
| [Influenza A Subtyping](https://iwc.galaxyproject.org/workflow/influenza-isolates-consensus-and-subtyping-main/) | Subtyping and consensus generation for Influenza A | Virology |
| [Pox Virus Amplicon Analysis](https://iwc.galaxyproject.org/workflow/pox-virus-amplicon-main/) | Analysis of pox virus tiled-amplicon data | Virology |
| [Generic Viral Variant Calling](https://iwc.galaxyproject.org/workflow/generic-non-segmented-viral-variant-calling-main/) | Non-segmented viral genome analysis | Virology |

#### Bacterial Surveillance Workflows

| Workflow | Description | Category |
|----------|-------------|----------|
| [AMR Gene Detection](https://iwc.galaxyproject.org/workflow/amr_gene_detection-main/) | Antimicrobial resistance gene identification | Bacterial Genomics |
| [Bacterial Genome Assembly](https://iwc.galaxyproject.org/workflow/bacterial-genome-assembly-main/) | Shovill-based assembly for bacterial genomes | Bacterial Genomics |
| [Bacterial Genome Annotation](https://iwc.galaxyproject.org/workflow/bacterial_genome_annotation-main/) | Gene, plasmid, and integron detection | Bacterial Genomics |
| [cgMLST Typing](https://iwc.galaxyproject.org/workflow/cgmlst-bacterial-genome-main/) | Core genome MLST for strain characterization | Bacterial Genomics |
| [Bacterial QC Post-Assembly](https://iwc.galaxyproject.org/workflow/bacterial-quality-and-contamination-control-post-assembly-main/) | Quality and contamination assessment | Bacterial Genomics |
| [Bacterial QC Raw Reads](https://iwc.galaxyproject.org/workflow/quality-and-contamination-control-raw-reads-main/) | Pre-assembly quality control | Bacterial Genomics |

#### Pathogen Detection & Surveillance

| Workflow | Description | Category |
|----------|-------------|----------|
| [PathoGFAIR Pathogen Detection](https://iwc.galaxyproject.org/workflow/pathogen-detection-pathogfair-samples-aggregation-and-visualisation-main/) | Multi-sample pathogen detection and reporting | Pathogen Detection |
| [Allele-based Pathogen ID](https://iwc.galaxyproject.org/workflow/allele-based-pathogen-identification-main/) | Variant-based pathogen identification | Pathogen Detection |
| [Gene-based Pathogen ID](https://iwc.galaxyproject.org/workflow/gene-based-pathogen-identification-main/) | Phylogenetic and ARG detection | Pathogen Detection |

#### Phylogenetics & Epidemiology

| Workflow | Description | Category |
|----------|-------------|----------|
| [HyPhy Core](https://iwc.galaxyproject.org/workflow/hyphy-hyphy-core/) | Selection analysis (BUSTED, FEL, MEME, PRIME) | Comparative Genomics |
| [HyPhy Preprocessing](https://iwc.galaxyproject.org/workflow/hyphy-hyphy-preprocessing/) | Codon-aware alignments and phylogenies | Comparative Genomics |
| [HyPhy Compare](https://iwc.galaxyproject.org/workflow/hyphy-hyphy-compare/) | Contrast-FEL and RELAX analyses | Comparative Genomics |
| [CAPHEINE](https://iwc.galaxyproject.org/workflow/hyphy-capheine-core-and-compare/) | Combined HyPhy selection analyses | Comparative Genomics |

#### Metagenomic Surveillance

| Workflow | Description | Category |
|----------|-------------|----------|
| [Metagenomic Taxonomic & ARG Profiling](https://iwc.galaxyproject.org/workflow/metagenomic-raw-reads-amr-analysis-main/) | Taxonomic classification and ARG detection | Metagenomics |
| [Metagenomic Gene Catalog](https://iwc.galaxyproject.org/workflow/metagenomic-genes-catalogue-main/) | Gene catalog with functional/taxonomic info | Metagenomics |
| [Host Contamination Removal (Short)](https://iwc.galaxyproject.org/workflow/host-contamination-removal-short-reads-main/) | Remove human/host reads from samples | Metagenomics |
| [Host Contamination Removal (Long)](https://iwc.galaxyproject.org/workflow/host-contamination-removal-long-reads-main/) | Nanopore contamination filtering | Metagenomics |

*Explore the full workflow library at [IWC](https://iwc.galaxyproject.org)*

---

## Applications in Public Health

The Galaxy Public Health Community resources support diverse applications:

### Outbreak Response & Surveillance
- **Real-time genomic surveillance** of emerging pathogens
- **Outbreak investigation** and source tracking
- **Transmission chain analysis** using phylogenetics
- **Variant of concern (VOC)** monitoring and characterization

### Antimicrobial Resistance
- **AMR gene detection** in clinical and environmental samples
- **Resistance mechanism** characterization
- **Molecular epidemiology** of resistant strains
- **Treatment guidance** through genotype-phenotype prediction

### Food Safety
- **Foodborne pathogen** detection and characterization
- **Source attribution** in contamination events
- **Whole genome sequencing (WGS)** for traceback investigations
- **Regulatory compliance** and reporting

### Global Health Security
- **Early warning systems** for disease threats
- **Cross-border surveillance** coordination
- **One Health integration** (human-animal-environment interface)
- **Capacity building** in resource-limited settings

---

## Get Involved

### Communication Channels

- **[Matrix Channel](https://matrix.to/#/#galaxyproject_Public-Health:gitter.im)** - Real-time chat and support
- **[Mailing List](https://lists.galaxyproject.org/lists/public-health.lists.galaxyproject.org/)** - Announcements and discussions

### Join Us

We're building this community and want to hear from you!

**📝 [Register Your Interest](GOOGLE_FORM_URL_HERE)** - Add your email to stay informed about:
- Community meetings and events
- New tools and workflows
- Training opportunities
- Collaborative projects

*We will add the Google Form URL soon - stay tuned!*

### How to Contribute

1. **Subscribe** to the [mailing list](https://lists.galaxyproject.org/lists/public-health.lists.galaxyproject.org/)
2. **Join** the [Matrix channel](https://matrix.to/#/#galaxyproject_Public-Health:gitter.im)
3. **Share** your workflows, tools, or use cases
4. **Request** features or report issues
5. **Participate** in training events and hackathons

### Community Coordinators

We are establishing the leadership structure for this community. Interested in helping coordinate? [Let us know](#join-us)!

---

## Partner Projects & Collaborations

| Partner | Description | Focus Areas |
|---------|-------------|-------------|
| [PHA4GE](https://pha4ge.org/) | Public Health Alliance for Genomic Epidemiology | Standards, best practices |
| [IRIDA](https://irida.ca/) | Integrated Rapid Infectious Disease Analysis | Bacterial surveillance platform |
| [ABRomics](https://www.abromics.fr/) | French National AMR Multi-Omics Platform | AMR research and surveillance |
| [GalaxyTrakr](https://galaxytrakr.org) | FDA Food Safety Surveillance | Foodborne pathogen tracking |
| [Nextstrain](https://nextstrain.org/) | Pathogen genomic epidemiology | Phylodynamics and visualization |
| [HyPhy](https://www.hyphy.org) | Molecular evolution analysis | Selection and phylogenetics |
| [PathoGFAIR](https://doi.org/10.1093/gigascience/giaf017) | FAIR pathogen detection | One Health surveillance |

---

## Acknowledgments

We thank the global **public health**, **clinical**, and **bioinformatics** communities working to advance genomic epidemiology and disease surveillance. Special thanks to the **Galaxy community** for providing the infrastructure and support that makes this work possible.

## Publications & Resources

### Key Publications Using Galaxy for Public Health

- **SARS-CoV-2 Genomic Analysis** - Multiple studies leveraging Galaxy workflows for pandemic response
- **Foodborne Outbreak Investigations** - GalaxyTrakr applications in FDA surveillance
- **AMR Surveillance** - ABRomics and other platforms using Galaxy infrastructure
- **One Health Applications** - Integrated human-animal-environmental surveillance

*Have a publication to share? [Contact us](#get-involved) or add it via GitHub.*

---

**Ready to get started?** Explore our [training materials](https://training.galaxyproject.org), try our [workflows](https://iwc.galaxyproject.org), and [join the community](#join-us)!
