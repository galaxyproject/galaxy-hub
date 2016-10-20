<div class='right'> 
![Tool Shed logo](/src/Images/Logos/ToolShed.jpg)
PLACEHOLDER_INCLUDE(/src/ToolShed/LinkBox/index.md)  
</div>

# Installing Tool Shed Repositories into a Local Galaxy

The process for installing repositories that include tools from a tool shed into a local Galaxy instance includes automated features that provide several benefits:

* Virtual one-click tool installation for tools with no dependencies (or whose dependencies are already available in the Galaxy environment's path).
* New installed tools are loaded into a specified Galaxy tool panel section and can be used immediately without restarting the Galaxy server.
* Different versions of the same tool can be simultaneously used in the same Galaxy instance, streamlining the enablement of reproducible analyses over time.

With regard to tool dependencies, Galaxy tools fall into three categories; tools with no dependencies, tools that include dynamically generated selected lists whose options depend upon entries in the tool_data_table_conf.xml file along with references to index files (i.e., tool-data/xxx.loc files), and tools that include 3rd party dependencies. At the current time, tools that fall into the first category can be automatically installed with no manual user intervention. However, index files must still be made available to tools that require them, and 3rd party tool dependencies must still be installed manually in such a way that Galaxy can find them on its environment path. In the future, index files and 3rd party dependencies will be automatically installed if functional Python fabric scripts are included in the the tool shed repository along with the tools.

In providing this feature, multiple Galaxy tool panel configuration files are now supported rather than just one. In the past, the following 2 settings in the Galaxy config (*universe_wsgi.ini* or more *recently galaxy.ini*) allowed for a single file (tool_conf.xml) to render the Galaxy tool panel and a single directory location (tools) to contain the tool files.

```
# Tool config file, defines what tools are available in Galaxy.
tool_config_file = tool_conf.xml
# Path to the directory containing the tools defined in the config.
tool_path = tools
```

The "tool_config_file" setting has now been enhanced to allow for any number of files by using a comma-separated list of file names. For backward compatibility the "tool_path" setting remains the same and still points to the tools whose links will be rendered in the Galaxy tool panel by parsing the tool_conf.xml file.

```
# Locally installed tools and tools installed from tool sheds
tool_config_file = tool_conf.xml,shed_tool_conf.xml
tool_path = tools
```


Any "tool panel config" files in addition to the original "tool_conf.xml" should only be used to contain information about tools automatically installed from a Galaxy tool shed. Here is the "shed_tool_conf.xml.sample" file included in the Galaxy distribution. Notice that it includes a "tool_path" attribute in the <toolbox> tag. This attribute is similar to the "tool_path" setting in the Galaxy config described above, but its value should be a location different from your default Galaxy tool directory.

```xml
<?xml version="1.0"?>
<toolbox tool_path="../shed_tools">
</toolbox>
```


The directory to which the "tool_path" attribute in the <toolbox> tag above points **must be outside of the main Galaxy installation root directory, or it must be in a subdirectory protected by a properly configured .hgignore file if the directory is within the Galaxy installation directory hierarchy**. This is because tool shed repositories that are automatically installed will be placed within this directory using mercurial's repository clone feature which creates .hg directories and associated mercurial repository files. Not having .hgignore properly configured could result in undesired behavior when modifying or updating your local Galaxy instance or the tool shed repositories if they are in directories that pose conflicts. See [mercurial's .hgignore documentation](http://mercurial.selenic.com/wiki/.hgignore) for details.

Another important point to convey before we proceed is that these new "shed_tool_conf.xml" files are modified in real time when you automatically install tools from a Galaxy tool shed. You can manually edit the files if you want, but doing so is not necessary, and may result in undesired behavior if incorrectly altered.

Tool shed repositories that contain tools that include dynamically generated select list parameters that refer to an entry in the tool_data_table_conf.xml file must contain a tool_data_table_conf.xml.sample file that contains the required entry for each dynamic parameter. Similarly, any index files (i.e., ~/tool-data/xxx.loc files) to which the tool_data_table_conf.xml file entries refer must be defined in xxx.loc.sample files included in the tool shed repository along with the tools. If any of these tool_data_table_conf.xml entries or any of the required xxx.loc.sample files are missing from the tool shed repository, the tools will not properly load and metadata will not be generated for the repository. **This means that the tools cannot be automatically installed into a Galaxy instance.**

For those tools that include dynamically generated select list parameters that require a missing entry in the tool_data_table_conf.xml file, this file will be modified in real time by adding the entry from a tool_data_table_conf.xml.sample file contained in the tool shed repository.

Assume we're logged in as an "admin" user to a Galaxy instance whose tool panel looks like the panel in the following screen shot. Notice that the **Filter and Sort** tool panel section includes 2 tools, "Sort data in ascending or descending order" and "Select lines that match an expression". We want to install the filter tool that we uploaded to the Galaxy tool shed in previous sections of this document.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/galaxy_home.png)

Clicking the **Admin** link in the top Galaxy tool panel displays the Galaxy Administration interface. Notice the sections in the blue left menu panel. We'll be taking a look at the **Tool sheds** section where we have the option to **Search and browse tool sheds**.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/galaxy_admin_home.png)

Clicking the **Search and browse tool sheds** link displays the **Accessible Galaxy tool sheds** page. These links to the various tool sheds are defined in the tool_sheds_conf.xml file in the Galaxy installation directory.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/accessible_tool_sheds.png)

