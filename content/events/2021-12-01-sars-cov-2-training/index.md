---
title: SARS-CoV-2 Data Analysis and Monitoring with Galaxy
date: '2021-12-01'
end: '2021-12-01'
tags: [training, COVID-19, talk, workshop]
location:
  name: online
subsites: [eu, pasteur, freiburg, erasmusmc, elixir-it, belgium, genouest]
main_subsite: eu
contributions:
  funding:
    - deNBI
    - by-covid
    - elixir-converge
    - gallantries

components: true
---

<br />

The goal of this workshop is to enable groups doing SARS-CoV-2 sequencing using amplicon methods (like ARTICv3, ARTICv4, NEBNext VarSkip, Midnight, ...) to learn how to use pre-built workflows to quickly generate consensus sequences. After the workshop, participants will be able to upload viral sequencing data from Illumina and ONT sequencers, call variants, create consensus sequences appropriate for submission to public databases, and produce quality and lineage reports.

It will be a 1-day event introducing scalable and reproducible SARS-CoV-2 data analysis with Galaxy. People who are new to Galaxy can use existing Galaxy training materials to prepare ahead of the workshop. During the workshop, there will be live support in chat and live Q&A sessions, in which experts from NEB and the Galaxy community will answer questions.

<br />

<div align="center" width="100%">
    <a href="https://covid19.galaxyproject.org/">
        <button type="button" class="btn btn-primary btn-lg">More Galaxy COVID projects!</button>
    </a><br /><br />
</div>

<br /><br />

<div class="row">
<div class="col-md-7">
<br /><br /><br /><br />
<ul>
<li><strong>WHEN</strong>: December 1, 2021</li>
<li><strong>WHO</strong>: Open for everybody, but the target audience is <strong>clinicians</strong> and <strong>researchers</strong> that deal with SARS-CoV-2 sequencing data.</li>
<li><strong>COST</strong>: Free.</li>
<li><strong>FORMAT</strong>: Virtual and asynchronous. All training <strong>sessions will be pre-recorded and provided in advance</strong>.</li>
<li><strong>SUPPORT</strong>: <strong>Live support in chat</strong> (Slack Channel), in which experts will answer questions on a peer-to-peer basis; <strong>Real-Time Q&amp;A sessions</strong>.</li>
<li><strong>INFRASTRUCTURE</strong>: <a href="https://usegalaxy.eu" target="_blank">European Galaxy server</a> and the <a href="https://training.galaxyproject.org" target="_blank">Galaxy Training Material</a>. Both will stay accessible and open after the training.</li>
<li><strong>CONTACT</strong>: <a href="mailto:contact@usegalaxy.eu"><strong>Get in touch</strong></a> if you have questions.</li>
</ul>
</div>
<div class="col-md-5">
<img src="/assets/media/2021-12-01-sars-cov-2-data-analysis-training.png" alt="sars-cov-2-workshop" />
</div>
</div>

<br />

<a href="https://docs.google.com/forms/d/e/1FAIpQLScRcalYlC85-zQCOB1Vqc2lXGpZX7XqPdq-C-n5AVVwDyp5iQ/viewform?usp=sf_link" class="btn btn-primary" style="color: white; border-color: #5da996; width: 100%; background-color: #5da996;"><strong>Registration is now open</strong></a>

<br />

# Program & Material

This workshop has both live and virtual/asynchronous components. Training sessions are pre-recorded with most materials provided in advance in the program below.

Whenever you're ready to get started, you can access training material by clicking in the program on the different icons:
- <Icon name="presentation" /> for **slide deck** for a lecture
- <Icon name="laptop" /> for **hands-on tutorial** (on the <a href="https://training.galaxyproject.org/" target="_blank">Galaxy Training Material</a>)
- <Icon name="video" /> for **video** (accompanying a lecture, a tutorial or a demo)
- <Icon name="list" /> for **shared Galaxy history** (on the <a href="https://usegalaxy.eu" target="_blank">European Galaxy server</a>)


