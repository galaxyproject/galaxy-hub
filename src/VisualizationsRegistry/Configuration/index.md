## Data Sources and Tests: What types of data can be visualized
There can be multiple possible sources/target objects defined for each visualization, For example, a visualization may
be applicable to both SAM and BAM files and have a `data_source` defined for each:
```xml
    <data_sources>
        <data_source>
            <model_class>HistoryDatasetAssociation</model_class>
            <test type="isinstance" test_attr="datatype" result_type="datatype">tabular.Sam</test>
        </data_source>
        <data_source>
            <model_class>HistoryDatasetAssociation</model_class>
            <test type="isinstance" test_attr="datatype" result_type="datatype">binary.Bam</test>
        </data_source>
    </data_sources>
    ...
```


When the registry is deciding whether to render a link:

* Each `data_source` is checked in turn.
* If the source of data passes any of the tests in a `data_source` a link is rendered.
* If the `data_source` tests fail, the next `data_source` is checked and the process is repeated until there are no
  more `data_sources`.

In the example above, if the registry was checking a BAM file, the first `data_source`'s tests would fail, the registry
would check the next `data_source`, those tests would pass, and a link would be rendered.

This control flow described above implicitly means that it's better to order `data_sources` from more specific first to
more general after. This allows us to send different or added settings based on the 'cascading' effect of the flow.



#### model_class
Inside each `data_source`, the first test uses the `data_source` sub-element `model_class`. If the target object is
the same python class as the class listed here, then the remaining `data_source` tests are then run.
```xml
        <data_source>
            <model_class>HistoryDatasetAssociation</model_class>
            ...
        </data_source>
```


**`model_class` is the only required test for all `data_sources` and must be defined**.

In the majority of cases, your visualization will be using data from a dataset in a user's history - so
`HistoryDatasetAssociation` will be the proper setting.


#### test
`test` elements define tests to see if a visualization can be applied using the model as a source of data. **If
any single test passes, the visualization is considered applicable** and a link will be rendered (in other words, the
tests are effectively OR'ed). There can be zero or more data_source tests (sometimes just checking the model_class alone
is enough information).

(Note: the `model_class` is an exception to tests being OR'd: it is effectively AND'd to the whole set of tests.)

Test `type`s are currently limited to:

1) **isinstance**: testing a !LibraryDatasetDatasetAssociation or !HistoryDatasetAssociation's `.datatype` attribute
for class inheritance:
```xml
<test type="isinstance" test_attr="datatype" result_type="datatype">data.Newick</test>
```


2) **has_dataprovider**: testing if the attribute of a data_source/model has a specific
[DataProvider](/src/DataProviders/index.md):
```xml
<test type="has_dataprovider" test_attr="datatype">node-edge</test>
```


or 3) **eq**: using string comparison of any model's attribute (the default - no `type`s are required):
```xml
<test test_attr="dbkey">hg18</test>
```


Note that, for `datatype` testing:
* you need to use the datatype module namespace (e.g. `data.Newick` or `tabular.Tabular`)
* the use of isinstance allows you some flexibility for your testing, as any sub-class of a datatype will still pass
  the `datatype` test (e.g. a SAM file will be considered applicable if you test for the `datatype` `tabular.Tabular`)
* datatypes are checked against the datatype registry of your Galaxy installation


---
## Data Sources and to_params: How to define outgoing links to your visualization

Each `data_source` can define zero or more `to_param` elements. Each `to_param` will add one key/value pair
to the query string of the URL of your link **allowing control over what information is contained in your visualization
link and controlling what is passed to your visualization code**. For example:
```xml
    <data_source>
        <model_class>HistoryDatasetAssociation</model_class>
        <test type="isinstance" test_attr="datatype" result_type="datatype">tabular.Sam</test>
        <to_param param_attr="id">dataset_id</to_param>
    </data_source>
    ...
```


In this case, the to_param will take the attribute of the target object 'id' (`param_attr="id"`) and attach a key
value pair on the generated link query string of: `?dataset_id=<the HDAs id>`.

Note: ids are automatically encoded when the link is generated.

The final link generated points to the exposed render method of the visualization.py controller:
```html
<a href="http://localhost:8080/visualization/show/myvis?dataset_id=f7bb1edd6b95db62">My Visualization</a>
```

