---
date: '2018-08-01'
title: "Contributor of the Month: Pablo Moreno"
authors: "Björn Grüning"
image: "/src/blog/2018-08-cotm-pablo-moreno/pablo-moreno.jpg"
---

**Welcome to the first ever Galaxy Contributor of the Month posting!** 

The Galaxy ecosystem is a direct result of the Galaxy community and the contributions and involvement of community members.  The community make it all work in innumerable ways, including support, training and tutorial development, talks, posters, documentation, issue reporting, feature requests, tool publishing, coding, and Galaxy server, cloud, and appliance support. 

To help highlight our community we will interview a member of the community every month and feature him/her in the *Galactic Blog*.

## Pablo Moreno

This month we welcome [Pablo Moreno (@pcm32)](https://github.com/pcm32) as our *Galaxy contributor of the Month!* He is developing and maintaining the [Phenomenal Metabolomics Galaxy instance](https://public.phenomenal-h2020.eu/) at the [EBI](https://www.ebi.ac.uk/). 
Our first featured *Contributor of the Month* is *Pablo Moreno* of EBI and PhenoMeNal.

Among many other things, Pablo has this to say about Galaxy:

> To me in particular, the central and most powerful reason to stick to Galaxy is its lively and active development and user community

There is no better quote to start this series with.

----

Pablo, thanks for doing this interview, we are looking forward to learn more about you.

### Can you tell us a little about yourself (hobbies, education, background, etc.)?

My largest contribution to society so far is my beautiful 6 year old daughter, together with my wife who deserves most of the credits. This contribution occupies most of my free time, a portion of it playing Lego with her. Love traveling with them. When there is some time and I have the energies, I like to play the piano (which I can do at a relatively basic level). 

I was originally trained as a Biotech/Chemical engineer back at home at the [University of Chile](http://www.uchile.cl/english), to scale up microbial fermentation processes to industrial sizes. However I never actually worked on that. Since very early I worked in Bioinformatics, due to my interest in computer science and molecular biology, and did my Engineering research thesis on dynamic metabolic modelling. From that time is that my scientific heart is with cellular metabolism and its modelling. 

After my undergrad, I worked in the genomics and metabolic modelling of copper bioleaching bacteria for around 4 years before coming to the EBI in the UK to do my PhD in Bioinformatics with now [Prof. Chris Steinbeck](https://www.ebi.ac.uk/about/people/christoph-steinbeck); after a short post-doc there as well, I went to work again in production to run a Bioinformatics Core Facility at the [Cambridge Institute for Medical Research (CIMR)](https://www.cimr.cam.ac.uk/) at Addenbrooke’s Hospital. After a few years I was invited to return to the EBI to lead the technical side of the [PhenoMeNal Project](http://phenomenal-h2020.eu/home/), for providing workflows through a microservices architecture for metabolomics data analysis. 

### Why did you start using Galaxy?

I started using Galaxy when running the Bioinformatics Core Facility at the hospital, as a way to be able to improve the access to tools and workflows for non-bioinformatics researchers. My main reasons where its widespread usage, which probably meant that I could reuse a lot of tools, and the fact that it provided a UI for end users. Then, later on in PhenoMeNal, it was clear to us that both funders and wet-lab users where keen on using this workflow environment system above others. To me in particular, the central and most powerful reason to stick to Galaxy is its lively and active development and user community, central to its sustainability.

### How did you get into the Galaxy community, what (and when) was your first contribution?

My first contributions where some very minor things for docker-galaxy-stable some 4 years ago or so. My most relevant contribution has been the layers for having Galaxy run on and send jobs to the Kubernetes container orchestrator: the Kubernetes runner for Galaxy (to send jobs), the galaxy-stable Helm chart and containers for Galaxy (both independent and as part of docker-galaxy-stable).

### Which are your favorite Galaxy tools?

I don’t think I have one, I’m more on the infrastructure side of things. I did enjoy a lot when I managed to get [Escher (doi: 10.1371/journal.pcbi.1004321)](https://doi.org/10.1371/journal.pcbi.1004321) - a Javascript visualization toolkit for fluxomics data - to work inside Galaxy. I normally demo that a lot as part of the PhenoMeNal fluxomics workflow.

### What is your favorite Galaxy feature?

I find both the new Galaxy Tours and and having an API access very appealing. 

### What projects are you working on now?

I recently moved to the Gene Expression Group, led by [Irene Papatheodorou](https://www.ebi.ac.uk/about/people/irene-papatheodorou), at the EBI. Here we are working on tertiary analysis tools for Single Cell RNA-Seq, where we intend to provide a cloud deployable portal with analysis tools for this. I’m also in-charge of overseeing both bulk and single cell RNA-Seq production pipelines at EBI. For a for the past 3 years I have been leading the technical side of the Phenomenal-h2020 project and working intensively with the Metabolomics community to provide a first-class Metabolomic workbench.

### What are current challenges in Metabolomics?

Probably the biggest challenges in Metabolomics lie in identification of small molecules from spectra and being able to provide truly quantitative and reproducible results. This as well as uncovering so much of the metabolome that still remains elusive for detection. At our side on tools and workflows, probably the biggest challenge is the normalization of intermediate formats, which would truly enable interoperability of tools, towards mixing and matching different tools into workflows. 
  

### What advice would you give to new admins/developers/contributors?

There are many workflows environment out there, and people tend to only evaluate them on their technical merits; I would urge them to consider as well sustainability aspects and how relevant is to have an active development and user community that will guarantee that the time that they invest in generating tools and workflows will live beyond the lifetime of their project, giving real value for money to the taxpayer who funded them. And please, please, think twice before coming to build yet another workflow environment or related standard; if you tried existing environments and they didn’t seem to work in a few couple of hours, be a bit more persistent and try again, it will pay in the long run.

### What is your vision for the Galaxy community for the next years?

Galaxy should really consolidate as a scalable and production-grade environment for running data-science workloads, hopefully entering other fields of science as well, both on cloud and HPC systems. Galaxy should also engage more with standard-defining communities (like [GA4GH](https://www.ga4gh.org/)) and become the the best workflow system implementation for recent workflow/tools standards ([CWL](https://www.commonwl.org/), [WES](https://github.com/ga4gh/workflow-execution-service-schemas) and [TES](https://github.com/ga4gh/task-execution-schemas)).

----

Thanks for doing the interview!


