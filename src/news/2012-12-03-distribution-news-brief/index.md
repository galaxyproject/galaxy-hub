---
title: "Dec 3, 2012 Distribution & News Brief"
date: "2012-12-03"
---
**Complete [News Brief](/src/archive/dev-news-briefs/2012-12-03/index.md)**
<div class='right'><a href='http://usegalaxy.org'><img src="/src/images/news-graphics/2012_12_03_new-history-menu.png" alt="width="350"" /></a></div>
**Highlights:**
* **NGS: Mapping** tools **[Bowtie](http://bowtie-bio.sourceforge.net/index.shtml)** and **[Lastz](http://www.bx.psu.edu/~rsharris/lastz/)** have moved from the **[Galaxy distribution](https://bitbucket.org/galaxy/galaxy-dist)** to the **[Galaxy Main Tool Shed](http://toolshed.g2.bx.psu.edu/)**.
* Improvements in the display of **[http://wiki.galaxyproject.org/ToolShed](http://wiki.galaxyproject.org/ToolShed)** repository dependencies and contents.
* More **[Tool Shed](http://toolshed.g2.bx.psu.edu/)** updates including details of the [Functional test framework](http://wiki.galaxyproject.org/HostingALocalToolShed#Functional_test_framework_for_the_tool_shed), a new hgweb.config file and `HgWebConfigManager` tool, plus other management features.
* Updated **UI** display and functionality for datasets and histories: new **paused** state and "resume/paused" toggle, new **History menu options** (seen at right &rarr;), and improved **Scatterplot** visualizations.
* The **SGE** job runner has now been fully deprecated and replaced with **DRMAA**.
* Several enhancements to aid with **reproducibility**: "Re-run" and "Extract workflow" validates datasets and tools, respectively, and a new data tables registry within the Administration menu, along with associated tools, corrects or warns about tool migration issues.
* Highlights from the new Galaxy **[CloudMan](http://usegalaxy.org/cloud)** release and ***[December 2012 Galaxy Update](http://wiki.galaxyproject.org/GalaxyUpdates/2012-12)***.

**[http://getgalaxy.org](http://getgalaxy.org)**

**[http://bitbucket.org/galaxy/galaxy-dist](http://bitbucket.org/galaxy/galaxy-dist)**

**[http://galaxy-dist.readthedocs.org](http://galaxy-dist.readthedocs.org)**

```
new:     $ hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist
upgrade: $ hg pull -u -r f364d992270c
```


**Thanks for using Galaxy!**

[The Galaxy Team](/src/galaxy-team/index.md)
