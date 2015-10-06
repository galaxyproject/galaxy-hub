<div class='right'>TABLE_OF_CONTENTS</div> 

The Galaxy application is the flagship service within !CloudMan. Usage and general configuration information for the Galaxy application is available throughout this wiki. This page focuses on service features available within !CloudMan as they affect the Galaxy application.

### Becoming a Galaxy Admin user
A Galaxy Administrator user has additional privileges and can install/manage tools from the Tool Shed, manage users, libraries, set quotas, etc. Complete documentation on the Galaxy Admin Interface is available [here](https://wiki.galaxyproject.org/Admin/Interface). 

In order to become an Admin user on the !CloudMan instance, head to the !CloudMan Admin page and type comma-separated email addresses for users you would like to become Admins (see screenshot below). Note that those emails should be registered users with this Galaxy instance. Then, click *Set admin users* and wait for Galaxy application to restart; refresh your Galaxy window and an *Admin* tab will become visible in the masthead.

![](http://i.imgur.com/lMh7ahV.png)

### Changing Galaxy configuration files
To ensure proper operation of the Galaxy application, !CloudMan manages many of the Galaxy configuration options (e.g., file paths). In the future, we plan on providing a method for a user to update some of those settings in a more interactive fashion but for the time being, those settings are coded within !CloudMan. If you need to permanently change those settings, it will be necessary to change *populate_galaxy_paths* method in [this file](https://github.com/galaxyproject/cloudman/blob/master/cm/util/galaxy_conf.py) and use your custom version of !CloudMan when starting your cluster. See [this page](/CloudMan/CustomizeGalaxyCloud.md#using_custom_cloudman_application) for more details on how to do this.

If you need to change the configuration values on a running cluster, you can do so manually as well. Galaxy configuration files are stored in */mnt/galaxy/galaxy-app/config* and can be updated as desired. If you do this, you need to restart Galaxy by hand vs. using CloudMan Admin panel (because CloudMan will overwrite the config file). The following is a set of commands to use for restarting Galaxy manually:
```
#!highlight sh
sudo su galaxy
cd /mnt/galaxy/galaxy-app
sh run.sh --pid-file=main.pid --log-file=main.log --stop-daemon
sh run.sh --pid-file=main.pid --log-file=main.log --daemon
```


Additional Galaxy configuration options can be found on the [Galaxy Admin page](/Admin).

#### Adding a custom Tool Shed
By default, !CloudMan is configured with the Main and Test Tool Sheds. If you would like to add another Tool Shed, it is necessary to edit file */mnt/galaxy/galaxy-app/config/tool_sheds_conf.xml* and restart Galaxy (via !CloudMan Admin). The newly added Tool Shed will become available on the *Galaxy Admin* -> *Search and browse tool sheds* page.

### Updating Galaxy source
Galaxy application installed within !CloudMan can be updated to a newer version via git. To do so
1. Stop Galaxy service via !CloudMan Admin by clicking on the 'Stop' button next to the Galaxy service name
![](http://i.imgur.com/SV3gHFA.jpg)
2. ssh to the instance, change to *galaxy* user (with *sudo su galaxy*) and change to */mnt/galaxy/galaxy-app* directory
3. Issue *git pull* command (note that it may also be necessary to run *sh manage_db.sh upgrade* command if database migrations were introduced since the initial version of Galaxy)
4. Start Galaxy from !CloudMan Admin
By default, the installed Galaxy application is on *release_<version>* branch so updating it will update that particular release. If you would like to update to a different release, it is necessary to also change to the desired git branch.
