---
autotoc: true
title: [DataProviders](/DataProvider),  Cookbook
---

<div class='left'></div>

This is a collection of examples outlining both using and creating [/DataProviders](/DataProviders).

## Using existing providers
---
#### I want to paginate my incoming data

You want to look at sets (or pages) of data points from your dataset 1000 at a time and have an easy way
to move between those sets.

This can be accomplished with most text based datatypes using the `limit` and `offset` options:
```python
def paginate_column_data( dataset, page_size, curr_page, **more_options )
    limit = page_size
    offset = curr_page * page_size
    return list( dataset1.datatype.dataprovider( dataset1, 'column',
        limit=limit, offset=offset, **more_options ) )

page1 = paginate_column_data( dataset1, 1000, 0 )
page2 = paginate_column_data( dataset1, 1000, 1 )
# ...
```

Note: since data providers return generators, make sure to use `list` in order to 'compile' the lines into a list
if that's what you need.

Notes on limit and offset:
* Filtered data (such as blank lines, comment lines, or non regex matching lines) do not apply to the limit or offset -
  only the final, valid data.
* Negative or zero limits (or if the dataset has no data) will return an empty list/generator
* Limits above the number of lines/data in your dataset will return only the amount available (it will not error
  or be padded with None values, etc.). In the above example, the last 'page' may not have 1000 lines but you don't
  have to worry about that - it will send only the remainder without any calculations needed.
* Negative offsets will be treated as offset = 0 (the beginning)
* Offsets past the total number of lines/data in your dataset will return an empty list/generator (no errors)


---
#### I want to filter my data

You want to only use data that contains the string 'exon' in the third column of your dataset data.

This can be accomplished using the `regex_list` option:
```python
exons = list( hda.datatype.dataprovider( hda, 'column', regex_list=[ '\S+\s+\S+\s+exon' ] ) )
```


If 'exon' could appear in either the third or fourth column you could add another regex expression:
```python
exons = list( hda.datatype.dataprovider( hda, 'column', regex_list=[ '\S+\s+\S+\s+exon', '\S+\s+\S+\s+\S+\s+exon' ] ) )
```


To filter these *out*, set the `invert` option to True:
```python
regex_list = [ '\S+\s+\S+\s+exon', '\S+\s+\S+\s+\S+\s+exon' ]
non_exons = list( hda.datatype.dataprovider( hda, 'column', regex_list=regex_list, invert=True ) )
```


Notes on `regex_list`:
* Expressions are compared against full lines of data. Whitespace at the beginning and end of the line is stripped
  beforehand and no comparisons are made against blank lines or comment lines (unless included explicitly).
* When sending regex expressions over the API your client may URL encode the expression - be careful to use proper
  escaping (e.g. '\b' must be '\\b').
* A line of data is considered matching if *any* of the expressions match (as opposed to all).
* Under the hood, re.match is used for the filtering. It may be useful to try your expressions in a REPL if you have
  problems.


---
#### No, I want to filter my data using a calculation - not regex

You can pass column-based filters into any dataprovider that is derived from `ColumnDataProvider` including
'dataset-column', 'dict', 'genomic-region', and 'interval'. `filters` is passed into python as a list of strings. Each
string is a 3-tuple of `( column_index, operator, value )` separated by hyphens. For example, to filter returned lines
to only those that are greater than or equal to 20000 in the 2nd column:
```python
data = list( hda.datatype.dataprovider( hda, 'column', filters=[ '1-ge-20000' ] ) )
```


Filters are AND'ed together.

These types of filters can be passed to the API as well by sending as a comma-separated-list:
```javascript
    jQuery.ajax( '/api/datasets/' + id, {
        data : {
            data_type   : 'raw_data',
            provider    : 'dataset-column',
            limit       : 200,
            offset      : 200 * currPage,
            // get anything in chr1 between 20000 and 50000
            filters     : [ '0-eq-chr1', '1-ge-20000', '2-lt-50000' ].join( ',' )
        }
    })
```


The operators available depend on the column type:

* numeric:
  * 'lt': is less than 'value'
  * 'le': is less than or equal to 'value'
  * 'eq': is equal to 'value'
  * 'ne': is not equal to 'value'
  * 'ge': is greater than or equal to 'value'
  * 'gt': is greater than 'value'
