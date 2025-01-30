---
description: "Aiding in the creation a publicly-available database of genome assemblies of over 70,000 vertebrate species"
autotoc: false
title: "The Vertebrate Genomes Project in Galaxy"
---

<p align="center">
  <img src="/images/vgp/vgp_logo.png"/>
</p>

## VGP + Galaxy

----

The [Vertebrate Genomes Project](https://vertebrategenomesproject.org/) (VGP) is an international collaborative effort by the G10K consortium to generate near error-free genome assemblies for all the [74,962 vertebrate species](https://worldanimalfoundation.org/advocate/how-many-animals-are-in-the-world/).
Using Galaxy infrastructure and public instances, this collaboration has generated new, more open methods of genome assembly and access to data:
  - Integration of the Genome Ark on public Galaxy servers.
  - A Galaxy platform with toolkits specifically tailored for [Genome assembly](https://assembly.usegalaxy.eu).
  - Multiple workflows available from the [IWC](https://github.com/galaxyproject/iwc) on US and EU servers using the most up-to-date VGP pipelines.
  - A list of publicly-available histories<sup>1</sup> for each assembly completed on Galaxy as they are generated.


## Genomes assembled so far using Galaxy platform

-----

The following continuously updated table represents genome assemblies produced so far using Galaxy workflows.

<div class="shadow-sm p-3 mb-5 bg-light rounded" align="center">
  <vega-embed spec="https://raw.githubusercontent.com/nekrut/vgp_hub_page_data/refs/heads/main/json/species_stats.vl.json"/><br>
  <small>For species repeated twice two haplotype assemblies are available. Taxonomic labels are clickable: "Class" and "Order" will bring you to Wikipedia and "Species" to GenomeArk - a central repository of VGP data. A vector graphics version of this figure is available <a href="https://raw.githubusercontent.com/nekrut/vgp_hub_page_data/main/svg/species_stats.svg">here</a>. | <tt>Size</tt> = estimated genome size; Het = estimated heterozygosity, <tt>Repeat</tt> = estimated repeat content; <tt>Contig NG50</tt> and <tt>Scaffold NG50</tt> = <a href="https://en.wikipedia.org/wiki/N50,_L50,_and_related_statistics#NG50">NG50</a> statistics for contigs and scaffolds, respectively; <tt>Gaps</tt> = total length of gaps in scaffolds.</small>
</div>


## I want to assemble a genome!

------

The whole point of bringing VGP assembly workflows to Galaxy is to give *you* the ability to produce high quality assemblies for free. 

### Prerequisites

To produce high quality assemblies you need to start with high quality high coverage (the median coverage for species listed in the table above is 33) [HiFi](https://www.pacb.com/technology/hifi-sequencing/) sequencing data. The following "tiers" of sequencing data are supported by our workflows. Supplementing HiFi data with parental reads, [HiC](https://en.wikipedia.org/wiki/Hi-C_(genomic_analysis_technique)) datasets, and/or [BioNano](https://academic.oup.com/nar/article/38/18/e177/1069400?login=false) optical maps will produce increasingly complete assemblies:

|  Tier<sup>1</sup> | Assembly quality  |
|------|---------------|
| HiFi| The minimum requirement |
| HiFi + HiC| Better continuity |
| HiFi + BioNano | Better continuity | 
| HiFi + HiC + BioNano | Even better continuity |
| HiFi + parental Illumina data| Better haplotype resolution |
| HiFi + parental Illumina data + HiC| Better haplotype resolution and improved continuity | 
| HiFi + parental Illumina + BioNano | Better haplotype resolution and improved continuity |
| HiFi + parental Illumina data + HiC + BioNano | Better haplotype resolution and ultimate continuity |
<small><sup>1</sup>For details on individual analysis trajectories visit [workflows](/projects/vgp/workflows/) page</small>

### Workflows

Once you have the required data you can upload the datasets into European, American, or Australian Galaxy instances and begin assembly as described in our [workflows](/projects/vgp/workflows/) page.

<a href="/projects/vgp/workflows/" class="btn btn-danger">Explore Workflows</a>

## Where is existing VGP data?

-----

All initial data, intermediate datasets, and final assembles are available from the [GenomeArk](https://vgp.github.io/genomeark/) platform. Galaxy has integrated the Genome Ark server as a remote data repository on all public servers. 

<a href="https://vgp.github.io/genomeark/" class="btn btn-primary" target="_blank">Explore GenomeArk</a>

## Who pays for computation?

------

The computational resources required for assembly are supported by **public** computational infrastructure. In turn, this computational infrastructure is brought you by:

- **EU** - [de.NBI](https://www.denbi.de/), [Uni-Freiburg](https://uni-freiburg.de), [EOSC](https://eosc.eu) and [ELIXIR](https://elixir-europe.org/)
- **US** - [ACCESS-CI](https://access-ci.org/), [TACC](https://www.tacc.utexas.edu/), [Jetstream2](https://jetstream-cloud.org/) (additional funding is provided by NSF and NIH)
- **Australia** - [Australian BioCommons](https://www.biocommons.org.au/), [the University of Melbourne](https://www.unimelb.edu.au/), [Bioplatforms Australia](https://bioplatforms.com/) and [NCRIS](https://www.education.gov.au/ncris). See [full list of partners on Galaxy Australia](https://site.usegalaxy.org.au/about#operational-partners).


