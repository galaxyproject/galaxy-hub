---
autotoc: true
title: Setting up ProFTPd for galaxy uploads in an Active Directory environment
---

* You want to enable FTP file uploads?
* You are happy and able to use ProFTPd?
* You want to authenticate off Active Directory?
* You want Galaxy to actually find the uploaded files?

Yes, Yes, Yes and Of_Course?  Read on..



## Some background
Galaxy grew up serving the entire internet and cannot assume a username is unique so it uses email-addresses as its user-names.

Once an  "ftp_upload_dir"  is configured, it assumes that any uploaded files are to be found in the directory  <ftp_upload_dir>/<email>

If it's empty or not there Galaxy reports, "Your FTP upload directory contains no files."

Galaxy checks every time you click Get Data : Upload File

Galaxy exchanges no messages directly with the FTP server, if files are there, it shows them no matter how they got there.

## Assumptions
Your Galaxy serves a single institution with an AD domain and you're already using it to authenticate users in the Galaxy web pages.

So your  universe_wsgi.ini  file probably has lines like:
```bash
 use_remote_user = True
 remote_user_maildomain = example.domain
 ftp_upload_dir = /galaxy/database/ftp
```
 
Line 1 means you are already using remote (apache or nginx) authentication and that your users log in using their ident as their name not their email.

Line 2 means Galaxy is appending a fixed string  "@example.domain"  to ALL users to convert from ident to email.

Line 3 tells Galaxy to look in  "/galaxy/database/ftp/<user>@example.domain"

## Getting a version of ProFTPd that will actually do what it says it will
For this recipe to work will need at least these versions
* proftpd            version 1.3.4
* proftpd-mod-ldap   version 2.9.2   NOTE: Ubuntu-12.10 apt-get gives you version 2.9.0 which WILL NOT WORK!


Go to :  http://horde.net/~jwm/software/mod_ldap/#current-release

## Discussion
The functionality of defining where home dir is and creating it has just been moved from mod_ldap into proftpd itself.

The extra functionality specifying it using a string containing %u is new to the internal proftpd.

Using the versions specified and re-specifying the %u string to both proftpd and mod-ldap makes it not just accept the string but actually create the directory if it doesn't already exist.

```apache
# This tells proftpd to create it if necessary and chroot to it
DefaultRoot     "/galaxy/database/ftp/%u@example.domain"
CreateHome              on 700

# This tells mod_ldap the same thing
LDAPGenerateHomedir     on 700
LDAPGenerateHomedirPrefix "/galaxy/database/ftp/%u@example.domain"
LDAPForceGeneratedHomedir on
LDAPGenerateHomedirPrefixNoUsername     on
```


## Configuring ProFTPd
Here is a commented more complete file from  /etc/proftpd/proftpd.conf
```apache
# Load LDAP module
LoadModule mod_ldap.c

# Include some other modules
Include /etc/proftpd/modules.conf

# Users require a valid shell listed in /etc/shells to login.
# Use this directive to release that constrain.
RequireValidShell       off

# Set the user and group that the server normally runs at.
User                    galaxy
Group                   galaxy

# Umask 022 is a good standard umask to prevent new files and dirs
# (second parm) from being group and world writable.
Umask                   137 027
# Normally, we want files to be overwriteable.
AllowOverwrite          on

# Uncomment this if you are using NIS or LDAP via NSS to retrieve passwords:
# PersistentPasswd      off

# Galaxy users are not necessarily SSH users, so don't authenticate against real (system) users
AuthPAM                 off

# All authentication is via LDAP to AD
#AuthOrder              mod_auth_pam.c* mod_auth_unix.c
AuthOrder               mod_ldap.c

# You MUST NOT use URL style LDAPServer
LDAPServer      ad-server.example.domain:389

# I can't get this to work, need to fiddle with certificates more
#LDAPUseTLS on

# You can map fields using LDAPAttr
# LDAPAttr      expectedField   "weird AD name with spaces and all sorts of crap"
LDAPAttr        homeDirectory   "unixHomeDirectory"

# 
LDAPBindDN      "CN=<read-only-account>,OU=Special Accounts,DC=ad,DC=example,DC=domain"    "password"

# This defines the scope and search filter to find a user in AD
LDAPUsers       "OU=People,DC=ad,DC=example,DC=domain"  "(cn=%u)"

# With this LDAP re-binds to AD as the user using the password supplied
# If it works, you're in!
LDAPAuthBinds   on

LDAPDefaultUID          "<uid-number-galaxy-is-running-as>"
LDAPDefaultGID          "<gid-number-galaxy-is-running-as>"

# Force those numbers even if LDAP finds a valid UID/GID
LDAPForceDefaultUID     on
LDAPForceDefaultGID     on

LDAPGenerateHomedir     on 700
LDAPGenerateHomedirPrefix "/galaxy/database/ftp/%u@example.domain"

# Force this homedir even if LDAP said something different
LDAPForceGeneratedHomedir on

# The username is already incorporated in the %u, use this or it will get appended again
LDAPGenerateHomedirPrefixNoUsername     on


TransferLog             /var/log/proftpd/xferlog
SystemLog               /var/log/proftpd/proftpd.log


# You need this or users will get their passwords exposed across the network in the clear
Include /etc/proftpd/tls.conf

# These "virtuals" allow more than 1 proftpd
#       to run on the same host using different IPs.
#Include /etc/proftpd/virtuals.conf

# Cause every FTP user to be "jailed" (chrooted) into their home directory
DefaultRoot     "/galaxy/database/ftp/%u@example.com"

# Automatically create home directory if it doesn't exist
CreateHome              on 700

# Allow users to overwrite their files
AllowOverwrite          on

# Allow users to resume interrupted uploads
AllowStoreRestart       on

```


