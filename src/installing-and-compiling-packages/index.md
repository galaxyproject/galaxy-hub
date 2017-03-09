<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src='/images/logos/ToolShed.jpg' alt='Galaxy Main Tool Shed' height="174" /></a> </div>

# Installing and compiling tool dependency packages

Tool shed repository owners can define information in their repositories that enable third party tool dependencies to be automatically installed along with the repository for those repositories that contain tools that require the dependencies.  The process for enabling this is the inclusion of a simple xml file named **tool_dependencies.xml** in the repository.  Here is the **tool_dependencies.xml** file for the [Galaxy development team's freebayes](http://toolshed.g2.bx.psu.edu/repository/view_repository?sort=name&webapp=community&id=491b7a3fddf9366f) repository on the main Galaxy tool shed.

```
<?xml version="1.0"?>
<tool_dependency>
    <package name="freebayes" version="0.9.4_9696d0ce8a962f7bb61c4791be5ce44312b81cf8">
        <install version="1.0">
            <actions>
                <action type="shell_command">git clone --recursive git://github.com/ekg/freebayes.git</action>
                <action type="shell_command">git reset --hard 9696d0ce8a962f7bb61c4791be5ce44312b81cf8</action>
                <action type="shell_command">make</action>
                <action type="move_directory_files">
                    <source_directory>bin</source_directory>
                    <destination_directory>$INSTALL_DIR/bin</destination_directory>
                </action>
                <action type="set_environment">
                    <environment_variable name="PATH" action="prepend_to">$INSTALL_DIR/bin</environment_variable>
                </action>
            </actions>
        </install>
        <readme>
            FreeBayes requires g++ and the standard C and C++ development libraries.Additionally, cmake is required for building the BamTools API.
        </readme>
    </package>
    <package name="samtools" version="0.1.18">
        <install version="1.0">
            <actions>
                <action type="download_by_url">http://sourceforge.net/projects/samtools/files/samtools/0.1.18/samtools-0.1.18.tar.bz2</action>
                <action type="shell_command">sed -i .bak -e 's/-lcurses/-lncurses/g' Makefile</action>
                <action type="shell_command">make</action>
                <action type="move_file">
                    <source>samtools</source>
                    <destination>$INSTALL_DIR/bin</destination>
                </action>
                <action type="move_file">
                    <source>misc/maq2sam-long</source>
                    <destination>$INSTALL_DIR/bin</destination>
                </action>
                <action type="set_environment">
                    <environment_variable name="PATH" action="prepend_to">$INSTALL_DIR/bin</environment_variable>
                </action>
            </actions>
        </install>
        <readme>Compiling SAMtools requires the ncurses and zlib development libraries.</readme>
    </package>
</tool_dependency>
```


The xml root is the `<tool_dependency>` tag, which contains a `<package>` tag set for each required dependency.  Each `<package>` tag set contains tag sets that define the installation process as well as an optional `<readme>` tag that can contain free text information about requirements for compiling the package.

A very critical part of the information in the `<package>` tag is the combination of the **name** and **version** attributes.  These values must match the values of the same attributes in the `<requirements>` tag set of at least one tool config file included in the repository in order for the tool dependency to be installed.
For example the name and version information in the following `<package>` tag...

```<package name="freebayes" version="0.9.4_9696d0ce8a962f7bb61c4791be5ce44312b81cf8">```


...matches the first `<requirement>` tag below whose type attribute value is **package**.  This tag set is included in the **freebayes.xml** tool config file in the repository.  Again, if a match is not found between **type**, **version** and **name**, the tool dependency will not be properly defined for the repository, so it cannot be automatically installed.

```
<requirements>
    <requirement type="package" version="0.9.4_9696d0ce8a962f7bb61c4791be5ce44312b81cf8">freebayes</requirement>
    <requirement type="package" version="0.1.18">samtools</requirement>
</requirements>
```


Notice that the `<install>` tag set contains a list of `<action>` tags, each of which is performed in the order defined in the xml.  Each `<action>` tag includes a **type** attribute which is one of **download_by_url**, **download_file**, **shell_command**, **make_directory**, **move_file**, **move_directory_files**, **set_environment**, **set_environment_for_install** or **setup_virtualenv**.  These action tags will evolve to include more types over time.

The first `<action>` tag defines the source code (or possibly a binary file) installation method or could be a set_environment action type.  There are currently three supported methods for installing packages:

* Downloading via http which is defined using the **download_by_url** action type. If applicable, the target file will be saved locally under the name defined in the **target_filename** attribute. If the remote file is an archive (Zip or Tar), it will be deflated, and the current execution directory will be changed if needed to the deflated subdirectory for the following actions . Note that in the case of Tar files, the name of the downloaded file must match the name of the deflated directory.

* Cloning either a git or a mercurial repository which is defined using the **shell_command** action type.

* Installing Python modules in to a [virtualenv](http://www.virtualenv.org) using [pip](http://www.pip-installer.org/) which is defined using the **setup_virtualenv** action type.  This method creates a self-contained environment for one or more Python modules that combine to make up the package.  This eliminates the complexity of installing python packages the traditional way (with `setup.py`).

**$INSTALL_DIR** is a reserved keyword that refers to the directory in which the compiled dependency will ultimately be moved.  The value of this keyword is determined by Galaxy for each specific dependency.  The installation directory is defined as the following, where the tool_dependency_dir setting is defined in your galaxy.ini (formerly universe_wsgi.ini) config file.  This approach guarantees that each version of a Galaxy tool is associated with specific versions of each of its dependencies, ensuring reproducible analyses over time.

```
~/<tool_dependency_dir>/<package name>/<package version>/<repository owner>/<repository name>/<repository installed changeset revision>
```


There are three ways in which to automatically install tool dependencies along with repositories.  We'll take a look at each of them.
