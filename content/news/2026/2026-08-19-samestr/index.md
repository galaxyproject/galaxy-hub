---
title: "SameStr: Detecting shared microbial strains between metagenomic samples, now in Galaxy!"
date: "2026-08-19"
authors: Xenia Morera Martínez
tease: "Now use SameStr in Galaxy to detect shared microbial strains across your metagenomic samples"
subsites: [global, eu]
---
Now use SameStr in Galaxy to detect shared microbial strains across your metagenomic samples

## What is SameStr? What does it do?

[SameStr](https://github.com/danielpodlesny/samestr) is a bioinformatic tool suite that identifies shared strains between metagenomic samples by comparing the genetic variation observed at species-specific marker genes. Rather than only confirming that two samples carry the same species, SameStr builds single-nucleotide variant (SNV) profiles from marker gene alignments so that samples can be compared at strain-level resolution. SameStr is organized as a chain of tools, each handling one step of the shared-strain detection process:

1) Convert marker gene alignments into per-clade SNV profiles using [SameStr Convert](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/samestr/samestr_convert/1.2025.111+galaxy0)
2) Combine per-sample SNV profiles for the same clade across samples using [SameStr Merge](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/samestr/samestr_merge/1.2025.111+galaxy0)
3) Remove low-quality clades, samples, and positions using [SameStr Filter](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/samestr/samestr_filter/1.2025.111+galaxy0)
4) Compute coverage and nucleotide diversity statistics using [SameStr Stats](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/samestr/samestr_stats/1.2025.111+galaxy0)
5) Calculate pairwise strain similarity between samples for each clade using [SameStr Compare](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/samestr/samestr_compare/1.2025.111+galaxy0)
6) Combine similarity results with taxonomic profiles into shared-strain summary tables using [SameStr Summarize](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/samestr/samestr_summarize/1.2025.111+galaxy0)

## How to use the tool

Please follow these steps for application:

- a) Pre-process your metagenomic reads with KneadData and align them to species-specific marker genes with MetaPhlAn, both already available in Galaxy.
- b) Run the SameStr tools on the resulting alignments and taxonomic profiles, either tool by tool or as the complete workflow.
- c) Inspect the taxon count, co-occurrence, and strain events tables produced by SameStr Summarize to see which clades are shared between samples, and which of those are confirmed as the same strain rather than just the same species.

## More details

To learn more about the method behind the tool, see the original publication, [Podlesny et al., 2022, *Microbiome*](https://microbiomejournal.biomedcentral.com/articles/10.1186/s40168-022-01251-w), and the [SameStr GitHub repository](https://github.com/danielpodlesny/samestr).

