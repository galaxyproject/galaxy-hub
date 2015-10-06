# Protoeomics Use Cases

This page lays out some potential high-level analysis. Right now this is a mix of high-level user information and lower-level technical details for developers and deployers. We should find a way to separate this better.

Ideally for each use case below, we would have at least one general method that is comprised of tools that can be auto-installed from the tool shed and are free and open-source, along with additional documentation (such as Galaxy page or publication) and workflow in the tool shed or on a Galaxy public server.

Alternative and partial approaches should be listed as well. Most complete, general, open-source pipeline should appear on top.

## Mass Spec Use Cases

### Protein Identification (Database Search)

<table>
  <tr>
    <td> <strong>Stastical Analysis/Protein Grouping Framework</strong> </td>
    <td> <strong>Identification Methods</strong> </td>
    <td> <strong>Tool Shed</strong> </td>
    <td> <strong>Public Servers</strong> </td>
    <td> <strong>Documentation (Page, Workflow, etc...)</strong> </td>
    <td> <strong>Licensing</strong> </td>
    <td> <strong>Other Notes</strong> </td>
  </tr>
  <tr>
    <td> Trans-Proteomics Pipeline </td>
    <td> X! Tandem, OMSSA, mascot, ms-gf+ </td>
    <td style=" background-color: #00FF00;"> Auto-installs </td>
    <td> <a href='https://usegalaxyp.org'>Galaxy-P</a> (partial) </td>
    <td> <a href='https://bitbucket.org/iracooke/protk'>BitBucket</a> </td>
    <td style=" background-color: #00FF00;"> FOSS </td>
    <td> </td>
  </tr>
  <tr>
    <td> PeptideShaker </td>
    <td> X! Tandem and OMSSA </td>
    <td> <#FFFF00> Source-only </td>
    <td> <a href='https://usegalaxyp.org'>Galaxy-P</a> </td>
    <td> <a href='https://usegalaxyp.readthedocs.org/en/latest/sections/peptideshaker.html'>Galaxy-P User Guide</a>, <a href='https://bitbucket.org/galaxyp/galaxyp-toolshed-peptideshaker'>BitBucket</a> </td>
    <td style=" background-color: #00FF00;"> FOSS </td>
    <td> </td>
  </tr>
  <tr>
    <td> OpenMS </td>
    <td> X! Tandem, OMSSA, MyriMatch  </td>
    <td> <#FFFF00> Source-only </td>
    <td> <a href='https://usegalaxyp.org'>Galaxy-P</a> </td>
    <td> <a href='https://bitbucket.org/galaxyp/galaxyp-toolshed-openms'>BitBucket</a> </td>
    <td style=" background-color: #00FF00;"> FOSS </td>
    <td> Results in idxml </td>
  </tr>
  <tr>
    <td> MaxQuant </td>
    <td> MaxQuant Andromeda </td>
    <td> <#FFFF00> Source-only </td>
    <td> <a href='https://usegalaxyp.org'>Galaxy-P</a> </td>
    <td> <a href='https://bitbucket.org/galaxyp/galaxyp-toolshed-maxquant'>BitBucket</a> </td>
    <td style=" background-color: #FFFF00;"> Free </td>
    <td> Windows-only </td>
  </tr>
  <tr>
    <td> Scaffold </td>
    <td> X! Tandem, OMSSA (more possible, this is all that is tested) </td>
    <td> <#FFFF00> Source-only </td>
    <td> </td>
    <td> </td>
    <td style=" background-color: #FF0000;"> Commercial </td>
    <td> </td>
  </tr>
  <tr>
    <td> ProteinPilot </td>
    <td> ProteinPilot  </td>
    <td> <#FFFF00> Source-only </td>
    <td> </td>
    <td> <a href='https://bitbucket.org/galaxyp/galaxyp-toolshed-proteinpilot'>BitBucket</a> </td>
    <td style=" background-color: #FF0000;"> Commercial </td>
    <td> Windows-only </td>
  </tr>
  <tr>
    <td> percolator  </td>
    <td> crux, ms-gf+  </td>
    <td> <#FF0000> No, in <a href='https://bitbucket.org/glormph/adapt'>Adapt</a> </td>
    <td> </td>
    <td> </td>
    <td style=" background-color: #FF0000;"> Academic-only (newer crux is better) </td>
    <td> </td>
  </tr>
</table>


### Quantification (Label-Free)

The [Galaxy-P](https://usegalaxyp.org/) OpenMS tool repository features many OpenMS tools that could be strung together to build the label-free workflow as outlined in the OpenMS paper [An Automated Pipeline for High-Throughput Label-Free Quantitative Proteomics](http://www.ncbi.nlm.nih.gov/pubmed/23391308). More details to come hopefully.

The [NBIC Galaxy server Andromeda](http://galaxy.nbic.nl/) features [msCompare](http://www.ncbi.nlm.nih.gov/pubmed/22318370).

### Quantification (Isobaric Labeling)

The Galaxy-P OpenMS tool repository features tools for iTRAQ and TMT quantification. These are in early development, please contact John Chilton for more details.

Likewise, the tool shed contains tools for MaxQuant and ProteinPilot both tools are capable of Isobaric quantification - though MaxQuant works only with Thermo RAW files and ProteinPilot is a commercial tool. 

## Multi-omics Use Cases

### RNA-Seq Guided Protein Identification

A Galaxy user with RNA-seq data and mass spec data for the same biological sample may wish to first perform RNA-seq analysis to identify expected proteins and then use the result of this to guide database searches.

### Comparing Relative Expression Levels
