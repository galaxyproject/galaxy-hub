1. format text/creole <<Include(Admin/Config/Performance/LinkBox)>> 

# Apache proxy to Galaxy

For various reasons (performance, authentication, etc.) in a production environment, it's recommended to run Galaxy behind a web server proxy. Although any proxy could work, Apache is the most common. Alternatively, we use [nginx](http://nginx.net/) for our public sites, and [details are available](Admin%2FConfig%2FPerformance%2Fnginx+Proxy) for it, too.

Currently the only recommended way to run Galaxy with Apache is using <tt>mod_rewrite</tt> and <tt>mod_proxy</tt>. fastcgi, AJP or similar connectors may be supported in the future.

To support proxying, the <tt>mod_proxy</tt>, <tt>mod_http_proxy</tt> and <tt>mod_rewrite</tt> modules must be enabled in the Apache config. The main proxy directives, <tt>ProxyRequests</tt> and <tt>ProxyVia</tt> do **not** need to be enabled.

Please note that Galaxy should _never_ be located on disk inside Apache's <tt>DocumentRoot</tt>. By default, this would expose all of Galaxy (including datasets) to anyone on the web.

## Basic configuration

### Serving Galaxy at the web server root (/)

For a default Galaxy configuration running on [http://localhost:8080/](http://localhost:8080/), the following lines in the Apache configuration will proxy requests to the Galaxy application:

```
#!highlight apache
RewriteEngine on
RewriteRule ^(.*) http://localhost:8080$1 [P]
```

Thus, all requests on your server (for example, [http://www.example.org/](http://www.example.org/)) are now redirected to Galaxy. Because this example uses the "root" of your web server, you may want to use a [VirtualHost](http://httpd.apache.org/docs/2.2/vhosts/) to be able to run other sites from this same server.

If your Apache server is set up to use <tt>mod_security</tt>, you may need to modify the value of the <tt>SecRequestBodyLimit</tt>. The default value on some systems will limit uploads to only a few kilobytes.

Since Apache is more efficient at serving static content, it is best to serve it directly, reducing the load on the Galaxy process and allowing for more effective compression (if enabled), caching, and pipelining. To do so, your configuration will now become:

```
#!highlight apache
RewriteEngine on
RewriteRule ^/static/style/(.*) /home/nate/galaxy-dist/static/june_2007_style/blue/$1 [L]
RewriteRule ^/static/scripts/(.*) /home/nate/galaxy-dist/static/scripts/packed/$1 [L]
RewriteRule ^/static/(.*) /home/nate/galaxy-dist/static/$1 [L]
RewriteRule ^/favicon.ico /home/nate/galaxy-dist/static/favicon.ico [L]
RewriteRule ^/robots.txt /home/nate/galaxy-dist/static/robots.txt [L]
RewriteRule ^(.*) http://localhost:8080$1 [P]
```

You'll need to ensure that filesystem permissions are set such that the user running your Apache server has access to the Galaxy static/ directory.

### Serving Galaxy at a sub directory (such as /galaxy)

It may be necessary to house Galaxy at an address other than the web server root ( [http://www.example.org/galaxy](http://www.example.org/galaxy), instead of [http://www.example.org](http://www.example.org)). Two changes are necessary:

```
#!highlight apache
RewriteEngine on
RewriteRule ^/galaxy$ /galaxy/ [R]
RewriteRule ^/galaxy/static/style/(.*) /home/nate/galaxy-dist/static/june_2007_style/blue/$1 [L]
RewriteRule ^/galaxy/static/scripts/(.*) /home/nate/galaxy-dist/static/scripts/packed/$1 [L]
RewriteRule ^/galaxy/static/(.*) /home/nate/galaxy-dist/static/$1 [L]
RewriteRule ^/galaxy/favicon.ico /home/nate/galaxy-dist/static/favicon.ico [L]
RewriteRule ^/galaxy/robots.txt /home/nate/galaxy-dist/static/robots.txt [L]
RewriteRule ^/galaxy(.*) http://localhost:8080$1 [P]
```

Note the first rewrite rule deals with the missing trailing slash problem. If left out, [http://www.example.org/galaxy](http://www.example.org/galaxy) will result in a 404 error.

Additionally, the Galaxy application needs to be aware that it is running with a prefix (for generating <<nwwl(URLs)>> in dynamic pages). This is accomplished by configuring a Paste proxy-prefix filter in the <tt>[app:main]</tt> section of <tt>config/galaxy.ini</tt> and restarting Galaxy:

```
#!highlight ini
[filter:proxy-prefix]
use = egg:PasteDeploy#prefix
prefix = /galaxy


[app:main]
 
 
filter-with = proxy-prefix
cookie_path = /galaxy
```

<tt>cookie_prefix</tt> should be set to prevent Galaxy's session cookies from clobbering each other if running more than one instance of Galaxy in different subdirectories on the same hostname.

## External user authentication

Moved to its [own page](Admin%2FConfig%2FExternalUserAuth), please check there.

### Display Sites

Display sites such as <<nwwl(UCSC)>> work not by sending data directly from Galaxy to <<nwwl(UCSC)>> via the client's browser, but by sending <<nwwl(UCSC)>> a URL to the data in Galaxy that the <<nwwl(UCSC)>> server will retrieve data from. Since enabling authentication will place **all** of Galaxy behind authentication, such display sites will no longer be able to access data via that URL. If <tt>display_servers</tt> is set to a non-empty value in <tt>galaxy/config/galaxy.ini</tt>, this tells Galaxy it should allow the named servers access to data in Galaxy. However, you still need to configure Apache to allow access to the datasets. An example config is provided here that allows the <<nwwl(UCSC)>> Main/Test backends:

```
#!highlight apache
<Location "/root/display_as">
    Satisfy Any
    Order deny,allow
    Deny from all
    Allow from hgw1.cse.ucsc.edu
    Allow from hgw2.cse.ucsc.edu
    Allow from hgw3.cse.ucsc.edu
    Allow from hgw4.cse.ucsc.edu
    Allow from hgw5.cse.ucsc.edu
    Allow from hgw6.cse.ucsc.edu
    Allow from hgw7.cse.ucsc.edu
    Allow from hgw8.cse.ucsc.edu
</Location>
```

**<<nwwl(PLEASE)>> <<nwwl(NOTE)>> that this introduces a security hole** , the impact of which depends on whether you have restricted access to the dataset via Galaxy's [internal dataset permissions](Learn%2FSecurity+Features).

- By default, data in Galaxy is public. Normally with a Galaxy server behind authentication in a proxy server this is of little concern since only clients who've authenticated can access Galaxy. However, if display site exceptions are made as shown above, anyone could use those public sites to bypass authentication and view any **public** dataset on your Galaxy server. If you have not changed from the default and most of your datasets are public, you should consider running your own display sites that are also behind authentication rather than using the public ones. 

- For datasets for which access has been restricted to one or more roles (i.e. it is no longer "public"), access for reading via external browsers is only allowed for a brief period, when someone with access permission clicks the "display at..." link. During this period, anyone who has the dataset ID would then be able to use the browser to view this dataset. Although such a scenario is unlikely, it is technically possible. 

## SSL

If you place Galaxy behind a proxy address that uses SSL (e.g. https:_ <<nwwl(URLs)>>), set the following in your Apache config: _

```
#!highlight apache
<Location "/">
    RequestHeader set X-URL-SCHEME https
</Location>
```

Setting X-URL-<<nwwl(SCHEME)>> makes Galaxy aware of what type of URL it should generate for external sites like Biomart. This should be added to the existing <tt>&lt;Location "/"&gt;</tt> block if you already have one, and adjusted accordingly if you're serving Galaxy from a subdirectory.

## Compression and caching

All of Galaxy's static content can be cached on the client side, and everything (including dynamic content) can be compressed on the fly. This will decrease download and page load times for your clients, as well as decrease server load and bandwidth usage. To enable, you'll need to load <tt>mod_deflate</tt> and <tt>mod_expires</tt> in your Apache configuration, and then set:

```
#!highlight apache
<Location "/">
    # Compress all uncompressed content.
    SetOutputFilter DEFLATE
    SetEnvIfNoCase Request_URI \.(?:gif|jpe?g|png)$ no-gzip dont-vary
    SetEnvIfNoCase Request_URI \.(?:t?gz|zip|bz2)$ no-gzip dont-vary
    SetEnvIfNoCase Request_URI /history/export_archive no-gzip dont-vary
</Location>
<Location "/static">
    # Allow browsers to cache everything from /static for 6 hours
    ExpiresActive On
    ExpiresDefault "access plus 6 hours"
</Location>
```

The contents of <tt>&lt;Location "/"&gt;</tt> should be added to the existing <tt>&lt;Location "/"&gt;</tt> block if you already have one, and adjusted accordingly if you're serving Galaxy from a subdirectory.

## Sending files using Apache

Galaxy sends files (e.g. dataset downloads) by opening the file and streaming it in chunks through the proxy server. However, this ties up the Galaxy process, which can impact the performance of other operations (see [Admin/Config/Performance/ProductionServer](Admin%2FConfig%2FPerformance%2FProductionServer) for a more in-depth explanation). Apache can assume this task instead and as an added benefit, speed up downloads. This is accomplished through the use of mod\_xsendfile, a 3rd-party Apache module. Dataset security is maintained in this configuration because Apache will still check with Galaxy to ensure that the requesting user has permission to access the dataset before sending it.

To enable it, you must first [download](http://tn123.ath.cx/mod_xsendfile/), compile and install mod\_xsendfile. Once done, add the appropriate <tt>LoadModule</tt> directive to your Apache configuration to load the xsendfile module and the <tt>XSendFile</tt> directives to your proxy configuration:

```
#!highlight apache
<Location "/">
     XSendFile on
     XSendFilePath /
</Location>
```

This should be added to the existing <tt>&lt;Location "/"&gt;</tt> block if you already have one, and adjusted accordingly if you're serving Galaxy from a subdirectory.

Note: If you use a version of mod\_xsendfile older than 0.10, use "<<nwwl(XSendFileAllowAbove)>> on" instead of "<<nwwl(XSendFilePath)>> /"

Finally, set <tt>apache_xsendfile = True</tt> in the <tt>[app:main]</tt> section of <tt>config/galaxy.ini</tt> and restart Galaxy.

## Proxying multiple galaxy worker threads

If you've configured multiple threads for galaxy in the <tt>config/galaxy.ini</tt> file, you will need a <tt>ProxyBalancer</tt> to manage sending requests to each of the threads. You can do that with apache configuration as follows:

```
#!highlight apache
<Proxy balancer://galaxy>
 BalancerMember http://localhost:8400
 BalancerMember http://localhost:8401
</Proxy>


# Replace the following line from the regular proxy configuration:
# RewriteRule ^(.*) http://localhost:8080$1 [P]
# With:
RewriteRule ^(.*) balancer://galaxy$1 [P]
```

## Allow Encoded Slashes in URLs

Some Galaxy URLs related to Data Managers contain encoded slashes (%2F) in the path and Apache will not serve these URLs by default. To configure Apache to serve URLs with encoded slashes in the path, add the following line to your Apache configuration file:

```
AllowEncodedSlashes NoDecode
```
