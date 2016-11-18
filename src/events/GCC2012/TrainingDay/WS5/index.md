# Workshop 5: Installing Your Own Galaxy

* [universe_wsgi.ini modified with all of the changes below](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2012/WS5/universe_wsgi.ini)
* [Slides](PLACEHOLDER_ATTACHMENT_URL/src/Documents/Presentations/GCC2012/WS5_InstallingYourOwn.pdf)

Documentation for all of these features is at [Admin/Config/Performance/ProductionServer](/src/Admin/Config/Performance/ProductionServer/index.md).

## Create a new user for Galaxy

```console
trainingday@trainingday:~$ sudo -i
[sudo] password for trainingday: 12345
root@trainingday:~# useradd -m -s /bin/bash galaxy
root@trainingday:~# 
```


## Install Mercurial

```console
root@trainingday:~# apt-get install mercurial
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following extra packages will be installed:
  mercurial-common
Suggested packages:
  qct wish kdiff3 tkdiff meld xxdiff python-mysqldb python-pygments
The following NEW packages will be installed:
  mercurial mercurial-common
0 upgraded, 2 newly installed, 0 to remove and 24 not upgraded.
Need to get 0 B/1,982 kB of archives.
After this operation, 6,691 kB of additional disk space will be used.
Do you want to continue [Y/n]? 
Selecting previously unselected package mercurial-common.
(Reading database ... 60146 files and directories currently installed.)
Unpacking mercurial-common (from .../mercurial-common_2.0.2-1ubuntu1_all.deb) ...
Selecting previously unselected package mercurial.
Unpacking mercurial (from .../mercurial_2.0.2-1ubuntu1_i386.deb) ...
Processing triggers for man-db ...
Setting up mercurial-common (2.0.2-1ubuntu1) ...
Setting up mercurial (2.0.2-1ubuntu1) ...

Creating config file /etc/mercurial/hgrc.d/hgext.rc with new version
root@trainingday:~# 
```


## Clone the Galaxy Distribution

```console
root@trainingday:~# su - galaxy
galaxy@trainingday:~$ hg clone https://bitbucket.org/galaxy/galaxy-dist/
destination directory: galaxy-dist
requesting all changes
adding changesets
adding manifests
adding file changes
added 7405 changesets with 28970 changes to 5975 files
updating to branch default
3922 files updated, 0 files merged, 0 files removed, 0 files unresolved
galaxy@trainingday:~$ cd galaxy-dist
galaxy@trainingday:~/galaxy-dist$ 
```


If you were following along in the workshop, we cloned from `~trainingday/galaxy-dist` instead of `https://bitbucket.org/galaxy/galaxy-dist/` for performance reasons.  You can change the default location that will be used for pulling updates by changing the default URL in `~galaxy/galaxy-dist/.hg/hgrc`

## Configure Galaxy

```console
galaxy@trainingday:~/galaxy-dist$ cp universe_wsgi.ini.sample universe_wsgi.ini
galaxy@trainingday:~/galaxy-dist$ vim universe_wsgi.ini
```


I changed the following settings:

