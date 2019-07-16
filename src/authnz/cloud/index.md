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
pre-bake settings and configurations, which is discussed on [this page](/src/authnz/cloud/demo/index.md).


To use this method a user needs to take the following steps: 

1. Login to Galaxy using Google account (or any other supported OIDC-based identity provider). [Read this page](/src/authnz/config/oidc/index.md) for details;
2. Setup a provider-specific _cloud authorization_ in Galaxy:
	1. read [how to setup cloud authorization for AWS](/src/authnz/cloud/aws/index.md);
	2. read [how to setup cloud authorization for Azure](/src/authnz/cloud/azure/index.md);
	3. read [how to setup cloud authorization for GCP](/src/authnz/cloud/gcp/index.md). 
	
**Related publications:**
- Jalili, Vahid, et al. ["Cloud Bursting Galaxy: Federated Identity and Access Management."](https://www.biorxiv.org/content/10.1101/506238v1) bioRxiv (2018): 506238.
