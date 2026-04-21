# Design System: Galaxy Community Hub

## 1. Visual Theme & Atmosphere

The Galaxy Community Hub is the public face of a research platform used by hundreds of thousands of scientists worldwide. The design communicates scientific credibility, openness, and accessibility -- professional without being cold, structured without being sterile. The overall impression is one of depth and contrast: dark mastheads and sidebars (`#2c3143`) frame light content areas (`#edf4fa`) where white cards surface information cleanly. A signature gold accent (`#ffd700`) ties the visual identity together, appearing sparingly on CTAs, active states, and border accents.

The typography is built entirely on Atkinson Hyperlegible -- a font designed specifically for readability and accessibility -- at weights 400 and 700 with a system sans-serif fallback stack. This is not a decorative font choice; it's a deliberate accessibility decision for a platform that serves researchers across disciplines and ability levels.

The Hub is part of a broader Galaxy ecosystem that includes IWC (Intergalactic Workflow Commission), GTN (Galaxy Training Network), and the usegalaxy.org servers. All share the same brand palette, gold accent patterns, dark/light contrast model, and card-based layouts. A researcher browsing workflows on IWC, reading news on the Hub, and taking a GTN tutorial should feel like they're navigating one cohesive platform.

IWC is the closest sibling site in design terms and has its own [DESIGN.md](https://github.com/galaxyproject/iwc/blob/main/website/DESIGN.md) in the `galaxyproject/iwc` repository. The two docs should be read together -- where they differ, prefer IWC's approach for anything that appears on both sites (cards, tabs, hover accent bars, section backgrounds). §2 documents the shared Pantone-style color aliases so cross-property code can be written interchangeably.

The site is light-mode only in practice -- dark-mode CSS custom properties exist in `global.css` under a `.dark` class, but nothing toggles that class. Treat the site as single-theme until that changes.

The technical substrate is Astro with Tailwind CSS 4, Vue 3 components hydrated client-side via Reka UI primitives, and class-variance-authority for component variants. Content is Markdown/MDX preprocessed from a shared `/content/` directory, with Bootstrap compatibility classes scoped under `.bs-compat` for legacy content.

**Key Characteristics:**
- Light-mode only: dark structural elements (sidebar, headers) frame light content backgrounds
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

The Hub runs two parallel color systems. **Don't mix them.**

- **Galaxy brand tokens** (`galaxy-*`, `light-bg`, `medium-bg`, etc.) are for brand-facing surfaces: hero sections, page headers, cards, prose content, navigation. This is the palette you reach for when building Galaxy pages.
- **OKLch semantic tokens** (`primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, etc.) power the generic UI component layer (Reka UI / shadcn-style components -- Input, Select, Sheet, Accordion, Tabs). These resolve to near-achromatic values, *not* Galaxy blues. `bg-primary` is near-black; it is **not** `galaxy-primary`.

When composing a new Galaxy page, use brand tokens. When dropping in a form input or a modal, the generic components already use the OKLch tokens -- leave them alone.

> **OPEN DECISION -- which gold is the Galaxy brand gold?**
>
> Hub and IWC currently disagree on the primary gold (used for CTAs, active states, accent bars):
>
> - **Hub** -- `#ffd700` (bright yellow), exposed as `galaxy-gold` and `gold-500`. This is the gold on the homepage "Your Data Analysis Platform" highlight and the pillar subtitles.
> - **IWC** -- `#d0bd2a` (olive/mustard), exposed as `hokey-pokey-500`. See any workflow page on <https://iwc.galaxyproject.org/> for the active tab underlines, left-edge accent bars, and primary buttons.
>
> These are **visibly different shades**, not a drop-in rename. The choice is a brand decision, not a technical one, and has to be made jointly with IWC. Until that happens: `#ffd700` is Hub's authoritative gold; `hokey-pokey-*` is declared in `global.css` only so code copy-pasted from IWC compiles, and should **not** be introduced into new Hub pages. Never mix both golds on the same surface.

### Galaxy Brand Tokens

| Token | Hex | Tailwind | IWC alias | Usage |
|-------|-----|----------|-----------|-------|
| Galaxy Dark | `#2c3143` | `galaxy-dark` | `ebony-clay` | Sidebar, headers, dark backgrounds, heading text |
| Galaxy Primary | `#25537b` | `galaxy-primary` | `bay-of-many` | Links, interactive elements, table headers |
| Galaxy Gold | `#ffd700` | `galaxy-gold` | `gold-500` | Accents, active states, primary CTAs, border highlights |
| Galaxy Gold Dark | `#d19e00` | `galaxy-gold-dark` | `gold-600` | Hover state on gold-background buttons |
| Accent Hover | `#ffe60d` | `accent-hover` | `gold-400` | Hover state on gold-colored text links |
| Chicago | `#58585a` | `galaxy-grey` | `chicago` | Body text, muted content |
| Hokey-Pokey | `#d0bd2a` | (not yet) | `hokey-pokey-500` | IWC's softer gold for primary button backgrounds |

### Ecosystem Palette Alignment (Cross-Property)

The Hub ships the same **full 50-950 Tailwind-standard scales** IWC uses, under the same Pantone-style names. Both sites can reference either the semantic aliases (`galaxy-primary`, `galaxy-dark`, `galaxy-grey`, `galaxy-gold`) or the Pantone scales (`bay-of-many-*`, `ebony-clay-*`, `chicago-*`, `gold-*`, `hokey-pokey-*`) interchangeably. Code written for IWC drops into the Hub without modification.

When to reach for which:

- **Semantic aliases** -- when the usage maps clearly to brand roles: "this is the primary link color", "this is the page dark", "this is the gold accent". Most hand-styled Galaxy pages stay here.
- **Pantone scales** -- when you need a shade between the base and white/black: subtle borders (`border-ebony-clay-100`), tinted section backgrounds (`bg-bay-of-many-50`), hover states (`hover:bg-ebony-clay-50`), muted text (`text-chicago-500`). These unlock the migration away from generic Tailwind grays.

Replacement patterns for generic grays (now directly supported):

- `text-gray-600` → `text-chicago-600`
- `text-gray-700` → `text-chicago-700`
- `text-gray-500` → `text-chicago-500`
- `border-gray-200` → `border-ebony-clay-100`
- `bg-gray-50` / `bg-gray-100` → `bg-ebony-clay-50` or `bg-bay-of-many-50` (depending on tint intent)
- `hover:bg-gray-100` → `hover:bg-ebony-clay-50`

See the **OPEN DECISION** callout at the top of this section for the hokey-pokey vs gold question.

### Background Surfaces

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Dark BG | `#2c3143` | `dark-bg` | Sidebar, hero sections, dark panels |
| Medium BG | `#3c435c` | `medium-bg` | Sidebar borders, search inputs, dark-section alternation |
| Deep BG | `#1a1f2e` | (inline) | Homepage footer -- deepest dark tone; not yet a named token |
| Light BG | `#edf4fa` | `light-bg` | Page backgrounds (subtle blue-gray tint) |
| Card BG | `#5d678d` | `card-bg` | Muted card surfaces on dark backgrounds |

### The Gold Accent

Gold (`#ffd700`) is Galaxy's visual signature. Use it for:

- **Primary CTAs**: Gold buttons with dark text
- **Active states**: Tab underlines, selected filter items, current page indicators
- **Left border accents**: Page header title bars, blockquotes, featured content
- **Title underlines**: Section headers where a left bar feels too heavy (`border-b-2 border-galaxy-gold`)
- **Hero text**: Key headlines on dark backgrounds
- **Hover reveals**: Animated gold bars on interactive items, link hover states
- **Stats/numbers**: Gold numerals in hero stats for emphasis

**Rule**: Gold should feel special. If everything is gold, nothing is gold.

**When NOT to use gold borders**: On cards sitting on dark backgrounds (hero sections), the white card already provides contrast -- adding a gold border is redundant.

**Gold has two hover tones**:
- Gold-background buttons darken on hover: `hover:bg-galaxy-gold-dark` (`#d19e00`)
- Gold-colored text links brighten on hover: `hover:text-accent-hover` (`#ffe60d`)

### OKLch Semantic Tokens (Transitional)

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

### Font Family

- **Primary**: Atkinson Hyperlegible (400, 700)
- **Stack**: `'Atkinson Hyperlegible', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- **Why**: Designed by the Braille Institute specifically for character distinction and readability. Characters like `Il1` and `O0` are visually distinct, benefiting researchers scanning data-heavy content.

### Hierarchy

| Role | Tailwind Classes | Usage |
|------|-----------------|-------|
| Page Title (H1) | `text-3xl sm:text-4xl font-bold tracking-tight text-galaxy-dark` | Page and article titles |
| Section Header (H2) | `text-2xl font-bold text-galaxy-dark` | Major content sections |
| Card Title (H3) | `text-xl font-semibold text-galaxy-dark` | Card headers, subsections |
| Subheading (H4) | `text-lg font-semibold text-galaxy-dark` | Minor sections |
| Body | `text-base text-galaxy-grey` | Paragraph text |
| Muted | `text-sm text-galaxy-grey/70` | Metadata, help text, timestamps |
| Links | `text-galaxy-primary hover:text-galaxy-gold` | All interactive links |

### Icons

Use **Lucide icons** (via `lucide-vue-next` and the Lucide SVG set) for all UI chrome -- navigation, controls, inline icons in buttons. The content preprocessor automatically converts legacy FontAwesome references in Markdown/MDX to inline Lucide SVGs, so don't introduce new FontAwesome usage.

### Prose Styling

Content rendered from Markdown uses custom prose styles (see `.prose` and `.prose-galaxy` in `global.css`):

```css
/* Heading colors */
--tw-prose-headings: #2c3143;
--tw-prose-links: #25537b;

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

/* Links: underline with gold hover */
.prose a { text-decoration-color: color-mix(in srgb, #25537b 40%, transparent); }
.prose a:hover { color: #ffd700; text-decoration-color: #ffd700; }

/* Code blocks: dark background */
.prose pre { background-color: #1f2937; border-radius: 0.5rem; }
.prose code:not(pre code) { background-color: #f3f4f6; font-size: 0.875em; }

/* Images: rounded, centered */
.prose img { border-radius: 0.5rem; margin-left: auto; margin-right: auto; }
```

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
    <h1 class="text-3xl sm:text-4xl font-bold tracking-tight">Title</h1>
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

### Forms

Reka UI / shadcn-style components are available for:

- **Input** (`@/components/ui/input`) -- text inputs
- **Select** (`@/components/ui/select`) -- dropdown selects
- **Sheet** (`@/components/ui/sheet`) -- slide-out drawer (used by mobile menu)
- **Accordion**, **Collapsible** (`@/components/ui/*`) -- expandable sections
- **Tabs** (`@/components/ui/tabs`) -- tabbed navigation
- **Card**, **CardHeader**, **CardContent**, etc. (`@/components/ui/card`) -- structured card layout

These use the OKLch semantic tokens, which read as neutral on Galaxy backgrounds. Don't restyle their internals with Galaxy brand colors -- they're deliberately chromatic-neutral so they compose anywhere.

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

Anchor links appear on hover with gold color transition:

```css
.heading-anchor { opacity: 0; color: #25537b; transition: opacity 0.15s; }
.heading-anchor:hover { color: #ffd700; }
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
| Page | `bg-light-bg` (#edf4fa) | Page background, sits above the dark frame |
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
- Make all links `text-galaxy-primary` with `hover:text-galaxy-gold` transitions
- Use `text-galaxy-dark` for heading text color
- Use Atkinson Hyperlegible -- never substitute another font
- Apply `bg-grid-dark` overlay on dark hero/section backgrounds
- Use the gradient pattern (`galaxy-dark → galaxy-primary` at 135°) for page headers
- Keep prose blockquotes with the gold left border treatment
- Use Lucide icons; let the preprocessor convert legacy FontAwesome
- Reach for the `<PageHeader>` component instead of reimplementing the gradient/grid/gold-bar pattern
- Use Reka UI components (`<Input>`, `<Select>`, `<Sheet>`, etc.) unchanged -- they use the OKLch palette by design

### Don't

- Don't use generic Tailwind grays (`gray-500`, `slate-600`) for brand-facing text or backgrounds
- Don't use `text-blue-*` or `text-indigo-*` on links -- always `text-galaxy-primary`
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
- **Page header**: Title scales from `text-4xl` to `text-3xl` via `sm:` prefix
- **Homepage hero**: Stats row wraps, CTA row stacks
- **Detail sidebars**: `lg:w-80 xl:w-96 2xl:w-1/4 shrink-0` -- fixed widths prevent cramping on medium screens

### Image Behavior

- All content images get `rounded-lg` treatment
- Prose images auto-center (`margin-left: auto; margin-right: auto`)
- List item images display inline (`display: inline; margin: 0`) to flow with text
- Images maintain aspect ratio across all viewports

---

## 9. Agent Prompt Guide

### Quick Color Reference

| Token | Hex | When to Use |
|-------|-----|-------------|
| `galaxy-dark` | `#2c3143` | Sidebar bg, header bg, heading text |
| `galaxy-primary` | `#25537b` | Links, table headers, interactive elements |
| `galaxy-gold` | `#ffd700` | CTAs, active states, accent borders, hero highlights |
| `galaxy-gold-dark` | `#d19e00` | Hover on gold-bg buttons |
| `accent-hover` | `#ffe60d` | Hover on gold-colored text links |
| `galaxy-grey` | `#58585a` | Body text, muted content |
| `light-bg` | `#edf4fa` | Page background |
| `medium-bg` | `#3c435c` | Sidebar borders, dark-section alternation |
| White | `#ffffff` | Content cards, reading surfaces |

### Example Component Prompts

- "Create a Galaxy page header. Gradient `linear-gradient(135deg, #2c3143, #25537b)`, gold bottom border (`border-bottom: 4px solid #ffd700`), 24px grid overlay at 3% white. Title `text-3xl sm:text-4xl font-bold` in white, preceded by a `w-1 h-8 bg-galaxy-gold` accent bar."

- "Build a content card on `bg-light-bg`: `bg-white rounded-lg shadow-sm p-6`. Add `border-l-4 border-l-galaxy-gold` if it's featured. Title `text-xl font-semibold text-galaxy-dark`, body `text-galaxy-grey`, links `text-galaxy-primary hover:text-galaxy-gold`."

- "Build a dark hero section: `bg-galaxy-dark` with `bg-grid-dark` overlay. Key phrase in `text-galaxy-gold`. Primary CTA: `bg-galaxy-gold text-galaxy-dark font-semibold px-6 py-3 rounded-lg hover:bg-galaxy-gold-dark`. Secondary CTA on dark bg: `border-2 border-white/30 text-white hover:bg-white/10`."

- "Add a gold-bar hover animation to a list item. Absolutely-positioned `w-1 bg-galaxy-gold` on the left, `scale-x-0 group-hover:scale-x-100 transition-transform duration-200`."

- "I need a form input -- use `<Input>` from `@/components/ui/input`. Don't restyle it with Galaxy tokens; its OKLch neutrals compose fine on Galaxy pages."

### Iteration Guide

1. **Font**: Always Atkinson Hyperlegible. Already set on `body` -- don't override per-component.
2. **Two palettes, one rule**: Galaxy tokens for brand surfaces, OKLch for generic UI (transitional -- see §2). Don't mix. If `bg-primary` looks black, that's because it is -- use `bg-galaxy-primary` for brand blue.
3. **Gold is earned**: Only on CTAs, active states, accent borders, and hero highlights. More than ~3 gold elements per section is probably too many.
4. **Cards are white, lg, sm**: `bg-white rounded-lg shadow-sm` on light backgrounds; `shadow-md` on dark backgrounds; skip the gold border on dark backgrounds.
5. **Links follow the pattern**: `text-galaxy-primary` resting, `hover:text-galaxy-gold` with transition.
6. **Grid overlay**: `bg-grid-dark` on dark sections. Use the `<PageHeader>` component to get the full gradient + grid + gold-bar treatment without reimplementing it.
7. **Tokens over hex**: `bg-galaxy-dark` not `bg-[#2c3143]`. Tokens are in `global.css` under `@theme`.
8. **Check IWC first**: For patterns that appear on both sites (cards, tabs, filter sidebars, hover accent bars), look at how IWC implements it ([galaxyproject/iwc website](https://github.com/galaxyproject/iwc/tree/main/website)) before writing new code. Ecosystem consistency > local cleverness.

---

## Sister Documents

> **Note:** this Sister Documents section is a transitional construct. The long-term direction is a single canonical Galaxy design system (a base `DESIGN.md` owned by something like `galaxyproject/design-system` or `galaxyproject/brand`) that the Hub, IWC, GTN, and future properties all build on top of. Each property would then keep only a short property-specific overrides doc covering what's unique to it (sidebar layout and bs-compat for the Hub, workflow-card patterns for IWC, etc.). When that canonical lands, this section collapses to a single "see the base Galaxy design system" link at the top of the file.

- **IWC DESIGN.md**: [galaxyproject/iwc website/DESIGN.md](https://github.com/galaxyproject/iwc/blob/main/website/DESIGN.md) -- the closest sibling site. Concise, prescriptive, uses full 50-950 color scales under Pantone-style names.
- **IWC component reference** (read these when building similar patterns here, paths relative to `website/` in the IWC repo):
  - [`src/components/WorkflowCard.vue`](https://github.com/galaxyproject/iwc/blob/main/website/src/components/WorkflowCard.vue) -- card with hover accent bar
  - [`src/components/WorkflowListItem.vue`](https://github.com/galaxyproject/iwc/blob/main/website/src/components/WorkflowListItem.vue) -- list row with odd-row tinting
  - [`src/components/FilterSidebar.vue`](https://github.com/galaxyproject/iwc/blob/main/website/src/components/FilterSidebar.vue) -- desktop filter nav with count badges
  - [`src/components/MobileFilterSheet.vue`](https://github.com/galaxyproject/iwc/blob/main/website/src/components/MobileFilterSheet.vue) -- bottom-sheet mobile dialog
  - [`src/components/ViewToggle.vue`](https://github.com/galaxyproject/iwc/blob/main/website/src/components/ViewToggle.vue) -- sliding-pill toggle
  - [`src/components/WorkflowGrid.vue`](https://github.com/galaxyproject/iwc/blob/main/website/src/components/WorkflowGrid.vue) -- staggered entrance animations
  - [`src/components/ui/button-variants.ts`](https://github.com/galaxyproject/iwc/blob/main/website/src/components/ui/button-variants.ts), [`badge-variants.ts`](https://github.com/galaxyproject/iwc/blob/main/website/src/components/ui/badge-variants.ts) -- CVA definitions using brand scales
