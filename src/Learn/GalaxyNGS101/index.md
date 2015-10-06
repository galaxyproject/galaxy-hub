<div class="title">Galaxy NGS 101</div>

<div class='right'>TABLE_OF_CONTENTS</div>

This page is designed to serve as a comprehensive resource describing manipulation and analysis of NGS data. While it is designed to highlight the utility of Galaxy it will also provide information that is broadly applicable and can be used for teaching of big data biology. It is accompanied by a collection of [screencasts](https://vimeo.com/channels/884356).

![DifferentNGSTechniques](/Images/Images/NGS101/EncodeNatureGraphic.png)

## Overview of NGS technologies

This section contains quick explanations and important references for major sequencing technologies used today. It is regularly refreshed and kept up-to-date.

![454](/Images/Images/NGS101/454.jpeg)
<a href='https://vimeo.com/121286060'><img src='/Images/Images/NGS101/video.png' alt='454 Screencast' height="20" /></a> 
<a href='/attachment:Images/Images/NGS101/NGS101-454.pdf.md'><img src='/Images/Images/NGS101/pdf.png' alt='Slides' height="20" /></a>

**Publications:**
* [Description of 454 process - Margulies et al. (2005)](http://www.nature.com/nature/journal/v437/n7057/pdf/nature03959.pdf)
* [Overview of pyrosequencing methodology - Ronaghi (2001)](http://genome.cshlp.org/content/11/1/3)
* [History of pyrosequencing - Pål Nyrén (2007)](http://link.springer.com/protocol/10.1385/1-59745-377-3:1)
* [Properties of 454 data - Balzer et al. (2010)](http://bioinformatics.oxfordjournals.org/content/26/18/i420.full.pdf+html)
* [Errors in 454 data - Huse et al. (2007)](http://genomebiology.com/content/pdf/gb-2007-8-7-r143.pdf)

![Illumina](/Images/Images/NGS101/illumina.png)
<a href='https://vimeo.com/121178846'><img src='/Images/Images/NGS101/video.png' alt='Illumina Screencast' height="20" /></a> 
<a href='/attachment:Images/Images/NGS101/NGS101-Illumina.pdf.md'><img src='/Images/Images/NGS101/pdf.png' alt='Slides' height="20" /></a>

**Publications:**
* [Human genome sequencing on Illumina - Bentley et al. (2008)](http://www.nature.com/nature/journal/v456/n7218/pdf/nature07517.pdf)
* [Illumina pitfalls - Kircher et al. (2011)](http://www.biomedcentral.com/content/pdf/1471-2164-12-382.pdf)
* [Data quality 1 - Minoche et al. (2011)](http://genomebiology.com/content/pdf/gb-2011-12-11-r112.pdf)
* [Data quality 2 - Nakamura et al. (2010)](http://nar.oxfordjournals.org/content/39/13/e90.full-text-lowres.pdf)

![Ion](/Images/Images/NGS101/ion.jpeg)
<a href='https://vimeo.com/121289100'><img src='/Images/Images/NGS101/video.png' alt='IonTorrent Screencast' height="20" /></a> 
<a href='/attachment:Images/Images/NGS101/NGS101-Ion.pdf.md'><img src='/Images/Images/NGS101/pdf.png' alt='Slides' height="20" /></a>

**Publications:**
* [Semiconmductor non-optical sequencing - Rothberg et al. (2011)](http://www.nature.com/nature/journal/v475/n7356/full/nature10242.html)
* [Ion Torrent, Illumina, PacBio comparison - Quail et al. (2011)](http://www.biomedcentral.com/content/pdf/1471-2164-13-341.pdf)
* [Improving Ion Torrent Error Rates - Golar and Medvedev (2013)](http://bioinformatics.oxfordjournals.org/content/29/13/i344.full.pdf)  

![PacBio](/Images/Images/NGS101/pacBio.jpeg)
<a href='https://vimeo.com/121267426'><img src='/Images/Images/NGS101/video.png' alt='PacBio Screencast' height="20" /></a> 
<a href='/attachment:Images/Images/NGS101/NGS101-PacBio.pdf.md'><img src='/Images/Images/NGS101/pdf.png' alt='Slides' height="20" /></a>

**Publications:**
* [Single Molecule Analaysis at High Concentration - Levene et al. (2003)](http://www.sciencemag.org/content/299/5607/682.full.pdf)
* [ZMW nanostructures - Korlach et al. (2008)](http://www.pnas.org/content/105/4/1176.full)
* [Real Time Sequencing with PacBio - Eid et al. (2009)](http://www.sciencemag.org/content/323/5910/133.full)
* [Modification detection with PacBio - Flusberg et al. (2010)](http://www.nature.com/nmeth/journal/v7/n6/pdf/nmeth.1459.pdf)
* [Error correction of PacBio reads - Koren et al. (2012)](http://www.nature.com/nbt/journal/v30/n7/pdf/nbt.2280.pdf)
* [Transcriptome with PacBio - Taligner et al. (2014)](http://www.pnas.org/cgi/doi/10.1073/pnas.1400447111)
* [Resolving complex regions with PacBio - Chaisson et al. (2015)](http://dx.doi.org/10.1038/nature13907)

---------

## Getting data in

You can data in Galaxy using one of five ways:

1. **From your local computer** | [Video NGS101-1](https://vimeo.com/120901536) | This works best for small files.
2. **From FTP** | [Video NGS101-2](https://vimeo.com/120972739) | The FTP mechanism allows transferring large collections of files. This is the preferred mechanism for uploading large datasets to Galaxy.
3. **From the web** | [Video NGS101-3](https://vimeo.com/120973708) | Upload from the web works when URL (addresses) of data files are known
4. **From EBI short read archive** | [Video NGS101-4](https://vimeo.com/121187220) | This is the best way to upload published datasets deposited to EBI SRA. The problem is that not all datasets are available from EBI. #5 below explain how to deal with NCBI SRA datasets
5. **Fooling NCBI SRA to produce fastq on the fly** | [Video NGS101-5](https://vimeo.com/121190377) | A tricky but reliable way to get few datasets from NCBI SRA

-------

## Fastq manipulation and quality control

[Video NGS101-6](https://vimeo.com/123453134) | [Galaxy History](https://test.galaxyproject.org/u/anton/h/fastqc)

One of the first steps in the analysis of NGS data is seeing how good the data actually is. [FastQC](http://www.bioinformatics.babraham.ac.uk/projects/fastqc/) is a fantastic tool allowing you to gauge the quality of fastq datasets (and deciding whether to blame or not to blame whoever has done sequencing for you). 

<div class='right'><div class='center'><span style="font-size: smaller;">**B**. Hmmm...OK</span></div>![Bad fastq](/Images/Images/NGS101/fastqc-bad.png)<div class='center'><span style="font-size: smaller;">Position within read</span></div></div>
<div class='right'><div class='center'><span style="font-size: smaller;">**A**. Excellent</span></div>![Good fastq](/Images/Images/NGS101/fastqc-good.png)<div class='center'><span style="font-size: smaller;">Position within read</span></div></div>

Here you can see FastQC base quality reports (the tools gives you many other types of data) for two datasets: **A** and **B**. The **A** dataset has long reads (250 bp) and very good quality profile with no qualities dropping below phred value of 30. The **B** dataset is significantly worse with ends of the reads dipping below phred score of 20. The **B** reads may need to be trimmed for further processing. 

### Fastq has many faces

[Fastq](http://en.wikipedia.org/wiki/FASTQ_format) is not a very well defined format. In the beginning various manufacturers of sequencing instruments were free to interpret fastq as they saw fit, resulting in a multitude of fastq flavors. This variation stemmed primarily from different ways of encoding quality values as described [here](http://en.wikipedia.org/wiki/FASTQ_format). Today, [fastq sanger](http://www.ncbi.nlm.nih.gov/pubmed/20015970) version of the format is considered to be the standard form of fastq. Galaxy is using fastq sanger as the only legitimate input for downstream processing tools and provides [a number of utilities for converting fastq files](http://www.ncbi.nlm.nih.gov/pubmed/20562416) into this form (see **NGS: QC and manipulation** section of Galaxy tools). 

------------

## Mapping your data

Mapping of NGS reads against reference sequences is one of the key steps of the analysis. Basic understanding of how mapping works is just as important as knowing the effects of temperature and magnesium concentration on PCR reaction performance. Below is a list of key publications highlighting basic principles of current mapping tools:

* [How to map billions of short reads onto genomes? - Trapnell & Salzberg (2009)](http://www.nature.com/nbt/journal/v27/n5/full/nbt0509-455.html)
* [Bowtie 1 - Langmead et al. (2009)](http://genomebiology.com/content/10/3/R25)
* [Bowtie 2 - Langmead and Salzberg (2012)](http://www.nature.com/nmeth/journal/v9/n4/full/nmeth.1923.html)
* [BWA - Li and Durbin (2009)](http://bioinformatics.oxfordjournals.org/content/25/14/1754.long)
* [BWA - Li and Durbin (2010)](http://bioinformatics.oxfordjournals.org/content/26/5/589)
* [BWA-MEM - Li (2013)](http://arxiv.org/abs/1303.3997)
* [Bioinformatics Algorithms - Compeau and Pevzner (2014)](http://bioinformaticsalgorithms.com)

### Mapping against a pre-computed genome index

[Video NGS101-7](https://vimeo.com/123102338) | [Galaxy history](https://test.galaxyproject.org/u/anton/h/mapping-wbwa)

<div class='right'><div class='center'><span style="font-size: smaller;">Mapping against pre-computed (cached) index</span></div>![Cached genome](/Images/Images/NGS101/cached-genome.png)</div>

Mappers usually compare reads against a reference sequence that has been transformed into a highly accessible data structure called genome index. Such indices should be generated before mapping begins. Galaxy instances typically store indices for a number of publicly available genome builds. For example, the image on the right shows indices for hg38 version of the human genome. You can see that there are actually three choices: (1) **hg38**, (2) **hg38 canonical** and (3) **hg38 canonical female**. The **hg38** contains all chromosomes as well as all unplaced contigs. The **hg38 canonical** does not contain unplaced sequences and only consists of chromosomes 1 through 22, X, Y, and mitochondria. The 
**hg38 canonical female** contains everything from the canonical set with the exception of chromosome Y.  

### What if pre-computed index does not exist?
[Video NGS101-8](https://vimeo.com/123108417) | [Galaxy history](https://test.galaxyproject.org/u/anton/h/my-genome)

<div class='right'><div class='center'><span style="font-size: smaller;">Mapping against uploaded genome</span></div>![My genome](/Images/Images/NGS101/mygenome.png)</div>


If Galaxy does not have a genome you need to map against, you can upload your genome sequence as a FASTA file and use it in the mapper directly as shown on the right ("Load reference genome" is set to **History**). In this case Galaxy will first create an index from this dataset and then run mapping analysis against it.
 
----------

## Understanding and manipulating SAM/BAM datasets

The [SAM/BAM](ATTACHMENT_URLImages/Images/NGS101/SAMv1.pdf) format is an accepted standard for storing aligned reads (it can also store unaligned reads and some mappers such as BWA are accepting unaligned BAM as input). The binary form of the format (BAM) is compact and can be rapidly searched (if indexed). In Galaxy BAM datasets are always indexed (accompanies by a .bai file) and sorted in coordinate order. 

### Read groups

One of the key features of SAM/BAM format is the ability to label individual reads with readgroup tags. This allows pooling results of multiple experiments into a single BAM dataset. This significantly simplifies downstream logistics: instead of dealing with multiple datasets one can handle just one. Many downstream analysis tools such as variant callers are designed to recognize readgroup data and output results on per-readgroup basis. 

One of the best descriptions of BAM readgroups is on [GATK support site](http://gatkforums.broadinstitute.org/discussion/1317/collected-faqs-about-bam-files). We have gratefully stolen two tables describing the most important readgroup tags -- ID, SM, LB, and PL -- from GATK forum and provide them here.

<div class='center'>![SAM/BAM Readgroups](/Images/Images/NGS101/rg-description.png)</div>
As further described in the GATK forum: "*A concrete example may be instructive. Suppose I have a trio of samples: MOM, DAD, and KID. Each has two DNA libraries prepared, one with 400 bp inserts and another with 200 bp inserts. Each of these libraries is run on two lanes of an Illumina machine, requiring 3 x 2 x 2 = 12 lanes of data. When the data come off the sequencer, I would create 12 bam files, with the following @RG fields in the header*":<br />
<div class='center'>![Readgroup example](/Images/Images/NGS101/rg-example.png)</div>

The [following screencast](https://vimeo.com/123102338#t=1:40) shows how to add readgroups to a BAM dataset in Galaxy using Picard's [AddOrReplaceReadGroups](http://broadinstitute.github.io/picard/command-line-overview.html#AddOrReplaceReadGroups) tool.

### BAM manipulation

<div class='right'><div class='center'><span style="font-size: smaller;">Filtering BAM with BAMtools in Galaxy</span></div>![SAM/BAM Readgroups](/Images/Images/NGS101/BAM-filter.png)</div>
[Video NGS101-9 = Tweaking BAM](https://vimeo.com/123113197) | [Galaxy history](https://test.galaxyproject.org/u/anton/h/bam-tweaking)

We support four toolsets for processing of SAM/BAM datasets:

* [DeepTools](https://deeptools.github.io/) - a suite of user-friendly tools for the visualization, quality control and normalization of data from deep-sequencing DNA sequencing experiments.
* [SAMtools](http://www.htslib.org/) - various utilities for manipulating alignments in the SAM/BAM format, including sorting, merging, indexing and generating alignments in a per-position format.
* [BAMtools](ATTACHMENT_URLImages/Images/NGS101/bamtools.pdf) - a toolkit for reading, writing, and manipulating BAM (genome alignment) files.
* [Picard](http://broadinstitute.github.io/picard/) - a set of Java tools for manipulating high-throughput sequencing data (HTS) data and formats.

The [Screencast NGS101-9](https://vimeo.com/123113197) highlight de-duplication, filtering, and cleaning of a BAM dataset using BAMtools and Picard tools. 

----------

## Finding variants

<div class='right'><div class='center'><span style="font-size: smaller;">Variant calling (Nielsen et al. 2011)</span></div>![Variant Calling](/Images/Images/NGS101/variant-calling.png)</div>

Because of the efforts such as [the 1000 Genomes Project](http://www.1000genomes.org/), variant calling is one of the most developed areas of NGS analysis. Still, if you are interested in reliable finding of genetic variants it pays to understand how these approaches work. Below we provide a sampler of key publications on the subject.

* [Nielsen et al. 2011](http://www.nature.com/nrg/journal/v12/n6/pdf/nrg2986.pdf) - Genotype and SNP calling from NGS data  
* [Frazer et al. 2009](http://www.nature.com/nrg/journal/v10/n4/pdf/nrg2554.pdf) - Human genetic variation and its contribution to complex traits
* [Bamshad et al. 2011](http://www.nature.com/nrg/journal/v12/n11/pdf/nrg3031.pdf) - Exome sequencing as a tool for Mendelian disease gene discover 
* [Cooper and Shendure 2011](http://www.nature.com/nrg/journal/v12/n9/pdf/nrg3046.pdf) - Finding disease-causal variants in a wealth of genomic data
* [Garrison and Marth 2012](http://arxiv.org/pdf/1207.3907v2.pdf) - Haplotype-based variant detection from short-read sequencing
* [Paila et al. 2013](http://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1003153) - GEMINI: Integrative Exploration of Genetic Variation and Genome Annotations

### Non-diploid variant calling

[Video NGS101-10 = Non-diploid variant calling with NVC](https://vimeo.com/123442619) |  [Galaxy history](https://test.galaxyproject.org/u/anton/h/nond-nvc)
<br />
[Video NGS101-11 = Non-diploid variant calling with FreeBayes](https://vimeo.com/123449704) | [Galaxy history](https://test.galaxyproject.org/u/anton/h/nond-fb)

<div class='right'><div class='center'><span style="font-size: smaller;">Mitochondrial variants</span></div>![Heteroplasmies](/Images/Images/NGS101/mt-alleles.png)</div>

The 1000 Genomes was focused on surveying the genetic diversity of humans - a diploid organism. Yet the majority of life on Earth is non-diploid and represented by prokaryotes, viruses and their derivatives such as our own mitochondria. In non-diploid organisms allele frequencies can range anywhere between 0 and 100% and there could be multiple (not just two) alleles per locus. The main challenge associated with non-diploid variant calling is the ability to distinguish between sequencing noise (abundant in all NGS platforms) and true low frequency variants. Some of the early attempts to do this well have been accomplished on human mitochondrial DNA although the same approaches will work equally good on viral and bacterial genomes:

* [Rebolledo-Jaramillo et al. 2014](http://www.pnas.org/content/111/43/15474.abstract) - Maternal age effect and severe germ-line bottleneck in the inheritance of human mitochondrial DNA
* [Li et al. 2015](http://www.pnas.org/content/112/8/2491.abstract) - Extensive tissue-related and allele-related mtDNA heteroplasmy suggests positive selection for somatic mutations

-------

### Visualizing multiple datasets in Integrated Genome Viewer (IGV)

[Video NGS101-12 = Displaying multiple tracks in IGV](https://vimeo.com/123414437) 
<br />
<div class='right'><div class='center'><span style="font-size: smaller;">IGV displaying multiple tracks from Galaxy</span></div><div class='center'>![IGV](/Images/Images/NGS101/igv.png)</div></div>

Galaxy has a number of display applications allowing visualization of various datasets. IGV ([integrative genome viewer](https://www.broadinstitute.org/igv/)) is one of the most versatile applications for looking at positional genomic data. In Galaxy you can view Interval, BED, BAM, and VCF datasets in IGV. The [screencast](https://vimeo.com/123414437) shows how to do this.


-------
## Reference-based RNA-seq

[Video NGS101-14 = Mapping reads with TopHat](https://vimeo.com/channels/884356/128265983)<br />
[Video NGS101-15 = Reconstructing transcripts with CuffLinks](https://vimeo.com/channels/884356/128268401)<br />
[Video NGS101-16 = Processing CuffDiff output with Cummerbund](https://vimeo.com/channels/884356/128265982)<br />
[Galaxy RNA-seq workshop slides](https://speakerdeck.com/nekrut/structure-workshop)<br />
[Galaxy history containing the entire analysis](https://test.galaxyproject.org/u/anton/h/rna-seq-tophatcufflinks)

<div class='right'><div class='center'><span style="font-size: smaller;">TopHat/Cufflinks workflow by Trapnell et al.</span></div><div class='center'>![CuffLinks workflow](/Images/Images/NGS101/rnaSeqWorkFlow.png)</div></div>

There is a number of established strategies for performing RNA-seq analyses when the reference genome of an organism in question is available (for a recent comprehensive comparison see [an assement of spliced aligners](http://www.nature.com/nmeth/journal/v10/n12/full/nmeth.2722.html) and [an evaluation of transcript reconstruction methods](http://www.nature.com/nmeth/journal/v10/n12/full/nmeth.2714.html)).

The public Galaxy instance at http://usegalaxy.org has been successfully employing [Tuxedo](http://salzberg-lab.org/software/) suite of tools for references-based RNA-seq originating from Computational Biology and Genomics Lab at Johns Hopkins. However, there are also great resources such as [Oqtans](http://oqtans.org/) developed at the Memorial Sloan-Kettering Cancer Center and [others](/PublicGalaxyServers). Below are some of the key publications on the reference-based RNA-seq:

* [TopHat: discovering splice junctions with RNA-Seq - Trapnell et al. (2009)](http://bioinformatics.oxfordjournals.org/content/25/9/1105.short)
* [Transcript assembly and quantification by RNA-Seq reveals unannotated transcripts and isoform switching during cell differentiation - Trapnell et al. (2010)](http://nature.com/nbt/journal/v28/n5/full/nbt.1621.html)
* [Reference guided transcriptome analaysis with TopHat and CuffLinks - Trapnell et al. (2012)](http://www.nature.com/nprot/journal/v7/n3/full/nprot.2012.016.html)
* [TopHat2: accurate alignment of transcriptomes in the presence of insertions, deletions and gene fusions - Kim et al. 2013](http://genomebiology.com/2013/14/4/R36/abstract)
* [Improving RNA-Seq expression estimates by correcting for fragment bias - Roberts et al. (2013)](http://genomebiology.com/2011/12/3/R22)
* [Systematic evaluation of spliced alignment programs for RNA-seq data - Engström et al. (2013)](http://www.nature.com/nmeth/journal/v10/n12/full/nmeth.2722.html)
* [Assessment of transcript reconstruction methods for RNA-seq - Steijger et al. (2013)](http://www.nature.com/nmeth/journal/v10/n12/full/nmeth.2714.html)
* [Oqtans: The RNA-seq Workbench in the Cloud for Complete and Reproducible Quantitative Transcriptome Analysis - Sreedharan et al. (2014)](http://bioinformatics.oxfordjournals.org/content/early/2014/01/10/bioinformatics.btt731.abstract)
* [HISAT: a fast spliced aligner with low memory requirements - Kim et al. (2015)](http://www.nature.com/nmeth/journal/vaop/ncurrent/full/nmeth.3317.html)
* [StringTie enables improved reconstruction of a transcriptome from RNA-seq reads - Petrea et al. (2015)](http://www.nature.com/nbt/journal/v33/n3/full/nbt.3122.html)

### Getting data and mapping to the reference

[Video NGS101-14 = Mapping reads with TopHat](https://vimeo.com/channels/884356/128265983)<br />

In this tutorial we are repeating the steps of a typical RNA-seq analysis described by Trapnell et al. ([2012](http://www.nature.com/nprot/journal/v7/n3/full/nprot.2012.016.html)) with one little exception: we have created a set of smaller input files to make this tutorial faster. These data can be accessed [here](https://usegalaxy.org/u/aun1/h/rna-seq-tutorial-data) as a Galaxy history. Simply click **import history** and use it as a starting point of your analysis. 

This analysis begins by uploading an annotation file from the [UCSC Table Browser](https://genome.ucsc.edu/cgi-bin/hgTables) and using it as a set of reference gene annotations. The data corresponds to two experimental conditions - Condition 1 and Condition 2 - each containing three replicates. In turn each replicate was sequenced as a mate-pair library and so has two associated datasets: forward and reverse. Thus (2 conditions) x (3 replicates) x (forward and reverse reads) = 2 x 3 x 2 = 12 datasets. We begin by using new Galaxy functionality - dataset collections - to bundle datasets into two collections: one corresponding to condition 1 and the other to condition 2. We then map the reads in each collection against **dm3** version of *Drosophila melanogaster* genome using !TopHat2. This generates (among other outputs) BAM outputs containing mapped reads.

### Reconstructing transcripts

[Video NGS101-15 = Reconstructing transcripts with CuffLinks](https://vimeo.com/channels/884356/128268401)<br />

<div class='right'><div class='center'><span style="font-size: smaller;">Expression levels for five transcripts of<br />a gene in conditions 1 (blue) and 2 (brown)</span></div><div class='center'>![CuffDiff plot](/Images/Images/NGS101/cuffdiffPlot.png)</div></div>

Reads mapped by !TopHat are then used as input to !CuffLinks - a tool that performs transcript reconstruction and quantification. This is done individually for every replicate (although because our data is bundled in collections this is a painless exercise). Once transcript reconstruction is finished we combine transcript model from all replicates and conditions into a single transcriptome using !CuffMerge. Finally, we perform differential expression analysis with !CuffDiff using the combined transcriptome and read mapping data. 

### Finding differentially expressed transcripts

[Video NGS101-16 = Processing CuffDiff output with Cummerbund](https://vimeo.com/channels/884356/128265982)<br />

Galaxy version of !CuffDiff used in the previous step produces a database. Using *Extract !CuffDiff data* and *Filter* tools we retrieve a list of differentially expressed genes and visualize expression level for transcripts of one such gene using !CummerBund.

### HISAT and StringTie

The mapping and transcript reconstruction steps of the reference-based RNA-seq analysis will soon be complemented with the addition of [HISAT](http://ccb.jhu.edu/software/hisat/index.shtml) and [StringTie](http://ccb.jhu.edu/software/stringtie/) tools. Stay tuned for updates.

--------

## What is coming next?

* RNA secondary structure prediction
* Reference-free RNA-seq with Trinity
* DNA/Protein Interactions
* 16S & shotgun metagenomics
* Visualization of NGS data


----
CategoryTrainingResource CategoryTrainingResource
