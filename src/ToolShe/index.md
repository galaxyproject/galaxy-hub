INCLUDE(/Admin/Tools/LinkBox)
<div class='right'> <a href='/ToolShed.md'><img src='/Images/Logos/ToolShed.jpg' alt='Tool Shed logo' height="110px" /></a> 
</div>

# The Galaxy Tool Shed

It runs at [http://toolshed.g2.bx.psu.edu](http://toolshed.g2.bx.psu.edu) and serves as an appstore to all Galaxies worldwide. It is a free service that hosts repositories containing [Galaxy Tools](/Admin/Tools), [Galaxy Data Managers](/Admin/Tools/DataManagers), custom [Galaxy Datatypes](/Admin/Datatypes), and exported [Galaxy Workflows](/Learn/AdvancedWorkflow).

## Introduction
Tool Shed allows Galaxy administrators to install thousands of freely available Galaxy utilities into their instances. It also manages external tool dependencies and tool updates, making their life easier. Moreover, it allows tool developers to easily share, update, and manage their tools across all Galaxies. See the full [Tool Shed Tour](/ToolShedTour).

### Common Terminology
* *wrapper* or *tool definition file* - The XML file that describes to Galaxy how the underlying software works, thus allowing Galaxy to execute the software in the right way.
* *repository* - Tools in Tool Shed are stored in versioned code archives. Tool Shed uses Mercurial as the platform of choice for this purpose.

## Installing Tools into Galaxy
The main goal of the Tool Shed is to supply tools into any Galaxy. For this you don't even need to know much about the Tool Shed. A simple installation of a tool into Galaxy is described in the [Add Tool Tutorial](/Admin/Tools/AddToolFromToolShedTutorial). For more in-depth explanation of how to install and manage tools please see the 
[Tool Shed Repositories in a Galaxy Environment](/InstallingRepositories).

## Publishing a Galaxy Tool
There are dozens of Galaxy public servers ([see the list](/PublicGalaxyServers)) and hundreds of private ones. If you would like to share a Galaxy utility that you've developed with the vast Galaxy community, publish it in the Tool Shed.

We assume you have your tool developed, tested, and already working in your local Galaxy instance. If you don't, please see the corresponding tutorial to [create Galaxy tools](/Admin/Tools/AddToolTutorial).

To publish a tool you need to take the following steps:
* create an account in the Tool Shed
* create a repository
* Upload your tool and test data (make sure your tool config defines tests) to the repository
* optionally create a tool dependency definition file (which defines a relationship to an external package dependency for your tool)

The full process is described in detail on the [Publish Tool](/ToolShed/PublishTool) page.

## Interface
[/ToolShed/Repository](/ToolShed/Repository)
### Advanced Topics

* [Advanced Topics](/ToolShedAdvancedTopics)
* [Tool Shed blog](http://gregvonkuster.org) by [Greg](/greg_vonkuster)
