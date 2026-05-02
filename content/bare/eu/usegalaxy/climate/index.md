---
title: Galaxy Climate
---

<slot name="/bare/eu/usegalaxy/notices" />

# Welcome to the climate science community

<img src="https://climate.usegalaxy.eu/assets/media/Galaxy-climate-logo.png" height="100px" alt="Galaxy Climate"/>



The Climate Science workbench is a comprehensive set of analysis tools and consolidated workflows.
The workbench is based on the [Galaxy framework](https://galaxyproject.org),
which guarantees simple access, easy extension, flexible adaption to personal and security needs,
and sophisticated analyses independent of command-line knowledge.

The current implementation comprises a few tools dedicated to different research areas of climate science. More tools are coming soon!

The list of tools is maintained by [Anne](https://github.com/annefou)!!!

# Content




# Get started

Are you new to Galaxy, or returning after a long time, and looking for help to get started? Take [a guided tour](https://climate.usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.

# Training

- [Galaxy 101 for everyone](https://galaxyproject.github.io/training-material/topics/introduction/tutorials/galaxy-intro-101-everyone/tutorial.html)
- [Climate Galaxy Training](https://training.galaxyproject.org/training-material/topics/climate/)

**Want to learn more about Galaxy? Check out the following hands-on tutorials from [the Galaxy Training Network](https://galaxyproject.github.io/training-material/).**

We are passionate about training. So we are working in close collaboration with the [Galaxy Training Network (GTN)](https://galaxyproject.org/teach/gtn/) to develop training materials of data analyses based on Galaxy {% cite batut2017community %}. These materials hosted on the GTN GitHub repository are available online at [https://training.galaxyproject.org](https://training.galaxyproject.org).


# Available tools

## Interactive tools

- [Panoply netCDF viewer](https://live.usegalaxy.eu/?tool_id=interactive_tool_panoply)
- [JupyterLab for Ocean / Atmosphere / Land / Climate Pangeo Python ecosystem](https://live.usegalaxy.eu/?tool_id=interactive_tool_climate_notebook) with:
	- [PANGEO python ecosystem](https://pangeo.io/): PANGEO is a community platform for Big Data geoscience;
	- [Community Earth System Models (CESM) development & Training platform](http://www.cesm.ucar.edu/): The Community Earth System Model (CESM) is a fully-coupled, global climate model that provides state-of-the-art computer simulations of the Earth's past, present, and future climate states.
	- [ESMValTool](https://www.esmvaltool.org/): a community diagnostic and performance metrics tool for routine evaluation of Earth system models in the [Coupled Model Intercomparison Project](https://www.wcrp-climate.org/wgcm-cmip) (CMIP). The JupyterLab ESMValTool environment can be used for developing new diagnostic recipes and as a teaching platform.

## Climate Analysis

Tool | Description | Reference
--- | --- | ---
{% include tool.html id="cds_essential_variability" %} | [Copernicus Essential climate variables for assessment of climate variability from 1979 to present](https://cds.climate.copernicus.eu/cdsapp#!/dataset/ecv-for-climate-change?tab=overview)  | -
{% include tool.html id="shyft_longitudes" %} | Shift longitude range in netCDF data file from 0->360 to -180->180 degrees | -
{% include tool.html id="psy_maps" %} | Visualization on a geographical map with psyplot | -
{% include tool.html id="mean_per_zone" %} | Plot zonal statistics from a raster and shapefile on a geographical map | -


## GIS data handling

Tool | Description | Reference
--- | --- | ---
{% include tool.html id="gdal_gdalinfo" %} | [Lists information about a raster dataset](https://gdal.org/programs/gdalinfo.html)  | -
{% include tool.html id="gdal_gdaladdo" %} | [Builds or rebuilds overview images](https://gdal.org/programs/gdaladdo.html)  | -
{% include tool.html id="gdal_gdalbuildvrt" %} | [Builds a VRT (Virtual Dataset) from a list of datasets](https://gdal.org/programs/gdalbuildvrt.html)  | -
{% include tool.html id="gdal_gdal_merge" %} | [Mosaic a set of images](https://gdal.org/programs/gdal_merge.html)  | -
{% include tool.html id="gdal_gdal_translate" %} | [Convert raster data between different formats](https://gdal.org/programs/gdal_translate.html)  | -
{% include tool.html id="gdal_gdalwarp" %} | [Image reprojection and warping utility](https://gdal.org/programs/gdalwarp.html)  | -
{% include tool.html id="gdal_ogr2ogr" %} |  [Converts simple features data between file formats](https://gdal.org/programs/ogr2ogr.html) | -
{% include tool.html id="gdal_ogrinfo" %} |  [Lists information about an OGR-supported data source](https://gdal.org/programs/ogrinfo.html) | -


# Machine Learning Workbench

For Machine Learning tools, use the [Galaxy Machine Learning Workbench](https://ml.usegalaxy.eu/). To have access to all your Galaxy histories and data, make sure to login with the same username and password than on the Climate Science Workbench. 

# Acknowledgments

The authors would like to thank Bérénice Batut,  Björn Grüning, Anup Kumar and @galaxyproject

# Citation

Please add the following when using the [climate.usegalaxy.eu](https://climate.usegalaxy.eu) Galaxy portal:

*The Galaxy server that was used for some calculations is in part funded by Collaborative Research Centre 992 Medical Epigenetics (DFG grant SFB 992/1 2012) and
German Federal Ministry of Education and Research (BMBF grants 031 A538A/A538C RBC, 031L0101B/031L0101C de.NBI-epi, 031L0106 de.STAIR (de.NBI)).*

More information on [how to cite Galaxy](https://galaxyproject.org/citing-galaxy/).
