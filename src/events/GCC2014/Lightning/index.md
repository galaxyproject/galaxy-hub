---
autotoc: true
title: Lightning Talks
---
PLACEHOLDER_INCLUDE(/src/Events/GCC2014/Header/index.md)

<br /><br />



PLACEHOLDER_INCLUDE(/src/Events/GCC2014/LinkBox/index.md)

Lightning talks are a mixture of topics selected in advance and those solicited during the meeting. They will be presented during [Session 4, on Tuesday](/src/Events/GCC2014/Program/index.md#day-1-main-meeting) and [Session 8 on Wednesday](/src/Events/GCC2014/Program/index.md#day-2-main-meeting).

If you wish to give a lightning talk, please send a title and short abstract to [mailto:gcc2014-sci AT groups DOT galaxyproject DOT org](GCC2014 Scientific Committee), either 
* any time before the start of [Session 2](/src/Events/GCC2014/Lightning/Program/index.md#day-1-main-meeting-july-1) (to be considered for Tuesday or Wednesday slots), or 
* before [Session 6](/src/Events/GCC2014/Lightning/Program/index.md#day-2-main-meeting-july-2) (to be considered for Wednesday only).  

The slides for all lightning talks will be made available on the this page, and the talks may be videotaped and posted here as well.

# Talks



## Accepted Talks, Session 4, Tuesday, July 1

These talks have been accepted for the first lightning talks storm on Tuesday.


### Visualising Proteomics Data in Galaxy

**Ira Cooke<sup>1</sup>**

 <sup>1</sup> Latrobe University

**[Slides](ATTACHMENT_URLCookeVisProt.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=bb4e1ca7-0e8f-45b1-898f-bb2906ed4272)**

...

### Building a scalable Galaxy cluster for biomedical research in The Netherlands

**David van Enckevort**<sup>1</sup>, Anthony Potappel<sup>2</sup>, Niek Bosch<sup>3</sup>, Jeroen Beliën<sup>4</sup>, Rita Azevedo<sup>5</sup>, Rob Hooft<sup>5</sup>, Sander Ruiter<sup>2</sup>, Sanne Abeln<sup>6</sup>, Irene Nooren<sup>3</sup>, Jan-Willem Boiten<sup>7</sup>

 <sup>1</sup> University Medical Center Groningen, University of Groningen, Groningen, The Netherlands<br />
 <sup>2</sup> Vancis, Amsterdam<br />
 <sup>3</sup> SURFsara, Amsterdam, The Netherlands<br />
 <sup>4</sup> VU university medical center, Amsterdam, The Netherlands<br />
 <sup>5</sup> Netherlands eScience Center, Amsterdam, The Netherlands<br />
 <sup>6</sup> VU university, Amsterdam, The Netherlands<br />
 <sup>7</sup> Center for Translational Molecular Medicine, Eindhoven, The Netherlands

**[Slides](ATTACHMENT_URLvanEnckevortScalable.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=b2614658-29e0-49a3-882b-7d9f01eb2471)**

For the national translational IT project CTMM/TraIT Galaxy has been selected as one of the tools in the experimental domain. The TraIT partners (among others NBIC and SURFsara) have developed a vision how to make Galaxy available to the research community in The Netherlands. The scalable Galaxy cluster on the SURFsara HPC Cloud will be transferred to Vancis to provide a sustainable production-level Galaxy cluster. In the design of this environment Vancis has made use of the knowledge and experience of NBIC and SURFsara hosting the public NBIC instance on the SURFsara HPC Cloud.

To assess the minimal requirements for the infrastructure we used metrics collected while running the NBIC Galaxy on the HPC Cloud. Next we drafted a set of use cases the infrastructure should be able to fulfil, such as the ability to run Omics-pipelines and the ability to scale to handle peak demand. We identified I/O performance as a major bottleneck, since many Galaxy tools are I/O intensive, while Galaxy has a shared data design. Memory was also recognized as a critical factor, since typical datasets are in the order of the tens of gigabytes. We also built upon the experiences from SURFsara in operating the HPC Cloud and other HPC. To accommodate for a full set of development, testing, acceptance & production environments, as well as private installations, the infrastructure should support multiple Galaxy clusters. The chosen architecture will use a Linux High Availability environment with [OpenStack](http://openstack.org), which will run on two large-size blades. Storage is split into multiple tiers with different characteristics to support both high I/O workloads and a reliable large storage. The chosen setup is horizontally scalable in a cost-efficient manner.

From May to September 2014 we will pilot the new architecture within the TraIT project. For this pilot we have selected a few TraIT NGS tools and pipelines to stress test the system under different workload scenarios.
Furthermore we have established a process to ensure the quality of the tools required for a stable production environment.

<br />

### Mississippi: a galaxy server centered on small RNA analysis

**Marius van den Beek<sup>1</sup>**, Christophe Antoniewski<sup>1</sup>

 <sup>1</sup> [Drosophile.org](http://drosophile.org), CNRS and University Pierre-et-Marie-Curie, Paris

**[Slides](ATTACHMENT_URLvanDenBeekMississippi.pptx), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=9fed7061-735f-4c3a-93a3-95b7ff51dd35)**

Non-coding small RNAs (miRNA, siRNA, piRNA, …) are involved in the regulation of genes and transposable elements as well as in the defense against viral infections. Their discovery and their functional characterization rely heavily on high throughput RNA sequencing. The ~20:30nt length of small RNAs raises specific challenges for meaningful read mapping and analysis, so that standard RNAseq analysis methods have to be adapted. We provide an integrated set of galaxy tools that should streamline the most frequent small RNA analysis needs. This includes a modified bowtie-wrapper and workflows that allow users to quickly and reproducibly interrogate various aspects of small RNA biology. We provide tools for the discovery and differential expression analysis of miRNAs and a way for genome-wide visualization of miRNA precursors that complements Trackster. Furthermore we provide tools to detect the “ping-pong” biogenesis signature of piRNAs, to detect piRNA-producing loci in the genome and to study and visualize the impact of piRNAs and siRNAs on transposable elements.

<br />

### A Galaxy-Based framework for online streaming data analytics in Heart Rate Variability Analysis

**C Zarbo<sup>1</sup>**, A Bizzego<sup>1,2,3</sup>, M Mina<sup>1</sup>, G Esposito<sup>2,4</sup>, C Furlanello<sup>1</sup>

 <sup>1</sup> Predictive Models for Biomedicine & Environment - Fondazione Bruno Kessler, Trento, Italy<br />
 <sup>2</sup> University of Trento, Italy<br />
 <sup>3</sup> SKIL Telecom Italia, Trento, Italy<br />
 <sup>4</sup> RIKEN BSI, Wako-Shi, Japan

**[Slides](ATTACHMENT_URLZarboHeartRate.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=534f4b31-1e7b-4284-91b4-0f2e84731820)**

The emerging applications in physiological data processing, encouraged by the availability of wearable sensors for continuous self-monitoring and quantified self, require new platforms for time series analysis supporting real-time processing and fast prototyping capabilities. We recently proposed Physiolyze, a Galaxy-based web framework to support complex workflows for Heart Rate Variability (HRV) analysis. Here we extend Physiolyze by introducing scalable online processing capabilities. 

The enhanced version still relies on Galaxy as core platform to design and manage the pipelines. In order to incrementally analyze the streams, a set of Python routines based on the Bioblend library works as middleware to trigger the pipelines as new data become available. A web interface based on the Django Python framework allows the user to control the execution of the pipelines, running them on new data streams.

We tested our system on the task of predicting infant behavioral state from HRV patterns. We simulated a real-time scenario of 100 asynchronous data streams from data for 24 infants previously collected with a Light WP Holter ECG recorder (GE Healthcare). The system incrementally extracts 37 HRV indicators from each data stream and predicts the infant state (e.g. wake, sleep, cry) with a Random Forest regression model. The pipeline is modular and fully managed as a Galaxy workflow. 

Our system can easily be adapted to other online streaming analytics applications,  such as for the parallelized analysis of multiple data streams acquired from physiological sensors and wearable devices.

<br />


### Ebiogenouest régional initiative : a use case for the structuration of the biologists community

**Yvan Le Bras<sup>1</sup>** and Olivier Collin<sup>1</sup>

 <sup>1</sup> CNRS UMR 6074 IRISA-INRIA, Rennes, France

**[Slides](ATTACHMENT_URLLeBrasEbiogenouest.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=d568c8fa-d548-489a-9b0c-3d215e452aa9)**

Two years after the beginning of a western France e-Science project, we propose here to highlight some results and show prospects.

<br />

### Intergalactic travel: Sending usegalaxy.org through the wormhole

**Nate Coraor<sup>1</sup>**, Dannon Baker <sup>2</sup> and John Chilton<sup>1</sup>

 <sup>1</sup> Galaxy Team, Penn State University, University Park, Pennsylvania<br />
 <sup>2</sup> Galaxy Team, Johns Hopkins University, Baltimore, Maryland

**[Slides](ATTACHMENT_URLCoraorTravel.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=e8720ff3-5d6b-4341-8620-b0dd82600f62)**

Due to resource constraints, the main public Galaxy server run by the Galaxy Team, usegalaxy.org, moved from Penn State to the Texas Advanced Computing Center, with backups at the Pittsburgh Supercomputing Center. In addition to these resources, Galaxy has been awarded an XSEDE Grant of over 400,000 SUs, which we will be utilizing to further extend usegalaxy.org's computing Capacity.

This talk provides an overview of the work that was done to move the site, what challenges we faced, and some of the work that is going on right now and in the near future.

## Accepted Talks, Session 8, Wednesday, July 2

These talks have been accepted for the second lightning talks storm on Wednesday.

### Plan for Galaxy based Chip-exo Analysis platform

**Bongsoo Park<sup>1</sup>**

 <sup>1</sup> Center for Eukaryotic Gene Regulation, The Pennsylvania State University

**[Slides](ATTACHMENT_URLParkChip-exo.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=b61d8ba7-a5bc-48aa-97f5-e50fad82826a)**

### BeeGFS: Accelerating the access to BLAST and Galaxy Indices

Franz-Josef Pfreundt<sup>1</sup>, **Björn Grüning<sup>2</sup>**

 <sup>1</sup> Fraunhofer ITWM<br /> 
 <sup>2</sup> Bioinformatics Uni Freiburg

**[Slides](ATTACHMENT_URLGrüningBeeGFS.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=393d0dbc-d56a-48ad-8dee-a54cfe145251)**

### Less talking, more doing: Crowd-sourcing the integration of Galaxy with a high-performance computing cluster

**Michael Crusoe<sup>1</sup>**

 <sup>1</sup> Michigan State University 

**[Slides](ATTACHMENT_URLCrusoeDoing.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=d6c9a21d-4b22-41c9-8ab5-d031cdf11ed1)**

### Running and maintaining a reliable production Galaxy server

**Shane Sturrock<sup>1</sup>**

 <sup>1</sup> New Zealand Genomics Ltd

**[Slides](ATTACHMENT_URLSturrockReliable.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=53ac8dbb-6708-4017-95b3-968c79fa3c5e)**

### Private BLAST: Using Galaxy

Emma Prudent<sup>1</sup>

Presented by **Gilda Le Corguillé<sup>1</sup>**

 <sup>1</sup> Abims

**[Slides](ATTACHMENT_URLLeCorguilléBLAST.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=7f7d2565-9090-45fe-9baf-0c1309fe5a74)**

### SNPedia

**Michael Cariaso<sup>1</sup>**

 <sup>1</sup> !KeyGene

**[Slides](ATTACHMENT_URLCariasoSNPedia.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=55a66593-db99-4e17-8faa-2b517381ce51)**

### Galaxy: Farm to Federation

**Kyle Ellrott<sup>1</sup>**, [Dannon Baker](/src/DannonBaker/index.md)<sup>2</sup>

 <sup>1</sup> UC Santa Cruz<br />
 <sup>2</sup> John Hopkins University

**[Slides](ATTACHMENT_URLEllrottFarm.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=f0748817-ddda-461c-90a6-db7a263f0ea0)**

### Galaxy Docker Containers: Docker, Docker, Docker

**Björn Grüning<sup>1</sup>**

 <sup>1</sup> Bioinformatics Uni Freiburg

This talk was entirely a [live demo](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=393d0dbc-d56a-48ad-8dee-a54cfe145251).  

**[Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=393d0dbc-d56a-48ad-8dee-a54cfe145251)**


### Galaxy Search API

**Kyle Ellrott<sup>1</sup>**

 <sup>1</sup> UC Santa Cruz<br />

**[Slides](ATTACHMENT_URLEllrottSearchAPI.pdf), [Video](http://jh.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=afe5f1de-84cd-41aa-b379-5fd73c22ad8c)**


## Goals

Lightning talks are your opportunity to give an impassioned and enthralling talk about something that you care about - but you only have 300 seconds. Make every one count, because your audience may include people suffering from limited attention spans this late in the proceedings.  

## Timing

* Lightning talks are **5** minutes followed by **2** minutes for questions.  
* At **5** minutes in, **thunder will be played**
* At **6** minutes in we will take over the presentation laptop and start switching to the next set of slides.
* At **7** minutes the next talk will start, *no matter what.*

## Slides

* Your slides (as PDF or !PowerPoint) should be on the presentation computer before the session starts (talk to [Dave Clements](/src/DaveClements/index.md)) to minimize the risk of BYOD. 
* You can BYOD (your own computer or whatever) but you are advised not to. 
* **If you do BYOD, we will start swapping out your device at 2 minutes left, rather than 1.**
* Connection and fiddling time beyond the first minute comes out of your 5 minutes and ***is painful, for everyone.***  

## Gratuitous Advice

From [Ross Lazarus](/src/RossLazarus/index.md), the (possibly former) *Benevolent Lightning Session Moderator for Life*

* Good lightning talks are well rehearsed and very, very focussed.  
* Plan on talking to 5 or 6 slides 
* Don't try to cram a 30 minute talk into 5 minutes. It won't fit. 
* 5 minutes is not long enough to explain anything in detail.  Just give the big picture.  
* Practice your talk at least 3 times to make sure it works and fits in 5 minutes. 
* If you have more than 5 or 6 slides, you are probably screwed before you start and stand a high risk of being cut off in mid-flight unless you have rehearsed a few times with a timer to be sure you can fit everything in. 
* You are advised not to read your acknowledgements out loud. It's a lightning talk for heaven's sake. 

## Submit a Proposal

<table>
  <tr>
    <th> &nbsp; Submission is closed &nbsp; </th>
  </tr>
</table>


<br /> 

Proposals will be solicited during the meeting.  If you wish to give a lightning talk, please send it to outreach@galaxyproject.org before the start of Session 2 (to present on Tuesday) or the start of Session 6 (to present on Wednesday).  The slides for all lightning talks will be made available on the conference web site, and the talks may be videotaped and also posted on the conference web site.

A proposal consists, of a title, and a short description of the topic. 

PLACEHOLDER_INCLUDE(/src/Events/GCC2014/Footer/index.md)
