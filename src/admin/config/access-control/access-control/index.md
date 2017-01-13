# Access control
Access control is an extremely important part of configuration if you are deploying tools that need to be restricted, whether it is due to licensing issues or to the tools have administrative functions.

Restricting tool usage can be done in two levels

1. Running of the tool can be restricted

2. Tool visibility can be restricted

## Disabling tools

You can read a [thread](http://dev.list.galaxyproject.org/pass-user-groups-to-dynamic-job-runner-tp4661753p4661889.html) about restricting tool usage, but I will summarise the necessary changes here. Credit goes to Nicola Soranzo for illustrating this method of implementing tool access control.

### job_conf.xml

Here is an example job_conf.xml file taken from that email thread

```
#!highlight xml
<?xml version="1.0"?>
<job_conf>
    <plugins workers="4">
        <plugin id="local" type="runner"
load="galaxy.jobs.runners.local:LocalJobRunner" />
        <plugin id="drmaa" type="runner"
load="galaxy.jobs.runners.drmaa:DRMAAJobRunner" />
    </plugins>
    <handlers>
        <handler id="main"/>
    </handlers>
    <destinations default="remote_cluster">
        <destination id="local" runner="local" />
        <destination id="transcriptome_role" runner="dynamic">
            <param id="function">is_user_in_role</param>
        </destination>
        <destination id="remote_cluster" runner="drmaa" /> 
    </destinations>
    <tools>
        <tool id="tool1" destination="transcriptome_role"
required_role="transcriptome_users" final_destination="local"/>
    </tools>
</job_conf>
```


If you've already edited the job_conf.xml file, you are enough familiar with it to adapt the changes to your needs. (If you have not used job_conf before but *are* using multiple worker threads, see the notes at the end.)

There are two important sections in here, firstly the destination a job will be sent to. Galaxy gives you the ability to route jobs however you wish. In this example case we'll look at restricting the use of transcriptome analysis tools so our users don't kill our server.

```
#!highlight xml
<destination id="transcriptome_role" runner="dynamic">
    <param id="function">is_user_in_role</param>
</destination>
```


This define a dynamic destination, called `transcriptome_role`, which will use the Python function indicated in `<param id="function">`, i.e. `is_user_in_role`. The source code of this function should be placed in a file (e.g. destinations.py) inside lib/galaxy/jobs/rules/ , as noted in [Galaxy Job Configuration](http://wiki.galaxyproject.org/Admin/Config/Jobs#Dynamic_Destination_Mapping). It is a bit of code that can raise exceptions and modify job parameters that are passed through it. We'll cover the code there, shortly.

The other important portion of the config file is the tool-to-destination mapping.

```
#!highlight xml
<tools>
    <tool id="tool1" destination="transcriptome_role"
required_role="transcriptome_users" final_destination="local"/>
</tools>
```


In this XML snippet we've set `tool1` to go to the destination referenced by id `transcriptome_role`. We've provided some extra parameters, namely `required_role` and `final_destination` which are not part of the `job_config.xml` specification, if you read it closely. The extra XML tags and values will be used by the `is_user_in_role` function.

### destinations.py

In the `destinations.py` script we handle how the tool gets routed and the behaviour. Here is an example script.

```
#!highlight python
from galaxy.jobs.mapper import JobMappingException
DEFAULT_ROLE = 'have_license'

def is_user_in_role(user, app, tool):
    # user is a galaxy.model.User object or None
    # app is a galaxy.app.UniverseApplication object
    # tool is a galaxy.tools.Tool object
    if user is None:
        raise JobMappingException('You must login to use this tool!')
    # Determine required_role and final_destination for tool_id tool
    # job_conf.xml syntax:
    # <tool id="tool_id" destination="is_user_in_role" required_role="special_users" final_destination="special_queue"/>
    # Both required_role and final_destination attributes are optional.
    default_destination_id = app.job_config.get_destination(None)
    # Loop across all of the job_tool_configurations which apply to the tool in question
    for jtc in tool.job_tool_configurations:
        # tool.job_tool_configurations is a list of galaxy.jobs.JobToolConfiguration objects
        if not jtc.params:
            # We attempt to extract the required_role and final_destination variables from the <tool> XML element
            required_role = jtc.get('required_role', DEFAULT_ROLE)
            final_destination = jtc.get('final_destination', default_destination_id)
            break
    else:
        required_role = DEFAULT_ROLE
        final_destination = default_destination_id
    # Check that the required_role is in the set of role names associated with the user
    user_roles = user.all_roles() # a list of galaxy.model.Role objects
    user_in_role = required_role in [role.name for role in user_roles]
    if not user_in_role:
        raise JobMappingException("This tool is restricted to users associated with the '%s' role, please contact a site administrator to be authorized!" % required_role)
    else:
        return final_destination
```


At this point you can restart your Galaxy instance and you will be able to verify that your tool is restricted from use by anyone not associated with your specified role.

## Tool Visibility

The second item to restricting tool visibility is by adding in a [dynamic toolbox filter](http://wiki.galaxyproject.org/UserDefinedToolboxFilters#For_Administrators).

<!>  Filters will only hide Tools from the User Interface, they are still available and can be made visible by means of HTML manipulation. That said these feature is not a security feature, it is intended to separate multiple groups of tools and simplify the !ToolBox.

You can look at `lib/galaxy/tools/toolbox/filters/examples.py` for good examples of filters. For our example we'll restrict all sections with the word "Admin" in them. This is an easy way to sequester administrative tools for admins only. 

```
#!highlighter python
import logging
log = logging.getLogger( __name__ )

def admin( context, section ):
    """
    Disable Admin sections: disable all Tools groups under a 'Admin' section when enabled.
    """
    # If the section contains the word admin
    if section.name.find('Admin') != -1:
        return context.trans.user_is_admin()
    return True
```


To rewrite the important points from [/UserDefinedToolboxFilters](/src/UserDefinedToolboxFilters/index.md) page, 

* Every filter is a small python function under lib/galaxy/tools/toolbox/filters/. 

* Return False to NOT display the tool

* Return True to display the tool

There are several different types of filters:

* section

* label

* tool

Each of these passes appropriate variables to the python function when they're called, and as such their declaration in the main configuration is slightly different. To activate a filter, you will need to modify your `config/galaxy.ini` file. The syntax for each of them is spread across several examples in the `examples.py` file that is provided. These are reproduced below for clarity

* `tool_filters = examples:restrict_upload_to_admins`

* `tool_section_filters = examples:explicit_user_mapping`

* `tool_label_filters = examples:label_filter`

Simply add the appropriate string to your `config/galaxy.ini` in the `[app:main]` section to activate a tool filter. 

# Conclusion

With this, you should have restricted a tool's use to a specific role, and hidden that tool/section of tools to a specific group. This is enough to implement most ACLs that you would wish to implement in Galaxy, whether you are restricting a tool due to licensing constraints (e.g., GATK example in `examples.py`), due to administrative functionality, or for developer testing before public release.

# Notes

## Multiple Worker Threads running local jobs

If you have not used the job_conf before and are using multiple worker threads for running galaxy (e.g., `server:handler0` entries in your `config/galaxy.ini`), please be sure to note you'll have to modify your `<handlers>` section to look something like:

```
#!highlight xml
<handlers default="handlers">
    <handler id="handler0" tags="handlers" />
    ...etc
```

