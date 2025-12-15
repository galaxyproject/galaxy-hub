---
title: "GPU-accelerated genome mapper Parabricks' FQ2BAM in Galaxy now"
date: "2025-12-15"
authors: Anup Kumar 
tease: ""
subsites: [global,eu,us,freiburg]
---

# **Parabricks FQ2BAM mapper**

NVIDIA's Parabricks provides GPU-accelerated tools suite for genomic analysis. [FQ2BAM](https://usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fparabricks_fq2bam%2Fparabricks_fq2bam%2F4.6.0-1%2Bgalaxy0&version=latest) tool from Parabricks has been integrated into Galaxy that runs on L40S GPU to generate genomic mappings in a few minutes for zipped paired-end reads of size as large as 2.5 GB. It provides a drop-in replacement of BWA-MEM2 while maintaining the same accuracy. Parabricks' FQ2BAM pipeline wraps BWA-MEM2 performing alignment from FASTQ to BAM and then handles downstream processing such as sorting, with optional steps for duplicate marking and base-quality score recalibration consistent with GATK best practices.


## FQ2BAM vs BWA-MEM2 runtime comparison
Across 5 repeated runs on 8 CPU cores, the three mapping tools separate very clearly in both speed and **run-to-run stability:

FQ2BAM (1 GPU and 8 CPU cores) was consistently the fastest: 5–8 min per run. In practice, that’s “finish-and-move-on” performance with a tight spread.

BWA-MEM2 (8 cores) came next but showed the largest variability: 14–40 min (median 16 min, mean 23.2 ± 11.4 min SD). Most runs clustered around ~14–16 min, but one slow run (40 min) noticeably widened the distribution—worth keeping in mind for production pipelines.

BWA (8 cores) was the slowest overall yet fairly steady: 34–46 min (median 38 min, mean 39.0 ± 4.5 min SD), making it predictable but substantially longer.

<div align="center">
    <img src="runtimes.png" alt="Runtime comparison of FQ2BAM with BWA-MEM2" width="600"/>
</div>

In terms of typical (median) speed, FQ2BAM was about 2.7× faster than BWA-MEM2 and 6.3× faster than BWA, while BWA-MEM2 was about 2.4× faster than BWA. Put simply: for Galaxy users optimizing throughput, FQ2BAM dominates on runtime, BWA-MEM2 is usually much faster than BWA but less consistent, and BWA remains the slow, steady baseline.

## FQ2BAM vs BWA-MEM2 runtime comparison


### FQ2BAM vs BWA-MEM2 Mapping statistics

Both alignments are essentially identical in overall mapping performance: they use the same reference size (3,209,286,105) and number of reads (53,317,838), and both achieve ~99.6% mapped reads (53,102,797 for FQ2BAM vs 53,102,800 for BWA-MEM2) with only ~0.4% unmapped. Paired-end behavior is also nearly the same (≈99.24% “both in pair”) and supplementary alignments are comparable (~0.09%). The main differences show up in downstream flags/estimates: 

<div align="center">
    <img src="parabricks_qm.png" alt="Runtime comparison of FQ2BAM with BWA-MEM2" width="600"/>
</div>

FQ2BAM reports 11.2M duplicate reads flagged (21.01%) and “duplicated reads skipped,” consistent with duplicates being explicitly marked/handled in that pipeline, while the BWA-MEM2 report shows 0 flagged duplicates but a large estimated duplicate count (33.7M; duplication rate 46.16%), suggesting duplicates weren’t marked and Qualimap inferred them instead. BWA-MEM2 also has more overlapping read pairs (26.08% vs 20.36%) and slightly more clipped reads (1.29% vs 1.07%), indicating small differences in alignment/fragment handling even though the headline mapping rates are the same.


<div align="center">
    <img src="bwa-mem2_qm.png" alt="Runtime comparison of FQ2BAM with BWA-MEM2" width="600"/>
</div>


#### FQ2BAM vs BWA-MEM2 Mapping quality comparison

In both “Mapping Quality Across Reference” plots, FQ2BAM (image 1) and BWA-MEM2 (image 2) show a very similar overall pattern: the mapping quality stays close to the maximum (around ~60) across most of the genome, indicating that the majority of reads are placed confidently. In both cases, there are sharp, localized drops to low/near-zero mapping quality at specific genomic intervals—typical of repetitive or hard-to-map regions where reads become multi-mappers.

<div align="center">
    <img src="parabricks_mq.png" alt="Mapping quality of FQ2BAM" width="600"/>
</div>

The main visual difference is in how concentrated those problematic regions look: FQ2BAM appears slightly more uniform overall but shows a prominent dense block toward the end of the reference with a stronger/extended low-MAPQ signal, whereas BWA-MEM2 shows a more evenly distributed set of chromosome blocks with more frequent narrow MAPQ dips across many chromosomes. Net effect: both pipelines deliver broadly comparable mapping confidence, with differences mainly in where (and how strongly) low-confidence alignments accumulate.

<div align="center">
    <img src="bwa_mem2_mq.png" alt="Mapping quality of BWA-MEM2" width="600"/>
</div>


### Acklowledgement

Thanks a lot to Björn Grüning and Mira Kuntz for integration on European Galaxy server and NVIDIA team for their support and exaplanations.

 








