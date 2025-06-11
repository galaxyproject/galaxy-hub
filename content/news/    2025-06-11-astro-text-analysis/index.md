---
title: 'Topic extraction from Astrophysical Reports and follow-up analysis tool suggestions in Galaxy'
date: "2025-06-11"  
tease: "Matching short scientific texts to relevant analysis pipelines using AI"
hide_tease: false
tags: [esg-wp5, esg]
subsites: [all-eu, esg, all]
main_subsite: eu
---

Astronomical bulletins such as [ATels](https://astronomerstelegram.org/) or [GCN Circulars](https://gcn.nasa.gov/circulars) often contain crucial early information about new discoveries—from transient events to peculiar sources across the electromagnetic spectrum. Making sense of these reports and automatically linking them to appropriate analysis tools remains a challenge, given the unstandardized written format of these texts and the relatively large number of texts published every day.

As part of a pilot study within the EuroScienceGateway project WP5, researchers have developed a Galaxy tool that combines entity recognition, semantic embeddings, and a trained Convolutional Neural Network to  connect short astrophysical texts and reported astronomical sources to relevant follow-up analysis tools (related to astronomical instruments) on the [MMODA platform](https://www.astro.unige.ch/mmoda/).

The tool enables researchers to:
* Input short astrophysical texts directly or fetch them from online archives like [ATel](https://astronomerstelegram.org/) or [GCN Circulars](https://gcn.nasa.gov/circulars).
* Automatically extract key entities such as source names, positions, phenomenon types, telescopes, and wavelength ranges using both regex patterns and the [astroBERT](https://huggingface.co/adsabs/astroBERT) language model.
* Embed the text into a 59-dimensional semantic vector describing source class, wavelength coverage, and relevant instruments.
* Use a Convolutional Neural Network (CNN) trained on pairs of initial alerts and follow-up reports to suggest appropriate MMODA tools.
* Retrieve direct MMODA URLs tailored to the content of the input text for immediate follow-up analysis.

The tool produces nine structured output tables, including:
* Entity recognition results
* Source classification and positions
* Vectorized input and CNN predictions
* Matching MMODA tool URLs with relevance scores

These outputs provide a transparent view of how the text is interpreted and mapped to available tools. The dot-product-based scoring ensures that the most relevant instruments—by wavelength or source type—are prioritized.

This prototype tool demonstrates how semantic representations and domain ontologies can bridge textual astronomical alerts with structured tool recommendations, making platforms like Galaxy more integrated and responsive to real-time research needs.
   
We acknowledge the MMODA team and the [SIMBAD](https://simbad.u-strasbg.fr/simbad/), [TNS](https://www.wis-tns.org/), and [FINK](https://fink-portal.org/) for their data services and the [IVOA](https://www.ivoa.net/rdf/object-type/2020-10-06/object-type.html) community for their ontology work of astronomical source types.
