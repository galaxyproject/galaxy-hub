---
title: Configure Your Galaxy Instance as an OIDC Client of ELIXIR Authentication and Authorisation Infrastructure
highlight: true
---

_This page explains how to configure this feature, for user-specific docs, please refer to [this](/src/authnz/use/oidc/idps/elixir-aai/index.md) page._


Leveraging OpenID Connect (OIDC) protocol, users can login to Galaxy using their
identity on [ELIXIR Authentication and Authorisation Infrastructure (AAI)](https://elixir-europe.org/services/compute/aai),
without having to (explicitly) create a Galaxy user account. To
enable this feature on your Galaxy instance, you would need to first register
you Galaxy instance as an OIDC relying party (RP, or client) with ELIXIR AAI, and then
use your registration information to configure Galaxy. These steps are described
in details in the following sections.

# Client Registration


Take the following steps to register your Galaxy instance (RP) to the ELIXIR AAI **test environment**:

1. [Create an ELIXIR identity](https://elixir-europe.org/register), if you do not already have it.

2. [Click here to start register your client](https://login.elixir-czech.org/oidc/manage/dev/dynreg) 
and you'll see a dashboard as the following: 

    ![image](/src/authnz/config/oidc/idps/elixir-aai/register-a-new-client-1.png)

3. Click the green "New Client" button:

    ![image](/src/authnz/config/oidc/idps/elixir-aai/register-a-new-client-2.png)

4. Fill in the "Client name" and "Redirect URI" fields, and all the other fields
are optional. 

    ![image](/src/authnz/config/oidc/idps/elixir-aai/register-a-new-client-3.png)

5. Click the green "Save" button at the bottom (or at the top) and make a note of all 
the generated credentials that is made available to you. The `Client ID` and 
`Client Secret` fields will be used to configure Galaxy, and `Client Configuration URL`
and `Registration Access Token` will be needed to access the client registration in future.

    ![image](/src/authnz/config/oidc/idps/elixir-aai/register-a-new-client-4.png)

6. Drop the following information by e-mail to aai-contact@elixir-europe.org: 

    - Name of your service

    - Description of your service

    - Your service’s Client_id

7. Wait for a reply from ELIXIR AAI with a form for you to complete. It includes 
requesting which attribute scopes should be returned to Galaxy when users authenticate. 
We recommend to only request **openid** and **email** scopes, as this is the minimum 
that is needed and will be utilized by Galaxy.

8. Return the pre-filled form and when accepted, the ELIXIR AAI service is ready to 
receive authentication requests from your Galaxy server! Of course you also need to 
configure your Galaxy first, so read on under [Galaxy Configuration](#galaxy-configuration).

<div class="alert alert-warning" role="alert">
    **Note:**
    
    Without the complition of steps **7** and **8**, your Galaxy instances can NOT verify users 
    authentication based on the information it receives from ELIXIR AAI, because this 
    provider does not provide a client with all information required as per OIDC 
    specifications (e.g., `id_token`) by default.   
</div>


The [ELIXIR AAI - Manual for Service Providers](https://docs.google.com/document/d/1ihb0hH2YJqSCPZS0syVpvAOeQP1HTxdf_XMsZZLe_W0/edit) 
provides more details on the client registration process. The steps discussed here 
leads to registering a Galaxy instance to the ELIXIR AAI **test environment**.
However, for **production deployment**, you would need to promote your service from the 
test environment to the prod environment following the described administrative 
procedures in Step 3 of the 
[ELIXIR AAI - Manual for Service Providers](https://docs.google.com/document/d/1ihb0hH2YJqSCPZS0syVpvAOeQP1HTxdf_XMsZZLe_W0/edit).



# Galaxy Configuration

You would need to setup your Galaxy instance to leverage OIDC protocol.
This setup is common for all OIDC IdPs, and is
[documented at this page](/src/authnz/config/oidc/index.md#configure-oidc-backends).
Then you would need to add ELIXIR AAI-specific setters to the `config/oidc_backends_config.xml` 
matching the values you got from the client registration process, as well as the exact same 
`redirect_uri` you specified (depending on your setup):

```xml
<?xml version="1.0"?>
<OIDC>
    <provider name="Elixir">
        <client_id> ... </client_id>
        <client_secret> ... </client_secret>
        <redirect_uri>http://localhost:8080/authnz/elixir/callback</redirect_uri>
        <prompt>consent</prompt>
    </provider>
</OIDC>
```

Having set this configuration, restart Galaxy to have the option of login to
Galaxy with ELIXIR AAI identity:

![image](/src/authnz/config/oidc/idps/elixir-aai/login-including-elixir.png)
