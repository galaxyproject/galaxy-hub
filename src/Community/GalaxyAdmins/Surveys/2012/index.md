---
autotoc: true
---
<div class='center'><a href='/src/Community/GalaxyAdmins/index.md'><img src="/src/images/Logos/GalaxyAdmins.png" alt="GalaxyAdmins" /></a></div>

{{> Community/GalaxyAdmins/Surveys/LinkBox }}

The [GalaxyAdmins group (formerly GalaxyCzars)](/src/Community/GalaxyAdmins/index.md) was started in April 2012.  As part of that launch, an online survey was [sent out in May](/src/news/GalaxyCzarsSurvey/index.md).  This page summarizes and categorizes the responses to that survey.  There were 31 total responses.

*Note: Answers have been put into various categories, depending on content.  Some answers covered multiple areas and have been split up.  If you disagree with the categorization of a particular answer, please feel free to move it elsewhere.  This is a wiki, after all.*

The original responses, minus name, institution and email are **[also available](PLACEHOLDER_ATTACHMENT_URL/src/GalaxyCzarsSurveySpring2012.xls)**.



# Big Picture

## About how many end users do you expect your Galaxy to have?

<table>
  <tr class="th" >
    <th> # Users </th>
    <th> # Responses in each range </th>
  </tr>
  <tr>
    <td style=" text-align: center;"> <= 20 </td>
    <td style=" text-align: right;"> 8 </td>
  </tr>
  <tr>
    <td style=" text-align: center;"> 20 - 50 </td>
    <td style=" text-align: right;"> 8 </td>
  </tr>
  <tr>
    <td style=" text-align: center;"> 51 - 100 </td>
    <td style=" text-align: right;"> 7 </td>
  </tr>
  <tr>
    <td style=" text-align: center;"> 101 - 500 </td>
    <td style=" text-align: right;"> 4 </td>
  </tr>
  <tr>
    <td style=" text-align: center;"> > 500 </td>
    <td style=" text-align: right;"> 2 </td>
  </tr>
  <tr>
    <td style=" text-align: center;"> blank, not sure </td>
    <td style=" text-align: right;"> 2 </td>
  </tr>
</table>


## What type of topology are you using for Galaxy? (and computational resources?)

### Standalone Server

1. We are currently running Galaxy on a standalone server but we are trying to integrate it within our computing cluster running LSF.
1. We haven't installed it yet but we are planning to use a standalone workstation - Dell C6145 system using the 16-core AMD processors.  This chassis includes two discrete systems, each with 64 2.3 ghz cpu cores, 128GB RAM, and 9 2.5” drives and we'll be using one chassis for the Galaxy install along with LifeScope from Life Technologies.
1. Standalone workstation, 8 cores , 16 GB RAM
1. We use a standalone server with four quad-core Intel X7350 and 128GB memory. This server is currently also used for individual logins. We are in the process of making it the dedicated Galaxy server on which Galaxy is the only service running.
1. Galaxy installed for local use in our group (4 persons) is running on a Centos 6.2 virtual machine on Redhat6.2 host using KVM. The Galaxy virtual machine has 8 cores and 24GB RAM, and is run on a dedicated logical volume. The host has 24 cores and 96GB RAM. 
1. We currently have Galaxy hosted on our small analysis server (24Gb RAM, 8 cores). We're hoping to put it on a much larger production server later this year. 
1. Standalone server, HP Blade, 10 core, 32 GB Memory, 

### In Transition / Multiple

1. Galaxy is currently deployed on a Dell Quad Xeon 5150, 20GB RAM, 7TB partition. Once we have proof of need, we plan to integrate the application with our 2000 core cluster using PBS, 10Gb interconnect, and Panasas storage.
1. Large memory (1TB), multi-core (8 core x 4 threads) server.  Moving towards a PBS/Torque cluster.
1. We run Galaxy on a multi-core server with a healthy dose of RAM and a beefy RAID storage. This currently runs most of the compute jobs for Galaxy. <br />The storage is mapped to a modest SGE cluster, which is currently used for BLAST jobs from Galaxy (with the intention of moving more tools to the cluster).
1. Currently experimenting with a trial version on 8 node/12 core cluster (96GB/node, 8GB core) running SGE; also using 8 core VM version (non-cluster).
1. We have two instances. One is a standalone machine for testing and learning purpose. This is a 4-cpu server with 8GB memory. The other instance is installed on the cluster with about 5500 cores. This cluster is running all the analysis and research computing within OICR. It is under SGE. We also use Amazon cloud when doing our workshops.
1. We are currently running on a 64-core server. Right now we're trying to get an instance running on a ~5000-processor  PBS cluster.
1. At the moment it is currently running on a Linux Ubuntu virtual server. It is not part of a cluster or anything fancy. Running on an 8gb machine with 2 cores currently.  We have replaced SQLlite with postgres and have it running on an apache server. We also have set up proFTP.
1. Standalone server: 24 core, ~60Gb RAM.  No cluster although we do have an instance running but not in use on our local SGE cluster
1. I just ordered a large standalone server. It should arrive in a few weeks, when I'll begin setting up a beta installation. If this gains traction, I hope to deploy it on the university's cluster.

### Compute Cluster

1. Galaxy is running on a compute cluster with 4 nodes, and 4 GB per node.  We are using Rocks as our infrastructure with PBS.
1. 4 node SGE cluster
1. Job and web runners are on a single node that's also hosting a pgsql database for the Galaxy metadata. All jobs are run on a SGE cluster using the drmaa adapter. Number of cores used for the Galaxy instance changes depending on the demand. The head node has 8xL5420@2.50GHz cores and 16Gb of RAM. The cluster nodes have 12xX5675@3.07GHz cores and 96Gb of RAM.
1. Galaxy is hosted on a computer cluster. Each computer node of the cluster has 8 cores with 12G memory.  Torque PBS is the resource manager.
1. Dell blades/m1000e chassis; 128 cores; 1TB RAM;  72TB raw array storage; ubuntu 11.10; SGE;
1. My Galaxy instance is integrated with a computing cluster (SGE).
1. We plan to deploy a galaxy instance on a ~1000 CPU blade cluster + fat nodes. We expect to have it coupled with PBS PRO queueing system. We are still evaluating the possibility of having galaxy frontend in a virtual machine communicating with the postgres db and cluster system as backend.
1. We have two Galaxy environments.  
  1. A QA (Quality Assurance) Galaxy env which dispatches jobs to a small closed cluster managed by SGE.   
  1. A Production Galaxy env (in alpha phase) which is a submit node to our campus High Performance Compute cluster managed by SGE.   Our production galaxy box has 24 GB Ram and is a 12 core, infiniband network card. 
  We decided to strip back the amount of tools installed to only a small subset, with plans to lazily expose more tools upon request of users.  We plan to develop and publish common analysis pipelines for common work being currently done at the U of I.
