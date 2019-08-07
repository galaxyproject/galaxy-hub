---
title: Help for Differential Expression Analysis
---
[Back to Support Hub](/src/support/index.md)

FAQs and Galaxy Help Q&A. Most tool errors have been discussed or have existing help:

* [My job ended with an error. What can I do?](/src/support/tool-error/index.md)
* [Support FAQs](/src/support/inde.md)
* [Galaxy Help](https://help.galaxyproject.org/)

Related topics

* [Tutorials](/src/learn/index.md)
* [Getting Inputs Right](/src/support/#getting-inputs-right)
* [Format help for Tabular/BED/Interval Datasets](/src/support/tabular/index.md)
* [Common datatypes explained](/src/learn/datatypes/index.md)
* [Search all Prior Q&A and Galaxy Resources](https://galaxyproject.org/search/)

# Tools

The error and usage help in this FAQ applies to:

* Deseq2
* Limma
* edgeR
* DexSeq
* Diffbind
* StringTie
* Featurecounts
* HTSeq
* Kalisto
* Salmon
* Sailfish
* DexSeq-count

# Troubleshooting Errors and Unexpected Results

Expect odd errors or content problems if any of the usage requirements below are not met:

1. Differential expression tools all require count dataset replicates when used in Galaxy. At least two per factor level and the same number per factor level. These must all contain unique content.
1. Factor/Factor level names should only contain alphanumeric characters and optionally underscores. Avoid starting these with a number and do not include spaces.
1. If the tool uses `Conditions`, the same naming requirements apply. `DiffBind` additionally requires that the first Condition is labeled as `Condition`.
1. Reference annotation should be in [GTF](/src/learn/datatypes/#gtf) format for most of these tools, with no header/comment lines. Remove all [GTF](/src/learn/datatypes/#gtf) header lines with the tool `Remove beginning of a file`. If any are comment lines are internal to the file, those should be removed. The tool `Select` can be used.
1. Make sure that if a [GTF](/src/learn/datatypes/#gtf) dataset is used, and tool form settings are expecting particular attributes, those are actually in your annotation file (example: gene_id).
1. [GFF3](/src/learn/datatypes/#gff3) data (when accepted by a tool) should have single `#` comment line and any others (at the start or internal) that usually start with a `##` should be removed. The tool `Select` can be used.
1. Avoid using [UCSC's](https://genome.ucsc.edu/) annotation. All [GTF](/src/learn/datatypes/#gtf) datasets from this source, unfortunately, have the same content populated for the transcript_id and gene_id values. Both are the "transcript_id", which create scientific content problems, effectively meaning that the counts will be summarized "by transcript" and not "by gene", even if labeled in the output as being "by gene". It is usually possible to extract gene/transcript in tabular format from other related tables. Review the Table Browser usage at [UCSC](https://genome.ucsc.edu/) for how to link/extract data or ask them for guidance if you need extra help to get this information for a specific data track.
1. If a [GTF](/src/learn/datatypes/#gtf) dataset is not available for your genome, a two-column [tabular](/src/learn/datatypes/#tabular-tab-delimited) dataset containing `transcript <tab> gene` can be used instead with most of these tools. Some reformatting of a different annotation file type might be needed. Tools in the groups under `GENERAL TEXT TOOLS` can be used. 
1. Make sure that if your count inputs have a header, the option `Files have header?` is set to `Yes`. If no header, set to `No`. 
1. Custom genomes/transcriptomes/exomes must be formatted correctly before mapping. FAQ: [Preparing and using a Custom Reference Genome or Build](/src/learn/custom-genomes/index.md)
1. Any reference annotation should be an exact match for any genome/transcriptome/exome used for mapping. Build and version matter. FAQ: [Mismatched Chromosome identifiers (and how to avoid them)](/src/support/chrom-identifiers/index.md)

# More Resources

Review the documentation for these tools to better understand the usage. Galaxy tutorials also cover the topic.* 

Tool publication/help links are usually at the very bottom of tool forms, review these links if they apply to the tools you are using.

* [Bioconductor Tools](https://bioconductor.org/)
* [Galaxy Training Network (GTN): Transcriptomics](https://training.galaxyproject.org/training-material/topics/transcriptomics/)




