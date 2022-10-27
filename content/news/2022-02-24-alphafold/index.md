---
title: AlphaFold now available in Galaxy
date: '2022-02-24'
tease: It seems the whole world is talking about AlphaFold,
  the AI system that predicts a protein’s 3D structure from its amino acid sequence
  that achieves accuracy comparable with real-life experiments.
hide_tease: true
tags: [tools]
supporters:
- elixir
- denbi
- unifreiburg
- australian_biocommons
authors: bgruening
authors_structured:
- github: bgruening
subsites: [eu, pasteur, freiburg, erasmusmc, elixir-it, belgium, genouest]
main_subsite: eu
---


It seems the whole world is talking about [AlphaFold](https://deepmind.com/blog/article/putting-the-power-of-alphafold-into-the-worlds-hands),
the AI system that predicts a protein’s 3D structure from its amino acid sequence that
achieves accuracy comparable with real-life experiments. There was much fanfare last year when [DeepMind](https://deepmind.com/) published
the [scientific paper](https://www.nature.com/articles/s41586-021-03819-2) and
[source code](https://github.com/deepmind/alphafold/) that explained their innovative system.

In partnership with [EMBL’s European Bioinformatics Institute (EMBL-EBI)](https://alphafold.ebi.ac.uk/) the predictions for the shape of every single protein in the human body,
as well as for the proteins of 20 other important organisms were made freely available to the scientific community.

![Aphafold in Galaxy](/assets/media/alphafold.png)

Understanding a protein’s structure helps us to understand their function, and is traditionally achieved through slow, laborious experimentation. Painstaking effort over many years has determined the structures of around 100,000 unique proteins, but this represents just a tiny fraction of the billions of known protein sequences. Using computational approaches to enable large-scale structural bioinformatics to predict protein structures now promises to fast track our understanding of protein structure.

The Galaxy community, spearheaded by [Galaxy Australia](https://www.biocommons.org.au/galaxy-australia), saw an opportunity to further democratise access
to this useful tool by making AlphaFold 2.0 available in Galaxy.
The Galaxy project provides researchers access to a rich catalogue of computational resources and now includes the GPU clusters required to power AlphaFold 2.0.
Life scientists can now easily visualise the consequences of DNA variants at the protein level, accelerating understanding of protein-protein interactions, activation or inhibition studies and drug design as examples.

It was an ambitious and technically challenging task, made possible through the work of multiple people around the world. While Galaxy Australia Developers and Admins laboured away
to make the specific hardware, reference data and environment setup work together, Galaxy EU provided the necessary GPU-enabled development machine to test the approach. This technical
triumph means that AlphaFold 2.0 is now available for installation on all Galaxy services globally, via the [Galaxy toolshed](https://toolshed.g2.bx.psu.edu/).

The AlphaFold Service is now taking amino acid sequences from the user, and all the set-up and provisioning of underlying infrastructure are taken care of by Galaxy, so researchers can focus on generating the protein 3D structure itself.

<div align="center">
<a href="https://usegalaxy.eu/?tool_id=alphafold"><button type="button" class="btn btn-primary btn-lg">Start AlphaFold now</button></a>
</div><br>

Thanks especially to [Australian BioCommons](https://www.biocommons.org.au/) for this [great collaboration](https://www.biocommons.org.au/news/alphafold-galaxy-au) and the blog that was adopted from from them.

