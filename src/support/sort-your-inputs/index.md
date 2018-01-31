---
title: Sorting your inputs
---
[Back to Support Hub](/src/support/index.md)

Many tools require inputs to be sorted in a specific way prior to use. 

Good news! Galaxy includes tools to do this sorting.

## Sorting tools

* **Picard SortSam**  Sort SAM/BAM by coordinate or queryname.
* **Samtools Sort** Alternate for SAM/BAM, best when used for coordiante sorting only.
* **SortBED order the intervals** Best choice for BED/Interval
* **Sort data in ascending or descending order** Alternate choice for Tabular/BED/Interval/GTF
* **VCFsort** Best choice for VFC
* **Tool Form Options for Sorting** Some tools have a tool form option to sort inputs during job execution. This uses more resources but is a choice. Whenever possible, _sort inputs before using tools_, especially if jobs are failing for not enough memory resources.

## Example tools and Tool groups that require input sorting 

The list is not comprehensive. If a tool fails, try sorting inputs as a first pass solution, whether this is declard or not on the tool form help. Cooridnate order is the most common ordering expected by tools. If queryname order is required, the tool form will usually declare that in the help.

### Htseq_count

Example error on bug report. 

```
job info:
This job was terminated because it used more memory than it was allocated.
Please click the bug icon to report this problem if you need help.
```

How to sort?

Set this option to **Yes**: _Force sorting of SAM/BAM file by NAME_

### NGS: SAMTools (most)

Example error on bug report. Yours may differ. If there is a problem, try sorting first before reporting a bug.

```
job stdout:
[samopen] SAM header is present: N sequences.
[bam_index_core] the alignment is not sorted (display_dataset_name): A-th chr > B-th chr
[bam_index_build2] fail to index the BAM file.
```

How to sort?

Try using *Coordinate sort* on the inputs with **SortSam** before using these tools. This is often required as a distinct step even if the input dataset states in the name that it is already sorted.


### NGS: Picard (most)

Tools can error for a variety of reasons that seem to be unrelated to sort order, including this one seen on the bug report (click on the green bug icon, but there is no need to submit the bug/error). Instead, coordinate sort and then rerun.

```
job info:
This job was terminated because it used more memory than it was allocated.
Please click the bug icon to report this problem if you need help.
```


### NGS: RNA-seq: Tophat, Cufflinks, Cuffmerge, Cuffdiff

Different errors can be reported and some may seem unrelated to sort order. Try sorting as a first pass troubleshooting solution.

If sorting does not work, it could be that your FASTQ data is not actually in *.fastqsanger* format. This occurs quite often in reported issues. For the quickest resolution, instead of reporting the bug and being sent back this link, first double check your data format directly.
* [How to format fastq data for tools that require .fastqsanger format?](/src/learn/fastqsanger/index.md)
* [Understanding compressed fastq data (fastq.gz)](/src/learn/compressed-fastq/index.md)
