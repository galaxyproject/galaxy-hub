---
title: "GalaxyCzars: July Slides & Video"
date: "2012-07-11"
---
<div class='right'><a href='/community/galaxy-admins/meetups/2012-07-09/'><img src="/images/logos/GalaxyCzars.png" alt="GalaxyCzars" width="150" /></a></div>

The [first conference call](/community/galaxy-admins/meetups/2012-07-09/) of the [GalaxyCzars group](/community/galaxy-admins/) was held on July 9.  The [slides and a screencast](/community/galaxy-admins/meetups/2012-07-09/#links) of the call are now available.

In addition to discussing group organization and logistics, Ann Black-Ziegelbein of the [University of Iowa](http://uiowa.edu/) gave a talk about their experiences with setting up a large Galaxy instance and their thorough benchmarking experiments with different storage architectures.  To summarize, they initially started with Lustre on HP MSA 2312sa P2000 G2 hardware, which failed badly. The Iowa team then benchmarked ZFS, Gluster, and a reconfigured Lustre using several network technologies. Currently gluster is the top performer and failover scenarios are being evaluated at Iowa.

See the [meeting summary](/community/galaxy-admins/meetups/2012-07-09/) for more, and the [slides and screencast](/community/galaxy-admins/meetups/2012-07-09/#links) for details and links to the benchmarking scripts used, and to reports for each combination tried.

The group decided to have calls every other month, with the next on in September.  We will also have a GalaxyCzars [breakout session](/events/gcc2012/program/breakouts/) at [GCC2012](/events/gcc2012/).  This first call had over 25 participants (dare I say *czars*?).

Many, many thanks to Ann Black-Ziegelbein for getting the group off to a great start.

[Dave Clements](/people/dave-clements/)
