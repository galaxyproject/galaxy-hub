---
autotoc: true
pagetitle: January 13, ,,  2015 Galaxy Distribution News Brief
---
<div class='right'></div>
[All News Briefs](/DevNewsBriefs)
<br />
[Distribution Summary 2015_01_13](/News/2015_01_13_Galaxy_Distribution)

<div class='left'><a href='http://getgalaxy.org'><img src='/Images/Logos/GetGalaxyOrg.png' alt=' ' width=175 /></a></div>

<br />
<br />
<br />
<table>
  <tr>
    <td rowspan=3 style=" border: none;"> <a href='http://getgalaxy.org/'><img src='http://galaxy.psu.edu/static/getgalaxy.png' alt='getgalaxy' width=70 /></a> &nbsp;&nbsp; </td>
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
    <td style=" border: none;"> <code>$ hg pull </code> <br /> <code>$ hg update latest_2015.01.13</code> </td>
  </tr>
</table>


<br />

# Security

Several *critical* security vulnerabilities were recently discovered by Bartlomiej Balcerek and Mateusz Stahl at the Wroclaw Centre for Networking and Supercomputing. Details regarding these vulnerabilities are provided below, and this stable Galaxy release contains fixes for those vulnerabilities. **The Galaxy Team strongly encourages Galaxy server administrators to update their Galaxy servers immediately.**

Because of this disclosure, the Galaxy Team performed an extensive audit to identify and fix security issues. Most notably, a large amount of work was done to secure the Galaxy server against cross-site scripting attacks.

