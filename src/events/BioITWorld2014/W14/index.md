---
autotoc: true
title: Workshop 14, :,  Running a Local Galaxy Instance
---

[Adam Kraut](http://bioteam.net/company-leadership/), [Nate Coraor](/nate), [Anushka Brownley](http://bioteam.net/company-leadership/), Tristan Lubinski, [James Reaney](http://www.sgi.com/solutions/genomics)

<br />
![](https://dev.twitter.com/sites/default/files/images_documentation/bird_blue_16.png) #usegalaxy #BioIT2014

This page covers the follow-along steps of the workshop. Other material from the workshop may be found on  [/Events/BioITWorld2014](/Events/BioITWorld2014) or [the Bio-IT World Expo workshop details page](http://www.bio-itworldexpo.com/Bio-It_Expo_Content.aspx?id=135152).



For this workshop we will be using virtual machines on an SGI UV system at Penn State (provided by workshop sponsor SGI). You will need an SSH client (`ssh` in Terminal on OS X and Linux, or e.g. [PuTTY](http://the.earth.li/~sgtatham/putty/latest/x86/putty.exe) on Windows). Login details for the virtual machines are:

<table>
  <tr>
    <th> Hostnames </th>
    <td> <code>bioit[1-39].galaxyproject.org</code> </td>
  </tr>
  <tr>
    <th> Username </th>
    <td> <code>ubuntu</code> </td>
  </tr>
  <tr>
    <th> Password </th>
    <td> <code>galaxy</code> </td>
  </tr>
</table>


The virtual machines are running a bare installation of Ubuntu 14.04 LTS.

**Please use Firefox or Chrome for this tutorial.** Galaxy is compatible with all modern versions of Firefox, Chrome, Safari, and Internet Explorer. However, for the purposes of this tutorial it will help us when assisting people encountering problems if only Firefox or Chrome are used.

# Setting up a Local Galaxy Tutorial (Part I)

## Clone (download) Galaxy

The Galaxy distribution is found at [https://bitbucket.org/galaxy/galaxy-dist/](https://bitbucket.org/galaxy/galaxy-dist/), but for the purposes of this workshop, we'll use a trimmed version to decrease the time it takes to clone.

```
#!highlight console
ubuntu@bioit:~$ hg clone https://bitbucket.org/natefoo/galaxy-bioit galaxy-dist
The program 'hg' is currently not installed. You can install it by typing:
sudo apt-get install mercurial
ubuntu@bioit:~$
```


An introduction to the system package manager (APT):

```
#!highlight console
ubuntu@bioit:~$ sudo apt-get update
[sudo] password for ubuntu: galaxy
  ...
Fetched 179 kB in 4s (41.2 kB/s)
Reading package lists... Done
ubuntu@bioit:~$ sudo apt-get install mercurial
  ...
After this operation, 86.7 MB of additional disk space will be used.
Do you want to continue? [Y/n]
  ...
ubuntu@bioit:~$
```


Trying again:

```
#!highlight console
ubuntu@bioit:~$ hg clone https://bitbucket.org/natefoo/galaxy-bioit galaxy-dist
requesting all changes
adding changesets
adding manifests
adding file changes
added 8 changesets with 3443 changes to 3443 files
updating to branch default
3443 files updated, 0 files merged, 0 files removed, 0 files unresolved
ubuntu@bioit:~/galaxy-dist$
```



### References

* [getgalaxy.org](http://getgalaxy.org)
* [Galaxy Wiki/documentation](https://wiki.galaxyproject.org)

## Update to the stable branch

```
#!highlight console
ubuntu@bioit:~$ cd galaxy-dist
ubuntu@bioit:~/galaxy-dist$ hg update stable
0 files updated, 0 files merged, 0 files removed, 0 files unresolved
ubuntu@bioit:~/galaxy-dist$
```


## Start Galaxy

```
#!highlight console
ubuntu@bioit:~/galaxy-dist$ sh run.sh
Initializing datatypes_conf.xml from datatypes_conf.xml.sample
  ...
Some eggs are out of date, attempting to fetch...
Fetched http://scofield.galaxyproject.org/eggs/Mako/Mako-0.4.1-py2.7.egg
  ...
Fetch successful.
python path is: /home/ubuntu/galaxy-dist/eggs/mercurial-2...
  ...
Starting server in PID 3091.
serving on http://127.0.0.1:8080
```


## Serve over public interface

Stop Galaxy by hitting `CTRL-c`:

```
#!highlight console
serving on http://127.0.0.1:8080
^Cgalaxy.jobs.handler INFO 2014-04-23 13:27:59,203 sending stop signal to worker thread
galaxy.jobs.handler INFO 2014-04-23 13:27:59,204 job handler queue stopped
galaxy.jobs.runners INFO 2014-04-23 13:27:59,204 LWRRunner: Sending stop signal to monitor thread
galaxy.jobs.runners INFO 2014-04-23 13:27:59,204 LWRRunner: Sending stop signal to 3 worker threads
galaxy.jobs.runners INFO 2014-04-23 13:27:59,204 LocalRunner: Sending stop signal to 5 worker threads
galaxy.jobs.handler INFO 2014-04-23 13:27:59,205 sending stop signal to worker thread
galaxy.jobs.handler INFO 2014-04-23 13:27:59,205 job handler stop queue stopped
ubuntu@bioit:~/galaxy-dist$
```


Edit the primary Galaxy configuration file, `universe_wsgi.ini`. If you are not familiar with `vi`, I suggest using `nano` instead.

```
#!highlight console
ubuntu@bioit:~/galaxy-dist$ vi universe_wsgi.ini
```


In the `[server:main]` section, uncomment `#host = 127.0.0.1` and set:

```
#!highlight ini
host = 0.0.0.0
```


While we are in the config, we should set two options necessary for the next section. The file is large and it's easiest to search for these (`/<pattern>` in vi, `CTRL-w` `<pattern>` in nano):

```
#!highlight ini
[app:main]
admin_users = nate@bx.psu.edu
tool_dependency_dir = /home/ubuntu/tool_deps
```


Then save and quit (`CTRL-x` `y` `ENTER` in nano). Start Galaxy again:

```
#!highlight console
ubuntu@bioit:~/galaxy-dist$ sh run.sh
  ...
Starting server in PID 3298.
serving on 0.0.0.0:8080 view at http://127.0.0.1:8080
```


The message `view at http://127.0.0.1:8080` is generated by the embedded webserver and cannot be changed so it is not entirely accurate, but `serving on 0.0.0.0:8080` reveals that the server is now listening on public interfaces.

<table>
  <tr class="th" >
    <th colspan=10 style=" text-align: center;"> VM Galaxy Instances </th>
  </tr>
  <tr>
    <td> <a href='http://bioit0.galaxyproject.org:8080'>bioit0</a> </td>
    <td> <a href='http://bioit1.galaxyproject.org:8080'>bioit1</a> </td>
    <td> <a href='http://bioit2.galaxyproject.org:8080'>bioit2</a> </td>
    <td> <a href='http://bioit3.galaxyproject.org:8080'>bioit3</a> </td>
    <td> <a href='http://bioit4.galaxyproject.org:8080'>bioit4</a> </td>
    <td> <a href='http://bioit5.galaxyproject.org:8080'>bioit5</a> </td>
    <td> <a href='http://bioit6.galaxyproject.org:8080'>bioit6</a> </td>
    <td> <a href='http://bioit7.galaxyproject.org:8080'>bioit7</a> </td>
    <td> <a href='http://bioit8.galaxyproject.org:8080'>bioit8</a> </td>
    <td> <a href='http://bioit9.galaxyproject.org:8080'>bioit9</a> </td>
  </tr>
  <tr>
    <td> <a href='http://bioit10.galaxyproject.org:8080'>bioit10</a> </td>
    <td> <a href='http://bioit11.galaxyproject.org:8080'>bioit11</a> </td>
    <td> <a href='http://bioit12.galaxyproject.org:8080'>bioit12</a> </td>
    <td> <a href='http://bioit13.galaxyproject.org:8080'>bioit13</a> </td>
    <td> <a href='http://bioit14.galaxyproject.org:8080'>bioit14</a> </td>
    <td> <a href='http://bioit15.galaxyproject.org:8080'>bioit15</a> </td>
    <td> <a href='http://bioit16.galaxyproject.org:8080'>bioit16</a> </td>
    <td> <a href='http://bioit17.galaxyproject.org:8080'>bioit17</a> </td>
    <td> <a href='http://bioit18.galaxyproject.org:8080'>bioit18</a> </td>
    <td> <a href='http://bioit19.galaxyproject.org:8080'>bioit19</a> </td>
  </tr>
  <tr>
    <td> <a href='http://bioit20.galaxyproject.org:8080'>bioit20</a> </td>
    <td> <a href='http://bioit21.galaxyproject.org:8080'>bioit21</a> </td>
    <td> <a href='http://bioit22.galaxyproject.org:8080'>bioit22</a> </td>
    <td> <a href='http://bioit23.galaxyproject.org:8080'>bioit23</a> </td>
    <td> <a href='http://bioit24.galaxyproject.org:8080'>bioit24</a> </td>
    <td> <a href='http://bioit25.galaxyproject.org:8080'>bioit25</a> </td>
    <td> <a href='http://bioit26.galaxyproject.org:8080'>bioit26</a> </td>
    <td> <a href='http://bioit27.galaxyproject.org:8080'>bioit27</a> </td>
    <td> <a href='http://bioit28.galaxyproject.org:8080'>bioit28</a> </td>
    <td> <a href='http://bioit29.galaxyproject.org:8080'>bioit29</a> </td>
  </tr>
  <tr>
    <td> <a href='http://bioit30.galaxyproject.org:8080'>bioit30</a> </td>
    <td> <a href='http://bioit31.galaxyproject.org:8080'>bioit31</a> </td>
    <td> <a href='http://bioit32.galaxyproject.org:8080'>bioit32</a> </td>
    <td> <a href='http://bioit33.galaxyproject.org:8080'>bioit33</a> </td>
    <td> <a href='http://bioit34.galaxyproject.org:8080'>bioit34</a> </td>
    <td> <a href='http://bioit35.galaxyproject.org:8080'>bioit35</a> </td>
    <td> <a href='http://bioit36.galaxyproject.org:8080'>bioit36</a> </td>
    <td> <a href='http://bioit37.galaxyproject.org:8080'>bioit37</a> </td>
    <td> <a href='http://bioit38.galaxyproject.org:8080'>bioit38</a> </td>
    <td> <a href='http://bioit39.galaxyproject.org:8080'>bioit39</a> </td>
  </tr>
</table>


## Installing tools from the Tool Shed

### Topics for this section

* What is a Galaxy tool?
  * Basic: An XML description of the tool's interface, allowing Galaxy to render a UI (tool form), as well as the command line to execute.
  * Complex: XML + wrapper scripts and interfaces to external dependencies
* Exploring preinstalled tools and filesystem layout
  * `galaxy-dist/tool_conf.xml`
  * `galaxy-dist/tools/`
  * Example simple tool: `galaxy-dist/tools/filters/sorter.xml` (tool xml), `galaxy-dist/tools/filters/sorter.py` (tool code)
  * Example tool with unmet dependencies: `galaxy-dist/tools/sr_mapping/mosaik.xml`
* The Tool Shed
  * Installing tools from the Tool Shed
  * Exploring the filesystem layout of tools installed from the Tool Shed

### Install a tool from the Tool Shed

```wiki blue/solid/light
**You will need to enable 3rd-party cookies in your browser for Tool Shed installations to work:**

  * Chrome: Settings -> Show advanced settings... -> Privacy -> Content Settings... -> Block third-party cookies and site data -> *uncheck*
  * Firefox: Settings -> Privacy -> History -> Firefox will: *Remember history* **or** Firefox will: *Use custom settings for history* -> Accept third-party cookies: *Always*

Reload the Galaxy interface if your 3rd party cookies were not previously enabled.```


<br />
* Register an account that matches the address you set in `admin_users`
* Follow the [tutorial on installing tools from the Tool Shed](/Admin/Tools/AddToolFromToolShedTutorial). In brief:
  * Click **Admin** from the masthead
  * Click **Search and browse tool sheds** from the left panel
  * Click the popup icon for **Galaxy main tool shed** and select **Search for valid tools**
  * Search for **Tool name**s that contain the name `bwa`
  * Click the popup icon for **bwa_wrappers** and select **Install to Galaxy**
  * Select the **NGS: Mapping** section and click **Install to Galaxy**
* Tools (XML, wrapper scripts) are installed in `/home/ubuntu/shed_tools`
* Tool dependencies (binaries) are installed in `/home/ubuntu/tool_deps`

### References

* [Tools hub page](/Admin/Tools)
* [Tutorial on adding custom tools](/Admin/Tools/AddToolTutorial)
* [Tutorial on installing tools from the Tool Shed](/Admin/Tools/AddToolFromToolShedTutorial)
* [Current tools/ directory](https://bitbucket.org/galaxy/galaxy-central/src/3b42725359224832317a066d95dff596f93ab33f/tools?at=stable)
* [Tool Shed hub page](/ToolShed)
* [Tool Shed tour](/ToolShed/Tour)
* [Galaxy Main Tool Shed](http://toolshed.g2.bx.psu.edu/)

## Managing local data

### Topics for this section

* What is local data?
* Manual data inclusion
  * Building indexes on the command line
  * `.loc` files
  * `tool_data_table_conf.xml`
  * Example of the above with bwa and S. cerevisiae (sacCer2) [transcript](#adding-local-data-by-hand)
* Galaxy Data Managers

### Adding local data with a Galaxy Data Manager

Install data managers for fetching the reference genome and building BWA indexes:

* Click **Admin** from the masthead
* Click **Search and browse tool sheds** from the left panel
* Click the popup icon for **Galaxy main tool shed** and select **Search for valid tools**
* Search for **Tool id**s that contain the name `manager`
* Check **data_manager_fetch_genome_all_fasta** and **data_manager_bwa_index_builder**, then click **Install to Galaxy** (at the bottom of the page)
* Click **Install**

Fetch reference genome (fasta):

* Click **Manage local data (beta)** from the left panel
* Click **Reference Genome - fetching**
* In the **DBKEY to assign to data:** field, type `sacCer2`
* In the **UCSC's DBKEY for source FASTA:** field, type `sacCer2`
* Click **Execute**

Build BWA indexes:

* Click **Manage local data (beta)** from the left panel
* Click **BWA index - builder**
* Click **Execute**

Upon completion:

* `galaxy-dist/tool-data/sacCer2/seq/sacCer2.fa` has been created from chromosome fastas fetched from UCSC
* `galaxy-dist/tool-data/sacCer2/bwa_index/sacCer2.fa.*` indexes have been generated with `bwa index`
* `galaxy-dist/tool-data/toolshed.g2.bx.psu.edu/repos/devteam/data_manager_fetch_genome_all_fasta/2ebc856bce29/all_fasta.loc` contains a reference to the newly created `sacCer2.fa`
* `galaxy-dist/tool-data/toolshed.g2.bx.psu.edu/repos/devteam/data_manager_bwa_index_builder/367878cb3698/bwa_index.loc` contains a reference to the newly built bwa indexes
* `galaxy-dist/shed_tool_data_table_conf.xml` includes entries for the `all_fasta` and `bwa_indexes` data tables

### References

* [(Manual) index building](/Admin/DataPreparation)
* [(Manual) data integration](/Admin/DataIntegration)
* [Automated data management with Data Managers](/Admin/Tools/DataManagers)

# Setting up a Local Galaxy Tutorial (Part II)

Documentation for the features used in this section can be found at [usegalaxy.org/production](https://usegalaxy.org/production) (forwards to [/Admin/Config/Performance/ProductionServer](/Admin/Config/Performance/ProductionServer))

## Install and configure PostgreSQL

```hightlight console
ubuntu@bioit:~$ sudo apt-get install postgresql
  ...
After this operation, 15.5 MB of additional disk space will be used.
Do you want to continue? [Y/n]
  ...
Creating new cluster 9.3/main ...
  config /etc/postgresql/9.3/main
  data   /var/lib/postgresql/9.3/main
  locale en_US.UTF-8
  port   5432
* Starting PostgreSQL 9.3 database server
    ...done.
ubuntu@bioit:~$ sudo -u postgres createuser galaxy
ubuntu@bioit:~$ sudo -u postgres createdb -O galaxy galaxy
```


## Create a new user for Galaxy

```console
ubuntu@bioit:~$ sudo useradd -m -s /bin/bash galaxy
ubuntu@bioit:~$
```


## Create a Python virtual environment

```console
ubuntu@bioit:~$ sudo apt-get install python-virtualenv
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following extra packages will be installed:
  ...
Do you want to continue? [Y/n]
  ...
Get:1 http://us.archive.ubuntu.com/ubuntu/ trusty/main libasan0 amd64 4.8.2-19ubuntu1 [63.0 kB]
  ...
Processing triggers for libc-bin (2.19-0ubuntu6) ...
ubuntu@bioit:~$ sudo -iu galaxy
galaxy@bioit:~$ virtualenv venv
New python executable in venv/bin/python
Installing setuptools, pip...done.
galaxy@bioit:~$ source ./venv/bin/activate
(venv)galaxy@bioit:~$
```


## Clone (download) Galaxy

```console
galaxy@bioit:~$ hg clone https://bitbucket.org/natefoo/galaxy-bioit galaxy-dist
requesting all changes
adding changesets
adding manifests
adding file changes
added 8 changesets with 3443 changes to 3443 files
updating to branch default
3443 files updated, 0 files merged, 0 files removed, 0 files unresolved
galaxy@bioit:~$ cd galaxy-dist
galaxy@bioit:~/galaxy-dist$ hg update stable
0 files updated, 0 files merged, 0 files removed, 0 files unresolved
galaxy@bioit:~/galaxy-dist$
```


## Configure Galaxy

```console
galaxy@bioit:~/galaxy-dist$ cp universe_wsgi.ini.sample universe_wsgi.ini
galaxy@bioit:~/galaxy-dist$ vi universe_wsgi.ini
```


Add the following section for uWSGI's configuration and the job handler processes

```ini
[uwsgi]
socket = 127.0.0.1:4001
stats = 127.0.0.1:9191
processes = 2
threads = 4
master = True
logto = /home/galaxy/uwsgi.log
pythonpath = lib

[server:handler0]
use = egg:Paste#http
port = 9010
use_threadpool = True
threadpool_workers = 10

[server:handler1]
use = egg:Paste#http
port = 9011
use_threadpool = True
threadpool_workers = 10
```


Set the following settings in the `[app:main]` section:

```ini
database_connection = postgresql:///galaxy?host=/var/run/postgresql
database_engine_option_server_side_cursors = True
database_engine_option_strategy = threadlocal
tool_dependency_dir = /home/galaxy/tool_deps
static_enabled = False
nginx_x_accel_redirect_base = /_x_accel_redirect
nginx_upload_store = /home/galaxy/uploads
nginx_upload_path = /_upload
log_events = False
log_actions = False
debug = False
use_interactive = False
id_secret = <random text>
admin_users = nate@bx.psu.edu
```


Explanations of these options:

* `database_connection = postgresql:///galaxy?host=/var/run/postgresql` - Use a PostgreSQL database via a local UNIX domain socket (the socket is in `/var/run/postgresql`). [documentation](/Admin/Config/Performance/ProductionServer#switching_to_a_database_server)
* `database_engine_option_server_side_cursors = True` - Keep large SQL query results on the PostgreSQL server, rather the transferring the entire result set to the Galaxy processes.
* `database_engine_option_strategy = threadlocal` - Only use one database connection per thread
* `tool_dependency_dir = /home/galaxy/tool_deps` - The directory that will house tool dependencies
* `static_enabled = False` - Static content will be served by the proxy server
* `nginx_x_accel_redirect_base = /_x_accel_redirect` - Delegate dataset downloads to nginx
* `nginx_upload_store = /home/galaxy/uploads` - Delegate uploads to nginx, set temporary directory
* `nginx_upload_path = /_upload` - Special path configured in nginx where uploads will be POSTed
* `log_events = False` - Don't log events in the database (faster)
* `log_actions = False` - Don't log actions in the database (faster)
* `debug = False` - Disables debugging middleware that loads server responses in to memory (can crash the server when handling large files)
* `use_interactive = False` - Disables live client browser debugging (insecure).
* `id_secret = <random text>` - Ensures that the encoded IDs used by Galaxy (especially session IDs) are unique.  One simple way to generate a value for this is with a shell command like `$ date | md5sum`
* `admin_users = nate@bx.psu.edu` - Make nate@example.org an administrator. Galaxy's Admin UI is only accessible if you define administrators here!

Honorable mentions for features we won't use today but that are common in big setups:

* `ftp_upload_dir` and `ftp_upload_site` - Allow users to upload data to the server using FTP
* `use_remote_user` and `remote_user_maildomain` - Use your institution's existing authentication system to log in to Galaxy. [Apache documentation](/Admin/Config/ExternalUserDatbases) or [nginx documentation](/Admin/Config/nginxProxy#external_user_authentication)
* `allow_user_impersonation` - Users configured as administrators (with `admin_users`) can "become" other users to view Galaxy exactly as the impersonated user does. Useful for providing support.
* `library_import_dir` - Administrators can directly import datasets from this directory on the server to Data Libraries.  This includes an option that allows an effective "symlink" to the data, rather than copying it in to Galaxy's `file_path` directory. [documentation](/Admin/DataLibraries/UploadingLibraryFiles)
* `user_library_import_dir` - Non-administrators can directly import datasets from this directory on this server to Data Libraries from which they have been given write permission. [documentation](/Admin/DataLibraries/UploadingLibraryFiles)
* `allow_library_path_paste` - Administrators can import datasets from anywhere on the server's filesystem(s) by entering their paths in to a text box
* `object_store_config_file` - Configure Galaxy's "object storage" layer to store data in multiple filesystems, Amazon S3, iRODS, etc.
* `error_email_to` (with `smtp_server`) - Allow users to send bug reports directly to you
* `user_activation_on` and related options - Require new users to verify their email address
* `allow_user_dataset_purge = True` - Allow users to forcibly remove their datasets from disk (note that the data is only actually removed if all versions of a shared dataset are purged by all users who are sharing the dataset). By default, Galaxy does not remove data, as this is done at a later time by the dataset cleanup scripts.
* `enable_quotas = True` - Enable Galaxy's quota system. Quotas are configured by administrators in the Galaxy Admin UI

Create a job system configuration:

```console
galaxy@bioit:~/galaxy-dist$ vi job_conf.xml
```


In the editor, paste:

```xml
<?xml version="1.0"?>
<job_conf>
    <plugins workers="2">
        <plugin id="gridengine" type="runner" load="galaxy.jobs.runners.drmaa:DRMAAJobRunner"/>
    </plugins>
    <handlers default="handlers">
        <handler id="handler0" tags="handlers"/>
        <handler id="handler1" tags="handlers"/>
    </handlers>
    <destinations default="gridengine">
        <destination id="gridengine" runner="gridengine"/>
    </destinations>
    <limits>
        <limit type="registered_user_concurrent_jobs">2</limit>
        <limit type="unregistered_user_concurrent_jobs">1</limit>
        <limit type="job_walltime">24:00:00</limit>
    </limits>
</job_conf>
```


## Start a Galaxy server to complete first run setup

```console
galaxy@bioit:~/galaxy-dist$ sh run.sh
Initializing datatypes_conf.xml from datatypes_conf.xml.sample
  ...
serving on http://127.0.0.1:8080
^C
  ...
galaxy@bioit:~/galaxy-dist$ logout
ubuntu@bioit:~$
```


## Install and configure Grid Engine

```console
ubuntu@bioit:~$ sudo apt-get install gridengine-master gridengine-exec gridengine-client gridengine-drmaa1.0
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following extra packages will be installed:
  bsd-mailx gridengine-common postfix tcsh
Suggested packages:
  gridengine-qmon procmail postfix-mysql postfix-pgsql postfix-ldap postfix-pcre sasl2-bin dovecot-common postfix-cdb mail-reader postfix-doc
The following NEW packages will be installed:
  bsd-mailx gridengine-client gridengine-common gridengine-drmaa1.0 gridengine-exec gridengine-master postfix tcsh
0 upgraded, 8 newly installed, 0 to remove and 5 not upgraded.
Need to get 9,172 kB of archives.
After this operation, 51.6 MB of additional disk space will be used.
Do you want to continue? [Y/n]
  ...
Preconfiguring packages ...
```


You'll be asked a series of configuration questions for Postfix and Grid Engine at this point. The following answers are suitable for this workshop:

* General type of mail configuration: Local only
* System mail name: bioit
* Configure SGE automatically?: Yes
* SGE cell name: default
* SGE master hostname: bioit

```console
ubuntu@bioit:~$ sudo vi /var/lib/gridengine/default/common/host_aliases
  ...
localhost bioit
  ...
ubuntu@bioit:~$ sudo service gridengine-master restart
ubuntu@bioit:~$ sudo pkill sge_execd && sudo service gridengine-exec restart
ubuntu@bioit:~$ sudo qconf -aq all.q
  ...
hostlist              localhost
shell                 /bin/bash
  ...
ubuntu@bioit:~$ sudo qconf -as localhost
localhost added to submit host list
ubuntu@bioit:~$
```


## Install nginx, uWSGI, and supervisord

```console
ubuntu@bioit:~$ sudo add-apt-repository ppa:natefoo/bioit2014
 Provides a rebuilt nginx-extras with the upload module for the workshop @
 Bio-IT World Expo 2014
 More info: https://launchpad.net/~natefoo/+archive/bioit2014
Press [ENTER] to continue or ctrl-c to cancel adding it

gpg: keyring `/tmp/tmp71rhd5g3/secring.gpg' created
gpg: keyring `/tmp/tmp71rhd5g3/pubring.gpg' created
gpg: requesting key 12788738 from hkp server keyserver.ubuntu.com
gpg: /tmp/tmp71rhd5g3/trustdb.gpg: trustdb created
gpg: key 12788738: public key "Launchpad PPA for Nate Coraor" imported
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
OK
ubuntu@bioit:~$ sudo apt-get update
  ...
﻿﻿Fetched 141 kB in 4s (34.0 kB/s)
Reading package lists... Done
ubuntu@bioit:~$ sudo apt-get install nginx-extras uwsgi uwsgi-plugin-python supervisor
  ...
After this operation, 10.4 MB of additional disk space will be used.
Do you want to continue? [Y/n]
Get:1 http://ppa.launchpad.net/natefoo/bioit2014/ubuntu/ trusty/main nginx-common all 1.4.6-1ubuntu3ppa1 [81.5 kB]
Get:2 http://ppa.launchpad.net/natefoo/bioit2014/ubuntu/ trusty/main nginx-extras amd64 1.4.6-1ubuntu3ppa1 [570 kB]
  ...
ubuntu@bioit:~$ sudo /etc/init.d/nginx stop
ubuntu@bioit:~$ sudo update-rc.d -f nginx remove
 Removing any system startup links for /etc/init.d/nginx ...
   /etc/rc0.d/K20nginx
   /etc/rc1.d/K20nginx
   /etc/rc2.d/S20nginx
   /etc/rc3.d/S20nginx
   /etc/rc4.d/S20nginx
   /etc/rc5.d/S20nginx
   /etc/rc6.d/K20nginx
ubuntu@bioit:~$ sudo update-rc.d -f uwsgi remove
 Removing any system startup links for /etc/init.d/uwsgi ...
   /etc/rc0.d/K20uwsgi
   /etc/rc1.d/K20uwsgi
   /etc/rc2.d/S20uwsgi
   /etc/rc3.d/S20uwsgi
   /etc/rc4.d/S20uwsgi
   /etc/rc5.d/S20uwsgi
   /etc/rc6.d/K20uwsgi
ubuntu@bioit:~$ 
```


## Configure nginx

```console
ubuntu@bioit:~$ cd /etc/nginx
ubuntu@bioit:/etc/nginx$ sudo vi nginx.conf
  ...
  user galaxy;
  daemon off;
  http {
      gzip_vary on;
      gzip_proxied any;
      gzip_comp_level 6;
      gzip_buffers 16 8k;
      gzip_http_version 1.1;
      gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
  }
  ...
ubuntu@bioit:/etc/nginx$ cd sites-available
ubuntu@bioit:/etc/nginx/sites-available$ sudo vi galaxy
```


In the editor, paste:

```nginx

client_max_body_size 50g;
uwsgi_read_timeout 300;

server {
    listen 80 default_server;
    server_name  bioit.galaxyproject.org;

    # pass to uWSGI by default
    location / {
        uwsgi_pass 127.0.0.1:4001;
        include uwsgi_params;
    }

    # serve static content
    location /static {
        alias /home/galaxy/galaxy-dist/static;
        gzip on;
        gzip_types text/plain text/xml text/javascript text/css application/x-javascript;
        expires 24h;
    }
    location /static/style {
        alias /home/galaxy/galaxy-dist/static/style/blue;
        gzip on;
        gzip_types text/plain text/xml text/javascript text/css application/x-javascript;
        expires 24h;
    }
    location /static/scripts {
        alias /home/galaxy/galaxy-dist/static/scripts/packed;
        gzip on;
        gzip_types text/plain text/javascript application/x-javascript;
        expires 24h;
    }
    location ~ ^/plugins/visualizations/(?<vis_name>.+?)/static/(?<static_file>.*?)$ {
        alias /home/galaxy/galaxy-dist/config/plugins/visualizations/$vis_name/static/$static_file;
    }

    # delegated downloads
    location /_x_accel_redirect {
        internal;
        alias /;
    }

    # delegated uploads
    location /_upload {
        upload_store /home/galaxy/uploads;
        upload_store_access user:rw;
        upload_pass_form_field "";
        upload_set_form_field "<u>${upload_field_name}</u>is_composite" "true";
        upload_set_form_field "<u>${upload_field_name}</u>keys" "name path";
        upload_set_form_field "${upload_field_name}_name" "$upload_file_name";
        upload_set_form_field "${upload_field_name}_path" "$upload_tmp_path";
        upload_pass_args on;
        upload_pass /_upload_done;
    }
    location /_upload_done {
        set $dst /api/tools;
        if ($args ~ nginx_redir=([^&]+)) {
            set $dst $1;
        }
        rewrite "" $dst;
    }
}
```


```console
ubuntu@bioit:/etc/nginx/sites-available$ cd ../sites-enabled/
ubuntu@bioit:/etc/nginx/sites-enabled$ sudo rm default
ubuntu@bioit:/etc/nginx/sites-enabled$ sudo ln -s ../sites-available/galaxy
ubuntu@bioit:/etc/nginx/sites-enabled$
```


## Configure supervisord

```console
ubuntu@bioit:~$ cd /etc/supervisor/conf.d
ubuntu@bioit:/etc/supervisor/conf.d$ sudo vi galaxy.conf
```


In the editor, paste:

```ini
[program:nginx]
command		= /usr/sbin/nginx
directory	= /
umask		= 022
autostart	= true
autorestart	= unexpected
startsecs	= 5
exitcodes	= 0
user		= root

[program:galaxy_uwsgi]
command         = /usr/bin/uwsgi --plugin python --ini-paste /home/galaxy/galaxy-dist/universe_wsgi.ini
directory       = /home/galaxy/galaxy-dist
umask           = 022
autostart       = true
autorestart     = true
startsecs       = 10
user            = galaxy
environment     = PATH=/home/galaxy/venv:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin,PYTHON_EGG_CACHE=/home/galaxy/.python-eggs,PYTHONPATH=/home/galaxy/galaxy-dist/eggs/PasteDeploy-1.5.0-py2.7.egg
numprocs        = 1
stopsignal      = INT

[program:handler]
command         = /home/galaxy/venv/bin/python ./scripts/paster.py serve universe_wsgi.ini --server-name=handler%(process_num)s --pid-file=/home/galaxy/handler%(process_num)s.pid --log-file=/home/galaxy/handler%(process_num)s.log
directory       = /home/galaxy/galaxy-dist
process_name    = handler%(process_num)s
numprocs        = 2
umask           = 022
autostart       = true
autorestart     = true
startsecs       = 15
user            = galaxy
environment     = PYTHON_EGG_CACHE=/home/galaxy/.python-eggs,DRMAA_LIBRARY_PATH=/usr/lib/gridengine-drmaa/lib/libdrmaa.so.1.0,SGE_ROOT=/var/lib/gridengine

[group:galaxy]
programs = handler
```


## Start Galaxy and nginx

```console
ubuntu@bioit:~$ sudo supervisorctl update
galaxy: added process group
galaxy_uwsgi: added process group
nginx: added process group
ubuntu@bioit:~$ sudo supervisorctl status
galaxy:handler0                  STARTING
galaxy:handler1                  STARTING
galaxy_uwsgi                     STARTING
nginx                            STARTING

```


You can now visit your Galaxy server at:

<table>
  <tr class="th" >
    <th colspan=10 style=" text-align: center;"> VM Galaxy Instances </th>
  </tr>
  <tr>
    <td> <a href='http://bioit0.galaxyproject.org'>bioit0</a> </td>
    <td> <a href='http://bioit1.galaxyproject.org'>bioit1</a> </td>
    <td> <a href='http://bioit2.galaxyproject.org'>bioit2</a> </td>
    <td> <a href='http://bioit3.galaxyproject.org'>bioit3</a> </td>
    <td> <a href='http://bioit4.galaxyproject.org'>bioit4</a> </td>
    <td> <a href='http://bioit5.galaxyproject.org'>bioit5</a> </td>
    <td> <a href='http://bioit6.galaxyproject.org'>bioit6</a> </td>
    <td> <a href='http://bioit7.galaxyproject.org'>bioit7</a> </td>
    <td> <a href='http://bioit8.galaxyproject.org'>bioit8</a> </td>
    <td> <a href='http://bioit9.galaxyproject.org'>bioit9</a> </td>
  </tr>
  <tr>
    <td> <a href='http://bioit10.galaxyproject.org'>bioit10</a> </td>
    <td> <a href='http://bioit11.galaxyproject.org'>bioit11</a> </td>
    <td> <a href='http://bioit12.galaxyproject.org'>bioit12</a> </td>
    <td> <a href='http://bioit13.galaxyproject.org'>bioit13</a> </td>
    <td> <a href='http://bioit14.galaxyproject.org'>bioit14</a> </td>
    <td> <a href='http://bioit15.galaxyproject.org'>bioit15</a> </td>
    <td> <a href='http://bioit16.galaxyproject.org'>bioit16</a> </td>
    <td> <a href='http://bioit17.galaxyproject.org'>bioit17</a> </td>
    <td> <a href='http://bioit18.galaxyproject.org'>bioit18</a> </td>
    <td> <a href='http://bioit19.galaxyproject.org'>bioit19</a> </td>
  </tr>
  <tr>
    <td> <a href='http://bioit20.galaxyproject.org'>bioit20</a> </td>
    <td> <a href='http://bioit21.galaxyproject.org'>bioit21</a> </td>
    <td> <a href='http://bioit22.galaxyproject.org'>bioit22</a> </td>
    <td> <a href='http://bioit23.galaxyproject.org'>bioit23</a> </td>
    <td> <a href='http://bioit24.galaxyproject.org'>bioit24</a> </td>
    <td> <a href='http://bioit25.galaxyproject.org'>bioit25</a> </td>
    <td> <a href='http://bioit26.galaxyproject.org'>bioit26</a> </td>
    <td> <a href='http://bioit27.galaxyproject.org'>bioit27</a> </td>
    <td> <a href='http://bioit28.galaxyproject.org'>bioit28</a> </td>
    <td> <a href='http://bioit29.galaxyproject.org'>bioit29</a> </td>
  </tr>
  <tr>
    <td> <a href='http://bioit30.galaxyproject.org'>bioit30</a> </td>
    <td> <a href='http://bioit31.galaxyproject.org'>bioit31</a> </td>
    <td> <a href='http://bioit32.galaxyproject.org'>bioit32</a> </td>
    <td> <a href='http://bioit33.galaxyproject.org'>bioit33</a> </td>
    <td> <a href='http://bioit34.galaxyproject.org'>bioit34</a> </td>
    <td> <a href='http://bioit35.galaxyproject.org'>bioit35</a> </td>
    <td> <a href='http://bioit36.galaxyproject.org'>bioit36</a> </td>
    <td> <a href='http://bioit37.galaxyproject.org'>bioit37</a> </td>
    <td> <a href='http://bioit38.galaxyproject.org'>bioit38</a> </td>
    <td> <a href='http://bioit39.galaxyproject.org'>bioit39</a> </td>
  </tr>
</table>


## References

* [uWSGI](http://uwsgi-docs.readthedocs.org/en/latest/)
* [Supervisor](http://supervisord.org/)
* [Ubuntu Packaging Guide](http://packaging.ubuntu.com/html/) - for repackaging `nginx-extras`, particularly, chapters 4-7 in the Knowledge Base section
* [Modifications to the nginx-extras package](https://code.launchpad.net/~natefoo/ubuntu/trusty/nginx/nginx-upload-module) - I added the `nginx-upload` module, which was part of the nginx-extras package in Ubuntu 12.04 LTS ("precise").

# Transcripts

## Adding local data by hand

```console
ubuntu@bioit:~$ mkdir -p ~/local_data/sacCer2/seq/work
ubuntu@bioit:~$ cd ~/local_data/sacCer2/seq/work
ubuntu@bioit:~/local_data/sacCer2/seq/work$ rsync -vz rsync://hgdownload.cse.ucsc.edu/goldenPath/sacCer2/bigZips/chromFa.tar.gz .
chromFa.tar.gz

sent 51 bytes  received 3,824,563 bytes  1,092,746.86 bytes/sec
total size is 3,823,174  speedup is 1.00
ubuntu@bioit:~/local_data/sacCer2/seq/work$ tar zxvf chromFa.tar.gz
2micron.fa
chrI.fa
chrII.fa
chrIII.fa
chrIV.fa
chrIX.fa
chrM.fa
chrV.fa
chrVI.fa
chrVII.fa
chrVIII.fa
chrX.fa
chrXI.fa
chrXII.fa
chrXIII.fa
chrXIV.fa
chrXV.fa
chrXVI.fa
ubuntu@bioit:~/local_data/sacCer2/seq/work$ cat *.fa >../sacCer2.fa
ubuntu@bioit:~/local_data/sacCer2/seq/work$ cd ../..
ubuntu@bioit:~/local_data/sacCer2$ mkdir bwa_index
ubuntu@bioit:~/local_data/sacCer2$ cd bwa_index
ubuntu@bioit:~/local_data/sacCer2/bwa_index$ ~/tool_deps/bwa/0.5.9/devteam/package_bwa_0_5_9/ec2595e4d313/bin/bwa index -a bwtsw sacCer2.fa
[bwa_index] Pack FASTA... 0.18 sec
[bwa_index] Reverse the packed sequence... 0.06 sec
[bwa_index] Construct BWT for the packed sequence...
[BWTIncConstructFromPacked] 10 iterations done. 2968163 characters processed.
[BWTIncConstructFromPacked] 20 iterations done. 5189523 characters processed.
[BWTIncConstructFromPacked] 30 iterations done. 6938035 characters processed.
[BWTIncConstructFromPacked] 40 iterations done. 8313523 characters processed.
[BWTIncConstructFromPacked] 50 iterations done. 9394739 characters processed.
[BWTIncConstructFromPacked] 60 iterations done. 10243827 characters processed.
[BWTIncConstructFromPacked] 70 iterations done. 10909811 characters processed.
[BWTIncConstructFromPacked] 80 iterations done. 11431331 characters processed.
[BWTIncConstructFromPacked] 90 iterations done. 11838867 characters processed.
[BWTIncConstructFromPacked] 100 iterations done. 12156547 characters processed.
[bwt_gen] Finished constructing BWT in 101 iterations.
[bwa_index] 3.30 seconds elapse.
[bwa_index] Construct BWT for the reverse packed sequence...
[BWTIncConstructFromPacked] 10 iterations done. 2968163 characters processed.
[BWTIncConstructFromPacked] 20 iterations done. 5189523 characters processed.
[BWTIncConstructFromPacked] 30 iterations done. 6938035 characters processed.
[BWTIncConstructFromPacked] 40 iterations done. 8313523 characters processed.
[BWTIncConstructFromPacked] 50 iterations done. 9394739 characters processed.
[BWTIncConstructFromPacked] 60 iterations done. 10243827 characters processed.
[BWTIncConstructFromPacked] 70 iterations done. 10909811 characters processed.
[BWTIncConstructFromPacked] 80 iterations done. 11431331 characters processed.
[BWTIncConstructFromPacked] 90 iterations done. 11838867 characters processed.
[BWTIncConstructFromPacked] 100 iterations done. 12156547 characters processed.
[bwt_gen] Finished constructing BWT in 101 iterations.
[bwa_index] 3.41 seconds elapse.
[bwa_index] Update BWT... 0.08 sec
[bwa_index] Update reverse BWT... 0.07 sec
[bwa_index] Construct SA from BWT and Occ... 1.03 sec
[bwa_index] Construct SA from reverse BWT and Occ... 1.02 sec
ubuntu@bioit:~/local_data/sacCer2/bwa_index$ cd ~/galaxy-dist/tool-data
ubuntu@bioit:~/galaxy-dist/tool-data$ vim bwa_index.loc
  ...
  sacCer2byhand   sacCer2 S. cerevisiae June 2008 (index by hand) /home/ubuntu/local_data/sacCer2/bwa_index/sacCer2.fa
  ...
ubuntu@bioit:~/galaxy-dist/tool-data$ cd ..
ubuntu@bioit:~/galaxy-dist$ vim tool_data_table_conf.xml
  ...
  <table name="bwa_indexes" comment_char="#">
      <columns>value, dbkey, name, path</columns>
      <file path="tool-data/bwa_index.loc" />
  </table>
  ...
ubuntu@bioit:~/galaxy-dist$ sh run.sh
  ...
```

