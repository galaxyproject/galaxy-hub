---
title: [GalaxyEast](http://www.galaxeast.fr)
---
<div class='center'>
<a href='http://www.galaxeast.fr'><img src="/src/PublicGalaxyServers/GalaxEast.png" alt="GalaxEast" height="200" /></a>
</div>





<div class='deploymentbox'>
 Deployment:: **[GalaxyEast](/src/Community/Deployment/GalaxEast/index.md)**
 Domain:: Integrative 'omics data analysis
 Owners:: [IGBMC](http://www.igbmc.fr/), [CNRS](http://www.cnrs.fr/), [Inserm](http://www.inserm.fr/), [Université Strasbourg](http://www.unistra.fr/)
 Audience:: Researchers working with 'omics data 
 User Base:: 
 Server Topology:: Cluster
 Compute:: 26 nodes, 400 cores 
 Memory:: 600GB
 Storage:: 
 Disk Size:: 50TB
 User Management:: Open to academic users
</div>

From *[J24: GalaxEast: an open and powerful Galaxy instance for integrative Omics data analysis](ATTACHMENT_URLDocuments/Posters/2014ECCB_GalaxEast.pdf),* poster presented at [ECCB'14](/src/Events/ECCB2014/index.md) by Stephanie Le Gras, Serge Uge, Matthieu Jung, Ludovic Roy, Valerie Cognat, Frederic Plewniak, Irwin Davidson and Julien Seiler:

<div class='indent'>

[GalaxEast](http://www.galaxeast.fr) aims at providing a large range of bioinformatics tools for the analysis of various types of Omics data. It supports reproducible computational research by providing an environment for performing and recording bioinformatics analyses.

The [GalaxEast](http://www.galaxeast.fr) project has the following main objectives:
* Provide the academic scientific community with an open and powerful Galaxy instance with a guaranteed availability. The platform offers access to cutting-edge and up-to-date tools for Omics data analysis with help and support.
* Propose innovative developments and new helpful tools packaged for Galaxy (available in the !GalaxEast toolshed)
* Promote the packaging of new developments for Galaxy (through wrappers and/or toolshed packages).

</div>

## Domain

Integrative Omics data analysis.

## Community

Any academic researcher

## Compute Infrastructure

The compute infrastructure is described in 

 *[J24: GalaxEast: an open and powerful Galaxy instance for integrative Omics data analysis](ATTACHMENT_URLDocuments/Posters/2014ECCB_GalaxEast.pdf),* poster presented at [ECCB'14](/src/Events/ECCB2014/index.md) by Stephanie Le Gras, Serge Uge, Matthieu Jung, Ludovic Roy, Valerie Cognat, Frederic Plewniak, Irwin Davidson and Julien Seiler


### Compute

* ￼Fronted by an FTP and web-load balancing server
* which is backed by 2 Galaxy Web servers, 2 job handlers, and a Slurm cluster master node
* which is backed by a high-performance computing cluster with
  * 26 cluster nodes
  * 400 CPU cores
  * 600 GB RAM

### Storage

* 50 TB

### Network

Uses a web-load balancer to distribute incoming requests to two Galaxy web servers.

## User Management

Anonymous access is supported, but storage is limited. Any academic user can obtain a login.

### Authentication and Billing

* Data transfers are performed through FTPS
* All dataset files are anonymized
* All cluster jobs are anonymized
* All datasets are visible ONLY by the owner
* Database server and compute cluster are accessible from the internet

### Quotas

Anonymous access is supported, but storage is limited to 10 MB

Any academic user can obtain a login, and with it 50GB of storage.

## Customizations

[GalaxEast](http://www.galaxeast.fr) implements new bioinformatics developments and tools for:
* Data manipulation
* NGS data analysis for ChIP-seq
* Genomic database querying tool to request the GEO Profiles database
* De-noising methods for spectroscopic data (urQRd)

Available in the [GalaxEast Toolshed](http://toolshed.galaxeast.fr/).

## Limitations and Challenges

### Configuration and Setup

### Maintaining and Meeting Needs

## Links

* [GalaxEast Server](http://www.galaxeast.fr)
* [GalaxEast poster](ATTACHMENT_URLDocuments/Posters/2014ECCB_GalaxEast.pdf) from [ECCB'14](/src/Events/ECCB2014/index.md)
* [GalaxEast Toolshed](http://toolshed.galaxeast.fr/)
* [GalaxEast entry](/src/PublicGalaxyServers/index.md#galaxeast) in [Public Galaxy Servers list](/src/PublicGalaxyServers/index.md)

CategoryDeployment
