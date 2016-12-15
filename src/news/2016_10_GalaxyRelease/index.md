---
title: 'October 2016 Galaxy Release (v 16.10)'
date: '12-15-2016'
---

<div class='right'><a href='http://getgalaxy.org'><img src="/src/images/Logos/GalaxyNewLogo_GalaxyProject_Trans.png" alt="GalaxyProject" width="200" /></a></div>

The [Galaxy Committers team](https://github.com/galaxyproject/galaxy/blob/dev/doc/source/project/organization.rst) is pleased to announce the **[October 2016 (v16.10) release of Galaxy](https://docs.galaxyproject.org/en/master/releases/16.10_announce.html)**.

***[Security](https://docs.galaxyproject.org/en/master/releases/16.10_announce.html#security)***
An arbitrary code execution vulnerability in two tools and an XSS vulnerability
with the upload tool were identified this release cycle and have been fixed
concurrently with the release. In addition, the fixes have been backported to
older releases.

The Galaxy Committers would like to thank David Wyde for disclosing these
vulnerabilities. Details follow:

1. The vulnerable tools are “Filter GFF data by attribute” and “Filter GFF data
   by feature count”, both of which are provided with and enabled by default in
   the Galaxy server. These two tools share code with each other and the more
   general “Filter data on any column using simple expressions” tool. The
   latter was fixed in a previous security disclosure but these GFF variants of
   the tool were missed when updating the Filter tool. These tools use the
   Python eval and exec functions and do not properly sanitize input to these
   functions. The fix for this issue has been applied to Galaxy releases back
   to v14.10 and can be found in Commit c1e3087
2. An uploaded file’s name was not properly sanitized, and so a specially
   crafted filename uploaded to the Galaxy server could be used as an XSS
   attack vector. The fix for this issue has been applied to Galaxy releases
   back to v16.07 and can be found in Pull Request 3278.

<br />
***[https://docs.galaxyproject.org/en/master/releases/16.10_announce.html#highlighted-enhancements](Highlighted Enhancements)***
* Overhaul of charts visualization - more visualizations, more options, and better user interface.
* Paginate contents of large histories.
* Implement a collection operation tool for merging collections (thanks to @Takadonet).
* Replace reference documentation for tool XML files with automatically generated documentation from a now official Galaxy XSD documentation (with help from many).
* Add a password strength evaluation bar (thanks to @benfulton).
* Implement a GoDocker job runner (thanks to @varunshankar).
* Support for API batch requests.
* Allow JSONP to be returned from API endpoints.
* Add “Save as” as an option in the workflow editor (thanks to @tmcgowan).
* Allow naming input datasets and collections during workflow extraction.
* Various enhancements for API driven installation of tool shed repositories.

<br />
***[Get Galaxy](http://getgalaxy.org)***

The code lives at [Github](https://github.com/galaxyproject/galaxy) and you should have [Git](https://git-scm.com/) to obtain it.

**To get a new Galaxy repository run:**
```console
$ git clone -b release_16.10 https://github.com/galaxyproject/galaxy.git
```

**To update an existing Galaxy repository run:**
```console
$ git checkout release_16.10 && git pull --ff-only origin release_16.10
```

<br />
On behalf of the [Galaxy Committers](https://github.com/galaxyproject/galaxy/blob/dev/doc/source/project/organization.rst), ***Thanks for using Galaxy!***
