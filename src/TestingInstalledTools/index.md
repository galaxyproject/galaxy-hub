<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src="/src/Images/Logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a> </div>

# Using Galaxy's functional test framework to test tools installed into your local Galaxy instance

Tool shed repositories that contain tools with defined functional tests can be tested when they've been installed into your local Galaxy instance using Galaxy's functional test framework. For tests to work, the repository must include a directory named **test-data** somewhere in its file system hierarchy, and all functional test input and output datasets must be included in this directory.

Tools contained in installed repositories will fall into one of two possible categories: tools eliminated from the Galaxy distribution and "migrated" to the tool shed, and tools contained in repositories that are manually installed by the Galaxy administrator.

Entries for all "migrated" tools are contained in the tool panel configuration file named migrated_tools_conf.xml in the Galaxy installation directory. 

Note that the path to your tool dependency directory must be set up correctly - the examples below assume you have configured [galaxyroot]/tool_dependencies as that path in config/galaxy.ini. 

To test  tools, run the following command from the Galaxy installation directory.

```
export GALAXY_TOOL_DEPENDENCY_DIR=tool_dependencies; sh run_tests.sh -migrated
```


Entries for tools included in repositories that are manually installed by the Galaxy administrator are defined in one or more shed-related tool panel configuration files (e.g., shed_tool_conf.xml,shed_tool_conf1xml, etc). These files are all named in the comma-separated configuration setting for **tool_config_file** in your local config/galaxy.ini file. The functional test framework currently supports only a single file named **shed_tool_conf.xml**, so if you have installed repositories that contain tools using more than 1 shed-related tool panel config file or a file with a different name, you'll need to manually change the following code line near the top of the file ~/scripts/functional_tests.py (at the time of this writing, this is line #51 in the file) so that the Python list contains all of your shed-related tool panel configuration file names.

```
installed_tool_panel_configs = [ 'shed_tool_conf.xml' ]
```


To run functional tests for tools included in repositories that are manually installed by the Galaxy administrator, run the following command from the Galaxy installation directory.

```
export GALAXY_TOOL_DEPENDENCY_DIR=tool_dependencies;  sh run_tests.sh -installed
```

