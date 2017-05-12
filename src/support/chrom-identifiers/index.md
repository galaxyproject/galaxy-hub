# Chromosome Identifier Mismatch Problems in Tool Inputs

**[Back to Support Hub](/src/support/index.md)**
**[Troubleshooting Help](/src/support/#troubleshooting)**

Methods described help to identify and correct errors or unexpected results linked to inputs having non-identical chromosome identifiers and/or different chromosome sequence content. 

**If using a Custom Reference genome**, the methods below also apply, but the first step is to make certain that the [Custom Genome is formatted correctly](/src/learn/custom-genomes/index.md). Improper formating is the most common root cause of CG related errors.

## Find BAM dataset identifiers

Quickly learn what the identifiers are in any BAM dataset.

*Method 1*

1. Run BAM-to-SAM on the aligned data outputting just the SAM header
2. The chromosomes will be listed in the header
3. Compare these chromosome identifiers between the chromosome (aka "Chrom") field in all other inputs: VCF, GTF, GFF(3), BED, Interval, etc.

## Directly obtain UCSC sourced *genome* identifiers

*Method 2*

1. Go to http://genome.ucsc.edu/, navigate to "genomes", then the species of interest
1. On the home page for the genome build, immediately under the top navigation box, in the blue bar next to the full genome build name, is linked text like "(sequences)"
1. Click on this and it will take you to a detail page with a table listing out the contents

*Method 3*

1. Use the tool "Get Data -> UCSC Main"
1. In the Table Browser, choose the target genome and build
1. For "group" choose the last option "All Tables"
1. For "table" choose "chromInfo"
1. Leave all other options at default and send the output to Galaxy
1. This new dataset will load as a tabular dataset into your history
1. It will list out the contents of the genome build, including the chromosome identifiers (in the first column)


## Adjusting Identifiers or Input source


### UCSC sourced data used with Other sourced data

A GTF formatted dataset (potentially a "reference annotation dataset"), with Ensembl/UCSC/Other based chromosome identifiers, is to be used with a tool that also makes use of a different sourced reference genome

Or, the reverse may be true, Ensembl/UCSC/Other sourced reference genome and a differnt sourced reference annotation

*The underlying genome sequence content is otherwise identical.* If not, see the next section for alternative methods.

*Method 4*

To adjust the Ensembl/Other reference annotation to match a UCSC-sourced reference genome (or another source that uses UCSC-style chromosome names), add a "chr" to the chromosome name, so that "N" becomes "chrN". Using tools from the group "Text Manipulation" do the following:

For tabular data (BED, Interval, GTF/GFF datasets with header removed):

1. Tool **Add column** = add "chr" to the original dataset as a new column.
1. Tool **Merge Columns** = merge "c7" with "c1"
1. Tool **Cut** = cut "c8,c2,c3,c4,c5,c6" (replace c1 & c7 - with merged c8 - the new chrom identifier)
1. Click on the pencil icon for the result dataset, then the tab for "Datatype". Assign "bed" and save. Allow the metadata to complete assignment (the "yellow" dataset state)
1. Now click on the tab for "Attributes" and assign the remaining columns. Strand = 6, name = 4, and score = 5. Save. For best results with certain downstream tools, allow the metadata to complete assignment

For wig/wiggle data:

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

1. Manipuations with tools can often be used to split up a dataset, perform text substitutions and additions, concatinate datasets, and most other common operations one could do with command-line shell tools. 
1. The dataset could also be downloaded locally to your computer and manipulated there using command-line tools or the text editor of choice.

*Method 6*

**Sequence content is a match but adding "chr" is not enough to obtain an exact identifier match. You DO NOT want to try to fix the identifiers or it is overly complicated or it is simply not possible to fix the data without an external reference mapping file (not always available).**

1. Obtain a reference annotation dataset that is a match for the reference genome used
1. Sometimes the source is the same for both
1. Sometimes the source is the same, but the content of the reference annotation is not ideal for the tools used 
 - Example: The tool Cuffdiff makes use of specific attributes in the reference annotation (p_id, tss_id, gene_name). If these attributes are not present in the GTF dataset, the resuls will not be fully annotated and some calculations will be skipped
 - Use the iGenomes version of the reference annotation, as described below
 - Using Cuffdiff and the Gene ID is not present? Check your GTF file - the attribute gene_name is probably missing
4. Sometimes the source can be **iGenomes**, which does contain the extra specific attributes needed for RNA-seq and certain other operationsar
 - Example: The tool htseq-count is used and the attributes gene_id and transcript_id need to be distinct values (also true for the tool Cuffdiff for the best results)
 - Two sources: https://support.illumina.com/sequencing/sequencing_software/igenome.html and http://cole-trapnell-lab.github.io/cufflinks/igenome_table/index.html
  - Download the .tar file locally, uncompress it, then upload just the genes.gtf dataset to Galaxy
  - Note: the compression format .tar is not accepted by the Upload tool
  - If a .tar dataset is attempted to be uploaded, the load may fail or just the first file in the archive is uploaded (and it will not be the genes.gtf file)

*Method 7*

**Sequence content is NOT a match or you want to try using a different reference genome instead of a different reference annotation source (reverse of *Method 6* above).**

1. Map against the same reference genome that the reference annotation is based on
1. Where and if this reference genome is available will depend on the genome build
1. In most cases, the source will be the same for both
1. If loading your own genome, make sure it is formatted correctly as a Custom Genome
1. Promote the Custom Genome to a Custom Build and assign the genome/build metadata attribute to datasets
1. [Custom Reference Genome help](/src/learn/custom-genomes/index.md)
1. Be aware that if the genome is large, this option may result in a memory failure. Try *Method 2* or consider moving to a local or cloud Galaxy where you can control the resources


