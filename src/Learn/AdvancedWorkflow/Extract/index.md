---
autotoc: true
---
PLACEHOLDER_INCLUDE(/Learn/LinkBox)

# Extract Workflow from a History
<div class='right'></div>

<br />
[Back to Advanced Workflow](/src/Learn/AdvancedWorkflow/index.md)

<br />
## Why extract a workflow?
Once a productive analysis pathway is in a history, you may find that you want to run it again on more input datasets. A workflow is a great tool that not only makes this processing less tedious, but ensures that it runs exactly the same way, every execution. 
<br />
<br />
**In short**: run analysis without the *yawn* or *oops* factors

<br />
<div class='left'>![workflow history menu extract](/src/Images/Learn/workflow_menu_extract.png)</div>
## Where is the option?
<br />
<br />
<br />
Open **[usegalaxy.org](http://usegalaxy.org)** in default view (click on "Galaxy" in masthead). 
<br />
<br />
<br />
The **History** panel is on the far right, base color light blue (with green, yellow, etc datasets).
<br />
<br />
<br />
The option is under the **History menu** as **Extract Workflow**.
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
## How is it done?

<br />
Log into your account (required to use workflows). Start with the target history loaded into the history panel. For learning purposes, you may choose to run this example with the exact data used here. The source content is in Shared Data -> Published Pages -> **[Extract Workflow](https://usegalaxy.org/u/galaxyproject/p/extract-workflow)**. Import the history to both extract a workflow and for source input data to run it. The additional Page content is included for reference/self-learning purposes.
<br />
![workflow target history](/src/Images/Learn/workflow_history.png) <br /> *target history*

<br />
Open the **History menu** and scroll down to the option **Extract Workflow**
<br />
![choose extract](/src/Images/Learn/workflow_choose_extract.png) <br /> *choose extract*

<br />
Allow Galaxy to process the request without interrupting or navigating away from this view. The larger the history, or the busier the server is, the longer this will take. In most cases, this is less than a minute, but be patient. 
<br />
<br />

<br />
**In the center panel, the extracted workflow will display**. If you are in a hurry, clicking on the **Create Workflow** button immediately is an option. But be aware that this may result in extra content from your history being included in the workflow that you do not need or want. So, while we are here, we'll take a quick tour of the features on this view:
<br />
![extract annotated](/src/Images/Learn/workflow_extract_annotated.png) <br /> ***extract workflow annotated***
<br />

<br />
* **Structure**
  * The **Header** contains the labels and top level control functions
  * The **Left** column represents the tools used in the history to generate datasets
  * The **Right** column represents the output of those tools
  * *A **workflow is** primarily **a collection of tools***. When it does contain the output of tools, these will be treated as input datasets. Input datasets are what the user of the workflow selects from existing datasets in the starting history when the workflow is executed.


* **Header: Workflow name** (orange box): This will be the name of the workflow. Make it meaningful when you create your own.

* **Header: Create Workflow** (red box): Click this when you are finished making changes. This saves the workflow. If you happen to click it too soon or change your mind, you can always go back and edit your workflow later. Start with **[Basic Editing](/Learn/AdvancedWorkflow/BasicEditing)** or explore all options linked from the **[Advanced Workflow](/src/Learn/AdvancedWorkflow/index.md)** wiki.


* **Left: Tools that cannot be included in workflows** (yellow boxes): These are tools that are run externally from Galaxy (in whole or in part) and return data back as a dataset. Most of the tools under "Get Data", including "Upload File", and the "Upload" function above the left Tool Panel, are included in this category of tools.


* **Left: Tools that can be included in workflows** (green arrow): These are tools run within Galaxy. Each has a checkbox. If the tool is part of the analysis path you wish to retain, leave it checked. If it was a dead-end, or a step you no longer need, or even just part of a group of steps that you don't want in this workflow - uncheck the tools and they will be omitted from the workflow. *It is important to note that changes here will not impact your current history - all existing tools and dataset remain unchanged.*


* **Right: Datasets that can be included in workflows as *input*** (blue arrow): These are the datasets that were either the output of tools run externally to Galaxy (in full or in part). Datasets that resulted from "yellow box" tools, uploaded datasets, and copied datasets (from another history or imported from a library/another history) are included in this category. All workflows need to have inputs! When there are several inputs, or it is confusing about what the expected input should be (for example, when workflows are shared or published), this is when you'll know that it is time to review the help in **[Basic Editing](/src/Learn/AdvancedWorkflow/BasicEditing/index.md)**.


* **Right: Datasets that cannot be included in workflows** (no annotation): these are the datasets that were created by the tools that can be included in workflows. This are the datasets your workflow will be creating when you run it. The content next time will be based on the content of the inputs provided and what operations the tools perform.


<br />
After customizing is done (if any), click on **Create Workflow** to save the extracted analysis as a workflow. For this operation, it is also important to allow Galaxy to process the request and to not navigate away from the view. You'll know that the workflow is created when the bright blue *completed* box appears. 
<br />
![blue created](/src/Images/Learn/workflow_blue_created.png) <br /> *confirmation that a workflow is created*
<br />
<br />
From this point you can click to directly *run* or *edit* your workflow. If you want to locate it at a later time, it is in your *Saved Workflows*! Go there by clicking on the very top navigation menu bar option **Workflows**.
<br />
![topbar workflow](/src/Images/Learn/workflow_topbar_workflow.png) <br /> *top menu bar "Workflow" option*
<br />

<br />
After clicking on the top menu bar option **Workflow**, an account's **Saved Workflow** view is reached, and it will look similar to this:
<br />
![workflow saved by you](/src/Images/Learn/workflow_saved_by_you.png) <br /> *workflows saved by you*
<br />
<br />
It also lists **Workflows Shared with You** (if any). Under **Other Options** is the button for the special function that allows you to list your workflow directly into your tool panel (bottom of left panel). 
<br />
![workflow shared with you](/src/Images/Learn/workflow_shared_with_you.png) <br /> *workflows shared with you*
<br />

<br />
**To use this workflow right now, or another that you created, do the following to set up a run:**
1. Click on **Analyze Data** to return to the default Galaxy view with the source history active in the history panel (it should be if, you are following the above steps).
1. Or, use the **History Menu -> Saved Histories** to bring up all of your saved histories to select the one with datasets you wish to run your own workflow on. Or, click on **History Menu -> Create New** and upload new datasets (and prep as needed, if data prep was not included in your workflow).
1. Click on your workflow in the tool panel if you saved it there (at bottom of left panel), or search all belonging to you, without leaving this view, by clicking on "Workflows -> All workflows" the bottom of the left tool panel.
1. For the workflow you just created, click on the workflow's button to bring up the workflow menu and choose run, it will look like this: <br /> ![workflow shared with you](/src/Images/Learn/workflow_menu_run.png)
1. Now your workflow will appear in the middle analysis panel, with the active history in the right panel. **Select the inputs** from the available datasets in the history. Datasets that meet the "datatype" metadata criteria will be filled in by default, but these can be adjusted using each input pull-down menu as shown: <br /> ![workflow select inputs](/src/Images/Learn/workflow_select_inputs.png)
1. Use default options for all other settings. Scroll down to the end of the middle panel and click on the **Run workflow** button. Once again, allow the request to process. <br /> ![workflow run](/src/Images/Learn/workflow_run.png)
1. Once confirmation that the workflow is launched, noted by the green box in the middle pane and the workflow datasets added to the history as queued, you can proceed to other analysis while the jobs run. <br /> ![workflow launched](/src/Images/Learn/workflow_launched.png)
1. The end!

<br />
## Help! I don't see my workflow datasets
There are two reasons why the output is not in the current history. One possibility is that you did not wait for the confirmation that workflow was actually started (the "green box" confirmation in the step directly above). If you think this is the case, go back and run it again. ***But first***, check for the second possibility: did you check the box to send the output to another history? The option is at the bottom of the workflow submission page and is called **Send results to a new history**. The name can be modified, but the default history name is the same as the workflow name. Look under **History menu -> Saved Histories** and check if your data is there. 

<br />
There is a third possibility, but this only applies when the workflow has been edited and only some of the datasets appear to be missing. Some of the datasets are *hidden*. To reveal them, use **History menu -> Include Hidden Datasets**. More about *hidden datasets* is in the **[Basic Editing](/src/Learn/AdvancedWorkflow/BasicEditing/index.md)** workflow wiki. 

<br />
## How do I know the workflow is really running?
The datasets for the workflow will be in the history panel. These jobs run just like every other job. Some may run right away, others may queue. More about how datasets execute is in this wiki: **[Dataset status and how jobs execute](/src/Support/index.md#dataset_status_and_how_jobs_execute)**

<br />
## I want to customize my workflow further
Good idea! Read more about workflow operations not covered in this wiki, in others linked from here: **[Advanced Workflow](/src/Learn/AdvancedWorkflow/index.md)**


<br />
## I can't create or access Workflows
Are you seeing one of these messages below? This indicates that you are not logged into your account. Workflows can only be used by registered users. Log in under **User -> Login** or create an account under **User -> Register**.
<br />
<br />
![workflow anon create message](/src/Images/Learn/workflow_anon_create_message.png) <br />*"Create Workflow" message when not logged in* 
<br />
<br />
![workflow anon saved warning](/src/Images/Learn/workflow_anon_saved_warning.png) <br />*"Saved Workflow" message when not logged in* 

<br />
<br />
	