1. Integrated with a large compute cluster using PBS/Torque.  Cluster has a number of queues specific for the tasks, including nodes with large memory capacity (500 GB - 1 TB, with a 2 TB machine on order), standard 16-24 GB nodes with 8-12 core each, etc.<br />We anticipate expanding to include other resources on our campus, including NCSA machines and other clusters.
1. We have a dedicated galaxy VM which is registered as a submit host with our SGE cluster  Cheaha - https://docs.uabgrid.uab.edu/wiki/Cheaha . The galaxy VM and the Cheaha cluster have a consistent view of the underlying shared file-systems - home directories, Lustre file-system and shared apps/install directory. Below is a logical diagram of our research computing platform that explains our galaxy installation as well - https://docs.uabgrid.uab.edu/wiki/File:Research-computing-platform.png .
  * Platform Details
    1. System information of the galaxy VM:
      1. A VM with 2GB memory and 2-cores running on a KVM platform
      1. OS: CentOS 5.8
      1. Python: 2.6.6
      1. Database: PostgreSQL 8.4.9, Local install
      1. Front-end web server: Apache HTTPD 2.2.3 with external Shibboleth authentication
      1. Galaxy revision: Typically 1-2 weeks behind the upstream galaxy-dist repository
    1. System information on the cluster (one queue):   
      1. Gen 1: 50 nodes, 2 cores/node, 2G RAM/node, 1.60GHz (AMD Opteron 242)
      1. Gen 2: 24 nodes, 8 cores/node, 16G RAM/node, 3.00GHz (Intel Xeon E5450)
      1. Gen 3: 48 nodes, 12 cores/node, 48G RAM/node, 2.66GHz (Intel Xeon E6550)
  * notes:
    1. What is notable and different about our cluster topology is that compute nodes are shared between jobs, and jobs must live withing their request resources (memory, time) or they are killed, or they will negatively impact other users' jobs (cpu). Additionally, the cluster is hetrogeneous - made up of 3 classes of nodes, all in the same queue, which are selected based on the resource requirements of the task submitted. This is very different than Penn State Galaxy's configuration, and makes coordination between code, task parameters and DRMAA settings extremely important.

1. We are using both powerful standalone workstations and a computer cluster. The cluster versions is being set up now, not operational yet. 
  1. In September we launch a new cluster (Abel):
    * 912 nodes - 2 intel cpus -  8 cores (2 x Intel Xeon Sandy-Bridge CPU x86 64bit, E5-2670 2.6 GHz 8.0 GT/s 20 MB cache 8-core), 64 GB RAM, IB
    * 16 GPU-nodes,  2 x Intel Xeon Sandy-Bridge CPU x86 64bit, E5-2609 2.4 GHz 6.4 GT/s 10 MB cache 4-core, 64 GB RAM, 2 x Nvidia Kepler GPU-card with 6 GB memory, IB
    * 8 Hugemem-noders, 4 x AMD Opteron Abu Dhabi CPU x86 64bit, 3.0 GHz 6.4 GT/s 16 MB cache 8-core, 1 TB RAM, IB
    * OS : Rocks , RHEL6
    * Queueing system: SLURM 2.2.6.1
  2. For Galaxy configuration
    * apache (2.2.3) proxy
    * ssl
    * Posgresql DB on a different host
1. We deployed galaxy over a virtual system (XEN) integrated with a computing cluster (SGE).  Some details of the cluster nodes: 
  * 256 compute nodes with Infiniband connections to Ethernet - Low latency cluster
  * Dual cpu Intel E5440 quad core a 2,8GHz.
  * RAM 16 GB DDR2 FBD 667MHz
  * 2 Hard Disk SATA 250GB 5400 rpm.
  * 2 Gigabit Ethernet interconnection
  * 1 Infiniband connections
1. We run a galaxy production instance on a virtual machine running SUSE Linux Enterprise Server 11 (x86_64).  The server has 4 cores and 16GB of memory.  We also have a development instance of galaxy where we build our own tools, and a galaxy test instance for testing these tools, or new deployments of galaxy before deploying to our production instance.  Our Galaxy instances are all integrated with our high performance computing cluster which uses Torque/MOAB for job scheduling.  Our HPC cluster currently has 17 32 core nodes (544 core total), plus 4 12 core nodes that are dedicated to HTS QC and 1 core jobs from Galaxy.  Most of our nodes have 128 GB of memory, 2 have 512 GB of memory to deal with assemblies.

### Cloud

1. AWS EC2 Galaxy Cloudman, m1.large instance.  Used for dedicated Proteomics Perl code analysizing PTMs (Post Translational Modifications).

## How are you handling data storage?

**How much storage do you dedicate and on what platform? Are you using quotas? Do you have an automated dataset cleanup policy?**


