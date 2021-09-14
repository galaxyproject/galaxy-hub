---
title: Apache External User Authentication
---

# Apache External Authentication

By default, Galaxy manages its own users. However, it may be more useful at your site to tie into a local authentication system. Galaxy does not do this itself - it delegates this responsibility to the upstream proxy server.

The authentication module (basic authentication, `mod_auth_kerb`, `mod_authnz_ldap`, `mod_auth_cas`, `Cosign`, etc.) is responsible for providing a username, which we will pass through the proxy to Galaxy as `$REMOTE_USER`.

In addition to the chosen module above, `mod_headers` must be enabled in the Apache config, for some types of authentication.

## Generic Galaxy Configuration

<div class="alert alert-warning" role="alert">
This section applies to all authentication methods.
</div>

On the Galaxy side, set `use_remote_user = True` in `galaxy.ini`. If your auth method doesn't provide a full email address in `$(REMOTE_USER`, you'll also need to set `remote_user_maildomain`:

```
use_remote_user = True
remote_user_maildomain = example.org
```

For example, when using basic authentication, only bare usernames (e.g. "`nate`") will be passed to Galaxy. Since Galaxy usernames are full email addresses, `remote_user_maildomain` needs to be set (e.g. to "`example.org`"). On the other hand, auth methods such as `mod_auth_kerb` set the full `nate@example.org` address, so `remote_user_maildomain` should not be set. If you're not sure, Galaxy will tell you via an error message if `remote_user_maildomain` needs to be set.

Users are automatically created in the Galaxy database if the external auth method allows them through. Users created in this manner may not log in if `use_remote_user` is later disabled, since Galaxy does not have a password stored for the user (since the password is managed by the upstream proxy server.)

### API Exception

If you wish your Galaxy to be accessible to command line clients (e.g. bioblend, blend4j, parsec), you will need to add an exception for authentication on the API. Galaxy will still be secure and protected, but non-browser access will be permitted with an API key. If this exception is not provided, many clients will throw errors as they are redirected to the login site under CAS type authentication, or rejected with unauthorized exception.

```apache
<Location "/api/">
    Satisfy Any
    Allow from all
</Location>
```

## Basic Authentication

Basic authentication is configured as it is for any other protected portion of your site (other authentication modules are configured differently):

```apache
AuthType Basic
AuthName Galaxy
AuthUserFile /home/nate/htpasswd
Require valid-user
```

The following options are used to take the `$REMOTE_USER` variable (set by basic authentication) and set it as a header in the proxied environment:

```apache
<Proxy http://localhost:8080>
    Order deny,allow
    Allow from all
</Proxy>
# Take the $REMOTE_USER environment variable and set it as a header in the proxy request.
RewriteEngine on
RewriteCond %{IS_SUBREQ} ^false$
RewriteCond %{LA-U:REMOTE_USER} (.+)
RewriteRule . - [E=RU:%1]
RequestHeader set REMOTE_USER %{RU}e
```

These new directives should be placed in a `<Location>` block, depending on the directory from which you are serving Galaxy. Your entire configuration will now look something like this:

```apache
<Proxy http://localhost:8080>
    Order deny,allow
    Allow from all
</Proxy>

RewriteEngine on
<Location "/">
    # Define the authentication method
    AuthType Basic
    AuthName Galaxy
    AuthUserFile /home/galaxy/htpasswd # Change this to your htpasswd file location
    Require valid-user
    # Take the $REMOTE_USER environment variable and set it as a header in the proxy request.
    RewriteCond %{IS_SUBREQ} ^false$
    RewriteCond %{LA-U:REMOTE_USER} (.+)
    RewriteRule . - [E=RU:%1]
    RequestHeader set REMOTE_USER %{RU}e
</Location>
```

### `mod_authnz_ldap`

The Apache `mod_authnz_ldap` module does not set `$REMOTE_USER` like other auth modules. The following alternate configuration should allow you to use any LDAP attribute as the username to set in `$REMOTE_USER`:

```apache
<Proxy http://localhost:8080>
    Order deny,allow
    Allow from all
</Proxy>

<Location "/">
    AuthType Basic
    AuthBasicProvider ldap
    AuthLDAPURL "ldaps://ldap.example.com:636/ou=People,dc=example,dc=org?uid?sub?(objectClass=person)"
    Require valid-user

    # Set the REMOTE_USER header to the contents of the LDAP query response's "uid" attribute
    RequestHeader set REMOTE_USER %{AUTHENTICATE_uid}e
</Location>
```

