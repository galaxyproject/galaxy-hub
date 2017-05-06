---
 title: NCBI SRA Fastq
---
[Back to Support Hub](http://wiki.galaxyproject.org/support/)

# Data retrieval with “NCBI SRA Tools” (fastq-dump)

This section will guide you through downloading experimental metadata, organizing the metadata to short lists corresponding to conditions and replicates, and finally importing the data from NCBI SRA in [**collections**](/src/tutorials/collections/index.md) reflecting the experimental design. 

### Downloading metadata

*It is critical to understand the condition/replicate structure of an experiment before working with the data so that it can be imported as collections ready for analysis.* Direct your browser to https://www.ncbi.nlm.nih.gov/Traces/study/ and in the search box enter GEO data set identifier (for example: GSE72018). Once the study appears, click the box to download the “RunInfo Table”.

### Organizing metadata

The “RunInfo Table” provides the experimental condition and replicate structure of all of the samples. Prior to importing the data, we need to parse this file into individual files that contain the sample IDs of the replicates in each condition. This can be achieved by using a combination of the ‘group’, ‘compare two datasets’, ‘filter’, and ‘cut’ tools **to end up with single column lists of sample IDs (SRRxxxxx) corresponding to each condition.**

### Importing data

We can now provide the files with SRR IDs to NCBI SRA Tools (fastq-dump) to import the data from SRA to Galaxy. By organizing the replicates of each condition in separate lists, **the data will be imported as “collections” that can be directly loaded to a workflow or analysis pipeline.**


# NCBI SRA sourced fastq data

In these [FASTQ](/src/learn/datatypes/#fastq) data:

* The quality score identifier (+) is sometimes not a match for the sequence identifier (@).
* The forward and reverse reads may be joined and need to be seperated into distinct datasets.
* Format problems of any kind can cause tool failures and/or unexpected results.
* Fix the problems before running any other tools (including **FastQC**, **Fastq Groomer**, or other QA tools) 

## Inconsistent sequence (@) and quality (+) identifiers

### Example

Notice that the sequence identifier for the quality score name ("+" line) is NOT one of these accepted formats:

* The same exact content is present for both the quality score name and the sequence name ("@" line)
* Quality score name is a single plus sign ("+") 

```
@MG00HS05:491:C7450ACXX:4:1101:1240:2223_forward/1
TTTGTGACTAATTGTATAACAGGTTATTTTAGTTTCTGTTCTGTGGAAAGTGCAAAGCATTCCAATAAGGGTTTTTATGTTTGCAAAGGAGAGTTTGTCTA
+SRR5330501.1 MG00HS05:491:C7450ACXX:4:1101:1240:2223 length=101
:??>D>,,,CDD8,C<EEI@@C;3<AF9:C+22+2A4E:11@C11?D9*?BDB*009)9*08?D9BEIDEI.@CA=6=A@A?D===@?;.;?>AAA;>>A#
```

### Solution

Correct the format by running the tool **Replace Text in entire line** with these options:

Find pattern: `^\+SRR.+`

Replace with: `+`

Note: If the quality score line is named like "+ERR" instead (or other valid options), modify the pattern search to match.

## Joined forward and reverse reads

**coming next**

### Example

### Solution
