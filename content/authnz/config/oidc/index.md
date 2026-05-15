---
title: User Authentication Using Social and Institutional Identities
highlight: true
---

_This page explains how to configure this feature as an administrator,
for user-specific docs, please refer to the [Use page](/authnz/use/oidc/)._

Leveraging the [OpenID Connect (OIDC)
protocol](https://developer.okta.com/blog/2019/10/21/illustrated-guide-to-oauth-and-oidc)
users can login to Galaxy using their social and institutional identities
(e.g., their University or Google account). This method allows for new user
registration or linking of an existing Galaxy user account with external
identities.


**Related publications:**

- Jalili, Vahid, et al. ["Cloud bursting galaxy: federated identity and access management."](https://doi.org/10.1093/bioinformatics/btz472) Bioinformatics 36.1 (2020): 1-9.


# Supported Identity Providers

Before using OIDC-based login, it is necessary for a Galaxy system
administrator to configure their Galaxy instance (see below) as well as obtain
the necessary registrations from the Identity Providers (IdP).The IdP needs to
support the OIDC protocol and Galaxy currently supports the following OIDC
IdPs:

- [CILogon](/authnz/config/oidc/idps/cilogon/)
- [Elixir AAI](/authnz/config/oidc/idps/elixir-aai/)
- [Globus](/authnz/config/oidc/idps/globus/)
- [Google](/authnz/config/oidc/idps/google/)
- [Okta](/authnz/config/oidc/idps/okta/)


# Enable OIDC-based Login

The OIDC-based login in Galaxy is disabled by default, and to enable it take
the following steps:

1. In your Galaxy home directory, go to the `config` folder and create a copy
of `galaxy.yml.sample` and name it `galaxy.yml` if you have not done that yet.

2. Open the `galaxy.yml` file and uncomment `enable_oidc`, `oidc_config_file`,
and `oidc_backends_config_file` attributes and set them
   as follows (you may adjust the file names as needed):

    ```
    # Enables and disables OpenID Connect (OIDC) support.
    enable_oidc: true
  
    # Sets the path to OIDC configuration file.
    # The value of this option will be resolved with respect to
    # <config_dir>.
    oidc_config_file: oidc_config.xml
  
    # Sets the path to OIDC backends configuration file.
    # The value of this option will be resolved with respect to
    # <config_dir>.
    oidc_backends_config_file: oidc_backends_config.xml
    ```

3. Create the `oidc_config.xml` and `oidc_backends_config.xml`
   files by copying their `.sample` files. The following sections describe the
   attributes of those files while the IdP-specific pages listed above provide
   details on setting up the specific provider. Make sure to refer to the
   provider-specific documentation because each provider requires and supports
   a slightly different set of attributes.


# Global OIDC Configuration

Some configurations are common between all the IdPs. These configurations are
set in the `oidc_config.xml` file. Currently, the following properties
are set via this file:

- **Verify SSL**: sets whether the hosts SSL certificates for HTTPS requests
  shall be verified or not. See [this
  documentation](http://docs.python-requests.org/en/v1.0.4/user/advanced/#ssl-cert-verification)
  for details.

- **Requests Timeout**: sets the maximum number of seconds Galaxy should wait
  for a response from the IdP. See [this
  documentation](http://docs.python-requests.org/en/master/user/advanced/#timeouts)
  for details.

- **ID Token Max Age**: sets the duration of time, in seconds, starting from
  the token issue time, during which the token must be valid. This number will
  be sent to IdP, requesting the token to be valid for the number of given
  seconds. Note that this number set the **maximum** duration for token
  validity. A token may be invalidated by an IdP upon the resource owner's
  request, even before the expiration time has reached.


To configure OIDC IdPs with these attributes, you would need to add a `Setter`
tag in the `oidc_config.xml` file. The `Setter` tag takes `Property` (e.g.,
`VERIFY_SSL`), `Value`, and `Type` attributes that define the desired property.
For instance:

```xml
<Setter Property="VERIFY_SSL" Value="False" Type="bool"/>
```

See the following table for the currently supported values for each attribute:

|   | Property           | Default Value | Type  |
|---|--------------------|---------------|-------|
| 1 | `VERIFY_SSL`       | False         | bool  |
| 2 | `REQUESTS_TIMEOUT` | 3600          | float |
| 3 | `ID_TOKEN_MAX_AGE` | 3600          | float |


The following is an example on how to setup this file:

```xml
<?xml version="1.0"?>
<OIDC>
    <Setter Property="VERIFY_SSL" Value="False" Type="bool"/>
    <Setter Property="REQUESTS_TIMEOUT" Value="3600" Type="float"/>
    <Setter Property="ID_TOKEN_MAX_AGE" Value="3600" Type="float"/>
</OIDC>
```


# OIDC configuration options for Identity Providers

Which OIDC IdPs are enabled and configured is defined in the
`oidc_backends_config.xml` file. Each `provider` block enables and
defines an IdP. There could be multiple providers defined in this file and each
provider needs to be configured with settings specific to that IdP. Note that you may
define multiple **different** IdPs, but you cannot define multiple instances of
same IdP (e.g., you cannot have multiple `Google` configurations).

The following is a sample configuration for a provider. Configuration
attributes required by all providers are described below. Each provider
supports additional attributes, some required and some optional so make sure to
look at the provider-specific pages for how to configure it.

```xml
<?xml version="1.0"?>
<OIDC>
    <provider name="keycloak">
        <client_id>gxyclient</client_id>
        <client_secret>15Ur37stVGwvONALNjjq89ezRXxoKuunFzvEeTDY</client_secret>
        <redirect_uri>http://localhost:8080/authnz/keycloak/callback</redirect_uri>
        <url>https://my.keycloak.server/realms/gxyrealm</url>
    </provider>
</OIDC>
```

## Client ID

The `client_id` is a required string attribute that identifies your Galaxy
instance to the IdP. It is obtained from the IdP and it is unique to the IdP.
The [client identifier](https://tools.ietf.org/html/rfc6749#section-2.2) is not
a secret; it is exposed to the resource owner and must not be used alone for
client authentication.

You need to obtain this ID by registering your Galaxy instance with an IdP. See
the aforementioned links on how to register your Galaxy instance (aka client)
with the specific providers. Having obtained the ID, set it using the following
attribute:

```xml
<client_id> ... </client_id>
```

## Client Secret

The `client_secret` is a required string attribute generated by IdP for your
Galaxy client upon its registration with the IdP. You may use the following
configuration option for client secret:

```xml
<client_secret> ... </client_secret>
```

## Redirect URI

The `redirect_uri` is a required attribute representing the absolute endpoint
of your Galaxy instance. You provide the [redirect
URI](https://tools.ietf.org/html/rfc6749#section-3.1.2) to the IdP when
registering your Galaxy instance and the IdP will call back your Galaxy
instance at that URI upon successful user authentication.

In the case of Galaxy, this redirect URI has the following structure:

```
<Host URI>/authnz/<provider>/callback
```

where the `Host URI` is the domain name of your Galaxy server and the
`provider` is one of the OIDC provider names supported by Galaxy, as listed
above. For instance:

- When using `localhost` to authenticate with Google:

    ```
    http://localhost:8080/authnz/google/callback
    ```

- When using `localhost` to authenticate with Globus:

    ```
    http://localhost:8080/authnz/globus/callback
    ```

- When using an instance hosted at `https://usegalaxy.org` with Google:

    ```
    https://usegalaxy.org/authnz/google/callback
    ```

Please mind `http` and `https`.

Having defined your instance URI for an IdP following the aforementioned
template, set it as the following configuration attribute and use the same URI
for when registering your Galaxy as a client with an IdP.

```xml
<redirect_uri> ... </redirect_uri>
```

For instance:

```xml
<redirect_uri>http://localhost:8080/authnz/google/callback</redirect_uri>
```

As mentioned, each provider supports additional attributes, some required and
some optional so make sure to look at the provider-specific pages for how to
configure the specific provider.
