---
title: Installing Tools into Galaxy from Tool Shed
---
PLACEHOLDER_INCLUDE(../../../Admin/LinkBox)
PLACEHOLDER_INCLUDE(../../../Admin/Tools/LinkBox)


This page describes the simple and uncomplicated installation of a tool into Galaxy. The process has to be completed by an administrator through the [Admin Interface](../../../Admin/Interface). For more advanced examples and additional description, please see [our guide to installing repositories to Galaxy](../../../ToolShed/InstallingRepositoriesToGalaxy).
If the tool you need does not exist in the Tool Shed you can add it to your Galaxy instance manually. Please see the [Add Tool Tutorial](../../../Admin/Tools/AddToolTutorial).
**For scripted installation of tools using the API please see the bottom of this page.**

## -1. Find the tool you want to use

* find the tool name in some other Galaxy instance that already has it
* use the Tool Shed search or browse at https://toolshed.g2.bx.psu.edu/
* use the experimental search at http://toolshed.tools/

## 1. (optional) Connect Your Galaxy to a Tool Shed

Galaxy is by default connected to the Main Tool Shed. However you can optionally connect to other custom Tool Sheds by modifying the `config/tool_sheds_conf.xml` file in the Galaxy directory. There are many Tool Sheds worldwide but the Galaxy Team maintains two: Main Tool Shed ([http://toolshed.g2.bx.psu.edu/](http://toolshed.g2.bx.psu.edu/)) and Test Tool Shed ([http://testtoolshed.g2.bx.psu.edu/](http://testtoolshed.g2.bx.psu.edu/)). By default, the Main Tool Shed configuration is already present and we recommend using it.

You can add as many Tool Sheds as you want to the configuration file.
```
<?xml version="1.0"?>
<tool_sheds>
    <tool_shed name="Galaxy Main Tool Shed" url="http://toolshed.g2.bx.psu.edu/"/>
    <OTHER TOOL SHED>
</tool_sheds>
```


## 2. Open the Tool Shed

Go to Galaxy [Admin Interface](../../../Admin/Interface) and click `Search and browse tool sheds`.

You will see the following in the middle panel:

![](../../../Admin/Tools/AddToolFromToolShedTutorial/connected_toolsheds.png)

## 3. Search for a Tool

Click `Search for valid tools`.

## 4. Enter the Name of the Tool You Are Searching For

Next, you can put in the tool name and hit `Search`.  In our example, we'll search for `bwa`.  

![](../../../Admin/Tools/AddToolFromToolShedTutorial/search_valid_tools.png)

## 5. Select a Tool from the Results to Install

After searching, we can select a tool to install.  In our case, we'll install `bwa base`.

![](../../../Admin/Tools/AddToolFromToolShedTutorial/install_bwa.png)

## 6. Installing your Tool

Finally, we can confirm our dependency installations and choose the panel section we want to show our tool in.  Note that if the dependency directory described above is set, the tool's dependencies (if they exist) will be shown on this page.  If you keep the 'Handle tool dependencies?' option checked, these dependencies are handled automatically.

![](../../../Admin/Tools/AddToolFromToolShedTutorial/select_section.png)

## 7. Sit Down, Relax, and Wait for the Installation to Proceed

As you're waiting for your tool to install, you can leave the page freely, as the installation will continue in the background. **Once done, please make sure to restart the Galaxy process (this also applies to any handlers your Galaxy uses) so the new tool will get loaded properly.**

The tool will show up in the tool panel of the section you selected, and the users can use it.

![](../../../Admin/Tools/AddToolFromToolShedTutorial/tool_installation.png)

You can monitor the installation progress of the tool if you click on `Monitor installing tool shed repositories` in the [Admin Interface](../../../Admin/Interface).

You can also check the states of all installed tools if you click `Manage installed tool shed repositories` in the [Admin Interface](../../../Admin/Interface).

![](../../../Admin/Tools/AddToolFromToolShedTutorial/repo_status.png)

# Automated Installation of Tools

The same process as described above can be performed in an automated way using a set of scripts. This is particularly useful if you are trying to install a large number of tools. The required scripts are available as an [Ansible](http://www.ansible.com/home) playbook from [here](https://github.com/afgane/galaxy-tools-playbook). See that page for complete instructions.
