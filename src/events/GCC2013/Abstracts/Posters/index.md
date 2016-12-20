---
autotoc: true
title: Poster Abstracts
---
{{> Events/GCC2013/Header }}



{{> Events/GCC2013/LinkBox }}

## Abstracts



**Odd numbered abstracts will be presented on Monday, 1 July from 14:55 to 16:10.

Even numbered abstract will be presented on Tuesday, 2 July from 14:35 to 15:50.**

### P1: Towards Large-Scale Language Analysis in the Cloud

**Emanuele Lapponi**<sup>1</sup>, **Erik Velldal**<sup>1</sup>, Nikolay Vasov<sup>2</sup>, Stephan Oepen<sup>2</sup>

 <sup>1</sup> University of Oslo<br />
 <sup>2</sup> USIT

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/LanguageAnalysisLapponi.pdf)*

The Language Analysis Portal (LAP) is a Galaxy-based system that is currently being developed in the context of CLARINO, the Norwegian chapter of the pan-European CLARIN initiative. CLARIN aims at establishing a shared research infrastructure for language technology (LT) that ensures easy access to persistent and interoperable resources and services. Although LAP aims to reach out to a diverse set of user groups, it particularly will facilitate use of language analysis in the social sciences, humanities, and other fields without strong computational traditions. While the development of the portal is still in its early stages, this poster presentation documents ongoing work towards an already operable pilot, providing an overview of the challenges of adapting Galaxy to another domain in terms of UI, interchange formats, tool-adaptation and scalability. The work is carried out at the University of Oslo (UiO) as a joint effort by the Language Technology Group (LTG) and the Research Computing group at the University Center for Information Technology (USIT).

<br />

### P2: Cloud-based Image Analysis and Processing Toolbox

**Tomasz Bednarz**, Yulia Arzhaeva, Piotr Szul, Alex Khassapov, Neil Burdett, Dadong Wang, Shiping Chen, Darren Thompson, Tim Gureyev, John Taylor 

 [Commonwealth Scientific and Industrial Research Organisation (CSIRO), Australia](http://www.csiro.au)

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/CloudImageToolboxBednarz.pdf)*

