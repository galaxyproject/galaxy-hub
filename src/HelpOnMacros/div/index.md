# div

The div macro allows you to apply predefined CSS classes to HTML blocks in this wiki.  It is a modified copy of the [span macro](/HelpOnMacros/span).

For the content contained in the div you can:
* apply a css class (`css_class` param sets `class` attr)
* give it a id (`id` param/attr)
* set its language (`lang` param/attr)
* set its writing direction (`dir` param/attr)

## Examples
```
Supported:
    <div class='red'>some text contained in a span with css class red</div>
```


(!) First argument of `span` macro is css_class, so you can easily give a css class by just specifying its value.

(!) Using `div` macro without parameters makes it close the div.

```
More examples:
    <table>
  <tr>
    <td> works also </td>
    <td> <div class='red'>in tables</div> </td>
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

## Copyright
See docstring.

## License
See docstring.

# Bugs
Unknown. :)

-- [http://moinmo.in/JimWight](http://moinmo.in/JimWight) PLACEHOLDER_DATE(2011-04-19T16:38:10+0100)
