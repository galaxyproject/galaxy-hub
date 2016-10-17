---
autotoc: true
title: October 06, ,,  2014 Galaxy Distribution News Brief
---
<div class='right'></div>

[All News Briefs](/src/DevNewsBriefs/index.md)
<br />
[Distribution Summary 2014_10_06](/src/News/2014_10_06_Galaxy_Distribution/index.md)

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
    <td style=" border: none;"> <code>$ hg pull </code> <br /> <code>$ hg update latest_2014.10.06</code> </td>
  </tr>
</table>


<br />

# New! Galaxy Reorganized

Certain files in the Galaxy clone root directory have been renamed, moved, removed, and/or have modified usage. 

There is configuration resolution solution in place that will automatically use the config files in the old locations if they exist, or the new locations if they do not.  Administrator can also move any non .sample versions of modified files into config/ to match the new directory structure. 
<br />
Specifically, the following changes were made:

1. Config files moved into the sub-directory *config/* .
1. *universe_wsgi.ini* renamed to *galaxy.ini* and is now located in the *config/* directory.
1. Allow specifying of *galaxy.ini* defaults with environment variables.
1. Removed unneeded contents of the root directory. 
1. Visualizations in Trackster now default to using config from new structure.
1. Public release of [Galaxy Ansible](https://galaxy.ansible.com/) roles for installing, configuring, and managing 
1. Tool development simplified through [GalaxyProject at GitHub](https://github.com/galaxyproject/tools-devteam)
1. [Galaxy](http://getgalaxy.org) and [Pulsar](https://www.openhub.net/p/pulsar), a perfect team
<br />
[PR#495](https://bitbucket.org/galaxy/galaxy-central/pull-request/495/) [PR#501](https://bitbucket.org/galaxy/galaxy-central/pull-request/501) [discussion](https://github.com/bgruening/docker-galaxy-stable/issues/6) [XynZwvnV](https://trello.com/c/XynZwvnV) [G1SuUSxn](https://trello.com/c/G1SuUSxn) [s6pCnhMc](https://trello.com/c/s6pCnhMc) [ddTT39sA](https://trello.com/c/ddTT39sA) [8kFDSTBh](https://trello.com/c/8kFDSTBh)
<br />
We thank Björn Grüning and other members of the community that helped to guide and support us through this transition.

# New! History and Dataset Functions
Several enhancements and improvements have been made to facilitate easier viewing and manipulation of data within the Galaxy UI and Job execution choices. These include:

1. You can now run many big tools on [TACC's](https://www.tacc.utexas.edu/) Stampede supercomputer (Official Beta(tm)!). Details [here ...](http://tinyurl.com/q8azfve)
1. The current/active dataset (the dataset being shown/manipulated in the center panel of 'analyze data') is now highlighted. ~~Hovering over a history dataset lights up the other datasets from which it was derived~~ (Edit: this was mistakenly reported as a released feature).  
1. One can now view datasets within collections that are within published or page embedded histories (as well as admin views), plus other dataset collection test and design improvements, including drill-down and fold-down viewing methods.
1. New ‘Dataset Chooser’ that allows the user to select one or more datasets from a particular source (current history, other histories, library datasets), [example](https://bitbucket.org/carlfeberhard/galaxy-visualization-dataset-choice), [wiki](https://wiki.galaxyproject.org/VisualizationsRegistry/Cookbook#How_can_I_add_a_way_for_the_user_to_select_a_different_.28or_additional.29_datasets.3F), and [future upgrades](https://trello.com/c/UfD9AMCi). 
1. The scroll position of the history panel is now stored and will persist across page loads. In other words, if you've scrolled to a dataset at the beginning/bottom of your history, the history panel will open to that same position when re-loaded. The scroll position will reset to the top when the history is switched or a new dataset is added.
1. Datasets that time-out (and fail) in a smaller queue are automatically resubmitted to the longer running queue. This ‘re-submitted’ state is displayed when a dataset is fully expanded in the history panel. [6BFJfDqX](https://trello.com/c/6BFJfDqX)
1. When deleting the current history from the history options, the most recent history is set as the new current one instead of creating a new history. A new history is still created if the user is anonymous or if there are no non-deleted histories remaining. [jPMEX46R](https://trello.com/c/jPMEX46R)

<br />
[G4e5saQb](https://trello.com/c/G4e5saQb) [fdlgSAYB](https://trello.com/c/fdlgSAYB) [PVdbbpQS](https://trello.com/c/PVdbbpQS) [lAFJnOfd](https://trello.com/c/lAFJnOfd) [nQmxOG60](https://trello.com/c/nQmxOG60) [m8gqYuTd](https://trello.com/c/m8gqYuTd) 


# Improved
1. Created a simple [status.galaxyproject.org](https://status.galaxyproject.org/) page to track [UseGalaxy.org](http://usegalaxy.org) availability plus other primary servers. [poeCC0KG](https://trello.com/c/poeCC0KG)
1. Dynamic destination enhancements aimed at enabling co-locating data and (cloud) bursting. This was a complex upgrade, please review the links for full details: [PR#465](https://bitbucket.org/galaxy/galaxy-central/pull-request/465/) [lqqDhy6l](https://trello.com/c/lqqDhy6l)
1. [jQuery](http://jquery.com) updated to 1.11. Review more about the upgrade [here](http://jqueryui.com/upgrade-guide/1.11/). [rhv5Nj7B](https://trello.com/c/rhv5Nj7B)
1. Better reporting of details related to errors to facilitate troubleshooting. This enhancement only works with [AJAX](http://api.jquery.com/jquery.ajax/) done through [jQuery](http://jquery.com). [anbum96x](https://trello.com/c/anbum96x)
1. New APIs for managing permissions of libraries, library datasets plus folders, method to retrieve older versions of library datasets. [woyoS8Wo](https://trello.com/c/woyoS8Wo)
1. Automatically re-queue jobs that fail under specific conditions (such as walltime timeouts) to alternate cluster destinations. [36HT4odq](https://trello.com/c/36HT4odq) 
1. Optimize the job query to only select jobs ready to run at startup. [XyHzzPGk](https://trello.com/c/XyHzzPGk)
1. Enable the specification of a UUID when using the upload tool.  Contributed by Kyle Ellrott. [PR#463](https://bitbucket.org/galaxy/galaxy-central/pull-request/463/) [OF9fARUc](https://trello.com/c/OF9fARUc)
1. UUID detection passed as input is now enabled. See the [PR#471](https://bitbucket.org/galaxy/galaxy-central/pull-request/471) for a first use case (added to Workflows). Our thanks again to Kyle Ellrott. [7MmRsXns](https://trello.com/c/7MmRsXns) [684L4W7D](https://trello.com/c/684L4W7D) 
1. Upgrade to add a new search functionality when browsing or managing Data Library user roles through the UI. [woyoS8Wo](https://trello.com/c/woyoS8Wo)
1. Enhanced the Data Libraries API to allow for copying hdas directly in, without re-uploading. [lwBDzAEi](https://trello.com/c/lwBDzAEi)
1. Clarification about config requirements related to Virtual Environments ([virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/) and [Python](https://www.python.org/) version checks, before executing run.sh. Thanks goes to Lance Parsons. [hcUU4kzU](https://trello.com/c/hcUU4kzU). Duplicate of [PR#486](https://bitbucket.org/galaxy/galaxy-central/pull-request/486/) [IAN9mx71](https://trello.com/c/IAN9mx71) 
1. Build sites admin files are now configurable to fully support display application functionality. [YPxlmedb](https://trello.com/c/YPxlmedb)
1. The `tool_shed_repositories.py` Tool Shed repo install 
1. Security enhancement that will permit the blocking of remote access if the user is not an admin.  Thank you to James Johnson. Review the pull request and ticket for details. [PR#468](https://bitbucket.org/galaxy/galaxy-central/pull-request/468/) [qbmqjhor](https://trello.com/c/qbmqjhor)
1. Admin jobs page now includes more information about recently run jobs. Useful for getting a global view of jobs and for reviewing jobs that are not tracked in the UI history (such as history import/export jobs).  Thanks to Kyle Ellrott. [PR#466](https://bitbucket.org/galaxy/galaxy-central/pull-request/466/) [PR#467](https://bitbucket.org/galaxy/galaxy-central/pull-request/467/) (add 466 ticket here) [fjXBjXti](https://trello.com/c/fjXBjXti)
1. Added support for Illumina 1.8+ fastq headers to `tools/fastq/fastq_paired_end_joiner`. Thanks to Simone Leo. [PR#281](https://bitbucket.org/galaxy/galaxy-central/pull-request/281/)[PR#177](https://bitbucket.org/galaxy/galaxy-central/pull-request/177/) [YjjFv3Rv](https://trello.com/c/YjjFv3Rv) 
1. Updated wiki documentation for admin activities related to [data integration](http://wiki.galaxyproject.org/Admin/DataIntegration). [FinBeDet](https://trello.com/c/FinBeDet)
1. Function ‘migration 104’ was using a ‘Session()’ object and this conflicted with `threadlocal` configuration. Fix removed `threadlocal` from `universe_wsgi.ini.sample`, the root cause of ‘103 is not 105' migration errors seen lately. [PR#439](https://bitbucket.org/galaxy/galaxy-central/pull-request/439/) [EVVA5mmZ](https://trello.com/c/EVVA5mmZ)

# Fixed
<div class='right'> ![](/Images/NewsGraphics/2014_10_06_trello-5A2czklq.png) </div>
1. Fastq groomer had a one-off difference with sequence count. [d1IIKmGK](https://trello.com/c/d1IIKmGK)
1. Now job_files.py allows writing the VERSION_STRING back for a job. [lWAPW3hd](https://trello.com/c/lWAPW3hd)
1. Corrected issue where the loading label in a history would duplicate if clicked multiple times (see pic). [5A2czklq](https://trello.com/c/5A2czklq) 
1. The job lock function, located in the UI "Admin panel: Manage jobs" group, has been reintroduced. [BTDaHy9m](https://trello.com/c/BTDaHy9m)
1. Bug fix for the testing framework associated with <repeat> tags. [XjtA0ty5](https://trello.com/c/XjtA0ty5)
1. General Grid bug in Admin’s ‘Browse Installed Repositories’ page is now resolved. [JwBOTgVl](https://trello.com/c/JwBOTgVl)
1. Fix "histories, set_as_current" failing when used without an existing session. [KzqulfCU](https://trello.com/c/KzqulfCU)
1. Bug fix for when [CasperJS](http://casperjs.org/) tests hang under certain conditions. [IzAEX87N](https://trello.com/c/IzAEX87N)
1. Fix for displaying wiggle ( `.wig` ) datasets in Trackster. [hkFhaRnt](https://trello.com/c/hkFhaRnt)
1. Fix for usage case where Workflows would occasionally be multi-submitted to the job queue. [2l1cCAeS](https://trello.com/c/2l1cCAeS)
1. Galaxy no longer produces invalid tool detail JSON (and potentially elsewhere) due to "infinity" tool input values. [TjbNbadP](https://trello.com/c/TjbNbadP)
1. Issues with cluster jobs running as real user with LSF/drmaa are now resolved. Big thanks to Chong Chen and IBM. See ticket for full details: [5moWcFEd](https://trello.com/c/5moWcFEd) 
1. Failure to import ‘exported histories’ is now resolved (parameter ‘sanitation’ was the issue). [OPeYs049](https://trello.com/c/OPeYs049)
1. Scratchbook was not displaying all file formats due to other recent changes, but now it does again. [Ojx8UXc8](https://trello.com/c/Ojx8UXc8)
1. Now use ‘log.debug’ instead of ‘warn’ for purposely disabled visualization plugins. [1TYOBGQ8](https://trello.com/c/1TYOBGQ8)
1. Admin "manage data libraries" tool corrected to include all completion messages/buttons. [eG8lkNbl](https://trello.com/c/eG8lkNbl)
1. PBKDF2 authentication no longer impacts FTP logins, using [ProFTPD](http://www.proftpd.org/) 1.3.5 (3rd party bug fix). [8oho1Ojy](https://trello.com/c/8oho1Ojy)
1. The "Manage library permissions" page now displays and functions correctly in all of the latest browsers. [9pwSPQdR](https://trello.com/c/9pwSPQdR)
1. Fixed bug with [Pulsar](https://www.openhub.net/p/pulsar) regarding retry/resume of interrupted [cURL](http://en.wikipedia.org/wiki/CURL) transfers. [ul77OiPm](https://trello.com/c/ul77OiPm)
 

# Gossip
1. In other news, please see our prior two *Updates*:<br />
  • [September 2014 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2014_09)<br />
  • [October 2014 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2014_10)

# Security
<!> On July 31st, we fixed a serious security vulnerability in Galaxy and notified the community. Please ***upgrade immediately*** if you haven’t done so already: [Instructions](http://tinyurl.com/nhgmbc5). Stay connected! We both [email](https://wiki.galaxyproject.org/MailingLists) and [tweet](https://twitter.com/galaxyproject) security alerts.

# Upgrades
1. Review instructions for core build: [Getting the Stable Distribution](http://getgalaxy.org)
1. Review reset for Toolshed repos: [Resetting Metadata For Installed Repositories](http://wiki.galaxyproject.org/ResettingMetadataForInstalledRepositories)

# About Galaxy
<div class='left'><a href='http://usegalaxy.org'><img src='/Images/Logos/GalaxyLogoHighRes.png' alt='UseGalaxy.org' width="200" /></a></div>
**[About Galaxy](/Support/AboutGalaxy)** • [Galaxy Project](/GalaxyProject) • [/Admin](/Admin) • [/Issues](/Issues) • [Big Picture](/BigPicture) • [/Community](/Community) • [Get Galaxy](/Admin/GetGalaxy) • [/CloudMan](/CloudMan) • [Tool Shed](/ToolShed) • [/Develop](/Develop) • [News Briefs](/DevNewsBriefs) • [Servers](/PublicGalaxyServers) • [/Learn](/Learn) • [/Support](/Support) • [Galaxy Biostar](http://biostar.usegalaxy.org) • [/News](/News) • [Twitter](/GalaxyOnTwitter) • [/Events](/Events) • [/Teach](/Teach) • [/Issues](/Issues) • [Cite](/CitingGalaxy) • [Galaxy Team](/src/GalaxyTeam/index.md)
