---
title: 'Galaxy for Astronomy: First attempt at astronomical archives integration'
date: "2023-09-07"  
tease: "Enabling astronomers to search and download resources from archives directly into Galaxy"
hide_tease: false
tags: [esg-wp5, esg]
subsites: [all-eu, esg]
main_subsite: eu
---


In a continuing effort to bring astronomical workflows to Galaxy, as part of the EuroScienceGateway project [WP5]([https://galaxyproject.org/projects/esg/news/?tag=esg-wp5](https://galaxyproject.org/projects/esg/news/?tag=esg-wp5)), the [EPFL]([https://www.epfl.ch/en/](https://www.epfl.ch/en/))  and [UPC]([https://apc.u-paris.fr/APC_CS/](https://apc.u-paris.fr/APC_CS/))  have made a first attempt at integrating astronomical archives directly into the Galaxy platform through the development of a specific tool aimed at enabling the discovery and download of astronomy related files.

Relying on community developed software and protocols, like the [IVOA virtual observatory service protocols]([https://www.ivoa.net/](https://www.ivoa.net/)) and the [PyVO]([https://pyvo.readthedocs.io/en/latest/#](https://pyvo.readthedocs.io/en/latest/#)) python library, the tool enables the user to:

-   Choose a specific archive from a list of 138 different archives or query multiple archives matching a specific keyword
    
-   Run custom TAP queries or use the IVOA obscore table query builder
    
-   Preview the content of an archive table through an html report integrated into Galay
    
-   Download a csv file containing access urls of every resources matching a given query
    
-   Download matching files directly into Galaxy
    

This tool has been presented for the first time at the 2023 edition of the Swiss SKA Days by Volodymyr Savchenko, the slides of the presentation are available [here]([]()) and a video demonstrating the tool different features can be found [here]([]())

The tool is available on the Galaxy toolshed at this [url]([https://toolshed.g2.bx.psu.edu/repository?repository_id=5e558af15782f7db&changeset_revision=0ddfc343f9f9](https://toolshed.g2.bx.psu.edu/repository?repository_id=5e558af15782f7db&changeset_revision=0ddfc343f9f9)) and through the built-in toolshed interface inside any Galaxy instance

The possibility to add new features like cone search or the development of a new more interactive tool that would give more freedom to users and make exploring archives easier are also being researched right now
