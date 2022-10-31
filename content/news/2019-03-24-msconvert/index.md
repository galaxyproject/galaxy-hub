---
title: Convert mass spectrometry data file formats with msconvert
date: '2019-03-24'
tags: [release]
location:
  name: Galaxy Europe
supporters:
- ELIXIR
authors: bgruening
authors_structured:
- github: bgruening
subsites: [eu, freiburg]
main_subsite: freiburg
---

[msconvert](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/galaxyp/msconvert/msconvert/3.0.19052.0){:target="_blank"} is a tool to
convert mass spectrometry data file formats.

A list of supported file formats is given below:

* agilentbrukeryep.d.tar
* agilentmasshunter.d.tar
* brukerbaf.d.tar
* brukertdf.d.tar
* watersmasslynx.raw.tar
* thermo.raw
* wiff
* wiff.tar
* mzml
* mzxml
* mz5
* mgf
* ms2

This tool is special in multiple ways. At first its one of the few tools that only runs in a very special Container, created by Dr. Matt Chambers, including
[Wine](https://www.winehq.org/) and [Proteowizard](http://www.proteowizard.org/). This is because many of the underlying libraries do need a Windows runtime environment
and Matt found a way to make this available in a Container so Galaxy Europe and all others can use it on there Cloud systems.

Because [msconvert](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/galaxyp/msconvert/msconvert/3.0.19052.0){:target="_blank"} is part of
[Proteowizard](http://www.proteowizard.org/) you need to agree with the [vendor licenses](http://www.proteowizard.org/licenses.html) before you can use this tool.