| Capacity |  Architecture/Vendor  |  Policies  |  Other  | 
| -------- | -------------------- | --------- | ------ | 
| |  Netapp via nfs  |   |   | 
| |  Raw data is stored on an Isilon disk array shared across the institution.  Galaxy data is stored on a private disk array on the cluster itself.  |   |   | 
| 50 - 100GB |  Only require say 50 - 100GB at present as part of standard Cloudman volumes.  |   |   | 
| 10 TB |  Local NAS storage cluster  |   |   | 
| |  Because we are hosting on a virtual server its just a straight connection to the hard drive.  |   |   | 
| ~300 TB |  We are using GPFS.  |   |  At the moment we are just starting to deploy Galaxy and haven't entered production so we haven't reached anywhere near capacity, but we do anticipate scaling to larger storage (possibly PB) in the near future.  | 
| 10TB |  NFS  |   |  we have recently setup the Galaxy and have not reached the capacity.  | 
| 5 TB |  NFS  |   |  We are moving from this<br /> to this  | 
| 1PB  |  GPFS  |   | 
| |  We are using a MD1000 for testing but will implement production on Panasas storage.  |  We have setup default user quotas of 200GB.  |   | 
| 16TB |  NFS; a computer node with 16TB storage space is used as the file server of the computer cluster.  |  We are not using quotas yet since only 10% of the total storage space is being used so far. We will think about purging method when more storage space is being used in the future.  |   | 
| |  Dell R515 fileserver; md3200 and md1200 disk array expansion units.<br />nfs over a 10GB ethernet backplane for the blades  |  Run default purge/delete scripts on a cron job<br />Yell at users to clean up old junk files occasionally<br />run fdupes and try to figure out all the redundancy.  |   | 
| |  We have a BlueArc that we're using at present, and an array of NAS devices to provide support to that.  |   |   | 
| 15TB |  Direct attached 15TB - plus, the server has access to other NFS mounted storage (ie for data libraries).  |  We run the provided clean-up scripts (set to '90 days') after each code update (which happens four times a year) - no user quotas used.  |   | 
| 36 TB<br />50 TB |  Our HPC uses infiniband networking and lustre storage for high speed access.   We are looking to dedicate an initial 36 TB of lustre scratch space for Galaxy computational access.  |  The lustre space is not backed up and is considered temporary.  We don't have quotas, but will be looking at last access time and auto cleaning up datasets if there is data that has not been accessed in the last 30 days (we plan to first send out emails warning of this before removal giving users the chance to download or access).   We have a 50 TB ZFS box being installed right now and we will be testing out an infiniband network card with it.  This space will be used to hold our data libraries which will be more permanent store for Galaxy data.  |   | 
| 3TB |  The Galaxy database is located on a logical volume of the host machine and is exported to the Galaxy virtual machine through nfs. Total storage capacity for the Galaxy database is about 3TB.  |  User quotas are set up on Galaxy.<br />In addition, everybody got 200 GB network space, accessible on their laptops, and which can imported into a data library. This is for easy big data upload to Galaxy.  |   | 
| 17TB |  1. Currently 17Tb storage dedicated to Galaxy but we have provision for more if required. Currently Galaxy user data takes up ~7Tb.  |  I have set up quotas of 500Gb per user and 1.2Tb for admin users (bioinformatics core facility members). We ask users to be ruthless with datasets they don't need to reproduce analysis but this is hard to enforce. We run a cron cleaning script weekly but there are some situations where the galaxy clean up scripts have not removed data I thought should have been purged.  |   | 
| 180 TB |  The galaxy datasets directory resides in our 180TB Lustre fabric.  |  Currently we don't have any quota policy or perform any automatic dataset cleanup. We rely on users to cleanup their datasets after their analysis is complete.  |   | 
| |  FhGFS  |  We assign 200GB quota per cluster user on a FhGFS. Monitored by scripts and users warned to clear up space.  |   | 
| |   |   |  We are planning to import our sequencing data into Galaxy as data libraries or provide a tool for importing these data into Galaxy as we currently do not use Galaxy for managing our sequencing data as we have an in-house lims. We are thinking of copying the data from the archive server to lustre before running tools and applying per user quota.  | 
| 65TB |  A homegrown storage solution with a 65Tb lustre filesystem has been used for the Galaxy prototype and in production so far.  |  The usage is still below 50%, so no cleanups are being done, yet.  |  Galaxy will be migrated to a ZFS based NFS storage appliance in the medium future.  | 
| |   |   |  We haven't figured out how we'll do this yet. The plan is that since we'll be using this mainly within the Genomics Core, we will move the analyzed files to our SAN when everything is complete.  | 
| 2TB |  NFS storage currently, but expandable.  |  No quotas enforced so far, but maybe in the near future.  |   | 
| |  RAID  |  We're not using user quotas yet, but plan to in the near future as the current RAID partition is nearly full and user numbers appear to be on the increase.  |   | 
| |   |  Quotas are managed in admin interface.  |   | 
| |   |   |  Still working this out.  | 
| |  We use NFS sharing storage.  |  Right now there is no quotas applied. We clean the storage every month.  |   | 
| |  We are deploying on Lustre filesystem  |   |   | 
| |   |  We're not using quota's yet, but can see it being essential in the next 3-6 months. At the moment we manually carry out dataset cleanup every 2 months.  |   | 
| 156TB |  Our galaxy instance is currently sitting on 156TB of isilon storage.  This storage is currently shared by all of our high performance computing users (not just galaxy users).  We are at 94% of capacity.  Without question storage is our biggest challenge.   |  We have automated scripts set up to delete files which are marked for delete by users, which runs on a weekly basis.  This is really not satisfactory.  There is no good, convenient way for users to clean up their data, and many don't bother until we warn them that we are critically low on space.  We have not use instituted the use of quotas in Galaxy, as we've not yet been able to determine what is reasonable.  We are working on an overall data retention policy at our institution now.  |   | 

# The Devil is in the Details

## Have you done any customizations to Galaxy?

### No Customization

1. No, nothing specific to our site.  I was just trying to get Galaxy configured properly to run.
1. Not yet (x 2)
1. (blank x 4)

### Admin Customization

1. I've created scripts to automatically upload sequencing data into galaxy data  libraries using galaxy REST api and directly using model provided by sqlalchemy to create specific user/group that match our current lims.
1. Created maintenance scripts to automatically start/stop galaxy, check for running jobs, check the logs and compare different version of universe and tool configuration files."
1. I created some hard and soft restart (restarts the job runner, then individual load-balanced web runners in turn to maintain the interface availability) init scripts and galaxy run scripts that work together. My Galaxy instance is running on top of an environmental modules system based on "lmod" from TACC to unify the back-end tool usage with the batch system.
1. Basic customisations to run.sh for local setup

### Authentication and User Management Customization

