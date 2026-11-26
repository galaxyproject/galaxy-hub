---
title: Embed ESG4Stars on your site
tease: Iframe snippets and heights for the embeddable ESG4Stars overview sections.
---

Partners can show parts of the [ESG4Stars](/projects/esg4stars/) overview on their own site with a plain iframe. Each part is a small page without the Hub navigation. Its links open the Hub in a new tab, and it shows the same data as the matching section of the Hub page, so it stays current without any change on your site.

## Parts

Each part has its own address under `https://galaxyproject.org/bare/projects/esg4stars/`:

- `head/`: name, status and project facts
- `pillars/`: the five pillars
- `architecture/`: project architecture (work streams)
- `partners/`: the partner table
- `latest/news/`: latest news
- `latest/events/`: latest events

The whole overview in one frame is at `https://galaxyproject.org/bare/projects/esg4stars/`.

## Snippet

Use the part address as `src` and give the frame a title and a height from the table below. Pick the height by the width of the frame, not the width of the screen. The media rule makes the frame taller on narrow screens, where the text wraps more; the phone height is a safe upper bound for frames up to 1100 px wide.

```html
<iframe
  class="esg4stars-part"
  src="https://galaxyproject.org/bare/projects/esg4stars/pillars/"
  title="ESG4Stars: five pillars"
  loading="lazy"
></iframe>

<style>
  .esg4stars-part {
    width: 100%;
    border: 0;
    height: 380px;
  }
  @media (max-width: 1100px) {
    .esg4stars-part {
      height: 590px;
    }
  }
</style>
```

## Heights

The frame does not resize itself, so set a fixed height. These values fit today's content with a little room to spare. Desktop means a frame more than 1100 px wide, phone a frame up to 1100 px wide (the values were measured at 360 px, so they are an upper bound for wider frames).

| Part          | Desktop (px) | Phone (px) | Grows with                                  |
| ------------- | -----------: | ---------: | ------------------------------------------- |
| head          |          580 |        580 | number of project facts                     |
| pillars       |          380 |        590 | number of pillars                           |
| architecture  |          460 |        750 | number of work streams                      |
| partners      |         1060 |       2060 | each partner: +70 px desktop, +160 px phone |
| latest/news   |          210 |        240 | each item (up to 6): +105 px                |
| latest/events |          320 |        450 | each item (up to 5): +105 px                |

A part that is taller than its frame scrolls inside the frame, and a part that is shorter leaves blank space. When a part grows (a new partner, more news), raise its height by the amount in the last column.

Several parts can sit on one page, each in its own frame.

## Search engines

Each part points search engines at the matching section of the Hub page, so search results show the Hub page, not your copy.
