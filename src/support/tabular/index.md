---
 title: Datatype Tabular
---
[Back to Support Hub](/src/support/index.md)

Related Topics
 * [Fastq Manipulation and Quality Control](/src/tutorials/ngs/#fastq-manipulation-and-quality-control/index.md)
 * [How to format fastq data for tools that require .fastqsanger format?](/src/support/fastqsanger/index.md)
 * [Understanding compressed fastq data (fastq.gz)](/src/support/compressed-fastq/index.md)
 * [Common datatypes explained](/src/learn/datatypes/index.md)
 * [Input datatype misassignment and errors](/src/support/tool-error/index.md)
 
## Help for Tabular Datasets
 
### Tabular or Interval or BED or GFF or TXT or ???

* A [Tabluar](/src/learn/datatypes/#tabular) datatype is any that is human readable and has tabs seperating data columns.
  * Note: tabular data is different from comma seperated data (.csv)
* Common tabular datatypes are .bed, .gtf, .interval, or .txt.
* The datatype metadata attribute can often be directly reassigned to tabular format data. 
 * Click the ![pencil](/src/images/icons/pencil.png "pencil") icon to reach the _**Edit Attributes**_ form. In the center panel, using tabs to navigate, change the datatype (3rd tab) and save, then label columns (1st tab) and save. Metadata will assign, then the dataset can be used. 
* If the required input is a [BED](/src/learn/datatypes/#bed) or [Interval](/src/learn/datatypes/#interval) datatype, adjusting (.tab → .bed, .tab → .interval) may be possible using a combination of _**Text Manipulation**_ tools, to create a [dataset](/src/learn/managing-datasets/index.md) that matches the BED or Interval [datatype](/src/learn/datatypes/index.md) specifications.

### Tips

* Some tools require that BED format is followed, even if the datatype Interval (with less strict column ordering) is accepted on the tool form.
* These tools will fail if run with malformed BED datasets or non-specific column assignments.
* Solution: Reorganize the data to be in BED format and rerun. [More error troubleshooting help here](/src/support/tool-error/).
