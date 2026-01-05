---
title: "GPU-accelerated genome mapper Parabricks FQ2BAM is now in Galaxy"
date: "2025-12-15"
authors: Anup Kumar 
tease: "NVIDIA Parabricks GPU-accelerated FQ2BAM is now available in Galaxy, bringing FASTQ-to-BAM alignment runtime to just a few minutes for 2.5 GB paired-end human whole-genome datasets. Its runtime is benchmarked against BWA-MEM2 and BWA across five runs and shows that mapping and QC metrics remain essentially identical to CPU-based alignment—while delivering a major speedup for Galaxy workflows."
subsites: [global,eu,us,freiburg]
---

# Parabricks FQ2BAM mapper

NVIDIA's [Parabricks](https://docs.nvidia.com/clara/parabricks/latest/gettingstarted/gettingthesoftware.html#running-nvidia-parabricks) developed a GPU-accelerated tool suite for genomic analysis. One of the tools from the suite is [FQ2BAM](https://docs.nvidia.com/clara/parabricks/latest/documentation/tooldocs/man_fq2bam.html) which accelerates mapping of DNA reads. It is now integrated into Galaxy and runs on a GPU to generate read alignments in a few minutes for zipped paired-end FASTQ reads of size 2.5 GB. It is a drop-in replacement for BWA-MEM2 while maintaining nearly identical mapping characteristics such as achieving 99.6% mapped reads and 31.4 mean mapping quality for the paired-end FASTQ reads, the same achieved by BWA-MEM2. [FQ2BAM](https://docs.nvidia.com/clara/parabricks/latest/documentation/tooldocs/man_fq2bam.html) tool wraps BWA-MEM2 to perform alignment from FASTQ to BAM and then handles downstream processing such as sorting, with optional steps for duplicate marking and base-quality score recalibration.


## FQ2BAM vs BWA-MEM2 runtime comparison (on gzipped paired-end FASTQ files of the human genome, each of size approximately 2.5 GB)

Across five repeated runs, the three mapping tools separate very clearly in speed:

- FQ2BAM (1 GPU and 8 CPU cores) was consistently the fastest: 5–8 min per run.

- BWA-MEM2 (8 cores) came next but showed large variability: 14–40 min (median 16 min, mean 23.2 ± 11.4 min (SD)). Most runs are clustered around ~14–16 min, but one slow run (40 min) noticeably widened the distribution.

- BWA (8 cores) was the slowest overall yet fairly steady: 34–46 min (median 38 min, mean 39.0 ± 4.5 min (SD)), making it predictable but substantially longer.

<div align="center">
    <img src="runtimes.png" alt="Runtime comparison of FQ2BAM with BWA-MEM2" width="600"/>
</div>

In terms of typical (median) speed, FQ2BAM (1 GPU and 8 cores) is approximately 3-4x faster than BWA-MEM2 (8 cores) and 6-7x faster than BWA (8 cores). FQ2BAM achieves superior performance on runtime optimizing throughput for Galaxy users. It will prove to be a game changer for faster genomic analyses while running Galaxy workflows. BWA-MEM2 is usually much faster than BWA but less consistent, and BWA remains the slow, steady baseline.


## FQ2BAM vs BWA-MEM2 mapping statistics

The alignment files (BAM) from FQ2BAM and BWA-MEM2 tools are analysed using QualiMap BamQC tool to compare various mapping statistics on the same human reads. Both alignments are essentially identical in overall mapping performance: they use the same reference size (3,209,286,105 hg38) and number of reads (53,317,838), and both achieve approximately 99.6% mapped reads (53,102,797 for FQ2BAM vs 53,102,800 for BWA-MEM2) with only approximately 0.4% unmapped. Paired-end behavior is also nearly the same (approximately 99.24% “both in pair”) and supplementary alignments are comparable (approximately 0.09%).

<div align="center">
    <img src="parabricks_qm.png" alt="Runtime comparison of FQ2BAM with BWA-MEM2" width="600"/>
</div>

