---
date: '2013-02-21'
title: "Genome download & indexing using Galaxy rsync servers"
tease: "Python script in CloudBioLinux"
authors: "Brad Chapman"
external_url: "https://github.com/chapmanb/cloudbiolinux/blob/master/cloudbio/biodata/galaxy.py"
source_blog_url: https://github.com/chapmanb/cloudbiolinux/ 
source_blog: "CloudBioLinux Repo"
---

Implemented as [a script](https://github.com/chapmanb/cloudbiolinux/blob/master/cloudbio/biodata/galaxy.py) in the [CloudBioLinux GitHub repository](https://github.com/chapmanb/cloudbiolinuxa).

Uses the [CloudBioLinux data framework](https://github.com/chapmanb/cloudbiolinux#biological-data) to install:

```
fab -f data_fabfile.py -H your_machine -c your_fabricrc.txt install_data_rsync:your_biodata.yaml
```


This is still a work in progress and doesn't support all genomes.

## Links

* [Script](https://github.com/chapmanb/cloudbiolinux/blob/master/cloudbio/biodata/galaxy.py)
