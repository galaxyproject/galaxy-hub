---
title: 'SURF Research Cloud as infrastructure for Galaxy in The Netherlands'
date: '2025-07-02'
tease: 'Dutch scientists can now use Galaxy in secure environments.'
hide_tease: false
authors: "Mirela Minkova"
authors_structured:
- github: mirelaminkova
tags: [elixir-nl, eosc, geant, surf, eu]
subsites: [all]
main_subsite: eu
---

# Galaxy is now supported inside SURF Research Cloud

Analysing research data requires robust, reproducible, and secure platforms. The SURF Research Cloud (SRC) addresses this need by offering a collaborative environment with an extensive catalogue of on-demand research software. Designed as a multi-cloud platform, SRC ensures researchers can work across different underlying cloud infrastructures without sacrificing consistency or reproducibility. This flexibility ensures that users have access to a stable and familiar environment, regardless of the specific backend resources being used.

Recently, Galaxy was integrated into SRC, enabling Dutch users to launch Galaxy workspaces with customisable computational resources (RAM, CPU cores) in a consistent, reproducible setup. 
This integration facilitates collaborative research by supporting data federation and secure sharing, making it easier for research teams to work together without compromising data integrity. For added flexibility and scalability, users can also deploy a Pulsar node to dynamically distribute computational tasks—ensuring a responsive experience, even during periods of intensive analysis. The Pulsar node also allows researchers to offload Galaxy jobs to other workspaces or to the Dutch supercomputer, Snellius.

---

## Getting access to SRC

To access SRC, Dutch researchers must submit a grant proposal to the Dutch Research Council (NWO). Two tiers are available: Tier 1, or small computational grants, provide up to 50,000 CPU core hours, 5,000 GPU core hours on HPC Cloud, and 2 TB of storage. Larger NWO grants offer additional storage, computational resources (CPU and GPU), and advisory hours. Once access is granted, a collaboration environment is created for the researchers who applied. Each researcher can then access existing workspaces, create new ones, and browse available catalogue items.


For more information: 
 * [What is SURF?](https://www.surf.nl/en)
 * [Access to compute services](https://www.surf.nl/en/access-to-compute-services)
 * [Getting Started with SURF Research Cloud](https://servicedesk.surf.nl/wiki/spaces/WIKI/pages/9798172/SURF+Research+Cloud)
 * [Starting up Galaxy on SRC](https://training.galaxyproject.org/training-material//topics/admin/tutorials/surf-research-cloud-galaxy/tutorial.html)
 * [Starting up Pulsar on SRC](https://training.galaxyproject.org/training-material/topics/admin/tutorials/surf-research-cloud-pulsar/tutorial.html)
---

## Acknowledgments

This project was a collaborative effort to bring Galaxy to the Dutch scientific community, which would not have been possible without the help of Helena Rasche and Dawa Ometto.
