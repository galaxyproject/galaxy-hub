---
title: Installing Tools into Galaxy
---
## Ways to get tools into Galaxy

* Install a tool from the [Tool Shed](/toolshed/). The process has to be completed by an administrator and can be done through the [Admin Interface](/admin/).
* If the tool you need does not exist in the Tool Shed you can add it to your Galaxy instance manually. Please see the [Add Tool Tutorial](/admin/tools/add-tool-tutorial/).
* Automated installation - The process of installing tools from Tool Shed can be performed in an automated way using a set of scripts. This is particularly useful if you are trying to install a large number of tools. The required scripts are available as an [Ansible](https://www.ansible.com/home) playbook from [here](https://github.com/afgane/galaxy-tools-playbook). Please see that page for complete instructions.

## Vocabulary

* *repository* - Tools in Tool Shed are stored in versioned code archives called repositories. There may be more tools per repository.


## Find the tool you want to use

* Find the tool in some other Galaxy instance that already has it.
* Use the Tool Shed search or browse categories and tools at https://toolshed.g2.bx.psu.edu/.
* Use the experimental search at https://toolshed.tools/.

## Connect your Galaxy to a Tool Shed

Galaxy is by default connected to the Main Tool Shed. However you can optionally connect to other custom Tool Sheds by modifying the `config/tool_sheds_conf.xml` file in the Galaxy directory. There are few more Tool Sheds worldwide but the Galaxy Team maintains two: [Main Tool Shed](https://toolshed.g2.bx.psu.edu/) and [Test Tool Shed](https://testtoolshed.g2.bx.psu.edu/). By default, the Main Tool Shed is already configured in Galaxy and we recommend using it.

However you can add as many Tool Sheds as you want to the configuration file of your Galaxy.

```
<?xml version="1.0"?>
<tool_sheds>
    <tool_shed name="Galaxy Main Tool Shed" url="https://toolshed.g2.bx.psu.edu/"/>
    <OTHER TOOL SHED>
</tool_sheds>
```

<div class="alert alert-success trim-p" role="alert">

To install tools from a Tool Shed you need to have [Mercurial](https://www.mercurial-scm.org/) available on the system that runs Galaxy.

</div>

## Open the Tool Shed

Go to Galaxy [Admin Interface](/admin/) and click `Install new tools`.

You will see the following in the middle panel:

![Connected Toolsheds](/admin/tools/add-tool-from-toolshed-tutorial/connected_toolsheds.png)

## Search for a repository

Click `Search for valid repositories`. (You can also search for tools directly.)

## Enter the name of the repository you are searching for

Next, you can put in the repository name and hit `Search`.  In our example, we'll search for `bwa`.

![Search Valid Tools](/admin/tools/add-tool-from-toolshed-tutorial/search_valid_tools.png)

## Select a repository to install

After searching, you can select a repository to install.  In our case, we'll install `bwa` from the owner `devteam`.

![Install BWA](/admin/tools/add-tool-from-toolshed-tutorial/install_bwa.png)

## Preview the repository

On the next page you can preview the contents of the repository including all tools and a readme file.

![Repository Install Preview](/admin/tools/add-tool-from-toolshed-tutorial/repository_install_preview.png)

## Confirm dependencies

Finally, we can confirm our dependencies installation (if any) and choose the panel section we want to show the repository's tools in. If you keep the settings as is, the shown dependencies will be handled automatically either by Conda or Tool Shed package recipes. To learn more you can visit documentation about [dependency resolution](https://docs.galaxyproject.org/en/master/admin/dependency_resolvers.html) and [Conda](https://docs.galaxyproject.org/en/master/admin/conda_faq.html).

![BWA Conda Details](/admin/tools/add-tool-from-toolshed-tutorial/bwa_conda_details.png)

## Sit down and relax

..and wait for the installation to proceed.

As you're waiting for your tool to install, you can leave the page freely, as the installation will continue in the background. As of Galaxy version [16.10](https://docs.galaxyproject.org/en/master/releases/16.10_announce.html) you do not need to restart Galaxy to have the tools loaded. If you have an older version please make sure to restart the Galaxy process (this also applies to any handlers your Galaxy uses) so the new tools will get loaded properly.

The tool will show up in the tool panel of the section you selected, and the users can use it.

![Tool Installation](/admin/tools/add-tool-from-toolshed-tutorial/tool_installation.png)

You can monitor the installation progress of the tool if you click on `Monitor installing tool shed repositories` in the [Admin Interface](/admin/).

You can also check the states of all installed tools if you click `Manage installed tool shed repositories` in the [Admin Interface](/admin/).

![Repository Status](/admin/tools/add-tool-from-toolshed-tutorial/repo_status.png)
