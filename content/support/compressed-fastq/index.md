---
 title: Datatype Compressed Fastq
---
[Back to Support Hub](/support/)

Related Topics
 * [Fastq Manipulation and Quality Control](/tutorials/ngs/#fastq-manipulation-and-quality-control)
 * [How to format fastq data for tools that require .fastqsanger format?](/support/fastqsanger/)
 * [Format help for Tabular/BED/Interval Datasets](/support/tabular/)
 * [Common datatypes explained](/learn/datatypes/)
 * [Input datatype misassignment and errors](/support/tool-error/)

### What is `fastq.gz` data?

A compressed version of a fastq dataset.

### How compressed fastq data loads

Uploaded gz compressed FASTQ data loads in compressed format directly into the History. Tools accept compressed formatted datasets as input.

Why bother? Compressed data saves space in your account. This is a priority for many that have larger sized data/experiments to analyze. As before, some tools accept fastq datatypes (example: prep/QA steps/tools) and others accept fastqsanger datatypes (example: mapping and downstream analysis steps/tools). See the tool form to know which is expected. **When in doubt, use fastqsanger**.


### Using compressed data as tool inputs

 * If the tool accepts fastq input, then gz compressed data assigned the datatype `fastq.gz` is appropriate.
 * If the tool accepts fastqsanger input, then gz compressed data assigned the datatype `fastqsanger.gz` is appropriate.
 * Using uncompress fastq data is still an option with tools. The choice is yours.

**TIP** Avoid labeling compressed data with an uncompressed datatype, and the reverse. Jobs using mismatched datatype versus actual format will fail with an error.

* Example - What tool errors can look like when there is a datatype assignment problem: https://github.com/galaxyproject/galaxy/issues/3511

### How do `fastq.gz` datasets relate to the `.fastqsanger` datatype metadata assignment?

Before assigning `fastqsanger` or `fastqsanger.gz`, be sure to confirm the format.

**TIP** Using *non-fastqsanger* scaled quality values will cause scientific problems with tools that expected fastqsanger formatted input. *Even if the tool does not fail*. Get the format right from the start to avoid problems. Incorrect format is still one of the most common reasons for tool errors or unexpected results (within Galaxy or not).

* [How to format fastq data for tools that require .fastqsanger format?](/support/fastqsanger/)

### Best practises for loading fastq data into Galaxy

 * As of release `17.09`, fastq data will have the datatype `fastqsanger` auto-detected when that qualtity score scaling is detected and "autodetect" is used within the Upload tool. Compressed fastq data will be converted to uncompressed in the history.
 * To preserve fastq compression, directly assign the approrpriate datatype (eg: `fastqsanger.gz`).
 * If the data is close to or over 2 GB in size, be sure to use [FTP](/support/loading-data/)
 * If the data was already loaded as `fastq.gz`, don't worry! Just test the data for correct format (as needed) and assign the metadata type as explained above. This is currently a one-dataset-at-a-time edit post-Upload, but future plans include making these assignments a batch operation.




