---
title: Configure Your Galaxy Instance as a Elixir AAI OIDC Client
highlight: true
---

_This is page explains how to configure this feature, for user-specific docs, please refer to [this](/src/authnz/use/oidc/idps/elixir-aai/index.md) page._


Leveraging OpenID Connect (OIDC) protocol, users can login to Galaxy with their
Elixir AAI identity, without having to (explicitly) create a Galaxy user account. To
enable this feature on your Galaxy instance, you would need to first register
you Galaxy instance as an OIDC relying party (RP, or client) with Elixir AAI, then
use your registration information to configure Galaxy. These steps are described
in details in the following sections.

You will need to have an Elixir AAI identity created already to be able to complete several of the steps. If you havent registered already, you can [register here](https://www.elixir-europe.org/register/).

# Client Registration

The [Elixir AAI - Manual for Service Providers](https://docs.google.com/document/d/1ihb0hH2YJqSCPZS0syVpvAOeQP1HTxdf_XMsZZLe_W0/edit) takes you through the general steps of the client registration process, but we've included some additional Galaxy specific documentation here to help you through:

1. Step 1 - Install an OpenID Connect Relying Party (OIDC RP) has already been done for you, as Galaxy installs the Python Social Auth python library (social-auth-core) that implements the necessary functionality.

2. Step 2 - Register the RP to the Elixir AAI test environment. Here you really only need to complete sub points 5-7:

    a. [Click here to start register your client](https://login.elixir-czech.org/oidc/manage/dev/dynreg) (Elixir AAI login required) and you'll see this dashboard 

    ![image](/src/authnz/config/oidc/idps/elixir-aai/register-a-new-client-1.png)

    b. Click the green "New Client" button:

    ![image](/src/authnz/config/oidc/idps/elixir-aai/register-a-new-client-2.png)

    c. Fill in the "Client name" and "Redirect URI":

    ![image](/src/authnz/config/oidc/idps/elixir-aai/register-a-new-client-3.png)

    d. Probably good to fill in "Terms of Service", "Home Page" URIs etc, and at least list one contact e-mail for your Galaxy server admin/contact person.

    e. For the other tabs: Access, Credentials etc, you can let them be as they are using the default choices (and we'll deal with attribute scopes shortly below).

    f. Click the green "Save" button at the bottom (or at the top) and make a note of alle the generated credentials that is made available to you (you will need it later, in the next step of and to configure your Galaxy):

    ![image](/src/authnz/config/oidc/idps/elixir-aai/register-a-new-client-3.png)

    g. Drop the following information by e-mail to aai-contact@elixir-europe.org: 
       - Name of your service

       - Description of your service

       - Your service’s Client_id

    h. Wait for a reply from Elixir AAI with a form for you to complete. It includes requesting which attribute scopes should be returned to Galaxy when users authenticate. We recomment to only request openid and email scopes, as this is the minimum that is needed and will be utilized by Galaxy.

    i. Return the prefilled form and when accepted, the Elixir AAI service is ready to receive autentication requests from your Galaxy server! Of course you also need to confiugure your Galaxy first, so read on under "Galaxy Configuration" below!  

   
3. Step 3 - When you are ready for production deployment, you can promote your service from the test environment to the prod environment following the described administrative provedures in Step 3 of the  [Elixir AAI - Manual for Service Providers](https://docs.google.com/document/d/1ihb0hH2YJqSCPZS0syVpvAOeQP1HTxdf_XMsZZLe_W0/edit).






# Galaxy Configuration

You would need to setup you Galaxy instance to leverage OIDC protocol.
This setup is common for all OIDC IdPs, and is
[documented at this page](/src/authnz/config/oidc/index.md#configure-oidc-backends).
Then you would need to add Elixir AAI-specific setters to the `config/oidc_backends_config.xml` matching the values you got from the client registration process, as well as the exact same redirect_uri you specified (depending on your setup):

```xml
<?xml version="1.0"?>
<OIDC>
    <provider name="Elixir">
        <client_id> ... </client_id>
        <client_secret> ... </client_secret>
        <redirect_uri>https://my-glx.ex/authnz/elixir/callback</redirect_uri>
        <prompt>consent</prompt>
    </provider>
</OIDC>
```

See [this section](/src/authnz/config/oidc/index.md#supported-oidc-idps)
for more details.


Having set this configuration, restart Galaxy to have the option of login to
Galaxy with Elixir AAI enabled.

![image](/src/authnz/config/oidc/idps/elixir-aai/login-including-elixir.png)