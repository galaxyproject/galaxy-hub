# Galaxy Object Store

Galaxy has a layer between the front end and disk files called the Object Store. It allows Galaxy installations to make use of data living in more than simply a single filesystem of locally mounted disk - there are backends for a distributed store (many locally accessible filesystems) or Amazon S3. 

See [the sample object store configuration file](https://github.com/galaxyproject/galaxy/blob/dev/config/object_store_conf.xml.sample)
distributed with Galaxy for a list of available options and backends.

* Object Store API documentation: http://galaxy.readthedocs.org/en/stable/lib/galaxy.objectstore.html
