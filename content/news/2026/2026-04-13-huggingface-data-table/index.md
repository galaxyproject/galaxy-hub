---
title: "The Hugging Face Galaxy data table: schema and ontology"
date: "2026-04-13"
tease: "Galaxy is standardizing a shared data table for pre-downloaded Hugging Face models. This post is the reference for the 7-column schema, controlled vocabularies, and conventions."
tags: [tools, admin, ai]
subsites: [all]
autotoc: true
contributions:
  authorship:
    - arash77
---

A growing number of Galaxy tools need to present pre-downloaded
HuggingFace-compatible models to users at job submission time.
[Flux](https://github.com/bgruening/galaxytools/tree/master/tools/flux)
already uses this pattern, and future HuggingFace-backed tools can adopt the
same convention.  To avoid schema drift and duplicated administrator effort,
the Galaxy community is standardizing a [**shared Galaxy data table**](/admin/tools/data-tables/) named
`huggingface`.  This post is the **reference** for that schema.

**Key points:**

- The table has **7 columns**: `value`, `name`, `pipeline_tag`, `domain`, `free_tag`, `version`, `path`
- It is recommended to **filter primarily by `pipeline_tag` and/or `domain`**; use `free_tag` only as a fallback when those are not specific enough

## The data table

The table is declared with this block in `tool_data_table_conf.xml`:

```xml
<!-- huggingface models -->
<table name="huggingface" comment_char="#" allow_duplicate_entries="False">
    <columns>value, name, pipeline_tag, domain, free_tag, version, path</columns>
    <file path="/opt/galaxy/tool-data/huggingface.loc" />
</table>
```

The sample file shipped with each tool (`tool-data/huggingface.loc.sample`)
uses the same 7-column layout.

## Column reference

| # | Column | Purpose |
|---|--------|---------|
| 0 | `value` | Unique row ID across the **whole table** |
| 1 | `name` | Human-readable label shown in the Galaxy select widget |
| 2 | `pipeline_tag` | Model role — see controlled vocabulary below |
| 3 | `domain` | Coarse data domain — see controlled vocabulary below |
| 4 | `free_tag` | Optional narrowing tag; fallback filter when `pipeline_tag`/`domain` alone are not specific enough |
| 5 | `version` | Model version |
| 6 | `path` | Path to the model data, a directory or a specific file, depending on the model structure |

### `value` (column 0)

Must be **globally unique** across every row in `huggingface.loc`,
regardless of which tool added it.  Hugging Face already assigns unique model
IDs (in the form `<owner>/<model-name>`) — use those directly as the value
wherever possible, since they are stable and unambiguous.  If the same
underlying model is registered at more than one version, append the version:

```
<hf-model-id>
<hf-model-id>_<version>
```

Examples: `black-forest-labs/FLUX.1-dev`,
`sentence-transformers/all-MiniLM-L6-v2`,
`openai/whisper-large-v3_3.0`.

### `pipeline_tag` (column 2)

Use the **official Hugging Face pipeline tag** whenever one exists — browse
the full list at https://huggingface.co/models?pipeline_tag=…

Recommended values for this table include:

| Value | When to use |
|-------|-------------|
| `text-to-image` | Image generation models (Flux) |
| `automatic-speech-recognition` | ASR / transcription models |
| `feature-extraction` | Sentence / document embedding models |
| `tabular-classification` | Tabular ML classifiers |
| `tabular-regression` | Tabular ML regressors |
| `text-generation` | Causal / instruction-tuned LLMs |

Do **not** invent synonyms for existing HF tags (e.g. write
`automatic-speech-recognition`, not `asr`).

### `domain` (column 3)

A broad category for the type of data the model works with. For example:

`image` · `text` · `audio` · `tabular` · `sequence` · `video` · `multimodal`


### `free_tag` (column 4)

An optional short identifier used as a **fallback narrowing filter** in the
tool XML, for cases where `pipeline_tag` and `domain` alone are not specific
enough.  Because a model can be consumed by multiple tools, the `free_tag`
should not encode a specific tool name.  Currently registered public values:

| Value | Scope |
|-------|-------|
| `flux` | Flux image-generation models |

Only add a `free_tag` when you genuinely need to narrow the selection beyond
what `pipeline_tag`/`domain` provide.  Choose a short, lowercase, descriptive
identifier and register it here when the tool is ready to be documented
publicly.

### `version` (column 5)

The **model version** string.  A tool declares in its XML which model version(s)
it can consume, allowing multiple versions of the same model to coexist in the
table.  Where possible, rows are only added, never removed or edited; when a new model version
is deployed it gets a new row while existing rows stay in place.

### `path` (column 6)

The path to the model data either on a local machine during tool development or on the Galaxy production server (maintained by admins). It can be a directory (when the
tool reads the whole HuggingFace cache layout) or a specific file (e.g. a
`.ckpt` checkpoint when the tool only needs that one file).

## XML filter convention

It is recommended that tool XML filters **primarily by `pipeline_tag` (column 2)
and/or `domain` (column 3)**, so only relevant model types are presented to the
user.  Add a `free_tag` or `version` filter only when you need to narrow the
selection further:

```xml
<param name="model" type="select" label="Model">
    <options from_data_table="huggingface">
        <filter type="static_value" column="2" value="<pipeline_tag>"/>
        <filter type="static_value" column="3" value="<domain>"/>
        <!-- optional: narrow further by version or free_tag -->
        <!-- <filter type="static_value" column="5" value="<version>"/> -->
        <!-- <filter type="static_value" column="4" value="<free_tag>"/> -->
    </options>
</param>
```

Example from the Flux tool (filters by `free_tag` to restrict to
Flux-specific model variants):

```xml
<options from_data_table="huggingface">
    <filter type="static_value" column="4" value="flux"/>
    <filter type="static_value" column="5" value="1"/>
</options>
```

## Complete example rows

Each row in the `.loc` file is **TAB-separated** (7 columns). The comments show
the column order.  The concrete example below reflects a published Flux entry;
future adopters should follow the same 7-column pattern.

```
# Columns: value <TAB> name <TAB> pipeline_tag <TAB> domain <TAB> free_tag <TAB> version <TAB> path
#
# Flux
black-forest-labs/FLUX.1-dev	FLUX.1 [dev]	text-to-image	image	flux	1	/data/hf_models
```
