<div class='right'> <a href='/src/ToolShed/index.md'><img src="/src/images/Logos/ToolShed.jpg" alt="Tool Shed logo" height="110px" /></a> {{> ToolShed/LinkBox }} </div>

# Hosting a Local Galaxy Tool Shed for Developing Galaxy Tools

If you decide to host your own Tool Shed, it will not initially contain anything until you add your own mercurial repositories to it. Starting up a local Tool Shed does not result in the mercurial repositories currently available in the [Main Galaxy Tool Shed](http://toolshed.g2.bx.psu.edu) being automatically made available in your local Tool Shed. Some additional explanatory material can be found at http://gregvonkuster.org/galaxy-tool-shed-framework-building-galaxy-tools/


All of the code for the Tool Shed is included in the Galaxy code distribution.  It is just a different web application from Galaxy itself. It uses a different database from Galaxy (**this is CRITICAL**) which you configure in the file **tool_shed_wsgi.ini**, the equivalent of **universe_wsgi.ini** for Galaxy. Like universe_wsgi.ini for Galaxy, it has an admin_users entry, which must be edited to contain a comma separated (NO spaces!) list of user email addresses - accounts will those email addresses as userids will all be local administrators and will be able to see and use the tool shed admin tab. The entry for the database connection is the following. *If left as is, a sqlite database instance will be automatically created for use when you start the Tool Shed server.*

```
# Database connection
database_file = database/community.sqlite
# You may use a SQLAlchemy connection string to specify an external database instead
#database_connection = postgres:///community_test?host=/var/run/postgresql
```


The Tool Shed also requires a file named **hgweb.config**, which is used by the mercurial package to enable the Tool Shed's web server (based on paste) to serve the repositories that you'll add to your Tool Shed, among other things required by mercurial.  You can configure the directory location for this file using the following setting in your tool_shed_wsgi.ini file. A new hgweb.config file will be created automatically for you when you start your Tool Shed server for the first time.  Configuring this location is recommended, but if you choose not to, a new hgweb.config file will automatically be created in the default location, the Galaxy installation directory.

```
# Where the hgweb.config file is stored.  The default is the Galaxy installation directory.
#hgweb_config_dir = <some directory path>
```


Backups will be made of the hgweb.config file (in the same directory in which it is located) any time a new repository is added to your Tool Shed, so configuring it to be located in it's own directory has benefits.  You can also choose to change the configured location over time, and simply move the hgweb.config file to that new location before starting your Tool Shed server, and everything should work as expected.

After you have the configuration settings as you want them, start up your Tool Shed by typing the following on the command line within the Galaxy installation directory.

```
%sh run_tool_shed.sh
```


Then connect to http://localhost:9009.

When you have completed development, you can export the repositories you've created in your Tool Shed into a capsule for importing into the test and main public Tool Sheds hosted by the Galaxy Development Team.  You can "trash" your development Tool Shed by deleting the database and hgweb.config file.  When you are ready to develop addition Galaxy utilities, start with a new, pristine development Tool Shed.

## External Auth (REMOTE_USER)

**This is untested. The author removed this auth method from their server due to issues. If you have corrections, please fix this!**

If you have chosen to secure your main galaxy instance with `REMOTE_USER` authentication, it is likely you might want to secure your toolshed in the same manner. It is trivial to set the authentication, but this brings with it an issue you will want to be aware of: galaxy cloning from this toolshed. 

In order to allow galaxy to clone from the secured toolshed, you need to ensure there is a user who can access the toolshed. This is usually a user created specifically for galaxy to access the toolshed with. Given that username and password, you will need to add to (or create) galaxy's `~/.hgrc` file in order to specify access credentials.

```cfg
[auth]
toolshed.prefix = toolshed.domain.edu/
toolshed.username = galaxy-clone-user
toolshed.password = very_secure_password
toolshed.schemes = https
```


This will specify default user/password credentials for mercurial to do the clone with.

As far as apache goes, you'll need to disable auth on the repos if you want to actually be able to access them via hg.

```apache
  <Location /toolshed/>
        RequestHeader set X-URL-SCHEME https
  </Location>
  <Location /toolshed/repos>
        Satisfy Any
        Allow from all
  </Location>
```

 
