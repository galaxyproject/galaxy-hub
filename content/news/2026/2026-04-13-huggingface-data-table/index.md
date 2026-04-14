---
title: "The huggingface Galaxy data table: schema and ontology"
date: "2026-04-13"
tease: "Galaxy is standardizing a shared data table for pre-downloaded HuggingFace models. This post is the canonical reference for the 7-column schema, controlled vocabularies, and conventions."
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
the Galaxy community is standardizing a **shared Galaxy data table** named
`huggingface`.  This post is the **canonical reference** for that schema.

**Key points:**

- The table has **7 columns**: `value`, `name`, `pipeline_tag`, `domain`, `free_tag`, `version`, `path`
- Every tool must **filter by `free_tag` + `version`** so different tools' rows never interfere
- `path` is **always a directory** — a tool derives full file paths inside its command block
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
| 6 | `path` | Root directory of the model data (never a file path) |

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
`automatic-speech-recognition`, not `asr`).  If you genuinely need a custom
tag because no official HuggingFace pipeline tag exists, document it here
before using it.

### `domain` (column 3)

Coarse data-domain vocabulary defined by the Galaxy community.  Use one of:

`image` · `text` · `audio` · `tabular` · `sequence` · `video` · `multimodal`

If a tool needs a narrower or tool-specific value, document that exception
here before adding rows.  The default expectation is that `domain` uses the
closed vocabulary above.

### `free_tag` (column 4)

A short, tool-family-specific identifier used as the primary filter in the
tool XML.  Currently registered public values:

| Value | Tool |
|-------|------|
| `flux` | Flux image-generation tool |

When adding a new HF-backed tool, choose a unique lowercase `free_tag` and
add it to this table when the tool is ready to be documented publicly.

### `version` (column 5)

The tool version the row is valid for.  Should match the `@TOOL_VERSION@`
macro in the consuming tool XML so that the version filter works
automatically.

### `path` (column 6)

**Always a directory — never a file.**  It points at the root folder that
contains the HuggingFace cache layout understood by the tool, for example:

```
/data/hf_models/
└── hub/
    ├── models--black-forest-labs--FLUX.1-dev/
    └── models--sentence-transformers--all-MiniLM-L6-v2/
```

If a tool needs a specific file (e.g. a `.ckpt` checkpoint), it derives the
path from `$row.path` inside the command block — the `.loc` entry itself
never points directly at a file.

## XML filter convention

Every tool XML that reads from this table **must** filter by at least
`free_tag` (column 4) and `version` (column 5), so rows belonging to other
tools do not appear in the select:

```xml
<param name="model" type="select" label="Model">
    <options from_data_table="huggingface">
        <filter type="static_value" column="4" value="<free_tag>"/>
        <filter type="static_value" column="5" value="@TOOL_VERSION@"/>
        <!-- optional: also filter by pipeline_tag or domain -->
    </options>
</param>
```

Canonical example from the Flux tool:

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

## Checklist for tool authors adding HF-backed models

1. **Choose a `free_tag`** — unique lowercase slug. Add it to the table above (via a PR to this post or to the sample file).
2. **Pick `pipeline_tag`** — use an official HF tag if one exists; document any custom tag.
3. **Pick `domain`** — use the closed vocabulary above; document deviations.
4. **Write `tool-data/huggingface.loc.sample`** — include commented example rows with a header linking to this post.
5. **Write `tool_data_table_conf.xml.sample`** — copy the standard block verbatim.
6. **Add XML filters** — filter by `free_tag` + `version` at minimum.
7. **`path` is always a directory** — never point at a file; derive file paths in the command block.
8. **Test cross-tool isolation** — concatenate your sample with another tool's sample into one `.loc` file and confirm your select shows only your rows.

## For Galaxy administrators

The production `.loc` file (at `/opt/galaxy/tool-data/huggingface.loc` on
UseGalaxy.eu) is a single flat file that may contain rows from many tools.
When adding entries:

- Copy the relevant rows from the tool's `huggingface.loc.sample` file.
- Replace the example `path` values with the actual directories on your server.
- Rows from different tools coexist safely because every tool XML filters by `free_tag`.
- You do **not** need to restart Galaxy after editing the `.loc` file — Galaxy
  reloads data tables on the next job submission.

## Contributing

If you are adding a new HuggingFace-backed tool, open a pull request that includes:

- `tool-data/huggingface.loc.sample` with correctly formatted example rows
- `tool_data_table_conf.xml.sample` using the standard `huggingface` table block
- An update to the `free_tag` table in this post when the tool is ready to be documented publicly
