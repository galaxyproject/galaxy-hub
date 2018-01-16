---
title: Galaxy Utilities
---
<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'>![Galaxy Main Tool Shed](/src/images/logos/ToolShed.jpg)</a> </div>


## Tools

A [Galaxy tool](/src/toolshed/tool-features/index.md) is any software package that takes any number of inputs and produces one or more outputs, e.g. BWA. Galaxy tools are versioned, and it should not be expected that different versions should produce the same output given the same input(s) and parameter(s). It should however be expected that a Galaxy tool always produce the same output every time it is run with the same input data and parameters. In the [main Galaxy ToolShed](https://toolshed.g2.bx.psu.edu), tools are reviewed by the [Intergalactic Utilities Commission](/src/iuc/index.md).

## Tool Development

[Developing Galaxy Tools for the ToolShed](/src/toolshed/tool-features/index.md) can be as simple as creating a wrapper XML file compliant with the (**[Galaxy tool schema](https://docs.galaxyproject.org/en/master/dev/schema.html)**) and [uploading this XML](/src/toolshed/publish-tool/index.md) to the ToolShed. A tool developer can also optionally include [custom datatypes](/src/toolshed/datatypes-features/index.md), and should ideally include a [README](/src/toolshed/readme-files/index.md) briefly explaining the function and purpose of their tool.

## Workflows

Galaxy [workflows](/src/toolshed/workflow-sharing/index.md) allow a Galaxy user to share their analysis with others, so that the original research can be easily reproduced. This can be done with the original data from the researcher's paper, or the workflow can be given new data.
