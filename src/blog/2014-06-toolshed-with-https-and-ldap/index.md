---
date: '2014-06-10'
title: "Setting up a secure tool shed with remote authentication"
tease: "Requires some tweaks in order to allow Galaxy to communicate with the Tool Shed"
authors: "William Holtz"
external_url: 
source_blog_url: 
source_blog: 
---

Setting up a local tool shed to use https and remote authentication, such as LDAP, requires some additional steps beyond what is necessary to setup Galaxy with https and LDAP. Setting up Galaxy with https and LDAP is relatively well documented and can readily be applied to a tool shed configuration. Therefore this will focus on the additional changes that are specific to tool sheds. 

### Web server configuration

Apache2 was used. In your Apache configuration file, in the same block as your LDAP configuration, add the following:
```
Satisfy Any
Order deny,allow
Deny from all
Allow from galaxy.yourdomain.com
```

This will allow the Galaxy to bypass the authentication, so that it can get data from the tool shed.

### Tool shed configuration

Galaxy no longer has to authenticate to the tool shed, but this also means that Galaxy won't be passing a user name to the tool shed. You probably have 'require_login = True' in the tool shed configuration and this will deny Galaxy from connecting anonymously. To allow Galaxy to connect without an account add the following to your tool_shed_wsgi.ini:
```
[app:main]
display_servers = galaxy.yourdomain.com
```


### Mercurial configuration

Tools get copied to Galaxy via mercurial clone commands. If your tool shed is using https, then mercurial will (automatically) be connecting to the tool shed using https. However, if you are using a self signed certificate, then mercurial will refuse the make the insecure connection, but you will never see an error message any more useful than "This repository is not installed correctly (see the Repository installation error below). Choose Reset to install from the Repository Actions menu, correct problems if necessary and try installing the repository again." But no error messages was given below that and there were no errors in the log files.

Mercurial does not make use of certificates installed /etc/ssl/certs/. If you have a self signed certificate, you will need to edit /etc/mercurial/hgrc.d/cacerts.rc like so:
```
[web]
cacerts = /etc/mercurial/hgrc.d/yourCerts.crt
```


You can only have a single certificate file listed here, but you can concatenate multiple certificate files together. Alternatively, if you delete the 'cacerts = ...' line, then mercurial will connect without verifying the certificate and this also allows tools to be installed.
