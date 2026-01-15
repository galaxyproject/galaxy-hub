---
title: "Integration of the Dataverse with Galaxy"
date: "2026-01-15"
authors: Anup Kumar
tease: "Galaxy users can now connect to the Dataverse as a repository source, browse and search datasets directly from the Upload dialog, import files into histories, and (optionally) export Galaxy outputs back to Dataverse using an API token."
subsites: [global,eu,us]
main_subsite: freiburg
tags: [tools]
---

# Integration of Dataverse with Galaxy

A common friction point in reproducible research is **moving data between analysis platforms and FAIR repositories**: downloading files locally, re-uploading them to Galaxy, and later repeating the process to publish results back into a repository. We will walk through with an example dataverse - Barcelona Supercomputing Center (BSC) Dataverse.

With Galaxy’s Dataverse integration, you can connect a Dataverse instance (here: **BSC Dataverse**) as a **file source** and then:

- **Browse and search Dataverse datasets/collections from Galaxy**
- **Import files directly into a Galaxy history** (as normal datasets)
- **(Optionally) export Galaxy outputs back to Dataverse** for sharing/publishing

This keeps your analyses reproducible while reducing manual “download/upload loops”.

---

## Get your BSC Dataverse API token

To access private content and to enable uploads back to Dataverse, you’ll need an API token from your Dataverse account. First create an account on [BSC dataverse](https://dataverse.bsc.es/). Then, create an API token

<div align="center">
  <img src="bsc_dv_0.png" alt="BSC Dataverse account page showing the API Token tab and token validity" width="600"/>
</div>

---

## Create a BSC Dataverse repository in Galaxy

Galaxy stores external connections under **User Preferences → My Repositories**. This lets you reuse the same connection across uploads, tools, and workflows.

### 1) Create a new repository

Go to **User Preferences → My Repositories → Create**. From the repository options, choose **Dataverse**.

<div align="center">
  <img src="bsc_dv_1.png" alt="Galaxy: Create new repository source options, including Dataverse" width="600"/>
</div>

### 2) Configure the Dataverse connection

Fill in the Dataverse settings:

- **Name**: a label for your repository (e.g., `BSC dataverse`)
- **Dataverse instance endpoint**: `https://dataverse.bsc.es/`
- **Allow Galaxy to export data to Dataverse?**: set to **Yes** if you want to upload from Galaxy to Dataverse
- **Publication Name**: creator name used in dataset metadata
- **API Token**: paste the token from your Dataverse account

<div align="center">
  <img src="bsc_dv_2.png" alt="Galaxy: Dataverse file source configuration form (endpoint, export toggle, publication name, API token)" width="600"/>
</div>

### 3) Confirm the repository was created

After saving, your new entry appears in **My Repositories**.

<div align="center">
  <img src="bsc_dv_3.png" alt="Galaxy: My Repositories list showing a created BSC dataverse source" width="600"/>
</div>

---

# Import datasets from BSC Dataverse into a Galaxy history

## Step-by-step: browse/search and import a file

### 1) Open Galaxy Upload and choose “Choose from repository”

From the Galaxy **Upload** dialog, click **Choose from repository** and select your configured Dataverse source (e.g., **BSC dataverse**).

<div align="center">
  <img src="bsc_dv_4.png" alt="Galaxy: repository picker showing available file sources including BSC dataverse" width="600"/>
</div>

### 2) Browse Dataverse collections/datasets

You can navigate folders/collections and list available datasets.

<div align="center">
  <img src="bsc_dv_5.png" alt="Galaxy: browsing the BSC Dataverse hierarchy from within the upload repository browser" width="600"/>
</div>

### 3) Select dataset(s) and import

Search for "handwritten" and select the dataset: **A Dataset for Handwritten Text Recognition in Medieval Notarial Charters Written on Parchment** and proceed with **Select**.

<div align="center">
  <img src="bsc_dv_9.png" alt="Galaxy: selecting a dataset/collection within BSC Dataverse from the repository browser" width="600"/>
</div>

---

# Export from Dataverse to Galaxy history


### 1) Add files to the upload queue targeting BSC Dataverse

In the Upload dialog, choose **BSC Dataverse** as the destination and add the file(s) to the queue.

<div align="center">
  <img src="bsc_dv_10.png" alt="Galaxy: Upload dialog showing a file queued for upload to BSC Dataverse" width="600"/>
</div>

---

<div align="center">
  <img src="bsc_dv_11.png" alt="Galaxy: Upload dialog showing a file queued for upload to BSC Dataverse" width="600"/>
</div>

### 2) Verify the dataset is available in your Galaxy history

Once imported/exported workflows complete, the file appears as a normal Galaxy dataset (usable as tool input, workflow input, or for sharing).

<div align="center">
  <img src="bsc_dv_12.png" alt="Galaxy: history panel showing the imported dataset" width="600"/>
</div>

---

## Significance for reproducible, FAIR Galaxy workflows

Connecting BSC Dataverse as a first-class repository source in Galaxy makes it easier to operationalize FAIR data management:

- **Direct repository access in the Galaxy Upload** (browse + search)
- **Less manual file handling** (fewer downloads/re-uploads).
- **Clear provenance**: imported files become explicit history items.
- **Better sharing and publishing**: export results back to Dataverse when ready.
- **Reusable connections**: one repository configuration can power many analyses and workflows.
