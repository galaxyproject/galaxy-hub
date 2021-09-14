---
title: Federation
---

The popularity of Galaxy is calling for extensive compute and storage capacity to be made available. 
The Galaxy Project and the community at large have been making strides in this effort by creating a 
variety of resources available. These include free public servers, virtual machines, cloud instances,
usegalaxy.* federation, container images, etc. However, such dedicated installations of Galaxy instances
is gradually leading to many silos of data, shared objects, tools, and expertise. In order to further
strengthen the community and help build on each other's contributions, we are actively working
on the notion of resource federation for Galaxy. This means that it will be possible to bring together
disparate data and compute resources to effectively handle large data and long computations.

For end users, this means that they will be able to bring their own resources to an existing Galaxy instance
to expand the available storage and compute capacity for their jobs. For resource owners, it will be 
possible to partner with other institutions to bring existing resources to an otherwise managed Galaxy 
instance. Contributed resources can be added to the shared pool or isolated for specific user(s). While
this is a long-term, multi-year effort, we have been and are continuing to work toward these goals. Below
are some links and references about the ongoing progress. Feel free to reach out and join.

## Compute
Aggregating compute resources from a variety of sources is necessary step toward Galaxy federation.
We have been actively working on a software stack to provider the necessary abstractions and hooks
so that a variety of resources, from cloud machines to supercomputers, can be added into the available
resource pool. Much work remains but the gist of it can be seen on http://cloudve.org website.

## Storage
Expanding the storage available to a Galaxy account is a critical piece of infrastructure required to enable
large analyses. The ultimate idea is to be able to seamlessly link external data repositories and object stores
while the data is automatically retrieved by Galaxy. In the meantime, starting with Galaxy 19.01, it is possible
to easily retrieve private data from an AWS S3 bucket as well as send it back. A first significant step in eluding
the storage quotas.

## Authentication and Authorization
Acquiring a variety of resources from different providers and owners requires a significant investment into 
authentication and authorization aspects. Our [CloudAuthz](https://github.com/galaxyproject/cloudauthz) 
library and partnership on the [NSF Custos project](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1840003)
are ongoing efforts to make resource connectivity as secure yet simple as possible.

## Contact
If you are interested in any of the above topics, it is best to get in touch with us via a public Gitter channel
available at https://gitter.im/galaxyproject/FederatedGalaxy.
