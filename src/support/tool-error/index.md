---
title: Job and Tool Error Help
---
[Back to Support Hub](/src/support/index.md)

Related topics

* [Tutorials](/src/learn/index.md)
* [Getting Inputs Right](/src/support/#getting-inputs-right)
* [Extended Help for Differential Expression Analysis Tools](/src/support/diff-expression/index.md)
* [Reporting Usage Issues or Software bugs](/src/issues/index.md)
* [Choices](/src/choices/index.md)
* [Ecosystem](https://galaxyproject.github.io/)
* [Galaxy Help](https://help.galaxyproject.org/)
* [Search all Prior Q&A and Galaxy Resources](https://galaxyproject.org/search/)

Known Issues

* [Galaxy](https://github.com/galaxyproject/galaxy/issues/)
* [Main https://usegalaxy.org](https://github.com/galaxyproject/usegalaxy-playbook/issues/)
* [Tools-devteam](https://github.com/galaxyproject/tools-devteam/issues/)
* [Tools-iuc](https://github.com/galaxyproject/tools-iuc/issues)

## Job and Tool Error Help

So you started a job and it ended up failing. The result datasets are red in the history. 

What to do? It depends on the **failure type** and where you are using Galaxy. 

***In a rush to solve the problem?*** The top reasons for failures are listed [**here**](/src/support/#getting-inputs-right). Also consider searching **Known Issues** and review the advanced troubleshooting help covered in **Reporting Usage Issues or Software bugs** (all linked above). Your problem may be something we are already working to correct or have exising prior Q and A, Galaxy help posts, documentation, and/or Galaxy tutorials that include a solution.

### Query all Galaxy resources with the "Search Galaxy" box above

### TIPS

1. The general troubleshooting help applies to most Galaxy servers/tools/functions.
1. The cluster error help is server specific for [Galaxy Main](/src/main/index.md) at http://usegalaxy.org. 
1. If working at a different public Galaxy server, [contacting the admins directly](/src/use/index.md) to address server-related problems is often necessary. Each Galaxy is independently administered.


## Determining the job failure type

Did the job fail with some comments that are not descriptive of the problem? Are you sure? 

Click on the bug icon ![](/src/images/icons/bug.png) within the error dataset to review details about the problem. This does not need to be submitted if you can figure out and correct the problem. There is a good chance you'll able to link your issue to existing troubleshooting help, either here in the [Galaxy hub](/src/support/index.md) or at [Galaxy Help](https://help.galaxyproject.org/). Archived Q&A may still be helpful, find it here: [Galaxy Biostars](https://biostar.usegalaxy.org).

Advanced troubleshooting help is covered at: [Reporting Usage Issues or Software bugs](/src/issues/index.md)

If you are still stuck after reviewing, please do send in the bug report and we can help.

* Include a link to questions asked about the same problem that you may have posted online (example: at [Galaxy Help](https://help.galaxyproject.org/))
* Leave the input and output datasets undeleted
* Do not delete the history immediately after submitting a bug report. Otherwise, there is a good chance we won't be able to help you.
* Should you solve the problem before we reply, a follow-up email to let us know is appreciated.
* The majority of submitted reports are not true software bugs. **Usage problems involving incorrect input format or content cause most errors**. 
* Confirming correct tool usage is where we start when diagnosing a problem, [**and is where you should start, too.**](/src/support/troubleshoot-an-error/index.md). Sharing details about what you checked is always helpful.

### Type: input problems

These are the top reasons for tool failures.

#### Examples - input

* You need to sort your inputs.
* The datatype or database is either not assigned or is incorrect.
* The original fastq input was not really in fastsanger format.
* Key fields on the tool form were left blank (please report this so we can fix it!).
* The tool has specific formatting requirements for inputs that were not met.
* Annotation files are a mismatch for the selected or assigned reference genome build.
* The BED/Interval/GFF dataset is not really in specification.
* Some of the data was generated outside of Galaxy, but later a built-in indexed genome build was used with downsteam tools. This scenerio can work, but only if those two genomes are an **exact** match. 
* **Tip** "Chr1" and "chr1" and "1" do not mean the same thing to a tool (or rather, most tools!).


#### How to detect - input

* Tool errors can vary. Widely.

#### How to resolve - input

* Fix the inputs. 
* Read the tool form help.
* **Follow the guidelines and troubleshooting help at the [Support Hub](/src/support/index.md).**
* **Review a [Galaxy Tutorial](/src/learn/index.md) that covers your analysis and/or tool.**

#### Special cases - input

* There are no special cases. This problem is ubiquitous no matter where or with what tools you happen to be using.
* *How you think the job was executed may not actually be what was executed.* Use the re-run ![](/src/images/icons/arrow-circle.png) and job info ![](/src/images/icons/HistoryInfo.png) functions to review your work. 

Input problems are very common across any analysis that makes use of programmed tools. Learning how to format your data correctly will not only lead to successful jobs in Galaxy, but more robust and reproducible research overall. 

### Type: cancelled by admin or a cluster failure

The initial error message will be reported as below, and is found in the comments of a failed dataset (red dataset):

```
This job failed because it was cancelled by an administrator.
Please click the bug icon to report this problem if you need help.
```

Or sometimes:

```
job info:
Remote job server indicated a problem running or monitoring this job.
```

It is possible that there was a server or cluster error. However, very often input problems can contribute to these types of failures.

#### How to resolve - cancelled

If after reviewing inputs (see section for that job falure reason below) and re-running, and the cause of the error remains unclear, try the following:

*   Search prior questions/answers at [Galaxy Help](https://help.galaxyproject.org/) (current Q&A) or at [Galaxy Biostar](https://biostar.usegalaxy.org) (archived Q&A)
*   Submit a novel question at [Galaxy Help](https://help.galaxyproject.org/)
*   Report the novel issue in a bug report if working at [Galaxy Main](/src/main/index.md) (http://usegalaxy.org) or you can reproduce the error there.

### Type: exceeds memory allocation

The full error message will be reported as below, and can be found by clicking on the bug icon for a failed job run (red dataset):

```
job info:
This job was terminated because it used more memory than it was allocated.
Please click the bug icon to report this problem if you need help.
```

Or

```
stderr:
Fatal error: Exit code 1 ()
slurmstepd: error: Detected 1 oom-kill event(s) in step XXXXXXX.batch cgroup.
```

Or this somewhere in the error message (usually at the end)

```
job stderr:
slurmstepd: error: Detected 1 oom-kill event(s) in step XXXXXXX.batch cgroup.
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

#### How to resolve - memory

Often memory errors can be avoided by the user executing the job:

* Double check the inputs to the tool. Are the [data properly formatted and labeled](/src/support/#getting-inputs-right)?
* Review the parameters for the tool and determine if any changes made away from the default setting (or possibly the detail settings) are compute-intensive. Make changes if they suit your research goals. See the underlying tool's documentation to better understand specific parameters. This is often linked in the Help section on a tool's execution form.
* If the tool used was one that compares two dataset, change the order of the inputs, and test with a re-run. Some tools consume less memory when the larger dataset is entered as the first input on the tool form.
* Also see **How to resolve** and **Special cases** in next section. Just note that a rerun will not solve this type or error until changes are made to the inputs and/or the tool settings.

### Type: execution exceeds maximum allowed job run time (walltime)

The full error message will be reported as below, and can be found by clicking on the bug icon for a failed job run (red dataset):

```
job info:
This job was terminated because it ran longer than the maximum allowed job run time.
Please click the bug icon to report this problem if you need help.
```

Or sometimes, you'll see both of these:

```
job stderr:
slurmstepd: error: *** JOB XXXX ON XXXX CANCELLED AT 2019-XX-XXTXX:XX:XX DUE TO TIME LIMIT ***

job info:
Remote job server indicated a problem running or monitoring this job.
```

The error indicates that the job execution time exceeded the "wall-time" on the cluster node that ran the job. "Wall-time" is the maximum amount of time any job has to complete before it is terminated. When using the public [Main](/src/main/index.md) Galaxy instance at [http://usegalaxy.org](http://usegalaxy.org), see the walltime available on the different clusters [here](/src/main/index.md).

Sometimes the execution time of a job can be decreased by adjusting the inputs, parameters used, or the cluster used (try **[Stampede or Jetstream](/src/main/index.md)**, if available for the tool form under the section **Job Resource Parameters**). This solution is similar to jobs that error for exceeding memory allocation.

If you are excuting a tool that runs on certain remote clusters (example tools: Trinity, Unicycler), the problem could be input problems, exceeding memory, or actually exceeding the "wall-time". These clusters have fixed resources.


#### How to detect - walltime

* A previously run job didn't re-run well.
* The error message is cluster-specific. See examples above.
* There is a banner at the web site noting that there are known cluster issues or maintainance is in progress.
* Status of the server is noted as being down. Check here: https://status.galaxyproject.org/

#### How to resolve - memory or walltime

* Rerunning the job is often the only way forward. 
* Give a longer-running cluster a try.
* If the re-run fails again, and there are no known server issues, the issue is probably not cluster/server related but an input problem that needs to be corrected. 
* In some cases, reporting the memory or wall-time issue to our team as a bug report is a good way to let us know about tools that run out of resource. Please have the expectation that we probably can not solve your specific issue immediately, but cumulative feedback helps us to learn which tools would benefit from additional resource allocation.
* If the job remains too large to run at [Galaxy Main](/src/main/index.md)(http://usegalaxy.org)(http://usegalaxy.org), then moving to an instance where more memory can be allocated to jobs is the solution. A good choice is [CloudMan](http://usegalaxy.org/cloud) as processing memory is easily scaled up. [AWS in Education](http://aws.amazon.com/grants/) grants can help with costs. Another option is setting up a [local Galaxy](http://getgalaxy.org), if you have a computer/server with enough processing memory (16 GB minimum, but more is likely needed if the jobs are large, possibly up to 64 GB).

#### Special cases - memory or walltime

* Certain inputs are very large and/or fragmented.
 * Example 1: A highly fragmented transcriptome/genome used as a custom reference genome. The size is generally **several thousands of "chromosomes"** instead of one to a few dozen. Consider only using the primary chromosomes and skipping unmapped/unplaced/other partial data. Calculating or filtering by length can reveal the extent of the fragmentation and help you to make choices about how to proceed.
 * Example 2: An entire NGS read dataset was used as a custom reference genome. The size is generally **millions of "chromosomes"**. *Fastq read datasets converted to fasta will almost never work with tools as a custom genome or build.*
 
Moving to a local or cloud Galaxy will often not help for these cases due to how the 3rd party wrapped tool is written. The tool would fail outside of Galaxy, too. Finding or creating a better quality (less fragmented) target genome/transcriptome is the solution.

### Type: ValueError: invalid literal for int() with base 10

Full error is usually a longer message seen only after clicking on the bug icon ![](/src/images/icons/bug.png):

```
stderr

...
Many lines of text, may include parameters
...
...
ValueError: invalid literal for int() with base 10: 'some-read-identifier-name'
```

#### Example - ValueError

 * MACS2 produces this error the first time it is run. The original input fastq read identifiers contained spaces on the "@" line. Mapping is completed and the results are in plain text format (SAM).

#### How to detect - ValueError

 * Job errors with a message similiar to the above. MACS is not the only tool that can produce this issue, but it is the most common.

#### How to resolve - ValueError

MACS/2 is not capable of interpretting sequence read names with spaces included. Two choices:

 * Remove unmapped reads from the SAM dataset. Unmapped reads are the only data lines in SAM datasets where the full original sequence read name is present (with the included space). (Mapped reads are trimmed at the first whitespace in SAM data lines). There are several filtering tools in the groups **SAMTools** and **Picard** that can do this.
 * Convert the SAM input to BAM format with the tool **SAMtools: SAM-to-BAM**. When compressed input is given to MACS, the spaces are no longer an issue.

### Type: Tool and software problems

Software or Tool Bug? Or a usage error? Sometimes it is hard to tell. 

#### Examples - bugs

Usage error:

* A mapping job runs out memory resources. The input fastq was never verified to be in `fastqsanger` format. Rescaling the quality scores with the **Fastq Groomer tool** creates a job that uses far less memory, and it is successful.
* A first time you use a new tool, there is a job error. Checking the inputs reveals that the BED dataset has columns in the wrong order. Fixing the BED dataset format allows the re-run job to be successful.

Software or Tool Bug:

* A tool fails and produces an error message stating that a dependency was not found. The tool is not on the list of [Known tool issues](/src/support/tool-issues/index.md) and a search against [all issues](/src/issues/index.md) does not locate a prior reported problem. You report the issue through a bug report, it is clarified and confirmed, the developers make a fix, and the updated tool is installed on the server. Future jobs are now successful.
* When importing an older workflow, a pop-up notice informs that an upgraded tool is available. This tool is editted into the workflow. However, now the workflow fails - at that same tool that was updated. The issue is reported and fixed. Now your workflow runs without problems.

#### How to detect - bugs

* The tool ended with what appears to be a tool problem message.
* See examples above.
* [Search Galaxy Resources](/src/search) to see if the problem is a current known problem with a workaround.

#### How to resolve - bugs

* If you are on the public [Galaxy Main](/src/main/index.md) (http://usegalaxy.org) server, and ran a tool that produced a red error dataset, then you will probably want to start by reviewing the error reasons here first. 
* Fixing inputs first, as needed, and rerunning is recommended.
* If you cannot determine the problem, report the error in a bug report. Add in comments about your reasons why this seems like a tool bug and not a usage/input problem if you can.

#### Special cases - bugs

* Software can fail for many reasons. If you think there is a problem, please report it.
* Send in a bug report or ask a question at Galaxy Biostars if you want the issue vetted first.
* If you are reasonably certain the problem is with software or tools, and not usage, please report it directly to the [Galaxy Issue Board](/src/issues/index.md).
