---
title: Configuration of User Authentication Methods
highlight: true
---

_This page explains how to configure this feature, for user-specific docs, please refer to [this](/src/authnz/use/index.md) page._

# Galaxy Authentication Configuration Options

Galaxy offers [various methods for user authentication](/src/authnz/index.md#user-authentication-and-authorization)
(aka login). All the methods share some common concepts, which are explained on
this page. The method-specific configurations are explained at the following
pages:

- [Galaxy Username and Password](/src/authnz/config/gxy/index.md)
- [Using 3rd party identity](/src/authnz/config/oidc/index.md) (i.e., social login)


# The Internal Process for Authenticating a User

The following steps are followed in any code that seeks to recognize a
user within Galaxy and allow access to the application:

1. The identity credential, currently the e-mail address of the user,
is used to find any previously-registered user in the database.

2. Where no user exists and the login mechanism requires explicit
registration, authentication fails at this point. Otherwise, a user
is automatically created for previously unknown identities.

3. For conventional accounts requiring a password, authentication
fails at this point if a valid password is not specified. Otherwise,
an alternative mechanism for completing authentication may be invoked.

4. Upon completion of the authentication of a user’s identity,
any association of that identity with the Galaxy user instance may
be performed. For example, an OpenID identity may be associated
with a user created for that identity.

5. Finally, the login is handled using the handle_user_login method
on the GalaxyWebTransaction object, associating the user with a new session.


## Authentication Related Source Code

The main **controllers** for user authentication are:

- `User` controller: [lib/galaxy/webapps/galaxy/controllers/user.py](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/webapps/galaxy/controllers/user.py#L35);
- `OIDC` controller: [lib/galaxy/webapps/galaxy/controllers/authnz.py](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/webapps/galaxy/controllers/authnz.py#L17)


The related **managers** are:

- [UserManager](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/managers/users.py#L41);
- [AuthManager](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/auth/__init__.py#L13) (relates to authentication agains local database, LDAP, and PAM);
- [AuthnzManager](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/authnz/managers.py#L31) (relates to OIDC-based authentication).

And the primary related **models** are:

- [User](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/model/__init__.py#L294);
- OIDC:
    - [UserAuthnzToken](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/model/__init__.py#L5040);


## Database Tables

The database employs a [galaxy_user](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/model/mapping.py#L58-L73)
table which records the details of all registered users, and this table
is exposed to the code through the [User](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/model/__init__.py#L294)
abstraction found in [lib/galaxy/model/mapping.py](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/model/mapping.py#L1796-L1830).
Each logged-in user is assigned a session which references the user
in the galaxy_session table (exposed via GalaxySession).

User information from external sources, such as OIDC, is found in
peripheral tables such as:

- Tokens are stored in [UserAuthnzToken](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/model/mapping.py#L124-L132) table;
- implementation-specific (transient) information are stored in peripheral tables such as:
[PSAAssociation](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/model/mapping.py#L93-L101),
[PSACode](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/model/mapping.py#L103-L107),
[PSANonce](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/model/mapping.py#L109-L114), and
[PSAPartial](https://github.com/galaxyproject/galaxy/blob/95d9bfb021bd088cd4adfb950e87a2c6deb6a8ec/lib/galaxy/model/mapping.py#L116-L122).
