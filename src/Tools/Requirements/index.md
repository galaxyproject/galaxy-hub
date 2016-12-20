{{> Admin/Tools/LinkBox }}
# Tool Requirements

A Galaxy tool can require other pieces of software in order to do its job. This does not mean that you as the Galaxy user need to do something.

The tool developers specify these requirements within the [tool definition](/src/Admin/Tools/ToolConfigSyntax/index.md#a3crequirements3e_tag_set). These requirements along with their specified versions are visible to the user in the Galaxy UI when looking at the tool form for **informational purposes**.

It is important to understand that the actual version of the tool that will be run after you hit *Execute* on the tool form depends on the configuration of the Galaxy instance and its environment. To be sure what version of the software was actually run you have to check the output dataset in the history - many tools will include the exact version of the software that was run there. 

An example of requirements version information:
![](/src/Tools/Requirements/requirement_versions.png)
