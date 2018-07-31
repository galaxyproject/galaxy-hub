---
title: The Visualizations Registry
---
The visualizations registry and plugin framework provides an easy way to create new, custom visualizations for almost
any data.

(For information on existing and built-in visualizations such as Trackster, please see:
[Learn/Visualization](/src/learn/visualization/index.md) and [Visualization Setup](/src/visualization-setup/index.md))

There are three main steps to creating a visualization:

1. Enabling visualization plugins on your Galaxy installation
2. Configuring your visualization plugin in the `visualization_plugins_directory`
3. Creating the code and markup for your visualization

(For more examples of on how the visualizations registry can be used than are on this page, see
[Visualizations Registry Cookbook](/src/visualizations-registry/cookbook/index.md).

## Enabling visualization plugins on your Galaxy installation

The visualizations registry uses a plugin architecture where the configuration, code, and markup for your
visualization's web page is placed within the `visualization_plugins_directory` of your Galaxy installation.

The `visualization_plugins_directory` is a setting in your `galaxy.ini` file (located in `<your galaxy directory>/config/`) that tells Galaxy where to scan
for visualization plugins. It currently defaults to `<your galaxy directory>/config/plugins/visualizations`
but can be set to any relative (to the galaxy directory) or absolute path reachable on the file system.

Make sure this setting is uncommented and set to the directory from which you want to serve visualizations:
```bash
# Visualizations config directory: where to look for individual visualization plugins.
# The path is relative to the Galaxy root dir. To use an absolute path begin the path
# with '/'.
visualization_plugins_directory = config/plugins/visualizations
```


When enabled, the server log will print log messages when it finds and successfully loads a visualization plugin:
```#!
galaxy.web.base.pluginframework INFO 2014-01-28 10:26:04,147 VisualizationsRegistry, loaded plugin: scatterplot
```


If there's an error in your visualization's configuration file (or it's been disabled), you'll see:
```#!
galaxy.web.base.pluginframework WARNING 2014-01-28 10:26:04,147 VisualizationsRegistry, plugin load failed or disabled:
./config/plugins/visualizations/sweepster. Skipping...
```


When testing to see if your new plugin has been loaded, it's useful to look for these messages and any errors that
are output around them.


----
## Configuring your visualization plugin in the `visualization_plugins_directory`

The second step to creating a new visualization plugin is to create the directories and (initial) files that the plugin
will use. At the very least, your plugin *must* have:

1. A base directory within the `visualization_plugins_directory` with your visualization's name
2. A `config` directory and XML configuration file
3. A `template` directory and [Mako](http://www.makotemplates.org/) template file (or files)

For example, if your new visualization was to be called 'myvis', you'd need a structure like this:
```#!
config/plugins/visualizations/
    └── myvis/
        ├── config/
        │       myvis.xml
        └── templates/
                myvis.mako
```


If a plugin doesn't have these basic files, it will fail to load. Note: **The config file and mako file must share the
same name as the plugin name / plugin directory.** In the example above that would be 'myvis', 'myvis.xml', and
'myvis.mako'.

Additionally and optionally, you can also include a `static` directory and any statically served files your
visualization may need (CSS, javascript, etc.):
```#!
config/plugins/visualizations/
    └── myvis/
        ├── config/
        │       myvis.xml
        ├── templates/
        │       myvis.mako
        └── static/
                myscript.js
                js2.js
                vis-style.css
```


We'll cover each of these elements.


----
## The visualization configuration file

The configuration file in your visualization's `config` directory allows you a number of options to control how and
where your visualization is accessible to a user and the information your code will receive from Galaxy, including:

1. what types of data are able to be visualized with the new visualization
2. how to create a link to the visualization when given the data
3. how to parse and render information from an incoming link and query string into the final visualization page

The easiest way to get started is to simply copy an existing, working configuration file (such as
`config/plugins/visualizations/scatterplot/config/scatterplot.xml`) into your directory, rename it, and do only minor
editing. Chances are you won't need most of the options. We'll cover the basics here and more advanced options later.

Note: when your done editing your configuration file, you'll need to restart Galaxy in order for your visualization
plugin to be loaded.


#### A simple example

Here's an example configuration file for a visualization that uses SAM data from a dataset in a user's history:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE visualization SYSTEM "../../visualization.dtd">
<visualization name="SAM Visualization">
    <data_sources>
        <data_source>
            <model_class>HistoryDatasetAssociation</model_class>
            <test type="isinstance" test_attr="datatype" result_type="datatype">tabular.Sam</test>
            <to_param param_attr="id">dataset_id</to_param>
        </data_source>
    </data_sources>
    <params>
        <param type="dataset" var_name_in_template="hda" required="true">dataset_id</param>
    </params>
    <template>sam.mako</template>
</visualization>
```


* Lines 1 and 2 are the xml language definition and a doctype definition respectively. These are required. The
  `visualization.dtd` entry on line 2 describes the location of an XML DTD file that defines all the possible
  valid options for a visualization configuration file. You may find this useful as a reference for advanced options.
* Line 3 begins the visualization definition and contains the name attribute. This is the name that will commonly be
  shown to users when the server creates a link to your visualization. It does not have to match the visualization name
  you used for the directory and files but should still be unique.
* Lines 4 through 13 contain two main sections: `data_sources` and `params`. These are explained next.
* Line 14 defines the main Mako template used when serving the visualization. This is required.

*You can think of the `data_source` and `param` definitions in your configuration file as two ends of a pipe*. On one
end is some source of data you'd want to visualize and on the other end is the code that will generate your
visualization's web page. `data_source` definitions allow us to define when a link will be rendered for a user give some
source of visualization data.
```
    some data source -> `data_source` definition -> link -> `param` definition -> your visualization code
```



#### data_sources : getting visualization data into a link

* Define when a visualization will apply and what sources of data it can use.
* Help to serialize (in effect) that data source by defining how a link to it (and your visualization) will be created.
* Allow you to send in optional data and settings to your visualization code.

Not every visualization will or should be able to handle or use every type of data: a visualization that draws
phylogenetic trees might not be able to work with SAM data and so a SAM dataset should never be rendered with a link
to that visualization. In order to tell the registry (and Galaxy) when our visualization will apply and should be linked
to, we define a series of tests for the source of data or target object.

In our example, we only define one `data_source` and only test two attributes of that source to see if our visualization
can work with it:

a) is it a dataset from a user's history?
```xml
        <data_source>
            <model_class>HistoryDatasetAssociation</model_class>
            ...
        </data_source>
```

This sees if the source of data has the python class `HistoryDatasetAssociation` which is the Galaxy class name for a
dataset contained within a history.

and b) is the dataset in the SAM format/datatype?
```xml
        <data_source>
            ...
            <test type="isinstance" test_attr="datatype" result_type="datatype">tabular.Sam</test>
            ...
        </data_source>
```

This uses the python `isinstance` function to test if the `dataset.datatype` is the datatype class `tabular.Sam` (or
a subclass of it).

Finally, if the dataset passes those tests, we can send it (or any other information) to the visualization using a
`to_param` definition:
```xml
        <data_source>
            ...
            <to_param param_attr="id">dataset_id</to_param>
        </data_source>
```

Here, we're telling the registry to add the `HistoryDatasetAssociation`'s `id` attribute to the final, rendered link
(Note: ids are automatically encoded before being added to the link):
```#!
<a href="http://localhost:8080/visualization/show/sam?dataset_id=f7bb1edd6b95db62">SAM Visualization</a>
```


This allows `param` definitions (the other end of the pipe) to parse `dataset_id` back into a
`HistoryDatasetAssociation` in your visualization code when the user clicks the link.


#### params : getting link data into your code

* Define when and how the information in a visualization's link is parsed into data usable by the visualization's code.

In our example, we're attempting to visualize the data within a SAM dataset so we'll need to access the dataset from
our visualization code (`sam.mako`). The following `param` definition allows us to do that:
```xml
    ...
    <params>
        <param type="dataset" var_name_in_template="hda" required="true">dataset_id</param>
    </params>
    ...
```

This tells the registry that when:
```#!
<a href="http://localhost:8080/visualization/show/sam?dataset_id=f7bb1edd6b95db62">SAM Visualization</a>
```

is clicked:
1. the `dataset_id` should be parsed into a dataset (`type="dataset"`) by finding the `HistoryDatasetAssociation`
  with the encoded id 'f7bb1edd6b95db62' in the database
2. the ORM model is passed to the template (in this case, `sam.mako`) under the name `hda` (`var_name_in_template="hda"`)
3. if `dataset_id` is *not* present in the link, an error will be raised (`required="true"`)

Then, within `sam.mako`, we can access the ORM model of the `HistoryDatasetAssociation` the link was created for:
```#!
<h2>${hda.dataset.datatype} | ${hda.name}</h2>
```


For more information on visualization configuration options see [Visualizations Registry Configuration](/src/visualizations-registry/configuration/index.md).


----
## Creating the code and markup for your visualization

The code for your visualization begins with a Mako template file.


#### Your visualizations template file

The main entry point for any code that you add will be your plugin's Mako template file. Within the template you can:
* import Galaxy modules
* import and use your own modules
* run python code
* use the server to generate HTML or other browser compatible markup
* load static resources like JavaScript libraries and scripts, images, or stylesheets
* call JavaScript for user interface control or client-side rendering

The template file Galaxy and the visualizations registry will use to start your visualization is defined in your config
file:
```xml
<visualization name="SAM Visualization">
    ...
    <template>sam.mako</template>
</visualization>
```

This file must be located in the `templates` directory of your plugin directory.


#### The data in your target dataset

Inside the visualization template file, we'll need to access the data inside our target dataset (what we're really
interested in, of course).

From python, the best way to do this is with `DataProviders`. In the simplest terms, they create a python generator that
can iterate over the data in a dataset and output each datum. Each datum has been parsed and is in a specified format
with (hopefully) only minimum of work on your part.

For our example, let's say we want to just print the mapping quality for each read in the file:
```mako
    <ul id="reads">
    %for read in hda.datatype.dataprovider( hda, 'dataset-dict' ):
        # the 'dataset-dict' provider returns lines/reads in a dictionary based on the column names of the dataset:
        # {'OPT': None, 'RNAME': '*', 'SEQ': ..., 'MAPQ': 0, 'MRNM': '*', 'ISIZE': 0}
        <li>${read['MAPQ']}</li>
    %endfor
    </ul>
```

These are explained more fully at [Data Providers](/src/data-providers/index.md).


#### Static files for your visualization

You can include static files usable by your visualization's web page by creating a `static` directory in your plugin's
base directory and placing files there. When the server is restarted, Galaxy will serve ...

For example, if we added a CSS file to our 'SAM Visualization' at `sam/static/style.css` we could load it and apply
it like any CSS stylesheet in our final template file by adding the path:
```mako
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>${hda.name | h} | ${visualization_name}</title>
<link type="text/css" rel="Stylesheet" media="screen" href="/plugins/visualizations/sam/static/style.css"">
...
```

Make sure variables that may correspond to user input (e.g. the name of the history item `hda.name`) and other input that may contain undesired HTML tags, need to be HTML-escaped (`${hda.name | h}`) to avoid possible code injections.

Note: we can use sub-directories here if desired. We could create sub-directories 'js', 'css', 'images', 'data' and
serve different static content from each.

We can also load any static file normally served by Galaxy as well without having to include them in your
static directory:
```mako
...
<script type="text/javascript" src="/static/scripts/libs/jquery/jquery.js"></script>
...
```


For more information on template or static code files see [Visualizations Registry Code](/src/visualizations-registry/code/index.md).


----
## Further examples

For more examples on how the visualizations registry can be used see [Visualizations Registry Cookbook](/src/visualizations-registry/cookbook/index.md).
