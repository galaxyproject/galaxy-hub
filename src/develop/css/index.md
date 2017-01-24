---
title:  CSS Practices 
---
{{> Develop/LinkBox }}


We write styles in [LESS](http://lesscss.org/) and use Bootstrap CSS library as a cornerstone of all the styles. To build the LESS file into the css files please read the `static/style/README` included with the distribution.

* follow LESS conventions
* use sensible organization and modularity.
* Anything that's going to be commonly used across components as a fundamental widget or style should probably be in base.  
* To add to that, to the extent possible use existing styles wherever they make sense.

* If you want to run grunt with spritesmith on Mavericks you need to update grunt-spritesmith https://github.com/Ensighten/grunt-spritesmith/issues/45

