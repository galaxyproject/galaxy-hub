<div class='right'>TABLE_OF_CONTENTS(1)</div>

[All News Briefs](/DevNewsBriefs)
<br />
[Distribution Summary 2014_02_10](/News/2014_02_10_Galaxy_Distribution)

<br />
<div class="title">February 10, 2014 Galaxy Distribution News Brief</div>

<br />
# Get Galaxy
<table>
  <tr>
    <td rowspan=3 style=" border: none"> <a href='http://getgalaxy.org/'><img src='http://galaxy.psu.edu/static/getgalaxy.png' alt='getgalaxy' width=70 /></a> &nbsp;&nbsp; </td>
    <td colspan=2 style=" border: none"> <strong><a href='http://wiki.galaxyproject.org/Admin/Get%20Galaxy'>getgalaxy.org</a></strong> </td>
  </tr>
  <tr>
    <td style=" border: none"> <strong><a href='http://galaxy-dist.readthedocs.org'>galaxy-dist.readthedocs.org</a></strong> </td>
    <td style=" border: none"> </td>
  </tr>
  <tr>
    <td style=" border: none"> <strong><a href='http://bitbucket.org/galaxy/galaxy-dist'>bitbucket.org/galaxy/galaxy-dist</a></strong> </td>
    <td style=" border: none"> </td>
  </tr>
  <tr>
    <td style=" border: none"> </td>
  </tr>
  <tr>
    <td style=" border: none"> <strong>new</strong>: </td>
    <td style=" border: none"> <code>$ hg clone https://bitbucket.org/galaxy/galaxy-dist#stable </code> </td>
  </tr>
  <tr>
    <td style=" border: none"> <strong>upgrade</strong>: </td>
    <td style=" border: none"> <code>$ hg pull </code> <br /> <code>$ hg update release_2014.02.10 </code> </td>
  </tr>
</table>

<br />

