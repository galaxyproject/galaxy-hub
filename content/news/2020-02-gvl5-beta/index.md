---

date: '2020-02-14'
title: "With Love: The All-new GVL 5.0 (beta)"
authors: "Enis Afgan, Nuwan Goonasekera, Alexandru Mahmoud, Alex Ostrovsky, the GVL and Galaxy teams"
tease: "Now more reliable, with better security, and with new features."
image: "/news/2020-02-gvl5-beta/gvl-logo-landscape-2018.svg"
highlight: true
source_blog: "Galaxy Project Blog"
source_blog_url: "https://galaxyproject.org/blog/2020-02-gvl5-beta/"
---

## tl; dr
We don't want to discourage you from reading the entire document. There is a lot of good material there so this summary is intended more for reference than a replacement. So, keep on reading.

- The GVL 5.0 is a ground-up rewrite of the GVL based on Kubernetes and containerization technologies
- Production grade out of the box, with scalability, zero downtime configuration changes, better security, fully integrated Grafana metrics, containerized tools, as well as near equivalent toolset and reference data to usegalaxy.org
- Easily launchable on 4 cloud providers - Amazon, Google, Jetstream, and NeCTAR, and can be manually installed in other Kubernetes environments
- Launches with auto renewing SSL certificates and cloud DNS support
- Unified authentication through KeyCloak
- API-driven and fully programmable
- Support for partitioning a GVL into multiple, isolated projects is under active development, including support for multiple applications in each project with access control lists

## Intro
Today, we proudly announce the all-new Genomics Virtual Lab (GVL) v5.0 (beta), offering the latest version of Galaxy (20.01), and built on a robust, cloud-native platform. Since 2012, the GVL has made dedicated, production-grade installations of Galaxy available on cloud providers, all via a web browser. The GVL has been used extensively for training workshops, large-scale research studies, and other customized instances when public and shared servers were not suitable.

