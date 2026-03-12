---
title: Galaxy and Findability
tease: | 
    Galaxy combines human-friendly interfaces with machine-readable metadata, standard APIs, portable tool execution,
    and community training. That makes FAIR usable both for researchers working interactively and for systems integrating
    Galaxy programmatically across larger digital research ecosystems.
---

Galaxy is an open-source platform for scientific data analysis and sharing. It operationalises the FAIR “F” principle (Findability) through a combination of technical, organisational, and community-driven measures. These ensure that tools, workflows, datasets, and other research objects are easy to find and access by users and machines.
This page highlights Galaxy’s findability mechanisms, their alignment with Research Data Management (RDM) principles, and their integration with interoperability frameworks such as those promoted by ELIXIR, GA4GH, and EOSC.

# Resource Facilitation for Scientific Research

## Galaxy as a Findable Research Platform

Galaxy is designed to make scientific data analysis transparent, reproducible, and reusable. By embedding findability into its core architecture, Galaxy ensures that research objects — including tools, workflows, datasets, electronic lab books, results, and visualisations — are identifiable, described, and programmatically accessible. This approach supports researchers in locating, citing, and reusing resources, while capturing all provenance information for full traceability.

Galaxy’s findability features are very useful for non-technical users.  They can use search interfaces, structured metadata, and integration with external registries. The platform follows community standards (e.g., EDAM ontology, GA4GH DRS, RO-Crate) and contributes actively to upstream projects like WorkflowHub, Dockstore, bio.tools, Research Software Ecosystem and ELIXIR registries.

# Scope and User Base

Galaxy’s findability mechanisms serve a diverse and global user base across the usegalaxy.* instances (US, EU, AU), which collectively support tens of thousands of registered users. These users come from multiple scientific domains, such as omics and climate science and include researchers, educators and data stewards. Many users lack a background in data-intensive methodologies but rely on Galaxy to develop, share, and execute workflows at scale.

To support this community, Galaxy provides:

- Persistent and unique identifiers for all research objects.
- Structured and machine-readable metadata for tools, workflows, and datasets.
- Versioning and provenance tracking to ensure temporal traceability.
- Programmatic access via a comprehensive API, enabling integration with external portals and services.
  
Galaxy’s findability features are further improved by initiatives such as the Galaxy Training Network (GTN), which offers training materials to help users leverage the platform’s discovery capabilities.


# Persistent and Unique Identifiers
## Multi-Level Identifier Assignment

Galaxy implements persistent and unique identifiers at every level of its architecture, ensuring traceability, reproducibility, and citation readiness:

| Object Type       | Identifier Mechanism                                                                | Purpose                                                                                     |
|-------------------|-------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| Tools             | Stable, versioned tool IDs                                                          | Enable precise tool citation and version tracking.                                          |
| Workflows         | Resolvable identifiers via WorkflowHub, Dockstore, and internal Galaxy IDs          | Support workflow sharing, discovery, and reuse.                                             |
| Datasets          | GA4GH DRS identifiers for externally stored data; internal Galaxy dataset IDs       | Facilitate dataset referencing and interoperability with external systems.                  |
| Histories, Jobs   | Unique internal Galaxy IDs                                                          | Ensure traceability of all analysis steps and outputs.                                      |

These identifier mechanisms are aligned with RDM best practices and enable Galaxy to function as a FAIR-compliant research infrastructure.

# Rich and Structured Metadata
## Metadata as the Backbone of Findability

Galaxy enforces the use of structured standardised metadata to enhance the discoverability of research objects by both humans and machines:

- Tools:
  - Annotated with the EDAM ontology for semantic grouping and domain-specific discovery.
  - Metadata includes version, parameters, dependencies, citations, and container information.
- Workflows:
  - Descriptive metadata (title, abstract, creator, tags) and version histories.
  - Versioning allows users to discover and reference specific revisions.
- Datasets:
  - Strongly typed datatypes ensure compatibility with tools accepting specific formats.
  - Dataset collections act as structured, queryable entities.
- Provenance:
  - Records connect datasets to the exact workflow and tool configuration used to generate them.
  - Metadata in Galaxy is not only stored but also machine-retrievable via the Galaxy API, ensuring compliance with machine-actionable FAIR requirements.

# Search and Discovery Mechanisms
## Multi-Layered Discovery

Galaxy provides multiple layers of discovery to cater to diverse user needs, ensuring that tools, workflows, and datasets are easily accessible — whether through intuitive interfaces, structured metadata, or integration with external registries.

**User Interface**
- Simple and advanced search within the Galaxy interface.
- Ontology-based grouping of tools (e.g., via EDAM).