* `database_connection = postgres:///galaxy?host=/var/run/postgresql` - Use a PostgreSQL database via a local UNIX domain socket (the socket is in /var/run/postgresql).  Details on this URL syntax are at [Admin/Config/Performance/ProductionServer](/src/Admin/Config/Performance/ProductionServer/index.md) under the "Switching to a database server" section.
* `database_engine_option_server_side_cursors = True` - Keep large SQL query results on the PostgreSQL server, rather the transferring the entire result set to the Galaxy process.
* `database_engine_option_strategy = threadlocal` - Only use one database connection per thread.
* `tool_dependency_dir = /home/galaxy/tool-deps` - The directory that will house tool dependencies.  [Admin/Config/Tool Dependencies](/src/Admin/Config/Tool Dependencies/index.md) explains how these dependencies can be configured.  Tools installed from the tool shed that manage their own dependencies (e.g. freebayes) will also use this directory.
* `debug = False` - Disables debugging middleware that loads server responses in to memory (can crash the server when handling large files).
* `use_interactive = False` - Disables live client browser debugging (insecure).
* `library_import_dir = /home/galaxy/import` - Administrators can directly import datasets from this directory on the server to Data Libraries.  This includes an option that allows an effective "symlink" to the data, rather than copying it in to Galaxy's `file_path` directory.  Documented at [Admin/DataLibraries/UploadingLibraryFiles](/src/Admin/DataLibraries/UploadingLibraryFiles/index.md).
* `user_library_import_dir = /home/galaxy/user-import` - Non-administrators can directly import datasets from this directory on this server to Data Libraries from which they have been given write permission.  Documented at the same link as above.
* `allow_library_path_paste = True` - Administrators can import datasets from anywhere on the server's filesystem(s) by entering their paths in to a textarea.
* `id_secret = <random text>` - Ensures that the encoded IDs used by Galaxy (especially session IDs) are unique.  One simple way to generate a value for this is with a shell command like `% date | md5sum`
* `use_remote_user` and `remote_user_maildomain` - I did not enable these, but this is how users can use your institution's existing authentication system to log in to Galaxy.  Documentation is specific to [Admin/Config/Apache Proxy](/src/Admin/Config/Apache Proxy/index.md) or [Admin/Config/Performance/nginx Proxy](/src/Admin/Config/Performance/nginx Proxy/index.md).
* `admin_users = nate@example.org` - Make nate@example.org an administrator.  Galaxy's Admin UI is only accessible if you define administrators here!
* `allow_user_impersonation = True` - Users configured as administrators (with `admin_users`) can "become" other users to view Galaxy exactly as the impersonated user does.  Useful for providing support.
* `allow_user_dataset_purge = True` - Allow users to forcibly remove their datasets from disk (note that the data is only actually removed if all versions of a shared dataset are purged by all users who are sharing the dataset).  By default, Galaxy does not remove data, as this is done at a later time by the dataset cleanup scripts (discussed below).
* `enable_quotas = True` - Enable Galaxy's quota system.  Quotas are configured by administrators in the Galaxy Admin UI.
* `set_metadata_externally = True` - Galaxy must detect certain attributes about the outputs of a tool after the tool has finished running, and store these attributes as metadata.  These include things like the number of reads (for fasta/fastq), column types (for tabular data) and so forth.  This process can be very CPU intensive for large files and will lock up the Galaxy server process.  set_metadata_externally causes this step to happen in a separate process (and if the tool ran on a cluster, it happens on the cluster).

## Install PostgreSQL

```console
galaxy@trainingday:~/galaxy-dist$ exit
logout
root@trainingday:~# apt-get install postgresql
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following extra packages will be installed:
  libpq5 postgresql-9.1 postgresql-client-9.1 postgresql-client-common
  postgresql-common
Suggested packages:
  oidentd ident-server locales-all postgresql-doc-9.1
The following NEW packages will be installed:
  libpq5 postgresql postgresql-9.1 postgresql-client-9.1
  postgresql-client-common postgresql-common
0 upgraded, 6 newly installed, 0 to remove and 24 not upgraded.
Need to get 0 B/5,487 kB of archives.
After this operation, 15.5 MB of additional disk space will be used.
Do you want to continue [Y/n]? 
Preconfiguring packages ...
Selecting previously unselected package libpq5.
(Reading database ... 60757 files and directories currently installed.)
Unpacking libpq5 (from .../libpq5_9.1.4-0ubuntu12.04_i386.deb) ...
Selecting previously unselected package postgresql-client-common.
Unpacking postgresql-client-common (from .../postgresql-client-common_129_all.deb) ...
Selecting previously unselected package postgresql-client-9.1.
Unpacking postgresql-client-9.1 (from .../postgresql-client-9.1_9.1.4-0ubuntu12.04_i386.deb) ...
Selecting previously unselected package postgresql-common.
Unpacking postgresql-common (from .../postgresql-common_129_all.deb) ...
Adding 'diversion of /usr/bin/pg_config to /usr/bin/pg_config.libpq-dev by postgresql-common'
Selecting previously unselected package postgresql-9.1.
Unpacking postgresql-9.1 (from .../postgresql-9.1_9.1.4-0ubuntu12.04_i386.deb) ...
Selecting previously unselected package postgresql.
Unpacking postgresql (from .../postgresql_9.1+129_all.deb) ...
Processing triggers for man-db ...
Processing triggers for ureadahead ...
ureadahead will be reprofiled on next reboot
Setting up libpq5 (9.1.4-0ubuntu12.04) ...
Setting up postgresql-client-common (129) ...
Setting up postgresql-client-9.1 (9.1.4-0ubuntu12.04) ...
update-alternatives: using /usr/share/postgresql/9.1/man/man1/psql.1.gz to provide /usr/share/man/man1/psql.1.gz (psql.1.gz) in auto mode.
Setting up postgresql-common (129) ...
Adding user postgres to group ssl-cert
Building PostgreSQL dictionaries from installed myspell/hunspell packages...
  en_us
Setting up postgresql-9.1 (9.1.4-0ubuntu12.04) ...
Creating new cluster (configuration: /etc/postgresql/9.1/main, data: /var/lib/postgresql/9.1/main)...
Moving configuration file /var/lib/postgresql/9.1/main/postgresql.conf to /etc/postgresql/9.1/main...
Moving configuration file /var/lib/postgresql/9.1/main/pg_hba.conf to /etc/postgresql/9.1/main...
Moving configuration file /var/lib/postgresql/9.1/main/pg_ident.conf to /etc/postgresql/9.1/main...
Configuring postgresql.conf to use port 5432...
update-alternatives: using /usr/share/postgresql/9.1/man/man1/postmaster.1.gz to provide /usr/share/man/man1/postmaster.1.gz (postmaster.1.gz) in auto mode.
* Starting PostgreSQL 9.1 database server                               [ OK ] 

Setting up postgresql (9.1+129) ...
Processing triggers for libc-bin ...
ldconfig deferred processing now taking place
root@trainingday:~# 
```


