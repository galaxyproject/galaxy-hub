---
title: Galaxy ToolShed
---
# Philosophy

The [main Galaxy ToolShed](https://toolshed.g2.bx.psu.edu) serves as an "appstore" to all Galaxies worldwide, and is a **free service** for tool developers and Galaxy admins to host and share [Galaxy utilities](/toolshed/galaxy-utilities-in-repositories/).

The ToolShed allows Galaxy administrators to install thousands of freely available Galaxy utilities into their instances. It allows sharing of tool updates and versions and simplifies management of such, making both tool developers' and administrators' lives easier. For more information, see the full [ToolShed tour](/toolshed/tour/).

The main Galaxy ToolShed also contains tools that were previously packaged with the Galaxy distribution, but have now been [migrated](/toolshed/migrating-tools-from-galaxy-distribution/) to the ToolShed. This migration simplifies maintaining reproducibility and allows tool authors and Galaxy administrators to gain an overview of the development process and install older versions of tools.

# Common Terminology

* [*wrapper*](/toolshed/publish-tool/) or *tool definition file* - The XML file that describes to Galaxy how the underlying software works, thus allowing Galaxy to execute the software in the right way.
* [*repository*](/toolshed/repository/) - Tools in ToolShed are stored in versioned code archives. The ToolShed uses Mercurial as the platform of choice for this purpose.
* [*utility*](/toolshed/galaxy-utilities-in-repositories/) - Any component that can be uploaded to the ToolShed and installed into other Galaxy instances for general or specific analyses.
* [*workflow*](/toolshed/workflow-sharing/) - A JSON file describing steps in an analysis, which can be used to reproduce the analysis on another Galaxy instance.

# Installing Tools into Galaxy

The main goal of the ToolShed is to allow populating any Galaxy with utilities such as tools, datatypes, workflows, and more. For this you don't even need to know much about the ToolShed. A basic installation of a tool into Galaxy is described in the [Add Tool Tutorial](/admin/tools/add-tool-from-toolshed-tutorial/). For more in-depth explanation of how to install and manage tools please see the [ToolShed Repositories in a Galaxy Environment](/installing-repositories/) article.

# Publishing to the ToolShed

There are over 80 [public Galaxy servers](/use/) and hundreds of private ones. If you would like to share a Galaxy utility that you've developed with the Galaxy community, we encourage you to publish it in the ToolShed.

We assume you have your tool developed, tested, and already working in your local Galaxy instance. If you don't, please see the following resources:

* Create Galaxy tools [tutorial](/admin/tools/add-tool-tutorial/)
* Create histogram tool [tutorial](/admin/tools/adding-tools/)
* Writing tools with [Planemo](http://planemo.readthedocs.io/en/latest/writing_standalone.html)

To publish a tool you need to take the following steps:
* Create an account in the ToolShed.
* Create a repository.
* Upload your tool to the repository.

The full process is described in detail on the [Publish Tool](/toolshed/publish-tool/) page.

# Basic Topics

* [Readme Files](/toolshed/readme-files/)
* [Repository Contents](/toolshed/repository-contents/)
* [Tool Dependency Recipes](/toolshed/tool-dependency-recipes/)
* [Repository Features](/toolshed/repository-features/)
* [Searching The ToolShed](/toolshed/searching-the-toolshed/)

# Advanced Topics

* [Hosting a Local ToolShed](/toolshed/hosting-a-local-toolshed/)
* [Advanced Repository Features](/toolshed/advanced-repository-features/)
* [Advanced Topics](/toolshed/advanced-topics/)
