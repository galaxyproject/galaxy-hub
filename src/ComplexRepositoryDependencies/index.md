<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy Main Tool Shed' height="174" /></a> </div>

# Complex Repository Dependencies

Complex repository dependencies allow many Tool Shed repository installations into a single Galaxy instance where any number of the contained tools across installed repositories can all reference a single installation of a specific tool dependency package (e.g. bwa version 0.5.9).

Describing how this works is tricky, so let's see if we can state it in a way that can be understood: tool dependency definitions that contain repository dependency definitions define a relationship to a tool dependency that will be installed using the instructions in the required repository's **tool_dependencies.xml** file, where the relationship to the required repository is defined by the contained repository dependency definition. Hmmm...okay, let's try to clarify this a bit...

To demonstrate how this works, we'll refer to 2 repositories in the [test Galaxy Tool Shed](http://testtoolshed.g2.bx.psu.edu): [bwa_059](http://testtoolshed.g2.bx.psu.edu/view/greg/bwa_059) and [complex_repository_dependency_on_bwa_059](http://testtoolshed.g2.bx.psu.edu/view/greg/complex_repository_dependency_on_bwa_059).

The [bwa_059](http://testtoolshed.g2.bx.psu.edu/view/greg/bwa_059) repository has type **Tool dependency definition** and contains only a single file named **tool_dependencies.xml** which looks like the following.  This definition will download and compile version 0.5.9 of the bwa package.

```
<?xml version="1.0"?>
<tool_dependency>
    <package name="bwa" version="0.5.9">
        <install version="1.0">
            <actions>
                <action type="download_by_url">http://downloads.sourceforge.net/project/bio-bwa/bwa-0.5.9.tar.bz2</action>
                <action type="shell_command">make clean</action>
                <action type="shell_command">make</action>
                <action type="move_file">
                    <source>bwa</source>
                    <destination>$INSTALL_DIR/bin</destination>
                </action>
                <action type="set_environment">
                    <environment_variable name="PATH" action="prepend_to">$INSTALL_DIR/bin</environment_variable>
                </action>
            </actions>
        </install>
        <readme>
Compiling BWA requires zlib and libpthread to be present on your system.
        </readme>
    </package>
</tool_dependency>
```


To demonstrate how the [bwa_059](http://testtoolshed.g2.bx.psu.edu/view/greg/bwa_059) repository can be used, let's take a look at the **tool_dependencies.xml** file contained in the [complex_repository_dependency_on_bwa_059](http://testtoolshed.g2.bx.psu.edu/view/greg/complex_repository_dependency_on_bwa_059 ) repository, which looks like the following.

```
<?xml version="1.0"?>
<tool_dependency>
    <package name="bwa" version="0.5.9">
        <repository toolshed="http://testtoolshed.g2.bx.psu.edu" name="bwa_059" owner="greg" changeset_revision="a347750db1d1" />
    </package>
</tool_dependency>
```


The above tool dependency definition is associated with the entry in the `<requirements>` tag set defined in the **bwa_wrapper.xml** Galaxy tool configuration file contained in the same repository.  The **bwa_wrapper.xml** `<requirements>` tag set looks like the following.  Notice that the type **package**, version **0.5.9** and name **bwa** match the definition in the above **tool_dependencies.xml** file. 

```
<requirements>
    <requirement type="package" version="0.5.9">bwa</requirement>
</requirements>
```


Visiting the repository's main page displays various containers.  There are two dependencies defined for this repository, both of which are defined in the simple **tool_dependencies.xml** file above.  The repository dependency on revision **a347750db1d1** of the repository named **bwa_059** owned by **greg** is defined by the `repository` tag, while the tool dependency on version **0.5.9** of the **bwa package** is defined by the `<package>` tag set.

![](/manage_complex_repository_dependency_on_bwa_059.png)

For more technical details on this XML file, see the [supported tool_dependencies.xml tag sets](/src/ToolDependenciesTagSets/index.md).