## Create PostgreSQL user and database

```console
root@trainingday:~# su - postgres
postgres@trainingday:~$ createuser galaxy
Shall the new role be a superuser? (y/n) n
Shall the new role be allowed to create databases? (y/n) n
Shall the new role be allowed to create more new roles? (y/n) n
postgres@trainingday:~$ createdb -O galaxy galaxy
postgres@trainingday:~$ 
```


## Start Galaxy for the first time

This is necessary because `run.sh` contains a number of setup steps that need to happen before Galaxy starts the first time.

```console
postgres@trainingday:~$ exit
logout
root@trainingday:~# su - galaxy
galaxy@trainingday:~$ cd galaxy-dist
galaxy@trainingday:~/galaxy-dist$ sh run.sh --reload
  ... a lot of output ...
serving on http://127.0.0.1:8080
<sup>C</sup>C caught in monitor process

galaxy@trainingday:~/galaxy-dist$ 
```


## Install an init script to start Galaxy automatically

```console
galaxy@trainingday:~/galaxy-dist$ exit
logout
root@trainingday:~# cd /etc/init.d
root@trainingday:/etc/init.d# vim galaxy
```


In `/etc/init.d/galaxy`, paste the following:

```bash
#!/bin/bash

# Author: James Casbon, 2009

# Provides:             galaxy
# Required-Start:       $network $local_fs $mysql
# Required-Stop:
# Default-Start:        2 3 4 5
# Default-Stop:         0 1 6
# Short-Description:    Galaxy

. /lib/lsb/init-functions

USER="galaxy"
GROUP="galaxy"
DIR="/home/galaxy/galaxy-dist/"
PYTHON="/usr/bin/python"
OPTS="./scripts/paster.py serve universe_wsgi.ini"
LOGDIR="/home/galaxy/galaxy-dist/log"
RUNDIR="/var/run"

case "${1:-*}" in
  'start')
           [ ! -d "$LOGDIR" ] && (mkdir -p $LOGDIR; chown $USER:$GROUP $LOGDIR)
           servers=`sed -n 's/^\[server:\(.*\)\]/\1/  p' $DIR/universe_wsgi.ini | xargs echo`
           for server in $servers; do
               PIDFILE="$RUNDIR/galaxy_$server.pid"
               SERVER_NAME="--server-name=$server"
               LOG_FILE="--log-file=$LOGDIR/$server.log"
               log_daemon_msg "Starting Galaxy $server"
               if start-stop-daemon --chuid $USER --group $GROUP --start --make-pidfile \
	                 --pidfile $PIDFILE --background --chdir $DIR --exec $PYTHON -- $OPTS $SERVER_NAME $LOG_FILE; then
                 log_end_msg 0
               else
                 log_end_msg 1
	       fi
           done
        ;;
  'stop')
           servers=`sed -n 's/^\[server:\(.*\)\]/\1/  p' $DIR/universe_wsgi.ini | xargs echo`
           for server in $servers; do
               PIDFILE="$RUNDIR/galaxy_$server.pid"
               log_daemon_msg "Stopping Galaxy $server" 
	       if start-stop-daemon --stop --pidfile $PIDFILE; then
                 log_end_msg 0
               else
	         log_end_msg 1
	       fi
	   done
        ;;
  'restart')
           # restart commands here
	   $0 stop
	   $0 start
			   
        ;;
* )      # no parameter specified
    echo "Usage: $SELF start|stop|restart|reload|force-reload|status"
      exit 1
      ;;

esac
```


