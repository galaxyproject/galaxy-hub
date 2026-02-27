---
title: Markdown Tips
pretitle: "[Home](/) > [Hub](/hub/) > [Contributing](/hub/contributing/) > [Markdown](/hub/contributing/markdown/)"
components: true
---

These are some tips for writing content on the Hub, including things to know when you need to go beyond basic Markdown.

## Basics

Content is written in [GitHub Flavored Markdown (GFM)](https://guides.github.com/features/mastering-markdown/). This covers headings, bold, italics, links, lists, tables, code blocks, and images. Prefer Markdown over raw HTML whenever possible — it's easier to maintain and renders more consistently across the site.

## Images

Include images in your `.md` files with standard Markdown syntax:

```markdown
![alt text](./image.jpg)
```

Place the image in the same directory as your `index.md`. The build system will copy it to the right place and rewrite the path automatically.

For images shared across multiple pages, put them in `content/images/` and reference with an absolute path:

```markdown
![galaxy logo](/images/logos/galaxy.jpg)
```

## Inserting HTML

You can use HTML in your `.md` files, but keep it separate from Markdown — put a blank line between blocks of Markdown and blocks of HTML. Mixing them on the same line can produce unexpected results.

A common use is wrapping content in a styled `<div>`:

```html
<div class="float-right" style="width: 200px">

![alt text](./image.jpg)

</div>
```

## Components

The Hub has interactive components for common embeds. To use them, add `components: true` to your frontmatter:

```yaml
---
title: "My Page"
components: true
---
```

Then use component tags in your content:

```markdown
<Icon name="laptop" />

<VegaEmbed spec="chart.json" />

<Twitter user="galaxyproject" />

<VideoPlayer src="./demo.mp4" />
```

### Available components

| Component | Purpose | Example |
|:--|:--|:--|
| `Icon` | Lucide icon | `<Icon name="laptop" />` |
| `VegaEmbed` | Vega-Lite chart | `<VegaEmbed spec="chart.json" />` |
| `Twitter` | Tweet embed | `<Twitter user="galaxyproject" />` |
| `Mastodon` | Mastodon embed | `<Mastodon url="..." />` |
| `VideoPlayer` | Video player | `<VideoPlayer src="./video.mp4" />` |
| `Carousel` | Image carousel | `<Carousel />` |
| `Flickr` | Flickr album | `<Flickr />` |
| `Supporters` | Supporter logos | `<Supporters />` |
| `Contacts` | Contact list | `<Contacts />` |
| `MarkdownEmbed` | Embed markdown | `<MarkdownEmbed />` |
| `CalendarEmbed` | Calendar widget | `<CalendarEmbed />` |
| `Insert` | Inline content snippet | `<Insert name="/path/to/snippet" />` |

### MDX compatibility notes

Files with `components: true` are processed as [MDX](https://mdxjs.com/), which adds a few restrictions compared to plain Markdown:

- **Comments**: Use `{/* comment */}` instead of `<!-- comment -->`. HTML comments will cause a build error in MDX files.
- **Bare angle brackets**: `<>` must be written as `&lt;&gt;`.
- **Less-than before numbers**: `<500` looks like a JSX tag to the MDX parser. Use `&lt;500` or put it in backticks: `` `<500` ``.

These restrictions only apply to files with `components: true`. Regular Markdown files are not affected.

## Icon names

Icons use the [Lucide](https://lucide.dev/icons/) icon library. Browse the full set at [lucide.dev/icons](https://lucide.dev/icons/) and use the icon name in the `name` attribute:

```markdown
<Icon name="laptop" />
<Icon name="calendar" />
<Icon name="external-link" />
```

## Lists

If you're adding a sublist, indent it four spaces:

```markdown
1. Item one
2. Item two
    * Subitem A
    * Subitem B
3. Item three
```

## File download links

To link to a downloadable file, place it in `content/media/` (for non-images) or `content/images/` (for images) and use an absolute path:

```markdown
[click to download](/media/paper.pdf)
```

Relative paths to files in the same directory also work for images and PDFs that live alongside the content.
