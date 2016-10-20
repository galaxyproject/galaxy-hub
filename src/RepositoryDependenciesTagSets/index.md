<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src="/src/Images/Logos/ToolShed.jpg" alt="Galaxy Main Tool Shed" height="174" /></a> </div>

# Supported repository_dependencies.xml Tag Sets

**(as of June 3, 2013)**

<table>
  <tr>
    <td> <strong>Tag</strong></td>
    <td> <strong>Attributes</strong></td>
    <td> <strong>Description</strong></td>
  </tr>
  <tr>
    <td> <code><repositories></code></td>
    <td> description (optional)</td>
    <td> The document root tag set that can contain any number of <code><repository></code> tags.</td>
  </tr>
  <tr>
    <td> <code><repository></code></td>
    <td> toolshed (optional), name(required), owner (required), changeset_revision (optional) prior_installation_required (optional)</td>
    <td> Defines a specific revision of a repository on which this repository depends.  If the toolshed is not defined, it will be automatically set to the local Tool Shed.  If defined, the changeset_revision is the minimum required version.  If the changeset_revision is not defined, it will be set to the latest installable changeset_revision for the repository defined by the name and owner.  If either the toolshed or the changeset_revision is not defined, the repository_dependencies.xml file will automatically be altered (before it is committed in the changeset) to include the attributes and values just discussed.</td>
  </tr>
</table>

