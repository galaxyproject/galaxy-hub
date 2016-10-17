---
autotoc: true
title: September 2013 Galaxy Update
---


<div class='right'></div>

<div class='left'><a href='/GalaxyUpdates'><img src='/Images/Logos/GalaxyUpdate200.png' alt='Galaxy Updates' width=150 /></a></div>

Welcome to the September 2013 *[Galaxy Update](/src/GalaxyUpdates/index.md)*, a monthly summary of what is going on in the Galaxy community. *[Galaxy Updates](/src/GalaxyUpdates/index.md)* complement the *[Galaxy Development News Briefs](/src/DevNewsBriefs/index.md)* which accompany new Galaxy releases and focus on Galaxy code updates.

<br />


# New Public Servers

A record *five new servers* joined [the list of over 40 publicly accessible Galaxy servers](/src/PublicGalaxyServers/index.md) in August.

## Galaxy-P

<div class='left solid'><a href='https://usegalaxyp.org/'><img src='/PublicGalaxyServers/GetGalaxyPHomePage.png' alt='Galaxy-P' width="200" /></a></div>

[Galaxy-P](https://usegalaxyp.org/) is a multiple 'omics' data analysis platform with particular emphasis on mass spectrometry based proteomics. Galaxy-P is developed at the [University of Minnesota](http://umn.edu/), deployed at the [Minnesota Supercomputing Institute](http://msi.umn.edu/).  Pending imminent hardware upgrades, usegalaxyp.org is running with fairly limited computational resources and on disk that is not backed up. Galaxy-P is under active development - things will break and things will change, so your patience is requested.

You can also [install your own copy of Galaxy-P](http://getgalaxyp.org/), either locally or in the cloud, and Galaxy-P has a *User guide* ([web](http://bit.ly/usegalaxyp-guide), [pdf](http://bit.ly/usegalaxyp-guide-pdf))

## GWIS

<div class='right solid'><a href='http://bioinformatics.research.nicta.com.au/software/gwis/'><img src='/PublicGalaxyServers/GWISPosterTop.png' alt='GWIS' width="200" /></a></div>

[NICTA Bioinformatics](http://bioinformatics.research.nicta.com.au/)' [Genome-wide Interaction Search (GWIS)](http://bioinformatics.research.nicta.com.au/software/gwis/) for multivariate GWAS analysis cuts the computational time for analyzing all pairs of SNP interactions in genome-wide association studies (GWAS) from months to minutes on commodity computers.  Any non-commercial user can request an account [gwis AT nicta DOT com DOT au](via email).

See 
* Benjamin Goudey, David Rawlinson, Qiao Wang, Fan Shi, Herman Ferra, Richard M Campbell, Linda Stern, Michael T Inouye, Cheng Soon Ong, Adam Kowalczyk (2013), "[GWIS – model-free, fast and exhaustive search for epistatic interactions in case-control GWAS](http://www.biomedcentral.com/1471-2164/14/S3/S10)", *BMC Genomics*, 14(Suppl 3):S10 
* *[H37: GWIS: Online exhaustive bivariate GWAS in minutes](ATTACHMENT_URLDocuments/Presentations/2013ISMBRawlinsonGWIS.pdf)*, poster presented by David Rawlinson, *et al.* at [ISMB 2013](/src/Events/ISMB2013/index.md).

## Martin Luther University Halle-Wittenberg

<div class='right solid'><a href='http://galaxy.informatik.uni-halle.de'><img src='/Images/Logos/MartinLutherU.png' alt='Martin Luther University Halle-Wittenberg' width="200px" /></a></div>

[Martin Luther University Halle-Wittenberg](http://galaxy.informatik.uni-halle.de)'s Galaxy server provides implementations of tools developed by the groups of [Bioinformatics and Pattern Recognition](http://informatik.uni-halle.de/arbeitsgruppen/mustererkennung/?lang=en) and/or [Bioinformatics](http://informatik.uni-halle.de/arbeitsgruppen/bioinformatik/?lang=en) in collaboration with internal and external partners. 
* CRISPRer is a tool for genome-wide selection and assessment of CRISPR/Cas protospacers.
* TALgetter allows you to scan input sequences for putative target sites of a given TAL (transcription activator-like) effector as typically expressed by many Xanthomonas bacteria.
* TALgetterLong allows you to scan input sequences for putative target sites of a given TAL (transcription activator-like) effector as typically expressed by many Xanthomonas bacteria in large input data, but lacks some of the features of TALgetter (e.g., computation of empirical p-values).
* TALENoffer is a tool for predicting off-targets of TAL effector nucleases (TALENs).
* Dimont (beta) is a universal tool for de-novo motif discovery. Dimont has successfully been applied to ChIP-seq, ChIP-exo and protein-binding microarray (PBM) data.  

## MBAC Metabiome Portal

<div class='left solid'><a href='http://mbac.gmu.edu:8080/'><img src='/PublicGalaxyServers/MBACPortalLandingPage.png' alt='MBAC Metabiome Portal' width="200px" /></a></div>

The [MBAC Metabiome Portal](http://mbac.gmu.edu/mbac/display_detail.php?tb=research&id=11) is a flexible and customizable webserver that simplifies control, usage, access, and analysis of microbiome, metabolome, and immunome data (the Metabiome).  The Portal uses a relational database management system and distributed analytical resources and includes several tools such as sequence clustering, filtering sequencing artifacts, taxonomic analysis, and functional annotation. 

Users access the MBAC Metabiome Portal through a Galaxy based web browser to perform individual and group analysis and share their results. Programming support is also available to configure and run customized pipelines.  Users can view a demo of the [Metabiome Database here](http://mbac.gmu.edu/mbac/galaxy_frontpage/portal_example.html).

## ZBIT Bioinformatics Toolbox

<div class='right solid'><a href='http://webservices.cs.uni-tuebingen.de/'><img src='/PublicGalaxyServers/ZBITHomePage.png' alt='ZBIT Bioinformatics Toolbox' width="200" /></a></div>

The [ZBIT Bioinformatics Toolbox](http://webservices.cs.uni-tuebingen.de/) enables public access to these bioinformatics tools developed at [Department of Cognitive Systems](http://www.cogsys.cs.uni-tuebingen.de/) at the [University of Tübingen](http://www.uni-tuebingen.de/) of our bioinformatics tools.
* [TFpredict](http://www.cogsys.cs.uni-tuebingen.de/software/TFpredict/welcome_e.html): Identification and structural characterization of transcription factors
* [SABINE](http://www.cogsys.cs.uni-tuebingen.de/software/SABINE/welcome_e.html): Prediction of the binding specificity of transcription factors
* [SBML2LaTeX](http://www.cogsys.cs.uni-tuebingen.de/software/SBML2LaTeX/index.html): Conversion of SBML files into human-readable reports
* [BioPAX2SBML](http://www.cogsys.cs.uni-tuebingen.de/software/BioPAX2SBML/welcome_e.html): Conversion of BioPAX format to SBML qual
* [SBMLsqueezer](http://www.cogsys.cs.uni-tuebingen.de/software/SBMLsqueezer/index.htm): Generate kinetic rate equations for biochemical networks
* [EDISA](http://www.cogsys.cs.uni-tuebingen.de/software/EDISA/welcome_e.html): Extracting biclusters from multiple time-series of gene expression profiles
* [ModuleMaster](http://www.cogsys.cs.uni-tuebingen.de/software/ModuleMaster/welcome_e.html): Finding *cis*-regulatory modules using promoter analysis and microarray expression data regression.

# New Papers

<table>
  <tr>
    <th> # </th>
    <th> Tag </th>
    <td rowspan=6 style=" border: none;"> &nbsp;&nbsp; </td>
    <th> # </th>
    <th> Tag </th>
    <td rowspan=6 style=" border: none;"> &nbsp;&nbsp; </td>
    <th> # </th>
    <th> Tag </th>
  </tr>
  <tr>
    <td style=" text-align: right;"> - </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/cloud'>Cloud</a> </td>
    <td style=" text-align: right;"> - </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/refpublic'>RefPublic</a> </td>
    <td style=" text-align: right;"> 2 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/uselocal'>UseLocal</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right;"> - </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/howto'>HowTo</a> </td>
    <td style=" text-align: right;"> - </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/reproducibility'>Reproducibility</a> </td>
    <td style=" text-align: right;"> 5 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/usemain'>UseMain</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right;"> 1 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/isgalaxy'>IsGalaxy</a> </td>
    <td style=" text-align: right;"> 4 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/shared'>Shared</a> </td>
    <td style=" text-align: right;"> 1 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/usepublic'>UsePublic</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right;"> 18 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/methods'>Methods</a> </td>
    <td style=" text-align: right;"> 3 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/tools'>Tools</a> </td>
    <td style=" text-align: right;"> - </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/visualization'>Visualization</a> </td>
  </tr>
  <tr>
    <td style=" text-align: right;"> 1 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/project'>Project</a> </td>
    <td style=" text-align: right;"> - </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/uselocal'>UseCloud</a> </td>
    <td style=" text-align: right;"> 8 </td>
    <td> <a href='http://www.citeulike.org/group/16008/tag/workbench'>Workbench</a> </td>
  </tr>
</table>



30 new papers were added to the [Galaxy CiteULike Group](http://www.citeulike.org/group/16008/) in August. This paper may be particularly interesting to the Galaxy community:

* Richard !LeDuc, Matthew Vaughn, John M Fonner, Michael Sullivan, James G Williams, Philip D Blood, [James Taylor](/src/JamesTaylor/index.md), William Barnett, "[Leveraging the national cyberinfrastructure for biomedical research](http://dx.doi.org/10.1136/amiajnl-2013-002059)," in *[Journal of the American Medical Informatics Association (JAMIA)](http://jamia.bmj.com/)*, doi:10.1136/amiajnl-2013-002059

<br />

# 2014 Galaxy Training Survey

<div class='right'><a href='http://bit.ly/gxy14training'><img src='/News/2014GalaxyTrainingSurvey/GalaxyTrainingSurvey.png' alt='Take the Galaxy training survey' width="350" /></a></div>

Help guide Galaxy's 2014 training efforts by taking the [Galaxy Training Survey](http://bit.ly/gxy14training)! Please take a few minutes to let us know what you would like to see offered, and where you would like training to be held.

<br />

# Who's Hiring

<div class='right'><a href='/GalaxyIsHiring'><img src='/GalaxyIsHiring/GalaxyIsHiringWordCloud2.png' alt='Please Help! Yes you!' width="200" /></a></div>

The Galaxy is expanding! Please help it grow.
* [Bioinformatics post available at University of Exeter](http://bit.ly/1cuX9b9) 
* [PhD or postdoc position available](http://bit.ly/15Iz3nL) at [Laboratory of Computational Biology](http://med.kuleuven.be/lcb/), University of Leuven 
* **The [Galaxy Project is hiring software engineers and post-docs](/src/GalaxyIsHiring/index.md)**.
* [Sr Bioinformatics Specialist, Tufts University](http://bit.ly/1bOLLBd), Boston MA.
* [Senior Developer](http://www.nature.com/naturejobs/science/jobs/334107-senior-developer-stem-cell-bioinformatics-core), Stem Cell Bioinformatics Core, Sage Bionetworks, Seattle, WA, United States

Got a Galaxy-related opening? Send it to outreach@galaxyproject.org and we'll put it in the [Galaxy News feed](/src/News/index.md) and include it in next month's [update](/src/GalaxyUpdates/index.md).

<br />

# Events

<div class='center'>
<a href='https://training.bioinformatics.ucdavis.edu/2013/07/02/the-2013-rna-seq-workshop/'><img src='/Images/Logos/UCDavisGenomeCenterLogo.jpg' alt='RNA-Seq Workshop: From Pipette to P-value! @ UC Davis Bioinformatics Core' height="60" /></a>
<a href='http://www.rcpa.edu.au/Continuing/CalendarOfEvents/September2013.htm'><img src='/Images/Logos/RCPALogo.jpg' alt='The Genomic Bioinformatics Workshop' height="60" /></a>
<a href='http://individualizingmedicineconference.mayo.edu/schedule/'><img src='/Images/Logos/MayoClinicSmall.png' alt='Individualizing Medicine Conference' height="60" /></a> &nbsp;
<a href='http://www.beyond-the-genome.com/program/'><img src='/Images/Logos/BeyondTheGenome2013.png' alt='Beyond the Genome' height="60" /></a> &nbsp;
<a href='http://bit.ly/153avr8'><img src='/Images/Logos/OrioneNGSCourse.png' alt='Analisi dati Next Generation Sequencing in Galaxy: exome, RNA-Seq, metagenomica' height="65" /></a> &nbsp;
<a href='http://bioinfo.genotoul.fr/index.php?id=34&tx_seminars_pi1%5BshowUid%5D=43'><img src='/Images/Logos/GennoToulLogo.png' alt='Galaxy Training Days' height="60" /></a>
</div>

<div class='right'><a href='http://bit.ly/gxycal'><img src='/Images/Icons/CalendarIcon.gif' /></a></div> See the [Galaxy Events Google Calendar](http://bit.ly/gxycal) for details on these and other events.

<br />

<table>
  <tr class="th" >
    <th> Date </th>
    <th> Topic/Event </th>
    <th> Venue/Location </th>
    <th> Contact </th>
  </tr>
  <tr>
    <th> September 9-11 </th>
    <td> <em><a href='https://training.bioinformatics.ucdavis.edu/2013/07/02/the-2013-rna-seq-workshop/'>RNA-Seq Workshop: From Pipette to P-value!</a></em> </td>
    <td> <a href='http://bioinformatics.ucdavis.edu/'>UC Davis Bioinformatics Core</a> Davis, California, United States </td>
    <td> <a href="mailto:ucdbio AT gmail DOT com">Email</a> </td>
  </tr>
  <tr>
    <th> September&nbsp;28 - October&nbsp;1 </th>
    <td> <em>Galaxy Workshop</em> </td>
    <td> <a href='http://www.rcpa.edu.au/Continuing/CalendarOfEvents/September2013.htm'>The Genomic Bioinformatics Workshop</a>, Sydney, Australia </td>
    <td> <a href='/RossLazarus'>Ross Lazarus</a>, <a href='/Dan'>Dan Blankenberg</a> </td>
  </tr>
  <tr>
    <th> September 30 - October 2 </th>
    <td> <em>TBA</em>, part of the <em><a href='http://individualizingmedicineconference.mayo.edu/schedule/'>Cancer Care</a></em> session </td>
    <td> <a href='http://individualizingmedicineconference.mayo.edu/'>Individualizing Medicine Conference</a>, <a href='http://mayo.eduy/'>Mayo Clinic</a>, Rochester, Minnesota, United States </td>
    <td> <a href='/JamesTaylor'>James Taylor</a> </td>
  </tr>
  <tr>
    <th> October 1-3 </th>
    <td> <em><a href='http://www.beyond-the-genome.com/program/'>Galaxy</a></em> </td>
    <td> </strong><a href='http://www.beyond-the-genome.com/'>Beyond the Genome 2013</a><strong>,San Francisco, California, United States </td>
    <td> <a href='/JeremyGoecks'>Jeremy Goecks</a> </td>
  </tr>
  <tr>
    <th rowspan=2> October 7-8 </th>
    <td> <em><a href='https://www.gtcbio.com/conference/ngseurope-agenda#Day 1 -BIO'>TBD</a></em></td>
    <td rowspan=2> <a href='http://www.gtcbio.com/conference/ngseurope-overview'>NGS & Bioinformatics Summit Europe</a>, Berlin, Germany </td>
    <td> <a href='/anton'>Anton Nektutenko</a> </td>
  </tr>
  <tr>
    <td> <em><a href='https://www.gtcbio.com/conference/ngseurope-agenda#Day 1 -BIO'>Using Galaxy to Provide a NGS Analysis Platform</a> </em> </td>
    <td> <a href='/HansrudolfHotz'>Hans-Rudolf Hotz</a> </td>
  </tr>
  <tr>
    <th> October 8-11 </th>
    <td> <em><a href='http://bit.ly/153avr8'>Analisi dati Next Generation Sequencing in Galaxy: exome, RNA-Seq, metagenomica</a></em> </td>
    <td> <a href='http://www.bioinformatica.crs4.it/'>CRS4, Loc. Pixinamanna, Pula CA, Italy</a> </td>
    <td> <a href="mailto:paolo DOT uva AT crs4 DOT it">Paolo Uva</a> </td>
  </tr>
  <tr>
    <th> October 9-11 </th>
    <td> <em><a href='http://bioinfo.genotoul.fr/index.php?id=34&tx_seminars_pi1%5BshowUid%5D=43'>Galaxy Training Days</a></em> </td>
    <td> <a href='http://bioinfo.genotoul.fr/'>GenoToul bioinformatics facility</a>, INRA, Toulouse Auzeville, France </td>
    <td> <a href="mailto:sarah DOT maman AT toulouse AT inra AT fr">Sarah Maman</a> </td>
  </tr>
  <tr>
    <th rowspan=2> October 22-26 </th>
    <td> <em><a href='http://www.ashg.org/2013meeting/pages/workshops.shtml#intro'>Introduction to Integrative Analysis with GenomeSpace</a></em> </td>
    <td rowspan=2> </strong><a href='http://www.ashg.org/2013meeting/'>ASHG 2013</a><strong>, Boston, Massachusetts, United States </td>
    <td> <a href='http://www.broadinstitute.org/science/programs/cancer/icbp/integrated-team-0'>Michael Reich</a> </td>
  </tr>
  <tr>
    <td> <em><a href='http://www.ashg.org/2013meeting/pages/workshops.shtml#high'>High Throughput Data Analysis and Visualization with Galaxy</a>' </td>
    <td> <a href='/anton'>Anton Nekrutenko</a>, <a href='/JenniferJackson'>Jennifer Jackson</a> </td>
  </tr>
  <tr>
    <th> January 11-15 </th>
    <td> <a href='http://www.intlpag.org/'>Plant and Animal Genome XXII (PAG 2014)</a> </td>
    <td> San Diego, California, United States </td>
    <td> <a href='/DaveClements'>Dave Clements</a> </td>
  </tr>
  <tr>
    <th> January 16-17 </th>
    <td> <a href='http://gmod.org/wiki/Jan_2014_GMOD_Meeting'>2014 GMOD Meeting</a> </td>
    <td> San Diego, California, United States </td>
    <td> <a href='/DaveClements'>Dave Clements</a> </td>
  </tr>
</table>

<br />

# Galaxy Distributions

## Aug 12, 2013 Galaxy Distribution

**[Highlights](/src/DevNewsBriefs/2013_08_12/index.md):**

* Upgrades to **Data Manager** including improved installation actions
* **Visualization** Framework tunings, plus updates to **Phyloviz**, **Scatterplot**, and **Trackster**
* **Workflows** include new reproducibility controls and editing features 
* Multiple **Tool Shed** enhancements, features, and tunings
* Plus additional updates to the **UI**, **Admin** and **Core**, and **API**, an important **Security Fix** reminder, and **Bug Fixes**

[http://getgalaxy.org](http://getgalaxy.org)

[http://bitbucket.org/galaxy/galaxy-dist](http://bitbucket.org/galaxy/galaxy-dist)

[http://galaxy-dist.readthedocs.org](http://galaxy-dist.readthedocs.org)

```
new:     $ hg clone https://bitbucket.org/galaxy/galaxy-dist#stable

upgrade: $ hg pull 
         $ hg update release_2013.08.12
```


<div class='right'><a href='/CloudMan'><img src='/Images/Logos/CloudManWideBlackLogo.png' alt='CloudMan' width="300" /></a></div>

## CloudMan Release

A new version of [/CloudMan](/src/CloudMan/index.md) was [released in July](/src/News/CloudManRelease/index.md).

<br />

# Tool Shed Contributions

<div class='right'><a href='http://toolshed.g2.bx.psu.edu/'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy Tool Shed' width=150 /></a></div>

* [samifier](http://bit.ly/13JjmN0): enable a nexus between proteomic and genomic analysis. 
* [neuma](http://bit.ly/144FqOy): Accurate quantification of transcriptome from RNA-Seq data by effective length normalization 
* [bwa_0_7_5](http://bit.ly/1cJk0yK): bwa version 0.7.5, nomore bwa aln, bwa same/sampe. BWA-MEM only for this integration version 
* [coverage_correlation](http://bit.ly/16DibRD): calculate pearson correlation of coverages. outputs clustering/correlation matrix 
* [chemicaltoolbox](http://bit.ly/152hLBK): install cheminformatic tool wrappers (chemfp, openbabel, osra, confab, ...) 
* [ctb_machine_learning](http://bit.ly/1bNa9VC): machine learning scripts for the chemicaltoolbox 
  * [+ many others from bgruening](http://bit.ly/1bNaGXC): opsin, simsearch, rdkit, silicos_it, confab, osra, chemfp, openbabel, ... 
* [nammer](http://bit.ly/1eXHAVg): find rRNA genes in a DNA sequence  
* [unique](http://bit.ly/1cdLiKZ): advanced unique lines program; filter by unique lines or a unique column subset. 
* [chemicaltoolbox_merging_chemical_databases_workflow](http://bit.ly/15gDulM).
* [lots of SAM/BAM/Pileup tools](http://bit.ly/tsdevteam)  
* [bwa_tools_mini](http://bit.ly/1dkuZiA): bwa_tools with restricted resources for use in classes 

# Other News

* [bioblend 0.4.0](http://bit.ly/1cgNhR8) is out: CloudMan and Galaxy API library 
* [Write up of BOSC2013, AFP13 ISMB/ECCB in GigaBlog](http://bit.ly/1dkyyVX): Bioinformaticians breaking down barriers in Berlin.
* TRON technologists have developed a [laboratory information management system (LIMS)](http://bit.ly/1d0XMqL) for a next-generation sequencing (NGS) laboratory within the existing Galaxy platform.  [Code and documentation are available for download](http://tron-mainz.de/tron-facilities/computational-medicine/galaxy-lims/).
* [Saket Choudhary's Week 7+8 GSOC update](http://bit.ly/1bsoiaM): making Workflow's run page editable; enable user to change params at runtime
* [galaxy-bootstrap](http://bit.ly/15u71MT) - a simple Java library and download, configure, and seed a Galaxy instance
* New [/Cloud](/src/Cloud/index.md) hub page on wiki giving a high-level overview of the several Galaxy cloud-deployment options.
* A new [Teaching with Galaxy](/src/Teach/index.md) hub page on the Galaxy wiki.  This is very much in a draft state but includes a fairly complete [Computing Platforms for Teaching](/src/Teach/ComputingPlatforms/index.md) page.
