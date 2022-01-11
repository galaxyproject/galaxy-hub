---
title: Galaxy for Tool Developers
---

<img src="/images/undraw-illustrations/workflow.svg" alt="workflow" style="width:230px; float:right;"/>

Every Galaxy is much defined by its tools. You can either use them as a user, install them as an admin, or contribute to the community by writing tools or preparing them for use with Galaxy as a tool developer.

## Common Terminology

* __Wrapper__ or __tool definition file:__ The XML file that describes to Galaxy how the underlying software works, thus allowing Galaxy to execute the software in the right way.
* __ToolShed repository:__ Tools in ToolShed are stored in versioned code archives. The ToolShed uses Mercurial as the platform of choice for this purpose.
* __Utility:__ Any component that can be uploaded to the ToolShed and installed into other Galaxy instances for general or specific analyses.
* __Workflow file:__ A JSON file describing steps in an analysis, which can be used to reproduce the analysis on another Galaxy instance.
* __IUC:__ Intergalactic Utilities Commission [(read more)](/iuc/).


## Writing tools

Tools are written in XML language following the **[Galaxy tool schema](https://docs.galaxyproject.org/en/master/dev/schema.html)**. We encourage you to submit your finished tools to the [Tool Shed](/toolshed/).

Please use [Planemo](http://planemo.readthedocs.io/) for both tool development ([see the documentation](http://planemo.readthedocs.io/en/latest/writing_standalone.html)) and [publishing](http://planemo.readthedocs.io/en/latest/publishing.html) to the Tool Shed. We **heartily recommend** you use it together with the [best practices](http://galaxy-iuc-standards.readthedocs.io/en/latest/best_practices.html) for Galaxy tool development by the [IUC](/iuc/). The IUC also provides tool developers with advice and guidance.

## Need help?

- Find [support](/support/)
- [Search all Galaxy resources](/search/)

