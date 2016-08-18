---
autotoc: true
---
# Basic Workflow Editing

<br />
[Back to Advanced Workflow](/Learn/AdvancedWorkflow)

<br />
## Why edit a workflow?
<br />
In many cases, a workflow can be directly [extracted from a history](/Learn/AdvancedWorkflow/Extract) and run without any changes. 
<br />
<br />
However, in certain cases, tools require that small changes are edited in to ensure proper output &rarr; input connections. Plus creating a new workflow from an existing workflow is a quick way to develop a new, but similar, process. Knowing how to perform *basic workflow editing* is a valuable skill for all [Galaxy](/BigPicture/Choices) users.
<br />
<br />
**In short**: even just learning how to make small changes makes workflows accessible to everyone

<br />
## Where is the option?
<div class='left'>![workflow menu edit](/Images/Learn/workflow_menu_edit_nav.png)</div>
<br />
<br />
Open **[usegalaxy.org](http://usegalaxy.org)** (or any [Galaxy](/BigPicture/Choices)) from any view. 
<br />
<br />
<br />
**1.** Click on **Workflow** in the top menu bar. 
<br />
<br />
**2.** Click on any existing workflow's button to reveal the workflow pull-down menu.
<br />
<br />
**3.** Select **Edit** from the menu.
<br />
<br />
<br />
*Select **Copy** first, then **Rename** and **Edit** the copy if you are using an existing workflow to create a new workflow.*
<br />

<br />
## Editor Layout
Selecting **Edit** opens the workflow editor view. Each of the major landmarks is used for a specific purpose and is defined on this wiki page. Below is the *annotated* view. For a look at the view *without annotation*, click **[here](/Learn/AdvancedWorkflow/BasicEditing/WorkflowEditorUnannotated)**.
<br />
<br />
![workflow editor view annotated](/Images/Learn/workflow_editor_overview_annotated.png)
<br />
<br />
### Workflow Canvas
The *canvas* is where *inputs*, *tools*, and *noodles* are added and connected as you build and modify your workflow. If content is on your canvas, it is in your workflow.
(annotated top center *red* panel in the [Editor Layout](/Learn/AdvancedWorkflow/BasicEditing/#editor_layout) above)
<br />

### Navigation
The *navigator* provides a full view of your workflow in a condensed format. Slide the blue box around to bring sections of your workflow into *focus* within the canvas where the contents can be added, deleted, examined, or edited. If it is in the way of your work, toggle the size of the window with the the lower right corner *hide* function.
(annotated bottom center panel *red* in the [Editor Layout](/Learn/AdvancedWorkflow/BasicEditing/#editor_layout) above)
<br />

### Editor Menu
<div class='right'>![workflow editor menu detail](/Images/Learn/workflow_editor_menu_detail.png)</div>
Accessed by clicking on the gear icon on the right side of the center *Workflow Canvas* upper bar, the *workflow editor menu* is for global editor actions. (annotated *orange* in the [Editor Layout](/Learn/AdvancedWorkflow/BasicEditing/#editor_layout) above)
* **Save** - Be sure to save your changes before leaving the editor or they will be lost! If you do try to navigate away from the page without saving, you will be reminded with a pop-up warning (see *Close* below) - choose *Save Changes* to apply modifications to the workflow.
* **Run** - After saving, you can choose to start a run with your new workflow directly from the editor.
* **Edit Attributes** - Edit the name of your workflow and add in a description. Both will be displayed with the workflow is executed and if published (a *Sharing* option), part of the information listed on the *Published Workflows* page.
* **Auto Re-layout** - Have your datasets and noodle connections become tangled and confused? Try this option to clean things up!
* **Close** - Saved and are done? Or, made changes that you'd rather leave behind? Close it up and choose *Don't save* when this pop-up warning appears. 
<div class='center'>![workflow editor menu pop-up](/Images/Learn/workflow_editor_menu_close.png) <br /> *save changes or don't save?*</div>
<br />

### Left Tools Panel
<div class='right'>![workflow editor toolpanel detail](/Images/Learn/workflow_editor_toolpanel_detail.png)</div>
Located at the far left in the editor layout, the *Tools* panel contains all the the tools available on the instance plus a special group for *input datasets*. (annotated left panel top *red* and underneath "blue" in the [Editor Layout](/Learn/AdvancedWorkflow/BasicEditing/#editor_layout) above and *Tool Panel Detail* to the right)
<br />
<br />
* **tool search** - Search for tools by name 
* **1: tool groups** - Click to open tool groups to reveal tools. Click on a *tool* to add it to your *workflow canvas*. More about *toolbox* features below in [ToolBox Details](/Learn/AdvancedWorkflow/BasicEditing/#toolbox_details). <br /> ![workflow editor add tool](/Images/Learn/workflow_editor_add_tool.png)
* **workflow control** - Scroll down to the bottom of the panel to locate this special section of workflow-editing specific canvas items.
* **2: input dataset** - Click to add to your *workflow canvas* same as adding a tool. More about *inputs* below, see [Key Edits: Adding Inputs](/Learn/AdvancedWorkflow/BasicEditing/#adding_inputs). 
* **3: input dataset collection** - Click to add to your *workflow canvas* same as adding a tool. More about how *dataset collections* differ from *datasets* is pending wiki documentation (brand-new!).
<br />

### ToolBox Details
<div class='right'>![workflow editor toolbox detail-A](/Images/Learn/workflow_editor_toolbox_detail-A.png)</div>
A *toolbox* on the *workflow canvas* represents a *tool* action or *job* performed on dataset(s) as they pass through a workflow. On the *canvas*, *input and tool* connections and hidden status are set. Specific settings for a *tool* are made in the far right [Details](/Learn/AdvancedWorkflow/BasicEditing/#right_details_panel) panel, explained below. (annotated center panel "purple" in the [Editor Layout](/Learn/AdvancedWorkflow/BasicEditing/#editor_layout) above and *toolbox detail "A"* to the right)
<br />
* **1: tool name** - Exact tool name.
* **2: tool description** - Short portion of the tool description or actions.
* **3: output name/datatype** - Name given to the output and the datatype when it is specified by the tool.
* **4: delete** - Click the "X" to remove (delete) the tool from your workflow.
* **5: input connection(s)** - Where the input for the tool is supplied through a connecting *noodle* from an upstream *tool* output or *input* dataset.
* **6: output connection(s)** - Where the output from a tool exists the tool and is sent through a connecting *noodle* to a downstream *tool* (unless this tool produces a final output dataset).
* **7: noodle(s)** - How *input* datasets and *tool* boxes are connected. More about *noodle* connections is below in [Key Functions: Noodle-y Connections](/Learn/AdvancedWorkflow/BasicEditing/#noodle-y_connections).
* **8: hide toggle** - Datasets that result from tool execution can be displayed in a history or hidden. More about *hidden* datasets is below in [Most Useful Edits: Hidden Datasets](/Learn/AdvancedWorkflow/BasicEditing/#hidden_datasets). 
<br />
<br />

### Right Details Panel
The *details* panel is where tool settings are made and adjusted for the selected *[toolbox](/Learn/AdvancedWorkflow/BasicEditing/#toolbox_details)* on the *workflow canvas*. Some settings are the same as those made when a *tool* is executed from a history (the settings on the *tool form*). Others are workflow-specific options. (annotated right top *red* panel and underneath *purple* in the [Editor Layout](/Learn/AdvancedWorkflow/BasicEditing/#editor_layout) above and *toolbox detail "B-1 & B-2"* below)
* **tool: tool name** - The exact name of the *tool* being edited. Same as in the *toolbox*. 
* **1: version** - The Galaxy *wrapper version* for the tool. Note that this is __not__ the same as the underlying *tool executable* version (both are available on the ![](/Images/Icons/HistoryInfo.png) *info form* for a completed job).
* **2: tool description** - Short portion of the tool description or actions. Same as in the *toolbox*. 
* **3: edit step actions** - Workflow-specific actions that can be applied when a *tool* is executed and are sometimes necessary to create appropriate *[noodle connections](/Learn/AdvancedWorkflow/BasicEditing/#noodle-y_connections)* between tools (such as *[datatype](/Learn/AdvancedWorkflow/BasicEditing/#assign_datatype)* assignments). All pull-down menu options are explained in: **[Advanced Editing](/Learn/AdvancedWorkflow/AdvEditing)** and **[Using Variables](/Learn/AdvancedWorkflow/Variables)**.
* **4: edit step attributes** - Workflow-specific annotation/info that can be provided to describe what a tool's purpose is, expected input content (if an *input* dataset box), and other communications directed to users of the workflow. This annotation is displayed when a workflow is *viewed* or when it is *run*.
* **5: tool form info contents** - Exact contents displayed on a tool's *tool form* underneath the settings. This is provided in the *workflow editor* to assist with correct setting and connections for included *tools*.
![workflow editor toolbox detail-B1](/Images/Learn/workflow_editor_toolbox_detail-B1.png) continued on....
![workflow editor toolbox detail-B2](/Images/Learn/workflow_editor_toolbox_detail-B2.png)
<br />

## Key Functions

### Adding Inputs
**Inputs** in your workflow are a special class of object. When a workflow is *run*, the *inputs* are selected by the user from datasets in the current history. The generation of original inputs cannot be added to a workflow - through the use of "Get Data" tool functions or otherwise. Add *input* datasets as boxes to your *workflow* canvas the same way as you do tools:
* click on *input dataset* in the far left *Tools* panel (scroll to bottom to locate)
* once on your *canvas*, drag a *noodle* from the *output* connection over to the downstream tool's *input* connection. 
* **save** your work! 
<div class='center'>![workflow editor input canvas](/Images/Learn/workflow_editor_input_canvas.png) <br /> adding and connecting *inputs*</div>
<br /> 

### Noodle-y Connections
*Noodles* represents the flow of data from one step in a workflow analysis to the next. These will link input-output connections with compatible datatypes. 
* When dragging a *noodle* from a tool's *output connection*, tools with available *input connections* will highlight as *green* on the *workflow canvas*. See the graphic above in the section [Adding Inputs](/Learn/AdvancedWorkflow/BasicEditing/#adding_inputs) for an example.
* When you want to remove a connection, hover the pointer over the *noodle* until an "X" appears. Click on it to delete the *noodle*. 
* Some tools have more than one *input connection*, some have more that one *output connection*. Each may be of a different *[datatype](/Learn/Datatypes)*. Confused? Click on the *toolbox* then review that tool's help at the bottom of the far right *Details* panel. 
* If your connection is broken or will not link, see the help below [Most Useful Edits: Assign Datatype](/Learn/AdvancedWorkflow/BasicEditing/#assign_datatype). This will not resolve all connection problems (the data must be compatible between tools!), but the most common. 

## 3 Most Useful Edits


### Label Inputs
<div class='right'>![workflow editor input renaming](/Images/Learn/workflow_editor_input_renaming.png)</div>
When a workflow is *run*, the user selects a dataset from the history to be used for each *input* in your workflow. Give them a label to make sure that the correct dataset is selected. 
<br />
<br />
A good label may include:
<br />
<br />
* the expected *content* of the dataset (reference annotation, gene bound coordinates, ...)
* the expected *format* of the dataset (BAM, BED, GTF, ...)
* the *exact name* of a dataset. When? If it is provided in a library or Page (as a shared history with datasets).
To label an input:
* click on the *input* box on the *workflow canvas* to bring it up in the far right *Details* panel
* type in the new name that you would like to be displayed to the user. 
* include extra annotation if the dataset needs to be created in a specific way or has other important details
* **save** your work! 
<br /> 

### Hidden Datasets
*Hidden* datasets are a useful way to avoid displaying intermediate datasets from longer workflows in histories. The general usage is to only display final outputs. To do this:
* click on this toggle on output datasets - any not set will be hidden. 
* by default all datasets are displayed, even with the toggle unset.
* hover over the *hide toggle* to view the help pop-up, shown below.
* **save** your work!
<div class='center'>![workflow editor hide toggle](/Images/Learn/workflow_editor_hide_toggle.png) <br /> *hide toggle* location in *toolbox*</div>
<br /> 

### Assign Datatype
A *tool* may require a specific *input* **[datatype](/Learn/Datatypes)** in order for it to be used correctly. In some cases, you will find out about this after extracting a workflow, viewing it, and noticing a missing *noodle* connection. Other times it will come up during creating or editing when a downstream *input connector* is not accepting a *noodle* from an upstream tool's *output connector* (not turning green). This can indicate a true data incompatibility or a formatting problem. But sometimes just reassigning the **[datatype](/Learn/Datatypes)** for the output in the upstream tool is enough to resolve the issue.
Example:
* calculations were performed on a [bed](/Learn/Datatypes/#bed) file adding extra fields
* the result data was then processed by the *Cut* tool to create an [interval](/Learn/Datatypes/#interval) dataset for further analysis
* however, the *Cut* tool always breaks metadata column assignments, resulting in a [tabular](/Learn/Datatypes/#tabular_28tab_delimited29) *datatype* assignment
* the *output connector's noodle* from the *Cut* tool will not connect with a tool that requires *interval* format, such as a tool from the group *Operate on Genomic Intervals*
* what to do? answer = *reassign the datatype* for the output from the *Cut* tool in your workflow
<div class='center'>![workflow editor datatype before](/Images/Learn/workflow_editor_datatype_before.png) <br /> before *datatype* reassignment, no connection</div>


<div class='left'>![workflow editor datatype edit](/Images/Learn/workflow_editor_datatype_edit.png) <br /> editing *datatype*</div>
<br />
**How to edit the *datatype* assignment:**
<br />
<br />
* click on the *Cut toolbox* in the *workflow canvas* to bring it up in the far right *Details* panel
* **1** - under *Edit Step Attributes* select *Change Datatype* from the pull-down menu
* **2** - click on create to open the edit options for the section
* **3** - choose *interval* as the new *datatype* assignment for the tool output
* **4** - optionally, add a comment to this workflow step to remind yourself and any other users you share it with what was done as an extra data manipulation
* **save** your work! 
<br />
<br />
<br />
<br />
<br />

When changes are complete, click on any other tool to internally refresh the setting for this tool, then try the *noodle* connection again. 
<div class='center'>![workflow editor datatype after](/Images/Learn/workflow_editor_datatype_after.png) <br /> after *datatype* reassignment, **connected!!**</div>

<br />
<br />
