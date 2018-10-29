---
title: Galaxy Capacity Planning
---
{{> Admin/LinkBox }}



One of the recurring questions on the [Mailing Lists](/src/mailing-lists/index.md) is

 . *How much computing power / disk space / network bandwidth / ... do I need to [set up my own Galaxy server](/src/admin/get-galaxy/index.md)?*

There is no one set answer to this question.  It depends upon how many users you have, what your dataset sizes are, and what type of analyses your users will be doing.  The [GalaxyAdmins survey results](/src/community/galaxy-admins/surveys/index.md) are the best source of information.

Note that Galaxy itself, and many of the basic tools, can run on an average or even older laptop.  However, to run computationally intensive tools such as mappers and assemblers, you will need some computational power behind it.

## Can we use the Cloud?

Absolutely.  In fact, if your needs tend to be characterized by long periods of no use (days / weeks / months) interspersed by short periods of intense use, then you should consider the [Cloud](/src/cloud/index.md).  Setting up a compute cluster / server farm (if you need something that big) can take months, as you may be delayed repeatedly by details like air conditioning upgrades, electrical capacity, and finding a sys admin.

See the [Cloud page](/src/cloud/index.md) for information on getting started with the cloud.

## See Also

* [Cloud](/src/cloud/index.md) - Galaxy on the cloud options
* [Public Galaxy Servers](/src/use/index.md) - a list of known, publicly accessible, Galaxy servers.
