---
autotoc: true
title: March 2015 Galaxy Release , (, v 15, ., 03, )
---
<div class='right'></div>
[All News Briefs](/DevNewsBriefs)
<br />
[Galaxy March Release Summary](/News/2015_03_GalaxyRelease)
<br />

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
    <td style=" border: none;"> <code>$ hg pull </code> <br /> <code>$ hg update latest_15.03</code> </td>
  </tr>
</table>


<br />

# Release Versioning

Starting with this distribution, an updated Galaxy release versioning system has been implemented. The versioning scheme is [Ubuntu-style](https://wiki.ubuntu.com/Releases). 

Releases versioning details are as follows:

* A `version_major` key has been added to `/api/configuration`.
* The file [version.py](https://github.com/galaxyproject/galaxy/blob/master/lib/galaxy/version.py) is the source of `version_major`.
* "Point" releases will be created periodically with updates to the release.
* "Point" releases are versioned as `YY.MM.point`, where ».point« begins at `.1` and increments for each point release.
* The first version is »15.03«, where the tag for the release is »v15.03«.
* Stable updates to »15.03« will be »15.03.1«, »15.03.2«, where the tag for the release is formatted as »v15.03.1«.
* Backwards compatibility: The tag »latest_15.03« in Bitbucket will always point to the newest »15.03« changeset.
* [XvAhmlb0](https://trello.com/c/XvAhmlb0) [ZHGSGosl](https://trello.com/c/ZHGSGosl)

# Release Branches

* The Github [master](https://github.com/galaxyproject/galaxy/tree/master) branch is similar to the former Bitbucket [stable](https://bitbucket.org/galaxy/galaxy-dist/branch/stable) branch. The difference is that whereas individual commits to the current stable release were previously applied to the stable branch, they are now only applied in a group, when a "point" release is made (e.g. `15.03.1`). 
* The Bitbucket stable branch now works the same way as the Github master branch.
* Permanent named branches are now created for each release. The 15.03 release is in the [release_15.03](https://github.com/galaxyproject/galaxy/tree/release_15.03) branch, which will be updated with additional changes throughout the lifecycle of this release, as was done with the Bitbucket `stable` branch in the past. When the Galaxy Team determines that a "point" release is necessary, this branch is merged to `master` and a point release tag is created. This branch exists in both the [Github](https://github.com/galaxyproject/galaxy) and [Bitbucket](https://bitbucket.org/galaxy/galaxy-dist) versions of Galaxy.

Thus, if you would like to upgrade to the 15.03 release and ensure you do not subsequently upgrade to the release after 15.03 (i.e. 15.05) when it is made, you can use the `release_15.03` branch. If you would always like to run the latest release (recommended), you should use the `master` (Git) or `stable` (Bitbucket) branch.

# Tool Redesign
Much of Galaxy’s core tool set has been redesigned. Several contain new functionality. These tools are included in the [Tool Shed](http://usegalaxy.org/toolsehd) and many are ready for use on Galaxy [/Main](/Main). Older Workflows may contain tools that automatically map to the new tools or Workflows may need minor adjustments. [c6Lkejro](https://trello.com/c/c6Lkejro) 

Be sure to check out the new [Galaxy NGS 101](/Learn/GalaxyNGS101) wiki (in progress). 

# Github

<div class='right'><a href='https://github.com/galaxyproject/galaxy'><img src='/Images/Logos/GitHubLogoText.png' alt='Galaxy on GitHub' width="100" /></a></div>

Galaxy development has moved to [Github](https://github.com/galaxyproject/galaxy), but stable/release changes are mirrored to Bitbucket. Deployers can continue to use Bitbucket as they have done in the past.

# Infrastructure
1. [Mercurial](http://mercurial.selenic.com) egg updated to version (3.2.4). [9A9uIav0](https://trello.com/c/9A9uIav0) [NUqyskst](https://trello.com/c/NUqyskst)
1. [SQLAlchemy](http://www.sqlalchemy.org) upgrade to version 0.9.8. [zGLtSgPW](https://trello.com/c/zGLtSgPW)
1. An invalid API key will now always return a »403« error. Triggers: API key is not found, is expired, or is not associated with an active account. [n59kZhXk](https://trello.com/c/n59kZhXk)
1. Python PEP-8 fixes and API documentation enhancements for Libraries API. Thanks to [Nicola Soranzo](/NicolaSoranzo). [MD4iUtzk](https://trello.com/c/MD4iUtzk)
1. Moved the vast majority of the test-data out of `GALAXY_ROOT` (remaining tools excluded). [kcYI9DnK](https://trello.com/c/kcYI9DnK) [xd7Uri9l](https://trello.com/c/xd7Uri9l)
1. New options that permits tools to access their `$REPOSITORY_INSTALL_DIR` location via `PATH`. [0pgF5PBQ](https://trello.com/c/0pgF5PBQ)
1. To preserve the original deployment state, a new option to disable runtime egg fetching was created (a configurable environment variable - see ticket for details). [lthRjVZq](https://trello.com/c/lthRjVZq)
1. Enhancement to permit configuration to disable egg fetching or the use of eggs entirely. [gfm6jilm](https://trello.com/c/gfm6jilm)
1. Six egg added to eggs.galaxyproject.org. [Pv84VVZR](https://trello.com/c/Pv84VVZR)
1. Reloading an external display application from disk can be done now without restarting Galaxy. [4ZlsSGA4](https://trello.com/c/4ZlsSGA4)
1. Functional tool tests now output xunit or nosetests style XML. [dpfrNZDq](https://trello.com/c/dpfrNZDq)
1. Expanded on Base, History, and HDA managers to provide a consistent facade for common model operations. [3A8nocpN](https://trello.com/c/3A8nocpN)
1. Upgraded [SQLAlchemy](http://www.sqlalchemy.org) to incorporate two major revisions in this release. [XbZwEuxx](https://trello.com/c/XbZwEuxx)
1. Removed use of the elementtree package and move to lxml.etree. [JJDxFdzK](https://trello.com/c/JJDxFdzK)
1. Stopped aborted restart when `stop_daemon()` fails. Thank you [Nicola Soranzo](/NicolaSoranzo). [1nlG2OmX](https://trello.com/c/1nlG2OmX)
1. Merged `rolling_restart.sh` in `run.sh` by adding a new `—wait` parameter and other enhancements. Thank you [Nicola Soranzo](/NicolaSoranzo). [QNKSMf2B](https://trello.com/c/QNKSMf2B) [S3WLFpGL](https://trello.com/c/S3WLFpGL) [jx0F2RKy](https://trello.com/c/jx0F2RKy)
1. Enhancements to `galaxy.ini` and `integrated_tool_panel.xml` documentation. Contributed by [Nicola Soranzo](/NicolaSoranzo). [4idoVDY8](https://trello.com/c/4idoVDY8)
1. New configuration option to isolate tool commands in their own shell. [kyS9dF0s](https://trello.com/c/kyS9dF0s)
1. Added a new configuration, `template_cache_path`, to reports_wsgi.ini.sample. Thank you Trevor Wennblom. [5vJ4EsDI](https://trello.com/c/5vJ4EsDI)
1. Provide [NGINX](http://nginx.org/en) packages with the upload module. [C3g6Ko8K](https://trello.com/c/C3g6Ko8K)
1. Backported fixes for GATK wrappers to all relevant latest_* releases. [i5hd7V1d](https://trello.com/c/i5hd7V1d) [GkQbKmvS](https://trello.com/c/GkQbKmvS)
1. Allow reloading External Display applications without restarting Galaxy. [02W1lMw7](https://trello.com/c/02W1lMw7)
1. Restructured `mvc/ui.js`. [HnnBFJy0](https://trello.com/c/HnnBFJy0)
1. Improved use of a SELECT statement to reliably retrieve table column names. Thank you James Johnson. [oYkjj4T3](https://trello.com/c/oYkjj4T3)
1. Enhanced a method to use first component of X-Forwarded-{For,Host,Scheme} when redirecting to the Galaxy browser. [BmbtnSon](https://trello.com/c/BmbtnSon) [BmbtnSon](https://trello.com/c/BmbtnSon)
1. Migrated `shed_tool_conf.xml` into /config. Contributed by [Nitesh Turaga](/NiteshTuraga). [6olcQrhR](https://trello.com/c/6olcQrhR)
1. Made installation of tool repositories more robust by setting time to "Epoch" instead of throwing server error when `repository_metadata.time_last_tested` is unset. [o09VBhr1](https://trello.com/c/o09VBhr1)
1. Change to allow anonymous users (those not logged into a Galaxy account) to view Pages with embedded Histories. [9Om6Odj2](https://trello.com/c/9Om6Odj2)
1. The GET /api/jobs request/response functionality has been expanded. Details in ticket. Thank you Thomas !McGowan. [H0Bvd737](https://trello.com/c/H0Bvd737)
1. SQlite query result rows can now be fetched by javascript visualization libs. Thanks to James Johnson. [S3R9AdA9](https://trello.com/c/S3R9AdA9)
1. Moved `blastdb_p.loc.sample` to the NCBI BLAST Tool Shed repository. Thanks to Lance Parsons. [lpZNmEzj](https://trello.com/c/lpZNmEzj)
1. Clearer error messages where parameter validation fails. Thanks to Peter Cock. [dRaX5reV](https://trello.com/c/dRaX5reV)
1. Added `pkg_resources` to load required Mako packages. Thanks to Lance Parsons. [JdxJ11U0](https://trello.com/c/JdxJ11U0)
1. Updated the Dockerfile template to the latest version our Galaxy Docker Container (updated at Galaxy release). Thanks to [Björn Grüning](/BjoernGruening). [Z45ZZ9C2](https://trello.com/c/Z45ZZ9C2)
1. Added a new API method to remove items from tool data tables. Thanks to Anthony Bretaud. [51JsMj0b](https://trello.com/c/51JsMj0b)
1. Create attribute »optional« for data column parameters. A compliment to »force_select«. [G5YtpQZK](https://trello.com/c/G5YtpQZK)
1. Enhanced the `collect_primary_datasets()` method to allow assignment of the defined output parameter for 3rd-party tools that manage tool outputs internally. [pncHLXdw](https://trello.com/c/pncHLXdw)

# New and Improved
1. Data Source/Provider Functions: filtering of transferred lines based on parsed column values. [jBMtQm0w](https://trello.com/c/jBMtQm0w)
1. Updated the [Tuxedo RNA-seq tools](http://cole-trapnell-lab.github.io/cufflinks/manual/) to version 2.2.1 and created new wrappers for Cuffquant and Cuffnorm. In the [Tool Shed](http://usegalaxy.org/toolshed) and installed on [http://usegalaxy.org](http://usegalaxy.org). [bfr0jKut](https://trello.com/c/bfr0jKut)
1. New Multiple Histories View. [XLkP9pCr](https://trello.com/c/XLkP9pCr)
1. Enhancement for how the »Available Genomes List« is generated for the display application [IGV](http://www.broadinstitute.org/igv). [1T49snMh](https://trello.com/c/1T49snMh) 
1. Enhanced the Data Managers' reference genome retrieval protocol to function better with UCSC's updated file naming/paths. Created a new Data Manager for `dbkeys/Genome Builds`. Find these in the [Tool Shed](http://usegalaxy.org/toolshed). [kPkwDHmi](https://trello.com/c/kPkwDHmi) [pmd6gSS6](https://trello.com/c/pmd6gSS6)
1. External Display Applications can now use Tool Data Tables. [b5kX6Eje](https://trello.com/c/b5kX6Eje)
1. Data Managers can now populate Tool Data Tables that are undeclared. [2FV2aVIH](https://trello.com/c/2FV2aVIH)
1. Tool Data Tables can load from a URL instead of a path. [xTsc9ojY](https://trello.com/c/xTsc9ojY)
1. Tuned and enhanced the `determine_output_formats()` method for tools. [jeMaAiap](https://trello.com/c/jeMaAiap)
1. Many changes have been made in order to support full usability of Dataset Collections in the near term. Latest progress includes:
  * Tools can now be written to explicitly produce one or more Dataset Collections. [ndVQmt3G](https://trello.com/c/ndVQmt3G) [RA15wpMH](https://trello.com/c/RA15wpMH)
  * Tools may now use `$input.element_identifier` during tool evaluation for input data parameters (useful for Workflows/Dataset Collections). [W5IChoLS](https://trello.com/c/W5IChoLS)
  * Implementation of Dataset Collections »list of pairs«. Additional work is in-progress (see ticket). [8hEO00xj](https://trello.com/c/8hEO00xj)
  * Dataset Collections updated to permit »Drag & Drop« functionality (»copy datasets« is still an option). [Zmy8aiFP](https://trello.com/c/Zmy8aiFP)
1. New [ZebrafishMine](http://www.zebrafishmine.org) Data Source tool. [u5OlE4kZ](https://trello.com/c/u5OlE4kZ)
1. New datatypes. Thanks to [Björn Grüning](/BjoernGruening).
  * Added [SnpEff](http://snpeff.sourceforge.net) datatypes. [accZ8KdI](https://trello.com/c/accZ8KdI)
  * Added `CompressedArchive` as a new datatype that does not uncompress during data upload. [1xtvpWil](https://trello.com/c/1xtvpWil)
  * Added Arff datatype. [fdVfagbS](https://trello.com/c/fdVfagbS)
  * Added »RNA dotplot matrix« as a new datatype. [vNmGhAGE](https://trello.com/c/vNmGhAGE)
1. API updated to include options for selecting data from or downloading (as a tar ball) tool-data content. Thank you Kyle Ellrott. [1874DlBw](https://trello.com/c/1874DlBw)
1. Allow BAM's `set_meta()` function to use [SAMTools 1](http://samtools.sourceforge.net) to generate the index (when `$PATH` points to SAMTools 1). [wVN3wSiT](https://trello.com/c/wVN3wSiT)
1. Upload UI enhancements that added »select all« functionality to severall operations. Contributed by Jennifer Cabral. [X4WscBt8](https://trello.com/c/X4WscBt8)
1. Modified API protocol when removing or refreshing a data table. [x2DLSNlN](https://trello.com/c/x2DLSNlN)
1. History API Prototypes: 
  * Consumers can filter index lists with a larger set of per-model options. [n72g8sZG](https://trello.com/c/n72g8sZG)
  * New use of limit, offset in index calls. [7QH3vxRO](https://trello.com/c/7QH3vxRO)
1. Updated location for new Tool’s »Tool Shed URL«: Tool Options pull down menu. (see graphic at right) [8GdLuEj2](https://trello.com/c/8GdLuEj2)
1. Tool Panel »search« function optimized. [6Bvbduci](https://trello.com/c/6Bvbduci)
1. Allowing Workflow step dependencies when no input/output files exist. [h5qZlgU8](https://trello.com/c/h5qZlgU8)
1. Workflow steps are now assigned UUIDs. [4U9e1och](https://trello.com/c/4U9e1och)
1. Updated the Workflow API by replacing preferred usage terminology (s/usage/invocation). [XNInq5KH](https://trello.com/c/XNInq5KH)
1. Tuning for History panel functions: Dataset search, multi-select Datasets to perform batch operations, related database modifications. [D4nLl5Ky](https://trello.com/c/D4nLl5Ky)
1. To enhance sharing of a History or Page, the forms now accept user IDs. Contributed by [Eric Rasche](/EricRasche). [qzYtnG4T](https://trello.com/c/qzYtnG4T) [DCjT4KdQ](https://trello.com/c/DCjT4KdQ)
1. Load the »Available Genomes« list from data tables for visualizations (Trackster). Thanks to Anthony Bretaudeau. [x8LMSD7Z](https://trello.com/c/x8LMSD7Z)
1. The History »Options« menu has been updated to better compliment other recent UI changes. [EEsM0abM](https://trello.com/c/EEsM0abM)
1. Several improvements to the History list view. [ltNMDNbZ](https://trello.com/c/ltNMDNbZ)
1. New [Fetch Genome](http://toolshed.g2.bx.psu.edu/repos/devteam/data_manager_fetch_genome_dbkeys_all_fasta) Data Manager updated to create the metadata needed by Trackster. [IKdX0vX5](https://trello.com/c/IKdX0vX5)
1. Addressed »multipart-upload« by using [Swift](https://swiftstack.com/openstack-swift) as an object storage backend. Thank you Charles Hsu. [U4kJBMk9](https://trello.com/c/U4kJBMk9)
1. Added [Planemo](http://https://github.com/galaxyproject/planemo) test file to Tool Shed upload »blacklist«. Thanks to [Björn Grüning](/BjoernGruening). [0Z1tfTVU](https://trello.com/c/0Z1tfTVU)
1. Added tool tests functions to assert properties about command, standard output, and standard error. [kNgOADAF](https://trello.com/c/kNgOADAF)

# Fixed
1. Fixed tool shed tests by creating database directory when one is missing from the repository. Thank you Jennifer Cabral. [mKBDDG8j](https://trello.com/c/mKBDDG8j)
1. Fixed provenance API request bug when data element has `job == None`. Thank you Kyle Ellrott. [fPVKzBZ6](https://trello.com/c/fPVKzBZ6)
1. Resolved a bug in Users API preventing administrators from creating users when `allow_user_creation` was False. [aLqEOOyd](https://trello.com/c/aLqEOOyd)
1. Fixed a GATK Evaluation Bug. [PXClb3PT](https://trello.com/c/PXClb3PT)
1. Corrected an "over-sanitized" info message after renaming a history (html was displaying). [MtAQNOqC](https://trello.com/c/MtAQNOqC)
1. Discovered and fixed issue with Paired list collection creator (key renaming broken). [QklilFk3](https://trello.com/c/QklilFk3)
1. Fix for preventing non-admins from running Data Managers through the API.[EeHJP167](https://trello.com/c/EeHJP167)
1. Egg-fetching related bugfixes. [9L0HlQ0u](https://trello.com/c/9L0HlQ0u)
1. Fixes for resetting metadata on ToolShed Repositories. [lGmlkvdr](https://trello.com/c/lGmlkvdr)
1. Small fixes for updated workflow scheduler. [fF7pUNIG](https://trello.com/c/fF7pUNIG)
1. Change to use samtools version 1.x to generate BAM indexes if it is first in `$PATH`. [UOVlg7nL](https://trello.com/c/UOVlg7nL)
1. Removed displayed paragraph tags from history/rename feedback messages [V4VMvDeY](https://trello.com/c/V4VMvDeY)
1. Fixed Picard index Data Manager so that it no longer indicates failure (red dataset result in admin history) when it is actually successful. [b1cHiIw0](https://trello.com/c/b1cHiIw0)
1. Corrected certain UI confirmation dialogs that were non-functional. [LWkgOJRV](https://trello.com/c/LWkgOJRV)
1. Fix for installing `.loc` files from the [Tool Shed](http://usegalaxy.org/toolshed) to respect `shed_tool_data_path` in `galaxy.ini.sample`. [njgEucfY](https://trello.com/c/njgEucfY)
1. Galaxy Report Webapp is now functioning when a [MySQL](http://www.mysql.com) database is used (functionality was already intact when [PostgreSQL](http://www.postgresql.org) was used). [Q91djTUc](https://trello.com/c/Q91djTUc)
1. The Test ToolShed RSS feed no longer fails when `time_last_tested == None`. [RrVBYIBZ](https://trello.com/c/RrVBYIBZ)
1. Fetching zip-safe eggs that depend on other eggs were failing - this has been corrected. [HWuxsftB](https://trello.com/c/HWuxsftB)
1. Logging out through External authentication `external_auth_logout_url` now resets impersonation correctly (logs out of impersonated account). [4SX0BZKA](https://trello.com/c/4SX0BZKA)
1. Fixed tabular dataset display so that it sets the correct extension and mime-type when `preview=False` and `to_ext` is not provided. [uZnZdFGu](https://trello.com/c/uZnZdFGu)
1. Additions to the js environment by `require.js` now correctly apply cache busting (avoiding user errors). [s2klR2Bb](https://trello.com/c/s2klR2Bb)
1. Corrected a re-run operation that was reporting incorrect dataset names. [eniXoRB6](https://trello.com/c/eniXoRB6)
1. Fixed a history dataset counter that was not updating after a tool run. [2slkkPQW](https://trello.com/c/2slkkPQW)
1. Several Fixes for Tool Data Tables. [scA7eWKH](https://trello.com/c/scA7eWKH)
1. Fixed History, HDA, and UI post-managers-refactoring. [UPiay3qr](https://trello.com/c/UPiay3qr)
1. Corrected Workflow/Visualization links that were including an extraneous slash »/». [dtccfVRK](https://trello.com/c/dtccfVRK)
1. Replaced missing `get_initial_value function` in `LibraryDatasetToolParameter`. [MVOasuZY](https://trello.com/c/MVOasuZY)
1. Correction for Tool Shed not having `config.shed_tool_data_path`. [Og1WxqSA](https://trello.com/c/Og1WxqSA)
1. Fixed bug in multi-history view that wasn’t rendering well in [Safari](http://https://www.apple.com/safari). [oCU2Kvkt](https://trello.com/c/oCU2Kvkt)
1. Resolved processing naming conflicts with uWSGI and Control Queues. [ahDk0lx4](https://trello.com/c/ahDk0lx4)

# News and Community
* **[GCC 2015](http://gcc2015.tsl.ac.uk/)** has opened [Abstract Submissions](/News/GCC2015AbstractSubmissionOpen). 
* Two Hackathons are now scheduled to occur *before* and *during* GCC 2015. 
  * [GCC2015 Coding Hackathon](http://gcc2015.tsl.ac.uk/organisers/hackathon)
  * New! [GCC2015 Data Wrangling Hackathon](http://gcc2015.tsl.ac.uk/organisers/data-hackathon)
* [All Galaxy News](/News) and the [Hub for Release News](/DevNewsBriefs)
* [Twitter](/GalaxyOnTwitter) (wiki summary) or follow us directly at [https://twitter.com/galaxyproject](https://twitter.com/galaxyproject)
* [/Events](/Events), [/Learn](/Learn), [Galaxy Biostar](https://biostar.usegalaxy.org/), [Support Resources](/Support) with FAQ help, [Mailing list](/MailingLists) subscription and archvies, and [Vimeo tutorials](http://vimeo.com/galaxyproject)
* All know of [Public Galaxy Main](/Main), but have you reviewed the [Other Galaxy Public-hosted Servers](/PublicGalaxyServers) lately?
* [/Teach](/Teach) resources are an exciting, growing, and key area for expansion throughout 2015, check out what is new!
* Follow current development real-time and create, comment, and vote on active [Trello](https://trello.com/galaxyproject) tickets. As an open source project, we very much welcome community involvement. Not sure how to get involved or how to [create an account](https://trello.com/b/ijIE4lMx/welcome-board)? We have guidance available **[here...](https://wiki.galaxyproject.org/Issues)**, that includes a form to aid with quick ticket submission.
* [/Community](/Community) resources. Overview about how we value and seek your input. Have your voice heard and get involved!
* [Galaxy Project](/GalaxyProject) home page (hub for all resources, those listed above and more!)
* See our wiki's right side bar menu &rarr; for more links to areas of interest to you
* Our wiki is absolutely open for community contributions and improvements.

# Security
1. Various low-vulnerability-level security fixes. [U6yj2pPr](https://trello.com/c/U6yj2pPr)
1. Galaxy logs no longer leak database connection information. [VjEqTxlT](https://trello.com/c/VjEqTxlT)
1. The email for resetting an account password is now a link. [SKjU40t6](https://trello.com/c/SKjU40t6)
1. New »shared secret« between Galaxy and upstream proxies, thereby preventing a specific potential impersonation attack. Thank you [Eric Rasche](/EricRasche). [jTHrXHol](https://trello.com/c/jTHrXHol)

# Upgrades
1. Review instructions for core build: [Getting the Stable Distribution](http://getgalaxy.org)
1. Review reset for Toolshed repos: [Resetting Metadata For Installed Repositories](http://wiki.galaxyproject.org/ResettingMetadataForInstalledRepositories)

# About Galaxy
<div class='left'><a href='http://usegalaxy.org'><img src='/Images/Logos/GalaxyLogoHighRes.png' alt='UseGalaxy.org' width="200" /></a></div>
**[About Galaxy](/Support/AboutGalaxy)** • [Galaxy Project](/GalaxyProject) • [/Admin](/Admin) • [/Issues](/Issues) • [Big Picture](/BigPicture) • [/Community](/Community) • [Get Galaxy](/Admin/GetGalaxy) • [/CloudMan](/CloudMan) • [Tool Shed](/ToolShed) • [/Develop](/Develop) • [News Briefs](/DevNewsBriefs) • [Servers](/PublicGalaxyServers) • [/Learn](/Learn) • [/Support](/Support) • [Galaxy Biostar](http://biostar.usegalaxy.org) • [/News](/News) • [Twitter](/GalaxyOnTwitter) • [/Events](/Events) • [/Teach](/Teach) • [Cite](/CitingGalaxy) • [Galaxy Team](/GalaxyTeam)
