<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy Main Tool Shed' height="174" /></a> </div>

# Installing repositories that include complex repository dependency definitions

Let's take a look at what happens when we attempt to install the [complex_repository_dependency_on_bwa_059](http://testtoolshed.g2.bx.psu.edu/view/greg/complex_repository_dependency_on_bwa_059) repository into Galaxy.  After browsing the test Tool Shed from Galaxy and previewing the repository for installation into Galaxy, we end up on the following page (don't pay attention to the change set revisions as I'm using test repositories here).  Notice that we can choose to install or ignore the repository's dependencies, in this case a repository dependency and a tool dependency.

![](/install_complex_repository_dependency_on_bwa_059.png)

If we choose to install both repository dependencies and tool dependencies, we'll see the following page after clicking the **Install** button on the page above (of course, the repository status values may be different as this is just a snapshot in time during the installation process).  Notice that the status of the repository named **complex_repository_dependency** is highlighted in grey although it is installed.  It will not be highlighted in green until it's repository dependency, the **bwa_059 repository**, is finished installing.

![](/installing_repositories.png)

When installation is complete, we can administer the installed repositories by clicking on the **Manage installed Tool Shed repositories** option in the Galaxy Administration menu.

![](/administer_installed_repositories.png)

Inspecting the **bwa_059** repository shows that we have successfully installed and compiled version 0.5.9 of the bwa package, and that no additional Galaxy utilities are associated with this repository.

![](/bwa_059.png)

Browsing the **bwa_059** tool dependency installation directory provides the location of the compiled tool dependency package on disk.

![](/bwa_059_location.png)

Inspecting the **complex_repository_dependency** repository shows the installed **bwa_059** repository dependency, the installed version 0.5.9 of the bwa package, and the **Map with BWA for Illumina** tool included in the repository.  This is the tool that depends upon the installed bwa package.

![](/complex_repository_dependency.png)

Let's take a closer look at the installed version 0.5.9 of the bwa package associated with this repository.  Browsing the installation directory of the package shows that we have only an installation log and an **env.sh** file.  This is because the actual compiled bwa package was installed within the **bwa_059** repository, which is a dependency of this repository.  Notice, in fact, that the path value is the location of the installed bwa package **/Users/gvk/workspaces_2008/tool_dependencies/bwa/0.5.9/test/bwa059/a07baa797d53/bin**.  When the **Map with BWA for Illumina** tool contained in this repository is executed, it will source this path to find the compiled bwa package located in the remote **bwa_059** repository's installation directory hierarchy.

![](/complex_repository_dependency_env.png)
