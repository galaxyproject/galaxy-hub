---
autotoc: true
title: Abstract submission is now closed
---
PLACEHOLDER_INCLUDE(/Events/GCC2012/PageHeader)

PLACEHOLDER_INCLUDE(/events/GCC2012/LinkBox)



Abstracts for talks that were presented at the [GCC2012 main sessions](../Program).  See [Training Day](/Events/GCC2012/TrainingDay) for training abstracts.



<br /><br />
# Session 1

## State of the Galaxy

<div class='right'>![](/GalaxyTeam/anton.jpg)&nbsp;![](/GalaxyTeam/james.jpg)</div>

**[Anton Nekrutenko](/anton)<sup>1</sup> and [James Taylor](/JamesTaylor)<sup>2</sup>**

 <sup>1</sup> [Penn State University](http://psu.edu/)<br />
 <sup>2</sup> [Emory University](http://emory.edu/)

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/State.pdf), Video*

An overview of where the Galaxy Project is and where it is going.

## Integration of S-MART, a toolbox to aid RNA-seq data analysis in Galaxy

<div class='right'>![](/Luo.jpg)</div>

**Yufei Luo<sup>1</sup>**, Matthias Zytnicki<sup>1</sup>, Olivier Inizan<sup>1</sup>, Delphine Steinbach<sup>1</sup>, Hadi Quesneville<sup>1</sup>

 <sup>1</sup> Unité de recherche en Génomique-Info, UR1164 INRA, Route de Saint Cyr, 78000, Versailles, France

 {yufei.luo, matthias.zytnicki, olivier.inizan, delphine.steinbach, hadi.quesneville}@versailles.inra.fr

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/Luo.pdf), Video*

URGI is an INRA bio-informatics unit dedicated to plants and pest genomics. We have developed a toolbox called [S-MART](http://www.plosone.org/article/info%3Adoi%2F10.1371%2Fjournal.pone.0025988), which handles mapped RNA-Seq data. S-MART is an intuitive tool, which performs many tasks usually required for the analysis of mapped RNA-Seq reads. S-MART does not require any computer science background and thus can be used by the biologist community through [our Galaxy instance](http://urgi.versailles.inra.fr/galaxy), which is considered as an "official Galaxy instance" by the Penn State Galaxy team, called URGI Galaxy (http://urgi.versailles.inra.fr/galaxy), in which we integrated our tools for biologist and bio-informatician users. S-MART work-flows may perform several entire analyses, from the mapped reads to the loci of interest, without any need for other ad hoc scripts. We are currently integrating these work-flows to our URGI Galaxy: (i) piRNAs (Piwi-interacting RNAs) clusters detection (ii) nucleotidic distribution of the 5' ends of the reads (iii) comparison of RNA-seq with tiling arrays using sliding windows (iv) differential expression when no reference annotation is given. We will present the S-MART Galaxy Tool Box with some of its workflows at the conference.

## Connecting Galaxy to a Data Repository

**Richard Park<sup>1,2</sup>**, Nils Gehlenborg<sup>1</sup>, Psalm Haseley<sup>1</sup>, Ilya Sytchev<sup>3</sup>, Shannan Ho Sui<sup>3</sup>, Winston Hide<sup>3</sup>, Peter Park<sup>1</sup>

 <sup>1</sup> Center for Biomedical Informatics of Harvard Medical School<br />
 <sup>2</sup> Boston University Bioinformatics Program<br />
 <sup>3</sup> Center for Stem Cell Bioinformatics, Harvard Stem Cell Institute

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/Park.pdf), Video*

Integrating Galaxy with data repositories without a significant amount of manual intervention has remained a difficult task. By extending and adding to Galaxy’s core API functionality, we are able to demonstrate controlling and automating analyses purely through a 3rd party interface using the Harvard Stem Cell Institute's Stem Cell Commons project as a use case. Experimental metadata defined by ISA-TAB specifications are integrated to guide users to choose the proper workflows, parameters, and data sources to run and interpret analyses.

With the avalanche of data available in public and private repositories there is a growing need to use Galaxy in a fully automated and dynamic fashion. We enhanced Galaxy’s API in a number of ways. Galaxy can now import, delete, and download workflows as well as run workflows with variable tool parameters. Finally, we are able to generate and run dynamic workflows based on a variable number of input files selected from a data repository.
       
This ongoing project demonstrates a novel integration of Galaxy with experimental metadata and raw data available in biomedical data repositories. We directly benefit by using key Galaxy features such as cluster/Cloud deployment, the large selection of tools, and the workflow editor. We hope to provide the greater Galaxy community the utility of our API extensions as well as the novel possibilities of using Galaxy in a fully automated fashion. We hope to use this opportunity to gain feedback and learn better approaches from the Galaxy developer community.

## Role of Galaxy in a bioinformatic plant breeding platform

<div class='right'>![](/maillol.jpg) ![](/jf_dufayard.jpg)</div>

**Vincent Maillol<sup>1</sup>**, Roberto Bacilieri<sup>1</sup>, Stéphanie Sidibe Bocs<sup>3</sup>, Jean-Michel Boursiquot<sup>1,2</sup>, Grégory Carrier<sup>2</sup>, Alexis Dereeper<sup>4</sup>, Gaétan Droc<sup>3</sup>, Cécile Fleury<sup>3</sup>, Pierre Larmande<sup>4</sup>, Loïc Lecunff<sup>2</sup>, Jean-Pierre Péros<sup>1</sup> Bertrand Pitollat<sup>3</sup>, Manuel Ruiz<sup>3</sup>, Gautier Sarah<sup>1</sup>, Guilhem Sempéré<sup>3</sup>, Marilyne Summo<sup>3</sup>, Patrice This<sup>1</sup>, and **Jean-Francois Dufayard<sup>3</sup>**

 <sup>1</sup> INRA – Montpellier !SupAgro, UMR 1334 AGAP, DAVEM team, 2 Place P. Viala, 34060 Montpellier, France.<br />
 <sup>2</sup> Institut Français de la Vigne et du Vin - Unité Mixte Technologique Géno-Vigne, 2 Place P. Viala, 34060 Montpellier, France.<br />
 <sup>3</sup> CIRAD - UMR 1334 AGAP, ID team, avenue Agropolis, 34398 Montpellier Cedex 5, France.<br />
 <sup>4</sup> IRD - 911 avenue Agropolis, 34394 Montpellier, France.

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/MaillolDufayard.pdf), Video*

