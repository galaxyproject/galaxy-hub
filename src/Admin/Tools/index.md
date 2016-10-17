PLACEHOLDER_INCLUDE(/Admin/LinkBox)
PLACEHOLDER_INCLUDE(/Develop/LinkBox)
PLACEHOLDER_INCLUDE(/Admin/Tools/LinkBox)
# Galaxy Tools

A hub page for [administration](/src/Admin/index.md) of computational tools within Galaxy framework.

## Intro

When you install and run fresh Galaxy you will have just a few basic tools installed (mostly for text manipulation). To make the most of your instance you probably want more. 

There are two ways how to gets a tool into Galaxy:
1. Installing it from the Tool Shed
2. Adding a custom tool manually

## Installing tools into Galaxy

The easiest way to get tools into Galaxy is to install them from the Tool Shed which contains vast number of popular tools already prepared to be used within Galaxy. It acts as an appstore for Galaxy and allows you to seamlessly load your Galaxy with helpfull tools. To get you started please se the  [Add Tool From Tool Shed Tutorial](AddToolFromToolShedTutorial).

## Adding a custom tool to Galaxy

Sometimes the tool you want is not in the Tool Shed yet. Sometimes you even develop a brand new tool that is in fact nowhere yet. You can add any piece of software into Galaxy if you tell Galaxy how to treat it.
Please start with the [Add Custom Tool Tutorial](AddToolTutorial) to see what needs to be done in order to make the tool available to Galaxy.

### Testing your tool

It is a very good idea to write functional test for your tool so you can validate its functionality automatically. To get you started please see tutorial for [Writing Tests](/src/Admin/Tools/WritingTests/index.md).

### Migrating custom tool to the Tool Shed

Later, when your tool is working within your Galaxy, you may want to share the tool with the huge Galaxy community. In order to do that you need to migrate your tool to the Tool Shed (Galaxy's appstore). To learn how to do so please see [How to Create and Populate Repository](../../CreateAndPopulateARepository) in the Tool Shed wiki.

## Tool dependencies

Some of the tools included in the distribution require dependencies that Galaxy cannot provide. Plese see a page dedicated to [Tool Dependencies](ToolDependencies) to learn which tools are affected and how to resolve it. As of March 2014 Galaxy is in the middle of migrating tools from the distribution to the [Tool Shed](../../ToolShed) which means that the list of these dependencies is shortening. The details about tool migrations are available at the [migration page](/src/ToolShed/MigratingToolsFromGalaxyDistribution/index.md).


* [Create Executable](Create Executable)
* [Custom Code](Custom Code)
* [Data Managers](DataManagers)
* [Data Tables](Data Tables)
* [External Display Application Tutorial](External Display Applications Tutorial)
* [Multiple Output Files](MultipleOutputFiles)

 
