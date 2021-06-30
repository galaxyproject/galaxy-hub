<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'>![Galaxy Main Tool Shed](/src/images/logos/ToolShed.jpg)</a> </div>

# Supported repository_dependencies.xml Tag Sets

**(as of June 3, 2013)**

|Tag|Attributes|Description|
|---|---|---|
|```<repositories>```|description (optional)|The document root tag set that can contain any number of ```<repository>``` tags.|
|```<repository>```|toolshed (optional), name(required), owner (required), changeset\_revision (optional) prior\_installation\_required (optional)|Defines a specific revision of a repository on which this repository depends.  If the toolshed is not defined, it will be automatically set to the local Tool Shed.  If defined, the changeset\_revision is the minimum required version.  If the changeset\_revision is not defined, it will be set to the latest installable changeset\_revision for the repository defined by the name and owner.  If either the toolshed or the changeset\_revision is not defined, the repository\_dependencies.xml file will automatically be altered (before it is committed in the changeset) to include the attributes and values just discussed.|
