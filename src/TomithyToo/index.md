# On Web Controllers and Data Classes| By Tomithy

This document discusses the web controllers and data classes of Galaxy. It aims to give you a brief idea on how the Galaxy software is structured and what are the possible entry points should you want to extend Galaxy. These ideas are what I have gleaned of tweaking the codes and working on the PhyloViz Project

## 1 Web architecture

Galaxy uses the Model-View-Controller software architecture.

### 1.1 Front end

**Mako Templates** @Dir /templates: The pages that galaxy serves out are very dynamic and they are printed out at runtime by compiling **Mako** (http://www.makotemplates.org/) templates and their context(including user, location, session). The advantage of using a templating system is that it promotes a lot of markup reuse (inheritance) and allows specific data to be printed on specific pages, as Mako allows printing of data stored within python variables via the ${context.property} pattern and the usage of conditionals. Javascripts for the pages and css are stored in the *<%def name="javascripts()">* and *<%def name="stylesheets()">* tags respectively, as well as in their ancestors!

**Javascripts** @Dir /static/scripts: Galaxy strictly requires the browser to have JavaScript to be enabled, because its really a fully fledged interaction driven client side app. By default, the libraries loaded are jquery.js, underscore(convenient methods, backbone's dependency), backbone(javascript-MVC lib), backbone-relational(?for client-side relational-data storage and query), handlebars(templating), ui(custom).

**CSS** @Dir /static/june_2007_style/blue: CSS for Galaxy should be written in the .less(http://lesscss.org/) format and compiled by the lesscss compiler (downloaded via node+nmp). The compiled css is extremely terse and can be found at  the directory above. Optionally they can be embedded in each page under the good ole style tags <style></style>, as well a "just make it work" solution.

**Site Map**: Main entry point is at "/" which shows galaxy welcome by default. This is also the main screen which the users will be working at. It is composed of several divs - tools:left, nav:top, history:right and main:center. As expected, each div will have its own .mako template.

**How To create a new page**

1. Write your own controllers. Among other things it will usually have to create a context/session object (usually called trans) if you want login functionality.
1. Write your own .mako template. Remember to inherit from base_panels.mako. You can add additional css/js inline but its recommended to abstract them out and include them via the mako javascript/stylesheets function.
1. You can create a link to your side by including it on the top nav.
1. Finally you will need to get Galaxy running to serve the page.

**Routing**: See Controllers below.



----

## 2 Data

### 2.1 Design Notes

* Galaxy tries not to replicate data.
* All data are marshelled through the python object called "[HistoryDatasetAssociation](/src/HistoryDatasetAssociation/index.md)" found @Dir: lib/galaxy/model/__init__.py (unexpected name, yes) and you can basically think of it as a dataset object.
* Dataset ID can be found by right clicking the save icon on the history panel and copying the url or 2) by observing the http calls made to galaxy via terminal.
* The data is stored in the database/job_working_directory/{user_id}/file_index and is mapped to its respective dataset_id by a sql hashtable ?somewhere. So each data stored in galaxy correspond to an indexed row somewhere.
* Users usually interact with their list of data via the history panel (right of main page)
* db_key represents the reference genome build (http://tophat.cbcb.umd.edu/igenomes.html)

### 2.2 Classes Of Note

- Dataset @Dir lib/galaxy/web/base/controller : Main method for accessing datasets stored in Galaxy by the hashed ID. To retrieve data, one can make a http call to the dataset controller with the dataset ID (http://127.0.0.1:8080/datasets/ba751ee0539fff04).

- model/__init__.py - HistoryDatasetAssociation class: Main python object which you access your data. You might want to look see how the class UsesHistoryDatasetAssociationMixin interacts with it to retrieve data, or even better, let your web controller inherit from the said class to get all the data interaction methods for free!

- UsesHistoryDatasetAssociationMixin class: Web Controllers will have to extend this calls to gain many convenience methods like get_Data, get_dataset(dataset_id) to retrieve the dataset, a further call to get_data(dataset) is required to get the raw data out of the dataset object (hint: the return is a tuple (truncated_data_for_large_queries , data) or file_ext to get file extension.



----

## 3 Web Controllers

### 3.1 Design Notes

* The name of the Controller's class (assuming that the controller is stored in the web/contollers directory) will be used as the route to all the Controller's method. Eg "localhost/Controller1/get" will call the get() method defined inside the class Controller1
* Controllers will have to accept a trans object as their second argumet ?if they require login.
* Decorators of note: @web.expose (for it to be called via http), @web.json (to output returned data via pure json; otherwise the data will be marked-up with some html), @web.require_login(require user to be logged in to access the page) definitions can be found in lib/galaxy/web/framework/__init__.py
* Controllers usually return a page, and here we will do *return trans.fill_template( "the_page_template.mako", some_context_variable_you_want_to_print = some_data )* to compile a .mako template at runtime and return the page to the user.

----

## 4 Dev Tips

* If you think that there is some "magic" going on, you can force the program to throw Exception and see the call stack. Also, check the __init__.py as there tends to be alot of code inside.
* Firebug,  Chrome Developer Tools, Safari Developer Tools are good friends.

----
[CategoryHomepage](/src/CategoryHomepage/index.md)
