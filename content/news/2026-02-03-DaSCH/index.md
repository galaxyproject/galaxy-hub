---
title: "Connecting Humanities Data: Analyzing DaSCH data on Galaxy"
date: "2026-02-03"
tease: "We are happy to announce the collaboration between DaSCH, the Swiss National Data and Service Center for the Humanities, and the data analysis platform Galaxy."
subsites: [global,eu,us]
main_subsite: freiburg
tags: [DaSCH, repositories, data-commons, workflow, eosc, OCR, LLMHub]
contributions:
  authorship:
    - jnussbaum
    - Sch-Da
  funding:
    - deKCD
    - datacommons
    - deNBI

---

# Connecting Humanities Data: 
## Analyzing DaSCH data on Galaxy

We are happy to announce the collaboration between [DaSCH](https://dasch.swiss/), the Swiss National Data and Service Center for the Humanities, and the data analysis platform [Galaxy](https://usegalaxy.eu/). 
While DaSCH provides loads of research data, Galaxy has lots of tools and workflows for analysing it - sounds like a match made in heaven!

# DaSCH as a data provider

Imagine a researcher who has spent countless hours collecting data. After publishing a paper, the data often rots on a private computer and is then lost forever.
What a pity for the scientific community, and what a waste of time and money! 
That’s where DaSCH comes in. DaSCH is a Virtual Research Environment (VRE) and long-time repository for research data from the Humanities. 
Its mission is to operate a platform where researchers can work on and publish their data. This has multiple benefits: 

- The data doesn’t rot any more on a private computer, but is publicly available for generations to come.
- DaSCH supports researchers in tidying up their data and annotating it. This improves quality.
- All data published at DaSCH is semantically structured and richly documented, so that future users can understand and reuse it.
- This access is not limited to humans, but the data is also machine-readable and optimised for interoperability with a wide range of tools.

In short, DaSCH provides FAIR research data, i.e., data that is findable, accessible, interoperable, and reusable. 
In addition, DaSCH engages in education about best practices in research data management, offers support for data archiving, and ensures the long-term availability of the archived data by providing stable and citable identifiers.

# Galaxy as a data consumer

Galaxy is an open-source data analysis platform and a powerful workflow management system. 
It enables researchers to analyse their data and make their research reproducible. 
This allows sharing the analysis steps that have been applied to data, rerunning the tools with different settings on the same data, or with the same settings on different data. 
This brings reproducibility to the next level! 

# Matchmaking between DaSCH and Galaxy

The idea of connecting research data infrastructures isn’t new, but only recently has it been systematically pushed forward by initiatives like the European Open Science Cloud ([EOSC](https://eosc.eu/)). 
The ambition of EOSC is to develop a ‘Web of FAIR Data and Services’ for science in Europe. This is achieved by a long-term process of alignment and coordination between existing infrastructures, like DaSCH or Galaxy. 
In this blog post, we’d like to present a concrete example of collaboration between these two. So let’s dive in!

# Extract text from historical prints

You can use Galaxy to analyse data from a wide range of sources, e.g. from DaSCH. 
One of the datasets accessible at DaSCH is the “Bilderfolgen Basler Frühdrucke”. 
It consists of 20 richly illustrated incunabula, i.e. scans of prints from the earliest stages of book printing, from the 15th century. 
We picked the [Ship of Fools (Narrenschiff)](https://ark.dasch.swiss/ark:/72163/1/0803/cpQ3=JfqVZOkd7hUQ26kTg7.20110414T075758Z), a satirical allegory in German verse published in 1494 in Basel. 
It was the most popular German book before the Reformation. 
It is a moral satire about 100 fools on a boat trip, which holds up a critical and satirical mirror to the world through an entertaining description of their vices and oddities. 
While the book’s scans are very precious, their texts are not machine-readable, so they cannot be used for further analysis without retrieving a full-text from another source. 
At this point, Galaxy comes in.

We created a workflow to make the scans from the incunabula machine-readable. 
The scans can be accessed by visiting [https://app.dasch.swiss/](https://app.dasch.swiss/), navigating to “Incunabula”, choosing “Book”, selecting “[Das] Narrenschiff (dt.)”, and then leafing through the pages. 
The current analysis started with page 19. The link to an image can be obtained by clicking on “Share” and then “Copy IIIF URL to clipboard”.

#todo continue here!

<div align="center">
  <img src="preconfigured_dataverse.png" alt="Galaxy: preconfigured" width="600"/>
</div>

---
