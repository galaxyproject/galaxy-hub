---
title: 'UseGalaxy.eu Use Case: Translational Research and Precision Medicine'
date: '2024-06-03'
tags: [UseCase]
authors: Ali Sajid Imami
authors_structured:
- name: Ali Sajid Imami
subsites: [eu, pasteur, freiburg, erasmusmc, elixir-it, belgium, genouest]
main_subsite: eu
---

With this article we would like to share Ali's experience with usegalaxy.eu and its use for his research.

>The world of bioinformatics moves very quickly, and it can often become a race against time to keep up with it. This is not helped by the fragmented nature of the different tool specifications, and it becomes almost impossible to have all the tools available to ensure that you have everything available to run them. Galaxy has made it easier for bioinformaticians and non-bioinformaticians alike to evaluate different tools quickly. This, then, was the reason I had a long interaction with Galaxy recently.
>
>Our lab is at the forefront of translational research and precision medicine. Our core activities include Active Kinome evaluation and multi-omics analyses. Luckily, we are also affiliated with a medical school, allowing us to quickly explore translation in the bench/computer-to-bedside. One such opportunity arose recently, when we were given access to exome sequencing data for a patient with certain psychiatric illnesses. Our lab has had an interest in bioenergetic dysfunction in schizophrenia and the genetic variants that allow it to happen. We have published on it earlier, ([here](https://doi.org/10.1016/j.biopsych.2017.10.014) and [here]https://doi.org/10.1038/s41380-022-01494-x). 
>
>I was then tasked with identifying potential mutations and other single nucleotide variants present in the patient's genome to determine their genotype concerning mutations related to bioenergetic dysfunction. This process took the form of the following steps:
>
>1.	Align the genome to a reference assembly
>2.	Do variant calling on the aligned data
>3.	Filter to the variants of interest
>
>A specific problem for us though, was identifying the appropriate set of tools for each step. Step 3, filtering, was easy enough. Alignment and variant calling, however, were different. We have had a good experience of using [HISAT2](http://daehwankimlab.github.io/hisat2/manual/) for alignment in RNASeq datasets, but: is this the optimal aligner, when it comes to variant calling? The Broad Institute recommends a pipeline for variant calling using the [Genome Analysis Toolkit 4.0 (GATK4.0)](https://gatk.broadinstitute.org/hc/en-us/articles/360036194592-Getting-started-with-GATK4), but same here: is this the best pipeline? For alignment, we still have people using multiple reference genomes, from hg19 to hg38 to the latest chm13. We decided to use as many combinations of the options available as we could to ensure that we do not miss anything.
>
>Galaxy made it easier to create a fan-in and fan-out technique that let us run the same dataset through multiple variant discovery pipelines with various parameters. These included the aligners ([HISAT2](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/hisat2/hisat2/2.2.1+galaxy1), [minimap2](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/minimap2/minimap2/2.28+galaxy0), [STAR](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/rgrnastar/rna_star/2.7.11a+galaxy0)), reference genomes (hg38 and chm13), and variant callers ([gatk](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/gatk4_mutect2/gatk4_mutect2/4.1.7.0+galaxy1), [bcftools](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/bcftools_call/bcftools_call/1.15.1+galaxy3)). This understandably created a deluge of data that practically exploded. We are incredibly thankful to the Galaxy Governance team for allotting us an expanded quota that allowed us to experiment with the multiple parameter sets and keep the intermediate results safe for provenance reasons.

