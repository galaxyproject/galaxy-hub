---
title: Galaxy and ... Bioconda, CLIP Explorer and RNA workbench @ GCB 2018
date: '2018-09-25'
tags: [conda]
location:
  name: Vienna, Austria
subsites: [eu, freiburg]
main_subsite: freiburg
---

During the [German Conference on Bioinformatics](https://gcb2018.csb.univie.ac.at) in Vienna, we presented our work related to Galaxy. Read here the abstracts:

**CLIP-Explorer: A Galaxy-Pipeline for iCLIP and eCLIP data**

*Florian Heyl, Daniel Maticzka, Rolf Backofen* 
Albert-Ludwigs-Universität Freiburg, Germany

RNA is a well-known polymeric molecule which plays a fundamental role in so many regulatory processes like splicing or translation, where RBPs (RNA-binding proteins) take part in. Thousands of RBPs have been found in human cells; some of which have been linked to diseases encompassing various types of cancer. CLIP-Seq (crosslinking immunoprecipitation 
in combination with high-throughput sequencing) facilitated the analysis of RBPs but many protocols like iCLIP or eCLIP require specific tools and parameter sets to analyse the resulting data. These obstacles make the analysis hard to reproduce and demand a tight cooperation with a bioinformatician. CLIP-Explorer resolves these issues by providing a workflow in Galaxy to guide the user to scrutinise iCLIP and eCLIP data, allowing for a user friendly interface to make quick changes to parameters and the pipeline itself. Consequently, CLIP-Explorer is flexible enough to be used for other CLIP-Seq datatypes as well (e.g., PAR-CLIP). The pipeline was tested on eCLIP data of RBFOX2 for which it identified known binding motifs and targets. Three different peak calling algorithms were tested, showing the flexibility of the pipeline and the importance of the parameter and method selection for the overall result.



**The RNA workbench**

*Joerg Fallmann (1), Florian Eggenhofer (2)*
(1) University of Leipzig, Germany
(2) University of Freiburg, Germany

RNA centric research is of growing importance for medicine and molecular biology. Increasing amounts of data from deep sequencing experiments create a demand for automatic analysis and interpretation solutions. The RNA-Workbench offers a wide range of tools covering classic RNA-bioinformatics as well as RNA-seq fields. Predefined workflows for the annotation of non-coding RNAs or identification of differentially expressed genes are subsets of over 50 included tools from the categories RNA structure analysis, RNA alignment, RNA annotation, RNA-protein interaction, ribosome profiling,
RNA-seq analysis and RNA target prediction. RNA specific visualisation solutions for dot-bracket plots and secondary structures are part of the workbench.In contrast to pre-existing solutions, our community driven approach allowes us
to include classic RNA-bioinformatics tools often with the direct support of the tool-authors. These contributions enable us to provide excellent documentation, training material and interactive tours demonstrating the functionality of the
workbench. Building on the Galaxy framework the workbench offers sophisticated analyses to users without command line knowledge, while emphasising reproducibility, customization and effortless scale up to larger infrastructures. The workbench is implemented as Galaxy Docker flavour and therefore easily extendable by additional tools, workflows, tours or training data, that can be installed from the Galaxy ToolShed. The workbench will be further improved and maintained
in an ongoing community effort.

