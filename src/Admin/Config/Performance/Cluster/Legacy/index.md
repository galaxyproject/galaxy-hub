---
autotoc: true
title: Running Galaxy Tools on a Cluster
---
PLACEHOLDER_INCLUDE(../../../../../Admin/Config/Performance/LinkBox)

Galaxy is designed to run jobs on your local system by default, but it can be configured to run jobs on a cluster. The front-end Galaxy application runs on a single server as usual, but tools are run on cluster nodes instead.




```wiki red/solid/light
This documentation applies to old Galaxy releases.  For the April 1, 2013 (tag `release_2013.04.01`) Galaxy release and newer, use the [current](../../../../../Admin/Config/Performance/Cluster) documentation.
```










## Cluster Resources Managers

<div class='left'><a href='http://www.drmaa.org'><img src="../../../../../Images/Logos/DRMAALogo200.png" alt="DRMAA" /></a></div>Galaxy is known to work with [TORQUE PBS](http://www.clusterresources.com/pages/products/torque-resource-manager.php), [Sun Grid Engine](http://gridengine.sunsource.net/), [Platform LSF](http://www.platform.com/workload-management/high-performance-computing), [PBS Pro](http://www.pbsworks.com/Product.aspx?id=1) and there's work in progress for [SLURM](https://computing.llnl.gov/linux/slurm/) (see this [blog post](http://mdahlo.blogspot.com/2011/06/galaxy-on-uppmax.html)). However, since Galaxy uses the [Distributed Resource Management Application API](http://www.drmaa.org), it should work with [any distributed resource manager (DRM) which implements the DRMAA](http://www.drmaa.org/implementations.php). Galaxy interfaces with these systems via [drmaa-python](http://code.google.com/p/drmaa-python/), although for legacy reasons, [pbs_python](https://subtrac.sara.nl/oss/pbs_python) can be used for TORQUE. If you successfully run Galaxy with another DRM, please let us know via an email to the [galaxy-dev mailing list](../../../../../MailingLists).




Galaxy contributor John Chilton has also written [Pulsar](../../../../../Admin/Config/Pulsar) which does not require an existing cluster or a shared filesystem and can also run jobs on Windows hosts. Please see the README included with Pulsar for instructions on how to set it up.




Installing and configuring your cluster hardware and management software is outside the scope of this document (and specific to each site). To continue, it's assumed that you have a working cluster installation wherein the user which you intend to run Galaxy with (we'll just refer to this as the "Galaxy user") is able to successfully run jobs via the resource manager's command line tools.




### drmaa egg

The drmaa egg is provided by Galaxy, but you must tell it where your resource manager's DRMAA library is located, and this is done with the `$DRMAA_LIBRARY_PATH` environment variable:




```
% export DRMAA_LIBRARY_PATH=/galaxy/lsf/7.0/linux2.6-glibc2.3-x86_64/lib/libdrmaa.so.1.0.3
% export DRMAA_LIBRARY_PATH=/galaxy/sge/lib/lx24-amd64/libdrmaa.so.1.0
```





