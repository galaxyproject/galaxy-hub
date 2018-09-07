---
title: 'October 2016 Galaxy Release (v 16.10)'
date: '2016-12-15'
---
<div class='right'><a href='http://getgalaxy.org'><img src="/src/images/logos/GalaxyNewLogo_GalaxyProject_Trans.png" alt="GalaxyProject" width="200" /></a></div>

The [Galaxy Committers team](https://github.com/galaxyproject/galaxy/blob/dev/doc/source/project/organization.rst) is pleased to announce the **[October 2016 (v16.10) release of Galaxy](https://docs.galaxyproject.org/en/master/releases/16.10_announce.html)**.

## [Security](https://docs.galaxyproject.org/en/master/releases/16.10_announce.html#security)

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

## [Highlights](https://docs.galaxyproject.org/en/master/releases/16.10_announce.html#highlights)

* **Galaxu UI plugins - Webhooks:** We introduce Galaxy Webhooks - optional plugins for the web UI that allow for better customization of your instance. See the documentation. Includes work from @bgruening, @anatskiy, and Joachim Wolff @joachimwolff.
* **Workflow run form replaced:** The workflow run form has been replaced by one backed by the new tool form and the API. Nicer, faster, standardized.
* **Automatic tool reload after installation:** Galaxy does not need to be restarted after tool installation anymore. This provides a smoother experience for the users. Yay! Thanks to @mvdbeek.

## [Get Galaxy](http://getgalaxy.org)

The code lives at [Github](https://github.com/galaxyproject/galaxy) and you should have [Git](https://git-scm.com/) to obtain it.

**To get a new Galaxy repository run:**
```console
$ git clone -b release_16.10 https://github.com/galaxyproject/galaxy.git
```

**To update an existing Galaxy repository run:**
```console
$ git checkout release_16.10 && git pull --ff-only origin release_16.10
```

## [Release Notes](https://docs.galaxyproject.org/en/master/releases/16.10_announce.html)

For full details on all of the enhancements and fixes in this release, please see the [full release notes](https://docs.galaxyproject.org/en/master/releases/16.10_announce.html).

<br />
On behalf of the [Galaxy Committers](https://github.com/galaxyproject/galaxy/blob/dev/doc/source/project/organization.rst), ***Thanks for using Galaxy!***
