---
autotoc: true
---

# The Galaxy Tool Shed

Runs at [http://toolshed.g2.bx.psu.edu](http://toolshed.g2.bx.psu.edu) and serves as an appstore to all Galaxies worldwide. It is a **free service** that hosts repositories containing [Galaxy Tools](/src/admin/tools/index.md), [Galaxy Data Managers](/src/admin/tools/data-managers/index.md), custom [Galaxy Datatypes](/src/admin/datatypes/index.md), and exported [Galaxy Workflows](/src/learn/advanced-workflow/index.md).

## Introduction

Tool Shed allows Galaxy administrators to install thousands of freely available Galaxy utilities into their instances. It allows sharing of tool updates and versions and simplifies management of such, making both tool developer's and administrator's lives easier. See the full [Tool Shed tour](/src/toolshed/tour/index.md).

## Common Terminology

* *wrapper* or *tool definition file* - The XML file that describes to Galaxy how the underlying software works, thus allowing Galaxy to execute the software in the right way.
* *repository* - Tools in Tool Shed are stored in versioned code archives. Tool Shed uses Mercurial as the platform of choice for this purpose.

## Installing Tools into Galaxy

The main goal of the Tool Shed is to allow populating any Galaxy with tools. For this you don't even need to know much about the Tool Shed. A basic installation of a tool into Galaxy is described in the [Add Tool Tutorial](/src/admin/tools/add-tool-from-toolshed-tutorial/index.md). For more in-depth explanation of how to install and manage tools please see the
[Tool Shed Repositories in a Galaxy Environment](/src/installing-repositories/index.md).

## Publishing to the Tool Shed

There are dozens of Galaxy public servers ([see the list](/src/public-galaxy-servers/index.md)) and hundreds of private ones. If you would like to share a Galaxy utility that you've developed with the Galaxy community, we encourage you to publish it in the Tool Shed.

We assume you have your tool developed, tested, and already working in your local Galaxy instance. If you don't, please see the corresponding tutorial to [create Galaxy tools](/src/admin/tools/add-tool-tutorial/index.md).

To publish a tool you need to take the following steps:
* Create an account in the Tool Shed.
* Create a repository.
* Upload your tool to the repository.

The full process is described in detail on the [Publish Tool](/src/toolshed/publish-tool/index.md) page.
