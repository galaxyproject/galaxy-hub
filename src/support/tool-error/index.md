---
autotoc: true
title: Job and Tool Error Help
---

[Back to Support Hub](/src/support/index.md)

Related topics

* [Known Tool Issues (check here first if a tool failed)](/src/support/tool-issues/index.md)
* [Known Data Issues](/src/support/data-issues/index.md)
* [Galaxy Github issue board](/src/issues/index.md)
* [Troubleshoot an error](/src/support/troublshoot-an-error/index.md)

## Job and Tool Error Help

So you started a job and it ended up failing. The result datasets are red in the history. 

What to do? It depends on the **failure type** and where you are using Galaxy. 

In a rush to solve the problem? The top reasons for failures are listed [**here**](/src/support/index.md#input-format-getting-it-right-to-avoid-problems)

**TIPs**

 * The advice on this page is primarily about errors at [Galaxy Main](/src/main/index.md). 
 * In particular, the cluster help is server specific for http://usegalaxy.org. 
 * But good news! The general troubleshooting help applies to any Galaxy server/tool.
 * [Job details: bug and info dataset icons](/src/support/dataset-icons/index.md)

## Job failure types

Did the job fail with some comments that are not descriptive of the problem? Are you sure? 

Click on the bug icon ![](/src/images/icons/bug.png) within the error dataset to review details about the problem. This does not need to be submitted if you can figure out and correct the problem. There is a good chance you'll able to link your issue to existing troubleshooting help (here in the [Galaxy hub](/src/support/index.md) or at [Galaxy Biostars](https://biostar.usegalaxy.org) to get things back on track *quickly*).

If you are still stuck after reviewing, please do send in the bug report and we can help.
* Include a link to questions asked about the same problem that you may have posted online (example: at Galaxy Biostars)
* Leave the input and output datasets undeleted
* Do not delete the history immediately after submitting a bug report. Otherwise, there is a good chance we won't be able to help you.
* Should you solve the problem before we reply, a follow-up email to let us know is appreciated.
* The majority of submitted reports are not true software bugs. **Usage problems involving incorrect input format or content cause most errors**. 
* Confirming correct tool usage is where we start when diagnosing a problem, [**and is where you should start, too.**](/src/support/troubleshoot-an-error/index.md). Sharing details about what you checked is always helpful.

### Job failure reason: input problems

This is the top reason for tool failures.

#### Examples 

* You need to sort your inputs.
* The datatype or database is either not assigned or is incorrect.
* The original fastq input was not really in fastsanger format.
* Key fields on the tool form were left blank (please report this so we can fix it!).
* The tool has specific formatting requirements for inputs that was not followed (yes, exactly).
* Annotation files are a mismatch for the selected or assigned reference genome build.
* The BED/Interval/GFF dataset is not really in specification.
* Some of the data was generated outside of Galaxy, but later a built-in indexed genome build was used with downsteam tools. This scenerio can work, but only if those two genomes are an **exact** match. 
* **Tip** "Chr1" and "chr1" and "1" do not mean the same thing to a tool (or rather, most tools!).


#### How to detect

* Tool errors can vary. Widely.

#### How to resolve

* Fix the inputs. 
* Read the tool form help.
* **Follow the guidelines and troubleshooting help at the [Support Hub](/src/support/index.md).**

#### Special cases

* There are no special cases. This problem is ubiquitous no matter where or with what tools you happen to be using.
* Or how experienced you are. Everyone makes little errors. Catching and fixing them is what matters. 
* Ask for help if you need it (Biostars or a bug report).
* This type of issue is why keeping track of an analysis - exactly - is so important for producing reliable results.
* It is tricky to keep track of all the details on your own. Let Galaxy take care of the details, so you can focus on the science. 
* *How you think the job was executed may not actually be what was executed.* Use the re-run ![](/src/images/icons/arrow-circle.png) and job info ![](/src/images/icons/HistoryInfo.png) functions to review your work. 

Input problems are very common across any analysis that makes use of programmed tools. Learning how to format your data correctly will not only lead to successful jobs in Galaxy, but more robust and reproducible research overall. 

### Job failure reason: cancelled by admin or a cluster failure

The initial error message will be reported as below, and is found in the comments of a failed dataset (red dataset):

```
This job failed because it was cancelled by an administrator.
Please click the bug icon to report this problem if you need help.
```

It is possible that there was a server or cluster error. However, very often input problems can contribute to these types of failures.

If after reviewing inputs (see section for that job falure reason below) and re-running, and the cause of the error remains unclear, try the following:

*   Search prior questions/answers at [Galaxy Biostar](https://biostar.usegalaxy.org)
*   Submit a novel question at [Galaxy Biostar](https://biostar.usegalaxy.org)
*   Report the novel issue in a bug report if working at [Galaxy Main](/src/main/index.md) (http://usegalaxy.org) or you can reproduce the error there.

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

* Double check the inputs to the tool. Are the [data properly formatted and labeled](/src/support/#input-format-getting-it-right-to-avoid-problems)?
* Review the parameters for the tool and determine if any changes made away from the default setting (or possibly the detail settings) are compute-intensive. Make changes if they suit your research goals. See the underlying tool's documentation to better understand specific parameters. This is often linked in the Help section on a tool's execution form.
* If the tool used was one that compares two dataset, change the order of the inputs, and test with a re-run. Some tools consume less memory when the larger dataset is entered as the first input on the tool form.

### Job failure reason: execution exceeds maximum allowed job run time (walltime)

The full error message will be reported as below, and can be found by clicking on the bug icon for a failed job run (red dataset):

```
job info:
This job was terminated because it ran longer than the maximum allowed job run time.
Please click the bug icon to report this problem if you need help.
```

The error indicates that the job execution time exceeded the "wall-time" on the cluster node that ran the job. "Wall-time" is the maximum amount of time any job has to complete before it is terminated. When using the public [Main](/src/main/index.md) Galaxy instance at [http://usegalaxy.org](http://usegalaxy.org), see the walltime available on the different clusters [here](/src/main/index.md).

Sometimes the execution time of a job can be shorted by adjusting the inputs, parameters used, or the cluster used (try **[Stampede or Jetstream](/src/main/index.md)**, if available for the tool form under the section **Job Resource Parameters**). This solution is similar to jobs that error for exceeding memory allocation.


#### How to detect

* A previously run job didn't re-run well.
* The error message is cluster-specific. See examples above.
* There is a banner at the web site noting that there are known cluster issues or maintainance is in progress.
* Status of the server is noted as being down. Check here: https://status.galaxyproject.org/

#### How to resolve

* Rerunning the job is often the only way forward. 
* Give a longer-running cluster a try.
* If the re-run fails again, and there are no known server issues, the issue is probably not cluster/server related but an input problem that needs to be corrected.
* In some cases, reporting the memory or wall-time issue to our team as a bug report is a good way to let us know about tools that run out of resource. Please have the expectation that we cannot probably not solve your issue immediately, but cumulative feedback helps us to learn which tools would benefit from additional resource allocation.
* If the job remains too large to run at [Galaxy Main](/src/main/index.md)(http://usegalaxy.org)(http://usegalaxy.org), then moving to an instance where more memory can be allocated to jobs is the solution. A good choice is [CloudMan](http://usegalaxy.org/cloud) as processing memory is easily scaled up. [AWS in Education](http://aws.amazon.com/grants/) grants can help with costs. Another option is setting up a [local Galaxy](http://getgalaxy.org), if you have a computer/server with enough processing memory (16 GB minimum, but more is likely needed if the jobs are large, possibly up to 64 GB).

#### Special cases

* Certain inputs are very large and/or fragmented.
 * Example 1: A highly fragmented transcriptome/genome used as a custom reference genome. The size is generally **several thousands of "chromosomes"** instead of one to a few dozen. Consider only using the primary chromosomes and skipping unmapped/unplaced/other partial data. Calculating or filtering by length can reveal the extent of the fragmentation and help you to make choices about how to proceed.
 * Example 2: An entire NGS read dataset was used as a custom reference genome. The size is generally **millions of "chromosomes"**. *Fastq read datasets converted to fasta will almost never work with tools as a custom genome or build.*
 
Moving to a local or cloud Galaxy will often not help for these cases due to how the 3rd party wrapped tool is written. The tool would fail outside of Galaxy, too. Finding or creating a better quality (less fragmented) target genome/transcriptome is the solution.

### Failure reason: Tool and software problems

Software or Tool Bug? Or a usage error? Sometimes it is hard to tell. 

#### Examples

Usage error:

* A mapping job runs out memory resources. The input fastq was never verified to be in `fastqsanger` format. Rescaling the quality scores with the **Fastq Groomer tool** creates a job that uses far less memory, and it is successful.
* A first time you use a new tool, there is a job error. Checking the inputs reveals that the BED dataset has columns in the wrong order. Fixing the BED dataset format allows the re-run job to be successful.

Software or Tool Bug:

* A tool fails and produces an error message stating that a dependency was not found. The tool is not on the list of [Known tool issues](/src/support/tool-issues/index.md) and a search against [all issues](/src/issues/index.md) does not locate a prior reported problem. You report the issue through a bug report, it is clarified and confirmed, the developers make a fix, and the updated tool is installed on the server. Future jobs are now successful.
* When importing an older workflow, a pop-up notice informs that an upgraded tool is available. This tool is editted into the workflow. However, now the workflow fails - at that same tool that was updated. The issue is reported and fixed. Now your workflow runs without problems.

#### How to detect

* The tool ended with what appears to be a tool problem message.
* See examples above.
* The tool or input data is listed on the pages of [Known Tool Issues](/src/support/tool-issues/index.md) or [Known Data Issues](/src/support/data-issues/index.md).

#### How to resolve

* If you are on the public [Galaxy Main](/src/main/index.md) (http://usegalaxy.org) server, and ran a tool that produced a red error dataset, then you will probably want to start by reviewing the error reasons here first. 
* Fixing inputs first, as needed, and rerunning is recommended.
* If you cannot determine the problem, report the error in a bug report. Add in comments about your reasons why this seems like a tool bug and not a usage/input problem if you can.

#### Special cases

* Software can fail for many reasons. If you think there is a problem, please report it.
* Send in a bug report or ask a question at Galaxy Biostars if you want the issue vetted first.
* If you are reasonable certain the problem is with software or tools, and not usage, please report it directly to the [Galaxy Issue Board](/src/issues/index.md).



