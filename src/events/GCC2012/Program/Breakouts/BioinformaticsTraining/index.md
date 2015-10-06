INCLUDE(../../../PageHeader)

<div class="title">Bioinformatics Training and Teaching with Galaxy</div>

**A [GCC22012](/Events/GCC2012) [Breakout Session](/Events/GCC2012/Program/Breakouts)**

INCLUDE(../../../LinkBox)
<div class='right'>TABLE_OF_CONTENTS</div>

# Participants

* Hans-Rudolf Hotz
* Alban Lermine
* Nikhil Joshi
* Björn Grüning
* Geir Kjetil Sandve
* Xiao Dong
* Morris Chukhman
* Warren Kaplan
* Madhavan Ganesh
* Graeme Grimes
* Ketaki Bhide
* Patra Volarath
* Erik Garrison 
* Dave Clements
* Rama Sompallae
* ...

# Notes

These notes are a rough first grouping of [Dave Clements'](/DaveClements) notes from the breakout.  Please feel free to update them.


## Platforms

* There is not a "teaching" instance of Galaxy anywhere.  Options for training include using your own instance, using main, or using a cloud instance.
* Weeklong course at UC Davis with everyone doing their own bioinformatics on the cloud.  This is very inexpensive.
* having 40 people on same instance can be a problem

## What Participants Have Been Doing

* Weeklong course on bioinformatics.
* Two back to back courses.  Only used UCSC encode and Galaxy.  RNA-Seq analysis.
* Perl for bioinformatics.
* Use Galaxy for training, bioinformatics school
* Don't use Galaxy internally at the bioinformatics core, but do use it for training.
  * Started teaching with command line and that was a disaster.
* Use Galaxy to teach students, some of whom have not used a computer before.  Galaxy might be too complicated for that group.

## Goals for Training

* Want to be able to teach biologists enough so that they can do the analysis, but also to have them learn how to do in depth analysis.
* To learn programming
  * Galaxy as a visual programming language.
  * Don't have to teach R or Perl, but the ideas: transform the ides
* Make bioinformatics training a part of medical education.
* Teach people to do their own analysis.

## Challenges

* Not enough time for training.  Just do intro to bioinformatics using Galaxy
* Problem with teaching is that participants forget it after a month, if they don't use it frequently after the training.
* Teaching R is an order of magnitude harder to teach than perl
* Do you teach the details or high level?
  * Researchers who have specific needs.  
  * You have students who you want to teach basic understanding too 
  * We also need to train the biologists and chemists to use the tools, but too understand the outputs.
  * Some past bioinformatics training focused on statistics to the point of alienating biologists
* Trainers can't know every detail of every tool
* How do you communicate the complexity of analysis and tools?
  * Can ask researchers "what do you want to assume?"  That's a lot work.
  * Asking "which statistical test do you want to use" is not a question that many researchers can answer meaningfully.
* Biologists are really good at following protocols, as long as they are at the bench.  Following recipes on computers is not the same thing.
* Researchers that just want the data analyzed without understanding analysis.  Some would prefer to have an analysis blackbox, with a red button that says "analyze."  
* The interface for files in Galaxy is confusing for users.
* How do you have a meaningful example that runs fast.
* Number of tools is daunting
* Bioinformatics courses are not as good as many other courses
  * Textbooks are not as good
  * Field is developing so fast; no chance to standardize
  * End up with *Bioinformatics for dummies* courses

## Solutions

* Jeremy's parameter walking can make it clear that they can get different results.  
  * Flip side is this can be used to get the results they want.
  * Demonstrate how sensitive things are.
* Improve interface for history / files in Galaxy
  * tie together files that are produced as a chunk.
  * Change it to be more hierarchical.  Have folders.  Too many files, e.g. cufflinks get 11 files.
  * Get Multiple views.
  * Does Galaxy have access to Human Computer Interaction folks?
* Struggling with tools can get the point across that this is inherently difficult
* Galaxy is about the making the simple things easy to do, so you can get to the science.
* Include a "Hey this is important!" notice on complex tools.
* What students really like:  Show them and RNA-Seq un-replicated, and then we contrive a grand challenge and do some analysis to gain insight into that.  Split people up into groups and have them tackle it.  They like that a lot.
* hands-on workshops may be overrated.  Maybe speak for an hour, and then have participants go off for a few days.
* Take a high-profile paper and reproduce the results from a paper.  That's going to be motivating.
* Set up a catalog of teaching material
  * Want to be able to share material
  * slide sharing would be helpful
* Teach good Galaxy practices
  * Always rename your output files
 
# Plan of Action

We did not discuss a plan of action at the breakout, but we will here.  

More to come ...
