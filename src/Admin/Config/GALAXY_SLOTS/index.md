# GALAXY_SLOTS (for tool developers)

See the Planemo [documentation](http://planemo.readthedocs.org/en/latest/writing_advanced.html#cluster-usage) for information about developing multi-threaded tool wrappers using GALAXY_SLOTS.

# GALAXY_SLOTS (for server admins)

How you configure GALAXY_SLOTS depends on the cluster system being used. More about the subject on the [supported cluster systems page](/Admin/Config/Performance/Cluster).

In all cases you need to include a parameter on your job_conf.xml that specifies the number of processes to be used for a given destination. If correctly defined your should see your GALAXY_SLOTS variable contain the specified value.

To help debug the issue and ensure your configuration is correct you can use [this tool or a variation of it](https://gist.github.com/jmchilton/9548516) to verify the cluster environment and the state of some of the relevant variables.

For information on how GALAXY_SLOTS is defined on most cluster systems, please refer to the file [lib/galaxy/jobs/runners/util/job_script/CLUSTER_SLOTS_STATEMENT.sh](https://github.com/galaxyproject/galaxy/blob/dev/lib/galaxy/jobs/runners/util/job_script/CLUSTER_SLOTS_STATEMENT.sh). If it doesn't seem to work for your platform - it may not actually be supported yet - let the Galaxy development mailing list know how to modify that file to support it.
