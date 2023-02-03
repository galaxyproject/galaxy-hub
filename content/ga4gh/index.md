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

## Beacon API

The European Galaxy server [usegalaxy.eu](https://usegalaxy.eu/) implements the [Beacon API](https://beacon-project.io/), which allows for the discovery of genomic data and enables researchers to determine whether a particular variant is present in a specific dataset. This helps to promote the sharing and reuse of genomic data among researchers and clinicians.

More information about Beacon and Galaxy can be found in this
[Galaxy News Item](https://galaxyproject.org/news/2023-01-beacon-integration/).

## Task Execution Service (TES) API

Galaxy's [Pulsar project](https://pulsar.readthedocs.io/en/latest/) is a flexible service and library for executing Galaxy tools. It is capable of leveraging a [GA4GH Task Execution Service](https://www.ga4gh.org/news/ga4gh-tes-api-bringing-compatibility-to-task-execution-across-hpc-systems-the-cloud-and-beyond/) TES endpoint to efficiently execute large-scale genomic analyses. By integrating with a GA4GH TES service, Pulsar can take advantage of the standardized and interoperable APIs provided by GA4GH to execute tasks. The integration of Pulsar with GA4GH TES also helps to promote interoperability among genomics platforms and services, making it easier for researchers and clinicians to conduct comprehensive genomic analyses and advance medical research.

More information about the running Galaxy jobs via TES using Pulsar can be found in [the Pulsar documentation](https://pulsar.readthedocs.io/en/latest/containers.html#ga4gh-tes). The implementation of this work was
part of [Pull Request #302](https://github.com/galaxyproject/pulsar/pull/302).

## Tool Registry Service (TRS) API

The TRS API allows for the easy sharing and distribution of workflows among the genomics community. The Galaxy Project uses the TRS API extensively for accessing publicly available workflows, making it easy for users to access and run pre-existing workflows for a wide range of analyses. 

[Dockstore](https://dockstore.org/) is a platform that allows for the sharing and distribution of tools and workflows in the genomics community and implements in the TRS API. Galaxy leverages the TRS API to integrate with Dockstore and access the tools and workflows stored on the platform. This allows Galaxy users to easily find and use workflows and tools that have been developed and shared by the genomics community. Galaxy and Dockstore developers have worked closely together for years as part of the [Anvil Project](https://anvilproject.org/). The list of Galaxy workflows available on Dockstore can be [found here](https://dockstore.org/search?descriptorType=gxformat2&entryType=workflows&searchMode=files).

[WorkflowHub](https://workflowhub.eu/) is "a registry for describing, sharing and publishing scientific computational workflows" that likewise implements the TRS API. The list of Galaxy workflows available
on WorkflowHub can be [found here](https://workflowhub.eu/workflows?filter%5Bworkflow_type%5D=galaxy).

Dockstore and WorkflowHub workflows can be searched and imported to usegalaxy* public servers and Galaxy admins can easily enable this feature on any Galaxy server. More information on accessing these workflows from inside the Galaxy user interface can be found in the relevant [Galaxy Training Network tutorial](https://training.galaxyproject.org/training-material/topics/galaxy-interface/tutorials/galaxy-on-dockstore/slides-plain.html).

Information on publishing Galaxy workflows to Dockstore and WorkflowHub can be found as part of [the Planemo docs best practices for workflows](https://planemo.readthedocs.io/en/stable/best_practices_workflows.html#dockstore).
