## Tool Dependencies

Galaxy provides a method for managing the dependencies of Galaxy tools installed from the [Tool Shed](../../../Tool Shed).  In this case, it is simply necessary to set the `tool_dependency_dir` option of `config/galaxy.ini` to a path writable by the Galaxy server.

However, some tools which have not been migrated to the Tool Shed still require manual installation of dependent binaries. In addition, administrators may choose to utilize existing versions of dependencies already installed on the system, rather than rely on versions installed from the Tool Shed. The documentation below covers these cases.

A list of dependencies for unmigrated tools can be found on the [Admin/Tools/ToolDependencies](../../../Admin/Tools/ToolDependencies) page.

### $PATH

```$PATH```
 is the shell environment variable that instructs the shell (i.e. bash) what directories to search for binaries.  Originally, Galaxy expected all binaries to be located on the `$PATH` set when the Galaxy server starts.  This is still an acceptable method to provide dependencies to Galaxy.  You can manipulate this variable as in this example:

```sh
$ echo $PATH
/usr/bin:/bin:/usr/sbin:/sbin
$ type bowtie
bowtie not found
$ export PATH="/galaxy/software/linux2.6-x86_64/bin:$PATH"
$ echo $PATH
/galaxy/software/linux2.6-x86_64/bin:/usr/bin:/bin:/usr/sbin:/sbin
$ type bowtie
bowtie is /galaxy/software/linux2.6-x86_64/bin/bowtie
```


#### Galaxy-specific environment file

The galaxy configuration file contains an option `environment_setup_file` that if set to the path of a file, will cause that file to be sourced prior to running a job. You may find it more convenient to persist your environment changes in this file as opposed to the user's startup files due to the complications described below.

#### Local Jobs

Changes to `$PATH` can be persisted by setting them in your shell's startup file(s).  This typically means `~/.bash_profile` for bash, but please see the [bash documentation on startup files](http://www.gnu.org/software/bash/manual/bashref.html#Bash-Startup-Files) or the **INVOCATION** section of the `bash(1) man` page to understand the intricacies of how that file is read.  Of particular importance, if you are starting Galaxy in a method other than manual invocation from a shell prompt (with `sh run.sh`) such as with an init script, it is likely that your startup file will not be read.  In this instance, you should set `$PATH` in the startup file or use.

#### Cluster Jobs

Setting `$PATH` in your shell startup files may work depending on your DRM - this is how we set up the environment for the [Public Galaxy Site](http://usegalaxy.org/) which runs TORQUE PBS.  However, this may not work for other DRMs such as Sun Grid Engine (SGE).  For SGE, please see the `-v` and `-V` options to [qsub](http://gridscheduler.sourceforge.net/htmlman/htmlman1/qsub.html) and how to set these in [~/.sge_request](http://gridscheduler.sourceforge.net/htmlman/htmlman5/sge_request.html) or [the job runner URL](/src/Admin/Config/Performance/Cluster/index.md).

### Managed Tool Dependencies

Individual tool configurations should contain `<requirement type="package">` tags which can be used by the tool dependency system.  This system works by taking the following steps:
 
1. Create a directory accessible to Galaxy and any cluster on which Galaxy runs tools
1. Set `tool_dependency_dir` in the Galaxy config file (`galaxy.ini`) to the above path
1. Create a subdirectory of the above directory that matches the string in the `<requirement>` tags of tool you want to use
1. Create a subdirectory of the subdirectory you just contained matching the version number of the package you have installed or are installing
1. Create a symbolic link from the name `default` to the version directory you just created (this is used for tools which have a package requirement but do not specify a version of that package; most tools behave this way). Note: `default` **must** be a sybolic link, an actual directory named `default` will be ignored.
1. In the version subdirectory create either:
  * a `bin/` directory or
  * an `env.sh` file as described below

For example, if the `<requirement>` is `<requirement type="package">bowtie</requirement>` and you have installed or plan to install version 0.12.7:

```sh
$ cd <tool_dependency_dir>
$ mkdir bowtie
$ cd bowtie
$ mkdir 0.12.7
$ ln -s 0.12.7 default
```


#### Using the bin/ subdirectory

Since most *nix tools install to a `bin/` subdirectory of their package root, a simple shortcut exists for installing tools directly into the `tool_dependency_dir`.  With the bowtie example above, simply:

```sh
$ cd <tool_dependency_dir>/bowtie/0.12.7
$ mkdir bin
$ cp /path/to/bowtie-0.12.7_binaries
```


In this case, Galaxy will prepend `<tool_dependency_dir>/bowtie/0.12.7/bin` to `$PATH` immediately before it runs the bowtie tool.

If you prefer, you could also symlink the `bin/` directory to the location of your bowtie bin directory if you already have bowtie installed elsewhere on your system, or symlink the `0.12.7` directory to the location of the real bin directory's parent directory.

#### Using the env.sh file

For more complete control over how the environment is configured, you can instead choose to create an `env.sh` file.  This is a file that is sourced (**not** executed) by the shell to set up any appropriate environment variables needed to execute the software.  In the bowtie example, this would be `<tool_dependency_dir>/bowtie/0.12.7/env.sh` and would look like this:

```
# configure PATH to bowtie binaries
PATH="/path/to/bowtie-0.12.8_binaries:$PATH"
export PATH
```


This file will then be sourced immediately before Galaxy runs the bowtie tool.  More complex software may require you to set up other environment variables, and `env.sh` is the appropriate place to do that.
