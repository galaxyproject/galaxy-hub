## Overview

Pulsar (formerly the light-weight runner, LWR) is a Python web server application that allows a Galaxy server to run jobs on remote systems (including Windows) without requiring a shared mounted file systems. Input files, scripts, and config files are transferred to the remote system, the job is executed, and the results are transferred back to the Galaxy server.

There are many valid things a tool wrapper could do to break this model, for instance depending on Galaxy as a library, accessing hard-coded file paths not coming from inputs, etc.... This should therefore never be your default job runner, but for specific classes of tools this can and does work. It can be used for instance to transfer jobs for that de novo assembly tool to your large memory cluster that doesn't mount the shared file system or to run those Windows-only proteomics applications on an actual Windows server.

For more information please have a look at [https://github.com/galaxyproject/pulsar](https://github.com/galaxyproject/pulsar).

## Installing an Pulsar Server Application

```
pip install pulsar-app
```


For information on installing a Pulsar server please checkout out the [Pulsar page on readthedocs.org](https://pulsar.readthedocs.org/).

## Configuring Tools

The Pulsar job runner is now enabled by default in Galaxy, so to configure Galaxy to run a tool with against an Pulsar server, simply specify its runner url as follows:

```
<tool_id> = lwr://http://<lwr_host>:<lwr_port>
```


As an example, if a host named remotehost is running the LWR server application on port 8913, then the tool with id test_tool can be configured to run remotely on remotehost by adding the following line to universe.ini:

```
test_tool = lwr://http://remotehost:8913
```


Remember this must be added after the [galaxy:tool_runners] header in the universe.ini file.

## Securing the Pulsar

Out of the box the Pulsar essentially allows anyone with network access to the Pulsar server to execute arbitrary code and read and write any files the web server can. Hence, in most settings steps should be taken to secure the Pulsar server. 

The Pulsar can be configured to use SSL and require the client (i.e. Galaxy) to pass along a private token authorizing use. See the Pulsar documentation for information on configuring the Pular to use SSL and setting a private token. Once such a private token has been setup it may be used by a tool as follows:

```
<tool_id> = lwr://https://<lwr_private_token>@<lwr_host>:<lwr_port>
```


## Questions

If you have any questions about the Pulsar or encounter any problems while deploying it, please feel free to contact John Chilton (jmchilton at gmail dot com).
