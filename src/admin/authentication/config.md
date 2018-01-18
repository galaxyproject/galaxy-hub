---
title: OpenID Connect configuration
---

# Introduction
---

Leveraging OpenID Connect (OIDC) protocol, we enable login to Galaxy without explicitly creating a Galaxy user. This feature should be enabled and configured by an admin of a Galaxy instance. In the following we explain how to configure and enable/disable this feature (see [this](/src/admin/authentication/index.md) page on how to use it).

# Configuration
---

The configuration is a two-step process, first an admin defines the instance on an OIDC identity provider (IdP, e.g., Google), then uses obtained tokens to setup Galaxy. These steps are explained in details in the following.  

## Configure the instance on an IdP
At the moment, we support login to Galaxy using identities defined on Google (and we’ll extend this list by supporting more trusted identity providers). Hence, to configure your instance on Google take the following steps: 

1. Go to [Google developers console](https://console.developers.google.com/);
2. Go to _Credentials_ section (see the following image);
![image](/src/admin/authentication/gdc_credentials.png)

3. Create a _Project_:
    1. If this is your first time visiting this page, you’ll see a prompt to create a new project (see the above figure). Click on the _Create_ button to create a project. If you have previously used this page, to create a new project, click on the drop down with your previous project name, and hit _+_ (create project). See the following figure. 
    
    ![image](/src/admin/authentication/gdc_previous_project.png)
    
    2. In the create project page, enter project name and hit Create.
    
    ![image](/src/admin/authentication/gdc_create_project.png)
    
    3. Go to _OAuth_ consent screen tab and fill the fields according to your Galaxy instance, then save the changes. See the following figure.
    
    ![image](/src/admin/authentication/gdc_consent.png)

4. Hit _Create credentials_ button in credentials tab, and choose _OAuth client ID_ from the popped-up window.
    1. Choose web application from the list and provide a name (e.g., _Web client 1_). See the the following figure. 
    
    ![image](/src/admin/authentication/gdc_create_credentials.png)
    
    2. For _Authorized redirect URIs_ field, you need to enter your instance’s OIDC redirect URI which is in the following template:
    
           <base>/authnz/<provider>/callback
       
       For instance: 
       
           http://localhost:8080/authnz/google/callback

        Then hit _Create_ button.

    3. A window pops-up showing your OAuth `Client ID` and `Client Secret`; note this info!
    
    ![image](/src/admin/authentication/gdc_result.png)
    
        
## Configure Galaxy

Take the following steps to configure your Galaxy instance to leverage the OIDC IdP setup in the previous section for user login. 

1. In the `galaxy.ini` file set the OIDC configuration as the following: 

       enable_oidc = True
       oidc_config_file = config/oidc_config.xml
       oidc_backends_config_file = config/oidc_backends_config.xml
       
2. Create `config/oidc_config.xml` file (you may use the `config/oidc_config.xml.sample` file as reference). For common application scenarios, the default settings as are in the sample file should be adequate.

3. Create `config/oidc_backends_config.xml` file (you may use the `config/oidc_backends_config.xml.sample` file as reference), and update the file as it follows: 
    1. Make sure the the provider name is `Google` (i.e., `<provider name="Google">`);
    2. Set the value of `client_id` and `client_secret` to the ID and secret obtained from Google in the previous step (i.e., step: `4.iii`);
    3. Set `redirect_uri` to the URI provided to Google (e.g., `http://localhost:8080/authnz/google/callback`). 
  

Restart the Galaxy instance and enjoy the simplified login!

