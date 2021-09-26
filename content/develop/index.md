---
title: Galaxy Development
---

This page collects resources that are helpful to development of various aspects of the Galaxy software. It is aimed to provide help to all of the numerous Galaxy's [contributors](https://www.openhub.net/p/galaxybx). We salute you!

If your interest lies in the development of tools for Galaxy please see the [Adding custom tools tutorial](/admin/tools/add-tool-tutorial/).

## Source code

* [Source Code](/develop/source-code/) - Where is the source code and how to contribute.

## Documentation

We use [Sphinx](http://sphinx-doc.org/) to generate documentation on classes and methods (and much more) in the code base.  It also includes [Python docstrings](http://www.python.org/dev/peps/pep-0257/) from the code.
Sphinx uses [reStructured Text (RST)](http://sphinx-doc.org/rest.html) with some [Sphinx-specific additions](http://sphinx-doc.org/markup/index.html) for markup.
You can generate your own copy of the documentation. You might want to do this if you have made local modifications/extensions to the code, or if you are adding documentation that will be merged back.
Contribution of documentation is very welcome. To generate the documentation simply execute `make docs` from Galaxy's root directory. The generated documentation will be in `doc/build/html/` and can be viewed in a web browser.

<slot name="/develop/resources-api" />

## Code Practices

* [Contributing](https://github.com/galaxyproject/galaxy/blob/dev/CONTRIBUTING.md) - Describes how to contribute to the core galaxy project.
* [CSS Practices](/develop/css/) - How we generate and manage stylesheets.

## Graphics

* [Graphics Documentation](/develop/graphics/) - What graphical elements we use and their meaning.
* [Visualization tutorial](/develop/visualizations/) - How to write a custom visualization for Galaxy.

<slot name="/develop/resources-tools" />

## Architecture

* [Architecture](/develop/architecture/) - How is the app built.
* [JavaScript Architecture](/develop/jsa/) - What we use and how we implement client-side code.
* [Data Model](/admin/internals/data-model/) - Underlying data model.
* [Application Logging](/admin/internals/application-logging/) - What and where does Galaxy log.

### Other resources

* [Data Sources](/admin/internals/data-sources/) - How to work with data sources.
* [Galaxy Ops](/admin/internals/galaxy-ops/) - Galaxy Operations Help Information.
