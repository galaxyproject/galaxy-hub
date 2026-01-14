---
title: "Introducing the Zip Explorer: Import individual files from ZIP archives"
date: "2026-01-13"
authors: David López
tease: "Preview the contents of local or remote ZIP archives, explore rich RO-Crate metadata, and import only the files you need directly from the Galaxy interface."
subsites: [global, eu, us]
main_subsite: global
tags: [features, ui-ux, tools]
---

# Introducing the Zip Explorer

A common friction point when working with data is needing only a specific file from a large ZIP archive. Previously, this often required downloading the entire archive to your computer, extracting it, and then uploading the specific file to Galaxy.

With the new **Zip Explorer** feature introduced in **Galaxy v25.0**, you can now **preview the contents of ZIP archives** and **selectively import individual files** directly from the Galaxy Upload dialog. This works for both local ZIP files and remote ZIP archives (via URL), saving you time, bandwidth, and storage space.

## Key Features

### 1. Rich RO-Crate Metadata Preview

The Zip Explorer is exceptionally powerful when working with metadata-rich archives, specifically **Research Object Crates (RO-Crates)** and Galaxy exports.

If you explore a ZIP file that is an RO-Crate (containing `ro-crate-metadata.json`), the UI goes beyond a simple file tree. It automatically parses and renders the crate's metadata directly in the preview. This allows you to inspect dataset descriptions, authorship, licensing, and specific entities described within the crate before deciding what to import.

### 2. Remote ZIP Archive Support

You can explore ZIP files hosted on remote servers without downloading them first. By providing the URL, Galaxy can fetch the archive's directory structure and stream only the specific files you select.

-   **Requirements:** The remote server must support **HTTPS** and accept **byte-range requests**.
-   **Benefit:** Allows you to extract small files from massive archives without transferring the whole payload.

### 3. Smart Galaxy Workflow Detection

When exploring an archive, the Zip Explorer automatically identifies `.ga` workflow files and displays them in a dedicated section. This makes it effortless to find and import Galaxy workflows packaged inside larger analysis crates.

### 4. Local ZIP Archive Support

You can also explore ZIP files from your local computer. Extraction happens entirely in your browser before the selected files are sent to Galaxy. _(Note: this is subject to your browser's local storage limits, so it is best suited for extracting small sets of files)._

## How to use the Zip Explorer

Importing files using the Zip Explorer is integrated directly into the standard Galaxy Upload dialog.

### Step 1: Open the Upload Dialog

Click the **Upload Data** button in Galaxy to open the upload manager.

### Step 2: Add a ZIP file or URL

You can either:

-   Paste a **URL** pointing to a remote ZIP file (like a published RO-Crate).
-   Select a **local ZIP file** from your computer.

### Step 3: Click "Explore"

Once the ZIP source is added, an **Explore** button will appear next to the file entry. Click it to launch the Zip Explorer wizard.

### Step 4: Preview Metadata and Select Files

The wizard will display the folder structure of the archive. If it is an RO-Crate or Galaxy export, you will see a rich display of the archive's metadata. You can navigate through the contents and check the boxes next to the files or workflows you wish to import.

<div align="center">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/oqEUHoCcEPo?si=piWqAHmZ0yKfLO9n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

### Step 5: Import

After making your selection, click **Import**. Galaxy will extract the selected files and add them to your history as datasets. Any selected workflows will be added directly to your workflow list, ready to run.

## Technical Details

For remote archives, this feature utilizes a new **Remote ZIP archive extractor** file source. It intelligently fetches only the necessary byte ranges (headers and specific file data) from the server.

The metadata extraction and parsing is powered by the [`ro-crate-zip-explorer`](https://github.com/davelopez/ro-crate-zip-explorer) library, ensuring robust handling of archive formats and metadata.