1. We utilize SFTP for data transfer and CAS for login.
1. No, but I'm using an Apache proxy that authenticates against the University's CAS single sign-on server.
1. We changed galaxy code to auto-create unix accounts and modify existing unix accounts upon new galaxy account creation.  This also forced changes to the upload code.

### Usability and Interface Customization

1. dataset naming
1. and add new code in mako interface.
1. Basic customisations to appearance.
1. Display file-system path of datasets: We have  changed a view template file to display actual file-system path of the dataset when a user clicks on 'View Details' link. This allows users to view actual file-system path datasets and download dataset files using scp rather than HTTP. This has been extremely important, as we have several power-users who move in and out of galaxy over the course of their workflows, and easy of access to underlying files and ability to easily link or ingest files is critical. We would like this process to be even easier - ability to move files in/out through linux command line, mnemonic names of data files, etc.

### Local Tools Customization

1. custom tools
1. We run a number of in house tool wrappers (most available on the Galaxy Tool Shed), and are actively using and contributing to the 'beta' job splitting code (for BLAST).
1. We developed several tool wrappers for some tools that are frequently used here, for instance, MrBayes, Migrate, etc.
1. Yes - a suite of digital gene expression tools based on DESeq and edgeR soon to be pushed to the toolshed.
1. Proteomics PTM analysis tools.
1. I have add new tools
1. We are developing tools/wrappers to integrate with out tools we use.
1. I've written several wrappers. I haven't modified the core codebase, though.
1. Created some custom tool.xml files
1. Not at this time. In the past I've written some code to support some data types before they have been included in default galaxy, such as bigwig. In the past I also connected local galaxy with local UCSC genome browser instance (for track display)
1. We have made tools but nothing of the management process really.
1. Only small changes, based on discussions on the galaxy-dev mailing list. Most of them showed up in the regular code base at a later stage. But we use a lot of self-written, institute (or problem) specific tools, which require their own data-types and local data (outside of Galaxy).
1. We have had to tune and change several tool wrappers for various reasons
1. We have exposed additional tools in our galaxy, some custom tools some public.
1. We changed the navigation left hand menu to put workflows up top and limited back the amount of tools we expose
1. Not yet big customizations. We are looking into the code base only to get more out of the tools we implement (e.g. getting to pass the original input parameters used for creating a dataset). 
  * Furthermore, tools that do not work out of the box are disabled.
1. Only minor, mostly on datatypes and tools. Now trying to migrate to a fresh install as the mercurial repository seems a little messed up.
1. Coordinate / Sync tool wrapper commands with job runner URLs: DRMAA and .xml-wrapper & .py-adaptor changes for every tool we use. Because we are on a shared cluster, where resources used must match those requested, we've had to edit the DRMAA of every command we use, often not just the universe_wsgi.ini file, but also the .xml wrapper and .py adaptors, in order to be able to run the jobs. This has been a major task and barrier to using new tools.
1. I have written a database tool which I am now trying to integrate with Galaxy.
1. We do a fair amount of development with respect to custom tools and workflows for our users.

### Sample Tracking Customization

1. We're using the NGlims version of Galaxy (from Brad Chapman's fork) and we've included a lot of our own tools. 
1. We are planning to build integration between our Genologics LIMS instance and our Galaxy instance, to simplify the movement of data between the two and to give us the ability to grab descriptive information about a fastq file from the LIMS.  This project has not yet started.  If anyone else has already built this type of integration, we'd be very interested in it.

### Error Handling Customization

1. Tolerate cluster communication errors: The galaxy's job runner used to mark jobs in 'abort' state as soon as the cluster was unreachable (even for a second). These 'aborted' jobs would continue to run on the cluster however the galaxy server would have not recover or re-monitor their state. We had fixed it locally by ignoring 'DrmCommunicationException' returned by the drmaa-python library. This was later fixed in the upstream galaxy repository as well.
1. Email notifications for failed jobs: As mentioned in an issue 'Capturing failed/aborted jobs by the scheduler' the galaxy doesn't report failed or aborted jobs by the scheduler resulting in 'false positives' for user and sometimes failures in down-stream analysis. We haven't been able to resolve this issue however we send out email notifications for such failed jobs by scanning SGE's accounting file for failed jobs and then querying galaxy database to find out job specific details - user, tool etc.

### Other Customization

1. We have implemented a platform for the analysis of two large scale longitudinal studies (~10,000 individuals) on autoimmune diseases and longevity conducted in Sardinia. We use GALAXY to provide a convenient and user-friendly interface, that allows to access data import, analysis and sharing of results.  The platform is built upon the core services of OME Remote Objects (OMERO) and GALAXY. OMERO is an open source software platform that includes a number of storage mechanisms, remoting middleware, an API, and client applications for biological data management developed by the Open Microscopy Environment.
1. Early on we made customizations to galaxy.  We've decided, for the most part, if you make customizations it's easiest on you if you can get these folded back into the code-base.

## Did you hit any major issues in setting up and configuring a local galaxy?

### No Setup Issues

1. no (x 6)
1. (blank x 6)

### Data Setup Issues

1. Only issue so far has been what reference files need to added. 
1. Failures during dataset import: The galaxy preprocesses datasets during the upload/import process. For example, fastq.gz files are uncompressed and sam/bam files are sorted during the upload process. We have seen some silent failures during some of these preprocessing steps, especially in uncompressing of fastq.gz files. Frequently, that uncompress produces a truncated or corrupted .fastq file, with no indication of error in Galaxy, which results in mysterious failures or incorrect results from down-stream analyses. Fixing that is important. Having checksums computed & displayed for both the original compressed files and the final uncompressed file available in "info" would help a lot.

### Cluster Setup Issues

