---
title: MicroGalaxy
components: true
---

<slot name="/bare/eu/usegalaxy/notices" />

![microGalaxy logo](https://microgalaxy.usegalaxy.eu/assets/media/microgalaxy-logo.png)

# Welcome to microGalaxy!


<br />
Whether you are analysing microbiome samples or bacterial isolates, long reads or short, shotgun or 16S, genomics,  transcriptomics, proteomics or metabolomics, multiomics or integrative analysis **this is the place to be**!


<br />
# Content




# Join the μGalaxy Community

Anybody interested in microbiology in Galaxy is welcome to join our microGalaxy interest group! <strong>Everybody is Welcome!</strong>

- Join the Discussion! [Gitter Chat](https://gitter.im/galaxyproject/microGalaxy) (also available via [Matrix](https://matrix.to/#/#galaxyproject_microGalaxy:gitter.im))
- Join our quarterly meetings! [Agenda and minutes](https://docs.google.com/document/d/13VjcUjStuIp7bK29e74k8Nqb7N4lmVcg1ioArEWr254/edit#)


# Training

Want to learn even more about microbial analysis? You can check out our various microbial dedicated training page within the wider Galaxy Training Network.

* <Icon name="book-open" /> [Metagenomic learning paths](https://training.galaxyproject.org/training-material/learning-pathways/metagenomics.html\)
* <Icon name="book-open" /> [Metabolomics](https://training.galaxyproject.org/training-material/topics/metabolomics/)
* <Icon name="book-open" /> [Genome Annotation](https://training.galaxyproject.org/training-material/topics/genome-annotation/)
* <Icon name="book-open" /> [Tuberculosis evolution](https://training.galaxyproject.org/training-material/topics/evolution/)
* <Icon name="book-open" /> [Microbial Variant Calling](https://training.galaxyproject.org/training-material/topics/variant-analysis/)

## Galaxy Training Network Tutorials tagged with **#microGalaxy**

<!-- tag all trainings with microGalaxy and update the link -->
<iframe src="https://training.galaxyproject.org/training-material/tags/microgalaxy/embed.html" height="600px" width="100%" class="gtn-embed" frameborder="0"></iframe>

# Workflows

Below are a list of curated Galaxy workflows for different kinds of microbial analysis. Many of these are accompanied by comprehensive [GTN Tutorials](https://training.galaxyproject.org) that will guide you through the analysis step by step.
Want to include your workflow here? All you need to do is to make your workflow publicly available via `usegalaxy.eu/.org/.org.au.` (or any of the subdomains) and tag the workflow with **#microGalaxy**.

## MicroGalaxy Workflows

<iframe src="https://training.galaxyproject.org/training-material/workflows/embed.html?query=microgalaxy" height="600px" width="100%" class="gtn-embed" frameborder="0"></iframe>

# Tools
More than **200 tools** are available for microbiome data analysis in this custom Galaxy instance, major tools to highlight are:

- **General tools**
    - **Data retrieval**: EBISearch, ENASearch, SRA Tools
    - **BAM/SAM file manipulation**: SAM tools
    - **BIOM file manipulation**: BIOM-Format tools
- **Genomics tools**
    - **Quality control**: FastQC, PRINSEQ, Cutadapt, fastp, Trimmomatic, MultiQC
    - **Clustering**: CD-Hit
    - **Sorting and prediction**: SortMeRNA, FragGeneScan
    - **Mapping**: BWA, Bowtie
    - **Similarity search**: NCBI Blast+, Diamond
    - **Alignment**: HMMER3
- **Microbiota dedicated tools**
    - **Microbial**: Scoary, Prokka, Roary
    - **Metagenomics data manipulation**: VSearch, Nonpareil, DADA2
    - **Assembly**: MEGAHIT, metaSPAdes, metaQUAST, VALET, Bandage, MaxBin2
    - **Metataxonomic sequence analysis**: Mothur, QIIME, Vegan
    - **Taxonomy assignation**: MetaPhlAn, Kraken, CAT/BAT
    - **Metabolism assignation**: HUMAnN, PICRUST, InterProScan
    - **Visualization**: Export2graphlan, GraPhlAn, KRONA
    - **Metaproteomics**: MaxQuant, SearchGUI, PeptideShaker, Unipept

## Curated community tool list

The complete curated list of all the tools is weekly updated and available here:

<iframe
  id="inlineFrameExample"
  title="Microbial related tools"
  width="100%"
  height="600"
  frameBorder="0"
  src="https://galaxyproject.github.io/galaxy_codex/microgalaxy/">
</iframe>

Want to know how this list is created and maintained have a look at the dedicated [GitHub project](https://github.com/galaxyproject/galaxy_codex). If tools are missing or information is not up-to-date in the list, please help us! Contact Saskia, [Paul](mailto:zierep@informatik.uni-freiburg.de) or [Bérénice](mailto:berenice.batut@gmail.com) about it.

# Projects

Below is a list of projects that members of this community are involved in (feel free to add your own!)

## Projects / Showcases

Below is a list of projects involving members of this community:

| Project | Description | Techniques | Sequencing | Analyses | People involved | Funding | Status |
|---------|-------------|------------|------------|----------|-----------------|---------|--------|
| [IRIDA](https://irida.ca/) | The Integrated Rapid Infectious Disease Analysis | | | | Aaron Petkau
Foodborne pathogen detection | | Metagenomics | Long reads | | Bérénice Batut, Engy Nasr | EOSC-Life for 2022 | Ongoing
| [BeerDEcoded](https://streetscience.community/projects/beerdecoded/) | General public education project | Metagenomics | Long reads |   | Bérénice Batut, [Street Science Community](https://streetscience.community/) | Mozilla, de.NBI | Ongoing
| [DNAnalyzer](http://streetscience.community/DNAnalyzer/) | Online & interactive game on DNA data analysis | Metagenomics | Long reads | | Bérénice Batut, [Street Science Community](https://streetscience.community/) | University of Freiburg | Ongoing
| Cloud data | | Metagenomics, metatranscriptomics | Short reads | Taxonomy profiling, Functional profiling, Assembly, MAGs builiding | Bérénice Batut, Engy Nasr | | Ongoing
| ASaiM | | Metagenomics, metatranscriptomics | Short reads | Taxonomy profiling, Functional profiling | Bérénice Batut, Saskia Hilteman, Pratik Jagtap, Subina Mehta, etc | | Finished?
| [Mycobacterium tuberculosis NGS made easy: data](https://gallantries.github.io/video-library/modules/mtb-analysis) | Series of modules containing recorded videos by experts and tutorials | | Illumina (wanting to expand to nanopore) | Mapping & Variant calling, Molecular epidemiology of TB using NGS, Phylogenetics for studying TB evolution and epidemiology | Daniela Brites, Peter van Heusden, Galo A. Goig, Christoph Stritt | Initially funded trough TB projects of capacity building; currently no funding | Ready to be used  but also working on improvements


## Partners

| Partners | Description | People involved |
|----------|-------------|-----------------|
| [Seq4AMR](https://www.jpiamr.eu/projects/seq4amr/) | [JPIAMR]() Network for Integrating Microbial Sequencing and Platforms for Antimicrobial Resistance | Saskia Hilteman
| [ELIXIR Emerging Microbiome Community](https://elixir-europe.org/communities/marine-metagenomics) | | Bérénice Batut
| µbioinfo Slack | | [microbial-bioinfo](https://microbial-bioinfo.slack.com)


If you would like to know more about any of these projects or get involved, please contact us on the [microGalaxy Gitter channel](https://gitter.im/galaxyproject/microGalaxy).

# Resources

Resource | Description | Links
--- | --- | ---
![](https://www.jpiamr.eu/app/uploads/2021/09/JPIAMR-logo-no-tagline.png) | JPIAMR: Global Coordination of Antimicrobial Resistance Research | [Website](https://www.jpiamr.eu/)


<!--
# Acknowledgements

# References

{% bibliography --cited --prefix index-metagenomics --group_by none %}
-->
