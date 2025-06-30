---
title: Galaxy Training on HTS data analysis for the members of NeuroMac
date: '2022-07-04T00:00:00.000Z'
end: '2022-07-08T00:00:00.000Z'
tease: We are offering a Galaxy training on high-throughput data analysis.
hide_tease: true
tags:
  - training
contacts:
  - email: dyusuf@informatik.uni-freiburg.de
    name: Dilmurat Yusuf
location:
  name: online
supporters:
  - neuromac
hidefooter: true
subsites:
  - freiburg
main_subsite: freiburg
slug: events/2022-07-04-galaxyws-trr167
---
## Table of contents

* [Venue](#venue)
* [Program](#program)
  * [Agenda](#agenda)
* [Links](#links)
* [Preparation](#preparation)
* [Organizers](#organizers)

## Venue

Online

## Program

Every day, the training will run from **9:00-17:00 CET** (give or take, depending
on questions at the end). If the times will change, it will be announced during the training.

Schedule:

| Day        | Topics                         | Training material |
|------------|--------------------------------|-------------------|
| 04.07.2022 | RNA-Seq analysis: QC, genome mapping, gene quantification, DE | [](https://training.galaxyproject.org/training-material/topics/transcriptomics/tutorials/ref-based/tutorial.html){: .fa .fa-laptop} |
| 05.07.2022 | RNA-Seq analysis: visualization and functional profile        | [](https://training.galaxyproject.org/training-material/topics/transcriptomics/tutorials/rna-seq-viz-with-heatmap2/tutorial.html){: .fa .fa-laptop target="\_blank"} [](https://training.galaxyproject.org/training-material/topics/transcriptomics/tutorials/rna-seq-viz-with-volcanoplot/tutorial.html){: .fa .fa-laptop} |
| 06.07.2022 | Build workflow of RNA-Seq analysis |
| 07.07.2022 | Pre-processing of scRNA | [](https://training.galaxyproject.org/training-material/topics/transcriptomics/tutorials/scrna-preprocessing/tutorial.html){: .fa .fa-laptop} [](https://training.galaxyproject.org/training-material/topics/transcriptomics/tutorials/scrna-preprocessing-tenx/tutorial.html){: .fa .fa-laptop} |
| 08.07.2022 | Clustering of scRNA | [](https://training.galaxyproject.org/training-material/topics/transcriptomics/tutorials/scrna-scanpy-pbmc3k/tutorial.html){: .fa .fa-laptop} |

### Agenda

Each tutorial is divided into 3 sessions:

* **Training session** is [a zoom meeting](https://uni-freiburg.zoom.us/j/69564802900?pwd=cjZQWjFQVEYxUStCbitXRDdFdGdaQT09) where I will present the basic idea of the topic and demonstrate the data analysis on Galaxy and explain each analysis step. It is a popcorn session. Participants should relax, watch and ask questions.
* **Hands-on session** is the work-session. Participants will perform the analysis that they have learned during the training session. The training materials are provided. All the questions during the hands-on session will be answered by me in [a SIGNAL group](https://signal.group/#CjQKIH6KglJTodpulsUflQDHyEEURMaxPWfaDvbpG0hop4XJEhCmmjxMoz_8UJy0hI6SZCFP). All the training information and training material will stay online even after the training.
* **Q\&A session**: Day ends with an extended live discussion on zoom where we all can discuss any remaining questions about the topic. This session will start at 16:30.

I encourage you to start the analysis of your own data after completing the tutorials.

## Links

* Download [SIGNAL](https://signal.org/en/download/)
* [Galaxy tips and tricks](https://github.com/bgruening/galaxy-tricks)
* [Galaxy training network](http://training.galaxyproject.org)

## Preparation

Some important steps to consider before joining the training:

1. For the training, all you need is a computer with a latest web browser.
2. Galaxy interactive tours guide you stepwise through the Galaxy user interface
   and the history. They will help you to follow the Galaxy introduction, and
   ensure everyone has a basic understanding of how Galaxy works. It is recommended
   to go through the following two Galaxy interactive tours before beginning the
   training, but it is not mandatory.
   * [Galaxy UI](https://usegalaxy.eu/tours/core.galaxy_ui)
   * [History Introduction](https://usegalaxy.eu/tours/core.history)

If you have any questions, please do not hesitate to [contact me](mailto:dyusuf@informatik.uni-freiburg.de).

## Organizers

{% assign extra\_organizers =  "galaxy-freiburg|galaxy-europe" | split: "|"  %}
{% include sponsors.html supporters=extra\_organizers hidetitle=true %}
