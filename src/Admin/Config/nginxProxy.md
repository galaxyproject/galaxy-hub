1. format text/creole <<Include(Admin/Config/Performance/LinkBox)>> <<div(left)>><<TableOfContents>><<div>> 

# nginx proxy to Galaxy

nginx is a lightweight http server designed with high performance proxying in mind. The public Galaxy sites ( [Main](Main) and [Test](Test)) use nginx to proxy rather than Apache for its simple, fast load balancing and other features.

Galaxy should _never_ be located on disk inside nginx's <tt>root</tt>. By default, this would expose all of Galaxy (including datasets) to anyone on the web.

## Basic configuration

For a default Galaxy configuration running on [http://localhost:8080/](http://localhost:8080/), the following lines in the nginx configuration will proxy requests to the Galaxy application:

```
#!highlight nginx
http {
    # ... other http stuff ...
    upstream galaxy_app {
        server localhost:8080;
    }
    # if using more than one upstream, disable nginx's round-robin
    # scheme to prevent it from submitting POST requests more than
    # once (this is unsafe)
    proxy_next_upstream off;
    server {
        client_max_body_size 10G;
        # ... other server stuff ...
        location / {
            proxy_pass http://galaxy_app;
            proxy_set_header X-Forwarded-Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        # serve static content for visualization and interactive environment plugins
        location ~ ^/plugins/(?<plug_type>.+?)/(?<vis_name>.+?)/static/(?<static_file>.*?)$ {
            alias /srv/galaxy/config/plugins/$plug_type/$vis_name/static/$static_file;
        }
    }
}
```

Replace /srv/galaxy with the path to your copy of Galaxy.

Thus, all requests on your server (for example, [http://www.example.org/](http://www.example.org/)) are now redirected to Galaxy.

Make sure that you either comment out or modify line containing default configuration for enabled sites.

```
include /etc/nginx/sites-enabled/*;
```

client\_max\_body\_size specifies the maximum upload size that can be handled by <<nwwl(POST)>> requests through nginx. You should set this to the largest file size that could be reasonable handled by your network. It defaults to 1M files, so will probably need to be increased if you are dealing with genome sized datasets.

Since nginx is more efficient at serving static content, it is best to serve it directly, reducing the load on the Galaxy process and allowing for more effective compression (if enabled), caching, and pipelining. To do so, add the following to <tt>server { } </tt>:

```
#!highlight nginx
http {
    server {
        location /static {
            alias /srv/galaxy/static;
        }
        location /static/style {
            alias /srv/galaxy/static/style/blue;
        }
        location /static/scripts {
            alias /srv/galaxy/static/scripts;
        }
        location /favicon.ico {
            alias /srv/galaxy/static/favicon.ico;
        }
        location /robots.txt {
            alias /srv/galaxy/static/robots.txt;
        }
    }
}
```

You'll need to ensure that filesystem permissions are set such that the user running your nginx server has access to the Galaxy static/ directory.

### Serving Galaxy at a sub directory (such as /galaxy)

It may be necessary to house Galaxy at an address other than the web server root ( [http://www.example.org/galaxy](http://www.example.org/galaxy), instead of [http://www.example.org](http://www.example.org)). Two changes are necessary. In the nginx config, prefix all of the location directives with your prefix, like so:

```
#!highlight nginx
http {
    server {
        location /galaxy {
            proxy_pass http://galaxy_app;
            proxy_set_header X-Forwarded-Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        location /galaxy/static {
            alias /srv/galaxy/static;
        }
        #... other galaxy aliases ...
    }
}
```

Additionally, the Galaxy application needs to be aware that it is running with a prefix (for generating <<nwwl(URLs)>> in dynamic pages). This is accomplished by configuring a Paste proxy-prefix filter in the <tt>[app:main]</tt> section of <tt>config/galaxy.ini</tt> and restarting Galaxy:

```
[filter:proxy-prefix]
use = egg:PasteDeploy#prefix
prefix = /galaxy


[app:main]
 
 
filter-with = proxy-prefix
cookie_path = /galaxy
```

<tt>cookie_prefix</tt> should be set to prevent Galaxy's session cookies from clobbering each other if running more than one instance of Galaxy in different subdirectories on the same hostname.

## External User Authentication

[Moved here](Admin%2FConfig%2FNginxExternalUserAuth)

## SSL

If you place Galaxy behind a proxy address that uses SSL (e.g. <tt>https://</tt> <<nwwl(URLs)>>), set the following in your nginx config:

```
#!highlight nginx
location / {
    proxy_set_header X-URL-SCHEME https;
}
```

Setting X-URL-<<nwwl(SCHEME)>> makes Galaxy aware of what type of URL it should generate for external sites like Biomart. This should be added to the existing <tt>location / { } </tt> block if you already have one, and adjusted accordingly if you're serving Galaxy from a subdirectory.

## Compression and caching

All of Galaxy's static content can be cached on the client side, and everything (including dynamic content) can be compressed on the fly. This will decrease download and page load times for your clients, as well as decrease server load and bandwidth usage. To enable, you'll need nginx gzip support (which is standard unless compiled with <tt>--without-http_gzip_module</tt>), and the following in your <tt>nginx.conf</tt>:

```
#!highlight nginx
http {
    gzip on;
    gzip_http_version 1.1;
    gzip_vary on;
    gzip_comp_level 4;
    gzip_proxied any;
    gzip_types text/plain text/css application/x-javascript text/xml application/xml text/javascript application/json application/javascript;
    gzip_buffers 16 8k;
    gzip_disable "MSIE [1-6].(?!.*SV1)";
}
```

For caching, you'll need to add an <tt>expires</tt> directive to the <tt>location /static { } </tt> blocks:

```
#!highlight nginx
http {
    server {
        location /static {
            alias /srv/galaxy/static;
            expires 24h;
        }
        location /static/style {
            alias /srv/galaxy/static/style/blue;
            expires 24h;
        }
    }
}
```

The contents of <tt>location /static { } </tt> should be adjusted accordingly if you're serving Galaxy from a subdirectory.

## Sending files using nginx

Galaxy sends files (e.g. dataset downloads) by opening the file and streaming it in chunks through the proxy server. However, this ties up the Galaxy process, which can impact the performance of other operations (see [Admin/Config/Performance/ProductionServer](Admin%2FConfig%2FPerformance%2FProductionServer) for a more in-depth explanation). nginx can assume this task instead and as an added benefit, speed up downloads. This is accomplished through the use of the special <tt>X-Accel-Redirect</tt> header. Dataset security is maintained in this configuration because nginx will still check with Galaxy to ensure that the requesting user has permission to access the dataset before sending it.

To enable it, add the following to your <tt>nginx.conf</tt>:

```
#!highlight nginx
http {
    server {
        location /_x_accel_redirect/ {
            internal;
            alias /;
        }
    }
}
```

And the following to the <tt>[app:main]</tt> section of <tt>config/galaxy.ini</tt>:

```
nginx_x_accel_redirect_base = /_x_accel_redirect
```

For this to work, the user under which your nginx server runs will need read access to Galaxy's <tt>database/files/</tt> directory and its contents.

## Receiving files using nginx

Galaxy receives files (e.g. dataset uploads) by streaming them in chunks through the proxy server and writing the files to disk. However, this again ties up the Galaxy process. nginx can assume this task instead and as an added benefit, speed up uploads. This is accomplished through the use of nginx\_upload\_module, a 3rd-party nginx module.

To enable it, you must first [download](http://www.grid.net.ru/nginx/upload.en.html), compile and install nginx\_upload\_module. This means recompiling nginx. Once done, add the necessary directives to <tt>nginx.conf</tt>:

```
#!highlight nginx
user galaxy;
http {
    server {
        location /_upload {
            upload_store /srv/galaxy/database/tmp/upload_store;
            upload_pass_form_field "";
            upload_set_form_field " __${upload_field_name}__ is_composite" "true";
            upload_set_form_field " __${upload_field_name}__ keys" "name path";
            upload_set_form_field "${upload_field_name}_name" "$upload_file_name";
            upload_set_form_field "${upload_field_name}_path" "$upload_tmp_path";
            upload_pass_args on;
            upload_pass /_upload_done;
        }
        location /_upload_done {
            set $dst /api/tools;
            if ($args ~ nginx_redir=([^&]+)) {
                set $dst $1;
            }
            rewrite "" $dst;
        }
    }
}
```

Note the <tt>user</tt> directive. To ensure that Galaxy has write permission on the uploaded files, nginx's workers will need to run as the same user as Galaxy.

Finally, set the following in the <tt>[app:main]</tt> section of <tt>config/galaxy.ini</tt> and restart Galaxy:

```
nginx_upload_store = database/tmp/upload_store
nginx_upload_path = /_upload
```

When serving Galaxy with a prefix, as described in the serving Galaxy in a sub-directory section above, you will need to change one line in the \_upload\_done section. If your galaxy instance is available from /galaxy, then the first line should include this prefix:

```
#!highlight nginx
            set $dst /galaxy/api/tools;
```