1. The major problem for the time being is the cluster integration. 
1. The pbs_python adapter I used with Torque at the prototype stage was very leaky - required constant monitoring and restarts of the Galaxy job runner.
1. Configuring Galaxy and our Cluster to talk to each other was surprisingly complicated.  
1. SLURM was used as the resource manager at the beginning, but it turned out Galaxy doesn't like it very well, so we had to switch to Torque PBS instead.
1. NFS latency. When galaxy is installed on an NFS shared folder instead of the local hard drive, the job runner does not communicate with  Torque PBS very well.
1. We had to work around python versioning issues.  Our server has a supported version of python (v2.7) but our cluster has an outdated one (v. 2.4), so we ran into problems when initially deploying Galaxy with various incompatibilities between the two versions.
1. No job or dataset specific control on cluster resource requirements: The galaxy's DRMAA configuration is tool specific and not job specific. This doesn't play in a shared cluster/scheduler environment. This is an on-going issue and a major limitation for shared cluster environments. It would be nice to have an option for either of following options:
  1. Allow users to specify resource limits
  2. Make DRMAA configuration data-set dependent. 
    Right now there's now way for a job submitter to easily select different resource requests (like RAM) depending on the size/complexity of the genome being worked on (eg, human[big] vs vaccinia virus[very small] vs tree-shrew[thousands of contigs]). Thus, we have to size resource requests for the biggest possible data set, which causes the small runs to wait a LONG time in the queue for resources they don't need. Nor does it seem possible to set up a formula for DRMAA based on the size of the genome being used (ie, make the choice automatically). This is compounded by lack of good data on the performance/requirements of many of the underlying programs for different input types).
1. Capturing 'failed/aborted' jobs by the scheduler: There are cases (listed below) where a job is aborted by the scheduler but it still shows up as successful in the galaxy (green-boxes):
  1. Job exceeds requested resource limits such as memory and run-time -  http://dev.list.galaxyproject.org/job-status-when-SGE-kills-aborts-job-td4141007.html 
  2. Compute node on which job was running fails/restarted

 Job failures because of # 2 rarely happen however # 1 is very common if you have a shared cluster environment and galaxy tool's drmaa/job-runner configuration is not liberal (e.g. configure tool with 64GB RAM, 96-hrs run-time..).
 <br />
 Such jobs get correctly marked with non-zero exit state (failed jobs) in the scheduler's accounting file. However, this failure state is not captured correctly by the galaxy or underlying drmaa libraries. Some tools give/capture empty dataset output while others capture partially complete output. Since the galaxy shows such failed job with successful/green-box state end-users expect a valid dataset output. Also, since a job is marked with a 'successful' state in the galaxy, all the subsequent analysis steps which use this job's output are run with an invalid dataset input. This results in wrong analysis which may or may not get detected depending on the tool and user! This inability to tell if a job was really successful (false positives) is becoming a major reason for people to avoid galaxy: they don't know if they can believe their results.
1. Used drmaa libraries for cluster runner (http://apps.man.poznan.pl/trac/slurm-drmaa/downloads)
1. Used Dalhö's routine (http://mdahlo.blogspot.com/2011/06/galaxy-on-uppmax.html) to make it run on our cluster

### Security and FTP Setup Issues

1. Integration into the Single Signon system is still an issue. Job monitoring in the Galaxy and data retrieval back from UCSC still don't work because of it. 
1. FTP server for users to upload large files through FTP.  Eventually we were able to get it work, but the configuration was not very easy.
1. A few such as setting up proFTP. Galaxy doesn't like showing users the data correctly because the permissions are not the users that has logged in but rather the systems. Had to hack and give the files 777 permissions.. Not nice.
1. We needed a mechanism for tying galaxy accounts to unix accounts to allow for sftp access.  We had to modify galaxy for this.  
1. Sharing datasets/histories and using external visualization tools: Our galaxy server uses external Shibboleth authentication. As many of you might be aware that certain URL patterns need to excluded from authentication realm for certain galaxy features - e.g. sharing histories, datasets and external visualization tools - UCSD, IGV. These URL patterns were not clear initially and we faced some difficulty while configuring them. We have on-going issues on this front, including enabling IGV integration. Also, it makes dataset and history sharing rather inscrutable & laborious.
1. We are trying to set up a IdP autentication which is different from OpenID but also keeping the common login available. Under implementation .... a though job :)

### Migration Setup Issues

1. Additionally some tool wrappers that we use frequently seem to change often causing migration breaks in our workflows, etc.  This causes problems for us to keep on the latest Galaxy code base.
1. Not in initial set up but I have nor found a reliable method to transfer our mysql database to a postgres database. I would like to run galaxy reports which works fully with postgres and not mysql.
1. One of the bigger challenges we have now is when we merge a new release with our own custom changes.

### Tool Setup Issues

1. Most issues have been on the Galaxy development side adding new tools.
1. some issues with viewing BAM files in IGV from Galaxy
1. However, some tools did not work out of the box. This is bad of course. It was not because of the requirements were not met, but due to too new versions of the dependencies, to which the code was not adopted. Especially visualisation tools are hit by this. 
1. TEMP space configuration: The galaxy's shared TEMP space configuration several failures initially that were difficult to debug. This has been  issues resolved now for non-Java tools by modifying TEMP variables in the job template string in job runner drmaa class. However the issue still persists for Java based tools wheres tool wrappers need to explicitly set java.io.temp setting. Related discussion: http://comments.gmane.org/gmane.science.biology.galaxy.devel/1986

### Misc Setup Issues

1. We got some help to scramble the psycopg2-2.0.13 egg in order to connect to a PostgreSQL DB server on a different host
1. Sample Tracking System, it turned out the Sample Tracking system can not transfer data from the sequencer to Galaxy automatically (According to the galaxy-dev mailing list, this has been fixed and will be available in the next release).
1. Not really for the Galaxy framework. Smaller issue: serving static content through apache got not resolved (due to my incapability configuring apache properly :-)) 

### General Setup Issues

1. Yes.  It took about 3 -4 weeks to get Galaxy up and running and configured.  Even then, we still had unresolved problems.  I had to abandon it in order to make progress on other projects.  
1. Technical issues are mostly specific to the local IT/political environment IMHO
  * I think the hardest parts are marketing, advocacy (you need be able to reproduce your analyses just like you can reproduce your experiments!), user training  and tool building and tailoring to suit the specific high throughput local needs of your biologists and PI's
  * Tip of the day: Smart postdocs are your friends!
