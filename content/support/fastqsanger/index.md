---
 title: Datatype Fastqsanger
---
[Back to Support Hub](/src/support/index.md)

Related Topics
 * [Fastq Manipulation and Quality Control](/src/tutorials/ngs/#fastq-manipulation-and-quality-control/index.md)
 * [Format help for Tabular/BED/Interval Datasets](/src/support/tabular/index.md)
 * [Understanding compressed fastq data (fastq.gz)](/src/support/compressed-fastq/index.md)
 * [Common datatypes explained](/src/learn/datatypes/index.md)
 * [Input datatype misassignment and errors](/src/support/tool-error/index.md)
 
## Help for Fastq Datasets
 
### Fastqsanger format is usually required

Most tools that accept [FASTQ](/src/learn/datatypes/#fastq) data expect it to be in a specific FASTQ version: **.fastqsanger**

The `.fastqsanger` datatype must be assigned to each FASTQ dataset.

### How to check the current format of your FASTQ dataset and convert if needed

* Watch the **[FASTQ Prep Illumina](http://vimeo.com/galaxyproject/fastqprep)** video for a complete walk-through
* Run **FastQC** first to assess the type
   * Run **FASTQ Groomer** if the data needs to have the quality scores rescaled
   * If you are certain that the quality scores are already scaled to Sanger Phred+33 (the result of an Illumina 1.8+ pipeline), the datatype ".fastqsanger" can be directly assinged. Click the ![pencil](/src/images/icons/pencil.png "pencil") icon to reach the _**Edit Attributes**_ form. In the center panel, click on the "Datatype" tab (3rd), enter the datatype ".fastqsanger", and save. Metadata will assign, then the dataset can be used.
* Run **FastQC** again on the entire dataset *if any changes were made to the quality scores* [for QA](/src/tutorials/ngs/#fastq-manipulation-and-quality-control/) 

### Other tips

* If you are not sure what type of FASTQ data you have (maybe it is not Illumina?), see the help directly on the **FASTQ Groomer** tool for information about types.
   *   _For Illumina_, first run **FastQC** on a sample of your data ([how to read the full report](http://www.bioinformatics.babraham.ac.uk/projects/fastqc/Help/3%20Analysis%20Modules/)). The output report will note the quality score type interpreted by the tool. If not ".fastqsanger", run **FASTQ Groomer** on the entire dataset. If '.fastqsanger", just assign the datatype.
   *   _For SOLiD_, run **NGS: Fastq manipulation → AB-SOLID DATA → Convert**, to create a ".fastqcssanger" dataset. If you have uploaded a color space fastq sequence with quality scores already scaled to Sanger Phred+33 (".fastqcssanger"), first confirm by running **FastQC** on a sample of the data. Then if you want to double-encode the color space into psuedo-nucleotide space (required by certain tools), see the instructions on the tool form **Fastq Manipulation** for the conversion.
   *   _If your data is [FASTA](/src/learn/datatypes/#fasta)_, but you want to use tools that require [FASTQ](/src/learn/datatypes/#fastq) input, then using the tool **NGS: QC and manipulation → Combine FASTA and QUAL**. This tool will create "placeholder" quality scores that fit your data. On the output, click the ![pencil](/src/images/icons/pencil.png "pencil") icon to reach the _**Edit Attributes**_ form. In the center panel, click on the "Datatype" tab (3rd), enter the datatype ".fastqsanger", and save. Metadata will assign, then the dataset can be used.
