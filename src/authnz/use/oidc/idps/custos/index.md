---
title: Login to Galaxy with Custos
highlight: true
---

_This page explains how to use this feature, for admin-specific docs, please
refer to the [configuration page](/src/authnz/config/oidc/idps/custos/index.md)._


## What is Custos and when should I use it?

Custos allows you to login to Galaxy without using a Galaxy username and
password but instead use one of your other online identities, such as Google.
Custos is the recommended way to login to Galaxy. However, before you proceed,
read the rest of this page.


## Link an existing Galaxy account

If you already have a Galaxy account with a username and password and want to
transition to using an external identity, **you must first link the existing
Galaxy account to the desired external identity**.

<div class="alert alert-info" role="alert">
    **IMPORTANT:** If you sign in with an external identity that has not been 
    linked to your existing Galaxy account, a new Galaxy account will be created. 
    This may violate the policy of a given Galaxy server and will make it 
    impossible to associate that identity with an existing Galaxy account.
</div>

1. Sign in to Galaxy using your existing username and password;
2. Proceed to the User -> Preferences -> Manage Third-Party Identities page;
3. Click on the *Sign in with Custos* button and follow through to
   sign in using your desired identity provider. In the process, you will be
   redirected to the identity provider login page before returning to Galaxy.

   ![image](/src/authnz/use/oidc/idps/custos/user-preferences.png)

Once you have completed these steps, any identity provider linked to your
account will be listed on the user preferences page. From now on you can sign
in to Galaxy using either the user name and password or the external identity
(as shown below). 

## Sign in to Galaxy via Custos

Regardless if your are logging in for the first time or after you have linked
your existing Galaxy account to an external identity, use the following steps
to sign in.

Head to the Galaxy login page, select the desired identity provider from the
drop down menu, and click *Sign in with Custos*. You will be redirected to the
identity provider's login page and, after authenticating, you will automatically
return to Galaxy as a logged in user.

1. Click on the **Login or Register** button:

    ![image](/src/authnz/use/oidc/idps/google/01.png)

2. Choose an identity provider and click the **Sign in with Custos** button.
   You will then be redirected to the selected identity provider's login screen
   where you can login using your credentials. Having logged in the selected
   institution, you will be redirected back to Galaxy and you will be logged in
   to Galaxy with your external identity.

    ![image](/src/authnz/use/oidc/idps/custos/custos-login-flow.png)

    <div class="alert alert-info" role="alert">
        **NOTE:**

        If this login option is not displayed, then either OIDC is
        not enabled on the instance of Galaxy you are using, or its Custos
        backend is not configured. Regardless, you would need to contact the
        administrator of that Galaxy instance to enable it.
    </div>


## Disconnect an account from Galaxy

If you have used an external identity to login to Galaxy and would like to
disconnect it, you can do so from the User -> Preferences -> Third-party Identity
Management page.

Keep in mind that once disconnected, you will not be able to sign in using that
identity. At a minimum, you should know (or reset) your password before
disconnecting.

To disconnect an identity, simply click the *Disconnect Custos* button from
the Third-party identity management preferences page.

![image](/src/authnz/use/oidc/idps/custos/disconnect-idp.png)


## About Custos

[Custos](https://airavata.apache.org/custos/) is an [NSF-funded
project](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1840003&HistoricalAwards=false),
backed by open source software that provides science gateways such as Galaxy
with single sign-on, group management, and management of secrets such as access
keys and OAuth2 access tokens. With Galaxy, Custos allows users to login to
Galaxy without having to (explicitly) create a Galaxy user account. When logging
in via Custos, there are more than 3,000 available Identity Providers (IdPs),
including many academic institutions from around the world, allowing users to
link their institutional identities with a Galaxy account.