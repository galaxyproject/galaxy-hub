---
title: 'Galaxy Release 20.09'
tease: GTN in Galaxy, upload from Dropbox, workflow enhancements, better performance!
date: '2020-11-17'
---

We are pleased to announce the release of Galaxy
20.09 - **[developer and admin release announcement](https://docs.galaxyproject.org/en/master/releases/20.09_announce.html)** and **[user release announcement](https://docs.galaxyproject.org/en/master/releases/20.09_announce_user.html)**.
A few release highlights are:

GTN in Galaxy
-------------
The Galaxy Training Network tutorials can now be accessed from within Galaxy
using the graduation cap icon. For updated tutorials, tools will be
highlighted as blue buttons. When clicked, these buttons will hide the GTN and
take you directly to the correct version of the correct tool within the Galaxy
interface.

Plugin framework for uploading datasets
---------------------------------------
Galaxy administrators can now configure different sources
from which users may upload files. These include global or
user-specific WebDAV servers, dropbox accounts as well as
FTP and regular filesystem locations. Developers can add
new types of sources by adding [PyFileSystem2](https://docs.pyfilesystem.org/en/latest/introduction.html)
compatible plugins.

Upload directly from the Tool Form
----------------------------------
Datasets can now be uploaded directly from the Tool Form.

Workflow import from GA4GH TRS servers
--------------------------------------
Galaxy can now search and import workflows from GA4GH TRS servers,
such as [Dockstore](https://dockstore.org/) and [WorkflowHub](https://workflowhub.eu/).
We hope that sharing workflows on these platforms will facilitate re-use and collaboration.

Simplified workflow submission form
-----------------------------------
Galaxy now presents a simpler and cleaner interface for submitting workflows
that focuses on the parameters to set and datasets to choose.

Accelerated batch job creation and workflow step scheduling
-----------------------------------------------------------
Galaxy now batches database interactions for the creation of batch jobs.
For large batches of jobs this can speed up job creation by 100-fold or more.

_Thanks for using Galaxy!_
