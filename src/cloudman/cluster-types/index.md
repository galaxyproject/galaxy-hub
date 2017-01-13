---
autotoc: true
---
{{> CloudMan/Header }}

<br />
<div class='right'></div>
A CloudMan cluster can be used for different scenarios, including a comprehensive bioinformatics workbench for a lab, a platform for doing hands-on classroom training or for tool development and testing. In response, a number of CloudMan cluster configuration types exist for you to choose from, depending on what you would like to use the cluster for, as captured in the following screenshots. Note that you choose the cluster type only once (in either the Cloud Launch application or CloudMan itself) and it's done when you first create your cluster.

<div class='center'>
<table>
  <tr>
    <td style=" border-width: 0;"> <strong>Cloud Launch application</strong></td>
    <td style=" border-width: 0;"> <strong>CloudMan application</strong></td>
  </tr>
  <tr>
    <td style=" border-width: 0;"> <img src="http://i.imgur.com/IBJoLLc.png" alt="" width=400 /></td>
    <td style=" border-width: 0;"> <img src="http://i.imgur.com/aBEEnuL.png?1" alt="" width=400 /></td>
  </tr>
</table>

</div>

### Cluster type options

<table>
  <tr class="th" >
    <th style=" width: 7em;"> Option </th>
    <th> Option type description </th>
    <th style=" width: 37%;"> Default <a href='/src/CloudMan/Services/index.md'>services</a> started </th>
  </tr>
  <tr>
    <th> Cluster only </th>
    <td> This type will create a virtual and dynamically scalable cluster-in-the-cloud. CloudMan will configure a job queuing engine <a href='http://slurm.schedmd.com/'>Slurm</a> along with the a shared NFS directory (under <em>/mnt/galaxy</em>; see <em>Storage options</em> below about the size). The size of the cluster is managed via CloudMan's graphical web interface. </td>
    <td> • Post Start Script (PSS)<br />• Nginx web server<br />• Slurm job manager (node daemon and controller)<br />• Supervisor</td>
  </tr>
  <tr>
    <th> </th>
    <td colspan=3 style=" background-color: #eef;"> </td>
  </tr>
  <tr>
    <th> Cluster with Galaxy </th>
    <td> This cluster type will configure all the same functionality as the <em>Cluster only</em> type with the addition of the Galaxy application ecosystem. Namely, this cluster type will automatically configure the Galaxy application in <a href='https://wiki.galaxyproject.org/Admin/Config/Performance/ProductionServer'>production mode</a> and supply the necessary cloud infrastructure for processing the tasks. The Galaxy application comes preconfigured with hundreds of bioinformatics tools (for the complete list, see <a href='https://github.com/galaxyproject/galaxy-cloudman-playbook/blob/master/files/shed_tool_list.yaml'>this file</a>) and hundreds of gigabytes of genomic reference data. </td>
    <td> • Post Start Script (PSS)<br />• Galaxy application<br />• Galaxy Reports web app<br />• Nginx web server<br />• NodeJS Proxy for <a href='/src/Admin/IEs/index.md'>Interactive Environments</a><br />• PostgreSQL database<br />• ProFTPd FTP server<br />• Slurm job manager (node daemon and controller)<br />• Supervisor</td>
  </tr>
  <tr>
    <th> </th>
    <td colspan=3 style=" background-color: #eef;"> </td>
  </tr>
  <tr>
    <th> Cloned cluster <br />(available within CloudMan only)</th>
    <td> If someone shares a cluster with you or makes it public, this option allows you to create a clone of their cluster under your account and control. Once cloned, the derived cluster will have all the same configurations, data and applications running as the initial shared cluster. In order to clone a shared cluster, you need to know the <em>Share string</em> of the shared cluster, which will look something like this: <em>cm-0011923649e9271f17c4f83ba6846db0/shared/2013-07-01--21-00</em>. To create a cloned cluster, launch a new CloudMan instance and paste the Share string in the appropriate field on the initial CloudMan cluster type configuration dialogue. </td>
    <td> The same set of services that were running on the shared cluster.</td>
  </tr>
  <tr>
    <th> </th>
    <td colspan=3 style=" background-color: #eef;"> </td>
  </tr>
  <tr>
    <th> Do not set cluster type now</th>
    <td> Selecting this option in the Cloud Launch interface will not pre-select the CloudMan cluster type and instead you will have a choice of choosing the cluster type within the CloudMan application once it has launched.</td>
    <td> </td>
  </tr>
</table>


### Storage type options

When launching a new cluster, you need to decide what type of storage would you like to use with your cluster. This storage is used to deploy the Galaxy application, a Galaxy-required database and tools as well as any data you upload to this instance. In addition to the type of storage you choose, it is important to choose appropriate size as well. Currently, there are two types of storage available:
<table>
  <tr class="th" >
    <th style=" width: 12em;"> Option </th>
    <th> Option type description </th>
  </tr>
  <tr>
    <th> Persistent volume storage</th>
    <td> This type of storage is used when you need large amounts of storage or when you want to be able to terminate and relaunch your cluster. When choosing this type of storage, you can set the desired size in the range from 10GB (1GB for the <em>Cluster only</em> type) to 16,000GB. This option uses persistent block level storage volumes (e.g., <a href='https://aws.amazon.com/ebs/?nc2=h_l3_sc'>AWS EBS</a>) that exists independent of the virtual machine using it and, as a result, it provides resilience against virtual machine failures. Note that in the case of commercial clouds, the use of this type of storage incurs additional costs.</td>
  </tr>
  <tr>
    <th> </th>
    <td colspan=3 style=" background-color: #eef;"> </td>
  </tr>
  <tr>
    <th> Transient instance storage</th>
    <td> Most of the cloud virtual machines (or instances) have a certain amount of storage available to them by default. This storage type is available for free and cannot be changed in size (the amount of available storage depends on the instance type). However, <strong>this storage is available only while an instance is running and once terminated, the storage is irrecoverably lost.</strong>  This type of storage is most useful for temporary clusters during testing or tool development.</td>
  </tr>
</table>

