---
title: Issue Reporting
---
# Galaxy Issue Reporting and Feature Requests

Galaxy uses GitHub [issues](https://github.com/galaxyproject/galaxy/issues) for tracking down bugs and feature requests. Please make sure you search the list for duplicates before creating a new issue.

## Security issues

Serious security problems should not be reported via GitHub - please responsibly disclose these as explained in this [document](https://github.com/galaxyproject/galaxy/blob/dev/CONTRIBUTING.md).

## Usage problem reporting

Please report usage problems with tools and functions to the **[Galaxy Help](https://help.galaxyproject.org/)** site.

**It is good practise to first perform a [Galaxy Search](https://galaxyproject.org/search/)** to find prior Q and A, FAQs, Tutorials, and other documentation across all Galaxy resources. **Your problem may have an existing solution already posted**. 

A summary of common troubleshooting solutions can also be found in this **Troubleshooting FAQ**: [My job ended with an error. What can I do?](/src/support/tool-error/index.md). 

 * [Support FAQs](/src/support/index.md)
 * [Galaxy Tutorials](/src/learn/index.md)
 * [Known Issues - Galaxy](https://github.com/galaxyproject/galaxy/issues/)
 * [Known Issues - Main https://usegalaxy.org](https://github.com/galaxyproject/usegalaxy-playbook/issues/)
 * [Known Issues - Tools-devteam](https://github.com/galaxyproject/tools-devteam/issues/)
 * [Known Issues - Tools-iuc](https://github.com/galaxyproject/tools-iuc/issues)

### Red error datasets

If you can reproduce on [Galaxy Main https://usegalaxy.org](/src/main/index.md), and the problem has a **red error dataset**, you might be asked to send in a bug report. Click on the green bug icon within one of the red error datasets to start the submission process: ![](/src/images/icons/bug.png)

### Green unexpected-result datasets

If you can reproduce on [Main](/src/main/index.md), and the problem presents in a **green success dataset (but the result is unexpected)**, you may be asked to send in a shared history link and possibly a shared workflow link. Email our team directly on the private mailing list galaxy-bugs@lists.galaxyproject.org. Include the share link(s) and note the problem dataset numbers involved.

### Functionality problems

Any problem can be reported whether it involves a job or not (example: Unexpected or odd functionality in the user interface). Using [Galaxy Biostars](/src/support/biostar/index.md) is the best way to get help in most cases. If the problem is more complex, we may ask you to email us a description of the problem and how to reproduce it. To help clarify and aid with troubleshooting: the description may include share links (History, Workflow, Visualization), screenshots, tools involved (name, version), other input data locations/names (example: Data Library contents), and the URL of the public server you are working at. 

If using your own [local/docker/cloud Galaxy server](https://galaxyproject.github.io/), details about the Galaxy Version, server OS/version, advanced configurations applied, whether the server is new or not, and if the behavior changed after making admin changes (tool installs, upgrading). See **Administrative problems** below.

### Administrative problems

If the problem is presenting in your own Galaxy, administrative configuration may be a factor. **For the fastest help directly from the development community**, admin issues can be alternatively reported to the galaxy-dev@lists.galaxyproject.org mailing list or the GalaxyProject Gitter channel https://gitter.im/galaxyproject/Lobby. Contact [details](/src/get-involved/index.md). Please include the same information about your own Galaxy server as described in **Functionality problems** above.

 ### TIPS
 
Reviewing the problematic output content, the original tool form as submitted, the Job Details' `stdout/stderr`, and a bug report preview can often help to self-diagnose and correct a problem. If enough information, a bug report/Biostars post does not need to be actually submitted. 
 * ![](/src/images/icons/eye.png) Display data in browser "eye icon"
 * ![](/src/images/icons/HistoryInfo.png) Job Details and run Info
 * ![](/src/images/icons/arrow-circle.png) Run this job again or examine original submitted form (filled in)
 * ![](/src/images/icons/bug.png) Review and optionally submit a bug report
 
1. How to share a History or Workflow: [Options/Share or Publish](/src/learn/share/index.md) 
1. If a Workflow was used, please include a share link to the workflow in the bug report's form comments or the direct email.
1. If still not enough information, the problem can be posted to the [Galaxy Help](https://help.galaxyproject.org/) site (public) or the bug report can be sent in (private). 
1. When submitting a bug report, you'll get cc'd copy of the full report with more details that may help, plus we will review unless you state in the comments that the intention is to see the full report (you can always reply later and request a review). 
1. Should you resolve the problem before hearing back from us, or through other resources/your own testing, a reply email/post stating that is also appreciated.
1. Please leave all of the datasets undeleted in your history. This includes input and output datasets used in the analysis thread leading up to the problem. Red error datasets are not applied to your account's usage quota. Inputs are often needed to reproduce/troubleshoot a problem.
1. If you first posted the problem at [Galaxy Help](https://help.galaxyproject.org/), please include a link to that post in the bug/email comments. This helps us to link the two and provide the best feedback.
1. Please avoid emailing individual team members directly about problems. Use the support channels so both we and the community can help you.

## Bug reporting

If you are cetain that a problem is a software bug, please create a GitHub [issue](https://github.com/galaxyproject/galaxy/issues). If you are not sure, issues can be vetted by following the help for **Usage problem reporting** above. 

### TIPS

When creating an issue or sharing details about an error that does not include a shared history (through a link or bug report), be sure to include:

1. Where you are using Galaxy ([Main](/src/main/index.md), local, docker, or cloud instance). 
1. Bug reports from [Test](/src/test/index.md) are generally not sent in. We really do test here and the configuration changes frequently.
1. Galaxy version (usually can be obtained at https://galaxy.example/api/version)
1. The date/time the bug was detected
1. Exact steps to reproduce the issue
1. What troubleshooting steps (if any) you have tested out