Unless otherwise mentioned, the following security fixes have been applied to the current (January 13, 2015) and previous (October 6, 2014) Galaxy releases, identified by the [latest_2015.01.13](https://wiki.galaxyproject.org/DevNewsBriefs/2014_01_13) and [latest_2014.10.06](https://wiki.galaxyproject.org/DevNewsBriefs/2014_10_06) tags respectively.

## Arbitrary code execution

A vulnerability was discovered that would allow a malicious person to execute arbitrary code on a Galaxy server. The vulnerability was due to gaps in Galaxy's command line template parameter sanitization. Although all form fields were sanitized for shell metacharacters, some other parameters that might be provided to tools on the command line (such as the input dataset name) were not. Because of this, dataset names and other fields could be constructed to exploit this vulnerability.

**Due to the severity of this vulnerability, the fix for it has been applied back to the previous releases beginning with the January 13, 2013 release.** The fix can be obtained by executing `hg pull && hg update latest_<YYYY>.<MM>.<DD>`, replacing the date with the date of the release currently in use.

## Cross-site scripting

Many templates used in the Galaxy server did not properly sanitize user input, which would allow for cross-site scripting (XSS) attacks. In this form of attack, a malicious person can create a URL which, when opened by a Galaxy user or administrator, would allow the malicious user to execute arbitrary Javascript and gain access to the user or administrator’s Galaxy account.

## OpenID redirect

Additional security has been added to the OpenID authentication methods to prevent a malicious person from redirecting a user to a site other than the Galaxy server from which the request originated. This issue did not cause the exposure of login credentials or provide a malicious person access to a user’s account, but it could be used to trick a user into entering their credentials on a fake Galaxy server.

## Mobile Galaxy

Galaxy’s mobile interface, in addition to being vulnerable to XSS attacks, has not been updated with the standard UI, and was largely unusable. Because of this, the mobile interface has been disabled.

# Highlights

## IPython Integration

Thanks to the awesome work of community members [Björn Grüning](/BjoernGruening) and [Eric Rasche](/EricRasche), Galaxy now features integration with the popular IPython project. The [Galaxy-IPython](https://github.com/bgruening/galaxy-ipython) project has been merged into Galaxy core and made into a generic plugin framework of interactive environments based on Docker. The IPython plugin allows users to launch and securely connect to an IPython server running in a Docker container, fetch data from their Galaxy history, use the full-feature IPython runtime environment to analyze it, and finally push results back into their history. A !YouTube video of the plugin in action can be found [here](https://www.youtube.com/watch?v=jQDyTuYnn1k). Information on enabling this plugin is linked to via [this Trello card](https://trello.com/c/SE240zCB). [Interactive Environments (IEs)](https://wiki.galaxyproject.org/Admin/IEs) need to be set up.

## Tool Form Upgrade (for Beta Testing)

Galaxy's tool form forces pages to reload entirely in response to many user interactions. This limits Galaxy's responsiveness and can result in a cumbersome user experience when entering complex tool configurations. In Galaxy's development branch, this tool form has been redesigned and modernized to address these and other limitations. This new tool form will become the default with the next release - but we are hoping tool author's and power users enable it and provide feedback during this release cycle in order to ensure it is working ideally when it becomes the default. The tool form can be enabled by setting `toolform_upgrade=True` in Galaxy's `config/galaxy.ini`.

# New and Improved
1. New Toolshed category for combinatorial selections tools. [https://trello.com/c/QKKYov6a](https://trello.com/c/QKKYov6a)
1. Updated Admin Tool Panel with options to load and watch directories of Tools and to trigger auto-reload upon update of any tool. [https://trello.com/c/fXGdYmzo](https://trello.com/c/fXGdYmzo)
1. Fixed bug in Sentry where it was not generated a URL for `history_contents`. [https://trello.com/c/5d6j4X5y](https://trello.com/c/5d6j4X5y)
1. Added a configurable [Google Analytics](http://www.google.com/analytics) tracking tag to Galaxy and Tool Shed forms. Requires configuration modifications for full functionality, see ticket. [https://trello.com/c/R3agjM9U](https://trello.com/c/R3agjM9U) 
1. Added an API call to collect History Dataset job metrics. Update will let an API user view the id of the job that produced a History’s Dataset. Thanks to [Nicola Soranzo](/NicolaSoranzo). [https://trello.com/c/mhmRhxIZ](https://trello.com/c/mhmRhxIZ)
1. Updated Job Command line abstraction class to better mask internal values. See ticket for details. [https://trello.com/c/IlSdD0qV](https://trello.com/c/IlSdD0qV)
1. Enhanced job scheduling through new process that resubmits jobs terminated due to memory constraints. [https://trello.com/c/7dJIHzKd](https://trello.com/c/7dJIHzKd)
1. Enhanced client security. Contains a pair of changes aimed at protected clients by preventing [Clickjacking](https://www.owasp.org/index.php/Clickjacking) and informing browsers to not send session cookies issues over HTTPS to HTTP URLs by using [using SecureFlag](https://www.owasp.org/index.php/SecureFlag). [https://trello.com/c/Gt98iH7u](https://trello.com/c/Gt98iH7u)
1. Added [RPy](http://sourceforge.net/projects/rpy/) requirement to the `ngs_simulation` tool. Contributed by [Björn Grüning](/BjoernGruening). [https://trello.com/c/kojo4KR2](https://trello.com/c/kojo4KR2)
1. Updated to allow Background and Plugin Driven Scheduling of Workflows. API call details included in tickets. [https://trello.com/c/wiND0YQh](https://trello.com/c/wiND0YQh) [https://trello.com/c/SX2ghmtM](https://trello.com/c/SX2ghmtM)
1. Enhancement to configuration that permits the resolution of relative paths in tool data configuration and .loc files. The string `${__HERE__`} will be expanded out to the directory the file (XML configuration or loc) currently resides in. Ticket includes details/use cases/dependencies. [https://trello.com/c/5VQOWgld](https://trello.com/c/5VQOWgld)
1. Improved handling of Report applications. Will discover and utilize proper configuration file. Thank you for testing by [Eric Rasche](/EricRasche). [https://trello.com/c/aRQglAkf](https://trello.com/c/aRQglAkf) [https://trello.com/c/SOe8W2U6](https://trello.com/c/SOe8W2U6) [https://trello.com/c/SOe8W2U6](https://trello.com/c/SOe8W2U6)
1. Added a javascript validation for username and email changes. A user account was deactivated upon an email address update when no prior activation token existed, requiring account activation, but no notice was given to the user. Now, if no token present (legacy auto-validation), the email must be verified and upon login, the email to do so is sent. Plus minor tunings. [https://trello.com/c/WTSZtxuD](https://trello.com/c/WTSZtxuD) [https://trello.com/c/HJsfz3no](https://trello.com/c/HJsfz3no)
1. Added blank string for `host_url` to tooltip rendering when the value is unavailable. Avoids an occasional issue that comes up in the Workflow editor. Thank you Kyle Ellrott. [https://trello.com/c/g5xNIYGS](https://trello.com/c/g5xNIYGS)
1. Included enhancements to the "Convert delimiters" and "velvetg" tools. Please see ticket for the changesets included. Thanks to [Nicola Soranzo](/NicolaSoranzo). [https://trello.com/c/4cDu8T4I](https://trello.com/c/4cDu8T4I)
1. Expanded configuration options to permit a dynamic external proxy manager (`dynamic_proxy_external_proxy`), which is required for certain server type’s to have correct functionality/URL paths. Contributed by [Eric Rasche](/EricRasche). [https://trello.com/c/C7wtcdvd](https://trello.com/c/C7wtcdvd)
1. Updated the `tool_conf.xml.sample` file as the initial phase of [Galaxy’s](http://galaxyproject.org) tool revision plans for 2015. [https://trello.com/c/soeyuJfV](https://trello.com/c/soeyuJfV)
1. Implemented a way of creating a [Tool Shed](http://usegalaxy.org/toolsehd) repository revisions through an API tarball upload. Overall goal is to simplify tool loads. Please see the ticket for full details. Thank you [Björn Grüning](/BjoernGruening). [https://trello.com/c/rvO8CijI](https://trello.com/c/rvO8CijI)
1. Included new API method ` /api/tool_data` to allow for the interactive interrogation of the `tool-data` tables on a server. Authored by Kyle Ellrott.  [https://trello.com/c/zf6Rni64](https://trello.com/c/zf6Rni64)
1. Improved the `docstring` of previously added Dataset type detection (sniff) functions. Thanks to [Björn Grüning](/BjoernGruening). [https://trello.com/c/UFjkigva](https://trello.com/c/UFjkigva)
1. Added [.xlsx](http://filext.com/file-extension/XLSX) as a new datatype. This enables proper identification and labeling of the (primarily) Excel data upon Upload. Thank you Hunter Moseley. [https://trello.com/c/qxGGQ1Ls](https://trello.com/c/qxGGQ1Ls)
1. Added `.cbx` as a new datatype. This is used/produced by recent versions of the [Cufflinks](http://cole-trapnell-lab.github.io/cufflinks/manual) RNA-Seq analysis tool set. Contributed by [Björn Grüning](/BjoernGruening). [https://trello.com/c/WBWxACyr](https://trello.com/c/WBWxACyr)
1. Added `.owl` and `.obo` as new datatypes. This facilities data use in the recently created [Ontology Toolkit](https://github.com/galaxyproject/tools-iuc/pull/6) wrappers. Design and testing from [Björn Grüning](/BjoernGruening), Erick Antezana, and Peter Cock on behalf of the [IUC](https://wiki.galaxyproject.org/IUC). [https://trello.com/c/4t96N2eV](https://trello.com/c/4t96N2eV)
1. Updated [Docker](http://www.docker.com) to run with 'auto-remove' by default (`—rm`} flag). Containers are automatically removed, which prevents a collection of old work containers from building up. Thanks Kyle Ellrott. [https://trello.com/c/uSyg8OYN](https://trello.com/c/uSyg8OYN)
1. Updated [Docker](http://www.docker.com) to run with 'set user' by default (`docker_set_user = true`}). This change updates the ownership of commands and any results to be non-root. Thanks again to Kyle Ellrott. [https://trello.com/c/0FO0UOe7](https://trello.com/c/0FO0UOe7)
1. Updated [Docker](http://www.docker.com) to run with the `-u $USER` argument. Thanks to [Björn Grüning](/BjoernGruening). [https://trello.com/c/A3VjbvMG](https://trello.com/c/A3VjbvMG)
1. Added `tool_library_dir` to `tool_conf` parser (`tool_dir` was already added). For `tool_library_dir`, the parser scans the child directories of the given directory, and loads the .xml files inside of them. This permits the loading of all the .xml tool definitions within a the same base directory, included nested directories. [https://trello.com/c/OJelgFPu](https://trello.com/c/OJelgFPu)
1. Allow Model objects to be loaded when they have problematic [JSON](http://www.json.org) values. Now, when such a value is encountered, it is substitute with None. [https://trello.com/c/9lvIKGXa](https://trello.com/c/9lvIKGXa) 
1. Changed the [JSON](http://www.json.org) custom type to be a `large blob` type when [MySQL](http://www.mysql.com) is used. Upgrading migrates the update. [https://trello.com/c/RbW6pOd2](https://trello.com/c/RbW6pOd2) [https://trello.com/c/qhGD4sIk](https://trello.com/c/qhGD4sIk)
1. Adjusted data column parameters that pointed to »multiple« data parameters. Avoids a server side exception while it builds, validates, and uses a meaningful set of columns. [https://trello.com/c/0CCy6mtk](https://trello.com/c/0CCy6mtk)
1. Added a the tool package download function to the API. Update also resolves a few issues in the packaging code. Thank you Kyle Ellrott. [https://trello.com/c/7cE1oqmM](https://trello.com/c/7cE1oqmM)
1. Revised [SRMA](http://sourceforge.net/projects/srma/) tool wrapper to that it requires at least 2048 MB of memory and reset the tag `VALIDATION_STRINGENCY=LENIENT` (important for many use cases). Contributed by Lance Parsons. [https://trello.com/c/MUb4zETD](https://trello.com/c/MUb4zETD)
1. Citation URLs open as a `_blank` new window/tab. Prevents (a browser’s) potentially insecure error messages content from opening in the Galaxy UI middle panel (https vs http). [https://trello.com/c/kC3rG30a](https://trello.com/c/kC3rG30a)
1. Library API improved to return only active libraries (avoiding deleted). [https://trello.com/c/PCC2lkHk](https://trello.com/c/PCC2lkHk)
1. Better handling of tool versions updates with significant parameter changes. Regenerate the tool state from parameters on the tool form that are still in common. [https://trello.com/c/YfJAzBDI](https://trello.com/c/YfJAzBDI)
1. Reduce minimum length of toolshed repository names from 4 characters to 2. [https://trello.com/c/jE7lERZ6](https://trello.com/c/jE7lERZ6)
1. Move handler startup to immediately follow full creation and association of a `JobManager`. Resolves error where the initialization of the job handler's thread finds that the app has no manager yet. [https://trello.com/c/7P5dBqdu](https://trello.com/c/7P5dBqdu)
1. Fixed `select2` bug that impacted minimal width. [https://trello.com/c/ozKMlL2c](https://trello.com/c/ozKMlL2c)
1. Improved `DatasetMatcher` to now check if a Dataset’s `hda` is of the correct format before attempting to perform filtering. This ensures that the correct metadata attributes are intact, with the goal of clarifying job failure reasons (as some attributes may not exist for an unexpected format). [https://trello.com/c/wKuW6o1R](https://trello.com/c/wKuW6o1R)
1. Improved handling in the function `DynamicOptions AdditionalValueFilter` when Dataset columns have not been assigned. Logic now interprets a data’s `value` instead of failing due to a missing/unassigned `name` (column label) metadata attribute. [https://trello.com/c/kPFaKDlv](https://trello.com/c/kPFaKDlv)
1. Improved handling of the Slurm job `CANCELLED` state. This improves error reporting, e.g. by clearly stating when a job fails because it exceeds memory quotas versus being cancel by the administrator for other reasons. [https://trello.com/c/GA29VWGL](https://trello.com/c/GA29VWGL)
1. Hide the `GALAXY` env variable in `updateucsc.sh.sample`. This enables it to be set externally when calling the script. Useful in docker containers. Contributed by [Björn Grüning](/BjoernGruening). [https://trello.com/c/rkjT8COY](https://trello.com/c/rkjT8COY) [https://trello.com/c/Uu1fDBw2](https://trello.com/c/Uu1fDBw2)
1. Relocated `job_lock` from the queue to the `JobManager` itself. This fixes `NoopQueue` from not having `job_lock` errors when viewed in the UI under Admin &rarr; Jobs. [https://trello.com/c/iHlVTdMX](https://trello.com/c/iHlVTdMX)
1. Removed r3 instance types due to issues with dependencies that resulted in launch failures. [https://trello.com/c/NeqbeLMD](https://trello.com/c/NeqbeLMD)
1. Added flexibility for `tool data table` configuration in the Install and Test Framework. [https://trello.com/c/oKZPySe2](https://trello.com/c/oKZPySe2)

# Fixed
1. Fixed issue where API lost functionality for Twill tool tester that allowed selects to be specified by display value in addition to form value. [https://trello.com/c/3opljhof](https://trello.com/c/3opljhof)
1. Fixed issue where logging in after password reset sent the user to wrong page (now point to login). [https://trello.com/c/gkZQcy9g](https://trello.com/c/gkZQcy9g)
1. Resolved Admin manage jobs function with accurate time calculation. No longer rolls-over at 24 hrs. [https://trello.com/c/7d7e2B1s](https://trello.com/c/7d7e2B1s)
1. Resolved issue where Pages with embedded Visualization were causing a UI error. [https://trello.com/c/fZRdzMoI](https://trello.com/c/fZRdzMoI)
1. Corrected issue where installing repositories with many tools causes Galaxy to throw errors in the admin interface. [https://trello.com/c/Hv5iIweU](https://trello.com/c/Hv5iIweU)
1. Corrected `lib/galaxy/config.py`. A missing comma on openid configuration locations has been replaced and the resulting error no longer occurs. Reported by @scholtalbers. [https://trello.com/c/AwZwAx4l](https://trello.com/c/AwZwAx4l)
1. Corrected `package_picard_1_56_0` so that it no longer contains `Picard v. 1.122.0`. Discovered by [Nicola Soranzo](/NicolaSoranzo). [https://trello.com/c/jKJRjf9N](https://trello.com/c/jKJRjf9N)
1. Finalized a bug fix for over escaping implemented in prior changeset c2bed0a. [https://trello.com/c/godTRTgY](https://trello.com/c/godTRTgY) [https://trello.com/c/pAGxM1mb](https://trello.com/c/pAGxM1mb)
1. Fixed a variable name associated with data folders that was causing a `NameError` issue. Thank you [Nicola Soranzo](/NicolaSoranzo). [https://trello.com/c/lXgZR2Yb](https://trello.com/c/lXgZR2Yb)
1. Corrected a bug in Internet Explorer (IE) configuration parsing. Thank you [Björn Grüning](/BjoernGruening). [https://trello.com/c/p49eQLPx](https://trello.com/c/p49eQLPx)
1. Fixed an improper redirect during user password reset. [https://trello.com/c/ROONezok](https://trello.com/c/ROONezok)
1. Fixed Workflow import to correctly set the `uuid`. Contributed by Kyle Ellrott. [https://trello.com/c/4UP6Gfo9](https://trello.com/c/4UP6Gfo9)
1. Corrected a few small bugs in docs and pylint. See ticket/changesets for details. Contributed by [Nicola Soranzo](/NicolaSoranzo). [https://trello.com/c/HVm9vKl2](https://trello.com/c/HVm9vKl2)
1. Corrected a boolean parameter handling issue that occurred during a Workflow’s runtime execution. ’’Incorporating this fix is critical for proper Workflow execution.’’. The problem manifested as certain tool parameters executing »in the reverse state« when used within Workflows (exclusively, and never when tools were executed directly outside of Workflows). A tool »re-run« form will reveal the issue and various failure errors are known to have resulted. If a prior successful Workflow now fails, and your instance as not yet included in this changeset yet, the issue could likely be the root cause of Workflow tool errors.  The problem impacted the [/Main](/Main) public Galaxy instance at [http://usegalaxy.org](http://usegalaxy.org) for a short time window in November. The fix was applied to the public instance and added to the Stable branch under [latest_2014.10.06](/DevNewsBriefs/2014_10_06) upon discovery/resolution, at a priority, during this same time frame. Reported by Andrea Pinna. [https://trello.com/c/zdHaxzSn](https://trello.com/c/zdHaxzSn) [https://trello.com/c/sXUwBJgb](https://trello.com/c/sXUwBJgb)
1. Fixed changeset 04a072e to now use the correct `MAKO` method in the masthead. [https://trello.com/c/ZSMVriGJ](https://trello.com/c/ZSMVriGJ)
1. Composite Datatype uploads no longer problematic by assuming groups have a UUID field. [https://trello.com/c/GbZwGPmt](https://trello.com/c/GbZwGPmt)
1. Fixed passing nested parameter replacements to the Workflow run API. Discovered by [Nicola Soranzo](/NicolaSoranzo). [https://trello.com/c/WtFpviiw](https://trello.com/c/WtFpviiw)
1. Fixed Pulsar's default HTTP transport to automatically load. Impacts behavior of `urllib` changes with respect of content length of `mmap` data after loading. [https://trello.com/c/Aq0PK81c](https://trello.com/c/Aq0PK81c)
1. Fixed composite Datatypes issue related to renaming individual parts of paired Datasets. [https://trello.com/c/ExOMfxtT](https://trello.com/c/ExOMfxtT)
1. Fixed issue where Dataset download links were being incorrectly populated by regenerating `dataset-model` URLs upon fetching (even when silent). Plus a corrections for cases where the `to_ext` value was missing. [https://trello.com/c/ngLd7M4u](https://trello.com/c/ngLd7M4u) [https://trello.com/c/pvdWMBmP](https://trello.com/c/pvdWMBmP) [https://trello.com/c/pvdWMBmP](https://trello.com/c/pvdWMBmP)
1. Fix Slurm job post-mortem for »clusters« functionality added to `slurm-drmaa` (and currently in use on [http://usegalaxy.org](http://usegalaxy.org)). [https://trello.com/c/OuNEdZLc](https://trello.com/c/OuNEdZLc)
1. Fixed datatypes from consuming output extra file paths due to updates in changeset d781366. Resolution aided by James Johnson, [Nicola Soranzo](/NicolaSoranzo) & [Björn Grüning](/BjoernGruening). [https://trello.com/c/gwG6GgW8](https://trello.com/c/gwG6GgW8)
1. Fixed import bug for `run_reports.sh`. Thank you [Nicola Soranzo](/NicolaSoranzo). [https://trello.com/c/ZmTmQTZl](https://trello.com/c/ZmTmQTZl)
1. Fixed a parameter parsing issue in the Data Libraries API (recently introduced while refactoring Data Managers). [https://trello.com/c/1ZTlAVlT](https://trello.com/c/1ZTlAVlT)
1. Corrected a temporary issue where Import was omitted from the original release of `latest_2014.10.06`. [https://trello.com/c/iJwFduar](https://trello.com/c/iJwFduar)

# News and Community
1. We would like to send a special acknowledgement along with a huge **Thank YOU!!** (or as our own [Dave Clements](/DaveClements) often states informally, "Hugs!") to our *Intergalactic Utilities Commission* members. Our project most definitely would not be the same without the *IUC's* unwavering and dedicated support, contributions, and suggestions throughout the years. Everyone in the Galaxy community benefits directly, in a multitude of ways, that are too far reaching to list out fully in this quick note. *Curious* about who is involved and the key role this community-driven group has in improving and maintaining the [Tool Shed](https://wiki.galaxyproject.org/ToolShed) and their owned/reviewed [Repositories](http://usegalaxy.org) (in addition to other important areas)? Learn more about the members and future/active/prior projects and goals [here...](https://wiki.galaxyproject.org/IUC). 
1. Explore the latest [Galaxy Project](http://galaxyproject.org) news from our team that covers recent Events, Publications, New Tools, and much more in our monthly project reports published in our wiki under [Galaxy Updates](http://wiki.galaxyproject.org/GalaxyUpdates). 
1. [Tool Shed Contributions](https://wiki.galaxyproject.org/ToolShed/Contributions). This is a brand-new area previously included directly in the *[Galaxy Updates](http://wiki.galaxyproject.org/GalaxyUpdates)* news letters. Watch as this area develops as we work to summarize new repository updates in a concise and organized format. Feedback about how you would like to see this evolve (including general interest) is welcome. We will be posting a comment/feedback post at [Galaxy Biostar](https://biostar.usegalaxy.org/) to provide an opportunity to for our community to discuss. A summary will be added to [Trello](https://wiki.galaxyproject.org/Issues) once feedback is gathered for review and action. (A link to that post will be updated and added right here in this wiki within the next week - is truly a *brand-new* endeavor to break this out as a distinct wiki resource!!).
1. If you are new to Galaxy or wish to connect with our project more in 2015, these key links can help keep you updated about our activities and updates in real time (or at your own pace). Galaxy is a community project we would like to remind all about of the resources and venues available for news and support. Most reading our News Briefs are familiar with [Development](https://wiki.galaxyproject.org/Develop), [Cloud](https://wiki.galaxyproject.org/Cloud), [Local](https://wiki.galaxyproject.org/Admin/GetGalaxy), and other deployment resources such as [Admin](https://wiki.galaxyproject.org/Admin) plus [Tool](https://wiki.galaxyproject.org/Admin/Tools/ToolConfigSyntax) and [Tool Repository](https://wiki.galaxyproject.org/ToolShed) documenation, but below is a short list of even more places to visit and get connected:
  * [All News Reports](/News) and the [Hub for Distribution Details](/DevNewsBriefs)
  * [Twitter](/GalaxyOnTwitter) (wiki summary) or follow us directly at [https://twitter.com/galaxyproject](https://twitter.com/galaxyproject)
  * [/Events](/Events), [/Learn](/Learn), [Galaxy Biostar](https://biostar.usegalaxy.org/), [Support Resources](/Support) with FAQ help, [Mailing list](/MailingLists) subscription and archvies, and [Vimeo tutorials](http://vimeo.com/galaxyproject)
  * All know of [Public Galaxy Main](/Main), but have you reviewed the [Other Galaxy Public-hosted Servers](/PublicGalaxyServers) lately?
  * [/Teach](/Teach) resources are an exciting, growing, and key area for expansion throughout 2015, check out what is new!
  * Follow current development real-time and create, comment, and vote on active [Trello](https://trello.com/galaxyproject) tickets. As an open source project, we very much welcome community involvement. Not sure how to get involved or how to [create an account](https://trello.com/b/ijIE4lMx/welcome-board)? We have guidance available **[here...](https://wiki.galaxyproject.org/Issues)**, that includes a form to aid with quick ticket submission.
  * [/Community](/Community) resources. Overview about how we value and seek your input. Have your voice heard and get involved!
  * [Galaxy Project](/GalaxyProject) home page (hub for all resources, those listed above and more!)
  * See our wiki's right side bar menu &rarr; for more links to areas of interest to you
  * Our wiki is absolutely open for community contributions and improvements. We have plans in place for documentation updates in the upcoming year, but we greatly value the knowledge and insight shared through this resource by all that have ideas to make it even better. Let's work together to expand this wiki to meet the needs of the upcoming year as our project matures, as new research/development areas come up, and as Galaxy grows and evolves with new features and enhancements! Create a wiki account and contact us at "outreach at galaxyproject dot org" to become a wiki editor. 

# Upgrades
1. Review instructions for core build: [Getting the Stable Distribution](http://getgalaxy.org)
1. Review reset for Toolshed repos: [Resetting Metadata For Installed Repositories](http://wiki.galaxyproject.org/ResettingMetadataForInstalledRepositories)

# About Galaxy
<div class='left'><a href='http://usegalaxy.org'><img src='/Images/Logos/GalaxyLogoHighRes.png' alt='UseGalaxy.org' width="200" /></a></div>
**[About Galaxy](/Support/AboutGalaxy)** • [Galaxy Project](/GalaxyProject) • [/Admin](/Admin) • [/Issues](/Issues) • [Big Picture](/BigPicture) • [/Community](/Community) • [Get Galaxy](/Admin/GetGalaxy) • [/CloudMan](/CloudMan) • [Tool Shed](/ToolShed) • [/Develop](/Develop) • [News Briefs](/DevNewsBriefs) • [Servers](/PublicGalaxyServers) • [/Learn](/Learn) • [/Support](/Support) • [Galaxy Biostar](http://biostar.usegalaxy.org) • [/News](/News) • [Twitter](/GalaxyOnTwitter) • [/Events](/Events) • [/Teach](/Teach) • [Cite](/CitingGalaxy) • [Galaxy Team](/GalaxyTeam)
