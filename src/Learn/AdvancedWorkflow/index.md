---
autotoc: true
---
PLACEHOLDER_INCLUDE(/Learn/LinkBox)
# Creating Workflows and Advanced Workflow Options
<div class='right'></div>
## A workflow is ..
* ** .. a series of tools and dataset actions that run in sequence as a batch operation.**
* Workflows can be generated quickly from the analysis already completed in a history.
* Workflows can be created from scratch using the *workflow editor*.
* Workflows can be annotated, viewed, shared, published, and imported - just like other Galaxy objects.
* Any workflow that you have permissions to import, you can modify with the *workflow editor*.
* Workflow can be reused over and over, not only reducing tedious work, but enhancing reproducibility by applying the same exact methods to all of your data.
* Workflows can be executed on multiple streams of input data in a single pass with the output results sent to new, distinct, result histories. 
* Workflow intermediate and final output datasets can be custom labeled, hidden or shown in default view, have post-job actions applied, and other advanced options executed.
* Workflows can be executed using the API (including workflows that exist on the public [/Main](/Main) server). Your account's API Key is generated/stored under *User -> API Keys*. Learn more about the **[API...](/src/Learn/API/index.md)**
* Check the usage information on other [public Galaxy servers](/src/PublicGalaxyServers/index.md) to see if they support API access.

## Learn from an example
</div> ![workflow editor](/src/Images/Learn/workflow_edit_peek.png) <br />*workflow editor with expanded **edit menu***</div>
<br />
* Choose a workflow from **[Main's](/Main) Published Workflows [https://usegalaxy.org/workflow/list_published](https://usegalaxy.org/workflow/list_published)**
* Click on the workflow name to access the pull-down menu of options and explore.
* Import a workflow after viewing it. This will place it in your "Saved Workflows" list. 
* Lost your place? Go to the very top menu and click on "Workflow". 
* For a saved workflow in your list, click on the name to access the workflow pull-down menu. <div class='right'>![workflow menu](/src/Images/Learn/workflow_copy.png) <br />***workflow menu***</div>
* Choose "Edit" to open the *workflow editor*. More instructions for "how-to" are below. Be aware that you can browser navigate away from this page, or close it using the menu, **without saving** if you do NOT want to keep the changes. BUT if you want to keep the changes, *be sure to **save** before leaving the editor*. 
* *If a workflow is very important to you, it is a good practice to make at least one exact **copy** of it.*  This is especially true for workflows undergoing active edits. How often do you copy it? Depends on how painful it would be to re-do the work if you accidentally forget to save, or save a change that you  end up not liking. You will be warned in the UI before leaving the editor with unsaved changes, but these sorts of things still do happen...

<br />
## Extract workflow from a history
Do you already have an analysis path created in a history? Then your new workflow is just a few clicks away. 

**[Learn how...](/src/Learn/AdvancedWorkflow/Extract/index.md)**

<br />
## Basic editing
Understanding the layout and basic usage options of the workflow editor are powerful yet simple concepts to master. If you are just getting started with workflows, this is worth a review. 

**[Read more...](/src/Learn/AdvancedWorkflow/BasicEditing/index.md)**

<br />
## Using variables
A special option of advanced editing, making use of variables to control dataset names can be used to improve clarity in output results. **Note that this functionality is undergoing active changes and may not work exactly as in the example at this time**

**[Details here...](/src/Learn/AdvancedWorkflow/VariablesEdit/index.md)**

<br />
## Turn your workflow into a tool?
Well, not exactly, but it can *look* just like a tool in the tool menu pane and *function* very much like a tool in the history pane. Does the rest matter? Likely not, since full detail/reproducibility is still preserved (is just hidden from default view that can be unhidden for review, permanently or temporarily). Interested? 

**[Here's how...](/src/Learn/AdvancedWorkflow/ToolPanel/index.md)**