The file that produces the links to the 3 tool sheds shown in the page above looks like this:

```xml
<?xml version="1.0"?>
<tool_sheds>
    <tool_shed name="Bx tool shed" url="http://someserver.bx.psu.edu:9009/"/>
    <tool_shed name="Galaxy main tool shed" url="http://toolshed.g2.bx.psu.edu/"/>
    <tool_shed name="Galaxy test tool shed" url="http://testtoolshed.g2.bx.psu.edu/"/>
</tool_sheds>
```


Each tool shed link includes a pop-up menu that allows you to browse valid repositories or search for tools or workflows. See the **Search repositories for valid tools by any combination of id, name or version** and the **Search repositories for workflows by name** topic sections above for details about each of these respective features.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/tool_shed_popup.png)

Clicking the Galaxy main tool shed link (the same feature as the **Browse valid repositories** option in the tool shed pop-up menu) displays tool repositories from the main production tool shed hosted at Penn State University. The list of repositories is filtered so that only repositories considered "valid" are displayed. A repository is valid if it has at least 1 set of repository metadata. See the **Repository revisions: uploading a new version of an existing tool** topic section above for details about repository metadata.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/main_tool_shed.png)

In previous sections of this document we uploaded our filter tool to our Bx tool shed, so we'll click the link to that tool shed in the **Accessible Galaxy tool sheds** page to browse for the tool. Locating our filter tool is easy since our Bx tool shed currently contains only the single repository.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/bx_tool_shed.png)

Clicking the pop-up menu next to the repository name enables us to preview and install our filter tool.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/preview_and_install.png)

Clicking the **Preview and install** option from the pop-up menu in the screen shot above displays the following page. Notice that this page looks similar to the same-titled section of the **View repository** and **Manage repository** pages described in previous sections of this document. Here you can preview the tool and inspect its metadata in the same way that you can on those pages. The **Revision** field on this page is also similar in that it becomes a select field when more than 1 repository revision is associated with a repository metadata record.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/install_filter_tool.png)

Clicking the **Install to local Galaxy** button in the upper right corner of the above page displays the following page. Note the warnings on this page, they're both very important! This page allows us to select the section of our Galaxy tool panel where we want the installed filter tool to be located. We'll select the **Filter and Sort** tool panel section and click the **Install** button.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/select_tool_panel_section.png)

