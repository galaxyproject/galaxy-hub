---
title: "Eight LLMs, one RNA-seq dataset: what we learned controlling Galaxy from Orbit"
date: "2026-06-09"
tease: "We pointed eight frontier LLMs at the same Candida auris RNA-seq study and asked each to reanalyze it on Galaxy through Orbit. Six reproduced the headline result — and the failures taught us more than the successes."
tags: [ai, llm, rna, reproducibility]
subsites: [all]
contributions:
  authorship:
    - nekrut
---

What happens when you hand a published bioinformatics analysis to an AI agent and say "reproduce this on Galaxy"? We ran the experiment — eight times, with eight different frontier models — and the results are both reassuring and instructive.

## The setup

We took the bulk RNA-seq data from [Santana et al. 2023, *Science*](https://pmc.ncbi.nlm.nih.gov/articles/PMC11235122/) — the study that identified **Scf1** as a *Candida auris*-specific adhesin — and asked eight large language models to independently reanalyze it. Each model drove an [Orbit](https://github.com/galaxyproject/loom) session (the agentic interface to Galaxy built on the Loom harness), connected to [usegalaxy.org](https://usegalaxy.org) through the Galaxy MCP server, with reference data from [BRC-analytics](https://github.com/galaxyproject/brc-analytics).

The task was identical for every model: build a paired-end collection from the six samples (BioProject `PRJNA904261`), run the IWC `rnaseq-pe` and `rnaseq-de` workflows on the current *C. auris* B8441 v3 assembly, reproduce the two key `DESeq2` contrasts from the paper, and recreate a labeled volcano plot highlighting *SCF1*. The lineup: Claude Opus, Sonnet, and Haiku; OpenAI GPT-5.5 (two attempts); Google Gemini 2.5 Pro and Gemini 3.5 Flash; and DeepSeek.

## All successful analyses reproduce published result

Six of the eight runs completed the full analysis, and all six independently reproduced the paper's central finding — *SCF1* is dramatically down-regulated both in the *tnSWI1* mutant and in the poorly-adhesive AR0387 isolate (log2 fold-change ≈ −6.8 to −7.4, adjusted *p* ≈ 0).

![SCF1 expression across the eight reanalysis attempts](./scf1-across-attempts.png)

**Panel A** shows how tightly the completing runs agree on the *SCF1* fold-change. **Panel B** shows the actual expression collapse — *SCF1* drops from ~46,000 normalized counts in the adhesive wild type to a few hundred in the mutant and the poorly-adhesive isolate. The result is robust across models, and robust to a different genome annotation than the one the original authors used.

## The trap that caught two models

The single most interesting scientific finding was a **gene-identifier trap**. The paper used the B8441 *v2* assembly, whose locus tags look like `B9J08_001458` (SCF1). The current *v3* assembly **silently re-numbered** those tags — and *not* by a simple zero-strip. The naive guess `B9J08_001458` → `B9J08_01458` maps SCF1 to the *wrong gene*, one that shows no differential expression at all.

Two models fell straight into this trap and briefly concluded that SCF1 was *not* differentially expressed — a false negative — before recovering. The correct bridge is protein-level reciprocal-best-hit matching (DIAMOND), which maps `B9J08_001458` to v3 `B9J08_03708`. This is a cautionary tale for *anyone* re-running an older analysis on a current assembly, human or AI: never map locus tags by their numbers across assembly versions.

## Cost, and a note on reproducibility

Because Galaxy compute is free on usegalaxy.org, the only cost was the LLM API spend — which makes the figures directly comparable. They ranged **~47×**, from $131.83 (the most thorough run, with fully labeled figures and a polished report) down to $2.82 for a run that reproduced the same scientific result. The extra spend bought completeness, polish, and less hand-holding — not a more correct answer.

We also saw a neat illustration of Galaxy's reproducibility: two runs that used the unmodified IWC workflows with identical parameters produced **bit-identical** `DESeq2` tables, down to twelve significant figures. When the pipeline is fixed, the platform is deterministic regardless of which agent drove it.

## What broke — and what we're fixing

The failures were the most valuable part. Two runs never reached the analysis at all, stalling on data preparation. Across all runs we catalogued recurring friction: agents blocking on polling loops and stalling silently for up to two hours; MCP tool errors that were reported as "success" with the failure buried in the result payload; a missing history-copy primitive; and the absence of a protein-FASTA / cross-assembly ID-mapping affordance that would have prevented the gene-ID trap entirely.

The encouraging part is that the platform is already moving. The most common Galaxy-side failure — optional workflow parameters leaking an unresolved placeholder into a tool's command line — was **fixed upstream** in [Galaxy PR #22820](https://github.com/galaxyproject/galaxy/pull/22820) (merged into 26.0) during the very window these runs took place. We filed the remaining harness issues against [`galaxyproject/loom`](https://github.com/galaxyproject/loom/issues) so they can be addressed systematically.

## Try it yourself

The full write-up — model-by-model deep dive, the complete shortcomings catalogue, and concrete recommendations for Orbit, Galaxy, and the MCP servers — along with every run's working directory and the Galaxy history IDs, is public:

**[github.com/nekrut/orbit-paper](https://github.com/nekrut/orbit-paper)**

Agentic analysis on Galaxy is genuinely promising: the science reproduced, cheaply, across a wide range of models. The work ahead is in the tooling — making failures visible, waits non-blocking, and reference metadata rich enough that the agent can't take a wrong turn.
