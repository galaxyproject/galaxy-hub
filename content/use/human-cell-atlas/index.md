---
title: "Human Cell Atlas"
url: "https://humancellatlas.usegalaxy.eu/"
scope: "domain"
platforms:
  - platform_group: "public-server"
    platform_url: "https://humancellatlas.usegalaxy.eu/"
    platform_text: "Human Cell Atlas Galaxy"
    platform_location: DE
summary: "Tools and workflows for the analysis of Single Cell RNA-Seq data. It includes a module that connects to the Matrix Service API of the [Human Cell Atlas](https://www.humancellatlas.org/)’s Data Coordination Platform that enables retrieval of gene expression matrices from any data sets in the Human Cell Atlas."
image: "/images/logos/human-cell-atlas-logo.png"
comments:
  - "This setup aims to give users access to as much granularity as possible in terms of the downstream analysis steps provided by the major software for single cell data analysis: Scanpy, SC3, Scater and Seurat. For each of these tools, this Galaxy instance has decomposed modules for each the main functionalities: ingestion from 10x/loom, filtering (by cells or genes), scaling, normalisation, clustering, marker genes, and dimensionality reduction, among others. In the short term we expect to have interoperability between these tools through the Loom exchange format. Additionally, we provide specialised viewers for single cell clustering data: UCSC CellBrowser (currently active) and cellxgene (coming up soon)."
  - "The public server is hosted by the UesGalaxy.eu team."
user_support:
  - "Several Workflows are available: [HCA - Scanpy - CellBrowser](https://humancellatlas.usegalaxy.eu/u/pmoreno/w/humancellatlas-scanpy-cellbrowser); [EBI Single Cell Expression Atlas - Scanpy - CellBrowser](https://humancellatlas.usegalaxy.eu/u/pmoreno/w/atlas-scanpy-cellbrowser-imported-from-uploaded-file); and [EBI Single Cell Expression Atlas Scanpy Prod 1.3](https://humancellatlas.usegalaxy.eu/u/pmoreno/w/scanpy-prod-13-smart-imported-from-uploaded-file)"
  - "[UseGalaxy.eu Matrix Support Channel](https://matrix.to/#/#usegalaxy-eu_Lobby:gitter.im)"
  - "[Galaxy Help Forum](https://help.galaxyproject.org/)"
quotas:
  - "Storage and computational quotas."
citations:
  - "Moreno, P., Huang, N., Manning, J. R., Mohammed, S., Solovyev, A., Polanski, K., Chazarra, R., Talavera-Lopez, C. A., Doyle, M., Marnier, G., Gruening, B. A., Rasche, H., Bacon, W., Perez-Riverol, Y., Haeussler, M., Meyer, K. B., Teichmann, S., & Papatheodorou, I. (2020). [User-friendly, scalable tools and workflows for single-cell analysis](https://doi.org/10.1101/2020.04.08.032698). *BioRxiv*, 2020.04.08.032698. https://doi.org/10.1101/2020.04.08.032698"  
pub_libraries:
  - "Human Cell Atlas"
sponsors:
  - "Tools available under HCA-Single Cell section were mainly brought to Galaxy by the [Gene Expression Team](https://www.ebi.ac.uk/about/people/irene-papatheodorou) at [EMBL-EBI](https://www.ebi.ac.uk/) and the [Teichmann Team](https://www.sanger.ac.uk/science/groups/teichmann-group) at the [Wellcome Sanger Institute](https://www.sanger.ac.uk/)."
---
