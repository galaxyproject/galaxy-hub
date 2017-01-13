<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src="/src/images/Logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a> </div>

# Deactivating and uninstalling tool shed repositories installed into a local Galaxy instance

Those hosting their own Galaxy instances may find it useful to use tools contained in an installed tool shed repository for a period of time, and then remove them from the tool panel either temporarily or permanently. To enable this, Galaxy provides the ability to deactivate or uninstall an installed tool shed repository.

Deactivating an installed tool shed repository results in the following.

* The repository and all of it's contents will remain on disk.
* Any contained tools will not be loaded into the Galaxy tool panel.
* Any contained proprietary datatypes, datatype converters and display applications will be eliminated from the datatypes registry.
* The repository record's deleted column in the tool_shed_repository database table will be set to True.

Uninstalling this repository will result in the following.

* The repository and all of it's contents will be removed from disk.
* If the repository contains tools, their tag sets will be removed from the tool config file in which they are defined.
* Any contained proprietary datatypes, datatype converters and display applications will be eliminated from the datatypes registry.
* The repository record's deleted column in the tool_shed_repository database table will be set to True.
* The repository record's uninstalled column in the tool_shed_repository database table will be set to True.
* If the repository was installed via the Galaxy install manager (this occurs when the repository contains tools that used to be available in the Galaxy distribution, but are now contained in a tool shed repository hosted on the main Galaxy tool shed), all records associated with the repository will be eliminated from the tool_id_guid_map database table.

Let's take a look at how this works. Assume you are the administrator of a local Galaxy instance that includes the following tools and tool sections in the tool panel. The **Get Data** section includes the upload tool included in the Galaxy distribution. You manually installed the **Add column** tool from a local Galaxy tool shed, placing it outside of any sections in the tool panel. The **Mothur** tool section contains the Mothur tool suite and the **two repos** tool section contains tools from two repositories that you manually installed from a local Galaxy tool shed (the **Grinder** and **Blast2GO** tools). The **EMBOSS** tool section contains the Emboss version 5.0.0 tools that used to be included in the Galaxy distribution, but are now hosted on the main Galaxy tool shed. You configured your Galaxy instance to automatically install the repository containing these tools and the repository containing the Emboss datatypes using Galaxy's new install manager.

<img src="/src/UninstallingRepositoriesFromGalaxy/local_galaxy_example.png" alt="" height="514" />

Since your Galaxy instance includes several installed tool shed repositories, the **Administration** menu wil include a link labeled **Manage installed tool shed repositories** in the menu's **Server** section. Clicking on that link will display a page like the following.

<img src="/src/UninstallingRepositoriesFromGalaxy/manage_installed_repositories.png" alt="" height="466" />

Each of the installed tool shed links includes a pop-up menu just right of the repository name (the downward pointing triangle). The pop-up menu includes an option labeled **Deactivate or uninstall**.

<img src="/src/UninstallingRepositoriesFromGalaxy/deactivate_or_uninstall.png" alt="" height="466" />

Clicking the **Deactivate or uninstall** option for the installed repository named **add_value** will display the following page. Notice the check box allowing you to deactivate the repository if its left blank or uninstall the repository if its checked.

<img src="/src/UninstallingRepositoriesFromGalaxy/deactivate_add_value.png" alt="" height="623" />

Since the **add_value** repository includes only tools and no proprietary datatypes, deactivating the repository will set the repository record's deleted column in the tool_shed_repository database table to True, and keep the tool from being displayed in the tool panel. Clicking the **Deactivate or uninstall** button will display the following page. Notice that the **add_value** repository is no longer displayed in the list of installed repositories.

<img src="/src/UninstallingRepositoriesFromGalaxy/deactivated_add_value.png" alt="" height="433" />

And the **Add column** tool is no longer displayed in the Galaxy tool panel.

<img src="/src/UninstallingRepositoriesFromGalaxy/add_value_not_displayed.png" alt="" height="433" />

Let's try uninstalling the **blast2go** repository - notice we've checked the check box here.

<img src="/src/UninstallingRepositoriesFromGalaxy/uninstall_blast2go.png" alt="" height="623" />

After uninstalling the repository, the following page is displayed. The repository files have been removed from disk, and the XML tag set for the **Blast2GO** tool has been removed from the tool config file.

<img src="/src/UninstallingRepositoriesFromGalaxy/uninstalled_blast2go.png" alt="" height="441" />

Inspecting the tool panel shows us that the **Blast2GO** tool is no longer included in the **two repos** tool section.

<img src="/src/UninstallingRepositoriesFromGalaxy/blast2go_not_displayed.png" alt="" height="441" />

How can we reinstall a repository that we've uninstalled? From the Administration **Manage installed tool shed repositories** page, click the **deleted** option within the **Advanced search** feature...

<img src="/src/UninstallingRepositoriesFromGalaxy/advanced_search.png" alt="" height="441" />

...and the list of repositories that you have deactivated or uninstalled will be displayed.

<img src="/src/UninstallingRepositoriesFromGalaxy/inactive_repositories.png" alt="" height="441" />

The pop-up menus on this page allow you to activate or reinstall the repositories.

<img src="/src/UninstallingRepositoriesFromGalaxy/activate_or_reinstall.png" alt="" height="441" />