1. There was a whole lot of trial-and-error. The lack of a comprehensive manual and up-to-date documentation made things challenging. Having a team of people and some way to track issues, like a ticketing system, was invaluable for us. We used sharepoint.
1. Documentation
1. We've had our galaxy instance for close to 2 years at this point.  It took much longer to get a production instance of galaxy set up than we expected it would.  Getting a simple instance of galaxy up is relatively easy, but getting a production instance up was very time consuming.  We ended having to hire an "application administrator" to manage the instance and the associated HTS data movement.  It's not clear to me if an instance would be as hard to install today.  

## What limitations have you experienced in hosting Galaxy and satisfying end user requirements?

### Very Few Limitations

1. Not in production yet.
1. Not yet but expect to encounter these once user base starts to grow.
1. We have only tested a little bit and have not had too much feedback currently.
1. none so far.
1. (blank x 10)

### Capacity Limitations

1. Disk space.  Galaxy stores intermediate step files which can be large.
1. Our most common complaints have more to do with the underlying (lack of) compute power rather than any complaints about Galaxy itself. Most of our users think that Galaxy is an excellent tool.

### Tool Definition Limitations

1. Users always complain about the lack of wrappers for their favorite tools. I've been writing wrappers, but the amount of time I can devote to that is not big, so the process is too slow to make my users happy.
1. The description and naming of the tools is sometimes plainly misleading. Even with the search tool, people often do not find a simple tool they are looking for. A threat to Galaxy.
1. Quality of tool wrappers: (Wrappers missing inputs or outputs) a lot of galaxy wrappers don't have all the parameters for the underlying tools, and many "throw away" valuable outputs & log files - like "unmapped reads" from tophat. This pushes people outside of galaxy, if they want the extra parameters or need those output.
1. I am trying hard to find out how can I read logged-in user's database ID, when a tool loads up. Because my tool meant to load up (in a dropdown) some custom data from a non-galaxy database for the user to select and submit a job.  I have posted this quest on Galaxy-Dev but in vein. <br />If I could find out this in this forum that would be great.
1. There needs to be an improved mechanism for supporting multiple tool versions and tool wrapper versions in the same galaxy. 
1. Version handling of tools - while many tools report the version the dataset was run with, Galaxy does not give us good reproducibility - the wrappers generally run the latest version of the tool in the path, and assume the .loc files point to the indexes matching the latest version (say, BWA 0.5 vs 0.6). This means people can't go back and re-run analysis 6 months later to tweak parameters, without unknowingly moving to a new version of the tool - which may give completely different results. This can probably be handled in two manners: 
  1. Multiple versions of the same tool and tool wrappers (hard-coded with particular tool version) can be installed on the system. 
  1. Tool wrappers or some other component of galaxy can search PATH or environment modules to provide version specific tool option

### User History and Dataset Handling Limitations

