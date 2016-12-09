<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src='/images/Logos/ToolShed.jpg' alt='Galaxy Main Tool Shed' height="174" /></a> </div>

# Tool Dependency Packages

From Galaxy’s perspective, tool dependency packages are third-party packages that are required by Galaxy tools.  Examples are abundant, and include items ranging from autoconf to zlib.  The reason for this is because installing and running Galaxy has always been extremely simple, and installing Tool Shed repositories containing Galaxy tools must not change that.  To clarify, the goal for installing and running a single-user, vanilla Galaxy instance is two simple steps:

1. Clone Galaxy from [GitHub](https://github.com/galaxyproject/galaxy)
2. From the Galaxy installation directory, type: sh run.sh

Of course, configuring Galaxy for a multi-user, production environment introduces several additional levels of complexity.  However, installing repositories from the Tool Shed should not result in significant additional complexities beyond configuring Galaxy itself.  This implies that Galaxy tool authors cannot make assumptions about packages being available in a Galaxy environment beyond a reasonable set.  The Tool Shed provides the mechanism for installing additional required packages using XML recipes.

Tool authors can assume certain packages are available in any Galaxy environment in which their tools may be installed.  The Intergalactic Utilities Commission has defined a small set of packages that may not be included in a vanilla operating system, but should be available within any Galaxy environment.  Björn Grüning, an IUC member, created the [Tool Dependencies page](http://wiki.galaxyproject.org/Admin/Config/ToolDependenciesList) which provides this information.  The following packages have been defined as “required”, so Galaxy tool authors can assume they are  available within any Galaxy environment.  The Tool Dependencies page includes lists of additional packages that can be installed from the Tool Shed using recipes.

* autoconf
* automake
* autotools-dev
* build-essential
* cmake
* git-core
* libatlas-base-dev
* libblas-dev
* liblapack-dev
* libc6-dev
* mercurial
* python2.6
* python2.6-dev
* pkg-config
* subversion
* python-dev
* python-pip (According to BjoernGruening this shouldn't be used for installation of tools) 

# Tool Shed Recipes for Installing Packages

Recipes for installing packages required by Galaxy tools contained in Tool Shed repositories are defined in XML files named tool_dependencies.xml.  With the introduction of the **Tool dependency definition** repository type in the August 12, 2013 Galaxy release, these recipes should be contained in repositories with this type and associated with the **Tool Dependency Packages** category in the Galaxy Tool Shed.  The Tool Shed contains Unrestricted repositories that include these recipes along with tools and other Galaxy utilities, but they were created and populated prior to the August 12, 2013 Galaxy release.  Over time, recipes from many of these repositories will be moved into separate **Tool dependency definition** repositories.  New repositories should use the current approach of defining relationships between contained tools and recipes in separate repositories.

At the most basic level, recipes for installing packages consist of XML tags that define the steps required to download and install the package.  These steps are contained in an `<actions>` tag set, with each step in the process defined by an `<action>` tag.  Every `<action>` tag has a type attribute whose values include **download_binary**, **download_by_url**, and **shell_command**, among others..  These basic recipes can be wrapped in higher level tag sets supporting many beneficial features, and covering many scenarios for performing installation and compilation tasks.  All recipes follow this general outline.

1. Download a binary or source code into a working directory
2. If source code was downloaded, compile it using recipe actions
3. Make the binary executable and move it to the defined installation directory
4. Define the environment for executing the package so Galaxy tools that require it can locate it and execute it

Here I’ll highlight some of the tag sets that are currently available for creating these recipes.  The complete set of tags, along with details for using them, is available on the [Supported tool_dependencies.xml Tag Sets page](/src/ToolDependenciesTagSets/index.md).

# Installing Precompiled Binaries

In some cases, precompiled binaries are available from sites hosting the package source code.  The Galaxy development team also hosts binaries of third-party packages.  If you plan to compile your own binaries, make sure you support the oldest version of glibc that might be installed on x86_64 or i386 Linux distributions and that no non-standard preinstalled libraries have been pulled in during the build process.  Many items in the build process (especially using autoconf) will automatically link against libraries if present and disable functionality if not, producing binaries that may not work as intended.

Precompiled binaries imply support for a finite set of operating systems and processor architectures.  The Tool Shed supports recipes for installing binaries for the following combinations.  The Tool Shed installation process uses the Python os.uname() method to discover this information about the current environment to determine if a compatible binary is available.  The installation process will fall back to installing and compiling packages from source (if the recipe includes the steps) for installation on other systems.

* darwin x86_64
* darwin i386
* linux x86_64
* linux i386

Steps for downloading precompiled binaries are contained within a recipe’s `<actions_group>` tag set and are generally handled by the download_binary action type.  After successful download into a working directory, the binary will be moved to its defined installation directory and flagged as executable.  Revision 017a00c265f1 of repository package_bowtie2_2_1_0 owned by devteam on the main Galaxy Tool Shed contains a recipe that provides a nice example.  Here is a snippet of the recipe that installs binaries for two of the four supported operating system / processor architecture combinations.  The steps for the i386 processor architectures and for installing and compiling from source have been eliminated, but the step defining the environment for executing the package is displayed.

```
<actions_group>
    <actions os="linux" architecture="x86_64">
        <action type="download_by_url">http://depot.galaxyproject.org/package/linux/x86_64/bowtie2/bowtie2-2.1.0-linux-x86_64.tgz</action>
        <action type="move_directory_files">
            <source_directory>.</source_directory>
            <destination_directory>$INSTALL_DIR</destination_directory>
        </action>
    </actions>
    <actions os="darwin" architecture="x86_64">
        <action type="download_by_url">http://depot.galaxyproject.org/package/darwin/x86_64/bowtie2/bowtie2-2.1.0-macos-x86_64.tgz</action>
        <action type="move_directory_files">
            <source_directory>.</source_directory>
            <destination_directory>$INSTALL_DIR</destination_directory>
        </action>
    </actions>
    <actions os="linux" architecture="i386">
        …similar actions eliminated here...
    </actions>
    <actions os="darwin" architecture="i386">
        …similar actions eliminated here...
    </actions>
    <actions>
        …actions for installing and compiling from source eliminated here...
    </actions>
    <action type="set_environment">
        <environment_variable name="PATH" action="prepend_to">$INSTALL_DIR</environment_variable>
    </action>
</actions_group>
```


# Installing and Compiling from Source

The Tool Shed supports tag sets for installing and compiling packages from source that allow installation of just about any package.  Many examples are available, from extremely simple to more complex (e.g., revision 98b2f159a259 of repository package_rdkit_2013_03 owned by iuc in the main Galaxy Tool Shed).  I’ll show a simple example here, revision def70e393020 of repository package_bwa_0_7_7 owned by iuc in the main Galaxy Tool Shed.  Here is the entire tool_dependencies.xml file that defines the recipe for installing version 0.7.7 of the bwa package.

```
<?xml version="1.0"?>
<tool_dependency>
    <package name="bwa" version="0.7.7">
        <install version="1.0">
            <actions>
                <action type="download_by_url">http://downloads.sourceforge.net/project/bio-bwa/bwa-0.7.7.tar.bz2</action>
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
    </package>
</tool_dependency>
```

