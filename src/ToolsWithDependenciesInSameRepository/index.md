<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy Main Tool Shed' height="174" /></a> </div>

# Building tools with dependencies in the same repository

It is often necessary for Galaxy tools to use dependencies that are included in the repository.  For example, some tools use Java Jar files, some use R scripts, etc.  Tools like this can be written in such a way that the dependencies are located when the tool is executed.  To function, this feature uses information defined in a file named **tool_dependencies.xml** (which must be included in the repository) as well as the tool config file.

For more technical details on this XML file, see the [supported tool_dependencies.xml tag sets](/src/ToolDependenciesTagSets/index.md).

As an example, we'll describe a tool that depends on an R script included in the repository.  When this tool is executed, it must locate and use this R script as a dependency for proper execution.  Tools that use Java Jar files or other similar dependencies can follow this example.

Tool dependencies are defined in the tool config's `<requirements>` tag set, and entries within this tag set must match entries defined in the **tool_dependencies.xml** file included in the repository.  So in order for the dependencies to be handled when the repository is installed, each must be defined in at least one of the <requirement> tags in at least 1 tool config in the repository.
The <requirements> tag set in our example tool config file looks like this.

```
<requirements>
    <requirement type="set_environment">R_SCRIPT_PATH</requirement>
    <requirement type="package" version="2.15.1">R</requirement>
</requirements>
```


Notice that there are two types of requirements (tool dependencies), one is of type **set_environment** and the other is of type **package**.  The package dependency type is discussed in the following section of this document, so we'll restrict the current discussion to the set_environment type for now.  This discussion will provide the details of certain tool config features that will enable the tool to use the value of the environment variable named **R_SCRIPT_PATH** to locate the R script upon which the tool depends for proper execution.  This environment variable name can be anything you choose for your tool.

Here is the `<command>` tag for our example tool.  Notice the use of **R_SCRIPT_PATH** environment variable defined in the tool's `<requirement>` tag in the command line - it must be escaped using the **\** character so that Cheetah sends the value **$R_SCRIPT_PATH** to the shell instead of treating it like a place holder.

```
<command interpreter="python">    some_wrapper.py Rscript \$R_SCRIPT_PATH/some_script.R $param1 $param2 $paramN</command>
```


The last place where the **R_SCRIPT_PATH** environment variable is defined is in a file named **tool_dependencies.xml** included in the repository.  Here is the file describing the two dependencies for our tool (again, we'll defer discussion of the package dependency to the following section of this document).  When the <set_enviroment> tag is defined at the xml root level (inside the `<tool_dependency>` tag set), it will use the value of the shell's $R_SCRIPT_PATH environment variable to locate the R script included in the installed tool shed repository when the tool is executed.

```
<?xml version="1.0"?>
<tool_dependency>
    <set_environment version="1.0">
        <environment_variable name="R_SCRIPT_PATH" action="set_to">$REPOSITORY_INSTALL_DIR</environment_variable>   
    </set_environment>
    <package name="R" version="2.15.1">
        <install version="1.0">
            <actions>
                <action type="download_by_url">http://CRAN.R-project.org/src/base/R-2/R-2.15.1.tar.gz</action>
                <action type="shell_command">./configure --prefix=$INSTALL_DIR</action>
                <action type="shell_command">make</action>
                <action type="set_environment">
                    <environment_variable name="PATH" action="prepend_to">$INSTALL_DIR/bin</environment_variable>
                </action>
            </actions>
        </install>
        <readme>You need a FORTRAN compiler or perhaps f2c in addition to a C compiler to build R.</readme>
    </package>
</tool_dependency>
```


When the repository that includes our tool is installed from a tool shed, a tool dependency object named R_SCRIPT_PATH will be created and associated with the installed repository.  The dependency will have a pointer to the env.sh file that is created to set the value of the R_SCRIPT_PATH environment variable.
