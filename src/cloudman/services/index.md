{{> CloudMan/Header }}

{{> CloudMan/LinkBoxHorizontal }}

CloudMan manages a set of applications that are referred to as *services*. Some of the services are user-facing applications (e.g., Galaxy) while others are dependencies for other services and are not used by end-users directly (e.g., NodeJSProxy). A complete list of services managed by CloudMan is available on the CloudMan Admin page; that page also allows you to control the state of those services. Below if a list of the available services; if additional information is available about a specific service, it is available by clicking on the service name:
* [Post Start Script (PSS)](/src/cloudman/services/pss/index.md) - a custom script provided via a URL that's run at the end of the server bootstrap process
* [Cloudera Manager](/src/cloudman/services/cloudera-manager/index.md) - an service manager used to deploy Big Data services (e.g., Hadoop)
* [Cloudgene](/src/cloudman/services/cloudgene/index.md) - a graphical user interface application for Hadoop-based workflows
* [Galaxy](/src/cloudman/services/galaxy/index.md) - the flagship service with more information available throughout this wiki; the application is available at the instance root URL/IP
* Nginx - a proxy server used to serve static content and proxy URIs to local service ports
* NodeJSProxy - a NodeJS proxy server used by the IPython Interactive Environment
* Postgres - a dedicated, production-quality database used by Galaxy
* ProFTPd - an FTP server used to upload large files into Galaxy
* [Pulsar](/src/cloudman/services/pulsar/index.md) - a remote job execution engine for Galaxy enabling cloud-bursting
* [Slurmctld](https://computing.llnl.gov/linux/slurm/slurmctld.html) - central management daemon for the Slurm job manager
* [Slurmd](https://computing.llnl.gov/linux/slurm/slurmd.html) - compute node daemon for the Slurm job manager
* Supervisor - [Supervisord](http://supervisord.org/) daemon used to manage select services (e.g., NodeJSProxy)

It is possible to add additional service to CloudMan by implementing a [service interface](https://github.com/galaxyproject/cloudman/blob/master/cm/services/__init__.py#L290) for the given application. [Get in touch with us](https://github.com/galaxyproject/cloudman/issues) if you're interested in adding a new service.
