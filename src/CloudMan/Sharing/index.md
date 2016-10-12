---
autotoc: true
---
PLACEHOLDER_INCLUDE(/CloudMan/Header)

# Sharing CloudMan clusters
<div class='right'></div>

You can customize any cluster you launch with your own datasets, configurations, Galaxy tools, or genomic reference data. After you complete your changes, you can keep it private, you can share with a specified list of AWS cloud accounts, or make it public so the community can use it. Once shared, users whom you have granted the permissions can create clones of your cluster. A cluster derived from a shared cluster lives under the cloud account of the user that created the clone and is managed by that user. Your original cluster remains entirely under your control.

Sharing is achieved via point-in-time snapshots of the underlying file system(s), which implies that you can share the same cluster multiple times at different time points. After creating a share, you can continue the use your cluster and any new data that is uploaded or created as part of an analysis will be available only to your cluster. For complete details on how cluster sharing works and is implemented, see the paper "[CloudMan as a platform for tool, data, and analysis distribution](http://www.biomedcentral.com/1471-2105/13/315)".

## Use cases
The following is a list of typical use cases for when cluster sharing is particularly useful:
* *Training*: you can create a custom version of a cluster with all the training data and histories pre-loaded so once training participants access the cluster, all the data is there without needing to repeat the data bootstrapping process. Additionally, this allows people to create their own instances of your training share and do the training individually and at their own pace, or develop additional curricula.
* *Reproducible analysis*: include your cluster share string as part of a publication so others can readily access all the details of your analysis methods.
* *Cluster scaling*: If more than 30 people are expected to be using a cluster simultaneously, it is likely that the performance will not be sufficient to satisfy the load. You can hence create multiple clones of the same cluster and distribute users across those clusters.
* *Exploratory analysis*: you can create a share and share it with your own cloud account. Because each share is a point-in-time snapshot, you can then create clones of the analysis at different time points to revert to a particular state of an analysis.

## Sharing your cluster
Sharing a cluster is achieved via !CloudMan console by clicking the *Share* button next to the cluster name:
<div class='center'>
![](http://i.imgur.com/CVTxmH9.png?2)
</div>

After the sharing popup shows up, decide whether your would like to share the cluster with specific AWS accounts or make it public and click the button at the bottom of the popup. **Note** that as you initiate the sharing process, most of the [cluster services](/CloudMan/Services) (including Galaxy) will be automatically shut down and later restarted. It is hence advisable to initiate the sharing process only after all the jobs have completed and all the *ssh* sessions to the cluster have been closed.

<div class='center'>
![](http://i.imgur.com/CUwr5ID.png?1)
</div>

The process of sharing your cluster has now been initiated. Depending on the size of the file system on your cluster, the sharing process may take many hours. After all the services have been started again (generally after only a few minutes), you can continue to use your cluster while the sharing process is taking place. You check on the status of the sharing process by clicking on the *Share* button again and viewing your shared instances. A share must reach 100% before cluster clones can be created.

<div class='center'>
![](http://i.imgur.com/FqjSfEl.png?1)
</div>

Each cluster share is identified via a 'share string', for example *cm-c1af56930d19f34e698519141b236d3f/TESTshare/2011-08-19--10-49/*. After the sharing process has completed, you can distribute the share string to other users so they can create clones of your cluster.

## Cloning a shared cluster
If you have received a !CloudMan share string, in order to create a clone of the shared cluster, you simply launch a new cluster from [launch.usegalaxy.org](https://launch.usegalaxy.org/) and choose *Do not set cluster type now*. After the initial cluster configuration box shows up, under the *Additional startup options*, paste the shared cluster share string and click the button at the bottom of the form. It will take a few minutes for all the applications to get setup and once that is done, a message popup will inform you that the cluster is ready for use. Your cluster will have all the same configurations, data and tools installed as the original shared cluster.

<div class='center'>
![](http://i.imgur.com/AB4PkLt.png?1)
</div>

## Deleting a share
**Important - please read**<br />
After you have created a share, you can easily delete it by clicking the *X* icon next to the share string (see screenshot above). In case you have shared the given share string with others, it is important to realize that if you delete a share, nobody will be able to create clones from that share. Even more importantly, users that have created a cluster but have since then shut it down will no longer be able to launch their cluster.

## Caveats
### Sharing works on Amazon only
Creating a cluster share requires very detailed access controls on individual files under your cloud account. This is so that only the absolute minimum privileges are given to the users you choose to share your cluster with. Amazon is the only cloud provider that allows such access controls and as a result cluster sharing is enabled only on the Amazon cloud. 

### Costs
Cluster sharing is enabled via volume snapshots. When you create a share, a snapshot of the current state of the Galaxy file system is created under the account that was used to launch the cluster. The size of the snapshot is the same as the current size of the Galaxy system. The created share must remain in the user account so new clusters can be cloned. However, keep in mind that keeping this snapshot will incur costs (http://aws.amazon.com/ebs/pricing/).

### User accounts
Because a cluster share contains everything that a cluster has been configured with, it will also contain user accounts that were created within Galaxy. This can be considered a feature (e.g., if you are giving a workshop, you can pre-create accounts) as well as a security issue (e.g., your account will exist on the clones of your shared cluster). It is hence important that after you have created a cluster from a share, you look on the Galaxy Admin page for existing users and disable any accounts you do not wish to have access to your cluster.

# Publicly shared clusters
Below is a list of !CloudMan clusters that have been shared publicly. Feel free to add a cluster you have created and shared or clone one of the existing ones. 


<table>
  <tr>
    <td> <tablewidth="100%" rowclass="th">Cluster share string</td>
    <td> Contact info (URL, email)</td>
  </tr>
  <tr>
    <td style=" width: 65%;"> cm-d276b27d9c82cfd56c5bf3cdead0fa0b/shared/2016-06-23--00-36/</td>
    <td> nturaga@gmail.com </td>
  </tr>
  <tr>
    <td> </td>
    <td> <rowstyle="background-color: #EEE; font-weight: bold;" style="text-align: left;">Description</td>
  </tr>
  <tr>
    <td> </td>
    <td style=" text-align: left;"> A 16.05 Galaxy !CloudMan instances created as a demo for GCC2016. Sample data and sample workflow have been uploaded and published. </td>
  </tr>
  <tr>
    <td colspan=3 style=" background-color: #eef;"> </td>
  </tr>
  <tr>
    <td style=" width: 65%;"> cm-f166fb7533ab13b2df095e86d20c7ba1/shared/2016-07-07--19-03/</td>
    <td> jen@galaxyproject.org </td>
  </tr>
  <tr>
    <td> </td>
    <td> <rowstyle="background-color: #EEE; font-weight: bold;" style="text-align: left;">Description</td>
  </tr>
  <tr>
    <td> </td>
    <td style=" text-align: left;"> This is a share of the GCC2016 Data Hack cluster (https://gcc16.sched.org/event/5YRH/data-hackathon), from after the conference. </td>
  </tr>
  <tr>
    <td colspan=3 style=" background-color: #eef;"> </td>
  </tr>
  <tr>
    <td style=" width: 65%;"> cm-[hash]</td>
    <td> sample@email.edu </td>
  </tr>
  <tr>
    <td> </td>
    <td> <rowstyle="background-color: #EEE; font-weight: bold;" style="text-align: left;">Description</td>
  </tr>
  <tr>
    <td> </td>
    <td style=" text-align: left;"> Brief share description; usage instructions.</td>
  </tr>
  <tr>
    <td colspan=3 style=" background-color: #eef;"> </td>
  </tr>
</table>

