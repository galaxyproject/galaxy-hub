---
title: "LiraSearch, a new tool for ultrafast ligand shape and electrostatic matching"
date: '2026-05-18'
tease: "A new tool for 3D molecular similarity search"
hide_tease: false
doi: 10.1093/bioadv/vbag139
tags:
- paper
- tools
subsites: [eu]
main_subsite: eu
contributions:
  authorship:
    - simonbray
---

We have published LiraSearch, a new tool for 3D molecular similarity search, which makes use of spherical harmonics to featurise molecular shape and electrostatic potential surfaces. Once calculated, the spherical harmonics are used to query a database of target compounds. 

This work was done as a collaboration between Gain Therapeutics, Rega Institute, Fluminense Federal University and the European Galaxy Team.

[Try it out here](https://usegalaxy.eu/?tool%5C_id=lirasearch).

## Abstract

Spherical harmonics have emerged as a powerful framework for molecular shape and electrostatic comparison in ligand-based virtual screening. Here, we present LiraSearch, a high-performance implementation and web server that uses spherical harmonics expansions to encode and compare three-dimensional (3D) molecular shapes and electrostatic potential (ESP) surfaces of drug-like compounds. Molecular surfaces are transformed into compact, low-dimensional spherical harmonics descriptors that capture both geometric and electrostatic features. These descriptors enable rapid similarity calculations between query molecules and large compound libraries while exploiting the rotational invariance of spherical harmonics to avoid explicit alignment. The representation is robust to moderate conformational variation and is effective at identifying structurally diverse active compounds sharing similar pharmacophoric patterns, facilitating scaffold hopping in ligand discovery workflows. Previous studies have shown that spherical harmonic surface representations achieve high retrieval performance with relatively low expansion orders and compact descriptors. By integrating these representations into an efficient screening pipeline, LiraSearch enables rapid similarity searches across ultralarge chemical libraries while preserving both geometric and electrostatic fidelity. This framework provides a scalable, mathematically rigorous approach to ligand similarity searching and can support early-stage hit discovery as well as downstream applications, such as protein–ligand docking and structure-based pharmacophore modelling.
