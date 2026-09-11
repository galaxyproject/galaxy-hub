---
title: "Connecting openBIS and Galaxy: from lab data to analysis and back"
date: "2026-09-11"
tease: "Browse openBIS files in Galaxy, analyse them, and return results to your lab notebook."
components: true
hide_tease: false
tags: [integrations]
contributions:
  authorship:
    - plushz
---

Lab data and analysis often live in different places. An experiment is documented in
openBIS, while its data are analysed in Galaxy. Moving files between them manually adds
extra downloads and uploads to the workflow.

[openBIS](https://openbis.ch/) combines an electronic lab notebook, inventory management,
and research data management. A new openBIS file source in Galaxy connects these two environments. It lets you browse files
from openBIS inside Galaxy, import them into a history, and send analysis results back
to an existing Collection or Object in openBIS.

The implementation is described in [Galaxy pull request #23458](https://github.com/galaxyproject/galaxy/pull/23458).
Availability depends on your Galaxy server: an administrator must install the integration.

## Connect your openBIS account

You need an openBIS account with access to the data you want to analyse, a Personal
Access Token (PAT), and a Galaxy account on a server with the integration enabled.

Create a PAT using the
[openBIS v3 API](https://openbis.readthedocs.io/en/7.x/software-developer-documentation/apis/java-javascript-v3-api.html#personal-access-tokens),
or ask your openBIS administrator for help.

In Galaxy, open your user preferences and select **Manage Your Repositories**, then
**Create** and **openBIS**. Give the connection a descriptive name and provide:

- Your openBIS base URL, such as `https://openbis.example.org`.
- Your Personal Access Token.
- **Writable** enabled if you want to export results; it is disabled by default.
- **Verify TLS certificates** enabled to verify the server's identity.

Only disable certificate verification for a trusted local test instance with an
untrusted or self-signed certificate. Your Galaxy server must be able to reach the
openBIS address; browser access alone is not enough.

<VideoPlayer
  src="/images/news/2026-09-11-openbis-integration/openbis-connect.webm"
  title="Connect Galaxy to openBIS using a personal access token."
/>

## Bring lab files into a Galaxy history

Open **Upload**, choose **Choose remote files**, and select your openBIS connection.
Browse through your Space, Project, and Collection to find the files you need.
Objects inside Collections are also shown as folders. In the openBIS API, Collections
are called Experiments and Objects are called Samples.

The file source exposes two kinds of storage:

- **AFS files** appear inside a Collection's or Object's `files` folder. They can be
  imported and, when writing is enabled, used as export destinations.
- **Existing openBIS DataSets** can be browsed and downloaded, but are read-only
  through this integration.

AFS is the file storage introduced in openBIS 7 and used by its **Files** tab.
The [openBIS documentation recommends AFS for new uploads](https://openbis.readthedocs.io/en/7.x/user-documentation/general-users/data-upload.html).
An openBIS DataSet is a registered bundle of files, not the same concept as an
individual dataset in a Galaxy history.

Select a file and start the import. Once it is ready in your history, you can use
Galaxy tools and workflows as usual.

<VideoPlayer
  src="/images/news/2026-09-11-openbis-integration/openbis-import.webm"
  title="Import paired-end FASTQ files from openBIS into Galaxy."
/>

## Send results back to openBIS

Open Galaxy's **Export datasets to repositories** tool (`export_remote`) and select your output dataset.
Use the destination browser to select the existing Collection's or Object's `files`
directory, or a subfolder inside it, and run the export.

Return to openBIS and refresh the entity's **Files** tab to see the result alongside
your input data. Use a clear, distinct output name so it is easy to identify what
came back from Galaxy.

<VideoPlayer
  src="/images/news/2026-09-11-openbis-integration/openbis-export.webm"
  title="Export FastQC reports from Galaxy back to the original openBIS record."
/>

This is an explicit file-transfer workflow, not automatic synchronization. Exporting
a result does not automatically copy Galaxy's workflow or provenance into openBIS
metadata; the analysis history remains in Galaxy.

## A few things to know

- The browser shows all Spaces your token can access, not just your home Space.
  A shared Space such as `ELN_SETTINGS` may therefore also appear.
- Create Spaces, Projects, Collections, and Objects in openBIS before using them
  from Galaxy. The integration can create AFS folders, but not openBIS entities.
- This first implementation follows the Collection-based hierarchy. Objects outside
  Collections, classic Attachments, and linked/container DataSets are not covered
  by this browsing workflow.
- Renaming and deleting AFS files are not exposed by this file source; manage those
  operations in openBIS.
