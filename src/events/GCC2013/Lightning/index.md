---
autotoc: true
title: Lightning Talks
---
PLACEHOLDER_INCLUDE(/Events/GCC2013/Header)



PLACEHOLDER_INCLUDE(/Events/GCC2013/LinkBox)

Lightning talks are a mixture of topics selected in advance and those solicited during the meeting. They will be presented during [Session 4, on Monday](/Events/GCC2013/Program#day-1-main-meeting-1-july) (moderated by [Ross Lazarus](/RossLazarus)) and [Session 8 on Tuesday](/Events/GCC2013/Program#day-2-main-meeting-2-july) (moderated by [Hans-Rudolf Hotz](/src/HansrudolfHotz/index.md)).  **No more than half the lightning talk slots will be allocated before the meeting.**

If you wish to give a lightning talk, please send an abstract to [gcc2013-sci AT galaxyproject DOT org](GCC2013 Scientific Committee), either 
* any time before the start of [Session 2](../Program#day-1-main-meeting-1-july) (to be considered for Monday or Tuesday slots), or 
* before [Session 6](../Program#day-2-main-meeting-2-july) (to be considered for Tuesday only).  

The slides for all lightning talks will be made available on the this page, and the talks may be videotaped and posted here as well.



## Lightning Talks

There are two lightning talk sessions, one on each day of the [main meeting](/src/Events/GCC2013/Program/index.md). 

### Day 1: Monday 1 July

During [Session 4](/Events/GCC2013/Program#day-1-main-meeting-1-july), moderated by [Ross Lazarus](/RossLazarus).

#### Medilaxy: A Galaxy Platform For Medical Image Analysis

<div class='right'>[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/MedilaxyLightning.pdf)</div>

**Marco Carnini**<sup>1</sup>, Amgad Droby<sup>2,3</sup>, Frauke Zipp<sup>2,3</sup>, Andreas Hildebrandt<sup>1</sup>

 <sup>1</sup> Computer Science Department, Johannes Gutenberg University, Mainz<br />
 <sup>2</sup> Department of Neurology, University Medical Center, Johannes Gutenberg University, Mainz<br />
 <sup>3</sup> Germany Neuroimage Center (NIC) of the FTN- Focus Program Translational Neuroscience, Johannes Gutenberg University, Mainz, Germany

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/MedilaxyLightning.pdf)*

We present Medilaxy, a workflow system for investigating and modeling of diseases of the central nervous system based on the Galaxy framework. At the moment, Medilaxy is focused on Magnetic Resonances Imaging data, which is processed in order to study spatially varying properties, such as fractional anisotropy or diffusivity along brain fibers. In a current application scenario, the aim is looking for statistically significant differences in the relevant quantities along fibers crossing MS lesions. Here, statistically significant differences were found in fibers belonging to patients or controls or in fibers belonging to patients but not crossing lesions (Normal Appearing White Matter); different behaviors were also found for lesions belonging to distinct regions of the brain.

To support input from various sources, all data is stored in a database; queries, evaluation of relevant quantities, statistic tests and plots are all performed by means of Python scripts and modules – !NumPy for statistics and matplotlib for plots, respectively. All operations can be performed using the standard Galaxy XML GUI, insulating the user from programming details unless specific customization (like file format, fonts selection, colors or labels in the plots) are needed. The flowchart feature of Galaxy allows quick, easy and intuitive implementation of complex and repetitive tasks; for reporting results, both tables of p-values and plots are produced and included in a single LaTeX file for quick generation of drafts for presentation or papers.

<br />

#### Establishing a genomics analysis workbench

<div class='right'>[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2013/EstablishingWorkbenchLightning.pdf), [PPTX](ATTACHMENT_URLDocuments/Presentations/GCC2013/EstablishingWorkbenchLightning.pptx)</div>

**Enis Afgan**<sup>1</sup>, Clare Sloggett<sup>1</sup>, Nuwan Goonasekera<sup>1</sup>, Simon Gladman<sup>1</sup>, Michael Pheasant<sup>2</sup>, Andrew Lonie<sup>1</sup>

 <sup>1</sup> Victorian Life Sciences Computation Initiative, University of Melbourne, Australia<br />
 <sup>2</sup> University of Queensland, Brisbane, Australia<br />

*[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2013/EstablishingWorkbenchLightning.pdf), [PPTX](ATTACHMENT_URLDocuments/Presentations/GCC2013/EstablishingWorkbenchLightning.pptx)*

The Genomics Virtual Laboratory (GVL) project is a combination of a scalable compute infrastructure, workflow platforms and community resources for Australian genomics researchers. At this stage, the GVL comprises: a prototype workflow management system based on the Galaxy framework, a bioinformatics toolkit (for command-line users) based on !CloudBioLinux, and a visualisation service based on the UCSC Genome Browser, all implemented on the Australian national research cloud (NeCTAR). In addition, the GVL is developing set of tutorials and exemplar workflows targeted at common high throughput genomics tasks. This talk will demonstrate GVL architecture, capabilities, discuss progress, and present the GVL roadmap.

<br />

#### LiSIs: a Galaxy-based platform for Life Science Informatics Research

<div class='right'>[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2013/LiSIsLightning.pdf), [PPTX](ATTACHMENT_URLDocuments/Presentations/GCC2013/LiSIsLightning.pptx)</div>

**Kannas Christos C.**<sup>1</sup>, Antoniou Zinonas<sup>1</sup>, Achilleos Kleo<sup>1</sup>, Nicolaou Christos A.<sup>1</sup>, Pattichis Costantinos S.<sup>1</sup>, Kalvari Ioanna<sup>2</sup>, Kirmitzoglou Ioannis<sup>2</sup>, Promponas Vasilis I.<sup>2</sup>, Savva Christiana<sup>2</sup>, Nephytou Christiana<sup>2</sup>, Contantinou Andreas I.<sup>2</sup>, Scherf David<sup>3</sup>, Gerhäuser Clarissa<sup>3</sup>

 <sup>1</sup> Department of Computer Science, University of Cyprus, Nicosia, Cyprus<br />
 <sup>2</sup> Department of Biological Science, University of Cyprus, Nicosia, Cyprus<br />
 <sup>3</sup> Cancer Chemoprevention and Epigenomics Workgroup, German Cancer Research Center, Heidelberg, Germany

*[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2013/LiSIsLightning.pdf), [PPTX](ATTACHMENT_URLDocuments/Presentations/GCC2013/LiSIsLightning.pptx)*

In this presentation we introduce the [Life Science Informatics (LiSIs)](http://lisis.cs.ucy.ac.cy) platform, a new, open Scientific Workflow Management Systems (SWMSs), with several unique features designed to enhance user experience and facilitate user adoption. LiSIs is an online system based on the widely popular Galaxy SWMS. LiSIs provides five tool categories dedicated to small molecule virtual screening and, a selection of native Galaxy tools. The tool categories are: (1) Input Layer, offering tools for chemical and biological data file parsing; (2) Pre-Processing Layer, offering tools for compound fingerprint calculation, chemical structure property calculation, compound fragmentation, conformation generation and protein cleaning; (3) Processing Layer, offering numerous tools for chemical property filtering, compound similarity calculation, predictive modelling for biological properties and docking-pose prediction and scoring; (4) Post-Processing Layer, offering tools for converting chemical files formats and merging binary datasets; (5) Output Layer, offering tools for the preparation of files with the results obtained in SMILES, SDF and tabular format.

LiSIs has been used to implement virtual screening workflows for the selection of compounds that may serve as leads for subsequent cancer chemoprevention research. Typically, several thousand commercially available compounds are supplied as input to a workflow and are subjected to a series of computational filters including, for example, drug likeness, predicted potency via predictive models and predicted binding affinity via docking. The results, shared with expert chemopreventive researchers using the LiSIs platform, demonstrate the potential use of the system by users of varying backgrounds and computational experience to advance drug discovery research.

<br />

#### Software Carpentry - Helping scientists build better software since 1998

<div class='right'>[Slides](http://jiffyclub.github.io/scipy2013-swc-lightning-talk/#/)</div>

**Lex Nederbragt**<sup>1</sup>, Karin Lagesen<sup>2</sup>
 <sup>1</sup> Norwegian Sequencing Centre (NSC) and Centre for Ecological and Evolutionary Synthesis (CEES), Dept. of Biosciences, University of Oslo, Oslo, Norway<br />
 <sup>2</sup> Norwegian Sequencing Centre (NSC) and Department of Medical Genetics, Oslo University Hospital, University of Oslo, Oslo, Norway

*[Slides](http://jiffyclub.github.io/scipy2013-swc-lightning-talk/#/)*

This lightning talk briefly introduces Software Carpentry. Software Carpentry's aim is to teach researchers (usually graduate students) basic computing concepts and skills so that they can get more done in less time, and with less pain. 

Our Mission: Software Carpentry helps researchers be more productive by teaching them basic computing skills. We run boot camps at dozens of sites around the world, and also provide open access material online for self-paced instruction. The benefits are more reliable results and higher productivity: a day a week is common, and a ten-fold improvement isn't rare.

Boot Camps: Our boot camps cover the core skills scientists needs to get more done in less time: program construction, version control, testing, and task automation. Short lessons alternate with hands-on practical sessions for two full days. Check out our calendar to find a boot camp near you.

NB we still have places for the [Oslo Boot Camp directly following GCC2013](http://software-carpentry.org/bootcamps/2013-07-oslo.html).

*Learn Online:* Our video lectures cover all of our core topics and much else as well, and all of our material can be freely re-used under open access licenses. The previous version of our material is also available, along with a reading list.

*Join Us:* There are many ways you can help us help scientists: hosting a boot camp, teaching one yourself, contributing new material, and more.

*Who We Are:* Software Carpentry is a volunteer organization supported by the Alfred P. Sloan Foundation and the Mozilla Foundation.

Website: Please visit http://software-carpentry.org and http://software-carpentry.org/bootcamps/index.html#future for future Boot Camps

<br />

#### Galaxy Integration into an External Information System

<div class='right'>[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2013/ExternalIntegrationLightning.pdf), [PPTX](ATTACHMENT_URLDocuments/Presentations/GCC2013/ExternalIntegrationLightning.pptx)</div>

**Alban Lermine**

 Institut Curie

*[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2013/ExternalIntegrationLightning.pdf), [PPTX](ATTACHMENT_URLDocuments/Presentations/GCC2013/ExternalIntegrationLightning.pptx)*

By default, Galaxy generates output files as incremented datasets falling all into the same directory.  What if I want to choose the name and the place where to write the files?  In order to answer this question, I made the following modifications to our instance:

1. Each tool ask for a file name and a project number
1. The Galaxy user check system permissions on input and output files for the current user
1. If it pass the permissions checking step, the Galaxy user execute the analysis, and write the results into the corresponding project directory with the provided file name (but still create  the original dataset, which is now a symbolic link to the real output file)
1. Finally, the Galaxy user gives output files to the current user

<br />

#### Implementing Next Generation Web Server in Galaxy

<div class='right'>[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/NextGenWebServerLightning.pdf)</div>

**Wai Yi Leung**

 Leiden University Medical Centre

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/NextGenWebServerLightning.pdf)*

Focus on performance has shifted from running all analyses in one instance to a local cluster. Optimizations in the tools are dealt with on every major release of Galaxy.  The question remains: what about the basic matters? The codebase of Galaxy is Pylons based, which ran exclusively with Paste at time of writing Galaxy. Our interest is to see whether we can push Galaxy to a new limit on serving more requests per second by just replacing the WSGI server. By just changing 1 line of code; we are able to increase the number request served by 200% and lowered the memory consumption significantly.

<br />

#### Galaxy Scratchbook: How to view, customize, and layout multiple visualizations

<div class='right'>[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2013/ScratchbookLightning.pdf), [PPTX](ATTACHMENT_URLDocuments/Presentations/GCC2013/ScratchbookLightning.pptx)</div>

**Aysam Guerler**

 Emory University

*[PDF](ATTACHMENT_URLDocuments/Presentations/GCC2013/ScratchbookLightning.pdf), [PPTX](ATTACHMENT_URLDocuments/Presentations/GCC2013/ScratchbookLightning.pptx)*

Novel Galaxy tools and visualizations emerge at a rapid pace. This challenges the current user interface when it comes to generating, browsing, and communicating multiple results and visualizations. In this brief presentation, we introduce the Galaxy Scratchbook as an easy-to-use solution for this problem. The Galaxy Scratchbook enables users to dynamically view, customize, and layout multiple visualizations on a single web page. Presented examples focus on Trackster (BED and VCF-files), Circster, Scatterplot, and dataset views.

<br />

#### Unraveling the code of our Galaxy

<div class='right'>[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/UnravelingCodeLightning.pdf)</div>

**Pieter Lukasse**

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/UnravelingCodeLightning.pdf)*

A quick overview of the Galaxy source code organization. This can be useful for people interested in contributing to or customizing some of Galaxy's functionality. I also quickly list the ways we are using Galaxy for proteomics, metabolomics and translational medicine research.


### Day 2: Tuesday 2 July

During [Session 8](/Events/GCC2013/Program#day-2-main-meeting-2-july), moderated by [Hans-Rudolf Hotz](/src/HansrudolfHotz/index.md).

#### How to set up a Galaxy service you can count upon

<div class='right'>[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/ServerYouCanCountOnLightning.pdf)</div>

**Vladimir Daric**, Claire Wallon

 Institut de Génétique et Microbiologie, UMR 8621, CNRS, Université Paris Sud, bâtiment 400, 91405 Orsay Cedex, France

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/ServerYouCanCountOnLightning.pdf)*

The [eBio](http://ebio.u-psud.fr) Bioinformatics Facility of Paris-Sud University, provides access to computing resources, data analysis and programming expertise. We have deployed a Galaxy service devoted mainly to NGS data analyses. Our experience leads us to make certain recommendations for an efficient deployment and administration:

Reducing Galaxy load:<br />
Combined with Apache, we use [Varnish](https://www.varnish-cache.org) cache to accelerate static file serving and to provide websocket-compatibility for real time load measures.

Monitoring Galaxy activity:<br />
We use the [Circus](http://circus.readthedocs.org) process manager to monitor, control and manage Galaxy processes and sockets. Circus provides a real time measure of Galaxy processes load and allows us to know if we need more "web server" or "job handler" processes. Furthermore, Circus can restart a process in case of failure.

Scalability: <br />
All computation is performed on a scalable SGE cluster and datasets are stored on a [ZFS](http://zfsonlinux.org) compressed network share, which provides a highly scalable data storage.

Isolating code from configuration: <br />
We use virtualenv, as recommended by the Galaxy Team, to create an isolated Python environment with a tight control and separation of libraries in use. Furthermore, we carefully separate our software sources and configuration files within Galaxy.

Heavy Testing: <br />
We do make a heavy use of unit and functional testing in our release management.

We added Circus and Varnish usage to the Galaxy team recommendations. In doing so, we are convinced we have built a reliable and robust Galaxy service we can rely on for years.

<br />

==== GenesCloud : Bioinformatics cloud computing infrastructure	====

<div class='right'>[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/GenesCloudLightning.pdf)</div>

Stéphane Bortzmeyer<sup>1</sup>, Charles Loomis<sup>2</sup>, Mohammed Airaj<sup>2</sup>, Michel Fanny<sup>1</sup>, **Victoria Dominguez**<sup>1</sup>

 <sup>1</sup> ABgenomica, Versailles France <br />
 <sup>2</sup> Laboratoire de l'Accélérateur Linéaire, Orsay France

*[Video](ATTACHMENT_URLDocuments/Presentations/GCC2013/GenesCloudLightning.mpg)*

Engineering applications benefits from Cloud Computing features such as customised execution environments, near-instantaneous provisioning, elasticity, and the ability to run user-level services. However, this versatility comes at cost. It's difficult for typical researcher without IT expertise to configure a virtual machine tailored to her needs.
We present here !GenesCloud: a ready-made image for !StratusLab cloud infrastructures allowing a bioinformatics researcher to start virtual machines with all the necessary software already installed and configured. !GenesCloud in !StratusLab is flexible enough to cope with a growing number of users, increasing data sizes, and new requirements for speed and availability. This allows her to go from an idea to the actual launching of the programme in less than 10 minutes, increasing her research throughput. We build on the well-known bioinformatics library !BioLinux and the web-based Galaxy interface. !StratusLab provides a complete open-source IaaS Cloud distribution that focuses on simplicity for users and administrators. One of its chief advantages for this work is the ease of creation of new images."

<br />

#### Andromeda: NBIC Galaxy at Surfsara's HPC cloud

<div class='right'>[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/AndromedaLightning.pdf)</div>

Mattias de Hollander<sup>1</sup>, David van Enckevort<sup>2</sup>, **Leon Mei**<sup>2</sup>, Marc van Driel<sup>2</sup>, Rob Hooft<sup>2</sup>

 <sup>1</sup> KNAW-NIOO<br />
 <sup>2</sup> NBIC

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/AndromedaLightning.pdf)*

Andromeda is a public Galaxy server set up by the Netherlands Bioinformatics Center (NBIC) to support genomics research in the Netherlands. Andromeda has been running over 3 years and was originally intended to be a demonstration server for bioinformatics tools made by NBIC developers. Several application specific pipelines are installed at Andromeda together with common sequencing analysis tools. Andromeda has been used at several NBIC courses to support practicals and has been proven to be an effective platform for knowledge dissemination.

However, the need for processing real scale research datasets at Andromeda was clearly visible already in the beginning. This demand is only becoming more prominent in the past year when more researchers are able to acquire NGS datasets for their project but fail to obtain the necessary bioinformatics support within their groups. 

To support this growing demand, NBIC together with the !BigGrid project and SURFsara installed the new Andromeda at a high performance computing cloud system hosted by SURFsara. This HPC cloud consists of 19 fast servers with 608 CPUs and almost 5TB of memory. In order to best use the elastic resource provided by the HPC cloud, the new Andromeda also incorporates the CloudMan script to support dynamic adding and removing of virtual machines based on the number of submitted jobs. Till the beginning of 2013, there are about 700 registered users at Andromeda and almost 40000 jobs have been executed. 

In this presentation, we will present the architecture of Andromeda and its installation and maintenance procedure.

<br />

#### Workflow4Metabo

<div class='right'>[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/Workflow4MetaboLightning.pdf)</div>

**Gildas Le Corguille**

 UPMC-CNRS

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/Workflow4MetaboLightning.pdf)*

Our team, in collaboration with spectrometry plateforms, implements several tools in Galaxy to analyse data from metabolomic domain. During this talk, I will present our workflow and our vision of Galaxy pros.

#### GLM for testing differential expression and GSEA in Galaxy

<div class='right'>[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/GLM_GSEALightning.pdf)</div>

**[Ross Lazarus](/RossLazarus)**, Mark Ziemann and Antony Kaspi.  

 Baker IDI Heart and Diabetes Institute

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/GLM_GSEALightning.pdf)*
 
A new suite of Galaxy tools designed to support count based GLM for differential expression of RNA and other sequence data with biological replicates will be briefly introduced. HTSeq is used to apply a gene model GTF file over multiple sample SAM/BAM files to create raw count matrices; edgeR, VOOM/limma and DESeq from !BioConductor are used to test for differential relative abundance; and GSEA from the Broad is available to explore for unexpected enrichment of MSigDB and user provided coregulated gene sets representing interesting biological conditions and pathways. Where replicates are available, where GLM are needed to model the experimental design, and where differential splicing is not the primary biological question, these new tools provide an alternative to existing RPKM based methods in Galaxy which may be [less than optimal (Dillies et al.)](http://bib.oxfordjournals.org/content/early/2012/09/15/bib.bbs046.long) for testing differential abundance and are not currently able to model (eg) paired samples correctly. The GSEA tool takes the statistical differential test tables directly and tests for biological pathway enrichment. These are all available for evaluation from the test toolshed. Their integration into Galaxy will greatly facilitate empirical comparison of competing count and RPKM approaches at the level of individual differentially expressed genes and in terms of higher level biological pathways.

#### Analysis of DNA methylation data using galaxy

<div class='right'>[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/MethylationLightning.pdf)</div>

**Pavan Videm**, Björn Grüning, Rolf Backofen

 University of Freiburg, Germany

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/MethylationLightning.pdf)*

DNA methylation, a chemical process of methyl group addition to the cytosine. It is interesting to study DNAmethylation for several reasons namely: it involves in gene  expression regulation, gene silencing, embyonic development, cell diffrentiation and X-chomosome inactivation. Till date the main focus of DNA methylation is on reduced representation BS-seq (RRBS), less expensive but interrogates only a few percent of the genome. Here we present a methylation analysis  pipeline which is aimed at genome-wide methylation analysis. We take the advantage of galaxy's easy usage and reproducibility to make our pipeline usable by biologists.

<br />

#### Galaxy on an elastic HPC cluster at AWS

<div class='right'>[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/ElasticLightning.pdf)</div>

**Srinivas Maddhi**

 Iowa Institute Of Human Genetics

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/ElasticLightning.pdf)*

A recipe for efficiently installing Galaxy on a bi-directionally auto-scaling HPC cluster at AWS.

 Initial build time: 90 minutes (estimated)

 Subsequent builds: 30 minutes (estimated)

<br />

#### Running Galaxy workflows using the CLC Main Workbench

<div class='right'>[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/CLCMainLightning.pdf)</div>

**Marc Logghe**

 Ablynx NV, Gent Belgium 

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/CLCMainLightning.pdf)*

The CLC Main Workbench is a desktop application for sequence analysis created by CLC Bio (Aarhus, Denmark). The software is written in java and closed source but an SDK is provided that allows for extension of the workbench by means of plugins. As a proof of concept, a plugin was created that makes it possible to launch Galaxy workflows and render the results.

In that way, the users do not need to learn yet another tool and leave their comfort zones. In the live demo you will see how to configure the Galaxy client, run a simple workflow taking a single dataset as input and retrieve the results. Optionally, the Galaxy histories can be browsed in the navigation area of the workbench.

<br />

#### Proteogenomics with Galaxy

<div class='right'>[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/ProteoGenomicsLightning.pdf)</div>

**Ira Cooke**

 LSCC / La Trobe

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/ProteoGenomicsLightning.pdf)*

The premise of the talk will be to highlight the power of Galaxy for interdisciplinary biology (in this case combining genomics and proteomics).  Galaxy already comes with most of the tools required for the genomics part of proteogenomics .. with the addition of proteomics tools and a data converter tool it is possible to perform an entire proteogenomics workflow in Galaxy, including visualisation of the results using trackster.

<br />

#### "Lightweight" HPC Client: Leveraging Galaxy Tool configs

<div class='right'>[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/LightweightHPCLightning.pdf)</div>

**Samuel Lampa**

 [SNIC-UPPMAX](http://www.uppmax.uu.se), [Dept of Pharm Biosciences](http://www.farmbio.uu.se) 

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/LightweightHPCLightning.pdf)*

A lightweight HPC client, that is not based upon the full Galaxy stack, but mainly the Tool config files, and that might be a complementary solution to centers who are providing both Galaxy and shell-based access to their cluster.

Instead of running a web server, it runs locally on the users machine (as a javaapplication) andin the background accesses the clustervia SSH, in the same way as you would have done with the terminal.

Using the tool configs, a wizard is presented to the user for configuring SLURM sbatch files. After a job is submitted, jobs can be viewed in a separate view, and the user can also manage files on the cluster via the inbuildfile-browser, genome-viewer etc, without the full Galaxy stack.

But, if the user wants to run an own Galaxy instance on the cluster, the client can also do the tricky SSH tunneling magic for the user, and present the galaxy web ui in an built-in browser.

<br />

#### ChemicalToolBoX: Cheminformatics inside the Galaxy

<div class='right'>[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/Lightning.pdf)</div>

**Björn Grüning**

 University of Freiburg, Germany

*[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2013/ChemicalToolBoxLightning.pdf)*

## Goals

This is your opportunity to give an impassioned and enthralling talk about something that you care about - but you only have 300 seconds. Make every one count, because your audience may include people suffering from limited attention spans this late in the proceedings.  

## Timing

* Lightning talks are **5** minutes followed by **2** minutes for questions.  
* At **5** minutes in, **thunder will be played** (imagine Thor running towards the stage; this is Norway)
* At **6** minutes in we will take over the presentation laptop and start switching to the next set of slides.
* At **7** minutes the next talk will start, *no matter what.*

## Slides

* Your slides (as PDF or !PowerPoint) should be on the presentation computer before the session starts (talk to [Dave Clements](/src/DaveClements/index.md)) to minimize the risk of BYOD. 
* You can BYOD (your own computer or whatever) but you are advised not to. 
* **If you do BYOD, we will start swapping out your device at 2 minutes left, rather than 1.**
* Connection and fiddling time beyond the first minute comes out of your 5 minutes and ***is painful, for everyone.***  

## Gratuitous Advice

From [Ross Lazarus](/RossLazarus), *Benevolent Lightning Session Moderator for Life*

* Good lightning talks are well rehearsed and very, very focussed.  
* Plan on talking to 5 or 6 slides 
* Don't try to cram a 30 minute talk into 5 minutes. It won't fit. 
* 5 minutes is not long enough to explain anything in detail.  Just give the big picture.  
* Practice your talk at least 3 times to make sure it works and fits in 5 minutes. 
* If you have more than 5 or 6 slides, you are probably screwed before you start and stand a high risk of being cut off in mid-flight unless you have rehearsed a few times with a timer to be sure you can fit everything in. 
* You are advised not to read your acknowledgements out loud. It's a lightning talk for heaven's sake. 


PLACEHOLDER_INCLUDE(/Events/GCC2013/Footer)
