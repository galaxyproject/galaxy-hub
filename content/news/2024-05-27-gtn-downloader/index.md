---
title: 'GTN-downloader'
date: '2024-05-27'
tease: "Automating Galaxy Training Network (GTN) data downloads and providing effortless access to GTN data in a Galaxy instance (powered by the OneData cloud)."
hide_tease: false
authors: Polina Polunina
subsites: [global, all]
main_subsite: eu
---

# GTN Downloader: Simplifying Access to Galaxy Training Network Data

[GTN-Downloader](https://github.com/usegalaxy-eu/gtn-downloader) makes it easier for users to access and organize data from the Galaxy Training Network (GTN). Here’s a straightforward overview of what this feature does and how it can benefit you.

## What is the GTN Downloader?

The GTN Downloader is a Python script that automates the download of data from GTN tutorials. It goes through the tutorials in the GTN repository, finds `data-library.yaml` files, and creates a structured directory based on the tutorial names and file contents.

### Key Features:
- **Automated Data Download**: The script finds `data-library.yaml` files in the GTN repository and downloads the associated data files.
- **Structured Organization**: It creates directories based on the tutorial names and the information in the `data-library.yaml` files, so the files are organized.
- **Download Summary**: It generates a `download-summary.tsv` file, which includes metadata about the downloaded files, a download report (error, success, already downloaded), and the overall size of the files.

## Seamless Integration with OneData

In addition to local downloads, the GTN Downloader can upload data to OneData, a cloud storage solution. This integration ensures that the latest GTN data is always available to users.

### Automated Workflow with GitHub CI/CD:
- **Automated Workflow**: A GitHub Actions workflow runs once a week on weekends to download the latest data from the GTN tutorials and upload it to OneData.
- **Environment Setup**: The workflow sets up necessary environment variables and installs dependencies, including Oneclient, the OneData client.
- **Data Upload**: After downloading the data, the workflow uploads it to OneData, making it accessible via the cloud.

## Accessing GTN Data in the Cloud

You can access the uploaded data through several methods:

1. **OneData Share**: Access the data via [OneData share](https://datahub.egi.eu/share/2697e33bd34f1870b0961414b8c77753chf583) using a public read-only access token.
2. **OneData Client**: Use the [OneData client](https://www.onedata.org/#/home/documentation/21.02/user-guide/oneclient.html) to directly access the data.
3. **Galaxy Server Integration**: Access the data on the [European Galaxy server](https://usegalaxy.eu/). Go to the "Upload data" button, select "Choose remote files," and navigate to the GTN repository.

### Configuration Example:
To access the GTN data via OneData or include it in your Galaxy server, use the following configuration:
```yaml
- type: onedata
  id: gtn_public_onedata
  label: GTN training data
  doc: Training data from the Galaxy Training Network (powered by Onedata)
  # The following token is a public, read-only token that can be shared.
  accessToken: "MDAxY2xvY2F00aW9uIGRhdGFodWIuZWdpLmV1CjAwNmJpZGVudGlmaWVyIDIvbm1kL3Vzci00yNmI4ZTZiMDlkNDdjNGFkN2E3NTU00YzgzOGE3MjgyY2NoNTNhNS9hY3QvMGJiZmY1NWU4NDRiMWJjZGEwNmFlODViM2JmYmRhNjRjaDU00YjYKMDAxNmNpZCBkYXRhLnJlYWRvbmx5CjAwNDljaWQgZGF00YS5wYXRoID00gTHpaa1pUTTROMkl4WmpjMllXVmpOMlU00WWpreU5XWmtNV00ZpT1RKbU1ETXlZMmhoWTJReAowMDJmc2lnbmF00dXJlIIQvnXp01Oey02LnaNwEkFJAyArzhHN8SlXSYFsBbSkqdqCg"
  onezoneDomain: "datahub.egi.eu"
