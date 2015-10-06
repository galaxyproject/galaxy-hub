### Intended Audience
*For Developers. This document assumes technical familiarity with R/BioConductor and a good understanding of how the Galaxy Tool Shed automates tool installation.*

<span style="font-size: smaller;">
### Executive Summary

Describes using the Galaxy Tool Factory 2 to make a new tool to automate one very tedious and gnarly part of writing shareable, repeatable, self installing Galaxy analysis tools that use specific versions of R, R/BioConductor packages and their entire dependency chain. For alternative approaches to this challenge, see http://nbviewer.ipython.org/github/bgruening/notebooks/blob/master/R/extract_all_dependencies_from_an_r_package.ipynb
although the impermanence of the URLs that notebook generates at the moment may be a problem. R/BioC devs might like to try Rgalaxy http://www.bioconductor.org/packages/release/bioc/html/RGalaxy.html which runs inside R and does some of the templating by introspecting the R code http://www.bioconductor.org/packages/release/bioc/vignettes/RGalaxy/inst/doc/RGalaxy-vignette.html.
</span>

## Using the Tool Factory to make writing R/BioC tools easier

This page currently documents converting what started out as a hacky R script (see end) to generate all package dependencies for a new tool I was wrapping, into a reusable hacky tool any developer can use, available from the test toolshed under tool generators as "biocdepgen" for installation into any non-critical (please, not production) Galaxy dev instance - see https://testtoolshed.g2.bx.psu.edu/view/fubar/biocdepgen_r_3_1_2

However, the illustration is complicated by the task - so first you might need to read about why the script was needed in the first place, then about how it was re-cast as a Tool Factory (TF2) script by adding biolerplate code (copied from the TF2 tool examples) to read parameters. Using the TF2, the script was processed to create a new special purpose tool. This tool is only useful for developers - but it serves as an example of what the TF2 can do relatively quickly. Given an R script, there is now a tool available for developers to install from the test toolshed. This tool will write some of the XML 'recipe' installing all the right R dependency tarballs. This recipe ensures that specific R dependency versions are installed into the target Galaxy instance automatically when the tool is installed from a toolshed.

## Motivation: Current built-in R dependency management is mutable

Users don't normally worry about any of the following issues. R has install.packages and BioC has getBioC.R which administrators (or users!) can use to make specific packages available. Unfortunately this is a clever mechanism which automagically grabs the latest available and presumably most bug-free version for the package and all dependencies. 

R/BioC conveniently automate installation of the latest tarball of each package and all dependencies. Since these can and often do change over each R/BioC release cycle, this forms a potential hairball of gradual bugfixes over time. Tool developers will want to ensure that a particular set of (known working!) dependency tarballs are installed whenever that Galaxy tool is installed. This requires a way to automatically record what install.packages() does when the tools R dependency chain is installed at tool development, and then a way to recapitulate those steps into the installation recipe in your tool_dependencies.xml. Currently, the SOP seems to be for R/BioC Galaxy tool devs to maintain their own public repositories of tarballs. Pointing the installation recipe to those specific github tarball repositories allows us to ensure that every Galaxy installation of a given tool revision always has exactly the same dependency chain. So inter-Galaxy instance analysis of the same data with the same revision of a tool will run with exactly the same R package versions.

The dependency issue is addressed here - each individual R and BioC package developer can and often does update their package source many times during it's lifetime. The CRAN repositories now contain an archive directory with (I think!) all the old ones and the default is to install the latest (which peevishly is NOT in the archive directory). 

**A partly automated solution is the subject of the rest of this document.**

### The Art of creating shareable self installing Galaxy tools using R/BioC
 
R is a popular choice for writing code to perform analyses in many areas of bioinformatics, so many day to day analysis tasks include R and perhaps BioConductor code. Assuming you can make or acquire some R code that does "the needful" and works correctly, you are no doubt reading this because you know from bitter experience that the R command line is not an ideal interface for biologists lacking technical skills. 

More importantly, truly repeatable R analyses require using the same specific versions of the R executable to run the same version of each package loaded by the R script itself. Even that is not quite sufficient because those loaded packages themselves typically have their own dependency version chains. Typically, the local system R is updated opportunistically in response to users wanting the latest bug fixes and updates, so reliable tool dependency chain version reproducibility is almost never guaranteed, except in rare circumstances where the system administrator or lack of one prevents any change. 

