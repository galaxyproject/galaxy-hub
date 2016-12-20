---
autotoc: true
---
# October 25, 2011 Galaxy Development News Brief

<div class='right'></div>

## Get Galaxy

<div class='left'><a href='http://getgalaxy.org/'><img src="http://galaxy.psu.edu/static/getgalaxy.png" alt="getgalaxy" width="50px" /></a></div>

 **[getgalaxy.org](http://getgalaxy.org)**

* **new**: `% hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist`

* **upgrade**: `% hg pull -u -r 338ead4737ba`

## News

<div class='left'><a href='/src/GalaxyIsHiring/index.md'><img src="/src/images/Icons/PointingFinger.png" alt="pointing-finger" width="30px" /></a></div>
* Keep current on all things Galaxy at our [News](/src/news/index.md) and [Events](/src/events/index.md) wikis.
* Galaxy is still [hiring](/src/GalaxyIsHiring/index.md)!

## What's New

### Galaxy Main

* Data and Job Quotas announced earlier today by email, Galaxy wiki, Twitter, and News Items/RSS feed.
  * [Email](http://lists.bx.psu.edu/pipermail/galaxy-user/2011-October/003467.html) message from the team to galaxy-user and galaxy-dev [mailing lists](/src/MailingLists/index.md).
  * [Main](/src/Main/index.md) wiki with limits, FAQ, and related links.
  * [Managing Datasets](/src/Learn/ManagingDatasets/index.md) wiki contains detailed help to organize, clone, copy, save, and delete unneeded data.
  * [Disk Quotas](/src/Admin/DiskQuotas/index.md) wiki has administrative information on how Galaxy's disk space accounting works, how to keep it up to date, and how to enable and manage quotas
  * Twitter [#galaxyproject](http://twitter.com/#galaxyproject).
  * [Galaxy News](/src/news/index.md) Items and RSS feed.

----
<a href='http://galaxyproject.org/wiki/News'><img src="/src/images/NewsGraphics/2011_10_25_newsitem-quotas.png" alt="width="600px"" /></a>
----


### User Interface (UI)

* Add the ability for a user to log out of all user sessions. Useful when sharing computers, using public computers, and the like.
* Located under top menu bar: User -> Preferences ->*Logout of all user sessions*.

<a href='http://usegalaxy.org/'><img src="/src/images/NewsGraphics/2011_10_25_logout-everywhere.png" alt="logout-everywhere" width="600px" /></a>

### Trackster (Galaxy Track Browser)

* The October 23-24, [BioVis](http://www.biovis.net/) 2011, Providence, Rhode Island, United States, included a talk covering the visualization tool Trackster aka Galaxy Track Browser (GTB). Abstract is [here](http://www.biovis.net/papers_abstracts/papers/111.htmlhere).
* Overview provides chromosome-wide view of a single track independent of primary, interactive view.

<a href='http://usegalaxy.org/visualization/list_published/'><img src="/src/images/NewsGraphics/2011_10_25_trackster-overview.png" alt="trackster-overview" width="600px" /></a>
* Make it possible to set features' transparency based on attribute values.

<a href='http://usegalaxy.org/visualization/list_published/'><img src="/src/images/NewsGraphics/2011_10_25_trackster-transparency.png" alt="trackster-tranparency" width="600px" /></a>
* Introduce track groups, which can be used to cluster and move tracks together. Running tools places new tracks in groups.

<a href='http://usegalaxy.org/visualization/list_published/'><img src="/src/images/NewsGraphics/2011_10_25_trackster-groups.png" alt="trackster-groups" width="600" /></a>
* Enable tools that produce BED output to be used in visual analytics framework and enable GOPS cluster tool to work in Trackster.
* Use Fasta datasets to specify custom build visualizations.

<a href='http://usegalaxy.org/visualization/list_published/'><img src="/src/images/NewsGraphics/2011_10_25_custom-builds.png" alt="custom-builds" width="400px" /></a>

### Python and OS Support

* Python 2.7 is moved from beta to fully supported, any issues with Python 2.7 should be reported and will be addressed.
* Python 2.4 support is officially deprecated and will only be maintained through this stable release and the release following it.
* Eggs are now provided for versions of Python 2.7 for Mac OS X downloaded from python.org with platform string 'py2.7-macosx-10.6-intel-ucs2' (10.6 is the minimum version supported, the platform string is the same on 10.7).

### Galaxy Tool Shed

<div class='left'><a href='http://toolshed.g2.bx.psu.edu/'><img src="/src/images/Logos/ToolShed.jpg" alt="toolshed" width="100px" /></a></div>
* [Search repositories for valid tools by any combination of id, name or version](/src/ToolShed/index.md#search_repositories_for_valid_tools_by_any_combination_of_id2c_name_or_version).
* [Automatic installation of Galaxy tool shed repository tools into a local Galaxy instance](/src/ToolShed/index.md#automatic_installation_of_galaxy_tool_shed_repository_tools_into_a_local_galaxy_instance).
* [Getting updates for tool shed repositories installed in a local Galaxy instance](/src/ToolShed/index.md#getting_updates_for_tool_shed_repositories_installed_in_a_local_galaxy_instance).
* Fixes for displaying file names that include spaces when browsing repository contents.

## Updated & Improved

### Tools

* Add GTF-guide option to the [Cufflinks](http://cufflinks.cbcb.umd.edu/) wrapper.
* Add wrapper for [Trinity](http://trinityrnaseq.sourceforge.net/) tool, the de novo RNA-seq transcript assembler. Available for local or cloud instances only.
* Add wrapper for [SICER](http://home.gwu.edu/~wpeng/Software.htm/) tool, a *Statistical approach for the identification of ChIP-Enriched Regions*.
* Add wrapper for SAMtools [rmdup](http://samtools.sourceforge.net/) tool, which removes potential PCR duplicates in BAM files.
* Add the tool *Text Manipulation -> Secure Hash / Message Digest*:
  * calculates Secure Hashes / Message Digests of a dataset with the user selected algorithms. 
  * [python](http://www.python.org) version of a shell utility ['% sha'](http://en.wikipedia.org/wiki/Secure_Hash_Algorithm).
  * used for verifying that a data load was complete (exact!) and other file quality checking functions.
* Update the *Text Manipulation -> Select random lines from a file* tool:
  * does two passes through input file: first pass determines line offsets/count, offsets are randomly removed, second pass writes out lines by seeking to remaining offsets. 
  * the random seed can now be optionally specified. 
* New assertion-based tests for tool test outputs from John Chilton.  For usage, see the example in the [Tool Config Syntax](/src/Admin/Tools/ToolConfigSyntax/index.md#a3ctest3e_tag_set) documentation.

### Quotas and Data Management

* Various performance and usability enhancements, as well as a fully implemented API for the quota system.
* Documentation at [Disk Quotas](/src/Admin/DiskQuotas/index.md) and [Managing Datasets](/src/Learn/ManagingDatasets/index.md).
* Purged histories were counting in users' disk usage calculations, this has been fixed, so you should rerun `galaxy-dist/scripts/set_user_disk_usage.py` to recalculate usages.
* The time to load the list of saved histories should be greatly improved due to a more efficient query to calculate the sizes of histories in the list
* It's now possible to purge all datasets in a history which are already deleted, as well as purge entire histories that are already deleted.
* Purged histories are now visible in the saved history list, and any history can be viewed before being switched to.

### Source

* Tools that include parameters that are 'dynamic select lists' that refer to local index files (`.loc` files) or entries in the `tool_data_table_conf.xml` file will now all successfully load even if these dependencies are missing.  However, an error message will be displayed in the tool form for these tools conveying information about the missing dependencies.
* Framework for refactoring the UI and actions (implemented by the Quota interfaces, new interfaces should also use this method):
  * UI components now live in subclasses of `BaseUIController and BaseAPIController, themselves subclasses of BaseController`.
  * Actions, i.e. the work performed by choices made in the Web UI or API now live in galaxy.actions, so they can be called cleanly from either interface
  * Parameters passed in the Web UI or API should be parsed in galaxy.web.params.  If standardized across all forms and API methods of a particular model class, these parsers can be generalized quite easily
* Refactor validation of user account data--email, username, password--into own module and use module for validating user data throughout Galaxy.
* Improve GTF sniffing by doing proper parsing of attributes.

### API

* Fully implemented API for managing disk quotas.
* Disk usage now included in user API output.
* API for assigning roles to a data library from John Chilton.
* Encoded IDs of library contents in the Library API are no longer the encoded version of file.<library_dataset.id> and folder.<library_folder.id>.  Instead, the real ID is encoded and if the library content is a folder, the encoded ID is prepended with an 'F'.
* `@web.require_admin` decorator can now be used on API controller methods.
* For `galaxy.model.<model_class>.get_api_value()`, `api_*_visible_keys` can now contain names that are mapped attributes to other model classes (thus allowing for `get_api_value()` recursion to other classes).
* For model classes that can be //marked// deleted but are not actually deleted, a new route mapper can be used which makes deleted objects accessible via their own collection (for details see [changeset/ca6db8f67477](https://bitbucket.org/galaxy/galaxy-central/changeset/ca6db8f67477)).
* New generic scripts `create.py`, `delete.py` and `update.py` in `galaxy-dist/scripts/api/` to perform `POST`, `PUT` and `DELETE` operations in the API (useful for development and debugging).
* Exceptions in the API are now logged instead of passed through to the client.
* API makes much better use of HTTP response codes now.

### Scripts

* "Galaxy ls" from `Simon McGowan` added to the `galaxy-dist/contrib/` directory allows users at sites where Galaxy users match system users to get a list of filesystem paths to their Galaxy data (see the in-file Perl documentation for usage)

### Bug Fixes

<div class='right'><a href='/src/support/index.md'><img src="/src/images/Icons/bug.png" alt="bugs" width="20" /></a></div> 

* Tasked jobs will now inherit the parent job's user information correctly.
* Remove unspecified build validators from Cuffdiff wrapperfixes [https://bitbucket.org/galaxy/galaxy-central/issue/631](https://bitbucket.org/galaxy/galaxy-central/issue/631).
* Remove unspecified build validator from extract_genomic_dna tool (allows custom reference genomes).
* Fix bug in setting Cufflinks' reference annotation.
* Fix bug in cloning a visualization.
* Fix problems with computing indices for GFF/GTF datasets.
* No longer count purged histories in users' disk usage
* Fix Python 2.4 incompatibility broken in the last stable release
* The DRMAA job runner incorrectly included '#-S /bin/bash' in the job template.  This is SGE-specific and should be placed in ~/.sge_request if needed at your site.

----

## About Galaxy

[GalaxyProject.org](http://galaxyproject.org)

The [GalaxyTeam](http://bitbucket.org/galaxy/galaxy-central/wiki/GalaxyTeam/) is a part of [BX](http://www.bx.psu.edu/) at [Penn State](http://www.psu.edu/), and the [Biology](http://www.biology.emory.edu/) and [Mathematics and Computer Science](http://www.mathcs.emory.edu/) departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at Twitter [#galaxyproject](http://twitter.com/#galaxyproject)!
----