1. There must be a built-in dataset export feature similar to the library loading from the filesystem. Galaxy is not an all-inclusive solution and the lack of an export capability for large datasets is a big problem.
1. We have several power-users who move in and out of galaxy over the course of their workflows, and easy of access to underlying files and ability to easily link or ingest files is critical. We would like this process to be even easier - ability to move files in/out through linux command line, ability for non-admin uses to "link in" files, mnemonic names of data files, etc.
1. naming of workflow steps - users are not happy that they must maintain a map of dataset 14 = sample1bc1 ...
1. We would like a better way in naming the output of the jobs rather than manually having to change the name. 
1. there is no useful space for annotating histories.
1. No hierarchical dataset organisation for histories.
1. Hard to view "structure" of history - to see which datasets are parents/children of which others. Need a way to quickly highlight parents/children in history, or to draw and USE a structured/tree version of the history. For a simple, yet effective example, see Bugzilla display of bug dependencies (blocked by/blocks; http://sourceware.org/bugzilla/showdependencytree.cgi?id=3385)
1. Multi-input-file-selection is great, but doesn't work with base tools, only with work flows. It also doesn't have a provision for dealing with Paired-End data (need parallel arrays of input FASTQs), which is almost entirely what we're working with!!
1. Data set deletion through the GUI is very laborious. Need at least multi-select and delete. For example - one click to delete all datasets from a failed cuffdiff run, or from a BWA run and all down-stream (dependent) analyses.
1. No easy way to visually tag datasets in a history - highlight yellow, etc, etc, in a way that shows up in the history itself. Folks often end up keeping a parallel history in excel. 
1. Most of our users dislike the file management.   It's tedious to upload large numbers of files, move them back and forth between histories and libraries.  Selecting files, and histories for deletion can be quite tedious.  We have many users who do RNA Seq analysis with very large numbers of samples, and we've actually had to move some of these users out to the command-line and built command-line pipelines because it was easier for them to deal with a directory of files than select and move files within galaxy.  Submitting a workflow for many samples of paired-end sequence is impossible within galaxy (not literally, but no one wants to select 100 pairs of sequences).   Galaxy libraries can be incredibly slow to open when there are very large numbers of files in the libraries.

### Admin Dataset Handling Limitations

1. Adding reference genomes/datasets is too ad-hoc at the moment.
1. Lack of out-of-the box scripts to download reference data, create required indices, and register them in the correct .loc files in galaxy, created a lot of busy work and and slowed-down adoption.

### Sample Tracking Limitations

1. No meta-data on datasets for "sample" - we don't run a LIMS, but we usually start an analysis with a set of fastqs from several samples in the same history. We spend a LOT of time ""penciling"" datasets to add the sample name to the display title. Galaxy automatically tracks "dbkey" - it would make life *MUCH* easier if it also tracked "sample name" and displayed it prominently. If two (forward/rev) fastqs come from the same sample, and are BWA's to a reference genome, the resulting SAM, etc should also be tagged with the sample names.
1. We are looking for progress in the sample tracking system.

### Workflow Limitations

1. Wish list: A way to submit an entire workflow as a single cluster job - workflows with many steps can take a lot of extra wall-time due to queue-wait. Some way to submit the entire workflow as a single cluster task would be very desirable.
1. Workflows are not flexible enough 
1. Workflows can not be called as "subroutines" by other workflows. This forces duplication of sub-workflows, and creates an un-maintainable mess.
1. From the developer point-of-view, workflows with multiple inputs, MapReduce-like functionality (though these are apparently on the horizon).  Dealing with user large data in a conservative manner, e.g. less copying, more linking.  We haven't had any user issues yet, but we do anticipate things popping up :)
1. There should be an easier way to interoperate with other instances such as the public Galaxy instance, so users could migrate their data and records easier.

### Error Handling Limitations

1. I keep running Galaxy at the debug logging level as it's the only way to quickly figure out user problems. Better diagnostic output would be a boon.
1. I think error handling is difficult.  Hard for end users to know if the problem was Galaxy, the tool, or their data.   We need better documentation for the code, and more complete APIs exposed for automating workflows from the command line.  

### Authentication, User and Job Management Limitations

1. Trying to host it on our HPC grid, but they require data to be owned by respective users for security, quotas, etc..  User data in Galaxy is owned by the galaxy user, even if the processes are run as logged in users.
1. One limitation is the number of processes allocated for a job is hard coded in the universe_wsgi.ini, we hope the number of processes for each job can be configured between different runs. 
1. Using external authentication is nice, but it does cause some other limitations.
1. Difficult to implement IdP other than OpenID at WSGI level. We managed to do it at Apache proxy level with mellon package, but this rules out the common logging in Galaxy and we had to drop it. We plan to keep the Galaxy Scientific portal free and open to all academic institutions in the world (a better version of the php-based Bioportal, www.bioportal.uio.no)
1. The galaxy job runner does not support job specific configuration of the following:
  * run-time
  * memory
  * parallel environment
1. Our cluster has restriction when submitting jobs to it, for example, you have to specify how much memory you need and how long does the job last, but our galaxy instance is running as a single user. It is tedious to configure this for each tool and the memory needed also depends on the size of data set.

### Other User Interface Limitations

1. Galaxy doesn't seem to work on IE9, history fails to refresh, peep view links broken.
1. Poor user feedback in interface for long running jobs - no progress indicator at all. Would be nice to be able to at least say 'running locally' or 'running on cluster' or 'queued on cluster'.
1. Lack of a "progress" indicator is hard for users. Ie. in a run of some hours, what %age finished are we, or what stage of processing are we up to. I have implemented an email system that sends progress emails to the user at intervals of N minutes which alleviates this.
1. GUI SPEED - we have a lot of long (several hundred step) workflows. They render slowly. We also run a "consulting" group, so each of us works on many projects at a time, often several for each of several clients (I have 50 histories for 6 clients, I think) - the "saved histories" link is slow, and there's no way to group histories into folders or to keep a search filter active. 

### Other Limitations

1. It's a web application so has all the associated warts and limitations.  Galaxy has the benefit that it hides a lot of complexity and the disadvantage that it hides a lot of complexity.  Bottom line for me:  It's open source so if you don't like the way it works, please send code to make it better.
1. We are looking for progress in Trackster
1. Better way of being able to have an arbitrary number of inputs to a workflow, like a history of inputs or something, to do batch work into some steps (like multiple BWA aligns, that all get fed into a merge) 

# This Group

## What do you feel the goals of the teleconference should be?

### Group Infrastructure and Organization Goals

1. Establish a platform through which people can communicate about local installation of Galaxy system.
1. Figure out what activities will be sufficiently useful to make the group sustainable - we're all busy people and without utility, there won't be much ongoing support or contribution?

### Sharing and Learning Goals

1. I'm interested to know at what stage others are using Galaxy, problems they've encountered, etc.
1. Sharing our knowledge of installing/maintaining local instances.
1. avoid duplicate effort
1. Share the best practices and solutions to common problems. Establish connections to other people implementing local instances beyond galaxy-dev mailing list.
1. I am hoping to be able to take advantage of the knowledge of "those who have gone before me" to help me get the system set up and running as efficiently as possible. While we won't have a large user base initially, understanding the pitfalls ahead of time will help us decide how open we make our installation.
1. Listening to anyone's experiences will be valuable.
1. Sharing information possibly with the aim of feeding back to improved documentation for setting up and maintaining local Galaxy installations.
1. Installation of effective galaxy instances: load balancing, queuing systems, user quotas and data cleanup policies. Also, integration with sequencing machines (or any other instrumentation) and strategies to interact with other tools (i.e. LIMS)
1. Would be good to know best practices for setting up a server and how people have solved a few of the maintenance issues.
1. A good talk on how we can set up and share our tools that we create too would be nice. I know there is the galaxy toolshed but hardly any one is using it and quite a bit of it is just junk.
1. Learn more indepth concepts of Galaxy and tips/tricks for streamlining operations management.  I understand it is hard to document everything - but maybe a quick 1 hour discussion would help.
1. Perhaps first, what attract users to Galaxy, and what repels them? E.g. if they don't like using FTP upload, what are other options? If they don't find their ways in the menu's, should we change descriptions to our own experience. It is really important to get these issues known first, otherwise users won't use Galaxy, and we don't have to set up Galaxies.<br /><br />And next, best practices of sysadmins that host 'big' galaxies. Perhaps ""if you could restart setting up Galaxy, what would you definitely not do again, and what would you do that you didn't do".
1. For developers to discuss specific Galaxy set-up e.g. using different clusters, clouds, external-visualisation tools, parallel processing techniques, proxy etc, custom code, datatypes etc that differ from the main Galaxy distribution.
1. Discuss use of hardware to support Galaxy.
1. Share methods of marketing Galaxy to users and offering training.
1. Discuss current tools or toolshed tools and how they can be improved
1. Help Galaxy administrators solve different issues

### Project and Feature Specific Goals

1. Areas that we can contribute to the project. Do we need to help create more instructional material to help assist the project? 
1. identify user centric development priorities
1. The dataset deletion thing is also an area of interest to us because its just down right difficult to us and having a nicer way than there currently is would be nice. 
1. At the moment we have 'hardcoded' a lot of stuff like our dbsnp and 1000genome vcf files so our tools can use those files for comparison etc. Would be nice if we could integrate them into galaxy properly.
1. A focus on improving the maintenance of galaxy and easily adding new apps
1. Improving galaxy's job submission system to support shared cluster environments - either by allowing users to specify job resources or by making adaptive/intelligent decisions based on dataset size, type etc.
1. Better integration between the galaxy job submission system and command line use of galaxy resources
1. Development issues 

### No Goals

1. (blank x 12)

## What topics would you like to see discussed for our first call?

### Topics Purpose

1. What's already working for most folks - eg clearly little point in forking the galaxy-dev mailing list?
1. What organizational structures and resources are missing - specifically what are the lowest hanging fruit in terms of widespread and common challenges where a new SIG could efficiently build and sustain new resources that really make a difference.
1. Is there a commercial opportunity here - are there institutions that would be willing to pay for analysis, consulting support or tool development? My own experience is that PI's are always happy to pay megabucks for sequencing consumables but almost none recognise the real costs of biologically informed and appropriate analysis once the data comes off the sequencer.
1. A general feel of how everyone is going and how they find Galaxy. We were unsure about it at the beginning but now we are quite happy. Would be good to know whats going on with Galaxy at other parts in the world.
1. Sharing scripts and patches/improvements.

### Topics Install and Configuration

1. Installation and Configuration Issues.
1. experience with matching resources with usage/load.
1. Interested in knowing how other people manage their local installations especially with regard to managing local customisations.
1. Maybe an overview on how Penn State operates its Galaxy behind the scenes.
1. User management: groups and roles, how do you use them? 
1. Cluster integration
1. IdP autentication within WSGI

### Topics Documentation

1. Gaps in documentation
1. Are there any external information sources (wiki or otherwise) that could supplement the main Galaxy site? The documentation there is sometimes deprecated and sometimes too shallow.

### Topics Data

1. best practices for adding/maintaining reference sequences/annotations
1. Data handling: upload and maintenance

### Topics Best Practices

1. Best/successful practices
1. Tips and tricks for the Cloudman version.

### Topics Releases

1. Is the lack of Galaxy release numbers a problem, or do hg commit hashes suffice?
1. Are there any widely-used Galaxy distributions outside of the main ones hosted at Penn State? 

### Topics Solutions and Features

1. Curating job environment
1. Usability
1. Possible solutions of my above problem ("I am trying hard to find out how can I read logged-in user's database ID, when a tool loads up.")
1. How to collect user feedback and crash reports.

## What didn't we ask that you would like to share?

### Other Community

1. Have a local instance manager meeting at the GCC 2012.
1. To share our feedback and user requests.
1. I really like the Galaxy community a lot, but the developer's emailing list is a hell. I have a lot of questions which seems lost in cyberspace. I would strongly suggest to put up a forum to get better communication: solved issues, open threads and improvements could be gathered on one cosy corner of the Galaxy.  Documentation is improving, but needs to be still better, which we could achieve with a community effort.
1. Just now setting up an instance in collaboration with our Bioinformatics Core Director.  Curious to learn more and see where it takes us.  Would be helpful (for me) if there was some programming for novice users.  

### Other Project

1. Do you find hg satisfactory for updating Galaxy? Do you often have merge conflicts to resolve? Would git be better?
1. What is the life-cycle plan for Galaxy development?
1. Is there a plan for additional sites to become part of the core developer team, i.e. how open will Galaxy project be?

### Other Installations

1. What kind of tools do you offer on your Galaxy (e.g. NGS/HTS read mapping or de novo assembly)?
1. How much disk space do you expect per user?
1. "How do you handle dependencies?" I am now in the process of exporting a folder with binaries to the Galaxy virtual machine. With each new tool implemented on our Galaxy, the required binaries are automatically added to the path by this mounted /apps folder.
1. How can sites run a galaxy configuration that is more compatible with PSU? This is a source of user confusion and frustration today.
1. How can sites plan for Galaxy improvements more effectively? Currently there are features that we'd like to see more accessible and misfeatures we'd like to see stay out of production.

### Other Other

1. *My favourite food.*
1. Nothing at the moment.
1. Covered it all really.  Nice job :)
1. We are maintaining these notes for teleconference QA on our wiki as well: https://dev.uabgrid.uab.edu/wiki[/GalaxyTeleconference](/src/Community/GalaxyAdmins/Surveys/2012/GalaxyTeleconference/index.md)-2012-05
1. I am ready and willing to share the knowledge and experience I have gathered so far.
1. I appreciate this effort

