Authoring Guide
===============

These are some tips for writing the Markdown for your articles.

## Inserting HTML

You can use HTML in your `.md` files, but it's best to avoid it when possible. If you must use HTML, you'll have to keep the HTML on a separate line from the Markdown. In fact, you'll need a blank line between every block of Markdown and every block of HTML.*

*Technically this isn't always true. Sometimes HTML can live on the same line as Markdown, but the rules for when this works are not straightforward. You're free to experiment, but it'll keep your life a lot simpler to just keep it all separate.

### HTML wrappers

One common use for HTML is to get the layout you want. Usually you can do thsi by surrounding a bit of Markdown with a `<div>` styled how you'd like:
```markdown
<div class="float-right">

![alt text](./image.jpg)

</div>
```

#### Shrinkwrapping the contents

One issue you can run into with an HTML wrapper is that the Markdown inside will get wrapped in `<p>` tags. Most of the time this is only a problem because of the extra padding it surrounds the Markdown with. Adding the `trim-p` class to the HTML wrapper should remove the padding.

## Images

You can include images in your `.md` files with Markdown syntax (`![alt text](./image.jpg)`). If the image is used in multiple pages, you should put it in the `static/images/` directory, then reference it with an absolute path: `![galaxy logo](/images/logos/galaxy.jpg)`.

If the image is a one-off that's only used for this page, then you can just put it right in the same directory as the `index.md` file. Then reference it with a relative path: `![one-off](./oneoff.jpg)`. **Note** that the `./` is necessary!

It *is* possible sometimes to use images from directories other than the current one or `static/images/`. In those situations you'd just use a relative path like `![nonlocal](./subdir/image.jpg)` or even `![alt text](../sibling/image.jpg)`. But this is not recommended and may not work.

### Resizing images

This framework uses the [remark-attr](https://www.npmjs.com/package/remark-attr) plugin, which allows adding attributes to Markdown images. However, it currently only works for the `width` attribute in pages not requiring `vue-remark`. In that circumstance, you can use this syntax: `![alt text](./image.jpg){width="50"}` (where `50` is the image width in pixels).

Otherwise, you'll have to use a [`<div>` wrapper](#html-wrappers). Add the class `img-sizer` to the `<div>`, then resize it using the `style` attribute. Setting a width should work well, but heights can be tricky.

If you run into issues, try setting the `width` instead of the `max-width` (or `height` instead of `max-height`). If `height` still doesn't work, you might have to calculate the equivalent `width` for your image and set that instead.

Example:
```
<div class="img-sizer" style="width: 40%">

![alt text](./image.jpg)

</div>
```

We are planning to get `remark-attr` working in more situations and with more attributes so you no longer have to use the `<div>` wrapper workaround.

## Escaped characters

Currently there is a known issue with certain special characters like `&` getting backslash escaped (`\&`).

One workaround is to enclose characters like this in backticks: `Q&A` -> ```Q`&`A```

## Lists

If you're adding a sublist to a list, make sure to indent it four spaces:
```Markdown
1. Item one
2. Item two
    * Subitem A
    * Subitem B
3. Item three
```
