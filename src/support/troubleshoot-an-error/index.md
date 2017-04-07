---
title: Troubleshoot an Error
---
[Back to Support Hub](/src/support/index.md)

## Troubleshoot an Error

Please review THIS before submitting bug reports

*   Verify the _size/number of lines or md5sum between the source and Galaxy_. Use **Line/Word/Character count of a dataset** or **Secure Hash / Message Digest on a dataset** to do this.
*   Look at the _end of your file_. Is it complete? Are there extra empty lines? Use **Select last lines from a dataset** with the default **10** to check.
*   Check errors that come from tools such as the **FASTQ Groomer**. Many tools report the _exact problem_ with _exact instructions_ for corrections.
*   Is the format to specification? Is it recognized by Galaxy? By the target tool or display application? Check against the [Galaxy Datatypes](/src/learn/datatypes/index.md) list.
    *   Are you using a **[Custom Reference Genome](/src/learn/custom-genomes/index.md)**? Have you tried the troubleshooting tips?
    *   Note: not all formats are outlined in detail as they are common types or derived from a particular source. Read the target tool help, ask the tool authors, or even just google for the most current specification.
*   Is the problem the [dataset](/src/learn/managing-datasets/index.md) format or the assigned datatype? Can this be corrected by editing the datatype or converting formats? Often a combination of tools can correct a formatting problem, if the rest of the file is intact (completely loaded).
*   Is the problem a scientific or technical problem?
    *   _Example_ **NGS: Mapping** tools: On the tool form itself is a short list of help plus links to publications and the tool author's documentation and/or website. 
    *   _Example_ **NGS: SAM Tools** tools: SAMTools requires that all input files be to specification ([Learn/datatypes](/learn/datatypes)) and that the same _exact_ reference genome is used for all steps. Double checking format is the first check. Double checking the the same exact version of the reference genome is used is the second check. The last check is that the number of jobs and size of data on disk is under quota. Problems with this set of tools is rarely caused by other issues.
*   Tools for fixing/converting/modifying a [dataset](/src/learn/managing-datasets/index.md) will often include the [datatype name](/src/learn/datatypes/index.md). Use the tool search to locate candidate tools, likely in tool groups _**Text Manipulation, Convert Formats, or NGS: QC and manipulation**_.
*   The most commonly used tools for investigating problems with upload, format and making corrections are:
    *   **TIP**: use the Tool search in top left panel to find tools by keyword
    *   _**Edit Attributes**_ form, found by clicking a dataset's ![Images/Icons/pencil.png](/src/images/icons/pencil.png "Images/Icons/pencil.png") icon
    *   _**Convert Format**_ tool group
    *   **Select first lines from a dataset**
    *   **Select last lines from a dataset**
    *   **Line/Word/Character count of a dataset**
    *   **Secure Hash / Message Digest on a dataset**
    *   **FASTQ Groomer**
    *   **FastQC** - [How to read the report](http://www.bioinformatics.babraham.ac.uk/projects/fastqc/Help/3%20Analysis%20Modules/)
    *   **Tabular to FASTQ**, **FASTQ to Tabular**
    *   **Tabular to FASTA**, **FASTA to Tabular**
    *   **FASTA Width formatter**
    *   _**Text Manipulation**_ tool group
    *   _**Filter and Sort**_ tool group
