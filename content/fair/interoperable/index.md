---
title: Galaxy is FAIR
highlight: true
---

Galaxy as both a project and a platform facilitates FAIR research, addressing common needs, invoking available standards and contributing to several upstream projects. 

This page focusses on FAIR's 'I' component, so highlighting interoperability measures, pointing to respective implementations and answering a range of questions around the topic. Contents have been generated from [Galaxy Europe's successful evaluation](/news/2023-12-14-ELIXIR-RIR-for-Galaxy-Europe/) of being an [ELIXIR 'Recommended Interoperability Resource' (RIR)](https://elixir-europe.org/platforms/interoperability/rirs), for which central considerations have been addressed. Both asked questions and their answers should be shared here with the community, hopefully serving as references for future needs. 

## Resource facilitation to scientific research

### Brief description of the **function** of Galaxy as an interoperability resource

Galaxy is an interoperable open-source platform for scientific data analysis and sharing, covering diverse research fields such as *omics, machine learning, and climate science. The platform emphasises transparency, reproducibility, and reusability, facilitating sharing of tools, workflows, visualisations, and data, while capturing all provenance information. Galaxy also offers strong research data management tools, covering data import, organisation, annotation, sharing and export. With the aim of accelerating scientific discovery and innovation, the platform encourages researchers to share their data and analysis workflows with the wider scientific community. Galaxy provides a borderless and efficient approach to support non-technical users in effective research.

### Describe the **scope**, and the users of the resource. How is Galaxy positioned with respect to other similar interoperability resources?

The usegalaxy.* servers (in the US, EU, AUS) have an extensive user base each of tens of thousands of registered users, adding a few thousand new users every month. These users come from different scientific fields and are majorly non-technical scientists, who intend to answer research questions using data science methods. The majority of users is interested in analysing own data in the context of publicly available reference resources and data collections. Their main goal is to develop workflows of tools and to apply them on a large scale. According to this user profile, the Galaxy Training Network (GTN, https://training.galaxyproject.org) has developed broad and interactive high-quality training materials, being deeply rooted in both Galaxy’s community and technical infrastructure.

Usegalaxy.eu has been developed as a European Galaxy project by multiple ELIXIR partners as well as individuals from all over Europe. It is positioned as a flagship project of the German Network of Bioinformatics infrastructure (de.NBI) and part of multiple national projects. It is one of the biggest ELIXIR services and the preferred gateway for scientific computing of multiple European Open Science Cloud (EOSC) projects. Usegalaxy.eu focuses on providing a platform for analysing and sharing scientific data rather than developing standards. In other words, the European Galaxy project progressively integrates concepts, standardisations, tools, APIs and concepts developed by related initiatives in order to bring them to application in users’ analyses and increase the overall level of practised interoperability.

Base URLs (home pages): https://usegalaxy.org, https://usegalaxy.eu, https://usegalaxy.org.au

Introductory page URL: https://galaxyproject.org

### Does Galaxy have a community **recognition**? What about inter-organisational collaborations, geographical diversity in the source of the submissions, international diversity of delivery partners and/or funders?

Recognition of Galaxy is broad and observed across multiple communities. Galaxy as a platform originates from the US (usegalaxy.org) and has been developed by a worldwide community since its initial release in 2005. [The Galaxy community](https://galaxyproject.org/community/) is traditionally open, welcoming, diverse and highly active. With Galaxy Europe and Galaxy Australia another two major instances have been founded, complemented with multiple national ones, several of them located in Europe.

#### Galaxy Main

#### Galaxy Europe
For example on usegalaxy.eu, more than 83,000 users are registered, every month another 1000 new users join. Here, >1 million computational jobs are launched per month, as well as ~180,000 workflows runs, and >100,000,000 datasets are aggregated to date. Galaxy Europe reaches users from 100+ countries and is used by companies, universities, publicly funded independent research institutions and citizen science projects. 

The European Galaxy server is one of the largest ELIXIR services and part of several past and running implementation Studies (IS). For multiple EOSC projects, usegalaxy.eu is the preferred gateway for scientific computing, making it an ideal resource for researchers from a broad range of scientific fields. As a European resource, we address users from all over Europe, but also attract researchers from a global scope. Moreover, in the EOSC project ‘[EuroScienceGateway](https://galaxyproject.org/projects/esg/)’, started in September 2022, a central mission is to link usegalaxy.eu with 12+ national endpoints of the [Pulsar compute network](https://pulsar-network.readthedocs.io/en/latest/) for improved job re-distribution across Europe.
Analogously, the team behind usegalaxy.eu builds from a number of groups and individuals, distributed all over Europe and of broad international backgrounds. 

#### Galaxy Australia

## Community

### Documented evidence of **community impact**

Galaxy serves many different communities (not only in life science), by providing the computational infrastructure, Galaxy training courses, and training material. For many communities we offer [specific Galaxy sub-domains]( https://usegalaxy-eu.github.io/posts/2020/12/28/subdomains) with individual entry pages and dedicated tools for community-specific research. Community members are using the Galaxy servers for their data analysis and report their application to other Galaxy users (“use cases”). These use cases are [published on our homepage](https://usegalaxy-eu.github.io/news?tag=UseCase) to support visibility of their work. 

Measuring impact is hard. In the following we will state a few resources and numbers that we have been able to track semi-automatically over time.

#### Citations

[To our knowledge](https://galaxyproject.org/#publications--citations), the Galaxy platform is cited more than 11,000 times ([Zotero](https://www.zotero.org/groups/1732893/galaxy/)). Publications that explicitly mention usegalaxy.eu as a resource can be accessed at https://usegalaxy-eu.github.io/citations. A means to assess the impact of Galaxy on training are shown in the [TIaaS](https://usegalaxy.eu/tiaas/) statistics that we gather at https://usegalaxy.eu/tiaas/stats. 14,000 trainees is the lower bound, since we can only track the officially registered training events.

#### Potential usage

Compared to several other ELIXIR (but also EOSC) resources, Galaxy servers are to be considered as downstream resources. Researchers are directly interfacing with Galaxy in various ways. Galaxy integrated community standards and adopts useful protocols and services ([GA4GH](/ga4gh/), [EDAM](https://edamontology.org/page), S3, [WebDAV](/news/2021-07-04-nextcloud-support/), [bio.tools](https://bio.tools), [OpenEBench](https://openebench.bsc.es), SPDX, OCI, [TeSS](https://tess.elixir-europe.org), [Beacon](/news/2023-01-beacon-integration/), [WorkflowHub](https://workflowhub.eu), [Identifiers.org](https://identifiers.org), [RO-Crate](https://www.researchobject.org/ro-crate/), [BCO](/news/2023-02-23-structured-data-exports-ro-bco/#export-invocation-to-biocompute-object), [RDMkit](https://rdmkit.elixir-europe.org), ...) to make data analysis more efficient. 

Systems that interface with Galaxy, such as [Intermine](https://galaxyproject.org/news/2019-09-intermine/), are using [Galaxy’s powerful API (OpenAPI)](https://usegalaxy-eu.github.io/posts/2022/08/05/galaxy-open-api/) to integrate various functionality and taking advantage from its strengths in workflow application, resource aggregation and reproducibility. That means that all systems that are able to interface with an OpenAPI-based system to run tools (for example the tools in [Expasy](https://www.expasy.org)), workflows, retrieving and publishing data, could use Galaxy. 

#### Outreach & support

In the following, we list some publications, e.g. in scientific journals, but also documentation resources, describing Galaxy:

* User/community main entry point: https://galaxyproject.org/eu/ 
* Help board: http://help.galaxyproject.org
* Selected scientific journal publications:
    * Gruning, B.A. *et al.* (2017) Jupyter and Galaxy: Easing entry barriers into complex data analyses for biomedical researchers. PLoS Comput Biol, 13, e1005425.
    * Bray, S.A. *et al.* (2020) The ChemicalToolbox: reproducible, user-friendly cheminformatics analysis on the Galaxy platform. Journal of Cheminformatics, 12.
    * Serrano-Solano, B. *et al.* (2021) Fostering accessible online education using Galaxy as an e-learning platform. PLOS Computational Biology, 17, 1–10.
    * The Galaxy Community (2022) The Galaxy platform for accessible, reproducible and collaborative biomedical analyses: 2022 update. Nucleic Acids Research, Volume 50, Issue W1, 5 July 2022, Pages W345–W351
    * (more at e.g. https://usegalaxy-eu.github.io/freiburg/publications.html)
* Beyond conference contributions, dissemination is mainly carried out via events: https://galaxyproject.org/events/ 
* Dedicated branding material is available [here](https://drive.google.com/drive/folders/0BycJJtbagAMTfnBuUy1xZDhMbjc4Qk5yMElWaER2QXRsV2tkSHU0V0xHdmJ5RDdDaVRQRGs) (general) and [here](https://github.com/usegalaxy-eu/branding) (EU)

#### Dependency of other resources

Usegalaxy.* instances are in fact critical for a large number of users. As indicated above, Galaxy is used by tens of thousands of users, which need Galaxy and the underlying resources to conduct their research. TIaaS, the Training Infrastructure as a Service, enabled 14,000 people to be trained in data analysis. All those trainers and TIaaS on its own (including GTN) depend on Galaxy as a service.

Another aspect is that the Galaxy servers are used in several projects with global impact that would lose a fundamental resource and infrastructure without Galaxy. In this context, we would like to mention the [global monitoring of SARS-CoV2](https://galaxyproject.org/projects/covid19/) and [Galaxy pipelines](https://www.biorxiv.org/content/10.1101/2023.06.28.546576v1) for the global assembly projects like e.g. [VGP](https://galaxyproject.org/projects/vgp/), [ERGA](https://www.earthbiogenome.org) or [BGE](https://biodiversitygenomics.eu).

## Quality of resource 

### Operational quality

#### Uptime

Uptimes and the general status of the service is tracked at  https://status.galaxyproject.org. We announce maintenance breaks depending on the duration according to our Terms of Use ([US](https://usegalaxy.org/static/terms.html), [EU](https://usegalaxy.eu/terms), [AUS](https://site.usegalaxy.org.au/about#terms-of-service)). The useGalaxy.* instances focus on being a stable and reliable services; the infrastructure underlying the European Galaxy server is ISO 27001 certified.

#### Accessibility

Galaxy’s user-friendly web UI bridges the gap between command line tools used in data-intensive science and non-technical researchers. The web-interface is communicating with a comprehensive API (Galaxy backend), which is [OpenAPI-based](https://usegalaxy.eu/api/docs) and independent of the website. Other services, especially automated data analysis procedures (e.g. via Bots), can use the API, re-using all of Galaxy’s features. The Galaxy project maintains numerous different language bindings to this API. The most prominent is [BioBlend](https://bioblend.readthedocs.io/en/latest/api_docs/galaxy/all.html), Galaxy’s well-documented [Python binding](https://galaxyproject.org/develop/api/). 

[Container technologies](https://github.com/bgruening/docker-galaxy-stable) have been adopted quite [early](https://depot.galaxyproject.org/hub/attachments/documents/presentations/gcc2014/Hackathon.pdf), resulting in portable Galaxy versions and flavours. Additionally, there is the possibility to call containerized tools and [Interactive Environments (IEs)](https://training.galaxyproject.org/training-material/topics/dev/tutorials/interactive-environments/slides-plain.html) on the backend side. Moreover, Galaxy and ELIXIR are major partners in the [Biocontainers](https://biocontainers.pro) initiative.

The European Galaxy server is deployed following an OpenInfrastructure concept, enabling the deployment of usegalaxy.eu clones on other infrastructures, e.g. as national instances in Europe. OpenInfrastructure describes a way to define infrastructure as code and share this code under an open source license.

#### Maintenance quality

Galaxy comes with a [constant release cycle](https://docs.galaxyproject.org/en/master/releases/index.html) and each release is accompanied by a [release testing team](https://docs.galaxyproject.org/en/master/releases/23.0_announce_user.html#release-testing-team). In addition, [Galaxy is running thousands of tests](https://docs.galaxyproject.org/en/master/dev/writing_tests.html) (unit tests, API tests, framework tests, E2E tests, client tests).

[Contributing and coding style guides](https://github.com/galaxyproject/galaxy/blob/dev/CONTRIBUTING.md) further promote the high quality level. The [Galaxy Training Network (GTN)](https://training.galaxyproject.org) and in particular the [Galaxy Admin Training](https://training.galaxyproject.org/training-material/topics/admin/) are a major pillar in capacity building to ensure high maintenance quality.

#### Support quality

The Galaxy community is principally open, communicative, responsive and accessible via various channels. Beyond classical mailing lists, users find help at https://help.galaxyproject.org; the current main communication channel is on the decentral message network Matrix (https://matrix.to/#/#galaxyproject:matrix.org). Notably, one full position each at the US, EU, and Australia instances is dedicated to community building and support. For less interactive information distribution Mastodon ([Galaxy](https://mstdn.science/@galaxyproject), [GTN](https://mstdn.science/@gtn)) and Twitter/X are in use, invoking dedicated hashtags. Presence on [LinkedIn](https://www.linkedin.com/groups/4907635) is also given.

GitHub as the [repository platform for Galaxy’s code](https://github.com/galaxyproject/galaxy) is a central exchange point for developers at any level of experience, by relying on the built-in tools for interaction and contributions (issues, pull requests, ...). The reaction time is commonly fast, mostly below 24h and in practice help is voluntarily provided also outside business hours and on weekends or holidays; this is partly due to the international scope of the community across time zones. 

Recently, a lightweight questionnaire for user feedback has been integrated into Galaxy Europe’s web interface, being presented occasionally when using tools.

In terms of tutorials and training, videos (screen casts) are available on Youtube, but majorly educative resources are generated and presented with the [Galaxy Training Network (GTN)](https://training.galaxyproject.org), which is web-based and uses Galaxy itself as technical backend and interactive user interface. Galaxy and GTN support Bioschemas annotation to enhance the findability of different assets, with GTN even providing a [dedicated tutorial](https://training.galaxyproject.org/training-material/topics/contributing/tutorials/fair-gtn/tutorial.html) on how to generate FAIR training materials.

## Legal framework, funding, and governance 

### Legal framework

Galaxy is available under a small range of licenses:
* Web contents of usegalaxy.eu are published as Creative Commons Zero v1.0 (CC0-v1.)
* Work on the [codebase](https://github.com/galaxyproject/galaxy) contributed from 2021-04-07 onwards is licensed under the MIT License
* Work on the [codebase](https://github.com/galaxyproject/galaxy) contributed before 2021-04-07 is licensed under the Academic Free License, v3.0
* Further details of underlying licenses: https://github.com/galaxyproject/galaxy/blob/dev/LICENSE.txt 
* Every single tool (currently ~3000) has its own license, which is annotated as part of its conda package or container.

### Privacy/Ethics policy

The Galaxy framework has a GDPR configuration option, which will make sure that a deployed instance is GDPR-compliant (to the best of our knowledge). This option is enabled at the European Galaxy server (and related resources). Please read more about it at:
https://usegalaxy-eu.github.io/gdpr/
and
https://docs.galaxyproject.org/en/master/admin/special_topics/gdpr_compliance.html 

### Funding & sustainability plan

The European Galaxy project is embedded in national and international funding streams. Notebly, this is the German ELIXIR Node and EU funding like EOSC-related projects. More information, specifically for the German partners, can be accessed at https://usegalaxy-eu.github.io/freiburg/projects. However, the European Galaxy project is built by many contributors across Europe and the world and the underlying funding is much more diverse. 

In other words, Galaxy is a world-wide project that is supported by diverse regional, national and international fundings. The global community is well connected and capable of bridging funding gaps and re-allocating resources by strong vice-versa support.

### Governance

The European Galaxy project is part of the worldwide Galaxy Project and its governance structure. Please read more about the Galaxy governance at: https://galaxyproject.org/community/governance 
and
https://docs.galaxyproject.org/en/master/project/organization.html (code governance). 

The ELIXIR Galaxy Community is the European part of the Galaxy community, similar to the Biocommons in Australia. Scientific communities, national and international communities are coming together to govern the Galaxy project as part of working groups or the steering committee.
