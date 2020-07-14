---
title: Login to Galaxy with Custos
highlight: true
---

_This page explains how to use this feature, for admin-specific docs, please
refer to the [configuration page](/src/authnz/config/oidc/idps/custos/index.md)._


# About Custos

[Custos](https://airavata.apache.org/custos/) is an [NSF-funded
project](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1840003&HistoricalAwards=false),
backed by open source software that provides science gateways such as Galaxy
with single sign-on, group management, and management of secrets such as access
keys and OAuth2 access tokens. With Galaxy, Custos allows users to login to
Galaxy without having to (explicitly) create a Galaxy user account while being
able to login choosing from more than 3,000 available Identity Providers
(IdPs). Many of the academic institutions from around the world are supported
allowing users to link their institutional identities with a Galaxy account.


# Link an existing Galaxy account

If you already have a Galaxy account with a username and password, you can link
that account to a desired external identity. To do this, sign in using your
existing username and password. Then proceed to the user preferences,
Third-party identity management page.

![image](/src/authnz/use/oidc/idps/custos/user-preferences.png)

From there, click on the *Sign in with Custos* button and follow through to
sign in using your desired identity provider. In the process, you will be
redirected to the identity provider login page before returning to Galaxy.

Afterwards, any identity providers linked to your account will be listed on
this user preferences page. Once an account has been linked, you can sign in
using either the user name and password or the external identity (as shown
below). Note that you will need to always sign in with an identity that has
been linked to gain access to the original Galaxy account.


# Sign in to Galaxy via Custos

Regardless if your are logging in for the first time or after you have linked
your existing Galaxy account to an external identity, use the following steps
to sign in.

Head to the login page, select the desired identity provider from the drop down
menu, and click *Sign in with Custos*. You will be redirected to the identity
provider's login page and after authenticating, you will automatically return
to Galaxy as a logged in user.

1. Click on the **Login or Register** button:

    ![image](/src/authnz/use/oidc/idps/google/01.png)

2. Choose an identity provider and click the **Sign in with Custos** button.
   You will then be redirected to the selected identity provider's login screen
   where you can login using your credentials. Having logged in the selected
   institution, you will be redirected back to Galaxy and you will be logged in
   to Galaxy with your external account.

    ![image](/src/authnz/use/oidc/idps/custos/custos-login-flow.png)

    <div class="alert alert-info" role="alert">
        **NOTE:**

        If this option is not displayed, then either OIDC is
        not enabled on the instance of Galaxy you are using, or its Custos
        backend is not configured. Regardless, you would need to contact the
        administrator of that Galaxy instance to enable it.
    </div>


# Disconnect an account from Galaxy

If you have used an external identity to login to Galaxy and would like to
disconnect it, you can do so from the [User preferences, Third-party identity
management page](#link-an-existing-galaxy-account).

Keep in mind that once disconnected, you will not be able to sign in using that
identity. At a minimum, you should know (or reset) your password before
disconnecting.

To disconnect an identity, simply click the *Disconnect Custos* button from
the Third-party identity management preferences page.

![image](/src/authnz/use/oidc/idps/custos/disconnect-idp.png)
