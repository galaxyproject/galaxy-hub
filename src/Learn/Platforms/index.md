INCLUDE(/Learn/LinkBox)

Help on using Galaxy that is specific to particular browsers, operating systems, and/or hardware.  This includes specific tricks and workarounds, as well as known issues.

TABLE_OF_CONTENTS

# Browsers

## Firefox

### Get Data from UCSC and Firefox >= 4 interaction

**A bug in Firefox can cause data retrieval from the UCSC Table Browser to quietly fail.**

Due to a [regression introduced](http://hg.mozilla.org/mozilla-central/rev/56815e37d436#l3.293) in a version of Firefox >= 4, if the browser is configured to reject third-party cookies, data retrieval from UCSC will quietly fail.  The steps to reproduce and symptoms are listed below:

1. Select a **Get Data** &rarr; **UCSC ...** tool in Galaxy.
1. When finished in the Table Browser, click **Send query to Galaxy**
1. The usual green message is displayed in Galaxy with the usual **The following job has been successfully added to the queue: 1: UCSC ...** message
1. ***No new dataset appears in the history, even after refreshing***

Upon clicking **Send query ...** at UCSC, your web browser generates a POST request containing the Table Browser's form contents and sends it directly to Galaxy as a tool/job submission, so there is no interaction between UCSC and Galaxy at this stage.  However, Firefox mistakenly believes that this is third-party site interaction and does not send Galaxy's session cookie along with the request.  The UCSC Get Data job runs, but the data is created in a new history in a new session which is not accessible to the current Galaxy user.

In its default configuration, Firefox is set to accept [third-party cookies](http://en.wikipedia.org/wiki/HTTP_cookie#Privacy_and_third-party_cookies), so users should not encounter this issue unless their settings have been changed from the default.  In addition, [the bug](https://bugzilla.mozilla.org/show_bug.cgi?id=664721) has already [been fixed](http://hg.mozilla.org/integration/mozilla-inbound/rev/cedefaaaaceb) in development, but is targeted for release in Firefox [7.0](https://bugzilla.mozilla.org/show_bug.cgi?id=664721#c29) or [8.0](https://bugzilla.mozilla.org/show_bug.cgi?id=664721#c22).  Until the fix is released, the bug can be worked around in one of two ways:

**Accept third-party cookies:**

1. From the **Firefox** (Mac) or **Edit** (others) menu, select **Preferences**
1. Choose the **Privacy** section
1. From the drop-down menu under **History**, choose **Firefox will: Use custom settings for history**
1. Check **Accept third-party cookies**
1. Close the **Preferences** dialog

Alternatively, you may **grant Galaxy a cookie exception**:

1. Follow steps **1-3** above.
1. Click the **Exceptions...** button found to the right of **Accept cookies from sites**
1. Enter the hostname of the Galaxy server in the **Address of web site:** field (for the public Galaxy site at usegalaxy.org/main.g2.bx.psu.edu, use **main.g2.bx.psu.edu**)
1. Click **Allow** to add it to the list.
1. Click **Close** on this dialog and the Preferences dialog to return to the browser.


 
