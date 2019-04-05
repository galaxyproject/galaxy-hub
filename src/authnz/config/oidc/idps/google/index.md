---
title: Configure Your Galaxy Instance as a Google OIDC Client
highlight: true
---

_This is page explains how to configure this feature, for user-specific docs, please refer to [this](/src/authnz/use/oidc/idps/google/index.md) page._


Leveraging OpenID Connect (OIDC) protocol, users can login to Galaxy with their
Google account, without having to (explicitly) create a Galaxy user account. To
enable this feature on your Galaxy instance, you would need to first register 
you Galaxy instance as an OIDC relying party (RP, or client) with Google, then 
use your registration information to configure Galaxy. These steps are described
in details in the following sections.   

# Client Registration 

Take the following steps in order to register your Galaxy instance as an OIDC RP 
on Google's OAuth2.0 authorization server:

1. Go to [Google+ API](https://console.developers.google.com/apis/api/plus/overview) page, and enabled it;
2. Go to [Google developers console](https://console.developers.google.com/);
3. Go to _Credentials_ section (see the following image);
![image](/src/authnz/config/oidc/idps/google/gdc_credentials.png)

4. Create a _Project_:
    1. If this is your first time visiting this page, you’ll see a prompt to 
    create a new project (see the above figure). Click on the _Create_ button 
    to create a project. If you have previously used this page, to create a 
    new project, click on the drop down with your previous project name, 
    and hit _+_ (create project). See the following figure. 
    
    ![image](/src/authnz/config/oidc/idps/google/gdc_previous_project.png)
    
    2. In the create project page, enter project name and hit Create.
    
    ![image](/src/authnz/config/oidc/idps/google/gdc_create_project.png)
    
    3. Go to _OAuth_ consent screen tab and fill the fields according to your 
    Galaxy instance, then save the changes. See the following figure.
    
    ![image](/src/authnz/config/oidc/idps/google/gdc_consent.png)

5. Hit _Create credentials_ button in credentials tab, and choose 
_OAuth client ID_ from the popped-up window.

    1. Choose web application from the list and provide a name (e.g., _Web client 1_). 
    See the the following figure. 
    
    ![image](/src/authnz/config/oidc/idps/google/gdc_create_credentials.png)
    
    2. For _Authorized redirect URIs_ field, you need to enter your instance’s OIDC 
    edirect URI which is in the following template:
    
       ```
       <Host URI>/authnz/google/callback
       ```
       
       For instance:
        
       ```
       http://localhost:8080/authnz/google/callback
       ```
           
       See [this section](/src/authnz/config/oidc/index.md#redirect-uri) for details.

        Then hit _Create_ button.

    3. A window pops-up showing your OAuth `Client ID` and `Client Secret`; note this info!
    
    ![image](/src/authnz/config/oidc/idps/google/gdc_result.png)
    
        
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
