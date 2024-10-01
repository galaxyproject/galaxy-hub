---
title: "Opinion: Conda, Anaconda and the much bigger problem behind it"
tease: "Anaconda, DockerHub, Quay.io, GitHub ... we need to talk about the sustainability of our infrastructure."
hide-tease: false
authors: "Björn Grüning"
date: "2024-08-20"
tags: ["anaconda", "opinion"]
subsites: [global,all]
---

# Opinion: Conda, Anaconda and the much bigger problem behind it.


[This recent news article](https://www.theregister.com/2024/08/08/anaconda_puts_the_squeeze_on/) describes efforts by Anaconda to ensure that certain users pay to use products and infrastructure Anaconda has developed and maintains. __This has no effect on Galaxy, conda-forge, Bioconda or BioContainers__, but it raises questions about the future of “free” access to the critical infrastructure that the open science research community depends on.  

Disclaimer: I (Björn Grüning) am personally involved in Bioconda, BioContainers as well as a bit in conda-forge. These are my personal views and opinions, not those of the Galaxy community (even though it's published on their blog) or my employer.


## Background

Conda is an open software packaging and distribution format, that allows you to create packages containing (complex) software. These can easily be shared and automatically installed without additional manual effort. Conda packaging is a key component of the open source infrastructure that supports for example Galaxy tool sharing and computational reproducibility. Conda is licensed under the [BSD](https://github.com/conda/conda/blob/main/LICENSE) license and has its own [open governance structure](https://github.com/conda/governance). Indeed, you can use conda-packages, without conda - you have probably heard, or even used mamba in the past. [Anaconda Terms of Service (ToS)](https://legal.anaconda.com/policies/en/) has no effect on conda-forge or Bioconda, or the conda packages you've built or invested in over the years, but it does apply to Conda packages in the "defaults" channel that Anaconda has built, maintains, and serves from their infrastructure and [CDN](https://de.wikipedia.org/wiki/Content_Delivery_Network).

## What's the Fuss About?

The current discussion is about the Anaconda's commercial Terms of Service (ToS).

The use of Conda packages in the "defaults" channel is licensed under terms defined by the commercial organisation that maintains it - Anaconda. That legal license requires that users employed by “large” institutions or companies pay for it. Anaconda has recently notified a number of academic and non-profit organizations that they appear to be in breach of the current license, as described in the article linked above. While the communication could have been handled way better, the ToS is imho not very well written, its not easy to just “block” the default channel etc, is Anaconda doing the wrong thing by seeking to enforce the terms of the license they grant to users of the “defaults” channel? 

## Why this matters to Open Science

The downstream consequences from Anaconda licensing is just one example of a much larger and more important challenge - who pays for all the open science infrastructure we depend on? As researchers and academics committed to reproducible science, we rely on infrastructure like GitHub, Anaconda, Quay.io, DockerHub, etc. 

These core services are run by large, commercial organisations that must pay all the costs of running them. Access to these resources is controlled by terms of the specific license imposed by the provider and accepted by the individual using those services. Income from some users enables the services to be used without fees by other kinds of users.

If for-profit organisations are required to pay to use these services, that income enables the services to be used without fees by non-profit users. However, commercial providers are not obliged to treat academic or other not-for-profit organisations in any special way, yet we are building our scientific infrastructure to a large degree on those services.
How many of us pay for these services? How many of us care deeply about reproducible science to the extent of calculating full costs and either paying for the infrastructure they are using or running own academic infrastructure to mirror all the packages, containers, etc.? Do you still remember the DockerHub outcry? Are you now paying for DockerHub? How many of us know the actual costs?

Here are a few facts:

* Bioconda uses 784.6 GB of storage on Anaconda.org for 10,793 public packages.
* BioContainers uses ~28TB for 109,062 containers hosted on Quay.io.
* Both Bioconda and Quay.io have provided generous resources from the beginning, with no quota limits.
* Anaconda has given us access to their CDN, enabling fast downloads of Bioconda and conda-forge packages worldwide.
* The Galaxy Project maintains a backup of all 109,062 containers (Singularity) and a global CVMFS mirror, ensuring fast downloads.
* ELIXIR/EMBL is providing a backup of all Docker containers.
* You can mirror an entire Anaconda.org channel locally, host it, and distribute it as needed.

We claim that reproducible science is important, but few are willing to pay for it. If you ask me, of course, academic, and non-profit users shouldn't have to pay for the infrastructure they use—democratizing access to compute, storage, packages, and containers … overall this is what Galaxy has been doing for 19 years. But, das Leben ist kein [Ponyhof](https://en.wiktionary.org/wiki/das_Leben_ist_kein_Ponyhof), There's no such thing as a ["free lunch"](https://en.wikipedia.org/wiki/No_such_thing_as_a_free_lunch); we live in a capitalist system where less and less is free and social. Expecting scientific infrastructure to be free while enjoying the benefits of a capitalist system is cherry-picking.

## What Needs to Change

First, we need to stop complaining and start showing appreciation. We've had 9 great years of a “free lunch” provided by Anaconda (Conda), Quay.io (Docker), and Galaxy (Singularity). It's time to realize that most of us never said “thank you” and took things for granted in a system where nothing is free or guaranteed.

Second, if you care about reproducible science or academic infrastructure (think GitHub, AWS vs. academic clouds), we have two choices:

1. Start paying—include a budget for Anaconda, Gitlab, Quay.io, etc., in your next grant.
2. Build academic clouds and infrastructures that are free for everyone and sustainably funded. 

Both options will cost money, so let's involve funders in this discussion and treat software like e.g. lab equipment.

Alternatively, we could move to another startup with a great packaging system that burns venture capital in the early years until they realize they need to earn money and start "squeezing" the community, as The Register put it.

Rant over.</br>
Bjoern


#### further readings:

* [Conda Ecosystem Explained](https://conda.org/blog/2024-08-14-conda-ecosystem-explained/)
* [Peter Wang, Chief AI & Innovation Officer, Co-Founder at Anaconda, Inc.](https://www.linkedin.com/posts/pzwang_hi-everyone-recently-there-has-been-discussion-activity-7229549723462905856-rQH-/)
