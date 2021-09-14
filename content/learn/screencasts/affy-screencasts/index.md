In these examples we use a set of potential Sp1 binding sites that were identified using a human promoter array.


## Example 1

*Which of the enriched sites overlap with known DNA elements such as CpG islands?*

[See ScreenCast](http://screencast.g2.bx.psu.edu/Affy_Sp1_CpG/)
----
This analysis involves the following steps:

* Get data &rarr; upload interval bed file from computer
  * View in main panel
  * Display in UCSC browser
* Get data &rarr; UCSC table browser
* Get data for CpG islands for entire genome
* Operate on genomic intervals &rarr; intersect 
* Intersect CpG island with interval bed file
  * Edit title
  * View list in main panel
  * Save the list
* Create a custom track displaying all three datasets:
  * Sp1 versus CpG
  * CpG islands
  * Sp1 sites

## Example 2

*What RefSeq genes are within 5000bp of my transcription factor binding sites?*

[see ScreenCast](http://screencast.g2.bx.psu.edu/Affy_Sp1_RefSeq/)
----
This analysis involves the following steps:

* Get data &rarr; upload interval bed file from computer
* Operate on genomic intervals &rarr; Get flanks
* 5,000 bp downstream, no offset for result interval bed file
* Rename new file intervals 5000bp downstream
* Get data &rarr; UCSC table browser
* Get RefSeq gene data
* Operate on genomic intervals –> intersect
* Intersect RefSeq genes with interval 5000 bp downstream file
