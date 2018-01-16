---
title: Visualizations Registry Cookbook
---
## Configuration

### I want my visualization to work on datasets of more than one type

You want to have your visualization to only be available for datasets from a history that are either a BED or GFF
datatype but no other tabular datatypes.

You can have as many tests in a data source in your configuration as you may need. In this case, we can define two
datatype tests, one for each of the two types:
```xml
    <data_sources>
        <data_source>
            <model_class>HistoryDatasetAssociation</model_class>
            <test type="isinstance" test_attr="datatype" result_type="datatype">interval.Bed</test>
            <test type="isinstance" test_attr="datatype" result_type="datatype">tabular.Gff</test>
            <to_param param_attr="id">dataset_id</to_param>
        </data_source>
    </data_sources>
```

Now your visualization will appear for both bed and gff datasets.

### I want my visualization to work on any type of a dataset

Current implementation of the visualization plugin requires you to specify at least one *test* tag. In oder to have the plugin apply to every datatype and display the visualization option, it is necessary to specify the lowest common denominator datatype: *data.Data*.
```xml
    <test type="isinstance" test_attr="datatype" result_type="datatype">data.Data</test>
```


### I want my visualization to work only on datasets produced by a specific tool

You want to have your visualization only to use datasets produced from a specific tool: the 'FASTQ Summary Statistics'
from the tool shed.

You can test the data source's (dataset) attributes using the test type `eq`. This is the default test type, so you
don't have to include the `type="eq"`. In this case, you'll compare the dataset's `creating_job.tool_id` to the
full id of the 'FASTQ Summary Statistics': `toolshed.g2.bx.psu.edu/repos/devteam/fastq_stats/fastq_stats/1.0.0`:
```xml
    <data_sources>
        <data_source>
            <model_class>HistoryDatasetAssociation</model_class>
            <test test_attr="creating_job.tool_id">
                toolshed.g2.bx.psu.edu/repos/devteam/fastq_stats/fastq_stats/1.0.0
            </test>
            <to_param param_attr="id">dataset_id</to_param>
        </data_source>
    </data_sources>
```

Attributes are tested using string comparison - so be aware of how the attribute you're testing is converted to a
string.

This can be done by almost any attribute of a data source accessible by `getattr`. In this case, the ORM-loaded
attribute `creating_job`, then the `tool_id` attribute of that job.


### I want my visualization to work only on datasets that can use a particular DataProvider

You're creating a visualization that uses intervals. No matter what the datatype of dataset is, if each datum
contains a 'chrom', 'start', and 'end' entry the visualization can use it.

[DataProviders](/src/data-providers/index.md) yield data in configurable ways and many dataset datatypes have them. One format they can yield is the
'interval' type of data which yields the three values needed. You can use the `type="has_dataprovider"` test to see
if a dataset (or any data source) has this data provider:
```xml
    <data_sources>
        <data_source>
            <model_class>HistoryDatasetAssociation</model_class>
            <test type="has_dataprovider" test_attr="datatype">interval</test>
            <to_param param_attr="id">dataset_id</to_param>
        </data_source>
    </data_sources>
```

Note: since dataproviders are attributes of a dataset's datatype we need to set `test_attr="datatype"` so that
`<the target HistoryDatasetAssociation>.datatype.has_dataprovider` is called.


```wiki comment
### I want my visualization to be able to load saved visualizations

## Data and how to get it

### I just want the raw data - I'll parse it myself

### I want to get data into a python list

### I want to get data into javascript

## Constructing a visualization using python

### My visualization will use HTML

### My visualization will use SVG

### My visualization will use an image

## Constructing a visualization using javascript

```



## Interaction

### How can I use some of the JavaScript UI elements Galaxy uses in my visualization?

First you'll need to load the base javascript libraries and CSS stylesheets that Galaxy normally includes on every one
of it's pages. Load these in the `head` section of your mako template:
```mako
<!DOCTYPE HTML>
<html>
<head>

${h.css( 'base' )}
${h.stylesheet_link( '/plugins/visualizations/myvis/static/myvis.css' )}

${h.js( 'libs/jquery/jquery',
        'libs/jquery/jquery.migrate',
        'libs/jquery/jquery-ui',
        'libs/bootstrap',
        'libs/require',
        'libs/underscore',
        'libs/backbone/backbone',
        'mvc/ui'
)}
<script type="text/javascript" src="/plugins/visualizations/myvis/static/myvis.js"></script>

</head>
```


Galaxy often uses a `module` loading system called [requirejs](http://requirejs.org/). Although it can seem complex at
first, the example below is often all you have to do to load a Galaxy component:
```javascript
// (from within a script tag in your mako template)

// point require at Galaxy's script directory:
require.config({
    baseUrl: "/static/scripts"
});
// tell it to load the component's file asynchronously
require([
    'mvc/dataset/dataset-choice'
], function( DATASET_CHOICE ){
    // this function is called when the page has loaded the script and
    //  the module is now loaded under the js namespace/obj DATASET_CHOICE

    // when the page is ready:
    $(function(){
    //    ... do something with DATASET_CHOICE
    });
});

```




### How can I add a way for the user to select a different (or additional) datasets?

The javascript libraries for Galaxy have code to create a javascript control to do this. See the section
[above](/src/visualizations-registry/cookbook/index.md#how_can_i_use_some_of_the_javascript_ui_elements_galaxy_uses_in_my_visualization3f)
for information on how to include Galaxy UI components. From within your mako template or scripts, you can
then use this to allow a user dataset choice from datasets in the user's current history:
```javascript
require.config({
    baseUrl: "/static/scripts"
});
require([
    'mvc/dataset/dataset-choice'
], function( DATASET_CHOICE ){
    $(function(){
        // this ajax call will return the full detailed json for all datasets and collections in the current history
        //  it may be useful to cache this if you're adding more than one dataset choice control
        var historyContentsFetch = jQuery.ajax( '/api/histories/'
            + '${ trans.security.encode_id( trans.history.id ) }/contents?details=all' );

        // when the ajax completes successfully, ...
        historyContentsFetch.done( function( datasetJSON ){
            // ... create the controls and add them to the page
            $( '.my-controls' ).append([

                // for a single dataset choice
                new DATASET_CHOICE.DatasetChoice({
                    datasetJSON : datasetJSON,
                    label       : 'Input dataset',
                    // pass in the ids of any datasets you want previously/already selected
                    selected    : [ 'df7a1f0c02a5b08e' ]
                }).render().$el,

                // or to allow selection of multiple datasets
                new DATASET_CHOICE.MultiDatasetChoice({
                    datasetJSON : datasetJSON,
                    label       : 'Input datasets',
                    selected    : [ 'df7a1f0c02a5b08e'  ]
                }).render().$el
            ]);
        });
    });
});

```


See: [this example repository](https://bitbucket.org/carlfeberhard/galaxy-visualization-dataset-choice) for more info.


```wiki comment
### How can I allow user interaction without knowing or using javascript?

### How can I add a way for the user to save a visualization using python?

### How can I add a way for the user to save visualization over the API or with javascript?

```
