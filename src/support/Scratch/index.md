Section modification previews

## Dataset status and how jobs execute
The Galaxy user interface (UI) has been designed to communicate job execution status through visual cues and concise meesages. Learn more about how interpret these cues and to use strategies to maximize throughput by [reading more here...](/Support/JobStatus)
When a tool is executed, one or more new **[datasets](/Learn/Managing Datasets)** are added to a history. The same is true when a **workflow** is executed. *If using the public [Main](/Main) Galaxy instance, the most effective strategy when running jobs on the shared resource is to start jobs (or workflows), and then leave them alone to execute until completion.* 
<br />
<br />
When work is urgent during peak-usage times on the public **[/Main](/Main)** Galaxy instance, a **[/CloudMan](/CloudMan)** instance is a quick-to-implement alternative. For large scale and/or urgent ongoing work, a **[/CloudMan](/CloudMan)**, **[Local](/Admin/GetGalaxy)**, or **[SlipStream Galaxy](http://www.bioteam.net/slipstream/galaxy-edition)** each have advantages as a longer-term solution. [Read more ...](/BigPicture/Choices)
<br />
<br />
*So, how does the processing of tool jobs on **[/Main](/Main)** actually work?*
* The **color** of a dataset designates the current status of the underlying job.
  * **<<span(green)>>green<<span>>** - the job completed successfully
    * The resulting data is ready to be used in visualizations, available as input to tools, can be downloaded, or utilized for any other downstream purpose.
  * **<<span(yellow)>>yellow<<span>>** - the job is in progress
    * If you are using the public [Main](/Main) Galaxy instance, this job is running on one of our clusters. Different types of tools send jobs to different clusters appropriate for the requirements of each tool. Some tools are more compute intensive than others and significant resources are dedicated to job processing. Jobs have up to 72 hours to complete, if they run longer than this they will fail with a "wall-time" error and turn *red*. Examining tool paramaters is the first option, less sensitive parameters may result in an equally acceptable result, but use less resource. If that is not appropriate or does not succeed, a [CloudMan Galaxy](/CloudMan) or [Local Galaxy](/Admin/GetGalaxy) with sufficient resources may be the solution. 
  * **<<span(grey)>>grey<<span>>** - the job is waiting to run
    * If you are using the public [Main](/Main) Galaxy instance, this job is queued, waiting for an opening on the appropriate cluster. **It is *very important* to allow queued jobs to remain queued, and to not delete/re-run them**. If re-run, this not only moves the new job back to the end of the queue, effectively lengthening the wait time to execute, but if done repeatedly, the volume of "executing deleted" jobs can create additional work processes in the history as these are cleared away, using up resources, and can cause additional delays. 
  * **<<span(red)>>red<<span>>** - the job has failed
    * There can be many reasons for this, see the next section, **[Error from tools](/Support.md#error_from_tools)** for details.
  * **<<span(blue)>>blue-purple with moving arrow<<span>>** - (applies to "Get Data -> Upload File" tool only) - the job is queuing or running
    * The job may run immediately, or may turn *grey* if the server is busy, meaning that **guidelines for grey jobs apply**, and these *grey* datasets should never be deleted/re-run, for the same reasons explained above.
    * An upload job that seems to run in the <<span(blue)>>blue-purple<<span>> state for a very long time generally indicates that the file being loaded is too large for the method used (specifically, a browsed-file upload) and [FTP](/Learn/Upload via FTP) should be used instead. This is the only active job that should be deleted under normal usage, as it will never complete (no file over 2G will ever load via file browser upload).
