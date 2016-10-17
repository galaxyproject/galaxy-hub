---
title: Galaxy Software Development Best Practices
---
PLACEHOLDER_INCLUDE(/Admin/Tools/LinkBox)


PLACEHOLDER_INCLUDE(/Develop/LinkBox)

Lists software development best practices for the Galaxy Project. These are works in progress and practices vary in how broadly they have been applied.

# Metastandards

1. If you want to add something here propose it first on the [galaxy-dev mailing list](/src/MailingLists/index.md).
1. These are *best practices*. They are not rigid. There are no enforcers.

# General

1. Ensure all user-enterable strings are unicode capable

# Python Standards

1. Galaxy follows [PEP-8](http://www.python.org/dev/peps/pep-0008/), with *particular emphasis* on the parts about knowing when to be inconsistent, and readability being the ultimate goal.
1. One exception to PEP-8 in Galaxy Python code is whitespace usage. Whitespace around operators and inside parentheses is generally included, particularly if it helps readability. If the thing inside the parentheses is short (a single word) often spaces are extraneous; if it is a complex expression, spacing helps to delineate different parts.
1. 4 spaces per indent
1. Use spaces, not tabs for indenting.
1. Comments and documentation comments should follow the 79 character rule
1. One other common divergence from PEP-8 is line length.  Logical (non-comment) lines should be formatted for readability, recognizing the existence of wide screens and scrollbars (sometimes a 200 character line is more readable, though rarely).
1. [Python docstrings](http://www.python.org/dev/peps/pep-0257/) need to be [reStructured Text (RST)](http://sphinx-doc.org/rest.html) and [Sphinx markup](http://sphinx-doc.org/markup/index.html) compatible. See [/Develop/SourceDoc](/src/Develop/SourceDoc/index.md) for more.
1. Avoid `from module import *`. It can cause name collisions that are tedious to track down.

# JavaScript Standards

1. Follow [JSHint](http://www.jshint.com/) whenever possible, deviating for readability.
1. Use semicolons to terminate statements.
1. Put delimiters that open blocks on the current line; put delimiters that close blocks on their own line. E.g.
    ```
      if (condition) {
        do_action();
      }
      ```

1. camelCasePlease and capitalize ClassNames
1. variables with jQuery objects should start with '$'
1. JSDoc-style commenting [http://en.wikipedia.org/wiki/JSDoc](http://en.wikipedia.org/wiki/JSDoc)



## Backbone

1. Decouple models from views, and use events to communicate state changes from model to view(s); this is advantageous because multiple views can use the same object and models can be used without views.

# Email Threads

* [Suggestion / Request for Comments on Galaxy Best Practices - Gradual migration to standard indentation](http://dev.list.galaxyproject.org/Suggestion-Request-for-Comments-on-Galaxy-Best-Practices-Gradual-migration-to-standard-indentation-td4141448.html), 2011/09

# Tool Development Best Practices
Please see a separate page on what are the best practices when it comes to the [development of Galaxy tools](https://galaxy-iuc-standards.readthedocs.org/).
