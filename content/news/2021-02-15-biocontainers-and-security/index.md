---
title: Using secure BioContainers to run Galaxy tools
date: '2021-02-15'
tags: [data, tools]
authors: bgruening
authors_structured:
- github: bgruening
subsites: [eu, freiburg]
main_subsite: freiburg
---

The Galaxy community has heavily invested in the [Bioconda](https://doi.org/10.1038/s41592-018-0046-7)-[BioContainer](https://doi.org/10.1093/bioinformatics/btx192)
stack during the last years. We love conda, because it is easy to use, reproducible and everyone can create packages effortlessly. This has lead to nearly __20,000 packages, 8,000 of those from Bioconda for the biomedical research community__.

However, as we already discussed in _["Practical Computational Reproducibility in the Life Sciences"](https://doi.org/10.1016/j.cels.2018.03.014)_, reproducibility and security are
adjustable and a tradeoff involving useability and cost. If you require a higher level of reproducibility and security, you might want
to run your tools in a Container - Docker and Singularity are the most prominent container technologies today. For that reason, we have created, over the years, __[50,000 containers](https://doi.org/10.1021/acs.jproteome.0c00904) for all 8,000 Bioconda packages__ and some other containers for specific communities.

Thanks to ELIXIR and the BioContainers community, we have implemented last year __automatic security checks__ for those containers, to detect whether the included software has known security issues. On container creation, the continuous integration automatically adds the containers to a vulnerability scan tool [anchore](https://anchore.com/opensource/) that will create reports available in BioContainers web site for each tool. With this report, users or admins can have a view on known CVEs on embeded operating system or libraries. After analysis, we decided however not to sign containers, yet.

The last missing piece in the puzzle is to switch to those __more reproducible and secure containers by default for all tools included in the European Galaxy server__.
And this is what we want to tackle during this year. Our plan is to do this in two steps:

- __Step 1__: We take a CentOS Singularity container, mount our current conda environments into the container, and run the tool inside this container. This provides a secure environment and gives us a proven fallback for step 2.

- __Step 2__: We mount all the previously created 50,000 Singularity containers using our community-built CVMFS repository into the cluster and share those containers with
all nodes. Galaxy will then attempt to find a native container for every Galaxy tool. If such a container does not exist, which is unlikely, Galaxy will fallback to step 1 and run the tool in a secure Container environment using Conda packages.

If you have any questions, please do not hesitate to contact the [BioContainers community](https://matrix.to/#/#biocontainers_Lobby:gitter.im) or the [European Galaxy Project](mailto:contact@usegalaxy.eu).

