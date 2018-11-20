---
title: Galaxy ToolShed
---
# Philosophy

The [main Galaxy ToolShed](https://toolshed.g2.bx.psu.edu) serves as an "appstore" to all Galaxies worldwide, and is a **free service** for tool developers and Galaxy admins to host and share [Galaxy utilities](/src/toolshed/galaxy-utilities-in-repositories/index.md).

The ToolShed allows Galaxy administrators to install thousands of freely available Galaxy utilities into their instances. It allows sharing of tool updates and versions and simplifies management of such, making both tool developers' and administrators' lives easier. For more information, see the full [ToolShed tour](/src/toolshed/tour/index.md).

The main Galaxy ToolShed also contains tools that were previously packaged with the Galaxy distribution, but have now been [migrated](/src/toolshed/migrating-tools-from-galaxy-distribution/index.md) to the ToolShed. This migration simplifies maintaining reproducibility and allows tool authors and Galaxy administrators to gain an overview of the development process and install older versions of tools.

# Common Terminology

* [*wrapper*](/src/toolshed/publish-tool/index.md) or *tool definition file* - The XML file that describes to Galaxy how the underlying software works, thus allowing Galaxy to execute the software in the right way.
* [*repository*](/src/toolshed/repository/index.md) - Tools in ToolShed are stored in versioned code archives. The ToolShed uses Mercurial as the platform of choice for this purpose.
* [*utility*](/src/toolshed/galaxy-utilities-in-repositories/index.md) - Any component that can be uploaded to the ToolShed and installed into other Galaxy instances for general or specific analyses.
* [*workflow*](/src/toolshed/workflow-sharing/index.md) - A JSON file describing steps in an analysis, which can be used to reproduce the analysis on another Galaxy instance.

# Installing Tools into Galaxy

The main goal of the ToolShed is to allow populating any Galaxy with utilities such as tools, datatypes, workflows, and more. For this you don't even need to know much about the ToolShed. A basic installation of a tool into Galaxy is described in the [Add Tool Tutorial](/src/admin/tools/add-tool-from-toolshed-tutorial/index.md). For more in-depth explanation of how to install and manage tools please see the [ToolShed Repositories in a Galaxy Environment](/src/installing-repositories/index.md) article.

# Publishing to the ToolShed

There are over 80 [public Galaxy servers](/src/use/index.md) and hundreds of private ones. If you would like to share a Galaxy utility that you've developed with the Galaxy community, we encourage you to publish it in the ToolShed.

We assume you have your tool developed, tested, and already working in your local Galaxy instance. If you don't, please see the following resources:

* Create Galaxy tools [tutorial](/src/admin/tools/add-tool-tutorial/index.md)
* Create histogram tool [tutorial](/src/admin/tools/adding-tools/index.md)
* Writing tools with [Planemo](http://planemo.readthedocs.io/en/latest/writing_standalone.html)

To publish a tool you need to take the following steps:
* Create an account in the ToolShed.
* Create a repository.
* Upload your tool to the repository.

The full process is described in detail on the [Publish Tool](/src/toolshed/publish-tool/index.md) page.

# Basic Topics

- [Readme Files](/src/toolshed/readme-files/index.md)
- [Repository Contents](/src/toolshed/repository-contents/index.md)
- [Tool Dependency Recipes](/src/toolshed/tool-dependency-recipes/index.md)
- [Repository Features](/src/toolshed/repository-features/index.md)
- [Searching The ToolShed](/src/toolshed/searching-the-toolshed/index.md)

# Advanced Topics

- [Hosting a Local ToolShed](/src/toolshed/hosting-a-local-toolshed/index.md)
- [Advanced Repository Features](/src/toolshed/advanced-repository-features/index.md)
- [Advanced Topics](/src/toolshed/advanced-topics/index.md)
