---
title: "Integration of the Dataverse with Galaxy"
date: "2026-01-15"
authors: Anup Kumar
tease: "Galaxy users can now connect to a Dataverse as a repository source, browse and search datasets directly from the Upload dialog, import files into histories and utilize them for scientific analyses."
subsites: [global,eu,us]
main_subsite: freiburg
tags: [tools]
---

# Integration of Dataverse with Galaxy

A common bottleneck in reproducible research is **moving data between analysis platforms and FAIR repositories**: downloading files locally, re-uploading them to Galaxy, and later repeating the process to publish results back into a repository. We will walk through an example dataverse - [Barcelona Supercomputing Center (BSC)](https://dataverse.bsc.es/) Dataverse showcasing its usage from within Galaxy. The public datasets inside the dataverse become directly accessible using the Galaxy's dataverse file source plugin. For showing the usage of private data repositories, we will use [Harvard Dataverse](https://dataverse.harvard.edu/).

With Galaxy’s dataverse integration, you can connect a dataverse instance (here: **BSC Dataverse**) as a **file source** and then:

- **Browse and search dataverse datasets/collections from Galaxy**
- **Import files directly into a Galaxy history** (as normal datasets)

This keeps your analyses reproducible while reducing manual “download/upload loops”.

## Pre-configured BSC Dataverse in Galaxy

**Note**: You can either use the pre-configured BSC Dataverse repository or create your own. You can find all preconfigured Dataverses by clicking **Upload** in your activity bar, then **Choose from repository**, and typing **Dataverse** in the search bar. There, you can see all preconfigured Dataverses. This is sufficient if you want to reuse existing datasets from an already preconfigured Dataverse.  You can continue uploading data directly to your Galaxy history.

Preconfigured BSC Dataverse:

<div align="center">
  <img src="bsc_dataverse_preconfigured.png" alt="Galaxy: preconfigured" width="600"/>
</div>

---

## Get your BSC Dataverse API token

To access private content and to enable uploads from dataverse, you’ll need an API token from your dataverse account. First create an account on [BSC Dataverse](https://dataverse.bsc.es/). Then, create an API token.

<div align="center">
  <img src="bsc_dv_0.png" alt="BSC Dataverse account page showing the API Token tab and token validity" width="600"/>
</div>

---

## Create your own BSC Dataverse repository in Galaxy

Galaxy stores external repositories under **User Preferences → My Repositories**. This lets you reuse the same repository across uploads, tools, and workflows. 

### 1) Create a new repository

Go to **User Preferences → My Repositories → Create**. From the repository options, choose **Dataverse**.

<div align="center">
  <img src="bsc_dv_1.png" alt="Galaxy: Create new repository source options, including Dataverse" width="600"/>
</div>

### 2) Configure the dataverse connection

Fill in the Dataverse settings:

- **Name**: a label for your repository (e.g., `BSC Dataverse`)
- **Dataverse instance endpoint**: `https://dataverse.bsc.es/`
- **Allow Galaxy to export data to Dataverse?**: set to **Yes** if you want to upload from Galaxy to dataverse
- **Publication Name**: creator name used in dataset metadata
- **API Token**: paste the token from your dataverse account

<div align="center">
  <img src="bsc_dv_2.png" alt="Galaxy: Dataverse file source configuration form (endpoint, export toggle, publication name, API token)" width="600"/>
</div>

### 3) Confirm the repository was created

After saving, your new entry appears in **My Repositories**.

<div align="center">
  <img src="bsc_dv_3.png" alt="Galaxy: My Repositories list showing a created BSC Dataverse source" width="600"/>
</div>

---

# Import datasets from BSC Dataverse into a Galaxy history

## Step-by-step: browse/search and import a file

### 1) Open “Galaxy Upload” and choose “Choose from repository”

From the Galaxy **Upload** dialog, click **Choose from repository** and select your configured dataverse source (e.g., **BSC Dataverse**).

<div align="center">
  <img src="bsc_dv_4.png" alt="Galaxy: repository picker showing available file sources including BSC Dataverse" width="600"/>
</div>

### 2) Browse Dataverse collections/datasets

You can navigate folders/collections and list available datasets.

<div align="center">
  <img src="bsc_dv_5.png" alt="Galaxy: browsing the BSC Dataverse hierarchy from within the upload repository browser" width="600"/>
</div>

### 3) Select dataset(s) and import

If you are, for example, looking for scans of Medieval texts, search for "handwritten" and select the dataset: **A Dataset for Handwritten Text Recognition in Medieval Notarial Charters Written on Parchment** by clicking on **Select**.

<div align="center">
  <img src="bsc_dv_9.png" alt="Galaxy: selecting a dataset/collection within BSC Dataverse from the repository browser" width="600"/>
</div>

---

# Export from Dataverse to Galaxy history


### 1) Add files to the upload queue

In the Upload dialog, choose **BSC Dataverse** as the destination, select files to be uploaded to Galaxy history and add the file(s) to the Galaxy upload queue.

<div align="center">
  <img src="bsc_dv_10.png" alt="Galaxy: Upload dialog showing a file queued for upload to BSC Dataverse" width="600"/>
</div>

---

<div align="center">
  <img src="bsc_dv_11.png" alt="Galaxy: Upload dialog showing a file queued for upload to BSC Dataverse" width="600"/>
</div>

### 2) Verify the dataset is available in your Galaxy history

Once imported (when it turns green), the file appears as a normal Galaxy dataset (usable as tool input, workflow input, or for sharing). You can take a look at it by clicking on the "eye-icon" on the right side of the dataset.

<div align="center">
  <img src="bsc_dv_12.png" alt="Galaxy: history panel showing the imported dataset" width="600"/>
</div>

---

# Configuring a private dataverse

For working with private datasets, we will use [Harvard Dataverse](https://dataverse.harvard.edu/). We will repeat the same steps as we did for creating and configuring BSC Dataverse.

### 1) Create an account on [Harvard Dataverse](https://dataverse.harvard.edu/) and acquire an API token.

<div align="center">
  <img src="har_dv_10.png" alt="Harvard Dataverse: API" width="600"/>
</div>


### 2) Create a private Dataverse on Harvard Dataverse

<div align="center">
  <img src="har_dv_1.png" alt="Harvard Dataverse: created" width="600"/>
</div>

### 3) Add datasets to the newly created Dataverse

<div align="center">
  <img src="har_dv_2.png" alt="Harvard Dataverse: add dataset" width="600"/>
</div>

<div align="center">
  <img src="har_dv_3.png" alt="Harvard Dataverse: add dataset form" width="600"/>
</div>

<div align="center">
  <img src="har_dv_4.png" alt="Harvard Dataverse: added dataset" width="600"/>
</div>

### 4) Browse the Harvard Dataverse from within Galaxy's file uploader

<div align="center">
  <img src="har_dv_0.png" alt="Harvard Dataverse: added dataset" width="600"/>
</div>

### 5) Select the newly created "Training data" repository from the uploader and import the underlying dataset into Galaxy history

<div align="center">
  <img src="har_dv_0_0.png" alt="Harvard Dataverse: added dataset" width="600"/>
</div>

The datasets imported from public and private dataverses can be directly used in any suitable Galaxy tool or workflow or for sharing.

# Significance for reproducible Galaxy tools and workflows

Connecting Dataverse as a direct repository source in Galaxy makes it easier to operationalize FAIR data management:

- **Direct repository access in the Galaxy Upload** (browse + search).
- **Less manual file handling** (fewer downloads/re-uploads).
- **Clear provenance**: imported files become explicit history items.
- **Sharing and reusablility**: one repository configuration can power many analyses and workflows.
- **Easier sharing of your own data** After you have analysed your material in Galaxy, you can easily push it to Dataverse.
