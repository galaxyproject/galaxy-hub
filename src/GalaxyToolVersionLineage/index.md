<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src="/src/Images/Logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a> </div>

# Galaxy Tool Version Lineage

When included in the Galaxy code distribution, tools are defined by "id" and "version", among other attributes. For example, the filter tool has id="Filter1" and version="1.1.0". When installed from a tool shed, the tool's id becomes it's "guid" attribute from the tool shed. If it is migrated from the Galaxy distribution to the tool shed, the filter tool will have the guid "toolshed.g2.bx.psu.edu/repos/devteam/filter/Filter1/1.1.0". To provide backward compatibility for Galaxy workflows and the rerun button in a Galaxy history item, a mapping between the tool's old id and version and it's new id (guid) is provided by building a chain of relationships between tool versions. This happens automatically for every tool that is loaded into your Galaxy instance.

For example, suppose we ran a job in our local Galaxy instance using the filter tool (version 1.1.0) which is currently available in the Galaxy distribution. At some point after we ran this job, the filter tool was eliminated from the Galaxy distribution and moved to the Galaxy tool shed. Tools always retain the same version when moved to the tool shed, so even though the tool's id value changes (to the tool shed guid value) when installed from the tool shed, the tool/version combination is always found.

In our example, however, suppose that over time the tool was updated in the tool shed and associated with a new version, 1.0.1. We then updated our Galaxy instance with the release that eliminated the filter tool from the distribution, installing the new version of the filter tool in the process. Clicking the rerun button on our history item that used the original filter tool will display the following message when the new version of the filter tool is displayed for us to execute.

![](/src/GalaxyToolVersionLineage/filter_tool_new_version.png)

Suppose that over time yet another version of the filter tool was uploaded to the tool shed, and we've installed both new versions of the tool into our local Galaxy instance. Attempting to rerun the job now produces the following message and a list of the tool ids associated with each derivation of the filter tool that we have available. Selecting a different tool id will refresh the tool form, allowing us to rerun the original job using the selected version of the tool.

![](/src/GalaxyToolVersionLineage/filter_tool_multiple_versions.png)

If a Galaxy workflow was built using a tool from the Galaxy distribution, the workflow defines the tool by its "id" attribute (in the future the tool version may also be used by the workflow to further define the tool). Similar to the rerun button, if the tool was eliminated from the Galaxy distribution after the workflow was developed and the tool is installed from the main Galaxy tool shed, the workflow will locate the correct tool using this mapping process.

To view the version relationships for each of the tools in your Galaxy instance, click the **Tool versions** link in the **Server** section of the Galaxy **Administration** menu.

![](/src/GalaxyToolVersionLineage/tool_versions.png)
