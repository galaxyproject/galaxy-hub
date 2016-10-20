---
autotoc: true
---
PLACEHOLDER_INCLUDE(/src/Events/GCC2014/Header/index.md)

PLACEHOLDER_INCLUDE(/src/Events/GCC2014/LinkBox/index.md)

# Talk Abstracts



## Session 1, Tuesday, July 1, 9:15-10:30

### Transcriptomes and Exomes: Computational Challenges of NGS Data

<div class='right'><a href='http://ccb.jhu.edu/people/salzberg/'><img src="/src/Events/GCC2014/Abstracts/Salzberg.jpg" alt="Steven Salzberg" width="120" /></a></div>

**[Steven Salzberg](http://ccb.jhu.edu/people/salzberg/)<sup>1</sup>**

 <sup>1</sup> Johns Hopkins University

[Steven Salzberg](http://ccb.jhu.edu/people/salzberg/) is a Professor of Medicine, [Biostatistics](http://www.biostat.jhsph.edu/), and [Computer Science](http://www.cs.jhu.edu/) at the [Johns Hopkins University School of Medicine](http://www.hopkinsmedicine.org/som/) where he is also Director of the [Center for Computational Biology](http://ccb.jhu.edu/) at the [McKusick-Nathans Institute of Genetic Medicine](http://igm.jhmi.edu/).  Steven has made many prominent contributions to open source software, including several of the most popular tools used on Galaxy Platforms.  Recently he was awarded the  [2013 Benjamin Franklin Award for Open Access in the Life Sciences](http://www.bioinformatics.org/forums/forum.php?forum_id=10206), and the [2012 Balles Prize in Critical Thinking](http://www.csicop.org/news/show/skeptic_authors_steven_salzberg_and_joe_nickell_to_receive_balles_prize) for his [science column](http://www.forbes.com/sites/stevensalzberg/) at [Forbes](http://www.forbes.com/).

<br />

### The Galaxy framework as a unifying bioinformatics solution for multi-omic data analysis

<div class='right'><a href='http://www.umn.edu/lookup?SET_INSTITUTION=UMNTC&UID=pjagtap'><img src="/src/Events/GCC2014/Abstracts/PratikJagtap.jpg" alt="PratikJagtap" width="100" /></a></div>

**[Pratik D. Jagtap](http://www.umn.edu/lookup?SET_INSTITUTION=UMNTC&UID=pjagtap)<sup>1,3</sup>**, [James Johnson](https://www.msi.umn.edu/users/jj)<sup>2</sup>, [Getiria Onsongo](https://www.msi.umn.edu/users/onson001)<sup>2</sup>, [Bart Gottschalk](https://www.msi.umn.edu/users/bgottsch)<sup>2</sup>, [Timothy J. Griffin](http://www.cbs.umn.edu/explore/departments/bmbb/contacts/timothy-j-griffin)<sup>1,3</sup>

 <sup>1</sup> [Center for Mass Spectrometry and Proteomics](https://www.cbs.umn.edu/research/resources/center-mass-spectrometry-and-proteomics), [University of Minnesota](http://umn.edu), Minneapolis, Minnesota, United States<br />
 <sup>2</sup> [Minnesota Supercomputing Institute](https://www.msi.umn.edu/), [University of Minnesota](http://umn.edu), Minneapolis, Minnesota, United States<br />
 <sup>3</sup> [Department of Biochemistry, Molecular Biology, and Biophysics](http://www.cbs.umn.edu/explore/departments/bmbb), [University of Minnesota](http://umn.edu), Minneapolis, Minnesota, United States<br />

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Jagtap.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=b34898ea-ec02-46d5-bccd-22dde79f7c46)**

Integration and correlation of multiple areas of 'omics' datasets (genomic, transcriptomic, proteomic) has potential to provide novel biological insights. Integration of these datasets is challenging however, involving use of multiple, domain-specific software in a sequential manner.

We describe extending the use of Galaxy for proteomics software, enabling novel, advanced multi-omic applications in proteogenomics and metaproteomics. Focusing on the perspective of a biological user, we will demonstrate the benefits of Galaxy for these analyses, as well as its value for software developers seeking to publish new software.  We will also report on our experience in training non-expert biologists to use Galaxy for these advanced, multi-omic applications. 

Working with biological collaborators, multiple proteogenomics and metaproteomics datasets representing a broad array of biological applications were used to develop workflows. Software required for sequential analytical steps such as database generation (RNA-Seq derived and others), database search and genome visualization were deployed, tested and optimized for use in workflows. 

Novel proteoforms (proteogenomic workflows, e.g., [Galaxy Workflow: Integrated ProteoGenomics Workflow (ProteinPilot)](http://z.umn.edu/pg140)) and microorganisms (metaproteomic workflows, e.g., [Workflow for metaproteomics analysis - ProteinPilot'](http://z.umn.edu/mp65) ) were reliably identified using shareable workflows. Tandem proteogenomic and metaproteomic analysis of datasets will be discussed using modular workflows. Sharing of datasets, workflows and histories on the usegalaxyp.org website and proteomic public repositories will also be discussed. 

We demonstrate the use of Galaxy for integrated analysis of multi-omic data, in an accessible, transparent and reproducible manner. Our results and experiences using this framework demonstrate the potential for Galaxy to be a unifying bioinformatics solution for multi-omic data analysis.

<br />

### iReport: HTML Reporting in Galaxy

<div class='right'><a href='http://www.researchgate.net/profile/Saskia_Hiltemann/'><img src="/src/Events/GCC2014/Abstracts/SaskiaHiltemann.jpg" alt="Saskia Hiltemann" width="100" /></a></div>

**Saskia Hiltemann<sup>1</sup>**, Youri Hoogstrate<sup>1</sup>, Hailiang Mei<sup>2</sup>, Guido Jenster<sup>1</sup>, Andrew Stubbs<sup>1</sup>

 <sup>1</sup> ErasmusMC, Rotterdam, The Netherlands<br />
 <sup>2</sup> LUMC, Leiden, The Netherlands

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Hiltemann.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=0090c67e-dae2-4869-bfb7-3e0758a0dbfe)**

Galaxy offers a number of great visualisation tools (Trackster, Circster), but currently lacks the ability to easily summarise the various outputs of a workflow into a single view. iReport is a Galaxy tool for the easy creation of HTML reports from Galaxy outputs. Rather than having a static HTML output, iFUSE2 uses javascript and jQuery to allow for interactivity in the form of searching and sorting of tables, automatic zooming of image data, tabbed view for organisation of outputs, etc. Users define the number and names of tabs for their report, and can add different types of content-items to these tabs (e.g. text, tabular data, image data, PDF files, links to datasets, and more).

We have previously implemented Galaxy-based data processing pipelines for next-generation sequencing (NGS) and for array based allelic copy number determination named CGtag ([Hiltemann et al. 2014](http://www.gigasciencejournal.com/content/3/1/1)) and developed a web based fusion gene visualizer, iFUSE ([Hiltemann 2013](http://www.ncbi.nlm.nih.gov/pubmed/23661695)). We used the iReport tool to make iFUSE2, the next-step extension to support fusion gene determination within Galaxy, which runs as the last step of our workflow and combines the outputs of various Galaxy tools into a single view.

iReport is available from the DTL toolshed ([toolshed.dtls.nl](http://toolshed.dtls.nl)) and the [main Galaxy toolshed](http://toolshed.g2.bx.psu.edu/).

<br />

## Session 2, Tuesday, July 1, 11:00-12:15

### Galaxy Deployment on Heterogenous Hardware

<div class='right'>![Carrie Ganote](/src/Events/GCC2014/Abstracts/CarrieGanote.jpg)</div>

**Carrie Ganote<sup>1</sup>,** Soichi Hayashi<sup>1</sup>

 <sup>1</sup> [National Center for Genome Analysis Support](http://ncgas.org)

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Ganote.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=090318bd-80a1-4b3e-a794-a3add7dbae94)**

Indiana University, like many institutions, houses a heterogenous mixture of compute resources. In addition to university resources, the [National Center for Genome Analysis Support](http://ncgas.org), the Extreme Science and Engineering Discovery Environment, and the Open Science Grid all provide resources to biologists with NSF affiliations. Such a diverse mixture of compute power and services could be applied to address the equally diverse set of problems and needs in the bioinformatics field.

Many software suites are well suited for large numbers of fast CPUS, such as phylogenetic tree building algorithms. De novo assembly problems really crave a machine with lots of RAM to spare. Alignment and mapping problems where each input is a separate invocation lend themselves perfectly to high-throughput, heavily distributed compute systems. Galaxy is a web interface that acts as a mediator between the biologist and the underlying hardware and software - in an ideal setup, Galaxy would be able to delegate work to the best suited underlying infrastructure.

We present an instance of Galaxy at Indiana University, installed and maintained by NCGAS, that takes advantage of a variety of compute resources to increase utilization and efficiency. The OSG is a distributed grid through which Blast jobs can be run. IU, NCGAS and XSEDE jointly support Mason, a 512Gb/node system. For IU users, Big Red 2 is the first university-owned petaFLOPS machine. Connecting these resources to Galaxy and using the best tool for the job results in the best performance and utilization - everyone wins.

<br />

### Connecting Galaxy to tools with alternative storage and compute models

<div class='right'>![Brad Chapman](/src/Events/GCC2014/Abstracts/BradChapman.jpg)</div>

**Brad Chapman<sup>1</sup>,** Rory Kirchner<sup>1</sup>, Oliver Hofmann<sup>1</sup>, Winston Hide<sup>1</sup>

 <sup>1</sup> [Bioinformatics Core](http://compbio.sph.harvard.edu/chb/), Harvard School of Public Health

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Chapman.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=74a61ca2-a444-4850-b32a-613aa2e4cf53)**

The community developed [bcbio-nextgen framework](https://github.com/chapmanb/bcbio-nextgen) provides implementations of best-practice pipelines for variant calling and RNA-seq analysis. The framework handles computation, data storage and program connectivity in ways that parallel Galaxy's approaches, making it difficult to plug in as a standard tool.  We'd like to be able to integrate with Galaxy by sharing the underlying implementation code for accessing data, rather than pushing and pulling large files. This talk will discuss ideas to access shared data on external object stores like S3 or HDFS in a consistent way that does not rely on data copying. It also will incorporate approaches to compartmentalize complex sets of tools inside containers using Docker. The goal is to stimulate discussion about ways to make Galaxy a modular component within complex analysis environments. Our ultimate vision is to have an Amazon based cloud implementation that uses CloudMan to run a Galaxy front end sending out jobs to tools like bcbio-nextgen.

<br />

### A journal’s experiences of reproducing published data analyses using Galaxy

<div class='right'>![Peter Li](/src/Events/GCC2014/Abstracts/PeterLi.jpg)</div>

**Peter Li<sup>1</sup>,** Huayan Gao<sup>2</sup>, Tin-Lap Lee<sup>2</sup> and Scott C. Edmunds<sup>1</sup>

 <sup>1</sup> *[GigaScience](http://www.gigasciencejournal.com/)*, BGI-Hong Kong Co., Ltd, Hong Kong
 <sup>2</sup> School of Biomedical Sciences, The Chinese University of Hong Kong, Shatin, Hong Kong

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Li.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=9c560c5e-f8a2-43e5-83f6-279d9bcf1b3d)**

*[GigaScience](http://www.gigasciencejournal.com/)* is a journal with a focus on the publication of reproducible research. This is facilitated by its [GigaDB database](http://gigadb.org/) where the data and the tools used for its analysis may be deposited by authors and made publicly available with citable DOIs. We have investigated the extent by which the results from articles published in *!GigaScience* can be made reproducible using Galaxy in a pilot project based on a previously published paper reporting on SOAPdenovo2. The performance of this de novo genome assembler was compared with SOAPdenovo1 and ALL-PATHS-LG by [Luo et al., (2012)](http://www.gigasciencejournal.com/content/1/1/18) for its ability to assemble bacterial, insect and human genomes. After integrating the three genome assemblers, and their associated tools into Galaxy, workflows were implemented in a way that re-created the genome assembly pipelines used by the authors. However, our aim of reproducing the genome assembly statistics from Luo et al., (2012) with the workflows was met with mixed success. Whilst the results generated by SOAPdenovo2 could be reproduced by our Galaxy workflows, we were less successful with SOAPdenovo1 and ALL-PATHS-LG. In this presentation, we will show how Galaxy was used, the problems that were encountered and the results of this reproducibility exercise.

Reference

 Luo *et al.*, (2012) [SOAPdenovo2: an empirically improved memory-efficient short-read de novo assembler](http://www.gigasciencejournal.com/content/1/1/18). *[GigaScience](http://www.gigasciencejournal.com)* 1:18.

<br />

### Enabling Dynamic Science with Flexible Infrastructure

<div class='right'><a href='http://bioteam.net/company-leadership/'><img src="/src/Events/GCC2014/Abstracts/AnushkaBrownley.jpg" alt="Anushka Brownley" width="100" /></a> <a href='http://bioteam.net/company-leadership/'><img src="/src/Events/GCC2014/Abstracts/AaronGardner.jpg" alt="Aaron Gardner" width="100" /></a></div>

**[Anushka Brownley](http://bioteam.net/company-leadership/)<sup>1</sup>, [Aaron Gardner](http://bioteam.net/company-leadership/)<sup>1</sup>**

 <sup>1</sup> [BioTeam](http://bioteam.net/)

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Brownley.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=cfab803d-ec45-4844-818c-85856402e424)**

As a trusted industry leader in designing and implementing effective scientific infrastructure for research and other organizations, [BioTeam](http://bioteam.net/) has partnered with the Galaxy Project to build and offer the [SlipStream Galaxy Appliance](http://bioteam.net/slipstream/galaxy-edition/), a commercially supported platform.  With the increasing throughput of data generation instruments, the dynamic landscape of computational tools, and the variability in analysis processes, it is challenging for scientists to work within the confines of a static infrastructure.  !BioTeam will discuss some of these challenges and the technical advances we have been working on to build a more flexible Galaxy appliance to support the changing compute and analysis needs of the scientific researcher.

<br />

## Session 3, Tuesday, July 1, 1:15-2:30

### State of the Galaxy

<div class='right'>![](/src/GalaxyTeam/anton.jpg)&nbsp;![](/src/GalaxyTeam/james.jpg)</div>

**[Anton Nekrutenko](/src/anton/index.md)<sup>1</sup> and [James Taylor](/src/JamesTaylor/index.md)<sup>2</sup>**

 <sup>1</sup> [Penn State University](http://psu.edu/)<br />
 <sup>2</sup> [Emory University](http://emory.edu/)

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/NekrutenkoTaylor.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=153f0aa2-12c0-4392-b4d0-3b6c1a9c2c1b)**

An overview of where the Galaxy Project is and where it is going.

<br />

### Update on Ion Torrent Sequencing – Accurate, Long Reads

<div class='right'>![](/src/MikeLelivelt/pic.png)</div>

**[Mike Lelivelt](/src/MikeLelivelt/index.md)**<sup>1</sup>

 <sup>1</sup> Director of Bioinformatics and Software Products, [Ion Torrent, part of Life Technologies](http://www.lifetechnologies.com/us/en/home/brands/ion-torrent.html)

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Lelivelt.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=d06b9461-9991-46bc-94d2-6b2378432d90)**

<br />



## Session 4, Tuesday, July 1, 4:00-5:30

### The Galaxy Tool Shed: A Framework for Building Galaxy Tools

<div class='right'>![Greg Von Kuster](/src/GalaxyTeam/greg.jpg)</div>

**[Greg von Kuster](/src/greg_vonkuster/index.md)<sup>1</sup>** and the [Galaxy Team](/src/GalaxyTeam/index.md)

 <sup>1</sup> [Penn State University](http://psu.edu/), State College, Pennsylvania, United States<br />
 
**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/VonKuster.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=555f1477-4676-425f-9701-ed70cee6d1ca)**

The [Tool Shed](/src/ToolShed/index.md) has become an integral part of the process for building and deploying Galaxy tools and other utilities.  In addition to tools, the Tool Shed supports Galaxy Data Managers, custom data types and exported Galaxy workflows.  This list will be extended to support additional utilities when appropriate.  The Tool Shed provides the ability to define relationships between repositories, enabling complementary utilities to be installed together.

The Tool Shed assures reproducibility within Galaxy when utilities are installed from the Tool Shed using the streamlined installation process between the two applications.  An underlying principle of this assurance is that all versions of utilities available in the Tool Shed will always be accessible to any Galaxy instance.  This principle implies that a select development path should be followed to produce repositories that are optimal for sharing.

Here we'll examine the various components and steps that comprise this process.  Development begins within a local environment that includes Galaxy and a Tool Shed, where a hierarchy of related repositories can be built.  The Tool Shed allows the developer to export the related repositories into a capsule that can be imported into another Tool Shed.  This mechanism streamlines the process of deploying utilities from a development environment to the test and main public Galaxy Tool Sheds where an automated install and test framework certifies the repositories for sharing.  When installed together into Galaxy after certification, the related repositories provide complementary Galaxy utilities that function together.

<br />

### Integrating the NCBI BLAST+ suite into Galaxy

<div class='right'><a href='http://www.hutton.ac.uk/staff/peter-cock'><img src="/src/Events/GCC2014/Abstracts/PeterCock.jpg" alt="Peter Cock" width="100" /></a></div>

**[Peter Cock](http://www.hutton.ac.uk/staff/peter-cock)<sup>1</sup>,** [John Chilton](/src/JohnChilton/index.md)<sup>2</sup>, [Björn Grüning](https://github.com/bgruening)<sup>3</sup>, [Jim Johnson](https://github.com/jj-umn)<sup>4</sup>, [Nicola Soranzo](http://biowiki.crs4.it/biowiki/NicolaSoranzo)<sup>5</sup>

 <sup>1</sup> [The James Hutton Institute](http://www.hutton.ac.uk/), Scotland, United Kingdom<br />
 <sup>2</sup> Department of Biochemistry and Molecular Biology, Penn State University, United States<br />
 <sup>3</sup> Pharmaceutical Bioinformatics, Institute of Pharmaceutical Sciences, Albert-Ludwigs-University, Freiburg, Germany<br />
 <sup>4</sup> Minnesota Supercomputing Institute, University of Minnesota, Minneapolis, United States<br />
 <sup>5</sup> Bioinformatics Research Program, CRS4, Pula, Italy

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Cock.pdf), [SlideShare](http://www.slideshare.net/pjacock/galaxy-blast-gcc2014), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=2357e7e4-3582-4d07-a2fe-4bd0da28fc49)**

NCBI BLAST is one of the best known computational tools in modern biology, and a common addition to Galaxy instances. This talk covers the history of the Galaxy wrappers for the NCBI BLAST+ command line tool suite, example use cases and workflows, and in particular our development process as a potential best practice model for Galaxy tool development - both technically and by showcasing Galaxy functionality, but also in terms of community building.

Initially included within the main Galaxy distribution, the BLAST+ wrappers are now run as a separate open source project using a dedicated repository on !GitHub, combined with open discussion on the public Galaxy development mailing list.

The BLAST+ wrappers have grown to take advantage of most features offered by Galaxy and the ToolShed, including ToolShed dependencies, custom datatypes (including composite types for BLAST databases), configuration files for local databases, Galaxy tool XML macros to avoid duplication, and functional testing.

Automated testing is an important part of the development model and release process used. Integration with TravisCI provides continuous integration testing where any update to the code is automatically tested on a Virtual Machine. This is reinforced by a policy of staging updates to the Galaxy Test ToolShed for an additional round of automated testing, prior to release on the main Galaxy ToolShed.

Finally, an overview of how BLAST is setup on the Galaxy Instances we maintain will cover issues like job parallelization, thread and memory considerations, updating NCBI BLAST databases, and caching BLAST databases on cluster nodes.

<br />


### deepTools: a flexible platform for exploring deep-sequencing data

<div class='right'><a href='https://github.com/bgruening'><img src="/src/Events/GCC2012/Abstracts/Gruening.png" alt="Björn Grüning" /></a></div>

[Fidel Ramírez](http://www.ie-freiburg.mpg.de/1892622/employee_page?c=1896591&employee_id=27168)<sup>1</sup>, [Friederike Dündar](http://www.ie-freiburg.mpg.de/1892622/employee_page?c=1896591&employee_id=27397)<sup>1,2</sup>, [Sarah Diehl](http://www.ie-freiburg.mpg.de/1892622/employee_page?c=1896591&employee_id=26993)<sup>1</sup>, **[Björn A. Grüning](http://www.bioinf.uni-freiburg.de//team.html?en)<sup>3</sup>**, and [Thomas Manke](http://www.ie-freiburg.mpg.de/1896591)<sup>1</sup>

 <sup>1</sup> [Max Planck Institute of Immunobiology and Epigenetics](http://www.ie-freiburg.mpg.de/), Freiburg, Germany<br />
 <sup>2</sup> Faculty of Biology, University of Freiburg, Freiburg, Germany<br />
 <sup>3</sup> [Department of Computer Science](http://www.informatik.uni-freiburg.de/), University of Freiburg, Freiburg, Germany

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/GrüningDeepTools.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=5f98ea62-fa57-43ad-8d50-c6b3adf2d964)**

We present a Galaxy based web server for processing and visualizing deeply sequenced data. The web server core functionality consists of a suite of newly developed tools, called deepTools, that enable users with little bioinformatic background to explore the results of their sequencing experiments in a standardized setting. Users can upload preprocessed files with continuous data in standard formats and generate heatmaps and summary plots in a straight-forward, yet highly customizable manner. In addition, we offer several tools for the analysis of files containing aligned reads and enable efficient and reproducible generation of normalized coverage files. As a modular and open-source platform, deepTools can easily be expanded and customized to future demands and developments. The deepTools webserver is freely available at http://deeptools.ie-freiburg.mpg.de and is accompanied by extensive documentation and tutorials aimed at conveying the principles of deepsequencing data analysis. The web server can be used without registration. deepTools is also available from the Galaxy toolshed, which allows an easy automated installation to any Galaxy instance.

<br />

## Session 5, Wednesday, July 2, 9:10-10:25

### The GCC2014 Hackathon

<div class='right'>![GCC2014 Hackathon Participants](/src/Images/Logos/GCC2014HackLogoSquare200.png)</div>

**[Dannon Baker](/src/DannonBaker/index.md)<sup>1</sup>, [Brad Chapman](http://bcbio.wordpress.com/)<sup>2</sup>, [John Chilton](/src/JohnChilton/index.md)<sup>3</sup>, [Kyle Ellrott](http://www.soe.ucsc.edu/people/kellrott)<sup>4</sup>, and [GCC2014 Hackathon Participants](/src/Events/GCC2014/Hackathon/index.md)**

 <sup>1</sup> [Johns Hopkins University](http://jhu.edu/), Baltimore Maryland, United States<br />
 <sup>2</sup> [Harvard University](http://harvard.edu), Cambridge, Massachusetts, United States<br />
 <sup>3</sup> [Penn State University](http://psu.edu/), State College, Pennsylvania, United States<br />
 <sup>4</sup> [University of California Santa Cruz (UCSC)](http://ucsc.edu), Santa Cruz, California, United States

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Hackathon.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=1ed15c02-fc5e-4fd0-86e3-c15af143d34f)**

This year for the three days before GCC we are hosting a [Galaxy Hackathon](/src/Events/GCC2014/Hackathon/index.md).  Hackathons are events at which a group of developers with different backgrounds and skills collaborate hands-on and face-to-face to try to solve problems affecting a particular community, and in this case the Galaxy community. Gathering a diverse set of people in a single room where they can focus on code free of all the distractions that are inevitable back at the office has proven to be a great mechanism for not only getting interesting things done in a short amount of time, but also for community building.  The hackathon goals include growing the Galaxy developer community and connecting existing developers who are interested in similar problems, giving them an in-person opportunity to code together and plan for future post-hackathon collaborations.

In this talk, we’ll very briefly describe our Galaxy Hackathon goals and provide a general overview of progress made at the event.  Since hackathons are by definition community driven, most of the talk will showcase the efforts of and be presented by the self-organizing groups that form during the event.

<br />

### More Options, Less Time: Streamlining Access to Reference Datasets

<div class='right'><a href='/src/Dan/index.md'><img src="/src/GalaxyTeam/dan.jpg" alt="Dan Blenkenberg" width="120" /></a></div>

**[Daniel Blankenberg](/src/Dan/index.md)<sup>1</sup>** and the [Galaxy Team](/src/GalaxyTeam/index.md)<sup>2</sup>

 <sup>1</sup> [Penn State University](http://psu.edu), State College, Pennsylvania, United States<br />
 <sup>2</sup> [http://galaxyproject.org/](http://galaxyproject.org/)

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Blankenberg.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=c1e892bc-0df2-40fd-b857-a933484a4834)**

Recent enhancements to the Galaxy framework have introduced a new class of Galaxy Utilities, known as *Data Managers* ([doi:10.1093/bioinformatics/btu119](http://bioinformatics.oxfordjournals.org/content/early/2014/03/12/bioinformatics.btu119.full)). Data Manager tools allow the Galaxy administrator to download, create and install additional datasets for any type of built-in datasets using a web-based GUI in real time. 

Despite these advances, populating a Galaxy instance with a set of built-in datasets can be quite time consuming, especially in cases where data not only needs to be downloaded, but additional computation, such as building indexes, is required. While this works quite well, it is wasteful to have each Galaxy installation build these datasets especially for common resources and genomes. It can take considerable amounts of time to populate a new Galaxy instance with needed datasets. Although the Galaxy Project provides a public rsync server with all of the built-in datasets that are used on the Main public site, utilizing this resource can be difficult and unwieldy, as there is a large amount of data and it lacks an accessible interface interface. While the individual location files are made available, they cannot be used as-is by an end user, unless the user has the exact same directory structure on their own machine that is hosting their Galaxy instance.

Here, we describe a new set of resources that aim to rectify this situation. These resources streamline the configuration of built-in data datasets for new and existing Galaxy instances and alleviate the technical barriers preventing many users from taking advantage of prebuilt reference datasets.

<br />

### Building More Powerful Galaxy Workflows with Dataset Collections

<div class='right'><a href='/src/JohnChilton/index.md'><img src="/src/GalaxyTeam/JohnChiltonSmaller.jpg" alt="John Chilton" width="120" /></a></div>

**[John Chilton](/src/JohnChilton/index.md)<sup>1</sup>** and the [Galaxy Team](/src/GalaxyTeam/index.md)

 <sup>1</sup> [Penn State University](http://psu.edu), State College, Pennsylvania, United States

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Chilton.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=f626696c-e68e-4aa4-870b-f224aa60c47a)**

Galaxy features the ability to extract a sample analysis histories out into reusable workflows as well as the ability to construct such workflows up from scratch or via modification to existing workflows. While these have been salient features of Galaxy for some time, the kinds of workflows that could be expressed by Galaxy have had critical limitations. Perhaps most glaring of these is that Galaxy workflows have required a fixed number of inputs. Many relatively basic biomedical analyses require running a variable number of inputs across identical processing steps (“mapping”) and then combining or collecting these results into a merged output (“reducing). This talk will present dataset collections - an extension to Galaxy that allows for the expression of these mapping, reducing workflows.

In particular, the concepts behind dataset collections will be covered including briefly discussing implementation details such as data model modifications and API methods. Demonstration of how to “map” existing Galaxy tools across dataset collections to produce new collections and how to “reduce” these collections using other tools. Likewise, modification to the workflow extraction and editing interfaces to accommodate these new operations will be demonstrated.

Dataset collections are a powerful new feature that greatly enhance the expressivity of Galaxy workflows, but a lot work remains to do be done. The talk will conclude with a potential roadmap and timeline for dataset collection related development - including building UI components for digging into collections, building new collections, visualizing across collections, and tool enhancements allowing tools to create collections.

<br />

### An Appliance for Life Science Research: Isilon, Penguin and Galaxy

<div class='right'><a href='http://www.linkedin.com/pub/patrick-combes/1/a6/111'><img src="/src/Events/GCC2014/Abstracts/PatrickCombes.jpg" alt="Patrick Combes" height="100" /></a></div>

**[Patrick Combes](http://www.linkedin.com/pub/patrick-combes/1/a6/111)<sup>1</sup>**

 <sup>1</sup> Senior Solution Architect for [Life Sciences](http://www.isilon.com/industry/lifesciences), [EMC Isilon](http://www.emc.com/isilon)

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Combes.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=f96f6592-112f-4c49-9b60-2bf7c1fa17e3)**

[Isilon](http://www.emc.com/isilon) and [Penguin Computing](http://www.penguincomputing.com/) have paired to create a mid-size appliance for Galaxy by leveraging their respective strengths in storage and compute.  This session will detail the architecture and projected use cases for the appliance.

<br />


## Session 6, Wednesday, July 2, 10:55-12:15

### Lab Specimen Tracking with Galaxy

<div class='right'><a href='/src/Marten/index.md'><img src="/src/GalaxyTeam/marten.jpg" alt="Martin Čech" width="120" /></a></div>

**[Martin Čech](/src/Marten/index.md)<sup>1</sup>**, [Pavel Švéda](http://www.linkedin.com/in/pavelsveda)<sup>1</sup>, [Ondřej Fabián](https://www.linkedin.com/pub/ondrej-fabian/33/6a5/1b8)<sup>1</sup> and the [Galaxy Team](/src/GalaxyTeam/index.md)

 <sup>1</sup> [Penn State University](http://psu.edu), State College, Pennsylvania, United States

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Čech.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=c164fc67-fb33-430e-8f72-97ac73f4206e)**

No experiment begins with sequencing. Instead it commences with a collection of samples followed by DNA isolation (generation of cDNA, immunoprecipitation etc.), preparation of sequencing libraries, sequencing itself, and, finally, data analysis. In other words, during an NGS experiment a biological specimen undergoes transformation into a dataset to be analyzed.  When an experiment involves a handful of samples, tracking the specimen-to-dataset metamorphosis is straightforward. However, low cost of sequencing enables individual single-PI laboratories to perform studies involving hundreds and even thousands of samples. At this scale tracking information about individual samples becomes challenging. Yet such tracking is essential for troubleshooting and ensuring a successful study. We have developed an open-source sample tracking system based on mobile devices carried by everyone in their pockets. The mobile application is able to communicate with a variety of sequencing instruments and trigger automated data analyses through the Galaxy system (http://usegalaxy.org).

<br />

### The Munich NGS-FabLab for medical sequence data

<div class='right'><a href='http://www.ibe.med.uni-muenchen.de/organisation/mitarbeiter/070_drittmittel/schaaf/'><img src="/src/Events/GCC2014/Abstracts/SebastianSchaaf.jpg" alt="Sebastian Schaaf" width="95" /></a></div>

**[Sebastian Schaaf](http://www.ibe.med.uni-muenchen.de/organisation/mitarbeiter/070_drittmittel/schaaf/)<sup>1,2</sup>,** Aarif Mohamed Nazeer Batcha<sup>2</sup>, Sandra Fischer<sup>2</sup>, Guokun Zhang<sup>2</sup>, [Ulrich Mansmann](http://www.ibe.med.uni-muenchen.de/organisation/mitarbeiter/020_professuren/mansmann/index.html)<sup>1,2</sup>

 <sup>1</sup> [German Cancer Consortium (DKTK)](http://www.dkfz.de/en/dktk/), Heidelberg, Germany<br />
 <sup>2</sup> [Department of Medical Informatics, Biometry and Epidemiology (IBE)](http://www.ibe.med.uni-muenchen.de/), Ludwig Maximilians University (LMU) Munich, Germany

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Schaaf.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=947fe3f1-1fbe-41fc-ac83-e2276c5b8d44)**

Using NGS data in a clinical context comes along with a whole range of challenges, constraints and requirements, affecting all levels of an IT infrastructure dealing with that type of data – and related biomedical metadata. Especially in Germany, the restrictive data security laws play a key role.
In 2010, the Munich regional area successfully applied for a grant ('Leading-Edge Cluster Competition') dedicated to ‘personalized medicine’, supporting infrastructures for improving cross-connections between the medical faculties of both universities and associated institutions, their hospitals, independent research institutes ([Helmholtz Centre](https://www.helmholtz.de/en/helmholtz_centres_networks/helmholtz_centres/), [Max Planck Institutes](http://www.mpg.de/institutes)) and industrial partners.

Aiming for a structured, biomedical metadata-driven organization of clinical NGS data, an interconnected, user-friendly, modular, broad-ranged and self-hosted open source analysis platform turned out to be crucial. Or in a nutshell: a Galaxy instance. 

This talk is about the experiences of nearly three years of getting from blank to a conceptual Galaxy-driven NGS infrastructure, dedicated to scientist or clinicians from basic research up to experimental molecular diagnostics within a university medical center’s environment. Topics will include experiences with core IT, faculty politics, project cooperations, software establishment etc. as well as derived Dos and Don’ts. Furthermore, some small software improvements will be presented, hopefully contributing back to the community. On top, we would like to draw connections to contents presented, discussed, improved since the last two GCC’s in [Chicago](/src/Events/GCC2012/index.md) and [Oslo](/src/Events/GCC2013/index.md) - and also may have been forgotten. Over time, we had the impression to face several of them, pretty glad not to be in a minority of one.

<br />

### Galaxydx - A Web-server dedicated to diagnosis data analysis

<div class='right'><a href='http://fr.linkedin.com/pub/vivien-deshaies/36/9b1/831'><img src="/src/Events/GCC2014/Abstracts/VivienDeshaies.jpg" alt="Vivien Deshaies"  /></a> 
<a href='http://u900.curie.fr/en/profile/alban-lermine-00587'><img src="/src/Events/GCC2014/Abstracts/AlbanLermine.jpg" alt="Alban Lermine" height="100" /></a></div>

**[Vivien DESHAIES](http://fr.linkedin.com/pub/vivien-deshaies/36/9b1/831)<sup>1,2,3</sup>, [Alban LERMINE](http://u900.curie.fr/en/profile/alban-lermine-00587)<sup>1,2,3</sup>**, [Séverine LAIR](http://u900.curie.fr/en/profile/severine-lair-00433)<sup>1,2,3</sup> , [Nicolas SERVANT](http://u900.curie.fr/en/profile/nicolas-servant-00440)<sup>1,2,3</sup>, [Elodie GIRARD](http://fr.linkedin.com/pub/elodie-girard/28/14b/984)<sup>1,2,3</sup>, Julien TARABEUX<sup>4,5</sup>, [Philippe HUPE](http://fr.linkedin.com/pub/philippe-hup%C3%A9/58/88/b11)<sup>1,2,3</sup>, [Claude HOUDAYER](http://u830.curie.fr/fr/profile/claude-houdayer-001011)<sup>4,5</sup>, [Emmanuel BARILLOT](http://curie.fr/en/profile/barillot-002973)<sup>1,2,3</sup>

 <sup>1</sup> [Institut Curie](http://curie.fr/)<br /> 
 <sup>2</sup> [INSERM U900, Bioinformatics and Computational Systems Biology of Cancer](http://u900.curie.fr/), Paris, France<br />
 <sup>3</sup> [Mines ParisTech, Fontainebleau](http://www.fbleau.mines-paristech.fr/), France<br />
 <sup>4</sup> [INSERM U830, Génétique et biologie des cancers](http://u830.curie.fr/en/genetics-and-biology-cancers/unit/unit-00106), Paris, France<br /> 
 <sup>5</sup> [Biologie des Tumeurs](http://u830.curie.fr/fr/genetique-et-biologie-des-cancers/unite/unite-0067), Paris, France

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Deshaies.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=66e5c295-3aac-4ee9-8edc-21d0abccdf24)**

Early cancer diagnostic is a challenge that can dramatically improve cancer treatment efficiency. High throughput sequencing technology is the more promising solution to reach this goal, but the analysis of their output is not straightforward and most of the time, need to launch software only available via command line interface.

Galaxy is a web platform that aim to: (1) make command line softwares accessible in an easy to use web interface, (2) construct personal workflows, (3) make analyses reproducible among time, (4) share know-how (workflow sharing) as well as data and annotations. 

We built Galaxydx, an implementation of Galaxy containing a suite of softwares used for the analyses of diagnosis sequencing data (PGM torrent suite, BWA, GATK, !VarScan, Annovar, … etc). Galaxydx allows Clinicians as well as Biologists to be autonomous to perform a complete set of analyses such as: (1) mapping, (2) variant calling, (3) variant filtering, (4) variant annotation, (5) rearrangements calling and (6) visualization through diagnosis dedicated Genome browser ([Alamut](http://www.interactive-biosoftware.com/alamut-visual/)).

We also work on data integrity and confidentiality by modifying the Galaxy writing methodology.
Analyses in Galaxydx are organized by project and user, output files are owned by the user who generates them. It allows us to systematically check system rights on data before any process (Can the current user read input data? Can the current user write in this project?)

<br />

### Using Galaxy and Globus to deliver Science as a Service

<div class='right'>![Ravi Madduri](/src/Events/GCC2014/Abstracts/RaviMadduri.jpg)</div>

**[Ravi K Madduri](http://www.mcs.anl.gov/person/ravi-madduri)<sup>1,2</sup>**, Paul Dave<sup>2</sup>, Alex Rodriguez<sup>2</sup>, Vassily Trubetskoy<sup>3</sup>, Dinanath Sulakhe<sup>2</sup>, Lea Davis<sup>3</sup>, Nancy Cox<sup>3</sup> and Ian Foster<sup>1,2</sup>

 <sup>1</sup> [Argonne National Laboratory](http://www.anl.gov/), Argonne, Illinois, United States<br />
 <sup>2</sup> [Computation Institute](http://www.ci.uchicago.edu/), [University of Chicago](http://www.uchicago.edu/), Chicago, Illinois, United States<br />
 <sup>3</sup> [Section of Genetic Medicine](http://medicine.uchicago.edu/genetic/index.html), [University of Chicago](http://www.uchicago.edu/), Chicago, Illinois, United States<br />

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Madduri.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=7be99fa9-44c2-4623-bcfb-32d5e1ed43f0)**

At the [Computation Institute](http://www.ci.uchicago.edu/), we originally posited the notion of science as a service in 2005 as a means of publishing and accessing scientific data and applications through well-defined and internet accessible services. Our vision of science as a service worked well in a world when computing resources were scarce; when we needed to federate heterogeneous resources and make them accessible to researchers; when different tools and data were provided using different interfaces and representations; and when research problems involved datasets that could be hosted and analyzed on a single computer. In this talk we re-examine our vision of science as a service in a world in which computing resources are now commoditized; a world in which researchers are increasingly facing 'big data' challenges; a world in which Cloud providers, such as [Amazon Web Services](http://aws.amazon.com), have become viable alternatives to purchasing dedicated infrastructure; and a world in which building reliable infrastructure for solving scientific problems is only an API call away.

We will present our efforts on using Galaxy and [Globus](https://www.globus.org/) to create cloud-based services for scientific domains such as Genomics, Climate modeling, Cosmology, ECG Analysis and Material Sciences. We will present lessons learned, extensions we created to enable these communities adoption of Galaxy as an analysis engine. We will present a recent genomics usecase enabled using Galaxy based Globus Genomics on creating and running Consensus Genotyper for exome sequencing pipeline on large scale Tourette's Syndrome data set. (Joint work with [Dr. Nancy Cox's group at UChicago](http://med-www02.bsd.uchicago.edu/339/FacultyPro/faculty_profile.aspx?empl_id=3441).)

<br />

### SGI UV:  Harnessing the Big Brain Platform for Galaxy

<div class='right'>![James Reaney](/src/Events/GCC2014/Abstracts/JamesReaney.png)</div>

**[James Reaney](http://www.sgi.com/solutions/genomics/)<sup>1</sup>**

 <sup>1</sup> Senior Director, Research Markets, [SGI](http://www.sgi.com)

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Reaney.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=051f7119-7e12-4759-a106-7fdd9a3c8335)**

GI UV scales to truly extraordinary levels – today up to 2,560 physical cores and 64TB of cache-coherent, globally shared memory in a single system.  UV is also a developer’s dream playground:  standard Intel x86 architecture, standard Linux distros, support for large numbers of Nvidia GPU and Xeon<sup>®</sup> PHI<sup>®</sup>, and all those cores and memory at your disposal in a single OS.  Run standard ISV applications or any open-source code just like any Linux instance, no recompiling necessary.  The versatility, high performance, and extreme scale of UV makes it the ultimate "analysis supernode", but what if we used UV as an enabling platform for Galaxy workflows?  How much more extensible might the tools become?  What new scales might Galaxy workflows reach?  What larger-scale research might be simply enabled in the first place by having a more effective computational architecture underlying the Galaxy workflow?

<br />


## Session 7, Wednesday, July 2, 1:15-2:35

### Building a virtual research environment with Galaxy

<div class='right'><a href='https://urgi.versailles.inra.fr/About-us/Team/Genome-analysis/Olivier-Inizan'><img src="/src/Events/GCC2014/Abstracts/OlivierInizan.png" alt="Olivier Inizan" width="100" /></a> <a href='https://urgi.versailles.inra.fr/About-us/Team/Genome-analysis/Mikael-Loaec'><img src="/src/Events/GCC2014/Abstracts/MikaelLoaec.png" alt="Mikael Loaec" width="100" /></a></div>

**[Olivier Inizan](https://urgi.versailles.inra.fr/About-us/Team/Genome-analysis/Olivier-Inizan)<sup>1</sup>, [Mikael Loaec](https://urgi.versailles.inra.fr/About-us/Team/Genome-analysis/Mikael-Loaec)<sup>1</sup>**, [Eric Rasche](https://www.biostars.org/u/5504/)<sup>2</sup>, [Hadi Quesneville](https://urgi.versailles.inra.fr/About-us/Team/Management-staff/Hadi-Quesneville)<sup>1</sup>

 <sup>1</sup> [URGI-INRA](https://urgi.versailles.inra.fr/), Versailles, France
 <sup>2</sup> [Center for Phage Technology](https://cpt.tamu.edu/), [Texas A&M University](http://tamu.edu), College Station, Texas, United States 

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/InizanLoaec.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=173f00ca-ce51-48eb-88a1-054b5f1de120)**

The democratization of virtualization techniques provide a new opportunity to improve bioinformatics analysis. Storing, sharing and reusing tools dedicated to an analysis is the goal of the galaxy toolshed project. With virtualization techniques, it is now possible to expand their strategy to all the components required to perform a bioinformatic analysis such as the operating system, the software, the datasets, the dependencies, the user data, …). 

Integrating these components in a virtual machine provide a virtual research environment (VRE) that could be duplicated and shared. With the growing availability of infrastructures supporting virtualization (such as cloud computing infrastructures), VREs offer a new opportunity to improve bioinformatics analysis accessibility and reproducibility.

Accessibility and  reproducibility are the building blocks of the Galaxy project and the Galaxy platform could play a significant role in such environments. However, to become accessible and shareable, creating and updating  a VRE should be  automated as much as possible, from the virtual machine provisioning to tools deployment and tests.

Here we describe our progress towards an automation process for the deployment of a Galaxy instance.  The current work is focused on virtual machine provisionment with [Cobbler](http://www.cobblerd.org/) and automatic configuration with [Puppet](http://puppetlabs.com/puppet/what-is-puppet). The opportunities that such an approach provides to developers and biologists will be discussed, illustrated on the future French infrastructures dedicated to cloud computing: the IFB and INRA academic Clouds.

<br />

### The Australian Genomics Virtual Laboratory

<div class='right'><a href='http://www.msi.unimelb.edu.au/people/andrew-lonie/'><img src="/src/Events/GCC2014/Abstracts/AndrewLonie.jpg" alt="Andrew Lonie" width="110" /></a></div>

**[Andrew Lonie](http://www.msi.unimelb.edu.au/people/andrew-lonie/)<sup>1</sup>**, [Enis Afgan](/src/EnisAfgan/index.md)<sup>2,3</sup>, [Ron Horst](http://au.linkedin.com/pub/ron-horst/0/9a2/550)<sup>4</sup>, [Simon Gladman](http://www.vlsci.org.au/researcher/sgladman)<sup>5</sup>, [Clare Sloggett](http://www.vlsci.org.au/researcher/csloggett)<sup>1</sup>, [Nuwan Goonasekera](http://www.vlsci.org.au/researcher/ngoonasekera)<sup>1</sup>, Igor Manukin<sup>4</sup>, [Yousef Kowsar](http://www.vlsci.org.au/researcher/ykowsar)<sup>4</sup>

 <sup>1</sup> [Life Sciences Computation Centre](http://www.vlsci.org.au/), [University of Melbourne](http://www.unimelb.edu.au/), Australia<br />
 <sup>2</sup> [University of Melbourne](http://www.unimelb.edu.au/), Australia <br />
 <sup>3</sup> [Ruđer Bošković Institute](http://www.irb.hr/), Croatia<br />
 <sup>4</sup> [University of Queensland](https://www.uq.edu.au/), Australia<br />
 <sup>5</sup> [Life Sciences Computation Centre](http://www.vlsci.org.au/), [Monash University](http://www.monash.edu.au/), Australia

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Lonie.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=8e30d3b9-639e-49f8-9fc7-027e487a06b0)**

The Australian [Genomics Virtual Laboratory (GVL)](https://www.nectar.org.au/genomics-virtual-laboratory) is a national program aiming to provide the research community with an accessible, scalable genomics analysis platform on national compute infrastructure. The GVL leverages a significant investment in cloud infrastructure by the Australian government and existing cloud management tools to enable researchers to create on-demand genomics analyses environments based on the open source Galaxy workflow platform, linked through high speed networks to very large reliable data storage, and local instances of visualization engines like the UCSC browser.

This talk will discuss the technical and practical lessons learned during the development of the Genomics Virtual Lab, including considerations in defining and implementing a one-size-fits-all pre-configured Galaxy image, the constraints a cloud environment places on practical 'real data' genomics, identification of and interaction with the user base, and deliberations on the future of the Genomics Virtual Laboratory including architecting for the entire genomics analysis life cycle on the cloud.

<br />


### Galaxy on the GenomeCloud : Yet another on-demand Galaxy cloud, but only powered by Apache CloudStack

<div class='right'><a href='https://www.linkedin.com/in/youngkikim'><img src="/src/Events/GCC2014/Abstracts/YoungkiKim.jpg" alt="Youngki Kim" width="100" /></a></div>

**[Youngki Kim](https://www.linkedin.com/in/youngkikim)<sup>1</sup>**, CB Hong<sup>1</sup>, Kjoong Kim<sup>1</sup>, Daechul Choi<sup>1</sup>

 <sup>1</sup> [GenomeCloud](https://genome-cloud.com/), Seoul, Korea

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Kim.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=85daee8a-2cfc-4bac-a872-5691d7dee5f8)**

Bioinformatics and genome data analysis in South Korea is at its early stage but getting busier.  To keep pace with this trend of research, [GenomeCloud](https://genome-cloud.com/) was created at the end of 2012.  !GenomeCloud is an integrated platform for analysing, interpreting and storing genome data, based on [KT's cloud computing infrastructure](http://www.kt.com/eng/biz/gs_02_03.jsp) which uses [Apache CloudStack](http://cloudstack.apache.org/) software.  !GenomeCloud consists of g-Analysis (automated genome analysis pipelines at your fingertips), g-Cluster (easy-of-use and cost-effective genome research infrastructure) and g-Storage (a simple way to store and share genome-specific data).

Because of flexible tool integration architecture and seamless workflow creation functionality, Galaxy was selected to achieve multi purpose goals such as agile pipeline development and bioinformatics education support.  To provide on-demand and Apache !CloudStack based Galaxy cluster, we have automated virtual machine creation, clustering and various software setup including Galaxy.

Furthermore, seamless integration with !GenomeCloud helps researchers not only create and manage Galaxy through a convenient web interface but also fully utilizes genome data in g-Storage.  g-Storage is powered by [OpenStack](http://www.openstack.org/) [Swift](https://wiki.openstack.org/wiki/Swift) and specially designed genome file transfer protocol.

Galaxy on the !GenomeCloud uses Grid Engine as a Cloud HPC Solutions, [Ganglia](http://ganglia.sourceforge.net/) as a  distributed monitoring system and LVM over NFS as a large volume shared storage, all of which are setup automatically upon request.
This talk will be about our experiences while integrating Galaxy with !GenomeCloud and use cases of Galaxy such as scalable bioinformatics education system and request fulfillment of RNA-seq analysis.

<br />


### Test-driven Evaluation of Galaxy Scalability on the Cloud

<div class='right'><a href='http://www.vlsci.org.au/researcher/ngoonasekera'><img src="/src/GalaxyTeam/nuwan.jpg" alt="Nuwan Goonasekera" width="120" /></a></div>

[Enis Afgan](/src/EnisAfgan/index.md)<sup>1,2</sup>, Derek Benson<sup>3</sup>, and **[Nuwan Goonasekera](http://www.vlsci.org.au/researcher/ngoonasekera)<sup>1</sup>** 

 <sup>1</sup> [VLSCI](http://www.vlsci.org.au/), University of Melbourne, Melbourne, Australia<br />
 <sup>2</sup> CIR, RBI, Zagreb, Croatia<br />
 <sup>3</sup> Research Computing Centre, University of Queensland

**[Slides](ATTACHMENT_URLDocuments/Presentations/GCC2014/Goonasekera.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=60eb2306-b4a7-452f-bba6-b91824a66e9b)**

To verify the essential functions of a Galaxy instance are being provided correctly to the end-user, functional testing of typical Galaxy tasks is important. In addition, for groups which intend to deploy their own Galaxy instances (on the cloud or otherwise), knowing the scalability characteristics of the instance with respect to the number of users, machine size, storage solution and cloud provider, is also important. By combining both functional and performance testing into one common testing infrastructure, we assessed both of these aspects with the same underlying test code.

With respect to the first aspect of assessing whether the basic functions of Galaxy are working correctly from an end-user perspective, functional testing was performed via the browser automation tool Selenium, which can mimic the exact actions of an end-user interacting with the application. We then extended these tests to use the Selenium Grid, which converted the functional test into a performance test by running the tests in parallel, thus simulating multiple concurrent users.

This presentation will describe how these two aspects were used to determine the scalability characteristics of Galaxy on the cloud. The presentation will discuss the following:
* Describe how the same infrastructure is reused for testing the functional and scalability characteristics of Galaxy, using CloudMan;
* Analyse how a number of variables, such as the number of users, machine size and storage option, affects scalability;
* Provide insights into how Galaxy scales on the cloud, and what factors to consider when deploying on your own infrastructure;
* Provide a reusable suite of tests for functionally verifying and benchmarking private GVL/Galaxy instances

Data and results collected to obtain above conclusions will be made publicly available and can act as reference data points for others reusing the presented system on their own Galaxy instances.

<br />

### Bioinformatics on AWS: New and Noteworthy Features

<div class='right'><a href='https://www.linkedin.com/in/angelpizarro'><img src="/src/Events/GCC2014/Abstracts/AngelPizarro.png" alt="Angel Pizaro" width="100" /></a></div>

**[Angel Pizarro](https://www.linkedin.com/in/angelpizarro)<sup>1</sup>**

 <sup>1</sup> Senior Solutions Architect, [Amazon Web Services](http://aws.amazon.com)

In this talk, we will cover recent service and feature releases from Amazon Web Services, and how they apply to bioinformatics and scientific computing.

<br />
