---
title: FASTQC jobs and very long reads
date: '2019-04-14'
tags: [devops, tools]
location:
  name: Galaxy Europe
authors: bgruening
authors_structured:
- github: bgruening
subsites: [eu, freiburg]
main_subsite: freiburg
---

Over the past few weeks we saw many [FASTQC](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/devteam/fastqc/fastqc/0.72){:target="_blank"} jobs running for days or even longer, which is not normal.
We investigated this and saw that all of those jobs are processing files with unusually long reads.

We are excited to see that our instance is used more and more for processing data from fourth-generation DNA sequencing technology!

However, FASTQC seems to have a problem with that so we updated the tool and tried to understand what is going on.
We finally found that FASTQC has a hard-coded parameter (-Xmx250m) to restrict the Java virtual machine to a certain amount of memory.
Increasing this value made all of our tests much faster for very long reads and we hope to speed up your computation from days to minutes.

We will kill long running jobs that do not finish in a few days, all that you need to do is restart the job and it should finish way faster.
Please get in [contact](mailto:galaxy@informatik.uni-freiburg.de) with us, if you still see problems with FASTQC.

Please also have a look at [fastp](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/fastp/fastp/){:target="_blank"} as an alternative tool, that also provides some quality metrics.

Finally, if you have data with very long reads have a look in your tool panel - there should be a Nanopore section with a lot of useful tools for ONT data.

