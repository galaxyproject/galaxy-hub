# Galaxy Interactive Environments (GIEs)

These are revolutionary components of Galaxy allowing users to do interactive data processing from within Galaxy. IEs are built as standard Galaxy visualization plugins, however they launch Docker containers and use some additional routing information to connect end users through the Galaxy server, to the Docker images.

There is currently one IE built into Galaxy:

* [IPython](https://github.com/bgruening/galaxy-ipython/)
* [RStudio](https://github.com/erasche/galaxy-rstudio/)

And more on the way

## Setup IE's on your server

To enable IE's in your Galaxy instance you need to do the following:
* Set interactive_environment_plugins_directory to `config/plugins/interactive_environments` in config/galaxy.ini
* Copy `config/plugins/interactive_environments/ipython/config/ipython.ini.sample` over to `config/plugins/interactive_environments/ipython/config/ipython.ini`
* Adjust the config file if needed, for example to set the docker command if Galaxy cannot run sudo-less docker with `docker` command.
* Install the Galaxy IE proxy (you might need set this sym-link first:  *ln -s /usr/bin/nodejs /usr/bin/node* )

```
$ cd lib/galaxy/web/proxy/js
$ npm install
$ cd -
```



If your IE shows up, but you get an error like: "Could not connect to a galaxy instance. Please contact your sysadmin for help with this error", try the following: 
* set 'host' to the IP address of your galaxy server in config/galaxy.ini (instead of 127.0.0.1)
* set 'galaxy_url' to  <IP address>:8080 in the config file (i.e. ipython.ini)

## "Enterprise" Deployments

There are some extra considerations with "enterprise" deployments like running docker on a dedicated machine, and having everything under a single /galaxy URL that users will be accessing your services at. 

### Upstream Proxies

#### 15.07
##### Nginx
See the [Nginx configuration page](/Admin/Config/nginxProxy/#configuring_nginx_for_galaxy_interactive_environments_28150729) for more details about how to configure it for the GIEs

#### 15.10+

Most larger deployments have an apache or nginx proxy sitting in front of Galaxy. To support this, first adjust your galaxy.ini file:

```
dynamic_proxy_manage=True
dynamic_proxy_session_map=database/session_map.sqlite
dynamic_proxy_bind_port=8800
dynamic_proxy_bind_ip=0.0.0.0
dynamic_proxy_external_proxy=True
dynamic_proxy_prefix=gie_proxy
```


Make sure to uncomment and take note of the dynamic_proxy_prefix. Then, our apache configuration looks like:

```
    #RewriteEngine on
    ProxyPass        /galaxy/gie_proxy/ipython/api/kernels ws://localhost:8800/galaxy/gie_proxy/ipython/api/kernels
    ProxyPass        /galaxy/gie_proxy http://localhost:8800/galaxy/gie_proxy
    ProxyPassReverse /galaxy/gie_proxy http://localhost:8800/galaxy/gie_proxy

    <Location /galaxy>
         XSendFile on
         XSendFilePath /
    </Location>
    ProxyPass        /galaxy http://localhost:8000/galaxy
    ProxyPassReverse /galaxy http://localhost:8000/galaxy
```


you'll note that the `dynamic_proxy_prefix` is reused here.

### Docker on Another Host

There are many reasons to run Interactive Environments on a separated host and not on your webserver, serving Galaxy.
This is possible and is used in production at least at the University of Freiburg.

At first you need to configure a second host to be Docker enabled. This can also be a VM. In the following we call this host `glxdk1`. You need to start the Docker daemon and bind it to a TCP port, not to a socket which is the default. For example you can start the daemon with:

```docker -H 0.0.0.0:4243 -d ```


On your client, the Galaxy webserver, you can now install a Docker client. This can also be done on older Systems like Sientific-Linux, CentOS 6, which does not have Docker support by default. The client just talks to the Docker daemon on host ` glxdk1 `. You can test your configuration for example by starting busybox from your client on the Docker host with:

```docker -H tcp://glxdk1:4243 run -it busybox sh```


So far so good :). Now we need to configure Galaxy to use our new Docker host to start the Interactive Environments. For that we need to edit the `ipython.ini` to use our custom docker command. An example `ipython.ini` file can be found here: https://gist.github.com/bgruening/a8d53b500642b72db358

```
[main]

# Following options are ignored if using the Galaxy dynamic proxy but
# are useful if mapping a range of ports for environment consumption.
#apache_urls = False
#password_auth = False
#ssl = False

[docker]

# Command to execute docker. For example `sudo docker` or `docker-lxc`.
command = docker -H tcp://glxdk1:4243

# The docker image name that should be started.
image = bgruening/docker-ipython-notebook:dev

# Additional arguments that are passed to the `docker run` command.
command_inject = --sig-proxy=true

# URL to access the Galaxy API with from the spawn Docker containter, if empty
# this falls back to galaxy.ini's galaxy_infrastructure_url and finally to the
# Docker host of the spawned container if that is also not set.
#galaxy_url = 

# The Docker hostname. It can be useful to run the Docker daemon on a different
# host than Galaxy.
docker_hostname = glxdk1

docker_galaxy_temp_dir = /var/tmp/glxdk1
```


Please adopt your `command` and the ` image ` as needed.

As next step we need to configure a share mount point between the Docker host and Galaxy. Unfortunately, this can not be a NFS mount. Docker does not like NFS yet. You could for example use a sshfs mount with the following script: https://gist.github.com/bgruening/9601f51ecff3aa209e04

```
#!/usr/bin/env sh

if mount | grep ^glxdk1:/var/tmp/glxdk1; then
    echo "/var/tmp/glxdk1 already mounted."
else
    sshfs glxdk1:/var/tmp/glxdk1 /var/tmp/glxdk1
    echo 'Mounting ...'
fi
```

