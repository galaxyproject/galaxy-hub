# Visualization Plugin Tutorial

There are a number of ways to visualize data in Galaxy, so let's settle on some terminology first for the three major ways:
* display applications: these are definitions of external websites that can fetch galaxy datasets and display them in their visualization applications. Examples are the UCSC genome browser, GBrowse, and IGV.
* tools: although the tool framework generally produces 'raw' data like tabular or binary files, it can also produce the html (and js even) that can display data for visualization. An example would be 'Boxplot of quality statistics'. 
* visualization plugins: these are python/mako/js files that are meant to be more interactive visualizations in order to explore data

To use the visualization plugin system:
* since they're for external code or websites, let's take display applications off the table entirely. 
* since they can be a viable alternative to the plugin system, so I'd keep tools as another option but keep our focus on the plugin system

You often have two elements to incorporate:
* a datatype
* a plugin to display datasets of that datatype

## The datatype

For the datatype you often want to subclass the binary datatype and add it to your galaxy installation. Start here:
* https://wiki.galaxyproject.org/Admin/Datatypes
* https://wiki.galaxyproject.org/Admin/Datatypes/Adding%20Datatypes

Note: to see if your datatype was loaded successfully, with your server running - you can go to: /api/datatypes/mapping. You should be able to see your datatype listed at the first level of the json map, generally beginning with 'galaxy.datatypes.' and the python module name you added it to (like a python import namespace): e.g. galaxy.datatypes.binary.H5 or galaxy.datatypes.binary.mydatatype

To simplify:
1. Add a definition to your datatypes_conf file
2. Add a sniffer for your datatype
3. Add a subclass/class for your datatype

## The plugin

For the plugin good place to start: https://wiki.galaxyproject.org/VisualizationsRegistry

### The filesystem layout

Here's a simplified process for creating an outline for a visualization plugin project:
1. in the filesystem, start at <your galaxy>/config/plugins/visualizations
2. think of an id for your plugin. This can be any (filesystem permissible) file name and is only used as an id by the registry - the users never see it. It should be unique from any other plugins in that directory. (e.g. myplugin)
3. create a main directory using your id. (e.g. <your galaxy>/config/plugins/visualizations/myplugin)
4. inside that directory, create three more directories: config, templates, static. This is where the plugin configuration, the mako templates, and any (optional) javascript or static files are kept respectively.
5. the configuration file should use the same id you used above for the directory: e.g. config/myplugin.xml. Most people copy and rename a simple config file like the one in config/plugins/visualizations/scatterplot/config/scatterplot.xml. We'll change the datatype it applies to later, but there's more at: https://wiki.galaxyproject.org/VisualizationsRegistry#The_visualization_configuration_file and https://wiki.galaxyproject.org/VisualizationsRegistry/Configuration 
6. a mako template file should go into the templates directory: e.g. templates/myplugin.mako. This template file is the entry point for your visualization and is loaded first. You don't have to do any major coding here and can instead just launch javascript to render the visualization. https://wiki.galaxyproject.org/VisualizationsRegistry#Creating_the_code_and_markup_for_your_visualization

At this point, your config/plugins/visualizations/myplugin directory should look like one of the two trees displayed here:
https://wiki.galaxyproject.org/VisualizationsRegistry#Configuring_your_visualization_plugin_in_the_.60visualization_plugins_directory.60

### The configuration

Now, we'll configure the plugin by editing the config/plugins/visualizations/myplugin/config/myplugin.xml file. Let's assume you've copied the scatterplot config file (https://github.com/galaxyproject/galaxy/blob/dev/config/plugins/visualizations/scatterplot/config/scatterplot.xml):

1. change the name displayed to what you'd like users to see in the dataset visualizations dropdown menu: 

```xml
<visualization name="My Visualization Plugin">
```


2. change the configuration for your visualization to test for your datatype. For example, if you have mydatatype, change:

```xml
<data_sources>
    <data_source>
        <model_class>HistoryDatasetAssociation</model_class>
        <test type="isinstance" test_attr="datatype" result_type="datatype">binary.MyDatatype</test>
        <to_param param_attr="id">dataset_id</to_param>
    </data_source>
</data_sources>
```


The above is basically saying, if an object is a) a HistoryDatasetAssociation (a dataset in a history) and b) it's a subclass or instance of binary.MyDatatype, then put a link:
* in the dataset visualization dropdown menu 
* that will start my visualization
* pass the encoded id of the dataset in the link using the parameter 'dataset_id'

Note: the 'binary.MyDatatype' is essentially 'module.class' and is also the last half of the id given in the 'api/datatypes/mapping' mentioned previously. 

3. change the template used as the entry point to reflect the name you gave it:

```xml
<entry_point entry_point_type="mako">myplugin.mako</entry_point>
```


## Testing and troubleshooting

Finally, you should be at a spot that:
* your visualization will appear in the visualization dropdown menu of datasets that are of the mydatatype class
* if that menu link is clicked, galaxy will go to visualization/show/<your plugin id>. E.g. /visualization/show/myplugin?dataset_id=0b1d0715f8366ea8
* whatever code is in myplugin.mako will be executed (you should be able to use print in python or alert in javascript to test)

* If your server is running when you've made changes to your config file, you'll need to restart it (changes to mako and static files do not need a restart)
* Make sure your id is used in the proper places above and that they all match
* If galaxy is trying to load or loading your visualization plugin, you should see an entry like this in your server logs:

```
galaxy.web.base.pluginframework INFO 2015-12-14 08:46:44,788 VisualizationsRegistry, loaded plugin: myplugin
```

* errors will also display there
* it can help to change 'debug = True' in your config/galaxy.ini file (only do this on a separate development server - not you public shared instances)

Related dev-list thread: http://dev.list.galaxyproject.org/How-does-one-run-Javascript-or-HTML-as-a-tool-tt4668518.html
