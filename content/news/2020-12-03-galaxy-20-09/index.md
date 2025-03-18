---
title: UseGalaxy.eu update to 20.09
date: '2020-12-03'
tags: [release]
supporters:
- denbi
- elixir
authors: beatrizserrano
authors_structured:
- github: beatrizserrano
subsites: [eu, pasteur, freiburg, erasmusmc, elixir-it, belgium, genouest, esg]
tags: [esg, esg-wp3, esp-wp4]
main_subsite: eu
---

The Galaxy __Release 20.09__ was announced on the 17th of November with plenty of new features. Discover all the details in the [__release notes__](https://docs.galaxyproject.org/en/master/releases/20.09_announce.html). Alternatively, you can watch the video with all the new features, thanks to Gareth Price for recording it!

[![video release 20.09](https://img.youtube.com/vi/dIeXVW_eoJk/0.jpg)](https://www.youtube.com/watch?v=dIeXVW_eoJk)


## New Features

#### GTN in Galaxy

The GTN is now accessible from Galaxy following the graduation cap icon that will activate the interface.

#### Plugin framework for uploading datasets

Galaxy administrators can now configure different sources from which users may upload files. These include global or user-specifc WebDav servers, Dropbox accounts as well as FTP and regular filesystem locations.

![Upload](/assets/media/20.09-upload-search.png)

#### Workflow import from GA4GH TRS servers

Galaxy can now search and import workflows from GA4GH TRS servers, such as Dockstore and WorkflowHub. We hope that sharing workflows on these platforms will facilitate re-use and collaboration.

#### Simplified workflow submission form

Galaxy now presents a simpler and cleaner interface for submitting workflows that focuses on the parameters to set and datasets to choose.

#### Accelerated batch job creation and workflow step scheduling

Galaxy now batches database interactions for the creation of batch jobs. For large batches of jobs this can speed up job creation by 100 fold or more. 

---

If you find issues, please [let us know](mailto:galaxy@informatik.uni-freiburg.de)!
