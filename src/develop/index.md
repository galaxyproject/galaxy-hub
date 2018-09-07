---
title: Galaxy Development
---

This page collects resources that are helpful to development of various aspects of the Galaxy software. It is aimed to provide help to all of the numerous Galaxy's [contributors](https://www.openhub.net/p/galaxybx). We salute you!

If your interest lies in the development of tools for Galaxy please see the [Adding custom tools tutorial](/src/admin/tools/add-tool-tutorial/index.md).

## Source code

* [Source Code](/src/develop/source-code/index.md) - Where is the source code and how to contribute.
* [Contributing](https://github.com/galaxyproject/galaxy/blob/dev/CONTRIBUTING.md) - Describes how to contribute to the core galaxy project.

## Documentation

We use [Sphinx](http://sphinx-doc.org/) to generate documentation on classes and methods (and much more) in the code base.  It also includes [Python docstrings](http://www.python.org/dev/peps/pep-0257/) from the code.
Sphinx uses [reStructured Text (RST)](http://sphinx-doc.org/rest.html) with some [Sphinx-specific additions](http://sphinx-doc.org/markup/index.html) for markup.
You can generate your own copy of the documentation. You might want to do this if you have made local modifications/extensions to the code, or if you are adding documentation that will be merged back.
Contribution of documentation is very welcome. To generate the documentation:

1. Install Sphinx
2. Go to the `doc` directory and run Sphinx with `make html`
3. Install missing dependencies, and rerun Sphinx until you get working output.

The generated documentation will be in `doc/build/html/` and can be viewed in a web browser.

{{> Develop/ResourcesAPI }}

## Code Practices

* [Best Practices](/src/develop/best-practices/index.md) - Best practices used in Galaxy software development.
* [CSS Practices](/src/develop/css/index.md) - How we generate and manage stylesheets.

## Graphics

* [Graphics Documentation](/src/develop/graphics/index.md) - What graphical elements we use and their meaning.
* [Visualization tutorial](/src/develop/visualizations/index.md) - How to write a custom visualization for Galaxy.

{{> Develop/ResourcesTools }}

## Architecture

* [Architecture](/src/develop/architecture/index.md) - How is the app built.
* [JavaScript Architecture](/src/develop/jsa/index.md) - What we use and how we implement client-side code.
* [Data Model](/src/admin/internals/data-model/index.md) - Underlying data model.
* [Application Logging](/src/admin/internals/application-logging/index.md) - What and where does Galaxy log.

### Other resources

* [Data Sources](/src/admin/internals/data-sources/index.md) - How to work with data sources.
* [Galaxy Ops](/src/admin/internals/galaxy-ops/index.md) - Galaxy Operations Help Information.

Search all Galaxy [resources](/src/index/md).
