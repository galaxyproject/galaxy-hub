---
title: Galaxy and Findability
highlight: true
---

Galaxy as both a project and a platform facilitates FAIR research, addressing common needs, invoking available standards and contributing to several upstream projects. 

<div class="float-right" style="max-width: 200px"><img src="/images/logos/ELIXIR_RIR_Logo.png" alt="ELIXIR RIR logo"/></div>
<br>

This page focusses on FAIR's 'F' component, so highlighting findability measures, pointing to respective implementations and answering a range of questions about the topic. The first step in (re)using data is to find them. Metadata and data should be easy to find for both humans and computers. Machine-readable metadata are essential for automatic discovery.This contents rely on the FAIR principles described by the [GOFAIR intiative](https://www.go-fair.org/fair-principles/)

# Resource facilitation to scientific research

## Brief description of Galaxy 

Galaxy is an interoperable open-source platform for scientific data analysis and sharing, covering diverse research fields such as *omics, machine learning, and climate and earth science. The platform emphasises transparency, reproducibility, and reusability, facilitating sharing of tools, workflows, visualisations, and data, while capturing all provenance information. Galaxy also offers strong research data management tools, covering data import, organisation, annotation, sharing and export. With the aim of accelerating scientific discovery and innovation, the platform encourages researchers to share their data and analysis workflows with the wider scientific community. Galaxy provides a borderless and efficient approach to support non-technical users in effective research.

## Describe the **scope**, and the users of the resource. How is Galaxy making itself and services (tools, workflows, trainings) findable ?

Galaxy enhances the findability of research artifacts by supporting Persistent Identifiers (PIDs) for tools and workflows, ensuring long-term discoverability. Its integration with RO-Crate facilitates the packaging and description of data and workflows using rich metadata, enabling seamless cataloging and retrieval. Searchable repositories such as the Galaxy Toolshed further bolster discoverability, allowing researchers to access shared tools and workflows across domains.  Furthermore, platforms like Zenodo complement Galaxy's capabilities, playing a key role in preserving and sharing research outputs with persistent identifiers and rich metadata, ensuring their long-term value. These capabilities are central to helping scientists locate critical resources efficiently.

The usegalaxy.* servers (in the US, EU, AUS) have an extensive user base each of tens of thousands of registered users, adding a few thousand new users every month. These users come from different scientific fields and most of them do not have a background in data-intensive methodologies, who intend to answer research questions using data science methods. The majority of users are interested in analysing their own data in the context of publicly available reference resources and data collections. Their main goal is to develop workflows of tools and to apply them on a large scale. According to this user profile, the Galaxy Training Network (GTN, https://training.galaxyproject.org/) has developed broad and interactive high-quality training materials, being deeply rooted in both Galaxy’s community and technical infrastructure.

Usegalaxy.eu has been developed as a European Galaxy project by multiple ELIXIR partners as well as EOSC projects and individuals from all over Europe. It is positioned as a flagship project of the German Network of Bioinformatics infrastructure (de.NBI) and part of multiple national projects. It is one of the biggest ELIXIR services and the preferred gateway for scientific computing of multiple European Open Science Cloud (EOSC) projects. Usegalaxy.eu focuses on providing a platform for analysing and sharing scientific data rather than developing standards. In other words, the European Galaxy project progressively integrates concepts, metadatas, standardisations, tools, APIs and concepts developed by related initiatives in order to bring them to application in users’ analyses and increase the overall level of practised FAIRness.

Galaxy, as an open-source Virtual Research Environment (VRE), has implemented several features to align with the Findability aspect of the FAIR principles. Below is an overview of how Galaxy addresses this critical principle.

Base URLs (home pages): https://usegalaxy.org, https://usegalaxy.eu, https://usegalaxy.org.au

Introductory page URL: https://galaxyproject.org

### Persistent Identifiers (PIDs) for Tools and Workflows

Galaxy supports the assignment of Persistent Identifiers (PIDs) to tools, workflows, and datasets. PIDs ensure that research outputs remain discoverable and accessible over time, even as technologies and platforms evolve. This practice eliminates the risk of losing resources due to broken links or outdated references, making Galaxy a reliable environment for finding scientific artifacts.

### RO-Crate Integration for Rich Metadata

Galaxy integrates with RO-Crate, a standardized metadata framework designed to package and describe research objects such as workflows, datasets, and softwares. RO-Crate enables the creation of structured, machine-readable metadata that provides detailed descriptions of research outputs. This metadata enhances the cataloging and retrieval of research objects, making them easier to find and understand in a broader scientific context.

### Searchable Repositories

Galaxy provides access to searchable repositories such as the Galaxy Toolshed, a centralized platform that indexes and hosts tools and workflows shared by the global Galaxy community. Researchers can easily browse, search, and discover tools and workflows tailored to their needs, fostering collaboration and knowledge sharing. The Galaxy Toolshed functions as an "app store" for tools, ensuring that resources are well-organized and accessible to users across disciplines.

### WorkflowHub Integration

Galaxy supports the deposition of workflows into external registries like WorkflowHub. WorkflowHub is a dedicated repository for sharing and discovering workflows, complete with detailed metadata and versioning. By enabling Galaxy workflows to be deposited in WorkflowHub, researchers can further enhance the visibility and discoverability of their work, ensuring alignment with the Findability principle.

### Community-Driven Standards

Galaxy adheres to community-driven standards for metadata and data management, ensuring that its tools and workflows are compatible with broader scientific infrastructures. Standards compliance ensures that research outputs created within Galaxy are not only findable within the Galaxy ecosystem but are also accessible to external tools and platforms that follow similar conventions. Fully integrated into the work area, the Galaxy Training network (available at training.galaxyproject.org) is an initiative that aims at making the Galaxy platform accessible to a wide audience by providing free and open educational resources. It offers an extensive collection of detailed and reviewed tutorials authored by administrators, developers, and scientists. These tutorials serve as valuable resources for individuals seeking to learn how to navigate Galaxy, employ specific functionalities like tools or execute workflows for specific analyses. By mixing trainings and tools in the same friendly user webapp, Galaxy is a tool perfectly suited for open science.


### Support for Ontologies and Keywords

Galaxy encourages the use of controlled vocabularies and ontologies for tagging tools, workflows, and datasets. Specifically, Galaxy integrates with the EDAM ontology, an adopted framework for annotating bioinformatics operations, data types, and topics. This ensures consistent categorization and better interoperability with other platforms. Additionally, Galaxy supports cross-referencing (xref), enabling metadata to link related resources, tools, and workflows. These practices enhance the discoverability of resources by providing structured, standardized context for researchers to locate and use data efficiently.

### Zenodo for Workflow Preservation

Galaxy workflows can be published and preserved on platforms like Zenodo, which assigns Digital Object Identifiers (DOIs) to workflows and datasets. These DOIs ensure that workflows are uniquely identifiable and persistently accessible, enhancing their discoverability in both academic and public domains.

# Conclusion

Galaxy’s comprehensive approach to the Findability principle of FAIR ensures that tools, workflows, and datasets are organized, indexed, and described in ways that maximize their accessibility and long-term value. By integrating Persistent Identifiers, RO-Crate metadata, searchable repositories, WorkflowHub, and community standards, Galaxy establishes itself as a robust platform for advancing open and reproducible science. Through these efforts, Galaxy empowers researchers to locate, utilize, and share scientific resources effectively, fostering a collaborative and transparent research ecosystem.

