---
title: 2015/06: [Exposing Galaxy reports via nginx in a production instance](http://galacticengineer.blogspot.co.uk/2015/06/exposing-galaxy-reports-via-nginx-in.html)
---
<div class='center'><a href='http://galacticengineer.blogspot.co.uk/'><img src="/src/images/GalacticEngineerHeader.png" alt="Galaxy Engineer Blog from Peter Briggs at the University of Manchester" width="60%" /></a></div>





<div class='logbox'>
 Topic:: **[Exposing Galaxy reports via nginx in a production instance](/src/Community/Log/2015/ReportsViaNginx/index.md)**
 Date:: 2015/06/02
 Who:: [Peter Briggs](http://www.ls.manchester.ac.uk/people/profile/?alias=briggsp)
 Resolution:: Outline how I've done this for our local Galaxy set up, which uses nginx.
 Deployment:: 
</div>

From the [blog entry](http://galacticengineer.blogspot.co.uk/2015/06/exposing-galaxy-reports-via-nginx-in.html):

<div class='indent'>

Galaxy includes a report tool that is separate from the main process but which gives lots of potentially useful information about the usage of a Galaxy instance, for example the numbers of jobs that have been run each month, how much disk space each user is currently consuming and so on.

However there doesn't appear to be much documentation about the report tool on the official Galaxy wiki: the most I could find was a rather sparse page at [https://wiki.galaxyproject.org/Admin/UsageReports](/src/Admin/UsageReports/index.md), which gives a very bare bones overview, and doesn't include any information on how it might be exposed in a secure manner in a production environment. Therefore in this post I outline how I've done this for our local Galaxy set up, which uses nginx; however I imagine it could be adapted to work with Apache instead.
</div>

## Links

* [blog entry](http://galacticengineer.blogspot.co.uk/2015/06/exposing-galaxy-reports-via-nginx-in.html)
* [Galactic Engineer Blog](http://galacticengineer.blogspot.co.uk/)

[CategoryLog](/src/CategoryLog/index.md)
