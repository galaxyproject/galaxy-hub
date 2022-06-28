---
title: 'Galaxy Release 20.05'
tease: Interactive Tools, refgenie support, Workflow components in vue.js
date: '2020-06-30'
subsites: [global, us]
---

We are pleased to announce the release of Galaxy
20.05 - **[developer and admin release announcement](https://docs.galaxyproject.org/en/master/releases/20.05_announce.html)** and **[user release announcement](https://docs.galaxyproject.org/en/master/releases/20.05_announce_user.html)**.
A few release highlights are:

Many new Interactive Tools
--------------------------

Galaxy interactive tools allow a greater depth of analysis via access to
GUI-based tools inside an instance. 10 new interactive tools (some previously
available only on the UseGalaxy.eu server) join the standard base toolset.
Improvements to the Higlass interactive tool now also allow for a more in-depth
visualization of multiple datasets in various formats simultaneously.

Data Tables can now be backed by refgenie
-----------------------------------------

Refgenie manages storage, access, and transfer of reference genome resources.
Galaxy can now fill data tables that were received from a refgenie
installation.

Tool Shed is now Python3 ready
------------------------------

As the last component in the Galaxy Codebase the Tool Shed has been ported to
Python 3. This concludes a 4 year effort to port the Galaxy codebase to Python
3.

Workflow Editor and Workflow Run Form in Vue.js
-----------------------------------------------

The Workflow Editor and Workflow Run Form have been re-written in Vue.js. While
the functionality has been preserved this lays the groundwork for creating
beautiful and reactive custom variants of these components in the future

Accelerated Galaxy Startup
--------------------------
Galaxy now caches expanded tool documents, delays creating the tool search
index until after startup and creates search indexes incrementally.

_Thanks for using Galaxy!_
