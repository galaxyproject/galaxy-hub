---
title: Galaxy Test Instance
---


The Galaxy **Test** instance is available at https://test.galaxyproject.org/. Test is the Beta site for the Galaxy *[Main](/src/Main/index.md)* instance.  Main is the primary free public [Galaxy instance](http://usegalaxy.org/). *Test* is also free and public, and is a testbed where tools and framework functions are functionally and experimentally reviewed.

Test changes frequently and we don't actually guarantee things will work or that data/histories/workflows/visualizations will be persistent (even when saved in an account). Some new tools on Test will eventually be promoted to Main, but others will not. Backwards and forwards compatibility of data and tools on Test with data and tools on Main, in a Distribution, or from the Tool Shed should not be expected.

If you get an error on Test, there are many possible reasons for it. You might try running again, to make sure that some other change on test didn't interfere (updates occur frequently). If you do find out what went wrong (a specific bug in the tool wrapper/config) please [do let us know](/src/Support/index.md).

## Information about Test

The [Learn](/src/Learn/index.md) pages include information on how to use Test, Main, and most other Galaxy instances. Also see:

* [Datasets](/src/Learn/Managing Datasets/index.md)
* [Disk Quotas](/src/Admin/Disk Quotas/index.md)

See [Choices](/src/BigPicture/Choices/index.md) for more on other choices for using and running Galaxy.

## Job resubmission to Stampede

Certain tools will be automatically "resubmitted" to Stampede (see [Job execution on Stampede](/src/Test/index.md#stampede) for more about Stampede) if they initially run on Galaxy's local cluster but exceed the walltime (run time limit). The walltime differs per tool and is calculated based on previous average runtimes of that tool:

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

Our goal with the Stampede resubmission system is to provide a balance to Galaxy users: to allow those with relatively small jobs to run them quickly without a wait, but still be able to support larger scale analyses with a reasonable wait but higher job concurrency limits. See the [User data and job quotas](/src/Test/index.md#quotas) section below for more on concurrency limits.

If you know (due to previous runs of the tool using similar inputs and parameters) that your job will reach the walltime on the local cluster, you should directly submit it to Stampede to avoid the time wasted running to walltime on the Galaxy cluster.

<a name="Stampede"></a>
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


## Beta: De novo assembly on Blacklight

[Trinity](http://trinityrnaseq.github.io/) and [SPAdes](http://bioinf.spbau.ru/spades) can be run on the  [Blacklight supercomputer](http://www.psc.edu/index.php/resources-for-users/computing-resources/blacklight) at [PSC](http://www.psc.edu/) via Galaxy Test.

As with tools that run on Stampede, on the form for these tools, a **Job Resource Parameters** parameter is available that, if selected, will display a **Compute Resources** selection parameter. The options for this parameter are:

<table>
  <tr>
    <td> </td>
    <th> Compute resource choices </th>
  </tr>
  <tr>
    <th> PSC Blacklight 16 core (default): </th>
    <td> 48 hour walltime, 16 cores, 128 GB memory, variable wait </td>
  </tr>
  <tr>
    <th> PSC Blacklight 64 core: </th>
    <td> 48 hour walltime, 64 cores, 512 GB memory, variable wait </td>
  </tr>
  <tr>
    <th> PSC Blacklight 256 core: </th>
    <td> 48 hour walltime, 256 cores, 2 TB memory, variable wait </td>
  </tr>
  <tr>
    <th> PSC Blacklight test/development: </th>
    <td> 30 minute walltime, 16 cores, 64 GB memory, no/short wait </td>
  </tr>
</table>


<a name="Quotas"></a>
## User data and job quotas

<table>
  <tr>
    <td> </td>
    <th> Overall quotas </th>
  </tr>
  <tr>
    <th> Maximum total accounts per user: </th>
    <td> 1 registered/unregistered</td>
  </tr>
  <tr>
    <th> Maximum total user data on server: </th>
    <td> 10GB for registered users<br />1GB for unregistered users </td>
  </tr>
  <tr>
    <th> Maximum concurrent jobs: </th>
    <td> 4 for registered users<br />1 for unregistered users </td>
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
    <td> 3 registered, unregistered not allowed </td>
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

<br />
**[Terms and Conditions](https://test.galaxyproject.org/static/terms.html)**: *Attempts to subvert these limits by creating multiple accounts or through any other method may result in termination of all associated accounts.* 

### Monitoring data use

Exceeding quotas will prevent new jobs from running, but Galaxy users can monitor and [manage datasets](/src/Learn/Managing Datasets/index.md) in several ways:

1. Percent of quota limit used by a user account is noted in the top right corner of the Galaxy interface within a bar icon.
2. Exact total user data size and quota limit is noted on the page: **User &rarr; Preferences** (top menu bar).
3. Size of individual histories is listed on the page: **Options &rarr; Saved Histories** (left history pane's menu).
4. Size of individual datasets can be found within a dataset's expanded box either written directly under the dataset's name and/or by viewing the dataset's **Details** (*click* on View Details icon ![History Info Icon](/src/Images/Icons/HistoryInfo.png)).

Test server user interface:

<div class='center'><img src="/src/Test/QuotasOnTestScreenshot.png" alt="Screenshot showing quotas on Test server" width="800" /></div>

## User Account Quotas

### How will I know if my quota has been exceeded?

#### Data

A <div class='red'>red message</span> indicating that the user data quota has been exceeded will be displayed at the top of the left history pane. Any new jobs queued will remain in the status "waiting to run" (colored gray) until the data size is within the quota limits.

#### Jobs

Any jobs queued after the limit of 4 has been met will remain in the status "waiting to run" (colored grey) until job quota is met.

### When can I run jobs on the Test instance again?

#### Data

Reduce the amount of data in your account. Start with removing any Histories that are no longer needed on the **Options &rarr; Saved Histories** form and the option **Delete Permanently**. More information about data is covered on the [Managing Datasets](/src/Learn/Managing Datasets/index.md#actions) wiki.

#### Jobs

To gain access to the test server again, no user action is needed. When your existing jobs complete and number less than 4, new jobs will be added to the queue to execute (maximum of 4 concurrent).

### Special Use

#### Testing

If you are involved with scientific or functional testing of a new Galaxy tool, please send an email to [Galaxy-Bugs](mailto:galaxy-bugs AT lists DOT galaxyproject DOT org) to discuss options for data resources and a potential temporary quota increase.

## Developers and Administrators

New Admin features have been added and more are planned for in the near term. Details explained in: [Disk Quotas](/src/Admin/Disk Quotas/index.md). Feedback about the implementation of quota management is welcomed at the [Galaxy-Dev mailing list](/src/MailingLists/index.md).

## Quotas at the Galaxy Main public instance

See [Main](/src/Main/index.md#quotas).
