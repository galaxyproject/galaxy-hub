---
title: PHAC NML Galaxy
---
<div class='center'>
<a href='https://www.nml-lnm.gc.ca/index-eng.htm'><img src='/MapleLeaf.png' alt='Public Health Agency of Canada - National Microbiology Laboratory' height="200" /></a>
</div>





<div class='deploymentbox'>
 Deployment:: **[PHAC NML Galaxy](/src/Community/Deployment/PHACNML/index.md)**
 Domain:: NGS analysis: Molecular Epidemiology, metagenomics, viral and bacterial genomics, custom tools.
 Owners:: [PHAC NML Bioinformatics Corefacility](https://www.nml-lnm.gc.ca/index-eng.htm)
 Audience:: Public Health Agency of Canada Scientists, international and local Collaborators and stakeholders
 User Base:: 135 registered users and 54 active users (within last 30 days)
 Server Topology:: 2 virtual (1 web, 1 worker), cluster
 Compute:: 2320 CPU cores
 Memory:: 4640 GB
 Storage:: NFS
 Disk Size:: 769 TB
 User Management:: Users who can access the system can create their own accounts
</div>

For Our Health - as Canada’s leading public health infectious disease laboratory, the [National Microbiology Laboratory (NML)](https://www.nml-lnm.gc.ca/index-eng.htm) is responsible for the identification, control and prevention of infectious diseases.

The NML is located at the [Canadian Science Centre for Human and Animal Health](https://en.wikipedia.org/wiki/Canadian_Science_Centre_for_Human_and_Animal_Health) in Winnipeg, the first facility in the world to have high containment laboratories for human and animal health in one building. It is recognized as a leader in an elite group of centres around the world, equipped with laboratories ranging from biosafety level 2 to level 4 designed to accommodate the most basic to the most deadly infectious organisms.

The NML is Canada's main infectious disease public health laboratory with responsibility for reference microbiology and quality assurance, laboratory surveillance for infectious diseases, emergency outbreak preparedness and response, training, and research and development.

Galaxy has been deployed at the NML since 2010, gaining further traction in 2012, and hitting 100,000 jobs per month in 2016.

## Domain

NGS analysis: Molecular Epidemiology, metagenomics, viral and bacterial genomics, custom tools.

## Community

[Public Health Agency of Canada](http://www.phac-aspc.gc.ca/) Scientists, international and local Collaborators and stakeholders

## Compute Infrastructure

### Compute

* 1 Galaxy Web server
* 1 Galaxy Handler server with 7 handlers (3 dedicated to upload jobs
* High-performance computing cluster with
  * 50 cluster nodes
  * 2320 CPU cores
  * 4640 GB RAM

### Storage

* 769 TB

### Network

## User Management

Any user who has access to our network can create an account.

### Authentication and Billing

* All dataset files are anonymized
* All cluster jobs are anonymized
* All datasets are visible ONLY by the owner
* Database server and compute cluster are accessible from within our network

### Quotas

Every user is given 2TB quota by default.

## Customizations

PHAC NML Galaxy uses [Dynamic Tool Destination](https://github.com/phac-nml/dynamic-tool-destination) to better match jobs to resources and assign user priorities to help with job balance during outbreaks.

## Links

* [PHAC NML Galaxy Tools](https://github.com/phac-nml/galaxy_tools)
* [Dynamic Tool Destination](https://github.com/phac-nml/dynamic-tool-destination)

CategoryDeployment