FQ2BAM reports 11.2M duplicate reads flagged as duplicates (21.01%) and "duplicated reads skipped" consistent with duplicates being explicitly marked and handled in that pipeline, while the BWA-MEM2 report shows 0 flagged duplicates but a large estimated duplicate count (33.7M; duplication rate 46.16%), suggesting duplicates were not marked and QualiMap BamQC inferred them instead. BWA-MEM2 also has more overlapping read pairs (26.08% vs 20.36%) and slightly more clipped reads (1.29% vs 1.07%), indicating small differences in alignment/fragment handling even though the headline mapping rates are the same.

<div align="center">
    <img src="bwa-mem2_qm.png" alt="Runtime comparison of FQ2BAM with BWA-MEM2" width="600"/>
</div>


### FQ2BAM vs BWA-MEM2 mapping quality comparison

In both "mapping quality across the reference" plots, FQ2BAM and BWA-MEM2 show a very similar overall pattern: the mapping quality stays close to the maximum (around ~60) across most of the genome, indicating that the majority of reads are placed confidently. In both cases, there are sharp, localized drops to low/near-zero mapping quality at specific genomic intervals—typical of repetitive or hard-to-map regions where reads become multi-mapping reads.

<div align="center">
    <img src="parabricks_mq.png" alt="Mapping quality of FQ2BAM" width="600"/>
</div>

While both tools deliver broadly comparable mapping confidence, BWA-MEM2 output (BAM file) often preserves the contig order coming from the FASTA at alignment time (resembling more “alphabetical” depending on how that FASTA is ordered) but FQ2BAM output follows a different sequence order (chr1, chr10 appearing first and then blocks of "_alt" (alternate loci) and "chrUn_*" (unplaced) contigs).

<div align="center">
    <img src="bwa_mem2_mq.png" alt="Mapping quality of BWA-MEM2" width="600"/>
</div>

MultiQC tool produces the following plots showing similar outcomes of alignments by FQ2BAM and BWA-MEM2.

<div align="center">
    <img src="parabricks_mqc.png" alt="Mapping quality of FQ2BAM via MultiQC" width="600"/>
</div>

<div align="center">
    <img src="bwa_mem2_mqc.png" alt="Mapping quality of BWA-MEM2 via MultiQC" width="600"/>
</div>

### Workflow invocation

The [Galaxy workflow invocation](https://usegalaxy.eu/workflows/invocations/9b028594c3ddbf80) plot shows comparison between FQ2BAM, BWA-MEM2 and BWA across several parameters. The individual runtimes of mappers are: BWA (~45 min), BWA-MEM2 (~12 min) and FQ2BAM (~6 min), being the fastest. 

<div align="center">
    <img src="wf_invocations.png" alt="Workflow invocation metrics comparing runtimes of FQ2BAM, BWA_MEM2 and BWA" width="600"/>
</div>

In terms of compute usage, allocated core time, BWA takes around 360 minutes, followed by BWA-MEM2 (around 100 minutes) and FQ2BAM (around 40 minutes). Overall, FQ2BAM, accelerated by GPU, achieves the best runtime compared to standard mappers such as BWA-MEM2 running on CPUs.

### Resources

- The Galaxy history for the above analysis is linked [here](https://usegalaxy.eu/u/kumara/h/benchmarking-of-fq2bam-with-bwa-mem2-and-bwa).
- Try out the [FQ2BAM tool](https://usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fparabricks_fq2bam%2Fparabricks_fq2bam%2F4.6.0-1%2Bgalaxy1&version=latest) available on European Galaxy server.
- [Galaxy workflow invocation](https://usegalaxy.eu/workflows/invocations/9b028594c3ddbf80)


### Acknowledgements

Thanks a lot to Wolfgang Maier, Michael Schatz, Björn Grüning and Mira Kuntz for helping in the development and integration on the European Galaxy server, NVIDIA team (Ben Busby, Daniel Puleri, Tong Zhu and others) for their support and explanations and everyone involved in making this possible.