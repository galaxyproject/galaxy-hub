---
title: New and updated CNV and Variant Calling tools
date: '2021-01-30'
tease: on UseGalaxy.eu and in the Toolshed
tags: [tools]
supporters:
- galaxy-europe
- miracum
authors: wm75
authors_structured:
- github: wm75
subsites: [all-eu, global, us]
main_subsite: eu
---

<table><tr><td>
Copy number variation (CNV) is a type of structural variation, specifically, it is a type of duplication or deletion events.
During the last month, the Galaxy community has cooperated with the CNV community to bring a variety of the best CNV tools to the 
Galaxy ecosystem. In addition, we updated the variant calling tools, specifically to also cope with long read sequencing technologies.
</td><td>
<img src="/assets/media/humman_variations_community_icon.png" alt="ELIXIR CNV community" />
</td></tr></table>

In the following, you will find a list of a few highlights.
We would like to thank all contributors, especially Nathan Roach, Niko Pinter, Stephan Flemming and the [ELIXIR CNV community](https://elixir-europe.org/communities/hcnv).

---------

---
**[Strelka2](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/strelka_somatic/strelka_somatic/)**

is a fast and accurate small variant caller optimized for analysis of germline variation in small cohorts
and somatic variation in tumor/normal sample pairs.
[Project link](https://github.com/Illumina/strelka)
[Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/strelka_somatic/strelka_somatic/)

---

**[Iris](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/irissv/irissv/)**

is a module which corrects the sequences of structural variant calls (currently only insertions).
[Project link](https://github.com/mkirsche/Iris)
[Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/irissv/irissv/)

---

**[JASMINE](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/jasminesv/jasminesv/)**

is tool is used to merge structural variants (SVs) across samples.
[Project link](https://github.com/mkirsche/Jasmine)
[Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/jasminesv/jasminesv/)

---

**[Lumpy](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/lumpy_sv/lumpy_sv/)**

is probabilistic framework for structural variant discovery.
[Project link](https://github.com/arq5x/lumpy-sv)
[Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/lumpy_sv/lumpy_sv/)

---

**[Delly](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/delly_call/delly_call/)**

is an integrated structural variant (SV) prediction method that can discover, genotype and visualize deletions, tandem duplications,
inversions and translocations at single-nucleotide resolution in short-read massively parallel sequencing data.
[Project link](https://github.com/dellytools/delly)
[Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/delly_call/delly_call/)

---

**[Sansa](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/sansa_annotate/sansa_annotate/)**

stands for Structural variant (SV) annotation and this is what is does.
[Project link](https://github.com/dellytools/sansa)
[Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/sansa_annotate/sansa_annotate/)

---

**[Sniffles](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/sniffles/sniffles/)**

is a structural variation caller using third generation sequencing (PacBio or Oxford Nanopore). It detects all types of SVs (10bp+)
using evidence from split-read alignments, high-mismatch regions, and coverage analysis.
[Project link](https://github.com/fritzsedlazeck/Sniffles)
[Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/sniffles/sniffles/)

---

**[cuteSV](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/cutesv/cutesv/)**

is a sensitive, fast and scalable long-read-based SV detection approach. cuteSV uses tailored methods to
collect the signatures of various types of SVs and employs a clustering-and-refinement method
to analyze the signatures to implement sensitive SV detection.
[Project link](https://github.com/tjiangHIT/cuteSV)
[Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/cutesv/cutesv/)

---

**[Control-FREEC](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/control_freec/control_freec)**

is a tool for detection of copy-number changes and allelic imbalances (including LOH) using deep-sequencing data.
[Project link](http://boevalab.inf.ethz.ch/FREEC/)
[Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/control_freec/control_freec)

---

**[Medaka](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/medaka_variant_pipeline/medaka_variant_pipeline/)**

is a tool to create consensus sequences and variant calls from nanopore sequencing data
using neural networks applied a pileup of individual sequencing reads against a draft assembly.
[Project link](https://github.com/nanoporetech/medaka)
[Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/medaka_variant_pipeline/medaka_variant_pipeline/)

---

**[GATK4 Mutect2](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/gatk4_mutect2/gatk4_mutect2/)**

calls somatic short mutations via local assembly of haplotypes. Short mutations include single nucleotide (SNA) and insertion and deletion (indel)
alterations. The caller uses a Bayesian somatic genotyping model.
[Project link](https://gatk.broadinstitute.org/hc/en-us/articles/360037593851-Mutect2)
[Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/gatk4_mutect2/gatk4_mutect2/)

---

**[BASIL](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/basil/basil/)**

is a method to detect breakpoints for structural variants (including insertion breakpoints) from aligned paired HTS reads in BAM format.
[Project link](https://github.com/seqan/anise_basil)
[Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/basil/basil/)

---

**[vcfanno](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/vcfanno/vcfanno/)**

allows you to quickly annotate your VCF with any number of INFO fields from any number of VCFs or BED files.
[Project link](https://github.com/brentp/vcfanno)
[Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/vcfanno/vcfanno/)

---

**[ARTIC minion](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/artic_minion/artic_minion/)**

builds consensus sequence and call variants from amplicon-based nanopore sequence data.
[Project link](https://github.com/artic-network/fieldbioinformatics)
[Galaxy tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/artic_minion/artic_minion/)

---




