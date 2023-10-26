---
title: "Galaxy and workflows: advancing SARS-CoV-2 genomic surveillance in wastewater"
date: "2023-10-25"
authors: Polina Polunina
tease: "Galaxy empowered research in SARS-CoV-2 surveillance in wastewater"
hide_tease: true
subsites: [all-eu,global]
---

## Galaxy and workflows: advancing SARS-CoV-2 genomic surveillance in wastewater

A study in *Nature Communications* titled ["SARS-CoV-2 genomic surveillance in wastewater as a model for monitoring evolution of endemic viruses"](https://www.nature.com/articles/s41467-023-41369-5) by Mukhlid Yousif et. al. demonstrates the usefulness of Galaxy and its workflows in epidemiological research. The research delved into identifying SARS-CoV-2 variants in wastewater samples from South African urban centers, shedding light on virus transmission dynamics.

### Wastewater surveillance's vital role

With a decline in global testing for SARS-CoV-2 infections, alternative surveillance methods are needed. Wastewater surveillance has emerged as a key tool, offering a cost-effective way to gain insights into the virus's spread across communities. Over 70 countries now monitor wastewater SARS-CoV-2 levels, complementing clinical surveillance.

### Galaxy empowers genomic surveillance

One of the research's standout technical features is its use of SARS-CoV-2 variant analysis workflows on Galaxy Europe to process the extensive genomic data from wastewater samples into lists of genomic mutations, which could be analyzed further with Freyja.

### Freyja: estimating the abundance of viral lineages

[Freyja](https://github.com/andersen-lab/Freyja) is an open-source tool suite that estimates the relative abundance of SARS-CoV-2 lineages in wastewater samples, employing a unique barcode library to define known lineages.
In this study Freyja was used to gain insight into the dynamics of the spread of Variants of Concern (VOCs), in particular, in comparison to data from clinical sampling of viral specimen.
The Freyja suite of tools including [Freyja demix for estimating lineage abundance is also available on Galaxy Europe](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/freyja_demix/freyja_demix/1.4.4+galaxy0).

### Uncovering uncommon mutations

The research also identified numerous amino acid mutations in the SARS-CoV-2 spike protein. Some of these mutations were rare in clinical samples but prevalent in wastewater, suggesting the emergence of cryptic lineages or unique evolutionary events.

### Looking ahead

This study enhances our understanding of SARS-CoV-2 transmission, but also demonstrates that [Galaxy workflows and infrastructure developed and set up early in the pandemic](https://doi.org/10.1038/s41587-021-01069-1) are getting repurposed and are still powering surveillance efforts in the post-pandemic era.

