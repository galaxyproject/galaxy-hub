---
title: "Moving workflows from single files to collections - a case study"
date: "2023-06-20"
tease: "Allowing a complex workflow to be used on multiple datasets using collections."
hide_tease: false
authors: 'Paul Zierep, Engy Nasr'
authors_structured:
- github: paulzierep
- github: EngyNasr
tags: [EU]
subsites: [all-eu]
main_subsite: eu
---


Collections are a great way to bundle multiple dataset into single entities (as shown in the history) that can be 
processed collectively. In fact, when the amount of datasets rises up to 1000+ it becomes essential to use collections.
Galaxy can also use collections in tools that are not specifically designed to process 
collections using the mapping-over strategy (run the tool for each of the elements in a collection). 
Therefore, it should be a peace of cake to port complete workflows that 
were based on processing single files to use collections as well.

However, when applying this idea on our latest metagenomics workflow  [Foodborne Pathogen detection](https://training.galaxyproject.org/training-material/topics/metagenomics/tutorials/pathogen-detection-from-nanopore-foodborne-data/tutorial.html) we encountered some problems 
that arise when switching from single files to collections. 
In the following we would like to present some of those issues and how we solved them, in the hopes that these strategies can help
others to port their workflows to collections as well.

# Case 1 - Simple inputs for workflow logic

It is often useful to add simple inputs to a workflow such as integers or text to specify specific parameters of tools. Galaxy can also use the output of a tool as input
parameter for another tool. Details are described in the tutorial [Using Workflow Parameters](https://training.galaxyproject.org/training-material/topics/galaxy-interface/tutorials/workflow-parameters/tutorial.html). In the case of the *Single File Foodborne Pathogen Detection Workflow* a text input `Sample ID` is used downstream by multiple tools as input.

The figure below shows 1 out of 5 sub-workflows, which form together the complete pathogen detection workflow. This sub-workflow is the *Gene based pathogenic identification workflow*, which takes as an input the pre-processed sample reads and the `Sample ID` both marked in green, and detects possible pathogens by identifying virulence factors (VFs) for all contigs of the input sample. 

![Gene Based Pathogenic Identification For Single Sample Workflow](./figs/genebasedWF_single_marked.png)

</div>  
<figcaption>
  Gene based pathogenic identification workflow for single files: Green boxes identifies the single sample input sequences file and the text Sample ID. These inputs needed to be changed to allow  processing of collections. 
</figcaption>
</div>


This workflow could not be transformed straight forward into a collection logic, since the input in this case would need to be a list with matching `Sample IDs`.
The problem was solved by using the name of the collection elements as `Sample IDs` and transforming them into workflow parameters using the following set of tools marked in Green, which are [Extract element identifiers](https://usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fcollection_element_identifiers%2Fcollection_element_identifiers%2F0.0.2&version=0.0.2), [Split file](https://usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsplit_file_to_collection%2Fsplit_file_to_collection%2F0.5.0&version=0.5.0) and `Parse parameter value` (only available in the workflow editor). A [PR](https://github.com/galaxyproject/iwc/pull/182) to add the workflow to IWC is currently pending in progress.

![Gene Based Pathogenic Identification For Collection of Samples Workflow](./figs/genebasedWF_collection_marked.png)

</div>  
<figcaption>
  Gene based pathogenic identification workflow for collections: Green boxes identifies the collection of sample sequences files as the main input and the tools used to replace the input text `Sample ID`. Using this approach the user doesn't have to worry about manually entering the `Sample IDs` rather the tools will extract them from the collection element names.
</figcaption>
</div>

In case the `Sample IDs` do not match the element identifies a list with matching IDs could 
be provided by the user that is then processed similarly to the described approach.

# Case 2 - Failing or empty elements in a collection

Even if a workflow is well designed, in some cases in can happen that only few elements of a collection fail. This happened to us rather randomly in case of Kraken2, since
it requires large amounts of memory (>70 GB), which were not assigned to every run of the tool by the server. That issue was solved by increasing the minimum memory required by the tool on the EU server. But there are various other scenarios where the failure of the tool can be attributed for example to specific input data. In other cases only a few elements of a collection are empty (e.g. if an assembly can not be made due to not overlapping reads).

If an element of a collection is failed or empty the entire downstream processing is stopped, which can be rather annoying if one want to process a large amount of data and got stuck due to a few elements. Two solutions are proposed to handle such cases.

## Intermediate workflow specific solution

### Filter the collection

Collections can be filtered for failed or empty datasets using collection tools such as [filter empty datasets](https://usegalaxy.eu/?tool_id=__FILTER_EMPTY_DATASETS__&version=1.0.0) and [filter failed datasets](https://usegalaxy.eu/?tool_id=__FILTER_FAILED_DATASETS__&version=1.0.0). 

<div class="center">
<div class="img-sizer" style="width: 100%">

![Empty collection](./figs/empty_collection.png)

</div>  
<figcaption>
  Filter failed collection elements
</figcaption>
</div>

<div class="center">
<div class="img-sizer" style="width: 100%">

![Empty collection](./figs/failed_collection.png)

</div>  
<figcaption>
  Filter empty collection elements
</figcaption>
</div>


Although this can solve the issue in some cases immediately, further considerations need to be made. 
First, often one cannot really know at which step the collection will be affected.
To cover all cases one would need to add the filter steps for every produced collection, which will increase the workflow steps unreasonably. 
Secondly, the filtering will change the size of the collection. If downstream tools depend on a specific collection size, which is always the case if a tool
takes two or more collections as input, the tool will also fail. That's basically a follow up problem of the first problem.
This case can still be solved by a intermediate step where the second collection is basically reindexed by the same element identifiers then the collection with
missing elements. 

<div class="center">
<div class="img-sizer" style="width: 100%">

![Empty collection](./figs/reindex_collection.png)

</div>  
<figcaption>
  Proposed solution to reindexed second collection using elements of the first collection.
</figcaption>
</div>  

However, if this logic needs to be applied to multiple collections or again for multiple steps, the workflow becomes even more unreasonably large and complex. 

Furthermore it needs to be considered, that filtering empty or failed elements from a collection
can hide the root cause of the problem. The question why some tool runs fail or produce empty output should always be further investigated.

### Rerun the workflow with rerun activated 

In some cases a rerun of the workflow can also solve the issue, for example in our use case where the failure was rather randomly.
For this strategy it is beneficial to activate the rerun option of galaxy (User/Preferences/Manage Information) on instance with version > 23.0. 
This allows to only rerun failed elements, which saves computing resources and time.

<div class="center">
<div class="img-sizer" style="width: 100%">

![Empty collection](./figs/rerun.png)

</div>  
<figcaption>
  Rerun option of galaxy using cached files.
</figcaption>
</div>  


## Global tool dependent solution

Since this issue cannot be solved satisfactory on the workflow level, one can still aim to improve the problem for the community by solving it on the tool level.
In general the aim should be that the tool neither fails nor produces empty output. This is much more work, but will ultimately have a benefit for all users.
Two things need to be considered here.

* Why does the tool fail, can it be solved? In our case we had to increase the memory of kraken2 for the server. In other cases it could be necessary to inspect the tool wrapper and find individual solutions.
* Why does the tool produce empty elements? If the tool produces empty elements when in fact it has an output but the output is an empty file (e.g. if a detection tools detects nothing), it might be as simple as adding an empty table or fasta file for this tool, to allow follow up tools to work. E.g. an assembly tool than cannot create any contig should return an empty fasta file instead of failing.

# Case 3 - Collection workflow logic does not fully comply with single file logic 

## Implicit Conversions

Some of the tools, used in the *Foodborne pathogen detection workflow using collections*, failed when we run the workflow but succeed when the tool did run alone without a workflow, for example `Krakentools: Extract Kraken Reads By ID` and `Filter Sequence by ID`.

After a bit of investigation we noticed that when these tools run alone (without being in a workflow) or in a workflow with single files galaxy performs an implicit decompressing of the zipped input files, which then channels the correct file to the underlying wrapper tool. However when the same tools run in a collection in a workflow this implicit decompressing does not take place, which cause the output to fail. 

![Example of the implicit datatype conversion performed by the tools](./figs/implicit_datatype_coversion.png)

</div>  
<figcaption>
  Example of the implicit datatype conversion performed by the tools while running stand alone without a workflow in a history.
</figcaption>
</div>  

The initial solution was to add the `Convert compressed file to uncompressed` tool before running these tools, as shown in green in the figure below.

![part of the preprocessing workflow](./figs/preprocessing_WFpart_collection_marked.png)

</div>  
<figcaption>
  Part of the Pre-processing pathogen detection workflow for collection, showing the initial solution for decompressing within a workflow.
</figcaption>
</div>  

However, this initial solution is not optimal, since the data size will increase in the user's history (due to file decompression) by running the workflow. Therefore, we have proposed another solution by updating the tools wrappers themselves to perform the decompression internally without the need to use the `Convert compressed file to uncompressed` tool (https://github.com/galaxyproject/tools-iuc/pull/5360). In fact the tool did not require a internal decompression step, since it can indeed work with zipped files, it only needed
to know that the input is zipped.

Although the problem could be solved again on the tool wrapper level, the general problematic of inconsistent conversion logic between single files and collections is most likely a bug which is currently investigated for following galaxy releases.

# Outlook

We hope that this post can help others to also move from single file workflows to collections and motivate to improve the overall experience for the community by creating 
PRs and raising issues for tools that need a little more help to fully comply with the wonders of collections as well. 

