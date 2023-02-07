---
title: 'How tools are created and maintained in Galaxy'
tease: 'A short summary about Galaxy tools development, maintenance and deployment.'
date: '2023-02-05'
tags: [tools]
authors: "Intergalactic Utilities Commission (IUC)"
subsites: [global, all-eu]
---


Creating and maintaining tools involves three main factors - the author choosing to prepare the tool, how rapidly they update their tool repository after
the underlying analysis package source code repository has been updated, and when each Galaxy server administrator chooses to update their installed tools.
In brief, many project community supported tools are carefully selected, well supported and quickly updated. The longer answer below describes how the
open source community contributes to the creation and support of tools. 

Galaxy allows any open source command line analysis package to be incorporated into a tool by preparing a specialised “wrapper” document and some automated tests.
Developers can learn to create these using [Galaxy training resources](https://training.galaxyproject.org/training-material/topics/dev/tutorials/tool-integration/slides.html),
and can upload them to [the ToolShed](https://toolshed.g2.bx.psu.edu), a public, open, tool sharing repository.
Thousands of independent tool wrapper authors have contributed to the 8000+ tools currently available in the ToolShed. These can be automatically installed
to any Galaxy server, where the third-party packages and dependencies can be downloaded and installed, or managed as a secure container if preferred.

The [IUC](https://galaxyproject.org/iuc/), is an open, community-controlled committee responsible for publishing coding standards, training material,
and guidelines for tool wrapper authors, and for encouraging "best practice" tool wrappers, including automated tool tests, and security recommendations.
The IUC also prepares and maintains its own tool wrappers in response to community need for new and established open-source analysis packages.
Fully automated “bot” software supports continuous integration, by regularly checking every IUC tool analysis package repository, creating an “update”
pull request in the wrapper repository and notifying the community, whenever a new version has been released. Independent review is mandatory for all
changes to IUC tool wrappers, before they can be published to the ToolShed. Some important toolkits for specialised data rich domains such as
proteomics and chemoinformatics, are maintained by community contributors using IUC best practice infrastructure and methods, to reliably keep their tools up to date.

Whenever the underlying third-party analysis package repository releases a new version, a tool wrapper must be modified and tested, then uploaded to
the ToolShed as a new version that installs and uses the updated package. Tool wrappers can be very complicated, but in terms of lines of source code and bugs,
they usually represent a relatively small fraction of any Galaxy tool. The underlying open source analysis code and dependencies are the greatest source of complexity,
and of software errors. No systematic review of that very large volume of third party open source code is undertaken by the Galaxy community.

The final step in terms of propagating updated toolshed wrappers takes place at each Galaxy server where the tool has been installed.
The server administrator can choose to have all installed tools automatically updated, or to manage updates manually, through the server
administrative interface. When a new version of any tool is installed, it becomes the default version for all users.
Older versions are retained and can be selected instead of the default when a job is run. 

Retaining historical tool versions allows users to computationally replicate previous jobs, with exactly the same analysis package and
dependency versions. Versioning allows accurate replication, even after years may have passed, during which multiple updates of the
analysis package and dependencies may have been installed. Replication includes all that older version’s software errors present when
the original analysis was completed. Alternatively, any previous job can be re-run using the same tool settings and input data,
but using an updated version of the analysis package and dependencies in place of the original one.

In summary, like most things in Galaxy, parts of the community take responsibility for tool wrapper creation and upgrades in response
to independent underlying open source analysis packages being updated. Many tools are supported by active community groups, including the IUC.
Transparent version control is integrated into the propagation of ToolShed tools to Galaxy servers, supporting traceability and computational replication for open science analyses.



