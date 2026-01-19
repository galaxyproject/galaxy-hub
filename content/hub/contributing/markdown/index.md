---
title: Advanced Markdown
pretitle: "[Home](/) > [Hub](/hub/) > [Contributing](/hub/contributing/) > [Markdown](/hub/contributing/markdown/)"
---

These are some tips for when you need to go beyond basic Markdown for your articles.

## Inserting HTML

You can use HTML in your `.md` files, but it's best to avoid it when possible. If you must use HTML, you'll have to keep the HTML on a separate line from the Markdown. In fact, you'll need a blank line between every block of Markdown and every block of HTML.*

*Technically this isn't always true. Sometimes HTML can live on the same line as Markdown, but the rules for when this works are not straightforward. You're free to experiment, but it'll keep your life a lot simpler to just keep it all separate.

### HTML wrappers

One common use for HTML is to get the layout you want. Usually you can do this by surrounding a bit of Markdown with a `<div>` styled how you'd like:
```html
<div class="float-right">

![alt text](./image.jpg)

</div>
```

#### Shrinkwrapping the contents

If you end up with extra space around your wrapped Markdown, try adding the [`trim-p`](#trim-p) class to the wrapper.

## Images

You can include images in your `.md` files with Markdown syntax (`![alt text](./image.jpg)`). If the image is used in multiple pages, you should put it in the `static/images/` directory, then reference it with an absolute path: `![galaxy logo](/images/logos/galaxy.jpg)`.

If the image is a one-off that's only used for this page, then you can just put it right in the same directory as the `index.md` file. Then reference it with a relative path: `![one-off](./oneoff.jpg)`. **Note** that the `./` is necessary!

It *is* possible sometimes to use images from directories other than the current one or `static/images/`. In those situations you'd just use a relative path like `![alt text](./subdir/image.jpg)` or even `![alt text](../sibling/image.jpg)`. But this is not recommended and may not work.

### Resizing images

This framework uses the [remark-attr](https://www.npmjs.com/package/remark-attr) plugin, which allows adding attributes to Markdown images. However, it currently only works for the `width` attribute. It uses this syntax: `![alt text](./image.jpg){width="50"}` (where `50` is the image width in pixels).

If you'd like to resize your image in any other way (percentages, `max-width`, `height`, etc), you'll need to use a [`<div>` wrapper](#html-wrappers). Add the class `img-sizer` to the `<div>`, then resize it using the `style` attribute. Some CSS properties will work better than others: widths are the most reliable, `max-` or `min-` prefixes usually work, but heights can be tricky.

Example:
```html
<div class="img-sizer" style="width: 40%">

![alt text](./image.jpg)

</div>
```

We are planning to get `remark-attr` working in more situations and with more attributes so you no longer have to use the `<div>` wrapper workaround.

### Centering *and* resizing images

Usually, you can just add the `.center` class to an element and it does the trick. But if you're using the method above to resize and image *and* you'd like to center it, there's an extra step.

You'll have to wrap the `.img-sizer` div in another div, and then add `.center` to *that* div:
```html
<div class="center">
  <div class="img-sizer" style="width: 750px">

![alt text](./image.jpg)

  </div>
</div>
```
If you're curious, this is because the `.center` class sets `text-align: center` on its element, which causes its contents to move to its center. Just adding it to the same `<div>` you put `.img-sizer` on doesn't work for two reasons. The simpler issue is that the Markdown image will be wrapped in a `<p>`, which is a block element. `text-align: center` only works on inline elements. The other issue is that you also set the size of the `.img-sizer` `<div>` in its `style` attribute, and if you did it by `width`, that means that `<div>` is no longer the full width of the content. `text-align: center` puts the element's *contents* in the center of itself, but if the element itself is the same size as its contents, then there's nowhere for its contents to move to. So we need to create an additional parent element which remains full width and gets the `.center` class. Then its child (the `.img-sizer` `<div>`) can be resized smaller and find its place in the center of its parent.

## Helper classes

There are several HTML classes that can be useful when trying to get your Markdown to display right. Just add the class to an HTML wrapper around the relevant Markdown.

### `trim-p`

One issue you can run into with an HTML wrapper is that the Markdown inside will get wrapped in a `<p>` tag. Usually the only issue this causes is it inserts extra padding around the wrapped Markdown. Adding the `trim-p` class to the HTML wrapper should remove the padding.

### `inline-p`

Another issue caused by Markdown getting wrapped in a `<p>` tag is that it becomes a block element. This means it ends up on its own line and can't be used in the middle of a line of text. Add `inline-p` to the wrapper to make it display inline instead.

### `inline-div`

In other situations, you could find yourself with a `<div>` inside your wrapper and it's messing up your layout. If making that `<div>` display inline would help, you can apply this class.

### `img-sizer`

See [Resizing images](#resizing-images).

### `autowidth`

Use this in an image wrapper to set the `width` CSS property of the `<img>` to `auto`. This can help if you're trying to get several images to line up horizontally like in [/events/cofests/papercuts/](/events/cofests/papercuts/).

### `expand-img`

If you find that an image you're using is smaller than the area provided for it, you can use this class to make it fill that space.

### `no-header`

Tables in Markdown are required to have a header row, or it won't be recognized as a table. If you'd like to make a table without a header, just add an empty header and wrap it in a `<div>` with the `no-header` class. This will hide any header rows.

### `compact`

Use this class to tighten up the rows in a table. This will removing some of the padding above and below the text in each cell and between lines of text. This lets the table take up less vertical space.

## Escaped characters

Currently there is a known issue with certain special characters like `&` getting backslash escaped (`\&`).

One workaround is to enclose characters like this in backticks: `Q&A` -> ```Q`&`A```

## Lists

If you're adding a sublist to a list, make sure to indent it four spaces:
```markdown
1. Item one
2. Item two
    * Subitem A
    * Subitem B
3. Item three
```

## File download links

Often, you might want to insert a hyperlink to a file so the reader can download it or view it on its own. You might just drop the file into the same directory as the Markdown file, then insert a link like `[click to download](./paper.pdf)`.

But this sort of "local" link often gets broken in the build process. So it's best to place the file in a static directory: either `content/images/` (for images) or `content/media/` (for non-images). Then you can link to it there using an absolute link:

```markdown
[click to download](/media/paper.pdf)
```
