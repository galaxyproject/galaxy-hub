---
title: User authentication via OpenID Connect identity providers
---

Galaxy has a built-in mechanism for creating and managing users (identites) via standard username and password login.
However, to facilitate using Galaxy for new users, we also allow login using identities on tursted identity providers
(e.g., Google). 

This feature should be enabled on your instance by the instance admin
([see how to enable it](/src/admin/authentication/config/index.md)); then you can use it is shown in the following.

Just hit the **Login with Google** button, and you're all set!

See the following demo:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=fx2sY41aM8A
" target="_blank"><img src="http://img.youtube.com/vi/fx2sY41aM8A/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>


In general, you may try either of the following methods to login using your third-party identities: 

1. Go to `Login or Register > Login > Login with Google`;
2. On the address bar of your browser type: `<base>/authnz/google/login` for instance:
`localhost:8080/authnz/google/login`.


#### What happens behind-the-scenes when I login to Galaxy using my Google account?
In nutshell, Galaxy receives basic information about your Google account (e.g., email address) and some OIDC security
tokens such as [ID token](http://openid.net/specs/openid-connect-core-1_0.html#IDToken) and 
[Access token](https://www.oauth.com/oauth2-servers/access-tokens/). Galaxy stores this information, and 
then it automatically creates a Galaxy user with its username and email set to your Google email address. 

#### What information about my Google account is shared with Galaxy?
Galaxy requests Google for the most basic information about your account which are essential to validate your identity.
These information are _email address_, _basic profile info_, and OpenID Connect tokens (e.g., ID token). 
You may [see this Google's page](https://developers.google.com/identity/protocols/googlescopes#openid_connect) 
about what information of your account is shared with Galaxy.


#### How to disconnect my Google account from Galaxy? 
When you're logged into Galaxy using your Google account, visit the following page:

    <base>/authnz/google/disconnect

For instance:

    http://localhost:8080/authnz/google/disconnect
    
The disconnect process will remove all your Google account tokens from Galaxy's database, but 
will keep active your Galaxy user (this user is registered automatically with your Google email address).


#### How to revoke the OIDC tokens shared with Galaxy?
You can revoke all the security tokens Google issued for Galaxy. These tokens are used to validate your identity for
the first time, and re-validate when the tokens are expired. You can revoke these tokens (a complementary step to 
the disconnect process). To do so, visit [this page](https://myaccount.google.com/permissions), click on the Galaxy
instance icon in that page, and then click on the _REMOVE ACCESS_ button. Note, the name and icon of Galaxy instances
on this page can vary, as these info are provided by an admin of a Galaxy instance and each admin can decide for
different name and icon. However, once you clicked on the icon, Google informs you about the homepage and type of 
access the application has. 


_*NOTE*_
Your Galaxy account is independent from your third-party identity (e.g., Google account). Therefore, regardless of 
disconnecting your third-party identity or revoking Galaxy's OIDC-based access to your account, your Galaxy account
stays active. The only tie this account has to your third-party identity after the disconnect and access revoke, is
your email address. To delete this, you need to delete your Galaxy user. 
