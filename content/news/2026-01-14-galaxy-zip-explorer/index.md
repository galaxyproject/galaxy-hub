---
title: "Introducing the Zip Explorer: Import individual files from ZIP archives"
date: "2026-01-14"
authors: David López
tease: "Preview the contents of local or remote ZIP archives, explore rich RO-Crate metadata, and import only the files you need directly from the Galaxy interface."
subsites: [global, eu, us]
main_subsite: global
tags: [feature, ui-ux, tools]
---

# Introducing the Zip Explorer

A common friction point when working with data is needing only a specific file from a large ZIP archive. Until now, this typically meant downloading the entire archive, extracting it locally, and then uploading just the file you actually needed into Galaxy.

With the new **Zip Explorer** feature introduced in **Galaxy v25.0**, you can **preview the contents of ZIP archives** and **selectively import individual files** directly from the Galaxy Upload dialog. This works for both local ZIP files and remote ZIP archives (via URL), helping you save time, bandwidth, and storage space.

## Key Features

### 1. Rich RO-Crate Metadata Preview

Zip Explorer is particularly useful when working with metadata-rich archives such as [**Research Object Crates (RO-Crates)**](https://journals.sagepub.com/doi/10.3233/DS-210053) and Galaxy exports.

When a ZIP file contains `ro-crate-metadata.json`, the interface goes beyond a simple file tree. The crate metadata is automatically parsed and rendered in the preview, allowing you to inspect dataset descriptions, authorship, licensing information, and individual entities before importing anything.

### 2. Remote ZIP Archive Support

You can explore ZIP files hosted on remote servers without downloading them in full. By providing a URL, Galaxy retrieves the archive’s directory structure and streams only the files you select.

- **Requirements:** The remote server must support **HTTPS** and **byte-range requests**.
- **Benefit:** Extract small files from very large archives while avoiding unnecessary data transfer.

### 3. Smart Galaxy Workflow Detection

When exploring an archive, Zip Explorer automatically detects Galaxy workflow files and presents them in a dedicated section. This makes it easy to locate and import Galaxy workflows packaged inside larger analysis archives or RO-Crates.

### 4. Local ZIP Archive Support

Zip Explorer also works with ZIP files from your local computer. In this case, extraction happens entirely in your browser before the selected files are uploaded to Galaxy.

> **Note:** This approach is subject to your browser’s local storage limits, so it is best suited for extracting smaller sets of files from large local archives.

## How to use the Zip Explorer

Zip Explorer is fully integrated into the standard Galaxy Upload dialog.

### Step 1: Open the Upload dialog

Click **Upload** in the Activity Bar in Galaxy to open the upload manager.

### Step 2: Add a ZIP file or URL

You can either:

- Paste a **URL** pointing to a remote ZIP archive (for example, a published RO-Crate).
- Select a **local ZIP file** from your computer.

### Step 3: Click "Explore"

Once the ZIP source is added, an **Explore** button appears next to the file entry. Click it to open the Zip Explorer interface.

### Step 4: Preview metadata and select files

Zip Explorer displays the archive’s folder structure. For RO-Crates or Galaxy exports, you will also see a rich metadata view. Navigate through the contents and select the files or workflows you want to import.

<div align="center">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/oqEUHoCcEPo?si=piWqAHmZ0yKfLO9n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

### Step 5: Import

Click **Import** to extract the selected items. Files are added to your history as datasets, and any selected workflows are added directly to your workflow list, ready to run.

## Technical Details

For remote archives, Zip Explorer uses a new **Remote ZIP archive extractor** file source. This component fetches only the required byte ranges (archive headers and selected file contents) from the server.

Metadata extraction and rendering are powered by the [`ro-crate-zip-explorer`](https://github.com/davelopez/ro-crate-zip-explorer) library, which provides robust support for ZIP-based RO-Crates and related archive formats.
