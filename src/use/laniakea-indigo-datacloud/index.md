---
title: "Laniakea/INDIGO-DataCloud"
url: "https://elixir-italy-science-gateway.cloud.ba.infn.it"
scope: "general"
platforms:
  - platform_group: "academic-cloud"
    platform_purview: "Italy"
    platform_url: "https://www.indigo-datacloud.eu/"
    platform_text: "INDIGO-DataCloud"
summary: '[Laniakea](https://elixir-italy-science-gateway.cloud.ba.infn.it) provides the possibility to automate the creation of Galaxy-based virtualized environments through an easy setup procedure, providing an on-demand workspace ready to be used by life scientists and bioinformaticians, with built-in storage encryption for user data.'
image: "/src/use/laniakea-indigo-datacloud/laniakea-indigo-datacloud.png"
comments:
- 'Laniakea enables researchers configure and deploy personal Galaxy instances, exploiting the [INDIGO-DataCloud](https://www.indigo-datacloud.eu/) software catalogue. Each Galaxy instance is customizable in terms of virtual CPUs, RAM and storage through the web front-end, and deployable with different sets of pre installed tools. Each instance comes with reference data (e.g. genomic sequences) already available for many species, shared among all the instances.'
- 'Each Galaxy instance can be deployed with encrypted external storage through LUKS (https://gitlab.com/cryptsetup/cryptsetup) disk encryption: users will be required to insert a password to encrypt/decrypt data directly on the virtual instance during its deployment, avoiding any interaction with the cloud administrator(s).'
- 'The service is scalable and both users and service providers can chose among a full range of different computational capabilities: from limited ones to serve e.g. small research groups, Galaxy developers or for didactic and training purposes, to instances with elasticity cluster support to deliver enough computational power.'
- 'The service will be released for beta testing soon.'
user_support:
- "[Documentation](https://laniakea.readthedocs.io)"
- "[Contact us](mailto:laniakea.helpdesk@gmail.com)"
- "[Github issue](https://github.com/Laniakea-elixir-it/elixir-italy-science-gateway/issues)"
- "[Demo Video](https://www.youtube.com/watch?v=rub3skcs84Q)"
quotas:
- "To be defined"
citations:
- '[Laniakea: an open solution to provide Galaxy "on-demand" instances over heterogeneous cloud infrastructures]( https://doi.org/10.1101/472464).
Marco Antonio Tangaro, Giacinto Donvito, Marica Antonacci, Matteo Chiara, Pietro Mandreoli, Graziano Pesole, Federico Zambelli. *bioRxiv* 472464; doi: 10.1101/472464'
- '[INDIGO-DataCloud: a Platform to Facilitate Seamless Access to E-Infrastructures
](https://doi.org/10.1007/s10723-018-9453-3), Salomoni, D., Campos, I., Gaido, L. et al. *J Grid Computing* (2018) 16: 381. doi:10.1007/s10723-018-9453-3'
pub_libraries:
- "Laniakea"
sponsors:
- "[ELIXIR-Italy](http://elixir-italy.org/)"
---
