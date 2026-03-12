---
title: Galaxy and Accessibility
highlight: true
---

Galaxy as both a project and a platform facilitates FAIR research, addressing common needs, invoking available standards and contributing to several upstream projects. 

<div class="float-right" style="max-width: 200px"><img src="/images/logos/ELIXIR_RIR_Logo.png" alt="ELIXIR RIR logo"/></div>
<br />

Galaxy embodies the FAIR “A” principle (Accessibility) by providing an open, inclusive, and technically robust platform that ensures research tools, workflows, and data are available, usable, and adaptable to a diverse global user base. Accessibility in Galaxy is not limited to technical access, it encompasses open-source design, flexible authentication, multi-modal interfaces, distributed computing, and data integration with standard repositories and cloud infrastructures.
Galaxy’s architecture is based on community-driven initiatives and integration with global standards and services. This page highlights how this architecture allows to lower barriers to entry for researchers, educators, and data stewards, regardless of their technical expertise or institutional affiliation.

# Resource Facilitation for Accessible Research
## Galaxy as an Open and Adaptable Platform

Galaxy is designed to be accessible by default, offering multiple entry points and interfaces to accommodate users with varying levels of technical skill. The platform’s open-source nature ensures transparency, customisability, and community-driven innovation. Its architecture allows for deployment in diverse contexts, from public servers to private, and institution-specific instances.
Key features enabling accessibility include:
- **Open-source design:** Galaxy’s codebase is publicly available (https://github.com/galaxyproject), allowing anyone to deploy, modify, or extend the platform.
- **Subdomains and Labs:** Galaxy supports community-specific subdomains (e.g., for genomics, earth system science, or ecology) and Galaxy Labs for specialised scientific fields.
- **Multi-lingual and multi-interface support:** Users can interact with Galaxy via web interfaces, APIs, or interactive environments (e.g., RStudio, Jupyter).

# Scope and User Base

Galaxy’s accessibility features serve a global, multidisciplinary community of researchers, educators, and data managers. The platform’s public instances (e.g., usegalaxy.eu, usegalaxy.org, usegalaxy.org.au) collectively support tens of thousands of users, including:
- Researchers with limited computational expertise, who rely on Galaxy’s intuitive interfaces.
- Data scientists, who leverage Galaxy’s distributed computing and API-driven automation.
- Educators and trainees, who use Galaxy’s training materials (e.g., via the Galaxy Training Network (GTN)) to onboard new users.

Galaxy’s accessibility is further enhanced by its integration with federated identity providers, ensuring secure and easy access for users worldwide.

# Data Accessibility: Connecting to Global Repositories
## Flexible Data Sources and Destinations

Galaxy provides comprehensive support for accessing and exporting data from/to a wide range of standard repositories and cloud storage solutions. This ensures that users can retrieve, analyse, and share data without being constrained by local storage or institutional silos.

**Data Retrieval: Supported Protocols and Repositories**

Galaxy’s file-sources and object stores enable access to:
- Standard data repositories:
  - Zenodo, Invenio, Dataverse, Nextcloud, OpenCloud.
  - S3, FTP, WebDAV, iRODS, OneData.
  All available repositories are findable here: https://training.galaxyproject.org/training-material/faqs/galaxy/manage_your_repositories.html

- Domain-specific repositories (via API):
  - Copernicus (climate/earth observation), ENA (nucleotides), NCBI, UniProt, Ensembl, BioMart, AquaINFRA (aquatic sciences).
  
**Data Export: Sharing and Archiving**

Users can export data to:
- Standard repositories (e.g., ENA for nucleotide sequences).
- Writable file sources (e.g., FTP, S3, WebDAV).

**Object Stores: Scalable and User-Owned Storage**

Galaxy’s object stores allow for flexible storage solutions:
- Institution-funded storage (e.g., de.NBI-cloud for European users).
- User-owned storage (e.g., AWS, GCS, S3, iRODS), which can be integrated into Galaxy instances.

# Tool Accessibility: Usable, Annotated, and Validated
## A Rich Ecosystem of Accessible Tools

Galaxy hosts thousands of tools, each designed to be accessible, documented, and easy to use:
- Graphical and programmatic access: tools can be accessed via Galaxy’s web interface or API, supporting both manual and automated workflows.
- Interactive environments: users can launch RStudio, Jupyter, and other interactive tools directly within Galaxy.
- Extensive annotations: tools are enriched with metadata, including:
  - EDAM ontology for semantic categorisation.
  - DOIs for citation and traceability.
  - Dedicated help sections and parameter validation to prevent user errors.

## Authentication and Security: Federated and Flexible

Galaxy supports diverse authentication methods to ensure secure and inclusive access:
- Public account creation: Anyone can create an account on public Galaxy servers using simple username/password or federated identity providers (e.g., EGI Check-in, EOSC AAI, and LS login).
- Federated identity management: Galaxy’s authentication subsystem supports LDAP, PAM, OIDC, and other protocols, enabling integration with institutional or national identity providers.

# Programmatic Accessibility: APIs and Distributed Computing
## OpenAPI-Based Integration

Galaxy’s comprehensive API (based on the OpenAPI standard) enables programmatic access to all platform features, supporting:
- Automation of workflows and data analysis.
- Integration with external portals, services, and scripts.
- Custom interfaces: The API powers Galaxy’s web interface and can be used to build alternative frontends or specialised tools.

## Distributed Computing with Pulsar

Galaxy’s use of Pulsar, a lightweight distributed job execution application, extends its accessibility by:
- Enabling workflows to run on remote resources, including HPC clusters and cloud infrastructures.
- Supporting scalable, high-performance computing for resource-intensive analyses.

# Community Support and Training
## Onboarding and Help Channels

Galaxy’s accessibility is reinforced by community support and training resources:
- [Galaxy Training Network (GTN)](https://training.galaxyproject.org): provides interactive tutorials and FAIR training materials to help users get started.
- Help channels: users can access support via:
    - Matrix chat (e.g., [#galaxyproject:matrix.org](https://matrix.to/#/#galaxyproject:matrix.org)).
    - Help boards (e.g., [help.galaxyproject.org](https://help.galaxyproject.org)).
    - Dedicated documentation and video tutorials.

## Outreach and Inclusivity

Galaxy’s global community actively promotes accessibility through:
- Multilingual resources and localised instances.
- Outreach events and workshops to onboard new users.
- Collaborations with initiatives like ELIXIR, EOSC, and national networks to ensure Galaxy remains open and inclusive.

# Conclusion: Accessibility as a Catalyst for Open Science

Galaxy’s commitment to accessibility ensures that researchers of all backgrounds can discover, use, and contribute to the platform’s rich ecosystem of tools, workflows, and data. By combining open-source design, flexible authorisation and authentication, distributed computing, and community support, Galaxy lowers the barriers to FAIR, reproducible, and collaborative science.

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
