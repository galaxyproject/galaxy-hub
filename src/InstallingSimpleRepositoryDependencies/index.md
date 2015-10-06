<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy Main Tool Shed' height="174" /></a> </div>

# Installing repositories that include simple repository dependency definitions

When the emboss_5 repository is installed into Galaxy, the emboss_datatypes repository will be automatically installed along with it if the Galaxy administrator elects to do so.  Let's see how this works.

The following page shows a Galaxy administrator browsing the main Galaxy Tool Shed to locate and install the **emboss_5** repository.

![](/browse_tool_shed.png)

Clicking the **Preview and install** pop-up menu item displays the following page.  Notice the sections of this page: **Dependencies of this repository** and **Contents of this repository**.

![](/install_emboss.png)

The **Dependencies of this repository** section in the above page includes two containers; Repository dependencies and Tool dependencies.  The Repository dependencies container shows that the **emboss_5** repository is dependent upon revision **a89163f31369** of the **emboss_datatypes** repository owned by **devteam**.  This dependency relationship is defined in the **repository_dependencies.xml** file discussed above and implies that the contents of the **emboss_5** repository (the Emboss 5.0.0 tools in this case) will not function correctly when installed into Galaxy if the specified revision of the **emboss_datatypes** repository is not installed as well.

Clicking the **Install to local Galaxy** button in the page above displays the following page.  Notice that you can elect to handle either repository dependencies and/or tool dependencies when installing the repository.  For this example we'll elect to handle both.

![](/confirm_dependency_installation.png)

Clicking the **Install** button on the page above displays the following page.  Here, not only is the **emboss_5** repository being installed, but the **emboss_datatypes** repository is being installed as well.

![](/installing_emboss.png)

After both the **emboss_5** and the **emboss_datatypes** repositories have completed their installation, the **Monitor installing Tool Shed repositories** page is automatically updated with the following status.

![](/emboss_and_emboss_datatypes_installed.png)

Clicking the **emboss_5**repository from the page displayed when you click the **Manage installed Tool Shed repositories** option in the **Administration** menu will display the following page.  Notice that a link is available to the defined repository dependency, the **emboss_datatypes** repository.

![](/manage_emboss_5.png)

What happens if we uninstall the repository dependency?

![](/uninstall_emboss_datatypes.png)

Uninstalling the **emboss_datatypes** repository results in the dependent **emboss_5** repository being displayed with a new status.  Of course, the **emboss_datatypes** repository can be reinstalled at any time.

![](/emboss_5_missing_dependencies.png)

What are some of the benefits that simple repository dependencies provide?  In some cases multiple tools are not intended to provide meaningful analyses on their own, but are designed to function with other tools, perhaps in a suite.  In these cases, simple repository dependency definitions provide the ability to define a suite of repositories that will be installed by installing the single repository that contains only the **repository_dependencies.xml** file.  Repositories like this are called **Repository suite definitions**.  Each of the required repositories could contain a single tool, allowing a Galaxy administrator to install each tool separately.  If the administrator chooses to install the Repository suite definition, each separate repository would be automatically installed, providing the entire suite of tools with the single installation.
