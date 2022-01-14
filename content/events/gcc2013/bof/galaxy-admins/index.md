---
title: GalaxyAdmins BoF
---

<slot name="/events/gcc2013/header" />

import linkbox from "../../linkbox.json"
<link-box :data="linkbox" />

<slot name="/events/gcc2013/bof/linkbox" />
<slot name="/community/galaxy-admins/linkbox" />

<div class='left'><a href='/events/gcc2013/bof/'><img src="/images/logos/GCC2013BoFLogo.png" alt="" width="160" /></a><br />
<a href='/community/galaxy-admins/'><img src="/images/logos/GalaxyAdmins.png" alt="GalaxyAdmins" width="160" /></a></div>

This page describes the **[Galaxy Admins](/community/galaxy-admins/)** [Birds of a Feather](/events/gcc2013/bof/) meetup being held at [GCC2013](/events/gcc2013/).

[GalaxyAdmins](/community/galaxy-admins/) is a group of people that are responsible for administering large Galaxy instances.  We [meet online every other month](/community/galaxy-admins/meetups/) and at events like GCC2013, where a lot of us happen to be.

GCC2013 coincides with the one year anniversary of GalaxyAdmins starting up and this is a good time to discuss the [future direction of the group](/community/galaxy-admins/future/).  *This discussion has started in advance of GCC2013 as [this email thread](https://lists.galaxyproject.org/archives/list/galaxy-dev@lists.galaxyproject.org/thread/OYSHZXMDA72UD6LKDOCF636BKKGYEPIV/#MJNIDOKMJNQLAEES23UI5X6PIYPEHAWI).*

We plan to continue, and perhaps finish, that discussion at GCC2013, at this BoF session.  That discussion and what we decide will be posted on the [GalaxyAdmins Future page](/community/galaxy-admins/future/).  However, the current talking points are:

* [Goal and Activities](/community/galaxy-admins/future/#galaxyadmins-goals-and-activities)
* [Leadership](/community/galaxy-admins/future/#leadership)

## When and Where

**Please note the change in Time and Location**

The [tentative time and location](/events/gcc2013/bof/#bof-schedule) is Tuesday lunchtime in the cantina. Collect your lunch and then carry it up to the Cantina's balcony/mezzanine room reached from the staircase inside the cantina near the entrance.

## Who is Participating

If you are interested, please add your name below and/or send an email to [Dave Clements](mailto:clements AT galaxyproject DOT org).  There were about 21 people present, including:

* [Dave Clements](/people/dave-clements/)
* Shaun Webb
* [Hans-Rudolf Hotz](/people/hansrudolf-hotz/)
* Peter Li
* [Christian Andreetta](http://www.computing.uni.no/staff?nickname=christiana)
* Srinivas Maddhi
* [Graham Etherington](mailto:Graham dot Etherington AT tsl DOT ac DOT uk)
* [Chris Bridson](mailto:Chris . Bridson AT nbi DOT ac DOT uk)
* Scott Edmunds, GigaScience
* Steve McMahon, CSIRO, Australia
* Subazini Thankaswamy
* Sebastian Schaaf
* Calogero Zarbo

## Summary

**General Support Concerns**

* From Jessie K
    People answer questions right away.  Problems some are big and no-one knows how to do that.
    What is the bleeding edge stuff.  That's where the problem is.

**Reference / Wiki**

* Want a knowledge base with different descriptions of Galaxy Deployments
* Possibly have an Admin/Logs section where people can describe what they did
* Add a list of Admin Tutorials to [Admin](/admin/) and [Cloud](/cloudman/) Hub pages, similar to what is on the [Learn](/learn/) hub page.

**Mailing Lists / Forums**

* Some support for Forums, or keeping existing galaxy-dev list, or adding a new galaxy-admins list.
* I think the consensus was to keep just the Galaxy-Dev list;  A separate GalaxyAdmins would help by focusing content, but people already have a hard time figuring out what list to post to and most people would subscribe to both.
* There was considerable interest in using Tags in either a forum or a mailing list.  Dave C will investigate Topics in Mailman.

<div class='indent'>
**Follow-up**

2013/08: Mailman topics are a worthwhile idea.  They create sublists within a list by using tags in subject lines (and other methods), making it possible for people to only subscribe to email on the sublist.  However, we aren't going to use them.  There is no software requirement that posters use the correct (or any) topic tag in Mailman, and

1. We can be sure that some relevant postings would not have the tag
2. Therefore people would have to subscribe to the full list anyway.

If you still want this functionality, you are encouraged to configure your email software to tag anything with "[GalaxyAdmins](/community/galaxy-admins/)" in it.
</div>

**Meetups:**

* Graham E would like to see communication before the meetups  Have more discussion before hand
* Consensus was to continue doing the meetups.
* Maybe shorten the main presentation some.
* Have next meetup be more free form Everyone who can be at that meeting be there.
* How to get Australia and Asia in the mix?  May have to have their own calls.
* Survey participants for suggested meetup technology.

**Leadership / Governance**

* Nothing was established here.
* Srinivas and Dave C will continue as is, but the right thing to do is transfer Srinnivas's responsibilities to someone else.
* Participants will think about what to do
* Distributing workload might work
* Dave's willing to continue lining up speakers every other month.

### Action Items

**The first [GalaxyAdmins Meetup](/community/galaxy-admins/meetups/2013-11-20/) after the GCC was about followup to this discussion.**


Reference / Wiki

* Dave C will set up an "installation description" template that enables people to provide a basic description of their installation.  This is not a database, but it would build a searchable list of deployments
* Dave C will create a section of the wiki for admins to log what they did during installs.
* Dave C will add a list of Admin Tutorials to [Admin](/admin/) and [Cloud](/cloudman/) Hub pages, similar to what is on the [Learn](/learn/) hub page.

Mailing Lists / Forums

* We will keep everything on galaxy-dev for the time being.
* Dave C will investigate using [Mailman Topics](http://www.list.org/mailman-member/node29.html) to flag threads that are specific to this group.

Meetups:

* Will continue with bimonthly meetups
* For future meetups
    * Encourage communication before hand
    * Shorten the main presentaiton some.
* Have next meetup be more free form Everyone who can be at that meeting be there.

Leadership / Governance

* Need something here.

## Questions?

Send them to [Dave Clements](mailto:clements AT galaxyproject DOT org).

Please add any questions or discussion to the [Galaxy-Dev thread on the future of GalaxyAdmins](https://lists.galaxyproject.org/archives/list/galaxy-dev@lists.galaxyproject.org/thread/OYSHZXMDA72UD6LKDOCF636BKKGYEPIV/#MJNIDOKMJNQLAEES23UI5X6PIYPEHAWI).
