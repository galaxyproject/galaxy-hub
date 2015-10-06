This page summarizes the breakout session "Building a Data Infrastructure: Genomic Data Management" which was held at the end of the the 2011 Galaxy Community Conference. See the [conference page](http://galaxy.psu.edu/gcc2011/) for more details.

## Participants

* Kelly Vincent
* Jennifer Jackson
* Jim Johnson
* Madelaine Gogol
* Peter Briggs
* Arvind Kumar Thirumalaiswamy Sekhar
* ... who else? ...

## Topics for Discussion

* What information can be gathered about the genome data?
* What are the exact things that the user might need to know about the data?
* What are the best ways to display the information to the Galaxy user?
* Which parts of this should become part of galaxy, or should it be a separate distribution, or not be integrated at all?
* How should specific "variations" of builds be handled (male/female, canonical/full, sorted in a special way (like for GATK), etc.)?

## Main Issues

First, everyone needs data, so including some data management capabilities directly within Galaxy makes sense. Maybe it would make sense to make parts of it optional via configuration.

### Indexing of genomes
* per tool, etc.
* Indexing on-the-fly
  * allowing **reuse**
    * by same user (already exists in some places)
    * by other users

### Automation
* Easily add builds when creating/updating a Galaxy instance
  * data repository
  * fetch on demand

### Genome Build Metadata
* **Transparency** is important to enable **reproducibility**
* Info that users need to see
  * Differences between builds (hg19 to hg18, for example)
  * The source for the build data
  * When the data was obtained
  * How exactly it was (pre)processed before being released on Galaxy
  * The chromosome naming standard ("chr1" vs. "1" etc.)
  * Length file ??
* How to display the info to users?
  * Tab across top menu bar
    * Suggestions for tab display name: "Genome Info", "Reference Data", "Reference Genome"
    * Page would contain detailed info on all built-in data
  * Link from history item to that particular build info 
    * Does all info about build need to be displayed, or just some of it?

### Best practices

* Should be established for some things that shouldn't really be included in the Galaxy distribution
  * Genome data directory structure
  * Build file naming conventions
  * dbkey naming conventions

## Other Stuff

### Ways of Adding Builds to an Instance

What about having a workflow that will allow users to add their own build to the Galaxy instance? Not appropriate to the Galaxy public server, but possibly for local instances. Jim has been using a workflow to add builds on his instance (just him, not his users). Access control would presumably be handled by controlling who had access to the workflow.

Another option might be an option under the Admin tab called "Add Build" or something similar.

### Chromosome Naming Convention

There is not consistency in chromosome naming across disparate sources, should there be a standard for Galaxy?

What about a toll that converts between the major ones?
