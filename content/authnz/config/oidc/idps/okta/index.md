---
title: Configure Your Galaxy Instance as an OIDC Client for your organization's Okta Infrastructure
highlight: true
---

_This page explains how to configure this feature, for user-specific docs, please refer to [this](/src/authnz/use/oidc/idps/okta/index.md) page._


Leveraging OpenID Connect (OIDC) protocol, users can login to Galaxy using their
identity on [Okta Infrastructure (AAI)](https://www.okta.com/),
without having to (explicitly) create a Galaxy user account. To
enable this feature on your Galaxy instance, you would need to first register
you Galaxy instance as an OIDC relying party (RP, or client) with your organization's Okta, and then
use your registration information to configure Galaxy. These steps are described
in details in the following sections.

# Client Registration


Take the following steps to register your Galaxy instance (RP) to an Okta **dev environment**:

1. [Create a Okta developer account](https://developer.okta.com/signup/), if you do not already have it.

2. Login to your Okta developer account's admin panel and register a new application. 

    ![image](/src/authnz/config/oidc/idps/okta/register-a-new-app-1.png)

3. Set the "Base URI", "Login redirect URIs", "Logout redirect URIs", "Group assignments" and "Grant type allowed.

4. Click the green "Done" button at the bottom and make a note of all 
the generated credentials that is made available to you. The `Client ID` and 
`Client Secret` fields will be used to configure Galaxy, and `Client Configuration URL`
and `Registration Access Token` will be needed to access the client registration in future.

5. Use the returned information to setup Galaxy to receive authentication requests using Okta! 


# Galaxy Configuration

You would need to setup your Galaxy instance to leverage OIDC protocol.
This setup is common for all OIDC IdPs, and is
[documented at this page](/src/authnz/config/oidc/index.md#configure-oidc-backends).
Then you would need to add Okta-specific setters to the `config/oidc_backends_config.xml` 
matching the values you got from the client registration process, as well as the exact same 
`redirect_uri` you specified (depending on your setup):

```xml
<?xml version="1.0"?>
<OIDC>
    <provider name="Okta">
        <client_id> ... </client_id>
        <client_secret> ... </client_secret>
        <redirect_uri>http://localhost:8080/authnz/okta/callback</redirect_uri>
        <api_url>https://organization.okta.com/oauth2</api_url>
    </provider>
</OIDC>
```

Having set this configuration, restart Galaxy to have the option of login to
Galaxy with your organization's Okta identity:

![image](/src/authnz/config/oidc/idps/okta/login-with-okta.png)
