## Data Providers

DataProviders are a framework for easily controlling how data can be provided from a source
(generally, a dataset's file contents). They are meant to be:

1. Simple to declare, configure, and associate with some source of data.
2. Maintain simplicity by allowing piping - sending one provider through one or more others until a final, desired format/query is provided.
3. Be fast and efficient by allowing narrow queries that provide only specified amounts of data from specified locations.

They are *not* meant to be:

1. Replacements for the tools and workflows through which Galaxy provides reproducibility.
2. Writable in any sense. They can't alter the original data in any permanent fashion.

Essentially, they are meant to be a 'view' of your data and not the data themselves.

Currently, data providers are only available for the file contents of a dataset.

For more examples than are on this page, see [/DataProviders/Cookbook](/DataProviders/Cookbook).


---
## How to get data using DataProviders

Currently, there are two entry points to data providers for datasets:
* Programmtically (typically in a visualization template or other python script) by calling a datatype's `dataprovider`
  method and passing in (at a minimum) the dataset and the name of a particular format/dataprovider
* Via the datasets API (which itself calls the `dataprovider` method)


#### datatype.dataprovider

If a datatype does not have the provider assigned to the given name, an error is raised. If it does, any additional
parameters to the method are parsed and a python generator is returned. This generator will yield individual data
based on the type of provider (and the additional arguments).

For example, given dataset contents in a tabular file called 'dataset1':
```
# yet another data format
1   10  11  110
2   20  22  220

3   30  33  330
```


within a visualization template or python script, one could get each line as an array of columnar data by calling:
```python
for array in dataset1.datatype.dataprovider( dataset1, 'column' ):
    print array
# [ "1", "10", "11", "110" ]
# [ "2", "20", "22", "220" ]
# [ "3", "30", "33", "330" ]
```

Note: When using text file datatypes, both comments (lines beginning with '#' - although this is configurable) and
blank lines are stripped from the output.

Pass in additional arguments to filter or configure output by adding keyword arguments to the provider. For example,
to limit the above to only two lines and offset by one line:
```python
for array in dataset1.datatype.dataprovider( dataset1, 'column', limit=2, offset=1 ):
    print array
# [ "2", "20", "22", "220" ]
# [ "3", "30", "33", "330" ]
```


To have the server parse the contents as numbers:
```python
types = [ 'int', 'float', 'int', 'float' ]
for array in dataset1.datatype.dataprovider( dataset1, 'column', column_types=types ):
    print array
# [1, 10.0, 11, 110.0]
# [2, 20.0, 22, 220.0]
# [3, 30.0, 33, 330.0]
```



#### The datasets API

You can access data providers for a dataset via the datasets API by passing the provider name as an argument (for more
information on how to use the API see [/Learn/API](/Learn/API)).

```bash
curl 'http://localhost:8080/api/datasets/86cf1d3beeec9f1c?data_type=raw_data&provider=column&limit=2&offset=1&api_key=cf8245802b54146014108216e815d6e4'
{
    "data": [
        [
            "2",
            "20",
            "22",
            "220"
        ],
        [
            "3",
            "30",
            "33",
            "330"
        ]
    ]
}
```

Note: that the API returns a [JSON](http://www.json.org/) formatted object and the array of data is an attribute of
that object named 'data'. This allows the API to send additional information (such as number of datapoints, metadata,
aggregate information, etc.) as other attributes if needed.

Commonly, the API will be accessed by a javascript client (e.g. the browser window in a visualization). For example,
getting data through the API with [jQuery](http://jquery.com/):

```javascript
var xhr = jQuery.getJSON( "/api/datasets/86cf1d3beeec9f1c", {
    data_type : 'raw_data',
    provider  : 'column',
    limit     : 2,
    offset    : 1
});
xhr.done( function( response ){
    console.debug( response.data );
    // [["2", "20", "22", "220"], ["3", "30", "33", "330"]]
    // ...do something with data
});
```



There are many data providers included in Galaxy already.

For all formats:
* base:    reads directly from the file without any formating or filtering
* chunk:   allows breaking file contents into sections of `chunk_size` bytes and offsetting using `chunk_index`
* chunk64: as chunk, but encodes each section using base64 encoding

For text based formats:
* line:    reads each line from a file, allowing limit, offset, filter functions (in python), removes blank lines,
  removes commented lines, strips whitespace from beginning and end of lines (all configurable)
* regex-line: as 'line' provider above also allowing `regex_list`, a list of python regex strings. If a line matches
  one or more of the regex expressions in `regex_list`, the line is output. Also allows inverting the match using
  `invert`.

For tabular formats:
* column:  lines are returned as arrays of column data (as above). Many options are available for this provider
  including:
  * indeces: return only the columns specified by a 0-based, comma separated list of integers (e.g. '0,2,5')
  * column_count: return only the first N columns from each line
  * deliminator: defaults to the tab character but can be used to parse comma separated data as well
  * column_types: a CSV string of python primitive names used to parse each column (e.g. 'str,int,float,bool').
    Can works in tandem with indeces to parse only those columns requested.
* dict:    return each line as a dictionary. Keys used should be sent as `column_names`, a CSV list of strings
  (e.g. column_names='id,start,end'). Based on the `column` provider and allows all options used there.

Dataset specific providers for text and tabular formats:
* You'll often see these used in the built-in providers (e.g. those found in `datatypes/tabular.py`). They attempt
  to infer the proper column settings for other providers by using a dataset's metadata (column names, types, etc.)
* dataset-column: as the column provider, but infers `column_types` from metadata (for easier parsing)
* dataset-dict: as the dict provider, but infers `column_names` from metadata. Names can be overridden by
  still passing in `column_names`.

For interval datatypes:
* genomic-region and genomic-region-dict: parses and returns chromosome, start, and end data as arrays or dictionaries
  respectively.
* interval and interval-dict: as genomic-region, but also returns strand and name if set in the metadata.

Other providers can be found within the datatype class definitions for datatypes included in Galaxy.


---
## How to filter and format data using DataProviders

Although still a work in progress, you can use several aspects of existing data providers to easily filter data both
with python or through the API.

Python is currently the more powerful option. For example, in a visualization template one could pass a filter
function to a 'genomic-region-dict' provider:
```python
def position_within_point( self, datum ):
def filter_chr10( datum ):
    chr = datum.split( '\t' )[0]
    if chr == 'chr10':
        return datum
    return None
for region in hda.datatype.dataprovider( hda, 'genomic-region-dict', limit=2, offset=1, filter_fn=filter_chr10 ):
    print region
# {'start': 180404, 'end': 300577, 'chrom': 'chr10'}
# {'start': 180423, 'end': 295729, 'chrom': 'chr10'}
```


Through the API, (currently) the easiest way is to use the `regex_list` argument:
```javascript
var xhr = jQuery.getJSON( "/api/datasets/86cf1d3beeec9f1c", {
    data_type : 'raw_data',
    provider  : 'genomic-region-dict',
    limit     : 2,
    offset    : 1,
    regex_list : '^chr10\\b'
});
xhr.done( function( response ){
    console.debug( response.data );
    // [Object { chrom="chr10", end=300577, start=180404}, Object { chrom="chr10", end=295729, start=180423}]
});
```

(Note: the double slash escaping of '\\b' which allows us to send the regex with a proper, final '\b' and not the
ascii bell character)

For more filters, see: [Filtering using calculations](/DataProviders/Cookbook#no2c_i_want_to_filter_my_data_using_a_calculation_-_not_regex)
in the cookbook.

---
## How to define a new DataProvider

Since data providers are nothing more than fancy python generators, there are three ways to create a new data provider:
* Create a new DataProvider class and inherit from an existing provider and modify it's methods
* Instantiate an existing provider and pipe its output into a new generator
* Hardcode or override the option arguments available for an existing provider (e.g. create a csv column provider by
  wrapping the column provider with `deliminator=','`)

It's also possible to create a provider outside the datatypes - for instance, inside a script or visualization template.

#### Adding a provider to a datatype

In general, data providers will most often be associated with a dataset datatype. Since it's also common that new
tool installations can have datatype definitions, we wanted it to be easy to define new data providers for those
datatypes.

Within your datatype (or an existing one), create a method that returns an instance of your data provider. Decorate
the method with `dataproviders.decorators.dataprovider_factory` and give that decorator the name of your provider
(e.g. 'column') and a dictionary of the settings you want the provider to use. The name should be unique to prevent
collision with other existing providers.

Let's say we've defined a datatype that is CSV and has 20 columns of data. We'd like to provide the same format for
data that the GenomicRegionDataProvider does (chrom, start, end) so we'll implement a provider to get that same
data from our datatype:
```python
from galaxy.datatypes import tabular
from galaxy.datatypes import dataproviders
from galaxy.datatypes.dataproviders.dataset import GenomicRegionDataProvider
# ...

@dataproviders.decorators.has_dataproviders
class MyDatatype( tabular.Tab ):
    # a datatype that for some reason is ordered as: end_position, start_position, chromosome_id
    # ...
    @dataproviders.decorators.dataprovider_factory( 'genomic-region-dict', GenomicRegionDataProvider.settings )
    def overlap_dataprovider( self, dataset, **settings ):
        dataset_source = dataproviders.dataset.DatasetDataProvider( dataset )
        settings[ 'deliminator' ] = ','
        settings[ 'indeces' ] = [ 4, 8, 9 ]
        settings[ 'column_names' ] = [ 'chrom', 'start', 'end' ]
        return GenomicRegionDataProvider( dataset_source, **settings )
```

Note: while you're not limited to re-creating the existing output formats (like 'genomic-region-dict'), implementing
them in your datatype may allow existing consumers of data providers (for example, a visualization that expects
'genomic-region-dict' formatted data) to use your datatype 'right off the shelf'.

The settings variable passed to the decorator (`GenomicRegionDataProvider.settings` in the example above)
are a list of the options that will be parsed on a query string before being sent to the dataprovider. In other words,
when a provider is called from the API many of its options can be passed over the url in the query string:
```bash
curl 'http://localhost:8080/api/datasets/86cf1d3beeec9f1c?data_type=raw_data&provider=column&limit=2&offset=1'
```


The settings variable of the column data provider is a class level dictionary containing keys matching options to be
parsed and values that are the final form to parse those options into (from the query string):

```python
class ColumnarDataProvider( line.RegexLineDataProvider ):
    # ...
    settings = {
        'indeces'       : 'list:int',
        'column_count'  : 'int',
        'column_types'  : 'list:str',
        'parse_columns' : 'bool',
        'deliminator'   : 'str'
    }
```


This ensures that indeces within an API call's query string (`indeces=1,2,3`) will be correctly sent to the column
data provider as [ 1, 2, 3 ], `column_count` as a boolean, etc.

It's generally enough to use the settings of an existing provider, but you may want to make your own options available
in addition to existing settings.


For more examples than are on this page, see [/DataProviders/Cookbook](/DataProviders/Cookbook).

```wiki comment
---
## Troubleshooting

#### Errors
```

