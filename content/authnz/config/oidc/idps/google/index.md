---
title: Configure Your Galaxy Instance as a Google OIDC Client
highlight: true
---

_This page explains how to configure this feature, for user-specific docs, please refer to [this](/src/authnz/use/oidc/idps/google/index.md) page._


Leveraging OpenID Connect (OIDC) protocol, users can login to Galaxy with their
Google account, without having to (explicitly) create a Galaxy user account. To
enable this feature on your Galaxy instance, you would need to first register
you Galaxy instance as an OIDC relying party (RP, or client) with Google, then
use your registration information to configure Galaxy. These steps are described
in details in the following sections.

# Client Registration

Take the following steps in order to register your Galaxy instance as an OIDC RP
on Google's OAuth2.0 authorization server:

1. Visit the [Google Developers Dashboard](https://console.developers.google.com/apis/dashboard)
and either create a new project or select an exising project to use for this registration:

    1. If this is your first time visiting this page, you’ll see a prompt to
       create a new project. Click on the _Create_ button to create a project.

    ![image](/src/authnz/config/oidc/idps/google/gdc-create-project-1.png)

    2. If you already have existing projects, click the drop down in the top
       menu and select a desired project or create a new project by clicking the
       _New Project_ button.

    ![image](/src/authnz/config/oidc/idps/google/gdc-create-project-2.png)
    ![image](/src/authnz/config/oidc/idps/google/gdc-create-project-3.png)

    3. On the _New Project_ page, enter desired project name and click _Create_.

    ![image](/src/authnz/config/oidc/idps/google/gdc-create-project-4.png)


2. Go to _Library_ section of the [APIs & Services](https://console.developers.google.com/apis/library)
console and enable the [Google+ API](https://console.developers.google.com/apis/library/plus.googleapis.com);

    ![image](/src/authnz/config/oidc/idps/google/gdc-library.png)
    ![image](/src/authnz/config/oidc/idps/google/gdc-enable-google-plus-api.png)

3. Next, we'll add the details about our Galaxy instance and create a set of
client credentials for use in the Galaxy configuration so click on the
_Credentials_ page in the developers console.

    1. Select the _OAuth consent screen_ tab and Fill the fields according to
       your Galaxy instance, then save the changes.

    ![image](/src/authnz/config/oidc/idps/google/gdc-consent-config.png)

    2. Select the _Create credentials_ on the _Credentials_ tab and choose
    _OAuth client ID_ from the popup window.

    ![image](/src/authnz/config/oidc/idps/google/gdc-create-oauth-client-creds.png)

    3. Choose _Web application_ from the list and provide a name (e.g.,
       _Galaxy Client_). For the _Authorized redirect URIs_ field, you need to enter
       your instance’s OIDC redirect URI, which is in the following template:

       ```
       <Host URI>/authnz/google/callback
       ```

       For instance:

       ```
       http://localhost:8080/authnz/google/callback
       ```

       See [this section](/src/authnz/config/oidc/index.md#redirect-uri) for details.

       Then hit the _Create_ button.

       ![image](/src/authnz/config/oidc/idps/google/gdc-create-client.png)

    4. A window pops-up showing your OAuth `Client ID` and `Client Secret`; note this info!

    ![image](/src/authnz/config/oidc/idps/google/gdc-result.png)


# Galaxy Configuration

You would need to setup you Galaxy instance to leverage OIDC protocol.
This setup is common for all OIDC IdPs, and is
[documented at this page](/src/authnz/config/oidc/index.md#configure-oidc-backends).
Then you would need to add Google-specific setters to the `config/oidc_backends_config.xml` file as the
the following:

```xml
<?xml version="1.0"?>
<OIDC>
    <provider name="Google">
        <client_id> ... </client_id>
        <client_secret> ... </client_secret>
        <redirect_uri>http://localhost:8080/authnz/google/callback</redirect_uri>
        <prompt>consent</prompt>
    </provider>
</OIDC>
```

See [this section](/src/authnz/config/oidc/index.md#supported-oidc-idps)
for more details.


Having set this configuration, restart Galaxy to have the option of login to
Galaxy with a Google account enabled.

![image](/src/authnz/config/oidc/idps/google/gdc-google-login-button.png)