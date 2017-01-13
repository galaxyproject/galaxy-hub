# User Accounts Administration

Galaxy admins have an option to turn on the email verification feature to force users to provide working email during the registration. You can also turn on the disposable email domains filter to disable registration for users using known disposable email provider. 

How to set up this config is presented here.

*Note: SQLite database is not supported with this feature. Please use PostgreSQL.*

## Account activation feature

In the Galaxy config file **config/galaxy.ini** there is the user activation setting that you have to turn on.

```
user_activation_on = True
```


There is also the option for tracking jobs in database that is required to be turned on for the account activation to be effective. By default it is off.

```
track_jobs_in_database = True
```


After you turn on both of these every user that will try to register after this configuration file takes effect will have the verification email sent to the email address provided. Unless the Grace period (see below) is set, the user won't be able to login before the verification happens.

Furthermore in order for this to work correctly smtp server and admin email should be set:
```
#smtp_server = some.server.edu:587
#smtp_username = example_username
#smtp_password = example_passsword
#activation_email = activation-noreply@example.com
#error_email_to = admin@example.com
```

Smtp server takes care of the email sending and the activation_email email is used as the *From* address in the verification email. Furthermore the error_email_to is being shown to the user if the Galaxy detects its own misconfiguration.

You can also set the instance_resource_url which is shown in the activation emails so you can point users to your wiki or other materials.
```
instance_resource_url = http://wiki.galaxyproject.org/
```


The final activation email looks like this:

```
Hello <user_name>,

In order to complete the activation process for <user_email> begun on <date> at <hostname>, please click on the following link to verify your account:

test.galaxyproject.org/activate?activation_token=46701ecdbbf2a79a7348ddae33062774edadef59&email=example%40example.com

By clicking on the above link and opening a Galaxy account you are also confirming that you have read and agreed to Galaxy's Terms and Conditions for use of this service (<link_to_terms_config>). This includes a quota limit of one account per user. Attempts to subvert this limit by creating multiple accounts or through any other method may result in termination of all associated accounts and data.

Please contact us if you need help with your account at: <error_email_to_config>. You can also browse resources available at: <instance_resources_url_config>.

More about the Galaxy Project can be found at galaxyproject.org

Your Galaxy Team

```

### Changing email address

If activated user changes email address in user settings his/her account will be deactivated. A new activation link will be sent and user is required to visit it to activate the account again.

### Grace period

In case you want the account activation feature but don't want to disable login completely you can set the **activation_grace_period** parameter. It specifies, in hours, the period in between registration time and the login time that the user will be allowed to log in even with an inactive account. 
```
# Activation grace period. Activation is not forced (login is not disabled) until 
# grace period has passed. Users under grace period can't run jobs (see inactivity_box_content).
# In hours. Default is 3. Enter 0 to disable grace period. 
# Users with OpenID logins have grace period forever. 
#activation_grace_period = 3
```

However with inactive account the user won't be able to run jobs and warning message will be shown to him at the top of the page. It is customizable via the **inactivity_box_content** parameter.
```
# Used for warning box for inactive accounts (unable to run jobs).
# In use only if activation_grace_period is set.
#inactivity_box_content = Your account has not been activated yet. Please activate your account by verifying your email address. For now you can access everything at Galaxy but your jobs won't run.
```

## Disposable email address filtering

<a name="disposable_email_filter"></a>

To prevent users from using disposable email addresses as a workaround for the email verification the domain blacklist can be turned on through the **blacklist_file** path parameter. Users that use disposable email domains defined at the file in this provided path will be refused registration.
```
# E-mail domains blacklist is used for filtering out users that are using disposable email address
# during the registration. If their address domain matches any domain in the BL they are refused the registration.
blacklist_file = config/disposable_email_blacklist.conf
```


Disposable domains blacklist file for download and modification is [at GitHub](https://github.com/martenson/disposable-email-domains/blob/master/disposable_email_blacklist.conf)

In the file each domain is on its own line and without the *@* sign. Example of the blacklist file format:

```
drdrb.com
mailinator.com
sogetthis.com
spamgourmet.com
trashmail.net
kurzepost.de
objectmail.com
proxymail.eu
rcpt.at
trash-mail.at
trashmail.at
trashmail.me
wegwerfmail.de
wegwerfmail.net
wegwerfmail.org
```

