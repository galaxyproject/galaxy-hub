---
title: Login to Galaxy Using Your Globus Account
highlight: true
---

_This page explains how to use this feature, for admin-specific docs, please refer to [this](/src/authnz/config/oidc/idps/globus/index.md) page._

We currently support login to a Galaxy instance using your Globus account,
[programmatically](#login-programmatically); and we're working on necessary 
UI components. 


## Login Programmatically

You can login to Galaxy using your Globus credentials by directly interacting with Galaxy's 
[`authnz` controller](https://github.com/galaxyproject/galaxy/blob/eba0eb6f0865679c09e9896c410957bc6cb2927a/lib/galaxy/webapps/galaxy/controllers/authnz.py#L17). 
To do so, you may take the following steps:

1. Type the following address in your browser, after replacing `[Base URI]` with the URI of your Galaxy instance:

    ```
    [Base URI]/authnz/globus/login
    ```

    In other words, send an HTTP [`GET`](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3) request to the 
    aforementioned URI.

2. In response, Galaxy returns a JSON object containing `redirect_uri`, which is a URL to Globus's 
authorization endpoint with all the information required to identifying your Galaxy instance. For instance:

    ```json
    {
       "redirect_uri": "https://auth.globus.org/v2/oauth2/authorize?nonce= ... &state= ... &redirect_uri=http://localhost:8080/authnz/globus/callback&prompt=consent&response_type=code&client_id= ... &scope=openid+profile+email&access_type=offline",
    }
    ```

    Copy this URI and pasted it in your browsers's address bar; or in other words, send a `GET` request to this URL.

3. You would then see Globus's login page (if you're not already logged in), 
then login via your preferred method, which then you would be taken to Galaxy 
and will automatically login.  



## How to disconnect my Globus account from Galaxy? 
When you're logged into Galaxy using your Globus account, visit the following page:

```
[Base URI]/authnz/globus/disconnect
```

where `[Base URI]` is the URL from which the Galaxy instance you're using is accessible. For instance:

```
http://localhost:8080/authnz/globus/disconnect
```

The disconnect process will remove all your Globus account tokens from Galaxy's database, but 
will keep your Galaxy user account active.
 