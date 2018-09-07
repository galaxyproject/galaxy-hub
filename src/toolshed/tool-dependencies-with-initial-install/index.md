## Installing tool dependencies as part of the initial installation of the repository

Let's assume we chose to skip the tool migration process for the freebayes repository described above, so the freebayes tool is not available in our Galaxy instance. To install the freebayes repository, we'll select the **Search and browse tool sheds** option from the **Admin** menu.

![](/src/toolshed/tool-dependencies-with-initial-install/browse_tool_sheds.png)

We'll select the Galaxy main tool shed and search for the freebayes repository.

![](/src/toolshed/tool-dependencies-with-initial-install/search_freebayes.png)

When the freebayes repository is displayed, we'll use it's pop-up menu to preview it and install it into our local Galaxy instance.

![](/src/toolshed/tool-dependencies-with-initial-install/preview_freebayes.png)

In previewing the freebayes repository we can see that this repository includes information for installing it's tool dependencies, so we have the option of installing them along with the repository.

![](/src/toolshed/tool-dependencies-with-initial-install/freebayes_dependencies.png)

Clicking the **Install to local Galaxy** button displays the following page. The first section provides all of the information about the dependencies that have been defined for the tools in the repository. Notice that dependencies may require their own build requirements (e.g., CMake, g++, etc), and Galaxy will not attempt to install these build requirements.
If the dependency installation fails, you can view the installation logs to find the cause of the failure. Most likely it will be a missing build requirement in your server environment. You can install the missing requirement, uninstall the dependency and attempt to install it again. You need to uninstall the dependency before attempting to reinstall it to ensure the installation environment is pristine before installation.

You can leave the check box checked to install the tool dependencies, or uncheck it to skip dependency installation. You can install the dependencies any time after the repository has been installed.

We'll uncheck the check box to show what happens.

![](/src/toolshed/tool-dependencies-with-initial-install/install_freebayes_dependencies.png)

Skipping tool dependency installation when installing the freebayes repository results in the following page. Notice that the Status is **Installed**, but the box is highlighted in grey instead of green. This is because the dependencies are missing.

![](/src/toolshed/tool-dependencies-with-initial-install/missing_freebayes_dependencies.png)

Clicking on the freebayes repository name in the page above will display the following page, where we can see that the dependencies have never been installed. You can install them at any point, or perhaps you will decide to never install them because you have them installed somewhere in your server environment where the freebayes Galaxy tool will find them. This was the process Galaxy used in the past for handling tool dependencies. However, be aware that if you do not install tool dependencies along with the repository, you will not be taking advantage of Galaxy's ability to ensure reproducible analyses over time for the tools.

![](/src/toolshed/tool-dependencies-with-initial-install/freebayes_dependencies_never_installed.png)
