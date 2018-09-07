---
title: How Jobs Execute
---
[Back to Support Hub](/src/support/index.md)

## Dataset Status

The Galaxy user interface (UI) has been designed to communicate job execution status through visual cues and concise messages. 

Learn more about how to identify these cues by [examining what Datasets in different states look like](/src/tutorials/histories/#history-panel-datasets).


## How Jobs Run

  * When a tool is executed, one or more new **[datasets](/src/learn/managing-datasets/index.md)** are added to a history. 
  * The same is true when a **workflow** is executed.
  * The **color** of a dataset designates the current status of the underlying job. See below.
  * _If using the public [Main](/src/main/index.md) Galaxy instance, the most effective strategy when running jobs on the shared resource is to start jobs (or workflows), and then leave them alone to execute until completion._

## Job queues and clusters

  * [Processing rules for jobs on Galaxy Main (http://usegalaxy.org)](/src/main/index.md)
  * When work is urgent during peak-usage times on the public **[Main](/src/main/index.md)** Galaxy instance, a **[CloudMan](/src/cloudman/index.md)** instance is a quick-to-implement alternative. 
  * For large scale and/or urgent ongoing work, a **[CloudMan](/src/cloudman/index.md)**, **[Local](/src/admin/get-galaxy/index.md)** each have advantages as a longer-term solution. 
  * [Read more about Using Galaxy Choices...](/src/choices/index.md)
  * [Scientific user guide to running a personal Galaxy server](/src/support/sci-user-galaxies/index.md) _(comming soon!)_

## Dataset States

### Green

  * The job completed successfully.
  * The resulting data is ready to be used in visualizations, available as input to tools, can be downloaded, or utilized for any other downstream purpose.
  * Sometimes a job will be green but still need some adjustments to the associated metadata. [How do I find, adjust, and/or correct metadata?](/src/support/metadata/index.md).

### Yellow

  * The job is executing. Allow this to complete!
  * If you are using the public [Main](/src/main/index.md) Galaxy instance, this job is running on one of our clusters. 
  * Different types of tools send jobs to different clusters appropriate for the requirements of each tool. 
  * Some tools are more compute intensive than others and significant resources are dedicated to job processing. 
  * Jobs have a set amount of time to complete. Should they run longer, they will fail with a "wall-time" error and turn _red_. 
  * Examining tool paramaters is the first option, less sensitive parameters may result in an equally acceptable result, but use less resource. 
  * If that is not appropriate or does not succeed, [a personal Galaxy with sufficient resources may be the solution](/src/support/sci-user-galaxies/index.md).

### Grey

  * The job is being evaluated to run (new dataset) or is queued. Allow this to complete.
  * If you are using the public [Main](/src/main/index.md) Galaxy instance, this job is queued, waiting for an opening on the appropriate cluster. 
  * **It is _very important_ to allow queued jobs to remain queued, and to not delete/re-run them**. 
  * If re-run, this moves the new job(s) back to the end of the queue, effectively lengthening the wait time to execute.
  * AND if done repeatedly (start, delete, rerun), the volume of "executing deleted" jobs can create additional work processes in the history as these are cleared away, using up resources, and contributing to additional delays.

### Red

  * The job has failed.
  * There can be many reasons for this, see: [My job ended with an error. What can I do?](/src/support/tool-error/index.md)
  
### Light blue

  * The job is paused.
  * This indicates either an input has a problem or that you have [exceeded disk quota](/src/main/#user-data-and-job-quotas) set by the administrator of the Galaxy instance you are working on.
  * If there is an input problem, correct the problem (often by re-run an upstream job) and click on the tool form option to "resume dependencies". 
  * You will not need to stop or restart downstream jobs in most cases (permit paused jobs to start, as inputs datasets become available, through this method).
  * Running out of disk space? [Permanently delete unneeded data](/src/learn/managing-datasets/#delete-vs-delete-permanently).
  * More how-to: [Checking for active vs deleted vs permanently deleted (purged) datasets and histories](/src/learn/data-status/index.md).
  
### Grey, Yellow, Grey again ???

  * The job is waiting to run, due to admin re-run or an automatic fall-over to a longer-running cluster (currently, Stampede)
  * First, see the descriptions for **grey** and **yellow** jobs above.
  * The job was first submitted to the default cluster, but did not finished within the "wall-time" quota. Instead of failing, the job was automatically submitted to the long-running cluster **Stampede**. This cluster offers more execution time resource to the job. The wait may be longer since jobs running on this cluster by other users are also executing for a longer time period.
  * Stopping (deleting) the job and then restarting places it back at the end of the first queue, where the cycle will begin again, extending wait time even further. Please do not do this. Allow the job to process.
  * If the job fails after running on Stampede, then it is too large to run on [http://usegalaxy.org](http://usegalaxy.org), also known as "Main". [Choose](/src/choices/index.md) another strategy to execute your job on a different Galaxy platform or consider modifying inputs/parameters to make the job less compute intensive.
  * Read more about the details of different clusters here: **[Main](/src/main/index.md)**.

### Bright blue with moving arrow (deprecated)

  * May be found in earlier Galaxy versions.
  * Applies to "Get Data → Upload File" tool only - the upload job is queuing or running
  * The job may run immediately, or may turn _grey_ if the server is busy, meaning that **guidelines for grey jobs apply**, and these _grey_ datasets should never be deleted/re-run, for the same reasons explained above.
  * An upload job that seems to stay in the "_bright blue with moving arrow_" state for a very long time generally indicates that the file being loaded is too large for the method used (specifically, a browsed-file upload) and [FTP](/src/learn/Upload%20via%20FTP) should be used instead. This is the only active job that should be deleted under normal usage, as it will never complete (no file over 2G will ever load via file browser upload).
