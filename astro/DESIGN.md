# Design System: Galaxy Community Hub

## 1. Visual Theme & Atmosphere

The Galaxy Community Hub is the public face of a research platform used by hundreds of thousands of scientists worldwide. The design communicates scientific credibility, openness, and accessibility -- professional without being cold, structured without being sterile. The overall impression is one of depth and contrast: dark mastheads and sidebars (`#2C3143`) frame light content areas (`#EDF4FA`) where white cards surface information cleanly. A signature gold accent (`#FFD700`) ties the visual identity together, appearing sparingly on CTAs, active states, and border accents.

The typography is built entirely on Atkinson Hyperlegible -- a font designed specifically for readability and accessibility -- at weights 400 and 700 with a system sans-serif fallback stack. This is not a decorative font choice; it's a deliberate accessibility decision for a platform that serves researchers across disciplines and ability levels.

The Hub is part of a broader Galaxy ecosystem that includes IWC (Intergalactic Workflow Commission), GTN (Galaxy Training Network), and the usegalaxy.org servers. All share the same brand palette, gold accent patterns, dark/light contrast model, and card-based layouts. A researcher browsing workflows on IWC, reading news on the Hub, and taking a GTN tutorial should feel like they're navigating one cohesive platform.

The technical substrate is Astro with Tailwind CSS 4, Vue 3 components hydrated client-side via Reka UI primitives, and class-variance-authority for component variants. Content is Markdown/MDX preprocessed from a shared `/content/` directory, with Bootstrap compatibility classes scoped under `.bs-compat` for legacy content.

**Key Characteristics:**
- Light-mode-primary: dark structural elements (sidebar, headers) framing light content backgrounds
- Atkinson Hyperlegible at 400/700 -- accessibility-first typography
- Galaxy brand palette only -- no generic Tailwind grays in brand-facing surfaces
- Gold (`#FFD700`) as the sole accent color, reserved for high-impact moments
- Card-based layouts with `rounded-lg` borders and `shadow-sm` elevation
- 24px grid pattern overlays on dark backgrounds for subtle scientific/technical texture
- Gradient mastheads (`galaxy-dark → galaxy-primary` at 135°) with gold bottom borders
- Bootstrap 4 compatibility layer scoped under `.bs-compat` for ~125 legacy content files

---

## 2. Color Palette & Roles

### Brand Colors

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Galaxy Dark | `#2C3143` | `galaxy-dark` | Sidebar, headers, dark backgrounds, heading text |
| Galaxy Primary | `#25537B` | `galaxy-primary` | Links, interactive elements, table headers |
| Galaxy Gold | `#FFD700` | `galaxy-gold` | Accents, active states, primary CTAs, border highlights |
| Galaxy Gold Dark | `#D19E00` | `galaxy-gold-dark` | Gold hover/pressed states |
| Chicago | `#58585A` | `galaxy-grey` | Body text, muted content |

### Background Surfaces

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Dark BG | `#2C3143` | `dark-bg` | Sidebar, hero sections, dark panels |
| Medium BG | `#3C435C` | `medium-bg` | Sidebar borders, search inputs, intermediate surfaces |
| Light BG | `#EDF4FA` | `light-bg` | Page backgrounds (subtle blue-gray tint) |
| Card BG | `#5D678D` | `card-bg` | Muted card surfaces on dark backgrounds |

### The Gold Accent

Gold (`#FFD700`) is Galaxy's visual signature -- its DNA. Use it for:

- **Primary CTAs**: Gold buttons with dark text
- **Active states**: Tab underlines, selected filter items, current page indicators
- **Left border accents**: Page header title bars, blockquotes, featured content
- **Title underlines**: Section headers where a left bar feels too heavy (`border-b-2 border-galaxy-gold`)
- **Hero text**: Key headlines on dark backgrounds
- **Hover reveals**: Animated gold bars on interactive items, link hover states
- **Stats/numbers**: Gold numerals in hero stats for emphasis

**Rule**: Gold should feel special. If everything is gold, nothing is gold.

**When NOT to use gold**: On cards placed on dark backgrounds (hero sections), the white card already provides contrast -- adding a gold border is redundant. Use the standard card pattern instead.

### Semantic UI Colors (OKLch System)

These power the generic UI component layer (buttons, badges, inputs) via CSS custom properties:

