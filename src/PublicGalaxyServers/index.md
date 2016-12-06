---
autotoc: true
title: Publicly Accessible Galaxy Servers
---
<div class='center'><img src="/src/PublicGalaxyServers/80PlusSlide.png" alt="80+ Public Galaxy Servers" width="300" /></div>


<div class='right'>
<table>
  <tr>
    <td style=" border: none; width: 22em;"> </td>
  </tr>
</table>

</div>


**The Galaxy Project's public server ([UseGalaxy.org](http://usegalaxy.org/), *[Main](/src/Main/index.md)*)** can meet many needs, but it is not suitable for everything (see [Choices](/src/BigPicture/Choices/index.md) for why) and cannot possibly scale to meet the entire world's needs.

Fortunately the Galaxy [Community](/src/Community/index.md) is helping out by [installing Galaxy](/src/Admin/GetGalaxy/index.md) at their institutions and then making those installations either publicly available or open to their organizations or community. This page lists publicly accessible Galaxy servers.  To be included here a server must be accessible to any academic researcher anywhere in the world.  Servers can require logins and enforce quotas.

**To add your public Galaxy server to this list**, please either just add it (hey, *it's a wiki*), or [describe the server here](https://docs.google.com/forms/d/1KBkyhAPpgJLanRWBoIHmwtEJELDUifZLUixfoqZXXU4/viewform?usp=send_form) and we'll post it this directory.

**[Semi-Public Galaxy Services](/src/SemiPublicGalaxyServers/index.md)**

There are also a number of [semi-public Galaxy services](/src/SemiPublicGalaxyServers/index.md) that make Galaxy available to large research communities, usually on a geographical basis.  See the [semi-public Galaxy services list](/src/SemiPublicGalaxyServers/index.md).

# General Purpose / Genomics Servers

These servers implement a broad range of tools and and aren't specific to any part of the tree of life, or to any specific type of analysis.  These are servers you can use when want to do general genomic analysis.

## Andromeda

<div class='right solid'><a href='http://galaxy.nbic.nl/'><img src="/src/PublicGalaxyServers/Andromeda.png" alt="Andromeda"  /></a></div>

* *Links:*
  * **[Andromeda server](http://galaxy.nbic.nl/)**
  * Andromeda was the featured topic at the [March 2013 GalaxyAdmins Meetup](/src/Community/GalaxyAdmins/Meetups/2013_03_20/index.md).  Includes [slides](PLACEHOLDER_ATTACHMENT_URL/src/Community/GalaxyAdmins/Meetups/2013_03_20/20130320Andromeda.pdf) and [video](https://globalcampus.uiowa.edu/play_recording.html?recordingId=1262344508128_1363788090133).
  * [GCC2013](/src/events/GCC2013/index.md) [Poster](/src/events/GCC2013/Abstracts/Posters/index.md#p22-andromeda-nbic-galaxy-at-surfsaras-hpc-cloud) and [Lightning talk](/src/events/GCC2013/Lightning/index.md#andromeda-nbic-galaxy-at-surfsaras-hpc-cloud): *Andromeda: NBIC Galaxy at Surfsara's HPC cloud* 

* *Domain/Purpose:*
  * This is a fully populated Galaxy instance. 
* *Comments:*
  * As of 2014/01/01:
    * "Due to funding issue, the NBIC Galaxy server is running now with very limited support and maintenance as of January 1st, 2014. We hope this is temporary but please be aware that your analysis will be not performed at an optimal speed and most questions will not be answered."
  * [Andromeda](http://galaxy.nbic.nl/) is hosted at the [SURFsara](https://www.cloud.sara.nl/) [High Performance Computing (HPC) cloud](https://www.cloud.sara.nl/).<br />

* *User Support:*
  * [Email](mailto:nbicgalaxy DASH admin AT trac DOT nbic DOT nl)
* *Quotas:* 
  * Registered users: 10GB; Anonymous users: 10MB 
* *Sponsor(s):*
  * [Netherlands Bioinformatics Centre (NBIC)](http://nbic.nl) and [BiG Grid](http://www.biggrid.nl/) [SURFsara](http://surfsara.nl)

## Biomina

<div class='right solid'><a href='http://biominavm-galaxy.biomina.be/galaxy/'><img src="/src/PublicGalaxyServers/Biomina300.png" alt="Biomina Galaxy"  /></a></div>

* *Link:*
  * [Biomina Galaxy](http://biominavm-galaxy.biomina.be/galaxy/)
* *Domain/Purpose:* 
  * A general purpose Galaxy instance that includes most "standard" tools for DNA/RNA sequencing, plus extra tools for panel resequencing, variant annotation and some tools for Illumina SNParray analysis.
* *Comments:*
  * Includes a number of workflows, including workflow from "[A SWI/SNF-related autism syndrome caused by de novo mutations in ADNP](http://www.nature.com/ng/journal/vaop/ncurrent/full/ng.2899.html)," by Helsmoortel, *et al.*, *[Nature Genetics](http://www.nature.com/ng/)* (2014) doi:10.1038/ng.2899
* *User Support:*
  * [Email support](mailto:geert DOT vandeweyer AT uantwerpen DOT be)
* *Quotas:* 
  * Registered users: 50GB. Can be increased up to 3TB in collaborative projects. 
  * There is NO backup of data inside this galaxy server. 
  * Collaboration partner jobs have higher priority on the system. 
* *Sponsor(s):*
  * [Center of Medical Genetics](http://www.ua.ac.be/main.aspx?c=.MEDGEN), [University of Antwerp](http://www.ua.ac.be/)
  * [Biomina research center](http://www.biomina.be/), [University](http://www.ua.ac.be/) and [University Hospital](http://www.uza.be/) of Antwerp

## CBiB Galaxy

<div class='right solid'><a href='http://services.cbib.u-bordeaux2.fr/galaxy/'><img src="/src/PublicGalaxyServers/CBiBLogo300.png" alt="CBiB Galaxy"  /></a></div>

* *Link:*
  * [CBiB Galaxy](http://services.cbib.u-bordeaux2.fr/galaxy/)
* *Domain/Purpose:* 
  * A general purpose Galaxy instance that includes EMBOSS (a software analysis package for molecular biology) and fibronectin (diversity analysis of synthetic libraries of a Fibronectin domain). 
* *Comments:*
  * Dedicated server: 4 CPU Intel Xeon - 8 cores (a total of 32 cores / 64 threads) , 128 GB RAM, 800 GB of disk space.
* *User Support:*
  * [CBiB Admin](mailto:admin DOT cbib AT u-bordeaux2 DOT fr)
* *Quotas:* 
  * Disk space is limited to 1 GB for unregistered users, registered users are free to use up to 10GB (to have more space, please contact [CBiB Admin](mailto:admin DOT cbib AT u-bordeaux2 DOT fr)). The maximum file size to upload is 5 GB. FTP is not operational at this time. Data will be kept 60 days after deletion from history or library.
* *Sponsor(s):*
  * [Centre de Bioinformatique de Bordeaux](http://www.cbib.u-bordeaux2.fr/)

## DBCLS Galaxy

<div class='right solid'><a href='http://galaxy.dbcls.jp/'><img src="/src/PublicGalaxyServers/DBCLS.png" alt="DBCLS Galaxy"  /></a></div>

* *Link:*
  * [DBCLS Galaxy](http://galaxy.dbcls.jp/)
* *Domain/Purpose:*
  * Adds text mining tools, DBCLS DBSearch Tools, semantic web tools 
* *Comments:*
  * Can be used without understanding Japanese.
  * See also [Galaxy入門とワークフロー構築](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/2013DDBJWorkflow.pdf) by [山口 敦子](mailto:atsuko AT dbcls DOT jp)
* *User Support:*
* *Quotas:* 
* *Sponsor(s):*
  * [Database Center for Life Science](http://dbcls.rois.ac.jp/en/)

## Erasmus MC

<div class='right solid'><a href='https://bioinf-galaxian.erasmusmc.nl/galaxy/'><img src="/src/PublicGalaxyServers/ErasmusMCBioinf300.png" alt="Erasmus MC Bioinformatics Galaxy Server"  /></a></div>

* *Link:*
  * [Erasmus MC Bioinformatics Galaxy Server](https://bioinf-galaxian.erasmusmc.nl/galaxy/)
* *Domain/Purpose:*
  * General purpose genomics analysis, featuring many standard tools plus many additional tools.
* *Comments:*
  * This server supports a wealth of RNA-Seq tasks, including:
    * quantify gene expression (featureCounts, edgeR, experimental design module)
    * determine and prioritize fusion genes (star-fusion, Fuma, ifuse)
    * determine variants and annotate small variants (BAM to varscan2, Annovar)
    * detect small ncRNA derived RNAs in small RNA-seq alignments (Flaimapper)
    * Generate html user defined workflow (iReport)
  * All tools are also available in the Tool Shed.
  * See [FuMa: reporting overlap in RNA-seq detected fusion genes](http://bioinformatics.oxfordjournals.org/content/early/2015/12/09/bioinformatics.btv721.abstract), by Youri Hoogstrate, René Böttcher, Saskia Hiltemann, Peter van der Spek, Guido Jenster and Andrew P Stubbs, *Bioinformatics* (2015) doi: 10.1093/bioinformatics/btv721
* *User Support:*

   *
* *Quotas:* 
  * "This Galaxy instance may be used without registration, but guests' histories are deleted nightly. To request an account, please [contact](mailto:a.stubbs@erasmusmc.nl) the Bioinformatics department."
* *Sponsor(s):*
  * [Erasmus Medical Center department of Bioinformatics](http://bioinformatics.erasmusmc.nl/)

## GalaxEast

<div class='right solid'><a href='http://www.galaxeast.fr'><img src="/src/PublicGalaxyServers/GalaxEast.png" alt="GalaxEast"  /></a></div>

* *Links:*
  * [GalaxEast](http://www.galaxeast.fr)
  * [Request an account](http://wiki.galaxeast.fr/doku.php?id=request:account)
* *Domain/Purpose:*
  * Integrative 'omics data analysis 
* *Comments:*
  * From *[J24: GalaxEast: an open and powerful Galaxy instance for integrative Omics data analysis](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/2014ECCB_GalaxEast.pdf),* poster presented at [ECCB'14](/src/events/ECCB2014/index.md) by Stephanie Le Gras, Serge Uge, Matthieu Jung, Ludovic Roy, Valerie Cognat, Frederic Plewniak, Irwin Davidson and Julien Seiler:
    * provides access to up-to-date tools and algorithms such as those devoted to Next Generation Sequencing (NGS) data analysis of:
      * Epigenome: MACS, Homer
      * Genomic sequence: GATK, Samtools, BEDtools, Picard
      * Transcriptome: Cufflinks, HTSeq, TopHat
      * Statistical analyses: DeepTools, S-mart, DESeq
    * [GalaxEast](http://www.galaxeast.fr) provides access to workflows developed for:
      * Motif search
      * Repetitive element analyses
      * ChIP-seq data analysis
    * [GalaxEast](http://www.galaxeast.fr) aims at providing a large range of bioinformatics tools for the analysis of various types of Omics data. It supports reproducible computational research by providing an environment for performing and recording bioinformatics analyses.
    * The [GalaxEast](http://www.galaxeast.fr) project has the following main objectives:
      * Provide the academic scientific community with an open and powerful Galaxy instance with a guaranteed availability. The platform offers access to cutting-edge and up-to-date tools for Omics data analysis with help and support.
      * Propose innovative developments and new helpful tools packaged for Galaxy (available in the GalaxEast toolshed)
      * Promote the packaging of new developments for Galaxy (through wrappers and/or toolshed packages).
  * [GalaxEast deployment details](/src/Community/Deployment/GalaxEast/index.md)
* *User Support:*
  * [Email](mailto:galaxy AT igbmc DOT fr)
* *Quotas:* 
  * You must be part of an academic research lab and provide a valid academic email address to get a personal GalaxEast account.  Write to galaxy@igbmc.fr to request an account.
  * Academic users are allocated 50GB.
* *Sponsor(s):*
  * [IGBMC](http://www.igbmc.fr/), [CNRS](http://www.cnrs.fr/), [Inserm](http://www.inserm.fr/), [Université Strasbourg](http://www.unistra.fr/)

## Galaxy@PRABI

<div class='right solid'><a href='http://galaxy.prabi.fr/'><img src="/src/images/Logos/PRABILogo.png" alt="Galaxy@PRABI" width="300" /></a></div>

* *Links:*
  * [Galaxy@PRABI](http://galaxy.prabi.fr/)
  * [PRABI Galaxy Tool Shed](http://toolshed.prabi.fr/)
* *Domain/Purpose:*
  * A general purpose Galaxy instance that includes bioinformatics tools developed by the research teams working in the perimeter of the PRABI core facility, including *kissplice/kissDE, TETools, SEX-DETector,* and *priam* available [through our local toolshed instance](http://toolshed.prabi.fr). 
  * [SEX-DETector: a probabilistic approach to study sex chromosomes in non-model organisms](http://dx.doi.org/10.1093/gbe/evw172), Aline Muyle, Jos Käfer, Niklaus Zemp, Sylvain Mousset, Franck Picard, and Gabriel AB Marais, *Genome Biology and Evolution* (2016), doi: 10.1093/gbe/evw172
* *Comments:*
  * Dedicated server:  PowerEdge R920 Rack Server - 64 CPU, 512 GB RAM, 15To GB of disk space. 
* *User Support:*
  * [galaxy@prabi user list](http://listes.univ-lyon1.fr/sympa/info/galaxy-user) (in French) 
  * Email support: [galaxy DASH support AT listes DOT univ-lyon1 DOT fr](mailto:galaxy DASH support AT listes DOT univ-lyon1 DOT fr) 
  * We also provide galaxy [training courses](/src/Teach/Trainers/index.md#galaxy_40_prabi_project) for RNA-seq and ChIP-seq data analysis.
* *Quotas:* 
  * Disk space is limited to 100 MB for unregistered users, registered users are free to use up to 50 GB.
  * Users from the FRBioenvis and LECA teams are free to use up to 250 GB disk space.
  * Can be increased up to 1-2 TB in collaborative projects (please contact [galaxy@PRABI Admins](mailto:galaxy DASH support AT listes DOT univ-lyon1 DOT fr).)
* *Sponsor(s):*
  * [PRABI](http://www.prabi.fr)
  * [FRBioenvis](http://bioenvis.universite-lyon.fr), [Université Lyon 1](http://www.univ-lyon1.fr), [LECA](http://www-leca.ujf-grenoble.fr)

## Galaxy Main

<div class='right solid'><a href='http://usegalaxy.org'><img src="/src/images/Logos/UseGalaxy.orgLogo600.png" alt="usegalaxy.org (Main)" width="300" /></a></div>

* *Link:*
  * [Main](http://usegalaxy.org)
* *Domain/Purpose:*
  * The [Galaxy Project](/src/GalaxyProject/index.md) free public server; biomedical research 
* *Comments:*
  * Strong on genomics; good central repository for shared Galaxy objects.  See [Main](/src/Main/index.md) for more.
* *User Support:*
  * [Support](/src/support/index.md)
* *Quotas:* 
  * Storage and computational quotas.  See [Main](/src/Main/index.md) for details.
* *Sponsor(s):*
  * [Galaxy Project](/src/GalaxyProject/index.md)

## Galaxy Test

* *Link:*
  * [Galaxy Test](https://test.galaxyproject.org/)
* *Domain/Purpose:*
  * [Beta version](/src/Test/index.md) of Galaxy [Main](/src/Main/index.md)
* *Comments:*
  * Not stable or persistent.  See [Test](/src/Test/index.md) for more.
* *User Support:*
* *Quotas:* 
  * Storage and computational quotas.  See [Test](/src/Test/index.md) for details
* *Sponsor(s):*
  * [Galaxy Project](/src/GalaxyProject/index.md)

## GigaGalaxy

 
<div class='right solid'><a href='http://gigagalaxy.net/'><img src="/src/PublicGalaxyServers/GigaGalaxyNebula.png" alt="GigaGalaxy" /></a></div>

* *Link:*
  * [GigaGalaxy](http://gigagalaxy.net/)
* *Domain/Purpose:*
  * Standard Galaxy tools set plus SOAPdenovo and SOAPsnp for *de novo* assembly and SNP calling. 
* *Comments:*
* *User Support:*
* *Quotas:* 
* *Sponsor(s):*
  * [CUHK-BGI Innovation Institution of Trans-Omics (CBIIT)](http://www.cuhk.edu.hk/cbiit/)

## GVL QLD

<div class='right solid'><a href='http://galaxy-qld.genome.edu.au/'><img src="/src/PublicGalaxyServers/GenomicsVirtualLab300.png" alt="Genomics Virtual Lab" height="220" /></a></div>

* *Link:*
  * [Genomics Virtual Lab GVL-QLD](http://galaxy-qld.genome.edu.au/)
* *Domain/Purpose:*
  * General purpose Galaxy based on the [Genomics Virtual Lab platform](https://genome.edu.au/).
* *Comments:*
  * Has 16 virtual CPUs.
* *User Support:*
  * [GVL Help](https://genome.edu.au/wiki/GVL_Help)
  * Follow tutorials at [GVL Learn](https://genome.edu.au/wiki/Learn) and use [Galaxy Tut](http://galaxy-tut.genome.edu.au/)
* *Quotas:*
  * University of Queensland and collaborators: 1TB 
  * Other Australian Researchers: 600GB (make sure you register with your Institute email address) 
  * Other registered users: 100GB 
  * Unregistered users: 5GB
* *Sponsor(s):*
  * [Genomics Virtual Lab](https://genome.edu.au/) and the [University of Queensland Research Computing Centre](http://www.rcc.uq.edu.au/)

## GVL Tutorial

 
<div class='right solid'><a href='http://galaxy-tut.genome.edu.au'><img src="/src/PublicGalaxyServers/GenomicsVirtualLab300.png" alt="Genomics Virtual Lab" height="220" /></a></div>

* *Link:*
  * [Genomics Virtual Lab GVLTut](http://galaxy-tut.genome.edu.au/)
* *Domain/Purpose:*
  * Small Galaxy for Training purposes. Loaded with Histories and Tools for Next Gen Sequencing tutorials. 
* *Comments:*
  * Follow tutorials at [GVL Learn](https://genome.edu.au/wiki/Learn) and use [Galaxy Tut](http://galaxy-tut.genome.edu.au/)
* *User Support:*
  * [Email](mailto:help AT uq DOT edu DOT au)
* *Quotas:*
  * 50GB 
* *Sponsor(s):*
  * [Genomics Virtual Lab](https://genome.edu.au/wiki/About) by [University of Queensland, ](http://www.uq.edu.au) [Victorian Life Sciences Computation Initiative, ](http://www.vlsci.org.au/) [Queensland Facility for Advanced Bioinformatics, ](http://www.qfab.org//) and [Garvan Institute](http://www.garvan.org.au/)

## Insitut Curie

<div class='right solid'><a href='https://galaxy-public.curie.fr/'><img src="/src/PublicGalaxyServers/InstitutCurieGalaxy.png" alt="Institut Curie" /></a></div>

* *Link:*
  * [Institut Curie Galaxy](https://galaxy-public.curie.fr/)
* *Domain/Purpose:*
    General purpose genomic Galaxy server.  Contains tools for Ion Torrent data, many RNA-Seq tools, [ncPRO-seq](https://www.ncbi.nlm.nih.gov/pubmed/23044543), [RSAT](https://www.ncbi.nlm.nih.gov/pubmed/22156162), Nebula tools, copy number and LOH tools, and NGS diagnostic tools.
* *Comments:*
  * Includes a [wealth of published histories](https://galaxy-public.curie.fr/history/list_published).
* *User Support:*
  * Tutorials and screencasts are provided.
  * For any troubleshooting contact [Institut Curie Galaxy Team](mailto:galaxy.contact@curie.fr).
* *Quotas:* 
  * Requires that you create a login to access it. 
  * Only 4 jobs can be run simultaneously for a single user. Other jobs will be put into queue.
  * Jobs running over than 72hrs (after the job actually runs on the server) will automatically been terminated.
  * Each user have a 400Gb quota.
  * Datasets and Histories will be automatically deleted after 10 weeks.
  * *This service comes with absolutely no warranty. The data are not backed up.*
* *Sponsor(s):*
  * [Institut Curie](http://www.curie.fr/)

## NELLY

<div class='right solid'><a href='http://www.bioinformatica.ucr.ac.cr:8080/'><img src="/src/PublicGalaxyServers/UCostaRicaLogo.png" alt="University of Costa Rica" /></a></div>

* *Link:*
  * [NELLY](http://www.bioinformatica.ucr.ac.cr:8080/)
* *Domain/Purpose:*
    "Plataforma de servicios para análisis de datos biomédicos en bioinformática" featuring standard Galaxy Tools
* *Comments:*
* *User Support:*
* *Quotas:* 
  * Requires login, anyone can create a login. 
* *Sponsor(s):*
  * School of Medicine, [Master in Bioinformatics and System Biology](http://www2.sep.ucr.ac.cr/MaestriasAcademicas/CBIOMEDICAS/Infodescrip.html) and [BREL (Bioinformatics Research Laboratory)](http://www.ucrbrel.com/), [University of Costa Rica](http://www.ucr.ac.cr/) 

## Pitagora-Galaxy

<div class='right solid'><a href='http://try.pitagora-galaxy.org/galaxy/'><img src="/src/PublicGalaxyServers/Pitagora.png" alt="Pitagora-Galaxy" width="300" /></a></div>

* *Links:*
  * [Pitagora-Galaxy Server](http://try.pitagora-galaxy.org/galaxy/)
  * [Pitagora-Galaxy Project](http://www.pitagora-galaxy.org/about_en)
  * [Corresponding VM and AMI for developing workflows](/src/VA/PitagoraGalaxy/index.md)
  * [Building Galaxy Japan Community](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Posters/2014PitagoraYanamaka.pdf), poster presented by Ryota	Yamanaka at Genome Informatics 2014.

* *Domain/Purpose:*
  * The public, general purpose Galaxy servers of the [Pitagora-Galaxy Project](http://www.pitagora-galaxy.org/about_en).  This server is intended for testing and sharing.  Heavy analysis should be performed using the project's identical virtual machine (VM) or Amazon Machine Image (AMI).
* *Comments:*
  * We are running a website for sharing users' know-how, and distributing a virtual environment where we configured Galaxy with selected workflows and tools. Now, you can perform our analysis workflows on the following three environments.
    * Access to the public web site for testing.
    * Download the virtual machine to your own PC or server.
    * Launch AMI (Amazon machine image) on AWS cloud.
    Since Pitagora-Galaxy enables us to run the same workflows on any infrastructure and rebuild the environments in any time, we can quickly use Galaxy, and at the same time, ensure the reproducibility of the analyses. In addition, we plan to add a connector for Garuda Desktop, a desktop application platform, for data analyses that cannot be covered only with Galaxy tools.
* *User Support:*
  * Email: [Ryota Yamanaka](mailto:yamanaka AT genome DOT rcast.u-tokyo.ac.jp)
* *Quotas:* 
  * Public Server:
    * See the [instructions](http://try.pitagora-galaxy.org/galaxy/) at Pitagora-Galaxy Server.
  * VM and AMI:
    * None.
* *Sponsor(s):*
  * [Genome Science Division, RCAST, The University of Tokyo](http://www.genome.rcast.u-tokyo.ac.jp/en/)
  * [Laboratory for Disease Systems Modeling, IMS, RIKEN](http://www.riken.jp/en/research/labs/ims/dis_sys_model/)
  * [Database Center for Life Science, ROIS](http://dbcls.rois.ac.jp/en/)

# Domain Servers

Domain servers specialize in either a particular branch of the tree of life or in particular types of analysis.  However, within their specializations, domain servers offer a wide variety of tools.

## ballaxy

<div class='right solid'><a href='https://ballaxy.bioinf.uni-sb.de'><img src="/src/PublicGalaxyServers/BallaxySlide.png" alt="ballaxy"  /></a></div>

* *Links:*
  * [ballaxy Galaxy server](https://ballaxy.bioinf.uni-sb.de)
  * [ballaxy wiki](http://ball-trac.bioinf.uni-sb.de/wiki/ballaxy)
  * [ballaxy using Docker](http://www.ball-project.org/ballaxy)
* *Domain/Purpose:* 
  * Hosts the [BALL (Biochemical Algorithms Library) Project tools](http://www.ball-project.org/), i.e. computer aided drug design and molecular modelling based on protein and ligand structure data.
* *Comments:*
  * [ballaxy](https://ballaxy.bioinf.uni-sb.de) is a workflow framework for structure based computational biology based on the Galaxy workflow engine and the [BALL (Biochemical Algorithms Library) application framework](http://www.ball-project.org/). It is tailored to handle structural molecular data (pdb, mol, mol2, hin, xyz, smiles) and to offer tools for modelling tasks like chemical shift prediction "[NightShift](http://bit.ly/WZPjPt)" or optimal bond order assignment of ligands "BOA Constructor".
  * "[ballaxy: web services for structural bioinformatics](http://bit.ly/1tu5CTI)," by Hildebrandt, *et al.,* *Bioinformatics* (2014) doi: 10.1093/bioinformatics/btu574 
* *User Support:*
  * [Support](http://ball-trac.bioinf.uni-sb.de/wiki/ballaxy#1.1.Support) options include [a wiki](http://ball-trac.bioinf.uni-sb.de/wiki/ballaxy), [tutorials](http://ball-trac.bioinf.uni-sb.de/wiki/ballaxy#point_tutorials), and a [mailing list](http://groups.google.com/group/ball-user-list).
* *Quotas:* 
  * A login is required and everybody can create a login, *but there is no guarantee how long any data will be preserved.*
* *Sponsor(s):*
  * The groups of [Hans-Peter Lenhof](http://www.bioinf.uni-sb.de/HPL) (Saarland University, Saarbrücken, Germany), [Oliver Kohlbacher](http://www-bs.informatik.uni-tuebingen.de) (University of Tübingen, Germany), and [Andreas Hildebrandt](http://bio.informatik.uni-mainz.de/members/andreas.hildebrandt) (University of Mainz, Germany).

## CAPER

<div class='right solid'><a href='http://www.bprc.ac.cn/CAPE'><img src="/src/PublicGalaxyServers/CAPER300.png" alt="CAPER"  /></a></div>

* *Links:*
  * [CAPER](http://www.bprc.ac.cn/CAPE) at [Beijing Proteome Research Center](http://www.bprc.ac.cn/), China
  * "[CAPER 2.0: An Interactive, Configurable, and Extensible Workflow-Based Platform to Analyze Data Sets from the Chromosome-centric Human Proteome Project](http://pubs.acs.org/doi/abs/10.1021/pr400795c)" by Wang, *et al.*, *J. Proteome Res.*, DOI: 10.1021/pr400795c, Publication Date (Web): November 22, 2013
* *Domain/Purpose:* 
  * "An Interactive, Configurable, and Extensible Workflow-Based Platform to Analyze Data Sets from the [Chromosome-centric Human Proteome Project](http://www.c-hpp.org/)"
* *Comments:*
  * The Chromosome-centric Human Proteome Project (C-HPP) aims to map and annotate the entire human proteome by the "chromosome-by-chromosome" strategy. As the C-HPP proceeds, the increasing volume of proteomic data sets presents a challenge for customized and reproducible bioinformatics data analyses for mining biological knowledge. To address this challenge CAPER 2.0 − an interactive, configurable and extensible workflow-based platform is developed for C-HPP data analyses. In addition to the previous visualization functions of [track-view and heatmap-view](http://pubs.acs.org/doi/abs/10.1021/pr300831z), CAPER 2.0 presents a powerful toolbox for C-HPP data analyses and also integrates a configurable workflow system that supports the view, construction, edit, run, and share of workflows. These features allow users to easily conduct their own C-HPP proteomic data analyses and visualization by CAPER 2.0. CAPER 2.0 now presents four specific workflows for finding missing proteins, mapping peptides to chromosomes for genome annotation, integrating peptides with transcription factor binding sites from ENCODE data sets, and functionally annotating proteins.
* *User Support:*
  * [Tutorials](http://61.50.138.124/caper2/static/documentation/index.html)
  * Email: [Dong Li](mailto:lidong DOT bprc AT foxmail DOT com), [Dan Wang](mailto:wangdanburnett@163.com)
* *Quotas:* 
  * Free for academic users. Creating an account is recommended.
* *Sponsor(s):*
  * [Beijing Proteome Research Center (BPRC)](http://www.bprc.ac.cn/), the [Human Liver Proteome Project (HLPP)](http://www.hupo.org/initiatives/human-liver-proteome-project/), and the [Chromosome-centric Human Proteome Project (C-HPP)](http://www.c-hpp.org/)

## Center for Phage Technology (CPT)

<div class='right solid'><a href='https://cpt.tamu.edu/galaxy-public/'><img src="/src/PublicGalaxyServers/CPTLogo.png" alt="Center for Phage Technology (CPT)" width="300" /></a></div>

* *Links:*
  * [Center for Phage Technology (CPT) Galaxy Server](https://cpt.tamu.edu/galaxy-pub/)
  * [Center for Phage Technology (CPT) home page](https://cpt.tamu.edu/)

* *Domain/Purpose:* 
  * Phage biology and automated annotation.
* *Comments:*
  * Server includes many genbank and gff3 processing tools, largely focused on annotation of phages.
* *User Support:*
  * [FAQ](https://cpt.tamu.edu/galaxy-faq-ever-needed-a-question-answered/)
  * Email: [Eric Rasche](mailto:esr+gxfaq@tamu.edu)
* *Quotas:* 
  * An account will bump your quota from 10 Mb to 50 Mb. The administrator can increase your quota on request, and grant you access to the restricted tools (genome assembly, blast, interpro).
* *Sponsor(s):*
  * [Center for Phage Technology (CPT)](https://cpt.tamu.edu/), Texas A&M University

## Cistrome Analysis Pipeline

<div class='right solid'><a href='http://cistrome.org/ap/root'><img src="/src/PublicGalaxyServers/Cistrome.png" alt="Cistrome Analysis Pipeline"  /></a></div>

* *Links:*
  * [Cistrome Analysis Pipeline](http://cistrome.org/ap/root) 
  * Liu T, Ortiz JA, Taing L, Meyer CA, Lee B, Zhang Y, Shin HG, Wong SS, Ma J, Lei Y, Pape UJ, Poidinger M, Chen Y, Yeung K, Brown M, Turpaz Y, Liu XS. [Cistrome: an integrative platform for transcriptional regulation studies](http://genomebiology.com/2011/12/8/r83). *Genome Biol* 2011; 12(8):R83
* *Domain/Purpose:*
  * ChIP-chip/seq and gene expression data 
* *Comments:*
  * The [Cistrome Analysis Pipeline](http://cistrome.org/ap/root) has the standard Galaxy tools, plus 29 additional ChIP-chip and ChIP-seq specific tools, including preliminary peak calling and correlation analyses, downstream genome feature association, gene expression analyses, and motif discovery.
* *User Support:*
  * [Cistrome Google Group](https://groups.google.com/forum/#!forum/cistrome)
* *Quotas:* 
  * Requires login, anyone can create a login. 
* *Sponsor(s):*
  * [Cistrome](/src/Community/Cistrome/index.md)

## CoSSci

<div class='right solid'><a href='http://socscicompute.ss.uci.edu/'><img src="/src/PublicGalaxyServers/CoSSciMap.png" alt="CoSSci; Women's work map: cycles of lines contain local autocorrelation regions"  /></a></div>

* *Link:*
  * [CoSSci Complex Social Science Gateway](http://socscicompute.ss.uci.edu/)
* *Domain/Purpose:* 
  * Tools for solving [Galton's problem](http://en.wikipedia.org/wiki/Galton's_problem) in Comparative Research and complex network problems in Social Science.
* *Comments:*
  * This project uses compute resources provided by the [NSF XSEDE project](https://www.xsede.org/). 
* *User Support:*
  * [Visual Manual](http://intersci.ss.uci.edu/wiki/index.php/Visual_Manual)
* *Quotas:* 

* *Sponsor(s):*
  * [InterSci: Hosted by the Institute for Mathematical Behavioral Science](http://intersci.ss.uci.edu/)

## Dintor

<div class='right solid'><a href='http://dintor.eurac.edu/'><img src="/src/PublicGalaxyServers/Dintor.png" alt="Dintor: Data Integrator Tool Suite"  /></a></div>

* *Link:*
  * [Dintor: Data Integrator Tool Suite](http://dintor.eurac.edu/)
* *Domain/Purpose:* 
  * A "suite of tools that facilitate working with GWA and NGS data" and "offers modules for high level functional annotation of genes and gene products such as gene set prioritization, functional similarity of proteins, or clinical significance of variation data. Each of these tools has been designed to perform a basic task independently."
* *Comments:*
  * Includes "more than thirty modules ready for use by bioinformaticians and biologists working in genomics research."
  * "The Galaxy server has been set up to facilitate access to our **`Dintor`** tools by biologists with little background in bioinformatics. A second, expert mode of invocation is given by command line access to the tool suite, which can be downloaded"
  * [Admin and deployment documentation is available](http://dintor.eurac.edu/doc/doc/index.html).
  * [Dintor: functional annotation of genomic and proteomic data](http://bit.ly/1OzzTvY), Christian X. Weichenberger, Hagen Blankenburg, Antonia Palermo, Yuri D’Elia, Eva König, Erik Bernstein and Francisco S. Domingues, *BMC Genomics* 201516:1081 DOI: 10.1186/s12864-015-2279-5

* *User Support:*
  * [Tutorials](http://dintor.eurac.edu/static/tutorial.html)
  * In addition to help on each of the Galaxy Tool pages, there is [additional help for each Dintor tool here](http://dintor.eurac.edu/doc/doc/tools.html).
* *Quotas:* 
  * Anyone can create a login. Anonymous use is also supported.  
* *Sponsor(s):*
  * The [Center of Biomedicine (CBM)](http://www.eurac.edu/en/research/health/biomed/Pages) at [EURAC research](http://www.eurac.edu/). 

## Galaxy-CEFAP

<div class='right solid'><a href='http://cefap.icb.usp.br/galaxy'><img src="/src/PublicGalaxyServers/CEFAP-Logo.png" alt="Galaxy-CEFAP"  /></a></div>

* *Link:*
  * [Galaxy-CEFAP](http://cefap.icb.usp.br/galaxy)
* *Domain/Purpose:*
  * Galaxy-CEFAP offers a set of tools to perform RNA-Seq and miRNA analysis.
* *Comments:*

* *User Support:*
  * [Email](mailto:geninfo AT icb DOT usp DOT br)
  * [FTP tutorial](http://cefap.icb.usp.br/galaxy/etc/galaxy/web/welcome_upload_ftp.pdf)
* *Quotas:* 
  * Anyone can use the server, but it is necessary to create a login first.
  * Email [geninfo AT icb DOT usp DOT br](mailto:geninfo AT icb DOT usp DOT br) to request an account. 
  * There is a storage quota for all users.
* *Sponsor(s):*
  * [Instituto de Ciências Biomédicas - ICB](http://www3.icb.usp.br/)
  * [Universidade de São Paulo - USP](http://www5.usp.br/)
  * [Fundação de Amparo à Pesquisa de SP - FAPESP](http://www.fapesp.br/)
  * Hosting: [Centro de Facilidades de Apoio à Pesquisa - CEFAP-USP](http://cefap.icb.usp.br/)

## Galaxy Integrated Omics (GIO)

<div class='right solid'><a href='http://gio.sbcs.qmul.ac.uk/'><img src="/src/PublicGalaxyServers/GIOLogo.png" alt="Galaxy Integrated Omics (GIO)" width="300" /></a></div>

* *Link:*
  * [GIO Server](http://gio.sbcs.qmul.ac.uk/)
* *Domain/Purpose:*
  * "Proteomics Informed by Transcriptomics (PIT) methodology described in [Evans et al. 2012](http://www.ncbi.nlm.nih.gov/pubmed/23142869), and selection of surrogate peptides for targeted proteomics."
* *Comments:*
  * "Galaxy-based Integrated Omics (GIO) is a curated collection of new and pre-existing open source tools brought together for proteomics applications."
  * See [Galaxy Integrated Omics: Web-based standards-compliant workflows for proteomics informed by transcriptomics](http://www.mcponline.org/content/14/11/3087), Jun Fan, Shyamasree Saha, Gary Barker, Kate J. Heesom, Fawaz Ghali, Andrew R. Jones, David A. Matthews and Conrad Bessant, *Molecular & Cellular Proteomics*, 14, 3087-3093. 
* *User Support:*
  * [Tutorial 1:Getting started with GIO](http://gio.sbcs.qmul.ac.uk/static/Tutorial1.pdf)
  * [Tutorial 2:Getting started with GIO workflows](http://gio.sbcs.qmul.ac.uk/static/Tutorial2.pdf)
  * [Tutorial 3:Proteomics Informed by Transcriptomics (PIT)](http://gio.sbcs.qmul.ac.uk/static/Tutorial3.pdf)
  * [Tutorial 4:Targeted proteomics](http://gio.sbcs.qmul.ac.uk/static/Tutorial4.pdf)
  * For draft documentation please visit the [GIO repository](https://code.google.com/p/gio-repository/). 
* *Quotas:* 
* *Sponsor(s):*
  * "This project is led by [Conrad Bessant](http://www.bessantlab.org/) at Queen Mary and [David Matthews](http://www.bristol.ac.uk/infection-immunity/people/person/37949) at Bristol, with additional contributions from the groups of [Andy Jones](http://pcwww.liv.ac.uk/~jonesar/jonesar.html) at Liverpool and [Simon Hubbard](http://www.manchester.ac.uk/research/simon.hubbard/) at Manchester. GIO development was supported by BBSRC TRDF2 grants BB/L018438/1 (Proteomics Goes Viral), BB/K016075/1 (Galaxy Workflows for Proteomics Informed by Transcriptomics) and BB/K004123/1 (Integrating Genomes and Proteomes on the Cloud). Lead developer is [Jun Fan](http://www.sbcs.qmul.ac.uk/staff/drjunfan.html)."

## Galaxy-P

<div class='right solid'><a href='https://usegalaxyp.org/'><img src="/src/PublicGalaxyServers/GetGalaxyPHomePage.png" alt="Galaxy-P" width="300" /></a></div>

* *Links:*
  * [Use Galaxy-P](https://usegalaxyp.org/)
  * Galaxy-P user guide ([web](http://bit.ly/usegalaxyp-guide) / [pdf](http://bit.ly/usegalaxyp-guide-pdf))
* *Domain/Purpose:*
  * Galaxy-P is a multiple 'omics' data analysis platform with particular emphasis on mass spectrometry based proteomics. Galaxy-P is developed at the [University of Minnesota](http://umn.edu/), deployed at the [Minnesota Supercomputing Institute](http://msi.umn.edu/).
* *Comments:*
  * As of 2013/08:
      Pending imminent hardware upgrades, usegalaxyp.org is running with fairly limited computational resources and on disk that is not backed up. Galaxy-P is under active development - things will break and things will change, so your patience is requested.
  * [Publications using Galaxy-P](http://z.umn.edu/galaxypreferences)

* *User Support:*
  * [MSI Email Support](mailto:help@msi.umn.edu)
  * We have created a [publicly-available Google Group](http://z.umn.edu/galaxypgroup) to facilitate questions, feedback and suggestions for Galaxy-P from both users and developers.  Please [request to join the group](http://z.umn.edu/galaxypgroup) to stay updated and be involved.
  * Please follow our Galaxy-P twitter account, [@usegalaxyp](http://twitter.com/usegalaxyp).  It’s a great way to stay updated on the most recent developments:  
  * *Quotas:* 
* *Sponsor(s):*
  * [Minnesota Supercomputing Institute](http://msi.umn.edu/)

## Galaxy PGTB (Virtual Biodiversity Lab)

<div class='right solid'><a href='http://www.pgtb.u-bordeaux2.fr/'><img src="/src/PublicGalaxyServers/pgtb.png" alt="PGTB Galaxy"  /></a></div>

* *Links:*
  * **[PGTB Galaxy - Virtual Biodiversity Lab](https://galaxy-pgtp.pierroton.inra.fr/)**
  * **[Plateforme Genome Transcriptome de Bordeaux](http://www.pgtb.u-bordeaux2.fr/)**
* *Domain/Purpose:*
  * This is a standard Galaxy instance implemented with specific tools for Biodiversity (Biodiversity Virtual Lab) and NGS (Ion Torrent from the PGTB facility) analysis. 
* *Comments:*
  * Due to current disk space limitations, registration is resquired. Account request on demand at [Email](mailto:contact DOT pgtp AT pierroton DOT inra DOT fr).
* *User Support:*
  * [Email](mailto:contact DOT pgtp AT pierroton DOT inra DOT fr)
* *Quotas:* 
  * Registered users: 50GB;
* *Sponsor(s):*
  * [INRA](http://www.inra.fr/) and [Equipex Xyloforest](http://www.xyloforest.org/) and [Labex CEBA](http://www.labex-ceba.fr/) and [Plateforme Genome Transcriptome de Bordeaux](http://www.pgtb.u-bordeaux2.fr/)

## Genomic Hyperbrowser

<div class='right solid'><a href='http://hyperbrowser.uio.no/hb/'><img src="/src/PublicGalaxyServers/GenomicHyperbrowser.png" alt="Genomic Hyperbrowser"  /></a></div>

* *Link:*
  * [Genomic Hyperbrowser](http://hyperbrowser.uio.no/hb/)
* *Domain/Purpose:*
  * "statistical methodology and computing power to handle a variety of biological inquires on genomic datasets" 
* *Comments:*
  * See "[The Genomic HyperBrowser: an analysis web server for genome-scale data](http://nar.oxfordjournals.org/content/41/W1/W133.full)," by Sandve, *et al.*,  *Nucl. Acids Res*. (1 July 2013) 41 (W1): W133-W141. 
* *User Support:*
  * [Help documentation](http://sites.google.com/site/hyperbrowserhelp/) and [email support](mailto:hyperbrowser DASH requests AT usit DOT uio DOT no)
* *Quotas:* 
* *Sponsor(s):*
  * [Norwegian Functional Genomics Program](http://www.bioinfo.no/)

## Gene Ontololgy (GO)

<div class='right solid'><a href='http://galaxy.berkeleybop.org/'><img src="/src/PublicGalaxyServers/GOGalaxy.png" alt="GO Galaxy"  /></a></div>

* *Link:*
  * [GO Galaxy](http://galaxy.berkeleybop.org/)
* *Domain/Purpose:*
  * The [Gene Ontology Project's](http://geneontology.org/) Galaxy installation.
* *Comments:*
  * A Galaxy install tailored for manipulating ontologies. Includes OBO, OWL, Pellet and other annotation manipulation tools.
* *User Support:*
  * [GO Galaxy Wiki Page](http://wiki.geneontology.org/index.php/Galaxy)
* *Quotas:* 
* *Sponsor(s):*
  * [Gene Ontology Project](http://geneontology.org/)

## Image Analysis and Processing Toolkit

<div class='right solid'><a href='http://cloudimaging.net.au/'><img src="/src/PublicGalaxyServers/ImageAnalysisToolkit.png" alt="Image Analysis and Processing ToolKit"  /></a></div>
* *Links:*
  * [Image Analysis and Processing Toolkit Server](http://cloudimaging.net.au/)
  * [Project blog](http://cloudimaging.blogspot.com.au/)
* *Domain/Purpose:*
  * Image analysis and processing.
* *Comments:*
  * This service provides a novel way of carrying out image analysis, reconstruction and processing tasks using cloud based service provided on the Australian [National eResearch Collaboration Tools and Resources (NeCTAR](http://www.nectar.org.au)) infrastructure. The toolbox allows access to a wide range of useful blocks of functionalities (imaging functions) that can be connected together in workflows allowing creation of even more complex algorithms that can be re-run on different data sets, shared with others or additionally adjusted. The functions given are in the area of cellular imaging, advanced X-ray image analysis, computed tomography and 3D medical imaging and visualisation. The service is currently available [on the website](http://www.cloudimaging.net.au).
* *User Support:*
  * [Email](mailto:admin@cloudimaging.net.au)
  * [Video tutorials](http://www.youtube.com/user/CloudImaging)
* *Quotas:* 
  * A login is required to access the site.  Logins are free and can be [requested via email](mailto:admin@cloudimaging.net.au)
* *Sponsor(s):*
  * [NeCTAR](http://www.nectar.org.au) and [CSIRO](http://www.csiro.au/)

## ImmPort Galaxy

<div class='right solid'><a href='http://immportgalaxy.org/'><img src="/src/PublicGalaxyServers/ImmPort.png" alt="ImmPort Galaxy" width="300" /></a></div>
* *Links:*
  * [ImmPort Galaxy](http://immportgalaxy.org/)
* *Domain/Purpose:*
  * Flow Cytometry Analysis.
* *Comments:*
  * [ImmPort Galaxy](http://immportgalaxy.org/) hosts [ImmPort](http://www.immport.org/)'s flow analysis tools.
  * See [FlowGalaxy: Developing a workflow for Flow Cytometry Analysis in Galaxy](http://sched.co/745G), presented by [Cristel Thomas](http://twitter.com/crstlthms) at [GCC2016](https://gcc16.sched.org/).
  * [ImmPort on Twitter](http://twitter.com/ImmPort)

* *User Support:*
  * [Help page](http://immportgalaxy.org/static/immportgalaxyhelp.html)    
  * [Videos](https://www.youtube.com/channel/UC8lQSx1Z7sMFm07wfqI-_kA) 
  * [Email](mailto:immport-galaxy@immport.org)
  * Tutorials to come.
* *Quotas:* 
  * Anyone can use this server. No quotas for now.
* *Sponsor(s):*
  * [ImmPort](http://immport.org/immport-open/public/home/home)
  * [NIAID](http://www.niaid.nih.gov/Pages/default.aspx)
  * [DAIT](https://www.niaid.nih.gov/about/organization/dait/pages/default.aspx)
  * [NIH](https://www.nih.gov/)
  * [HHS](http://www.hhs.gov/)

## International Rice Research Institute (IRRI) Galaxy

<div class='right solid'><a href='https://sites.google.com/a/irri.org/iric/resources/iric-data-portal '><img src="/src/PublicGalaxyServers/IRRI.png" alt="IRRI Galaxy"  /></a></div>
* *Links:*
  * [IRRI Galaxy](http://175.41.147.71:8080/) part of the [IRIC Data and Analysis Portal](https://sites.google.com/a/irri.org/iric/resources/iric-data-portal)
* *Domain/Purpose:*
  * Bioinformatics workbench, with rice-specific data (i.e. genomes) and tools (mostly specialized for the [IRRI Genotyping Service Laboratory](http://gsl.irri.org/)) installed. 
* *Comments:*
  * See
    * "The IRRI Genotyping Service Laboratory Galaxy: Bioinformatics for Rice Scientists" ([PDF](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/ICG2013MauleonIRRI.pdf), [SlideShare](http://www.slideshare.net/GigaScience/ramil-mauleon-galaxy-bioinformatics-for-rice-scientists)) presented by [Ramil Mauleon](http://www.icg-8.org/navigation/show_navigation?nid=10507), at [The 8th International Conference on Genomics (ICG-8)](http://www.icg-8.org/),  Shenzhen, China
* *User Support:*

   * 
* *Quotas:* 

   * 
* *Sponsor(s):*
  * [International Rice Research Institute (IRRI)](http://irri.org/)

## LAPPS Grid

<div class='right solid'><a href='http://galaxy.lappsgrid.org/'><img src="/src/PublicGalaxyServers/LAPPSGrid.png" alt="LAPPS Grid Galaxy Workflow Engine"  /></a></div>
* *Links:*
  * [LAPPS Grid Galaxy Workflow Engine](http://galaxy.lappsgrid.org/), part of the [Language Application Grid](http://www.lappsgrid.org/)

* *Domain/Purpose:*
  * "An open, interoperable web service platform for natural language processing (NLP) research and development. The LAPPS Grid provides facilities to select from hundreds of NLP tools to create workflows, composite services, and applications, and to evaluate, reproduce, and share them with others."
* *Comments:*
  * "This is a **Work In Progress**. Many of the services here are undergoing active development and their behaviour is likely to change without notice."
  * See [The Language Application Grid](http://link.springer.com/chapter/10.1007/978-3-319-31468-6_4) by Nancy Ide, James Pustejovsky, Christopher Cieri, Eric Nyberg, Denise DiPersio, Chunqi Shi, Keith Suderman, Marc Verhagen, Di Wang, Jonathan Wright. Worldwide Language Service Infrastructure, Volume 9442 of the series Lecture Notes in Computer Science pp 51-70
* *User Support:*
  * [Landing page](http://galaxy.lappsgrid.org/) includes a simple tutorial.
* *Quotas:* 
  * Anyone can create a login, or it can be used anonymously
* *Sponsor(s):*
  * See the [LAPPS Grid Participants page](http://www.lappsgrid.org/participants/).  Includes 
    * [Vassar College](http://www.cs.vassar.edu/)
    * [Brandeis University](http://www.cs.brandeis.edu/)
    * [Carnegie-Mellon University](http://www.lti.cs.cmu.edu/)
    * [University of Pennsylvania](http://www.ldc.upenn.edu/)

## MISSISSIPPI

<div class='right solid'><a href='http://mississippi.fr/'><img src="/src/PublicGalaxyServers/MISSISSIPPILogo.png" alt="MISSIPPI" width="300" /></a></div>

* *Link:*
  * [MISSISSIPPI Server](http://mississippi.fr/)
* *Domain/Purpose:*
  * Support for analyses of RNA and small RNA sequencing datasets as well as for epigenetics or metagenomics studies.
* *Comments:*
  * See [ARTbio on Slideshare](http://fr.slideshare.net/christopheantoniewski/linked-in-summary-50629359)
* *User Support:*
  * Contact [Christophe Antoniewski](mailto:christophe.antoniewski@upmc.fr)
* *Quotas:* 

    * 
* *Sponsor(s):*
  * The ARTbio bioinformatics facility of the  [Institut de Biologie Paris Seine](http://www.ibps.upmc.fr/en) based at the [University Pierre & Marie Curie](http://www.upmc.fr/en/index.html).

## Nebula

<div class='right solid'><a href='http://nebula.curie.fr/'><img src="/src/PublicGalaxyServers/Nebula.png" alt="Nebula"  /></a></div>

* *Link:*
  * [Nebula](http://nebula.curie.fr/)
* *Domain/Purpose:*
  * "allows users (Bioinformaticians as far as Biologists) to analyze their ChIP-seq data."
* *Comments:*
  * "Nebula is a web service provided by Institut Curie."
* *User Support:*
  * Email (see [server home page](http://nebula.curie.fr/))
* *Quotas:* 
  * Only 10 jobs can be run simultaneously. Other jobs will be put into queue.
  * Jobs running over than 24hrs (after the job actually runs on the server) will automatically been terminated.
  * Each registered user have a 50GB quota and unregistered user have a 15GB quota (which is enough to run the tutorial with examples).
  * Datasets will be automatically deleted after 4 weeks.
  * Unused accounts will be automatically deleted after 8 weeks.
* *Sponsor(s):*
  * [Institut Curie](http://curie.fr)

## Oqtans

<div class='right solid'><a href='http://galaxy.inf.ethz.ch'><img src="/src/PublicGalaxyServers/Oqtans.png" alt="Oqtans"  /></a></div>

* *Links:*
  * [Oqtans Galaxy Server](http://galaxy.inf.ethz.ch)<br />
  * a [cloud machine image with a demo instance](http://cloud.oqtans.org/)
* *Domain/Purpose:*
  * Customized Galaxy, extended with machine learning based tools for sequence and tiling array data analysis. 
* *Comments:*
  * The Oqtans tool suite is provided in five incarnations: 
    1. [a cloud machine image](http://cloud.oqtans.org/)
    1. as a [public Galaxy instance](http://galaxy.inf.ethz.ch)
    1. as a [git repository](http://oqtans.org/git)
    1. most of these tools are moreover available from the Galaxy Toolshed 
    1. a preconfigured Amazon Machine Image (AMI, `ami-65376a0c`) and share string (`cm-ba5c56b95144e564f70e5762dc5fa177/shared/2013-11-07--22-16/`) to launch Galaxy CloudMan using sharing instance functionality.
  * Oqtans capabilities are shown with [Galaxy Pages](http://oqtans.org/usecases) for which all data, parameters, intermediate output, and final results are made public.<br />
  * See *[Oqtans: The RNA-seq Workbench in the Cloud for Complete and Reproducible Quantitative Transcriptome Analysis](http://bioinformatics.oxfordjournals.org/content/early/2014/01/10/bioinformatics.btt731.abstract?keytype=ref&ijkey=u23qkvDAUTdBog1)*, by Sreedharan, *et al.,* *Bioinformatics* (2014), doi: 10.1093/bioinformatics/btt731
* *User Support:*
  * For problems with any of the non-standard tools, please contact the [MLB Galaxy Support Team](mailto:galaxy AT raetschlab DOT org). 
* *Quotas:* 
* *Sponsor(s):*
  * [Machine Learning in Biology (MLB) Group](http://cbio.mskcc.org/research/ratsch-research-group/) at [cBio@MSKCC](http://cbio.mskcc.org/) in New York City, United States.

## Orione

<div class='right solid'><a href='http://orione.crs4.it/'><img src="/src/PublicGalaxyServers/OrioneLogo.png" alt="Orione"  /></a></div>

* *Links:*
  * [Orione](http://orione.crs4.it/) server
  * "[Orione, a web-based framework for NGS analysis in microbiology](http://dx.doi.org/10.1093/bioinformatics/btu135)," by Gianmauro Cuccuru, Massimiliano Orsini, Andrea Pinna, Andrea Sbardellati, Nicola Soranzo, Antonella Travaglione, Paolo Uva, Gianluigi Zanetti, Giorgio Fotia; *Bioinformatics* (10 March 2014)
* *Domain/Purpose:* 
  * A Galaxy based web server for microbiology. [Orione](http://orione.crs4.it/) includes all post mapping or assembling steps from scaffolding to complete annotation pipelines.
* *Comments:*
  * From the [GCC2013](/src/events/GCC2013/index.md) poster "[Engaging Galaxy in Microbiology](/src/events/GCC2013/Abstracts/Posters/index.md#p7-engaging-galaxy-in-microbiology)"
      We started on selecting the relevant software in the microbiology area, developing then all the necessary tools to integrate them into the Galaxy ecosystem. In addition to that, we made available several specialized workflows covering major applications such as bacterial resequencing, de novo assembly, scaffolding, bacterial RNA-seq, gene annotation and metagenomics. Orione provides additional capabilities to perform integrative, reproducible and transparent bioinformatic data analysis in microbiology thus expanding the constellation of specialized Galaxy based web servers as [Nebula](/src/PublicGalaxyServers/index.md#nebula), [Cistrome](/src/PublicGalaxyServers/index.md#cistrome) and several others.
* *User Support:*
  * [email](mailto:galaxyadmin AT crs4 DOT it)
* *Quotas:* 
  * This installation of Galaxy has been configured such that anonymous users can operate in a limited way. If you need to store data on this website and/or use advanced Galaxy features such as sharing and workflows, please send us an [email](mailto:galaxyadmin AT crs4 DOT it) with a short request.
* *Sponsor(s):*
  * The financial support of [Regione Autonoma della Sardegna](http://www.regione.sardegna.it/ ) (RAS) is gratefully acknowledged.

## OSDDlinux LiveGalaxy

<div class='right solid'><a href='http://osddlinux.osdd.net:8001/'><img src="/src/PublicGalaxyServers/OSDDLinuxLiveGalaxyHomePage300.png" alt="OSDDlinux LiveGalaxy"  /></a></div>

* *Links:*
  * [OSDDlinux LiveGalaxy](http://osddlinux.osdd.net:8001/), part of the [OSDD Portal](http://sysborg2.osdd.net).
  * *Customized Galaxy with Applications as Web Services and on the Grid for Open Source Drug Discovery*, presentation by Anshu Bhardwaj and Chintalapati Janaki at [GCC2011](http://wiki.galaxyproject.org/Events/GCC2011) ([Slides](PLACEHOLDER_ATTACHMENT_URL/src/events/GCC2011/OpenSourceDrugDiscovery.pdf), [Video](http://vimeo.com/24870112)).
  * "[QSAR-Based Models for Designing Quinazoline/Imidazothiazoles/Pyrazolopyrimidines Based Inhibitors against Wild and Mutant EGFR](http://www.plosone.org/article/info%3Adoi%2F10.1371%2Fjournal.pone.0101079)" by Chauhan, *et al.* *PLOS One*,   DOI: 10.1371/journal.pone.0101079
* *Domain/Purpose:* 
  * [OSDDlinux LiveGalaxy](http://osddlinux.osdd.net:8001/) exposes the tools that are included in [OSDDlinux](http://osddlinux.osdd.net/), "a customized linux operating system for drug discovery that integrates open source software, libraries, workflows and web services in linux for creating environment for drug discovery."   OSDDLinux contains a Galaxy instance with applications for Drug Discovery.
* *Comments:*
  * [OSDDlinux LiveGalaxy](http://osddlinux.osdd.net:8001/) integrates GPSR1.0, GPSR2.0 along with the [webservers](http://osddlinux.osdd.net/livew.php) and the [standalone software](http://osddlinux.osdd.net/stand.php) supported by OSDDlinux.  See the [complete list of tools and services](http://osddlinux.osdd.net/liveg) included in OSDDlinux LiveGalaxy. 
* *User Support:*
  * [Web form](http://crdd.osdd.net/osddlinux/feed.php) or [Email](mailto:osddlinux AT gmail DOT com)
* *Quotas:* 
* *Sponsor(s):*
  * The [Open Source Drug Discovery Project](http://www.osdd.net/) and the [OSDD Linux Project](http://osddlinux.osdd.net/) under the direction of [Dr. GPS Raghava](http://www.imtech.res.in/raghava/about.html) of the [CSIR-Institute of Microbial Technology (IMTECH)](http://www.imtech.res.in/).

## OSDD Molecular Property Diagnostic Suite (MPDS)

<div class='right solid'><a href='http://mpds.osdd.net/'><img src="/src/PublicGalaxyServers/OSDD_MPDS.png" alt="Molecular Property Diagnostic Suite (MPDS)"  /></a></div>

* *Links:*
  * [Molecular Property Diagnostic Suite (MPDS)](http://mpds.osdd.net/), an OSDD Chemoinformatics Portal
* *Domain/Purpose:* 
  * "The mission of the OSDD-Chemoinformatics is to promote and co-ordinate world-class research (and training) in Chemoinformatics within India and to provide state-of-the-art Chemoinformatics support to Indian researchers working on myriad aspects of Chemoinformatics. Present portal introduces readers to MPDS (Molecular Property Diagnostic Suite), a software toolset that rationally diagnoses (druggable) molecules."
* *Comments:*
  * "MPDS 1.0 consists of six modules. It covers informatics (DataBases, File format conversion), structure and analogue based drug design approaches (Property calculation, QSAR, Docking)."
* *User Support:*
  * [Contacts](http://mpds.osdd.net/galaxy/static/contact.htm)
* *Quotas:* 

* *Sponsor(s):*
  * Developed under the broad initiative of [OSDD (Open Source Drug Discovery)](http://www.osdd.net/) of [CSIR (Council of Scientific and Industrial Research, Govt. of India)](http://www.csir.res.in/home.asp). The site is being hosted from [IICT](http://www.iictindia.org/), Hyderabad, India.

## PopGenIE / PlantGenIE

<div class='right solid'><a href='http://galaxy.popgenie.org:8080/'><img src="/src/PublicGalaxyServers/PopGemIE.png" alt="PopGenIE"  /></a></div>

* *Link:*
  * [PlantGenIE](http://galaxy.plantgenie.org:8080/)
* *Domain/Purpose:*
  * The [Populus Genome Integrative Explorer](http://popgenie.org/) Galaxy instance.
* *Comments:*
  * See "[The Plant Genome Integrative Explorer Resource: PlantGenIE.org](http://dx.doi.org/10.1111/nph.13557)" by David Sundell, Chanaka Mannapperuma, Sergiu Netotea, Nicolas Delhomme, Yao-Cheng Lin, Andreas Sjödin, Yves Van de Peer, Stefan Jansson, Torgeir R. Hvidsten, Nathaniel R. Street, *New Phytologist* (July 2015), doi:10.1111/nph.13557 
* *User Support:*
* *Quotas:* 
  * Storage quotas
* *Sponsor(s):*
  * [Plant Physiology, University of Umeå](http://www.plantphys.umu.se/)

## RepeatExplorer

<div class='right solid'><a href='http://repeatexplorer.umbr.cas.cz/'><img src="/src/PublicGalaxyServers/RepeatExplorerHomePage300.png" alt="RepeatExplorer"  /></a></div>
 
* *Link:*
  * [RepeatExplorer](http://repeatexplorer.umbr.cas.cz/)
  * [Workshop on the Application of Next Generation Sequencing to Repetitive DNA Analysis in Plants](http://w3lamc.umbr.cas.cz/repeatexplorer/?page_id=14), České Budějovice, Czech Republic, May 26-28 2015 
* *Domain/Purpose:*
  * Utilities for [Graph-based clustering and characterization of repetitive sequences in next-generation sequencing data](http://www.biomedcentral.com/1471-2105/11/378) and tools for the detection of transposable element protein coding domains
* *Comments:* 
* *User Support:*
* *Quotas:* 
  * Disk space is limited to 200MB for unregistered users. Registered users are free to use up to 50GB. 
* *Sponsor(s):*
  * [Laboratory of Molecular Cytogenetics](http://w3lamc.umbr.cas.cz/lamc/), [Institute of Plant Molecular Biology](http://www.umbr.cas.cz/), [Biology Centre ASCR](http://www.bc.cas.cz/en/) 

## RiboGalaxy

<div class='right solid'><a href='http://ribogalaxy.ucc.ie/'><img src="/src/PublicGalaxyServers/RiboGalaxyLogo.png" alt="RiboGalaxy" width="300" /></a></div>
 
* *Link:*
  * [RiboGalaxy](http://ribogalaxy.ucc.ie/)
* *Domain/Purpose:*
  * [RiboGalaxy](http://ribogalaxy.ucc.ie/) provides on-line tools for the analysis and visualization of ribo-seq data obtained with the ribosome profiling technique.
* *Comments:* 
  * [RiboGalaxy](http://ribogalaxy.ucc.ie) is a freely available web server for processing and analysing ribosome profiling (ribo-seq) data with the visualization functionality provided by [GWIPS-viz](http://gwips.ucc.ie/). RiboGalaxy provides a compact suite of tools specifically tailored for the alignment and visualization of ribo-seq and corresponding mRNA-seq data. Users can take advantage of the published workflows on RiboGalaxy which reduce the multi-step alignment process to a minimum of inputs.
  * Audrey M. Michel, James P.A. Mullan, Vimalkumar Velayudhan, Patrick B.F. O'Connor, Claire A. Donohue & Pavel V. Baranov (2016): [RiboGalaxy: a browser based platform for the alignment, analysis and visualization of ribosome profiling data](http://www.tandfonline.com/doi/abs/10.1080/15476286.2016.1141862), *RNA Biology*, DOI: 10.1080/15476286.2016.1141862
* *User Support:*
  * RiboGalaxy has its own dedicated [Help page](http://ribogalaxy.ucc.ie/static/help.html). Please post any questions you may have on our [RiboGalaxy Forum](http://gwips.ucc.ie/Forum/).
* *Quotas:* 
  * Anonymous users can use RiboGalaxy. However, the upload and processing of datasets larger than 2GB and the use of advanced features such as published workflows, will require the user to be registered on RiboGalaxy. 
* *Sponsor(s):*
  * RiboGalaxy is supported by [Science Foundation Ireland](http://www.sfi.ie/).

## RNA-Rocket @ Pathogen Portal

<div class='right solid'><a href='http://rnaseq.pathogenportal.org/'><img src="/src/PublicGalaxyServers/PathogenPortalHome300.png" alt="RNA-Rocket @ Pathogen Portal"  /></a></div>

* *Link:*
  * [RNA-Rocket at Pathogen Portal](http://rnaseq.pathogenportal.org/)
  * [RNA-Rocket: an RNA-Seq analysis resource for infectious disease research](http://bioinformatics.oxfordjournals.org/content/early/2015/02/02/bioinformatics.btv002.full), by Warren *et al.*,  *Bioinformatics* (2015) doi: 10.1093/bioinformatics/btv002 
  * [VBI-led Team Introduces Infectious Disease-focused Resource for Analyzing RNA-seq Data](https://www.genomeweb.com/infectious-disease/vbi-led-team-introduces-infectious-disease-focused-resource-analyzing-rna-seq), by [Andrea Anderson](https://www.genomeweb.com/about-us/our-staff/andrea-anderson), *[GenomeWeb](https://www.genomeweb.com/)*, February 3, 2015
  * [Database resources for the tuberculosis community](http://www.sciencedirect.com/science/article/pii/S147297921200203X)" by Lew, *et al.*, *Tuberculosis*, Volume 93, Issue 1, January 2013, Pages 12–17
* *Domain/Purpose:*
  * From "[Database resources for the tuberculosis community](http://www.sciencedirect.com/science/article/pii/S147297921200203X)" by Lew *et al.*<div class='indent'>[Pathogen Portal](http://www.pathogenportal.org) supports comparative analysis of host response to pathogens. It provides an RNA-Seq pipeline to characterize the transcriptome of all NIAID Bioinformatic Resource Center (BRC) pathogens and their key hosts. It can analyze transcriptome data for genomes stored at [EuPathDB](http://www.eupathdb.org/), [PATRIC](http://www.patricbrc.org/), and [VectorBase](http://www.vectorbase.org/). The pipeline is built on Galaxy. Galaxy has been modified to simplify RNA-Seq analysis for *informatics-naïve, biologically focused* users and provide a guided experience to quality control of read data, read mapping, assembling transcripts, estimating gene expression values, and doing differential expression analysis.</div>
* *Comments:*
  * Map your RNA-Seq Reads to Reference Genomes: Align your Illumina fastQ reads (gzipped fastQ files accepted) against any sequenced genome from [EuPathDB](http://www.eupathdb.org/), [PATRIC](http://www.patricbrc.org/), and [VectorBase](http://www.vectorbase.org/). <br />Estimate Gene Expression Values: Obtain BAM files for the resulting alignments and FPKM expression values for annotated genes and novel transcripts. <br />
  * The [RNA-Rocket](http://rnaseq.pathogenportal.org/) implementation was also covered by Andrew Warren at the [May 2013 GalaxyAdmins meetup](/src/Community/GalaxyAdmins/Meetups/2013_05_15/index.md). A [Screencast](https://globalcampus.uiowa.edu/play_recording.html?recordingId=1262346908659_1368628622535) and the [slides](PLACEHOLDER_ATTACHMENT_URL/src/Community/GalaxyAdmins/Meetups/2013_05_15/201305PathogenPortalSlides.pdf) are both available.
* *User Support:*
* *Quotas:* 
  * Need to create a login 
* *Sponsor(s):*
  * The Pathogen Portal and PATRIC projects have been funded in whole or in part with Federal funds from the [National Institute of Allergy and Infectious Diseases](http://www.niaid.nih.gov/), [National Institutes of Health](http://nih.gov/), [Department of Health and Human Services](http://www.hhs.gov/), under Contract No. HHSN272200900040C, awarded to [BWS Sobral](http://www.vbi.vt.edu/faculty/personal/Bruno_Sobral).

## RNA-Seq Portal

<div class='right solid'><a href='http://weizhongli-lab.org/RNA-seq/'><img src="/src/PublicGalaxyServers/RNA-SeqPortal.png" alt="RNA-Seq Portal - Analyzing RNA-seq Data for Agricultural Animal Species" width="300" /></a></div>

* *Links:*
  * [RNA-Seq Portal](http://weizhongli-lab.org/RNA-seq/)
  * [Galaxy server](http://weizhongli-lab.org:8088/)

* *Domain/Purpose:*
  * Analyzing RNA-seq Data for Agricultural Animal Species.
* *Comments:*
  * From the [portal landing page](http://weizhongli-lab.org/RNA-seq/):
      The goal of this project is to develop a web portal with integrated tools for RNA-seq based gene expression analysis for agricultural animals.
      * improve genome annotation of agricultural animal species, including (but not limiting to) cattle, pig, chicken, turkey, horse, sheep, and goat as well as catfish;
      * develop and integrate needed bioinformatics tools and pipelines, visualization interfaces, and statistical methods;
      * build a web portal that enable RNA-seq based transcriptomics analysis in aforementioned animal species.
    * [Web-based bioinformatics workflows for end-to-end RNA-seq data computation and analysis in agricultural animal species](https://bmcgenomics.biomedcentral.com/articles/10.1186/s12864-016-3118-z), Weizhong Li, R. Alexander Richter, Yunsup Jung, Qiyun Zhu and Robert W. Li. *BMC Genomics* 2016 17:761 DOI: 10.1186/s12864-016-3118-z
* *User Support:*
  * [Example usage](http://weizhongli-lab.org:8088/) (see center panel)
  * [Web support](http://weizhongli-lab.org/RNA-seq/contact/)
* *Quotas:* 

* *Sponsor(s):*
  * The project is developed by [Weizhong Li's lab](http://weizhongli-lab.org/) at [J. Craig Venter Institute](http://jcvi.org/) with support from NIFA (award #2013-67015-21428). 

## Stem Cell Discovery Engine

<div class='right solid'><a href='http://discovery.hsci.harvard.edu/galaxy'><img src="/src/PublicGalaxyServers/SCDE.png" alt="Stem Cell Discovery Engine (SCDE)"  /></a></div>

* *Link:*
  * [Stem Cell Discovery Engine (SCDE)](http://discovery.hsci.harvard.edu/galaxy)
* *Domain/Purpose:*
  * Database of curated cancer stem cell experiments coupled to Galaxy.
* *Comments:*
  * Includes tools for stem cell gene list comparisons. From the web site: <br />→ Compare your genes to curated experiments from the [SCDE Bioinvestigation Index](http://discovery.hsci.harvard.edu/bioinvindex/)<br />→ Compare your uploaded list ([SCDE ListMatch](http://discovery.hsci.harvard.edu/galaxy/tool_runner?tool_id=SCDEListMatch)) or multiple lists ([SCDE ListCompare](http://discovery.hsci.harvard.edu/galaxy/tool_runner?tool_id=SCDEListMatch)) against curated gene signatures from the [GeneSigDB](http://compbio.dfci.harvard.edu/genesigdb/index.jsp) and [mSigDB databases](http://www.broadinstitute.org/gsea/msigdb/index.jsp)<br />→ Compare your genes against pathways in [WikiPathways](http://www.wikipathways.org/), and show the overlap on a pathway diagram 
* *User Support:*
* *Quotas:* 
* *Sponsor(s):*
  * [Hide Lab](http://web.me.com/winhide/Win_Hide_Lab/Home.html) @ [Harvard School of Public Health](http://www.hsph.harvard.edu/), [Harvard Stem Cell Institute](http://www.hsci.harvard.edu/). 

## South Green 

<div class='right solid'><a href='http://galaxy.southgreen.fr/galaxy/'><img src="/src/PublicGalaxyServers/SouthGreenHomePage.png" alt="South Green"  /></a></div>

* *Link:*
  * [South Green Galaxy](http://galaxy.southgreen.fr/galaxy/)
* *Domain/Purpose:*
  * "[South Green Bioinformatics Platform (SGBP)](http://southgreen.cirad.fr/) is a bioinformatics platform applied to the genomic resource analysis of southern and Mediterranean plants."
* *Comments:*
  * Supports many custom tools and data sources.
* *User Support:*
* *Quotas:* 
  * 10 MB storage quota for anonymous users.  Account creation is restricted to those with an [active collaboration](http://umr-agap.cirad.fr/en) and that work on southern and Mediterranean plants.
* *Sponsor(s):*
  * [CIRAD](http://www.cirad.fr/en/), [IRD (Institut de recherche pour le développement)](http://en.ird.fr/), [Bioversity International](http://www.bioversityinternational.org/), [INRA](http://www.international.inra.fr/), [Montpellier SupAgro](http://www.supagro.fr/web/?idl=20)

## VectorBase Galaxy

<div class='right solid'><a href='https://www.vectorbase.org/galaxy'><img src="/src/images/Logos/VectorBaseLogoWithText.png" alt="VectorBase Galaxy" width=300 /></a></div>

* *Link:*
  * [Vectorbase Galaxy](https://www.vectorbase.org/galaxy)
* *Domain/Purpose:*
  * A full Galaxy server that includes reference information and workflows focusing on invertebrate vectors of human pathogens.
* *Comments:*
  * from [VectorBase: an updated bioinformatics resource for invertebrate vectors and other organisms related with human diseases](http://nar.oxfordjournals.org/content/early/2014/12/15/nar.gku1117.full), Gloria I. Giraldo-Calderón *et al.*, *Nucleic Acids Ressearch* (2014) doi: 10.1093/nar/gku1117: 
      "[VectorBase](http://vectorbase.org/) has also made available the latest relevant canonical data in this Galaxy instance. Examples of workflow analyses include alignment of Next Generation Sequence (NGS) data sets, calculation of expression values, or predicting single nucleotide polymorphisms (SNPs). Registered users can store their raw data, intermediate files and final analysis results for download or direct sharing via the BRC, which greatly improves the ability to collaborate with colleagues and VectorBase developers."
* *User Support:*
  * [VectorBase Help Hub Page](https://www.vectorbase.org/navigation/help)
  * [VectorBase Help Desk](https://www.vectorbase.org/contact)
* *Quotas:* 
  * You must have an account, but anyone can request an account [via email](mailto:info@vectorbase.org) or [online](https://www.vectorbase.org/contact).
* *Sponsor(s):*
  * The [University of Notre Dame](http://www.nd.edu/), [EMBL-EBI](http://www.ebi.ac.uk/), and [Imperial College London](http://www.imperial.ac.uk/)

## VirAmp

<div class='right solid'><a href='http://viramp.com/'><img src="/src/PublicGalaxyServers/VirAmpHome.png" alt="VirAmp" width=300 /></a></div>

* *Link:*
  * [VirAmp Galaxy](http://viramp.com/)
* *Domain/Purpose:*
  * VirAmp is a web-based semi-*de novo* fast virus genome assembly pipeline designed for extremely high coverage NGS data.
* *Comments:*
  * from [VirAmp: a galaxy-based viral genome assembly pipeline](http://www.gigasciencejournal.com/content/4/1/19), Yinan Wan, Daniel W Renner, Istvan Albert and Moriah L Szpara, *[GigaScience](http://www.gigasciencejournal.com/)* 2015, 4:19  doi:10.1186/s13742-015-0060-y
      [VirAmp](http://viramp.com/) "combines existing tools and techniques and presents them to end users via a web-enabled Galaxy interface. Our pipeline allows users to assemble, analyze, and interpret high coverage viral sequencing data with an ease and efficiency that was not possible previously. Our software makes a large number of genome assembly and related tools available to life scientists and automates the currently recommended best practices into a single, easy to use interface. We tested our pipeline with three different datasets from human herpes simplex virus (HSV)."

* *User Support:*
  * [Documentation](http://docs.viramp.com/en/latest/)
* *Quotas:* 
* *Sponsor(s):*
  * The [Huck Institutes of the Life Sciences](https://www.huck.psu.edu/) and the [Department of Biochemistry and Molecular Biology](http://bmb.psu.edu/), [Pennsylvania State University](http://www.psu.edu/)

## Whale Shark

<div class='right solid'><a href='http://whaleshark.georgiaaquarium.org/'><img src="/src/PublicGalaxyServers/WhaleSharkLanding300.png" alt="Whale Shark Galaxy @ The Georgia Aquarium" width=300 /></a></div>

* *Link:*
  * [Whale Shark Galaxy](http://whaleshark.georgiaaquarium.org/)
* *Domain/Purpose:*
  * "Dedicated to the analysis of whale shark *(Rhincodon typus)* genome."
* *Comments:*
  * See:
    [Draft sequencing and assembly of the genome of the world’s largest fish, the whale shark: Rhincodon typus Smith 1828](https://peerj.com/preprints/837/), Read TD, Petit III RA, Joseph SJ, Alam MT, RW, Ahmad M, Bhimani R, Vuong JS, Haase CP, Webb H, Dove ADM. (2015). *[PeerJ PrePrints](https://peerj.com/preprints/)* 3:e1036 http://dx.doi.org/10.7287/peerj.preprints.837v1
* *User Support:*
* *Quotas:* 
  * Max file size to upload: 2 GB
  * For registered users, you have a disk quota of 50GB and a job walltime of 24 hours.
  * For anonymous users, you have a disk quota of 50MB and a job walltime of 30 minutes.
* *Sponsor(s):*
  * "The whale shark genome project was made possible by financial and other support of [Georgia Aquarium](http://www.georgiaaquarium.org/) and its guests, and by a completion grant from [The Coca Cola Company](http://us.coca-cola.com/home/)."

## Workflow4Metabolomics

<div class='right'>
<div class='solid'><a href='http://galaxy.workflow4metabolomics.org/'><img src="/src/PublicGalaxyServers/Workflow4metabolomics.png" alt="Workflow4metabolomics Galaxy server" width=300 /></a></div>
<br />
<div class='right solid'><a href='/src/PublicGalaxyServers/Workflow4MetabolomicsSponsors.png'><img src="/src/PublicGalaxyServers/Workflow4MetabolomicsSponsors.png" alt="Workflow4Metabolomics Sponsors" width="200" /></a>
<br /><div class='center'>*Sponsors*</div> 
</div></div>

* *Links:*
  * [workflow4metabolomics Galaxy server](http://galaxy.workflow4metabolomics.org/)
  * [Request an account](http://abims.sb-roscoff.fr/account)
  * [Workflow4metabolomics.org](http://workflow4metabolomics.org/)
* *Domain/Purpose:*
  * A collaborative portal dedicated to metabolomics data processing, analysis and annotation.
* *Comments:*
  * [LC-MS](http://workflow4metabolomics.org/the-lc-ms-workflow), [GC-MS](http://workflow4metabolomics.org/the-gc-ms-workflow) and [NMR](http://workflow4metabolomics.org/the-nmr-workflow) workflows are provided. 
  * See: Giacomoni F., Le Corguillé G., Monsoor M., Landi M., Pericard P., Pétéra M., Duperier C., Tremblay-Franco M., Martin J.-F., Jacob D., Goulitquer S., Thévenot E.A. and Caron C. (2014). [Workflow4Metabolomics: A collaborative research infrastructure for computational metabolomics](http://dx.doi.org/10.1093/bioinformatics/btu813). *Bioinformatics*, [doi: 10.1093/bioinformatics/btu813](http://dx.doi.org/10.1093/bioinformatics/btu813)
* *User Support:*
  * [HowTo Tutorials](http://workflow4metabolomics.org/howto) 
  * [Help Desk](mailto:support AT workflow4metabolomics DOT org)
* *Quotas:* 
  * Account required.  Anyone can [request an account](http://abims.sb-roscoff.fr/account).
* *Sponsor(s):*
  * See [sponsor graph](/src/PublicGalaxyServers/Workflow4MetabolomicsSponsors.png)

# Tool Publishing Servers

Tool publishing servers expose one or a few tools so that researchers can use the tools without having to install them locally or use command line.

The distinction between [domain servers](/src/PublicGalaxyServers/index.md#domain-servers) and tool publishing servers is fuzzy.  In general, tool publishing servers expose tools from a particular organization, while domain servers include tools / datasets from other organizations and have a larger goal in mind.

## ABiMS Tools

<div class='right solid'><a href='http://webtools.sb-roscoff.fr/'><img src="/src/PublicGalaxyServers/ABiMSToolsLogos.png" alt="ABiMS Tools Galaxy Server"  /></a></div>

* *Link:*
  * [ABiMS Tools Server](http://webtools.sb-roscoff.fr/)
* *Domain/purpose:*
  * "Hosts tools/resources developed at the [Station Biologique de Roscoff](http://www.sb-roscoff.fr/) in collaboration with [ABiMS](http://abims.sb-roscoff.fr/)." 
* *Comments:*
  * Available tools:
    * [MicRhoDE workflow](http://application.sb-roscoff.fr/micrhode): places query sequences into MicRhoDE tree (type-1 rhodopsin phylogeny).
    * [Renkan Blast](http://renkan.sb-roscoff.fr/): blast query sequences on 18S and 28S radiolaria databases (blastn).
    * [WiseScaffolder](http://abims.sb-roscoff.fr/wisescaffolder): genome scaffolding of pre-assembled contigs using mate-pair data.
    * [HECTAR](http://www.sb-roscoff.fr/hectar/): HEterokont subCellular TARgeting is a statistical prediction method designed to assign proteins to five different categories of subcellular targeting: Signal peptides, type II signal anchors, chloroplast transit peptides, mitochondrion transit peptides and proteins which do not possess any N-terminal target peptide.
* *User support*: 
  * For any question or request for tools or account, send an email at [ABiMS Support](mailto:support.abims@sb-roscoff.fr)
* *Sponsor(s):*
  * [ABiMS](http://abims.sb-roscoff.fr/)
  * [Station Biologique de Roscoff](http://www.sb-roscoff.fr/) 

## AB-OpenLab

<div class='right solid'><a href='http://ab-openlab.csir.res.in/frog/'><img src="/src/PublicGalaxyServers/FROG.png" alt="FingeRprinting Ontology of Genomic variations (FROG)"  /></a></div>

* *Link:*
  * [FROG Server](http://ab-openlab.csir.res.in/frog/)
* *Domain/purpose:*
  * "FROG stands for **F**inge**R**printing **O**ntology of **G**enomic variations. FROG fingerprints have been devised to capture genomic variations at various levels." 
* *Comments:*
  * The assigned fingerprints enables FROG to make the large number of genomic variations computationally efficient in terms of memory requirements and faster retrieval. This interface has been designed to explore the structure of FROG fingerprints and search mitochondrial variations using fingerprints with a combination of various FROG properties.
  * See [FROG - Fingerprinting Genomic Variation Ontology](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0134693), by E. Abinaya, Pankaj Narang, Anshu Bhardwaj, *PLoS ONE* 10(8): e0134693. doi:10.1371/journal.pone.0134693  
* *User support*: 
  * [FROG User Manual](http://ab-openlab.csir.res.in/frog/static/user_manual.pdf)
  * [Contact](http://ab-openlab.csir.res.in/frog/static/contact_us.html)
* *Quotas:*
  * Anyone can create an account.  FROG can also be accessed anonymously.
* *Sponsor(s):*
  * [CSIR- GENESIS: Genomics and Informatics Solutions for Integrating Biology](http://crdd.osdd.net/genesis/genome.html)

## AGEseq @ AspenDB

<div class='right solid'><a href='http://aspendb.uga.edu/ageseq'><img src="/src/PublicGalaxyServers/AspenDB300.png" alt="AGEseq Galaxy @ AspenDB" width="300" /></a></div>

* *Link:*
  * [AGEseq Galaxy @ AspenDB](http://aspendb.uga.edu/ageseq)
* *Domain/Purpose:* 
  * This site provides a user-friendly interface for AGEseq (Analysis of Genome Editing by Sequencing) in a Galaxy instance. 
* *Comments:*
  * AGEseq compares amplicon sequences with expected target sequences and finds insertion/deletion sites in the amplicon sequences.
  * AGEseq can be used for SNP calling.
  * AGEseq supports NGS short reads as well as Sanger sequences in multiple file formats
  * AGEseq is also available from the [Galaxy Tool Shed](https://toolshed.g2.bx.psu.edu/) for installation into your local Galaxy instance.
  * Xue LJ and Tsai CJ (2015) AGEseq: Analysis of Genome Editing by Sequencing. *Molecular Plant.* doi:10.1016/j.molp.2015.06.001
* *User Support:*
  * Please email questions and suggestions to [Liangjiao Xue](mailto:lxue AT uga DOT edu).
* *Quotas:* 

   * 
* *Sponsor(s):*
  * [Tsai Lab](http://aspendb.uga.edu/), [Warnell School of Forestry and Natural Resources](http://warnell.uga.edu/) and [Department of Genetics](http://www.genetics.uga.edu/), University of Georgia.

## APOSTL

<div class='right solid'><a href='http://apostl.moffitt.org/'><img src="/src/PublicGalaxyServers/APOSTLlogo300.png" alt="Automated Processing of SAINT Templated Layouts" width="300" /></a></div>

* *Link:*
  * [APOSTL Galaxy Server](http://apostl.moffitt.org/)
* *Domain/Purpose:* 
  * Automated Processing of SAINT Templated Layouts (APOSTL) is a freely available software suite and analysis pipeline for reproducible, interactive analysis of AP-MS data. 
* *Comments:*
  * APOSTL is an evolving software project with the potential to customize individual analyses with additional Galaxy tools and widgets using the R web application framework, Shiny. The source code, data and documentation are freely available from [GitHub](https://github.com/bornea/APOSTL) and other sources.
  * APOSTL utilizes Significance Analysis of INTeractome (SAINT), a popular command-line software for analyzing AP data. APOSTL can process AP results from MaxQuant, Scaffold, PeptideShaker, or any software that can export mzIdentML.
  * APOSTL can create a number of publication-quality visualizations including interactive bubble plots, protein-protein interaction networks through Cytoscape.js integration, and pathway enrichment/gene ontology plots.
  * [APOSTL: An Interactive Galaxy Pipeline for Reproducible Analysis of Affinity Proteomics Data](http://dx.doi.org/10.1021/acs.jproteome.6b00660), Brent M. Kuenzi, Adam L. Borne, Jiannong Li, Eric B Haura, Steven A Eschrich, John M Koomen, Uwe Rix, and Paul A Stewart. *J. Proteome Res.,* DOI: 10.1021/acs.jproteome.6b00660
  * [An Interactive Tool for Reproducible Analysis of Affinity Proteomics Data](http://sched.co/73yr), presented by Paul A Stewart at GCC2016.
* *User Support:*
  * [Quick Start guide](http://apostl.moffitt.org/)
* *Quotas:* 

   * 
* *Sponsor(s):*
  * APOSTL support is provided by the [Haura](http://labpages2.moffitt.org/haura) and [Rix](https://moffitt.org/research-science/researchers/uwe-rix/) labs at the [Moffitt Cancer Center](https://moffitt.org/):
    * [Adam Borne](mailto:bornea27@gmail.com)
    * [Brent Kuenzi](mailto:brent.kuenzi@moffitt.org) 
    * [Paul Stewart PhD](mailto:paul.stewart@moffitt.org)

## ARGs-OAP

<div class='right solid'><a href='http://smile.hku.hk/SARGs'><img src="/src/PublicGalaxyServers/ARGs-OAP.png" alt="Structured ARG reference database Online Analysis Platform" height="200" /></a></div>

* *Link:*
  * [ARGs-OAP Galaxy Server](http://smile.hku.hk/SARGs)
* *Domain/Purpose:*
  * Fast annotation and classification of antibiotic resistance gene-like sequences from metagenomic data.
* *Comments:*
  * Integrated "ARDB and CARD, the two most commonly used databases. SARG was curated to remove redundant sequences and optimized to facilitate query sequence identification by similarity. A database with a hierarchical structure (type-subtype-reference sequence) was then constructed to facilitate classification (assigning ARG-like sequence to type, subtype and reference sequence) of sequences identified through similarity search." The server utilizes the SARG DB and a hybrid functional gene annotation pipeline to do fast annotation and classification of ARG-like sequences from metagenomic data.
  * See [ARGs-OAP: online analysis pipeline for antibiotic resistance genes detection from metagenomic data using an integrated structured ARG-database](http://dx.doi.org/10.1093/bioinformatics/btw136), Ying Yang, Xiaotao Jiang, Benli Chai, Liping Ma, Bing Li, Anni Zhang, James R. Cole, James M. Tiedje, and Tong Zhang. *Bioinformatics* (2016) 32 (15): 2346-2351. doi: 10.1093/bioinformatics/btw136
  * Source code is available on [GitHub](https://github.com/biofuture/Ublastx_stageone).
* *User Support:*
  * Please refer to the [manual page for ARGs-OAP](https://github.com/biofuture/Ublastx_stageone)
* *Quotas:* 
  * Supports anonymous access and creation of user logins.
* *Sponsor(s):*
  * Environmental Biotechnology Laboratory, [Department of Civil Engineering](https://www.civil.hku.hk/h4v3_2_study_here.html), [The University of Hong Kong](http://www.hku.hk/)
  * School of Marine Sciences, [Sun Yat-Sen University](http://www.sysu.edu.cn/), Guangzhou, China
  * [Department of Plant, Soil, and Microbial Sciences](http://www.psm.msu.edu/), [Michigan State University](http://www.msu.edu/)

## BioCiphers Lab Galaxy

<div class='right solid'><a href='http://avispa.biociphers.org/galaxy/'><img src="/src/PublicGalaxyServers/BioCiphersLandingPage300.png" alt="BioCiphers Galaxy" width="300" /></a></div>

* *Link:*
  * [BioCiphers Galaxy](http://avispa.biociphers.org/)
* *Domain/Purpose:* 
  * BCL Galaxy gives a user friendly interface for analysis tools developed by the [BioCiphers Lab](http://biociphers.org/) at the University of Pennsylvania. 
* *Comments:*
  * Includes the AVISPA alternative splicing prediction and analysis tool.  See Barash, *et al.,* "[AVISPA: a web tool for the prediction and analysis of alternative splicing](http://genomebiology.com/2013/14/10/R114)" *[Genome Biology](http://genomebiology.com/)* 2013, 14:R114; and Gazzara, *et al..* "[In silico to in vivo splicing analysis using splicing code models](http://dx.doi.org/10.1016/j.ymeth.2013.11.006)," *Methods* (2013)
* *User Support:*
  * Please report any problems with any of the tools or ask questions regarding their use to  [avispa AT biociphers DOT org](mailto:avispa AT biociphers DOT org) 
* *Quotas:* 
  * Requires account creation with an educational email address.
* *Sponsor(s):*
  * The [BioCiphers Lab](http://biociphers.org/) at the University of Pennsylvania.

## BioMaS

<div class='right solid'><a href='http://galaxy.cloud.ba.infn.it:8080/'><img src="/src/PublicGalaxyServers/BioMaSLogo.jpg" alt="BioMaS Galaxy" width="300" /></a></div>

* *Link:*
  * [BioMaS Galaxy](http://galaxy.cloud.ba.infn.it:8080/)
* *Domain/Purpose:* 
  * Taxonomic studies of environmental microbial communities 
* *Comments:*
  * [BioMa](/src/BioMa/index.md)S (Bioinformatic analysis of Metagenomic AmpliconS) supports taxonomic studies of environmental microbial communities, "comprehensive of all the fundamental steps, from raw sequence data upload and cleaning to final taxonomic identification, that are absolutely required in an appropriately designed Meta-barcoding HTS-based experiment."  
  * See [BioMaS: a modular pipeline for Bioinformatic analysis of Metagenomic AmpliconS](http://bit.ly/1LOk2G2) by Bruno Fosso, Monica Santamaria, Marinella Marzano, Daniel Alonso-Alemany, Gabriel Valiente, Giacinto Donvito, Alfonso Monaco, Pasquale Notarangelo and Graziano Pesole, *BMC Bioinformatics* 2015, 16:203  doi:10.1186/s12859-015-0595-z 
* *User Support:*
  * Please email questions and suggestions to [Bruno Fosso](mailto:bruno DOT fosso AT gmail.com) and/or to [Giacinto Donvito](mailto:giacinto DOT donvito AT ba.infn.it).

* *Quotas:* 
  * Requires an account. Interested users may ask for the creation of a BioMaS account sending a request to recas@lists.ba.infn.it.

* *Sponsor(s):*
  * [Istituto Nazionale di Fisica Nucleare](http://www.infn.it/)

## BISTRO

<div class='right solid'><a href='http://galaxy.bioinfo-bistro.fr/galaxy/'><img src="/src/PublicGalaxyServers/Bistro.png" alt="BISTRO Galaxy" width="300" /></a></div>

* *Link:*
  * [BISTRO Galaxy](http://galaxy.bioinfo-bistro.fr/galaxy/)
* *Domain/Purpose:* 
  * Taxonomic studies of environmental microbial communities 
* *Comments:*
  * Publishes the [PipeAlign workflow](http://galaxy.bioinfo-bistro.fr/galaxy/u/kress/w/pipealign-2) and supporting tools.  These tools include ballast, RASCAL, LEON, and MACSIMS.
* *User Support:*
  * [Email support](mailto:akress@unistra.fr)
* *Quotas:* 
  * Supports anonymous access and creation of user logins. 
* *Sponsor(s):*
  * This instance of Galaxy is managed by the [BISTRO platform](http://bioinfo-bistro.fr/bioinfo-bistro/). 

## Chemical Annotation Retrieval Toolkit (CART)

<div class='right solid'><a href='http://cart.embl.de/'><img src="/src/PublicGalaxyServers/CART.png" alt="Chemical Annotation Retrieval Toolkit (CART) Galaxy" width="300" /></a></div>

* *Link:*
  * [Server](http://cart.embl.de/)
* *Domain/Purpose:* 
  * Retrieves annotations on biological effects of chemicals and determines which ones are enriched.
* *Comments:*
  * From "[CART – a chemical annotation retrieval toolkit](http://bioinformatics.oxfordjournals.org/content/early/2016/06/02/bioinformatics.btw233.abstract)" by Samy Deghou, Georg Zeller, Murat Iskar, Marja Driessen, Mercedes Castillo, Vera van Noort, and Peer Bork. *Bioinformatics* (2016), doi: 10.1093/bioinformatics/btw233
      "it matches an input list of chemical names into a comprehensive reference space to assign unambiguous chemical identifiers. In this unified space, bioactivity annotations can be easily retrieved from databases covering a wide variety of chemical effects on biological systems. Subsequently, CART can determine annotations enriched in the input set of chemicals and display these in tabular format and interactive network visualizations, thereby facilitating integrative analysis of chemical bioactivity data."
  * Source code and an easy-to-install command line tool are also available.
* *User Support:*
  * See the "Tutorial" and "Contact" tabs on the [website](http://cart.embl.de/).
* *Quotas:* 
  * Supports anonymous access and creation of user logins. 
* *Sponsor(s):*
  * [Structural and Computational Biology Unit](http://www.embl.de/research/units/scb/), [European Molecular Biology Laboratory](http://www.embl.de/index.php), Heidelberg, Germany

## CTMM-TraIT Demo Galaxy

<div class='right solid'><a href='/src/CTMM-TraIT Demo Galaxy/index.md'><img src="/src/PublicGalaxyServers/CTMM-TraIT.png" alt="CTMM-TraIT Demo Galaxy" width="300" /></a></div>

* *Links:*
  * [CTMM-TraIT Demo Galaxy](http://galaxy-demo.ctmm-trait.nl/)
  * "[CGtag: complete genomics toolkit and annotation in a cloud-based Galaxy](http://www.gigasciencejournal.com/content/3/1/1/abstract)" by Hiltemann, *et al.,* *[GigaScience](http://www.gigasciencejournal.com/)* 2014, 3:1  doi:10.1186/2047-217X-3-1
* *Domain/Purpose:* 
  * Implements CGATools, the Complete Genomics open-source suite of command-line tools for the analysis of their CG-formatted mapped sequencing files in a Galaxy instance called CGtag (Complete Genomics Toolkit and Annotation in a Cloud-based Galaxy).
* *Comments:*
  * Includes two Galaxy Pages, and example data and public workflows to support themL
    * [CGtag: Complete Genomics Analysis Toolkit and Annotation in Galaxy](http://galaxy.ctmm-trait.nl/u/saskia-hiltemann/p/cgtag)
    * [Virtual Normal Analysis](http://galaxy.ctmm-trait.nl/u/saskia-hiltemann/p/virtual-normal-analysis)
* *User Support:*
  * Please email questions to [Saskia Hiltemann](mailto:s DOT hiltemann AT erasmusmc DOT nl) 
* *Quotas:* 
* *Sponsor(s):*
  * This Galaxy Server was set up by the [Netherlands Bioinformatics Center (NBIC)](http://www.nbic.nl/) and is maintained by [CTMM-TraIT](http://ctmm-trait.nl/), running at [SurfSARA](http://www.surfsara.nl/) high-performance cloud. 

<br />

## deepTools2

<div class='right solid'><a href='http://deeptools.ie-freiburg.mpg.de/'><img src="/src/PublicGalaxyServers/deepTools.png" alt="deepTools Galaxy Server"  /></a></div>

* *Links:*
  * [deepTools2](http://deeptools.ie-freiburg.mpg.de/) server
  * [deepTools home page at GitHub](http://deeptools.github.io/)
  * Fidel Ramírez, Devon P Ryan, Björn Grüning, Vivek Bhardwaj, Fabian Kilpert, Andreas S Richter, Steffen Heyne, Friederike Dündar and Thomas Manke, [deepTools2: a next generation web server for deep-sequencing data analysis](http://nar.oxfordjournals.org/content/early/2016/04/12/nar.gkw257.long), *Nucl. Acids Res.* (2016) doi: 10.1093/nar/gkw257
  * Fidel Ramírez, Friederike Dündar, Sarah Diehl, Björn A. Grüning, and Thomas Manke. [deepTools: a flexible platform for exploring deep-sequencing data](http://nar.oxfordjournals.org/cgi/content/abstract/gku365) *Nucl. Acids Res.* first published online May 5, 2014 doi:10.1093/nar/gku365
  * *[deepTools: a flexible platform for exploring deep-sequencing data](/src/events/GCC2014/Abstracts/Talks/index.md#deeptools-a-flexible-platform-for-exploring-deep-sequencing-data)* presentation by [Sarah Diehl](http://www.ie-freiburg.mpg.de/1892622/employee_page?c=1896591&employee_id=26993) at [GCC2014](/src/events/GCC2014/index.md)
  * [deepTools deployment description](/src/Community/Deployment/deepTools/index.md)
* *Domain/Purpose:* 
  * deepTools is a suite of user-friendly tools for the visualization, quality control and normalization of data from high-throughput DNA sequencing experiments.
* *Comments:*
  * deepTools offers multiple methods for highly-customizable data visualization that immensely aid hypothesis generation and data interpretation. It also offers all the tools needed to create coverage files in standard bedGraph and bigWig file formats allowing various normalization procedures and comparisons between two files (for example, treatment and control).
* *User Support:*
  * [Email](mailto:deeptools@googlegroups.com)
  * [deepTools wiki](https://github.com/fidelram/deepTools/wiki)
* *Quotas:* 
  * 20 GB for unregistered users, 30 GB for registered users
* *Sponsor(s):*
  * [Bioinformatics](http://www.ie-freiburg.mpg.de/bioinformaticsfac) and [Deep-Sequencing](http://www.ie-freiburg.mpg.de/deepfac) Units at the [Max Planck Institute for Immunobiology and Epigenetics](http://www3.ie-freiburg.mpg.de/).

<br />


## EpiToolKit

<div class='right solid'><a href='http://www.epitoolkit.de/'><img src="/src/PublicGalaxyServers/EpiToolKit_moleculepeptide.png" alt="EpiToolKit Galaxy Server" height="200" /></a></div>

* *Link:*
  * [EpiToolKit Galaxy](http://www.epitoolkit.de/)
* *Domain/Purpose:*
  * Computational immunology for the development of novel epitope-based vaccines.
* *Comments:*
  * [EpiToolKit](http://www.epitoolkit.de/) "provides a collection of methods from computational immunology for the development of novel epitope-based vaccines including HLA ligand or potential T-Cell epitope prediction, an epitope selection framework for vaccine design, and a method to design optimal string-of-beads vaccines. Additionally, [EpiToolKit](http://www.epitoolkit.de/) provides several other tools ranging from HLA typing based on NGS data, to prediction of polymorphic peptides."
  * See [EpiToolKit—a web-based workbench for vaccine design](http://bioinformatics.oxfordjournals.org/content/31/13/2211.full) by Benjamin Schubert, Hans-Philipp Brachvogel, Christopher Jürges and Oliver Kohlbacher, *Bioinformatics* (2015) 31 (13): 2211-2213. doi: 10.1093/bioinformatics/btv116
* *User Support:*
  * There is [extensive documentation](http://epitoolkit-wiki.informatik.uni-tuebingen.de/doku.php) inlcuding step-by-step instructions. 
* *Quotas:* 
  * Anyone can create an account.  Alternatively, a guest account is provided with login test_user@informatik.uni-tuebingen.de and password workflowTest. Please note that the guest account shares uploaded data with all other guest users.
  * Data of unregistered users and delete data will be permanently deleted after 7 days.
* *Sponsor(s):*
  * [ABI EpiToolKit](http://www.epitoolkit.de/) is a service of the [Applied Bioinformatics Group at University of Tuebingen](http://www.kohlbacherlab.org/). 

## Halogen Bonding

<div class='right solid'><a href='http://134.2.17.68:8081/'><img src="/src/PublicGalaxyServers/HalogenBonding.png" alt="Halogen Bonding Webserver" height="200" /></a></div>

* *Link:*
  * [Halogen Bonding Galaxy Server](http://134.2.17.68:8081/)
  * [Halogen Bonding project home](http://halogenbonding.com/)
* *Domain/Purpose:*
  * Visualize halogen bond contacts in the protein binding site
  * Analyze a protein binding site for halogen bonding hotspots
  * Evaluate halogen contacts with the protein backbone using the scoring function XBScore
* *Comments:*
  * Supports visualizations (halogen bond spheres) for:
    * the protein backbone (spherical scans and planar scans)
    * methionine
    * histidine
  * More visualizations and evaluation tools will be added in the near future.
  * See 
    * [Evaluating the Potential of Halogen Bonding in Molecular Design: Automated Scaffold Decoration Using the New Scoring Function XBScore](http://dx.doi.org/10.1021/ci5007118), Markus O. Zimmermann, Andreas Lange, and Frank M. Boeckler *Journal of Chemical Information and Modeling* 2015 55 (3), 687-699 DOI:10.1021\ci5007118 
    * [Using halogen bonds to address the protein backbone: a systematic evaluation](http://dx.doi.org/10.1007/s10822-012-9592-8), Rainer Wilcken, Markus O. Zimmermann, Andreas Lange, Stefan Zahn, and Frank M. Boeckler *J. Comput. Aided Mol. Des.* 2012, 26 (8), 935-945. DOI:10.1007/s10822-012-9592-8 
* *User Support:*
* *Quotas:* 
  * "Files older than 30 days will be deleted, so make sure to save the results to your hard drive. "
* *Sponsor(s):*
  * This webserver is provided by the group of [Prof. Dr. Frank Boeckler (University of Tuebingen, Germany)](http://www.mnf.uni-tuebingen.de/fachbereiche/pharmazie-und-biochemie/pharmazie/pharmazeutische-chemie/prof-dr-f-boeckler.html) 

## Huttenhower Lab

<div class='right solid'><a href='http://huttenhower.sph.harvard.edu/galaxy/'><img src="/src/PublicGalaxyServers/HuttenhowerLab.png" alt="Huttenhower Lab" width="300" /></a></div>

* *Link:*
  * [Huttenhower Lab](http://huttenhower.sph.harvard.edu/galaxy/)
* *Domain/Purpose:*
  * "metagenomic and functional genomic analyses, intended for research and academic use"
* *Comments:*
  * Implements 
    * LEfSe - LDA Effect Size
    * [MetaPhlAn](http://huttenhower.sph.harvard.edu/metaphlan/) - Metagenomic Phylogenetic Analysis
    * [GraPhlAn](http://huttenhower.sph.harvard.edu/graphlan/) - Graphical phylogenetic analysis 
    * [microPITA](http://huttenhower.sph.harvard.edu/micropita) - microbiome: Picking Interesting Taxonomic.  
    * MaAsLin - Multivariate Analysis by Linear Models
    * [PICRUSt](http://picrust.github.com/) - Phylogenetic Investigation of Communities by Reconstruction of Unobserved States
* *User Support:*
  * If you have any comments, questions, or suggestions, please contact [Dr. Huttenhower](http://huttenhower.sph.harvard.edu/contact).
* *Quotas:* 
  * The tools are available without account creation. However, you are strongly invited to create an account for having access to the history, saved analyses, datasets and workflows. 
* *Sponsor(s):*
  * [Huttenhower Lab](http://huttenhower.sph.harvard.edu/) 

## IBERS @ Aberystwyth

<div class='right solid'><a href='http://share-galaxy.ibers.aber.ac.uk/'><img src="/src/PublicGalaxyServers/IBERS.gif" alt="IBERS @ Aberystwyth Galaxy"  /></a></div>

* *Link:*
  * [IBERS @ Aberystwyth Galaxy](http://share-galaxy.ibers.aber.ac.uk/)
* *Domain/Purpose:*
  * Software, tools and pages written by IBERS researchers for release to the wider community. 
* *Comments:*
  * Implements the [DISMISS package](http://link.springer.com/article/10.1186/s12859-016-1158-7) for detection of stranded methylation in MeDIP-Seq data.
  * See [DISMISS: detection of stranded methylation in MeDIP-Seq data](http://link.springer.com/article/10.1186/s12859-016-1158-7), by Umar Niazi, Kathrin K. Geyer, Martin J. Vickers, Karl F. Hoffmann, Martin T. Swain, *BMC Bioinformatics* (2016) 17: 295. doi:10.1186/s12859-016-1158-7
* *User Support:*
  * For support please submit a bug report or contact [IBERS Support](mailto:ibers-cs@aber.ac.uk).
* *Quotas:* 
  * Anonymous access is supported.  You can also create a login. 
* *Sponsor(s):*
  * [Institute of Biological, Environmental and Rural Sciences](https://www.aber.ac.uk/en/ibers/),  [Aberystwyth University](http://aber.ac.uk/)
  * [Biotechnology and Biological Sciences Research Council (BBSRC)](http://www.bbsrc.ac.uk/)

## In Silico Galaxy

<div class='right solid'><a href='http://insilico.utulsa.edu/galaxy/'><img src="/src/images/Logos/UTulsaLogo.png" alt="In Silico Galaxy" height="100" /></a></div>

* *Link:*
  * [In Silico Galaxy](http://insilico.utulsa.edu/galaxy/) 
* *Domain/Purpose:*
  * Construction, analysis, and visualization of gene-gene interaction networks for sequencing data. Implements [Encore](http://onlinelibrary.wiley.com/doi/10.1002/gepi.21739/abstract), "an open source network analysis pipeline for genome-wide association studies and rare variant data. Encore constructs Genetic Association Interaction Networks or epistasis networks using two optional approaches: our previous information-theory method or a generalized linear model approach. Additionally, Encore includes multiple data filtering options, including Random Forest/Random Jungle for main effect enrichment and Evaporative Cooling and Relief-F filters for enrichment of interaction effects. Encore implements SNPrank network centrality for identifying susceptibility hubs (nodes containing a large amount of disease susceptibility information through the combination of multivariate main effects and multiple gene-gene interactions in the network)"
* *Comments:*
  * See "[Encore: Genetic Association Interaction Network Centrality Pipeline and Application to SLE Exome Data](http://onlinelibrary.wiley.com/doi/10.1002/gepi.21739/abstract)," by Davis NA, Lareau CA, White BC, Pandey A, Wiley G, Montgomery CG, Gaffney PM, [McKinney BA](http://www.utulsa.edu/academics/colleges/college-of-engineering-and-natural-sciences/departments-and-schools/tandy-school-of-computer-science/Our-Faculty-and-Staff/M/brett-mckinney.aspx). in *[Genetic Epidemiology](http://onlinelibrary.wiley.com/journal/10.1002/(ISSN)1098-2272)*. 2013 Jun 5. doi: 10.1002/gepi.21739.
* *User Support:*
  * [Insilico Research Group](http://insilico.utulsa.edu/)
* *Quotas:* 
  * Must create a login/<br />
  * Disk is "limited to reflect server resources but still allow users to demo tools prior to local installation. We are working on enabling instantiation of In Silico Galaxy on the cloud."  
* *Sponsor(s):*
  * [In Silico Bioinformatics Lab](http://insilico.utulsa.edu/) at the [University of Tulsa](http://utulsa.edu/)

## Koslicki Lab

<div class='right solid'><a href='http://math-galaxy.cgrb.oregonstate.edu:8080/'><img src="/src/images/Logos/OregonStateU.jpg" alt="Koslicki Lab Server" height="200" /></a></div>

* *Link:*
  * [Koslicki Lab Galaxy server](http://math-galaxy.cgrb.oregonstate.edu:8080/)
* *Domain/Purpose:*
  * Web based access to tools created by the [Koslicki Lab](http://www.math.oregonstate.edu/~koslickd/) at [Oregon State University](http://www.oregonstate.edu/):
    * [ARK](https://github.com/dkoslicki/ARK) and [Quikr](https://github.com/dkoslicki/Quikr)/[SEK](https://github.com/dkoslicki/SEK) for 16S rRNA based taxonomic profiling
    * [MetaPalette](https://github.com/dkoslicki/MetaPalette) for whole genome shotgun based taxonomic profiling
* *Comments:*
* *User Support:*
* *Quotas:*   
* *Sponsor(s):*
  * [Koslicki Lab](http://www.math.oregonstate.edu/~koslickd/) at [Oregon State University](http://www.oregonstate.edu/)

## kmer-SVM

<div class='right solid'><a href='http://kmersvm.beerlab.org/'><img src="/src/PublicGalaxyServers/kmer-SVM.png" alt="kmer-SVM"  /></a></div>

* *Link:*
  * [kmer-SVM server](http://kmersvm.beerlab.org/)
  * [Deployment page](/src/Community/Deployment/kmer-SVM/index.md) in the [Galaxy Deployment Catalog](/src/Community/Deployments/index.md)
* *Domain/Purpose:*
  * kmer-SVM is "a tool suite designed to aid in analysis of next-generation sequencing (NGS) data. Our suite uses a support vector machine (SVM) with kmer sequence features to identify predictive combinations of short transcription factor binding sites which determine the tissue specificity of the original NGS assay. Information gained from kmer-SVM can be used as an additional source of confidence in genomic experiments by recovering known binding sites, and can also reveal novel sequence features and possible cooperative mechanisms to be tested experimentally."
* *Comments:*
  * The kmer-SVN server is described in "[kmer-SVM: a web server for identifying predictive regulatory sequence features in genomic data sets](http://nar.oxfordjournals.org/content/41/W1/W544.long)." Christopher Fletez-Brant; Dongwon Lee; [Andrew S. McCallion](http://www.hopkinsmedicine.org/geneticmedicine/people/faculty/mccallion.html); [Michael A. Beer](http://www.beerlab.org/) *[Nucleic Acids Research](http://nar.oxfordjournals.org/)* 2013; doi: 10.1093/nar/gkt519<br />
  * A [tutorial on using the web server](http://kmersvm.beerlab.org/tutorial/) and a [Galaxy Tool Shed repository](http://toolshed.g2.bx.psu.edu/view/cafletezbrant/kmersvm) are also available. 
* *User Support:*
  * [Email](mailto:kmersvm DOT team AT gmail DOT com)
* *Quotas:*   
* *Sponsor(s):*
  * This project is a collaboration between Christopher Fletez-Brant and Dongown Lee respectively of the [McCallion Lab](http://www.hopkinsmedicine.org/geneticmedicine/people/faculty/mccallion.html) of the [McKusick-Nathans Institute of Genetic Medicine](https://igm.jhmi.edu/) at the Johns Hopkins University School of Medicine and the [Beer Lab](http://www.beerlab.org/) of the [Johns Hopkins University Department of Biomedical Engineering](http://www.bme.jhu.edu/).

## LiSIs

<div class='right solid'><a href='http://lisis.cs.ucy.ac.cy/'><img src="/src/images/Logos/LiSisLogo.png" alt="LiSIs" width="300px" /></a></div>

* *Link:*
  * [LiSIs](http://lisis.cs.ucy.ac.cy/)
* *Domain/Purpose:*
  * A platform for Virtual Screening.
* *Comments:*
  * The LiSIs platform has been developed in the context of the cross-disciplinary [GRANATUM project](http://www.granatum.org) aiming to bridge the gap between biomedical researchers by ensuring their seamless access to the globally available information needed to perform complex experiments and to conduct studies on large-scale datasets.
  * See [LiSIs: An Online Scientific Workflow System for Virtual Screening](http://www.eurekaselect.com/129180/article), by Christos C. Kannas, Ioanna Kalvari, George Lambrinidis, Christiana M. Neophytou, Christiana G. Savva, Ioannis Kirmitzoglou, Zinonas Antoniou, Kleo G. Achilleos, David Scherf, Chara A. Pitta, Christos A. Nicolaou, Emanuel Mikros, Vasilis J. Promponas, Clarissa Gerhauser, Rajendra G. Mehta, Andreas I. Constantinou, Constantinos S. Pattichis, *Combinatorial chemistry & high throughput screening*, Vol. 18, No. 3. (2015), pp. 281-295
* *User Support:*
  * [LiSIS Support Google Group](https://groups.google.com/forum/#!forum/lisis-support)
* *Quotas:* 
  * Must create a login, but anyone can create a login either on [LiSIs](http://lisis.cs.ucy.ac.cy/) or [GRANATUM](http://www.granatum.org/).<br />
  * There are storage quotas.<br />
  * There will be computational quotas in the near future.
* *Sponsor(s):*
  * EU-funded project [GRANATUM](http://www.granatum.org/) under FP7-(ICT-2009.5.3).<br />
  * The LiSIs platform is been developed and maintained by [e-Health Laboratory](http://www.medinfo.cs.ucy.ac.cy/).<br />
  * The LiSIs platform is hosted at the [Department of Computer Science, University of Cyprus](http://www.cs.ucy.ac.cy/).

## Majewski Lab

<div class='right solid'><a href='http://genomequebec.mcgill.ca/exomeai'><img src="/src/PublicGalaxyServers/McGillGQIC.png" alt="Majewski Lab: ExomeAI" width="300px" /></a></div>

* *Link:*
  * [Majewski Lab ExomeAI Server](http://genomequebec.mcgill.ca/exomeai)
  * Nadaf J, Majewski J, Fahiminiya S. (2014). [ExomeAI: Detection of recurrent Allelic Imbalance in tumors using whole Exome sequencing data](http://www.ncbi.nlm.nih.gov/pubmed/25297069). *Bioinformatics*. 2014 Oct 8.
* *Domain/Purpose:*
  * Detection of recurrent Allelic Imbalance in tumors using whole Exome sequencing data.  
* *Comments:*
  * ExomeAI is a free web-based application for detection of recurrent AI/LOH segments in Tumor samples.

* *User Support:*
  * [Manual](http://bioinformatics.oxfordjournals.org/content/suppl/2014/10/07/btu665.DC1/suppl_data.zip)
  * Email Support: [Javad Nadaf](mailto:Javad DOT Nadaf AT gmail DOT com) 
* *Quotas:* 
  * An account is required to access the server.  Anyone can [request an account via email](mailto:Javad DOT Nadaf AT gmail DOT com).
* *Sponsor(s):*
  * The [McGill University and Génome Québec Innovation Centre](http://gqinnovationcenter.com/index.aspx)

## Martin Luther U. Halle-Wittenberg

<div class='right solid'><a href='http://galaxy.informatik.uni-halle.de'><img src="/src/images/Logos/MartinLutherU.png" alt="Martin Luther University Halle-Wittenberg" width="300px" /></a></div>

* *Link:*
  * [Martin Luther University Halle-Wittenberg](http://galaxy.informatik.uni-halle.de)
* *Domain/Purpose:*
  * Provides implementations of these tools:
    * CRISPRer is a tool for genome-wide selection and assessment of CRISPR/Cas protospacers.
    * TALgetter allows you to scan input sequences for putative target sites of a given TAL (transcription activator-like) effector as typically expressed by many Xanthomonas bacteria.
    * TALgetterLong allows you to scan input sequences for putative target sites of a given TAL (transcription activator-like) effector as typically expressed by many Xanthomonas bacteria in large input data, but lacks some of the features of TALgetter (e.g., computation of empirical p-values).
    * TALENoffer is a tool for predicting off-targets of TAL effector nucleases (TALENs).
    * Dimont (beta) is a universal tool for de-novo motif discovery. Dimont has successfully been applied to ChIP-seq, ChIP-exo and protein-binding microarray (PBM) data.  
* *Comments:*
  * These applications were developed by the groups of [Bioinformatics and Pattern Recognition](http://informatik.uni-halle.de/arbeitsgruppen/mustererkennung/?lang=en) and/or [Bioinformatics](http://informatik.uni-halle.de/arbeitsgruppen/bioinformatik/?lang=en) in collaboration with internal and external partners. 
* *User Support:*
  * [Email](mailto:grau AT informatik DOT uni DASH halle DOT de)
* *Quotas:* 
* *Sponsor(s):*
  * [Bioinformatics and Pattern Recognition](http://informatik.uni-halle.de/arbeitsgruppen/mustererkennung/?lang=en) and [Bioinformatics](http://informatik.uni-halle.de/arbeitsgruppen/bioinformatik/?lang=en)

## MBAC Metabiome Portal

<div class='right solid'><a href='http://mbac.gmu.edu:8080/'><img src="/src/PublicGalaxyServers/MBACPortalLandingPage.png" alt="MBAC Metabiome Portal" width="300px" /></a></div>

* *Link(s):*
  * [MBAC Metabiome Portal](http://mbac.gmu.edu:8080/)
* *Domain/Purpose:*
  * We have developed the [MBAC Metabiome Portal](http://mbac.gmu.edu/mbac/display_detail.php?tb=research&id=11), a flexible and customizable webserver, with the aim of simplifying control, usage, access, and analysis of microbiome, metabolome, and immunome data (the Metabiome).
* *Comments:*
  * The Portal uses a relational database management system and distributed analytical resources and includes several tools such as sequence clustering, filtering sequencing artifacts, taxonomic analysis, and functional annotation. Users access the MBAC Metabiome Portal through a Galaxy based web browser to perform individual and group analysis and share their results. Programming support is also available to configure and run customized pipelines.
* *User Support:*
  * [Email](mailto:pgilleve AT gmu DOT edu)
* *Quotas:* 
  * We have opened up the MBAC Metabiome Portal to unregistered users to share data and analysis tools. Computationally intensive tools are restricted to in house use. Anonymous users are restricted to a 50 mb disk quota.<br />
  * Anonymous users can view a demo of the [Metabiome Database here](http://mbac.gmu.edu/mbac/galaxy_frontpage/portal_example.html).
* *Sponsor(s):*
  * The [MicroBiome Analysis Center (MBAC)](http://mbac.gmu.edu/mbac/) resides within the Department of Environmental Science and Policy at [George Mason University](http://www.gmu.edu/) and supports collaborative research in the fields of Molecular Ecology, Microbial Ecology, Molecular Evolution, and Genomics.<br />
  * The portal is supported by NIH, DOD, NSF, and NOAA grants through collaborative projects with Virginia Commonwealth University, [Rush University Medical Center](http://www.rushu.rush.edu/servlet/Satellite?ProfileType=Short&c=RushUnivFaculty&cid=1209997117309&pagename=Rush%2FRushUnivFaculty%2FFaculty_Staff_Profile_Detail_Page), the [Alberta IBD Consortium](http://albertaibdconsortium.ca/), UC Davis, [Case Western University](http://casemed.case.edu/dept/dermatology/), Florida International University, USDA, the Virginia Commonwealth Research Commercialization Fund, Naval Research Laboratory, and [Metabiomics LLC](http://metabiomics.com/).

## MGEScan

<div class='right solid'><a href='http://mgescan.readthedocs.org/en/latest/server.html'><img src="/src/PublicGalaxyServers/MGEScanVideoStart.png" alt="MGEScan on Galaxy Workflow System" width="300px" /></a></div>

* *Link(s):*
  * [MGEScan on Galaxy Workflow System](http://mgescan.readthedocs.org/en/latest/server.html)
* *Domain/Purpose:*
  * Identifying long terminal repeats (LTR) and non-LTR retroelements in eukaryotic genomic sequences. 
* *Comments:*
  * ENA Browser or local storage is used to obtain input genome sequences including a traditional file upload. HMMER 3.1b1 is applied to gain speed boosts compared to a previous version HMMER 2+. In addition Generic Feature Format Version 3 is used for visualization of genome sequence data via a web-based genome browser e.g. UCSC Genome Browser or Ensembl Genome Browser. 
  * MGESCan is also [accessible through Amazon Cloud (EC2)](http://mgescan.readthedocs.org/en/latest/aws.html), [Galaxy Tool Shed](http://mgescan.readthedocs.org/en/latest/toolshed.html) or [Published Workflow](https://usegalaxy.org/u/hyungro-lee/w/retrotminer-imported-from-uploaded-file) on the public galaxy server (usegalaxy.org)
  * [MGEScan: a Galaxy based system for identifying retrotransposons in genomes](http://bioinformatics.oxfordjournals.org/content/early/2016/04/07/bioinformatics.btw157) by Hyungro Lee1, Minsu Lee, Wazim Mohammed Ismail, Mina Rho, Geoffrey Fox, Sangyoon Oh, and Haixu Tang, *Bioinformatics* (2016) doi: 10.1093/bioinformatics/btw157
* *User Support:*
  * [MGEScan on Galaxy QuickStart Tutorial](http://mgescan.readthedocs.org/en/latest/tutorial.html)
  * [MGEScan documentation](http://mgescan.readthedocs.org/en/latest/)
* *Quotas:* 
  * MGEScan can be used anonymously or with a login.  Anyone can create a login.
* *Sponsor(s):*
  * [School of Informatics and Computing](http://www.soic.indiana.edu/), [Indiana University](http://www.indiana.edu/)

## MiModD NacreousMap

<div class='right solid'><a href='http://mapping-by-sequencing.vm.uni-freiburg.de:8080/'><img src="/src/PublicGalaxyServers/Baumeister.png" alt="Baumeister Lab Galaxy featuring MiModD" width="300" /></a></div>

* *Link:*
  * [MiModD NacreousMap](http://mapping-by-sequencing.vm.uni-freiburg.de:8080/)
* *Domain/Purpose:* 
  * This server exposes the NacreousMap mapping/plotting tool of MiModD for users of MiModD who do not want to install the required dependencies (R and rpy2) for graphical output from this tool on their local system. [MiModD](http://www.celegans.de/en/mimodd) is a comprehensive software package for the identification and annotation of mutations in the genomes of model organisms from whole-genome sequencing (WGS) data. 
* *Comments:*
  * [CloudMap](https://usegalaxy.org/cloudmap) users can replot data produced with the Hawaiian Variant Mapping tool using the NacreousMap engine to obtain optimized (much smaller files that display faster) plots.
  * To install the complete MiModD package for use as a command line tool or for integration into any local Galaxy follow the [installation instructions](http://mimodd.readthedocs.org/en/latest/INSTALL.html) in the [MiModD User Guide](http://mimodd.readthedocs.org/en/latest/).
* *User Support:*
  * [MiModD User Guide](http://mimodd.readthedocs.org/en/latest/index.html#)
  * [MiModD Google Group](mailto:mimodd@googlegroups.com)
* *Quotas:* 
  * The quota for anonymous usage is 50MB, registered users have 250MB available.
  * You can analyze/plot data in VCF format or the "Per variant report" format generated by local runs of the MiModD NacreousMap tool. The latter has the advantage of being up to 20 times smaller than the corresponding VCF file.
* *Sponsor(s):*
  * [The Baumeister Laboratory](http://www.celegans.de/) at the [Institute for Biology 3](http://www.biologie.uni-freiburg.de/data/bio3/) of the [Albert-Ludwig University](http://www.uni-freiburg.de/) in Freiburg/Breisgau, Germany.

## MPI-HLR Bioinformatics Server

<div class='right solid'><a href='https://bioinformatics.mpi-bn.mpg.de/'><img src="/src/PublicGalaxyServers/MPI-HLRHomePage.png" alt="MPI-HLR Bioinformatics Server"  /></a></div>

* *Link:*
  * [MPI-HLR Bioinformatics Server](https://bioinformatics.mpi-bn.mpg.de/)
* *Domain/Purpose:*
  * Hosts these tools:
    * MIRPIPE: Quantification of microRNA based on smallRNA sequencing reads
    * ADMIRE: Semi-automatic analysis pipeline and visualization tool for Illumina HumanMethylation450K BeadChip arrays.
    * LimiTT: Link your lists of miRNAs and miRNA effectors, like genes or proteins mapped onto UniProt Accessions, to validated miRNA target interactions (MTIs) coming from four databases specialized in experimentally verified MTIs.
* *Comments:*
  * Supporting papers:
    * "[MIRPIPE – quantification of microRNAs in niche model organisms](http://bit.ly/1t4oQvo),"  C. Kuenne, J. Preussner, M. Herzog, T. Braun, M. Looso, *Bioinformatics* (26 August 2014), btu573, doi:10.1093/bioinformatics/btu573
    * "[ADMIRE: analysis and visualization of differential methylation in genomic regions using the Infinium HumanMethylation450 Assay](http://www.epigeneticsandchromatin.com/content/8/1/51)," Jens Preussner, Julia Bayer, Carsten Kuenne and Mario Looso, *Epigenetics & Chromatin* 2015, 8:51  doi:10.1186/s13072-015-0045-1

* *User Support:*
  * [MIRPIPE Manual](https://bioinformatics.mpi-bn.mpg.de/static/mirpipe_manual.pdf)
  * [ADMIRE Documentation](http://admire.readthedocs.org/en/latest/)
  * [LimiTT Documentation](https://github.molgen.mpg.de/loosolab/limitt/blob/master/HELP.md)
* *Quotas:* 
  * Can access with or without a login.  Anyone can create a login.
* *Sponsor(s):*
  * [Max Planck Institute for Heart and Lung Research](http://www.mpi-hlr.de/)

## NGS-QC

<div class='right solid'><a href='http://galaxy.ngs-qc.org/'><img src="/src/PublicGalaxyServers/NGS-QC_Generator.png" alt="Gronemeyer Lab Galaxy and NGS-QC Generator" /></a></div>

* *Link:*
  * [NGS-QC Galaxy](http://galaxy.ngs-qc.org/)
* *Domain/Purpose:*
  * Evaluate the quality of your favorite ChIP-seq or enrichment-related NGS dataset using [NGS-QC Generator](http://www.ngs-qc.org/), which also includes a [database with preprocessed profiles](http://www.ngs-qc.org/database.php) and a [tutorial on how to analyze sequencing profiles yourself](http://www.ngs-qc.org/tutorial.php). 
* *Comments:*
  * See
    * [NGS-QC Generator: A Quality Control System for ChIP-Seq and Related Deep Sequencing-Generated Datasets](http://link.springer.com/protocol/10.1007/978-1-4939-3578-9_13) by Mendoza-Parra *et al.* in Statistical Genomics, Volume 1418 of the series Methods in Molecular Biology pp 243-265
    * [A quality control system for profiles obtained by ChIP sequencing](http://nar.oxfordjournals.org/content/early/2013/09/14/nar.gkt829) by Mendoza-Parra *et al.*, in *Nucl. Acids Res.* (2013)
* *User Support:*
  * [Marco Mendoza](mailto:marco AT igbmc DOT fr) or [Mohamed Ashick](mailto:mohameds AT igbmc DOT fr). 
* *Quotas:* 
  * Must have an account to use the server; anyone can create an account.  "Due to storage space constraints, uploaded datasets into the Galaxy instance may not be available for more than 24hours, thus we strongly suggest users to download their processed files as early as possible."
* *Sponsor(s):*
  * Galaxy instance hosted by the [Gronemeyer lab](http://igbmc.fr/research/department/2/team/21/).

## ODoSE

<div class='right solid'><a href='http://www.odose.nl/'><img src="/src/PublicGalaxyServers/ODoSEScatterplot.png" alt="ODoSE: Ortholog Direction of Selection Engine" /></a></div>

* *Link:*
  * [ODoSE: Ortholog Direction of Selection Engine](http://www.odose.nl/)
* *Domain/Purpose:*
  * [ODoSE](http://www.odose.nl/) is a webserver for genome-wide calculation of adaptive divergence in prokaryotes.
* *Comments:*
  * "The web-based graphical user-interface ODoSE (Ortholog Direction of Selection Engine) identifies all orthologs between a set of strains and allows the calculation of a novel extension of the [McDonald Kreitman] MK test, the Direction of Selection (DoS) statistic as well as the calculation of the Neutrality Index (NI) statistic for all genes shared by two taxonomic groups combined. The engine also generates the site frequency spectrum for each gene allowing one to apply more advanced methods for estimating the distribution of fitness effects and rates of adaptive evolution."<br />
  * See [ODoSE: A Webserver for Genome-Wide Calculation of Adaptive Divergence in Prokaryotes](http://bit.ly/10ydSiO) by Michiel Vos, Tim A. H. te Beek, Marc A. van Driel, Martijn A. Huynen, Adam Eyre-Walker, Mark W. J. van Passel; PLoS ONE, Vol. 8, No. 5. (6 May 2013), e62447, doi:10.1371/journal.pone.0062447
* *User Support:*
  * [ODoSE Manual](http://www.odose.nl/static/welcome.html)
* *Quotas:* 
* *Sponsor(s):*
  * "MV is supported by investment from the European Regional Development Fund to the European Centre for Environment and Human Health, University of Exeter.  MWJvP is funded by the Netherlands Organization for Scientific Research (NWO) via a VENI grant. TAHtB and MAvD are funded by the BioAssist/[BRS](http://brs.nbic.nl/) programme of the [Netherlands Bioinformatics Centre (NBIC)](http://nbic.nl/), which is supported by the Netherlands Genomics Initiative (NGI). We thank the developers of programs used in ODoSE for making their software publicly available."

## Osiris

<div class='right solid'><a href='http://galaxy-dev.cnsi.ucsb.edu/osiris/'><img src="/src/PublicGalaxyServers/OsirisLogo.jpg" alt="Osiris" /></a></div>

* *Links:*
  * [Osiris Galaxy](http://galaxy-dev.cnsi.ucsb.edu/osiris/)
  * "[Osiris: accessible and reproducible phylogenetic and phylogenomic analyses within the Galaxy workflow management system](http://www.biomedcentral.com/1471-2105/15/230/abstract)," by Oakley, *et al.* in *[BMC Bioinformatics](http://www.biomedcentral.com/bmcbioinformatics/)* 2014, 15:230  doi:10.1186/1471-2105-15-230
  * [Osiris Blog](http://osiris-phylogenetics.blogspot.com/)
  * [Osiris code in Bitbucket](https://bitbucket.org/osiris_phylogenetics)
* *Domain/Purpose:*
  * Pylogenetics
* *Comments:*
  * "This server aims to demonstrate Osiris, a set of phylogenetics tools for the Galaxy Bioinformatics platform. Because it is only a demo, some computationally intensive tools are disabled. Other tools will be slow because this is a public, shared resource."
* *User Support:*
  * [Osiris-Phylogenetics Google Group](https://groups.google.com/forum/?hl=en&fromgroups#!forum/osiris-phylogenetics)
  * [Screencasts](https://www.youtube.com/watch?v=mGMxwc20Yx4)
* *Quotas:* 
* *Sponsor(s):*
  * [Oakley Lab](https://labs.eemb.ucsb.edu/oakley/todd/) at [UC Santa Barbara](http://www.ucsb.edu/)

## Palfinder

<div class='right solid'><a href='https://palfinder.ls.manchester.ac.uk/'><img src="/src/PublicGalaxyServers/Palfinder.png" alt="Galaxy Palfinder Service" /></a></div>

* *Links:*
  * [Galaxy Palfinder Service](https://palfinder.ls.manchester.ac.uk/)

* *Domain/Purpose*
  * Microsatellite development.
* *Comments:*
  * See [A Galaxy-based bioinformatics pipeline for optimised, streamlined microsatellite development from Illumina next-generation sequencing data](https://doi.org/10.1007/s12686-016-0570-7), Griffiths, S.M., Fox, G., Briggs, P.J. *et al. Conservation Genetics Resources* (2016). doi:10.1007/s12686-016-0570-7
* *User Support:*
  * [Galaxy Palfinder Service Manual](https://palfinder.ls.manchester.ac.uk/manual)
  * [Email](mailto:peter.briggs@manchester.ac.uk)
* *Quotas:* 
  * Accounts have a quota of 20 GB.
  * Any data uploaded or generated are automatically deleted after 30 days (to prevent the build up of large volumes of data onto our servers long-term). Please ensure that you download all outputs that you wish to keep.
* *Sponsor(s):*
  * Palfinder Galaxy is a service is provided by the [Bioinformatics Core Facility](https://www.bmh.manchester.ac.uk/research/facilities/bioinformatics/), [Research Computing](http://www.rcs.manchester.ac.uk/), and [The Faculty of Biology, Medicine and Health](https://www.bmh.manchester.ac.uk/) at the [University of Manchester](https://www.manchester.ac.uk/) in conjunction with the [lab of Richard Preziosi](http://preziosilab.org/) at the University of Manchester.

## PIA

<div class='right solid'><a href='http://galaxy-dev.cnsi.ucsb.edu/pia/'><img src="/src/PublicGalaxyServers/PiaImage.jpg" alt="PIA" /></a></div>

* *Links:*
  * [PIA Galaxy](http://galaxy-dev.cnsi.ucsb.edu/pia/)
  * "[Using phylogenetically-informed annotation (PIA) to search for light-interacting genes in transcriptomes from non-model organisms](http://www.biomedcentral.com/1471-2105/15/350/abstract)," by Speiser, *et al.* in *[BMC Bioinformatics](http://www.biomedcentral.com/bmcbioinformatics/)* 2014, 15:350  doi:10.1186/s12859-014-0350-x
  * [PIA code in Bitbucket](https://bitbucket.org/osiris_phylogenetics/pia/)
* *Domain/Purpose:*
  * Phylogenetics and gene interaction
* *Comments:*
  * "PIA (Phylogenetically Informed Annotation) is a set of tools for the Galaxy Bioinformatics Platform. In general, PIA uses BLAST, an alignment program, and RAxML's read placement algorithm to put unknown sequences into pre-calculated phylogenetic trees. We provide 102 genes called LIT (Light Interaction Toolkit) - vision genes like phototransduction genets - for use in PIA."
* *User Support:*
  * [PIA Manual](https://bytebucket.org/osiris_phylogenetics/pia/raw/05d213dcb31e4cda9ccc68201ee7f8854161b2c9/docs/PIAwebManual_090914.pdf)
  * [Getting Started with PIA](https://www.youtube.com/watch?v=m23KxhxhTAE) screencast.
* *Quotas:* 
* *Sponsor(s):*
  * [Oakley Lab](https://labs.eemb.ucsb.edu/oakley/todd/) at [UC Santa Barbara](http://www.ucsb.edu/)

## PredPharmTox

<div class='right solid'><a href='http://galaxy.predpharmtox.org/'><img src="/src/PublicGalaxyServers/PredPharmTox300.png" alt="PredPharmTox" width="300" /></a></div>

* *Link:*
  * [PredPharmTox](http://galaxy.predpharmtox.org/)
* *Domain/Purpose:*
  * "[PredPharmTox](http://galaxy.predpharmtox.org/) is an e-infrastructure for Large Scale Predictive Pharmacology and Toxicology, providing easy access to chemical and omics data in toxicology and pharmacology, together with methods and predictions available via user-friendly tools." 
* *Comments:*
  * "The infrastructure will support open standards and be developed in close collaboration with European initiatives, and implemented as a Platform as a Service (PaaS) linking to the cloud resource of the Swedish National Infrastructure for Computing (SNIC). The infrastructure will enable Swedish researchers to perform world class science such as integrated pharmacology/toxicology approaches, chemical safety assessment, toxicogenomics and pharmacogenomics with mechanistic interpretations and discovery of chemically-initiated pathways, as well as including omics data in predictive toxicology and pharmacology modeling."
  * Implements
    * [QuantMap tools](http://pubs.acs.org/doi/abs/10.1021/ci200429f) for grouping chemicals by biological activity, 
    * ToxMap for visual representations of the toxicogenomic space occupied by a query signature
  * See "[Automated QuantMap for rapid quantitative molecular network topology analysis](http://bioinformatics.oxfordjournals.org/content/early/2013/07/04/bioinformatics.btt390.full.pdf)" by Schaal1, *et al.*, *[Bioinformatics](http://bioinformatics.oxfordjournals.org/)* (2013)
* *User Support:*
* *Quotas:* 
* *Sponsor(s):*
  * "This work was supported by the Swedish Research Council [VR-2011-6129]; and the Swedish Strategic Research Program eSSENCE."

## PreSTIGE

<div class='right solid'><a href='http://prestige.case.edu/'><img src="/src/PublicGalaxyServers/PreSTIGE.png" alt="PreSTIGE" width="300" /></a></div>

* *Link:*
  * [PreSTIGE](http://prestige.case.edu/)
* *Domain/Purpose:*
  * "PreSTIGE (Predicting Specific Tissue Interactions of Genes and Enhancers) predicts cell-line specific gene-enhancer interactions for a user-provided cell line as well as 12 PreSTIGE cell lines."
* *Comments:*
  * Users can generate predictions for any cell type of interest for which H3K4me1 ChIP-seq and RNA-seq data are available.
  * See "[Combinatorial effects of multiple enhancer variants in linkage disequilibrium dictate levels of gene expression to confer susceptibility to common traits](http://genome.cshlp.org/content/early/2013/11/06/gr.164079.113.abstract)" by Corradin, *et al.*, *[Genome Research](http://genome.cshlp.org/)* (2013)
* *User Support:*
  * [PreSTIGE User Guide](http://genetics.case.edu/prestige/misc/Scacheri_PreSTIGE_User_Guide.pdf), [Email](mailto:olivia DOT corradin AT case DOT edu)
* *Quotas:* 
  * Available for academic use only
* *Sponsor(s):*
  * [Scacheri Lab](http://genetics.case.edu/page.php?page_id=5&LN=Scacheri&FN=Peter) at [Case Western Reserve University](http://www.case.edu/), [Department of Genetics and Genome Sciences](http://genetics.case.edu/)

## QBRC Galaxy and PIPE-CLIP

<div class='right solid'><a href='http://www.galaxy.qbrc.org/'><img src="/src/PublicGalaxyServers/QBRCLogo.jpg" alt="QBRC Galaxy" width="300" /></a></div>

* *Links:*
  * [QBRC Galaxy](http://www.galaxy.qbrc.org/) server
    * "[A Model-Based Approach to Identify Binding Sites in CLIP-Seq Data](http://www.plosone.org/article/info%3Adoi%2F10.1371%2Fjournal.pone.0093248)" by Wang, *et al.*, *[PLoS ONE](http://www.plosone.org/)* 9(4): e93248. doi:10.1371/journal.pone.0093248
    * "[Detection of candidate tumor driver genes using a fully integrated Bayesian approach](http://onlinelibrary.wiley.com/doi/10.1002/sim.6066/abstract)" by Yang, *et al.*, *Statistics in Medicine*, doi: 10.1002/sim.6066
  * [PIPE-CLIP](http://pipeclip.qbrc.org/)
    * "[Design and bioinformatics analysis of genome-wide CLIP experiments](http://nar.oxfordjournals.org/content/early/2015/05/09/nar.gkv439.full)" by Wang, *et al.*, *Nucleic Acids Research* (2015) doi: 10.1093/nar/gkv439  
    * "[PIPE-CLIP: a comprehensive online tool for CLIP-seq data analysis](http://genomebiology.com/2014/15/1/R18/abstract)" by Chen, *et al.*, *[Genome Biology](http://genomebiology.com/)*, 2014, 15:R18 doi:10.1186/gb-2014-15-1-r18
* *Domain/Purpose:*
  * This pair of servers hosts custom tools developed by members of the [Quantitative Biomedical Research Center @ University of Texas Southwestern](http://qbrc.swmed.edu/) for statistical analysis of various High Throughput Sequencing experiments.<br />
  * Features:
    * [SbacHTS: Spatial Background Noise Correction for HighThroughput RNAi Screening](http://bioinformatics.oxfordjournals.org/content/early/2013/06/28/bioinformatics.btt358.abstract)   
    * [DecoRNAI](http://galaxy.qbrc.org/static/DecoRNAi_Manual.pdf) (deconvolution analysis of RNAi screening data)
    * [MiClip](http://galaxy.qbrc.org/static/galaxy_manual.pdf) "a novel model-based approach to identify high-confidence protein-RNA binding sites in CLIP-Seq datasets"
    * [PIPE-CLIP](http://pipeclip.qbrc.org/static/OnlineManual.pdf)
* *Comments:*
  * The QBRC galaxy server tools are constantly being updated. Please contact authors for more details regarding use.
* *User Support:*
  * [Web form](http://qbrc.swmed.edu/contact/)
* *Quotas:* 
* *Sponsor(s):*
  * [Quantitative Biomedical Research Center @ UT Southwestern](http://qbrc.swmed.edu/)

## RDF2Graph

<div class='right solid'><a href='http://semantics.systemsbiology.nl/RDF2Graph/'><img src="/src/PublicGalaxyServers/RDF2Graph_reactome.png" alt="RDF2Graph using Reactome" width="300" /></a></div>

* *Link:*
  * [RDF2Graph Server](http://semantics.systemsbiology.nl/RDF2Graph/)
* *Domain/Purpose:*
  * RDF2Graph recovers the structure of an RDF resource.
* *Comments:*
  * Graphs can be exported to [Cytoscape](http://www.cytoscape.org/), OWL, and [ShEx](http://www.w3.org/2001/sw/wiki/ShEx).
  * See "[RDF2Graph a tool to recover, understand and validate the ontology of an RDF resource](http://www.jbiomedsem.com/content/6/1/39/)" by van Dam *et al.*, *Journal of Biomedical Semantics* 2015, 6:39  (2013)
* *User Support:*
  * [RDF2Graph Manual](http://semantics.systemsbiology.nl/RDF2Graph/static/Manual.html)
* *Quotas:* 
  * Server can be used by anyone, but you'll need to create an account.
  * The RDF resource is limited to 20,000,000 lines.
* *Sponsor(s):*
  * [Laboratory of Systems and Synthetic Biology](http://www.wageningenur.nl/en/Expertise-Services/Chair-groups/Agrotechnology-and-Food-Sciences/Laboratory-of-Systems-and-Synthetic-Biology.htm), [Wageningen University](http://www.wageningenur.nl/)

## SIFTED

<div class='right solid'><a href='http://thebrain.bwh.harvard.edu/sifted.html'><img src="/src/PublicGalaxyServers/SIFTEDLandingPage.png" alt="SIFTED"  /></a></div>

* *Link:*
  * [SIFTED Galaxy Server](http://thebrain.bwh.harvard.edu/sifted.html)
* *Domain/Purpose:*
  * Specificity Inference For TAL-Effector Design (SIFTED) is a computational model for predicting the DNA-binding specificity of any Transcription activator-like effector (TALE) proteins.
* *Comments:*
  * See [Context influences on TALE–DNA binding revealed by quantitative profiling](http://www.nature.com/ncomms/2015/150611/ncomms8440/full/ncomms8440.html) by Julia M. Rogers, Luis A. Barrera, Deepak Reyon, Jeffry D. Sander, Manolis Kellis, J Keith Joung & Martha L. Bulyk, *Nature Communications* 6,7440 doi:10.1038/ncomms8440 
* *User Support:*
  * [How to design a TALE to optimally target a sequence](http://thebrain.bwh.harvard.edu/SIFTED_Tutorial.pdf) tutorial
  * [How to predict the specificity of a TALE protein(s)](http://thebrain.bwh.harvard.edu/SIFTED_PWM_Tutorial.pdf) tutorial
  * [Contacts](http://thebrain.bwh.harvard.edu/contact.html)
* *Quotas:* 
* *Sponsor(s):*
  * [Bulyk Lab](http://thebrain.bwh.harvard.edu/index.html), [Division of Genetics](http://genetics.bwh.harvard.edu/genetics/index.html) in the [Department of Medicine at Brigham & Women's Hospital](http://www.brighamandwomens.org/medicine/) and [Harvard Medical School](http://hms.harvard.edu/hms/home.asp) 

## SymD

<div class='right solid'><a href='http://symd.nci.nih.gov/'><img src="/src/PublicGalaxyServers/SymD.png" alt="SymD"  /></a></div>

* *Links:*
  * [SymD server](http://symd.nci.nih.gov/)
  * "[SymD webserver: a platform for detecting internally symmetric protein structures](http://nar.oxfordjournals.org/content/early/2014/05/05/nar.gku364.full)," by Chin-Hsien Tai, Rohit Paul, Jeffery D. Shilling and Byungkook Lee, *Nucl. Acids Res.* (2014) doi: 10.1093/nar/gku364
* *Domain/Purpose:*
  * "SymD is a tool for detecting internally symmetric protein structures."
* *Comments:*
  * SymD "works through an “alignment scan” procedure in which a protein structure is aligned to itself after circularly permuting the second copy by all possible number of residues.<br />
  * Input to SymD is a PDB format coordinate file. SymD reports T‐score, Zscore, transformed structure at the position of the best Z‐score, as well as the symmetry axis, the rotation angle and any translation along the symmetry axis (for helical symmetry).
* *User Support:*
  * [Instructions](http://symd.nci.nih.gov/static/Interface_help/Interface_help.html)
  * [Example Run](http://symd.nci.nih.gov/static/example_run/GalaxySymD.html)
  * [Email support](mailto:taic@mail.nih.gov)
* *Quotas:* 
* *Sponsor(s):*
  * [US National Cancer Institute (NCI)](http://nci.nih.gov/)

## VarCap

<div class='right solid'><a href='http://galaxy.csb.univie.ac.at:8080/'><img src="/src/PublicGalaxyServers/VarCapWorkflow.png" alt="VarCap"  /></a></div>

* *Links:*
  * [VarCap Galaxy](http://galaxy.csb.univie.ac.at:8080/)
* *Domain/Purpose:*
  * Reliable prediction of different types of variants even at low frequencies. 
* *Comments:*
  * Zojer M, Schuster LN, Schulz F, Pfundner A, Horn M, Rattei T. (2016) [Genotyping of evolving prokaryotic populations](https://peerj.com/preprints/2449/). *PeerJ Preprints* 4:e2449v1 doi: 10.7287/peerj.preprints.2449v1
* *User Support:*
  * [Tutorial](http://galaxy.csb.univie.ac.at:8080/static/welcome.html)
* *Quotas:* 
  * Must have a login to use the server; anyone can create a login.
* *Sponsor(s):*
  * [Department of Microbiology and Ecosystems Science](http://dmes.univie.ac.at/), [University of Vienna](http://univie.ac.at/)

## Vinther Lab

<div class='right solid'><a href='http://galaxy.bio.ku.dk/'><img src="/src/PublicGalaxyServers/VintherLab300.png" alt="Vinther Lab: User-Friendly Tools for Sequencing-Based RNA Structure Probing Data"  /></a></div>

* *Links:*
  * [Vinther Lab server](http://galaxy.bio.ku.dk/)
  * [Reproducible Analysis of Sequencing-Based RNA Structure Probing Data with User-Friendly Tools](http://www.sciencedirect.com/science/article/pii/S0076687915000713) by Lukasz Jan Kielpinski, Nikolaos Sidiropoulos, Jeppe Vinther, * Methods in Enzymology*, DOI: 10.1016/bs.mie.2015.01.014:
* *Domain/Purpose:*
  * RNA structure-probing data analysis to "improve the prediction of RNA secondary and tertiary structure and allow structural changes to be identified and investigated." 
* *Comments:*
  * From [Kielpinski, et al.](http://www.sciencedirect.com/science/article/pii/S0076687915000713):
      a collection of tools, which allow raw sequencing reads to be converted to normalized probing values using different published strategies. In addition, we also provide tools for visualization of the probing data in the UCSC Genome Browser and for converting RNA coordinates to genomic coordinates and vice versa. The collection is implemented as functions in the R statistical environment and as tools in the Galaxy platform, making them easily accessible for the scientific community. 
* *User Support:*
* *Quotas:* 
  * Must have a login to use the server; anyone can create a login.
* *Sponsor(s):*
  * [Vinther Lab](http://www1.bio.ku.dk/english/research/bi/rna_biologi/vinther/), [Department of Biology](http://cms.ku.dk/nat-sites/bio-sites/bio/english/), [University of Copenhagen](http://www.ku.dk/english/).
  * [Danish Council for Strategic Research](http://ufm.dk/en/research-and-innovation/councils-and-commissions/the-danish-council-for-strategic-research/the-danish-council-for-strategic-research) [Center for Computational and Applied Transcriptomics](http://rna.dk/)

## Wageningen UR

<div class='right solid'><a href='http://galaxy.wur.nl/'><img src="/src/PublicGalaxyServers/Wageningen.png" alt="Wageningen UR Galaxy" height="225" /></a></div>

* *Link:*
  * [Wageningen UR Galaxy](http://galaxy.wur.nl/)
* *Domain/Purpose:*
  * Includes microarray tools, the MUMmer suite, and many conversion tools. 
  * Strong focus on multi-omics: next to genomics tools it also contains proteomics and metabolomics tools
* *Comments:*
  * Also links to [Plant Research International ChIP-seq Analysis Tool (PRI-CAT)](http://www.ab.wur.nl/pricat/#Galaxy). 
* *User Support:*
  * Email support on voluntary basis. Extra support could be negotiated.
  * Admins: [Eric Kuijt](mailto:eric.kuijt@wur.nl), [Alex Bossers](mailto:alex.bossers@wur.nl), and [Pieter Lukasse](mailto:pieter.lukasse@wur.nl).
* *Quotas:* 
  * Requires login, anyone can create a login.
* *Sponsor(s):*
  * DLO Research institutes from [Wageningen UR](http://www.wur.nl)
    * [Central Veterinary Institute](http://wwww.cvi.wur.nl/) and 
    * [Plant Research International](http://www.pri.wur.nl/)

## ZBIT Bioinformatics Toolbox

<div class='right solid'><a href='http://webservices.cs.uni-tuebingen.de/'><img src="/src/PublicGalaxyServers/ZBIT.png" alt="ZBIT Bioinformatics Toolbox"  /></a></div>

* *Links:*
  * [ZBIT Bioinformatics Toolbox](http://webservices.cs.uni-tuebingen.de/)
  * [Deployment page](/src/Community/Deployment/ZBIT_Bioinformatics_Toolbox/index.md) in the [Galaxy Deployment Catalog](/src/Community/Deployments/index.md)
* *Domain/Purpose:*
  * "This customized version of the Galaxy webservice framework was set up to allow the public access of our bioinformatics tools. These tools were developed and implemented by members of the [Department of Cognitive Systems](http://www.cogsys.cs.uni-tuebingen.de/) at the [University of Tübingen](http://www.uni-tuebingen.de/)."
* *Comments:*
  * Includes these tools developed at Tübingen:
    * [TFpredict](http://www.cogsys.cs.uni-tuebingen.de/software/TFpredict/welcome_e.html): Identification and structural characterization of transcription factors
    * [SABINE](http://www.cogsys.cs.uni-tuebingen.de/software/SABINE/welcome_e.html): Prediction of the binding specificity of transcription factors
    * [SBML2LaTeX](http://www.cogsys.cs.uni-tuebingen.de/software/SBML2LaTeX/index.html): Conversion of SBML files into human-readable reports
    * [BioPAX2SBML](http://www.cogsys.cs.uni-tuebingen.de/software/BioPAX2SBML/welcome_e.html): Conversion of BioPAX format to SBML qual
    * [SBMLsqueezer](http://www.cogsys.cs.uni-tuebingen.de/software/SBMLsqueezer/): Generate kinetic rate equations for biochemical networks
    * [EDISA](http://www.cogsys.cs.uni-tuebingen.de/software/EDISA/welcome_e.html): Extracting biclusters from multiple time-series of gene expression profiles
    * [ModuleMaster](http://www.cogsys.cs.uni-tuebingen.de/software/ModuleMaster/welcome_e.html): Finding *cis*-regulatory modules using promoter analysis and microarray expression data regression.
* *User Support:*
  * [Mailing List](https://listserv.uni-tuebingen.de/mailman/listinfo/galaxy)
* *Quotas:* 
* *Sponsor(s):*
  * [BMBF](http://www.bmbf.de), [Spher4Sys](http://www.cogsys.cs.uni-tuebingen.de/forschung/spher4sys/welcome_e.html), [MARCAR](http://www.zbit.uni-tuebingen.de),  [Virtual Liver](http://www.hepatosys.de), and [NGFN](http://www.ngfn.de)

# Public ToolSheds

## Galaxy Main Tool Shed

Sits at [http://toolshed.g2.bx.psu.edu/](http://toolshed.g2.bx.psu.edu/), is supported by the Galaxy Team, and is the main Tool Shed of choice.

## Galaxy Test ToolShed

Test Tool Shed is made for breaking. If you have some tools you want to try out first before making them public in the Main Tool Shed this is the place to go. Test Tool Shed is at [http://testtoolshed.g2.bx.psu.edu/](http://testtoolshed.g2.bx.psu.edu/).

## Galaxy@PRABI Tool Shed

<div class='right'><a href='http://toolshed.prabi.fr/'><img src="/src/images/Logos/PRABILogo.png" alt="Galaxy@PRABI" width="150" /></a></div>

[Tool Shed](http://toolshed.prabi.fr/) backing the [Galaxy@PRABI server](/src/PublicGalaxyServers/index.md#galaxyprabi).  DEfines bioinformatics tools developed by the research teams working in the perimeter of the PRABI core facility, including *kissplice/kissDE, TETools, SexDetector,* and *priam*.

## DTL ToolShed

<div class='left'><a href='http://toolshed.nbic.nl/'><img src="/src/images/Logos/DTLLogo.png" alt="DTL ToolShed" width="150" /></a></div>

The [Dutch Techcentre for Life Sciences (DTL)](http://www.dtls.nl/dtl/) has made its [Galaxy ToolShed](http://toolshed.nbic.nl/) publicly available.  The [DTL ToolShed](http://toolshed.nbic.nl/) has almost 70 tools in it, from [ANNOVAR](http://toolshed.nbic.nl/view/saskia-hiltemann/annovar) to [VCF-2-VariantList](http://toolshed.nbic.nl/view/saskia-hiltemann/virtual_normal_preprocessing).  This ToolShed was originally started at NBIC.

## GUGGO ToolShed

The [GUGGO](https://www.e-biogenouest.org/groups/guggo) public ToolShed contains over 160 valid tools in 132 repositories in 16 categories. GUGGO Tool Shed is at [http://toolshed.genouest.org/](http://toolshed.genouest.org/).




If you have or know of a public server that is not listed here please add it, or send its information to [Galaxy Outreach](mailto:outreach@galaxyproject.org).
