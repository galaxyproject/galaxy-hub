---
title: Galaxy Source Code Documentation
---


PLACEHOLDER_INCLUDE(/src/Develop/LinkBox/index.md)

The Galaxy Project source code documentation is in the code itself.  This is in keeping with the philosophy, that whenever possible, store code doc as close to the code as possible.

This page describes where to find the doc, how to generate it, and how to update the doc in the source code itself.

# Published Galaxy Source Code Documentation

<div class='right'><a href='http://readthedocs.org'><img src="/src/Images/Logos/ReadTheDocsLogo.png" alt="Read the Docs"  /></a></div>

The Galaxy Project publishes two versions of the Galaxy source code documentation.  Both versions are hosted at [Read the Docs](http://readthedocs.org) a [publicly supported](https://docs.readthedocs.org/en/latest/sponsors.html) site for project documentation.  Galaxy started publishing these two versions with the [November 14, 2012 distribution](/src/DevNewsBriefs/2012_11_14/index.md).

<div class='right'><a href='http://galaxy-dist.readthedocs.org'><img src="/src/Images/NewsGraphics/2012_11_14_dist-readthedocs.png" alt="Galaxy-Dist at ReadTheDocs" width="250" /></a></div>

* **[galaxy.readthedocs.org/en/master](https://galaxy.readthedocs.org/en/master/)**
    This documentation describes the code in the [most recent stable release](/src/DevNewsBriefs/index.md) of Galaxy ("master").

* **[galaxy.readthedocs.org/en/dev](https://galaxy.readthedocs.org/en/dev/)**
    This documentation describes what is currently in the main development branch ("dev") of Galaxy.  Code updates are automatically propagated from Galaxy's !BitBucket.org repository.  This should never be more than 15 minutes out of date.

This documentation is a work in program and should make incremental improvements with each release.

# Sphinx

<div class='right'><a href='http://sphinx-doc.org/'><img src="/src/Images/Logos/SphinxLogo333.png" alt="Sphinx Python Documentation Generator"  /></a></div>

[Read The Docs](http://readthedocs.org) uses [Sphinx](http://sphinx-doc.org/) to generate documentation on classes and methods (and much more) in the code base.  It also includes [Python docstrings](http://www.python.org/dev/peps/pep-0257/) from the code.  Sphinx uses [reStructured Text (RST)](http://sphinx-doc.org/rest.html) with some [Sphinx-specific additions](http://sphinx-doc.org/markup/index.html) for markup.

# Generate a Local Copy

You can also generate your own copy of the documentation.  You might want to do this if you have made local modifications/extensions to the code, or if you are adding documentation that will be merged back into the the main line.  To generate the documentation:

1. Install Sphinx
1. Go to the `doc` directory and run Sphinx
    ```

cd doc
make html
```

1. Install missing dependencies, and rerun Sphinx until you get working output.

The generated documentation will be in `doc/build/html/` and can be viewed in a web browser.

# Contributing

Contribution of documentation is strong encouraged.  This is done the same way as coding contributions.  Get a copy of the code, update it (in this case the Python docstrings in the code), commit and push it, then issue a pull request.

**Updates to [Python docstrings](http://www.python.org/dev/peps/pep-0257/) should be [reStructured Text (RST)](http://sphinx-doc.org/rest.html) and [Sphinx markup](http://sphinx-doc.org/markup/index.html) compatible.**  If they aren't Sphinx will generate a warning or error when parsing them.
