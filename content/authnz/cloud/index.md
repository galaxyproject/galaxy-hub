---
title:  Securely Authorize Galaxy to Access Protected Data on Cloud
highlight: true
---

On this page we explain a method that enables a user to securely authorize Galaxy to access their privately
hosted data on cloud. This method uses industry standards for user identification and their accesss control:
OpenID Connect protocol and role-based access control model. Accordingly, this method has the following
advantages:

* Users do **NOT** need to share their credentials with Galaxy;
* User's identity and granted previliges (theoretically) cannot be impersonated or hijacked;
* Galaxy accesses protected data on cloud assuming a *role*, which is defined by the user and has
independent privileges;
* Galaxy's access can be audited, restricted, elevate, and revoked by the user at anytime,
independent from any other service and the user themself.

To provide readers with a gist of this method, we have prepared a demo with all the
pre-bake settings and configurations, which is discussed on [this page](/authnz/cloud/demo/).


To use this method a user needs to take the following steps:

1. Login to Galaxy using Google account (or any other supported OIDC-based identity provider). [Read this page](/authnz/config/oidc/) for details;
2. Setup a provider-specific _cloud authorization_ in Galaxy:
	1. read [how to setup cloud authorization for AWS](/authnz/cloud/aws/);
	2. read [how to setup cloud authorization for Azure](/authnz/cloud/azure/);
	3. read [how to setup cloud authorization for GCP](/authnz/cloud/gcp/).

**Related publications:**
- Jalili, Vahid, et al. ["Cloud bursting galaxy: federated identity and access management."](https://doi.org/10.1093/bioinformatics/btz472) Bioinformatics 36.1 (2020): 1-9.