**Important note on using the drmaa runner with TORQUE**: The drmaa egg and runner can be used with TORQUE, but you should not use the `libdrmaa.so` that is bundled with the TORQUE client, since using this library will result in a segmentation fault when the drmaa runner attempts to write the job template, and any native job runner options will not be passed to the DRM.  Instead, you should compile the [pbs-drmaa](http://apps.man.poznan.pl/trac/pbs-drmaa/wiki) library and use this as the value for `DRMAA_LIBRARY_PATH` instead.  Thanks to Oleksandr Moskalenko for debugging this problem and finding the solution.




### pbs_python egg

pbs_python is dependent upon TORQUE and is not provided by Galaxy. You must "scramble" it yourself (for more information on Galaxy's Python Egg dependencies, see the [Eggs](../../../../../Admin/Config/Eggs) page). Fortunately, this process should be simple:




```
LIBTORQUE_DIR=/path/to/libtorque python scripts/scramble.py -e pbs_python
```





## Preliminary Setup

Galaxy supports two different methods of cluster deployment:




* **Unified:** The copy of Galaxy on the application server is the same copy as the one on the cluster nodes. The most common method to do this would be to put Galaxy in NFS somewhere that is accessible by the application server and the cluster nodes. We'll refer to this as the *unified* method.
* **Staged:** The copy of Galaxy on the application server is NOT the same copy as the one on the cluster nodes. For example, Galaxy is put in local disk space on all the systems. This is a more complex configuration but can reduce stress on an NFS server for certain types of jobs. We'll refer to this as the *staged* method. Using the staged method is not recommended unless your tools are writing so much that it's causing problems with your NFS server. This process is fairly complex and assumes an intermediate level of *nix sysadmin knowledge. The staged method is currently only supported with TORQUE.  *Please note that the Staged Method is not in active use or development, and while we may be able to fix bugs that arise in this method due to changes in the way jobs run, not much time will be invested in maintaining it.*

For both methods, the path to Galaxy must be exactly the same on both the nodes and the application server. This is because absolute paths are used to refer to datasets when running the command on the cluster node. This is a limitation that should eventually be removed. Both methods are explained in further detail below.




### Unified Method

For this method, you'll simply need to ensure that your Galaxy user can access the Galaxy directory on the cluster nodes and the application server. Remember that the path must be the same on both. For example, if I were to check out Galaxy to my home directory:




```
galaxy_server% hg clone http://www.bx.psu.edu/hg/galaxy /home/nate/galaxy_dist
```





Then I should be able to access that directory from my cluster nodes:




```
galaxy_server% qsub -I
qsub: waiting for job 1234.torque.server to start
qsub: job 1234.torque.server ready

node1% cd /home/nate/galaxy_dist
node1%
```





One should also check that the job manager can accept jobs from the `galaxy` user.  This is typically not an issue unless the `galaxy` user lacks a shell login (not uncommon with secure server configurations); this may be an assigned shell of `/bin/false` (Debian/Ubuntu) or `/bin/nologin` (Fedora/RedHat).  A default shell login is typically required for job submission with [TORQUE/PBS](http://www.clusterresources.com/pages/products/torque-resource-manager.php); this can be set using `usermod`:




```
sudo usermod -s /bin/bash galaxy
```





If your cluster nodes have Internet access (NAT is okay) and you want to run the data source tools (upload, ucsc, etc.) on the cluster (doing so is highly recommended), please set `new_file_path` in `universe_wsgi.ini` to a directory somewhere in your shared filesystem:




```
new_file_path = /home/nate/galaxy_dist/database/tmp
```





Once set, comment/remove the local tool runner overrides from the bottom of `universe_wsgi.ini`, (such as `upload1 = local:///`) and then start Galaxy.




You may also find that you need to disable attribute caching in your filesystem.  In NFS this is done with the -noac mount option (Linux) or -actimeo=0 (Solaris).  The attribute cache can prevent Galaxy from detecting the presence of output files or properly reading their sizes.  Note that there is some performance trade-off here since all attributes will have to be read from the file server upon every file access.




### Staged Method

#### Configure file staging

This method makes use of PBS' stage-in/stage-out capabilities to copy the job's input datasets to the node and output datasets back from the node before and after the job runs. HOW these are staged is configured in TORQUE. By default, it uses rcp, but we suggest using scp. Information on how to configure staging is available in the [TORQUE Administrator Manual](http://www.clusterresources.com/wiki/doku.php?id=torque:torque_wiki). Ensure that both stage-in and stage-out works from your application server before proceeding.




TIP: To use scp, you'll need to make sure that the galaxy user can scp/ssh from EACH cluster node to the application server with no password or host key prompts! This usually means logging in to each node and initiating an ssh connection back to the application server to accept the host key (or pre-distributing the galaxy user's ~/.ssh/known_hosts file).




Here's the transcript of a brief test to make sure that it works as expected. The file /tmp/foo is created on the server and PBS copies it to the cluster node. Then, the file /tmp/bar is created on the cluster node, which PBS copies back to the server:




```
galaxy_server% echo foo > /tmp/foo
galaxy_server% qsub -I -W stagein=/tmp/foo@galaxy_server:/tmp/foo -W stageout=/tmp/bar@galaxy_server:/tmp/bar 
qsub: waiting for job 1235.torque.server to start
qsub: job 1235.torque.server ready




node1% cat /tmp/foo
foo
node1% echo bar > /tmp/bar
node1% exit

qsub: job 1235.torque.server completed
galaxy_server% cat /tmp/bar
bar
galaxy_server%
```





#### Copy Galaxy to your nodes

This can be any number of ways, in whatever method is convenient for you. Here at Penn State, we use rsync to keep the copy of Galaxy on the node consistent with the copy on the application server. This is run every so often via cfengine to ensure that the copy on the nodes is up to date, but it could also be done more simply with cron. Here's our rsync invocation:




```
/usr/bin/rsync -avz --exclude=galaxy_dist/database --exclude=\.svn --exclude=\*.log\* --exclude=\*.pid --delete galaxy_server\:/var/opt/galaxy_dist /var/opt
```





galaxy_dist is left off /var/opt intentionally - This copies the galaxy_dist directory from the galaxy_server to the /var/opt directory on the node.




#### Create a shared temporary directory

Some tools make use of temporary files created on the server, but accessed on the nodes. For this, you'll need to make a directory (galaxy_dist/database/tmp by default) available everywhere - we do this with NFS. Rather than directly mount the tmp directory in place, it's acceptable (and usually simpler) to create a symbolic link to some other location. This way you can use an automounter to manage the mount for you.




In the following example, galaxy_server shares a directory, /export/galaxy_tmp, via NFS to the cluster nodes. The cluster nodes mount this directory as /import/galaxy_tmp. On all systems, Galaxy is located at /var/opt/galaxy_dist.




```
galaxy_server% ln -s /export/galaxy_tmp /var/opt/galaxy_dist/database/tmp
galaxy_server% ssh node1
node1% ln -s /import/galaxy_tmp /var/opt/galaxy_dist/database/tmp
node1% exit
galaxy_server% ssh node2
node2% ln -s /import/galaxy_tmp /var/opt/galaxy_dist/database/tmp
node2% exit
galaxy_server%
...
```





Of course, this is terribly inefficient for anything more than a small handful of nodes, so you'll probably want to script it.




If your cluster nodes have Internet access (NAT is okay) and you want to run the data source tools (upload, ucsc, etc.) on the cluster (doing so is highly recommended), please set a temporary directory somewhere in your shared filesystem:




```
export TEMP=/var/opt/galaxy_dist/database/tmp
```





Once set, comment/remove the local tool runner overrides from the bottom of `universe_wsgi.ini`, (such as `upload1 = local:///`). You will most likely want to make the setting of `$TEMP` perisistent by putting it in your shell's startup file or the Galaxy init script.




#### Create a file stage directory

Because the datasets in Galaxy's galaxy_dist/database/files directory are stored in subdirectories, there's no way for PBS to stage them in unless the subdirectories already exist (which is not really possible)! We solve this problem by staging the datasets in and out of a different directory, and then symlink to those datasets from the galaxy_dist/database/files/ directory on the node. You'll need to pre-create this stage directory on all the nodes:




```
galaxy_server% ssh node1
node1% mkdir /tmp/galaxy_stage
node1% exit
galaxy_server% ssh node2
node2% mkdir /tmp/galaxy_stage
node2% exit
...
```





## Galaxy Configuration

A number of options need to be configured in Galaxy's universe_wsgi.ini file to use the cluster:




* **start_job_runners = pbs,drmaa** - A comma separated list of job runners to start in addition to the local runner. It's possible to have more than one cluster runner, although most sites will probably want to just set one. If no extra runners are started, all jobs are run on the Galaxy application server, regardless of what job_runner URL is specified in the [galaxy:tool_runners] section of the config file.
* **default_cluster_job_runner = [ !pbs:/// | !drmaa:/// ]** - The URL of the job runner to use when a job runner for a tool is not explicitly defined. This is ignored if **start_job_runners** is not set.

For the *unified* method, these are the only two options that should be set.




The **new_file_path** option in the config file is used to control where temporary files are written by the Galaxy framework, but the value of this option will not carry over to temporary files created by tools running on a cluster.  To control this (to prevent tools from writing to the default, /tmp, which may be a small partition), you should set the `$TEMP` environment variable **on your cluster nodes**, via one of a few methods:




* In the user's shell startup files (e.g. .bash_profile).  This works for TORQUE, but SGE invokes bash such that startup files are not read.
* For SGE, in the user's ~/.sge_request, with the **-v** option.
* In the file specified in the **environment_setup_file** option in the Galaxy config file.

For the *staged* method, the following options must also be set:




* **pbs_application_server = galaxy_server** - This is the hostname of the Galaxy application server, as seen from the cluster nodes. Since cluster nodes are often on a private network, this may not necessarily be the application server's public hostname. This is the hostname passed to ssh to copy the job's stdout and stderr files back to the application server, so whatever you set here must exist in the galaxy user's ~/.ssh/known_hosts file to prevent failure due to a host key prompt.
* **pbs_stage_path = /tmp/galaxy_stage** - The directory on the cluster nodes where datasets will be staged in and out. This must exist before you try to run jobs.
* **pbs_dataset_server = galaxy_server** - This is the hostname of the system where Galaxy's datasets are stored. This is probably the same as the application server, but here at Penn State, our datasets are housed on a separate fileserver and then mounted on the application server via NFS, so this option is necessary. Please note that if you have separate dataset fileserver, the full path to the datasets must again be the same as on the application server and cluster nodes. This is usually most easily acheived with symbolic links.

### The job runner URL

In the Galaxy config (universe_wsgi.ini), the desired job runner is specified with a URL. The format depends on the runner:




* **local:///** - The local runner. No arguments available.
* **pbs://[pbs_server]/[queue]/[pbs_options]** - The PBS runner. Arguments are the PBS server name, the queue name, any PBS-specific options, and all are optional:
  * **pbs:///** - Use the default queue on the default PBS server.
  * **pbs:///galaxy** - Use the 'galaxy' queue on the default PBS server.
  * **pbs://torque2.example.edu/** - Use the default queue on the torque2.example.edu PBS server.
  * **pbs:///bignodes/-l nodes=1:ppn=8,mem=32gb/** - Use the 'bignodes' queue and require 8 CPUs on one node and 32GB of memory. Separate multiple PBS flag options with spaces.
* **drmaa://[native_options]/** - The DRMAA runner. Arguments are any DRM-specific options, and are optional:
  * **drmaa:///** - Use the environment defaults for RM-specific attributes like queue and project.
  * **drmaa://-P bignodes -R y -pe threads 8/** - Use the 'bignodes' project and reserve a node with 8 cores for the tool. Separate multiple DRM flag options with spaces.

Please note that the **pbs_options** and **native_options** fields are considered to be a temporary solution and it is the intent of the Galaxy team to provide a more general interface to these fields in the future. However, no timeline has been set on development of a replacement (and this capability will not be removed before a replacement interface is developed).




## Tool Configuration

### Tool Runner Configuration

The config file has a section titled [galaxy:tool_runners], which is where you may place any per-tool job runner overrides. If an override isn't specified, where the tool is run depends on whether or not you started any runners in addition to the local runner.




* If the **start_job_runners** option is not set in universe_wsgi.ini, the local job runner will ALWAYS be used, regardless of whether or not the tool has an override specified.
* If the **start_job_runners** option IS set, then the [galaxy:tool_runners] section is consulted. If there's no override for the tool, then the URL specified in **default_cluster_job_runner** is what will be used to run the job.

If **start_job_runners** is set AND the tool has a [galaxy:tool_runners] entry, it will be consulted:




```
tool_id = runner_url:///
```





Primarily, this can be used to force jobs to run locally (by specifying **local:///** instead of on the cluster, which is set by default for most of the data source tools.




Or, if you want a tool to use a different DRM server or queue than the default set in universe_wsgi.ini, you can specify them on a tool-by-tool basis with the appropriate **pbs://** or **drmaa://** URL. An example of where this might be useful is a tool which needs larger amounts of memory than might be available on the nodes in the default queue.




### Tool Handler Configuration

You can also control which job handler will be used via the similarly named [galaxy:tool_handlers] configuration section.  The synax on the left hand of the assignment (tool_id[params]) syntax is identical to the tool_runners options.  On the right hand of the assignment, you can specify which handler should be used to handle jobs for the specified tool/params.  More details about how to configure multiple job handlers can be found on the [Admin/Config/Performance/Scaling](../../../../../Admin/Config/Performance/Scaling) page.




## Submitting Jobs as the Real User

Galaxy runs as a process on your server under whatever user starts the server - usually an account created for the purpose of running Galaxy. Jobs will be submitted to your cluster(s) as this user. In environments where users in Galaxy are guaranteed to be users on the underlying system (i.e. Galaxy is configured to use external authentication), it may be desirable to submit jobs to the cluster as the user logged in to Galaxy rather than Galaxy's system user.




### Caveats

Since this is a complex problem, the current solution does have some caveats:




* All of the datasets stored in Galaxy will have to be readable on the underlying filesystem by all Galaxy users. Said users need not have direct access to any systems which mount these filesystems, only the ability to run jobs on clusters that mount them. But I expect that in most environments, users will have the ability to submit jobs to these clusters or log in to these clusters outside of Galaxy, so this will be a security concern to evaluate for most environments.
  * *Technical details* - Since Galaxy maintains dataset sharing internally and all files are owned by the Galaxy user, when running jobs only under a single user, permissions can be set such that only the Galaxy user can read all datasets. Since the dataset may be shared by multiple users, it is not suitable to simply change ownership of inputs before a job runs (what if another user tried to use the same dataset as an input during this time?). This could possibly be solved if Galaxy had tight control over extended ACLs on the file, but since many different ACL schemes exist, Galaxy would need a module for each scheme to be supported.
* The real user system works by changing ownership of the job's working directory to the system user matching the Galaxy user's email address (with the @domain stripped off) prior to running the job, and back to the Galaxy user once the job has completed. It does this by executing a site-customizable script via [sudo](http://www.gratisoft.us/sudo/). The script accepts a path and does nothing to ensure that this path is a Galaxy working directory. So anyone who has access to the Galaxy user could use this script and sudo to change the ownership of any file or directory. Patches to tighten this are welcome.

### Configuration

You'll need to ensure that all datasets are stored on the filesystem such that they are readable by all users that will use Galaxy: either made readable by a group, or world-readable. If using a group, set your `umask(1)` to **027** or for world-readable, use **022** Setting umask assumes your underlying filesystem uses POSIX permissions, so if this is not the case, your environment changes may be different.




The directory specified in `new_file_path` in the Galaxy config should be world-writable, cluster-accessible (via the same absolute path) and have its sticky bit (+t) set. This directory should also be cleaned regularly using a script or program as is appropriate for your site, since temporary files created here may not always be cleaned up under certain conditions.




The `set_metadata_externally` and `outputs_to_working_directory` options in the Galaxy config **must** be set to `True`. `set_metadata_externally` is always recommended for Galaxy servers running outside of a single user's development environment. `outputs_to_working_directory` ensures that a tool/job's outputs are written to the temporary working directory, which (when using the real user system) is owned by the real user who submitted the job. If left set to the default (`False`), the tool will attempt to write directly to the directory specified in `file_path` (by default, `galaxy-dist/database/files/`), which must be owned by the Galaxy user (and thus will not be writable by the real user).




Once these are set, you must set the `drmaa_external_*` settings in the Galaxy config and configure sudo to allow them to be run.  A sudo config using the `drmaa_external_*` scripts set in the sample `universe_wsgi.ini` would be:




```
galaxy  ALL = (root) NOPASSWD: SETENV: /opt/galaxy/scripts/drmaa_external_runner.py
galaxy  ALL = (root) NOPASSWD: SETENV: /opt/galaxy/scripts/drmaa_external_killer.py
galaxy  ALL = (root) NOPASSWD: SETENV: /usr/bin/chown
```





If your sudo config contains `Defaults    requiretty`, this option must be disabled.




Some maintenance and support of this code will be provided via the usual [Support](../../../../../Support) channels, but improvements and fixes would be greatly welcomed, as this is a complex feature which is not used by the Galaxy Development Team.
