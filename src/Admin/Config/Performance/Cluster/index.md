---
title: Running Galaxy Tools on a Cluster
autotoc: true
---
PLACEHOLDER_INCLUDE(../../../../Admin/Config/Performance/LinkBox)

Galaxy is designed to run jobs on your local system by default, but it can be configured to run jobs on a cluster.  The front-end Galaxy application runs on a single server as usual, but tools are run on cluster nodes instead.

This documentation applies to Galaxy release_2013.04.01 and newer. For older Galaxy releases, use the [legacy documentation](../../../../Admin/Config/Performance/Cluster/Legacy).

A [general reference for the job configuration file](../../../../Admin/Config/Jobs) is also available.



# Distributed Resources Managers

Galaxy is known to work with:

* [TORQUE Resource Manager](http://www.adaptivecomputing.com/products/open-source/torque/)
* [PBS Professional](http://www.pbsworks.com/Product.aspx?id=1)
* [Open Grid Engine](http://gridscheduler.sourceforge.net/)
* [Univa Grid Engine](http://www.univa.com/products/grid-engine.php) (previously known as Sun Grid Engine and Oracle Grid Engine)
* [Platform LSF](http://www-03.ibm.com/systems/platformcomputing/products/lsf/)
* [HTCondor](http://research.cs.wisc.edu/htcondor/)
* [Slurm](http://slurm.schedmd.com/)
* [Galaxy Pulsar](#pulsar) (formerly LWR)

It should also work with [any other DRM](http://www.drmaa.org/implementations.php) which implements a [DRMAA](http://www.drmaa.org) interface.  If you successfully run Galaxy with a DRM not listed here, please let us know via an email to the [galaxy-dev mailing list](../../../../MailingLists).

If you do not already have a DRM, [Galaxy Pulsar](#pulsar) is available which does not require an existing cluster or a shared filesystem and can also run jobs on Windows hosts.

Installing and configuring your cluster hardware and management software is outside the scope of this document (and specific to each site).  That said, a few pitfalls commonly encountered when trying to get the user Galaxy runs as (referred to in this documentation as `galaxy_user`) able to run jobs on the DRM are addressed here:  

* The host on which the Galaxy server processes run (referred to in this documentation as `galaxy_server`) should be configured in the DRM as a "submit host".
* `galaxy_user` must have a real shell configured in your name service (`/etc/passwd`, LDAP, etc.).  System accounts may be configured with a disabled shell like `/bin/false` (Debian/Ubuntu) or `/bin/nologin` (Fedora/RedHat).
* The Galaxy server and the worker nodes are running the same version of Python (worker nodes will run Python scripts calling the Galaxy code and its dependencies to set job output file metadata).

To continue, you should have a working DRM that `galaxy_user` can successfully submit jobs to.

# Preliminary Setup

Galaxy (with the exception of the [Pulsar](#pulsar) runner) currently requires a shared filesystem between the application server and the cluster nodes.  There is some legacy code in the PBS runner that does file staging, but its operational status is unknown.  The path to Galaxy must be exactly the same on both the nodes and the application server (although it is possible to use symlinks to partially subvert the absolute path requirement).  This is because absolute paths are used to refer to datasets and tools when running the command on the cluster node.  The shared filesystem and absolute pathnames are limitations that will eventually be removed as development time permits.

For example, if Galaxy is installed like so:

```console
galaxy_user@galaxy_server% git clone https://github.com/galaxyproject/galaxy.git /clusterfs/galaxy/galaxy-app
```


Then that directory should be accessible from all cluster nodes:

```console
galaxy_user@galaxy_server% qsub -I
qsub: waiting for job 1234.torque.server to start
qsub: job 1234.torque.server ready

galaxy_user@node1% cd /clusterfs/galaxy/galaxy-app
galaxy_user@node1%
```


If your cluster nodes have Internet access (NAT is okay) and you want to run the data source tools (upload, ucsc, etc.) on the cluster (doing so is highly recommended), set `new_file_path` in `universe_wsgi.ini` (`config/galaxy.ini`) to a directory somewhere in your shared filesystem:

```ini
new_file_path = /clusterfs/galaxy/tmp
```


Additionally some of the runners including DRMAA may use the ``cluster_files_directory`` for sharing files with the cluster, which defaults to ``database/pbs``. You may need to create this folder.

```ini
cluster_files_directory = database/pbs
```


You may also find that attribute caching in your filesystem causes problems with job completion since it interferes with Galaxy detecting the presence and correct sizes of output files. In NFS caching can be disabled with the `-noac` mount option on Linux (on the Galaxy server), but this may have a significant impact on performance since all attributes will have to be read from the file server upon every file access. You should try the `retry_output_collection` option in `galaxy.ini` first to see if this solves the problem.

# Runner Configuration

**This documentation covers configuration of the various runner plugins, not how to distribute jobs to the various plugins.** Consult the [job configuration file documentation](../../../../Admin/Config/Jobs) for full details on the correct syntax, and for instructions on how to configure tools to actually use the runners explained below.

## Local

Runs jobs locally on the Galaxy application server (no DRM).

### Workers

It is possible to configure the number of concurrent local jobs that can be run by using the `workers` attribute on the plugin.

```xml
<plugins>
    <plugin id="local" type="runner" load="galaxy.jobs.runners.local:LocalJobRunner" workers="8"/>
</plugins>
```


### Slots

For each destination using the local runner, it is possible to specify the number of CPU slots to assign (default is 1).

```xml
<destinations>
    <destination id="local_1slot" runner="local"/>
    <destination id="local_2slots" runner="local">
        <param id="local_slots">2</param>
    </destination>
</destinations>
```


The value of *local_slots* is used to define [GALAXY_SLOTS](../../../../Admin/Config/GALAXY_SLOTS)

## DRMAA

<div class='right'><a href='http://www.drmaa.org'><img src="../../../../Images/Logos/DRMAALogo200.png" alt="DRMAA" /></a></div>Runs jobs via any DRM which supports the [Distributed Resource Management Application API](http://www.drmaa.org).  Most commonly used to interface with [PBS Professional](http://www.pbsworks.com/Product.aspx?id=1), [Sun Grid Engine](http://gridscheduler.sourceforge.net/), [Univa Grid Engine](http://www.univa.com/products/grid-engine.php), [Platform LSF](http://www-03.ibm.com/systems/technicalcomputing/platformcomputing/products/lsf/index.html), and [SLURM](http://slurm.schedmd.com/).  

### Dependencies

Galaxy interfaces with DRMAA via [drmaa-python](http://code.google.com/p/drmaa-python/).  The drmaa-python module is provided with Galaxy, but you must tell it where your DRM's DRMAA library is located, via the `$DRMAA_LIBRARY_PATH` environment variable, for example:

```console
galaxy_server% export DRMAA_LIBRARY_PATH=/galaxy/lsf/7.0/linux2.6-glibc2.3-x86_64/lib/libdrmaa.so
galaxy_server% export DRMAA_LIBRARY_PATH=/galaxy/sge/lib/lx24-amd64/libdrmaa.so
```


#### DRM Notes

**TORQUE**: The DRMAA runner can also be used (instead of the [PBS](#pbs) runner) to submit jobs to TORQUE, however, problems have been reported when using the `libdrmaa.so` provided with TORQUE.  Using this library will result in a segmentation fault when the drmaa runner attempts to write the job template, and any native job runner options will not be passed to the DRM.  Instead, you should compile the [pbs-drmaa](http://apps.man.poznan.pl/trac/pbs-drmaa/wiki) library and use this as the value for `$DRMAA_LIBRARY_PATH`.

**Slurm**: You will need to install [slurm-drmaa](http://apps.man.poznan.pl/trac/slurm-drmaa). In production on [usegalaxy.org](https://usegalaxy.org) we observed pthread deadlocks in slurm-drmaa that would cause Galaxy job handlers to eventually stop processing jobs until the handler was restarted. Compiling slurm-drmaa using the compiler flags `-g -O0` (keep debugging symbols, disable optimization) caused the deadlock to disappear.

### Parameters and Configuration

Most [options defined in the DRMAA interface](http://www.ogf.org/documents/GFD.143.pdf) are supported.  Exceptions include `remoteCommand`, `jobName`, `outputPath`, and `errorPath` since these attributes are set by Galaxy.  To pass parameters to your underlying DRM, use the `nativeSpecification` parameter.  The format of this parameter is dependent upon the underlying DRM.  However, for Grid Engine, it is the list of command line parameters that would be passed to `qsub(1)`.

```xml
<plugins>
    <plugin id="drmaa" type="runner" load="galaxy.jobs.runners.drmaa:DRMAAJobRunner"/>
</plugins>
<destinations default="sge_default">
    <destination id="sge_default" runner="drmaa"/>
    <destination id="big_jobs" runner="drmaa">
        <param id="nativeSpecification">-P bignodes -R y -pe threads 8</param>
    </destination>
</destinations>
```


## PBS

Runs jobs via the [TORQUE Resource Manager](http://www.adaptivecomputing.com/products/open-source/torque/).  For PBS Pro, use [DRMAA](#drmaa).

### Dependencies

Galaxy uses the [pbs_python](https://oss.trac.surfsara.nl/pbs_python/) module to interface with TORQUE.  pbs_python must be compiled against your TORQUE installation, so it cannot be provided with Galaxy.  However, we provide all the necessary automation to compile it, via Galaxy's egg scrambler ([more about Galaxy's Python eggs](../../../../Admin/Config/Eggs)):

```console
galaxy_user@galaxy_server% cd /clusterfs/galaxy/galaxy-app
galaxy_user@galaxy_server% LIBTORQUE_DIR=/path/to/libtorque python scripts/scramble.py -e pbs_python
```


#### Newer versions of TORQUE (>4.2)
Galaxy is compatible with newer versions of TORQUE now that pbs_python has been updated to add support for TORQUE >= v4.2.  Scrambling the new version of pbs_python is accomplished simply by modifying eggs.ini to use the new version of pbs_python:

```ini
;pbs_python = 4.3.5
pbs_python = 4.4.0
```


Then scramble as normal:
```console
galaxy_user@galaxy_server% cd /clusterfs/galaxy/galaxy-app
galaxy_user@galaxy_server% LIBTORQUE_DIR=/path/to/libtorque python scripts/scramble.py -e pbs_python
```


As of May 2014 there are still some outstanding bugs in pbs_python. Notably, error code translation is out of alignment.  For example if you get error #15025 "Bad UID for Job Execution" pbs_python will report this error incorrectly as "Queue already exists".  You may consult the [TORQUE source code](https://github.com/adaptivecomputing/torque/blob/4.2.7/src/include/pbs_error_db.h) for the proper error message that corresponds with a given error number.
   

### Parameters and Configuration

Most options available to `qsub(1b)` and `pbs_submit(3b)` are supported.  Exceptions include `-o/Output_Path`, `-e/Error_Path`, and `-N/Job_Name` since these PBS job attributes are set by Galaxy.  Parameters can be specified by either their flag (as used with `qsub`) or long name (as used with `pbs_submit`).

```xml
<plugins>
    <plugin id="pbs" type="runner" load="galaxy.jobs.runners.pbs:PBSJobRunner"/>
</plugins>
<destinations default="pbs_default">
    <destination id="pbs_default" runner="pbs"/>
    <destination id="other_cluster" runner="pbs">
        <param id="destination">@other.cluster</param>
    </destination>
    <destination id="long_jobs" runner="pbs">
        <param id="Resource_List">walltime=72:00:00,nodes=1:ppn=8</param>
        <param id="-p">128</param>
    </destination>
</destinations>
```


The value of *ppn=* is used by PBS to define the environment variable $PBS_NCPUS which in turn is used by galaxy for [GALAXY_SLOTS](../../../../Admin/Config/GALAXY_SLOTS).

## Condor

Runs jobs via the [HTCondor](http://research.cs.wisc.edu/htcondor/) DRM.  There are no configurable parameters.  Galaxy's interface is via calls to HTCondor's command line tools, rather than via an API.

```xml
<plugins>
    <plugin id="condor" type="runner" load="galaxy.jobs.runners.condor:CondorJobRunner"/>
</plugins>
<destinations>
    <destination id="condor" runner="condor"/>
</destinations>
```


Galaxy will submit jobs to HTCondor as the "galaxy" user (or whatever user the Galaxy server runs as).  In order for vanilla job execution to work as expected, your cluster should be configured with a common UID_DOMAIN to allow Galaxy's jobs to run as "galaxy" everywhere (instead of "nobody").

## Pulsar

Runs jobs via Galaxy [Pulsar](../../../../Admin/Config/Pulsar).  Pulsar does not require an existing cluster or a shared filesystem and can also run jobs on Windows hosts. It also has the ability to interface with all of the DRMs supported by Galaxy. Pulsar provides a much looser coupling between Galaxy job execution and the Galaxy server host than is possible with Galaxy's native job execution code.

[Full documentation on setup and configuration](http://pulsar.readthedocs.org/) is available.

## CLI

Runs jobs via a command-line/shell interface. The CLI runner itself takes plugins of two types:

* Shell: For interacting with different shell types. Plugins for rsh, ssh, and gsi-ssh are provided.
* Job: For interacting with a DRM via the DRM's command-line interface. A plugin for Torque is provided

If you are interested in developing additional plugins, see `galaxy-app/lib/galaxy/jobs/runners/cli_*` for examples.

### Parameters and Configuration

The cli runner requires, at a minimum, two parameters:

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> required <code><param></code>s </td>
  </tr>
  <tr class="th" >
    <th> <code>id</code> </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> <code>shell_plugin</code> </td>
    <td> <a href='https://bitbucket.org/galaxy/galaxy-central/src/tip/lib/galaxy/jobs/runners/cli_shell/'>a cli_shell class</a>, currently one of: <code>RemoteShell</code>, <code>SecureShell</code>, or <code>GlobusSecureShell</code> </td>
    <td> which shell plugin to use </td>
    <td> required </td>
    <td> <code><param id="shell_plugin">SecureShell</param></code> </td>
    <td> none </td>
  </tr>
  <tr>
    <td> <code>job_plugin</code> </td>
    <td> <a href='https://bitbucket.org/galaxy/galaxy-central/src/tip/lib/galaxy/jobs/runners/cli_job/'>a cli_job class</a>, currently <code>Torque</code> </td>
    <td> which job plugin to use </td>
    <td> required </td>
    <td> <code><param id="job_plugin">Torque</param></code> </td>
    <td> none </td>
  </tr>
</table>


All other parameters are specific to the chosen plugins. Parameters to pass to the shell plugin begin with the id `shell_` and parameters to pass to the job plugin begin with the id `job_`.

#### Shell Plugins

The `RemoteShell` plugin uses `rsh(1)` to connect to a remote system and execute shell commands.

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code>RemoteShell <param></code>s </td>
  </tr>
  <tr class="th" >
    <th> <code>id</code> </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> <code>shell_username</code> </td>
    <td> site-specific </td>
    <td> user to log in to the remote system as </td>
    <td> optional </td>
    <td> <code><param id="shell_username">foo</param></code> </td>
    <td> use <code>rsh</code>'s default behavior (attempt to log in with the current user's username) </td>
  </tr>
  <tr>
    <td> <code>shell_hostname</code> </td>
    <td> site-specific </td>
    <td> remote system hostname </td>
    <td> required </td>
    <td> <code><param id="shell_hostname">example.org</param></code> </td>
    <td> none </td>
  </tr>
  <tr>
    <td> <code>shell_rsh</code> </td>
    <td> site-specific </td>
    <td> <code>rsh</code>-like command to excute </td>
    <td> optional </td>
    <td> <code><param id="shell_rsh">/opt/example/bin/remsh</param></code> </td>
    <td> <code>rsh</code> </td>
  </tr>
</table>


The `RemoteShell` parameters translate to a command line of `% <shell_rsh> [-l <shell_username>] <shell_hostname> "<remote_command_with_args>"`, where the inclusion of `-l` is dependent on whether `shell_username` is set. Alternate values for `shell_rsh` must be compatible with this syntax.

The `SecureShell` plugin works like the `RemoteShell` plugin and takes the same parameters, with the following differences:

* The `shell_rsh` default value is `ssh`
* The command line that will be executed is `% <shell_rsh> -oStrictHostKeyChecking=yes -oConnectTimeout=60 [-l <shell_username>] <shell_hostname> "<remote_command_with_args>"`

The `GlobusSecureShell` plugin works like the `SecureShell` plugin and takes the same parameters, with the following difference:

* The `shell_rsh` default value is `gsi-ssh`

#### Job Plugins

The `Torque` plugin uses `qsub(1)` and `qstat(1)` to interface with a Torque server on the command line.

<table>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> <rowclass="th"> <code>Torque <param></code>s </td>
  </tr>
  <tr class="th" >
    <th> <code>id</code> </th>
    <th> values </th>
    <th> details </th>
    <th> required </th>
    <th> example </th>
    <th> default </th>
  </tr>
  <tr>
    <td> <code>job_<PBS_JOB_ATTR></code> </td>
    <td> see below </td>
    <td> <code><PBS_JOB_ATTR></code> refers to a <code>qsub(1B)</code> or <code>pbs_submit(3B)</code> argument/attribute </td>
    <td> optional </td>
    <td> <code><param id="job_Resource_List">walltime=24:00:00,ncpus=4</param></code> </td>
    <td> none </td>
  </tr>
</table>


Torque attributes can be defined in either their short (e.g. [qsub(1B)](http://cf.ccmr.cornell.edu/cgi-bin/w3mman2html.cgi?qsub(1B)) argument as used on the command line or in a script as `#PBS -<ARG>`) or long (e.g. [pbs_submit(3B)](http://cf.ccmr.cornell.edu/cgi-bin/w3mman2html.cgi?pbs_submit(3B)) attribute as used in the C library) oforms. Some additional examples follow:

* `<param id="job_-q">queue</param>`: set the PBS destination (in this example, a queue), equivalent to `<param id="job_destination">queue</param>`
* `<param id="job_Priority">128</param>`: set the job priority, equivalent to `<param id="job_-p">128</param>`

```xml
<plugins>
    <plugin id="cli" type="runner" load="galaxy.jobs.runners.cli:CLIJobRunner"/>
</plugins>
<destinations default="cli_default">
    <destination id="cli_default" runner="cli">
        <param id="shell_plugin">SecureShell</param>
        <param id="job_plugin">Torque</param>
        <param id="shell_hostname">cluster.example.org</param>
    </destination>
    <destination id="long_jobs" runner="cli">
        <param id="job_Resource_List">walltime=72:00:00,nodes=1:ppn=8</param>
        <param id="job_-p">128</param>
    </destination>
</destinations>
```


Most options available to `qsub(1b)` and `pbs_submit(3b)` are supported.  Exceptions include `-o/Output_Path`, `-e/Error_Path`, and `-N/Job_Name` since these PBS job attributes are set by Galaxy.

# Submitting Jobs as the Real User

Galaxy runs as a process on your server as whatever user starts the server - usually an account created for the purpose of running Galaxy. Jobs will be submitted to your cluster(s) as this user. In environments where users in Galaxy are guaranteed to be users on the underlying system (i.e. Galaxy is configured to use external authentication), it may be desirable to submit jobs to the cluster as the user logged in to Galaxy rather than Galaxy's system user.

## Caveats

Since this is a complex problem, the current solution does have some caveats:

* All of the datasets stored in Galaxy will have to be readable on the underlying filesystem by all Galaxy users. Said users need not have direct access to any systems which mount these filesystems, only the ability to run jobs on clusters that mount them. But I expect that in most environments, users will have the ability to submit jobs to these clusters or log in to these clusters outside of Galaxy, so this will be a security concern to evaluate for most environments.
  * *Technical details* - Since Galaxy maintains dataset sharing internally and all files are owned by the Galaxy user, when running jobs only under a single user, permissions can be set such that only the Galaxy user can read all datasets. Since the dataset may be shared by multiple users, it is not suitable to simply change ownership of inputs before a job runs (what if another user tried to use the same dataset as an input during this time?). This could possibly be solved if Galaxy had tight control over extended ACLs on the file, but since many different ACL schemes exist, Galaxy would need a module for each scheme to be supported.
* The real user system works by changing ownership of the job's working directory to the system user matching the Galaxy user's email address (with the @domain stripped off) prior to running the job, and back to the Galaxy user once the job has completed. It does this by executing a site-customizable script via [sudo](http://www.gratisoft.us/sudo/). The script accepts a path and does nothing to ensure that this path is a Galaxy working directory. So anyone who has access to the Galaxy user could use this script and sudo to change the ownership of any file or directory. Patches to tighten this are welcome.

## Configuration

You'll need to ensure that all datasets are stored on the filesystem such that they are readable by all users that will use Galaxy: either made readable by a group, or world-readable. If using a group, set your `umask(1)` to `027` or for world-readable, use `022` Setting the umask assumes your underlying filesystem uses POSIX permissions, so if this is not the case, your environment changes may be different.

The directory specified in `new_file_path` in the Galaxy config should be world-writable, cluster-accessible (via the same absolute path) and have its sticky bit (+t) set. This directory should also be cleaned regularly using a script or program as is appropriate for your site, since temporary files created here may not always be cleaned up under certain conditions.

The `outputs_to_working_directory` option in the Galaxy config **must** be set to `True`. This ensures that a tool/job's outputs are written to the temporary working directory, which (when using the real user system) is owned by the real user who submitted the job. If left set to the default (`False`), the tool will attempt to write directly to the directory specified in `file_path` (by default, `galaxy-app/database/files/`), which must be owned by the Galaxy user (and thus will not be writable by the real user).

Once these are set, you must set the `drmaa_external_*` settings in the Galaxy config and configure `sudo(8)` to allow them to be run.  A sudo config using the `drmaa_external_*` scripts set in the sample `universe_wsgi.ini` (`config/galaxy.ini`) would be:

```
galaxy  ALL = (root) NOPASSWD: SETENV: /opt/galaxy/scripts/drmaa_external_runner.py
galaxy  ALL = (root) NOPASSWD: SETENV: /opt/galaxy/scripts/drmaa_external_killer.py
galaxy  ALL = (root) NOPASSWD: SETENV: /usr/bin/chown
```


If your sudo config contains `Defaults    requiretty`, this option must be disabled.

Some maintenance and support of this code will be provided via the usual [Support](../../../../Support) channels, but improvements and fixes would be greatly welcomed, as this is a complex feature which is not used by the Galaxy Development Team.


# Contributors

* **[John Chilton](../../../../JohnChilton)**, developer and maintainer of the [Pulsar](../../../../Admin/Config/Pulsar) and [dynamic](http://lists.bx.psu.edu/pipermail/galaxy-dev/2012-June/010080.html) job runners.
* **Oleksandr Moskalenko**, debugged a number of problems related to running jobs as the real user and using DRMAA with TORQUE. 
* **Jaime Frey**, developer of the HTCondor job runner plugin.
* **Ilya Chorny**, developer of the original "real user" job running code.
