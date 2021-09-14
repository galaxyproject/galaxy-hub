---
title: Login to Galaxy Using Social and Institutional Identities
highlight: true
---

_This page explains how to use this feature, for admin-specific docs, please
refer to the [configuration page](/src/authnz/config/oidc/index.md)._

In addition to the [built-in username and password](/src/authnz/use/gxy/index.md)
option for creating and managing users accounts, Galaxy also allows login using
social and institutional identities (e.g., Google).

This feature and its supported identity providers may differ between different
Galaxy instances, depending on how that instance is configured by its
administrator (admins, [read how to enable and configure
this login option](/src/authnz/config/oidc/index.md)).

**New users** can use this feature to login to Galaxy without having to explicitly
create a Galaxy user account. Instead, the account will be created
automatically. **Users with existing Galaxy accounts** (eg, using [Galaxy
username and password](/src/authnz/use/gxy/index.md)) can associate their
account with 3rd party identities. For instance, if a user associates
their Galaxy account with their Google account, then they can login to Galaxy
either using their Galaxy username and password or their Google account.
Whichever method they use they will be assuming same Galaxy user account, hence
having access to the same histories, workflows, datasets, libraries, etc.

Currently, Galaxy supports the following identity providers (the list of
enabled/configured identity providers on different Galaxy instances may be
different):

- [Custos](/src/authnz/use/oidc/idps/custos/index.md)
- [Elixir AAI](/src/authnz/use/oidc/idps/elixir-aai/index.md)
- [Globus](/src/authnz/use/oidc/idps/globus/index.md)
- [Google](/src/authnz/use/oidc/idps/google/index.md)
- [Okta](/src/authnz/use/oidc/idps/okta/index.md)
