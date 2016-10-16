<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src="../Images/Logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a> </div>

# Packages that Require Other Packages at Compile Time

In some cases, a dependency definition author may want to write a definition whose dependency package (e.g., osra) can require a previously compiled binary (e.g., graphicsmagick) during compilation as well as tool execution time when the tool is using the compiled [osra] binary.  This is possible using a combination of three tool dependency definition tag sets, which must be defined in the tool_dependencies.xml file in the order discussed here.

The example for this discussion is the tool_dependencies.xml file contained in the osra repository, which is available at:        [http://testtoolshed.g2.bx.psu.edu/view/bgruening/osra](http://testtoolshed.g2.bx.psu.edu/view/bgruening/osra).

The first tag set shown below defines a complex repository dependency that ensures that changeset revision XXX of the repository named package_graphicsmagick_1_3 owned by YYY in the tool shed ZZZ has been previously installed.  The assurance of previous installation is due to the use of the **prior_installation_required** attribute.

```
<tool_dependency>
    <package name="graphicsmagick" version="1.3.18">
        <repository changeset_revision="XXX" name="package_graphicsmagick_1_3" owner="YYY" prior_installation_required="True" toolshed="ZZZ" />
    </package>
    ...
```
     

By the way, there is an env.sh file associated with version 1.3.18 of the graphicsmagick package which looks something like the following when the tool shed repository defining the graphicsmagick package dependency definition is installed into a Galaxy instance.  We'll reference this file later in this discussion (*).

```
GRAPHICSMAGICK_ROOT_DIR=/<my configured tool dependency path>/graphicsmagick/1.3.18/YYY/package_graphicsmagick_1_3/XXX/gmagick; export GRAPHICSMAGICK_ROOT_DIR
```


The second tag set defines a specific package dependency that has been previously installed (guaranteed by the tag set discussed above) and compiled, where the compiled dependency is needed by the tool dependency currently being installed (osra version 2.0.0 in this case) and complied in order for it's installation and compilation to succeed.  This tag set is contained within the `<package name="osra" version="2.0.0">` tag set, which implies that version 2.0.0 of the osra package requires version 1.3.18 of the graphicsmagick package in order to successfully compile.

When this tag set is handled, one of the effects is that the env.sh file associated with graphicsmagick version 1.3.18 is "sourced", which undoubtedly sets or alters certain environment variables (e.g. PATH, PYTHONPATH, etc).

```
<!-- populate the environment variables from the dependent repositories -->
<action type="set_environment_for_install">
    <repository changeset_revision="XXX" name="package_graphicsmagick_1_3" owner="YYY" toolshed="ZZZ">
        <package name="graphicsmagick" version="1.3.18" />
    </repository>
</action>
```


The third tag set enables discovery of the same required package dependency discussed above for correctly compiling the osra version 2.0.0 package, but in this case the package can be discovered at tool execution time.  Using the `$ENV[]` option as shown in this example, the value of the environment variable named GRAPHICSMAGICK_ROOT_DIR (which was set in the environment using the second tag set described above) will be used to automatically alter the env.sh file associated with the osra version 2.0.0 tool dependency when it is installed into Galaxy.  (*) Refer to where we discussed the env.sh file for version 1.3.18 of the graphicsmagick package above.

```
<action type="set_environment">
    <environment_variable action="prepend_to" name="LD_LIBRARY_PATH">$ENV[GRAPHICSMAGICK_ROOT_DIR]/lib/</environment_variable>
    <environment_variable action="prepend_to" name="LD_LIBRARY_PATH">$INSTALL_DIR/potrace/build/lib/</environment_variable>
    <environment_variable action="prepend_to" name="PATH">$INSTALL_DIR/bin</environment_variable>
    <!-- OSRA_DATA_FILES is only used by the galaxy wrapper and is not part of OSRA -->
    <environment_variable action="set_to" name="OSRA_DATA_FILES">$INSTALL_DIR/share</environment_variable>
</action>
```


The above tag will produce an env.sh file for version 2.0.0 of the osra package when it it installed into Galaxy that looks something like this.  Notice that the path to the gmagick binary is included here since it expands the defined `$ENV[GRAPHICSMAGICK_ROOT_DIR]` value in the above tag set.

```
LD_LIBRARY_PATH=/<my configured tool dependency path>/graphicsmagick/1.3.18/YYY/package_graphicsmagick_1_3/XXX/gmagick/lib/:$LD_LIBRARY_PATH; export LD_LIBRARY_PATH
LD_LIBRARY_PATH=/<my configured tool dependency path>/osra/1.4.0/YYY/depends_on/XXX/potrace/build/lib/:$LD_LIBRARY_PATH; export LD_LIBRARY_PATH
PATH=/<my configured tool dependency path>/osra/1.4.0/YYY/depends_on/XXX/bin:$PATH; export PATH
OSRA_DATA_FILES=/<my configured tool dependency path>/osra/1.4.0/YYY/depends_on/XXX/share; export OSRA_DATA_FILES
```


For better clarity, here is the complete tool dependency definition that contains all of the tag sets discussed above.

```
<?xml version="1.0"?>
<tool_dependency>
    <package name="numpy" version="1.7.1">
        <repository changeset_revision="7283651b62fe" name="package_numpy_1_7" owner="bgruening" prior_installation_required="True" toolshed="http://testtoolshed.g2.bx.psu.edu" />
    </package>
    <package name="boost" version="1.53.0">
        <repository changeset_revision="139a023de075" name="package_boost_1_53" owner="bgruening" prior_installation_required="True" toolshed="http://testtoolshed.g2.bx.psu.edu" />
    </package>
    <package name="rdkit" version="2013_03_2">
        <install version="1.0">
            <actions>
                <!-- first action is always downloading -->
                <action type="download_by_url">http://rdkit.googlecode.com/files/RDKit_2013_03_2.tgz</action>
                <!-- populate the environment variables from the dependend repos -->
                <action type="set_environment_for_install">
                    <repository changeset_revision="7283651b62fe" name="package_numpy_1_7" owner="bgruening" toolshed="http://testtoolshed.g2.bx.psu.edu">
                        <package name="numpy" version="1.7.1" />
                   </repository>
                </action>
                <action type="set_environment_for_install">
                    <repository changeset_revision="139a023de075" name="package_boost_1_53" owner="bgruening" toolshed="http://testtoolshed.g2.bx.psu.edu">
                        <package name="boost" version="1.53.0" />
                    </repository>
                </action>
                <!-- PYTHONPATH_NUMPY is set in the numpy package -->
                <action type="shell_command">
                    export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:pwd/lib/ &amp;&amp; export PYTHONPATH=$PYTHONPATH:pwd/ &amp;&amp; mkdir build &amp;&amp;                    cd build &amp;&amp; cmake .. -DBOOST_ROOT=$BOOST_ROOT_DIR -DCMAKE_INSTALL_PREFIX=$INSTALL_DIR/rdkit/ -DRDK_INSTALL_INTREE=OFF - DPYTHON_NUMPY_INCLUDE_PATH=$PYTHONPATH_NUMPY/numpy/core/include/
                </action>
                <action type="shell_command">cd ./build &amp;&amp; make </action>
                <action type="shell_command">cd ./build &amp;&amp; make install</action>
                <action type="set_environment">
                    <environment_variable action="set_to" name="RDBASE">$INSTALL_DIR/rdkit</environment_variable>
                    <environment_variable action="append_to" name="LD_LIBRARY_PATH">$INSTALL_DIR/rdkit</environment_variable>
                    <environment_variable action="prepend_to" name="PATH">$INSTALL_DIR/rdkit/bin</environment_variable>
                    <environment_variable action="prepend_to" name="PYTHONPATH">$INSTALL_DIR/rdkit/lib</environment_variable>
                </action>
            </actions>
        </install>
        <readme>Compiling rdkit requires cmake, python headers, sqlite3, flex and bison.</readme>
    </package>
</tool_dependency>
```

