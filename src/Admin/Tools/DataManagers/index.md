PLACEHOLDER_INCLUDE(/src/Admin/LinkBox/index.md)

# What are Data Managers?

Data Managers are a special class of Galaxy tool which allows for the download and/or creation of data that is stored within [Tool Data Tables](/src/Admin/Tools/Data Tables/index.md) and their underlying flat (e.g. .loc) files. These tools handle e.g. the creation of indexes and the addition of entries/lines to the data table / .loc file via the Galaxy admin interface. 

Data Managers can be defined locally or installed through the Tool Shed.

# A Video Introduction

For a video overview on Data Managers, see this [presentation from GCC2013](http://vimeo.com/74265510).

# Tutorial

The most up-to-date methods, including how to use Data Manager repositories in the [ToolShed](/src/ToolShed/index.md): [Events/GCC2014/TrainingDay](/src/Events/GCC2014/TrainingDay/index.md#tool_development_from_bright_idea_to_toolshed_-_data_managers)

# What Kind of Data is Supported

The Data Manager framework supports any kind of built-in ("pre-cached") data that a tool developer would like to make available via a [Tool Data Table](/src/Admin/Tools/Data Tables/index.md). This includes reference genomes, indexes on a reference genome, Blast databases, protein or pathway domain databases, and so-on. This built-in data does not need to be associated with any type of reference, build, or dbkey (genomic or otherwise), but, in many cases, Tool Data Table entries and their Data Manager will be tied to a specific genomic build.

# Graphical Overview of Interplay between Built-in Data and Galaxy Tools

<a href='/src/attachment:data_managers_figure_S1_schematic_overview.png/index.md'><img src="/src/Admin/Tools/DataManagers/data_managers_figure_S1_schematic_overview.png" alt="" width=600 /></a> 

# List of pages in this category

PLACEHOLDER_FULL_SEARCH_CACHED(category:Admin/Tools/DataManagers)
PLACEHOLDER_FULL_SEARCH_CACHED(category:Admin/Tools/DataManagers/)
PLACEHOLDER_FULL_SEARCH_CACHED(category:Admin/Tools/DataManagers/DataManagerXMLSyntax)
PLACEHOLDER_FULL_SEARCH_CACHED(category:Admin/Tools/DataManagers/DataManagerXMLSyntax/)
PLACEHOLDER_FULL_SEARCH_CACHED(category:Admin/Tools/DataManagers/DataManagerJSONSyntax)
PLACEHOLDER_FULL_SEARCH_CACHED(category:Admin/Tools/DataManagers/DataManagerJSONSyntax/)
PLACEHOLDER_FULL_SEARCH_CACHED(category:Admin/Tools/DataManagers/API)
PLACEHOLDER_FULL_SEARCH_CACHED(category:Admin/Tools/DataManagers/API/)
PLACEHOLDER_FULL_SEARCH_CACHED(category:Admin/Tools/DataManagers/Testing)
PLACEHOLDER_FULL_SEARCH_CACHED(category:Admin/Tools/DataManagers/Testing/)
PLACEHOLDER_FULL_SEARCH_CACHED(category:Admin/Tools/DataManagers/HowTo)

# See also

* [Admin/Tools/Data Tables](/src/Admin/Tools/Data Tables/index.md)

----

[Admin/Tools/DataManagers](/src/Admin/Tools/DataManagers/index.md)
