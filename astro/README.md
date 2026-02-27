# Galaxy Community Hub — Astro Site

The Astro-based Galaxy Community Hub at [galaxyproject.org](https://galaxyproject.org). Content lives in `/content/` at the repo root and is preprocessed into `src/content/` (gitignored) during build.

## Development

```bash
cd astro
npm install
npm run dev          # http://localhost:4321
```

The dev command preprocesses content, generates redirects and search index, then starts the dev server with hot reload.

## Building

```bash
npm run build        # full production build
npm run preview      # serve the built site locally
```

## Code Quality

```bash
npm run lint && npm run format:check   # check
npm run lint:fix && npm run format     # fix
npm run content:lint                   # check content normalization
```

## Testing

```bash
npm run test              # Playwright E2E (starts dev server automatically)
npm run test:ui           # Playwright with interactive UI
npm run test:unit         # Vitest unit tests
npm run test:unit:watch   # Vitest in watch mode
```

## Content and MDX

Content files are plain markdown by default. Files that use interactive components (like `<Icon>`, `<VegaEmbed>`, `<Twitter>`, etc.) must opt in to MDX processing by adding `components: true` to their frontmatter:

```yaml
---
title: My Page
components: true
---
```

Without this flag, component tags will not be rendered. The `npm run content:lint` command (also part of `--check` mode in normalize-content) will flag files where the flag is out of sync with actual component usage.

### Available components

Icon, VegaEmbed, Twitter, Mastodon, VideoPlayer, Carousel, Flickr, Supporters, Contacts, MarkdownEmbed, CalendarEmbed, Insert.

### MDX compatibility

Since MDX files are parsed as JSX, a few things that work in plain markdown will break in MDX:

- **HTML comments**: Use `{/* comment */}` instead of `<!-- comment -->`
- **Bare `<>`**: Use `&lt;&gt;` instead
- **Angle brackets before numbers/dashes**: e.g. `<500` or `<---` need escaping

These only matter in files with `components: true`. Plain markdown files are unaffected.

## Build Pipeline

Content preprocessing (`src/build/preprocess.mjs`) reads from `/content/` and writes to `src/content/`:

1. Files are sorted into collections (articles, events, news, platforms, bare-articles, inserts)
2. Legacy syntax is converted (kramdown attributes, old Gridsome tags)
3. Slugs are normalized (camelCase split, underscore→hyphen, lowercase)
4. Images are copied to `public/images/{slug}/` and paths rewritten
5. Files with `components: true` become `.mdx`; everything else stays `.md`

## Project Structure

```
astro/
├── src/
│   ├── build/          # Preprocessing, normalization, search index
│   ├── components/     # Vue 3 and Astro components
│   │   └── mdx/        # Components available in MDX content
│   ├── layouts/        # Page layouts
│   ├── pages/          # File-based routing
│   ├── styles/         # Global CSS (Tailwind 4)
│   └── content.config.ts
├── public/             # Static assets (images copied here during build)
└── tests/              # Playwright E2E tests
```
