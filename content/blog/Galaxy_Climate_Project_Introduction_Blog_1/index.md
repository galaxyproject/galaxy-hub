---
title: "Galaxy climate to support local/regional initiatives and concrete actions to fight climate change" 
tease: "First blog post presenting the Outreachy project on Galaxy Climate"
authors: "Soumya Jha, Anne Fouilloux, Jean Iaquinta"
source_blog: "Galaxy Climate Outreachy project"
date: "2022-07-04"
---

# Introduction to GALAXY CLIMATE 

![Galaxy Climate Project Outreachy Blog1](Galaxy_Climate_Project_Outreachy_Blog1.png)

Have you heard about the **Climate Science Workbench** of Galaxy? It is named **[GALAXY CLIMATE](https://climate.usegalaxy.eu/)**. This is the first blog in the series of five blog posts that I will be sharing. Let’s explore it in more detail.


Aiming to make computational data analysis accessible to research scientists (from those who lack knowledge in computer programming or systems administration to the most advanced users), Galaxy is a platform for scientific workflow creation, data integration and data analysis. Despite being primarily domain-independent and used as a general workflow management system, it was initially created for genomics research. In recent times, Galaxy has initiated the inclusion and development of climate science-related tools under its ToolShed.


Galaxy Climate is a scientific workbench focusing on making climate analysis easier, in simpler words, “**command-line free**”. It houses numerous tools, which makes the process of climate analysis and workflow extraction a lot more convenient. The number of tools available for the purpose is rich and is increasing with demand. The supportive community which makes it possible is efficiently equipped with the required expertise and passion for the initiative.




# Why is GALAXY focusing on CLIMATE SCIENCE?

We live on Earth, but why? To state, it has the right temperature, air, and water conditions for our survival. It is an inevitable fact that climate is associated with our existence. And both go hand-in-hand. Technological advances can be of actual use if we can ensure our survival. The world is shifting to greener norms or a more sustainable tomorrow.

Handling massive command-line-focused analysis of climate data can be exhaustive as well as cumbersome. Sometimes, it may be setting up system environments, and other times, it may be some technical jargon that could delay the analysis. And not everyone is well equipped with coding skills. Nevertheless, a standard, easy-to-use, accurate, and scientifically sound platform is the need of the hour. The Galaxy Climate workbench has almost met all the criteria for improving the situation. There are some significant tools that have yet not been included in the toolshed, but in coming time, with addition of these tools, Galaxy can become the one stop solution for Climate Data Analysis.


# What are the tools for Climate Science available in the Galaxy ToolShed?

The Galaxy ToolShed houses more than 2,000 tools, out of which several tools are helpful for Climate Analysis.  Some of the relevant tags to find under the Galaxy ToolShed are: “Climate Analysis”, “Ecology”, etc. You can follow the list given below for more clarity. 


## Climate analysis tools

| Climate Analysis Tools |      Synopsis    |
|----------|:-------------|
| [c3s](https://toolshed.g2.bx.psu.edu/repository/browse_repository?id=66db1d2dd5ec1fab) |    Copernicus Climate Change Service (C3S)   |  
| [cads](https://toolshed.g2.bx.psu.edu/repository/browse_repositories_in_category?sort=name&operation=view_or_manage_repository&id=58c4b9b8233320fc) |  Copernicus Atmosphere Data Store (ADS)   |
|[cdo_info](https://toolshed.g2.bx.psu.edu/repository/browse_repositories_in_category?sort=name&operation=view_or_manage_repository&id=c8c1cfa654cb096d) | Wrapper for cdo tool: CDO get info |
| [cdo_operations](https://toolshed.g2.bx.psu.edu/repository/browse_repositories_in_category?sort=name&operation=view_or_manage_repository&id=8a2394bf5c1816a5) |  Wrapper for cdo tool: CDO Operations |
| [cds_essential_variability](https://toolshed.g2.bx.psu.edu/repository/browse_repositories_in_category?sort=name&operation=view_or_manage_repository&id=0d422cfb5d8fef89)|   Get Copernicus Essential Climate Variables for assessing climate variability   |
|[cesm](https://toolshed.g2.bx.psu.edu/repository/browse_repositories_in_category?sort=name&operation=view_or_manage_repository&id=7aa3cab2c60dddc0) | Community Earth System Model (CESM) |
| [climate_stripes](https://toolshed.g2.bx.psu.edu/repository/browse_repositories_in_category?sort=name&operation=view_or_manage_repository&id=51707a18875902ba) |  Create climate stripes from a tabular input file |
| [ctsm_fates](https://toolshed.g2.bx.psu.edu/repository/browse_repositories_in_category?sort=name&operation=view_or_manage_repository&id=f39a869bd7709275) |    EMERALD version of the Functionally Assembled Terrestrial Ecosystem Simulator (FATES) with Community Terrestrial Systems Model as host model  |
| [eodie](https://toolshed.g2.bx.psu.edu/repository/browse_repositories_in_category?sort=name&operation=view_or_manage_repository&id=ddd8dba334f1d765) |  Earth Observation Data Information Extractor |
| [psy_maps]() | Visualization of regular geographical data on a map with psyplot |
|[shift_longitudes](https://toolshed.g2.bx.psu.edu/repository/browse_repositories_in_category?sort=name&operation=view_or_manage_repository&id=6f6f2aca88e226de) | Shift longitudes ranging from 0º and 360º to -180º and 180º |
|[suite_cdo](https://toolshed.g2.bx.psu.edu/repository/browse_repositories_in_category?sort=name&operation=view_or_manage_repository&id=11bb18c4362d86a5) |  A suite of cdo tools |
|[mean_per_zone](https://climate.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/climate/mean_per_zone/mean_per_zone) |  Creates a png image showing statistic over areas as defined in the vector file |

## Interactive tools


You can find and use many climate relevant interactive tools @ <https://climate.usegalaxy.eu/>  in the interactive tools section.

| Interactive Tools |      Description   |
|----------|:-------------|
| [Panoply netCDF viewer](https://live.usegalaxy.eu/?tool_id=interactive_tool_panoply) |    Plots geo-referenced and other arrays from netCDF, HDF, GRIB, and other datasets  |  
| [PANGEO notebooks](https://live.usegalaxy.eu/?tool_id=interactive_tool_pangeo_notebook) |  Based on Pangeo, an open and inclusive community platform for Big Data geoscience   |
| [PANGEO python ecosystem](https://pangeo.io/) |  PANGEO is a community platform for Big Data geoscience |
| [Community Earth System Models (CESM) development & Training platform:](http://www.cesm.ucar.edu/)| The Community Earth System Model (CESM) is a fully-coupled, global climate model that provides state-of-the-art computer simulations of the Earth’s past, present, and future climate states   |
|[ESMValTool](https://www.esmvaltool.org/) | A community diagnostic and performance metrics tool for routine evaluation of Earth system models in the Coupled Model Intercomparison Project (CMIP). The JupyterLab ESMValTool environment can be used for developing new diagnostic recipes and as a teaching platform|
| [GPU enabled Interactive Jupyter Notebook for Machine Learning](https://climate.usegalaxy.eu/root?tool_id=interactive_tool_ml_jupyter_notebook) | Galaxy offers us to use Jupyter Lab directly in Galaxy accessing and interacting with Galaxy datasets as we like |
| [RStudio](https://climate.usegalaxy.eu/root?tool_id=interactive_tool_rstudio) | Galaxy offers us to use RStudio directly in Galaxy accessing and interacting with Galaxy datasets as we like  |
| [OpenRefine Working with messy data](https://climate.usegalaxy.eu/root?tool_id=interactive_tool_openrefine) | A powerful tool for working with messy data: cleaning it; transforming it from one format into another; and extending it with web services and external data  |
| [Ubuntu XFCE Desktop](https://climate.usegalaxy.eu/root?tool_id=interactive_tool_guacamole_desktop) | All-in-one desktop. The Username is "user" and the Password is "password". This image is based on the awesome work from CyVerse |

Machine Learning and Analysis Galaxy Tools are also available to Galaxy Climate. Access the complete tool list [here](https://toolshed.g2.bx.psu.edu/).



A huge list of **Graph/Display** tools is also available under the general tools of Galaxy Climate.

You can also find below the important list of tools for **GIS(Geographic Information System) DATA Handling**.

| GIS Data Handling Tools|      Description    |
|----------|:-------------|
| [gdal_gdalinfo](https://climate.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/ecology/gdal_gdalinfo/gdal_gdalinfo) |   Lists various information about a GDAL supported raster dataset  |  
| [gdal_gdaladdo](https://climate.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/ecology/gdal_gdaladdo/gdal_gdaladdo) | Can be used to build or rebuild overview images for most supported file formats with one of several downsampling algorithms   |
|[gdal_gdalbuildvrt](https://climate.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/ecology/gdal_gdalbuildvrt/gdal_gdalbuildvrt) | Builds a VRT (Virtual Dataset) that is a mosaic of the list of input GDAL datasets |
| [gdal_gdal_merge](https://climate.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/ecology/gdal_gdal_merge/gdal_gdal_merge) |  Automatically mosaic a set of images |
| [gdal_gdal_translate](https://climate.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/ecology/gdal_gdal_translate/gdal_gdal_translate)|  Can be used to convert raster data between different formats, potentially performing some operations like subsettings, resampling, and rescaling pixels in the process  |
|[gdal_gdalwarp](https://climate.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/ecology/gdal_gdalwarp/gdal_gdalwarp) | An image mosaicing, reprojection and warping utility |

# What's next?



Climate data vary from other generic data in various ways. Its dimensions are generally huge and are mainly available in netCDF, binary, etc. formats, requiring new and more straightforward tools to work on. We have tools for tabular and comma-separated values (CSV) designs, but few instruments are targeted toward netCDF file analysis. Some available tools can be found here [xarray_coords_info](https://toolshed.g2.bx.psu.edu/repository/browse_repository?id=0535bc9a272a7dba). Besides these, there are a couple of other tools.
Although the ocean of existing tools can be used in combinations to obtain the desired results, this will again create the issue of complicated/untidy workflows and confusion. Moreover, a [newcomer](https://galaxyproject.org/get-started/) to the Galaxy Climate instance may find challenging to learn the jargon and get stuck. Nevertheless, the vision toward expanding climate-specific tools is being highly propagated. The process of tool contribution is not very tedious, and anyone who wishes to do so can contribute.



# What am I doing?


As an Outreachy Intern, I will focus on analyzing the climate of the financial capital Of India, the city of Mumbai, (lat: 18.75,19.25; lon: 72.50, 73.00). Being situated at the coast of the Arabian Sea, the city of Mumbai is experiencing critical climate events which have led the [Intergovernmental Panel on Climate Change (IPCC)](https://www.ipcc.ch/) to announce its [probable submergence by 2050](https://www.ipcc.ch/srocc/chapter/chapter-4-sea-level-rise-and-implications-for-low-lying-islands-coasts-and-communities/). The very importance of this project is developing real-use tools that are very much required while doing any regional data analysis. And further using these developed tools for our research and debugging. So if you are interested in knowing what tool I’m working on, just wait until the next blog post, where I’ll be discussing the idea, scope, and use of my new tool. Until then, goodbye and **happy July!**   



