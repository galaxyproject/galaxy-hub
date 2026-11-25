---
title: "Slides from the BRC Analytics + Galaxy symposium at ASTMH 2026"
date: "2026-11-25"
tease: "Five decks from the BRC Analytics and Galaxy symposium at ASTMH 2026 are now online, covering archive-scale pathogen genomics, agentic analysis, and grounding AI agents in the GTN."
hide_tease: false
subsites: [global, all]
tags:
  - brc-analytics
  - conference
  - ai
  - gtn
contributions:
  authorship:
    - scottcain
    - nekrut
---

# Slides from the BRC Analytics + Galaxy symposium at ASTMH 2026

The BRC Analytics and Galaxy teams ran a joint symposium at the [ASTMH 2026 Annual Meeting](https://www.astmh.org/) in National Harbor, Maryland, November 18–22. Enough people asked for the slides afterward that the BRC Analytics team has now posted all five decks: **[ASTMH 2026: slide decks from the BRC Analytics symposium](https://brc-analytics.org/learn/blog/astmh-2026-slides)**.

The through-line of the session was what it takes to go from a biological question about a pathogen to a reproducible answer, without the researcher having to assemble the infrastructure themselves. That means curated NCBI genome packages rather than ad-hoc downloads, TACC compute behind the analysis rather than a laptop, and — increasingly — agents that can drive the analysis while leaving a trail you can check.

For the Galaxy community, a few pieces are worth singling out:

- **Agentic analysis is being built on top of Galaxy, not beside it.** Danielle Callan's *Verifiable AI for Pathogen Genomics* makes the case for "AI you can check" — agentic analysis whose steps remain inspectable and re-runnable, which is exactly the property Galaxy histories and workflows already provide.
- **The Galaxy Training Network is turning out to be good agent training data.** *Human-Written, Agent-Readable* covers grounding AI agents in GTN material and running them against usegalaxy.org. Tutorials written carefully for humans turn out to be an unusually good substrate for agents, which is a nice argument for the effort the GTN community puts into them.
- **New tooling for archive-scale search.** *New Technologies in BRC* walks through Logan, kmindex, LexicMap, the disassembler, and the Aeon evolutionary suite — the machinery behind querying the entire SRA rather than a hand-picked set of accessions — plus new precomputed data products.
- **A worked example.** Ananias Escalante's *Your Pathogen Question. A Reproducible Analysis.* uses malaria to take a well-posed question through to a five-taxon variant-calling run, which is a useful thing to point people at when they ask what any of this looks like in practice.

Anton Nekrutenko's introduction, *BRC-Analytics — AI + Galaxy + Infrastructure*, frames the whole set and sketches where BRC Analytics goes next.

The decks are hosted as presented, and the BRC Analytics post includes a handy trick: append `?print-pdf` to any deck URL and print from your browser to get a PDF.

[Read the post and get the slides →](https://brc-analytics.org/learn/blog/astmh-2026-slides)

[BRC Analytics](https://brc-analytics.org) is part of the Bioinformatics Resource Centers for Infectious Diseases Program, developed and funded by [NIAID](https://www.niaid.nih.gov/research/bioinformatics-resource-centers).
