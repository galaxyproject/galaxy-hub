---
title: Galaxy and Reusability
highlight: true
---

Galaxy as both a project and a platform facilitates FAIR research, addressing common needs, invoking available standards and contributing to several upstream projects. 

<div class="float-right" style="max-width: 200px"><img src="/images/logos/ELIXIR_RIR_Logo.png" alt="ELIXIR RIR logo"/></div>
<br />

Galaxy operationalises the FAIR “R” principle (Reusability) by providing technical, organisational, and community-driven mechanisms that ensure research objects, such as tools, workflows, histories, and visualisations, can be shared, reproduced, and adapted across diverse scientific contexts. Reusability in Galaxy is about preserving provenance, resolving dependencies, and enabling long-term reproducibility, all while adhering to open standards and best practices in Research Data Management (RDM).
Galaxy’s architecture relies on container technologies, provenance tracking, and community-driven quality assurance frameworks. This architecture fosters a culture of reusable, high-quality, and sustainable research.

# Resource Facilitation for Reusable Research
## Galaxy as a Platform for Reproducible Science

Galaxy is designed to lower the barriers to reproducible and reusable data analysis as described in the paper [Practical Computational Reproducibility in the Life Sciences](https://doi.org/10.1016/j.cels.2018.03.014) . By capturing the full context of computational research, Galaxy ensures that analyses can be rerun, shared, and adapted with minimal difficulties. This is achieved through:
- Dependency resolution via containerisation with technologies such as Conda, Docker, Singularity. Indeed, the tight integration with Biocontainers, for example, ensures that tools and workflows are portable and executable across different infrastructures.
- Comprehensive provenance tracking, which records every parameter, input, tool version, and container used in an analysis.
- Long-term access to tool versions: Galaxy preserves all versions of tools, which ensures that even older versions remain accessible to users years after their release. This guarantees that old analyses can always be reproduced exactly as they were originally designed.
- Easy re-execution of tools: users can rerun tools and workflows with a single click using the reload button, even for analyses done months or years earlier. This feature with the preserved tool versions and complete provenance records ones, makes Galaxy a robust platform for long-term reproducibility.

All of this makes Galaxy a trusted platform for researchers who need to ensure that their work is ready for reuse by others.

# Scope and User Base 
Galaxy’s reusability features serve a global, multidisciplinary community of researchers, educators, and data stewards. The platform’s usegalaxy.* instances (US, EU, AU) support tens of thousands of users, many of whom rely on Galaxy to develop, share, and reuse workflows and datasets in scientific domains going from genomics to climate science.

## Capturing and Leveraging Provenance: the backbone of reusability

Galaxy automatically captures comprehensive provenance for every analysis, including:
- Tool versions, parameters, and inputs.
- Container or environment used.
- Exact workflow steps and intermediate datasets.

Key user needs addressed by Galaxy’s reusability features include:
- Sharing analyses with collaborators or the broader scientific community.
- Reproducing results for validation, publication, or further analysis.
- Adapting existing workflows to new datasets or research questions.
- Ensuring long-term accessibility of research objects through standardised exports and imports.

To support these needs, the provenance in Galaxy is actionable and provides:
- Sharing permissions for histories, datasets, visualisations, and workflows (e.g., with specific users or globally).
- Reproducibility, enabling users to rerun tools or workflows at any point in their analysis even after a failure.
- Avoiding redundant computations as provenance data powers Galaxy job cache
- Standardised export formats (e.g., RO-Crate, BioComputeObjects) for long-term archiving, sharing, and reuse.

## Export and Import for Long-Term Reuse

Galaxy supports the export and import of entire histories, workflows, and datasets, enabling:
- Archiving in repositories like Zenodo.
- Sharing with collaborators or the public.
- Importing into Galaxy for further analysis or adaptation.

For example, a history exported as an RO-Crate can be imported into Galaxy years later, preserving all metadata, provenance, and data relationships.

# Dependency Resolution and Containerisation
## Ensuring Portability and Reproducibility

Galaxy resolves dependencies and ensures reproducibility through containerisation and environment management:

| Technology    | Role in Galaxy                                                  | Benefit for Reusability                                                  |
|---------------|-----------------------------------------------------------------|--------------------------------------------------------------------------|
| Conda         | Manages tool dependencies and environments.                     | Ensures tools run consistently across different Galaxy instances.        |
| Docker        | Supports containerised tool execution.                          | Enables portability and isolation of tool environments.                  |
| Singularity   | Provides secure, reproducible containers for HPC environments.  | Facilitates reuse in high-performance computing contexts.                |
| Biocontainers | Pre-built, standardised containers for bioinformatics tools.    | Ensures compatibility and reduces setup overhead for users.              |


Galaxy’s integration with Biocontainers is particularly significant, as it allows users to leverage many, community-curated repositories of containerised tools, reducing the manual dependency resolution and enhancing the portability of workflows.

# Quality Assurance and Testing Frameworks
## Ensuring Long-Term Reusability

Galaxy’s commitment to reusability extends to quality assurance and testing frameworks, which ensure that tools and workflows remain functional and reliable over time:

| Framework/Initiative                    | Role                                                                   | Impact on Reusability                                                               |
|-----------------------------------------|------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| Intergalactic Workflow Commission (IWC) | Curates and tests high-quality, reusable workflows.                    | Provides a catalogue of trusted, well-documented workflows for the community.       |
| Planemo                                 | CLI tool for developing, testing, and sharing Galaxy tools/workflows.  | Enables developers to validate and package tools/workflows for reuse.               |
| Galaxy Training Network (GTN)           | Develops interactive training materials on workflow reuse and sharing. | Educates users on best practices for creating and reusing Galaxy resources.         |


These frameworks ensure that Galaxy’s tools and workflows are reusable and reliable, which reduces the risk of errors and enhances trust in shared resources.

# Conclusion: Reusability as a Cornerstone of Open Science

Galaxy’s approach to reusability is comprehensive, integrating technical infrastructure, community standards, and quality assurance frameworks. Indeed, from each analysis a workflow can be extracted in standard formats. This workflow can be registered in WorkflowHub or Similar registries. Later, a workflow file can be imported to Galaxy to reproduce the same analysis or perform a similar analysis. This empowers researchers to build on each other’s work, accelerating scientific discovery and innovation. 

# Legal framework, funding, and governance 

## Legal framework

Galaxy is available under a small range of licenses:
* Web contents of usegalaxy.eu are published as Creative Commons Zero v1.0 (CC0-v1.)
* Work on the [codebase](https://github.com/galaxyproject/galaxy) contributed from 2021-04-07 onwards is licensed under the MIT License
* Work on the [codebase](https://github.com/galaxyproject/galaxy) contributed before 2021-04-07 is licensed under the Academic Free License, v3.0
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
