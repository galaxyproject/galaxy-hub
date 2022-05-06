---
title: Custom Genomes
---

[Support Hub](/support/)

[Learning Hub](/learn/)

---

# [What is a "Custom Reference Genome"?](https://training.galaxyproject.org/training-material/faqs/galaxy/datasets_custom_genomes.html)

# Screencasts & Tutorials

| Screencast |  Topic  |
| ---------- | ------ |
| **[NGS101-8 Mapping to YOUR Reference](https://vimeo.com/123108417)** |  demonstrates **BWA-MEM** tool form options using a custom genome from the history  |
| **[Custom Genomes](https://vimeo.com/75918922)** |  explains format, usage, and how to load a genome that works with tools  |

# Sources

* UCSC, Ensembl, NCBI/GenBank
* Other Research project associated with specific genome projects
* Internal research projects
* Selected genomes can be found in "Data Libraries" on [Main](/main/) for use at [http://usegalaxy.org](http://usegalaxy.org). Example: **hg19** is available for GATK under that sub-directory.

# Format

* Custom Genomes are required to be in [FASTA](/learn/datatypes/#fasta) format
* The data should be formatted as [FASTA](/learn/datatypes/#fasta) prior to upload into Galaxy
* The dataset will need to be labeled as [FASTA](/learn/datatypes/#fasta) after loaded (if not automatically assigned)
* Did you use **NormalizeFasta** with the options to wrap sequence lines at 80 bases and to trim the title line at the first whitespace?

# Custom Builds

Some tools and functions require that the ['database' attribute is assigned](/support/datatypes-and-tools/) or that a Custom Reference Genome is set up as a *Custom Build* prior to use. Examples are the tools **Featurecounts**, **Extract Genomic DNA**, certain **Picard** tools, and the functions under  **Visualization**.

Once created, a *Custom Build* is added to the list **Database/Build:** on the dataset 'Edit Attributes' and 'Upload File' tool forms and is available for 'Visualizations'. These can be assigned or used just like any other reference genome.

* Start with an existing fasta Custom Reference Genome in your history. It is *very important* make sure the [format](/learn/custom-genomes/#format) is correct.
* Go to the top "User" menu and select "Custom Builds"
* Enter in the labels (no spaces and no special characters other than "_")
* Select the fasta Custom Reference Genome
* Submit and wait for the build to finish loading before assigning to a dataset or using to start a new Visualization
* Note: It is fine to navigate away from this form and come back to it later to check for status. The larger the fasta file and busier the Galaxy instance is, the longer the processing will take.

# [Sorting](https://training.galaxyproject.org/training-material/faqs/galaxy/datasets_sorting_reference_genome.html)


# [Troubleshooting](https://training.galaxyproject.org/training-material/faqs/galaxy/datasets_troubleshooting_custom_genome.html)


# A problem or not a problem?
Certain job errors with RNA-seq tools can at first appear to look like a format problem with a custom reference genome, but are actually a bit more complicated...

### A. Did you use the same exact reference genome for all steps in the same analysis pipeline?

Alignment tools (BWA, Bowtie, Tophat) are generally tolerant of minor formatting problems with reference genomes. However, downstream tools tend to have more stringent format requirements. To avoid having to reprocess, **a best practice is to verify that the formatting is correct before any steps are started**.

### B. Any tool, including Cufflinks/merge/diff, reports a missing/problem transcripts.gtf file.

This generally indicates a mismatch in the chromosome identifiers between the reference genome used for the mapping/alignment step, and the reference annotation GTF data and/or the reference genome used in downstream steps.

### C. What if the inputs are truly not a match?

The problem can sometimes be corrected by altering the chromosome identifiers in the GTF file or the reference genome. However, making changes can introduce scientific genome-mismatch problems. It is generally much better to find reference data (genomes, reference files) that are confirmed to be a match.