Once saved, continue with:

```console
root@trainingday:/etc/init.d# chmod +x galaxy
root@trainingday:/etc/init.d# update-rc.d galaxy defaults
 Adding system startup for /etc/init.d/galaxy ...
   /etc/rc0.d/K20galaxy -> ../init.d/galaxy
   /etc/rc1.d/K20galaxy -> ../init.d/galaxy
   /etc/rc6.d/K20galaxy -> ../init.d/galaxy
   /etc/rc2.d/S20galaxy -> ../init.d/galaxy
   /etc/rc3.d/S20galaxy -> ../init.d/galaxy
   /etc/rc4.d/S20galaxy -> ../init.d/galaxy
   /etc/rc5.d/S20galaxy -> ../init.d/galaxy
root@trainingday:/etc/init.d# 
```


## Start Galaxy from the init script

```console
root@trainingday:/etc/init.d# /etc/init.d/galaxy start
  * Starting Galaxy main                                                  [ OK ] 

root@trainingday:/etc/init.d# 
```


Galaxy can now be accessed at http://localhost:8080/

## Install nginx

Note that under Debian/Ubuntu, `nginx-extras` contains 3rd party modules, including the nginx_upload_module, which we need for the advanced nginx config.  This module may also be available in nginx packages for Fedora-based distributions, but if not, you may have to compile nginx by hand to get the upload module.

```console
root@trainingday:/etc/init.d# apt-get install nginx-extras
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following extra packages will be installed:
  liblua5.1-0 libperl5.14 nginx-common
The following NEW packages will be installed:
  liblua5.1-0 libperl5.14 nginx-common nginx-extras
0 upgraded, 4 newly installed, 0 to remove and 24 not upgraded.
Need to get 0 B/1,448 kB of archives.
After this operation, 3,481 kB of additional disk space will be used.
Do you want to continue [Y/n]? 
Selecting previously unselected package liblua5.1-0.
(Reading database ... 61153 files and directories currently installed.)
Unpacking liblua5.1-0 (from .../liblua5.1-0_5.1.4-12ubuntu1_i386.deb) ...
Selecting previously unselected package libperl5.14.
Unpacking libperl5.14 (from .../libperl5.14_5.14.2-6ubuntu2_i386.deb) ...
Selecting previously unselected package nginx-common.
Unpacking nginx-common (from .../nginx-common_1.1.19-1_all.deb) ...
Selecting previously unselected package nginx-extras.
Unpacking nginx-extras (from .../nginx-extras_1.1.19-1_i386.deb) ...
Processing triggers for ufw ...
Processing triggers for ureadahead ...
Processing triggers for man-db ...
Setting up liblua5.1-0 (5.1.4-12ubuntu1) ...
Setting up libperl5.14 (5.14.2-6ubuntu2) ...
Setting up nginx-common (1.1.19-1) ...
Setting up nginx-extras (1.1.19-1) ...
Processing triggers for libc-bin ...
ldconfig deferred processing now taking place
root@trainingday:/etc/init.d# 
```


## Configure and start nginx

The configuration of proxy servers is explained in the wiki at [Admin/Config/Performance/nginx Proxy](/src/Admin/Config/Performance/nginx Proxy/index.md) and [Admin/Config/Apache Proxy](/src/Admin/Config/Apache Proxy/index.md).

```console
root@trainingday:/etc/init.d# cd /etc/nginx/sites-available/
root@trainingday:/etc/nginx/sites-available# vim galaxy
```


In `/etc/nginx/sites-available/galaxy`, paste the following:

