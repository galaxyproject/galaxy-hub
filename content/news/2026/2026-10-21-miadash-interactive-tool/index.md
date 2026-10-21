---
title: "miaDash: explore microbiome data interactively in Galaxy"
date: '2026-10-21'
tease: "The miaDash Shiny app from the Bioconductor microbiome team is now an interactive tool on usegalaxy.eu: import, analyse and visualise microbiome data without writing a line of code."
hide_tease: false
tags: [tools, microbiology]
subsites: [global, eu, freiburg]
main_subsite: global
contributions:
  authorship:
    - paulzierep
  funding:
    - deNBI
    - mwk
---

Microbiome data arrives in pieces: an abundance table, sample metadata, a taxonomy, sometimes a phylogenetic tree. Stitching it together usually means an R session before you can even see what you have.

[miaDash](https://github.com/microbiome/miaDash) is now available as an [interactive tool on usegalaxy.eu](https://usegalaxy.eu/?tool_id=interactive_tool_miadash&version=latest). It is the Shiny application from the Bioconductor microbiome team, and it turns those tables into a dashboard you can explore in your browser, no code required.

## What is miaDash?

miaDash is a graphical user interface for building and exploring TreeSummarizedExperiment objects, the standard data structure for microbiome data in the Bioconductor ecosystem. It is built on iSEE and the miaverse packages, and it covers the whole path from raw tables to interactive exploration:

* **Import** raw tables, or R objects, into a TreeSummarizedExperiment
* **Manipulate** them: subset by prevalence, agglomerate by taxonomy rank, transform assays (including PhILR), with every step recorded as a reproducible R script
* **Analyse**: quality control, alpha and beta diversity, clustering, ordination
* **Visualise** the result in the interactive iSEE explorer, with a customisable set of panels, and export it as TreeSE, phyloseq, BIOM, Mothur or QIIME2 formats

## How does it work in Galaxy?

Every input is optional, the tool starts with or without your data. You can pre-load:

* an **abundance table**: tab-separated, taxa in the rows, sample ids in the header
* **sample data** (colData) with the sample variables you care about
* **taxa data** (rowData) with taxonomy ranks or other taxon variables
* a **taxa tree** in Newick format, for the analyses that need the phylogeny

The tables you select are staged and handed to the application at launch, so the session starts from your data. Anything you leave out can still be added inside the app: the Import panel takes browser uploads, the Raw Data tab accepts the same table layouts, and example datasets ship with the application.

Results travel back to your history. The export download in the app has a **Send to Galaxy** button, which saves the file into the *miaDash results* collection and starts a direct history upload in the background. The collection becomes available in your history when the interactive job ends, so nothing gets lost along the way.

## A look inside

<div align="center">

<img src="static/mia_logo.png" alt="The miaDash logo" width="120" />

</div>

<div align="center">

<img src="static/dashboard.png" alt="The miaDash dashboard, with the Import, Manipulate, Analyse and Visualise windows" width="800" />

</div>

<div align="center">

<img src="static/iSEEtree.png" alt="The iSEE explorer launched from miaDash, showing the interactive panels" width="800" />

</div>

## Try it out

Interactive tools need a login, so create an account on [usegalaxy.eu](https://usegalaxy.eu) first. Then find miaDash in the tool panel, or go straight to the tool page: [miaDash on usegalaxy.eu](https://usegalaxy.eu/?tool_id=interactive_tool_miadash&version=latest). You can watch the running instances [here](https://usegalaxy.eu/interactivetool_entry_points/list).

<div align="center">
    <a href="https://usegalaxy.eu/?tool_id=interactive_tool_miadash&version=latest">
      <button type="button" class="btn btn-primary btn-lg">Start miaDash now</button>
    </a>
</div>

## Acknowledgements

miaDash was created by Giulio Benedetti, Akewak Jeba and Leo Lahti, and it builds on iSEE, iSEEtree and the miaverse ecosystem. Giulio requested an interactive tool in the [IUC repository](https://github.com/galaxyproject/tools-iuc/issues/8553), and the wrapper is now live on [usegalaxy.eu](https://github.com/usegalaxy-eu/galaxy/pull/417), running the [miaDash GxIT container](https://quay.io/repository/galaxy/miadash-gxit).

This work was supported by de.NBI and the Ministry of Science, Research and the Arts Baden-Württemberg.
