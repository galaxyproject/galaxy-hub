<div class='right'> <a href='/src/toolshed/index.md'>![Galaxy Main ToolShed](/src/images/logos/ToolShed.jpg)</a></div>

# What is the ToolShed?

The Galaxy ToolShed, in combination with certain specialized features within the Galaxy application, provides the first biomedical `AppStore`. The Galaxy ToolShed is an open web application that enables sharing “utilities” that facilitate research within a scientific domain. Galaxy is an open web application for data-intensive biomedical research. However, both Galaxy and the ToolShed are horizontal platforms that could easily provide similar benefits in other scientific domains.

# The Main Public Galaxy ToolShed

The intent of the Main Galaxy ToolShed facilitates the sharing of versioned, functionally correct Galaxy utilities across the Galaxy community. These utilities currently consist of tools and recipes for installing and compiling tool dependencies, data, custom datatypes and exported Galaxy workflows. Genomic data is made available via a specialized category of tools called Data Manager tools. The ToolShed framework also supports defining relationships between utilities so that a utility can “require” any number of other utilities in order to function. When utilities are installed into a Galaxy environment, these relationships allow for sharing a specific installation of a utility with any number of other installed utilities that require it.

The ToolShed container for “packaging” these utilities is a mercurial repository. Although mercurial provides the packaging framework for the ToolShed, a user can take advantage of virtually all of the ToolShed’s features without knowing anything about mercurial.

The mercurial repositories that are available in the Main ToolShed can be “hg cloned” or “installed” individually as a means of making their contents (utilities) available to your local Galaxy environment. This provides flexibility to those hosting their own local Galaxy instances in that they can install only those utilities in which they have interest, and are not forced to get all of them in order to get any one of them (which used to be the case when all utilities were included in the Galaxy code base).

The Galaxy code base still includes many tools developed over the past several years by the core Galaxy development teams at Penn State University and Emory University. However, no new tools have been added to the Galaxy code base for the past year – all new tools are now made available in the Main ToolShed. In addition, many of the tools originally included in the Galaxy code base have been “migrated” out of the code and into the Main ToolShed, and most of the tools currently remaining in the code base will be migrated during future Galaxy releases. As of February 12, 2014, the Main Galaxy ToolShed contains over 3,300 valid versions of tools along with uncounted other utilities (e.g., custom datatypes, exported Galaxy workflows, etc).

If you are used to Galaxy, the ToolShed will have a flavor of familiarity. Along with the top menu bar, the blue menu panel on the left provides access to the ToolShed’s features. Your initial visit to the ToolShed will display the list of utility “categories” in which repositories are contained. You can browse the repositories in each category by clicking on the name link.

# ToolSheds Supported by the Galaxy Development Team

The Test Galaxy ToolShed tracks the [galaxy](https://github.com/galaxyproject/galaxy) repository on GitHub. Use it to get introduced to the ToolShed and its rich set of features. This ToolShed is useful for maintaining repositories whose contents take advantage of new ToolShed features that will be available in the next Galaxy release.

The Main Galaxy ToolShed hosts production-ready Galaxy utilities and should not be used for testing or becoming familiar with tool shed features.
