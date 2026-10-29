# Design System: Galaxy Community Hub

> **Base design system:** the Galaxy brand palette, color roles, and typography
> now live in the canonical base design system at
> [galaxyproject/galaxy-brand-tokens `DESIGN.md`](https://github.com/galaxyproject/galaxy-brand-tokens/blob/main/DESIGN.md),
> shipped as `@galaxyproject/brand-tokens`. This document covers only what's
> specific to the Hub (component stylings, layout, animation, the OKLch UI-primitive
> layer, SIG/WG category colors, responsive behavior).
>
> **Source of truth for Hub design:** this file plus galaxy-ui
> ([`galaxyproject/galaxy` `client/packages/ui`](https://github.com/galaxyproject/galaxy/tree/dev/client/packages/ui),
> its `tokens.css`). The Hub aligns colour values and role names with galaxy-ui; it does
> not import galaxy-ui (a private workspace package of raw Vue SFCs). See §10.

## 1. Visual Theme & Atmosphere

The Galaxy Community Hub is the public face of a research platform used by hundreds of thousands of scientists worldwide. The design communicates scientific credibility, openness, and accessibility -- professional without being cold, structured without being sterile. The overall impression is one of depth and contrast: dark mastheads and sidebars (`#2c3143`) frame light content areas (`#edf4fa`) where white cards surface information cleanly. A signature gold accent (`#ffd700`) ties the visual identity together, appearing sparingly on CTAs, active states, and border accents.

The typography is built entirely on Atkinson Hyperlegible -- a font designed specifically for readability and accessibility -- at weights 400 and 700 with a system sans-serif fallback stack. This is not a decorative font choice; it's a deliberate accessibility decision for a platform that serves researchers across disciplines and ability levels.

The Hub is part of a broader Galaxy ecosystem that includes IWC (Intergalactic Workflow Commission), GTN (Galaxy Training Network), and the usegalaxy.org servers. All share the same brand palette, gold accent patterns, dark/light contrast model, and card-based layouts. A researcher browsing workflows on IWC, reading news on the Hub, and taking a GTN tutorial should feel like they're navigating one cohesive platform.

IWC is the closest sibling site in design terms and has its own [DESIGN.md](https://github.com/galaxyproject/iwc/blob/main/website/DESIGN.md) in the `galaxyproject/iwc` repository. Read the two docs together, and look at how IWC builds a pattern that appears on both sites (cards, tabs, hover accent bars, section backgrounds) before writing new code. **Precedence:** where they disagree, this file and galaxy-ui win; IWC is a reference, not the rule. §2 documents the shared Pantone-style color aliases so cross-property code can be written interchangeably.

**Dark mode:** colours are semantic roles with a light value in `:root` and a dark value in `.dark` (`global.css`, §2). The theme switch will set `.dark` on `<html>`; it ships after the redesign, so nothing sets the class yet and the site renders light. Never hardcode a colour that has no dark value: use a role, or add the role with both values.

The technical substrate is Astro with Tailwind CSS 4, Vue 3 components hydrated client-side via Reka UI primitives, and class-variance-authority for component variants. Content is Markdown/MDX preprocessed from a shared `/content/` directory, with Bootstrap compatibility classes scoped under `.bs-compat` for legacy content.

**Key Characteristics:**
- Light theme today, dark-ready: every role has a light and a dark value; dark structural elements (sidebar, headers) frame light content backgrounds
- Atkinson Hyperlegible at 400/700 -- accessibility-first typography
- Galaxy brand palette for brand-facing surfaces, OKLch semantic tokens for generic UI internals (see §2)
- Gold (`#ffd700`) as the sole accent color, reserved for high-impact moments
- Card-based layouts with `rounded-lg` borders and `shadow-sm` elevation
- 24px grid pattern overlays on dark backgrounds for subtle scientific/technical texture
- Gradient mastheads (`galaxy-dark → galaxy-primary` at 135°) with gold bottom borders
- Lucide icons for UI chrome; FontAwesome in legacy content is converted to Lucide SVGs during preprocessing
- Bootstrap 4 compatibility layer scoped under `.bs-compat` for ~125 legacy content files

---

## 2. Color Palette & Roles

### Semantic roles (light/dark)

New page code uses **role tokens**: they name what a colour is for, carry a light and a dark value, and resolve to brand values. Defined in `global.css` as `--gx-<role>` in `:root` (light) and `.dark` (dark), exposed to Tailwind through `@theme inline` as `--color-<role>`, so `text-fg-meta`, `bg-surface-tint`, `border-line` and `decoration-link-hover-line` all work. Ratios are WCAG 2.1 against the page (`#ffffff` light, `#121419` dark) unless noted; a unit test (`src/styles/global.test.ts`) fails when a role lacks its dark value.

| Role | Utility | Light | Dark | Contrast (light / dark) |
|------|---------|-------|------|-------------------------|
| Body text | `text-fg` | `#3c3c3d` chicago-900 | `#d5d8df` | 11.02 / 12.91 |
| Headings | `text-fg-strong` | `#2c3143` galaxy-dark | `#f0f1f4` | 12.90 / 16.31 |
| Lead, secondary | `text-fg-2` | `#4f4e50` chicago-700 | `#c0c4cc` | 8.27 / 10.54 |
| Meta: dates, bylines, counts | `text-fg-meta` | `#58585a` galaxy-grey | `#a3a8b4` | 7.10 / 7.74 |
| Faint: decoration only, never text | `text-fg-faint` | `#878789` | `#737a8c` | 3.59 / 4.29 |
| Brand text: tags, type badges | `text-fg-brand` | `#1f4465` | `#bfdaf4` | 9.13 / 10.74 on `surface-tint` |
| Link | `text-link`, `decoration-link-line` | `#25537b` galaxy-primary | `#8cbbe9` | 8.07 / 9.12 |
| Link hover | `text-link-hover`, `decoration-link-hover-line` | `#1f4465`, gold-600 `#d19e00` underline | `#bfdaf4`, gold underline | 10.13 / 12.77 |
| Page, surface | `bg-page`, `bg-surface` | `#ffffff` | `#121419` | Today the content area is still `bg-light-bg` `#edf4fa` under white cards (§6); the flat white page of the redesign comes with the shell changes and will use `bg-page`. |
| Surface 2: row hover, panels | `bg-surface-2` | `#f6f9fc` | `#171a21` | |
| Raised: cards, inputs | `bg-surface-raised` | `#ffffff` | `#1b1e27` | |
| Overlay: menus, popovers | `bg-surface-overlay` | `#ffffff` | `#232734` | |
| Tint: tags, callouts, table heads | `bg-surface-tint` | `#edf4fa` light-bg | `#172536` | link on tint 7.27 / 7.68 |
| Sunken: inline code, counts | `bg-surface-sunken` | `#f5f5f6` chicago-50 | `#22262f` | meta on sunken 6.51 / 6.36 |
| Lines | `border-line`, `-line-brand`, `-line-strong` | chicago-100; primary at 16% / 34% | `#2a2e38`; `#8cbbe9` at 16% / 38% | decorative |
| Input border | `border-line-input` | `#878789` | `#737a8c` | 3.59 / 4.29 (3:1 for controls) |
| Focus | `outline-focus`, `outline-focus-on-chrome` | `#25537b`; gold on chrome | `#8cbbe9`; gold | 8.07 / 9.12 |
| Brand fill | `bg-brand`, `text-on-brand` | `#25537b`, white | `#2b5f8e`, white | 8.07 / 6.71 |
| Selected: pressed chip, current item | `bg-selected`, `text-on-selected` | `#25537b`, white | `#8cbbe9`, `#10131a` | 8.07 / 9.20 |
| Gold accent: CTAs, active marks | `bg-accent-gold`, `bg-accent-gold-hover`, `text-on-accent-gold` | `#ffd700`, hover `#d19e00`, galaxy-dark text | `#ffd700`, hover `#ffe24d` | 9.20 both |
| Chrome: sidebar, footer | `bg-chrome`, `text-chrome-fg`, `-chrome-fg-2`, `-chrome-meta`, `border-chrome-line`, `bg-chrome-field` | `#2c3143`, `#dfe2ea`, `#d3d6e2`, `#bbc0d2` | `#1c2030`, `#d7dae3`, `#c7cad6`, `#a9aec0` | nav 9.96 / 11.57; meta 7.12 / 7.32 |
| Status ok / past | `text-ok-fg` `bg-ok-bg` `border-ok-line`; `-past-*` | `#006b15` on `#eef7ef`; `#4f4e50` on `#f5f5f6` | `#74d08e` on `#12291a`; `#c0c4cc` on `#22262f` | 6.16 / 8.22; 7.59 / 8.66 |
| Status info / warn / danger | `text-info-fg` `bg-info-bg`; `warn-*`; `danger-*` | galaxy-ui 600-700 text on 100 bg | light text on dark tint | 7.58 / 8.57; 6.68 / 12.43; 8.59 / 7.02 |

Rules:

- Brand aliases (`galaxy-*`, `light-bg`, hex) appear only inside role definitions and brand moments (hero gradients, the gold bar). Existing page code moves to roles as it is touched.
- Gold is never text on a light surface (1.40:1 on white). Links hover to `link-hover` with a gold underline.
- Meta text is `text-fg-meta`, never an opacity-faded grey (`text-galaxy-grey/70` is about 3.45:1 and fails AA).
- The gold role is `--color-accent-gold` (`bg-accent-gold`, `text-on-accent-gold`), not `accent`: `accent` is the shadcn near-white below, and `@galaxyproject/brand-tokens` also defines a gold `--color-accent` that the shadcn mapping overrides.
- Role names avoid the shadcn names (`background`, `foreground`, `primary`, `muted`, `accent`, `border`, `input`, `ring`, `sidebar-*`, ...) and never reuse galaxy-ui primitive names such as `--color-blue-600`, which would collide with Tailwind's own `blue` scale.
- Primitives (Button, Badge, Input) may consume **role** tokens, never brand aliases. That is the single-palette direction below, without a parallel branded button.

### Brand tokens and the OKLch layer

Under the roles, the Hub still runs two parallel color systems. **Don't mix them.**

- **Galaxy brand tokens** (`galaxy-*`, `light-bg`, `medium-bg`, etc.) are for brand-facing surfaces: hero sections, page headers, cards, prose content, navigation. The palette contract is defined in the [base design system](https://github.com/galaxyproject/galaxy-brand-tokens/blob/main/DESIGN.md).
- **OKLch semantic tokens** (`primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, etc.) power the generic UI component layer (Reka UI / shadcn-style components -- Input, Select, Sheet, Accordion, Tabs). These resolve to near-achromatic values, *not* Galaxy blues. `bg-primary` is near-black; it is **not** `galaxy-primary`.

When composing a new Galaxy page, use the role tokens above (brand tokens only for brand moments). When dropping in a form input or a modal, the generic components already use the OKLch tokens -- leave them alone.

#### OKLch Semantic Tokens (Transitional)

Generic UI primitives (Input, Select, Sheet, Accordion, Tabs -- the shadcn/Reka-scaffolded components) use a second set of tokens inherited from shadcn: `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`. These resolve to achromatic (near-grayscale) values in light mode:

| Role | Light mode value | Where it shows up |
|------|-----------------|-------------------|
| `primary` | `oklch(0.205 0 0)` (near-black) | Default Button variant, shadcn-style chrome |
| `secondary` / `muted` / `accent` | `oklch(0.97 0 0)` (near-white) | Subtle backgrounds on generic components |
| `destructive` | `oklch(0.577 0.245 27.325)` (red) | Destructive buttons, error states |
| `border` / `input` | `oklch(0.922 0 0)` (light gray) | Input borders, separators |

If a Galaxy page is reaching for `bg-primary` expecting Galaxy blue, that's a bug -- use `bg-galaxy-primary` instead.

**Note:** IWC doesn't maintain this second system -- it uses brand tokens throughout. The OKLch layer exists on the Hub because our UI primitives were scaffolded from shadcn and we haven't fully migrated them. The long-term direction is IWC's: a single brand palette (with full scales) that both brand-facing pages and UI primitives can share. Until then, treat OKLch as what the generic components already use -- don't propagate it into new Galaxy page code.

### SIG/WG Category Colors

Special Interest Groups and Working Groups use dedicated category colors. Applied as `bg-*` classes with white text. These sit outside the main brand palette -- they're a categorical encoding, not part of the design language.

| Category | Hex | Class |
|----------|-----|-------|
| SIG: Field | `#006b15` (dark green) | `.bg-sig-field` |
| SIG: Method | `#630177` (purple) | `.bg-sig-method` |
| SIG: Service | `#77072f` (maroon) | `.bg-sig-service` |
| SIG: Region | `#cc4d00` (orange) | `.bg-sig-region` |
| SIG: Projects | `#150276` (navy) | `.bg-sig-projects` |
| WG: Primary | `#6286a6` (slate blue) | `.bg-wg-primary` |
| WG: GOATS | `#61ad90` (teal) | `.bg-wg-goats` |
| WG: Applied | `#8886b3` (lavender) | `.bg-wg-applied` |
| WG: All | `#d87e55` (terracotta) | `.bg-wg-all` |

---

## 3. Typography Rules

Atkinson Hyperlegible is the canonical Galaxy brand typeface. The stack and accessibility rationale are detailed in the [base design system](https://github.com/galaxyproject/galaxy-brand-tokens/blob/main/DESIGN.md#5-typography).

### Hierarchy

A compact scale: 16px body text, headings close to it, so pages read densely without shouting. Each step is a type token (`--text-<step>` in `global.css`); the `text-<step>` utility sets size and line height, weight and colour come from separate classes.

| Role | Size / line height | Tailwind Classes | Usage |
|------|--------------------|-----------------|-------|
| Page Title (H1) | 30/36 (26 below `sm`) | `text-h1 font-bold tracking-tight text-fg-strong` | Page and article titles (`PageHeader`) |
| Section Header (H2) | 22/1.3 | `text-h2 font-bold text-fg-strong` | Major content sections |
| Card Title (H3) | 18/1.4 | `text-h3 font-semibold text-fg-strong` | Card headers, subsections |
| Subheading (H4) | 16/1.5 | `text-h4 font-semibold text-fg-strong` | Minor sections |
| Body | 16/1.6 | `text-body text-fg` | Paragraph text |
| Lead / intro | 18/28 | `text-lead text-fg-2` | Intro paragraph under a title (replaces Bootstrap `lead`) |
| Meta | 14/20 | `text-meta text-fg-meta` | Metadata, help text, timestamps (7.10:1; never opacity-faded) |
| Micro | 12/16 | `text-micro font-bold uppercase tracking-wider` | Overlines, group labels |
| Links | | `text-link hover:text-link-hover underline decoration-link-line hover:decoration-link-hover-line hover:decoration-2` | Interactive links in text: darker blue plus a gold underline on hover, never gold text on light |

On dark chrome (sidebar, footer, page header) gold hover text stays allowed: gold on galaxy-dark is 9.20:1.

The scale follows prototype A of the redesign. galaxy-ui's `GHeading` sizes (`h-xl` 1.7rem ... `h-sm` 1.0625rem on a 0.85rem app base) are an application scale; the Hub aligns role names, not sizes.

### Icons

Use **Lucide icons** (via `lucide-vue-next` and the Lucide SVG set) for all UI chrome -- navigation, controls, inline icons in buttons. The content preprocessor automatically converts legacy FontAwesome references in Markdown/MDX to inline Lucide SVGs, so don't introduce new FontAwesome usage.

### Prose Styling

Reading layouts (`ContentWithToc`, `PlatformLayout`) render Markdown with `prose prose-compact prose-galaxy`. See `.prose`, `prose-compact` and `.prose-galaxy` in `global.css`:

- **Scale**: `prose-compact` is a Tailwind utility that sets the §3 hierarchy on Typography: 16/1.6 body, h1-h4 from the type tokens, lead 18/28. Being a utility, it beats Typography's own sizes and still loses to a `text-*` class a content heading carries. Don't use `prose-lg` for content.
- **Measure**: the 72ch reading measure (`--measure`, `max-w-measure`) ships with the reading grid (sticky On this page rail), not before, so pages without a TOC do not get an empty right strip. Until then body text uses the full content width. When it lands, it caps running text only: tables, code, images, figures, embeds, tile grids and centred blocks keep the full column.
- **Bare embeds** (`BareArticleLayout`, iframed by usegalaxy.eu and .fr) use `prose prose-compact prose-galaxy`: the same 16px scale in their 1200px centred column.
- **Colours**: `.prose` maps links to `link` and headings to `fg-strong`; `prose-compact` also maps body to `fg`, bold to `fg-strong`, lead and quotes to `fg-2`, counters and captions to `fg-meta`.

```css
/* Heading and link colours come from roles */
--tw-prose-headings: var(--gx-fg-strong);
--tw-prose-links: var(--gx-link);

/* H2: subtle gold underline */
.prose h2 { border-bottom: 2px solid rgba(255, 215, 0, 0.2); padding-bottom: 0.5rem; }

/* Blockquotes: gold left border with gold-tinted background */
.prose blockquote {
  border-left: 4px solid #ffd700;
  background-color: rgba(255, 215, 0, 0.03);
  padding: 1rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

/* Tables: galaxy-primary header */
.prose th { background-color: #25537b; color: white; font-weight: 600; }

/* Links: underlined; hover = darker blue text + 2px gold-600 underline (gold text on white is 1.40:1) */
.prose a { text-decoration-color: var(--gx-link-line); }
.prose a:hover { color: var(--gx-link-hover); text-decoration-color: var(--gx-link-hover-line); text-decoration-thickness: 2px; }

/* Code blocks: dark background */
.prose pre { background-color: #1f2937; border-radius: 0.5rem; }
.prose code:not(pre code) { background-color: #f3f4f6; font-size: 0.875em; }

/* Images: rounded, centered */
.prose img { border-radius: 0.5rem; margin-left: auto; margin-right: auto; }
```

### Tables

Content tables are compact and stay inside the prose column. Rules (`global.css`, `build/rehype-scrollable-tables.mjs`):

- **Type and cells**: plain (unclassed) content tables use the `text-sm` scale, 14px on a 20px line, with `10px 12px` cell padding. The head keeps the galaxy-primary fill with white 600 text.
- **No early wrap**: at build time, cells of Markdown tables that hold only short inline text (24 characters or fewer: dates, numbers, short labels) get `whitespace-nowrap`. Long text cells still wrap, so the browser narrows the text columns instead of breaking a date over two lines. No fixed column widths.
- **Scroll fallback**: every content table sits in the focusable, labelled `.table-wrapper` region, which scrolls sideways when the table is still wider than the column. Tables never break out of the content column; the future text measure will not apply to them.
- **Left alone**: raw HTML tables keep default wrapping; tables that bring a class (legacy `.bs-compat`, the bare `EventsTable` / `NewsTable` components) keep their own type and padding. In print, short cells wrap again, since paper cannot scroll.

**galaxy-ui parity**: prose tables are the hub's counterpart of `GTable` with `compact` (`g-table-compact`). Same intent, different values: `GTable` cells are `0.75rem` and compact cells `0.3rem`; prose tables use `10px 12px` so running text in cells stays readable. The hub head mirrors `headVariant="dark"` (`g-header-dark`), not the light default.

---

## 4. Component Stylings

### Page Header

Appears on all content pages -- gradient background with grid overlay and gold accent bar. **Use the `<PageHeader>` Astro component** (`astro/src/components/layout/PageHeader.astro`) rather than reimplementing this; it supports optional date, authors, and tags.

The structure it produces (shown for reference):

```html
<header class="relative p-10 rounded-t-lg text-white"
        style="background: linear-gradient(135deg, var(--color-galaxy-dark) 0%, var(--color-galaxy-primary) 100%);
               border-bottom: 4px solid var(--color-galaxy-gold);">
  <!-- ::before pseudo: 24px grid, white 3% opacity -->
  <div class="flex items-center gap-3 mb-4">
    <div class="w-1 h-8 bg-galaxy-gold"></div>  <!-- Gold accent bar -->
    <h1 class="text-h1 font-bold tracking-tight">Title</h1>
  </div>
  <p class="text-white/80 text-lg max-w-2xl">Description</p>
</header>
```

### Cards

```html
<!-- Standard card (on light backgrounds) -->
<div class="bg-white border border-galaxy-primary/10 rounded-lg shadow-sm p-6">

<!-- Gold-accent card (featured content on light backgrounds) -->
<div class="bg-white border-l-4 border-l-galaxy-gold rounded-lg shadow-sm p-6">

<!-- Card on dark background (hero sections) -- no gold border needed -->
<div class="bg-white rounded-lg shadow-md p-6">
```

When placing prose inside cards, trim default margins:

```html
<div class="prose [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
  <!-- markdown content -->
</div>
```

### Tile Grid / Content Cards

The `gx-tile` system is the content-authored counterpart to the card pattern above -- reusable CSS classes (defined in `global.css`) for cards written in Markdown/MDX content, used across the conference pages. Reach for these when authoring content; use the Tailwind utilities above when building Astro/Vue components.

> **Why `tile`, not `card`:** the content preprocessor marks any class attribute containing the token `card` (or `alert`, `lead`, `table`) as legacy `.bs-compat`. The `gx-` names sidestep that, so new content stays out of the compat layer.

```html
<div class="gx-tile-grid">                              <!-- responsive grid: auto-fit, minmax(260px, 1fr) -->
  <a class="gx-tile gx-tile--link" href="/somewhere">   <!-- whole-tile link + gold hover bar -->
    <img class="gx-tile__media" src="..." alt="..." />  <!-- 160px cover image -->
    <div class="gx-tile__title">Title</div>             <!-- galaxy-dark, semibold -->
    <p class="gx-tile__teaser">A one- or two-line hook.</p>
    <span class="gx-tile__more">Learn more →</span>     <!-- galaxy-primary; link-hover + gold underline on hover -->
  </a>
</div>
```

Variants and elements:

- `gx-tile` -- base tile: white, `border-galaxy-primary/10`, `rounded-lg`, `shadow-sm`.
- `gx-tile--link` -- the whole tile is an `<a>`; adds the signature gold hover bar (left edge, `scaleX`) and lifts to `shadow-md`. The card text keeps its colours on hover; only `gx-tile__more` takes the link hover (darker blue, gold underline). Keep contents plain (no nested links/markdown).
- `gx-tile--feature` -- galaxy-primary left border for emphasized tiles.
- `gx-tile__media` (160px cover image), `gx-tile__title`, `gx-tile__body` (richer markdown bodies -- separate inner content with blank lines so Markdown renders), `gx-tile__teaser` (short plain text), `gx-tile__credit` (small chicago-500 caption, e.g. photo credits), `gx-tile__more` (link affordance).

### Callout / Note

Brand-tinted note box for asides and "good to know" content. Replaces Bootstrap `alert-*`. Intentionally blue (not gold), so gold stays reserved for high-impact moments.

```html
<div class="callout">
  Training on June 25-26 is separate from the main conference.
</div>
```

`.callout`: `bg-bay-of-many-100`, `border-l-4 border-l-galaxy-primary`, rounded right corners, galaxy-dark text.

### Profile Row

Photo + bio row for people (fellowship awardees, organizers, etc.). Photo left / bio right on desktop; stacks (photo on top) below 768px.

```html
<div class="profile-row">
  <img class="profile-row__photo" src="..." alt="Jane Doe" />
  <div class="profile-row__bio">

Jane Doe is ... (markdown bio)

  </div>
</div>
```

`.profile-row`: flex row, 200px photo column with a `rounded-lg` photo.

### Buttons

There are **two button paths**; pick based on context.

**Brand CTAs** (hero sections, landing pages, featured links) -- hand-styled:

```html
<!-- Primary gold CTA -->
<a class="bg-galaxy-gold text-galaxy-dark font-semibold px-6 py-3 rounded-lg
          hover:bg-galaxy-gold-dark transition-colors">
  Use Galaxy
</a>

<!-- Secondary outline CTA on dark background -->
<a class="border-2 border-white/30 text-white px-6 py-3 rounded-lg
          hover:bg-white/10 transition-colors">
  Learn More
</a>
```

**Generic UI buttons** (forms, toolbars, confirm/cancel dialogs) -- use the `<Button>` component from `@/components/ui/button` which applies CVA variants against the OKLch palette (not the Galaxy palette). Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`. Sizes: `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`.

Don't wrap the `<Button>` component in overrides to try to make it Galaxy-branded -- reach for the hand-styled CTA pattern instead.

### Badges / Tags

```html
<!-- Outline tag (default for content tags) -->
<span class="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium
             border border-galaxy-primary/30 text-galaxy-dark">
  bioinformatics
</span>

<!-- Tag on dark background -->
<span class="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium
             border border-white/30 text-white hover:border-galaxy-gold
             hover:bg-galaxy-gold/20 transition-colors">
  bioinformatics
</span>

<!-- Filled count badge -->
<span class="bg-galaxy-gold/15 text-galaxy-dark px-2 py-0.5 rounded text-xs font-medium">
  42
</span>
```

The `<Badge>` component (`@/components/ui/badge`) is available with `default`, `secondary`, `destructive`, `outline` variants, but for Galaxy content tags the hand-styled patterns above are preferred.

### Event Date

Event dates in lists render as one inline line: a 16 px calendar icon, the date range in bold, and a duration pill ("2 days") for multi-day events only. The line sits in the row's meta area under the title, next to the location. There is no calendar block.

```astro
<EventDate start={event.data.date} end={event.data.end} />
<EventDate start={event.data.date} end={event.data.end} past />  <!-- muted past rows -->
<EventDate start={event.data.date} end={event.data.end} format={{ year: false }} />
```

- One component: `components/events/EventDate.astro` for server markup, `EventDate.vue` for Vue islands. Both read their text from `eventDateParts()` in `utils/dateUtils.ts` and share `event-date.css` (plain CSS with token fallbacks, so the bare iframe feeds without `global.css` get it too).
- Markup: `<time datetime="YYYY-MM-DD">` for the start and, for ranges, the end; the duration is plain text so screen readers read "2 days"; the icon is `aria-hidden`.
- Colours: range `galaxy-dark` (12.9:1 on white), past `chicago-600` (7.1:1 on white, 5.5:1 on `ebony-clay-50`), pill `bay-of-many-950` on `bay-of-many-100` with a `bay-of-many-200` border (9.1:1).
- Date tables (bare `EventsTable`) and event page headers keep their own formats.

### Forms

Reka UI / shadcn-style components are available for:

- **Input** (`@/components/ui/input`) -- text inputs
- **Select** (`@/components/ui/select`) -- dropdown selects
- **Sheet** (`@/components/ui/sheet`) -- slide-out drawer (used by mobile menu)
- **Accordion**, **Collapsible** (`@/components/ui/*`) -- expandable sections
- **Tabs** (`@/components/ui/tabs`) -- tabbed navigation
- **Card**, **CardHeader**, **CardContent**, etc. (`@/components/ui/card`) -- structured card layout

These use the OKLch semantic tokens, which read as neutral on Galaxy backgrounds. Don't restyle their internals with Galaxy brand colors -- they're deliberately chromatic-neutral so they compose anywhere.

### Filters

Listing pages (news, events, citations, platforms, search) filter in place and keep the filter state in the URL, so a filtered view can be shared, bookmarked and restored with back/forward.

- **Component**: `FilterBar` (`@/components/filters/FilterBar.vue`) composes `YearFilter` (year chips plus an "Older years" select), a labelled text search (`ui/input`), an optional tag/type select (`ui/select`), a "Clear filters" button (`ui/button`, shown only while a filter is active) and the result count. The list component owns the state and passes it in with `v-model:q`, `v-model:year` and `v-model:tag`; the bar stays presentational. Adopted by news; events, citations, platforms and search move to it next.
- **Year chips**: the first chip is "All years" (no year filter, newest first), then the five most recent years with counts, then older years in the select. Chips are `<button aria-pressed>` inside `role="group"` with an `aria-label`, `rounded-md` like other controls, at least 32px tall.
- **URL sync**: use `@/utils/urlFilters` (`readParams`, `writeParams`, `onPopState`), never `history.replaceState` by hand. It keeps `history.state` (Astro's ClientRouter stores its navigation index there) and the hash, drops empty and default values and writes params in a stable order; `onPopState` only calls back while the URL is still on the page that subscribed. Read params in `onMounted`, not during setup: the server render has no query string and hydration must match it.
- **Param names**: `q` (text), `year`, `tag`, `region`, `type`, `status`, `sort`, `view`. Write them in that order. Pagination ("Load more") stays out of the URL. Keep accepting legacy names and values a page already supports (for example the singular `platform_group` slugs).
- **Text search**: debounce the model and URL update (~250ms); the input itself updates at once. Match every word of the query against the title and summary, case-insensitive.

Accessibility (WCAG 2.1 AA):

- Every control has a visible `<label>` (or `aria-labelledby`); the chip group and the bar have an `aria-label`.
- The result count is one `aria-live="polite"` `aria-atomic="true"` line that is always in the DOM and says what is applied, e.g. "37 articles in 2024 tagged “training”".
- Focus is a solid 2px `galaxy-primary` outline with a 2px offset (`focus-visible:outline-2 outline-offset-2 outline-solid outline-galaxy-primary`, plus `ring-0` on the primitives). The primitives' default 50% ring is below 3:1 on white, and box-shadow rings disappear in forced-colors mode while outlines stay. Input and select borders use `chicago-400` (3:1 on white).
- The focus and border classes are overrides in `FilterBar` and `YearFilter`, interim until a focus-rule PR moves them into the primitives (the `focus` and `line-input` role tokens exist, §2; the primitives do not use them yet). The "Clear filters" button keeps the `ui/button` `outline` variant and its neutral OKLch tokens; only its focus outline is overridden.
- Targets are at least 24×24px (WCAG 2.2 SC 2.5.8, best practice beyond the 2.1 AA baseline; chips 32px, inputs and selects 40px). Everything works with the keyboard: Tab between controls, Space/Enter on chips, arrow keys in the selects.
- After "Clear filters", focus moves to the search input because the button disappears.
- At 390px the bar stacks (chips wrap, then search, tag, clear, count) with no horizontal scroll. A bottom sheet (see Mobile Bottom Sheet) is for pages with more filters than fit.

### Interactive Hover (Gold Bar Animation)

Signature pattern shared with IWC -- gold bar animates in from the left on hover:

```html
<div class="group relative">
  <div class="absolute left-0 top-0 bottom-0 w-1 bg-galaxy-gold
              transform origin-left scale-x-0 group-hover:scale-x-100
              transition-transform duration-200"></div>
  <!-- content -->
</div>
```

### View Toggle (Sliding Pill)

Pattern from IWC for binary view switching (list ↔ grid, table ↔ cards). A container holds two buttons with a single sliding pill background that animates horizontally:

```html
<div class="relative inline-flex rounded-lg bg-galaxy-dark/10 p-1">
  <!-- Sliding pill indicator -->
  <div class="absolute top-1 bottom-1 w-[calc(50%-2px)] rounded-md
              bg-galaxy-gold shadow-md transition-all duration-300 ease-out"
       :class="isGrid ? 'left-[calc(50%+1px)]' : 'left-1'"></div>

  <button class="relative z-10 inline-flex items-center gap-1.5 rounded-md
                 px-3.5 py-1.5 text-sm font-medium transition-colors duration-300"
          :class="!isGrid ? 'text-galaxy-dark' : 'text-galaxy-grey hover:text-galaxy-dark'">
    <List :size="16" /> <span>List</span>
  </button>
  <!-- Grid button mirrors above -->
</div>
```

The active icon also gets a subtle `scale-110` while the inactive stays at `scale-100`. Reference: [`ViewToggle.vue`](https://github.com/galaxyproject/iwc/blob/main/website/src/components/ViewToggle.vue) in the IWC repo.

### Mobile Bottom Sheet

For mobile-only overflow (filter panels, settings, secondary navigation), prefer a **bottom sheet** over a side drawer. The pattern feels more native on touch devices. Uses Reka UI's Dialog primitive:

```html
<DialogContent class="fixed bottom-0 left-0 right-0 z-50 bg-white
                     rounded-t-2xl shadow-lg max-h-[70vh] overflow-hidden">
  <!-- Handle bar (visual affordance for dragging) -->
  <div class="flex justify-center pt-3 pb-1">
    <div class="w-10 h-1 bg-galaxy-grey/40 rounded-full"></div>
  </div>
  <!-- sheet content -->
</DialogContent>
```

Key traits: `rounded-t-2xl` (only top corners), max-height so content scrolls, a visible "handle" bar for mobile UX. Reference: [`MobileFilterSheet.vue`](https://github.com/galaxyproject/iwc/blob/main/website/src/components/MobileFilterSheet.vue) in the IWC repo.

### Heading Anchors

Anchor links appear on hover and follow the link hover rule:

```css
.heading-anchor { opacity: 0; color: var(--gx-link); transition: opacity 0.15s; }
.heading-anchor:hover { color: var(--gx-link-hover); text-decoration: underline var(--gx-link-hover-line) 2px; }
h2:hover .heading-anchor { opacity: 1; }
/* Touch devices: always visible at 50% */
@media (hover: none) { .heading-anchor { opacity: 0.5; } }
```

### Linkbox

Float-right content sidebar used in articles:

```css
.linkbox {
  float: right; width: 200px; margin: 0 0 1rem 1.5rem;
  padding: 1rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.5rem;
}
@media (max-width: 768px) { .linkbox { float: none; width: 100%; } }
```

### List Row Alternation

For long lists (events, news, workflows), use a subtle odd-row tint to create visual rhythm:

```html
<li class="odd:bg-galaxy-primary/5 hover:bg-galaxy-gold/5 transition-colors">
  <!-- row content -->
</li>
```

IWC uses `odd:bg-bay-of-many-50/30` on workflow list items. The effect should be barely perceptible -- users shouldn't notice the stripes, just feel the structure. Don't pair this with heavy borders.

### Bootstrap Compatibility

Legacy content files (~125 Markdown files) use Bootstrap 4 classes (`btn-primary`, `card-deck`, `alert`, etc.). The preprocess step automatically adds a `.bs-compat` wrapper class to any file containing these patterns. Bootstrap CSS is scoped under `.bs-compat` in `astro/src/styles/bootstrap-compat.css` so it doesn't leak into modern components.

**Contract**: never apply `.bs-compat` manually to new components, and never introduce new Bootstrap classes in new content. The compat layer is a migration affordance, not a sanctioned styling path.

---

## 4b. Animation & Motion

Motion on the Hub is quiet and purposeful. Three patterns cover most cases:

### Transition Defaults

For hover and state changes, default to:

```
transition-colors duration-150    /* color shifts (links, buttons) */
transition-all duration-200       /* general state changes (cards, inputs) */
transition-transform duration-200 /* hover accent bars, scale effects */
transition-all duration-300 ease-out /* sliding pills, layout shifts */
```

Avoid durations over 400ms for interaction feedback -- they start to feel sluggish. Reserve longer timing (300+ms) for layout-level transitions like view toggles and sheets.

### Staggered List/Grid Entrance (IWC Pattern)

When a collection first renders or re-renders after a filter change, stagger each item's entrance with a small per-item delay. This adds polish without heavy animation work:

```html
<!-- Vue transition-group example -->
<TransitionGroup name="list-stagger" tag="ul">
  <li v-for="(item, index) in items" :key="item.id"
      :style="{ '--stagger-delay': `${Math.min(index * 30, 400)}ms` }">
    <!-- item -->
  </li>
</TransitionGroup>

<style>
.list-stagger-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
  transition-delay: var(--stagger-delay, 0ms);
}
.list-stagger-enter-from { opacity: 0; transform: translateX(-12px); }
</style>
```

Cap the cumulative delay (`Math.min(index * 30, 400)`) so a 500-item list doesn't take forever to finish animating. Reference: [`WorkflowGrid.vue`](https://github.com/galaxyproject/iwc/blob/main/website/src/components/WorkflowGrid.vue) in the IWC repo.

### View Mode Transitions

When switching between list and grid views, fade + slide the container rather than hard-swapping:

```css
.view-fade-enter-active, .view-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.view-fade-enter-from { opacity: 0; transform: translateY(8px); }
.view-fade-leave-to { opacity: 0; transform: translateY(-8px); }
```

### Astro View Transitions

Astro's built-in View Transitions are enabled site-wide. The dev server is case-insensitive for URLs, but production is case-sensitive -- tests may pass in dev with wrong-case URLs and fail in prod. Use `clickAndWaitForNavigation()` from the Playwright helpers when testing navigation under view transitions.

---

## 5. Layout Principles

### Spacing & Grid

- **Base unit**: Tailwind's default 4px scale (0.25rem increments)
- **Reading measure**: `--measure: 72ch` (utility `max-w-measure`) is defined but not applied yet; it ships with the reading grid, see §3 Prose Styling
- **Grid pattern**: 24px × 24px overlay used on dark backgrounds for scientific texture
  - Light backgrounds: `rgba(37, 83, 123, 0.06)` (galaxy-primary tinted) -- class `bg-grid`
  - Dark backgrounds: `rgba(255, 255, 255, 0.03)` (white tinted) -- class `bg-grid-dark`

### Border Radius Scale

| Size | Used For |
|------|----------|
| `rounded-md` | Small controls: inputs, buttons, toolbar items |
| `rounded-lg` | Cards, content surfaces, hero blocks -- the default for surfaces |
| `rounded-full` | Pills, circular badges, avatars |

Don't reach for `rounded-xl` / `rounded-2xl` -- we don't use them.

### Site Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Dark Sidebar (w-64) │  Light Page Background (#edf4fa)       │
│ #2c3143, fixed      │                                        │
│                     │  ┌──────────────────────────────────┐  │
│  [Galaxy Logo]      │  │ Page Header                      │  │
│  [Search]           │  │ gradient + grid + gold border    │  │
│  [Navigation]       │  └──────────────────────────────────┘  │
│  [Sections...]      │  ┌──────────────────────────────────┐  │
│                     │  │ Content Card (white, shadow-sm)  │  │
│                     │  │ .prose markdown                  │  │
│                     │  └──────────────────────────────────┘  │
│  [Archive link]     │                                        │
│  [Social links]     │                                        │
└──────────────────────────────────────────────────────────────┘
```

- **Sidebar**: `w-64` (256px), fixed left, `bg-galaxy-dark`, hidden below `lg` (1024px)
- **Content area**: Flex, fills remaining width, `bg-light-bg` page background
- **Content cards**: White background, `rounded-lg`, `shadow-sm`, sitting on the light-bg

### Section Rhythm (Homepage / Landing Pages)

On full-bleed landing pages, alternate dark and light section backgrounds so users can orient themselves as they scroll. Dark sections get the `bg-grid-dark` overlay; light sections stay clean. The footer uses the deepest tone (`#1a1f2e`).

### Detail Page Sidebar Sizing

For pages with a secondary sidebar (e.g., event details, platform pages), use fixed widths at smaller breakpoints and percentage at larger ones:

| Breakpoint | Width | Pixels |
|------------|-------|--------|
| lg (1024px+) | `w-80` | 320px |
| xl (1280px+) | `w-96` | 384px |
| 2xl (1536px+) | `w-1/4` | ~25% |

---

## 6. Depth & Elevation

The Hub uses a layered depth model rather than heavy shadow stacking:

| Level | Treatment | Usage |
|-------|-----------|-------|
| Ground | `bg-galaxy-dark` (sidebar, headers) | Structural chrome, deepest layer |
| Page | `bg-light-bg` (#edf4fa) | Page background, sits above the dark frame. The redesign moves to a flat white page (`bg-page`, §2) with the shell changes |
| Surface | `bg-white rounded-lg shadow-sm` | Content cards, the primary reading surface |
| Elevated | `bg-white rounded-lg shadow-md` | Cards on dark backgrounds (hero sections) |
| Overlay | `shadow-lg` on sheets/modals | Sheets, dialogs -- UI overlays only |

### Shadows

- **`shadow-sm`**: Default for cards on light backgrounds -- subtle, professional
- **`shadow-md`**: Cards on dark backgrounds where more lift is needed
- **`shadow-lg`**: Reserved for overlay UI (sheets, dialogs) -- never on standard cards
- **No `shadow-xl` / `shadow-2xl`**: depth comes from the layered background model, not shadow stacking

### Borders

- Light-context cards: `border border-galaxy-primary/10` (subtle brand-tinted edge)
- Dark-context elements: `border-medium-bg` (sidebar section dividers)
- Gold accent borders: `border-l-4 border-l-galaxy-gold` (featured content)
- Page header: `border-bottom: 4px solid #ffd700` (gold bottom bar)

### Grid Overlay as Texture

The 24px grid pattern creates a "workflow editor mesh" effect that adds scientific/technical depth to dark surfaces without competing with content. It's purely decorative -- never interactive.

---

## 7. Do's and Don'ts

### Do

- Use Galaxy brand tokens (`galaxy-dark`, `galaxy-primary`, `galaxy-gold`, `galaxy-grey`) for all brand-facing surfaces
- Reserve gold for high-impact moments: CTAs, active states, accent borders, hero text
- Use `rounded-lg` + `shadow-sm` consistently on content cards
- Use role tokens (`text-fg`, `text-fg-meta`, `bg-surface-tint`, `border-line`) for new page code; every role has a dark value (§2)
- Make links in text `text-link` with `hover:text-link-hover` and a gold underline on hover
- Use `text-fg-strong` (galaxy-dark) for heading text color
- Use Atkinson Hyperlegible -- never substitute another font
- Apply `bg-grid-dark` overlay on dark hero/section backgrounds
- Use the gradient pattern (`galaxy-dark → galaxy-primary` at 135°) for page headers
- Keep prose blockquotes with the gold left border treatment
- Use Lucide icons; let the preprocessor convert legacy FontAwesome
- Reach for the `<PageHeader>` component instead of reimplementing the gradient/grid/gold-bar pattern
- Use Reka UI components (`<Input>`, `<Select>`, `<Sheet>`, etc.) unchanged -- they use the OKLch palette by design

### Don't

- Don't use generic Tailwind grays (`gray-500`, `slate-600`) for brand-facing text or backgrounds
- Don't use `text-blue-*` or `text-indigo-*` on links -- always `text-link` (galaxy-primary)
- Don't put gold text on light surfaces (1.40:1 on white), including link hovers; gold is an underline, fill or bar there
- Don't fade meta text with opacity (`text-galaxy-grey/70`, about 3.45:1) or use `chicago-400` for text (3.59:1); use `text-fg-meta`
- Don't hardcode a colour that has no dark value; add a role with both values instead
- Don't use `prose-lg` for content; reading layouts use `prose-compact prose-galaxy`
- Don't overuse gold -- if every element has a gold accent, the signature is lost
- Don't add gold borders to cards on dark backgrounds -- the white card IS the contrast
- Don't use `bg-primary` expecting Galaxy blue -- `primary` is the OKLch near-black token; use `bg-galaxy-primary` for brand blue
- Don't mix brand tokens into generic UI components or vice-versa (see §2)
- Don't use `shadow-lg` / `shadow-xl` on content cards -- reserve `shadow-lg` for sheets and dialogs
- Don't use `rounded-xl` / `rounded-2xl` -- cards are `rounded-lg`, pills are `rounded-full`
- Don't hardcode hex values where a token exists (use `bg-galaxy-primary`, not `bg-[#25537b]`)
- Don't introduce new Bootstrap classes in new content; `.bs-compat` is for legacy content only
- Don't break the dark/light section alternation on landing pages

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <768px | Single column, hamburger menu, full-width cards and linkboxes |
| Tablet | 768--1024px | Sidebar collapsed, 2-column card grids |
| Desktop | >1024px | Full sidebar visible, 3--4 column grids |

### Navigation Collapse

- **Desktop**: Fixed left sidebar (`w-64`, `hidden lg:flex`)
- **Mobile**: Hamburger icon triggers a Sheet slide-out menu with full-screen dark background
- Navigation items stack vertically on mobile
- Region/subsite selector moves to bottom of mobile menu

### Touch Targets

- Buttons: minimum `h-8` (32px) with comfortable padding
- Navigation links: adequate spacing for tap targets
- Tags: `px-2.5 py-1` minimum padding
- Heading anchors: shown at 50% opacity on touch devices (`@media (hover: none)`) since hover isn't available

### Content Adaptation

- **Cards**: 3-col → 2-col (tablet) → 1-col (mobile)
- **Linkbox**: `float: right` on desktop → `float: none; width: 100%` below 768px
- **Page header**: Title is `text-h1`: 30px from `sm` up, 26px below
- **Homepage hero**: Stats row wraps, CTA row stacks
- **Detail sidebars**: `lg:w-80 xl:w-96 2xl:w-1/4 shrink-0` -- fixed widths prevent cramping on medium screens

### Image Behavior

- All content images get `rounded-lg` treatment
- Prose images auto-center (`margin-left: auto; margin-right: auto`)
- List item images display inline (`display: inline; margin: 0`) to flow with text
- Images maintain aspect ratio across all viewports

---

## 9. Agent Prompt Guide

Refer to the [base design system Quick Color Reference](https://github.com/galaxyproject/galaxy-brand-tokens/blob/main/DESIGN.md#6-quick-color-reference) for the primary brand palette values.

### Example Component Prompts

- "Create a Galaxy page header. Gradient `linear-gradient(135deg, #2c3143, #25537b)`, gold bottom border (`border-bottom: 4px solid #ffd700`), 24px grid overlay at 3% white. Title `text-h1 font-bold` in white, preceded by a `w-1 h-8 bg-galaxy-gold` accent bar."

- "Build a content card on `bg-light-bg`: `bg-white rounded-lg shadow-sm p-6`. Add `border-l-4 border-l-galaxy-gold` if it's featured. Title `text-h3 font-semibold text-fg-strong`, body `text-fg`, links `text-link hover:text-link-hover hover:decoration-link-hover-line`."

- "Build a dark hero section: `bg-galaxy-dark` with `bg-grid-dark` overlay. Key phrase in `text-galaxy-gold`. Primary CTA: `bg-galaxy-gold text-galaxy-dark font-semibold px-6 py-3 rounded-lg hover:bg-galaxy-gold-dark`. Secondary CTA on dark bg: `border-2 border-white/30 text-white hover:bg-white/10`."

- "Add a gold-bar hover animation to a list item. Absolutely-positioned `w-1 bg-galaxy-gold` on the left, `scale-x-0 group-hover:scale-x-100 transition-transform duration-200`."

- "I need a form input -- use `<Input>` from `@/components/ui/input`. Don't restyle it with Galaxy tokens; its OKLch neutrals compose fine on Galaxy pages."

### Iteration Guide

1. **Font**: Always Atkinson Hyperlegible. Already set on `body` -- don't override per-component.
2. **Two palettes, one rule**: Galaxy tokens for brand surfaces, OKLch for generic UI (transitional -- see §2). Don't mix. If `bg-primary` looks black, that's because it is -- use `bg-galaxy-primary` for brand blue.
3. **Gold is earned**: Only on CTAs, active states, accent borders, and hero highlights. More than ~3 gold elements per section is probably too many.
4. **Cards are white, lg, sm**: `bg-white rounded-lg shadow-sm` on light backgrounds; `shadow-md` on dark backgrounds; skip the gold border on dark backgrounds.
5. **Links follow the pattern**: `text-link` resting, `hover:text-link-hover` with a gold underline; gold hover text only on dark chrome.
6. **Grid overlay**: `bg-grid-dark` on dark sections. Use the `<PageHeader>` component to get the full gradient + grid + gold-bar treatment without reimplementing it.
7. **Tokens over hex**: `bg-galaxy-dark` not `bg-[#2c3143]`. Tokens are in `global.css` under `@theme`.
8. **Check IWC first**: For patterns that appear on both sites (cards, tabs, filter sidebars, hover accent bars), look at how IWC implements it ([galaxyproject/iwc website](https://github.com/galaxyproject/iwc/tree/main/website)) before writing new code. Ecosystem consistency > local cleverness.

---

## 10. galaxy-ui Alignment

galaxy-ui (`client/packages/ui` in `galaxyproject/galaxy`) is the Galaxy application's component library: private, raw Vue SFCs inside a Bootstrap / `@vue/compat` app, primitive tokens only (`--color-{blue,grey,green,yellow,orange,red}-{100..900}`, `--spacing-N`, `--font-size-{small,medium,large}`), no semantic layer and no dark mode. The Hub cannot import it; it aligns with it.

**Values** (same hex in galaxy-ui, brand tokens and Hub roles):

| galaxy-ui | Brand token | Hub role |
|-----------|-------------|----------|
| `blue-600` `#25537b` | `galaxy-primary` | `link`, `focus`, `brand`, `selected` |
| `blue-700` `#2c3143` | `galaxy-dark` | `fg-strong`, `chrome` |
| `yellow-500` `#ffd700` | `galaxy-gold` | `bg-accent-gold` |
| `blue-100` `#f1f9fe`, `blue-600` text | | `info-bg`, `info-fg` |
| `yellow-100`, `yellow-700` | | `warn-bg`, `warn-fg` |
| `red-100`, `red-700` | | `danger-bg`, `danger-fg` |

Known mismatches: galaxy-ui `yellow-600` `#f0aa02` vs brand `gold-600` `#d19e00` (the Hub's gold hover and link-hover underline use `#d19e00`); galaxy-ui greys have no `#58585a` (Hub meta and body come from the brand chicago scale); galaxy-ui `green-600` text is 3.25:1 on white, so the Hub's `ok-fg` uses a darker green.

**Names** (same meaning, Hub spelling):

| galaxy-ui | Hub |
|-----------|-----|
| `GButton` `color`/`size`/`outline`/`pressed`/`pill` | `ui/button` cva variants; sizes `sm`/`default`/`lg` = `small`/`medium`/`large` |
| `GButtonGroup` + `pressed` | View toggle: `role="group"` with `aria-pressed` buttons |
| `GTable` `compact`, `headVariant` | prose tables (§3 Tables) |
| `GTabs` | Reka `ui/tabs` for in-page panels |
| `GLink` | link roles (§2) |
| `GAlert` `variant` | `.callout` on the status roles |

**Rule:** never copy galaxy-ui variable names (`--color-blue-600` and friends) into the Hub `@theme`: they would replace Tailwind's own `blue` scale that existing `text-blue-*` utilities use. Align values and role names only. Proposals that would help both sides (a role layer in galaxy-ui, a 3:1 focus colour instead of the `blue-400` glow, `aria-pressed` on `GButton pressed`) are drafted for the galaxy-ui maintainers, not patched here.

---

## Sister Documents

- **galaxy-ui**: [README](https://github.com/galaxyproject/galaxy/blob/dev/client/packages/ui/README.md) and [`tokens.css`](https://github.com/galaxyproject/galaxy/blob/dev/client/packages/ui/src/styles/tokens.css) in `galaxyproject/galaxy` -- with this file, the source of truth for Hub design (§10).
- **IWC DESIGN.md**: [galaxyproject/iwc website/DESIGN.md](https://github.com/galaxyproject/iwc/blob/main/website/DESIGN.md) -- the closest sibling site; a reference (see §1 precedence).
- **Base design system**: [galaxyproject/galaxy-brand-tokens DESIGN.md](https://github.com/galaxyproject/galaxy-brand-tokens/blob/main/DESIGN.md) -- the canonical base Galaxy design system.
