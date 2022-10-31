---
title: SINA available in Galaxy - Accurate high-throughput multiple sequence alignment
  of ribosomal RNA genes
date: '2019-11-11'
tags: [tools]
subsites: [eu, freiburg]
main_subsite: freiburg
---

SILVA Incremental Aligner (SINA) is avaiable in [Galaxy](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/sina/sina/)!

SINA uses a combination of k-mer searching and partial order alignment (POA) to maintain very high alignment accuracy while satisfying high throughput performance demands. SINA was evaluated in comparison with the commonly used high throughput MSA programs PyNAST and mothur and was able to achieve higher accuracy in all performed benchmarks.

Using multiple reference sequences as a basis for the alignment of the candidate sequences significantly improves alignment quality. Dynamically selecting a low, fixed number of sequences from which the alignment template is constructed rather than basing the alignment on a global template built from all reference sequences allows the use of very large reference MSAs, lowering the number of bases remaining unaligned because they do not occur in the reference MSA. 

Available reference databases of the [SILVA](https://www.arb-silva.de/) project can be integrated.

<embed src="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3389763/pdf/bts252.pdf" width="100%" height="700" type='application/pdf'>

