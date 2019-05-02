---
title: Login to Galaxy with Custos
highlight: true
---

_This page explains how to use this feature, for admin-specific docs, please refer to [this](/src/authnz/config/oidc/idps/custos/index.md) page._

Custos is an [NSF-funded project](https://www.nsf.gov/awardsearch/showAward?AWD_ID=1840003&HistoricalAwards=false), backed by open source software, that will provide science gateways such as Galaxy
with federated authentication, single sign-on across multiple science gateway
user environments, group management, and management of secrets such as access
keys and access tokens. With Galaxy, Custos allows users to login to
Galaxy without having to (explicitly) create a Galaxy user account while being
able to login using of more than 3,000 available Identity Providers (IdPs). Many
of the academic institutions from around the world are supported allowing users
to link their institutional identities with a Galaxy account.

In order to login to Galaxy using Custos, take the following steps:

1. Click on the **Login or Register** button:

    ![image](/src/authnz/use/oidc/idps/google/01.png)

2. Click on the **Sign in with Custos** button:

    ![image](/src/authnz/config/oidc/idps/custos/custos-login-button.png)

    <div class="alert alert-info" role="alert">
        **NOTE:**

        If this button is not displayed, then either OIDC is
        not enabled on the instance of Galaxy you are using, or its Custos
        backend is not configured. Regardless, you would need to contact the
        administrator of that Galaxy instance to enable it.
    </div>

3. Clicking the button will take you to the [CILogon](https://www.cilogon.org/)
page where you can choose which identity to login with. Custos uses CILogon
to broker between the various identities.

    ![image](/src/authnz/use/oidc/idps/custos/cilogon.png)

4. You will then be redirected to the selected institution login screen where
you can login using your respective credentials.

    ![image](/src/authnz/use/oidc/idps/custos/insititution.png)

5. Having logged in the selected institution, you will be redirected back to
Galaxy and you will be logged in to Galaxy with your institutional account.

    ![image](/src/authnz/use/oidc/idps/custos/logged-in.png)


## How to disconnect my account from Galaxy?
When you are logged into Galaxy, visit the following page:

```
[Base URI]/authnz/custos/disconnect
```

where `[Base URI]` is the URL from which the Galaxy instance you're using is accessible. For instance:

```
http://localhost:8000/authnz/custos/disconnect
```

The disconnect process will remove all your account tokens from Galaxy's
database, but will keep your Galaxy user account active.
