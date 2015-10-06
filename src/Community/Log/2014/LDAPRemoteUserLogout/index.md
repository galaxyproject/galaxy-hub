<div class="title">2014/01: LDAP remoteUser Logout</div>



<div class='logbox'>
 Topic:: **[Problem with logout when using LDAP for authentication with remoteUser enabled.](/Community/Log/2014/LDAPRemoteUserLogout)**
 Date:: 2014/01/27
 Who:: Tim Booth
 Resolution:: Make changes to 4 Galaxy configuration files 
 Deployment::
</div>

Alper Kucukural posted this [Galaxy-Dev thread](http://dev.list.galaxyproject.org/Remote-User-Logout-td4663150.html) about logout problems when using LDAP for authentication with remoteUser enabled.  This page is based on Tim Booth's response.   Furthermore, Eric Rasche also brought these pages up to date to reflect this discussion:

* [/Admin/Config/Apache Proxy.md#proxying-multiple-galaxy-worker-threads](/Admin/Config/Apache Proxy.md#proxying-multiple-galaxy-worker-threads)
* [/Admin/Config/ExternalUserDatbases](/Admin/Config/ExternalUserDatbases)

Many, many thanks to Tim and Eric for this work.

# Tim Booth's Response

I'm currently using one of those hacks, and it seems to work nicely for
the user (Chrome + FF at least) but it does need some messy setting up
in Apache and some cunning redirects in place.  I've pasted the relevant
file fragments below.  It's somewhat confounded with my stuff to enable
SFTP uploads but hopefully you get the idea and the original explanation
on Stackoverflow is pretty good.  The remote_user_logout_href is
something I got to by trial and error.


## /usr/share/galaxy-server/logout/.htaccess

 ```
% cat /usr/share/galaxy-server/logout/.htaccess
# HaCk based on http://stackoverflow.com/questions/4163122/http-basic-authentication-log-out
# Authname must match the one in ../proxy/.htaccess

AuthType Basic
AuthName Galaxy_Server

AuthUserFile /usr/share/galaxy-server/logout/.htpasswd
Require user logout
```


## /usr/share/galaxy-server/logout/.htpasswd
 ```
% cat /usr/share/galaxy-server/logout/.htpasswd
#Password is logout.  This in not a secret.
logout:$apr1$0eB1iURY$kwqa0c8tXksbjPQLYqr6s.
```


## /usr/share/galaxy-server/proxy/.htaccess
 ```
% cat /usr/share/galaxy-server/proxy/.htaccess
# Security settings for Galaxy proxied via Apache.  Note the actual
# proxy config is under /etc/apache2/conf.d/galaxy.  If for some
# reason you wanted Apache proxy with internal Galaxy authentication
# then you could remove this file and Apache would no longer insist on
# authentication.
AuthBasicProvider external
AuthExternal pwauth
AuthType Basic
AuthName Galaxy_Server

#I'd like to do this, but it upsets Firefox. Use ErrorDocument instead.
# AuthName "Galaxy Server: \
# Log in with regular username and password. \
# Users need to be in the galaxy system group."

ErrorDocument 401 "<html>\
<title>401 Authorization Required</title>\
<h1>Log-in to Galaxy failed</h1>\
<p>You should have been prompted to log into the Galaxy server. \
You need to give your regular system username and password. \
Please reload this page to try again.</p>\
<p>If this fails, check that you are a member of the galaxy system
group, by \
running <code>groups</code> on the command line.</p>\
<p>To add a user, eg. user1, to this group, you may use the
command:</p>\
<ul><li><code>sudo usermod -aG galaxy user1</code></ul></li>\
</html>"

# You may want to comment these 2 lines out or to
# change the group required, but users still need to
# be in the galaxy group for SFTP uploads to work properly.
AuthzUnixgroup on
Require group galaxy

# This is needed to tell Galaxy about the remote
# user.
RequestHeader set REMOTE_USER %{RU}e env=RU
RequestHeader unset Authorization env=RU
```


## /etc/galaxy-server/universe_wsgi.d/31_apache-proxy.ini
 ```
% cat /etc/galaxy-server/universe_wsgi.d/31_apache-proxy.ini                        
# Settings added by debian-galaxy-apache-proxy to switch Galaxy over to
# authenticating by real user accounts and also permitting uploads.

[app:main]

# Other scripts assume that maildomain is localhsot, so you can't just
# change the setting below and expect everythig to work.
use_remote_user = True
remote_user_maildomain = localhost

# Users may copy files here directly or upload via SFTP/SCP
ftp_upload_dir = /var/lib/galaxy-server/transfer
ftp_upload_site = *** Transfer files via SCP or SFTP to /var/lib/galaxy-server/transfer/... ***

# There is no neat way to log out a user with Basic Auth, but here is a non-neat way.
# Not yet tested on IE.
remote_user_logout_href = javascript:var r=new XMLHttpRequest();r.onreadystatechange=function(){if(r.readyState==4)window.location.replace('logout.html')};r.open('get','logout.html',true,'logout','logout');r.send();
```


## /etc/apache2/conf.d/galaxy

 ```
% cat /etc/apache2/conf.d/galaxy
#  Note: These rules are essentially equivalent to the ones listed in the Wiki page
#  but for those to work on BL they would need to be placed within the <VirtualHost>
#  tags in /etc/apache2/sites-enabled/default whereas this variant can be put
#  into conf.d without editing any existing files.  Order of rules is very important.

#  The proxy directory holds the .htaccess file which activates pwauth authentication.
#  If I put the .htaccess file in the top-level directory then pwauth ends up being run
#  for every static file and it is slow, slow, slow.

Alias /galaxy /usr/share/galaxy-server
<Directory /usr/share/galaxy-server>
Options -Indexes
RewriteEngine on
RewriteBase /galaxy
RewriteRule ^(logout\..*) logout/$1 [L]
RewriteRule ^logout/ - [L]
RewriteRule ^static/style/(.*) static/june_2007_style/blue/$1 [L]
RewriteRule ^static/scripts/packed/ - [L]
RewriteRule ^static/scripts/(.*) static/scripts/packed/$1 [L]
RewriteRule ^(static|test-data)/ - [L]
RewriteRule ^(favicon.ico|robots.txt) static/$1 [L]
RewriteRule (.*) proxy/$1
</Directory>

<Directory /usr/share/galaxy-server/logout>
Options -Indexes
AllowOverride AuthConfig FileInfo
</Directory>

<Directory /usr/share/galaxy-server/proxy>
Options -Indexes
AllowOverride AuthConfig FileInfo
RewriteEngine on
RewriteBase /galaxy/proxy
RewriteRule (.*) http://localhost:8080/$1 [P,E=RU:%{REMOTE_USER}]
</Directory>
```


## Links

* [Original thread on Galaxy-Dev](http://dev.list.galaxyproject.org/Remote-User-Logout-td4663150.html) 
* [/Admin/Config/Apache Proxy.md#proxying-multiple-galaxy-worker-threads](/Admin/Config/Apache Proxy.md#proxying-multiple-galaxy-worker-threads)
* [/Admin/Config/ExternalUserDatbases](/Admin/Config/ExternalUserDatbases)

CategoryLog
