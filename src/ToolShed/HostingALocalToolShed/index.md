<div class='right'> <a href='/src/ToolShed/index.md'><img src="/src/images/Logos/ToolShed.jpg" alt="Tool Shed logo" height="110px" /></a> PLACEHOLDER_INCLUDE(/src/ToolShed/LinkBox/index.md) </div>

# Hosting a Public Tool Shed for sharing Galaxy Utilities

If you decide to host your own Tool Shed, it will not initially contain anything until you add your own mercurial repositories to it. Starting up a local Tool Shed does not result in the mercurial repositories currently available in the [Main Galaxy Tool Shed](http://toolshed.g2.bx.psu.edu) being automatically made available in your local Tool Shed.

All of the code for the Tool Shed is included in the Galaxy code distribution.  It is just a different web application from Galaxy itself. It uses a different database from Galaxy (**this is CRITICAL**) which you configure in the file **config/tool_shed.ini**, the equivalent of **config/galaxy.ini** for Galaxy.  The entry for the database connection is the following. *If left as is, a sqlite database instance will be automatically created for use when you start the Tool Shed server.*

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

If you use an apache proxy to your Tool Shed, you can use the same approach detailed in our [Apache proxy to Galaxy wiki](/src/Admin/Config/ApacheProxy.mdindex.md). For example, the following rules can be used to enable your apache server to serve static content (located in the directory /home/galaxy/static in this example) for your Tool Shed running on port 9009:

```apache
RewriteEngine on
RewriteRule ^/toolshed$ /toolshed/ [R]
RewriteRule ^/toolshed/static/style/(.*) /home/galaxy/static/june_2007_style/blue/$1 [L]
RewriteRule ^/toolshed/static/(.*) /home/galaxy/static/$1 [L]
RewriteRule ^/toolshed/images/(.*) /home/galaxy/static/images/$1 [L]
RewriteRule ^/toolshed/favicon.ico /home/galaxy/static/favicon.ico [L]
RewriteRule ^/toolshed/robots.txt /home/galaxy/static/robots.txt [L]
RewriteRule ^/toolshed(.*) http://localhost:9009$1 [P]
```


Of course, your Tool Shed must be aware that it is running with a prefix (for generating URLs in dynamic pages). This is accomplished by configuring a Paste proxy-prefix filter in the **[app:main]** section of **tool_shed_wsgi.ini**.

```ini
[filter:proxy-prefix]
use = egg:PasteDeploy#prefix
prefix = /toolshed
[app:main]
filter-with = proxy-prefix
cookie_path = /toolshed
```


Note that **cookie_path** should be set to prevent Galaxy's session cookies from clobbering each other only if running more than one instance of the Tool Shed in different subdirectories on the same hostname.

If your network uses an http proxy configured to not answer to local hostname requests and you've set up the http_proxy environment variable, then you'll need to do the following two things in order to get a Tool Shed running.

```
1. Add the following setting to ~/.hgrc (note: domain regex won't work)
[http_proxy] no = [comma separated list of hostnames for your local Tool Sheds]

2. Set the **no_proxy** environment variable
For bash in Redhat/CentOS add to /etc/profile.d/custom.sh:export no_proxy=[comma separated list of local domains]
```


# Maintaining the metadata associated with repositories in your Tool Shed

Whenever you update the code base of your Tool Shed (by upgrading to a new Galaxy release revision or some other Galaxy revision), it is highly recommended that you reset the metadata for all of your Tool Shed repositories.

Metadata is generated for the repository whenever you make changes to it by uploading or deleting files or pushing mercurial commits to it via the command line.  This metadata is stored in the repository_metadata table in the Tool Shed's database.  This automatic process inspects the contents of the specific revision of the repository and generates and stores important information about it.  This metadata information is used by certain Tool Shed features.
As new features are added to the Tool Shed, the process that generates this metadata may be enhanced to accommodate information about the new features.  Regenerating the metadata for your Tool Shed repositories can be done as often as you want - it is considered "safe" to do this.  You can do this by selecting the **Reset selected metadata** option from the Tool Shed Administration menu.
![](/src/ToolShed/HostingALocalToolShed/reset_selected_metadata.png)

# Migrating the database schema of your Tool Shed

When the schema for the Galaxy Tool Shed database changes, you'll see a message similar to the following familiar message (You may have seen it when updating your Galaxy instance) when you attempt to start your Tool Shed application after updating the code base.

```
Exception: Your database has version 'X' but this code expects version 'Y'. Please backup your database and then migrate the schema by running 'sh manage_db.sh upgrade tool_shed'.
```


Similarly, to downgrade your Tool Shed database schema to a previous version, the command requires the same additional **tool_shed** parameter. For example suppose you want to downgrade your Tool Shed database schema to version 9. The command to do so would be the following.

```
sh manage_db.sh downgrade 9 tool_shed
```


# Functional test framework for the Tool Shed

In addition to it's rich set of features, the Galaxy Tool Shed provides a suite of functional test scripts that ensure the features behave as expected.  This test framework is very similar to the functional test framework provided for Galaxy itself, and consists of files mostly contained within the ~/test/tool_shed directory hierarchy in the Galaxy root directory.

Before running the tests for the first time, you should decide if you want to test using a default sqlite database or another database.  If you want to point to a specific database instance for running the tests, you can set the value of the environment variable (for the shell environment you'll use to run the tests) named **TOOL_SHED_TEST_DBURI** to the database connection string.  **Make sure that you do not set the value of this environment variable to any database that you are currently using or want to keep, as running functional tests will drop and recreate the database every time the tests are executed.**  If you do not set this environment variable, a new, temporary sqlite database will be created automatically each time the tests are executed.

The shell script file name **run_tool_shed_functional_tests.sh** located in the Galaxy root directory provides the means for executing the functional tests defined for the Tool Shed.  The script is executed using the following shell command.

```
sh run_tests.sh -t
```


Executing the above shell command will result in setting up a temporary directory location for containing a new, empty Tool Shed.  A file named **hgweb.config** will be created in that location, and a handle to it will be provided to the test application framework.  Instantiation of a new, empty database will occur, and the functional tests scripts will start to execute.

The functional test results are logged to an html file in **~/test/tool_shed/run_functional_tests.html**.  Loading this file into a browser will display something like the following.

![](/src/ToolShed/HostingALocalToolShed/functional_test_output.png)
