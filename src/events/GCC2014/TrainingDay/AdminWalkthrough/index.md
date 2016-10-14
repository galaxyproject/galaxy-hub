---
autotoc: true
title: Tutorial, :,  Galaxy Installation and Administration
---
PLACEHOLDER_INCLUDE(/Events/GCC2014/Header)
<br /><br />



PLACEHOLDER_INCLUDE(/Events/GCC2014/LinkBox)

<div class='right'> <a href='/Events/GCC2014/TrainingDay'><img src='/Images/Logos/GCC2014TrainingDayLogoSquare.png' alt='GCC2014 Training Day' width="100" /></a></div>

[Nate Coraor](/nate) and [John Chilton](/JohnChilton)

<br />
![](https://dev.twitter.com/sites/default/files/images_documentation/bird_blue_16.png) #usegalaxy

This this follow-along page assumes you have already installed and started a [Training Day VM](https://wiki.galaxyproject.org/Events/GCC2014/TrainingDay/VMs) - please do this before arriving.



**This tool assumes you are using Firefox bundled with the VM.** Galaxy is compatible with all modern versions of Firefox, Chrome, Safari, and Internet Explorer. However, for the purposes of this tutorial it will help us when assisting people encountering problems if they are only using Firefox.

You will most likely want to copy and paste between this wiki page and the VM. To allow this, after launching the VM, click the **Devices** menu, then **Shared Clipboard** &rarr; **Bidirectional**. The key combination **Shift+Ctrl+V** in the VM will paste the contents of the clipboard.

If your host system has enough memory, we suggest increasing the memory allocated to the VM to 2 GB.

# Setting up a Local Galaxy Tutorial (Part I)

## Clone (download) Galaxy

The Galaxy distribution is found at [https://bitbucket.org/galaxy/galaxy-dist/](https://bitbucket.org/galaxy/galaxy-dist/), but for the purposes of this tutorial, we'll use a local copy already on the VM to save time.

```
#!highlight console
galaxy@gcc2014:~$ hg clone /home/galaxy/galaxy-central galaxy-dist
requesting all changes
adding changesets
adding manifests
adding file changes
added 8 changesets with 3443 changes to 3443 files
updating to branch default
3443 files updated, 0 files merged, 0 files removed, 0 files unresolved
galaxy@gcc2014:~$ 
```


(One can launch a terminal in the VM by clicking the little mouse icon in the upper left corner and then clicking the "Terminal Emulator" icon in the pop-up menu.)

### References

* [getgalaxy.org](http://getgalaxy.org)
* [Galaxy Wiki/documentation](https://wiki.galaxyproject.org)

## Update to the stable branch

```
#!highlight console
galaxy@gcc2014:~$ cd galaxy-dist
galaxy@gcc2014:~/galaxy-dist$ hg update stable
264 files updated, 0 files merged, 144 files removed, 0 files unresolved
galaxy@gcc2014:~/galaxy-dist$
```


## Start Galaxy

```
#!highlight console
galaxy@gcc2014:~/galaxy-dist$ cp -r ../galaxy-central/eggs eggs  # cache dependencies to speed up deploy (optional)
galaxy@gcc2014:~/galaxy-dist$ sh run.sh
Initializing datatypes_conf.xml from datatypes_conf.xml.sample
  ...
Some eggs are out of date, attempting to fetch...
Fetched http://eggs.galaxyproject.org/amqp/amqp-1.4.3-py2.7.egg
  ...
Fetch successful.
python path is: /home/ubuntu/galaxy-dist/eggs/mercurial-2...
  ...
Starting server in PID 3091.
serving on http://127.0.0.1:8080
```


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

### Galaxy configuration for Tool Shed installs

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
galaxy@gcc2014:~/galaxy-dist$
```


There may be some additional interruption exceptions reported - these are not important.

Edit the primary Galaxy configuration file, `universe_wsgi.ini`. If you are not familiar with `vi`, consider using `nano` instead.

```
#!highlight console
galaxy@gcc2014:~/galaxy-dist$ vi universe_wsgi.ini
```


We need to set two options. The file is large and it's easiest to search for these (`/<pattern>` in vi, `CTRL-w` `<pattern>` in nano):

```
#!highlight ini
[app:main]
admin_users = nate@bx.psu.edu
tool_dependency_dir = /home/galaxy/tool_deps
```


Then save and quit (`CTRL-x` `y` `ENTER` in nano). Start Galaxy again:

```
#!highlight console
galaxy@gcc2014:~/galaxy-dist$ sh run.sh 
...
Starting server in PID 3298.
serving on 127.0.0.1:8080 view at http://127.0.0.1:8080
```


### Install a tool from the Tool Shed

* Register an account that matches the address you set in `admin_users`
* Follow the [tutorial on installing tools from the Tool Shed](/Admin/Tools/AddToolFromToolShedTutorial). In brief:
  * Click **Admin** from the masthead
  * Click **Search and browse tool sheds** from the left panel
  * Click the popup icon for **Galaxy main tool shed** and select **Search for valid tools**
  * Search for **Tool name**s that contain the name `bwa`
  * Click the popup icon for **bwa_wrappers** owned by **devteam** and select **Install to Galaxy**
  * Select the **NGS: Mapping** section and click **Install to Galaxy**
* Tools (XML, wrapper scripts) are installed in `/home/galaxy/shed_tools`
* Tool dependencies (binaries) are installed in `/home/galaxy/tool_deps`

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
galaxy@gcc2014:~/galaxy-dist$ sudo apt-get install postgresql
[sudo] password for galaxy: 
Reading package lists... Done
Building dependency tree       
Reading state information... Done
postgresql is already the newest version.
...
galaxy@gcc2014:~/galaxy-dist$ sudo -u postgres createuser gxprod
galaxy@gcc2014:~/galaxy-dist$ sudo -u postgres createdb -O gxprod gxprod
```


## Create a new user for Galaxy

```console
galaxy@gcc2014:~/galaxy-dist$ sudo useradd -m -s /bin/bash gxprod
galaxy@gcc2014:~/galaxy-dist$ 
```


## Create a Python virtual environment

```console
galaxy@gcc2014:~/galaxy-dist$ sudo apt-get install python-virtualenv
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
galaxy@gcc2014:~/galaxy-dist$ sudo -iu gxprod
gxprod@gcc2014:~$ virtualenv venv
New python executable in venv/bin/python
Installing setuptools, pip...done.
gxprod@gcc2014:~$ source ./venv/bin/activate
(venv)gxprod@gcc2014:~$ 
```


## Clone (download) Galaxy

```console
gxprod@gcc2014:~$ hg clone ~galaxy/galaxy-central galaxy-dist
not trusting file /home/galaxy/galaxy-central/.hg/hgrc from untrusted user galaxy, group galaxy
requesting all changes
adding changesets
adding manifests
adding file changes
added 13944 changesets with 47333 changes to 8458 files
updating to branch default
3658 files updated, 0 files merged, 0 files removed, 0 files unresolved
gxprod@gcc2014:~$ cd galaxy-dist
gxprod@gcc2014:~/galaxy-dist$ hg update stable
264 files updated, 0 files merged, 144 files removed, 0 files unresolved
gxprod@gcc2014:~/galaxy-dist$ cp -r ~galaxy/galaxy-central/eggs .
0 files updated, 0 files merged, 0 files removed, 0 files unresolved
gxprod@gcc2014:~/galaxy-dist$ 
```


## Configure Galaxy


```console
gxprod@gcc2014:~/galaxy-dist$ cp universe_wsgi.ini.sample universe_wsgi.ini
gxprod@gcc2014:~/galaxy-dist$ vi universe_wsgi.ini
```


Add the following section for uWSGI's configuration and the job handler processes

```ini
[uwsgi]
socket = 127.0.0.1:4001
stats = 127.0.0.1:9191
processes = 2
threads = 4
master = True
logto = /home/gxprod/uwsgi.log
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


Set the following settings in the `[app:main]` section **at the bottom of the file**:

```ini
database_connection = postgresql:///gxprod?host=/var/run/postgresql
database_engine_option_server_side_cursors = True
tool_dependency_dir = /home/gxprod/tool_deps
static_enabled = False
nginx_x_accel_redirect_base = /_x_accel_redirect
nginx_upload_store = /home/gxprod/uploads
nginx_upload_path = /_upload
log_events = False
log_actions = False
debug = False
use_interactive = False
id_secret = <random text>
admin_users = nate@bx.psu.edu
library_import_dir = /home/gxprod/library
allow_library_path_paste = True
```


Explanations of these options:

* `database_connection = postgresql:///gxprod?host=/var/run/postgresql` - Use a PostgreSQL database via a local UNIX domain socket (the socket is in `/var/run/postgresql`). [documentation](/Admin/Config/Performance/ProductionServer#switching_to_a_database_server)
* `database_engine_option_server_side_cursors = True` - Keep large SQL query results on the PostgreSQL server, rather the transferring the entire result set to the Galaxy processes.
* `tool_dependency_dir = /home/gxprod/tool_deps` - The directory that will house tool dependencies
* `static_enabled = False` - Static content will be served by the proxy server
* `nginx_x_accel_redirect_base = /_x_accel_redirect` - Delegate dataset downloads to nginx
* `nginx_upload_store = /home/gxprod/uploads` - Delegate uploads to nginx, set temporary directory
* `nginx_upload_path = /_upload` - Special path configured in nginx where uploads will be POSTed
* `log_events = False` - Don't log events in the database (faster)
* `log_actions = False` - Don't log actions in the database (faster)
* `debug = False` - Disables debugging middleware that loads server responses in to memory (can crash the server when handling large files)
* `use_interactive = False` - Disables live client browser debugging (insecure).
* `id_secret = <random text>` - Ensures that the encoded IDs used by Galaxy (especially session IDs) are unique.  One simple way to generate a value for this is with a shell command like `$ date | md5sum`
* `admin_users = nate@bx.psu.edu` - Make nate@example.org an administrator. Galaxy's Admin UI is only accessible if you define administrators here!
* `library_import_dir = /home/gxprod/library` - Administrators can directly import datasets from this directory on the server to Data Libraries.  This includes an option that allows an effective "symlink" to the data, rather than copying it in to Galaxy's `file_path` directory. [documentation](/Admin/DataLibraries/UploadingLibraryFiles)
* `allow_library_path_paste = True` - Administrators can import datasets from anywhere on the server's filesystem(s) by entering their paths in to a text box

Honorable mentions for features we won't use today but that are common in big setups:

* `ftp_upload_dir` and `ftp_upload_site` - Allow users to upload data to the server using FTP
* `use_remote_user` and `remote_user_maildomain` - Use your institution's existing authentication system to log in to Galaxy. [Apache documentation](/Admin/Config/ExternalUserDatbases) or [nginx documentation](/Admin/Config/nginxProxy#external_user_authentication)
* `allow_user_impersonation` - Users configured as administrators (with `admin_users`) can "become" other users to view Galaxy exactly as the impersonated user does. Useful for providing support.
* `user_library_import_dir` - Non-administrators can directly import datasets from this directory on this server to Data Libraries from which they have been given write permission. [documentation](/Admin/DataLibraries/UploadingLibraryFiles)
* `object_store_config_file` - Configure Galaxy's "object storage" layer to store data in multiple filesystems, Amazon S3, iRODS, etc.
* `error_email_to` (with `smtp_server`) - Allow users to send bug reports directly to you
* `user_activation_on` and related options - Require new users to verify their email address
* `allow_user_dataset_purge = True` - Allow users to forcibly remove their datasets from disk (note that the data is only actually removed if all versions of a shared dataset are purged by all users who are sharing the dataset). By default, Galaxy does not remove data, as this is done at a later time by the dataset cleanup scripts.
* `enable_quotas = True` - Enable Galaxy's quota system. Quotas are configured by administrators in the Galaxy Admin UI

Create a job system configuration:

```console
gxprod@gcc2014:~/galaxy-dist$ vi job_conf.xml
```


In the editor, paste:

```xml
<?xml version="1.0"?>
<job_conf>
    <plugins workers="2">
        <plugin id="gridengine" type="runner" load="galaxy.jobs.runners.drmaa:DRMAAJobRunner">
            <param id="drmaa_library_path">/usr/lib/gridengine-drmaa/lib/libdrmaa.so</param>
        </plugin>
        <!--
        <plugin id="torque" type="runner" load="galaxy.jobs.runners.drmaa:DRMAAJobRunner">
            <param id="drmaa_library_path">/usr/lib/pbs-drmaa/lib/libdrmaa.so</param>
        </plugin>
        <plugin id="slurm" type="runner" load="galaxy.jobs.runners.slurm:SlurmJobRunner">
            <param id="drmaa_library_path">/usr/lib/slurm-drmaa/lib/libdrmaa.so</param>
        </plugin>
        -->
    </plugins>
    <handlers default="handlers">
        <handler id="handler0" tags="handlers"/>
        <handler id="handler1" tags="handlers"/>
    </handlers>
    <destinations default="cluster">
        <destination id="cluster" runner="gridengine"/>
        <!--
        <destination id="cluster" runner="torque"/>
        <destination id="cluster" runner="slurm"/>
        -->
    </destinations>
    <limits>
        <limit type="registered_user_concurrent_jobs">2</limit>
        <limit type="unregistered_user_concurrent_jobs">1</limit>
        <limit type="job_walltime">24:00:00</limit>
    </limits>
</job_conf>
```


This VM comes preconfigured with Torque, Grid Engine, and SLURM - Galaxy can submit jobs to any of these as well as LSF, Condor, etc... but the above configuration will just target the VM's default - Grid Engine.

## Start a Galaxy server to complete first run setup

```console
gxprod@gcc2014:~/galaxy-dist$ sh run.sh
Initializing datatypes_conf.xml from datatypes_conf.xml.sample
  ...
serving on http://127.0.0.1:8080
^C
  ...
gxprod@gcc2014:~/galaxy-dist$ logout
galaxy@gcc2014:~$ 
```


## Install Ansible and nginx

We would like to add a 3rd party module not available in Ubuntu's nginx packages (`nginx_upload_module`), which means recompiling nginx. However, we have already created an Ansible Play for compiling and packaging nginx. Ansible is an automation, configuration management and application deployment tool rapidly growing in popularity (it is similar to older projects such as Puppet and Chef).

### Ansible

Create a new virtualenv and install Ansible:

```console
galaxy@gcc2014:~$ virtualenv ansible
New python executable in ansible/bin/python
Installing setuptools, pip...done.
galaxy@gcc2014:~$ . ansible/bin/activate
(ansible)galaxy@gcc2014:~$ pip install ansible
Downloading/unpacking ansible
  Downloading ansible-1.6.5.tar.gz (651kB): 651kB downloaded
  Running setup.py (path:/home/galaxy/ansible/build/ansible/setup.py) egg_info for package ansible
  ...
Successfully installed ansible paramiko jinja2 PyYAML pycrypto ecdsa markupsafe
Cleaning up...
(ansible)galaxy@gcc2014:~$ 
```


Fetch the [nginx build playbook](https://bitbucket.org/natefoo/galaxy-ansible/src/e21adb25a3d585ab476e83f599028d73bf8d408c/build/nginx.yml):

```console
(ansible)galaxy@gcc2014:~$ wget https://bitbucket.org/natefoo/galaxy-ansible/raw/e21adb25a3d585ab476e83f599028d73bf8d408c/build/nginx.yml
--2014-06-28 12:07:26--  https://bitbucket.org/natefoo/galaxy-ansible/raw/e21adb25a3d585ab476e83f599028d73bf8d408c/build/nginx.yml
Resolving bitbucket.org (bitbucket.org)... 131.103.20.168, 131.103.20.167
Connecting to bitbucket.org (bitbucket.org)|131.103.20.168|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 6521 (6.4K) [text/plain]
Saving to: ‘nginx.yml’

100%[=========================================>] 6,521       --.-K/s   in 0s      

2014-06-28 12:07:26 (974 MB/s) - ‘nginx.yml’ saved [6521/6521]

(ansible)galaxy@gcc2014:~$ 
```


### Build nginx

Run the playbook to generate an nginx package:

```console
(ansible)galaxy@gcc2014:~$ ansible-playbook -i localhost, nginx.yml --ask-sudo-pass --extra-vars work_dir=/home/galaxy/nginx-build
sudo password: 

PLAY [localhost] ************************************************************** 

GATHERING FACTS *************************************************************** 
ok: [localhost]

  ...

TASK: [Create deb] ************************************************************ 
changed: [localhost]

PLAY RECAP ******************************************************************** 
localhost                  : ok=12   changed=3    unreachable=0    failed=0   

(ansible)galaxy@gcc2014:~$ deactivate
galaxy@gcc2014:~$ 
```


### Install nginx

Uninstall conflicting nginx packages:

```console
galaxy@gcc2014:~$ sudo apt-get remove nginx nginx-core nginx-common
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages were automatically installed and are no longer required:
  libcurses-perl libslurmdb-perl libslurmdb26
Use 'apt-get autoremove' to remove them.
The following packages will be REMOVED:
  nginx nginx-common nginx-core
0 upgraded, 0 newly installed, 3 to remove and 12 not upgraded.
After this operation, 1,295 kB disk space will be freed.
Do you want to continue? [Y/n] 
(Reading database ... 244985 files and directories currently installed.)
Removing nginx (1.4.6-1ubuntu3) ...
Removing nginx-core (1.4.6-1ubuntu3) ...
Removing nginx-common (1.4.6-1ubuntu3) ...
Processing triggers for man-db (2.6.7.1-1) ...
galaxy@gcc2014:~$ 
```


Install the new nginx package:

```console
galaxy@gcc2014:~$ sudo dpkg -i /home/galaxy/nginx-build/nginx-galaxy_1.4.7-gxydev+trusty_amd64.deb 
Selecting previously unselected package nginx-galaxy.
(Reading database ... 244964 files and directories currently installed.)
Preparing to unpack .../nginx-galaxy_1.4.7-gxydev+trusty_amd64.deb ...
Unpacking nginx-galaxy (1.4.7-gxydev+trusty) ...
Setting up nginx-galaxy (1.4.7-gxydev+trusty) ...
galaxy@gcc2014:~$ sudo mkdir /var/opt/nginx
galaxy@gcc2014:~$ 
```


## Install uWSGI and supervisord

```console
galaxy@gcc2014:~/galaxy-dist$ sudo apt-get install uwsgi uwsgi-plugin-python supervisor
  ...
After this operation, 4,497 kB of additional disk space will be used.
Do you want to continue? [Y/n]
  ...
galaxy@gcc2014:~/galaxy-dist$ sudo update-rc.d -f uwsgi remove
 Removing any system startup links for /etc/init.d/uwsgi ...
   /etc/rc0.d/K20uwsgi
   /etc/rc1.d/K20uwsgi
   /etc/rc2.d/S20uwsgi
   /etc/rc3.d/S20uwsgi
   /etc/rc4.d/S20uwsgi
   /etc/rc5.d/S20uwsgi
   /etc/rc6.d/K20uwsgi
galaxy@gcc2014:~/galaxy-dist$ 
```


## Configure nginx

```console
galaxy@gcc2014:/opt/nginx/conf$ sudo vi /opt/nginx/conf/nginx.conf 
```


Replace the entire contents of the file with:

```nginx
user  gxprod;
worker_processes  1;
daemon off;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;

    gzip  on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

    client_max_body_size 50g;
    uwsgi_read_timeout 300;

    server {
        listen 80 default_server;
        server_name  localhost;

        # pass to uWSGI by default
        location / {
            uwsgi_pass 127.0.0.1:4001;
            include uwsgi_params;
        }

        # serve static content
        location /static {
            alias /home/gxprod/galaxy-dist/static;
            gzip on;
            gzip_types text/plain text/xml text/javascript text/css application/x-javascript;
            expires 24h;
        }
        location /static/style {
            alias /home/gxprod/galaxy-dist/static/style/blue;
            gzip on;
            gzip_types text/plain text/xml text/javascript text/css application/x-javascript;
            expires 24h;
        }
        location /static/scripts {
            alias /home/gxprod/galaxy-dist/static/scripts/packed;
            gzip on;
            gzip_types text/plain text/javascript application/x-javascript;
            expires 24h;
        }
        location ~ ^/plugins/visualizations/(?<vis_name>.+?)/static/(?<static_file>.*?)$ {
            alias /home/gxprod/galaxy-dist/config/plugins/visualizations/$vis_name/static/$static_file;
        }

        # delegated downloads
        location /_x_accel_redirect {
            internal;
            alias /;
        }

        # delegated uploads
        location /_upload {
            upload_store /home/gxprod/uploads;
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
}
```


## Configure supervisord

```console
galaxy@gcc2014:/opt/nginx/conf$ cd /etc/supervisor/conf.d
galaxy@gcc2014:/etc/supervisor/conf.d$ sudo vi galaxy.conf
```


In the editor, paste:

```ini
[program:nginx]
command		= /opt/nginx/sbin/nginx
directory	= /
umask		= 022
autostart	= true
autorestart	= unexpected
startsecs	= 5
exitcodes	= 0
user		= root

[program:galaxy_uwsgi]
command         = /usr/bin/uwsgi --plugin python --ini-paste /home/gxprod/galaxy-dist/universe_wsgi.ini
directory       = /home/gxprod/galaxy-dist
umask           = 022
autostart       = true
autorestart     = true
startsecs       = 10
user            = gxprod
environment     = PATH=/home/gxprod/venv:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin,PYTHON_EGG_CACHE=/home/gxprod/.python-eggs,PYTHONPATH=/home/gxprod/galaxy-dist/eggs/PasteDeploy-1.5.0-py2.7.egg
numprocs        = 1
stopsignal      = INT

[program:handler]
command         = /home/gxprod/venv/bin/python ./scripts/paster.py serve universe_wsgi.ini --server-name=handler%(process_num)s --pid-file=/home/gxprod/handler%(process_num)s.pid --log-file=/home/gxprod/handler%(process_num)s.log
directory       = /home/gxprod/galaxy-dist
process_name    = handler%(process_num)s
numprocs        = 2
umask           = 022
autostart       = true
autorestart     = true
startsecs       = 15
user            = gxprod
environment     = PYTHON_EGG_CACHE=/home/gxprod/.python-eggs,SGE_ROOT=/var/lib/gridengine

[group:galaxy]
programs = handler
```


## Start Galaxy and nginx

```console
galaxy@gcc2014:/etc/supervisor/conf.d$ sudo supervisorctl update
galaxy_uwsgi: added process group
handler: added process group
nginx: added process group
galaxy@gcc2014:/etc/supervisor/conf.d$ sudo supervisorctl status
galaxy:handler0                  STARTING
galaxy:handler1                  STARTING
galaxy_uwsgi                     STARTING
nginx                            STARTING

```


You can now visit your Galaxy server at - http://localhost/.

## References

* [uWSGI](http://uwsgi-docs.readthedocs.org/en/latest/)
* [Supervisor](http://supervisord.org/)

## Load external data in a data library

First, place some data in the import directory:

```console
galaxy@gcc2014:~$ sudo -iu gxprod
gxprod@gcc2014:~$ mkdir library/run1
gxprod@gcc2014:~/library/run1$ cp galaxy-dist/test-data
```


Next, import the data in the Galaxy UI:

* Register an account that matches the address you set in `admin_users`
* Click **Admin** from the masthead
* Click **Manage data libraries** from the left panel
* Click **Create new data library**
* Enter a Name and Description (and optionally a Synopsis) and click **Create**
* Click **Add datasets**:
* On the upload form:
  * From the **Upload option:** menu, select **Upload directory of files**
  * In the **File Format:** field, enter **fastqsanger**
  * From **Server Directory**, select **run1**
  * From the **Copy data into Galaxy?** menu, select **Link to files without copying into Galaxy**
  * Click **Upload to library**
* Click the **Shared Data** menu in the masthead and select **Data Libraries**
* Click on the library you created
* Select some datasets, then click **Go** to import them to your history

Galaxy will use the data in its original location, and does not make additional copies for each user who imports the data. Access controls can be set on libraries and their contacts to limit them to certain users or groups.

# Extra Activities (Time and Interest Permitting)

## Using Slurm or Torque/PBS

The job configuration in `job_conf.xml` we used above included commented-out configurations for using Torque and Slurm. To use one of these other resource managers:

```console
galaxy@gcc2014:~$ sudo -u gxprod vi ~gxprod/galaxy-dist/job_conf.xml
  ... modify XML comments ...
galaxy@gcc2014:~$ sudo supervisorctl restart galaxy:*
```


## Shipping Jobs to Remote Resources with Pulsar

Pulsar (formerly called the LWR) allows Galaxy jobs to be staged to remote clusters without shared disk. 

We only have one VM for this workshop - so we are going to simulate this by shipping ``gxprod`` jobs in the Galaxy instance we just configured back to a Pulsar server running as the ``galaxy`` user.

### Installing Pulsar with Ansible

```console
galaxy@gcc2014:~$ . ansible/bin/activate
(ansible)galaxy@gcc2014:~$ hg clone https://bitbucket.org/natefoo/galaxy-ansible
(ansible)galaxy@gcc2014:~$ cd galaxy-ansible
(ansible)galaxy@gcc2014:~/galaxy-ansible$ ansible-playbook -i localhost, local.yml -e "pulsar_server_dir=/home/galaxy/pulsar pulsar_configure_galaxy=False galaxy_server_dir=/home/galaxy/galaxy-dist pulsar_private_token=puls0rt0ken" --tags pulsar
(ansible)galaxy@gcc2014:~/galaxy-ansible$ deactivate
galaxy@gcc2014:~/galaxy-ansible$ cd ~/pulsar
galaxy@gcc2014:~/pulsar$ ./run.sh -m paster --daemon
Entering daemon mode
galaxy@gcc2014:~/pulsar$ 
```


Next up we will configure Galaxy to submit some jobs to this Pulsar server. Pulsar isn't available in Galaxy's ``stable`` branch yet however so we are going to checkout the ``default`` branch. (Older versions of Galaxy can target an LWR server for similar functionality - but we would encourage everyone to use Pulsar going forward.)

```console
galaxy@gcc2014:~$ sudo -iu gxprod
gxprod@gcc2014:~$ cd galaxy-dist/
gxprod@gcc2014:~/galaxy-dist$ hg checkout default
350 files updated, 0 files merged, 58 files removed, 0 files unresolved
gxprod@gcc2014:~/galaxy-dist$ vi job_conf.xml
```


Copy the following contents - it routes one tool's jobs to the Pulsar server setup above.

```xml
<?xml version="1.0"?>
<job_conf>
    <plugins workers="2">
        <plugin id="gridengine" type="runner" load="galaxy.jobs.runners.drmaa:DRMAAJobRunner"/>
	<plugin id="pulsar_rest" type="runner" load="galaxy.jobs.runners.pulsar:PulsarRESTJobRunner" />
    </plugins>
    <handlers default="handlers">
        <handler id="handler0" tags="handlers"/>
        <handler id="handler1" tags="handlers"/>
    </handlers>
    <destinations default="gridengine">
        <destination id="gridengine" runner="gridengine"/>
	<destination id="local_pulsar" runner="pulsar_rest">
	  <param id="url">http://localhost:8913/</param>
	  <param id="private_token">puls0rt0ken</param>
	</destination>
    </destinations>
    <limits>
        <limit type="registered_user_concurrent_jobs">2</limit>
        <limit type="unregistered_user_concurrent_jobs">1</limit>
        <limit type="job_walltime">24:00:00</limit>
    </limits>
    <tools>
      <tool id="cat1" destination="local_pulsar" />
    </tools>
</job_conf>
```


Now as the ``galaxy`` user restart the job handlers

```console
gxprod@gcc2014:~/galaxy-dist$ exit
galaxy@gcc2014:~$ sudo supervisorctl restart galaxy:*
[sudo] password for galaxy: 
handler0: stopped
handler1: stopped
handler0: started
handler1: started
```


Open Galaxy, upload a file, and use the "Concatenate Datasets" tool on it to test Pulsar.

## Additional topic candidates

* Dynamic job resource assignment

# Transcripts

## Adding local data by hand

```console
galaxy@gcc2014:~$ mkdir -p local_data/sacCer2/seq/work
galaxy@gcc2014:~$ cd local_data/sacCer2/seq/work
galaxy@gcc2014:~/local_data/sacCer2/seq/work$ wget http://hgdownload.cse.ucsc.edu/goldenPath/sacCer2/bigZips/chromFa.tar.gz
--2014-06-29 14:09:25--  http://hgdownload.cse.ucsc.edu/goldenPath/sacCer2/bigZips/chromFa.tar.gz
Resolving hgdownload.cse.ucsc.edu (hgdownload.cse.ucsc.edu)... 128.114.119.163
Connecting to hgdownload.cse.ucsc.edu (hgdownload.cse.ucsc.edu)|128.114.119.163|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 3823174 (3.6M) [application/x-gzip]
Saving to: ‘chromFa.tar.gz’

100%[==================================================>] 3,823,174   1.01MB/s   in 4.3s   

2014-06-29 14:09:29 (859 KB/s) - ‘chromFa.tar.gz’ saved [3823174/3823174]

galaxy@gcc2014:~/local_data/sacCer2/seq/work$ tar zxvf chromFa.tar.gz
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
galaxy@gcc2014:~/local_data/sacCer2/seq/work$ cat *.fa >../sacCer2.fa
galaxy@gcc2014:~/local_data/sacCer2/seq/work$ cd ../..
galaxy@gcc2014:~/local_data/sacCer2$ mkdir bwa_index
galaxy@gcc2014:~/local_data/sacCer2$ cd bwa_index
galaxy@gcc2014:~/local_data/sacCer2/bwa_index$ ln -s ../seq/sacCer2.fa 
galaxy@gcc2014:~/local_data/sacCer2/bwa_index$ ~/tool_deps/bwa/0.5.9/devteam/package_bwa_0_5_9/ec2595e4d313/bin/bwa index -a bwtsw sacCer2.fa
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
galaxy@gcc2014:~/local_data/sacCer2/bwa_index$ cd ~/galaxy-dist/tool-data
galaxy@gcc2014:~/galaxy-dist/tool-data$ vi bwa_index.loc
  ...
  sacCer2byhand   sacCer2 S. cerevisiae June 2008 (index by hand) /home/galaxy/local_data/sacCer2/bwa_index/sacCer2.fa
  ...
galaxy@gcc2014:~/galaxy-dist/tool-data$ cd ..
galaxy@gcc2014:~/galaxy-dist$ vi tool_data_table_conf.xml
  ...
  <table name="bwa_indexes" comment_char="#">
      <columns>value, dbkey, name, path</columns>
      <file path="tool-data/bwa_index.loc" />
  </table>
  ...
galaxy@gcc2014:~/galaxy-dist$ sh run.sh
  ...
```

