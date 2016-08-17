### Check your Python version

Galaxy's core functionality is compatible with **Python** versions **2.6** and **2.7**. (Version 2.5 support was last included in the [April 1, 2013 Distribution](/DevNewsBriefs/2013_04_01/#python_25_support_ending_soon)). Before reporting bugs, please ensure that `python --version` reports one of these two versions. If this is not the case, a simple solution is to manipulate your shell's `$PATH` variable to place the correct version first. This can be done for only Python by creating a new directory at the front of `$PATH` and creating a symbolic link to python in that directory: 

```
#!highlight sh
% mkdir ~/galaxy-python
% ln -s /path/to/python2.7 ~/galaxy-python/python
% export PATH=~/galaxy-python:$PATH
```


If you've compiled your own Python interpreter from source, please ensure that the `ssl, sqlite3, curses` and `bz2` modules build and can be imported after installation.  These "extra" modules are built at the end of the compilation process and are required by the Galaxy framework.  If building on Linux, you may need to install the appropriate `-dev` packages for OpenSSL and Bzip2.
