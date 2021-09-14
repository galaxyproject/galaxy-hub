---
title: 'Galaxy Release 18.09'
tease: Workflow Enhancements, Group Tags, and Python 3 Beta Support
date: '2018-10-26'
---
We are pleased to announce the **[release of Galaxy
18.09](https://docs.galaxyproject.org/en/release_18.09/releases/18.09_announce.html)**.
A few release highlights are:

Extensive Workflow Enhancements
-------------------------------

Workflows got a lot of love this time around, with new runtime parameters for
subworkflows, exposed workflow versions, and zoom capability in the editor, to
name a few. There were also a number of usability enhancements including better
labeling, links, overhauled workflow import interfaces, and many more.

Group Tags
----------

Galaxy now contains powerful new features for multiple factor analysis of
collections of datasets. The concept of group tags has been added to Galaxy.
These are a special class of tags that describe key-value pairs that can be
attached to the contents of a collection during upload or using collection
operation tools. These tags can describe multiple sets of variables for the
contents of a collection. Once set, these tags can be consumed intelligently by
tools that need to divide collections into multiple overlapping factors or sets
of datasets. A special thanks to @mvdbeek for devising and implementing this
approach.

Python 3 Beta Support
---------------------

After almost 3 years of work and more than 100 pull requests, we are proud to
announce the Beta-stage support for running Galaxy under Python 3. Lint, unit,
API, framework, integration and Selenium tests all pass, time for you to give
it a try and report any bug you find!


Please see the [full release
notes](https://docs.galaxyproject.org/en/release_18.09/releases/18.09_announce.html)
for more information, including how to upgrade today!

_Thanks for using Galaxy!_
