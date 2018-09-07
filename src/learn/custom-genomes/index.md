---
title: Custom Genomes
---

[Support Hub](/src/support/index.md)

[Learning Hub](/src/learn/index.md)

---

# What is a "Custom Reference Genome" ?

A reference genome contains the nucleotide sequence of the chromosomes, scaffolds, transcripts, or contigs for a single species. It is representative of a specific genome build or release. 

In [Galaxy](http://usegalaxy.org), a **custom reference genome** is a [FASTA](/src/learn/datatypes/index.md#fasta) formatted [dataset](/src/learn/index.md#datasets) that can be used in place of a **native reference genome** with most tools. 
* **custom**: a dataset *from the history* loaded by users
* **native**: *local* or *cached* by administrators (see [Admin/DataPreparation](/src/admin/data-preparation/index.md))

# Overview

There are **five basic steps** to using a *Custom Reference Genome*:
* Obtain a **[FASTA](/src/learn/datatypes/index.md#fasta) copy of the target genome**
* **[FTP](/src/FTPUpload/index.md) the genome to Galaxy** and load into a history as a [dataset](/src/learn/index.md#datasets)
* **Clean up the format** with the tool **NormalizeFasta** using the options to wrap sequence lines at 80 bases and to trim the title line at the first whitespace. 
* Make sure the [chromosome identifiers](https://galaxyproject.org/support/chrom-identifiers) are a match for other inputs
* **Set a tool form's options to use a custom reference genome from the history** and select the loaded genome

# Screencasts & Tutorials

| Screencast |  Topic  | 
| ---------- | ------ | 
| **[NGS101-8 Mapping to YOUR Reference](https://vimeo.com/123108417)** |  demonstrates **BWA-MEM** tool form options using a custom genome from the history  | 
| **[Custom Genomes](https://vimeo.com/75918922)** |  explains format, usage, and how to load a genome that works with tools  | 

# Sources

* UCSC, Ensembl, NCBI[/GenBank](/src/learn/custom-genomes/GenBank/index.md)
* Other Research project associated with specific genome projects
* Internal research projects
* Selected genomes can be found in "Data Libraries" on [Main](/src/main/index.md) for use at [http://usegalaxy.org](http://usegalaxy.org). Example: **hg19** is available for GATK under that sub-directory.

# Format

* Custom Genomes are required to be in [FASTA](/src/learn/datatypes/index.md#fasta) format
* The data should be formatted as [FASTA](/src/learn/datatypes/index.md#fasta) prior to upload into Galaxy
* The dataset will need to be labeled as [FASTA](/src/learn/datatypes/index.md#fasta) after loaded (if not automatically assigned)
* Did you use **NormalizeFasta** with the options to wrap sequence lines at 80 bases and to trim the title line at the first whitespace?

# Custom Builds

Some tools and functions require that the ['database' attribute is assigned](/src/support/index.md#tool_doesn27t_recognize_dataset) or that a Custom Reference Genome is set up as a *Custom Build* prior to use. Examples are the tools **Featurecounts**, **Extract Genomic DNA**, certain **Picard** tools, and the functions under  **Visualization**. 

Once created, a *Custom Build* is added to the list **Database/Build:** on the dataset 'Edit Attributes' and 'Upload File' tool forms and is available for 'Visualizations'. These can be assigned or used just like any other reference genome. 

* Start with an existing fasta Custom Reference Genome in your history. It is *very important* make sure the [format](/src/learn/custom-genomes/#format) is correct.
* Go to the top "User" menu and select "Custom Builds"
* Enter in the labels (no spaces and no special characters other than "_")
* Select the fasta Custom Reference Genome
* Submit and wait for the build to finish loading before assigning to a dataset or using to start a new Visualization 
* Note: It is fine to navigate away from this form and come back to it later to check for status. The larger the fasta file and busier the Galaxy instance is, the longer the processing will take.

# Sorting

Certain tools expect that reference genomes are sorted in [lexicographical order](http://en.wikipedia.org/wiki/Lexicographical_order). These tools are often downstream of the initial mapping tools, which means that a large investment in a project has already been made (i.e. a long mapping process), before a problem with sorting pops up in conclusion layer tools. No one likes to start over!

How to avoid? Always sort your [FASTA](/src/learn/datatypes/index.md#fasta) reference genome dataset at the beginning of a project. Many sources only provide sorted genomes, but double checking is your own responsibility, and super easy in Galaxy. So easy that there isn't even a shared workflow, just a recipe (but feel free to make your own):

Quick lexicographical sort recipe:

```
1. Convert Formats -> FASTA-to-Tabular
2. Filter and Sort -> Sort
       on column: c1 
       with flavor: Alphabetical
       everything in: Ascending order
3. Convert Formats -> Tabular-to-FASTA
```


The above sorting method is for most tools, but not all. In particular, GATK tools have a tool-specific sort order requirement. The [Broad Institute](http://www.broadinstitute.org) FAQ with input format instructions is **[here](http://www.broadinstitute.org/gark/guide/article?id=1204)**.

# Troubleshooting

If a custom genome dataset is producing errors, double check the format and that the chromosome identifiers between **ALL** inputs. Clicking on the green bug icon ![](/src/images/icons/bug.png) will often provide a description of the problem. This does not automatically submit a bug report, and it is not always necessary to do so, but it is a good way to get more information about why a job is failing.

### 1. Custom genome not assigned as <a href='/src/learn/datatypes/index.md#fasta'>FASTA</a> format
  * **Symptoms include**: Dataset not included in custom genome pull down menu on tool forms.
  * **Solution**: Check datatype assigned to dataset and assign **fasta** format.
  * **How**: Click on the dataset's pencil icon <img src="/src/images/icons/pencil.png" /> to reach the "Edit Attributes" page, and in the <a href='/src/learn/datatypes/index.md'>datatypes</a> section, type in "fasta", and save.

### 2. Incomplete Custom genome file load
  * **Symptoms include**: Tool errors result the first time you use the Custom genome.
  * **Solution**: Use <strong>Text Manipulation &rarr; Select last lines from a dataset</strong> to check last 10 lines to see if file is truncated.
  * **How**: Reload the dataset (switch to <strong><a href='/src/FTPUpload/index.md'>FTP</a></strong> if not using already). Check your FTP client logs to make sure the load is complete.

### 3. Extra spaces, extra lines, inconsistent line wrapping, or any deviation from strict <a href='/src/learn/datatypes/index.md#fasta'>FASTA</a> format
  * **Symptoms include**: RNA-seq tools (<strong>Cufflinks, Cuffcompare, Cuffmerge, Cuffdiff</strong>) fails with error <code>Error: sequence lines in a FASTA record must have the same length!</code>.
  * **Solution**: File tested and corrected locally then re-upload or test/fix within Galaxy, then re-run.
  * **How**: 
   * **Quick re-formatting** Run the tool through the tool **NormalizeFasta** using the options to wrap sequence lines at 80 bases and to trim the title line at the first whitespace. 
   * **Optional Detailed re-formatting** Start with <strong>FASTA manipulation &rarr; FASTA Width formatter </strong> with a value between 40-80 (60 is common) to reformat wrapping. Next, use <strong>Filter and Sort &rarr; Select</strong> with ">" to examine identifiers. Use a combination of <strong>Convert Formats &rarr; FASTA-to-Tabular</strong>, <strong>Text Manipulation</strong> tools, then <strong>Tabular-to-FASTA</strong> to correct. 
   * **With either of the above**, finish by using <strong>Filter and Sort &rarr; Select</strong> with `^\w*$` to search for empty lines (use "NOT matching" to remove these lines and output a properly format fasta dataset).

### 4. Inconsistent line wrapping, common if merging chromosomes from various Genbank records (e.g. primary chroms with mito)
  * **Symptoms include**: Tools (<strong>SAMTools</strong>, <strong>Extract Genomic DNA</strong>, but rarely alignment tools) may complain about unexpected line lengths/missing identifiers. Or they may just fail for what appears to be a cluster error.
  * **Solution**: File tested and corrected locally then re-upload or **test/fix within Galaxy**.
  * **How**: Use <strong>**NormalizeFasta**</strong> using the options to wrap sequence lines at 80 bases and to trim the title line at the first whitespace. Finish by using <strong>Filter and Sort &rarr; Select</strong> with `^\w*$` to search for empty lines (use "NOT matching" to remove these lines and output a properly format fasta dataset).

### 5. Unsorted fasta genome file
  * **Symptoms include**: Tools such as <strong>Extract Genomic DNA</strong> report problems with sequence lengths.
  * **Solution**: First try sorting and re-formatting in Galaxy then re-run.
  * **How**: To sort, follow instructions for <a href='/src/learn/custom-genomes/index.md#sorting'>Sorting</a> a Custom Genome.
 
### 6. Identifier and Description in ">" title lines used inconsistently by tools in the same analysis
  * **Symptoms include**: Will generally manifest as a false genome-mismatch problem. 
  * **Solution**: Remove the description content and re-run all tools/workflows that used this input. Mapping tools will usually not fail, but downstream tools will. When this comes up, it usually means that an analysis needs to be started over from the mapping step to correct the problems. No one enjoys redoing this work. Avoid the problems by formatting the genome, by double checking that the same reference genome was used for all steps, and by making certain the 'identifiers' are a match between all planned inputs (including reference annotation such as GTF data) **before using your custom genome**. 
  * **How**: To drop the title line description content, use **NormalizeFasta** using the options to wrap sequence lines at 80 bases and to trim the title line at the first whitespace. Next, double check that the [chromosome identifiers are an exact match between all inputs](https://galaxyproject.org/support/chrom-identifiers).

### 7. Unassigned database
  * **Symptoms include**: Tools report that no build is available for the assigned reference genome.
  * **Solution** This occurs with tools that require an assigned <em>database</em> metadata attribute. **SAMTools** and **Picard** often require this assignment.
  * **How**: Create a <a href='/src/learn/custom-genomes/index.md#custom_builds'>Custom Build</a> and assign it to the dataset 

# A problem or not a problem?
Certain job errors with RNA-seq tools can at first appear to look like a format problem with a custom reference genome, but are actually a bit more complicated...

### A. Did you use the same exact reference genome for all steps in the same analysis pipeline?

Alignment tools (BWA, Bowtie, Tophat) are generally tolerant of minor formatting problems with reference genomes. However, downstream tools tend to have more stringent format requirements. To avoid having to reprocess, **a best practice is to verify that the formatting is correct before any steps are started**.

### B. Any tool, including Cufflinks/merge/diff, reports a missing/problem transcripts.gtf file. 

This generally indicates a mismatch in the chromosome identifiers between the reference genome used for the mapping/alignment step, and the reference annotation GTF data and/or the reference genome used in downstream steps.

### C. What if the inputs are truly not a match?

The problem can sometimes be corrected by altering the chromosome identifiers in the GTF file or the reference genome. However, making changes can introduce scientific genome-mismatch problems. It is generally much better to find reference data (genomes, reference files) that are confirmed to be a match.
