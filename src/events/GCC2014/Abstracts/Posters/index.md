---
autotoc: true
---
PLACEHOLDER_INCLUDE(/src/Events/GCC2014/Header/index.md)

PLACEHOLDER_INCLUDE(/src/Events/GCC2014/LinkBox/index.md)

## Poster Abstracts

There will be two poster sessions:

**First Poster Session: Tuesday, July 1, 2:30-4:00**

   *Odd* numbered posters will be presented during poster session 1.

**Second Poster Session: Wednesday, July 2, 2:30-4:00**

   *Even* numbered posters will be presented during poster session 2.

Poster dimensions are a maximum of 48" x 48" (122cm x 122cm).




<br /><br />

### P1: Lifeportal - web portal to high performance computing resources at University of Oslo

**Nikolay Vazov<sup>1</sup>, Katerina Michalickova<sup>1</sup>**

 <sup>1</sup> [University of Oslo, HPC group](http://www.usit.uio.no/english/about/organisation/bps/rc/rss/index.html)

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P1Vazov.pdf)**

One of the main goals of the HPC (High Performance Computing) services at University of Oslo, Norway, is to make the complex HPC resources accessible to wide audience with a varied degree of experience. The Lifeportal ([lifeportal.uio.no](http://lifeportal.uio.no)) is currently geared towards the biomedical research with a special emphasis on the next generation sequencing data processing while a text mining instance is being finalized.

In addition to the existing Galaxy core facilities, the Lifeportal has a set of newly developed features that are
essential for the Galaxy - HPC functionality. Our poster will discuss:

* user authentication and authorization with the integration of the National Academic IDP based on SAML technology
* integrated user/project management module for project applications, authorization and management
* project accounting module based on an external resource allocation manager (GOLD)
* module for project reporting and providing feedback to the funding agency
* big file upload based on Filesender technology allowing to upload files up to 250 GB into Galaxy
* details of cluster deployment via SLURM DRMAA including:
  * Galaxy code modification allowing for user-selected cluster job parameters such as queue, time, memory, number of nodes and cores
  * export of Galaxy libraries for deployment of the core Galaxy tools on the cluster
  * general changes to tool wrappers needed for cluster implementation

<br />

### P2: Building a scalable Galaxy cluster for biomedical research in The Netherlands

**David van Enckevort<sup>1</sup>, Anthony Potappel<sup>2</sup>**, Niek Bosch<sup>3</sup>, Jeroen Beliën<sup>4</sup>, Rita Azevedo<sup>5</sup>, Rob Hooft<sup>5</sup>, Sander Ruiter<sup>2</sup>, Sanne Abeln<sup>6</sup>, Irene Nooren<sup>3</sup>, Jan-Willem Boiten<sup>7</sup>

 <sup>1</sup> University Medical Center Groningen, University of Groningen, Groningen, The Netherlands<br />
 <sup>2</sup> Vancis, Amsterdam<br />
 <sup>3</sup> SURFsara, Amsterdam, The Netherlands<br />
 <sup>4</sup> VU university medical center, Amsterdam, The Netherlands<br />
 <sup>5</sup> Netherlands eScience Center, Amsterdam, The Netherlands<br />
 <sup>6</sup> VU university, Amsterdam, The Netherlands<br />
 <sup>7</sup> Center for Translational Molecular Medicine, Eindhoven, The Netherlands

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P2vanEnckevort.pdf)**

**Introduction**

For the national translational IT project CTMM/TraIT Galaxy has been selected as one of the tools in the experimental domain. The TraIT partners (among others NBIC and SURFsara) have developed a vision how to make Galaxy available to the research community in The Netherlands. The scalable Galaxy cluster on the SURFsara HPC Cloud will be transferred to Vancis to provide a sustainable production-level Galaxy cluster. In the design of this environment Vancis has made use of the knowledge and experience of NBIC and SURFsara hosting the public NBIC instance on the SURFsara HPC Cloud.

**Material & Methods**

To assess the minimal requirements for the infrastructure we used metrics collected while running the NBIC Galaxy on the HPC Cloud. Next we drafted a set of use cases the infrastructure should be able to fulfil, such as the ability to run Omics-pipelines and the ability to scale to handle peak demand. We identified I/O performance as a major bottleneck, since many Galaxy tools are I/O intensive, while Galaxy has a shared data design. Memory was also recognized as a critical factor, since typical datasets are in the order of the tens of gigabytes. We also built upon the experiences from SURFsara in operating the HPC Cloud and other HPC. To accommodate for a full set of development, testing, acceptance & production environments, as well as private installations, the infrastructure should support multiple Galaxy clusters. The chosen architecture will use a Linux High Availability environment with [OpenStack](http://openstack.org), which will run on two large-size blades. Storage is split into multiple tiers with different characteristics to support both high I/O workloads and a reliable large storage. The chosen setup is horizontally scalable in a cost-efficient manner.

**Results**

From May to September 2014 we will pilot the new architecture within the TraIT project. For this pilot we have selected a few TraIT NGS tools and pipelines to stress test the system under different workload scenarios.
Furthermore we have established a process to ensure the quality of the tools required for a stable production environment.

<br />

### P3: Practical experiences from the Munich NGS-FabLab - Tools, compatibility and pitfalls off the standard tracks

Aarif Mohamed Nazeer Batcha<sup>1</sup>, **Sebastian Schaaf<sup>1,2</sup>**, Guokun Zhang<sup>1</sup>, Sandra Fischer<sup>1</sup>, Ashok Varadharajan<sup>1</sup>,   Ulrich Mansmann<sup>1,2</sup>

 <sup>1</sup> [Department of Medical Informatics, Biometry and Epidemiology (IBE)](http://www.ibe.med.uni-muenchen.de/), Ludwig Maximilians University (LMU) Munich, Germany<br />
 <sup>2</sup> [German Cancer Consortium (DKTK)](http://www.dkfz.de/en/dktk/), Heidelberg, Germany

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P3Schaaf.pdf)**

Over three years, the Munich NGS-!FabLab  was build up first as a concept and later as a running IT system, based on an assessment of requirements, constraints and given structural conditions. Since some months it is in active use, although still under intense development. 

As every developer knows, especially complex and broad open source software like Galaxy does not come error-free. Expected issues were due to non-standard elements like the operating system (SLES 11), hardware (x86 server not supported by the clinics IT, FPGA hybrid-computer, network load, …), computational requests (projects with special needs or proprietary software) and not to forget financing and politics. Apart from that, Galaxy itself and the associated software packages and/or the respecting wrappers surprisingly often turned out to be in need of corrections, although we assumed to use standard input data and perform simple jobs.  Finally, those tools or computations which were needed, but are not yet supported by the Galaxy framework, most work invested deals with trouble-shooting, bug-hunting and code analysis. 

Experiences, fixes, improvements and new integrations are subject to this poster, which may appear more like a collage of loosely connected sub-topics. While we did not return those code snippets to the community yet, we also hope to get into the process of submitting contents for public use and discuss them, in order to improve the framework as a whole.

<br />

### P4: e-Science in France, a Life science Western story

**Yvan LE BRAS<sup>1</sup>**, Aurélien ROULT<sup>1</sup>, Cyril MONJEAUD<sup>1</sup>, Mathieu BAHIN<sup>2</sup>, Olivier QUENEZ<sup>3,4</sup>, Claudia HERIVEAU<sup>1</sup>, Olivier SALLOU<sup>1</sup>, Anthony BRETAUDEAU<sup>1,5</sup> and Olivier COLLIN<sup>1</sup>

 <sup>1</sup> [GenOuest Core Facility](http://www.genouest.org/), UMR6074 IRISA CNRS/INRIA/Université de Rennes1, Campus de Beaulieu, 35042, Rennes Cedex, France<br />
 <sup>2</sup> IGDR, UMR 6290-CNRS Université de Rennes1, 2 avenue Professeur Léon Bernard, Campus de Villejean, 35065, Rennes Cedex, France<br />
 <sup>3</sup> Inserm U1079, Institut de Recherche et d'Innovation Biomédicale (IRIB), Université de Rouen, France<br />
 <sup>4</sup> Centre National de Référence pour les Malades Alzheimer Jeune, CHU de Rouen, Lille et Paris-Salpêtrière, Rouen, France<br />
 <sup>5</sup> INRA IGEPP, UMR1349 Agrocampus-Ouest INRA Université Rennes1, domaine de la motte, 35653, Le Rheu, Cedex 35327, France

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P4leBras.pdf)**


Research processes are evolving at a rapid pace. This evolution, mainly due to technological advances, offers powerful equipment and generalizes the digital aspect of the research data. If facing the actual data deluge context represents a challenge, it also offers an opportunity to change and enhance our manner to tackle research tasks and disseminate science. In Life Sciences, as in other domains, we are noting a sharp increase in storage and computing needs. Regularly adding hardware resources to the bioinformatics core facilities is no longer sustainable. Scientific data management and analysis have to be enhanced in order to offer services and developments matching the new uses. 

Since 2 years, Galaxy platform is used in combination with ISATools and HUBzero to build a Life Sciences Virtual Research Environment. Each tool offers complementary functionalities: ISAtools software suite for metadata management, HUBzero for scientific collaboration and Galaxy for computation. The resulting combination allows scientists to manage their project from collaboration to data management and analysis. This Virtual Research Environment (VRE) is tested in partnership with the scientific communities in Western France. The evaluation will give us insights on the usage and acceptance of new tools in a scientific field characterized by profound modification of its traditional processes.

Although the deployment of this kind of environment is challenging, it represents an opportunity to pave the way towards better research processes through enhanced collaboration, data management, analysis practices and resources optimization.

<br />

### P5: drylab.nl.enabling.translational.research

**Christian Rausch<sup>1</sup>**, Daoud Sie<sup>1</sup>, Jeroen Galle<sup>2</sup>, Jeroen Crappe<sup>2</sup>, Gerben Menschaert<sup>2</sup>, Bauke Ylstra<sup>1</sup>, Wim Van Criekinge<sup>1,2</sup>

 <sup>1</sup> Cancer Center Amsterdam, VU University Medical Center, Amsterdam, The Netherlands<br />
 <sup>2</sup> Biobix, Lab of Bioinformatics and Computational Genomics, Ghent University, Ghent, Belgium

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P5Rausch.pdf)**

The Cancer Center Amsterdam (CCA) of VU University Medical Center is a research center that performs internationally recognized research in the area of oncogenetics, immunopathogenesis, disease profiling, innovative therapy and quality of life.
 
We are currently establishing a Drylab that empowers both researchers and clinicians with state-of-the-art bioinformatics solutions. The Drylab is expected to contribute scientifically, which we want to make possible by building a team with diverse interdisciplinary backgrounds: Biology, statistics, experimental design, bioinformatics etc.

Establishing an organizational context with continued funding is an ongoing challenging task. First, we have built a scalable infrastructure. We established Drylab.nl as a custom Wordpress instance, expanded with a helpdesk and ticketing system and linked to a Galaxy based workflow system using a tool shed to (re)use and share internal and external workflows. In external collaborations (e.g. with Biobix in Ghent, Belgium) we are building/exchanging pipelines/workflows for RNAseq, proteogenomics (riboSeq) and methylome analysis (methylcapSeq). We are also implementing a workflow validation procedure using test data. In order to close the loop to the end user we are planning to visualize genomic data on different platforms.

Our initial measure for success will be the actual consolidation and integration of bioinformatics efforts in addition to (re)use of these workflows by non-experts. We do recognize that in order to mature we have to avoid getting caught in a "firefighting mode". Given the shared vision amongst all stakeholders and the embedded organizational context we hope to mature and become an innovation engine within translational medicine.

<br />

### P6: Mississippi: a galaxy server centered on small RNA analysis

**Marius van den Beek<sup>1</sup>**, Christophe Antoniewski<sup>1</sup>

 <sup>1</sup> [Drosophile.org](http://drosophile.org), CNRS and University Pierre-et-Marie-Curie, Paris

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P6vandenBeek.pdf)**

Non-coding small RNAs (miRNA, siRNA, piRNA, …) are involved in the regulation of genes and transposable elements as well as in the defense against viral infections. Their discovery and their functional characterization rely heavily on high throughput RNA sequencing. The ~20:30nt length of small RNAs raises specific challenges for meaningful read mapping and analysis, so that standard RNAseq analysis methods have to be adapted. We provide an integrated set of galaxy tools that should streamline the most frequent small RNA analysis needs. This includes a modified bowtie-wrapper and workflows that allow users to quickly and reproducibly interrogate various aspects of small RNA biology. We provide tools for the discovery and differential expression analysis of miRNAs and a way for genome-wide visualization of miRNA precursors that complements Trackster. Furthermore we provide tools to detect the “ping-pong” biogenesis signature of piRNAs, to detect piRNA-producing loci in the genome and to study and visualize the impact of piRNAs and siRNAs on transposable elements.

<br />

### P7: Bacterial and viral NGS analysis in a public health agency using Galaxy

**Ulf Schaefer<sup>1</sup>**, Anthony Underwood<sup>1</sup>, and Jonathan Green<sup>1</sup>

 <sup>1</sup> [Advanced Laboratory and Bio-Informatics, Microbiology Services, Public Health England](https://www.gov.uk/government/organisations/public-health-england), 61 Colindale Avenue, London NW9 5EQ, United Kingdom, 

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P7Schaefer.pdf)**

Public Health England is home to the United Kingdom's national microbiology reference laboratories and deals with the surveillance and control of infectious disease. Assays for the investigation of selected pathogenic bacteria and viruses are being migrated from traditional wet lab based methodologies such as Multiple Loci VNTR Analysis to methods based on Next Generation Sequencing (NGS) data. Apart from the set up of an NGS service and automated analysis of a small number of priority organisms, one of the key challenges in the management of this paradigm shift in public health is to enable microbiologists and epidemiologists with little to no bioinformatics knowledge and training to interact with and derive scientific value from NGS data. We maintain a local installation of Galaxy in an attempt to address this challenge. This local installation houses all specialised software required for public health microbiology and phylogenetics. Furthermore it provides bespoke workflows for standard analyses regularly employed in outbreak investigations, such the creation a SNP tree from multiple viral or bacterial NGS samples. In addition to an overview of our hardware and software setup, this presentation will highlight 1) An example of a public health specific workflow that can be used for routine reference microbiology services and 2) some of the soft issues around employing Galaxy in this context, such as user acceptance, training, and support.

<br />

### P8: iReport: HTML Reporting in Galaxy

**Saskia Hiltemann<sup>1</sup>**, Youri Hoogstrate<sup>1</sup>, Hailiang Mei<sup>2</sup>, Guido Jenster<sup>1</sup>, Andrew Stubbs<sup>1</sup>

 <sup>1</sup> ErasmusMC, Rotterdam, The Netherlands<br />
 <sup>2</sup> LUMC, Leiden, The Netherlands

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P8Hiltemann.pdf)**

Galaxy offers a number of great visualisation tools (Trackster, Circster), but currently lacks the ability to easily summarise the various outputs of a workflow into a single view. iReport is a Galaxy tool for the easy creation of HTML reports from Galaxy outputs. Rather than having a static HTML output, iFUSE2 uses javascript and jQuery to allow for interactivity in the form of searching and sorting of tables, automatic zooming of image data, tabbed view for organisation of outputs, etc. Users define the number and names of tabs for their report, and can add different types of content-items to these tabs (e.g. text, tabular data, image data, PDF files, links to datasets, and more).

We have previously implemented Galaxy-based data processing pipelines for next-generation sequencing (NGS) and for array based allelic copy number determination named CGtag ([Hiltemann et al. 2014](http://www.gigasciencejournal.com/content/3/1/1)) and developed a web based fusion gene visualizer, iFUSE ([Hiltemann 2013](http://www.ncbi.nlm.nih.gov/pubmed/23661695)). We used the iReport tool to make iFUSE2, the next-step extension to support fusion gene determination within Galaxy, which runs as the last step of our workflow and combines the outputs of various Galaxy tools into a single view.

iReport is available from the DTL toolshed ([toolshed.dtls.nl](http://toolshed.dtls.nl)) and the [main Galaxy toolshed](http://toolshed.g2.bx.psu.edu/).


<br />

### P9: workflow4metabolomics.org : Galaxy and the metabolomics analysis Universe

**Misharl MONSOOR<sup>1</sup>, Gildas LE CORGUILLE<sup>1</sup>**, Marion LANDI<sup>2</sup>, Mélanie PETERA<sup>2</sup>, Pierre PERICARD<sup>1</sup>, Christophe DUPERIER<sup>2</sup>, Marie TREMBLAY-FRANCO<sup>3</sup>, Jean-François MARTIN<sup>3</sup>, Sophie GOULITQUER<sup>1</sup>, Etienne THEVENOT<sup>4</sup>, Franck GIACOMONI<sup>2</sup>, Christophe CARON<sup>1</sup>

 <sup>1</sup> ABiMS, FR2424 CNRS-UPMC, Station Biologique, Place Georges Teissier, 29680, Roscoff, France<br />
 <sup>2</sup> PFEM, UMR1019 INRA, Centre Clermont-Ferrand-Theix, 63122, Saint Genes Champanelle, France<br />
 <sup>3</sup> PF !MetaToul-AXIOM, UMR 1331 Toxalim INRA, 180 chemin de Tournefeuille, F-31027, Toulouse, France<br />
 <sup>4</sup> DRT/LIST/DM2I/LADIS, Saclay Center CEA, F-91191, Gif-sur-Yvette, France

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P9Monsoor.pdf)**

Facing the emergence of new technologies in the field of metabolomics, treatment solutions adopted so far (XCMS, R scripts, etc.) clearly show their limits. Bottlenecks affect unified access to core applications as well as computing infrastructure and storage. In the context of collaboration between metabolomics (MetaboHUB French infrastructure) and bioinformatics platforms (IFB: Institut Français de Bioinformatique), we have developed a full pipeline using Galaxy framework for data analysis including preprocessing, normalization, quality control, statistical analysis and annotation steps. This modular and extensible workflow is composed with existing components (XCMS and CAMERA functions, etc.) but also a whole suite of complementary statistical tools. This implementation is accessible through a web interface, which guarantees the parameters completeness. The advanced features of Galaxy have made possible the integration of components from different sources and of different types. Finally, an extensible environment is offered to metabolomics communities (platforms, end users, etc.), and enables preconfigured workflows sharing for new users, but also experts in the field.

<br />

### P10: The Munich NGS-FabLab - A glimpse on an IT infrastructure for medical sequence data

**Sebastian Schaaf<sup>1,2</sup>**, Aarif Mohamed Nazeer Batcha<sup>2</sup>, Guokun Zhang<sup>2</sup>, Sandra Fischer<sup>2</sup>, Ashok Varadharajan<sup>2</sup>,   Ulrich Mansmann<sup>1,2</sup>

 <sup>1</sup> [German Cancer Consortium (DKTK)](http://www.dkfz.de/en/dktk/), Heidelberg, Germany<br />
 <sup>2</sup> [Department of Medical Informatics, Biometry and Epidemiology (IBE)](http://www.ibe.med.uni-muenchen.de/), Ludwig Maximilians University (LMU) Munich, Germany<br />

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P10Schaaf.pdf)**

While NGS data becomes increasingly important in medical basic research and molecular diagnostics, dealing with it is a challenge in multiple aspects. Apart from ‘classical’ issues like high demands to hardware, the interconnectivity to resources of biomedical meta information for enriching sequence data is a central task. Users from various fields of study have to be enabled to work with a variety of bioinformatic tools off the command line (which currently do not offer any gold standard analyses), concentrating on contents instead of technical elements. On top, patient-related data is subject to strong restrictions by the German data security law, which also affects IT infrastructures on all levels.
For medical genome informatics in Munich, the NGS-!FabLab (including its admin round-table "NGS-ART") is the central hub for clinicians, researchers and developers, serving as data center, knowledge core, teaching unit and technical template for further instances. During development, the standard Galaxy distribution setup has been equipped with some features that we would like to present with this poster.

Apart from the operating system layer (VMWare, SLES 11), key features are fully automated scripts for proper development cycles and quick setups, distributed computing resources (SGE queue, Convey FPGA hybrid-core computer), highly integrated network structures and access controls. Furthermore, scientific broadness has been enhanced (e.g. via qiime toolbox, pathway analyses, additional and improved tools). Last but not least, archiving and sophisticated analysis are subject to improvements by using Bii as searchable and Galaxy-interconnected database, relying on biomedical ontologies.

<br />

### P11: Oqtans: Online quantitative transcriptome analysis

**Vipin T. Sreedharan<sup>1</sup>**, Yi Zhong and Gunnar Rätsch

 <sup>1</sup> Memorial Sloan Kettering Cancer Center, New York City, NY-10065 USA

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P11Sreedharan.pdf)**

Powerful algorithmic techniques lead to software applications that can answer important biomedical questions that analzye massive and complex genomic data sets. Starting from 2009, oqtans has served the biological research community with state-of-the-art machine learning tools for sequence analysis and high-throughput experimental technologies like RNA sequencing.

We have been leveraging the oqtans codebase to withstand different RNA-seq downstream analysis directions. In particular, it has been utilized recently for translational research to understand the effect of anticancer therapeutics. To measure the translational efficiency change for protein coding genes from multiple samples (treated vs nontreated), we used the sequencing based transcriptome scale ribosome footprinting and RNA-seq data. Our approach allowed us to detect significant changes of the ribosome binding profile of mRNA transcripts between two conditions using a non-parametric testing strategy.

Moving the Galaxy framework from academic to clinical research introduces a myriad of informatics challenges concerning the security of the data sets. In addition to developing  new methods for oqtans components, it is equally important to handle the informatics complexities  that come with scaling oqtans for clinical use. We have deployed our instance under !ModSecurity and encrypted user authentication and subsequent session transmissions using Secure Sockets Layer (SSL). We have applied patches to the core codebase of the Galaxy framework to responsively address vulnerable redirection via URL injection, Reflected and stored Cross-site scripting (XSS) and properly sanitize and encode all potential user input and output. 

Availability 
* oqtans cloudman image - ami-65376a0c
* oqtans public compute server - [galaxy.cbio.mskcc.org](http://galaxy.cbio.mskcc.org)

<br />

### P12: Locally managed Galaxy instances with access to external resources in a supercomputing environment

**Nuria Lozano<sup>1,2</sup>**, Oscar Lozano<sup>2</sup>, Beatriz Jorrin<sup>1</sup>, Juan Imperial<sup>3</sup>, **Vicente Martin<sup>2</sup>**

 <sup>1</sup> [Center for Biotechnology and Genomics of Plants (CBGP)](http://www.cbgp.upm.es/), Technical University of Madrid, Spain<br />
 <sup>2</sup> [Madrid Supercomputing and Visualization Center (CeSViMa)](http://www.cesvima.upm.es/), Technical University of Madrid, Spain<br />
 <sup>3</sup> [Center for Biotechnology and Genomics of Plants (CBGP)](http://www.cbgp.upm.es/), Technical University of Madrid and CSIC, Spain

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P12Lozano.pdf)**

For a research lab, accessing shared resources like those available in supercomputer centers is a welcome addition to Galaxy capabilities. However, privacy or flexibility requirements might impose the need for a locally managed Galaxy installation. In these cases a way to communicate a local instance of Galaxy with the supercomputer would be a solution.

The [Center for Biotechnology and Genomics of Plants (CBGP)](http://www.cbgp.upm.es/) and the [Madrid Supercomputing and Visualization Center (CeSViMa)](http://www.cesvima.upm.es/) are located at Technical University of Madrid (UPM) Montegancedo Campus. CeSViMa manages the large heterogeneous Magerit cluster, with about 4,000 Power7 and 1,000 Intel cores, accessed in batch mode. The resource manager used is SLURM and scheduler is MOAB. Standard job runs in Magerit involve logging into one of the interactive nodes, preparing a job command file and then submitting them to one of the batch queues. The challenge was to be able to seamlessly use this system through a Galaxy front-end. The solution adopted was to set up a Virtual Private Server that runs Galaxy. The Galaxy instance has been installed in a filesystem shared between VPS and Magerit, which is under the control of Magerit GPFS filesystem. 

Galaxy jobs are sent to Magerit through Command Line Interface. A Job Plug-In has been coded that creates the needed Jobfiles transparently submitted to the queuing system.

Using this approach, research group members are fully responsible for deploying and maintaining their own Galaxy Local Instance, while heavy work is offloaded to external computing resources.

<br />

### P13: Argument Parsing Libraries for Automatic Galaxy XML Generation

**[Eric Rasche](/src/EricRasche/index.md)<sup>1</sup>** and Dr. Ryland F. Young<sup>1</sup>

 <sup>1</sup> [Center for Phage Technology](https://cpt.tamu.edu), Texas A&M University, College Station, TX

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P13Rasche.pdf)**

Addition of new software to Galaxy is currently a non-trivial task. Galaxy tools consist of many interdependent parts; packaged executables or scripts, tool data, and tool configuration in the form of XML files. This presents a problem in the form of a large codebase to maintain, especially for groups that regularly produce tools to add to Galaxy. 

With the goals of code deduplication, simplification of deployment workflow, and improved accessibility of the Galaxy platform for new developers, we have developed Python and Perl libraries that function to replace traditional methods of obtaining command line arguments like !GetOpt and argparse. Our libraries are capable of automatically generating valid Galaxy XML tool description files that represent the full set of a tool's command line options. This removes the need to maintain the Python/Perl script and the XML file separately, as the XML files can be regenerated at any time from the Python/Perl script. We believe this will lead to significant reductions in time spent on maintenance of codebases and decreases turn around times for shipping new releases. These libraries will benefit anyone adding new custom tools to Galaxy by providing a convenient method to specify command line parameters, an easy way to access that data in their tools, and automatic Galaxy integration.

<br />

### P14: Advantages and Challenges of Using the Galaxy API within an Integrated Data Analysis and Visualization Platform

**Ilya Sytchev<sup>1</sup>**, Nils Gehlenborg<sup>2</sup>, Shannan Ho Sui<sup>1</sup>, Richard Park<sup>2,3</sup>, Psalm Haseley<sup>2</sup>, Winston Hide<sup>1</sup>, Peter Park<sup>2</sup>

 <sup>1</sup> Center for Stem Cell Bioinformatics, Harvard Stem Cell Institute<br />
 <sup>2</sup> Center for Biomedical Informatics of Harvard Medical School<br />
 <sup>3</sup> Boston University Bioinformatics Program

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P14Sytchev.pdf)**

The Refinery Platform (http://refinery-platform.org) is an integrated web-based data visualization and analysis system powered by an ISA-Tab-compatible data repository. Analyses are implemented as Galaxy workflows. As a result, Refinery makes extensive use of the Galaxy API to automate analyses, including such features as uploading datasets into Galaxy libraries, importing "workflow templates", exporting workflows back into Galaxy after initialization with user-selected inputs, running workflows, and downloading workflow results from Galaxy histories back into Refinery. Some of these features were implemented through custom extensions to the Galaxy API. We directly benefit by using key Galaxy features such as cluster deployment, progress monitoring, a large selection of tools, and the workflow editor.

The recent development of the !BioBlend library (http://bioblend.readthedocs.org) motivated us to replace our existing custom Galaxy API client code with !BioBlend library components. !BioBlend encapsulates the underlying REST API of Galaxy in a way that is more suitable for programming and makes it easier to automate end-to-end large-data analyses. It has a more robust implementation and is maintained by the community to keep up-to-date with the changes in the Galaxy API. Extensions to the !BioBlend library and the Galaxy API to enable the use of Galaxy in fully automated fashion will be contributed back to this community effort. We hope to use this opportunity to gain feedback and suggestions for improvements from the Galaxy developer community.

<br />

### P15: Resistance to Toxic Compounds in Metagenomic Fosmid Library from Mangrove Sediment in São Paulo State, Brazil

**Lucélia Cabral<sup>1</sup>**, Sanderson Tarciso Pereira de Sousa<sup>1</sup>, Gileno Vieira Lacerda Júnior<sup>1</sup>, Júlia Ronzella Ottoni<sup>1</sup>, Daniela Ferreira Domingos<sup>1</sup>, Valéria Maia de Oliveira<sup>1</sup>.

 <sup>1</sup> Divisão de Recursos Microbianos, Research Center for Chemistry, Biology and Agriculture (CPQBA), Campinas University - UNICAMP. Mailbox: 6171. CEP: 13081-970. Campinas. São Paulo. Brazil

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P15Cabral.pdf)**

The mangrove is a typically tropical ecosystem, located between land and sea, and very rich in biodiversity, including aquatic animals, birds, reptiles, mammals and microorganisms. Despite of this, mangroves have been highly exposed to anthropic activities, including oil spills and industrial waste disposals that carry heavy metals. Microorganisms found in the environment can adapt to the presence of pollutants, thus developing survival mechanisms. However, traditional cultivation methods are not efficient for cultivation of most microorganisms present in nature. In this context, the aim of this study was to assess the presence of heavy metal resistance in a fosmid library constructed using metagenomic DNA from sediment samples collected from a mangrove area located in Bertioga, State of São Paulo, Brazil. The fosmid library comprised 13,000 clones and the sampling site was affected by oil spill. Next generation sequencing was performed using the 454 sequencing plataform. Sequences associated with toxic compounds resistance were analyzed using MG-RAST V3.3.8. The annotations used were: Functional abundance, Hierarchical classification, level 1 (Virulence, Disease and Defense), level 2 (Resistance to antibiotics and toxic compounds), Level 3 (Resistance). The most abundant sequences involved in metal resistance in the dataset were cobalt-zinc-cadmium resistance detected by the presence of Cobalt-zinc-cadmium resistance protein and Cobalt-zinc-cadmium resistance protein CzcA (489 and 346 hits, respectively). Sequences related with copper and silver resistance were detected by the presence of cation efflux system protein CusA (330 hits). The functional screening of fosmid library will be performed and the positive clones will be selected for further studies on metal tolerance and degradation.

<br />


### P16: BlockClust: efficient clustering and classification of non-coding RNAs from short read profiles

Pavankumar Videm<sup>1</sup>, Dominic Rose<sup>1,5</sup>, Fabrizio Costa<sup>1</sup>, Rolf Backofen<sup>1-4</sup>

Presented by **Björn Grüning<sup>1</sup>**

 <sup>1</sup> Bioinformatics Group, Department of Computer Science, University of Freiburg, Germany<br />
 <sup>2</sup> Centre for Biological Signalling Studies (BIOSS), University of Freiburg, Germany<br />
 <sup>3</sup> Centre for Biological Systems Analysis (ZBSA), University of Freiburg, Germany<br />
 <sup>4</sup> Centre for Non-coding RNA in Technology and Health, Bagsvaerd, Denmark<br />
 <sup>5</sup> Munich Leukemia Laboratory (MLL), Munich, Germany

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P16Videm.pdf)**

Non-coding RNAs play a vital role in many cellular processes such as RNA splicing, translation, gene regulation. However the vast majority of ncRNAs still have no functional annotation. One prominent approach for putative function assignment is clustering of transcripts according to sequence and secondary structure. However sequence information is changed by post-transcriptional modifications, and secondary structure is only a proxy for the true three dimensional conformation of the RNA polymer. A different type of information that does not suffer from these issues and that can be used for the detection of RNA classes, is the pattern of processing and its traces in small RNA-seq reads data. 

Here we introduce !BlockClust, an efficient approach to detect transcripts with similar processing patterns. We propose a novel way to encode expression profiles in compact discrete structures, which can then be processed using fast graph kernel techniques. We perform both unsupervised clustering and develop family specific discriminative models; finally we show how the proposed approach is both scalable, accurate and robust across different organisms, tissues and cell lines.

!BlockClust was tested and works with small RNA-seq data of eukaryotic organisms. It is the first tool of its kind, which is easily installable and usable on galaxy framework. To run !BlockClust all you need is an alignment file of short reads in Sequence Alignment/Map (SAM/BAM) format. A complete workflow of !BlockClust and its tool dependencies are now available at Galaxy ToolShed.

<br />

### P17: A Galaxy-Based framework for online streaming data analytics in Heart Rate Variability Analysis

<div class='right'>![Calogero Zarbo](/src/Events/GCC2013/Abstracts/Posters/CalogeroZarbo.jpg)</div>

**Calogero Zarbo<sup>1</sup>**, Andrea Bizzego<sup>1,2,3</sup>, Marco Mina<sup>1</sup>, Gianluca Esposito<sup>2,4</sup>, Cesare Furlanello<sup>1</sup>

 <sup>1</sup> FBK - Fondazione Bruno Kessler, Trento, Italy<br />
 <sup>2</sup> University of Trento, Italy <br />
 <sup>3</sup> SKIL Telecom Italia, Trento, Italy<br />
 <sup>4</sup> RIKEN BSI, Wako-Shi, Japan

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P17Zarbo.pdf)**

The emerging applications in physiological data processing, encouraged by the availability of wearable sensors for continuous self-monitoring and quantified self, require new platforms for time series analysis supporting real-time processing and fast prototyping capabilities. We recently proposed Physiolyze, a Galaxy-based web framework to support complex workflows for Heart Rate Variability (HRV) analysis. Here we extend Physiolyze by introducing scalable online processing capabilities. 

The enhanced version still relies on Galaxy as core platform to design and manage the pipelines. In order to incrementally analyze the streams, a set of Python routines based on the Bioblend library works as middleware to trigger the pipelines as new data become available. A web interface based on the Django Python framework allows the user to control the execution of the pipelines, running them on new data streams.

We tested our system on the task of predicting infant behavioral state from HRV patterns. We simulated a real-time scenario of 100 asynchronous data streams from data for 24 infants previously collected with a Light WP Holter ECG recorder (GE Healthcare). The system incrementally extracts 37 HRV indicators from each data stream and predicts the infant state (e.g. wake, sleep, cry) with a Random Forest regression model. The pipeline is modular and fully managed as a Galaxy workflow. 

Our system can easily be adapted to other online streaming analytics applications,  such as for the parallelized analysis of multiple data streams acquired from physiological sensors and wearable devices.

<br />

### P18: Implementing qDNAseq in Galaxy: a whole genome sequencing copy number analysis tool

**Stef van Lieshout<sup>1</sup>**, Ilari Scheinin<sup>1</sup>, Daoud Sie<sup>1</sup>, Remond J.A. Fijneman<sup>1</sup>, Bauke Ylstra<sup>1</sup>

 <sup>1</sup> Department of Pathology, VU University Medical Center, Amsterdam, The Netherlands

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P18vanLieshout.pdf)**

DNA copy number aberrations are a hallmark of cancer and can be quantified by shallow whole-genome sequencing (WGS). A robust method has been developed<sup>1</sup> that detects copy number aberrations by binning and counting sequence reads in non-overlapping windows (usually of 15kb). Then a combined LOESS correction for mappability and GC content is applied followed by excluding genomic regions from both ENCODE project blacklists and a novel blacklist based on sequence depth of 38 individuals from the 1000 Genomes project. 

The procedure is available as a Bioconductor package, QDNAseq<sup>2</sup>. The accompanying Galaxy tool uses the popular BAM format as input and reports results in a clear and concise HTML based view within Galaxy itself. Various output formats can be downloaded, including an R data structure file for downstream analysis and a Zipped archive with all the output together.

Due to precalculated bin annotations, current limitations include the support for one genome build (GRCh37/hg19) and one sequencing type (50bp single read). Additional dedicated tools will handle these challenges and future plans include the addition of different strategies for segmenting and calling the copy number data.

Funding was supported by the Center for Translational Molecular Medicine, Translational research IT project (CTMM TraIT).

 <sup>1</sup> llari Scheinin, Daoud Sie *et al.* DNA copy number analysis of fresh and formalin-fixed specimens by whole-genome sequencing: Improved correction of systematic biases and exclusion of problematic regions, (submitted).<br />
 <sup>2</sup> http://www.bioconductor.org/packages/release/bioc/html/QDNAseq.html

<br />

### P19: Integrating Integrated Genome Browser with Galaxy

**Ann Loraine<sup>1</sup>**, David Norris<sup>1</sup>, Kyle Suttlemyre<sup>1</sup>, Tarun Kanaparthi<sup>1</sup>

 <sup>1</sup> University of North Carolina - Charlotte

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P19Loraine.pdf)**;

Integrated Genome Browser is a fast, flexible and free Java-based desktop software tool that enables interactive exploration of genomic data sets. To accommodate large data sets, IGB featured a simple ReST-style interface that triggers incremental loading of data from local files or URLs. We used this ReST-style interface and the Galaxy viewers API to enable IGB visualization for Galaxy users. When Galaxy users create compatible data files, they now see a link labeled “View in IGB” upon clicking data file links in their Galaxy History. Clicking this link triggers delivery of data to IGB for display. This is a simple interaction from the user’s perspective, but from an engineering point of view, it highlights a key extension point for Galaxy that enables integration with IGB or other visualization tools. By enabling access to data sets in a user-friendly, web-based interface, Galaxy offers many possibilities to enhance user interactions for data analysis and data sharing. 

<br />

### P20: An approach for detecting structural variations from NGS paired end reads using Split Reads, Discordant Read Pairs and Local Alignment

**Michael Ta<sup>1</sup>**, Philip D. Cotter<sup>1</sup>, Mathew W. Moore<sup>1</sup> 

 <sup>1</sup> Bioinformatics Department, [ResearchDx](http://www.researchdx.com), Irvine CA, USA

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P20Ta.pdf)**

A major challenge in Next Generation Sequencing is the development of efficient algorithms to detect structural variants present in the genome. Several different approaches for the detection of structural variants have been identified. [Breakdancer](http://breakdancer.sourceforge.net/) searches for clusters of anomalous read pairs for sites to investigate. Similarly, another analysis tool, [SoftSearch](https://code.google.com/p/softsearch/), uses the soft clipped read data from the aligner to determine sites of interest and heuristically report potential structural variants around them. Our algorithm, !HardSearch, expands on the approach of !SoftSearch to further identify the exact break points that support chromosomal structural variations. Paired end reads from DNA-seq with an unmapped mate are collected around each potential fusion site; the unmapped mates are realigned to the reference genome using a local aligner. The segment of each read that aligns with the highest alignment score without gaps is subtracted from the original and the remainder is realigned allowing for the identification of the breakpoint and breakpoint partners.

<br />

### P21: Synapse: Software infrastructure for collaborative reproducible research

**J Christopher Bare<sup>1</sup>**, Synapse Platform Team<sup>1</sup>, Michael R Kellen<sup>1</sup>, Stephen H Friend<sup>1</sup>

 <sup>1</sup> [Sage Bionetworks](http://sagebase.org/) 

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P21Bare.pdf)**

Synapse (http://www.synapse.org) is a free and open source informatics platform for data-driven collaborative research. Built from the ground up for a rich data sharing experience, Synapse provides tools for versioning, annotating and citing data combined with provenance tracking and fine grained access control. Synapse operates under a complete governance process developed, approved and monitored by an independent ethics advisory board and the Western Institutional Review Board.

Synapse is designed to support Sage Bionetworks' mission to promote a scientific culture founded on broad and open collaboration. Sage Bionetworks develops and operates Synapse as a public resource for the scientific community. For example, the Cancer Genome Atlas pan-cancer group published a total of 18 papers in Nature Publishing Group journals (http://www.nature.com/tcga/), using Synapse as a single point for sharing data, results and methods among 250 collaborators spread across 30 institutions. In partnership with DREAM, Synapse hosts predictive modeling challenges on a diverse array of topics including disease prognosis, drug response, toxicology and genetic variant analysis.

Galaxy and Synapse share many goals including transparency and reproducibility. Both enable sharing and reuse of research code and are cloud-native applications with similar models of computation including provenance, workflows, data sets and pages.

Bridging these two complementary services would benefit users of both. Synapse could act as a data source for Galaxy workflows and/or as a shared workspace for results and intermediate products. Other options to explore include exchanging workflows, provenance, and narrative pages. Integration between Synapse and Galaxy could enrich the ways in which data and analysis code can be presented, shared and reused.

<br />

### P22: Integration of Galaxy with IRIDA, a Genomic Epidemiology Platform

**Aaron Petkau<sup>1</sup>**, Franklin Bristow<sup>1</sup>, Thomas Matthews<sup>1</sup>, Josh Adam<sup>1</sup>, Damion Dooley<sup>2</sup>, Emma Griffiths<sup>4</sup>, Geoff Winsor<sup>4</sup>, Matthew Laird<sup>4</sup>, Melanie Courtot<sup>2,4</sup>, William Hsiao<sup>2,3</sup>, Gary Van Domselaar<sup>1</sup>, Fiona Brinkman<sup>4</sup>

 <sup>1</sup> National Microbiology Laboratory, Public Health Agency of Canada, Canada<br />
 <sup>2</sup> BC Public Health Microbiology and Reference Laboratory, Canada<br />
 <sup>3</sup> University of British Columbia, Canada<br />
 <sup>4</sup> Simon Fraser University, Canada

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P22Petkau.pdf)**

The continuing decrease in the cost of genomic sequencing and the development of new data analysis methods has led to the increasing usage of whole genome sequencing as an epidemiological tool.  Whole genome sequencing can provide a high-resolution snapshot of the relationship among pathogens and lead to a greater ability to identify and track infectious disease outbreaks.  Initiatives, such as the Global Microbial Identifier, have already started the discussion on developing a system and standards for genomic epidemiology.  In our project, IRIDA (Integrated Rapid Infectious Disease Analysis), we propose a platform for genomic epidemiology which provides a secure storage of whole genome sequence data, epidemiological metadata, data analysis pipelines, visualization of results, a RESTful API, and a federated data sharing model.  Galaxy has already proven to be a useful application for integration of common bioinformatics tools and data, execution of data analysis pipelines, collection of results, and data sharing.  In addition, Galaxy provides a RESTful API for programmatic access to running instances of Galaxy.  We intend to leverage Galaxy as much as possible by interacting with locally installed Galaxy instances via the API to execute pre-defined data analysis pipelines, store data results and Galaxy histories, and manage installed bioinformatics tools.  Direct export of whole genome sequencing data to instances of Galaxy will be provided for more complicated analysis.  IRIDA will be released as free and open-source software and make use of common data standards to facilitate sharing with other genomic epidemiology platforms.  More information will be made available at http://irida.ca.

<br />

### P23: Galaxy on the GenomeCloud : Yet another on-demand Galaxy cloud, but only powered by Apache CloudStack

**[Youngki Kim](https://www.linkedin.com/in/youngkikim)<sup>1</sup>**, CB Hong<sup>1</sup>, Kjoong Kim<sup>1</sup>, Daechul Choi<sup>1</sup>

 <sup>1</sup> [GenomeCloud](https://genome-cloud.com/), Seoul, Korea

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P23Kim.pdf)**

Bioinformatics and genome data analysis in South Korea is at its early stage but getting busier.  To keep pace with this trend of research, [GenomeCloud](https://genome-cloud.com/) was created at the end of 2012.  !GenomeCloud is an integrated platform for analysing, interpreting and storing genome data, based on [KT's cloud computing infrastructure](http://www.kt.com/eng/biz/gs_02_03.jsp) which uses [Apache CloudStack](http://cloudstack.apache.org/) software.  !GenomeCloud consists of g-Analysis (automated genome analysis pipelines at your fingertips), g-Cluster (easy-of-use and cost-effective genome research infrastructure) and g-Storage (a simple way to store and share genome-specific data).

Because of flexible tool integration architecture and seamless workflow creation functionality, Galaxy was selected to achieve multi purpose goals such as agile pipeline development and bioinformatics education support.  To provide on-demand and Apache !CloudStack based Galaxy cluster, we have automated virtual machine creation, clustering and various software setup including Galaxy.

Furthermore, seamless integration with !GenomeCloud helps researchers not only create and manage Galaxy through a convenient web interface but also fully utilizes genome data in g-Storage.  g-Storage is powered by [OpenStack](http://www.openstack.org/) [Swift](https://wiki.openstack.org/wiki/Swift) and specially designed genome file transfer protocol.

Galaxy on the !GenomeCloud uses Grid Engine as a Cloud HPC Solutions, [Ganglia](http://ganglia.sourceforge.net/) as a  distributed monitoring system and LVM over NFS as a large volume shared storage, all of which are setup automatically upon request.
This talk will be about our experiences while integrating Galaxy with !GenomeCloud and use cases of Galaxy such as scalable bioinformatics education system and request fulfillment of RNA-seq analysis.

<br />


=== P24: GenomeSpace: An Environment for Frictionless Bioinformatics	===

**Michael Reich<sup>1</sup>**, John Liefeld<sup>1</sup>, Marco Ocana<sup>1</sup>, Donkeung Jang<sup>1</sup>, James Robinson<sup>1</sup>, Peter Carr<sup>1</sup>, Barbara Hill<sup>1</sup>, Thorin Tabor<sup>1</sup>, Helga Thorvaldsdottir<sup>1</sup>, Aviv Regev<sup>1</sup>, Jill P. Mesirov<sup>1</sup> 

 <sup>1</sup> Broad Institute, Cambridge, MA 

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P24Reich.pdf)**

Over the past several years, initiatives such as The Cancer Genome Atlas and 1000 Genomes Project have produced an explosion of genomic data. These efforts offer a new era of potential for the understanding of basic mechanisms of disease and identification of novel treatments. Comprehensive analysis of these datasets requires coordinated use of Web-based applications, data repositories, and desktop analysis tools. However, the effort required to transfer data between tools, convert between formats, and manage results often prevents researchers from utilizing the wealth of methods available. Many "bench to bedside" discoveries are possible with combinations of existing tools, but the necessary transitions between them puts them out of the reach of most researchers.

[GenomeSpace](http://www.genomespace.org) is an environment that brings together diverse computational tools, enabling non-programmer scientists to easily combine their capabilities. It provides a space to create, manipulate and share a growing collection of genomic analysis tools. [GenomeSpace](http://www.genomespace.org) features support for cloud-based data storage and analysis, automatic conversion of data formats, and ease of connecting new tools to the environment via a RESTful API. 

The Galaxy main server is one of the first GenomeSpace-enabled tools, as well as the Galaxy-based Cistrome epigenetic analysis platform. These and the other GenomeSpace-enabled tools, including Cytoscape, !GenePattern, Genomica, IGV, !ArrayExpress, Genomica, and others, form a comprehensive environment for analysis of genomic data, with new resources being released regularly. We show how researchers can use GenomeSpace to combine the capabilities of these tools and how developers can add their tools to the GenomeSpace environment.

<br />

### P25: Less talking, more doing: crowd-sourcing the integration of Galaxy with a high-performance computing cluster

[Dirk Colbry](http://icer.msu.edu/person/dirk-colbry)<sup>1</sup>, **[Michael R. Crusoe](http://orcid.org/0000-0002-2961-9670)<sup>2</sup>**, [Andy Keen](http://icer.msu.edu/person/andrew-keen)<sup>1</sup>, [Greg Mason](http://icer.msu.edu/person/greg-mason)<sup>1</sup>, [Jason Muffett](http://icer.msu.edu/person/jason-muffett)<sup>1</sup>, [Matthew Scholz](http://icer.msu.edu/person/matthew-scholz)<sup>1</sup>, [Tracy K. Teal](http://idyll.org/~tracyt/)<sup>2</sup> 

 <sup>1</sup> Michigan State University, Institute for Cyber-Enabled Research<br />
 <sup>2</sup> Michigan State University, Department of Microbiology and Molecular Genetics 

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P25Crusoe.pdf)**

On March 5th, 2014 a team of system administrators and bioinformaticians conducted a hack-a-thon to integrate Galaxy on top of the high-performance computing cluster at Michigan State University complete with single-sign-on and the ability to run jobs as the submitting user. They elicited and received strong community support during the hack-a-thon and engaged Galaxy developers and users through IRC and Twitter. In eight hours this hack-a-thon was able to quickly navigate the various integration hurdles via real time assistance from the Galaxy community. The entire deployment was done as openly as possible with coordination of the various efforts via a separate public chat channel. While there were a couple person-days of prep and follow up, the scheduling of a single day to do the bulk of the installation proved to be critical in getting the job done and was far more effective than the many hours talking about the idea of deploying Galaxy prior. The format allowed for rapid progress as communication time was reduced and developers could modify or add components, receive prompt feedback and continue to build on the growing infrastructure.  We advocate a similar recipe of using virtual machines, the Puppet configuration management system, and agile development enabled by the built-in implementations of various components of Galaxy to enable forward progress.

<br />

### P26: Galaxy Training Network

**[Dave Clements](/src/DaveClements/index.md)<sup>1,2</sup>**, [Vicky Schneider](http://www.tgac.ac.uk/training-outreach/vicky-schneider/)<sup>3</sup>, [Nikhil Joshi](http://bioinformatics.ucdavis.edu/contact-us/)<sup>4</sup>, [Joseph Fass](http://bioinformatics.ucdavis.edu/contact-us/)<sup>4</sup>, [Monica Britton](http://bioinformatics.ucdavis.edu/contact-us/)<sup>4</sup>, [Andrew Lonie](http://www.msi.unimelb.edu.au/people/andrew-lonie/)<sup>5,6</sup>, [Simon Gladman](http://www.vlsci.org.au/researcher/sgladman)<sup>5,7</sup>, [Mark Crowe](http://www.qfab.org/mark-crowe/)<sup>8</sup>

 <sup>1</sup> [Galaxy Project](http://galaxyproject.org)<br />
 <sup>2</sup> [Johns Hopkins University](http://www.jhu.edu), Baltimore, Maryland, United States<br />
 <sup>3</sup> [The Genome Analysis Centre (TGAC)](http://tgac.ac.uk), Norwich, United Kingdom<br />
 <sup>4</sup> [Bioinformatics Core Facility](http://bioinformatics.ucdavis.edu/), University of California, Davis, United States<br /> 
 <sup>5</sup> [Life Sciences Computation Centre](http://www.vlsci.org.au/page/lscc), Melbourne, Australia<br />
 <sup>6</sup> [University of Melbourne](http://www.unimelb.edu.au/), Melbourne, Australia<br />
 <sup>7</sup> [Monash University](http://www.monash.edu.au/), Australia
 <sup>8</sup> [QFAB](http://www.qfab.org/), Brisbane, Queensland, Australia

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P26Clements.pdf)**

Scalability is a recurring challenge in all aspects of high-throughput biology, including training.  There is far more demand for training than can be met by just in-person training by the core Galaxy Team.  

This poster will highlight training resources that are available for teaching bioinformatics in Galaxy and for teaching using and administering Galaxy itself.  This includes information about the new Galaxy Training Network.  The Galaxy Training Network unifies core project and community training efforts under one umbrella so that existing training resources become more easily available, and it makes it easier for new arrivals to get up to speed with training in their locations and communities.  We will also highlight directories of tutorials/worked exercises, including sample data, slide sets, videos, and computational resources such as shared virtual machine images and Amazon Web Service Machine Images (AMI’s).

<br />


### P27: Integrating new visualization tool in Galaxy

Alexan ANDRIEUX<sup>1</sup>, Pierre PETERLONGO<sup>1</sup>, **Yvan LE BRAS<sup>2</sup>**, Cyril MONJEAUD<sup>2</sup>, Charles DELTEL<sup>3</sup>

 <sup>1</sup> Genscale, INRIA, Campus de Beaulieu, 35042, Rennes Cedex, France<br />
 <sup>2</sup> !GenOuest Core Facility, UMR6074 IRISA CNRS/INRIA/Université de Rennes1, Campus de Beaulieu, 35042, Rennes Cedex, France<br />
 <sup>3</sup> SED, INRIA, Campus de Beaulieu, 35042, Rennes Cedex, France

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P27leBras.pdf)**

Galaxy supports adding tools, constructing workflows and analyzing diverse and large datasets. Galaxy offers some visualization tools, like Trackster and Phyloviz, but users can have difficulties finding the right visualizer to see the output of their own tools. To avoid the use of external tools, users may also want to integrate their own visualization tools.

In earlier versions of Galaxy, implementation of a new visualizer was complex because it required 1) to put each file type (!JavaScript, Css, Mako, Python …) of the new visualizer in the right place in the directories tree and also 2) edit several Galaxy source files. Recent Galaxy versions give the possibility to add visualizations more easily: You only have to give to the new visualizer the right structure and paste it. It’s a good beginning even if some tasks are still difficult as for adding the Galaxy save function to the new visualizer.

The new visualization framework was tested to facilitate Mapsembler 2 outputs interpretation. This tool extends references sequences from each side with one or more sets of reads. Sometimes, several extensions are possible and Mapsembler 2, constructs a graph with each possible of extension. To view the output graph we have developed a graph viewer in !JavaScript and jQuery. At the moment, this visualizer is compatible only with the Mapsembler 2 outputs, but further works will make it compatible with semantic web or Systems biology tools to visualize, for example, rdf files or biological networks. Finally, this work represents an important step towards visualization of data in Life Sciences Virtual Research Environment (introduce by the poster n°4).

<br />

### P28: Integrating GALAXY workflows in a metadata management environment

Francois MOREEWS<sup>1</sup>, **Yvan LE BRAS<sup>2</sup>**, Olivier Dameron<sup>3</sup>, Cyril MONJEAUD<sup>2</sup> and Olivier COLLIN<sup>2</sup>

 <sup>1</sup> Genscale team, Irisa / INRA, Campus de Beaulieu, 35042 Rennes Cedex, France<br />
 <sup>2</sup> !GenOuest Core Facility, UMR6074 IRISA CNRS/INRIA/Université de Rennes1, Campus de Beaulieu, 35042, Rennes Cedex, France<br />
 <sup>3</sup> Dyliss team, Irisa / Inria Rennes-Bretagne Atlantique, Campus de Beaulieu, 35042 Rennes Cedex, France"

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P28leBras.pdf)**

The Galaxy platform offers repositories of user data and related analysis processes (data histories and workflows).  These repertories enable traceability and reproducibility of the processes within the platform. At a larger scale, to answer questions like "What protocol was used to analyze my data?" or "how were these data generated?", we could consider any protocol as a metadata set that annotates inputs and results.

We present a preliminary approach for integrating the GALAXY workflows in an extensible meta-data management environment.

Using ISA-tools, we have developed a formalism to describe an abstraction of data processing workflows. This specification, in the ISA-TAB format is named ISA-DATAFLOW.

A conversion tool extracts a structured dataflow representation in GRAPHML, a generic XML graph format, from GALAXY workflows. This intermediary format can then be normalized using controlled vocabularies and converted into ISA-TAB following our ISA-DATAFLOW specification.

We plan to integrate this work to propose advanced research functionalities within a virtual research environment (VRE) deployed on a geographically and thematically distributed infrastructure already using multiple Galaxy instances. Future developments will concern workflow meta-analysis and workflow composition assistance.

<br />

### P29: Genocloud : the GenOuest private cloud for Galaxy

Cyril Monjeaud<sup>1</sup>, Olivier Sallou<sup>1</sup> and Olivier Collin<sup>1</sup>

Presented by **Yvan Le Bras<sup>1</sup>**

 <sup>1</sup> [GenOuest Core Facility](http://www.genouest.org/), UMR6074 IRISA CNRS/INRIA/Université de Rennes1, Campus de Beaulieu, 35042, Rennes Cedex, France

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P29leBras.pdf)**

The [GenOuest bioinformatics core facility](http://www.genouest.org/) has recently deployed a private cloud named Genocloud. In addition to providing images for different biology domains (Bio-imaging, Next Generation Sequencing, collaboration, etc.), Genocloud offers solutions to deploy a Galaxy instance.

There are two ways you can set up your own Galaxy server. The first one is through the provision of a template inside the Genocloud interface. The second solution is through a Galaxy cookbook created for CHEF, an infrastructure for automatic applications deployment. This cookbook can be directly installed inside any virtual machine already running on Genocloud via our Xgrid solution.

Xgrid is an internal open-source web application integrated inside our images. This application allows users to load cookbooks from a CHEF server via web interface (click operations) and install it dynamically on the virtual machine. Furthermore, Xgrid can launch EC2 command-lines and configure an entire Sun Grid Engine (SGE) cluster. We also provide an extra template to deploy a Galaxy server already configured for SGE cluster submissions.

<br />

### P30: Integrating Galaxy with UCSC Cancer Genomics

**Melissa Cline<sup>1</sup>**, Teresa Swatloski<sup>1</sup>, Brian Craft<sup>1</sup>, Mary Goldman<sup>1</sup>, David Haussler<sup>1</sup>, Jingchun Zhu<sup>1</sup>

 <sup>1</sup> University of California Santa Cruz

**[Poster](ATTACHMENT_URLDocuments/Posters/GCC2014/P30Cline.pdf)**

The UCSC Cancer Genomics Browser is a powerful tool for visual analysis of published cancer genomics datasets.  Its combined visualization of genomic and clinical data allows users to dynamically sort and cluster cohorts of genomic data by clinical features, cancer subtypes and genomic signatures.  It displays data from a large library of over 580 cancer genomics datasets, including TCGA, LINCS and CCLE.  The Cancer Browser is currently available in the Galaxy test toolshed, providing direct export into Galaxy datasets, and will soon be available in the main toolshed.

Building on the success of the Cancer Browser, we are now developing the Xena platform to enable users to host, visualize, analyze and share their own data from within a secure virtual machine (XenaVM).  Users will be able to visualize their datasets separately under the Xena Browser, or integrate their data with published datasets to form larger “virtual cohorts”.  Data will be hosted by a network of Xena servers, with the UCSC server hosting the UCSC cancer genomics library.  To provide greater analysis capabilities, Xena will be tightly integrated with Galaxy.  Users will be able to export data from Xena into Galaxy datasets, analyze those datasets under Galaxy, and import the analysis results directly into Xena, facilitating cycles of analysis and visualization.
