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


[Using compressed data as tool inputs](https://training.galaxyproject.org/training-material/faqs/galaxy/datatypes_Using_compressed_fastq_data.html)

[How do `fastq.gz` datasets relate to the `.fastqsanger` datatype metadata assignment?](https://training.galaxyproject.org/training-material/faqs/galaxy/datatypes_fastq_and_fastqsanger.html)

[Best practices for loading fastq data into Galaxy](

* As of release `17.09`, fastq data will have the datatype `fastqsanger` auto-detected when that qualtity score scaling is detected and "autodetect" is used within the Upload tool. Compressed fastq data will be converted to uncompressed in the history.
* To preserve fastq compression, directly assign the approrpriate datatype (eg: `fastqsanger.gz`).
* If the data is close to or over 2 GB in size, be sure to use [FTP](/support/loading-data/)
* If the data was already loaded as `fastq.gz`, don't worry! Just test the data for correct format (as needed) and assign the metadata type as explained above. This is currently a one-dataset-at-a-time edit post-Upload, but future plans include making these assignments a batch operation.




