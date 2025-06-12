---
title: "Commoditising open computing in Galaxy"
tease: "Transparent, reproducible open computing as a public good"
authors: "Ross Lazarus"
external_url: ""
date: "2022-01-16"
source_blog: ""
source_blog_url: ""
autotoc: false
site: InterGalactic Ministry of Truth
---

Galaxy is a mature open source project, supported by a variety of separate research grants, and sustained by a large, active community of contributors. Since starting in 2005, the project has become increasingly useful and more widely used. It has also become much more complex, with many more moving parts and functionality. As a result, it is not always easy to see the *big picture* view of the important things that the project is doing, and what the impacts might be.

#### My personal take on that big picture follows, so please read on, if that is of interest.

---

At a very high level, Galaxy can be described as software designed to make it easy for scientists to practice open scientific computing.

That description contains a twist. Galaxy is an open source project for science, but it is not a discipline focussed open science application. Instead, Galaxy is a sort of meta-application, a framework designed to have discipline specific applications overlaid. Any selection of discipline relevant, open source command line software packages can be installed, to make that particular server useful for analysis computing, in any desired data intensive science.

At the core, it provides a more or less generic, discipline agnostic analysis platform, that allows scientists to manage their own data and to perform replicable complex computing. It is the platform that provides all of the open science functionality, including authentication, user interface, tool repository, data management, sharing, workflows, histories, visualisations, training, API and computational replication. Those features are all provided by the server source code.

To be useful to a user, it requires user data to be uploaded, and open source packages to be installed, as tools, to analyse the data. Users can select locally installed tools for their analyses and it is those installed tools that do all the actual analysis computing. The framework has an [abstract interface for tools](https://planemo.readthedocs.io/en/latest/writing_standalone.html). Any open source command line software package can be turned into a new tool, ready to be installed in any Galaxy server. In this way, Galaxy servers are typically tailored to suit the particular analysis needs of different kinds of research, by providing a matched set of tools in the tool menu. Easy user access to open science practice is common to any of the resulting tailored, distinct servers because all that functionality is built in to every server.

There are two additional aspects of that description that need clarification. One is to *make it easy*. This means making the technology so transparent to the user, that they don’t need to think about all the technical challenges that have been overcome. Galaxy goes as far as it can to make open scientific computing free of technical friction, to meake open science practice easy and routine for scientists. Clearly much more complicated, but something like using a commodity word processor, requiring a little training, and then writing without ever worrying about word processing technical challenges.

The second aspect to clarify is the idea of scientific computing being *open*. This is more complicated, but is meant to imply that the entire computation for an experiment’s analysis is transparent, shareable, replicable and can be validated, extended or repurposed easily by other scientists. For some details about how this is supported, see [this post](/news/2022-01-17-replicating-computation-ross/). This might not matter for trivial computation, but in most useful, complete or published complicated analyses, dozens or even hundreds of independent command line packages are needed to transform raw data input to final output results. Turning a complex computing process into something transparent enough to be shared, and reliably reproduced by others, usually demands a substantial additional investment of technical effort.

There has been plenty of other progress supporting open science practice. Widespread adoption of FAIR principles make data easy to find, and all the needed open source software packages are readily downloaded. Among the many remaining open science challenges that Galaxy addresses, is transparency in all aspects of the complete computation for an analysis. This facilitates thorough scrutiny and replication that result in scientific trust. That is not to say that non-open (inscrutable) science is necessarily invalid, but scientific trust can only be obtained when findings have their assumptions and analysis code checked, reproduced and validated independently. Non-open research computing loses all the other open science benefits to scientific progress, such as opportunities to repurpose or extend the work.

A common problem that prevents many researchers from routinely sharing their work, is the effort required to make their analyses easy to share and reproduce. Creating and testing a reproducible artifact from a messy directory full of command line scripts, from a computer with a chaotic software installation history, is a non-trivial challenge. Unfortunately this is not uncommon in busy research laboratory code development environments. Code is central, but for replication, that code should be run with exactly the same software package and dependency versions. Code is not hard to share, but the specific software execution environment is harder, although possible using a container.

Galaxy automates the controlled sharing of histories and workflows, supporting easy replication of the entire computational environment. Once sharing and replication are easy, validation (on other data), sensitivity analyses for parameters, and most importantly, for repurposing and extending the work, is also easy. That core of open scientific computing is currently available in Galaxy.

Providing scientists with easy access to opportunities to practice open science, so it becomes more and more like any other routine scientific commodity, is an important open science challenge that Galaxy tries to address. With just a web browser, and relatively little training, scientists quickly become productive. Training is built in, as self directed learning material in the [GTN](https://training.galaxyproject.org/), as part of the infrastructure for making everything as easy as possible for researchers. The actual open science experiments and analyses still depend on the skills of the researcher, but by using Galaxy, all the associated benefits of open scientific computing practice make the analysis readily available to the scientific community, for replication and repurposing.

Exactly how that will change science is hard to predict. Negative impacts seem unlikely, other than on   commercial competitor profitability. The peer review process would probably be far more useful, if all the reviewers could readily share, replicate and scrutinise a transparent experimental analysis. It seems likely to speed up the validation of more reliable, replicable new methods and findings. That may improve scientific progress by more rapid accumulation of scientific trust in the reproducible, and quicker abandonment of findings that cannot be replicated. It will likely accelerate the overall rate of discovery, by making it much easier to repurpose the analysis computing already developed for related work. It will certainly make research more efficient in terms of adding additional value to previous analyses, particulary if previous work is easily discoverable and repurposable.

If you've managed to read this far, you may want to learn more about opportunities to help make open science computing more accessible. If so, you are cordially invited to [become involved in the Galaxy project](/news/2022-01-14-users-guide-to-contribution-ross/) in [any way you can](../../community/contributing).

---
