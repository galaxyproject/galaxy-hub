---
title: Galaxy Administration
---
This is a hub page on topics related to deployment and administration of your own instance of Galaxy.<br>
If you are new to Galaxy and want to administer your own service read the [Ten Simple Rules for Setting up a Galaxy Instance as a Service](/admin/ten-simple-steps-galaxy-as-a-service/).

## Setup admin user

To give a Galaxy user admin privileges you have to add their Galaxy login ( email ) to the Galaxy configuration file `config/galaxy.yml`. If the file does not exist yet you can create it from the provided sample (`config/galaxy.yml.sample`). Make sure you rename it correctly. Note that you have to restart Galaxy after modifying the configuration for changes to take effect. Also make sure you don't specify it twice - the line with `admin_users` is already present in every sample config and should be there only once.

```
# this should be a comma-separated list of valid Galaxy users
admin_users: user1@example.com,user2@example.com
```

When an admin user logs into Galaxy, they will see an "Admin" menu item in the top Galaxy menu bar which will take them to the Galaxy Admin page with an administration panel.

## Deploying

* [Install own Galaxy](/admin/get-galaxy/)
* [Run on the Cloud Infrastructure](/cloudman/)
* [Maintaining an Instance](/admin/maintenance/)

## Configuration

* [Authentication and Authorization](/authnz/)
* [Production Configuration](/admin/config/)
* [Installing Tools](/admin/tools/add-tool-from-toolshed-tutorial/)
* [Tool Panel](/admin/tool-panel/)
* [Local Reference Data](/admin/data-integration/)
* [Data Libraries](/data-libraries/)
* [Datatypes](/admin/datatypes/)
* [Configuring Galaxy Home/Welcome Page](/admin/galaxy-welcome-page/)
* [Interactive Environments (IE)](/admin/gies/)


## Users

* [Disk Accounting and Quotas](/admin/disk-quotas/)
* [Usage Reports](/admin/usage-reports/)
* [Purge Histories and Datasets](/admin/config/performance/purge-histories-and-datasets/)


## Learning Resources

* [FAQ](/admin/faq/)
* [Mailing Lists (galaxy-dev)](/mailing-lists/)
* [Tutorials](/admin/training/)


## Development Resources

* [Developer's hub](/develop/)


## Data Resources

* [Data Managers Tutorial](https://github.com/galaxyproject/dagobah-training/blob/2017-montpellier/sessions/05-reference-genomes/ex1-reference-genomes.md)
* [Admin/DataIntegration](/admin/data-integration/)
* [Admin/DataPreparation](/admin/data-preparation/)
* [Admin/ReferenceMAFs](/admin/reference-mafs/)
* [Admin/refgenie](/admin/refgenie/)


## Other

* [License](/admin/license/)
* [Running Tests](/admin/running-tests/)
* [Galaxy-Admins discussion group](/community/galaxy-admins/)
* [Switching to Github from Bitbucket](/admin/switching-to-github-from-bitbucket/)

[Search all Galaxy resources](/search/)
