---
date: '2018-12-12'
title: "Contributor of the Month: Simon Gladman"
authors: "Martin Čech"
image: "/src/blog/2018-12-cotm-simon-gladman/simon_small.jpg"
---

This month we welcome Simon Gladman (Twitter: [@SimonGladman1](https://twitter.com/SimonGladman1), GitHub: [@slugger70](https://github.com/slugger70)) as our Galaxy contributor of the Month! Simon works at the [University of Melbourne](https://www.unimelb.edu.au/) and is one of the developers of the [Genomics Virtual Laboratory](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4621043/) cloud image. Simon is a firefighter, cheesemaker, pillar of the [Galaxy Australia](https://usegalaxy.org.au/), and an overall jolly good fellow.

Simon, thanks for doing this interview, we are looking forward to learn more about you and your work!

## Simon Gladman


*Can you tell us about your hobbies, education, background, etc.?*

I trained as a Chemical Engineer and spent the first few years of my working life as a research engineer with CSIRO in food science. I then moved into dairy research and became a cheesemaker/process engineer for the next 15 years or so. I took an interest in the starter culture bacteria and got into bioinformatics in the 2000’s and eventually shifted into bioinformatics full time.

I’ve also been a volunteer firefighter in my home town for about 25 years and I regularly attend emergency callouts at all hours. Last year my brigade had over 350 callouts.

*Why and when did you start using Galaxy?*

I was introduced to Galaxy when I was still at CSIRO in 2010-2011. We were working on some bacterial genomes and were looking at various systems for doing the analysis. I thought Galaxy showed a lot of promise way back then. When I moved across to Monash/Melbourne Universities in a joint appointment in 2012, I started using it and working with it in earnest. Originally it was because Galaxy was the main feature of the Genomics Virtual Lab (GVL) cloud image, but increasingly I was using it for my own analysis work.

*How did you get into the Galaxy community, what was your first contribution?*

When I started working at Melbourne University we started writing training tutorials for different analyses using Galaxy and I started wrapping tools of interest like Velvet, Prokka etc. I was lucky enough to attend the Galaxy conference in Oslo in 2013 and met all the amazing Galaxy community there. Compared with some of the other scientific communities I have been involved in, I found everyone working with Galaxy so open and friendly and willing to put the effort in to teach newbies like me how to help out. It was an incredibly welcoming experience. People started using our training materials and a few of us organised a BOF that eventually grew into the Galaxy Training Network.

*Do you have favorite Galaxy tools and/or features?*

I really like the bacterial typing and analysis tools. Things like MLST, Prokka, Barrnap, Shovill, Roary, Gubbins etc. They’re the ones I’ve used the most and contributed to.

My favourite feature is hard to pick. There are so many. I love the re-run button, the history browser, integrated environments etc, and from an administrators point of view I love the dynamic tool destination system, the CVMFS reference data repository and the Pulsar job runners.

*What projects are you working on now?*

I’m currently one of the administrators of Galaxy Australia and have been getting our server to spread its compute load around our large and sparsely populated country. :) I’m also working on adding more tools and data to Galaxy.

I still get to work on research projects for microbiology in public and oral health too.

*What advice would you give to new contributors?*

Dive in! Everyone here is really friendly and so welcoming to new people. Certainly don’t be afraid to ask questions. If possible, try and come to the Galaxy Community Conference and associated codefests as you will get to meet everyone, have a beer (or other beverage) with them and talk about ideas and efforts.

*Could you please tell us about `usegalaxy.*` efforts?*

The UseGalaxy servers are publicly accessible Galaxy servers that will support a common and synchronized set of tools and reference genomes. These servers have significant computational resources behind them and are capable of powering large user communities. Some may have a regional focus with locally interesting tools and reference genomes, but they are all accessible to anyone.

There are currently three usegalaxy.* servers. usegalaxy.org (Galaxy Main, spread out across the USA), usegalaxy.eu (Galaxy Europe, mostly in Freiburg, Germany) and usegalaxy.org.au (Galaxy Australia in Queensland, Canberra and Melbourne, Australia.) We would always welcome more public Galaxy servers to join the effort!

The project is very much a work in progress but we have set up a globally shared filesystem for the reference data and tool indices used on these servers. We also all run the latest Galaxy release. We are moving towards a minimum common toolset, common layout and look and feel and shared tool installations.

*What is your vision for the usegalaxy.org.au and the Galaxy project itself for the next years?*

In the short term, our plans for usegalaxy.org.au are to increase its compute resources by distributing them around the country via a network of Pulsar nodes and the introduction of cloud-bursting capabilities. We plan on supporting a much larger set of tools for areas like single cell analyses, long read technologies and other omics such as metabolomics and proteomics. We also plan to synchronize our toolset with Galaxy Europe and Galaxy Main.

Our ultimate goal is to be able to use our Galaxy servers and infrastructure to support the concept of “single sign on” for Galaxy. We would have federated Galaxy web servers supported by a globally distributed backend. Where a user anywhere in the world can login to Galaxy and have their jobs run on infrastructure close to where their data is located. For example, if a user in Australia logs in to the global server, their jobs will be run on Australian infrastructure and their data stored locally to them. Similar for users elsewhere.


Thanks for the interview!