```nginx
# this file is included inside http {}

# gzip is enabled in nginx.conf, but these override some of the other gzip defaults
gzip_vary on;
gzip_comp_level 4;
gzip_proxied any;
gzip_types text/plain text/css application/x-javascript text/xml application/xml text/javascript application/json;
gzip_buffers 16 8k;

# define the proxied application
upstream galaxy_app {
	server localhost:8080;
	server localhost:8081;
}

# http server directives
server {

	# maximum file upload size
	client_max_body_size 10G;

	# pass most requests to the proxied Galaxy application
	location / {
		proxy_pass		http://galaxy_app;
		proxy_set_header	X-Forwarded-Host $host;
		proxy_set_header	X-Forwarded-For $proxy_add_x_forwarded_for;
	}

	# directly handle file downloads in nginx
	location /_x_accel_redirect/ {
		internal;
		alias /;
	}

	# directly handle file uploads in nginx
	location /_upload {
		upload_store /home/galaxy/nginx_upload_store;
		upload_pass_form_field "";
		upload_set_form_field "__${upload_field_name}__is_composite" "true";
		upload_set_form_field "__${upload_field_name}__keys" "name path";
		upload_set_form_field "${upload_field_name}_name" "$upload_file_name";
		upload_set_form_field "${upload_field_name}_path" "$upload_tmp_path";
		upload_pass_args on;
		upload_pass /_upload_done;
	}
	location /_upload_done {
		set $dst /tool_runner/index;
		if ($args ~ nginx_redir=([^&]+)) {
			set $dst $1;
		}
		rewrite "" $dst;
	}

	# directly serve static content in nginx
	location /static {
		alias /home/galaxy/galaxy-dist/static;
		expires 24h;
	}
	location /static/style {
		alias /home/galaxy/galaxy-dist/static/june_2007_style/blue;
		expires 24h;
	}
	location /static/scripts {
		alias /home/galaxy/galaxy-dist/static/scripts/packed;
		expires 24h;
	}
	location /favicon.ico {
		alias /home/galaxy/galaxy-dist/static/favicon.ico;
		expires 24h;
	}
	location /robots.txt {
		alias /home/galaxy/galaxy-dist/static/robots.txt;
		expires 24h;
	}
}
```


Once saved, continue with:

```console
root@trainingday:/etc/nginx/sites-available# cd ../sites-enabled/
root@trainingday:/etc/nginx/sites-enabled# rm default 
root@trainingday:/etc/nginx/sites-enabled# ln -s /etc/nginx/sites-available/galaxy 
root@trainingday:/etc/nginx/sites-enabled# cd ..
root@trainingday:/etc/nginx# vim nginx.conf
```


In `/etc/nginx/nginx.conf`, change the first line:

```nginx
user www-data;
```


To:

```nginx
user galaxy;
```


Once saved, continue with:

```console
root@trainingday:/etc/nginx# /etc/init.d/nginx start
Starting nginx: nginx.
root@trainingday:/etc/nginx# 
```


Galaxy can now be accessed at http://localhost/

## Configure Galaxy for nginx upload/download

```console
root@trainingday:/etc/nginx# su - galaxy
galaxy@trainingday:~$ cd galaxy-dist/
galaxy@trainingday:~/galaxy-dist$ vim universe_wsgi.ini
```


In `universe_wsgi.ini`, set the following:

* `nginx_x_accel_redirect_base = /_x_accel_redirect` - This is the internal URL used by nginx to serve files for download.  It must match the location set in the nginx config above.
* `nginx_upload_store = /home/galaxy/nginx_upload_store` - This is the directory that files uploaded to the nginx_upload_module will be saved to.  It must match the path set in the nginx config above.
* `nginx_upload_path = /_upload` - This is the internal URL used by nginx to redirect the client once the upload is complete.  It must match the location set in the nginx config above.

Once saved, continue with:

```console
galaxy@trainingday:~/galaxy-dist$ exit
logout
root@trainingday:/etc/nginx# /etc/init.d/galaxy restart
* Stopping Galaxy main                                                  [ OK ] 
* Starting Galaxy main                                                  [ OK ] 

root@trainingday:/etc/nginx# 
```


## Install ProFTPd

