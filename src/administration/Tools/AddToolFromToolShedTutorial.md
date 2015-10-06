INCLUDE(/Admin/LinkBox)
INCLUDE(/Admin/Tools/LinkBox)

<div class="title">Installing Tools into Galaxy from Tool Shed</div>
This page describes the simple and uncomplicated installation of a tool into Galaxy. The process has to be completed by an administrator through the [Admin Interface](/Admin/Interface). For more advanced examples and additional description, please see [our guide to installing repositories to Galaxy](/InstallingRepositoriesToGalaxy).
If the tool you need does not exist in the Tool Shed you can add it to your Galaxy instance manually. Please see the [Add Tool Tutorial](/Admin/Tools/AddToolTutorial).


# Manual installation of tools
## 1. Connect Your Galaxy to a Tool Shed

You can connect your Galaxy to a tool shed by modifying the `config/tool_sheds_conf.xml` file in the Galaxy directory. There are many tool sheds worldwide but the Galaxy Team maintains two: Main Tool Shed ([http://toolshed.g2.bx.psu.edu/](http://toolshed.g2.bx.psu.edu/)) and Test Tool Shed ([http://testtoolshed.g2.bx.psu.edu/](http://testtoolshed.g2.bx.psu.edu/)). By default, these two are already included in the distribution.

Your best choice would probably be to start with the Main Tool Shed, but you can add as many tool sheds as you want.
```
<?xml version="1.0"?>
<tool_sheds>
    <tool_shed name="Galaxy main tool shed" url="http://toolshed.g2.bx.psu.edu/"/>
</tool_sheds>
```


## 2. Set the Directory for Tool Dependencies

Next, you need to set the directory for where tool dependencies will be located.  You can set this path by uncommenting and setting the value `tool_dependency_dir` in the Galaxy config file `galaxy.ini`.

For example, if you create a directory named `path/to/galaxy/dependency_dir`, your Galaxy config would look like the following:
```
tool_dependency_dir = dependency_dir
```


Restart Galaxy after you modify the config file in order for changes to take effect.

## 3. Open the Tool Shed

Go to Galaxy [Admin Interface](/Admin/Interface) and click `Search and browse tool sheds`.

You will see the following in the middle panel:

![](/Admin/Tools/AddToolFromToolShedTutorial/connected_toolsheds.png)

## 4. Search for a Tool

Click `Search for valid tools`.

## 5. Enter the Name of the Tool You Are Searching For

Next, you can put in the tool name and hit `Search`.  In our example, we'll search for `bwa`.  

![](/Admin/Tools/AddToolFromToolShedTutorial/search_valid_tools.png)

## 6. Select a Tool from the Results to Install

After searching, we can select a tool to install.  In our case, we'll install `bwa base`.

![](/Admin/Tools/AddToolFromToolShedTutorial/install_bwa.png)

## 7. Installing your Tool

Finally, we can confirm our dependency installations and choose the panel section we want to show our tool in.  Note that if the dependency directory described above is set, the tool's dependencies (if they exist) will be shown on this page.  If you keep the 'Handle tool dependencies?' option checked, these dependencies are usually handled automatically.

![](/Admin/Tools/AddToolFromToolShedTutorial/select_section.png)

## 8. Sit Down, Relax, and Wait for the Installation to Proceed

As you're waiting for your tool to install, you can leave the page freely, as the installation will continue in the background.  Once done, the tool will show up in the tool panel of the section you selected, and users will be free to use it.

![](/Admin/Tools/AddToolFromToolShedTutorial/tool_installation.png)

You can monitor the installation progress of the tool if you click on `Monitor installing tool shed repositories` in the [Admin Interface](/Admin/Interface).

You can also check the states of all installed tools if you click `Manage installed tool shed repositories` in the [Admin Interface](/Admin/Interface).

![](/Admin/Tools/AddToolFromToolShedTutorial/repo_status.png)

# Automated installation of tools
The same process as described above can be performed in an automated way using a set of scripts. This is particularly useful if you are trying to install a large number of tools. The required scripts are available as an [Ansible](http://www.ansible.com/home) playbook from [here](https://github.com/afgane/galaxy-tools-playbook). See that page for complete instructions.