**Extensive Tool Search Capabilities**
Galaxy offers advanced search functionalities to help users to quickly locate the tools they need. Users can:
- Search by datatype: Find tools compatible with specific data formats (e.g., FASTQ, BAM, NetCDF), ensuring integration into workflows.
- Search in help texts and documentation: Locate tools based on keywords in their descriptions, parameters, or help sections, making it easier to discover domain-specific functionalities.
- Explore tools from training materials: Directly access tools used in Galaxy Training Network (GTN) tutorials, enabling users to replicate analyses from educational resources or discover best-practice workflows.
- Link to relevant training: From tool pages or search results, users can navigate to GTN training materials that demonstrate tool usage, fostering both discovery and skill development.

**External Registries:**
- Tool distribution via the Galaxy ToolShed (“AppStore” model).
- Public workflows are discoverable through WorkflowHub and curated by the Intergalactic Workflow Commission (IWC).

**Interoperability Catalogues:**
- Registration of Galaxy resources in ELIXIR registries, Sextant, and other global discovery infrastructures.

These mechanisms — from search interfaces to tool discovery and integration with global registries — ensure that Galaxy’s research assets remain findable, reusable, and accessible across institutional, disciplinary, and geographic boundaries. By combining technical infrastructure, structured metadata, and educational resources, Galaxy empowers users to locate and leverage the tools and workflows they need for their research.

# Programmatic Findability and API Access
## API-Driven Discovery

Galaxy’s comprehensive API enables programmatic discovery of tools, workflows, and datasets, supporting:
- Machine-readable access to structured metadata.
- Integration with external portals and services (e.g., EOSC, ELIXIR).
- Automated harvesting and federation of research objects.
This API-driven design ensures that Galaxy resources are fully discoverable within interoperable digital research ecosystems, aligning with the platform’s role as a Recommended Interoperability Resource (RIR) for ELIXIR.

# Research Data Management Perspective
## Findability as an RDM Principle

From an RDM standpoint, Galaxy embeds findability into the lifecycle of computational research:
- Persistent identifiers enable citation, tracking, and long-term accessibility.
- Structured metadata supports machine indexing and semantic discoverability.
- Versioning ensures traceable evolution of analyses.
- API access enables automated harvesting and federation with other platforms.
  
Galaxy’s approach to findability is not an afterthought but a core architectural principle, operationalised through:
- Integration with community standards (e.g., EDAM, GA4GH DRS, RO-Crate).
- Collaboration with ELIXIR, EOSC, and other interoperability initiatives.
- Active contribution to upstream projects (e.g., WorkflowHub, Dockstore).

# Conclusion: Findability as a Pillar of FAIR Research
Galaxy’s implementation of findability is holistic, integrating infrastructure, community standards, and interoperability frameworks. By ensuring that research objects are persistently identifiable, richly described, and programmatically accessible, Galaxy empowers researchers to conduct FAIR-compliant, reproducible, and collaborative science.

# Legal framework, funding, and governance 

## Legal framework

Galaxy is available under a small range of licenses:
* Web contents of usegalaxy.eu are published as Creative Commons Zero v1.0 (CC0-v1.)
* The [codebase](https://github.com/galaxyproject/galaxy) is licensed under the MIT License
* Further details of underlying licenses: https://github.com/galaxyproject/galaxy/blob/dev/LICENSE.txt 
* Every single tool (currently ~3000) has its own license, which is annotated as part of its conda package or container.

## Privacy/Ethics policy

The Galaxy framework has a GDPR configuration option, which will make sure that a deployed instance is GDPR-compliant (to the best of our knowledge). This option is enabled at the European Galaxy server (and related resources). Please read more about it at:
https://usegalaxy-eu.github.io/gdpr/
and
https://docs.galaxyproject.org/en/master/admin/special_topics/gdpr_compliance.html 

Notably, the Galaxy Community is dedicated to provide a harassment-free experience for everyone, thus living a [Code of Conduct](https://galaxyproject.org/community/coc/), outlining the behaviours deemed acceptable and unacceptable.

## Funding & sustainability plan

The Galaxy Project is embedded in national and international funding streams. Notably, these include NIH and NSF (US), ELIXIR, EOSC and BMBF (EU), Bioplatforms and Research Data Commons (AUS). More information on the continental usegalaxy.* instances you find on the bottom of the Galaxy Hub pages, and e.g. [here](https://usegalaxy-eu.github.io/freiburg/projects). However, the Galaxy project is built by many contributors from all over the world, so that the underlying funding is much more diverse and is subject to constant change in detail. This global community is well connected and capable of bridging funding gaps and re-allocating resources by strong vice-versa support.

## Governance

Please read more about the Galaxy governance at: https://galaxyproject.org/community/governance 
and
https://docs.galaxyproject.org/en/master/project/organization.html (code governance). 

The ELIXIR Galaxy Community is the European part of the Galaxy community, similar to the Biocommons in Australia. Scientific communities, national and international communities are coming together to govern the Galaxy project as part of working groups or the steering committee.
