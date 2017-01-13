 

## Managing and Scrambling Galaxy Eggs

* * *

[Python Eggs](http://peak.telecommunity.com/DevCenter/PythonEggs) are Python modules which have been compiled and packaged in to a single file.

Galaxy depends on a number of external modules. The Galaxy developers provide eggs for a variety of platforms, including 32-bit and 64-bit Linux, Solaris and Mac OS X, under the versions of Python that Galaxy currently supports. These eggs can be downloaded automatically when starting Galaxy.

Some versions of the modules which Galaxy depends on are not the most recent versions of those modules. We extensively test Galaxy with the module versions we define in the egg configuration file. Using different versions of Galaxy's dependencies can cause Galaxy to break. Please only use the module versions that are intended for your specific revision of Galaxy!

### How to get eggs

#### The first time you run Galaxy

When you run Galaxy for the first time, it will attempt to automatically download eggs for you from the Galaxy Eggs distribution site. Assuming your platform is supported by the Galaxy developers, this should all go smoothly, and Galaxy will start without any problems.

#### When you update Galaxy

Upon updating Galaxy (via <tt>hg pull -u</tt>), it's possible that an egg has been added, or an existing egg version has changed since your old Galaxy revision. When starting Galaxy after updating, any new eggs that are missing will be downloaded automatically.

#### If your Galaxy server does not have Internet access

Since eggs are downloaded from our repository at [eggs.g2.bx.psu.edu](http://eggs.g2.bx.psu.edu), if your server does not have Internet access, it will not be able to retrieve them. However, we provide a script to fetch the eggs you need from a system that does have Internet access, and then you can transfer those eggs to the Galaxy server. Here's how it works:

If installing Galaxy for the first time, ensure you have a <tt>config/galaxy.ini</tt>. You can create <tt>config/galaxy.ini</tt> by copying it from <tt>config/galaxy.ini.sample</tt>.

```
cp config/galaxy.ini.sample config/galaxy.ini
```

To create an egg downloader, run:

```
python ./scripts/make_egg_packager.py
```

This creates a script in the current directory, named:

```
egg_package-<your_platform>.py
```

This script can be copied to a system with Internet access and executed. It will download all of the eggs for the original platform and place them in an archive named:

```
galaxy_eggs-<your_platform>.zip
```

This file should be copied back to the Galaxy server and unzipped in the root of the Galaxy installation, where it will create the <tt>eggs/</tt> subdirectory.

### How it works

For the most part, Galaxy handles your eggs for you. If you are attempting to run Galaxy on a platform which is not supported by the Galaxy developers, you may need more information on the underlying components of Galaxy's egg handling code.

### eggs.ini

The config file which contains all the information needed to maintain the correct versions of eggs, as well as how to build (or "scramble") them.

_You should not make changes to <tt>eggs.ini</tt>_. This is the file which tells Galaxy what versions of its dependencies should be used for your exact revision of Galaxy. Changes will be merged when you update from the upstream source repository and can cause egg information to become incorrect.

The python scripts below can be run to check, download and build eggs.

#### The [sources] section

Entries in the [sources] section of the config file can be a relative path. If relative, the repo specified under the [general] section will be prepended. Also, if the path specified in the config results in a 404 Not Found error, the build system will try appending (in this order) '.tar.gz', '.tgz', and '.zip' to the path, to make it easier to provide source without having to change file formats. Multiple dependent sources for a single egg can be separated by spaces.

### scripts/check\_eggs.py

Checks your eggs against the versions listed in <tt>eggs.ini</tt>. If <tt>check_eggs.py</tt> determines that eggs are missing or out of date, it will direct you to run <tt>fetch_eggs.py</tt>.

### scripts/fetch\_eggs.py

Connects to [the Galaxy Eggs distribution site](http://eggs.g2.bx.psu.edu/) and downloads any eggs that you need. If eggs for your platform are unavailable, <tt>fetch_eggs.py</tt> will direct you to run <tt>scramble.py</tt>

### scripts/scramble.py

Scrambles (builds) eggs for your platform. Using <tt>scramble.py</tt> should only necessary if pre-built eggs are not available for your platform.

<tt>scramble.py</tt> uses build scripts in the <tt>scripts/scramble/scripts</tt> directory to download and build modules. Module source and successfully built binaries of dependencies like <<nwwl(PostgreSQL)>> and <<nwwl(MySQL)>> are stored in <tt>scripts/scramble/archive</tt>. The <tt>scripts/scramble/build</tt> directory contains the latest unpacked/built source for each module you scrambled. Both <tt>archives</tt> and <tt>build</tt> can grow quite large over time, so please be aware of this, and clean as necessary.

### Scrambling Eggs for Distribution

A separate script, <tt>scripts/dist-scramble.py</tt> exists for building on multiple platforms. This is mostly designed for use by Galaxy Developers at Penn State who are building eggs for distribution via [the Galaxy Eggs distribution site](http://eggs.g2.bx.psu.edu). <tt>dist-scramble.py</tt> uses the <tt>dist-eggs.ini</tt> config file to determine what platforms to build for, and which hosts to build on.

<tt>dist-scramble.py</tt> works the same way as <tt>scramble.py</tt>:

<tt>% python scripts/dist-scramble.py galaxy_egg</tt>

Called with only the egg argument, <tt>dist-scramble.py</tt> will build for all the platforms under the **all** group in its config file (for platform-specific eggs) or the **noplatform** group (for platform-inspecific eggs). The <tt>[[hosts]</tt>|section contains information about which hosts will be used for building on each desired platform. If you don't want to build for all the platforms listed under the **all** group, you can add a platform argument (any lvalue in the <tt>[hosts]]</tt> or <tt>[groups]</tt> section is valid):

<tt>% python scripts/dist-scramble.py galaxy_egg linux</tt>

The platform argument is ignored for platform-inspecific eggs. An assumption is made that your Galaxy distribution is located at the same place on all of the hosts on which you're building (i.e. via a network filesystem).

Once <tt>dist-scramble.py</tt> finishes, it will output a list of platforms on which it failed to scramble the egg. Successful eggs will be put in a new <tt>dist-eggs</tt> subdirectory of your Galaxy distribution. These eggs can then be copied to your distribution site.

