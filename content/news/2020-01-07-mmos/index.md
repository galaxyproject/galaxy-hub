---
title: Massively Multiplayer Online Science in Galaxy to help Ecologists - A Citizen
  Science Project
date: '2020-01-07'
tags: [galaxy, MMOS, devops, society]
authors: bgruening
authors_structured:
- github: bgruening
subsites: [eu, freiburg]
main_subsite: freiburg
---

A few years back the "webhook" concept was contributed to the Galaxy codebase.
Webhooks have enabled custom modifications to the Galaxy User Interface (UI) without changing the Galaxy source code directly.
The advantage is that the maintenance of custom changes is a lot easier. You can think of it as a plugin concept for the Galaxy UI.
Webhooks are powering the so much-loved XKCD or PhD comics that you see when you submit jobs or workflows for example - but this was just the first step...

Today we are proud to announce an extension that enables __you__ to help our ecology community to annotate existing datasets by classifying hoverflies into males and females.
This information will help ecologist in further data analysis, for example, to train future machine learning models. [Try it!](https://usegalaxy.eu/gapars-experiment)

<div class="multiple-img">
    <img src="/assets/media/mmos_flies.png" alt="classification of marmelade hoverflies" />
    <i>SPIPOLL datasets and first MMOS task on usegalaxy.eu</i>
</div>


<br>
#### Crowdsourcing in science is hard

Crowdsourcing in science is hard. Nevertheless, there are tremendous opportunities where we all can advance science and help our colleagues. Here we are trying to overcome the challenges by embedding the crowdsourcing tasks into Galaxy.

The idea is to provide a simple framework to create and manage tasks and data via the [MMOS platform](http://mmos.ch),
together with a simple [UI](https://usegalaxy.eu/gapars-experiment) and integrate this into [Galaxy Europe](https://usegalaxy.eu).

For us, it made a lot of sense to offer the hoverfly images after you execute a job or a workflow. Usually, you need to wait a few seconds until your job is processed and you can study the results. During this time you can now classify marmalade hoverflies as a means to procrastinate - but in a very meaningful way and the
good feeling to have helped our colleagues from ecology :)

The work done by __you__ with this new Galaxy feature allows ecologist to extend metadata on already captured data
and will open new ways to analyse them. For example by
training machine learning models or taking into account new factors (here the sex of the flies) in statistical modelling.

<br>
#### How it works and how to create new plugins of this kind

The [SPIPOLL](https://www.spipoll.org) citizen science project collects images from different species, in our case from [Episyrphus balteatus](https://en.wikipedia.org/wiki/Episyrphus_balteatus), also called marmalade hoverfly. In a second step, a project manager prepares certain tasks and seeks for community contribution to help to classify the images.
As a first project, we have chosen to help with the task to classify ~5000 hoverfly images and identify the sex by looking at their relative eyes position.

To make it really simple for __you__ to contribute to such a crowdsourcing project we teamed up with the project [Massively Multiplayer Online Science](http://gapars.mmos.ch), which is a citizen science platform connecting scientific research to citizen through notably video games! :)

On the MMOS side, we had to populate the developer portal with pictures and provide all mandatory metadata. We then had to create a simple webpage that could be embedded into Galaxy. This site displays the task (our hoverfly image) and allows submitting an answer to the MMOS server.

The hoverfly example can be found on [GitHub](https://github.com/galaxyecology/webhook_SPIPOLL_Flash/blob/master/templates/guess.html).
This is a very simple example, with a single picture displayed as a task, but you can imagine many other possibilities and not only pictures!

If you have a task where you need the help of thousands of researchers, talk to us and we will figure out together how we can treat your data in a similar way as our marmalade flies!


<br>
#### Have a lot of fun during your research!

Have much fun classifying flies and let us know if you have similar use-cases!
Thanks a lot to all contributors, particularly [Rémi Planel](https://github.com/rplanel/), [Helena Rasche](https://github.com/erasche/),
the MMOS project and [Yvan Le Bras](https://github.com/yvanlebras/)!

This work is a collaborative effort between [French National Museum of Natural History](https://www.mnhn.fr/en), UseGalaxy.eu ([de.NBI](https://denbi.de/), [ELIXIR](https://elixir-europe.org)) and the [MMOS](http://mmos.ch) company. This project has also received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement Nr 732703” 

If you want to read more about crowdsourcing citizen science data on UseGalaxy.eu have a look at the [new blog post by Yvan](https://galaxyproject.org/blog/2020-01-galaxy-ecology-citizen-science/)! 

<div class="multiple-img">
    <iframe width="750" height="315" src="https://www.youtube.com/embed/U6mu3QrK9Ao" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

