---
autotoc: true
title: Issue Reporting
---

# Galaxy Issue Reporting and Feature Requests

Galaxy uses GitHub [issues](https://github.com/galaxyproject/galaxy/issues) for tracking down bugs and feature requests. Please make sure you search the list for duplicates before creating a new issue.

## Security issues

Serious security problems should not be reported via GitHub - please responsibly disclose these as explained in this [document](https://github.com/galaxyproject/galaxy/blob/dev/CONTRIBUTING.md).

## Usage problems reporting

Please report problems with tools and general usage to the [biostar](/src/support/biostar/index.md) support forum.

* If you can reproduce on [Main](/src/main/index.md), and the problem has a red error dataset, send in a bug report.
* If you can reproduce on [Main](/src/main/index.md), and the problem in within a green success dataset (but the result is still unexpected), you may be asked to send in a tool error report or share a history link. Use [Options/Share or Publish](/src/learn/share/index.md), generate the link, and email it directly back off-list at bug [mailing list](galaxy-bugs@lists.galaxyproject.org). Note the problem dataset #'s. 
* Any problem can be reported whether it involves a job or not. Example: Odd user interface behavior. Send us a description of the problem and how to reproduce it. This can be sent along with share histories, workflows, or other Galaxy objects needed to reproduce as described above (by sharing a link).
* If data is involved, and it usually is, please leave all of the related datasets in the analysis thread leading up to the bug in your history undeleted until we have responded to you.

## Bug reporting

Please create a GitHub [issue](https://github.com/galaxyproject/galaxy/issues) and make sure to include:

1. Where you are using Galaxy ([Main](/src/main/index.md), local, or cloud instance). 
1. Bug reports from [Test](/src/test/index.md) are generally not sent
1. Galaxy version (usually can be obtained at https://galaxy.example/api/version)
1. The date/time the bug was detected
1. Exact steps to reproduce the issue
1. What troubleshooting steps (if any) you have tested out
