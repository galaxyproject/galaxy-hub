---
date: '2018-10-01'
title: "Contributor of the Month: Yvan Le Bras"
authors: "Björn Grüning"
tease: "Citizen Science and Galaxy for Ecology"
image: "/src/images/photos/yvanlebras.png"
---

This month we welcome Yvan Le Bras, also called the magic Yvan ([@yvanlebras](https://github.com/yvanlebras)) as our *Galaxy contributor of the Month!* Yvan is a long time community member and PI of the GalaxyE project for Ecology data science. Yvan thanks for doing this interview with us, we are looking forward to learn more about you and your work!

## Yvan Le Bras

### Can you tell us a little about yourself (hobbies, education, background, etc.)?

<img class="float-right" src="shark.jpg" alt="One the more beautiful animals I have seen and succeeded capturing on my camera" style="max-width: 250px" />

Originally a marine ecologist, learning molecular ecology aspect related to population genetics, I obtained a PhD in 2010 after 3 years devoted to quantitative genetics and functional genomics approach of rainbow trout capacities to cope with osmoregulation issues during transfer from freshwater to seawater. Postdoctoral opportunities drop me definitely deeper to the black matter of Bioinformatics and Biostatistics working for [Biogenouest](https://www.biogenouest.org/) western France Life sciences core facilities network through [INSERM](https://www.inserm.fr/en) and [CNRS](http://www.cnrs.fr/en/aboutcnrs/overview.htm) then at [INRIA](https://www.inria.fr/en/) to build a first french e-Science centre dedicated to life sciences. This was the time for me to concretise a several year old project idea of creating the Enancio start-up. Then, a wonderful opportunity brought me back to my first love, ecology and conservation, working 2 years for the "[65 Millions d'observateurs](https://www.mnhn.fr/fr/participez/actualites/lancement-projet-collaboratif-65-millions-observateurs)" national project coordinated by [French National Museum of Natural History](https://www.mnhn.fr/) where was set-up the [Galaxy-E](https://github.com/65MO/Galaxy-E) initiative, initially devoted to citizen science projects related to Biodiversity. Now, my mission is to coordinate the national research infrastructure **[Pôle national des données de Biodiversité (PNDB)](http://patrinat.mnhn.fr/fr/pole-national-de-donnees-de-biodiversite-pndb-6256)**, e-infrastructure in creation who will act as the French Biodiversity data hub.

My hobbies are related to marine activities in particular sailing and fishing demonstrating each time as I can to family, friends and unknown people the beauty of nature and wildlife....

### Why did you start using Galaxy?

During my PhD, 3 years 200% full time in a research lab, I rapidly noticed that life scientists were almost all facing difficulties regarding IT and statistics related processes. As I was an early defender of the necessity in science to understand all data-related treatment, this period was the start of a new “personal research” regarding difficulties of life scientists to understand and use data-oriented services. I was working on microarrays associated with quantitative genetics approaches and so dealing with “””huge””” datasets, for example, It was not possible to open raw files on Excel!!!! ;) Dealing with R, SAS, SSH connection, and other amazing complicated things, I finally succeed to analyse my data and got my PhD ;) but also, I was experimenting a lot of issues regarding reproducibility and the too important possibility of errors integration in the entire so complex “workflows” I used, changing computer, programs, language, copy/pasting peace of things… At the end of my PhD, in 2010, while re-analyzing raw datasets already valorized on a European project for a meta-analysis, I discovered that there were big issues on the original analysis process… All these things I think brought me to the certainty that there was an urgent need to facilitate the every-day life of “biologists” regarding data management and analysis while improving the underlying processes. In 2011, I was starting my first postdoctoral contract searching a way to analyse NGS datasets and combine it with Proteomics data…I discovered this amazing wonderful project, Galaxy and this paper “[Galaxy: a comprehensive approach for supporting accessible, reproducible, and transparent computational research in the life sciences](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2945788/)“ which immediately and deeply spoke to me, starting from the title!

### How did you get into the Galaxy community, what (and when) was your first contribution?

After one year as a user, a new postdoctoral contract brought me to the GenOuest INRIA Bioinformatics core facility where we started to enter the community creating “our” local one: the Western France Galaxy User Group (GUGGO). This community was started following the increasing demand from the core facility users, the core facility finally accept to administrate a Galaxy server but only of a local working group was created so we can exchange regularly with users, developers and others Galaxy instance administrators/developers/users… to share issues, best practices and feedback! First “”relations”” with the worldwide Galaxy community was in 2014, for the [Baltimore Galaxy Community Conference](/src/events/gcc2014/index.md)… and this was a real revelation! A so interesting conference that I can’t stop since this period to exchange and maybe sometime harass (sorry) Galaxy community… My first contribution to Galaxy was the (really quick and dirty) integration of population genetics tools such as Structure.

### Which are your favorite Galaxy tools?

I would have said [Stacks tools suite](http://catchenlab.life.illinois.edu/stacks/) as it was really a challenge to integrate it, some people tried and didn’t succeed, and this is the result and demonstration of the amazing work of [Cyril Monjeaud](https://seek.cesgo.org/people/2), my 2012-2015 sidekick and super mega genial developer ;) But I really appreciate particularly “”General text tools”” as Text Manipulation, Filter and sort, Join, Subtract and Group ones… [Regex find replace](https://toolshed.g2.bx.psu.edu/view/galaxyp/regex_find_replace) is so powerful! In my opinion, Regex is for me one of the harder thing a life scientist who don’t want to code (and yes he has the right! ;) ) should know. Using these “”General text tools””, we can do a lot in a reproducible and shareable way “”just”” searching a way to combine existing tools as “bricks”... This appears to me something so closer to the day to day manner to work as a life scientist, more than trying to remember how to copy a file on unix, submit a job on a scheduler or write code using good practices… I remember for example that I created a workflow, only based on these “”General text tools”” to convert genetic map format to another, maybe one the more used workflow by GenOuest core facility Galaxy users.

### What is your favorite Galaxy feature?

Not sure I have one… there so many cool things. At a first glance, and at the core of Galaxy, the use of web form to generate command line + extract a workflow from an history on 2 clicks… Then, the use of container technology as Docker, this amazing GCC2014 frenzy around “Docker, Docker, Docker” and the possibility to use it to add tools as complete interactive environments…. Or create / use [Galaxy flavors](https://galaxyproject.github.io/training-material/topics/admin/tutorials/galaxy-docker/slides.html#1)! Finally, I think that Data collections is something I really like.

### As PI of GalaxyE you are using Galaxy in very new ways and for a very different community. What are you experience with it. Is Galaxy ready to explore new areas of data science?

Sure that communities behind Ecology force to explore new ways! A part of these communities are already addressed by Galaxy, notably in molecular ecology, dealing with metabarcoding, metagenomics or population genomics for example. But there is a major part who needs to treat geo-referenced data, so related to Geographic Information System (GIS) field, to generate and compare complex statistical models, related to applied mathematics. A first experience through the birth of GalaxyE project in 2017 showed that these scientists are deeply using R and really related to the use of interactive tools and that’s why we notably investigated and challenged the use of R Shiny apps inside Galaxy. They are really rarely using High Performance Computing solutions, and prefer the use of Excel and R in their laptop, even if they have sometimes to keep the computer on for 3 days for computation. For sure Galaxy is ready to explore new areas, and concerning the ecology field, communities have begun to see the need of more accessibility, reproducibility as computing power and algorithm efficiency. But this is not depending only/really on tools, it’s more related to communities and evolution of their needs, often related to technological evolution. If parts of scientific communities need a system like Galaxy, I think Galaxy is ready to explore solutions. If Galaxy is not, this will mean that Galaxy is not the answer, but other initiatives can be (I hope ;) ). To go deeper on this aspect, I think Galaxy is perfect for life scientists as this is clearly a field where majority of people don’t want/don’t have time/don’t use every day life environment compatible with the ability to code and need to face complex analytics processes involving a lot of different tools and format so the workflow-centric view is fully appropriate. There is a lot of other things to consider, as the use of open-source tools. For example it seems complicated for now to “convert” people from mechanical research as the field is completely locked up on Matlab proprietary solutions. However, [testing the integration of a simple workflow into Galaxy in 2015](http://gcc2015.tsl.ac.uk/posters/#P27_Integration_of_Mechanical_Testing_Process_in_the_Galaxy_Environment) allows us to see the enthusiasm of potential users regarding the result!

### On which other projects are you working on in the next year?

Missions of the PNDB e-infrastructure project are:

[<img class="float-right" src="concarneau-pet.jpg" style="max-width: 200px" alt='Concarneau "pet" ;) with marine station in background' />](concarneau-pet.jpg)

1. Providing access to datasets and metadata, related services and derived products from the analysis.
2. Promoting scientific animation to identify gaps and promote the emergence of initiatives carried by communities of users and producers.
3. Facilitating the sharing of practices with other research communities, promote data sharing and reuse, and feed into the thinking of a future global Earth System infrastructure.
4. Promoting coherence with national, European and international efforts to access and exploit biodiversity research data, promote products and services.

To achieve these objectives, the PNDB proposes to:

<div class="float-right">
[<img src="concarneau.jpg" style="max-width: 250px" alt='My actual lab in Concarneau, Brittany, at the world oldest marine station in activity' />](concarneau.jpg)<br /><br />
[<img src="jardin-des-plantes.jpg" style="max-width: 250px" alt='My other lab Jardin des Plantes in Paris' />](jardin-des-plantes.jpg)
</div>

- link existing French initiatives and data sources to pool expertise, promote interoperability, openness, access, reuse of data; and stimulate collaborative research projects;
- develop the fine description of datasets for contextualization; optimize harvesting and access to metadata through a common portal;
- promote the prioritization and development of tools, services, products and standards - and the expertise attached - to carry out the diffusion, to support the training;
- promote the complementarities of producers and users of data through an integrated approach: observation data, experimentation, collection, modeling; in situ and remote sensing;
- continue animation around measured variables (including the amazing [EBVs concept](https://geobon.org/ebvs/what-are-ebvs/)) from genes to ecosystems to advance standardization and identification of other variables.
- establish, with the other data hubs, easier access to environmental data and carry out interdisciplinary actions (health, HSS);
- continue international activities and become, if necessary, the component of a European RI.
- ensure synergy with information systems for expertise and public policy support.


### There are rumors you and your team have created the first Galaxy community song. Is this true is the “code” somewhere available?

Well… hmm…. I remember an email exchange during one of the first [remote IUC hackathon](https://github.com/galaxyproject/tools-iuc/issues/299) on Metagenomics…. And something related to the amazing contribution of “”girls”” on this hackathon at INRIA Rennes (a certain Bérénice Batut, Laura Leroi from Ifremer, Sandrine Perrin from IFB, Coline Thomas from INRA) … don’t know if I can find the text of the song…  [5 minutes after archeology on my mails and local folders..] : Tada!

```
Hi, Galaxy!
Hi, Meta!
You wanna go for a ride?
Sure, Meta!
Jump in!

I’m galaxy girl in a meta world
Life in omics, it’s fantastic
You can pull request without any complex
Imagination, workflow is your even

Come on Galaxy, let’s go party!

I’m a tools web platform, in a command line world
Start me up, make it tight, I’m your dollie
You’re my doll, rock’n‘roll, feel the glamouring ring
Kiss me here, touch me there, hanky panky

You can touch, you can play
If you say: “I’m always yours”, ooh wow

I’m galaxy girl in a meta world
Life in omics, it’s fantastic
You can pull request without any complex
Imagination, workflow is your even

Come on Docker, I’m a hacker!
Ah ah ah yeah
Come on Docker, I’m a hacker!
Ooh wow, ooh wow
Come on Docker, I’m a hacker!
Ah ah ah yeah
Come on Docker, let’s go hacker!
Ooh wow, ooh wow

Make me awk, make me talk, do whatever you please
'can unzip or untar, I can change the proxy
Come jump in, be my friend, let us do it again
Move unknown, put shebang, let’s go party

You can touch, you can play
If you say: “I’m always yours”
You can touch, you can play
If you say: “I’m always yours”

I’m galaxy girl in a meta world
Life in omics, it’s fantastic
You can pull request without any complex
Imagination, workflow is your even

I’m galaxy girl in a meta world
Life in omics, it’s fantastic
You can pull request without any complex
Imagination, workflow is your even

I’m galaxy girl in a meta world
Life in omics, it’s fantastic
You can pull request without any complex
Imagination, workflow is your even

Oh, I’m having so much results!
Well B, we’re just gettin’ started
Oh, I love you Meta
```

### What is your vision for the Galaxy Project for the next years?

Notably regarding [GCCBOSC 2018 Galaxy Community update presentation](https://gccbosc2018.sched.com/event/EYGc/galaxy-community-update), it seems to me that maybe the role of Galaxy is multiple:

- increase the number of users and not the dataset size and complexity…. Searching to be known and tested by all researcher communities to know the potential need of each community regarding what Galaxy can offer
- in the meantime, continue to deal with dataset size and complexity on the first community of Galaxy user, so biomedical related research
- continue and increase its role in democratising / presenting / explaining / commonizing / introducing complex data analysis processes to newcomers / young scientists / lost scientists through [Galaxy Training Network](https://galaxyproject.org/teach/gtn/) activity notably. 

<img src="dolphin.jpg" class="img-fluid" alt="Heading out" />

### Thanks for doing the interview!


