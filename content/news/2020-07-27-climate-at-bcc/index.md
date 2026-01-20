---
title: Climate Science at BCC2020
date: '2020-07-27'
tease: July has been a very busy month for Galaxy Climate
tags: [GCC, tiaas]
supporters:
- galaxy-europe
- eosc
- elixir
- denbi
- unifreiburg
- eu
authors: annefou
authors_structured:
- github: annefou
subsites: [eu, freiburg, global, us]
main_subsite: freiburg
---

July has been a very busy month for [Galaxy Climate](https://climate.usegalaxy.eu/) ending with several sessions dedicated to Climate Science at [BCC2020](https://bcc2020.github.io/). It started on July 18-19 with two introductory training sessions (West and East) on “[Getting your hands on Climate data](https://training.galaxyproject.org/training-material/topics/climate/tutorials/climate-101/tutorial.html)” where attendees learned on accessing and analyzing climate data in Galaxy. One important aspect was to explain the difference between climate and weather data; show how to visualize climate data on a map with Galaxy and then how to create and share a simple workflow for framing a very simple adaptation case study.
This event was supported by [Galaxy Europe](https://usegalaxy.eu/) and [TIaaS](https://galaxyproject.eu/tiaas) and benefited from the allocation of completely dedicated compute resources for the duration of the training.

During the main BCC2020 conference [EOSC-Nordic](https://www.eosc-nordic.eu/) gave an update about Galaxy Climate and more importantly detailed its roadmap. The Galaxy Climate Science Workbench is a use case in the EOSC-Nordic project. At a policy level, the project will help to resolve issues related to cross border research collaboration using HPC and HPC-cloud based computing resources within EOSC. At a community level, the focus was put on fostering and advancing take-up through the development of blended training. Since GCC2019, EOSC-Nordic contributed to the development of 4 new Galaxy tutorials. For future developments, the approach is simple: rather than reinventing the wheel, EOSC-Nordic chose to base its roadmap on the [EOSC-Life tools roadmap](https://github.com/eosc-life/tools-collaboratory-roadmap) and reuse as many components as possible for the Climate community. Strengthening collaboration with Galaxy Community and [EOSC-Life](https://www.eosc-life.eu/) is an integral part of its plan! 

<iframe title="vimeo-player" src="https://player.vimeo.com/video/437706026" width="640" height="360" frameborder="0" allowfullscreen></iframe>

Link to the slides: [https://drive.google.com/file/d/18QQN-o8EY0CpdxUvZCqbaFjE7KFdOAAW/view](https://drive.google.com/file/d/18QQN-o8EY0CpdxUvZCqbaFjE7KFdOAAW/view)

This strategy pays off and the Climate community is increasingly being involved. One major outcome is the introduction of [JupyterLab for Ocean / Atmosphere / Land / Climate Pangeo Python ecosystem](https://live.usegalaxy.eu/?tool_id=interactive_tool_climate_notebook) in [Galaxy/Live](https://live.usegalaxy.eu/):
[PANGEO Python ecosystem](https://pangeo.io/): PANGEO is a community platform for Big Data geoscience;
[Community Earth System Models (CESM) development & Training platform](http://www.cesm.ucar.edu/): The Community Earth System Model (CESM) is a fully-coupled, global climate model that provides state-of-the-art computer simulations of the Earth’s past, present, and future climate states.
[ESMValTool](https://www.esmvaltool.org/): a community diagnostic and performance metrics tool for routine evaluation of Earth system models in the [Coupled Model Intercomparison Project](https://www.wcrp-climate.org/wgcm-cmip) (CMIP). The JupyterLab ESMValTool environment can be used for developing new diagnostic recipes and as a teaching platform.
This interactive tool also favors interdisciplinary exchanges and led to the introduction of [CLM-FATES](https://fates-docs.readthedocs.io/en/latest/index.html) in Galaxy. This vegetation model is open source and developments are led by [NGEE-Tropics](https://ngee-tropics.lbl.gov/#). It is initially meant to be used for studying tropical forest but a team of researchers in Norway ([EMERALD project](https://www.mn.uio.no/geo/english/research/projects/emerald/)) has been adapting it for vegetation that are typical at high latitudes (northern Europe).

<iframe title="vimeo-player" src="https://player.vimeo.com/video/437706064" width="640" height="360" frameborder="0" allowfullscreen></iframe>

A demo on how to [run CLM-FATES within Galaxy Climate JupyterLab](https://vimeo.com/439192348) has been done during the BCC2020 CoFest with about 20 attendees, many from the [FATES group](https://ngee-tropics.lbl.gov/about/team/) itself. A training material on how to run CLM-FATES within Galaxy Climate JupyterLab is under development and the team has worked on the design of a Galaxy tool for CLM-FATES during the CoFest. Publishing the CLM-FATES Galaxy tool in the Galaxy Tool Shed is obviously the next target: it will shorten the learning curve and allow field ecologists and climate scientists to effectively work together and improve the representation of vegetation in climate models.

Many more activities, discussion and collaborations have taken place during the [CoFest Core and Encore](https://bcc2020.github.io/cofest/), ending a very successful BCC2020 for the Galaxy Climate Science Community!
