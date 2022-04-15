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

[Best practices for loading fastq data into Galaxy](https://training.galaxyproject.org/training-material/faqs/galaxy/datatypes_best_practices_fastq.html)



