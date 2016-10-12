---
autotoc: true
pagetitle: Galaxy API and Extending it, ;,  Workflow Enhancements
---
PLACEHOLDER_INCLUDE(../../../PageHeader)



**A [GCC22012](/Events/GCC2012) [Breakout Session](/Events/GCC2012/Program/Breakouts)**

PLACEHOLDER_INCLUDE(../../../LinkBox) <div class='right'></div>

# Participants
* Clare Sloggett
* Scott !McManus
* Philip Mabon
* ...

# API extension wish-list
## Datasets, Histories, Libraries
Participants discussed the following:

* a way to rename datasets (in histories and libraries) using the API;
* a way to directly upload files using the API;
* a way to name datasets when uploading them;
* authenticated downloads (i.e., a way to download files that aren't public; the only mechanism currently seems to be to make the file public and use the URL);
* a way to populate metadata tags using the API - there was actually a lot more discussion of metadata (see below) but as a starting point it was noted that so far as we know there is no way to control the existing metadata system (tags) using the API.

## Workflows
* a way to build workflows step-by-step through the API (as opposed to using the tools' API to actually run a tool, which will "build" a history);
* the ability to set workflow parameters at runtime using the API;
* the ability to see what steps and connections are in a workflow using the API (currently the API shows you the inputs, but not all the steps);
* a way to programmatically delete (ie 'mark deleted') intermediate files when a workflow is run. It seems that currently you can configure your workflow to delete certain files when editing it using the UI, but you can't configure this via the API, and you can't decide this at runtime (either using the API or the UI);

## Other
* deployment automation, possibly through a ToolShed API;
* a way to query Galaxy about installed datatypes and their place in the hierarchy using the API. One rationale for this is that if you're scripting an analysis using the API, you need to be able to identify all relevant files in the source histories/libraries and it would be nice not to hard-code every relevant datatype;
* better reporting of user's resource use via the Admin API;

## Workflows Wish List
* more powerful metadata structure (hierarchy, nesting) and the a ability to control workflows based on these data;
* some (optional) way to have tools preserve/propagate tags/metadata into the next output;
* the ability to use a workflow as a 'subroutine' within another workflow;
* the ability to use a workflow as a 'template' to build another workflow (akin to forking a workflow);
* the ability to black-box a workflow for downstream users, as well as unbox for tweaking parameters;
* more use of composite data types and possible operations on them ('remove from', 'insert into', 'filter', 'iterate');
* the ability to restart a failed workflow from the point of failure;

## General/UI Issues
* better visualization of history, something more like structure view in the right hand panel;
* group output of a step (visually) possibly representing large sets of files as one visual element (which could be expanded);
* visualization of Admin data (resource use, etc.).

There was some discussion of being able to check the running status of a workflow via the API, but this is probably already satisfied by the ability to check the status of datasets in a history and see whether each step has run. There was also a request for some way to predict the runtime of an individual tool.

# Discussion
## Workflow Functionality
This discussion was not specific to the API, but was about general workflow functionality. In general this discussion centered around three issues: controlling workflows using experimental metadata and managing that metadata; the concept of having sets or bundles of files; and the concept of modular (reusable components) in workflows.

There was a lot of discussion of experimental metadata (such as 'sample name') as a way to control analysis. Currently a metadata tag system exists, but metadata is not passed between tools, and there was a request for 'structured metadata'. The ability to pass metadata tags between tools was seen as crucial; ie for a file's metadata values to be inherited by the output files when a tool is run. Note that this means a tool needs to know which metadata values to pass on/create/modify, and tools may conflict on various tag structures or ontologies. This behavior may also be workflow-specific, e.g. in one workflow I might merge BAM files by sample, and in another I might merge them by group. There was a comment that even if the general case is hard, just covering the 'easy' cases would be valuable and that there should be a default metadata-manipulation behavior defined for each tool.

There was a fair amount of discussion of the concept of 'subroutines', or modularizing workflows so that we can re-use workflows as components in larger workflows. One suggestion was that when editing workflows, any such modules/subroutines that you've already built should appear in a menu in the left-hand pane (akin to a tool). There was also a feeling that you should be able to 'expand' or 'un-black-box' the embedded workflow if necessary so as to be able to tweak it, though that this might mean you couldn't then un-expand it again as it's no longer the same object. There was some discussion of how such a subroutine should decide which parameters to expose to the user.

There was a comment that we should look at older visual pipelining systems, such as AVS and SGI's offering, that had to solve many of the same problems, including the ability to modularize or 'black-box' existing workflows as part of larger workflows and pass parameters up to control these embedded workflows.

There was some discussion of having 'sets' of files defined as inputs or outputs to tools. This was seen as a possible solution to the workflow flow control issue, as well as a more general data management mechanism. Jeremy pointed out that we already have composite data types, and the discussion became one of what we would need to add to composite data types for them to do what we want. FastQC output (which is an HTML report with a set of associated files that are not in your history) was used as an example. The key issue seems to be that the files referred to by a composite dataset do not themselves have any file-level metadata (including file type/format) and so can't be used in the normal way as inputs to other tools. Tool wrappers would need to define the metadata of all output files 'inside' the dataset to make it possible to implement mechanisms to use these files.

When a workflow crashes, people would like to be able to restart it from the point where it failed. This seemed to be a common issue. Ideally they would like to be able to modify it first (in order to tweak the parameters of the step which may have caused it to fail) and then restart it, and have it run only the steps which need running. It may not be possible to immediately tell which component has caused the problem, either - one component may fail early in a workflow, but the fault is not exposed until many steps later. The suggestion seemed to be that the right way to accomplish this is for an in-progress instance of a workflow to keep track of which datasets it 'owns' so that it can check what still needs to be run.

## General Points
Lots of people are happy about Blend. There was also a positive reaction to the concept of a higher-level API over the top of the existing Blend model.

There was some discussion about visualizing histories as a graph - in part inspired by the workflow discussion and in part by Ira Cooke's talk in which he'd implemented such a visualization for proteomics. A couple of people commented that they sometimes extract a workflow from a history just to visualize the history, but that this of course doesn't show the filenames. A way to directly navigate the history would be better.

Participants wanted to reduce common coding tasks that many groups were doing, such as creating synchronization mechanisms to tell when a workflow was complete.
