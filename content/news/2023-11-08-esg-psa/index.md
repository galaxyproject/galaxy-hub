---
title:
  "EuroScienceGateway project: new EGI Check-in and WLCG IAM backends available
  in python-social-auth"
date: "2023-11-08"
tease:
  "Python-social-auth release 4.5.0 includes two new backends contributed by
  EuroScienceGateway"
hide_tease: false
tags: [esg-wp4, esg]
subsites: [all-eu, esg, global]
main_subsite: eu
---

Galaxy supports [python-social-auth](https://github.com/python-social-auth) for
authentication and authorization with federated identity systems.
[Release 4.5.0](https://github.com/python-social-auth/social-core/releases/tag/4.5.0)
of this library includes two new backends contributed by
[EuroScienceGateway Project](../../projects/esg/): EGI Check-in and WLCG IAM.

[EGI Check-in](https://www.egi.eu/service/check-in/) brings eduGAIN and other
authentication sources in a [REFEDS RnS](https://refeds.org/) and
[Sirtfi](https://aarc-project.eu/policies/sirtfi/) compliant service that
ensures security without compromising productivity. The
[WLCG IAM](https://wlcg.cloud.cnaf.infn.it/login) is the solution to power the
next generation [WLCG](https://wlcg.web.cern.ch/) Authentication and
Authorization infrastructure.

With both systems now available in python-social-auth, EuroScienceGateway
project has started the implementation of the support in Galaxy, which will
allow not just to authenticate with the new identities, but also further
simplify the Bring Your Own Compute (BYOC) features of Galaxy so users
credentials can be reused to access existing infrastructure computing services
without the need for reauthentication.
