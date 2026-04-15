---
title: "The huggingface Galaxy data table: schema and ontology"
date: "2026-04-13"
tease: "Galaxy is standardizing a shared data table for pre-downloaded HuggingFace models. This post is the reference for the 7-column schema, controlled vocabularies, and conventions."
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
- It is recommended to **filter by `free_tag` + `version`** so different tools' rows never interfere
- New tools choose a **unique lowercase `free_tag`** as their namespace in the shared file

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
| 4 | `free_tag` | Per-tool-family tag; used as the primary XML filter |
| 5 | `version` | Tool version the row belongs to |
| 6 | `path` | Path to the model data, a directory or a specific file |

### `value` (column 0)

Must be **globally unique** across every row in `huggingface.loc`,
regardless of which tool added it.  Recommended pattern:

```
<free_tag>_<version>_<slug>
```

Examples: `flux_1_dev`, `embedding_1.0_bge-small-en`,
`mytool_2.1_base-model`.

### `pipeline_tag` (column 2)

Use the **official HuggingFace pipeline tag** whenever one exists — browse
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

A short, tool-family-specific identifier used as the primary filter in the
tool XML.  Currently registered public values:

| Value | Tool |
|-------|------|
| `flux` | Flux image-generation tool |

When adding a new HF-backed tool, choose a unique lowercase `free_tag` and
add it to this table when the tool is ready to be documented publicly.

### `version` (column 5)

A version string used to filter rows in the tool XML.  Rows are only added
to the table, never removed or edited, new tool versions get new rows with
a different version value, while old rows stay in place.

### `path` (column 6)

The path to the model data on the server. It can be a directory (when the
tool reads the whole HuggingFace cache layout) or a specific file (e.g. a
`.ckpt` checkpoint when the tool only needs that one file).

## XML filter convention

It is recommended that tool XML filters by at least
`free_tag` (column 4) and `version` (column 5), so rows belonging to other
tools do not appear in the select:

```xml
<param name="model" type="select" label="Model">
    <options from_data_table="huggingface">
        <filter type="static_value" column="4" value="<free_tag>"/>
        <filter type="static_value" column="5" value="<version>"/>
        <!-- optional: also filter by pipeline_tag or domain -->
    </options>
</param>
```

Example from the Flux tool:

```xml
<options from_data_table="huggingface">
    <filter type="static_value" column="4" value="flux"/>
    <filter type="static_value" column="5" value="1"/>
</options>
```

## Complete example rows

Each row in the `.loc` file is **TAB-separated** (7 fields). The comments show
the column order.  The concrete example below reflects a published Flux entry;
future adopters should follow the same 7-column pattern.

```
# Columns: value <TAB> name <TAB> pipeline_tag <TAB> domain <TAB> free_tag <TAB> version <TAB> path
#
# Flux
black-forest-labs/FLUX.1-dev	FLUX.1 [dev]	text-to-image	image	flux	1	/data/hf_models
```
