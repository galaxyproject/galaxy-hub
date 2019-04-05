---
title: Login to Galaxy Using Social and Institutional Identities
highlight: true
---

In addition to the [built-in mechanism](/src/authnz/use/gxyusername/index.md) for creating and managing users accounts, 
Galaxy also allows login using social and institutional identities (e.g., Google). 

This feature and its supported identity providers may differ between different Galaxy instance, depending on 
how that instance is configured by its admin 
(admins, [read how to enable and configure it](/src/authnz/config/oidc/index.md)).


Anonymous users can use this feature to login to Galaxy without having to create a Galaxy user account (which
will be created automatically). Also, users with existing Galaxy user accounts (e.g., via [Galaxy username and password](/src/authnz/use/gxyusername/index.md))
can associate their account with their social identities. For instance, if a user associates their Galaxy account 
with their Google account, then they can login to Galaxy either using their Galaxy username and password, 
or their Google account, whichever method they use, they will be assuming same Galaxy user account, hence 
having access to the same histories, workflows, datasets, libraries, and etc.


Currently Galaxy supports the following identity providers (the list of enabled/configured identity providers on 
different Galaxy instances can be different):

- Google (see [this page](/src/authnz/use/oidc/idps/google/index.md) on how to use it);

- Globus (see [this page](/src/authnz/use/oidc/idps/globus/index.md) on how to use it);


