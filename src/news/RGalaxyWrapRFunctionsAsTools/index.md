---
date: 2012-06-28T17:57:47Z
---
<div class='newsItemHeader'>[RGalaxy: Wrap R Functions as Tools](/src/News/RGalaxyWrapRFunctionsAsTools/index.md)</div>

<div class='right'><a href='http://bioconductor.org/packages/2.11/bioc/html/RGalaxy.html'><img src='/Images/Logos/BioconductorLogo.gif' alt='RGalaxy Bioconductor Package' width="200" /></a></div>

Normally, in order to expose an [R function](http://www.r-project.org/) as a tool in a Galaxy instance, you need to manually create an XML fi
le with information about the function, and modify an additional XML 
file.  The new [RGalaxy package](http://bioconductor.org/packages/2.11/bioc/html/RGalaxy.html) in [Bioconductor](http://bioconductor.org/) automates this process, pulling most of the necessary information from the R function itself and its manual page (you provide the remaining information as arguments to the Galaxy function).

[RGalaxy](http://bioconductor.org/packages/2.11/bioc/html/RGalaxy.html) itself comes with a [man page](http://bioconductor.org/packages/2.11/bioc/vignettes/RGalaxy/inst/doc/Rgalaxy-vignette.pdf), and a [reference manual](http://bioconductor.org/packages/2.11/bioc/manuals/RGalaxy/man/RGalaxy.pdf). 

Please note that the package is now available only in the development branch of Bioconductor. So to install it, you need to have R-2.15, and do the following:
```python
source("http://bioconductor.org/biocLite.R")
useDevel()
biocLite("RGalaxy")
```


Dan Tenenbaum<br />
[Bioconductor Core Team](http://www.bioconductor.org/about/core-team/)<br />
[Fred Hutchinson Cancer Research Center](http://www.fhcrc.org/)


CategoryNews
