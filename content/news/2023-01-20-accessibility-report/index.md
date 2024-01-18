---
title: "Accessibility in Galaxy 23.0 and beyond"
tease: "Accessibility improvement Highlights for the upcoming 23.0 release, and a few words on accessibility in general"
hide_tease: false
authors: "Laila Los"
date: "2023-01-20"
tags: ["UI/UX", "accessibility", "highlight", esg]
subsites: [global,all,esg,eu]
---

Hello, I'm Laila a front-end developer for Galaxy from the Freiburg team and part of the UI/UX working group. For the forthcoming 23.0 release improving Galaxy's accessibility was a high priority for the UI/UX team. This is a preview of some of the accessibility-related changes we are most excited about.

We would like to bring more attention to accessibility in general and hope to show how an increased focus on accessibility benefits everyone's user experience.

We still have some work to do until Galaxy is as accessible as we want it to be, so please continue reporting any accessibility concerns you run into.

## Tags

The previous tagging component has a few accessibility issues, which can not be solved by us without changing the underlying library.
For this reason, a new tag component was built from scratch.
It's making its debut in the History but will be gradually rolled out across the Galaxy application.
Changes to replace the old tag component are already in the works for Workflows and the Datasets list.

![Assortment of Tags on a History](./TagsOnHistoryDetails.png)

*The new tag component*

### Color

![Tags on a History Item with different colors](./TagColors.png)

Like the old tagging component, the tag's color is determined randomly based on the tag's name, so matching tags can easily be spotted.
Previously HSL was used for this, by choosing a random Hue, and a random lightness within a range.

HSL however has an issue: The lightness is not consistent across the hue spectrum. This means some colors appeared lighter than intended, others darker, making some tags hard to read.

| ![2D HSL color spectrum](./hsl.png) | ![The lightness of HSL shown in a black and white image](./hsl-lightness.png) |
|---|---|
| HSL Color spectrum, mapping hue to saturation with fixed lightness | The same image showing just the perceived lightness value |
*image sources: [HSLuv Comparison Page](https://www.hsluv.org/comparison/)*

For this reason, we switched to a new color space: HSLuv.
This color space offers a uniform brightness across the hue/saturation spectrum, making the brightness of generated colors more predictable.
This also allows us to make more precise adjustments to the color generation in the future.

[Read more about HSLuv](https://www.hsluv.org/)

### Contrast

![Single tag with outline named "#named"](./TagOutline.png)

The tag outline is back! Tags can be hard to tell apart from the background when they have a uniform color.
For this reason the new tag component reintroduces a subtle outline.
The outline does not fully surround the tag, to give it a more modern appearance, while still offering the benefits of improved contrast.

### Autocomplete

![The tags autocompletion menu open, showing some options. Mouse hovering over option "ATACseq", showing a plus icon to the right of the option](./TagAutocomplete.png)

The new Tags have an auto-completion menu.
This menu can be easily navigated with either keyboard or mouse to add or remove tags.
It is also the primary way of deleting tags via the keyboard.
Just search for a previously added tag and press enter to delete it.

The auto-completion contains every tag in use on your Galaxy account.

## Keyboard Navigation in the History

![History items with keyboard highlight](./HistoryKeyboard.png)

Not just the tag component in the history got some keyboard upgrades, but also the history itself.
Every button on the history items is now keyboard focusable, and the items can be expanded via keyboard.

The keyboard focus also only steps into a history item if it is expanded, making it much faster to select the right item from the history.

## Heading Hierarchy, Aria Labels, and Screen-Reader Texts

A lot of markup improvements have been made for screen readers.

All heading elements have been reordered to follow the semantic hierarchy, and heading sizes are now determined by helper classes, instead of the heading level.
This is important for screen readers, and other software, so they can generate a table of content. Read more about heading levels on [W3C](https://www.w3.org/WAI/tutorials/page-structure/headings/) or [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#usage_notes).

An effort was made to make all elements keyboard selectable, and aria labels were added to many elements. This is important to communicate their use to screen readers if it is not obvious from the tag itself. Region aria labels were also introduced, to help differentiate sections of the page from one another. E.g the main content from the sidebars. Read more about labeled regions on [W3C](https://www.w3.org/WAI/tutorials/page-structure/labels/).

Screen-reader only text has also been added in many places where previously only icons communicated an action.

## New font

![Comparison showing the letters "B8 1Iil" sharp and blurred in the Atkinson Hyperlegible font](./BIA_AtkinsonHyerlegible-recognizable-footprints-differentiated-letterforms-transparent.webp)

*image source: [Braille Institute](https://brailleinstitute.org/freefont)*

A small, yet noticeable change. Galaxy used to rely on a stack of system fonts to display and text. This marginally improves loading times when first visiting Galaxy, but has a few downsides:

- Not all system fonts are easy to read. The distinction between similar characters like "I" "l" and "1" can be especially challenging. This is amplified by any visual or other reading impairment
- Text looks different on different devices, making it harder to find places with problematic spacing, or poor readability

To solve both of these problems we switched to an app-wide standard font: "Atkinson Hyperlegible"

It's a free to use font, designed to maximize readability while maintaining a professional and clean look.

Here's a comparison between the old font on Ubuntu, vs the new unified font.

![History name showing "0: I'll find a better name for this History later" in Ubuntu's sans-serif system font](./FontOld.png)

![History name showing "0: I'll find a better name for this History later" in Atkinson Hyperlegible](./FontNew.png)

[Read more about Atkinson Hyperlegible on the Braille Institutes page about the font.](https://brailleinstitute.org/freefont)

## Future Plans

A priority goal for us is to make Galaxy fully usable by keyboard.
Another important addition will be to add even more accessibility-specific testing, to identify outstanding issues and ensure there are no regressions.  We piloted automated accessibility testing in the Galaxy hub (this website!) this year, and expect to roll it out to Galaxy in the next cycle.

## Accessibility is for everyone

Accessibility for applications is a big topic, with many different aspects. Some specific to certain needs, others broad.
Thinking about how we design our application in a more accessible manner, leads to new perspectives on user experience, prioritizing ease of use and focusing on more diverse input methods beyond those we are used to ourselves.

We want to highlight that these changes benefit every user to some degree, making them well worth the effort, and implore you to consider prioritizing accessibility in other projects as well; be it by developing with accessibility in mind, or speaking out for changes favoring accessibility.

A big thank you goes out to everyone who contributed to improving Galaxy's accessibility.
This includes everyone who has reported accessibility issues -- detailed user reports have helped immensely in this effort!
