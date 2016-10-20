---
autotoc: true
---
PLACEHOLDER_INCLUDE(/src/CloudMan/Header/index.md)
<br />

<div class='right'></div>

The following documentation can help you troubleshoot problems that you might have with your cloud system.
For additional help with this system, you can search the [mailing list archives](http://dev.list.galaxyproject.org/), [Biostar forum](https://biostar.usegalaxy.org/), [IRC channel log](https://botbot.me/freenode/galaxyproject/), or post a question to any of those venues.

### Log files

Log files are available for problem diagnosis. Each launched instance (master or worker) will have their respective logs in the same locations, which are as follows:
<div class='center'>

| Log path |  Description  | 
| -------- | ------------ | 
| */var/log/cloudman/cm_autorun.log* |  As an instance starts, this is the first !CloudMan-related log file that gets created. The bootstrap script */usr/bin/cm_autorun.py* logs here as it will initiate the cluster startup process by processing [instance user data](/src/CloudMan/UserData/index.md), downloading and invoking *cm_boot.py* script (see below). The mentioned script is automatically invoked by an [upstart](http://upstart.ubuntu.com/) job (at launch level 2, 3, 4, or 5), as defined in */etc/init/cloudman.conf*.  | 
| */var/log/cloudman/cm_boot.log* |  This log file contains the output from */tmp/cm/[cm_boot.py](https://github.com/galaxyproject/cloudman/blob/master/cm_boot.py)* script as it prepares the instance for !CloudMan, starts the web server, downloads !CloudMan (from the cluster's bucket or the default bucket) and then launches the !CloudMan application.  | 
| */var/log/cloudman/cloudman.log* |  This is the main !CloudMan application log file and it contains all the logging output as the application runs. The contents of this file are also available from the !CloudMan Admin page. The main log file is automatically rotated by [logrotate](http://www.linuxcommand.org/man_pages/logrotate8.html) to keep the file of manageable size. The logrotate definition is stored at */etc/logrotate.d/cloudman* (as defined in the corresponding [Ansible role](https://github.com/galaxyproject/ansible-cloudman-image/blob/master/files/cloudman.logrotate)) and the rotated files will be available in the !CloudMan application's runtime directory, */mnt/cm*.  | 
| */mnt/galaxy/galaxy-app/main.log* |  This is the main Galaxy application log file. It is also available from the !CloudMan Admin page.  | 
</div>
Note that the !CloudMan application log file locations have changed with the Mid 2015 release; for the locations of log files on older instances, see [this page](http://cloudman.irb.hr/blog/2013/03/06/cloudman-startup-procedure/).<br />
For log files of individual services running within the system, see the page specific to the [particular service](/src/CloudMan/Services/index.md). 

### Connect to Galaxy database

Your cloud cluster is configured with a PostgreSQL database for use by Galaxy. By default, the database is stored in `/mnt/galaxy/db` and is available on port 5930. To connect to the database, switch to the *galaxy* system user and connect to it with the following command: `psql -p 5930`
