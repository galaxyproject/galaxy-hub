<div class='newsItemHeader'>[First Online IUC Codefest](/News/IUCCollectionsCodefest)</div>

<div class='right'><a href='https://github.com/galaxyproject/tools-iuc/issues/239'><img src='/Images/Icons/DatasetCollectionIconInForm.png' alt='' width="150" /></a>
</div>

The [Intergalactic Utilities Commission](https://wiki.galaxyproject.org/IUC) organised it's
[first online Codefest](https://github.com/galaxyproject/tools-iuc/issues/239) with the aim to make more tools collection aware.

The IUC was available for two days in a Hangout to answers questions and to work together with the
Galaxy community to enhance our tools and the overall Galaxy ecosystem.
Scientists from three different continents participated in this and made it a very nice experience and a success story,
which the IUC would like to repeat more often.

A list of all awesome contributions from all participants is given below.

Tools:
* Swap all repeats to multiple='True' where appropriate by [Eric Rasche](/EricRasche) (@erasche)
  * https://github.com/galaxyproject/tools-iuc/pull/276
  * https://github.com/bgruening/galaxytools/issues/246
  * https://github.com/galaxyproject/tools-devteam/issues/226
* [bedtools annotate is now collection aware](https://github.com/galaxyproject/tools-iuc/pull/282)
* [Collection support was added to deepTools](https://github.com/fidelram/deepTools/commit/3bc1d1c6f4e28ac7ff8df79fe4e3f00a195938e6) 
* [Add support for FASTQ R1/R2 pairs using dataset collections](https://github.com/fls-bioinformatics-core/galaxy-tools/commit/5de7f4ba384afb0a67b89c01f6884288b48ab8cf) from [Peter Briggs](http://www.ls.manchester.ac.uk/people/profile/?alias=briggsp) 
* [Make bamtools_split output a dataset collection](https://github.com/galaxyproject/tools-devteam/pull/227) by [Peter Van Heusden](https://twitter.com/pvanheus) ([@pvanheus](https://github.com/pvanheus)) and colleagues
* [Trim Galore update to use and produce collections](https://github.com/bgruening/galaxytools/pull/245) 
* [Most of the unix text processing tools should be collection ready](https://github.com/bgruening/galaxytools/tree/master/tools/text_processing/text_processing)
* [Michael Crusoe](https://impactstory.org/MichaelRCrusoe) ([@mr-c](https://github.com/mr-c)) worked on the [khmer wrappers to accept and produce collections](https://github.com/galaxyproject/tools-iuc/pull/80) 
* To replace most of the repeat parameters we actually needed [support for min/max attributes in the multiple data input parameter](https://github.com/galaxyproject/galaxy/issues/765.), which was implemented in Galaxy by [John Chilton](/JohnChilton) ([@jmchilton](https://github.com/jmchilton)) 
* Michael Crusoe (@mr-c) [described more of Galaxy's new collection features in the tool XSD project](https://github.com/JeanFred/Galaxy-XSD/pull/4) which was [integrated in planemo](https://github.com/galaxyproject/planemo/pull/309)
* [John Chilton](/JohnChilton) (@jmchilton) made significant progress toward [allowing a multiple data parameter to reduce many collections simultaneously](https://github.com/galaxyproject/galaxy/pull/805). This will greatly simplify wrappers such as cuffmerge which includes a confusing repeat for supplying additional dataset lists beyond the first.

[Peter Van Heusden](https://twitter.com/pvanheus) (@pvanheus) wrote a nice summary about his experience during the IUC Codefest and data collections in his blog titled ["Adventures in Galaxy output collections"](http://pvh.wp.sanbi.ac.za/2015/09/18/adventures-in-galaxy-output-collections/).

We hope you all will enjoy the outcome of this Codefest and hope to see you at our next Codefest, stay tuned.

[Your IUC](/IUC)

<div class='newsItemFooter'>Posted to the [Galaxy News](/News) on PLACEHOLDER_DATE(2015-09-29T21:20:49Z)</div>

CategoryNews
