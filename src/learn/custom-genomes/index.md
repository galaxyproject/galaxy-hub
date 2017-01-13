---
autotoc: true
title: Custom Genomes
---


{{> Learn/LinkBox }}
<div class='right'></div>

# What is a "Custom Reference Genome" ?

A reference genome contains the nucleotide sequence of the chromosomes, scaffolds, or contigs for a single species, representative of a specific genome build or release. 

In [Galaxy](http://usegalaxy.org), a ** *custom* reference genome** is a [FASTA](/src/Learn/Datatypes/index.md#fasta) formatted [dataset](/src/Learn/index.md#datasets) that can be used in place of a ** *native* reference genome** with most tools. 
* **custom**: a dataset *from the history* loaded by users
* **native**: *local* or *cached* by administrators (see [Admin/DataPreparation](/src/Admin/DataPreparation/index.md))

# Overview

There are **three basic steps** to using a *Custom Reference Genome*:
* obtain a **[FASTA](/src/Learn/Datatypes/index.md#fasta) copy of the target genome**
* **[FTP](/src/FTPUpload/index.md) the genome to Galaxy** and load into a history as a [dataset](/src/Learn/index.md#datasets)
* **set a tool form's options to use a custom reference genome from the history** and select the loaded genome

<br />
# Screencasts & Tutorials


| Screencast |  Topic  | 
| ---------- | ------ | 
| **[NGS101-8 Mapping to YOUR Reference](https://vimeo.com/123108417)** |  demonstrates **BWA-MEM** tool form options using a custom genome from the history  | 
| **[Custom Genomes](https://vimeo.com/75918922)** |  explains format, usage, and how to load a genome that works with tools  | 

<br />
# Sources

* UCSC, Ensembl, NCBI[/GenBank](/src/Learn/CustomGenomes/GenBank/index.md)
* Other Research project associated with specific genome projects
* Internal research projects
* Selected genomes can be found in "Data Libraries" on [Main](/src/Main/index.md) for use at [http://usegalaxy.org](http://usegalaxy.org). Example: **hg19** is available for GATK under that sub-directory.

<br />
# Format

* Custom Genomes are required to be in [FASTA](/src/Learn/Datatypes/index.md#fasta) format
* The data should be formatted as [FASTA](/src/Learn/Datatypes/index.md#fasta) prior to upload into Galaxy
* The dataset will need to be labeled as [FASTA](/src/Learn/Datatypes/index.md#fasta) after loaded (if not automatically assigned)

<br />
# Custom Builds

Some tools and functions require that the ['database' attribute is assigned](/src/support/index.md#tool_doesn27t_recognize_dataset) or that a Custom Reference Genome is set up as a *Custom Build* prior to use. Examples are the tool **Extract Genomic DNA**, certain **Picard** tools, and the function **Visualization**. 

Once created, a *Custom Build* is added to the list **Database/Build:** on the dataset 'Edit Attributes' and 'Upload File' tool forms and is available for 'Visualizations'. These can be assigned or used just like any other reference genome. 

* Start with an existing fasta Custom Reference Genome in your history
* Go to the top "User" menu and select "Custom Builds"
* Enter in the labels (no spaces and no special characters other than "_")
* Select the fasta Custom Reference Genome
* Submit and wait for the build to finish loading before assigning to a dataset or using to start a new Visualization 
* Note: It is fine to navigate away from this form and come back to it later to check for status. The larger the fasta file and busier the Galaxy instance is, the longer the processing will take.

<br />
# Sorting

Many tool expect that reference genomes are sorted in [lexicographical order](http://en.wikipedia.org/wiki/Lexicographical_order). These tools are often downstream of the initial mapping tools, which means that a large investment in a project has already been made (i.e. a long mapping process), before a problem with sorting pops up in conclusion layer tools. No one likes to start over!

How to avoid? Always sort your [FASTA](/src/Learn/Datatypes/index.md#fasta) reference genome dataset at the beginning of a project. Many sources only provide sorted genomes, but double checking is your own responsibility, and super easy in Galaxy. So easy that there isn't even a shared workflow, just a recipe (but feel free to make your own):

quick lexicographical sort recipe:

```
1. Convert Formats -> FASTA-to-Tabular
2. Filter and Sort -> Sort
       on column: c1 
       with flavor: Alphabetical
       everything in: Ascending order
3. Convert Formats -> Tabular-to-FASTA
```


The above sorting method is for most tools, but not all. In particular, GATK tools have a tool-specific sort order requirement. The [Broad Institute](http://www.broadinstitute.org) FAQ with input format instructions is **[here](http://www.broadinstitute.org/gark/guide/article?id=1204)**.
<br />
# Troubleshooting

If a custom genome dataset is producing errors, clicking on the green bug icon ![](/src/images/Icons/bug.png) will often provide a description of the problem. This does not automatically submit a bug report, and it is not always necessary to do so, but it is a good way to get more information about why a job is failing

Common problems and solutions:

<table>
  <tr>
    <td> #</td>
    <td> <rowclass="th"> Problem </td>
    <td> Symptoms </td>
    <td> Tests </td>
    <td> Solution </td>
  </tr>
  <tr>
    <td> 1.</td>
    <td> Custom genome not assigned as <a href='/src/Learn/Datatypes/index.md#fasta'>FASTA</a> format </td>
    <td> Dataset not included in custom genome pull down menu on tool forms </td>
    <td> check datatype assigned to dataset </td>
    <td> Click on the dataset's pencil icon <img src="/src/images/Icons/pencil.png" /> to reach the "Edit Attributes" page, and in the <a href='/src/Learn/Datatypes/index.md'>datatypes</a> section, type in "fasta", and save </td>
  </tr>
  <tr>
    <td> 2.</td>
    <td> Incomplete file load </td>
    <td> Sometimes none if all steps run in Galaxy, or only downstream as data analysis inconsistencies. Errors can appear if some steps (such as Tophat) are run outside of Galaxy, but later steps (such as Cufflinks) are run in Galaxy. </td>
    <td> Use <strong>Text Manipulation &rarr; Select last lines from a dataset</strong> to check last 10 lines to see if file is truncated </td>
    <td> Reload (switch to <strong><a href='/src/FTPUpload/index.md'>FTP</a></strong> if not using already). Check your FTP client logs if used for prior load. Or just reload. </td>
  </tr>
  <tr>
    <td> 3.</td>
    <td> Extra spaces, extra lines, inconsistent line wrapping, any deviation from strict <a href='/src/Learn/Datatypes/index.md#fasta'>FASTA</a> format </td>
    <td> RNA-seq tools (<strong>Cufflinks, Cuffcompare, Cuffmerge, Cuffdiff</strong>, but not Tophat) fails with error <code>Error: sequence lines in a FASTA record must have the same length!</code>. </td>
    <td> File tested and corrected locally then re-upload or test/fix within Galaxy, then re-run </td>
    <td> Start with <strong>FASTA manipulation &rarr; FASTA Width formatter </strong> with a value between 40-80 (60 is common) to reformat wrapping. Next, use <strong>Filter and Sort &rarr; Select</strong> with ">" to examine identifiers. Use a combination of <strong>Convert Formats &rarr; FASTA-to-Tabular</strong>, <strong>Text Manipulation</strong> tools, then <strong>Tabular-to-FASTA</strong> to correct. Finally, use <strong>Filter and Sort &rarr; Select</strong> with "^$" to search for empty lines (use "NOT matching" to remove). </td>
  </tr>
  <tr>
    <td> 4.</td>
    <td> Inconsistent line wrapping, common if merging chromosomes from various Genbank records (e.g. primary chroms with mito) </td>
    <td> Tools (<strong>SAMTools</strong>, <strong>Extract Genomic DNA</strong>, but rarely alignment tools) may complain about unexpected line lengths/missing identifiers. </td>
    <td> File tested and corrected locally then re-upload or test/fix within Galaxy, then re-run </td>
    <td> Use <strong>FASTA manipulation &rarr; FASTA Width formatter </strong> with a value between 40-80 (60 is common) to reformat and re-run </td>
  </tr>
  <tr>
    <td> 5.</td>
    <td> Unsorted genome </td>
    <td> Tools such as <strong>Extract Genomic DNA</strong> report problems with sequence lengths, or <strong>GATK</strong> tools result with an error </td>
    <td> First try sorting in Galaxy and re-run. If still problem, file tested and corrected locally then re-upload, or test/fix as for #3 above </td>
    <td> To sort, follow instructions for <a href='/src/Learn/CustomGenomes/index.md#sorting'>Sorting</a> a Custom Genome </td>
  </tr>
  <tr>
    <td> 6.</td>
    <td> Identifier and Description in ">" lines used inconsistently by tools in the same analysis </td>
    <td> Will generally manifest as a false genome-mismatch problem. Solution is to get rid of the description content and re-run the workflow. </td>
    <td> Double check that the same reference genome was used for all steps and that the 'identifiers' are a match. </td>
    <td> To drop the description, <strong>Convert Formats &rarr; FASTA-to-Tabular</strong> splitting the identifier line into 2 columns, then run <strong>Convert Formats &rarr; Tabular-to-FASTA</strong> omitting the column with the description (c2). </td>
  </tr>
  <tr>
    <td> 7.</td>
    <td> Unassigned database </td>
    <td> Tools report that no build is available for the supplied reference genome </td>
    <td> This occurs with tools that require an assigned <em>database</em> attribute </td>
    <td> Create a <a href='/src/Learn/CustomGenomes/index.md#custom_builds'>Custom Build</a> and assign it to the dataset </td>
  </tr>
</table>


<br />
<br />
**A problem or not a problem?**
Certain job errors with RNA-seq tools can at first appear to look like a format problem with a custom reference genome, but are actually a bit more complicated...
* Cufflinks/merge/diff reports a missing/problem transcripts.gtf file. This generally indicates a mismatch in the chromosome identifiers between the reference genome used for the original (Tophat) alignment, the reference annotation GTF data, and the reference genome. 
* The problem can sometimes be corrected by altering the chromosome identifiers in the GTF file or the reference genome (see the RNA-seq FAQ: http://main.g2.bx.psu.edu/u/jeremy/p/transcriptome-analysis-faq).
* A quick solution is to not use the GTF file and/or to turn off the *bias correction* option on the tool form.
* The best solution is to use the same exact reference genome for all steps in the same analysis pipeline. Alignment tools (BWA, Bowtie, Tophat) are generally tolerant of minor formatting problems with reference genomes. However, downstream tools tend to have more stringent format requirements. To avoid having to reprocess, a best practice is to verify that the formatting is correct before any steps are started. 

----
