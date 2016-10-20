---
title: 2013/02: Provide download and indexing of genomes using Galaxy rsync servers
---




<div class='logbox'>
 Topic:: **[Genome download & indexing using Galaxy rsync servers](/src/Community/Log/2013/GenomeDownloadIndexingWithGalaxyRsyncServers/index.md)**
 Date:: 2013/02/21
 Who:: [Brad Chapman](http://www.hsph.harvard.edu/brad-chapman/)
 Resolution:: Python script in [CloudBioLinux](https://github.com/chapmanb/cloudbiolinux).
 Deployment:: 
</div>

Implemented as [a script](https://github.com/chapmanb/cloudbiolinux/blob/master/cloudbio/biodata/galaxy.py) in the [CloudBioLinux GitHub repository](https://github.com/chapmanb/cloudbiolinuxa).

Uses the [CloudBioLinux data framework](https://github.com/chapmanb/cloudbiolinux#biological-data) to install:

```
fab -f data_fabfile.py -H your_machine -c your_fabricrc.txt install_data_rsync:your_biodata.yaml
```


This is still a work in progress and doesn't support all genomes.

## Links

* [Script](https://github.com/chapmanb/cloudbiolinux/blob/master/cloudbio/biodata/galaxy.py)

CategoryLog