<br />
# Upgrades
* **Review instructions for core build: [Getting the Stable Distribution](http://getgalaxy.org)**
* **Review reset for Tool Shed repos: [Resetting Metadata For Installed Repositories](http://wiki.galaxyproject.org/ResettingMetadataForInstalledRepositories)**


<br />
# Tool Migrations
### Galaxy Tool Migrations
**This release includes additional *tools* that have been migrated from the Galaxy distribution to the Tool Shed**.  

As in prior releases, Galaxy tool migration framework has been enhanced so that tool entries in the `tool_conf.xml` file for tools that were [migrated out of the Galaxy distribution](http://wiki.galaxyproject.org/MigratingToolsFromGalaxyDistribution#Migrating_tools_from_the_Galaxy_distribution_to_the_Galaxy_Main_tool_shed) are now automatically eliminated during the migration process.  

* It is no longer necessary to manually edit the `tool_conf.xml` file to eliminate entries for migrated tools.  
* A back-up copy of the original `tool_conf.xml` file is made.
* Associated files, such as location sample files (".loc"), are also removed from the distribution.
* The list of migrated tools can be found here: *[migrated 009](https://bitbucket.org/galaxy/galaxy-central/src/694411e94d9aa26c9b9a2c13567b2b5e07f74580/lib/tool_shed/galaxy_install/migrate/versions/0009_tools.py?at=default)*


<br />
# Tools & Data
1. *GenomeSpace*: Improved import when initiated from within Galaxy. https://trello.com/c/maFhnXpN
1. *DataProviders*: See http://wiki.galaxyproject.org/DataProviders https://trello.com/c/Qic2fVPE
1. *Cuffdiff*: A read_group.info dataset is now included in the output. https://trello.com/c/FdUYdbIn


<br />
# Visualizations
1. *Phyloviz*: Saving as visualization corrected. https://trello.com/c/dzBmbyqF
1. *Scatterplot*: Improvements to large data loading. https://trello.com/c/8or6FdE2
1. *Trackster*: 
  * Standalone web application(s) for visualizations. https://trello.com/c/i0yW8IgQ
  * Correct issue where attempting to set a custom build that has not finished processing resulted in unrecoverable infinite recursion. https://trello.com/c/AWyQSQ8F
  * CSS styling improvements include:
    * overlaying track header on track data to compress track height; this enables more data to be viewed simultaneously
    * grayscale drawing for mapped reads so that variation can easily be seen
    * using colors to denote track state (e.g. pending, error, etc.)
<a href='http://usegalaxy.org'><img src='/Images/NewsGraphics/2014_02_10_trackster-css.png' alt='Trackster' width="800" /></a>


<br />
# Workflows
1. Implement default parameters. https://trello.com/c/SRxD991Y
1. Allow overriding parameters when running a workflow. https://trello.com/c/ZbPzTpAl
1. API should have a way of querying published workflows and using/importing them. https://trello.com/c/LDm3dQvB


<br />
# UI
1. Moved history panel (history.mako; base_panels.mako) from iframe implementation to base_panels DOM. Correct implementation issues. https://trello.com/c/a67ciYUI https://trello.com/c/UejOR6q2
1. Multiple upgrades to history panel. https://trello.com/c/P487gwJh
1. Refactor grids.js into a Backbone view. https://trello.com/c/Mwrvm0ia
1. Moved tag UI/model into api/backbone.js (includes histories & others). https://trello.com/c/V288lfw3
1. Data Libraries Beta (existing; enhancements in progress). https://trello.com/c/hLL9G2nf
1. Interface update to use *font-awesome 4.0*. https://trello.com/c/BC8uYRv8
1. In upload tool sort FTP files by default. https://trello.com/c/lLllt80V
1. Masthead update: create a backbone-based masterhead class. https://trello.com/c/VqigSrtP
1. General UI: provide a backbone class for the modal dialog box. https://trello.com/c/bk11oSS2
1. Clearer visualization and workflow UI cues and usage/error messages for anonymous users (e.g. login required). https://trello.com/c/pgt8UzgU https://trello.com/c/yW6x44xp


<br />
# API
1. Resolved behavior of fetching tool when provided id differed between API and UI. https://trello.com/c/he1Tm4kK
1. Resolved API histories/set_as_current bad method signature. https://trello.com/c/knnIWf5Y
1. Support repeat and conditional in tool execution API. https://trello.com/c/iZ9TBhog
1. New master admin API key, managed through admin panel. https://trello.com/c/pHByKw22 https://trello.com/c/421tElw3
1. Allow `BaseAuth` request to retrieve API key. https://trello.com/c/g5N4ZezT
1. Add API functionality for creating users using stock Galaxy auth and assigning users API keys. https://trello.com/c/RGuTBsJy
1. Introduce new generation of API decorator with tested methods in histories API. https://trello.com/c/pIsyZmST
1. If master_api_key set, allow it to run_as if any user can run_as. https://trello.com/c/OoHNhCNb
1. Fix for optional input handling in provenance API. Jim Johnson. https://trello.com/c/JPVR5SFt


<br />
# Core
1. Refactor Tool testing framework to use API. https://trello.com/c/MsJctFem https://trello.com/c/wL21d2do
1. Basic composite datatypes now work as test outputs. https://trello.com/c/Vedel3J4
1. Allow overriding composite type main file in archives. Peter Cock. https://trello.com/c/8XeDQEaG
1. Disambiguated conditional parameters now supported in functional tests. https://trello.com/c/zSTrfDOB
1. Requirements tags need to be specified for each implicit datatype converter with dependencies. https://trello.com/c/b2zg3dfP
1. Improve Libraries security for data downloads. https://trello.com/c/bWPbQzhV
1. Update tools to use GALAXY_SLOTS. https://trello.com/c/qq3Ryr6J
1. Detect jobs that hit the DRM walltime and provide clear feedback to the user. https://trello.com/c/BzlFmhiD
1. Tool dependencies should fallback to default version. https://trello.com/c/flcNPQLR
1. Remove references to *g2.trac.bx.psu.edu*. https://trello.com/c/Pl5JJKZT
1. History import now includes option to import deleted/hidden datasets. https://trello.com/c/TgcdNEE7 https://trello.com/c/FS8t1jX9
1. Flag for archive_composite_dataset() to assume/not the primary file of a composite dataset is html. https://trello.com/c/qlrYdyzT
1. Properly handle DRMs that remember finished jobs. https://trello.com/c/9hw0K6QZ
1. Allow adjusting the reset password length in unvierse_wsgi.ini. https://trello.com/c/t0Ag4kXU
1. Remove all usage of simplejson, use stdlib json. https://trello.com/c/2yhBhRC2
1. Allow core Galaxy models and install tool dependencies to target different databases. https://trello.com/c/V0jDdJBk
1. Allow setting metadata remotely with the LWR. https://trello.com/c/M3i6tlU4


<br />
# Pull Requests Merged
Thanks to our Galaxy community contributors!
1. 285 - Make to_dict method stringify non-JSONable objects. Kyle Ellrott. https://trello.com/c/fzea3Km9
1. 296 - Adding update_time to dataset to_dict methods. Kyle Ellrott. https://trello.com/c/dEz6n55E
1. 253 - Add API call to allow for deletion/purge of dataset in a data library. Philip Mabon. https://trello.com/c/3stOCbEi
1. 283 - Add <version_command> to tool configuration options. Gianmauro Cuccuru. https://trello.com/c/soOJVIdd
1. 254 - Fixes for min/max <param> attributes. Nicola Soranzo. https://trello.com/c/HSzlZn3t https://trello.com/c/E19F2DCl
1. 171 - Avoid corruption of binary files embedded in gzip, bz2 and zip archives in the upload tool. Gert Hulselmans. https://trello.com/c/1LbQtxYs https://trello.com/c/zgAT56XH
1. 321 - Fix crash when recovering jobs of a removed tool. A. Bretaud. https://trello.com/c/Mk28MZdI
1. 304 - Add missing requirement tags. Björn Grüning. https://trello.com/c/DMjCdlle
1. 306 - Fix typo and reduce duplication in workflow API. Nicola Soranzo. https://trello.com/c/VW5cKDjD
1. 303 - Fix display_application with login_required=True. Björn Grüning. https://trello.com/c/Vu4hiEZu
1. 302 - In case of proxy-prefix configuration the $PATH_TO_IMAGES is not correctly converted. Removing the beginning Slash solves it for proxy-prefix configurations and other are not affected. Björn Grüning. https://trello.com/c/oFYlaAWo
1. 299 - Add `ProxyHandler` to auto-detect system proxies. Saket Choudhary. https://trello.com/c/WpXmyngn
1. 298 - API: display and import workflows shared by other users. Nicola Soranzo. https://trello.com/c/H2yxkezA
1. 280 - Web API: fix unhandled exception when exporting a workflow with missing tools. Simone Leo. https://trello.com/c/GFgl6Gah
1. 284 - Log a failed chmod action when installing tool dependencies. Nicola Soranzo. https://trello.com/c/cz4ahDPi
1. 282 - Extended Metadata for History Datasets. Kyle Ellrott. https://trello.com/c/4bUllR9w
1. 277 - Add elements to the API to allow for the creation of pages and revisions. Kyle Ellrott. https://trello.com/c/sjdlldWg
1. 276 - Some minor select field changes including Illumina 1.8+. yhoogstrate. https://trello.com/c/mXHHRhwG
1. 262 - Convert other 3 tools to $GALAXY_SLOTS. Nicola Soranzo. https://trello.com/c/d2YvRM7O
1. 257 - Adding requirement tag to the ccat wrapper and remove old ccat2 wrapper. Björn Grüning. https://trello.com/c/EdrYaNqB
1. 261 - Adding history_id selection to hda search. Kyle Ellrott. https://trello.com/c/B82liT7g
1. 266 - Adding Pages and `PageRevisions` to the search API. Kyle Ellrott. https://trello.com/c/5xsd5kNX https://trello.com/c/ch2COcm3
1. 271 - Fixes for MOSAIK tool. Nicola Soranzo. https://trello.com/c/tcYDdJT6
1. 267 - Fix for permission issues in drmaa_external_runner.py. Frederik Delaere. https://trello.com/c/BCirrf32
1. 264 - Fix API workflow show for workflows created with history Extract Workflow. Nicola Soranzo and Simone Leo. https://trello.com/c/osi9S11K
1. 247 - Fixed bug in Trackster alert message, reporting dbkey as blank when it cannot load chroms. Simon Guest. https://trello.com/c/lBB172Ac
1. 245 - Adding parent_library_id field to the `LibraryDataset` 'to_dict' call. Kyle Ellrott. https://trello.com/c/ZzK2ZwGz
1. 244 - add '[' and ']' to mapped strings and advanced filters. Björn Grüning. https://trello.com/c/n3Hv0CzW
1. 242 - Fix routing to tools API when id has slashes in name. Kyle Ellrott. https://trello.com/c/DmOinKwh
1. 239 - Add name column to FASTA header in extract_genomic_context tool. Björn Grüning. https://trello.com/c/g2q9gKv0
1. 243 - Add output_name to tool API response. Kyle Ellrott. https://trello.com/c/9OuLgGnN
1. 241 - Fix missing import in search.py. Kyle Ellrott. https://trello.com/c/teXGjfJ2
1. 249 - Tool Shed: Allow more actions after setup_r_environment. Björn Grüning. https://trello.com/c/LZhF6trH
1. 252 - Tool Shed: Implement setup_perl_environment. Björn Grüning. https://trello.com/c/Sld7OZPL
1. 248 - Tool Shed: Add more env vars to the standard env.sh file and allow more actions after setup_ruby_environment. Björn Grüning. https://trello.com/c/2amdMp4N
1. 250 - Tool Shed: Add additional ENV vars from parent repository to child repository. Björn Grüning. https://trello.com/c/7ilpGljG


<br />
# Fixes
1. Fix function to unshare a history that has been shared with you. https://trello.com/c/wqQua5V4
1. Fix internal server error while loading Admin/quotas. https://trello.com/c/XFHzPmlK
1. Fix Page buttons for included histories. https://trello.com/c/BiAQqDGN
1. Fix tabular data not displaying in main panel. https://trello.com/c/it0oXXeT
1. Fix transitory issue where action button clicks resulted in 2 http requests in Firefox. https://trello.com/c/WQL7EUlB
1. Fix the server error thrown when sorting the forms grid. https://trello.com/c/AnLyZo6x
1. Fix error from updating an installed data manager tool, when managing local data. https://trello.com/c/4dgIdWMp
1. Fix history options menu broken in IE 9. https://trello.com/c/ii2Zh8na
1. Fix to add new error message when GMAJ applet doesn't load (when Java not enabled in browser). https://trello.com/c/XTF1iwVN
1. Fix for when loading api/tools/ didn't provide list of tools. https://trello.com/c/Dv3EylDP
1. Fix to keep migration process from repeatedly asking you to migrate the tools - even after you have ignored the request once (if separate tool shed install database is used). https://trello.com/c/Q7N5k6zC
1. Fix bug in Chrome where upload & login breaks due to multi-instance cookie. https://trello.com/c/9ZHao10X
1. Fix base_panels.mako, ajaxSubmit and uncalled callbacks with added 'print' statements. https://trello.com/c/ZBpn7PtZ
1. Fix to disallow shared workflows from being inappropriately deletable. https://trello.com/c/EdKslJDn

<br />
# Tool Shed
**[/Tool Shed](/Tool Shed)**
## Tool Migration Framework
Also see above: [New Tool Migrations](#new-tool-migrations)
1. Tags corrected: 11 tools migrated to Tool Shed contained spurious 'version=1.0.0' attribute. https://trello.com/c/2GklJHZi
1. Implemented the ability to easily migrate a set of repositories from a tool shed to another tool shed. https://trello.com/c/J0MKjYZt

## Repositories
1. New Tool Shed repo categories. https://trello.com/c/niCdaARH
1. Enable easier tool upgrade process. https://trello.com/c/ct8YoJbf
1. Add the ability for a repository owner to grant administrative privileges on their repository in the tool shed to other users. https://trello.com/c/guOeL1sF
1. Correct installing new ruby dependencies with sourcing parent env.sh files. https://trello.com/c/Skcie86c
1. Multi-select email alerts functional again. https://trello.com/c/ek558LLb
1. Eliminate the recently introduced restriction on uninstalling repositories that are dependencies of other installed repositories. https://trello.com/c/4sGGB0SV
1. Attempting to create a new tool panel section when installing tool shed repositories via the Galaxy API no longer fails. https://trello.com/c/0olcmogN
1. Enhance setting repository metadata in the tool shed. https://trello.com/c/NhiygNQx
1. "Latest revision" links now display all repositories. https://trello.com/c/kP4qm8RE
1. Enhance the Galaxy repository uninstallation process. https://trello.com/c/SqdKVl2e
1. Enhanced check prevents a new repository from being created with the same name as a deleted repository. https://trello.com/c/fUuUNRwt
1. Tool shed listings confirmed to include last updated date and other ways for the viewer to determine currency of the wrapper. https://trello.com/c/qyknuE7L https://trello.com/c/IwwSjI3m
1. Display message on Manage / View repository page in the tool shed if repository has repository dependencies that are deprecated. https://trello.com/c/EZuWhamr
1. Dev Team owned repo updates
  * *Free Bayes*: Developed a tool dependency definition that specifies precompiled binaries. https://trello.com/c/zYoVHKoV
  * *EMBOSS*: Updated repo so it downloads a precompiled platform-specific binary. https://trello.com/c/iW3Amhl5

## Install and Test Framework
1. Several automated test framework fixes. https://trello.com/c/QWgsgll8
1. Tool Shed now tests installation of packages. https://trello.com/c/HVGrShnC
1. Captured "Tests that passed successfully" missing in "Automated tool test results" (Tool Shed regression). https://trello.com/c/ATclFLVH
1. Allow storing tool test results in the install and test framework. https://trello.com/c/8vEp2fXv
1. New functional test script covers capsule containing 2 repositories defining circular dependencies. https://trello.com/c/WOlpbijA
1. Enhanced the install and test script to not use the framework to uninstall repositories that have been tested. https://trello.com/c/5fdwINOw
1. Eliminate deleted repositories from automated tests. https://trello.com/c/uNOpaByz
1. Improve form submission in the install and test framework's install method. https://trello.com/c/NVTlYc0t
1. Added functional tests to check the datatypes registry's handling of tool shed repository datatypes and sniffers. https://trello.com/c/3GxawYIl
1. New process cleans up empty tool dependency installation paths in the main and test tool dependency S3 buckets used for the repository installation and testing framework. https://trello.com/c/diCzpR7Q
1. New functional tests for exporting and importing repository capsules. https://trello.com/c/ddPfpQcE
1. New Functional tests for validating tool dependency definitions. https://trello.com/c/SAYhd2hx
1. Enhance cron script for checking repositories for functional tests. https://trello.com/c/mYflXtiR
1. Functional tests for missing env.sh files re. complex repository dependencies. https://trello.com/c/hePIlUtK

## Fixes
1. Fix grid message persistence. https://trello.com/c/im9XsLan
1. Resolved bug in install and test framework linked to SAMtools dependency. https://trello.com/c/sN2iLCCn
1. Fix to remove ghost folder in an old repository. https://trello.com/c/aQKWw8sn
1. Fix admin view manage roles grid where negative values caused server errors. https://trello.com/c/oVdyX9AK
1. Fix admin view manage roles grid where search caused server error. https://trello.com/c/BYyj6zJf
1. Remove temporary directories created by the tool shed code. https://trello.com/c/A2YUuCs2
1. Restore files from test-data/ that were incorrectly removed during a tool migration. https://trello.com/c/nx5Q1JSw
1. Images now displayed in "Installed tool shed repositories" page when using proxy-prefix. https://trello.com/c/iMQoElrE


<br />
<div class='right'>
<br /><a href='http://usegalaxy.org'><img src='/Images/Logos/galaxyLogoTrimmed.png' alt='Galaxy' height="50" /></a><br />**usegalaxy.org**</div>

# Project Updates
1. [/News](/News)
1. [/Events](/Events)
1. [Videos on Vimeo](https://vimeo.com/galaxyproject)
1. *[February 2014 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2014_02)*
1. *[January 2014 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2014_01)*
1. *[December 2013 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2013_12)*

----
<br />
# About
**[GalaxyProject.org](http://galaxyproject.org)**

The **[Galaxy Team](http://wiki.galaxyproject.org/GalaxyTeam)** is a part of the **[Center for Comparative Genomics and Bioinformatics](http://www.bx.psu.edu/)** at **[Penn State](http://www.psu.edu/)**, and the **[Department of Biology](http://www.bio.jhu.edu/)** at **[Johns Hopkinis University](http://www.jhu.edu/)**. 

**[Galaxy](http://usegalaxy.org )** is supported in part by **[NSF](http://www.nsf.gov/)**, **[NHGRI](http://www.genome.gov/)**, the **[Huck Institutes of the Life Sciences](http://www.huck.psu.edu/)**, and **[The Institute for CyberScience at Penn State](http://www.ics.psu.edu/)**, and **[Johns Hopkins University](http://www.jhu.edu/)**.

The *[public Main instance](/Main)* of **Galaxy** at **[http://usegalaxy.org](http://usegalaxy.org)** utilizes infrastructure generously provided by the **[iPlant Collaborative](http://www.iplantcollaborative.org/)** at the **[Texas Advanced Computing Center](https://www.tacc.utexas.edu/)**, with support from the **[National Science Foundation](http://www.nsf.gov/)**.

Follow us on **Twitter [@galaxyproject](http://twitter.com/galaxyproject)** or read our tweets at **[Galaxy on Twitter](/GalaxyOnTwitter)**

Have a suggestion? Please see **[Using the Galaxy Issue Board](http://wiki.galaxyproject.org/Issues)**, and be sure to up vote the issues important to YOU.