With NGS development, bioinformatics has become central in plant breeding laboratories, and researchers are in need of some autonomy in its use. The Southgreen platform (CIRAD, IRD, INRA) performs bioinformatics analyses for many plant breeding research teams in Montpellier (France), and offers many systems to users: for example GNPAnnot (automatic genomic sequence annotation), Greenphyl (phylogenetic orthology prediction), ESTtik (EST annotation) or the Bacchus analysis pipeline. Most of these systems have been translated into Galaxy workflows.

As for the Bacchus pipeline, it has been created at INRA Montpellier (France) to investigate clonal diversity in grapevine genomes. For this task, many softwares have been wrapped in the Galaxy framework. Bacchus can be decomposed in three steps: i) Genome reconstruction, ii) test of reconstruction results, and iii) diversity analysis. This last step is done using SNP's and structural variations. To detect SNP's, the latest Freebayes version was used, while the IDfixe software was developped for structural variation detection. Some of the softwares developped for this pipeline are now used in the international project Grapereseq.

Today, the Galaxy framework is widely used by Southgreen plateform users as an alternative to the command line system. In this context, dozens of users have already been trained in Galaxy-using bioinformatics. During weekly collective pair-programming sessions, platform engineers and interested scientists integrate new tools and
functionalities.Thus, Galaxy is now a core component of the plant breeding community around the Southgreen platform, and the main access portal for non- bioinformatics specialists to our computing clusters.

<br /><br />

# Session 2

## Galaxy Pipeline for Faster Whole Genome Genotype Calling on the GeneTitan Platform

<div class='right'>![](/OleksiyKarpenko.jpg)</div>

**Oleksiy Karpenko<sup>1</sup>** and Neil J. Bahroos<sup>1</sup><br />

 <sup>1</sup> University of Illinois at Chicago (UIC), Research Resources Center, Center for Research Informatics, Center for Clinical and Translational Science

*[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2012/Karpenko.pdf), [PPT](ATTACHMENT_URLDocuments/Presentations/GCC2012/Karpenko.ppt) Video*

Latest genotyping solutions allow for rapid testing of more than two million markers in one experiment. Fully automated instruments such as Affymetrix !GeneTitan enable processing of large numbers of samples in a truly high-throughput manner. In concert with solutions like Axiom, fully customizable array plates can now utilize automated workflows that can leverage multi-channel instrumentation like the !GeneTitan.

With the growing size of raw data output, the serial computational architecture of the software, typically distributed by the vendors on turnkey desktop solutions for quality control and genotype calling, becomes legacy rather than an advantage. More advanced software and techniques provide more power and flexibility in options and can be deployed in an HPC environment, but become technically inconvenient for biologists to use.

Here we present a pipeline that uses Galaxy as an interface to provide the mechanism to lower the barrier to more complicated and native software for the instrument in a high throughput manner. We will also report the results of processing and genotyping of large samples of African-American population with Affymetrix PanAFR arrays.

## Integrating Galaxy with Globus Online: Lessons learned from the CVRG project

<div class='right'>![](/Liu.jpg)</div>

**Bo Liu<sup>1</sup>** ([boliu@uchicago.edu](boliu@uchicago.edu)), Ravi Madduri<sup>1</sup> ([madduri@mcs.anl.gov](madduri@mcs.anl.gov))<br />

 <sup>1</sup> Computation Institute, University of Chicago and Argonne National Laboratory

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/Liu.pdf), Video*

Globus Online (GO) is a hosted service that uses powerful grid transfer capabilities to automate the tasks of moving large quantities of data in a secure, efficient and fast way. Integrating Galaxy with Globus Online addresses the challenges in transferring large-scale datasets in and out of Galaxy quickly and reliably. In CVRG (!CardioVascular Research Grid) project, we have extended Galaxy with "Globus Online" tools for data transfer, "CRData" tools for executing R scripts, "Picard/GATK via Condor" tools for running Picard and GATK tools at Condor nodes in parallel, etc. The thorough integration of Galaxy and GO services, including GO-transfer, GO-storage and GO-collaborate, will accelerate the development of Galaxy and make it more suitable for complicated bioinformatics pipelines. For example, GO-storage provides large capacity data storage that can be accessed within Galaxy. Galaxy could use GO-collaborate for user authentication, group management and task collaboration, and then GO users could access Galaxy without register and easily share Galaxy history/workflow/dataset with GO users or groups. The distributed computing capabilities of Globus also make the execution of Galaxy jobs faster and more efficiently.

## Scalable data management and computable framework for large scale longitudinal studies

<div class='right'>![](/Cuccuru.jpg)</div>

