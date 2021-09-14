---
title: "Lifeportal"
url: "https://lifeportal.uio.no"
scope: "general"
platforms:
  - platform_group: "public-server"
    platform_purview: "Norway"
    platform_url: "https://lifeportal.uio.no"
    platform_text: "Server"
    platform_location: NO
summary: "a Galaxy instance to satisfy the computational needs of the Norwegian research community in life sciences but also of any other user willing to use the service."
image: "/src/use/lifeportal-oslo/lifeportal.png"
comments:
  - "implements about 400 applications. It runs Galaxy version 18.09 and jobs are executed on the [Abel cluster](https://www.uio.no/english/services/it/research/hpc/abel/more/) (~650 nodes) using the slurm-drmaa library."
  - "We have tailored our application set to run either locally, or on the cluster with regard to the requested resources for the job. Resources (memory, walltime, number of tasks, number of cpus) are allocated on a per job basis which gives an exceptional flexibility to use and save requested resources. The instance is among the few in the world implementing a resource allocation management system plugged into Galaxy (and Galaxy GUI) which reserves, charges and refunds the user accounts after each executed job."
  - "Here are the [slides](https://drive.google.com/open?id=1Hdi9cV49FJ7eL4XrnJXs5kNIs68y4HJ3) with a detailed description of the login procedure."
user_support:
  - "Email: lifeportal-help@usit.uio.no"
quotas:
  - "Norwegian academic users log in via a national academic provider FEIDE. All other users may select Facebook, Twitter or Linkedin to log in."
  - "A real email address is compulsory for feedback and job-reports management."
  - "All login methods use Xauth (OpenIDC)."
  - "All users receive 200 hrs CPU time at first login. FEIDE users can then apply for a project within Lifeportal, up to 20 000 hrs. The applications are considered immediately and resources are allocated within minutes by a routine which is implemented within Lifeportal (Galaxy). All other users may write to lifeportal-help@usit.uio.no and their applications will be considered by our committee. If approved, they will be given access to common projects with larger resource allocations."
  - "Every user with their own project in Lifeportal can manage it through the menus built in the Galaxy GUI."
citations:
pub_libraries:
sponsors:
  - "[University of Oslo](http://www.uio.no/)"
  - "[Norwegian Bioinformatics Platform](https://bioinfo.no/)"
  - "[MLS UiO](https://www.uio.no/english/research/interfaculty-research-areas/mls/)"
  - "[UninetT Sigma2](https://www.uninett.no/en/sigma)"
---
