---
title: "Sept 7, 2012 Distribution & News Brief"
date: "2012-09-07"
subsites: [global, us]
---
**Complete [News Brief](/archive/dev-news-briefs/2012-09-07/)**
<div class='right'><a href='/archive/dev-news-briefs/2012-09-07/'><img src="/images/news-graphics/2012_09_07_toolshed-menu.png" alt="toolshed-menu" width="250px" /></a></div>
**Highlights:**
* **[NCBI BLAST+](http://blast.ncbi.nlm.nih.gov/)** has moved from the *Galaxy distribution to the [Galaxy's Main Tool Shed](http://toolshed.g2.bx.psu.edu/)*.
* **Tool Shed** is now running **[Mercurial version 2.2.3](http://mercurial.selenic.com/)**. Many updates and refinements including UI/metadata changes - read the full report!
* Streamline local setup with the **[Reference Genome rsync Server](/admin/data-integration/)**: same builds and indexes as on the public **Galaxy [Main](/main/)** instance.
* More updates to **[Output and Error Handling](/admin/tools/Tool Config Syntax/#a3cstdio3e2c_3cregex3e2c_and_3cexit_code3e_tag_sets)** including updated documentation and enhancements to exit code checks.
* **[TopHat2](http://tophat.cbcb.umd.edu/manual.html) / [Bowtie2](http://bowtie-bio.sourceforge.net/bowtie2/manual.shtml)** latest support includes *Tophat2* fusions output, *Bowtie2* sorted [BAMs](/learn/datatypes/#bam), and a new [RNA-seq Tutorial](http://main.g2.bx.psu.edu/u/jeremy/p/galaxy-rna-seq-analysis-exercise).
* **Trackster** updates include improved support for **[bigWig](http://genome.ucsc.edu/goldenPath/help/bigWig.html)** / **[bigBed](http://genome.ucsc.edu/goldenPath/help/bigBed.html)**, new support for **[bedGraph](http://genome.ucsc.edu/goldenPath/help/bedgraph.html)**, and a new search feature for **[GFF](/learn/datatypes/#gff)** / **[GTF](/learn/datatypes/#gtf)** / **[BED](/learn/datatypes/#bed)** datasets.
* Plus many other **Workflow**, **API**, **Source**, **UI** features and a summary of recent ***[Galaxy Update](http://wiki.g2.bx.psu.edu/GalaxyUpdates)*** highlights.

**[http://getgalaxy.org](http://getgalaxy.org)**

**[http://bitbucket.org/galaxy/galaxy-dist](http://bitbucket.org/galaxy/galaxy-dist)**

```
new:     $ hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist
upgrade: $ hg pull -u -r e6444e7a1685
```


**Thanks for using Galaxy!**

[Jennifer Jackson](/people/jennifer-jackson/)

[Galaxy Team](/galaxy-team/)
