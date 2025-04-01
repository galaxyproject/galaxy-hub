---
title: "eLabFTW integration"
date: "2025-06-30"
tease: "Bring data straight from your lab"
hide_tease: false
authors: José Manuel Domínguez
authors_structured:
- github: kysrpex
subsites: [eu, esg]
tags: []
---

[eLabFTW](https://www.elabftw.net/) is a free and open source electronic lab notebook from
[Deltablot](https://www.deltablot.com/about/). It can keep track of experiments, equipment and materials from a research
lab. Each lab can either [host their own installation](https://doc.elabftw.net/#introduction) or go for Deltablot's
[hosted solution](https://www.deltablot.com/elabftw/). A live demo showcasing its features is available [here](https://demo.elabftw.net/).

And from now on, it is integrated with Galaxy! Release 25.0 brings eLabFTW onboard as a file source. This means that
files attached to eLabFTW [experiments](https://doc.elabftw.net/user-guide.html#experiments) and 
[resources](https://doc.elabftw.net/user-guide.html#resources) can be imported to
[histories](https://training.galaxyproject.org/training-material/topics/galaxy-interface/tutorials/history/tutorial.html)
with just a few clicks. After the analysis is complete, datasets and histories can be exported back as attachments to an
experiment or resource. 

## Getting started

Before it can be used, the feature _must be enabled by a Galaxy administrator_. Once enabled, navigate to the _Settings_
page on your eLabFTW server and go to the _API Keys_ tab.   

![eLabFTW API Keys tab on settings page](./elabftw_api_keys.png)

Generate a new API key and copy it. Choose "Read/Write" permissions to enable both importing and exporting data. "Read
Only" API keys still work for importing data to Galaxy, but they will cause Galaxy to error out when exporting data to
eLabFTW.    

![Creating a new API key](./elabftw_api_keys_generate.png)

On Galaxy, open the eLabFTW integration settings under user preferences _Manage Information_ > 
_Your eLabFTW Integration Settings_. Enter the API key you just generated and the URL of your eLabFTW instance and click
_Save_.

![eLabFTW integration settings on Galaxy](./elabftw_integration_settings.png)

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
