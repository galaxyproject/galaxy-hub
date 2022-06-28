---
title: Chromosome Identifiers in Reference Genomes (and other -omes)
---

**[Back to Support Hub](/support/)**
**[Troubleshooting Help](/support/#troubleshooting)**


# [How to correct errors linked to inputs having non-identical chromosome identifiers?](https://training.galaxyproject.org/training-material/faqs/galaxy/datasets_chromosome_identifiers.html)

## [Find BAM dataset identifiers](https://training.galaxyproject.org/training-material/faqs/galaxy/datasets_BAM_dataset_identifiers.html)


## [Directly obtain UCSC sourced *genome* identifiers](https://training.galaxyproject.org/training-material/faqs/galaxy/datasets_UCSC_sourced_genome.html)


## Adjusting Identifiers or Input source


### UCSC sourced data used with Other sourced data

A GTF formatted dataset (potentially a "reference annotation dataset"), with Ensembl/UCSC/Other based chromosome identifiers, is to be used with a tool that also makes use of a different sourced reference genome

Or, the reverse may be true, Ensembl/UCSC/Other sourced reference genome and a different sourced reference annotation

*The underlying genome sequence content is otherwise identical.* If not, see the next section for alternative methods.

*Method 4*

To adjust the Ensembl/Other reference annotation to match a UCSC-sourced reference genome (or another source that uses UCSC-style chromosome names), add a "chr" to the chromosome name, so that "N" becomes "chrN". Using tools from the group "Text Manipulation". Examples below.

For **[bed](/learn/datatypes/#bed)** data:

1. Tool **Add column**: add "chr" to the original dataset as a new column.
1. Tool **Merge Columns**: merge "c7" with "c1"
1. Tool **Cut**: cut "c8,c2,c3,c4,c5,c6" (replace c1 & c7 - with merged c8 - the new chrom identifier)
1. Click on the pencil icon for the result dataset, then the tab for "Datatype". Assign "bed" and save. Allow the metadata to complete assignment (the "yellow" dataset state)
1. Now click on the tab for "Attributes" and assign the remaining columns. Strand = 6, name = 4, and score = 5. Save. For best results with certain downstream tools, allow the metadata to complete assignment

For **[wig/wiggle](/learn/datatypes/#wig-and-bigwig)** data (NOT compressed bigWig):

1. Tool **Replace parts of text**
1. File to process: Use Multi-select select wig datasets to fix (one or more)
1. Find pattern: chrom=
1. Replace with: chrom=chr
1. Remainder of options left at default

### Any mixed sourced data

The inputs are a match for sequence content but simply adding "chr" will not make all chromosomes identifiers synch up between the inputs. How to fix or replace the inputs so that a match is possible.

*The underlying genome sequence content may or may not be identical.* Read method descriptions carefully to learn if that method is right for your usage case.

*Method 5*

**Sequence content is a match but adding "chr" is not enough to obtain an exact identifier match. You want to try to fix the identifiers anyway!!**

1. If the data is in a tabular format (BED, Interval, GTF -- with any headers removed first), and a suitable identifier mapping file can be obtained or created, the tool *Replace column by values which are defined in a convert file* can be used. Note that this will NOT work with BAM, VCF, Wiggle or other structured formats, as these are not tabular formatted data.
1. Manipulations with tools can often be used to split up a dataset, perform text substitutions and additions, concatenate datasets, and most other common operations one could do with command-line shell tools.
1. The dataset could also be downloaded locally to your computer and manipulated there using command-line tools or the text editor of choice.

*Method 6*

**Sequence content is a match but adding "chr" is not enough to obtain an exact identifier match. You DO NOT want to try to fix the identifiers or it is overly complicated or it is simply not possible to fix the data without an external reference mapping file (not always available).**

1. Obtain a reference annotation dataset that is a match for the reference genome used
1. Sometimes the source is the same for both
1. Sometimes the source is the same, but the content of the reference annotation is not ideal for the tools used
    - Example: The tool Cuffdiff makes use of specific attributes in the reference annotation (p_id, tss_id, gene_name). If these attributes are not present in the GTF dataset, the results will not be fully annotated and some calculations will be skipped
    - Use the iGenomes version of the reference annotation, as described below
    - Using Cuffdiff and the Gene ID is not present? Check your GTF file - the attribute gene_name is probably missing
4. Sometimes the source can be **iGenomes**, which does contain the extra specific attributes needed for RNA-seq and certain other operationsar
    - Example: The tool htseq-count is used and the attributes gene_id and transcript_id need to be distinct values (also true for the tool Cuffdiff for the best results)
    - Two sources: https://support.illumina.com/sequencing/sequencing_software/igenome.html and http://cole-trapnell-lab.github.io/cufflinks/igenome_table/index.html
    - Download the .tar file locally, uncompress it, then upload just the genes.gtf dataset to Galaxy
        - Note: the compression format .tar is not accepted by the Upload tool
        - If a .tar dataset is attempted to be uploaded, the load may fail or just the first file in the archive is uploaded (and it will not be the genes.gtf file)
5. [Genecode Genes](https://www.gencodegenes.org) is also an annotation source for some genome builds.
6. In summary:
    - For **Gencode**, copy the link to the GTF and paste it into the *Upload* tool. Hg38 data is here https://www.gencodegenes.org/. After it is loaded, remove the headers (lines that start with a "#") with the *Select* tool using the options "NOT Matching" with the regular expression `^#`. Once the formatting is fixed, change the datatype to be `gft` under Edit Attributes (pencil icon). The data will be given the datatype `gff` by default, which works fine with some tools and but not with others. Avoid the `gff3` version of this particular data (contains duplicated IDs and several RNA-seq tools do not work with annotation in that format anyway).
    - For **iGenomes**, the archive corresponding to the target genome/build needs to be locally downloaded, the tar archive unpacked, and then just the `genes.gtf` data uploaded to Galaxy (browse the local file, or use FTP). Find all available genome/builds here: https://support.illumina.com/sequencing/sequencing_software/igenome.html


*Method 7*

**Sequence content is NOT a match or you want to try using a different reference genome instead of a different reference annotation source (reverse of *Method 6* above).**

1. Map against the same reference genome that the reference annotation is based on
1. Where and if this reference genome is available will depend on the genome build
1. In most cases, the source will be the same for both
1. If loading your own genome, make sure it is formatted correctly as a Custom Genome
1. Promote the Custom Genome to a Custom Build and assign the genome/build metadata attribute to datasets
1. [Custom Reference Genome help](/learn/custom-genomes/)
1. Be aware that if the genome is large, this option may result in a memory failure. Try *Method 2* or consider moving to a local or cloud Galaxy where you can control the resources

## [A Note on Built-in Reference Genomes](https://training.galaxyproject.org/training-material/faqs/galaxy/datasets_chromosome_identifiers.html)


