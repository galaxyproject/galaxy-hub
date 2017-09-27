---
title: Galaxy on Windows
---

# Running Galaxy on Windows

<div class="well well-sm">

**Note:** *It is again possible to run Galaxy on Windows.  You'll need the [Windows Subsystem for Linux](https://msdn.microsoft.com/commandline/wsl/about) on 64-bit Windows 10.  With this shell, you can install and run a Galaxy server on the localhost by using all the command on the Linux/Mac OS tutorial. Watch this space for more information as we explore this option further.  Many thanks to [Arnaud Belcour](https://github.com/ArnaudBelcour) for pointing this out.*

</div>


Running Galaxy under Windows was possible at one point, with a bit of effort. After recent changes to dependency management (using Python Wheels instead of Eggs) we have no tutorial or proof of concept how to do it. If you really need to run Galaxy on Windows platform please consider running a Virtual Machine with a Linux on it and then follow tutorial at [http://getgalaxy.org](http://getgalaxy.org)

If you want to develop Galaxy tools please consider using the following image with preinstalled Galaxy, Planemo and other useful tools: [http://planemo.readthedocs.org/en/latest/appliance.html#launching-the-appliance-virtualbox-ova](http://planemo.readthedocs.org/en/latest/appliance.html#launching-the-appliance-virtualbox-ova)

## Running Windows Tools

If instead of running a Windows based Galaxy instance, you wish to just run a handful of tools on a Windows server but host Galaxy on a traditional \*nix-based system, the [Pulsar](/src/admin/config/pulsar/index.md) can used to accomplish this.

## Deprecated Instructions

If you were able to set up Galaxy on Windows with Python Wheels please share your experience.

**The text below is outdated.**

### Running old Galaxy (pre 16.01) on Windows

The effort required involves building architecture specific “eggs” (think of these as python’s version of Java’s jar files). Eggs are created using the setuptools package, [http://peak.telecommunity.com/DevCenter/setuptools](http://peak.telecommunity.com/DevCenter/setuptools). Galaxy has been run in Windows using both MinGW/MSYS ( [http://www.mingw.org/](http://www.mingw.org/)) and CYGWIN ( [http://www.cygwin.com/](http://www.cygwin.com/)).

Please note, a simple alternative to attempting to build eggs for Windows is to simply run Linux via virtualization software (such as the free [VirtualBox](http://www.virtualbox.org/)). For best results, use a lightweight Linux such as [Xubuntu](http://www.xubuntu.org/), or disable X-Windows.

If you choose to continue, to understand Eggs and how they work in Galaxy, read the [Eggs](Admin%2FConfig%2FEggs) page.

### Building Eggs

Most eggs are platform-inspecific (e.g. Pure Python), and thus you can use the pre-built versions of these (from [http://eggs.g2.bx.psu.edu](http://eggs.g2.bx.psu.edu)). Of the remaining eggs, not all are required by the default configuration. You'll need at a minimum:

- bx-python 
- Cheetah 
- pycrypto 
- pysqlite 
- numpy 

You'll need to get and build the versions specified in `galaxy_dist/eggs.ini`, so consult that file for proper versions and download URLs. The remaining eggs are required for a number of tools, as well as for some development/debuging purposes.

Galaxy's egg building script, `scramble.py` may or may not work for certain eggs under Windows. If not, scramble's build scripts, located at `galaxy_dist/scripts/scramble/scripts/` can be used as reference for building eggs.

#### An example of building the bx-python egg in MinGW/MSYS:

First obtain the source code:

```console
$ hg clone http://bitbucket.org/james_taylor/bx-python/
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

Once all the required eggs have been built and copied to the proper egg directory, Galaxy can now be run as normal, see [Admin/GetGalaxy](Admin%2FGetGalaxy) to continue.
