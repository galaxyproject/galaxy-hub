---
title: Genome Annotation Reloaded
date: '2018-02-11'
tags: [tools]
subsites: [eu, freiburg]
main_subsite: freiburg
---

During the last month the Galaxy team has put a lot of effort into updating the Genome Annotation tools and has included new tools that will change how you work with your Genome in silico.

## Tool Updates

- We updated <a target="_top" href="https://galaxy.uni-freiburg.de/root?tool_id=toolshed.g2.bx.psu.edu/repos/bgruening/antismash/antismash/4.1">AntiSmash</a>, a tool for genome-wide identification, annotation and analysis of secondary metabolite biosynthesis gene clusters, to the latest version 4.1.
- BLAST databases are up-to-date
- <a target="_top" href="https://galaxy.uni-freiburg.de/root?tool_id=toolshed.g2.bx.psu.edu/repos/crs4/prokka/prokka/1.12.0">Prokka</a>, a complete prokaryotic genome annotation pipeline, has been updated
- and <a target="_top" href="https://galaxy.uni-freiburg.de/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/roary/roary/3.10.2">Roary</a>, a pangenome pipeline from our Australian friends to quickly generate a core gene alignment from gff3 files was integrated as well.
- <a target="_top" href="https://galaxy.uni-freiburg.de/root?tool_id=toolshed.g2.bx.psu.edu/repos/bgruening/augustus/augustus/3.2.3">Augustus</a> and <a target="_top" href="https://galaxy.uni-freiburg.de/root?tool_id=toolshed.g2.bx.psu.edu/repos/bgruening/glimmer3/glimmer_knowlegde-based/0.2">Glimmer</a> for gene prediction and <a target="_top" href="https://galaxy.uni-freiburg.de/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/gubbins/gubbins/0.1.0">Gubbins</a> for recombination detection in bacteria as well as many others saw updates.

## Circos

![The circos tool in action, showing a snippet of a plot.](/assets/media/2018-02-12-circos.png)

One tool we would especially like to highlight is new Galaxy wrapper for [Circos](https://genome.cshlp.org/content/19/9/1639).
Saskia Hiltemann from Erasmus MC (Leiden University), in collaboration with our own Helena Rasche, have <a target="_top" href="https://galaxy.uni-freiburg.de/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/circos/circgraph/0.9-RC2">integrated Circos into Galaxy</a>, finally making it
possible to create beautiful production quality plots interactively in your browser, or automatically as part of a workflow.

Let's annotate some Genomes -- Any feedback welcome!

