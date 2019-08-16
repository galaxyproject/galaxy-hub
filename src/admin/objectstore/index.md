---
title: Galaxy ObjectStore
highlight: true
---

ObjectStore is Galaxy's data virtualization technology; it abstracts 
Galaxy's business logic for data persistence technology and topology. 
In other words, the ObjectStore makes it possible to store data on a 
wide-variety of persistence media spanning from a local storage to 
cloud-based solutions and define any data distribution policy, without 
altering Galaxy's model, functions, api, or any component of its 
business logic in general. 


The ObjectStore allows a Galaxy installation to make use of data 
living in more than simply a single filesystem of locally mounted disk.
Accordingly, ObjectStore enables Galaxy admins to _plug_ additional 
persistence media to an existing file system, which facilitates 
expanding a mounted filesystem (e.g., when it has ran out of space) without 
having to move data. Additionally, ObjectStore enables replicating 
data onto multiple persistence media, which increases Galaxy's data
access fault-tolerance, in case any of the media becomes inaccessible.


> Note that ObjectStore is configurable by a Galaxy admin, and data
belonging to all the users of that Galaxy instance will be stored
on the defined persistence media. 


Related publications and presentations:
- [Jalili, V., et al. "Cloud Bursting Galaxy: Federated Identity and Access Management."](https://www.biorxiv.org/node/149950.abstract);
- [Afgan, E., et al. "Federated Galaxy: Biomedical Computing at the Frontier." IEEE CLOUD 2018](http://doi.ieeecomputersociety.org/10.1109/CLOUD.2018.00124);
- [Jalili, V., et al. "Storage Media Federation for Galaxy." GCCBOSC 2018](https://vimeo.com/291738189);

## Galaxy ObjectStore Backends

A backend is any persistence media that ObjectStore can be configured 
to read/write from/to. The following is a list of backends that 
ObjectStore currently supports:

- Local storage (e.g., disk);
- Network attached storage (NAS);
- Cloud
    - Amazon Simple Storage Service (S3);
    - Google Cloud Storage ([config](/src/admin/objectstore/gce/index.md));
    - Microsoft Azure BLOB Storage;
    - OpenStack Object Storage (Swift)
- integrated Rule-Oriented Data Store (iRODS)


## ObjectStore Configuration

In order to configure ObjectStore you may take the following steps:
 
1. Set the path to ObjectStore configuration file in `config/galaxy.yml` 
(not to be mistaken with `config/galaxy.yml.sample`) as the 
following.

    ```
    # Configuration file for the object store If this is set and exists,
    # it overrides any other objectstore settings.
    object_store_config_file: config/object_store_conf.xml
    ```
    
2. Create the `config/object_store_conf.xml` file (you may 
use `config/object_store_conf.xml.sample` as template/reference), and 
set it as the following: 

    ```xml
    <?xml version="1.0"?>
    <object_store type="...">
        <!-- Backend-specific setters.  -->
    </object_store>
    ```
    
    where the `type` attribute can have any of the following values:
    
    ```
    {cloud, disk, distributed, hierarchical, azure_blob, s3, swift, irods, pithos}
    ```  
    
    For instance, the following configuration defines a single `disk` storage:
     
    ```xml
    <?xml version="1.0"?>
    <object_store type="disk">
       <files_dir path="database/files"/>
       <extra_dir type="temp" path="database/tmp"/>
       <extra_dir type="job_work" path="database/job_working_directory"/>
    </object_store>
    ```
    
    For backend-specific configuration, see [ObjectStore Backends section](#galaxy-objectstore-backends).
    
3. Restart Galaxy for changes to take place.

## Data Distribution Methods

A Galaxy admin can set ObjectStore to leverage either a single 
backend, or define a nested relation between multiple backends.
To use a single backend, provide the backend-specific configuration
(e.g., similar to the above `disk` example), and Galaxy will always
read/write to that backend. 


In order to define a nested relation of multiple backends, you may
use `hierarchical` or `distributed` backends. The following table 
captures the difference between the `hierarchical` and `distributed` 
backends:

  
|              | Where data is read from?        | Where data is written to?        |
| :----------- | :------------------------------ | :------------------------------- |
| Hierarchical | first backend where data exists | always the first backend         |
| Distributed  | first backend where data exists | pseudo-randomly selected backend |
 

For instance, using the following configuration, ObjectStore always 
writes data on S3, but retrieves data from the first backend where 
the data exists. 

```xml
<?xml version="1.0"?>
<object_store type="hierarchical">
    <backends>
        <object_store type="cloud" provider="aws" order="0">
            <auth access_key="..." secret_key="..." />
            <bucket name="..." use_reduced_redundancy="False" />
            <cache path="database/object_store_cache" size="100" />
            <extra_dir type="job_work" path="database/job_working_directory_s3"/>
            <extra_dir type="temp" path="database/tmp_s3"/>
        </object_store>
        <object_store type="disk" id="secondary" order="1">
            <files_dir path="database/files"/>
            <extra_dir type="temp" path="database/tmp"/>
            <extra_dir type="job_work" path="database/job_working_directory"/>
        </object_store>
    </backends>
</object_store>
```

This configuration is useful when you have been using a backend for a while, 
then you decide to "extend" it by adding a new backend, **but without having to 
move data from previous backend to the new backend**. For instance, you been 
using `disk` for a while, but now you have ran out of space on `disk`, so you 
decided to add an S3 bucket; you would like to do so by (a) keeping the existing 
data on `disk` as they are, and still be able to use them for any job/workflow 
execution, and (b) you would like any new data to be persisted on S3.
This is the scenario for which the `hierarchical` ObjectStore is defined for, 
as it will always persist new data on S3, and can look for data on both S3 and 
`disk` (where it will find data created prior to adding S3).


On the other hand, the `distributed` ObjectStore pseudo-randomly selects a 
backend to which it should persist data. (The pseudo-random selection is based on 
admin-specified weights for backends.) For instance:

```xml
<?xml version="1.0"?>
<object_store type="distributed">
    <backends>
        <backend id="files1" type="disk" weight="99">
            <files_dir path="database/files1"/>
            <extra_dir type="temp" path="database/tmp1"/>
            <extra_dir type="job_work" path="database/job_working_directory1"/>
        </backend>
        <backend id="files2" type="disk" weight="1">
            <files_dir path="database/files2"/>
            <extra_dir type="temp" path="database/tmp2"/>
            <extra_dir type="job_work" path="database/job_working_directory2"/>
        </backend>
    </backends>
</object_store>
```

Using this configuration, ObjectStore randomly distributes data
between `database/files1` and `database/files2`, with `0.99` and
`0.01` probability selecting the former and latter respectively.


Additionally, you can define any nested relation of the backends,
for instance:

```xml
<?xml version="1.0"?>
<object_store type="hierarchical">
    <backends>
        <object_store type="distributed" id="primary" order="0">
            <backends>
                <backend id="files1" type="disk" weight="1">
                    <files_dir path="database/files1"/>
                    <extra_dir type="temp" path="database/tmp1"/>
                    <extra_dir type="job_work" path="database/job_working_directory1"/>
                </backend>
                <backend id="files2" type="disk" weight="1">
                    <files_dir path="database/files2"/>
                    <extra_dir type="temp" path="database/tmp2"/>
                    <extra_dir type="job_work" path="database/job_working_directory2"/>
                </backend>
            </backends>
        </object_store>
        <object_store type="disk" id="secondary" order="1">
            <files_dir path="database/files3"/>
            <extra_dir type="temp" path="database/tmp3"/>
            <extra_dir type="job_work" path="database/job_working_directory3"/>
        </object_store>
    </backends>
</object_store>
```
