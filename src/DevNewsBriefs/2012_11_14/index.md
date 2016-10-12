---
autotoc: true
pagetitle: November 14, ,,  2012 Galaxy Development News Brief
---
<div class='right'></div>



<br />
# Get Galaxy

<table>
  <tr>
    <td rowspan=3 style=" border: none;"> <a href='http://getgalaxy.org/'><img src='http://galaxy.psu.edu/static/getgalaxy.png' alt='getgalaxy' width=70 /></a> &nbsp;&nbsp; </td>
    <td colspan=2 style=" border: none;"> <strong><a href='http://getgalaxy.org'>getgalaxy.org</a></strong> </td>
  </tr>
  <tr>
    <td style=" border: none;"> <strong>new</strong>: </td>
    <td style=" border: none;"> <code> $ hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist </code> </td>
  </tr>
  <tr>
    <td style=" border: none;"> <strong>upgrade</strong>: </td>
    <td style=" border: none;"> <code> $ hg pull -u -r 5dcbbdfe1087 </code> </td>
  </tr>
</table>


<br />
<br />

# Picard Migration to Tool Shed

The tools in the group **NGS: Picard (beta)** have moved from the **[Galaxy distribution](https://bitbucket.org/galaxy/galaxy-dist)** to the **[Galaxy Main Tool Shed](http://toolshed.g2.bx.psu.edu/)**.

<div class='right'><a href='http://toolshed.g2.bx.psu.edu'><img src='/Images/Logos/ToolShed.jpg' alt='tool shed' width="150px" /></a></div>

Migration scripts will run upon Galaxy's first launch (after updating to this release) that will automatically handle installing the Picard tool wrappers from the Tool Shed. **[Picard](http://bio-bwa.sourceforge.net/)** itself and target reference genomes should still be installed as described in the Galaxy wiki - start in the [Tool Dependencies](/Admin/Tools/Tool Dependencies) section.

**[Picard](http://picard.sourceforge.net/)** comprises Java-based command-line utilities that manipulate SAM files, and a Java API (SAM-JDK) for creating new programs that read and write SAM files. Both SAM text format and SAM binary (BAM) format are supported. More about **[SAM](http://wiki.galaxyproject.org/Learn/Datatypes#SAM)** and **[BAM](http://wiki.galaxyproject.org/Learn/Datatypes#BAM)** format.

<br />
## Galaxy Code Documentation Now Available

<div class='right'> <a href='http://sphinx-doc.org/'><img src='/Images/Logos/SphinxLogo333.png' alt='Sphinx Python Documentation Generator'  /></a></div>

The **Galaxy Project** is now using the *[Sphinx](http://sphinx-doc.org/) Python* document generator to automatically generate documentation for the code base.  The documentation describes classes and methods (and much more) in the code base.  It also includes [Python docstrings](http://www.python.org/dev/peps/pep-0257/) from the code.

Two versions of the documentation are available:

* **[galaxy-dist.readthedocs.org](http://galaxy-dist.readthedocs.org)**
    This documentation describes the code in the [most recent stable release](/DevNewsBriefs) of Galaxy ("galaxy-dist").

* **[galaxy-central.readthedocs.org](http://galaxy-central.readthedocs.org)**
    This documentation describes what is currently in the main development branch ("galaxy-central") of Galaxy.  Code updates are automatically propagated from Galaxy's !BitBucket.org repository.  This should never be more than 15 minutes out of date.

<div class='right'><a href='http://readthedocs.org'><img src='/Images/Logos/ReadTheDocsLogo.png' alt='Read the Docs'  /></a></div>

Both versions are hosted at [Read the Docs](http://readthedocs.org), a community supported web site for code documentation.

If you have made your own local extensions to Galaxy, you can also generate your own local copy of the documentation by going to your `doc` directory and entering

  `make html`


Please note that this is the first release of this documentation and it is far from where we want it to be.  We aim to have the documentation improve incrementally with every new distribution.

<br />
# Tool Shed
**[/Tool Shed](/Tool Shed)**

### Tool Shed Enhancements inside of Galaxy

1. When migrating tools:
  * Fail gracefully if `install_dependencies` is requested, but `tool_dependency_dir` is not set.
  * If only some tools will be installed, list the ones that won't be enabled.

### A single tool or a suite of tools per repository  ?

Many tool developers in the Galaxy community question the best way to organize tools in their tool shed repositories. Some groups have developed a large number of tools to allow their labs to perform analyses in Galaxy and took the approach of including all related tools in a single repository in the [Tool Shed](http://toolshed.g2.bx.psu.edu/).  Others have chosen to restrict each repository to include a single tool.  

Which is the *** "best practice" *** ? [Read more…](http://wiki.galaxyproject.org/AToolOrASuitePerRepository).

### New tool shed repository features

1. The **Intergalactic Utilities Commission** will soon begin reviewing repositories in the **[Galaxy Main Tool Shed](http://toolshed.g2.bx.psu.edu/)**

<div class='indent'>
The **Intergalactic Utilities Commission (IUC)** was established in late 2012 to enable the pervasive use of the **[Galaxy Main Tool Shed](http://toolshed.g2.bx.psu.edu/)** by ensuring the repositories available in the tool shed include contents that are functionally correct and optimized for installation into **local Galaxies**.  When appropriate, guidance is provided to repository owners so that they can understand what changes are necessary for their repository to be approved.

The features described in this document enable tool shed repositories to ultimately be flagged as "Approved" by the **IUC**.  If a repository is ** "IUC Approved" **, then those installing the repository should have a certain level of comfort that it's contents are functionally correct in all appropriate areas. [Read more…](http://wiki.galaxyproject.org/ReviewingToolShedRepositories)
</div>
1. #2 Marking a repository you own as deprecated
<div class='indent'>
Certain repository contents may occasionally become outdated, perhaps due to other repositories with tools that replace the outdated tools.  The tool shed enables repository owners to mark a repository as deprecated if they so choose.  Many of the features available to repositories not marked as deprecated are eliminated from repositories that are, and deprecated repositories are not included in most tool shed repository lists or searches.  However, those that installed a repository into their local Galaxy instance before it was marked as deprecated can get appropriate updates to their locally installed repository. [Read more…](http://wiki.galaxyproject.org/ToolShedRepositoryFeatures#Marking_a_repository_you_own_as_deprecated).
</div>
### Miscellaneous tool shed enhancements and fixes

1. Enhancements to the `tool_config_file`; thanks to [John Chilton](http://bitbucket.org/jmchilton))
  * Galaxy now loads tool sections from multiple files in a more consistent manner, and 
  * Directories can now appear as a `tool_config_file` option

2. Allow non-admin users to see metadata revisions when viewing a repository `changelog` in the tool shed.

3. Add **help text** to the tool shed repository upload form to advise contributors of recent enhancement allowing for mercurial repository urls staring with `hg://` or `hgs://` ; inspired by [John Chilton](http://bitbucket.org/jmchilton).

4. New support for installation of tool dependencies that are zip archives when installing repositories from the tool shed; contributed by [Björn Grüning](http://bitbucket.org/BjoernGruening). 
<div class='indent'>Here's an example `<action>` tag in `tool_dependencies.xml` showing this new supported type:
```
<action type="download_by_url">http://downloads.sourceforge.net/project/picard/picard-tools/1.56/picard-tools-1.56.zip</action>
```
</div>
5. #5 Fix for determining the extraction directory for tool dependency tarballs when installing tool dependencies along with tool shed repositories.
6. #6 HTML escape values that could be set by the user, prevents XSS.

<br />
# Tools
[Tool Dependencies](/Admin/Tools/Tool Dependencies)

1. Enable **[Tophat](http://tophat.cbcb.umd.edu/)**, **[Tophat2](http://tophat.cbcb.umd.edu/manual.html)**, and **[Cuffdiff](http://cufflinks.cbcb.umd.edu/manual.html#cuffdiff)** to accept gene annotations in **[GFF3](http://wiki.galaxyproject.org/Learn/Datatypes#GFF3)** format; thanks to [Jim Johnson](http://bitbucket.org/jjohnson).
2. Make unordered **[GTF](http://wiki.galaxyproject.org/Learn/Datatypes#GTF)** parsing more lenient by default, allowing for parsing of 'imperfect' GTF datasets not in strict specification format.
3. New warning given when loading a ` .. / tool-data / *.loc ` file with an inconsistent numbers of tabs; contributed by [Peter Cock](http://bitbucket.org/peterjc).
4. Allow **Rerun** ![](/Images/Icons/arrow-circle.png) to access hidden datasets.
5. Enhance **[GenomeSpace](http://www.genomespace.org)** import tools to display a better history item name.

<br />
# API

1. **api/users.show**: added 'current' as viable id to display json for the current transaction's user.
2. **api/users.show, index**: added key 'quota_percent' to json, returns null if no quota on user, percent otherwise.
3. **api/history_contents**: allow anon-user to query own, current history; improve doc string.
4. **api/history_contents.index**: if passed a comma separated list of encoded hda ids on the query string
  (e.g. ids=id1,id2,...) in query string, provides full data (as history_contents.show) for each id listed.
  If 'ids' isn't used: returns 'summary' behavior as before.
5. **api/history_contents.show**: return 'accessible', 'api_type' (consistent with summary style in index), 'display_types',
  'display_apps', 'file_ext', 'hid', 'history_id', 'meta_files' (file types of associated files for generating download
  urls, eg. myBam.meta_files: [{ 'file_type' : 'bam_index' }]), 'visualizations' (list of visualization names appr. for this hda),
  'peek' (data.peek as used in the history panel)
6. **api/histories.show**: added 'nice_size', 'annotation', 'state_ids' (map of possible hda states : lists of hda ids in
  those states ), reorder history state from child hda states (running/queued higher priority than error).

<br />
# Source

1. **Reloading a tool** now automatically populates the field for resubmission, making it easier to continually reload a tool when developing. Pull Request: Tool reload improvements, [#72](https://bitbucket.org/galaxy/galaxy-central/pull-request/72/ease-tool-development-by-reducing-clicking/diff); contributed by [John Chilton](http://bitbucket.org/jmchilton).
2. **Tabular Display**: 'list' column type is now left-aligned, making it easier to view certain datatypes.
3. **Cloudlaunch**: Automatically detect placement AZ of volumes from existing clusters, and launch using those placements.  This prevents any * "CRITICAL: This instance must be relaunched in zone..." * at **[Cloudman](http://usegalaxy.org/cloud)** start.  Also fixed a bug where non-keyboard paste wasn't detected during the cluster lookup step.

<br />
# Security Fixes
All Galaxy instance maintainers are *strongly encouraged* to run the latest release.

1. Recent library browsing optimizations were retracted due to minor security vulnerability: a UI bug that allowed users to see listings of inaccessible datasets. Access was limited to viewing named dataset lists, no "peek" or "full" dataset viewing, download, coping, or any other privileges were granted. Once corrected, the library enhancements will be re-released in a future distribution.
2. Prevent potential reflected XSS via *!MessageException* (possible in the case of invalid/malicious id lookups, for instance).
3. Sanitize grid filters.

<br />
# Bug Fixes

1. Tweak for functional tests of **[BAM](http://wiki.galaxyproject.org/Learn/Datatypes#BAM)** outputs when run on a Macintosh OS.

<br />
# Announcements

[/News](/News), ***[November 2012 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2012_11)***

### Highlights

<div class='right'><a href='http://bit.ly/PmKgUI'><img src='/Images/Logos/PhylotasticLogo.png' alt='Phylotastic Hackathon' width="150" /></a></div>
* There are now [over 500 papers in the Galaxy CiteULike Group](http://www.citeulike.org/group/16008/library)
* Phylogenies! Hacking! Tucson in January! And, hopefully Galaxy too. If you are interested in coding, phylogenies, and tool integration please take a look at the [Phylotastic Hackathon Announcement](http://dev.list.galaxyproject.org/phylotastic-hackathon-Jan-28-Feb-1-Tucson-AZ-of-possible-interest-to-galaxy-developers-td4656850.html). Apply by ***November 16*** (that's this *Friday!!*).

### Find a great Galactic job!

<div class='right'>![Please Help!  Yes you!](/Images/Icons/PointingFinger.png)</div>

* [Engineer position in bioinformatics: structural polymorphism analysis from NGS data](http://bit.ly/TEQvzd) @ [UMR de Génétique Végétale, INRA-Université Paris Sud-CNRS](http://moulon.inra.fr/index.php/fr/equipestransversales/atelier-de-bioinformatique)
* [R/Bioconductor and Genomics Expert](http://bit.ly/T1QOZP) @ the [Friedrich Miescher Institute](http://www.fmi.ch/), affiliated with the University of Basel.
* [Bioinformatics Analyst](http://bit.ly/Y8x5Jb) @ Harvard School of Public Health
* [Computational Biologist](http://bit.ly/R2ZJoW) @ the [Harvard Stem Cell Institute's (HSCI)](http://www.hsci.harvard.edu/)[Center for Stem Cell Bioinformatics](http://www.hsci.harvard.edu/research/center-stem-cell-bioinformatics)
* [Bioinformatician/Statistician opening](http://bit.ly/X7Hl30) at EMBL Heidelberg, Germany  
* [offre CDD INRA Versailles](http://bit.ly/TKoV9h) - developpement chaine de traitements !RnaSeq sous Galaxy - France Genomique
* The [Galaxy Project is hiring](/GalaxyIsHiring) post-docs @ Penn State and Emory

Got a Galaxy-related opening?  Send it to outreach@galaxyproject.org.

<br />
---
<br />
# About Galaxy
**[GalaxyProject.org](http://galaxyproject.org)**

The **[Galaxy Team](http://wiki.galaxyproject.org/GalaxyTeam)** is a part of **[BX](http://www.bx.psu.edu/)** at [Penn State](http://www.psu.edu/), and the **[Biology](http://www.biology.emory.edu/)** and **[Mathematics and Computer Science](http://www.mathcs.emory.edu/)** departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at **Twitter [@galaxyproject](http://twitter.com/#galaxyproject)** or just read our tweets **[Galaxy on Twitter](http://wiki.galaxyproject.org/Galaxy on Twitter)**
