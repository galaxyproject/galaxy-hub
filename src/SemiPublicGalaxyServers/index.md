<div class='right'>
<table>
  <tr>
    <td style=" border: none; width: 22em"> TABLE_OF_CONTENTS</td>
  </tr>
</table>

</div>
<div class="title">Semi-Public Galaxy Servers</div>

Galaxy Servers are available in all sorts of flavors:  This page lists Galaxy servers that aren't [fully publicly accessible](/PublicGalaxyServers), but that are accessible to a larger group than just the host institution's members.  (Most Galaxy instances are *internal* to an organization - they can only be accessed by members of the host institution.)

Servers are classified here by whom they are accessible to.  This can be based on research domain, geography (regional or national), or by membership in a multi-organization association that provides Galaxy Servers. 

**To add your semi-public Galaxy server to this list**, please either just add it (hey, *it's a wiki*), or [describe the server here](https://docs.google.com/forms/d/14i8FNHB7pwXrXmhvUkxXTh2VKQ-2BKsnMubXsCZadjs/viewform) and we'll post it this directory.

# Geography Based

## Australia: Genomics Virtual Lab (GVL)

<div class='right'><div class='solid'><a href='https://launch.genome.edu.au/launch'><img src='/PublicGalaxyServers/GenomicsVirtualLab300.png' alt='GVL' height="200" /></a></div>

* *Links:*
  * **[Genomics Virtual Lab](https://launch.genome.edu.au/launch)**
  * [Options](http://genome.edu.au/get/get)
* *Eligibility:*
  * Australian researchers [belonging](https://aaf.edu.au/subscribe/subscribers.html) to the [Australian Access Federation (AAF)](https://aaf.edu.au/).
* *Comments:*
  * A private GVL server is a virtual machine running on the cloud and contains a pre-installed suite of tools for performing bioinformatics analyses. It differs from public GVL servers by providing full administrative access to the server, as well as the full suite of GVL services, whereas public GVL servers provide restricted access for security reasons. For example, public GVL servers do not provide access to the Ubuntu desktop, the Linux commandline, ipython, rstudio etc. at present.
  * Private GVL servers may be launched on a public cloud of your choice (at present, Amazon and Openstack based clouds). These can be as simple as servers which provide individual access, to more complicated institutional access servers over which you will have full control. You will require access credentials to a public/community cloud to launch a private GVL server. Accessing the GVL server is completely free on the [Australian NeCTAR Research Cloud](https://nectar.org.au/research-cloud/), provided that you have a suitable account with NeCTAR. On Amazon, while the GVL software itself is free, you may have to pay Amazon usage charges.
* *User Support:*
  * [Support](http://genome.edu.au) 
* *Quotas:* 
  * Quotas are enforced by the cloud provider - it's whatever the researcher launching the GVL brings to the table essentially. For the [Australian Research Cloud](https://nectar.org.au/research-cloud/), those resource allocations are merit based. If launched on Amazon, whatever the researcher wants to pay. 
* *Sponsor(s):*
  * [NeCTAR](https://nectar.org.au)
  * [GVL project](http://genome.edu.au)
  * University of Melbourne
  * University of Queensland

## Canada: GenAP

<div class='right'><div class='solid'><a href='https://www.genap.ca/'><img src='/SemiPublicGalaxyServers/GenAP_Logo_Trans_250.png' alt='GenAP' height="200" /></a></div>

* *Links:*
  * **[GenAP](https://www.genap.ca/)**
  * [Apply for an account](https://ccdb.computecanada.ca/account_application)
* *Eligibility:*
  * All Canadian researchers are [eligible for a GenAP account](https://ccdb.computecanada.ca/account_application). International researchers that have a Canadian collaborator can also be sponsored and become eligible to a GenAP account as well.
* *Comments:*
  * [GenAP](https://www.genap.ca/) is targeting both life scientists through web portal applications such as Galaxy, datahub, and a UCSC Genome Browser mirror to facilitate data analysis, sharing and visualization of the results; as well as computational biologists through services such as state-of-the-art analysis pipelines and centralized code distribution.
  * In GenAP each PI's (Principal Investigator) project can instantiate a private Galaxy which is shared only within  his/her own group. The group admin has the ability to create, start, stop and delete the group's Galaxy.
  * The Galaxy jobs are sent to one of our clusters and the jobs are computed against the annual allocation of each PI inside [Compute Canada](https://www.computecanada.ca). Presently, Galaxy is running in two of the major clusters in Canada, Mammouth ([Université de Sherbrooke](http://www.usherbrooke.ca) ~40,000 cores) and Guillimin ([Mcgill](https://www.mcgill.ca/) ~21,000 cores). Other universities and HPC centers will join GenAP in the up coming year.
  * GenAP is planning to release a fully public Galaxy instance by the end of the summer.
* *User Support:*
  * GenAP has a ticketing system that can be reached by emailing support@genap.ca
  * Tutorial, FAQs and Manuals can be found [in our wiki page](https://bitbucket.org/genap/genap_central/wiki/Galaxy).
* *Quotas:* 
  * The default allocation of each project is 500GB
* *Sponsor(s):*
  * [Canarie](http://www.canarie.ca/), [Genome Quebec](http://www.genomequebec.com/en/home.html), [Compute Canada](https://www.computecanada.ca), [Canada Foundation for Innovation (CFI)](https://www.innovation.ca/), [Natural Sciences and Engineering Research Council (NSERC)](http://www.nserc-crsng.gc.ca/), [Université de Sherbrooke](http://www.usherbrooke.ca), and [Mcgill University](https://www.mcgill.ca/)


## Norway: NeLS

<div class='right'><div class='solid'><a href='https://nels.bioinfo.no'><img src='https://galaxy-ntnu.bioinfo.no/www/NeLS_logo_300x100.png' alt='NeLS Portal'  /></a></div>

* *Links:*
  * **[NeLS Galaxy server at UiO](https://galaxy-uio.bioinfo.no)**
  * **[NeLS Galaxy server at UiB](https://galaxy-uib.bioinfo.no)**
  * **[NeLS Galaxy server at UiT](https://galaxy-uit.bioinfo.no)**
  * **[NeLS Galaxy server at NTNU](https://galaxy-ntnu.bioinfo.no)**
  * **[NeLS Galaxy server at NMBU](https://galaxy-nmbu.bioinfo.no)**
  * **[Lifeportal server at UiO](https://lifeportal.uio.no)**
  * [Apply for a NeLS account](https://nels.bioinfo.no/pages/registration.xhtml)
* *Eligibility:*
  * Life Science researchers from Norwegian academic institutions can log in with their FEIDE accounts (federation of home institution credentials). Other research collaborators can apply for a NeLS account.
* *Comments:*
  * The Norwegian e-Infrastructure for Life Sciences (NeLS) consists of a network of Galaxy servers at five Norwegian universities accessible via single sign-on.
  * All the NeLS Galaxy servers are connected to the [NeLS Portal](https://nels.bioinfo.no/) which provides centralized storage and sharing capabilities.
  * NeLS develops and maintains several [analysis pipelines](https://galaxy-ntnu.bioinfo.no/www/nels_pipelines.html) offered as Galaxy workflows.
  * The NeLS infrastructure is operated by the Norwegian node of [Elixir](https://www.elixir-europe.org).

* *User Support:*
  * The [Norwegian Bioinformatics Platform](http://www.bioinfo.no) has a help desk that can be reached by emailing contact@bioinfo.no
* *Quotas:* 
  * NeLS Galaxy instances have some temporary storage available, while the bulk volumes of data are managed through the NeLS centralized storage and the Norwegian national storage services.
* *Sponsor(s):*
  * [University of Oslo](http://www.uio.no/)
  * [University of Bergen](http://www.uib.no/)
  * [Norwegian University of Science and Technology (NTNU)](http://www.ntnu.no/)
  * [Norwegian University of Life Sciences (NMBU)](http://www.nmbu.no/)
  * [UiT The Arctic University of Norway](http://www.uit.no/)
  * [Elixir Norway](http://www.elixir-norway.org/)
  * [The Research Council of Norway](http://www.forskningsradet.no/en/Home_page/1177315753906)



## Poland: PL-Grid

<div class='right'><div class='solid'><a href='https://galaxy.plgrid.pl'><img src='/SemiPublicGalaxyServers/PL-Grid_Logo.png' alt='PL-Grid Galaxy'  /></a></div>

* *Links:*
  * **[PL-Grid Galaxy Server](https://galaxy.plgrid.pl)**
  * [Become a user](https://docs.plgrid.pl/pages/viewpage.action?pageId=11306686#Diagnostykamolekularna(GalaxyServer)-platformaanalizydanychzNGS-becoming_userBecomingauser(Aktywowanieusługi))
* *Eligibility:*
  * Any PL-Grid user who requested access to Galaxy Server service.  *The PL-Grid project is [free of charge](https://docs.plgrid.pl/pages/viewpage.action?pageId=11306686#Diagnostykamolekularna(GalaxyServer)-platformaanalizydanychzNGS-becoming_userBecomingauser(Aktywowanieusługi)) for any Polish scientist. It is also free for any foreign collaborator of Polish scientists.*
* *Comments:*
  * This deployment is focused on NGS analyses.
  * [Andromeda](http://galaxy.nbic.nl/) is hosted at the [SURFsara](https://www.cloud.sara.nl/) [High Performance Computing (HPC) cloud](https://www.cloud.sara.nl/).<br />

* *User Support:*
  * Manuals in [English](https://docs.plgrid.pl/pages/viewpage.action?pageId=11306686) and [Polish](https://docs.plgrid.pl/pages/viewpage.action?pageId=11306686)
* *Quotas:* 
  * Every PL-Grid user applies for negotiable grants for resources such as cpu power, storage etc.
* *Sponsor(s):*
  * [PL-Grid NG](http://www.plgrid.pl/en/projects/ng) and [ACC CYFRONET AGH](http://www.cyfronet.krakow.pl/en/4421,main.html)

# Domain Based

## Cancer Computer

Information is coming ...

# Association Based

<div class='right'><br /><div class='solid'><a href='#australia-genomics-virtual-lab-gvl'><img src='/SemiPublicGalaxyServers/AAF_Logo_wide.png' alt='AAF on GVL' width="300" /></a></div></div>

## Australian Access Federation (AAF)

[Members](https://aaf.edu.au/subscribe/subscribers.html) of the [Australian Access Federation (AAF)](https://aaf.edu.au/) can use the [GVL (see above)](#australia-genomics-virtual-lab-gvl).