The `AuthLDAPURL` and variable in which the username is set will vary and is dependent entirely upon the schema/design of your LDAP database. If your LDAP server is Windows (Active Directory), you may need to use the `%{AUTHENTICATE_sAMAccountName} ` variable.

Note the S/E after substituted variables, transcluded from the [Apache mod_headers](https://httpd.apache.org/docs/2.2/mod/mod_headers.html) documentation:

Variable | Value
-------- | ------
`%{FOOBAR}e` | The contents of the environment variable FOOBAR.
`%{FOOBAR}s` | The contents of the SSL environment variable FOOBAR, if mod_ssl is enabled.

(If anyone has information regarding setting the username under non-https conditions, please provide it!)

## `mod_auth_kerb`

If you are deploying kerberos, it is assumed you know the basics of configuring kerberos enabled webpages.

```apache
<Location "/">
        AuthName "Galaxy"
        AuthType Kerberos
        KrbAuthRealms REALM.EDU
        KrbServiceName HTTP/server.realm.edu@REALM.EDU
        Krb5Keytab /etc/http_server_realm.edu.keytab
        KrbSaveCredentials On
        Require valid-user

        RequestHeader set REMOTE_USER %{REMOTE_USER}s
</Location>
```

We chose to seperate out the keytab for apache, hence the use of Krb5Keytab. Normally that defaults to `/etc/krb5.keytab`.

Note the S/E after substituted variables, transcluded from the [Apache mod_headers](https://httpd.apache.org/docs/2.2/mod/mod_headers.html) documentation:

Variable | Value
-------- | ------
`%{FOOBAR}e` | The contents of the environment variable FOOBAR.
`%{FOOBAR}s` | The contents of the SSL environment variable FOOBAR, if mod_ssl is enabled.

(If anyone has information regarding setting the username under non-https conditions, please provide it!)

## Logging out Basic Auth'd Users

It's [not supposed to be possible](https://httpd.apache.org/docs/1.3/howto/auth.html#basicfaq) due to how HTTP authentication works.

However, this is a common problem and many people have come up with varying quality solutions:

* https://stackoverflow.com/questions/4163122/http-basic-authentication-log-out/
* https://stackoverflow.com/questions/233507/how-to-log-out-user-from-web-site-using-basic-authentication
* https://trac-hacks.org/wiki/TrueHttpLogoutPatch

This was [discussed on the galaxy-dev mailing list](https://lists.galaxyproject.org/archives/list/galaxy-dev@lists.galaxyproject.org/thread/5T5EW5P5VDHXEH3ZDY43N4EXD3OW4OSQ/#5T5EW5P5VDHXEH3ZDY43N4EXD3OW4OSQ), and the solution provided by Tim Booth is detailed below. Please test this thoroughly before using it in your galaxy.

### Creating the Logout area

A world-accessible folder needs to be created, probably named something like "logout". Taking `/usr/share/galaxy-server/logout/` as our example, inside that folder you need to create a .htaccess file

```
# Hack based on http://stackoverflow.com/questions/4163122/http-basic-authentication-log-out
# Authname must match the one for your galaxy server.

AuthType Basic
AuthName Galaxy_Server

AuthUserFile /usr/share/galaxy-server/logout/.htpasswd
Require user logout
```


The `/usr/share/galaxy-server/logout/.htpasswd` file should contain

```
#Password is logout. This in not a secret.
logout:$apr1$0eB1iURY$kwqa0c8tXksbjPQLYqr6s.
```


### Galaxy Configuration Modifications

You will probably need to add the following to your `$GALAXY_ROOT/config/galaxy.ini`:

```
# Not yet tested on IE.
remote_user_logout_href = javascript:var r=new XMLHttpRequest();r.onreadystatechange=function(){if(r.readyState==4)window.location.replace('logout.html')};r.open('get','logout.html',true,'logout','logout');r.send();
```

This code sends an AJAX request to `logout.html` with the username and password of "logout" (variables 4 and 5 in the `r.open` snippet)
