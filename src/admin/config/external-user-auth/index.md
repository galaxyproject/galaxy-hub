---
title: External User Authentication
---

By default, Galaxy will manage its own users, allowing standard username/password login. However, it may be more useful at your site to tie into an external authentication system like CAS, LDAP, AD, PAM, etc.

Galaxy supports LDAP and AD authentication natively, but you must still use upstream [Nginx](/src/admin/config/nginx-external-user-auth/index.md) or [Apache](/src/admin/config/apache-external-user-auth/index.md) for other authentication schemes like CAS.

# Activate authentication through LDAP

To be able to authenticate your users through the LDAP, we are going to use a configuration file to enter all the required informations.

# Tell Galaxy to use auth_conf file

In `config/galaxy.yml`, uncomment the line `auth_config_file: config/auth_conf.xml`:

```
# XML config file that allows the use of different authentication providers
# (e.g. LDAP) instead or in addition to local authentication (.sample is used
# if default does not exist).
auth_config_file: config/auth_conf.xml
```

# Configure the auth_conf file

Copy the `config/auth_conf.xml.sample` and name it `config/auth_conf.xml`:

```
cp config/auth_conf.xml.sample config/auth_conf.xml
```

Then configure it appropriately to your LDAP (the documentation in the sample file should be enough).

# Special Case: AD in CRUK

In CRUK, the Active Directory does not allow to get `sAMAccountName`.

We had to find another solution to get the Authentication working, register properly and get the username.

## Modifications in auth_conf file

Here are the modifications we had to do in the `config/auth_conf.xml`:

```
<bind-user>{email}</bind-user>
<bind-password>{password}</bind-password>
<auto-register-username>{usernameFromWhoami}</auto-register-username>
<auto-register-email>{email}</auto-register-email>
```

We can notice a new variable: `usernameFromWhoami`

Then, we had to modify the `lib/galaxy/auth/providers/ldap_ad_py` file to add this variable:

After the line: `import logging`, we imported the regexp python library:

```
import re
```

Then, we fetched the username through the `whoami_s` ldap-python library:

After the line `whoami = l.whoami_s()`:

```
p = re.compile(ur'[^\\]*$')

username_from_whoami = re.search(p, whoami).group()
params['usernameFromWhoami'] = username_from_whoami
```

Launch Galaxy, and try to login :).

# Migrating to Galaxy-native login

If you wish to migrate to a Galaxy-native login from an existing deployment with upstream Apache or Nginx providing the LDAP/AD connection, you will need to set `external = 'f'` in the `galaxy_user` table for all existing users.

