---
title: "eLabFTW integration"
date: "2025-04-02"
tease: "Bring data to Galaxy straight from the lab."
hide_tease: false
authors: José Manuel Domínguez
authors_structured:
- github: kysrpex
subsites: [eu, esg]
tags: [esg, esg-wp2]
supporters:
  - eurosciencegateway
  - unifreiburg
---

[eLabFTW](https://www.elabftw.net/) is a free and open source electronic lab notebook from
[Deltablot](https://www.deltablot.com/about/). It can keep track of experiments, equipment and materials from a research
lab. Each lab can either [host their own installation](https://doc.elabftw.net/#introduction) or go for Deltablot's
[hosted solution](https://www.deltablot.com/elabftw/). A live demo showcasing its features is available [here](https://demo.elabftw.net/).

And from now on, it is integrated with Galaxy! eLabFTW support has been deployed to
[usegalaxy.eu](https://usegalaxy.eu), and the file source will be brought onboard to upstream Galaxy in release 25.0.
This means that files attached to eLabFTW [experiments](https://doc.elabftw.net/user-guide.html#experiments) and
[resources](https://doc.elabftw.net/user-guide.html#resources) can be imported to
[histories](https://training.galaxyproject.org/training-material/topics/galaxy-interface/tutorials/history/tutorial.html)
with just a few clicks. After the analysis is complete, datasets and histories can be exported back as attachments to an
experiment or resource.

## Getting started

Before it can be used, the feature _must be enabled by a Galaxy administrator_. Once enabled, navigate to the _Settings_
page on your eLabFTW server and go to the _API Keys_ tab.   

![eLabFTW API Keys tab on settings page](./elabftw_api_keys.png)

Generate a new API key and copy it. Choose "Read/Write" permissions to enable both importing and exporting data. "Read
Only" API keys work for importing data to Galaxy, but not for exporting data to eLabFTW.

![Creating a new API key](./elabftw_api_keys_generate.png)

On Galaxy, configure a new eLabFTW file source under user preferences _Manage Your Repositories_ > _Create_ > _eLabFTW_.

![User preferences](./user_preferences.png)

![Manage Your Repositories](./manage_your_repositories.png)

![Select eLabFTW](./manage_your_repositories_create.png)

Assign a name to your eLabFTW file source, enter the URL to your eLabFTW instance, and enter the API key you just
generated. If you are using a "Read Only" API key, disable the toggle "Allow Galaxy to export data to eLabFTW?".
Click _Create_.

![eLabFTW file source setup on Galaxy](./elabftw_file_source.png)

## Importing files to a Galaxy history

To import files from eLabFTW to a Galaxy history, click _Upload_ on the sidebar and then _Choose remote files_. 

![Galay upload tool](upload_tool.png)

![Remote file sources](file_sources.png)

After selecting _eLabFTW_, Galaxy shows two folders, one that contains all experiments and another that contains all
resources.

![eLabFTW experiments and resources listed by Galaxy](elabftw_experiments_and_resources.png)

Inside each, all experiments or resources are listed as folders. Attached files are located within each of the folders.

![Experiments listed by Galaxy](elabftw_experiments.png)

![Files attached to the microscopy experiment](elabftw_experiment_microscopy.png)

## Exporting histories to eLabFTW

Clicking _Export History to File_ under _History options_ opens the history export screen. There, select _to remote 
file_, choose a name, and finally use the box _Click to select directory_ to open the remote file source browser. The
same screen displayed when importing files will be shown, from where you can select a target experiment or resource.

![History export screen](history_export.png)

Keep in mind that you have to create the experiments and resources themselves on eLabFTW beforehand.

## Exporting datasets to eLabFTW

Individual datasets may also be exported with the help of the
[dataset export](https://usegalaxy.eu/?tool_id=export_remote&version=latest) tool. First, choose the datasets to export
under the _What would you like to export?_ section. Then click _Select_ under _Directory URI_ to open the remote file
source browser, which allows to select the target experiment or resource.

![Dataset export tool](dataset_export.png)