After clicking the **Install** button and waiting for the tool installation to finish, we are presented with the following message.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/tool_installed.png)

Clicking the **Analyze Data** option in the top Galaxy too menu and then checking the **Filter and Sort** tool panel section shows us that our tool is loaded and ready to use.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/filter_tool_installed.png)

Now that the tool is installed, lets take a look at the shed_tool_conf.xml file. It now looks something like the following. Notice that the tool files were installed in the relative directory "../shed_tools/gvk.bx.psu.edu/repos/greg/filter/897bb218d0cf/filter" and that the tool's **guid** attribute is "gvk.bx.psu.edu:9009/repos/greg/filter/Filter1/1.0.1".

All tools that are installed from a Galaxy tool shed in the way just presented in this section will have a **guid** attribute and value like this. When this tool is executed in the Galaxy instance in which it was installed, the value of this guid becomes the tool id. This is how tools with the same tool **id** (e.g., "Filter1" in this case since the installed filtering.xml file's tool tag is `<tool id="Filter1" name="Filter" version="1.0.1">`) from different repositories or with different versions can be simultaneously loaded and executed in the same Galaxy instance.

```xml
<?xml version="1.0"?>
<toolbox tool_path="../shed_tools">
    <section name="Filter and Sort" id="filter">
        <tool file="localhost/repos/greg/filter/10456b4659aa/filter/filtering.xml" guid="localhost:9009/repos/greg/filter/Filter1/1.0.1">
            <tool_shed>localhost:9009</tool_shed>
            <repository_name>filter</repository_name>
            <repository_owner>greg</repository_owner>
            <changeset_revision>10456b4659aa</changeset_revision>
            <id>Filter1</id>
            <version>1.0.1</version>
        </tool>
    </section>
</toolbox>
```


# Automatic third-party tool dependency installation and compilation with installed repositories

See this [related page](http://wiki.galaxyproject.org/ToolShedToolFeatures#Automatic_third-party_tool_dependency_installation_and_compilation_with_installed_repositories).

# Installing Galaxy tool shed repository data types into a local Galaxy instance

To demonstrate how data types included in installed tool shed repositories are handled by Galaxy, assume we're the administrator for a Galaxy instance where all of the Emboss datatypes have been removed from the **datatypes_conf.xml** file.
Let's take a look at what happens when we install the **emboss_datatypes** repository from the main Galaxy tool shed into our local Galaxy instance.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/install_emboss_datatypes.png)
Since the **emboss_datatypes** repository does not include any tools, selecting a tool panel section is not necessary.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/installed_emboss_datatypes.png)
Inspecting the paster log during the installation confirms that after the repository was installed, all of the included Emboss data types were loaded into our local Galaxy instance's datatypes registry.

```
galaxy.util.shed_util DEBUG 2012-01-03 13:52:53,665 Installing repository 'emboss_datatypes'
...
galaxy.datatypes.registry DEBUG 2012-01-03 13:52:54,624 Loading datatypes from /Users/gvk/workspaces_2008/shed_tools/toolshed.g2.bx.psu.edu/repos/devteam/emboss_datatypes/a89163f31369/emboss_datatypes/datatypes_conf.xml
```


The paster log above shows that the data types installed with the **emboss_datatypes** repository are available in the Galaxy server session in which they were installed. But what happens when we stop and restart the sever? Let's inspect some snippets of the paster log from our local Galaxy server when we stop and restart it.

```
galaxy.jobs INFO 2012-01-03 14:23:33,558 job stopper stopped
...
$ sh run.sh
...
galaxy.datatypes.registry DEBUG 2012-01-03 14:23:40,228 Loading datatypes from datatypes_conf.xml
...
galaxy.tools INFO 2012-01-03 14:23:40,798 parsing the tool configuration ./shed_tool_conf.xml
galaxy.datatypes.registry DEBUG 2012-01-03 14:23:41,106 Loading datatypes from /Users/gvk/workspaces_2008/shed_tools/toolshed.g2.bx.psu.edu/repos/devteam/emboss_datatypes/a89163f31369/emboss_datatypes/datatypes_conf.xml
```


You can see from the above paster log snippets that the data types installed with the **emboss_datatypes** repository are loaded whenever the Galaxy server is started. Galaxy data types correctly included in any installed repository will be similarly loaded, both when the repository is installed from the tool shed and when the Galaxy server is stopped and restarted at any point after the repository was installed.

What about conflicts? What happens if we have a data type defined in our local Galaxy instance's **datatypes_conf.xml** file, and we install a tool shed repository that includes the very same data type (but perhaps with a different class definition)? Precedence is given to the data type that was loaded first. The order in which data types are loaded is:

1. Data types defined in the local **datatypes_conf.xml** file which is parsed and loaded top to bottom by the Galaxy server.2. Data types defined in each installed tool shed repository where precedence is given to installation times oldest to newest.

To demonstrate this, let's add the **acedb** Emboss datatype back into our local Galaxy instance's **datatypes_conf.xml** file.

```xml
<datatype extension="acedb" type="galaxy.datatypes.data:Text" subclass="True"/>
```


Stopping and restarting our Galaxy server provides the following information in the paster log. You can see that the datatype contained within the installed **emboss_datatypes** tool shed repository with the extension **acedb** was ignored because it had previously been loaded due to its definition in the **datatypes_conf.xml** file.

```
galaxy.datatypes.registry DEBUG 2012-01-03 14:40:14,403 Loading datatypes from datatypes_conf.xml
...
galaxy.datatypes.registry DEBUG 2012-01-03 14:40:15,563 Loading datatypes from /Users/gvk/workspaces_2008/shed_tools/toolshed.g2.bx.psu.edu/repos/devteam/emboss_datatypes/a89163f31369/emboss_datatypes/datatypes_conf.xml
galaxy.datatypes.registry DEBUG 2012-01-03 14:40:15,564 Ignoring datatype with extension 'acedb' from '/Users/gvk/workspaces_2008/shed_tools/toolshed.g2.bx.psu.edu/repos/devteam/emboss_datatypes/a89163f31369/emboss_datatypes/datatypes_conf.xml' because the registry already includes a datatype with that extension.
```


Galaxy administrators should pay close attention to the potential conflicts that will arise when tool shed repositories that include data types are installed into local Galaxy instances. If conflicts result, the data types to which the local instance has access may not be what is expected by the users.

# Installing repositories that include simple repository dependency definitions

See this [related page](http://wiki.galaxyproject.org/DefiningRepositoryDependencies#Installing_repositories_that_include_simple_repository_dependency_definitions).

# Installing repositories that include complex repository dependency definitions

See this [related page](http://wiki.galaxyproject.org/DefiningRepositoryDependencies#Installing_repositories_that_include_complex_repository_dependency_definitions).

# Handling repository installation errors

In some cases installing a repository into a Galaxy instance may result in errors.  When this happens the repository's status attribute will be set to an error state, and the repository will be displayed similar to the example shown in the following page.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/filter_installation_error.png)

Clicking on the link associated with the name of repositories in an error state will display a page like the following, along with an error message.  The error displayed under the label **Repository installation error:** on this page should be sufficient information to enable resolving the problem that occurred during installation (most likely a problem in the Galaxy file system environment, a network problem etc).  When the problem is resolved, select the **Reset to install** option in the repository's popup menu.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/reset_to_install_popup.png)

When the **Reset to install** option is selected, the repository's installation directory on disk is cleaned up, certain repository attributes are reset, and the status of the repository is set to 'New' as shown in the page below.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/repository_state_reset_to_new.png)

At this point the repository's pop-up menu includes an option to install the repository.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/install_popup.png)

If the problem was resolved, you should now be able to successfully install the repository.

![](/src/ToolShed/InstallingRepositoriesToGalaxy/installed_successfully.png)
