---
title: Galaxy and the Global Alliance for Genomic Health
highlight: true
---

The goals of the [Global Alliance for Genome Health](https://www.ga4gh.org/) (GA4GH) and the Galaxy Project align well with each other, as both aim to promote the sharing and analysis of genomic data in a streamlined and efficient manner. GA4GH works towards the development of standards and APIs for the exchange of genomic data, while the Galaxy Project provides a user-friendly platform for the analysis of such data. By supporting the APIs developed by GA4GH, the Galaxy Project helps to ensure that genomic data is easily accessible and interoperable, and can be quickly and easily analyzed by researchers and clinicians. This enhances the ability of the genomics community to advance medical research and improve patient care. The collaboration between GA4GH and the Galaxy Project therefore helps to achieve the mutual goal of making genomic data a valuable resource for the benefit of humanity.

The rest of this page highlights specific ways the Galaxy Project is implementing or utilizing the APIs developed by the GA4GH.

## Data Repository Service (DRS) API

The Galaxy Project implements the [GA4GH DRS API](https://www.ga4gh.org/news/drs-api-enabling-cloud-based-data-access-and-retrieval/) as both a producer and consumer, allowing for easy exchange of genomic data between Galaxy and other DRS-compliant systems. This helps to promote interoperability and data sharing among various genomics platforms.

Galaxy's DRS implementation was merged in December of 2022 as part of
[Pull Request 13949](https://github.com/galaxyproject/galaxy/pull/13949).
Information for administrators on configuring and verifying the DRS service (service info, organization name, and service id) can be found in the [GA4GH API Support](https://docs.galaxyproject.org/en/latest/admin/ga4gh.html) section of the Galaxy admin documentation.

## Workflow Execution Service (WES) API

The Galaxy Project implements the [GA4GH Workflow Execution Service (WES) API](https://ga4gh.github.io/workflow-execution-service-schemas/). WES defines a standardized, workflow-engine-agnostic protocol for submitting and monitoring workflow runs. External systems and clients can submit Galaxy workflows, poll their status, retrieve outputs and per-task logs, and cancel runs. All of this happens through the standard WES v1.0.0 wire protocol rather than Galaxy's native API. This makes Galaxy interoperable with the broader ecosystem of WES-aware workflow orchestration and analysis platforms.

Galaxy's WES implementation is built on top of its existing workflow invocation machinery. A WES `run` corresponds to a Galaxy `WorkflowInvocation`, and run outputs are decorated with [DRS](#data-repository-service-drs-api) URIs so a client can hand them straight to the DRS API. The service exposes the standard endpoints under `/ga4gh/wes/v1/`: `service-info`, run submission and listing, run log and status, cancellation, and paginated task logs. A non-standard `gxworkflow://` URL scheme allows a run to reference a workflow already stored in Galaxy, instead of re-uploading the workflow body on every submission.

The WES API was implemented in [Pull Request #21335](https://github.com/galaxyproject/galaxy/pull/21335) and first released with Galaxy 26.0. A client/developer walkthrough of submitting and monitoring runs over the WES API (including curl examples, state mapping, and engine parameters) is available in [Developing Against the GA4GH WES API](https://docs.galaxyproject.org/en/latest/dev/ga4gh_wes.html), and administrator configuration is covered in the [GA4GH API Support](https://docs.galaxyproject.org/en/latest/admin/ga4gh.html) section of the admin docs.

## Beacon API

The European Galaxy server [usegalaxy.eu](https://usegalaxy.eu/) implements the [Beacon API](https://beacon-project.io/), which allows for the discovery of genomic data and enables researchers to determine whether a particular variant is present in a specific dataset. This helps to promote the sharing and reuse of genomic data among researchers and clinicians.

More information about Beacon and Galaxy can be found in this
[Galaxy News Item](https://galaxyproject.org/news/2023-01-beacon-integration/).

## Task Execution Service (TES) API

Galaxy's [Pulsar project](https://pulsar.readthedocs.io/en/latest/) is a flexible service and library for executing Galaxy tools. It is capable of leveraging a [GA4GH Task Execution Service](https://www.ga4gh.org/news/ga4gh-tes-api-bringing-compatibility-to-task-execution-across-hpc-systems-the-cloud-and-beyond/) TES endpoint to efficiently execute large-scale genomic analyses. By integrating with a GA4GH TES service, Pulsar can take advantage of the standardized and interoperable APIs provided by GA4GH to execute tasks. The integration of Pulsar with GA4GH TES also helps to promote interoperability among genomics platforms and services, making it easier for researchers and clinicians to conduct comprehensive genomic analyses and advance medical research.

More information about running Galaxy jobs via TES using Pulsar can be found in [the Pulsar documentation](https://pulsar.readthedocs.io/en/latest/containers.html#ga4gh-tes). The client-side TES support in Pulsar was implemented as part of [Pull Request #302](https://github.com/galaxyproject/pulsar/pull/302).

On the server side, the [TESP-API](https://github.com/CESNET/tesp-api) microservice implements the GA4GH TES standard and acts as a bridge between Galaxy, Pulsar, and the wider TES ecosystem, translating TES-compliant job submissions into Pulsar tasks. This allows Galaxy and other TES clients to submit jobs to remote compute resources in a standardized way. Read more about TESP-API in the [TESP-API announcement](/news/2025-10-06-tesp-api/).

## Tool Registry Service (TRS) API

The TRS API allows for the easy sharing and distribution of workflows among the genomics community. The Galaxy Project uses the TRS API extensively for accessing publicly available workflows, making it easy for users to access and run pre-existing workflows for a wide range of analyses. 

[Dockstore](https://dockstore.org/) is a platform that allows for the sharing and distribution of tools and workflows in the genomics community and implements in the TRS API. Galaxy leverages the TRS API to integrate with Dockstore and access the tools and workflows stored on the platform. This allows Galaxy users to easily find and use workflows and tools that have been developed and shared by the genomics community. Galaxy and Dockstore developers have worked closely together for years as part of the [Anvil Project](https://anvilproject.org/). The list of Galaxy workflows available on Dockstore can be [found here](https://dockstore.org/search?descriptorType=gxformat2&entryType=workflows&searchMode=files).

[WorkflowHub](https://workflowhub.eu/) is "a registry for describing, sharing and publishing scientific computational workflows" that likewise implements the TRS API. The list of Galaxy workflows available
on WorkflowHub can be [found here](https://workflowhub.eu/workflows?filter%5Bworkflow_type%5D=galaxy).

Dockstore and WorkflowHub workflows can be searched and imported to usegalaxy* public servers and Galaxy admins can easily enable this feature on any Galaxy server. More information on accessing these workflows from inside the Galaxy user interface can be found in the relevant [Galaxy Training Network tutorial](https://training.galaxyproject.org/training-material/topics/galaxy-interface/tutorials/galaxy-on-dockstore/slides-plain.html).

Information on publishing Galaxy workflows to Dockstore and WorkflowHub can be found as part of [the Planemo docs best practices for workflows](https://planemo.readthedocs.io/en/stable/best_practices_workflows.html#dockstore).
