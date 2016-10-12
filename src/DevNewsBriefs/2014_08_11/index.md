---
autotoc: true
pagetitle: August 11, ,,  2014 Galaxy Distribution News Brief
---
<div class='right'></div>

[All News Briefs](/DevNewsBriefs)
<br />
[Distribution Summary 2014_08_11](/News/2014_08_11_Galaxy_Distribution)

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
    <td style=" border: none;"> <code>$ hg pull </code> <br /> <code>$ hg update latest_2014.08.11</code> </td>
  </tr>
</table>


<br />
# Security
<!> On July 31st, we fixed a serious security vulnerability in Galaxy and notified the community. Please ***upgrade immediately*** if you haven’t done so already: [Instructions](http://tinyurl.com/nhgmbc5)

Many thanks to Inge Alexander Raknes for reporting the issue [T1eldqfK](https://trello.com/c/T1eldqfK). Stay connected! We both [email](https://wiki.galaxyproject.org/MailingLists) and [tweet](https://twitter.com/galaxyproject) security alerts.

# New! Citations
[Wiki](http://wiki.galaxyproject.org/Admin/Tools/ToolConfigSyntax#A.3Ccitations.3E_tag_set), Authored by Björn Grüning and Peter Cock

Tools now annotate citation information. Tools annotate citations using either DOIs or raw BibTeX - these in turn are shown as formatted citations below the help text on tool forms and may be copied to reference managers as raw `BibTeX`. All annotated citations in a history can also be obtained using the history options menu. [kY7RCnd0](https://trello.com/c/kY7RCnd0)	

# New! Docker
<div class='right'><a href='http://wiki.galaxyproject.org/Admin/Tools/Docker'><img src='/Images/Logos/DockerInGalaxyAnnotated.png' alt=' ' width=220 /></a></div>

[Wiki](https://wiki.galaxyproject.org/Admin/Tools/Docker), Authored by Eric Rasche

Added tool-to-container mechanism to package dependencies that tool developers can provide as an alternative to requirements and Galaxy's `tool_dependency_dir`. You can now create »Dockerized« tools, meaning tools which run within a docker container. [9lGgDlOJ](https://trello.com/c/9lGgDlOJ)

Docker integration provides even greater security with [Pulsar](https://github.com/galaxyproject/pulsar) (formerly called the LWR) to expose only the staged job directory to the running container. [fUOhP58d](https://trello.com/c/fUOhP58d)

# Improved
1. Improved data loading efficiency in Trackster through »reference-based« compression for read tracks. [qoDpckp7](https://trello.com/c/qoDpckp7)
1. DRMAA Python version in eggs.ini updated to 0.7.6. This version has better string handling and supports Python 3. Upgraded by Dan Blanchard. [E6h7wold](https://trello.com/c/E6h7wold)
1. Added extension point to define site-specific parameters to aid defining job destinations. Based on contributions from Hector del Risco. [H87LotF7](https://trello.com/c/H87LotF7)	
1. Per-destination concurrency limits for jobs linked to destination or destination tag. Aids in avoiding queue bottlenecks or user »quota-exceeded« job rejections/failures. [o40wcWaU](https://trello.com/c/o40wcWaU)
1. Enhanced dynamic job destinations throw new `JobNotReadyException` to indicate delayed decision. [xdf6ibmC](https://trello.com/c/xdf6ibmC)
1. Created higher-level utilities about job metrics and users to better track and manage priorities (i.e. do it yourself meta-fairshare). [wDjPSAsy](https://trello.com/c/wDjPSAsy)
1. Setting user preferences, toolbox filters, and default permissions now accessible when using external authentication. [AnUdQJqj](https://trello.com/c/AnUdQJqj)
1. Implemented unit testing for routes in Galaxy app. Allows for testing both how URLs are going to map to controllers and actions as well as testing what paths will be produced by `url_for`. [TG5a8OHU](https://trello.com/c/TG5a8OHU)
1. Added sqlite datatype and corresponding dataprovider and followed up with improved sqlite whitelisting by using the sqlparse package. Developed by Ira Cooke. [2e0ulmi1](https://trello.com/c/2e0ulmi1) [tNaEWcg7](https://trello.com/c/tNaEWcg7)	
1. Deprecated use of the database_engine_option_strategy = threadlocal in SQLAlchemy. The option was removed from `universe_wsgi.ini.sample`. [iXOD4vrg](https://trello.com/c/iXOD4vrg)
1. Added function to assign detected dataset input format based on input format (action similar to assignment of stand-alone output format). Designed by Michael Crusoe at the GCC2014 Hackathon. [8wf9mNLy](https://trello.com/c/8wf9mNLy) [F29Wu1ET](https://trello.com/c/F29Wu1ET)
1. Workflow `PostJobActions` function »`Rename`« now displays available tool inputs for `#{input1} ` as options (custom label or actual tool input id). Additional `PostJobActions` functions to be enhanced in future upgrades. [9HkqqTut](https://trello.com/c/9HkqqTut)
1. Action "create new workflow" now opens directly into a workflow »Edit« view, after setting name and annotation. [i8d5egqY](https://trello.com/c/i8d5egqY)
1. Easier to use input mapping when running workflows. A new parameter 'inputs' can now be specified. Additionally, "inputs" is more flexible and can revert to the old behavior by specifying a new parameters. [wzp0TcVq](https://trello.com/c/wzp0TcVq)
1. The workflows API now displays annotations in detail view. [wJVEsJvI](https://trello.com/c/wJVEsJvI)
1. Enable stopping jobs when history is deleted via the API and update comments related to stopping jobs when a history is deleted using the API. Authored and tuned by Ilya Sytchev. [GE7vF8lA](https://trello.com/c/GE7vF8lA) [PgiFQMMj](https://trello.com/c/PgiFQMMj) [Tbota8xG](https://trello.com/c/Tbota8xG)
1. Option to delete, rather than hide, intermediate datasets in workflows through the use of `PostJobActions`. [YfLGkJKe](https://trello.com/c/YfLGkJKe)
1. Ability to locate tools relative to the `tool_conf` file using a string through the template resolution of `${tool_conf_dir} `. [IABOzpVk](https://trello.com/c/IABOzpVk)
1. New dataset collections prototype for creating a dataset collection of pairs (a list of N paired collections). More enhancements planned: manually pair datasets and permit re-ordering. [CIIdaxl2](https://trello.com/c/CIIdaxl2)
1. Add API methods for copying dataset collections between histories. [s5tJOmQC](https://trello.com/c/s5tJOmQC)
1. Allow using data collection steps via workflow API. Implement API test for this and upgrade test for previous commit related improved workflow run endpoint. [0MY3X3SG](https://trello.com/c/0MY3X3SG)
1. Rename LWR to Pulsar - eliminate older LWR cruft debris and provide deeper Galaxy integration and easier configuration. [OO22czXz](https://trello.com/c/OO22czXz)
1. Non-daemon asynchronous LWR operation implemented along with other relevant upgrades. [xjlJH3N4](https://trello.com/c/xjlJH3N4)
1. Update LWR client to allow configuration of file actions via YAML. [jbEnWNB4](https://trello.com/c/jbEnWNB4)
1. Implemented Tool Shed checksums, including the dependent `setup_python_environment` changes. In collaboration with Björn Grüning. [RG2Undyx](https://trello.com/c/RG2Undyx) [c6oLfsli](https://trello.com/c/c6oLfsli)
1. More MQ configuration for exception states in the LWR client. [mUlMj6l9](https://trello.com/c/mUlMj6l9)
1. Changes to ensure the use of `galaxy.util.json` rather than `json` from the python libraries. Solution from Christopher Bare. [U19dsyjl](https://trello.com/c/U19dsyjl)
1. Add an empty_field validator to `gtf2bedgraph.xml`. Contributed by Björn Grüning. [YBKeZeL3](https://trello.com/c/YBKeZeL3)
1. Tabular display improved for datasets having a large number of columns. Now fills viewable container window without additional UI scrolling. Display »chunk size« is now configurable. Request and Testing from Peter Cock. [28dasaLn](https://trello.com/c/28dasaLn) [4IrKYxy6](https://trello.com/c/4IrKYxy6)
1. Because `package_ncurses_5_9` fails to build on filesystems that don't support hardlinks, now enable symlinks by default. Developed by Björn Grüning. [bIolgPxx](https://trello.com/c/bIolgPxx)
1. Datasource Tools are using provided name on Job executed page (added in an earlier release). [qjaaGcRg](https://trello.com/c/qjaaGcRg)
1. Added to Toolshed repository actions the ability to Uninstall an installed repository that is in an error state and to delete a repository that is in a "new" state. [GbPdcxOp](https://trello.com/c/GbPdcxOp)
1. Decided to strip() the repository names from the Toolshed "create repository" form. [NGUuuCRj](https://trello.com/c/NGUuuCRj)

# Fixed
1. Fix collection for recent Tool Shed code cleanups. For example, repository installations with the API using `./scripts/api/install_tool_shed_respositories.py`. Implemented by Björn Grüning. [mdNIKjbV](https://trello.com/c/mdNIKjbV)	
1. Fix for interpreter on version commands (when different from command interpreter). Tracked down by Will Holtz, patched by Peter Cock. [d5AOLrGd](https://trello.com/c/d5AOLrGd)
1. Admin operation »Impersonate a user« now functions when using external authentication. [zwqNwflD](https://trello.com/c/zwqNwflD)
1. Public Galaxy Main’s Proxy is now serving for bigBed formatted datatypes correctly in external application visualization application (such as IGB). [ZLH7Lowr](https://trello.com/c/ZLH7Lowr)
1. URL <input> tag corrected (was missing parameters) to permit proper data_source interpretation, fixing problematic URL transfer for data upload. [88dgqGuA](https://trello.com/c/88dgqGuA)
1. Fix issue where running a »dockerized« tool, without a local docker image, fails (only) the first time it is used. [B4Sy7VyQ](https://trello.com/c/B4Sy7VyQ)
1. Fix `PBS GALAXY_SLOTS` configuration for torque environments explicitly defining num slots. [ygMf67oE](https://trello.com/c/ygMf67oE)
1. Fix to allow editing of workflows on the fly, for radio buttons, too. Modified by Saket Choudhary.[Ww1pg6jX](https://trello.com/c/Ww1pg6jX)
1. Fix workflow multi-run inside of conditional, repeats if tool form state updated (e.g. because conditional param updated or repeat block added). [qUfwVlwT](https://trello.com/c/qUfwVlwT)
1. 103 is not 105 initial migration fix when using `threadlocal` strategy. [OLA2j6FA](https://trello.com/c/OLA2j6FA)
1. Safari 6.1.4 issue with laying out `flexboxes` (associated with dataset collections), making dialog usable, is now fixed. [tDlTsXPx](https://trello.com/c/tDlTsXPx)
1. Safari 7.0.4 caching external view application 302 redirect links is also fixed. [optldnPm](https://trello.com/c/optldnPm)
1. Added `job_metrics_conf.xml` to `.hgignore`. Contributed by Nicola Soranzo. [FLet9NVs](https://trello.com/c/FLet9NVs)
1. Fix »figshare« DOI handling in citations. Testing support from Michael Crusoe. [LOfrzvGz](https://trello.com/c/LOfrzvGz)	
1. Dataset Collection of »type paired« no longer producing an error while running a primary tool. New automated test created. [u6WglV0H](https://trello.com/c/u6WglV0H) [e7SFiWio](https://trello.com/c/e7SFiWio)
1. Upload of tools to a Tool Shed with Dataset Collections and tests defined no longer fails. Contributed by Aaron Petkau. [dHqGQadb](https://trello.com/c/dHqGQadb)
1. Allow history panel UI to contain datasets and dataset collections with the same id. [rpfCwB1X](https://trello.com/c/rpfCwB1X)
1. Other dataset collection bugs identified and remedied. [0OUxFFAO](https://trello.com/c/0OUxFFAO)
1. Fix for using `$output.extra_files_path` with nested object stores. May require additional tuning. Identified by Björn Grüning. [a9PVThgp](https://trello.com/c/a9PVThgp)	
1. Close file handles for `convert delimiters to tab` tool. Contributed by Saket Choudhary. [Qm263dGS](https://trello.com/c/Qm263dGS)
1. Fix spelling mistakes in hopefully all of the `install_*_environments`. Tuned by Björn Grüning. [6XLCjlEc](https://trello.com/c/6XLCjlEc)
1. Fix `shutil.move` for converted files in `upload.py`. [qH7yZfCf](https://trello.com/c/qH7yZfCf)
1. Correct Test Toolshed’s invalid certificate and other associated bugs. [VeCcUAeb](https://trello.com/c/VeCcUAeb)
1. Missing images for "fastq_quality_boxplot" tool added to the repository and help references updated. [i87tG6kl](https://trello.com/c/i87tG6kl)
1. Modify `url_for` in `history_contents.py` to effort to avoid certain failures on Main. [05DiHiDE](https://trello.com/c/05DiHiDE)
1. Tool form logic for displaying allow_remap option was inverted. Now corrected. [WfpN4Pet](https://trello.com/c/WfpN4Pet)
1. Added back `InterMine` tools removed in 401ee23dcf2f70d4be0e975bb3e00a43ae1dfdd0. [B6eddsCv](https://trello.com/c/B6eddsCv)
1. Fix the 3xx redirect handler in the Toolshed's API methods to correctly handle `PUT` requests. [oUC4DUJC](https://trello.com/c/oUC4DUJC)
1. Fix for exporting Toolshed repositories that contain package recipes that define additional packages needed only for compiling the dependent package. [ClgcV0Sn](https://trello.com/c/ClgcV0Sn)
1. Correction for malformed Toolshed URLs constructed if toolshed under subdirectory. [doBBlYsY](https://trello.com/c/doBBlYsY)
1. Resolved an issue where when working in the Toolshed, if you haven't updated `packageopenbabel*`, but you are updating an other package (osra for example) that depends on the new version of openbabel ... the package is installed twice. [AZpDkXED](https://trello.com/c/AZpDkXED)
1. Install and test framework was not locating the `test-data` directory for repositories on main Tool Shed for a short time window, but was quickly made functional. [9mLrFhTJ](https://trello.com/c/9mLrFhTJ)
1. Toolshed now respects macros when parsing package version to produce warning. [TeguDYSq](https://trello.com/c/TeguDYSq)
1. Remedied a Toolshed option `download_file` that was altered with a `change_working_dir` function found to be not backwards compatible. [CEg62Aky](https://trello.com/c/CEg62Aky)
1. Fix Main Tool Shed installation errors (URL related) for repositories owned by `devteam` (multiple). [uPaD4wLt](https://trello.com/c/uPaD4wLt) [sI1mnNLH](https://trello.com/c/sI1mnNLH)

# Gossip
1. Did you read above that LWR was officially renamed to PULSAR ? We don’t normally tag our own, but there’s a rumor his initials are *John Chilton*, or was it [Natefoo](https://en.wikipedia.org/wiki/Interstellar_communication)?
1. Galaxy CHARTS were a big wow! on [Twitter](https://twitter.com/galaxyproject), and we thank you for that, but they didn’t make the last News Brief. Get caught up and make sure you don’t miss the full color **[Charts Wiki](https://wiki.galaxyproject.org/Learn/Visualization/Charts)** <div class='red'>this</span> <div class='blue'>time</span> <div class='green'>around</span> !
1. Docker, Docker, [DOCKER](https://www.docker.com) .. chant (er, VOTE) in [Trello](https://wiki.galaxyproject.org/Issues) and you shall likely receive.
1. Psss… we migrated a few tools off Main, but they’re enjoying good company in the Toolshed until you need them. Find your favorite `SOLiD` mapping tools there: [BWA](https://toolshed.g2.bx.psu.edu/view/devteam/bwa_wrappers) & [Bowtie](https://toolshed.g2.bx.psu.edu/view/devteam/bowtie_color_wrappers)
1. And we heard that there is quite a bit of deploy and config going on over at the [Galaxy Biostars](http://biostar.usegalaxy.org) forum. From where oh where will the advice come from next? Claiming one’s account is tricky - first you need to log into your [Main](http://usegalaxy.org) account, next find a tool form, and then finally click a button in the upper right corner. [Jump in…](https://wiki.galaxyproject.org/Support/Biostar)
1. For more news, we'd like to share the prior two *Updates*:<br />
  • [July 2014 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2014_07)<br />
  • [August 2014 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2014_08)

# Galactic Stars
{*} {*} {*} {*} {*} and big **Thank-You** to our community of contributors!

# Upgrades
1. Review instructions for core build: [Getting the Stable Distribution](http://getgalaxy.org)
1. Review reset for Toolshed repos: [Resetting Metadata For Installed Repositories](http://wiki.galaxyproject.org/ResettingMetadataForInstalledRepositories)

# About Galaxy
<div class='left'><a href='http://usegalaxy.org'><img src='/Images/Logos/GalaxyLogoHighRes.png' alt='UseGalaxy.org' width="200" /></a></div>
**[About Galaxy](/Support/AboutGalaxy)** • [Galaxy Project](/GalaxyProject) • [/Admin](/Admin) • [/Issues](/Issues) • [Big Picture](/BigPicture) • [/Community](/Community) • [Get Galaxy](/Admin/GetGalaxy) • [/CloudMan](/CloudMan) • [Tool Shed](/ToolShed) • [/Develop](/Develop) • [News Briefs](/DevNewsBriefs) • [Servers](/PublicGalaxyServers) • [/Learn](/Learn) • [/Support](/Support) • [Galaxy Biostar](http://biostar.usegalaxy.org) • [/News](/News) • [Twitter](/GalaxyOnTwitter) • [/Events](/Events) • [/Teach](/Teach) • [/Issues](/Issues) • [Cite](/CitingGalaxy) • [Galaxy Team](/GalaxyTeam)
