---
title: 'New Paper "ChiRA: an integrated framework for chimeric read analysis from
  RNA-RNA interactome and RNA structurome data"'
date: '2021-03-07'
doi: 10.1093/gigascience/giaa158
tags: [paper]
authors: beatrizserrano
authors_structured:
- github: beatrizserrano
subsites: [eu, freiburg]
main_subsite: freiburg
supporters: [unifreiburg]
---

_Abstract_ - With the advances in next-generation sequencing technologies, it is possible to determine RNA-RNA interaction and RNA structure predictions on a genome-wide level. The reads from these experiments usually are chimeric, with each arm generated from one of the interaction partners. Owing to short read lengths, often these sequenced arms ambiguously map to multiple locations. Thus, inferring the origin of these can be quite complicated. Here we present ChiRA, a generic framework for sensitive annotation of these chimeric reads, which in turn can be used to predict the sequenced hybrids.

__Results__
Grouping reference loci on the basis of aligned common reads and quantification improved the handling of the multi-mapped reads in contrast to common strategies such as the selection of the longest hit or a random choice among all hits. On benchmark data ChiRA improved the number of correct alignments to the reference up to 3-fold. It is shown that the genes that belong to the common read loci share the same protein families or similar pathways. In published data, ChiRA could detect 3 times more new interactions compared to existing approaches. In addition, ChiRAViz can be used to visualize and filter large chimeric datasets intuitively.

__Conclusion__
ChiRA tool suite provides a complete analysis and visualization framework along with ready-to-use Galaxy workflows and tutorials for RNA-RNA interactome and structurome datasets. Common read loci built by ChiRA can rescue multi-mapped reads on paralogous genes without requiring any information on gene relations. We showed that ChiRA is sensitive in detecting new RNA-RNA interactions from published RNA-RNA interactome datasets.

<br>
{% twitter https://twitter.com/GigaScience/status/1368137547788980224?s=20 %}

