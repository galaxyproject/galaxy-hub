---
date: '2019-05-30'
title: "Enabling cloud bursting for Galaxy"
authors: "Enis Afgan and Nuwan Goonasekera"
tease: "Expand your compute horizons."
image: "/src/blog/2019-05-gcr/gcr.png"
highlight: true
---

Did you ever feel the need for speed, as in more compute capacity on your Galaxy
instance? There are just some days when the local capacity does not cut it and
offloading some compute jobs would be nice. In this post, we'll take a look at
how to use a new package, called GalaxyCloudRunner, that streamlines the process
of setting up additional compute machines for your Galaxy instance and allows
user jobs to be sent to those remote machines. This allows you to, for example,
use your laptop for text manipulation steps, but then offload the more compute
intensive jobs to a remote machine. Another example may be to add additional
resources to a cluster during a workshop training session.

The [GalaxyCloudRunner](https://gcr.cloudve.org) provides a set of configurable
dynamic job rules for Galaxy that can be used to route user jobs.
GalaxyCloudRunner leverages [Pulsar](https://pulsar.readthedocs.io/), Galaxy's
remote job runner, and [CloudLaunch](https://launch.usegalaxy.org/) - an
application for creating remote machines and configuring applications on them.
Together, GalaxyCloudRunner, Pulsar, and CloudLaunch allow virtual machines to
be dynamically created on any of the four most popular cloud providers: Amazon
Web Services (AWS), Google Cloud Platform (GCP), Microsoft Azure, and OpenStack.
The VMs are automatically configured to start accepting jobs from your Galaxy
instance, and user jobs are routed to them following desired rules.

# Let's get started
To make use of the GalaxyCloudRunner in a Galaxy instance you need to be a
system administrator of the given Galaxy server and perform the following steps:

1. Configure Galaxy to use GalaxyCloudRunner job destination rules
2. Launch as many worker nodes as you need through
   [CloudLaunch](https://launch.usegalaxy.org/catalog/appliance/pulsar-standalone)
3. Submit jobs as usual

## 1. Update the job rules
In this step, we need to edit Galaxy's `job_conf.xml` and make it use the
GalaxyCloudRunner rules. There are a number of rules available so you can
probably experiment with some options over time to determine what makes most
sense for your needs, but in principle, this step needs to be performed only
once. The _default_ rule, which we'll use here, routes all jobs to
GalaxyCloudRunner workers. If a job fails or no workers are available, the job
will be automatically resubmitted to a desired location. In the example below,
this is just the `local` job runner but any other destination can be supplied.
To see the other available rules, check out the documentation page:
http://gcr.cloudve.org/en/latest/topics/configure_galaxy.html. Also, note that
the instructions we're following here apply to Galaxy versions 19.01 or later.
See the documentation if you're running an older version of Galaxy.

To enable this rule, edit `config/job_conf.xml` and add the content between the
comments:
```
<?xml version="1.0"?>
<job_conf>
    <plugins>
        <plugin id="local" type="runner" load="galaxy.jobs.runners.local:LocalJobRunner" workers="4"/>
        <plugin id="pulsar" type="runner" load="galaxy.jobs.runners.pulsar:PulsarRESTJobRunner"/>
    </plugins>
    <!-- Add the following section -->
    <destinations default="galaxycloudrunner">
        <destination id="galaxycloudrunner" runner="dynamic">
            <param id="type">python</param>
            <param id="function">cloudlaunch_pulsar_burst</param>
            <param id="rules_module">galaxycloudrunner.rules</param>
            <param id="cloudlaunch_api_endpoint">https://launch.usegalaxy.org/cloudlaunch/api/v1</param>
            <!-- Obtain your CloudLaunch token by visiting: https://launch.usegalaxy.org/profile -->
            <param id="cloudlaunch_api_token">37c46c89bcbea797bc7cd76fee10932d2c6a2389</param>
            <!-- id of the PulsarRESTJobRunner plugin. Defaults to "pulsar" -->
            <param id="pulsar_runner_id">pulsar</param>
            <!-- Destination to fallback to if no nodes are available -->
            <param id="fallback_destination_id">local</param>
            <!-- Pick next available server and resubmit if an unknown error occurs -->
            <resubmit condition="unknown_error and attempt &lt;= 3" destination="galaxycloudrunner" />
        </destination>
        <!-- End of GalaxyCloudRunner destination definition -->
        <destination id="local" runner="local"/>
    </destinations>
    <tools>
        <tool id="upload1" destination="local"/>
    </tools>
</job_conf>
```

One extra step here is to update the CloudLaunch API key in the above
configuration. Do so by visiting the "My Profile" page on CloudLaunch:
https://launch.usegalaxy.org/profile and obtaining an API token:

<div class="center"><a href="http://gcr.cloudve.org/en/latest/_images/cloudlaunch_view_api_key.png">
    <img src="http://gcr.cloudve.org/en/latest/_images/cloudlaunch_view_api_key.png"
     alt="CloudLaunch key" width="50%" />
</a></div>

Finally, restart your Galaxy process.

## 2. Add workers
Now, whenever you’d like to add more capacity to your Galaxy instance, head
over to the Cloud Bursting appliance on CloudLaunch:
https://launch.usegalaxy.org/catalog/appliance/pulsar-standalone and launch
as many machines as you'd like. After the machine(s) come up, usually 3-5
minutes, Galaxy will automatically discover them by querying CloudLaunch
and route jobs to them based on the supplied rules. When you no longer need the extra
capacity, just delete the machines from CloudLaunch.

In the following screenshots, we're using the Google Cloud Platform to add a
machine. Note that you can also mix which providers you use for your workers.

<div class="center"><a href="/src/blog/2019-05-gcr/cloudlaunch.png">
    <img src="/src/blog/2019-05-gcr/cloudlaunch.png"
     alt="Running instance" width="80%" />
</a></div>

## 3. Submit jobs
From the user standpoint, the experience of using Galaxy is no different: jobs
are submitted as normal and, based on the rules and available resource capacity,
Galaxy submits the jobs to the available resources. In the background, Pulsar
will handle tool installation and data staging for inputs and outputs so all
data ultimately ends up at your Galaxy instance. In the following screenshot,
a job submitted on a local laptop was sent to a remote GalaxyCloudRunner
instance running on GCP where Pulsar automatically installs the necessary tools
via Conda and runs the job via an embedded Slurm job manager.

<div class="center"><a href="/src/blog/2019-05-gcr/job-run.png">
    <img src="/src/blog/2019-05-gcr/job-run.png" alt="Launch page 1" width="80%" />
</a></div>

# Caveats, known issues, and future directions
While, for a large number of tools, the above setup will work nicely, there are
situations and requirements that may not work. We've summarized the known limitations
in the GalaxyCloudRunner documentation:
http://gcr.cloudve.org/en/latest/topics/additional_notes.html

One topic that is not explicitly discussed there is the use of a small Galaxy
instance running on a laptop and bursting to cloud machines. This is a
great use case but keep in mind that in order for everything to work, the local
instance will need to have the necessary tools and reference data installed.

Finally, this is the first released version of GalaxyCloudRunner so please feel
free to give it a try, [reach
out](https://gitter.im/galaxyproject/FederatedGalaxy), and let us know what
works and what doesn't. As [CloudMan 2.0 is
developed](https://github.com/galaxyproject/cloudman/tree/v2.0), we will be
adding automatic scaling to the launched instances and better resource
monitoring. As [Pulsar is developed](https://github.com/galaxyproject/pulsar),
data staging and transfers will improve. Also, don't hesitate to jump in and
start hacking away to make it better:
https://github.com/CloudVE/galaxycloudrunner!