```console
root@trainingday:/etc/nginx# apt-get install proftpd proftpd-mod-pgsql
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Note, selecting 'proftpd-basic' instead of 'proftpd'
The following extra packages will be installed:
  libcap2
Suggested packages:
  proftpd-doc proftpd-mod-mysql proftpd-mod-ldap proftpd-mod-odbc
  proftpd-mod-sqlite openbsd-inetd inet-superserver
The following NEW packages will be installed:
  libcap2 proftpd-basic proftpd-mod-pgsql
0 upgraded, 3 newly installed, 0 to remove and 24 not upgraded.
Need to get 0 B/2,146 kB of archives.
After this operation, 4,688 kB of additional disk space will be used.
Do you want to continue [Y/n]? 
Preconfiguring packages ...
Selecting previously unselected package libcap2.
(Reading database ... 61206 files and directories currently installed.)
Unpacking libcap2 (from .../libcap2_1%3a2.22-1ubuntu3_i386.deb) ...
Selecting previously unselected package proftpd-basic.
Unpacking proftpd-basic (from .../proftpd-basic_1.3.4a-1_i386.deb) ...
Selecting previously unselected package proftpd-mod-pgsql.
Unpacking proftpd-mod-pgsql (from .../proftpd-mod-pgsql_1.3.4a-1_i386.deb) ...
Processing triggers for ureadahead ...
Processing triggers for man-db ...
Setting up libcap2 (1:2.22-1ubuntu3) ...
Setting up proftpd-basic (1.3.4a-1) ...
Warning: The home dir /var/run/proftpd you specified can't be accessed: No such file or directory
Adding system user `proftpd' (UID 109) ...
Adding new user `proftpd' (UID 109) with group `nogroup' ...
Not creating home directory `/var/run/proftpd'.
Adding system user `ftp' (UID 110) ...
Adding new user `ftp' (UID 110) with group `nogroup' ...
Creating home directory `/srv/ftp' ...
`/usr/share/proftpd/templates/welcome.msg' -> `/srv/ftp/welcome.msg.proftpd-new'
* Starting ftp server proftpd                                                  trainingday proftpd[7609]: mod_tls/2.4.3: compiled using OpenSSL version 'OpenSSL 1.0.0e 6 Sep 2011' headers, but linked to OpenSSL version 'OpenSSL 1.0.1 14 Mar 2012' library

trainingday proftpd[7609]: mod_sftp/0.9.8: compiled using OpenSSL version 'OpenSSL 1.0.0e 6 Sep 2011' headers, but linked to OpenSSL version 'OpenSSL 1.0.1 14 Mar 2012' library
trainingday proftpd[7609]: mod_tls_memcache/0.1: notice: unable to register 'memcache' SSL session cache: Memcache support not enabled
                                                                         [ OK ]
Setting up proftpd-mod-pgsql (1.3.4a-1) ...
Processing triggers for libc-bin ...
ldconfig deferred processing now taking place
root@trainingday:/etc/nginx# 
```


When prompted by `debconf` with the following question, select `standalone`:

```
 ┌─────────────────────────┤ ProFTPD configuration ├─────────────────────────┐  
 │ ProFTPD can be run either as a service from inetd, or as a standalone     │  
 │ server. Each choice has its own benefits. With only a few FTP             │  
 │ connections per day, it is probably better to run ProFTPD from inetd in   │  
 │ order to save resources.                                                  │  
 │                                                                           │  
 │ On the other hand, with higher traffic, ProFTPD should run as a           │  
 │ standalone server to avoid spawning a new process for each incoming       │  
 │ connection.                                                               │  
 │                                                                           │  
 │ Run proftpd:                                                              │  
 │                                                                           │  
 │                                from inetd                                 │  
 │                                standalone                                 │  
 │                                                                           │  
 │                                                                           │  
 │                                  <Ok>                                     │  
 │                                                                           │  
 └───────────────────────────────────────────────────────────────────────────┘  
                                                                                
```


## Configure ProFTPd

The configuration of ProFTPd is explained in the wiki at [Admin/Config/Upload via FTP](/src/Admin/Config/Upload via FTP/index.md).

```console
root@trainingday:/etc/nginx# cd /etc/proftpd/
root@trainingday:/etc/proftpd# vim modules.conf 
```


In `/etc/proftpd/modules.conf`, uncomment the following 3 directives:

```apache
LoadModule mod_sql.c
LoadModule mod_sql_postgres.c
LoadModule mod_sql_passwd.c
```


Once saved, continue with:

```console
root@trainingday:/etc/proftpd# vim proftpd.conf 
```


In `/etc/proftpd/proftpd.conf`, change:

```apache
User                            proftpd
Group                           nogroup
```


To:

```apache
User                            galaxy
Group                           galaxy
```


Once saved, continue with:

```console
root@trainingday:/etc/proftpd# cd conf.d
root@trainingday:/etc/proftpd/conf.d# vim galaxy.conf
```


In `/etc/proftpd/conf.d/galaxy.conf`, paste the following:

```apache
# Cause every FTP user to be "jailed" (chrooted) into their home directory
DefaultRoot                     ~

