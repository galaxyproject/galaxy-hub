---
date: '2025-03-25'
title: 'Paper Highlight: “Facilitating Reproducibility in Catalysis Research with Managed Workflows and RO-Crates: A Galaxy Case Study”'
tease: 'Members of the EuroScienceGateway project working on materials science use cases in the UK have co-authored a paper addressing reproducibility of catalysis experiments.'
authors_structured:
    - github: patrick-austin
subsites: [all-eu,global,esg]
tags: [esg,esg-wp5]
main_subsite: eu
---

Within the field of catalysis research carried out using X-ray Absorption Spectroscopy (XAS), increasing data volumes, lack of provenance between inputs and outputs and missing metadata can all pose a challenge to reproducibility, even when data is included with a publication. As a case study, several examples of publications using data collected at the [Diamond Light Source](https://www.diamond.ac.uk/Home.html) via the [UK Catalysis Hub](https://ukcatalysishub.co.uk/) were identified. Using [Galaxy tools developed and hosted](https://materialsgalaxy.stfc.ac.uk/) as part of the [EuroScienceGateway](https://galaxyproject.org/projects/esg/), the process described in each publication was repeated to determine whether the same results could be reproduced, and what benefits the Galaxy platform could provide. Other co-authors were also members of the [Physical Sciences Data Infrastructure](https://www.psdi.ac.uk/) project.

Some of the main challenges identified were:
- Some publications included only an intermediary form of the data and not the raw values obtained from experiment
- Not having all the input parameters needed for each step of analysis process
- Different labelling of data in the final paper and the associated data object

All of this made it difficult to reproduce the exact process, and therefore the results, of the original paper. By using Galaxy to generate [RO-Crates](https://www.researchobject.org/ro-crate/) for each workflow invocation, it was possible to generate a single digital object which includes all inputs, outputs, parameters, and the links between them. We concluded that this could make both publishing of data and reproduction by others easier.

The full paper can be read at [A. Nieva-de-la-Hidalga, L. Liborio, P. Austin, S. Devadasan, T. Underwood, A. Belozerov, M. Wilding, N. Ramanan, C. R. A. Catlow, Facilitating Reproducibility in Catalysis Research with Managed Workflows and RO-Crates: A Galaxy Case Study. ChemCatChem 2025, 17, e202401676.](https://doi.org/10.1002/cctc.202401676)
