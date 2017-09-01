---
title: Help us improve our Training Material
---

## Help us develop the best training material for RNAseq analysis !

Dear community, the Galaxy team is working on a set of tutorials dedicated to RNAseq analysis. To serve community better we would like to prioritise our tutorial development. We want to do this by asking you what flavors of RNA-seq are in highest demand. To do this we prepared a short overview of various RNA-seq types:


|                             |
|:-----------------------------:|
|![Rna seq graph](raseq2.png)|
|<small>**Figure 1. : RNA seq analyses process**
From you reads data (in purple), two paths can be followed depending on the available references (in green). If an existing transcriptome is available, you can map the read on the transcriptome and perform a quatitative analysis based on the read counts. If no transcriptome is available you need to assemble one. If a Genome is available, you can assemble the transcriptome by mapping the reads on the genome, otherwise you have to performe a denovo transcriptome assembly. Once you have assembled your transcriptome, you can perform your quantitative analysis using the read counts.</small>


Another way to look at this is the following table :


|    Reference availability         ||    Tools                                        ||
|:--------------:|:----------------:|:----------------------:|:-----------------------:|
| *Genome*       | *Transcriptome*  | *Assembly*             | *Mapping/count*         |
|     &#10004;   |       &#10004;   |   Hisat/StringTie      |   Kallisto/Salmon       |
|     &#10004;   |       &#10008;   |   Hisat/StringTie      |   Hisat/StringTie       |
|     &#10008;   |       &#10008;   |   TRinity/RNASpades    |   Kallisto/Salmon       |
|     &#10008;   |       &#10004;   |                        |   Kallisto/Salmon       |

<center><b>Table 1 : Tools for mapping and assembly, depending on reference availability</b></center>

So, here is what we want from you:

1. Are we missing anything?
2. What tutorials do you want to see developed first? Use this [Poll](https://goo.gl/forms/Y6JFw25ZuQvQXSHR2) to answer!

Thank you for your help!
