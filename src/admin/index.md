---
title: Galaxy Administration
---
This is a hub page on topics related to deployment and administration of your own instance of Galaxy.<br>
If you are new to Galaxy and want to administer your own service read the [Ten Simple Rules for Setting up a Galaxy Instance as a Service](/src/admin/ten-simple-steps-galaxy-as-a-service/index.md).

## Setup admin user

To give a Galaxy user admin privileges you have to add their Galaxy login ( email ) to the Galaxy configuration file `config/galaxy.yml`. If the file does not exist yet you can create it from the provided sample (`config/galaxy.yml.sample`). Make sure you rename it correctly. Note that you have to restart Galaxy after modifying the configuration for changes to take effect. Also make sure you don't specify it twice - the line with `admin_users` is already present in every sample config and should be there only once.

```
# this should be a comma-separated list of valid Galaxy users
admin_users: user1@example.com,user2@example.com
```

When an admin user logs into Galaxy, they will see an "Admin" menu item in the top Galaxy menu bar which will take them to the Galaxy Admin page with an administration panel.

## Deploying

* [Install own Galaxy](/src/admin/get-galaxy/index.md)
* [Run on the Cloud Infrastructure](/src/cloudman/index.md)
* [Maintaining an Instance](/src/admin/maintenance/index.md)

## Configuration

* [Authentication and Authorization](/src/authnz/index.md)
* [Production Configuration](/src/admin/config/index.md)
* [Installing Tools](/src/admin/tools/add-tool-from-toolshed-tutorial/index.md)
* [Tool Panel](/src/admin/tool-panel/index.md)
* [Local Reference Data](/src/admin/data-integration/index.md)
* [Data Libraries](/src/data-libraries/index.md)
* [Datatypes](/src/admin/datatypes/index.md)
* [Configuring Galaxy Home/Welcome Page](/src/admin/galaxy-welcome-page/index.md)
* [Interactive Environments (IE)](/src/admin/gies/index.md)


## Users

* [Disk Accounting and Quotas](/src/admin/disk-quotas/index.md)
* [Usage Reports](/src/admin/usage-reports/index.md)
* [Purge Histories and Datasets](/src/admin/config/performance/purge-histories-and-datasets/index.md)


## Learning Resources

* [FAQ](/src/admin/faq/index.md)
* [Mailing Lists (galaxy-dev)](/src/mailing-lists/index.md)
* [Tutorials](/src/admin/training/index.md)


## Development Resources

* [Developer's hub](/src/develop/index.md)


## Data Resources

* [Data Managers Tutorial](https://github.com/galaxyproject/dagobah-training/blob/2017-montpellier/sessions/05-reference-genomes/ex1-reference-genomes.md)
* [Admin/DataIntegration](/src/admin/data-integration/index.md)
* [Admin/DataPreparation](/src/admin/data-preparation/index.md)
* [Admin/ReferenceMAFs](/src/admin/reference-mafs/index.md)


## Other

* [License](/src/admin/license/index.md)
* [Running Tests](/src/admin/running-tests/index.md)
* [Galaxy-Admins discussion group](/src/community/galaxy-admins/index.md)
* [Switching to Github from Bitbucket](/src/admin/switching-to-github-from-bitbucket/index.md)

[Search all Galaxy resources](/src/search/index.md)
