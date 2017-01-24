## Creating a mako template file for your visualization

Besides creating a registry entry in the XML file, the bulk of your code will be in your visualization template.

`template` is a required sub-element of the visualization XML element and the text node should be the *basename*
of your visualization template file. The registry will normally look for that file in the `templates` directory of
your plugin's base directory.


You can override the directory it looks for these by using the sub-element `template_root` which
should be a filesystem path stemming off of `templates/webapps/galaxy`.
*/

Currently, you are not required to inherit your template from any other template (such as `base.mako`), but this may
change in the future.


#### A Design Goal

The design goal of this part of the framework is to provide options and get out of your way. Your template will be
provided the data you specified from a link you planned, now the choice of rendering technologies, UI/interactivity,
and procdures or algorithms is up to you. In other words, **the goal is not to have the framework do your visualization
programming for you but to have it do your Galaxy programming for you**. (Although we will provide components to
make many things as easy as possible.)

Since the template system Galaxy currently uses is the Mako template system, the first possible jumping off point is
python. Your template could use any number of technologies through python:
* [matplotlib](http://matplotlib.org)
* [gnuplot](http://gnuplot.info)
* [R](http://r-project.org) and [RPy2](http://rpy.sourceforge.net/rpy2.html)
* [svgfig](http://code.google.com/p/svgfig) (which already comes bundled with all Galaxy installations)

(Note: that the packages and modules required for each of these systems must be already be available to your Galaxy
instance as a whole; you won't be able to pull them in *just* for your visualization.)

Mako specializes in creating markup of any type readable by modern browsers - so you can also leverage it by itself to
create:
* HTML
* SVG
* MathML
* [Data URIs](http://en.wikipedia.org/wiki/Data_URI_scheme)

Addtionally, since the product of the mako template is a web page, JavaScript and client side code is also a good option:
* SVG with [d3js](http://d3js.org), [raphaeljs](http://raphaeljs.com), or any others
* the HTML5 canvas with [paperjs](http://paperjs.org), [chartjs](http://chartjs.org),
  [processingjs](http://processingjs.org) or any others
* WebGL with [philogl](http://senchalabs.org/philogl), [X](http://github.com/xtk/X), or others

Interactivity can be used via python or JavaScript as well:
* Control the page via python and in-page links, forms, and the traditional GET/POST HTTP cycle
* Control the page via JavaScript with any number of JS libraries, widgets, and events

#### Resources

#### The config variable

#### Saved visualizations

#### Common templates and template namespaces

#### Other things available to your template code

* `trans` : the entire `GalaxyWebTransaction`, `trans` is available
* `h` : the Galaxy template helper functions (`lib/galaxy/web/framework/helpers/__init__.py`)
* `visualization_name` : the name of the plugin (e.g. for plugins/visualizations/myvis it would be 'myvis')
* `visualization_display_name` : the display name of the plugin, defined in the visualization element's `name`
  attribute in the configuration file (e.g. 'My Visualization')
* `title` : any title passed in from a saved visualization or in the query string
* `visualization_id` : the encoded id of the saved visualization used or `None` if this is a new visualization
* `query` : these are the raw, unparsed query string arguments (as opposed to the context-scoped resources). If you need
  a variable that from the query string, access this dictionary.
* `vars` : Mako has no global variables even in the page scope, as a workaround the Mako developers recommend
  passing an empty dictionary into the context scope of the template. You can add new entries to shared_vars and then
  access them in separate, `<%def%>`ined functions.
* `embedded` : this is passed to all templates with a default value of None. In the future, this parameter may contain
  a CSV value string containing information (dimensions, configurion allowed, etc.) on how a visualization is being
  embedded into another web page.

----
## Data: the Datasets API and DataProviders

The primary purpose of Galaxy visualizations is the visual analysis of the data inside the files of our Galaxy datasets.
The datasets API and DataProviders allow you to efficiently query whole files or parts of files (sequentially or by
searching).

There are two ways you might do this in your template: bootstrapping the data into python structures when the template
is rendered and calling the datasets API via JavaScript to load JavaScript structures asynchronously.

A simple use case might be to load data from an HDA's interval file in map format/structure. The entry point for
bootstrapping this data is the dataset datatype's dataproviders.


You could bootstrap into python, getting the data directly from the `datatype.dataprovider` (keep in mind a
dataprovider is a python generator):
```python
bootstrapped_interval_list = list( dataset.datatype.dataprovider( dataset, 'interval-map' ) )
# do something with the data
```


Alternately you could bootstrap into javascript with the helper (`h`) method `to_json_string`:
```javascript
    var interval_list = ${h.to_json_string( list( dataset.datatype.dataprovider( dataset, 'interval-map' ) ) )};
    // do something with the data
```


The entry point for getting the data through the API (or even loading *more* data after you've bootstrapped some) is
through the datasets api and a library that can do AJAX requests (such as jQuery):
```javascript
    var encodedId = '${query_args[ 'dataset_id' ]}';
    var ajaxReq = jQuery.ajax( '/api/datasets/' + encodedId, {
        data : {
            // this argument tells the datasets API to return file contents instead of data about the dataset itself
            data_type: 'raw_data',
            // name the provider
            provider : 'interval-map'
        }
    });
    ajaxReq.then( function( intervalList ){
        // do something with the data
    });
```



#### The API

More supporting infrastructure is available to you through the API. Here you can add client code for interactivity
including:
* Loading already configured or saved visualizations
* Saving the current state of a user's visualization through the visualizations API
* Running tools and workflows from your visualization with the tools and workflows API

----
## Troubleshooting

If you're successfully calling your visualization's page and (from the javascript console) you're seeing **404s when
the page attempts to load static resources**. It may be that your server is using a proxy server that needs a rewrite
rule to find the static content. For example, with nginx:
```nginx
    location ~ ^/plugins/visualizations/(?<vis_name>.+?)/static/(?<static_file>.*?)$ {
        alias /my_galaxy_dir/config/plugins/visualizations/$vis_name/static/$static_file;
    }
```