## Ahead of the Workshop - Introduction to Galaxy

Topic | Speaker | Material | Description | Duration
|--- | --- | --- | --- | ---|
A very short introduction to Galaxy | Anton Nekrutenko | <a href="https://training.galaxyproject.org/training-material/topics/introduction/tutorials/galaxy-intro-short/slides.html?utm_source=usegalaxyeu&utm_medium=website&utm_campaign=covid2021" target="_blank"><Icon name="presentation" /></a> / <a href="https://youtu.be/VZoz3k5EehI" target="_blank"><Icon name="video" /></a> | __Lecture:__ *This video will introduce the Galaxy data analysis platform, and give a short demo on how to use it.* | 10m
Galaxy 101 | Anton Nekrutenko |  <a href="https://training.galaxyproject.org/training-material/topics/introduction/tutorials/galaxy-intro-101/tutorial.html" target="_blank"><Icon name="laptop" /></a> / <a href="https://youtu.be/D5HgJWdfOWw" target="_blank"><Icon name="video" /></a> <br /> <a href="https://usegalaxy.eu/u/wolfgang-maier/h/galaxy-101" target="_blank"><Icon name="list" /></a> |  __Hands-on:__ *This tutorial will introduce you to Galaxy. You will familiarize yourself with tools, workflows and histories. Those skills will be needed the next days.* | 1h / 13m
NGS data logistics | Anton Nekrutenko | <a href="https://training.galaxyproject.org/training-material//topics/introduction/tutorials/galaxy-intro-ngs-data-managment/tutorial.html" target="_blank"><Icon name="laptop" /></a> / <a href="https://youtu.be/9mIL0tIfZ_o" target="_blank"><Icon name="video" /></a> <br /> <a href="https://usegalaxy.eu/u/wolfgang-maier/h/ngs-data-logistics" target="_blank"><Icon name="list" /></a> |  __Hands-on:__ *Learn how to manipulate and process NGS data data derived from patients infected with SARS-CoV-2. Get familiar with quality control, mapping and NGS filetypes.* | 1h 30m / 12m
Quality control of reads | Florian Heyl | <a href="https://training.galaxyproject.org/training-material/topics/sequence-analysis/tutorials/quality-control/slides.html?utm_source=usegalaxyeu&utm_medium=website&utm_campaign=covid2021" target="_blank"><Icon name="presentation" /></a> / <a href="https://youtu.be/BWonTPS4zB8" target="_blank"><Icon name="video" /></a> | __Lecture:__ *This lecture goes over the concepts involved in assessing the quality of your sequencing data.* | 38m |
Quality control of reads | Florian Heyl | <a href="https://training.galaxyproject.org/topics/sequence-analysis/tutorials/quality-control/tutorial.html?utm_source=usegalaxyeu&utm_medium=website&utm_campaign=covid2021" target="_blank"><Icon name="laptop" /></a> / <a href="https://youtu.be/QJRlX2hWDKM" target="_blank"><Icon name="video" /></a> | __Hands-on:__ *In this tutorial you will get some hand-on experience performing a quality assessment on sequencing data.* | 1h 30m / 1h 10m
Mapping of reads | Peter van Heusden | <a href="https://training.galaxyproject.org/training-material/topics/sequence-analysis/tutorials/mapping/slides.html?utm_source=usegalaxyeu&utm_medium=website&utm_campaign=covid2021" target="_blank"><Icon name="presentation" /></a> / <a href="https://youtu.be/7FhHb8EV3EU" target="_blank"><Icon name="video" /></a> | __Lecture:__ *This lecture covers the basic concepts involved in mapping sequencing reads to a reference genome.* | 10m
Mapping of reads | Peter van Heusden | <a href="https://training.galaxyproject.org/training-material/topics/sequence-analysis/tutorials/mapping/tutorial.html?utm_source=usegalaxyeu&utm_medium=website&utm_campaign=covid2021" target="_blank"><Icon name="laptop" /></a> / <a href="https://youtu.be/1wm-62E2NkY" target="_blank"><Icon name="video" /></a> <br /> <a href="https://usegalaxy.eu/u/pvanheus/h/mapping-tutorial" target="_blank"><Icon name="list" /></a> | __Hands-on:__ *In this tutorial you will map sequencing data to a reference genome, and explore the mapped reads in a genome browser.* | 1h / 20m
Using dataset collections | Anton Nekrutenko | <a href="https://training.galaxyproject.org/training-material/topics/galaxy-interface/tutorials/collections/tutorial.html?utm_source=usegalaxyeu&utm_medium=website&utm_campaign=covid2021" target="_blank"><Icon name="laptop" /></a> / <a href="https://youtu.be/uZUt9XIHUQo" target="_blank"><Icon name="video" /></a> <br /> <a href="https://usegalaxy.eu/u/bgruening/h/using-dataset-collections---tutorial" target="_blank"><Icon name="list" /></a> | __Hands-on:__ *How to manipulate large numbers of datasets at once? This will be needed to process 100 of SARS-CoV-2 samples in one go.* | 30m / 12m
Data cleaning workflow | Wolfgang Maier | <a href="https://training.galaxyproject.org/training-material/topics/sequence-analysis/tutorials/human-reads-removal/tutorial.html" target="_blank"><Icon name="laptop" /></a> <br /> <a href="https://usegalaxy.eu/u/wolfgang-maier/h/removal-of-human-reads-from-sars-cov-2-sequencing-data" target="_blank"><Icon name="list" /></a> | __Hands-on:__ *As a first exercise in actual SARS-CoV-2 data analysis with Galaxy, this tutorial will let you perform the steps necessary to remove contaminating human reads from sequencing data of SARS-CoV-2 isolates.* | 1h