* string:
  * 'eq': column exactly equals 'value'
  * 'has': contains the substring 'value'
  * 're': matches the regular expression 'value'
  

You may also want to create your own filter function. Pass a function into any `LineDataProvider`-derived provider
under the `filter_fn` keyword argument:
```python
def filter_start_lt_10k( line ):
    try:
        start_pos = int( line.split( '\t' )[1] )
        if start_pos >= 10000:
            return line
    except:
        pass
    return None
data = list( hda.datatype.dataprovider( hda, 'column', filter_fn=filter_start_lt_10k ) )
```


Notes:
* This only works in python and is not available over the API
* The `filter_fn` is passed the unparsed line (rather than columns or parsed columns). You won't receive blank lines
  or comment lines, however (unless another option changes that), and whitespace is removed from the front and end
  of the line.
* Return `None` from the `filter_fn` to effectively filter out a line.
* You can also return a modified version of the line (partial data, re-formatting, etc.).
* Data filtered in the above way works with limit and offset.

Alternately, you can of course filter directly *after* the provider yields the data:
```python
def generate_lt( dataset, pos, **options ):
    for col_list in hda.datatype.dataprovider( hda, 'column', **options ):
        if col_list[1] >= pos:
            yield col_list
```

Note that this pattern does not play well with limit and offset.



---
#### I want to sort my data using a DataProvider

Unfortunately, this is currently un-implemented. You can still however use the installed sort tool to sort the data
into a new dataset before-hand or sort after the data have been provided in your client, script, or template.


---
#### My data has comment lines that don't start with '#'

Many of the default behaviors of (text-based) DataProviders are configurable:
* to change which lines are considered comments and filtered out, set `comment_char`; to not filter out *any* lines
  as comments set this to `None`.
* to include blank lines in your data, set `provide_blank` to `True`.
* to include the original whitespace (including newline characters) that may occur at the beginning and end of your
  lines of data, set `strip_lines` to `False`.
* to include the original whitespace but remove the newline characters, set `strip_lines` to `False` *and*
  `strip_newlines` to `True`.


---
#### I want to use some data in a visualization template using python

Most of the examples that use python both here and in [/DataProviders](/DataProviders) should be good starting points for
visualizations in python.


---
#### I want to use some data in a visualization template using !JavaScript

You want to get the data into javascript for use with a graphing library or some other javascript technology. There
are two points in the visualizations execution where you might want to do this:
1. 'Bootstrapping': rendering the data as JSON using the Mako + the server *before* it's sent to the browser
2. Via AJAX and the API: getting data (or more data) when the user interacts with your page after it's been sent

You can bootstrap JSON data by using a combination of python and javascript:
```mako
<script type="text/javascript">
<%
    # first 3000 only - we'll load the rest later
    data = list( hda.datatype.dataprovider( hda, 'interval-dict', limit=3000 ) )
%>
var bootstrappedFirstPage = ${h.to_json_string( data, indent=2 )};
// draw this page...
</script>
```

This works because the stringified JSON will be printed as a !JavaScript object literal. If you use this, you can open
your visualization's page in the browser using 'show page source' - the data will be printed there in JSON form.