## Your areas of expertise

<table>
  <tr class="th" >
    <th> Domain(s) </th>
    <th> Count </th>
    <th> Specific Areas </th>
  </tr>
  <tr>
    <th> Biology </th>
    <td style=" text-align: right;"> 2 </td>
    <td> MD / cancer genetics<br />biologist </td>
  </tr>
  <tr>
    <th> Biology + bioinformatics </th>
    <td style=" text-align: right;"> 6 </td>
    <td> molecular biologist turned bioinformatician<br />bioinformatics, molecular biology, microbiology<br />bioinformatics, biochemistry<br />biologist, bioinformatics developer<br />Bioinformatics Developers, Microbiology, HPC development <br />Biologist, biocomputing support</td>
  </tr>
  <tr>
    <th> Bioinformatics </th>
    <td style=" text-align: right;"> 15 </td>
    <td> bioinformatics for NGS, algorithm developer, translational genomics<br />Bioinformatics Core Director<br />bioinformatics developer<br />bioinformatics developer<br />Bioinformatics developer<br />bioinformatics developer<br />Bioinformatics Analyst/Developer<br />Bioinformatician<br />bioinformatician; galaxy developer<br />bioinformatics engineer<br />bioinformatics support<br />Systems Administrator, Bioinformaticist<br />Scientific software developer with some support responsibilities<br />IT, Proteomics, 3D gfx<br />Manager/Bioinformatics Software Developer </td>
  </tr>
  <tr>
    <th> Computer Science </th>
    <td style=" text-align: right;"> 7 </td>
    <td> IT specialist<br />Systems administrator, software developer<br />Computer Scientist<br />Application Development<br />IT, sysadmin, developer<br />Database Admin<br />computer scientist</td>
  </tr>
  <tr>
    <th> Computer Science + Other </th>
    <td style=" text-align: right;"> 1 </td>
    <td> Librarian/IT </td>
  </tr>
  <tr>
    <th> Total </th>
    <td style=" text-align: right;"> 31 </td>
  </tr>
</table>

