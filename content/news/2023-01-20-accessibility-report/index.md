---
title: "Accessibility in Galaxy 23.0 and beyond"
tease: "Accessibility improvement Highlights for the upcoming 23.0 release, and a few words on accessibility in general"
hide_tease: false
authors: "Laila Los"
date: "2023-01-12"
tags: ["UI/UX", "accessibility", "highlight"]
subsites: [global]
---

Hello, I'm Laila a front-end developer for Galaxy from the Freiburg team, and part of the UI/UX working-group. For the upcoming 23.0 update improving Galaxy's accessibility was a high priority for the UI/UX team. This is a collection of some of the accessibility related changes I am most excited about.
I'd like to bring more attention to accessibility in general, and hope to show how increased focus on accessibility benefit everybody's user experience.

## Tags

The current tagging component has a few accessibility issues, which can not be solved by us without changing the underlying library.
For this reason a new tag component was built from scratch.
It's making it's debut in the History, but will be gradually rolled out across all galaxy components.

![Assortment of Tags on a History](./TagsOnHistoryDetails.png)

*The new tag component*

### Color

![Tags on a History Item with different colors](./TagColors.png)

Like the old tagging component, the tags color is determined randomly based on the tags name, so matching tags can easily be spotted.
Previously HSL was used for this, by choosing a random Hue, and a random lightness within a range.

HSL however has an issue: The lightness is not consistent across the hue spectrum. This means some colors appeared lighter than intended, others darker, making some tags hard to read.

| ![2D HSL color spectrum](./hsl.png) | ![The lightness of HSL shown in a black and white image](./hsl-lightness.png) |
|---|---|
| HSL Color spectrum, mapping hue to saturation with fixed lightness | The same image showing just the perceived lightness value |
*image sources: [HSLuv Comparison Page](https://www.hsluv.org/comparison/)*

For this reason we switched to a new color space: HSLuv.
This color space offers a uniform brightness across the hue/saturation spectrum, making the brightness of generated colors more predictable.
This also allows us to make more precise adjustments to the color generation in the future.

[Read more about HSLuv](https://www.hsluv.org/)

### Contrast

![Single tag with outline named "#named"](./TagOutline.png)

The tags outline is back! Tags can be hard to tell apart from the background, when they have a uniform color.
For this reason the new tag component reintroduces a subtle outline.
The outline does not fully surround the tag, to give it a more modern appearance, while still offering the benefits of improved contrast.

### Autocomplete

![The tags autocompletion menu open, showing some options. Mouse hovering over option "ATACseq", showing a plus icon to the right of the option](./TagAutocomplete.png)

The new Tags have an autocompletion menu.
This menu can be easily navigated by keyboard or mouse, to add or remove tags.
It is also the primary way of deleting tags via keyboard.
Just search for a previously added tag and press enter to delete it.

The auto-completion contains every tag in use on your galaxy account.

## Keyboard Navigation in the History

![History items with keyboard highlight](./HistoryKeyboard.png)

Not just the tag component in the history got some keyboard upgrades, but also the history itself.
Every button on the history items is now keyboard focusable, and the items can be expanded via keyboard.

The keyboard focus also only steps into a history item if it is expanded, making it much faster to select the right item from the history. 

## Heading Hierarchy, Aria Labels and Screen-Reader Texts

A lot of mark up improvements have been made for screen readers.

All heading elements have been reordered to follow semantic hierarchy, and the headings sizes are now determined by helper classes, instead of the heading level.
This is important for screen readers, and other software, so they can generate a table of content. Read more about heading levels on [W3C](https://www.w3.org/WAI/tutorials/page-structure/headings/) or [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#usage_notes).

An effort was made to make all elements keyboard selectable, and aria labels were added to many elements. This is important to communicate their use to screen readers, if it is not obvious from the tag itself. Region aria labels were also introduced, to help differentiate sections of the page from one another. E.g the main content from the side-bars. Read more about labeled regions on [W3C](https://www.w3.org/WAI/tutorials/page-structure/labels/).

Screen-reader only texts have also been added, to help in places where previously only icons communicated an action.

## New font

![Comparison showing the letters "B8 1Iil" sharp and blurred in the Atkinson Hyperlegible font](./BIA_AtkinsonHyerlegible-recognizable-footprints-differentiated-letterforms-transparent.webp)

*image source: [Braille Institute](https://brailleinstitute.org/freefont)*

A small, yet noticeable and change. Galaxy used to rely on a stack of system fonts to display and text. This marginally improves loading times when first visiting galaxy, but has several down-sides:

- Not all system fonts are easy to read. The distinction between similar characters like "I" "l" and "1" can be especially challenging. This is amplified by any visual or other reading impairment
- Text looks different on different devices, making it harder to find places with problematic spacing, or bad readability

To solve both of these problems we switched to an app-wide standard font: "Atkinson Hyperlegible"

It's a free to use font, designed to maximize readability, while maintaining a professional and clean look.

Here's a comparison between the old font on Ubuntu, vs the new unified Font.

![History name showing "0: I'll find a better name for this History later" in Ubuntu's sans-serif system font](./FontOld.png)

![History name showing "0: I'll find a better name for this History later" in Atkinson Hyperlegible](./FontNew.png)

[Read more about Atkinson Hyperlegible on the Braille Institutes page about the font.](https://brailleinstitute.org/freefont)

## Future Plans

My focus for accessibility will be to make galaxy 100% usable by keyboard.
More accessibility-specific tests also need to be added, to ensure there are no regressions.

## Accessibility is for everyone.

Accessibility for applications is a wide topic, with many different aspects. Some specific to certain needs, others broad.
Thinking about how we design our app in a more accessible manner, leads to new perspectives on user experience, prioritizing ease of use and focusing on more diverse input methods beyond those we are used to ourselves.

I want to highlight that these changes benefit every user to some degree, making them well worth the effort, and implore you to consider prioritizing accessibility; be it by developing with accessibility in mind, or speaking out for changes favoring accessibility.

A big thanks goes out to everyone how contributed on improving galaxies accessability, and reporting accessability issues!

Thank you for reading.
