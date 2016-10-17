---
autotoc: true
---



The Galaxy Project was notified its application to be a Google Summer of Code mentor organization in 2015 was **declined**.

# Ideas for Galaxy Project in GSOC2015

Data intensive biology for everyone! Galaxy is an open source, web-based platform allowing biologists to easily leverage advanced computational resources to build reproducible analyses.

The page contains project ideas for potential [Google Summer of Code 2015](https://developers.google.com/open-source/soc) interns - more information on Galaxy and the GSOC 2015 can be found [here](/src/Develop/GSOC/2015/index.md).



## Your Original Proposal

We would encourage potential interns to explore the Galaxy ecosystem and develop an original idea for a proposal. Possible sources for inspiration including browsing [Galaxy papers on CituLike](http://www.citeulike.org/group/16008/order/to_read,desc,), our [Trello board](https://trello.com/b/75c1kASa/galaxy-development), or just posting a broad description of your interests (preferably in the realm of bioinformatics or computational infrastructure) to our [developement mailing list](http://dev.list.galaxyproject.org/) or [IRC channel (#galaxyproject)](/src/GetInvolved/index.md#irc_channel) to solicit advice. Relevance to the project is important, but the scope of Galaxy and its role as an integration tool mean a very wide range of potential projects could be applicable.

Additionally, all proposals should include a description of a specific bioinformatics application or a description of how the project benefits the end-users (biologists and bioinformaticians) of Galaxy. Furthermore, proposals that could potentially benefit open source projects beyond just Galaxy will also be looked on favorably (many of the projects listed below meet this criteria).

## Kubernetes Integration

Galaxy supports running jobs in Docker containers for running jobs on a single node. However, the size of biological datasets and the complexity of the questions being asked is constantly increasing and this is leading to ever more complex analytics - meaning one container running on one node will become an increasingly problematic limitation. [Kubernetes](http://kubernetes.io/) is an exciting project that provides facilities for coordination of many containers. Extending Galaxy and/or the Galaxy remote job submission application [Pulsar](https://pulsar.readthedocs.org/en/latest/) to interface with [Kubernetes](http://kubernetes.io/) would potentially allow Galaxy to leverage to run these more complicated multiple-node, multiple-container analysis steps that will be required for future large scale biological data analysis.

**Expected Outcomes**
* Implement the ability to annotate Galaxy tools with [Kubernetes](http://kubernetes.io/) pods and orchestrate these jobs via [Kubernetes](http://kubernetes.io/) orchestration either in Galaxy directly or via [Pulsar](https://pulsar.readthedocs.org/en/latest/).
* Develop an example pod for motivating bioinformatics application (perhaps targeting one or more of the Map/Reduce applications in [ADAM](https://github.com/bigdatagenomics/adam)).

**Stretch Goals**
* Implement the above functionality for both Galaxy and [Pulsar](https://pulsar.readthedocs.org/en/latest/).
* Allow scheduling of more traditional Docker-based jobs via Kubernates as well (for jobs that are not annotated with a pod).
* Develop and document multiple example applications, apply them to real datasets, and benchmark the applications.

**Required Skills** Python programming

**Potentially Helpful Skills** Familiarity with cloud and/or cluster computing, familiarity with Galaxy and/or Kubernetes, bioinformatics knowledge

**Possible Mentors** Kyle Ellrott, [John Chilton](/JohnChilton), [Dannon Baker](/src/DannonBaker/index.md)

## GA4GH Container and Workflows Integration

The [Global Alliance for Genomics Health](http://genomicsandhealth.org/) (GA4GH) is an "international coalition, dedicated to improving human health by maximizing the potential of genomic medicine through effective and responsible data sharing." The GA4GH is in the process of starting up a working group on workflows and containers and this working group will likely pick up and adopt the efforts of the [Common Workflow Language](https://github.com/common-workflow-language/common-workflow-language) group and its efforts of to create standard, modern formats for describing tools and workflows for bioinformatics platforms. Implementing support for these formats in Galaxy would allow tool and workflow authors to produce artifacts that could be shared across Galaxy, [Seven Bridges](https://www.sbgenomics.com/), and [Arvados](https://arvados.org/) and potentially other platforms in the future such as [Mobyle](https://projets.pasteur.fr/projects/mobyle/versions/73).

**Expected Outcomes**
* Allow Galaxy to run tools defined by the latest CWL or GA4GH specification.
* Publish comprehensive documentation for these tools to the Galaxy Wiki.
* Develop a mechanism to test such tools and integrate with Galaxy tool test framework.
* Port or develop several Galaxy tools (consider for instance updating the aging Galaxy EMBOSS tools) to use this framework, summarize the differences between Galaxy Tool definitions and CWL/GA4GH.

**Stretch Goals**
* Extend Galaxy and the Galaxy Tool Shed to serve and install such tools.
* Extend [Planemo](https://planemo.readthedocs.org) (a CLI toolkit for assisting Galaxy Tool Developers) to lint and testing such tools.
* Allow Galaxy to run workflow defined by the latest CWL or GA4GH workflow specification.

**Required Skills** Python programming

**Potentially Helpful Skills** Familiarity with Galaxy and/or other Workflow Management Systems

**Possible Mentors** [John Chilton](/JohnChilton), [Daniel Blankenberg](/src/Dan/index.md)

## Docker Swarm and Compose

By making complex applications easier to deploy and doing so reproducibly, the open source containerization platform Docker has had a huge impact on Galaxy and bioinformatics in general. [docker-galaxy-stable](https://github.com/bgruening/docker-galaxy-stable) allows one to trivially deploy a production-ready Galaxy server and Galaxy's Docker job running makes it very easy to distribute highly reproducible tools. However both of these Docker-based features are limited by the fact they are constrained to a single Docker container. The new Docker projects Docker Swarm and Docker Compose could improve these features by provide orchestration across multiple containers. Docker Compose could be use to breakup the big Docker Galaxy stable container into smaller more flexible pieces that would be both more manageable and scaleable. While Docker Swarm could allow Galaxy to easily distribute jobs across a cluster without requiring a traditional cluster scheduler.

**Expected Outcomes**

* Implement ability to submit Galaxy and/or [Pulsar](https://pulsar.readthedocs.org/en/latest/) jobs to a Docker Swarm cluster.
* Demonstrate ability to distribute real-world "Dockerized" tools in a workflow using at least one Docker Swarm backend.
* Develop and extension to Galaxy Docker Stable to allow it to be decomposed into individual pieces (Database server, Job handlers, Web Frontend, etc...) with Docker Compose.

**Stretch Goals**

* Extend both Galaxy and [Pulsar](https://pulsar.readthedocs.org/en/latest/) to target Docker Swarm.
* Demonstrate ability to distribute real-world "Dockerized" tools in a workflow using at least one Docker Swarm backend.
* Build a test harnesses that can be plugged into a CI system such as Jenkins or Buildbot to the ensure correctness of these features.

**Required Skills** Python programming

**Potentially Helpful Skills** Familiarity with cloud and/or cluster computing, familiarity with Galaxy, Docker, and/or Fig, bioinformatics knowledge

**Possible Mentors** [John Chilton](/JohnChilton), [Björn Grüning](/BjoernGruening), [Dannon Baker](/src/DannonBaker/index.md)

## Fostering Bioconductor Collaborations

The [RGalaxy](http://www.bioconductor.org/packages/release/bioc/html/RGalaxy.html) [Bioconductor](http://www.bioconductor.org/) package allows one to markup [R](http://www.r-project.org/) functions and then to automatically create Galaxy tools from these functions. This is an exciting project that provides the dual benefits of allowing Galaxy users to easily leverage the complex and cutting edge tools developed in R while allowing R authors to easily create and disseminate accessible web interfaces for their modules through Galaxy. It would be great to determine if this idea could be taken further and make this process more seamless - lowering the barrier to entry. Specifically it would be great if one could leverage the existing Bioconductor documentation to build these tools instead of requiring the functions to be built for Galaxy or at least provide a higher-level intermediary to bridge existing functions more easily. Additionally, once tools are created it would be great if the process of publishing them to the Galaxy Tool Shed could be automated as well for maximum impact. An example of a project that leverages existing structures this is [gxargparse](https://github.com/erasche/gxargparse) for Python.

**Expected Outcomes**

* Develop a higher-level intermediary or allow direct translation of Bioconductor tools into Galaxy Tools.
* Automate creation and publication of Tool Shed artifacts for these tools, including extracting and publishing stable dependencies to resources such as !GitHub.
* Demonstrate utility of these functionality by porting several new Bioconductor tools to the Galaxy Tool Shed.

**Stretch Goals**

* Implement automated scripts (for use with cron jobs or CI tools such as Jenkins or Buildbot) to automate the release and publication of such artifacts.
* Build and publish workflows demonstrating these tools with actual data.

**Possible Mentors** [Nitesh Turaga](/NiteshTuraga), [Björn Grüning](/src/BjoernGruening/index.md), Daniel Blankenberg

**Required Skills** Python programming

**Potentially Helpful Skills** R programming, bioinformatics knowledge

## Galaxy Workflow Annotation to Prepare Workflows for Use in Refinery Platform

The [Refinery Platform](http://www.refinery-platform.org) is an environment for reproducible biomedical research that integrates Galaxy to execute analysis workflows. Additionally, Refinery provides a data repository with rich meta data and provenance information, as well as data visualization components to support interpretation of analysis results. Refinery provides user interfaces to instantiate Galaxy workflows with data sets stored in the Refinery data repository. In order to prepare a Galaxy workflow for use in Refinery, the workflow has to be annotated. This includes the description of the number, type, and relationship (single, paired, etc.) of required and optional inputs and the definition of which analysis outputs should be imported back into Refinery.
To facilitate the annotation of Galaxy workflows, the existing Galaxy workflow editor could be extended with additional features to allow users to add these annotations. Alternatively, the current Refinery workflow viewer could be extended to enable such workflow annotations after a workflow has been imported into Refinery via the Galaxy Workflow API.

Furthermore, since workflow annotations for Refinery are currently stored in general annotation fields, they can interfere with general comments and notes added to a Galaxy workflow. It is desirable to store the Refinery workflow annotation in dedicated fields of the workflow data model so as not to interfere with general annotations. This would require either modification of the Galaxy workflow data model as well as the corresponding APIs, or the development of a workflow annotation model that stores such information directly in Refinery.

**Expected Outcomes**
* Extended Galaxy or Refinery workflow data model to store workflow annotation
* Editor to create annotation of Galaxy workflows for use in Refinery

**Stretch Goals**

* Support creation of new data types in Refinery if required by outputs of newly annotated workflows.

**Possible Mentors** [Nils Gehlenborg](http://gehlenborg.com/), [Ilya Sytchev](https://github.com/hackdna)

**Required Skills** !JavaScript and Python programming, preferably some experience with [Django](https://www.djangoproject.com/), [D3.js](http://d3js.org/), and [AngularJS](https://angularjs.org/).

** Potentially Helpful Skills ** Knowledge of basic graph algorithms and common bioinformatics data analysis workflows.


## Visualization Plugin for Proteomics

Implement Galaxy [data providers](/DataProviders) and [visualization plugins](/VisualizationsRegistry) for viewing the results of [Mass spectrometry](http://en.wikipedia.org/wiki/Protein_mass_spectrometry) based protein and/or peptide identification experiments. One could either implement data providers for Galaxy's [proteomics datatypes](https://bitbucket.org/iracooke/proteomics-toolshed-datatypes) directly (though there are potentially performance bottlenecks with this approach) or build a Galaxy tool that merges mass spec and identification into an intermediary format such as [SQLite](http://www.sqlite.org/) ([example code that might drive this by Jim Johnson](https://gist.github.com/jmchilton/4164c07f3443e811982f)). On the visualization side - it would be great to replicate the functionality of interfaces such as [peptide-shaker](http://code.google.com/p/peptide-shaker/) but in browser - in particular providing a filterable table of Peptide-Spectrum-Matches with linked spectrum viewer for each hit. 

**Expected Outcomes**

* Galaxy visualization plugin that provides filterable list of peptide-spectrum-matches and spectral viewer for a single dataset ran through an open source tool such as [peptide-shaker](http://code.google.com/p/peptide-shaker/) ([galaxy tools](https://github.com/galaxyproteomics/tools-galaxyp/tree/master/tools/peptideshaker)) or [OpenMS](http://open-ms.sourceforge.net/). 

**Stretch Goals**

* Allow matching and processing many datasets.
* Allow visualization from additional programs (e.g. ProtK).
* Allow visualization of additional input types (e.g. MGF, mztab).

**Possible Mentors** [Ira Cooke](https://github.com/iracooke), [John Chilton](/src/JohnChilton/index.md)

**Required Skills** Python and !JavaScript programming

**Potentially Helpful Skills** Proteomics knowledge, R programming, familiarity with data visualization

## Streamlined Viewing of PeptideShaker Results

[PeptideShaker](http://code.google.com/p/peptide-shaker/) ([paper](http://www.nature.com/nbt/journal/v33/n1/full/nbt.3109.html)) is an exciting open source proteomics application that combines multiple [mass spectrometry](http://en.wikipedia.org/wiki/Protein_mass_spectrometry) search engines results into a unified view of complex data.

The Galaxy proteomics community maintains Galaxy tools for [building PeptideShaker files](https://github.com/galaxyproteomics/tools-galaxyp/tree/master/tools/peptideshaker). Galaxy users can download these files to their hard drive and open them in !PeptideShaker - but the genomic visualizations provided in Galaxy such as [IGV](https://sites.google.com/site/princetonhtseq/tutorials/visualization-with-galaxy-and-igv) allow a much more seamless and responsive experience.  This project would involve exploring various options to be that high-quality user experience to !PeptideShaker - both by enabling IGV-like streaming of data from Galaxy to the researchers local copy of !PeptideShaker and by keeping !PeptideShaker near the data.

**Expected Outcomes**

* Modify !PeptideShaker to allow it to listen on a port for a URL to a file to open (like IGV)
* Create a [Interactive Environments](https://wiki.galaxyproject.org/Admin/IEs) plugin for !PeptideShaker. Existing IE plugins have targeted web applications like IPython - but more traditional desktop applications should be exportable via [https://kanaka.github.io/noVNC/](/noVNC).  

**Stretch Goals**

* Allow streaming data into !PeptideShaker just as needed.
* Create a generic framework for quickly building out Galaxy IEs for Desktop applications.
* Enable two way communication between !PeptideShaker and Galaxy - by allowing exporting files from !PeptideShaker directly back into Galaxy.

**Possible Mentors** [Marc Vaudel](http://compomics.com/people/marc-vaudel/), [Björn Grüning](/src/BjoernGruening/index.md)

**Required Skills** Java programming

**Potentially Helpful Skills** Python programming, Proteomics knowledge, familiarity with data visualization

## Linking Galaxy with Google Drive

The Galaxy application implements the notion of an Object Store - a pluggable file management interface that acts as a layer between Galaxy and any user dataset. This Object Store interface allows datasets to be ‘physically’ disconnected from a particular instance of Galaxy while the application can still access and interact with them. This opens the door for providing various storage mediums where the data is actually stored. Ultimately, thus allows a user to associate self-provisioned external storage resources with their Galaxy account and move beyond the imposed quota or limitations on any given Galaxy instance. Thus far, an abstract hierarchical store, Amazon S3, iRODS, and various local disk object stores have been implemented. However, use of an Object Store within Galaxy is an application-wide setting instead of being a per-user setting allowing users to specify their own back-end storage medium. Additionally, linking with the Google Drive is highly desirable allowing user to leverage the [Google Drive for Education](http://googleforeducation.blogspot.com/2014/09/announcing-drive-for-education-21st.html) program. 

**Expected Outcomes**

* Implement a Galaxy Object Store for Google Drive
* Allow per-user specification of a back-end data store

**Stretch Goals**

* Provide a method to archive Galaxy datasets/histories to a back-end data store

**Required Skills** Python programming

**Potentially Helpful Skills** Familiarity with Galaxy and/or object store APIs, familiarity with cloud computing concepts

**Possible Mentors** [Enis Afgan](/src/EnisAfgan/index.md)

## Integrate bcbio-nextgen Pipelines into Galaxy

The [bcbio-nextgen](https://github.com/chapmanb/bcbio-nextgen) project provides validated, scalable, community developed best practice pipelines - in particular for variant calling and RNA-seq analysis. The goal of this project would be to enable the use of bcbio-nextgen pipelines from within Galaxy and other workflow platforms.

For smaller jobs - it should be possible to build traditional Galaxy tools to run bcbio-nextgen pipelines. However, as the complexity of an analysis grows there is some tension between Galaxy and bcbio-nextgen - which have very different ways to manage workflows or pipelines. The stretch goals for this project could be to evaluate different ways to address this and run large analyses in bcbio-nextgen from Galaxy.

**Expected Outcomes**

* Implement a variant calling Galaxy tool that runs a bcbio-nextgen pipeline in a Docker image on a single compute node.
* Implement an RNA-seq Galaxy tool that runs a bcbio-nextgen pipeline in a Docker image on a single compute node.
* Develop a [common workflow language](https://github.com/common-workflow-language/common-workflow-language) variants of these tools. For more information on ongoing efforts to develop bcbio-nextgen components for the CWL, see [bcbio-nextgen #725](https://github.com/chapmanb/bcbio-nextgen/issues/725).
 
**Stretch Outcomes**

* Develop a technique for Galaxy to communicate cluster information to bcbio-nextgen to enable cluster utilization. Prepare detailed documentation.
* Develop a generic framework for translating bcbio-nextgen pipelines into Galaxy and Common Workflow Language tools to ease future integration efforts.
* Extend Galaxy's job running mechanism to allow it to collect provenance information from bcbio-nextgen about intermediate files and analysis steps, modify the bcbio-nextgen tools to produce this metadata.

**Possible Mentors** [Rory Kirchner](https://github.com/roryk), [Brad Chapman](https://github.com/chapmanb), [John Chilton](/src/JohnChilton/index.md)

**Required Skills** Python programming, Highly motivate and independent problem solver

**Potentially Helpful Skills** Familiarity with Galaxy and/or bcbio-nextgen. Bioinformatics knowledge (RNA-seq and variant calling)

## Overhaul of Pages

Galaxy [Pages](https://wiki.galaxyproject.org/Learn/GalaxyPages) are a way of communicating Galaxy analyses so that other researchers can easily view, reproduce, or extend an analyses. To build pages - researchers use a WYSIWYG editor to build HTML pages that may contain embedded Galaxy objects such as histories, datasets, workflows, and visualizations.

Pages are a powerful concept but should be are somewhat under utilized, we believe a substantial overhaul could increase their accessibility and thus usage. The current HTML-based pages contain a number of usability bugs. These should be addressed and the embedded editor [WYMeditor](http://www.wymeditor.org/) updated to its latest stable version.

Once familiar with pages - there are at least two paths this project could diverge into. The embedded HTML approach works well for non-technically savvy users - but advanced users would prefer alternatives such as [Markdown](http://commonmark.org/) or [IPython Notebooks](http://ipython.org/notebook.html) - extending the framework to allow these is one possibility for the project. Alternatively - extending pages with new features for collaborative editing would make them much more powerful as well.

**Expected Outcomes**

* Address small usability bugs (can work with team to identify these).
* Update the embedded HTML editor.

**Expected Outcomes (Alternative 1)**

* Modify the framework to allow multiple page implementations via a plugin system.
* Implement a basic Markdown plugin.

**Stretch Outcomes (Alternative 1)**

* Extend the Markdown with a syntax for embedding Galaxy objects.
* Implement a basic IPython Notebook plugin for constructing pages.
* Extend the IPython Notebook with widgets to embed Galaxy objects.

**Expected Outcomes (Alternative 2)**

* Extend the Galaxy permission system used for data libraries for pages and workflows.
* Extend the workflows and page management sections of Galaxy to handle these new shared pages.
* Implement some a locking mechanism as the last step to enabling collaborative editing of pages.

**Stretch Outcomes (Alternative 2)**

* Initial research on synchronous collaborative editing and sketch out a project plan for subsequent developers.

**Required Skills** Python programming

**Potentially Helpful Skills** Familiarity with Galaxy and IPython

**Possible Mentors** [Carl Eberhard](/CarlEberhard), [Martin Cech](/src/Marten/index.md)

## Easier or More Robust History Imports and Exports

Galaxy has basic functionality allowing users to export their history (the complete record of an analyses with output files) to a file or another Galaxy instance. The user experience related to this however is not as responsive as one would desire - in part because export and import jobs have to be executed in the background and the user interface doesn't really account for this. Likewise the user interface does not handle failures well or display error messages.

**Expected Outcomes**

* Update History import and export to work with the newer concept of [dataset collections](http://bit.ly/gcc2014workflows).
* Update UI to use !JavaScript and poll import and export process (no more manual refreshes).
* Update UI to respond to errors well and display information about failures.
* Write comprehensive documentation to describe the process.

**Stretch Outcomes**

* Extend documentation to include explicit instructions about how to transfer analysis histories on public sites such usegalaxy.org to cloud instances using !CloudLaunch.
* Simplify history export to allow users to just copy a URL that can be used to target the API for history export 
that can be pasted into an import the history from another Galaxy instance.
* Split this process in pieces to allow tracking/resuming the transfers.
* Rework the API and UI to provide pleasant progress bar tracking progress and estimating time remaining.

**Possible Mentors** [Martin Cech](/Marten), [Jim Johnson](https://github.com/jj-umn), [Daniel Blankenberg](/src/Dan/index.md)

**Required Skills** Python programming

**Potentially Helpful Skills** !JavaScript and Backbone programming

## Improved and Updated Debian Packaging of Galaxy

Galaxy already runs well on the Debian platform and derivatives (eg. Ubuntu) either via manual installation or using the Docker image (see above).  But to integrate Galaxy as a full-fledged Debian package brings many potential advantages such as:

* Basic installation reduced to "apt-get install galaxy-server"
* Updates of Galaxy core managed via apt-get
* Updates and installation of Galaxy tools managed via apt-get
* Harmonisation of Galaxy login accounts with system shell accounts
* Interaction with Apache/Nginx server auto-configured by the package
* Interaction with SFTP for file uploads auto-configured by the package
* Interaction with SQL database auto-configured by the package
* etc...

Initial packaging has already been accomplished by Tim Booth as part of the [Bio-Linux](http://environmentalomics.org/bio-linux/) project. This project would involve updating this package for the latest Galaxy versions and make changes to Galaxy itself with the goal of one day being able to include Galaxy in Debian directly.

The biggest impediment to the inclusion of Galaxy within Debian is Galaxy's handling of Python dependencies. Galaxy resolves its own fixed (often older) versions of dependencies - a properly packaged Debian Galaxy would have to use the system versions of dependencies which will require updating Galaxy dependencies. 

**Expected Outcomes**

* Updated versions of the existing Bio-Linux Ubuntu packages for latest Galaxy.
* Making the packages work in Debian Sid - e.g. convert Bio-Linux [Upstart](http://upstart.ubuntu.com/) scripts to [Systemd](http://www.freedesktop.org/wiki/Software/systemd/).
* Build list of all Galaxy dependencies not currently in Debian or Debian Med and outline an upgrade plan.
* Package Galaxy's [bioblend](http://bioblend.readthedocs.org/en/latest/) dependency for Debian and attempt to get it added to [Debian Med](https://www.debian.org/devel/debian-med/). (Eventually all of Galaxy's dependencies need to be there - this is a good place to start). Will require updating [bioblend for Python 3](https://github.com/galaxyproject/bioblend/issues/97) (see [Debian policy](https://www.debian.org/doc/packaging-manuals/python-policy/ch-python3.html)).
* Package additional dependencies for inclusion in [Debian Med](https://www.debian.org/devel/debian-med/).
* Outline a plan for converting Galaxy itself to Python 3.

**Stretch Goals**

* Convert Galaxy to run on Python 3.
* Once all dependencies are upgraded, package Galaxy for [Debian Med](https://www.debian.org/devel/debian-med/).

**Possible Mentors** [Nate Coraor](/nate), [Tim Booth](https://github.com/tbooth), [John Chilton](/src/JohnChilton/index.md)

**Required Skills:**
* Knowledge of DPKG, BASH scripting, Makefiles, and the layout of files on a standard Linux filesystem (/etc, /var, /usr, ...)
* Knowledge of XML and Python

**Potentially Helpful Skills:**

* Knowledge of Galaxy, knowledge of making Debian packages.
* Some knowledge of bioinformatics (eg. what is a FASTQ file, what is an alignment).


## Improved Authentication Framework including OAuth and Google+ Sign-in

[OAuth2.0](https://developers.google.com/accounts/docs/OAuth2) is the latest third party authentication mechanism that allows a single identity to be used across multiple applications. This project would enable OAuth and [Google+ sign-in](https://developers.google.com/+/features/sign-in) based authentication within Galaxy. The implication would be that a user no longer has to register at each Galaxy instance but could instead use their single identity (eg: Google ID) to authenticate. 

**Expected Outcomes**

* Allow authentication to Galaxy via OAuth2.0 and Google+ Sign-in.

**Stretch Goals**

* Integrate the authentication mechanism with [Globus Nexus](https://www.globus.org/platform/services). 
 
**Possible Mentors** [Martin Cech](/Marten), [Enis Afgan](/EnisAfgan), [Nitesh Turaga](/src/NiteshTuraga/index.md)

**Required Skills** Python Programming

**Potentially Helpful Skills** Web security, REST API familiarity


## Public Galaxy Server Tools Registry and Search

There are [over 60 publicly accessible Galaxy servers](/src/PublicGalaxyServers/index.md), each with their own set of tools.  This project would implement a registry/search interface for tools on all publicly accessible servers that could be used to locate a tool on any of those servers.  This could be done in any number of ways, including push and pull methods.  

The Galaxy Tool bar search could additionally be modified to to show an item at the bottom of the matching tools to say something like

 This search matches tools on other servers...

This approach could also be used with reference genomes, and published histories, workflows, pages, visualizations, and public datasets

**Expected Outcomes**

* Make it easy for users to find Galaxy instances that already have the tool(s) they are looking for installed and available for use


**Stretch Goals**

* Extend this ability to include reference genomes, published histories, workflows, pages, and visualizations
* Improve Galaxy's tool-search for single-instance use-case as well, using the API and lunr (as an example approach)

**Possible Mentors** [Martin Cech](/src/Marten/index.md), Dannon Baker, Daniel Blankenberg

**Required Skills** Python programming

**Potentially Helpful Skills**  Familiarity with RESTful API usage, Search, and Caching

## Interactive Environment Proxying within Galaxy

Recently Interactive Environments (IEs) were developed for Galaxy. These consist of a Docker container providing a webservice that is proxied to a Galaxy user on request. They allow users to flexibly analyse their datasets without the overhead of download/uploading/tracking which commands they ran, and so on. Galaxy currently provides the proxying using a small NodeJS proxy to handle requests with respect to the new Interactive Environments (IEs). Currently this proxy fails to work properly with some of the IEs for undetermined reasons, leading to the need to test new possibly proxying methods.

**Expected Outcomes**

* Test and compare proxying methods for support of needed features (http, websocket support)
* Identify and implement a replacement proxy for the Galaxy<->IE bridge

**Stretch Goals**

* Unit test framework for IEs to ensure the proxy works ([some progress](https://github.com/erasche/vagrant-galaxy-casperjs) exists but it's not very generic).

**Possible Mentors** [Eric Rasche](/EricRasche), [John Chilton](/src/JohnChilton/index.md)

**Required Skills** Docker, NodeJS

**Potentially Helpful Skills**  SysAdmin skills; familiarity with networking, routing, HTTP proxying, wireshark, debugging HTTP requests.

## GMOD Collaboration Projects

There are a couple additional Galaxy related ideas as part of the [Genomic Model Organization Database](http://gmod.org/) (GMOD) project's [GSOC Ideas page](http://gmod.org/wiki/GSOC_Project_Ideas_2015) that focus on integrating Galaxy and other GMOD projects (namely [SeqWare](https://seqware.github.io/) and [Reactome](http://www.reactome.org/)) as well as many other exciting bioinformatics and infrastructure. For more information related to GMOD and the GSOC check out [this page](http://gmod.org/wiki/GSoC).

## BioJS Collaboration Project

Several Galaxy contributors are collaborating with the BioJS team on a potential project enhancing both the annotation of BioJS components and Galaxy's visualization plugin system that together should make it easier to integrate BioJS components into Galaxy and make them more functional. Check out the BioJS [GSOC page](http://biojs.net/gsoc/2015/) for more details.