The visualization name is passed as the first argument and appears after the `show` 'verb'.


Other values can be passed in as well depending on the data source either using the target's attributes or direct
assignment:
```xml
<data_source>
  <model_class>LibraryDatasetDatasetAssociation</model_class>
  <test type="isinstance" test_attr="datatype" result_type="datatype">data.Data</test>
  <to_param param_attr="id">dataset_id</to_param>
  <to_param assign="ldda">hda_ldda</to_param>
</data_source>
```


```#!
<a href="http://localhost:8080/visualization/show/myvis?dataset_id=f7bb1edd6b95db62&hda_ldda=ldda">My Visualization</a>
```





---
## Params: How to parse an incoming link for your template
When the link generated from the `data_source` is used, **resources listed in `params` are parsed from the query string
and sent to the template**. 'Resources' can be considered any data that needs to be parsed or converted from a string
before being sent to the visualization template (primitives such as `int`s or `bool`eans, more complex data such as
models, or lists of either).

The registry uses the `ResourceParser` class located in `lib/galaxy/visualization/plugins/resource_parser.py` to do this.

For example, the scatterplot visualization has the following params (it only needs one 'resource' - the HDA target):
```xml
      <param type="dataset" var_name_in_template="hda" required="true">dataset_id</param>
```


* The text node of the element is the key of the key/value pair in the query string: `dataset_id`
* The `required="true"` attribute tells the registry to throw an error immediately if the `dataset_id` key is not in
  the query string of the incoming link
* The type tells the registry to convert that value into a dataset (implicitly the dataset type receives an id)
* The registry will attempt to get the full model of the dataset (SQLAlchemy `eagerloading` is on)
* The `var_name_in_template` tells the registry to pass the dataset model to the template using the context variable
  name `hda`

Other complex `params` are also parsed:
* `type="hda_or_ldda"`: for visualizations that accept either an HDA or LDDA
* `type="dbkey"`: for visualizations that require the genome build of a target object
* `type="json"`: when data is bundled and passed as JSON (the string will be parsed into a python structure for the
  template)

Primitive types are parsed as well: 'str', 'bool', 'int', 'float' ('str' is the default type).

Besides the `param` attributes above, the following are also available:
* csv : `csv="true"` will split the query string value at commas, and recursively parse each element using the `type`
  attribute sending the final list to the template. For example: `<param type="int" csv="true">indeces</param>` would
  parse the query string key/value pair `?indeces=3,4,9,12&` and send it to the template as: `indeces = [ 3, 4, 9, 12 ]`
* default : you can provide a default value for a param and, if it's missing from the query string, that value will
  be parsed using `type` and sent to the template

Any parameters defined in the `params` section of your config file are available here. In addition, other variables
are available (see [/VisualizationsRegistry/Code](/src/VisualizationsRegistry/Code/index.md) for more info).


## Other configuration options
You can also optionally specify a `render_location` element. This becomes the `target` attribute of the link generated
for your visualizations. If you want the visualization to load in a new window, set this to `_blank`, in the top frame
(and therefore remove the two side panels) use `_top`, or if you're fine loading it in the center panel with both
side panels in place use `galaxy_main` (this is the default `render_location`).


## Troubleshooting
You can **test the validity of your XML registry file** by using the DTD defined in `visualizations_conf.xml` itself.
On the command line:
```bash
xmllint --valid --noout myvis.xml
```


If **there's an error parsing the configuration** of a visualization, you'll find an error similar to this in the
server logs:
```#!
galaxy.web.base.pluginframework WARNING 2014-01-28 10:26:04,147 VisualizationsRegistry, plugin load failed or disabled:
./config/plugins/visualizations/sweepster. Skipping...
```


If a configuration loads successfully and you're **not seeing a link** to it on a dataset or data source that
*should* display one:
* Check the configurations `model_class` - it is case sensitive and the class should be part of `model/__init__.py`
* Check the order of your `data_sources` - order matters here - go from specific first to general
* Check your tests - attributes must be valid attributes of the `model_class`

If **your link isn't turning out properly**, check your `param` definitions. Again, they need to be valid attributes
of the `model_class`.
