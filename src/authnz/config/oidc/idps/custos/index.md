---
title: Configure Your Galaxy Instance as a Custos Client
highlight: true
---

_This page explains how to configure this feature, for user-specific docs, please refer to [this](/src/authnz/use/oidc/idps/custos/index.md) page._

Custos is an [NSF-funded project](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1840003&HistoricalAwards=false), 
backed by open source software, that will provide science gateways such as Galaxy
with federated authentication, single sign-on across multiple science gateway
user environments, group management, and management of secrets such as access
keys and OAuth2 access tokens. With Galaxy, Custos allows users to login to
Galaxy without having to (explicitly) create a Galaxy user account while being
able to login using of more than 3,000 available Identity Providers (IdPs). Many
of the academic institutions from around the world are supported allowing users
to link their institutional identities with a Galaxy account.

The required steps are described in the following sections.

# Client Registration

A public website for registering a new client on Custos is currently in progress. However, for now you can still register a client through a REST API call using a platform such as Postman. Make a POST request with the following body:

* URI : https://custos.scigap.org:/apiserver/tenant-management/v1.0.0/oauth2/tenant
* Method : POST
* Body : 
    ```
    {
        "client_name":"John Doe University",
        "requester_email":"johndoe@university.edu",
        "admin_username":"johndoe",
        "admin_first_name":"John",
        "admin_last_name":"Doe",
        "admin_email":"johndoe@university.edu",
        "contacts":["1234567890"],
        "redirect_uris":["https://jduniversity.edu/authnz/custos/callback"],
        "domain":"jduniversity.edu",
        "admin_password":"1234",
        "client_uri":"jduniversity.edu",
        "scope":"email profile openId org.cilogon.userinfo",
        "logo_uri":" ",
        "application_type":"web",
        "comment":" "
    }
    ```

For example:
![image](/src/authnz/config/oidc/idps/custos/Custos-post-request.png)

1. The _Domain_ should be the main address that users will use to get to your instance of Galaxy.

2. For the _Redirect URIs_ field, you need to enter
   your instance’s OIDC redirect URI, which is in the following template:

   ```
   <Host URI>/authnz/custos/callback
   ```

   For instance:

   ```
   http://localhost:8080/authnz/custos/callback
   ```

   See [this section](/src/authnz/config/oidc/index.md#redirect-uri) for details.

3. After making the POST request, you should get a reponse containing your `Client ID` and `Client Secret`;
   note this info! You will need it for the Galaxy configuration.
   ![image](/src/authnz/config/oidc/idps/custos/Custos-post-request-response.png)

   To have your client activated, send an email to [custos@airavata.apache.org](mail-to:custos@airavata.apache.org) with your `Client ID`.

# Galaxy Configuration

Next, we need to setup Galaxy instance to leverage the OIDC protocol.
This setup is common for all OIDC IdPs, and is
[documented at this page](/src/authnz/config/oidc/index.md#configure-oidc-backends).
For Custos specifically, provide the following values in the
`config/oidc_backends_config.xml`. Note that the **redirect_uri** must have been included in the list of callback URLs during your Custos client registration.

```xml
<?xml version="1.0"?>
<OIDC>
    <provider name="Custos">
        <url>https://custos.scigap.org/apiserver/identity-management/v1.0.0/.well-known/openid-configuration</url>
        <credential_url>https://custos.scigap.org/apiserver/identity-management/v1.0.0/credentials</credential_url>
        <client_id> ... </client_id>
        <client_secret> ... </client_secret>
        <redirect_uri>http://localhost:8080/authnz/custos/callback</redirect_uri>
        <realm>master</realm>
    </provider>
</OIDC>
```

Having set this configuration, (re)start Galaxy to have the option of login to
Galaxy with Custos. For the user-centric view of the login, take a look at
[end-user](/src/authnz/use/oidc/idps/custos/index.md) page.

![image](/src/authnz/config/oidc/idps/custos/custos-login-button2.png)
