---
title: "BioBlend v0.5.2 Released"
date: "2014-10-17"
---
[BioBlend](https://github.com/afgane/bioblend) [v0.5.2](https://github.com/afgane/bioblend/blob/master/CHANGELOG.md) has been released.  [BioBlend](https://github.com/afgane/bioblend) is a python library for interacting with CloudMan and the [Galaxy API](/src/learn/api/index.md).  ([CloudMan](/src/cloudman/index.md) offers an easy way to get a personal and completely functional instance of Galaxy in the cloud in just a few minutes, without any manual configuration.)

This is mostly an incremental bug fix release with the following summary of changes:

<div class='right'><a href='/src/cloudman/index.md'><img src="/src/images/logos/CloudManWideBlackLogo.png" alt="CloudMan" width="200" /></a></div>

* [BioBlend.objects](http://bioinformatics.oxfordjournals.org/content/30/19/2816.abstract): enable email & password authorization
* Enable ToolShed tar ball uploads
* BioBlend.objects: allow deletion of history and library datasets
* BioBlend.objects: fixed library dataset downloads
* Fixed the ToolShed tool installation method
* Add 'deleted' attribute to [DatasetContainer](https://github.com/afgane/bioblend/blob/master/bioblend/galaxy/objects/wrappers.py#l678)
* Handle data_type changes in the Oct 2014 Galaxy release
* Renamed get_current_history() to get_most_recently_used_history()
* A number of documentation improvements and other small fixes 

See the [commit messages](https://github.com/afgane/bioblend/compare/d8925715a5a24b738c605eb63f58260479e55700...0e1ed75edc5b474e6dc34e466287cdfb170cde9a) for more details.

Enjoy and please let us know what you think,

[Enis](/src/people/enis-afgan/index.md) & [John](/src/people/john-chilton/index.md) & Simone Leo & Nicola Soranzo & [The Galaxy Team](/src/galaxy-team/index.md)
