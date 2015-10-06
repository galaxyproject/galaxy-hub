<div class="title">Frequently Asked Questions for !CloudMan</div>
See [/Learn/FAQ](/Learn/FAQ) for questions about using any Galaxy instance and [/CloudMan](/CloudMan) page for general information about !CloudMan.  

TABLE_OF_CONTENTS

----

## Accessing CloudMan
!CloudMan console on your cluster is available at *<cluster IP address>/cloud*. To login, you need to use *ubuntu* user name and a password you used when starting the cluster via [Cloud Launch](https://launch.usegalaxy.org/launch).

----

## CloudMan Admin page
In addition to the main console, !CloudMan also has an Admin page. The Admin page provides additional insight and control over your cluster. The Admin page can be accessed by clicking *Admin* link at the top right hand side of the main !CloudMan console.

----

## Command line access
You can access your CloudMan cluster via *SSH* by using the command prompt. On OS X and Linux, you can use the terminal while on Windows you can use Putty. *SSH* access to your cluster is possible as the *ubuntu* or *galaxy* system user. The *ubuntu* user will have *sudo* access so you can perform system-level changes as well as change into the *galaxy* user. Accessing the cluster via *ssh* as the *root* user is disabled.

To *SSH* into the cluster, issue the following command: `ssh ubuntu@<cluster IP address>`. You will be prompted for a password - this is the same password you used when you started the cluster via Cloud Launch. Alternatively, you can use your ssh key to access the cluster without using a password. The command for this option is `ssh -i <your ssh key file> ubuntu@<cluster IP address>`

----

## Copying files
You can copy files to or from your cluster using the `scp` command. As described in the *Command line access* section, you have a choice of the username when accessing the cluster - make sure you are copying the files as the system user that has read/write permissions for the destination directory. The command to use when copying files to the cluster should look as follows: `scp /path/to/local/file ubunut@<cluster IP address>:/path/to/destination`

When copying files from the cluster, on your local machine, issue the following command: `scp ubunut@<cluster IP address>:/path/to/desired/file /local/path`

----

## Adding more storage space
You can add additional storage space to your cluster by adding a file system to it. For [cluster types](/CloudMan/ClusterTypes) with persistent storage, you can also increase the size of the storage by clicking on the *Grow* icon next to the Disk Status. 

To add a new file system, go to !CloudMan Admin page, and click *Add new* under *File systems* section of the page. You can choose among several storage device options:

<div class='center'>
![](http://i.imgur.com/pRqlWiw.png)
</div>

* *Bucket*: an AWS S3 bucket. To connect to an existing bucket, you just need a bucket name. Keep in mind that this option will work only if you have appropriate permissions for the specified bucket.
* *Volume*: an existing block storage volume device. If you already have an existing volume that you would like to use from within this cluster, you need the volume ID.
* *Snapshot*: an existing volume snapshot. If you have a volume snapshot, you can provide the snapshot ID and a new volume will be created from it that will be then made available as a file system.
* *New volume*: a new block storage volume. You need to specify a desired size for the volume and a new one will be created.
* *NFS*: an existing NFS server to connect to. This NFS server needs to be accessible on the local network to the cluster.

Once you have chosen the device type and provided the necessary device information, you need to give the file system a name. After you click *Add new file system*, !CloudMan will attempt to add/create the file system and make it available under */mnt/<file system name>*. After you click the button, it will take a up to a minute for the file system to be added. 

----

## Terminology
The space of cloud computing is littered with technical terms, here we try to explain the meaning of the most common terms:
* *Access key*: credentials required along with the secret key to access cloud resources under your account via the [API](https://en.wikipedia.org/wiki/Application_programming_interface)
* *Secret key*: credentials required along with the access key to access cloud resources under your account via the API
* *Instance*: a running virtual machine that can be used
* *Instance type*: a type of virtual hardware used by a running instance
* *Cluster*: a set of virtual machines/instances connected together
* *Master node*: the virtual machine that controls the cluster and is used to access the cluster
* *Worker node*: virtual machines that are connected to the master and perform computations requested by the master
* *Image*: a stopped virtual machine that can be used to start instances
* *Terminate*: shut down a running instance
* *Object store*: a storage service for storing Internet-accessible files
* *Bucket*: a folder available in an object store
* *Object*: a file available within a bucket
* *Volume*: a storage device like a USB flash drive that can be attached to a running instance
* *Snapshot*: a point-in-time snapshot of a volume that can be shared with other cloud users. A snapshot must be converted into a volume before it can be used.
