---
title: "March 12, 2012 Distribution & News Brief"
date: "2012-03-12"
---
**Complete [News Brief](/archive/dev-news-briefs/2012-03-12/)**

**Highlights:**
<div class='right'><a href='/learn/visualization/'><img src="/src/images/news-graphics/2012_03_12_trackster-encode.png" alt="trackster-encode" width="180px" /></a></div>
* **__Emboss tools and datatypes__** __moving from the *Galaxy distribution to the [Galaxy's Main Tool Shed](http://toolshed.g2.bx.psu.edu/)__* __in the **NEXT release__**. Read more about the upcoming **[tool migrations...](/toolshed/migrating-tools-from-galaxy-distribution/)**
* Galaxy tool [XML configuration](/galaxy-tool-panel//#xml-configuration-files-used-to-populate-your-galaxy-tool-panel), managing [tool panel layout](//galaxy-tool-panel//#managing-the-layout-of-your-galaxy-tool-panel), and Galaxy [tool versions](/galaxy-tool-version-lineage/).
* **RNA-Seq Tools:** Added **[CuffMerge](http://cufflinks.cbcb.umd.edu/)** version 1.0.0, Updated **[TopHat](http://tophat.cbcb.umd.edu/)** default parameters
* **External Display Apps:** Added **[RViewer](http://rviewer.lbl.gov/rviewer/)**, Updated **[IGV](http://www.broadinstitute.org/igv/)**
* Now visualize **[ENCODE](http://genome.ucsc.edu/ENCODE/) "peak" datatype tracks** in the Galaxy Track Browser (aka Trackster)
* Multiple **Workflow** updates including enhancements to input dataset options, display modes, and sharing.
* **[CloudMan](http://wiki.g2.bx.psu.edu/Admin/Cloud)** now offers **[preliminary support for OpenNebula cloud type](http://bitbucket.org/galaxy/cloudman/src/tip/cm/clouds/opennebula.py)** and a **larger default tools volume** (10GB vs old 2GB).

**[http://getgalaxy.org](http://getgalaxy.org)**
```
new:     % hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist
upgrade: % hg pull -u -r 40f1816d6857
```



**Thanks for using Galaxy!**

[Jennifer Jackson](/people/jennifer-jackson/)

[Galaxy Team](/galaxy-team/)