The 5.0 release marks a new era in the evolution and capabilities of the GVL.
GVL v5.0 is a ground-up rewrite of the platform based on containerization
technologies, primarily [Kubernetes](https://kubernetes.io/), providing a great
boost in reliability, portability, and reproducibility. The GVL also makes a
philosophical departure from its previous incarnations, working towards a
cleaner separation between the roles of the administrator of the GVL and its
end-users, or researchers (see section “Looking Ahead”). Together, the new
platform enables a more robust deployment process, a more reliable Galaxy
service, improved system security, and new user features.

<div class="center"><a href="/news/2020-02-gvl5-beta/gvl-login.png">
    <img src="/news/2020-02-gvl5-beta/gvl-login.png"
     alt="GVL login" width="80%" />
</a></div>

This release was developed through a close collaboration among members of the Galaxy Team and the GVL Team, with contributions from the Galaxy community. If you encounter issues or have suggestions, please create [issues on GitHub](https://github.com/galaxyproject/galaxy-helm/issues) or reach out to us on [Matrix](https://matrix.to/#/#galaxyproject_FederatedGalaxy:gitter.im).

## Availability
Getting access to a GVL instance is accomplished by launching your own instance on a cloud provider. Typically, we would expect a systems administrator to perform the launch and make the system available to the researchers in their group. The launch process, performed in a web browser via [CloudLaunch](https://launch.usegalaxy.org/), takes about 15 to 25 minutes (depending on the Cloud), after which a production-grade Galaxy instance is ready to be used. The entire platform is API driven, so it is now also possible to launch an instance via command line, REST API, or Python API, if you would like to automate the process.

A key feature of the GVL v5.0 is its uniform availability on at least 4 cloud providers, up from just 2 supported by the previous GVL. By combining the [CloudBridge library](http://cloudbridge.cloudve.org/), which provides an abstraction over differences in cloud providers, with software containers, it is now possible to launch an identical version of the GVL on Amazon, Google, Jetstream, and NeCTAR clouds (Azure support is pending). Choosing which provider you want to use is as simple as selecting the appropriate provider from the _Target_ dropdown in CloudLaunch.

<div class="center"><a href="/news/2020-02-gvl5-beta/five-clouds.png">
    <img src="/news/2020-02-gvl5-beta/five-clouds.png"
     alt="Multi-cloud selection" width="80%" />
</a></div>

## Management and Configurability
The GVL v5.0 also comes with an all-new implementation of CloudMan. CloudMan is a cloud resource and application manager. allowing applications to be deployed and configured while it manages the underlying cloud infrastructure. The new implementation is application agnostic, with applications other than Galaxy readily installable via [Helm](https://helm.sh/) (a package manager for Kubernetes applications).

Specifically for Galaxy, CloudMan offers a graphical management interface for Galaxy configuration files. Changing values of `galaxy.yml` or `job_conf.xml` for example can now be accomplished with a visual editor made available within the web browser. Adding new configuration files is also supported. Importantly, all configuration changes are performed with zero-downtime, so when you change a configuration value that requires a process restart, Galaxy will continue to be available and serve user requests during this entire period without users experiencing service disruption. An erroneous configuration can also be rolled back with the click of a button, as all configuration changes are versioned and tracked. Overall, we believe this makes Galaxy administration more accessible while retaining the benefits of a scripted configuration management approach. With this setup, for example, it is possible to manually edit a configuration file without having to setup and use a tool such as Ansible. Meanwhile, Helm will ensure the changes are tracked and can be reversed in case of an undesirable change.

<div class="center"><a href="/news/2020-02-gvl5-beta/cm-galaxy-configs.png">
    <img src="/news/2020-02-gvl5-beta/cm-galaxy-configs.png"
     alt="Visual Galaxy configuration via CloudMan" width="80%" />
</a></div>

Each GVL instance also connects to the [Galaxy Project’s CVMFS](https://galaxyproject.org/admin/reference-data-repo/). This CVMFS is a global, read-only file system that houses over 5TB of indexed reference data, as well as configuration files from [usegalaxy.org](https://usegalaxy.org). The GVL connects to this global CVMFS to deliver the same setup for cloud installations, providing the same breadth of tools as [usegalaxy.org](https://usegalaxy.org). Internal to the GVL, the CVMFS is configured to pre-cache common files in a global cache shared among all nodes in the cluster, further improving system performance.

## Controlled Performance and Monitoring
Since cloud computing became available, the ability to dynamically scale available resources has been a flagship feature. CloudMan allows you to leverage this feature by supporting dynamic cluster scaling to improve the performance of your jobs. Adding a new worker node to expand the capacity in your Galaxy cloud cluster takes only a few minutes and can be accomplished from within the web browser itself. The new nodes are provisioned from the underlying cloud provider and can just as easily be removed when the system load drops.

When should you scale? CloudMan now comes with a customizable status dashboard that monitors system status and allows you to react to the current load. By default, there are two dashboards: a system dashboard and a Galaxy dashboard. The system dashboard provides an overview of system resources, such as CPU and memory usage while the Galaxy dashboard provides insight into Galaxy metrics, such as the number of currently running jobs and distribution of tools used. The dashboard can be customized via [Grafana](https://grafana.com/) so the world is your oyster.

<div class="center"><a href="/news/2020-02-gvl5-beta/cluster-metrics.png">
    <img src="/news/2020-02-gvl5-beta/cluster-metrics.png"
     alt="CloudMan cluster metrics dashboard" width="80%" />
</a></div>

The new GVL can also be stopped overnight when not in use. This allows occasional users to reduce their server costs by stopping the VM overnight, and resuming it in the morning with all the services automatically becoming available within minutes.

## Security
GVL v5.0 also implements improved security practices. The authentication to the instance is predominantly managed via [Keycloak](https://www.keycloak.org/), a dedicated identity and access management service from RedHat that is now bundled with CloudMan. With Keycloak, you, as the administrator of this GVL instance, can create additional users for the system and allow them access to the CloudMan cluster controls only if they need it. Access to Galaxy is also simplified so the same username can be used to login to Galaxy without having to create or enter the password again. Access to Grafana can similarly use the same identity so you do not need to create a separate account for each service. Keycloak can also be easily configured to talk to GitHub, Twitter, Google, or any OpenID or SAML based service, making it easy to integrate institutional logins for the GVL. It additionally offers an option to provide Two-Factor Authentication that may be manually enabled.

It is now possible to launch GVL instances on any supported cloud with an automatically signed SSL certificate so all the traffic to and from the instance is encrypted. The only requirements are you either have cloud DNS available on your cloud, in which case a DNS name can be automatically assigned for you, or you can pre-map a DNS name to the instance IP address yourself. During launch, select the “Cloud DNS” option and assign a domain name, or if your cloud provider does not support it, select the “Manually Specify” option, in which case you must map the DNS to a floating IP yourself before launching the cluster. CloudMan will take care of the rest to setup a valid SSL certificate that will be automatically renewed before it expires.

<div class="center"><a href="/news/2020-02-gvl5-beta/ssl.png">
    <img src="/news/2020-02-gvl5-beta/ssl.png"
     alt="SSL certificate" width="80%" />
</a></div>

Additionally, the passwords for all the running services (eg, database, message queue, Grafana) on the GVL instance are automatically generated for each launch. The passwords are created on the instance as the services are being started and are stored in Kubernetes Secrets. Hence, they never travel across the Internet and the system is self-contained.

Moreover, Galaxy’s k8s job runner facilitates Galaxy’s integration with the underlying platform, allowing the GVL to run Galaxy jobs as isolated Kubernetes pods, separated at the system-level and running trusted containers maintained by the Galaxy community.

## Use Case: GTN Training Tutorials
To ensure proper functioning of the new GVL version, we have tested it using a number of representative Galaxy training tutorials from the Galaxy Training Network. The workflows were executed entirely using Docker containers for tools so they are completely reproducible and require no manual configuration or software installation. Granted, a number of the tutorials required updates to include tool updates or missing containers, implying arbitrary tutorials may not just work without intervention. However, once a tutorial has been validated, it will reliably run on any GVL instance and can be reliably used for future training workshops. If you encounter any issues running tools or workflows, please report them at https://github.com/galaxyproject/galaxy-helm/issues and we’ll do our best to fix them and make the GVL better for everyone!

The tutorials selected for validation were as follows (note that some tutorials still have open PRs with the required updates):

- [Introduction to Genome Assembly](https://training.galaxyproject.org/training-material/topics/assembly/tutorials/general-introduction/tutorial.html)
- [Genome annotation with Prokka](https://training.galaxyproject.org/training-material/topics/genome-annotation/tutorials/annotation-with-prokka/tutorial.html)
- [Unicycler Assembly](https://training.galaxyproject.org/training-material/topics/assembly/tutorials/unicycler-assembly/tutorial.html)
- [De novo transcriptome reconstruction with RNA-Seq](https://training.galaxyproject.org/training-material/topics/transcriptomics/tutorials/de-novo/tutorial.html)
- [Calling variants in non-diploid systems](https://training.galaxyproject.org/training-material/topics/variant-analysis/tutorials/non-dip/tutorial.html)
- [Identification of somatic and germline variants from tumor and normal sample pairs](https://training.galaxyproject.org/training-material/topics/variant-analysis/tutorials/somatic-variants/tutorial.html)

Of course, [Galaxy 101](https://training.galaxyproject.org/training-material/topics/introduction/tutorials/galaxy-intro-101/tutorial.html) works as well!

## How to Get Started?
Launching a GVL instance starts at CloudLaunch:
https://launch.usegalaxy.org/catalog/appliance/genomics-virtual-lab. Select the
_GVL 5.0 beta_ version and desired cloud provider, supply your cloud
credentials, and click _Next_, type your desired password for the admin user
and click _Launch_. It will take several minutes for the launch to build and,
once available, you will be presented with an access link to the instance. Note
that even after the link becomes available and you can access CloudMan, it will
take a few more minutes for Galaxy to start.

If you would like to personalize your launch, you can choose the name for your
virtual machine, the type of hardware to use, the size of disk available for
Galaxy data (default is 100GB), and a custom domain name before initiating the launch. Assuming you have
chosen to store your cloud credentials on CloudLaunch, you can always go to
your appliances page and see an up-to-date status of the instance. When you no
longer need the instance, just click the _Delete_ icon.

## Looking Ahead
As you may have noticed, this release is tagged as `beta`. Why `beta`? It’s a
big release, a really big one. The biggest to date for the GVL since its
initial release in 2014. This release has been in the making for over 3 years
and there are many moving, novel parts. With that in mind, it will take some
time to see how it behaves in the wild and ensure the supporting infrastructure
exists (eg, containerized tools). There are also some improvements planned,
such as better resource cleanup when a cluster is terminated, improved UI for
CloudMan, linking the authentication to [CILogon](https://www.cilogon.org/) and
Custos, documentation, Continuous Integration, and many more. (Did anyone say,
“I want to be a part of this and help!” If that's you, please [reach
out](https://matrix.to/#/#galaxyproject_FederatedGalaxy:gitter.im).)

There are plans beyond the immediate 5.0 release to add major new functionality, most notably the ability to add multiple applications and projects into the same GVL by logically partitioning it and isolating projects from one another. For example, two different labs can share the same underlying cloud infrastructure to reduce costs while keeping their Galaxy installations completely separate. This is already partially functional in the current release. For example, Jupyter can be added to the current project by clicking the ‘Add Application’ link. Going forward, we plan to make it easy to extend the GVL with additional applications by simply writing a standard Helm Chart, which can then be plugged in. Both Galaxy and Jupyter have already been done this way. Overall, the concept of a project goes back to the topic of cleanly separating the roles of GVL users (ie, researchers) and systems administrator. The administrator will be able to restrict the quota and set of applications a given project has access to and isolate project users from infrastructure-level administrative details. This allows GVL users to focus on their problem domain, instead of having to worry about managing the GVL itself.

While CloudMan has traditionally been all about managing cloud resources, with this release of the GVL, CloudMan has also evolved into an independently usable Galaxy manager. Consider being able to just do `helm install cloudman` and get a production-grade installation of Galaxy in minutes that also allows you to subsequently manage the installation in a tractable, transparent way over a long time period. This process would work in exactly the same way on anything from a virtual machine, a Linux server, a Mac, and even a Windows laptop. CloudMan has conceptually been designed to work this way and before long, this very feature may be coming to a theatre near you.

As you may be able to tell, we are very excited about this milestone. We are hopeful that the GVL platform can, with time, become the default platform for deploying Galaxy around the world and not be predominantly tagged as the “Cloud” solution for Galaxy. With that in mind, if you have suggestions for or feedback, please join the [FederatedGalaxy channel on Matrix](https://matrix.to/#/#galaxyproject_FederatedGalaxy:gitter.im) and help realize this goal.
