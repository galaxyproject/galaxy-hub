---
date: 2013-02-09T01:15:37Z
---
<div class='newsItemHeader'>[Feb 8, 2013 Galaxy Distribution & News Brief](/src/News/2013_02_08_GalaxyNewsBrief/index.md)</div>

**Complete [News Brief](/src/DevNewsBriefs/2013_02_08/index.md)**
<div class='right'><a href='http://wiki.galaxyproject.org/Tool%20Shed'><img src='/Images/NewsGraphics/2013_02_6-confirm-dependency-installation-sm2.png' alt='width="200px"' /></a></div>
**Highlights:**

* *Improvements* to our [release process](http://wiki.galaxyproject.org/DevNewsBriefs/2013_02_08#Improvements_to_Release_Process). **Release tag must be used in the hg update command to upgrade**. More at **[usegalaxy.org](http://wiki.galaxyproject.org/Admin/Get Galaxy)**.
* Tool Shed *[Complex repository dependencies](http://wiki.galaxyproject.org/DefiningRepositoryDependencies#Complex_repository_dependencies:_tool_dependency_definitions_that_contain_repository_dependency_definitions)* are introduced, streamlining core dependency use across individual tools. 
* Also updated in the Tool Shed: multiple repository installation, dependency installation (when defined - see graphic on right for an example), and many usability enhancements and fixes.
* New *[Bedgraph-to-bigwig](http://wiki.galaxyproject.org/Learn/Datatypes#BedGraph)* tool plus *Filter* tool updated.
* *Workflows* now include option to export an image and the core *Framework* now allows more unified reference genome usage and access.
* *Ten Community Pull-Requests* incorporated, plus another contribution to the tool Shed, addressing general usability, API, tools, error handling, workflows, and more. Thanks!!
* Review highlights from the latest monthly *[Galaxy Update](/GalaxyUpdates)* newsletter and [Galaxy Project Stats!](/Galaxy Project/Statistics)
* Plus bug fixes and related enhancements for visualizations, histories, workflows, and tools.


**[http://getgalaxy.org](http://getgalaxy.org)**

**[http://bitbucket.org/galaxy/galaxy-dist](http://bitbucket.org/galaxy/galaxy-dist)**

**[http://galaxy-dist.readthedocs.org](http://galaxy-dist.readthedocs.org)**

```
new:     $ hg clone https://bitbucket.org/galaxy/galaxy-dist#stable galaxy-dist

upgrade: $ hg pull 
         $ hg update release_2013.02.08
```


*To receive email updates about [Galaxy Distributions and News Briefs](/DevNewsBriefs), be sure to subscribe to the [Galaxy-Announce mailing list](/MailingLists#the_lists), a low-volume list dedicated to [News Items](/News) and priority messages from the Galaxy [community](/Community) and [project core team](/Galaxy Project).* 

Thanks for using Galaxy,

[The Galaxy Team](/src/GalaxyTeam/index.md)



CategoryNews
