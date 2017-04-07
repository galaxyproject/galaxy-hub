---
title: "Feb 8, 2013 Galaxy Distribution & News Brief"
date: "2013-02-09"
---
**Complete [News Brief](/src/archive/dev-news-briefs/2013-02-08/index.md)**
<div class='right'><a href='http://wiki.galaxyproject.org/Tool%20Shed'><img src="/src/images/news-graphics/2013_02_6-confirm-dependency-installation-sm2.png" alt="width="200px"" /></a></div>
**Highlights:**

* *Improvements* to our [release process](http://wiki.galaxyproject.org/DevNewsBriefs/2013-02-08#Improvements_to_Release_Process). **Release tag must be used in the hg update command to upgrade**. More at **[usegalaxy.org](http://wiki.galaxyproject.org/Admin/GetGalaxy)**.
* Tool Shed *[Complex repository dependencies](http://wiki.galaxyproject.org/DefiningRepositoryDependencies#Complex_repository_dependencies:_tool_dependency_definitions_that_contain_repository_dependency_definitions)* are introduced, streamlining core dependency use across individual tools. 
* Also updated in the Tool Shed: multiple repository installation, dependency installation (when defined - see graphic on right for an example), and many usability enhancements and fixes.
* New *[Bedgraph-to-bigwig](http://wiki.galaxyproject.org/Learn/Datatypes#BedGraph)* tool plus *Filter* tool updated.
* *Workflows* now include option to export an image and the core *Framework* now allows more unified reference genome usage and access.
* *Ten Community Pull-Requests* incorporated, plus another contribution to the tool Shed, addressing general usability, API, tools, error handling, workflows, and more. Thanks!!
* Review highlights from the latest monthly *[Galaxy Update](/src/galaxy-updates/index.md)* newsletter and [Galaxy Project Stats!](/src/galaxy-project/statistics/index.md)
* Plus bug fixes and related enhancements for visualizations, histories, workflows, and tools.

**[http://getgalaxy.org](http://getgalaxy.org)**

**[http://bitbucket.org/galaxy/galaxy-dist](http://bitbucket.org/galaxy/galaxy-dist)**

**[http://galaxy-dist.readthedocs.org](http://galaxy-dist.readthedocs.org)**

```
new:     $ hg clone https://bitbucket.org/galaxy/galaxy-dist#stable galaxy-dist

upgrade: $ hg pull 
         $ hg update release_2013.02.08
```


*To receive email updates about [Galaxy Distributions and News Briefs](/src/docs/index.md), be sure to subscribe to the [Galaxy-Announce mailing list](/src/mailing-lists/index.md#the_lists), a low-volume list dedicated to [News Items](/src/news/index.md) and priority messages from the Galaxy [community](/src/community/index.md) and [project core team](/src/galaxy-project/index.md).* 

Thanks for using Galaxy,

[The Galaxy Team](/src/galaxy-team/index.md)
