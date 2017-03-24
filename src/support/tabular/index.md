---
 autotoc: true
 title: Datatype Tabular
---
 
[Back to Support Hub](http://wiki.galaxyproject.org/support/)

Related Topics
 * [Fastq Manipulation and Quality Control](https://galaxyproject.org/tutorials/ngs/#fastq-manipulation-and-quality-control)
 * [How to format fastq data for tools that require .fastqsanger format?](https://galaxyproject.org/support/fastqsanger/)
 * [Understanding compressed fastq data (fastq.gz)](https://galaxyproject.org/support/compressed-fastq/)
 * [Common datatypes explained](https://galaxyproject.org/learn/datatypes/)
 * [Input datatype misassignment and errors](https://galaxyproject.org/support/job-error/)
 
## Help for Tabular Datasets
 
### Tabular or Interval or BED or GFF or ???

* A [Tabluar](/learn/datatypes/#tabular) datatype is any that is human readable and has tabs seperating data columns.
  * For example: tabs instead of commas or spaces
* Common tabular datatypes are .bed, .gtf, .interval, or .txt.
* The datatype metadata attribute can often be directly reassigned to tabular format data. 
 * Click the ![pencil](/src/images/icons/pencil.png "pencil") icon to reach the _**Edit Attributes**_ form. In the center panel, using tabs to navigate, change the datatype (3rd tab) and save, then label columns (1st tab) and save. Metadata will assign, then the dataset can be used.
* If the required input is a [BED](/learn/datatypes#Bed) or [Interval](/learn/datatypes#Interval) datatype, adjusting (.tab → .bed, .tab → .interval) may be possible using a combination of _**Text Manipulation**_ tools, to create a [dataset](/learn/managing-datasets) that matches the BED or Interval [datatype](/learn/datatypes) specifications.

### Tips

* Some tools require that BED format is followed, even if the datatype Interval (with less strict column ordering) is accepted on the tool form.
* These tools will fail if run with malformed BED datasets or non-specific column assignments.
* Solution: Reorganize the data to be in BED format and rerun. [More error troubleshooting help here](https://galaxyproject.org/support/job-error/).