# Automatically create home directory if it doesn't exist
CreateHome                      on dirmode 700

# Allow users to overwrite their files
AllowOverwrite                  on

# Allow users to resume interrupted uploads
AllowStoreRestart               on

# Bar use of SITE CHMOD
<Limit SITE_CHMOD>
  DenyAll
</Limit>

# Bar use of RETR (download) since this is not a public file drop
<Limit RETR>
  DenyAll
</Limit>

# Do not authenticate against real (system) users
AuthPAM                         off

# Set up mod_sql_password - Galaxy passwords are stored as hex-encoded SHA1
SQLPasswordEngine               on
SQLPasswordEncoding             hex

# Set up mod_sql to authenticate against the Galaxy database
SQLEngine                       on
SQLBackend                      postgres
SQLConnectInfo                  galaxy@/var/run/postgresql galaxy
SQLAuthTypes                    SHA1
SQLAuthenticate                 users

# An empty directory in case chroot fails
SQLDefaultHomedir               /var/lib/proftpd/empty

# Define a custom query for lookup that returns a passwd-like entry.  UID and GID should match your Galaxy user.
SQLUserInfo                     custom:/LookupGalaxyUser
SQLNamedQuery                   LookupGalaxyUser SELECT "email,password,'1001','1001','/home/galaxy/ftp/%U','/bin/bash' FROM galaxy_user WHERE email='%U'"
```


Once saved, continue with:

```console
root@trainingday:/etc/proftpd/conf.d# mkdir -p /var/lib/proftpd/empty
root@trainingday:/etc/proftpd/conf.d# su - galaxy
galaxy@trainingday:~$ cd galaxy-dist/
galaxy@trainingday:~/galaxy-dist$ vim universe_wsgi.ini
```


In `universe_wsgi.ini`, set the following:

* `ftp_upload_dir = /home/galaxy/ftp` - The directory where files uploaded via FTP will be placed.
* `ftp_upload_site = localhost` - The FTP site hostname displayed on the upload form.

Once saved, continue with:

```console
galaxy@trainingday:~/galaxy-dist$ exit
logout
root@trainingday:/etc/proftpd/conf.d# /etc/init.d/proftpd restart
* Stopping ftp server proftpd                                           [ OK ] 
* Starting ftp server proftpd                                                  trainingday proftpd[7908]: mod_tls/2.4.3: compiled using OpenSSL version 'OpenSSL 1.0.0e 6 Sep 2011' headers, but linked to OpenSSL version 'OpenSSL 1.0.1 14 Mar 2012' library

trainingday proftpd[7908]: mod_sftp/0.9.8: compiled using OpenSSL version 'OpenSSL 1.0.0e 6 Sep 2011' headers, but linked to OpenSSL version 'OpenSSL 1.0.1 14 Mar 2012' library
trainingday proftpd[7908]: mod_tls_memcache/0.1: notice: unable to register 'memcache' SSL session cache: Memcache support not enabled
                                                                         [ OK ]
root@trainingday:/etc/proftpd/conf.d# /etc/init.d/galaxy restart
* Stopping Galaxy main                                                  [ OK ] 
* Starting Galaxy main                                                  [ OK ] 

root@trainingday:/etc/proftpd/conf.d# 
```


The warnings can safely be ignored.

## Configure Galaxy to use Sun Grid Engine

The configuration of Galaxy's cluster interface is explained in the wiki at [Admin/Config/Performance/Cluster](/src/Admin/Config/Performance/Cluster/index.md).

A bit of work occurred behind the scenes for this step.  I preinstalled and preconfigured SGE in the VM, since setting up your DRM is outside of the scope of Galaxy configuration.

```console
root@trainingday:/etc/proftpd/conf.d# cd /etc/init.d
root@trainingday:/etc/init.d# vim galaxy
```


In `/etc/init.d/galaxy`, add the following to the section at the top where other environment variables are set:

```bash
DRMAA_LIBRARY_PATH="/usr/lib/libdrmaa.so.1.0"
SGE_ROOT="/var/lib/gridengine"
export DRMAA_LIBRARY_PATH SGE_ROOT
```


Once saved, continue with:

```console
root@trainingday:/etc/init.d# su - galaxy
galaxy@trainingday:~$ cd galaxy-dist
galaxy@trainingday:~/galaxy-dist$ vim universe_wsgi.ini
```


In `universe_wsgi.ini`, set the following:

* `start_job_runners = drmaa` - Start the [DRMAA](http://www.drmaa.org) job runner. 
* `default_cluster_job_runner = drmaa:///` - By default, run jobs on the cluster.
* Comment out the `local:///} tool overrides in the {{{[galaxy:tool_runners]` section.

