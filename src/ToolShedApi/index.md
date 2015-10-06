<div class='center'> <a href='http://toolshed.g2.bx.psu.edu'><img src='/Images/Logos/ToolShed.jpg' alt='Galaxy Main Tool Shed' height="174" /></a> </div>

TABLE_OF_CONTENTS

# The Tool Shed API

The RESTful Tool Shed API currently provides the following features.  These API features will be enhanced over time.

* GET **/api/repositories**
  Returns a list of dictionaries that include information about all repositories.
* GET **/api/repositories/{encoded_repository_id}**
  Returns a dictionary that includes information about a specified repository.
* GET **/api/repositories/get_ordered_installable_revisions**
  * param name: the name of the repository
  * param owner: the owner of the repository
  Returns the ordered list of changeset revision hash strings that are associated with installable revisions.  As in the changelog, the list is ordered oldest to newest.
* GET **/api/repositories/get_repository_revision_install_info**
  * param name: the name of the repository
  * param owner: the owner of the repository
  * param changset_revision: the changset_revision of the `RepositoryMetadata` object associated with the repository
  Returns a list of the following dictionaries:
  * a dictionary defining the repository
  * a dictionary defining the repository revision (`RepositoryMetadata`)
  * a dictionary including the additional information required to install the repository
* GET **/api/repository_revisions**
  Returns a (possibly filtered) list of dictionaries that include information about all repository revisions.  The following parameters can be used to filter the list.
  * downloadable ( True / False )
  * malicious ( True / False )
  * tools_functionally_correct ( True / False )
  * missing_test_components ( True / False )
  * do_not_test ( True / False )
  * includes_tools ( True / False )
  * test_install_error ( True / False )
  * skip_tool_test ( True / False )
* GET **/api/repository_revisions/{encoded_repository_metadata_id}**
  Returns a dictionary that includes information about a specified repository revision.
* GET **/api/repository_ids_for_setting_metadata**
  Returns a list of repository ids ordered for setting metadata.
  * param my_writable: optional boolean value to enable filtering the list to those repositories for which the current user has write authorization.
* POST **/api/reset_metadata_on_repositories/{payload}**
  Resets all metadata on specified repositories in the Tool Shed in an "orderly fashion".  The order in which metadata is reset is repositories of type tool_dependecy_definition first followed by repositories of type unrestricted.
  * param my_writable: optional boolean value to enable filtering the list to those repositories for which the current user has write authorization.
  * param encoded_ids_to_skip: optional list of encoded repository ids for repositories that should not be processed.
  * param skip_file: optional local file name that contains the encoded repository ids associated with repositories to skip.  This param can be used as an alternative to the above encoded_ids_to_skip.
* POST **/api/reset_metadata_on_repository/{payload}**
  Resets all metadata on a specified repository in the Tool Shed.
  * param repository_id: required encoded id of the repository on which metadata is to be reset.
* POST **/api/repository_revisions/{encoded_repository_metadata_id}/{payload}**
  Updates the value of specified columns of the repository_metadata table based on the key/value pairs in payload dictionary.  This API call requires the use of an API key that guarantees the user is a tool shed administrator.

# Galaxy API features for the Tool Shed

The RESTful Galaxy API includes the following features that work with the Tool Shed.  These API features will be enhanced over time.

* GET **/api/tool_shed_repositories**
  Returns a list of dictionaries containing information about installed tool shed repositories.
* GET **/api/tool_shed_repositories/{encoded_tool_shed_repository_id}**
  Returns a dictionary containing information about a specified installed tool_shed_repository.
* POST **/api/tool_shed_repositories/new/install_repository_revision**
  * param key: the current Galaxy admin user's API key
  The following parameters are included in the payload.
  * param tool_shed_url (required): the base URL of the Tool Shed from which to install the repository
  * param name (required): the name of the repository
  * param owner (required): the owner of the repository
  * param changeset_revision (required): the changeset_revision of the `RepositoryMetadata` object associated with the repository
  * param new_tool_panel_section_label (optional): label of a new section to be added to the Galaxy tool panel in which to load tools contained in the repository.  Either this parameter must be an empty string or the tool_panel_section_id parameter must be an empty string or both must be an empty string (both cannot be used simultaneously).
  * param tool_panel_section_id (optional): id of the Galaxy tool panel section in which to load tools contained in the repository.  If this parameter is an empty string and the above new_tool_panel_section_label parameter is an empty string, tools will be loaded outside of any sections in the tool panel.  Either this parameter must be an empty string or the tool_panel_section_id parameter must be an empty string of both must be an empty string (both cannot be used simultaneously).
  * param install_repository_dependencies (optional): Set to True if you want to install repository dependencies defined for the specified repository being installed.  The default setting is False.
  * param install_tool_dependencies (optional): Set to True if you want to install tool dependencies defined for the specified repository being installed.  The default setting is False.
  * param shed_tool_conf (optional): The shed-related tool panel configuration file configured in the "tool_config_file" setting in the Galaxy config file (e.g., universe_wsgi.ini).  At least one shed-related tool panel config file is required to be configured. Setting this parameter to a specific file enables you to choose where the specified repository will be installed because the tool_path attribute of the `<toolbox>` from the specified file is used as the installation location (e.g., `<toolbox tool_path="../shed_tools">`).  If this parameter is not set, a shed-related tool panel configuration file will be selected automatically.
  The script contributed by Bjorn Gruening in ~/scripts/api/install_tool_shed_repositories.py is a useful mechanism for installing repositories into Galaxy from the Tool Shed.  Additional mechanisms will be provided over time.
* GET **/api/tool_shed_repositories/{encoded_tool_shed_repository_id}/exported_workflows**
  Return a list of dictionaries containing information about the exported workflows contained within a Tool Shed repository.
  * param id: the encoded id of the Tool Shed repository.
* POST **/api/tool_shed_repositories/import_workflow/{payload}**
  Import the specified exported workflow contained in the specified installed tool shed repository into Galaxy.
  * param id: the encoded id of the Tool Shed repository.
  * param index: optional index location of the workflow tuple in the list of exported workflows stored in the metadata for the installed Tool Shed repository.
* POST **/api/tool_shed_repositories/import_workflows**
  Import all of the exported workflows contained in the specified installed Tool Shed repository into Galaxy.
  * param id: the encoded id of the Tool Shed repository.
* POST **/api/tool_shed_repositories/{encoded_tool_shed_repository_id}/repair_repository_revision** - Repair a specified repository revision (and all if it's dependencies) previously installed into Galaxy.
  * param tool_shed_url (required): the base URL of the Tool Shed from which the Repository was installed
  * param name (required): the name of the Repository
  * param owner (required): the owner of the Repository
  * param changeset_revision (required): the changeset_revision of the `RepositoryMetadata` object associated with the Repository
* POST **/api/tool_shed_repositories/reset_metadata_on_installed_repositories**
  Resets all metadata on all repositories installed into Galaxy in an orderly fashion where installed repositories of type TOOL_DEPENDENCY_DEFINITION are processed before installed repositories of type UNRESTRICTED..