## Discussion
Where ever it's getting the information mod_ldap is looking for:
* uid
* gid
* uidNumber
* gidNumber
* homeDirectory


## Configuring ProFTPD with OpenLDAP

Eric Rasche found a set of working options for using ProFTPD with OpenLDAP
servers (instead of AD).

This configuration file can be modified and placed in
`/etc/proftpd/conf.d/galaxy.conf`

Using the /conf.d/ directory, you can allow the ProFTPd to serve both
local users (with PAM authentication) in the main configuration file,
AND galaxy users on another port.

```apache
<VirtualHost xxx.yyy.zzz>
        RequireValidShell       off
        User                    galaxy
        Group                   galaxy
        Umask                   137 027
        AllowOverwrite          on

        # Ensure auth is LDAP
        AuthPAM                 off
        AuthOrder               mod_ldap.c

        # Serve this VirtualHost on port 4000
        Port                    4000

        # LDAP Bind information
        LDAPServer              ldaps://xxx.yyy.zzz/??sub
        LDAPUsers               "ou=People,dc=yyy,dc=zzz"  "(uid=%u)"
        LDAPAuthBinds           on

        # Force those numbers even if LDAP finds a valid UID/GID
        LDAPDefaultUID          1003
        LDAPDefaultGID          1003
        LDAPForceDefaultUID     on
        LDAPForceDefaultGID     on

        # Please generate home dir with user/group rwx permissions. Could probably be stricter
        CreateHome              on 770
        LDAPGenerateHomedir     on 770

        # Force this homedir even if LDAP said something different
        LDAPForceGeneratedHomedir               on
        LDAPGenerateHomedirPrefix               "/home/galaxy/galaxy/database/ftp/%u@cpt.tamu.edu"

        # The username is already incorporated in the %u, use this or it will get appended again
        LDAPGenerateHomedirPrefixNoUsername     on

        TransferLog             /var/log/proftpd/xfer-galaxy.log

        # Cause every FTP user to be "jailed" (chrooted) into their home directory
        DefaultRoot             "/home/galaxy/galaxy/database/ftp/%u@cpt.tamu.edu"
        # Allow users to resume interrupted uploads
        AllowStoreRestart       on
        # I set these as my passive ports because I run a very strict firewall. Change as needed
        PassivePorts            49152 50000
</VirtualHost>
```


Notably, this configuration allows a galaxy virtualhost to coexist with
the normal FTP capabilities provided by ProFTPd, so users can still
access their home directories AND galaxy users can upload to galaxy.
Authentication can of course be changed to suit one's needs.

## TLS Configuration

If you're running the galaxy FTP portion under a !VirtualHost, like
described above, you'll notice that TLS directives placed in the main
proftpd.conf file do not apply to !VirtualHosts. As such, you can add a
section that looks like this to every !VirtualHost that needs to be secured

```apache
<IfModule mod_tls.c>
        TLSEngine                       on
        TLSLog                          /var/log/proftpd/tls.galaxy.log
        # Your cert and private key
        TLSRSACertificateFile           /etc/ssl/certs/my.crt
        TLSRSACertificateKeyFile        /etc/ssl/private/my.key
        TLSCACertificateFile            /etc/ssl/certs/ca.bundle
        # I've found that this is required for FileZilla
        TLSOptions    NoCertRequest EnableDiags NoSessionReuseRequired
        # Most clients won't be sending certs
        TLSVerifyClient                 off
        TLSRequired                     on
</IfModule>
```

