---
title: 'Topic extraction from Astrophysical Reports and follow-up analysis tool suggestions in Galaxy'
date: "2025-06-11"  
tease: "Matching short scientific texts to relevant analysis pipelines using AI"
hide_tease: false
tags: [esg-wp5, esg, tools, astrophysics]
subsites: [all, esg]
supporters:
  - eurosciencegateway
main_subsite: eu
---

Astronomical bulletins such as [ATels](https://astronomerstelegram.org/) or [GCN Circulars](https://gcn.nasa.gov/circulars) often provide crucial early information about new discoveries - ranging from transient events to peculiar sources across the electromagnetic spectrum. Due to the fleeting nature of some of these phenomena, automating follow-up observations, using insights from past experience, with space-based telescopes is becoming increasingly valuable.
[Astro-COLIBRI](https://astro-colibri.com/) is a platform that aggregates real-time information from multiple observatories, whose goal is to streamline the coordination of follow-up observations. Nevertheless, much of this process still remains manual.

In addition, vast archives of astronomical data already exist, making it possible to enhance the study of a new event by automatically analyzing historical observations from the same region of the sky. However, the lack of standardized formats in these bulletins and the high volume of daily publications present significant challenges for computers to interpret these texts and link them to suitable analysis tools.

Building on discussions from Astro-COLIBRI workshops, researchers have developed a Galaxy-based tool as part of a pilot study within the EuroScienceGateway project (WP5).
This tool - which can be generalized to alerts distributed by any astronomical brokers - combines entity recognition, semantic embeddings, and a trained Convolutional Neural Network to connect short astrophysical texts and reported astronomical sources to relevant follow-up analysis tools - related to astronomical instruments - on the [MMODA platform](https://www.astro.unige.ch/mmoda/).

The tool enables researchers to:
* Input short astrophysical texts directly or fetch them from online sources such as [ATel](https://astronomerstelegram.org/) or [GCN Circulars](https://gcn.nasa.gov/circulars).
* Automatically extract key entities such as source names, positions, phenomenon types, telescopes, and wavelength ranges using both regex patterns and the [astroBERT](https://huggingface.co/adsabs/astroBERT) language model.
* Embed the text into a 59-dimensional semantic vector describing source class, wavelength coverage, and relevant instruments.
* Use a Convolutional Neural Network (CNN) trained on pairs of initial alerts and follow-up reports to suggest appropriate MMODA tools.
* Retrieve direct MMODA URLs tailored to the content of the input text for immediate follow-up analysis.

The tool produces nine structured output tables, including:
* Entity recognition results
* Source classification and sky positions
* Vectorized input and CNN predictions
* Matching MMODA tool URLs with relevance scores

These outputs demonstrate how the input text is semantically parsed and matched to suitable analysis tools. The dot-product-based scoring ensures that the most relevant instruments - based on wavelength or source type - are prioritized.

This prototype tool is available on the [usegalaxy.eu](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/astroteam/analyse_short_astro_text_astro_tool/analyse_short_astro_text_astro_tool/0.0.1+galaxy0).

<a href="https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/astroteam/analyse_short_astro_text_astro_tool/analyse_short_astro_text_astro_tool/0.0.1+galaxy0"><button type="button" class="btn btn-success">Run Tool on usegalaxy.eu!</button></a>

We acknowledge the data services provided by [SIMBAD](https://simbad.u-strasbg.fr/simbad/), [TNS](https://www.wis-tns.org/), and [FINK](https://fink-portal.org/), as well as the [IVOA](https://www.ivoa.net/rdf/object-type/2020-10-06/object-type.html) community for their ontology work on astronomical source types.
