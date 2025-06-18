---
title: "Human Genetics working group T2 update"
tease: "Expanding Galaxy’s ability to analyze protected human data"
authors: "Enis Afgan"
date: "2021-09-21"
---

<div class="card float-right" style="min-width: 12rem; max-width: 20rem">
<div class="card-header bg-wg-applied text-white">Human Genetics</div>

This *domain-focused* working group emphasizes applying Galaxy in human research.

* [Google Drive](https://drive.google.com/drive/folders/1YMCwHicRNLtT0t8AIZaQNoT2uaDaQm3H)
* [Goals Slide](https://docs.google.com/presentation/d/1h4vZe0zOUQVOeFxc49levRpmgWmJlMkedQjp2QRrQZw/edit?usp=sharing)
* Leadership: Enis Afgan

</div>


The **Human Genetics working group** focuses on expanding Galaxy’s ability to analyze protected human data. Currently, this is made possible via [AnVIL](https://anvilproject.org/) where Galaxy is deployed in a [FedRAMP](https://www.fedramp.gov/) certified environment and alongside [3PB of data](https://anvilproject.org/data). This is the only such environment in the world where anyone can sign up and start working with this data within minutes.

For the term starting in May 2021 and running through August 2021, the working group focused on the following five objectives:

1. **Add support for Galaxy Interactive tools (GxITs).** GxITs allow rich applications, such as IOBIO or HiGlass, to be used within Galaxy and effectively expand analysis and visualization capabilities beyond what is available from installed tools. However, they are complicated to set up and require special handling. In partnership with the Deployment and Cancer Informatics working groups, the necessary components for deploying GxITs have been codified. However, there are some restrictions within AnVIL that still need to be worked out with the underlying platform, such as running GxITs on a subpath instead of a subdomain as well as proxying of the requests by the AnVIL infrastructure. These will be the goals for the next term.
2. **Galaxy framework enhancements for AnVIL.** AnVIL supports additional applications besides Galaxy, allowing users to switch between batch analysis in Terra and interactive analysis in RStudio/Bioconductor or Galaxy. Being able to move data between those applications is critical. Previously, we have added the ability to export complete histories from Galaxy to Terra but that was cumbersome to use in other applications. This term, we added a tool that allows individual datasets to be exported from Galaxy into Terra.
3. **Presence at the Galaxy Community Conference.** If you were interested in using or learning how Galaxy works on AnVIL, GCC was the place to learn! But it’s not too late, videos and abstracts are available talking about an [overview of AnVIL](https://gcc2021.sched.com/event/kGch/tu-35-streamlining-accessibility-and-computability-of-large-scale-genomic-datasets-with-the-nhgri-genome-data-science-analysis-visualization-and-informatics-lab-space-anvil), [deployment architecture for working in a regulated environment](https://gcc2021.sched.com/event/jm8H/galaxy-for-protected-datasets), and [enabling GxITs](https://gcc2021.sched.com/event/jm8H/galaxy-for-protected-datasets).
4. **Explore analysis costing and cost estimates.** Cost estimation remains one the largest questions researchers have as they look to migrate their analysis to the cloud. We have embarked on an effort to review historic tool usage data and identify most popular tools, then benchmark these tools using a controlled environment, and finally estimate costs. You can check out an interactive dashboard with the historic and benchmarking data on [ObservableHQ](https://observablehq.com/@dannon/cloud-costs).
5. **Support operations of Galaxy on AnVIL.** Keeping AnVIL in lock-step with the general Galaxy releases is critical for disseminating the latest features developed by the broader Galaxy community. This means live testing and validation of a new Galaxy release on AnVIL specifically. AnVIL is currently running Galaxy 21.05 with all the settings captured in an AnVIL version of the Galaxy Helm chart: [GalaxyKubeMan](https://github.com/galaxyproject/galaxykubeman-helm/pull/31).
