---
pagetitle: Wiki Help for , [Log Pages](/Community/Logs)
---


## Verbatim Text

If the markup here does not make sense, click the preview button. 

You can tell the wiki to just present a block of lines verbatim, even ignoring what would otherwise be [valid wiki markup](/HelpOnFormatting)
Markup:
 ```{
```
I didn't know three apostrophes (**) can be used in python as delimiters around 
multi-line strings. I only knew them as **bold** delimiters in wiki. I wonder 
what [/double brackets](/double brackets) mean in python?
So having figured triple quotes for long strings, I reran the program:
% python do_something.py
```

```
}

Result:
 ```
I didn't know three apostrophes (**) can be used in python as delimiters around 
multi-line strings. I only knew them as **bold** delimiters in wiki. I wonder 
what [/double brackets](/double brackets) mean in python?
So having figured triple quotes for long strings, I reran the program:
% python do_something.py
```


## Code Syntax Highlighting

You can also [highlight the syntax of all sorts of different code](/HelpOnParsers#highlight-parser). To do this, use `hightlight`. For example to highlight Python code: 
```{
```python
class FooBar:
    ** doc string **
```

```
}

which renders as:
```python
class FooBar:
    ** doc string **
```

