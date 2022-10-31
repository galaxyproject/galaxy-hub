---
title: ELIXIR-Italy launches Laniakea@ReCaS, a Galaxy “on-demand” platform
date: '2020-03-01'
tags: [tools]
authors: mtangaro
authors_structured:
- github: mtangaro
subsites: [eu, elixir-it]
main_subsite: elixir-it
---

ELIXIR-ITALY has officially announced the [Laniakea@ReCaS Call](https://laniakea-elixir-it.github.io/laniakea_at_recas), starting on 10 February 2020. The ELIXIR-ITALY Laniakea@ReCaS Call offers access to Cloud resources to be used for the deployment of on-demand Galaxy instances through the [Laniakea platform](https://laniakea-elixir-it.github.io). Users of the service will be able to configure, launch, and manage their Galaxy instance(s) on the Cloud using a user-friendly interface. 

Once deployed, Laniakea Galaxy instances can be operated and administered through the functionalities available to any typical Galaxy instance, for example adding tools, managing users, and designing workflows. Advanced users are also able to access the underlying virtual machine via SSH to fine-tune their configuration as needed. Laniakea can also be employed as a tool publishing platform. That is, tools developers can choose to publish and make new tools available embedding them in a personalized Galaxy instance. See for example [PITE-T](http://igg.cloud.ba.infn.it/galaxy) and [VINYL](http://beaconlab.it/vinyl).

European researchers can access Laniakea@ReCaS through an open-ended [Call](https://tinyurl.com/sqwk4fy) that assigns cloud resources to be used for the service.

![New plant genomes](/assets/media/laniakea-release.png)

Galaxy instances can be customised with several sets of pre-installed tools designed to address the typical needs of some of the most common NGS data analysis pipelines. The sets currently available are:
* **Galaxy Minimal** - Standard Galaxy production-grade server, i.e., the software environment is complete of the auxiliary applications needed for best performances, e.g., PostgreSQL database engine, NGINX/uWSGI HTTP server, proftpd FTP server, all pre-configured to work with Galaxy. This is also the baseline configuration of all the other flavours. 
* **Galaxy CoVaCS** - Workflow for genotypization and variant annotation of whole genome/exome and target-gene sequencing data (https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5800023/).
* **Galaxy GDC Somatic Variant** - port of the Genomic Data Commons (GDC) pipeline for the identification of somatic variants on whole exome/genome sequencing data (https://gdc.cancer.gov/node/246).
* **Galaxy RNA Workbench** - more than 50 tools for RNA centric analysis (https://www.ncbi.nlm.nih.gov/pubmed/28582575).
* **Galaxy Epigen** - based on the Epigen project Galaxy server, suited for the analysis of ChIP-Seq data.

New configurations can be designed and added upon [request](https://laniakea.readthedocs.io/en/latest/user_documentation/galaxy/galaxy_flavours_creation.html).


