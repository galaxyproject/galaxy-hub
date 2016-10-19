---
autotoc: true
---


# User Defined Toolbox Filters

This feature is available as of the November 2013 Galaxy distribution, being originally incorporated from Pull Request [#179](https://bitbucket.org/galaxy/galaxy-central/pull-request/179/implement-the-ability-to-change-the-tool)

ToolBox filters can be applied by an admin and/or by an user dynamically to filter the large list of tools.

<!> 
Filters will only hide Tools from the User Interface, they are still available and can be made visible by means of HTML manipulation. That said these feature is not a security feature, it is intended to separate multiple groups of Tools and simplify the ToolBox. 

## For Users

Users can find ToolBox filters under "User preferences" (Top Panel -> Users -> Preferences).

<div class='center'> <a href='/src/attachment:user_preferences.png/index.md'><img src="/src/UserDefinedToolboxFilters/user_preferences.png" alt="User Preferences" /></a> </div>

If you do not see any filters to choose (like in the following image) your administrator has not configured any filter for you. Otherwise you will see something like the following. Choose your filters, apply the changes and reload Galaxy. Done!

<div class='center'> <a href='/src/attachment:toolbox_filter_ui.png/index.md'><img src="/src/UserDefinedToolboxFilters/toolbox_filter_ui.png" alt="User Interface" /></a> </div>



## For Administrators

Two types of filters exist:

1. tool_* filters will be applied for all users and can not be changed by users. Useful for example to hide some tools for some users/groups
2. user_tool_* filters will be shown under user preferences and can be toggled on and off by runtime from all users. Useful to offer specialized sets of tools for separate analysis.

Every filter is a small python function under lib/galaxy/tools/filters/. Each function needs to be added to the config/galaxy.ini file (examples are already listed).


A typical filter function looks like the following. It will check if a tool ID is a certain string and return False if that is the case.
Returning False means to not display the tool on the left ToolBox, returning True means the opposite.
Please note that the python doc string is crucial and the first paragraph will be used as explanation in the User Interface.

```python
def restrict_encode( content, tool ):
    """
    Disable the random interval ENCODE tool

    This tool filter will disable all the ENCODE tool when enabled.
    """
    if tool.id == 'random_intervals1':
        return False
    return True
```


You can not only filter for tools ID's, you can also filter for everything that is associate with a Tool, for example the Toolname or the requirements.

```python
def disable_gatk( context, tool ):
    """
    This tool filter will disable all gatk tools when enabled.

    This can be enabled by renaming this file to examples.py and adding the following to the
     ``app:main`` section of ``config/galaxy.ini``:

        tool_filters = examples:disable_gatk
    """
    return not any( [ requirement.name == "gatk" for requirement in tool.requirements ] )
```


An other very powerful feature is, that you can access the Galaxy context to have access for the username or the admin status.
Here is an example that hides the upload Utility for all users that are not admin users.

```python
def restrict_upload_to_admins( context, tool ):
    """
    Disable Upload tool for all non-admin users.

    This tool filter will hide the upload tool from all users except admin
    users.

    This can be enabled by renaming this file to examples.py and adding
    the following to the ``app:main`` section of ``config/galaxy.ini``:

        tool_filters = examples:restrict_upload_to_admins
    """
    if tool.name == "Upload File":
        return context.trans.user_is_admin()
    return True
```


And here you have a list with an explicit User-Tool mapping.

```python
def explicit_user_mapping( context, section ):
    """
    This tool section filter uses an explicit mapping to describe what users can view
    which tool sections. Anonymous users will only be able to view the "Get Data"
    tool section (with id getext). This can be enabled by renaming this file to
    examples.py and adding the following to the ``app:main`` section of
    ``config/galaxy.ini``:

        tool_section_filters = examples:explicit_user_mapping
    """
    users_sections = {
        None: [ "getext" ],
        "bob@example.com": [ "getext", "textutil", "filter" ],
        "mary@example.com": [ "getext", "textutil", "filter", "ngs" ],
    }
    user = context.trans.user
    email = user and user.email
    valid_sections = users_sections.get( email, [] )
    return section.id in valid_sections
```


Displaying all 'in-development' Tools only to Developers? Here you go ...

```python
DEVELOPERS = [ "mary@example.com" ]

def restrict_development_tools( context, tool ):
    """
    This tool filter will disable all tools with the string alpha appearing in
    the version for all users except those explicitly appearing in the DEVELOPERS list
    defined above. This can be enabled by renaming this file to examples.py and
    adding the following to the ``app:main`` section of ``config/galaxy.ini``:

        tool_filters = examples:restrict_development_tools
    """
    version = tool.version
    user = context.trans.user
    email = user and user.email
    return "alpha" not in version or email in DEVELOPERS
```


Want to host the ChemicalToolBox (ctb.my-galaxy.edu) in the same Galaxy instance (galaxy.my-galaxy.edu)
but with a different set of default Tools -- dependend on the accessed URL?
Possible! Just access context.trans.request.host and filter your Tools.

```python
def per_host_tool_sections( context, section ):
    """
    This tool section filter results in different sections being display based on
    the URL the user is making the request to. This could allow a single Galaxy instance
    to seem like several different instances hosting different tools based on the URL used
    to access the Galxy. This can be enabled by renaming this file to examples.py and adding
    the following to the ``app:main`` section of ``config/galaxy.ini``:

        tool_section_filters = examples:per_host_tool_sections
    """
    host = context.trans.request.host
    # Core tools used by all virtual hosts.
    valid_sections = [ "getext", "textutil", "filter" ]
    if "ngs.galaxy.example.com" in host:
        valid_sections += [ "ngs" ]
    elif "microarray.galaxy.example.com" in host:
        valid_sections += [ "microarray" ]
    elif "proteomics.galaxy.example.com" in host:
        valid_sections += [ "proteomics" ]
    return section.id in valid_sections
```


Restrict tools to certain groups.

```python
def restrict_prims_metabolomics( context, tool ):
    """
    This tool filter will hide MsClust for non-metabolomics users.
    """
    user = context.trans.user
    metabolomics_tools = ["MsClust","textutil","filter" ]
    if tool.namein metabolomics_tools:
        for user_role in user.roles:
           if user_role.role.name == "PRIMS_METABOLOMICS":
               returnTrue
        # not found to have the role, return false:
        return False
    else:
        # return true for any other tool
        return True
```

