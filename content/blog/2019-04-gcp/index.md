---
date: '2019-04-15'
title: "Building up support for the Google Cloud Platform in Galaxy"
authors: "Enis Afgan and Vahid Jalili"
tease: "Get on the cloud, Google Cloud!"
image: "/src/blog/2019-04-gcp/ggcp.png"
highlight: true
---

The Galaxy project has long embraced support and integration with cloud
computing providers in its ecosystem. With the recent
[release of CloudBridge library v2](https://galaxyproject.org/news/2019-03-cloudbridge-v2/),
in collaboration with Google engineers, CloudBridge added support
for the Google Cloud Platform (GCP), rounding off the integration with the four
most popular IaaS cloud providers: AWS, Azure, GCP, and OpenStack. The
CloudBridge library abstracts differences between multiple
Infrastructure-as-a-Service (IaaS) cloud providers and supplies a consistent
interface that applications can rely on. Galaxy has adopted CloudBridge as the
primary means of interfacing with the multiple clouds.

In this post, we showcase a couple of early features that are now available on
GCP  from within the Galaxy ecosystem as enabled by the new release of the
CloudBridge library. Namely, it is now possible to utilize GCP resources to
store Galaxy’s user data in a Google Cloud Storage bucket, and to launch
transient Galaxy instances on a Google Compute Engine (GCE) virtual machine.

The aforementioned features showcase the usability of the new implementation for
GCP but the significance and potential of this upgrade will really become
apparent in the coming months. Work is currently being done on CloudMan 2.0,
which will enable automated deployment and management of production-grade Galaxy
instances; best-practice deployment protocols will be captured in a reproducible
process allowing Galaxy with all its dependencies and requirements (e.g.,
database, FTP, multiple processes, etc.) to be launched in a matter of a few
minutes, on any compatible provider. This will include non-cloud providers as
well. Once launched, CloudMan will offer web and API-driven management
capabilities, including Galaxy configuration changes, persistence,
infrastructure and process scaling, zero-downtime rolling restarts, a controlled
upgrade path, and more. For the cloud providers, because of the abstraction that
was implemented into CloudBridge, all of the planned features will be available
without requiring downstream code changes or cloud-specific customizations.


## Using Google Cloud Storage buckets for user data

Galaxy abstracts datasets from their corresponding persisted files via its data
virtualization technology, named [ObjectStore](https://galaxyproject.org/admin/objectstore/).
It allows Galaxy to operate on datasets regardless of the access mechanism of
their persistence media (e.g., a local disk, a network attached storage, or a
cloud-based bucket), hence making Galaxy’s data management model (e.g., data
access, and sharing) agnostic from the persistence media.

The ObjectStore delivers this promise by implementing a backend for each media,
and exposing them via a common interface. It currently implements backends for
local storage, network attached storage, and cloud-based storage. The
cloud-based backend had a support for AWS S3 and Azure BLOB storage, and we
added a built-in support for [Google Cloud Storage (GCS)](https://galaxyproject.org/admin/objectstore/gce/)
with the release of CloudBridge v2.0. Accordingly, we have enabled Galaxy to
persist user’s analysis results on a single GCS bucket, or distributed across
multiple buckets, which in addition to better scalability, improves data
accessibility.

To set up Galaxy to persist data in your GCP bucket(s), first you would need to
obtain your GCP credentials (we have thoroughly documented it
[here](https://galaxyproject.org/admin/objectstore/gce/#create-a-service-account)),
and then use them to configure a GCP backend for ObjectStore (documented
[here](https://galaxyproject.org/admin/objectstore/gce/#step-22-configure-galaxy-objectstore)).
You can do so by adding the following block to the ObjectStore configuration file.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<object_store type="cloud" provider="google">
   <auth credentials_file="/Users/vahid/Downloads/CloudBridge-dev-a65cbdd7a3a3.json" />
   <bucket name="galaxy-test" use_reduced_redundancy="False" />
   <cache path="database/object_store_cache" size="1000" />
   <extra_dir type="job_work" path="database/job_working_directory_gce" />
   <extra_dir type="temp" path="database/tmp_gce" />
</object_store>
```

Having restarted Galaxy, ObjectStore will persist all the new datasets on the
given GCS bucket. For instance, in the following figure we show uploading a new
dataset to Galaxy.

<a href="/src/blog/2019-04-gcp/os1.png">
    <img class="float-left" src="/src/blog/2019-04-gcp/os1.png" alt="Galaxy data upload" width="48%" />
</a>
<a href="/src/blog/2019-04-gcp/os2.png">
    <img class="float-right" src="/src/blog/2019-04-gcp/os2.png" alt="Galaxy data" width="48%" />
</a>

The uploaded dataset is persisted on the given GCS bucket, as shown in the
following figure.

<div class="center"><a href="/src/blog/2019-04-gcp/os3.png">
    <img src="/src/blog/2019-04-gcp/os3.png" alt="Galaxy data" width="50%" />
</a></div>


## Launching Galaxy instances on GCP

A second feature we would like to describe in this post is the ability to launch
transient instances of Galaxy on GCP. In general, cloud instances are
particularly useful for workshop training purposes, wanting to avoid a queue on
a public server, or testing a new tool. To get started, we use CloudLaunch as a
portal for launching servers on cloud providers. Head over to
https://launch.usegalaxy.org/ and select CloudMan 2.0 appliance from the list.
The CloudMan 2.0 appliance is currently a placeholder for launching the
containerized version of Galaxy that was described above.

<div class="center"><a href="/src/blog/2019-04-gcp/cl1.png">
    <img class="center" src="/src/blog/2019-04-gcp/cl1.png" alt="CloudLaunch landing" width="50%" />
</a></div>

Follow the launch wizard to create your new instance. If you do not already have
the required Google cloud credentials, check out the documentation here:
https://www.galaxyproject.org/admin/objectstore/gce/#create-a-service-account.

<a href="/src/blog/2019-04-gcp/cl2.png">
    <img class="float-left" src="/src/blog/2019-04-gcp/cl2.png" alt="CloudLaunch wizard 1" width="48%" />
</a>
<a href="/src/blog/2019-04-gcp/cl3.png">
    <img class="float-right" src="/src/blog/2019-04-gcp/cl3.png" alt="CloudLaunch wizard 2" width="48%" />
</a>

The launch process will take close to 20 minutes (we’re working on it!) and once
it completes, you will have access to a personal Galaxy instance. To access it,
follow the supplied access link in CloudLaunch. This link will take you to the
CloudMan management interface where you’ll need to login using admin as the
username and the password you supplied in CloudLaunch. From there, you can
observe the status of the machine and, after a few more minutes, access Galaxy
to use it for some of the task suggested above.

<a href="/src/blog/2019-04-gcp/cl4.png">
    <img class="float-left" src="/src/blog/2019-04-gcp/cl4.png" alt="CloudMan status" width="48%" />
</a>
<a href="/src/blog/2019-04-gcp/cl5.png">
    <img class="float-right" src="/src/blog/2019-04-gcp/cl5.png" alt="Galaxy CloudMan" width="48%" />
</a>

As a preview of the CloudMan 2.0 features, note the ability to visually update
Galaxy configurations directly from CloudMan. Making yourself a Galaxy Admin is
one idea here that translates to the ability to install additional tools in
Galaxy.

<div class="center"><a href="/src/blog/2019-04-gcp/cl6.png">
    <img class="center" src="/src/blog/2019-04-gcp/cl6.png" alt="CloudMan config" width="50%" />
</a></div>

To shut down your instance, head back to CloudLaunch. Under My Appliances page,
you can delete your instance. Keep in mind that for the time being, these
instances are transient, meaning that once shut down they are permanently
deleted. Hence, for the time being, these instances are primarily useful for
one-off data analysis needs that give you an option to use GCP (or other
supported provider).

Work is continuing apace to realize a fully featured integration of Galaxy with
GCP, and other providers. Stay tuned, the
[Galaxy Community Conference 2019](https://gcc2019.sched.com) is just around
the corner!
