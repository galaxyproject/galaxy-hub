<div class='center'><a href='http://toolshed.g2.bx.psu.edu'><img src="/src/Images/Logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a></div>

# Repairing installed tool shed repositories

One of the features available for repositories installed into Galaxy is the ability to repair the repository and it's dependency hierarchy.  Repairing a repository hierarchy will attempt to ensure all repositories in the hierarchy are correctly installed and all tool dependencies defined for each repository in the hierarchy are correctly installed.

This feature resets and reinstalls repositories or tool dependencies that resulted in installation or compilation errors as described in the [Handling repository installation errors](/src/ToolShed/InstallingRepositoriesToGalaxy/index.md#handling_repository_installation_errors) page as well as repositories or tool dependencies that have been uninstalled for some reason.

To repair a repository, select the **Repair repository** option in the selected repository's **Repository Actions** pop-up menu within the browser.  You can also use the enhanced Galaxy API with a command like the following from the ~/scripts/api directory.  See [The tool shed API page](/src/ToolShedApi/index.md) for additional details.

```
python ./repair_tool_shed_repository.py --api <Galaxy admin API key> -l http://localhost:8763 --url http://localhost:9009/ -o test -r 1018e3cee313 --name chemicaltoolbox
```


For example, let's assume that at some point we installed the **chemicaltoolbox** repository into our Galaxy instance, but later we uninstalled one of it's repository dependencies, the **chemfp**repository.  Visiting the installed **chemicaltoolbox** repository's **Manage repository** page will display the following information.

![](/src/RepairingInstalledRepositories/manage_chemicaltoolbox.png)

Selecting the **Repair repository** option from the **Repository Actions** pop-up menu will display the following page.  Since dependencies may need to be installed in a specified order (see the [Defining repository dependencies](/src/DefiningRepositoryDependencies/index.md#repository_dependencies_defining_additional_required_repositories_and_repository_contents) page for details), the page displays the ordered list of repositories that will be inspected and repaired if necessary.

![](/src/RepairingInstalledRepositories/repair_chemicaltoolbox.png)

Clicking the **Repair** button on the page above will inspect each repository and it's tool dependencies, reset anything that is in error, and install everything in the specified order.  The following page will be displayed as the repository hierarchy is being repaired.

![](/src/RepairingInstalledRepositories/repaired_chemicaltoolbox.png)


When the process is completed, visiting the **chemicaltoolbox** repository's **Manage repository** page will now show that none of it's dependencies are missing.

![](/src/RepairingInstalledRepositories/manage_repaired_chemicaltoolbox.png)
