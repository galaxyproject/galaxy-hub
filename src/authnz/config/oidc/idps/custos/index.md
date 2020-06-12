---
title: Configure Your Galaxy Instance as a Custos Client
highlight: true
---

_This page explains how to configure this feature as an administrator,
for user-specific docs, please refer to the [Use page](/src/authnz/use/oidc/idps/custos/index.md)._


# About Custos

[Custos](https://airavata.apache.org/custos/) is an [NSF-funded
project](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1840003&HistoricalAwards=false),
backed by open source software that provides science gateways such as Galaxy
with single sign-on, group management, and management of secrets such as access
keys and OAuth2 access tokens. With Galaxy, Custos allows users to login to
Galaxy without having to (explicitly) create a Galaxy user account while being
able to login choosing from more than 3,000 available Identity Providers
(IdPs). Many of the academic institutions from around the world are supported
allowing users to link their institutional identities with a Galaxy account.


# Configure Galaxy to work with Custos

To set up a Galaxy instance to work with Custos, it is necessary to enable
OIDC-based login for Galaxy. To do this, follow the instructions for enabling
[OIDC-based login](/src/authnz/config/oidc/index.md#enable-oidc-based-login).
Next, it is necessary to register your Galaxy instance as a client of Custos.
The following section demonstrates how to do that. Finally, you need to
configure Custos as an IdP provider in Galaxy by editing
`config/oidc_backends_config.xml`. An example file is provided below.


## Register your Galaxy instance as a Custos client

Development of a portal for registering new Custos clients is currently in
progress. In the meantime, you can register a client directly through a REST
API. This can be accomplished using a platform such as
[Postman](https://www.postman.com/).

To register a new Galaxy client with Custos, make a POST request with the
following body, replacing information with your relevant data:

* URI : https://custos.scigap.org:/apiserver/tenant-management/v1.0.0/oauth2/tenant
* Method : POST
* Body :
    ```
    client_name:John Doe University
    requester_email:johndoe@university.edu
    admin_username:johndoe
    admin_first_name:John
    admin_last_name:Doe
    admin_email:johndoe@university.edu
    contacts:[1234567890]
    redirect_uris:[https://jduniversity.edu/galaxy/authnz/custos/callback]
    domain:jduniversity.edu
    admin_password:1234
    client_uri:jduniversity.edu
    scope:email profile openId org.cilogon.userinfo
    application_type:web
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
   https://university.edu/galaxy/authnz/custos/callback
   ```

   See [this section](/src/authnz/config/oidc/index.md#redirect-uri) for details.

3. After making the POST request, you should get a response containing your `Client ID` and `Client Secret`;
   note this info! You will need it for the Galaxy configuration.
   ![image](/src/authnz/config/oidc/idps/custos/Custos-post-request-response.png)

4. Finally, to have your client activated, send an email to [custos@airavata.apache.org](mail-to:custos@airavata.apache.org) with your `Client ID`.

## Configure Galaxy

Once we have an activated client ID and client secret from Custos, we need to
configure Galaxy. As a first step, make sure to [enable OIDC
login](/src/authnz/config/oidc/#enable-oidc-based-login). After setting up
`config/oidc_config.xml`, which is common to multiple IdPs, you need to
configure `config/oidc_backends_config.xml`. The following is an example of a
configuration. Note that the **redirect_uri** must match what as included as
the callback URL during your Custos client registration. The client ID and
client secret are unique to your installation of Galaxy and were obtained
during client registration.

```xml
<?xml version="1.0"?>
<OIDC>
    <provider name="Custos">
        <url>https://custos.scigap.org/apiserver/identity-management/v1.0.0/.well-known/openid-configuration</url>
        <credential_url>https://custos.scigap.org/apiserver/identity-management/v1.0.0/credentials</credential_url>
        <client_id> ... </client_id>
        <client_secret> ... </client_secret>
        <redirect_uri>http://jduniversity.edu/galaxy/authnz/custos/callback</redirect_uri>
        <realm>master</realm>
    </provider>
</OIDC>
```

Having set this configuration, (re)start Galaxy to have the option of login to
Galaxy with Custos. The login page should look as follows:

<div class="center">
    <img src="/src/authnz/config/oidc/idps/custos/custos-login-button2.png"
     alt="User login with Custos enabled" width="60%" />
</div>

For the end-user documentation of how to use the Custos login now that it has
been configured, take a look at the
[end-user](/src/authnz/use/oidc/idps/custos/index.md) page.

