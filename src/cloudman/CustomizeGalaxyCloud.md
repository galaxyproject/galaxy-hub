---
title: Customizing Galaxy CloudMan
---
## Adding system users to the cluster

By default, each CloudMan cluster comes with basic system users: *ubuntu*,
*galaxy*, *root*. If you would like to add additional system users, we have
provided a script that will add any number of system users to the master node
and any worker nodes. To create users, start by creating a file with a list of
users:

```
user1,password1
user2,password2
```

Place the file in a directory on a cluster-wide file system (e.g.,
`/mnt/transient_nfs/`) and call the `add-cluster-users` script, passing the
full path to the file as a single argument: `add-cluster-users
/mnt/transient_nfs/user_list.txt`

<div class='center'>
<a href='add-system-users.png'><img src="add-system-users.png" alt="" width=500 /></a>
</div>

Once added, the users can ssh to the cluster using the specified password to
authenticate. If you need to add more users in the future, just edit the file
to append the new usernames and rerun the script.

Note that this feature is available only on images released after Oct 2016.

## Customizing your Galaxy on the Cloud cluster

It is possible to use the cloud infrastructure management functionality offered by CloudMan while customizing the default deployment it offers. In the context of Galaxy, this means that it is possible to run a custom version of Galaxy, use your own set of tools, and reference genomes.

Keep in mind that this page deals with the CloudMan-side of customizations and how to ensure those changes get persisted across cluster invocations. See this page and then individual services about additional information on how to customize the applications themselves (you will probably want to do that before you do the actions described on this page).

Note that the process of customizing an instance may require use of the command line tools. In order to modify your cloud deployment, these are the general steps that need to be performed:

1. Start a CloudMan cluster instance
1. ssh to the EC2 instance and perform desired customizations
1. Use CloudMan Admin interface to persist changes to the file system
