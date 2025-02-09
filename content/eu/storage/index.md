---
title: Storage Management on the European Galaxy server
---

Storage provides our users freedom to play around with their data and enables exploratory research. But it is also a limited resource for public Galaxy instances.
Thanks to the [de.NBI cloud](https://www.denbi.de/cloud) and the [Uni-Freiburg compute center](https://www.rz.uni-freiburg.de) the European Galaxy server
is managing 3PB of data today (2025/01).
Users do use this storage for free, governments are paying for the freedom of science and against being locked into some commercial system.
Everyone gets a fair share of the storage, on the [EU Galaxy server](https://usegalaxy.eu) those are 250GB for every user, also called `quota`.

This system has served us well for many years. However, different user groups have varying storage needs, and some also contribute financially to the global Galaxy infrastructure. Until now, we have addressed this by generously extending storage quotas upon request via our quota-request form. We remain committed to expanding our storage capacity through future grants.

That said, long-term sustainability is a growing challenge as the number of users increases. To address this, the Galaxy community
has introduced advanced Research Data Management (RDM) features, including:

* [More effective data cleaning tools](#manage-your-storage-and-quota)
* [More efficient data import mechanisms](#smart-data-import)
* [Short-term storage for method development](#short-term-storage)
* [Options for users to integrate their own storage into Galaxy](#user-owned-storage)
* [A co-financing model for research groups in cooperation with our compute centre](#towards-a-sustainable-storage-enabling-co-financing-of-public-infrastructure)
    
----

# Manage your Storage and Quota

On the European Galaxy server every user has a 250GB quota. This means you can use 250GB of storage for free.
Once you reach this limit you cannot start new jobs. [Learn more about quotas.](https://galaxyproject.org/support/account-quotas/)

<div align="center">
    <img src="/images/undraw-illustrations/segment-analysis.svg" alt="Icon that depicts a person that cleans up some data." height="100"/>
</div>

## Data cleaning

* Remove unnecessary intermediated steps, e.g. results from a trimming step. For example, you can search in a history for the output of particular tools (e.g. Trimmomatic)
and then bulk-remove those datasets.
* You can also do that automatically as part of a workflow.
* Visually explore your disk usage by history or by datasets using the [`storage manager`](https://usegalaxy.eu/storage/).
* Download and delete data as [described in GTN](https://training.galaxyproject.org/training-material/topics/galaxy-interface/tutorials/download-delete-data/tutorial.html)
* Please note that `deleted` data is not `deleted permanently` (also called `purged`). It's still in Galaxy. We do this to prevent you from accidentally deleting data. You can undelete data for a few days.
  `deleted` data will be automatically `purged` after one week by our System. Read more about [delete vs. delete-permanently](https://galaxyproject.org/learn/managing-datasets/#delete-vs-delete-permanently).

<div align="center">
    <img src="/images/undraw-illustrations/clean-up.svg" alt="Icon that depicts a person that cleans up some data." height="100"/>
</div>

## Smart data import

A relatively unknown feature in Galaxy is what we call `deferred data`. You can import data as `deferred`, which will not download the data into your history
and therefore not count towards your Quota. `deferred data` will be temporarily downloaded when you do the first calculation on top of it, but it will
not be ingested into Galaxy storage. This feature is especially useful if you have large RAW data that is reduced in size in the first step. Please note that
this feature only works if the data is accessible for Galaxy, e.g. via a URL.

If your RAW data is available on your institutional repository or provided by a core facility you can include those repositories into your Galaxy account as well.
We call those `remote file sources` and you can configure those under your [user settings](https://usegalaxy.eu/file_source_instances/index). Just to give a few examples,
you can include repositories based on Invenio, Dataverse, FTP, Google Drive, DropBox, AWS, S3 and Webdav, which includes NextCloud, OpenCloud, EUDAT B2Drop and many others.

## Export results

* Zenodo, DOI
* https://galaxyproject.org/news/2024-05-03-inveniordm-integration/ is outdated, we need a new blog post and a hint on the old one that points to the new one
* export to public archives, e.g. the [ENA exporter](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/iuc/ena_upload/ena_upload/), Omero ...
* export to any writeable `remote file sources`, which you can configure under your [user settings](https://usegalaxy.eu/file_source_instances/index).

<div align="center">
    <img src="/images/undraw-illustrations/export-files.svg" alt="Icon that depicts a person that exports some data." height="100"/>
</div>

-----

# Storage classes

<!-- Color palette: https://www.color-hex.com/color-palette/9983 -->
<!-- Projects/Communities/Citation/Team cards -->

<div class="card-deck">
  <div class="card border-secondary bg-light mb-1 mx-1" style="width: 18rem">
    <div class="card-body">
      <h3 class="card-title text-dark" style="text-align: center;">Long term</h3>
      <p class="card-text">250GB of quota, you are responsible for data cleaning. This data can be shared.</p>
      <div class="text-center">
          <img src="/images/undraw-illustrations/projects.svg" alt="projects" height="100">
          <br><br>
      </div>
    </div>
  </div>
  <div class="card border-secondary bg-light mb-1 mx-1" style="width: 18rem">
    <div class="card-body">
      <h3 class="card-title text-dark" style="text-align: center;">Short term</h3>
      <p class="card-text">Unlimited quota, data older than 30 days will be deleted. This data can be shared.</p>
      <div class="text-center">
        <img src="/images/undraw-illustrations/throw-away.svg" alt="Icon that depicts a person that throws away some data." height="100"/>
        <br/><br/>
      </div>
    </div>
  </div>
  <div class="card border-secondary bg-light mb-1 mx-1" style="width: 18rem;">
    <div class="card-body">
      <h3 class="card-title text-dark" style="text-align: center;">Unshareable</h3>
      <p class="card-text">Belongs to your 250GB quota, data on this storage cannot be shared.</p>
      <br><br>
      <div class="text-center">
        <img src="/images/undraw-illustrations/safe.svg" alt="Icon that depicts safe data." height="100"/>
        <br><br>
      </div>
    </div>
  </div>
  <div class="card border-secondary bg-light mb-1 ml-1 mr-3" style="width: 18rem">
    <div class="card-body">
      <h3 class="card-title text-dark" style="text-align: center;">User Owned</h3>
      <p class="card-text">Include your own Storage into Galaxy</p>
      <br><br>
      <div class="text-center">
        <img src="/images/undraw-illustrations/personal-data.svg" alt="team" height="100"/>
        <br/><br/>
      </div>
    </div>
  </div>
</div>

## Long term storage

POSIX/NFS-based storage maintained by the compute center of the University of Freiburg.
In contrast to the `Short term storage` we will not delete data on this storage. You need to clean up your data to stay below your quota of 250GB.


## Short term storage

S3-based object storage is maintained by the compute center of the University of Freiburg.
This storage, also called scratch-storage, is `purged monthly` and so it is only appropriate for short-term methods development and such.
The rapid deletion of stored data enables us to provide this storage without a quota. This storage is not backed up.

⚠️ To enable exploratory data analysis we do allow sharing of data in this short-term storage, but please be aware that if we delete old data,
this might confuse your collaboration partner.

<div align="center">
    <img src="/images/undraw-illustrations/throw-away.svg" alt="Icon that depicts a person that throws away some data." height="100"/>
</div>

## Unshareable storage

S3-based object storage is maintained by the compute center of the University of Freiburg.
Data on this storage cannot be used for public datasets, cannot be shared between users, etc..
All your data in Galaxy is by default only available to you and can not be seen by other users. However, you can always share data, and histories with others.
This storage prevents sharing and provides an additional safeguard to you and your data. 
The data on this storage is counted to the same quota as the `Long-term storage`.

<div align="center">
    <img src="/images/undraw-illustrations/safe.svg" alt="Icon that depicts safe data." height="100"/>
</div>

### User Owned storage

Every user can [include their own storage](https://usegalaxy.eu/object_store_instances/index).
If your Institute provides you with S3, iRODS, OneData ... this option is for you. Because Galaxy
is not managing this storage, there will be no quota assigned, but the limit of your storage applies 😎

Once you have registered your storage in Galaxy you can run tools are workflows against it. You can set a history to default to this storage or you can set it as global 
default storage to your account.

<div align="center">
    <img src="/images/undraw-illustrations/personal-data.svg" alt="team" height="100"/>
</div>
----

# Towards a sustainable storage, enabling co-financing of public infrastructure

TLDR; Research groups and networks can include their own storage into the Europan Galaxy server and decide about quota and data policies.

<div align="center">
    <img src="/images/undraw-illustrations/growth-chart.svg" alt="team" height="100"/>
</div>

We have enabled an additional strategy that makes it possible to include storage provided by partner consortia in a very transparent way
into the European Galaxy Server to increase the quota to all consortia members.

Demonstrator: The [NFDI](https://www.nfdi.de) (National Research Data Infrastructure) is building RDM communities in Germany and one of them
is [DataPLANT](https://nfdi4plants.org). DataPLANT has access to the [bwSFS](https://www.alwr-bw.de/bwsfs/), a state-funded storage for scientists
and in this case in particular for fundamental plant research. In cooperation with DataPLANT we have included part of this storage into
Galaxy and have configured Galaxy to store data from users associated with DataPLANT on this particular storage only.
This enables DataPLANT now to decide about their preferred quota limits, and the level of data backup policies and fosters the participation of NFDI with the Galaxy project.

The system is very flexible and we could enable research networks, like CRCs, in the same way, to participate in the European Galaxy project and offer
sustainable storage solutions for their researchers. It is to be noted that this covers the technical aspect of storage infrastructure but is only a small aspect of
RDM - for which NFDI and Galaxy provide additional solutions. Please get in contact with us if you want to learn more about [RDM](https://rdmkit.elixir-europe.org/galaxy_assembly).

----

# Request larger Quotas for your project

With our [quota-increase form](https://usegalaxy.eu/quota-increase), you can request a temporary extension of your user quota in UseGalaxy.eu.

Since UseGalaxy.eu is a public service that we provide for free, we request you to be responsible and fair when using the shared resources.

Before you request an additional quota, please make sure that:
- You are processing your data in batches.
- You are following our tips to clean up your account
- None of the above options is working for you.

Please bear in mind that the change will be only effective after being granted, which can take a few working days.
After the requested extension period ends, your quota will be back to the standard 250 GB. Your data won't be removed, but you won't be able to launch any jobs
in Galaxy until you free up space and are again under 250 GB.


<!-- we need to update the  policy, as soon as we have the new scratch in place -->
<slot name="/eu/common/data-policy" />

