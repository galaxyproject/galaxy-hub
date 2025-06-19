---
date: '2020-04-24'
title: "GVL 5.0-beta2 release"
authors: "Alexandru Mahmoud, Nuwan Goonasekera, Luke Sargent, Enis Afgan"
tease: "30% faster and single sign-on, ohh my"
image: "/news/2020-02-gvl5-beta/gvl-logo-landscape-2018.svg"
highlight: true
---

Mid-February, we announced [the first beta release](https://galaxyproject.org/blog/2020-02-gvl5-beta/) of the all-new Genomics Virtual Lab v5.0 (GVL 5). Today, beta2 release has become available. This latest version comes packed with several new features and enhancements as well as general improvements regarding the stability and robustness of the platform. We’d like to highlight the following three features, with more detailed blog posts about each of the features coming in the following weeks:


# Single Sign-on Across GVL Applications

The GVL is a conglomerate of applications, with plans to continue adding more applications over time, notably an integrated web-based terminal and Jupyter coming soon. Currently, alongside the flagship Galaxy application, Grafana is deployed for visualizing usage metrics, Keycloak for authentication and user management, and CloudMan for managing the underlying cloud infrastructure. The beta2 release of the GVL synchronizes the authentication across those applications to provide a uniform user experience. Once a user has logged into any one of the applications, they are automatically logged into all of them. This implementation is based on OIDC, so applications added to the GVL in the future will readily plug into the same framework and offer a consistent behavior for users.


# Compute Infrastructure Auto-scaling

One of the most beneficial features of cloud computing is the ability to dynamically scale the available resources based on current need. The initial release of GVL 5 offered the [ability to dynamically scale the size of the cluster](https://galaxyproject.org/blog/2020-02-gvl5-beta/#controlled-performance-and-monitoring) handling Galaxy jobs but the process required manual intervention. With the beta2 release, auto-scaling capability was added where an administrator can specify upper and lower bounds on the size of the cluster and select the size of the virtual machines they would like to use. The thresholds for performing the scaling are controlled via a set of rules and are based on the cluster load. In this sense, CloudMan will monitor the status of the cluster and automatically add or remove cloud machines as necessary to keep the load under a set threshold. These can be visually inspected in Grafana and readily adjusted, even on a running cluster.

<div class="center"><a href="https://i.imgur.com/QffCC3K.png">
    <img src="https://i.imgur.com/QffCC3K.png"
     alt="CloudMan auto0-scaling form" width="60%" />
</a></div>

# Improved Startup Speed

The beta2 release of the GVL 5 starts nearly 30% faster than the initial beta release. In absolute terms, when launching on AWS for example, this means a GVL will now launch in about 11 minutes, down from about 15 earlier. The launch is a complicated process consisting of requesting a virtual machine from the cloud provider, initializing it with Docker, installing Kubernetes (via [Rancher](https://rancher.com/)), installing necessary storage configurations, followed by the installation of CloudMan, Galaxy, and the other supporting applications. The current speedup of the launch process is due to optimizations on how the CVMFS is configured, and the migration to using Python 3 for running Galaxy. Namely, when Galaxy starts up, it parses all of the tool wrapper files, hundreds of them. Caching and parsing each of the files individually is a slow process, particularly with the CVMFS, which needs to fetch each file over the network independently. The GVL is now using a shared cache for CVMFS data, which starts preloading the common configuration files as soon as the service becomes available. This removes much of the wait time due to the network bottleneck, shortening the Galaxy startup time by nearly 3 minutes. This speedup is noticeable only on the first boot, as subsequent Galaxy deployments inside the cluster were already leveraging the cached files. In addition, XML parsing is noticeably faster with Python 3, manifesting itself by shaving off Galaxy startup time by more than a minute. Note that this speedup is noticeable every time the Galaxy process is restarted.


# Kubernitizing the Galaxy Job Handlers

To ensure responsiveness and scalability of the Galaxy application, Galaxy is composed of multiple containerized processes that each handle different portions of the application. Web requests are processed by web handlers, job submissions by job handlers, and workflows by workflow handlers. However, if these processes go astray due to a bug, a memory leak, or any other reason, they quit handling user requests and the responsiveness of Galaxy suffers from the perspective of the user. As mentioned in the initial GVL 5.0 beta release, all of the GVL components run on Kubernetes, and one of the benefits of the platform is that it monitors the status of a process and can automatically react to state changes. In Kubernetes terminology, these are known as the readiness and liveness probes. As soon as an application quits emitting expected responses from the probe, Kubernetes will stop the hung process and start a replacement one. The initial GVL 5 beta release included probes for the Galaxy web handlers. The current beta2 release extends that to include configurable readiness and liveness probes for the job handlers. In addition to helping with the ongoing operations of Galaxy, this also helps during configuration changes or upgrades to ensure a replacement process is in place before shutting down its old counterpart - accomplishing zero downtime upgrades. This ensures no Galaxy user jobs get lost during the switch.


# How to start using the GVL?

The GVL 5 beta2 release is available via CloudLaunch at [https://launch.usegalaxy.org/](https://launch.usegalaxy.org/), as the GVL 5.0 beta2 version of the Genomics Virtual Lab appliance. The GVL continues to be uniformly available on at least 4 different clouds: AWS, GCP, NeCTAR, and Jetstream. If you would like to enable GVL on your cloud, please [reach out to us](https://gitter.im/galaxyproject/FederatedGalaxy).


# What’s next for the GVL?

Looking ahead, the plan is to increase the robustness of the platform, push the limits of containerized computing in genomics, and build a platform for uniformly deploying Galaxy. Specifically, for the next release, we hope to include a web-based terminal, introduce a shared storage location for multiple applications, and write documentation. We are hopeful to accomplish this by the end of Q2/2020 and prepare some GVL-based use cases in time for the [BCC 2020](https://bcc2020.github.io/). With that, stay tuned for the results of testing the [COVID-19 analyses](https://covid19.galaxyproject.org/) otherwise available on the _usegalaxy.*_ servers.
