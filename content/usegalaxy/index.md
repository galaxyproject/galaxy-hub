---
title: UseGalaxy Servers
---

<img class="float-right img-responsive" style="max-width: 300px;" src="/images/galaxy-logos/usegalaxy-dot-star-white.svg" alt="UseGalaxy.*" />

The [UseGalaxy](/use/) servers are [publicly accessible Galaxy servers](/use/) that [will support](#work-in-progress)
 a common and synchronized set of tools and reference genomes.
These servers have significant computational resources behind them and are capable of powering large user communities. Some may have a regional focus, but they are all accessible to anyone.

# Servers

There are currently four UseGalaxy servers:

## UseGalaxy.org

[UseGalaxy.org](https://usegalaxy.org) is the Galaxy Project's publicly accessible server.  It was the original Galaxy server and has over 100,000 registered users, and is supported by significant computational resources at the Texas Advanced Computing Center (TACC). [Playbooks](https://github.com/galaxyproject/usegalaxy-playbook/)

## UseGalaxy.eu

[UseGalaxy.eu](https://usegalaxy.eu/) is a publicly accessible server that aims to support the analysis and sharing needs of the European research community.  It was launched in March 2018 at European Galaxy User Meeting in Freiburg.  It is hosted at the University of Freiburg. [Playbooks](https://github.com/usegalaxy-eu/infrastructure-playbook)

## UseGalaxy.org.au

[UseGalaxy.org.au](https://usegalaxy.org.au) is a global, publicly accessible service, with a core aim to support the Australian life science researchers by providing open access to best practice bioinformatics techniques. Galaxy Australia maintains tools, workflows and reference datasets as requested by Australian researchers and their collaborators. Launched in 2018 and operated by Australian BioCommons in collaboration with QCIF, The University of Melbourne and AARNet, the service is underpinned by computational resources provided by The University of Melbourne, QCIF, Pawsey Supercomputing Research Centre, AARNet and Microsoft Azure. [Playbooks](https://github.com/usegalaxy-au/infrastructure)

## UseGalaxy.fr

[UseGalaxy.fr](https://usegalaxy.fr) is a publicly accessible server aiming to support the French research community. [Playbooks](https://gitlab.com/ifb-elixirfr/usegalaxy-fr/infrastructure)

<!-- ## UseGalaxy.be

[UseGalaxy.be](https://usegalaxy.be) -->

(See the [UseGalaxy server directory](/use/) for more information on each.)

# Status

The uptime status of all UseGalaxy servers, as well as other key Galaxy resources, [is shown here](https://status.galaxyproject.org/). The status page *currently tracks whether the sites load at all - there may still be issues with subsystems like job scheduling that are not reported here yet.*

# Work in Progress

This effort was launched in March 2018 and is very much a work in progress.  Support for a synchronized set of core tools and reference genomes is not yet implemented.  (It is one of our first goals.)  We also have long term goals that include welcoming other servers, and (really long term) things like integrated login and federation support.

# Membership

We want to see servers meeting several loose requirements to be considered part of the `usegalaxy.*` group.

- *Updated*: These servers commit to updating Galaxy within 90 business days after new releases.
- *Freely accessible*: These servers may not place restrictions on access or registration, anonymous access must be permitted. Anonymous users may have restrictions placed on them (e.g. 0MB storage, not allowed to run jobs, etc.) but they should be enabled in order to support reviewers and people wanting to browse and see what is available (tools, public workflows, etc.)
- *Public infrastructure configuration*: We hold ourselves to a very high standard. Everyone should be able to reproduce what we do, and we commit ourselves to securing our infrastructure using best practices and in the eye of the public.
- *Common Tools & Reference Data*: Once work in progress finishes, these servers will share a common set of tools, and must provide the Galaxy CVMFS reference data.
- *Share Metrics*: The servers agree to share Key Usage Indicators (KUIs) like number of registered users, active users, total job count, etc. to contribute to the [global Galaxy KUI dashboard](https://gxy.io/kui).
- *Functional*: The site provides >90% uptime as monitored by the [status page](https://status.galaxyproject.org/), and participates in automated cross-usegalaxy testing initiatives.
- *Conduct*: Adhere to the [Galaxy Project Code of Conduct](https://galaxyproject.org/community/coc/).

For more information, please read more about the [application process here](apply/).

We're excited to see new services join us!

## Incubating Members

These servers might not meet all of the requirements but are aiming to one day!

<!-- - [UseGalaxy.be](https://usegalaxy.be) - working towards public playbooks, anonymous access. -->
- [UseGalaxy.ca](https://usegalaxy.ca) - working towards public playbooks, anonymous access.
- [UseGalaxy.no](https://usegalaxy.no) - restricted to norwegian.
- [UseGalaxy.es](https://usegalaxy.es) - working on it.
- [UseGalaxy.it](https://usegalaxy.it) - working on it.
- [UseGalaxy.cz](https://usegalaxy.cz) - working on it.
