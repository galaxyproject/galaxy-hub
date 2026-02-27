# Contributing to the Galaxy Community Hub

The [Galaxy Community Hub](https://galaxyproject.org/) is the community and documentation website for the Galaxy Project. The site is built with [Astro](https://astro.build/) and content is written in Markdown. Anyone can contribute through GitHub.

## Quick start

Content lives in the `/content/` directory. Each page is an `index.md` file inside a directory whose path becomes the URL:

| File path | URL |
|:--|:--|
| `content/events/2024-workshop/index.md` | `galaxyproject.org/events/2024-workshop/` |
| `content/news/2024-01-update/index.md` | `galaxyproject.org/news/2024-01-update/` |

### Editing an existing page

The easiest way is to use the edit link on any Hub page — click the GitHub icon in the upper right corner. This takes you to the source file in GitHub where you can edit it directly and submit a pull request.

### Creating a new page

In the GitHub web interface, navigate to the appropriate directory under `/content/` and click "Add file" → "Create new file". Name it `your-page-name/index.md` (GitHub will create the directory for you).

**Naming conventions**: Use lowercase letters and hyphens. `community/galaxy-south-africa/` not `community/GalaxySouthAfrica/`.

## Writing content

### Frontmatter

Each file starts with YAML metadata between `---` markers:

```yaml
---
title: "My Page Title"
---
```

Common fields:

| Field | Used in | Description |
|:--|:--|:--|
| `title` | All pages | Page title (required) |
| `date` | News, events | Date in `'YYYY-MM-DD'` format |
| `tease` | News, events | Short description shown in listings |
| `days` | Events | Duration in days |
| `continent` | Events | Two-letter code: AF, AS, AU, EU, GL, NA, SA |
| `location` | Events | `name:` and optional `url:` |
| `tags` | All pages | Array of tags, e.g. `[training, webinar]` |
| `autotoc` | All pages | Show table of contents (default: true) |
| `components` | All pages | Set to `true` to enable interactive components |

### Markdown

Content is written in standard [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/). Prefer Markdown over raw HTML whenever possible — it's easier to maintain and renders more consistently.

### Images

Place images in the same directory as your `index.md` and reference them with relative paths:

```markdown
![Screenshot](./screenshot.png)
```

For images shared across pages, use `/content/images/` with an absolute path.

### Using components

The Hub provides interactive components like icons, video embeds, and social media embeds. To use them, add `components: true` to your frontmatter:

```yaml
---
title: "My Page"
components: true
---

Check out this tool: <Icon name="laptop" />

<Twitter user="galaxyproject" />

<VegaEmbed spec="chart.json" />
```

Available components: `Icon`, `VegaEmbed`, `Twitter`, `Mastodon`, `VideoPlayer`, `Carousel`, `Flickr`, `Supporters`, `Contacts`, `MarkdownEmbed`, `CalendarEmbed`, `Insert`.

**Important**: Files with `components: true` are processed as MDX, which means a few things that work in regular Markdown need different syntax:

- Use `{/* comment */}` instead of `<!-- comment -->`
- Avoid bare `<>` (use `&lt;&gt;`)
- Escape angle brackets before numbers like `<500` (use `&lt;500`)

The `content:lint` check will catch files where `components: true` is missing or unnecessary.

## Running locally

For previewing changes beyond what GitHub's preview offers:

```bash
git clone git@github.com:your-username/galaxy-hub.git
cd galaxy-hub/astro
npm install
npm run dev
```

This starts a dev server at http://localhost:4321 with hot reload. See [astro/README.md](astro/README.md) for build, test, and lint commands.

**Note**: The dev server is case-insensitive for URLs but production is case-sensitive. Always use lowercase URLs.

## Submitting changes

1. Fork the repository and create a branch
2. Make your changes
3. Submit a pull request with a description of what you changed and why

After a PR or two, maintainers will add you to the Editors group so you can commit directly.

## License

The [contents](/content/) of the Galaxy Hub are licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0). The code is licensed under the [MIT License](LICENSE.md).
