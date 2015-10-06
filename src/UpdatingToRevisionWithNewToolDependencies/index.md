<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy Main Tool Shed' height="174" /></a> </div>

# Updating a previously installed repository to a revision that includes tool dependency installation information

Let's assume that you installed the Emboss 5.0.0 tools using the migration process, specifically revision **1:7334f6d0ac17** of the emboss_5 repository from the main Galaxy Tool Shed.  If you look at the emboss_5 repository, you notices that it has been updated to revision **2:a52e6cbbb469**.  This revision added the following **tool_dependencies.xml** file to the repository.

```
<?xml version="1.0"?>
<tool_dependency>
    <package name="emboss" version="5.0.0">
        <install version="1.0">
            <actions>
                <action type="download_by_url">ftp://emboss.open-bio.org/pub/EMBOSS/old/5.0.0/EMBOSS-5.0.0.tar.gz</action>
                <action type="shell_command">./configure --without-x --prefix=$INSTALL_DIR</action>
                <action type="shell_command">make</action>
                <action type="shell_command">make install</action>
            </actions>
            <actions>
                <action type="download_by_url">ftp://emboss.open-bio.org/pub/EMBOSS/old/5.0.0/PHYLIP-3.6b.tar.gz</action>
                <action type="shell_command">./configure --without-x --prefix=$INSTALL_DIR</action>
                <action type="shell_command">make</action>
                <action type="shell_command">make install</action>
            </actions>
        </install>
        <readme>
            These links provide information for building the Emboss package in most environments.
            System requirementshttp://emboss.sourceforge.net/download/#RequirementsPlatform-dependent noteshttp://emboss.sourceforge.net/download/#Platforms
        </readme>
    </package>
</tool_dependency>
```


If you have the **enable_tool_shed_check = True** setting defined in your **universe_wsgi.ini** file and the defined time interval passes or you stop and start your Galaxy server, then clicking the **Manage installed Tool Shed repositories** link on the **Admin** menu will display a page like the following (ignore the change set revision hash tags - I'm using a test environment here).  Notice that the installed **emboss_5** repository is highlighted in yellow since there are updates available from the Tool Shed.  We can use the pop-up menu to retrieve the updates from the Tool Shed.

![](/emboss_5_updates.png)

Updating the installed emboss_5 repository to the revision that includes the **tool_dependencies.xml** file will result in the following message being displayed.

![](/emboss_5_updated.png)

Clicking the **Repository actions** popup menu will display the following options.  Notice that you now have the option to **Manage tool dependencies**.

![](/manage_emboss_dependencies.png)

Clicking the **Manage tool dependencies** option displays the following page where you can install the dependency now defined in the repository.

![](/emboss_dependencies.png)