You can also access data providers through the datasets API using an AJAX call within your page (here, we'll use
jQuery's ajax framework - you can use whatever your comfortable with):
```javascript
<script type="text/javascript">
    // ...
    $button.click( function( ev ){
        var button_page = $button.data( 'page' );
        var xhr = jQuery.getJSON( "/api/datasets/" + encodedHdaId, {
            // we need to send both the raw_data data_type and the provider name
            data_type : 'raw_data',
            provider  : 'interval-dict',
            limit     : 3000,
            offset    : ( button_page * 3000 )
        });
        xhr.done( function( response ){
            // draw the next page...
        });
    })
</script>
```



---
## Defining new providers

If you have a new datatype to add to Galaxy or you need functionality that none of the existing providers can give,
you may want to define a new [DataProvider](/DataProviders).

There are several ways to define new providers:
* Create a method that uses existing provider classes, modifying their options or output in the method.
* Compose a new provider from several other existing providers.
* Create a new provider class.


---
#### I want an easy way to define a provider for a new format

You have a new format with key/value pairs that:
* uses equal signs surrounded by spaces for separation
* considers lines starting with a semicolon to be comments
* each value in the key/value pair is a number or blank
* and whitepace is important and should be kept in
```
; Some crazy format developed in the 80's for use with dot-matrix printers
samples taken = 24
samples processed = 23
interns left =
    missed the grant by = 1
money recvd = 0.00
```


You can override the settings/options for existing providers, wrap it in a function, and return the provider:
```python
from galaxy.datatypes.dataproviders import column
def provide_key_value( dataset, **settings ):
    settings[ 'deliminator' ] = ' = '
    settings[ 'comment_char' ] = ';'
    settings[ 'column_types' ] = [ 'str', 'float' ]
    settings[ 'strip_lines' ] = False
    settings[ 'strip_newlines' ] = True
    return column.ColumnarDataProvider( dataset, **settings )

for pair in provide_columns_for_my_format( hda ):
    print pair

# ['samples taken', 24.0]
# ['samples processed', 23.0]
# ['interns left', None]
# [' missed the grant by', 1.0]
# ['money recvd', 0.0]
```



---
#### I want to add my provider to a datatype

You now want to add `provide_columns_for_my_format` to your new datatype `MyFormat`. In it's datatype class definition
you'd need two things:
1. Decorate your `MyFormat` datatype class with `@dataproviders.decorators.has_dataproviders`. This sets up a class
  to use dataproviders.
2. Add your method to the datatype class and decorate that method with `@dataproviders.decorators.dataprovider_factory`
  sending a name for the format provided and a `settings` map of options for the method/provider you want available
  through the API (for more information on this variable see 'I want the options my provider uses available over the
  API').

```python
from galaxy.datatypes.dataproviders import decorators
from galaxy.datatypes.dataproviders import column

@decorators.has_dataproviders
class MyFormat( data.Text ):
    # ...

    @decorators.dataprovider_factory( 'key-value', column.ColumnarDataProvider.settings )
    def provide_columns_for_my_format( hda, **settings ):
        # ...

# then - elsewhere...
for pair in myformatted_dataset.datatype.dataprovider( myformatted_dataset, 'key-value', limit=1 ):
    print pair

# ['samples taken', 24.0]

```


This pattern is used often for more semantic providers (`IntervalDataProvider`, `GenomicRegionDataProvider`) to pluck
start, end, and chrom values from various datatypes even though they may appear in different columns.



---
#### None of the existing providers do what I want - but I'd still like to keep it simple

Another way of creating a new provider from existing providers is to compose one from the others.

In the following pattern which is seen throughout this cookbook, we use a dataset as a *`data_source`*:
```python
for datum in dataset.datatype.dataprovider( dataset, 'my-provider' ):
    print datum
```


The `data_source` for data providers can be any python iterator, including any other [DataProvider](/DataProviders):
```python
dataprovider1 = MyFirstDataProvider( dataset, setting1=... )
dataprovider2 = MySecondDataProvider( dataprovider1, setting2=... )
for datum in dataprovider2:
    print datum
```

When a fully formatted, filtered, and parsed datum is yielded from `dataprovider1` it then will be passed to
`dataprovider2` where it can be further formatted, filtered, or parsed.


---
#### I want to define a new DataProvider class

This is the most powerful but complex ways to create a new data provider.

All [DataProvider](/DataProviders) classes should inherit at least from `datatypes.dataproviders.base.DataProvider`. If
you'll be working with a data format where each datum is contained on a line, you may want to start with either the
!FilteredLineDataProvider or the !RegexLineDataProvider. If it takes more than one line to create a single datum (e.g.
MAF format), you may want to start with the !BlockDataProvider.


---
#### I want the options my provider uses available over the API

Settings:

In order for your providers options to be available and parsed properly from a query string (from an API call),
you'll need a class level dictionary named `settings` containing the keyword arguments that should be parsed and sent to
your provider's `__init__` method. For example, the `FilteredLineDataProvider` has the following `settings` variable:
```python
    settings = {
        'strip_lines'   : 'bool',
        'strip_newlines': 'bool',
        'provide_blank' : 'bool',
        'comment_char'  : 'str',
    }
    def __init__( self, source, strip_lines=True, strip_newlines=False, provide_blank=False,
                  comment_char=DEFAULT_COMMENT_CHAR, **kwargs ):
        # ...
```

