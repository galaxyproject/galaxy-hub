<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src="/src/images/Logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a> </div>

# Getting updates for tool shed repositories installed in a local Galaxy instance

Galaxy can be configured to automatically poll appropriate Galaxy tool sheds to retrieve the current status for any of your installed tool shed repositories. To enable this feature set the value of the following config settings in **config/galaxy.ini**. Tools sheds will be polled when your Galaxy server is started or when the configured number of hours have passed since your Galaxy server was started or since the last poll occurred if your Galaxy server has been running for some time since it was restarted.

```
# Enable automatic polling of relative tool sheds to see if any updates
# are available for installed repositories. Ideally only one Galaxy
# server process should be able to check for repository updates. The
# setting for hours_between_check should be an integer between 1 and 24.
enable_tool_shed_check = True
hours_between_check = 12
```


The current status for each of the following categories is determined for each installed repository.  Some repositories may have more than one status category associated with them.  Each of these status categories is associated with an icon that can be moused-over to view the status text.

* Updates are available in the Tool Shed for this revision
* A newer installable revision is available for this repository
* This is the latest installable revision of this repository
* This repository is deprecated in the Tool Shed
* This repository contains exported workflows
* Unable to get information from the Tool Shed

If you have one or more Galaxy tool shed repositories installed into your local Galaxy instance, you'll see a menu option in the **Server** section of your **Administration** menu labeled **Manage installed tool shed repositories**.

<img src="/src/UpdatingInstalledRepositories/admin_menu_manage_installed.png" alt="" height="494" />

Selecting the **Manage installed tool shed repositories** menu item will display a list of all of the repositories that have been installed from any Galaxy tool shed into your Galaxy instance. The page below shows that we have installed four repositories; the bam_to_bigwig repository from the Galaxy test tool shed, the blast2go and blast_datatypes repositories from the Galaxy main too shed and the filter repository that we installed from our local tool shed.  We can get the latest status from the tool shed for each of these repositories using any of the following methods:

* Use the **Update tool shed status** button in the upper right corner of the page to retrieve the current status for all installed repositories.
* Use the **Update tool shed status** option in the pop-up menu associated with a specific repository to retrieve the current status from the tool shed for only that repository.
* If the time defined by the **hours_between_check** config setting in our config/galaxy.ini file have passed, our Galaxy server will poll the appropriate tool shed and update it's database record with the latest status.

![](/src/UpdatingInstalledRepositories/tool_shed_repositories.png)

Let's assume that after we've installed the filter repository from our local tool shed, changes were made to the repository in the tool shed that did not result in a new installable revision.  Now when we select the **Update tool shed status** option in the pop-up menu associated with the filter repository installed into our Galaxy instance, we'll see an additional icon associated with the repository telling us there are updates available in the tool shed for that revision.

![](/src/UpdatingInstalledRepositories/updates_available.png)

Updates can be retrieved for the installed repository by selecting the new **Get updates** item that was included in the pop-up menu for the repository when the status from the Tool Shed included that status category.

![](/src/UpdatingInstalledRepositories/get_updates.png)

When visiting the **Manage repository** page for the filter repository, the **Repository Actions** pop-up menu provides another **Get repository updates** option to get new updates that are available from the Tool Shed.

A very important point to convey here is that updates retrieved from the Tool Shed will be restricted to those that are associated with the current installable revision of the repository. Remember that the repository revision values are a number followed by a **:** and an alpha-numeric string (e.g., 6**:**98d05121d41e). 

Let's assume that at some point you installed revision 0:sdj45ger5fr4 of a repository into your Galaxy instance. Then at some later point the related repository in the Tool Shed was updated with revision 1:si88rhjk8hfh. Then even later the same repository in the Tool Shed was updated to a new revision number, say 2:srjls89ojf8e.  Let's assume that this latest change resulted in a new installable revision for the repository in the Tool Shed because the version of one or more tools within the repository changed. 

If you updated your installed repository after these changes to the repository within the Tool Shed were made, your installed repository would be updated to revision 1:si88rhjk8hfh, but would not be updated to include the change in revision 2:srjls89ojf8e. Since revision 2:srjls89ojf8e includes tools that have different versions, you have to install that revision into your Galaxy instance as a separate repository installation if you want to use the new versions of the tools.

![](/src/UpdatingInstalledRepositories/manage_repository_popup.png)

One approach for keeping track of when you should update your installed repositories is to check the **Receive email alerts** checkbox in the relevant Galaxy tool shed for each of your installed repositories so that you'll get an email message letting you know there may be updates you want to apply.
