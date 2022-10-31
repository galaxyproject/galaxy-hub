---
title: Minimap2 mapper for noisy long read sequences (e.g. Nanopore, PacBio)
date: '2017-11-04'
tags: [tools]
subsites: [eu, freiburg]
main_subsite: freiburg
---

Do you have Nanopaore or PacBio reads? Try <a target="_top" href="https://galaxy.uni-freiburg.de/tool_runner?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fminimap2%2Fminimap2%2F2.3">minimap2 as a new aligner</a>!
From minimaps [homepage](https://github.com/lh3/minimap2):

Minimap2 is a versatile sequence alignment program that aligns DNA or mRNA sequences against
a large reference database. Typical use cases include: 

 * mapping PacBio or Oxford Nanopore genomic reads to the human genome
 * finding overlaps between long reads with error rate up to ~15%
 * splice-aware alignment of PacBio Iso-Seq or Nanopore cDNA or Direct RNA reads against a reference genome
 * aligning Illumina single- or paired-end reads
 * assembly-to-assembly alignment
 * full-genome alignment between two closely related species with divergence below ~15%.

For ~10kb noisy reads sequences, minimap2 is tens of times faster than
mainstream long-read mappers such as BLASR, BWA-MEM, NGMLR and GMAP.
It is more accurate on simulated long reads and produces biologically meaningful
alignment ready for downstream analyses. For >100bp Illumina short reads, minimap2 is three
times as fast as BWA-MEM and Bowtie2, and as accurate on simulated data.
Detailed evaluations are available from the minimap2 preprint.

Read more in the minimap2 preprint from Heng Li - [Minimap2: fast pairwise alignment for long nucleotide sequences.](https://arxiv.org/abs/1708.01492)

## Credits

Marius van den Beek for [developing the Galaxy integration](https://github.com/galaxyproject/tools-iuc/pull/1552)!

