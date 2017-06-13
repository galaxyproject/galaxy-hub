---
title: Nginx External User Authentication
---

# Nginx External Authentication

By default, Galaxy manages its own users. However, it may be more useful at your site to tie into a local authentication system. Galaxy does not do this itself - it delegates this responsibility to the upstream proxy server.

The setup for external authentication with nginx varies depending on your authentication methods. Modules exist for [Kerberos](https://github.com/fintler/nginx-mod-auth-kerb) and [LDAP](http://code.google.com/p/nginx-auth-ldap/) authentication, although those have not been tested.

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

```nginx

location /api {
    auth_pam off;
    allow all;
    ...
    proxy_pass http://galaxy_app;
    ...
}
```

## PAM

The [PAM](https://en.wikipedia.org/wiki/Pluggable_authentication_module) nginx authentication module has been used with success, and is suitable for use when you can use the system PAM stack to configure the valid authenticators. Most likely you'll need to recompile nginx to include your desired authentication module, as none of them are included by default.

You'll need to set up your system's PAM stack, doing this is very site-specific depending on your authentication method, although if your //shell accounts// authenticate the same way as your //galaxy users// you can likely copy the PAM configuration. A PAM configuration that would be suitable for authentication with Kerberos (placed in `/etc/pam.d/nginx` might look like:

```
auth    [success=1 default=ignore]    pam_krb5.so minimum_uid=1000 ignore_k5login
auth    requisite            pam_deny.so
auth    required            pam_permit.so
```


Next, your nginx.conf should be modified like so:

```nginx
location / {
        auth_pam "Basic Auth Realm Name";
        auth_pam_service_name "nginx";
        proxy_pass http://galaxy_app;
        proxy_set_header REMOTE_USER $remote_user;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-URL-SCHEME https;
}
```

The value of `auth_pam_service_name` must match the filename of the pam configuration you created in `/etc/pam.d/`.

## Other

If you have experience with other authentication stacks, please do not hesitate to share.
