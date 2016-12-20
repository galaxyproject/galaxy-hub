---
autotoc: true
---
{{> Events/GCC2013/Header }}

{{> Events/GCC2013/LinkBox }}

# Talk Abstracts



## 1 July: Session 1: Reproducible science 

### Computational Reproducibility is Crucial for Scientific Software Platforms

<div class='right'><a href='http://www.stanford.edu/~vcs/Bio.html'><img src="/src/events/GCC2013/Abstracts/Talks/VictoriaStodden.jpg" alt="Victoria Stodden" width="120" /></a></div>

**[Victoria Stodden](http://www.stanford.edu/~vcs/Bio.html)**

 [Institute for Data Sciences and Engineering](http://idse.columbia.edu/victoria-stodden) and Assistant Professor, [Department of Statistics](http://www.stat.columbia.edu/), [Columbia University](http://www.columbia.edu/)

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/StoddenComputationalReproducibility.pdf), [Vimeo](https://vimeo.com/74878594)*

*Abstract:*

It is now well accepted that computation is emerging as central to the scientific enterprise. With this transformation, it is essential to make available the data and code associated with published results, and the means to replicate and rerun the computational experiments. Software platforms that enable the management of scientific workflow and dissemination of reproducible results from a central part of the future of computational science. In this talk I describe the "reproducible research movement," a grassroots effort across many fields, discuss the rapidly changing federal policies requiring public access to scientific data and results. Finally, I will present challenges facing the reproducible research movement, including cyberinfrastructure design and funding, reward mechanisms, and accessibility.

*Biography:*

Victoria is an assistant professor of [Statistics](http://www.stat.columbia.edu/) at [Columbia University](http://www.columbia.edu/), and affiliated with the Columbia University [Institute for Data Sciences and Engineering](http://idse.columbia.edu/victoria-stodden). She completed her PhD in statistics and her law degree at Stanford University. Her research centers on the multifaceted problem of enabling reproducibility in computational science. This includes studying adequacy and robustness in replicated results, designing and implementing validation systems, developing standards of openness for data and code sharing, and resolving legal and policy barriers to disseminating reproducible research.

[Victoria](http://www.stanford.edu/~vcs/Bio.html) is also  
* the developer of the [Reproducible Research Standard](http://ijclp.net/old_website/article.php?doc=1&issue=13_2009), a suite of open licensing recommendations for the dissemination of computational results.
* a co-founder of [RunMyCode.org](http://www.RunMyCode.org), an open platform for disseminating the code and data associated with published results, and enabling independent and public cloud-based verification of methods and findings.
* creator and curator of [SparseLab](http://sparselab.stanford.edu/), a collaborative platform for reproducible computational research in underdetermined systems.

<br />

### Reproducible research and the 90/10 rule: Improving the ratio of light script to dark script matter in your Galaxy

<div class='right'><a href='/src/fubar/index.md'><img src="/src/GalaxyTeam/ross.jpg" alt="" width="120" /></a></div>

**[Ross Lazarus](/src/fubar/index.md)<sup>1</sup>**, Antony Kaspi<sup>1</sup>, Mark Ziemann<sup>1</sup> and The [Galaxy Team](/src/GalaxyTeam/index.md) <sup>2</sup>.

 <sup>1</sup> BakerIDI Heart and Diabetes Research Institute, 75 Commercial Rd, Melbourne, VIC 3004, Australia<br />
 <sup>2</sup> http://wiki.galaxyproject.org[/GalaxyTeam](/src/events/GCC2013/Abstracts/Talks/GalaxyTeam/index.md)

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/LazarusReproducibleResearch.pdf), [Vimeo](https://vimeo.com/74885862)*

Scientific progress in biology relies on valid experimental results that can be independently reproduced. This fundamental requirement for good science presents a tough challenge for automated bioinformatic analysis services. Experimental complexities vary widely and rapid rates of change in molecular technologies and in popular tools mean that even well established reproducible automated workflows inevitably require tinkering to get them to work for some data. In typical academic laboratories, well run automated analysis systems might hope to support at best about 80-90% of routine analyses, but not all. 

Sometimes a new framework capability is needed, but even if writing a quick script to perform the task is relatively trivial, manually writing and installing the wrapper code to integrate a new framework tool is not. Small scripts may be written and run to transform data outside the framework to complete an analysis if time is constrained. Quick manual fixes are unlikely to be documented well or to reach a source code repository. Functional but hidden, we refer to these as bioinformatic dark script matter (DSM), which in contrast to automated, documented, secure and visible light script matter, may soon be forgotten or lost. Analyses involving DSM may not be reliably reproducible. 

An installable Galaxy tool will be demonstrated that reproducibly runs user supplied scripts in popular scripting languages. It optionally generates a complete, new Galaxy tool in Tool Shed shareable form, wrapping the supplied script. The importance and implications of these integrated Galaxy components for minimizing DSM in reproducible research will be briefly reviewed.

<br />

### Reproducible and automated processing in high-throughput NGS facilities

<div class='right'><a href='http://www.crs4.it/crs4/peopledetails/people/148/Luca_Pireddu'><img src="/src/events/GCC2012/Abstracts/Cuccuru.jpg" alt="" width="0" /></a></div>

[Gianmauro Cuccuru](http://www.crs4.it/crs4/peopledetails/people/195/Gianmauro_Cuccuru)<sup>1</sup>, Giorgio Fotia<sup>1</sup>, Josh Moore<sup>2</sup>, Luca Lianas<sup>1</sup>, **[Luca Pireddu](http://www.crs4.it/crs4/peopledetails/people/148/Luca_Pireddu)**<sup>1</sup>, Jason Swedlow<sup>2</sup>, Gianluigi Zanetti<sup>1</sup>

 <sup>1</sup> [CRS4](http://www.crs4.it/), Pula, Sardegna, Italy<br />
 <sup>2</sup> Wellcome Trust Centre for Gene Regulation and Expression, College of Life Sciences, University of Dundee, Dundee, Scotland, UK 

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/PiredduReproducibleAutomated.pdf), [Vimeo](https://vimeo.com/74876719)*

As the rate of samples to process in high-throughput sequencing facilities increases, performing and tracking the center’s operations becomes increasingly difficult, costly and error prone, while processing the massive amounts of data poses significant computational challenges.

We present our ongoing work to accelerate, automate and track all data-related procedures at the CRS4 Sequencing Platform by integrating Galaxy with other state-of-the-art processing technologies, such as Hadoop, OMERO and iRODS.

In our model, data processing pipelines are implemented as one or more Galaxy workflows. Through our integration work, in addition to conventional tools Galaxy is able to drive high-performance Hadoop-based processing tools. With all workflows, Galaxy tracks the processing steps applied to data through its histories; as data sets are generated, these histories are extracted and stored into our OMERO.biobank, thus documenting the data and ensuring reproducibility. The data itself, on the other hand, is committed to iRODS, hence providing a single file repository, independent from the storage infrastructure. A custom “automator” daemon is the final component required to drive the system. It launches and monitors Galaxy workflows, links workflows to each other – e.g., execute sample-based workflows after a flowcell-based workflow – and passes information between components – i.e., saves data sets and histories in OMERO.biobank, commits files to iRODS, etc.

Currently, the system is in its testing phase and is on schedule to be in production at CRS4 by May 2013. In addition, future extensions will allow it to be used to process data from other sources, such as mass spectrometers and digital microscopes.

<br />

## 1 July: Session 2: Genome analysis

### A Galaxy of learning: Bioinformatics tutorials based on Galaxy

<div class='right'><img src="/src/events/GCC2013/Abstracts/Talks/SimonGladman.jpg" alt="Simon Gladman"  /></div>

**Simon Gladman**<sup>1,2</sup>, Mahtab Mirmomeni<sup>1</sup>, Andrew Lonie<sup>1</sup>

 <sup>1</sup> Life Sciences Computation Centre, Victorian Life Sciences Computation Initiative, Melbourne, Victoria, Australia.<br />
 <sup>2</sup> Victorian Bioinformatics Consortium, Monash University, Victoria, Australia.

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/GladmanGalaxyLearning.pdf), [Vimeo](https://vimeo.com/74875133)*

The Australian government has funded the development of a Genomics Virtual Laboratory (GVL): a set of analysis & visualisation platforms (currently Galaxy and UCSC genome browser) implemented on the [Australian Research Cloud infrastructure (http://www.nectar.org.au/research-cloud)](http://www.nectar.org.au/research-cloud), and community resources for best practice genomics, including protocols, workflows and tutorials for common genomics tasks. 

We have written a number of tutorials for common bioinformatic tasks using Galaxy as the delivery platform. The areas covered include, de novo assembly, variant calling (basic and advanced), DGE analysis and others. The tutorials use real data and best practice tools to teach users the concepts of the analyses without the hassle of them having to learn the command line at the same time.

The process of developing these tutorials involved: Designing the workflow; wrapping the relevant tools into Galaxy with their associated scripts and tool/repository dependencies; making the data sets available via published Galaxy histories; making the tools available/installable via the toolshed; and production of the tutorial documentation. The tutorials were then extensively tested before being presented to the Australian genomics research community.

This talk will be about our experiences in the development of the tutorials including the incorporation of the the tools into Galaxy, the use of the toolshed and the feedback received from giving the tutorials.

The tutorials and other associated resources are freely available at http://www.genome.edu.au.

<br />

### The Genomic HyperBrowser: a Galaxy-based web server for analysis of genomic tracks

<div class='right'><a href='http://www.mn.uio.no/ifi/english/people/aca/geirksa/'><img src="/src/events/GCC2013/Abstracts/Talks/GeirKjetilSandve.jpg" alt="Geir Kjetil Sandve" height="110" /></a> <a href='http://www.ous-research.no/hovig/'><img src="/src/events/GCC2013/Abstracts/Talks/ElvindHovig.jpg" alt="Elvind Hovig" height="110" /></a></div>

**[Geir K Sandve](http://www.mn.uio.no/ifi/english/people/aca/geirksa/)<sup>1,2</sup>**, Sveinung Gundersen<sup>3</sup>, Morten Johansen<sup>4</sup>, Ingrid K Glad<sup>5</sup>, Krishanthi Gunathasan<sup>6</sup>, Lars Holden<sup>7</sup>, Marit Holden<sup>7</sup>, Knut Liestø<sup>l1,2</sup>, Ståle Nygård<sup>8</sup>, Vegard Nygaard<sup>4</sup>, Jonas Paulsen<sup>1,4</sup>, Halfdan Rydbeck<sup>1,3,7</sup>, Kai Trengereid<sup>1</sup>, Trevor Clancy<sup>3</sup>, Finn Drabløs<sup>9</sup>, Egil Ferkingstad<sup>7</sup>, Matúš Kalaš<sup>10,11</sup>, Tonje Lien<sup>5</sup>, Morten B Rye<sup>9</sup>, Arnoldo Frigessi<sup>7,12</sup> and **[Eivind Hovig](http://www.ous-research.no/hovig/)<sup>1,3,4,7</sup>**<br />

 <sup>1</sup> Department of Informatics, University of Oslo, Norway<br />
 <sup>2</sup> Centre for Cancer Biomedicine, University of Oslo, Norway<br />
 <sup>3</sup> Department of Tumor Biology, Institute for Cancer Research, The Norwegian Radium Hospital, Oslo University Hospital, Po Box 4950 Nydalen, 0424 Oslo, Norway<br />
 <sup>4</sup> Institute for Medical Informatics, The Norwegian Radium Hospital, Oslo University Hospital, Norway<br />
 <sup>5</sup> Department of Mathematics, University of Oslo, Norway<br />
 <sup>6</sup> Department of Medical Biology, Faculty of Health Science, University of Tromsø, Norway<br />
 <sup>7</sup> Statistics For Innovation, Norwegian Computing Center, Norway<br />
 <sup>8</sup> Bioinformatics core facility, Oslo University Hospital and University of Oslo, Norway<br />
 <sup>9</sup> Department of Cancer Research and Molecular Medicine, Norwegian University of Science and Technology (NTNU), Norway<br />
 <sup>10</sup> Department of Informatics, University of Bergen, Norway<br />
 <sup>11</sup> Computational Biology Unit, Uni Computing, Norway<br />
 <sup>12</sup> Department of Biostatistics, Institute of Basic Medical Sciences, University of Oslo, Norway

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/HovigSandveGenomicHyperbrowser.pdf), [Vimeo](https://vimeo.com/74872871)*

The immense increase in availability of genomic scale data sets, such as those provided by the ENCODE and Roadmap Epigenomics projects, allows individual researchers to analyze and query relations between genomic tracks at an unprecedented level.

The [Genomic HyperBrowser (http://hyperbrowser.uio.no/test)](http://hyperbrowser.uio.no/test) is an open-ended, Galaxy-based web server for the analysis of genomic track data. Through the provision of several highly customizable components for processing and statistical analysis of genomic tracks, the HyperBrowser opens for a range of genomic investigations, related to e.g. gene regulation, disease association or epigenetic modifications of the genome. A main tool offers a set of 56 descriptive statistics and 20 hypothesis tests on properties of individual tracks and relations between tracks. The HyperBrowser hosts a further 40 purpose-built tools for the broader analysis setting, including tools that support typical needs for generating and customizing genomic track data prior to analysis, as well as tools for visualization and more specialized analysis of genomic tracks.

<br />

### modENCODE Galaxy: Uniform ChIP-Seq Processing Tools for modENCODE and ENCODE Data

<div class='right'><a href='http://oicr.on.ca/institution/ontario-institute-cancer-research-oicr/person/dr-quang-trinh-scientist-and-computational'><img src="/src/events/GCC2013/Abstracts/Talks/QuangTrinh.jpg" alt="Quang M. Trinh" width="80" /></a></div>

**[Quang M. Trinh](http://oicr.on.ca/institution/ontario-institute-cancer-research-oicr/person/dr-quang-trinh-scientist-and-computational)<sup>1</sup>**, Fei-Yang (Arthur) Jen<sup>1</sup>, Ziru Zhou<sup>1</sup>, Kar Ming Chu<sup>1</sup>, Marc D. Perry<sup>1</sup>, Ellen Kephart<sup>1</sup>, Sergio Contrino<sup>2</sup>, Peter Ruzanov<sup>1</sup>, Lincoln D. Stein1<sup>3</sup>

 <sup>1</sup> Ontario Institute for Cancer Research, MaRS Centre, South Tower, 101 College Street, Suite 800, Toronto, ON, Canada M5G 0A3.<br />
 <sup>2</sup> Department of Genetics, University of Cambridge, Downing Street, Cambridge CB2 3EH, UK.<br />
 <sup>3</sup> Department of Molecular Genetics, University of Toronto, 1 Kings College Circle, Toronto, ON Canada M5S 1A8.<br />

*[PDF](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/TrinhModENCODEGalaxy.pdf), [PPTX](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/TrinhModENCODEGalaxy.pptx), [Vimeo](https://vimeo.com/74869999)*

Funded by the National Institutes of Health, the aim of the modENCODE project is to provide the biological research community with a comprehensive encyclopedia of functional genomic elements for both model organisms *C. elegans* and *D. melanogaster*.  With a total size of just under 10 terabytes of data collected and released to the public, one of the challenges faced by researchers is to extract biologically meaningful knowledge from this large data set.  While the basic quality control, pre-processing, and analysis of the data has already been performed by members of the modENCODE consortium, many researchers will wish to reinterpret the data set using modifications and enhancements of the original protocols, or combine modENCODE data with other data sets. Unfortunately this can be a time consuming and logistically challenging proposition.

In recognition of this challenge, the modENCODE DCC has released uniform computing resources for analyzing modENCODE data on Galaxy, on the public Amazon Cloud. and on the private Bionimbus Cloud for genomic research. In particular, we have released Galaxy workflows for interpreting ChIP-seq data which use the same quality control and peak calling standards adopted by the modENCODE and ENCODE communities.  For convenience of use, we have created Amazon and Bionimbus Cloud machine images containing Galaxy along with all the modENCODE data, software and other dependencies. Using these resources provides a framework for running consistent and reproducible analyses on modENCODE data, ultimately allowing researchers to use more of their time using modENCODE data, and less time moving it around.

<br />

### The Galaxy SlipStream Appliance: Galaxy Made Easy

<div class='right'><a href='http://bioteam.net/company-leadership/'><img src="/src/events/GCC2013/Abstracts/Talks/AnushkaBrownley.jpg" alt="Anushka Brownley" width="100" /></a></div>

**[Anushka Brownley](http://bioteam.net/company-leadership/)**

 [BioTeam](http://bioteam.net/)

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/BrownleyGalaxySlipStream.pdf), [Vimeo](https://vimeo.com/74869438)*

IT infrastructure and support can be a bottleneck when trying to analyze data.   The Galaxy SlipStream Appliance is designed to reduce the IT and administrative burden of running a production instance of the Galaxy software package and its underlying tools. SlipStream integrates a powerful computational infrastructure and storage system in a desktop server to provide a dedicated resource to quickly analyze data with Galaxy.

<br />

## 1 July: Session 3: Application-specific workflow

### Single-cell genomics pipeline: from raw reads to phylogenomics using Galaxy

<div class='right'><img src="/src/events/GCC2013/Abstracts/Talks/LionelGuy.png" alt="Lionel Guy" width="120" /></div>

**[Lionel Guy](http://www.icm.uu.se/research/Molecular-Evolution/People/lionel-guy/)** and [Thijs Ettema](http://www.icm.uu.se/research/Molecular-Evolution/People/thijs-ettema/)

 [Department of Cell and Molecular Biology](http://www.icm.uu.se/) and [SciLifeLab](http://www.scilifelab.se/), Uppsala University, Uppsala, Sweden

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/GuySingleCell.pdf), [Vimeo](https://vimeo.com/74869178)*

Only a few percent of prokaryotes are cultivable: the vast majority of them remains to be discovered, but recent technological developments in single-cell genomics now grant us access to this unknown diversity. To answer questions about microbial diversity and even how complex life forms emerged, we sample novel, deep-rooting taxa from a wide variety of environments.

Cells extracted from samples are sorted in 384-well plates using fluorescence-activated cell sorting (FACS). They are lysed, and their genome is amplified with multiple displacement amplification (MDA), yielding a single-cell amplified genome (SAG). SAGs representing cells of interest are multiplexed and sequenced with next-generation sequencing. Up to 100 SAGs can be sequenced on one lane of a Illumina HiSeq2500, and we plan to sequence several thousand SAGs every year.

The Galaxy platform was chosen to handle the vast amount of data generated in the single-cell genomics pipeline. The platform will be integrated in our LIMS system, keeping track of all samples and SAGs present in our lab. Three pipelines are being designed: the first takes raw reads from the sequencing runs as input, performs quality and contamination checks, assembles SAGs, and outputs scaffolds. The second is dedicated to physical and functional annotation of genomes. The third will perform comparative genomics, assemble sets of orthologous genes from our SAGs and published genomes, and perform phylogenomics on the aligned sequences, yielding high-quality phylogenetic trees.

By pairing single-cell genomics with advanced bioinformatics, we aim to shed some light on the deep roots of the Tree of Life.

<br />

### A layered genotyping-by-sequencing pipeline using Galaxy

<div class='right'><img src="/src/events/GCC2013/Abstracts/Talks/SimonGuest.jpg" alt="Simon Guest" width="100" /></div>

Rudiger Brauning, **Simon Guest**, Alan McCulloch, Russell Smithies 
 
 [AgResearch New Zealand](http://www.agresearch.co.nz/)

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/GuestLayeredGentotyping.pdf), [Vimeo](https://vimeo.com/74868420)*

At [AgResearch](http://www.agresearch.co.nz/) around 300 scientists perform data intensive biological research in the areas of animal and plant performance.  A recent milestone was processing our billionth NZ sheep genotype.  Genotyping-by-sequencing (GBS) is becoming an increasingly important technique underpinning both applied and pure research.  Potential practical benefits include rapid genetic improvement and adaption in agricultural species, while scientific advances such as novel variation discovery,  and geographic, cultural and historical mapping of populations via extremely dense molecular markers are made possible.  GBS pipelines are both scientifically and computationally challenging, involving both high-throughput, and many sequential steps, some of which (such as alignment of error-prone short reads against high diversity, large genome species ) require the use of High Performance Computing (HPC) resources and approaches such as parallelisation.  These HPC approaches necessarily involve the context-sensitive fragmentation of data into smaller packets for distribution across an HPC cluster, and re-assembly of output files before progressing to the next step.  Yet it is important that utilisation of HPC resources by GBS workflows is transparent to end users, so that proposed, in-progress and completed work-flows that are to be shared and reviewed by project scientists, present a clear auditable end-to-end view of the data pipeline, without low level HPC clutter.  We present a GBS pipeline we have developed using Galaxy workflows, which uses a layered approach, including low-level HPC conditioning of tool commands in such a way that HPC is transparent to users.  We outline advantages and disadvantages of our approach and discuss ideas for future improvement.

<br />

### The Linked2Safety's Galaxy Based Data Analysis Space

<div class='right'><img src="/src/events/GCC2013/Abstracts/Talks/AristosAristodimou.jpg" alt="Aristos Aristodimou" width="90" /></div>

**Aristos Aristodimou**, Athos Antoniades, Constantinos Pattichis

 Department of Computer Science, University of Cyprus, Nicosia

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/AristodimouLinked2Safety.pdf), [Vimeo](https://vimeo.com/74867327)*

[Linked2Safety](http://www.linked2safety-project.eu/) (288328) is an FP7 project funded by the European Commission under the area of ICT for health. The vision of the project is to advance clinical practice and accelerate medical research, by providing homogenized access to anonymized aggregated distributed EHRs, and the tools for analyzing such data. The datasets provided to [Linked2Safety](http://www.linked2safety-project.eu/) contain genetic, phenotypic, drug and adverse event related information. The proposed data analysis space uses a Galaxy based platform that allows its users to run analyses on the anonymized aggregated distributed EHRs. The Galaxy tools that can be used are grouped in the following categories: i) quality control, ii) feature selection, iii) single hypothesis testing, iv) data mining, and v) visualization. The [Linked2Safety](http://www.linked2safety-project.eu/) data analysis space supports: i) the automated storing of all of the statistically significant associations and association rules from the analyses performed; and ii) allows knowledge extraction, that can be used as an alerting tool that will provide early identification of adverse events.  The proposed data analysis space will initially test more than 300 hypotheses (based on experts’ knowledge and the current literature) on the showcases datasets (diabetes, breast cancer, psychiatric disorders), and will identify the association rules of statistically significant results.

<br />

### Galaxy as an Integration and Workflow Platform for a Cloud Enabled Bio-medical Image Analysis and Image Processing Toolkit

<div class='right'><img src="/src/events/GCC2013/Abstracts/Talks/PiotrSzul.jpg" alt="" width="80" /></div>

**Piotr Szul**, Dadong Wang, Yulia Arzhaeva, Shiping Chen, Alex Khassapov, Neil BurdeI, Timur Gureyev, John Taylor, Tomasz Bednarz

 CSIRO Commonwealth Scientific and Industrial Research Organisation, Australia

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/SzulCloudImage.pdf), [Vimeo](https://vimeo.com/74418904)*

Cloud Based Image Analysis and Processing Toolbox project being carried out by CSIRO, is to run on the Australian National eResearch Collaboration Tools and Resources (NeCTAR) cloud infrastructure and is designed to give access to biomedical image processing and analysis services integrated within a workflow platform to Australian researchers via remotely accessible user interfaces.  

Galaxy was selected as a workflow and integration platform with CloudMan supporting distributed computational capabilities in the cloud environment. Galaxy was extended to support image data types and a number of tools for 2D and 3D image analysis and processing were developed based on the existing CSIRO software packages for quantifying cell features in microscopy, 3D medical imaging and X-ray Computer Tomography.

The presentation explores the adaption of Galaxy to the domain of image processing and visualization as well as showcases Galaxy installation in the NeCTAR cloud.

<br />

### Representation and statistical analysis of 3D chromatin data in a Galaxy framework

<div class='right'><img src="/src/events/GCC2013/Abstracts/Talks/JonasPaulsen.jpg" alt="Jonas Paulsen" width="120" /></div>

**Jonas Paulsen <sup>1</sup>**, Tonje G. Lien <sup>2</sup>, Geir Kjetil Sandve <sup>3,4</sup>, Lars Holden<sup>5</sup>, Ørnulf Borgan<sup>2</sup>, Ingrid K. Glad <sup>2</sup> and [Eivind Hovig](http://www.ous-research.no/hovig/) <sup>1,3,6</sup><br />

 <sup>1</sup> Oslo University Hospital, Section for Medical Informatics, The Norwegian Radium Hospital, P.O. Box 4950, Nydalen, N-0424 Oslo, Norway.<br />
 <sup>2</sup> University of Oslo, Department of Mathematics, P.O. Box 1053, Blindern, 0316 Oslo, Norway.<br />
 <sup>3</sup> University of Oslo, Department of Informatics, P.O. Box 1080, Blindern, 0316 Oslo, Norway.<br />
 <sup>4</sup> Centre for Cancer Biomedicine, Faculty of Medicine, University of Oslo, P.O. Box 4950, Nydalen, 0424 Oslo, Norway.<br />
 <sup>5</sup> Statistics for Innovation, Norwegian Computing Center, 0314 Oslo, Norway.<br />
 <sup>6</sup> Oslo University Hospital, Institute for Cancer Research, Department of Tumor Biology, The Norwegian Radium Hospital, P.O. Box 4950, Nydalen, N-0424 Oslo, Norway.<br />

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/PaulsenStatisticalChromatin.pdf), [Vimeo](https://vimeo.com/74417246)*

The study of chromatin 3D structure has recently gained much focus due to novel techniques, such as Hi-C and Chia-PET, for detecting genome wide chromatin contacts utilizing next-generation sequencing. Both the representation and analysis of such data is complex, and appropriate tools are presently lacking.

We are developing user-friendly tools for statistical analysis of 3D interaction data in a Galaxy framework, building on existing software components of the Genomic HyperBrowser. Our main focus has been on developing hypothesis tests and descriptive statistics where the user can ask specific questions concerning the spatial arrangement of genomic elements in three dimensions. 

We show examples of spatial co-localization of chromatin states and fusion transcripts, and show how visualization and descriptive statistics can accompany hypothesis testing to gain biological knowledge of the 3D organization of chromatin.

<br />

## 1 July: Session 4

### Ion Torrent Semiconductor Sequencing Update

 
<div class='right'><img src="/src/MikeLelivelt/pic.png" alt="" width="90" /></div>

**[Mike Lelivelt](/src/MikeLelivelt/index.md)<sup>1</sup>**

 <sup>1</sup> Director of Bioinformatics and Software Products, [Ion Torrent, part of Life Technologies](http://lifetech.com) 

Ion Torrent has invented the first device—a new semiconductor chip—capable of directly translating chemical signals into digital information. The Ion Personal Genome Machine™ Sequencer, launched in December of 2010, delivered 1000X scalability improvements in its first year of commercial availability. The PGM now can deliver over 2 GB of data using the 318 chip with 400 bp read lengths. Ion Torrent released the Ion Proton™ Sequencer in late 2012. The P1 chip has routinely generates 12 GB of across its 165 million microwells with 200 bp read lengths.  Both sequencers generate data for a wide variety of applications include: gene panel sequencing, exome analysis, transcript analysis (include whole message, small message, and targeted message), copy number analysis, 16S analysis, and de novo assembly.  A review of software development resources will be provided so any interested developer can integrate into the Ion Torrent analysis pipeline.

<br />

## 2 July: Session 5: Interacting with Galaxy

### State of the Galaxy

<div class='right'><img src="/src/GalaxyTeam/anton.jpg" alt="" width="120" />&nbsp;<img src="/src/GalaxyTeam/james.jpg" alt="" width="120" /></div>

**[Anton Nekrutenko](/src/anton/index.md)<sup>1</sup> and [James Taylor](/src/JamesTaylor/index.md)<sup>2</sup>**

 <sup>1</sup> [Penn State University](http://psu.edu/)<br />
 <sup>2</sup> [Emory University](http://emory.edu/)

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/NekrutenkoTaylorState.pdf), [Vimeo](https://vimeo.com/74413993)*

An overview of where the Galaxy Project is and where it is going.

<br />

### BioBlend - automating bioinformatics with Galaxy and CloudMan

**Clare Sloggett**<sup>1</sup>, [Nuwan Goonasekera](http://versi.edu.au/about-us/versi-team#Nuwan)<sup>1,2,4</sup>, [Enis Afgan](/src/EnisAfgan/index.md)<sup>1,3,4</sup>

 <sup>1</sup> Victorian Life Sciences Computation Initiative (VLSCI), University of Melbourne<br />
 <sup>2</sup> Victorian eResearch Strategic Initiative (VeRSI), University of Melbourne, Melbourne, Australia<br />
 <sup>3</sup> Center for Informatics and Computing (CIR), Ruđer Bošković Institute (RBI)<br />
 <sup>4</sup> Galaxy Project (http://galaxyproject.org)

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/SloggettBioBlend.pdf), [Vimeo](https://vimeo.com/74403037)*

The Galaxy API allows users and administrators to access a rapidly expanding set of Galaxy functionality via REST commands. CloudMan is a cloud-based job runtime platform, which allows researchers to easily provision scalable 'virtual clusters' to run Galaxy and other applications in a cloud computing environment, and which provides its own REST-based API. 

As a part of Australia’s Genomics Virtual Laboratory project, we created the [BioBlend](http://bioblend.readthedocs.org/) library, a unified API in a high-level language (python) that wraps the functionality of both Galaxy and CloudMan APIs. BioBlend encapsulates the underlying REST API of the two applications in a format that is more suitable for programming and thus makes it easier for bioinformaticians to automate end-to-end large-data analysis, from scratch. Because the end result of a data analysis is still available in the Galaxy environment, the resulting pipeline is highly accessible to collaborators. In combination with CloudMan, it is possible to both provision the required infrastructure, and automate complex analyses over large data sets on an as needed basis.

The library is easily installable via [PyPi](https://pypi.python.org/pypi) and comes with detailed documentation and example scripts. BioBlend is released under the MIT license. Documentation and installation instructions can be found at http://bioblend.readthedocs.org/, and the source code is available at https://github.com/afgane/bioblend/.

<br />


### Extension of Galaxy to Utilize Web Services and A Semantic Suggestion Engine

<div class='right'><a href='http://mango.ctegd.uga.edu/jkissingLab/'><img src="/src/events/GCC2013/Abstracts/Talks/JessicaKissinger.png" alt="Jessica Kissinger" width="100" /></a></div>

Alok Dhamanaskar<sup>1</sup>, Akshay Choche<sup>1</sup>, Michael E. Cotterell<sup>1</sup>, Jie Zheng<sup>5</sup>, Christian Stoeckert Jr.<sup>5</sup>, **[Jessica C. Kissinger](http://mango.ctegd.uga.edu/jkissingLab/)**<sup>1;2;3;4</sup> and John A. Miller<sup>1;2</sup>

<sup>1</sup> Department of Computer Science, University of Georgia, Athens, GA 30602<br />
<sup>2</sup> Institute of Bioinformatics, University of Georgia, Athens, GA 30602<br />
<sup>3</sup> Department of Genetics, University of Georgia, Athens, GA 30602<br />
<sup>4</sup> Center for Tropical and Emerging Global Diseases, University of Georgia, Athens, GA 30602<br />
<sup>5</sup> Penn Center for Bioinformatics and Department of Genetics, University of Pennsylvania,
Philadelphia, PA 19104

*[PDF](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/KissingerWebServices.pdf), [PPTX](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/KissingerWebServices.pptx), [Vimeo](https://vimeo.com/74399518)*

Local installations of Galaxy often make extensive use of Galaxy’s workflow tools but are limited to the use of tools provided by the local Galaxy instance. We have created a community tool that allows users to make use of Web services thus freeing them to run applications or access data provided outside of the local installation. Users can link multiple Web services together with existing Galaxy tools to form workflows for complex bioinformatics tasks. However, this process requires that users select appropriate Web service operations from a multitude of available Web services and then link them together in a way that is input-output compatible. To help Galaxy users navigate these issues, we have developed and deployed a REST service called the Service Suggestion Engine (SSE). The SSE makes use of semantically annotated Web service description documents (WSDL) for SOAP Web Services to help users select suitable operations during the workflow construction process. The SSE provides suggestions for steps in either direction. As a proof of concept we have semantically annotated dozens of Web services and used the SSE to construct workflows. To complete this task, we added numerous terms to the Ontology for Biomedical Investigations (OBI) to create OBI-WS, a bioinformatics Web service ontology. 

<br />

### GTrack 1.0: Unified data format providing customizable representation and high-speed analysis performance within Galaxy

<div class='right'><a href='http://www.ous-research.no/home/hovig/Bioinformatics%20personnel/9830'><img src="/src/events/GCC2013/Abstracts/Talks/SveinungGundersen.jpg" alt="Sveinung Gundersen" width="100" /></a></div>

**Sveinung Gundersen<sup>1</sup>**, Matúš Kalaš<sup>2,3</sup>, Osman Abul<sup>4</sup>, Arnoldo Frigessi<sup>5,6</sup>, [Eivind Hovig](http://www.ous-research.no/hovig/)<sup>1,7,8</sup>, and Geir Kjetil Sandve<sup>8</sup>

 <sup>1</sup> Department of Tumor Biology, The Norwegian Radium Hospital, Oslo University Hospital, Montebello, 0310 Oslo, Norway.<br />
 <sup>2</sup> Computational Biology Unit, Uni Computing, Thormøhlensgate 55, 5008 Bergen, Norway.<br />
 <sup>3</sup> Department of Informatics, University of Bergen, Thormøhlensgate 55, 5008 Bergen, Norway.<br />
 <sup>4</sup> TOBB University of Economics and Technology, Ankara, Turkey.<br />
 <sup>5</sup> Statistics For Innovation, Norwegian Computing Center, 0314 Oslo, Norway.<br />
 <sup>6</sup> Department of Biostatistics, Institute of Basic Medical Sciences, University of Oslo, Blindern, 0317 Oslo, Norway.<br />
 <sup>7</sup> Institute for Medical Informatics, The Norwegian Radium Hospital, Oslo University Hospital, Montebello, 0310 Oslo, Norway.<br />
 <sup>8</sup> Department of Informatics, University of Oslo, Blindern, 0316 Oslo, Norway.<br />

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/GundersonGTrack.pdf), [Vimeo](https://vimeo.com/74398904)*

A host of alternative formats for representing whole-genome datasets, such as WIG, BED, GFF, and BedGraph, are currently in use, complicating analysis and tool development. The need for different formats are driven partly by the need of extra columns for specific content, but also because of differences reflecting the underlying models of the data. We have delineated fifteen different "track types", representing different intrinsic data models, starting from simple types such as "points" and "segments" to more complex types.

GTrack 1.0 (www.gtrack.no) is a recently defined tabular format that can handle data of all fifteen different track types. It supports customizable specification of columns, customizable value types, as well as graph-type data with weights, improving on the built-in "interval" data format in Galaxy. GTrack can represent the same information as standard formats, in addition to supporting extensions and subtype specifications without the need to rewrite parsers. In addition, GTrack can be used for 3D-type datasets, such as Hi-C data, for which no standard formats exist

GTrack is fully supported by [The Genomic HyperBrowser (hyperbrowser.uio.no)](http://hyperbrowser.uio.no). The parsers and underlying binary storage scheme of the HyperBrowser system has now been extracted to a separate Python library. The library makes use of a vectorized storage scheme based on NumPy objects, which allows C-type analysis performance using the Python language. The library also supports most other common data formats, including conversions between them. We believe GTrack, and the associated binary library, is ideal for use within Galaxy tools as a backbone for high-speed analysis."

<br />

## 2 July: Session 6: Extending Galaxy

### Globus Genomics - An Integrated End to End Sequencing Analysis Platform Powered by Globus Online and Galaxy

<div class='right'><img src="/src/events/GCC2013/Abstracts/Talks/RaviMadduri.jpg" alt="Ravi Madduri" width="100" /></div>

Paul Dave,<sup>1</sup> **Ravi Madduri,**<sup>2</sup> Dina Sulakhe,<sup>1</sup> Alex Rodriguez<sup>1</sup>

 <sup>1</sup> University of Chicago<br />
 <sup>2</sup> Argonne National Laboratory

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/MadduriGlobusGenomics.pdf), [Vimeo](https://vimeo.com/74397086)*

In this talk, we will present Globus Genomics which is a robust, scalable, and flexible solution that provides end-to-end research data management for Next Generation Sequencing Analysis powered by Galaxy, Globus Online and Amazon Web Services.  Globus Genomics integrates data management capabilities of Globus Online to complement the flexible Galaxy workflow environment and allows users to run this integrated solution at scale on cloud-based elastic computational infrastructure.  We will describe some of the challenge areas that were targeted with this approach and discuss various successful implementations by leading researchers at the University of Chicago, University of Washington and Washington University at St. Louis.  Qualitative and quantitative benefits will be highlighted along with proposed future directions of the integrated Globus Genomics platform.

<br />

### Galaxy-P: Beyond Proteomics

<div class='right'><a href='/src/JohnChilton/index.md'><img src="/src/events/GCC2013/Abstracts/Talks/JohnChilton.jpg" alt="" width="100" /></a></div>

**[John Chilton](/src/JohnChilton/index.md)**<sup>1</sup>, James Johnson<sup>1</sup>, Getiria Onsongo<sup>1</sup>, Ebbing de Jong<sup>1</sup>, Pratik Jagtap<sup>1</sup>, Timothy Griffin<sup>2</sup>

 <sup>1</sup> University of Minnesota Supercomputing Institute, Minneapolis, Minnesota, USA<br />
 <sup>2</sup> University of Minnesota, Minneapolis, Minnesota, USA

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/ChiltonGalaxyP.pdf), [Prezi](http://prezi.com/lpxoy_eqpjl2/galaxy-p-beyond-proteomics/), [Vimeo](https://vimeo.com/74395277)*

Leveraging the Galaxy framework, the Galaxy-P project has resulted in the creation of many novel tools, workflows, and visualization options for mass spectrometry based data analysis - for applications ranging from standard protein identification to emerging fields (e.g. metabolomics, metaproteomics, and proteogenomics). These developments will be outlined, however the core of the talk will be about the inverse. In addressing the specific challenges of protein informatics, we have moved the framework forward in ways that can and have benefited Galaxy applications outside of proteomics. This talk will cover two of the core of these challenges in depth, namely cross-platform job execution and effectively dealing with large collections of files.

Many of the most powerful proteomics applications are Windows only, which posed a real problem with respect to Galaxy integration. Our effort to address this resulted in the LWR - a cross-platform server application actively used by several institutions. We will discuss deploying the LWR, its architecture, and emerging uses.

Galaxy has traditionally been geared toward interacting with a small, fixed number of files concurrently, this contrasts poorly with proteomics where a biological sample may correspond to any number of peak files. We will discuss core framework contributions for a multiple file selection tool widget and improved batch file submissions to workflows, as well as JGalaxy (a rich client for batch downloading files from Galaxy) and multiple file datasets (which allow standard tools and workflows to operate over variable numbers of inputs and sample tracking throughout complicated analyses).

<br />

### DevOps Ignition to reach Galaxy continuous integration

<div class='right'><img src="/src/events/GCC2013/Abstracts/Talks/OlivierInizan.png" alt="Olivier Inizan" width="100" /></div>

**Michael Loaec, Olivier Inizan**, Jonathan Kreplak, Hadi Quesneville 

 Unité de Recherches en Génomique-Info (UR INRA 1164), INRA, Centre de recherche de Versailles

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/InizanDevOps.pdf), [Vimeo](https://vimeo.com/74392502)*

The DevOps is a software development movement that stresses a close relationship between software developers and netsys admins. The goal is to enhance and speed up the cycle of software production from the creation to the delivery to final users, with special focus on quick resolution of users’ issues. We applied this method to our production process for our Galaxy instance.

We started from an initial situation with 2 teams (software developers and netsys admins), one methodology (Agile) and an infrastructure composed by an HPC cluster, a Galaxy server and a suite of homemade tools. From this initial situation, we merged our 2 teams in one with extended skills on new tools and technologies. 

This experience was not straight forward. We met unexpected situations that we will discuss in this presentation :
* technicals issues : HPC cluster and Galaxy Virtual Machine : communications, configurations and dependencies,
* organisational issues :  Developpers' environement changed, we passed from isolated personnal machine to collective virtual machine, and developpers had to acquire admin system skills.

Galaxy was no longuer an application : build by developpers and installed by a system admin, but now it was  almost an appliance, we had to change our way thinking Galaxy and break the fence between developpers and netsys admins.

The experience gave us new perspectives to improve our development and production processes. Hence, we plan to implement practices and concept like continuous integration and software factory. We will present them applied to Galaxy instances.

<br />

### The Clinical Galaxy: A validated platform initiative

<div class='right'><img src="/src/SanjayJoshi/SanjayJoshi.png" alt="SanjayJoshi" width="100" /></div>

**[Sanjay Joshi](/src/SanjayJoshi/index.md)**

 Chief Technical Officer (CTO), [Life Sciences](http://www.isilon.com/industry/lifesciences). [EMC Isilon Storage Division](http://www.emc.com/isilon)

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/JoshiClinicalGalaxy.pdf), [Vimeo](https://vimeo.com/74391527)*

With respect to disease, we humans are the manifestation of our rare variants.

As the "clinical effect chasm" engulfs the efforts to understand the "N of 1" trials moving forward, there is a growing need for the re-evaluation of sample sizes in whole genome sequencing and related methods like RNA-seq, ChIP-seq and their upstream validation.

We will present an overview of the requirements to move Galaxy into the Clinical realm.

<br />

## 2 July: Session 7: Exploiting Galaxy

### Enhancing the Galaxy Tool Shed

<div class='right'><a href='/src/Dan/index.md'><img src="/src/GalaxyTeam/greg.jpg" alt="Greg Von Kuster" width="120" /></a></div>

**[Greg von Kuster](/src/greg_vonkuster/index.md)**, [Daniel Blankenberg](/src/Dan/index.md)
 Penn State / Galaxy Team

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/VonKusterToolShed.pdf), [Vimeo](https://vimeo.com/74347850)*

The Galaxy Tool Shed enables sharing of Galaxy tools, proprietary datatypes, exported Galaxy workflows, data, and more (collectively: “Galaxy Utilities”) across the research community with ease. Tools can be automatically discovered and installed into a local Galaxy environment in real time, and they can easily be deactivated or uninstalled when they are no longer needed. Here, we demonstrate newly developed features of the Galaxy Tool Shed.

Although the Tool Shed has allowed multiple tool versions to be installed at a single time, the Tool Shed now simplifies the process of ensuring that underlying 3rd party tool dependencies are met by providing the option of automated download and installation of underlying dependencies.

A complex repository dependency system has also been implemented. This system allows a Tool Shed repository to depend on any number of other Tool Shed repositories. This powerful feature has formed the basis for the continuing development of best practices for designing Galaxy Tool Shed Utilities.

While the GUI for installing Tool Shed utilities continues to be improved, a RESTful API has been developed to allow automatic scripted installation, greatly simplifying the process of bootstrapping a new or existing Galaxy instance with many individual tool suites. 

To ensure the quality of the Tool Shed and the available contributed Utilities, new testing frameworks have been developed for not only testing the Tool Shed feature-set, but also automatic functional verification and testing of community contributions. Additionally, the Intergalactic Utilities Commission (IUC) has been established to provide expert feedback on community contributions.

<br />

### How to Create Your Own Web-based, Interactive Visualizations for Galaxy

<div class='right'><a href='/src/CarlEberhard/index.md'><img src="/src/GalaxyTeam/carl.jpg" alt="" width="120" /></a></div>

**[Carl Eberhard](/src/CarlEberhard/index.md)**<sup>1</sup>, [Jeremy Goecks](/src/JeremyGoecks/index.md)<sup>1</sup>, [The Galaxy Team](/src/GalaxyTeam/index.md)<sup>1,2</sup>, [Anton Nekrutenko](/src/anton/index.md)<sup>2</sup>, and [James Taylor](/src/JamesTaylor/index.md)<sup>1</sup>

 <sup>1</sup> Emory University<br />
 <sup>2</sup> Penn State University

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/EberhardCreateViz.pdf), [Vimeo](https://vimeo.com/74330774)*

Visualization plays an integral role in scientific investigation. Visualization is useful for viewing large amounts of data simultaneously, observing patterns and outliers amongst data, and communicating findings to others. To make visualization easier and more powerful in Galaxy, we have create a framework for integrating Web-based visualizations into Galaxy. Just as tools can be easily added to Galaxy, visualizations can now be added as well. Visualizations can be easily accessed via an icon in the history panel’s stored datasets. Galaxy visualizations have many advantages: (i) they can be made highly interactive and customizable; (ii) they require no software or data downloads, and (iii) they can be saved, shared via URL, and included in [Galaxy Pages](/src/Learn/GalaxyPages/index.md) — and shared/included visualization are fully interactive.

In this talk, we describe how to create your own visualization for Galaxy. We provide an overview of how to query datasets in Galaxy for both aggregate data as well as individual data points and how to add a data provider for your own data type. Galaxy includes data providers for SAM/BAM, BED, Interval, GFF/GTF, VCF, BedGraph, Wiggle, and BigWig/BigBed. We also discuss Galaxy JavaScript libraries that can be used to create Web-based visualizations. These libraries include support for creating and saving visualizations, for  querying and caching data from Galaxy datasets, and for working with Galaxy tools and genome data. Finally, we introduce an XML data format for configuring a visualization to work with Galaxy.

<br />

### Managing Galaxy's Built-in Data

<div class='right'><a href='/src/Dan/index.md'><img src="/src/GalaxyTeam/dan.jpg" alt="" width="120" /></a></div>

**[Daniel Blankenberg](/src/Dan/index.md)**

 [Galaxy Team](/src/GalaxyTeam/index.md) and Penn State University

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/BlankenbergBuiltInData.pdf), [Vimeo](https://vimeo.com/74265510)*

Many Galaxy tools are reliant upon having built-in data (e.g. genomic sequences, aligner indexes, etc) available. Although most tools can alternatively make use of data from a user’s history (e.g. a FASTA dataset), doing so often results in a decrease in performance, as e.g. one-off indexes need to be built by the Galaxy tool each time the dataset is used as a source. Unfortunately, until now, the steps required for generating and informing a Galaxy server of the availability of new built-in data has been an error-prone manual process. Here, we demonstrate new Galaxy features that simplify and automate this process.

A new class of Galaxy Utilities, known as Data Managers, has been developed. Data Managers allow an administrator to use the familiar Galaxy tool interface to download or generate the underlying data and automatically populate Galaxy’s internal built-in data registries (i.e. data tables / *.loc files). When a Data Manager finishes processing, new entries are updated (and persisted) in real-time without requiring a server restart. By using a Data Manager, not only does an administrator avoid the common pitfalls associated with manual curation of built-in data, but they also gain the same reproducibility and transparency associated with Galaxy tools. 

Data Managers can be defined locally or installed automatically from a Tool Shed; the framework is flexible and is not restricted to genomic data. Administrators can access them interactively, within Workflows, and via the API. Just as with Galaxy tools, Data Manager jobs can be dispatched across existing compute resources.

<br />

### Contributing to Galaxy

<div class='right'><a href='/src/DannonBaker/index.md'><img src="/src/GalaxyTeam/dannon.jpg" alt="" width="120" /></a></div>

**[Dannon Baker](/src/DannonBaker/index.md)**<sup>1</sup>, [Nate Coraor](/src/nate/index.md)<sup>2</sup>, [John Chilton](/src/JohnChilton/index.md)<sup>3</sup> 

 <sup>1</sup> Emory University<br />
 <sup>2</sup> Penn State<br />
 <sup>3</sup> University of Minnesota Supercomputing Institute

*[Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2013/BakerContribute.pdf), [Vimeo](https://vimeo.com/73486255)*

Galaxy is an *open* platform for data intensive biomedical research, utilized in many diverse environments.  The core team has lots of hands-on experience with the instance at usegalaxy.org, a very large public-facing resource, but that it is only one particular environment and local administrators can have a significantly different set of requirements to address to satisfy local users.  As the Galaxy Project grows, contributions from the community will be an increasingly important resource for helping continue to move forward and innovate while remaining a stable platform that users can count on.  Anyone can get a copy of Galaxy and modify the framework to suit their needs; if those changes enhance the utility of the Galaxy framework for the community at large, whether they’re a bugfix or a new feature, then it’s incredibly valuable to be able to pull the changes back into the core Galaxy framework to share with others.  The primary mechanism for doing this is by issuing a ‘pull request’ in Bitbucket that allows the team to review and merge your changes, and we’ll discuss how and why to create them.  It is important to make sure that changes to the framework are both useful and usable to the community as a whole, and to realize that not everything is suitable for inclusion.

In this talk we’ll cover why community contributions are important, highlight significant contributions from past years, and discuss how to get involved with Galaxy development and contribute back to the core framework.

<br />
