<div class='newsItemHeader'>[Conda Dependencies Codefest Report](/src/news/CondaDependencyCodefestReport/index.md)</div>

The [codefest](https://github.com/galaxyproject/tools-iuc/issues/700) started via hangouts at 10am EDT on Monday April 4, with around 8 participants. It was designed to be beginner friendly, which increased contribution from the community. 4 members of the galaxy community were [added as contributors](https://github.com/bioconda/bioconda-recipes/issues/1#issuecomment-205241333) to the [bioconda-recipe repository](https://github.com/bioconda/bioconda-recipes) as a result of this hackathon.

The codefest started with [Björn Grüning](/src/BjoernGruening/index.md) giving a small introduction to [Conda](http://conda.pydata.org/docs/) and its channel [Bioconda](https://bioconda.github.io/). Followed by how to create a new Conda recipe and the scripts involved in it. Members of the hack started by then picking up a simple tool and creating a Pull request against both the [Tools-IUC](https://github.com/galaxyproject/tools-iuc) and [bioconda-recipes](https://github.com/bioconda/bioconda-recipes) repositories on GitHub.

The main aim of the codefest was to get community members familiar with the Conda-Galaxy integration, and to remove tools from testing blacklist (shown below).

More details are [here](https://github.com/galaxyproject/tools-iuc/issues/700).

<div class='right'><a href='https://github.com/galaxyproject/tools-iuc/issues/700'><img src="/src/images/Logos/Conda_480.png" alt="Conda Dependencies Codefest" width="180" /></a>
</div>

List of tools (versions) added to Bioconda:
1. Seqtk r-75
1. Shaker
1. [EDirect](https://github.com/bioconda/bioconda-recipes/pull/1198/commits/e3d19b0faf85ebac30d37a614b68ef9e8e841a50)
1. [PeptideShaker and SearchGUI](https://github.com/bioconda/bioconda-recipes/pull/1195) 
1. [OpenBabel](https://github.com/bioconda/bioconda-recipes/pull/1199)
1. [BamHash](https://github.com/bioconda/bioconda-recipes/pull/1196)
1. [Trf](https://github.com/bioconda/bioconda-recipes/pull/1212)

List of tools in [WIP]: 
1. All perl packages on osx
1. Bioconductor minfi

List of tools removed from .tt_blacklist in IUC
1. [Seqtk](https://github.com/galaxyproject/tools-iuc/pull/705)
1. [Vegan](https://github.com/galaxyproject/tools-iuc/pull/707)
1. [Art](https://github.com/galaxyproject/tools-iuc/pull/709)
1. [Macs2](https://github.com/galaxyproject/tools-iuc/pull/710)

Infrastructure:
1. [Automatic push from tested tools to the Test Tool Shed in tools-iuc](https://github.com/galaxyproject/tools-iuc/pull/708) and bgruenings [galaxytools](https://github.com/bgruening/galaxytools)
1. [More strict dependency handling in Bioconda](https://github.com/bioconda/bioconda-recipes/pull/1201) 

Thanks to everyone who participated!

[Rémi Marenco](/src/RemiMarenco/index.md). [Nitesh Turaga](/src/NiteshTuraga/index.md), and [Björn Grüning](/src/BjoernGruening/index.md)

<div class='newsItemFooter'>Posted to the [Galaxy News](/src/news/index.md) on 2016-04-07</div>

[CategoryNews](/src/CategoryNews/index.md)
