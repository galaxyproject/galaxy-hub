PLACEHOLDER_INCLUDE(/Develop/LinkBox)

# Getting Started with Galaxy Development

This page is a combination walk through guide and list of links meant to help new developers become acquainted with the Galaxy development ecosystem and how to contribute in a wide variety of ways.

## Learn Galaxy

If you are unfamiliar with Galaxy - the best way to start by using Galaxy, for instance by  walking through a simple analysis. [The Galaxy 101](https://usegalaxy.org/u/aun1/p/galaxy101) on [usegalaxy.org](https://usegalaxy.org/) is such a place to start. Those wishing to dive deeper into using Galaxy - checkout the following resources.

* The [/Learn](/src/Learn/index.md) wiki section
* Our [videos on vimeo](http://vimeo.com/galaxyproject/channels) (and the [usegalaxy channel](http://vimeo.com/73486255) in particular)

## Develop a Tool

Once familiar with Galaxy, every developer should write at least one Galaxy tool - it is the most common way to extend Galaxy with new functionality. A "tool" wraps an external application, script, or shell command - describing both the user interface and how to translate it into a command-line via a simple XML file.

* [Tutorial: Developing a Tool](/src/Admin/Tools/AddToolTutorial/index.md)

For those particularly interested in tool development the following section provides many more resources to read through and opportunities for contribution.

PLACEHOLDER_INCLUDE(/Develop/ResourcesTools)

## Using the API

After tool development the second most common way to develop extensions to Galaxy - is not to writing extensions at all - but instead to write scripts or applications that leverage the Galaxy API.

The easiest and best documented way to consume the Galaxy API is using the Python library [bioblend](http://bioblend.readthedocs.org/). Documentation for the alternative library for Java [blend4j](https://github.com/jmchilton/blend4j) can be found [here](http://jmchilton.github.io/blend4j/apidocs/).

While this wiki contains additional documentation, it is quite dated and in some ways represents less than best practices. For more information it is probably best to review the [source code documentation](https://galaxy-central.readthedocs.org/en/latest/lib/galaxy.webapps.galaxy.api.html) for the API or the [source code itself](https://github.com/galaxyproject/galaxy/tree/dev/lib/galaxy/webapps/galaxy/api).

## Contributing to the Galaxy Core

See https://github.com/galaxyproject/galaxy/blob/dev/CONTRIBUTING.md

## Contributing to the Extended Galaxy Ecosystem

In addition to the Galaxy core project and tool projects listed above - there are many open source projects related to Galaxy that would welcome contributions - many but certainly not all of them can be found on the [galaxyproject landing page](https://github.com/galaxyproject/) on github. Many more are in the following list (the Issues pages of these projects offer many great ways to contribute to the Galaxy ecosystem).

* [bioblend](https://github.com/galaxyproject/bioblend) - The Python client for the Galaxy and CloudMan APIs. [Documentation](http://bioblend.readthedocs.org/en/latest/), [Issues](https://github.com/galaxyproject/bioblend/issues)
* [Docker Galaxy Stable](https://github.com/bgruening/docker-galaxy-stable) - A  base [Docker](https://www.docker.com/) image providing a production platform for tool development. [Documentation](https://github.com/bgruening/docker-galaxy-stable), [Issues](https://github.com/bgruening/docker-galaxy-stable/issues)
* [planemo](https://github.com/galaxyproject/planemo) - A [Click](http://click.pocoo.org/3/) based Python CLI toolkit to aid Tool developers. [Contribution Guide](https://github.com/galaxyproject/planemo/blob/master/CONTRIBUTING.rst), [Documentation](http://planemo.readthedocs.org/en/latest/), [Issues](https://github.com/galaxyproject/planemo/issues)
* [CloudMan](https://github.com/galaxyproject/cloudman) - An infrastructure for creating compute clusters on cloud computing infrastructure. [Issues](https://trello.com/b/csTK4j3B/galaxy-cloudman)
* [blend4j](https://github.com/galaxyproject/blend4j) - The Java client for the Galaxy and API. [JavaDocs](http://jmchilton.github.io/blend4j/apidocs/), [Issues](https://github.com/galaxyproject/blend4j/issues)
* [Refinery Platform](http://www.refinery-platform.org/) - a data management, analysis and visualization system for bioinformatics and computational biology applications built in part on Galaxy workflow engine. [Documentation](https://github.com/parklab/refinery-platform), [Issues](https://github.com/parklab/refinery-platform/issues)
* [pulsar](https://github.com/galaxyproject/pulsar) - A distributed job execution application built for Galaxy. [Contribution Guide](https://github.com/galaxyproject/pulsar/blob/master/CONTRIBUTING.rst), [Documentation](https://pulsar.readthedocs.org/en/latest/), [Issues](https://github.com/galaxyproject/pulsar/issues)
* [Puppet Galaxy](https://github.com/puppet-galaxy/puppet-galaxy) - Community maintained roles for managing Galaxy via [Puppet](http://puppetlabs.com/).
* Devteam managed ansible projects related to managing Galaxy servers.
  * [Ansible Galaxy](https://github.com/galaxyproject/ansible-galaxy) - Core role for deploying Galaxy.
  * [CloudMan Playbook](https://github.com/galaxyproject/galaxy-cloudman-playbook) - Ansible and Packer components for building a CloudMan server.
  * [Ansible Galaxy OS](https://github.com/galaxyproject/ansible-galaxy-os) - Ansible role for configuring the base operating system dependencies useful for Galaxy servers.
  * [Ansible PostgreSQL](https://github.com/galaxyproject/ansible-postgresql) Ansible role for configuring PostgreSQL (used on usegalaxy.org).
  * [https://github.com/jmchilton/planemo-machinelPlanemo Machine](https://github.com/jmchilton/planemo-machinelPlanemo Machine) Ansible and Packer components useful for building development virtual machines.
  * [https://github.com/galaxyproject/ansible-galaxy-extraslAnsible Galaxy Extras](https://github.com/galaxyproject/ansible-galaxy-extraslAnsible Galaxy Extras) Ansible role for configuring dynamic production servers such as Docker images and cloud-based virtual machines (used by planemo-machine and docker-galaxy-stable).
  * [Ansible CloudMan Image](https://github.com/galaxyproject/ansible-cloudman-image) Ansible role for configuring an Ubuntu operating system for CloudMan.
  * [https://github.com/galaxyproject/ansible-tracksterlAnsible Trackster](https://github.com/galaxyproject/ansible-tracksterlAnsible Trackster) Ansible role for configuring Trackster dependencies.
