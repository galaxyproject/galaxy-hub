---
title: Configure Your Galaxy Instance as a Globus OIDC Client
highlight: true
---

_This page explains how to configure this feature, for user-specific docs, please refer to [this](/src/authnz/use/oidc/idps/globus/index.md) page._


Leveraging OpenID Connect (OIDC) protocol, users can login to Galaxy with their
Globus account, without having to (explicitly) create a Galaxy user account. To
enable this feature on your Galaxy instance, you would need to first register 
you Galaxy instance as an OIDC relying party (RP, or client) with Globus, then 
use your registration information to configure Galaxy. These steps are described
in details in the following sections.   

# Client Registration 

Take the following steps in order to register your Galaxy instance as an OIDC RP 
on Globus's OAuth2.0 authorization server:

1. Go to [Globus Developers](https://developers.globus.org) page 
and click on the [Register your app with Globus](https://auth.globus.org/developers) link:

    ![image](/src/authnz/config/oidc/idps/globus/01.png)
    
2. If you are not already logged in, this will take you to Globus 
login page, where you would need to login with your preferred method: 

    ![image](/src/authnz/config/oidc/idps/globus/02.png)

3. Having logged in, you will be redirected to the new project creation page (if you
do not have any previous projects), fill in all the fields and hit the *Create Project*
button:

    ![image](/src/authnz/config/oidc/idps/globus/03.png)
 
4. Having create a project, you will be redirected to the **Apps and Services** page,
where you would need select the project you just created, and click on the *Add...* button,
and then choose **Add new app** option:
    
    ![image](/src/authnz/config/oidc/idps/globus/04.png)

5. In the **App Registration** page fill in the fields as shown in the following figure:

    ![image](/src/authnz/config/oidc/idps/globus/05.png)

    Note that the options we selected as shown in the above figure, are the 
    minimum required; however, you may select other options according to your
    setup requirements. 
 
6. Then you will be taken back to the **Apps and Services** page, where you will
obtain all the info of you registered Galaxy instance: 

    ![image](/src/authnz/config/oidc/idps/globus/06.png)
    
7. Scroll down to the bottom of the page and click on the 
**Generate New Client Secret** button, then provide a name for the secret, 
and click on the **Generate** button:

    ![image](/src/authnz/config/oidc/idps/globus/07.png)
    
8. Copy the **Client ID** and **Client Secret** from this page, and set the
related setters as explained in the following section. 
    
        
# Galaxy Configuration

You would need to setup you Galaxy instance to leverage OIDC protocol. 
This setup is common for all OIDC IdPs, and is 
[documented at this page](/src/authnz/config/oidc/index.md#configure-oidc-backends).
Then you would need to add Globus-specific setters to the `config/oidc_backends_config.xml` file as the 
the following: 

```xml
<?xml version="1.0"?>
<OIDC>
    <provider name="Globus">
        <client_id> ... </client_id>
        <client_secret> ... </client_secret>
        <redirect_uri>http://localhost:8080/authnz/globus/callback</redirect_uri>
        <prompt>consent</prompt>
    </provider>
</OIDC>
```

Set `client_id` and `client_secret` setters with the values you 
obtained when registering your Galaxy instance on Globus (see previous
section). See [this section](/src/authnz/config/oidc/index.md#redirect-uri)
about the redirect URI.

See [this section](/src/authnz/config/oidc/index.md#supported-oidc-idps)
for more details.


Having set this configuration, restart Galaxy to have the option of login to 
Galaxy with a Globus account enabled.
