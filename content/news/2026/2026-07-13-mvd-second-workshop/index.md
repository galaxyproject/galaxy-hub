---
title: "Second MaterialVital-Digital (MVD) Workshop at IWM Freiburg"
date: "2026-07-13"
tease: "The Leibniz Institute for New Materials (INM), the Fraunhofer Institute for Mechanics of Materials (IWM), and 
the University of Freiburg met in Freiburg to discuss usecases, user stories and file sources."
subsites: [freiburg]

contributions:
  authorship:
    - anuprulez
    - paulzierep
    - bgruening
  funding:
    - materialvitaldigital


---

## Outline

On 7–8 July 2026, members of the Freiburg Galaxy team (UFR), the Fraunhofer Institute for Mechanics of Materials (IWM), 
and the Leibniz Institute for New Materials (INM) met at IWM, Freiburg to discuss **user journey**, **data journey** and **user stories**. 
Additionally, the goal of the workshop was to explore  how Galaxy could support data management, offer reproducible analysis, and 
computational workflows in the MVD project. The workshop focused on understanding the scientific use cases, mapping the journeys of researchers and their data, 
and identifying suitable integration points between Galaxy and existing platforms such as CKAN, RSpace, openBIS, and Fuseki.

## User journeys and user stories

The MVD project includes nine materials-science use cases. The current focus is on **electrospinning** being led by INM, while additional 
topics include electroWriting, rheology, volumetric printing, functional polymers, H-NMR, cytotoxicity, laser cutting, and moulding.

Electrospinning experiments involve many interconnected parameters, including polymers, solvents, concentrations, bioagents, 
fabrication settings, operating windows, and final material properties. One example discussed during the workshop was the 
development of a **living contact lens**, combining material fabrication, biological components, and quality assessment.

A major outcome of the discussions was that the complete **user journey** and **data journey** must first be understood 
before deciding which computational steps should be implemented as Galaxy tools and workflows.

The MVD project aims to identify **reusable computational workflows** that can be applied to multiple materials-science 
use cases.


## Metadata and terminology

The workshop highlighted the need to capture experimental parameters using established terminology and ontologies wherever 
possible.

A general metadata foundation based on **Dublin Core** was discussed, including properties such as:

```text
dc:title
dc:creator
dc:subject
```

This foundational layer could later be extended with domain-specific terms describing polymers, solvents, bioagents, 
fabrication processes, operating conditions, and quality measurements.

## Rspace and CKAN as a central data portal

IWM plans to use **CKAN** as its primary data portal. A key integration discussed during the workshop was the addition 
of a **Galaxy button in CKAN**, allowing users to transfer selected datasets directly into Galaxy.

A few potential ideas for data exchange between CKAN and RSpace, as well as integrating CKAN with Fuseki to support structured 
metadata, ontologies, and semantic descriptions were discussed.

**openBIS** is already used at IWM and may also become an integration target. OMERO could support image and microscopy 
data within the wider infrastructure which is already available as a file source in Galaxy.


## Exploring Galaxy for materials digitalisation at the MVD workshop

Several [Galaxy features](https://doi.org/10.5281/zenodo.21336177) were explored during the workshop, including Galaxy history, 
datasets, tools, workflows, workflow invocations, and the Galaxy interactive tool. Ideas such as offloading compurationally intensive 
tasks to Galaxy, and using Galaxy for reproducible analysis and workflow management were discussed.


## Connecting notebooks as tools

On 8 July, the INM team used the JupyterLab Interactive Tool in Galaxy and learned how to attach datasets directly from a 
Galaxy history. This enables researchers to work interactively while keeping input and output datasets connected to 
Galaxy's history.


## Potential roles for Galaxy

The exact computational role of Galaxy is still being defined. Potential areas include:

- Data annotation tools
- Reusable workflows for materials-science experiments and use cases
- FAIR data management and reproducible analysis


## Next steps

The next steps are to:

- Create a functional CKAN-to-Galaxy integration
- Refine the electrospinning user and data journeys
- Identify relevant computational tasks for Galaxy
- Review existing materials-science ontologies
- Explore CKAN, RSpace, Fuseki, and openBIS integrations

The workshop provided an important first step for refining the approach to fullfill use cases and defining Galaxy's significance 
within the MVD infrastructure. Galaxy will potentially complement MVD project by providing persistent storage, interactive 
environments, reusable tools, and computational workflows.

## Resources

- Talk: [Galaxy project & Rspace & CKAN integration](https://doi.org/10.5281/zenodo.21336177)