The Galaxy computational analysis framework facilitates exposing R (and other) code as standard, repeatable Galaxy analysis tools, efficiently hiding most of the technical detail while exposing the functionality to biologists and other analysts in workflow enabled, flexible workspaces. Even better, as a developer, it allows you to package up your R code and the entire chain of dependent packages into a self-installing Galaxy tool for others to easily install from a tool shed for their users to use.

As developers quickly discover, each new Galaxy tool requires some hand coding of what is essentially predictable boilerplate. It is possible to create relatively simple new tools using a specialised Galaxy tool to generate all the biolerplate required to wrap scripts - the Tool Factory. Generated tools are in the form of a Tool Shed repository tarball and include the XML defining the recipe to install the script as a tool. The more recent Tool Factory 2 allows arbitrary parameters to be included in the generated tool, multiple input files and also enables the script to be reproducibly executed by a specific toolshed packaged version of the appropriate interpreter (eg package_r_3_1_2) if desired.

This page concerns processes developers will face toward the end of the tool development process, when the working script is being converted into a self-installing tool shed repository, including using "setup_r_environment" to install a long list of package and dependency tarball URLs in a tool_dependencies.xml file, to make your work available to any Galaxy user. If that sounds interesting, read on. For an example of the horrors you may face, see [#tdxml](#tdxml)


## tool_dependencies.xml

In order for your script to run reproducibly, the entire dependency chain must be in place every time it runs. That means the system R is useless because it might change. A Galaxy tool repository in the Tool Shed can be automatically installed to any Galaxy. That requires a "recipe" for installing the code, R/BioC packages and the Rscript interpreter itself in a way that can be reliably called to run your script. The tool_dependencies.xml file in a repository is responsible for that and the tool shed documentation is the place to find all the details - particularly concerning setup_r_environment at https://wiki.galaxyproject.org/ToolDependenciesTagSets?highlight=%28setup_r%29 Each dependent R package needs a <package> entry in the recipe which we're trying to at least partially automate by running some R code to do the job as a Galaxy tool for developers. Here's a partly hand built example (from the Differential Count tool) that includes the <package> lines automatically generated by the biocdepgen tool requiring ourpackages something like "edgeR DESeq2 limma Matrix"

<<Anchor(TDXML)>>

```

<?xml version="1.0"?>
<tool_dependency>
    <package name="R" version="3.1.2">
        <repository changeset_revision="f0626dac6765" name="package_r_3_1_2" owner="iuc" prior_installation_required="True" toolshed="https://testtoolshed.g2.bx.psu.edu" />
    </package>
    <package name="graphicsmagick" version="1.3.18">
        <repository changeset_revision="bff3f66adff2" name="package_graphicsmagick_1_3" owner="iuc" prior_installation_required="True" toolshed="https://testtoolshed.g2.bx.psu.edu" />
    </package>
    <package name="ghostscript" version="9.10">
        <repository changeset_revision="9345d2740f0c" name="package_ghostscript_9_10" owner="devteam" prior_installation_required="True" toolshed="https://testtoolshed.g2.bx.psu.edu" />
    </package>

    <package name="biocbasics" version="2.14">
        <install version="1.0">
            <actions>
                <action type="setup_r_environment">
                    <repository changeset_revision="f0626dac6765" name="package_r_3_1_2" owner="iuc" toolshed="https://testtoolshed.g2.bx.psu.edu">
                        <package name="R" version="3.1.2" />
                    </repository>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/diffcount/RColorBrewer_1.1-2.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/diffcount/stringr_0.6.2.tar.gz?raw=true</package>

============about 50 similar lines removed - this is the boilerplate the biocdepgen tool generates============

                </action>
            </actions>
        </install>
        <readme>
        Differential gene expression analysis
        You may need libxml2-dev for XML to compile
        Ubuntu has a bug with libgfortran. To fix that create a symlink like: sudo ln -s /usr/lib/x86_64-linux-gnu/libgfortran.so.3 /usr/lib/x86_64-linux-gnu/libgfortran.so
        </readme>
    </package>
</tool_dependency>

```

## sessionInfo() is our friend

This handy R command can make your tool development life much easier. Executing the R command sessionInfo() at the end of your R code will document all loaded R dependencies including their versions, providing important information for your new tool's tool_dependencies.xml. This information must be used to ensure that Galaxy's tool installer makes sure that all the right R packages and their dependencies are installed locally to ensure reliable automated tool shed installation and thus wide sharing of your R code and work.

## Tests are our friends

The tool factory requires real data as input(s) to run because like people installing your new generated tool it wants to make sure your code works. So you must supply some for the tool generation step. You'll need to upload them (or if tiny, create them using the url/paste box of the upload form) before your run the Tool Factory with your script. Please make those as SMALL as you can because they will become part of the generated tool if everything runs correctly. Those test inputs and the resulting outputs are used by Galaxy's automated tool shed tests and they at least assure everyone that your tool produces consistent output from one set of data.


## Automated BioConductor and R repository dependency acquisition

Obtaining all required dependencies for any given R or BioC package is a little complex because once you have the entire list of dependencies for a group of packages, the installation order for dependencies becomes crucial - there may be many orders but you need one that works for automated Galaxy tool installation. Some stand alone code is shown below for those wanting a stand alone Rscript to generate dependencies. 

## Suggested Workflow: from script to tool_dependencies.xml

Start with your R script. Include sessioInfo() somewhere at the end.
Prepare small test data
Run script manually and note "other attached packages:" - these become ourpackages for the biocdepgen.

In the admin panel of a disposable development only Galaxy, install biocdepgen for the target R (eg 3.1.2) package (see https://fubar@testtoolshed.g2.bx.psu.edu/repos/fubar/biocdepgen_r_3_1_2) from the Test toolshed
(restart if you have more than one handler!)
Start that tool.
Set the parameters - ourpackages from sessionInfo, the tarpath to where Galaxy has permission to write all the packages and dependency tarballs, and the prefix you want for each <prefix entry in the generated XML boilerplate for your tool_dependecies.xml
Execute it

Take the output XML and insert it into something like the sample tool_dependency.xml shown below - where the <packages> rows have been edited.

(Generating the rest of that XML recipe is easy using TF2 like I did to generate biocdepgen - or harder by writing a tool by hand. 
Using the TF2 takes minutes and since it generates a tool archive, you can unpack it and edit it before repackaging it for a tool shed upload)

## "Send code"

Here's a version that can be cut/paste into the new tool factory 2 if you also define and populate 3 text input fields called tardir (local writeable directory target to save all the dependency tarballs), xmlprefix (xml biolerplate <package> stanza to point at your public tarball repository - eg I use github) and ourpackages (space delimited list of required package names - no version numbers - they will be found automagically for the version of R associated with the tool - 3.1.2) so they are passed in to this script. 

For package_r_3_1_2 you can install the tool I generated using the code shown below and for that specific R package https://testtoolshed.g2.bx.psu.edu/view/fubar/biocdepgen_r_3_1_2

```

packageExpand = function(packagelist,fl) {
# get packagelist name's (eg edgeR's) corresponding gz filename which includes version from filelist fl
# return some xml describing where it can be downloaded from for a setup_r_packages call
  res = NULL
  for (i in c(1:length(packagelist))) {
    s = packagelist[i]
    ls = nchar(s)
    spos = which(substr(fl,1,ls) == s,arr.ind=T)
    lspos = length(spos)
    if (lspos > 0)
      {
      fullname = fl[spos] 
      if (grepl('*.gz',fullname)) {
           row = paste(ps,fullname,pe,sep=*)
           res = append(res,row)
           }
      }
    }
  return(res)
}

getPackages = function(packs)
  {
  packages = unlist(tools::package_dependencies(packs, available.packages(),
        which=c("Depends", "Imports"), recursive=TRUE))
  packages = union(packs, packages)
  packages
  }

ourargs = commandArgs(TRUE)
if(length(ourargs)==0){
      print("No arguments supplied.")
   }else{
   for(i in 1:length(ourargs)){
        eval(parse(text=ourargs[/i](/i)))
   }
}

unesc = function(x) {
   #### needed to deal with galaxy escaping <> in passing the xml string we need - don't try this at home kids.
   res = x
   res = gsub('<u>lt__','<',res)
   res = gsub('</u>gt__','>',res)
   return(res)
}


ifreq = function(pkg='DESeq2') {
  if(require(package=pkg,character.only = T)){
    print(paste(pkg,"is loaded correctly"))
    } else {
    print(paste("trying to install",pkg))
    install.packages(pkg)
    if(require(package=pkg,character.only = T)){
      print(paste(pkg,"installed and loaded correctly"))
      } else {
      stop(paste("Could not install",pkg))
    }
  }
}

our_packages = strsplit(ourpackages," ")[/1](/1)
ps=unesc(xmlprefix)
pe="?raw=true</package>"
print(paste('tardir=',tardir,'xmlprefix=',xmlprefix,'ourpackages=',ourpackages,'OUTPATH=',OUTPATH))
setRepositories(ind=1:2)
chooseBioCmirror(ind=7,graphics=F) # canberra - use eg 1 for FredHutch
chooseCRANmirror(ind=5,graphics=F) # Melbourne - use 96 for texas
ifreq(pkg="BiocInstaller")
ifreq(pkg="pkgDepTools")
ifreq(pkg="Biobase")

print.noquote('Greetings. The R you have chosen to run is fated to use the following repositories:')
print.noquote(biocinstallRepos())
packages = getPackages(our_packages)
download.packages(pkgs=packages,destdir=tardir, type="source", repos=biocinstallRepos())
flist = list.files(tardir)
allDeps = makeDepGraph(biocinstallRepos(), type="source", keep.builtin=F, dosize=F)
res = NULL
for (i in c(1:length(our_packages))) {
  package = our_packages[i]
  io = getInstallOrder(package, allDeps, needed.only=FALSE)
  ares = packageExpand(packagelist=io$packages,fl=flist)
  res = append(res,ares)
  }
ures = unique(res)
tout = "savedeps.xml"
write.table(ures,file=tout,quote=F,sep="\t",row.names=F,col.names=F)
write.table(ures,file=OUTPATH,quote=F,sep="\t",row.names=F,col.names=F)
print.noquote(res)
sessionInfo()
print.noquote(date())

```



## Stand alone Rscript version - be sure to run this with the target R version!

**The code below was a first stab at a re-usable stand alone Rscript to help developers. Code for the Tool Factory 2 to generate a new tool which does this is shown above. For package_r_3_1_2 https://testtoolshed.g2.bx.psu.edu/view/fubar/biocdepgen_r_3_1_2 can be installed from the test toolshed.**

It is shown setup to prepare the tool_dependencies.xml boiler plate for automated Galaxy tool shed installation of an R based tool using glmnet in R for penalised regression. The package list in "our_packages" comes from sessionInfo() after running the tool R script. The code below will figure out all dependencies for your packages and the order they need to be installed. It will write a text file containing the package names as strings prefixed with ps and pe which will be in the correct order for R installation using setup_r_environment - the actual output appears below the code.

**NOTE** it must be executed using the Rscript from the R package you will refer to when running setup_r_environment or you will get the wrong versions of packages - remember R and BioConductor have a synchronised release schedule every 6 months and package versions are specific to a specific pair of R/BioC releases. Here's an easy way I use to locate and source a specific R package from a Galaxy installation.

```
~/galaxy_tool_source$ which R
/usr/bin/R
~/galaxy_tool_source$ locate env.sh | grep package_r_3_1_2
/mnt/galaxy/tools/R/3.1.2/iuc/package_r_3_1_2/f0626dac6765/env.sh
~/galaxy_tool_source$ source /mnt/galaxy/tools/R/3.1.2/iuc/package_r_3_1_2/f0626dac6765/env.sh
~/galaxy_tool_source$ which R
/mnt/galaxy/tools/R/3.1.2/iuc/package_r_3_1_2/f0626dac6765/bin/R
```


<span style="font-size: smaller;">
```
# for tool_dependency generation
# replace ps, destdir, our_packages etc to suit your own needs
# ross lazarus
# bah! humbug!
# dec 24 2014


destdir = '~/galaxy_tool_source/RELEASE_2_14/rglasso'
libdir = '~/galaxy_tool_source/RELEASE_2_14/rglasso'
our_packages = c('RColorBrewer','e1071','caret','pROC','Hmisc','pracma','survival','lars','glmnet','pec')
#  <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/Rcpp_0.11.3.tar.gz?raw=true</package>
ps='<package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/'
pe='?raw=true</package>'

library("pkgDepTools")
library("Biobase")

if(require("BiocInstaller")){
  print("BiocInstaller is loaded correctly")
} else {
  print("trying to install BiocInstaller")
  install.packages("BiocInstaller")
  if(require(BiocInstaller)){
    print("BiocInstaller installed and loaded")
  } else {
    stop("could not install BiocInstaller")
  }
}

setRepositories(ind=1:2)
chooseBioCmirror(ind=7,graphics=F) # canberra - use eg 1 for FredHutch
chooseCRANmirror(ind=5,graphics=F) # Melbourne - use 96 for texas


packageExpand = function(packagelist,fl) {
  res = c()
  for (i in c(1:length(packagelist))) {
    s = packagelist[i]
    ls = nchar(s)
    spos = which(substr(fl,1,ls) == s,arr.ind=T)
    lspos = length(spos)
    if (lspos > 0)
      {
      fullname = fl[spos] ## take last one
      ## print.noquote(paste('### spos=',paste(spos,collapse=','),'for',fullname))
      if (grepl('*.gz',fullname)) {
           row = paste(ps,fullname,pe,sep=*)
           res = append(res,row)
           } else {
            print(paste('### ignoring',fullname))
           }
      }
    }
  return(res)
}

getPackages <- function(packs)
  {
  packages <- unlist(tools::package_dependencies(packs, available.packages(),
        which=c("Depends", "Imports"), recursive=TRUE))
  packages <- union(packs, packages)
  packages
  }

packages <- getPackages(our_packages)

download.packages(pkgs=packages,destdir=libdir, type='source',repos=biocinstallRepos())
flist = list.files(libdir)
print.noquote(flist)
biocUrl <- biocinstallRepos()["BioCsoft"]
print('making dependency graph - takes a while')
allDeps <- makeDepGraph(biocinstallRepos(), type="source",keep.builtin=F, dosize=FALSE)
res = c()
for (i in c(1:length(our_packages))) { 
  package = our_packages[i]
  io = getInstallOrder(package, allDeps, needed.only=FALSE)
  ares = packageExpand(packagelist=io$packages,fl=flist)
  print(paste('#For',package,'got',paste(ares,collapse=';')))
  res = append(res,ares)
  }
ures = unique(res)
outR = paste(destdir,'rglasso_deps.R',sep='/')
write.table(ures,file=outR,quote=F,sep='\t',row.names=F)
print.noquote(ures)
sessionInfo()

```

</span>

With the right R, running this code generates a directory full of files for my github R dependency library and the following fragment of xml I can use in the tool's tool_dependencies.xml file to specify a working set of packages and dependencies in correct order for installation. 

**WARNING** 
Unfortunately, packages with NO dependencies like RColorBrewer will sometimes appear after packages which depend on them are listed. This odd bug may be because they do not correctly specify their dependency on RColorBrewer correctly (lattice-extra?) or a bug in the way pkgDepTools works - whatever, you may need to discover this stupidity and name those odd bods at the start of your "our_packages" package list.

After running the above code, the file rglasso_deps.R contains

<span style="font-size: smaller;">
```
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/RColorBrewer_1.1-2.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/MASS_7.3-35.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/class_7.3-11.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/e1071_1.6-4.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/latticeExtra_0.6-26.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/Rcpp_0.11.3.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/plyr_1.8.1.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/digest_0.6.8.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/gtable_0.1.2.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/stringr_0.6.2.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/reshape2_1.4.1.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/dichromat_2.0-0.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/colorspace_1.2-4.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/munsell_0.4.2.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/labeling_0.3.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/scales_0.2.4.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/proto_0.3-10.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/ggplot2_1.0.0.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/nnet_7.3-8.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/caret_6.0-41.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/codetools_0.2-9.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/iterators_1.0.7.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/foreach_1.4.2.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/nlme_3.1-118.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/Matrix_1.1-4.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/minqa_1.2.4.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/nloptr_1.0.4.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/lme4_1.1-7.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/profileModel_0.5-9.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/brglm_0.5-9.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/gtools_3.4.1.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/BradleyTerry2_1.0-5.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/pROC_1.7.3.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/survival_2.37-7.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/Formula_1.1-2.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/cluster_1.15.3.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/rpart_4.1-8.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/acepack_1.3-3.3.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/foreign_0.8-62.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/Hmisc_3.14-6.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/pracma_1.7.9.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/lars_1.2.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/glmnet_1.9-8.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/KernSmooth_2.23-13.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/numDeriv_2012.9-1.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/lava_1.3.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/prodlim_1.5.1.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/SparseM_1.6.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/quantreg_5.05.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/polspline_1.1.9.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/mvtnorm_1.0-2.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/TH.data_1.0-6.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/zoo_1.7-11.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/sandwich_2.3-2.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/multcomp_1.3-8.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/rms_4.2-1.tar.gz?raw=true</package>
                    <package>https://github.com/fubar2/galaxy_tool_source/blob/master/RELEASE_2_14/rglasso/pec_2.4.4.tar.gz?raw=true</package>

```

</span>

Not bad for just a few packages - and as you can imagine, a real pain to get right without automation.
