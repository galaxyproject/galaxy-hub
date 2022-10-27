---
title: Protein target prediction of a bioactive ligand with Align-it and ePharmaLib
date: '2022-02-15'
tease: Bioactive compounds often bind to several target proteins, thereby exhibiting polypharmacology.
hide_tease: true
tags: [training, tools]
authors: aurelienmoumbock
authors_structured:
- github: aurelienmoumbock
subsites: [eu, freiburg]
main_subsite: freiburg
---


Bioactive compounds often bind to several target proteins, thereby exhibiting polypharmacology. Experimentally determining these interactions is however laborious, and structure-based virtual screening of bioactive compounds could expedite drug discovery by prioritizing hits for experimental validation. 

The [Pharmaceutical Bioinformatics](http://www.pharmbioinf.uni-freiburg.de/) group at the University of Freiburg has therefore developed [Zauberkugel](https://usegalaxy.eu/u/aurelien_moumbock/w/zauberkugel), a workflow for pharmacophore-based protein target prediction of a bioactive ligand with the tool [Align-it](https://doi.org/10.1016/j.jmgm.2008.04.003) and the recently reported pharmacophore dataset [ePharmaLib](https://doi.org/10.1021/acs.jcim.1c00135). The Zauberkugel workflow requires only two inputs; the ligand structure file (SMI format) and the ePharmaLib dataset (PHAR format). The latter can be retrieved from [Zenodo](https://zenodo.org/record/6055897).

![zauberkugel](/assets/media/2022-02-10-zauberkugel.png)

To learn more on how to use the Zauberkugel workflow, please refer to the [Galaxy training material](https://training.galaxyproject.org/training-material/topics/computational-chemistry/tutorials/zauberkugel/tutorial.html).


## Credit

**ePharmaLib: A Versatile Library of e-Pharmacophores to Address Small-Molecule (Poly-)Pharmacology**\
Aurélien F. A. Moumbock, Jianyu Li, Hoai T. T. Tran, Rahel Hinkelmann, Evelyn Lamy, Henning J. Jessen, and Stefan Günther.\
*Journal of Chemical Information and Modeling* **2021**, *61*(7), 3659-3666.\
https://doi.org/10.1021/acs.jcim.1c00135

