---
autotoc: true
title: Galaxy Job Configuration
---
{{> Admin/LinkBox }}
{{> Admin/Config/Performance/LinkBox }}


By default, jobs in Galaxy are run locally on the server on which the Galaxy application was started.  Many options are available for running Galaxy jobs on other systems, including clusters and other remote resources.

This document is a reference for the job configuration file.  [Detailed documentation](/src/Admin/Config/Performance/Cluster/index.md) is provided for configuring Galaxy to work with a variety of Distributed Resource Managers (DRMs) such as TORQUE, Grid Engine, LSF, and HTCondor.  Additionally, a wide range of infrastructure decisions and configuration changes should be made when running Galaxy as a production service, as one is likely doing if using a cluster.  It is highly recommended that the [production server documentation](/src/Admin/Config/Performance/ProductionServer/index.md) and [cluster configuration documentation](/src/Admin/Config/Performance/Cluster/index.md) be read before making changes to the job configuration.

**The most up-to-date details of advanced job configuration features can be found in the [sample job_conf.xml](https://bitbucket.org/galaxy/galaxy-central/src/tip/config/job_conf.xml.sample_advanced) found in the Galaxy distribution.**



# Galaxy Configuration

Configuration of where to run jobs is performed in the `job_conf.xml` file in `galaxy-dist/config/`.  The path to the config file can be overridden by setting the value of `job_config_file` in `config/galaxy.ini`.  Sample configurations are provided at `galaxy-dist/config/job_conf.xml.sample_basic` and `galaxy-dist/config/job_conf.xml.sample_advanced`.  The job configuration file is not required - if it does not exist, a default configuration that runs jobs on the local system (with a maximum of 4 concurrent jobs) will be used.  `job_conf.xml.sample_basic` provides a configuration identical to the default configuration if no `job_conf.xml` exists.

If you have used `config/galaxy.ini` to configure job runners, handlers, and per-tool runner/handler specifications in the past (e.g. [runner URLs](/src/Admin/Config/Performance/Cluster/Legacy/index.md)), that method is no longer supported.  However, Galaxy is fully backward-compatible with the old `config/galaxy.ini` config options and job runner URLs, meaning that if you upgrade to the April 1, 2013 release (or later) and do not modify your config files, your job running configuration will continue to work.

# job_conf.xml Syntax

The root element is `<job_conf>`.

## Job Runner Plugins

The `<plugins>` collection defines job runner plugins that should be loaded when Galaxy starts.  This replaces the former `start_job_runners` configuration parameter.

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code><plugins></code> </td>
  </tr>
  <tr class="th" >
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> workers </td>
    <td> any integer </td>
    <td> Default number of worker threads to spawn for doing runner plugin "work", e.g. doing job preparation, post-processing, and cleanup </td>
    <td> optional </td>
    <td> <code>workers="8"</code> </td>
    <td> <code>4</code> </td>
  </tr>
</table>


The collection contains `<plugin>` elements.

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code><plugin></code> </td>
  </tr>
  <tr class="th" >
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> <code>id</code> </td>
    <td> any string </td>
    <td> id of the runner plugin referenced in <code><destination></code> tags. </td>
    <td> required </td>
    <td> <code>id="local"</code> </td>
    <td> </td>
  </tr>
  <tr>
    <td> <code>type</code> </td>
    <td> <code>runner</code> </td>
    <td> Type of plugin (currently on runner plugins are defined here) </td>
    <td> required </td>
    <td> <code>type="runner"</code> </td>
    <td> </td>
  </tr>
  <tr>
    <td> <code>load</code> </td>
    <td> <code><module>:<class></code>, <code><module></code> </td>
    <td> Python module containing the plugin, and the class to instantiate.  If no class name is provided, the module must list class names to load in a module-level <code>__all__</code> list. </td>
    <td> required </td>
    <td> <code>load="galaxy.jobs.runners.local:LocalJobRunner"</code> </td>
    <td> </td>
  </tr>
  <tr>
    <td> <code>workers</code> </td>
    <td> any integer </td>
    <td> Number of worker threads to start for this plugin only </td>
    <td> optional </td>
    <td> <code>workers="2"</code> </td>
    <td> value of <code>workers</code> attribute in <code><plugins></code> </td>
  </tr>
</table>


## Job Handlers

The `<handlers>` collection defines which Galaxy server processes (when [running multiple server processes](/src/Admin/Config/Performance/Scaling/index.md)) should be used for running jobs, and how to group those processes.  This replaces the former `job_manager`, `job_handlers` and `default_job_handlers` configuration parameters, as well as the `[galaxy:tool_handlers]` section.

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code><handlers></code> </td>
  </tr>
  <tr class="th" >
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> <code>default</code> </td>
    <td> handler <code>id</code> or <code>tag</code> </td>
    <td> The handler(s) that should be used if no explicit handler is defined for a job. </td>
    <td> required if >1 handlers defined </td>
    <td> <code>default="clusters"</code> </td>
    <td> child handler <code>id</code> </td>
  </tr>
</table>


The collection contains `<handler>` elements.

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code><handler></code> </td>
  </tr>
  <tr class="th" >
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> <code>id</code> </td>
    <td> a server name </td>
    <td> Name of a server (<code>[server:</code><strong><code>name</code></strong><code>]</code> in <code>config/galaxy.ini</code>) that should be used to run jobs. </td>
    <td> required </td>
    <td> <code>id="handler0"</code> </td>
    <td> </td>
  </tr>
  <tr>
    <td> <code>tags</code> </td>
    <td> comma-separated strings </td>
    <td> Tags to which this handler belongs. </td>
    <td> optional </td>
    <td> <code>tags="clusters"</code> or <code>tags="ngs,pbs"</code> </td>
    <td> no tags </td>
  </tr>
</table>


## Job Destinations

The `<destinations>` collection defines the parameters that should be used to run a job that is sent to the specified destination.  This replaces the former `default_cluster_job_runner` configuration parameters, as well as the `[galaxy:tool_runners]` section.

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code><destinations></code> </td>
  </tr>
  <tr class="th" >
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> <code>default</code> </td>
    <td> destination <code>id</code> or <code>tag</code> </td>
    <td> The destination(s) that should be used if no explicit destination is defined for a job. </td>
    <td> required if >1 destinations defined </td>
    <td> <code>default="local"</code> </td>
    <td> child destination <code>id</code> </td>
  </tr>
</table>


The collection contains `<destination>`s, which are can be collections or single elements.

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code><destination></code> </td>
  </tr>
  <tr class="th" >
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> <code>id</code> </td>
    <td> any string </td>
    <td> Identifier to be referenced in <code><tool></code> elements. </td>
    <td> required </td>
    <td> <code>id="galaxy_cluster"</code> </td>
    <td> </td>
  </tr>
  <tr>
    <td> <code>runner</code> </td>
    <td> a plugin <code>id</code> </td>
    <td> Job runner plugin to be used to run jobs sent to this destination. </td>
    <td> required </td>
    <td> <code>destination="local"</code> </td>
    <td> </td>
  </tr>
  <tr>
    <td> <code>tags</code> </td>
    <td> comma-separated strings </td>
    <td> Tags to which this destination belongs. </td>
    <td> optional </td>
    <td> <code>tags="longwalltime,bigcluster"</code> </td>
    <td> no tags </td>
  </tr>
</table>


Destination collections may contain zero or more `<param>`s, which are passed to the destination's defined runner plugin and interpreted in a way native to that plugin. For details on the parameter specification, see the documentation on [Cluster configuration](/src/Admin/Config/Performance/Cluster/index.md).

As of the June 2014 release, destinations may contain additional `env` elements to configure the environment for jobs on that resource. These each map to shell commands that will be injected to Galaxy's job script and executed on the destination resource.

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code><env></code> </td>
  </tr>
  <tr class="th" >
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> <code>id</code> </td>
    <td> string </td>
    <td> Environment variable to set (in this case text of element is value this is set to. </td>
    <td> optional </td>
    <td> <code>id="_JAVA_OPTIONS"</code> </td>
    <td> </td>
  </tr>
  <tr>
    <td> <code>file</code> </td>
    <td> path to script on resource </td>
    <td> File will be sourced to configure environment. </td>
    <td> optional </td>
    <td> <code>file="/mnt/java_cluster/environment_setup.sh"</code> </td>
    <td> </td>
  </tr>
  <tr>
    <td> <code>exec</code> </td>
    <td> shell command </td>
    <td> Shell command to execute to configure environment </td>
    <td> optional </td>
    <td> <code>module load javastuff/2.10</code> </td>
    <td> </td>
  </tr>
</table>


Destinations may also specify other destinations (which may be dynamic destinations) that jobs should be resubmitted to if they fail to complete at the first destination for certain reasons. This is done with the `<resubmit>` tag contained within a `<destination>`.

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code><resubmit></code> </td>
  </tr>
  <tr class="th" >
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> <code>condition</code> </td>
    <td> <code>walltime_reached</code> or <code>memory_limit_reached</code> </td>
    <td> Failure condition on which to resubmit jobs </td>
    <td> optional </td>
    <td> <code>condition="walltime_reached"</code> </td>
    <td> all failure values </td>
  </tr>
  <tr>
    <td> <code>handler</code> </td>
    <td> a handler <code>id</code> or <code>tag</code> </td>
    <td> Job handler(s) that should be used to run jobs for this tool. </td>
    <td> optional </td>
    <td> <code>handler="handler0"</code> or <code>handler="ngs"</code> </td>
    <td> default handler </td>
  </tr>
  <tr>
    <td> <code>destination</code> </td>
    <td> a destination <code>id</code> or <code>tag</code> </td>
    <td> Job destination(s) that should be used to run jobs for this tool. </td>
    <td> optional </td>
    <td> <code>destination="galaxy_cluster"</code> or <code>destination="long_walltime"</code> </td>
    <td> default destination </td>
  </tr>
</table>


**Note:** Currently, failure conditions for resubmission are only implemented for the [Slurm](/src/Admin/Config/Performance/Cluster/index.md) job runner plugin. Contributions for other implementations would be greatly appreciated! An example job configuration and an always-fail job runner plugin for development [can be found in this gist](https://gist.github.com/natefoo/361414fbca3c0ea63aa5).

## Mapping Tools To Destinations

### Static Destination Mapping

The `<tools>` collection provides a mapping from tools to a destination (or collection of destinations identified by tag) and handler (or collection of handlers).  Any tools not matching an entry in the collection will use the default handler and default destination as explained above.  This replaces the former `[galaxy:tool_handlers]` and `[galaxy:tool_runners]` sections of the configuration file.

The `<tools>` collection has no attributes.

The collection contains `<tool>`s, which are can be collections or single elements.

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code><tool></code> </td>
  </tr>
  <tr class="th" >
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> <code>id</code> </td>
    <td> Galaxy tool <code>id</code> </td>
    <td> <code>id</code> attribute of a Galaxy tool. Valid forms include the short <code>id</code> as found in the Tool's XML configuration, a full Tool Shed GUID, or a Tool Shed GUID without the version component </td>
    <td> required </td>
    <td> <code>id="toolshed.example.org/repos/nate/filter_tool_repo/filter_tool/1.0.0"</code> or <code>id="toolshed.example.org/repos/nate/filter_tool_repo/filter_tool"</code> or <code>id="filter_tool"</code> </td>
    <td> </td>
  </tr>
  <tr>
    <td> <code>handler</code> </td>
    <td> a handler <code>id</code> or <code>tag</code> </td>
    <td> Job handler(s) that should be used to run jobs for this tool. </td>
    <td> optional </td>
    <td> <code>handler="handler0"</code> or <code>handler="ngs"</code> </td>
    <td> default handler </td>
  </tr>
  <tr>
    <td> <code>destination</code> </td>
    <td> a destination <code>id</code> or <code>tag</code> </td>
    <td> Job destination(s) that should be used to run jobs for this tool. </td>
    <td> optional </td>
    <td> <code>destination="galaxy_cluster"</code> or <code>destination="long_walltime"</code> </td>
    <td> default destination </td>
  </tr>
</table>


Tool collections contain zero or more `<param>`s, which map to parameters set at job-creation, to allow for assignment of handlers and destinations based on the manner in which the job was created.  Currently, only one parameter is defined.

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code><param></code> </td>
  </tr>
  <tr class="th" >
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> <code>id</code> </td>
    <td> <code>source</code> </td>
    <td> A parameter set to the Galaxy component that set the job (usually unset for normal jobs). </td>
    <td> required </td>
    <td> <code>id="source"</code> </td>
    <td> </td>
  </tr>
</table>


The *content* of the `<param id="source">` tag is the component that created the job.  Currently, only Galaxy's visualization component sets this job parameter, and its value is `trackster`.

```xml
<param id="source">trackster</param>
```


### Dynamic Destination Mapping

Galaxy has very sophisticated job configuration options that allow different tools to be submitted to queuing systems with various parameters and in most cases this is sufficient. However, sometimes it is necessary to have job execution parameters be determined at runtime based on factors such as the job inputs, user submitting the job, cluster status, etc...  In these cases the dynamic job destination mechanism allows the deployer to describe how the job should be executed using python functions. There are various flavors of dynamic destinations to handle these scenarios.

The two most generic and useful dynamic destination types are `python` and `dtd`. The `python` type allows arbitrary Python functions to define destinations for jobs, while the DTD method (introduced in Galaxy 16.07) defines rules for routing in a YAML file.

#### Dynamic Destination Mapping (DTD method)

DTD is a special dynamic job destination type that builds up rules given a YAML-based DSL - see `config/tool_destinations.yml.sample` (on [Github](https://github.com/galaxyproject/galaxy/blob/dev/config/tool_destinations.yml.sample)) for a syntax description, examples, and a description of how to validate and debug this file.

To define and use rules, copy this sample file to `config/tool_destinations.yml` and add your rules. Anything routed with a `dynamic` runner of type `dtd` will then use this file (such as the destination defined with the following XML block in `job_conf.xml`).

```xml
    <destination id="dtd_destination" runner="dynamic">
      <param id="type">dtd</param>
    </destination>
```


#### Dynamic Destination Mapping (Python method)

The simplest way to get started with dynamic job destinations is to first create a dynamic job destination in `job_conf.xml`'s `<destinations>` section:

```xml
    <destination id="blast" runner="dynamic">
      <param id="type">python</param>
      <param id="function">ncbi_blastn_wrapper</param>
    </destination>
```


Note that any parameters defined on dynamic destinations are only available to the function. If your function dispatches to a static destination, parameters are not propagated automatically.

Next for any tool one wants to dynamically assign job destinations for, this `blast` dynamic destination must be specified in the `job_conf.xml`'s `<tools>` section:

```xml
    <tool id="ncbi_blastn_wrapper" destination="blast" />
```


Finally, you will need to define a function that describes how `ncbi_blastn_wrapper` should be executed. To do this, one must create a python source file in `lib/galaxy/jobs/rules`, for instance `destinations.py` (though the name of this file is largely unimportant, one can distribute any number of functions across any number of files and they will be automatically detected by Galaxy).

So open `lib/galaxy/jobs/rules/destinations.py` and define a `ncbi_blastn_wrapper` function. A couple possible examples may be:

```python
from galaxy.jobs import JobDestination
import os

def ncbi_blastn_wrapper(job):
    # Allocate extra time
    inp_data = dict( [ ( da.name, da.dataset ) for da in job.input_datasets ] )
    inp_data.update( [ ( da.name, da.dataset ) for da in job.input_library_datasets ] )
    query_file = inp_data[ "query" ].file_name
    query_size = os.path.getsize( query_file )
    if query_size > 1024 * 1024:
        walltime_str = "walltime=24:00:00/"
    else:
        walltime_str = "walltime=12:00:00/"
    return JobDestination(runner="pbs", params={"Resource_List": walltime_str})

```


or 

```python
from galaxy.jobs import JobDestination
import os

def ncbi_blastn_wrapper(app, user_email):
     # Assign admin users' jobs to special admin_project.
     admin_users = app.config.get( "admin_users", "" ).split( "," )
     params = {}
     if user_email in admin_users:
         params["nativeSpecification"] = "-P bigNodes"
    return JobDestination(runner="drmaa", params=params)
```


The first example above delegates to the PBS job runner and allocates extra walltime for larger input files (based on tool input parameter named `query`). The second example delegates to the DRMAA job runner and assigns users in the in the admin list to a special project (perhaps configured to have a higher priority or extended walltime).

The above examples demonstrate that the dynamic job destination framework will pass in the arguments to your function that are needed based on the argument names. The valid argument names at this time are:

<table>
  <tr>
    <td> <code>app</code> </td>
    <td> Global Galaxy application object, has attributes such as config (the configuration parameters loaded from <code>config/galaxy.ini</code>) and <code>job_config</code> (Galaxy representation of the data loaded in from <code>job_conf.xml</code>) </td>
  </tr>
  <tr>
    <td> <code>user_email</code> </td>
    <td> E-mail of user submitting this job. </td>
  </tr>
  <tr>
    <td> <code>user</code> </td>
    <td> Galaxy model object for user submitting this job. </td>
  </tr>
  <tr>
    <td> <code>job</code> </td>
    <td> Galaxy model object for submitted job, see the above example for how input information can be derived from this. </td>
  </tr>
  <tr>
    <td> <code>job_wrapper</code> </td>
    <td> An object meant a higher level utility for reasoning about jobs than <code>job</code>. </td>
  </tr>
  <tr>
    <td> <code>tool</code> </td>
    <td> Tool object corresponding to this job. </td>
  </tr>
  <tr>
    <td> <code>tool_id</code> </td>
    <td> ID of the tool corresponding to this job. </td>
  </tr>
  <tr>
    <td> <code>rule_helper</code> </td>
    <td> Utility object with methods designed to allow job rules to interface cleanly with the rest of Galaxy and shield them from low-level details of models, metrics, etc.... </td>
  </tr>
  <tr>
    <td> <code>resource_params</code> </td>
    <td> A dictionary of parameters specified by the user using <code>job_resource_params_conf.xml</code> if configured. </td>
  </tr>
</table>



Also available though less likely useful are job_id and job_wrapper.

The above examples demonstrated mapping one tool to one function. Multiple tools may be mapped to the same function, by specifying a function the the dynamic destination:

```xml
    <destination id="blast_dynamic" runner="dynamic">
      <param id="type">python</param>
      <param id="function">blast_dest</param>
    </destination>
```


```xml
    <tool id="ncbi_blastn_wrapper" destination="blast_dynamic" />
    <tool id="ncbi_blastp_wrapper" destination="blast_dynamic" />
    <tool id="ncbi_tblastn_wrapper" destination="blast_dynamic" />
```


In this case, you would need to define a function named `blast_dest` in your python rules file and it would be called for all three tools. In cases like this, it may make sense to take in `tool_id` or `tool` as argument to factor the actual tool being used into your decision.

As a natural extension to this, a dynamic job runner can be used as the default destination. The below examples demonstrate this and other features such as returning mapping failure messages to your users and defaulting back to existing static destinations defined in `job_conf.xml`.

##### Additional Dynamic Job Destination Examples

The following example assumes the existence of a job destination with ids `short_pbs` and `long_pbs` and that a default dynamic job runner has been defined as follows in `job_conf.xml`:

```xml
  <destination default="dynamic">
    <destination id="dynamic">
      <param id="type">python</param>
      <param id="function">default_runner</param>
    <destination>
    ...
```


With these if place, the following `default_runner` rule function will route all tools with id containing `mothur` to the `long_pbs` destination defined `jobs_conf.xml` and all other tools to the `short_pbs` destination:

```python
def default_runner(tool_id):
    if 'mothur' in tool_id >= 0:
       return 'long_pbs'
    else:
       return 'short_pbs'
```


As another example, assume that a few tools should be only accessible to developers and all other users should receive a message indicating they are not authorized to use this tool. This can be accomplished with the following `job_conf.xml` fragment

```xml
  <destination default="dynamic">
    <destination id="dev_dynamic">
      <param id="type">python</param>
      <param id="function">dev_only</param>
    <destination>
    ...
  <tools>
    <tool id="test1" destination="dev_dynamic" />
    <tool id="test2" destination="dev_dynamic" />
    ...
```


Coupled with placing the following function in a rules file.

```python
from galaxy.jobs.mapper import JobMappingException
from galaxy.jobs import JobDestination
DEV_EMAILS = ["mary@example.com"]

def dev_only(user_email):
    if user_email in DEV_EMAILS
       return JobDestination(runner="drmaa")
    else:
       raise JobMappingException("This tool is under development and you are not authorized to it.")       
```


There is an additional page on [Access Control](/src/Admin/Config/Access Control/index.md) for those interested.

##### Additional Tricks

If one would like to tweak existing static job destinations in just one or two parameters, the following idiom can be used to fetch static JobDestination objects from Galaxy in these rule methods - `dest = app.job_config.get_destination( id_or_tag )`.

## Limiting Job Resource Usage

The `<limits>` collection defines the number of concurrent jobs users can run, output size limits, and a Galaxy-specific limit on the maximum amount of time a job can run (rather than relying on a DRM's time-limiting feature).  This replaces the former `job_walltime`, `output_size_limit`, `registered_user_job_limit`, `anonymous_user_job_limit` configuration parameters, as well as the (mostly broken) `[galaxy:job_limits]` section.

*NB: The `job_walltime` and `output_size` limits are only implemented in the `local` and `pbs` job runner plugins.  Implementation in other runners is likely to be fairly easy and would simply require a bit of testing - we would gladly accept a pull request implementing these features in the other provided runner plugins.*

The `<limits>` collection has no attributes.

The collection contains `<limit>`s, which have different meanings based on their required `type` attribute:

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code><limit></code> </td>
  </tr>
  <tr class="th" >
    <th> attribute </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> <code>type</code> </td>
    <td> <code>registered_user_concurrent_jobs</code>, <code>anonymous_user_concurrent_jobs</code>, <code>destination_user_concurrent_jobs</code>, <code>destination_total_concurrent_jobs</code>, <code>walltime</code>, <code>output_size</code> </td>
    <td> The type of limit set. </td>
    <td> required </td>
    <td> <code>type="walltime"</code> </td>
    <td> </td>
  </tr>
  <tr>
    <td> <code>id</code> </td>
    <td> destination <code>id</code> </td>
    <td> Destination on which to apply limit (for <code>destination_user_concurrent_jobs</code> and <code>destination_total_concurrent_jobs</code> types only). </td>
    <td> optional </td>
    <td> <code>id="galaxy_cluster"</code> </td>
    <td> </td>
  </tr>
  <tr>
    <td> <code>tag</code> </td>
    <td> destination <code>tag</code> </td>
    <td> Destinations on which to apply limit (for <code>destination_user_concurrent_jobs</code> and <code>destination_total_concurrent_jobs</code> types only). </td>
    <td> optional </td>
    <td> <code>tag="long_walltime"</code> </td>
    <td> </td>
  </tr>
</table>


If a limit tag is defined, its value must be set.  If the limit tag is not defined, the default for each type is unlimited.  The syntax for the available `type`s are:

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code><limit type=" ...type... "> ...value... </limit></code> </td>
  </tr>
  <tr class="th" >
    <th> type </th>
    <th> values </th>
    <th> details </th>
    <th> example </th>
  </tr>
  <tr>
    <td> <code>registered_user_concurrent_jobs</code> </td>
    <td> any unsigned integer </td>
    <td> Limit on the number of jobs a user with a registered Galaxy account can have active across all destinations. </td>
    <td> <code>8</code> </td>
  </tr>
  <tr>
    <td> <code>anonymous_user_concurrent_jobs</code> </td>
    <td> any unsigned integer </td>
    <td> Limit on the number of jobs an unregistered/anonymous user can have active across all destinations. </td>
    <td> <code>4</code> </td>
  </tr>
  <tr>
    <td> <code>destination_user_concurrent_jobs</code> </td>
    <td> any unsigned integer </td>
    <td> The number of jobs a user can have active in the specified destination, or across all destinations identified by the specified tag. </td>
    <td> <code>2</code> </td>
  </tr>
  <tr>
    <td> <code>destination_total_concurrent_jobs</code> </td>
    <td> any unsigned integer </td>
    <td> The number of jobs that can be active in the specified destination (or across all destinations identified by the specified tag) by any/all users. </td>
    <td> <code>16</code> </td>
  </tr>
  <tr>
    <td> <code>walltime</code> </td>
    <td> time in <code>HH:MM:SS</code> format </td>
    <td> Amount of time a job can run (in any destination) before it will be terminated by Galaxy. </td>
    <td> <code>24:00:00</code> </td>
  </tr>
  <tr>
    <td> <code>output_size</code> </td>
    <td> (integer) size in bytes </td>
    <td> Size that any defined tool output can grow to before the job will be terminated. This does not include temporary files created by the job. </td>
    <td> <code>53687091200</code> (50 GB) </td>
  </tr>
</table>


The concept of "across all destinations" is used because Galaxy allows users to run jobs across any number of local or remote (cluster) resources.  A user may always queue an unlimited number of jobs in Galaxy's internal job queue.  The concurrency limits apply to jobs that have been dispatched and are in the `queued` or `running` states.  These limits prevent users from monopolizing the resources Galaxy runs on by, for example, preventing a single user from submitting more long-running jobs than Galaxy has cluster slots to run and subsequently blocking all Galaxy jobs from running for any other user.
