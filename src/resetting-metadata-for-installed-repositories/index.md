<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src="/src/images/logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a> </div>

# Resetting metadata for tool shed repositories installed in Galaxy

When a tool shed repository is installed into your local Galaxy instance, metadata is generated for the repository as a part of the installation process and stored in the **tool_shed_repository.metadata** table column in the Galaxy database.  This automatic process inspects the contents of the specific revision of the installed repository and generates and stores important information about it.  This metadata information is used by certain Galaxy features.

As new features are added to Galaxy or the tool shed, the process that generates this installed tool shed repository metadata within the Galaxy instance may be enhanced to accommodate information about the new features.  When this happens, the Galaxy Distribution News Brief will include a section advising you to regenerate the metadata for your installed repositories.  This will not be a usual requirement, but will only be advised for certain distribution updates.  Of course, doing this is optional (things should still work even if you don't), but it would be "good practice" to do so when advised.  Also, regenerating the metadata for your installed tool shed repositories can be done as often as you want - it is considered "safe" to do this.

Metadata for installed tool shed repositories cannot be regenerated automatically when you update your Galaxy instance to a new distribution release.  The manual process is very simple though.  Let's take a look at how it is done.

The Galaxy administrator menu item for performing this task is labeled **Reset metadata for tool shed repositories**.  When clicked, a page like the following will be displayed.  You can use the **Select/unselect all repositories** check box to easily select all repositories to regenerate metadata, or you can select specific repositories.

![](/src/resetting-metadata-for-installed-repositories/reset_metadata_page.png)

Clicking the **Reset metadata on selected repositories** button will use the current process to generate and store the information about the contents of each of your installed repositories.  This process may take a bit of time if you have a lot of repositories installed into your Galaxy instance.  The process for regenerating metadata is not ajaxian, so wait until the page redirects.  When the process has completed, you should see a page that looks something like this.

![](/src/resetting-metadata-for-installed-repositories/metadata_reset.png)
