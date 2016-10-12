---
autotoc: true
pagetitle: Public Galaxy Main Instance , (, [usegalaxy.org](https://usegalaxy.org), )
---
<div class='center'>
<a href='http://usegalaxy.org'><img src='/Images/Logos/UseGalaxy.orgLogo600.png' alt='usegalaxy.org (Main)' width="400" /></a>
 

</div>

<div class='right'></div> <div class='left'><a href='https://usegalaxy.org/'><img src='/Images/Screenshots/GalaxyMainHome.png' alt='Galaxy Main Server' width="200" /></a></div>

The Galaxy **Main** instance is available as a free public service at [UseGalaxy.org](https://usegalaxy.org/). This is the Galaxy Project's production [Galaxy instance](http://usegalaxy.org/). Main is where Galaxy's data and tools are functionality integrated and ready to use. Main is useful for sharing/publishing data and methods with colleagues for routine analysis or with the larger scientific community for publications and supplemental material. **[/Test](/Test)** is also free and public, but is considered a beta site.

Anyone can use the public servers, with or without an account, but Galaxy [user accounts](/Learn/User Accounts) are simple to create (email, password, user name and go!). With an account, data quotas are increased and full functionality across sessions opens up, such as naming, saving, sharing, and publishing Galaxy objects (Histories, Workflows, Datasets, Pages). Remember, Galaxy's **[Terms and Conditions](https://usegalaxy.org/static/terms.html)** specifically declare a "one-account per user" requirement.

To understand if Main is the right Galaxy choice for your project, please see [Choices](/BigPicture/Choices) for a description of the different types of possible Galaxy instances. Galaxy is available to [install as a local instance](/Admin/GetGalaxy), to run [on the cloud](/CloudMan), to use at other [/Public Galaxy Servers](/Public Galaxy Servers), or preinstalled on your own Galaxy [appliance](http://www.bioteam.net/slipstream/galaxy-edition).

## Information about Main

The status page with the current state of the Main server is available at [http://status.galaxyproject.org/](http://status.galaxyproject.org/).


The [/Learn](/Learn) pages include information on how to use Main and most other Galaxy instances. Also see:

* [Frequently Asked Questions](/Main/FAQ)
* [Main Status Notices](/Main/Notices)
* [Datasets](/Learn/Managing Datasets)
* [Disk Quotas](/Admin/Disk Quotas)
* [Data Libraries](/Main/DataLibraries)
* [Datatypes](/Learn/Datatypes)
* [Data Sources](/Learn/DataSources)
* [MAF Analysis](/Main/MAFAnalysis)
* [Tests Framework](/Main/TestsFramework)

## Job resubmission to Stampede

Certain tools will be automatically "resubmitted" to Stampede (see [Job execution on Stampede](#stampede) for more about Stampede) if they initially run on Galaxy's local cluster but exceed the walltime (run time limit). The walltime differs per tool and is calculated based on previous average runtimes of that tool:

<table>
  <tr>
    <td> </td>
    <th> Tools </th>
  </tr>
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
  <tr>
    <td> </td>
    <th> Legacy Tools </th>
  </tr>
  <tr>
    <th> Map with BWA for Illumina </th>
    <td> 4 hours, 54 minutes </td>
  </tr>
  <tr>
    <th> Map with Bowtie for Illumina </th>
    <td> 2 hours, 18 minutes </td>
  </tr>
  <tr>
    <th> Tophat (version 1) </th>
    <td> 6 hours, 26 minutes </td>
  </tr>
</table>


When a job is resubmitted you will see its state turn from running (yellow) back to gray (queued) and a blue message box will appear when the dataset is expanded explaining that the job has been resubmitted.

Our goal with the Stampede resubmission system is to provide a balance to Galaxy users: to allow those with relatively small jobs to run them quickly without a wait, but still be able to support larger scale analyses with a reasonable wait but higher job concurrency limits. See the [User data and job quotas](#quotas) section below for more on concurrency limits.

If you know (due to previous runs of the tool using similar inputs and parameters) that your job will reach the walltime on the local cluster, you should directly submit it to Stampede to avoid the time wasted running to walltime on the Galaxy cluster.

PLACEHOLDER_ANCHOR(Stampede)
## Direct job execution on Stampede

Tools in the previous section can also be manually submitted directly to Stampede. This is a good idea if you know (or strongly suspect) that a tool will exceed the walltime on the local cluster. On the form for these tools, a **Job Resource Parameters** parameter is available that, if selected, will display a **Compute Resources** selection parameter. The options for this parameter are:

<table>
  <tr>
    <td> </td>
    <th> Compute resource choices </th>
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


PLACEHOLDER_ANCHOR(Quotas)
## User data and job quotas
[Main Quota Announcement](/News/Galaxy Main public instance: data and job quotas)
<table>
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


Some tools or job destinations have stricter job concurrency limits than the overall limits above. These tools include all of the tools that can be run on Stampede (listed above), and some additional tools. These limits are:

<table>
  <tr>
    <td> </td>
    <th> Per-resource job concurrency quotas </th>
  </tr>
  <tr>
    <th> Increased memory tools: </th>
    <td> 1 (registered or unregistered) </td>
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


"Increased memory tools" refers to a set of tools that are granted additional memory over the 8 GB default.

<br /><br />
If you job that failed for any reason, or a reason due to resources was given (job exceeded memory or run-time quotas), see this wiki and related sections for help: [/Support#error_from_tools](/Support#error_from_tools)

## More about job execution
Your actual number of concurrent jobs may be less at any particular time, or certain job types may run quicker than others, as the different job queues are shared among all users, some job types run on busies queues, and resources are distributed evenly. Unsure about job status? [Read more here...](/Support#dataset_status_and_how_jobs_execute)

<br /> **[Terms and Conditions](https://usegalaxy.org/static/terms.html)**: *Attempts to subvert these limits by creating multiple accounts or through any other method may result in termination of all associated accounts.*

### Monitoring data use
Exceeding quotas will prevent new jobs from running, but Galaxy users can monitor and [manage datasets](/Learn/Managing Datasets) in several ways:

1. Percent of quota limit used by a user account is noted in the top right corner of the Galaxy interface within a bar icon.
1. Exact total user data size and quota limit is noted on the page: **User → Preferences** (top menu bar).
1. Size of individual histories is listed on the page: **Options → Saved Histories** (left history pane's menu).
1. Size of individual datasets can be found within a dataset's expanded box either written directly under the dataset's name and/or by viewing the dataset's **Details** (*click* on View Details icon ![History Info Icon](/Images/Icons/HistoryInfo.png) ).

## User Account Quotas
### How will I know if my quota has been exceeded?
#### Data
A <div class='red'>red message</span> indicating that the user data quota has been exceeded will be displayed at the top of the left history pane. Any new jobs queued will remain in the status "paused" (colored light blue) until the data size is within the quota limits.

#### Jobs
Any jobs queued after the limit of 8 has been met will remain in the status "paused" (colored light blue) until job quota is met.

### When can I run jobs on the Main instance again?
#### Data
Reduce the amount of data in your account. Start with removing any Histories that are no longer needed on the **Options → Saved Histories** form with the option **Delete Permanently**. More information about how to manage data is covered in this wiki [Managing Datasets](/Learn/ManagingDatasets) and in this video [Managing Histories](http://vimeo.com/galaxyproject/managehistories).

#### Jobs
To gain access to the server again, no user action is needed. When your existing jobs complete and number less than 6, new jobs will be added to the queue to execute (maximum of 6 concurrent). 

### My job ended with a failure due to memory or execution time
#### Description and Solutions
Please see the [Support](/Support#error_from_tools) wiki for help in determining if this is the case and possible solutions.

## Developers and Administrators
New Admin features have been added and more are planned for in the near term. Details explained in: [Disk Quotas](/Admin/Disk Quotas). Feedback about the implementation of quota management is welcomed at the [mailing list](/MailingLists) galaxy-dev@bx.psu.edu .

## Quotas at the Galaxy Test public instance
See [Test](/Test#quotas).

## Quota Implementation
Data quotas were implemented on the Main instance in mid-October 2011.

<div class='center'> <a href='http://galaxyproject.org/search/usegalaxy'><img src='/Images/Logos/UseGalaxySearch.png' alt='Search all "using Galaxy" resources' width="120" /></a>

[Search all "using Galaxy" resources](http://galaxyproject.org/search/usegalaxy) </div>
