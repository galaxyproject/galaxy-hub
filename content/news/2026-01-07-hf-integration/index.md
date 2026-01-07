---
title: "Pulling Hugging Face models directly into Galaxy"
date: "2026-01-07"
authors: Anup Kumar
tease: "Galaxy can now browse the Hugging Face Hub as a repository source, import model files straight into your history, and feed them into tools—no manual downloads required. Here’s a step-by-step example using DocLayout-YOLO for document layout segmentation."
subsites: [global,eu,us]
main_subsite: freiburg
tags: [tools]
---


# Pulling Hugging Face models directly into Galaxy (and running DocLayout-YOLO inference)

A common friction point in ML-powered Galaxy workflows is **getting the right model file into the right place**: downloading weights locally, uploading again, and repeating for every history or workflow run.

With Galaxy’s new **Hugging Face Hub file source**, you can **browse Hugging Face repositories from within Galaxy**, import a model artifact directly into your history, and immediately use it as a tool input. This feature is implemented as a Galaxy file source plugin built on the `fsspec` approach and uses the `huggingface_hub` library under the hood. :contentReference[oaicite:0]{index=0}

> **Note:** The Hugging Face file source + user template landed as part of Galaxy **v25.1.0**. :contentReference[oaicite:1]{index=1}

---

## Model integration and making inference

We’ll demonstrate the full flow with a practical example:

1. Open Galaxy’s **Upload** dialog and choose **Hugging Face Hub** as the repository source
2. Browse to a DocLayout-YOLO model respository and select a `.pt` weights file  
3. Import the file into the Galaxy history  
4. Run the [**DocLayout-YOLO** tool](https://usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fdoclayoutyolo%2Fdoclayoutyolo%2F0.0.4.1%2Bgalaxy0&version=latest) using:
   - the imported YOLO model weights
   - a document page image as input  
5. View the segmented output image

All screenshots below are provided **in the same order as the actual steps**.

---

## Step-by-step: import a model from Hugging Face Hub

### 1) Open Upload and choose “Choose from repository”

From the Galaxy **Upload** dialog, click **Choose from repository**.

<div align="center">
    <img src="1_choose_from_repo_hf.png" alt="Upload dialog: choose “Choose from repository”" width="600"/>
</div>

---

### 2) Select “Hugging Face Hub” as the repository source

In the repository picker, choose **Hugging Face Hub**.

<div align="center">
    <img src="2_hf_hub.png" alt="Repository picker: select “Hugging Face Hub”" width="600"/>
</div>

---

### 3) Search for the model repository

Now you can browse/search Hugging Face directly from Galaxy. Here we search for *doclayout* and select the pretrained DocLayout-YOLO repository.

<div align="center">
    <img src="3_doclayout_hf.png" alt="Browse Hugging Face repos from Galaxy and select the DocLayout-YOLO repository" width="600"/>
</div>

---

### 4) Select the model weights file

Inside the repository, pick the weights file (here a `.pt` file).

<div align="center">
    <img src="4_select_model.png" alt="Select the YOLO weights file from the repository" width="600"/>
</div>

---

### 5) Import the selected file into your history

After adding the file to the upload queue, click **Start** to import it into your Galaxy history.

<div align="center">
    <img src="5_import_model.png" alt="File added to upload queue; click Start to import" width="600"/>
</div>

At this point, your YOLO weights are now a normal Galaxy dataset: versioned in the history, shareable, and usable as a tool/workflow input.

---

## Run inference in Galaxy: DocLayout-YOLO example

### 6) Configure the DocLayout-YOLO tool

Open the **DocLayout-YOLO** tool form and set:

- **Yolo model** → the `.pt` file you imported from Hugging Face
- **Input image** → the document page image you want to segment

<div align="center">
    <img src="6_doclayout_tool.png" alt="DocLayout-YOLO tool form using the imported model weights" width="600"/>
</div>

Then click **Run Tool**.

---

### 7) View the output: segmented page with detected layout regions

The tool produces a segmented image with detected regions (e.g., headings, paragraphs, page headers) drawn as bounding boxes.

<div align="center">
    <img src="7_segmented_image.png" alt="Segmented output image produced by DocLayout-YOLO" width="600"/>
</div>

---

## Why this matters for reproducible Galaxy ML workflows

Pulling models from Hugging Face *inside Galaxy* makes ML workflows much easier to operationalize:

- **No manual download/upload loop** (especially painful for large weights)
- **Tool inputs become explicit**: the exact model file used is captured in the history and workflow provenance
- **Reusable across analyses**: share histories/workflows with the model artifact included

---



