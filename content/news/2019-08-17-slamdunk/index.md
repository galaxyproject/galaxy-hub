---
title: Slamdunk - SLAMseq analysis for nucleotide-conversion sequencing datasets
date: '2019-08-17'
tease: SLAMseq analysis for nucleotide-conversion sequencing datasets
tags: [tools]
subsites: [eu, freiburg, global, us]
main_subsite: freiburg
---

Methods to read out naturally occurring or experimentally introduced nucleic acid modifications are emerging as powerful tools to study dynamic cellular processes. The recovery, quantification and interpretation of such events in high-throughput sequencing datasets demands specialized bioinformatics approaches.

One of such methods is [SLAMseq](http://doi.org/10.1038/nmeth.4435), a sequencing technology for time-resolved measurement of newly synthesized and existing RNA in cultured cells. Originally developed by the lab of [Stefan Ameres](https://www.imba.oeaw.ac.at/research/stefan-ameres/), the lab of [Johannes Zuber](https://www.imp.ac.at/groups/johannes-zuber/) extended the approach with pharmacological and chemical-genetic perturbations in order to identify direct transcriptional targets of any gene or pathway ([Muhar et al, Science 2018](http://doi.org/10.1126/science.aao2793)).

Processing and interpreting this data required novel analysis methods, so we developed [Slamdunk](https://t-neumann.github.io/slamdunk/) which we recently published in [BMC Bioinformatics](http://doi.org/10.1186/s12859-019-2849-7) and is generally applicable to any nucleotide-conversion containing dataset.

## Workflows

Two workflows have been developed for *Slamdunk* and are available

- [Slamdunk](http://t-neumann.github.io/slamdunk/docs.html#all): This workflow quickly produces, from raw SLAMseq data, robust and reproducible nucleotide-conversion quantifications in a set of given genomic intervals

    <div class="multiple-img">
        <img src="/assets/media/2019-10-19-slamdunk_outline.png" width="800px" alt="Slamdunk outline" />
    </div>

- [Alleyoop](http://t-neumann.github.io/slamdunk/docs.html#document-Alleyoop): This analysis will run several QC tools on the produced SLAMseq datasets from *Slamdunk* and present in a ready-to-go [MultiQC](https://multiqc.info/) report as shown below.

<div class="multiple-img">
    <img src="/assets/media/2019-10-19-multiqc.png" width="800px" alt="Slamdunk MultiQC" />
</div>

## Credit

<embed src="https://bmcbioinformatics.biomedcentral.com/track/pdf/10.1186/s12859-019-2849-7" width="100%" height="700" type='application/pdf'>
