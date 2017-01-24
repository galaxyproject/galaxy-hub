# Galaxy Object Store

Galaxy has a layer between the front end and disk files called the Object Store. It allows Galaxy installations to make use of data living in more than simply a single filesystem of locally mounted disk - there are backends for a distributed store (many locally accessible filesystems) or Amazon S3. 

Configuration is trivial via the Galaxy config file. See the object_store option and those following it.

```
# -- Data Storage (Object Store)
#
# Configuration file for the object store
# If this is set and exists, it overrides any other objectstore settings.
# object_store_config_file = config/object_store_conf.xml

# Object store backend module (valid options are: disk, s3, swift, irods,
# distributed, hierarchical)
#object_store = disk

# *Extremely* old Galaxy instances created datasets at the root of the
# `file_path` defined above.  If your Galaxy instance has datasets at the root
# (instead of in directories composed by hashing the dataset id), you should
# enable this option to allow Galaxy to find them.
#object_store_check_old_style = False

# Credentials used by certain (s3, swift) object store backends
#os_access_key = <your cloud object store access key>
#os_secret_key = <your cloud object store secret key>
#os_bucket_name = <name of an existing object store bucket or container>

# If using 'swift' object store, you must specify the following connection
# properties
#os_host = swift.rc.nectar.org.au
#os_port = 8888
#os_is_secure = False
#os_conn_path = /

# If using 'azure_blob' object store, you must specify the following:
#azure_account_name = <your storage account name>
#azure_account_key = <your storage account's access key (ending in ==)>
#azure_container_name = <the name of the blob container in your storage account>

# Reduced redundancy can be used only with the 's3' object store
#os_use_reduced_redundancy = False

# Path to cache directory for object store backends that utilize a cache (s3,
# swift, irods)
#object_store_cache_path = database/files/

# Size (in GB) that the cache used by object store should be limited to.
# If the value is not specified, the cache size will be limited only by the
# file system size.
#object_store_cache_size = 100

# Configuration file for the distributed object store, if object_store =
# distributed.  See the sample at distributed_object_store_conf.xml.sample
#distributed_object_store_config_file = None
```


* Object Store API documentation: http://galaxy.readthedocs.org/en/stable/lib/galaxy.objectstore.html