Cloud-based Image Analysis and Processing Toolbox project runs on the [Australian National eResearch Collaboration Tools and Resources (NeCTAR)](http://www.nectar.org.au) cloud infrastructure and allows access to biomedical image processing and analysis services to researchers via remotely accessible user interfaces. The toolbox is based on software packages and libraries developed over the last 10-15 years by [CSIRO](http://www.csiro.au) scientists and software engineers and include functionality: (a) automating process of quantifying cell features in microscopy images; (b) a 3D medical imaging analysis and visualisation platform popular with researchers and medical specialists working with MRI, PET and (c) advanced X-ray image analysis and Computed Tomography. The Galaxy is used a glue to link various imaging functions into fully functional Virtual Laboratory. By providing user-friendly access to cloud computing resources and new workflow-based interfaces, our solution will enable the researchers to carry out various challenging image analysis and reconstruction tasks that are currently impossible or impractical due to the limitations of the existing interfaces. Several case studies will be presented at the conference

Links:
* [Blog](http://cloudimaging.blogspot.com.au) 
* [Galaxy in cellular image analysis](https://www.youtube.com/watch?v=CZMDyqQwJLY) 
* [YouTube channel](https://www.youtube.com/user/CloudImaging) 
* [NeCTAR connecting, sharing, collaborating](http://www.nectar.org.au)

<br />

### P3: BioBlend - automating bioinformatics with Galaxy and CloudMan

**Clare Sloggett**<sup>1</sup>, [Nuwan Goonasekera](http://versi.edu.au/about-us/versi-team#Nuwan)<sup>1,2,4</sup>, [Enis Afgan](/src/EnisAfgan/index.md)<sup>1,3,4</sup>

 <sup>1</sup> Victorian Life Sciences Computation Initiative (VLSCI), University of Melbourne<br />
 <sup>2</sup> Victorian eResearch Strategic Initiative (VeRSI), University of Melbourne, Melbourne, Australia<br />
 <sup>3</sup> Center for Informatics and Computing (CIR), Ruđer Bošković Institute (RBI)<br />
 <sup>4</sup> Galaxy Project (http://galaxyproject.org)

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/BioBlendSloggett.pdf)*

The Galaxy API allows users and administrators to access a rapidly expanding set of Galaxy functionality via REST commands. CloudMan is a cloud-based job runtime platform, which allows researchers to easily provision scalable 'virtual clusters' to run Galaxy and other applications in a cloud computing environment, and which provides its own REST-based API. 

As a part of Australia’s Genomics Virtual Laboratory project, we created the [BioBlend](http://bioblend.readthedocs.org/) library, a unified API in a high-level language (python) that wraps the functionality of both Galaxy and CloudMan APIs. BioBlend encapsulates the underlying REST API of the two applications in a format that is more suitable for programming and thus makes it easier for bioinformaticians to automate end-to-end large-data analysis, from scratch. Because the end result of a data analysis is still available in the Galaxy environment, the resulting pipeline is highly accessible to collaborators. In combination with CloudMan, it is possible to both provision the required infrastructure, and automate complex analyses over large data sets on an as needed basis.

The library is easily installable via [PyPi](https://pypi.python.org/pypi) and comes with detailed documentation and example scripts. BioBlend is released under the MIT license. Documentation and installation instructions can be found at http://bioblend.readthedocs.org/, and the source code is available at https://github.com/afgane/bioblend/.


<br />

### P4: Comparing R-based methods and Cuffdiff2 for analysis of RNA-seq data in Galaxy

**René Böttcher**<sup>1,4</sup>, **Saskia Hiltemann**<sup>1,2</sup>, Bram Stoker<sup>2</sup>, A. Marije Hoogland<sup>3</sup>, Leon Mei<sup>5</sup>,
G.J.L.H. van Leenders<sup>3</sup>, Peter Beyerlein <sup>4</sup>, Andrew Stubbs<sup>2</sup>, Guido Jenster<sup>1</sup>

 <sup>1</sup> Dept. of Urology, Josephine Nefkens Institute, Erasmus MC, Rotterdam, The Netherlands<br />
 <sup>2</sup> Dept. of Bioinformatics, Josephine Nefkens Institute, Erasmus MC, Rotterdam, The Netherlands<br />
 <sup>3</sup> Dept. of Pathology, Josephine Nefkens Institute, Erasmus MC, Rotterdam, The Netherlands<br />
 <sup>4</sup> Dept. of Bioinformatics, Technical University of Applied Sciences Wildau, Wildau, Germany<br />
 <sup>5</sup> Bioassist, Netherlands Bioinformatics Center (NBIC), Nijmegen, The Netherlands

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/RNASeqDiffBottcher.pdf)*

Background:

Differential expression (DE) and differential exon usage (DEU) in RNA-seq data are commonly investigated by Cufflinks and Cuffdiff at the moment. However, previous work demonstrated that Cuffdiff, prior to version 2, does not capture the biological variation between groups containing many replicates. Therefore, we set out to implement two R-based methods (edgeR and DEXSeq) in Galaxy and to compare their performance with Cuffdiff2.

Methods:

We implemented two workflows based on HTSeq-count (v. 0.5.4p1) as well as edgeR (v. 3.0.4) and DEXSeq (v. 1.4) in our Galaxy environment. After conducting a DE and DEU analysis using default settings for a prostate cancer data sets with 9 samples per condition, we evaluated the results of both R-based methods and Cuffdiff (v. 2.0.2).
Results:
We observed that Cuffdiff version 2.0.2 shows a distribution of p-values, which depends on the number of samples per condition. When using 9 biological replicates per condition, Cuffdiff does not report any significant genes. In contrast, edgeR and DEXSeq both are able to model increased variance and provide significant results (e.g. 230 genes DE, FDR < 0.05 and 8 genes with DEU, adj. P-value < 0.1) that can be validated subsequently.

Conclusion:

Our Galaxy implementations of edgeR and DEXSeq workflows provide an accurate high-throughput analysis and performance comparisons of different RNA-seq tools in Galaxy. Since Cuffdiff is under active development, we expect an improved release targeting the issues described above. Until then, we recommend to adapt the RNA-seq workflow depending on the number of biological replicates per group.

<br />

### P5: Comparison of short read aligners with Galaxy

**Subazini Thankaswamy Kosalai**, Jens Nielsen, Intawat Nookaew

 Systems and Synthetic Biology, Department of Chemical and Biological Engineering, Chalmers University of Technology, Gothenburg, Sweden 41296.

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/AlignerComparisonKosalai.pdf)*

The emergence of Next generation sequencing (NGS) technology ensued production of large-scale data in fast pace demanding increased storage resource and computational power. The essential step in NGS analysis is read alignment or mapping with reference genome to determine the desired DNA sequence. The genetic difference between strains attained on mapping can also be used in variant detection and annotation. It is difficult to determine the position of short reads by mapping, mostly in the case of repetitive regions. Many tools developed for short read sequence alignment are available public and mostly command-line. On the other hand end-users find it more convenient when the tools are with user-interface. Galaxy is an integrated frame, which can be used in resolving computational issues, by allowing the tools to be deployed in cloud called Galaxy CloudMan. It also allows user to create a well-defined user-interface for command-line tools in XML. In this work, we have deployed different mappers or aligners based on different algorithms in Galaxy CloudMan and compared them for sensitivity and speed with allowed mismatch. XML Wrapper files are generated to create user-defined interface for the command-line mappers and deployed in galaxy so that it can be utilized for constructing workflows. The challenge is to select a mapping tool with fundamental priorities of speed, sensitivity and minimal memory usage. We made criteria for setting different parameters suitable for researchers’ project and evaluated the aligners using mapping speed, RAM occupancy, sensitivity and accuracy using short read simulators and some real data.

<br />

### P6: GigaGalaxy: A GigaSolution for reproducible and sustainable genomic data publication and analysis

**Scott Edmunds**<sup>1,2</sup>, Peter Li<sup>1,2</sup>, Huayan Gao<sup>3,4</sup>, Ruibang Luo<sup>2</sup>, Dennis Chan<sup>1</sup>, Alex Wong<sup>1</sup>, Zhang Yong<sup>2</sup>, Tin-Lap Lee<sup>3,4</sup>

 <sup>1</sup> BGI-Hong Kong Ltd., 16 Dai Fu Street, Tai Po Industrial Estate, NT, Hong Kong SAR, China.<br />
 <sup>2</sup> BGI-Shenzhen, Beishan Industrial Zone, Yantian District, Shenzhen, China.<br />
 <sup>3</sup> School of Biomedical Sciences, The Chinese University of Hong Kong, Shatin, Hong Kong SAR, China.<br />
 <sup>4</sup> CUHK-BGI Innovation Institute of Trans-omics, The Chinese University of Hong Kong, Shatin, Hong Kong SAR, China.

[DOI: 10.6084/m9.figshare.713512](http://dx.doi.org/10.6084/m9.figshare.713512), *[PDF](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/GigaGalaxyEdmunds.pdf), [PPTX](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/GigaGalaxyEdmunds.pptx)*

Today's next generation sequencing (NGS) experiments generate substantially more data and are more broadly applicable to previous high-throughput genomic assays. Despite the plummeting costs of sequencing, downstream data processing and analysis create financial and bioinformatics challenges for many biomedical scientists. It is therefore important to make NGS data interpretation as accessible as data generation. [GigaGalaxy (http://gigagalaxy.net/)](http://gigagalaxy.net/) represents a NGS data interpretation solution towards the big sequencing data challenge. We have ported the popular Short Oligonucleotide Analysis Package (http://soap.genomics.org.cn) as well as supporting tools such as Contiguator2 (http://contiguator.sourceforge.net) into the Galaxy framework, to provide seamless NGS mapping, de novo assembly, NGS data format conversion and sequence alignment visualization. Our vision is to create an open publication, review and analysis environment by integrating !GigaGalaxy into the publication platform at !GigaScience and its !GigaDB database that links to more than 17 Tetrabytes of genomic data. We have begun this effort by re-implementing the data procedures described by [Luo et al., (!GigaScience 1: 18, 2012)](http://www.gigasciencejournal.com/content/1/1/18) as Galaxy workflows so that they can be shared in a manner which can be visualized and executed in GigaGalaxy. We hope to revolutionize the publication model with the aim of executable publications, where data analyses can be reproduced and reused. 

<br />

### P7: Engaging Galaxy in Microbiology

<div class='right'><a href='http://www.crs4.it/crs4/peopledetails/people/195/Gianmauro_Cuccuru'><img src="/src/events/GCC2012/Abstracts/Cuccuru.jpg" alt="" width="100" /></a></div>

Massimiliano Orsini, **[Gianmauro Cuccuru](http://www.crs4.it/crs4/peopledetails/people/195/Gianmauro_Cuccuru)**, [Nicola Soranzo](http://www.crs4.it/web/bioinformatics/peopledetails/people/198/Nicola_Soranzo), Andrea Pinna, Andrea Sbardellati, Antonella Travaglione, Paolo Uva, Gianluigi Zanetti, Giorgio Fotia

 [CRS4](http://www.crs4.it/), Pula, Sardegna, Italy

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/MicrobiologyCuuccuru.pdf)*

Next Generation Sequencing is today widely applied in both microbiology and metagenomics areas for research and diagnostic applications. The setup of the complete workflow to perform downstream analysis requires a significant effort to integrate software and data for each of the post sequencing steps. While many of the necessary tools are already available in Galaxy, there is currently a lack of a specialized framework in this area. To fill the gap, we developed [Orione](http://orione.crs4.it/), a Galaxy based web server for microbiology. Orione include all post mapping or assembling steps from scaffolding to complete annotation pipelines, which have been grouped into appropriate sections to facilitate navigation. We started on selecting the relevant software in the microbiology area, developing then all the necessary tools to integrate them into the Galaxy ecosystem.  In addition to that, we made available several specialized workflows covering major applications such as bacterial resequencing, de novo assembly, scaffolding, bacterial RNA-seq, gene annotation and metagenomics. Orione provides additional capabilities to perform integrative,  reproducible and transparent bioinformatic data analysis in microbiology thus expanding the constellation of specialized Galaxy based web servers as Nebula, Cistrome and several others. Orione is available at http://orione.crs4.it. 

<br />

### P8: Microbiome profiling on a Galaxy-based framework for Microbiology

<div class='right'><a href='http://www.crs4.it/web/bioinformatics/peopledetails/people/198/Nicola_Soranzo'><img src="/src/events/GCC2013/Abstracts/Posters/NicolaSoranzo.jpg" alt="" width="100" /></a></div>

Stefano Onano, [Gianmauro Cuccuru](http://www.crs4.it/crs4/peopledetails/people/195/Gianmauro_Cuccuru), Massimiliano Orsini, Andrea Pinna, Andrea Sbardellati, **[Nicola Soranzo](http://www.crs4.it/web/bioinformatics/peopledetails/people/198/Nicola_Soranzo)**, Paolo Uva, Giorgio Fotia

 [CRS4](http://www.crs4.it/), Pula, Sardegna, Italy

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/MicrobiomeSoranzo.pdf)*

Gut microbiome composition has been strongly related to different health status or pathologies, from metabolic disorders to chronic inflammatory syndromes or neoplastic diseases. Currently, NGS approach allows deep investigation of the microbial community, thus helping in elucidating the role of each microbiome component. Metagenomics downstream analysis plays a central role in this context, where millions of sequences are aligned against thousands of genomes, and different algorithms or settings can lead to different results. In order to create an environment for metagenomics analysis and to allow data and results sharing among collaborators, we exploited [Orione](http://orione.crs4.it/), a web based framework for microbiology developed at CRS4 (http://orione.crs4.it/). Orione integrates several tools and pipelines focusing on different aspects of metagenomics analysis, from the pre-processing to the reads binning and community composition reconstruction. With the purpose of demonstrating the capabilities of the Orione framework for the management and analysis of metagenomics data, we illustrate a case study in which we compare in an easy and reliable way several approaches for the analysis of the human gut microbiome and an artificial microbiome.

<br />

### P9: Control Free Tumour Analysis with Galaxy

**Saskia Hiltemann**<sup>1,2</sup>, Hailing Mei<sup>3</sup>, Mattias de Hollander<sup>3,4</sup>, Peter van der Spek<sup>2</sup>, Guido Jenster<sup>1</sup> and Andrew Stubbs<sup>2</sup>

 <sup>1</sup> Department of Urology, Josephine Nefkens Institute, Erasmus University Medical Center, Rotterdam, The Netherlands<br />
 <sup>2</sup> Department of Bioinformatics, Erasmus University Medical Center, Rotterdam, The Netherlands<br />
 <sup>3</sup> Netherlands Bioinformatics Centre, Nijmegen, The Netherlands<br />
 <sup>4</sup> Netherlands Institute for Ecology, Wageningen, The Netherlands

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/ControlFreeTumourHiltemann.pdf)*

The first step in tumour analysis is typically a correction with a normal sample, taken from healthy tissue of the same individual. The majority of variants (80%-95%) found in a tumour sample are germline mutations also found in the healthy tissue. When such an associated normal sample is not available, a different filtering method must be employed. Because the majority of variants found in an individual are common throughout the population, we have constructed a set of 85 samples from healthy, unrelated individuals, to act as a “virtual normal”.

We tested our "virtual normal" somatic variant detection approach on two public breast cancer datasets, and two in-house prostate cancer samples, both sequenced on the Complete Genomics platform. We compared the results of this analysis to a standard tumour/normal analysis to detect somatic variations for both structural variations (SVs) as well as SNVs and small indels and substitutions. In addition, the results for both analyses, were filtered for variants present in several databases of human variation, including the 1000 Genomes project, dbSNP, and the Exome Variant Server.  We have implemented the tools used for this data analysis in a user friendly, Galaxy, which is deployed in CLOUD environment, to allow for instant scale-up and provide resources for large experimental studies from translational research scientists.
  
Our "virtual normal" method was able to remove up to 97% of the variants also filtered out using the tumour/normal approach, as well as remove a large number (approx. 150,000 small variants and 100 SVs) of additional variants which are not removed when using only the matched normal sample and the public variant databases. Our results suggest that this “virtual normal” approach can act as a substitute for an associated normal sample, eliminating the need to sequence a matching normal sample for every tumour sample.

<br />

### P10: Identification and Epidemiological Surveillance of Bacteria: Web System Development and Evaluation of Intelligent Methods

**Mansoldo, Felipe Raposo Passos de**; Vellasco, Marley Maria Bernardes Rebuzzi (Advisor)

 <sup>1</sup> Departamento de Engenharia Elétrica, Pontifícia Universidade Católica do Rio de Janeiro

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/EpidemiologyMansoldo.pdf)*

We developed of a web system called BCIWeb (Bacterial Classifiation and Identification for Web) that could assist in bacterial identification and provide the technology necessary for the administration and control  of clinical specimen coming from the hospitals and the discovery of knowledge in database system, through data mining methods using SOM (Self Organizing Maps) and Multilayer Perceptron Neural Networks (MLP) for classification and identificatin of bacteria.

In most laboratories the administration and control of the samples are made manualy through many forms of data sheets, when the samples  of biological materials are gathered at the hospital, up to the final identification at the laboratory. In this context, the organization of the information become very limited, its almost impossible to extract useful knowledge, which could help not only supporting decisions but also in the formulations of simple statistics. 

It’s worth mentioning that the system developed is a  generic one . It can be  easily adapted to be used by other areas. It has a web platform, friendly interface, multi-user support, can be configured for all classes of bacterias and  it is easy to be used by any kind of web browser. Access is possible by any type of computer, with various operating systems, cells and tablets.

From  the development  of this friendly tool, in the case study,  the historical data from of UERJ Biology Department were entered into the system. The proposed intelligent methods  for classification and  identification of bacteria were analysed and showed promising results.

<br />

### P11: Running on HPC Galaxy-based workflows for predictive biomarkers from RNA-Seq clinical data

<div class='right'><img src="/src/events/GCC2013/Abstracts/Posters/CalogeroZarbo.jpg" alt="Calogero Zarbo" width="100" /></div>

**Calogero Zarbo**, Marco Chierici, Cesare Furlanello

 Fondazione Bruno Kessler, Trento, Italy
 
*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/RNASeqPredictiveMarkersZarbo.pdf)*

We present a Galaxy-based framework for clinical diagnostic on big datasets of RNA deep-sequencing (RNA-Seq) data. The framework implements a complete Data Analysis Plan (DAP), integrating state-of-the-art RNA-Seq analysis pipelines with machine learning methods for predictive biomarker selection. Here we discuss in details a Galaxy workflow for the identification of predictive biomarkers from RNA-Seq data, including the comparison with paired microarray data.  Our solution extends functions from the paramiko v1.7.5 module in order to transport the Galaxy workflow processes through a virtual bash shell, by an SSH data stream connection, on a high performance computing (HPC) system,  e.g. a Linux cluster with the SGE queue system. The goal is to achieve parallelization with one workflow, keeping the same flexibility of a direct interaction with the SGE. The solution provides functions for importing data in the HPC resource, building run-time the entire SGE call, controlling process status and exporting results (datasets) back to a Galaxy host. In particular, the status control methods are mirrored into native standard communication streams in the Galaxy host, thus enabling the rich functionalities already existing in Galaxy, like  job status, bug report, etc. DAP components (classifiers, feature weighting, feature stability methods, etc.) are tools of the MLPY Python library, and experiments organized on a 10x 5-fold cross-validation (CV) schema.  The workflow runs on the FBK KORE HPC Facility, a Linux cluster consisting of 90 nodes (~1000 cores, 5TB RAM), with tests on different datasets, the largest of 500 samples, within the US FDA-led SEQC international initiative.

<br />

### P12: Developing a Web-Based Tool for Analysing Cell Type-Specificity of Genomic Variation Data

**Kristoffer Waløen**

 [University of Oslo](http://uio.no)

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/CellTypeSpecifictyWaloen.pdf)*

The majority of trait associated variants found in GWAS studies lie within non coding sequences. This  suggests that a large proportion of variants alter regulatory regions. Certain genomic features has been shown useful as marks of cell type specific activity of genomic regions. Analyzing such genomic features against variant regions may therefore be used to find previously unknown links between trait and cell type. Although there have been done several investigations of this type, no easily accessible tools for this type of research exists. This makes reproduction of such results difficult and time consuming, hindering confirmation and updates of such results

Such an accessible tool for studying cell-type specificity of genomic regions is presented here, created in a Galaxy-based web interface at the Genomic HyperBrowser server. It allows the user to run a selection of analyses on their own genomic variation data against genomic tracks of cell-type specific marks. A table presenting the main results provides a broad overview of the most relevant cell types, while links to further details behind each main result allows for deeper investigations.

The tool here presented allows anyone to run such analyses without deep knowledge of statistics and informatics, as most parameters and variables are set automatically by the system. Combined with the graphical interface in the HyperBrowser, this makes it easy to specify and reproduce analyses.

<br />

### P13: Gene Regulatory Network Inference and Analysis using Galaxy

**Alex Upton**<sup>1</sup>, Theo Arvanitis<sup>1</sup>, Cristin Print<sup>2</sup>, Daniel Hurley<sup>2</sup>

 <sup>1</sup> The University of Birmingham<br />
 <sup>2</sup> The University of Auckland

In this work, we present a joint project between The University of Birmingham and The University of Auckland. The goal of this project was to deliver a tool that allows users with limited computer skills to infer and analyse gene regulatory networks from microarray data. Gene regulatory network inference and analysis is an approach for analysing microarray data that has the potential to highlight key genes, and has already resulted in a number of significant biological results in a number of different species. However, widespread use of gene regulatory networks to analyse microarray data is hindered by the specialist programming skills that are required, and also by the variability in implementing these methods between research groups. Biologists are daunted by the prospect of having to learn programming languages such as Matlab, R, and Python. We present a solution using Galaxy. Gene network inference and analysis tools are hosted on Galaxy, that allow the end user to infer and analyse gene regulatory networks from microarray data using a simple web-based interface. Inference is carried out using the widely implemented WGCNA algorithm, and analysis is performed using a number of graph theory metrics. Enrichment analysis and visualisation options are also implemented. This is the first time to our knowledge that gene regulatory inference and analysis tools have been implemented using Galaxy, and it is hoped that this will encourage greater use of gene regulatory networks as a method for analysing microarray data. 

<br />

### P14: Tools for Genome-wide Analyses of Genomic Divergence

**Torkil Vederhus**

 University of Oslo

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/DivergenceAnalysisVederhus.pdf)*

The recent revolution in genomic sequencing has created new opportunities for exploring the connection between genomic variation and biological traits. By sequencing multiple individual genomes within a species, it is possible to identify genomic regions of divergence between groups of individuals sharing particular phenotypic traits. Such a strategy have in the literature been successfully applied for studies of parallel evolution, but none of these earlier studies have made the underlying methodology and tools readily accessible. It is therefore difficult to reproduce their results or to reuse the methodology for new investigations.

We here present general methodology for identifying divergence between two groups of genomic sequences. One method calculates a cluster separation score based on a two-dimensional scaling of the pairwise differences between individuals of the population. The other method uses the Fisher's exact test score for each single-nucleotide polymorphism found. The tools reproduce earlier published results on parallel evolution in freshwater three-spine sticklebacks and a long-term evolution experiment with common fruit flies.

Both methods are implemented as Galaxy tools in the Genomic HyperBrowser web server.
In theory, the tools make it possible for anyone with internet access to perform reproducible analyses identifying regions of genomic divergence between populations. However, the complexity of the methodology and the non-uniformity of formats used to represent the relevant genomic data is a challenge in practice.

<br />

### P15: Validation setup for cost-efficient RNA-sequencing of pooled samples

**Qvist P**<sup>1,3</sup>, **Rajkumar AP**<sup>1-3</sup>, Christensen JH<sup>1,3</sup>, Song H<sup>4</sup>, Wang, Q<sup>4</sup>,  Borglum AD<sup>1-3</sup>

 <sup>1</sup> Department of Biomedicine, Aarhus University, Denmark <br />
 <sup>2</sup> Center for Psychiatric Research, Aarhus University hospital, Denmark<br />
 <sup>3</sup> The Lundbeck Foundation Initiative for Integrative Psychiatric Research, iPSYCH<br />
 <sup>4</sup> Bejing Genomic Insitute (BGI)

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/RNASeqPooledValidationQvist.pdf)*

*Introduction:* Sequencing pools of individual RNA samples can reduce the cost of RNA sequencing. However, the validity of such pooling strategy to detect differentially regulated genes remains uncertain. Hence, we aim to validate a RNA sequencing strategy involving pooling of individual RNA samples, derived from brains of genetically modified mice and of their wild genotype littermate controls. 

*Material and methods:* Brains were obtained from 8 wild type and 8 genetically modified mice and sectioned manually in a 1 mm coronal mouse brain matrix. Micro-punches containing amygdala were collected from each section. 
RNA was extracted from tissue using the Maxwell automated system (Promega) and Quality was assessed using the Agilent 2100 system. 

For each genotype 3 groups were formed: 
1. All individual samples separately 
2. Pool of 8 samples
3. Pool of 3 samples.

TruSeq libraries were constructed for individual samples and pools following polyA enrichment. Libraries were sequenced on an Illumina HiSeq 2000 platform with 50bp SE sequencing. 

*Analysis:* For all samples
* Data filtering including removal of adaptors, contamination and low-quality reads from raw reads 
* Assessment of sequencing（Statistics of raw reads, Sequencing saturation analysis, analysis of the distribution of reads on reference gene） 
* Gene expression annotation

Between genotypes for all groups: 
* Differential gene expression analysis (Screening of differentially expressed genes (DEGs), and experimental repeatability analysis of DEGs) 

Between groups:
* Comparison of DEGs (DEGs detected in Group 1 as reference)

<br />

### P16: Using Frequent Itemset Mining to Find  Sets of Co-Occurring Genomic Tracks

**Boris Simovski**, Geir Kjetil Sandve

 [University of Oslo](http://uio.no)

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/ItemsetMiningSimovski.pdf)*

While immense amounts of genomic data are now publicly available, analyzing the data is a complicated and at times resource exhaustive task. A well established analysis is the computation of pairwise overlap between two genomic tracks. However, in certain situations it is valuable to consider a larger number of genomic tracks and e.g. discover subsets of the tracks that occur together at the same locations along the genome. An example of such a problem is to find combinations of transcription factor (TF) ChiP-seq tracks that occur at the same locations in the genome, either from a set of tracks for different TFs or from a set of tracks for the same TF in different cells/settings. 

The problem at hand can be translated into a more general problem within the field of data mining, called frequent itemset mining. According to the itemset mining terminology, we take the genomic tracks to represent items and the base-pair positions of the genome to represent transactions. 

We present a Galaxy-based web tool at the Genomic HyperBrowser web server that enables the user to run frequent itemset mining on large sets of genomic tracks. The result is a list of track combinations that occur together on at least a minimum number of base pairs along the genome. We present results for two different approaches, based on the breadth-first Apriori and the depth-first Eclat algorithm. We discuss their advantages and drawbacks, as well as the general usefulness of applying itemset mining to the analysis of genomic tracks.

<br />

### P17: CRAC: A new software based on a combinatorial and integrated approach to analyse RNA-seq reads

Nicolas. Philippe<sup>1,3,4</sup>, Mikael Salson<sup>2</sup>, Alban Mancheron<sup>3,4</sup>, **Thérèse Commes**<sup>1,4</sup>, Eric Rivals<sup>3,4</sup>

 <sup>1</sup> Institut de Recherche en Biothérapie, INSERM U1040, France<br /> 
 <sup>2</sup> Laboratoire d'Informatique Fondamentale de Lille, France<br />
 <sup>3</sup> Laboratoire d'Informatique, de Robotique et de Microélectronique de Montpellier, France<br />
 <sup>4</sup> Institut de Biologie Computationnelle, Montpellier France

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/CRACCommes.pdf)*

The comprehensive analysis of expression profiles based on RNA-seq provides accuracy and unprecedented sensitivity for exploring transcriptome in all its complexity. This method is particularly suited to open the discovery of new transcripts (new variants, non-coding RNAs and RNA chimeras). The difficulty in the analysis lies in the ability to detect and extract rigorously the biological information from RNA-seq data. Indeed, the splicing process, which generates both co-linear and non co-linear RNAs, the inclusion of sequencing errors, somatic mutations, polymorphisms, and rearrangements make the reads differ from the reference genome in a variety of ways. This complicates the task of comparing reads with a genome. We have developed a new tool, called CRAC, for exploring the whole transcriptional repertoire (Philippe *et al.*, 2013) based on an innovative algorithm. The main idea is to adopt a k-mer approach that combines the genomic positions and local coverage to perform a complex analysis of each read and detect in a single step, mutations, indels, errors, as well as both normal and chimeric splice junctions. For biological applications, one of the advantages using CRAC is its ability to characterize the presence of new splice junctions and RNA chimeras in tumors. CRAC is a fully operational open source software, which is more efficient than the tools currently used in the field. CRAC is available at http://crac.gforge.inria.fr. The ATGC platform, part of the ReNaBi and France Genomique bioinformatics network, now provides its own new Galaxy service to access a NGS tools range that includes crac.

<br />

### P18: Detection of Copy Number Alterations (CNAs) in Paired Exome Sequence Data Sets of Acute Myeloid Leukemia (AML) Patients Using Galaxy

**S. Vosberg**<sup>1,2</sup>, T. Herold<sup>2</sup>, N. Sandhöfer<sup>1,2</sup>, G. Göhring<sup>3</sup>, A. Graf<sup>4</sup>, S. Krebs<sup>4</sup>, H. Blum<sup>4</sup>, B. Schlegelberger<sup>3</sup>, K. Spiekermann<sup>1,2</sup>, S.K. Bohlander<sup>1,2,5</sup>, P.A. Greif<sup>1,2</sup>

 <sup>1</sup> Clinical Cooperative Group Leukemia, German Research Centre for Environmental Health, Munich, Germany<br />
 <sup>2</sup> Department of Internal Medicine 3, Ludwig-Maximilians-University, Munich, Germany<br />
 <sup>3</sup> Institute of Cell and Molecular Pathology, Hannover Medical School, Hannover, Germany<br />
 <sup>4</sup> Laboratory for Functional Genome Analysis, Gene Center, Ludwig-Maximilians-University, Munich, Germany<br />
 <sup>5</sup> Center for Human Genetics, Philipps University, Marburg, Germany

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/CNAExomeAMLVosberg.pdf)*

Beyond the identification of SNVs and Indels, exome sequencing allows to detect somatic Copy Number Alterations (CNAs) in protein coding regions of tumor DNA. Using the Galaxy platform, we analyzed the read depth of tumor and normal control exome sequence data sets from acute myeloid leukemia (AML) patients confirming unbalanced translocations, aneuploidy and complex karyotypes. 

Mean exon coverages were determined for both samples and a linear regression model was used to describe the tumor sample coverage as a linear function of the healthy sample coverage. This approach may handle regions of zero coverage, monoallelic deletions and tolerates outliers. The maximum-likelihood segmentation, defined by an exact algorithm using a Bayesian Information Criterion adapted for segmentation problems, separates regions of equivalent exon coverage between tumor and control samples from regions of aberrant exon coverage. 

Tumor samples with trisomy 13 show significantly enriched exon coverages of chromosome 13 compared to the control sample. An MLL/AF9 rearrangement with partial loss of the 3'-part of the MLL gene, showed significantly reduced coverages in the tumor sample at exons downstream of the breakpoint in the MLL gene. A complex karyotype including the unbalanced translocations t(1;2), t(5;17), t(8;11) and a monosomy 7 resulted in corresponding CNAs on chromosomes 1, 5, 7, 11 and 17. 

Our study demonstrates that somatic CNAs in tumor cells can be identified by exome sequencing of tumor and control samples. Furthermore, this approach might be able to detect novel tumor-specific CNAs in protein coding regions contributing to the onset and progression of AML.

<br />

### P19: Development of a Moroccan Database for Cancer Care (MD2C)

**Oussama Semlali**<sup>1</sup>, Adil El Yamine<sup>1</sup>, Fadoua Haoudi<sup>1</sup>, Housna Arrouchi<sup>1</sup>, Ahmed Moussa<sup>2</sup>, Azeddine Ibrahimi<sup>1</sup>

 <sup>1</sup> MedBiotech (Research Equipe of Medical Biotechnology), Pharmacology and Toxicology Laboratory, Rabat - Faculty of Medecine & Pharmacy of Rabat, UM5S, Morocco<br />
 <sup>2</sup> Innovative Technologies Laboratory, ENSAT, Abdelmalek Essaadi University, Tangier, Morocco

In Morocco women's Breast Cancer constitutes a major public health problem. According to the Central Cancer Registry RCCR, the disease’s incidence increased during the period of three years to 39.9 new cases per 100.000 women. Breast cancer is a heterogeneous disease with different morphologies, molecular profiles, clinical behavior and disparate response to therapy. However, the increasing understanding of molecular carcinogenesis has begun to change paradigms in oncology from traditional single-factor strategy to a multi-parameter systematic strategy. The classic therapeutic model for breast cancer treatment has changed from adopting radical surgery, conservative surgery, radiotherapy, chemotherapy and hormonotherapy to more personalized strategy.

In this paper, we describe the development of the Moroccan Database for Cancer Care (MD2C). As a first step this platform will integrate all the information relevant to Moroccan breast cancer patients in a database. A query interface is developed using open source technologies, allowing easy secure access to the breast cancer database. The second step is to generate experts systems to assist in decision making. Our MD2C database includes all patient’s personal and socio-economical data, family and personal disease history, clinical and paraclinical diagnosis, genetic and genomic data. This work, and during all the development phases, was done by our bioinformatics team in a multidisciplinary setting including oncologists, pathologists and pharmacists. This database will help Moroccan doctors in making precise decisions concerning risks, diagnosis and therapeutic protocols to use and will allow us to extract of knowledge to generate the first Moroccan breast cancer therapeutic model.

<br />

### P20: Toward a French cyber-galaxy?

Cristophe CARON<sup>1</sup>, **Wilfrid CARRE**<sup>1</sup>, Alexandre CORMIER<sup>1</sup>, Sandra DEROZIER<sup>2</sup>, Franck GIACOMONI<sup>3</sup>, **Olivier INIZAN**<sup>4</sup>, Gildas LE CORGUILLE<sup>1</sup>, **Alban LERMINE**<sup>5</sup>, Sarah MAMAN<sup>6</sup>, Pierre PERICARD<sup>1</sup> and Franck SAMSON<sup>2</sup>

 <sup>1</sup> CNRS, UPMC, FR2424,ABiMS, Station Biologique, 29680, Roscoff, France<br />
 <sup>2</sup> INRA, UR1077, MIGALE, Centre de Jouy-en-Josas, 78352, Jouy-en-Josas, France<br />
 <sup>3</sup> PFEM, UMR1019 INRA, Centre Clermont-Ferrand-Theix, 63122, Saint Genes Champanelle, France<br />
 <sup>4</sup> INRA, UR1164, Route de St Cyr, Versailles, France<br />
 <sup>5</sup> Institut Curie, INSERM, U900, Bioinformatics and Computational Systems Biology of Cancer, 75248 Paris, France<br />
 <sup>6</sup> INRA, UMR444, Laboratoire de Génétique Cellulaire, Centre de Toulouse Auzeville, 24 Chemin de Bordé Rouge, 31320 Auzeville-Tolosane, France

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/FrenchCarre.pdf)*

The success of the open web based platform “Galaxy” is growing among scientific communities. The French Institute of Bioinformatics (IFB) wishes to initiate a collaborative work dedicated to scientific workflows and especially to the Galaxy platform. We report here the main items on which future collaborations could be build: (i) software and hardware architecture, (ii) tools integration and (iii) training. 

High throughput technologies advent significantly alters analysis behaviour and strategy with mobilization of new infrastructure, new tools and new skills. IFB decided to conduct a cross action on "workflows" data analysis solutions, and especially on the Galaxy platform. The first item called "software and hardware architecture" addresses the operational issues in production environments, the potential for automating deployment tasks and the monitoring solutions for Galaxy servers. 

With the second one, "Tools integration" we aim to provide processes facilitating tool interfacing in a Galaxy instance. Priority will be the development of a good practice guide, as well as a technology watch around the methods proposed by the international community. We also want to promote the sharing of training activities at national level (such as the Aviesan Bioinformatics school, January 2013 - http://galaxy-ecole.sb-roscoff.fr/) and ensure a smooth transition to new uses, such as E-learning. A first working group is already effective. Previous items will be improved in the coming months thanks to a specific dedicated wiki and the first French Galaxy Workshop this autumn.

<br />

### P21: The Galaxy service pilot in CSIRO – a collaboration between science and IT

**[Steve McMahon](https://wiki.csiro.au/display/ASC/Steve+McMahon)**<sup>1</sup>, Philippe Moncuquet<sup>2</sup>, Sean Li<sup>2</sup>, Ondrej Hlinka<sup>2</sup>, Josh Bowden<sup>1</sup>, Sean McWilliam<sup>2</sup> and Annette McGrath<sup>2</sup>

 <sup>1</sup> Advanced Scientific Computing Team, Information Management & Technology, CSIRO, Canberra, Australia<br />
 <sup>2</sup> CSIRO Bioinformatics Core CSIRO, Canberra, Australia

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/CSIROMcMahon.pdf)*

A Galaxy service pilot was set up in CSIRO for the benefit of biologists and bioinformaticians within the organisation. The Galaxy service pilot was implemented as a collaboration between CSIRO’s Information Management and Technology staff (IM&T) and the CSIRO Bioinformatics Core.

In CSIRO biologists had been relying  on a limited number of skilled bioinformaticians to carry out this analysis.  It was proposed that a service providing easy access to some analysis tools would improve research throughput of the novice bioinformaticians while freeing up time of the experienced bioinformaticians for other work.

This service pilot project intended to demonstrate how a full Galaxy service might benefit the bioscience community in CSIRO. Lessons learnt from the pilot were intended to guide the design and implementation of a full production Galaxy service. The service pilot delivered over 300 useful bioinformatics tools and focussed on providing a comprehensive set of next gen sequencing analysis tools to enable users to best evaluate the capabilities of a potential Galaxy production service .  

The project was successful in that it showed how CSIRO IT and science staff could work together to achieve project goals.  The service pilot was made available to users in September 2012 and there are now over 90 registered users and a number of published workflows.  The pilot service is being used extensively by some users and feedback has been extremely positive.  With the success of the pilot management approval is being sought for an ongoing production service.

<br />

### P22: Andromeda: NBIC Galaxy at Surfsara's HPC cloud

Mattias de Hollander<sup>1</sup>, David van Enckevort<sup>2</sup>, **Leon Mei**<sup>2</sup>, Marc van Driel<sup>2</sup>, Rob Hooft<sup>2</sup>

 <sup>1</sup> KNAW-NIOO<br />
 <sup>2</sup> NBIC

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/AndromedaMei.pdf)*

Andromeda is a public Galaxy server set up by the Netherlands Bioinformatics Center (NBIC) to support genomics research in the Netherlands. Andromeda has been running over 3 years and was originally intended to be a demonstration server for bioinformatics tools made by NBIC developers. Several application specific pipelines are installed at Andromeda together with common sequencing analysis tools. Andromeda has been used at several NBIC courses to support practicals and has been proven to be an effective platform for knowledge dissemination.

However, the need for processing real scale research datasets at Andromeda was clearly visible already in the beginning. This demand is only becoming more prominent in the past year when more researchers are able to acquire NGS datasets for their project but fail to obtain the necessary bioinformatics support within their groups. 

To support this growing demand, NBIC together with the BigGrid project and SURFsara installed the new Andromeda at a high performance computing cloud system hosted by SURFsara. This HPC cloud consists of 19 fast servers with 608 CPUs and almost 5TB of memory. In order to best use the elastic resource provided by the HPC cloud, the new Andromeda also incorporates the CloudMan script to support dynamic adding and removing of virtual machines based on the number of submitted jobs. Till the beginning of 2013, there are about 700 registered users at Andromeda and almost 40000 jobs have been executed. 

In this presentation, we will present the architecture of Andromeda and its installation and maintenance procedure.

<br />

### P23: Implementing next generation web server in Galaxy

**Wai Yi Leung**<sup>1</sup>, Leon Mei<sup>2</sup>

 <sup>1</sup> Leiden University Medical Centre, Sequence Analysis Support Core<br />
 <sup>2</sup> NBIC / Leiden University Medical Centre, SASC

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/NGWebServerLeung.pdf)*

A few institutes brought the galaxy server software to the public which helped in the growth of the Galaxy user community. The userbase for these public servers have grown very fast, creating new challenges to the administrators. Challenges include: traffic handling, data storage, computing facility (cluster), new versions of (optimized) software (tool-shed) and production ready deployments of the webserver and database server.

Focus on performance has shifted from running all analyses in one instance to a local cluster. Optimizations in the tools are dealt with on every major release (e.g. bwa). The question remains: what about the basic matters? The codebase of Galaxy is Pylons based, which ran exclusively with Paste at time of writing Galaxy.

Our interest was to see whether we can push Galaxy to a new limit on serving more request per second. The reason for this is simple: web request are (relatively) not cpu intensive. Web request are mostly database-connection bound and/or filesystem bound because of the web-templates.  We expect a gain in the amount of web-requests when we replace Paste by a modern WSGI server like Gunicorn, Tornado or uWSGI.

An initial setup with Gunicorn show a 200% gain in served request per second and a drop of 70% in memory usage. uWSGI show a comparable profile, though with much  complex configuration. We aim to provide a solution where minimal change is needed to run Galaxy in an optimized environment for production usage.

<br />

### P24: Leveraging Canadian Bioinformatics with Galaxy VZ in a HPC center

**David Anderson de Lima Morais**<sup>1,2</sup>, **Carol Gauthier**<sup>1,2</sup>, Michel Barrette<sup>1</sup>, David Bujold<sup>2</sup>, Maxime Caron<sup>2</sup>, Alain Veilleux<sup>1</sup>, Guillaume Bourque<sup>1</sup>

 <sup>1</sup> [Centre de Calcul Scientifique](https://rqchp.ca/?mod=cms&pageId=1388&lang=EN), Université de Sherbrooke, Quebec, Canada<br />
 <sup>2</sup> [McGill University](http://www.mcgill.ca/) and Genome Quebec Innovation Center, Montreal, Canada

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/CanadianVZMorais.pdf)*

Bioinformatics in Canada is a fast growing science. The need for data analysis and storage has long surpassed what any single lab can accomplish. Moreover, the complexity of some pipelines renders the analysis unfeasible for users not acquainted with programing languages. Using the [Mammouth supercomputer](https://rqchp.ca/?mod=cms&pageId=1388&lang=EN&), presently the third fastest in Canada, we provided a Galaxy environment for the Canadian scientific community. Our hybrid approach (cloud/HPC) consists of deploying Galaxy on a virtual machine (hosted on the interactive node) in a way that allows for the launching of jobs on Mammouth’s computing nodes, using simple connectors and file system mounts. This approach allows us to use Galaxy in a secure and self-contained environment while benefiting from the full power of the HPC center. Galaxy has been also coupled with our local UCSC browser installation, which allows for fast data integration. We intend not only to provide tools for data analysis but also to serve and maintain a set of common pipelines, which can be easily used by any researcher. We also have a tight collaboration with the Integrative Epigenomic Data Coordination Centre (EDCC), at [McGill University](http://www.mcgill.ca/), which will enable us to share data and pipelines related with Epigenomics. Ultimately, we want to extend our model to other Canadian HPC centres and deploy Galaxy pipelines using its API through an external metascheduler.

<br />


### P25: LiSIs: a Galaxy-based platform for Life Science Informatics Research

**Kannas Christos C.**<sup>1</sup>, Antoniou Zinonas<sup>1</sup>, Achilleos Kleo<sup>1</sup>, Nicolaou Christos A.<sup>1</sup>, Pattichis Costantinos S.<sup>1</sup>, Kalvari Ioanna<sup>2</sup>, Kirmitzoglou Ioannis<sup>2</sup>, Promponas Vasilis I.<sup>2</sup>, Savva Christiana<sup>2</sup>, Nephytou Christiana<sup>2</sup>, Contantinou Andreas I.<sup>2</sup>, Scherf David<sup>3</sup>, Gerhäuser Clarissa<sup>3</sup>

 <sup>1</sup> Department of Computer Science, University of Cyprus, Nicosia, Cyprus<br />
 <sup>2</sup> Department of Biological Science, University of Cyprus, Nicosia, Cyprus<br />
 <sup>3</sup> Cancer Chemoprevention and Epigenomics Workgroup, German Cancer Research Center, Heidelberg, Germany

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/LiSIsKannas.pdf)*

In this presentation we introduce the [Life Science Informatics (LiSIs)](http://lisis.cs.ucy.ac.cy) platform, a new, open Scientific Workflow Management Systems (SWMSs), with several unique features designed to enhance user experience and facilitate user adoption. LiSIs is an online system based on the widely popular Galaxy SWMS. LiSIs provides five tool categories dedicated to small molecule virtual screening and, a selection of native Galaxy tools. The tool categories are: (1) Input Layer, offering tools for chemical and biological data file parsing; (2) Pre-Processing Layer, offering tools for compound fingerprint calculation, chemical structure property calculation, compound fragmentation, conformation generation and protein cleaning; (3) Processing Layer, offering numerous tools for chemical property filtering, compound similarity calculation, predictive modelling for biological properties and docking-pose prediction and scoring; (4) Post-Processing Layer, offering tools for converting chemical files formats and merging binary datasets; (5) Output Layer, offering tools for the preparation of files with the results obtained in SMILES, SDF and tabular format.

LiSIs has been used to implement virtual screening workflows for the selection of compounds that may serve as leads for subsequent cancer chemoprevention research. Typically, several thousand commercially available compounds are supplied as input to a workflow and are subjected to a series of computational filters including, for example, drug likeness, predicted potency via predictive models and predicted binding affinity via docking. The results, shared with expert chemopreventive researchers using the LiSIs platform, demonstrate the potential use of the system by users of varying backgrounds and computational experience to advance drug discovery research.

<br />

### P26: LifePortal – the Galaxy based portal for life science at University of Oslo

<div class='right'>
<a href='http://www.usit.uio.no/om/organisasjon/uav/itf/ft/ansatte/nikolaiv/index.html'><img src="/src/events/GCC2013/Abstracts/Posters/NikolayVazov.jpg" alt="Nikolay Vazov" width="90" /></a>
<a href='http://www.usit.uio.no/om/organisasjon/uav/itf/ft/ansatte/katerim/index.html'><img src="/src/events/GCC2013/Abstracts/Posters/KaterinaMichalickova.jpg" alt="Katerina Michalickova" width="80" /></a>
<a href='http://folk.uio.no/georgios'><img src="/src/events/GCC2013/Abstracts/Posters/GeorgeMagklaras.jpg" alt="George Magklaras" width="80" /></a>
</div>

**[Nikolay Vazov](http://www.usit.uio.no/om/organisasjon/uav/itf/ft/ansatte/nikolaiv/index.html)**<sup>1</sup>, **[Katerina Michalickova](http://www.usit.uio.no/om/organisasjon/uav/itf/ft/ansatte/katerim/index.html)**<sup>1</sup>, **[George Magklaras](http://folk.uio.no/georgios)**<sup>1,2</sup> Gard Thomassen<sup>1</sup>, Hans A. Eide<sup>1</sup>

 <sup>1</sup> University Center for Information Technology (USIT), University of Oslo<br />
 <sup>2</sup> Biotechnology Center of Oslo & Norwegian Center for Molecular Medicine, University of Oslo

*[Poster](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/GCC2013/LifePortalVazov.pdf)*

As the demands for simplified and user-centric interfaces to computational resources are increasing, so is the demand for a wider range of applications and tools presented through these interfaces. We selected the Galaxy platform to provide an interface to our high performance computing resources and life sciences software. The production server release for the LifePortal is set for October 1<sup>st</sup>, 2013. The LifePortal includes services currently provided by a portal for bioinformatics applications - [the Bioportal (www.bioportal.uio.no)](http://www.bioportal.uio.no).

Despite successfully hosting several production Galaxy instances on a single server, we had to introduce modifications to the Galaxy distribution to tailor it for our HPC production environment. The adaptations fall into three categories - security, computer cluster job submission and accounting.

The LifePortal will make use of the [Norwegian national infrastructure for scientific computing (www.notur.no)](http://www.notur.no), specifically the Abel computing cluster at University of Oslo. We are using the Norwegian federated authentication system [FEIDE (www.feide.no)](http://www.feide.no) to ensure compliance with the terms for usage. We implemented this feature alongside the internal Galaxy user management. Additionally, the Galaxy database has been outsourced to a database hotel using an SSL connection. The LifePortal Galaxy server submits jobs to the Abel compute cluster using the [SLURM batch scheduler system (slurm.schedmd.com)](http://slurm.schedmd.com). This feature provides a user-friendly interface to our high performance computing resource. Since the computing cluster has fixed user quotas, our Galaxy server has to communicate with an [external accounting system (www.clusterresources.com/products/gold-allocation-manager.php)](http://www.clusterresources.com/products/gold-allocation-manager.php).

<br />
