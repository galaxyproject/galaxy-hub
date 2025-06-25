---
title: "Galaxy interactive tools and R Shiny apps"
tease: "Some dreams, mixing synchronous and asynchronous workflows in Galaxy and adding high degree of interactivity into Galaxy thanks to R Shiny are ready to be reality"
authors: "Yvan Le Bras"
date: "2021-11-30"
---

Galaxy interactive Tools (GxIT) are a fantastic way to add interactive webapps into Galaxy. Thanks to recent update of Galaxy core code, now GxIT can be used as common Galaxy tools, so we can notably create workflows combining common tools and GxIT! This open an amazing road towards better integration of synchronous and asynchronous workflows and better collaboration between scientists but also with other kind of participants like citizens ! In the Biodiversity world, there is a particular interest for interactive Shiny apps. Using R {shiny} package, one can either create a "simple" app (a simple visualization page) or a "complex" one (a multi pages complete workflow) directly from R ! Thanks to the Galaxy for Ecology (Galaxy-E) initiative, here are some feedback on the amazing functionality of R Shiny based GxIT creation!

# R Shiny world

In ecology (but not only), R Shiny is a more and more known solution used by scientists to create interactive web applications. Using R {shiny} package, it allows R users to "easily" create an interactive app from R ! We thus see more and more R Shiny apps developped by colleagues and it appears to us of interest to increase the audience of these development proposing a use from Galaxy platform. Particularly, we are thinking about the amazing possibility to mix the use of common Galaxy tools with these interactive ones, but also providing a way to give R Shiny apps developers access to a deployment solution who can facilitate dissemination and accessibility of these apps.

# So where are we?

We developped several R-Shiny apps based GxIT, some "simple" ones related to data visualization like [GEOexplorer](http://bioconductor.org/packages/release/bioc/html/GEOexplorer.html), and several ones "complex" like [radiant](https://shiny.rstudio.com/gallery/radiant.html) for statistical analysis or [Wallace](https://wallaceecomod.github.io/) for Species Distribution Modeling. All these contributions can be seen in our [Github galaxyecology repository](https://github.com/galaxyecology/tools-ecology/tree/master/tools/interactive) and plan to go further (notably adding Shiny GxIT for ecological data / metadata management, see https://github.com/galaxyecology/tools-ecology/pull/53).

We were proposing a dedicated training in 2020 in France thanks to the GEOC (Galaxy Extra-Omics Community), and from this, a Galaxy training material was started, please don't hesitate to comment and give feedback (https://github.com/eancelet/training-material/pull/5) !

This is so amazing to have the possibility to deploy R Shiny apps on several datasets and have the ability to switch from one app to another as seen in this usegalaxy.eu screenshot:

![image](https://user-images.githubusercontent.com/7910679/143906873-b5d1cc7d-2aa5-4950-9473-6e336e4cf5be.png)

Also, creating workflows mixing common Galaxy tools and GxIT is great, as in this example: we propose a workflow to verify and curate data from GBIF so we keep only "human obervation" based data and then apply some filters to finally create GIS shapefile and GeoJSON files plus give the opportunity to explore the data from geoexplorer, radiant, Wallace GxIT but also from OpenRefine Java app or an RStudio instance as seen in this usegalaxy.eu screenshot:

![image](https://user-images.githubusercontent.com/7910679/143908051-5c593c07-0f39-4506-a907-c42f64dc4a0c.png)

Imagine launching this automatic workflows and share the links towards each interactive apps and their resulting populated history so colleagues (and maybe citizens) can "play" with results and propose analysis, new output datasets, or more... Wouldn't it be completely amazing? Technologically, thanks to this GxIT functionnality, this is now possible!

For sure there is a lot to work on to ease all related developers', administrators' as users' oriented steps and increase FAIRness of resulting digital objects. But here we have an amazing basis to pave the way of an exciting future around data exploration and analysis in a highly collaborative way, don't you think so ?

## Some screenshots to tease ;)

Wallace snapshot from usegalaxy.eu 2021-11-29  
First page is explaining the entire workflow of Wallace R Shiny app:
![image](https://user-images.githubusercontent.com/7910679/143903656-f102852a-6b8b-4c99-a382-9fb7f743bca1.png)

An example of Galaxy history occurences data imported in the app:
![image](https://user-images.githubusercontent.com/7910679/143904253-56cffcf9-d209-41ff-8d13-047a83045948.png)

GeoExplorer snapshot from usegalaxy.eu 2021-11-29  
Importing a Galaxy history dataset in the app:
![image](https://user-images.githubusercontent.com/7910679/143904558-633351c0-efe9-413d-8169-33c726f69aba.png)

Selecting a point on the map allows to see associated information on graphs:
![image](https://user-images.githubusercontent.com/7910679/143904700-bc4e0673-e897-4546-a3f6-d91d64627a49.png)

You can also easily change the map appearence:
![image](https://user-images.githubusercontent.com/7910679/143906344-121c2b9d-43e5-4bca-ad30-3bbd77038558.png)



