---
title: Login to Galaxy Using Your Google Account
highlight: true
---

_This page explains how to use this feature, for admin-specific docs, please refer to [this](/src/authnz/config/oidc/idps/google/index.md) page._

You can login to a Galaxy instance (if this feature is enabled on that instance) using your Google account. 
You may use this feature if: 

- you do not have a Galaxy user account, and instead of creating one, you may want to login to Galaxy 
using your Google account;

- you do have a Galaxy user account, and want to associate that account with your Google account, 
hence you would be able to login to Galaxy either using you Galaxy username and password, or 
your Google account. 

Galaxy offers two method for login: via [UI](#login-via-user-interface), or [programmatically](#login-programmatically). 


## Login via User Interface 

In order to login to Galaxy using your Google account, take the following steps:

1. Click on the **Login or Register** button:

    ![image](/src/authnz/use/oidc/idps/google/01.png)

2. Click on the **Sign in with Google** button:

    ![image](/src/authnz/use/oidc/idps/google/02.png)

    <div class="alert alert-info" role="alert">
        **NOTE:**
        
        If this button is not displayed, then either OIDC is 
        not enabled on the instance of Galaxy you are using, or its Google backend is not configured, regardless 
        you would need to contact the admin of that Galaxy instance.
    </div>

3. Clicking on the **Sign in with Google** button will take you to Google's login page, 
where you would need to login with your Google account:

    ![image](/src/authnz/use/oidc/idps/google/03.png)
    
    <div class="alert alert-info" role="alert">
        **NOTE:**
        
        You will **NOT** see Google's **consent** screen, that is because Galaxy asks Google for your
        basic profile info---the minimum possible information---and Google does not show consent for 
        this basic information. In other words, Galaxy sets OIDC "scope" to "openid", which is the
        minimum scope value that request only your email address and profile name; and by design, Google
        does NOT show consent screen for this scope.
    </div>


4. Having logged in to Google, Google will redirect you back to 
Galaxy, and you will be logged in to Galaxy with your Google account.

## Login Programmatically

You can login to Galaxy using your Google credentials by directly interacting with Galaxy's 
[`authnz` controller](https://github.com/galaxyproject/galaxy/blob/eba0eb6f0865679c09e9896c410957bc6cb2927a/lib/galaxy/webapps/galaxy/controllers/authnz.py#L17). 
To do so, you may take the following steps:

1. Type the following address in your browser, after replacing `[Base URI]` with the URI of your Galaxy instance:

    ```
    [Base URI]/authnz/google/login
    ```

    In other words, send an HTTP [`GET`](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3) request to the 
    aforementioned URI.

2. In response, Galaxy returns a JSON object containing `redirect_uri`, which is a URL to Google's 
authorization endpoint with all the information required to identifying your Galaxy instance. For instance:

    ```json
    {
       "redirect_uri": "https://accounts.google.com/o/oauth2/auth?nonce= ... &state= ... &redirect_uri=http://localhost:8080/authnz/google/callback&prompt=consent&response_type=code&client_id= ... .apps.googleusercontent.com&scope=openid+email+profile&access_type=offline",
    }
    ```

    Copy this URI and pasted it in your browsers's address bar; or in other words, send a `GET` request to this URL.

3. You would then see Google's login page, and having successfully signed in, Google will callback Galaxy with 
your authentication information, which Galaxy uses to log you in.  



## What happens behind-the-scenes when I login to Galaxy using my Google account?
In nutshell, Galaxy receives basic information about your Google account (e.g., email address) and some OIDC security
tokens such as [ID token](http://openid.net/specs/openid-connect-core-1_0.html#IDToken) and 
[Access token](https://www.oauth.com/oauth2-servers/access-tokens/). Galaxy stores these information, and 
then it automatically creates a Galaxy user with its username and email set to your Google email address
(if you do not have a Galaxy user account).

## What information about my Google account is shared with Galaxy?
Galaxy requests Google for the most basic information about your account that are essential to validate your identity.
These information are _email address_ and _basic profile info_. 
You may [see this Google's page](https://developers.google.com/identity/protocols/googlescopes#openid_connect) 
about what information of your account is shared with Galaxy. 


<div class="alert alert-info" role="alert">
    **Note:**
    Neither your _email address_ and _basic profile info_, nor the OIDC tokens that Google sends to Galaxy, 
    grants Galaxy with access to services tied to your Google account, such as your Google drive.
</div> 


## How to disconnect my Google account from Galaxy? 
When you're logged into Galaxy using your Google account, visit the following page:

```
[Base URI]/authnz/google/disconnect
```

where `[Base URI]` is the URL from which the Galaxy instance you're using is accessible. For instance:

```
http://localhost:8080/authnz/google/disconnect
```

The disconnect process will remove all your Google account tokens from Galaxy's database, but 
will keep your Galaxy user account active (this user is registered automatically with your Google email address).


## How to revoke the OIDC tokens shared with Galaxy?
You can revoke all the security tokens Google issued for Galaxy. These tokens are used to validate your identity for
the first time, and re-validate when the tokens are expired. You can revoke these tokens (a complementary step to 
the disconnect process), which will (a) invalidate the tokens stored in Galaxy's database, and (b) will prevent Galaxy
from being able to refresh expired tokens. 

To do so, visit [this page](https://myaccount.google.com/permissions), click on the icon of the Galaxy
instance (you may see multiple (and possibly similar) Galaxy icons, if you have logged in to multiple Galaxy 
instances), and then click on the _REMOVE ACCESS_ button. Note, the name and icon of Galaxy instances
on this page can vary, as these info are provided by an admin of a Galaxy instance and each admin can decide for
different name and icon. However, once you clicked on the icon, Google informs you about the homepage and type of 
access the application has. 


<div class="alert alert-info" role="alert">
    **Note:**
    
    Your Galaxy account is independent from your third-party identity (e.g., Google account). 
    Therefore, regardless of disconnecting your third-party identity or revoking Galaxy's 
    OIDC-based access to your account, your Galaxy account stays active. The only tie this 
    account has to your third-party identity after the disconnect and access revoke, is
    your email address. To delete this, you need to delete your Galaxy user.
</div>
 