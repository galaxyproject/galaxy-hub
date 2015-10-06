
#language en
INCLUDE(/Admin/LinkBox)

# What are Data Managers?

Data Managers are a special class of Galaxy tool which allows for the download and/or creation of data that is stored within [Tool Data Tables](/Admin/Tools/Data Tables) and their underlying flat (e.g. .loc) files. These tools handle e.g. the creation of indexes and the addition of entries/lines to the data table / .loc file via the Galaxy admin interface. 

Data Managers can be defined locally or installed through the Tool Shed.

# A Video Introduction

For a video overview on Data Managers, see this [presentation from GCC2013](http://vimeo.com/74265510).

# Tutorial

The most up-to-date methods, including how to use Data Manager repositories in the [/ToolShed](/ToolShed): [/Events/GCC2014/TrainingDay.md#tool_development_from_bright_idea_to_toolshed_-_data_managers](/Events/GCC2014/TrainingDay.md#tool_development_from_bright_idea_to_toolshed_-_data_managers)

# What Kind of Data is Supported

The Data Manager framework supports any kind of built-in ("pre-cached") data that a tool developer would like to make available via a [Tool Data Table](/Admin/Tools/Data Tables). This includes reference genomes, indexes on a reference genome, Blast databases, protein or pathway domain databases, and so-on. This built-in data does not need to be associated with any type of reference, build, or dbkey (genomic or otherwise), but, in many cases, Tool Data Table entries and their Data Manager will be tied to a specific genomic build.

# Graphical Overview of Interplay between Built-in Data and Galaxy Tools

<a href='/attachment:data_managers_figure_S1_schematic_overview.png'><img src='/data_managers_figure_S1_schematic_overview.png' alt='' width=600 /></a> 

# List of pages in this category

<<FullSearchCached(category:Admin/Tools/DataManagers)>>
<<FullSearchCached(category:Admin/Tools/DataManagers/)>>
<<FullSearchCached(category:Admin/Tools/DataManagers/DataManagerXMLSyntax)>>
<<FullSearchCached(category:Admin/Tools/DataManagers/DataManagerXMLSyntax/)>>
<<FullSearchCached(category:Admin/Tools/DataManagers/DataManagerJSONSyntax)>>
<<FullSearchCached(category:Admin/Tools/DataManagers/DataManagerJSONSyntax/)>>
<<FullSearchCached(category:Admin/Tools/DataManagers/API)>>
<<FullSearchCached(category:Admin/Tools/DataManagers/API/)>>
<<FullSearchCached(category:Admin/Tools/DataManagers/Testing)>>
<<FullSearchCached(category:Admin/Tools/DataManagers/Testing/)>>
<<FullSearchCached(category:Admin/Tools/DataManagers/HowTo)>>

# See also

* [/Admin/Tools/Data Tables](/Admin/Tools/Data Tables)

----

[/Admin/Tools/DataManagers](/Admin/Tools/DataManagers)
