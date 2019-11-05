---
title: "GVL Variant Detection Advanced Tutorial"
---
<div class='center'>
<a href='https://docs.google.com/document/pub?id=1CuKkKylVDb03tnN7RSWl5EUzleetn0ctjmvaidPKLxM'><img src="/src/images/logos/gvl-300.png" alt="Variant Detection Advanced Tutorial" height="200" /></a>
</div>





<div class='deploymentbox'>
 Resource:: **[GVL Variant Detection Advanced Tutorial](/src/teach/resource/gvl-variant-detection-advanced-tutorial/index.md)**
 Types:: Tutorial
 Domains:: **Variation** 
 Owners:: [Genomics Virtual Lab](https://genome.edu.au/wiki/About) by [University of Queensland, ](http://www.uq.edu.au) [Victorian Life Sciences Computation Initiative, ](http://www.vlsci.org.au/) [Queensland Facility for Advanced Bioinformatics, ](http://www.qfab.org//) and [Garvan Institute](http://www.garvan.org.au/)
 Formats:: Web Pages
 Date:: 2013/06 
</div>

[|This tutorial](https://docs.google.com/document/pub?id=1CuKkKylVDb03tnN7RSWl5EUzleetn0ctjmvaidPKLxM) runs on the [GVL Galaxy Tutorial Server](http://galaxy-tut.genome.edu.au/), a [public Galaxy server](/src/use/index.md) specifically for learning bioinformatics analysis.

In this tutorial we compare the performance of three statistically-based variant detection tools:
* SAMtools: Mpileup
* GATK: Unified Genotyper
* [FreeBayes](/src/FreeBayes/index.md)

Each of these tools takes as its input a BAM file of aligned reads and generates a list of likely variants in VCF format

## Needed Tools

This tutorial runs on the [GVL Galaxy Tutorial Server](http://galaxy-tut.genome.edu.au/).  All needed tools are on the server.

## Datasets

The data has been produced from human whole genomic DNA. Only reads that have mapped to a part of chromosome 20  have been used, to make the data suitable for an interactive tutorial. There are about one million 100bp reads in the dataset, produced on an Illumina HiSeq2000. This data was generated as part of the 1000 Genomes project: http://www.1000genomes.org/

Needed datasets exist in Shared Libraries on the server, and are also available via URL.

## Links

* [Variation Detection Advanced tutorial](https://docs.google.com/document/pub?id=1CuKkKylVDb03tnN7RSWl5EUzleetn0ctjmvaidPKLxM)
* [Genomics Virtual Lab](https://genome.edu.au/wiki/GVL)
* The [GVL Tutorials and Protocols page](https://genome.edu.au/wiki/Learn)