Once saved, continue with:

```console
galaxy@trainingday:~/galaxy-dist$ exit
logout
root@trainingday:/etc/init.d# /etc/init.d/galaxy restart
* Stopping Galaxy main                                                  [ OK ] 
* Starting Galaxy main                                                  [ OK ] 

root@trainingday:/etc/init.d# 
```


## Run multiple Galaxy processes

The configuration of scaling with multiple processes is explained in the wiki at [Admin/Config/Performance/Scaling](/src/Admin/Config/Performance/Scaling/index.md).

```console
root@trainingday:/etc/init.d# /etc/init.d/galaxy stop
* Stopping Galaxy main                                                  [ OK ] 

root@trainingday:/etc/init.d# su - galaxy
galaxy@trainingday:~$ cd galaxy-dist/
galaxy@trainingday:~/galaxy-dist$ vim universe_wsgi.ini
```


In `universe_wsgi.ini`, comment out `[server:main]` and all of that section's contents.  Then add the following sections to the top of the file:

```ini
[server:web0]
use = egg:Paste#http
port = 8080
use_threadpool = True

[server:web1]
use = egg:Paste#http
port = 8081
use_threadpool = True

[server:manager]
use = egg:Paste#http
port = 8085
use_threadpool = True

[server:handler0]
use = egg:Paste#http
port = 8090
use_threadpool = True

[server:handler1]
use = egg:Paste#http
port = 8091
use_threadpool = True
```


Further down in the file, set the following:

* `job_manager = manager` - Specifies that the server named 'manager' defined above should have the role of assigning jobs to handlers.
* `job_handlers = handler0,handler1` - Specifies that the servers named 'handler0' and 'handler1' should have the role of running, tracking, and finishing jobs.

Once saved, continue with:

```console
galaxy@trainingday:~/galaxy-dist$ exit
logout
root@trainingday:/etc/init.d# /etc/init.d/galaxy start
* Starting Galaxy web0                                                  [ OK ] 
* Starting Galaxy web1                                                  [ OK ] 
* Starting Galaxy manager                                               [ OK ] 
* Starting Galaxy handler0                                              [ OK ] 
* Starting Galaxy handler1                                              [ OK ] 

root@trainingday:/etc/init.d# 
```


## Configure the Distributed Object Store

The distributed object store allows you to balance datasets across multiple filesystems and multiple file servers.

```console
root@trainingday:/etc/init.d# su - galaxy
galaxy@trainingday:~$ cd galaxy-dist/
galaxy@trainingday:~/galaxy-dist$ cp distributed_object_store_conf.xml.sample distributed_object_store_conf.xml
galaxy@trainingday:~/galaxy-dist$ vim universe_wsgi.ini
```


In `universe_wsgi.ini`, set the following:

* `object_store = distributed`
* `distributed_object_store_config_file = distributed_object_store_conf.xml`

Once saved, continue with:

```console
galaxy@trainingday:~/galaxy-dist$ exit
logout
root@trainingday:/etc/init.d# /etc/init.d/galaxy restart
* Stopping Galaxy web0                                                  [ OK ] 
* Stopping Galaxy web1                                                  [ OK ] 
* Stopping Galaxy manager                                               [ OK ] 
* Stopping Galaxy handler0                                              [ OK ] 
* Stopping Galaxy handler1                                              [ OK ] 
* Starting Galaxy web0                                                  [ OK ] 
* Starting Galaxy web1                                                  [ OK ] 
* Starting Galaxy manager                                               [ OK ] 
* Starting Galaxy handler0                                              [ OK ] 
* Starting Galaxy handler1                                              [ OK ] 

root@trainingday:/etc/init.d# 
```

