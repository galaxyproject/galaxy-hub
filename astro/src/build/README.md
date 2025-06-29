# Astro Build System

This directory contains the build scripts adapted from the original Gridsome preprocessing system.

## Scripts

### astro-preprocess.mjs
Main preprocessing script that:
- Scans the `/content` directory
- Determines which content collection each file belongs to
- Detects Vue component usage
- Converts Gridsome-specific syntax to Astro
- Copies files to appropriate Astro content collections

### Usage

```bash
# Run preprocessing (clears existing collections)
node src/build/astro-preprocess.mjs

# Run with verbose output
node src/build/astro-preprocess.mjs --verbose

# Run without clearing existing collections
node src/build/astro-preprocess.mjs --no-clear
```

## Content Collection Mapping

| Original Location | Condition | Astro Collection |
|------------------|-----------|------------------|
| `*/index.md` | Has Vue components | `vue-articles` |
| `*/index.md` | No Vue components | `articles` |
| `*/*.md` (non-index) | - | `inserts` |
| `use/*/index.md` | - | `platforms` |
| `bare/*/index.md` | - | `bare-articles` |
| `*.yml`, `*.yaml` | - | `datasets` |

## Vue Component Detection

Files are placed in `vue-articles` if they:
1. Have `components: true` in frontmatter
2. Contain any of these components:
   - `<slot>`
   - `<g-image>`, `<g-link>`
   - `<link-box>`
   - `<vega-embed>`
   - `<calendar-embed>`
   - `<markdown-embed>`
   - `<twitter>`
   - `<video-player>`
   - `<carousel>`

## Gridsome to Astro Conversions

- `<g-link>` → `<a>`
- `<g-image>` → `<img>`
- GraphQL queries → Removed (handled by Astro)
- Path references → Updated for Astro routing