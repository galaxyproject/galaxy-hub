## External user authentication

The setup for external authentication with nginx varies depending on your authentication methods.  Modules exist for [Kerberos](https://github.com/fintler/nginx-mod-auth-kerb) and [LDAP](http://code.google.com/p/nginx-auth-ldap/) authentication, although those have not been tested.  The [PAM](http://en.wikipedia.org/wiki/Pluggable_authentication_module) nginx authentication module has been used with success, and is suitable for use when you can use the system PAM stack to configure the valid authenticators.  Most likely you'll need to recompile nginx to include your desired authentication module, as none of them are included by default.

You'll need to set up your system's PAM stack, doing this is very site-specific depending on your authentication method, although if your //shell accounts// authenticate the same way as your //galaxy users// you can likely copy the PAM configuration.  A PAM configuration that would be suitable for authentication with Kerberos (placed in `/etc/pam.d/nginx` might look like:

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
