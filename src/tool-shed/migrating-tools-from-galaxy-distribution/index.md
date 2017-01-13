---
autotoc: true
---
<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src="/src/images/Logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a> </div>



# Migrating tools from the Galaxy distribution to the Galaxy Main Tool Shed

In 2012, the Galaxy development team began the process of migrating the tools that were available in the Galaxy code distribution to the [Main Galaxy Tool Shed](http://toolshed.g2.bx.psu.edu). This enabled those that host their own local Galaxy instances much more flexibility in choosing to provide only those specific tools in which their users are interested.

A certain set of "base tools" will continue to be included with the Galaxy distribution, but it will be smaller than it is currently. The Emboss version 5.0.0 tools was the first set of tools eliminated from the Galaxy distribution and hosted in the Galaxy Tool Shed.  There have been several more tools migrated since that time.

Any of the tools eliminated from the Galaxy distribution can very easily be installed to your local Galaxy instance from the Tool Shed. The following sections describe this process using the Emboss 5.0.0 tools  and the Emboss datatypes as an example.  The Emboss 5.0.0 tools are currently contained in the repository named **emboss_5** and the Emboss data types are contained in the repository named **emboss_datatypes** in the main Galaxy Tool Shed. Both of these repositories will be referenced in the following discussion.

Tools will be eliminated from the Galaxy distribution and moved to the Tool Shed in stages, each occurring with a new Galaxy distribution release. The process for installing migrated tools will be similar to the process we've been using for managing the Galaxy database schema migration. For example, updating your local Galaxy instance to a new release that includes changes to the database will result in something like the following being displayed when you start your Galaxy server.

```
Exception: Your database has version '92' but this code expects version '93'. Please backup your database and then migrate the schema by running 'sh manage_db.sh upgrade'.
```


Under these circumstances, you are required to update your database (via 'sh manage_db.sh upgrade') before your Galaxy server will start. The process for installing tools from the Tool Shed that have been eliminated from the distribution will be more flexible in that you will not be required to install them to start your server, but you will be alerted in a similar way that certain tools have been eliminated. If you choose to not install the eliminated tools from the Tool Shed, they will no longer be available in your tool panel.

For clarification, let's take a look at how this process will work when the Emboss tool and datatypes are eliminated from the distribution. When you upgrade your Galaxy instance to the release in which the Emboss tools (or any other tools) are eliminated, you will be alerted that tools have been eliminated only if you have defined at least 1 of the missing tools in your tool_conf.xml file.

To show how this works, let's assume we have a local Galaxy instance with a tool_conf.xml file that looks like the following. Notice that we have entries for 5 different Emboss tools (we have 6 total entries for Emboss tools, but the "emboss_extractfeat.xml" has 2 different entries). We have purposefully distributed these entries inside and outside of multiple sections in the tool panel for this example.

```xml
<?xml version="1.0"?>
<toolbox>
    <section name="Get Data" id="getext">
        <tool file="data_source/upload.xml"/>
        <tool file="emboss_5/emboss_antigenic.xml" />
    </section>
    <section name="Short read mapping" id="short">
        <tool file="emboss_5/emboss_est2genome.xml" />
    </section>
    <tool file="emboss_5/emboss_etandem.xml" />
    <section name="EMBOSS" id="EMBOSSLite">
        <tool file="emboss_5/emboss_extractfeat.xml" />
        <tool file="emboss_5/emboss_extractseq.xml" />
    </section>
    <label text="Basic Tools" id="basic_tools" />
    <tool file="emboss_5/emboss_extractfeat.xml" />
</toolbox>```


Starting our Galaxy instance using the tool_conf.xml file above produces the following arrangement in our tool panel.

<img src="/src/ToolShed/MigratingToolsFromGalaxyDistribution/simple_tool_panel_emboss.png" alt="" height="346" />

Upgrading our Galaxy instance to the release in which the Emboss tools have been eliminated and then starting our Galaxy server produces the following message. Notice that even though over 130 Emboss tools were originally included in the Galaxy distribution, only those Emboss tools that we've defined in our tool_conf.xml file are listed as missing. If we had not defined any of the Emboss tools in our tool_conf.xml file, this message would not have been displayed, and our Galaxy server would have started normally.

```
The list of files at the end of this message refers to tools that are configured to load into the tool panel for this Galaxy instance, but have been removed from the Galaxy distribution. These tools can be automatically installed from the Galaxy Tool Shed at http://toolshed.g2.bx.psu.edu.

To skip this process, attempt to start your Galaxy server again (e.g., sh run.sh or whatever you use). If you do this, be aware that these tools will no longer be available in your Galaxy tool panel, and entries for each of them should be removed from your file named ./tool_conf.xml.
CRITICAL NOTE IF YOU PLAN TO INSTALL
The location in which the tool repositories will be installed is the value of the 'tool_path' attribute in the <tool> tag of the file named ./migrated_tool_conf.xml (i.e., <toolbox tool_path="../shed_tools">). The default location setting is '../shed_tools', which may be problematic for some cluster environments, so make sure to change it before you execute the installation process if appropriate. The configured location must be outside of the Galaxy installation directory or it must be in a sub-directory protected by a properly configured .hgignore file if the directory is within the Galaxy installation directory hierarchy. This is because Tool Shed repositories will be installed using mercurial's clone feature, which creates .hg directories and associated mercurial repository files. Not having .hgignore properly configured could result in undesired behavior when modifying or updating your local Galaxy instance or the Tool Shed repositories if they are in directories that pose conflicts. See mercurial's .hgignore documentation at the following URL for details.

http://mercurial.selenic.com/wiki/.hgignore

1 -> 2...

The Emboss 5.0.0 tools have been eliminated from the distribution and the Emboss datatypes have been removed fromdatatypes_conf.xml.sample. You should remove the Emboss datatypes from your version of datatypes_conf.xml. Therepositories named emboss_5 and emboss_datatypes from the main Galaxy Tool Shed at http://toolshed.g2.bx.psu.eduwill be installed into your local Galaxy instance at the location discussed above by running the following command.

vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
sh ./scripts/migrate_tools/0002_tools.sh
<sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup><sup>^</sup>^^

done
After the installation process finishes, you can start your Galaxy server. As part of this installation process,entries for each of the following tool config files will be added to the file named ./migrated_tool_conf.xml, so thesetools will continue to be loaded into your tool panel. Because of this, existing entries for these files should beremoved from your file named ./tool_conf.xml, but only after the installation process finishes.

emboss_antigenic.xml
emboss_est2genome.xml
emboss_etandem.xml
emboss_extractfeat.xml
emboss_extractseq.xml
emboss_extractfeat.xml
```


Notice that the second paragraph tells us we can choose to not install the tools. If we restart our Galaxy server without installing the tools, the tools are not loaded into our tool panel since they are no longer available on disk.

<img src="/src/ToolShed/MigratingToolsFromGalaxyDistribution/simple_tool_panel_sans_emboss.png" alt="" height="202" />

If, however, we perform the installation, this is what we'll see.

```
$ sh ./scripts/migrate_tools/0002_tools.sh
Repositories will be installed into configured tool_path location ../shed_tools
destination directory: emboss_datatypes
requesting all changes
adding changesets
adding manifests
adding file changes
added 1 changesets with 1 changes to 1 files
updating to branch default
1 files updated, 0 files merged, 0 files removed, 0 files unresolved
0 files updated, 0 files merged, 0 files removed, 0 files unresolved
Adding new row (or updating an existing row) for repository 'emboss_datatypes' in the tool_shed_repository table.
destination directory: emboss_5
requesting all changes
adding changesets
adding manifests
adding file changes
added 1 changesets with 113 changes to 113 files
updating to branch default
113 files updated, 0 files merged, 0 files removed, 0 files unresolved
0 files updated, 0 files merged, 0 files removed, 0 files unresolved
Adding new row (or updating an existing row) for repository 'emboss_5' in the tool_shed_repository table.

The installation process is finished.  All tools associated with this migration that were defined in your file named ./tool_conf.xml have been removed.  You may now start your Galaxy server.
```


A backup copy of the original tool_conf.xml file was made during the migration process.  This copy of the original will contain the entries for all migrated tools.  Our altered tool_conf.xml file looks like the following.

```xml
<?xml version="1.0"?>
<toolbox>
    <section name="Get Data" id="getext">
        <tool file="data_source/upload.xml"/>
    </section>
    <label text="Basic Tools" id="basic_tools" />
</toolbox>
```


At this point we'll remove all of the Emboss datatypes from our datatypes_conf.xml file since they are contained in the installed repository named emboss_datatypes.

The Emboss tools will still load because our migrated_tools_conf.xml file has been changed to include tag sets for each of the tools, including the sections in which they were defined in our tool_conf.xml file.

```xml
<?xml version="1.0"?>
<toolbox tool_path="../shed_tools">
    <section id="EMBOSSLite" name="EMBOSS" version="">
        <tool file="../shed_tools/toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/b94ca591877b/emboss_5/emboss_5/emboss_extractseq.xml" guid="toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: extractseq35/5.0.0">
            <tool_shed>toolshed.g2.bx.psu.edu</tool_shed>
            <repository_name>emboss_5</repository_name>
            <repository_owner>devteam</repository_owner>
            <installed_changeset_revision>b94ca591877b</installed_changeset_revision>
            <id>toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: extractseq35/5.0.0</id>
            <version>5.0.0</version>        </tool>        <tool file="../shed_tools/toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/b94ca591877b/emboss_5/emboss_5/emboss_extractfeat.xml" guid="toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: extractfeat34/5.0.0">
            <tool_shed>toolshed.g2.bx.psu.edu</tool_shed>
            <repository_name>emboss_5</repository_name>
            <repository_owner>devteam</repository_owner>
            <installed_changeset_revision>b94ca591877b</installed_changeset_revision>
            <id>toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: extractfeat34/5.0.0</id>
            <version>5.0.0</version>
        </tool>
    </section>
    <tool file="../shed_tools/toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/b94ca591877b/emboss_5/emboss_5/emboss_etandem.xml" guid="toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: etandem33/5.0.0">
        <tool_shed>toolshed.g2.bx.psu.edu</tool_shed>
        <repository_name>emboss_5</repository_name>
        <repository_owner>devteam</repository_owner>
        <installed_changeset_revision>b94ca591877b</installed_changeset_revision>
        <id>toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: etandem33/5.0.0</id>
        <version>5.0.0</version>
    </tool>
    <tool file="../shed_tools/toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/b94ca591877b/emboss_5/emboss_5/emboss_extractfeat.xml" guid="toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: extractfeat34/5.0.0">
        <tool_shed>toolshed.g2.bx.psu.edu</tool_shed>
        <repository_name>emboss_5</repository_name>
        <repository_owner>devteam</repository_owner
        <installed_changeset_revision>b94ca591877b</installed_changeset_revision>
        <id>toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: extractfeat34/5.0.0</id>
        <version>5.0.0</version>
    </tool>
    <section id="getext" name="Get Data" version="">
        <tool file="../shed_tools/toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/b94ca591877b/emboss_5/emboss_5/emboss_antigenic.xml" guid="toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: antigenic1/5.0.0">
            <tool_shed>toolshed.g2.bx.psu.edu</tool_shed>
            <repository_name>emboss_5</repository_name>
            <repository_owner>devteam</repository_owner>
            <installed_changeset_revision>b94ca591877b</installed_changeset_revision>
            <id>toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: antigenic1/5.0.0</id>
            <version>5.0.0</version>
        </tool>
    </section>
    <section id="short" name="Short read mapping" version="">
        <tool file="../shed_tools/toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/b94ca591877b/emboss_5/emboss_5/emboss_est2genome.xml" guid="toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: est2genome32/5.0.0">
            <tool_shed>toolshed.g2.bx.psu.edu</tool_shed>
            <repository_name>emboss_5</repository_name>
            <repository_owner>devteam</repository_owner>
            <installed_changeset_revision>b94ca591877b</installed_changeset_revision>
            <id>toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: est2genome32/5.0.0</id>
            <version>5.0.0</version>
        </tool>
    </section>
</toolbox>
```


Our integrated_tool_panel.xml file has been automatically altered to look like this.

```xml
<?xml version="1.0"?>
<toolbox>
    <label id="basic_tools" text="Basic Tools" version="" />
    <section id="getext" name="Get Data" version="">
        <tool id="upload1" />
        <tool id="toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: antigenic1/5.0.0" />
    </section>
    <section id="short" name="Short read mapping" version="">
        <tool id="toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: est2genome32/5.0.0" />
    </section>
    <section id="EMBOSSLite" name="EMBOSS" version="">
        <tool id="toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: extractseq35/5.0.0" />
        <tool id="toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: extractfeat34/5.0.0" />
    </section>
    <tool id="toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: etandem33/5.0.0" />
    <tool id="toolshed.g2.bx.psu.edu/repos/devteam/emboss_5/EMBOSS: extractfeat34/5.0.0" />
</toolbox>
```


And starting our Galaxy server produces the same arrangement in our tool panel that we had before our defined Emboss tools were eliminated from the distribution and installed from the Tool Shed.

<img src="/src/ToolShed/MigratingToolsFromGalaxyDistribution/simple_tool_panel_installed_emboss.png" alt="" height="343" />

# Delaying execution of a tool migration stage

A Galaxy tool migration stage is defined as the stage level (e.g., 0002, 0003, 0004, etc.) at which a specific set of tools was migrated out of the Galaxy code distribution and added to the main Galaxy Tool Shed.

Executing the process for a specific tool migration stage can be done at any time, not just at the time you are starting your Galaxy server as discussed in the previous sections of this document.  The Galaxy Admin menu includes a link labeled **Review tool migration stages**, which, when clicked, displays a page like the following.  The list of tool migrations consists of those that are currently available for the Galaxy instance, any of which can be run at any time (or multiple times if desired).

![](/src/ToolShed/MigratingToolsFromGalaxyDistribution/tool_migration_stages.png)
