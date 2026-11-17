---
title: 'Blinded Agentic Peer Review at Scale: Strengthening Manuscripts with BARS,
  Coming Soon to Galaxy'
date: '2026-11-05'
tease: Blinded agentic review with BARS offers a fast four-cent quality check—available
  now and coming soon to usegalaxy.org.
hide_tease: false
tags:
- ai
- reproducibility
- tools
subsites:
- all
contributions:
  authorship:
  - nekrut
---

We have posted a new bioRxiv preprint—[*Auditing Biomedical Literature with Blinded AI Peer Review: Where Peer Review Works, Where It Fails, and How to Strengthen It*](https://doi.org/10.64898/2026.11.02.763753)—introducing **BARS** (Blinded AI Review System) across 1,874 blind full-text reviews of 1,714 unique biomedical papers. Conducted by researchers at Temple University, the Translational Genomics Research Institute, the University of Cape Town, and The Pennsylvania State University, this study demonstrates the power of agentic review of papers. BARS is available now at [https://veg.github.io/BARS/](https://veg.github.io/BARS/), anyone can request a review today by filing an issue at [https://github.com/veg/BARS/issues/new](https://github.com/veg/BARS/issues/new), and a dedicated tool allowing massive reviews at scale will soon be available on [usegalaxy.org](https://usegalaxy.org).

Since 1991, annual biomedical publications across five core biological fields have grown more than elevenfold (reaching nearly 650,000 in 2025, and nearly 2.0 million across PubMed), outstripping human referee capacity. Yet unblinded language models recognize famous authors and flagship journals from training memory. Before an isolated agentic reviewer grades a manuscript with internet search turned off, BARS locally strips titles, author names, institutions, journal headers, dates, inline self-citations, and web identifiers. It then scores the text, equations, and inline tables out of 10 across four categories: (1) methodological rigor and statistical validity (3.5 points), (2) claim-evidence alignment (2.5 points), (3) biological plausibility (2.0 points), and (4) reproducibility and data integrity (2.0 points). Finally, an automated check verifies cited identifiers.

## Highlights Across 1,874 Blinded Reviews

- **Blinded, consistent calibration**: Across a 200-paper calibration set, BARS averaged 8.6/10 on verified sound controls with 0% false rejections below 5.0 (50/50 passed), removed a +0.35-point prestige boost on 25 everyday pilot papers, and graded low-cost mathematical and software sound controls on par with wet-lab sound controls (8.5/10 vs. 8.7/10). Repeated blind runs across a 30-paper test-retest subset more than doubled human referee consistency (0.86 single-run on 10 everyday papers and 0.97 across all 30 papers, vs. 0.20–0.45 for humans).
- **Rigorous peer review and society journals strengthen papers**: Across 50 matched preprint-to-published pairs, revision at selective flagship and academic society journals (n = 25) improved 80% of manuscripts (20/25) and raised scores by +0.62 points out of 10—more than double the +0.30-point gain at commercial megajournals (baseline-adjusted p = 0.033). Across 1,076 everyday papers (1991–2025), academic society journals ($3,242 mean fee, 6.48/10) outscored similarly priced commercial megajournals ($2,879 mean fee, 5.76/10) by +0.72 points.
- **Fast, four-cent support for authors, journals, and trainees**: Across 100 open-review articles (2020–2025) evaluated by 261 human referees, a single blind BARS pass recalled 97.9% (95/97) of unresolved human criticisms. Each review finishes in under three minutes for $0.041 in batch mode ($0.087 on demand), supporting pre-submission checks, multi-lab co-author verification, society-journal table checks, and mentored student journal clubs.
- **Proven on our own portfolios and preprint draft**: We stripped author, university, year, and lab software names (including Galaxy, HyPhy, and Datamonkey) across 222 open-access papers from two senior co-authors (164 from Sergei Kosakovsky Pond and 74 from Anton Nekrutenko, with 16 joint papers), and both portfolios averaged 7.6/10. A blind BARS check of our manuscript draft returned 7.8/10 and caught five statistical and consistency issues that all six co-authors had missed, which we fixed before posting.

## Get Started

- **Explore BARS and search all 1,874 blind reviews**: Browse the interactive archive and open-source code (MIT and CC-BY-4.0 licenses) at [https://veg.github.io/BARS/](https://veg.github.io/BARS/) and [https://github.com/veg/BARS](https://github.com/veg/BARS).
- **Request a blinded review today**: Open an issue at [https://github.com/veg/BARS/issues/new](https://github.com/veg/BARS/issues/new).
- **Massive reviews at scale on Galaxy (coming soon)**: We are bringing a dedicated BARS tool to [usegalaxy.org](https://usegalaxy.org).
- **Read the preprint**: Sergei L. Kosakovsky Pond, Stephanie J. K. Pond, Steven Weaver, Jordan D. Zehr, Darren P. Martin, and Anton Nekrutenko (2026), *Auditing Biomedical Literature with Blinded AI Peer Review: Where Peer Review Works, Where It Fails, and How to Strengthen It*, bioRxiv, [https://doi.org/10.64898/2026.11.02.763753](https://doi.org/10.64898/2026.11.02.763753).
