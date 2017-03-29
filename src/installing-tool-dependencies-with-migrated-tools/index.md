<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src='/images/logos/ToolShed.jpg' alt='Galaxy Main Tool Shed' height="174" /></a> </div>

# Installing tool dependencies along with tools migrated from the Galaxy distribution to the Galaxy Main Tool Shed

The freebayes tool has been migrated from the Galaxy distribution to the [freebayes repository](http://toolshed.g2.bx.psu.edu/view/devteam/freebayes) in the main Galaxy Tool Shed.  If you have the freebayes tool defined in your **tool_conf.xml** file, when you upgrade your local Galaxy instance to the revision that includes this migration, you'll see the following when you attempt to start your Galaxy server.  Notice the addition of the shell command option that includes the **install_dependencies** flag, enabling you to install the defined tool dependencies.

```
The list of files at the end of this message refers to tools that are configured to load into the tool panel forthis Galaxy instance, but have been removed from the Galaxy distribution.  These tools and their dependencies can beautomatically installed from the Galaxy Tool Shed at http://toolshed.g2.bx.psu.edu.

To skip this process, attempt to start your Galaxy server again (e.g., sh run.sh or whatever you use).  If you do this,be aware that these tools will no longer be available in your Galaxy tool panel, and entries for each of them shouldbe removed from your file named ./tool_conf.xml.

CRITICAL NOTE IF YOU PLAN TO INSTALLThe location in which the tool repositories will be installed is the value of the 'tool_path' attribute in the <tool>tag of the file named ./migrated_tool_conf.xml (i.e., <toolbox tool_path="../shed_tools">).  The default locationsetting is '../shed_tools', which may be problematic for some cluster environments, so make sure to change it beforeyou execute the installation process if appropriate.  The configured location must be outside of the Galaxy installationdirectory or it must be in a sub-directory protected by a properly configured .hgignore file if the directory is withinthe Galaxy installation directory hierarchy.  This is because Tool Shed repositories will be installed using mercurial's clone feature, which creates .hg directories and associated mercurial repository files.  Not having .hgignore properlyconfigured could result in undesired behavior when modifying or updating your local Galaxy instance or the Tool Shed repositories if they are in directories that pose conflicts.  See mercurial's .hgignore documentation at the followingURL for details.

http://mercurial.selenic.com/wiki/.hgignore
The following tool dependencies can also optionally be installed (see the option flag in the command below).  If youchoose to install them (recommended), they will be installed within the location specified by the 'tool_dependency_dir'setting in your main Galaxy configuration file (e.g., uninverse_wsgi.ini).

------------------------------------
Tool Dependency
------------------------------------
Name: samtools, Version: 0.1.18, Type: packageRequirements and installation information:
Compiling SAMtools requires the ncurses and zlib development libraries.
------------------------------------
------------------------------------
Tool Dependency
------------------------------------
Name: freebayes, Version: 0.9.4_9696d0ce8a962f7bb61c4791be5ce44312b81cf8, Type: packageRequirements and installation information:
FreeBayes requires g++ and the standard C and C++ development libraries.Additionally, cmake is required for building the BamTools API.
------------------------------------
2 -> 3... 

The freebayes tool has been eliminated from the distribution .  The repository named freebayes from the mainGalaxy Tool Shed at http://toolshed.g2.bx.psu.edu will be installed into your local Galaxy instance at thelocation discussed above by running the following command.

vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
sh ./scripts/migrate_tools/0003_tools.sh
<sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup>^^

The tool dependencies listed above will be installed along with the repositories if you add the 'install_dependencies' option to the above command like this:

vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
sh ./scripts/migrate_tools/0003_tools.sh install_dependencies
<sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup>^
Tool dependencies can be installed after the repositories have been installed as well.
After the installation process finishes, you can start your Galaxy server.  As part of this installation process,entries for each of the following tool config files will be added to the file named ./migrated_tool_conf.xml, so thesetools will continue to be loaded into your tool panel.  Because of this, existing entries for these files should beremoved from your file named ./tool_conf.xml, but only after the installation process finishes.

freebayes.xml
```


You do not have to install tool dependencies, but doing so will allow each tool version to be associated with a defined tool dependency version, guaranteeing reproducibility of analyses over time.

Here is the log that is generated when you run the tool migration command that includes the flag for installing dependencies.

```
sh ./scripts/migrate_tools/0003_tools.sh install_dependencies
No handlers could be found for logger "galaxy.tools"
Repositories will be installed into configured tool_path location  ../shed_tools
Adding new row (or updating an existing row) for repository 'freebayes' in the tool_shed_repository table.
[localhost] local: git clone --recursive git://github.com/ekg/freebayes.git
[localhost] local: git reset --hard 9696d0ce8a962f7bb61c4791be5ce44312b81cf8
[localhost] local: make
[localhost] local: echo 'PATH=/Users/gvk/workspaces_2008/tool_dependencies/freebayes/0.9.4_9696d0ce8a962f7bb61c4791be5ce44312b81cf8/devteam/freebayes/046c7983e2ff/bin:$PATH; export PATH' > /Users/gvk/workspaces_2008/tool_dependencies/freebayes/0.9.4_9696d0ce8a962f7bb61c4791be5ce44312b81cf8/devteam/freebayes/046c7983e2ff/env.sh;chmod +x/Users/gvk/workspaces_2008/tool_dependencies/freebayes/0.9.4_9696d0ce8a962f7bb61c4791be5ce44312b81cf8/devteam/freebayes/046c7983e2ff/env.sh
[localhost] local: rm -rf ./database/tmp/tmprvB5Esfreebayes version 0.9.4_9696d0ce8a962f7bb61c4791be5ce44312b81cf8 installed in /Users/gvk/workspaces_2008/tool_dependencies/freebayes/0.9.4_9696d0ce8a962f7bb61c4791be5ce44312b81cf8/devteam/freebayes/046c7983e2ff
[localhost] local: sed -i .bak -e 's/-lcurses/-lncurses/g' Makefile
[localhost] local: make
[localhost] local: echo 'PATH=/Users/gvk/workspaces_2008/tool_dependencies/samtools/0.1.18/devteam/freebayes/046c7983e2ff/bin:$PATH; export PATH' > /Users/gvk/workspaces_2008/tool_dependencies/samtools/0.1.18/devteam/freebayes/046c7983e2ff/env.sh;chmod +x /Users/gvk/workspaces_2008/tool_dependencies/samtools/0.1.18/devteam/freebayes/046c7983e2ff/env.sh
[localhost] local: rm -rf ./database/tmp/tmp6njQx2samtools version 0.1.18 installed in /Users/gvk/workspaces_2008/tool_dependencies/samtools/0.1.18/devteam/freebayes/046c7983e2ff
The installation process is finished.  You should now remove entries for the installed tools from your file named./tool_conf.xml and start your Galaxy server.
```


When the Galaxy server is started after the tool migration process above is completed, you'll see the freebayes tool in your tool panel.

Let's take a look at the installed repository to see what we have.  From the **Admin** perspective, click the **Manage installed Tool Shed repositories** menu option.  You should see something like this page.  The installation status is **Installed** and the box is green because the repository and all if its defined tool dependencies were successfully installed.

![](/freebayes_installed.png)

Clicking on the repository name button will display the following page.  Notice the list of installed tool dependencies that are associated with the tools contained in the installed repository, each of which includes a hyperlink.

![](/manage_freebayes.png)

Clicking on the freebayes tool dependency link will display the following page, where we can browse the installation directory and view the compiled binaries.  We can also view the installation log to see exactly what occurred during the installation process.  This may be helpful if the installation resulted in errors.

![](/freebayes_binaries.png)
