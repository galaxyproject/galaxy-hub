---
title: The Tool Shed API
---
<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'>![Galaxy Main Tool Shed](/src/images/logos/ToolShed.jpg)</a> </div>




The RESTful Tool Shed API currently provides the following features. These API features will be enhanced over time.

* GET **/api/repositories**
  Returns a list of dictionaries that include information about all repositories.
* GET **/api/repositories/{encoded\_repository\_id}**
  Returns a dictionary that includes information about a specified repository.
* GET **/api/repositories/get\_ordered\_installable\_revisions**
  * param name: the name of the repository
  * param owner: the owner of the repository
  Returns the ordered list of changeset revision hash strings that are associated with installable revisions. As in the changelog, the list is ordered oldest to newest.
* GET **/api/repositories/get\_repository\_revision\_install\_info**
  * param name: the name of the repository
  * param owner: the owner of the repository
  * param changset\_revision: the changset\_revision of the `RepositoryMetadata` object associated with the repository
  Returns a list of the following dictionaries:
  * a dictionary defining the repository
  * a dictionary defining the repository revision (`RepositoryMetadata`)
  * a dictionary including the additional information required to install the repository
* GET **/api/repository\_revisions**
  Returns a (possibly filtered) list of dictionaries that include information about all repository revisions. The following parameters can be used to filter the list.
  * downloadable ( True / False )
  * malicious ( True / False )
  * tools\_functionally\_correct ( True / False )
  * missing\_test\_components ( True / False )
  * do\_not\_test ( True / False )
  * includes\_tools ( True / False )
  * test\_install\_error ( True / False )
  * skip\_tool\_test ( True / False )
* GET **/api/repository\_revisions/{encoded\_repository\_metadata\_id}**
  Returns a dictionary that includes information about a specified repository revision.
* GET **/api/repository\_ids\_for\_setting\_metadata**
  Returns a list of repository ids ordered for setting metadata.
  * param my\_writable: optional boolean value to enable filtering the list to those repositories for which the current user has write authorization.
* POST **/api/reset\_metadata\_on\_repositories/{payload}**
  Resets all metadata on specified repositories in the Tool Shed in an "orderly fashion". The order in which metadata is reset is repositories of type tool\_dependecy\_definition first followed by repositories of type unrestricted.
  * param my\_writable: optional boolean value to enable filtering the list to those repositories for which the current user has write authorization.
  * param encoded\_ids\_to\_skip: optional list of encoded repository ids for repositories that should not be processed.
  * param skip\_file: optional local file name that contains the encoded repository ids associated with repositories to skip. This param can be used as an alternative to the above encoded\_ids\_to\_skip.
* POST **/api/reset\_metadata\_on\_repository/{payload}**
  Resets all metadata on a specified repository in the Tool Shed.
  * param repository\_id: required encoded id of the repository on which metadata is to be reset.
* POST **/api/repository\_revisions/{encoded\_repository\_metadata\_id}/{payload}**
  Updates the value of specified columns of the repository\_metadata table based on the key/value pairs in payload dictionary. This API call requires the use of an API key that guarantees the user is a tool shed administrator.

# Galaxy API features for the Tool Shed

The RESTful Galaxy API includes the following features that work with the Tool Shed. These API features will be enhanced over time.

* GET **/api/tool\_shed\_repositories**
  Returns a list of dictionaries containing information about installed tool shed repositories.
* GET **/api/tool\_shed\_repositories/{encoded\_tool\_shed\_repository\_id}**
  Returns a dictionary containing information about a specified installed tool\_shed\_repository.
* POST **/api/tool\_shed\_repositories/new/install\_repository\_revision**
  * param key: the current Galaxy admin user's API key
  The following parameters are included in the payload.
  * param tool\_shed\_url (required): the base URL of the Tool Shed from which to install the repository
  * param name (required): the name of the repository
  * param owner (required): the owner of the repository
  * param changeset\_revision (required): the changeset\_revision of the `RepositoryMetadata` object associated with the repository
  * param new\_tool\_panel\_section\_label (optional): label of a new section to be added to the Galaxy tool panel in which to load tools contained in the repository. Either this parameter must be an empty string or the tool\_panel\_section\_id parameter must be an empty string or both must be an empty string (both cannot be used simultaneously).
  * param tool\_panel\_section\_id (optional): id of the Galaxy tool panel section in which to load tools contained in the repository. If this parameter is an empty string and the above new\_tool\_panel\_section\_label parameter is an empty string, tools will be loaded outside of any sections in the tool panel. Either this parameter must be an empty string or the tool\_panel\_section\_id parameter must be an empty string of both must be an empty string (both cannot be used simultaneously).
  * param install\_repository\_dependencies (optional): Set to True if you want to install repository dependencies defined for the specified repository being installed. The default setting is False.
  * param install\_tool\_dependencies (optional): Set to True if you want to install tool dependencies defined for the specified repository being installed. The default setting is False.
  * param shed\_tool\_conf (optional): The shed-related tool panel configuration file configured in the "tool\_config\_file" setting in the Galaxy config file (e.g., galaxy.ini). At least one shed-related tool panel config file is required to be configured. Setting this parameter to a specific file enables you to choose where the specified repository will be installed because the tool\_path attribute of the `<toolbox>` from the specified file is used as the installation location (e.g., `<toolbox tool\_path="../shed\_tools">`). If this parameter is not set, a shed-related tool panel configuration file will be selected automatically.
  The script contributed by Bjorn Gruening in ~/scripts/api/install\_tool\_shed\_repositories.py is a useful mechanism for installing repositories into Galaxy from the Tool Shed. Additional mechanisms will be provided over time.
* GET **/api/tool\_shed\_repositories/{encoded\_tool\_shed\_repository\_id}/exported\_workflows**
  Return a list of dictionaries containing information about the exported workflows contained within a Tool Shed repository.
  * param id: the encoded id of the Tool Shed repository.
* POST **/api/tool\_shed\_repositories/import\_workflow/{payload}**
  Import the specified exported workflow contained in the specified installed tool shed repository into Galaxy.
  * param id: the encoded id of the Tool Shed repository.
  * param index: optional index location of the workflow tuple in the list of exported workflows stored in the metadata for the installed Tool Shed repository.
* POST **/api/tool\_shed\_repositories/import\_workflows**
  Import all of the exported workflows contained in the specified installed Tool Shed repository into Galaxy.
  * param id: the encoded id of the Tool Shed repository.
* POST **/api/tool\_shed\_repositories/{encoded\_tool\_shed\_repository\_id}/repair\_repository\_revision** - Repair a specified repository revision (and all if it's dependencies) previously installed into Galaxy.
  * param tool\_shed\_url (required): the base URL of the Tool Shed from which the Repository was installed
  * param name (required): the name of the Repository
  * param owner (required): the owner of the Repository
  * param changeset\_revision (required): the changeset\_revision of the `RepositoryMetadata` object associated with the Repository
* POST **/api/tool\_shed\_repositories/reset\_metadata\_on\_installed\_repositories**
  Resets all metadata on all repositories installed into Galaxy in an orderly fashion where installed repositories of type TOOL\_DEPENDENCY\_DEFINITION are processed before installed repositories of type UNRESTRICTED..

