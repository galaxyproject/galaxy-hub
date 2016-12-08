---
autotoc: true
title: November 04, 2014 Galaxy Distribution News Brief
---
<div class='right'></div>

[All News Briefs](/src/DevNewsBriefs/index.md)
<br />
[Distribution Summary 2013_11_04](/src/news/2013_11_04_Galaxy_Distribution/index.md)

<br />


<br />
# Get Galaxy

*Please note new* **upgrade** *syntax*
<table>
  <tr>
    <td rowspan=3 style=" border: none;"> <a href='http://getgalaxy.org/'><img src="http://galaxy.psu.edu/static/getgalaxy.png" alt="getgalaxy" width=70 /></a> &nbsp;&nbsp; </td>
    <td colspan=2 style=" border: none;"> <strong><a href='http://wiki.galaxyproject.org/Admin/Get%20Galaxy'>getgalaxy.org</a></strong> </td>
  </tr>
  <tr>
    <td style=" border: none;"> <strong><a href='http://galaxy-dist.readthedocs.org'>galaxy-dist.readthedocs.org</a></strong> </td>
    <td style=" border: none;"> </td>
  </tr>
  <tr>
    <td style=" border: none;"> <strong><a href='http://bitbucket.org/galaxy/galaxy-dist'>bitbucket.org/galaxy/galaxy-dist</a></strong> </td>
    <td style=" border: none;"> </td>
  </tr>
  <tr>
    <td style=" border: none;"> </td>
  </tr>
  <tr>
    <td style=" border: none;"> <strong>new</strong>: </td>
    <td style=" border: none;"> <code>$ hg clone https://bitbucket.org/galaxy/galaxy-dist#stable </code> </td>
  </tr>
  <tr>
    <td style=" border: none;"> <strong>upgrade</strong>: </td>
    <td style=" border: none;"> <code>$ hg pull </code> <br /> <code>$ hg update release_2013.11.04 </code> </td>
  </tr>
</table>

<br />
<br />
<br />
# Security Fix NOW

**Administrators are STRONGLY ENCOURAGED to address this as soon as possible.**
<br />
A security vulnerability was recently discovered by John Chilton with Galaxy's "Filter data on any column using simple expressions" and "Filter on ambiguities in polymorphism datasets" tools that can allow for arbitrary execution of code on the command line. The fix for these tools has been committed to the Galaxy source and is included in this distraction. *[Original email notification from earlier today.](http://announce.list.galaxyproject.org/galaxy-announce-Security-vulnerability-in-Galaxy-filtering-tools-td4639252.html)*

For Galaxy installations that administrators are not yet ready to upgrade to the latest release, there are three workarounds.  First, for Galaxy installations running on a relatively new version of the stable release (e.g. `release_2013.08.12`), Galaxy can be updated to the specific `changeset` that that contains the fix.  This will include all of the stable (non-feature) commits that have been accumulated since the 8/12 release plus any new features included with (and prior to) the 8/12/2013 release, but without all of the new features included in the 11/4/2013 release.  Ensure you are on the stable branch and then upgrade to the specific `changeset`:
```
 % hg pull -u -r e094c73fed4d
```

Second, the patch can be downloaded and applied manually:
```
 % wget -o security.patch https://bitbucket.org/galaxy/galaxy-central/commits/e094c73fed4dc66b589932edb83412cb8b827cd3raw/
```

and then:
```
 % hg patch security.patch
```

or:
```
 % patch -p1 < security.patch
```

Third, the tools can be completely disabled by removing them from the tool configuration file (by default, `tool_conf.xml`) and restarting all Galaxy server processes.  The relevant lines in `tool_conf.xml` are:
```
    <tool file="stats/dna_filtering.xml" />
    <tool file="stats/filtering.xml" />
```



<br />
<br />
# Core Distribution Process

