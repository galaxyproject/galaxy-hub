---
title: Galaxy Europe Metabolomics
autotoc: true
---

<slot name="/bare/eu/usegalaxy/notices" />

<h1>

Welcome to **UseGalaxy.EU Metabolomics**

</h1>

<strong>Metabolomics.UseGalaxy.eu</strong> is a community driven metabolomics Galaxy service. The main aim is to give people a public space to discover and run metabolomics tools. If there is something that should be added, please let us know on [Matrix](https://matrix.to/#/#usegalaxy-eu_Lobby:gitter.im).

During the [2019 Galaxy Community Conference](/events/gcc2019/) (GCC2019) metabolomics users and developers are invited to meet during a Birds of a Feather (BoF) event to plan the aims of this service.

# Table of contents

# Get started

Are you new to Galaxy, or returning after a long time, and looking for help to get started? Take [a guided tour](https://metabolomics.usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.

# Training

Want to learn more about metabolomics? Check out the following lesson tutorials from the [Galaxy Trainings Network](https://galaxyproject.github.io/training-material/topics/metabolomics/):

| Lesson | Slides | Hands-on | Input dataset | Workflows | Galaxy tour |
| --- | --- | --- | --- | --- | --- |
Introduction to Metabolomics | [<i class="fa fa-slideshare" aria-hidden="true"></i>](https://galaxyproject.github.io/training-material/topics/metabolomics/slides/introduction.html) | | | |
Mass spectrometry imaging: Examining the spatial distribution of analytes | | [<i class="fa fa-laptop" aria-hidden="true"></i>](https://galaxyproject.github.io/training-material/topics/metabolomics/tutorials/msi-analyte-distribution/tutorial.html) | [<i class="fa fa-topic" aria-hidden="true"></i>](https://zenodo.org/record/484496) | [<i class="fa fa-share-alt" aria-hidden="true"></i>](https://github.com/galaxyproject/training-material/tree/master/topics/metabolomics/tutorials/msi-analyte-distribution/workflows/) |
Mass spectrometry imaging: Finding differential analytes | | [<i class="fa fa-laptop" aria-hidden="true"></i>](https://galaxyproject.github.io/training-material/topics/metabolomics/tutorials/msi-finding-nglycans/tutorial.html) | [<i class="fa fa-topic" aria-hidden="true"></i>](https://zenodo.org/record/2628280) | [<i class="fa fa-share-alt" aria-hidden="true"></i>](https://github.com/galaxyproject/training-material/tree/master/topics/metabolomics/tutorials/msi-finding-nglycans/workflows/) |
Mass spectrometry: LC-MS analysis | | [<i class="fa fa-laptop" aria-hidden="true"></i>](https://training.galaxyproject.org/training-material/topics/metabolomics/tutorials/lcms/tutorial.html) | [<i class="fa fa-topic" aria-hidden="true"></i>](https://zenodo.org/record/3244991) | [<i class="fa fa-share-alt" aria-hidden="true"></i>](https://github.com/galaxyproject/training-material/tree/master/topics/metabolomics/tutorials/lcms/workflows/) |

--------------------------------------------------------------------

# Available Tools

## Workflow4Metabolomics Tools

| Tool | Description |
| --- | --- |
[xcms_xcmsset](https://github.com/workflow4metabolomics/xcms) | [W4M][LC-MS] XCMS R Package - Preprocessing - peaks calling in NetCDF/mzXML files
[xcms_group](https://github.com/workflow4metabolomics/xcms) | [W4M][LC-MS] XCMS R Package - Preprocessing - Group peaks from different samples together
[xcms_retcor](https://github.com/workflow4metabolomics/xcms) | [W4M][LC-MS] XCMS R Package - Preprocessing - Correct retention time from different samples
[lipidmaps_textsearch](https://github.com/workflow4metabolomics/tool-bank-lipidmaps.git) | [W4M][LC-MS] LIPID MAPS Structure Database (LMSD) - Annotation - Returns annotation results from LIPID MAPS Structure Database and its Text/Ontology-based search engine.
[probmetab](https://toolshed.g2.bx.psu.edu/view/mmonsoor/probmetab) | [W4M][LC-MS] ProbMetab - automatic probabilistic LC-MS based metabolome annotation
[profia](https://github.com/workflow4metabolomics/profia.git) | [W4M][FIA-HRMS] Preprocessing of Flow Injection Analysis coupled to High-Resolution Mass Spectrometry (FIA-HRMS) data.
[xcms_fillpeaks](https://github.com/workflow4metabolomics/xcms) | [W4M][LC-MS] XCMS R Package - Preprocessing - Integrate areas of missing peaks
[camera_annotate](https://toolshed.g2.bx.psu.edu/view/lecorguille/camera_annotate) | [W4M][LC-MS] CAMERA R Package - Annotation - Returns annotation results (isotope peaks, adducts and fragments)
[xcms_merge](https://github.com/workflow4metabolomics/xcms) | [W4M][LC-MS] XCMS R Package - Preprocessing - Merge individual xcmsSet outputs
[generic_filter](https://toolshed.g2.bx.psu.edu/view/melpetera/generic_filter) | [W4M][Utils] Filtering according to specific variables
[xcms_summary](https://github.com/workflow4metabolomics/xcms) | [W4M][LC-MS] XCMS R Package - Preprocessing - HTML Summary for XCMS and CAMERA analysis
[camera_combinexsannos](https://toolshed.g2.bx.psu.edu/view/mmonsoor/camera_combinexsannos) | [W4M][LC-MS] CAMERA R Package - Annotation - combinexsAnnos Check CAMERA ion species annotation due to matching with opposite ion mode
[batchcorrection](https://github.com/workflow4metabolomics/batchcorrection.git) | [W4M][LC-MS] Correction of data intensities for signal drift and batch-effects.
[qualitymetrics](https://github.com/workflow4metabolomics/qualitymetrics.git) | [W4M][LC-MS] Metrics and graphics to check the quality of the data.
[hmdb_ms_search](https://toolshed.g2.bx.psu.edu/view/fgiacomoni/hmdb_ms_search) | [W4M][LC-MS] HMDB database MS Search Package - Annotation - Returns annotation results (adducts and metabolites) from The Human Metabolome Database.
[univariate](https://github.com/workflow4metabolomics/univariate.git) | [W4M][LC-MS][GC-MS][NMR] Univariate statistics.
[lcmsmatching](https://github.com/workflow4metabolomics/lcmsmatching.git) | [W4M][LC-MS] Annotate LCMS spectrum using an in-house spectra database.
[biosigner](https://github.com/workflow4metabolomics/biosigner.git) | [W4M][LC-MS][GC-MS][NMR] Discovery of significant signatures from omics data.
[multivariate](https://github.com/workflow4metabolomics/multivariate.git) | [W4M][LC-MS][GC-MS][NMR] Multivariate analysis by PCA, PLS(-DA), and OPLS(-DA).
[metams_rungc](https://github.com/workflow4metabolomics/metaMS) | [W4M][GC-MS] metaMS R Package - GC-MS data preprocessing using metaMS package
[withinvariation](https://github.com/workflow4metabolomics) | [W4M][Statistics] mixOmics R package withinVariation function for repeated mesurement design
[nmr_preprocessing](https://toolshed.g2.bx.psu.edu/view/marie-tremblay-metatoul/nmr_preprocessing) | [W4M][NMR] NMR Preprocessing - Preprocessing (from FID to baseline correction)
[nmr_alignment](https://github.com/workflow4metabolomics/nmr_alignment) | [W4M][NMR] NMR Alignment - Alignment of NMR spectra based on the Cluster-based Peak Alignment (CluPA) algorithm
[nmr_bucketing](https://github.com/workflow4metabolomics/nmr_bucketing) | [W4M][NMR] NMR Bucketing - Bucketing / Binning (spectra segmentation in fixed-size windows) and integration (sum of absolute intensities inside each bucket) to preprocess NMR data
[nmr_normalization](https://github.com/workflow4metabolomics/nmr_normalization) | [W4M][NMR] NMR Normalization - Normalization (operation applied on each individual spectrum) of bucketed and integrated NMR data
[normalization](https://toolshed.g2.bx.psu.edu/view/marie-tremblay-metatoul/normalization) | Normalization (operation applied on each individual spectrum) of preprocessed data
[transformation](https://github.com/workflow4metabolomics/transformation.git) | [W4M][LC-MS][GC-MS][NMR] Transforms the dataMatrix intensity values.
[golm_ws_lib_search](https://github.com/workflow4metabolomics/tool-bank-golm-lib_search.git) | [W4M][GC-MS] Golm Metabolome Database search spectrum
[checkformat](https://github.com/workflow4metabolomics/checkformat.git) | [W4M][LC-MS][GC-MS][NMR] Checks the formats of the dataMatrix, sampleMetadata, and variableMetadata files.

## Workflow4Metabolomics Related Tools

| Tool | Description |
| --- | --- |
[w4mclassfilter](https://github.com/HegemanLab/w4mclassfilter_galaxy_wrapper/tree/master) | Filter W4M data by values or metadata
[w4mjoinpn](https://github.com/HegemanLab/w4mjoinpn_galaxy_wrapper/tree/master) | Join positive- and negative-mode W4M datasets
[w4mcorcov](https://github.com/HegemanLab/w4mcorcov_galaxy_wrapper/tree/master) | OPLS-DA Contrasts of Univariate Results

--------------------------------------------------------------------

# Gateways

Other metabolomics specialized Galaxy servers:

| Servers |
| --- |
| [Workflow4Metabolomics](https://workflow4metabolomics.org/) |
| [PhenoMeNal](https://portal.phenomenal-h2020.eu/home) |

--------------------------------------------------------------------

# News and Events

<!-- TODO: carousel content -->

<iframe title="Recent Galaxy Europe news"
 class="resize-y" src="/bare/eu/latest/news/" scrolling="no"
 style="width: 50%; border: none; vertical-align: top">
</iframe>
<iframe title="Recent Galaxy Europe events"
 class="resize-y" src="/bare/eu/latest/events/" scrolling="no"
 style="width: 50%; border: none; vertical-align: top">
</iframe>

--------------------------------------------------------------------

# Contributors

- [Mark Esler](https://github.com/eslerm)
- [Art Eschenlauer](https://github.com/eschen42)

<div class="img-sizer" style="width: 192px">

[![GalaxyP logo](/images/logos/GalaxyPLogo.png)](https://galaxyp.org)

</div>

--------------------------------------------------------------------

<slot name="/eu/common/data-policy" />

<slot name="/bare/eu/usegalaxy/jobs" />

<footer>
<slot name="/eu/site-footer" />
</footer>

