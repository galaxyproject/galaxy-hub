---
title: User Authentication Methods Configuration
---

Authentication Related Code
---

The `lib/galaxy/webapps/galaxy/controllers/user.py` file provides much of the 
authentication-related logic in the User class. Of the supported mechanisms, 
only those needing to perform actual authentication work require any substantial 
amount of code in this file; the integration of “remote user” information is 
performed in the `lib/galaxy/web/framework/__init__.py` file.


Within the User class, code supporting authentication mechanisms will need to 
provide the following things:


- Support within the login method for any additional information shown in the 
login screen. Since the login screen is likely to be modified to show alternative 
authentication methods alongside the conventional e-mail and password fields, 
it is possible that information such as identity providers will also need to 
be made available in order to simplify the experience for users.

- A separate method to handle the initial stage of authentication for the 
mechanism. For example, OpenID authentication requests are handled by the 
openid_auth method initially.

- Additional methods to handle any subsequent stages of authentication. 
For example, OpenID authentication involves the handling of subsequent 
requests in the openid_process, openid_associate and openid_manage methods.


Database Tables
---

The database employs a galaxy_user table which records the details of all 
registered users, and this table is exposed to the code through the User 
abstraction found in lib/galaxy/model/mapping.py. Each logged-in user is 
assigned a session which references the user in the galaxy_session table 
(exposed via GalaxySession).

User information from external sources, such as OpenID, is found in 
peripheral tables such as galaxy_user_openid (exposed by UserOpenID) 
and references the registered user and session of that user.


Authenticating a User
---

The following steps are followed in any code that seeks to recognise a 
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
