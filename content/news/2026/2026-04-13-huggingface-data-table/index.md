---
title: "Announcing a shared Hugging Face data table for Galaxy"
date: "2026-04-13"
tease: "Galaxy is standardising a shared data table for pre-downloaded Hugging Face models so tool authors and admins can coordinate without duplicated effort."
tags: [tools, admin, ai]
subsites: [all]
contributions:
  authorship:
    - arash77
---

A growing number of Galaxy tools need to present pre-downloaded Hugging Face-compatible models to users at job submission time.  To avoid schema drift and duplicated administrator effort, the Galaxy community is standardising a **shared Galaxy data table** named `huggingface` that all such tools can consume from a single admin-managed `.loc` file.

[Flux](https://github.com/bgruening/galaxytools/tree/master/tools/flux) is the first tool to adopt this pattern, filtering models by type so users only see entries relevant to their task.

**Key points:**

- The table is named `huggingface` and lives in the standard Galaxy tool data directory
- It has **7 columns**: `value`, `name`, `pipeline_tag`, `domain`, `free_tag`, `version`, `path`
- Tool authors filter primarily by `pipeline_tag` and/or `domain`; `free_tag` is a fallback for finer-grained selection
- Rows are only added, never removed, so existing tool configurations stay stable as new models are registered
- A single `huggingface.loc` file is shared across all tools and maintained by admins

The full schema reference, column conventions, and XML filter examples are being added to the [Galaxy admin documentation](https://docs.galaxyproject.org/en/master/admin/data_tables.html).
