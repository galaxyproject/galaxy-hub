---
title: 'Voronoi segmentation for Astronomy'
date: "2025-06-11"  
tease: "Dividing the sky images in regions that include individual astronomical objects or clusters."
hide_tease: false
tags: [esg-wp5, esg]
subsites: [all-eu, esg, all]
main_subsite: eu
---


In an exciting step forward for astronomical data analysis, WP5 EPFL team has developed a Galaxy workflow that applies Voronoi segmentation techniques to [Legacy Surveys / D. Lang (Perimeter Institute)](https://www.legacysurvey.org/) imaging data. The workflow is based on the Galaxy Training Network [tutorial](https://training.galaxyproject.org/topics/imaging/tutorials/voronoi-segmentation/tutorial.html) and tools to query astronomical data and transform it into PNG format. 

By integrating data from major astronomical surveys into the Galaxy platform, this workflow enables scientists to carry out complex image analyses in a fully reproducible and shareable environment and to explore new ways to study complex celestial structures.

The newly developed workflow allows users to:
* Fetch Legacy Surveys FITS data for specific sky regions.
* Convert FITS to PNG format for compatibility with image processing tools.
* Apply adaptive histogram equalization and noise reduction filters.
* Perform Voronoi segmentation to detect and outline objects of interest.
* Extract quantitative measurements from segmented regions (e.g., area, intensity).

Furthermore, the worfklow requires the following input parameters:
* RA: -- right ascension in degrees as a float number;
* Dec: -- Declination in degrees as a float number;
* Radius: -- the radius of the cone to be queried in arcminutes as a float number;
* Pixel size: -- the size of the pixel in arcseconds;
* Band: -- the band (channel) of the image: g, r, z, i. 

Very importantly, the authors have observed that the "Stretch image scale" of *astropy fits2bitmap* tool and the creation of the seed strongly impact the result of the Voronoi segmentation

<div class="center">
<div class="img-sizer" style="width: 100%">

![The output of the workflow for the given input parameters: RA = 53.16216667; Dec = -27.79149167; Radius = 2.7 arcmin; Pixel size = 0.262 arcsec; Band = g.](galaxy-voronoi-astronomy-output.tiff)</div>
<figcaption>
The output of the workflow for the given input parameters: RA = 53.16216667; Dec = -27.79149167; Radius = 2.7 arcmin; Pixel size = 0.262 arcsec; Band = g.
</figcaption>

This cross-disciplinary approach opens the door to novel applications in morphological studies of galaxies and more detailed analyses.

The Galaxy community encourages further experimentation and invites researchers to adapt and extend the workflow for their own use cases. A public version of the workflow is now available on [usegalaxy.eu](https://usegalaxy.eu/published/workflow?id=bc78c184fabcff1d).
