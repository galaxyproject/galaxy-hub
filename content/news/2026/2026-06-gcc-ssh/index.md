---
title: "Digital Humanities Special Interest Group at the Galaxy Community Conference"
date: "2026-06-22"
tease: ""
subsites: [global,eu,us]
main_subsite: freiburg
tags: [conference, poster, humanities, talk]
contributions:
  authorship:
    - Sch-Da
    - ksuderman
    - bgruening
    - mschatz
  funding:
    - deKCD
    - deNBI
    - mwk

---

## Outline

The 2026 Galaxy community conference took place in Clermont-Ferrand (France) from June 22-26. 
The Digital Humanities Special Interest Group (DH SIG) presented a talk and a poster on the newest Natural Language Processing (NLP) tools, and used the conference and the CoFest to develop the SIG's next steps.

## A new DH Subdomain

We discussed the roadmap for the new Social Sciences and Humanities [Subdomain](https://ssh.usegalaxy.eu/), with specific adaptations to this user group. 
Additionally, we contributed to teaching and training efforts during the Co-Fest, worked on further tutorials and tools, so stay tuned!

## Natural Language Processing in Galaxy

Natural Language Processing is core to many text-related tasks, including text preprocessing, sentiment analysis, information extraction, and more. 
To further support the DH community, Galaxy integrated several NLP tools:

### Newly Added Tools

We added 2 kinds of NLP tools: complete NLP engines and specialized analysis tools:

#### NLP Engines

    [Stanford CoreNLP](): A robust toolkit featuring sentiment analysis and coreference resolution (supporting 8 languages).
    [spaCy](): High-speed, production-ready NLP with support for over 25 languages.
    [Stanford Stanza](): A neural NLP pipeline that expands our reach to over 80 languages with CPU-optimized models.

#### Specialized Analysis Tools

    [Co-occurrence Analysis](https://usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fnlp_cooccurrence_analysis%2Fnlp_cooccurrence_analysis%2F1.0.0%2Bgalaxy0&version=latest): Extracts word relationships using sentence, window, or dependency methods.
    [Entity Geocoding](https://usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fnlp_geocode_entities%2Fnlp_geocode_entities%2Fversion%3Dlatest): Converts named entities into GeoJSON, allowing researchers to visualize their data on interactive maps.
    [VADER Sentiment](https://usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fvader_sentiment%2Fvader_sentiment%2Fversion%3Dlatest): A social-media-optimized sentiment analysis tool that works right out of the box.

