# GALAXY_SLOTS (for tool developers)

GALAXY_SLOTS is a special environment variable that is passed to tool wrappers. If the tool you are working on allows configuring the number of processes or threads that should be spawned, use \${GALAXY_SLOTS:-Z} instead of a fixed value (Z being an integer representing a default value in non-Galaxy contexts). The backslash here is because this value is interpreted at runtime as environment variable - not during command building time as a templated value. This allows server administrators to configure how many processes the tool should be allowed to use.

# GALAXY_SLOTS (for server admins)

How you configure GALAXY_SLOTS depends on the cluster system being used. More about the subject on the [supported cluster systems page](/Admin/Config/Performance/Cluster).

In all cases you need to include a parameter on your job_conf.xml that specifies the number of processes to be used for a given destination. If correctly defined your should see your GALAXY_SLOTS variable contain the specified value.

To help debug the issue and ensure your configuration is correct you can use [this tool or a variation of it](https://gist.github.com/jmchilton/9548516) to verify the cluster environment and the state of some of the relevant variables.

For information on how GALAXY_SLOTS is defined on most cluster systems, please refer to the file [lib/galaxy/jobs/runners/util/job_script/CLUSTER_SLOTS_STATEMENT.sh](https://bitbucket.org/galaxy/galaxy-dist/src/stable/lib/galaxy/jobs/runners/util/job_script/CLUSTER_SLOTS_STATEMENT.sh). If it doesn't seem to work for your platform - it may not actually be supported yet - let the Galaxy development mailing list know how to modify that file to support it.