**[Gianmauro Cuccuru](http://www.crs4.it/crs4/peopledetails/people/195/Gianmauro_Cuccuru)**<sup>1</sup>, Simone Leo<sup>1</sup>, Luca Lianas<sup>1</sup>, Josh Moore<sup>4</sup>, Maristella Pitzalis<sup>2</sup>, Serena Sanna<sup>3</sup>, Ilenia Zara<sup>1</sup>, Jason Swedlow<sup>4</sup>, [Gianluigi Zanetti](http://www.crs4.it/crs4/peopledetails/people/7/Gianluigi_Zanetti)<sup>1</sup>

 <sup>1</sup> [CRS4](http://www.crs4.it/), Pula, Sardegna, Italy<br />
 <sup>2</sup> Dipartimento di Scienze Biomediche, Università di Sassari, Sassari, Sardegna, Italy<br />
 <sup>3</sup> Istituto di Ricerca Genetica e Biomedica (IRGB) del CNR, Monserrato, Sardegna, Italy<br />
 <sup>4</sup> Wellcome Trust Centre for Gene Regulation and Expression, College of Life Sciences, University of Dundee, Dundee, Scotland, UK

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/Cuccuru.pdf), Video*

We have implemented a platform for the analysis of two large scale longitudinal studies (~10,000 individuals) on autoimmune diseases and longevity conducted in Sardinia. We use GALAXY to provide a convenient and user-friendly interface, that allows to access data import, analysis and sharing of results.

The platform is designed to represent, using a uniform computational formalism, information on all relevant objects (e.g., physical samples, experimental and derived data, clinical data) and the network of actions, performed during the experiments and the computational analysis, that relate one to the other. The system supports type introspection on all of its objects and follows OpenEHR, an open standard that describes the management, storage, retrieval and exchange of health data in electronic health records. The latter choice guarantees a robust, computable, uniform and implementation independent description of the clinical data. The results of computation, e.g., genotype calling data, is held in specialized data structures that directly support further parallel processing and analysis.

The platform is built upon the core services of OME Remote Objects (OMERO) and GALAXY. OMERO is an open source software platform that includes a number of storage mechanisms, remoting middleware, an API, and client applications for biological data management developed by the Open Microscopy Environment. The GALAXY front-end exposes a rich set of functionalities including suites of map-reduce programs for GWAS and sequencing applications, as well as basic chain-of-custody inspection tools and tools for biological and clinical data import.

The platform is used in production by the IRGB/CNR since 2011.

## Nebula - A Web-Server for Advanced ChIP-Seq Data Analysis

[Valentina Boeva](https://sites.google.com/site/valentinaboeva/)<sup>1,2,3</sup> ([Valentina.Boeva@curie.fr](Valentina.Boeva@curie.fr)), **Alban LERMINE<sup>1,2,3</sup>** ([Alban.Lermine@curie.fr](Alban.Lermine@curie.fr)), Camille BARETTE<sup>1</sup> ([Camille.Barette@curie.fr](Camille.Barette@curie.fr)), Emmanuel BARILLOT<sup>1,2,3</sup> ([Emmanuel.Barillot@curie.fr](Emmanuel.Barillot@curie.fr))

 <sup>1</sup> Institut Curie<br />
 <sup>2</sup> INSERM, U900, Bioinformatics and Computational Systems Biology of Cancer, Paris<br />
 <sup>3</sup> Mines !ParisTech, Fontainebleau, France

**Keywords:** ChIP-seq, Galaxy, peaks, motifs, genome feature association.

*[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2012/Lermine.pdf), [PPT](ATTACHMENT_URLDocuments/Presentations/GCC2012/Lermine.ppt), Video*

We present a web service, Nebula, which allows biologists to perform by them selves complete analysis of ChIP-seq data. ChIP-seq is chromatin immunoprecipitation followed by sequencing of the extracted DNA fragments. This technique allows accurate characterization of the binding sites of transcription factors and other DNA-associated proteins.

Many existing tools for ChIP-seq data analysis are difficult to use by nonbioinformaticians.  These tools map sequenced reads to the reference genome or predict binding site locations (ChIP-seq peaks). Several tools exist for peak filtering, motif discovery and genome feature association. Such tools are often command line applications or R packages.

Our web service, [Nebula](http://nebula.curie.fr/), was designed for biologists. It is based on the Galaxy open source framework. Galaxy already includes a large number of functionalities for mapping reads and peak calling. We added the following to Galaxy: (1) peak calling with !FindPeaks and a module for immunoprecipitation quality control, (2) *de novo* motif discovery with ChIPmunk, (3) calculation of the density and the cumulative distribution of peak locations around gene TSSs, (4) annotation of peaks with genomic features, and (5) annotation of genes with peak information. Nebula generates the graphs and the enrichment statistics at each step of the process. During steps 3 to 5, Nebula optionally repeats the analysis on a control dataset and compares these results with those from the main dataset. Nebula can also incorporate gene expression (or gene modulation) data during these steps. In summary, Nebula is an innovative web service that provides an advanced ChIP-seq analysis pipeline, the output of which is directly publishable.

**Additional information:** Nebula accepts mapped reads in SAM/BAM format.  Each step of the pipeline produces several output files, which are mainly tabdelimited text files, .BED files or images. We used Perl and R to develop the tools used to perform the steps 3 to 5. The pipeline also includes several published tools (samtools, bedTools, MACS, !FindPeaks, ChIPmunk).

<br /><br />

# Lunch: Day 1

## Implications of a Galaxy Community Cloud in Clinical Genomics

**[Sanjay Joshi](/SanjayJoshi)<sup>1</sup>**

 <sup>1</sup> Chief Technical Officer (CTO), [Life Sciences](http://www.isilon.com/industry/lifesciences), [EMC Isilon](http://emc.com/)

The intersection of the established Galaxy Research community with the requirements from the growing Clinical Genomics community for higher throughput results and clinically actionable variants requires increased security and audit along with GxP and HIPAA compliance. We will present these issues for Galaxy storage in both a Clinical Genomics and Sequencing as a Service context within the Private Cloud.

<br /><br />

# Session 3

## Establishing a National Genomics Virtual Laboratory with Galaxy CloudMan

<div class='right'>![](/GalaxyTeam/EnisAfgan.jpg)</div>

**[Enis Afgan](/EnisAfgan)<sup>1,2</sup>**

 <sup>1</sup> [Ruđer Bošković Institute (RBI)](http://www.irb.hr/eng/)<br />
 <sup>2</sup> [Victoria Life Sciences Computation Initiative (VLSCI)](http://www.vlsci.org.au/), [University of Melbourne](http://www.unimelb.edu.au/)

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/Afgan.pdf), Video*

An increasing number of small groups do not have simple access to needed bioinformatics tools and data resources. The tools are complicated to install and customize, require dedicated compute resources and data stores, and typically involve a high level of ongoing maintenance to keep the software, data and hardware current, which in turn requires significant expertise in software development, system administration and hardware and networking, as well as access to hardware resources and data-centers. Galaxy CloudMan addresses many of the issues dealing with the initial provisioning of a configured set of tools and data that have been integrated with Galaxy, thus facilitating the access to accessible and private bioinformatics platform. 

Through the context of CloudMan, this talk will focus on the components required to establish a national collaborative initiative that aims at connecting genome researchers with massive datasets, sophisticated analysis and visualization tools, and large-scale computational and storage infrastructure. The initiative is known as the Genomics Virtual Laboratory; it is designed to scale to multiple locations and arbitrary cluster sizes as well as be supported by comprehensive training courses, outreach programs, and end-user support.

*Note: If you want hands-on experience with CloudMan, you are encouraged to attend the [Training Day session on CloudMan](/Events/GCC2012/TrainingDay).*


## Keeping Track of Life Science Data

<div class='right'>![](/Gruening.png)</div>

**Björn Grüning<sup>1</sup>**

 <sup>1</sup> [Pharmaceutical Bioinformatics](http://pharmaceutical-bioinformatics.com/main/), Institute of Pharmaceutical Sciences, Albert-Ludwigs-University Freiburg

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/Gruning.pdf), Video*

Life science data constantly changes and it is challenging to keep local data repositories up to date, because many data providers do not offer a strategy to the user for keeping local data synchronized. A powerful and easy-to-use data distribution system is still missing. The lowest common denominator for data exchange is the File Transfer Protocol. Although it is approved and reliable, it does not offer options to keep track of data revisions. Incremental updates are hardly possible or not possible at all. Up-to-date data are vital to researchers, however, updating might alter downstream calculation results, annotations or predictions. Using Galaxy, it is possible to reproduce the processing of static datasets very comfortably, but reproducibility is difficult to maintain, if external databases are integrated.

We will present a proof-of-concept to process life science data (e.g. sequence or compound libraries) in a Version Control System, typically used to store, share, and control software repositories. The talk will highlight the benefits of such a system for consumers and producers of life science data, initial experiences, and possible pitfalls. Moreover, we will present a prototypical implementation for the Galaxy framework, that utilize revision-controlled data and enables reproducibility, even if source data change frequently.


## Easier Workflows & Tool Comparison with Oqtans+

<div class='right'>![](/Sreedharan.jpg)</div>

Sebastian J. Schultheiss<sup>1</sup>, Géraldine Jean<sup>1,2</sup>, **Vipin T. Sreedharan<sup>1,3</sup>**, André Kahles<sup>1,3</sup>, Regina Bohnert<sup>1</sup>, Philipp Drewe<sup>1,3</sup>, Pramod Mudrakarta<sup>1</sup>, Nico Görnitz<sup>4</sup>, Georg Zeller<sup>1,5</sup>, Gunnar Rätsch<sup>1,3</sup>

 <sup>1</sup> Machine Learning in Biology Group, Friedrich Miescher Laboratory, Tübingen, Germany <br />
 <sup>2</sup> LINA, Combinatorics and Bioinformatics Group, University of Nantes, Nantes, France <br />
 <sup>3</sup> Computational Biology Center, Memorial Sloan-Kettering Cancer Center, New York, USA <br />
 <sup>4</sup> Machine Learning/Intelligent Data Analysis Group, Technical University Berlin, Berlin, Germany <br />
 <sup>5</sup> Structural and Computational Biology Unit, European Molecular Biology Laboratory, Heidelberg, Germany

*[PPT](ATTACHMENT_URLDocuments/Presentations/GCC2012/Sreedharan.ppt), [PDF](ATTACHMENT_URLDocuments/Presentations/GCC2012/Sreedharan.PDF), Video*

With the latest improvements in next-generation sequencing technologies, data analysis software is constantly updated to obtain the best-possible results in a reasonable time period. However, the sheer number of different software programs available for the same task can be overwhelming, and it is difficult for researchers to determine which ones to use for their experimental set up.

Here, we present Oqtans+, an improved open-source workbench integrated in the Galaxy framework that enables researchers to perform comparative quantitative transcriptome analysis, in part thanks to the Galaxy NGS toolbox. In addition to the NGS toolbox, we provide tool wrappers for the following tools: PALMapper, mTIM, Trinity, rQuant, rDiff, DESeq, Genesetter, GOrilla, SAFT, KIRMES, Shogun, GFF Tools, and others. The distinguishing features of Oqtans+ include a modular pipeline architecture, which facilitates comparative assessment of tool and data quality: Since Oqtans+ contains several tools that can in principle be applied to the same data, it is straightforward to compare the performance of different programs and parameter settings on the same data and choose the best suited for the task. Oqtans+ also contains programs, which are well-suited for the evaluation of RNA-seq read alignment accuracy, in particular when dealing with read alignment filtering and optimal alignment of multiple mapped reads.
 
Moreover, Oqtans+ provides sophisticated machine learning-powered tools that are shown to perform
better or as well as the state-of-the-art for short-read alignments, transcript identification/quantification, and differential expression analysis. Finally, Oqtans+ sets a new standard in terms of reproducibility, building on Galaxy’s features that greatly facilitate persistent storage, exchange, and documentation of intermediate results and analysis workflows. We show how to use Oqtans+ with two easy-to-understand workflow examples and real-world data. 

Oqtans+ is available for download (GPL, free for non- commercial use), as a machine image for cloud environments, and at our server via the persistent web address [bioweb.me/oqtans](http://bioweb.me/oqtans).

Contact: support@oqtans.org; ratschg@mskcc.org


## CloudMap: A Cloud-based Pipeline for Analysis of Mutant Genome Sequences

<div class='right'>![](/Minevich.jpg)</div>

**Gregory Minevich<sup>1</sup>**, Danny Park<sup>1</sup>, Richard J. Poole<sup>1</sup>, [Daniel Blankenberg](/Dan)<sup>2</sup>, [Anton Nekrutenko](/anton)<sup>2</sup> and Oliver Hobert<sup>1</sup><br />

 <sup>1</sup> Department of Biochemistry and Molecular Biophysics, Howard Hughes Medical Institute, Columbia University Medical Center, New York, NY, USA<br />
 <sup>2</sup> Center for Comparative Genomics and Bioinformatics, Penn State University, University Park, PA, USA<br />
 
*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/Minevich.pdf), Video*

Whole genome sequencing (WGS) is the fastest and most cost effective way to map causal mutations in model organisms such as *C. elegans*. Our lab has previously developed single step SNP mapping strategies coupled with whole genome sequencing ([Doitsidou et al. 2010](http://www.plosone.org/article/info%3Adoi%2F10.1371%2Fjournal.pone.0015435)) as well as software analysis tools for mutant genome sequence analysis (MAQGene, [Bigelow et al. 2009](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC2854518/?tool=pubmed)). In an effort to take advantage of the cloud and many freely available open source tools, we've adapted our mutant genome sequence analysis pipeline to run on Galaxy. Our pipeline uses custom Python scripts to provide greatly improved mutant mapping tools and relies on the NGS Toolbox in Galaxy, [GATK Tools](http://www.nature.com/ng/journal/v43/n5/abs/ng.806.html), and [snpEff](http://snpeff.sourceforge.net). In addition to allowing for pinpoint mapping of causal mutations in *C. elegans* using any mapping strain, we also support similar mapping strategies for other model organisms that can be crossed to mapping strains. An alternate mapping strategy whereby mutants are backcrossed to their starting strain ([Zuryn, et al. 2010](http://www.genetics.org/content/186/1/427.full)) is also supported. The !CloudMap pipeline provides a set of best practices for mapping causal mutations and also facilitates the cataloguing and sharing of WGS variant data among model organism communities that use the tool.

Correspondence to [gm2123 AT columbia DOT edu](gm2123 AT columbia DOT edu) (G.M.) or [or38 AT columbia DOT edu](or38 AT columbia DOT edu) (O.H.)

<br /><br />

# Session 4

## GPS: a real-time recommendation system for ChIP-Seq analysis

<div class='right'>![](/Sun.jpg)</div>

**Hanfei Sun<sup>1</sup>**
 <sup>1</sup> [Dana-Farber Cancer Institute](http://www.dfci.harvard.edu/) and [Harvard School of Public Health](http://www.hsph.harvard.edu/)

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/Sun.pdf), Video*

With the numerous projects focusing on gene regulation and epigenetic mechanisms such as ENCODE, a huge amount of ChIP-seq data has been produced and stored in various databases, such as SRA and UCSC. However, as the size of database grows, it become more difficult for users to retrieve potentially helpful data and analysis the possible relationship within such large datasets. 

For many genome databases, keyword search method is widely used for their retrieval. Hence, when a user searches for a dataset with a keyword, he/she can only retrieve the datasets whose meta-data contains this keyword. If a dataset doesn’t contain this keyword in its meta-data, users can’t find it by keyword searching, though it may have most characteristics of the datasets under this keyword.

We proposed a real-time recommendation system that recommends proper datasets that has the similar features of the dataset being viewed by user, which is called GPS (GPS is an acronym for “GPS for Potential Similariry”). Then we make a prototype where the technique is applied with more than 3000 public datasets. Advantages of our system are as follows.

* It provide users a new search method beyond keyword searching.
* It discovers the potential relationship within the large datasets automatically and displays it in a real-time way.
* It may lead to creative thinking support for researchers by showing datasets related to the datasets being viewed.


## Integration of Taverna workflows on a Galaxy-based platform for large-scale genomics analysis

<div class='right'>![](/Lee.jpg)</div>

Huayan Gao<sup>1,2</sup>, Peter Li<sup>3,4</sup>, Tam Sneddon<sup>3,4</sup>, Dennis Chan<sup>3</sup>, Alexandra Basford<sup>3,4</sup>, Scott Edmunds<sup>3,4</sup>, Alex Wong<sup>3</sup>, Wai-Yee Chan<sup>1,2</sup>, Zhang Yong<sup>4</sup>, **Tin-Lap Lee<sup>1,2</sup>**

 <sup>1</sup> School of Biomedical Sciences, The Chinese University of Hong Kong, Shatin, Hong Kong SAR, China.<br />
 <sup>2</sup> CUHK-BGI Innovation Institute of Trans-omics, The Chinese University of Hong Kong, Shatin, Hong Kong SAR, China.<br />
 <sup>3</sup> BGI-Hong Kong Ltd., 16 Dai Fu Street, Tai Po Industrial Estate, NT, Hong Kong SAR, China.<br />
 <sup>4</sup> BGI-!ShenZhen, Bei Shan Industrial Zone, Yantian Distrcit, Shenzhen, China.<br />

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/Lee.pdf), Video*

The big data derived from next generation sequencing experiments makes efficient data mining strategies indispensible. Despite the plummeting costs of sequencing, the downstream processes create financial and bioinformatics challenges for many biomedical scientists. To alleviate this major stumbling block, we have established a Galaxy-based platform (CBIIT-Galaxy) and UCSC genome browser mirror for fast and efficient genomic data analysis. We have also implemented Taverna workflows to enable additional common Next-gen sequencing analyses in a simplified workflow format. To allow fast access and interpretation of popular Next-gen sequencing datasets, we are collaborating with the online open-access open-data journal Gigascience.  This is a novel publication platform that combines scientific publications and datasets, utilizing CBIIT-Galaxy to aid reproducibility, review and use of data. Its database (GigaDB) contains popular genome datasets related to various species and disease models from the BGI as well as submitting authors. Instead of hours of data transfer, CBIIT-Galaxy server allows researchers to easily locate data from GigaDB and directly import to CBIIT-Galaxy for further data analysis. Preliminary analysis on common functions in CBIIT-Galaxy showed significant performance improvement compared to public Galaxy server. We plan to link global data networks such as GLORIAD (Global Ring Network for Advanced Application Development) to our platform to further improve the network traffic capacity. We will also implement customized Taverna or Myexperiment workflows into CBIIT-Galaxy for public access. Taken together, the CBIIT-Galaxy will serve as an important Galaxy portal for biomedical scientist in Asia and around the globe.

## NGS analysis for Biologists: experiences from the cloud

<div class='right'>![](/Reddy.jpg)</div>

Mohammad Heydarian<sup>1</sup>, Barbara Sollner-Webb<sup>1</sup>, and **Karen Reddy<sup>1</sup>**

 <sup>1</sup> Department of Biological Chemistry & Center for Epigenetics, Johns Hopkins University. 

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/Reddy.pdf), Video*

As the cost of next generation sequencing decreases and the accessibility increases many labs will be in a position to perform NGS experiments, at one point limited to the mega-lab. With NGS data comes the necessity for adequate analysis capabilities to make sense of millions to billions of short sequence reads. These large data sets require high performance computing power for their analysis, generally not found in office computers that service the standard science lab. The Galaxy Project has developed an instance of its powerful and user friendly environment to be used with Amazon Web Services to allow researchers to perform NGS analysis on the cloud. This is a very convenient option for researchers who are in need of high computational power for a limited number of experiments (time) and may not have access to the necessary computational infrastructure. Here we discuss our experiences as cellular and molecular biologists with no computational/programming background performing RNA-seq analysis using the Galaxy CloudMan. We aim to create resource that can help the non-computational biologist establish cloud space and perform analyses with minimal programming/coding, to maximize the efficiency of the biologist and to allow her/him to focus on the biology of the experiment. This work will hopefully contribute to the dialogue between biologists and developers to maximize the efficiency of both parties. 

## The Galaxy Visualization Framework

<div class='right'>![](/GalaxyTeam/jgoecks-banff-small.png)</div>

**[Jeremy Goecks](/JeremyGoecks)<sup>1</sup>**

 <sup>1</sup> [Emory University](http://emory.edu/)

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/Goecks.pdf), Video*

The Galaxy team is building a framework for Web-based visualization of next-generation sequencing (NGS) data. This framework supports fast random access for most common NGS data formats and HTML5-based libraries for building different types of visualizations such as track browsers, circos plots, and phylogenetic trees. This talk will provide an overview of The Galaxy Visualization Framework and highlight some visualizations produced using the framework.

<br /><br />

# Evening: Day 1

## Ion Torrent: Open, Accessible, Enabling

<div class='right'>![](/MikeLelivelt/pic.png)</div>

**[Mike Lelivelt](/MikeLelivelt)<sup>1</sup>**

 <sup>1</sup> Director of Bioinformatics and Software Products, [Ion Torrent](http://lifetech.com) 

*[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2012/Lelivelt.pdf), [PPT](ATTACHMENT_URLDocuments/Presentations/GCC2012/Lelivelt.ppt), Video*

Ion Torrent has pioneered an entirely new approach to sequencing that enables a direct connection between chemical and digital information and leverage decades of semiconductor technology advances. The result is the first commercial sequencing technology that does not use light, and as a result delivers unprecedented speed, scalability, accuracy, and low cost. In just the first year the Ion Torrent Personal Genome Machine (TM) has become the fastest selling sequencing platform. The throughput scaled 100X, from 10Mb to 1Gb, in just the first year and will scale another 100X in the next year with the new Proton (TM) sequencer, which will enable the single day $1000 human genome. Automated data analysis is driven by Torrent Suite, an open-source software suite that provides a simple and intuitive interface to streamline data analysis and provide results in minutes to hours, not days. Built on top of Torrent Suite is a flexible SDK that allows users to expand the analysis capabilities through the development and utilization of plugins and APIs.

<br /><br />

# Session 5

## High level distributed processing pipelines with Galaxy

**Brad Chapman<sup>1</sup>** ([bchapman@hsph.harvard.edu](bchapman@hsph.harvard.edu)), Shannan Ho Sui<sup>1</sup>, [Enis Afgan](/EnisAfgan)<sup>3</sup>, Ilya Sytchev<sup>2</sup>, Jason Evans<sup>1</sup>, Oliver Hofmann<sup>1</sup>, Winston Hide<sup>1</sup>

 <sup>1</sup> [Harvard School of Public Health](http://compbio.sph.harvard.edu/chb/)<br />
 <sup>2</sup> Center for Stem Cell Bioinformatics, Harvard Stem Cell Institute<br />
 <sup>3</sup> [Ruđer Bošković Institute (RBI)](http://www.irb.hr/eng/)

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/Chapman.pdf), Video*

We will discuss current work at Harvard School of Public Health to develop custom Galaxy interfaces for distributed processing pipelines. Our goal is to complement existing Galaxy tool functionality with best practice approaches for variant calling, RNA-seq and CHiP-seq analysis. We provide a user-friendly wizard interface that calls a remote back end server for running fully distributed jobs and cleaning up intermediate files. Users initiate processing from within Galaxy and receive results uploaded directly into Galaxy Data Libraries.

We have made this processing approach available via an [up-to-date fork of Galaxy central](https://bitbucket.org/hbc/galaxy-central-hbc) and utilize it in a number of current projects. The pipelines integrate into the [Stem Cell Discovery Engine](http://discovery.hsci.harvard.edu/), in an ongoing collaboration with Richard Park and Nils Gehlenborg in the [Park Lab](http://compbio.med.harvard.edu/).

Additionally, a ready-to-run analysis environment is available on Amazon using [CloudBioLinux](http://cloudbiolinux.org/), CloudMan and [BioCloudCentral](http://biocloudcentral.org). This infrastructure enables us to provide a fully push-button approach, from provisioning machines to viewing results in Galaxy.  [BioCloudCentral](http://biocloudcentral.org) was specifically designed to improve the experience of users transitioning to cloud resources by automating initial manual setup steps.

This work highlights the value of working within the Galaxy environment and the power of a connected user community. As an in-progress project, we hope to use this opportunity to discuss approaches for handling big, distributed, high-level processing tasks.

## Proteomics tools for Galaxy

<div class='right'>![](/Cooke.jpg)</div>

**Ira Cooke<sup>1</sup>**

 <sup>1</sup> Life Sciences Computation Centre, Department of Biochemistry, La Trobe University

*[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2012/Cooke.pdf), [Keynote](ATTACHMENT_URLDocuments/Presentations/GCC2012/Cooke.key), Video*

The Mass Spectrometry group at La Trobe University has been developing a suite of tools for running proteomics analyses and visualizing proteomics data in Galaxy.  Our tools are tightly integrated with galaxy, including custom data types and an external display application that allows users to interactively view and search identified proteins as well as quickly navigate between those identifications and the raw spectra on which they were based.  The tools are available on the Galaxy tool-shed and all other software components are available as open source software.

This talk gives a brief overview of our tools and outlines applications that emphasize the utility of making Proteomics tools available within the Galaxy ecosystem (of largely Genomics tools).  The talk also touches on some of the technical challenges we faced, especially in dealing with tools that are highly interdependent, and which spread data across multiple files.


## Using Galaxy for Molecular Assay Design

**James Ireland<sup>1</sup>**, Andrew Evans<sup>1</sup>, William !FitzHugh<sup>1</sup><br />

 <sup>1</sup> 5AM Solutions

*[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2012/Ireland.pdf),[PPT](ATTACHMENT_URLDocuments/Presentations/GCC2012/Ireland.ppt), Video*

Molecular assay design is a staple of the bioinformatics trade. Although the types of molecular assays varies widely from PCR primers for resequencing, to !TaqMan probes for gene expression assays to molecular inversion probes for genotyping, the overall workflow remains largely the same.   A typical workflow starts with target identification, sequence retrieval, candidate probe/primer design, homology checks for non-specific hybridization and finally identifying potential adverse folding or oligo interactions.  Galaxy is a natural platform for assay design because of its (1) natural and intuitive workflow support, (2) preservation of design history, (3) existing sequence manipulation functionalities and (4) ability to easily add in new applications and functionality.  In this presentation, we discuss how 5AM Solutions uses Galaxy as a platform for custom assay design that includes integration of Primer3, e-PCR and UNAfold tools.

## The National Center for Genome Analysis Support and Galaxy

<div class='right'>![](/RichLeDuc.jpg)</div>

**Richard !LeDuc<sup>1</sup>**

 <sup>1</sup> [National Center for Genome Analysis Support](http://ncgas.org), Indiana University

*[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2012/LeDuc.pdf), [PPTX](ATTACHMENT_URLDocuments/Presentations/GCC2012/LeDuc.pptx), Video*

The National Center for Genome Analysis Support is an NSF funded resource designed to supply bioinformatic support and computational infrastructure to genomics projects requiring large RAM computational resources – specifically de novo sequence assembly. We are developing a national scale infrastructure to support biological researchers that will use Galaxy to interface between the biologists and the cyberinfrastructure. The ability of NCGAS to assist with bioinformatic software optimization was recently demonstrated by our assistance in optimizing the runtime performance of Trinity resulting in over 3x speed improvement.

<br /><br />

# Session 6

## Integration of SeqWare within Galaxy

<div class='right'>![](/Lu.jpg)</div>

**Zhibin Lu<sup>1</sup>**, Morgan Taschuk<sup>1</sup>, Brian O’Connor<sup>1</sup> and B.F. Francis Ouellette<sup>1,2</sup>

 <sup>1</sup> Ontario Institute for Cancer Research, Informatics and Bio-computing platform, Toronto, Ontario, Canada<br />
 <sup>2</sup> Department of Cell and Systems Biology, University of Toronto, Toronto, Ontario, Canada

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2012/Lu.pdf), Video*

[SeqWare](http://sourceforge.net/apps/mediawiki/seqware), developed at UCLA, UNC, and OICR, is an open source project to create a tool set to work with next generation sequencers. It includes a LIMS, Pipeline, and Query Engine. The production group at Ontario Institute for Cancer Research (OICR) uses this package to control its workflows, perform analysis and manage NGS data. !SeqWare is able to trigger and monitor workflows via web services, and this has made it possible to integrate it with other tools like Galaxy. This helps our biology users to use workflows generated by our sequencing production pipeline and helps OICR’s production group continue downstream analysis within galaxy as well, leveraging the strength of multiple approaches. We will show the integration and architecture of the galaxy instance and !SeqWare installed at the OICR Bioinformatics Core Facility, showing the benefit of the integration and further development.



## Window2Galaxy – Enabling Linux-Windows Hybrid Workflows

<div class='right'>![](/Vardi.jpg)</div>

**Liram Vardi<sup>1</sup>** and Amir Ben-Dor<sup>1</sup>

 <sup>1</sup> Agilent Labs

*[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2012/Vardi.pdf), [PPSX](ATTACHMENT_URLDocuments/Presentations/GCC2012/Vardi.ppsx), Video*

Galaxy holds the promise of incorporating diverse command-line tools into reusable workflows. However, a big limitation of a typical Galaxy installation is the strict requirement that all tools be run from a Linux shell. As a result, many external tools that are pre-compiled for windows cannot be easily incorporated into a galaxy workflow. While a windows simulator, such as Wine, can provide a partial solution, its installation is not trivial for some Linux distributions, and, moreover, it does not provide full windows compatibility. 

We present a Galaxy extension, *!Window2Galaxy*, that acts as a middle-man between Linux and Windows, enabling Galaxy developers to incorporate Windows command-line tools into a standard Linux-based galaxy workflow. Our tool consists of two parts: A Linux client and a windows web-service. The web-service is hosted on a web-server (which can be run on either an external windows machine or on a local windows virtual machine) is responsible for executing the command line. A Linux client is responsible for copying input files from galaxy to a shared directory; send “execute” request to the windows service and finally, copying output files back to Galaxy repository.  

With this extension, adding a windows-based tool to galaxy is straight forward – adding "!Window2Galaxy" before the windows-command in the xml configuration file.   

From end-users perspective, this extension is completely transparent – workflows can be constructed from various tools, independent of whether those tools are Linux or Windows based. 

In the talk, we will present the architecture and provide example use cases. 


## NBIC Galaxy to Strengthen the Bioinformatics Community in the Netherlands

<div class='right'>![](/DavidvanEnckevort.jpg)</div>

Hailiang Mei<sup>1</sup>, **David van Enckevort<sup>1</sup>**, Mattias de Hollander<sup>2</sup>, Jeroen F. J. Laros<sup>3</sup>, Marc van Driel<sup>1</sup>, Rob Hooft<sup>1</sup>

 <sup>1</sup> Netherlands Bioinformatics Centre<br />
 <sup>2</sup> The Netherlands Institute of Ecology<br />
 <sup>3</sup> Center for Human and Clinical Genetics, Leiden University Medical Center

*[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2012/vanEnckevort.pdf), [PPTX](ATTACHMENT_URLDocuments/Presentations/GCC2012/vanEnckevort.pptx), Video*

The Netherlands Bioinformatics Centre (NBIC) plays a central coordinating role in several new Galaxy related developments that will further strengthen the bioinformatics community in the Netherlands.

* **NBICGalaxy@HPCcloud**<br /> The NBIC Galaxy server was originally built as a demonstration server for bioinformatics tools made by NBIC developers. However, the need for processing complete research datasets was clearly visible from the start. A newly installed cloud computing system (HPCcloud) by !BigGrid and SARA allows the NBIC Galaxy server to be used for this purpose. A planned fiber network connecting this HPCcloud to several key research institutes in the Netherlands will further help.
* **CTMM TraIT**<br /> From the end of 2011, NBIC has become a partner of the CTMM TraIT project where bioinformatics solutions are being built to process data collected from cancer and cardiovascular disease research projects. Galaxy is considered as a major candidate. We are now working on a pilot project where an existing cancer causing genomic variant detection tool is being connected to a Galaxy backend via the Galaxy API. The aim is to keep using a user-friendly and familiar interface for biologists while taking advantage of the latest sequencing data analysis programs installed in Galaxy.
* **Education**<br /> One main mission of NBIC is to provide education and training to students and researchers. We have successfully used the NBIC Galaxy server in several practical courses. After a short introduction about the Galaxy interface, most attendees are able to start using tools they have never used before and perform data analysis tasks they just learned. The NBIC Galaxy server has demonstrated the potential to be a good education platform for future bioinformaticians.



## GenomeSpace

**Ted Liefeld<sup>1</sup>**

 <sup>1</sup> Broad Institute 

*[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2012/Liefeld.pdf), [PPTX](ATTACHMENT_URLDocuments/Presentations/GCC2012/Liefeld.pptx), Video*

GenomeSpace is a software environment that provides a connection layer between bioinformatics resources, whether they are Web-based applications, desktop packages, or simple scripts. GenomeSpace addresses the growing need for genomics researchers and bioinformaticians to have “frictionless” data transfer among the variety of analysis tools and data sources. GenomeSpace provides an open environment, which other bioinformatics resources can use to join the community ofGenomeSpace-enabled tools. GenomeSpace is seeded by six prominent tools for genomics analysis: Galaxy, Cytoscape, !GenePattern, Genomica, the Integrative Genomics Viewer (IGV), and the UCSC Genome Browser, and developed in collaboration with several biological research projects at the Broad Institute, Stanford University, and UCSD.
<br /><br />

# Session 7

## Tool Shed and Changes to Galaxy Distributions

<div class='right'>![](/GalaxyTeam/greg.jpg)</div>

**[Greg von Kuster](/greg_vonkuster)<sup>1</sup>**

 <sup>1</sup> [Penn State University](http://psu.edu/)

*[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2012/vonKuster.pdf), [PPT](ATTACHMENT_URLDocuments/Presentations/GCC2012/vonKuster.ppt), Video*

Galaxy’s ease of use and rich feature set have made it a powerful enabler of biological research, and the recent introduction of the Galaxy tool shed has significantly enhanced this process. The Galaxy [/Tool Shed](/Tool Shed) enables sharing of Galaxy tools, proprietary datatypes, exported Galaxy workflows, and data across the research community with ease. Tools can be automatically discovered and installed into a local Galaxy environment in real time, and they can easily be deactivated or uninstalled when they are no longer needed. The tool shed also provides the ability to simultaneously install different versions of the same tool into a Galaxy environment, enabling reproducibility and more complex analyses.

Big changes have been going on in how tools are packaged with the distribution.  This talk will focus on what's changed, and what you need to know about the Galaxy [/Tool Shed](/Tool Shed) to deploy your own Galaxy instance.

*Note: If you want hands-on experience with the Galaxy [/Tool Shed](/Tool Shed), you are encouraged to attend the [Tool Shed Training Day session](/Events/GCC2012/TrainingDay).*

<br />



<div class='center'>

</div>

The [deadline for abstracts was April 16](/Events/GCC2012/Key Dates).

Oral presentations will be approximately 15-20 minutes long, including time for question and answer.  There will also be an opportunity for lightning talks, which will be solicited at the meeting.  

<br />
<div class='center'>
**Please Note: By submitting an abstract you agree to:**
</div>
<br />

1. **Make any slides freely available on this web site, no later than August 15, 2012.**
1. **Have your talk be videotaped and have that videotape be publicly accessible on the web.**<br />(Note: We may or may not have sufficient funds to record talks.)

PLACEHOLDER_INCLUDE(/events/GCC2012/AsktheOrganizers)
