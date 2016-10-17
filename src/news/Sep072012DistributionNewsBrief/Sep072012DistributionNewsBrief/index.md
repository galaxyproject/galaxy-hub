---
date: 2012-09-07T20:54:28Z
---
<div class='newsItemHeader'>[Sept 7, 2012 Distribution & News Brief](/News/Sep072012 Distribution News Brief)</div>


**Complete [News Brief](/src/DevNewsBriefs/2012_09_07/index.md)**
<div class='right'><a href='/DevNewsBriefs/2012_09_07'><img src='/Images/NewsGraphics/2012_09_07_tool-shed-menu.png' alt='tool-shed-menu' width="250px" /></a></div>
**Highlights:**
* **[NCBI BLAST+](http://blast.ncbi.nlm.nih.gov/)** has moved from the *Galaxy distribution to the [Galaxy's Main Tool Shed](http://toolshed.g2.bx.psu.edu/)*.
* **Tool Shed** is now running **[Mercurial version 2.2.3](http://mercurial.selenic.com/)**. Many updates and refinements including UI/metadata changes - read the full report!
* Streamline local setup with the **[Reference Genome rsync Server](/Admin/Data Integration)**: same builds and indexes as on the public **Galaxy [/Main](/src/Main/index.md)** instance.
* More updates to **[Output and Error Handling](/Admin/Tools/Tool Config Syntax#a3cstdio3e2c_3cregex3e2c_and_3cexit_code3e_tag_sets)** including updated documentation and enhancements to exit code checks.
* **[TopHat2](http://tophat.cbcb.umd.edu/manual.html) / [Bowtie2](http://bowtie-bio.sourceforge.net/bowtie2/manual.shtml)** latest support includes *Tophat2* fusions output, *Bowtie2* sorted [BAMs](/Learn/Datatypes#bam), and a new [RNA-seq Tutorial](http://main.g2.bx.psu.edu/u/jeremy/p/galaxy-rna-seq-analysis-exercise).
* **Trackster** updates include improved support for **[bigWig](http://genome.ucsc.edu/goldenPath/help/bigWig.html)** / **[bigBed](http://genome.ucsc.edu/goldenPath/help/bigBed.html)**, new support for **[bedGraph](http://genome.ucsc.edu/goldenPath/help/bedgraph.html)**, and a new search feature for **[GFF](/Learn/Datatypes#gff)** / **[GTF](/Learn/Datatypes#gtf)** / **[BED](/Learn/Datatypes#bed)** datasets.
* Plus many other **Workflow**, **API**, **Source**, **UI** features and a summary of recent ***[Galaxy Update](http://wiki.g2.bx.psu.edu/GalaxyUpdates)*** highlights.

**[http://getgalaxy.org](http://getgalaxy.org)**

**[http://bitbucket.org/galaxy/galaxy-dist](http://bitbucket.org/galaxy/galaxy-dist)**
```
new:     $ hg clone http://www.bx.psu.edu/hg/galaxy galaxy-dist
upgrade: $ hg pull -u -r e6444e7a1685
```


**Thanks for using Galaxy!**

[Jennifer Jackson](/src/JenniferJackson/index.md)

[/Galaxy Team](/Galaxy Team)


CategoryNews
