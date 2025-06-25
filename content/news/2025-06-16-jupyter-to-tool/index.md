---
title: 'nb2workflow: Turning Annotated Jupyter Notebooks into Galaxy Tools'
date: "2025-06-16"  
tease: "Convert your scientific notebooks into reusable Galaxy tools with just a tag."
hide_tease: false
tags: [esg-wp5, esg]
subsites: [all-eu, esg, all]
main_subsite: eu
---

Astronomers have long embraced Jupyter Notebooks as a flexible and powerful environment for data analysis, enabling reproducible science across a wide range of observations and missions. Recognizing this, members of the astronomy and data science communities have developed [nb2workflow](https://github.com/oda-hub/nb2workflow), a program capable to automatically convert and integrate annotated Jupyter Notebooks into platforms like [MMODA](https://www.astro.unige.ch/mmoda/) or Galaxy. 

The approach is based on semantically annotating notebook inputs and outputs using domain-specific ontologies, such as those maintained at [odahub.io](https://odahub.io/docs/guide-ontology/). Once annotated, notebooks can be pushed to a public repository and tagged with a predefined label to trigger a bot that generates the corresponding Galaxy tool.

This development streamlines the integration of astronomical analysis codes into the Galaxy platform, bridging the gap between interactive scientific computing and scalable, shareable, and reproducible analysis tools. A [Galaxy Training Network tutorial](https://training.galaxyproject.org/) is currently in preparation.

Learn more and contribute at [nb2workflow on GitHub](https://github.com/oda-hub/nb2workflow).