**If you need a refresher about how to upgrade or this is your first upgrade in a while, please see the latest instructions at:
   
   [Get Galaxy](http://getgalaxy.org)**

<br />
# Tool Shed Repository Process

## Required metadata reset for installed tool shed repositories

**It is critical that you reset the metadata on your installed tool shed repositories when you upgrade your Galaxy instance to this revision!**
<br /> 
**[Be sure to learn how.](http://wiki.galaxyproject.org/ResettingMetadataForInstalledRepositories)**

<br />
# New Tool Migrations

### Galaxy Tool Migration Framework Enhancements

**This release includes *Galaxy Tool Migration Stage 8*, which contains *48 tools* that have been migrated from the Galaxy distribution**.  The Galaxy tool migration framework has been enhanced so that tool entries in the `tool_conf.xml` file (or whatever it has been named in your local Galaxy instance) for tools that were [migrated out of the Galaxy distribution](http://wiki.galaxyproject.org/MigratingToolsFromGalaxyDistribution#Migrating_tools_from_the_Galaxy_distribution_to_the_Galaxy_Main_tool_shed) are now automatically eliminated during the migration process.  It is no longer necessary to manually edit the `tool_conf.xml` file to eliminate entries for migrated tools.  A back-up copy of the original `tool_conf.xml` file is made.

[More Tool Shed related enhancements and upgrades below.](/src/DevNewsBriefs/2013_11_04/index.md#tool_shed)

<br />
# Tools

1. *Tophat2*: Added an `align_summary` output report. https://trello.com/c/72XqqDQ4
1. General: 
  * Created a shared tool and parameter base on both the client and server side. https://trello.com/c/QTCrzr85
  * Dictify mixin cleanup. https://trello.com/c/P5fog600
  * Update to latest select2. https://trello.com/c[/NaGczwr](/src/DevNewsBriefs/2013_11_04/NaGczwr/index.md)T

<br />
# Visualizations

## Framework

1. Added a `data_source` test `has_dataprovider` that checks whether a dataset's datatype has a provider for the given type (e.g. "genomic-region", etc.) . https://trello.com/c/r3RLnxlv

## Fixes

1. *Trackster*: Various bug fixes and cleanup. https://trello.com/c/tIxfnhbe

<br />
# Workflows

1. Duplication actions on workflow imports eliminated to produce less confusing dialogue messages. https://trello.com/c/KAtwLSiV

<br />
# UI

1. *Help* menu modified, *all public Galaxy instances should update*. https://trello.com/c/sTEdmhuw
1. Update JS libraries, full versions of UI libraries (`jQuery-UI, Twitter's Bootstrap`). https://trello.com/c/hrAr225a
1. Limit number of empty histories in saved histories to one. https://trello.com/c/uNJa4J6Z
1. New windowing system for Galaxy named *Scratchbook*. https://trello.com/c/cCbYNtdQ

<br />
# CloudLaunch

1. Now errors when account mismatches are entered (key id and secret). https://trello.com/c/KLfD8e5v
1. Disable submission prior to filling in required options. https://trello.com/c/Ud4aFL2i

<br />
# API

1. Tools API show method now functions as expected (See pull request #159). https://trello.com/c/x2mwxjw3
1. Performance upgrades to permit `/api/users` to scale and handled more users. https://trello.com/c/LRhYOafg

<br />
# Admin

1. Email verification and disposable domains filtering. https://trello.com/c/ANhPGkdf
1. Correct Test tool shed account registration error. https://trello.com/c/nQlK5yhJ
1. Allow admins to view command line used to run job under Dataset info. https://trello.com/c/gIUnrVcS
1. Reports webapp performance improvement. https://trello.com/c/duYNgk5v

<br />
# Core

1. Explicitly set `TEMP` dir in `Local Runner`, when a temp dir value is not already set. https://trello.com/c[/HbFeo](/src/DevNewsBriefs/2013_11_04/HbFeo/index.md)WRI
1. Tool element exit_code (under stdio) now functions from_work_dir or when setting metadata externally. https://trello.com/c[/JfB2w1Br](/src/DevNewsBriefs/2013_11_04/JfB2w1Br/index.md)
1. Using Auto-detect and a cluster job runner now sets metadata only once. https://trello.com/c/Kc3NDGyN
1. Upgrades to `HierarchicalObjectStore`, more planned. https://trello.com/c/k4tovlFd
1. New `Plugin Framework lib/galaxy/web/base/pluginframework.py`. https://trello.com/c/lrfWbtw3
1. Plugins define hook functions called by a Galaxy app when certain events/situations happen. https://trello.com/c/c2AzV3Xf

<br />
# Pull Requests Merged

1. Björn Grüning contributed a method to implement the ability to change the tool-panel as user preference ( `Dynamic Toolbox Filtering` ). [#179](https://bitbucket.org/galaxy/galaxy-central/pull-request/179/implement-the-ability-to-change-the-tool/diff). This was a frequently requested feature by the community and full documentation on this can be found here [UserDefinedToolboxFilters](/src/UserDefinedToolboxFilters/index.md). https://trello.com/c/Xl7CZFMd
1. Björn Grüning also contributed several extensions allowing developers to utilize new actions simplifying various tool shed dependency definition idioms:
  * `make_install` action.  [#217](https://bitbucket.org/galaxy/galaxy-central/pull-request/217/implementation-of-the-make_install-action)
  * `autoconf` action. [#218](https://bitbucket.org/galaxy/galaxy-central/pull-request/218/implementation-of-the-configure-make-make)
  * `setup_r_environment` action. [#219](https://bitbucket.org/galaxy/galaxy-central/pull-request/219/implementation-of-the-a-r_environment-to)
    Further extensions enhancing this last tag and a corresponding setup_ruby_environment tag from Björn will be forthcoming in the next release.
1. Additionally, Björn Grüning contributed other tool shed and tool related enhancements enhancements: [#205](https://bitbucket.org/galaxy/galaxy-central/pull-request/205/if-you-have-a-repeat-tag-and-want-to-get), [#216](https://bitbucket.org/galaxy/galaxy-central/pull-request/216/move-the-evaluate_template-function-to-the), and [#239](https://bitbucket.org/galaxy/galaxy-central/pull-request/239/add-the-value-namecol-in-a-given-bed-file)
1. Andrew Warren contributed an API method allowing coping datasets between histories as well as support for more secure e-mail settings. [#199](https://bitbucket.org/galaxy/galaxy-central/pull-request/199/api-enable-copying-from-one-history-to) and [#198](https://bitbucket.org/galaxy/galaxy-central/pull-request/198/adding-ssl-support-for-smtp-email/diff).
1. Nicola Soranzo contributed small fixes for various tools as well as enhancements for customizing and localizing data and time display in various parts of Galaxy. [#222](https://bitbucket.org/galaxy/galaxy-central/pull-request/234/bug-fixes-for-3-tools-rebased-222) and [#211](https://bitbucket.org/galaxy/galaxy-central/pull-request/211/display-also-creation-time-on-dataset-info).
1. Kyle Ellrott contributed many enhancements for the API and the Galaxy search engine. [#187](https://bitbucket.org/galaxy/galaxy-central/pull-request/187/adding-state-field-to-the-jobn-search-view), [#241](https://bitbucket.org/galaxy/galaxy-central/pull-request/241/fixing-missing-import-in-searchpy), and [#234](https://bitbucket.org/galaxy/galaxy-central/pull-request/243/adding-output_name-to-api-tool-submit).
1. Lance Peterson contributed two enhancements to management scripts. [#196](https://bitbucket.org/galaxy/galaxy-central/pull-request/196/fix-unicode-issue-when-printing-history) and [#158](https://bitbucket.org/galaxy/galaxy-central/pull-request/158/basic-administrative-dataset-cleanup). https://trello.com/c/qzjBuljp
1. Google Summer of Code Intern Saket Choudhary contributed enhancements for VCF 4.1 compatibility. [#184](https://bitbucket.org/galaxy/galaxy-central/pull-request/184/vcftools-incompatible-with-vcf41).
1. Matthew Shirley contributed grammar fixes to the tool shed interface. [#210](https://bitbucket.org/galaxy/galaxy-central/pull-request/210/fixed-its-its-typos).
1. Stephen Mcmahon contributed fixes to the PBS job runner's staging functionality. [#194](https://bitbucket.org/galaxy/galaxy-central/pull-request/194/updated-pbspy-to-support-data-staging/diff)
1. Rémy Dernat contributed enhancements to the administrative interface allowing for management of user API keys. [#134](https://bitbucket.org/galaxy/galaxy-central/pull-request/134/add-userskeys-feature-controller-which-is/diff)
1. Adam Brenner contributed an enhancement making it easier to deploy the histogram2 tool. [#215](https://bitbucket.org/galaxy/galaxy-central/pull-request/215/histogram2-rpy-requires-r-missing-from).
1. A. Rretaud contributed extensions enabling data source tool developers to utilize the tool runners login e-mail address when implementing such tools. [#206](https://bitbucket.org/galaxy/galaxy-central/pull-request/206/give-access-to-__user_email__-and/diff)
1. John Chilton fixed job splitting to rewrite references in config files in addition to command-line. [#169](https://bitbucket.org/galaxy/galaxy-central/pull-request/169//fix-job-splitting-to-rewrite-references-in/diff). https://trello.com/c/FMPydE8L
1. John Chilton and Simon Guest implemented configurable plugins for tool dependency resolution. [#228](https://bitbucket.org/galaxy/galaxy-central/pull-request/228/tool-dependency-resolver-plugins-revision/diff). https://trello.com/c/cP3tGSJv
1. John Chilton implement `GALAXY_SLOTS` allowing tools to uniformly obtain allocated thread count. [#236](https://bitbucket.org/galaxy/galaxy-central/pull-request/236/job-runner-enhancements-galaxy_slots/diff). https://trello.com/c/cfOlSfdP
1. Kyle Ellrott contributed enhancements that allow API tool's `POST` to define history for tool state. [#193](https://bitbucket.org/galaxy/galaxy-central/pull-request/193/allow-api-tools-post-to-define-history-for/diff). https://trello.com/c/hpFanyx0

<br />
# Tool Shed

**[Tool Shed](/src/ToolShed/index.md)**
## Galaxy Tool Migration Framework Enhancements

See above: [New Tool Migrations](/src/DevNewsBriefs/2013_11_04/index.md#new-tool-migrations)

## Galaxy and Tool Shed Functional Test Framework Fixes and Enhancements

Significant work is continuing with the [Galaxy Tool Shed automated test framework](http://wiki.galaxyproject.org/AutomatedToolTests), including the following fixes and enhancements.   
1. Tool dependency binaries can now optionally be retained across test runs.  Tool dependencies are retained by default, shortening the time it takes to run the entire test framework.  Tool dependencies that result in installation errors are explicitly uninstalled and reinstalled.
1. The *job walltime* has been set to 10 minutes to eiliminate process ( `buildbot`) timeouts and to shorten the time it takes to run the entire test framework.
1. The scenario where a repository installs correctly, but it depends on another repository with a tool dependency that is in an error state is now properly handled.

## Tool Shed RESTful API Enhancements

The [Tool Shed API](http://wiki.galaxyproject.org/ToolShedApi#The_Tool_Shed_API) has some new features.   
1. `GET /api/repository_ids_for_setting_metadata ` : Returns a list of repository ids ordered for setting metadata.
1. `POST /api/reset_metadata_on_repositories/{payload} ` : Resets all metadata on specified repositories in the Tool Shed in an "orderly fashion".  The order in which metadata is reset is repositories of type ` TOOL_DEPENDENCY_DEFINITION ` first followed by repositories of type ` UNRESTRICTED `.
1. `POST /api/reset_metadata_on_repository/{payload} ` : Resets all metadata on a specified repository in the Tool Shed.

## Galaxy RESTful API Enhancements for the Tool Shed

The [Galaxy API for the Tool Shed](http://wiki.galaxyproject.org/ToolShedApi#Galaxy_API_features_for_the_Tool_Shed) has some new features.
1. `GET /api/tool_shed_repositories/{encoded_tool_shed_repository_id}/exported_workflows ` : Return a list of dictionaries containing information about the exported workflows contained within a Tool Shed repository.
* `POST /api/tool_shed_repositories/import_workflow/{payload} ` : Import the specified exported workflow contained in the specified installed Tool Shed repository into Galaxy.
1. `POST /api/tool_shed_repositories/import_workflows ` : Import all of the exported workflows contained in the specified installed Tool Shed repository into Galaxy.
1. `POST /api/tool_shed_repositories/reset_metadata_on_installed_repositories ` : Resets all metadata on all repositories installed into Galaxy in an orderly fashion where installed repositories of type `TOOL_DEPENDENCY_DEFINITION` are processed before installed repositories of type `UNRESTRICTED`.

## Tool Shed Repository README File Enhancements

This release includes several fixes for rendering repository `README` text files correctly and safely as html and `README` files with a `.rst` extension as `ReStructured Text`.  `README` files that are contained in older revisions in the repository `changelog` will now be properly rendered when viewing the selected revision.  Repositories that contain multiple `README` files will now properly render all of them within the `Readme Files` container.  Bullets points will display in repository `README` files, and `README` files that use `ReStructured Text` can now be defined to display remote image files or image files contained within the repository. [Read more…](http://wiki.galaxyproject.org/ToolShedToolFeatures#Properly_defining_the_location_of_images_in_tool_configuration_files)

## Tool Dependency Installation Recipe Enhancements

Several beneficial enhancements have bee added to the support for [defining tool dependencies within a Tool Shed repository](http://wiki.galaxyproject.org/ToolShedToolFeatures), including the ability to define recipes for downloading pre-compiled dependency binaries for selected operating system environments that are automatically determined at installation time rather than always requiring source code to be installed and compiled.  This feature is supported by the introduction of a new ` <actions_group> ` tag and support for filtering contained ` <actions> ` tags by architecture and operating system.   Other enhancements include the following.
1. The **make_directory** action has been enhanced to create the specified directory under the current working directory if it's value is not prefixed with ` $INSTALL_DIR `.
1. The **move_file** action has been enhanced to optionally include a new `rename_to attribute`.
1. Support for handling downloaded archives of files has been enhanced to extract files and into a specified location based on the internal directory structure of the archive. 

## Galaxy Fixes and Enhancements for Installing Tool Shed Repositories

1. Duplicate tool_shed_repository database records will no longer be created when a repository that had previously been installed and uninstalled is installed again from the Tool Shed.
1. The process for installing a repository that has a newer installable `changeset`} revision available (this is generally restricted to the new `TOOL_DEPENDENCY_DEFINITION` repository type) has been corrected.
1. The `Fabric` egg in the Galaxy distribution (used for installing tool dependencies) has been *upgraded from version 1.4.2 to version 1.7.0*.  A new egg for `paramiko 1.11.1` (which `Fabric 1.7.0` dependes upon) has been added to the Galaxy distribution.
1. Pass-through form data from the request when selecting a tool config or tool panel to contain tools included in Tool Shed repositories being installed into Galaxy has been moved from the request itself to the form data.  This resolves the problem with very long `HTTP` request strings that were problematic for `Apache`.
1. Support for installing repositories containing tools that have been migrated from the distribution to the Tool Shed has been corrected to properly handle cases where the repository may have been successfully cloned *but is still in a `New` state*.  This fix eliminates the so-called "white ghost" repository problem.
1. Prevent duplicate lines from being written to an **env.sh** file when installing a tool dependency or re-running a tool migration script with tool dependencies specified to be installed.
1. Filter tool dependency installation to only those that were checked when installing them from the `Manage tool dependencies page` for an installed tool shed repository.
1. Fix for the call to **td_common_util.move_file** reported by Jim Johnson.

## Galaxy Fixes and Enhancements for Administering Installed Tool Shed Repositories

1. The `Installed repositories container` on the `Manage repository page` in Galaxy has been corrected to properly display all missing repository and tool dependencies.
1. The `Manage installed tool shed repositories page` now displays installed repositories ordered by `tool_shed, name, owner` and `revision`.
1. Support for [repairing an installed repository](http://wiki.galaxyproject.org/RepairingInstalledRepositories) has been enhanced to handle repairing repository dependencies and tool dependencies that are not only in an error state, but may also have one of the "installing" state values. This feature will now properly handle dependencies that are stuck in one of these installing states for some reason.  Existing system processes are not automatically killed (if they happen to exist), but warning messages are displayed.
1. The [Get Repository Updates](http://wiki.galaxyproject.org/UpdatingInstalledRepositories) feature for installed Tool Shed repositories has been enhanced to support retrieval any type of status from the Tool Shed for the specified repository.  The current list of status categories is:
  * revision updates available
  * revision upgrades available
  * the revision is the latest installable revision
  * the repository has been deprecated in the tool shed
  * the repository contains exported Galaxy workflows

## Miscellaneous Tool Shed Bug Fixes

1. Support for exporting a repository that depends on a repository that has unicode characters in the description or long description has been fixed.
1. Browsing repositories in the Tool Shed that are owned by a specified user has been fixed so that the list of repositories is correctly filtered to those owned by the user.
1. Handle errors when attempting to set metadata on a tool shed repository that contains a file with a `.ga` extension but turns out to not be a valid exported Galaxy workflow.
1. Fix javascript function to check all check boxes for select lists in the Tool Shed and Galaxy that handle resetting metadata on selected repositories and installing and uninstalling selected tool dependencies.
1. Restrict diff file size to something reasonable when browsing `changesets` in the Tool shed, and add some additional logging and error handling when setting metadata on repositories in the tool shed and Galaxy.
1. Eliminate the problematic "Select one" option from select fields (bad behavior inherited from the Galaxy `form_builder` module).

### Tool Shed Tickets

<table>
  <tr>
    <td> <a href='https://trello.com/c/l9ZlGa8R '>https://trello.com/c/l9ZlGa8R </a></td>
    <td> <a href='https://trello.com/c/ojQqlSgl '>https://trello.com/c/ojQqlSgl </a></td>
    <td> <a href='https://trello.com/c/BN2V9I4M '>https://trello.com/c/BN2V9I4M </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/cSoMNbhU '>https://trello.com/c/cSoMNbhU </a></td>
    <td> <a href='https://trello.com/c/I3OadTHb '>https://trello.com/c/I3OadTHb </a></td>
    <td> <a href='https://trello.com/c/ZmJDgBSq '>https://trello.com/c/ZmJDgBSq </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/nTArHl8J '>https://trello.com/c/nTArHl8J </a></td>
    <td> <a href='https://trello.com/c/XYkqW3Lr '>https://trello.com/c/XYkqW3Lr </a></td>
    <td> <a href='https://trello.com/c/HKQbqYr9 '>https://trello.com/c/HKQbqYr9 </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/Tf9i7n3h '>https://trello.com/c/Tf9i7n3h </a></td>
    <td> <a href='https://trello.com/c/ZXgnlXfo '>https://trello.com/c/ZXgnlXfo </a></td>
    <td> <a href='https://trello.com/c/AxvJsdcx '>https://trello.com/c/AxvJsdcx </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/3ie0lStx '>https://trello.com/c/3ie0lStx </a></td>
    <td> <a href='https://trello.com/c/FziDycDo '>https://trello.com/c/FziDycDo </a></td>
    <td> <a href='https://trello.com/c/TrTyFaKR '>https://trello.com/c/TrTyFaKR </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/jFKUjJQn '>https://trello.com/c/jFKUjJQn </a></td>
    <td> <a href='https://trello.com/c/vpNE7HvD '>https://trello.com/c/vpNE7HvD </a></td>
    <td> <a href='https://trello.com/c/3nXG0ArT '>https://trello.com/c/3nXG0ArT </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/uinZvCkb '>https://trello.com/c/uinZvCkb </a></td>
    <td> <a href='https://trello.com/c/scRE7nJ6 '>https://trello.com/c/scRE7nJ6 </a></td>
    <td> <a href='https://trello.com/c/a5bMspR7 '>https://trello.com/c/a5bMspR7 </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/aVoVGUbX '>https://trello.com/c/aVoVGUbX </a></td>
    <td> <a href='https://trello.com/c/CZeVLNFr '>https://trello.com/c/CZeVLNFr </a></td>
    <td> <a href='https://trello.com/c/SqrjrnNg '>https://trello.com/c/SqrjrnNg </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/pV17Ld1l '>https://trello.com/c/pV17Ld1l </a></td>
    <td> <a href='https://trello.com/c/RrOyd6mP '>https://trello.com/c/RrOyd6mP </a></td>
    <td> <a href='https://trello.com/c/zpaUAGpy '>https://trello.com/c/zpaUAGpy </a></td>
  </tr>
  <tr>
    <td> <a href='https://trello.com/c/ljumfPC0 '>https://trello.com/c/ljumfPC0 </a></td>
    <td> </td>
    <td> </td>
  </tr>
</table>


<br />
# Bug Fixes

1. Fix Update manager functional test. https://trello.com/c/ZFpaJ8KQ
1. Show when used with API key. https://trello.com/c/aR8aO3Me
1. Persist form settings in 'saved histories' search. https://trello.com/c/FsEA9j8K
1. Correct defaults for genome selection when adding library data files. https://trello.com/c[/Hr1JdeGq](/src/DevNewsBriefs/2013_11_04/Hr1JdeGq/index.md)

# Prior Bug Fixes

1. Fix saved histories view. https://trello.com/c[/LdLl](/src/DevNewsBriefs/2013_11_04/LdLl/index.md)JDo9
1. Fix problems importing workflows to Tool Shed. https://trello.com/c/0Fks0ii9
1. Increate tolerance for spaces in local's URLs. https://trello.com/c/e6KJKi6j
1. Correct Datasource EBI SRA errors when non-text files are returned. https://trello.com/c/H8VQquBW
1. Correct GenomeSpace export tool to only list personal directory. https://trello.com/c/vPFhGqBX
1. Handle Datasource tools error when handling some binary data under certain cases. https://trello.com/c[/TzXm](/src/DevNewsBriefs/2013_11_04/TzXm/index.md)SWOo
1. Adjust for empty strings in `ToolParameterValueWrapper.get_display_text() ` Python2.7 and lower. https://trello.com/c/XN0UfOCb
1. Correct Json for view saved visualizations. https://trello.com/c/DaYZwv6w

<br />
<div class='right'>
<br /><a href='http://usegalaxy.org'><img src="/src/images/NewsGraphics/2013_11_04_usegalaxy.org.jpg" alt="usegalaxy.org" width=300 /></a><br />**usegalaxy.org**</div>

# Project Updates

1. [News](/src/news/index.md)
1. [Events](/src/events/index.md)
1. [Videos on Vimeo](https://vimeo.com/galaxyproject)
1. *[November 2013 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2013_11)*
1. *[October 2013 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2013_10)*
1. *[September 2013 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2013_09)*

----
<br />
# About

**[GalaxyProject.org](http://galaxyproject.org)**

The **[Galaxy Team](http://wiki.galaxyproject.org/GalaxyTeam)** is a part of **[BX](http://www.bx.psu.edu/)** at [Penn State](http://www.psu.edu/), and the **[Biology](http://www.biology.emory.edu/)** and **[Mathematics and Computer Science](http://www.mathcs.emory.edu/)** departments at [Emory University](http://www.emory.edu/home/index.html/). 

**[Galaxy](http://usegalaxy.org )** is supported in part by [NSF](http://www.nsf.gov/), [NHGRI](http://www.genome.gov/), the [Huck Institutes of the Life Sciences](http://www.huck.psu.edu/), and [The Institute for CyberScience at Penn State](http://www.ics.psu.edu/), and [Emory University](http://www.emory.edu/home/index.html).

Join us at **Twitter [@galaxyproject](http://twitter.com/#galaxyproject)** or just read our tweets **[Galaxy on Twitter](/src/GalaxyOnTwitter/index.md)**

Have a suggestion? Please see **[Using the Galaxy Issue Board](http://wiki.galaxyproject.org/Issues)**.
