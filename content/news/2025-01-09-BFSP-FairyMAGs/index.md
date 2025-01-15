---
title: 'ELIXIR Funding for FAIRyMAGs: Optimising Metagenomics Assembled Genomes building'
date: '2025-01-09'
tease: "FAIRyMAGs: Optimising Metagenomics Assembled Genomes building: workflow finalisation, training material development, real data evaluation and resource allocation tool creation"
hide_tease: false
authors: Paul Zierep, Bérénice Batut
subsites: [eu,fr,all,global]
---


## Elixir Commissioned Service Funding


We are happy to announce that the Galaxy-based project FAIRyMAGs was selected as part of the 
to be funded as Commission service in the [ELIXIR 2024–28 Programme's Biodiversity, food security and pathogens Science Tier](https://elixir-europe.org/internal-projects/commissioned-services/science/biodiversity-security-pathogens). The project will be funded for the next two years, starting in January 2025.

## FAIRyMAGs research goal

Metagenomics Assembled Genomes (MAGs) are crucial for understanding biodiversity, enhancing food security and combating pathogens by providing insight on uncultured and unexplored genomes. This proposal outlines a comprehensive project aimed at advancing metagenomics research through the advancement, optimisation, evaluation and dissemination of robust FAIR workflows for building MAGs. 

Leveraging the Galaxy platform, our primary objectives include finalising a user-friendly state-of-the-art Galaxy workflow tailored for MAG construction, and ensuring its accessibility and reusability through integration with WorkflowHub. 

<figure class="figure">
  <g-image src="./Flowchart_Individual_Assembly.png" class="figure-img img-fluid rounded" />
  <figcaption class="figure-caption">Current state of the MAGs building Workflow</figcaption>
</figure>

The current state of the workflow is [publicly accessible on usegalaxy.eu](https://usegalaxy.eu/u/paulzierep/w/mags-individual-workflow). An example analysis, using the Marine Benchmark Dataset from the CAMI II challenge, can be found in a corresponding [Galaxy history](https://usegalaxy.eu/u/paulzierep/h/mags-individual-workflow-cami-ii-marine-dataset). This analysis produced 65 MAGs and a detailed MultiQC report, which can be viewed under the "bin-report" tag.  

To support user adoption and proficiency, we will create FAIR educational materials hosted on the Galaxy Training Network (GTN), empowering researchers with the skills necessary to use the workflow effectively. 
The efficacy of the developed workflow will be rigorously evaluated by analysing MAGs generated from simulated and real-world data-spanning diverse environments: 

* Atmosphere
* Marine 
* Cow gut microbiomes 

This evaluation will provide valuable insights into the workflow's performance and its applicability across different sample types, complexities and ecosystems.

We will also investigate the computational resources required for executing the assembly step of the workflow using data provided by several Galaxy servers and the MGnify team on various input datasets. The aim would be to optimise resource allocation to ensure efficient and cost-effective MAGs construction. A novel tool will be developed to facilitate this process, allowing researchers to accurately estimate and allocate resources for each step of the assembly pipeline. 

<figure class="figure">
  <g-image src="./ML_tool.png" class="figure-img img-fluid rounded" />
  <figcaption class="figure-caption">Idea of the resource allocation prediction tool.</figcaption>
</figure>

By addressing these objectives, our project aims to accelerate metagenomics research by providing researchers with a comprehensive and accessible framework for MAGs construction. This framework will not only streamline the workflow for building MAGs, but also facilitate reproducibility, collaboration, and innovation within the ELIXIR Microbiome Community.

FAIRyMAGs is led by **Paul Zierep** and **Bérénice Batut** in collaboration with four ELIXIR nodes:

* ELIXIR France (Bérénice Batut)
* ELIXIR Germany (Paul Zierep)
* ELIXIR Italy (Giuseppe Defazio and Bruno Fosso)
* EMBL-EBI (Martin Beracochea, Santiago Sanchez)

## Upcoming Hackathon in Freiburg

As part of the project we are also organizing a Hackathon in Freiburg this summer to discuss workflow improvements, benchmarking, and training development. We openly invite the community to join this Hackathon and contribute their ideas. Dates will be announced in due time. 

If you are interested please contact [Paul](mailto:paul.zierep@gmail.com)
