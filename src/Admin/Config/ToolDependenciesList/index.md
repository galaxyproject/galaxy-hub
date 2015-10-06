Per IUC email thread, the following libraries and packages have been suggested as base requirements for installing tool dependencies:

## REQUIRED
* autoconf                 
* automake
* autotools 
* build-essential
* gfortran
* cmake
* git-core --> (currently that does not make much sense, because we can't <setup_environment> before cloning from git, right?)
* libatlas-base-dev --> BG tried but under OS-X installation failed 
* libblas-dev --> (https://testtoolshed.g2.bx.psu.edu/view/iuc/package_atlas_3_10 testing needed)
* liblapack-dev -> BG tried but under OS-X installation failed
* libc6-dev --> that one makes us haedage ... USCS binaries requires a relative new version, old binaries are not available anymore                 
* mercurial --> chicken-and-egg problem
* python2.6
* subversion 
* python-dev
* pkg-config
* openssl / libopenssl-dev
* Java (for tools that are using the JRE/JDK, currently the TS is not able to install Java for you)                

## WIP or Done
    
* bison [ http://toolshed.g2.bx.psu.edu/view/iuc/package_bison_3_0 ]
* coreutils [ http://toolshed.g2.bx.psu.edu/view/iuc/package_gnu_coreutils_8_21 ]      
* expat [ http://toolshed.g2.bx.psu.edu/view/iuc/package_expat_2_1 ]                     
* gawk [ http://toolshed.g2.bx.psu.edu/view/iuc/package_gnu_awk_4_1_0 ]
* gsl-bin [ http://toolshed.g2.bx.psu.edu/view/iuc/package_gsl_1_16 ]             
* libgsl0-dev [ http://toolshed.g2.bx.psu.edu/view/iuc/package_gsl_1_16 ]
* imagemagick --> graphicsmagick [ http://toolshed.g2.bx.psu.edu/view/iuc/package_graphicsmagick_1_3 ]
* libbz2-dev [ http://toolshed.g2.bx.psu.edu/view/iuc/package_bzlib_1_0 ]
* libcurl4-openssl-dev [ http://toolshed.g2.bx.psu.edu/view/iuc/package_libcurl_7_35 ]
* libeigen3-dev [ http://toolshed.g2.bx.psu.edu/view/iuc/package_eigen_3_1 , also devteam has version 3.2]
* libffi-dev [ http://toolshed.g2.bx.psu.edu/view/iuc/package_libffi_3_0 ]
* libgd2-xpm-dev [ http://toolshed.g2.bx.psu.edu/view/iuc/package_libgd_2_1 ]
* libgdbm-dev [ http://toolshed.g2.bx.psu.edu/view/iuc/package_gdbm_1_11 ]               
* libnetcdf-dev [ http://toolshed.g2.bx.psu.edu/view/iuc/package_netcdf_4_3 ]
* libncurses5-dev [ http://toolshed.g2.bx.psu.edu/view/iuc/package_ncurses_5_9 ]              
* libpcre3-dev  [ http://testtoolshed.g2.bx.psu.edu/view/iuc/package_pcre_8_34 ]               
* libreadline-dev [ http://toolshed.g2.bx.psu.edu/view/iuc/package_readline_6_2 ]
* libpng12-dev [ http://toolshed.g2.bx.psu.edu/view/devteam/package_libpng_1_6_7 , devteam]                
* libssl-dev [ http://toolshed.g2.bx.psu.edu/view/iuc/package_openssl_1_0 ]
* libsqlite3-dev [ http://toolshed.g2.bx.psu.edu/view/iuc/package_sqlite_3_8_3 ]          
* libxml2 [devteam]
* libtool [ http://toolshed.g2.bx.psu.edu/view/iuc/package_libtool_2_4 ]             
* libxslt1-dev [devteam, http://toolshed.g2.bx.psu.edu/view/devteam/package_libxslt_1_1_28]
* libxslt1.1 [devteam, http://toolshed.g2.bx.psu.edu/view/devteam/package_libxslt_1_1_28] 
* libyaml-dev [ http://toolshed.g2.bx.psu.edu/view/iuc/package_libyaml_0_1_5 ]
* libzip-dev  [ http://toolshed.g2.bx.psu.edu/view/iuc/package_zlib_1_2_8 ]                 
* sed [ http://toolshed.g2.bx.psu.edu/view/iuc/package_gnu_sed_4_2_2_sandbox ]
* xz-utils [ http://toolshed.g2.bx.psu.edu/view/iuc/package_xz_5_0_5 ] 
* libhdf5 [ http://toolshed.g2.bx.psu.edu/view/iuc/package_hdf5_1_8_12 ] 
* unzip [ http://toolshed.g2.bx.psu.edu/view/iuc/package_unzip_6_0 ]
* qt-devel [BG]
* qtwebkit-devel [BG, I think its inlcuded in the qt reppository]           
* liblzma-dev  -> xz utils is the successor, is that really needed?

## Volunteers ?
* patch
* gnuplot
* pdfjam [Hard, it need a latex installation]                      
* libfuse-dev [is fuse Linux only?]
* libsparsehash-dev
* mime-support                  
* tk-dev                       
* uuid-dev
* uuid                         
* tcl-dev
* swig                   



[BG] = there are packages hosted under https://github.com/bgruening/galaxytools/ contributions welcome.

[CBD] = can be done, please label accordingly, BG will take care of creating the package for it; CBD means something like it makes sense to include it as package, for example mercurial makes no sense to include as dependency, right?
CBD, also means that it will be done, most of them are already in the test-toolshed.



## Perl libraries

Perl libraries can be easily installed with the new perl installation routines.
See an example here: https://github.com/bgruening/galaxytools/tree/master/test_repositories/setup_perl_environment

* cpanminus [BG] included in the perl package
* perl-modules
* libperl-dev
* libextutils-autoinstall-perl
* libextutils-cbuilder-perl    
* liblocal-lib-perl            
* libmodule-build-perl
* libmodule-install-perl    
