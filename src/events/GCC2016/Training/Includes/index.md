<div class='red'>
This page is not meant to be viewed on its own. Rather, it contains sections that are displayed on the [GCC2016 Training](../) page
</div>
---

# TOPICS


# BEYOND THE INTRO DESC

This workshop continues where the [Introduction to Galaxy](http://sched.co/5VTN) session leaves off.  Additional features of Galaxy will be introduced and several topics introduced in that first session will be explored in more detail.  Topics covered will include
* Uploading data via FTP
* History management 
* Defining and using custom reference genomes
* Using Tagging and Annotation to manage your Galaxy objects
* More on workflow editing and management
* More on sharing and publishing 
* Using Galaxy to help debug your analyses
END_INCLUDE

# RADSEQ DESC
[RADseq](https://en.wikipedia.org/wiki/Restriction_site_associated_DNA_markers)<sup>1</sup> data allow scientists to gather genome wide information with a low-cost approach compared to complete genome sequencing. In this training session, we will show how to analyze RADseq data to 

1. build genetic maps<sup>2</sup>, 
2. calculate population genomics statistics<sup>3,4</sup> and 
3. assemble paired-end loci with or without reference genome using [Stacks](http://catchenlab.life.illinois.edu/stacks/manual/)<sup>5</sup> on Galaxy

*Stacks* works with restriction-enzyme based data, including GBS, CRoPS, and single and double digest RAD. *Stacks* identifies loci in a set of individuals, either *de novo* or aligned to a reference genome (including gapped alignments), and then genotypes each locus. See the [Stacks Manual](http://catchenlab.life.illinois.edu/stacks/manual/) for full details.
<br /><br />

*Stacks* has been [integrated into Galaxy](http://catchenlab.life.illinois.edu/stacks/faq.php#galaxy) and is [available via the GUGGO Tool Shed](https://www.e-biogenouest.org/groups/guggo/wiki/StacksToolsuite). 

END_INCLUDE

# VARIANT DESC
The tutorial is designed to introduce the tools, datatypes and workflow of variation detection using human genomic DNA using a small set of sequencing reads from chromosome 20. In this session we will:
* Evaluate the quality of the short data. If the quality is poor, then adjustments can be made – e.g. trimming the short reads, or adjusting your expectations of the final outcome.
* Map each of the individual reads in the sample FASTQ readsets to a reference genome, so that we can then identify the sequence changes with respect to the reference genome. Some of the variant callers need extra information regarding the source of reads in order to identify the correct error profiles to use in their statistical variant detection model, so we add more information into the alignment step so that that generated BAM file contains the metadata the variant caller expects.
* Calling Variants using the GATK Unified Genotyper. The GATK Unified Genotyper is a Bayesian variant caller and genotyper from the Broad Institute. Many users consider the GATK to be best practice in human variant calling.
* Try an alternative caller: Mpileup
* Evaluate known variations. We know a lot about variation in humans from many empirical studies, including the 1000Genomes project, so we have some expectations on what we should see when we detect variants in a new sample.
* Annotate the detected variants against the ensembl database and interpret the annotation output.
END_INCLUDE

# RNA-SEQ DESC
This workshop would cover standard, advanced, and alternative RNAseq analysis pipelines, all using workflows and highlighting their advanced features. Three general pipelines would be addressed: 
* A standard RNAseq analysis pipeline using the Tuxedo suite (Tophat &rarr; Cuffdiff) for standard transcript quantification with a reference transcriptome. 
* An advanced analysis pipeline using the Tuxedo suite with !StringTie to create de novo transcript structures, merge these with reference transcripts to create a transcripteome database, followed by transcript quantification. 
* An alternative RNAseq analysis pipeline using count based quantification methods (DESeq2, edgeR, or limma) to generate abundance measurements. 
These three pipelines would be used as examples to highlight usage of workflows and their advanced features. 
END_INCLUDE

# PROTEOMICS DESC

This hands-on workshop will take participants through the essential steps for using Galaxy for the analysis of mass spectrometry (MS)-based proteomics data, focusing protein identification from large-scale datasets, and more advanced applications integrating genomic data with proteomic data.   Introductory material will be presented on the basics of MS-based proteomics informatics and also emerging applications integrating genomic and proteomic data (an area called proteogenomics).
<br /><br />
The workshop will be constructed to follow the steps of proteomic and proteogenomic workflows.   Analysis modules corresponding to each of these steps will be described and demonstrated, following the structure below:
1. Database generation and raw data processing<br /><br />
  Attendees will be guided through the use of tools for selecting and generating databases – either standard databases or customized database for proteogenomics derived from genomic data (e.g. RNA-seq data).  Tools for converting raw data to processed peak lists for further analysis will also be described.

1. Sequence database searching<br /><br />
  Attendees will learn about available software in Galaxy for sequence database searching, which identifies proteins via matching of MS data to sequence databases.  Use of these tools and optimization of parameters will be demonstrated and discussed.

1. Results visualization and interpretation<br /><br />
  Attendees will be exposed to a variety of tools for visualizing and filtering results in Galaxy.  Emphasis will be on tools useful for filtering identified proteins from proteogenomic analyses, where quality control of results is essential to generate high confidence results.

At the end of the workshop, attendees will have working knowledge of MS-based proteomics tools in the Tool Shed, experience in setting up basic workflows for protein identification, as well as more advanced applications in proteogenomics.  Attendees will also have a better comprehension of the pitfalls encountered when interpreting data from these applications, and tools in Galaxy to help ensure confidence in results.
<br /><br />
Participants will be given temporary accounts to a cloud-based Galaxy instance to participate in hands-on workshop activities.
END_INCLUDE

# ARCH DESC
Want to know the big picture about what is going on inside Galaxy? This workshop will give participants a practical introduction to the Galaxy code base with a focus on changing those parts of Galaxy most often modified by local deployers and new contributors.
<br /><br />
The workshop will include the following specific content:

* A description of the various file and top-level directories in the Galaxy code base.
* An overview of important Python modules - including models, tools, jobs, workflows, visualizations, and API controllers.
* An overview of important Python objects and concepts in the Galaxy codebase - including the Galaxy transaction object ("trans"), the application object ("app") , and the configuration object ("config").
* An overview of various plugin extension points.
* An overview of important !JavaScript modules that power the front-end.
* An overview of important !JavaScript concepts used by Galaxy - in particular RequireJS, Backbone MVC, and grunt.
* An overview of the client build system used to generate compressed !JavaScript, cascading stylesheets, and other static web assets.
* A demonstration of a complete start-to-finish modification of Galaxy - including forking the project on Github, modifying files, running the tests, checking style guidelines, committing the change, pushing it back to your local Github fork, and opening a pull request.
* A brief description of other projects in the Galaxy ecosystem (CloudMan, the Tool Shed, bioblend, docker-galaxy-stable, Pulsar, and Planemo).
END_INCLUDE

# ADVANCED TOOLS DESC
This workshop is aimed at people with some experience developing tools and will cover more advanced topics in tool development, more complex tools, and recent enhancements to the Galaxy tool development process including:
* Driving tool development using testing (test driven development or TDD).
* Designing tools for use with the dataset collections.
* Maintaining suites of Galaxy tools - subtopics include Tool Shed concerns & macros.
* Publishing tools with complex dependencies to the Tool Shed.
END_INCLUDE

# PREREQUISITES

# INTRO
* A general knowledge of Galaxy (for example, you should be familiar with the material in [Galaxy 101](http://usegalaxy.org/galaxy101) or have attended [Introduction to Galaxy](http://sched.co/5VTN)).
END_INCLUDE

# LAPTOP
* A wi-fi enabled laptop. 
END_INCLUDE

# WEB BROWSER
* A modern web browser.  Google Chrome, Firefox and Safari will work best. 
END_INCLUDE

# LAPTOP WITH BROWSER
* A wi-fi enabled laptop with a modern web browser.  Google Chrome, Firefox and Safari will work best. 
END_INCLUDE

# UNIX KNOWLEDGE
* Knowledge and comfort with the Unix/Linux command line interface and a text editor. If you don't know what cd, mv, rm, mkdir, chmod, grep and so on can do then you will struggle in this workshop.
END_INCLUDE

# CLOUD CONCEPTS
* Familiarity with the Galaxy on the Cloud concepts.
END_INCLUDE

# BASIC ADMIN
* Some knowledge of running a Galaxy server.
END_INCLUDE

# PROBLEMS AND SOLUTIONS
* Familiar with the Bioinformatics problems (and their solutions) that wet lab scientists run into.
END_INCLUDE

# BASIC TOOL DEV
* Basic understanding of Galaxy from a tool developer point of view or attendance at the [Writing and Publishing Galaxy Tools](/src/Events/GCC2016/Training#writing-and-publishing-galaxy-tools) workshop. 
END_INCLUDE

# BASIC DEV
* Basic understanding of Galaxy from a developer point of view. 
END_INCLUDE

# R
* Basic experience with R/Bioconductor.
END_INCLUDE

# PYTHON
* Python programming.
END_INCLUDE

# SCRIPTING
* Comfort with scripting programming languages (Python and !JavaScript will be the most helpful).
END_INCLUDE

# BASIC NGS
* Basic knowledge of high-throughput/next-generation sequencing.
END_INCLUDE

# CHIP QC
* Ideally participants will already be familiar with [general NGS quality control](/src/Events/GCC2016/Training#raisins-and-rabbit-turds-ngs-quality-control-with-galaxy) and read mapping, since those won't be covered.
END_INCLUDE

# TRAINING INTEREST
* An interest and/or experience in teaching bioinformatics and Galaxy.
END_INCLUDE

# BASIC TOOLS
* Basic Knowledge of Galaxy Tools, or attendance at the [Writing and Publishing Galaxy Tools](/src/Events/GCC2016/Training#writing-and-publishing-galaxy-tools) session.
END_INCLUDE

# GALAXY IE
* Basic understanding of Galaxy IE, or attendance at the [Introduction to Galaxy Interactive Environments](/src/Events/GCC2016/Training#introduction-to-galaxy-interactive-environments) session.
END_INCLUDE

# GENERAL DOCKER
* General knowledge about Docker
END_INCLUDE
