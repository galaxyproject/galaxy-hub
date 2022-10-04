---
title: Job and Tool Error Help
---
[Back to Support Hub](/support/)

Related topics

* [Tutorials](/learn/)
* [Getting Inputs Right](/support/#getting-inputs-right)
* [Extended Help for Differential Expression Analysis Tools](/support/diff-expression/)
* [Reporting Usage Issues or Software bugs](/issues/)
* [Choices](/use/#which-platform-platform-type-to-choose)
* [Ecosystem](https://galaxyproject.github.io/)
* [Galaxy Help](https://help.galaxyproject.org/)
* [Search all Prior `Q&A` and Galaxy Resources](https://galaxyproject.org/search/)

Known Issues

* [Galaxy](https://github.com/galaxyproject/galaxy/issues/)
* [Main https://usegalaxy.org](https://github.com/galaxyproject/usegalaxy-playbook/issues/)
* [Tools-devteam](https://github.com/galaxyproject/tools-devteam/issues/)
* [Tools-iuc](https://github.com/galaxyproject/tools-iuc/issues)

## Job and Tool Error Help

So you started a job and it ended up failing. The result datasets are red in the history.

What to do? It depends on the **failure type** and where you are using Galaxy.

***In a rush to solve the problem?*** The top reasons for failures are listed [**here**](/support/#getting-inputs-right). Also consider searching **Known Issues** and review the advanced troubleshooting help covered in **Reporting Usage Issues or Software bugs** (all linked above). Your problem may be something we are already working to correct or have existing prior Q and A, Galaxy help posts, documentation, and/or Galaxy tutorials that include a solution.

### Query all Galaxy resources with the "Search Galaxy" box above

### TIPS

1. The general troubleshooting help applies to most Galaxy servers/tools/functions.
1. The cluster error help is server specific for [Galaxy Main](/main/) at http://usegalaxy.org.
1. If working at a different public Galaxy server, [contacting the admins directly](/use/) to address server-related problems is often necessary. Each Galaxy is independently administered.


## Determining the job failure type

Did the job fail with some comments that are not descriptive of the problem? Are you sure?

Click on the bug icon ![](/images/icons/bug.png) within the error dataset to review details about the problem. This does not need to be submitted if you can figure out and correct the problem. There is a good chance you'll be able to link your issue to existing troubleshooting help, either here in the [Galaxy hub](/support/) or at [Galaxy Help](https://help.galaxyproject.org/). Archived Q&A may still be helpful, find it here: [Galaxy Biostars](https://biostar.usegalaxy.org).

Advanced troubleshooting help is covered at: [Reporting Usage Issues or Software bugs](/issues/)

If you are still stuck after reviewing, please do send in the bug report and we can help.

* Include a link to questions asked about the same problem that you may have posted online (example: at [Galaxy Help](https://help.galaxyproject.org/))
* Leave the input and output datasets undeleted
* Do not delete the history immediately after submitting a bug report. Otherwise, there is a good chance we won't be able to help you.
* Should you solve the problem before we reply, a follow-up email to let us know is appreciated.
* The majority of submitted reports are not true software bugs. **Usage problems involving incorrect input format or content cause most errors**.
* Confirming correct tool usage is where we start when diagnosing a problem, [**and is where you should start, too.**](/support/troubleshoot-an-error/). Sharing details about what you checked is always helpful.

### [Type: input problems](https://training.galaxyproject.org/training-material/faqs/galaxy/troubleshooting_input_problem.html)

### [Type: cancelled by admin or a cluster failure](https://training.galaxyproject.org/training-material/faqs/galaxy/troubleshooting_cluster_failure.html)

### [Type: exceeds memory allocation](https://training.galaxyproject.org/training-material/faqs/galaxy/troubleshooting_excess_memory.html)

### [Type: execution exceeds maximum allowed job run time (walltime)](https://training.galaxyproject.org/training-material/faqs/galaxy/analysis_job_failure_walltime.html)

### [Type: ValueError: invalid literal for int() with base 10](https://training.galaxyproject.org/training-material/faqs/galaxy/troubleshooting_value_error.html)

### Type: Tool and software problems

Software or Tool Bug? Or a usage error? Sometimes it is hard to tell.

#### Examples - bugs

Usage error:

* A mapping job runs out of memory resources. The input fastq was never verified to be in `fastqsanger` format. Rescaling the quality scores with the **Fastq Groomer tool** creates a job that uses far less memory, and it is successful.
* The first time you use a new tool, there is a job error. Checking the inputs reveals that the BED dataset has columns in the wrong order. Fixing the BED dataset format allows the re-run job to be successful.

Software or Tool Bug:

* A tool fails and produces an error message stating that a dependency was not found. The tool is not on the list of [Known tool issues](/support/tool-issues/) and a search against [all issues](/issues/) does not locate a prior reported problem. You report the issue through a bug report, it is clarified and confirmed, the developers make a fix, and the updated tool is installed on the server. Future jobs are now successful.
* When importing an older workflow, a pop-up notice informs that an upgraded tool is available. This tool is edited into the workflow. However, now the workflow fails - at that same tool that was updated. The issue is reported and fixed. Now your workflow runs without problems.

#### How to detect - bugs

* The tool ended with what appears to be a tool problem message.
* See examples above.
* [Search Galaxy Resources](/search) to see if the problem is a current known problem with a workaround.

#### How to resolve - bugs

* If you are on the public [Galaxy Main](/main/) (http://usegalaxy.org) server, and ran a tool that produced a red error dataset, then you will probably want to start by reviewing the error reasons here first.
* Fixing inputs first, as needed, and rerunning is recommended.
* If you cannot determine the problem, report the error in a bug report. Add in comments about your reasons why this seems like a tool bug and not a usage/input problem if you can.

#### Special cases - bugs

* Software can fail for many reasons. If you think there is a problem, please report it.
* Send in a bug report or ask a question at Galaxy Biostars if you want the issue vetted first.
* If you are reasonably certain the problem is with software or tools, and not usage, please report it directly to the [Galaxy Issue Board](/issues/).