| Role | Light Mode | Dark Mode |
|------|-----------|-----------|
| Background | `oklch(1 0 0)` (white) | `oklch(0.145 0 0)` |
| Foreground | `oklch(0.145 0 0)` (near-black) | `oklch(0.985 0 0)` |
| Primary | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` |
| Muted | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| Muted Foreground | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` |
| Destructive | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |
| Border | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` |

### SIG/WG Category Colors

Special Interest Groups and Working Groups use dedicated category colors:

| Category | Hex | Class |
|----------|-----|-------|
| SIG: Field | `#006B15` (dark green) | `.bg-sig-field` |
| SIG: Method | `#630177` (purple) | `.bg-sig-method` |
| SIG: Service | `#77072F` (maroon) | `.bg-sig-service` |
| SIG: Region | `#CC4D00` (orange) | `.bg-sig-region` |
| SIG: Projects | `#150276` (navy) | `.bg-sig-projects` |
| WG: Primary | `#6286A6` (slate blue) | `.bg-wg-primary` |
| WG: GOATS | `#61AD90` (teal) | `.bg-wg-goats` |
| WG: Applied | `#8886B3` (lavender) | `.bg-wg-applied` |
| WG: All | `#D87E55` (terracotta) | `.bg-wg-all` |

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

### Prose Styling

Content rendered from Markdown uses custom prose styles:

```css
/* Heading colors */
--tw-prose-headings: #2C3143;
--tw-prose-links: #25537B;

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
.prose th { background-color: #25537B; color: white; font-weight: 600; }

/* Links: underline with gold hover */
.prose a { text-decoration-color: color-mix(in srgb, #25537B 40%, transparent); }
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

The branded page header appears on all content pages -- gradient background with grid overlay and gold accent bar:

```html
<header class="relative p-10 rounded-t-lg text-white"
        style="background: linear-gradient(135deg, #2C3143 0%, #25537B 100%);
               border-bottom: 4px solid #FFD700;">
  <!-- Grid overlay (::before pseudo-element) -->
  <!-- 24px grid, white at 3% opacity -->
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
<div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">

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

### Buttons (CVA Variants)

The button system uses class-variance-authority with these variants:

| Variant | Classes | Usage |
|---------|---------|-------|
| `default` | `bg-primary text-primary-foreground hover:bg-primary/90` | Standard actions |
| `destructive` | `bg-destructive text-white hover:bg-destructive/90` | Delete, remove |
| `outline` | `border bg-background shadow-xs hover:bg-accent` | Secondary actions |
| `secondary` | `bg-secondary text-secondary-foreground hover:bg-secondary/80` | Tertiary actions |
| `ghost` | `hover:bg-accent hover:text-accent-foreground` | Subtle/toolbar actions |
| `link` | `text-primary underline-offset-4 hover:underline` | Inline link-style buttons |

Sizes: `default` (h-9), `sm` (h-8), `lg` (h-10), `icon` (size-9), `icon-sm` (size-8), `icon-lg` (size-10).

**Galaxy-branded CTA buttons** (used in hero sections, not the generic system):

```html
<!-- Primary gold CTA -->
<a class="bg-galaxy-gold text-galaxy-dark font-semibold px-6 py-3 rounded-lg
          hover:bg-galaxy-gold-dark transition-colors">
  Use Galaxy
</a>

<!-- Secondary outline CTA (on dark backgrounds) -->
<a class="border-2 border-white/30 text-white px-6 py-3 rounded-lg
          hover:bg-white/10 transition-colors">
  Learn More
</a>
```

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

### Heading Anchors

Anchor links appear on hover with gold color transition:

```css
.heading-anchor { opacity: 0; color: #25537B; transition: opacity 0.15s; }
.heading-anchor:hover { color: #FFD700; }
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

---

## 5. Layout Principles

### Spacing & Grid

- **Base unit**: Tailwind's default 4px scale (0.25rem increments)
- **Grid pattern**: 24px × 24px overlay used on dark backgrounds for scientific texture
  - Light backgrounds: `rgba(37, 83, 123, 0.06)` (galaxy-primary tinted) -- class `bg-grid`
  - Dark backgrounds: `rgba(255, 255, 255, 0.03)` (white tinted) -- class `bg-grid-dark`
- **Border radius**: `rounded-lg` (0.5rem) as the standard; `rounded-md` for smaller elements

### Site Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Dark Sidebar (w-64) │  Light Page Background (#EDF4FA)       │
│ #2C3143, fixed      │                                        │
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

### Homepage Section Rhythm

The homepage alternates dark and light sections for visual rhythm:

| # | Section | Background |
|---|---------|------------|
| 1 | Hero | Gradient (`galaxy-dark → #1a1f2e`) + grid overlay |
| 2 | Stats Row | `medium-bg` |
| 3 | How Galaxy Works | `galaxy-dark` + grid overlay |
| 4 | Pillars | `medium-bg` |
| 5 | News & Events | Gradient (`medium-bg → galaxy-dark`) |
| 6 | CTA | `galaxy-dark` + grid overlay |
| 7 | Footer | `#1a1f2e` |

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
| Page | `bg-light-bg` (#EDF4FA) | Page background, sits above the dark frame |
| Surface | `bg-white rounded-lg shadow-sm` | Content cards, the primary reading surface |
| Elevated | `bg-white rounded-lg shadow-md` | Cards on dark backgrounds (hero sections) |
| Overlay | Focus rings, modals | `focus-visible:ring-[3px] ring-ring/50` |

### Shadows

- **`shadow-sm`**: Default for cards on light backgrounds -- subtle, professional
- **`shadow-md`**: Cards on dark backgrounds where more lift is needed
- **No heavy shadows**: The dark-to-light-to-white layering provides depth without box-shadow stacking

### Borders

- Light context cards: `border border-gray-200` (subtle edge definition)
- Dark context elements: `border-medium-bg` (sidebar section dividers)
- Gold accent borders: `border-l-4 border-l-galaxy-gold` (featured content)
- Page header: `border-bottom: 4px solid #FFD700` (gold bottom bar)

### Grid Overlay as Texture

The 24px grid pattern creates a "workflow editor mesh" effect that adds scientific/technical depth to dark surfaces without competing with content. It's purely decorative -- never interactive.

---

## 7. Do's and Don'ts

### Do

- Use Galaxy brand colors (`galaxy-dark`, `galaxy-primary`, `galaxy-gold`, `chicago`) for all brand-facing surfaces
- Reserve gold for high-impact moments: CTAs, active states, accent borders, hero text
- Use `rounded-lg` and `shadow-sm` consistently on content cards
- Make all links `text-galaxy-primary` with `hover:text-galaxy-gold` transitions
- Use `galaxy-dark` (#2C3143) for heading text color
- Use Atkinson Hyperlegible -- never substitute another font
- Apply the grid overlay (`bg-grid-dark`) on dark hero/section backgrounds
- Use the gradient pattern (`galaxy-dark → galaxy-primary` at 135°) for page headers
- Keep prose blockquotes with the gold left border treatment
- Scope Bootstrap compatibility classes under `.bs-compat` -- never leak them globally
- Use `[&>*:first-child]:mt-0 [&>*:last-child]:mb-0` when placing prose inside cards

### Don't

- Don't use generic Tailwind grays (`gray-500`, `slate-600`) for text or backgrounds on brand pages
- Don't overuse gold -- if every element has a gold accent, the signature is lost
- Don't add gold borders to cards on dark backgrounds -- the white card IS the contrast
- Don't use `font-bold` (700) for body text -- reserve it for headings and emphasis
- Don't create new accent colors -- gold is the only accent in the system
- Don't use heavy drop shadows (`shadow-lg`, `shadow-xl`) -- depth comes from the layered background model
- Don't skip the gold bottom border on page headers -- it's a consistent brand element
- Don't hardcode colors in components -- use the Tailwind tokens (`galaxy-dark`, `galaxy-primary`, etc.)
- Don't break the dark/light section alternation rhythm on the homepage
- Don't use different border-radius values across cards (always `rounded-lg`)

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
- **Mobile**: Hamburger icon triggers slide-out menu overlay with full-screen dark background
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
- **Page header**: Title scales from `text-4xl` to `text-3xl` on small screens via `sm:` prefix
- **Homepage hero**: Stats row wraps, server pill links stack
- **Detail sidebars**: `lg:w-80 xl:w-96 2xl:w-1/4 shrink-0` -- fixed widths prevent cramping on medium screens

### Image Behavior

- All images get `rounded-lg` treatment
- Prose images auto-center (`margin-left: auto; margin-right: auto`)
- List item images display inline (`display: inline; margin: 0`) to flow with text
- Images maintain aspect ratio across all viewports

---

## 9. Agent Prompt Guide

### Quick Color Reference

| Token | Hex | When to Use |
|-------|-----|-------------|
| `galaxy-dark` | `#2C3143` | Sidebar bg, header bg, heading text |
| `galaxy-primary` | `#25537B` | Links, table headers, interactive elements |
| `galaxy-gold` | `#FFD700` | CTAs, active states, accent borders, hero highlights |
| `galaxy-gold-dark` | `#D19E00` | Gold hover/pressed states |
| `galaxy-grey` / `chicago` | `#58585A` | Body text, muted content |
| `light-bg` | `#EDF4FA` | Page background |
| `medium-bg` | `#3C435C` | Sidebar borders, search input bg, dark section alternation |
| `dark-bg` | `#2C3143` | Dark sections, hero areas |
| `card-bg` | `#5D678D` | Muted surfaces on dark backgrounds |
| White | `#FFFFFF` | Content cards, reading surfaces |

### Example Component Prompts

- "Create a page header: `linear-gradient(135deg, #2C3143 0%, #25537B 100%)` background with `border-bottom: 4px solid #FFD700`. Add a 24px grid overlay at 3% white opacity. Title at `text-3xl sm:text-4xl font-bold tracking-tight` in white, preceded by a `w-1 h-8 bg-galaxy-gold` accent bar. Description in `text-white/80 text-lg`. Tags as `px-2.5 py-1 rounded-md text-sm border border-white/30 text-white hover:border-galaxy-gold hover:bg-galaxy-gold/20`."

- "Design a content card on light background: `bg-white rounded-lg shadow-sm p-6` with optional gold left border (`border-l-4 border-l-galaxy-gold`) for featured content. Title in `text-xl font-semibold text-galaxy-dark`. Body text in `text-galaxy-grey`. Links in `text-galaxy-primary hover:text-galaxy-gold`."

- "Build a dark hero section: `bg-galaxy-dark` background with `bg-grid-dark` overlay (24px grid, `rgba(255,255,255,0.03)`). Headline in white, key phrase in `text-galaxy-gold`. Stats row with gold numbers. Primary CTA: `bg-galaxy-gold text-galaxy-dark font-semibold px-6 py-3 rounded-lg`. Secondary CTA: `border-2 border-white/30 text-white px-6 py-3 rounded-lg hover:bg-white/10`."

- "Create a sidebar navigation: `w-64 bg-galaxy-dark text-white fixed left-0 top-0 h-screen`. Logo section with bottom border in `border-medium-bg`. Search input: `bg-medium-bg text-white rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-galaxy-gold`. Navigation links in white, collapsible sections."

- "Design a news card grid: 3-column grid on `bg-light-bg`. Each card is `bg-white rounded-lg shadow-sm` with image (rounded-t-lg), date in `text-sm text-galaxy-grey`, title in `text-lg font-semibold text-galaxy-dark`, and a `text-galaxy-primary hover:text-galaxy-gold` read-more link. Add the gold hover bar animation: `absolute left-0 top-0 bottom-0 w-1 bg-galaxy-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-200`."

### Iteration Guide

1. **Font**: Always Atkinson Hyperlegible. Never Inter, never system-ui alone.
2. **Gold is earned**: Only on CTAs, active states, accent borders, and hero highlights. Count the gold elements -- if more than 3 per section, pare back.
3. **Dark/light contrast**: Dark chrome (sidebar, headers) frames light content. Never invert this.
4. **Cards are white**: Content cards are always `bg-white` with `rounded-lg shadow-sm`. On dark backgrounds, skip the gold border.
5. **Links follow the pattern**: `text-galaxy-primary` resting, `text-galaxy-gold` on hover, with transition.
6. **Grid overlay**: Apply `bg-grid-dark` to dark sections for texture. Never on light backgrounds (use `bg-grid` with galaxy-primary tint for light contexts if needed).
7. **Page headers always get the treatment**: Gradient background, grid overlay, gold bottom border, gold accent bar beside the title. This is non-negotiable brand consistency.
8. **Tailwind tokens, not hex**: Use `bg-galaxy-dark` not `bg-[#2C3143]`. The tokens are defined in `global.css` under `@theme`.
