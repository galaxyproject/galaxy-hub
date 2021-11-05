---
title: Running Galaxy on Windows
---

**Note:** *It is again possible to run Galaxy on Windows.  You'll need the [Windows Subsystem for Linux](https://msdn.microsoft.com/commandline/wsl/about) on 64-bit Windows 10.  With this shell, you can install and run a Galaxy server on the localhost by using all the command on the Linux/Mac OS tutorial. Watch this space for more information as we explore this option further.  Many thanks to [Arnaud Belcour](https://github.com/ArnaudBelcour) for pointing this out.*


Running Galaxy on Windows requires the use of [Windows Subsystem for Linux](https://msdn.microsoft.com/commandline/wsl/about) on 64-bit Windows 10 or running Linux on a Virtual Machine. You can find a tutorial on using Virtual Machines to run Galaxy at [https://getgalaxy.org](https://getgalaxy.org) while the below instructions describe running Galaxy on Windows subsystem for Linux.

There is also a Virtual machine for tools development which comes pre-installed with Galaxy, Planemo and other useful tools: <https://planemo.readthedocs.org/en/latest/appliance.html#launching-the-appliance-virtualbox-ova>. The virtual machine is updated once per year and is suitable for tools development while the below process is more suited for running a local production server or develop the source code for Galaxy.

To run Galaxy using the [Windows Subsystem for Linux](https://msdn.microsoft.com/commandline/wsl/about) you need to set up your Windows environment, install Galaxy in your Linux distribution, and for development you can either use a text editor such as EMACS or use a remote development plugin for an IDE as the Linux distributions on Windows does not support graphical user interfaces. Below we describe how to use Microsoft Visual Studio on Windows as your IDE.

## Setting up your Windows environment

1. Enable Linux Subsystem for Windows.
2. Install your preferred Linux Distribution.

**Step 1**
Before installing any Linux distros for WSL, you must ensure that the "Windows Subsystem for Linux" optional feature is enabled. Open Windows PowerShell and run:
```
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```
(Hitting the windows button on your keyboard and writing PowerShell in the menu is the quickest way to open it).

**Step 2**
Open the Microsoft store and select your desired Linux distribution. *This instruction was tested on Ubuntu 18.04 LTS but any distribution known to work with Galaxy should work.*

## Installing and running Galaxy.

1. Start your Linux application
2. Install git and clone the Galaxy repository from GitHub.
3. Start Galaxy for production or development.

**Step 1**
Open your Linux distribution from Windows (press windows key and write the name of your installed distribution). This will open a Terminal window which allows you to manage your Linux distribution exactly like on a computer with a Linux operating system installed. The files are stored on your computer and can even be accessed through Windows. Changing Linux files directly from Windows is however something you really *should not do* due to issues with metadata and corruption. 

**Step 2**
Install git, if using Ubuntu:
```
sudo apt install git.
```

Clone the Galaxy GitHub repository to a folder of your choice.
```
git clone https://github.com/galaxyproject/galaxy.git
```

**Step 3**
The Client build system is described in the Galaxy repository [here](https://github.com/galaxyproject/galaxy/blob/dev/client/README.md). 

For development purposes the following three commands gives you a Galaxy server which runs and is automatically updated when you make any changes to the galaxy client source files.
```
GALAXY_CLIENT_SKIP_BUILD=1 sh run.sh
source .venv/bin/activate
make client-watch
```
The first row runs the shell script without building the client, the 2nd row activates the virtual environment and makes the base dependencies accessible and the third row builds the client with the automatic rebuilding activated. 

Just running `sh run.sh` instead builds a client suitable for local development.

**NOTE**
During the installation of Galaxy we ran into issues with Yarn throwing a "Error: ENOENT: no such file or directory,". The cause of this error remains unclear according to [GitHub issues](https://github.com/yarnpkg/yarn/issues/5275). During our first test, installing Yarn in Windows allowed us to install Galaxy successfully in the Ubuntu subsystem (downloadable from the [Yarn website](https://yarnpkg.com/lang/en/docs/install/#windows-stable)). It does however seem that this is a random error with different packages failing to install each time, running the `GALAXY_CLIENT_SKIP_BUILD=1 sh run.s` step again when failing will after a few runs mean that all packages have been installed and the Galaxy server will launch successfully.

## Setting up an IDE on Windows accessing Linux files

All files in the Linux subsystem are accessible on the Windows file system but directly altering them *will most likely cause a mess*. If you wish to use an IDE such as Microsoft Visual Studio it is therefore necessary to use an extension to connect to the files. The guide for doing it with Microsoft Visual Studio is excellent and can be read in full [here](https://code.visualstudio.com/docs/remote/wsl) but summarised below.

* First install Microsoft Visual studio in Windows.
* Then install the [Remote Development Extension pack](https://aka.ms/vscode-remote/download/extension)

Finally enter the linux environment and write `code`in the terminal which will launch Visual Student configured to access the files in your Linux file system.

### Running old Galaxy (pre 16.01) on Windows
*These instructions allow you to recreate old Galaxy set ups and should not be used for new projects.*

The effort required involves building architecture specific “eggs” (think of these as python’s version of Java’s jar files). Eggs are created using the setuptools package, <http://peak.telecommunity.com/DevCenter/setuptools>. Galaxy has been run in Windows using both MinGW/MSYS (<http://www.mingw.org>) and CYGWIN (<https://www.cygwin.com>).

Please note, a simple alternative to attempting to build eggs for Windows is to simply run Linux via virtualization software (such as the free [VirtualBox](https://www.virtualbox.org)). For best results, use a lightweight Linux such as [Xubuntu](https://www.xubuntu.org), or disable X-Windows.

If you choose to continue, to understand Eggs and how they work in Galaxy, read the [Eggs](/admin/config/eggs/) page.

### Building Eggs

Most eggs are platform-agnostic (e.g. Pure Python), and thus you can use the pre-built versions of these (from <https://eggs.g2.bx.psu.edu>). Of the remaining eggs, not all are required by the default configuration. You'll need at a minimum:

- bx-python 
- Cheetah 
- pycrypto 
- pysqlite 
- numpy 

You'll need to get and build the versions specified in `galaxy_dist/eggs.ini`, so consult that file for proper versions and download URLs. The remaining eggs are required for a number of tools, as well as for some development/debugging purposes.

Galaxy's egg building script, `scramble.py` may or may not work for certain eggs under Windows. If not, scramble's build scripts, located at `galaxy_dist/scripts/scramble/scripts/` can be used as reference for building eggs.

#### An example of building the bx-python egg in MinGW/MSYS:

First obtain the source code:

```console
$ hg clone https://bitbucket.org/james_taylor/bx-python/
destination directory: bx-python
requesting all changes
adding changesets
adding manifests
adding file changes
added 482 changesets with 1441 changes to 444 files
updating working directory
272 files updated, 0 files merged, 0 files removed, 0 files unresolved
```

Change to the source directory:

```console
$ cd bx-python/trunk
```

Edit setup.cfg and add the following:

```ini
[build]
compiler = mingw32
```

Then build the egg (be sure to include the tag from the `[tags]` section of `galaxy_dist/eggs.ini`:

```console
$ python setup.py egg_info -b _dev_r4bf1f32e6b76 bdist_egg
```

Once built, eggs need to be placed in `$GALAXY_ROOT/eggs/&lt;platform&gt;`, where <platform> is the platform-specific output of `$GALAXY_ROOT/scripts/get_platforms.py`:

```console
$ cp dist/bx_python-0.5.0_r4bf1f32e6b76-py2.4-win32.egg galaxy_dist/eggs/<platform>
```

Once all the required eggs have been built and copied to the proper egg directory, Galaxy can now be run as normal, see [/admin/get-galaxy/](/admin/get-galaxy/) to continue.
