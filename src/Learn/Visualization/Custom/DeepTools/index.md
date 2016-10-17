---
title: deepTools
---




<div class='deploymentbox'>
 Resource:: **[DeepTools](/src/Learn/Visualization/Custom/DeepTools/index.md)**
 Type:: Public
 Domain:: NGS, QC, Normalization, Visualization
 Formats:: BAM, bigWig, BED
 Owners:: [Max-Planck-Institut für Immunbiologie und Epigenetik](http://www.ie-freiburg.mpg.de)
 Link:: [Access Galaxy Instance](http://deeptools.ie-freiburg.mpg.de)
 Description:: User-friendly tools for the normalization and visualization of deep-sequencing data
 Date Created/Updated:: 2014/07 
</div>

deepTools addresses the challenge of handling the large amounts of data that are now routinely generated from DNA sequencing centers. To do so, deepTools contains useful modules to process the mapped reads data to create coverage files in standard bedGraph and bigWig file formats. By doing so, deepTools allows the creation of normalized coverage files or the comparison between two files (for example, treatment and control). Finally, using such normalized and standardized files, multiple visualizations can be created to identify enrichments with functional annotations of the genome.

For support, questions, or feature requests contact: deeptools@googlegroups.com

[Fidel Ramírez, Friederike Dündar, Sarah Diehl, Björn A. Grüning, and Thomas Manke. deepTools: a flexible platform for exploring deep-sequencing data. Nucl. Acids Res. first published online May 5, 2014 doi:10.1093/nar/gku365|http://nar.oxfordjournals.org/content/early/2014/05/05/nar.gku365.abstract](http://nar.oxfordjournals.org/content/early/2014/05/05/nar.gku365.abstract)

![deepTools](https://camo.githubusercontent.com/9a939620bf04dcf512619b3d6c799a5cff975264/68747470733a2f2f7261772e6769746875622e636f6d2f666964656c72616d2f64656570546f6f6c732f6d61737465722f6578616d706c65732f636f6c6c6167652e706e67)

## Needed Tools

List of tools:

* [bamCorrelate](https://github.com/fidelram/deepTools/wiki/QC#wiki-bamCorrelate)
* [bamFingerprint](https://github.com/fidelram/deepTools/wiki/QC#wiki-bamFingerprint)
* [computeGCbias](https://github.com/fidelram/deepTools/wiki/QC#wiki-computeGCbias)
* [correctGCBias](https://github.com/fidelram/deepTools/wiki/QC#wiki-correctGCbias)
* [bamCoverage](https://github.com/fidelram/deepTools/wiki/Normalizations#wiki-bamCoverage)
* [bamCompare](https://github.com/fidelram/deepTools/wiki/Normalizations#wiki-bamCompare)
* [computeMatrix](https://github.com/fidelram/deepTools/wiki/Visualizations#wiki-computeMatrix)
* [heatmapper](https://github.com/fidelram/deepTools/wiki/Visualizations#wiki-heatmapper)
* [profiler](https://github.com/fidelram/deepTools/wiki/Visualizations#wiki-profiler)

## Datasets

* BAM files
* bigwig files

## Links

* **[example workflows](https://github.com/fidelram/deepTools/wiki/Example-workflows)**
* **[Galaery](https://github.com/fidelram/deepTools/wiki/Gallery)**
