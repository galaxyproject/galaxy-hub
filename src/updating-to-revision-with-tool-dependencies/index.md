<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src="/src/images/Logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a> </div>

## Updating a previously installed repository to a revision that includes changes to installed tool dependencies

In most cases changing the version of a tool dependency requires a change to the dependent tool's version as well.  This ensures reproducible behavior for Galaxy instances in which the tool is installed.  However, in some cases the owner of a repository may change the version or type attribute of a tool dependency in it's definition in the repository without changing the version of the dependent tool.  Again, this should not often occur!

Let's take a look at how this is handled when the repository is installed into a Galaxy instance and the Galaxy administrator gets the updates to the repository that includes the changes to the tool dependency definition.  To start, assume we have a repository named **bwa_mappers** in a tool shed that includes two tools, **Map with BWA for SOLiD** and **Map with BWA for Illumina**.  The repository also includes a **tool_dependencies.xml** file that defines version 0.5.9 of the bwa package dependency for the 2 tools.  Previewing the tools in the repository will show something like the following.

![](/src/UpdatingToRevisionWithToolDependencies/bwa_mappers_059.png)

Let's install the repository into a Galaxy instance, electing to install the bwa version 0.5.9 package.

![](/src/UpdatingToRevisionWithToolDependencies/install_bwa_059.png)

After the repository and the defined bwa tool dependency are installed and compiled, we see that we have revision **11dc06f7649a** of the repository.

![](/src/UpdatingToRevisionWithToolDependencies/bwa_059_installed.png)

Browsing the installed tool dependencies, we see that we have version 0.5.9 of the bwa package as expected.

![](/src/UpdatingToRevisionWithToolDependencies/bwa_059_tool_dependencies.png)

Now, after some time the owner of the repository in the tool shed uploads a new tool_dependencies.xml file that includes the definition for installing version 0.6.2 of the bwa package.  Nothing else in the repository is changed so the repository change log shows only the single installable change set revision.  This means that the Galaxy administrator will be able to pull the updates (up to the new change set revision **cb68795548a6**) to the repository installed to his Galaxy instance.

![](/src/UpdatingToRevisionWithToolDependencies/bwa_changelog.png)

In fact, when we click on the **Manage installed tool shed repositories** option in out Admin menu back in our Galaxy instance, we see that there are updates available for out installed repository.

![](/src/UpdatingToRevisionWithToolDependencies/bwa_updates_available.png)

Pulling the update results in the installed repository being updated to change set revision **cb68795548a6 **.  As part of this process, the original version 0.5.9 of the bwa tool dependency package was removed from disk and the new version 0.6.2 of the bwa tool dependency package is associated with the installed tool, but marked as **Uninstalled** (tool dependencies are not automatically installed and compiled when pulling updates to installed repositories).

![](/src/UpdatingToRevisionWithToolDependencies/bwa_updates_pulled.png)

You can click the name of the uninstalled dependency to display the page to install it.

![](/src/UpdatingToRevisionWithToolDependencies/install_bwa_062.png)

After installing the dependency, we see that we now have version 0.6.2 associated with the tools in our repository.

![](/src/UpdatingToRevisionWithToolDependencies/bwa_062_installed.png)
