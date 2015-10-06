# span

The span macro was downloaded from the [MoinMoin MacroMarket](http://moinmo.in/MacroMarket).  This page was copied and modified from the [span macro homepage](http://moinmo.in/MacroMarket/span).

## Description
You can use this macro to open and close (html) spans

For the content contained in the span you can:
* apply a css class (`css_class` param sets `class` attr)
* give it a id (`id` param/attr)
* set its language (`lang` param/attr)
* set its writing direction (`dir` param/attr)

By definition, a span works only within ONE block, so if you need something for multiple blocks (e.g. multiple paragraphs), you have to open/close it in each block.  See the [div macro](/HelpOnMacros/div) for spanning multiple blocks.

For details about the span html element, see the [span specification on w3.org](http://www.w3.org/TR/html401/struct/global.html#h-7.5.4).

## Examples
```
Supported:
    <<span(red)>>some text contained in a span with css class red<<span>>
    <<span(css_class=red)>>same as above<<span>>
    <<span(id=foobar)>>some text in a span with id foobar<<span>>
```


(!) First argument of `span` macro is css_class, so you can easily give a css class by just specifying its value.

(!) Using `span` macro without parameters makes it close the span.

```
More examples:
    <table>
  <tr>
    <td> works also </td>
    <td> <<span(red)>>in tables<<span>> </td>
  </tr>
</table>

```



## Predefined css classes in moin 1.9
From common.css of modernized theme:
```
.red { background-color: #FFCCCC; }
.green { background-color: #CCFFCC; }
.blue { background-color: #CCCCFF; }
.yellow { background-color: #FFF29F; }
.orange { background-color: #FFD59B; }

.solid { border: 2px solid #000000; padding: 2px; }
.dashed { border: 2px dashed #000000; padding: 2px; }
.dotted { border: 2px dotted #000000; padding: 2px; }

.left { text-align: left; }
.center { text-align: center; }
.right { text-align: right; }
.justify { text-align: justify; }
```


(!) The last few classes (left, center, right, justify) are for replacement of the deprecated `align` attribute.

# Discussion
Whether quotes are necessary or not, would you expect single-quoted arguments to work? Not quoting and double-quoted arguments are OK, but, for example,

```   <<span(id='An-id',title='A Title',css_class='some classes')>```


generates

```   <span class="&#x27;some classes&#x27;" id="A.27An-id.27" title="&#x27;A Title&#x27;">```


## Copyright
See docstring.

## License
See docstring.

# Bugs
Unknown. :)

-- [http://moinmo.in/JimWight](http://moinmo.in/JimWight) <<Date(2011-04-19T16:38:10+0100)>>