## Workshop Day (2021-12-01) - SARS-CoV-2 Data Analysis on Public Datasets

Topic | Speaker | Material | Description | Duration
|--- | --- | --- | ---|
Q & A | All experts | <a href="https://docs.google.com/document/d/1SIcl7BPDGCV0D-AA_S008qVYaH8id4_ibD6iTVx6gYY/edit?usp=sharing" target="_blank"><Icon name="info" /></a> Info & [Zoom link](https://us02web.zoom.us/j/89522833887?pwd=QmdKN0dNbXVxMW0rank5V0dtRktvdz09) | **Real-Time Q&A session (9 am CET)** | 1h
Galaxy for SARS-CoV-2 genome surveillance projects | Wolfgang Maier | <a href="https://docs.google.com/presentation/d/17m2ztR1VBqKE470EyAhJqoiXgnX5fgX4pW1Nstxhklk/edit?usp=sharing" target="_blank"><Icon name="presentation" /></a> / <a href="https://www.youtube.com/watch?v=luxFraFJTc4" target="_blank"><Icon name="video" /></a> | __Lecture:__ *Get an overview of the workshop: production-ready Galaxy workflows for SARS-CoV-2 sequencing data, tools you should know to automate workflow execution, and how you combine all of it to turn Galaxy into a platform for genome-surveillance.* | 14m
Variant calling, reporting, consensus building (with Galaxy GUI) | Wolfgang Maier | <a href="https://training.galaxyproject.org/training-material/topics/variant-analysis/tutorials/sars-cov-2-variant-discovery/tutorial.html?utm_source=usegalaxyeu&utm_medium=website&utm_campaign=covid2021" target="_blank"><Icon name="laptop" /></a> / <a href="https://www.youtube.com/watch?v=vnFQ2fR_fzw" target="_blank"><Icon name="video" /></a> <br /> <a href="https://usegalaxy.eu/u/wolfgang-maier/h/sars-cov-2-variant-analysis-demo---part-1" target="_blank"><Icon name="list" /> Part I</a> / <a href="https://usegalaxy.eu/u/wolfgang-maier/h/sars-cov-2-variant-analysis-demo---complete" target="_blank"><Icon name="list" /> Complete</a> | __Hands-on:__ *Illumina or ONT, ampliconic or WGS data? Learn how to combine the right set of Galaxy workflows to analyze the type of SARS-CoV-2 sequencing data of your choice.* | 3h / 1h 30m
Q & A | All experts | <a href="https://docs.google.com/document/d/1SIcl7BPDGCV0D-AA_S008qVYaH8id4_ibD6iTVx6gYY/edit?usp=sharing" target="_blank"><Icon name="info" /></a> Info & [Zoom link](https://us02web.zoom.us/j/82592068924?pwd=TjR0RWg0ZTgycjgvSjN4cWF0SUloZz09) | **Real-Time Q&A session (4 pm CET)** | 1h


## After the Workshop - Scale up, Automation and Database Submission

Topic | Speaker | Material | Description | Duration
|--- | --- | --- | ---|
Accelerating Research Through Data Sharing | Carla Cummins | <a href="https://drive.google.com/file/d/12yPW6ku8KQeKFUYs9VBaDsP7ilaMk5XM/preview" target="_blank"><Icon name="video" /></a> | __Lecture:__ *Accelerating Research Through Data Sharing* | 13m
Variant calling, reporting, consensus building (with Galaxy CLI) | Simon Bray | <a href="https://training.galaxyproject.org/training-material//topics/galaxy-interface/tutorials/workflow-automation/tutorial.html?utm_source=usegalaxyeu&utm_medium=website&utm_campaign=covid2021" target="_blank"><Icon name="laptop" /></a> / <a href="https://www.youtube.com/watch?v=o39QjVnLG68" target="_blank"><Icon name="video" /></a> | __Hands-on:__ *Learn how to use the command line to upload your SARS-CoV-2 data to a Galaxy-server and launch workflows for its analysis. Note: This first step towards automation requires the command line tool [Planemo](https://planemo.readthedocs.io/en/latest/) for interacting with Galaxy if you want to follow along.* | 2h / 30m
The usegalaxy.eu SARS-CoV-2 bot in action | Wolfgang Maier | <a href="https://www.youtube.com/watch?v=IRxja8bZ-MU" target="_blank"><Icon name="video" /></a> | __Demo:__ *See in this demo how, on usegalaxy.\*, we've used Planemo and Bioblend to build and operate an automated SARS-CoV-2 genome surveillance system based on the Galaxy workflows for variant calling, consensus building and reporting.* | 40m
Upload data to ENA | Miguel Roncoroni | <a href="https://training.galaxyproject.org/training-material/topics/galaxy-interface/tutorials/upload-data-to-ena/slides.html#1" target="_blank"><Icon name="presentation" /></a> / <a href="https://training.galaxyproject.org/training-material/topics/galaxy-interface/tutorials/upload-data-to-ena/tutorial.html" target="_blank"><Icon name="laptop" /></a> / <a href="https://www.youtube.com/watch?v=sEjhWAtmAn4" target="_blank"><Icon name="video" /></a> | __Demo:__ *Learn how to submit your sequencing data to the ENA directly from Galaxy.* | 1h / 10m
Upload data to a local datastore | Wolfgang Maier | <a href="https://www.youtube.com/watch?v=-5U0sINjoig" target="_blank"><Icon name="video" /></a> | __Demo:__ *So you've used Galaxy workflows to analyze your SARS-CoV-2 samples? Learn in this tutorial how to export results to your favorite datastore.* | 10m
Introduction to viral Beacon | Babita Singh | <a href="https://youtu.be/R_4yUMPk7eY " target="_blank"><Icon name="video" /></a> / <a href="https://drive.google.com/file/d/1yCHOi1EGKpkH-3XpKTKNKpFjwYAWKSVx/preview" target="_blank"><Icon name="presentation" /></a> | __Demo:__ *How to visualize tens of thousands of SARS-CoV-2 analysis results? Learn about the Viral Beacon project's solution!* | 24m
Using and Customising ObservableHQ | Sergei Pond | <a href="https://www.youtube.com/watch?v=oeqPestqdAw" target="_blank"><Icon name="video" /></a> | __Demo:__ *In this demo you will get to know the ObservableHQ platform for interactive data visualization. You will see how covid19.galaxyproject.org uses it to build a dashboard for their SARS-CoV-2 analysis efforts and will learn how to customize this solution to fit your own purposes.* | 15m


## Optional extra training

Topic | Speaker | Material | Description | Duration
|--- | --- | --- | ---|
SRA Aligned Read Formats to Speed Up SARS-CoV-2 data Analysis | Jonathan Trow | <a href="https://training.galaxyproject.org/training-material/topics/galaxy-interface/tutorials/ncbi-sarf/slides.html?utm_source=usegalaxyeu&utm_medium=website&utm_campaign=covid2021" target="_blank"><Icon name="presentation" /></a> / <a href="https://www.youtube.com/watch?v=siLP71B9gm4" target="_blank"><Icon name="video" /></a> | __Lecture:__ *This lecture will introduce the SRA Aligned Read format available in the cloud from SRA, as well as some accompanying metadata that can help you search and filter the data. This sessions is aimed specifically at SARS-CoV-2 runs in SRA.* | 15m
SRA Aligned Read Formats to Speed Up SARS-CoV-2 data Analysis  | Jonathan Trow | <a href="https://training.galaxyproject.org/training-material/topics/galaxy-interface/tutorials/ncbi-sarf/tutorial.html?utm_source=usegalaxyeu&utm_medium=website&utm_campaign=covid2021" target="_blank"><Icon name="laptop" /></a> / <a href="https://www.youtube.com/watch?v=ogu-NBTP-DM" target="_blank"><Icon name="video" /></a> | __Hands-on:__ *This tutorials will walk you through accessing and using SRA Aligned read format in Galaxy.* | 40m
Assembly: Unicycler assembly of SARS-CoV-2 genome | Cristóbal Gallardo | <a href="https://training.galaxyproject.org/training-material/topics/assembly/tutorials/assembly-with-preprocessing/slides.html?utm_source=usegalaxyeu&utm_medium=website&utm_campaign=covid2021" target="_blank"><Icon name="laptop" /></a>  | __Lecture:__ *Unicycler assembly of SARS-CoV-2 genome with preprocessing to remove human genome reads* |
Assembly: Unicycler assembly of SARS-CoV-2 genome | Cristóbal Gallardo | <a href="https://training.galaxyproject.org/training-material/topics/assembly/tutorials/assembly-with-preprocessing/tutorial.html?utm_source=usegalaxyeu&utm_medium=website&utm_campaign=covid2021" target="_blank"><Icon name="laptop" /></a> / <a href="https://www.youtube.com/watch?v=jNFLYhjgJPs" target="_blank"><Icon name="video" /></a> | __Hands-on:__ *Unicycler assembly of SARS-CoV-2 genome with preprocessing to remove human genome reads* | 25m
Pandemics Research using Mass Spectrometry | Timothy J. Griffin, Subina Mehta, Andrew Rajczewski, Pratik Jagtap | <a href="https://drive.google.com/file/d/1anBPmGRWEVp9pBLZ_JInWV7iWrBpyCDs/view?usp=sharing?utm_source=smorgasbord&utm_medium=website&utm_campaign=gcc2021" target="_blank"><Icon name="laptop" /></a> / <a href="https://www.youtube.com/watch?v=CI35gTmZoqM" target="_blank"><Icon name="video" /></a> | __Demo:__ *Learn about pandemic research using mass spectrometry.* | 35m
Scripting Galaxy using the API and BioBlend | Nicola Soranzo | <a href="https://training.galaxyproject.org/training-material/topics/dev/tutorials/bioblend-api/slides.html?utm_source=usegalaxyeu&utm_medium=website&utm_campaign=covid2021" target="_blank"><Icon name="presentation" /></a> | __Lecture:__ *Learn how to control Galaxy via a Python API.* |
What you can do with SARS-COV-2 data: Case studies | Andrew Page | <a href="https://www.youtube.com/watch?v=R4EoTEiAQNE" target="_blank"><Icon name="video" /></a> | __Lecture:__ *Learn what you can do with SARS-CoV-2 data.* | 37m


# Logistics

## Content delivery

This is a global workshop delivered asynchronously. In practice, this means that you will have training materials available to explore them at **your own pace**, without any time constraints:

- **Lectures**: pre-recorded videos (<Icon name="video" />) with the theoretical explanation of the lesson, supported by slide decks (<Icon name="presentation" />).
- **Hands-on tutorials** (<Icon name="laptop" />): a step-by-step explanation, including all the required information, to perform a data analysis, often available also as pre-recorded video (<Icon name="video" />).

    Most of the tutorials are developed by the <a href="http://training.galaxyproject.org/" target="_blank">Galaxy Training Network</a>. A feedback form is available at the bottom of each tutorial page. Please fill it out, it helps us to value and improve the tutorials.

- **Histories**: shared Galaxy history (<Icon name="list" />), on the <a href="https://usegalaxy.eu" target="_blank">European Galaxy server</a>, with all that you need to reproduce what is shown in the hands-on part.
- **Demo**: pre-recorded videos (<Icon name="video" />) demonstrating a technical point or a nice feature.

Most of the material is available already, and they will all stay **available after the workshop**. Most of the material have been developed by a community of people via the <a href="https://training.galaxyproject.org/" target="_blank">Galaxy Training Network</a>. Some videos were recorded for different previous events, e.g. <a href="https://shiltemann.github.io/global-galaxy-course/" target="_blank">GTN Smörgåsbord</a> or <a href="https://galaxyproject.org/events/gcc2021/training/" target="_blank">GCC2021 Training Week</a>, and the captions were manually-curated by several community members.

Whenever you're ready to get started, you can access the material by clicking on the different icons in the program!

## Following the tutorials - Technical requirements

Some of you have asked about the technical requirements. You don't need a specific operating system or software installed, all you need is a browser and internet connection.

To run the tutorials, you will need a **Galaxy account**. We recommend you to:

- Register and use <a href="https://usegalaxy.eu" target="_blank">European Galaxy server</a>.

    You will receive an email to confirm your account before you can start using Galaxy.
- Join the [training event group](https://usegalaxy.eu/join-training/sars_cov2_2021/), it will make your jobs go faster!

## Support & Communication channels

Should you have any questions, the instructors will be available in chat. We will use the Slack space of the Galaxy Training Network. Depending on your location you might need to use a VPN, so **please make sure that you can join Slack before the workshop**.

Once you are in, you will see different channels (#general #random, #social), pass by and say hi to your colleagues! 

When asking a question:
- Ask in the appropriate channel.
- Use threads.
- Say which server you're using.
- Share all of the details (What did the tool say? What was the error? Did you see more information in the bug-report icon?).

During the workshop, the instructors will be there to reply to your questions. 

## Certificates

If you need a certificate, you can request it at the end of the workshop. Please make sure to keep all the work, stay active in the discussions and fill out the [final survey](https://forms.gle/m8NRg7WrgGwnCEGQA).

# Code of Conduct

Everyone is expected to abide by the [Code of Conduct (CoC)](https://galaxyproject.org/community/coc/) to make this environment welcoming and friendly for everyone.

# Instructors & helpers

Name | Location
|--- | ---|
Wolfgang Maier | Germany
Bérénice Batut | Germany
Beatriz Serrano-Solano | Germany
Engy Nasr | Germany
Simon Bray | Germany
Florian Heyl | Germany
Björn Grüning | Germany
Anton Nekrutenko | USA
Andrew Page | UK
Carla Cummins | UK
Peter van Heusden | South Africa
Erik Hjerde | Norway
Annbjørg Barbakken | Norway
Kjell Petersen | Norway
Steven Morgan | Australia
Gareth Price | Australia
Anna Syme | Australia
Igor Makunin | Australia
Valentine Murigneux | Australia
Michael Thang | Australia

