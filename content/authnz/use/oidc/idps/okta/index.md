---
title: Login to Galaxy Using Your Organization's Okta identity
highlight: true
---

_This page explains how to use this feature, for admin-specific docs, please refer to [this](/src/authnz/config/oidc/idps/okta/index.md) page._

You can login to a Galaxy instance (if this feature is enabled on that instance) using your organization's Okta identity. 
You may use this feature if: 

- you do not have a Galaxy user account, and instead of creating one, you may want to login to Galaxy 
using your organization's Okta login;

- you do have a Galaxy user account, and want to associate that account with your organization's Okta identity, 
hence you would be able to login to Galaxy either using you Galaxy username and password, or 
your organization's Okta credentials.

Galaxy offers two method for login: via [UI](#login-via-user-interface), or [programmatically](#login-programmatically). 


## Login via User Interface 

In order to login to Galaxy using your organization's Okta identity, take the following steps:

1. Click on the **Login or Register** button:

    ![image](/src/authnz/use/oidc/idps/okta/01.png)

2. Click on the **Okta** button:

    ![image](/src/authnz/use/oidc/idps/okta/02.png)

    <div class="alert alert-info" role="alert">
        **NOTE:**
        
        If this button is not displayed, then either OIDC is not enabled on the instance of 
	    Galaxy you are using, or its Okta backend is not configured, regardless you 
	    would need to contact the admin of that Galaxy instance.
    </div>

3. Clicking on the **Okta** button will take you to your organization's Okta login page, 
where you would need to login with your organization's Okta associated credentials, such as your active directory account:

4. Having completed login through your organization's Okta service, you  will be redirected back to 
Galaxy, and you will be logged in to Galaxy with your organization's Okta identity.

## Login Programmatically

You can login to Galaxy using your organization's Okta credentials by directly interacting with Galaxy's 
[`authnz` controller](https://github.com/galaxyproject/galaxy/blob/eba0eb6f0865679c09e9896c410957bc6cb2927a/lib/galaxy/webapps/galaxy/controllers/authnz.py#L17). 
To do so, you may take the following steps:

1. Type the following address in your browser, after replacing `[Base URI]` with the URI of your Galaxy instance:

    ```
    [Base URI]/authnz/okta/login
    ```

    In other words, send an HTTP [`GET`](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3) request to the 
    aforementioned URI.

2. In response, Galaxy returns a JSON object containing `redirect_uri`, which is a URL to your organization's Okta 
authorization endpoint with all the information required to identifying your Galaxy instance. For instance:

    ```json
    {
       "redirect_uri": "https://organization.okta.com/o/oauth2/auth?nonce= ... &state= ... &redirect_uri=http://localhost:8080/authnz/okta/callback&prompt=consent&response_type=code&client_id= ... organization.okta.com&scope=openid+email&access_type=offline",
    }
    ```

    Copy this URI and pasted it in your browsers's address bar; or in other words, send a `GET` request to this URL.

3. You would then see your organization's Okta login page, and having successfully signed in, and Okta will callback Galaxy with 
your authentication information, which Galaxy uses to log you in.  



## What happens behind-the-scenes when I login to Galaxy using my organization's Okta identity?

In nutshell, Galaxy receives basic information about you from the Okta service (e.g., email 
address) and some OIDC security tokens such as [ID token](http://openid.net/specs/openid-connect-core-1_0.html#IDToken) 
and [Access token](https://www.oauth.com/oauth2-servers/access-tokens/). Galaxy stores these 
information, and then it automatically creates a Galaxy user with its username and email set to 
the information provided by Okta (if you do not have a Galaxy user account).


<div class="alert alert-info" role="alert">
    **Note:**
    Neither your _email address_ and _basic profile info_, nor the OIDC tokens that Okta 
    sends to Galaxy, grants Galaxy with access to any other services tied to your organization's Okta 
    identity.
</div> 


## How to disconnect my organization's Okta account from Galaxy? 

When you're logged into Galaxy using your Okta identity, visit the following page:

```
[Base URI]/authnz/okta/disconnect
```

where `[Base URI]` is the URL from which the Galaxy instance you're using is accessible. For instance:

```
http://localhost:8080/authnz/okta/disconnect
```

The disconnect process will remove all your organization's Okta provided tokens from Galaxy's database, but 
will keep your Galaxy user account active (this user is registered automatically with your email address).


## How to revoke the OIDC tokens shared with Galaxy also from your organization's Okta service?

These tokens are used to validate your identity for the first time, and re-validate when the 
tokens are expired. You can revoke these tokens (a complementary step to 
the disconnect process), which will (a) invalidate the tokens stored in Galaxy's database, 
and (b) will prevent Galaxy from being able to refresh expired tokens. 

This is not yet supported in a self-service manner for your organization's Okta service, 
please contact your organization's Okta specialist if you wish to have your tokens revoked.


<div class="alert alert-info" role="alert">
    **Note:**
    
    Your Galaxy account is independent from your third-party identity (e.g., Okta). 
    Therefore, regardless of disconnecting your third-party identity or revoking Galaxy's 
    OIDC-based access to your account, your Galaxy account stays active. The only tie this 
    account has to your third-party identity after the disconnect and access revoke, is
    your email address. To delete this, you need to delete your Galaxy user.
</div>
 
