---
autotoc: true
---
INCLUDE(/Cloud/Jetstream/LinkBox)


## ssh access
Some tasks on the Galaxy server (e.g., configuration changes) require you to connect to the VM using a command line shell. This can easily be done from within your browser by opening the VM details page and clicking the *Open Web Shell* button. 

![](http://i.imgur.com/xYtIYoR.png)

This will open a terminal inside your web browser with a command prompt in the VM.

![](http://i.imgur.com/0avr6go.png)

From here, you can perform any administrative task. You will be logged in as the user that launched the instance (*eafgan* in my case, as shown in the screenshot). This user has privileges to become the *root* system user via *sudo* command. Some tasks will require you to become *root* user while others will require you to become *galaxy* system user. Changing users is simple:

* To become *root* user, run this command: *sudo -s*
* To become *galaxy* user, run this command: *sudo su galaxy*
* To return to the previous user, type *exit*

## Changing Galaxy settings
Galaxy has an extensive set of administrative [configuration options](/Admin). The most common changes to Galaxy are performed by editing *galaxy.ini* file. On the Jetstream image, this file is located in */opt/galaxy/galaxy-app/config/galaxy.ini* and it must be edited as *galaxy* system user. You can edit the file using [nano](http://www.howtogeek.com/howto/42980/the-beginners-guide-to-nano-the-linux-command-line-text-editor/) or [vim](https://www.linux.com/learn/vim-101-beginners-guide-vim) editors. The most current list of available options is always available in the [galaxy.ini.sample](https://github.com/galaxyproject/galaxy/blob/dev/config/galaxy.ini.sample) file; any missing options can be added of the existing ones can be modified. If adding new options to the file, make sure that you are adding them under the right section of the file, most likely under *[app:main]* header. Note that after changing this file, it is necessary to restart Galaxy.

### Adding Galaxy Admin user
To be able to add new tools or reference data, it is necessary to become Galaxy Admin user and use the [admin panel](/Admin/Interface). This is done by editing Galaxy settings (see above section) and adding a line like the following under the *[app:main]* section: *admin_users = <registered user's email address>*. Save the file and restart Galaxy process.

## Restarting Galaxy
After any Galaxy configuration changes, it is necessary to restart the Galaxy process. Galaxy process is managed by [Supervisor](http://supervisord.org/index.html) - a process control software. To restart the process, it is required to become *root* user, and restart the Galaxy process via supervisor:

```bash
eafgan@x:~$ sudo -s
root@x:~# supervisorctl
galaxy:web0                      RUNNING    pid 4077, uptime 3:17:41
munge                            RUNNING    pid 1376, uptime 3:57:06
nginx                            RUNNING    pid 1378, uptime 3:57:06
postgresql                       RUNNING    pid 1375, uptime 3:57:06
pre_postgresql                   EXITED     Apr 15 11:33 AM
proftpd                          RUNNING    pid 1385, uptime 3:57:06
slurmctld                        RUNNING    pid 3512, uptime 3:47:58
slurmd                           RUNNING    pid 1563, uptime 3:56:36
supervisor> restart galaxy:web0
galaxy:web0: stopped
galaxy:web0: started
supervisor> exit```

