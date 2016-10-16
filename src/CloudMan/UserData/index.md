PLACEHOLDER_INCLUDE(/CloudMan/Header)

PLACEHOLDER_INCLUDE(/CloudMan/LinkBox)

### CloudMan User Data Fields
[CloudMan](/CloudMan) supports the notion of User Data when instantiating an instance. User Data allows individual instances of CloudMan to be customized for a given user. Some of the User Data fields are required while others allow further customization of one's instance. This page describes the available User Data fields. User Data is specified at the time of instance request in [YAML format](http://en.wikipedia.org/wiki/YAML), for example:
```bash
cluster_name: <DESIRED CLUSTER NAME>
password: <DESIRED Galaxy CloudMan WEB UI PASSWORD>
access_key: <YOUR AWS ACCESS KEY>
secret_key: <YOUR AWS SECRET KEY>
```
 

#### Required User Data Fields

| Key |  Value  | 
| --- | ------ | 
| `cluster_name` |  specifies the name of the current cluster. Each time this same cluster needs to be instantiated, the same cluster name must be used.  | 
| `password` |  a password that restricts access to the CloudMan web interface. If this field did not exist, anyone could control your cluster.  | 
| `access_key` |  your AWS access key, available from the [AWS account information page](http://aws.amazon.com/). This is required because CloudMan automates the process of composition of infrastructural components, for what account information is required.  | 
| `secret_key` |  your AWS secret key that matches the provided access key, also available from the AWS account page.  | 

#### Optional User Data Fields

| Key |  Value  | 
| --- | ------ | 
| `bucket_default` |  specifies an S3 bucket other that the default one (i.e., cloudman). The default bucket is used to obtain required files if given cluster's bucket does not exist or if a required file does not exist within the cluster's bucket. This is a required field if an instance of CloudMan is being invoked in AWS regions other than US-east (e.g., for AP-Southeast region, use: *bucket_default: cloudman-ap*)   | 
| `bucket_cluster` |  specifies a cluster bucket other than the default one. The default cluster bucket is determined as a hash based on the value of access key and cluster name.   | 
| `role` |  Specify role of the given instance. *master* and *worker* values are supported but this should never be specified by hand.  | 
| `cloudman_home` |  specifies the system file path where CloudMan will be installed. Defaults to */mnt/cm* and should not be changed because some of the code base relies on this path.  | 
| `boot_script_name` |  specifies the name of the boot script that will be looked for in the cluster's bucket and executed as part of the initial instance configuration. Defaults to *cm_boot.py*.  | 
| `post_start_script_url` |  allows specification of an external script that will be executed at the end of the initial instance setup, as the last configuration step the default boot script executes. If provided, this script will be downloaded from the provided URL, executed, and then stored in the cluster's bucket (named *post_start_script*). Then, each time this same cluster is instantiated, the same script will automatically be run even if the field is not provided as part of the initial User Data. If the script needs to be overwritten, simply provide this field as part of User Data; the newly provided script will then be run and the instance in the cluster's bucket updated.   | 
| `worker_post_start_script_url` |  allows specification of an external script that will be executed at the end of the initial instance setup by each worker node. If provided, this script will be downloaded from the provided URL, executed, and then stored in the cluster's bucket (named *worker_post_start_script*). Then, each time this same cluster is instantiated, the same script will automatically be run even if the field is not provided as part of the initial User Data. If the script needs to be overwritten, simply provide this field as part of User Data; the newly provided script will then be run and the instance in the cluster's bucket updated.   | 
| `master_prestart_commands` |  Automatically run any commands provided here before the master starts up. This key element is similar to the *post_start_script_url* element except that exact commands should be provided here (vs. a pointer to a URL) and that these commands will run before CloudMan fully starts. The format for the commands must be as follows:<div class='indent'>`master_prestart_commands:`<br />` - "mkdir -p /mnt/galaxyData/pgsql/"`<br />` - "chown -R galaxy:galaxy /mnt/galaxyData"` </div>  | 
| `galaxy_home` |  specify a path where Galaxy is installed. This allows custom Galaxy application to be installed and picked up by CloudMan instead of the default one. Once set as part of user data, this value is saved in cluster's bucket (in file *persistent_data.yaml*) and used for all future invocations of the cluster, even if no value is provided as part of user data. If a value for this key is provided, the new value overrides any previous values.  | 
| `cloud_type` |  Indicates what type of cloud infrastructure CloudMan is running on. Currently *ec2*, *opennebula*, *openstack*, and *dummy* are the supported values. If no values is provided, the default is *ec2*. Connection information for cloud types other than *ec2* may be customized with the UserData fields *region_endpoint*, *ec2_port*, *ec2_conn_path*, *is_secure*, *s3_host*, *s3_port*, and *s3_conn_path*.  | 
| `cloud_name` |  Provide a name for the given cloud. This is primarily used to properly display the set of available instance types under the 'Add nodes' feature. The default value 'Amazon' is assumed if not provided. Note that for this to function, a mako template with the list of available instance types should be provided (see [this link](https://bitbucket.org/galaxy/cloudman/changeset/b2c0d19fa517#chg-templates/clouds/amazon/instance_types.mako) for an example and placement). This can be done at run time via a post_start_script (see above) or you can contact us to have your cloud descriptor file added into the default distribution.  | 
| `admin_users` |  Automatically add admin users to Galaxy (note that these users will still have to manually register on the given cloud instance). The format for email addresses must be as follows:<div class='indent'>`admin_users:`<br />` - user@example.com`<br />` - user2@anotherexample.edu`</div>  | 
| `galaxy_conf_dir` |  Instructs CloudMan setup and run Galaxy with a configuratioin directory. If set this should be something like */mnt/galaxyTools/galaxy-central/conf.d*. Certain advanced CloudMan features such as *configure_multiple_galaxy_processes* require this to be enabled.  | 
| `configure_multiple_galaxy_processes` |  If set to true, CloudMan will split Galaxy into multiple processes (one to act as a job manager, one or more to serve web content, and one or more to handle jobs). This option requires a *galaxy_conf_dir* to be set. Defaults to *False*.  | 
| `web_thread_count` |  Specifies the number of Galaxy processes CloudMan will setup to serve web content if *configure_multiple_galaxy_processes* is enabled. Defaults to *1*.  | 
| `handler_thread_count` |  Specifies the number of Galaxy processes CloudMan will setup to act as job handlers if *configure_multiple_galaxy_processes* is enabled. Defaults to *1*.  | 
| `reconfigure_nginx` |  If *configure_multiple_galaxy_processes* is enabled, CloudMan will attempt to rewrite the nginx configuration to load balance web traffic over port 80 accross the various web processes. This rewriting can be disabled by setting this property to *False*  | 
| `nginx_conf_contents` |  This option can be a URL to or the base64 encoding of a nginx configuration file to replace the one built into the machine image immediately before CloudMan starts nginx.  | 
| `use_object_store` |  To enable features like restarting a cluster, share strings, etc... CloudMan will write various configuration files out to S3 (or equivalent object store for other Cloud platforms). This behvaior can be disabled by setting this property to *False*. This is an advanced option and disabling these interactions will break certain CloudMan functionality. Defaults to *True*.  | 
| `galaxy_universe_*` |  If *galaxy_conf_dir* is set, any property in Galaxy's config/galaxy.ini app:main section may be overwritten by setting a user data field of this form. For instance, to require logins one could set the user data property *galaxy_universe_require_login* to *true*. See Galaxy's [galaxy.ini.sample](https://github.com/galaxyproject/galaxy/blob/dev/config/galaxy.ini.sample) file for documentation on the available properties.  | 
| `galaxy_tool_runner_*` |  If *galaxy_conf_dir* is set, Galaxy tool runners can be specified via user data fields of this form.  | 
