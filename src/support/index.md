---
autotoc: true
---

# Support

End-User Support Resource Short List

* [Q&A at Galaxy Biostars](http://biostar.usegalaxy.org) ([claim your account](/src/support/biostar/index.md))
* [Learn](/src/learn/index.md)
* [Teach](/src/teach/index.md)
* [Vimeo](http://vimeo.com/galaxyproject)
* [GalaxyProject.org](http://wiki.galaxyproject.org) &rarr; Execute a [Custom search](/src/support/index.md#custom_searches) through all project content
* [Galaxy Tricks](https://github.com/bgruening/galaxy-tricks)

Known issues:
* [Data Issues](/src/support/data-issues/)
* [Data Input Sorting](/src/support/sort-your-inputs/)
* [Tool Issues](/src/support/tool-issues/)
* [Enhancements](/src/support/enhancements/)


# Using Galaxy


## Galaxy NGS 101

The Big Picture: *[Galaxy NGS 101](/src/learn/galaxy-ngs101/index.md)*


## Learning Hub

See our [Learning](/src/learn/index.md) hub for key coverage of Galaxy user
interface concepts, data, and tools. Review "Shared Data/Published Pages" on
the [Main](/src/main/index.md) server [usegalaxy.org](http://usegalaxy.org) for
publication supplementals and tutorials.


## Screencasts

[Screencast](/src/learn/screencasts/index.md) videos demonstrate the
step-by-step for a range of topics. Packed with tips and methods usable across
analysis workflows plus presentations and tutorials for administrations, these
are a great resource for both the scientific and technical Galaxy communities.


## Custom Searches

Looking for something specific? Try *[Galaxy Custom
Searches](/src/news/custom-galaxy-search/index.md)* with a keyword or phrase.
The *[MailingList](http://galaxyproject.org/search/mailinglists)* search finds
all related prior Q & A from the [Galaxy
Biostar](/src/support/index.md#biostar) forum and any [Galaxy Project mailing
lists](/src/mailing-lists/index.md). The
*[UseGalaxy](http://galaxyproject.org/search/usegalaxy)* search finds all
online resources for information about using Galaxy.  This includes this wiki,
tool help and shared Galaxy objects at [UseGalaxy.org](http://usegalaxy.org),
and [Mailing Lists](/src/mailing-lists/index.md).

## Biostar

Galaxy has teamed up with [Biostar](http://biostars.org) to create a Galaxy
User support forum at
*[https://biostar.usegalaxy.org](https://biostar.usegalaxy.org)*.

*[How to log in and use...](/src/support/biostar/index.md)*

<div class='right'><a href='https://biostar.usegalaxy.org/'>
    <img src="/src/images/logos/GalaxyBiostar.png" alt="Galaxy Biostar" width="250" />
</a></div>

We want to create a space where researchers using Galaxy can come together and
share both scientific advice and practical tool help.  Whether on
*[http://usegalaxy.org](http://usegalaxy.org)*, a
*[Cloudman](http://usegalaxy.org/cloud)* instance, or any
*[other](/src/public-galaxy-servers/index.md) [Galaxy](http://getgalaxy.org)*,
if you have something to say about *Using Galaxy*, this is the place to do it!

## Mailing Lists

Galaxy has several mailing lists, including one public mailing list for
questions, one private mailing list for bug reports, and one announcement
mailing list. Manage subscriptions and learn more about these list at the
[Mailing Lists](/src/mailing-lists/index.md) home page.

## IRC Channel

Galaxy also has an IRC channel in which you can participate.  You can connect to the chat directly via browser  [here](http://webchat.freenode.net/?channels=#galaxyproject). This IRC channel is an informal online gathering place for the Galaxy community to post questions and help each other out.

Alternatively you can use the Gitter [channel](https://gitter.im/galaxyproject/Lobby) which is mirrored to the IRC.

The #galaxyproject IRC channel has an [online public archive](https://botbot.me/freenode/galaxyproject/) (starting 2014/10/22) and these archives are included in the Galaxy [search engines](http://galaxyproject.org/search/web).


## Galaxy Issue Board

The Galaxy Project uses [GitHub](https://github.com/galaxyproject/galaxy/issues) for issue tracking and feature requests.  Please see [Issues](/src/issues) for more information.


## Multiple Galaxies



Some researchers use more than one Galaxy server. How to move data between these is **[described here](/src/community/log/2016/moving-data-between-galaxies)**.

This procedure works between any two Galaxy instances, whether using the [Main](/src/main) public instance, a [Local](/admin/get-galaxy), a [Cloud](/cloud), and many [Public Galaxy Servers](/public-galaxy-servers).


# Solutions


## Tool help



Galaxy has a simplified tool interface packed with usage details. [Read more...](/src/support/tool-help)

## Getting an account



Having your own account on the public **[Test](/src/test)** and/or **[Main](/src/main)** server means that you can save histories, work with more data, associate an [OpenID](/learn/OpenID%20Login), and get the most out of Galaxy's functionality. Be sure to note that the public [Test](/src/test) and [Main](/src/main) instance **usage policies are <span class="red">one account per user<span class="grey"></span></span>**, as stated in our **[Terms and Conditions](https://usegalaxy.org/static/terms.html)**. Also, make sure your email address is valid so that you can confirm your new account (emails are case sensitive) and so that our administrator can contact you if needed (rare, but you'll want the email!). More details **[here](/src/support#Dataset_and_History_Guides)**.

Watch the **[Accounts on Main](http://vimeo.com/galaxyproject/accounts)** video for a quick how-to and see our **[User Accounts](/src/learn/user-accounts)** wiki for more help.

## Finding a tool



At the top of the left tool panel, type in a tool name or data type into the tool search box. Shorter keywords find more choices. Can't find the tool you want? Try looking in the **[Tool Shed](http://toolshed.g2.bx.psu.edu)**. New tools are added all the time that can be used in **[local](/admin/get-galaxy)** or **[cloud](/src/cloudman)** Galaxy instances.



## Loading data



Data is loaded using the tools in the _**Get Data**_ tool group. Some access specific data provider sites that will load data back into your Galaxy history. To directly load your own local data or data from another source, use the tool _**Get Data → Upload File**_ (also accessible from the top of the left tool panel, as seen in the graphics below). Want to practice import/export functions with small sample data? Import the [Upload sample data history here](https://usegalaxy.org/u/usinggalaxy/h/upload).

*   *Watch the [Getting Data In](/src/learn/galaxy-ngs101#getting-data-in) Screencasts*
*   Each file loaded creates one dataset in the history.
*   The maximum size limit is 50G (uncompressed).
*   Most individual file compression formats are supported, but multi-file archives are not (<tt>.tar</tt>, <tt>.zip</tt>).

### Get Data: Upload



*   Load by "browsing" for a local file. Only good for **very small** [datasets](/learn/managing-datasets). ( < 2G, but often works best for smaller). If you are having problems with this method, try FTP.
*   Load using an **HTTP URL** or **FTP URL**.
*   Load a few lines of plain text.
*   [Load using FTP](/learn/Upload%20via%20FTP). Either line command or with a desktop client.

### Get Data: EBI-SRA



*   Search for your data directly in the tool and use the Galaxy links
*   [Visual example](/src/support/ebi-sra-data-load)
*   Be sure to check your sequence data for correct quality score formats and the metadata "datatype" assignment. [Here is how...](/src/support#FASTQ_Datatype_QA)

### Get Data: Upload tool used with FTP



*   Load the data using line command FTP or a client. [More help...](/ftp-upload)
*   Note that the FTP server name is specific to the Galaxy you are working on. This is by default the URL of the server.
    *   For the public Main Galaxy instance at [http://usegalaxy.org](http://usegalaxy.org) the FTP server name to use is **usegalaxy.org**.
    *   For a default local (with FTP enabled, see next) the FTP server name to use is **localhost:8080**. If the server URL was modified, then use that custom URL.
*   If on another server, the FTP server name will appear in the **Upload** tool pop-up window (see graphics below). When using a local Galaxy server, be certain to _[configure your instance for FTP](/src/admin/config/upload-via-ftp)_ first.
*   Use your email and password for the same instance as your credentials to log in and save the data to your account.
*   Once the data is loaded (confirm through FTP client), use the **Upload** tool to load the data into a History.

### Upload tool location



![Upload tool location](/src/images/screenshots/Upload.png "Upload tool location")

### Upload tool option to move FTP datasets into a History



If you DO NOT see any files as in the example below, **load data using FTP first**, then come back to the _Upload_ tool. ![Upload tool "Load FTP data" function](/src/images/Screenshots?action=AttachFile&do=get&target=Upload_ftp_data.png "Upload tool "Load FTP data" function")

### Upload tips



*   **Data [quota](/learn/managing-datasets#Data_size_and_disk_Quotas) is at limit**, so _no new data can be loaded_. Disk usage and quotas are reported at _**User → Preferences**_ when logged in.
*   **Password protected data** will require a special URL format. Ask the data source. Double check that it is _publicly accessible_.
*   Use _**[FTP](/learn/Upload%20via%20FTP)**_, not _**SFTP**_. Check with local admin if not sure.
*   **No HTML content.** The loading error generated may state this. Remove HTML fields from your dataset before loading into Galaxy or omit HTML fields from the query if importing from a data source (such as Biomart).
*   Compression types **.gz/.gzip, .bz/.bzip, .bz2/.bzip2, and single-file .zip are supported.**
*   Only the **first file in any compressed archive** will load as a **[dataset](/learn/managing-datasets)**.
*   Data must be **< 50G** (uncompressed) to be successfully uploaded and added as a dataset to a history, from any source.
*   **Is the problem the dataset format or the assigned datatype?** Can this be corrected by editing the datatype or converting formats? See [Learn/Managing Datasets](/learn/managing-datasets) for help or watch the screencast above for a how-to example.
*   **Problems in the first step working with your loaded data?** It may not have _uploaded_ completely. If you used an FTP client, the transfer message will indicate if a load was successful or not and can often restart interrupted loads. This makes FTP a great choice for slower connections, even when loading small files.



## Downloading data

* **Download datasets** by clicking on the disk icon inside the [dataset](/learn/managing-datasets). Good for smaller sizes in all browsers.
* **Download entire histories** by selecting _"Export to File"_ from the History menu, and clicking on the link generated.
* **Transfer entire histories** by selecting _"Export to File"_ from the History menu, generating the link, coping the link in the "from" Galaxy instance, **then** in the "to" Galaxy instance select "Import from File" from the History menu, and paste in the link into the new form.
* The video **[Datasets 1](http://vimeo.com/galaxyproject/datasets1)** includes help about different datatypes and what to expect in the download icon (one file or two!).


### Download tip: Big data


**Browser option:** use Google Chrome and click on the disc icon (we've found that this browser supports better continuous downloads).

**Command-line option:** from a terminal window on your computer, you can use **[wget](https://www.gnu.org/software/wget/manual/html_node/Download-Options.html#Download-Options)** or **[curl](http://en.wikipedia.org/wiki/CURL)**.

The direct download link to a dataset can be obtained by right clicking the
floppy disk icon and choosing "Copy Link Location" (for most datasets) or
"Download Dataset/Download bam_index" (for BAM datasets there are two
downloads). Once you have the link, type this (where "$" indicates the terminal
prompt), so that the link is inside of single quotes. Like many commands, there
are many options. These are examples commonly used with Galaxy.

Here's what it looks like using 'wget':

```
$ wget -O '<link>'
$ wget -O --no-check-certificate '<link>' # ignore SSL certificate warnings
$ wget -c '<link>'                        # continue an interrupted download
```

Or, using curl:

```
$ curl -o outfile '<link>' 
$ curl -o outfile --insecure '<link>'     # ignore SSL certificate warnings
$ curl -C - -o outfile '<link>'           # continue an interrupted download
```


## Dataset and History Guides



Review details about these Galaxy objects, plus Workflows and Visualizations in the **[Learn](/learn)** wiki

### Get Registered



*   From the top **User** menu, select **Register**
*   More details are here: [Getting an account](/src/support#Getting_an_account)
*   Registered accounts work with multiple Histories, increased quotas (both data and job/tool access), and have access to full Galaxy functionality.
*   A valid email address is the only piece of identifiable information that you share for registration
*   We never, ever, share your Registration information
    *   On rare occasions we might send an important administration email about your account
    *   These are emails that you definitely _want to get_
    *   Use a valid email address. Not only to confirm you account, but to ensure that we can communicate with you when really necessary
*   Make sure to **Register** for an account when doing any serious work
    *   Register at any time, even in the middle of an analysis. The current History will be added
    *   Log into your existing account. The current History will be added
    *   Please follow the [User quotas](/src/main) for the Galaxy server in use. For [http://usegalaxy.org](http://usegalaxy.org), this is one account per user.

### Example: My History is missing!



*   _If you were working with an unregistered account, the History could really be now lost to you_. Get Registered before starting again!

*   **Find any History**

    *   Locate the History menu gear icon at top of right History panel in the "Analyze Data" view
    *   Select the option "Saved Histories" from this pull-down menu
    *   At the top of the list in the middle panel, click into "Advanced Search"
    *   Select "status: all" to see all of your active, deleted, and permanently deleted histories.
        *   Histories in all states are archived for a fairly long time for registered accounts. Meaning, one will always find their data here if it ever appears to be "lost".

### Example: My account quota is too small



*   _Account usage showing that quota is exceeded -[over 250 GB](/src/main)??_ Find all Histories and Purge those not needed.

*   **How to find Deleted _but not Permanently Deleted (Purged)_ Histories**

    *   [Learn/managing-datasets#Delete_vs_Delete_Permanently](https://wiki.galaxyproject.org/learn/managing-datasets#Delete_vs_Delete_Permanently)

*   **Usage still too large based on active plus deleted Histories after Purging?**

    *   Send us an email from the same account as registered at [http://usegalaxy.org](http://usegalaxy.org) and let us know. We can recalculate disk usage for you. [galaxy-bugs@lists.galaxyproject.org](mailto:galaxy-bugs@lists.galaxyproject.org)

### Example: Dataset metadata missing or incomplete



*   **How to notice if this is a problem**

    *   The dataset will not download when using the disk icon
    *   Tools error when using a specific dataset that has been used before successfully
    *   Tools error with a message that ends with: <tt class="backtick">OSError: [Errno 2] No such file or directory</tt>. Note that not all failures of this type are due to metadata and may simply be a cluster failure - rerunning the job may resolve the problem instead, but try the solution first.

*   **Solution**

    *   Reset the metadata on the dataset(s). This may be an uploaded dataset or one created by prior tools. It could be one of the input datasets to a failed job.
        *   How to: Click on the _**Auto-detect**_ button found near the bottom of the _**Edit Attributes**_ form for the dataset. Reach this form using the dataset's ![pencil](/src/images/icons/pencil.png "pencil") icon.

*   **If this does not resolve the problem**

    *   If resetting metadata does fix the issue, then there may have been a transient cluster job failure. Re-run the job at least once.
*   **Other problematic dataset solutions are listed here**, but these are not are not based on the same underlying issue.

    *   [Tool doesn't recognize dataset](/src/support#Tool_doesn.27t_recognize_dataset)

    *   [FASTQ Datatype QA](/src/support#FASTQ_Datatype_QA)

    *   [Troubleshooting errors from tools](/src/support#Error_from_toolsTroubleshooting_errors_from_tools) - Includes how to check your data inputs and diagnose memory and other failure reasons.

### Example: Job errors and failed datasets



*   **How to notice if this is a problem**

    *   The dataset will be [red in color](https://wiki.galaxyproject.org/Support#Red).

*   **How to troubleshoot**

    *   Click on the ![bug](/src/images/icons/bug.png "bug") icon. Many errors will explain the problem.

    *   Odd cluster problem? Rerun first. [Persistent errors can be reported](https://wiki.galaxyproject.org/Support#Reporting_tool_errors) using the ![bug](/src/images/icons/bug.png "bug") icon's form. Note that the job must have been run at [http://usegalaxy.org](http://usegalaxy.org) or reproduced there. LEAVE ALL DATASETS UNDELETED.

    *   Job ran out of memory? [See here](https://wiki.galaxyproject.org/Support#Job_failure_reason:_exceeds_memory_allocation)

    *   Did you **[sort your inputs](https://github.com/jennaj/support-prior-qa/wiki/Sort-your-inputs)**? This matters and can get jobs that fail for memory to run successfully.



## Dataset status and how jobs execute



The Galaxy user interface (UI) has been designed to communicate job execution status through visual cues and concise messages. Learn more about how to identify these cues by [examining what Datasets in different states look like](/Histories#History_Panel_Datasets).

When a tool is executed, one or more new **[datasets](/learn/managing-datasets)** are added to a history. The same is true when a **workflow** is executed. _If using the public [Main](/src/main) Galaxy instance, the most effective strategy when running jobs on the shared resource is to start jobs (or workflows), and then leave them alone to execute until completion._

When work is urgent during peak-usage times on the public **[Main](/src/main)** Galaxy instance, a **[CloudMan](/src/cloudman)** instance is a quick-to-implement alternative. For large scale and/or urgent ongoing work, a **[CloudMan](/src/cloudman)**, **[Local](/admin/get-galaxy)**, or **[SlipStream Galaxy](http://www.bioteam.net/slipstream/galaxy-edition)** each have advantages as a longer-term solution. [Read more ...](/src/choices)

_So, how does the processing of tool jobs on **[Main](/src/main)** actually work?_

*   The **color** of a dataset designates the current status of the underlying job.

### Green



*   The job completed successfully.
*   The resulting data is ready to be used in visualizations, available as input to tools, can be downloaded, or utilized for any other downstream purpose.

### Yellow



*   The job is executing. Allow this to complete!
*   If you are using the public [Main](/src/main) Galaxy instance, this job is running on one of our clusters. Different types of tools send jobs to different clusters appropriate for the requirements of each tool. Some tools are more compute intensive than others and significant resources are dedicated to job processing. Jobs have up to 72 hours to complete, if they run longer than this they will fail with a "wall-time" error and turn _red_. Examining tool paramaters is the first option, less sensitive parameters may result in an equally acceptable result, but use less resource. If that is not appropriate or does not succeed, a [CloudMan Galaxy](/src/cloudman) or [Local Galaxy](/admin/get-galaxy) with sufficient resources may be the solution.

### Grey



*   The job is being evaluated to run (new dataset) or is queued. Allow this to complete.
*   If you are using the public [Main](/src/main) Galaxy instance, this job is queued, waiting for an opening on the appropriate cluster. **It is _very important_ to allow queued jobs to remain queued, and to not delete/re-run them**. If re-run, this not only moves the new job back to the end of the queue, effectively lengthening the wait time to execute, but if done repeatedly, the volume of "executing deleted" jobs can create additional work processes in the history as these are cleared away, using up resources, and can cause additional delays.

### Red



*   The job has failed.
*   There can be many reasons for this, see the next section, **[Error from tools](/src/support#Error_from_tools)** for details.

### Light blue



*   The job is paused.
*   This indicates either an input has a problem or that you have [exceeded disk quota](/src/main#User_Account_Quotas) set by the administrator of the Galaxy instance you are working on.

*   If there is an input problem, correct the problem (often by re-run an upstream job) and click on the tool form option to "resume dependencies". You will not need to stop or restart downstream jobs in most cases (permit paused jobs to start, as inputs datasets become available, through this method).
*   If you need to make room, [permanently delete unneeded data](/learn/managing-datasets#Delete_vs_Delete_Permanently). If you are using the public [Main](/src/main) Galaxy instance, disk quotas are defined [here](/src/main). You will not need to delete/re-run jobs while doing this, unless you are filtering your work to prevent exceeding quota again (only purging, not restarting at this time). Instead, restart using the History menu option "Resume Paused Jobs".

### Grey, Yellow, Grey again ???



*   The job is waiting to run, due to admin re-run or an automatic fall-over to a longer-running cluster (currently, Stampede)
*   First, see the descriptions for **grey** and **yellow** jobs above.

*   The job was first submitted to the default cluster, but did not finished within the "wall-time" quota. Instead of failing, the job was automatically submitted to the long-running cluster **Stampede**. This cluster offers more execution time resource to the job. The wait may be longer since jobs running on this cluster by other users are also executing for a longer time period.

*   Stopping (deleting) the job and then restarting places it back at the end of the first queue, where the cycle will begin again, extending wait time even further. Please do not do this. Allow the job to process.
*   If the job fails after running on Stampede, then it is too large to run on [http://usegalaxy.org](http://usegalaxy.org), also known as "Main". [Choose](/choices) another strategy to execute your job on a different Galaxy platform or consider modifying inputs/parameters to make the job [less compute intensive](/src/support#Job_failure_reason_.22ran_longer_than_the_maximum_allowed_job_run_time.22).

*   Read more about the details of different clusters on the **[Main](/src/main)** wiki.

### Bright blue with moving arrow (deprecated)



*   May be found in earlier Galaxy versions.
*   Applies to "Get Data → Upload File" tool only - the upload job is queuing or running

*   The job may run immediately, or may turn _grey_ if the server is busy, meaning that **guidelines for grey jobs apply**, and these _grey_ datasets should never be deleted/re-run, for the same reasons explained above.

*   An upload job that seems to stay in the "_bright blue with moving arrow_" state for a very long time generally indicates that the file being loaded is too large for the method used (specifically, a browsed-file upload) and [FTP](/learn/Upload%20via%20FTP) should be used instead. This is the only active job that should be deleted under normal usage, as it will never complete (no file over 2G will ever load via file browser upload).

## Error from tools



_**[Dataset](/learn/managing-datasets) format problems are the #1 reason that tools fail.**_ Most likely this problem was introduced during the initial data upload. Double check the [dataset](/learn/managing-datasets) against Galaxy's [datatypes](/learn/datatypes) or external specifications. In many cases, the format issues can be corrected using a creative combination of Galaxy's tools.


### Troubleshooting tool errors - Review THIS before submitting bug reports

*   Verify the _size/number of lines or md5sum between the source and Galaxy_. Use **Line/Word/Character count of a dataset** or **Secure Hash / Message Digest on a dataset** to do this.
*   Look at the _end of your file_. Is it complete? Are there extra empty lines? Use **Select last lines from a dataset** with the default **10** to check.
*   Check errors that come from tools such as the **FASTQ Groomer**. Many tools report the _exact problem_ with _exact instructions_ for corrections.
*   Is the format to specification? Is it recognized by Galaxy? By the target tool or display application? Check against the [Galaxy Datatypes](/learn/datatypes) list.
    *   Are you using a **[Custom Reference Genome](/learn/custom-genomes)**? Have you tried the quick [Troubleshooting](/learn/custom-genomes#Troubleshooting) tips on the wiki?
    *   Note: not all formats are outlined in detail as they are common types or derived from a particular source. Read the target tool help, ask the tool authors, or even just google for the most current specification.
*   Is the problem the [dataset](/learn/managing-datasets) format or the assigned datatype? Can this be corrected by editing the datatype or converting formats? Often a combination of tools can correct a formatting problem, if the rest of the file is intact (completely loaded).
*   Is the problem a scientific or technical problem? Also see [#Interpreting scientific results](/src/support#Interpreting_scientific_results) to decide.
    *   _Example_ **NGS: Mapping** tools: On the tool form itself is a short list of help plus links to publications and the tool author's documentation and/or website. If you are having trouble with **Bowtie**, look on this tool's form for more information, including a link to this website: [http://bowtie-bio.sourceforge.net/index.shtml](http://bowtie-bio.sourceforge.net/index.shtml).
    *   _Example_ **NGS: RNA Analysis** tools: See the _[galaxy-rna-seq-analysis-exercise](https://usegalaxy.org/u/jeremy/p/galaxy-rna-seq-analysis-exercise)_ tutorial and _[transcriptome-analysis-faq](https://usegalaxy.org/u/jeremy/p/transcriptome-analysis-faq)_. If these do not address the problem, then contacting the tool authors is the next step at: [mailto:tophat.cufflinks@gmail.com](mailto:tophat.cufflinks@gmail.com).
    *   _Example_ **NGS: SAM Tools** tools: SAMTools requires that all input files be to specification ([Learn/datatypes](/learn/datatypes)) and that the same _exact_ reference genome is used for all steps. Double checking format is the first check. Double checking the the same exact version of the reference genome is used is the second check. The last double check is that the number of jobs and size of data on disk is under quota. Problems with this set of tools is rarely caused by other issues.
*   Tools for fixing/converting/modifying a [dataset](/learn/managing-datasets) will often include the [datatype name](/learn/datatypes). Use the tool search to locate candidate tools, likely in tool groups _**Text Manipulation, Convert Formats, or NGS: QC and manipulation**_.
*   The most commonly used tools for investigating problems with upload, format and making corrections are:
    *   **TIP**: use the Tool search in top left panel to find tools by keyword
    *   _**Edit Attributes**_ form, found by clicking a dataset's ![Images/Icons/pencil.png](/src/images/icons/pencil.png "Images/Icons/pencil.png") icon
    *   _**Convert Format**_ tool group
    *   **Select first lines from a dataset**
    *   **Select last lines from a dataset**
    *   **Line/Word/Character count of a dataset**
    *   **Secure Hash / Message Digest on a dataset**
    *   **FASTQ Groomer**
    *   **FastQC** - [How to read the report](http://www.bioinformatics.babraham.ac.uk/projects/fastqc/Help/3%20Analysis%20Modules/)
    *   **Tabular to FASTQ**, **FASTQ to Tabular**
    *   **Tabular to FASTA**, **FASTA to Tabular**
    *   **FASTA Width formatter**
    *   _**Text Manipulation**_ tool group
    *   _**Filter and Sort**_ tool group

### Job failure reason: cancelled by admin or a cluster failure

The initial error message will be reported as below, and is found in the comments of a failed dataset (red dataset):

```
This job failed because it was cancelled by an administrator.
Please click the bug icon to report this problem if you need help.
```

Other reported error indicate a cluster failure in the error report (click on the bug icon to review. These often do not need to be submitted as the failure error message describes the problem and correction path.

The error indicates that the job was likely given inputs and/or parameters that are either malformed, do not meet the requires for the tool's usage, or the parameters used are very computationally intensive. See Troubleshooting tool errors. These are the exact same checks a submitted bug report is reviewed for.

It is also possible that there was a server or cluster error. A re-run for nearly all failed jobs is the first pass solution. Exceptions may be if the error is clarified as exceeding memory or job execution time (see next sections).

See the two sections below for details about how to determine and resolve the root cause of the error.

If after reviewing, and re-running, and the cause of the error is unclear:

*   Search prior questions/answers at [Galaxy Biostar](https://biostar.usegalaxy.org)

*   Submit a novel question at [Galaxy Biostar](https://biostar.usegalaxy.org)

*   [Report the novel issue](/src/support#Reporting_a_software_bug)

### Job failure reason: exceeds memory allocation



The full error message will be reported as below, and can be found by clicking on the bug icon for a failed job run (red dataset):

```
job info:
This job was terminated because it used more memory than it was allocated.
Please click the bug icon to report this problem if you need help.
```

On rare cases when the memory quota is exceeded very quickly, an error message such as the following can appear:

```
job stderr:
Fatal error: Exit code 1 ()
Traceback (most recent call last):
(other lines)
Memory Error
```

The error indicates that the job ran out of memory while executing on the cluster node that ran the job. **This memory is different than the amount of disk usage in an account**.

Often memory errors can be avoided by the user executing the job:

*   Double check the inputs to the tool. Are the data [properly formatted and labeled](/src/support#Dataset_special_cases)?

*   Review the parameters for the tool and determine if any changes made away from the default setting (or possibly the detail settings) are compute-intensive. Make changes if they suit your research goals. See the underlying tool's documentation to better understand specific parameters. This is often linked in the Help section on a tool's execution form.
*   If the tool used was one that compares two dataset, change the order of the inputs, and test with a re-run. Some tools consume less memory when the larger dataset is entered as the first input on the tool form.
*   Also see the troubleshooting help [here](/src/support#Error_from_tools).

*   In some cases, reporting the memory issue to our team through the "green bug" icon from a dataset is a good way to let us know about tools that run out of memory resource. With the expectation that we cannot probably not solve your issue directly, but cumulative feedback helps us to learn which tools would benefit from additional resource allocation.

If the job remains too large to run on the public [Main](/src/main) Galaxy instance at [http://usegalaxy.org](http://usegalaxy.org), then moving to an instance where more memory can be allocated to jobs is the solution. A good choice is [CloudMan](http://usegalaxy.org/cloud) as processing memory is easily scaled up. [AWS in Education](http://aws.amazon.com/grants/) grants can help with costs. Another option is setting up a [local Galaxy](http://getgalaxy.org), if you have a computer/server with enough processing memory (16 GB minimum, but more is likely needed if the jobs are large, possibly up to 64 GB).

### Job failure reason: execution exceeds maximum allowed job run time (walltime)



The full error message will be reported as below, and can be found by clicking on the bug icon for a failed job run (red dataset):

```
job info:
This job was terminated because it ran longer than the maximum allowed job run time.
Please click the bug icon to report this problem if you need help.
```



The error indicates that the job execution time exceeded the "wall-time" on the cluster node that ran the job. "Wall-time" is the maximum amount of time any job has to complete before it is terminated. When using the public [Main](/src/main) Galaxy instance at [http://usegalaxy.org](http://usegalaxy.org), see the walltime available [here](/src/main#Beta:_Job_execution_on_Stampede).

Sometimes the execution time of a job can be shorted by adjusting the inputs, parameters used, or the cluster used (try **[Stampede or Jetstream](/src/main)**, if available for the tool form under the section **Job Resource Parameters**). This solution is similar to jobs that error [because they exceed memory allocation](https://wiki.galaxyproject.org/Support#Job_failure_reason_.22used_more_memory_than_it_was_allocated.22).


*   If the tool used was one that compares two dataset, change the order of the inputs, and test with a re-run. Some tools consume less memory when the larger dataset is entered as the first input on the tool form.
*   Also see the troubleshooting help [here](/src/support#Error_from_tools).

*   Give the longer-running cluster a try, see the **[Main](/src/main)** wiki's section about Stampede (Jetstream is also a choice).

If the job remains too large to run on the public [Main](/src/main) Galaxy instance at [http://usegalaxy.org](http://usegalaxy.org), then moving to an instance where more resource can be allocated for jobs is the solution. A good choice is [CloudMan](http://usegalaxy.org/cloud). [AWS in Education](http://aws.amazon.com/grants/) grants can help with costs.

## Tool doesn't recognize dataset



Usually a simple datatype assignment incompatibility between the [dataset](/learn/managing-datasets) and the tool. Expected input [datatype](/learn/datatypes) format is explained on the Tool form itself under the parameter settings. _**Convert Format**_ or modify the datatype using the dataset's ![pencil](/src/images/icons/pencil.png "pencil") icon to reach the _**Edit Attributes**_ form. Many metadata attributes can be edited on these forms, including **database**. You may need to first create a **[Custom Build](/learn/custom-genomes#Custom_Builds)** when using a [Custom Reference Genome](/src/support#Custom_reference_genome).

## Dataset special cases



### FASTQ Datatype QA



*   If the required input is a [FASTQ](/learn/datatypes#Fastq) datatype, and the data is a newly uploaded FASTQ file, run **FastQC** then **FASTQ Groomer** as first steps, then continue with your analysis. Watch the **[FASTQ Prep Illumina](http://vimeo.com/galaxyproject/fastqprep)** screencast for a walk-through.

    *   _If you are certain that the quality scores are already scaled to Sanger Phred+33_ (the result of an Illumina 1.8+ pipeline), the datatype ".fastqsanger" can be directly assinged. Click the ![pencil](/src/images/icons/pencil.png "pencil") icon to reach the _**Edit Attributes**_ form. In the center panel, click on the "Datatype" tab (3rd), enter the datatype ".fastqsanger", and save. Metadata will assign, then the dataset can be used.

    *   _If you are not sure what type of FASTQ data you have_, see the help directly on the **FASTQ Groomer** tool for information about types.

        *   _For Illumina_, first run **FastQC** on a sample of your data ([how to read the full report](http://www.bioinformatics.babraham.ac.uk/projects/fastqc/Help/3%20Analysis%20Modules/)). The output report will note the quality score type interpreted by the tool. If not ".fastqsanger", run **FASTQ Groomer** on the entire dataset. If '.fastqsanger", just assign the datatype.

        *   _For SOLiD_, run **NGS: Fastq manipulation → AB-SOLID DATA → Convert**, to create a ".fastqcssanger" dataset. If you have uploaded a color space fastq sequence with quality scores already scaled to Sanger Phred+33 (".fastqcssanger"), first confirm by running **FastQC** on a sample of the data. Then if you want to double-encode the color space into psuedo-nucleotide space (required by certain tools), see the instructions on the tool form **Fastq Manipulation** for the conversion.

    *   _If your data is [FASTA](/learn/datatypes#Fasta)_, but you want to use tools that require [FASTQ](/learn/datatypes#Fastq) input, then using the tool **NGS: QC and manipulation → Combine FASTA and QUAL**. This tool will create "placeholder" quality scores that fit your data. On the output, click the ![pencil](/src/images/icons/pencil.png "pencil") icon to reach the _**Edit Attributes**_ form. In the center panel, click on the "Datatype" tab (3rd), enter the datatype ".fastqsanger", and save. Metadata will assign, then the dataset can be used.

### Tabular/Interval/BED Datatype QA



*   If the required input is a [Tabluar](/learn/datatypes#Tabular) datatype, other datatypes that are in a specialized tabular format, such as .bed, .interval, or .txt, can often be directly reassigned to tabular format. Click the ![pencil](/src/images/icons/pencil.png "pencil") icon to reach the _**Edit Attributes**_ form. In the center panel, using tabs to navigate, change the datatype (3rd tab) and save, then label columns (1st tab) and save. Metadata will assign, then the dataset can be used.

*   If the required input is a [BED](/learn/datatypes#Bed) or [Interval](/learn/datatypes#Interval) datatype, the reverse (.tab → .bed, .tab → .interval) may be possible using a combination of _**Text Manipulation**_ tools, to create a [dataset](/learn/managing-datasets) that matches the BED or Interval [datatype](/learn/datatypes) specifications.

## Reference genomes



Using the _**same exact reference genome**_ for all steps in an analysis is often _**mandatory**_ to obtain accurate results. To use the reference genomes available on [usegalaxy.org (Main)](http://usegalaxy.org), get the genome from our **[rsync server](/admin/UseGalaxyRsync)**.

### Detecting Genome Mismatch Problems



*   _How can I tell if I have a **reference genome mismatch problem**?_

    *   There isn't one single error that points to this problem. But, if you are running a tool for the first time using a newly uploaded dataset, and an [error occurs](/src/support#Error_from_tools) or more likely simply [unexpected results](/src/support#Interpreting_scientific_results) are produced - double checking the reference genome would be a good choice.

### Correcting Chromosome Identifier Conflicts



*   _I suspect there is a problem with the identifiers but how can I check? Or better, how can I <span class="u">fix the problem</span>?_

    *   A quick way to check for this issue is to compare the chromosome identifiers in the input datasets to each other and to the reference genome used (or intended to be used).
    *   Even small differences in identifiers can cause tools to fail, produce warnings, or create incomplete results. This is the second most common cause of usage-related tool failures ([input format problems](/src/support#Error_from_tools) are the first).

    *   Using an Ensembl-based chromosome identifier file on Galaxy [Main](/src/main) with a locally cached reference genome? Most built-in, native, reference genomes are sourced from [UCSC](http://genome.ucsc.edu) and have UCSC-based identifier names. When using inputs with both versions of identifiers in the same analysis pipeline, there will almost certainly be errors or unexpected results. But, in many cases, inputs from the history can be adjusted to match the cached data, all within Galaxy. [Read more about how...](/src/support/ChromIdentifiers)

    *   _Why isn't my Ensembl GTF compatible with Cufflinks and how can I use Ensembl GTFs with Cufflinks?_

        *   First, determine if an Ensembl GTF is the best choice. If an iGenomes version is available, this has advantages due to the addition of specific attributes utilized by the RNA-seq Tuxedo pipeline. Check at the _Cufflinks_ website [here](http://cufflinks.cbcb.umd.edu/igenomes.html).

            *   Download the .tar file locally, uncompress it, then upload _only_ the .gtf file to Galaxy. Loading .tar archives is not supported and has unpredictable outcomes (sometimes the first file in the archive will load - but this is not the file you need, sometimes only a portion of the first file will load - without a warning, and other times an upload error will result: none of these cases should be reported as a bug report/tool error).

            *   For certain genomes, the reference annotation GTF file is available on the public [Main](/src/main) Galaxy instance, [http://usegalaxy.org](http://usegalaxy.org), under _Shared Data -> Data Libraries -> iGenomes_.

        *   Next, if you want to proceed, [confirm that your identifiers are a good candidate](/src/support/ChromIdentifiers#Reference_Genome_Contents) for the addition of the "chr" adjustment, then use the workflow available in the [Transcriptome Analaysis FAQ](http://usegalaxy.org/u/jeremy/p/transcriptome-analysis-faq#faq5).

### Avoiding Genome Mismatch Issues



*   _When **moving between instances**, what can be done to mitigate the risk of using the wrong assembly?_

    *   When moving between a **Galaxy [CloudMan AMI](/src/cloudman) and the public [Main](/src/main) Galaxy** instance, just make sure the database name is the same. If the assigned database name is the same, the content of the reference genome is the same.

    *   When moving between a **[local Galaxy](/admin/get-galaxy) and the public [Main](/src/main) Galaxy** instance, there are a few choices:

        *   Consider using our version of commonly used genomes, [available through our rsync server](/admin/Data%20Integration#Get_the_data)

        *   [Make your own indexes](/admin/NGS%20Local%20Setup), but check against our [rsync indexes](/admin/Data%20Integration#Get_the_data) to be aware of differences

        *   When there are differences, use your own genome as a [Custom Reference Genome](/src/support#Custom_reference_genome) with tools

    *   When moving between a **[local Galaxy](/admin/get-galaxy) and a Galaxy [CloudMan AMI](/src/cloudman)**, the same guidelines as above for [Main](/src/main) would apply, since [Main](/src/main) and the [CloudMan AMI](/src/cloudman) are based off of the same content

*   _**How do I load a reference genome?**_

    *   Use FTP - details are [here...](/ftp-upload) and troubleshooting help is [here...](/src/support#Trouble_loading_data)

    *   If your genome is small (bacterial, etc.), using it as a [Custom Reference Genome](/src/support#Custom_reference_genome) is the quickest way to get it into Galaxy and to start using it with tools.

### Reference Genomes and GATK



*   See the help under [Custom Genomes and GATK](/src/support#Tools_on_the_Main_server:_GATK)

## Shared and Published data



Have you been asked to share a history? Or has someone shared a workflow with you but you're not sure where to find it? Or maybe you just want to find out more about how publishing your work in Galaxy can be used to support your next publication? Watch the how to **[Share and Publish](http://vimeo.com/galaxyproject/sharepublish)** screencast and [read more here](/learn/share).

## Reporting tool errors



*   If running a tool on the [public Galaxy server](/src/main) (i.e., [http://usegalaxy.org](http://usegalaxy.org)) is resulting in an error (the dataset is <span class="red">red</span>), and you can't determine the root cause from the error message or input format checks:

    *   Re-run the job to eliminate transitory cluster issues.
    *   Report the problem using the dataset's ![bug](/src/images/icons/bug.png "bug") icon. Do not submit an error for the first failure, but leave it _**undeleted**_ in your history for reference.

    *   **IMPORTANT**: Get the _quickest resolution_ by leaving **all** of the input and output datasets in the analysis thread leading up to the error in your history _**undeleted**_ until we have written you back. Use _**Options → Include Deleted Datasets**_ and click dataset links to _**undelete**_ to recover error datasets before reporting the problem, if necessary.

        *   _Example:_ Error with Cufflinks? Leave the ungroomed + groomed FASTQ, Bowtie/Tophat SAM, optional GTF + custom genome, _and_ Cufflinks datasets _**undeleted**_.

    *   Include in the bug report what checks confirmed that data format was not an issue
    *   Anything else you feel is relevant to the error
*   We do our best to respond to bug reports as soon as possible.
*   Please send all email as _**reply-all**_ as we work to resolve the error. The galaxy-bugs address we will be corresponding from is internal to the Galaxy team only and we work together to resolve reported problems.

*   If you have resolved the issue, a reply to the bug report to let us know is appreciated.

## Interpreting scientific results



A double check against the tool help and documentation is the first step. If the tool was developed by a 3rd party, they are likely the best experts for detailed questions. Tool forms have links to documentation/authors.

### Tools on the Test server



*   Tools on [Test](/src/test) will have little to no support help offered.

*   [Test](/src/test) tool errors reported as a bug reports ([#Error from tools](/src/support#Error_from_tools)) are considered low priority and may not receive a reply.

*   General feedback & discussion threads (instead of questions requiring a reply from the Galaxy team) are welcomed at the [development mailing list](/src/support#Public_mailing_list_Q_.26_A_discussions).

*   Exceptions are possible. Sometimes community users help to test-drive new functionality. If you are interested in this type of testing for a particular tool, contact us on the [development mailing list](/src/support#Public_mailing_list_Q_.26_A_discussions).

### Tools on the Main server: RNA-seq



*   _Example_ → _**RNA-seq analysis**_ **tools.**

    *   **Read the Galaxy team's publication, then review the live supplement and try the tutorial**

        *   Supplement at **[usegalaxy.org](http://usegalaxy.org)**: **[Interactive RNA-seq analyses by visualization with Trackster](https://usegalaxy.org/u/jeremy/p/interactive-rna-seq-with-trackster)**

        *   Goecks, et al. **[http://www.nature.com/nbt/journal/v30/n11/full/nbt.2404.html](http://www.nature.com/nbt/journal/v30/n11/full/nbt.2404.html)** _Nature Biotechnology_ 30, 1036–1039 (2012) doi:10.1038/nbt.2404

    *   **Read the online Manual**

        *   **[http://cole-trapnell-lab.github.io/cufflinks/manual/](http://cole-trapnell-lab.github.io/cufflinks/manual/)**

    *   **Learn more about Referece Based RNA-seq**

        *   **[Learn/GalaxyNGS101#Reference-based_RNA-seq](https://wiki.galaxyproject.org/learn/GalaxyNGS101#Reference-based_RNA-seq)**

    *   **Review and try the Galaxy team's tutorial exercise**

        *   **[Galaxy RNA-seq Analysis Exercise](https://usegalaxy.org/u/jeremy/p/galaxy-rna-seq-analysis-exercise)**

    *   **Explore the Galaxy community's RNA-seq learning resources**

        *   **[Galaxy community RNA-seq Tutorials](/learn#Other_Tutorials)**

    *   **Read the publication from the tool authors**

        *   Trapnell, et al. **[NGS analyses by visualization with Trackster](http://www.nature.com/nprot/journal/v7/n3/full/nprot.2012.016.html)** _Nature Protocols_ 7, 562–578 (2012) doi:10.1038/nprot.2012.016

    *   **Verify your inputs!** - format or data mismatch issues are the most common problems and are usually easily solved

        *   [GTF](/learn/datatypes#GTF) dataset formats can widely vary in the 9th **attribute** column. Cufflinks and the other tools in this set expect a certain format for full functionality. [GFF3](/learn/datatypes#GFF3) datasets have a specific structure, including a unique "ID" attribute. Expected input dataset details are explained in the Galaxy [file format specifications](/learn/datatypes) and in the tool's manuals: [http://cole-trapnell-lab.github.io/cufflinks/cufflinks/index.html#cufflinks-input-files](http://cole-trapnell-lab.github.io/cufflinks/cufflinks/index.html#cufflinks-input-files), [http://cole-trapnell-lab.github.io/cufflinks/cuffdiff/index.html#cuffdiff-input-files](http://cole-trapnell-lab.github.io/cufflinks/cuffdiff/index.html#cuffdiff-input-files) & [http://ccb.jhu.edu/software/tophat/index.shtml](http://ccb.jhu.edu/software/tophat/index.shtml).

        *   Using the same reference genome for all steps is very important. Even small differences in chromosome/scaffold names can result in errors. Double check that the naming between the reference genome and any other inputs such as SAM/BAM and GTF datasets all use the same naming conventions. See our [FAQ](https://usegalaxy.org/u/jeremy/p/transcriptome-analysis-faq) for more help if this is suspected to be the root cause of an error.

        *   Confirming GTF/GFF3 data sources using **[gffread](http://cole-trapnell-lab.github.io/cufflinks/file_formats/#the-gffread-utility)** can be one way to discovering where problems are.

    *   **Still stuck?**

        *   If the tool form help, publications & supplemental/tutorials including those from the community under [Learn](/learn), the [Transcriptome FAQ](https://usegalaxy.org/u/jeremy/p/transcriptome-analysis-faq), or tool author's web sites do not address the question or problem, then contacting the tool authors is often the next step for detailed algorithm questions: [mailto:tophat.cufflinks@gmail.com](mailto:tophat.cufflinks@gmail.com).

        *   You can also try searching the [Galaxy Mailing Lists and Galaxy Biostar](http://galaxyproject.org/search/mailinglists) for prior Q&A, then ask a question at [galaxy Biostar](/src/support#Starting_a_scientific.2C_data.2C_or_tool_usage_thread) if the problem is new or you just need Galaxy-specific help.

        *   If you ended up with a failed dataset (red), it is sometimes better to submit that instead as a [tool error (bug report)](/src/support#Error_from_tools) unless the question is general.

        *   _We can help or guide you to help_. Whenever [sharing](/learn/share) or submitting a history for feedback, please be sure to leave the datasets in the analysis thread _undeleted_ so that we can offer the best advice.



## Custom reference genome



Often the quickest way to get your analysis going is to load a custom genome for your own use. Simply upload the [FASTA](/learn/datatypes#Fasta) file [using FTP](/learn/Upload%20via%20FTP) and use it as the "reference genome from the history" (wording can vary slightly between tools, but most have this option). **[Learn more about how to set up and use a Custom Genome](/learn/custom-genomes)** including how to create a **Custom Build**.

### Videos



*   **[NGS101-8 Mapping to YOUR Reference](https://vimeo.com/123108417)**

*   **[Custom Genomes](https://vimeo.com/75918922)**

### Best Practices



*   Make sure the reference genome is in [FASTA](/learn/datatypes#Fasta) format and is completely loaded (see [Trouble loading data](/src/support#Trouble_loading_data) above).

*   Use the same custom genome for all the steps in your analysis that require a reference genome. Don't switch or the data can become mismatched in your files, preventing downstream work.
*   To add a custom **Genome Build** so that it can be assigned as a "database" attribute, or to make it known/available to certain tools, create it under "User → Custom Builds". More details [here...](/learn/custom-genomes#Custom_Builds).

*   **TIP**: To modify a [dataset](/learn/managing-datasets) to have an unassigned reference genome, use the ![pencil](/src/images/icons/pencil.png "pencil") icon to "Edit Attributes". On the form, for the attribute **Database/Build:**, set the genome to be " **<tt>unspecified (?)</tt>** ", and submit. Any prior assignments will be removed.

*   If you genome is available on [usegalaxy.org (Main)](http://usegalaxy.org), but just not indexed for the tool you want to use, you can get the genome from our **[rsync server](/admin/UseGalaxyRsync)**. This will ensure that all of your work uses the _same exact reference genome_ for all steps in an analysis, a critical part of a successful experiment.

*   If you find that there are in downstream [tool errors](/src/support#Error_from_tools) after using a _Custom reference genome_ in an upstream tool on [usegalaxy.org (Main)](http://usegalaxy.org), this is good cause to suspect that there is a **[reference genome mismatch problem](/src/support#Reference_genomes)**. This generally means that the _Custom_ genome needs to be changed to use ours, or that you need to use the _Custom_ genome for all downstream tools, too.

### Quick genome access



*   If your genome is small (bacterial, etc.), using it as a [Custom Reference Genome](/learn/custom-genomes) is the quickest way to to get it into Galaxy and to start using it with tools.

*   Obtain a [FASTA](/learn/datatypes#Fasta) version, load using [using FTP](/ftp-upload), and use from your history with tools.

### Tools on the Main server: Extract DNA



*   _Example_ → _**Fetch Sequences: Extract Genomic DNA**_

    *   Start by loading the custom reference genome in [FASTA](/learn/datatypes#Fasta) format into your history as a dataset, [using FTP](/learn/Upload%20via%20FTP) if the dataset is over **2G** in size.

    *   Load or create an appropriate [Interval](/learn/datatypes#Interval), [BED](/learn/datatypes#Bed), or [GFF](/learn/datatypes#GFF) coordinate dataset into the same history.

    *   On the **Extract Genomic DNA** tool form, you will use the options:

        *   "Source for Genomic Data:" as "History"
        *   next, for the new menu option "Using reference file", select the fasta dataset of your target genome from your active history

### Tools on the Main server: GATK



*   GATK tools are natively indexed for the 1000 Genomes human reference genome "hg_g1k_v37" only
*   To use other genomes, load in fasta format and prepare as a Custom genome/build.
*   Note that GATK requires a specific reference genome sort order. The general guideline is "chr1, chr2, chr3,.... chrX, chrY, chrM" (followed by other partial chromosomes sorted in alphabetical order). Use tools in the group "Text Manipulation", "Convert Formats", and "Sort and Filter" to perform any needed rearrangement.
*   It is best to use the same exact reference genome for all steps, or problems can occur downstream, often requiring the analysis to be started over (from mapping, when the genome was first used).
*   Want to use **hg19**? The genome is available as a GATK-sorted version under "Data Libraries -> GATK". Import the fasta file into your history, then proceed with using as a custom genome with tools.

## Start a Cloudman Server



To launch your own **[Cloudman Galaxy](https://wiki.galaxyproject.org/Cloud)** server, go to: **[http://launch.usegalaxy.org](http://launch.usegalaxy.org)**

# Community Q & A



<div class="right">
[![Search all](/src/images/logos?action=AttachFile&do=get&target=GalaxyMailingListSearch.png "Search all")](/mailing-lists#Searching)</div>



Still need help not covered by the tool help, the [Learning Hub](/learn), a [Screencast](/learn/Screencasts), a [Tutorial](https://usegalaxy.org/u/james/p/exercises), or an [FAQ](/learn/faq)?

*   Start with a search in our [mailing list archives](/mailing-lists#Searching) to see if this question has come up before.

*   If you have a development topic to discuss, your data/tool situation has not come up before, and/or troubleshooting has failed (including at least one re-run, as explained in [Error from tools](/src/support#Error_from_tools) above), post to a list or [Galaxy Biostar](/src/support#Biostar)

_**Note:**_ **If your question is about an error on [Main](/src/main) for a job failure**, start by reviewing the **troubleshooting help for [Tool Errors](/src/support#Error_from_tools)**. If data input and the job error message don't resolve the issue, please use the **[tool error](/src/support#Reporting_tool_errors) submission form** from the <span class="red">red</span> error dataset, instead of starting a public mailing list discussion thread (**do not delete error datasets**). [Read more ...](/src/support#Error_from_tools)



## What to include in a question


1.  Where you are using Galaxy: [Main](/src/main), other public, local, or cloud instance
2.  End-user questions from [Test](/src/test) are generally not sent/supported - _Test is for breaking_
3.  If a local or cloud instance, the distribution or galaxy-central hg pull #
4.  If on [Main](/src/main), date/time the initial and ru-run jobs were executed
5.  If there is an example/issue, exact steps to reproduce
6.  What troubleshooting steps (if a problem is being reported) you have tested out
7.  If on [Main](/src/main), you may be asked for a shared history link. Use _**Options → Share or Publish**_, generate the link, and email it directly back off-list. Note the dataset #'s you have questions about.
8.  **IMPORTANT**: Get the _quickest answer_ for data questions by leaving **all** of the input and output datasets in the analysis thread in your shared history _**undeleted**_ until we have written you back. Use _**Options → Show Deleted Datasets**_ and click dataset links to _**undelete**_ to recover datasets if necessary
9.  **Always **_reply-all_ **unless sharing a private link**


## Starting a scientific, data, or tool usage thread

*   Do not use a mailing list. Use [Galaxy Biostar](/src/support#Biostar)


## Starting a technical tool, local/cloud instance, or development thread

*   Gather information "What to include in a question" above
*   Send an email to [mailto:galaxy-dev@lists.galaxyproject.org](mailto:galaxy-dev@lists.galaxyproject.org)
*   Subscribing to the [Galaxy Development List](https://lists.galaxyproject.org/listinfo/galaxy-dev) is recommended for tool developers and instance administrators
*   Discussion threads are open to the entire community and the Galaxy team to answer
*   **Always **_reply-all_ **unless sharing a private link**


## Reporting a software bug

Bug or [Error from tools](/src/support#Error_from_tools)? Sometimes it is hard
to tell. If you are on the public [Main](/src/main) instance, and ran a tool
that produced a <span class="red">red</span> error dataset, then you will
probably want to start by reporting this as a [Tool
Error](/src/support#Reporting_tool_errors), but add in comments about your
suspicious about a bug if there is something odd about the job failure.

If you think you've seen a software bug (not an ["Error from
tools"](/src/support#Error_from_tools) ), please report it. More information
about how and where can be found at the [Galaxy Issue Board](/src/issues).
