---
title:  Javascript Architecture and Development Practices
---
PLACEHOLDER_INCLUDE(/src/Develop/LinkBox/index.md)


# How to modify & build JS

All of the JS code can be found in `/client`. In order to propagate the changes to Galaxy you have to build it using Grunt. This can be done via the following commands:

enter the /client directory

```$ cd client```


install dependencies through npm (you have to have [npm](https://github.com/npm/npm) installed)

```$ npm install```


run the build script

```$ grunt```


Now all the JS is copied and packed into the proper directories in `/static`.
You can also run 

```$ grunt watch```


to start a watcher that will automatically copy and pack scripts when any save occurs in `/client`.

## Web Stack

In general, our 'Web stack' is:
* Grunt (building/optimization)
* requireJS (Requirement management)
* Backbone (MVC framework)
* jQuery (basic DOM manipulation)
* and then individual libraries as needed (D3, Bootstrap, etc)
* For notifications we use Toastr (https://github.com/CodeSeven/toastr) as require.js module

We made two major framework decisions: 
1. use require to ensure that dependencies are available 
2. use Backbone as class framework

