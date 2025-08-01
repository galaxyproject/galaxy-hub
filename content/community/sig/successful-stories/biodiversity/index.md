## Our community onboarding

### How did we get to know about Galaxy project and framework and its potential

Galaxy’s Biodiversity community is focusing on one important aspect: the description of existing biodiversity through the sequencing, assembly and annotation of wild species.

At the start of this community, the [Galaxy Genome Annotation SIG](https://galaxyproject.org/community/sig/genome-annotation/) was born in 2017 during a GCC meeting, when different members of the Galaxy community met and showed shared interests in using Galaxy for the genome annotation of various organisms, in particular phages or insects. At the time, some initial versions of [JBrowse](https://jbrowse.org/jb2/) and [Apollo](https://genomearchitect.readthedocs.io/en/latest/) tools, as well as prokaryote genome annotation tools like [Prokka](https://github.com/tseemann/prokka), were already implemented and demonstrated how powerful Galaxy could be in this field. In particular, with Galaxy it was finally possible to execute these tools without the burden of installing and configuring them, and JBrowse/Apollo tools allow to generate and share perfect looking visualisations in a few clicks instead of multiple complex command lines.

Over the years, this first stage of our community gave birth to several tools, workflows and visualisations that were integrated into Galaxy, and demonstrated how it was a perfect platform to improve the practices in this field, for all sorts of organisms.

More recently, large scale genome sequencing projects have emerged throughout the world, under the ([Earth BioGenome Project (EBP)](https://www.earthbiogenome.org/)) umbrella ([European Reference Genome Atlas (ERGA)](https://www.erga-biodiversity.eu/), [Biodiversity Genomics Europe (BGE)](https://biodiversitygenomics.eu/), [Vertebrate Genomes Project (VGP)](https://vertebrategenomesproject.org/), [ATLASEA](https://www.atlasea.fr/en/), …). These projects aim to sequence thousands or even millions of new genomes in the coming years. This is a dramatic change in the volume of data to be treated, and we thought that Galaxy could address the computing challenge while respecting the FAIR and open science principles. This was a second stage for this Biodiversity community, and coincided with the start of the [EuroScienceGateway (ESG)](https://galaxyproject.org/projects/esg/) project.

### What were our needs / challenges

Outside of Galaxy, a typical genome annotation analysis is performed using complex pipelines (widely available like [BRAKER](https://github.com/Gaius-Augustus/BRAKER), or developed in-house), composed of many different steps, with tools that are often hard to install and hard to tweak (many options, many different ways to perform model training steps). Finding and accessing the correct raw genome sequence data can also be a challenge when faced with millions of new genomes.

This led to hard-to-reproduce results and a lack of standard procedures which can be applied routinely to new genome sequences.

Finally there was a great need for standard evaluation tools to compare results, and good visualisations to interpret them.

### What were the steps we made

We started with the integration of state of the art tools within Galaxy (e.g. [MAKER](https://www.yandell-lab.org/software/maker.html), [Funannotate](https://funannotate.readthedocs.io/en/latest/), [BRAKER](https://github.com/Gaius-Augustus/BRAKER)). As these tools are complex pipelines, with huge lists of dependencies, integration was only possible after significant efforts on packaging. As Galaxy relies on the standard [Conda](https://docs.conda.io/en/latest/) and [Biocontainers](https://biocontainers-edu.readthedocs.io/en/latest/what_is_biocontainers.html) eco-system, it was a good opportunity to package these tools properly for Galaxy itself, but also for a wider community of people willing to use these tools.

In parallel to analysis tools, we also worked on the integration of visualisations within Galaxy, and on the integration of Dockerized external web applications ([Tripal](https://tripal.readthedocs.io/en/latest/user_guide.html), [Jbrowse](https://jbrowse.org/jb2/), [Apollo](https://apollo.jbrowse.org/), [Chado](https://chado.readthedocs.io/en/rtd/best_practices.html)), making it possible to integrate Galaxy analyses into a larger flow of data treatments. Users could then assemble a genome in Galaxy, perform an initial automatic annotation, load the results into external visualisations applications, set up a project of manual curation of annotation with [Apollo](https://apollo.jbrowse.org/), and finally load back the curated data into Galaxy for a next round of analysis.

We went on by working on training material; Galaxy proved to be a very powerful platform for training thanks to its [Galaxy Training Network](https://training.galaxyproject.org/). Training material allowed us to train scientists to use these tools on their own data, but was also a great way to promote our work and aggregate new people to our community and learn more about their needs.

The latest developments are targeted to the integration of new generation annotation tools ([BRAKER3](https://github.com/Gaius-Augustus/BRAKER), [Helixer](https://github.com/weberlab-hhu/Helixer), [Compleasm](https://github.com/huangnengCSU/compleasm), [Omark](https://omark.omabrowser.org/), …), the addition of external [EBP](https://www.earthbiogenome.org/) data sources, and on the creation of standard automated workflows.

### What have we have achieved given our level of maturity

At the time of writing this report, we have produced a very complete set of state-of-the-art Galaxy tools for genome annotation, that can be applied to the output of recently published [VGP](https://vertebrategenomesproject.org/) assembly workflows.

Assembly data from [VGP](https://vertebrategenomesproject.org/) and [European Reference Genome Atlas (ERGA)](https://www.erga-biodiversity.eu/) projects can also be accessed directly from [the European Galaxy server](https://usegalaxy.eu/), as standard remote data sources.

Advanced visualisations and manual curation projects can already be created and shared directly from <usegalaxy.eu>.

Finally [a collection of training material](https://training.galaxyproject.org/training-material/topics/genome-annotation/) is already available allowing any researcher or student to learn how to make use of these developments for their own projects.

### What have we have in mind for the remainder of the project:
Our plans for the remainder of the [ESG](https://galaxyproject.org/projects/esg/) project are to:

  - Create new standard workflows, ready to be used at large scale on [EBP](https://www.earthbiogenome.org/) data
  - Reference these workflows on standard repository, including [WorkflowHub](https://workflowhub.eu/)
  - Apply our new workflows on real [EBP](https://www.earthbiogenome.org/) data
  - Rely on the new [European Pulsar network](https://pulsar-network.readthedocs.io/en/latest/), giving access to the computing resources needed for the annotation of thousands of new genomes
  - Create new training material making use of our latest developments

#### Setup
The Biodiversity community relies on UseGalaxy.* servers, and in particular on the UseGalaxy.eu infrastructure.

#### Problems to solve

The provision of additional CPU and GPU resources within [EuroScienceGateway](https://galaxyproject.org/projects/esg/) is a must, and that should satisfy most compute needs of a vast majority of Galaxy users. However the main issues we see for some of the newest computationally demanding tools such as [Helixer](https://github.com/weberlab-hhu/Helixer) on GPUs is that there are compatibility issues with existing conda packages and related [biocontainers](https://biocontainers-edu.readthedocs.io/en/latest/what_is_biocontainers.html). Without going into the details of the hardware and software requirements, and while NVIDIA, AMD and Intel are major vendors of GPUs, most (if not all) conda packages are only adapted to NVIDIA GPUs: this makes it currently impossible to exploit powerful AMD GPUs, for instance. 

## Our community outreach

  - Personal contacts
  - Publications, conferences, workshops
  - The other communities are:
    - how similar their needs are
    - how difficult it is to satisfy their needs