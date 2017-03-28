---
 autotoc: true
 title: NCBI SRA Fastq
---
 
[Back to Support Hub](http://wiki.galaxyproject.org/support/)

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
