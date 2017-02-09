---
autotoc: true
---
# Galaxy Main public site

The main Galaxy site at http://usegalaxy.org is an installation of the Galaxy software combined with many common tools and data; this site has been available since 2007 for anyone to analyze their data free of charge. The site provides substantial CPU and disk space, making it possible to analyze large datasets. The site supports thousands of users and hundreds of thousands of jobs per month (see [Project Statistics](/src/galaxy-project/statistics)). It is sustained by [TACC](https://www.tacc.utexas.edu/) hardware using allocation generously provided by the [CyVerse](http://www.cyverse.org/) project.  

Anyone can use the public servers, with or without an account, but Galaxy user accounts are simple to create (email, password, user name and go!). With an account, data quotas are increased and full functionality across sessions opens up, such as naming, saving, sharing, and publishing Galaxy objects (Histories, Workflows, Datasets, Pages). 

<div class="alert alert-warning" role="alert"></span>**Note**: Galaxy's *Terms and Conditions* (see below) specifically declare a "one-account per user" requirement.</div>

## Status of the public site

The status page with the current state of the Main Server, Test Server, and ToolShed is available at [http://status.galaxyproject.org/](http://status.galaxyproject.org/).

## Resouces available to main site

Our public site utilizes multiple computational resources distributed across the US:

![Public Site](gxy_map.png)

Most jobs initially run on Galaxy cluster. They can be automatically "resubmitted" to [Stampede](https://portal.tacc.utexas.edu/user-guides/stampede) if they exceed the walltime (run time limit). The walltime differs per tool and is calculated based on previous average runtimes of that tool. Below are average runtimes for some of the most frequently used tools:

<table class="table table-striped">
  <tr>
    <th> Tool </th>
    <th> Walltime </th>
  </tr>
  <tr>
    <th> BWA </th>
    <td> 3 hours, 41 minutes </td>
  </tr>
  <tr>
    <th> BWA-MEM </th>
    <td> 4 hours, 55 minutes </td>
  </tr>
  <tr>
    <th> Bowtie </th>
    <td> 2 hours, 35 minutes </td>
  </tr>
  <tr>
    <th> Tophat </th>
    <td> 6 hours, 11 minutes </td>
  </tr>
  <tr>
    <th> Cufflinks </th>
    <td> 4 hours, 5 minutes </td>
  </tr>
  <tr>
    <th> Cuffdiff </th>
    <td> 8 hours, 11 minutes </td>
  </tr>
  <tr>
    <th> Cuffmerge </th>
    <td> 1 hour, 6 minutes </td>
  </tr>
</table>

When a job is resubmitted you will see its state turn from running (yellow) back to gray (queued) and a blue message box will appear when the dataset is expanded explaining that the job has been resubmitted.

Our goal with the Stampede resubmission system is to provide a balance to Galaxy users: to allow those with relatively small jobs to run them quickly without a wait, but still be able to support larger scale analyses with a reasonable wait but higher job concurrency limits. See the [User data and job quotas](/src/main/index.md#quotas) section below for more on concurrency limits.

### Choosing computational resources

Tools in the previous section can also be manually submitted directly to Stampede. This is a good idea if you know (or strongly suspect) that a tool will exceed the walltime on the local cluster. On the form for these tools, a **Job Resource Parameters** parameter is available that, if selected, will display a **Compute Resources** selection parameter. The options for this parameter are:

<table class="table table-striped">
  <tr>
    <td>Resource</td>
    <th>Characteristics</th>
  </tr>
  <tr>
    <th> Galaxy cluster (default): </th>
    <td> variable walltime, 6 cores, 32 GB memory, no/short wait </td>
  </tr>
  <tr>
    <th> TACC Stampede: </th>
    <td> 48 hour walltime, 16 cores, 32 GB memory, variable wait </td>
  </tr>
  <tr>
    <th> Galaxy cluster test/development: </th>
    <td> 30 minute walltime, 2 cores, 16 GB, no/short wait </td>
  </tr>
  <tr>
    <th> TACC Stampede test/development: </th>
    <td> 1 hour walltime, 16 cores, 32 GB, variable wait </td>
  </tr>
</table>

In addition to these resources some jobs (involving tools for genome and transcriptome assembly) are submitted to [Bridges](https://www.psc.edu/index.php/resources/computing/bridges) at Pittsburgh Supercomputing Center. In addition, jobs are also being submitted to [Jetstream](https://jetstream-cloud.org/) resource at Indiana University.   


<a name="Quotas"></a>
## User data and job quotas

Jobs that have low mamory and CPU requirements are subject to the following limits
:

<table class="table table-striped">
  <tr>
    <th> Maximum total accounts per user: </th>
    <td> 1 registered/unregistered </td>
  </tr>
  <tr>
    <th> Maximum total user data on server: </th>
    <td> 250GB for registered users<br />5GB for unregistered users </td>
  </tr>
  <tr>
    <th> Maximum concurrent jobs: </th>
    <td> 6 for registered users<br />1 for unregistered users</td>
  </tr>
</table>


Tools utilizing multiple CPUs and over 8 Gb of RAM are subject to stricted limits:

<table class="table table-striped">
  <tr>
    <td> Resource </td>
    <th> Per-resource job concurrency quotas </th>
  </tr>
  <tr>
    <th> Increased memory tools: </th>
    <td> 1 registered/unregistered </td>
  </tr>
  <tr>
    <th> Galaxy cluster: </th>
    <td> 2 registered, unregistered not allowed </td>
  </tr>
  <tr>
    <th> TACC Stampede: </th>
    <td> 4 registered, unregistered not allowed </td>
  </tr>
  <tr>
    <th> Galaxy cluster test/development: </th>
    <td> 1 registered, unregistered not allowed </td>
  </tr>
  <tr>
    <th> TACC Stampede test/development: </th>
    <td> 1 registered, unregistered not allowed </td>
  </tr>
</table>

## Galaxy Web Portal Service Agreement

 1. Use of Service. The Galaxy Web Portal is a free, public, Internet accessible resource (the "Service"). Data transfer and data storage are not encrypted. If there are restrictions on the way your research data can be stored and used, please consult your local institutional review board or the project principal investigator before uploading it to any public site, including this Service. If you have protected data, large data storage requirements, or short deadlines you are encouraged to set up your own local Galaxy instance and not use this Service. Your access to the service may be revoked at any time for reasons deemed necessary by the operators of the Service.
 1. Accounts and Service Limitations. You may choose to register an account with the Service. Your registration data is primarily used so you may persistently store data on the Service and use advanced Galaxy features such as sharing and workflows. The operators of the Service will not provide your registration data to any third party unless required to do so by law. Your access to the Service is provided under the condition that you abide by any published quotas on data storage, job submissions, or any other limitations placed on the public Service. Attempts to subvert these limits by creating multiple accounts or through any other method may result in termination of all associated accounts.
 1. Disclaimer. The Service is provided to you on an "AS IS" BASIS and WITHOUT WARRANTY, either express or implied, including, without limitation, the warranties of non-infringement, merchantability or fitness for a particular purpose. THE ENTIRE RISK AS TO THE QUALITY OF THE SERVICE IS WITH YOU. This DISCLAIMER OF WARRANTY constitutes an essential part of this service agreement.
 1. Limitation of Liability. Under no circumstances and under no legal theory, whether in tort (including negligence), contract, or otherwise, shall The Pennsylvania State University or any other entity which provides resources for the Service be liable to anyone for any indirect, special, incidental, or consequential damages of any character arising as a result of the use of this Service including, without limitation, damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses. This limitation of liability shall not apply to the extent applicable law prohibits such limitation.
